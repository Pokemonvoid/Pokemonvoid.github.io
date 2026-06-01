/* Pokémon Void — Pokémon detail view (merged "Void Archive" layout). window.VIEWS.Detail */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES } = window.VDEX;
  const { ROUTES } = window.VGAME;
  const { go, TypePill, SpriteSlot, Radar, StatBars, Matchups, Empty } = window.VUI;

  const H3 = (props) => <h3 style={{ margin: props.m || '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>{props.children}</h3>;

  function MoveRow({ m }) {
    const move = window.VGAME.byMove(m.name) || {};
    const type = move.type || 'NORMAL';
    const c = TYPES[type];
    const isSig = m.lv === '—';
    const isEgg = m.lv === 'EGG';
    const isTM  = typeof m.lv === 'string' && m.lv.startsWith('TM');
    const leftLabel = isSig ? 'SIG' : isEgg ? 'EGG' : isTM ? 'TM' : 'LV';
    const leftValue = isSig ? '★' : isEgg ? '✦' : isTM ? m.lv.slice(2) : m.lv;
    const leftSize  = (isSig || isEgg) ? 16 : 19;
    const leftColor = m.sig ? c.glow : '#fff';
    const Stat = ({ label, val }) => (
      <div style={{ textAlign: 'right', minWidth: 36 }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#5f5980' }}>{label}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#d8d2f0', fontWeight: 700 }}>{val ?? '—'}</div>
      </div>
    );
    return (
      <div onClick={() => go('#/moves')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '11px 14px', borderRadius: 12, background: m.sig ? `linear-gradient(135deg, ${c.bg}66, #0f0b22)` : 'linear-gradient(135deg, #15102e, #0f0b22)', border: `1px solid ${m.sig ? c.glow + '88' : '#231d40'}` }}>
        <div style={{ flex: '0 0 auto', width: 40, textAlign: 'center', borderRight: '1px solid #2a2350', paddingRight: 12 }}>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: m.sig ? c.glow : '#5f5980' }}>{leftLabel}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: leftSize, color: leftColor, fontWeight: 700, lineHeight: 1.1 }}>{leftValue}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>{m.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TypePill t={type} sm onClick={(e) => e.stopPropagation()} /><span style={{ fontSize: 12, color: '#8a83a8' }}>{move.cls || '—'}</span>
          </div>
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', gap: 12 }}><Stat label="POW" val={move.pow} /><Stat label="ACC" val={move.acc} /><Stat label="PP" val={move.pp} /></div>
      </div>
    );
  }

  function MoveSection({ title, moves }) {
    return (
      <div style={{ marginBottom: 24 }}>
        <H3 m="0 0 12px">{title}</H3>
        {moves && moves.length > 0
          ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{moves.map(m => <MoveRow key={m.name + m.lv} m={m} />)}</div>
          : <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#5f5980', padding: '10px 14px', borderRadius: 10, background: '#0f0c22', border: '1px solid #1d1838' }}>None</div>
        }
      </div>
    );
  }

  function buildEvoTree(d) {
    let root = d;
    while (root.evo && typeof root.evo.from === 'string') root = byDex(root.evo.from) || root;
    function node(m) {
      const tos = Array.isArray(m.evo && m.evo.to) ? m.evo.to : (m.evo && m.evo.to) ? [m.evo.to] : [];
      return { data: m, children: tos.map(t => { const nx = byDex(t); return nx ? { method: (nx.evo && nx.evo.method) || (m.evo && m.evo.method) || '', node: node(nx) } : null; }).filter(Boolean) };
    }
    return node(root);
  }

  // Find the fusion this mon is part of, if any.
  // Returns { result, parents:[a,b], method } or null.
  function findFusion(d) {
    // is THIS mon a fusion result? (from is an array)
    if (d.evo && Array.isArray(d.evo.from)) {
      return { result: d, parents: d.evo.from.map(byDex).filter(Boolean), method: d.evo.method || '' };
    }
    // is this mon a PARENT of some fusion? scan for a result whose from includes d.dex
    for (const cand of DEX) {
      if (cand.evo && Array.isArray(cand.evo.from) && cand.evo.from.includes(d.dex)) {
        return { result: cand, parents: cand.evo.from.map(byDex).filter(Boolean), method: cand.evo.method || '' };
      }
    }
    return null;
  }

  function FusionPanel({ fusion, current }) {
    const { result, parents, method } = fusion;
    const accent = TYPES[result.types[0]].glow;
    return (
      <div style={{ marginTop: 14, padding: '22px 18px', borderRadius: 16, background: 'radial-gradient(ellipse at 50% 0%, #2a1248 0%, #0d0a20 70%)', border: `1px solid ${accent}44`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(1px 1px at 20% 30%, #fff6, transparent), radial-gradient(2px 2px at 70% 60%, #c45fff55, transparent), radial-gradient(1px 1px at 85% 25%, #fff5, transparent)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {parents.map((p, i) => (
            <React.Fragment key={p.dex}>
              {i > 0 && <span style={{ fontSize: 28, color: '#c45fff', fontWeight: 700, textShadow: '0 0 12px #c45fff' }}>+</span>}
              <EvoCard m={p} current={current} size={78} width={120} />
            </React.Fragment>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 6px' }}>
            <span style={{ fontSize: 26, color: '#ffb347', textShadow: '0 0 14px #ff8f3c' }}>⟶</span>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#ffce8f', textShadow: '0 0 8px #ff8f3c88', marginTop: 4, maxWidth: 90, textAlign: 'center', lineHeight: 1.3 }}>FUSE</span>
          </div>
          <EvoCard m={result} current={current} size={92} width={132} />
        </div>
        {method && <div style={{ position: 'relative', marginTop: 14, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#dcc9ff', lineHeight: 1.5 }}>{method}</div>}
      </div>
    );
  }

  function EvoCard({ m, current, size = 84, width, compact }) {
    return (
      <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', width, background: m.dex === current ? '#1a1440' : 'transparent', border: `1px solid ${m.dex === current ? '#3a2f6e' : '#221d3a'}`, borderRadius: 12, padding: compact ? 8 : 10, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SpriteSlot dex={m.dex} name={m.name} size={size} accent={TYPES[m.types[0]].glow} />
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: compact ? 12 : 13, fontWeight: 600, color: '#e9e4ff', marginTop: 6, lineHeight: 1.15, overflowWrap: 'anywhere' }}>{m.name}</div>
      </button>
    );
  }

  function EvoArrow({ method }) {
    return (
      <div style={{ textAlign: 'center', color: '#8a5cff', flex: '0 0 auto', padding: '0 4px' }}>
        <div style={{ fontSize: 26, lineHeight: 1 }}>→</div>
        {method && <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#dcd2ff', letterSpacing: 0.5, marginTop: 5, textShadow: '0 0 8px #8a5cffaa', whiteSpace: 'nowrap' }}>{method}</div>}
      </div>
    );
  }

  function RadialEvoNode({ node: n, current }) {
    const { data: m, children } = n;
    const count = children.length;
    const radius = count > 8 ? 39 : 36;
    const centerSize = 80;
    const childSize = count > 8 ? 62 : 70;
    const cardWidth = count > 8 ? 112 : 122;
    const cardHalf = cardWidth / 2;
    const cardTopOffset = count > 8 ? 56 : 62;
    const height = count > 8 ? 680 : 560;
    const placements = children.map((child, i) => {
      const angle = -90 + (360 / count) * i;
      const rad = angle * Math.PI / 180;
      const x = 50 + Math.cos(rad) * radius;
      const y = 50 + Math.sin(rad) * radius;
      const labelX = 50 + Math.cos(rad) * (radius * 0.55);
      const labelY = 50 + Math.sin(rad) * (radius * 0.55);
      return { child, angle, x, y, labelX, labelY };
    });
    return (
      <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
      <div style={{ position: 'relative', width: 680, height, overflow: 'hidden', margin: '0 auto', borderRadius: 16, background: 'radial-gradient(circle at 50% 50%, #171134 0%, #0d0a20 48%, transparent 72%)', border: '1px solid #221d3a' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {placements.map(({ child, x, y }) => (
            <line key={child.node.data.dex} x1="50" y1="50" x2={x} y2={y} stroke="#3a2f6e" strokeWidth="0.35" />
          ))}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#221d3a" strokeWidth="0.25" strokeDasharray="1 1.4" />
        </svg>

        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
          <EvoCard m={m} current={current} size={centerSize} width={128} compact />
        </div>

        {placements.map(({ child, x, y, labelX, labelY }) => (
          <React.Fragment key={child.node.data.dex}>
            <div style={{ position: 'absolute', left: `calc(${labelX}% - 46px)`, top: `calc(${labelY}% - 9px)`, width: 92, zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#c9bfff', letterSpacing: 0.4, lineHeight: 1.3, overflowWrap: 'anywhere', textShadow: '0 0 6px #8a5cff66' }}>{child.method}</div>
            </div>
            <div style={{ position: 'absolute', left: `calc(${x}% - ${cardHalf}px)`, top: `calc(${y}% - ${cardTopOffset}px)`, width: cardWidth, zIndex: 3 }}>
              <EvoCard m={child.node.data} current={current} size={childSize} width={cardWidth} compact />
            </div>
          </React.Fragment>
        ))}
      </div>
      </div>
    );
  }

  function EvoNode({ node: n, current }) {
    const { data: m, children } = n;
    if (children.length === 0) return <EvoCard m={m} current={current} />;
    if (children.length === 1) return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <EvoCard m={m} current={current} />
        <EvoArrow method={children[0].method} />
        <EvoNode node={children[0].node} current={current} />
      </div>
    );
    if (children.length >= 4) return <RadialEvoNode node={n} current={current} />;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <EvoCard m={m} current={current} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {children.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <EvoArrow method={c.method} />
              <EvoNode node={c.node} current={current} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Evolution({ d }) {
    const fusion = findFusion(d);
    const tree = buildEvoTree(d);
    const hasTree = tree.children.length > 0;
    // If this mon is a fusion result with no normal evo tree, show only the fusion.
    // If it's a parent (has a normal branch AND is in a fusion), show both.
    if (!hasTree && fusion) {
      return <FusionPanel fusion={fusion} current={d.dex} />;
    }
    if (!hasTree && !fusion) return (
      <div style={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, background: 'radial-gradient(circle at 50% 50%, #171134 0%, #0d0a20 60%, transparent 80%)', border: '1px solid #221d3a', fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#8a7fb0' }}>{d.legendary ? 'A one-of-a-kind being. It does not evolve.' : 'Does not evolve.'}</div>
    );
    const isRadial = tree.children.length >= 4;
    return (
      <React.Fragment>
        {isRadial ? <EvoNode node={tree} current={d.dex} /> : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 4, minHeight: 200, padding: '24px 16px', borderRadius: 16, background: 'radial-gradient(circle at 50% 50%, #171134 0%, #0d0a20 60%, transparent 80%)', border: '1px solid #221d3a' }}>
            <EvoNode node={tree} current={d.dex} />
          </div>
        )}
        {fusion && <FusionPanel fusion={fusion} current={d.dex} />}
      </React.Fragment>
    );
  }

  function InfoTable({ rows }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: '#100c24', border: '1px solid #1d1838' }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#6a6388', letterSpacing: 0.5 }}>{label.toUpperCase()}</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#e9e4ff', fontWeight: 700 }}>{value}</span>
          </div>
        ))}
      </div>
    );
  }

  function formatEVYield(evYield) {
    if (!evYield) return '—';
    const labels = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };
    return Object.entries(evYield).map(([k, v]) => `${v} ${labels[k]}`).join(', ');
  }

  function formatGender(d) {
    if (d.genderless) return 'Genderless';
    if (!d.gender) return '♂ 50%  ♀ 50%';
    if (d.gender.m === 100) return '♂ only';
    if (d.gender.f === 100) return '♀ only';
    return `♂ ${d.gender.m}%  ♀ ${d.gender.f}%`;
  }

  function SpriteGallery({ d, accent, onPreview }) {
    const FRAMES = [
      { suffix: null,   label: 'F1'   },
      { suffix: 'f2',   label: 'F2'   },
      { suffix: 'back', label: 'BACK' },
    ];
    // Best (highest) wild encounter chance for this mon across all areas, as a fraction.
    const bestPct = (window.VGAME.ROUTES || []).reduce((best, r) => {
      for (const e of (r.encounters || [])) { if (e.dex === d.dex && e.pct > best) best = e.pct; }
      return best;
    }, 0);
    // effective 1-in-N to encounter THIS mon AND have it be the variant
    const effRate = (oneIn) => {
      if (!bestPct) return null;
      const n = Math.round(oneIn * (100 / bestPct));
      return '1 / ' + n.toLocaleString('en-US');
    };
    const VARIANTS = [
      { key: 'normal',  label: 'NORMAL',  color: accent,    prefix: ''        },
      { key: 'shiny',   label: 'SHINY',   color: '#ffd700', prefix: 'shiny',   rate: '1 / 4096',   eff: effRate(4096)  },
      { key: 'anomaly', label: 'ANOMALY', color: '#c45fff', prefix: 'anomaly', rate: '1 / 10,000', eff: effRate(10000) },
    ];
    const sfx = (prefix, frameSuffix) => {
      if (!prefix && frameSuffix === null) return undefined;
      if (!prefix) return frameSuffix;
      if (frameSuffix === null) return prefix;
      return `${prefix}-${frameSuffix}`;
    };
    const anomalyRevealed = d.anomaly != null;
    return (
      <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #1d1838' }}>
        <H3>SPRITE GALLERY</H3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {VARIANTS.map(v => {
            const isAnomaly = v.key === 'anomaly';
            const locked = isAnomaly && !anomalyRevealed;
            return (
              <div key={v.key} style={{ padding: 14, borderRadius: 12, background: '#0d0b20', border: `1px solid ${v.color}33` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12, flexWrap: 'nowrap', overflowX: 'auto' }}>
                  <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: v.color, letterSpacing: 1, flexShrink: 0 }}>{v.label}</span>
                  {v.rate && <span title="Base odds for any encounter" style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 20, background: `${v.color}1a`, border: `1px solid ${v.color}44`, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: v.color }}>★ {v.rate}</span>}
                  {v.eff && <span title={`Combined odds of finding this Pokémon (best spawn ${bestPct}%) and it being ${v.label.toLowerCase()}`} style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 9px', borderRadius: 20, background: '#0a0818', border: `1px solid ${v.color}33`, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: '#dcd2ff' }}><span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: v.color, opacity: 0.9 }}>THIS MON</span> {v.eff}</span>}
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', filter: locked ? 'blur(7px) brightness(0.5)' : 'none', userSelect: locked ? 'none' : 'auto' }}>
                    {FRAMES.map(f => {
                      const suffix = sfx(v.prefix, f.suffix);
                      const clickable = !locked && onPreview;
                      return (
                        <div key={f.label} style={{ textAlign: 'center' }}>
                          <button onClick={clickable ? () => onPreview(suffix === undefined ? null : { suffix, color: v.color, label: f.label, variantLabel: v.label }) : undefined}
                            title={clickable ? `View ${v.label} ${f.label} in showcase` : undefined}
                            style={{ cursor: clickable ? 'pointer' : 'default', background: 'transparent', border: 'none', padding: 0 }}>
                            <SpriteSlot dex={d.dex} name={d.name} size={80} accent={v.color} suffix={suffix} label={f.label} />
                          </button>
                          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#6a6388', marginTop: 4 }}>{f.label}</div>
                        </div>
                      );
                    })}
                  </div>
                  {locked && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <div style={{ fontSize: 22 }}>🔒</div>
                      <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#c45fff', letterSpacing: 1 }}>UNDISCOVERED</div>
                    </div>
                  )}
                  {isAnomaly && anomalyRevealed && (
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#8a83a8', letterSpacing: 1, marginBottom: 3 }}>DISCOVERED BY</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#c45fff', fontWeight: 700 }}>{d.anomaly.discoverer}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function FormsSection({ d, accent }) {
    if (!d.forms || d.forms.length === 0) return null;
    return (
      <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #1d1838' }}>
        <H3>FORMS</H3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {d.forms.map(form => {
            const formAccent = TYPES[(form.types || d.types)[0]].glow || accent;
            const total = form.stats ? Object.values(form.stats).reduce((a, b) => a + b, 0) : null;
            return (
              <div key={form.name} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 14, padding: 14, borderRadius: 12, background: '#0d0b20', border: `1px solid ${formAccent}44` }}>
                <SpriteSlot dex={d.dex} name={form.name} size={96} accent={formAccent} suffix={form.spriteSuffix} label="FORM" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 19, color: '#fff', marginBottom: 6 }}>{form.name}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {(form.types || d.types).map(t => <TypePill key={t} t={t} sm />)}
                  </div>
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: formAccent, marginBottom: 6 }}>TRIGGER</div>
                  <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.5 }}>{form.trigger}</p>
                  {form.desc && <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a83a8', lineHeight: 1.5 }}>{form.desc}</p>}
                  {form.stats && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#8a83a8' }}>
                      {Object.entries(form.stats).map(([k, v]) => <span key={k} style={{ padding: '4px 6px', borderRadius: 6, background: '#100c24', border: '1px solid #221c3e' }}>{k} <span style={{ color: '#f0ecff', fontWeight: 700 }}>{v}</span></span>)}
                      <span style={{ padding: '4px 6px', borderRadius: 6, color: formAccent, background: '#100c24', border: `1px solid ${formAccent}55` }}>BST <span style={{ fontWeight: 700 }}>{total}</span></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  window.VIEWS.Detail = function Detail({ param }) {
    const d = byDex(param);
    if (!d) return <Empty label={'No Pokédex entry for №' + param + '.'} />;
    // ---- Undiscovered (mystery) lock: fully obscured page ----
    if (d.undiscovered) {
      const idxU = DEX.findIndex(x => x.dex === d.dex);
      const prevU = DEX[(idxU - 1 + DEX.length) % DEX.length];
      const nextU = DEX[(idxU + 1) % DEX.length];
      const NavU = ({ m, dir }) => (
        <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9, background: '#0e0b1f', border: '1px solid #221d3a', color: '#b8b0e0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
          {dir === 'prev' && '‹'} <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980' }}>No.{m.dex}</span> {m.undiscovered ? '???' : m.name} {dir === 'next' && '›'}
        </button>
      );
      return (
        <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #1d1838', background: 'radial-gradient(ellipse at 30% 0%, #150f2e 0%, #0a0818 55%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
            <button onClick={() => go('#/pokedex')} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>‹ POKÉDEX</button>
            <div style={{ display: 'flex', gap: 8 }}><NavU m={prevU} dir="prev" /><NavU m={nextU} dir="next" /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px 90px', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #c45fff44 0%, #3a1d6e44 35%, transparent 68%)', filter: 'blur(34px)' }} />
              <div style={{ filter: 'blur(11px) brightness(0.45) saturate(0.6)', userSelect: 'none', pointerEvents: 'none' }}>
                <SpriteSlot dex={d.dex} name="???" size={220} accent="#c45fff" label="???" />
              </div>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 40 }}>🔒</div>
              </div>
            </div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 56, color: '#1c1840', lineHeight: 1, letterSpacing: 2 }}>{d.dex}</div>
            <h1 style={{ margin: '6px 0 0', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 76, lineHeight: 0.9, color: '#fff', textShadow: '0 0 40px #c45fff88', letterSpacing: 4 }}>???</h1>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 12, color: '#c45fff', letterSpacing: 2, marginTop: 20 }}>UNDISCOVERED</div>
            <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.7, color: '#8a83a8', maxWidth: 440 }}>This Pokémon has not yet been catalogued in the VOIDDEX. Its data remains sealed.</p>
          </div>
        </div>
      );
    }
    const total = Object.values(d.stats).reduce((a, b) => a + b, 0);
    const idx = DEX.findIndex(x => x.dex === d.dex);
    const prev = DEX[(idx - 1 + DEX.length) % DEX.length];
    const next = DEX[(idx + 1) % DEX.length];
    const accent = TYPES[d.types[0]].glow;
    const foundRoutes = ROUTES.filter(r => r.mons.includes(d.dex));

    // Click-to-preview: gallery clicks temporarily swap the hero sprite.
    // Resets to default (null) whenever the viewed Pokémon changes.
    const [preview, setPreview] = React.useState(null);
    React.useEffect(() => { setPreview(null); }, [param]);

    const NavBtn = ({ m, dir }) => (
      <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9, background: '#0e0b1f', border: '1px solid #221d3a', color: '#b8b0e0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
        {dir === 'prev' && '‹'} <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980' }}>No.{m.dex}</span> {m.undiscovered ? '???' : m.name} {dir === 'next' && '›'}
      </button>
    );

    return (
      <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #1d1838', background: 'radial-gradient(ellipse at 30% 0%, #15102e 0%, #0a0818 55%)' }}>
        {/* masthead */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(1px 1px at 12% 18%, #fff8, transparent), radial-gradient(1px 1px at 80% 12%, #fff6, transparent), radial-gradient(1px 1px at 55% 40%, #fff5, transparent), radial-gradient(2px 2px at 30% 60%, #b89bff77, transparent), radial-gradient(1px 1px at 90% 70%, #fff5, transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', position: 'relative' }}>
            <button onClick={() => go('#/pokedex')} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>‹ POKÉDEX</button>
            <div style={{ display: 'flex', gap: 8 }}><NavBtn m={prev} dir="prev" /><NavBtn m={next} dir="next" /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 10, padding: '4px 32px 28px', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${preview ? preview.color : accent}55 0%, ${TYPES[d.types[0]].bg}55 35%, transparent 68%)`, filter: 'blur(30px)' }} />
                <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', border: `1px solid ${(preview ? preview.color : accent)}33`, transform: 'rotate(-18deg) scaleY(0.4)' }} />
                <SpriteSlot key={preview ? preview.suffix || 'base' : 'hero'} dex={d.dex} name={d.name} size={220} accent={preview ? preview.color : accent} suffix={preview ? preview.suffix : undefined} label={preview ? preview.label : 'HERO SPRITE'} />
              </div>
              {preview && (
                <button onClick={() => setPreview(null)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, margin: '10px 0 2px', padding: '6px 14px', borderRadius: 20, background: '#1a1238', border: `1px solid ${preview.color}66`, color: '#cdbfff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5 }}>
                  <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: preview.color }}>{preview.variantLabel} {preview.label}</span>
                  <span style={{ opacity: 0.85 }}>↺ reset</span>
                </button>
              )}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 6 }}>{d.types.map(t => <TypePill key={t} t={t} glow />)}</div>
              <div style={{ fontSize: 14, color: '#8a83a8', letterSpacing: 1, marginTop: 12 }}>{d.category} Pokémon</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 56, color: '#1c1840', lineHeight: 1, letterSpacing: 2 }}>{d.dex}</div>
              <h1 style={{ margin: '4px 0 0', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 76, lineHeight: 0.9, color: '#fff', textShadow: `0 0 40px ${accent}88`, letterSpacing: -1 }}>{d.name}</h1>
              <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.7, color: '#bdb6dd', textWrap: 'pretty', maxWidth: 520 }}>{d.flavor}</p>
              <div style={{ display: 'flex', gap: 26, marginTop: 22, flexWrap: 'wrap' }}>
                {[['HEIGHT', d.height], ['WEIGHT', d.weight], ['CATCH RATE', d.catchRate]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#6a6388', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: '#f0ecff', fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* lower band */}
        <div style={{ background: 'linear-gradient(180deg, #0b0820, #0a0818)', borderTop: '1px solid #1d1838', padding: '28px 32px 34px' }}>
          <SpriteGallery d={d} accent={accent} onPreview={setPreview} />
          <FormsSection d={d} accent={accent} />
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 30 }}>
            <div>
              <H3 m="0 0 6px">STAT SHAPE</H3>
              <div style={{ display: 'flex', justifyContent: 'center' }}><Radar stats={d.stats} /></div>
              <div style={{ textAlign: 'center', fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#8a83a8', marginTop: 2, marginBottom: 24 }}>TOTAL <span style={{ color: accent, fontWeight: 700, fontSize: 16 }}>{total}</span></div>
              <H3>TYPE MATCHUPS</H3>
              <Matchups {...window.VGAME.computeMatchups(d.types)} />
            </div>

            <div>
              <H3 m="0 0 16px">BASE STATS</H3>
              <StatBars stats={d.stats} />
              <H3 m="26px 0 12px">ABILITIES</H3>
              {(() => {
                const findAbility = (name) => window.VGAME.ABILITIES.find(a => a.name === name) || { name, desc: '—' };
                return [
                  ...d.abilities.map(name => findAbility(name)),
                  { ...findAbility(d.hidden), hidden: true },
                ].map(a => (
                  <button key={a.name} onClick={() => go('#/abilities')} style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 12, padding: '12px 14px', borderRadius: 10, background: '#100c24', border: '1px solid #221c3e' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: a.hidden ? '#cdbfff' : '#f0ecff', fontFamily: "'Space Grotesk', sans-serif" }}>{a.name}{a.hidden && <span style={{ marginLeft: 8, fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a5cff' }}>HIDDEN</span>}</div>
                    <div style={{ fontSize: 13, color: '#9a93b5', marginTop: 4, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>{a.desc}</div>
                  </button>
                ));
              })()}
            </div>
          </div>

          {/* evolution + locations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 30, marginTop: 28, paddingTop: 24, borderTop: '1px solid #1d1838' }}>
            <div><H3>EVOLUTION</H3><Evolution d={d} /></div>
            <div>
              <H3>FOUND IN</H3>
              {(() => {
                // route encounters (clickable) + any free-text entries from d.found (quests, gifts, etc.)
                const routeNames = new Set(foundRoutes.map(r => r.name));
                const extras = (d.found || []).filter(f => typeof f === 'string' && !routeNames.has(f));
                if (foundRoutes.length === 0 && extras.length === 0) {
                  return <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>Not found in the wild.</div>;
                }
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {foundRoutes.map(r => {
                      const enc = (r.encounters || []).find(e => e.dex === d.dex);
                      const pctLabel = enc ? enc.pct + '%' : (r.encounter || '').toUpperCase();
                      const lvLabel = enc ? 'Lv ' + enc.lv : '';
                      return (
                      <button key={r.slug} onClick={() => go('#/location/' + r.slug)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: '#100c24', border: '1px solid #221c3e' }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#e9e4ff' }}>{r.name}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {lvLabel && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#8a83a8' }}>{lvLabel}</span>}
                          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#c9bfff', textShadow: '0 0 6px #8a5cff66' }}>{pctLabel}</span>
                        </span>
                      </button>
                      );
                    })}
                    {extras.map((f, i) => (
                      <div key={'x' + i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: '#1a1238', border: '1px solid #3a2f6e' }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#e9e4ff' }}>{f}</span>
                        <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#c9bfff' }}>SPECIAL</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* training + breeding */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 28, paddingTop: 24, borderTop: '1px solid #1d1838' }}>
            <div>
              <H3>TRAINING</H3>
              <InfoTable rows={[
                ['EV Yield', formatEVYield(d.evYield)],
                ['Catch Rate', d.catchRate],
                ['Base Friendship', d.baseFriendship ?? '—'],
                ['Base Exp.', d.baseExp ?? '—'],
                ['Growth Rate', d.growthRate ?? '—'],
              ]} />
            </div>
            <div>
              <H3>BREEDING</H3>
              <InfoTable rows={[
                ['Egg Groups', d.eggGroups ? d.eggGroups.join(' · ') : '—'],
                ['Gender', formatGender(d)],
                ['Egg Steps', d.eggCycles != null ? `${d.eggCycles.toLocaleString()} steps` : '—'],
              ]} />
            </div>
          </div>

          {/* moves */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #1d1838' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              <MoveSection title="MOVES · LEVEL UP" moves={d.levelMoves} />
              <div>
                <MoveSection title="MOVES · TM" moves={d.tmMoves} />
                <MoveSection title="MOVES · EGG" moves={d.eggMoves} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
})();
