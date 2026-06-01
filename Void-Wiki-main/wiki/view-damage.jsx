/* Pokémon Void — Damage Calculator. window.VIEWS.Damage */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES } = window.VDEX;
  const { byMove, eff, TYPE_ORDER } = window.VGAME;
  const { go, SpriteSlot, TypePill, PageHead } = window.VUI;

  // ---- Natures: [boosted stat, lowered stat] (null = neutral) ----
  const NATURES = {
    Hardy: null, Lonely: ['ATK', 'DEF'], Brave: ['ATK', 'SPE'], Adamant: ['ATK', 'SPA'], Naughty: ['ATK', 'SPD'],
    Bold: ['DEF', 'ATK'], Docile: null, Relaxed: ['DEF', 'SPE'], Impish: ['DEF', 'SPA'], Lax: ['DEF', 'SPD'],
    Timid: ['SPE', 'ATK'], Hasty: ['SPE', 'DEF'], Serious: null, Jolly: ['SPE', 'SPA'], Naive: ['SPE', 'SPD'],
    Modest: ['SPA', 'ATK'], Mild: ['SPA', 'DEF'], Quiet: ['SPA', 'SPE'], Bashful: null, Rash: ['SPA', 'SPD'],
    Calm: ['SPD', 'ATK'], Gentle: ['SPD', 'DEF'], Sassy: ['SPD', 'SPE'], Careful: ['SPD', 'SPA'], Quirky: null,
  };
  const NATURE_NAMES = Object.keys(NATURES);

  // ---- Stat calculation (standard Gen 3+ formula) ----
  function calcStat(base, iv, ev, level, isHP, natureMult) {
    if (isHP) {
      if (base === 1) return 1; // Shedinja-likes
      return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
    }
    const s = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    return Math.floor(s * natureMult);
  }
  function natureMultFor(nature, stat) {
    const n = NATURES[nature];
    if (!n) return 1;
    if (n[0] === stat) return 1.1;
    if (n[1] === stat) return 0.9;
    return 1;
  }

  // ---- Damage formula ----
  // returns { min, max, minPct, maxPct, koText, eff }
  function calcDamage(atkr, defr, move) {
    if (!move || move.cls === 'Status' || !(typeof move.pow === 'number')) return null;
    const physical = move.cls === 'Physical';
    const atkStatKey = physical ? 'ATK' : 'SPA';
    const defStatKey = physical ? 'DEF' : 'SPD';

    const A = statValue(atkr, atkStatKey);
    const D = statValue(defr, defStatKey);
    const L = atkr.level;
    let power = move.pow;

    // type effectiveness against defender's types
    const typeMult = defr.mon.types.reduce((m, t) => m * eff(move.type, t), 1);
    // STAB
    const stab = atkr.mon.types.includes(move.type) ? 1.5 : 1;
    // item / ability modifiers (light: Life Orb, Choice, type-boost)
    let mod = 1;
    if (atkr.item === 'Life Orb') mod *= 1.3;
    if (atkr.item === 'Choice (Atk/SpA)' && ((physical && true) || (!physical && true))) mod *= 1.5;
    if (atkr.item === 'Type Booster' && atkr.mon.types.includes(move.type)) mod *= 1.2;
    if (atkr.ability === 'Adaptability' && stab === 1.5) { /* handled below */ }

    const stabFinal = (atkr.ability === 'Adaptability' && stab === 1.5) ? 2 : stab;

    // base damage (before random roll)
    const base = Math.floor(Math.floor((Math.floor((2 * L) / 5 + 2) * power * A) / D) / 50) + 2;
    const afterMods = base * stabFinal * typeMult * mod;

    if (typeMult === 0) return { min: 0, max: 0, minPct: 0, maxPct: 0, koText: 'No effect', typeMult };

    // 85–100% random roll
    const min = Math.floor(afterMods * 0.85);
    const max = Math.floor(afterMods);
    const hp = statValue(defr, 'HP');
    const minPct = (min / hp) * 100;
    const maxPct = (max / hp) * 100;

    // KO calculation: how many hits to guarantee KO (using min roll)
    let hits = Infinity;
    if (min > 0) hits = Math.ceil(hp / min);
    let guaranteed = min * Math.floor(hp / min) >= hp ? Math.ceil(hp / min) : Math.ceil(hp / min);
    const koText = koDescribe(min, max, hp);

    return { min, max, minPct, maxPct, koText, typeMult, hp };
  }

  function koDescribe(min, max, hp) {
    if (max >= hp) {
      if (min >= hp) return 'Guaranteed OHKO';
      const chance = Math.round(((max - hp) / (max - min || 1)) * 100);
      return `Possible OHKO (~${Math.min(99, Math.max(1, chance))}%)`;
    }
    const minHits = Math.ceil(hp / max); // best case
    const maxHits = Math.ceil(hp / (min || 1)); // worst case
    if (minHits === maxHits) return `Guaranteed ${minHits}HKO`;
    return `${minHits}–${maxHits} hits to KO`;
  }

  // resolve a fighter's actual stat value
  function statValue(f, key) {
    const base = f.mon.stats[key];
    const iv = f.ivs[key], ev = f.evs[key];
    return calcStat(base, iv, ev, f.level, key === 'HP', natureMultFor(f.nature, key));
  }

  // ---- default fighter state ----
  function defaultFighter(dex) {
    return {
      dex, mon: byDex(dex), level: 50, nature: 'Hardy',
      ivs: { HP: 31, ATK: 31, DEF: 31, SPA: 31, SPD: 31, SPE: 31 },
      evs: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      item: 'None', ability: 'None',
    };
  }

  const ITEMS = ['None', 'Life Orb', 'Choice (Atk/SpA)', 'Type Booster'];
  const ABILITIES = ['None', 'Adaptability'];

  // ---- Mon picker (compact) ----
  function MonPicker({ value, onChange, label, accent }) {
    const [open, setOpen] = React.useState(false);
    const [q, setQ] = React.useState('');
    const mon = byDex(value);
    const list = DEX.filter(d => !d.undiscovered && (!q.trim() || d.name.toLowerCase().includes(q.trim().toLowerCase()) || d.dex.includes(q.trim())));
    return (
      <div style={{ position: 'relative' }}>
        <button onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: '#100c24', border: `1px solid ${accent}55` }}>
          <SpriteSlot dex={mon.dex} name={mon.name} size={52} accent={accent} />
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980' }}>{label}</div>
            <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{mon.name}</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>{mon.types.map(t => <TypePill key={t} t={t} sm />)}</div>
          </div>
          <span style={{ color: '#6a6388', fontSize: 12 }}>▾</span>
        </button>
        {open && (
          <div style={{ position: 'absolute', zIndex: 30, top: '100%', left: 0, right: 0, marginTop: 6, background: '#0c0a1c', border: '1px solid #2a2350', borderRadius: 12, padding: 10, boxShadow: '0 20px 50px #000a' }}>
            <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" spellCheck={false}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', marginBottom: 8 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))', gap: 6, maxHeight: 280, overflowY: 'auto' }}>
              {list.map(d => (
                <button key={d.dex} onClick={() => { onChange(d.dex); setOpen(false); setQ(''); }} style={{ cursor: 'pointer', padding: 6, borderRadius: 8, background: d.dex === value ? '#1a1440' : 'transparent', border: '1px solid #221d3a', textAlign: 'center' }}>
                  <SpriteSlot dex={d.dex} name={d.name} size={48} accent={TYPES[d.types[0]].glow} />
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#cdbfff', marginTop: 3, lineHeight: 1.1 }}>{d.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- a compact field row ----
  function Field({ label, children }) {
    return (
      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a83a8', letterSpacing: 0.5 }}>{label}</span>
        {children}
      </label>
    );
  }
  const selStyle = { padding: '6px 10px', borderRadius: 7, background: '#100c24', color: '#e9e4ff', border: '1px solid #2a2545', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, minWidth: 0 };
  const numStyle = { ...selStyle, width: 64, textAlign: 'center' };

  function FighterPanel({ f, set, accent, role }) {
    const [showAdv, setShowAdv] = React.useState(false);
    const STATS = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
    return (
      <div style={{ padding: 16, borderRadius: 16, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0c0a1c 75%)', border: `1px solid ${accent}44` }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: accent, marginBottom: 12 }}>{role}</div>
        <MonPicker value={f.dex} onChange={dex => set({ ...defaultFighter(dex), level: f.level })} label="POKÉMON" accent={accent} />

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <Field label="LEVEL">
            <input type="number" min={1} max={100} value={f.level} onChange={e => set({ ...f, level: Math.max(1, Math.min(100, +e.target.value || 1)) })} style={numStyle} />
          </Field>
          <Field label="NATURE">
            <select value={f.nature} onChange={e => set({ ...f, nature: e.target.value })} style={selStyle}>
              {NATURE_NAMES.map(n => <option key={n} value={n} style={{ background: '#100c24' }}>{n}</option>)}
            </select>
          </Field>
          <Field label="ITEM">
            <select value={f.item} onChange={e => set({ ...f, item: e.target.value })} style={selStyle}>
              {ITEMS.map(n => <option key={n} value={n} style={{ background: '#100c24' }}>{n}</option>)}
            </select>
          </Field>
          <Field label="ABILITY">
            <select value={f.ability} onChange={e => set({ ...f, ability: e.target.value })} style={selStyle}>
              {ABILITIES.map(n => <option key={n} value={n} style={{ background: '#100c24' }}>{n}</option>)}
            </select>
          </Field>
        </div>

        <button onClick={() => setShowAdv(s => !s)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: '#8a5cff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, marginTop: 4 }}>{showAdv ? '▾ hide IVs / EVs' : '▸ IVs / EVs'}</button>
        {showAdv && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 8, alignItems: 'center', fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#5f5980' }}>
              <span></span><span style={{ textAlign: 'center' }}>IV (0-31)</span><span style={{ textAlign: 'center' }}>EV (0-252)</span>
            </div>
            {STATS.map(s => (
              <div key={s} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 8, alignItems: 'center' }}>
                <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#a89fce' }}>{s}</span>
                <input type="number" min={0} max={31} value={f.ivs[s]} onChange={e => set({ ...f, ivs: { ...f.ivs, [s]: Math.max(0, Math.min(31, +e.target.value || 0)) } })} style={{ ...numStyle, width: '100%' }} />
                <input type="number" min={0} max={252} value={f.evs[s]} onChange={e => set({ ...f, evs: { ...f.evs, [s]: Math.max(0, Math.min(252, +e.target.value || 0)) } })} style={{ ...numStyle, width: '100%' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  window.VIEWS.Damage = function Damage() {
    const [atkr, setAtkr] = React.useState(() => defaultFighter('012'));
    const [defr, setDefr] = React.useState(() => defaultFighter('040'));
    const [moveName, setMoveName] = React.useState('');
    const [moveQ, setMoveQ] = React.useState('');

    // attacker's learnable moves (level + tm + egg), de-duped, that deal damage
    const learn = React.useMemo(() => {
      const names = new Set();
      const m = atkr.mon;
      for (const arr of [m.levelMoves || [], m.tmMoves || [], m.eggMoves || []]) for (const mv of arr) names.add(mv.name || mv);
      const list = [];
      names.forEach(n => { const mv = byMove(n); if (mv && mv.cls !== 'Status' && typeof mv.pow === 'number') list.push(mv); });
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }, [atkr.dex]);

    const move = moveName ? byMove(moveName) : null;
    const result = move ? calcDamage(atkr, defr, move) : null;

    const filteredMoves = learn.filter(mv => !moveQ.trim() || mv.name.toLowerCase().includes(moveQ.trim().toLowerCase()));

    return (
      <div>
        <PageHead kicker="BATTLE MATH" title="Damage Calculator" sub="Set up an attacker and defender — level, nature, IVs, EVs, item, ability — pick a move, and see the exact damage range, HP percentage, and KO odds. Built for nuzlocke and hardcore runs." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <FighterPanel f={atkr} set={setAtkr} accent="#ff8f5c" role="ATTACKER" />
          <FighterPanel f={defr} set={setDefr} accent="#5fb8ff" role="DEFENDER" />
        </div>

        {/* move picker */}
        <div style={{ padding: 16, borderRadius: 16, background: '#0c0a1c', border: '1px solid #221d3a', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: '#8a5cff', marginBottom: 12 }}>{atkr.mon.name.toUpperCase()}'S MOVE</div>
          <input value={moveQ} onChange={e => setMoveQ(e.target.value)} placeholder="Filter moves…" spellCheck={false}
            style={{ width: '100%', maxWidth: 320, padding: '8px 12px', borderRadius: 8, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', marginBottom: 12 }} />
          {filteredMoves.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No damaging moves match.</div> : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {filteredMoves.map(mv => {
                const sel = mv.name === moveName;
                const T = TYPES[mv.type] || { glow: '#8a5cff', bg: '#222', fg: '#fff', name: mv.type };
                return (
                  <button key={mv.name} onClick={() => setMoveName(mv.name)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '7px 12px', borderRadius: 9, background: sel ? T.bg : '#15112a', border: `1.5px solid ${sel ? T.glow : '#221d3a'}`, boxShadow: sel ? `0 0 12px ${T.glow}66` : 'none' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: T.glow }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: sel ? '#fff' : '#cdbfff' }}>{mv.name}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: sel ? '#fff' : '#8a83a8' }}>{mv.cls === 'Physical' ? '⚔' : '✦'} {mv.pow}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* result */}
        <ResultPanel atkr={atkr} defr={defr} move={move} result={result} />
      </div>
    );
  };

  function ResultPanel({ atkr, defr, move, result }) {
    if (!move) return (
      <div style={{ padding: 40, borderRadius: 16, background: 'radial-gradient(circle at 50% 0%, #15102e, #0a0818 70%)', border: '1px solid #221d3a', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#6a6388' }}>Pick a move above to calculate damage.</div>
    );
    if (!result) return null;
    const noEffect = result.typeMult === 0;
    const effColor = result.typeMult === 0 ? '#a07bff' : result.typeMult >= 2 ? '#5fd13c' : result.typeMult <= 0.5 ? '#ff8f5c' : '#cdbfff';
    const effLabel = result.typeMult === 0 ? 'No effect' : result.typeMult >= 4 ? 'Quad effective' : result.typeMult === 2 ? 'Super effective' : result.typeMult === 0.5 ? 'Not very effective' : result.typeMult === 0.25 ? 'Quarter damage' : 'Neutral';
    return (
      <div style={{ padding: 24, borderRadius: 16, background: 'radial-gradient(ellipse at 50% 0%, #1a1438, #0a0818 70%)', border: '1px solid #2a2350' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 18, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#bdb6dd' }}>
          <strong style={{ color: '#ff8f5c' }}>{atkr.mon.name}</strong>
          <span>uses</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 8, background: (TYPES[move.type] || {}).bg, border: `1px solid ${(TYPES[move.type] || {}).glow}` }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>{move.name}</span>
          </span>
          <span>on</span>
          <strong style={{ color: '#5fb8ff' }}>{defr.mon.name}</strong>
        </div>

        {noEffect ? (
          <div style={{ textAlign: 'center', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 28, color: '#a07bff' }}>It doesn't affect {defr.mon.name}…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            <Stat label="DAMAGE" value={`${result.min}–${result.max}`} sub="HP" color="#fff" />
            <Stat label="% OF HP" value={`${result.minPct.toFixed(1)}–${result.maxPct.toFixed(1)}%`} sub={`of ${result.hp} HP`} color="#b08fff" />
            <Stat label="EFFECTIVENESS" value={`×${result.typeMult}`} sub={effLabel} color={effColor} />
            <Stat label="RESULT" value={result.koText} sub="" color={/OHKO|Guaranteed/.test(result.koText) ? '#5fd13c' : '#ffb347'} small />
          </div>
        )}

        {!noEffect && (
          <div style={{ marginTop: 20 }}>
            <div style={{ height: 22, borderRadius: 6, background: '#15112a', overflow: 'hidden', position: 'relative', border: '1px solid #2a2350' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${Math.min(100, result.minPct)}%`, background: 'linear-gradient(90deg, #6a4dd6, #b08fff)' }} />
              <div style={{ position: 'absolute', inset: 0, width: `${Math.min(100, result.maxPct)}%`, background: 'linear-gradient(90deg, transparent, #b08fff44)', borderRight: result.maxPct < 100 ? '2px solid #ff8f5c' : 'none' }} />
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388', marginTop: 6, textAlign: 'center' }}>Bar shows worst-case → best-case damage as a share of the defender's HP.</div>
          </div>
        )}
      </div>
    );
  }

  function Stat({ label, value, sub, color, small }) {
    return (
      <div style={{ padding: 14, borderRadius: 12, background: '#0c0a1c', border: '1px solid #221d3a', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#6a6388', letterSpacing: 0.5, marginBottom: 7 }}>{label}</div>
        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: small ? 18 : 26, color, lineHeight: 1.1 }}>{value}</div>
        {sub && <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#6a6388', marginTop: 4 }}>{sub}</div>}
      </div>
    );
  }
})();
