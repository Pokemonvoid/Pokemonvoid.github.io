/* Pokémon Void — Pokédex data (placeholder content; swap in real data/sprites).
   window.VDEX = { TYPES, DEX, STAT_LABELS, STAT_MAX, byDex } */
window.VDEX = (function () {
  const STAT_MAX = 200;
  const STAT_LABELS = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };

  // 18 standard types + 2 custom (LIGHT, COSMIC), tuned for the dark cosmic theme.
  const TYPES = {
    NORMAL: { name: 'Normal', bg: '#4a463f', glow: '#bdb4a6', fg: '#efeae2' },
    FIRE: { name: 'Fire', bg: '#7a3318', glow: '#ff7a3c', fg: '#ffe6d6' },
    WATER: { name: 'Water', bg: '#1c456e', glow: '#3c9bff', fg: '#d9ecff' },
    ELECTRIC: { name: 'Electric', bg: '#6e5a12', glow: '#ffd23c', fg: '#fff7d6' },
    GRASS: { name: 'Grass', bg: '#27531f', glow: '#5fd13c', fg: '#e0ffd6' },
    ICE: { name: 'Ice', bg: '#1f5a5e', glow: '#5fe6e0', fg: '#dafcff' },
    FIGHTING: { name: 'Fighting', bg: '#6e2420', glow: '#ff5f4c', fg: '#ffe0db' },
    POISON: { name: 'Poison', bg: '#4a1f5e', glow: '#c45fff', fg: '#f3deff' },
    GROUND: { name: 'Ground', bg: '#5e451f', glow: '#e0a85f', fg: '#fff0d6' },
    FLYING: { name: 'Flying', bg: '#2f3f6e', glow: '#8aa8ff', fg: '#e0e8ff' },
    PSYCHIC: { name: 'Psychic', bg: '#7a2f57', glow: '#ff5fa2', fg: '#ffe1ee' },
    BUG: { name: 'Bug', bg: '#4a5e1f', glow: '#b4d13c', fg: '#f1ffd6' },
    ROCK: { name: 'Rock', bg: '#5e5230', glow: '#cbb472', fg: '#fff6dc' },
    GHOST: { name: 'Ghost', bg: '#43356b', glow: '#a07bd6', fg: '#e9defb' },
    DRAGON: { name: 'Dragon', bg: '#2d2470', glow: '#7c6cff', fg: '#e3dcff' },
    DARK: { name: 'Dark', bg: '#2a2329', glow: '#8a7b8e', fg: '#e7e0e8' },
    STEEL: { name: 'Steel', bg: '#3c454d', glow: '#9fb3c2', fg: '#e8edf2' },
    FAIRY: { name: 'Fairy', bg: '#6e2f55', glow: '#ff8ad1', fg: '#ffe3f4' },
    LIGHT: { name: 'Light', bg: '#4a4212', glow: '#ffe566', fg: '#fffce8' },
    COSMIC: { name: 'Cosmic', bg: '#15375e', glow: '#33d6ff', fg: '#dff1ff' },
  };

  // Learnset entries store only lv + name (+ optional sig flag for signature-move styling).
  // Full move data (type, class, power, acc, pp, desc) lives in VGAME.MOVES and is looked up at render time.
  const M = (lv, name, sig) => ({ lv, name, ...(sig ? { sig } : {}) });
  const EGG = (name, sig) => ({ lv: 'EGG', name, ...(sig ? { sig } : {}) });
  const TM = (num, name, sig) => ({ lv: `TM${String(num).padStart(2, '0')}`, name, ...(sig ? { sig } : {}) });

  const DEX = [
    {
      dex: '001', name: 'Tamatoo', category: 'Mudcake', types: ['GRASS'],
      height: '1\'05" ft', weight: '25.3 lbs', catchRate: 140, found: ['Saudade Town (Starter)'],
      abilities: ['Overgrow'],
      hidden: 'Stamina',
      stats: { HP: 54, ATK: 58, DEF: 58, SPA: 40, SPD: 50, SPE: 50 },
      flavor: 'To get nutrition, Tamatoo chews soil in its mouth like gum. After the soil has lost its nutrients, it spits out small pucks of dirt called “Mud Cakes”.',
      evo: { to: '002' },
      levelMoves: [
        M('1', 'Tackle'),
        M('5', 'Defense Curl'),
        M('7', 'Leafage'),
        M('11', 'Barrage'),
        M('15', 'Grass Whistle'),
        M('18', 'Razor Leaf'),
        M('22', 'Worry Seed'),
        M('25', 'Headbutt'),
        M('29', 'Stealth Rock'),
        M('32', 'Rock Blast'),
        M('36', 'Bulk Up'),
        M('39', 'Stone Edge'),
        M('43', 'Leaf Storm'),
      ],
      eggMoves: [
        EGG('Grassy Glide'),
        EGG('Vital Throw'),
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Rest'),
        TM('03', 'Protect'),
      ],
      // anomaly: {discoverer: 'username'},
      anomaly: null,
      evYield: { DEF: 1 }, baseFriendship: 50, baseExp: 64, growthRate: 'Parabolic',
      eggGroups: ['Field', 'Grass'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '002', name: 'Terradua', category: 'Stoneroller', types: ['GRASS', 'ROCK'],
      height: '4\'08" ft', weight: '1471 lbs', catchRate: 45, found: [],
      abilities: ['Overgrow'],
      hidden: 'Stamina',
      stats: { HP: 64, ATK: 83, DEF: 83, SPA: 55, SPD: 65, SPE: 65 },
      flavor: 'Terradua treat their boulders with lots of tender love and care. Some have boulders so well kept that they sparkle like crystals.',
      evo: { from: '001', to: '003', method: 'Lv 16' },
      levelMoves: [
        M('0', 'Rock Tomb'),
        M('1', 'Rock Tomb'),
        M('1', 'Tackle'),
        M('1', 'Defense Curl'),
        M('1', 'Leafage'),
        M('1', 'Barrage'),
        M('15', 'Grass Whistle'),
        M('19', 'Razor Leaf'),
        M('24', 'Worry Seed'),
        M('28', 'Headbutt'),
        M('33', 'Stealth Rock'),
        M('37', 'Rock Blast'),
        M('42', 'Bulk Up'),
        M('46', 'Stone Edge'),
        M('50', 'Leaf Storm'),
      ],
      eggMoves: [],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Rest'),
        TM('03', 'Protect'),
        TM('04', 'Bulldoze')
      ],
      // anomaly: {discoverer: 'username'},
      anomaly: null,
      evYield: { DEF: 1, ATK: 1 }, baseFriendship: 50, baseExp: 142, growthRate: 'Parabolic',
      eggGroups: ['Field', 'Grass'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '003', name: 'Terratlus', category: 'World Defender', types: ['GRASS', 'ROCK'],
      height: '7\'07" ft', weight: '1568 lbs', catchRate: 45, found: [],
      abilities: ['Gaia Guardian', 'Overgrow'],
      hidden: 'Stamina',
      stats: { HP: 84, ATK: 103, DEF: 118, SPA: 70, SPD: 80, SPE: 75 },
      flavor: 'Terratlus, known as "Protectors", are calm and kind, devoted to the rock they\'ve kept. It\'s said that their rocks hold the light of the world.',
      evo: { from: '002', method: 'Lv 38' },
      levelMoves: [
        M('0', 'Divine Gift'),
        M('1', 'Divine Gift'),
        M('1', 'Rock Tomb'),
        M('1', 'Tackle'),
        M('1', 'Defense Curl'),
        M('1', 'Leafage'),
        M('1', 'Barrage'),
        M('11', 'Seismic Toss'),
        M('15', 'Grass Whistle'),
        M('19', 'Razor Leaf'),
        M('24', 'Worry Seed'),
        M('28', 'Headbutt'),
        M('33', 'Stealth Rock'),
        M('39', 'Rock Blast'),
        M('46', 'Bulk Up'),
        M('52', 'Chi Blast'),
        M('59', 'Stone Edge'),
        M('66', 'Leaf Storm'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Rest'),
        TM('03', 'Protect'),
        TM('04', 'Bulldoze'),
        TM('05', 'Revealing Light'),
      ],
      anomaly: null,
      evYield: { DEF: 2, ATK: 1 }, baseFriendship: 50, baseExp: 236, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '004', name: 'Flaret', category: 'Bounding Flame', types: ['FIRE'],
      height: '0\'08" ft', weight: '4.4 lbs', catchRate: 140, found: [],
      abilities: ['Blaze'],
      hidden: 'Competitive',
      stats: { HP: 45, ATK: 60, DEF: 45, SPA: 52, SPD: 45, SPE: 63 },
      flavor: 'Flaret are most often seen on clears nights in groups of 4-5, stargazing. When excited, their tails can heat up to over 1000°F.”',
      evo: { to: '005' },
      levelMoves: [
        M('1', 'Tackle'),
        M('3', 'Tail Whip'),
        M('6', 'Ember'),
        M('11', 'Brutal Swing'),
        M('15', 'Sand Attack'),
        M('18', 'Flame Wheel'),
        M('22', 'After You'),
        M('25', 'Slam'),
        M('29', 'Light Screen'),
        M('33', 'Light Speed Dash'),
        M('36', 'Coil'),
        M('39', 'Supernova'),
        M('43', 'Burn Up'),
      ],
      eggMoves: [
        EGG('Fire Spin'),
        EGG('Baton Pass'),
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 50, baseExp: 62, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '005', name: 'Warrpen', category: 'Starfire', types: ['FIRE', 'COSMIC'],
      height: '1\'08" ft', weight: '10.1 lbs', catchRate: 45, found: [],
      abilities: ['Blaze'],
      hidden: 'Competitive',
      stats: { HP: 60, ATK: 81, DEF: 57, SPA: 77, SPD: 57, SPE: 83 },
      flavor: 'The stars in Warrpen’s tail are stars that have yet to be born. When that time comes, they disappear from its tail.',
      evo: { from: '004', to: '006', method: 'Lv 16' },
      levelMoves: [
        M('0', 'Space Dust'),
        M('1', 'Space Dust'),
        M('1', 'Tackle'),
        M('1', 'Tail Whip'),
        M('1', 'Ember'),
        M('1', 'Brutal Swing'),
        M('15', 'Sand Attack'),
        M('19', 'Flame Wheel'),
        M('24', 'After You'),
        M('28', 'Slam'),
        M('33', 'Light Screen'),
        M('37', 'Light Speed Dash'),
        M('42', 'Coil'),
        M('46', 'Supernova'),
        M('51', 'Burn Up'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { SPE: 1, ATK: 1 }, baseFriendship: 50, baseExp: 142, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '006', name: 'Galeliadea', category: 'Supernova', types: ['FIRE', 'COSMIC'],
      height: '2\'09" ft', weight: '15.4 lbs', catchRate: 45, found: [],
      abilities: ['Burning Novae', 'Blaze'],
      hidden: 'Competitive',
      stats: { HP: 75, ATK: 96, DEF: 72, SPA: 102, SPD: 72, SPE: 113 },
      flavor: 'Unlike its previous stage, Galeliadea’s stars are dying. Asthey fade, they ripple across it\'s body in stunning colors',
      evo: { from: '005', method: 'Lv 38' },
      levelMoves: [
        M('0', 'Cleansing Flames'),
        M('1', 'Cleansing Flames'),
        M('1', 'Space Dust'),
        M('1', 'Tackle'),
        M('1', 'Tail Whip'),
        M('1', 'Ember'),
        M('1', 'Brutal Swing'),
        M('11', 'Agility'),
        M('15', 'Sand Attack'),
        M('19', 'Flame Wheel'),
        M('24', 'After You'),
        M('28', 'Slam'),
        M('33', 'Light Screen'),
        M('40', 'Light Speed Dash'),
        M('46', 'Coil'),
        M('52', 'Supernova'),
        M('59', 'Moonlight'),
        M('67', 'Burn Up'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { SPE: 2, ATK: 1 }, baseFriendship: 50, baseExp: 240, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '007', name: 'Cubble', category: 'Pondering', types: ['WATER'],
      height: '1\'03" ft', weight: '15.1 lbs', catchRate: 140, found: [],
      abilities: ['Torrent'],
      hidden: 'Unaware',
      stats: { HP: 65, ATK: 36, DEF: 58, SPA: 50, SPD: 68, SPE: 33 },
      flavor: 'Cubble are curious and constantly tired little creatures even if they did nothing. Each bubble they make is said to be a thought from their day.',
      evo: { to: '008' },
      levelMoves: [
        M('1', 'Pound'),
        M('4', 'Growl'),
        M('6', 'Bubble'),
        M('11', 'Fake Out'),
        M('15', 'Fake Tears'),
        M('18', 'Bubble Beam'),
        M('22', 'Aqua Ring'),
        M('25', 'Yawn'),
        M('29', 'Hyper Voice'),
        M('32', 'Whirlpool'),
        M('36', 'Amnesia'),
        M('39', 'Hydro Pump'),
        M('43', 'Meteor Beam'),
      ],
      eggMoves: [
        EGG('Chilling Water'),
        EGG('Echoed Voice'),
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Protect'),
        TM('04', 'Disarming Voice'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPD: 1 }, baseFriendship: 50, baseExp: 63, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '008', name: 'Popnaut', category: 'Pop Performer', types: ['WATER', 'NORMAL'],
      height: '3\'08" ft', weight: '98 lbs', catchRate: 45, found: [],
      abilities: ['Torrent'],
      hidden: 'Unaware',
      stats: { HP: 75, ATK: 46, DEF: 68, SPA: 80, SPD: 88, SPE: 58 },
      flavor: 'Popnaut love to jump around and are full of energy. They may not know much, but they put all of their energy towards having fun.',
      evo: { from: '007', to: '009', method: 'Lv 16' },
      levelMoves: [
        M('0', 'Swift'),
        M('1', 'Swift'),
        M('1', 'Pound'),
        M('1', 'Growl'),
        M('1', 'Bubble'),
        M('1', 'Fake Out'),
        M('15', 'Fake Tears'),
        M('19', 'Bubble Beam'),
        M('24', 'Aqua Ring'),
        M('28', 'Yawn'),
        M('33', 'Hyper Voice'),
        M('37', 'Whirlpool'),
        M('42', 'Amnesia'),
        M('46', 'Hydro Pump'),
        M('50', 'Meteor Beam'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Protect'),
        TM('04', 'Disarming Voice'),
        TM('05', 'Rest'),
        TM('06', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { SPD: 1, SPA: 1 }, baseFriendship: 50, baseExp: 142, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
    {
      dex: '009', name: 'Kodinaut', category: 'Retired Abyss', types: ['WATER', 'NORMAL'],
      height: '6\'03" ft', weight: '800 lbs', catchRate: 45, found: [],
      abilities: ['Deep Abyss', 'Torrent'],
      hidden: 'Unaware',
      stats: { HP: 95, ATK: 66, DEF: 88, SPA: 115, SPD: 108, SPE: 58 },
      flavor: 'Kodinaut love silent and dark places like the bottom of the ocean, known for its calm and silence. It\'s said that if awoken, a calamity soon follows.',
      evo: { from: '008', method: 'Lv 38' },
      levelMoves: [
        M('0', 'Sonar Ping'),
        M('1', 'Sonar Ping'),
        M('1', 'Swift'),
        M('1', 'Pound'),
        M('1', 'Growl'),
        M('1', 'Fake Out'),
        M('8', 'Bubble'),
        M('11', 'Calm Mind'),
        M('15', 'Fake Tears'),
        M('19', 'Bubble Beam'),
        M('24', 'Aqua Ring'),
        M('28', 'Yawn'),
        M('33', 'Hyper Voice'),
        M('39', 'Whirlpool'),
        M('46', 'Amnesia'),
        M('52', 'Hydro Pump'),
        M('59', 'Meteor Beam'),
        M('66', 'Belly Drum'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Protect'),
        TM('04', 'Disarming Voice'),
        TM('05', 'Rest'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { SPA: 2, SPD: 1 }, baseFriendship: 50, baseExp: 239, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
{
      dex: '010', name: 'Sicklet', category: 'Sick Chick', types: ['NORMAL', 'FLYING'],
      height: '1\'01" ft', weight: '7.8 lbs', catchRate: 255, found: ['Route 1', 'Route 2', 'Eventide Forest'],
      abilities: ['Keen Eye', 'Poison Touch'],
      hidden: 'Overcoat',
      stats: { HP: 43, ATK: 31, DEF: 39, SPA: 56, SPD: 47, SPE: 63 },
      flavor: 'Sicklet are social Pokémon that often travel in groups. If one falls ill, the other Sicklet care for it until it recovers.',
      evo: { to: '011' },
      levelMoves: [
        M('1', 'Tackle'),
        M('1', 'Growl'),
        M('5', 'Gust'),  // REVIEW name
        M('8', 'Acid'),  // REVIEW name
        M('12', 'Quickattack'),  // REVIEW name
        M('15', 'Double Team'),
        M('21', 'Airslash'),  // REVIEW name
        M('25', 'Toxic'),  // REVIEW name
        M('31', 'Sludge'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Steelwing'),  // REVIEW name
        EGG('Ominouswind'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 50, baseExp: 49, growthRate: 'Medium',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '011', name: 'Buzzant', category: 'Airborne Illness', types: ['POISON', 'FLYING'],
      height: '4\'01" ft', weight: '70.5 lbs', catchRate: 120, found: [],
      abilities: ['Merciless', 'Poison Touch'],
      hidden: 'Overcoat',
      stats: { HP: 57, ATK: 46, DEF: 56, SPA: 74, SPD: 68, SPE: 87 },
      flavor: 'Buzzant are oppurtunistic, known to pick on poisoned Pokémon, attacking them until they faint.',
      evo: { from: '010', to: '012', method: 'Lv 14' },
      levelMoves: [
        M('1', 'Tackle'),
        M('1', 'Growl'),
        M('1', 'Gust'),  // REVIEW name
        M('1', 'Acid'),  // REVIEW name
        M('1', 'Quickattack'),  // REVIEW name
        M('18', 'Double Team'),
        M('22', 'Airslash'),  // REVIEW name
        M('26', 'Sludge'),  // REVIEW name
        M('29', 'Toxic'),  // REVIEW name
        M('32', 'Defog'),  // REVIEW name
        M('37', 'Sludgebomb'),  // REVIEW name
        M('42', 'Toxicspikes'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 50, baseExp: 119, growthRate: 'Medium',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '012', name: 'Grimazos', category: 'Plague Doctor', types: ['POISON', 'FLYING'],
      height: '5\'11" ft', weight: '97.8 lbs', catchRate: 45, found: [],
      abilities: ['Merciless', 'Sickness'],
      hidden: 'Overcoat',
      stats: { HP: 86, ATK: 73, DEF: 68, SPA: 97, SPD: 74, SPE: 95 },
      flavor: 'Grimazos are said to spread poison and sickness wherever it goes, though it seems to be a choice they make themselves.',
      evo: { from: '011', method: 'Lv 30' },
      levelMoves: [
        M('0', 'Venoshock'),  // REVIEW name
        M('1', 'Tackle'),
        M('1', 'Growl'),
        M('1', 'Gust'),  // REVIEW name
        M('1', 'Acid'),  // REVIEW name
        M('1', 'Quickattack'),  // REVIEW name
        M('1', 'Double Team'),
        M('1', 'Airslash'),  // REVIEW name
        M('1', 'Sludge'),  // REVIEW name
        M('1', 'Toxic'),  // REVIEW name
        M('36', 'Defog'),  // REVIEW name
        M('41', 'Sludgebomb'),  // REVIEW name
        M('45', 'Hurricaine'),  // REVIEW name
        M('49', 'Toxicspikes'),  // REVIEW name
        M('53', 'Bravebird'),  // REVIEW name
        M('58', 'Sludgewave'),  // REVIEW name
        M('64', 'Momento'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 2, SPE: 1 }, baseFriendship: 50, baseExp: 243, growthRate: 'Medium',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '013', name: 'Rarcraft', category: 'Scavenging', types: ['NORMAL'],
      height: '1\'02" ft', weight: '4.7 lbs', catchRate: 255, found: ['Route 1', 'Route 2', 'Route 3', 'Route 5'],
      abilities: ['Pick up', 'Frisk'],
      hidden: 'Pickpocket',
      stats: { HP: 37, ATK: 42, DEF: 40, SPA: 32, SPD: 37, SPE: 54 },
      flavor: 'Inspired by trashed, old, comic books, Racraft dream of becoming heroes. Their favorite powers are high durability, super speed and flight.',
      evo: { to: ['014', '015', '016'] },
      levelMoves: [
        M('1', 'Scratch'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('3', 'Thief'),
        M('6', 'Recycle'),  // REVIEW name
        M('9', 'Covet'),  // REVIEW name
        M('12', 'Snarl'),  // REVIEW name
        M('15', 'Charm'),  // REVIEW name
        M('18', 'Retaliate'),  // REVIEW name
        M('21', 'Switcheroo'),  // REVIEW name
        M('24', 'Naturepower'),  // REVIEW name
        M('27', 'Playrough'),  // REVIEW name
        M('30', 'Snatch'),  // REVIEW name
        M('33', 'Fling'),  // REVIEW name
        M('36', 'Lastresort'),  // REVIEW name
        M('39', 'Tidyup'),  // REVIEW name
        M('42', 'Baton Pass'),
      ],
      eggMoves: [
        EGG('Mudslap'),  // REVIEW name
        EGG('Cometpunch'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 70, baseExp: 51, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '014', name: 'Raclank', category: 'Sturdy Knight', types: ['NORMAL', 'STEEL'],
      height: '4\'06" ft', weight: '151.8 lbs', catchRate: 127, found: [],
      abilities: ['Mirror Armor', 'Battle Armor'],
      hidden: 'Heatproof',
      stats: { HP: 67, ATK: 80, DEF: 90, SPA: 42, SPD: 72, SPE: 64 },
      flavor: 'Inspired by the hero "Might Knight", Raclank sheilds\' themselves with a trash can. No amount of heat or blunt force can put a dent into it.',
      evo: { from: '013', method: 'Lv 20 (Near Trash Can)' },
      levelMoves: [
        M('0', 'Bulletpunch'),  // REVIEW name
        M('1', 'Bulletpunch'),  // REVIEW name
        M('1', 'Switcheroo'),  // REVIEW name
        M('1', 'Naturepower'),  // REVIEW name
        M('1', 'Playrough'),  // REVIEW name
        M('1', 'Fling'),  // REVIEW name
        M('1', 'Scratch'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('3', 'Thief'),
        M('6', 'Recycle'),  // REVIEW name
        M('9', 'Covet'),  // REVIEW name
        M('12', 'Snarl'),  // REVIEW name
        M('15', 'Charm'),  // REVIEW name
        M('18', 'Retaliate'),  // REVIEW name
        M('23', 'Wideguard'),  // REVIEW name
        M('28', 'Heavyslam'),  // REVIEW name
        M('33', 'Leafblade'),  // REVIEW name
        M('38', 'Snatch'),  // REVIEW name
        M('43', 'Meteormash'),  // REVIEW name
        M('48', 'Lastresort'),  // REVIEW name
        M('53', 'Sacredsword'),  // REVIEW name
        M('58', 'Baton Pass'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { DEF: 1, ATK: 1 }, baseFriendship: 70, baseExp: 145, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '015', name: 'Rasoar', category: 'Paper Wing', types: ['NORMAL', 'FLYING'],
      height: '4\'03" ft', weight: '111.4 lbs', catchRate: 127, found: [],
      abilities: ['Gale Wings', 'Infiltrator'],
      hidden: 'Prankster',
      stats: { HP: 67, ATK: 97, DEF: 56, SPA: 52, SPD: 59, SPE: 84 },
      flavor: 'Inspired by the heroine "Harpyie", Rasoar use wings made out of newspapers to fly. Strangely, some of the newspapers showcase headlines from the future.',
      evo: { from: '013', method: 'Lv 20 (Near Quest Board)' },
      levelMoves: [
        M('0', 'Wingattack'),  // REVIEW name
        M('1', 'Wingattack'),  // REVIEW name
        M('1', 'Switcheroo'),  // REVIEW name
        M('1', 'Naturepower'),  // REVIEW name
        M('1', 'Playrough'),  // REVIEW name
        M('1', 'Fling'),  // REVIEW name
        M('1', 'Scratch'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('3', 'Thief'),
        M('6', 'Recycle'),  // REVIEW name
        M('9', 'Covet'),  // REVIEW name
        M('12', 'Snarl'),  // REVIEW name
        M('15', 'Charm'),  // REVIEW name
        M('18', 'Retaliate'),  // REVIEW name
        M('23', 'Quickguard'),  // REVIEW name
        M('28', 'Fly'),  // REVIEW name
        M('33', 'Gravapple'),  // REVIEW name
        M('38', 'Snatch'),  // REVIEW name
        M('43', 'Tailwind'),  // REVIEW name
        M('48', 'Lastresort'),  // REVIEW name
        M('53', 'Flyingpress'),  // REVIEW name
        M('58', 'Baton Pass'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Aerial Ace'),
      ],
      anomaly: null,
      evYield: { ATK: 1, SPE: 1 }, baseFriendship: 70, baseExp: 145, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '016', name: 'Razoom', category: 'Sugar Rush', types: ['NORMAL', 'ELECTRIC'],
      height: '4\'11" ft', weight: '136.8 lbs', catchRate: 127, found: [],
      abilities: ['Speed Boost', 'Insomnia'],
      hidden: 'Electric Surge',
      stats: { HP: 67, ATK: 52, DEF: 50, SPA: 75, SPD: 77, SPE: 94 },
      flavor: 'Inspired by the hero "Sugar Rush", Razoom fuels itself with fizzed up energy drinks, racing beyond the naked eye. But never enough for time travel.',
      evo: { from: '013', method: 'Lv 20 (Near Vending Machine)' },
      levelMoves: [
        M('0', 'Swift'),
        M('0', 'Electroball'),  // REVIEW name
        M('1', 'Swift'),
        M('1', 'Electroball'),  // REVIEW name
        M('1', 'Switcheroo'),  // REVIEW name
        M('1', 'Naturepower'),  // REVIEW name
        M('1', 'Playrough'),  // REVIEW name
        M('1', 'Fling'),  // REVIEW name
        M('1', 'Scratch'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('3', 'Thief'),
        M('6', 'Recycle'),  // REVIEW name
        M('9', 'Covet'),  // REVIEW name
        M('12', 'Snarl'),  // REVIEW name
        M('15', 'Charm'),  // REVIEW name
        M('18', 'Retaliate'),  // REVIEW name
        M('23', 'Detect'),  // REVIEW name
        M('28', 'Paraboliccharge'),  // REVIEW name
        M('33', 'Triattack'),  // REVIEW name
        M('38', 'Snatch'),  // REVIEW name
        M('43', 'Thunderclap'),  // REVIEW name
        M('48', 'Lastresort'),  // REVIEW name
        M('53', 'Boomburst'),  // REVIEW name
        M('58', 'Baton Pass'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 70, baseExp: 145, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '017', name: 'Reetle', category: 'Charging', types: ['BUG'],
      height: '1\'00" ft', weight: '6.8 lbs', catchRate: 255, found: ['Route 1', 'Eventide Forest'],
      abilities: ['Rattled', 'Compound Eyes'],
      hidden: 'Soundproof',
      stats: { HP: 35, ATK: 30, DEF: 30, SPA: 25, SPD: 30, SPE: 40 },
      flavor: 'Reetle is assumed to be easy prey due to how physically weak it is, but its outer carapace is toughened from blindly ramming into rocks and trees.',
      evo: { to: '018' },
      levelMoves: [
        M('1', 'Astonish'),  // REVIEW name
        M('1', 'Growl'),
        M('4', 'Flail'),  // REVIEW name
        M('8', 'Pounce'),  // REVIEW name
        M('12', 'Screech'),  // REVIEW name
        M('20', 'Hyper Voice'),
        M('36', 'Boomburst'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Headbutt'),
        EGG('Fissure'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 50, baseExp: 36, growthRate: 'Medium',
      eggGroups: ['Bug'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '018', name: 'Concewn', category: 'Crashing', types: ['BUG', 'GROUND'],
      height: '2\'02" ft', weight: '34 lbs', catchRate: 120, found: ['Route 4'],
      abilities: ['Shed Skin', 'Compound Eyes'],
      hidden: 'Soundproof',
      stats: { HP: 55, ATK: 50, DEF: 80, SPA: 45, SPD: 60, SPE: 45 },
      flavor: 'In ancient times their shell was used as armor. Concewn strangely enjoy taking hits and seek out strong attackers.',
      evo: { from: '017', to: '019', method: 'Lv 12' },
      levelMoves: [
        M('0', 'Irondefense'),  // REVIEW name
        M('1', 'Irondefense'),  // REVIEW name
        M('1', 'Smackdown'),  // REVIEW name
        M('1', 'Astonish'),  // REVIEW name
        M('1', 'Growl'),
        M('4', 'Flail'),  // REVIEW name
        M('8', 'Pounce'),  // REVIEW name
        M('12', 'Screech'),  // REVIEW name
        M('16', 'Magnitude'),  // REVIEW name
        M('21', 'Laserfocus'),  // REVIEW name
        M('26', 'Takedown'),  // REVIEW name
        M('31', 'Lunge'),  // REVIEW name
        M('36', 'Acupressure'),  // REVIEW name
        M('41', 'Doubleedge'),  // REVIEW name
        M('46', 'Spikes'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Rest'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 50, baseExp: 117, growthRate: 'Medium',
      eggGroups: ['Bug'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '019', name: 'Rihnihilate', category: 'Raging', types: ['BUG', 'GROUND'],
      height: '4\'05" ft', weight: '82.3 lbs', catchRate: 45, found: [],
      abilities: ['Stampede', 'Moxie'],
      hidden: 'Reckless',
      stats: { HP: 80, ATK: 120, DEF: 100, SPA: 45, SPD: 70, SPE: 90 },
      flavor: 'An enraged Rihnihilate can smash through walls, trees and even creatures alike to reach its target, earning the title "unstoppable force".',
      evo: { from: '018', method: 'Lv 32' },
      levelMoves: [
        M('0', 'Drillrun'),  // REVIEW name
        M('1', 'Drillrun'),  // REVIEW name
        M('1', 'Irondefense'),  // REVIEW name
        M('1', 'Smackdown'),  // REVIEW name
        M('1', 'Astonish'),  // REVIEW name
        M('1', 'Growl'),
        M('4', 'Flail'),  // REVIEW name
        M('8', 'Pounce'),  // REVIEW name
        M('12', 'Screech'),  // REVIEW name
        M('16', 'Magnitude'),  // REVIEW name
        M('21', 'Laserfocus'),  // REVIEW name
        M('26', 'Takedown'),  // REVIEW name
        M('31', 'Lunge'),  // REVIEW name
        M('36', 'Acupressure'),  // REVIEW name
        M('42', 'Doubleedge'),  // REVIEW name
        M('48', 'Megahorn'),  // REVIEW name
        M('54', 'Spikes'),  // REVIEW name
        M('60', 'Headsmash'),  // REVIEW name
        M('66', 'Headlongrush'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 2, DEF: 1 }, baseFriendship: 50, baseExp: 253, growthRate: 'Medium',
      eggGroups: ['Bug'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '020', name: 'Dustalon', category: 'Brood Litter', types: ['NORMAL', 'GROUND'],
      height: '1\'04" ft', weight: '4 lbs', catchRate: 120, found: ['Route 3'],
      abilities: ['Tangled Feet', 'Big Pecks'],
      hidden: 'Keen Eye',
      stats: { HP: 67, ATK: 40, DEF: 50, SPA: 50, SPD: 60, SPE: 40 },
      flavor: 'Dustalon\'s wings are too small to fly yet, so instead, they help their flocks by burrowing underground and gathering materials for their elders.',
      evo: { to: ['021', '022'] },
      levelMoves: [
        M('1', 'Tackle'),
        M('1', 'Sand Attack'),
        M('6', 'Quickattack'),  // REVIEW name
        M('9', 'Gust'),  // REVIEW name
        M('13', 'Honeclaws'),  // REVIEW name
        M('17', 'Mudslap'),  // REVIEW name
        M('22', 'Whirlwind'),  // REVIEW name
        M('26', 'Aerial Ace'),
        M('31', 'Agility'),
        M('36', 'Featherdance'),  // REVIEW name
        M('41', 'Bravebird'),  // REVIEW name
        M('46', 'Hurricaine'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Aircutter'),  // REVIEW name
        EGG('Pursuit'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 1 }, baseFriendship: 50, baseExp: 76, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '021', name: 'Tufftalon', category: 'Ground Guardian', types: ['GROUND', 'FLYING'],
      height: '4\'07" ft', weight: '114.6 lbs', catchRate: 45, found: [],
      abilities: ['Sand Bath', 'Big Pecks'],
      hidden: 'Sand Spit',
      stats: { HP: 105, ATK: 95, DEF: 115, SPA: 65, SPD: 75, SPE: 50 },
      flavor: 'Their large bodies make them too heavy for flight, so instead, they use their strength to build ample rock niches with materials gathered by Dustalon.',
      evo: { from: '020', method: 'Lv 30 (Male)' },
      levelMoves: [
        M('0', 'Muddywall'),  // REVIEW name
        M('1', 'Tackle'),
        M('1', 'Sand Attack'),
        M('1', 'Quickattack'),  // REVIEW name
        M('1', 'Gust'),  // REVIEW name
        M('1', 'Honeclaws'),  // REVIEW name
        M('1', 'Mudslap'),  // REVIEW name
        M('1', 'Whirlwind'),  // REVIEW name
        M('1', 'Aerial Ace'),
        M('35', 'Stompingtantrum'),  // REVIEW name
        M('41', 'Featherdance'),  // REVIEW name
        M('47', 'Bravebird'),  // REVIEW name
        M('52', 'Stealthrocks'),  // REVIEW name
        M('58', 'Irondefense'),  // REVIEW name
        M('64', 'Earthquake'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 50, baseExp: 232, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 100, f: 0 }, eggCycles: 3840,
    },
{
      dex: '022', name: 'Cufftalon', category: 'Aerial Guardian', types: ['FLYING', 'GROUND'],
      height: '3\'11" ft', weight: '83.8 lbs', catchRate: 45, found: [],
      abilities: ['Sand Rush', 'Big Pecks'],
      hidden: 'Sand Stream',
      stats: { HP: 75, ATK: 50, DEF: 65, SPA: 115, SPD: 95, SPE: 105 },
      flavor: 'Their quick and nimble bodies make them able to fly, which helps them survey the ground and gather food for the group.',
      evo: { from: '020', method: 'Lv 30 (Female)' },
      levelMoves: [
        M('0', 'Sandblast'),  // REVIEW name
        M('1', 'Tackle'),
        M('1', 'Sand Attack'),
        M('1', 'Quickattack'),  // REVIEW name
        M('1', 'Gust'),  // REVIEW name
        M('1', 'Honeclaws'),  // REVIEW name
        M('1', 'Mudslap'),  // REVIEW name
        M('1', 'Whirlwind'),  // REVIEW name
        M('1', 'Aerial Ace'),
        M('35', 'Scorchingsands'),  // REVIEW name
        M('41', 'Defog'),  // REVIEW name
        M('47', 'Hurricaine'),  // REVIEW name
        M('52', 'Uturn'),  // REVIEW name
        M('58', 'Agility'),
        M('64', 'Earthpower'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 2 }, baseFriendship: 50, baseExp: 232, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 0, f: 100 }, eggCycles: 3840,
    },
{
      dex: '023', name: 'Marmie', category: 'Scrappy', types: ['NORMAL', 'DARK'],
      height: '0\'09" ft', weight: '20 lbs', catchRate: 180, found: ['Eventide Forest'],
      abilities: ['Fur Coat', 'Opportunist'],
      hidden: 'Hustle',
      stats: { HP: 50, ATK: 60, DEF: 50, SPA: 30, SPD: 45, SPE: 55 },
      flavor: 'Despite its tiny size, Marmie brims with fighting spirit. Swing its tiny fists at foes ten times larger, though they land like soft and fluffy pats.',
      evo: { to: '024' },
      levelMoves: [
        M('1', 'Powertrip'),  // REVIEW name
        M('1', 'Leer'),  // REVIEW name
        M('5', 'Work Up'),
        M('8', 'Fake Out'),
        M('12', 'Armthrust'),  // REVIEW name
        M('15', 'Focusenergy'),  // REVIEW name
        M('19', 'Cometpunch'),  // REVIEW name
        M('22', 'Beatup'),  // REVIEW name
        M('26', 'Vital Throw'),
        M('29', 'Bulk Up'),
        M('33', 'Strength'),  // REVIEW name
        M('36', 'Knockoff'),  // REVIEW name
        M('40', 'Drainpunch'),  // REVIEW name
        M('43', 'Nastyplot'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Chipaway'),  // REVIEW name
        EGG('Taunt'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { ATK: 1 }, baseFriendship: 50, baseExp: 70, growthRate: 'Slow',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '024', name: 'Maulmot', category: 'Humble', types: ['FIGHTING', 'DARK'],
      height: '5\'11" ft', weight: '396.8 lbs', catchRate: 90, found: [],
      abilities: ['Fur Coat', 'Opportunist'],
      hidden: 'Truant',
      stats: { HP: 95, ATK: 105, DEF: 80, SPA: 40, SPD: 75, SPE: 75 },
      flavor: 'Maulmot is immensely strong yet shuns conflict, using its bulk to block cave entrances, but would rather take a nap than throw a punch.',
      evo: { from: '023', method: 'Lv 25' },
      levelMoves: [
        M('0', 'Obstruct'),  // REVIEW name
        M('1', 'Obstruct'),  // REVIEW name
        M('1', 'Bodypress'),  // REVIEW name
        M('1', 'Nastyplot'),  // REVIEW name
        M('1', 'Powertrip'),  // REVIEW name
        M('1', 'Leer'),  // REVIEW name
        M('1', 'Work Up'),
        M('1', 'Fake Out'),
        M('12', 'Armthrust'),  // REVIEW name
        M('15', 'Focusenergy'),  // REVIEW name
        M('19', 'Cometpunch'),  // REVIEW name
        M('22', 'Beatup'),  // REVIEW name
        M('27', 'Vital Throw'),
        M('31', 'Bulk Up'),
        M('36', 'Strength'),  // REVIEW name
        M('40', 'Knockoff'),  // REVIEW name
        M('45', 'Drainpunch'),  // REVIEW name
        M('49', 'Yawn'),
        M('54', 'Finalgambit'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Lowsweep'),  // REVIEW name
        TM('08', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { ATK: 1, HP: 1 }, baseFriendship: 50, baseExp: 194, growthRate: 'Slow',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '025', name: 'Yarnsect', category: 'Tangled', types: ['BUG', 'FAIRY'],
      height: '1\'00" ft', weight: '4.4 lbs', catchRate: 255, found: ['Eventide Forest', 'Pebpup Cavern'],
      abilities: ['Cute Charm', 'Oblivious'],
      hidden: 'Swarm',
      stats: { HP: 32, ATK: 29, DEF: 40, SPA: 40, SPD: 31, SPE: 38 },
      flavor: 'Yarnsect Yarn is a Drapallan Staple as one of the largest farmed materials known for it\'s surprising durability, softness, and warmth.',
      evo: { to: '026' },
      levelMoves: [
        M('1', 'Fairywind'),  // REVIEW name
        M('1', 'Stringshot'),  // REVIEW name
        M('5', 'Cut'),  // REVIEW name
        M('8', 'Sturgglebug'),  // REVIEW name
        M('11', 'Sweetscent'),  // REVIEW name
        M('14', 'Drainingkiss'),  // REVIEW name
        M('18', 'Spiderweb'),  // REVIEW name
        M('22', 'Signalbeam'),  // REVIEW name
        M('25', 'Happilyeverafter'),  // REVIEW name
        M('29', 'Stickyweb'),  // REVIEW name
        M('33', 'Ragepowder'),  // REVIEW name
        M('36', 'Bugbuzz'),  // REVIEW name
        M('40', 'Fantasiablast'),  // REVIEW name
        M('44', 'Firstimpession'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Lunge'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPD: 1 }, baseFriendship: 70, baseExp: 52, growthRate: 'Medium',
      eggGroups: ['Bug'], gender: { m: 25.0, f: 75.0 }, eggCycles: 3840,
    },
{
      dex: '026', name: 'Grantula', category: 'Knitting', types: ['BUG', 'FAIRY'],
      height: '2\'07" ft', weight: '34.2 lbs', catchRate: 90, found: [],
      abilities: ['Cute Charm', 'Knit Trap'],
      hidden: 'Swarm',
      stats: { HP: 60, ATK: 49, DEF: 80, SPA: 80, SPD: 59, SPE: 76 },
      flavor: 'Grantula are extremely loyal to their trainers. If you spend enough time with one, it will knit you a sweater using its yarn.',
      evo: { from: '025', method: 'Lv 15' },
      levelMoves: [
        M('0', 'Silktrap'),  // REVIEW name
        M('1', 'Silktrap'),  // REVIEW name
        M('1', 'Fairywind'),  // REVIEW name
        M('1', 'Stringshot'),  // REVIEW name
        M('1', 'Cut'),  // REVIEW name
        M('1', 'Sturgglebug'),  // REVIEW name
        M('11', 'Sweetscent'),  // REVIEW name
        M('14', 'Drainingkiss'),  // REVIEW name
        M('19', 'Spiderweb'),  // REVIEW name
        M('24', 'Signalbeam'),  // REVIEW name
        M('28', 'Happilyeverafter'),  // REVIEW name
        M('33', 'Stickyweb'),  // REVIEW name
        M('37', 'Ragepowder'),  // REVIEW name
        M('41', 'Bugbuzz'),  // REVIEW name
        M('45', 'Fantasiablast'),  // REVIEW name
        M('49', 'Firstimpession'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 1, SPD: 1 }, baseFriendship: 70, baseExp: 162, growthRate: 'Medium',
      eggGroups: ['Bug'], gender: { m: 25.0, f: 75.0 }, eggCycles: 3840,
    },
{
      dex: '027', name: 'Pawnut', category: 'Seed Squire', types: ['GRASS'],
      height: '1\'04" ft', weight: '9.9 lbs', catchRate: 255, found: ['Eventide Forest'],
      abilities: ['Inner Focus', 'Weak Armor'],
      hidden: 'Anger shell',
      stats: { HP: 50, ATK: 70, DEF: 65, SPA: 25, SPD: 55, SPE: 40 },
      flavor: 'A feeble Pokémon, Pawnut is often too scared to move. Foraging Cufftalon will sometimes pick them up, mistaking it for an acorn.',
      evo: { to: '028' },
      levelMoves: [
        M('1', 'Tackle'),
        M('1', 'Harden'),  // REVIEW name
        M('4', 'Leechseed'),  // REVIEW name
        M('7', 'Growth'),  // REVIEW name
        M('11', 'Protect'),
        M('16', 'Bulletseed'),  // REVIEW name
        M('22', 'Gigadrain'),  // REVIEW name
        M('26', 'Ingrain'),  // REVIEW name
        M('32', 'Seedbomb'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Worry Seed'),
        EGG('Powerwhip'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 1 }, baseFriendship: 50, baseExp: 65, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
{
      dex: '028', name: 'Peaknight', category: 'Valiant', types: ['GRASS', 'FIGHTING'],
      height: '4\'07" ft', weight: '132.3 lbs', catchRate: 45, found: [],
      abilities: ['Inner Focus', 'Weak Armor'],
      hidden: 'Anger shell',
      stats: { HP: 70, ATK: 102, DEF: 90, SPA: 55, SPD: 80, SPE: 105 },
      flavor: 'Now much braver, Peaknight is a noble fighter. It is said that ancient warriors modeled their armor after Peaknight\'s hard exterior.',
      evo: { from: '027', method: 'Level Up with Assault Vest' },
      levelMoves: [
        M('0', 'Machpunch'),  // REVIEW name
        M('1', 'Tackle'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Bulletseed'),  // REVIEW name
        M('1', 'Growth'),  // REVIEW name
        M('1', 'Protect'),
        M('1', 'Leechseed'),  // REVIEW name
        M('1', 'Gigadrain'),  // REVIEW name
        M('1', 'Ingrain'),  // REVIEW name
        M('26', 'Brickbreak'),  // REVIEW name
        M('30', 'Fake Out'),
        M('35', 'Lowkick'),  // REVIEW name
        M('38', 'Trailblaze'),  // REVIEW name
        M('42', 'Facade'),  // REVIEW name
        M('48', 'Seedbomb'),  // REVIEW name
        M('53', 'Highhorsepower'),  // REVIEW name
        M('58', 'Closecombat'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Rest'),
        TM('04', 'Lowsweep'),  // REVIEW name
        TM('05', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 50, baseExp: 165, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
{
      dex: '029', name: 'Capikid', category: 'Tiny Spark', types: ['ELECTRIC'],
      height: '1\'03" ft', weight: '21.7 lbs', catchRate: 220, found: ['Route 3', 'Route 5'],
      abilities: ['Fluffy', 'Volt Absorb'],
      hidden: 'Klutz',
      stats: { HP: 25, ATK: 25, DEF: 25, SPA: 45, SPD: 40, SPE: 50 },
      flavor: 'Capikid stores electrical energy in the fluffy clouds around its body. On dry days, herds roll about, rumbling like tiny thunderstorms.',
      evo: { to: '030' },
      levelMoves: [
        M('1', 'Thundershock'),  // REVIEW name
        M('1', 'Babydolleyes'),  // REVIEW name
        M('4', 'Doubleslap'),  // REVIEW name
        M('8', 'Thunderwave'),  // REVIEW name
        M('12', 'Chargebeam'),  // REVIEW name
        M('16', 'Helpinghand'),  // REVIEW name
        M('20', 'Followme'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Spark'),  // REVIEW name
        EGG('Bodyslam'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 50, baseExp: 41, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 2805,
    },
{
      dex: '030', name: 'Capicharga', category: 'Static Weeze', types: ['ELECTRIC'],
      height: '2\'06" ft', weight: '88.9 lbs', catchRate: 180, found: [],
      abilities: ['Fluffy', 'Volt Absorb'],
      hidden: 'Refrigerate',
      stats: { HP: 40, ATK: 40, DEF: 45, SPA: 80, SPD: 55, SPE: 90 },
      flavor: 'Capicharga delight in thunderstorms, happily waiting to absorb lightning strikes. Its cheeks would hum and glow indicating that it\'s full of charge.',
      evo: { from: '029', to: '031', method: 'High Friendship' },
      levelMoves: [
        M('1', 'Doubleslap'),  // REVIEW name
        M('1', 'Followme'),  // REVIEW name
        M('1', 'Chargebeam'),  // REVIEW name
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Thunderwave'),  // REVIEW name
        M('1', 'Thundershock'),  // REVIEW name
        M('1', 'Babydolleyes'),  // REVIEW name
        M('3', 'Quickattack'),  // REVIEW name
        M('8', 'Nuzzle'),  // REVIEW name
        M('12', 'Electrify'),  // REVIEW name
        M('15', 'Hyperfang'),  // REVIEW name
        M('18', 'Shockwave'),  // REVIEW name
        M('23', 'Eerieimpulse'),  // REVIEW name
        M('27', 'Mist'),  // REVIEW name
        M('30', 'Discharge'),  // REVIEW name
        M('35', 'Frostbreath'),  // REVIEW name
        M('39', 'Calm Mind'),
        M('42', 'Superfang'),  // REVIEW name
        M('45', 'Volttackle'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 50, baseExp: 118, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 2805,
    },
{
      dex: '031', name: 'Capibarron', category: 'Cold Shock', types: ['ELECTRIC', 'ICE'],
      height: '5\'02" ft', weight: '213.6 lbs', catchRate: 70, found: [],
      abilities: ['Thick Fat', 'Volt Absorb'],
      hidden: 'Refrigerate',
      stats: { HP: 140, ATK: 70, DEF: 55, SPA: 110, SPD: 65, SPE: 50 },
      flavor: 'Capibarron emerge when Capicharga absorb ice from a snowstorm. They unleash freeze lightning at sub-zero temperatures, storing it for later.',
      evo: { from: '030', method: 'Knows Frost Breath' },
      levelMoves: [
        M('0', 'Iondeluge'),  // REVIEW name
        M('1', 'Iondeluge'),  // REVIEW name
        M('1', 'Belly Drum'),
        M('1', 'Doubleslap'),  // REVIEW name
        M('1', 'Followme'),  // REVIEW name
        M('1', 'Chargebeam'),  // REVIEW name
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Thunderwave'),  // REVIEW name
        M('1', 'Thundershock'),  // REVIEW name
        M('1', 'Babydolleyes'),  // REVIEW name
        M('3', 'Quickattack'),  // REVIEW name
        M('8', 'Nuzzle'),  // REVIEW name
        M('12', 'Electrify'),  // REVIEW name
        M('15', 'Hyperfang'),  // REVIEW name
        M('18', 'Shockwave'),  // REVIEW name
        M('23', 'Eerieimpulse'),  // REVIEW name
        M('27', 'Mist'),  // REVIEW name
        M('30', 'Discharge'),  // REVIEW name
        M('35', 'Frostbreath'),  // REVIEW name
        M('40', 'Calm Mind'),
        M('44', 'Superfang'),  // REVIEW name
        M('47', 'Thunder'),  // REVIEW name
        M('51', 'Chillyreception'),  // REVIEW name
        M('56', 'Sheercold'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
        TM('09', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { HP: 2, SPA: 1 }, baseFriendship: 50, baseExp: 220, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 2805,
    },
{
      dex: '032', name: 'Powse', category: 'Popping', types: ['NORMAL'],
      height: '0\'03" ft', weight: '0.06 lbs', catchRate: 190, found: ['Route 4'],
      abilities: ['Cheek Pouch'],
      hidden: 'Aftermath',
      stats: { HP: 25, ATK: 71, DEF: 37, SPA: 61, SPD: 37, SPE: 65 },
      flavor: 'Powse are popular pets, but unsuitable for small children. They are curious and often end up in situations that cause them to explode.',
      evo: { to: '033' },
      levelMoves: [
        M('1', 'Pound'),
        M('1', 'Tail Whip'),
        M('4', 'Work Up'),
        M('8', 'Quickattack'),  // REVIEW name
        M('13', 'Focusenergy'),  // REVIEW name
        M('17', 'Doublehit'),  // REVIEW name
        M('21', 'Firefang'),  // REVIEW name
        M('26', 'Spark'),  // REVIEW name
        M('26', 'Selfdestruct'),  // REVIEW name
        M('30', 'Uproar'),  // REVIEW name
        M('34', 'Painsplit'),  // REVIEW name
        M('39', 'Bounce'),  // REVIEW name
        M('43', 'Explosion'),  // REVIEW name
        M('47', 'Superfang'),  // REVIEW name
        M('52', 'Skullbash'),  // REVIEW name
        M('56', 'Memento'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Meteor Beam'),
        EGG('Babydolleyes'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { ATK: 1 }, baseFriendship: 50, baseExp: 61, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
{
      dex: '033', name: 'Boomurine', category: 'Booming', types: ['NORMAL', 'FIRE'],
      height: '0\'09" ft', weight: '1.5 lbs', catchRate: 75, found: [],
      abilities: ['Short Fuse'],
      hidden: 'Aftermath',
      stats: { HP: 50, ATK: 111, DEF: 57, SPA: 121, SPD: 57, SPE: 100 },
      flavor: 'When angered, its tail ignites. Once the flame reaches the body of Boomurine, it erupts in a blast equal to 55 megatons of TNT.',
      evo: { from: '032', method: 'Fire Stone' },
      levelMoves: [
        M('1', 'Firelash'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Tail Whip'),
        M('4', 'Work Up'),
        M('8', 'Quickattack'),  // REVIEW name
        M('13', 'Focusenergy'),  // REVIEW name
        M('17', 'Doublehit'),  // REVIEW name
        M('21', 'Firefang'),  // REVIEW name
        M('26', 'Spark'),  // REVIEW name
        M('26', 'Selfdestruct'),  // REVIEW name
        M('30', 'Uproar'),  // REVIEW name
        M('34', 'Painsplit'),  // REVIEW name
        M('39', 'Bounce'),  // REVIEW name
        M('43', 'Explosion'),  // REVIEW name
        M('47', 'Superfang'),  // REVIEW name
        M('52', 'Skullbash'),  // REVIEW name
        M('56', 'Memento'),  // REVIEW name
        M('60', 'Burn Up'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { ATK: 1, SPA: 1 }, baseFriendship: 50, baseExp: 176, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
{
      dex: '034', name: 'Tartort', category: 'Dragonfruit', types: ['GRASS'],
      height: '2\'11" ft', weight: '33.29 lbs', catchRate: 120, found: ['Eventide Forest'],
      abilities: ['Sweet Veil', 'Ripen'],
      hidden: 'Supersweet Syrup',
      stats: { HP: 40, ATK: 40, DEF: 55, SPA: 70, SPD: 55, SPE: 40 },
      flavor: 'Tartort\'s berry is a prized delicacy. Only certified chefs are allowed to prepare it, as incorrect preparation is said to drive consumers insane.',
      evo: { to: '035' },
      levelMoves: [
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Sweetscent'),  // REVIEW name
        M('1', 'Naturalgift'),  // REVIEW name
        M('5', 'Growth'),  // REVIEW name
        M('10', 'Breakingswipe'),  // REVIEW name
        M('15', 'Leaftornado'),  // REVIEW name
        M('20', 'Aromaticmist'),  // REVIEW name
        M('25', 'Chilling Water'),
        M('30', 'Gigadrain'),  // REVIEW name
        M('35', 'Weatherball'),  // REVIEW name
        M('40', 'Nastyplot'),  // REVIEW name
        M('45', 'Earthpower'),  // REVIEW name
        M('50', 'Decorate'),  // REVIEW name
        M('55', 'Aromatherapy'),  // REVIEW name
        M('60', 'Leaf Storm'),
      ],
      eggMoves: [
        EGG('Leechseed'),  // REVIEW name
        EGG('Dragontail'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 1 }, baseFriendship: 50, baseExp: 58, growthRate: 'Eratic',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
    {
      dex: '035', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '034', method: 'item ???' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
{
      dex: '036', name: 'Scraqua', category: 'Water Droplet', types: ['WATER'],
      height: '1\'00" ft', weight: '29.8 lbs', catchRate: 190, found: ['Route 2'],
      abilities: ['Teething', 'Hydration'],
      hidden: 'Ball Fetch',
      stats: { HP: 50, ATK: 60, DEF: 45, SPA: 30, SPD: 35, SPE: 60 },
      flavor: 'A very trusting Pokémon that loves attention. When happy, Scraqua makes a sound similar to a boiling kettle.',
      evo: { to: '037' },
      levelMoves: [
        M('1', 'Tackle'),
        M('4', 'Watersport'),  // REVIEW name
        M('7', 'Howl'),  // REVIEW name
        M('10', 'Bite'),  // REVIEW name
        M('13', 'Odorleuth'),  // REVIEW name
        M('16', 'Aquajet'),  // REVIEW name
        M('19', 'Snarl'),  // REVIEW name
        M('22', 'Screech'),  // REVIEW name
        M('25', 'Poisonfang'),  // REVIEW name
        M('28', 'Roar'),  // REVIEW name
        M('31', 'Chipaway'),  // REVIEW name
        M('34', 'Flipturn'),  // REVIEW name
        M('36', 'Crunch'),  // REVIEW name
        M('40', 'Taunt'),  // REVIEW name
        M('44', 'Wavecrash'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Hyperfang'),  // REVIEW name
        EGG('Soak'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 1 }, baseFriendship: 50, baseExp: 56, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '037', name: 'Hydrena', category: 'Water Pressure', types: ['WATER', 'COSMIC'],
      height: '4\'11" ft', weight: '109.1 lbs', catchRate: 25, found: [],
      abilities: ['Strong Jaw', 'Battle Armor'],
      hidden: 'Intimidate',
      stats: { HP: 82, ATK: 130, DEF: 104, SPA: 40, SPD: 80, SPE: 44 },
      flavor: 'Hydrena possess the most lethal bite of any Pokémon, with teeth capable of firing pressurized water. Packs are led by the oldest female.',
      evo: { from: '036', method: 'Lv 30' },
      levelMoves: [
        M('0', 'Eclipsestrike'),  // REVIEW name
        M('1', 'Eclipsestrike'),  // REVIEW name
        M('1', 'Tractorbeam'),  // REVIEW name
        M('1', 'Icefang'),  // REVIEW name
        M('1', 'Aquacutter'),  // REVIEW name
        M('1', 'Tackle'),
        M('1', 'Watersport'),  // REVIEW name
        M('1', 'Howl'),  // REVIEW name
        M('1', 'Bite'),  // REVIEW name
        M('13', 'Odorleuth'),  // REVIEW name
        M('16', 'Aquajet'),  // REVIEW name
        M('19', 'Snarl'),  // REVIEW name
        M('22', 'Screech'),  // REVIEW name
        M('25', 'Poisonfang'),  // REVIEW name
        M('28', 'Roar'),  // REVIEW name
        M('33', 'Chipaway'),  // REVIEW name
        M('37', 'Flipturn'),  // REVIEW name
        M('40', 'Jawlock'),  // REVIEW name
        M('45', 'Moonlight'),
        M('50', 'Wavecrash'),  // REVIEW name
        M('56', 'Supernova'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 1, DEF: 1 }, baseFriendship: 0, baseExp: 172, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 10240,
    },
{
      dex: '038', name: 'Scalfling', category: 'Toxic Rush', types: ['NORMAL', 'POISON'],
      height: '1\'04" ft', weight: '115.7 lbs', catchRate: 190, found: ['Route 2'],
      abilities: ['Anger Point', 'Poison Point'],
      hidden: 'Poison Rush',
      stats: { HP: 70, ATK: 50, DEF: 32, SPA: 29, SPD: 32, SPE: 27 },
      flavor: 'Scalfling’s poison is undevelopped, so it battles by charging its horns around to gain momentum and striking at opponents’ blind spots.',
      evo: { to: '039' },
      levelMoves: [
        M('1', 'Poisonsting'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('5', 'Rage'),  // REVIEW name
        M('10', 'Beatup'),  // REVIEW name
        M('14', 'Curse'),  // REVIEW name
        M('20', 'Headbutt'),
        M('25', 'Belch'),  // REVIEW name
        M('30', 'Poisonjab'),  // REVIEW name
        M('35', 'Agility'),
        M('40', 'Superpower'),  // REVIEW name
        M('45', 'Skullbash'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Headlongrush'),  // REVIEW name
        EGG('Pounce'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { HP: 1 }, baseFriendship: 60, baseExp: 50, growthRate: 'Parabolic',
      eggGroups: ['Monster'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
{
      dex: '039', name: 'Bision', category: 'Poison Charge', types: ['NORMAL', 'POISON'],
      height: '3\'02" ft', weight: '180.8 lbs', catchRate: 120, found: [],
      abilities: ['Anger Point', 'Poison Point'],
      hidden: 'Poison Rush',
      stats: { HP: 90, ATK: 70, DEF: 52, SPA: 49, SPD: 52, SPE: 47 },
      flavor: 'Bision anger quickly; though its charge is easy to dodge, its tail strikes independently and cannot be avoided.',
      evo: { from: '038', to: '040', method: 'Lv 15' },
      levelMoves: [
        M('0', 'Poisontail'),  // REVIEW name
        M('1', 'Poisontail'),  // REVIEW name
        M('1', 'Poisonsting'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('1', 'Rage'),  // REVIEW name
        M('1', 'Beatup'),  // REVIEW name
        M('14', 'Curse'),  // REVIEW name
        M('21', 'Headbutt'),
        M('27', 'Belch'),  // REVIEW name
        M('33', 'Poisonjab'),  // REVIEW name
        M('39', 'Agility'),
        M('45', 'Superpower'),  // REVIEW name
        M('51', 'Skullbash'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { HP: 1, ATK: 1 }, baseFriendship: 60, baseExp: 131, growthRate: 'Parabolic',
      eggGroups: ['Monster'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
{
      dex: '040', name: 'Taurocnid', category: 'Lethal Rage', types: ['NORMAL', 'POISON'],
      height: '5\'11" ft', weight: '274.2 lbs', catchRate: 45, found: [],
      abilities: ['Anger Point', 'Poison Point'],
      hidden: 'Poison Rush',
      stats: { HP: 120, ATK: 100, DEF: 72, SPA: 64, SPD: 72, SPE: 92 },
      flavor: 'Constantly filled with rage and energy, Taurocnid store an assortment of toxins in its three tails; neurotoxin, cytotoxin, and sedative.',
      evo: { from: '039', method: 'Lv 40' },
      levelMoves: [
        M('0', 'Ragingbull'),  // REVIEW name
        M('1', 'Ragingbull'),  // REVIEW name
        M('1', 'Poisontail'),  // REVIEW name
        M('1', 'Poisonsting'),  // REVIEW name
        M('1', 'Tail Whip'),
        M('1', 'Rage'),  // REVIEW name
        M('1', 'Beatup'),  // REVIEW name
        M('14', 'Curse'),  // REVIEW name
        M('21', 'Headbutt'),
        M('27', 'Belch'),  // REVIEW name
        M('33', 'Poisonjab'),  // REVIEW name
        M('39', 'Agility'),
        M('46', 'Superpower'),  // REVIEW name
        M('54', 'Firelash'),  // REVIEW name
        M('62', 'Skullbash'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { HP: 2, ATK: 1 }, baseFriendship: 60, baseExp: 231, growthRate: 'Parabolic',
      eggGroups: ['Monster'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
{
      dex: '041', name: 'Shrubcub', category: 'Potted Bush', types: ['GRASS'],
      height: '2\'04" ft', weight: '25 lbs', catchRate: 180, found: ['Route 1', 'Route 5'],
      abilities: ['Grass Pelt', 'Regenerator'],
      hidden: 'Chlorophyll',
      stats: { HP: 75, ATK: 45, DEF: 50, SPA: 30, SPD: 55, SPE: 65 },
      flavor: 'Shrubcubs\' pot is its favorite haven. People who truly cherish their home plants can often find Shrubcub in their spare pots.',
      evo: { to: '042' },
      levelMoves: [
        M('1', 'Leafage'),
        M('1', 'Leer'),  // REVIEW name
        M('4', 'Absorb'),  // REVIEW name
        M('8', 'Furyswipes'),  // REVIEW name
        M('12', 'Stunspore'),  // REVIEW name
        M('14', 'Megadrain'),  // REVIEW name
        M('16', 'Sleeppowder'),  // REVIEW name
        M('18', 'Assurance'),  // REVIEW name
        M('20', 'Razor Leaf'),
        M('24', 'Gigadrain'),  // REVIEW name
        M('28', 'Rest'),
        M('32', 'Leafblade'),  // REVIEW name
        M('36', 'Nighslash'),  // REVIEW name
        M('40', 'Synthesis'),  // REVIEW name
        M('44', 'Leaf Storm'),
      ],
      eggMoves: [
        EGG('Leaftornado'),  // REVIEW name
        EGG('Stompingtantrum'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 1 }, baseFriendship: 50, baseExp: 66, growthRate: 'Parabolic',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '042', name: 'Furilage', category: 'Shaped Bush', types: ['GRASS'],
      height: '5\'11" ft', weight: '263.9 lbs', catchRate: 60, found: [],
      abilities: ['Grass Pelt', 'Regenerator'],
      hidden: 'Chlorophyll',
      stats: { HP: 95, ATK: 60, DEF: 70, SPA: 45, SPD: 70, SPE: 85 },
      flavor: 'Furilage are friendly yet a gardener’s nightmare, digging up plants and crops to claim their place for easy water and fertilizer.',
      evo: { from: '041', to: '043', method: 'Lv 22' },
      levelMoves: [
        M('0', 'Grassyterrain'),  // REVIEW name
        M('1', 'Grassyterrain'),  // REVIEW name
        M('1', 'Leafage'),
        M('1', 'Leer'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Furyswipes'),  // REVIEW name
        M('12', 'Stunspore'),  // REVIEW name
        M('14', 'Megadrain'),  // REVIEW name
        M('16', 'Sleeppowder'),  // REVIEW name
        M('18', 'Assurance'),  // REVIEW name
        M('20', 'Razor Leaf'),
        M('25', 'Gigadrain'),  // REVIEW name
        M('30', 'Rest'),
        M('35', 'Leafblade'),  // REVIEW name
        M('40', 'Nighslash'),  // REVIEW name
        M('45', 'Synthesis'),  // REVIEW name
        M('50', 'Leaf Storm'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 2 }, baseFriendship: 50, baseExp: 175, growthRate: 'Parabolic',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '043', name: 'Grizzlawn', category: 'Garden Kept', types: ['GRASS'],
      height: '7\'10" ft', weight: '639.3 lbs', catchRate: 20, found: [],
      abilities: ['Unkempt', 'Regenerator'],
      hidden: 'Chlorophyll',
      stats: { HP: 108, ATK: 75, DEF: 86, SPA: 55, SPD: 102, SPE: 92 },
      flavor: 'A happy Grizzlawn releases pheromones that boost plant growth, but its fur demands constant care and mistreatment can make it aggressive.',
      evo: { from: '042', method: 'Leaf Stone' },
      levelMoves: [
        M('0', 'Woodhammer'),  // REVIEW name
        M('1', 'Woodhammer'),  // REVIEW name
        M('1', 'Grassyterrain'),  // REVIEW name
        M('1', 'Leafage'),
        M('1', 'Leer'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Furyswipes'),  // REVIEW name
        M('12', 'Stunspore'),  // REVIEW name
        M('14', 'Megadrain'),  // REVIEW name
        M('16', 'Sleeppowder'),  // REVIEW name
        M('18', 'Assurance'),  // REVIEW name
        M('20', 'Razor Leaf'),
        M('25', 'Gigadrain'),  // REVIEW name
        M('30', 'Rest'),
        M('35', 'Leafblade'),  // REVIEW name
        M('40', 'Nighslash'),  // REVIEW name
        M('45', 'Synthesis'),  // REVIEW name
        M('50', 'Leaf Storm'),
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 2, SPE: 1 }, baseFriendship: 50, baseExp: 270, growthRate: 'Parabolic',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '044', name: 'Cruspud', category: 'Spoiled', types: ['GROUND'],
      height: '0\'03" ft', weight: '2.9 lbs', catchRate: 230, found: ['Route 1', 'Route 2'],
      abilities: ['Infected', 'Stench'],
      hidden: 'Harvest',
      stats: { HP: 30, ATK: 30, DEF: 60, SPA: 30, SPD: 70, SPE: 20 },
      flavor: 'In sunlight, Cruspud buries itself beneath the soil, leaving only its sprout exposed. Farmers see its presence as a sign of rotting crops.',
      evo: { to: '045' },
      levelMoves: [
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Growth'),  // REVIEW name
        M('4', 'Rollout'),  // REVIEW name
        M('7', 'Sand Attack'),
        M('10', 'Infestation'),  // REVIEW name
        M('13', 'Mudshot'),  // REVIEW name
        M('16', 'Leechseed'),  // REVIEW name
        M('19', 'Frustration'),  // REVIEW name
        M('22', 'Scaryface'),  // REVIEW name
        M('25', 'Gigadrain'),  // REVIEW name
        M('28', 'Stompingtantrum'),  // REVIEW name
        M('31', 'Scaryface'),  // REVIEW name
        M('34', 'Poisonjab'),  // REVIEW name
        M('37', 'Strengthsap'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Sludge'),  // REVIEW name
        EGG('Snaptrap'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPD: 1 }, baseFriendship: 30, baseExp: 36, growthRate: 'Fluctuating',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '045', name: 'Rotato', category: 'Molding', types: ['GROUND', 'GRASS'],
      height: '1\'08" ft', weight: '22.4 lbs', catchRate: 120, found: [],
      abilities: ['Infected', 'Stench'],
      hidden: 'Sap Sipper',
      stats: { HP: 40, ATK: 50, DEF: 95, SPA: 45, SPD: 110, SPE: 30 },
      flavor: 'If left in soil too long, Rotato develops soft, dark patches. To avoid being picked, it releases an odor that leaves farmers and trainers dizzy.',
      evo: { from: '044', to: '046', method: 'Lv 18' },
      levelMoves: [
        M('0', 'Bite'),  // REVIEW name
        M('1', 'Bite'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Growth'),  // REVIEW name
        M('1', 'Rollout'),  // REVIEW name
        M('1', 'Sand Attack'),
        M('10', 'Infestation'),  // REVIEW name
        M('13', 'Mudshot'),  // REVIEW name
        M('16', 'Leechseed'),  // REVIEW name
        M('20', 'Frustration'),  // REVIEW name
        M('24', 'Ingrain'),  // REVIEW name
        M('28', 'Gigadrain'),  // REVIEW name
        M('32', 'Stompingtantrum'),  // REVIEW name
        M('36', 'Scaryface'),  // REVIEW name
        M('40', 'Poisonjab'),  // REVIEW name
        M('44', 'Strengthsap'),  // REVIEW name
        M('48', 'Powerwhip'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPD: 1, DEF: 1 }, baseFriendship: 30, baseExp: 120, growthRate: 'Fluctuating',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '046', name: 'Blightato', category: 'Rotting', types: ['GROUND', 'GRASS'],
      height: '3\'06" ft', weight: '194.3 lbs', catchRate: 50, found: [],
      abilities: ['Infected', 'Stench'],
      hidden: 'Sap Sipper',
      stats: { HP: 55, ATK: 70, DEF: 135, SPA: 60, SPD: 145, SPE: 45 },
      flavor: 'Blightato thrives in abandoned fields. Its flesh and leaves rot so deeply that entire harvests are forsaken once it\'s beneath the soil.',
      evo: { from: '045', method: 'Lv 35' },
      levelMoves: [
        M('0', 'Gastroacid'),  // REVIEW name
        M('1', 'Gastroacid'),  // REVIEW name
        M('1', 'Block'),  // REVIEW name
        M('1', 'Bite'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Growth'),  // REVIEW name
        M('1', 'Rollout'),  // REVIEW name
        M('1', 'Sand Attack'),
        M('10', 'Infestation'),  // REVIEW name
        M('13', 'Mudshot'),  // REVIEW name
        M('16', 'Leechseed'),  // REVIEW name
        M('20', 'Frustration'),  // REVIEW name
        M('24', 'Ingrain'),  // REVIEW name
        M('28', 'Gigadrain'),  // REVIEW name
        M('32', 'Stompingtantrum'),  // REVIEW name
        M('37', 'Scaryface'),  // REVIEW name
        M('42', 'Poisonjab'),  // REVIEW name
        M('47', 'Strengthsap'),  // REVIEW name
        M('52', 'Powerwhip'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Bulldoze'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPD: 2, DEF: 1 }, baseFriendship: 30, baseExp: 218, growthRate: 'Fluctuating',
      eggGroups: ['Grass'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '047', name: 'Pebpup', category: 'Pet Rock', types: ['NORMAL', 'ROCK'],
      height: '1\'44" ft', weight: '68.6 lbs', catchRate: 255, found: ['Route 2', 'Pebpup Cavern'],
      abilities: ['Sturdy', 'Solid Rock'],
      hidden: 'Ball Fetch',
      stats: { HP: 60, ATK: 47, DEF: 65, SPA: 25, SPD: 35, SPE: 10 },
      flavor: 'Pebpups are Pokémon born in rocks struggling to move.',
      evo: { to: '048' },
      levelMoves: [
        M('1', 'Bide'),  // REVIEW name
        M('4', 'Rollout'),  // REVIEW name
        M('7', 'Defense Curl'),
        M('10', 'Odorleuth'),  // REVIEW name
        M('13', 'Smackdown'),  // REVIEW name
        M('16', 'Rockpolish'),  // REVIEW name
        M('19', 'Accelerock'),  // REVIEW name
        M('22', 'Firefang'),  // REVIEW name
        M('25', 'Laserfocus'),  // REVIEW name
        M('28', 'Takedown'),  // REVIEW name
        M('32', 'Lavaplume'),  // REVIEW name
        M('36', 'Rockslide'),  // REVIEW name
        M('40', 'Scaryface'),  // REVIEW name
        M('44', 'Crunch'),  // REVIEW name
        M('48', 'Swordsdance'),  // REVIEW name
        M('52', 'Headsmash'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Shelter'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 70, baseExp: 51, growthRate: 'Medium',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '048', name: 'Rocweiler', category: 'Wild Rock', types: ['FIRE', 'ROCK'],
      height: '5\'81" ft', weight: '253.5 lbs', catchRate: 120, found: [],
      abilities: ['Berserk'],
      hidden: 'Guard Dog',
      stats: { HP: 70, ATK: 95, DEF: 75, SPA: 135, SPD: 77, SPE: 115 },
      flavor: 'Rocweilers are protective of trainers who raised them till it\'s out of its rock. Newly caught Rockweilers will take time to gain its trust.',
      evo: { from: '047', method: 'Lv 20' },
      levelMoves: [
        M('0', 'Spikyshield'),  // REVIEW name
        M('1', 'Spikyshield'),  // REVIEW name
        M('1', 'Bide'),  // REVIEW name
        M('1', 'Rollout'),  // REVIEW name
        M('1', 'Defense Curl'),
        M('1', 'Odorleuth'),  // REVIEW name
        M('13', 'Smackdown'),  // REVIEW name
        M('16', 'Rockpolish'),  // REVIEW name
        M('19', 'Accelerock'),  // REVIEW name
        M('23', 'Firefang'),  // REVIEW name
        M('27', 'Laserfocus'),  // REVIEW name
        M('31', 'Takedown'),  // REVIEW name
        M('36', 'Lavaplume'),  // REVIEW name
        M('41', 'Rockslide'),  // REVIEW name
        M('46', 'Scaryface'),  // REVIEW name
        M('51', 'Crunch'),  // REVIEW name
        M('56', 'Swordsdance'),  // REVIEW name
        M('61', 'Headsmash'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 70, baseExp: 145, growthRate: 'Medium',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '049', name: 'Twilawoof', category: 'Luna Pup', types: ['LIGHT', 'DARK'],
      height: '-', weight: '', catchRate: 240, found: ['Route 4'],
      abilities: ['Intimidate', 'Illuminate'],
      hidden: 'Defiant',
      stats: { HP: 60, ATK: 70, DEF: 40, SPA: 40, SPD: 40, SPE: 80 },
      flavor: 'Twilawoof are playful within their pack, but flee at the sight of outsiders. Rarely seen in the wild, they almost never bond with humans.',
      evo: { to: '050' },
      levelMoves: [
        M('1', 'Feint'),  // REVIEW name
        M('1', 'Growl'),
        M('5', 'Howl'),  // REVIEW name
        M('9', 'Swift'),
        M('12', 'Feintattack'),  // REVIEW name
        M('16', 'Roar'),  // REVIEW name
        M('20', 'Flashstep'),  // REVIEW name
        M('23', 'Thunderfang'),  // REVIEW name
        M('27', 'Swagger'),  // REVIEW name
        M('31', 'Nightdaze'),  // REVIEW name
        M('34', 'Haze'),  // REVIEW name
        M('38', 'Crunch'),  // REVIEW name
        M('42', 'Partinshot'),  // REVIEW name
        M('45', 'Shinefang'),  // REVIEW name
        M('49', 'Eclipsestrike'),  // REVIEW name
        M('54', 'Swordsdance'),  // REVIEW name
        M('57', 'Extremespeed'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Icefang'),  // REVIEW name
        EGG('Firefang'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 1 }, baseFriendship: 70, baseExp: 70, growthRate: 'Fast',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '050', name: 'Twilycan', category: 'Eclipse Dog', types: ['LIGHT', 'DARK'],
      height: '-', weight: '', catchRate: 150, found: [],
      abilities: ['Intimidate', 'Illuminate'],
      hidden: 'Defiant',
      stats: { HP: 70, ATK: 80, DEF: 50, SPA: 60, SPD: 50, SPE: 100 },
      flavor: 'Twillycan are calm, endearing creatures who usually lead the pack. Indifferent to humans, they only seek help when needed.',
      evo: { from: '049', to: '051', method: 'Lv 32' },
      levelMoves: [
        M('1', 'Feint'),  // REVIEW name
        M('1', 'Growl'),
        M('5', 'Howl'),  // REVIEW name
        M('8', 'Swift'),
        M('11', 'Feintattack'),  // REVIEW name
        M('15', 'Roar'),  // REVIEW name
        M('18', 'Flashstep'),  // REVIEW name
        M('21', 'Thunderfang'),  // REVIEW name
        M('25', 'Swagger'),  // REVIEW name
        M('28', 'Haze'),  // REVIEW name
        M('31', 'Nightdaze'),  // REVIEW name
        M('36', 'Crunch'),  // REVIEW name
        M('40', 'Partinshot'),  // REVIEW name
        M('44', 'Shinefang'),  // REVIEW name
        M('49', 'Eclipsestrike'),  // REVIEW name
        M('53', 'Swordsdance'),  // REVIEW name
        M('57', 'Extremespeed'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 1, ATK: 1 }, baseFriendship: 70, baseExp: 140, growthRate: 'Fast',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '051', name: 'Equinine', category: 'Equinox Wolf', types: ['LIGHT', 'DARK'],
      height: '-', weight: '', catchRate: 75, found: [],
      abilities: ['Intimidate', 'Illuminate'],
      hidden: 'Defiant',
      stats: { HP: 90, ATK: 115, DEF: 65, SPA: 85, SPD: 65, SPE: 110 },
      flavor: 'Little is known about Equinine,though they are said to be the Grandmasters of all Twilikind, commanding multiple packs across their territories.',
      evo: { from: '050', method: 'Shiny Stone' },
      levelMoves: [
        M('0', 'Duality'),  // REVIEW name
        M('1', 'Duality'),  // REVIEW name
        M('1', 'Feint'),  // REVIEW name
        M('1', 'Growl'),
        M('5', 'Howl'),  // REVIEW name
        M('8', 'Swift'),
        M('11', 'Feintattack'),  // REVIEW name
        M('15', 'Roar'),  // REVIEW name
        M('18', 'Flashstep'),  // REVIEW name
        M('21', 'Thunderfang'),  // REVIEW name
        M('25', 'Swagger'),  // REVIEW name
        M('28', 'Haze'),  // REVIEW name
        M('31', 'Nightdaze'),  // REVIEW name
        M('36', 'Crunch'),  // REVIEW name
        M('40', 'Partinshot'),  // REVIEW name
        M('44', 'Shinefang'),  // REVIEW name
        M('49', 'Eclipsestrike'),  // REVIEW name
        M('53', 'Swordsdance'),  // REVIEW name
        M('57', 'Extremespeed'),  // REVIEW name
        M('63', 'Eternalaura'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 2, ATK: 1 }, baseFriendship: 70, baseExp: 180, growthRate: 'Fast',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '052', name: 'Karmold', category: 'Emotional', types: ['NORMAL', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 120, found: ['Eventide Forest'],
      abilities: ['Color Change', 'Protean'],
      hidden: 'Adaptability',
      stats: { HP: 44, ATK: 34, DEF: 34, SPA: 64, SPD: 44, SPE: 44 },
      flavor: 'Karmold’s emotions are uncontrollable, so its body shows every color of the rainbow rather than shifting hues for camouflage.',
      evo: { to: '053' },
      levelMoves: [
        M('1', 'Camouflage'),  // REVIEW name
        M('1', 'Reflecttype'),  // REVIEW name
        M('1', 'Lick'),  // REVIEW name
        M('5', 'Hypnosis'),  // REVIEW name
        M('10', 'Return'),  // REVIEW name
        M('10', 'Frustration'),  // REVIEW name
        M('13', 'Nightshade'),  // REVIEW name
        M('17', 'Glare'),  // REVIEW name
        M('22', 'Swift'),
        M('25', 'Psychicnoise'),  // REVIEW name
        M('29', 'Miracleeye'),  // REVIEW name
        M('34', 'Rgbeam'),  // REVIEW name
        M('37', 'Roleplay'),  // REVIEW name
        M('41', 'Wringout'),  // REVIEW name
        M('46', 'Futuresight'),  // REVIEW name
        M('49', 'Nastyplot'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Warminglight'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 1 }, baseFriendship: 50, baseExp: 52, growthRate: 'Medium',
      eggGroups: ['Monster'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
{
      dex: '053', name: 'Kamoleon', category: 'Personality', types: ['NORMAL', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Color Change', 'Protean'],
      hidden: 'Adaptability',
      stats: { HP: 74, ATK: 54, DEF: 54, SPA: 124, SPD: 89, SPE: 89 },
      flavor: 'Kamoleon’s personality mirrors its trainer. As their bond deepens, it shifted from the chaotic Karmold to the temperament it grows closest to.',
      evo: { from: '052', method: 'Lv 32 (Form based on friendship)' },
      forms: [
        { name: 'Kamoleon (Low Friendship)', trigger: 'Appears when its bond with its trainer is weak.', types: ['NORMAL', 'PSYCHIC'], spriteSuffix: 'low', desc: 'A more guarded, chaotic temperament inherited from its pre-evolution.' },
        { name: 'Kamoleon (High Friendship)', trigger: 'Appears when its bond with its trainer is strong.', types: ['NORMAL', 'PSYCHIC'], spriteSuffix: 'high', desc: 'A calm, devoted temperament that mirrors a trusted trainer.' },
      ],
      levelMoves: [
        M('1', 'Moodswing'),  // REVIEW name
        M('1', 'Guardsplit'),  // REVIEW name
        M('1', 'Camouflage'),  // REVIEW name
        M('1', 'Reflecttype'),  // REVIEW name
        M('1', 'Lick'),  // REVIEW name
        M('1', 'Hypnosis'),  // REVIEW name
        M('10', 'Return'),  // REVIEW name
        M('10', 'Frustration'),  // REVIEW name
        M('13', 'Nightshade'),  // REVIEW name
        M('17', 'Glare'),  // REVIEW name
        M('22', 'Swift'),
        M('25', 'Psychicnoise'),  // REVIEW name
        M('29', 'Miracleeye'),  // REVIEW name
        M('35', 'Rgbeam'),  // REVIEW name
        M('39', 'Roleplay'),  // REVIEW name
        M('44', 'Wringout'),  // REVIEW name
        M('50', 'Futuresight'),  // REVIEW name
        M('54', 'Nastyplot'),  // REVIEW name
        M('59', 'Eeriespell'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 2, SPD: 1 }, baseFriendship: 50, baseExp: 155, growthRate: 'Medium',
      eggGroups: ['Monster'], gender: { m: 50, f: 50 }, eggCycles: 4080,
    },
    {
      dex: '054', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { to: '055' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
    {
      dex: '055', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '054', method: 'Electric Terrain' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
{
      dex: '056', name: 'Purssume', category: 'Lonely Lost', types: ['NORMAL', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 170, found: ['Route 2', 'Route 3'],
      abilities: ['Run Away', 'Pick Up'],
      hidden: 'Fur Coat',
      stats: { HP: 60, ATK: 55, DEF: 65, SPA: 55, SPD: 55, SPE: 65 },
      flavor: 'Purssume, found in the middle of routes, trails, and roads. It seems to always throw itself in harms way from the lack of their parent.',
      evo: { to: '057' },
      levelMoves: [
        M('1', 'Astonish'),  // REVIEW name
        M('5', 'Growl'),
        M('7', 'Quickattack'),  // REVIEW name
        M('11', 'Bite'),  // REVIEW name
        M('13', 'Double Team'),
        M('15', 'Confusion'),  // REVIEW name
        M('17', 'Swift'),
        M('19', 'Fake Out'),
        M('24', 'Hyperfang'),  // REVIEW name
        M('27', 'Psychicfang'),  // REVIEW name
        M('29', 'Rest'),
        M('32', 'Crunch'),  // REVIEW name
        M('33', 'Bulk Up'),
        M('36', 'Craftyshield'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Spotlight'),  // REVIEW name
        EGG('Lastresort'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { DEF: 1 }, baseFriendship: 0, baseExp: 150, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '057', name: 'Fellsum', category: 'Abandoned', types: ['GHOST', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 100, found: [],
      abilities: ['Anticipation', 'Cursed body'],
      hidden: 'Perish body',
      stats: { HP: 80, ATK: 35, DEF: 85, SPA: 120, SPD: 100, SPE: 65 },
      flavor: 'Fellsum results from Purssume\'s desire to harm itself, finding solace in aiding fainted and wild Purssume, protecting them at whatever cost..',
      evo: { from: '056', to: '058', method: 'Lv 30 + Fainted 10 times' },
      levelMoves: [
        M('0', 'Shadowball'),  // REVIEW name
        M('1', 'Shadowball'),  // REVIEW name
        M('1', 'Astonish'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Quickattack'),  // REVIEW name
        M('11', 'Bite'),  // REVIEW name
        M('13', 'Double Team'),
        M('15', 'Confusion'),  // REVIEW name
        M('17', 'Swift'),
        M('19', 'Fake Out'),
        M('24', 'Hyperfang'),  // REVIEW name
        M('27', 'Psychicfangs'),  // REVIEW name
        M('36', 'Curse'),  // REVIEW name
        M('39', 'Destinybond'),  // REVIEW name
        M('45', 'Psychic'),  // REVIEW name
        M('47', 'Wideguard'),  // REVIEW name
        M('50', 'Wilowisp'),  // REVIEW name
        M('50', '53'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { SPA: 2 }, baseFriendship: 0, baseExp: 220, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '058', name: 'Foundsum', category: 'Found Family', types: ['FAIRY', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 100, found: [],
      abilities: ['Magic Guard', 'Misty Surge'],
      hidden: 'Pixilate',
      stats: { HP: 100, ATK: 40, DEF: 95, SPA: 90, SPD: 85, SPE: 75 },
      flavor: 'Foundsum is a result of a Purssume\'s wish to shield others from its own fate, embracing fellow Purssume with warmth and power.',
      evo: { from: '057', method: 'Lv 30 + High Friendship' },
      levelMoves: [
        M('0', 'Drainingkiss'),  // REVIEW name
        M('1', 'Drainingkiss'),  // REVIEW name
        M('1', 'Astonish'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Quickattack'),  // REVIEW name
        M('11', 'Bite'),  // REVIEW name
        M('13', 'Double Team'),
        M('15', 'Confusion'),  // REVIEW name
        M('17', 'Swift'),
        M('19', 'Fake Out'),
        M('24', 'Hyperfang'),  // REVIEW name
        M('27', 'Psychicfang'),  // REVIEW name
        M('30', 'Psychic'),  // REVIEW name
        M('33', 'Light Screen'),
        M('36', 'Reflect'),  // REVIEW name
        M('40', 'Moonblast'),  // REVIEW name
        M('45', 'Shadowball'),  // REVIEW name
        M('47', 'Quickguard'),  // REVIEW name
        M('50', 'Moonlight'),
        M('50', 'Thunderwave'),  // REVIEW name
        M('53', '57'),  // REVIEW name
        M('60', 'Revivalblessing'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
        TM('07', 'Revealing Light'),
      ],
      anomaly: null,
      evYield: { DEF: 1, SPA: 1 }, baseFriendship: 200, baseExp: 220, growthRate: 'Parabolic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '059', name: 'Bouyabee', category: 'Floaty', types: ['WATER', 'NORMAL'],
      height: '-', weight: '', catchRate: 190, found: ['Route 3'],
      abilities: ['Swift Swim', 'Vital Spirit'],
      hidden: 'Friend Guard',
      stats: { HP: 59, ATK: 59, DEF: 40, SPA: 40, SPD: 53, SPE: 42 },
      flavor: 'An excellent swimmer that doesn\'t believe in itself very much. Its tail is filled with a gas that allows it to float on any liquid.',
      evo: { to: '060' },
      levelMoves: [
        M('1', 'Splash'),  // REVIEW name
        M('1', 'Sand Attack'),
        M('1', 'Pound'),
        M('1', 'Watersport'),  // REVIEW name
        M('11', 'Aquajet'),  // REVIEW name
        M('14', 'Fake Out'),
        M('17', 'Stuffcheeks'),  // REVIEW name
        M('21', 'Smellingsalts'),  // REVIEW name
        M('24', 'Surf'),  // REVIEW name
        M('27', 'Soak'),  // REVIEW name
        M('31', 'Wakeupslap'),  // REVIEW name
        M('34', 'Superfang'),  // REVIEW name
        M('37', 'Coaching'),  // REVIEW name
        M('41', 'Tripledive'),  // REVIEW name
        M('44', 'Flipturn'),  // REVIEW name
        M('47', 'Baton Pass'),
        M('51', 'Lastresort'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Aqua Ring'),
        EGG('Bodyslam'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 1 }, baseFriendship: 50, baseExp: 66, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '060', name: 'Inflatuft', category: 'Beach Guard', types: ['WATER', 'NORMAL'],
      height: '-', weight: '', catchRate: 75, found: [],
      abilities: ['Swift Swim', 'Lifeguard'],
      hidden: 'Friend Guard',
      stats: { HP: 79, ATK: 94, DEF: 65, SPA: 65, SPD: 78, SPE: 92 },
      flavor: 'Inflatuft do not fear any body of water. The fire department uses them in areas that have been flooded to recover drowning or lost people.',
      evo: { from: '059', method: 'Learn Surf' },
      levelMoves: [
        M('1', 'Chilling Water'),
        M('1', 'Splash'),  // REVIEW name
        M('1', 'Sand Attack'),
        M('1', 'Pound'),
        M('1', 'Watersport'),  // REVIEW name
        M('11', 'Aquajet'),  // REVIEW name
        M('14', 'Fake Out'),
        M('17', 'Stuffcheeks'),  // REVIEW name
        M('21', 'Smellingsalts'),  // REVIEW name
        M('24', 'Surf'),  // REVIEW name
        M('27', 'Soak'),  // REVIEW name
        M('31', 'Wakeupslap'),  // REVIEW name
        M('34', 'Superfang'),  // REVIEW name
        M('37', 'Coaching'),  // REVIEW name
        M('41', 'Tripledive'),  // REVIEW name
        M('44', 'Flipturn'),  // REVIEW name
        M('47', 'Baton Pass'),
        M('51', 'Lastresort'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Thief'),
        TM('05', 'Rest'),
        TM('06', 'Lowsweep'),  // REVIEW name
        TM('07', 'Aerial Ace'),
      ],
      anomaly: null,
      evYield: { ATK: 1, SPE: 1 }, baseFriendship: 50, baseExp: 173, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '061', name: 'Mitenna', category: 'Sattelite', types: ['COSMIC'],
      height: '-', weight: '', catchRate: 190, found: ['Route 5'],
      abilities: ['Download', 'Levitate'],
      hidden: 'Serene Grace',
      stats: { HP: 55, ATK: 35, DEF: 43, SPA: 55, SPD: 70, SPE: 30 },
      flavor: 'Mitenna drifts through the upper atmosphere, releasing faint pulses of energy believed to be attempts at communication with the unknown.',
      evo: { to: '062' },
      levelMoves: [
        M('1', 'Phaser'),  // REVIEW name
        M('1', 'Growl'),
        M('5', 'Fairywind'),  // REVIEW name
        M('9', 'Sweetkiss'),  // REVIEW name
        M('13', 'Sonicboom'),  // REVIEW name
        M('17', 'Shockwave'),  // REVIEW name
        M('21', 'Starseeker'),  // REVIEW name
        M('25', 'Tractorbeam'),  // REVIEW name
        M('29', 'Selfdestruct'),  // REVIEW name
        M('33', 'Mirrorcoat'),  // REVIEW name
        M('37', 'Orbitallaser'),  // REVIEW name
        M('41', 'Calm Mind'),
        M('45', 'Fantasiablast'),  // REVIEW name
        M('49', 'Wish'),  // REVIEW name
        M('53', 'Meteor Beam'),
        M('57', 'Synchronoise'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Uproar'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Double Team'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 1 }, baseFriendship: 50, baseExp: 56, growthRate: 'Fast',
      eggGroups: ['Fairy'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '062', name: 'Orbalink', category: 'Communication', types: ['COSMIC', 'FAIRY'],
      height: '-', weight: '', catchRate: 70, found: [],
      abilities: ['Connecting...', 'Levitate'],
      hidden: 'Serene Grace',
      stats: { HP: 85, ATK: 55, DEF: 73, SPA: 95, SPD: 125, SPE: 55 },
      flavor: 'It is said that Orbalink acts as a bridge between worlds, transmitting unknown types of energy and waves across vast cosmic distances.',
      evo: { from: '061', method: 'Moonstone' },
      levelMoves: [
        M('0', 'Happilyeverafter'),  // REVIEW name
        M('1', 'Happilyeverafter'),  // REVIEW name
        M('1', 'Phaser'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Fairywind'),  // REVIEW name
        M('1', 'Sweetkiss'),  // REVIEW name
        M('13', 'Sonicboom'),  // REVIEW name
        M('17', 'Shockwave'),  // REVIEW name
        M('21', 'Starseeker'),  // REVIEW name
        M('25', 'Tractorbeam'),  // REVIEW name
        M('29', 'Selfdestruct'),  // REVIEW name
        M('33', 'Mirrorcoat'),  // REVIEW name
        M('37', 'Orbitallaser'),  // REVIEW name
        M('41', 'Calm Mind'),
        M('45', 'Fantasiablast'),  // REVIEW name
        M('49', 'Wish'),  // REVIEW name
        M('53', 'Meteor Beam'),
        M('57', 'Synchronoise'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Double Team'),
        TM('02', 'Aerial Ace'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarming Voice'),
        TM('06', 'Confuse Ray'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 2 }, baseFriendship: 50, baseExp: 168, growthRate: 'Fast',
      eggGroups: ['Fairy'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '063', name: 'Rhythfin', category: 'Fish Score', types: ['WATER'],
      height: '-', weight: '', catchRate: 180, found: ['Route 2', 'Route 3', 'Pebpup Cavern'],
      abilities: ['Swift swim'],
      hidden: 'Liquid voice',
      stats: { HP: 50, ATK: 40, DEF: 45, SPA: 68, SPD: 55, SPE: 64 },
      flavor: 'Rhythfin stores tons of energy, much like an excited child. When threatened, schools cluster to intimidate other Pokémon.',
      evo: { to: '064' },
      levelMoves: [
        M('1', 'Bubble'),
        M('3', 'Growl'),
        M('6', 'Aquajet'),  // REVIEW name
        M('8', 'Sing'),  // REVIEW name
        M('11', 'Round'),  // REVIEW name
        M('14', 'Bubble Beam'),
        M('17', 'Lifedew'),  // REVIEW name
        M('20', 'Screech'),  // REVIEW name
        M('23', 'Whirlpool'),
        M('26', 'Metalsound'),  // REVIEW name
        M('30', 'Hyper Voice'),
        M('33', 'Surf'),  // REVIEW name
        M('36', 'Icywind'),  // REVIEW name
        M('39', 'Healbell'),  // REVIEW name
        M('42', 'Raindance'),  // REVIEW name
        M('45', 'Psychicnoise'),  // REVIEW name
        M('48', 'Perishsong'),  // REVIEW name
        M('51', 'Boomburst'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Waterspout'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 1 }, baseFriendship: 50, baseExp: 80, growthRate: 'Medium',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
{
      dex: '064', name: 'Swimatonic', category: 'Harmony School', types: ['WATER'],
      height: '-', weight: '', catchRate: 125, found: [],
      abilities: ['Swift swim'],
      hidden: 'Liquid voice',
      stats: { HP: 74, ATK: 60, DEF: 69, SPA: 105, SPD: 69, SPE: 90 },
      flavor: 'Like a guardian of the reefs, Swimatonic carves graceful paths through the ocean, leaving shimmering trails that help reefs flourish.',
      evo: { from: '063', method: 'Lv 30' },
      levelMoves: [
        M('0', 'Sparklingaria'),  // REVIEW name
        M('1', 'Sparklingaria'),  // REVIEW name
        M('1', 'Bubble'),
        M('1', 'Growl'),
        M('1', 'Aquajet'),  // REVIEW name
        M('8', 'Sing'),  // REVIEW name
        M('11', 'Round'),  // REVIEW name
        M('14', 'Bubble Beam'),
        M('17', 'Lifedew'),  // REVIEW name
        M('20', 'Screech'),  // REVIEW name
        M('23', 'Whirlpool'),
        M('26', 'Metalsound'),  // REVIEW name
        M('30', 'Hyper Voice'),
        M('34', 'Surf'),  // REVIEW name
        M('37', 'Icywind'),  // REVIEW name
        M('41', 'Healbell'),  // REVIEW name
        M('45', 'Raindance'),  // REVIEW name
        M('50', 'Psychicnoise'),  // REVIEW name
        M('53', 'Perishsong'),  // REVIEW name
        M('57', 'Boomburst'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Disarming Voice'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 2 }, baseFriendship: 50, baseExp: 220, growthRate: 'Medium',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
    {
      dex: '065', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { to: '066' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
    {
      dex: '066', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '065', method: 'Knock Out 20 Pokemon' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
{
      dex: '067', name: 'Sedimite', category: 'Potential', types: ['ROCK'],
      height: '-', weight: '', catchRate: 45, found: ['Quest: Strange Stone (from Sadie, Saudade Town)'],
      abilities: ['Sturdy'],
      hidden: 'Adaptablility',
      stats: { HP: 50, ATK: 50, DEF: 50, SPA: 50, SPD: 50, SPE: 40 },
      flavor: 'Sedimite has a cute and friendly nature, sometimes placing random rocks and items into its core purely for fun.',
      evo: { to: ['068', '069', '070', '071', '072', '073', '074', '075', '076', '077', '078'] },
      levelMoves: [
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Ancientpower'),  // REVIEW name
        M('25', 'Rock Tomb'),
        M('30', 'Metronome'),  // REVIEW name
        M('35', 'Roleplay'),  // REVIEW name
        M('40', 'Secretpower'),  // REVIEW name
        M('45', 'Charm'),  // REVIEW name
        M('50', 'Selfdestruct'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Encore'),  // REVIEW name
        EGG('Tickle'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 1 }, baseFriendship: 50, baseExp: 65, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '068', name: 'Sedimage', category: 'Learned', types: ['ROCK', 'FIRE'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Magician'],
      hidden: 'Magic Guard',
      stats: { HP: 80, ATK: 70, DEF: 50, SPA: 130, SPD: 110, SPE: 90 },
      flavor: 'Sedimage is deeply attached to its staff, using it to carve trails of glistening molten rock that mark its territory.',
      evo: { from: '067', method: 'Fire Stone' },
      levelMoves: [
        M('0', 'Ember'),
        M('1', 'Ember'),
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Confuse Ray'),
        M('25', 'Incinerate'),  // REVIEW name
        M('30', 'Magicpowder'),  // REVIEW name
        M('35', 'Mysticalfire'),  // REVIEW name
        M('40', 'Powergem'),  // REVIEW name
        M('45', 'Barrier'),  // REVIEW name
        M('50', 'Fireblast'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '069', name: 'Sedimonk', category: 'Iron Will', types: ['ROCK', 'WATER'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Inner Focus'],
      hidden: 'Anticipation',
      stats: { HP: 80, ATK: 130, DEF: 110, SPA: 50, SPD: 90, SPE: 70 },
      flavor: 'Meditation is one of Sedimonk’s favorite activities. It often sits near rivers, canals, or any body of water to find peace.',
      evo: { from: '067', method: 'Water Stone' },
      levelMoves: [
        M('0', 'Aquajet'),  // REVIEW name
        M('1', 'Aquajet'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Focusenergy'),  // REVIEW name
        M('25', 'Brine'),  // REVIEW name
        M('30', 'Courtchange'),  // REVIEW name
        M('35', 'Megapunch'),  // REVIEW name
        M('40', 'Liquidation'),  // REVIEW name
        M('45', 'Quickguard'),  // REVIEW name
        M('50', 'Surgingstrikes'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '070', name: 'Sedruid', category: 'Nature', types: ['ROCK', 'GRASS'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Natural Cure'],
      hidden: 'Serene Grace',
      stats: { HP: 90, ATK: 50, DEF: 130, SPA: 70, SPD: 110, SPE: 80 },
      flavor: 'Sedruid stands watch at the edge of forests. Its rocky frame shields the trees, while its leafy body is said to be able to restores damaged soil.',
      evo: { from: '067', method: 'Leaf Stone' },
      levelMoves: [
        M('0', 'Trailblaze'),  // REVIEW name
        M('1', 'Trailblaze'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Grass Whistle'),
        M('25', 'Magicalleaf'),  // REVIEW name
        M('30', 'Forestscurse'),  // REVIEW name
        M('35', 'Aromatherapy'),  // REVIEW name
        M('40', 'Energyball'),  // REVIEW name
        M('45', 'Junglehealing'),  // REVIEW name
        M('50', 'Woodhammer'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '071', name: 'Sedificer', category: 'Artisan', types: ['ROCK', 'ELECTRIC'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Technician'],
      hidden: 'Tinted Lense',
      stats: { HP: 50, ATK: 80, DEF: 70, SPA: 90, SPD: 130, SPE: 110 },
      flavor: 'Sedificer’s glowing crystals hum like generators. It delights in crafting buzzing gadgets, startling opponents with sudden bursts of electricity.',
      evo: { from: '067', method: 'Thunder Stone' },
      levelMoves: [
        M('0', 'Chargebeam'),  // REVIEW name
        M('1', 'Chargebeam'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Charge'),  // REVIEW name
        M('25', 'Paraboliccharge'),  // REVIEW name
        M('30', 'Iondeluge'),  // REVIEW name
        M('35', 'Crystalize'),  // REVIEW name
        M('40', 'Signalbeam'),  // REVIEW name
        M('45', 'Rockpolish'),  // REVIEW name
        M('50', 'Electroshot'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '072', name: 'Sedivout', category: 'Divine', types: ['ROCK', 'STEEL'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Steely Spirit'],
      hidden: 'Stalwart',
      stats: { HP: 90, ATK: 110, DEF: 130, SPA: 70, SPD: 80, SPE: 50 },
      flavor: 'Sedilock’s armor gleams with starlight, crowned by purple flames. It channels the vast silence of space itself.',
      evo: { from: '067', method: 'Sun Stone' },
      levelMoves: [
        M('0', 'Bulletpunch'),  // REVIEW name
        M('1', 'Bulletpunch'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Endure'),  // REVIEW name
        M('25', 'Mirrorshot'),  // REVIEW name
        M('30', 'Wideguard'),  // REVIEW name
        M('35', 'Rock Blast'),
        M('40', 'Anchorshot'),  // REVIEW name
        M('45', 'Autotomize'),  // REVIEW name
        M('50', 'Sunsteelstrike'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '073', name: 'Sedirogue', category: 'Darkness', types: ['ROCK', 'DARK'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Unburden'],
      hidden: 'Stakeout',
      stats: { HP: 50, ATK: 110, DEF: 90, SPA: 80, SPD: 70, SPE: 130 },
      flavor: 'Its chest glows with a cursed core. Sedirouge moves in the shade and shadows, striking swiftly before vanishing into smoke.',
      evo: { from: '067', method: 'Moon Stone' },
      levelMoves: [
        M('0', 'Pursuit'),  // REVIEW name
        M('1', 'Pursuit'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Snatch'),  // REVIEW name
        M('25', 'Feintattack'),  // REVIEW name
        M('30', 'Psychocut'),  // REVIEW name
        M('35', 'Embargo'),  // REVIEW name
        M('40', 'Nightslash'),  // REVIEW name
        M('45', 'Taunt'),  // REVIEW name
        M('50', 'Kowtowcleave'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '074', name: 'Sediserker', category: 'Barbaric', types: ['ROCK', 'ICE'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Berserk'],
      hidden: 'Sharpness',
      stats: { HP: 110, ATK: 130, DEF: 90, SPA: 50, SPD: 70, SPE: 80 },
      flavor: 'Sediserker charges into battle with twin axes of frozen stone. Its icy mane blazes with fury, fighting till the battlefield itself cracks.',
      evo: { from: '067', method: 'Ice Stone' },
      levelMoves: [
        M('0', 'Iceshard'),  // REVIEW name
        M('1', 'Iceshard'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Mist'),  // REVIEW name
        M('25', 'Avalanche'),  // REVIEW name
        M('30', 'Slash'),  // REVIEW name
        M('35', 'Swagger'),  // REVIEW name
        M('40', 'Stoneaxe'),  // REVIEW name
        M('45', 'Noretreat'),  // REVIEW name
        M('50', 'Iciclecrash'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
      ],
      anomaly: null,
      evYield: { ATK: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '075', name: 'Sediranger', category: 'Long Range', types: ['ROCK', 'FLYING'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Sniper'],
      hidden: 'Super Luck',
      stats: { HP: 70, ATK: 90, DEF: 80, SPA: 110, SPD: 50, SPE: 130 },
      flavor: 'when sedimite absorbs dawn energy it becomes the perfect hunter,its said this pokemon never misses its prey. some say this is a "fan favorite flying type pokemon".',
      evo: { from: '067', method: 'Dawn Stone' },
      levelMoves: [
        M('0', 'Gust'),  // REVIEW name
        M('1', 'Gust'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Focusenergy'),  // REVIEW name
        M('25', 'Aircutter'),  // REVIEW name
        M('30', 'Cupidsbow'),  // REVIEW name
        M('35', 'Acupressure'),  // REVIEW name
        M('40', 'Airslash'),  // REVIEW name
        M('45', 'Spiritshackle'),  // REVIEW name
        M('50', 'Lockon'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
        TM('07', 'Aerial Ace'),
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '076', name: 'Sedimancer', category: 'Reviver', types: ['ROCK', 'GHOST'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Shadow Tag'],
      hidden: 'Wandering Spirit',
      stats: { HP: 70, ATK: 80, DEF: 50, SPA: 110, SPD: 130, SPE: 90 },
      flavor: 'Sedimancer weaves ghostly energy into stone, raising walls that shift like living shadows. It is feared as the builder of haunted fortresses',
      evo: { from: '067', method: 'Dusk Stone' },
      levelMoves: [
        M('0', 'Nightshade'),  // REVIEW name
        M('1', 'Nightshade'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Spite'),  // REVIEW name
        M('25', 'Hex'),  // REVIEW name
        M('30', 'Fullmoonbind'),  // REVIEW name
        M('35', 'Curse'),  // REVIEW name
        M('40', 'Bittermalice'),  // REVIEW name
        M('45', 'Revivalblessing'),  // REVIEW name
        M('50', 'Lastrespects'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
        TM('07', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { SPD: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '077', name: 'Sediric', category: 'Healer', types: ['ROCK', 'LIGHT'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Triage'],
      hidden: 'Healer',
      stats: { HP: 130, ATK: 70, DEF: 110, SPA: 90, SPD: 80, SPE: 50 },
      flavor: 'Sedric’s body glows with divine energy. It is known to restore vitality by bathing companions in radiant waves.',
      evo: { from: '067', method: 'Shiny Stone' },
      levelMoves: [
        M('0', 'Divineslash'),  // REVIEW name
        M('1', 'Divineslash'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Cleansinglight'),  // REVIEW name
        M('25', 'Aurorabeam'),  // REVIEW name
        M('30', 'Drainingkiss'),  // REVIEW name
        M('35', 'Warminglight'),  // REVIEW name
        M('40', 'Shiningburst'),  // REVIEW name
        M('45', 'Radiantblessing'),  // REVIEW name
        M('50', 'Rainbowbolt'),  // REVIEW name
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
        TM('07', 'Disarming Voice'),
      ],
      anomaly: null,
      evYield: { HP: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
{
      dex: '078', name: 'Sedilock', category: 'Oathbreaker', types: ['ROCK', 'COSMIC'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Prankster'],
      hidden: 'Synchronize',
      stats: { HP: 110, ATK: 50, DEF: 80, SPA: 130, SPD: 90, SPE: 70 },
      flavor: 'Sedilock glows with stardust, testing trainers with riddles; when angered, its aura is said to be strong enough to bend gravity.',
      evo: { from: '067', method: 'Cosmic Stone' },
      levelMoves: [
        M('0', 'Starshot'),  // REVIEW name
        M('1', 'Starshot'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Harden'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Helpinghand'),  // REVIEW name
        M('1', 'Rockthrow'),  // REVIEW name
        M('1', 'Ancientpower'),  // REVIEW name
        M('1', 'Rock Tomb'),
        M('1', 'Metronome'),  // REVIEW name
        M('1', 'Roleplay'),  // REVIEW name
        M('1', 'Secretpower'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Selfdestruct'),  // REVIEW name
        M('5', 'Sharpen'),  // REVIEW name
        M('10', 'Hiddenpower'),  // REVIEW name
        M('15', 'Playnice'),  // REVIEW name
        M('20', 'Healblock'),  // REVIEW name
        M('25', 'Starseeker'),  // REVIEW name
        M('30', 'Swift'),
        M('35', 'Zerogravity'),  // REVIEW name
        M('40', 'Starstorm'),  // REVIEW name
        M('45', 'Gammacharge'),  // REVIEW name
        M('50', 'Meteor Beam'),
        M('55', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Bulldoze'),
        TM('06', 'Rest'),
        TM('07', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { SPA: 2 }, baseFriendship: 50, baseExp: 184, growthRate: 'Slow',
      eggGroups: ['Mineral'], gender: { m: 50, f: 50 }, eggCycles: 6400,
    },
    {
      dex: '079', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { to: '080' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
    {
      dex: '080', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '079', method: 'Lv 22' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
{
      dex: '081', name: 'Corelet', category: 'Smiley Star', types: ['COSMIC'],
      height: '-', weight: '', catchRate: 130, found: ['Route 5'],
      abilities: ['Burning Hot', 'Drought'],
      hidden: 'Solar Power',
      stats: { HP: 100, ATK: 10, DEF: 25, SPA: 50, SPD: 5, SPE: 10 },
      flavor: 'Once part of a gigantrum, it split away and rose to the mesosphere. Legends say a shooting corelet heralds the fulfillment of deepest desires.',
      evo: { to: '082' },
      levelMoves: [
        M('1', 'Sunnyday'),  // REVIEW name
        M('1', 'Starshot'),  // REVIEW name
        M('5', 'Defense Curl'),
        M('10', 'Gravity'),  // REVIEW name
        M('15', 'Flameburst'),  // REVIEW name
        M('19', 'Cleansinglight'),  // REVIEW name
        M('24', 'Starstorm'),  // REVIEW name
        M('29', 'Powersplit'),  // REVIEW name
        M('33', 'Dazzlinggleam'),  // REVIEW name
        M('38', 'Willowisp'),  // REVIEW name
        M('43', 'Weatherball'),  // REVIEW name
        M('47', 'Heatwave'),  // REVIEW name
        M('52', 'Morningsun'),  // REVIEW name
        M('57', 'Galacticnebula'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Revealing Light'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { HP: 1 }, baseFriendship: 50, baseExp: 110, growthRate: 'Fast',
      eggGroups: ['Gender Unknown'], gender: null, eggCycles: 6400,
    },
{
      dex: '082', name: 'Gigantrum', category: 'Red Giant', types: ['COSMIC'],
      height: '-', weight: '', catchRate: 60, found: [],
      abilities: ['Burning Hot', 'Drought'],
      hidden: 'Solar Power',
      stats: { HP: 150, ATK: 30, DEF: 60, SPA: 100, SPD: 10, SPE: 50 },
      flavor: 'As they grow, Gigantrum drains heat from its surroundings, leaving itself in eternal cold. Only authorized labs may possess this species.',
      evo: { from: '081', to: '083', method: 'Lv 20' },
      levelMoves: [
        M('1', 'Sunnyday'),  // REVIEW name
        M('1', 'Starshot'),  // REVIEW name
        M('1', 'Defense Curl'),
        M('1', 'Gravity'),  // REVIEW name
        M('15', 'Flameburst'),  // REVIEW name
        M('19', 'Cleansinglight'),  // REVIEW name
        M('25', 'Starstorm'),  // REVIEW name
        M('31', 'Powersplit'),  // REVIEW name
        M('36', 'Dazzlinggleam'),  // REVIEW name
        M('42', 'Willowisp'),  // REVIEW name
        M('48', 'Weatherball'),  // REVIEW name
        M('53', 'Heatwave'),  // REVIEW name
        M('59', 'Morningsun'),  // REVIEW name
        M('65', 'Galacticnebula'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Revealing Light'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { HP: 2 }, baseFriendship: 30, baseExp: 350, growthRate: 'Fast',
      eggGroups: ['Gender Unknown'], gender: null, eggCycles: 6400,
    },
{
      dex: '083', name: 'Colapsore', category: 'Collapsed Star', types: ['COSMIC', 'LIGHT'],
      height: '-', weight: '', catchRate: 20, found: [],
      abilities: ['Burning Hot', 'Drought'],
      hidden: 'Solar Power',
      stats: { HP: 200, ATK: 55, DEF: 70, SPA: 140, SPD: 15, SPE: 70 },
      flavor: 'As they amass so much heat it collapses into itself resulting into a phenominon called a supernova becoming the unstable form that it is.',
      evo: { from: '082', method: 'Lv 50' },
      levelMoves: [
        M('0', 'Brightcannon'),  // REVIEW name
        M('1', 'Brightcannon'),  // REVIEW name
        M('1', 'Supernova'),
        M('1', 'Destinybond'),  // REVIEW name
        M('1', 'Explosion'),  // REVIEW name
        M('1', 'Sunnyday'),  // REVIEW name
        M('1', 'Starshot'),  // REVIEW name
        M('1', 'Defense Curl'),
        M('1', 'Gravity'),  // REVIEW name
        M('15', 'Flameburst'),  // REVIEW name
        M('19', 'Gravity'),  // REVIEW name
        M('25', 'Starstorm'),  // REVIEW name
        M('31', 'Powersplit'),  // REVIEW name
        M('36', 'Dazzlinggleam'),  // REVIEW name
        M('42', 'Willowisp'),  // REVIEW name
        M('48', 'Weatherball'),  // REVIEW name
        M('54', 'Heatwave'),  // REVIEW name
        M('61', 'Morningsun'),  // REVIEW name
        M('68', 'Galacticnebula'),  // REVIEW name
        M('76', 'Shellburst'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Revealing Light'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Rest'),
        TM('06', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { HP: 3 }, baseFriendship: 30, baseExp: 601, growthRate: 'Fast',
      eggGroups: ['Gender Unknown'], gender: null, eggCycles: 6400,
    },
{
      dex: '084', name: 'Bunbris', category: 'Dust Bunny', types: ['NORMAL', 'GROUND'],
      height: '1\'01" ft', weight: '', catchRate: 190, found: ['Route 5'],
      abilities: ['Pick Up', 'Suprise'],
      hidden: 'Fluffy',
      stats: { HP: 20, ATK: 58, DEF: 70, SPA: 58, SPD: 35, SPE: 58 },
      flavor: 'Bunbris are known to be playful, hopping like little bunnies, but they grow timid when strangers draw near.',
      evo: { to: '085' },
      levelMoves: [
        M('1', 'Pound'),
        M('1', 'Babydolleyes'),  // REVIEW name
        M('5', 'Work Up'),
        M('8', 'Clearsmog'),  // REVIEW name
        M('13', 'Doubleslap'),  // REVIEW name
        M('18', 'Cottonspore'),  // REVIEW name
        M('21', 'Mudbomb'),  // REVIEW name
        M('26', 'Uproar'),  // REVIEW name
        M('31', 'Curse'),  // REVIEW name
        M('34', 'Happilyeverafter'),  // REVIEW name
        M('39', 'Substitute'),  // REVIEW name
        M('44', 'Thrash'),  // REVIEW name
        M('47', 'Cottonguard'),  // REVIEW name
        M('52', 'Grudge'),  // REVIEW name
        M('58', 'Trumpcard'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Charm'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { DEF: 1 }, baseFriendship: 50, baseExp: 59, growthRate: 'Fluctuating',
      eggGroups: ['Amorphous'], gender: { m: 50, f: 50 }, eggCycles: 2805,
    },
{
      dex: '085', name: 'Amalgaton', category: 'Burling Cloud', types: ['NORMAL', 'GHOST'],
      height: '-', weight: '', catchRate: 50, found: [],
      abilities: ['Infiltrator', 'Suprise'],
      hidden: 'Fluffy',
      stats: { HP: 120, ATK: 93, DEF: 101, SPA: 93, SPD: 57, SPE: 45 },
      flavor: 'Amalgaton are larger, braver Bunbris. Though still playful at heart, their size makes most trainers either battle them or flee from fear',
      evo: { from: '084', method: 'Lv 30 + full party of Bunbris' },
      levelMoves: [
        M('0', 'Phantomforce'),  // REVIEW name
        M('1', 'Phantomforce'),  // REVIEW name
        M('1', 'Shadowsneak'),  // REVIEW name
        M('1', 'Pound'),
        M('1', 'Babydolleyes'),  // REVIEW name
        M('1', 'Work Up'),
        M('1', 'Clearsmog'),  // REVIEW name
        M('13', 'Doubleslap'),  // REVIEW name
        M('18', 'Cottonspore'),  // REVIEW name
        M('21', 'Mudbomb'),  // REVIEW name
        M('26', 'Uproar'),  // REVIEW name
        M('32', 'Curse'),  // REVIEW name
        M('36', 'Happilyeverafter'),  // REVIEW name
        M('42', 'Substitute'),  // REVIEW name
        M('48', 'Thrash'),  // REVIEW name
        M('52', 'Cottonguard'),  // REVIEW name
        M('58', 'Grudge'),  // REVIEW name
        M('65', 'Trumpcard'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Bulldoze'),
        TM('05', 'Confuse Ray'),
      ],
      anomaly: null,
      evYield: { HP: 1, DEF: 1 }, baseFriendship: 0, baseExp: 182, growthRate: 'Fluctuating',
      eggGroups: ['Amorphous'], gender: { m: 50, f: 50 }, eggCycles: 2805,
    },
{
      dex: '086', name: 'Hattot', category: 'Chicken Wing', types: ['FIRE'],
      height: '-', weight: '', catchRate: 250, found: ['Route 4'],
      abilities: ['Early Bird', 'Run Away'],
      hidden: 'Costar',
      stats: { HP: 40, ATK: 44, DEF: 35, SPA: 51, SPD: 44, SPE: 56 },
      flavor: 'A real delight on farms. Hattot especially in large groups can create beautiful melodies with their chirping. They never get tired of it.',
      evo: { to: '087' },
      levelMoves: [
        M('1', 'Peck'),  // REVIEW name
        M('1', 'Growl'),
        M('5', 'Ember'),
        M('8', 'Sing'),  // REVIEW name
        M('12', 'Round'),  // REVIEW name
        M('15', 'Sunnyday'),  // REVIEW name
        M('19', 'Incinerate'),  // REVIEW name
        M('22', 'Echoed Voice'),
        M('26', 'Encore'),  // REVIEW name
        M('29', 'Blazekick'),  // REVIEW name
        M('33', 'Alluringvoice'),  // REVIEW name
        M('36', 'Featherdance'),  // REVIEW name
        M('40', 'Heatwave'),  // REVIEW name
        M('43', 'Spotlight'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Airslash'),  // REVIEW name
        EGG('Burningjealousy'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Revealing Light'),
        TM('05', 'Protect'),
        TM('06', 'Disarming Voice'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 50, baseExp: 50, growthRate: 'Fast',
      eggGroups: ['Flying'], gender: { m: 20.0, f: 80.0 }, eggCycles: 3840,
    },
{
      dex: '087', name: 'Flarflock', category: 'Fried Chicken', types: ['FIRE'],
      height: '-', weight: '', catchRate: 120, found: [],
      abilities: ['Early Bird', 'Rivalry'],
      hidden: 'Costar',
      stats: { HP: 60, ATK: 55, DEF: 46, SPA: 67, SPD: 60, SPE: 82 },
      flavor: 'Unlike their pre-evo, Flarflock despise music. Their cry is a rough croak, not a chirp, and it visibly frustrates them.',
      evo: { from: '086', to: '088', method: 'Lv 15' },
      levelMoves: [
        M('0', 'Flatter'),  // REVIEW name
        M('1', 'Flatter'),  // REVIEW name
        M('1', 'Peck'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Ember'),
        M('1', 'Sing'),  // REVIEW name
        M('12', 'Round'),  // REVIEW name
        M('15', 'Sunnyday'),  // REVIEW name
        M('20', 'Incinerate'),  // REVIEW name
        M('24', 'Echoed Voice'),
        M('29', 'Encore'),  // REVIEW name
        M('33', 'Blazekick'),  // REVIEW name
        M('38', 'Alluringvoice'),  // REVIEW name
        M('42', 'Featherdance'),  // REVIEW name
        M('47', 'Heatwave'),  // REVIEW name
        M('51', 'Spotlight'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Revealing Light'),
        TM('05', 'Protect'),
        TM('06', 'Disarming Voice'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
        TM('09', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 2 }, baseFriendship: 50, baseExp: 122, growthRate: 'Fast',
      eggGroups: ['Flying'], gender: { m: 20.0, f: 80.0 }, eggCycles: 3840,
    },
{
      dex: '088', name: 'Bawkurn', category: 'Hot Sauce', types: ['FIRE'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Early Bird', 'Rivalry'],
      hidden: 'Costar',
      stats: { HP: 80, ATK: 70, DEF: 56, SPA: 88, SPD: 80, SPE: 111 },
      flavor: 'With its tail feathers, Bawkurn weaves enchanting melodies. Regaining its singing voice, it manipulates fire by shifting notes.',
      evo: { from: '087', method: 'Lv 32' },
      levelMoves: [
        M('0', 'Torchsong'),  // REVIEW name
        M('1', 'Torchsong'),  // REVIEW name
        M('1', 'Overdrive'),  // REVIEW name
        M('1', 'Flatter'),  // REVIEW name
        M('1', 'Peck'),  // REVIEW name
        M('1', 'Growl'),
        M('1', 'Ember'),
        M('1', 'Sing'),  // REVIEW name
        M('12', 'Round'),  // REVIEW name
        M('15', 'Sunnyday'),  // REVIEW name
        M('20', 'Incinerate'),  // REVIEW name
        M('24', 'Echoed Voice'),
        M('29', 'Encore'),  // REVIEW name
        M('33', 'Blazekick'),  // REVIEW name
        M('39', 'Alluringvoice'),  // REVIEW name
        M('44', 'Featherdance'),  // REVIEW name
        M('50', 'Heatwave'),  // REVIEW name
        M('55', 'Spotlight'),  // REVIEW name
        M('61', 'Perishsong'),  // REVIEW name
        M('66', 'Boomburst'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Revealing Light'),
        TM('05', 'Protect'),
        TM('06', 'Disarming Voice'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
        TM('09', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 2, SPA: 1 }, baseFriendship: 50, baseExp: 240, growthRate: 'Fast',
      eggGroups: ['Flying'], gender: { m: 20.0, f: 80.0 }, eggCycles: 3840,
    },
{
      dex: '089', name: 'Garot', category: 'Tarot Gar', types: ['WATER', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 200, found: ['Route 3'],
      abilities: ['Forewarn', 'Hydration'],
      hidden: 'Magic bounce',
      stats: { HP: 70, ATK: 80, DEF: 35, SPA: 70, SPD: 35, SPE: 30 },
      flavor: 'Garot waits in the dark waters, striking so swiftly that prey seldom sees— or survives the attack.',
      evo: { to: '090' },
      levelMoves: [
        M('1', 'Watergun'),  // REVIEW name
        M('3', 'Meditate'),  // REVIEW name
        M('6', 'Confuse Ray'),
        M('10', 'Bite'),  // REVIEW name
        M('13', 'Miracleye'),  // REVIEW name
        M('16', 'Psybeam'),  // REVIEW name
        M('20', 'Waterpulse'),  // REVIEW name
        M('23', 'Imprison'),  // REVIEW name
        M('26', 'Barrage'),
        M('30', 'Magicroom'),  // REVIEW name
        M('33', 'Ancientpower'),  // REVIEW name
        M('36', 'Lifedew'),  // REVIEW name
        M('40', 'Psychicfangs'),  // REVIEW name
        M('43', 'Surf'),  // REVIEW name
        M('46', 'Recover'),  // REVIEW name
        M('50', 'Powergem'),  // REVIEW name
        M('53', 'Shadowball'),  // REVIEW name
        M('55', 'Futuresight'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Aquajet'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Revealinglight;protect'),  // REVIEW name
        TM('03', 'Confuse Ray'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 1 }, baseFriendship: 50, baseExp: 120, growthRate: 'Fast',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 3500,
    },
{
      dex: '090', name: 'Garcana', category: 'Arcana Incarnate', types: ['WATER', 'PSYCHIC'],
      height: '-', weight: '', catchRate: 80, found: [],
      abilities: ['Forewarn', 'Hydration'],
      hidden: 'Magic bounce',
      stats: { HP: 100, ATK: 85, DEF: 63, SPA: 90, SPD: 63, SPE: 61 },
      flavor: 'Garcana drifts through shadowed waters, its vast form a silent presence that unsettles all who sense it nearby.',
      evo: { from: '089', method: 'Has Ancient Power' },
      levelMoves: [
        M('1', 'Watergun'),  // REVIEW name
        M('3', 'Meditate'),  // REVIEW name
        M('6', 'Confuse Ray'),
        M('10', 'Bite'),  // REVIEW name
        M('13', 'Miracleye'),  // REVIEW name
        M('16', 'Psybeam'),  // REVIEW name
        M('20', 'Waterpulse'),  // REVIEW name
        M('23', 'Imprison'),  // REVIEW name
        M('26', 'Barrage'),
        M('30', 'Magicroom'),  // REVIEW name
        M('33', 'Ancientpower'),  // REVIEW name
        M('36', 'Lifedew'),  // REVIEW name
        M('40', 'Psychicfangs43'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Revealinglight;protect'),  // REVIEW name
        TM('03', 'Confuse Ray'),
        TM('04', 'Rest'),
      ],
      anomaly: null,
      evYield: { HP: 2 }, baseFriendship: 50, baseExp: 250, growthRate: 'Fast',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 3500,
    },
{
      dex: '091', name: 'Mangmo', category: 'Gustling', types: ['FLYING'],
      height: '-', weight: '', catchRate: 180, found: ['Route 5'],
      abilities: ['Steadfast', 'Scrappy'],
      hidden: 'Air lock',
      stats: { HP: 30, ATK: 50, DEF: 30, SPA: 35, SPD: 40, SPE: 60 },
      flavor: 'Mangmo often trains alone, mastering small gusts of wind. It guides air around its body to glide great distances.',
      evo: { to: '092' },
      levelMoves: [
        M('1', 'Quickattack'),  // REVIEW name
        M('4', 'Gust'),  // REVIEW name
        M('7', 'Leer'),  // REVIEW name
        M('10', 'Twister'),  // REVIEW name
        M('13', 'Defog'),  // REVIEW name
        M('16', 'Wingattack'),  // REVIEW name
        M('19', 'Focusenergy'),  // REVIEW name
        M('22', 'Vaccumwave'),  // REVIEW name
        M('25', 'Tickle'),  // REVIEW name
        M('28', 'Slam'),
        M('31', 'Agility'),
        M('35', 'Acrobatics'),  // REVIEW name
        M('39', 'Drainpunch'),  // REVIEW name
        M('43', 'Seismic Toss'),
        M('47', 'Bulk Up'),
        M('51', 'Thrash'),  // REVIEW name
        M('55', 'Closecombat'),  // REVIEW name
        M('59', 'Hurricane'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Cometpunch'),  // REVIEW name
        EGG('Aircutter'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
        TM('06', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 1 }, baseFriendship: 50, baseExp: 62, growthRate: 'Fast',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 2750,
    },
{
      dex: '092', name: 'Mangmight', category: 'Windblade', types: ['FLYING', 'FIGHTING'],
      height: '-', weight: '', catchRate: 50, found: [],
      abilities: ['Steadfast', 'Scrappy'],
      hidden: 'Air lock',
      stats: { HP: 95, ATK: 90, DEF: 75, SPA: 70, SPD: 100, SPE: 105 },
      flavor: 'With powerful ear movements and swift martial skills, it bends air, the air around its body to strike with invisible blasts of wind.',
      evo: { from: '091', method: 'Lv 45' },
      levelMoves: [
        M('0', 'Flyingpress'),  // REVIEW name
        M('1', 'Flyingpress'),  // REVIEW name
        M('1', 'Quickattack'),  // REVIEW name
        M('1', 'Gust'),  // REVIEW name
        M('1', 'Leer'),  // REVIEW name
        M('10', 'Twister'),  // REVIEW name
        M('13', 'Defog'),  // REVIEW name
        M('16', 'Wingattack'),  // REVIEW name
        M('19', 'Focusenergy'),  // REVIEW name
        M('22', 'Vaccumwave'),  // REVIEW name
        M('25', 'Tickle'),  // REVIEW name
        M('28', 'Slam'),
        M('31', 'Agility'),
        M('35', 'Acrobatics'),  // REVIEW name
        M('39', 'Drainpunch'),  // REVIEW name
        M('43', 'Seismic Toss'),
        M('48', 'Bulk Up'),
        M('53', 'Thrash'),  // REVIEW name
        M('58', 'Closecombat'),  // REVIEW name
        M('63', 'Hurricane'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
        TM('06', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPD: 2 }, baseFriendship: 50, baseExp: 201, growthRate: 'Fast',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 2750,
    },
{
      dex: '093', name: 'Shorecite', category: 'Calcite', types: ['WATER', 'ROCK'],
      height: '-', weight: '', catchRate: 190, found: ['Pebpup Cavern'],
      abilities: ['Purifying Salt', 'Shell Armor'],
      hidden: 'Storm Drain',
      stats: { HP: 40, ATK: 60, DEF: 75, SPA: 40, SPD: 40, SPE: 50 },
      flavor: 'With its small claws, Shorecite burrows beneath the sand to evade predators. Leaving its stone-like shell exposed to blend with rocks.',
      evo: { to: '094' },
      levelMoves: [
        M('1', 'Withdraw'),  // REVIEW name
        M('3', 'Rocktrhow'),  // REVIEW name
        M('8', 'Visegrip'),  // REVIEW name
        M('13', 'Protect'),
        M('17', 'Brine'),  // REVIEW name
        M('22', 'Safeguard'),  // REVIEW name
        M('27', 'Rock Blast'),
        M('31', 'Razorshell'),  // REVIEW name
        M('36', 'Shelter'),  // REVIEW name
        M('41', 'Crabhammer'),  // REVIEW name
        M('45', 'Heavyslam'),  // REVIEW name
        M('56', 'Shellsmash'),  // REVIEW name
        M('61', 'Stealth Rock'),
      ],
      eggMoves: [
        EGG('Crystalize'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Rest'),
      ],
      anomaly: null,
      evYield: { DEF: 1 }, baseFriendship: 50, baseExp: 65, growthRate: 'Fluctuating',
      eggGroups: ['Water 3'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
{
      dex: '094', name: 'Giganshore', category: 'Calstelagmite', types: ['WATER', 'ROCK'],
      height: '-', weight: '', catchRate: 75, found: [],
      abilities: ['Purifying Salt', 'Shell Armor'],
      hidden: 'Storm Drain',
      stats: { HP: 90, ATK: 100, DEF: 125, SPA: 70, SPD: 70, SPE: 40 },
      flavor: 'With its vast shell and claws, Giganshore fears no predators. It protects Shorecite, letting them roam across its back.',
      evo: { from: '093', method: 'Lv 40' },
      levelMoves: [
        M('0', 'Saltcure'),  // REVIEW name
        M('1', 'Saltcure'),  // REVIEW name
        M('1', 'Defendorder'),  // REVIEW name
        M('1', 'Attackorder'),  // REVIEW name
        M('1', 'Withdraw'),  // REVIEW name
        M('1', 'Rocktrhow'),  // REVIEW name
        M('1', 'Visegrip'),  // REVIEW name
        M('1', 'Protect'),
        M('17', 'Brine'),  // REVIEW name
        M('22', 'Safeguard'),  // REVIEW name
        M('27', 'Rock Blast'),
        M('31', 'Razorshell'),  // REVIEW name
        M('36', 'Shelter'),  // REVIEW name
        M('42', 'Crabhammer'),  // REVIEW name
        M('47', 'Heavyslam'),  // REVIEW name
        M('53', 'Shellsmash'),  // REVIEW name
        M('59', 'Stealth Rock'),
        M('66', 'Rockwrecker'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Protect'),
        TM('03', 'Rest'),
        TM('04', 'Bulldoze'),
      ],
      anomaly: null,
      evYield: { DEF: 2 }, baseFriendship: 50, baseExp: 170, growthRate: 'Fluctuating',
      eggGroups: ['Water 3'], gender: { m: 50, f: 50 }, eggCycles: 5355,
    },
    {
      dex: '095', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { to: '096' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
    {
      dex: '096', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '095', method: 'Lv 48' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
{
      dex: '097', name: 'Broocling', category: 'Windswept', types: ['WATER'],
      height: '-', weight: '', catchRate: 245, found: ['Route 2', 'Route 3'],
      abilities: ['Wind Rider', 'Own Tempo'],
      hidden: 'Cloud Nine',
      stats: { HP: 40, ATK: 48, DEF: 39, SPA: 61, SPD: 39, SPE: 55 },
      flavor: 'After big storms some people might find Broocling in their home ponds. Their light bodies and wing shaped fins allow them to glide up to 100km.',
      evo: { to: '098' },
      levelMoves: [
        M('1', 'Tackle'),
        M('1', 'Tail Whip'),
        M('3', 'Pursuit'),  // REVIEW name
        M('6', 'Watergun'),  // REVIEW name
        M('10', 'Mist'),  // REVIEW name
        M('13', 'Raindance'),  // REVIEW name
        M('16', 'Waterpulse'),  // REVIEW name
        M('20', 'Whirlwind'),  // REVIEW name
        M('23', 'Dive'),  // REVIEW name
        M('26', 'Defog'),  // REVIEW name
        M('30', 'Fly'),  // REVIEW name
        M('33', 'Airslash'),  // REVIEW name
        M('36', 'Steelwing'),  // REVIEW name
        M('40', 'Tailwind'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Whirlwind'),  // REVIEW name
        EGG('Acrobatics'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 1 }, baseFriendship: 50, baseExp: 60, growthRate: 'Medium',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
{
      dex: '098', name: 'Brooskip', category: 'Fish Skipper', types: ['WATER', 'FLYING'],
      height: '-', weight: '', catchRate: 120, found: [],
      abilities: ['Wind Rider', 'Aerobatics'],
      hidden: 'Cloud Nine',
      stats: { HP: 55, ATK: 63, DEF: 57, SPA: 77, SPD: 57, SPE: 77 },
      flavor: 'Is it a Sicklet? Is it a plane? No, it\'s Brooskip! Ecstatic about their newfound ability to fly, they spend more time in the sky than in the water.',
      evo: { from: '097', to: '099', method: 'Lv 17' },
      levelMoves: [
        M('1', 'Skydrop'),  // REVIEW name
        M('1', 'Aerialce'),  // REVIEW name
        M('1', 'Tackle'),
        M('1', 'Tail Whip'),
        M('3', 'Pursuit'),  // REVIEW name
        M('6', 'Watergun'),  // REVIEW name
        M('10', 'Mist'),  // REVIEW name
        M('13', 'Raindance'),  // REVIEW name
        M('16', 'Waterpulse'),  // REVIEW name
        M('21', 'Whirlwind'),  // REVIEW name
        M('25', 'Dive'),  // REVIEW name
        M('29', 'Defog'),  // REVIEW name
        M('34', 'Fly'),  // REVIEW name
        M('38', 'Airslash'),  // REVIEW name
        M('42', 'Steelwing'),  // REVIEW name
        M('47', 'Tailwind'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 1, SPE: 1 }, baseFriendship: 50, baseExp: 135, growthRate: 'Medium',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
{
      dex: '099', name: 'Writrout', category: 'Fly Fish', types: ['WATER', 'FLYING'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Wind Rider', 'Aerobatics'],
      hidden: 'Cloud Nine',
      stats: { HP: 65, ATK: 83, DEF: 75, SPA: 112, SPD: 75, SPE: 112 },
      flavor: 'During droughts, Writrout carries aquatic Pokémon to safer waters. Its age is measured by wingspan.',
      evo: { from: '098', method: 'Has move "Fly"' },
      levelMoves: [
        M('1', 'Skydrop'),  // REVIEW name
        M('1', 'Aerial Ace'),
        M('1', 'Tackle'),
        M('1', 'Tail Whip'),
        M('3', 'Pursuit'),  // REVIEW name
        M('6', 'Watergun'),  // REVIEW name
        M('10', 'Mist'),  // REVIEW name
        M('13', 'Raindance'),  // REVIEW name
        M('16', 'Waterpulse'),  // REVIEW name
        M('21', 'Whirlwind'),  // REVIEW name
        M('25', 'Dive'),  // REVIEW name
        M('29', 'Defog'),  // REVIEW name
        M('34', 'Fly'),  // REVIEW name
        M('39', 'Airslash'),  // REVIEW name
        M('44', 'Steelwing'),  // REVIEW name
        M('50', 'Tailwind'),  // REVIEW name
        M('58', 'Waterspout'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Rest'),
      ],
      anomaly: null,
      evYield: { SPA: 2, SPE: 1 }, baseFriendship: 50, baseExp: 255, growthRate: 'Medium',
      eggGroups: ['Water 2'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
{
      dex: '100', name: 'Armadisco', category: 'Disco Ball', types: ['LIGHT', 'STEEL'],
      height: '-', weight: '', catchRate: 90, found: ['Route 4'],
      abilities: ['Dancer'],
      hidden: 'Dazzling',
      stats: { HP: 60, ATK: 88, DEF: 102, SPA: 48, SPD: 69, SPE: 88 },
      flavor: 'Its shell is formed of a thin prism layer over a carbon mirror undercoat. Light striking it reflects in shifting colors, depending on the angle.',
      evo: null,
      levelMoves: [
        M('1', 'Prismpunch'),  // REVIEW name
        M('3', 'Defense Curl'),
        M('6', 'Rapidspin'),  // REVIEW name
        M('10', 'Spotlight'),  // REVIEW name
        M('12', 'Metalclaw'),  // REVIEW name
        M('15', 'Metronome'),  // REVIEW name
        M('19', 'Rgbeam'),  // REVIEW name
        M('21', 'Teeterdance'),  // REVIEW name
        M('24', 'Entrainment'),  // REVIEW name
        M('28', 'Gyroball'),  // REVIEW name
        M('30', 'Encore'),  // REVIEW name
        M('33', 'Flashstep'),  // REVIEW name
        M('37', 'Captivate'),  // REVIEW name
        M('39', 'Tripleaxel'),  // REVIEW name
        M('42', 'Moonlight'),
        M('46', 'Victorydance'),  // REVIEW name
        M('51', 'Steelroller'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Sing'),  // REVIEW name
        EGG('Rollout'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Revealing Light'),
        TM('04', 'Protect'),
        TM('05', 'Disarmingvoicethief'),  // REVIEW name
        TM('06', 'Rest'),
        TM('07', 'Thunderwave'),  // REVIEW name
        TM('08', 'Lowsweep'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { DEF: 1 }, baseFriendship: 70, baseExp: 152, growthRate: 'Eratic',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 5120,
    },
    {
      dex: '101', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { to: '102' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
    {
      dex: '102', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '101', to: '103', method: 'Lv 30' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
    {
      dex: '103', name: '???', category: 'Undiscovered', types: ['NORMAL'],
      height: '???', weight: '???', catchRate: '???', found: [],
      abilities: [], hidden: null,
      stats: { HP: 0, ATK: 0, DEF: 0, SPA: 0, SPD: 0, SPE: 0 },
      flavor: 'This Pokémon has not yet been catalogued in the VOIDDEX.',
      evo: { from: '102', method: 'Leaf Stone' }, levelMoves: [], eggMoves: [], tmMoves: [],
      anomaly: null, undiscovered: true,
      evYield: {}, baseFriendship: 0, baseExp: 0, growthRate: '???',
      eggGroups: [], gender: null, eggCycles: 0,
    },
{
      dex: '104', name: 'Pymood', category: 'Dewy-eyed cub', types: ['FIRE'],
      height: '-', weight: '', catchRate: 190, found: ['Route 4'],
      abilities: ['Flash Fire', 'Oblivious'],
      hidden: 'Moody',
      stats: { HP: 45, ATK: 30, DEF: 30, SPA: 55, SPD: 45, SPE: 55 },
      flavor: 'Sensitive Scorow are often abandoned, but those raised with care form unwavering loyalty.',
      evo: { to: ['105', '106'] },
      levelMoves: [
        M('1', 'Howl'),  // REVIEW name
        M('1', 'Ember'),
        M('4', 'Smog'),  // REVIEW name
        M('8', 'Quash'),  // REVIEW name
        M('13', 'Feintattack'),  // REVIEW name
        M('17', 'Fire Spin'),
        M('21', 'Roar'),  // REVIEW name
        M('26', 'Snarl'),  // REVIEW name
        M('30', 'Burningjealousy'),  // REVIEW name
        M('34', 'Acupressure'),  // REVIEW name
        M('39', 'Meanlook'),  // REVIEW name
        M('43', 'Punishment'),  // REVIEW name
        M('47', 'Nobleroar'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Incinerate'),  // REVIEW name
        EGG('Crunch'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 1 }, baseFriendship: 50, baseExp: 52, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4096,
    },
{
      dex: '105', name: 'Gleeruption', category: 'Jovial Disorder', types: ['FIRE', 'DARK'],
      height: '-', weight: '', catchRate: 90, found: [],
      abilities: ['Flash Fire', 'Oblivious'],
      hidden: 'Moody',
      stats: { HP: 60, ATK: 50, DEF: 45, SPA: 80, SPD: 60, SPE: 75 },
      flavor: 'Are very Prideful creatures usually getting into fights recklessly due to this; they\'re very prone to injuries.',
      evo: { from: '104', method: 'Positive Nature' },
      levelMoves: [
        M('0', 'Healblock'),  // REVIEW name
        M('1', 'Healblock'),  // REVIEW name
        M('1', 'Return'),  // REVIEW name
        M('1', 'Charm'),  // REVIEW name
        M('1', 'Howl'),  // REVIEW name
        M('1', 'Ember'),
        M('1', 'Smog'),  // REVIEW name
        M('1', 'Quash'),  // REVIEW name
        M('13', 'Feintattack'),  // REVIEW name
        M('17', 'Fire Spin'),
        M('21', 'Roar'),  // REVIEW name
        M('27', 'Snarl'),  // REVIEW name
        M('32', 'Burningjealousy'),  // REVIEW name
        M('37', 'Acupressure'),  // REVIEW name
        M('43', 'Meanlook'),  // REVIEW name
        M('48', 'Overheat'),  // REVIEW name
        M('53', 'Nobleroar'),  // REVIEW name
        M('58', 'Punishment'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 1, SPE: 1 }, baseFriendship: 70, baseExp: 131, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4096,
    },
{
      dex: '106', name: 'Scorow', category: 'Somber Sepulture', types: ['FIRE', 'DARK'],
      height: '-', weight: '', catchRate: 90, found: [],
      abilities: ['Flash Fire', 'Oblivious'],
      hidden: 'Moody',
      stats: { HP: 60, ATK: 50, DEF: 45, SPA: 70, SPD: 70, SPE: 75 },
      flavor: 'Shaped by a somber past, Scorow distrust humans and often attack when confronted. Yet recent domestication efforts have begun to succeed.',
      evo: { from: '104', method: 'Negative Nature' },
      levelMoves: [
        M('0', 'Embargo'),  // REVIEW name
        M('1', 'Embargo'),  // REVIEW name
        M('1', 'Frustration'),  // REVIEW name
        M('1', 'Tearfullook'),  // REVIEW name
        M('1', 'Howl'),  // REVIEW name
        M('1', 'Ember'),
        M('1', 'Smog'),  // REVIEW name
        M('1', 'Quash'),  // REVIEW name
        M('13', 'Feintattack'),  // REVIEW name
        M('17', 'Fire Spin'),
        M('21', 'Roar'),  // REVIEW name
        M('27', 'Snarl'),  // REVIEW name
        M('32', 'Burningjealousy'),  // REVIEW name
        M('37', 'Acupressure'),  // REVIEW name
        M('43', 'Meanlook'),  // REVIEW name
        M('48', 'Inferno'),  // REVIEW name
        M('53', 'Nobleroar'),  // REVIEW name
        M('58', 'Punishment'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 1, SPD: 1 }, baseFriendship: 30, baseExp: 131, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4096,
    },
{
      dex: '107', name: 'Cerbament', category: 'Mercurial Chimera', types: ['FIRE', 'DARK'],
      height: '-', weight: '', catchRate: 10, found: [],
      abilities: ['Flash Fire', 'Guard Dog'],
      hidden: 'Moody',
      stats: { HP: 90, ATK: 75, DEF: 60, SPA: 125, SPD: 105, SPE: 85 },
      flavor: 'Legend says only the pure-hearted witness Cerbament, with tales of their Herculean trials echoing through the ages.',
      evo: { from: ['105', '106'], method: 'Fuse Gleeruption + Scorow (Lv 40) w/ Binding Flame' },
      levelMoves: [
        M('1', 'Infernalparade'),  // REVIEW name
        M('1', 'Infernalparade'),  // REVIEW name
        M('1', 'Doublehit'),  // REVIEW name
        M('1', 'Howl'),  // REVIEW name
        M('1', 'Ember'),
        M('1', 'Smog'),  // REVIEW name
        M('1', 'Quash'),  // REVIEW name
        M('13', 'Feintattack'),  // REVIEW name
        M('17', 'Fire Spin'),
        M('21', 'Roar'),  // REVIEW name
        M('27', 'Snarl'),  // REVIEW name
        M('32', 'Burningjealousy'),  // REVIEW name
        M('37', 'Acupressure'),  // REVIEW name
        M('44', 'Meanlook'),  // REVIEW name
        M('50', 'Punishment'),  // REVIEW name
        M('56', 'Nobleroar'),  // REVIEW name
        M('63', 'Fierywrath'),  // REVIEW name
        M('71', 'Eruption'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Protect'),
        TM('04', 'Confuse Ray'),
        TM('05', 'Thief'),
        TM('06', 'Rest'),
        TM('07', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 2, SPD: 1 }, baseFriendship: 50, baseExp: 245, growthRate: 'Medium',
      eggGroups: ['Field'], gender: { m: 50, f: 50 }, eggCycles: 4096,
    },
{
      dex: '108', name: 'Ocubitten', category: 'Sneaky', types: ['DARK', 'FLYING'],
      height: '-', weight: '', catchRate: 245, found: ['Route 4'],
      abilities: ['Stakeout', 'Unnerve'],
      hidden: 'Triage',
      stats: { HP: 34, ATK: 50, DEF: 34, SPA: 60, SPD: 42, SPE: 74 },
      flavor: 'It maybbe small but Ocubitten watches in the shadows with its red glowing eyes and it liked to play tricks on passerby\'s to comes too close.',
      evo: { to: '109' },
      levelMoves: [
        M('1', 'Leer'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('5', 'Supersonic'),  // REVIEW name
        M('8', 'Pursuit'),  // REVIEW name
        M('12', 'Disable'),  // REVIEW name
        M('15', 'Aircutter'),  // REVIEW name
        M('19', 'Ominouswind'),  // REVIEW name
        M('22', 'Torment'),  // REVIEW name
        M('26', 'Fullmoonbind'),  // REVIEW name
        M('29', 'Nightslash'),  // REVIEW name
        M('33', 'Mindreader'),  // REVIEW name
        M('37', 'Leechlife'),  // REVIEW name
        M('40', 'Partingshot'),  // REVIEW name
        M('44', 'Nastyplot'),  // REVIEW name
        M('47', 'Razorwind'),  // REVIEW name
      ],
      eggMoves: [
        EGG('Airslash'),  // REVIEW name
        EGG('Twister'),  // REVIEW name
      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 1 }, baseFriendship: 50, baseExp: 49, growthRate: 'Medium',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '109', name: 'Ocuclaw', category: 'Surprise Ambush', types: ['DARK', 'FLYING'],
      height: '-', weight: '', catchRate: 95, found: [],
      abilities: ['Stakeout', 'Unnerve'],
      hidden: 'Triage',
      stats: { HP: 54, ATK: 70, DEF: 44, SPA: 80, SPD: 52, SPE: 94 },
      flavor: 'Ocuclaw cloaks itself like a shadow, often resting but sometimes swooping to startle smaller Pokémon before they can react.',
      evo: { from: '108', to: '110', method: 'Lv 18' },
      levelMoves: [
        M('0', 'Feintattack'),  // REVIEW name
        M('1', 'Feintattack'),  // REVIEW name
        M('1', 'Razorwind'),  // REVIEW name
        M('1', 'Leer'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Supersonic'),  // REVIEW name
        M('1', 'Pursuit'),  // REVIEW name
        M('12', 'Disable'),  // REVIEW name
        M('15', 'Aircutter'),  // REVIEW name
        M('20', 'Ominouswind'),  // REVIEW name
        M('24', 'Torment'),  // REVIEW name
        M('29', 'Fullmoonbind'),  // REVIEW name
        M('33', 'Nighslash'),  // REVIEW name
        M('38', 'Mindreader'),  // REVIEW name
        M('42', 'Leechlife'),  // REVIEW name
        M('47', 'Partingshot'),  // REVIEW name
        M('51', 'Nastyplot'),  // REVIEW name
        M('55', 'Razorwind'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPE: 1, SPA: 1 }, baseFriendship: 50, baseExp: 134, growthRate: 'Medium',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
{
      dex: '110', name: 'Ocurage', category: 'Shadow Terror', types: ['DARK', 'FLYING'],
      height: '-', weight: '', catchRate: 45, found: [],
      abilities: ['Stakeout', 'Unnerve'],
      hidden: 'Triage',
      stats: { HP: 74, ATK: 92, DEF: 64, SPA: 103, SPD: 72, SPE: 99 },
      flavor: 'Ocurage soars through the night, its vast wings casting shadows below. Spotting prey within, it dives at blinding speed to strike.',
      evo: { from: '109', method: 'Lv 37' },
      levelMoves: [
        M('0', 'Oblivionwing'),  // REVIEW name
        M('1', 'Oblivionwing'),  // REVIEW name
        M('1', 'Razorwind'),  // REVIEW name
        M('1', 'Feintattack'),  // REVIEW name
        M('1', 'Leer'),  // REVIEW name
        M('1', 'Absorb'),  // REVIEW name
        M('1', 'Supersonic'),  // REVIEW name
        M('1', 'Pursuit'),  // REVIEW name
        M('12', 'Disable'),  // REVIEW name
        M('15', 'Aircutter'),  // REVIEW name
        M('20', 'Ominouswind'),  // REVIEW name
        M('24', 'Torment'),  // REVIEW name
        M('29', 'Fullmoonbind'),  // REVIEW name
        M('33', 'Nighslash'),  // REVIEW name
        M('39', 'Mindreader'),  // REVIEW name
        M('44', 'Leechlife'),  // REVIEW name
        M('50', 'Partingshot'),  // REVIEW name
        M('55', 'Nastyplot'),  // REVIEW name
        M('61', 'Hurricane'),  // REVIEW name
      ],
      eggMoves: [

      ],
      tmMoves: [
        TM('01', 'Work Up'),
        TM('02', 'Double Team'),
        TM('03', 'Aerial Ace'),
        TM('04', 'Protect'),
        TM('05', 'Confuse Ray'),
        TM('06', 'Thief'),
        TM('07', 'Rest'),
        TM('08', 'Thunderwave'),  // REVIEW name
      ],
      anomaly: null,
      evYield: { SPA: 2, SPE: 1 }, baseFriendship: 50, baseExp: 238, growthRate: 'Medium',
      eggGroups: ['Flying'], gender: { m: 50, f: 50 }, eggCycles: 3840,
    },
  ];

  const byDex = (n) => DEX.find((d) => d.dex === String(n));

  return { TYPES, DEX, STAT_LABELS, STAT_MAX, byDex };
})();
