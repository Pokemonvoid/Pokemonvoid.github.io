/* Pokémon Void — Locations index + Location detail. window.VIEWS.Locations / .Location */
window.VIEWS = window.VIEWS || {};
(function () {
  const { byDex, TYPES } = window.VDEX;
  const { ROUTES, TRAINERS, ITEMS } = window.VGAME;
  const { go, SpriteSlot, TypePill, ItemIcon, PageHead, Empty } = window.VUI;

  const trainersAt = (slug) => TRAINERS.filter(t => t.loc === slug);
  const locBySlug = (slug) => ROUTES.find(r => r.slug === slug);

  // Render a route name keeping the pixel look, but drawing digits in the crisper
  // Silkscreen pixel font so ambiguous glyphs (like 2 and 5 in Pixelify Sans) read clearly.
  function RouteName({ text, size }) {
    const parts = String(text).split(/(\d+)/); // split into [letters, number, letters, ...]
    return parts.map((p, i) =>
      /^\d+$/.test(p)
        ? <span key={i} style={{ fontFamily: "'Silkscreen', monospace", fontSize: size ? size * 0.82 : undefined, letterSpacing: 1 }}>{p}</span>
        : <span key={i}>{p}</span>
    );
  }

  // ---- Recommended-team engine -------------------------------------------
  // Suggests the best 3 Pokémon for an area from the pool obtainable by then
  // (starters + everything encounterable in this area and all earlier ones),
  // scored against the area's threats (wild + trainer mons) by type coverage.
  const { eff } = window.VGAME;
  const PROGRESSION = ['saudade-town', 'route-1', 'eventide-forest', 'route-5', 'acciome-city', 'route-3', 'aphora-town', 'route-2', 'pebpup-cavern', 'limerico-town', 'route-4'];
  const STARTERS = ['001', '004', '007']; // Tamatoo, Flaret, Cubble
  const _bst = (m) => Object.values(m.stats).reduce((a, b) => a + b, 0);
  const _bestStab = (att, def) => att.types.reduce((best, at) => Math.max(best, def.types.reduce((m, dt) => m * eff(at, dt), 1)), 0);
  const _worstIncoming = (mon, threat) => threat.types.reduce((worst, at) => Math.max(worst, mon.types.reduce((m, dt) => m * eff(at, dt), 1)), 1);

  function recommendFor(slug) {
    const pi = PROGRESSION.indexOf(slug);
    if (pi < 0) return [];
    // cumulative obtainable pool: starters + encounters up to & including this area
    const pool = new Set(STARTERS);
    for (let i = 0; i <= pi; i++) {
      const rr = ROUTES.find(x => x.slug === PROGRESSION[i]);
      if (rr) (rr.encounters || []).forEach(e => pool.add(e.dex));
    }
    const here = ROUTES.find(x => x.slug === slug);
    if (!here) return [];
    // threats = this area's wild encounters + trainer-owned mons
    const threatDex = new Set();
    (here.encounters || []).forEach(e => threatDex.add(e.dex));
    (here.npcs || []).forEach(n => {
      if (Array.isArray(n.team)) n.team.forEach(m => m.dex && threatDex.add(m.dex));
      if (n.starterOptions) n.starterOptions.forEach(o => o.dex && threatDex.add(o.dex));
    });
    const threats = [...threatDex].map(byDex).filter(Boolean);
    if (threats.length === 0) return [];
    const cands = [...pool].map(byDex).filter(m => m && !m.undiscovered);
    const scored = cands.map(mon => {
      let off = 0, def = 0;
      threats.forEach(t => {
        const o = _bestStab(mon, t);
        off += o >= 2 ? 2 : o === 1 ? 0.5 : o > 0 ? 0 : -1;
        const inc = _worstIncoming(mon, t);
        def += inc >= 2 ? -1 : inc === 0 ? 1 : inc <= 0.5 ? 0.5 : 0;
      });
      return { dex: mon.dex, score: off * 2 + def + _bst(mon) / 600 };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map(s => s.dex);
  }

  // strip a trailing "x3" / "×2" quantity and normalize for matching against the catalogue
  const stripQty = (s) => s.replace(/\s*[x×]\s*\d+\s*$/i, '').trim();
  const _normItem = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let _itemIndex = null;
  const itemByName = (name) => {
    const base = stripQty(name);
    let it = ITEMS.find(i => i.name === base);
    if (it) return it;
    if (!_itemIndex) { _itemIndex = new Map(); for (const i of ITEMS) _itemIndex.set(_normItem(i.name), i); }
    it = _itemIndex.get(_normItem(base));
    if (it) return it;
    // Not in the catalogue — synthesize an entry pointing at a sprite by name.
    // ItemIcon falls back to a placeholder dot if the file doesn't exist, so this is safe.
    const fileName = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    return { name: base, icon: 'items/' + fileName + '.png' };
  };
  const ITEM_COLORS = {
    'Evolution': '#5fd13c', 'Valuable': '#ffd23c', 'Battle Items': '#8a5cff', 'Key Item': '#33d6ff',
    'Medicine': '#ff6f8f', 'Poké Ball': '#ff8a5c', 'Berries': '#d13c8a',
  };

  // ---------- index ----------
  window.VIEWS.Locations = function Locations() {
    return (
      <div>
        <PageHead kicker="REGION MAP" title="Locations" sub="The road from a sunny starting town to a tear in the sky. Open any location to see its wild Pokémon, the trainers and folk you'll meet there, and the items hidden within." />

        <div style={{ position: 'relative', paddingLeft: 38 }}>
          <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #5fd13c, #33d6ff 45%, #8a5cff 75%, #ff6f8f)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ROUTES.map((r) => {
              const endgame = r.kind === 'Dungeon';
              const trs = trainersAt(r.slug);
              const [hov, setHov] = [undefined, undefined];
              return (
                <div key={r.slug} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -32, top: 22, width: 16, height: 16, borderRadius: '50%', background: endgame ? '#8a5cff' : '#0e0b1f', border: `2px solid ${endgame ? '#b89bff' : '#33d6ff'}`, boxShadow: `0 0 12px ${endgame ? '#8a5cff' : '#33d6ff'}aa` }} />
                  <button onClick={() => go('#/location/' + r.slug)}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = endgame ? '#5a4a9e' : '#33557e'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = endgame ? '#3a2f6e' : '#221d3a'; e.currentTarget.style.transform = 'none'; }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 20, borderRadius: 14, transition: 'all .15s',
                      background: endgame ? 'linear-gradient(160deg, #1a1140, #0c0a1c)' : '#0e0b1f', border: `1px solid ${endgame ? '#3a2f6e' : '#221d3a'}` }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}><RouteName text={r.name} size={24} /></span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a5cff', letterSpacing: 0.5 }}>{r.tag.toUpperCase()}</span>
                      <span style={{ marginLeft: 'auto', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a5cff' }}>View ›</span>
                    </div>
                    <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14.5, color: '#bdb6dd', lineHeight: 1.55, maxWidth: 720, textWrap: 'pretty' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#7a7398' }}>
                      <span>◉ {r.mons.length} Pokémon</span>
                      <span>⚔ {trs.length} Trainer{trs.length === 1 ? '' : 's'}</span>
                      <span>☉ {r.npcs.length} NPC{r.npcs.length === 1 ? '' : 's'}</span>
                      <span>◆ {r.items.length} Item{r.items.length === 1 ? '' : 's'}</span>
                      <span style={{ color: '#5f5980' }}>· {r.encounter}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------- detail pieces ----------
  function MonCard({ dx }) {
    const m = byDex(dx); if (!m) return null;
    const accent = TYPES[m.types[0]].glow;
    return (
      <button onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', textAlign: 'center', padding: 12, borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', width: 120 }}>
        <SpriteSlot dex={dx} name={m.name} size={92} accent={accent} />
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginTop: 6 }}>No.{m.dex}</div>
        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', lineHeight: 1.1, marginTop: 2 }}>{m.name}</div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', marginTop: 6 }}>{m.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/pokemon/' + dx); }} />)}</div>
      </button>
    );
  }

  function TrainerCard({ t }) {
    const isBoss = /gym leader|rival|champion|boss/i.test(t.role || '');
    const c = { glow: isBoss ? '#ff5fa2' : '#8a5cff', bg: '#3a1d6e' };
    return (
      <div style={{ padding: 16, borderRadius: 14, background: isBoss ? `linear-gradient(160deg, ${c.bg}88, #0c0a1c)` : '#0e0b1f', border: `1px solid ${isBoss ? c.glow : '#221d3a'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
          {t.sprite && <img src={'trainers/' + t.sprite} alt={t.name} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }}
            style={{ width: 56, height: 56, imageRendering: 'pixelated', flex: '0 0 auto', filter: `drop-shadow(0 0 8px ${c.glow}66)` }} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: c.glow, letterSpacing: 0.5 }}>{(t.role || '').toUpperCase()}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 19, color: '#fff' }}>{t.name}</span>
              {isBoss && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: c.glow, border: `1px solid ${c.glow}`, borderRadius: 4, padding: '2px 6px' }}>BOSS</span>}
            </span>
          </div>
        </div>
        {t.line && (
          <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#c9bfff', fontStyle: 'italic', lineHeight: 1.5 }}>{t.line}</p>
        )}
        {t.starterDependent && (t.starterNote || (t.team[0] && t.team[0].note)) && (
          <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#c9bfff', fontStyle: 'italic', lineHeight: 1.5 }}>{t.starterNote || (t.team[0] && t.team[0].note) || 'Team depends on your starter choice.'}</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(t.team || []).map((m, i) => {
            const mon = m.dex ? byDex(m.dex) : null;
            const accent = mon ? TYPES[mon.types[0]].glow : '#8a5cff';
            const Inner = (
              <React.Fragment>
                <div style={{ flex: '0 0 auto' }}>{mon ? <SpriteSlot dex={m.dex} name={mon.name} size={48} accent={accent} /> : <div style={{ width: 40, height: 40, borderRadius: 8, background: '#15112a', border: '1px solid #2a2350', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#7b6fb8' }}>?</div>}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#fff' }}>{m.name}</span>
                    {mon && mon.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/types'); }} />)}
                    {m.lv && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#a89fce', fontWeight: 700 }}>Lv {m.lv}</span>}
                    {m.ability && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#9a8fc8', fontWeight: 600 }}>{m.ability}</span>}
                  </div>
                  {m.moves && m.moves.length > 0 && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#a49dc0', marginTop: 3, lineHeight: 1.4 }}>{m.moves.join(' · ')}</div>}
                </div>
              </React.Fragment>
            );
            return mon
              ? <button key={i} onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: '#15112a', border: `1px solid ${accent}33`, textAlign: 'left' }}>{Inner}</button>
              : <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: '#15112a', border: '1px solid #2a2350' }}>{Inner}</div>;
          })}
          {t.starterOptions && t.starterOptions.length > 0 && (
            <div style={{ marginTop: 4, padding: '12px 14px', borderRadius: 12, background: 'linear-gradient(160deg, #1d1240, #0c0a1c)', border: '1px solid #3a2f6e' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#b08fff', letterSpacing: 0.5, marginBottom: 10 }}>+ STARTER (DEPENDS ON YOUR CHOICE)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.starterOptions.map((o, i) => {
                  const mon = o.dex ? byDex(o.dex) : null;
                  const accent = mon ? TYPES[mon.types[0]].glow : '#8a5cff';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ flex: '0 0 auto', fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#8a83a8', minWidth: 118 }}>You picked <strong style={{ color: '#cdbfff' }}>{o.ifYouPicked}</strong></span>
                      <span style={{ color: '#6a6388' }}>→</span>
                      <button onClick={() => mon && go('#/pokemon/' + o.dex)} style={{ cursor: mon ? 'pointer' : 'default', flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '7px 11px', borderRadius: 10, background: '#15112a', border: `1px solid ${accent}33`, textAlign: 'left' }}>
                        {mon ? <SpriteSlot dex={o.dex} name={mon.name} size={40} accent={accent} /> : null}
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>{o.name}</span>
                            {o.lv && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#a89fce', fontWeight: 700 }}>Lv {o.lv}</span>}
                          </span>
                          {o.moves && o.moves.length > 0 && <span style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#a49dc0', marginTop: 2 }}>{o.moves.join(' · ')}</span>}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const H3 = ({ children }) => <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>{children}</h3>;

  // ---------- detail ----------
  window.VIEWS.Location = function Location({ param }) {
    const r = locBySlug(param);
    if (!r) return <Empty label={'No location named “' + param + '”.'} />;
    const trs = r.npcs || [];
    const idx = ROUTES.findIndex(x => x.slug === r.slug);
    const prev = ROUTES[(idx - 1 + ROUTES.length) % ROUTES.length];
    const next = ROUTES[(idx + 1) % ROUTES.length];
    const endgame = r.kind === 'Dungeon';
    const accent = endgame ? '#8a5cff' : '#33d6ff';

    const NavBtn = ({ m, dir }) => (
      <button onClick={() => go('#/location/' + m.slug)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9, background: '#0e0b1f', border: '1px solid #221d3a', color: '#b8b0e0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
        {dir === 'prev' && '‹'} {m.name} {dir === 'next' && '›'}
      </button>
    );

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <button onClick={() => go('#/locations')} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>‹ LOCATIONS</button>
          <div style={{ display: 'flex', gap: 8 }}><NavBtn m={prev} dir="prev" /><NavBtn m={next} dir="next" /></div>
        </div>

        {/* hero banner */}
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: `1px solid ${accent}44`, marginBottom: 24, background: `radial-gradient(ellipse at 25% 0%, ${accent}22, #0a0818 60%)` }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(1px 1px at 14% 28%, #fff7, transparent), radial-gradient(1px 1px at 72% 22%, #fff5, transparent), radial-gradient(2px 2px at 40% 60%, #b89bff66, transparent), radial-gradient(1px 1px at 88% 70%, #fff5, transparent)' }} />
          <div style={{ position: 'relative', padding: '34px 30px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', minHeight: 150 }}>
            <div>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 2, color: accent, marginBottom: 10 }}>{r.kind.toUpperCase()}{r.tag.toUpperCase() !== r.kind.toUpperCase() ? ' · ' + r.tag.toUpperCase() : ''}</div>
              <h1 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 1, color: '#fff', textShadow: `0 0 30px ${accent}66` }}><RouteName text={r.name} size={52} /></h1>
              <p style={{ margin: '14px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: '#bdb6dd', lineHeight: 1.6, maxWidth: 620, textWrap: 'pretty' }}>{r.desc}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#8a83a8', textAlign: 'right' }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginBottom: 4 }}>ENCOUNTER</div>{r.encounter}
              </div>
              {(() => {
                const recs = recommendFor(r.slug);
                if (recs.length === 0) return null;
                return (
                  <div style={{ minWidth: 320, padding: '18px 20px', borderRadius: 14, background: 'rgba(12,10,28,0.55)', border: `1px solid ${accent}44`, backdropFilter: 'blur(2px)' }}>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: accent, letterSpacing: 0.5, marginBottom: 14, textAlign: 'right' }}>★ RECOMMENDED TEAM</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {recs.map((dx, i) => {
                        const m = byDex(dx); if (!m) return null;
                        const c = TYPES[m.types[0]].glow;
                        return (
                          <button key={dx} onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13, padding: '10px 14px', borderRadius: 11, background: '#0e0b1f', border: `1px solid ${c}44`, textAlign: 'left' }}>
                            <span style={{ flex: '0 0 auto', fontFamily: "'Space Mono', monospace", fontSize: 14, color: '#5f5980', width: 16 }}>{i + 1}</span>
                            <SpriteSlot dex={dx} name={m.name} size={56} accent={c} />
                            <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 19, color: '#fff', lineHeight: 1.1 }}>{m.name}</span>
                              <span style={{ display: 'flex', gap: 4, marginTop: 4 }}>{m.types.map(t => <span key={t} style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: TYPES[t].fg, background: TYPES[t].bg, borderRadius: 3, padding: '2px 6px', letterSpacing: 0.4 }}>{TYPES[t].name.toUpperCase()}</span>)}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>
          {/* main column */}
          <div>
            <section style={{ marginBottom: 30 }}>
              <H3>WILD POKÉMON</H3>
              {(!r.encounters || r.encounters.length === 0) ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No wild Pokémon here.</div> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {r.encounters.map((e, i) => {
                    const m = byDex(e.dex); if (!m) return null;
                    const accent = TYPES[m.types[0]].glow;
                    return (
                      <button key={e.dex + '-' + i} onClick={() => go('#/pokemon/' + e.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', textAlign: 'left' }}>
                        <div style={{ flex: '0 0 auto' }}><SpriteSlot dex={e.dex} name={m.name} size={48} accent={accent} /></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#6f6896' }}>No.{m.dex}</span>
                            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#fff' }}>{m.name}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>{m.types.map(t => <TypePill key={t} t={t} sm onClick={(ev) => { ev.stopPropagation(); go('#/pokemon/' + e.dex); }} />)}</div>
                        </div>
                        <div style={{ flex: '0 0 auto', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 15, color: '#c9bfff', textShadow: '0 0 8px #8a5cff66' }}>{e.pct}%</span>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#a89fce', fontWeight: 700 }}>Lv {e.lv}{e.method === 'Fishing' ? ' · 🎣' : ''}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            <section>
              <H3>TRAINERS</H3>
              {trs.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No trainers to battle here.</div> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>{trs.map(t => <TrainerCard key={t.name} t={t} />)}</div>
              )}
            </section>
          </div>

          {/* side column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {r.map && (
              <section>
                <H3>MAP</H3>
                <img src={'maps/' + r.map} alt={r.name + ' map'} loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  style={{ width: '100%', borderRadius: 12, border: '1px solid #221d3a', display: 'block' }} />
              </section>
            )}

            {r.exits && (
              <section>
                <H3>EXITS</H3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {r.exits.split('|').map((ex, i) => {
                    const txt = ex.trim();
                    // destination is the text after the dash
                    const dashIdx = Math.max(txt.lastIndexOf('—'), txt.lastIndexOf('-'));
                    const dest = dashIdx >= 0 ? txt.slice(dashIdx + 1).trim() : txt;
                    // strip parentheticals like "(Western Entrance)" for matching
                    const destClean = dest.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
                    // 1) exact name match
                    let target = ROUTES.find(rr => rr.name.toLowerCase() === destClean);
                    // 2) the destination is a prefix of a location name ("Acciome" -> "Acciome City")
                    if (!target && destClean) target = ROUTES.find(rr => rr.name.toLowerCase().startsWith(destClean + ' ') || destClean.startsWith(rr.name.toLowerCase() + ' '));
                    // 3) any location name appears as a whole word anywhere in the exit text
                    if (!target) {
                      const low = txt.toLowerCase();
                      const cands = ROUTES.filter(rr => low.includes(rr.name.toLowerCase()));
                      // prefer the longest matching name (so "Route 5" beats "Route")
                      if (cands.length) target = cands.sort((a, b) => b.name.length - a.name.length)[0];
                    }
                    const common = { padding: '9px 13px', borderRadius: 9, background: '#0e0b1f', border: '1px solid #221d3a', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 };
                    return target
                      ? <button key={i} onClick={() => go('#/location/' + target.slug)} style={{ ...common, cursor: 'pointer', color: '#cdbfff', textAlign: 'left' }}>
                          <span>{txt}</span><span style={{ color: '#8a5cff' }}>›</span>
                        </button>
                      : <div key={i} style={{ ...common, color: '#8a83a8' }}>{txt}</div>;
                  })}
                </div>
              </section>
            )}

            {r.quests && r.quests.length > 0 && (
              <section>
                <H3>QUESTS</H3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.quests.map(q => (
                    <div key={q} style={{ padding: '10px 14px', borderRadius: 10, background: '#1a1238', border: '1px solid #3a2f6e', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#cdbfff', fontWeight: 600 }}>{q}</div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <H3>ITEMS</H3>
              {r.items.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>None catalogued.</div> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {r.items.map((it, i) => {
                  const item = itemByName(it) || { name: it };
                  const col = ITEM_COLORS[item.cat] || '#8a5cff';
                  return (
                    <button key={it + i} onClick={() => go('#/items')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#0e0b1f', border: '1px solid #221d3a', textAlign: 'left' }}>
                      <ItemIcon item={item} color={col} size={30} />
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#cdbfff', fontWeight: 600 }}>{it}</span>
                    </button>
                  );
                })}
              </div>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  };
})();
