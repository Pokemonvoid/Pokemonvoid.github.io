/* ============================================================
   HIDDEN EASTER EGG — the Meguppy line.
   This file is NOT loaded by the wiki normally. It is fetched and
   executed only after the secret unlock (clicking the credit name
   19 times in one sitting). When the user leaves the secret pages,
   the overlay unmounts and this data leaves the page.
   Nothing here is registered into VDEX / VGAME / VIEWS / search.
   ============================================================ */
(function () {
  // guard: only set up once per load
  if (window.__MEG__) { window.__MEG__.open(); return; }

  const T = {
    Ground: { bg: '#b08030', glow: '#d8a850', fg: '#3d2800' },
    Light: { bg: '#caa400', glow: '#f0c800', fg: '#3a2800' },
    Ghost: { bg: '#503890', glow: '#8a6fd0', fg: '#fff' },
    Normal: { bg: '#8a8a78', glow: '#b8b8a0', fg: '#fff' },
    Dark: { bg: '#403830', glow: '#6a5e50', fg: '#fff' },
    Fairy: { bg: '#d86088', glow: '#f08fb0', fg: '#fff' },
    Fighting: { bg: '#901818', glow: '#c84848', fg: '#fff' },
    Psychic: { bg: '#d81858', glow: '#f06090', fg: '#fff' },
    Water: { bg: '#2858e8', glow: '#5a8af8', fg: '#fff' },
    Fire: { bg: '#e04010', glow: '#f87840', fg: '#fff' },
  };

  // ---- the line's data (kept entirely local to this file) ----
  const FORMS = {
    meguppy: {
      key: 'meguppy', dex: '234', name: 'Meguppy', species: 'Puppy Pokémon', img: 'secret/meg-1.png',
      types: ['Ground'], height: '1\'04"', weight: '18.7 lbs',
      abilities: [['Pickup', false], ['Bring Back', false], ['Friendly Face', true]],
      stats: { HP: 55, Atk: 55, Def: 50, SpA: 55, SpD: 50, Spe: 50 }, total: 315,
      ev: '1 Sp. Atk', catch: 190, friend: 70, exp: 57, growth: 'Parabolic',
      egg: 'Kindred', gender: '♀ 100%', cycles: 'Does not breed',
      flavor: ['It proudly brings anything it finds to those it trusts, even if the item has no value.'],
      level: [['1', 'Tackle', 'Normal'], ['1', 'Tail Whip', 'Normal'], ['1', 'Sand Attack', 'Ground'], ['4', 'Mud-Slap', 'Ground'], ['7', 'Play Nice', 'Normal'], ['10', 'Dig', 'Ground'], ['13', 'Happy Dig', 'Ground'], ['16', 'Bite', 'Dark'], ['20', 'Found It!', 'Normal'], ['24', 'Helping Hand', 'Normal'], ['28', 'Mud Shot', 'Ground'], ['32', 'Mud Tumble', 'Ground']],
      tm: [['Dig', 'Ground'], ['Bulldoze', 'Ground'], ['Mud Shot', 'Ground'], ['Mud-Slap', 'Ground'], ['Protect', 'Normal'], ['Rest', 'Psychic'], ['Helping Hand', 'Normal'], ['Charm', 'Fairy'], ['Water Pulse', 'Water'], ['Aqua Ring', 'Water']],
      egg_moves: [['Yawn', 'Normal'], ['Wish', 'Normal'], ['Baby-Doll Eyes', 'Fairy'], ['Aqua Ring', 'Water'], ['Life Dew', 'Water'], ['Howl', 'Normal'], ['Lick', 'Ghost'], ['Curious Grumble', 'Normal'], ['Fetch', 'Normal']],
    },
    megolden: {
      key: 'megolden', dex: '235', name: 'Megolden', species: 'Best Friend Pokémon', img: 'secret/meg-2.png',
      types: ['Ground'], height: '3\'07"', weight: '68.3 lbs',
      abilities: [['Pickup', false], ['Bring Back', false], ['Friendly Face', true]],
      stats: { HP: 80, Atk: 85, Def: 70, SpA: 85, SpD: 70, Spe: 65 }, total: 455,
      ev: '2 Sp. Atk', catch: 90, friend: 70, exp: 148, growth: 'Parabolic',
      egg: 'Kindred', gender: '♀ 100%', cycles: '6,400 steps',
      flavor: ['Smaller Pokémon often gather beside it to rest. Megolden remains still until they wake, even if doing so leaves it uncomfortable.', 'When curious, it emits an unusual growl-like howl. Researchers have spent years attempting to determine its purpose.'],
      level: [['Evo.', 'Bring Home', 'Ground'], ['1', 'Dig', 'Ground'], ['1', 'Happy Dig', 'Ground'], ['1', 'Helping Hand', 'Normal'], ['1', 'Bite', 'Dark'], ['36', 'Bulldoze', 'Ground'], ['40', 'Play Rough', 'Fairy'], ['44', 'Mud Tumble', 'Ground'], ['48', 'Crunch', 'Dark'], ['52', 'Heal Bell', 'Normal'], ['56', 'Earth Power', 'Ground'], ['60', 'Wish', 'Normal'], ['64', 'Aura Sphere', 'Fighting'], ['68', 'Safeguard', 'Normal'], ['72', 'Earthquake', 'Ground'], ['76', 'Forever Glow', 'Light']],
      tm: [['Dig', 'Ground'], ['Bulldoze', 'Ground'], ['Earthquake', 'Ground'], ['Earth Power', 'Ground'], ['Mud Shot', 'Ground'], ['Protect', 'Normal'], ['Rest', 'Psychic'], ['Heal Bell', 'Normal'], ['Wish', 'Normal'], ['Safeguard', 'Normal'], ['Light Screen', 'Psychic'], ['Reflect', 'Psychic'], ['Play Rough', 'Fairy'], ['Dazzling Gleam', 'Fairy'], ['Water Pulse', 'Water'], ['Aqua Ring', 'Water'], ['Life Dew', 'Water'], ['Aura Sphere', 'Fighting']],
      egg_moves: [['Yawn', 'Normal'], ['Wish', 'Normal'], ['Play Rough', 'Fairy'], ['Curious Grumble', 'Normal'], ['Fetch', 'Normal']],
    },
    megever: {
      key: 'megever', dex: '236', name: 'Megever', species: 'Forever Pokémon', img: 'secret/meg-3.png',
      types: ['Light', 'Ground'], height: '5\'10"', weight: '179.4 lbs',
      abilities: [['Pickup', false], ['Bring Back', false], ['Friendly Face', true]],
      stats: { HP: 95, Atk: 110, Def: 100, SpA: 110, SpD: 100, Spe: 85 }, total: 600,
      ev: '3 Atk / 3 Sp. Atk', catch: 3, friend: 100, exp: 300, growth: 'Slow',
      egg: 'Kindred', gender: '♀ 100%', cycles: 'Does not breed',
      flavor: ['It is said that no bond is ever truly forgotten by Megever. Travelers lost at night often report pawprints appearing beside their own.', 'Even in old age, it never parts with what it holds dear. Smaller Pokémon gather around it, knowing they will be safe until morning.'],
      level: [['Evo.', 'Forever Glow', 'Light'], ['1', 'Golden Glow', 'Light'], ['1', 'Bring Home', 'Ground'], ['1', 'Wish', 'Normal'], ['1', 'Heal Bell', 'Normal'], ['80', 'Earthquake', 'Ground'], ['84', 'Aura Sphere', 'Fighting'], ['88', 'Dazzling Gleam', 'Fairy'], ['92', 'Calm Mind', 'Psychic'], ['96', 'Magnitude', 'Ground'], ['100', 'Eternal Rest', 'Light']],
      tm: [['Dig', 'Ground'], ['Bulldoze', 'Ground'], ['Earthquake', 'Ground'], ['Earth Power', 'Ground'], ['Stomping Tantrum', 'Ground'], ['Mud Shot', 'Ground'], ['Protect', 'Normal'], ['Rest', 'Psychic'], ['Heal Bell', 'Normal'], ['Wish', 'Normal'], ['Safeguard', 'Normal'], ['Light Screen', 'Psychic'], ['Reflect', 'Psychic'], ['Calm Mind', 'Psychic'], ['Magnitude', 'Ground'], ['Play Rough', 'Fairy'], ['Dazzling Gleam', 'Fairy'], ['Aura Sphere', 'Fighting'], ['Mystical Fire', 'Fire'], ['Water Pulse', 'Water'], ['Aqua Ring', 'Water'], ['Life Dew', 'Water']],
      egg_moves: [],
    },
    mega: {
      key: 'mega', dex: '236', name: 'Mega Megever', species: 'Companion Spirit Pokémon', img: 'secret/meg-4.png',
      types: ['Ghost', 'Light'], height: '8\'03"', weight: '0.01 lbs', megaStone: 'Megeverite',
      abilities: [['Always Beside You', false]],
      stats: { HP: 115, Atk: 110, Def: 130, SpA: 110, SpD: 130, Spe: 105 }, total: 700,
      ev: '3 Atk / 3 Sp. Atk', catch: 'Cannot be caught', friend: 255, exp: 345, growth: 'Slow',
      egg: 'Kindred', gender: '♀ 100%', cycles: 'Does not breed',
      flavor: ['When its bond with its Trainer reaches its peak, Megever\'s spirit shines through its body. Though its form becomes ethereal, its devotion remains unchanged.', 'Many believe Mega Megever appears only during battle. Those who have traveled with one insist it never truly leaves their side.', 'It is said that those who have loved and lost a companion can sometimes glimpse Mega Megever walking beside them beneath the evening sky.'],
      level: [], tm: [], egg_moves: [],
    },
  };
  const ORDER = ['meguppy', 'megolden', 'megever', 'mega'];

  const CUSTOM = {
    abilities: [
      { name: 'Friendly Face', tag: 'Hidden Ability', desc: 'Its comforting expression makes even wary Pokémon lower their guard.', effect: ['Wild Pokémon catch rate ×1.15 while on the field.', 'Only functions during wild encounters.', 'Does not function in trainer battles.', 'Does not stack with other instances.'] },
      { name: 'Bring Back', tag: 'Standard Ability', desc: 'This Pokémon always finds a way to return what was lost.', effect: ['On contact move: 20% chance to restore a consumed or knocked-off item for itself or an ally.', 'Cannot restore Focus Sash or Focus Band.', 'Cannot duplicate or create new items.'] },
      { name: 'Always Beside You', tag: 'Mega Ability', desc: 'Its devotion allows it to remain standing when others would fall.', effect: ['Once per battle, survives a KO from direct damage with 1 HP.', 'Functions regardless of current HP.', 'Does not reset after switching out.', 'Does not prevent self-inflicted KOs.'] },
    ],
    item: { name: 'Driftwood / Favourite Stick', tag: 'Evolution Item / Held Item', desc: 'A weathered piece of wood treasured by the Meguppy line. Though it begins as a simple stick, it often becomes a lifelong companion.', effect: ['Reduces all damage taken by 5%.', 'Restores 1/16 max HP at the end of each turn.', 'Cannot be removed, stolen, swapped, or destroyed while held by the Meguppy line.'] },
    moves: [
      { name: 'Happy Dig', type: 'Ground', cat: 'Physical', power: 50, acc: 100, pp: 15, prio: '+1', desc: 'Deals damage. 30% chance to raise Speed by 1 stage.' },
      { name: 'Found It!', type: 'Normal', cat: 'Status', power: '—', acc: '—', pp: 15, prio: '0', desc: 'Raises one random non-evasion stat by 1 stage. Can target the user or an ally.' },
      { name: 'Mud Tumble', type: 'Ground', cat: 'Physical', power: 65, acc: 100, pp: 15, prio: '0', desc: 'Deals damage.' },
      { name: 'Bring Home', type: 'Ground', cat: 'Physical', power: 60, acc: 100, pp: 20, prio: '0', desc: 'Deals damage and returns the user\'s lost held item if able.' },
      { name: 'Forever Glow', type: 'Light', cat: 'Special', power: 90, acc: 100, pp: 10, prio: '0', desc: 'A radiant beam of devotion.' },
      { name: 'Golden Glow', type: 'Light', cat: 'Special', power: 80, acc: 100, pp: 15, prio: '0', desc: 'Bathes the target in golden light.' },
      { name: 'Eternal Rest', type: 'Light', cat: 'Status', power: '—', acc: '—', pp: 5, prio: '0', desc: 'Fully restores HP and cures status, then guards the user for a turn.' },
      { name: 'Curious Grumble', type: 'Normal', cat: 'Status', power: '—', acc: '—', pp: 20, prio: '0', desc: 'An odd howl that lowers the target\'s Attack.' },
      { name: 'Fetch', type: 'Normal', cat: 'Status', power: '—', acc: '—', pp: 20, prio: '0', desc: 'Retrieves a thrown or lost item.' },
    ],
  };

  // ---------- rendering ----------
  const h = React.createElement;
  const tcol = (t) => T[t] || { bg: '#555', glow: '#888', fg: '#fff' };
  function TypeTag({ t, big }) {
    const c = tcol(t);
    return h('span', { style: { display: 'inline-block', background: c.bg, color: c.fg, fontFamily: "'Silkscreen', monospace", fontSize: big ? 11 : 8, letterSpacing: 0.5, padding: big ? '4px 10px' : '2px 7px', borderRadius: 5, textTransform: 'uppercase', marginRight: 4, boxShadow: `0 0 8px ${c.glow}55` } }, t);
  }

  function MovesTable({ title, rows, withLv }) {
    if (!rows || !rows.length) return null;
    return h('div', { style: { marginBottom: 18 } },
      h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#cc99ff', letterSpacing: 1, marginBottom: 8, borderBottom: '1px solid #2a2350', paddingBottom: 5 } }, title),
      h('table', { style: { width: '100%', borderCollapse: 'collapse', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5 } },
        rows.map((r, i) => h('tr', { key: i, style: { borderBottom: '1px solid #1a1533' } },
          withLv ? h('td', { style: { padding: '5px 8px', color: '#c0a0ff', width: 44 } }, r[0]) : null,
          h('td', { style: { padding: '5px 8px', color: '#e9e4ff' } }, withLv ? r[1] : r[0]),
          h('td', { style: { padding: '5px 8px', width: 84 } }, h(TypeTag, { t: withLv ? r[2] : r[1] }))
        ))
      )
    );
  }

  function FormPage({ form, go }) {
    const c = tcol(form.types[0]);
    const statRows = [['HP', form.stats.HP, '#ff5555'], ['Attack', form.stats.Atk, '#f0a050'], ['Defense', form.stats.Def, '#f0d050'], ['Sp. Atk', form.stats.SpA, '#6890f0'], ['Sp. Def', form.stats.SpD, '#78c850'], ['Speed', form.stats.Spe, '#f87090']];
    const maxStat = 160;
    return h('div', { style: { borderRadius: 18, overflow: 'hidden', border: `1px solid ${c.glow}55`, background: 'radial-gradient(ellipse at 30% 0%, #1a0f2e 0%, #0a0818 60%)' } },
      // hero
      h('div', { style: { padding: '28px 24px 18px', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${c.bg}44, transparent 70%)` } },
        h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 11, color: c.glow, letterSpacing: 2 } }, 'No. ' + form.dex),
        h('h1', { style: { margin: '6px 0 2px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 44, color: '#fff', textShadow: `0 0 30px ${c.glow}88` } }, form.name),
        h('div', { style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#c0a0ff' } }, form.species),
        form.megaStone ? h('div', { style: { marginTop: 6, fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#f0c800' } }, '✦ Mega Stone: ' + form.megaStone) : null,
        h('img', { src: form.img, alt: form.name, style: { width: 200, height: 200, objectFit: 'contain', margin: '10px auto 4px', filter: `drop-shadow(0 8px 30px ${c.glow}66)` } }),
        h('div', null, form.types.map(t => h(TypeTag, { key: t, t, big: true })))
      ),
      // flavor
      h('div', { style: { padding: '0 24px 18px' } },
        form.flavor.map((f, i) => h('div', { key: i, style: { fontStyle: 'italic', fontSize: 13, color: '#c0a0ff', background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 6, borderLeft: '3px solid #6633cc', marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" } }, '"' + f + '"'))
      ),
      // data grid
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, padding: '0 24px 18px' } },
        // left: dex/training/breeding
        h('div', null,
          h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#cc99ff', letterSpacing: 1, marginBottom: 8 } }, 'POKÉDEX DATA'),
          kv('Height', form.height), kv('Weight', form.weight), kv('EV Yield', form.ev), kv('Catch Rate', form.catch), kv('Base Friendship', form.friend), kv('Base Exp.', form.exp), kv('Growth', form.growth),
          h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#cc99ff', letterSpacing: 1, margin: '14px 0 8px' } }, 'ABILITIES'),
          form.abilities.map((a, i) => h('div', { key: i, style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: a[1] ? '#cdbfff' : '#e9e4ff', marginBottom: 4 } }, a[0] + (a[1] ? '  (hidden)' : ''))),
          h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#cc99ff', letterSpacing: 1, margin: '14px 0 8px' } }, 'BREEDING'),
          kv('Egg Group', form.egg), kv('Gender', form.gender), kv('Egg Cycles', form.cycles)
        ),
        // right: stats
        h('div', null,
          h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#cc99ff', letterSpacing: 1, marginBottom: 10 } }, 'BASE STATS'),
          statRows.map(([lbl, v, col]) => h('div', { key: lbl, style: { display: 'grid', gridTemplateColumns: '64px 32px 1fr', alignItems: 'center', gap: 8, marginBottom: 7 } },
            h('span', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#9980cc' } }, lbl),
            h('span', { style: { fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#fff', fontWeight: 700, textAlign: 'right' } }, v),
            h('div', { style: { height: 8, borderRadius: 4, background: '#1a1533', overflow: 'hidden' } }, h('div', { style: { width: Math.min(100, v / maxStat * 100) + '%', height: '100%', background: col, borderRadius: 4 } }))
          )),
          h('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '1px solid #2a2350', fontFamily: "'Space Mono', monospace", fontSize: 14 } },
            h('span', { style: { color: '#9980cc' } }, 'TOTAL'), h('span', { style: { color: c.glow, fontWeight: 700 } }, form.total))
        )
      ),
      // moves
      (form.level.length || form.tm.length || form.egg_moves.length) ? h('div', { style: { padding: '4px 24px 22px', borderTop: '1px solid #1a1533' } },
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 14 } },
          h('div', null, h(MovesTable, { title: 'LEVEL-UP MOVES', rows: form.level, withLv: true })),
          h('div', null,
            h(MovesTable, { title: 'TM MOVES', rows: form.tm }),
            h(MovesTable, { title: 'EGG MOVES', rows: form.egg_moves })
          )
        )
      ) : null
    );
  }
  function kv(k, v) {
    return h('div', { style: { display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, padding: '3px 0', borderBottom: '1px solid #16122c' } },
      h('span', { style: { color: '#9980cc' } }, k), h('span', { style: { color: '#fff' } }, v));
  }

  function CustomPage() {
    return h('div', { style: { borderRadius: 18, border: '1px solid #6633cc55', background: 'radial-gradient(ellipse at 30% 0%, #1a0f2e 0%, #0a0818 60%)', padding: 24 } },
      h('h1', { style: { margin: '0 0 4px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 32, color: '#fff' } }, 'Meguppy Line'),
      h('div', { style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#c0a0ff', marginBottom: 18 } }, 'Custom Moves, Abilities & Signature Item'),
      // abilities
      h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#cc99ff', letterSpacing: 1, marginBottom: 10 } }, 'CUSTOM ABILITIES'),
      CUSTOM.abilities.map((a, i) => h('div', { key: i, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 14, marginBottom: 10, border: '1px solid #2a2350' } },
        h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 10 } },
          h('span', { style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' } }, a.name),
          h('span', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#cc99ff' } }, a.tag.toUpperCase())),
        h('div', { style: { fontStyle: 'italic', fontSize: 12.5, color: '#c0a0ff', margin: '6px 0' } }, '"' + a.desc + '"'),
        h('ul', { style: { margin: '4px 0 0', paddingLeft: 18, color: '#cdc6e6', fontSize: 12.5, fontFamily: "'Space Grotesk', sans-serif" } }, a.effect.map((e, k) => h('li', { key: k, style: { marginBottom: 2 } }, e)))
      )),
      // item
      h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#cc99ff', letterSpacing: 1, margin: '18px 0 10px' } }, 'SIGNATURE ITEM'),
      h('div', { style: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 14, marginBottom: 18, border: '1px solid #2a2350' } },
        h('div', { style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#f0c800' } }, CUSTOM.item.name),
        h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#cc99ff', margin: '3px 0 6px' } }, CUSTOM.item.tag.toUpperCase()),
        h('div', { style: { fontStyle: 'italic', fontSize: 12.5, color: '#c0a0ff', marginBottom: 6 } }, '"' + CUSTOM.item.desc + '"'),
        h('ul', { style: { margin: 0, paddingLeft: 18, color: '#cdc6e6', fontSize: 12.5, fontFamily: "'Space Grotesk', sans-serif" } }, CUSTOM.item.effect.map((e, k) => h('li', { key: k, style: { marginBottom: 2 } }, e)))
      ),
      // moves
      h('div', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#cc99ff', letterSpacing: 1, marginBottom: 10 } }, 'CUSTOM MOVES'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 10 } },
        CUSTOM.moves.map((m, i) => h('div', { key: i, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 12, border: '1px solid #2a2350' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
            h('span', { style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff' } }, m.name), h(TypeTag, { t: m.type })),
          h('div', { style: { fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#9980cc', marginBottom: 5 } }, `${m.cat} · Pow ${m.power} · Acc ${m.acc} · PP ${m.pp} · Pri ${m.prio}`),
          h('div', { style: { fontSize: 12, color: '#cdc6e6', fontFamily: "'Space Grotesk', sans-serif" } }, m.desc)
        ))
      )
    );
  }

  function Secret() {
    const [page, setPage] = React.useState('meguppy'); // form key or 'custom'
    const cur = FORMS[page];
    const navBtn = (key, label) => h('button', {
      key, onClick: () => setPage(key),
      style: { cursor: 'pointer', padding: '8px 13px', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, background: page === key ? 'linear-gradient(135deg, #4a2d8a, #2a1860)' : '#15102a', border: `1px solid ${page === key ? '#9966ff' : '#2a2350'}`, color: page === key ? '#fff' : '#9a93bb' }
    }, label);

    return h('div', { style: { position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto', background: 'radial-gradient(ellipse at 50% -10%, #1a0f30, #05030c 70%)' } },
      h('div', { style: { maxWidth: 920, margin: '0 auto', padding: '24px 18px 80px' } },
        // secret banner + leave
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' } },
          h('span', { style: { fontFamily: "'Silkscreen', monospace", fontSize: 11, color: '#cc99ff', letterSpacing: 2 } }, '✦ A SECRET FRIEND ✦'),
          h('button', { onClick: () => window.__MEG__.close(),
            style: { marginLeft: 'auto', cursor: 'pointer', background: '#2a1020', border: '1px solid #ff5f7e66', color: '#ff8fa6', borderRadius: 10, padding: '9px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 } }, '✕ Leave')
        ),
        // form nav
        h('div', { style: { display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 } },
          ORDER.map(k => navBtn(k, FORMS[k].name)),
          navBtn('custom', 'Moves & Abilities')
        ),
        // evo chain strip
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 18, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid #1d1838' } },
          ORDER.map((k, i) => [
            h('div', { key: k, onClick: () => setPage(k), style: { cursor: 'pointer', textAlign: 'center' } },
              h('img', { src: FORMS[k].img, alt: FORMS[k].name, style: { width: 64, height: 64, objectFit: 'contain', opacity: page === k ? 1 : 0.6 } }),
              h('div', { style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: page === k ? '#fff' : '#9a93bb', fontWeight: 600 } }, FORMS[k].name)),
            i < ORDER.length - 1 ? h('span', { key: 'a' + i, style: { color: '#6a5e90', fontSize: 18 } }, '→') : null
          ])
        ),
        // page body
        page === 'custom' ? h(CustomPage) : h(FormPage, { form: cur })
      )
    );
  }

  // ---------- mount / unmount controller ----------
  let root = null, container = null, watching = false;
  function mount() {
    if (container) return;
    container = document.createElement('div');
    container.id = '__meg_overlay__';
    document.body.appendChild(container);
    root = ReactDOM.createRoot ? ReactDOM.createRoot(container) : null;
    if (root) root.render(React.createElement(Secret));
    else ReactDOM.render(React.createElement(Secret), container);
    document.body.style.overflow = 'hidden';
    // leave if the user navigates the real site (hash change) — keeps it ephemeral, no shareable URL
    if (!watching) { watching = true; window.addEventListener('hashchange', onLeave); }
  }
  function onLeave() { unmount(); }
  function unmount() {
    if (!container) return;
    try { if (root && root.unmount) root.unmount(); else ReactDOM.unmountComponentAtNode(container); } catch (e) {}
    container.remove(); container = null; root = null;
    document.body.style.overflow = '';
    window.removeEventListener('hashchange', onLeave); watching = false;
  }

  window.__MEG__ = { open: mount, close: unmount };
  mount();
})();
