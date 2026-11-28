/* Chapter 1 challenge rules. One choice per group keeps modifiers compatible. */
window.VNUZLOCKE = (() => {
  const modes = {
    standard: { name: 'Standard', description: 'Core rules with two random modifiers.', count: 2 },
    challenging: { name: 'Challenging', description: 'Three modifiers, including a battle restriction.', count: 3 },
    hardcore: { name: 'Hardcore', description: 'No battle items, a level cap and two extra modifiers.', count: 2 }
  };
  const pools = [
    { id: 'party', title: 'Smaller party', text: 'Carry at most five Pokémon. Keep any other catches in your boxes.' },
    { id: 'held', title: 'No held items', text: 'Your Pokémon may not hold items during battle.' },
    { id: 'rotation', title: 'Rotate after a badge', text: 'After each badge, swap one party member for a living boxed Pokémon if one is available.' },
    { id: 'tms', title: 'No TMs', text: 'Do not teach moves using TMs. HMs and naturally learned moves are allowed.' },
    { id: 'gifts', title: 'Gifts count', text: 'A gift Pokémon uses that area’s encounter. If the area is already used, box the gift and do not use it.' }
  ];
  pools.push(...[
  {
    "id": "berries",
    "title": "Berries only",
    "text": "Only Berries may be held during battle.",
    "group": "held"
  },
  {
    "id": "shop",
    "title": "Live off the land",
    "text": "Do not buy healing or status-curing items. Found items, gifts and Pokémon Centers are allowed.",
    "group": "shop"
  },
  {
    "id": "balls",
    "title": "Back to basics",
    "text": "Use only ordinary Poké Balls for your eligible catches.",
    "group": "balls"
  },
  {
    "id": "lead",
    "title": "Pass the torch",
    "text": "After every trainer battle, move your lead Pokémon to the back of the party. With only one living party member, keep that Pokémon in front.",
    "group": "lead"
  },
  {
    "id": "ace",
    "title": "Rest the ace",
    "text": "Before each trainer battle, box your highest-level Pokémon if you have another living Pokémon available. Break ties yourself. Bring the ace back afterward.",
    "group": "ace"
  },
  {
    "id": "evolution",
    "title": "Late bloomers",
    "text": "Cancel optional level-up evolutions until you earn your first badge. Do not use evolution items before then.",
    "group": "evolution"
  },
  {
    "id": "sync",
    "title": "Natural instincts",
    "text": "Do not activate GeneSync or SyncBreak.",
    "group": "sync"
  },
  {
    "id": "setup",
    "title": "No setting up",
    "text": "Do not choose status moves that raise your own stats. Damaging moves with a secondary boost are allowed.",
    "group": "setup"
  },
  {
    "id": "stab",
    "title": "Off-type attacks",
    "text": "Do not choose damaging moves matching either of the user’s current types. If no usable off-type attack remains, any move is allowed until that battle ends.",
    "group": "stab"
  },
  {
    "id": "recovery",
    "title": "No recovery moves",
    "text": "Do not choose moves that restore the user’s HP. Draining attacks are allowed.",
    "group": "recovery"
  },
  {
    "id": "heals",
    "title": "One emergency heal",
    "text": "Use at most one healing or status-curing Bag item per battle. Catching items do not count.",
    "group": "battle"
  },
  {
    "id": "blind",
    "title": "Trust your instincts",
    "text": "Do not look up an upcoming opponent’s team or moves before fighting them. Your own Pokémon’s information is fair game.",
    "group": "blind"
  },
  {
    "id": "recruit",
    "title": "Newest recruit leads",
    "text": "Lead every trainer battle with your most recently caught living party member. Switching after battle starts is allowed.",
    "group": "lead"
  },
  {
    "id": "retire",
    "title": "Badge retirement",
    "text": "After each badge, permanently retire one surviving Pokémon that fought the leader, but only if another living Pokémon remains.",
    "group": "rotation"
  },
  {
    "id": "three",
    "title": "Three’s company",
    "text": "Carry at most three Pokémon. Box the rest.",
    "group": "party"
  },
  {
    "id": "loyal",
    "title": "Loyal six",
    "text": "Once you fill your party, replace members only after a death. You may still catch and box eligible encounters.",
    "group": "rotation"
  }
]);
  const themes = {
  "classic": {
    "name": "Classic",
    "text": "Any Pokémon may join your team."
  },
  "shiny": {
    "name": "Shiny only",
    "text": "Only shiny Pokémon may join your team. Skip non-shiny encounters; the first eligible shiny in each area is your one catch.",
    "restricted": true,
    "hunt": true
  },
  "anomaly": {
    "name": "Anomaly only",
    "text": "Only anomalous Pokémon may join your team. Skip ordinary encounters; the first eligible anomaly in each area is your one catch.",
    "restricted": true,
    "hunt": true
  },
  "rare": {
    "name": "Rare companions",
    "text": "Use only shiny or anomalous Pokémon. The first eligible rare variant in each area is your one catch; you do not get one of each.",
    "restricted": true,
    "hunt": true
  },
  "unevolved": {
    "name": "Little legends",
    "text": "Use only unevolved Pokémon that can still evolve. Cancel evolutions. Skip fully evolved and single-stage encounters.",
    "restricted": true,
    "exclude": [
      "evolution"
    ]
  },
  "mono": {
    "name": "Type specialist",
    "text": "Choose one type before starting. Only Pokémon with that type are eligible; dual types count. Do not evolve into a form that loses your chosen type.",
    "restricted": true
  },
  "colour": {
    "name": "Colour club",
    "text": "Choose a colour before starting. Use only Pokémon whose current sprite prominently features it. Make your eligibility list in advance, and do not evolve into a form outside it.",
    "restricted": true
  },
  "relay": {
    "name": "Badge relay",
    "text": "After each badge, retire every survivor that fought the leader if you have at least one living reserve. Otherwise keep one survivor until you catch a replacement, then retire it. Retired Pokémon cannot return.",
    "exclude": [
      "rotation"
    ]
  },
  "solo": {
    "name": "Lone survivor",
    "text": "Carry only one Pokémon at a time; you may change your active Pokémon between battles. If it faints, the run ends even if reserves remain.",
    "exclude": [
      "party",
      "rotation",
      "ace",
      "lead"
    ]
  }
};
  const battle = { id: 'battle', title: 'No items during battle', text: 'Do not use Bag items in battle, except Poké Balls for an eligible encounter. Healing outside battle is allowed.' };
  const cap = { id: 'cap', title: 'Gym level cap', text: 'Enter Gym battles at or below the leader’s highest level. Leveling past it during the battle is allowed.' };
  const core = [
    { title: 'One encounter per area', text: 'First eligible wild Pokémon per named area. Miss it and that catch is lost. Skip previously caught species. Forced wild encounters count.' },
    { title: 'Fainting is permanent', text: 'Fainted Pokémon stay boxed forever. A full party wipe ends the run, even with living reserves.' },
    { title: 'Nickname your team', text: 'Give each Pokémon you catch a nickname. Your chosen starter is allowed.' }
  ];
  const difficulties = {
    normal: { name: 'Normal', summary: 'The regular Chapter 1 adventure.', rule: 'Choose Normal difficulty in the game.' },
    hard: { name: 'Hard', summary: 'Stronger trainers. The same world.', rule: 'Choose Hard Mode when starting your adventure and keep it enabled for this challenge. Opposing trainer Pokémon gain two levels (up to the level cap), maximum IVs and 252 EVs in every stat. Wild Pokémon and allied trainers are unchanged.' }
  };
  function generate(mode, random = Math.random, theme = 'classic', difficulty = 'normal') {
    if (!difficulties[difficulty]) difficulty = 'normal';
    if (!modes[mode]) mode = 'standard';
    if (theme === 'surprise') theme = ['classic','unevolved','relay','solo'][Math.floor(random()*4)];
    if (!themes[theme]) theme = 'classic';
    const excluded = new Set(themes[theme].exclude || []);
    if (mode !== 'standard') excluded.add('battle');
    const pool = pools.filter(rule => !excluded.has(rule.group || rule.id));
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const extras = [];
    const groups = new Set();
    for (const rule of pool) {
      const group = rule.group || rule.id;
      if (groups.has(group)) continue;
      groups.add(group); extras.push(rule);
      if (extras.length === 2) break;
    }
    if (mode !== 'standard') extras.unshift(battle);
    if (mode === 'hardcore') extras.unshift({...cap, text: cap.text + ' Use the leader’s level for your selected game difficulty, including Hard Mode’s increase.'});
    return { mode, theme, difficulty, extras };
  }
  function rulesFor(run) {
    const rules = core.map(rule => ({...rule}));
    if (themes[run.theme].restricted) {
      rules[0].text += ' Skip Pokémon outside your theme. No eligible encounter means no catch.';
      rules[2].text = 'Nickname every catch. Keep your starter until your first eligible catch, then retire it unless it fits the theme. Fainting rules apply from the start. Gifts must fit too.';
    }
    return rules;
  }
  const saveKey = 'void_nuzlocke_v1';
  function load(storage) {
    try {
      const saved = JSON.parse(storage.getItem(saveKey));
      if (!saved || saved.version !== 1) return null;
      const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
      if (!has(modes, saved.mode) || !has(difficulties, saved.difficulty) || !(has(themes, saved.theme) || saved.theme === 'surprise')) return null;
      const run = saved.run;
      if (run !== null) {
        if (!run || !has(modes, run.mode) || !has(difficulties, run.difficulty) || !has(themes, run.theme)) return null;
        const count = run.mode === 'hardcore' ? 4 : run.mode === 'challenging' ? 3 : 2;
        if (!Array.isArray(run.extras) || run.extras.length !== count) return null;
        const ids = new Set([...pools, battle, cap].map(rule => rule.id));
        if (new Set(run.extras.map(rule => rule?.id)).size !== count) return null;
        if (run.extras.some(rule => !rule || !ids.has(rule.id) || typeof rule.title !== 'string' || typeof rule.text !== 'string' || rule.title.length > 200 || rule.text.length > 3000)) return null;
      }
      return { mode: saved.mode, difficulty: saved.difficulty, theme: saved.theme, run };
    } catch { return null; }
  }
  function save(storage, state) {
    storage.setItem(saveKey, JSON.stringify({version: 1, ...state}));
  }
  return { modes, core, themes, pools, difficulties, rulesFor, generate, load, save };

})();
