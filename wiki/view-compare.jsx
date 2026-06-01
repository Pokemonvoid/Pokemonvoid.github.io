/* Pokémon Void — Compare. window.VIEWS.Compare
   Filter the dex (by type, name, min BST) and compare stats side by side in a
   sortable table. Click a stat header to rank by it — e.g. pick COSMIC, sort by
   Speed, and instantly see the fastest Cosmic-type. Matches the Team Builder's
   look; lives on its own page so neither tool crowds the other. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, TYPES, STAT_LABELS, STAT_MAX } = window.VDEX;
  const { go, SpriteSlot, TypePill, PageHead, Empty } = window.VUI;
  const ALL_TYPES = Object.keys(TYPES);
  const STAT_KEYS = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
  const STAT_COLORS = { HP: '#f05050', ATK: '#f0a040', DEF: '#d4d040', SPA: '#6090f0', SPD: '#70d070', SPE: '#f06090' };
  const bst = (d) => STAT_KEYS.reduce((s, k) => s + d.stats[k], 0);

  window.VIEWS.Compare = function Compare() {
    const [typeF, setTypeF] = React.useState('ALL');
    const [q, setQ] = React.useState('');
    const [minBst, setMinBst] = React.useState(0);
    const [sortKey, setSortKey] = React.useState('BST'); // BST | HP | ATK | ... | name
    const [sortDir, setSortDir] = React.useState('desc');

    const term = q.trim().toLowerCase();
    let list = DEX.filter(d => !d.undiscovered &&
      (typeF === 'ALL' || d.types.includes(typeF)) &&
      (!term || d.name.toLowerCase().includes(term) || d.dex.includes(term)) &&
      bst(d) >= minBst);

    const val = (d) => sortKey === 'name' ? d.name : sortKey === 'BST' ? bst(d) : d.stats[sortKey];
    list = [...list].sort((a, b) => {
      const av = val(a), bv = val(b);
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    // per-column max among the *filtered* set, so bars scale to the comparison group
    const colMax = {};
    STAT_KEYS.forEach(k => { colMax[k] = Math.max(1, ...list.map(d => d.stats[k])); });
    const bstMax = Math.max(1, ...list.map(bst));

    const setSort = (k) => {
      if (sortKey === k) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      else { setSortKey(k); setSortDir(k === 'name' ? 'asc' : 'desc'); }
    };
    const Arrow = ({ k }) => sortKey !== k ? <span style={{ opacity: 0.25 }}>↕</span> : <span style={{ color: '#b08fff' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>;

    // header cell for a sortable stat column
    const StatHead = ({ k, label }) => (
      <button onClick={() => setSort(k)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, width: '100%', fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.5, color: sortKey === k ? '#cdbfff' : '#6a6388' }}>
        {label}<Arrow k={k} />
      </button>
    );

    const GRID = '52px minmax(140px, 1.6fr) 116px repeat(6, 1fr) 84px';

    return (
      <div>
        <PageHead kicker="STAT LAB" title="Compare" sub="Stack Pokémon side by side. Filter by type, then sort any stat column to instantly see who wins it — pick a type like Cosmic and tap Speed to find the fastest of its kind in Void." />

        {/* controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 200 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or №…" spellCheck={false} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a83a8' }}>
            MIN BST
            <input type="range" min={0} max={700} step={10} value={minBst} onChange={e => setMinBst(+e.target.value)} style={{ accentColor: '#8a5cff', width: 130 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: minBst ? '#cdbfff' : '#5f5980', minWidth: 30 }}>{minBst}</span>
          </label>
        </div>

        {/* type chips */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <button onClick={() => setTypeF('ALL')} style={{ cursor: 'pointer', padding: '4px 12px', borderRadius: 999, fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 0.5, color: typeF === 'ALL' ? '#fff' : '#6a6388', background: typeF === 'ALL' ? '#221a45' : 'transparent', border: `1px solid ${typeF === 'ALL' ? '#3a2f6e' : '#2a2545'}` }}>ALL</button>
          {ALL_TYPES.map(t => {
            const on = typeF === t; const c = TYPES[t];
            return <button key={t} onClick={() => setTypeF(t)} style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: 999, fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', color: on ? c.fg : '#6a6388', background: on ? c.bg : 'transparent', border: `1px solid ${on ? c.glow : '#2a2545'}`, opacity: on ? 1 : 0.75 }}>{c.name}</button>;
          })}
        </div>

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388', marginBottom: 12 }}>{list.length} {list.length === 1 ? 'Pokémon' : 'Pokémon'} · click a stat to sort</div>

        {list.length === 0 ? <Empty label="No Pokémon match these filters." /> : (
          <div style={{ border: '1px solid #221d3a', borderRadius: 14, overflow: 'hidden', background: '#0e0b1f' }}>
            {/* header row */}
            <div style={{ display: 'grid', gridTemplateColumns: GRID, gap: 10, padding: '12px 18px', borderBottom: '1px solid #221d3a', background: '#120e26', alignItems: 'center' }}>
              <span />
              <button onClick={() => setSort('name')} style={{ cursor: 'pointer', background: 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.5, color: sortKey === 'name' ? '#cdbfff' : '#6a6388' }}>NAME <Arrow k="name" /></button>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388' }}>TYPE</span>
              {STAT_KEYS.map(k => <StatHead key={k} k={k} label={STAT_LABELS[k] === 'HP' ? 'HP' : STAT_LABELS[k].toUpperCase()} />)}
              <StatHead k="BST" label="BST" />
            </div>

            {list.map((d, idx) => {
              const accent = TYPES[d.types[0]].glow;
              const total = bst(d);
              return (
                <div key={d.dex} style={{ display: 'grid', gridTemplateColumns: GRID, gap: 10, padding: '10px 18px', alignItems: 'center', borderTop: idx ? '1px solid #1a1630' : 'none' }}>
                  <button onClick={() => go('#/pokemon/' + d.dex)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', padding: 0 }}>
                    <SpriteSlot dex={d.dex} name={d.name} size={42} accent={accent} />
                  </button>
                  <button onClick={() => go('#/pokemon/' + d.dex)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', textAlign: 'left' }}>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#5f5980' }}>No.{d.dex}</div>
                    <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', lineHeight: 1.1 }}>{d.name}</div>
                  </button>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{d.types.map(t => <TypePill key={t} t={t} sm />)}</div>
                  {STAT_KEYS.map(k => {
                    const v = d.stats[k];
                    const isBest = v === colMax[k] && list.length > 1;
                    const col = STAT_COLORS[k];
                    return (
                      <div key={k} style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: isBest ? col : '#d8d2f0' }}>{v}{isBest && <span style={{ fontSize: 9, color: col, marginLeft: 2 }}>★</span>}</div>
                        <div style={{ height: 4, borderRadius: 2, background: '#181334', overflow: 'hidden', marginTop: 3 }}>
                          <div style={{ width: (v / colMax[k]) * 100 + '%', height: '100%', background: col, opacity: isBest ? 1 : 0.65 }} />
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: accent }}>{total}</div>
                    <div style={{ height: 4, borderRadius: 2, background: '#181334', overflow: 'hidden', marginTop: 3 }}>
                      <div style={{ width: (total / bstMax) * 100 + '%', height: '100%', background: accent }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
})();
