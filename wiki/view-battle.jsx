/* Pokémon Void — Auto-Battle Simulator (Phase 1). window.VIEWS.Battle
   A fully client-side, math-driven 6v6 auto-battler that reads real Void data
   (stats, types, moves, type chart). The AI picks actions by expected value;
   the engine computes real damage (STAB, type eff, crit, accuracy, rolls,
   priority, speed order). Battles render as a turn log + a lightweight 2D
   animated plane with speed controls (1x–20x) and a skip-to-result mode.

   This is Phase 1 of a larger plan: switching + move AI + animation + log.
   Status, weather, abilities, items, bulk sims and analytics come later. */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, TYPES, byDex } = window.VDEX;
  const { MOVES, eff } = window.VGAME;
  const { go, SpriteSlot, PageHead, TypePill, Empty } = window.VUI;

  const STAT_KEYS = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];

  // ---------- passcode gate (Battle Sim only) ----------
  // The Battle Sim is locked behind a passcode while in preview. NOTE: like the
  // rest of a static site, this only hides the feature from normal use — the
  // code ships to the browser, so a determined person can bypass it. We store a
  // hash (not the plaintext code) so a casual "view source" doesn't reveal it.
  const GATE_LS = 'voiddex_battle_unlocked';
  const GATE_HASH = '1igjyhwaulm'; // cyrb53(normalized passcode, seed 7)
  function gateHash(str) {
    let h1 = 0xdeadbeef ^ 7, h2 = 0x41c6ce57 ^ 7;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  const checkPass = (input) => gateHash(String(input).trim().toLowerCase()) === GATE_HASH;
  const isUnlocked = () => { try { return localStorage.getItem(GATE_LS) === '1'; } catch (e) { return false; } };
  const setUnlocked = () => { try { localStorage.setItem(GATE_LS, '1'); } catch (e) {} };

  const flatMoves = MOVES.flat();
  const moveByName = (() => {
    const m = new Map();
    flatMoves.forEach(mv => m.set(mv.name.toLowerCase().replace(/[^a-z0-9]/g, ''), mv));
    return m;
  })();
  const findMove = (name) => moveByName.get(String(name).toLowerCase().replace(/[^a-z0-9]/g, '')) || null;

  // ---------- seeded RNG (deterministic when seeded) ----------
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // names of every move a mon can legally learn (level/TM/egg), deduped.
  // Shared by the manual move-picker and the auto-fill fallback.
  // If `level` is given, level-up moves above that level are excluded (TM/egg
  // moves are always considered learnable). With no level, everything is listed
  // (the manual move-picker shows the full learnset).
  function learnableMovesFor(dex, level) {
    const d = byDex(dex); if (!d) return [];
    const names = [];
    (d.levelMoves || []).forEach(m => {
      const nm = m.name || m; if (!nm) return;
      const lv = m.lv == null ? null : parseInt(m.lv, 10);
      if (level == null || lv == null || isNaN(lv) || lv <= level) names.push(nm);
    });
    ['tmMoves', 'eggMoves'].forEach(s => (d[s] || []).forEach(m => {
      const nm = m.name || m; if (nm) names.push(nm);
    }));
    return Array.from(new Set(names));
  }

  // resolve a list of move *names* into real MOVES objects (pow/cls/type/acc).
  // unknown names are dropped; this is the decode→resolve→battle-stats step.
  function resolveMoves(names) {
    const out = [];
    (names || []).forEach(nm => { const mv = findMove(nm); if (mv && !out.some(o => o.name === mv.name)) out.push(mv); });
    return out;
  }

  // auto-pick the 4 strongest damaging moves a mon can learn by `level`.
  // Build a moveset from the mon's FULL legal learnset (attacks, status, field,
  // and stat moves), weighted so the mix is sensible: damaging moves are favored
  // and at least ~2 are guaranteed so the mon can fight, but status/field/stat
  // moves get a real chance to appear — like a varied competitive movepool.
  // `rng` makes it reproducible from a seed; falls back to Math.random.
  function autoMoves(dex, level, rng) {
    const R = (typeof rng === 'function') ? rng : Math.random;
    const all = resolveMoves(learnableMovesFor(dex, level));
    if (all.length === 0) return [{ name: 'Struggle', type: 'NORMAL', cls: 'Physical', pow: 50, acc: 100, pp: 1 }];

    const isDamaging = (mv) => mv.cls !== 'Status' && typeof mv.pow === 'number' && mv.pow > 0;
    const dmg = all.filter(isDamaging);
    const util = all.filter(mv => !isDamaging(mv)); // status / field / stat moves

    // weight each move: damaging by power (so strong attacks are likelier),
    // utility a flat-but-meaningful weight so it shows up without dominating.
    const weightOf = (mv) => {
      if (isDamaging(mv)) {
        const stab = byDex(dex) && byDex(dex).types.includes(mv.type) ? 1.4 : 1;
        return Math.max(8, mv.pow) * stab; // ~40–200 range
      }
      return 45; // utility move: competes with a mid-power attack
    };
    // weighted sampling without replacement
    const pickWeighted = (poolArr) => {
      const total = poolArr.reduce((s, m) => s + weightOf(m), 0);
      let r = R() * total;
      for (const m of poolArr) { r -= weightOf(m); if (r <= 0) return m; }
      return poolArr[poolArr.length - 1];
    };

    const chosen = [];
    const remaining = all.slice();
    // guarantee up to 2 damaging moves first (so it can always attack), if available
    let guaranteed = Math.min(2, dmg.length);
    while (guaranteed-- > 0) {
      const damPool = remaining.filter(isDamaging);
      if (!damPool.length) break;
      const pick = pickWeighted(damPool);
      chosen.push(pick); remaining.splice(remaining.indexOf(pick), 1);
    }
    // fill the rest by weighted random across EVERYTHING still available
    while (chosen.length < 4 && remaining.length) {
      const pick = pickWeighted(remaining);
      chosen.push(pick); remaining.splice(remaining.indexOf(pick), 1);
    }
    return chosen.slice(0, 4);
  }

  // ---------- status conditions (canonical mechanics) ----------
  // One major status at a time. Codes: BRN PSN TOX PAR SLP FRZ.
  // Type immunities follow standard rules; sleep/freeze gate actions;
  // burn halves PHYSICAL damage; residual damage applies at end of turn.
  const STATUS = {
    label: { BRN: 'burned', PSN: 'poisoned', TOX: 'badly poisoned', PAR: 'paralyzed', SLP: 'asleep', FRZ: 'frozen solid' },
    short: { BRN: 'BRN', PSN: 'PSN', TOX: 'TOX', PAR: 'PAR', SLP: 'SLP', FRZ: 'FRZ' },
    color: { BRN: '#ff7a3c', PSN: '#b25fd1', TOX: '#9b3fb0', PAR: '#ffd23c', SLP: '#9aa0c2', FRZ: '#5fd6ff' },
    // a type that CANNOT receive the given status
    immuneType: { BRN: ['FIRE'], PAR: ['ELECTRIC'], PSN: ['POISON', 'STEEL'], TOX: ['POISON', 'STEEL'], FRZ: ['ICE'], SLP: [] },
    // can the target receive `code`? (already-statused mons can't be re-statused)
    canApply(target, code) {
      if (!target || target.fainted) return false;
      if (target.status) return false;
      const imm = STATUS.immuneType[code] || [];
      if (target.types.some(t => imm.includes(t))) return false;
      if (ABIL.blocksStatus(target, code)) return false; // ability immunity (Insomnia, Limber, etc.)
      return true;
    },
    apply(target, code, rng) {
      target.status = code;
      if (code === 'SLP') target.statusTurns = 1 + Math.floor(rng() * 3); // 1–3 turns asleep
      else target.statusTurns = 0;
      target.toxicN = code === 'TOX' ? 1 : 0;
    },
    clear(target) { target.status = null; target.statusTurns = 0; target.toxicN = 0; },
    // speed after paralysis
    speed(mon) { const s = STAGES.effStat(mon, 'SPE'); return mon.status === 'PAR' ? Math.floor(s * 0.5) : s; },
    // residual end-of-turn damage; returns {dmg, frac} (0 if none)
    residual(mon) {
      if (!mon || mon.fainted) return 0;
      if (mon.status === 'BRN' || mon.status === 'PSN') return Math.max(1, Math.floor(mon.maxHP / 8));
      if (mon.status === 'TOX') return Math.max(1, Math.floor(mon.maxHP * mon.toxicN / 16));
      return 0;
    },
    // burn cuts PHYSICAL damage in half
    burnFactor(mon, move) { return (mon.status === 'BRN' && move.cls === 'Physical') ? 0.5 : 1; },
  };

  // ---------- stat stages (canonical -6..+6) ----------
  // Boosts live on mon.boosts {ATK,DEF,SPA,SPD,SPE,ACC,EVA}. Effective stat =
  // base stat × stage multiplier. ATK/DEF/SPA/SPD/SPE use ×(2+n)/2 for n>=0 and
  // ×2/(2-n) for n<0 (so +1=1.5×, +2=2×, -1=0.667×, -2=0.5×, ... ±6 caps).
  // ACC/EVA use the ×3/(3∓n) table.
  const STAGES = {
    KEYS: ['ATK', 'DEF', 'SPA', 'SPD', 'SPE', 'ACC', 'EVA'],
    fresh() { return { ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0, ACC: 0, EVA: 0 }; },
    clamp(n) { return Math.max(-6, Math.min(6, n)); },
    mult(n) { n = STAGES.clamp(n); return n >= 0 ? (2 + n) / 2 : 2 / (2 - n); },
    accMult(n) { n = STAGES.clamp(n); return n >= 0 ? (3 + n) / 3 : 3 / (3 - n); },
    // effective combat stat for ATK/DEF/SPA/SPD/SPE (not HP)
    effStat(mon, key) {
      const base = mon.stats[key];
      const n = (mon.boosts && mon.boosts[key]) || 0;
      return Math.max(1, Math.floor(base * STAGES.mult(n)));
    },
    // apply a stage change; returns the actual delta applied (0 if already capped).
    // `byOpponent` marks opponent-caused drops (for Defiant etc.).
    apply(mon, key, delta) {
      if (!mon.boosts) mon.boosts = STAGES.fresh();
      const before = mon.boosts[key];
      mon.boosts[key] = STAGES.clamp(before + delta);
      return mon.boosts[key] - before;
    },
    label(key) { return { ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed', ACC: 'accuracy', EVA: 'evasiveness' }[key] || key; },
    phrase(delta) {
      const a = Math.abs(delta);
      if (delta > 0) return a >= 3 ? 'rose drastically' : a === 2 ? 'rose sharply' : 'rose';
      return a >= 3 ? 'fell severely' : a === 2 ? 'harshly fell' : 'fell';
    },
  };

  // move → status it can inflict, with canonical chance + target.
  // Keyed by normalized move name. Moves not listed simply deal damage.
  const normName = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const MOVE_STATUS = (() => {
    const t = {};
    const add = (name, code, chance) => { t[normName(name)] = { code, chance }; };
    // ---- guaranteed primary-status moves (Status class) ----
    add('Will-O-Wisp', 'BRN', 1.0); add('Toxic', 'TOX', 1.0); add('Poison Powder', 'PSN', 1.0);
    add('Poison Gas', 'PSN', 1.0); add('Thunder Wave', 'PAR', 1.0); add('Stun Spore', 'PAR', 1.0);
    add('Glare', 'PAR', 1.0); add('Sleep Powder', 'SLP', 1.0); add('Spore', 'SLP', 1.0);
    add('Hypnosis', 'SLP', 1.0); add('Lovely Kiss', 'SLP', 1.0); add('Sing', 'SLP', 1.0);
    add('Grass Whistle', 'SLP', 1.0); add('Dark Void', 'SLP', 1.0);
    // ---- secondary-chance damaging moves (canonical rates) ----
    add('Nuzzle', 'PAR', 1.0);
    add('Flamethrower', 'BRN', 0.10); add('Fire Blast', 'BRN', 0.10); add('Fire Punch', 'BRN', 0.10);
    add('Flame Wheel', 'BRN', 0.10); add('Flame Charge', 'BRN', 0.10); add('Ember', 'BRN', 0.10);
    add('Heat Wave', 'BRN', 0.10); add('Fire Fang', 'BRN', 0.10); add('Blaze Kick', 'BRN', 0.10);
    add('Scald', 'BRN', 0.30); add('Lava Plume', 'BRN', 0.30); add('Sacred Fire', 'BRN', 0.50);
    add('Inferno', 'BRN', 1.0); add('Searing Shot', 'BRN', 0.30); add('Pyro Ball', 'BRN', 0.10);
    add('Thunderbolt', 'PAR', 0.10); add('Thunder', 'PAR', 0.30); add('Thunder Punch', 'PAR', 0.10);
    add('Thunder Shock', 'PAR', 0.10); add('Spark', 'PAR', 0.30); add('Discharge', 'PAR', 0.30);
    add('Volt Tackle', 'PAR', 0.10); add('Zap Cannon', 'PAR', 1.0); add('Body Slam', 'PAR', 0.30);
    add('Force Palm', 'PAR', 0.30); add('Lick', 'PAR', 0.30); add('Thunder Fang', 'PAR', 0.10);
    add('Dragon Breath', 'PAR', 0.30); add('Bounce', 'PAR', 0.30);
    add('Ice Beam', 'FRZ', 0.10); add('Blizzard', 'FRZ', 0.10); add('Ice Punch', 'FRZ', 0.10);
    add('Ice Fang', 'FRZ', 0.10); add('Powder Snow', 'FRZ', 0.10); add('Freeze-Dry', 'FRZ', 0.10);
    add('Poison Jab', 'PSN', 0.30); add('Sludge Bomb', 'PSN', 0.30); add('Sludge', 'PSN', 0.30);
    add('Sludge Wave', 'PSN', 0.10); add('Gunk Shot', 'PSN', 0.30); add('Poison Sting', 'PSN', 0.30);
    add('Poison Tail', 'PSN', 0.10); add('Poison Fang', 'TOX', 0.50); add('Twineedle', 'PSN', 0.20);
    add('Smog', 'PSN', 0.40); add('Toxic Spikes', 'PSN', 0); // hazard handled later, no direct apply
    return t;
  })();
  // look up a move's status effect, resolving the name against the table
  function moveStatusEffect(move) {
    const e = MOVE_STATUS[normName(move.name)];
    if (!e || !e.chance) return null;
    return e;
  }

  // move → stat-stage change(s). target: 'self' | 'foe'. chance defaults to 1.
  // changes: array of [statKey, delta]. Keyed by normalized move name.
  const MOVE_STAT = (() => {
    const t = {};
    const add = (name, target, changes, chance) => { t[normName(name)] = { target, changes, chance: chance == null ? 1 : chance }; };
    // self-boosting setup
    add('Swords Dance', 'self', [['ATK', 2]]);
    add('Nasty Plot', 'self', [['SPA', 2]]);
    add('Calm Mind', 'self', [['SPA', 1], ['SPD', 1]]);
    add('Dragon Dance', 'self', [['ATK', 1], ['SPE', 1]]);
    add('Bulk Up', 'self', [['ATK', 1], ['DEF', 1]]);
    add('Agility', 'self', [['SPE', 2]]);
    add('Rock Polish', 'self', [['SPE', 2]]);
    add('Iron Defense', 'self', [['DEF', 2]]);
    add('Amnesia', 'self', [['SPD', 2]]);
    add('Cosmic Power', 'self', [['DEF', 1], ['SPD', 1]]);
    add('Quiver Dance', 'self', [['SPA', 1], ['SPD', 1], ['SPE', 1]]);
    add('Shell Smash', 'self', [['ATK', 2], ['SPA', 2], ['SPE', 2], ['DEF', -1], ['SPD', -1]]);
    add('Work Up', 'self', [['ATK', 1], ['SPA', 1]]);
    add('Howl', 'self', [['ATK', 1]]);
    add('Defense Curl', 'self', [['DEF', 1]]);
    add('Harden', 'self', [['DEF', 1]]);
    add('Withdraw', 'self', [['DEF', 1]]);
    add('Sharpen', 'self', [['ATK', 1]]);
    add('Double Team', 'self', [['EVA', 1]]);
    add('Minimize', 'self', [['EVA', 2]]);
    add('Nasty Plot', 'self', [['SPA', 2]]);
    add('Hone Claws', 'self', [['ATK', 1], ['ACC', 1]]);
    add('Coil', 'self', [['ATK', 1], ['DEF', 1], ['ACC', 1]]);
    // foe-lowering
    add('Growl', 'foe', [['ATK', -1]]);
    add('Leer', 'foe', [['DEF', -1]]);
    add('Tail Whip', 'foe', [['DEF', -1]]);
    add('String Shot', 'foe', [['SPE', -1]]);
    add('Scary Face', 'foe', [['SPE', -2]]);
    add('Cotton Spore', 'foe', [['SPE', -2]]);
    add('Charm', 'foe', [['ATK', -2]]);
    add('Feather Dance', 'foe', [['ATK', -2]]);
    add('Screech', 'foe', [['DEF', -2]]);
    add('Metal Sound', 'foe', [['SPD', -2]]);
    add('Fake Tears', 'foe', [['SPD', -2]]);
    add('Sand Attack', 'foe', [['ACC', -1]]);
    add('Smokescreen', 'foe', [['ACC', -1]]);
    add('Flash', 'foe', [['ACC', -1]]);
    add('Sweet Scent', 'foe', [['EVA', -2]]);
    return t;
  })();
  function moveStatEffect(move) { return MOVE_STAT[normName(move.name)] || null; }

  // moves that make the user faint after dealing damage (canonical self-KO).
  const SELF_KO = new Set(['explosion', 'selfdestruct', 'mistyexplosion'].map(normName));
  const isSelfKO = (move) => SELF_KO.has(normName(move.name));

  // ---------- FIELD: weather / terrain / hazards (canonical) ----------
  // Field state lives on the battle: { weather:{kind,turns}, terrain:{kind,turns},
  // hazards:{A:{...},B:{...}} }. All durations are 5 turns (no item extension yet).
  const FIELD = {
    // ---- weather ----
    WEATHER: { SUN: 'harsh sunlight', RAIN: 'rain', SAND: 'a sandstorm', HAIL: 'hail/snow' },
    // damage multiplier on a move from current weather (Fire/Water under sun/rain)
    weatherDamage(weatherKind, moveType) {
      if (weatherKind === 'SUN') { if (moveType === 'FIRE') return 1.5; if (moveType === 'WATER') return 0.5; }
      if (weatherKind === 'RAIN') { if (moveType === 'WATER') return 1.5; if (moveType === 'FIRE') return 0.5; }
      return 1;
    },
    // a type immune to sandstorm chip
    sandImmuneType(types) { return types.some(t => t === 'ROCK' || t === 'GROUND' || t === 'STEEL'); },
    // weather is suppressed if any active mon has Cloud Nine / Air Lock
    weatherActive(battle, A, B, ai, bi) {
      if (!battle.weather.kind) return null;
      const negate = (m) => m && (ABIL.has(m, 'Cloud Nine') || ABIL.has(m, 'Air lock') || ABIL.has(m, 'Air Lock'));
      if (negate(A[ai]) || negate(B[bi])) return null;
      return battle.weather.kind;
    },
    // ---- terrain ----
    TERRAIN: { GRASSY: 'Grassy Terrain', ELECTRIC: 'Electric Terrain', MISTY: 'Misty Terrain', PSYCHIC: 'Psychic Terrain' },
    // terrain boosts a grounded user's matching-type move (×1.3); Misty halves Dragon
    terrainDamage(terrainKind, moveType, grounded) {
      if (!grounded) return 1;
      if (terrainKind === 'GRASSY' && moveType === 'GRASS') return 1.3;
      if (terrainKind === 'ELECTRIC' && moveType === 'ELECTRIC') return 1.3;
      if (terrainKind === 'PSYCHIC' && moveType === 'PSYCHIC') return 1.3;
      if (terrainKind === 'MISTY' && moveType === 'DRAGON') return 0.5;
      return 1;
    },
    grounded(mon) { return !mon.types.includes('FLYING') && !ABIL.has(mon, 'Levitate'); },
    // ---- hazards (per receiving side) ----
    freshHazards() { return { rock: false, spikes: 0, toxic: 0, web: false }; },
    // damage + effects to a mon switching in onto `hz`; returns {dmg, lines, statusApply, speedDrop}
    hazardEntry(mon, hz) {
      const out = { dmg: 0, lines: [], status: null, speedDrop: false };
      if (ABIL.has(mon, 'Aerobatics')) return out; // immune to hazards (custom)
      const g = FIELD.grounded(mon);
      if (hz.rock) {
        // Stealth Rock: damage scaled by Rock effectiveness vs the mon's types
        const mult = mon.types.reduce((m, t) => m * eff('ROCK', t), 1);
        const frac = (1 / 8) * mult;
        out.dmg += Math.max(1, Math.floor(mon.maxHP * frac));
        out.lines.push(`Pointed stones dug into ${mon.name}!`);
      }
      if (g && hz.spikes > 0) {
        const frac = [0, 1 / 8, 1 / 6, 1 / 4][Math.min(3, hz.spikes)];
        out.dmg += Math.max(1, Math.floor(mon.maxHP * frac));
        out.lines.push(`${mon.name} was hurt by spikes!`);
      }
      if (g && hz.toxic > 0 && !mon.status) {
        // grounded Poison-types absorb toxic spikes (canonical); Steel/immune skip
        if (mon.types.includes('POISON')) { hz.toxic = 0; out.lines.push(`The poison spikes dissolved!`); }
        else if (STATUS.canApply(mon, hz.toxic >= 2 ? 'TOX' : 'PSN')) { out.status = hz.toxic >= 2 ? 'TOX' : 'PSN'; }
      }
      if (g && hz.web) { out.speedDrop = true; out.lines.push(`${mon.name} was caught in a sticky web!`); }
      return out;
    },
  };

  // move → field effect it sets. target: 'weather'|'terrain'|'hazardFoe'
  const MOVE_FIELD = (() => {
    const t = {};
    const w = (n, k) => { t[normName(n)] = { kind: 'weather', val: k }; };
    const tr = (n, k) => { t[normName(n)] = { kind: 'terrain', val: k }; };
    const hz = (n, k) => { t[normName(n)] = { kind: 'hazard', val: k }; };
    w('Sunny Day', 'SUN'); w('Rain Dance', 'RAIN'); w('Sandstorm', 'SAND'); w('Hail', 'HAIL'); w('Snowscape', 'HAIL');
    tr('Grassy Terrain', 'GRASSY'); tr('Electric Terrain', 'ELECTRIC'); tr('Misty Terrain', 'MISTY'); tr('Psychic Terrain', 'PSYCHIC');
    hz('Stealth Rock', 'rock'); hz('Spikes', 'spikes'); hz('Toxic Spikes', 'toxic'); hz('Sticky Web', 'web');
    return t;
  })();
  const moveFieldEffect = (move) => MOVE_FIELD[normName(move.name)] || null;

  // ---------- abilities (this increment: stat-stage family) ----------
  // Only abilities fully expressible with current systems are active; others
  // are recognized by name but no-op until their systems exist.
  const ABIL = {
    has(mon, name) { return mon.ability && normName(mon.ability) === normName(name); },
    // is `name` one we actively simulate?
    active: new Set(['intimidate', 'moxie', 'defiant'].map(normName)),
    isActive(name) { return name && ABIL.active.has(normName(name)); },
    // the abilities this mon can switch between via Sync Band (listed + hidden, deduped)
    pool(mon) { return (mon.abilityPool && mon.abilityPool.length) ? mon.abilityPool : (mon.ability ? [mon.ability] : []); },
    // Sync Band: pick the best ability for THIS turn from the pool.
    // Intimidate only matters on switch-in (handled there), so for an in-place
    // turn the useful proactive pick is Moxie (if we might KO) or Defiant
    // (if the foe might lower our stats). We keep it simple and safe: prefer an
    // active ability over an inert one; among active, prefer Moxie when the foe
    // is low (likely KO), else keep the current ability. Returns a name or null.
    syncChoice(mon, foe) {
      const opts = ABIL.pool(mon).filter(a => ABIL.isActive(a));
      if (opts.length === 0) return null; // nothing simulated to switch to
      const cur = mon.ability;
      // if foe looks KO-able this turn, Moxie is the value pick
      const foeLow = foe && !foe.fainted && (foe.hp / foe.maxHP) <= 0.45;
      if (foeLow && opts.some(a => normName(a) === normName('Moxie')) && !ABIL.has(mon, 'Moxie')) return 'Moxie';
      // otherwise no clearly-better in-place swap; stay put
      return null;
    },

    // ---- damage multipliers from the ATTACKER's ability ----
    // returns a multiplier on outgoing damage for this move.
    attackMult(attacker, defender, move, te) {
      let m = 1;
      const t = move.type, lowHP = attacker.hp <= attacker.maxHP / 3;
      // pinch abilities: ×1.5 to their type when below 1/3 HP
      if (lowHP && t === 'GRASS' && ABIL.has(attacker, 'Overgrow')) m *= 1.5;
      if (lowHP && t === 'FIRE' && ABIL.has(attacker, 'Blaze')) m *= 1.5;
      if (lowHP && t === 'WATER' && ABIL.has(attacker, 'Torrent')) m *= 1.5;
      if (lowHP && t === 'BUG' && ABIL.has(attacker, 'Swarm')) m *= 1.5;
      // type-power abilities
      if (t === 'FIRE' && (ABIL.has(attacker, 'Burning Hot') || ABIL.has(attacker, 'Solar Power'))) m *= 1.5;
      if (t === 'STEEL' && ABIL.has(attacker, 'Steely Spirit')) m *= 1.5;
      // move-property abilities
      if (move.pow && move.pow <= 60 && ABIL.has(attacker, 'Technician')) m *= 1.5;
      if (te > 1 && (ABIL.has(attacker, 'Tinted Lens') || ABIL.has(attacker, 'Tinted Lense'))) m *= 1; // tinted lens boosts NOT-very-effective; handled below
      if (te > 0 && te < 1 && (ABIL.has(attacker, 'Tinted Lens') || ABIL.has(attacker, 'Tinted Lense'))) m *= 2;
      if (ABIL.has(attacker, 'Reckless') && /recoil|take down|double edge|head smash|brave bird|flare blitz|wood hammer|submission/i.test(move.name)) m *= 1.2;
      return m;
    },
    // STAB multiplier override: Adaptability makes STAB ×2 instead of ×1.5
    stabFor(attacker, move) {
      const isStab = attacker.types.includes(move.type);
      if (!isStab) return 1;
      return (ABIL.has(attacker, 'Adaptability') || ABIL.has(attacker, 'Adaptablility')) ? 2 : 1.5;
    },
    // ---- damage multipliers from the DEFENDER's ability ----
    defendMult(defender, move, te) {
      let m = 1;
      const t = move.type;
      if ((t === 'FIRE' || t === 'ICE') && ABIL.has(defender, 'Thick Fat')) m *= 0.5;
      if (t === 'FIRE' && ABIL.has(defender, 'Heatproof')) m *= 0.5;
      if (move.cls === 'Physical' && ABIL.has(defender, 'Fur Coat')) m *= 0.5;
      // Fluffy: halves contact (approx: physical) damage, doubles Fire damage taken
      if (ABIL.has(defender, 'Fluffy')) { if (move.cls === 'Physical') m *= 0.5; if (t === 'FIRE') m *= 2; }
      if (te > 1 && (ABIL.has(defender, 'Solid Rock') || ABIL.has(defender, 'Filter'))) m *= 0.75;
      return m;
    },
    // crit multiplier override: Sniper makes crits hit harder
    critMultFor(attacker, isCrit) { if (!isCrit) return 1; return ABIL.has(attacker, 'Sniper') ? 2.25 : 1.5; },
    // ---- type immunity / absorption (checked before damage) ----
    // returns null (no immunity) or {heal: bool, line: string}
    immune(defender, move) {
      const t = move.type;
      if (move.cls === 'Status') return null;
      if (t === 'FIRE' && ABIL.has(defender, 'Flash Fire')) return { heal: false, line: `${defender.name}'s Flash Fire absorbed the flames!` };
      if (t === 'ELECTRIC' && (ABIL.has(defender, 'Volt Absorb') || ABIL.has(defender, 'Lightning Rod') || ABIL.has(defender, 'Motor Drive'))) return { heal: ABIL.has(defender, 'Volt Absorb'), line: `${defender.name} absorbed the electricity!` };
      if (t === 'WATER' && (ABIL.has(defender, 'Water Absorb') || ABIL.has(defender, 'Storm Drain') || ABIL.has(defender, 'Dry Skin'))) return { heal: ABIL.has(defender, 'Water Absorb') || ABIL.has(defender, 'Dry Skin'), line: `${defender.name} absorbed the water!` };
      if (t === 'GRASS' && ABIL.has(defender, 'Sap Sipper')) return { heal: false, line: `${defender.name}'s Sap Sipper blocked the move!` };
      if (t === 'GROUND' && ABIL.has(defender, 'Levitate')) return { heal: false, line: `${defender.name} is unaffected — it's floating with Levitate!` };
      return null;
    },
    // status-immunity passives: can this status be applied given the mon's ability?
    blocksStatus(mon, code) {
      if ((code === 'SLP') && (ABIL.has(mon, 'Insomnia') || ABIL.has(mon, 'Vital Spirit') || ABIL.has(mon, 'Sweet Veil'))) return true;
      if ((code === 'BRN') && ABIL.has(mon, 'Water Veil')) return true;
      if ((code === 'FRZ') && ABIL.has(mon, 'Magma Armor')) return true;
      if ((code === 'PAR') && ABIL.has(mon, 'Limber')) return true;
      if ((code === 'PSN' || code === 'TOX') && (ABIL.has(mon, 'Immunity') || ABIL.has(mon, 'Pastel Veil'))) return true;
      if (ABIL.has(mon, 'Purifying Salt')) return true; // immune to all status
      return false;
    },
  };


  // Level 50, neutral nature, no EV/IV in Phase 1.
  // moveNames (optional): explicit moveset (manual pick or imported share code).
  //   When omitted/empty, auto-pick the 4 strongest damaging moves (random teams).
  function buildMon(dex, level, moveNames, rng) {
    const d = byDex(dex);
    if (!d) return null;
    // coerce level defensively: only a finite 1–100 number is valid, else 50.
    let L = Number(level);
    if (!Number.isFinite(L)) L = 50;
    L = Math.max(1, Math.min(100, Math.round(L)));
    const calc = (base, isHP) => isHP
      ? Math.floor((2 * base * L) / 100) + L + 10
      : Math.floor((2 * base * L) / 100) + 5;
    const stats = {};
    STAT_KEYS.forEach(k => { stats[k] = calc(d.stats[k], k === 'HP'); });
    let moves;
    if (moveNames && moveNames.length) {
      // explicit moveset (manual pick / import) is respected as-is, no level cap
      moves = resolveMoves(moveNames).slice(0, 4);
      if (moves.length === 0) moves = autoMoves(dex, L, rng); // import had only unknown moves
    } else {
      moves = autoMoves(dex, L, rng); // random/auto path: moves limited to what's learned by L
    }
    return {
      dex: d.dex, name: d.name, types: d.types.slice(), level: L,
      maxHP: stats.HP, hp: stats.HP, stats, moves,
      fainted: false,
      status: null, statusTurns: 0, toxicN: 0,
      ability: (d.abilities && d.abilities[0]) || null,
      abilityPool: Array.from(new Set([...(d.abilities || []), ...(d.hidden ? [d.hidden] : [])])),
      item: null,            // held item (e.g. 'Sync Band'); none by default
      syncUsedTurn: -1,      // last turn Sync Band was used (once-per-turn limit)
      boosts: STAGES.fresh(),
    };
  }

  // build a full team (array of battlers) from share-code members:
  //   [ { dex:'006', moves:['Flamethrower', ...] }, ... ]
  function buildFromMembers(members) {
    return (members || [])
      .map(m => buildMon(m.dex, 50, m.moves))
      .filter(Boolean)
      .slice(0, 6);
  }

  // decode a VT2…/VTEAM1 share code into members, reusing the Team Builder's
  // codec when it's loaded; falls back to a self-contained VT2 parser so the
  // Battle Sim works even if view-team.jsx isn't present on the page.
  function decodeShareCode(code) {
    const G = window.VGAME;
    if (window.VTEAM && typeof window.VTEAM.decodeTeam === 'function') {
      return window.VTEAM.decodeTeam(code);
    }
    try {
      const raw = String(code).trim();
      const padDex = (n) => String(n).padStart(3, '0');
      if (raw.startsWith('VT2~')) {
        const body = raw.slice(4);
        const sep = body.indexOf('~');
        const name = sep >= 0 ? body.slice(0, sep) : 'Imported Team';
        const rest = sep >= 0 ? body.slice(sep + 1) : '';
        const parseIds = (str) => {
          const out = []; let i = 0;
          while (i < str.length && out.length < 4) {
            if (str[i] === '<') { const end = str.indexOf('>', i); if (end === -1) break; out.push(str.slice(i + 1, end)); i = end + 1; }
            else { const nm = G.idToMove(str.slice(i, i + 2)); if (nm) out.push(nm); i += 2; }
          }
          return out;
        };
        const members = rest ? rest.split(';').filter(Boolean).slice(0, 6).map(seg => {
          const dot = seg.indexOf('.');
          const dexRaw = dot >= 0 ? seg.slice(0, dot) : seg;
          const movesStr = dot >= 0 ? seg.slice(dot + 1) : '';
          return { dex: padDex(parseInt(dexRaw, 36)), moves: parseIds(movesStr) };
        }) : [];
        return { id: 'L' + Date.now(), name: name || 'Imported Team', members };
      }
      if (raw.startsWith('VTEAM1')) {
        const d = JSON.parse(decodeURIComponent(escape(atob(raw.slice(6)))));
        if (!d || !Array.isArray(d.m)) return null;
        return { id: 'L' + Date.now(), name: typeof d.n === 'string' ? d.n : 'Imported Team', members: d.m.slice(0, 6).map(x => ({ dex: String(x[0]), moves: Array.isArray(x[1]) ? x[1].slice(0, 4) : [] })) };
      }
      return null;
    } catch (e) { return null; }
  }

  // a random legal team of N distinct mons
  function randomTeam(n, rng, level) {
    const pool = DEX.filter(d => !d.undiscovered && d.stats.HP > 0);
    const chosen = [];
    const used = new Set();
    while (chosen.length < n && used.size < pool.length) {
      const d = pool[Math.floor(rng() * pool.length)];
      if (used.has(d.dex)) continue;
      used.add(d.dex);
      chosen.push(buildMon(d.dex, level || 50, null, rng));
    }
    return chosen;
  }

  // ---------- damage calc ----------
  function typeMult(moveType, defTypes) {
    return defTypes.reduce((m, t) => m * eff(moveType, t), 1);
  }
  function computeDamage(attacker, defender, move, rng, fieldCtx) {
    if (move.cls === 'Status' || !move.pow) return { dmg: 0, eff: 1, crit: false, missed: false };
    // ability-based type immunity / absorption (before accuracy/damage)
    const imm = ABIL.immune(defender, move);
    if (imm) return { dmg: 0, eff: 0, crit: false, missed: false, immune: true, immuneInfo: imm };
    // accuracy — modified by the attacker's ACC and defender's EVA stages
    {
      const accStage = ((attacker.boosts && attacker.boosts.ACC) || 0) - ((defender.boosts && defender.boosts.EVA) || 0);
      const baseAcc = (typeof move.acc === 'number' && move.acc > 0) ? move.acc : 100;
      if (baseAcc < 100 || accStage !== 0) {
        const effAcc = baseAcc * STAGES.accMult(accStage);
        if (rng() * 100 >= effAcc) return { dmg: 0, eff: 1, crit: false, missed: true };
      }
    }
    const atkStat = move.cls === 'Physical' ? STAGES.effStat(attacker, 'ATK') : STAGES.effStat(attacker, 'SPA');
    const defStat = move.cls === 'Physical' ? STAGES.effStat(defender, 'DEF') : STAGES.effStat(defender, 'SPD');
    const L = attacker.level;
    let base = Math.floor(Math.floor((Math.floor((2 * L) / 5) + 2) * move.pow * atkStat / defStat) / 50) + 2;
    const stab = ABIL.stabFor(attacker, move);
    const te = typeMult(move.type, defender.types);
    const crit = rng() < (1 / 16);
    const critMult = ABIL.critMultFor(attacker, crit);
    const roll = 0.85 + rng() * 0.15; // 0.85–1.00
    // Phase 1 uses no EV/IV investment, which makes frail mons extremely glassy.
    // A modest scalar lengthens battles so switching and matchups actually matter.
    const SCALE = 0.6;
    const burn = STATUS.burnFactor(attacker, move); // burned attacker: physical ×0.5
    // weather + terrain multipliers (fieldCtx = {weather, terrain})
    let wmult = 1, tmult = 1;
    if (fieldCtx) {
      if (fieldCtx.weather) wmult = FIELD.weatherDamage(fieldCtx.weather, move.type);
      if (fieldCtx.terrain) tmult = FIELD.terrainDamage(fieldCtx.terrain, move.type, FIELD.grounded(attacker));
    }
    const aMult = ABIL.attackMult(attacker, defender, move, te);
    const dMult = ABIL.defendMult(defender, move, te);
    let dmg = Math.floor(base * stab * te * critMult * roll * SCALE * burn * wmult * tmult * aMult * dMult);
    if (te > 0) dmg = Math.max(1, dmg);
    return { dmg, eff: te, crit, missed: false };
  }

  // ---------- AI: score each move by expected value ----------
  function bestMove(attacker, defender, ctx) {
    const cx = ctx || {};
    let best = null, bestScore = -1;
    attacker.moves.forEach(move => {
      let score;
      if (move.cls === 'Status' || !move.pow) {
        // value a status move only if it would actually land something useful:
        // foe must be statusable and not immune; otherwise it's near-useless.
        const eff2 = moveStatusEffect(move);
        const stat2 = moveStatEffect(move);
        if (eff2 && STATUS.canApply(defender, eff2.code)) {
          // crippling statuses (PAR/SLP/TOX/BRN) are worth more than a chip move
          const weight = { SLP: 30, PAR: 26, TOX: 24, BRN: 20, FRZ: 22, PSN: 14 }[eff2.code] || 12;
          score = weight * eff2.chance;
        } else if (stat2) {
          // if every stat this move changes is already capped in the intended
          // direction, the move does nothing — never loop on it.
          const capped = stat2.changes.every(([k, d]) => {
            const who = stat2.target === 'self' ? attacker : defender;
            const cur = (who.boosts && who.boosts[k]) || 0;
            return d > 0 ? cur >= 6 : cur <= -6;
          });
          if (capped) { score = 0.3; }
          else if (stat2.target === 'self') {
            // worth more when healthy and not already heavily boosted; near-useless at low HP
            const hpFrac = attacker.hp / attacker.maxHP;
            const boostSum = STAGES.KEYS.reduce((s, k) => s + Math.max(0, (attacker.boosts && attacker.boosts[k]) || 0), 0);
            const totalUp = stat2.changes.reduce((s, c) => s + (c[1] > 0 ? c[1] : 0), 0);
            // strong incentive to set up once while healthy & unboosted; falls off
            // sharply once boosted (boostSum grows) or at low HP, so it won't loop.
            if (hpFrac > 0.55 && boostSum < 2) score = 55 + totalUp * 6;
            else if (hpFrac > 0.5 && boostSum < 4) score = 22 + totalUp * 3;
            else score = 3;
          } else {
            // lowering the foe: mild value, more if it isn't already dropped
            const cur = stat2.changes.reduce((s, c) => s + Math.abs((defender.boosts && defender.boosts[c[0]]) || 0), 0);
            score = cur < 4 ? 11 : 3;
          }
          score *= (stat2.chance == null ? 1 : stat2.chance);
        } else if (moveFieldEffect(move)) {
          const fld = moveFieldEffect(move);
          const hpFrac = attacker.hp / attacker.maxHP;
          // base tempo value; only worth it while healthy
          if (hpFrac <= 0.5) { score = 4; }
          else if (fld.kind === 'hazard') {
            // hazards pay off across the foe's remaining bench; near-useless if already set or foe nearly out of mons
            const already = cx.hazardsOnFoe && (
              (fld.val === 'rock' && cx.hazardsOnFoe.rock) ||
              (fld.val === 'spikes' && cx.hazardsOnFoe.spikes >= 3) ||
              (fld.val === 'toxic' && cx.hazardsOnFoe.toxic >= 2) ||
              (fld.val === 'web' && cx.hazardsOnFoe.web));
            const bench = cx.foeBench == null ? 5 : cx.foeBench;
            score = already ? 0.5 : (bench >= 3 ? 95 : bench >= 1 ? 45 : 6);
          } else if (fld.kind === 'weather') {
            // setting weather is strong if not already that weather (esp. if we benefit)
            score = (cx.weather === fld.val) ? 0.5 : 70;
          } else { // terrain
            score = (cx.terrain === fld.val) ? 0.5 : 60;
          }
        } else {
          // a Status move with no effect the engine actually models (e.g. confusion,
          // Acupressure once capped) does nothing — never prefer it over attacking.
          score = 0.3;
        }
      } else {
        const te = typeMult(move.type, defender.types);
        const stab = attacker.types.includes(move.type) ? 1.5 : 1;
        const atkStat = move.cls === 'Physical' ? STAGES.effStat(attacker, 'ATK') : STAGES.effStat(attacker, 'SPA');
        const defStat = move.cls === 'Physical' ? STAGES.effStat(defender, 'DEF') : STAGES.effStat(defender, 'SPD');
        // expected damage proxy
        const exp = move.pow * stab * te * (atkStat / defStat) * ((move.acc || 100) / 100);
        score = exp;
        // bonus for a likely KO
        if (te > 0) {
          const approx = computeDamageAvg(attacker, defender, move);
          if (approx >= defender.hp) score *= 1.6;
        }
        if (te === 0) score = 0.1;
        // self-KO moves cost you the user — only worth it as a trade. Value them
        // only when they'd KO the foe (or the user is nearly dead anyway); else
        // make them a near-last resort so the AI doesn't suicide for nothing.
        if (isSelfKO(move)) {
          const approx = computeDamageAvg(attacker, defender, move);
          const securesKO = te > 0 && approx >= defender.hp;
          const nearlyDead = attacker.hp <= attacker.maxHP * 0.25;
          score = (securesKO || nearlyDead) ? score * 0.9 : 0.2;
        }
      }
      if (score > bestScore) { bestScore = score; best = move; }
    });
    return best || attacker.moves[0];
  }
  // non-random average damage for AI estimation
  function computeDamageAvg(attacker, defender, move) {
    if (move.cls === 'Status' || !move.pow) return 0;
    const atkStat = move.cls === 'Physical' ? STAGES.effStat(attacker, 'ATK') : STAGES.effStat(attacker, 'SPA');
    const defStat = move.cls === 'Physical' ? STAGES.effStat(defender, 'DEF') : STAGES.effStat(defender, 'SPD');
    const L = attacker.level;
    const base = Math.floor(Math.floor((Math.floor((2 * L) / 5) + 2) * move.pow * atkStat / defStat) / 50) + 2;
    const stab = attacker.types.includes(move.type) ? 1.5 : 1;
    const te = typeMult(move.type, defender.types);
    return Math.floor(base * stab * te * 0.925 * 0.6 * STATUS.burnFactor(attacker, move));
  }

  // AI switch decision: if the active mon is in deep type trouble and a much
  // better matchup is on the bench, consider switching (basic revenge/pivot).
  // `recentlySwitched` blocks an immediate re-switch (prevents infinite pivot loops).
  function shouldSwitch(team, activeIdx, foe, rng, recentlySwitched) {
    const active = team[activeIdx];
    if (active.fainted) return pickNextAlive(team, activeIdx);
    if (recentlySwitched) return -1; // just came in — commit to at least one action
    // how bad is the foe's best hit on us, defensively
    const foeBest = bestMove(foe, active);
    const incoming = computeDamageAvg(foe, active, foeBest);
    const inDanger = incoming >= active.hp * 0.8; // likely to be KO'd
    if (!inDanger) return -1;
    // find a benched mon that resists the foe and can hit back hard
    let bestBench = -1, bestVal = 0;
    team.forEach((m, i) => {
      if (i === activeIdx || m.fainted) return;
      const takes = computeDamageAvg(foe, m, bestMove(foe, m));
      const deals = computeDamageAvg(m, foe, bestMove(m, foe));
      const val = deals - takes;
      if (val > bestVal) { bestVal = val; bestBench = i; }
    });
    // only switch if a bench mon is clearly better than staying in
    return bestVal > active.hp ? bestBench : -1;
  }
  function pickNextAlive(team, fromIdx) {
    for (let i = 0; i < team.length; i++) if (!team[i].fainted) return i;
    return -1;
  }

  // ---------- the battle simulation: returns a list of events ----------
  function simulate(teamA, teamB, seedNum) {
    const rng = mulberry32(seedNum || (Math.random() * 1e9) | 0);
    // deep-clone teams so the originals aren't mutated (fresh boosts per battle)
    const A = teamA.map(m => ({ ...m, stats: { ...m.stats }, moves: m.moves.slice(), hp: m.maxHP, fainted: false, status: null, statusTurns: 0, toxicN: 0, boosts: STAGES.fresh(), syncUsedTurn: -1, abilityPool: (m.abilityPool || []).slice() }));
    const B = teamB.map(m => ({ ...m, stats: { ...m.stats }, moves: m.moves.slice(), hp: m.maxHP, fainted: false, status: null, statusTurns: 0, toxicN: 0, boosts: STAGES.fresh(), syncUsedTurn: -1, abilityPool: (m.abilityPool || []).slice() }));
    let ai = 0, bi = 0; // active indices
    const events = [];
    const log = [];

    // apply a list of [stat,delta] changes to `mon`; emit events/log; handle
    // Defiant (opponent-caused drop → +2 Atk). `byOpp` = change came from the foe.
    const applyStatChanges = (mon, side, changes, byOpp) => {
      let anyDrop = false;
      changes.forEach(([k, d]) => {
        const applied = STAGES.apply(mon, k, d);
        if (applied !== 0) {
          events.push({ t: 'stat', side, name: mon.name, stat: k, delta: applied, boostsOf: snapshotBoosts(A, B) });
          log.push(`${mon.name}'s ${STAGES.label(k)} ${STAGES.phrase(applied)}!`);
          if (d < 0 && byOpp) anyDrop = true;
        }
      });
      // Defiant: a stat lowered by the opponent → +2 Attack
      if (anyDrop && ABIL.has(mon, 'Defiant')) {
        const a = STAGES.apply(mon, 'ATK', 2);
        if (a !== 0) {
          events.push({ t: 'ability', side, name: mon.name, ability: 'Defiant', boostsOf: snapshotBoosts(A, B) });
          events.push({ t: 'stat', side, name: mon.name, stat: 'ATK', delta: a, boostsOf: snapshotBoosts(A, B) });
          log.push(`${mon.name}'s Defiant sharply raised its Attack!`);
        }
      }
    };

    // Intimidate: on entry, lower the current opposing active mon's Attack by 1.
    const doIntimidate = (mon, side, foe, foeSide) => {
      if (!ABIL.has(mon, 'Intimidate') || !foe || foe.fainted) return;
      events.push({ t: 'ability', side, name: mon.name, ability: 'Intimidate', boostsOf: snapshotBoosts(A, B) });
      log.push(`${mon.name}'s Intimidate cuts the foe's Attack!`);
      applyStatChanges(foe, foeSide, [['ATK', -1]], true); // byOpp → triggers foe's Defiant
    };

    let turn = 0, guard = 0;
    let lastTotHP = -1, noProgress = 0; // dynamic stall detection
    const lastSwitchTurn = { A: -5, B: -5 }; // for anti-pivot-loop guard
    const field = { weather: { kind: null, turns: 0 }, terrain: { kind: null, turns: 0 }, hazards: { A: FIELD.freshHazards(), B: FIELD.freshHazards() } };
    // weather currently in effect (null if suppressed by Cloud Nine/Air Lock)
    const curWeather = () => FIELD.weatherActive(field, A, B, ai, bi);
    // apply a mon's weather/terrain-setting ability on entry
    const weatherAbility = (mon, side) => {
      const set = (k) => { if (field.weather.kind !== k) { field.weather = { kind: k, turns: 5 }; events.push({ t: 'weather', kind: k, by: mon.name, side }); log.push(`${mon.name} whipped up ${FIELD.WEATHER[k]}!`); } };
      if (ABIL.has(mon, 'Drought')) set('SUN');
      else if (ABIL.has(mon, 'Drizzle')) set('RAIN');
      else if (ABIL.has(mon, 'Sand Stream') || ABIL.has(mon, 'Sand Spit')) set('SAND');
      else if (ABIL.has(mon, 'Snow Warning')) set('HAIL');
      const setT = (k) => { if (field.terrain.kind !== k) { field.terrain = { kind: k, turns: 5 }; events.push({ t: 'terrain', kind: k, by: mon.name, side }); log.push(`${mon.name} set ${FIELD.TERRAIN[k]}!`); } };
      if (ABIL.has(mon, 'Electric Surge')) setT('ELECTRIC');
      else if (ABIL.has(mon, 'Misty Surge')) setT('MISTY');
      else if (ABIL.has(mon, 'Grassy Surge')) setT('GRASSY');
      else if (ABIL.has(mon, 'Psychic Surge')) setT('PSYCHIC');
    };
    // on-entry: hazards damage/effects, then weather/terrain abilities + Intimidate.
    const onEntry = (side, idx, skipHazards) => {
      const team = side === 'A' ? A : B;
      const mon = team[idx];
      if (!mon || mon.fainted) return;
      if (!skipHazards) {
        const hz = field.hazards[side];
        const e = FIELD.hazardEntry(mon, hz);
        if (e.dmg > 0) mon.hp = Math.max(0, mon.hp - e.dmg);
        if (e.lines.length || e.dmg) { events.push({ t: 'hazard', side, name: mon.name, dmg: e.dmg, hp: mon.hp, maxHP: mon.maxHP }); log.push(e.lines.join(' ') || `${mon.name} was hurt by hazards!`); }
        if (e.status && STATUS.canApply(mon, e.status)) { STATUS.apply(mon, e.status, rng); events.push({ t: 'status', side, name: mon.name, code: e.status, statusOf: snapshotStatus(A, B) }); log.push(`${mon.name} was ${STATUS.label[e.status]} by the poison spikes!`); }
        if (e.speedDrop) { STAGES.apply(mon, 'SPE', -1); events.push({ t: 'stat', side, name: mon.name, stat: 'SPE', delta: -1, boostsOf: snapshotBoosts(A, B) }); }
        if (mon.hp <= 0) { mon.fainted = true; STATUS.clear(mon); events.push({ t: 'faint', name: mon.name, side }); log.push(`${mon.name} fainted!`); return; }
      }
      weatherAbility(mon, side);
      const foe = side === 'A' ? B[bi] : A[ai];
      doIntimidate(mon, side, foe, side === 'A' ? 'B' : 'A');
    };

    events.push({ t: 'start', a: snapshot(A), b: snapshot(B), aiIdx: ai, biIdx: bi });
    log.push(`Team A sent out ${A[ai].name}!  Team B sent out ${B[bi].name}!`);
    // leads enter: weather/terrain abilities + Intimidate (no hazards on lead).
    // Faster lead resolves last (so its weather/terrain "wins" ties) — fair, not slot-based.
    {
      const sa = STATUS.speed(A[ai]), sb = STATUS.speed(B[bi]);
      const aFastLast = sa >= sb; // faster goes last; tie → A last (coinflip below)
      const aLast = sa === sb ? (rng() < 0.5) : aFastLast;
      if (aLast) { onEntry('B', bi, true); onEntry('A', ai, true); }
      else { onEntry('A', ai, true); onEntry('B', bi, true); }
    }

    while (alive(A) && alive(B) && guard++ < 300) {
      turn++;
      // ---- switch phase: a switch IS the side's action this turn ----
      // All switches resolve before any attack; a side that switches does not
      // also attack (canonical: switching consumes your turn).
      let aSwitched = false, bSwitched = false;
      // both sides decide their switch against the SAME pre-switch state, so B
      // doesn't get to react to A's switch (that was a slot-based information edge).
      const preA = A[ai], preB = B[bi];
      const aSwitch = shouldSwitch(A, ai, preB, rng, lastSwitchTurn.A === turn - 1);
      const bSwitch = shouldSwitch(B, bi, preA, rng, lastSwitchTurn.B === turn - 1);
      if (aSwitch >= 0) { events.push({ t: 'switch', side: 'A', to: aSwitch, name: A[aSwitch].name }); log.push(`Team A withdrew ${A[ai].name} and sent out ${A[aSwitch].name}.`); ai = aSwitch; aSwitched = true; lastSwitchTurn.A = turn; }
      if (bSwitch >= 0) { events.push({ t: 'switch', side: 'B', to: bSwitch, name: B[bSwitch].name }); log.push(`Team B withdrew ${B[bi].name} and sent out ${B[bSwitch].name}.`); bi = bSwitch; bSwitched = true; lastSwitchTurn.B = turn; }
      // Intimidate fires on entry, after both switches are placed
      if (aSwitched) onEntry('A', ai);
      if (bSwitched) onEntry('B', bi);

      const mA = A[ai], mB = B[bi];
      const benchCount = (team, idx) => team.reduce((n, m, i) => n + ((i !== idx && !m.fainted) ? 1 : 0), 0);
      const wxNow = curWeather(), txNow = field.terrain.kind;
      const ctxA = { weather: wxNow, terrain: txNow, hazardsOnFoe: field.hazards.B, foeBench: benchCount(B, bi) };
      const ctxB = { weather: wxNow, terrain: txNow, hazardsOnFoe: field.hazards.A, foeBench: benchCount(A, ai) };
      const moveA = bestMove(mA, mB, ctxA), moveB = bestMove(mB, mA, ctxB);
      // turn order by speed (paralysis halves speed; ties random)
      const wx = curWeather();
      const wspeed = (m) => {
        if (wx === 'SUN' && ABIL.has(m, 'Chlorophyll')) return 2;
        if (wx === 'RAIN' && (ABIL.has(m, 'Swift Swim'))) return 2;
        if (wx === 'SAND' && ABIL.has(m, 'Sand Rush')) return 2;
        if (wx === 'HAIL' && ABIL.has(m, 'Slush Rush')) return 2;
        return 1;
      };
      const spdA = Math.floor(STATUS.speed(mA) * wspeed(mA)), spdB = Math.floor(STATUS.speed(mB) * wspeed(mB));
      const aFirst = spdA > spdB || (spdA === spdB && rng() < 0.5);
      const order = aFirst ? [['A', mA, mB, moveA], ['B', mB, mA, moveB]] : [['B', mB, mA, moveB], ['A', mA, mB, moveA]];

      for (const [side, atk, def, mv] of order) {
        if (atk.fainted || def.fainted) continue;
        // a side that switched this turn has used its action — it doesn't attack
        if ((side === 'A' && aSwitched) || (side === 'B' && bSwitched)) continue;

        // ---- Sync Band: swap active ability (once per turn) ----
        if (normName(atk.item || '') === normName('Sync Band') && atk.syncUsedTurn !== turn) {
          const pick = ABIL.syncChoice(atk, def);
          if (pick && normName(pick) !== normName(atk.ability)) {
            const from = atk.ability;
            atk.ability = pick;
            atk.syncUsedTurn = turn;
            events.push({ t: 'sync', side, name: atk.name, from, to: pick });
            log.push(`${atk.name}'s Sync Band switched its Ability to ${pick}!`);
          }
        }

        // ---- pre-move status gate (sleep / freeze / full paralysis) ----
        let cantAct = false, gateLine = '';
        if (atk.status === 'SLP') {
          if (atk.statusTurns > 0) atk.statusTurns--;
          if (atk.statusTurns <= 0) { STATUS.clear(atk); gateLine = `${atk.name} woke up!`; }
          else { cantAct = true; gateLine = `${atk.name} is fast asleep.`; }
        } else if (atk.status === 'FRZ') {
          if (rng() < 0.20) { STATUS.clear(atk); gateLine = `${atk.name} thawed out!`; }
          else { cantAct = true; gateLine = `${atk.name} is frozen solid!`; }
        } else if (atk.status === 'PAR') {
          if (rng() < 0.25) { cantAct = true; gateLine = `${atk.name} is paralyzed! It can't move!`; }
        }
        if (gateLine) { events.push({ t: 'cantmove', side, name: atk.name, reason: gateLine, statusOf: snapshotStatus(A, B) }); log.push(gateLine); }
        if (cantAct) continue;

        const res = computeDamage(atk, def, mv, rng, { weather: curWeather(), terrain: field.terrain.kind });
        if (res.immune) {
          events.push({ t: 'move', side, move: mv.name, attacker: atk.name, target: def.name, immune: true });
          log.push(`${atk.name} used ${mv.name}. ${res.immuneInfo.line}`);
          // absorb-heal abilities (Volt Absorb / Water Absorb): restore 1/4 max HP
          if (res.immuneInfo.heal && def.hp < def.maxHP) {
            const h = Math.floor(def.maxHP / 4);
            def.hp = Math.min(def.maxHP, def.hp + h);
            events.push({ t: 'heal', side: side === 'A' ? 'B' : 'A', name: def.name, hp: def.hp, maxHP: def.maxHP });
            log.push(`${def.name} restored some HP!`);
          }
          continue;
        }
        if (res.missed) {
          events.push({ t: 'move', side, move: mv.name, missed: true, attacker: atk.name, target: def.name });
          log.push(`${atk.name} used ${mv.name} — but it missed!`);
          continue;
        }
        const dealt = Math.min(res.dmg, def.hp);
        def.hp = Math.max(0, def.hp - res.dmg);
        const pct = Math.round((dealt / def.maxHP) * 100);
        events.push({ t: 'move', side, move: mv.name, dmg: res.dmg, hp: def.hp, maxHP: def.maxHP, eff: res.eff, crit: res.crit, attacker: atk.name, target: def.name, cls: mv.cls });
        let line = `${atk.name} used ${mv.name}.`;
        if (mv.cls !== 'Status' && mv.pow) {
          line += ` ${def.name} lost ${pct}% HP.`;
          if (res.crit) line += ' A critical hit!';
          if (res.eff > 1) line += ' It was super effective!';
          else if (res.eff > 0 && res.eff < 1) line += ' It was not very effective…';
          else if (res.eff === 0) line += ` It doesn't affect ${def.name}…`;
        }
        log.push(line);

        // ---- field-setting moves (weather / terrain / hazards) ----
        const fld = moveFieldEffect(mv);
        if (fld) {
          if (fld.kind === 'weather') {
            if (field.weather.kind !== fld.val) { field.weather = { kind: fld.val, turns: 5 }; events.push({ t: 'weather', kind: fld.val, by: atk.name, side }); log.push(`${atk.name} whipped up ${FIELD.WEATHER[fld.val]}!`); }
          } else if (fld.kind === 'terrain') {
            if (field.terrain.kind !== fld.val) { field.terrain = { kind: fld.val, turns: 5 }; events.push({ t: 'terrain', kind: fld.val, by: atk.name, side }); log.push(`${atk.name} set ${FIELD.TERRAIN[fld.val]}!`); }
          } else if (fld.kind === 'hazard') {
            const foeSide = side === 'A' ? 'B' : 'A';
            const hz = field.hazards[foeSide];
            let set = true;
            if (fld.val === 'rock') { if (hz.rock) set = false; else hz.rock = true; }
            else if (fld.val === 'spikes') { if (hz.spikes >= 3) set = false; else hz.spikes++; }
            else if (fld.val === 'toxic') { if (hz.toxic >= 2) set = false; else hz.toxic++; }
            else if (fld.val === 'web') { if (hz.web) set = false; else hz.web = true; }
            if (set) { events.push({ t: 'hazardset', side: foeSide, val: fld.val }); log.push(`Hazards were set around Team ${foeSide}!`); }
          }
        }

        if (def.hp > 0 && res.eff !== 0) {
          const seff = moveStatusEffect(mv);
          if (seff && rng() < seff.chance) {
            if (STATUS.canApply(def, seff.code)) {
              STATUS.apply(def, seff.code, rng);
              events.push({ t: 'status', side: side === 'A' ? 'B' : 'A', name: def.name, code: seff.code, statusOf: snapshotStatus(A, B) });
              log.push(`${def.name} was ${STATUS.label[seff.code]}!`);
            }
          }
        }

        // ---- stat-stage moves (Swords Dance, Growl, etc.) ----
        const statEff = moveStatEffect(mv);
        if (statEff && (statEff.chance >= 1 || rng() < statEff.chance)) {
          if (statEff.target === 'self') {
            applyStatChanges(atk, side, statEff.changes, false);
          } else if (def.hp > 0 && res.eff !== 0) {
            // foe-targeted drop counts as opponent-caused (triggers Defiant)
            applyStatChanges(def, side === 'A' ? 'B' : 'A', statEff.changes, true);
          }
        }

        // ---- self-KO moves (Explosion / Self-Destruct): user faints after the hit ----
        if (isSelfKO(mv)) {
          // defender may also have fainted from the blast — resolve both, attacker last
          const defSideTag = side === 'A' ? 'B' : 'A';
          if (def.hp <= 0 && !def.fainted) {
            def.fainted = true; STATUS.clear(def);
            events.push({ t: 'faint', name: def.name, side: defSideTag });
            log.push(`${def.name} fainted!`);
          }
          atk.fainted = true; STATUS.clear(atk);
          events.push({ t: 'faint', name: atk.name, side });
          log.push(`${atk.name} fainted from the recoil of ${mv.name}!`);
          // replace the defender if it fainted
          if (def.fainted) {
            if (defSideTag === 'B') { const nx = pickNextAlive(B, bi); if (nx >= 0) { bi = nx; events.push({ t: 'send', side: 'B', name: B[bi].name, idx: bi }); log.push(`Team B sent out ${B[bi].name}!`); onEntry('B', bi); } }
            else { const nx = pickNextAlive(A, ai); if (nx >= 0) { ai = nx; events.push({ t: 'send', side: 'A', name: A[ai].name, idx: ai }); log.push(`Team A sent out ${A[ai].name}!`); onEntry('A', ai); } }
          }
          // replace the attacker (the self-KO user)
          if (side === 'A') { const nx = pickNextAlive(A, ai); if (nx >= 0) { ai = nx; events.push({ t: 'send', side: 'A', name: A[ai].name, idx: ai }); log.push(`Team A sent out ${A[ai].name}!`); onEntry('A', ai); } }
          else { const nx = pickNextAlive(B, bi); if (nx >= 0) { bi = nx; events.push({ t: 'send', side: 'B', name: B[bi].name, idx: bi }); log.push(`Team B sent out ${B[bi].name}!`); onEntry('B', bi); } }
          break; // turn ends after a self-KO
        }

        if (def.hp <= 0) {
          def.fainted = true;
          STATUS.clear(def);
          events.push({ t: 'faint', name: def.name, side: side === 'A' ? 'B' : 'A' });
          log.push(`${def.name} fainted!`);
          // Moxie: KO raises the attacker's Attack by 1
          if (ABIL.has(atk, 'Moxie') && !atk.fainted) {
            const a = STAGES.apply(atk, 'ATK', 1);
            if (a !== 0) {
              events.push({ t: 'ability', side, name: atk.name, ability: 'Moxie', boostsOf: snapshotBoosts(A, B) });
              events.push({ t: 'stat', side, name: atk.name, stat: 'ATK', delta: a, boostsOf: snapshotBoosts(A, B) });
              log.push(`${atk.name}'s Moxie raised its Attack!`);
            }
          }
          // send out replacement
          if (side === 'A') { const nx = pickNextAlive(B, bi); if (nx >= 0) { bi = nx; events.push({ t: 'send', side: 'B', name: B[bi].name, idx: bi }); log.push(`Team B sent out ${B[bi].name}!`); onEntry('B', bi); } }
          else { const nx = pickNextAlive(A, ai); if (nx >= 0) { ai = nx; events.push({ t: 'send', side: 'A', name: A[ai].name, idx: ai }); log.push(`Team A sent out ${A[ai].name}!`); onEntry('A', ai); } }
          break; // end this turn's action exchange after a faint
        }
      }

      // ---- end-of-turn residual damage (burn / poison / toxic) ----
      // Process sides in speed order (ties random) so neither slot is favored.
      const eotOrder = (() => {
        const sa = STATUS.speed(A[ai] || {}), sb = STATUS.speed(B[bi] || {});
        const aF = sa > sb || (sa === sb && rng() < 0.5);
        return aF ? ['A', 'B'] : ['B', 'A'];
      })();
      for (const side of eotOrder) {
        const mon = side === 'A' ? A[ai] : B[bi];
        if (!mon || mon.fainted) continue;
        const r = STATUS.residual(mon);
        if (r > 0) {
          mon.hp = Math.max(0, mon.hp - r);
          if (mon.status === 'TOX') mon.toxicN++;
          const verb = mon.status === 'BRN' ? 'hurt by its burn' : 'hurt by poison';
          events.push({ t: 'statusdmg', side, name: mon.name, code: mon.status, hp: mon.hp, maxHP: mon.maxHP, dmg: r, statusOf: snapshotStatus(A, B) });
          log.push(`${mon.name} was ${verb}! (-${Math.round((r / mon.maxHP) * 100)}%)`);
          if (mon.hp <= 0) {
            mon.fainted = true; STATUS.clear(mon);
            events.push({ t: 'faint', name: mon.name, side });
            log.push(`${mon.name} fainted!`);
            if (side === 'A') { const nx = pickNextAlive(A, ai); if (nx >= 0) { ai = nx; events.push({ t: 'send', side: 'A', name: A[ai].name, idx: ai }); log.push(`Team A sent out ${A[ai].name}!`); onEntry('A', ai); } }
            else { const nx = pickNextAlive(B, bi); if (nx >= 0) { bi = nx; events.push({ t: 'send', side: 'B', name: B[bi].name, idx: bi }); log.push(`Team B sent out ${B[bi].name}!`); onEntry('B', bi); } }
          }
        }
      }

      // ---- end-of-turn weather: chip damage + duration ----
      const wk = curWeather();
      if (wk === 'SAND' || wk === 'HAIL') {
        for (const side of eotOrder) {
          const mon = side === 'A' ? A[ai] : B[bi];
          if (!mon || mon.fainted) continue;
          // Sand: Rock/Ground/Steel immune. Hail/Snow: Ice immune. Magic Guard / Overcoat immune. Weather Shell / Sand Bath skip.
          const immune = (wk === 'SAND' ? FIELD.sandImmuneType(mon.types) : mon.types.includes('ICE'))
            || ABIL.has(mon, 'Magic Guard') || ABIL.has(mon, 'Overcoat') || ABIL.has(mon, 'Weather Shell') || ABIL.has(mon, 'Sand Bath') || ABIL.has(mon, 'Ice Body') || ABIL.has(mon, 'Snow Cloak');
          if (immune) continue;
          const chip = Math.max(1, Math.floor(mon.maxHP / 16));
          mon.hp = Math.max(0, mon.hp - chip);
          events.push({ t: 'weatherdmg', side, name: mon.name, kind: wk, hp: mon.hp, maxHP: mon.maxHP, dmg: chip });
          log.push(`${mon.name} is buffeted by ${FIELD.WEATHER[wk]}! (-${Math.round(chip / mon.maxHP * 100)}%)`);
          if (mon.hp <= 0) {
            mon.fainted = true; STATUS.clear(mon);
            events.push({ t: 'faint', name: mon.name, side });
            log.push(`${mon.name} fainted!`);
            if (side === 'A') { const nx = pickNextAlive(A, ai); if (nx >= 0) { ai = nx; events.push({ t: 'send', side: 'A', name: A[ai].name, idx: ai }); log.push(`Team A sent out ${A[ai].name}!`); onEntry('A', ai); } }
            else { const nx = pickNextAlive(B, bi); if (nx >= 0) { bi = nx; events.push({ t: 'send', side: 'B', name: B[bi].name, idx: bi }); log.push(`Team B sent out ${B[bi].name}!`); onEntry('B', bi); } }
          }
        }
      }
      // decrement field durations
      if (field.weather.kind) { field.weather.turns--; if (field.weather.turns <= 0) { log.push(`The ${FIELD.WEATHER[field.weather.kind]} subsided.`); events.push({ t: 'weatherend' }); field.weather.kind = null; } }
      if (field.terrain.kind) { field.terrain.turns--; if (field.terrain.turns <= 0) { log.push(`The ${FIELD.TERRAIN[field.terrain.kind]} faded.`); events.push({ t: 'terrainend' }); field.terrain.kind = null; } }

      events.push({ t: 'endturn', turn, aHP: A[ai] ? A[ai].hp : 0, bHP: B[bi] ? B[bi].hp : 0, weather: field.weather.kind, terrain: field.terrain.kind });

      // dynamic stall detector: if neither team's total HP has changed for many
      // turns, the battle is deadlocked (e.g. both sides stuck on inert moves).
      // Resolve immediately rather than grinding to the turn guard.
      const totHP = A.reduce((s, m) => s + (m.fainted ? 0 : m.hp), 0) + B.reduce((s, m) => s + (m.fainted ? 0 : m.hp), 0);
      if (totHP === lastTotHP) { noProgress++; } else { noProgress = 0; lastTotHP = totHP; }
      if (noProgress >= 12) break; // ~12 turns of zero net HP change = deadlock
    }

    const bothAlive = alive(A) && alive(B);
    let aWin = alive(A) && !alive(B);
    let bWin = alive(B) && !alive(A);
    let winner = aWin ? 'A' : bWin ? 'B' : 'Draw';
    let stalled = false;
    // If the turn guard tripped while both teams are still standing, the battle
    // stalled (e.g. status-only / very weak movesets). Resolve it by total
    // remaining HP fraction rather than calling it an arbitrary draw.
    if (bothAlive) {
      const frac = (team) => team.reduce((s, m) => s + (m.fainted ? 0 : m.hp / m.maxHP), 0);
      const fa = frac(A), fb = frac(B);
      stalled = true;
      winner = Math.abs(fa - fb) < 1e-6 ? 'Draw' : (fa > fb ? 'A' : 'B');
    }
    const survivorsA = A.filter(m => !m.fainted).length;
    const survivorsB = B.filter(m => !m.fainted).length;
    events.push({ t: 'end', winner, survivorsA, survivorsB, stalled });
    if (stalled) {
      log.push(winner === 'Draw'
        ? 'The battle stalled out dead even — it’s a draw on remaining HP.'
        : `The battle stalled out; Team ${winner} wins on remaining HP (${survivorsA} vs ${survivorsB} Pokémon left).`);
    } else {
      log.push(winner === 'Draw' ? 'The battle ended in a draw!' : `Team ${winner} wins with ${winner === 'A' ? survivorsA : survivorsB} Pokémon remaining!`);
    }
    return { winner, turns: turn, survivorsA, survivorsB, events, log, teamA: A, teamB: B, stalled };
  }

  const alive = (team) => team.some(m => !m.fainted);
  const snapshot = (team) => team.map(m => ({ name: m.name, dex: m.dex, hp: m.hp, maxHP: m.maxHP, fainted: m.fainted, status: m.status || null }));
  // per-team list of {idx,status} for active-mon status badges during playback
  const snapshotStatus = (A, B) => ({
    A: A.map(m => m.status || null),
    B: B.map(m => m.status || null),
  });
  // per-team snapshot of stat-stage boosts for playback display
  const snapshotBoosts = (A, B) => ({
    A: A.map(m => ({ ...(m.boosts || STAGES.fresh()) })),
    B: B.map(m => ({ ...(m.boosts || STAGES.fresh()) })),
  });

  // ============================ team-building UI ============================
  // Searchable dex picker (mirrors the Team Builder's filter: name or dex,
  // excludes undiscovered + already-picked). Returns a dex string.
  function MonPickerModal({ onPick, onClose, exclude }) {
    const [q, setQ] = React.useState('');
    const list = DEX.filter(d => !d.undiscovered && d.stats.HP > 0 && !exclude.includes(d.dex) &&
      (!q.trim() || d.name.toLowerCase().includes(q.trim().toLowerCase()) || d.dex.includes(q.trim())));
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: '#0d0a1e', border: '1px solid #2a2350', borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff' }}>Pick a Pokémon</span>
            <button onClick={onClose} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontSize: 13 }}>Close</button>
          </div>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or dex #" spellCheck={false}
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 9, background: '#100c24', border: '1px solid #2a2545', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, marginBottom: 12 }} />
          <div style={{ maxHeight: 360, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
            {list.map(d => (
              <button key={d.dex} onClick={() => onPick(d.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9, padding: 7, borderRadius: 10, background: '#120e28', border: '1px solid #241f44', color: '#e8e3ff', textAlign: 'left' }}>
                <SpriteSlot dex={d.dex} name={d.name} size={34} accent="#8a5cff" />
                <span style={{ overflow: 'hidden' }}>
                  <span style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{d.name}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>#{d.dex}</span>
                </span>
              </button>
            ))}
            {list.length === 0 && <div style={{ color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 13, padding: 12 }}>No matches.</div>}
          </div>
        </div>
      </div>
    );
  }

  // Move picker: choose up to 4 from a mon's real learnset.
  function MovePickerModal({ dex, current, onSave, onClose }) {
    const pool = React.useMemo(() => {
      return resolveMoves(learnableMovesFor(dex)).sort((a, b) => a.name.localeCompare(b.name));
    }, [dex]);
    const [sel, setSel] = React.useState(() => (current || []).map(m => m.name));
    const toggle = (name) => setSel(s => s.includes(name) ? s.filter(x => x !== name) : (s.length >= 4 ? s : [...s, name]));
    const d = byDex(dex);
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: '#0d0a1e', border: '1px solid #2a2350', borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff' }}>{d ? d.name : 'Moves'} — pick up to 4</span>
            <button onClick={onClose} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontSize: 13 }}>Close</button>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#9a93bb', marginBottom: 12 }}>{sel.length}/4 selected{pool.length === 0 ? ' · no learnset data — will use Struggle' : ''}</div>
          <div style={{ maxHeight: 360, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {pool.map(mv => {
              const on = sel.includes(mv.name);
              const isStatus = mv.cls === 'Status' || !(mv.pow > 0);
              return (
                <button key={mv.name} onClick={() => toggle(mv.name)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '8px 11px', borderRadius: 9, background: on ? '#2a1f55' : '#120e28', border: `1px solid ${on ? '#8a5cff' : '#241f44'}`, color: '#e8e3ff' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TypePill type={mv.type} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, fontWeight: 600 }}>{mv.name}</span>
                  </span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11.5, color: '#9a93bb' }}>{isStatus ? mv.cls : `${mv.cls} · ${mv.pow}`}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
            <button onClick={() => onSave(sel)} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 10, padding: '9px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Save moves</button>
          </div>
        </div>
      </div>
    );
  }

  // editor for one side's manual roster (list of { dex, moves:[MOVE objs] })
  function ManualRoster({ label, color, roster, setRoster, otherDexes }) {
    const [picking, setPicking] = React.useState(false);          // mon picker open
    const [moveFor, setMoveFor] = React.useState(-1);             // index whose moves we're editing
    const exclude = roster.map(r => r.dex);                       // no dupes within this side
    const addMon = (dex) => { setRoster(r => r.length >= 6 ? r : [...r, { dex, moves: autoMoves(dex) }]); setPicking(false); };
    const removeMon = (i) => setRoster(r => r.filter((_, idx) => idx !== i));
    const saveMoves = (i, names) => { setRoster(r => r.map((m, idx) => idx === i ? { ...m, moves: resolveMoves(names) } : m)); setMoveFor(-1); };
    return (
      <div style={{ borderRadius: 12, border: `1px solid ${color}44`, background: '#0c0a1c', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color }}>{label.toUpperCase()} · {roster.length}/6</span>
          <button disabled={roster.length >= 6} onClick={() => setPicking(true)} style={{ cursor: roster.length >= 6 ? 'default' : 'pointer', opacity: roster.length >= 6 ? 0.4 : 1, background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 8, padding: '5px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600 }}>+ Add</button>
        </div>
        {roster.length === 0 && <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388', padding: '6px 2px' }}>Empty — add up to 6 Pokémon.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {roster.map((m, i) => {
            const d = byDex(m.dex);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#120e28', border: '1px solid #241f44', borderRadius: 10, padding: '6px 9px' }}>
                <SpriteSlot dex={m.dex} name={d ? d.name : m.dex} size={34} accent={color} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#e8e3ff' }}>{d ? d.name : '#' + m.dex}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, color: '#8a83a8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(m.moves || []).map(x => x.name).join(', ') || 'no moves'}</div>
                </div>
                <button onClick={() => setMoveFor(i)} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 7, padding: '5px 9px', fontSize: 11.5, fontFamily: "'Space Grotesk', sans-serif" }}>Moves</button>
                <button onClick={() => removeMon(i)} style={{ cursor: 'pointer', background: '#2a1320', border: '1px solid #5a2540', color: '#ff9fb5', borderRadius: 7, padding: '5px 9px', fontSize: 11.5, fontFamily: "'Space Grotesk', sans-serif" }}>✕</button>
              </div>
            );
          })}
        </div>
        {picking && <MonPickerModal onPick={addMon} onClose={() => setPicking(false)} exclude={exclude} />}
        {moveFor >= 0 && roster[moveFor] && <MovePickerModal dex={roster[moveFor].dex} current={roster[moveFor].moves} onSave={(names) => saveMoves(moveFor, names)} onClose={() => setMoveFor(-1)} />}
      </div>
    );
  }

  // ============================ UI ============================
  const BattleSim = function Battle() {
    const [teamA, setTeamA] = React.useState(null);
    const [teamB, setTeamB] = React.useState(null);
    // team sources: 'random' | 'manual'  (import writes straight into a manual roster)
    const [srcA, setSrcA] = React.useState('random');
    const [srcB, setSrcB] = React.useState('random');
    const [manualA, setManualA] = React.useState([]); // [{dex, moves:[MOVE objs]}]
    const [manualB, setManualB] = React.useState([]);
    const [importOpen, setImportOpen] = React.useState(false);
    const [importText, setImportText] = React.useState('');
    const [importInto, setImportInto] = React.useState('A'); // 'A' | 'B' | 'both'
    const [importMsg, setImportMsg] = React.useState('');
    const [result, setResult] = React.useState(null);
    const [step, setStep] = React.useState(0);     // current event index during playback
    const [playing, setPlaying] = React.useState(false);
    const [speed, setSpeed] = React.useState(2);
    const [skip, setSkip] = React.useState(false);
    const [level, setLevel] = React.useState(50);   // avg level for RANDOM teams (1–100)
    const [inspect, setInspect] = React.useState(null); // null | 'A' | 'B'
    const [buildMsg, setBuildMsg] = React.useState('');
    const timer = React.useRef(null);

    // current display state derived from events up to `step`
    const view = React.useRef({ a: null, b: null, aHP: {}, bHP: {}, anim: null });

    const rollTeams = (lvl) => {
      // guard: only a finite number is a real level; a click event etc. → use state
      const L = (typeof lvl === 'number' && Number.isFinite(lvl)) ? lvl : level;
      const rng = mulberry32((Math.random() * 1e9) | 0);
      setTeamA(randomTeam(6, rng, L));
      setTeamB(randomTeam(6, rng, L));
      setSrcA('random'); setSrcB('random');
      setResult(null); setStep(0); setPlaying(false); setBuildMsg('');
    };

    // re-level the CURRENT random teams in place: same species, recompute stats
    // and auto-moves at the new level. Does NOT re-roll which Pokémon are on the
    // team. Only touches sides that are on the Random source.
    const relevelTeams = (L) => {
      const redo = (team) => (team || []).map(m => buildMon(m.dex, L));
      if (srcA === 'random') setTeamA(t => redo(t));
      if (srcB === 'random') setTeamB(t => redo(t));
      setResult(null); setStep(0); setPlaying(false);
    };

    React.useEffect(() => { rollTeams(); }, []);

    // assemble the live teamA/teamB from whichever source each side is set to.
    // Random sides use the team currently shown (set by Random Teams / the level
    // slider) so a Simulate doesn't silently re-roll different Pokémon; we only
    // roll a fresh one if nothing is shown yet.
    const assembleTeams = () => {
      let A, B, msg = '';
      if (srcA === 'manual') {
        if (manualA.length === 0) { setBuildMsg('Team A is empty — add Pokémon or switch it to Random.'); return false; }
        A = buildFromMembers(manualA.map(m => ({ dex: m.dex, moves: (m.moves || []).map(x => x.name) })));
      } else { A = (teamA && teamA.length) ? teamA : randomTeam(6, mulberry32((Math.random() * 1e9) | 0), level); }
      if (srcB === 'manual') {
        if (manualB.length === 0) { setBuildMsg('Team B is empty — add Pokémon or switch it to Random.'); return false; }
        B = buildFromMembers(manualB.map(m => ({ dex: m.dex, moves: (m.moves || []).map(x => x.name) })));
      } else { B = (teamB && teamB.length) ? teamB : randomTeam(6, mulberry32((Math.random() * 1e9 + 7) | 0), level); }
      setTeamA(A); setTeamB(B); setBuildMsg(msg);
      return { A, B };
    };

    // import a VT2…/VTEAM1 code into the chosen side(s) as a manual roster
    const doImport = () => {
      const lo = decodeShareCode(importText);
      if (!lo || !lo.members || lo.members.length === 0) {
        setImportMsg('That code is not valid. Copy the whole thing (it starts with VT2).');
        return;
      }
      // members → manual roster shape with resolved MOVE objects
      const roster = lo.members.map(m => {
        const resolved = resolveMoves(m.moves);
        return { dex: m.dex, moves: resolved.length ? resolved : autoMoves(m.dex) };
      }).filter(m => byDex(m.dex));
      if (roster.length === 0) { setImportMsg('Code decoded, but no valid Pokémon were found in it.'); return; }
      const named = lo.name ? `"${lo.name}"` : 'team';
      if (importInto === 'A' || importInto === 'both') { setManualA(roster.map(r => ({ ...r }))); setSrcA('manual'); }
      if (importInto === 'B' || importInto === 'both') { setManualB(roster.map(r => ({ ...r }))); setSrcB('manual'); }
      setImportMsg(`Imported ${named} (${roster.length} Pokémon) into Team ${importInto === 'both' ? 'A & B' : importInto}.`);
      setResult(null); setStep(0); setPlaying(false);
    };

    // open the import modal pre-targeted at a side ('A' | 'B' | 'both')
    const openImport = (into) => { setImportInto(into || 'A'); setImportText(''); setImportMsg(''); setImportOpen(true); };

    // switch a side's source; entering 'random' rolls that side a fresh team at
    // the current level (so it doesn't keep showing the old manual roster).
    const chooseSource = (side, opt) => {
      if (opt === 'random') {
        const team = randomTeam(6, mulberry32((Math.random() * 1e9 + (side === 'B' ? 7 : 0)) | 0), level);
        if (side === 'A') { setSrcA('random'); setTeamA(team); }
        else { setSrcB('random'); setTeamB(team); }
        setResult(null); setStep(0); setPlaying(false); setBuildMsg('');
      } else {
        (side === 'A' ? setSrcA : setSrcB)(opt);
      }
    };

    const run = () => {
      const built = assembleTeams();
      if (!built) return;
      const r = simulate(built.A, built.B);
      setResult(r);
      if (skip) { setStep(r.events.length - 1); setPlaying(false); }
      else { setStep(0); setPlaying(true); }
    };

    // playback timer
    React.useEffect(() => {
      if (!playing || !result) return;
      if (step >= result.events.length - 1) { setPlaying(false); return; }
      const delay = Math.max(40, 900 / speed);
      timer.current = setTimeout(() => setStep(s => Math.min(s + 1, result.events.length - 1)), delay);
      return () => clearTimeout(timer.current);
    }, [playing, step, speed, result]);

    // reconstruct active mons + HP from events up to `step`
    const playback = React.useMemo(() => {
      if (!result) return null;
      const A = result.teamA.map(m => ({ name: m.name, dex: m.dex, maxHP: m.maxHP, hp: m.maxHP, fainted: false, status: null, boosts: null }));
      const B = result.teamB.map(m => ({ name: m.name, dex: m.dex, maxHP: m.maxHP, hp: m.maxHP, fainted: false, status: null, boosts: null }));
      const applyStatusSnap = (snap) => { if (!snap) return; snap.A.forEach((s, i) => { if (A[i]) A[i].status = s; }); snap.B.forEach((s, i) => { if (B[i]) B[i].status = s; }); };
      const applyBoostSnap = (snap) => { if (!snap) return; snap.A.forEach((b, i) => { if (A[i]) A[i].boosts = b; }); snap.B.forEach((b, i) => { if (B[i]) B[i].boosts = b; }); };
      let ai = 0, bi = 0, lastAnim = null, turn = 0, weather = null, terrain = null;
      for (let i = 0; i <= step && i < result.events.length; i++) {
        const e = result.events[i];
        if (e.t === 'switch') { if (e.side === 'A') ai = e.to; else bi = e.to; }
        else if (e.t === 'send') { if (e.side === 'A') ai = e.idx; else bi = e.idx; }
        else if (e.t === 'move') {
          const defSide = e.side === 'A' ? B : A;
          const defIdx = e.side === 'A' ? bi : ai;
          if (!e.missed && e.hp != null) defSide[defIdx].hp = e.hp;
          if (i === step) lastAnim = e;
        }
        else if (e.t === 'status') { applyStatusSnap(e.statusOf); if (i === step) lastAnim = e; }
        else if (e.t === 'cantmove') { applyStatusSnap(e.statusOf); if (i === step) lastAnim = e; }
        else if (e.t === 'stat' || e.t === 'ability') { applyBoostSnap(e.boostsOf); if (i === step) lastAnim = e; }
        else if (e.t === 'statusdmg') {
          const s = e.side === 'A' ? A : B; const idx = e.side === 'A' ? ai : bi;
          if (s[idx] && e.hp != null) s[idx].hp = e.hp;
          applyStatusSnap(e.statusOf);
          if (i === step) lastAnim = e;
        }
        else if (e.t === 'hazard' || e.t === 'weatherdmg') {
          const s = e.side === 'A' ? A : B; const idx = e.side === 'A' ? ai : bi;
          if (s[idx] && e.hp != null) s[idx].hp = e.hp;
          if (i === step) lastAnim = e;
        }
        else if (e.t === 'weather') weather = e.kind;
        else if (e.t === 'weatherend') weather = null;
        else if (e.t === 'terrain') terrain = e.kind;
        else if (e.t === 'terrainend') terrain = null;
        else if (e.t === 'faint') { const s = e.side === 'A' ? A : B; const idx = e.side === 'A' ? ai : bi; if (s[idx]) { s[idx].fainted = true; s[idx].hp = 0; s[idx].status = null; } }
        else if (e.t === 'endturn') turn = e.turn;
      }
      return { A, B, ai, bi, anim: lastAnim, turn, weather, terrain };
    }, [result, step]);

    // visible log up to current step
    const visibleLog = React.useMemo(() => {
      if (!result) return [];
      // map events to log lines roughly by counting log-producing events
      return result.log.slice(0, logCountUpTo(result.events, step) );
    }, [result, step]);

    // auto-scroll the log to the newest line as the battle plays
    const logRef = React.useRef(null);
    const shownLogLen = skip ? (result ? result.log.length : 0) : visibleLog.length;
    React.useEffect(() => {
      const el = logRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, [shownLogLen]);

    const copyLog = () => { try { navigator.clipboard.writeText(result.log.join('\n')); } catch (e) {} };

    if (!teamA || !teamB) return <Empty label="Loading battle…" />;

    return (
      <div>
        <PageHead kicker="BATTLE ENGINE" title="Auto-Battle Simulator" sub="Build two teams — pick them by hand from the Void dex, import a Team Builder share code, or roll them at random — then let the AI fight it out. 6v6 with switching, real Void stats and type chart, animated on a 2D plane." />

        {/* controls */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
          <button onClick={run} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 12, padding: '12px 24px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 20 }}>⚔ Simulate Battle</button>
          <button onClick={() => rollTeams()} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 10, padding: '11px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>🎲 Random Teams</button>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#9a93bb' }}>
            <input type="checkbox" checked={skip} onChange={e => setSkip(e.target.checked)} /> Skip animation
          </label>
          <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #2a2545' }}>
            {[1, 2, 5, 10, 20].map(s => (
              <button key={s} onClick={() => setSpeed(s)} style={{ cursor: 'pointer', padding: '8px 12px', background: speed === s ? '#322663' : '#100c24', border: 'none', borderRight: s !== 20 ? '1px solid #2a2545' : 'none', color: speed === s ? '#fff' : '#9a93bb', fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{s}x</button>
            ))}
          </div>
        </div>

        {/* team source: per-side Random / Manual / Import */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
          {[['A', srcA, '#33d6ff'], ['B', srcB, '#ff7fe0']].map(([side, src, col]) => (
            <div key={side} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: col }}>TEAM {side}</span>
              <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #2a2545' }}>
                {['random', 'manual', 'import'].map((opt, oi) => (
                  <button key={opt}
                    onClick={() => { if (opt === 'import') { openImport(side); } else { chooseSource(side, opt); } }}
                    style={{ cursor: 'pointer', padding: '6px 13px', background: src === opt ? '#322663' : '#100c24', border: 'none', borderRight: oi < 2 ? '1px solid #2a2545' : 'none', color: src === opt ? '#fff' : '#9a93bb', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                    {opt === 'import' ? '⇩ Import' : opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* level slider — governs the average level of RANDOM teams */}
        {(srcA === 'random' || srcB === 'random') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, padding: '10px 14px', borderRadius: 10, background: '#0c0a1c', border: '1px solid #221d3a', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#b08fff', whiteSpace: 'nowrap' }}>RANDOM TEAM LEVEL</span>
            <input type="range" min={1} max={100} value={level}
              onChange={e => { const v = +e.target.value; setLevel(v); relevelTeams(v); }}
              style={{ flex: '1 1 220px', accentColor: '#8a5cff', cursor: 'pointer' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: '#fff', minWidth: 56, textAlign: 'right' }}>Lv. {level}</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#6a6388', flexBasis: '100%' }}>Applies to whichever side is set to Random. Manual and imported teams battle at Lv. 50.</span>
          </div>
        )}
        {buildMsg && <div style={{ marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#ffb37a' }}>{buildMsg}</div>}

        {/* manual roster editors (only when a side is set to manual) */}
        {(srcA === 'manual' || srcB === 'manual') && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {srcA === 'manual'
              ? <ManualRoster label="Team A" color="#33d6ff" roster={manualA} setRoster={setManualA} />
              : <div style={{ borderRadius: 12, border: '1px dashed #2a254566', padding: 12, fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388' }}>Team A: random</div>}
            {srcB === 'manual'
              ? <ManualRoster label="Team B" color="#ff7fe0" roster={manualB} setRoster={setManualB} />
              : <div style={{ borderRadius: 12, border: '1px dashed #2a254566', padding: 12, fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388' }}>Team B: random</div>}
          </div>
        )}

        {/* import modal */}
        {importOpen && (
          <div onClick={() => setImportOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(5,3,12,0.82)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '70px 20px', overflowY: 'auto' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: '#0d0a1e', border: '1px solid #2a2350', borderRadius: 16, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff' }}>Import a team</span>
                <button onClick={() => setImportOpen(false)} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 8, padding: '6px 12px', fontSize: 13 }}>Close</button>
              </div>
              <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#bdb6dd', lineHeight: 1.5 }}>Paste a share code from the Team Builder (starts with <code style={{ color: '#cdbfff' }}>VT2</code>). It loads as an editable manual roster.</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {[['A', 'Into Team A'], ['B', 'Into Team B'], ['both', 'Into both']].map(([v, lbl]) => (
                  <button key={v} onClick={() => setImportInto(v)} style={{ cursor: 'pointer', flex: 1, padding: '8px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, fontWeight: 600, background: importInto === v ? '#8a5cff22' : '#100c24', border: `1px solid ${importInto === v ? '#8a5cff' : '#2a2545'}`, color: importInto === v ? '#fff' : '#9a93bb' }}>{lbl}</button>
                ))}
              </div>
              <textarea value={importText} onChange={e => setImportText(e.target.value)} placeholder="Paste a VT2… code here" spellCheck={false}
                style={{ width: '100%', boxSizing: 'border-box', minHeight: 90, padding: '10px 12px', borderRadius: 9, background: '#100c24', border: '1px solid #2a2545', color: '#cdbfff', fontFamily: "'Space Mono', monospace", fontSize: 12.5, resize: 'vertical' }} />
              {importMsg && <div style={{ marginTop: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: importMsg.startsWith('Imported') ? '#7fe0a0' : '#ff9fb5' }}>{importMsg}</div>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
                <button onClick={doImport} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 10, padding: '9px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Import</button>
              </div>
            </div>
          </div>
        )}

        {/* the 2D arena */}
        {result && playback && (
          <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid #2a2350', background: 'linear-gradient(180deg, #1a1535 0%, #0f0b22 55%, #0a0816 100%)', minHeight: 320, marginBottom: 16 }}>
            {/* ground line */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, height: 2, background: 'linear-gradient(90deg, transparent, #3a2f6e, transparent)' }} />
            {/* turn badge */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#b08fff', letterSpacing: 1 }}>
              {playback.anim && playback.anim.t === 'end' ? '' : 'TURN ' + (playback.turn || 1)}
            </div>

            <BattlerSlot mon={playback.B[playback.bi]} side="B" anim={playback.anim} />
            <BattlerSlot mon={playback.A[playback.ai]} side="A" anim={playback.anim} />

            {/* VS / result overlay */}
            {step >= result.events.length - 1 && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,6,18,0.55)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#b08fff', letterSpacing: 2 }}>RESULT</div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 42, color: result.winner === 'Draw' ? '#cdbfff' : '#ffd54a', textShadow: '0 0 30px #8a5cff88' }}>
                    {result.winner === 'Draw' ? 'Draw' : 'Team ' + result.winner + ' Wins'}
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#9a93bb', marginTop: 4 }}>{result.turns} turns · A: {result.survivorsA} left · B: {result.survivorsB} left</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* playback scrubber */}
        {result && !skip && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} style={ctrlBtn}>⏮ Step</button>
            <button onClick={() => setPlaying(p => !p)} style={ctrlBtn}>{playing ? '⏸ Pause' : '▶ Play'}</button>
            <button onClick={() => setStep(s => Math.min(result.events.length - 1, s + 1))} style={ctrlBtn}>Step ⏭</button>
            <button onClick={() => { setStep(0); setPlaying(true); }} style={ctrlBtn}>↺ Restart</button>
            <input type="range" min={0} max={result.events.length - 1} value={step} onChange={e => { setStep(+e.target.value); setPlaying(false); }} style={{ flex: '1 1 200px', accentColor: '#8a5cff' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388' }}>{step + 1}/{result.events.length}</span>
          </div>
        )}

        {/* team rosters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <Roster team={teamA} label="Team A" color="#33d6ff" live={playback ? playback.A : null} onInspect={() => setInspect('A')} />
          <Roster team={teamB} label="Team B" color="#ff7fe0" live={playback ? playback.B : null} onInspect={() => setInspect('B')} />
        </div>

        {inspect && (
          <InspectModal
            team={inspect === 'A' ? teamA : teamB}
            label={'Team ' + inspect}
            color={inspect === 'A' ? '#33d6ff' : '#ff7fe0'}
            onClose={() => setInspect(null)}
          />
        )}

        {/* battle log */}
        {result && (
          <div style={{ borderRadius: 14, border: '1px solid #221d3a', background: '#0c0a1c', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #221d3a' }}>
              <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a83a8' }}>BATTLE LOG</span>
              <button onClick={copyLog} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 7, padding: '5px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12 }}>Copy</button>
            </div>
            <div ref={logRef} style={{ maxHeight: 260, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {(skip ? result.log : visibleLog).map((line, i) => (
                <div key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: line.includes('fainted') ? '#ff8fa6' : line.includes('Wins') || line.includes('wins') ? '#ffd54a' : '#cdc6e6', lineHeight: 1.5 }}>{line}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ctrlBtn = { cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 8, padding: '8px 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 };

  // how many log lines correspond to events up to step (log + events are roughly 1:1 for action events)
  function logCountUpTo(events, step) {
    let n = 0;
    for (let i = 0; i <= step && i < events.length; i++) {
      const t = events[i].t;
      if (t === 'start') n += 1;
      else if (t === 'switch' || t === 'send' || t === 'faint' || t === 'end') n += 1;
      else if (t === 'move') n += 1;
      else if (t === 'cantmove' || t === 'status' || t === 'statusdmg') n += 1;
      else if (t === 'stat' || t === 'ability') n += 1;
      else if (t === 'sync') n += 1;
      else if (t === 'weather' || t === 'terrain' || t === 'hazard' || t === 'hazardset' || t === 'weatherdmg' || t === 'weatherend' || t === 'terrainend') n += 1;
    }
    return n;
  }

  // a single animated battler on the plane
  function BattlerSlot({ mon, side, anim }) {
    if (!mon) return null;
    const isA = side === 'A';
    const accent = mon && TYPES[byDex(mon.dex) ? byDex(mon.dex).types[0] : 'NORMAL'] ? TYPES[byDex(mon.dex).types[0]].glow : '#8a5cff';
    // animation: did this mon just attack or get hit on the current step?
    let transform = 'none', flash = false;
    if (anim && anim.t === 'move') {
      const attackerIsThis = (anim.side === side);
      const targetIsThis = (anim.side !== side);
      if (attackerIsThis && !anim.missed) transform = isA ? 'translateX(40px) translateY(-10px)' : 'translateX(-40px) translateY(10px)';
      if (targetIsThis && !anim.missed && anim.dmg > 0) { transform = isA ? 'translateX(-8px)' : 'translateX(8px)'; flash = true; }
    }
    const hpPct = Math.max(0, Math.round((mon.hp / mon.maxHP) * 100));
    const hpColor = hpPct > 50 ? '#5fd13c' : hpPct > 20 ? '#ffd54a' : '#ff5f7e';
    return (
      <div style={{ position: 'absolute', [isA ? 'left' : 'right']: '8%', bottom: isA ? 60 : 150, textAlign: 'center', width: 180 }}>
        {/* HP bar */}
        <div style={{ marginBottom: 8, background: '#0a0818cc', border: `1px solid ${accent}55`, borderRadius: 8, padding: '6px 9px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: '#fff' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {mon.name}
              {mon.status && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.5, padding: '2px 5px', borderRadius: 4, color: '#0a0816', background: STATUS.color[mon.status] || '#fff', fontWeight: 700 }}>{STATUS.short[mon.status]}</span>}
            </span>
            <span style={{ color: hpColor }}>{hpPct}%</span>
          </div>
          <div style={{ height: 7, borderRadius: 4, background: '#1a1533', overflow: 'hidden', marginTop: 4 }}>
            <div style={{ width: hpPct + '%', height: '100%', background: hpColor, transition: 'width 0.3s ease' }} />
          </div>
          {mon.boosts && Object.keys(mon.boosts).some(k => mon.boosts[k] !== 0) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 5, justifyContent: 'center' }}>
              {['ATK', 'DEF', 'SPA', 'SPD', 'SPE', 'ACC', 'EVA'].filter(k => mon.boosts[k] !== 0).map(k => {
                const v = mon.boosts[k];
                return <span key={k} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, padding: '1px 4px', borderRadius: 3, color: v > 0 ? '#5fd13c' : '#ff7f9e', background: v > 0 ? '#1c3a1c' : '#3a1c26' }}>{STAGES.label(k).replace('Sp. ', 'S')} {v > 0 ? '+' + v : v}</span>;
              })}
            </div>
          )}
        </div>
        {/* sprite */}
        <div style={{ transform: mon.fainted ? 'translateY(30px) rotate(8deg)' : transform, opacity: mon.fainted ? 0.25 : 1, transition: 'transform 0.18s ease, opacity 0.4s ease', filter: flash ? 'brightness(2.2)' : 'none', display: 'inline-block' }}>
          <SpriteSlot dex={mon.dex} name={mon.name} size={120} accent={accent} />
        </div>
      </div>
    );
  }

  function Roster({ team, label, color, live, onInspect }) {
    const lvl = team && team[0] ? team[0].level : null;
    return (
      <div style={{ borderRadius: 12, border: `1px solid ${color}44`, background: '#0c0a1c', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color }}>{label.toUpperCase()}</span>
          {lvl != null && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#6a6388' }}>Lv. {lvl}</span>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {team.map((m, i) => {
            const lv = live ? live[i] : null;
            const fainted = lv ? lv.fainted : false;
            const pct = lv ? Math.round((lv.hp / lv.maxHP) * 100) : 100;
            return (
              <div key={i} title={`${m.name} · Lv. ${m.level}`} style={{ width: 54, textAlign: 'center', opacity: fainted ? 0.3 : 1 }}>
                <div style={{ filter: fainted ? 'grayscale(1)' : 'none' }}>
                  <SpriteSlot dex={m.dex} name={m.name} size={44} accent={color} />
                </div>
                <div style={{ height: 3, borderRadius: 2, background: '#1a1533', overflow: 'hidden', marginTop: 2 }}>
                  <div style={{ width: pct + '%', height: '100%', background: pct > 50 ? '#5fd13c' : pct > 20 ? '#ffd54a' : '#ff5f7e' }} />
                </div>
              </div>
            );
          })}
        </div>
        {team && team.length > 0 && (
          <button onClick={onInspect} style={{ cursor: 'pointer', marginTop: 12, width: '100%', background: '#15112a', border: `1px solid ${color}55`, color: '#cdbfff', borderRadius: 9, padding: '8px 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>🔍 Inspect {label}</button>
        )}
      </div>
    );
  }

  // full breakdown of a team's mons: stats, abilities, moves, and an honest
  // note on what isn't simulated yet (IV/EV/nature/items).
  function InspectModal({ team, label, color, onClose }) {
    const STAT_ROWS = [['HP', 'HP'], ['ATK', 'Atk'], ['DEF', 'Def'], ['SPA', 'SpA'], ['SPD', 'SpD'], ['SPE', 'Spe']];
    const statMax = 255; // base-stat reference for the mini bars
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(5,3,12,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '50px 16px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 760, background: '#0d0a1e', border: `1px solid ${color}55`, borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>Inspect {label}</span>
            <button onClick={onClose} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 8, padding: '6px 13px', fontSize: 13 }}>Close</button>
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, color: '#8a83a8', marginBottom: 16, lineHeight: 1.5 }}>
            Everything below is exactly what the engine uses to fight. Stats are computed at Lv. {team[0] ? team[0].level : 50} from base stats — the sim runs neutral nature with no IVs, EVs, or held items yet. A few abilities are now active in battle (Intimidate, Moxie, Defiant); the rest are shown but don't affect battle until later phases.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {team.map((m, i) => {
              const d = byDex(m.dex);
              const abilities = d ? (d.abilities || []) : [];
              const hidden = d ? d.hidden : null;
              return (
                <div key={i} style={{ borderRadius: 12, border: '1px solid #241f44', background: '#100c24', padding: 14 }}>
                  {/* header: sprite, name, types, level */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                    <SpriteSlot dex={m.dex} name={m.name} size={48} accent={color} />
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 19, color: '#fff' }}>{m.name}</span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>#{m.dex} · Lv. {m.level}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
                        {m.types.map(t => <TypePill key={t} type={t} />)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {/* stats column */}
                    <div>
                      <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a83a8', marginBottom: 7 }}>STATS (LV. {m.level})</div>
                      {STAT_ROWS.map(([k, lbl]) => {
                        const v = m.stats[k];
                        const base = d ? d.stats[k] : v;
                        return (
                          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                            <span style={{ width: 30, fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#9a93bb' }}>{lbl}</span>
                            <span style={{ width: 34, textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: '#fff' }}>{v}</span>
                            <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#1a1533', overflow: 'hidden' }}>
                              <div style={{ width: Math.min(100, (base / statMax) * 100) + '%', height: '100%', background: color }} />
                            </div>
                            <span style={{ width: 48, fontFamily: "'Space Mono', monospace", fontSize: 9.5, color: '#5f5980' }}>base {base}</span>
                          </div>
                        );
                      })}
                      <div style={{ marginTop: 9, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#6a6388' }}>
                        <div><span style={{ color: '#9a93bb' }}>Ability:</span> {abilities.length ? abilities.map((a, ai2) => <span key={ai2}>{ai2 ? ', ' : ''}{a}{ai2 === 0 && ABIL.active.has(normName(a)) ? <span style={{ color: '#5fd13c', fontSize: 9 }}> ●active</span> : ''}</span>) : '—'}{hidden ? ` (hidden: ${hidden})` : ''}</div>
                        <div style={{ marginTop: 3 }}><span style={{ color: '#9a93bb' }}>Item:</span> {m.item || '—'}{normName(m.item || '') === normName('Sync Band') ? <span style={{ color: '#5fd13c', fontSize: 9 }}> ●swaps ability 1×/turn</span> : ''}</div>
                        <div style={{ marginTop: 3, color: '#5f5980' }}>IV / EV / Nature — not simulated yet</div>
                      </div>
                    </div>

                    {/* moves column */}
                    <div>
                      <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a83a8', marginBottom: 7 }}>MOVES</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {m.moves.map((mv, j) => {
                          const se = moveStatusEffect(mv);
                          const isStatus = mv.cls === 'Status' || !(mv.pow > 0);
                          return (
                            <div key={j} style={{ background: '#0c0a1c', border: '1px solid #221d3a', borderRadius: 8, padding: '6px 9px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <TypePill type={mv.type} />
                                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#e8e3ff' }}>{mv.name}</span>
                                </span>
                                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, color: '#9a93bb' }}>{isStatus ? mv.cls : `${mv.cls} · ${mv.pow}/${mv.acc}`}</span>
                              </div>
                              {se && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10.5, color: STATUS.color[se.code] || '#9a93bb', marginTop: 3 }}>{Math.round(se.chance * 100)}% {STATUS.label[se.code]}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ---------- gatekeeper: passcode prompt → real sim ----------
  function BattleGate() {
    const [unlocked, setUnlockedState] = React.useState(isUnlocked());
    const [entry, setEntry] = React.useState('');
    const [error, setError] = React.useState(false);

    if (unlocked) return <BattleSim />;

    const tryUnlock = () => {
      if (checkPass(entry)) { setUnlocked(); setUnlockedState(true); setError(false); }
      else { setError(true); }
    };

    return (
      <div>
        <PageHead kicker="BATTLE ENGINE" title="Auto-Battle Simulator" sub="This feature is in private preview and locked with a passcode. If you have one, enter it below to unlock the simulator on this device." />
        <div style={{ maxWidth: 460, margin: '40px auto', textAlign: 'center', borderRadius: 18, border: '1px solid #2a2350', background: 'linear-gradient(180deg, #14102b 0%, #0d0a1e 100%)', padding: '36px 28px' }}>
          <div style={{ fontSize: 46, marginBottom: 6 }}>🔒</div>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#b08fff', letterSpacing: 2, marginBottom: 18 }}>LOCKED</div>
          <input
            type="password"
            value={entry}
            autoFocus
            onChange={e => { setEntry(e.target.value); setError(false); }}
            onKeyDown={e => { if (e.key === 'Enter') tryUnlock(); }}
            placeholder="Enter passcode"
            spellCheck={false}
            style={{ width: '100%', boxSizing: 'border-box', textAlign: 'center', padding: '12px 14px', borderRadius: 10, background: '#100c24', border: `1px solid ${error ? '#ff5f7e' : '#2a2545'}`, color: '#fff', fontFamily: "'Space Mono', monospace", fontSize: 15, letterSpacing: 1, marginBottom: 12 }}
          />
          {error && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#ff8fa6', marginBottom: 12 }}>That passcode isn't right. Check with whoever shared this.</div>}
          <button onClick={tryUnlock} style={{ cursor: 'pointer', width: '100%', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 12, padding: '12px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>Unlock</button>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#6a6388', marginTop: 16, lineHeight: 1.5 }}>Once unlocked, it stays unlocked on this device.</div>
        </div>
      </div>
    );
  }

  window.VIEWS.Battle = BattleGate;
})();
