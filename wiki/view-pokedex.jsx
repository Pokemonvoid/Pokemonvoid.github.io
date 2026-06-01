/* Pokémon Void — Pokédex grid view. window.VIEWS.Pokedex */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, TYPES } = window.VDEX;
  const { go, TypePill, SpriteSlot, PageHead, Empty } = window.VUI;
  const ALL_TYPES = Object.keys(TYPES);

  function Card({ d, evStat }) {
    const [hov, setHov] = React.useState(false);
    const accent = TYPES[d.types[0]].glow;
    const total = Object.values(d.stats).reduce((a, b) => a + b, 0);
    const STAT_SHORT = { HP: 'HP', ATK: 'ATK', DEF: 'DEF', SPA: 'SPA', SPD: 'SPD', SPE: 'SPE' };
    const evBadge = (evStat && evStat !== 'any' && d.evYield && d.evYield[evStat] > 0)
      ? `${STAT_SHORT[evStat]} +${d.evYield[evStat]}` : null;
    if (d.undiscovered) {
      return (
        <button onClick={() => go('#/pokemon/' + d.dex)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{
            textAlign: 'left', cursor: 'pointer', padding: 16, borderRadius: 16,
            background: hov ? 'linear-gradient(160deg, #2a1a4a55, #0e0b1f)' : '#0e0b1f',
            border: `1px solid ${hov ? '#c45fffaa' : '#221d3a'}`,
            boxShadow: hov ? '0 0 28px #c45fff33' : 'none', transition: 'all .18s', transform: hov ? 'translateY(-3px)' : 'none',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 12, color: '#5f5980' }}>No.{d.dex}</span>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#c45fff' }}>🔒</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, position: 'relative' }}>
            <div style={{ filter: 'blur(9px) brightness(0.45) saturate(0.6)', userSelect: 'none', pointerEvents: 'none' }}>
              <SpriteSlot dex={d.dex} name="???" size={132} accent="#c45fff" />
            </div>
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', lineHeight: 1, letterSpacing: 3 }}>???</div>
          <div style={{ fontSize: 12, color: '#7a7398', margin: '3px 0 10px' }}>Undiscovered</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #1a1630' }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980' }}>BST</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: '#c45fff', fontWeight: 700 }}>???</span>
          </div>
        </button>
      );
    }
    return (
      <button onClick={() => go('#/pokemon/' + d.dex)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          textAlign: 'left', cursor: 'pointer', padding: 16, borderRadius: 16,
          background: hov ? `linear-gradient(160deg, ${TYPES[d.types[0]].bg}55, #0e0b1f)` : '#0e0b1f',
          border: `1px solid ${hov ? accent + 'aa' : '#221d3a'}`,
          boxShadow: hov ? `0 0 28px ${accent}33` : 'none', transition: 'all .18s', transform: hov ? 'translateY(-3px)' : 'none',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 12, color: '#5f5980' }}>No.{d.dex}</span>
          {d.legendary && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a5cff' }}>★ LEGEND</span>}
          {d.pseudo && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#33d6ff' }}>RARE</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <SpriteSlot dex={d.dex} name={d.name} size={132} accent={accent} />
        </div>
        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', lineHeight: 1 }}>{d.name}</div>
        <div style={{ fontSize: 12, color: '#7a7398', margin: '3px 0 10px' }}>{d.category}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>{d.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/pokemon/' + d.dex); }} />)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #1a1630' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980' }}>BST</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {evBadge && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#7fe06a', background: '#12301c', border: '1px solid #2f8f4a', borderRadius: 4, padding: '2px 6px' }}>{evBadge}</span>}
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: accent, fontWeight: 700 }}>{total}</span>
          </span>
        </div>
      </button>
    );
  }

  window.VIEWS.Pokedex = function Pokedex({ query }) {
    const [filters, setFilters] = React.useState([]);
    const [sort, setSort] = React.useState('dex');
    const [evStat, setEvStat] = React.useState('any');
    const q = (query || '').trim().toLowerCase();

    const toggle = (t) => setFilters(f => f.includes(t) ? f.filter(x => x !== t) : [...f, t]);

    let list = DEX.filter(d => {
      if (q && !(d.name.toLowerCase().includes(q) || d.dex.includes(q) || d.category.toLowerCase().includes(q))) return false;
      if (filters.length && !filters.every(t => d.types.includes(t))) return false;
      if (evStat !== 'any' && !(d.evYield && d.evYield[evStat] > 0)) return false;
      return true;
    });
    const bst = d => Object.values(d.stats).reduce((a, b) => a + b, 0);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'bst') list = [...list].sort((a, b) => bst(b) - bst(a));
    else list = [...list].sort((a, b) => a.dex.localeCompare(b.dex));

    const SortBtn = ({ id, label }) => (
      <button onClick={() => setSort(id)} style={{
        cursor: 'pointer', padding: '6px 12px', borderRadius: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
        background: sort === id ? '#221a45' : 'transparent', color: sort === id ? '#fff' : '#8a83a8',
        border: `1px solid ${sort === id ? '#3a2f6e' : '#221d3a'}`, fontWeight: sort === id ? 600 : 400,
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>{label}</button>
    );

    return (
      <div>
        <PageHead kicker="NATIONAL VOIDDEX" title="Pokédex" sub="Every creature catalogued in the Drapalla Region — and the one thing beyond it. Filter by type, search by name, click any entry for the full file." />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ALL_TYPES.map(t => {
              const on = filters.includes(t);
              const c = TYPES[t];
              return (
                <button key={t} onClick={() => toggle(t)} style={{
                  cursor: 'pointer', padding: '4px 10px', borderRadius: 999, fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 0.5,
                  textTransform: 'uppercase', color: on ? c.fg : '#6a6388', background: on ? c.bg : 'transparent',
                  border: `1px solid ${on ? c.glow : '#2a2545'}`, opacity: on ? 1 : 0.7,
                }}>{c.name}</button>
              );
            })}
            {filters.length > 0 && <button onClick={() => setFilters([])} style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: 999, fontSize: 11, color: '#ff6f8f', background: 'transparent', border: '1px solid #5e2030', fontFamily: "'Space Grotesk', sans-serif" }}>clear ×</button>}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980' }}>EV</span>
              <select value={evStat} onChange={e => setEvStat(e.target.value)} style={{ padding: '6px 10px', borderRadius: 7, background: '#15112a', color: evStat === 'any' ? '#8a83a8' : '#fff', border: `1px solid ${evStat === 'any' ? '#221d3a' : '#3a2f6e'}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, cursor: 'pointer' }}>
                <option value="any" style={{ background: '#15112a' }}>Any EV yield</option>
                <option value="HP" style={{ background: '#15112a' }}>HP</option>
                <option value="ATK" style={{ background: '#15112a' }}>Attack</option>
                <option value="DEF" style={{ background: '#15112a' }}>Defense</option>
                <option value="SPA" style={{ background: '#15112a' }}>Sp. Atk</option>
                <option value="SPD" style={{ background: '#15112a' }}>Sp. Def</option>
                <option value="SPE" style={{ background: '#15112a' }}>Speed</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980' }}>SORT</span>
              <SortBtn id="dex" label="Dex №" /><SortBtn id="name" label="A–Z" /><SortBtn id="bst" label="Total" />
            </div>
          </div>
        </div>

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388', marginBottom: 16 }}>{list.length} {list.length === 1 ? 'entry' : 'entries'}</div>

        {list.length === 0 ? <Empty label="No Pokémon match your filters." /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(216px, 1fr))', gap: 16 }}>
            {list.map(d => <Card key={d.dex} d={d} evStat={evStat} />)}
          </div>
        )}
      </div>
    );
  };
})();
