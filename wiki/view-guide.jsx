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

  // Map each chapter id -> the location slug used by the Locations tab
  // (#/location/<slug>). Chapters with no real location (e.g. the intro) are omitted.
  const LOC_SLUGS = {
    'starter': 'saudade-town',
    'saudade-town': 'saudade-town',
    'route-1': 'route-1',
    'eventide-forest': 'eventide-forest',
    'route-5': 'route-5',
    'professors-lab': 'professor-hickorys-lab',
    'route-2': 'route-2',
    'pebpup-cave': 'pebpup-cavern',
    'limerico-town': 'limerico-town',
    'limerico-gym': 'limerico-town',
    'route-4': 'route-4',
    'route-3': 'route-3',
    'aphora-town': 'aphora-town',
  };

  // Renders a title so any embedded number uses the Silkscreen pixel font,
  // matching how the Locations tab renders "Route 2", "Route 5", etc.
  function RouteName({ text, size }) {
    const parts = String(text).split(/(\d+)/);
    return parts.map((p, i) =>
      /^\d+$/.test(p)
        ? <span key={i} style={{ fontFamily: "'Silkscreen', monospace", fontSize: size ? size * 0.82 : undefined, letterSpacing: 1 }}>{p}</span>
        : <span key={i}>{p}</span>
    );
  }

  window.VIEWS.Guide = function Guide() {
    const [active, setActive] = React.useState(CHAPTERS.length ? CHAPTERS[0].id : null);
    const [showScript, setShowScript] = React.useState(true);
    const [lightbox, setLightbox] = React.useState(null); // image src being viewed large, or null

    if (!CHAPTERS.length) {
      return (<div><PageHead kicker="WALKTHROUGH" title="Guide" sub="Step-by-step story walkthrough." /><Empty label="No chapters yet." /></div>);
    }

    const ch = CHAPTERS.find(c => c.id === active) || CHAPTERS[0];
    const go = (hash) => { window.location.hash = hash; };
    const locSlug = LOC_SLUGS[ch.id];

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
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#7a72a8' }}>{String(i + 1).padStart(2, '0')} · <RouteName text={c.area} /></div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15 }}><RouteName text={c.title} size={15} /></div>
                </button>
              );
            })}
          </div>

          {/* Chapter content */}
          <div style={{ minWidth: 0 }}>
            {/* Title — a button linking to the location info when one exists */}
            {locSlug ? (
              <button onClick={() => go('#/location/' + locSlug)}
                title={'View location info for ' + ch.area}
                style={{ cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 28, color: '#fff', lineHeight: 1 }}><RouteName text={ch.title} size={28} /></span>
                <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 1, color: '#5cc8ff', border: '1px solid #5cc8ff55', borderRadius: 6, padding: '3px 7px' }}>LOCATION ›</span>
              </button>
            ) : (
              <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 28, color: '#fff', lineHeight: 1 }}><RouteName text={ch.title} size={28} /></div>
            )}
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#8a5cff', marginTop: 4, marginBottom: 14 }}><RouteName text={ch.area} /></div>
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

            {/* Screenshots — each is a button that opens a larger view */}
            {ch.shots && ch.shots.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 18 }}>
                {ch.shots.map((src, i) => (
                  <button key={i} onClick={() => setLightbox(src)} title="Click to enlarge"
                    style={{ cursor: 'zoom-in', padding: 0, border: '1px solid #2a2350', borderRadius: 10, overflow: 'hidden', background: '#0a0818', position: 'relative' }}>
                    <img src={src} alt={ch.title + ' screenshot'} loading="lazy"
                      style={{ display: 'block', width: '100%', imageRendering: 'pixelated' }} />
                    <span style={{ position: 'absolute', bottom: 6, right: 6, fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#fff', background: 'rgba(10,8,24,0.7)', borderRadius: 5, padding: '3px 5px' }}>⤢ ENLARGE</span>
                  </button>
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

        {/* Lightbox overlay */}
        {lightbox && (
          <div onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5,4,12,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}>
            <div style={{ position: 'relative', maxWidth: '92vw', maxHeight: '92vh' }}>
              <img src={lightbox} alt="Enlarged screenshot"
                style={{ display: 'block', maxWidth: '92vw', maxHeight: '92vh', imageRendering: 'pixelated', borderRadius: 12, border: '1px solid #5a47a0', boxShadow: '0 0 40px #8a5cff44' }} />
              <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                style={{ position: 'absolute', top: -14, right: -14, width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', background: '#1a1238', border: '1px solid #5a47a0', color: '#fff', fontSize: 16, lineHeight: 1 }}>✕</button>
            </div>
          </div>
        )}
      </div>
    );
  };
})();
