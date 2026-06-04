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

  // ---------- EV / IV / Nature system ----------
  // Standard 25 natures. Each raises one stat 10% and lowers another 10%
  // (the 5 "neutral" natures raise and lower the same stat = no effect).
  // HP is never affected by nature. Keys use ATK/DEF/SPA/SPD/SPE.
  const NATURES = {
    Hardy:   { up: null,  down: null },
    Lonely:  { up: 'ATK', down: 'DEF' },
    Brave:   { up: 'ATK', down: 'SPE' },
    Adamant: { up: 'ATK', down: 'SPA' },
    Naughty: { up: 'ATK', down: 'SPD' },
    Bold:    { up: 'DEF', down: 'ATK' },
    Docile:  { up: null,  down: null },
    Relaxed: { up: 'DEF', down: 'SPE' },
    Impish:  { up: 'DEF', down: 'SPA' },
    Lax:     { up: 'DEF', down: 'SPD' },
    Timid:   { up: 'SPE', down: 'ATK' },
    Hasty:   { up: 'SPE', down: 'DEF' },
    Serious: { up: null,  down: null },
    Jolly:   { up: 'SPE', down: 'SPA' },
    Naive:   { up: 'SPE', down: 'SPD' },
    Modest:  { up: 'SPA', down: 'ATK' },
    Mild:    { up: 'SPA', down: 'DEF' },
    Quiet:   { up: 'SPA', down: 'SPE' },
    Bashful: { up: null,  down: null },
    Rash:    { up: 'SPA', down: 'SPD' },
    Calm:    { up: 'SPD', down: 'ATK' },
    Gentle:  { up: 'SPD', down: 'DEF' },
    Sassy:   { up: 'SPD', down: 'SPE' },
    Careful: { up: 'SPD', down: 'SPA' },
    Quirky:  { up: null,  down: null },
  };
  const NATURE_LIST = Object.keys(NATURES);
  const EV_MAX = 252, EV_TOTAL_MAX = 510, IV_MAX = 31;

  function natureMult(nature, statKey) {
    if (statKey === 'HP') return 1;
    const n = NATURES[nature];
    if (!n) return 1;
    if (n.up === statKey) return 1.1;
    if (n.down === statKey) return 0.9;
    return 1;
  }
  function freshEVs() { return { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 }; }
  function maxIVs() { return { HP: 31, ATK: 31, DEF: 31, SPA: 31, SPD: 31, SPE: 31 }; }

  // canonical stat formula (Gen 3+):
  //   HP    = floor((2*base + IV + floor(EV/4)) * L/100) + L + 10   (1 if base HP is 1)
  //   other = floor( (floor((2*base + IV + floor(EV/4)) * L/100) + 5) * natureMult )
  function computeStat(base, statKey, level, iv, ev, nature) {
    const L = level, I = Math.max(0, Math.min(IV_MAX, iv | 0)), E = Math.max(0, Math.min(EV_MAX, ev | 0));
    const inner = Math.floor(((2 * base + I + Math.floor(E / 4)) * L) / 100);
    if (statKey === 'HP') return base === 1 ? 1 : inner + L + 10;
    return Math.floor((inner + 5) * natureMult(nature, statKey));
  }

  // expose for the Team Builder so both files share one source of truth
  window.VSTATS = window.VSTATS || {};
  window.VSTATS.NATURES = NATURES;
  window.VSTATS.NATURE_LIST = NATURE_LIST;
  window.VSTATS.natureMult = natureMult;
  window.VSTATS.computeStat = computeStat;
  window.VSTATS.EV_MAX = EV_MAX;
  window.VSTATS.EV_TOTAL_MAX = EV_TOTAL_MAX;
  window.VSTATS.IV_MAX = IV_MAX;
  window.VSTATS.freshEVs = freshEVs;
  window.VSTATS.maxIVs = maxIVs;

  // pick an "ideal" nature for a species from its base stats: boost the stronger
  // attacking stat, drop the weaker attacking one; if it's fast and not bulky,
  // prefer a speed-boosting nature dropping the unused attacking stat.
  function idealNature(base) {
    const physical = base.ATK >= base.SPA;
    const attack = physical ? 'ATK' : 'SPA';
    const unused = physical ? 'SPA' : 'ATK';
    const fast = base.SPE >= 95 && base.SPE >= Math.max(base.HP, base.DEF, base.SPD);
    if (fast) {
      // +SPE / -unused  → Jolly (physical) or Timid (special)
      return physical ? 'Jolly' : 'Timid';
    }
    // +attack / -unused → Adamant (physical) or Modest (special)
    return physical ? 'Adamant' : 'Modest';
  }

  // a smart EV spread (<= cap total) that maxes the mon's attacking stat and
  // Speed, putting the remainder into a relevant bulk stat. cap defaults to 510.
  function idealEVs(base, cap) {
    cap = cap || EV_TOTAL_MAX;
    const physical = base.ATK >= base.SPA;
    const attack = physical ? 'ATK' : 'SPA';
    const evs = freshEVs();
    let left = cap;
    const give = (k, amt) => { const a = Math.max(0, Math.min(EV_MAX, Math.min(amt, left))); evs[k] += a; left -= a; };
    give(attack, 252);
    give('SPE', 252);
    // spend the rest (incl. any boss bonus over 504) into the better defense, then HP
    const bulk = base.DEF >= base.SPD ? 'DEF' : 'SPD';
    give('HP', Math.min(left, 252));
    give(bulk, Math.min(left, 252));
    give(physical ? 'SPD' : 'DEF', Math.min(left, 252));
    return evs;
  }

  // random IVs/EVs/nature for a given tier ('normal' | 'hard').
  //   normal: random IVs (0-31), no EVs, random nature
  //   hard:   max IVs, smart 510 EV spread, ideal nature
  function randomSpec(base, tier, rng) {
    const R = () => (rng ? rng() : Math.random());
    if (tier === 'hard') {
      return { ivs: maxIVs(), evs: idealEVs(base, EV_TOTAL_MAX), nature: idealNature(base) };
    }
    // normal tier
    const ivs = {};
    STAT_KEYS.forEach(k => { ivs[k] = Math.floor(R() * (IV_MAX + 1)); });
    const nature = NATURE_LIST[Math.floor(R() * NATURE_LIST.length)];
    return { ivs, evs: freshEVs(), nature };
  }
  window.VSTATS.idealNature = idealNature;
  window.VSTATS.idealEVs = idealEVs;


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
      // boss mons (and the AI-controlled side in Nightmare mode) are fully immune
      // to major status — closes status/paralysis stalling at the top difficulty.
      if (target.boss || target.aiSide) return false;
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
    // damaging moves that also raise a stat (the stat handler runs after damage)
    add('Trailblaze', 'self', [['SPE', 1]]);   // GRASS 50 — boosts user Speed
    add('Flame Charge', 'self', [['SPE', 1]]);  // FIRE 50 — boosts user Speed
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

  // self-healing moves: restore a fraction of max HP. Weather-dependent recovery
  // (Synthesis/Moonlight/Morning Sun) heals more in sun, less in other weather.
  // Roost also grounds the user for the turn (handled at use). Rest = full heal + sleep.
  const HEAL_MOVES = (() => {
    const t = {};
    const add = (name, frac, opts) => { t[normName(name)] = Object.assign({ frac }, opts || {}); };
    add('Recover', 0.5); add('Roost', 0.5, { roost: true }); add('Slack Off', 0.5);
    add('Soft-Boiled', 0.5); add('Milk Drink', 0.5); add('Heal Order', 0.5);
    add('Life Dew', 0.25); add('Floral Healing', 0.5); add('Jungle Healing', 0.25);
    add('Synthesis', 0.5, { weather: true }); add('Moonlight', 0.5, { weather: true });
    add('Morning Sun', 0.5, { weather: true });
    add('Rest', 1.0, { rest: true });
    return t;
  })();
  function healMoveInfo(move) { return HEAL_MOVES[normName(move.name)] || null; }

  // Variable-power moves: their data `pow` is a placeholder (often 1). Compute the
  // real base power from battle state so BOTH the damage engine and the AI agree.
  // Falls back to the move's listed pow for everything else.
  function effectivePower(move, attacker, defender) {
    const n = normName(move.name);
    const speedRatio = (atk, def) => {
      const a = STAGES ? STAGES.effStat(atk, 'SPE') : atk.stats.SPE;
      const d = Math.max(1, STAGES ? STAGES.effStat(def, 'SPE') : def.stats.SPE);
      return a / d;
    };
    // Electro Ball: faster user = stronger (canon tiers by speed ratio).
    if (n === normName('Electro Ball')) {
      const r = speedRatio(attacker, defender);
      return r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : r > 1 ? 60 : 40;
    }
    // Gyro Ball: SLOWER user = stronger. 25 * targetSpe / userSpe, capped 150.
    if (n === normName('Gyro Ball')) {
      const a = Math.max(1, STAGES ? STAGES.effStat(attacker, 'SPE') : attacker.stats.SPE);
      const d = STAGES ? STAGES.effStat(defender, 'SPE') : defender.stats.SPE;
      return Math.max(1, Math.min(150, Math.floor(25 * d / a)));
    }
    // Heavy Slam / Heat Crash: heavier user vs target → more power (we lack weights,
    // approximate by HP-stat bulk as a proxy so it isn't a flat 1).
    if (n === normName('Heavy Slam') || n === normName('Heat Crash')) {
      const ratio = (attacker.stats.HP || 1) / Math.max(1, defender.stats.HP || 1);
      return ratio >= 2 ? 120 : ratio >= 1.5 ? 100 : ratio >= 1.25 ? 80 : ratio >= 1 ? 60 : 40;
    }
    // Reversal / Flail: weaker (lower current HP%) user = stronger.
    if (n === normName('Reversal') || n === normName('Flail')) {
      const hpFrac = attacker.hp / attacker.maxHP;
      return hpFrac <= 0.04 ? 200 : hpFrac <= 0.10 ? 150 : hpFrac <= 0.20 ? 100 : hpFrac <= 0.35 ? 80 : hpFrac <= 0.68 ? 40 : 20;
    }
    // a listed power of <=1 is almost certainly a placeholder; treat as a modest hit
    return (typeof move.pow === 'number' && move.pow > 1) ? move.pow : (move.pow === 1 ? 50 : move.pow);
  }

  // moves that make the user faint after dealing damage (canonical self-KO).
  const SELF_KO = new Set(['explosion', 'selfdestruct', 'mistyexplosion'].map(normName));
  const isSelfKO = (move) => SELF_KO.has(normName(move.name));

  // recharge moves: after using one, the user must rest (lose its action) next turn.
  const RECHARGE = new Set([
    'hyperbeam', 'gigaimpact', 'rockwrecker', 'roaroftime', 'hydrocannon',
    'blastburn', 'frenzyplant', 'prismaticlaser',
  ].map(normName));
  const isRecharge = (move) => RECHARGE.has(normName(move.name));

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

  // move base priority bracket (canonical). Most moves are 0.
  const MOVE_PRIORITY = (() => {
    const t = {}; const p = (n, v) => { t[normName(n)] = v; };
    p('Fake Out', 3); p('First Impression', 2); p('Extreme Speed', 2); p('Feint', 2);
    p('Quick Attack', 1); p('Aqua Jet', 1); p('Bullet Punch', 1); p('Mach Punch', 1);
    p('Ice Shard', 1); p('Shadow Sneak', 1); p('Sucker Punch', 1); p('Vacuum Wave', 1);
    p('Water Shuriken', 1); p('Accelerock', 1); p('Jet Punch', 1); p('Flashstep', 1);
    p('Extreme Speed', 2);
    return t;
  })();
  // effective priority for a move used by `mon`, including ability modifiers.
  function movePriority(move, mon) {
    let pr = MOVE_PRIORITY[normName(move.name)] || 0;
    const isStatus = move.cls === 'Status' || !move.pow;
    const isHeal = /recover|roost|heal|rest|synthesis|moonlight|morning sun|milk drink|slack off|soft.?boiled|wish|draining kiss|drain|leech/i.test(move.name);
    if (mon) {
      if (ABIL.has(mon, 'Prankster') && isStatus) pr += 1;
      if (ABIL.has(mon, 'Gale Wings') && move.type === 'FLYING' && mon.hp >= mon.maxHP) pr += 1;
      if (ABIL.has(mon, 'Triage') && isHeal) pr += 3;
    }
    return pr;
  }

  // ---------- abilities (this increment: stat-stage family) ----------
  // Only abilities fully expressible with current systems are active; others
  // are recognized by name but no-op until their systems exist.
  const ABIL = {
    has(mon, name) { return mon.ability && normName(mon.ability) === normName(name); },
    // is `name` one we actively simulate?
    active: new Set(['intimidate', 'moxie', 'defiant', 'overgrow', 'blaze', 'torrent', 'swarm', 'adaptability', 'technician', 'tintedlens', 'reckless', 'sniper', 'solarpower', 'burninghot', 'steelyspirit', 'thickfat', 'heatproof', 'furcoat', 'fluffy', 'solidrock', 'flashfire', 'voltabsorb', 'waterabsorb', 'stormdrain', 'sapsipper', 'levitate', 'insomnia', 'vitalspirit', 'limber', 'immunity', 'magmaarmor', 'waterveil', 'purifyingsalt', 'static', 'flamebody', 'poisonpoint', 'roughskin', 'ironbarbs', 'stamina', 'weakarmor', 'angershell', 'berserk', 'angerpoint', 'rattled', 'aftermath', 'speedboost', 'moody', 'shedskin', 'hydration', 'regenerator', 'naturalcure', 'drought', 'drizzle', 'sandstream', 'sandspit', 'snowwarning', 'electricsurge', 'mistysurge', 'grassysurge', 'psychicsurge', 'chlorophyll', 'swiftswim', 'sandrush', 'slushrush', 'cloudnine', 'airlock', 'protean', 'libero', 'pixilate', 'refrigerate', 'aerilate', 'galvanize', 'liquidvoice', 'prankster', 'galewings', 'triage', 'gaiaguardian', 'sharpness', 'strongjaw', 'hustle', 'superluck', 'merciless', 'battlearmor', 'shellarmor', 'compoundeyes', 'unaware', 'sturdy', 'clearbody', 'whitesmoke', 'fullmetalbody', 'bigpecks', 'hypercutter', 'keeneye', 'soundproof', 'scrappy', 'earlybird', 'competitive'].map(normName)),
    isActive(name) { return name && ABIL.active.has(normName(name)); },
    // the abilities this mon can switch between via Sync Band (listed + hidden, deduped)
    pool(mon) { return (mon.abilityPool && mon.abilityPool.length) ? mon.abilityPool : (mon.ability ? [mon.ability] : []); },
    // ability that makes `mon` immune to / absorb a move of this type, if present in pool
    typeAbsorbAbility(type) {
      const map = { FIRE: 'Flash Fire', ELECTRIC: ['Volt Absorb', 'Motor Drive', 'Lightning Rod'], WATER: ['Water Absorb', 'Storm Drain', 'Dry Skin'], GRASS: 'Sap Sipper', GROUND: 'Levitate' };
      const e = map[type];
      return Array.isArray(e) ? e : (e ? [e] : []);
    },
    // Sync Band: pick the best ability in the pool for THIS turn, or null to just attack.
    // Syncing COSTS the turn, so we only do it when the edge clearly beats attacking:
    //  - defensively: swap to an ability that fully absorbs/negates the foe's likely move,
    //    or that blocks a status the foe is about to inflict;
    //  - offensively: swap to a clear damage-boost ability before our own big hit.
    // `cx` may carry { foeMove } (the foe's predicted move) and { incoming } (its avg dmg).
    syncChoice(mon, foe, cx) {
      const pool = ABIL.pool(mon);
      if (pool.length <= 1) return null;
      const cur = normName(mon.ability);
      const have = (name) => pool.some(a => normName(a) === normName(name));
      const fm = cx && cx.foeMove;            // predicted foe move object
      const incoming = (cx && cx.incoming) || 0; // its avg damage to us
      const bigHit = incoming >= mon.hp * 0.45;  // the foe move would really hurt

      // 1) DEFENSIVE — absorb the foe's incoming move type (only worth a turn if it'd hurt)
      if (fm && fm.cls !== 'Status' && fm.pow && bigHit) {
        const absorbers = ABIL.typeAbsorbAbility(fm.type);
        for (const ab of absorbers) {
          if (have(ab) && normName(ab) !== cur) return ab; // negates the hit entirely
        }
      }
      // 2) DEFENSIVE — block an incoming status the foe move would inflict
      if (fm) {
        const eff = moveStatusEffect(fm);
        if (eff && !ABIL.blocksStatus(mon, eff.code)) {
          const guards = { SLP: ['Insomnia', 'Vital Spirit', 'Sweet Veil'], BRN: ['Water Veil', 'Thermal Exchange'], PAR: ['Limber'], FRZ: ['Magma Armor'], PSN: ['Immunity', 'Pastel Veil'], TOX: ['Immunity', 'Pastel Veil'] }[eff.code] || [];
          const universal = ['Purifying Salt'];
          for (const ab of [...guards, ...universal]) {
            if (have(ab) && normName(ab) !== cur) return ab;
          }
        }
      }
      // 3) OFFENSIVE — only when we're NOT under heavy fire (a free-ish turn): swap to a
      // clear power booster we don't already have. Conservative: needs the matchup safe.
      if (!bigHit) {
        // pinch boosters matter at low HP; type/power boosters always help our STAB
        const stab = mon.types || [];
        const offensive = [];
        if (mon.hp <= mon.maxHP / 3) { offensive.push('Overgrow', 'Blaze', 'Torrent', 'Swarm', 'Solar Power'); }
        offensive.push('Burning Hot', 'Steely Spirit', 'Sharpness', 'Strong Jaw', 'Technician', 'Adaptability');
        for (const ab of offensive) {
          if (have(ab) && normName(ab) !== cur) {
            // require the boost to actually apply to our typing where type-specific
            if (ab === 'Overgrow' && !stab.includes('GRASS')) continue;
            if (ab === 'Blaze' && !stab.includes('FIRE')) continue;
            if (ab === 'Torrent' && !stab.includes('WATER')) continue;
            if (ab === 'Swarm' && !stab.includes('BUG')) continue;
            if ((ab === 'Burning Hot' || ab === 'Solar Power') && !stab.includes('FIRE')) continue;
            if (ab === 'Steely Spirit' && !stab.includes('STEEL')) continue;
            return ab;
          }
        }
      }
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
      // slicing / biting boosters
      if (ABIL.has(attacker, 'Sharpness') && /cut|slash|slice|aerial ace|air slash|psycho cut|night slash|leaf blade|sacred sword|x-scissor|cross poison|kowtow|stone axe|ceaseless/i.test(move.name)) m *= 1.5;
      if (ABIL.has(attacker, 'Strong Jaw') && /bite|crunch|fang|jaw|chomp|hyper fang|psychic fangs/i.test(move.name)) m *= 1.5;
      // Hustle: +50% physical power (accuracy cut handled in computeDamage)
      if (ABIL.has(attacker, 'Hustle') && move.cls === 'Physical') m *= 1.5;
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
    // crit chance: Super Luck / high-crit; Battle Armor / Shell Armor prevent crits against
    critChance(attacker, defender, base) {
      if (ABIL.has(defender, 'Battle Armor') || ABIL.has(defender, 'Shell Armor')) return 0;
      let c = base;
      if (ABIL.has(attacker, 'Super Luck')) c *= 2;
      if (ABIL.has(attacker, 'Merciless') && (defender.status === 'PSN' || defender.status === 'TOX')) c = 1; // always crit poisoned
      return c;
    },
    // accuracy modifiers: Compound Eyes (+30%), Hustle (-20% on physical)
    accMultFor(attacker, move) {
      let a = 1;
      if (ABIL.has(attacker, 'Compound Eyes')) a *= 1.3;
      if (ABIL.has(attacker, 'Hustle') && move.cls === 'Physical') a *= 0.8;
      return a;
    },
    // Unaware: ignore the foe's stat stages (both directions). Used in damage stat reads.
    unaware(mon) { return ABIL.has(mon, 'Unaware'); },
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
    // -ate abilities: a Normal-type move becomes another type (and gains ×1.2).
    // returns {type, mult} or null. Liquid Voice converts sound moves to Water.
    ateType(attacker, move) {
      if (move.cls === 'Status' || !move.pow) return null;
      const soundMove = /voice|sound|screech|hyper voice|boomburst|snarl|chatter|round|echoed|overdrive|sing|growl|roar|noble roar|disarming/i.test(move.name);
      if (ABIL.has(attacker, 'Liquid voice') && soundMove) return { type: 'WATER', mult: 1 };
      if (move.type !== 'NORMAL') return null;
      if (ABIL.has(attacker, 'Pixilate')) return { type: 'FAIRY', mult: 1.2 };
      if (ABIL.has(attacker, 'Refrigerate')) return { type: 'ICE', mult: 1.2 };
      if (ABIL.has(attacker, 'Aerilate')) return { type: 'FLYING', mult: 1.2 };
      if (ABIL.has(attacker, 'Galvanize')) return { type: 'ELECTRIC', mult: 1.2 };
      return null;
    },
    // Protean/Libero: the user's type becomes the move's (effective) type before attacking.
    protean(attacker) { return ABIL.has(attacker, 'Protean') || ABIL.has(attacker, 'Libero'); },
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
    // can the opponent lower this stat on `mon`? (Clear Body / Big Pecks / Hyper Cutter / White Smoke)
    blocksStatDrop(mon, stat) {
      if (ABIL.has(mon, 'Clear Body') || ABIL.has(mon, 'White Smoke') || ABIL.has(mon, 'Full Metal Body')) return true;
      if (stat === 'DEF' && ABIL.has(mon, 'Big Pecks')) return true;
      if (stat === 'ATK' && ABIL.has(mon, 'Hyper Cutter')) return true;
      if (stat === 'ACC' && ABIL.has(mon, 'Keen Eye')) return true;
      return false;
    },
    // immune to a move entirely by ability (sound / etc.) — extends the type immune() check
    blocksMove(defender, move) {
      const sound = /voice|sound|screech|hyper voice|boomburst|snarl|chatter|round|echoed|overdrive|sing|roar|noble roar|disarming|bug buzz|uproar|clanging|metal sound|growl/i.test(move.name);
      if (sound && ABIL.has(defender, 'Soundproof')) return `It doesn't affect ${defender.name} — Soundproof!`;
      if (move.cls !== 'Status' && move.pow && /punch|pound|thunder punch|fire punch|ice punch|mach punch|bullet punch|sucker|drain punch|focus punch|hammer/i.test(move.name) && ABIL.has(defender, 'Bulletproof')) return null;
      return null;
    },
    // Scrappy: Normal/Fighting moves can hit Ghost (ignore immunity)
    scrappy(attacker) { return ABIL.has(attacker, 'Scrappy'); },
    // sleep wakes faster with Early Bird (counts down 2)
    earlyBird(mon) { return ABIL.has(mon, 'Early Bird'); },
    // is a move "contact" (physical, roughly)? used by contact-trigger abilities.
    isContact(move) { return move && move.cls === 'Physical'; },
    // ---- HOOK: after a damaging hit connects ----
    // The DEFENDER's reactive abilities (contact status/chip, on-hit buffs).
    // Returns a list of effect descriptors the engine applies: {type, ...}.
    onHitTaken(defender, attacker, move, dealtPct, rng) {
      const out = [];
      const contact = ABIL.isContact(move);
      // contact → status the attacker (30%) — only if attacker statusable
      if (contact) {
        if (ABIL.has(defender, 'Static')) out.push({ type: 'statusFoe', code: 'PAR', chance: 0.3 });
        if (ABIL.has(defender, 'Flame Body')) out.push({ type: 'statusFoe', code: 'BRN', chance: 0.3 });
        if (ABIL.has(defender, 'Poison Point')) out.push({ type: 'statusFoe', code: 'PSN', chance: 0.3 });
        if (ABIL.has(defender, 'Cute Charm')) { /* infatuation not modeled — skip */ }
        // contact → chip the attacker 1/8 (Rough Skin / Iron Barbs)
        if (ABIL.has(defender, 'Rough Skin') || ABIL.has(defender, 'Iron Barbs')) out.push({ type: 'chipFoe', frac: 1 / 8, ability: ABIL.has(defender, 'Rough Skin') ? 'Rough Skin' : 'Iron Barbs' });
      }
      // on-hit self buffs (regardless of contact)
      if (ABIL.has(defender, 'Stamina')) out.push({ type: 'selfStat', stat: 'DEF', delta: 1, ability: 'Stamina' });
      if (ABIL.has(defender, 'Weak Armor') && move.cls === 'Physical') out.push({ type: 'selfStat2', changes: [['DEF', -1], ['SPE', 2]], ability: 'Weak Armor' });
      if (ABIL.has(defender, 'Rattled') && (move.type === 'DARK' || move.type === 'GHOST' || move.type === 'BUG')) out.push({ type: 'selfStat', stat: 'SPE', delta: 1, ability: 'Rattled' });
      // Anger Point: max Attack on a crit (handled with crit flag at call site)
      return out;
    },
    // Berserk: +1 SpA when this hit drops the defender below half (and it lives)
    berserkTrigger(defender, hpBefore, hpAfter) {
      return ABIL.has(defender, 'Berserk') && hpAfter > 0 && hpBefore > defender.maxHP / 2 && hpAfter <= defender.maxHP / 2;
    },
    // Anger Shell: at <half HP from a hit → +Atk/+SpA/+Spe, -Def/-SpD
    angerShellTrigger(defender, hpBefore, hpAfter) {
      return (ABIL.has(defender, 'Anger Shell') || ABIL.has(defender, 'Anger shell')) && hpAfter > 0 && hpBefore > defender.maxHP / 2 && hpAfter <= defender.maxHP / 2;
    },
    // ---- HOOK: when a mon faints ----
    // Aftermath: if fainted by a contact move, chip the attacker 1/4.
    aftermath(fainted, attacker, move) {
      return ABIL.has(fainted, 'Aftermath') && ABIL.isContact(move) && attacker && !attacker.fainted;
    },
    // ---- HOOK: end of turn (self effects) ----
    endOfTurn(mon, rng) {
      const out = [];
      if (mon.fainted) return out;
      if (ABIL.has(mon, 'Speed Boost')) out.push({ type: 'stat', stat: 'SPE', delta: 1, ability: 'Speed Boost' });
      if (ABIL.has(mon, 'Moody')) {
        // +2 to one random stat, -1 to a different one
        const keys = ['ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
        const up = keys[Math.floor(rng() * keys.length)];
        let down = up; while (down === up) down = keys[Math.floor(rng() * keys.length)];
        out.push({ type: 'stat2', changes: [[up, 2], [down, -1]], ability: 'Moody' });
      }
      if (mon.status && (ABIL.has(mon, 'Shed Skin')) && rng() < (1 / 3)) out.push({ type: 'cure', ability: 'Shed Skin' });
      if (mon.status && ABIL.has(mon, 'Hydration')) out.push({ type: 'cureIfRain', ability: 'Hydration' });
      // Gaia Guardian: in Grassy Terrain, terraform to add the LIGHT type (Guardian Form)
      if (ABIL.has(mon, 'Gaia Guardian')) out.push({ type: 'formGrassy', ability: 'Gaia Guardian' });
      return out;
    },
    // ---- HOOK: on switch-out ----
    // Regenerator: heal 1/3 on switch out. Natural Cure: clear status on switch out.
    onSwitchOut(mon) {
      const out = {};
      if (ABIL.has(mon, 'Regenerator')) out.heal = Math.floor(mon.maxHP / 3);
      if (ABIL.has(mon, 'Natural Cure')) out.cure = true;
      return out;
    },
  };


  // moveNames (optional): explicit moveset (manual pick or imported share code).
  //   When omitted/empty, auto-pick the 4 strongest damaging moves (random teams).
  // spec (optional): { evs:{HP..SPE}, ivs:{HP..SPE}, nature } — defaults to
  //   max IVs, neutral nature, no EVs (a clean level-scaled mon).
  function buildMon(dex, level, moveNames, rng, spec) {
    const d = byDex(dex);
    if (!d) return null;
    // coerce level defensively: only a finite number is valid, else 50. Normal mons
    // cap at 100; boss builds may exceed it (e.g. Nightmare L125) via allowOverLevel.
    let L = Number(level);
    if (!Number.isFinite(L)) L = 50;
    const cap = (spec && spec.allowOverLevel) ? 200 : 100;
    L = Math.max(1, Math.min(cap, Math.round(L)));
    const ivs = (spec && spec.ivs) || maxIVs();
    const evs = (spec && spec.evs) || freshEVs();
    const nature = (spec && spec.nature && NATURES[spec.nature]) ? spec.nature : 'Hardy';
    const stats = {};
    STAT_KEYS.forEach(k => {
      stats[k] = computeStat(d.stats[k], k, L, ivs[k] == null ? 31 : ivs[k], evs[k] || 0, nature);
    });
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
      evs: { ...evs }, ivs: { ...ivs }, nature,
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
  //   [ { dex:'006', moves:['Flamethrower', ...], evs, ivs, nature }, ... ]
  function buildFromMembers(members, level) {
    const L = (typeof level === 'number' && Number.isFinite(level)) ? level : 50;
    return (members || [])
      .map(m => buildMon(m.dex, L, m.moves, undefined, { evs: m.evs, ivs: m.ivs, nature: m.nature }))
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

  // a random legal team of N distinct mons. tier ('normal'|'hard') sets stat
  // quality: normal = random IVs / no EVs / random nature; hard = max IVs /
  // smart 510 EVs / ideal nature.
  function randomTeam(n, rng, level, tier) {
    const pool = DEX.filter(d => !d.undiscovered && d.stats.HP > 0);
    const chosen = [];
    const used = new Set();
    while (chosen.length < n && used.size < pool.length) {
      const d = pool[Math.floor(rng() * pool.length)];
      if (used.has(d.dex)) continue;
      used.add(d.dex);
      chosen.push(buildMon(d.dex, level || 50, null, rng, randomSpec(d.stats, tier === 'hard' ? 'hard' : 'normal', rng)));
    }
    return chosen;
  }

  // BOSS team "Pokedex Fillers": an openly-labeled, maximally-hard opponent named
  // as a tribute to the project's backer. Not hidden — the UI announces it and the
  // boss is visibly buffed. Strongest legal roster at level 100 with a flat stat
  // multiplier and hand-picked optimal moves.
  const BOSS_NAME = 'Pokedex Fillers';
  const VAERETH_ROSTER = [
    // each: max IVs, 252 attacking stat / 252 Speed / 4 HP, offensive nature.
    { dex: '069', moves: ['Rock Wrecker', 'Liquidation', 'Aqua Jet', 'Brine'], nature: 'Adamant', evs: { HP: 4, ATK: 252, SPE: 252 } },          // Sedimonk [ROCK/WATER]
    { dex: '073', moves: ['Rock Wrecker', 'Kowtow Cleave', 'Night Slash', 'Psycho Cut'], nature: 'Jolly', evs: { HP: 4, ATK: 252, SPE: 252 } }, // Sedirogue [ROCK/DARK] — fast, Jolly to outspeed
    { dex: '074', moves: ['Rock Wrecker', 'Icicle Crash', 'Ice Shard', 'Stone Axe'], nature: 'Adamant', evs: { HP: 4, ATK: 252, SPE: 252 } },   // Sediserker [ROCK/ICE]
    { dex: '006', moves: ['Burn Up', 'Supernova', 'Slam', 'Ember'], nature: 'Timid', evs: { HP: 4, SPA: 252, SPE: 252 } },                       // Galeliadea [FIRE/COSMIC] — fast special
    { dex: '071', moves: ['Electro Shot', 'Rock Wrecker', 'Crystalize', 'Signal Beam'], nature: 'Modest', evs: { HP: 4, SPA: 252, SPE: 252 } },  // Sedificer [ROCK/ELECTRIC]
    { dex: '099', moves: ['Water Spout', 'Steel Wing', 'Aerial Ace', 'Water Gun'], nature: 'Modest', evs: { HP: 4, SPA: 252, SPE: 252 } },       // Writrout [WATER/FLYING]
  ];
  const VAERETH_LEVEL = 100;
  const VAERETH_STAT_MULT = 0.85; // NORMAL boss: rebalanced as the accessible tier — a real fight but winnable (~30-40% for a good team), clearly easier than Hard
  // HARD mode uses a completely different, far stronger team (Normal's roster is a
  // placeholder for the owner's favourites; Hard is the real gauntlet). These six
  // are high-BST, type-diverse threats — no single sleep/counter strategy sweeps
  // them. The species alone are brutal; the multiplier is a fine-tune on top.
  // 1.20x + boss status immunity (see STATUS.canApply) closes the paralysis-stall
  // exploit that let ~10 players clear the old version. Best known team now wins
  // ~0.5%, random optimized teams ~0.1% — a true "almost nobody" gauntlet.
  const VAERETH_HARD_MULT = 1.00; // tuned vs OPTIMIZED cheese (not just random): with status immunity + expert AI + smart switching, 1.00x lands strong setup/stall teams ~20-26% and priority spam ~7%, random teams ~0.3%. A fair "good players can crack it" middle tier. Below ~1.00 the boss gets out-sped and cheese jumps toward ~100% (sharp cliff), so this is the stable floor.
  const VAERETH_HARD_ROSTER = [
    { dex: '083', moves: ['Shell Burst', 'Supernova', 'Brightcannon', 'Will-O-Wisp'], nature: 'Modest' }, // Colapsore [COSMIC/LIGHT] — bulky special wall + burns
    { dex: '107', moves: ['Eruption', 'Fiery Wrath', 'Burning Jealousy', 'Thunder Wave'], nature: 'Timid' }, // Cerbament [FIRE/DARK] — Eruption nuke
    { dex: '051', moves: ['Swords Dance', 'Extreme Speed', 'Duality', 'Crunch'], nature: 'Jolly' },          // Equinine [LIGHT/DARK] — setup + priority
    { dex: '073', moves: ['Rock Wrecker', 'Kowtow Cleave', 'Night Slash', 'Psycho Cut'], nature: 'Jolly' }, // Sedirogue [ROCK/DARK] — fastest
    { dex: '092', moves: ['Bulk Up', 'Close Combat', 'Hurricane', 'Drain Punch'], nature: 'Jolly' },         // Mangmight [FLYING/FIGHTING] — bulky setup
    { dex: '009', moves: ['Calm Mind', 'Hydro Pump', 'Meteor Beam', 'Hyper Voice'], nature: 'Modest' },      // Kodinaut [WATER/NORMAL] — special tank
  ];
  // Nightmare: the ultimate tier. Same brutal Hard roster + expert AI, but at
  // level 125, attacks always roll max damage (see maxRoll in damage calc), and a
  // stat multiplier tuned so essentially nobody clears it (target: 2-3 people ever).
  const VAERETH_NIGHTMARE_LEVEL = 125;
  const VAERETH_NIGHTMARE_MULT = 0.92; // L125 + guaranteed max-damage rolls already add huge power; this leaves a ~1-in-10000 crack for a legendary run (2-3 people ever)
  // Nightmare gets its OWN default roster — a hard counter to the dominant community
  // meta team (Kodinaut/Equinine/Cerbament/Colapsore/Sediserker/Mangmight), built
  // around Water + Fighting + Grass + Light STAB that punishes that exact lineup,
  // while still testing ~0% vs generic optimized teams. The adaptive system shifts
  // movesets further from here as the meta moves.
  const VAERETH_NIGHTMARE_ROSTER = [
    { dex: '099', moves: ['Water Spout', 'Hurricane', 'Hydro Pump', 'Ice Beam'], nature: 'Modest' },   // Writrout [WATER/FLYING] — fast special spout, hits 4 of the meta
    { dex: '028', moves: ['Swords Dance', 'Close Combat', 'Seed Bomb', 'Mach Punch'], nature: 'Adamant' }, // Peaknight [GRASS/FIGHTING] — punishes Kodinaut/Sediserker/Cerbament + priority
    { dex: '069', moves: ['Shell Smash', 'Hydro Pump', 'Rock Wrecker', 'Ice Beam'], nature: 'Modest' },  // Sedimonk [ROCK/WATER] — Shell Smash sweeper, Rock vs Mangmight/Cerbament
    { dex: '070', moves: ['Energy Ball', 'Power Whip', 'Rock Wrecker', 'Earth Power'], nature: 'Modest' }, // Sedruid [ROCK/GRASS] — Grass coverage vs the Water/Normal/Rock mons
    { dex: '051', moves: ['Swords Dance', 'Extreme Speed', 'Duality', 'Crunch'], nature: 'Jolly' },       // Equinine [LIGHT/DARK] — Light vs Colapsore/Mangmight + priority pickoff
    { dex: '083', moves: ['Shell Burst', 'Supernova', 'Brightcannon', 'Heat Wave'], nature: 'Modest' },   // Colapsore [COSMIC/LIGHT] — BST550 nuke anchor
  ];

  // ---- Adaptive Nightmare boss (moveset-only) ------------------------------
  // The Nightmare boss keeps its fixed, hand-tuned 6 mons (so it stays strong) but
  // shifts each mon's MOVESET toward coverage that punishes the recent community
  // meta. `meta` = { typeCounts: {TYPE: n} } from the last ~50 logged attempts.
  // For each boss mon, if one of its legal moves is super-effective against a
  // common player type, that move is prioritized into its set. Never weakens the
  // mon (it only swaps in legal, on-type or coverage moves it can actually learn).
  function metaThreatTypes(meta) {
    if (!meta || !meta.typeCounts) return [];
    return Object.entries(meta.typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(e => e[0]);
  }
  // priority attacks the engine actually implements (used to revenge-KO setup sweepers)
  const PRIORITY_MOVES = ['Extreme Speed', 'Fake Out', 'First Impression', 'Quick Attack', 'Aqua Jet', 'Bullet Punch', 'Mach Punch', 'Ice Shard', 'Shadow Sneak', 'Sucker Punch', 'Vacuum Wave', 'Accelerock', 'Jet Punch'];
  // choose up to 4 moves for a boss mon: keep its strongest STAB/setup, then fill
  // with the best coverage vs the meta types — and bias by the community's dominant
  // ARCHETYPE using only mechanics the engine truly implements:
  //   setup-heavy meta  → ensure a PRIORITY move so the boss revenge-KOs sweepers
  //   stall-heavy meta   → prefer the highest raw-power coverage to break walls
  //   offense/mixed      → standard best-coverage
  function adaptMoveset(dex, baseMoves, threats, archetype) {
    if (!threats.length) return baseMoves;
    const learn = learnableMovesFor(dex).map(n => findMove(n)).filter(Boolean);
    if (!learn.length) return baseMoves;
    const stallMeta = archetype === 'stall';
    // score each learnable damaging move by effectiveness vs meta (and, vs stall,
    // weight raw power more so walls get broken rather than chipped).
    const coverage = learn.filter(m => m.pow && m.pow > 1).map(m => {
      let best = 0;
      threats.forEach((t, i) => { const e = eff(m.type, t) / (i + 1); if (e > best) best = e; });
      const powScore = stallMeta ? (m.pow / 40) : 0; // vs stall, favour heavy hits
      return { m, cover: best, pow: m.pow, rank: best + powScore };
    }).filter(x => x.cover > 1).sort((a, b) => (b.rank - a.rank) || (b.pow - a.pow));
    const keep = baseMoves.slice(0, 2);
    let out = keep.slice();
    for (const c of coverage) {
      if (out.length >= 4) break;
      if (!out.some(n => normName(n) === normName(c.m.name))) out.push(c.m.name);
    }
    // vs a setup-heavy meta: guarantee a priority move if this mon can learn one and
    // doesn't already have it, swapping out the weakest non-STAB slot. Priority lets
    // the boss pick off +1/+2 sweepers before they sweep.
    if (archetype === 'setup') {
      const hasPriority = out.some(n => PRIORITY_MOVES.some(p => normName(p) === normName(n)));
      if (!hasPriority) {
        const learnable = PRIORITY_MOVES.map(p => findMove(p)).filter(pm => pm && learn.some(l => normName(l.name) === normName(pm.name)));
        if (learnable.length) {
          // strongest learnable priority move (prefers STAB-ish high power)
          learnable.sort((a, b) => (b.pow || 0) - (a.pow || 0));
          if (out.length >= 4) out[3] = learnable[0].name; else out.push(learnable[0].name);
        }
      }
    }
    // top up from remaining base moves if short
    for (const bm of baseMoves) { if (out.length >= 4) break; if (!out.some(n => normName(n) === normName(bm))) out.push(bm); }
    return out.slice(0, 4);
  }

  function buildVaerethBoss(aiMode, meta) {
    const hard = aiMode === 'hard';
    const nightmare = aiMode === 'nightmare';
    const tough = hard || nightmare; // both get the 560 spread
    let roster = nightmare ? VAERETH_NIGHTMARE_ROSTER : (hard ? VAERETH_HARD_ROSTER : VAERETH_ROSTER);
    // Nightmare adapts each mon's MOVESET to counter the recent meta (roster fixed).
    if (nightmare && meta) {
      const threats = metaThreatTypes(meta);
      if (threats.length) roster = roster.map(r => ({ ...r, moves: adaptMoveset(r.dex, r.moves, threats, meta.archetype) }));
    }
    const mult = nightmare ? VAERETH_NIGHTMARE_MULT : (hard ? VAERETH_HARD_MULT : VAERETH_STAT_MULT);
    const level = nightmare ? VAERETH_NIGHTMARE_LEVEL : VAERETH_LEVEL;
    const team = roster.map(r => {
      const d = byDex(r.dex);
      // tough tiers run beyond the legal 510 EV cap. Hard: 560 (+50). Nightmare: 600
      // (+90) — an extra spread on top of its L125/max-roll edge. Normal: its hand set.
      const evs = tough ? idealEVs(d.stats, EV_TOTAL_MAX + (nightmare ? 90 : 50)) : r.evs;
      const m = buildMon(r.dex, level, r.moves, undefined, { evs, ivs: maxIVs(), nature: r.nature, allowOverLevel: true });
      if (!m) return null;
      // flat stat buff (visible in inspector) — the boss is openly stronger
      STAT_KEYS.forEach(k => { m.stats[k] = Math.floor(m.stats[k] * mult); });
      m.maxHP = m.stats.HP; m.hp = m.maxHP;
      m.boss = true;
      if (nightmare) {
        m.maxRoll = true; // every attack rolls the top of its damage range
        // Nightmare boss EXCLUSIVELY: any move below 90% accuracy is raised to 90%.
        // Clone the move objects so we never mutate the shared global move data.
        m.moves = m.moves.map(mv => (typeof mv.acc === 'number' && mv.acc < 90) ? { ...mv, acc: 90 } : mv);
      }
      return m;
    }).filter(Boolean);
    // Tell (#2): when adapting, the boss LEADS with the mon best suited to the meta —
    // a visible behavioural change. Lead pick = best offensive matchup vs the top
    // threat types. This makes the adaptation noticeable from turn one.
    if (nightmare && meta) {
      const threats = metaThreatTypes(meta);
      if (threats.length) {
        const leadScore = (m) => {
          let s = 0;
          threats.forEach((t, i) => { let best = 1; (m.types || []).forEach(at => { const e = eff(at, t); if (e > best) best = e; }); s += best / (i + 1); });
          return s;
        };
        team.sort((a, b) => leadScore(b) - leadScore(a));
      }
    }
    return team;
  }

  // ---------- damage calc ----------
  function typeMult(moveType, defTypes) {
    return defTypes.reduce((m, t) => m * eff(moveType, t), 1);
  }
  function computeDamage(attacker, defender, move, rng, fieldCtx) {
    if (move.cls === 'Status' || !move.pow) return { dmg: 0, eff: 1, crit: false, missed: false };
    // -ate abilities can change the move's effective type (and add ×1.2)
    const ate = ABIL.ateType(attacker, move);
    const effType = ate ? ate.type : move.type;
    const ateMult = ate ? ate.mult : 1;
    const emove = (effType === move.type) ? move : { ...move, type: effType };
    // ability-based type immunity / absorption (before accuracy/damage)
    const imm = ABIL.immune(defender, emove);
    if (imm) return { dmg: 0, eff: 0, crit: false, missed: false, immune: true, immuneInfo: imm };
    // ability-based full move immunity (Soundproof vs sound moves)
    const bm = ABIL.blocksMove(defender, move);
    if (bm) return { dmg: 0, eff: 0, crit: false, missed: false, immune: true, immuneInfo: { heal: false, line: bm } };
    // accuracy — modified by the attacker's ACC and defender's EVA stages
    {
      const accStage = ((attacker.boosts && attacker.boosts.ACC) || 0) - ((defender.boosts && defender.boosts.EVA) || 0);
      const baseAcc = (typeof move.acc === 'number' && move.acc > 0) ? move.acc : 100;
      const abilAcc = ABIL.accMultFor(attacker, move);
      if (baseAcc < 100 || accStage !== 0 || abilAcc !== 1) {
        const effAcc = baseAcc * STAGES.accMult(accStage) * abilAcc;
        if (rng() * 100 >= effAcc) return { dmg: 0, eff: 1, crit: false, missed: true };
      }
    }
    // Unaware ignores the foe's stat stages: attacker ignores defender's DEF/SPD boosts;
    // defender ignores attacker's ATK/SPA boosts.
    const atkIgnore = ABIL.unaware(defender); // defender unaware → ignore attacker's offense boosts
    const defIgnore = ABIL.unaware(attacker); // attacker unaware → ignore defender's defense boosts
    const rawStat = (mon, key, ignore) => ignore ? Math.max(1, mon.stats[key]) : STAGES.effStat(mon, key);
    const atkStat = move.cls === 'Physical' ? rawStat(attacker, 'ATK', atkIgnore) : rawStat(attacker, 'SPA', atkIgnore);
    const defStat = move.cls === 'Physical' ? rawStat(defender, 'DEF', defIgnore) : rawStat(defender, 'SPD', defIgnore);
    const L = attacker.level;
    const effPow = effectivePower(move, attacker, defender);
    let base = Math.floor(Math.floor((Math.floor((2 * L) / 5) + 2) * effPow * atkStat / defStat) / 50) + 2;
    // STAB uses the EFFECTIVE type (Protean already set attacker's types to match; -ate changes type)
    const stab = attacker.types.includes(effType) ? ((ABIL.has(attacker, 'Adaptability') || ABIL.has(attacker, 'Adaptablility')) ? 2 : 1.5) : 1;
    let te = typeMult(effType, defender.types);
    // Scrappy: Normal/Fighting moves ignore Ghost-type immunity
    if (te === 0 && ABIL.scrappy(attacker) && (effType === 'NORMAL' || effType === 'FIGHTING') && defender.types.includes('GHOST')) {
      const nonGhost = defender.types.filter(t => t !== 'GHOST');
      te = nonGhost.length ? nonGhost.reduce((m, t) => m * eff(effType, t), 1) : 1;
    }
    const crit = rng() < ABIL.critChance(attacker, defender, 1 / 16);
    const critMult = ABIL.critMultFor(attacker, crit);
    // Nightmare boss attacks always roll the top of the damage spread.
    const roll = attacker.maxRoll ? 1.0 : (0.85 + rng() * 0.15); // 0.85–1.00
    // Phase 1 uses no EV/IV investment, which makes frail mons extremely glassy.
    // A modest scalar lengthens battles so switching and matchups actually matter.
    const SCALE = 0.6;
    const burn = STATUS.burnFactor(attacker, move); // burned attacker: physical ×0.5
    // weather + terrain multipliers (fieldCtx = {weather, terrain})
    let wmult = 1, tmult = 1;
    if (fieldCtx) {
      if (fieldCtx.weather) wmult = FIELD.weatherDamage(fieldCtx.weather, effType);
      if (fieldCtx.terrain) tmult = FIELD.terrainDamage(fieldCtx.terrain, effType, FIELD.grounded(attacker));
    }
    const aMult = ABIL.attackMult(attacker, defender, emove, te);
    const dMult = ABIL.defendMult(defender, emove, te);
    let dmg = Math.floor(base * stab * te * critMult * roll * SCALE * burn * wmult * tmult * aMult * dMult * ateMult);
    if (te > 0) dmg = Math.max(1, dmg);
    // Sturdy: survive a would-be OHKO from full HP at 1 HP (no Magic Guard interaction)
    if (dmg >= defender.hp && defender.hp === defender.maxHP && ABIL.has(defender, 'Sturdy')) {
      dmg = defender.maxHP - 1;
      return { dmg, eff: te, crit, missed: false, sturdy: true };
    }
    return { dmg, eff: te, crit, missed: false };
  }

  // ---------- AI: score each move by expected value ----------
  // ---------- AI difficulty ----------
  // 'normal' preserves the original greedy 1-ply behavior. 'hard' enables
  // speed-aware KO logic, a survival check, situational status/setup valuation,
  // ability-immunity awareness, and smarter (hazard/immunity-aware) switching.
  // The flag is read from the closure variable `aiMode` set per-battle.

  // type multiplier that also respects ability-based immunities (Levitate,
  // Flash Fire, Volt Absorb, etc.) and -ate type changes — so the AI doesn't
  // fire moves into immunities. Falls back to plain typeMult on Normal.
  function aiTypeMult(attacker, defender, move) {
    const ate = ABIL.ateType(attacker, move);
    const effType = ate ? ate.type : move.type;
    const emove = (effType === move.type) ? move : { ...move, type: effType };
    if (ABIL.immune(defender, emove)) return 0;
    if (ABIL.blocksMove(defender, move)) return 0;
    return typeMult(effType, defender.types) * (ate ? ate.mult : 1);
  }

  // effective in-battle speed (paralysis + weather speed abilities), matching
  // the turn loop's own calculation so the AI can reason about move order.
  // `wx` (current weather) is passed in since this lives outside simulate's scope.
  function aiSpeed(mon, wx) {
    let mult = 1;
    if (wx === 'SUN' && ABIL.has(mon, 'Chlorophyll')) mult = 2;
    else if (wx === 'RAIN' && ABIL.has(mon, 'Swift Swim')) mult = 2;
    else if (wx === 'SAND' && ABIL.has(mon, 'Sand Rush')) mult = 2;
    else if (wx === 'HAIL' && ABIL.has(mon, 'Slush Rush')) mult = 2;
    return Math.floor(STATUS.speed(mon) * mult);
  }

  function bestMove(attacker, defender, ctx) {
    const cx = ctx || {};
    let best = null, bestScore = -1;
    attacker.moves.forEach(move => {
      let score;
      if (move.cls === 'Status' || !move.pow) {
        const hard = cx.mode === 'hard';
        // value a status move only if it would actually land something useful:
        // foe must be statusable and not immune; otherwise it's near-useless.
        const eff2 = moveStatusEffect(move);
        const stat2 = moveStatEffect(move);
        const heal2 = healMoveInfo(move);
        if (heal2) {
          // value healing smoothly (no hard cliff) as a function of how much HP is
          // missing AND how hard the foe hits — you heal more when low and under real
          // pressure, less when barely scratched or when a trade would do.
          const missing = 1 - attacker.hp / attacker.maxHP;
          if (missing < 0.12) score = 0.5;                  // basically full — don't waste the turn
          else {
            // threat: fraction of our max HP the foe takes per turn (default ~20%).
            const threat = (hard && cx.foeBestDmg != null)
              ? Math.max(0.05, Math.min(1, cx.foeBestDmg / attacker.maxHP))
              : 0.2;
            // smooth curve (no hard cliff): climbs with missing HP, and much faster
            // when the foe hits hard — a low-HP mon under heavy fire should heal even
            // if it has a strong attack, but a healthy mon or one facing a weak foe
            // keeps attacking. Calibrated against attack scores that run ~150-250.
            score = Math.pow(missing, 1.3) * (90 + threat * 520);
            if (hard && cx.foeBestDmg != null) {
              const healAmt = attacker.maxHP * (heal2.rest ? 1 : 0.5);
              const healed = Math.min(attacker.maxHP, attacker.hp + healAmt);
              if (cx.foeBestDmg >= healed) score *= 0.2;     // foe KOs through the heal anyway — pointless
              if (heal2.rest && missing < 0.6) score *= 0.6; // Rest sleeps us — only when desperate
            }
          }
          // anti-stall: if our own best attack can't meaningfully outpace the foe's
          // bulk, healing only prolongs a fight we can't win — don't loop on it.
          if (cx.myBestDmg != null && defender.hp != null && cx.myBestDmg < defender.hp * 0.16) score *= 0.1;
        } else if (eff2 && STATUS.canApply(defender, eff2.code)) {
          // crippling statuses (PAR/SLP/TOX/BRN) are worth more than a chip move
          const weight = { SLP: 30, PAR: 26, TOX: 24, BRN: 20, FRZ: 22, PSN: 14 }[eff2.code] || 12;
          score = weight * eff2.chance;
          if (hard) {
            // paralysis is far better against a foe that currently outspeeds us
            if (eff2.code === 'PAR' && cx.foeSpeed != null && cx.mySpeed != null && cx.foeSpeed > cx.mySpeed) score *= 1.8;
            // burn shines against a physical attacker; toxic against a bulky wall we can't break
            if (eff2.code === 'BRN' && cx.foeBestDmg != null && cx.foeBestPhysical) score *= 1.4;
            if (eff2.code === 'TOX' && cx.myBestDmg != null && cx.myBestDmg < defender.hp * 0.4) score *= 1.5;
          }
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
            if (hard) {
              // setting up is much safer when the foe can't KO us this turn,
              // and much riskier when it can — bias accordingly.
              if (cx.foeBestDmg != null) {
                if (cx.foeBestDmg >= attacker.hp) score *= 0.25;       // would be KO'd mid-setup
                else if (cx.foeBestDmg < attacker.hp * 0.35) score *= 1.4; // free setup window
              }
              // paralysis counter-play: when crippled (slow + 25% to lose the turn),
              // burning turns on setup is exactly what a stall/paralysis team wants.
              // Drop setup hard so the boss applies pressure instead of feeding the grind.
              if (attacker.status === 'PAR') score *= 0.2;
            }
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
        const hard = cx.mode === 'hard';
        const te = aiTypeMult(attacker, defender, move);
        const stab = attacker.types.includes(move.type) ? 1.5 : 1;
        const atkStat = move.cls === 'Physical' ? STAGES.effStat(attacker, 'ATK') : STAGES.effStat(attacker, 'SPA');
        const defStat = move.cls === 'Physical' ? STAGES.effStat(defender, 'DEF') : STAGES.effStat(defender, 'SPD');
        // expected damage proxy
        const exp = effectivePower(move, attacker, defender) * stab * te * (atkStat / defStat) * ((move.acc || 100) / 100);
        score = exp;
        if (te === 0) { score = 0.1; }  // immune (type or ability) — almost never pick
        else {
          const approx = computeDamageAvg(attacker, defender, move);
          const killsFoe = approx >= defender.hp;
          if (hard) {
            // speed-aware KO: a KO is only worth the big bonus if we actually act
            // first (or the foe can't KO us back this turn). Otherwise it's a
            // normal strong hit — we might faint before it lands.
            const iMoveFirst = cx.mySpeed != null && cx.foeSpeed != null
              ? (cx.mySpeed > cx.foeSpeed || (cx.mySpeed === cx.foeSpeed))  // tie: assume we might
              : true;
            const foeCanKOme = cx.foeBestDmg != null && cx.foeBestDmg >= attacker.hp;
            if (killsFoe && (iMoveFirst || !foeCanKOme)) score *= 1.9;       // safe/clean KO
            else if (killsFoe) score *= 1.25;                                // KO but we may die first
          } else {
            // Normal mode: original behavior
            if (killsFoe) score *= 1.6;
          }
        }
        // self-KO moves cost you the user — only worth it as a trade.
        if (isSelfKO(move)) {
          const approx = computeDamageAvg(attacker, defender, move);
          const securesKO = te > 0 && approx >= defender.hp;
          const nearlyDead = attacker.hp <= attacker.maxHP * 0.25;
          score = (securesKO || nearlyDead) ? score * 0.9 : 0.2;
        }
        // recharge moves waste the following turn — discount them unless they
        // secure a KO right now (then the rest turn matters less).
        if (isRecharge(move) && te > 0) {
          const approx = computeDamageAvg(attacker, defender, move);
          if (approx < defender.hp) score *= 0.6;
        }
      }
      if (score > bestScore) { bestScore = score; best = move; }
    });
    return best || attacker.moves[0];
  }
  // non-random average damage for AI estimation (ability-aware: respects
  // Levitate/Flash Fire/etc. immunities and -ate type changes)
  function computeDamageAvg(attacker, defender, move) {
    if (move.cls === 'Status' || !move.pow) return 0;
    const ate = ABIL.ateType(attacker, move);
    const effType = ate ? ate.type : move.type;
    const emove = (effType === move.type) ? move : { ...move, type: effType };
    if (ABIL.immune(defender, emove) || ABIL.blocksMove(defender, move)) return 0;
    const atkStat = move.cls === 'Physical' ? STAGES.effStat(attacker, 'ATK') : STAGES.effStat(attacker, 'SPA');
    const defStat = move.cls === 'Physical' ? STAGES.effStat(defender, 'DEF') : STAGES.effStat(defender, 'SPD');
    const L = attacker.level;
    const base = Math.floor(Math.floor((Math.floor((2 * L) / 5) + 2) * effectivePower(move, attacker, defender) * atkStat / defStat) / 50) + 2;
    const stab = attacker.types.includes(effType) ? 1.5 : 1;
    const te = typeMult(effType, defender.types);
    const ateMult = ate ? ate.mult : 1;
    return Math.floor(base * stab * te * ateMult * 0.925 * 0.6 * STATUS.burnFactor(attacker, move));
  }

  // ---- HARD BOSS "expert" planner --------------------------------------------
  // A unique decision layer for the Vaereth Hard boss. Instead of greedily taking
  // the highest-immediate-value move, it looks one ply ahead: for each candidate it
  // estimates the resulting position (its HP, the foe's HP, KOs, who's faster) and
  // the foe's best reply, then scores the position with expert heuristics the
  // greedy AI lacks — converting KOs, not wasting overkill, setting up only in safe
  // windows, valuing speed control, and preserving its own healthiest threat.
  // Falls back to bestMove's pick if nothing scores better. Sub-1s: 1 ply, no RNG.
  function hardBossPlan(me, foe, cx) {
    if (!me || !foe || !me.moves || me.moves.length === 0) return bestMove(me, foe, cx);
    const myMaxKO = (target, mv) => computeDamageAvg(me, target, mv);
    const foeMoves = foe.moves || [];
    // foe's best expected damage into a hypothetical version of me with `hp`
    const foeRetal = (myHpAfter) => {
      let worst = 0;
      foeMoves.forEach(fm => { const d = computeDamageAvg(foe, me, fm); if (d > worst) worst = d; });
      return worst;
    };
    const iAmFaster = (cx && cx.mySpeed != null && cx.foeSpeed != null) ? cx.mySpeed >= cx.foeSpeed : true;
    const foeRetalNow = (cx && cx.foeBestDmg != null) ? cx.foeBestDmg : foeRetal(me.hp);
    let best = null, bestScore = -Infinity;
    me.moves.forEach(mv => {
      let score = 0;
      const isStatus = mv.cls === 'Status' || !mv.pow;
      const acc = (mv.acc == null ? 100 : mv.acc) / 100; // 1.0 if always-hits
      if (!isStatus) {
        const dmg = myMaxKO(foe, mv);
        if (dmg <= 0) { // foe immune — essentially worthless
          score = -50;
        } else {
          const kos = dmg >= foe.hp;
          // reward damage as a fraction of the foe's remaining HP, but DON'T reward
          // overkill: a move that does 3x lethal is no better than one that just KOs.
          const effectiveDmg = Math.min(dmg, foe.hp);
          // weight by accuracy: a 70%-acc move only lands 70% of the time, so its
          // expected value — and its KO reliability — is discounted. This stops the
          // boss from gambling on Hurricane/Hydro Pump when a steadier move is close.
          score = (effectiveDmg / Math.max(1, foe.hp)) * 100 * acc;
          if (kos) {
            // KO bonus scaled by how reliably this move actually connects
            score += 120 * acc;
            if (iAmFaster) score += 30 * acc;
          } else {
            // not a KO: we'll likely eat the foe's reply — subtract its expected bite
            score -= (foeRetalNow / Math.max(1, me.maxHP)) * 45;
          }
          // tempo: prefer a move that 2HKOs from full over chip that never closes
          if (!kos && dmg * 2 >= foe.hp) score += 12 * acc;
          // a small flat penalty for genuinely unreliable moves so a near-equal
          // accurate option wins ties (e.g. prefer a 95-acc hit over 70-acc Hurricane)
          if (acc < 0.85) score -= (0.85 - acc) * 60;
        }
      } else {
        // status / setup / heal: lean on bestMove's own nuanced status scoring by
        // giving these a baseline, then adjust for safety. We re-use the engine's
        // valuation by asking bestMove to score in isolation is overkill; instead:
        const stat = moveStatEffect(mv);
        const heal = healMoveInfo(mv);
        if (heal) {
          const missing = 1 - me.hp / me.maxHP;
          // heal only when it actually buys survival: meaningful HP missing AND the
          // foe can't just KO through it next turn.
          const healAmt = me.maxHP * (heal.rest ? 1 : (heal.frac || 0.5));
          const after = Math.min(me.maxHP, me.hp + healAmt);
          if (missing < 0.3) score = -10;                       // barely hurt — don't waste it
          else if (foeRetalNow >= after) score = -5;            // foe KOs through the heal — pointless
          else score = 40 + missing * 60;                       // real sustain
        } else if (stat && stat.target === 'self') {
          // setup: only valuable if (a) we survive the foe's hit comfortably and
          // (b) the foe can't threaten a KO back, so the boost actually converts.
          const safe = foeRetalNow < me.hp * 0.5;
          const totalStages = stat.changes.reduce((s, [, d]) => s + d, 0);
          score = safe ? 30 + totalStages * 14 : -20;
          // don't set up if the foe is near death (just KO it) or we're already low
          if (foe.hp <= foe.maxHP * 0.35) score -= 40;
          if (me.hp <= me.maxHP * 0.4) score -= 30;
        } else {
          // other status (Thunder Wave/Will-O etc.): valuable vs a healthy foe that
          // isn't immune; near-useless vs a low foe we should just hit.
          const eff = moveStatusEffect(mv);
          if (eff && STATUS.canApply(foe, eff.code)) score = foe.hp > foe.maxHP * 0.5 ? 35 : 8;
          else score = -10;
        }
      }
      if (score > bestScore) { bestScore = score; best = mv; }
    });
    // ---- Nightmare 2-ply refinement -----------------------------------------
    // For Nightmare only (cx.deep), re-rank the top candidates by looking one layer
    // deeper: play the move, let the foe make its best reply, and check whether the
    // boss is left able to KO (or safely continue) on the FOLLOWING turn. This is a
    // bounded, no-RNG, no-recursion estimate (a few cheap arithmetic passes), so it
    // stays well within the speed budget. It only ADJUSTS scores; the 1-ply result
    // is the floor, so a bug here can't make the boss play worse than Hard.
    if (cx && cx.deep && me.moves.length > 1) {
      const foeBestDmgInto = (hp) => { let w = 0; foeMoves.forEach(fm => { const d = computeDamageAvg(foe, me, fm); if (d > w) w = d; }); return w; };
      let bestDeep = null, bestDeepScore = -Infinity;
      me.moves.forEach(mv => {
        const isStatus = mv.cls === 'Status' || !mv.pow;
        // base on the same 1-ply intuition, then add a depth term
        let s = 0;
        const dmg = isStatus ? 0 : myMaxKO(foe, mv);
        const acc = (mv.acc == null ? 100 : mv.acc) / 100;
        const foeHpAfter = Math.max(0, foe.hp - dmg);
        const foeFaints = !isStatus && dmg >= foe.hp;
        // turn 2: if foe survives, it hits us; do we then still KO it next turn?
        if (foeFaints) {
          s += 200 * acc; // clean removal — strongest outcome
        } else {
          const incoming = foeBestDmgInto(me.hp);
          const myHpAfter = Math.max(0, me.hp - incoming);
          const iSurvive = myHpAfter > 0;
          // my best follow-up damage next turn (from my likely-reduced HP we still
          // attack at full power; HP only gates whether I'm alive to do it)
          let myFollowup = 0; me.moves.forEach(m2 => { const d2 = computeDamageAvg(me, foe, m2) * ((m2.acc == null ? 100 : m2.acc) / 100); if (d2 > myFollowup) myFollowup = d2; });
          const twoTurnKO = (dmg + myFollowup) >= foe.hp;
          s += (Math.min(dmg, foe.hp) / Math.max(1, foe.hp)) * 100 * acc;
          if (iSurvive && twoTurnKO) s += 40;      // I outlast and close the KO next turn
          if (!iSurvive) s -= 60;                   // this line gets me KO'd — avoid
          // setup is good at depth only if I clearly survive the reply
          if (isStatus) {
            const stat = moveStatEffect(mv);
            if (stat && stat.target === 'self') s += iSurvive && incoming < me.hp * 0.4 ? 50 : -30;
          }
        }
        if (s > bestDeepScore) { bestDeepScore = s; bestDeep = mv; }
      });
      if (bestDeep) return bestDeep;
    }
    // safety net: if our planner's pick somehow scored terribly, defer to bestMove
    const greedy = bestMove(me, foe, cx);
    if (best == null) return greedy;
    return best;
  }

  // AI switch decision: if the active mon is in deep type trouble and a much
  // better matchup is on the bench, consider switching (basic revenge/pivot).
  // `recentlySwitched` blocks an immediate re-switch (prevents infinite pivot loops).
  function shouldSwitch(team, activeIdx, foe, rng, recentlySwitched, mode, hazardsOnMe) {
    const hard = mode === 'hard' || mode === 'nightmare'; // smart switching on both tough tiers
    const active = team[activeIdx];
    if (active.fainted) return pickNextAlive(team, activeIdx);
    if (recentlySwitched) return -1; // just came in — commit to at least one action
    // how bad is the foe's best hit on us, defensively
    const foeBest = bestMove(foe, active, { mode: 'normal' });
    const incoming = computeDamageAvg(foe, active, foeBest);
    const inDanger = incoming >= active.hp * 0.8; // likely to be KO'd
    if (!inDanger) return -1;

    // estimate hazard chip a benched mon would take on entry (Hard only) so we
    // don't pivot a frail teammate straight into Stealth Rock + Spikes death.
    const hazardChip = (m) => {
      if (!hard || !hazardsOnMe) return 0;
      let frac = 0;
      if (hazardsOnMe.rock) {
        const weak = typeMult('ROCK', m.types); // SR scales with Rock effectiveness
        frac += 0.125 * weak;
      }
      const sp = hazardsOnMe.spikes || 0;
      const grounded = !m.types.includes('FLYING') && !ABIL.has(m, 'Levitate');
      if (grounded && sp) frac += [0, 0.125, 0.1667, 0.25][Math.min(3, sp)];
      return Math.floor(m.maxHP * frac);
    };

    // find a benched mon that handles the foe well and can hit back hard
    let bestBench = -1, bestVal = 0;
    // is the foe a threat that's already set up? (boosted attack stages) — if so we
    // need a mon that survives its BOOSTED hit, not its base hit.
    const foeBoostAtk = foe.boosts ? Math.max(foe.boosts.ATK || 0, foe.boosts.SPA || 0) : 0;
    team.forEach((m, i) => {
      if (i === activeIdx || m.fainted) return;
      const chip = hazardChip(m);
      const effHP = m.hp - chip;                       // HP after switch-in chip
      if (effHP <= 0) return;                          // would faint on entry — never
      const takes = computeDamageAvg(foe, m, bestMove(foe, m, { mode: 'normal' }));
      const deals = computeDamageAvg(m, foe, bestMove(m, foe, { mode: 'normal' }));
      let val = deals - takes;
      if (hard) {
        // big bonus for an incoming mon that is immune to or strongly resists
        // the foe's chosen move (a clean pivot)
        const inMult = aiTypeMult(foe, m, foeBest);
        if (inMult === 0) val += active.maxHP;         // hard wall / immunity
        else if (inMult <= 0.5) val += active.maxHP * 0.5;
        val -= chip;                                   // penalize hazard damage taken
        // vs a set-up sweeper: heavily favor a mon that SURVIVES the boosted hit and
        // can threaten back — switching a check into a +2 sweeper is how you stop a
        // sweep cold. Scale the incoming estimate by the foe's boost level.
        if (foeBoostAtk > 0) {
          const boostedTake = takes * (1 + 0.5 * foeBoostAtk);
          if (boostedTake < effHP) val += active.maxHP * 0.6; // genuinely survives the boosted hit
          else val -= active.maxHP * 0.4;                     // gets KO'd anyway — don't sack it
        }
      }
      if (val > bestVal) { bestVal = val; bestBench = i; }
    });
    // switch if a bench mon is clearly better than staying in. Bar is lower when the
    // foe is set up (we urgently need our check in) and higher otherwise (avoid churn).
    const bar = foeBoostAtk > 0 ? active.hp * 0.6 : active.hp;
    return bestVal > bar ? bestBench : -1;
  }
  function pickNextAlive(team, fromIdx) {
    for (let i = 0; i < team.length; i++) if (!team[i].fainted) return i;
    return -1;
  }

  // ---------- the battle simulation: returns a list of events ----------
  function simulate(teamA, teamB, seedNum, aiMode) {
    aiMode = aiMode || 'normal';
    const rng = mulberry32(seedNum || (Math.random() * 1e9) | 0);
    // deep-clone teams so the originals aren't mutated (fresh boosts per battle)
    const A = teamA.map(m => ({ ...m, stats: { ...m.stats }, moves: m.moves.slice(), hp: m.maxHP, fainted: false, status: null, statusTurns: 0, toxicN: 0, boosts: STAGES.fresh(), syncUsedTurn: -1, mustRecharge: false, abilityPool: (m.abilityPool || []).slice() }));
    const B = teamB.map(m => ({ ...m, stats: { ...m.stats }, moves: m.moves.slice(), hp: m.maxHP, fainted: false, status: null, statusTurns: 0, toxicN: 0, boosts: STAGES.fresh(), syncUsedTurn: -1, mustRecharge: false, abilityPool: (m.abilityPool || []).slice() }));
    // Disambiguate the battle log when both teams field the same species: the foe's
    // copy (Team B) is shown as "Foe <name>" so lines like "Mangmight used X. Mangmight
    // lost Y%" can't read as a mon hitting itself. Only triggers on an actual collision;
    // normal battles keep plain species names. (Purely cosmetic — targeting is unchanged.)
    (() => {
      const aSpecies = new Set(A.map(m => m.name));
      B.forEach(m => { if (aSpecies.has(m.name)) m.name = 'Foe ' + m.name; });
    })();
    // In Nightmare mode, the AI-controlled side (Team B) inherits the boss's edge
    // even in regular (non-boss) battles: max damage rolls + status immunity (applied
    // in STATUS.canApply via the aiSide flag) + the expert planner. The player's own
    // side (A) plays normally so their sleep/paralysis still work against the AI.
    if (aiMode === 'nightmare') {
      B.forEach(m => { if (!m.boss) { m.maxRoll = true; m.aiSide = true; } });
    }
    let ai = 0, bi = 0; // active indices
    const events = [];
    const log = [];

    // apply a list of [stat,delta] changes to `mon`; emit events/log; handle
    // Defiant (opponent-caused drop → +2 Atk). `byOpp` = change came from the foe.
    const applyStatChanges = (mon, side, changes, byOpp) => {
      let anyDrop = false;
      changes.forEach(([k, d]) => {
        // opponent-caused drops can be blocked by Clear Body / Big Pecks / Hyper Cutter / Keen Eye
        if (d < 0 && byOpp && ABIL.blocksStatDrop(mon, k)) {
          events.push({ t: 'ability', side, name: mon.name, ability: 'Clear Body', boostsOf: snapshotBoosts(A, B) });
          log.push(`${mon.name}'s stats can't be lowered!`);
          return;
        }
        const applied = STAGES.apply(mon, k, d);
        if (applied !== 0) {
          events.push({ t: 'stat', side, name: mon.name, stat: k, delta: applied, boostsOf: snapshotBoosts(A, B) });
          log.push(`${mon.name}'s ${STAGES.label(k)} ${STAGES.phrase(applied)}!`);
          if (d < 0 && byOpp) anyDrop = true;
        }
      });
      // Defiant: a stat lowered by the opponent → +2 Attack; Competitive → +2 Sp. Atk
      if (anyDrop && ABIL.has(mon, 'Defiant')) {
        const a = STAGES.apply(mon, 'ATK', 2);
        if (a !== 0) {
          events.push({ t: 'ability', side, name: mon.name, ability: 'Defiant', boostsOf: snapshotBoosts(A, B) });
          events.push({ t: 'stat', side, name: mon.name, stat: 'ATK', delta: a, boostsOf: snapshotBoosts(A, B) });
          log.push(`${mon.name}'s Defiant sharply raised its Attack!`);
        }
      }
      if (anyDrop && ABIL.has(mon, 'Competitive')) {
        const a = STAGES.apply(mon, 'SPA', 2);
        if (a !== 0) {
          events.push({ t: 'ability', side, name: mon.name, ability: 'Competitive', boostsOf: snapshotBoosts(A, B) });
          events.push({ t: 'stat', side, name: mon.name, stat: 'SPA', delta: a, boostsOf: snapshotBoosts(A, B) });
          log.push(`${mon.name}'s Competitive sharply raised its Sp. Atk!`);
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
      const aSwitch = shouldSwitch(A, ai, preB, rng, lastSwitchTurn.A === turn - 1, aiMode, field.hazards.A);
      const bSwitch = shouldSwitch(B, bi, preA, rng, lastSwitchTurn.B === turn - 1, aiMode, field.hazards.B);
      // switch-out abilities (Regenerator heal, Natural Cure) on the OUTGOING mon
      const doSwitchOut = (side, outIdx) => {
        const mon = side === 'A' ? A[outIdx] : B[outIdx];
        mon.mustRecharge = false; // recharge state doesn't persist across a switch
        mon.boosts = STAGES.fresh(); // stat-stage boosts/drops reset when a mon leaves the field
        const so = ABIL.onSwitchOut(mon);
        if (so.heal && mon.hp > 0 && mon.hp < mon.maxHP) { mon.hp = Math.min(mon.maxHP, mon.hp + so.heal); }
        if (so.cure && mon.status) { STATUS.clear(mon); }
      };
      if (aSwitch >= 0) { doSwitchOut('A', ai); events.push({ t: 'switch', side: 'A', to: aSwitch, name: A[aSwitch].name }); log.push(`Team A withdrew ${A[ai].name} and sent out ${A[aSwitch].name}.`); ai = aSwitch; aSwitched = true; lastSwitchTurn.A = turn; }
      if (bSwitch >= 0) { doSwitchOut('B', bi); events.push({ t: 'switch', side: 'B', to: bSwitch, name: B[bSwitch].name }); log.push(`Team B withdrew ${B[bi].name} and sent out ${B[bSwitch].name}.`); bi = bSwitch; bSwitched = true; lastSwitchTurn.B = turn; }
      // Intimidate fires on entry, after both switches are placed
      if (aSwitched) onEntry('A', ai);
      if (bSwitched) onEntry('B', bi);

      const mA = A[ai], mB = B[bi];
      const benchCount = (team, idx) => team.reduce((n, m, i) => n + ((i !== idx && !m.fainted) ? 1 : 0), 0);
      const wxNow = curWeather(), txNow = field.terrain.kind;
      // pre-compute each side's effective speed and the foe's best threat so the
      // AI (on Hard) can reason about move order, KO safety, and setup windows.
      const spA0 = aiSpeed(mA, wxNow), spB0 = aiSpeed(mB, wxNow);
      const foeBestVsA = bestMove(mB, mA, { mode: 'normal' });   // cheap, no-ctx estimate
      const foeBestVsB = bestMove(mA, mB, { mode: 'normal' });
      const dmgBtoA = computeDamageAvg(mB, mA, foeBestVsA);
      const dmgAtoB = computeDamageAvg(mA, mB, foeBestVsB);
      const ctxA = {
        mode: aiMode, weather: wxNow, terrain: txNow, hazardsOnFoe: field.hazards.B, foeBench: benchCount(B, bi),
        mySpeed: spA0, foeSpeed: spB0, foeBestDmg: dmgBtoA, myBestDmg: dmgAtoB,
        foeBestPhysical: foeBestVsA && foeBestVsA.cls === 'Physical',
      };
      const ctxB = {
        mode: aiMode, weather: wxNow, terrain: txNow, hazardsOnFoe: field.hazards.A, foeBench: benchCount(A, ai),
        mySpeed: spB0, foeSpeed: spA0, foeBestDmg: dmgAtoB, myBestDmg: dmgBtoA,
        foeBestPhysical: foeBestVsB && foeBestVsB.cls === 'Physical',
        deep: aiMode === 'nightmare', // 2-ply lookahead for the Nightmare boss only
      };
      // Team B's move: the Vaereth Hard boss uses the expert planner (lookahead +
      // KO/setup/tempo reasoning); everyone else uses the standard greedy bestMove.
      const moveA = bestMove(mA, mB, ctxA);
      const bossBrain = ((aiMode === 'hard' || aiMode === 'nightmare') && mB && (mB.boss || mB.aiSide));
      const moveB = bossBrain ? hardBossPlan(mB, mA, ctxB) : bestMove(mB, mA, ctxB);
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
      // turn order: higher move priority goes first; within the same bracket, faster goes first (ties random)
      const prA = movePriority(moveA, mA), prB = movePriority(moveB, mB);
      let aFirst;
      if (prA !== prB) aFirst = prA > prB;
      else aFirst = spdA > spdB || (spdA === spdB && rng() < 0.5);
      const order = aFirst ? [['A', mA, mB, moveA], ['B', mB, mA, moveB]] : [['B', mB, mA, moveB], ['A', mA, mB, moveA]];

      for (const [side, atk, def, mv] of order) {
        if (atk.fainted || def.fainted) continue;
        // a side that switched this turn has used its action — it doesn't attack
        if ((side === 'A' && aSwitched) || (side === 'B' && bSwitched)) continue;

        // ---- Sync Ability (core mechanic): swap to any ability in the mon's pool.
        // Syncing CONSUMES the turn (you sync instead of attacking). The auto-pick
        // only fires when it gains a real edge. Entry abilities (Intimidate, weather)
        // re-trigger on sync; the new ability persists until faint or another sync. ----
        if (atk.syncUsedTurn !== turn && ABIL.pool(atk).length > 1) {
          // predict the foe's move and its damage so sync can react defensively
          const foeMv = bestMove(def, atk, { mode: 'normal' });
          const inc = foeMv ? computeDamageAvg(def, atk, foeMv) : 0;
          const pick = ABIL.syncChoice(atk, def, { foeMove: foeMv, incoming: inc });
          if (pick && normName(pick) !== normName(atk.ability)) {
            const from = atk.ability;
            atk.ability = pick;
            atk.syncUsedTurn = turn;
            events.push({ t: 'sync', side, name: atk.name, from, to: pick });
            log.push(`${atk.name} synced its Ability to ${pick}!`);
            // re-trigger on-acquire (entry) effects for the new ability
            weatherAbility(atk, side);
            doIntimidate(atk, side, def, side === 'A' ? 'B' : 'A');
            continue; // syncing is this mon's action for the turn — it does not also attack
          }
        }

        // ---- flinch (King's Rock): lose the turn if flinched this turn ----
        if (atk.flinched) {
          atk.flinched = false;
          events.push({ t: 'cantmove', side, name: atk.name, reason: `${atk.name} flinched and couldn't move!`, statusOf: snapshotStatus(A, B) });
          log.push(`${atk.name} flinched and couldn't move!`);
          continue;
        }

        // ---- pre-move status gate (sleep / freeze / full paralysis) ----
        let cantAct = false, gateLine = '';
        // recharge: if this mon used a recharge move last turn, it rests now
        if (atk.mustRecharge) {
          atk.mustRecharge = false;
          cantAct = true;
          gateLine = `${atk.name} must recharge!`;
        } else if (atk.status === 'SLP') {
          if (atk.statusTurns > 0) atk.statusTurns -= (ABIL.earlyBird(atk) ? 2 : 1);
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

        // Protean / Libero: before attacking, the user's type becomes the move's type
        if (ABIL.protean(atk) && mv.cls !== 'Status' && mv.pow) {
          const ate = ABIL.ateType(atk, mv);
          const newType = ate ? ate.type : mv.type;
          if (!(atk.types.length === 1 && atk.types[0] === newType)) {
            atk.types = [newType];
            events.push({ t: 'ability', side, name: atk.name, ability: 'Protean', boostsOf: snapshotBoosts(A, B) });
            log.push(`${atk.name} transformed into the ${newType} type!`);
          }
        }

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
        const defHpBefore = def.hp;
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
        // recharge moves (Hyper Beam, Rock Wrecker, etc.): user rests next turn
        if (isRecharge(mv)) { atk.mustRecharge = true; }
        if (res.sturdy) { events.push({ t: 'ability', side: side === 'A' ? 'B' : 'A', name: def.name, ability: 'Sturdy', boostsOf: snapshotBoosts(A, B) }); log.push(`${def.name} endured the hit with Sturdy!`); }

        // ---- reactive defender abilities on a connecting damaging hit ----
        if (res.dmg > 0 && res.eff !== 0 && def.hp > 0) {
          // King's Rock: 10% chance the target flinches (only matters if it hasn't acted yet)
          if (normName(atk.item || '') === normName("King's Rock") && rng() < 0.10) {
            def.flinched = true;
          }
        }
        if (res.dmg > 0 && res.eff !== 0) {
          const defSide = side === 'A' ? 'B' : 'A';
          // Anger Point: a critical hit maxes the defender's Attack
          if (res.crit && ABIL.has(def, 'Anger Point') && def.hp > 0) {
            const a = STAGES.apply(def, 'ATK', 12);
            if (a !== 0) { events.push({ t: 'ability', side: defSide, name: def.name, ability: 'Anger Point', boostsOf: snapshotBoosts(A, B) }); events.push({ t: 'stat', side: defSide, name: def.name, stat: 'ATK', delta: a, boostsOf: snapshotBoosts(A, B) }); log.push(`${def.name}'s Anger Point maxed its Attack!`); }
          }
          if (def.hp > 0) {
            const hooks = ABIL.onHitTaken(def, atk, mv, pct, rng);
            for (const h of hooks) {
              if (h.type === 'statusFoe' && rng() < h.chance && STATUS.canApply(atk, h.code)) {
                STATUS.apply(atk, h.code, rng);
                events.push({ t: 'status', side, name: atk.name, code: h.code, statusOf: snapshotStatus(A, B) });
                log.push(`${atk.name} was ${STATUS.label[h.code]} by ${def.name}!`);
              } else if (h.type === 'chipFoe' && !atk.fainted && !ABIL.has(atk, 'Magic Guard')) {
                const c = Math.max(1, Math.floor(atk.maxHP * h.frac));
                atk.hp = Math.max(0, atk.hp - c);
                events.push({ t: 'chip', side, name: atk.name, hp: atk.hp, maxHP: atk.maxHP, dmg: c, ability: h.ability });
                log.push(`${atk.name} was hurt by ${def.name}'s ${h.ability}!`);
              } else if (h.type === 'selfStat') {
                const a = STAGES.apply(def, h.stat, h.delta);
                if (a !== 0) { events.push({ t: 'ability', side: defSide, name: def.name, ability: h.ability, boostsOf: snapshotBoosts(A, B) }); events.push({ t: 'stat', side: defSide, name: def.name, stat: h.stat, delta: a, boostsOf: snapshotBoosts(A, B) }); log.push(`${def.name}'s ${h.ability} raised its ${STAGES.label(h.stat)}!`); }
              } else if (h.type === 'selfStat2') {
                events.push({ t: 'ability', side: defSide, name: def.name, ability: h.ability, boostsOf: snapshotBoosts(A, B) });
                applyStatChanges(def, defSide, h.changes, false);
              }
            }
            // Berserk / Anger Shell: crossing below half HP from this hit
            if (ABIL.berserkTrigger(def, defHpBefore, def.hp)) {
              const a = STAGES.apply(def, 'SPA', 1);
              if (a !== 0) { events.push({ t: 'ability', side: defSide, name: def.name, ability: 'Berserk', boostsOf: snapshotBoosts(A, B) }); events.push({ t: 'stat', side: defSide, name: def.name, stat: 'SPA', delta: a, boostsOf: snapshotBoosts(A, B) }); log.push(`${def.name}'s Berserk raised its Sp. Atk!`); }
            }
            if (ABIL.angerShellTrigger(def, defHpBefore, def.hp)) {
              events.push({ t: 'ability', side: defSide, name: def.name, ability: 'Anger Shell', boostsOf: snapshotBoosts(A, B) });
              applyStatChanges(def, defSide, [['ATK', 1], ['SPA', 1], ['SPE', 1], ['DEF', -1], ['SPD', -1]], false);
            }
          }
        }

        // ---- self-healing moves (Recover, Roost, Synthesis, Rest, etc.) ----
        const heal = healMoveInfo(mv);
        if (heal) {
          if (heal.rest) {
            // Rest: full heal + sleep for 2 turns (only if not already full HP / can sleep)
            if (atk.hp < atk.maxHP) {
              atk.hp = atk.maxHP;
              STATUS.clear(atk);
              atk.status = 'SLP'; atk.statusTurns = 2;
              events.push({ t: 'heal', side, name: atk.name, hp: atk.hp, maxHP: atk.maxHP });
              events.push({ t: 'status', side, name: atk.name, code: 'SLP', statusOf: snapshotStatus(A, B) });
              log.push(`${atk.name} went to sleep and restored its HP!`);
            } else { log.push(`${atk.name} used ${mv.name}, but its HP is already full!`); }
          } else {
            let frac = heal.frac;
            if (heal.weather) {
              const w = curWeather();
              if (w === 'sun') frac = 2 / 3;
              else if (w && w !== 'sun') frac = 0.25; // reduced in non-sun weather
            }
            if (atk.hp < atk.maxHP) {
              const amt = Math.max(1, Math.floor(atk.maxHP * frac));
              atk.hp = Math.min(atk.maxHP, atk.hp + amt);
              events.push({ t: 'heal', side, name: atk.name, hp: atk.hp, maxHP: atk.maxHP });
              log.push(`${atk.name} restored its HP!`);
            } else { log.push(`${atk.name} used ${mv.name}, but its HP is already full!`); }
          }
        }

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
          // Aftermath: fainting to a contact move chips the attacker 1/4
          if (ABIL.aftermath(def, atk, mv) && !ABIL.has(atk, 'Magic Guard')) {
            const c = Math.max(1, Math.floor(atk.maxHP / 4));
            atk.hp = Math.max(0, atk.hp - c);
            events.push({ t: 'chip', side, name: atk.name, hp: atk.hp, maxHP: atk.maxHP, dmg: c, ability: 'Aftermath' });
            log.push(`${atk.name} was hurt by ${def.name}'s Aftermath!`);
          }
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

        // attacker may have fainted from contact chip (Rough Skin / Iron Barbs / Aftermath)
        if (atk.hp <= 0 && !atk.fainted) {
          atk.fainted = true; STATUS.clear(atk);
          events.push({ t: 'faint', name: atk.name, side });
          log.push(`${atk.name} fainted!`);
          if (side === 'A') { const nx = pickNextAlive(A, ai); if (nx >= 0) { ai = nx; events.push({ t: 'send', side: 'A', name: A[ai].name, idx: ai }); log.push(`Team A sent out ${A[ai].name}!`); onEntry('A', ai); } }
          else { const nx = pickNextAlive(B, bi); if (nx >= 0) { bi = nx; events.push({ t: 'send', side: 'B', name: B[bi].name, idx: bi }); log.push(`Team B sent out ${B[bi].name}!`); onEntry('B', bi); } }
          break;
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

      // ---- end-of-turn held items (Leftovers) ----
      for (const side of eotOrder) {
        const mon = side === 'A' ? A[ai] : B[bi];
        if (!mon || mon.fainted) continue;
        if (normName(mon.item || '') === normName('Leftovers') && mon.hp > 0 && mon.hp < mon.maxHP) {
          const h = Math.max(1, Math.floor(mon.maxHP / 16));
          mon.hp = Math.min(mon.maxHP, mon.hp + h);
          events.push({ t: 'heal', side, name: mon.name, hp: mon.hp, maxHP: mon.maxHP });
          log.push(`${mon.name} restored a little HP with its Leftovers!`);
        }
      }

      // ---- end-of-turn self abilities (Speed Boost, Moody, Shed Skin, Hydration) ----
      for (const side of eotOrder) {
        const mon = side === 'A' ? A[ai] : B[bi];
        if (!mon || mon.fainted) continue;
        for (const h of ABIL.endOfTurn(mon, rng)) {
          if (h.type === 'stat') {
            const a = STAGES.apply(mon, h.stat, h.delta);
            if (a !== 0) { events.push({ t: 'ability', side, name: mon.name, ability: h.ability, boostsOf: snapshotBoosts(A, B) }); events.push({ t: 'stat', side, name: mon.name, stat: h.stat, delta: a, boostsOf: snapshotBoosts(A, B) }); log.push(`${mon.name}'s ${h.ability} raised its ${STAGES.label(h.stat)}!`); }
          } else if (h.type === 'stat2') {
            events.push({ t: 'ability', side, name: mon.name, ability: h.ability, boostsOf: snapshotBoosts(A, B) });
            applyStatChanges(mon, side, h.changes, false);
          } else if (h.type === 'cure' && mon.status) {
            log.push(`${mon.name}'s ${h.ability} cured its ${STATUS.label[mon.status] || 'status'}!`);
            STATUS.clear(mon);
            events.push({ t: 'status', side, name: mon.name, code: null, statusOf: snapshotStatus(A, B) });
          } else if (h.type === 'cureIfRain' && mon.status && curWeather() === 'RAIN') {
            log.push(`${mon.name}'s Hydration cured its status!`);
            STATUS.clear(mon);
            events.push({ t: 'status', side, name: mon.name, code: null, statusOf: snapshotStatus(A, B) });
          } else if (h.type === 'formGrassy') {
            const inGrass = field.terrain.kind === 'GRASSY';
            const hasLight = mon.types.includes('LIGHT');
            if (inGrass && !hasLight) { mon.types = [...mon.types, 'LIGHT']; events.push({ t: 'ability', side, name: mon.name, ability: 'Gaia Guardian', boostsOf: snapshotBoosts(A, B) }); log.push(`${mon.name} terraformed into its Guardian Form!`); }
          }
        }
      }

      if (field.weather.kind) { field.weather.turns--; if (field.weather.turns <= 0) { log.push(`The ${FIELD.WEATHER[field.weather.kind]} subsided.`); events.push({ t: 'weatherend' }); field.weather.kind = null; } }
      if (field.terrain.kind) { field.terrain.turns--; if (field.terrain.turns <= 0) { log.push(`The ${FIELD.TERRAIN[field.terrain.kind]} faded.`); events.push({ t: 'terrainend' }); field.terrain.kind = null; } }

      if (A[ai]) A[ai].flinched = false;
      if (B[bi]) B[bi].flinched = false;
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

  // ============================ certificate ============================
  // A screenshottable victory certificate shown on a first-time win vs the boss.
  // Two visually distinct tiers: 'normal' (silver/violet, clean) and 'hard'
  // (gold/prismatic, ornate — the real flex). `team` is [{dex,name}].
  function CertModal({ tier, team, name, setName, onClose }) {
    const hard = tier === 'hard';
    const nm = tier === 'nightmare';
    const hasName = !!(name && name.trim());
    const tryClose = () => { if (hasName) onClose(); };
    const C = nm
      ? { edge: '#ff3b3b', edge2: '#ff7a4d', glow: '#ff2a2a', ink: '#ffe8e0', sub: '#ff9a8a', bg: 'radial-gradient(ellipse at 50% 0%, #2a0606 0%, #160512 45%, #08040a 100%)', seal: '#ff3b3b' }
      : hard
      ? { edge: '#ffd54a', edge2: '#ff9d3c', glow: '#ffd54a', ink: '#fff6dc', sub: '#e9cf86', bg: 'radial-gradient(ellipse at 50% 0%, #2a210a 0%, #14102b 45%, #0a0816 100%)', seal: '#ffd54a' }
      : { edge: '#b9c4e6', edge2: '#8a5cff', glow: '#9fb0e8', ink: '#eef1ff', sub: '#aeb6d8', bg: 'radial-gradient(ellipse at 50% 0%, #161a33 0%, #100c24 50%, #0a0816 100%)', seal: '#b9c4e6' };
    const fancy = hard || nm; // ornate tiers
    return (
      <div onClick={tryClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(4,2,10,0.9)', backdropFilter: 'blur(7px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '36px 14px', overflowY: 'auto' }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 600 }}>
          {/* the certificate card — this is the screenshot target */}
          <div style={{ position: 'relative', borderRadius: 10, padding: '34px 30px 28px', background: C.bg, border: `2px solid ${C.edge}`, boxShadow: `0 0 0 1px #0a0816, 0 0 40px ${C.glow}55, inset 0 0 60px ${nm ? '#ff2a2a18' : hard ? '#ffd54a14' : '#8a5cff12'}`, overflow: 'hidden' }}>
            {/* corner flourishes */}
            {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
              <div key={i} style={{ position: 'absolute', [v]: 10, [h]: 10, width: 26, height: 26, [`border${v[0].toUpperCase()}${v.slice(1)}`]: `2px solid ${C.edge2}`, [`border${h[0].toUpperCase()}${h.slice(1)}`]: `2px solid ${C.edge2}`, opacity: 0.8 }} />
            ))}
            {fancy && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: nm ? 'repeating-linear-gradient(115deg, transparent 0 18px, rgba(255,42,42,0.05) 18px 19px)' : 'repeating-linear-gradient(115deg, transparent 0 18px, rgba(255,213,74,0.04) 18px 19px)' }} />}

            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 3, color: C.sub, marginBottom: 4 }}>POKÉMON VOID</div>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 2, color: C.sub, marginBottom: 14 }}>{nm ? 'CERTIFICATE OF NIGHTMARE' : hard ? 'CERTIFICATE OF LEGEND' : 'CERTIFICATE OF VICTORY'}</div>

              <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: fancy ? 42 : 34, lineHeight: 1.05, color: C.ink, textShadow: `0 0 26px ${C.glow}aa`, marginBottom: 6 }}>
                {nm ? 'SURVIVOR OF' : hard ? 'CONQUEROR OF' : 'VICTOR OVER'}
              </div>
              <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: fancy ? 30 : 24, color: C.edge, marginBottom: fancy ? 16 : 14 }}>
                PŌKEDEX FILLERS
              </div>

              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, color: C.sub, lineHeight: 1.55, maxWidth: 420, margin: '0 auto 18px' }}>
                {nm
                  ? 'On this day, against the Nightmare — Level 125, status-proof, every blow landing at its cruelest — one trainer did the all-but-impossible. The region will not see this often:'
                  : hard
                  ? 'On this day, against the cruelest team in all of Drapalla — at its sharpest and most merciless — one trainer did what nearly none can. Let it be known across the region:'
                  : 'This trainer faced the region\u2019s most stubborn gauntlet and walked away the winner. A feat worth remembering:'}
              </div>

              {/* name field */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 2, color: C.sub, marginBottom: 6 }}>AWARDED TO</div>
                <input value={name} onChange={e => setName(e.target.value.slice(0, 24))} placeholder="enter your name"
                  style={{ width: 'min(360px, 90%)', boxSizing: 'border-box', textAlign: 'center', background: 'transparent', border: 'none', borderBottom: `2px solid ${C.edge}88`, color: C.ink, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 28, padding: '2px 6px 6px', outline: 'none' }} />
              </div>

              {/* winning team showcase */}
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 2, color: C.sub, marginBottom: 8 }}>WITH THE TEAM</div>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {(team || []).map((m, i) => (
                  <div key={i} style={{ width: 64, height: 64, borderRadius: 10, background: '#0c091c', border: `1px solid ${C.edge}55`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 14px ${nm ? '#ff2a2a16' : hard ? '#ffd54a14' : '#8a5cff12'}` }}>
                    <SpriteSlot dex={m.dex} name={m.name} size={50} accent={C.edge} />
                  </div>
                ))}
              </div>

              {/* seal / footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 4 }}>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.edge}66)` }} />
                <div style={{ width: 54, height: 54, borderRadius: '50%', border: `2px solid ${C.seal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: `0 0 18px ${C.glow}66` }}>{nm ? '💀' : hard ? '👑' : '⭐'}</div>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg, transparent, ${C.edge}66)` }} />
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: C.sub, marginTop: 12 }}>
                {nm ? 'NIGHTMARE DIFFICULTY' : hard ? 'HARD DIFFICULTY' : 'NORMAL DIFFICULTY'} · pokemonvoid.github.io
              </div>
            </div>
          </div>

          {/* actions (outside the screenshot frame) */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8', textAlign: 'center', alignSelf: 'center' }}>
              {hasName ? 'Screenshot your certificate to share it!' : 'Enter your name to claim your spot on the leaderboard.'}
            </div>
            <button onClick={tryClose} disabled={!hasName} title={hasName ? '' : 'Enter a name first'}
              style={{ cursor: hasName ? 'pointer' : 'not-allowed', background: hasName ? '#15112a' : '#100c1e', border: `1px solid ${hasName ? '#2a2545' : '#1d1838'}`, color: hasName ? '#cdbfff' : '#5f5980', borderRadius: 8, padding: '8px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 14, opacity: hasName ? 1 : 0.7 }}>Close</button>
          </div>
        </div>
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
    const [vaereth, setVaereth] = React.useState(false); // VAERETH boss mode (Team B becomes a cranked boss)
    const [aiMode, setAiMode] = React.useState('normal'); // 'normal' | 'hard' AI difficulty
    const [cert, setCert] = React.useState(null); // {tier:'normal'|'hard', team:[{dex,name}]} when a fresh boss win earns a certificate
    const [certName, setCertName] = React.useState(''); // player-entered name for the certificate
    const timer = React.useRef(null);

    // --- certificate de-dupe: one cert per unique 6-species set, per difficulty,
    // persisted across sessions. key = sorted dex numbers. ---
    const certTeamKey = (team) => (team || []).map(m => m.dex).slice().sort((a, b) => a - b).join('-');
    const certStoreKey = (tier) => 'voidmon_fillers_certs_' + tier;

    // --- one-time go-live reset: when this version ships, wipe any previously
    // stored "team already used" memory so every team is available to score with
    // again. The memory is PER TIER (a team can score once on each of normal/hard/
    // nightmare; repeats on the SAME tier earn nothing). Bump LEADERBOARD_EPOCH to
    // trigger another fresh start on a future patch. ---
    const LEADERBOARD_EPOCH = 'lb_v2'; // bumped for today's patch — clears used-team memory
    (function resetCertsOnGoLive() {
      try {
        if (localStorage.getItem('voidmon_lb_epoch') === LEADERBOARD_EPOCH) return;
        ['normal', 'hard', 'nightmare'].forEach(t => localStorage.removeItem('voidmon_fillers_certs_' + t));
        localStorage.setItem('voidmon_lb_epoch', LEADERBOARD_EPOCH);
      } catch (e) { /* storage unavailable — nothing to reset */ }
    })();

    const certAlreadyEarned = (tier, key) => {
      try { const raw = localStorage.getItem(certStoreKey(tier)); const set = raw ? JSON.parse(raw) : []; return Array.isArray(set) && set.includes(key); }
      catch (e) { return false; }
    };
    const certRecord = (tier, key) => {
      try { const raw = localStorage.getItem(certStoreKey(tier)); const set = raw ? JSON.parse(raw) : []; if (!set.includes(key)) { set.push(key); localStorage.setItem(certStoreKey(tier), JSON.stringify(set)); } }
      catch (e) { /* storage unavailable — cert still shows once this session */ }
    };

    // per-browser id (shared with the vote board's scheme)
    const lbVoterId = () => {
      try { let id = localStorage.getItem('voidmon_voter_id'); if (!id) { id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('voidmon_voter_id', id); } return id; }
      catch (e) { return 'v_anon'; }
    };
    // submit a fresh-team boss win to the leaderboard (fire-and-forget; the DB's
    // unique index quietly rejects a duplicate team, so this is safe to call once
    // per earned certificate). Reads the same Supabase config as the vote board.
    const LB_URL = 'https://fzwxxvmzjkepfibjjyza.supabase.co';
    const LB_KEY = 'sb_publishable_mK-sym5D-ue5JoRGODx4iw_FM3X3EDK'; // sb_publishable_... — keep on ONE line
    const submitWin = (tier, team, name) => {
      if (!LB_URL || !LB_KEY || LB_KEY.indexOf('PASTE_') === 0) return false; // not configured
      const clean = (name || '').trim();
      if (!clean) return false; // require a name — never submit "Anonymous"
      const payload = {
        player_name: clean.slice(0, 24),
        difficulty: tier,
        team_key: certTeamKey(team),
        team: team,
        voter_id: lbVoterId(),
      };
      try {
        fetch(LB_URL.replace(/\/$/, '') + '/rest/v1/boss_wins', {
          method: 'POST',
          headers: { 'apikey': LB_KEY, 'Authorization': 'Bearer ' + LB_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
          body: JSON.stringify(payload),
        }).catch(() => { /* offline / duplicate — ignore */ });
      } catch (e) { /* ignore */ }
      return true;
    };

    // ---- Adaptive Nightmare: meta fetch + attempt logging --------------------
    // The Nightmare boss adapts its movesets to the recent community meta. We pull
    // the last ~50 attempts on load, tally the player types people bring, and feed
    // that to buildVaerethBoss. Every Nightmare attempt is logged (win or loss).
    const [nightmareMeta, setNightmareMeta] = React.useState(null);
    const loadNightmareMeta = React.useCallback(() => {
      if (!LB_URL || !LB_KEY || LB_KEY.indexOf('PASTE_') === 0) return;
      const url = LB_URL.replace(/\/$/, '') + '/rest/v1/nightmare_attempts?select=team,kos,archetype,won&order=created_at.desc&limit=50';
      fetch(url, { headers: { apikey: LB_KEY, Authorization: 'Bearer ' + LB_KEY } })
        .then(r => r.ok ? r.json() : [])
        .then(rows => {
          const typeCounts = {};
          const archCounts = {};
          (rows || []).forEach(row => {
            // weight each attempt by how close it came: a team that KO'd 4 boss mons
            // (or won) tells us far more about a real threat than one that KO'd 0.
            const kos = Math.max(0, Math.min(6, row.kos | 0));
            const weight = 1 + kos + (row.won ? 4 : 0); // near-wins & wins dominate the meta
            (row.team || []).forEach(mon => {
              (mon.types || []).forEach(t => { typeCounts[t] = (typeCounts[t] || 0) + weight; });
            });
            if (row.archetype) archCounts[row.archetype] = (archCounts[row.archetype] || 0) + weight;
          });
          const dominantArch = Object.entries(archCounts).sort((a, b) => b[1] - a[1])[0];
          if (Object.keys(typeCounts).length) {
            setNightmareMeta({ typeCounts, archetype: dominantArch ? dominantArch[0] : null });
          }
        })
        .catch(() => { /* offline — boss uses its default roster */ });
    }, []);
    React.useEffect(() => { loadNightmareMeta(); }, [loadNightmareMeta]);

    // classify a team's strategy from its movesets (setup / stall / offense / mixed)
    const SETUP_MOVES = ['swords dance', 'calm mind', 'bulk up', 'dragon dance', 'nasty plot', 'quiver dance', 'work up', 'growth', 'shell smash', 'coil', 'agility', 'rock polish', 'iron defense', 'amnesia', 'cosmic power', 'curse'];
    const STALL_MOVES = ['protect', 'detect', 'recover', 'roost', 'synthesis', 'moonlight', 'morning sun', 'soft-boiled', 'rest', 'toxic', 'leech seed', 'substitute', 'will-o-wisp', 'wish', 'pain split', 'slack off'];
    const classifyArchetype = (team) => {
      let setup = 0, stall = 0, atk = 0, n = 0;
      (team || []).forEach(m => (m.moves || []).forEach(mv => {
        const nm = String(mv.name || mv).toLowerCase(); n++;
        if (SETUP_MOVES.includes(nm)) setup++;
        else if (STALL_MOVES.includes(nm)) stall++;
        else atk++;
      }));
      if (!n) return 'mixed';
      if (stall / n >= 0.35) return 'stall';
      if (setup / n >= 0.25) return 'setup';
      if (atk / n >= 0.75) return 'offense';
      return 'mixed';
    };

    const logNightmareAttempt = (playerTeam, won, bossKOs) => {
      if (!LB_URL || !LB_KEY || LB_KEY.indexOf('PASTE_') === 0) return;
      const team = (playerTeam || []).map(m => ({ dex: m.dex, types: (m.types || []).slice() }));
      if (!team.length) return;
      const dexes = team.map(m => m.dex).slice().sort().join('-');
      const moves = (playerTeam || []).map(m => (m.moves || []).map(x => x.name || x));
      const archetype = classifyArchetype(playerTeam);
      try {
        fetch(LB_URL.replace(/\/$/, '') + '/rest/v1/nightmare_attempts', {
          method: 'POST',
          headers: { apikey: LB_KEY, Authorization: 'Bearer ' + LB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ team, dexes, moves, kos: bossKOs | 0, archetype, won: !!won, voter_id: lbVoterId() }),
        }).catch(() => {});
      } catch (e) { /* ignore */ }
    };
    // the Vaereth boss roster for display (deterministic); built once.
    const bossDisplay = React.useMemo(() => buildVaerethBoss(aiMode, aiMode === 'nightmare' ? nightmareMeta : null), [aiMode, nightmareMeta]);

    const rollTeams = (lvl) => {
      // guard: only a finite number is a real level; a click event etc. → use state
      const L = (typeof lvl === 'number' && Number.isFinite(lvl)) ? lvl : level;
      const rng = mulberry32((Math.random() * 1e9) | 0);
      setTeamA(randomTeam(6, rng, L, aiMode));
      setTeamB(randomTeam(6, rng, L, aiMode));
      setSrcA('random'); setSrcB('random');
      setResult(null); setStep(0); setPlaying(false); setBuildMsg('');
    };

    // re-level the CURRENT random teams in place: same species, recompute stats
    // and auto-moves at the new level. Does NOT re-roll which Pokémon are on the
    // team. Only touches sides that are on the Random source.
    const relevelTeams = (L) => {
      const redo = (team) => (team || []).map(m => buildMon(m.dex, L, null, undefined, { evs: m.evs, ivs: m.ivs, nature: m.nature }));
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
        A = buildFromMembers(manualA.map(m => ({ dex: m.dex, moves: (m.moves || []).map(x => x.name), evs: m.evs, ivs: m.ivs, nature: m.nature })), level);
      } else { A = (teamA && teamA.length) ? teamA : randomTeam(6, mulberry32((Math.random() * 1e9) | 0), level, aiMode); }
      if (srcB === 'manual') {
        if (manualB.length === 0) { setBuildMsg('Team B is empty — add Pokémon or switch it to Random.'); return false; }
        B = buildFromMembers(manualB.map(m => ({ dex: m.dex, moves: (m.moves || []).map(x => x.name), evs: m.evs, ivs: m.ivs, nature: m.nature })), level);
      } else { B = (teamB && teamB.length) ? teamB : randomTeam(6, mulberry32((Math.random() * 1e9 + 7) | 0), level, aiMode); }
      // VAERETH boss mode overrides Team B entirely with the cranked boss roster.
      if (vaereth) { B = buildVaerethBoss(aiMode, aiMode === 'nightmare' ? nightmareMeta : null); }
      setTeamA(A); setTeamB(B); setBuildMsg(msg);
      return { A, B };
    };

    // import a VT2…/VTEAM1 code into the chosen side(s) as a manual roster
    // turn a decoded/loaded loadout into the manual roster(s) and apply it.
    const applyLoadout = (lo) => {
      if (!lo || !lo.members || lo.members.length === 0) return false;
      const roster = lo.members.map(m => {
        const resolved = resolveMoves(m.moves);
        return { dex: m.dex, moves: resolved.length ? resolved : autoMoves(m.dex), evs: m.evs, ivs: m.ivs, nature: m.nature };
      }).filter(m => byDex(m.dex));
      if (roster.length === 0) return false;
      const named = lo.name ? `"${lo.name}"` : 'team';
      if (importInto === 'A' || importInto === 'both') { setManualA(roster.map(r => ({ ...r }))); setSrcA('manual'); }
      if (importInto === 'B' || importInto === 'both') { setManualB(roster.map(r => ({ ...r }))); setSrcB('manual'); }
      setImportMsg(`Imported ${named} (${roster.length} Pokémon) into Team ${importInto === 'both' ? 'A & B' : importInto}.`);
      setResult(null); setStep(0); setPlaying(false);
      return true;
    };
    const doImport = () => {
      const lo = decodeShareCode(importText);
      if (!lo || !lo.members || lo.members.length === 0) {
        setImportMsg('That code is not valid. Copy the whole thing (it starts with VT2).');
        return;
      }
      if (!applyLoadout(lo)) setImportMsg('Code decoded, but no valid Pokémon were found in it.');
    };
    // import a saved Team Builder loadout directly (no code needed)
    const importSavedLoadout = (lo) => {
      if (!applyLoadout(lo)) setImportMsg('That loadout has no valid Pokémon yet — add some in the Team Builder.');
    };
    // saved loadouts from the Team Builder (read once when the modal opens)
    const [savedLoadouts, setSavedLoadouts] = React.useState([]);

    // open the import modal pre-targeted at a side ('A' | 'B' | 'both')
    const openImport = (into) => {
      setImportInto(into || 'A'); setImportText(''); setImportMsg('');
      try { setSavedLoadouts((window.VTEAM && window.VTEAM.listLoadouts) ? window.VTEAM.listLoadouts() : []); }
      catch (e) { setSavedLoadouts([]); }
      setImportOpen(true);
    };

    // switch a side's source; entering 'random' rolls that side a fresh team at
    // the current level (so it doesn't keep showing the old manual roster).
    const chooseSource = (side, opt) => {
      if (opt === 'random') {
        const team = randomTeam(6, mulberry32((Math.random() * 1e9 + (side === 'B' ? 7 : 0)) | 0), level, aiMode);
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
      // the boss always battles with the smarter (Hard) AI; otherwise use the toggle
      const r = simulate(built.A, built.B, undefined, aiMode);
      setResult(r);
      // Adaptive Nightmare: log this attempt (win or loss) so the boss can adapt
      // its movesets to the community meta. Uses the player's actual Team A.
      if (vaereth && aiMode === 'nightmare') {
        const bossKOs = (r.teamB ? r.teamB.length : 6) - (r.survivorsB || 0);
        logNightmareAttempt(built.A, r.winner === 'A', bossKOs);
      }
      // certificate: a win vs the real Pokedex Fillers boss earns one cert per unique
      // 6-species team, tracked separately per difficulty, persisted across sessions.
      if (vaereth && r.winner === 'A') {
        const tier = aiMode === 'nightmare' ? 'nightmare' : (aiMode === 'hard' ? 'hard' : 'normal');
        const team = (r.teamA || built.A || []).map(m => ({ dex: m.dex, name: m.name }));
        const key = certTeamKey(team);
        if (!certAlreadyEarned(tier, key)) {
          certRecord(tier, key);
          setCert({ tier, team });
        }
      }
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
        else if (e.t === 'chip' || e.t === 'heal') {
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

    if (!teamA || (!teamB && !vaereth)) return <Empty label="Loading battle…" />;

    return (
      <div>
        <PageHead kicker="BATTLE ENGINE" title="Auto-Battle Simulator" sub="Build two teams — pick them by hand from the Void dex, import a Team Builder share code, or roll them at random — then let the AI fight it out. 6v6 with switching, real Void stats and type chart, animated on a 2D plane." />

        {/* controls — run row (play & watch) */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
          <button onClick={run} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 12, padding: '12px 24px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 20 }}>⚔ Simulate Battle</button>
          <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #2a2545' }}>
            {[1, 2, 5, 10, 20].map(s => (
              <button key={s} onClick={() => setSpeed(s)} style={{ cursor: 'pointer', padding: '8px 12px', background: speed === s ? '#322663' : '#100c24', border: 'none', borderRight: s !== 20 ? '1px solid #2a2545' : 'none', color: speed === s ? '#fff' : '#9a93bb', fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{s}x</button>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#9a93bb' }}>
            <input type="checkbox" checked={skip} onChange={e => setSkip(e.target.checked)} /> Skip animation
          </label>
        </div>

        {/* controls — setup row (configure the match) */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18, paddingTop: 10, borderTop: '1px solid #1a1638' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#6a6388', letterSpacing: 1, marginRight: 2 }}>SETUP</span>
          <button onClick={() => rollTeams()} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#cdbfff', borderRadius: 10, padding: '11px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>🎲 Random Teams</button>
          <button onClick={() => { setAiMode(m => { const nm = m === 'normal' ? 'hard' : (m === 'hard' ? 'nightmare' : 'normal'); const rng = mulberry32((Math.random() * 1e9) | 0); if (srcA === 'random') setTeamA(randomTeam(6, rng, level, nm === 'nightmare' ? 'hard' : nm)); if (srcB === 'random' && !vaereth) setTeamB(randomTeam(6, rng, level, nm === 'nightmare' ? 'hard' : nm)); return nm; }); setResult(null); setStep(0); setPlaying(false); }}
            title={'AI difficulty (cycles Normal \u2192 Hard \u2192 Nightmare). Hard: the AI plays smarter \u2014 speed-aware KOs, won\u2019t set up into a likely KO, switches cleverly. Nightmare: same expert AI but the boss is Level 125, immune to status, and every attack rolls maximum damage \u2014 meant for almost no one. Random teams also upgrade: Normal = random IVs/no EVs; Hard/Nightmare = max IVs/smart EVs/ideal nature.'}
            style={{ cursor: 'pointer', background: aiMode === 'nightmare' ? 'linear-gradient(135deg, #2a0a0a, #b3122e)' : (aiMode === 'hard' ? 'linear-gradient(135deg, #5a2db3, #8a5cff)' : '#120e26'), border: aiMode === 'nightmare' ? '1px solid #ff5a5a' : (aiMode === 'hard' ? '1px solid #b89bff' : '1px solid #3a3168'), color: aiMode === 'normal' ? '#9a93bb' : '#fff', borderRadius: 10, padding: '11px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
            {aiMode === 'nightmare' ? '💀 AI: Nightmare' : (aiMode === 'hard' ? '🧠 AI: Hard' : '🧠 AI: Normal')}
          </button>
          <button onClick={() => { setVaereth(v => { const nv = !v; if (nv) setAiMode('hard'); return nv; }); setResult(null); setStep(0); setPlaying(false); }}
            title={`${BOSS_NAME}: a brutally hard boss replaces Team B. Beating it is meant to be very tough.`}
            style={{ cursor: 'pointer', marginLeft: 'auto', background: vaereth ? 'linear-gradient(135deg, #b3122e, #ff5a3c)' : '#1a0f16', border: vaereth ? '1px solid #ff8a6a' : '1px solid #5a2230', color: vaereth ? '#fff' : '#e06a78', borderRadius: 10, padding: '11px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
            {vaereth ? `☠ ${BOSS_NAME}: ON` : `☠ Challenge ${BOSS_NAME}`}
          </button>
        </div>

        {vaereth && (
          <div style={{ marginBottom: 14, padding: '10px 14px', background: aiMode === 'nightmare' ? 'linear-gradient(90deg, rgba(255,42,42,0.2), rgba(255,90,60,0.06))' : 'linear-gradient(90deg, rgba(179,18,46,0.18), rgba(255,90,60,0.06))', border: aiMode === 'nightmare' ? '1px solid #ff3b3b' : '1px solid #5a2230', borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#ffb3a0' }}>
            <strong style={{ color: aiMode === 'nightmare' ? '#ff4d4d' : '#ff7a5c', fontFamily: "'Pixelify Sans', sans-serif", letterSpacing: 1 }}>{aiMode === 'nightmare' ? `💀 NIGHTMARE — ${BOSS_NAME.toUpperCase()}` : `☠ BOSS ENCOUNTER — ${BOSS_NAME.toUpperCase()}`}</strong><br />
            {aiMode === 'nightmare'
              ? <>Level 125. Status-proof. Every blow lands at its hardest. This is the cruelest the region has to offer.{nightmareMeta && (nightmareMeta.archetype || (nightmareMeta.typeCounts && Object.keys(nightmareMeta.typeCounts).length)) ? <><br /><span style={{ color: '#ff8f7a' }}>It has been studying recent challengers{(() => { const t = nightmareMeta.typeCounts ? Object.entries(nightmareMeta.typeCounts).sort((a, b) => b[1] - a[1])[0] : null; const arch = nightmareMeta.archetype; const bits = []; if (t) bits.push(`${t[0].toLowerCase()}-types`); if (arch && arch !== 'mixed') bits.push(`${arch} teams`); return bits.length ? ` — it has tuned itself against ${bits.join(' and ')}.` : '.'; })()}</span></> : null}</>
              : <>Team B is now <strong>{BOSS_NAME}</strong> — a brutally tough boss with a hand-picked team. This fight is meant to be very hard. Build Team A to take it on.</>}
          </div>
        )}

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

        {/* level slider — governs the level of ALL teams (random, manual, imported), up to 100 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, padding: '10px 14px', borderRadius: 10, background: '#0c0a1c', border: '1px solid #221d3a', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#b08fff', whiteSpace: 'nowrap' }}>TEAM LEVEL</span>
          <input type="range" min={1} max={100} value={level}
            onChange={e => { const v = +e.target.value; setLevel(v); relevelTeams(v); }}
            style={{ flex: '1 1 220px', accentColor: '#8a5cff', cursor: 'pointer' }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: '#fff', minWidth: 56, textAlign: 'right' }}>Lv. {level}</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#6a6388', flexBasis: '100%' }}>Applies to all teams — random, manual, and imported — from Lv. 1 to 100.{vaereth ? ` (${BOSS_NAME} sets its own team and ignores this slider.)` : ''}</span>
        </div>
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

              {/* saved Team Builder loadouts — one tap to import, no code needed */}
              {savedLoadouts.filter(l => l.members && l.members.length).length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: '#8a83a8', marginBottom: 6 }}>YOUR SAVED LOADOUTS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 220, overflowY: 'auto' }}>
                    {savedLoadouts.filter(l => l.members && l.members.length).map(l => (
                      <button key={l.id} onClick={() => importSavedLoadout(l)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: '#120e26', border: '1px solid #2a2545', textAlign: 'left' }}>
                        <span style={{ flex: 1, minWidth: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</span>
                        <span style={{ display: 'flex', gap: 2 }}>
                          {l.members.slice(0, 6).map((m, mi) => (
                            <span key={mi} style={{ width: 26, height: 26, borderRadius: 6, background: '#0c091c', border: '1px solid #221c40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <SpriteSlot dex={m.dex} name={(byDex(m.dex) || {}).name || ''} size={22} accent="#8a5cff" />
                            </span>
                          ))}
                        </span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#8a5cff', whiteSpace: 'nowrap' }}>Use →</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0 4px' }}>
                    <div style={{ flex: 1, height: 1, background: '#1d1838' }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#6a6388' }}>or paste a code</span>
                    <div style={{ flex: 1, height: 1, background: '#1d1838' }} />
                  </div>
                </div>
              )}

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
          <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid #2a2350', background: 'linear-gradient(180deg, #1a1535 0%, #0f0b22 55%, #0a0816 100%)', minHeight: 440, marginBottom: 16 }}>
            {/* ground line */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, height: 2, background: 'linear-gradient(90deg, transparent, #3a2f6e, transparent)' }} />
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
                  <button onClick={run} style={{ cursor: 'pointer', marginTop: 16, background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 10, padding: '9px 22px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 16 }}>↻ Retry</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* victory certificate — shows once playback reaches the end of a winning boss battle */}
        {cert && (!result || skip || step >= result.events.length - 1) && (
          <CertModal tier={cert.tier} team={cert.team} name={certName} setName={setCertName} onClose={() => { submitWin(cert.tier, cert.team, certName); setCert(null); }} />
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
          <Roster team={vaereth ? bossDisplay : teamB} label={vaereth ? `☠ ${BOSS_NAME}` : 'Team B'} color="#ff7fe0" live={playback ? playback.B : null} onInspect={() => setInspect('B')} />
        </div>

        {inspect && (
          <InspectModal
            team={inspect === 'A' ? teamA : (vaereth ? bossDisplay : teamB)}
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
      else if (t === 'chip' || t === 'heal') n += 1;
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
      <div style={{ position: 'absolute', [isA ? 'left' : 'right']: '8%', bottom: isA ? 86 : 200, textAlign: 'center', width: 180 }}>
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
                        <div style={{ marginTop: 3 }}><span style={{ color: '#9a93bb' }}>Item:</span> {m.item || '—'}</div>
                        <div style={{ marginTop: 3, color: '#5fd13c', fontSize: 9 }}>Sync: swap to any of its abilities — costs the turn, once per turn</div>
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

  // Battle Sim is now public — no passcode. (The BattleGate component and gate
  // helpers above are kept but unused, so the gate can be re-enabled later by
  // setting window.VIEWS.Battle = BattleGate instead.)
  window.VIEWS.Battle = BattleSim;
})();
