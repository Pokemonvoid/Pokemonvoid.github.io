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
    const [mode, setMode] = React.useState('filter');     // filter | h2h
    const [typeF, setTypeF] = React.useState('ALL');
    const [q, setQ] = React.useState('');
    const [minBst, setMinBst] = React.useState(0);
    const [sortKey, setSortKey] = React.useState('BST'); // BST | HP | ATK | ... | name
    const [sortDir, setSortDir] = React.useState('desc');
    const [picks, setPicks] = React.useState([null, null, null]); // dex strings for h2h
    const [pickerFor, setPickerFor] = React.useState(null);        // which slot index is choosing
    const [pq, setPq] = React.useState('');                        // picker search

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
        <PageHead kicker="STAT LAB" title="Compare" sub="Stack Pokémon side by side. Filter a whole type and sort any stat to see who wins it, or pick up to 3 Pokémon for a direct head-to-head." />

        {/* mode toggle */}
        <div style={{ display: 'inline-flex', borderRadius: 10, overflow: 'hidden', border: '1px solid #2a2545', marginBottom: 18 }}>
          <button onClick={() => setMode('filter')} style={{ cursor: 'pointer', padding: '9px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: mode === 'filter' ? 'linear-gradient(135deg, #322663, #1d1542)' : '#100c24', border: 'none', borderRight: '1px solid #2a2545', color: mode === 'filter' ? '#fff' : '#9a93bb' }}>⊞ Browse &amp; Filter</button>
          <button onClick={() => setMode('h2h')} style={{ cursor: 'pointer', padding: '9px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: mode === 'h2h' ? 'linear-gradient(135deg, #322663, #1d1542)' : '#100c24', border: 'none', color: mode === 'h2h' ? '#fff' : '#9a93bb' }}>⚔ Head-to-Head</button>
        </div>

        {mode === 'filter' && <React.Fragment>
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
        </React.Fragment>}

        {mode === 'h2h' && <HeadToHead picks={picks} setPicks={setPicks} pickerFor={pickerFor} setPickerFor={setPickerFor} pq={pq} setPq={setPq} />}
      </div>
    );
  };

  // ---- Head-to-Head: pick up to 3 Pokémon (any type) and compare directly ----
  function HeadToHead({ picks, setPicks, pickerFor, setPickerFor, pq, setPq }) {
    const chosen = picks.map(dx => dx ? DEX.find(d => d.dex === dx) : null);
    const active = chosen.filter(Boolean);
    // per-stat winner among the chosen (only when 2+)
    const best = {};
    STAT_KEYS.forEach(k => { best[k] = active.length > 1 ? Math.max(...active.map(d => d.stats[k])) : -1; });
    const bstBest = active.length > 1 ? Math.max(...active.map(bst)) : -1;

    const term = pq.trim().toLowerCase();
    const options = DEX.filter(d => !d.undiscovered && !picks.includes(d.dex) &&
      (!term || d.name.toLowerCase().includes(term) || d.dex.includes(term)))
      .sort((a, b) => a.name.localeCompare(b.name));

    const setSlot = (i, dx) => { setPicks(p => p.map((v, idx) => idx === i ? dx : v)); setPickerFor(null); setPq(''); };

    const StatRow = ({ k }) => (
      <div style={{ display: 'grid', gridTemplateColumns: '92px repeat(3, 1fr)', gap: 10, alignItems: 'center', padding: '7px 0', borderTop: '1px solid #1a1630' }}>
        <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a83a8' }}>{STAT_LABELS[k].toUpperCase()}</span>
        {chosen.map((d, i) => {
          if (!d) return <span key={i} />;
          const v = d.stats[k], win = v === best[k] && active.length > 1, col = STAT_COLORS[k];
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: win ? col : '#d8d2f0' }}>{v}{win && <span style={{ fontSize: 10, color: col, marginLeft: 2 }}>★</span>}</div>
              <div style={{ height: 5, borderRadius: 3, background: '#181334', overflow: 'hidden', marginTop: 3 }}>
                <div style={{ width: (v / STAT_MAX) * 100 + '%', height: '100%', background: col, opacity: win ? 1 : 0.6 }} />
              </div>
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
        {/* slot pickers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {[0, 1, 2].map(i => {
            const d = chosen[i];
            const accent = d ? TYPES[d.types[0]].glow : '#3a2f6e';
            return (
              <div key={i} style={{ borderRadius: 14, border: `1px solid ${d ? accent + '66' : '#2a2545'}`, background: d ? `radial-gradient(ellipse at 50% 0%, ${TYPES[d.types[0]].bg}33, #0c0a1c 75%)` : '#0e0b1f', padding: 14, textAlign: 'center', minHeight: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {d ? (
                  <React.Fragment>
                    <button onClick={() => setSlot(i, null)} title="Remove" style={{ position: 'absolute', top: 6, right: 6, cursor: 'pointer', width: 22, height: 22, borderRadius: '50%', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', fontSize: 13, lineHeight: 1 }}>×</button>
                    <button onClick={() => go('#/pokemon/' + d.dex)} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                      <SpriteSlot dex={d.dex} name={d.name} size={84} accent={accent} />
                    </button>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#5f5980' }}>No.{d.dex}</div>
                    <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{d.name}</div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 5 }}>{d.types.map(t => <TypePill key={t} t={t} sm />)}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, marginTop: 8, color: bst(d) === bstBest && active.length > 1 ? accent : '#9a93bb' }}>BST {bst(d)}{bst(d) === bstBest && active.length > 1 && <span style={{ color: accent }}> ★</span>}</div>
                    <button onClick={() => { setPickerFor(i); setPq(''); }} style={{ cursor: 'pointer', marginTop: 8, background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 7, padding: '5px 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600 }}>Change</button>
                  </React.Fragment>
                ) : (
                  <button onClick={() => { setPickerFor(i); setPq(''); }} style={{ cursor: 'pointer', width: '100%', height: '100%', minHeight: 120, background: 'transparent', border: 'none', color: '#b08fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <span style={{ fontSize: 30 }}>＋</span> Pick Pokémon {i + 1}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* stat comparison */}
        {active.length === 0 ? (
          <Empty label="Pick up to 3 Pokémon above to compare them head-to-head." />
        ) : (
          <div style={{ border: '1px solid #221d3a', borderRadius: 14, background: '#0e0b1f', padding: '6px 18px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '92px repeat(3, 1fr)', gap: 10, padding: '10px 0 4px' }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388' }}>STAT</span>
              {chosen.map((d, i) => <span key={i} style={{ textAlign: 'center', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 14, color: d ? '#fff' : '#3a3550' }}>{d ? d.name : '—'}</span>)}
            </div>
            {STAT_KEYS.map(k => <StatRow key={k} k={k} />)}
            {/* BST row */}
            <div style={{ display: 'grid', gridTemplateColumns: '92px repeat(3, 1fr)', gap: 10, alignItems: 'center', padding: '9px 0 2px', borderTop: '2px solid #2a2350', marginTop: 4 }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#b08fff' }}>TOTAL</span>
              {chosen.map((d, i) => {
                if (!d) return <span key={i} />;
                const t = bst(d), win = t === bstBest && active.length > 1;
                return <div key={i} style={{ textAlign: 'center', fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: win ? TYPES[d.types[0]].glow : '#d8d2f0' }}>{t}{win && ' ★'}</div>;
              })}
            </div>
          </div>
        )}

        {/* picker overlay */}
        {pickerFor !== null && (
          <div onClick={() => setPickerFor(null)} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '50px 20px', overflowY: 'auto' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22 }}>
              <input autoFocus value={pq} onChange={e => setPq(e.target.value)} placeholder="Search Pokémon…" spellCheck={false}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', marginBottom: 14 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8, maxHeight: 360, overflowY: 'auto' }}>
                {options.map(d => (
                  <button key={d.dex} onClick={() => setSlot(pickerFor, d.dex)} style={{ cursor: 'pointer', background: '#100c24', border: '1px solid #221d3a', borderRadius: 10, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <SpriteSlot dex={d.dex} name={d.name} size={48} accent={TYPES[d.types[0]].glow} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: '#e9e4ff' }}>{d.name}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setPickerFor(null)} style={{ cursor: 'pointer', marginTop: 14, width: '100%', padding: '9px', borderRadius: 8, background: 'transparent', border: '1px solid #2a2545', color: '#8a83a8', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
})();
