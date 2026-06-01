/* Pokémon Void — Team Builder & Coverage Analyzer. window.VIEWS.Team */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES, STAT_LABELS } = window.VDEX;
  const { TYPE_ORDER, CHART, eff } = window.VGAME;
  const { go, SpriteSlot, TypePill, Empty } = window.VUI;

  const MAXTEAM = 6;
  // localStorage works on the live site; guard so a preview sandbox can't crash.
  const LS_KEY = 'voiddex_team_v1';
  function loadTeam() {
    try { const v = JSON.parse(localStorage.getItem(LS_KEY)); return Array.isArray(v) ? v.filter(Boolean).slice(0, MAXTEAM) : []; }
    catch (e) { return []; }
  }
  function saveTeam(t) { try { localStorage.setItem(LS_KEY, JSON.stringify(t)); } catch (e) {} }

  // multiplier of an attacking type into a defender (1 or 2 types)
  function multInto(atk, defTypes) { return defTypes.reduce((m, d) => m * eff(atk, d), 1); }

  // a mon's STAB offensive types = its own types (simplest correct coverage proxy)
  function bestOffense(atk, allMons) {
    // how many team members have at least one move-type hitting super-effectively?
    // We use each mon's TYPES as its STAB coverage.
    return allMons.some(m => m.types.includes(atk));
  }

  function MonPickerModal({ onPick, onClose, exclude }) {
    const [q, setQ] = React.useState('');
    const list = DEX.filter(d => !d.undiscovered && !exclude.includes(d.dex) &&
      (!q.trim() || d.name.toLowerCase().includes(q.trim().toLowerCase()) || d.dex.includes(q.trim())));
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 760, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22, boxShadow: '0 30px 80px #000a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>Add a Pokémon</span>
            <button onClick={onClose} style={{ marginLeft: 'auto', cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
          </div>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or №…" spellCheck={false}
            style={{ width: '100%', padding: '11px 15px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, outline: 'none', marginBottom: 16 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))', gap: 10, maxHeight: 460, overflowY: 'auto' }}>
            {list.map(d => {
              const accent = TYPES[d.types[0]].glow;
              return (
                <button key={d.dex} onClick={() => onPick(d.dex)} style={{ cursor: 'pointer', padding: 10, borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', textAlign: 'center' }}>
                  <SpriteSlot dex={d.dex} name={d.name} size={68} accent={accent} />
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginTop: 5 }}>No.{d.dex}</div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', lineHeight: 1.1 }}>{d.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  window.VIEWS.Team = function Team() {
    const [team, setTeam] = React.useState(loadTeam);
    const [picking, setPicking] = React.useState(false);
    React.useEffect(() => { saveTeam(team); }, [team]);

    const mons = team.map(byDex).filter(Boolean);
    const add = (dex) => { setTeam(t => t.length < MAXTEAM ? [...t, dex] : t); setPicking(false); };
    const remove = (i) => setTeam(t => t.filter((_, idx) => idx !== i));
    const clear = () => setTeam([]);

    // ---- DEFENSE: for each attacking type, how many team members are weak / resist / immune ----
    const defRows = TYPE_ORDER.map(atk => {
      let weak = 0, resist = 0, immune = 0;
      mons.forEach(m => {
        const mult = multInto(atk, m.types);
        if (mult === 0) immune++;
        else if (mult >= 2) weak++;
        else if (mult <= 0.5) resist++;
      });
      return { atk, weak, resist, immune, net: weak - resist - immune };
    });
    // sort: biggest shared weaknesses first
    const threats = defRows.filter(r => r.weak > 0).sort((a, b) => b.weak - a.weak || a.atk.localeCompare(b.atk));
    const safe = defRows.filter(r => r.weak === 0 && (r.resist > 0 || r.immune > 0)).sort((a, b) => (b.resist + b.immune) - (a.resist + a.immune));

    // ---- OFFENSE: which types does the team hit super-effectively (via STAB) ----
    const teamStab = Array.from(new Set(mons.flatMap(m => m.types)));
    const offRows = TYPE_ORDER.map(def => {
      // best STAB multiplier the team can land on a mono-type 'def'
      let best = 0;
      teamStab.forEach(atk => { best = Math.max(best, eff(atk, def)); });
      return { def, best };
    });
    const covered = offRows.filter(r => r.best >= 2).map(r => r.def);
    const notCovered = offRows.filter(r => r.best < 2).map(r => r.def);

    // team stat totals
    const statTotals = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'].map(k => ({
      k, avg: mons.length ? Math.round(mons.reduce((s, m) => s + m.stats[k], 0) / mons.length) : 0,
    }));

    const Chip = ({ t, count, tone }) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 7, background: TYPES[t].bg + '55', border: `1px solid ${TYPES[t].glow}55`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: TYPES[t].fg }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPES[t].glow }} />
        {TYPES[t].name}
        {count != null && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: tone || '#fff', fontWeight: 700 }}>×{count}</span>}
      </span>
    );

    const H3 = ({ children, color = '#8a5cff' }) => <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color }}>{children}</h3>;

    return (
      <div>
        {picking && <MonPickerModal exclude={team} onPick={add} onClose={() => setPicking(false)} />}

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 2, color: '#8a5cff', marginBottom: 8 }}>BATTLE PREP</div>
            <h1 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 1, color: '#fff', textShadow: '0 0 30px #8a5cff66' }}>Team Builder</h1>
            <p style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: '#bdb6dd', maxWidth: 640, lineHeight: 1.6 }}>Assemble a party of up to six and see its type coverage and shared weaknesses. Your team saves automatically on this device.</p>
          </div>
          {team.length > 0 && (
            <button onClick={clear} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: '#2a1020', border: '1px solid #ff5f7e66', color: '#ff8fa6', borderRadius: 10, padding: '10px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>↺ Reset Team</button>
          )}
        </div>

        {/* team slots */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 14 }}>
          {Array.from({ length: MAXTEAM }).map((_, i) => {
            const m = mons[i];
            if (!m) return (
              <button key={i} onClick={() => setPicking(true)} disabled={team.length >= MAXTEAM && !m} style={{ cursor: 'pointer', minHeight: 180, borderRadius: 14, background: 'repeating-linear-gradient(135deg, #0c0a1c, #0c0a1c 10px, #0e0b22 10px, #0e0b22 20px)', border: '1.5px dashed #2a2350', color: '#5f5980', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 30, color: '#3a2f6e' }}>＋</span>
                <span>Add Pokémon</span>
              </button>
            );
            const accent = TYPES[m.types[0]].glow;
            return (
              <div key={i} style={{ position: 'relative', minHeight: 180, borderRadius: 14, background: `radial-gradient(ellipse at 50% 0%, ${TYPES[m.types[0]].bg}44, #0c0a1c 75%)`, border: `1px solid ${accent}55`, padding: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={() => remove(i)} title="Remove" style={{ position: 'absolute', top: 6, right: 6, cursor: 'pointer', width: 22, height: 22, borderRadius: '50%', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', fontSize: 13, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                  <SpriteSlot dex={m.dex} name={m.name} size={92} accent={accent} />
                </button>
                <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginTop: 2 }}>{m.name}</div>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', marginTop: 6 }}>{m.types.map(t => <TypePill key={t} t={t} sm />)}</div>
              </div>
            );
          })}
        </div>

        {mons.length === 0 ? (
          <div style={{ marginTop: 30 }}><Empty label="Add a Pokémon to analyze your team's coverage." /></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 14 }}>
            {/* DEFENSE */}
            <section style={{ padding: 20, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a' }}>
              <H3 color="#ff6f8f">DEFENSIVE — SHARED WEAKNESSES</H3>
              {threats.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#5fd1a0' }}>No shared weaknesses. Remarkably balanced.</div> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {threats.map(r => (
                    <div key={r.atk} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: '0 0 116px' }}><Chip t={r.atk} /></div>
                      <div style={{ flex: 1, height: 16, borderRadius: 4, background: '#15112a', overflow: 'hidden', display: 'flex' }}>
                        <div style={{ width: `${(r.weak / mons.length) * 100}%`, background: r.weak >= 3 ? '#ff5577' : '#ff8f5c', height: '100%' }} />
                      </div>
                      <span style={{ flex: '0 0 60px', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 12, color: r.weak >= 3 ? '#ff7799' : '#ffb38f', fontWeight: 700 }}>{r.weak} weak</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ height: 1, background: '#1d1838', margin: '18px 0' }} />
              <H3 color="#5fd1a0">WELL-RESISTED</H3>
              {safe.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>None notably resisted.</div> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {safe.slice(0, 12).map(r => <Chip key={r.atk} t={r.atk} count={r.resist + r.immune} tone="#5fd1a0" />)}
                </div>
              )}
            </section>

            {/* OFFENSE */}
            <section style={{ padding: 20, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a' }}>
              <H3 color="#5fd13c">OFFENSIVE COVERAGE (STAB)</H3>
              <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8', lineHeight: 1.5 }}>Types your party hits super-effectively using its own typing.</p>
              <div style={{ marginBottom: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#5fd13c' }}>HITS HARD ({covered.length}/{TYPE_ORDER.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                {covered.length === 0 ? <span style={{ color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 12 }}>None</span> : covered.map(t => <Chip key={t} t={t} />)}
              </div>
              <div style={{ marginBottom: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#ff8f5c' }}>COVERAGE GAPS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {notCovered.length === 0 ? <span style={{ color: '#5fd1a0', fontFamily: "'Space Mono', monospace", fontSize: 12 }}>Full coverage!</span> : notCovered.map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 7, background: '#15112a', border: '1px solid #2a2350', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPES[t].glow, opacity: 0.5 }} />{TYPES[t].name}
                  </span>
                ))}
              </div>
              <div style={{ height: 1, background: '#1d1838', margin: '18px 0' }} />
              <H3>TEAM AVERAGE STATS</H3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {statTotals.map(s => (
                  <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ flex: '0 0 64px', fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a83a8' }}>{STAT_LABELS[s.k].toUpperCase()}</span>
                    <div style={{ flex: 1, height: 10, borderRadius: 3, background: '#15112a', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (s.avg / 200) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #6a4dd6, #b08fff)' }} />
                    </div>
                    <span style={{ flex: '0 0 36px', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#e9e4ff', fontWeight: 700 }}>{s.avg}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  };
})();
