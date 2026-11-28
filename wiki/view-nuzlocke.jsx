window.VIEWS = window.VIEWS || {};
window.VIEWS.Nuzlocke = function Nuzlocke() {
  const { modes, themes, difficulties, rulesFor, generate, load, save } = window.VNUZLOCKE;
  const [initial] = React.useState(() => {
    try { return load(window.localStorage); } catch { return null; }
  });
  const [mode, setMode] = React.useState(initial?.mode || 'standard');
  const [difficulty, setDifficulty] = React.useState(initial?.difficulty || 'normal');
  const [theme, setTheme] = React.useState(initial?.theme || 'classic');
  const [run, setRun] = React.useState(initial?.run || null);
  const [message, setMessage] = React.useState('');
  const [saveError, setSaveError] = React.useState(false);
  React.useEffect(() => {
    try { save(window.localStorage, {mode, difficulty, theme, run}); setSaveError(false); }
    catch { setSaveError(true); }
  }, [mode, difficulty, theme, run]);
  const core = run ? rulesFor(run) : [];
  const title = r => difficulties[r.difficulty].name+' '+modes[r.mode].name;
  const giftText = run?.extras.some(rule => rule.id === 'gifts') ? 'Gifts follow the modifier above.' : 'Eligible gift Pokémon do not use an area encounter.';
  const pending = run && (run.mode !== mode || run.difficulty !== difficulty || (theme !== 'surprise' && run.theme !== theme));
  const copy = async () => {
    const text = ['Pokémon Void — '+title(run)+' Nuzlocke', difficulties[run.difficulty].rule,
      themes[run.theme].name+': '+themes[run.theme].text,
      ...core.map(r=>r.title+': '+r.text), ...run.extras.map(r=>r.title+': '+r.text), giftText,
      'Rare variants still use the area’s encounter.',
      'Goal: finish the Chapter 1 story with at least one living Pokémon.'
    ].join('\n\n');
    try { await navigator.clipboard.writeText(text); setMessage('Rules copied.'); }
    catch { setMessage('Copy unavailable. Select the rules below to copy them manually.'); }
  };
  const roll = () => { setRun(generate(mode, Math.random, theme, difficulty)); setMessage(''); };
  return <section className="nuz-page" data-difficulty={difficulty}>
    <window.VUI.PageHead kicker="CHALLENGE RUN" title="Nuzlocke Randomizer" sub="Your game. Your rules. One life per Pokémon." />
    <div className="nuz-layout">
      <div className="nuz-setup" data-mode={mode}>
        <h2>Run settings</h2>
        <fieldset className="nuz-game-difficulty">
          <legend>Game difficulty</legend>
          <div className="nuz-difficulty-options">{Object.entries(difficulties).map(([id,d])=>
            <label key={id} className={difficulty===id ? 'selected' : ''} data-difficulty={id}>
              <input type="radio" name="nuz-difficulty" checked={difficulty===id} onChange={()=>setDifficulty(id)} />
              <span>{d.name}</span>
            </label>
          )}</div>
          <p>{difficulty==='hard' ? 'Start in Hard Mode and keep it enabled.' : 'Play on Normal difficulty.'} <a href="#/systems/difficulty">Mode guide ↗</a></p>
        </fieldset>
        <fieldset><legend>Nuzlocke rules</legend><div className="nuz-modes">
          {Object.entries(modes).map(([id,m])=><label key={id} data-mode={id} className={mode===id ? 'selected' : ''}>
            <input type="radio" name="nuz-mode" checked={mode===id} onChange={()=>setMode(id)} />
            <span>{m.name}</span>
          </label>)}
        </div><p className="nuz-mode-description">{modes[mode].description}</p></fieldset>
        <div className="nuz-theme-picker">
          <label htmlFor="nuz-theme">Team theme</label>
          <select id="nuz-theme" value={theme} onChange={e=>setTheme(e.target.value)}>
            {Object.entries(themes).map(([id,t])=><option key={id} value={id}>{t.name}</option>)}
            <option value="surprise">Surprise me</option>
          </select>
          <p className="nuz-theme-description">{themes[theme]?.text || 'Roll Classic, Little legends, Badge relay or Lone survivor. Hunt themes stay opt-in.'}</p>
          {themes[theme]?.hunt && <p className="nuz-hunt-note">Long hunts, unchanged odds. Your starter can stay until your first eligible catch.</p>}
        </div>
        <button className="nuz-primary" onClick={roll}>{run ? 'Roll new run' : 'Roll run'} <span aria-hidden="true">→</span></button>
        <p className="nuz-setup-hint">{pending ? 'Settings changed. Roll again to apply them.' : 'Choose your rules before starting. This page does not change your game.'}</p>
      </div>
      {run ? <article className="nuz-sheet" data-mode={run.mode} data-difficulty={run.difficulty}>
        <header><div><span className="nuz-label">{title(run)} · Chapter 1</span><h2>{themes[run.theme].name}</h2></div><button className="nuz-copy" onClick={copy}>Copy rules</button></header>
        <div className="nuz-run-intro"><p>{themes[run.theme].text}</p>{themes[run.theme].hunt && <p className="nuz-hunt-note">Long hunts. Shiny and anomaly odds are unchanged.</p>}
          <p className="nuz-objective"><strong>Goal</strong> Finish Chapter 1 with at least one survivor.</p>
          {run.difficulty==='hard' && <p className="nuz-hard-note">Hard Mode stays on for the whole run. <a href="#/systems/difficulty">Game difficulty guide ↗</a></p>}
        </div>
        <div className="nuz-columns">
          <section><h3>Nuzlocke rules</h3>{core.map((r,i)=><div className="nuz-rule" key={r.title}><h4>{r.title}</h4><p>{r.text}</p></div>)}</section>
          <section><h3>This run</h3>{run.extras.map(r=><div className="nuz-rule" key={r.id}><h4>{r.title}</h4><p>{r.text}</p></div>)}</section>
        </div>
        <p className="nuz-foot">{giftText} Your theme decides which Pokémon are eligible. Rare variants still use the area’s encounter.</p>
      </article> : <div className="nuz-empty">
        <span className="nuz-label">Chapter 1 · New run</span>
        <h2>{difficulties[difficulty].name} {modes[mode].name}</h2>
        <p>{themes[theme]?.name || 'Random team theme'}</p>
        <dl className="nuz-preview-rules"><div><dt>Encounters</dt><dd>One eligible catch per area</dd></div><div><dt>Fainting</dt><dd>Permanent retirement</dd></div><div><dt>Victory</dt><dd>Finish Chapter 1 with a survivor</dd></div></dl>
        <p className="nuz-empty-caption">Roll your run to reveal its modifiers.</p>
      </div>}
    </div>
    <p className="nuz-save-note" role="status">{saveError ? 'Browser saving is unavailable. Copy your rules before leaving.' : run ? 'Run saved in this browser. Rolling again replaces it; clearing site data removes it.' : 'Your settings are saved in this browser.'}</p>
    <p className="nuz-status" role="status">{message}</p>
  </section>;
};
