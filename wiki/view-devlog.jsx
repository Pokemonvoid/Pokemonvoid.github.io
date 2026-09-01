/* Pokémon Void — Dev Log / Patch Notes view.  window.VIEWS.DevLog */
window.VIEWS = window.VIEWS || {};
(function () {
  const { PageHead, Empty } = window.VUI;
  const ENTRIES = (window.VDEVLOG && window.VDEVLOG.ENTRIES) || [];

  const SECTION_COLORS = {
    'Added': '#5cffd0',
    'New Content': '#5cffd0',
    'Changed': '#ffd166',
    'Fixed': '#5cc8ff',
    'Fixes & Improvements': '#5cc8ff',
    'Removed': '#ff6b8a',
  };
  const colorFor = (label) => SECTION_COLORS[label] || '#b6aee0';

  function Entry({ e, isLatest }) {
    const visibleSections = (e.sections || []).filter(s => s.items && s.items.length);
    return (
      <div style={{ position: 'relative', paddingLeft: 26, paddingBottom: 34 }}>
        {/* timeline rail */}
        <div style={{ position: 'absolute', left: 5, top: 6, bottom: 0, width: 2, background: 'linear-gradient(180deg, #5a47a0, #221d3a)' }} />
        <div style={{ position: 'absolute', left: 0, top: 4, width: 12, height: 12, borderRadius: '50%',
          background: isLatest ? '#8a5cff' : '#3a3260', boxShadow: isLatest ? '0 0 12px #8a5cffaa' : 'none',
          border: '2px solid #0a0818' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
          {e.version && (
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#fff',
              background: 'linear-gradient(135deg, #5a47a0, #3a2d70)', borderRadius: 7, padding: '4px 9px' }}>{e.version}</span>
          )}
          {e.date && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#7a72a8' }}>{e.date}</span>}
          {isLatest && (
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 1, color: '#5cffd0',
              border: '1px solid #5cffd055', borderRadius: 6, padding: '3px 7px' }}>LATEST</span>
          )}
        </div>

        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 6 }}>{e.title}</div>
        {e.summary && <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#bdb6dd', lineHeight: 1.6, margin: '0 0 12px' }}>{e.summary}</p>}

        {e.download && e.download.url && (
          <a href={e.download.url} target="_blank" rel="noopener"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18, textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff',
              background: 'linear-gradient(135deg, #6a4fd0, #4a2d90)', borderRadius: 9, padding: '9px 16px',
              boxShadow: '0 0 14px #6a4fd044' }}>
            ⬇ {e.download.label || 'Download'}
          </a>
        )}

        {visibleSections.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: (e.known && e.known.length) || (e.upcoming && e.upcoming.length) ? 16 : 0 }}>
            {visibleSections.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: colorFor(s.label), marginBottom: 8 }}>{s.label.toUpperCase()}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {s.items.map((it, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: colorFor(s.label), fontSize: 13, lineHeight: 1.5 }}>▸</span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#d8d2f0', lineHeight: 1.5 }}>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {e.known && e.known.length > 0 && (
          <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(255, 107, 107, 0.07)', border: '1px solid #ff6b6b33', marginBottom: (e.upcoming && e.upcoming.length) ? 14 : 0 }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: '#ff8a8a', marginBottom: 8 }}>⚠ KNOWN ISSUE</div>
            {e.known.map((it, j) => (
              <div key={j} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#e8c8c8', lineHeight: 1.55, marginBottom: j < e.known.length - 1 ? 6 : 0 }}>{it}</div>
            ))}
          </div>
        )}

        {e.upcoming && e.upcoming.length > 0 && (
          <div style={{ padding: '12px 14px', borderRadius: 10, background: '#0e0b1f', border: '1px solid #221d3a' }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: '#8a5cff', marginBottom: 8 }}>🔨 IN THE WORKS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {e.upcoming.map((it, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#8a5cff', fontSize: 13, lineHeight: 1.5 }}>▸</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#bdb6dd', lineHeight: 1.5 }}>{it}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  window.VIEWS.DevLog = function DevLog() {
    if (!ENTRIES.length) {
      return (<div><PageHead kicker="DEV LOG" title="Patch Notes" sub="What's changed in the Void." /><Empty label="No entries yet." /></div>);
    }
    return (
      <div>
        <PageHead kicker="DEV LOG" title="Patch Notes" sub="What's changed, added, and fixed — newest first." />
        <div style={{ maxWidth: 720 }}>
          {ENTRIES.map((e, i) => <Entry key={e.version || i} e={e} isLatest={i === 0} />)}
        </div>
      </div>
    );
  };
})();
