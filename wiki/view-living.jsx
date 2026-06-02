/* Pokémon Void — Living Dex Tracker (PC Boxes). window.VIEWS.Living
   Stores caught data locally per-device, like the Team Builder. Each box is a
   5×6 grid of 30 slots. Click an empty slot to place a Pokémon there; click a
   filled slot to toggle Normal / Shiny / Anomaly ownership. Shiny swaps the
   sprite to the -shiny png; Anomaly shows a small moon icon badge (no anomaly
   sprite). Add boxes to grow your storage downward. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES } = window.VDEX;
  const { TYPE_ORDER } = window.VGAME;
  const { go, SpriteSlot, TypePill, Empty } = window.VUI;

  const COLS = 6, ROWS = 5, PER_BOX = COLS * ROWS; // 30 per box, classic PC size
  const ANOMALY_ICON = 'sprites/_anomaly-icon.png';
  const SHINY_ICON = 'sprites/_shiny-icon.png';

  // ---- persistence (same guarded pattern as the Team Builder) ----
  // Shape: { boxes: [ { name, slots: [ slotOrNull x30 ] } ], v: 2 }
  // slot = { dex, normal:bool, shiny:bool, anomaly:bool }
  const LS_KEY = 'voiddex_livingdex_v1';
  function freshBox(n) { return { name: 'Box ' + n, slots: Array(PER_BOX).fill(null) }; }
  function loadState() {
    try {
      const v = JSON.parse(localStorage.getItem(LS_KEY));
      if (v && Array.isArray(v.boxes) && v.boxes.length) {
        // normalize: ensure each box has exactly PER_BOX slots
        v.boxes = v.boxes.map((b, i) => ({
          name: (b && b.name) || ('Box ' + (i + 1)),
          slots: Array.from({ length: PER_BOX }, (_, k) => {
            const s = b && b.slots && b.slots[k];
            return s && s.dex ? { dex: String(s.dex), normal: !!s.normal, shiny: !!s.shiny, anomaly: !!s.anomaly } : null;
          }),
        }));
        return v.boxes;
      }
    } catch (e) {}
    return [freshBox(1)];
  }
  function saveState(boxes) { try { localStorage.setItem(LS_KEY, JSON.stringify({ v: 2, boxes })); } catch (e) {} }

  // ---- cross-device share code (compact) ----
  // VD2~boxName~slots;boxName~slots;...   slots = per-slot tokens:
  //   filled = <dex base36, 2 chars><flag 1 char>  (flag: 1=normal,2=shiny,4=anomaly, base36)
  //   empties = run-length "-N"  (e.g. "-30" = 30 empty slots). Still reads old VDEX1 codes.
  function encodeShare(boxes) {
    try {
      const segs = boxes.map(b => {
        let out = '', empties = 0;
        const flush = () => { if (empties) { out += '-' + empties + '.'; empties = 0; } };
        for (const s of b.slots) {
          if (!s) { empties++; continue; }
          flush();
          const flag = (s.normal ? 1 : 0) + (s.shiny ? 2 : 0) + (s.anomaly ? 4 : 0);
          out += parseInt(s.dex, 10).toString(36).padStart(2, '0') + flag.toString(36);
        }
        flush();
        return (b.name || '') + '~' + out;
      });
      return 'VD2~' + segs.join(';');
    } catch (e) { return ''; }
  }
  function decodeShare(code) {
    try {
      const raw = code.trim();
      if (raw.startsWith('VD2~')) {
        const segs = raw.slice(4).split(';').filter(s => s.length);
        return segs.map((seg, bi) => {
          const tilde = seg.indexOf('~');
          const name = tilde >= 0 ? seg.slice(0, tilde) : 'Box ' + (bi + 1);
          const body = tilde >= 0 ? seg.slice(tilde + 1) : '';
          const slots = [];
          let i = 0;
          while (i < body.length && slots.length < PER_BOX) {
            if (body[i] === '-') {                 // run of empties: -N.
              let j = i + 1, num = '';
              while (j < body.length && /[0-9]/.test(body[j])) { num += body[j]; j++; }
              if (body[j] === '.') j++;             // consume terminator
              const n = parseInt(num, 10) || 0;
              for (let k = 0; k < n && slots.length < PER_BOX; k++) slots.push(null);
              i = j;
            } else {                                // dex(2) + flag(1)
              const dex = String(parseInt(body.slice(i, i + 2), 36)).padStart(3, '0');
              const flag = parseInt(body[i + 2], 36) || 0;
              slots.push({ dex, normal: !!(flag & 1), shiny: !!(flag & 2), anomaly: !!(flag & 4) });
              i += 3;
            }
          }
          while (slots.length < PER_BOX) slots.push(null);
          return { name, slots };
        });
      }
      // legacy VDEX1 (base64 JSON)
      if (raw.startsWith('VDEX1')) {
        const data = JSON.parse(decodeURIComponent(escape(atob(raw.slice(5)))));
        if (!data || !Array.isArray(data.b)) return null;
        return data.b.map((b, i) => ({
          name: typeof b.n === 'string' ? b.n : 'Box ' + (i + 1),
          slots: Array.from({ length: PER_BOX }, (_, k) => {
            const cell = b.s && b.s[k];
            if (!cell || cell === 0 || !Array.isArray(cell)) return null;
            const flags = cell[1] || 0;
            return { dex: String(cell[0]), normal: !!(flags & 1), shiny: !!(flags & 2), anomaly: !!(flags & 4) };
          }),
        }));
      }
      return null;
    } catch (e) { return null; }
  }

  // ---- picker modal: choose which mon goes into a clicked slot ----
  function MonPickerModal({ onPick, onClose }) {
    const [q, setQ] = React.useState('');
    const term = q.trim().toLowerCase();
    const list = DEX.filter(d => !d.undiscovered &&
      (!term || d.name.toLowerCase().includes(term) || d.dex.includes(term) ||
        (d.types || []).some(t => TYPES[t] && TYPES[t].name.toLowerCase().includes(term))));
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 760, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22, boxShadow: '0 30px 80px #000a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>Deposit a Pokémon</span>
            <button onClick={onClose} style={{ marginLeft: 'auto', cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
          </div>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, № or type…" spellCheck={false}
            style={{ width: '100%', padding: '11px 15px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, outline: 'none', marginBottom: 16 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))', gap: 10, maxHeight: 460, overflowY: 'auto' }}>
            {list.map(d => {
              const accent = TYPES[d.types[0]].glow;
              return (
                <button key={d.dex} onClick={() => onPick(d.dex)} style={{ cursor: 'pointer', padding: 10, borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', textAlign: 'center' }}>
                  <SpriteSlot dex={d.dex} name={d.name} size={68} accent={accent} />
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginTop: 5 }}>No.{d.dex}</div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', lineHeight: 1.1 }}>{d.name}</div>
                </button>
              );
            })}
            {list.length === 0 && <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 13, padding: 30 }}>No Pokémon match “{q}”.</div>}
          </div>
        </div>
      </div>
    );
  }

  // ---- per-slot ownership editor (Normal / Shiny / Anomaly) ----
  function SlotEditor({ slot, onChange, onRemove, onClose }) {
    const m = byDex(slot.dex);
    const Row = ({ label, val, onToggle, color }) => (
      <button onClick={onToggle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 13px', borderRadius: 10, background: val ? color + '22' : '#100c24', border: `1px solid ${val ? color : '#2a2545'}`, textAlign: 'left' }}>
        <span style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${val ? color : '#3a2f6e'}`, background: val ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0818', fontSize: 13, fontWeight: 700, flex: '0 0 auto' }}>{val ? '✓' : ''}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: val ? '#fff' : '#9a93bb' }}>{label}</span>
      </button>
    );
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 380, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22, boxShadow: '0 30px 80px #000a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <SpriteSlot dex={slot.dex} name={m ? m.name : slot.dex} size={56} accent={m ? TYPES[m.types[0]].glow : '#8a5cff'} suffix={slot.shiny ? 'shiny' : undefined} />
            <div>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980' }}>No.{slot.dex}</div>
              <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff' }}>{m ? m.name : 'Unknown'}</div>
            </div>
            <button onClick={onClose} style={{ marginLeft: 'auto', cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Done</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            <Row label="Caught (Normal)" val={slot.normal} onToggle={() => onChange({ ...slot, normal: !slot.normal })} color="#8a5cff" />
            <Row label="Shiny ✦" val={slot.shiny} onToggle={() => onChange({ ...slot, shiny: !slot.shiny, anomaly: slot.shiny ? slot.anomaly : false })} color="#ffd54a" />
            <Row label="Anomaly ☾" val={slot.anomaly} onToggle={() => onChange({ ...slot, anomaly: !slot.anomaly, shiny: slot.anomaly ? slot.shiny : false })} color="#ff7fe0" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => go('#/pokemon/' + slot.dex)} style={{ flex: 1, cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 10, padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>View page ›</button>
            <button onClick={onRemove} style={{ flex: 1, cursor: 'pointer', background: '#2a1020', border: '1px solid #ff5f7e66', color: '#ff8fa6', borderRadius: 10, padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>Release (empty slot)</button>
          </div>
        </div>
      </div>
    );
  }

  // ---- a single slot tile inside a box ----
  function Slot({ slot, dim, onClick }) {
    if (!slot) {
      return (
        <button onClick={onClick} title="Add Pokémon" style={{ aspectRatio: '1 / 1', borderRadius: 10, cursor: 'pointer', background: 'repeating-linear-gradient(135deg, #0c0a1c, #0c0a1c 7px, #0e0b22 7px, #0e0b22 14px)', border: '1.5px dashed #241d44', color: '#3a2f6e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>＋</button>
      );
    }
    const m = byDex(slot.dex);
    const accent = m ? TYPES[m.types[0]].glow : '#8a5cff';
    return (
      <button onClick={onClick} title={m ? m.name : slot.dex} style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 10, cursor: 'pointer', padding: 4, background: `radial-gradient(ellipse at 50% 15%, ${accent}33, #0b0918 80%)`, border: `1px solid ${accent}66`, opacity: dim ? 0.22 : 1, transition: 'opacity .12s' }}>
        <SpriteSlot dex={slot.dex} name={m ? m.name : slot.dex} size={'100%'} accent={accent} suffix={slot.shiny ? 'shiny' : undefined} />
        {/* shiny star badge */}
        {slot.shiny && <img src={SHINY_ICON} alt="Shiny" style={{ position: 'absolute', top: 2, left: 2, width: '17%', height: '17%', imageRendering: 'pixelated', zIndex: 5, filter: 'drop-shadow(0 0 4px #ffd54a)' }} />}
        {/* anomaly icon badge (no anomaly sprite, just the moon icon) */}
        {slot.anomaly && <img src={ANOMALY_ICON} alt="Anomaly" style={{ position: 'absolute', top: 2, right: 2, width: '17%', height: '17%', imageRendering: 'pixelated', zIndex: 5, filter: 'drop-shadow(0 0 4px #ff7fe0)' }} />}
      </button>
    );
  }

  window.VIEWS.Living = function Living() {
    const [boxes, setBoxes] = React.useState(loadState);
    const [picking, setPicking] = React.useState(null);   // {box, slot} target for new mon
    const [editing, setEditing] = React.useState(null);   // {box, slot} of filled slot being edited
    const [q, setQ] = React.useState('');
    const [filter, setFilter] = React.useState('all');     // all | caught | shiny | anomaly | empty
    const [mode, setMode] = React.useState('boxes');       // boxes | grid
    const [share, setShare] = React.useState(null);        // null | 'export' | 'import'
    const [importText, setImportText] = React.useState('');
    const [copied, setCopied] = React.useState(false);
    React.useEffect(() => { saveState(boxes); }, [boxes]);

    // mutate helper
    const setSlot = (bi, si, val) => setBoxes(bs => bs.map((b, i) => i !== bi ? b : { ...b, slots: b.slots.map((s, k) => k === si ? val : s) }));
    const addBox = () => setBoxes(bs => [...bs, freshBox(bs.length + 1)]);
    const removeBox = (bi) => setBoxes(bs => bs.length <= 1 ? [freshBox(1)] : bs.filter((_, i) => i !== bi));
    const renameBox = (bi, name) => setBoxes(bs => bs.map((b, i) => i === bi ? { ...b, name } : b));
    const resetAll = () => { if (window.confirm('Reset your entire Living Dex? This clears every box on this device.')) setBoxes([freshBox(1)]); };

    // ---- Grid mode: treat the boxes as one flat pool, one slot per species ----
    // status for a dex from current boxes
    const gridStatus = (dex) => {
      for (const b of boxes) for (const s of b.slots) if (s && s.dex === dex) return s;
      return null;
    };
    // write a status for a species: update its slot if present, else drop into first empty slot (adding a box if needed)
    const gridSet = (dex, val) => {
      setBoxes(bs => {
        // find existing slot
        let found = false;
        let next = bs.map(b => ({ ...b, slots: b.slots.map(s => {
          if (s && s.dex === dex) { found = true; return val ? { dex, ...val } : null; }
          return s;
        }) }));
        if (found || !val) return next.length ? next : [freshBox(1)];
        // not found and we're setting a status — place in first empty slot
        for (const b of next) {
          const idx = b.slots.findIndex(s => !s);
          if (idx !== -1) { b.slots = b.slots.map((s, k) => k === idx ? { dex, ...val } : s); return next; }
        }
        // no empty slot anywhere — add a new box
        const nb = freshBox(next.length + 1);
        nb.slots[0] = { dex, ...val };
        return [...next, nb];
      });
    };

    // place a freshly-picked mon — defaults to Normal caught = true
    const place = (dex) => {
      if (!picking) return;
      setSlot(picking.box, picking.slot, { dex, normal: true, shiny: false, anomaly: false });
      const target = picking; setPicking(null);
      setEditing(target); // open the editor so they can flag shiny/anomaly right away
    };

    // ---- search/filter predicate for slots already in boxes ----
    const term = q.trim().toLowerCase();
    const matchSlot = (slot) => {
      if (!slot) return filter === 'all' || filter === 'empty';
      if (filter === 'empty') return false;
      if (filter === 'shiny' && !slot.shiny) return false;
      if (filter === 'anomaly' && !slot.anomaly) return false;
      if (filter === 'caught' && !slot.normal) return false;
      if (!term) return true;
      const m = byDex(slot.dex);
      return (m && m.name.toLowerCase().includes(term)) || slot.dex.includes(term) ||
        (m && (m.types || []).some(t => TYPES[t] && TYPES[t].name.toLowerCase().includes(term)));
    };
    const filtering = term !== '' || filter !== 'all';

    // ---- progress stats ----
    const allSlots = boxes.flatMap(b => b.slots).filter(Boolean);
    const uniqueCaught = new Set(allSlots.filter(s => s.normal || s.shiny || s.anomaly).map(s => s.dex)).size;
    const totalSpecies = DEX.filter(d => !d.undiscovered).length;
    const shinyCount = allSlots.filter(s => s.shiny).length;
    const anomalyCount = allSlots.filter(s => s.anomaly).length;

    const FilterBtn = ({ id, label, color }) => (
      <button onClick={() => setFilter(id)} style={{ cursor: 'pointer', padding: '7px 13px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: filter === id ? (color || '#8a5cff') + '33' : '#100c24', border: `1px solid ${filter === id ? (color || '#8a5cff') : '#2a2545'}`, color: filter === id ? '#fff' : '#9a93bb' }}>{label}</button>
    );

    const Stat = ({ label, val, sub, color }) => (
      <div style={{ flex: '1 1 120px', padding: '12px 16px', borderRadius: 12, background: '#0c0a1c', border: '1px solid #221d3a' }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: color || '#fff' }}>{val}<span style={{ fontSize: 13, color: '#6a6388' }}>{sub}</span></div>
      </div>
    );

    return (
      <div>
        {share && (
          <div onClick={() => setShare(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(5,4,12,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 540, background: 'radial-gradient(ellipse at 50% 0%, #1a1330, #0c0a1c 80%)', border: '1px solid #33d6ff44', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button onClick={() => { setCopied(false); setShare('export'); }} style={{ cursor: 'pointer', flex: 1, padding: '9px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: share === 'export' ? '#33d6ff22' : '#100c24', border: `1px solid ${share === 'export' ? '#33d6ff' : '#2a2545'}`, color: share === 'export' ? '#fff' : '#9a93bb' }}>Export</button>
                <button onClick={() => setShare('import')} style={{ cursor: 'pointer', flex: 1, padding: '9px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: share === 'import' ? '#33d6ff22' : '#100c24', border: `1px solid ${share === 'import' ? '#33d6ff' : '#2a2545'}`, color: share === 'import' ? '#fff' : '#9a93bb' }}>Import</button>
              </div>
              {share === 'export' ? (
                <div>
                  <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.5 }}>Copy this code and paste it on another device (or send it to a friend) to load this exact Living Dex.</p>
                  <textarea readOnly value={encodeShare(boxes)} onFocus={e => e.target.select()} spellCheck={false}
                    style={{ width: '100%', height: 110, resize: 'none', borderRadius: 10, background: '#0a0818', border: '1px solid #2a2545', color: '#7fdfff', fontFamily: "'Space Mono', monospace", fontSize: 12, padding: 12, outline: 'none', wordBreak: 'break-all' }} />
                  <button onClick={() => { try { navigator.clipboard.writeText(encodeShare(boxes)); setCopied(true); } catch (e) {} }}
                    style={{ cursor: 'pointer', marginTop: 12, width: '100%', padding: '11px', borderRadius: 10, background: copied ? '#0f3320' : 'linear-gradient(135deg, #1a6a8a, #0f4a66)', border: '1px solid #33d6ff66', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>{copied ? '✓ Copied!' : 'Copy Code'}</button>
                </div>
              ) : (
                <div>
                  <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.5 }}>Paste a Living Dex code below. This replaces your current boxes on this device.</p>
                  <textarea value={importText} onChange={e => setImportText(e.target.value)} placeholder="Paste a VD2… code here" spellCheck={false}
                    style={{ width: '100%', height: 110, resize: 'none', borderRadius: 10, background: '#0a0818', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Mono', monospace", fontSize: 12, padding: 12, outline: 'none', wordBreak: 'break-all' }} />
                  <button onClick={() => {
                    const decoded = decodeShare(importText);
                    if (!decoded) { alert('That code is not valid. Make sure you copied the whole thing (it starts with VD2).'); return; }
                    if (window.confirm('Load this Living Dex? It will replace your current boxes on this device.')) { setBoxes(decoded.length ? decoded : [freshBox(1)]); setImportText(''); setShare(null); }
                  }} style={{ cursor: 'pointer', marginTop: 12, width: '100%', padding: '11px', borderRadius: 10, background: 'linear-gradient(135deg, #1a6a8a, #0f4a66)', border: '1px solid #33d6ff66', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Load This Code</button>
                </div>
              )}
              <button onClick={() => setShare(null)} style={{ cursor: 'pointer', marginTop: 10, width: '100%', padding: '9px', borderRadius: 8, background: 'transparent', border: '1px solid #2a2545', color: '#8a83a8', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
            </div>
          </div>
        )}
        {picking && <MonPickerModal onPick={place} onClose={() => setPicking(null)} />}
        {editing && boxes[editing.box] && boxes[editing.box].slots[editing.slot] && (
          <SlotEditor
            slot={boxes[editing.box].slots[editing.slot]}
            onChange={(val) => setSlot(editing.box, editing.slot, val)}
            onRemove={() => { setSlot(editing.box, editing.slot, null); setEditing(null); }}
            onClose={() => setEditing(null)}
          />
        )}

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 2, color: '#8a5cff', marginBottom: 8 }}>STORAGE SYSTEM</div>
            <h1 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 1, color: '#fff', textShadow: '0 0 30px #8a5cff66' }}>Living Dex</h1>
            <p style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: '#bdb6dd', maxWidth: 640, lineHeight: 1.6 }}>Track every Pokémon you've caught across your PC Boxes. Click a slot to deposit a Pokémon, then mark it as caught, shiny, or anomaly. Everything saves automatically on this device.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'inline-flex', borderRadius: 10, overflow: 'hidden', border: '1px solid #2a2545' }}>
              <button onClick={() => setMode('boxes')} style={{ cursor: 'pointer', padding: '10px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: mode === 'boxes' ? 'linear-gradient(135deg, #322663, #1d1542)' : '#100c24', border: 'none', borderRight: '1px solid #2a2545', color: mode === 'boxes' ? '#fff' : '#9a93bb' }}>⬚ PC Boxes</button>
              <button onClick={() => setMode('grid')} style={{ cursor: 'pointer', padding: '10px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: mode === 'grid' ? 'linear-gradient(135deg, #322663, #1d1542)' : '#100c24', border: 'none', color: mode === 'grid' ? '#fff' : '#9a93bb' }}>▦ Grid</button>
            </div>
            <button onClick={() => { setCopied(false); setShare('export'); }} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: '#101a2e', border: '1px solid #33d6ff55', color: '#7fdfff', borderRadius: 10, padding: '10px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>⇄ Share</button>
            <button onClick={resetAll} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: '#2a1020', border: '1px solid #ff5f7e66', color: '#ff8fa6', borderRadius: 10, padding: '10px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>↺ Reset All</button>
          </div>
        </div>

        {/* progress stats */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <Stat label="SPECIES CAUGHT" val={uniqueCaught} sub={'/' + totalSpecies} color="#8a5cff" />
          <Stat label="SHINIES" val={shinyCount} color="#ffd54a" />
          <Stat label="ANOMALIES" val={anomalyCount} color="#ff7fe0" />
          <Stat label="BOXES" val={boxes.length} color="#33d6ff" />
        </div>

        {/* ===== BOXES MODE ===== */}
        {mode === 'boxes' && <React.Fragment>
        {/* search + filter bar */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Find a Pokémon in your boxes…" spellCheck={false}
            style={{ flex: '1 1 240px', padding: '10px 15px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none' }} />
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <FilterBtn id="all" label="All" />
            <FilterBtn id="caught" label="Caught" color="#8a5cff" />
            <FilterBtn id="shiny" label="Shiny ✦" color="#ffd54a" />
            <FilterBtn id="anomaly" label="Anomaly ☾" color="#ff7fe0" />
            <FilterBtn id="empty" label="Empty" color="#6a6388" />
          </div>
        </div>
        {filtering && <p style={{ margin: '0 0 16px', fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>Non-matching slots are dimmed. Matches stay lit.</p>}
        {!filtering && <div style={{ height: 10 }} />}

        {/* boxes — each grows the page downward */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {boxes.map((box, bi) => {
            const boxCaught = box.slots.filter(s => s && (s.normal || s.shiny || s.anomaly)).length;
            const boxFilled = box.slots.filter(Boolean).length;
            return (
              <section key={bi} style={{ borderRadius: 18, background: 'radial-gradient(ellipse at 50% 0%, #15102e, #0b0918 75%)', border: '1px solid #221d3a', padding: 18 }}>
                {/* box header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a5cff', letterSpacing: 0.5 }}>BOX {bi + 1}</span>
                  <input value={box.name} onChange={e => renameBox(bi, e.target.value)} spellCheck={false}
                    style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', background: 'transparent', border: 'none', borderBottom: '1px dashed #2a235099', outline: 'none', padding: '2px 4px', minWidth: 60, maxWidth: 260 }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388' }}>{boxFilled}/{PER_BOX} filled · {boxCaught} caught</span>
                  <button onClick={() => removeBox(bi)} title="Delete this box" style={{ marginLeft: 'auto', cursor: 'pointer', background: '#1a1020', border: '1px solid #ff5f7e44', color: '#ff8fa6', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600 }}>Delete Box</button>
                </div>
                {/* the 6×5 grid */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 8 }}>
                  {box.slots.map((slot, si) => (
                    <Slot key={si} slot={slot}
                      dim={filtering && !matchSlot(slot)}
                      onClick={() => slot ? setEditing({ box: bi, slot: si }) : setPicking({ box: bi, slot: si })} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* add box — appends below, page gets longer */}
        <button onClick={addBox} style={{ cursor: 'pointer', width: '100%', marginTop: 18, padding: '16px', borderRadius: 14, background: 'repeating-linear-gradient(135deg, #0c0a1c, #0c0a1c 10px, #0e0b22 10px, #0e0b22 20px)', border: '1.5px dashed #3a2f6e', color: '#b08fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>＋</span> Add New Box
        </button>
        </React.Fragment>}

        {/* ===== GRID MODE ===== */}
        {mode === 'grid' && <GridMode
          boxes={boxes} q={q} setQ={setQ} filter={filter} setFilter={setFilter} FilterBtn={FilterBtn}
          gridStatus={gridStatus} gridSet={gridSet} />}
      </div>
    );
  };

  // ---- Grid mode: a Pokédex-style grid, alternate way to fill the same living dex ----
  function GridMode({ boxes, q, setQ, filter, setFilter, FilterBtn, gridStatus, gridSet }) {
    const species = DEX.filter(d => !d.undiscovered);
    const term = q.trim().toLowerCase();

    // anomaly may only be shown/ticked if this mon's anomaly is revealed (keeps secrets hidden)
    const anomalyUnlocked = (d) => d.anomaly != null;
    const stat = (d) => {
      const s = gridStatus(d.dex);
      if (!s) return { caught: false, shiny: false, anomaly: false };
      // never surface an anomaly state for a still-locked mon, even if it was set via PC Boxes
      const anomaly = !!s.anomaly && anomalyUnlocked(d);
      return { caught: !!(s.normal || s.shiny || s.anomaly), shiny: !!s.shiny, anomaly };
    };

    const set = (d, val) => {
      // val is null to clear, or {normal,shiny,anomaly}
      gridSet(d.dex, val);
    };
    const cycle = (d) => {
      const s = stat(d);
      if (!s.caught) set(d, { normal: true, shiny: false, anomaly: false });
      else if (s.caught && !s.shiny && !s.anomaly) set(d, { normal: true, shiny: true, anomaly: false });
      else if (s.shiny && !s.anomaly) {
        if (anomalyUnlocked(d)) set(d, { normal: true, shiny: false, anomaly: true });
        else set(d, null); // skip anomaly if locked
      }
      else set(d, null);
    };

    const list = species.filter(d => {
      const s = stat(d);
      if (filter === 'caught' && !s.caught) return false;
      if (filter === 'uncaught' && s.caught) return false;
      if (filter === 'shiny' && !s.shiny) return false;
      if (filter === 'anomaly' && !s.anomaly) return false;
      if (!term) return true;
      return d.name.toLowerCase().includes(term) || d.dex.includes(term) ||
        (d.types || []).some(t => TYPES[t] && TYPES[t].name.toLowerCase().includes(term));
    });

    const GFilter = ({ id, label, color }) => (
      <button onClick={() => setFilter(id)} style={{ cursor: 'pointer', padding: '7px 13px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: filter === id ? (color || '#8a5cff') + '33' : '#100c24', border: `1px solid ${filter === id ? (color || '#8a5cff') : '#2a2545'}`, color: filter === id ? '#fff' : '#9a93bb' }}>{label}</button>
    );

    return (
      <div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Find a Pokémon…" spellCheck={false}
            style={{ flex: '1 1 240px', padding: '10px 15px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none' }} />
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <GFilter id="all" label="All" />
            <GFilter id="caught" label="Caught" color="#7ad17a" />
            <GFilter id="uncaught" label="Uncaught" color="#9a93bb" />
            <GFilter id="shiny" label="Shiny ✦" color="#ffd54a" />
            <GFilter id="anomaly" label="Anomaly ☾" color="#ff7fe0" />
          </div>
        </div>

        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6a6388', fontFamily: "'Space Grotesk', sans-serif" }}>No Pokémon match this filter.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))', gap: 10 }}>
            {list.map(d => {
              const s = stat(d);
              const any = s.caught;
              const accent = TYPES[d.types[0]] ? TYPES[d.types[0]].glow : '#8a5cff';
              const anomOK = anomalyUnlocked(d);
              return (
                <div key={d.dex} style={{ position: 'relative', borderRadius: 12, padding: '12px 8px 9px', background: any ? `linear-gradient(160deg, ${accent}1f, #0e0a20)` : '#0b0818', border: `1px solid ${any ? accent + '66' : '#1d1838'}` }}>
                  <div onClick={() => cycle(d)} title="Tap to cycle status"
                    style={{ cursor: 'pointer', position: 'relative', width: 72, height: 72, margin: '0 auto', filter: any ? 'none' : 'grayscale(1) brightness(0.5)', opacity: any ? 1 : 0.7 }}>
                    <SpriteSlot dex={d.dex} name={d.name} size={72} accent={accent} suffix={s.shiny ? 'shiny' : (s.anomaly ? 'anomaly' : undefined)} />
                    {s.shiny && <img src={SHINY_ICON} alt="Shiny" style={{ position: 'absolute', top: -2, left: -2, width: 18, height: 18, imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #ffd54a)' }} />}
                    {s.anomaly && <img src={ANOMALY_ICON} alt="Anomaly" style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #ff7fe0)' }} />}
                    {s.caught && !s.shiny && !s.anomaly && <div style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: '#7ad17a', border: '2px solid #0b0818', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#062b06', fontWeight: 900 }}>✓</div>}
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#6a6388', marginTop: 6 }}>#{d.dex}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: any ? '#fff' : '#7a7398', lineHeight: 1.1, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 7 }}>
                    <button onClick={() => set(d, s.caught ? null : { normal: true, shiny: false, anomaly: false })}
                      title="Caught" style={{ cursor: 'pointer', width: 22, height: 20, borderRadius: 5, fontSize: 11, background: any ? '#7ad17a33' : '#15112a', border: `1px solid ${any ? '#7ad17a' : '#2a2545'}`, color: any ? '#7ad17a' : '#5f5980' }}>✓</button>
                    <button onClick={() => set(d, { normal: true, shiny: !s.shiny, anomaly: false })}
                      title="Shiny" style={{ cursor: 'pointer', width: 22, height: 20, borderRadius: 5, fontSize: 11, background: s.shiny ? '#ffd54a33' : '#15112a', border: `1px solid ${s.shiny ? '#ffd54a' : '#2a2545'}`, color: s.shiny ? '#ffd54a' : '#5f5980' }}>✦</button>
                    {anomOK
                      ? <button onClick={() => set(d, { normal: true, shiny: false, anomaly: !s.anomaly })}
                          title="Anomaly" style={{ cursor: 'pointer', width: 22, height: 20, borderRadius: 5, fontSize: 11, background: s.anomaly ? '#ff7fe033' : '#15112a', border: `1px solid ${s.anomaly ? '#ff7fe0' : '#2a2545'}`, color: s.anomaly ? '#ff7fe0' : '#5f5980' }}>☾</button>
                      : <button disabled title="This Pokémon has no known anomaly yet" style={{ width: 22, height: 20, borderRadius: 5, fontSize: 10, background: '#0c0a18', border: '1px solid #1d1838', color: '#3a3550', cursor: 'not-allowed' }}>🔒</button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <p style={{ marginTop: 18, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#5f5980', lineHeight: 1.6 }}>
          Grid view fills the same Living Dex as the PC Boxes. Tap a sprite to cycle Caught → Shiny → Anomaly, or use the small buttons. Saves automatically on this device.
        </p>
      </div>
    );
  }
})();
