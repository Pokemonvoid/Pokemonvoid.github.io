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
        { t: 'Level Cap: no Pokémon may exceed the next gym leader’s ace level.', w: 2, tag: 'cap' },
        { t: 'No switching out a Pokémon for the rest of a battle once one of yours has been KO’d.', w: 2, tag: 'noswitch' },
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

  // INSANITY-ONLY pool: extreme, chaotic, "stupid shit" rules. Never used by Standard.
  // These are deliberately punishing/cursed; weights are high so runs land in the top tiers.
  const INSANE = {
    label: 'Insanity Clauses', color: '#ff3b6b',
    addons: [
      { t: 'Shiny-Locke: you may ONLY use shiny Pokémon. Non-shinies cannot be added to your team.', w: 4, tag: 'shinylock' },
      { t: 'Anomaly-Locke: only Anomaly-form Pokémon may be used on your team.', w: 4, tag: 'anomalylock' },
      { t: 'Nickname Curse: every Pokémon must be nicknamed by a random word a friend gives you — no take-backs.', w: 1, tag: 'nickcurse' },
      { t: 'Color-Locke: pick one color at the start. Every Pokémon you use must visually match it.', w: 3, tag: 'colorlock' },
      { t: 'Cataclysm Clause: if ANY Pokémon faints, the entire box loses one random member too.', w: 4, tag: 'cataclysm' },
      { t: 'No Healing Items, EVER — survive on Centers and move PP alone.', w: 3, tag: 'noitemheal' },
      { t: 'Level Floor: your team’s levels may never EXCEED the last gym leader’s ace. Stay underleveled the whole game.', w: 4, tag: 'underlevel' },
      { t: 'One Type, One Life: choose a type; the run ENDS the moment a non-matching Pokémon touches your party.', w: 4, tag: 'typedeath' },
      { t: 'Randomized Movesets: before each gym, replace every team member’s moves with 4 random ones.', w: 3, tag: 'randmove' },
      { t: 'Solo Soul: you may only ever have ONE Pokémon alive at a time. Catch a new one only after it dies.', w: 5, tag: 'solo' },
      { t: 'Nuzlocke Roulette: after every badge, spin — 1-in-6 chance to release a random living Pokémon.', w: 3, tag: 'roulette6' },
      { t: 'Glass Cannon Clause: any Pokémon that takes a hit above 50% of its max HP dies, even if it survives.', w: 4, tag: 'glass' },
      { t: 'No Evolutions AND no items AND set mode — the unholy trinity, all at once.', w: 5, tag: 'trinity' },
      { t: 'Bank Error: you start with no money and may never sell anything. Marts are decoration.', w: 2, tag: 'broke' },
      { t: 'Permadeath Lines: lose a Pokémon and its ENTIRE evolution family is banned for the rest of the run.', w: 3, tag: 'lineperma' },
      { t: 'Timed Locke: you must defeat the next gym within {N} in-game hours or release your strongest Pokémon.', w: 3, tag: 'timed', dyn: () => ({ N: pick([3, 4, 5]) }) },
    ],
  };
  const INSANE_THEMES = ['Insanity Locke', 'Oblivion Locke', 'Doom Locke', 'Cursed Locke', 'Void Locke', 'Apocalypse Locke', 'Suffering Locke'];

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
    { name: 'INSANITY',  min: 30,  color: '#ff1f5a' },
  ];

  // resolve {N} placeholders and dynamic params
  const realize = (opt) => {
    if (!opt.dyn) return { ...opt };
    const params = opt.dyn();
    let t = opt.t;
    Object.entries(params).forEach(([k, v]) => { t = t.replace('{' + k + '}', v); });
    return { ...opt, t };
  };

  // ---- GLOBAL conflict map: tags that must never co-occur ACROSS the whole ruleset
  // (the per-pool `usedTags` guard only catches same-tag pairs within one category;
  // these are the cross-category / cross-pool contradictions). Symmetric — declared
  // once, applied both ways. A realized rule is dropped if it conflicts with any rule
  // already kept earlier in the resolution order. ---
  const CONFLICTS = {
    // Insanity "trinity" already bundles no-evo + no-items + set mode, so any of those
    // standalone rules would be redundant/contradictory alongside it.
    trinity: ['noevo', 'items', 'set', 'noitemheal', 'held'],
    // a fixed party cap fights rules that force a single living Pokémon
    size: ['solo'],
    solo: ['size', 'rotate', 'lowmember', 'lead', 'onepergym'],
    // banning evolution outright makes trade-evo and the "trinity" evo clause moot
    noevo: ['tradeevo'],
    // two different level constraints that pull opposite directions / duplicate
    cap: ['underlevel'],
    // overlapping "no items" formulations shouldn't stack as separate rules
    items: ['noitemheal'],
    // permadeath-line appears in BOTH the modifier pool and the insanity pool (same
    // tag, different pools) — the per-pool guard can't see across them
    lineperma: ['lineperma'],
    // type-identity rules that contradict each other
    typing: ['typedeath'],
    typedeath: ['typing'],
    // glass-cannon instant-death interacts incoherently with revive mercy
    glass: ['mercy'],
  };
  // build a symmetric lookup so order of declaration doesn't matter
  const conflictsWith = (() => {
    const m = {};
    const add = (a, b) => { (m[a] = m[a] || new Set()).add(b); };
    Object.entries(CONFLICTS).forEach(([k, arr]) => arr.forEach(v => { add(k, v); add(v, k); }));
    return (tagA, tagB) => !!(m[tagA] && m[tagA].has(tagB));
  })();

  // Filter an assembled list of realized rules so none contradict: keep rules in order,
  // dropping any whose tag conflicts with — or duplicates — a tag already kept. Returns
  // the conflict-free list. (Untagged rules never conflict and are always kept.)
  function dedupeConflicts(rules) {
    const keptTags = [];
    const out = [];
    for (const r of rules) {
      const tag = r.tag;
      if (tag) {
        if (keptTags.includes(tag)) continue;                 // exact duplicate tag (cross-pool)
        if (keptTags.some(t => conflictsWith(tag, t))) continue; // contradicts something kept
        keptTags.push(tag);
      }
      out.push(r);
    }
    return out;
  }

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

  function generate(mode) {
    const insane = mode === 'insanity';
    const out = {};
    const all = [];

    // Standard rolls a spread of light→heavy. Insanity always forges the most punishing tier.
    const INTENSITY = insane
      ? { core: [2, 3], mod: [2, 3], extra: 3 }
      : pick([
          { core: [0, 1], mod: [0, 1], extra: 1 }, // light
          { core: [1, 2], mod: [0, 2], extra: 2 }, // medium
          { core: [1, 2], mod: [1, 2], extra: 2 }, // medium-heavy
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

    // Insanity adds 2-4 extreme clauses from the dedicated pool
    out.insane = insane ? pickAddons(INSANE.addons, 2, 4) : [];

    // ---- GLOBAL conflict resolution across ALL categories ----
    // The per-pool guard in pickAddons can't see contradictions that span categories
    // (e.g. a team "party cap" vs an insanity "solo" clause) or the same tag appearing
    // in two different pools. We flatten every chosen rule into one ordered list and
    // run dedupeConflicts so the FINAL ruleset is guaranteed contradiction-free, then
    // rebuild each category from the survivors. Order = priority: the governing
    // encounter/death rules first (always kept), then the scaling categories.
    const order = ['encounter', 'death', 'team', 'battle', 'species', 'modifier', 'insane'];
    const tagged = [];
    order.forEach(k => (out[k] || []).forEach(r => tagged.push({ k, r })));
    const survivors = dedupeConflicts(tagged.map(x => x.r));
    const survivorSet = new Set(survivors); // identity match — realized objects are unique
    order.forEach(k => { out[k] = (out[k] || []).filter(r => survivorSet.has(r)); });

    order.forEach(k => out[k].forEach(r => all.push(r)));

    // difficulty = sum of weights (mercy reduces it). Insanity floors at the top tier.
    let score = all.reduce((s, r) => s + (r.w || 0), 0);
    if (insane) score = Math.max(score, 30);
    const tier = [...TIERS].reverse().find(t => score >= t.min) || TIERS[0];

    // theme
    const theme = insane ? pick(INSANE_THEMES) : (THEMES.find(t => t.when(score, all)) || THEMES[THEMES.length - 1]).name;

    // win/loss conditions reflect chosen rules
    const wipeEnds = all.some(r => r.tag === 'wipe' && /ends the run/.test(r.t));
    const soloOrTypeDeath = all.some(r => r.tag === 'solo' || r.tag === 'typedeath');
    let loss = wipeEnds
      ? 'You black out with no usable Pokémon, OR your entire team is wiped in a single battle.'
      : 'You black out / white out with no usable Pokémon remaining.';
    if (soloOrTypeDeath) loss += ' Any Insanity Clause failure also ends the run instantly.';

    return { theme, tier, score, insane, core: CORE, ...out, win: 'Defeat the Champion and complete the Drapalla League with at least one living Pokémon.', loss };
  }

  window.VIEWS.Nuzlocke = function Nuzlocke() {
    const [run, setRun] = React.useState(null);
    const roll = (mode) => setRun(generate(mode));

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
        <PageHead kicker="CHALLENGE FORGE" title="Nuzlocke Randomizer" sub="One press conjures a complete, hand-checked Nuzlocke ruleset for your next Void run — chaotic and replayable, but always actually beatable. Standard rolls the classics; Insanity goes completely feral." />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: run ? 28 : 60 }}>
          <button onClick={() => roll('standard')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 30px', borderRadius: 14, background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, boxShadow: '0 0 30px #8a5cff55' }}>
            <span style={{ fontSize: 20 }}>🎲</span> Standard Randomizer
          </button>
          <button onClick={() => roll('insanity')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 30px', borderRadius: 14, background: 'linear-gradient(135deg, #b3001b, #ff3b6b)', border: '1px solid #ff6f8f', color: '#fff', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, boxShadow: '0 0 30px #ff1f5a66' }}>
            <span style={{ fontSize: 20 }}>💀</span> Insanity Randomizer
          </button>
        </div>

        {!run ? (
          <div style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#6a6388', maxWidth: 520, margin: '0 auto' }}>
            Hit Randomize to forge a run. You’ll get a themed challenge with a difficulty rating, full rules, and clear win &amp; loss conditions you can follow start to finish.
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
            {run.insane && run.insane.length > 0 && <Section label="☠ Insanity Clauses ☠" color={INSANE.color} rules={run.insane} />}

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
