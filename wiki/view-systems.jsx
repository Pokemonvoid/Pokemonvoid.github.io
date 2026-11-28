window.VIEWS = window.VIEWS || {};
window.VIEWS.Systems = function Systems({ param }) {
  const topics = window.VSYSTEMS || [];
  const topic = topics.find(t => t.id === param) || topics[0];
  if (!topic) return null;
  return <section className="void-systems">
    <div className="systems-eyebrow">Field guide</div>
    <h1>Void Systems</h1>
    <p className="systems-lead">Get to know what makes Void different. Learn the mechanics, understand the tradeoffs, and head into your next adventure prepared.</p>
    <div className="systems-layout">
      <nav className="systems-nav" aria-label="Systems">
        <div className="systems-eyebrow">Choose a system</div>
        {topics.map(t => <a key={t.id} href={'#/systems/' + t.id} aria-current={t.id === topic.id ? 'page' : undefined}>{t.name}</a>)}
      </nav>
      <article className="systems-article" aria-labelledby="systems-topic-title">
        <div className={'systems-hero' + (topic.image ? ' systems-with-art' : '')}>
          <div><div className="systems-eyebrow">{topic.tag}</div><h2 id="systems-topic-title">{topic.title}</h2><p>{topic.intro}</p></div>
          {topic.image && <div className="systems-relic"><div><img src={'items/' + topic.image + '.png'} alt="" /></div><span>{topic.label}</span></div>}
        </div>
        <div className="systems-facts">{topic.facts.map(([key,value]) => <div key={key}><small>{key}</small><strong>{value}</strong></div>)}</div>
        <div className="systems-instructions"><h3>How it works</h3>
          {topic.steps.map(([heading,body],i) => <div className="systems-step" key={heading}><span className="systems-number">{String(i+1).padStart(2,'0')}</span><div><h4>{heading}</h4><p>{body}</p></div></div>)}
          <div className="systems-note">{topic.note}</div>
        </div>
      </article>
    </div>
  </section>;
};
