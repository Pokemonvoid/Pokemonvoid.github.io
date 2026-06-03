/* Pokémon Void — Team Builder & Coverage Analyzer. window.VIEWS.Team */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES, STAT_LABELS } = window.VDEX;
  const { TYPE_ORDER, CHART, eff } = window.VGAME;
  const { go, SpriteSlot, TypePill, Empty } = window.VUI;

  const MAXTEAM = 6;
  // localStorage works on the live site; guard so a preview sandbox can't crash.
  const LS_KEY = 'voiddex_team_v2';
  const OLD_KEY = 'voiddex_team_v1';

  // Data model: { loadouts: [ { id, name, members: [ {dex, moves:[...], evs, ivs, nature } ] } ], active }
  // EV/IV/Nature default to a clean build (max IVs, neutral nature, no EVs) when absent.
  const S = () => window.VSTATS || {};
  function defEVs() { return (S().freshEVs ? S().freshEVs() : { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 }); }
  function defIVs() { return (S().maxIVs ? S().maxIVs() : { HP: 31, ATK: 31, DEF: 31, SPA: 31, SPD: 31, SPE: 31 }); }
  function normMember(m) {
    const ev = defEVs(), iv = defIVs();
    if (m && m.evs) ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'].forEach(k => { if (Number.isFinite(m.evs[k])) ev[k] = Math.max(0, Math.min(252, m.evs[k] | 0)); });
    if (m && m.ivs) ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'].forEach(k => { if (Number.isFinite(m.ivs[k])) iv[k] = Math.max(0, Math.min(31, m.ivs[k] | 0)); });
    const nature = (m && typeof m.nature === 'string' && S().NATURES && S().NATURES[m.nature]) ? m.nature : 'Hardy';
    return { dex: String(m.dex), moves: Array.isArray(m.moves) ? m.moves.slice(0, 4) : [], evs: ev, ivs: iv, nature };
  }
  function freshLoadout(name) { return { id: 'L' + Date.now() + Math.floor(Math.random() * 1000), name: name || 'New Team', members: [] }; }
  function loadAll() {
    try {
      const v = JSON.parse(localStorage.getItem(LS_KEY));
      if (v && Array.isArray(v.loadouts) && v.loadouts.length) {
        return { loadouts: v.loadouts.map(normLoadout), active: Math.min(v.active || 0, v.loadouts.length - 1) };
      }
    } catch (e) {}
    // migrate an old flat team if present
    try {
      const old = JSON.parse(localStorage.getItem(OLD_KEY));
      if (Array.isArray(old) && old.length) {
        const lo = freshLoadout('My Team');
        lo.members = old.filter(Boolean).slice(0, MAXTEAM).map(dex => ({ dex: String(dex), moves: [] }));
        return { loadouts: [lo], active: 0 };
      }
    } catch (e) {}
    return { loadouts: [freshLoadout('My Team')], active: 0 };
  }
  function normLoadout(l) {
    return {
      id: l.id || ('L' + Math.random()),
      name: typeof l.name === 'string' ? l.name : 'Team',
      members: Array.isArray(l.members) ? l.members.slice(0, MAXTEAM).map(normMember) : [],
    };
  }
  function saveAll(state) { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }

  // ---- per-loadout share code ----
  // Compact format:  VT2~<name>~<dex>.<2charMoveIds...>;<dex>.<...>;...
  // Each move is a 2-char base36 id from the master list; an unknown move is stored as <Name>.
  // dex is base36 (so '006' -> '6', '110' -> '32'). Still accepts old VTEAM1 codes.
  const padDex = (n) => String(n).padStart(3, '0');
  const SKEYS = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
  // compact spec suffix appended to a member segment only when it differs from
  // the default build (max IVs, neutral 'Hardy' nature, no EVs). Format:
  //   *<natureIdx b36 1ch> i<6× IV b36 1ch> e<6× EV b36 2ch>
  // Decoders that don't understand '*' simply ignore everything after it.
  function _isDefaultSpec(m) {
    const nat = m.nature || 'Hardy';
    const natList = (S().NATURE_LIST) || ['Hardy'];
    const evs = m.evs || defEVs(), ivs = m.ivs || defIVs();
    if (nat !== 'Hardy') return false;
    for (const k of SKEYS) { if ((evs[k] || 0) !== 0) return false; if ((ivs[k] == null ? 31 : ivs[k]) !== 31) return false; }
    return true;
  }
  function _encodeSpec(m) {
    if (_isDefaultSpec(m)) return '';
    const natList = (S().NATURE_LIST) || ['Hardy'];
    const ni = Math.max(0, natList.indexOf(m.nature || 'Hardy'));
    const ivs = m.ivs || defIVs(), evs = m.evs || defEVs();
    const ivStr = SKEYS.map(k => (ivs[k] == null ? 31 : ivs[k]).toString(36)).join('');
    const evStr = SKEYS.map(k => Math.max(0, Math.min(252, evs[k] | 0)).toString(36).padStart(2, '0')).join('');
    return '*' + ni.toString(36) + 'i' + ivStr + 'e' + evStr;
  }
  function encodeTeam(loadout) {
    try {
      const G = window.VGAME;
      const parts = loadout.members.map(m => {
        const ids = (m.moves || []).slice(0, 4).map(mv => {
          const id = G.moveToId(mv);
          return id ? id : '<' + mv + '>';
        }).join('');
        return parseInt(m.dex, 10).toString(36) + '.' + ids + _encodeSpec(m);
      }).join(';');
      return 'VT2~' + loadout.name + '~' + parts;
    } catch (e) { return ''; }
  }
  function _parseMoveIds(str) {
    const G = window.VGAME, out = [];
    let i = 0;
    while (i < str.length && out.length < 4) {
      if (str[i] === '<') {                       // literal <Name>
        const end = str.indexOf('>', i);
        if (end === -1) break;
        out.push(str.slice(i + 1, end)); i = end + 1;
      } else {                                     // 2-char id
        const id = str.slice(i, i + 2);
        const nm = G.idToMove(id);
        if (nm) out.push(nm);
        i += 2;
      }
    }
    return out;
  }
  function _parseSpec(specStr) {
    // specStr is the part after '*':  <natB36>i<6 IV b36><e><6×2 EV b36>
    try {
      const natList = (S().NATURE_LIST) || ['Hardy'];
      const iPos = specStr.indexOf('i'), ePos = specStr.indexOf('e', iPos + 1);
      const ni = parseInt(specStr.slice(0, iPos), 36) || 0;
      const nature = natList[ni] || 'Hardy';
      const ivPart = specStr.slice(iPos + 1, ePos);
      const evPart = specStr.slice(ePos + 1);
      const ivs = {}, evs = {};
      SKEYS.forEach((k, idx) => {
        ivs[k] = Math.max(0, Math.min(31, parseInt(ivPart[idx] || 'v', 36) || 0));
        evs[k] = Math.max(0, Math.min(252, parseInt(evPart.slice(idx * 2, idx * 2 + 2) || '00', 36) || 0));
      });
      return { nature, ivs, evs };
    } catch (e) { return null; }
  }
  function decodeTeam(code) {
    try {
      const raw = code.trim();
      const G = window.VGAME;
      if (raw.startsWith('VT2~')) {
        const body = raw.slice(4);
        const sep = body.indexOf('~');
        const name = sep >= 0 ? body.slice(0, sep) : 'Imported Team';
        const rest = sep >= 0 ? body.slice(sep + 1) : '';
        const members = rest ? rest.split(';').filter(Boolean).slice(0, MAXTEAM).map(seg => {
          const dot = seg.indexOf('.');
          const dexRaw = dot >= 0 ? seg.slice(0, dot) : seg;
          let afterDot = dot >= 0 ? seg.slice(dot + 1) : '';
          // split off the optional EV/IV/nature spec (after '*')
          const star = afterDot.indexOf('*');
          const movesStr = star >= 0 ? afterDot.slice(0, star) : afterDot;
          const specStr = star >= 0 ? afterDot.slice(star + 1) : '';
          const base = { dex: padDex(parseInt(dexRaw, 36)), moves: _parseMoveIds(movesStr) };
          const spec = specStr ? _parseSpec(specStr) : null;
          return spec ? { ...base, ...spec } : base;
        }) : [];
        return { id: 'L' + Date.now(), name: name || 'Imported Team', members };
      }
      // legacy VTEAM1 (base64 JSON)
      if (raw.startsWith('VTEAM1')) {
        const d = JSON.parse(decodeURIComponent(escape(atob(raw.slice(6)))));
        if (!d || !Array.isArray(d.m)) return null;
        return {
          id: 'L' + Date.now(),
          name: typeof d.n === 'string' ? d.n : 'Imported Team',
          members: d.m.slice(0, MAXTEAM).map(x => ({ dex: String(x[0]), moves: Array.isArray(x[1]) ? x[1].slice(0, 4) : [] })),
        };
      }
      return null;
    } catch (e) { return null; }
  }

  // Expose the share-code codec so other views (e.g. the Battle Sim) can import
  // a loadout without duplicating the format. Decoder returns:
  //   { id, name, members: [ { dex:'006', moves:['Move Name', ...] } ] }
  window.VTEAM = window.VTEAM || {};
  window.VTEAM.decodeTeam = decodeTeam;
  window.VTEAM.encodeTeam = encodeTeam;

  // a mon's learnable move names (deduped) from level/TM/egg lists
  function learnableMoves(dex) {
    const m = byDex(dex); if (!m) return [];
    const all = [...(m.levelMoves || []), ...(m.tmMoves || []), ...(m.eggMoves || [])].map(x => x.name || x).filter(Boolean);
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }

  // multiplier of an attacking type into a defender (1 or 2 types)
  function multInto(atk, defTypes) { return defTypes.reduce((m, d) => m * eff(atk, d), 1); }

  // a mon's STAB offensive types = its own types (simplest correct coverage proxy)
  function bestOffense(atk, allMons) {
    // how many team members have at least one move-type hitting super-effectively?
    // We use each mon's TYPES as its STAB coverage.
    return allMons.some(m => m.types.includes(atk));
  }

  function MonPickerModal({ onPick, onClose, exclude }) {
    const [q, setQ] = React.useState('');
    const list = DEX.filter(d => !d.undiscovered && !exclude.includes(d.dex) &&
      (!q.trim() || d.name.toLowerCase().includes(q.trim().toLowerCase()) || d.dex.includes(q.trim())));
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 760, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22, boxShadow: '0 30px 80px #000a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>Add a Pokémon</span>
            <button onClick={onClose} style={{ marginLeft: 'auto', cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
          </div>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or №…" spellCheck={false}
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
          </div>
        </div>
      </div>
    );
  }

  function MovePickerModal({ dex, current, onSave, onClose }) {
    const mon = byDex(dex);
    const moves = learnableMoves(dex);
    const [sel, setSel] = React.useState(current || []);
    const [q, setQ] = React.useState('');
    const toggle = (name) => setSel(s => s.includes(name) ? s.filter(x => x !== name) : (s.length < 4 ? [...s, name] : s));
    const shown = moves.filter(n => !q.trim() || n.toLowerCase().includes(q.trim().toLowerCase()));
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '50px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <SpriteSlot dex={dex} name={mon ? mon.name : dex} size={40} accent={mon ? TYPES[mon.types[0]].glow : '#8a5cff'} />
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff' }}>{mon ? mon.name : dex}</span>
            <span style={{ marginLeft: 'auto', fontFamily: "'Space Mono', monospace", fontSize: 13, color: sel.length === 4 ? '#ffd54a' : '#8a83a8' }}>{sel.length}/4 moves</span>
          </div>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search this Pokémon's moves…" spellCheck={false}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', margin: '8px 0 14px' }} />
          {moves.length === 0 ? <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a83a8', padding: '10px 0' }}>No learnable moves listed for this Pokémon yet.</div> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 6, maxHeight: 320, overflowY: 'auto' }}>
              {shown.map(name => {
                const on = sel.includes(name);
                const dis = !on && sel.length >= 4;
                return (
                  <button key={name} onClick={() => toggle(name)} disabled={dis} style={{ cursor: dis ? 'not-allowed' : 'pointer', textAlign: 'left', padding: '8px 11px', borderRadius: 8, background: on ? '#8a5cff33' : '#100c24', border: `1px solid ${on ? '#8a5cff' : '#221d3a'}`, color: on ? '#fff' : (dis ? '#4a4565' : '#cdc6e6'), fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: on ? 600 : 400 }}>
                    {on ? '✓ ' : ''}{name}
                  </button>
                );
              })}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => { onSave(sel); onClose(); }} style={{ cursor: 'pointer', flex: 1, padding: '11px', borderRadius: 10, background: 'linear-gradient(135deg, #4a3a9a, #2d2270)', border: '1px solid #6a52c0', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Save Moves</button>
            <button onClick={onClose} style={{ cursor: 'pointer', padding: '11px 16px', borderRadius: 10, background: 'transparent', border: '1px solid #2a2545', color: '#8a83a8', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  function StatEditorModal({ dex, member, onSave, onClose }) {
    const mon = byDex(dex);
    const VS = window.VSTATS || {};
    const NAT = VS.NATURES || {};
    const NATLIST = VS.NATURE_LIST || ['Hardy'];
    const EV_TOTAL = VS.EV_TOTAL_MAX || 510;
    const SK = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
    const SLABEL = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };
    const [evs, setEvs] = React.useState({ ...(member.evs || (VS.freshEVs ? VS.freshEVs() : {})) });
    const [ivs, setIvs] = React.useState({ ...(member.ivs || (VS.maxIVs ? VS.maxIVs() : {})) });
    const [nature, setNature] = React.useState(member.nature || 'Hardy');
    const LEVEL = 50; // Team Builder previews stats at Lv. 50
    const evTotal = SK.reduce((s, k) => s + (evs[k] || 0), 0);
    const evLeft = EV_TOTAL - evTotal;

    const setEv = (k, v) => {
      let n = Math.max(0, Math.min(252, v | 0));
      const others = evTotal - (evs[k] || 0);
      if (others + n > EV_TOTAL) n = EV_TOTAL - others; // clamp to the 510 cap
      setEvs(e => ({ ...e, [k]: n }));
    };
    const setIv = (k, v) => setIvs(i => ({ ...i, [k]: Math.max(0, Math.min(31, v | 0)) }));

    const natInfo = NAT[nature] || { up: null, down: null };
    const statColor = (k) => natInfo.up === k ? '#7ee08a' : (natInfo.down === k ? '#ff8fa6' : '#cdc6e6');
    const computed = (k) => {
      if (!mon || !VS.computeStat) return 0;
      return VS.computeStat(mon.stats[k], k, LEVEL, ivs[k] == null ? 31 : ivs[k], evs[k] || 0, nature);
    };
    // for the bar, scale against a generous max so bars read comparatively
    const barMax = 230;

    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '50px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <SpriteSlot dex={dex} name={mon ? mon.name : dex} size={40} accent={mon ? TYPES[mon.types[0]].glow : '#8a5cff'} />
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff' }}>{mon ? mon.name : dex}</span>
            <span style={{ marginLeft: 'auto', fontFamily: "'Space Mono', monospace", fontSize: 12, color: evLeft < 0 ? '#ff8fa6' : (evLeft === 0 ? '#ffd54a' : '#8a83a8') }}>EVs: {evTotal}/{EV_TOTAL}</span>
          </div>

          {/* nature */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a83a8', minWidth: 56 }}>Nature</span>
            <select value={nature} onChange={e => setNature(e.target.value)}
              style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, outline: 'none' }}>
              {NATLIST.map(n => {
                const info = NAT[n] || {};
                const tag = info.up && info.down ? ` (+${SLABEL[info.up]} / -${SLABEL[info.down]})` : ' (neutral)';
                return <option key={n} value={n}>{n}{tag}</option>;
              })}
            </select>
          </div>

          {/* per-stat rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {SK.map(k => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 56, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: statColor(k), fontWeight: 600 }}>{SLABEL[k]}</span>
                <span style={{ width: 38, textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 14, color: '#fff' }}>{computed(k)}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#1a1533', overflow: 'hidden' }}>
                  <div style={{ width: Math.min(100, Math.round((computed(k) / barMax) * 100)) + '%', height: '100%', background: 'linear-gradient(90deg,#5a2db3,#8a5cff)' }} />
                </div>
                <input type="range" min="0" max="252" step="4" value={evs[k] || 0} onChange={e => setEv(k, +e.target.value)}
                  style={{ width: 96 }} title="EVs" />
                <span style={{ width: 30, textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#8a83a8' }}>{evs[k] || 0}</span>
                <input type="number" min="0" max="31" value={ivs[k] == null ? 31 : ivs[k]} onChange={e => setIv(k, +e.target.value)}
                  title="IV (0-31)"
                  style={{ width: 42, padding: '4px 5px', borderRadius: 6, background: '#100c24', border: '1px solid #2a2545', color: '#cdc6e6', fontFamily: "'Space Mono', monospace", fontSize: 12, textAlign: 'center', outline: 'none' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#6a6388', margin: '6px 2px 0', paddingLeft: 102 }}>
            <span>← EV slider (0-252)</span><span>IV →</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => { setEvs(VS.freshEVs ? VS.freshEVs() : {}); setIvs(VS.maxIVs ? VS.maxIVs() : {}); setNature('Hardy'); }}
              style={{ cursor: 'pointer', padding: '11px 14px', borderRadius: 10, background: 'transparent', border: '1px solid #2a2545', color: '#8a83a8', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Reset</button>
            <button onClick={() => { onSave({ evs, ivs, nature }); onClose(); }} style={{ cursor: 'pointer', flex: 1, padding: '11px', borderRadius: 10, background: 'linear-gradient(135deg, #4a3a9a, #2d2270)', border: '1px solid #6a52c0', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Save</button>
            <button onClick={onClose} style={{ cursor: 'pointer', padding: '11px 16px', borderRadius: 10, background: 'transparent', border: '1px solid #2a2545', color: '#8a83a8', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Cancel</button>
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#6a6388', marginTop: 10, textAlign: 'center' }}>Stats shown at Lv. 50. Green = nature boost, red = nature drop.</div>
        </div>
      </div>
    );
  }

  window.VIEWS.Team = function Team() {
    const [data, setData] = React.useState(loadAll);
    const [picking, setPicking] = React.useState(false);
    const [movePick, setMovePick] = React.useState(null);   // {index} of member to edit moves
    const [statPick, setStatPick] = React.useState(null);   // index of member to edit EV/IV/nature
    const [share, setShare] = React.useState(null);          // null | 'export' | 'import'
    const [importText, setImportText] = React.useState('');
    const [copied, setCopied] = React.useState(false);
    React.useEffect(() => { saveAll(data); }, [data]);

    const active = data.loadouts[data.active] || data.loadouts[0];
    const members = active.members;
    const team = members.map(m => m.dex);            // dex array — keeps the analyzer below unchanged
    const mons = team.map(byDex).filter(Boolean);

    // mutate the active loadout's members
    const setMembers = (fn) => setData(d => {
      const los = d.loadouts.map((l, i) => i === d.active ? { ...l, members: fn(l.members) } : l);
      return { ...d, loadouts: los };
    });
    const add = (dex) => { setMembers(ms => ms.length < MAXTEAM ? [...ms, { dex, moves: [], evs: defEVs(), ivs: defIVs(), nature: 'Hardy' }] : ms); setPicking(false); };
    const remove = (i) => setMembers(ms => ms.filter((_, idx) => idx !== i));
    const clear = () => { if (window.confirm('Clear all Pokémon from "' + active.name + '"?')) setMembers(() => []); };
    const setMoves = (i, moves) => setMembers(ms => ms.map((m, idx) => idx === i ? { ...m, moves } : m));
    const setSpec = (i, spec) => setMembers(ms => ms.map((m, idx) => idx === i ? { ...m, ...spec } : m));

    // loadout management
    const switchTo = (i) => setData(d => ({ ...d, active: i }));
    const newLoadout = () => setData(d => { const lo = freshLoadout('Team ' + (d.loadouts.length + 1)); return { loadouts: [...d.loadouts, lo], active: d.loadouts.length }; });
    const renameLoadout = (name) => setData(d => ({ ...d, loadouts: d.loadouts.map((l, i) => i === d.active ? { ...l, name } : l) }));
    const deleteLoadout = () => setData(d => {
      if (d.loadouts.length <= 1) { return { loadouts: [freshLoadout('My Team')], active: 0 }; }
      if (!window.confirm('Delete the loadout "' + active.name + '"?')) return d;
      const los = d.loadouts.filter((_, i) => i !== d.active);
      return { loadouts: los, active: Math.max(0, d.active - 1) };
    });
    const importLoadout = () => {
      const lo = decodeTeam(importText);
      if (!lo) { alert('That team code is not valid. Make sure you copied the whole thing (it starts with VT2).'); return; }
      setData(d => ({ loadouts: [...d.loadouts, lo], active: d.loadouts.length }));
      setImportText(''); setShare(null);
    };

    // ---- DEFENSE: for each attacking type, how many team members are weak / resist / immune ----
    const defRows = TYPE_ORDER.map(atk => {
      let weak = 0, resist = 0, immune = 0;
      mons.forEach(m => {
        const mult = multInto(atk, m.types);
        if (mult === 0) immune++;
        else if (mult >= 2) weak++;
        else if (mult <= 0.5) resist++;
      });
      return { atk, weak, resist, immune, net: weak - resist - immune };
    });
    // sort: biggest shared weaknesses first
    const threats = defRows.filter(r => r.weak > 0).sort((a, b) => b.weak - a.weak || a.atk.localeCompare(b.atk));
    const safe = defRows.filter(r => r.weak === 0 && (r.resist > 0 || r.immune > 0)).sort((a, b) => (b.resist + b.immune) - (a.resist + a.immune));

    // ---- OFFENSE: which types does the team hit super-effectively (via STAB) ----
    const teamStab = Array.from(new Set(mons.flatMap(m => m.types)));
    const offRows = TYPE_ORDER.map(def => {
      // best STAB multiplier the team can land on a mono-type 'def'
      let best = 0;
      teamStab.forEach(atk => { best = Math.max(best, eff(atk, def)); });
      return { def, best };
    });
    const covered = offRows.filter(r => r.best >= 2).map(r => r.def);
    const notCovered = offRows.filter(r => r.best < 2).map(r => r.def);

    // team stat totals
    const statTotals = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'].map(k => ({
      k, avg: mons.length ? Math.round(mons.reduce((s, m) => s + m.stats[k], 0) / mons.length) : 0,
    }));

    const Chip = ({ t, count, tone }) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 7, background: TYPES[t].bg + '55', border: `1px solid ${TYPES[t].glow}55`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: TYPES[t].fg }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPES[t].glow }} />
        {TYPES[t].name}
        {count != null && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: tone || '#fff', fontWeight: 700 }}>×{count}</span>}
      </span>
    );

    const H3 = ({ children, color = '#8a5cff' }) => <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color }}>{children}</h3>;

    return (
      <div>
        {picking && <MonPickerModal exclude={team} onPick={add} onClose={() => setPicking(false)} />}
        {movePick != null && members[movePick] && (
          <MovePickerModal dex={members[movePick].dex} current={members[movePick].moves}
            onSave={(mv) => setMoves(movePick, mv)} onClose={() => setMovePick(null)} />
        )}
        {statPick != null && members[statPick] && (
          <StatEditorModal dex={members[statPick].dex} member={normMember(members[statPick])}
            onSave={(spec) => setSpec(statPick, spec)} onClose={() => setStatPick(null)} />
        )}
        {share && (
          <div onClick={() => setShare(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(5,4,12,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 540, background: 'radial-gradient(ellipse at 50% 0%, #1a1330, #0c0a1c 80%)', border: '1px solid #6a52c044', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button onClick={() => { setCopied(false); setShare('export'); }} style={{ cursor: 'pointer', flex: 1, padding: '9px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: share === 'export' ? '#8a5cff22' : '#100c24', border: `1px solid ${share === 'export' ? '#8a5cff' : '#2a2545'}`, color: share === 'export' ? '#fff' : '#9a93bb' }}>Export "{active.name}"</button>
                <button onClick={() => setShare('import')} style={{ cursor: 'pointer', flex: 1, padding: '9px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: share === 'import' ? '#8a5cff22' : '#100c24', border: `1px solid ${share === 'import' ? '#8a5cff' : '#2a2545'}`, color: share === 'import' ? '#fff' : '#9a93bb' }}>Import Team</button>
              </div>
              {share === 'export' ? (
                <div>
                  <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.5 }}>Copy this code to share "{active.name}" (Pokémon and their moves) with anyone, or load it on another device.</p>
                  <textarea readOnly value={encodeTeam(active)} onFocus={e => e.target.select()} spellCheck={false}
                    style={{ width: '100%', height: 110, resize: 'none', borderRadius: 10, background: '#0a0818', border: '1px solid #2a2545', color: '#cdbfff', fontFamily: "'Space Mono', monospace", fontSize: 12, padding: 12, outline: 'none', wordBreak: 'break-all' }} />
                  <button onClick={() => { try { navigator.clipboard.writeText(encodeTeam(active)); setCopied(true); } catch (e) {} }}
                    style={{ cursor: 'pointer', marginTop: 12, width: '100%', padding: '11px', borderRadius: 10, background: copied ? '#0f3320' : 'linear-gradient(135deg, #4a3a9a, #2d2270)', border: '1px solid #6a52c0', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>{copied ? '✓ Copied!' : 'Copy Code'}</button>
                </div>
              ) : (
                <div>
                  <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.5 }}>Paste a team code below. It's added as a new loadout (your current teams are kept).</p>
                  <textarea value={importText} onChange={e => setImportText(e.target.value)} placeholder="Paste a VT2… code here" spellCheck={false}
                    style={{ width: '100%', height: 110, resize: 'none', borderRadius: 10, background: '#0a0818', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Mono', monospace", fontSize: 12, padding: 12, outline: 'none', wordBreak: 'break-all' }} />
                  <button onClick={importLoadout} style={{ cursor: 'pointer', marginTop: 12, width: '100%', padding: '11px', borderRadius: 10, background: 'linear-gradient(135deg, #4a3a9a, #2d2270)', border: '1px solid #6a52c0', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Add as New Loadout</button>
                </div>
              )}
              <button onClick={() => setShare(null)} style={{ cursor: 'pointer', marginTop: 10, width: '100%', padding: '9px', borderRadius: 8, background: 'transparent', border: '1px solid #2a2545', color: '#8a83a8', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
            </div>
          </div>
        )}

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 2, color: '#8a5cff', marginBottom: 8 }}>BATTLE PREP</div>
            <h1 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 1, color: '#fff', textShadow: '0 0 30px #8a5cff66' }}>Team Builder</h1>
            <p style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: '#bdb6dd', maxWidth: 640, lineHeight: 1.6 }}>Build named loadouts, pick each Pokémon's moves, and see your team's type coverage. Share any loadout with a code. Everything saves on this device.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => { setCopied(false); setShare('export'); }} style={{ cursor: 'pointer', background: '#1a1238', border: '1px solid #6a52c066', color: '#cdbfff', borderRadius: 10, padding: '10px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>⇄ Share</button>
            {team.length > 0 && (
              <button onClick={clear} style={{ cursor: 'pointer', background: '#2a1020', border: '1px solid #ff5f7e66', color: '#ff8fa6', borderRadius: 10, padding: '10px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>↺ Clear</button>
            )}
          </div>
        </div>

        {/* loadout tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18, padding: 10, borderRadius: 12, background: '#0b0918', border: '1px solid #1d1838' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388', letterSpacing: 0.5, marginRight: 2 }}>LOADOUTS</span>
          {data.loadouts.map((l, i) => (
            <button key={l.id} onClick={() => switchTo(i)} style={{ cursor: 'pointer', padding: '7px 13px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: i === data.active ? 'linear-gradient(135deg, #322663, #1d1542)' : '#100c24', border: `1px solid ${i === data.active ? '#6a52c0' : '#2a2545'}`, color: i === data.active ? '#fff' : '#9a93bb' }}>
              {l.name} <span style={{ opacity: 0.6, fontSize: 11 }}>({l.members.length})</span>
            </button>
          ))}
          <button onClick={newLoadout} title="New loadout" style={{ cursor: 'pointer', padding: '7px 12px', borderRadius: 8, background: '#100c24', border: '1px dashed #3a2f6e', color: '#b08fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>＋ New</button>
        </div>

        {/* active loadout name + delete */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388' }}>NAME</span>
          <input value={active.name} onChange={e => renameLoadout(e.target.value)} spellCheck={false}
            style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', background: 'transparent', border: 'none', borderBottom: '1px dashed #2a235099', outline: 'none', padding: '2px 4px', minWidth: 120, maxWidth: 320 }} />
          <button onClick={deleteLoadout} style={{ cursor: 'pointer', marginLeft: 'auto', background: '#1a1020', border: '1px solid #ff5f7e44', color: '#ff8fa6', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600 }}>Delete Loadout</button>
        </div>

        {/* team slots */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 14 }}>
          {Array.from({ length: MAXTEAM }).map((_, i) => {
            const m = mons[i];
            if (!m) return (
              <button key={i} onClick={() => setPicking(true)} disabled={team.length >= MAXTEAM && !m} style={{ cursor: 'pointer', minHeight: 180, borderRadius: 14, background: 'repeating-linear-gradient(135deg, #0c0a1c, #0c0a1c 10px, #0e0b22 10px, #0e0b22 20px)', border: '1.5px dashed #2a2350', color: '#5f5980', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 30, color: '#3a2f6e' }}>＋</span>
                <span>Add Pokémon</span>
              </button>
            );
            const accent = TYPES[m.types[0]].glow;
            const mv = members[i] ? members[i].moves : [];
            return (
              <div key={i} style={{ position: 'relative', minHeight: 180, borderRadius: 14, background: `radial-gradient(ellipse at 50% 0%, ${TYPES[m.types[0]].bg}44, #0c0a1c 75%)`, border: `1px solid ${accent}55`, padding: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={() => remove(i)} title="Remove" style={{ position: 'absolute', top: 6, right: 6, cursor: 'pointer', width: 22, height: 22, borderRadius: '50%', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', fontSize: 13, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                  <SpriteSlot dex={m.dex} name={m.name} size={84} accent={accent} />
                </button>
                <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginTop: 2 }}>{m.name}</div>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', marginTop: 5 }}>{m.types.map(t => <TypePill key={t} t={t} sm />)}</div>
                {/* moves */}
                <div style={{ width: '100%', marginTop: 9, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[0, 1, 2, 3].map(k => (
                    <div key={k} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, padding: '3px 7px', borderRadius: 5, background: mv[k] ? '#15112a' : 'transparent', border: `1px solid ${mv[k] ? '#2a2545' : '#181430'}`, color: mv[k] ? '#cdc6e6' : '#3a3550', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mv[k] || '—'}</div>
                  ))}
                </div>
                <button onClick={() => setMovePick(i)} style={{ cursor: 'pointer', marginTop: 8, width: '100%', padding: '6px', borderRadius: 7, background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600 }}>{mv.length ? 'Edit Moves' : '+ Add Moves'}</button>
                <button onClick={() => setStatPick(i)} style={{ cursor: 'pointer', marginTop: 6, width: '100%', padding: '6px', borderRadius: 7, background: '#161226', border: '1px solid #2a2545', color: '#9a93bb', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600 }}>⚙ EVs / IVs / Nature</button>
              </div>
            );
          })}
        </div>

        {mons.length === 0 ? (
          <div style={{ marginTop: 30 }}><Empty label="Add a Pokémon to analyze your team's coverage." /></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 14 }}>
            {/* DEFENSE */}
            <section style={{ padding: 20, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a' }}>
              <H3 color="#ff6f8f">DEFENSIVE — SHARED WEAKNESSES</H3>
              {threats.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#5fd1a0' }}>No shared weaknesses. Remarkably balanced.</div> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {threats.map(r => (
                    <div key={r.atk} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: '0 0 116px' }}><Chip t={r.atk} /></div>
                      <div style={{ flex: 1, height: 16, borderRadius: 4, background: '#15112a', overflow: 'hidden', display: 'flex' }}>
                        <div style={{ width: `${(r.weak / mons.length) * 100}%`, background: r.weak >= 3 ? '#ff5577' : '#ff8f5c', height: '100%' }} />
                      </div>
                      <span style={{ flex: '0 0 60px', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 12, color: r.weak >= 3 ? '#ff7799' : '#ffb38f', fontWeight: 700 }}>{r.weak} weak</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ height: 1, background: '#1d1838', margin: '18px 0' }} />
              <H3 color="#5fd1a0">WELL-RESISTED</H3>
              {safe.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>None notably resisted.</div> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {safe.slice(0, 12).map(r => <Chip key={r.atk} t={r.atk} count={r.resist + r.immune} tone="#5fd1a0" />)}
                </div>
              )}
            </section>

            {/* OFFENSE */}
            <section style={{ padding: 20, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a' }}>
              <H3 color="#5fd13c">OFFENSIVE COVERAGE (STAB)</H3>
              <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8', lineHeight: 1.5 }}>Types your party hits super-effectively using its own typing.</p>
              <div style={{ marginBottom: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#5fd13c' }}>HITS HARD ({covered.length}/{TYPE_ORDER.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                {covered.length === 0 ? <span style={{ color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 12 }}>None</span> : covered.map(t => <Chip key={t} t={t} />)}
              </div>
              <div style={{ marginBottom: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#ff8f5c' }}>COVERAGE GAPS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {notCovered.length === 0 ? <span style={{ color: '#5fd1a0', fontFamily: "'Space Mono', monospace", fontSize: 12 }}>Full coverage!</span> : notCovered.map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 7, background: '#15112a', border: '1px solid #2a2350', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPES[t].glow, opacity: 0.5 }} />{TYPES[t].name}
                  </span>
                ))}
              </div>
              <div style={{ height: 1, background: '#1d1838', margin: '18px 0' }} />
              <H3>TEAM AVERAGE STATS</H3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {statTotals.map(s => (
                  <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ flex: '0 0 64px', fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a83a8' }}>{STAT_LABELS[s.k].toUpperCase()}</span>
                    <div style={{ flex: 1, height: 10, borderRadius: 3, background: '#15112a', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (s.avg / 200) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #6a4dd6, #b08fff)' }} />
                    </div>
                    <span style={{ flex: '0 0 36px', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#e9e4ff', fontWeight: 700 }}>{s.avg}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  };
})();
