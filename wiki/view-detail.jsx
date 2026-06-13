/* Pokémon Solar Eclipse — full Pokémon detail page. window.VIEWS.Detail
   Mirrors Void's view-detail routing: reached via #/pokemon/<dex>. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, TYPES, byDex } = window.VSEDEX;
  const { go, TypePill, AbilityPill, SpriteSlot, StatBars, PageHead, Empty } = window.VUI;
  const bstOf = s => Object.values(s).reduce((a, b) => a + b, 0);

  // ---- Stat + abilities block --------------------------------------------
  function StatBlock({ entry, vanilla, d, accent, vi }) {
    const [compare, setCompare] = React.useState(true);
    const showCmp = vanilla && compare;
    const eclipseBst = bstOf(entry.stats);
    const vanillaBst = vanilla ? Object.values(vanilla).reduce((a, b) => a + b, 0) : null;
    const bstDelta = vanillaBst != null ? eclipseBst - vanillaBst : 0;
    const anyChange = vanilla && ['HP','ATK','DEF','SPA','SPD','SPE'].some(k => entry.stats[k] !== vanilla[k]);
    return (
      <div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>{entry.types.map(t => <TypePill key={t} t={t} />)}</div>
        {vanilla && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setCompare(c => !c)} style={{
              cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 8,
              background: showCmp ? '#2a1c08' : 'transparent', color: showCmp ? '#ffb347' : '#9a8d6f',
              border: `1px solid ${showCmp ? '#ffb34788' : '#2a2110'}`,
            }}>{showCmp ? '✓ ' : ''}Compare to vanilla</button>
            {showCmp && (
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: '#8a7d63' }}>
                {anyChange ? 'Δ vs official base stats' : 'No stat changes from vanilla'}
              </span>
            )}
          </div>
        )}
        <StatBars stats={entry.stats} vanilla={showCmp ? vanilla : null} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 10, borderTop: '1px solid #2a2110' }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 1, color: '#b8a489' }}>TOTAL</span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
            {showCmp && bstDelta !== 0 && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: bstDelta > 0 ? '#5fe08a' : '#ff6f6f' }}>{bstDelta > 0 ? '+' : ''}{bstDelta}</span>}
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: '#ffb347', fontWeight: 700 }}>{eclipseBst}</span>
          </span>
        </div>
        {d && <ShinyShowcase d={d} accent={accent} vi={vi} />}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: '#8a7d63', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Abilities</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {entry.abilities.map(a => <AbilityPill key={a} name={a} />)}
            {entry.hidden && <AbilityPill name={entry.hidden} hidden />}
          </div>
        </div>
      </div>
    );
  }

  // ---- Shiny / Super Shiny showcase --------------------------------------
  // Super shiny hue-shifts the SHINY sprite in 45° increments, per the game's
  // adjust_shiny logic: superHue = (1 + rand(7)) * 45  ->  45..360. The filter
  // is applied to the sprite image only, never its background.
  function ShinyShowcase({ d, accent, vi }) {
    const HUE_STEPS = [45, 90, 135, 180, 225, 270, 315, 360];
    const [step, setStep] = React.useState(0);
    const hue = HUE_STEPS[step];
    // Sprite suffixes: base variant (vi 0) -> "", "shiny"; form i -> "i", "i-shiny".
    const formPart = vi > 0 ? String(vi) + '-' : '';
    const normalSuffix = vi > 0 ? String(vi) : undefined;
    const shinySuffix = formPart + 'shiny';
    // Super shiny = the SHINY sprite hue-shifted in 45° increments (game's adjust_shiny:
    // superHue = (1 + rand(7)) * 45). Pure hue rotation, no other effects.
    const superFilter = `hue-rotate(${hue}deg)`;
    const cell = (label, color, suffix, filter, extra) => (
      <div style={{ flex: 1, minWidth: 130, padding: 14, borderRadius: 12, background: '#0d0a04', border: `1px solid ${color}44`, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1, color, marginBottom: 10, textTransform: 'uppercase' }}>{label}</div>
        <SpriteSlot dex={d.dex} name={d.name} size={104} accent={color} suffix={suffix} imgFilter={filter} />
        {extra}
      </div>
    );
    return (
      <div style={{ marginTop: 26 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: '#8a7d63', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Sprite Showcase</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {cell('Normal', accent, normalSuffix, 'none')}
          {cell('Shiny', '#ffd700', shinySuffix, 'none')}
          {cell('Super Shiny', '#ff66cc', shinySuffix, superFilter, (
            <div style={{ marginTop: 12 }}>
              <input type="range" min={0} max={HUE_STEPS.length - 1} step={1} value={step}
                onChange={e => setStep(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ff66cc', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 6 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#ff8fd6' }}>shiny hue +{hue}°</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: '#6a5d42', marginTop: 10, lineHeight: 1.5 }}>
          Shiny is the real shiny sprite. Super shiny rotates the shiny's hue in 45° steps (the game's <code>superHue = (1 + rand(7)) × 45</code>). Note: this is a browser hue-rotate preview and approximates — not exactly matches — the game's in-engine palette shift; real super-shiny rips would be exact.
        </div>
      </div>
    );
  }

  // ---- Evolution family --------------------------------------------------
  function EvoFamily({ d }) {
    const baseKey = window.VSE_FAMILY_OF && window.VSE_FAMILY_OF[d.dex];
    const fam = baseKey && window.VSE_FAMILIES && window.VSE_FAMILIES[baseKey];
    if (!fam || fam.length < 2) return null; // no evolution
    return (
      <div style={{ marginTop: 26 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: '#8a7d63', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Evolution Family</div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          {fam.map((s, i) => (
            <React.Fragment key={s.dex}>
              {i > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 6px', minWidth: 70 }}>
                  <span style={{ color: '#ffb347', fontSize: 18, lineHeight: 1 }}>→</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: '#9a8d6f', textAlign: 'center', marginTop: 2 }}>{(s.method || '').replace(/^at /, '')}</span>
                </div>
              )}
              <button onClick={() => s.dex !== d.dex && go('#/pokemon/' + s.dex)} style={{
                cursor: s.dex === d.dex ? 'default' : 'pointer', background: s.dex === d.dex ? '#1a1407' : 'transparent',
                border: `1px solid ${s.dex === d.dex ? '#ffb34766' : '#241d10'}`, borderRadius: 12, padding: 8, textAlign: 'center',
              }}>
                <SpriteSlot dex={s.dex} name={s.name} size={72} accent={s.dex === d.dex ? '#ffb347' : '#5a5240'} />
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: s.dex === d.dex ? 700 : 500, color: s.dex === d.dex ? '#fff' : '#b3a892', marginTop: 4 }}>{s.name}</div>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // ---- Learnset (level-up / egg / TM moves) ------------------------------
  // Category badge colors (Physical / Special / Status)
  const CAT_STYLE = {
    Physical: { bg: '#c0392b', label: 'PHY' },
    Special: { bg: '#3b6fb5', label: 'SPC' },
    Status: { bg: '#6b6b6b', label: 'STA' },
  };
  function CatBadge({ cls }) {
    const c = CAT_STYLE[cls] || CAT_STYLE.Status;
    return (
      <span title={cls} style={{
        fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: '#fff',
        background: c.bg, borderRadius: 4, padding: '2px 5px', flexShrink: 0, width: 30, textAlign: 'center', display: 'inline-block',
      }}>{c.label}</span>
    );
  }
  function MoveRow({ mv, lvl, showLevel }) {
    const TypePill = window.VUI.TypePill;
    const TYPES = window.VUI.TYPES;
    const norm = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const info = (window.VSE_MOVES || []).find(m => norm(m.name) === norm(mv));
    const name = info ? info.name : mv.toLowerCase().replace(/_/g, ' ');
    const type = info ? info.type : null;
    const cls = info ? info.cls : 'Status';
    const pow = (info && typeof info.pow === 'number' && info.pow > 0) ? info.pow : null;
    const [hov, setHov] = React.useState(false);
    const cols = (showLevel ? '46px ' : '') + '38px 1fr 44px 76px';
    return (
      <button onClick={() => go('#/moves/' + encodeURIComponent(info ? info.name : mv))}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          cursor: 'pointer', display: 'grid', gridTemplateColumns: cols, alignItems: 'center', columnGap: 10, width: '100%', textAlign: 'left',
          padding: '7px 12px', borderRadius: 9, background: hov ? '#1b1408' : '#100c05',
          border: `1px solid ${hov ? '#5a4318' : '#241d10'}`,
        }}>
        {showLevel && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#ffb347', textAlign: 'right' }}>{lvl === 0 || lvl === 1 ? '—' : 'Lv' + lvl}</span>}
        <span style={{ display: 'flex', justifyContent: 'center' }}><CatBadge cls={cls} /></span>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: hov ? '#fff' : '#e6dcc6', textTransform: 'capitalize', minWidth: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#9a8d6f', textAlign: 'center' }}>{pow !== null ? pow : '–'}</span>
        <span style={{ display: 'flex', justifyContent: 'center' }}>{type && <TypePill t={type} sm onClick={() => {}} />}</span>
      </button>
    );
  }
  function MoveHeader({ showLevel }) {
    const cols = (showLevel ? '46px ' : '') + '38px 1fr 44px 76px';
    const cell = { fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1, color: '#6f6450', textTransform: 'uppercase' };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', columnGap: 10, padding: '0 12px 2px', width: '100%', boxSizing: 'border-box', border: '1px solid transparent', borderBottom: 'none' }}>
        {showLevel && <span style={{ ...cell, textAlign: 'right' }}>Lv</span>}
        <span style={{ ...cell, textAlign: 'center' }}>Cat</span>
        <span style={cell}>Move</span>
        <span style={{ ...cell, textAlign: 'center' }}>Pwr</span>
        <span style={{ ...cell, textAlign: 'center' }}>Type</span>
      </div>
    );
  }
  function Learnset({ d }) {
    const [tab, setTab] = React.useState('level');
    const ls = window.VSE_LEARN && window.VSE_LEARN[d.dex];
    if (!ls) return null;

    const tabs = [
      ['level', 'Level-up', ls.level.length],
      ['egg', 'Egg', ls.egg.length],
      ['tm', 'TM', ls.tms.length],
      ['tutor', 'Tutor', ls.tutor.length],
    ].filter(t => t[2] > 0);
    if (!tabs.length) return null;
    React.useEffect(() => { if (!tabs.find(t => t[0] === tab)) setTab(tabs[0][0]); }, [d.dex]);

    // stable min-height across tabs (each row ~38px) so switching doesn't jolt the layout
    const rowH = 38;
    const counts = { level: ls.level.length, egg: ls.egg.length, tm: ls.tms.length, tutor: ls.tutor.length };
    const minH = Math.max(...Object.values(counts)) * rowH;

    const showLevel = tab === 'level';
    const rows = tab === 'level'
      ? ls.level.map(([lv, mv], i) => <MoveRow key={i} mv={mv} lvl={lv} showLevel />)
      : (tab === 'egg' ? ls.egg : tab === 'tm' ? ls.tms : ls.tutor).map((mv, i) => <MoveRow key={i} mv={mv} />);

    return (
      <div style={{ marginTop: 26 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: '#8a7d63', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Learnable Moves</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {tabs.map(([id, label, n]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              cursor: 'pointer', padding: '6px 13px', borderRadius: 8, fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: tab === id ? 600 : 500,
              background: tab === id ? '#2a1c08' : 'transparent', color: tab === id ? '#ffb347' : '#9a8d6f', border: `1px solid ${tab === id ? '#ffb34788' : '#241d10'}`,
            }}>{label} <span style={{ opacity: 0.6, fontFamily: "'Space Mono', monospace" }}>{n}</span></button>
          ))}
        </div>
        <MoveHeader showLevel={showLevel} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minHeight: minH, marginTop: 4 }}>
          {rows}
        </div>
      </div>
    );
  }

  // ---- Full detail page --------------------------------------------------
  window.VIEWS.Detail = function Detail({ param }) {
    const d = byDex[param];
    const [vi, setVi] = React.useState(0);
    React.useEffect(() => { setVi(0); }, [param]);

    if (!d) return <Empty label={`No Pokémon found for #${param}.`} />;

    const accent = TYPES[d.types[0]].glow;
    const variants = [{ label: 'Base', name: d.name, types: d.types, abilities: d.abilities, hidden: d.hidden, stats: d.stats }, ...(d.forms || [])];
    const cur = variants[vi];

    // prev / next dex navigation
    const idx = DEX.findIndex(x => x.dex === d.dex);
    const prev = idx > 0 ? DEX[idx - 1] : DEX[DEX.length - 1];
    const next = idx < DEX.length - 1 ? DEX[idx + 1] : DEX[0];

    return (
      <div>
        {/* breadcrumb + prev/next */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <button onClick={() => go('#/pokedex')} style={{ cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#b3a892', background: 'transparent', border: '1px solid #2a2110', borderRadius: 8, padding: '7px 14px' }}>← Pokédex</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => go('#/pokemon/' + prev.dex)} style={{ cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#9a8d6f', background: 'transparent', border: '1px solid #2a2110', borderRadius: 8, padding: '7px 12px' }}>← No.{prev.dex}</button>
            <button onClick={() => go('#/pokemon/' + next.dex)} style={{ cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#9a8d6f', background: 'transparent', border: '1px solid #2a2110', borderRadius: 8, padding: '7px 12px' }}>No.{next.dex} →</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32, alignItems: 'start' }} className="se-detail-grid">
          {/* left: hero sprite + name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, position: 'sticky', top: 20 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 2, color: '#7a6c4a' }}>No.{d.dex}</div>
            <SpriteSlot dex={d.dex} name={cur.name} size={240} accent={accent} suffix={vi > 0 ? String(vi) : undefined} label="HERO SPRITE" />
            <div style={{ fontFamily: "'Cinzel', Georgia, 'Times New Roman', serif", fontWeight: 800, fontSize: 38, color: '#fff', textAlign: 'center', lineHeight: 1, textShadow: `0 0 24px ${accent}44` }}>{cur.name}</div>
            {d.evoNote && vi === 0 && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#9a8d6f', textAlign: 'center', maxWidth: 260 }}>Evolves {d.evoNote}</div>}
          </div>

          {/* right: forms + stats + showcase */}
          <div style={{ background: 'linear-gradient(160deg, #14100a, #0a0805)', border: `1px solid ${accent}33`, borderRadius: 16, padding: 26 }}>
            {variants.length > 1 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                {variants.map((v, i) => (
                  <button key={i} onClick={() => setVi(i)} style={{
                    cursor: 'pointer', padding: '6px 13px', borderRadius: 8, fontSize: 12, fontFamily: "'Outfit', sans-serif",
                    background: vi === i ? '#2a1c08' : 'transparent', color: vi === i ? '#ffb347' : '#9a8d6f',
                    border: `1px solid ${vi === i ? '#ffb34788' : '#2a2110'}`, fontWeight: vi === i ? 600 : 400,
                  }}>{i === 0 ? 'Base' : (v.label || `Form ${i}`)}</button>
                ))}
              </div>
            )}
            <StatBlock entry={cur} vanilla={vi === 0 ? (window.VSE_VANILLA && window.VSE_VANILLA[d.dex]) : null} d={d} accent={accent} vi={vi} />
            {vi === 0 && <EvoFamily d={d} />}
            {vi === 0 && <Learnset d={d} />}
          </div>
        </div>
      </div>
    );
  };
})();
