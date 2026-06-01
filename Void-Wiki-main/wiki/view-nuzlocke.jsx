/* Pokémon Void — Nuzlocke Randomizer Generator. window.VIEWS.Nuzlocke
   Press Randomize → get a complete, conflict-free Nuzlocke ruleset with a
   difficulty rating scaled to how punishing the selected rules are. No external
   data; pure generation. Rules carry a `w` (weight = how restrictive) and an
   optional `tag` so contradictory rules can never appear together. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { PageHead } = window.VUI;

  // ---- helpers ----
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const chance = (p) => Math.random() < p;

  // Each option: { t: text, w: weight 0-3, tag?: mutual-exclusion key }
  // Picking one option per category; where a category may contribute several,
  // we filter so no two share a `tag`.
  const CATS = {
    encounter: {
      label: 'Encounter Rules', color: '#33d6ff',
      // exactly one of these governs how you catch
      one: [
        { t: 'Standard: only the FIRST encounter on each route/area may be caught.', w: 0 },
        { t: 'Choice: you may pick between the first TWO encounters on each route.', w: 0 },
        { t: 'First unique species only — if you already own that species, you skip and the route is burned.', w: 1 },
        { t: 'Dupes Clause: if the first encounter is a species you already own, you may try again until it is new.', w: 0 },
      ],
      // optional add-ons (each independent, may stack)
      addons: [
        { t: 'Shiny Clause: a shiny may always be caught, even outside normal rules.', w: 0, tag: 'shiny' },
        { t: 'Static encounters (gift-spot/forced battles) count as your encounter for that area.', w: 1, tag: 'static' },
        { t: 'Static encounters are BANNED — they never count and may not be caught.', w: 2, tag: 'static' },
        { t: 'Gift Pokémon are ALLOWED and do not use up an encounter.', w: 0, tag: 'gift' },
        { t: 'Gift Pokémon are BANNED entirely.', w: 2, tag: 'gift' },
      ],
    },
    death: {
      label: 'Death Rules', color: '#ff5f7e',
      one: [
        { t: 'A fainted Pokémon is dead — box it permanently.', w: 1, tag: 'deadfate' },
        { t: 'A fainted Pokémon is dead — release it.', w: 2, tag: 'deadfate' },
      ],
      addons: [
        { t: 'One Revive Token per Gym: you may resurrect a single dead Pokémon once between each badge.', w: -1, tag: 'mercy' },
        { t: 'A full team wipe ends the run immediately.', w: 2, tag: 'wipe' },
        { t: 'A team wipe only kills your active party — boxed Pokémon survive.', w: 0, tag: 'wipe' },
      ],
    },
    team: {
      label: 'Team Restrictions', color: '#b08fff',
      addons: [
        { t: 'Party cap: you may carry a maximum of {N} Pokémon at once.', w: 1, tag: 'size', dyn: () => ({ N: pick([3, 4, 5]) }) },
        { t: 'Monotype Run: every team member must share one chosen type.', w: 3, tag: 'typing' },
        { t: 'No Overlapping Types: no two team members may share any type.', w: 2, tag: 'typing' },
        { t: 'Your starter is benched permanently after the first gym.', w: 2, tag: 'starter' },
        { t: 'Team Rotation: you must swap in at least one fresh Pokémon after every badge.', w: 2, tag: 'rotate' },
        { t: 'Your lowest-level living Pokémon must always remain on the team.', w: 1, tag: 'lowmember' },
      ],
    },
    battle: {
      label: 'Battle Rules', color: '#ffb347',
      addons: [
        { t: 'Set Mode only — no free switching when the foe sends out a new Pokémon.', w: 1, tag: 'set' },
        { t: 'No items in battle (no potions, revives, or X-items mid-fight).', w: 2, tag: 'items' },
        { t: 'Held items are BANNED.', w: 1, tag: 'held' },
        { t: 'Level Cap: no Pokémon may exceed the next gym leader\u2019s ace level.', w: 2, tag: 'cap' },
        { t: 'No switching out a Pokémon for the rest of a battle once one of yours has been KO\u2019d.', w: 2, tag: 'noswitch' },
        { t: 'You must LEAD every battle with your lowest-level living Pokémon.', w: 2, tag: 'lead' },
      ],
    },
    species: {
      label: 'Pokémon Restrictions', color: '#5fd13c',
      addons: [
        { t: 'Legendary and Mythical Pokémon are BANNED.', w: 1, tag: 'legend' },
        { t: 'Pseudo-legendary Pokémon are BANNED.', w: 1, tag: 'pseudo' },
        { t: 'Trade-evolution Pokémon may not be evolved.', w: 1, tag: 'tradeevo' },
        { t: 'Pokémon with healing abilities are BANNED.', w: 1, tag: 'healability' },
        { t: 'Setup moves (stat-boosting moves) are BANNED.', w: 2, tag: 'setup' },
        { t: 'No two team members may share the same Ability.', w: 1, tag: 'dupeability' },
        { t: 'No Pokémon with a base stat total above {N} may be used.', w: 2, tag: 'bst', dyn: () => ({ N: pick([480, 500, 525]) }) },
      ],
    },
    modifier: {
      label: 'Extra Modifiers', color: '#ff7fe0',
      addons: [
        { t: 'No Pokémon Centers — healing only via items or in-field methods.', w: 3, tag: 'noheal' },
        { t: 'No Marts — you may not purchase anything.', w: 2, tag: 'nomart' },
        { t: 'No TMs may be used.', w: 1, tag: 'notm' },
        { t: 'Evolution is BANNED — Pokémon stay in their caught form forever.', w: 3, tag: 'noevo' },
        { t: 'One Pokémon per Gym: you may only use a single Pokémon against each gym leader.', w: 3, tag: 'onepergym' },
        { t: 'Permadeath applies to the whole evolution line — if one dies, you may never use that line again.', w: 2, tag: 'lineperma' },
        { t: 'After every gym, randomly sacrifice one surviving Pokémon.', w: 3, tag: 'sacrifice' },
      ],
    },
  };

  const CORE = [
    'If a Pokémon faints, it is considered dead and must be boxed or released (per your Death Rules).',
    'You may only catch the first valid encounter in each route or area.',
    'Every Pokémon you catch must be given a nickname.',
    'A blackout/whiteout (losing with no usable Pokémon) loses the run, unless a selected rule says otherwise.',
  ];

  const THEMES = [
    { name: 'Standard Nuzlocke', when: (d) => d <= 6 },
    { name: 'Mercy Locke',       when: (d, r) => r.some(x => x.tag === 'mercy') },
    { name: 'Typebound Locke',   when: (d, r) => r.some(x => x.tag === 'typing') },
    { name: 'Poverty Locke',     when: (d, r) => r.some(x => x.tag === 'nomart' || x.tag === 'noheal') },
    { name: 'Anomaly Hunter Locke', when: (d, r) => r.some(x => x.tag === 'shiny') },
    { name: 'Hardcore Locke',    when: (d) => d >= 12 && d < 17 },
    { name: 'Chaos Locke',       when: (d, r) => r.length >= 11 },
    { name: 'Roulette Locke',    when: (d, r) => r.some(x => x.tag === 'sacrifice') },
    { name: 'Masochist Locke',   when: (d) => d >= 21 },
    { name: 'Rival Locke',       when: () => true }, // fallback
  ];

  const TIERS = [
    { name: 'Easy',      min: -99, color: '#5fd13c' },
    { name: 'Normal',    min: 7,   color: '#33d6ff' },
    { name: 'Hard',      min: 12,  color: '#ffb347' },
    { name: 'Brutal',    min: 17,  color: '#ff7f4f' },
    { name: 'Nightmare', min: 21,  color: '#ff4f6f' },
  ];

  // resolve {N} placeholders and dynamic params
  const realize = (opt) => {
    if (!opt.dyn) return { ...opt };
    const params = opt.dyn();
    let t = opt.t;
    Object.entries(params).forEach(([k, v]) => { t = t.replace('{' + k + '}', v); });
    return { ...opt, t };
  };

  // pick a conflict-free set of addons from a pool: 1 per `tag`, count random
  function pickAddons(pool, minN, maxN) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const usedTags = new Set();
    const chosen = [];
    const target = minN + Math.floor(Math.random() * (maxN - minN + 1));
    for (const opt of shuffled) {
      if (chosen.length >= target) break;
      if (opt.tag && usedTags.has(opt.tag)) continue; // conflict guard
      chosen.push(realize(opt));
      if (opt.tag) usedTags.add(opt.tag);
    }
    return chosen;
  }

  function generate() {
    const out = {};
    const all = [];

    // Roll an INTENSITY first — this decides how many rules each category adds,
    // so runs genuinely span Easy → Nightmare instead of always piling up.
    // [team/battle/species min,max] and [modifier min,max] and [encounter/death addon max].
    const INTENSITY = pick([
      { core: [0, 1], mod: [0, 1], extra: 1 }, // light
      { core: [1, 2], mod: [0, 2], extra: 2 }, // medium
      { core: [1, 3], mod: [1, 3], extra: 3 }, // heavy
      { core: [2, 3], mod: [2, 3], extra: 3 }, // insane
    ]);
    const C = INTENSITY.core, MOD = INTENSITY.mod, EX = INTENSITY.extra;

    // Encounter: exactly one governing rule + addons
    const encOne = realize(pick(CATS.encounter.one));
    const encAdd = pickAddons(CATS.encounter.addons, 0, EX);
    out.encounter = [encOne, ...encAdd];

    // Death: one fate rule + addons
    const deathOne = realize(pick(CATS.death.one));
    const deathAdd = pickAddons(CATS.death.addons, 0, Math.min(2, EX));
    out.death = [deathOne, ...deathAdd];

    // The rest scale with intensity
    out.team = pickAddons(CATS.team.addons, C[0], C[1]);
    out.battle = pickAddons(CATS.battle.addons, C[0], C[1]);
    out.species = pickAddons(CATS.species.addons, C[0], C[1]);
    out.modifier = pickAddons(CATS.modifier.addons, MOD[0], MOD[1]);

    ['encounter', 'death', 'team', 'battle', 'species', 'modifier'].forEach(k => out[k].forEach(r => all.push(r)));

    // difficulty = sum of weights (mercy reduces it)
    const score = all.reduce((s, r) => s + (r.w || 0), 0);
    const tier = [...TIERS].reverse().find(t => score >= t.min) || TIERS[0];

    // theme: first matching rule, else fallback
    const theme = THEMES.find(t => t.when(score, all)) || THEMES[THEMES.length - 1];

    // win/loss conditions reflect chosen rules
    const wipeEnds = all.some(r => r.tag === 'wipe' && /ends the run/.test(r.t));
    const loss = wipeEnds
      ? 'You black out with no usable Pokémon, OR your entire team is wiped in a single battle.'
      : 'You black out / white out with no usable Pokémon remaining.';

    return { theme: theme.name, tier, score, core: CORE, ...out, win: 'Defeat the Champion and complete the Drapalla League with at least one living Pokémon.', loss };
  }

  window.VIEWS.Nuzlocke = function Nuzlocke() {
    const [run, setRun] = React.useState(null);
    const roll = () => setRun(generate());

    const Section = ({ label, color, rules }) => (
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 0.5, color, marginBottom: 10 }}>{label.toUpperCase()}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rules.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 10, background: '#0e0b1f', border: `1px solid ${color}33` }}>
              <span style={{ flex: '0 0 auto', width: 6, height: 6, borderRadius: '50%', background: color, marginTop: 7, boxShadow: `0 0 8px ${color}` }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#d8d2f0', lineHeight: 1.5 }}>{r.t || r}</span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div>
        <PageHead kicker="CHALLENGE FORGE" title="Nuzlocke Randomizer" sub="One press conjures a complete, hand-checked Nuzlocke ruleset for your next Void run — chaotic and replayable, but always actually beatable. No contradictions, no impossible combos." />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: run ? 28 : 60 }}>
          <button onClick={roll} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 34px', borderRadius: 14, background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, boxShadow: '0 0 34px #8a5cff66' }}>
            <span style={{ fontSize: 22 }}>🎲</span> {run ? 'Reroll Challenge' : 'Randomize'}
          </button>
        </div>

        {!run ? (
          <div style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#6a6388', maxWidth: 520, margin: '0 auto' }}>
            Hit Randomize to forge a run. You\u2019ll get a themed challenge with a difficulty rating, full rules, and clear win &amp; loss conditions you can follow start to finish.
          </div>
        ) : (
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            {/* banner */}
            <div style={{ padding: 24, borderRadius: 18, marginBottom: 24, background: `radial-gradient(ellipse at 30% 0%, ${run.tier.color}22, #0b0918 72%)`, border: `1px solid ${run.tier.color}66`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: run.tier.color, marginBottom: 8 }}>CHALLENGE NAME</div>
                <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 40, lineHeight: 1, color: '#fff', textShadow: `0 0 26px ${run.tier.color}55` }}>{run.theme}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: '#8a83a8', marginBottom: 6 }}>DIFFICULTY</div>
                <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 30, color: run.tier.color, textShadow: `0 0 18px ${run.tier.color}66` }}>{run.tier.name}</div>
              </div>
            </div>

            <Section label="Core Rules" color="#8a5cff" rules={run.core.map(t => ({ t }))} />
            <Section label="Encounter Rules" color={CATS.encounter.color} rules={run.encounter} />
            <Section label="Death Rules" color={CATS.death.color} rules={run.death} />
            <Section label="Team Restrictions" color={CATS.team.color} rules={run.team} />
            <Section label="Battle Rules" color={CATS.battle.color} rules={run.battle} />
            <Section label="Pokémon Restrictions" color={CATS.species.color} rules={run.species} />
            {run.modifier.length > 0 && <Section label="Extra Modifiers" color={CATS.modifier.color} rules={run.modifier} />}

            {/* win / loss */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 6 }}>
              <div style={{ padding: 16, borderRadius: 12, background: '#0c1c12', border: '1px solid #2f8f4a' }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5fd13c', marginBottom: 8 }}>WIN CONDITION</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#bfe6c9', lineHeight: 1.5 }}>{run.win}</div>
              </div>
              <div style={{ padding: 16, borderRadius: 12, background: '#1c0c12', border: '1px solid #8f2f4a' }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#ff5f7e', marginBottom: 8 }}>LOSS CONDITION</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#e6bfc9', lineHeight: 1.5 }}>{run.loss}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
})();
