/* Pokémon Void — shared placeholder content for the detail-page explorations.
   Real data/sprites will be swapped in by the user. */
window.VOID = (function () {
  // Custom + standard type palette (DS-era pill colors, void leans cosmic)
  const TYPES = {
    VOID:    { name: 'Void',    fg: '#e9defb', bg: '#3a1d6e', glow: '#8a5cff' },
    COSMIC:  { name: 'Cosmic',  fg: '#dff1ff', bg: '#15375e', glow: '#33d6ff' },
    DARK:    { name: 'Dark',    fg: '#e7e0d8', bg: '#3a2f29', glow: '#9b7b5e' },
    PSYCHIC: { name: 'Psychic', fg: '#ffe1ee', bg: '#7a2f57', glow: '#ff5fa2' },
    GHOST:   { name: 'Ghost',   fg: '#e9defb', bg: '#43356b', glow: '#a07bd6' },
    FIRE:    { name: 'Fire',    fg: '#ffe6d6', bg: '#7a3318', glow: '#ff7a3c' },
    WATER:   { name: 'Water',   fg: '#d9ecff', bg: '#1c456e', glow: '#3c9bff' },
    GRASS:   { name: 'Grass',   fg: '#e0ffd6', bg: '#27531f', glow: '#5fd13c' },
    ELECTRIC:{ name: 'Electric',fg: '#fff7d6', bg: '#6e5a12', glow: '#ffd23c' },
    STEEL:   { name: 'Steel',   fg: '#e8edf2', bg: '#3c454d', glow: '#9fb3c2' },
    DRAGON:  { name: 'Dragon',  fg: '#e3dcff', bg: '#2d2470', glow: '#7c6cff' },
    NORMAL:  { name: 'Normal',  fg: '#efeae2', bg: '#4a463f', glow: '#bdb4a6' },
  };

  // Hero entry — the legendary Team Void worships. Dex #000 (the void = zero).
  const OBLIVAX = {
    dex: '000',
    name: 'OBLIVAX',
    category: 'Void Sovereign Pokémon',
    types: ['VOID', 'COSMIC'],
    height: '4.2 m',
    weight: '∞ kg',
    catchRate: 3,
    genderless: true,
    abilities: [
      { name: 'Event Horizon', desc: 'Contact moves against OBLIVAX lose 50% power — light bends, but never returns.' },
    ],
    hidden: { name: 'Singularity', desc: 'On entry, pulls the foe\u2019s held item into the void. The item is gone for the battle.' },
    stats: { HP: 120, ATK: 95, DEF: 110, SPA: 150, SPD: 120, SPE: 105 },
    flavor:
      'Said to be the silence before the first star. Team Void believes OBLIVAX dreams the universe and that, one day, it will choose to stop. Its body is a tear in space that light pours into but never escapes.',
    forms: ['Dormant', 'Eclipsed'],
    region: 'Nullspace Rift',
    moves: [
      { lv: '—',  name: 'Oblivion Beam', type: 'VOID',   cls: 'Special',  pow: 130, acc: 90,  pp: 5,  sig: true },
      { lv: '1',  name: 'Null Pulse',    type: 'VOID',   cls: 'Special',  pow: 60,  acc: 100, pp: 20 },
      { lv: '1',  name: 'Star Gaze',     type: 'COSMIC', cls: 'Status',   pow: '—', acc: '—', pp: 10 },
      { lv: '18', name: 'Gravity Well',  type: 'COSMIC', cls: 'Special',  pow: 80,  acc: 100, pp: 10 },
      { lv: '33', name: 'Phase Out',     type: 'GHOST',  cls: 'Status',   pow: '—', acc: '—', pp: 15 },
      { lv: '50', name: 'Event Collapse',type: 'VOID',   cls: 'Physical', pow: 120, acc: 85,  pp: 5  },
    ],
    // type matchups vs OBLIVAX (Void/Cosmic) — illustrative
    weak: ['DARK', 'GHOST'],
    resist: ['PSYCHIC', 'DRAGON', 'NORMAL'],
    immune: ['COSMIC'],
  };

  // a few neighbours for the "related / dex strip"
  const ROSTER = [
    { dex: '000', name: 'OBLIVAX',  types: ['VOID', 'COSMIC'] },
    { dex: '011', name: 'Nebulisp', types: ['COSMIC', 'GHOST'] },
    { dex: '012', name: 'Voidlinct',types: ['VOID', 'DARK'] },
    { dex: '048', name: 'Quasamander', types: ['COSMIC', 'FIRE'] },
    { dex: '077', name: 'Gravimaw', types: ['VOID', 'STEEL'] },
  ];

  const STAT_LABELS = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };
  const STAT_MAX = 200;

  return { TYPES, OBLIVAX, ROSTER, STAT_LABELS, STAT_MAX };
})();
