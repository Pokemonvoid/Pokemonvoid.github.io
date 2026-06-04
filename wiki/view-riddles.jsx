/* Pokémon Void — Riddle Chamber (semi-hidden). window.VIEWS.Riddles
   Reached only by clicking the "VOIDDEX" word in the footer. Answers are always
   a Pokémon from Void; clues are built from their lore / types / evolutions /
   moves. 5 tiers x 10 riddles. Hints on Easy & Medium only; Nightmare is pure.
   Answer-checking is normalized (case/space/punctuation-insensitive). */
window.VIEWS = window.VIEWS || {};
(function () {
  const { go, SpriteSlot, PageHead, Empty } = window.VUI;
  const { byDex, DEX } = window.VDEX;

  // resolve a name to its dex entry (for the reveal sprite)
  const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const findMon = (name) => DEX.find(d => norm(d.name) === norm(name));

  // Each riddle: { q: clue, a: answer name, hint?: extra clue (easy/med only) }
  const RIDDLES = {
    Easy: [
      { q: "I'm a Grass-type starter who chews soil like gum to get my nutrition. Who am I?", a: 'Tamatoo', hint: "I'm the very first Pokémon in the dex." },
      { q: "A Fire-type often seen on clear nights in groups, stargazing. When excited, my tail heats up. Who am I?", a: 'Flaret', hint: "I'm a starter, #004." },
      { q: "A curious, constantly tired little Water-type. Who am I?", a: 'Cubble', hint: "The Water starter of Void." },
      { q: "I'm a Pokémon literally born inside a rock, struggling to move. Who am I?", a: 'Pebpup', hint: "My category is 'Pet Rock'." },
      { q: "A Normal/Rock dog, protective of the trainer who raised me out of my rock. Who am I?", a: 'Rocweiler', hint: "I evolve from Pebpup." },
      { q: "I store electrical energy in the fluffy clouds around my body. On dry days my herds gather. Who am I?", a: 'Capikid', hint: "A small Electric-type, category 'Tiny Spark'." },
      { q: "My shell is a literal disco ball — a prism over a carbon mirror that scatters light. Who am I?", a: 'Armadisco', hint: "I'm Light/Steel." },
      { q: "Inspired by trashed old comic books, I dream of becoming a hero. Who am I?", a: 'Rarcraft', hint: "A Normal-type scavenger." },
      { q: "I'm a Water-type that loves attention and makes a happy sound when content. Who am I?", a: 'Scraqua', hint: "Category 'Water Droplet'." },
      { q: "A Grass-type whose pot is its favorite haven. Who am I?", a: 'Shrubcub', hint: "Category 'Potted Bush'." },
    ],
    Medium: [
      { q: "I shield myself with a trash can, inspired by the hero 'Might Knight'. No amount of damage seems to faze me. Who am I?", a: 'Raclank', hint: "I'm Normal/Steel." },
      { q: "I possess the most lethal bite of any Pokémon, firing pressurized water. Who am I?", a: 'Hydrena', hint: "Water/Dark." },
      { q: "My emotions are uncontrollable, so my body shows every color of the rainbow. Who am I?", a: 'Karmold', hint: "Normal/Psychic; I evolve into a mon that mirrors its trainer." },
      { q: "My personality mirrors my trainer; as our bond deepens I shift away from chaos. Who am I?", a: 'Kamoleon', hint: "I evolve from Karmold." },
      { q: "I'm the result of a lost Pokémon's wish to shield others from its own fate — Fairy/Psychic, a found family. Who am I?", a: 'Foundsum', hint: "I branch from Purssume." },
      { q: "Found in the middle of roads and trails, I always seem to throw myself into harm's way. Who am I?", a: 'Purssume', hint: "Normal/Psychic; I can branch into two sad evolutions." },
      { q: "I emerge when my pre-evolution absorbs ice from a snowstorm, unleashing freeze lightning. Who am I?", a: 'Capibarron', hint: "Electric/Ice." },
      { q: "A Cosmic-type said to act as a bridge between worlds, transmitting unknown energy. Who am I?", a: 'Orbalink', hint: "Cosmic/Fairy." },
      { q: "The stars in my tail are stars not yet born; when their time comes, they ignite. Who am I?", a: 'Warrpen', hint: "Fire/Cosmic, middle stage." },
      { q: "During droughts I carry aquatic Pokémon to safer waters; my age is measured by my wingspan. Who am I?", a: 'Writrout', hint: "Water/Flying, a 'Fly Fish'." },
    ],
    Hard: [
      { q: "Once part of a giant, I split away and rose to the mesosphere; legends tie me to a shooting star.", a: 'Corelet' },
      { q: "I am the supernova — heat amassed until I collapsed into myself, a Light born of Cosmic ruin.", a: 'Colapsore' },
      { q: "My twin axes are frozen stone and my mane blazes with fury; I charge in where calm monks fear to tread.", a: 'Sediserker' },
      { q: "Only the pure-hearted are said to witness me; my trials are spoken of like the labors of a hero, three-natured and burning.", a: 'Cerbament' },
      { q: "I weave ghostly energy into stone, raising walls that shift like living shadows.", a: 'Sedimancer' },
      { q: "Shaped by a somber past, I distrust humans and strike when confronted — a Fire/Dark bird of the grave.", a: 'Scorow' },
      { q: "My yarn is a Drapallan staple, one of the largest farmed materials; I am tangled at heart.", a: 'Yarnsect' },
      { q: "Grandmasters of all my kin, I walk the line of dusk and dawn; little is known of me.", a: 'Equinine' },
      { q: "I rot so deeply that entire harvests are ruined; I thrive where fields are abandoned.", a: 'Blightato' },
      { q: "A thin prism over a carbon mirror; when light strikes me I become a dance floor — but name my final, grandest self.", a: 'Armadisco' },
    ],
    Expert: [
      { q: "Third in a vow carved from living rock, I am neither the still mind nor the shaper of shades. I kneel where the heavens go quiet, my shell drinking the dark, and the fire at my brow wears the shade a widow wears.", a: 'Sedivout' },
      { q: "Of the kin quarried from breathing stone, I turned my edge inward — a pulse that damns its own rhythm. Where my siblings chose the shrine, I chose the unlit lane.", a: 'Sedirogue' },
      { q: "Morning is my whetstone, not my comfort. I swallow the first light and let fly a single answer the old tales swear has never once asked for a second.", a: 'Sediranger' },
      { q: "A wish curdled to harm its own dreamer, given a body — yet the fist it raised now closes the eyes of the fallen with care. I am the darker of the two sorrows a lost stray may yet become.", a: 'Fellsum' },
      { q: "Cut, dealt, and made true: I surfaced from the unlit deep as the reading foretold, vast and unseen. The major's number is mine, the arcanum complete — read my suit.", a: 'Garcana' },
      { q: "I am the frost that eats warmth and is never warmed; the more I take, the colder I keep, a swelling ember that ends as a shudder folded around itself.", a: 'Gigantrum' },
      { q: "I broke a seam and put a question to the heights that has no answer — wing, or hull, or neither — then vaulted the line between the two worlds, delighted.", a: 'Brooskip' },
      { q: "Thunder cradled in ice; the storm my milder self could only sleep and dream of broke awake in me the day the white came down.", a: 'Capibarron' },
      { q: "Unfurl me and the ground forgets the sun. From a height that drinks all sound I mark the small and the slow — and I am the dread that closed the watcher's line for good.", a: 'Ocurage' },
      { q: "Alone, I honed myself until the very air bent to my will; I hear with what others merely beat, and on a word I carve the wind.", a: 'Mangmight' },
    ],
    Nightmare: [
      { q: "What is freely given I never return; I keep the gift as gospel. A titan condemned to bear a burden hides his name in mine — find the one who shoulders the sky, then set him on a stone instead. Last and most patient of three.", a: 'Terratlus' },
      { q: "I swore to the firmament and broke the oath; now dust of stars crowns a warden of puzzles who weighs the worthy. My name is a fastening and a seal both — turn it, and the calm becomes a sentence.", a: 'Sedilock' },
      { q: "Two minds will one day fold into a single face that mirrors yours — but I am the before. Not the glass, not what it throws back: the raw, ungoverned hue still wet on the wheel. A potter's word hides in my making.", a: 'Karmold' },
      { q: "A dying star plays three acts; I am neither the plunge nor the reborn spark, but the bloated middle that hoards every ember and is left, for all its gluttony, cold to the touch.", a: 'Gigantrum' },
      { q: "Gathered by the bushel across the region, my devotion is earned only by the patient. I draw my loyalty into thread and knot it to the one who waited. Name the spinner, never the spun.", a: 'Grantula' },
      { q: "Three trials of a hero, three throats of a hound, a fire only the unstained may witness — I am all of them at once. The number three is written through me; count it and you are halfway to my name.", a: 'Cerbament' },
      { q: "When a roadside grief turns its wish from self-harm to shelter, one stray's sorrow may split into two specters. I am the kinder — not the dreaded end, but the household gathered after; the one who was sought and so was discovered.", a: 'Foundsum' },
      { q: "A prism set upon a mirror of carbon; I am neither the beam nor the glint, but the sealed hall where both go to revel once the shell snaps shut and the beat begins. Name the ballroom, not the light that fills it.", a: 'Armadisco' },
      { q: "I am the river-stone sat in thought before any edge is bared — not dawn's marksman, not dusk's silence, not the curse-hearted one who walks unlit lanes. I am the single still will from which a saint, a seer, and a sinner each later part.", a: 'Sedimonk' },
      { q: "I am the hush stitched into the seam of day and night, keeping company with both. Seldom seen, I take the head of the pack only when the two lights meet — yet crown me no grandmaster; I am merely the hound that walks ahead of the wolf.", a: 'Twilycan' },
    ],
  };

  const TIERS = [
    { name: 'Easy', color: '#5fd13c', hints: true },
    { name: 'Medium', color: '#33d6ff', hints: true },
    { name: 'Hard', color: '#ffb347', hints: false },
    { name: 'Expert', color: '#ff7f4f', hints: false },
    { name: 'Nightmare', color: '#ff1f5a', hints: false },
  ];

  const TOTAL = Object.values(RIDDLES).reduce((n, arr) => n + arr.length, 0); // 50
  const LS_KEY = 'voiddex_riddles_solved';
  // One-time patch (difficulty rework of Expert + Nightmare): the riddles in those
  // two tiers changed, so previously-earned solves there are no longer valid. We
  // clear ONLY Expert#* and Nightmare#* once per device, keeping Easy/Medium/Hard
  // progress intact. A flag ensures this happens a single time, not on every load.
  const PATCH_FLAG = 'voiddex_riddles_patch_en1';
  function loadSolved() {
    try {
      let arr = JSON.parse(localStorage.getItem(LS_KEY));
      if (!Array.isArray(arr)) arr = [];
      if (!localStorage.getItem(PATCH_FLAG)) {
        arr = arr.filter(k => !/^Expert#/.test(k) && !/^Nightmare#/.test(k));
        localStorage.setItem(LS_KEY, JSON.stringify(arr));
        localStorage.setItem(PATCH_FLAG, '1');
      }
      return new Set(arr);
    } catch (e) { return new Set(); }
  }
  function saveSolved(set) { try { localStorage.setItem(LS_KEY, JSON.stringify([...set])); } catch (e) {} }

  // ---- Nightmare lockout: 10 total wrong Nightmare guesses = 24h lockout ----
  const NM_FAILS_KEY = 'voiddex_riddles_nm_fails';
  const NM_LOCK_KEY = 'voiddex_riddles_nm_lockuntil';
  const NM_FAIL_LIMIT = 10;
  const NM_LOCK_MS = 24 * 60 * 60 * 1000;
  function nmFails() { try { return parseInt(localStorage.getItem(NM_FAILS_KEY) || '0', 10) || 0; } catch (e) { return 0; } }
  function nmLockUntil() { try { return parseInt(localStorage.getItem(NM_LOCK_KEY) || '0', 10) || 0; } catch (e) { return 0; } }
  function nmLocked() { return Date.now() < nmLockUntil(); }
  function nmAddFail() {
    let f = nmFails() + 1;
    try {
      if (f >= NM_FAIL_LIMIT) {
        localStorage.setItem(NM_LOCK_KEY, String(Date.now() + NM_LOCK_MS));
        localStorage.setItem(NM_FAILS_KEY, '0'); // reset counter when lock triggers
        return { locked: true, fails: 0 };
      }
      localStorage.setItem(NM_FAILS_KEY, String(f));
    } catch (e) {}
    return { locked: false, fails: f };
  }
  function fmtRemaining(ms) {
    const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
    if (h > 0) return h + 'h ' + m + 'm';
    return m + 'm';
  }

  window.VIEWS.Riddles = function Riddles() {
    const [tier, setTier] = React.useState(null);     // tier name
    const [idx, setIdx] = React.useState(0);          // which riddle in the tier
    const [guess, setGuess] = React.useState('');
    const [status, setStatus] = React.useState(null); // null | 'right' | 'wrong'
    const [showHint, setShowHint] = React.useState(false);
    const [wrongCount, setWrongCount] = React.useState(0);
    const [solved, setSolved] = React.useState(loadSolved); // Set of "Tier#idx" keys
    const [reward, setReward] = React.useState(false);       // show the 50/50 popup
    const [lockUntil, setLockUntil] = React.useState(nmLockUntil); // Nightmare lockout timestamp
    const [now, setNow] = React.useState(Date.now());
    const [justLocked, setJustLocked] = React.useState(false);

    // tick every 30s so the lockout countdown updates while the page is open
    React.useEffect(() => {
      const id = setInterval(() => setNow(Date.now()), 30000);
      return () => clearInterval(id);
    }, []);

    const tierObj = TIERS.find(t => t.name === tier);
    const pool = tier ? RIDDLES[tier] : [];
    const riddle = pool[idx];
    const key = tier ? tier + '#' + idx : null;
    const nightmareLocked = lockUntil > now;

    const solvedCount = solved.size;
    const tierSolved = (tn) => RIDDLES[tn].reduce((n, _, i) => n + (solved.has(tn + '#' + i) ? 1 : 0), 0);

    const markSolved = (k) => {
      if (solved.has(k)) return;
      const next = new Set(solved); next.add(k);
      setSolved(next); saveSolved(next);
      if (next.size >= TOTAL) setReward(true);
    };

    const reset = () => { setGuess(''); setStatus(null); setShowHint(false); setWrongCount(0); };
    const openTier = (name) => {
      if (name === 'Nightmare' && nmLocked()) { setLockUntil(nmLockUntil()); setTier('Nightmare'); setIdx(0); reset(); return; }
      setTier(name); setIdx(0); reset();
    };
    const nextRiddle = () => { setIdx(i => (i + 1) % pool.length); reset(); };

    const submit = () => {
      if (!guess.trim()) return;
      if (tier === 'Nightmare' && nightmareLocked) return; // safety: no guessing while locked
      if (norm(guess) === norm(riddle.a)) { setStatus('right'); markSolved(key); }
      else {
        setStatus('wrong'); setWrongCount(c => c + 1);
        if (tier === 'Nightmare') {
          const r = nmAddFail();
          if (r.locked) { setLockUntil(nmLockUntil()); setJustLocked(true); }
        }
      }
    };

    // ---- tier select screen ----
    if (!tier) {
      return (
        <div>
          {reward && <RewardPopup onClose={() => setReward(false)} />}
          <PageHead kicker="THE RIDDLER'S LAIR" title="The Riddler's Lair" sub="Sedilock tests trainers with riddles — now so does the VOIDDEX. Every answer is a Pokémon of Void, hidden in its lore, evolutions, and moves. Choose your trial." />

          {/* overall progress */}
          <div style={{ maxWidth: 820, margin: '0 auto 18px', padding: '14px 18px', borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: solvedCount >= TOTAL ? '#ffd54a' : '#8a83a8' }}>RIDDLES SOLVED</span>
            <div style={{ flex: '1 1 160px', height: 10, borderRadius: 6, background: '#181334', overflow: 'hidden', minWidth: 120 }}>
              <div style={{ width: (solvedCount / TOTAL * 100) + '%', height: '100%', background: solvedCount >= TOTAL ? 'linear-gradient(90deg,#ffd54a,#ff8f00)' : 'linear-gradient(90deg,#6a3df0,#b08fff)' }} />
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: solvedCount >= TOTAL ? '#ffd54a' : '#cdbfff' }}>{solvedCount} / {TOTAL}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, maxWidth: 820, margin: '10px auto 0' }}>
            {TIERS.map(t => {
              const done = tierSolved(t.name), all = RIDDLES[t.name].length, complete = done >= all;
              return (
                <button key={t.name} onClick={() => openTier(t.name)} style={{ cursor: 'pointer', padding: '22px 16px', borderRadius: 16, background: `radial-gradient(ellipse at 50% 0%, ${t.color}22, #0c0a1c 80%)`, border: `1px solid ${complete ? t.color : t.color + '66'}`, boxShadow: complete ? `0 0 18px ${t.color}44` : 'none', color: '#fff', textAlign: 'center', position: 'relative' }}>
                  {complete && <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 14, color: t.color }}>✓</span>}
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: t.color, textShadow: `0 0 18px ${t.color}66` }}>{t.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: complete ? t.color : '#cdbfff', marginTop: 6 }}>{done} / {all} solved</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#6a6388', marginTop: 4 }}>{t.hints ? 'hints available' : t.name === 'Nightmare' ? 'no mercy' : 'no hints'}</div>
                </button>
              );
            })}
          </div>
          <p style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#5f5980', marginTop: 28 }}>
            Every answer is a Pokémon of Void. Progress saves on this device. Nightmare shows no mercy.
          </p>
        </div>
      );
    }

    // ---- Nightmare lockout screen ----
    if (tier === 'Nightmare' && nightmareLocked) {
      const remain = lockUntil - now;
      return (
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'flex-start' }}>
            <button onClick={() => setTier(null)} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#9a93bb', borderRadius: 8, padding: '7px 13px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>← Tiers</button>
            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 26, color: '#ff1f5a' }}>Nightmare</span>
          </div>
          <div style={{ padding: '40px 28px', borderRadius: 18, background: 'radial-gradient(ellipse at 50% 0%, #2a000d, #0a0816 75%)', border: '1px solid #ff1f5a66' }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🔒</div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 2, color: '#ff1f5a', marginBottom: 12 }}>THE LAIR HAS SEALED ITSELF</div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#e9c4cf', lineHeight: 1.6, margin: '0 0 18px' }}>
              You've failed the Nightmare trials too many times. Sedilock has barred the way. The path reopens in:
            </p>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 30, fontWeight: 700, color: '#ff6f8f' }}>{fmtRemaining(remain)}</div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#7a6f88', marginTop: 16 }}>
              The other tiers remain open while you wait.
            </p>
          </div>
        </div>
      );
    }

    // ---- riddle screen ----
    const answerMon = status === 'right' ? findMon(riddle.a) : null;
    const alreadySolved = solved.has(key);
    const nmRemaining = tier === 'Nightmare' ? (NM_FAIL_LIMIT - nmFails()) : null;
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {reward && <RewardPopup onClose={() => setReward(false)} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
          <button onClick={() => setTier(null)} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#9a93bb', borderRadius: 8, padding: '7px 13px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>← Tiers</button>
          <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 26, color: tierObj.color, textShadow: `0 0 16px ${tierObj.color}66` }}>{tier}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>Riddle {idx + 1} / {pool.length}</span>
          {alreadySolved && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5fd13c', border: '1px solid #2f8f4a', borderRadius: 6, padding: '3px 8px' }}>✓ SOLVED</span>}
          {tier === 'Nightmare' && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: nmRemaining <= 3 ? '#ff5f7e' : '#7a6f88', border: '1px solid #3a2545', borderRadius: 6, padding: '3px 8px' }}>{nmRemaining} GUESS{nmRemaining === 1 ? '' : 'ES'} LEFT</span>}
        </div>

        {/* the riddle */}
        <div style={{ padding: '26px 24px', borderRadius: 16, background: `radial-gradient(ellipse at 30% 0%, ${tierObj.color}18, #0b0918 78%)`, border: `1px solid ${tierObj.color}55`, marginBottom: 18 }}>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: tierObj.color, marginBottom: 12 }}>RIDDLE</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, lineHeight: 1.6, color: '#f0ecff', fontStyle: 'italic' }}>"{riddle.q}"</div>
        </div>

        {/* answer area */}
        {status === 'right' ? (
          <div style={{ padding: 20, borderRadius: 14, background: '#0c1c12', border: '1px solid #2f8f4a', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: '#5fd13c', marginBottom: 12 }}>✓ CORRECT</div>
            {answerMon && (
              <button onClick={() => go('#/pokemon/' + answerMon.dex)} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                <SpriteSlot dex={answerMon.dex} name={answerMon.name} size={96} accent={'#5fd13c'} />
              </button>
            )}
            <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 28, color: '#fff', marginTop: 4 }}>{riddle.a}</div>
            <button onClick={nextRiddle} style={{ cursor: 'pointer', marginTop: 16, background: 'linear-gradient(135deg, #2f8f4a, #1f6a34)', border: '1px solid #5fd13c', color: '#fff', borderRadius: 10, padding: '11px 22px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Next Riddle →</button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <input value={guess} onChange={e => { setGuess(e.target.value); setStatus(null); }}
                onKeyDown={e => { if (e.key === 'Enter') submit(); }}
                placeholder="Name the Pokémon…" spellCheck={false}
                style={{ flex: '1 1 220px', padding: '13px 16px', borderRadius: 10, background: '#100c24', border: `1px solid ${status === 'wrong' ? '#ff5f7e' : '#2a2545'}`, color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, outline: 'none' }} />
              <button onClick={submit} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 10, padding: '13px 24px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700 }}>Answer</button>
            </div>

            {status === 'wrong' && (
              <div style={{ marginTop: 12, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#ff8fa6' }}>
                Not quite. Try again.{tierObj.hints && riddle.hint && wrongCount < 3 ? ' (A hint unlocks after 3 wrong guesses.)' : ''}
              </div>
            )}

            {/* hint (Easy/Medium only) — unlocks after 3 wrong answers */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              {tierObj.hints && riddle.hint && wrongCount >= 3 && !showHint && (
                <button onClick={() => setShowHint(true)} style={{ cursor: 'pointer', background: '#1a1533', border: '1px solid #3a2f6e', color: '#cdbfff', borderRadius: 8, padding: '9px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>💡 Hint</button>
              )}
              <button onClick={nextRiddle} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#9a93bb', borderRadius: 8, padding: '9px 16px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Skip →</button>
            </div>

            {showHint && riddle.hint && (
              <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 10, background: '#15112a', border: '1px solid #3a2f6e' }}>
                <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#b08fff', marginRight: 8 }}>HINT</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#cdc6e6' }}>{riddle.hint}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  function RewardPopup({ onClose }) {
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(5,4,12,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, textAlign: 'center', borderRadius: 20, padding: '34px 28px', background: 'radial-gradient(ellipse at 50% 0%, #2a1d00, #0a0818 75%)', border: '1px solid #ffd54a', boxShadow: '0 0 50px #ffb30055' }}>
          <div style={{ fontSize: 46, marginBottom: 6 }}>🏆</div>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 2, color: '#ffd54a', marginBottom: 10 }}>ALL 50 RIDDLES SOLVED</div>
          <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 30, color: '#fff', lineHeight: 1.1, marginBottom: 14, textShadow: '0 0 24px #ffb30066' }}>Master of the Void Riddles</div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#e9e0c4', lineHeight: 1.6, margin: '0 0 22px' }}>
            You've cracked every riddle in the Lair — Easy through Nightmare. Sedilock itself would be impressed. That's no small feat.
          </p>
          <button onClick={onClose} style={{ cursor: 'pointer', background: 'linear-gradient(135deg,#ffb300,#ff7a00)', border: '1px solid #ffd54a', color: '#2a1800', borderRadius: 12, padding: '12px 28px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700 }}>Close</button>
        </div>
      </div>
    );
  }
})();
