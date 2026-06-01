/* Pokémon Void — Items view. window.VIEWS.Items */
window.VIEWS = window.VIEWS || {};
(function () {
  const { ITEMS, PICKUP } = window.VGAME;
  const { PageHead, Empty, ItemIcon } = window.VUI;

  const CAT_COLOR = {
    'Evolution': '#5fd13c', 'Valuable': '#ffd23c', 'Battle Items': '#8a5cff', 'Key Item': '#33d6ff',
    'Medicine': '#ff6f8f', 'Poké Ball': '#ff8a5c', 'Berries': '#d13c8a',
  };

  // rarity tint for the Pickup chart columns
  const PCT_COLOR = { 30: '#5fd13c', 10: '#33d6ff', 4: '#ff8a5c', 1: '#ff5fa2' };
  function ucfile(name) { return name.replace(/[ '\-]/g, '').toUpperCase() + '.png'; }

  function PickupChart() {
    if (!PICKUP || !PICKUP.length) return null;
    // Build a fixed column template from the widest row so every row aligns.
    const widest = PICKUP.reduce((a, r) => r.cells.length > a.length ? r.cells : a, []);
    const colPcts = widest.map(c => c.pct); // e.g. [30,10,10,10,10,10,4,4,1,1]
    const nCols = colPcts.length;
    // Align each row's cells into the column template by walking pct-tiers in order.
    function alignRow(cells) {
      const out = new Array(nCols).fill(null);
      let ci = 0;
      for (const cell of cells) {
        // advance ci until the template pct matches this cell's pct
        while (ci < nCols && colPcts[ci] !== cell.pct) ci++;
        if (ci < nCols) { out[ci] = cell; ci++; }
      }
      return out;
    }
    return (
      <div style={{ marginTop: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 32, color: '#fff' }}>Pickup</h2>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a5cff', border: '1px solid #3a2f6e', borderRadius: 5, padding: '3px 8px' }}>ABILITY</span>
        </div>
        <p style={{ margin: '0 0 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#9a93b5', lineHeight: 1.6, maxWidth: 720 }}>
          A Pokémon with the <strong style={{ color: '#cdbfff' }}>Pickup</strong> ability may be holding an item after battle. The item depends on the Pokémon's level — higher levels can find rarer rewards. Columns show the chance of each item.
        </p>
        <div style={{ display: 'flex', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          {[30, 10, 4, 1].map(p => (
            <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#bdb6dd' }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: PCT_COLOR[p], boxShadow: `0 0 8px ${PCT_COLOR[p]}88` }} />{p}% chance
            </span>
          ))}
        </div>
        <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid #2a2350', background: '#0c0a1c' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 880 }}>
            <thead>
              <tr>
                <th style={{ position: 'sticky', left: 0, background: '#16112e', padding: '10px 14px', textAlign: 'left', fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#8a5cff', borderBottom: '1px solid #2a2350', zIndex: 1 }}>LEVEL</th>
                {colPcts.map((p, i) => (
                  <th key={i} style={{ padding: '8px 4px', borderBottom: '1px solid #2a2350', borderLeft: '1px solid #1a1532' }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: PCT_COLOR[p] }}>{p}%</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PICKUP.map((row, ri) => (
                <tr key={row.band} style={{ background: ri % 2 ? '#0e0b20' : 'transparent' }}>
                  <td style={{ position: 'sticky', left: 0, background: ri % 2 ? '#16112e' : '#120e26', padding: '8px 14px', fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: '#e9e4ff', borderRight: '1px solid #2a2350', whiteSpace: 'nowrap' }}>{row.band}</td>
                  {alignRow(row.cells).map((c, ci) => {
                    const col = c ? (PCT_COLOR[c.pct] || '#8a5cff') : '#2a2350';
                    return (
                      <td key={ci} title={c ? c.name + ' (' + c.pct + '%)' : ''} style={{ padding: '6px 4px', textAlign: 'center', borderLeft: '1px solid #1a1532' }}>
                        {c ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: `radial-gradient(circle at 38% 32%, ${col}22, #0b0918)`, border: `1px solid ${col}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              {c.icon ? <img src={'items/' + c.icon} alt={c.name} onError={(e) => { e.target.style.display = 'none'; }} style={{ width: '80%', height: '80%', objectFit: 'contain', imageRendering: 'pixelated' }} /> : <span style={{ width: 12, height: 12, borderRadius: 3, background: col }} />}
                            </div>
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 9.5, color: '#9a93b5', lineHeight: 1.15, maxWidth: 64 }}>{c.name}</span>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  window.VIEWS.Items = function Items() {
    const [q, setQ] = React.useState('');
    const [cat, setCat] = React.useState('All');
    const cats = ['All', ...Array.from(new Set(ITEMS.map(i => i.cat)))];
    const list = ITEMS.filter(i => (cat === 'All' || i.cat === cat) && (!q.trim() || i.name.toLowerCase().includes(q.trim().toLowerCase())));

    return (
      <div>
        <PageHead kicker="ITEM BAG" title="Items" sub="Evolution stones, battle items, berries, and the tools you'll need to survive the descent into the Nullspace Rift." />

        <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 220 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search items…" spellCheck={false} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: cat === c ? 600 : 400, color: cat === c ? '#fff' : '#8a83a8', background: cat === c ? '#221a45' : 'transparent', border: `1px solid ${cat === c ? '#3a2f6e' : '#221d3a'}` }}>{c}</button>
            ))}
          </div>
        </div>

        {list.length === 0 ? <Empty label="No items match." /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {list.map(it => {
              const col = CAT_COLOR[it.cat] || '#8a5cff';
              return (
                <div key={it.name} style={{ display: 'flex', gap: 14, padding: 16, borderRadius: 14, background: '#0e0b1f', border: '1px solid #221d3a' }}>
                  <ItemIcon item={it} color={col} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{it.name}</span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: col, border: `1px solid ${col}55`, borderRadius: 4, padding: '2px 6px' }}>{it.cat.toUpperCase()}</span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#bdb6dd', lineHeight: 1.5 }}>{it.desc}</p>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>◷ {it.find}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <PickupChart />
      </div>
    );
  };
})();
