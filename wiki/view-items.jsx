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


  const POCKETS = ['Poké Balls', 'Medicines', 'Battle Items', 'Held Items', 'Berries', 'Evolution Items', 'Other Items', 'TMs', 'Fossils', 'Treasures', 'Mail', 'Key Items'];
  window.VIEWS.Items = function Items() {
    const [q, setQ] = React.useState('');
    const [pocket, setPocket] = React.useState('Poké Balls');
    const [pickup, setPickup] = React.useState(false);
    const pockets = ['All items', ...POCKETS.filter(name => ITEMS.some(item => item.cat === name))];
    const search = q.trim().toLowerCase();
    const matches = item => !search || [item.name, item.desc, item.move || ''].some(text => text.toLowerCase().includes(search));
    const list = ITEMS.filter(item => (pocket === 'All items' || item.cat === pocket) && matches(item)).sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}));
    return <div>
      <PageHead kicker="ITEM BAG" title="Your bag" sub="Choose a pocket to browse Void’s items." />
      <style>{`
        .bag-layout { display: grid; grid-template-columns: 210px minmax(0, 1fr); gap: 24px; align-items: start; }
        .bag-pockets { display: flex; flex-direction: column; gap: 6px; padding: 10px; border: 1px solid #302847; border-radius: 14px; background: #100d20; }
        .bag-pocket { display: flex; justify-content: space-between; gap: 14px; padding: 13px 12px; border: 1px solid transparent; border-radius: 8px; color: #a99fc3; background: transparent; font: inherit; text-align: left; cursor: pointer; }
        .bag-pocket[aria-pressed=true] { background: #292041; border-color: #78609e; color: #f3e9ff; }
        .bag-pocket:hover { background: #221a37; color: #fff; }
        .bag-pocket small { color: #b49bcf; }
        .bag-content { min-width: 0; }
        .bag-search { width: 100%; padding: 13px 15px; margin-bottom: 16px; border-radius: 9px; border: 1px solid #3a2b51; background: #171123; color: #eee6ff; font: inherit; box-sizing: border-box; }
        .bag-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 16px; }
        .bag-heading h2 { font-family: 'Pixelify Sans'; font-size: 28px; margin: 0; }
        .bag-heading span { color: #a699bb; font-size: 12px; }
        .bag-items { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr)); gap: 12px; }
        .bag-item { display: flex; gap: 14px; padding: 18px; border: 1px solid #29203d; background: #100c1e; border-radius: 12px; }
        .bag-item h3 { font-family: 'Pixelify Sans'; font-size: 20px; color: #f3edff; margin: 0 0 8px; }
        .bag-item p { color: #bdb3d2; font-size: 13px; line-height: 1.6; margin: 0; }
        .bag-pocket:focus-visible, .bag-search:focus-visible { outline: 2px solid #c5a7ef; outline-offset: 2px; }
        @media(max-width: 760px) { .bag-layout { grid-template-columns: 1fr; } .bag-pockets { flex-direction: row; overflow-x: auto; } .bag-pocket { flex: 0 0 auto; } }
      `}</style>
      <div className="bag-layout">
        <nav className="bag-pockets" aria-label="Bag pockets">{pockets.map(name => <button className="bag-pocket" key={name} aria-pressed={!pickup && pocket === name} onClick={() => {setPocket(name); setPickup(false);}}><span>{name}</span><small>{ITEMS.filter(item => (name === 'All items' || item.cat === name) && matches(item)).length}</small></button>)}<button className="bag-pocket" aria-pressed={pickup} onClick={() => setPickup(true)}>Pickup chart</button></nav>
        <section className="bag-content" aria-label={pickup ? 'Pickup chart' : pocket}>
          {pickup ? <PickupChart /> : <>
            <input className="bag-search" aria-label="Search bag" placeholder="Search the bag…" value={q} onChange={event => setQ(event.target.value)} />
            <div className="bag-heading"><h2>{pocket}</h2><span>{list.length} items</span></div>
            {list.length ? <div className="bag-items">{list.map(item => <article className="bag-item" key={item.id || item.name}>
              <ItemIcon item={item} color={CAT_COLOR[item.cat] || '#ad8de0'} />
              <div><h3>{item.name}</h3><p>{item.desc}</p>{item.move && <p>Teaches {item.move}</p>}{item.find && <p>{item.find}</p>}</div>
            </article>)}</div> : <Empty label="No matches in this pocket. Check the counts beside the other pockets." />}
          </>}
        </section>
      </div>
    </div>;
  };
})();
