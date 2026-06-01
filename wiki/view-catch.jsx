/* Pokémon Void — Catch Rate Calculator. window.VIEWS.Catch
   Uses the official Gen III/IV capture formula as the base, with Void-specific
   modifiers layered on top as clean multipliers. Built so new balls, statuses,
   abilities, locations, events, anomaly and legendary modifiers can be added by
   editing the small config tables at the top of this file. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES } = window.VDEX;
  const { go, SpriteSlot, Empty } = window.VUI;

  // ====================================================================
  // CONFIG TABLES — expand these to add new Void content. Each value is a
  // plain multiplier applied to the capture value `a`. Keep them simple.
  // ====================================================================
  const BALLS = [
    { id: 'poke',   name: 'Poké Ball',   mod: 1 },
    { id: 'great',  name: 'Great Ball',  mod: 1.5 },
    { id: 'ultra',  name: 'Ultra Ball',  mod: 2 },
    { id: 'master', name: 'Master Ball', mod: 255, guaranteed: true },
    // --- add custom Void balls here, e.g.:
    // { id: 'void', name: 'Void Ball', mod: 3.5 },
  ];

  const STATUSES = [
    { id: 'none',  name: 'None',       mod: 1 },
    { id: 'sleep', name: 'Sleep',      mod: 2 },
    { id: 'freeze',name: 'Freeze',     mod: 2 },
    { id: 'para',  name: 'Paralysis',  mod: 1.5 },
    { id: 'burn',  name: 'Burn',       mod: 1.5 },
    { id: 'poison',name: 'Poison',     mod: 1.5 },
    // --- add custom Void statuses here ---
  ];

  // Optional modifier groups. Each option carries a multiplier; 'none' = 1×.
  // These are where Void's unique systems plug in later.
  const OPTIONAL_GROUPS = [
    { key: 'event',    label: 'Event Bonus',      color: '#33d6ff', options: [
      { id: 'none', name: 'None', mod: 1 },
      // { id: 'catch_week', name: 'Catch Week (×1.5)', mod: 1.5 },
    ] },
    { key: 'ability',  label: 'Ability Modifier', color: '#5fd13c', options: [
      { id: 'none', name: 'None', mod: 1 },
      // { id: 'example', name: 'Example Ability (×2)', mod: 2 },
    ] },
    { key: 'location', label: 'Location Modifier', color: '#b08fff', options: [
      { id: 'none', name: 'None', mod: 1 },
      // { id: 'rift', name: 'Nullspace Rift (×0.8)', mod: 0.8 },
    ] },
    { key: 'anomaly',  label: 'Anomaly Modifier',  color: '#ff7fe0', options: [
      { id: 'none', name: 'None', mod: 1 },
      // { id: 'anomaly', name: 'Anomaly Encounter (×0.5)', mod: 0.5 },
    ] },
    { key: 'legendary',label: 'Legendary Modifier',color: '#ffd54a', options: [
      { id: 'none', name: 'None', mod: 1 },
      // { id: 'legend', name: 'Legendary (×0.4)', mod: 0.4 },
    ] },
    { key: 'custom',   label: 'Custom Void Modifier', color: '#ff8f5c', options: [
      { id: 'none', name: 'None', mod: 1 },
      // freeform — add any one-off Void rule here
    ] },
  ];

  // ====================================================================
  // CORE MATH — exact Gen III/IV capture, no simplification.
  // ====================================================================
  // a = ((3*Max - 2*Cur) * catchRate * ball) / (3*Max) * status * customs
  function captureValue({ maxHP, curHP, catchRate, ballMod, statusMod, customMods }) {
    const base = ((3 * maxHP - 2 * curHP) * catchRate * ballMod) / (3 * maxHP);
    const product = customMods.reduce((m, v) => m * v, 1);
    return base * statusMod * product;
  }

  // Shake probability per official mechanics: b = 1048560 / sqrt(sqrt(16711680 / a))
  // Each of 4 shake checks passes with probability (b / 65536). Catch = all 4 pass.
  function catchProbability(a) {
    if (a >= 255) return 1;
    if (a <= 0) return 0;
    const b = 1048560 / Math.sqrt(Math.sqrt(16711680 / a));
    const per = b / 65536;             // single shake-check pass chance
    return Math.min(1, Math.pow(per, 4));
  }

  // ====================================================================
  // UI
  // ====================================================================
  function NumField({ label, value, onChange, min, max, hint, text }) {
    return (
      <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a83a8', letterSpacing: 0.5 }}>{label}</span>
        <input type={text ? 'text' : 'number'} inputMode="numeric" value={value} min={min} max={max}
          onChange={e => { const v = e.target.value; if (!text || v === '' || /^[0-9]+$/.test(v)) onChange(v); }}
          style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 9, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Mono', monospace", fontSize: 14, outline: 'none' }} />
        {hint && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: '#5f5980' }}>{hint}</span>}
      </label>
    );
  }

  function SelectField({ label, value, onChange, options, color = '#8a5cff' }) {
    return (
      <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a83a8', letterSpacing: 0.5 }}>{label}</span>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%', padding: '9px 12px', borderRadius: 9, background: '#100c24', border: `1px solid ${color}55`, color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', cursor: 'pointer' }}>
          {options.map(o => <option key={o.id} value={o.id} style={{ background: '#15102e' }}>{o.name}{o.mod !== 1 && !o.guaranteed ? `  (×${o.mod})` : ''}{o.guaranteed ? '  (auto-catch)' : ''}</option>)}
        </select>
      </label>
    );
  }

  function PickMonModal({ onPick, onClose }) {
    const [q, setQ] = React.useState('');
    const term = q.trim().toLowerCase();
    const list = DEX.filter(d => !d.undiscovered && (!term || d.name.toLowerCase().includes(term) || d.dex.includes(term)));
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 760, background: 'radial-gradient(ellipse at 30% 0%, #15102e, #0a0818 70%)', border: '1px solid #2a2350', borderRadius: 18, padding: 22, boxShadow: '0 30px 80px #000a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>Load a Pokémon's catch rate</span>
            <button onClick={onClose} style={{ marginLeft: 'auto', cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Close</button>
          </div>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or №…" spellCheck={false}
            style={{ width: '100%', padding: '11px 15px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, outline: 'none', marginBottom: 16 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))', gap: 10, maxHeight: 460, overflowY: 'auto' }}>
            {list.map(d => {
              const accent = TYPES[d.types[0]].glow;
              return (
                <button key={d.dex} onClick={() => onPick(d)} style={{ cursor: 'pointer', padding: 10, borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', textAlign: 'center' }}>
                  <SpriteSlot dex={d.dex} name={d.name} size={68} accent={accent} />
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginTop: 5 }}>CR {d.catchRate}</div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', lineHeight: 1.1 }}>{d.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const Card = ({ children, accent = '#221d3a', pad = 20 }) => (
    <div style={{ padding: pad, borderRadius: 16, background: '#0c0a1c', border: `1px solid ${accent}` }}>{children}</div>
  );
  const H3 = ({ children, color = '#8a5cff' }) => <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color }}>{children}</h3>;
  const Line = ({ label, val, color = '#e9e4ff', mono = true }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '7px 0', borderBottom: '1px solid #15112a' }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#9a93bb' }}>{label}</span>
      <span style={{ fontFamily: mono ? "'Space Mono', monospace" : "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color }}>{val}</span>
    </div>
  );

  window.VIEWS.Catch = function Catch() {
    const [picking, setPicking] = React.useState(false);
    const [monName, setMonName] = React.useState('');
    const [monDex, setMonDex] = React.useState(null);
    const [catchRate, setCatchRate] = React.useState('45');
    const [maxHP, setMaxHP] = React.useState('150');
    const [curHP, setCurHP] = React.useState('1');
    const [ball, setBall] = React.useState('poke');
    const [status, setStatus] = React.useState('none');
    const [opt, setOpt] = React.useState(() => Object.fromEntries(OPTIONAL_GROUPS.map(g => [g.key, 'none'])));

    const loadMon = (d) => {
      setMonName(d.name); setMonDex(d.dex);
      setCatchRate(String(+d.catchRate || 45));
      // estimate a level-50 Max HP from base HP so the field is sensible; user can edit
      const est = Math.floor((2 * d.stats.HP * 50) / 100) + 50 + 10;
      setMaxHP(String(est)); setCurHP('1');
      setPicking(false);
    };

    // ---- numbers ----
    const CR = Math.max(0, +catchRate || 0);
    const MAX = Math.max(1, +maxHP || 1);
    const CUR = Math.min(MAX, Math.max(0, +curHP || 0));
    const ballObj = BALLS.find(b => b.id === ball) || BALLS[0];
    const statusObj = STATUSES.find(s => s.id === status) || STATUSES[0];
    const optChosen = OPTIONAL_GROUPS.map(g => {
      const o = (g.options.find(x => x.id === opt[g.key]) || g.options[0]);
      return { group: g, opt: o };
    });
    const activeOpt = optChosen.filter(x => x.opt.mod !== 1);
    const customMods = activeOpt.map(x => x.opt.mod);

    const masterAuto = !!ballObj.guaranteed;
    const a = masterAuto ? Infinity : captureValue({ maxHP: MAX, curHP: CUR, catchRate: CR, ballMod: ballObj.mod, statusMod: statusObj.mod, customMods });
    const guaranteed = masterAuto || a >= 255;
    const p = guaranteed ? 1 : catchProbability(a);
    const pct = p * 100;
    const oneInX = p > 0 ? (1 / p) : Infinity;
    const expectedBalls = p > 0 ? (1 / p) : Infinity;

    const baseValue = ((3 * MAX - 2 * CUR) * CR * ballObj.mod) / (3 * MAX); // before status & customs

    const fmtPct = (x) => x >= 99.95 ? '100%' : x.toFixed(x < 1 ? 3 : 1) + '%';
    const fmtNum = (x) => Number.isFinite(x) ? (x >= 100 ? Math.round(x) : x.toFixed(2)) : '∞';

    return (
      <div>
        {picking && <PickMonModal onPick={loadMon} onClose={() => setPicking(false)} />}

        {/* header */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 2, color: '#8a5cff', marginBottom: 8 }}>FIELD MATHEMATICS</div>
          <h1 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 1, color: '#fff', textShadow: '0 0 30px #8a5cff66' }}>Catch Rate Calculator</h1>
          <p style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: '#bdb6dd', maxWidth: 680, lineHeight: 1.6 }}>The exact capture math used in the field. Lower the target's HP, inflict a status, and pick your ball to see your real odds — every number is shown so you can check it by hand.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: 22, alignItems: 'start' }}>
          {/* ---------------- INPUTS ---------------- */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <H3>TARGET</H3>
              <button onClick={() => setPicking(true)} style={{ marginLeft: 'auto', marginTop: -10, cursor: 'pointer', background: '#1a1238', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600 }}>Load from Dex</button>
            </div>
            {monDex && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, padding: 10, borderRadius: 10, background: '#100c24', border: '1px solid #2a2545' }}>
                <SpriteSlot dex={monDex} name={monName} size={44} accent="#8a5cff" />
                <div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>{monName}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#8a83a8' }}>HP estimate is editable below</div>
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <NumField label="CATCH RATE" value={catchRate} onChange={setCatchRate} min={1} max={255} hint="1–255 (higher = easier)" />
              <NumField label="MAX HP" value={maxHP} onChange={setMaxHP} min={1} hint="target's total HP" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <NumField label="CURRENT HP" value={curHP} onChange={setCurHP} min={0} hint="lower HP greatly improves odds" text />
              <input type="range" min={0} max={MAX} value={Math.min(MAX, Math.max(0, +curHP || 0))} onChange={e => setCurHP(e.target.value)} style={{ width: '100%', marginTop: 8, accentColor: '#8a5cff' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#5f5980' }}>
                <span>{Math.round((CUR / MAX) * 100)}% HP</span>
                <span>{CUR} / {MAX}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <SelectField label="POKÉ BALL" value={ball} onChange={setBall} options={BALLS} color="#33d6ff" />
              <SelectField label="STATUS" value={status} onChange={setStatus} options={STATUSES} color="#5fd13c" />
            </div>

            <H3 color="#ff8f5c">OPTIONAL VOID MODIFIERS</H3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {OPTIONAL_GROUPS.map(g => (
                <SelectField key={g.key} label={g.label.toUpperCase()} value={opt[g.key]} color={g.color}
                  onChange={(v) => setOpt(o => ({ ...o, [g.key]: v }))} options={g.options} />
              ))}
            </div>
            <p style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#5f5980', lineHeight: 1.5 }}>Most of these are empty for now — they're wired and ready for Void's custom balls, statuses, abilities, locations, events, anomaly and legendary rules. Add options at the top of this file.</p>
          </Card>

          {/* ---------------- RESULT ---------------- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Card accent={guaranteed ? '#5fd13c55' : '#8a5cff55'} pad={24}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: guaranteed ? '#5fd13c' : '#8a5cff', letterSpacing: 0.5, marginBottom: 6 }}>CATCH CHANCE PER BALL</div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 64, lineHeight: 0.9, color: guaranteed ? '#7fe06a' : '#fff', textShadow: `0 0 28px ${guaranteed ? '#5fd13c66' : '#8a5cff66'}` }}>{fmtPct(pct)}</div>
                </div>
                <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {guaranteed ? (
                    <div style={{ padding: '10px 14px', borderRadius: 10, background: '#12301c', border: '1px solid #2f8f4a', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: '#7fe06a' }}>✓ Guaranteed catch{masterAuto ? ' (Master Ball)' : ' (a ≥ 255)'}</div>
                  ) : (
                    <React.Fragment>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 14, color: '#cdbfff' }}><span>Odds</span><strong>≈ 1 in {fmtNum(oneInX)}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: 14, color: '#cdbfff' }}><span>Expected balls</span><strong>≈ {fmtNum(expectedBalls)}</strong></div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              {/* probability bar */}
              <div style={{ marginTop: 18, height: 14, borderRadius: 5, background: '#15112a', overflow: 'hidden', border: '1px solid #2a2350' }}>
                <div style={{ width: `${Math.max(2, pct)}%`, height: '100%', background: guaranteed ? 'linear-gradient(90deg,#3a9e4a,#7fe06a)' : 'linear-gradient(90deg,#6a4dd6,#b08fff)' }} />
              </div>
            </Card>

            {/* breakdown */}
            <Card>
              <H3>FULL CALCULATION BREAKDOWN</H3>
              <p style={{ margin: '0 0 14px', fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#8a83a8', lineHeight: 1.6, background: '#100c24', padding: 12, borderRadius: 8, border: '1px solid #221d3a' }}>
                a = ((3 × MaxHP − 2 × CurrentHP) × CatchRate × Ball) ÷ (3 × MaxHP) × Status × Customs
              </p>
              <Line label={`(3 × ${MAX} − 2 × ${CUR}) = HP term`} val={(3 * MAX - 2 * CUR).toLocaleString()} />
              <Line label={`× Catch Rate (${CR}) × Ball (×${ballObj.mod})`} val={((3 * MAX - 2 * CUR) * CR * ballObj.mod).toLocaleString()} />
              <Line label={`÷ (3 × MaxHP) = ÷ ${(3 * MAX).toLocaleString()}`} val={baseValue.toFixed(3)} color="#cdbfff" />
              <Line label={`× Status — ${statusObj.name} (×${statusObj.mod})`} val={(baseValue * statusObj.mod).toFixed(3)} />
              {activeOpt.length === 0
                ? <Line label="× Custom modifiers" val="none (×1)" color="#6a6388" />
                : activeOpt.map((x, i) => <Line key={i} label={`× ${x.group.label} — ${x.opt.name} (×${x.opt.mod})`} val={'applied'} color={x.group.color} />)}
              <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 10, background: guaranteed ? '#12301c' : '#1a1238', border: `1px solid ${guaranteed ? '#2f8f4a' : '#3a2f6e'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: guaranteed ? '#7fe06a' : '#b08fff', letterSpacing: 0.5 }}>FINAL VALUE OF a</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: guaranteed ? '#7fe06a' : '#fff' }}>{masterAuto ? '∞ (auto)' : a.toFixed(2)}</span>
              </div>
              {!guaranteed && (
                <p style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8', lineHeight: 1.6 }}>
                  Because a ({a.toFixed(1)}) is below 255, the game runs four “shake checks”. Each shake passes with chance (b ÷ 65536) where b = 1048560 ÷ √√(16711680 ÷ a). The Pokémon is caught only if all four shakes pass, so the catch chance is that single-shake chance raised to the 4th power = <strong style={{ color: '#cdbfff' }}>{fmtPct(pct)}</strong>.
                </p>
              )}
            </Card>

            {/* applied summary */}
            <Card accent="#221d3a">
              <H3 color="#33d6ff">APPLIED MODIFIERS</H3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Line label="Ball" val={`${ballObj.name} (×${ballObj.mod})`} color="#9fdcff" mono={false} />
                <Line label="Status" val={`${statusObj.name} (×${statusObj.mod})`} color="#9fe09f" mono={false} />
                {OPTIONAL_GROUPS.map(g => {
                  const o = g.options.find(x => x.id === opt[g.key]) || g.options[0];
                  return <Line key={g.key} label={g.label} val={o.mod === 1 ? '—' : `${o.name} (×${o.mod})`} color={o.mod === 1 ? '#6a6388' : g.color} mono={false} />;
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };
})();
