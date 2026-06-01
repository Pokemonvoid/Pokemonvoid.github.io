/* Pokémon Void — Interactive Type Calculator + Chart. window.VIEWS.Types */
window.VIEWS = window.VIEWS || {};
(function () {
  const { TYPES } = window.VDEX;
  const { CHART, eff, TYPE_ORDER } = window.VGAME;
  const { PageHead } = window.VUI;
  const ABBR = { NORMAL: 'NOR', FIRE: 'FIR', WATER: 'WAT', ELECTRIC: 'ELE', GRASS: 'GRA', ICE: 'ICE', FIGHTING: 'FIG', POISON: 'POI', GROUND: 'GRD', FLYING: 'FLY', PSYCHIC: 'PSY', BUG: 'BUG', ROCK: 'ROK', GHOST: 'GHO', DRAGON: 'DRA', DARK: 'DRK', STEEL: 'STL', FAIRY: 'FAI', LIGHT: 'LIT', COSMIC: 'COS' };

  const into = (atk, defTypes) => defTypes.reduce((m, d) => m * eff(atk, d), 1);

  function tierOf(m) {
    if (m === 0) return { key: '0', label: '×0', name: 'No effect', col: '#a07bff', bg: '#1a0f33' };
    if (m >= 4) return { key: '4', label: '×4', name: 'Double weak', col: '#ff4d6d', bg: '#3a0f1c' };
    if (m === 2) return { key: '2', label: '×2', name: 'Weak', col: '#ff8f5c', bg: '#331a10' };
    if (m === 0.25) return { key: '0.25', label: '×¼', name: 'Double resist', col: '#5fb8ff', bg: '#0f2233' };
    if (m === 0.5) return { key: '0.5', label: '×½', name: 'Resist', col: '#5fd1a0', bg: '#0f2a22' };
    return { key: '1', label: '×1', name: 'Neutral', col: '#9a93b5', bg: '#15112a' };
  }
  const TIER_ORDER = ['4', '2', '1', '0.5', '0.25', '0'];

  function TypeChip({ t, selected, disabled, onClick }) {
    const T = TYPES[t];
    return (
      <button onClick={onClick} disabled={disabled}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px',
          borderRadius: 9, cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
          color: selected ? '#fff' : T.fg,
          background: selected ? T.bg : 'rgba(255,255,255,0.04)',
          border: `1.5px solid ${selected ? T.glow : 'transparent'}`,
          boxShadow: selected ? `0 0 16px ${T.glow}66, inset 0 0 0 1px ${T.glow}44` : 'none',
          opacity: disabled ? 0.32 : 1, transition: 'all .14s', width: '100%',
        }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: T.glow, flexShrink: 0, boxShadow: selected ? `0 0 8px ${T.glow}` : 'none' }} />
        {T.name}
      </button>
    );
  }

  function Calculator() {
    const [sel, setSel] = React.useState([]);
    const toggle = (t) => setSel(s => s.includes(t) ? s.filter(x => x !== t) : (s.length >= 2 ? s : [...s, t]));
    const clear = () => setSel([]);

    const groups = {};
    TIER_ORDER.forEach(k => groups[k] = []);
    if (sel.length) {
      TYPE_ORDER.forEach(atk => { groups[tierOf(into(atk, sel)).key].push(atk); });
    }
    const TIER_META = { '4': tierOf(4), '2': tierOf(2), '1': tierOf(1), '0.5': tierOf(0.5), '0.25': tierOf(0.25), '0': tierOf(0) };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 24, alignItems: 'start' }}>
        <div style={{ padding: 20, borderRadius: 16, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0c0a1c 75%)', border: '1px solid #2a2350' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>DEFENDING TYPES</h3>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: sel.length === 2 ? '#ff8f5c' : '#6a6388' }}>{sel.length}/2</span>
          </div>
          <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, color: '#8a83a8' }}>Pick one or two types to see what it takes damage from.</p>

          <div style={{ minHeight: 40, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14, padding: '8px 10px', borderRadius: 10, background: '#0a0818', border: '1px dashed #2a2350' }}>
            {sel.length === 0 ? <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#5f5980', fontStyle: 'italic' }}>No types selected</span> :
              sel.map(t => (
                <button key={t} onClick={() => toggle(t)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 20, background: TYPES[t].bg, border: `1px solid ${TYPES[t].glow}`, color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700 }}>
                  {TYPES[t].name} <span style={{ opacity: 0.7, fontSize: 14 }}>×</span>
                </button>
              ))}
            {sel.length > 0 && <button onClick={clear} style={{ marginLeft: 'auto', cursor: 'pointer', background: 'transparent', border: 'none', color: '#8a5cff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12 }}>↺ clear</button>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
            {TYPE_ORDER.map(t => (
              <TypeChip key={t} t={t} selected={sel.includes(t)} disabled={sel.length >= 2 && !sel.includes(t)} onClick={() => toggle(t)} />
            ))}
          </div>
        </div>

        <div style={{ padding: 20, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a', minHeight: 320 }}>
          <h3 style={{ margin: '0 0 16px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>DAMAGE TAKEN</h3>
          {sel.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 260, gap: 14, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 40% 32%, #2a1a5a, #0a0818)', border: '1px solid #3a2f6e', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px #8a5cff33' }}>
                <span style={{ fontSize: 26 }}>🛡</span>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#6a6388', maxWidth: 260, lineHeight: 1.5 }}>Select a type to reveal its weaknesses, resistances, and immunities.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TIER_ORDER.map(k => {
                const types = groups[k];
                if (!types.length) return null;
                const meta = TIER_META[k];
                return (
                  <div key={k}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: meta.col, minWidth: 30 }}>{meta.label}</span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.5, color: meta.col, opacity: 0.85 }}>{meta.name.toUpperCase()}</span>
                      <span style={{ flex: 1, height: 1, background: `${meta.col}22` }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {types.map(t => (
                        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 7, background: meta.bg, border: `1px solid ${meta.col}44`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, fontWeight: 600, color: '#fff' }}>
                          <span style={{ width: 9, height: 9, borderRadius: '50%', background: TYPES[t].glow }} />
                          {TYPES[t].name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- Attacking calculator: pick one attacking type, see what it hits ----
  function AttackCalculator() {
    const [atk, setAtk] = React.useState(null);
    const groups = {};
    TIER_ORDER.forEach(k => groups[k] = []);
    if (atk) {
      TYPE_ORDER.forEach(def => { groups[tierOf(eff(atk, def)).key].push(def); });
    }
    const TIER_META = { '4': tierOf(4), '2': tierOf(2), '1': tierOf(1), '0.5': tierOf(0.5), '0.25': tierOf(0.25), '0': tierOf(0) };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 24, alignItems: 'start' }}>
        <div style={{ padding: 20, borderRadius: 16, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0c0a1c 75%)', border: '1px solid #2a2350' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#ff8f5c' }}>ATTACKING TYPE</h3>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: atk ? '#ff8f5c' : '#6a6388' }}>{atk ? '1/1' : '0/1'}</span>
          </div>
          <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, color: '#8a83a8' }}>Pick a move type to see what it deals super-effective, neutral, resisted, or no damage to.</p>

          <div style={{ minHeight: 40, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14, padding: '8px 10px', borderRadius: 10, background: '#0a0818', border: '1px dashed #2a2350' }}>
            {!atk ? <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#5f5980', fontStyle: 'italic' }}>No type selected</span> :
              <button onClick={() => setAtk(null)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 20, background: TYPES[atk].bg, border: `1px solid ${TYPES[atk].glow}`, color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700 }}>
                {TYPES[atk].name} <span style={{ opacity: 0.7, fontSize: 14 }}>×</span>
              </button>}
            {atk && <button onClick={() => setAtk(null)} style={{ marginLeft: 'auto', cursor: 'pointer', background: 'transparent', border: 'none', color: '#ff8f5c', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12 }}>↺ clear</button>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
            {TYPE_ORDER.map(t => (
              <TypeChip key={t} t={t} selected={atk === t} disabled={false} onClick={() => setAtk(atk === t ? null : t)} />
            ))}
          </div>
        </div>

        <div style={{ padding: 20, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a', minHeight: 320 }}>
          <h3 style={{ margin: '0 0 16px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#ff8f5c' }}>DAMAGE DEALT</h3>
          {!atk ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 260, gap: 14, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 40% 32%, #5a2a1a, #0a0818)', border: '1px solid #6e4f3a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px #ff8f5c33' }}>
                <span style={{ fontSize: 26 }}>⚔️</span>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#6a6388', maxWidth: 260, lineHeight: 1.5 }}>Select an attacking type to see what it's strong and weak against.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TIER_ORDER.map(k => {
                const types = groups[k];
                if (!types.length) return null;
                const meta = TIER_META[k];
                return (
                  <div key={k}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: meta.col, minWidth: 30 }}>{meta.label}</span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.5, color: meta.col, opacity: 0.85 }}>{meta.name.toUpperCase()}</span>
                      <span style={{ flex: 1, height: 1, background: `${meta.col}22` }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {types.map(t => (
                        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 7, background: meta.bg, border: `1px solid ${meta.col}44`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, fontWeight: 600, color: '#fff' }}>
                          <span style={{ width: 9, height: 9, borderRadius: '50%', background: TYPES[t].glow }} />
                          {TYPES[t].name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  function Matrix() {
    const [sel, setSel] = React.useState(null);
    const SZ = 30;
    const cellStyle = (mult) => {
      if (mult === 2) return { bg: '#1c5e2f', fg: '#7dffa8', label: '2' };
      if (mult === 0.5) return { bg: '#5e1c2a', fg: '#ff9aae', label: '½' };
      if (mult === 0) return { bg: '#1a0f33', fg: '#a07bff', label: '0' };
      return { bg: 'transparent', fg: '#2c2650', label: '·' };
    };
    return (
      <div style={{ overflowX: 'auto', border: '1px solid #221d3a', borderRadius: 14, background: '#0c0a1c', padding: 14 }}>
        <div style={{ display: 'inline-block' }}>
          <div style={{ display: 'flex', marginLeft: 96 }}>
            {TYPE_ORDER.map(dt => (
              <div key={dt} onMouseEnter={() => setSel(dt + '|def')} onMouseLeave={() => setSel(null)}
                style={{ width: SZ, height: 40, margin: '0 1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: TYPES[dt].glow, writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap' }}>{ABBR[dt]}</span>
              </div>
            ))}
          </div>
          {TYPE_ORDER.map(at => (
            <div key={at} style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => setSel(s => s === at + '|atk' ? null : at + '|atk')}
                style={{ width: 92, marginRight: 4, cursor: 'pointer', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ padding: '3px 8px', borderRadius: 5, background: TYPES[at].bg, color: TYPES[at].fg, fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.3, border: `1px solid ${TYPES[at].glow}55` }}>{TYPES[at].name.toUpperCase()}</span>
              </button>
              {TYPE_ORDER.map(dt => {
                const cs = cellStyle(eff(at, dt));
                const hot = sel === at + '|atk' || sel === dt + '|def';
                return (
                  <div key={dt} title={`${TYPES[at].name} → ${TYPES[dt].name}`}
                    style={{ width: SZ, height: SZ, margin: 1, borderRadius: 3, background: cs.bg, color: cs.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, outline: hot ? `1px solid ${TYPES[at].glow}` : '1px solid #15112a', opacity: sel && !hot ? 0.3 : 1, transition: 'opacity .12s' }}>{cs.label}</div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.VIEWS.Types = function Types() {
    return (
      <div>
        <PageHead kicker="TYPE CALCULATOR" title="Type Matchups" sub="Two calculators in one: check what hurts a defending Pokémon, or what an attacking move type is strong against — including the region's new Light and Cosmic types." />

        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 1, color: '#8a5cff', margin: '0 0 14px' }}>🛡 DEFENSE — WHAT HITS THIS TYPE</div>
        <Calculator />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '36px 0 14px' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 1, color: '#ff8f5c' }}>⚔️ ATTACK — WHAT THIS TYPE HITS</span>
          <span style={{ flex: 1, height: 1, background: '#ff8f5c22' }} />
        </div>
        <AttackCalculator />
      </div>
    );
  };
})();
