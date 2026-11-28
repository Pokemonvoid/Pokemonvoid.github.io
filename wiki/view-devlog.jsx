/* Pokémon Void — release journal. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { PageHead, Empty } = window.VUI;
  const entries = (window.VDEVLOG && window.VDEVLOG.ENTRIES) || [];

  function changeKind(label, text) {
    if (/Held items and Mail are removed|cannot raise|can't raise|Skin tone remains locked|Skin tone stays locked|Story progress, Bag items/.test(text)) return { tone: 'negative', label: 'Restriction' };
    if (/^Fixed|^Fixes/.test(label) || /^Fixed|^Corrected|^Improved/.test(text)) return { tone: 'positive', label: 'Fix' };
    if (label === 'New Content' || /^New |^Added |^Three save files|^An upgraded|^A new |^Choose Ronan|^Choose from 42/.test(text)) return { tone: 'positive', label: 'Added' };
    return { tone: 'neutral', label: 'Changed' };
  }

  window.VIEWS.DevLog = function DevLog() {
    const [selected, setSelected] = React.useState(0);
    const entry = entries[selected];
    if (!entry) return <Empty label="No updates yet." />;
    const sections = (entry.sections || []).filter(section => section.items && section.items.length);
    const jumpTo = index => document.getElementById('release-section-' + index)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    return <section className="release-journal">
      <PageHead kicker="DEV LOG" title="Update Journal" sub="New adventures, battle changes and fixes across each release." />
      <div className="release-legend" aria-label="Change colours"><span className="change-positive">Added / fixed</span><span className="change-negative">Restrictions / losses</span><span className="change-neutral">Changes / information</span></div>
      <div className="release-layout">
        <aside className="release-sidebar" aria-label="Release navigation">
          <h2>Releases</h2>
          <div className="release-selector">{entries.map((item,index) => <button key={item.version || index} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
            <span>{item.version || item.title}</span><small>{index === 0 ? 'Latest update' : 'Previous update'}</small>
          </button>)}</div>
          <nav className="release-contents" aria-label="Sections in this release"><h2>In this update</h2>{sections.map((section,index) => <button type="button" key={section.label} onClick={() => jumpTo(index)}><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span>{section.label}</button>)}</nav>
        </aside>
        <article className="release-document" aria-label={entry.title}>
          <header className="release-cover">
            <div className="release-meta"><span>{entry.version}</span>{selected === 0 && <span>Latest update</span>}{entry.date && <time>{entry.date}</time>}</div>
            <h2>{entry.title}</h2>
            {entry.summary && <p>{entry.summary}</p>}
            {entry.download?.url && <a className="release-download" href={entry.download.url} target="_blank" rel="noopener noreferrer">{entry.download.label || 'Download update'} ↗</a>}
          </header>
          {sections.map((section,index) => <section className="release-section" key={section.label} id={'release-section-' + index}>
            <div className="release-section-heading"><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span><h3>{section.label}</h3></div>
            <ul>{section.items.map((item,i) => <li key={i} className={'change-' + changeKind(section.label, item).tone}><span className="change-label">{changeKind(section.label, item).label}</span><span>{item}</span></li>)}</ul>
          </section>)}
          {entry.known?.length > 0 && <section className="release-callout release-known"><h3>Known issues in {entry.version}</h3><ul>{entry.known.map((item,i)=><li key={i}>{item}</li>)}</ul></section>}
          {entry.upcoming?.length > 0 && <section className="release-callout"><h3>Planned at this release</h3><ul>{entry.upcoming.map((item,i)=><li key={i}>{item}</li>)}</ul></section>}
          <div className="release-end">End of {entry.version} notes</div>
        </article>
      </div>
    </section>;
  };
})();
