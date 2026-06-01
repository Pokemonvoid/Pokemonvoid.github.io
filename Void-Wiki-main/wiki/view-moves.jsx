/* Pokémon Void — Moves view. window.VIEWS.Moves */
window.VIEWS = window.VIEWS || {};
(function () {
  const { TYPES, DEX, byDex } = window.VDEX;
  const { MOVES } = window.VGAME;
  const { go, TypePill, PageHead, Empty } = window.VUI;

  const CLS_COLOR = { Physical: '#ff8a5c', Special: '#5c9fff', Status: '#9a93b5' };

  // ---- reverse move lookup: move name -> [{dex, how}] (normalization-tolerant) ----
  const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  let _learnerIndex = null;
  function learnerIndex() {
    if (_learnerIndex) return _learnerIndex;
    const idx = {}; // normName -> Map(dex -> Set(how))
    const add = (moveName, dex, how) => {
      const k = norm(moveName);
      if (!k) return;
      if (!idx[k]) idx[k] = new Map();
      if (!idx[k].has(dex)) idx[k].set(dex, new Set());
      idx[k].get(dex).add(how);
    };
    DEX.forEach(d => {
      (d.levelMoves || []).forEach(m => add(m.name, d.dex, 'Level'));
      (d.tmMoves || []).forEach(m => add(m.name, d.dex, 'TM'));
      (d.eggMoves || []).forEach(m => add(m.name, d.dex, 'Egg'));
    });
    _learnerIndex = idx;
    return idx;
  }
  function learnersOf(moveName) {
    const m = learnerIndex()[norm(moveName)];
    if (!m) return [];
    return Array.from(m.entries())
      .map(([dex, hows]) => ({ dex, hows: Array.from(hows) }))
      .sort((a, b) => a.dex.localeCompare(b.dex));
  }

  const HOW_COLOR = { Level: '#8a5cff', TM: '#33d6ff', Egg: '#5fd13c' };

  function MoveRow({ m, i }) {
    const [open, setOpen] = React.useState(false);
    const learners = open ? learnersOf(m.name) : null;
    return (
      <div style={{ borderTop: i ? '1px solid #1a1630' : 'none' }}>
        <div onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: 'minmax(220px, 2.4fr) 132px 124px 1fr 1fr 1fr', gap: 16, padding: '18px 24px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: open ? '#b08fff' : '#5f5980', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}>›</span>
              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', lineHeight: 1.1 }}>{m.name}</span>
            </div>
            <div style={{ marginTop: 7, marginLeft: 21, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#9a93b5', lineHeight: 1.55, maxWidth: 460 }}>{m.desc}</div>
          </div>
          <span style={{ paddingTop: 2 }}><TypePill t={m.type} sm /></span>
          <span style={{ paddingTop: 3, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: CLS_COLOR[m.cls] }}>{m.cls}</span>
          <span style={{ paddingTop: 2, fontFamily: "'Space Mono', monospace", fontSize: 15, color: '#d8d2f0', textAlign: 'right' }}>{m.pow}</span>
          <span style={{ paddingTop: 2, fontFamily: "'Space Mono', monospace", fontSize: 15, color: '#d8d2f0', textAlign: 'right' }}>{m.acc}</span>
          <span style={{ paddingTop: 2, fontFamily: "'Space Mono', monospace", fontSize: 15, color: '#d8d2f0', textAlign: 'right' }}>{m.pp}</span>
        </div>
        {open && (
          <div style={{ padding: '0 24px 20px 45px', background: '#0b0918' }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388', letterSpacing: 0.5, margin: '4px 0 10px' }}>LEARNED BY {learners.length ? `(${learners.length})` : ''}</div>
            {learners.length === 0 ? (
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No catalogued Pokémon learn this yet.</span>
            ) : (
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {learners.map(({ dex, hows }) => {
                  const mon = byDex(dex); if (!mon) return null;
                  const accent = TYPES[mon.types[0]].glow;
                  return (
                    <button key={dex} onClick={(e) => { e.stopPropagation(); go('#/pokemon/' + dex); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '5px 11px 5px 7px', borderRadius: 999, background: '#15112a', border: `1px solid ${accent}44` }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent }} />
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#e9e4ff', fontWeight: 600 }}>{mon.name}</span>
                      <span style={{ display: 'flex', gap: 3 }}>
                        {hows.map(h => <span key={h} title={h + ' move'} style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: HOW_COLOR[h] || '#8a83a8', border: `1px solid ${HOW_COLOR[h] || '#8a83a8'}66`, borderRadius: 3, padding: '1px 4px' }}>{h === 'Level' ? 'LV' : h.toUpperCase()}</span>)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  window.VIEWS.Moves = function Moves() {
    const [q, setQ] = React.useState('');
    const [cls, setCls] = React.useState('All');
    const [typeF, setTypeF] = React.useState('All');
    const types = ['All', ...Array.from(new Set(MOVES.map(m => m.type))).filter(t => TYPES[t])];

    const list = MOVES.filter(m =>
      (cls === 'All' || m.cls === cls) &&
      (typeF === 'All' || m.type === typeF) &&
      (!q.trim() || m.name.toLowerCase().includes(q.trim().toLowerCase()))
    ).sort((a, b) => a.name.localeCompare(b.name));

    const Seg = ({ val, cur, set, children, color }) => (
      <button onClick={() => set(val)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: cur === val ? 600 : 400, color: cur === val ? (color || '#fff') : '#8a83a8', background: cur === val ? '#221a45' : 'transparent', border: `1px solid ${cur === val ? '#3a2f6e' : '#221d3a'}` }}>{children}</button>
    );

    return (
      <div>
        <PageHead kicker="MOVE INDEX" title="Moves" sub="Every technique a Pokémon can learn in Void, including the new Light and Cosmic-type moves. Click a type to see the type chart." />

        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 220 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search moves…" spellCheck={false} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>{['All', 'Physical', 'Special', 'Status'].map(c => <Seg key={c} val={c} cur={cls} set={setCls} color={CLS_COLOR[c]}>{c}</Seg>)}</div>
          <select value={typeF} onChange={e => setTypeF(e.target.value)} style={{ padding: '7px 12px', borderRadius: 8, background: '#15112a', color: '#e9e4ff', border: '1px solid #2a2545', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
            {types.map(t => <option key={t} value={t} style={{ background: '#15112a' }}>{t === 'All' ? 'All types' : (TYPES[t] ? TYPES[t].name : t)}</option>)}
          </select>
        </div>

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388', marginBottom: 12 }}>{list.length} moves · click any move to see which Pokémon learn it</div>

        {list.length === 0 ? <Empty label="No moves match." /> : (
          <div style={{ border: '1px solid #221d3a', borderRadius: 14, overflow: 'hidden', background: '#0e0b1f' }}>
            {/* header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2.4fr) 132px 124px 1fr 1fr 1fr', gap: 16, padding: '14px 24px', borderBottom: '1px solid #221d3a', background: '#120e26' }}>
              {['Move', 'Type', 'Class', 'Pow', 'Acc', 'PP'].map((h, i) => <span key={h} style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388', letterSpacing: 0.5, textAlign: i >= 3 ? 'right' : 'left' }}>{h.toUpperCase()}</span>)}
            </div>
            {list.map((m, i) => <MoveRow key={m.name} m={m} i={i} />)}
          </div>
        )}
      </div>
    );
  };
})();
