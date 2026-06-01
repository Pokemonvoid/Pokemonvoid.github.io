window.VIEWS = window.VIEWS || {};
(function () {
  const { byDex, DEX, TYPES } = window.VDEX;
  const { ABILITIES } = window.VGAME;
  const { go, PageHead, Empty } = window.VUI;

  window.VIEWS.Abilities = function Abilities() {
    const [q, setQ] = React.useState('');
    const monsByAbility = DEX.reduce((map, mon) => {
      [...(mon.abilities || []), mon.hidden].filter(Boolean).forEach(name => {
        map[name] = map[name] || [];
        map[name].push(mon.dex);
      });
      return map;
    }, {});
    const list = ABILITIES.filter(a => !q.trim() || a.name.toLowerCase().includes(q.trim().toLowerCase()) || (a.desc || '').toLowerCase().includes(q.trim().toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div>
        <PageHead kicker="ABILITY INDEX" title="Abilities" sub="Passive powers that shape every battle." />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', maxWidth: 280, marginBottom: 22 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search abilities…" spellCheck={false} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
        </div>

        {list.length === 0 ? <Empty label="No abilities match." /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {list.map(a => {
              const mons = a.mons || monsByAbility[a.name] || [];
              return (
                <div key={a.name} style={{ padding: 18, borderRadius: 14, background: a.rare ? 'linear-gradient(160deg, #1a1140, #0e0b1f)' : '#0e0b1f', border: `1px solid ${a.rare ? '#3a2f6e' : '#221d3a'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff' }}>{a.name}</span>
                    {a.hidden && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a5cff', border: '1px solid #3a2f6e', borderRadius: 4, padding: '2px 6px' }}>HIDDEN</span>}
                    {a.rare && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#33d6ff', border: '1px solid #1d4a6e', borderRadius: 4, padding: '2px 6px' }}>SIGNATURE</span>}
                  </div>
                  <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#bdb6dd', lineHeight: 1.55 }}>{a.desc}</p>
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginBottom: 8 }}>FOUND ON</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {mons.map(dx => { const m = byDex(dx); if (!m) return null; return (
                      <button key={dx} onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 6px', borderRadius: 999, background: '#15112a', border: `1px solid ${TYPES[m.types[0]].glow}44` }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: TYPES[m.types[0]].glow }} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#e9e4ff', fontWeight: 600 }}>{m.name}</span>
                      </button>
                    ); })}
                    {mons.length === 0 && (
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No known Pokémon yet.</span>
                    )}
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
