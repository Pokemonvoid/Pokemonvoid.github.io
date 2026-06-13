/* Pokémon Void — Walkthrough / Guide view.  window.VIEWS.Guide */
window.VIEWS = window.VIEWS || {};
(function () {
  const { PageHead, Empty } = window.VUI;
  const CHAPTERS = (window.VGUIDE && window.VGUIDE.CHAPTERS) || [];

  // Distinct speaker colours so dialogue is easy to scan.
  const SPEAKER_COLORS = {
    'Hickory': '#5cc8ff', 'Pecan': '#ff9ad2', '<Player>': '#ffd166',
    'Rival 1': '#9d7bff', 'Rival 2': '#7be0a8', '???': '#8a7fb8',
  };
  const colorFor = (who) => SPEAKER_COLORS[who] || '#b6aee0';

  window.VIEWS.Guide = function Guide() {
    const [active, setActive] = React.useState(CHAPTERS.length ? CHAPTERS[0].id : null);
    const [showScript, setShowScript] = React.useState(true);

    if (!CHAPTERS.length) {
      return (<div><PageHead kicker="WALKTHROUGH" title="Guide" sub="Step-by-step story walkthrough." /><Empty label="No chapters yet." /></div>);
    }

    const ch = CHAPTERS.find(c => c.id === active) || CHAPTERS[0];

    return (
      <div>
        <PageHead kicker="WALKTHROUGH" title="Guide" sub="A chapter-by-chapter walkthrough — quick summaries layered over the full story script." />

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'start' }}>
          {/* Chapter list */}
          <div className="v-keeprow" style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'sticky', top: 80 }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980', letterSpacing: 1, padding: '0 4px 4px' }}>CHAPTERS</div>
            {CHAPTERS.map((c, i) => {
              const on = c.id === ch.id;
              return (
                <button key={c.id} onClick={() => setActive(c.id)}
                  style={{ textAlign: 'left', cursor: 'pointer', padding: '10px 12px', borderRadius: 10,
                    background: on ? 'linear-gradient(135deg, #2a2055, #1a1238)' : '#130f24',
                    border: `1px solid ${on ? '#5a47a0' : '#221d3a'}`, color: on ? '#fff' : '#b6aee0',
                    boxShadow: on ? '0 0 14px #8a5cff33' : 'none', transition: 'all .15s' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#7a72a8' }}>{String(i + 1).padStart(2, '0')} · {c.area}</div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15 }}>{c.title}</div>
                </button>
              );
            })}
          </div>

          {/* Chapter content */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 28, color: '#fff', lineHeight: 1 }}>{ch.title}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#8a5cff', marginTop: 4, marginBottom: 14 }}>{ch.area}</div>
            {ch.blurb && <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#bdb6dd', lineHeight: 1.6, margin: '0 0 18px' }}>{ch.blurb}</p>}

            {/* Summary layer */}
            {ch.summary && (
              <div style={{ padding: 16, borderRadius: 14, background: 'linear-gradient(160deg, #161130, #0e0b1f)', border: '1px solid #2a2350', marginBottom: 18 }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5cffd0', letterSpacing: 1, marginBottom: 12 }}>QUICK SUMMARY</div>
                {ch.summary.objectives && ch.summary.objectives.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#7a72a8', marginBottom: 6 }}>OBJECTIVES</div>
                    {ch.summary.objectives.map((o, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                        <span style={{ color: '#5cffd0', fontSize: 13, lineHeight: 1.5 }}>▸</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#d8d2f0', lineHeight: 1.5 }}>{o}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
                  {ch.summary.items && ch.summary.items.length > 0 && (
                    <div><div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#ffd166', marginBottom: 5 }}>ITEMS</div>
                      {ch.summary.items.map((it, i) => <div key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#d8d2f0' }}>{it}</div>)}</div>
                  )}
                  {ch.summary.mons && ch.summary.mons.length > 0 && (
                    <div><div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#ff9ad2', marginBottom: 5 }}>POKÉMON</div>
                      {ch.summary.mons.map((m, i) => <div key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#d8d2f0' }}>{m}</div>)}</div>
                  )}
                </div>
                {ch.summary.tip && (
                  <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: '#0a0818', border: '1px solid #2a2350' }}>
                    <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5cc8ff' }}>TIP&nbsp;&nbsp;</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.55 }}>{ch.summary.tip}</span>
                  </div>
                )}
              </div>
            )}

            {/* Screenshots, if any */}
            {ch.shots && ch.shots.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 18 }}>
                {ch.shots.map((src, i) => (
                  <img key={i} src={src} alt={ch.title + ' screenshot'} loading="lazy"
                    style={{ width: '100%', borderRadius: 10, border: '1px solid #2a2350', imageRendering: 'pixelated' }} />
                ))}
              </div>
            )}

            {/* Dialogue layer */}
            {ch.dialogue && ch.dialogue.length > 0 && (
              <div>
                <button onClick={() => setShowScript(s => !s)}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: '4px 0', marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a5cff', letterSpacing: 1 }}>FULL SCRIPT</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>{showScript ? '[ hide ]' : '[ show ]'}</span>
                </button>
                {showScript && (
                  <div style={{ padding: 16, borderRadius: 14, background: '#0e0b1f', border: '1px solid #221d3a' }}>
                    {ch.dialogue.map((line, i) => {
                      if (!line.who) {
                        return (<div key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388', fontStyle: 'italic', margin: '12px 0 6px', borderTop: i ? '1px solid #1d1838' : 'none', paddingTop: i ? 10 : 0 }}>{line.text}</div>);
                      }
                      return (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'baseline' }}>
                          <span style={{ flexShrink: 0, minWidth: 64, textAlign: 'right', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: colorFor(line.who) }}>{line.who}</span>
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#d8d2f0', lineHeight: 1.55 }}>{line.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
})();
