/* Pokémon Void — shared UI kit. window.VUI */
(function () {
  const { TYPES, STAT_LABELS, STAT_MAX } = window.VDEX;
  const go = (hash) => { window.location.hash = hash; };

  // ---- Type pill ---------------------------------------------------------
  function TypePill({ t, sm, glow, onClick }) {
    const c = TYPES[t] || { name: t, bg: '#333', glow: '#888', fg: '#fff' };
    const stop = (e) => { e.stopPropagation(); go('#/types'); };
    return (
      <span onClick={onClick === undefined ? stop : onClick}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
          padding: sm ? '3px 9px' : '5px 13px', borderRadius: 999, background: glow ? `${c.bg}cc` : c.bg, color: c.fg,
          fontFamily: "'Silkscreen', monospace", fontSize: sm ? 9 : 11, letterSpacing: 0.5, textTransform: 'uppercase',
          border: `1px solid ${c.glow}${glow ? '' : '55'}`,
          boxShadow: glow ? `0 0 16px ${c.glow}55, inset 0 0 12px ${c.glow}33` : `inset 0 0 10px ${c.glow}22`,
        }}>
        {!sm && <span style={{ width: 6, height: 6, borderRadius: 1, background: c.glow }} />}
        {c.name}
      </span>
    );
  }

  // ---- Sprite slot (auto-loads sprites/<dex>.png if present) -------------
  function SpriteSlot({ dex, name, size = 120, label, accent = '#8a5cff', suffix }) {
    const knownBase = dex && window.SPRITE_SET && window.SPRITE_SET.has(String(dex));
    const hasSrc = dex && (suffix !== undefined || knownBase || !window.SPRITE_SET);
    const cacheKey = window.SPRITE_VERSION ? `?v=${window.SPRITE_VERSION}` : '';
    const src = hasSrc ? `sprites/${dex}${suffix ? '-' + suffix : ''}.png${cacheKey}` : null;
    const [ok, setOk] = React.useState(false);
    React.useEffect(() => { setOk(false); }, [src]);
    return (
      <div style={{
        position: 'relative', width: size, height: size, borderRadius: 10, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 45%, #1a1640 0%, #0b0918 72%)', border: `1px solid ${accent}33`,
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(1px 1px at 20% 30%, #fff7, transparent), radial-gradient(1px 1px at 70% 60%, #fff5, transparent), radial-gradient(1px 1px at 42% 80%, #fff6, transparent), radial-gradient(2px 2px at 62% 22%, #b89bff88, transparent)' }} />
        {src && <img src={src} alt={name} onLoad={() => setOk(true)} onError={() => setOk(false)}
          style={{ position: 'absolute', inset: '8%', width: '84%', height: '84%', objectFit: 'contain', imageRendering: 'pixelated', display: ok ? 'block' : 'none', zIndex: 3 }} />}
        {!ok && (
          <div style={{
            position: 'relative', zIndex: 2, width: '72%', height: '72%', borderRadius: 8,
            border: `1px dashed ${accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', color: '#7b6fb8', fontFamily: "'Space Mono', monospace", fontSize: Math.max(8, size / 13), lineHeight: 1.5,
            background: 'repeating-linear-gradient(45deg, #14112a, #14112a 6px, #181433 6px, #181433 12px)',
          }}>{label || 'SPRITE'}</div>
        )}
      </div>
    );
  }

  function ItemIcon({ item, color = '#8a5cff', size = 48 }) {
    const src = item && item.icon;
    const [ok, setOk] = React.useState(false);
    React.useEffect(() => { setOk(false); }, [src]);
    return (
      <div style={{
        flex: '0 0 auto', width: size, height: size, borderRadius: 10,
        background: `radial-gradient(circle at 38% 32%, ${color}33, #0b0918)`,
        border: `1px solid ${color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {src && <img src={src} alt={item.name} onLoad={() => setOk(true)} onError={() => setOk(false)}
          style={{ width: '82%', height: '82%', objectFit: 'contain', imageRendering: 'pixelated', display: ok ? 'block' : 'none' }} />}
        {!ok && <span style={{ width: Math.max(10, size / 3), height: Math.max(10, size / 3), borderRadius: 4, background: color, boxShadow: `0 0 10px ${color}` }} />}
      </div>
    );
  }

  // ---- Radar -------------------------------------------------------------
  function Radar({ stats, size = 300 }) {
    const keys = ['HP', 'ATK', 'DEF', 'SPE', 'SPD', 'SPA'];
    const cx = 150, cy = 150, R = 116;
    const pt = (i, r) => { const a = (Math.PI * 2 * i) / 6 - Math.PI / 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    const ring = (f) => keys.map((_, i) => pt(i, R * f).join(',')).join(' ');
    const data = keys.map((k, i) => pt(i, R * (stats[k] / STAT_MAX)).join(',')).join(' ');
    return (
      <svg viewBox="0 0 300 300" style={{ width: '100%', maxWidth: size }}>
        {[0.25, 0.5, 0.75, 1].map(f => <polygon key={f} points={ring(f)} fill="none" stroke="#3a3260" strokeWidth="1" opacity="0.5" />)}
        {keys.map((k, i) => { const [x, y] = pt(i, R); return <line key={k} x1={cx} y1={cy} x2={x} y2={y} stroke="#2c2650" strokeWidth="1" />; })}
        <polygon points={data} fill="#8a5cff33" stroke="#a07bff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 9px #8a5cff)' }} />
        {keys.map((k, i) => { const [x, y] = pt(i, R * (stats[k] / STAT_MAX)); return <circle key={k} cx={x} cy={y} r="3.4" fill="#dccfff" />; })}
        {keys.map((k, i) => { const [x, y] = pt(i, R + 22); return (
          <g key={k}>
            <text x={x} y={y - 3} fill="#8a83a8" fontSize="11" fontFamily="'Silkscreen', monospace" textAnchor="middle">{STAT_LABELS[k].toUpperCase()}</text>
            <text x={x} y={y + 11} fill="#f0ecff" fontSize="13" fontWeight="700" fontFamily="'Space Mono', monospace" textAnchor="middle">{stats[k]}</text>
          </g>); })}
      </svg>
    );
  }

  // ---- Stat bars ---------------------------------------------------------
  const STAT_COLORS = { HP: '#f05050', ATK: '#f0a040', DEF: '#d4d040', SPA: '#6090f0', SPD: '#70d070', SPE: '#f06090' };
  function StatBars({ stats }) {
    return (
      <div>
        {Object.entries(stats).map(([k, v]) => {
          const pct = Math.min(100, (v / STAT_MAX) * 100);
          const col = STAT_COLORS[k] || '#a07bff';
          return (
            <div key={k} className="v-keeprow" style={{ display: 'grid', gridTemplateColumns: '74px 34px 1fr', alignItems: 'center', gap: 10, marginBottom: 9 }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a83a8' }}>{STAT_LABELS[k].toUpperCase()}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: '#f0ecff', fontWeight: 700, textAlign: 'right' }}>{v}</span>
              <div style={{ height: 9, borderRadius: 3, background: '#181334', overflow: 'hidden', border: '1px solid #2a2350' }}>
                <div style={{ width: pct + '%', height: '100%', background: col, boxShadow: `0 0 9px ${col}`, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ---- Matchups ----------------------------------------------------------
  function Matchups({ x4 = [], x2 = [], half = [], quarter = [], immune = [], weak, resist }) {
    // backward-compat: if old {weak,resist,immune} shape is passed, show those
    if (weak || resist) {
      x2 = weak || []; half = resist || []; x4 = []; quarter = [];
    }
    const Group = ({ label, mult, items, color }) => items.length === 0 ? null : (
      <div style={{ marginBottom: 13 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 7 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color, fontWeight: 700 }}>{mult}</span>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388', letterSpacing: 0.5 }}>{label}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{items.map(t => <TypePill key={t} t={t} sm />)}</div>
      </div>
    );
    return (
      <div>
        <Group label="DOUBLE WEAK" mult="×4" items={x4} color="#ff4d6f" />
        <Group label="WEAK" mult="×2" items={x2} color="#ff8f6f" />
        <Group label="RESIST" mult="×½" items={half} color="#5fd1a0" />
        <Group label="DOUBLE RESIST" mult="×¼" items={quarter} color="#3fc0c0" />
        <Group label="IMMUNE" mult="×0" items={immune} color="#a07bff" />
      </div>
    );
  }

  // ---- Panel -------------------------------------------------------------
  function Panel({ title, children, style }) {
    return (
      <section style={{ background: '#100d20cc', border: '1px solid #221d3a', borderRadius: 14, padding: 18, ...style }}>
        {title && <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff', textTransform: 'uppercase' }}>{title}</h3>}
        {children}
      </section>
    );
  }

  // ---- Page header -------------------------------------------------------
  function PageHead({ kicker, title, sub }) {
    return (
      <div style={{ marginBottom: 26 }}>
        {kicker && <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 2, color: '#8a5cff', marginBottom: 10 }}>{kicker}</div>}
        <h1 className="v-pagehead" style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: '#fff', textShadow: '0 0 28px #8a5cff44' }}>{title}</h1>
        {sub && <p style={{ margin: '12px 0 0', fontSize: 16, color: '#9a93b5', maxWidth: 640, textWrap: 'pretty' }}>{sub}</p>}
      </div>
    );
  }

  // ---- Nav bar -----------------------------------------------------------
  const NAV = [
    ['Pokédex', '#/pokedex'], ['Guide', '#/guide'], ['Moves', '#/moves'], ['Abilities', '#/abilities'],
    ['Items', '#/items'], ['Locations', '#/locations'],
    ['Type Calculator', '#/types'], ['Team Builder', '#/team'],
    ['Compare', '#/compare'],
    ['Living Dex', '#/living'], ['Catch Calculator', '#/catch'],
    ['Damage Calculator', '#/damage'], ['Nuzlocke Randomizer', '#/nuzlocke'],
    ['Battle Sim', '#/battle'],
    ['★ Vote', '#/vote'],
    ['🏆 Leaderboard', '#/leaderboard'],
    // ['Trainers', '#/trainers'],
  ];
  function NavBar({ route, query, setQuery }) {
    const active = (h) => route.startsWith(h.slice(1)) || (h === '#/pokedex' && route.startsWith('/pokemon')) || (h === '#/locations' && route.startsWith('/location'));
    return (
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,6,18,0.86)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1d1838' }}>
        <style>{`
          @keyframes vnavTwinkle { 0%,100% { opacity: 0; transform: scale(0.6) rotate(0deg); } 50% { opacity: 1; transform: scale(1) rotate(90deg); } }
          @keyframes vnavPulse { 0%,100% { box-shadow: 0 0 16px #8a5cff44, inset 0 0 12px #8a5cff22; } 50% { box-shadow: 0 0 24px #a06bff66, inset 0 0 16px #8a5cff33; } }
          .vnav-link { position: relative; overflow: hidden; text-decoration: none; padding: 7px 14px; border-radius: 9px; font-family: 'Space Grotesk', sans-serif; font-size: 14px; color: #b6aee0; background: linear-gradient(135deg, #17122e, #100c20); border: 1px solid #261f47; box-shadow: inset 0 1px 0 #ffffff08; transition: color .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .12s ease; }
          .vnav-link:hover { color: #fff; background: linear-gradient(135deg, #2a2055, #1a1238); border-color: #5a47a0; box-shadow: 0 0 16px #8a5cff55, inset 0 0 10px #8a5cff22; transform: translateY(-1px); }
          .vnav-link::before { content: '✦'; position: absolute; top: 3px; right: 6px; font-size: 7px; color: #c9a8ff; opacity: 0; pointer-events: none; }
          .vnav-link:hover::before { animation: vnavTwinkle 1.1s ease-in-out infinite; }
          .vnav-link::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 3px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, #8a5cff, #c45fff); transform: scaleX(0); transform-origin: left; transition: transform .2s ease; }
          .vnav-link:hover::after { transform: scaleX(1); }
          .vnav-active { color: #fff; font-weight: 600; background: linear-gradient(135deg, #322663, #1d1542); border-color: #6a52c0; animation: vnavPulse 3.2s ease-in-out infinite; }
          .vnav-active::after { transform: scaleX(1); }
          .vnav-active::before { content: '✦'; position: absolute; top: 3px; right: 6px; font-size: 7px; color: #d8c0ff; opacity: 0; animation: vnavTwinkle 2.4s ease-in-out infinite; }
          .vsocial { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; border: 1px solid #2a2545; background: #15112a; color: #b9b2d6; text-decoration: none; transition: all .16s ease; }
          .vsocial:hover { transform: translateY(-1px); }
          .vsocial.discord:hover { color: #fff; background: #5865F2; border-color: #5865F2; box-shadow: 0 0 14px #5865F277; }
          .vsocial.youtube:hover { color: #fff; background: #FF0000; border-color: #FF0000; box-shadow: 0 0 14px #ff000066; }
          .vsocial.download:hover { color: #fff; background: #8a5cff; border-color: #8a5cff; box-shadow: 0 0 14px #8a5cff77; }
          .vnav-vote { border-color: #6a5a1f; background: linear-gradient(135deg, #2a2410, #1c1808); color: #ffe08a; }
          .vnav-vote:hover { border-color: #d4af37; color: #fff; background: linear-gradient(135deg, #4a3d12, #2a2410); box-shadow: 0 0 16px #d4af3755, inset 0 0 10px #d4af3722; }
          .vnav-vote::after { background: linear-gradient(90deg, #ffd54a, #ffae00); }
          @keyframes vnavGuideGlow { 0%,100% { box-shadow: 0 0 14px #2fd8c044, inset 0 0 10px #2fd8c01a; } 50% { box-shadow: 0 0 22px #2fd8c077, inset 0 0 14px #2fd8c033; } }
          .vnav-guide { font-weight: 600; color: #b8fff2; border-color: #2a7d72; background: linear-gradient(135deg, #103a36, #0c241f); animation: vnavGuideGlow 2.8s ease-in-out infinite; padding-left: 24px; }
          .vnav-guide::after { background: linear-gradient(90deg, #2fd8c0, #5cffd0); }
          .vnav-guide:hover { color: #fff; border-color: #5cffd0; background: linear-gradient(135deg, #16544c, #103a36); box-shadow: 0 0 20px #2fd8c088, inset 0 0 12px #2fd8c033; }
          .vnav-guide::before { content: '📖'; position: absolute; top: 50%; left: 7px; right: auto; transform: translateY(-50%); font-size: 11px; opacity: 1; animation: none; }
          .vnav-guide:hover::before { animation: none; }
          @keyframes vnavSheen { 0% { background-position: -160% 0; } 60%,100% { background-position: 260% 0; } }
          @keyframes vnavTrophyGlow { 0%,100% { box-shadow: 0 0 6px #ffd54a33, inset 0 0 8px #ffd54a14; } 50% { box-shadow: 0 0 16px #ffd54a66, inset 0 0 12px #ffd54a2a; } }
          .vnav-lb { position: relative; border-color: #7a6320; color: #ffe9a8; background: linear-gradient(135deg, #2c2510, #18130a); animation: vnavTrophyGlow 3.2s ease-in-out infinite; }
          /* moving prismatic sheen sweeping across the button */
          .vnav-lb::before { content: ''; position: absolute; inset: 0; border-radius: 9px; background: linear-gradient(115deg, transparent 30%, rgba(255,221,128,0.35) 48%, rgba(255,255,255,0.5) 50%, rgba(255,221,128,0.35) 52%, transparent 70%); background-size: 220% 100%; animation: vnavSheen 4.5s ease-in-out infinite; pointer-events: none; opacity: .7; top: 0; right: auto; }
          .vnav-lb:hover { border-color: #ffd54a; color: #fff; background: linear-gradient(135deg, #514012, #2c2510); box-shadow: 0 0 22px #ffd54a77, inset 0 0 12px #ffd54a33; transform: translateY(-1px); }
          .vnav-lb::after { background: linear-gradient(90deg, #ffd54a, #fff1b8, #ffae00); }
          .v-navtop { display: flex; align-items: center; gap: 16px; }
          .v-navlinks { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; padding: 10px 0 2px; }
        `}</style>
        <div className="v-navbar-inner" style={{ maxWidth: 1240, margin: '0 auto', padding: '13px 24px 6px' }}>
          <div className="v-navtop">
            <a href="#/pokedex" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #1a1640, #05030c)', border: '1px solid #8a5cff', boxShadow: '0 0 12px #8a5cff77' }} />
              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff' }}>VOID<span style={{ color: '#8a5cff' }}>DEX</span></span>
            </a>
            <div className="v-navright" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <a className="vsocial discord" href="https://discord.gg/pkmnvoid" target="_blank" rel="noopener noreferrer" title="Official Discord">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3c-.198.352-.43.83-.59 1.207a18.27 18.27 0 0 0-5.93 0A12.6 12.6 0 0 0 9.44 3 19.74 19.74 0 0 0 5.677 4.37C2.79 8.62 2.01 12.75 2.4 16.82a19.95 19.95 0 0 0 5.99 3.03c.48-.66.91-1.36 1.28-2.1-.7-.26-1.37-.59-2-.98.17-.12.33-.25.49-.38 3.86 1.8 8.03 1.8 11.84 0 .16.13.32.26.49.38-.64.39-1.31.72-2.01.98.37.74.8 1.44 1.28 2.1a19.9 19.9 0 0 0 5.99-3.03c.46-4.71-.78-8.8-3.3-12.45ZM9.68 14.32c-1.18 0-2.15-1.08-2.15-2.41 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.95 2.41-2.15 2.41Zm4.64 0c-1.18 0-2.15-1.08-2.15-2.41 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.94 2.41-2.15 2.41Z"/></svg>
                </a>
                <a className="vsocial youtube" href="https://www.youtube.com/@pokedexfillers" target="_blank" rel="noopener noreferrer" title="Pokédex Fillers on YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg>
                </a>
                <a className="vsocial download" href="https://www.mediafire.com/file/qiirj25m8s2fu78/Pokemon+Void+0.1.5+(encryptionfix).zip/file" target="_blank" rel="noopener noreferrer" title="Download Pokémon Void (latest)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 180 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
                <input value={query} onChange={(e) => { setQuery(e.target.value); if (!route.startsWith('/pokedex')) go('#/pokedex'); }}
                  placeholder="Search the void…" spellCheck={false}
                  style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
              </div>
            </div>
          </div>
          <nav className="v-navlinks">
            {NAV.map(([n, h]) => (
              <a key={h} href={h} className={'vnav-link' + (h === '#/guide' ? ' vnav-guide' : '') + (h === '#/vote' ? ' vnav-vote' : '') + (h === '#/leaderboard' ? ' vnav-lb' : '') + (active(h) ? ' vnav-active' : '')}>{n}</a>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  function Empty({ label }) {
    return <div style={{ padding: 60, textAlign: 'center', color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{label}</div>;
  }

  window.VUI = { go, TypePill, SpriteSlot, ItemIcon, Radar, StatBars, Matchups, Panel, PageHead, NavBar, Empty, TYPES };
})();
