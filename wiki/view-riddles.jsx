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
      { q: "Devotion kneels where the heavens fall silent; my plating drinks the dark between prayers, and the crown I wear burns a colour mourning wears. I am the third devotion, neither monk nor mancer.", a: 'Sedivout' },
      { q: "Among kin hewn from breathing stone, I am the one who turns the knife inward — a heart that curses its own beat, choosing the alley over the altar.", a: 'Sedirogue' },
      { q: "The first light does not comfort me; it whets me. I drink the morning and loose a shot that, the legends insist, has never once needed a second.", a: 'Sediranger' },
      { q: "A wish meant to wound its own maker, made flesh; yet the hand raised to strike now folds the eyes of the fallen shut. I am the bleaker of two things a stray's sorrow can become.", a: 'Fellsum' },
      { q: "The deck was cut, the hand was dealt, and from the deepest water I rose as the reading made true — vast, unseen, and certain. Read my suit and name me.", a: 'Garcana' },
      { q: "I am winter that feeds on warmth and never warms; the larger I swell the colder I keep, a crimson glow that ends as a shiver around itself.", a: 'Gigantrum' },
      { q: "I broke the surface and asked the sky a question with no answer — bird, or vessel, or neither — then leapt the seam between two worlds, laughing.", a: 'Brooskip' },
      { q: "Storm-born thunder set in ice; the tempest my gentler self only dreamt of woke fully in me when the snow finally came down.", a: 'Capibarron' },
      { q: "When my wings unfold, the field forgets the sun; from heights that swallow sound I read the small and the slow, and end the watcher's bloodline.", a: 'Ocurage' },
      { q: "Discipline sharpened in solitude until the air itself obeyed me; I listen with what others only flap, and I cut the wind on command.", a: 'Mangmight' },
    ],
    Nightmare: [
      { q: "What is freely given, I never surrender; I guard the gift as gospel. Patient and last of a threefold ascent that cradles its own boulder, I am the atlas that holds, not the world, but the stone.", a: 'Terratlus' },
      { q: "I once swore fealty to the heavens and broke it; now stardust crowns a keeper of puzzles who weighs the worthy. Provoke the lock and the calm becomes a verdict.", a: 'Sedilock' },
      { q: "Before two minds folded into one that wears your face, there was only the ungoverned hue. Do not name the mirror, nor its reflection — name the raw and rainbowed clay it was thrown from.", a: 'Karmold' },
      { q: "A star dies in three acts; I am neither the falling nor the spark reborn, but the swollen middle that hoards every ember and is left, for all its hunger, cold.", a: 'Gigantrum' },
      { q: "Harvested by the bushel, devotion earned only by those who wait — I spin my loyalty into thread and bind it to the patient hand. Name the one who weaves, never the weave.", a: 'Grantula' },
      { q: "Thrice over I burn: a hero's three trials, a beast of three natures, a fire only the unstained may behold. Count to three and you have already half-named me.", a: 'Cerbament' },
      { q: "When a lonely road's wish turns from harming itself to shielding others, two ghosts may be born of one stray's grief; I am the gentler twin, the family found rather than the fate feared.", a: 'Foundsum' },
      { q: "Prism laid on a mirror of carbon; I am not the light nor the spark, but the hall where both go to dance once the casing seals and the rhythm starts. Name the ballroom, not the beam.", a: 'Armadisco' },
      { q: "I am the river-stone that sits in thought before any blade is drawn — neither dawn's marksman, dusk's silence, nor the curse-hearted alley-walker, but the single will from which a saint, a seer, and a sinner each diverge.", a: 'Sedimonk' },
      { q: "I am the hush at the seam of day and night, walking with both at once. Rare is my sighting, and I head the pack only when sun and moon align — yet I am no grandmaster, merely the hound that comes before the wolf.", a: 'Twilycan' },
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
  function loadSolved() {
    try { const a = JSON.parse(localStorage.getItem(LS_KEY)); return new Set(Array.isArray(a) ? a : []); }
    catch (e) { return new Set(); }
  }
  function saveSolved(set) { try { localStorage.setItem(LS_KEY, JSON.stringify([...set])); } catch (e) {} }

  // Verification passphrase: first letter of every answer, in tier order, grouped.
  // Deterministic and derived from the real answers — a player can only produce it
  // by having actually solved all 50. Computed at runtime so it stays correct if
  // riddles are ever edited, and never sits in the source as a plain string.
  function rewardPhrase() {
    const order = ['Easy', 'Medium', 'Hard', 'Expert', 'Nightmare'];
    const groups = order.map(t => RIDDLES[t].map(r => r.a.toUpperCase().replace(/[^A-Z0-9]/g, '')[0]).join(''));
    return 'VOID-' + groups.join('-');
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

    const tierObj = TIERS.find(t => t.name === tier);
    const pool = tier ? RIDDLES[tier] : [];
    const riddle = pool[idx];
    const key = tier ? tier + '#' + idx : null;

    const solvedCount = solved.size;
    const tierSolved = (tn) => RIDDLES[tn].reduce((n, _, i) => n + (solved.has(tn + '#' + i) ? 1 : 0), 0);

    const markSolved = (k) => {
      if (solved.has(k)) return;
      const next = new Set(solved); next.add(k);
      setSolved(next); saveSolved(next);
      if (next.size >= TOTAL) setReward(true);
    };

    const reset = () => { setGuess(''); setStatus(null); setShowHint(false); setWrongCount(0); };
    const openTier = (name) => { setTier(name); setIdx(0); reset(); };
    const nextRiddle = () => { setIdx(i => (i + 1) % pool.length); reset(); };

    const submit = () => {
      if (!guess.trim()) return;
      if (norm(guess) === norm(riddle.a)) { setStatus('right'); markSolved(key); }
      else { setStatus('wrong'); setWrongCount(c => c + 1); }
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

    // ---- riddle screen ----
    const answerMon = status === 'right' ? findMon(riddle.a) : null;
    const alreadySolved = solved.has(key);
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {reward && <RewardPopup onClose={() => setReward(false)} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
          <button onClick={() => setTier(null)} style={{ cursor: 'pointer', background: '#15112a', border: '1px solid #2a2545', color: '#9a93bb', borderRadius: 8, padding: '7px 13px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>← Tiers</button>
          <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 26, color: tierObj.color, textShadow: `0 0 16px ${tierObj.color}66` }}>{tier}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>Riddle {idx + 1} / {pool.length}</span>
          {alreadySolved && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5fd13c', border: '1px solid #2f8f4a', borderRadius: 6, padding: '3px 8px' }}>✓ SOLVED</span>}
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
    const [copied, setCopied] = React.useState(false);
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(5,4,12,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, textAlign: 'center', borderRadius: 20, padding: '34px 28px', background: 'radial-gradient(ellipse at 50% 0%, #2a1d00, #0a0818 75%)', border: '1px solid #ffd54a', boxShadow: '0 0 50px #ffb30055' }}>
          <div style={{ fontSize: 46, marginBottom: 6 }}>🏆</div>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 2, color: '#ffd54a', marginBottom: 10 }}>ALL 50 RIDDLES SOLVED</div>
          <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 30, color: '#fff', lineHeight: 1.1, marginBottom: 14, textShadow: '0 0 24px #ffb30066' }}>Master of the Void Riddles</div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#e9e0c4', lineHeight: 1.6, margin: '0 0 18px' }}>
            You've cracked every riddle in the chamber — Easy through Nightmare. That's no small feat.
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: '#fff', lineHeight: 1.6, margin: '0 0 18px', fontWeight: 600 }}>
            Contact <span style={{ color: '#ffd54a' }}>Vaereth</span> to claim your reward — send the verification phrase below so I know you truly cracked all 50.
          </p>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 1, color: '#8a83a8', marginBottom: 6 }}>VERIFICATION PHRASE</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#ffd54a', background: '#0a0818', border: '1px solid #ffd54a55', borderRadius: 10, padding: '12px 14px', wordBreak: 'break-all', marginBottom: 12 }}>{rewardPhrase()}</div>
          <button onClick={() => { try { navigator.clipboard.writeText(rewardPhrase()); setCopied(true); } catch (e) {} }} style={{ cursor: 'pointer', background: copied ? '#0f3320' : '#1a1533', border: '1px solid #ffd54a55', color: copied ? '#7ad17a' : '#ffd54a', borderRadius: 10, padding: '9px 18px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 18 }}>{copied ? '✓ Copied' : 'Copy Phrase'}</button>
          <div />
          <button onClick={onClose} style={{ cursor: 'pointer', background: 'linear-gradient(135deg,#ffb300,#ff7a00)', border: '1px solid #ffd54a', color: '#2a1800', borderRadius: 12, padding: '12px 28px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700 }}>Close</button>
        </div>
      </div>
    );
  }
})();
