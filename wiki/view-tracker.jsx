/* Pokémon Void — Caught Tracker. window.VIEWS.Tracker
   A Pokédex-style grid where each Pokémon can be marked Caught / Shiny / Anomaly.
   Tap a card to open its status toggles; status persists in localStorage (per-device).
   Filter tabs: All / Caught / Uncaught / Shiny / Anomaly, plus name/type search. */
(function () {
  const { go, SpriteSlot, PageHead, TYPES } = window.VUI;
  const DEX = window.VDEX.DEX;
  const byDex = window.VDEX.byDex;

  const ANOMALY_ICON = 'sprites/_anomaly-icon.png';
  const SHINY_ICON = 'sprites/_shiny-icon.png';
  const LS_KEY = 'voiddex_caught_v1';

  // state shape: { [dex]: { caught, shiny, anomaly } }
  function loadState() {
    try {
      const v = JSON.parse(localStorage.getItem(LS_KEY));
      if (v && v.marks) return v.marks;
    } catch (e) {}
    return {};
  }
  function saveState(marks) { try { localStorage.setItem(LS_KEY, JSON.stringify({ v: 1, marks })); } catch (e) {} }

  window.VIEWS.Tracker = function Tracker() {
    const [marks, setMarks] = React.useState(loadState);
    const [filter, setFilter] = React.useState('all'); // all | caught | uncaught | shiny | anomaly
    const [q, setQ] = React.useState('');

    React.useEffect(() => { saveState(marks); }, [marks]);

    const species = DEX.filter(d => !d.undiscovered);
    const total = species.length;

    const get = (dex) => marks[dex] || { caught: false, shiny: false, anomaly: false };
    const update = (dex, patch) => setMarks(m => {
      const cur = m[dex] || { caught: false, shiny: false, anomaly: false };
      const next = { ...cur, ...patch };
      const m2 = { ...m };
      if (!next.caught && !next.shiny && !next.anomaly) delete m2[dex];
      else m2[dex] = next;
      return m2;
    });
    // tapping the sprite cycles: none -> caught -> caught+shiny -> caught+anomaly -> none
    const cycle = (dex) => {
      const s = get(dex);
      if (!s.caught && !s.shiny && !s.anomaly) update(dex, { caught: true });
      else if (s.caught && !s.shiny && !s.anomaly) update(dex, { caught: true, shiny: true });
      else if (s.shiny && !s.anomaly) update(dex, { caught: true, shiny: false, anomaly: true });
      else update(dex, { caught: false, shiny: false, anomaly: false });
    };

    // counts
    const caughtCount = species.filter(d => { const s = get(d.dex); return s.caught || s.shiny || s.anomaly; }).length;
    const shinyCount = species.filter(d => get(d.dex).shiny).length;
    const anomalyCount = species.filter(d => get(d.dex).anomaly).length;

    // filter + search
    const term = q.trim().toLowerCase();
    const list = species.filter(d => {
      const s = get(d.dex);
      const any = s.caught || s.shiny || s.anomaly;
      if (filter === 'caught' && !any) return false;
      if (filter === 'uncaught' && any) return false;
      if (filter === 'shiny' && !s.shiny) return false;
      if (filter === 'anomaly' && !s.anomaly) return false;
      if (!term) return true;
      return d.name.toLowerCase().includes(term) || d.dex.includes(term) ||
        (d.types || []).some(t => TYPES[t] && TYPES[t].name.toLowerCase().includes(term));
    });

    const pct = total ? Math.round((caughtCount / total) * 100) : 0;

    const FilterBtn = ({ id, label, color }) => (
      <button onClick={() => setFilter(id)} style={{ cursor: 'pointer', padding: '7px 14px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: filter === id ? (color || '#8a5cff') + '33' : '#100c24', border: `1px solid ${filter === id ? (color || '#8a5cff') : '#2a2545'}`, color: filter === id ? '#fff' : '#9a93bb', transition: 'all .15s ease' }}>{label}</button>
    );

    const Stat = ({ label, value, color }) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 16px', borderRadius: 10, background: '#100c24', border: '1px solid #221d3a', minWidth: 78 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: color || '#fff' }}>{value}</span>
        <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, letterSpacing: 0.5, color: '#8a83a8', marginTop: 2 }}>{label}</span>
      </div>
    );

    return (
      <div>
        <PageHead kicker="CAUGHT TRACKER" title="Caught Tracker" sub="Tap a Pokémon to cycle Caught → Shiny → Anomaly. Your progress saves to this device automatically." />

        {/* progress stats */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <Stat label="CAUGHT" value={`${caughtCount}/${total}`} color="#7ad17a" />
          <Stat label="SHINY" value={shinyCount} color="#ffd54a" />
          <Stat label="ANOMALY" value={anomalyCount} color="#ff7fe0" />
          <Stat label="COMPLETE" value={`${pct}%`} color="#8a5cff" />
          <div style={{ flex: 1 }} />
          <button onClick={() => { if (confirm('Reset all caught marks? This cannot be undone.')) setMarks({}); }}
            style={{ cursor: 'pointer', padding: '8px 14px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, background: '#1a1030', border: '1px solid #4a2545', color: '#d98fb0' }}>↺ Reset</button>
        </div>

        {/* progress bar */}
        <div style={{ height: 8, borderRadius: 6, background: '#15112a', border: '1px solid #221d3a', overflow: 'hidden', marginBottom: 18 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #6a52c0, #c45fff)', transition: 'width .3s ease' }} />
        </div>

        {/* filters + search */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
          <FilterBtn id="all" label="All" />
          <FilterBtn id="caught" label="Caught" color="#7ad17a" />
          <FilterBtn id="uncaught" label="Uncaught" color="#9a93bb" />
          <FilterBtn id="shiny" label="Shiny ✦" color="#ffd54a" />
          <FilterBtn id="anomaly" label="Anomaly ☾" color="#ff7fe0" />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 190 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name or type…" spellCheck={false}
              style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
          </div>
        </div>

        {/* grid */}
        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6a6388', fontFamily: "'Space Grotesk', sans-serif" }}>No Pokémon match this filter.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))', gap: 10 }}>
            {list.map(d => {
              const s = get(d.dex);
              const any = s.caught || s.shiny || s.anomaly;
              const accent = TYPES[d.types[0]] ? TYPES[d.types[0]].glow : '#8a5cff';
              return (
                <div key={d.dex} style={{ position: 'relative', borderRadius: 12, padding: '12px 8px 9px', background: any ? `linear-gradient(160deg, ${accent}1f, #0e0a20)` : '#0b0818', border: `1px solid ${any ? accent + '66' : '#1d1838'}`, textAlign: 'center', transition: 'all .15s ease' }}>
                  {/* sprite — click cycles status */}
                  <div onClick={() => cycle(d.dex)} title="Tap to cycle: Caught → Shiny → Anomaly → clear"
                    style={{ cursor: 'pointer', position: 'relative', width: 72, height: 72, margin: '0 auto', filter: any ? 'none' : 'grayscale(1) brightness(0.5)', opacity: any ? 1 : 0.7, transition: 'all .2s ease' }}>
                    <SpriteSlot dex={d.dex} name={d.name} size={72} accent={accent} suffix={s.shiny ? 'shiny' : (s.anomaly ? 'anomaly' : undefined)} />
                    {s.shiny && <img src={SHINY_ICON} alt="Shiny" style={{ position: 'absolute', top: -2, left: -2, width: 18, height: 18, imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #ffd54a)' }} />}
                    {s.anomaly && <img src={ANOMALY_ICON} alt="Anomaly" style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #ff7fe0)' }} />}
                    {s.caught && !s.shiny && !s.anomaly && <div style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: '#7ad17a', border: '2px solid #0b0818', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#062b06', fontWeight: 900 }}>✓</div>}
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#6a6388', marginTop: 6 }}>#{d.dex}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: any ? '#fff' : '#7a7398', lineHeight: 1.1, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
                  {/* quick toggles */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 7 }}>
                    <button onClick={() => update(d.dex, { caught: !(s.caught || s.shiny || s.anomaly), shiny: false, anomaly: false })}
                      title="Caught" style={{ cursor: 'pointer', width: 22, height: 20, borderRadius: 5, fontSize: 11, background: any ? '#7ad17a33' : '#15112a', border: `1px solid ${any ? '#7ad17a' : '#2a2545'}`, color: any ? '#7ad17a' : '#5f5980' }}>✓</button>
                    <button onClick={() => update(d.dex, { caught: true, shiny: !s.shiny, anomaly: false })}
                      title="Shiny" style={{ cursor: 'pointer', width: 22, height: 20, borderRadius: 5, fontSize: 11, background: s.shiny ? '#ffd54a33' : '#15112a', border: `1px solid ${s.shiny ? '#ffd54a' : '#2a2545'}`, color: s.shiny ? '#ffd54a' : '#5f5980' }}>✦</button>
                    <button onClick={() => update(d.dex, { caught: true, shiny: false, anomaly: !s.anomaly })}
                      title="Anomaly" style={{ cursor: 'pointer', width: 22, height: 20, borderRadius: 5, fontSize: 11, background: s.anomaly ? '#ff7fe033' : '#15112a', border: `1px solid ${s.anomaly ? '#ff7fe0' : '#2a2545'}`, color: s.anomaly ? '#ff7fe0' : '#5f5980' }}>☾</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ marginTop: 20, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#5f5980', lineHeight: 1.6 }}>
          Your progress is saved to this browser only, so it stays private and won't sync between devices. Tap a sprite to cycle its status, or use the small buttons under each Pokémon to set Caught, Shiny, or Anomaly directly.
        </p>
      </div>
    );
  };
})();
