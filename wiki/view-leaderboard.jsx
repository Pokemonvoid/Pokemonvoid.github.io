/* Pokémon Void — Boss Conquerors Leaderboard. window.VIEWS.Leaderboard
   Shared, everyone-sees-it leaderboard backed by Supabase (free tier), logged
   live exactly like the favourite-vote board.
   - Two boards: Normal and Hard (beating "Pokedex Fillers").
   - Score = number of UNIQUE teams you've beaten that difficulty with. Beating it
     again with the same 6 species does not add a point (enforced by a unique index
     on (voter_id, difficulty, team_key) in the DB; duplicate inserts fail quietly).
   - Top 10 per board; tap an entry to see the teams that person used.
   - Wins are submitted from the battle sim at the moment of a fresh-team win,
     using the name the player typed on their victory certificate. */
(function () {
  const { PageHead, SpriteSlot, go } = window.VUI;
  const VDEX = window.VDEX;

  // ====================================================================
  // CONFIG — same PUBLIC Supabase project as the vote board. Paste your
  // publishable key here on deploy (it's the placeholder again locally).
  const SUPABASE_URL = 'https://fzwxxvmzjkepfibjjyza.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_mK-sym5D-ue5JoRGODx4iw_FM3X3EDK'; // sb_publishable_... — keep on ONE line
  // ====================================================================

  const CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
  const REST = SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/boss_wins';
  const HEADERS = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  };

  // ---- data ----
  async function fetchWins() {
    // pull every win row; the table is small (one row per person/difficulty/team).
    const url = REST + '?select=player_name,difficulty,team_key,team,voter_id,created_at&order=created_at.asc';
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error('read failed: ' + res.status);
    return res.json();
  }

  // medal/rank glyph
  function rankGlyph(i) { return i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : String(i + 1); }

  // how many Pokémon two team-keys share (keys are sorted dex lists joined by '-')
  function sharedCount(keyA, keyB) {
    const a = String(keyA).split('-'); const b = new Set(String(keyB).split('-'));
    let n = 0; a.forEach(d => { if (b.has(d)) n++; }); return n;
  }

  // build a top-10 board from raw rows for one difficulty.
  // groups by player_name (case-insensitive). A team only earns a point if it
  // differs by at least 5 Pokémon (shares AT MOST 1) from every team already
  // counted for that player — this stops one-slot-swap teams from each scoring.
  function buildBoard(rows, difficulty) {
    const byPlayer = {};
    rows.filter(r => r.difficulty === difficulty).forEach(r => {
      const named = (r.player_name || '').trim();
      // a named player groups by name (case-insensitive, so their wins combine).
      // a blank name groups by voter_id instead, so two different unnamed people
      // each get their own "Anonymous" line rather than merging into one entry.
      const k = named ? ('name:' + named.toLowerCase()) : ('anon:' + (r.voter_id || Math.random()));
      const display = named || 'Anonymous';
      if (!byPlayer[k]) byPlayer[k] = { name: display, wins: [], first: r.created_at };
      byPlayer[k].wins.push({ team_key: r.team_key, team: r.team, at: r.created_at });
    });
    return Object.values(byPlayer)
      .map(p => {
        // accept teams oldest-first; a new team must share <=1 mon with every
        // already-counted team to earn a point (differ by 5 of 6).
        const counted = [];
        p.wins.sort((a, b) => new Date(a.at) - new Date(b.at)).forEach(w => {
          if (counted.every(c => sharedCount(w.team_key, c.team_key) <= 1)) counted.push(w);
        });
        return { name: p.name, score: counted.length, teams: counted.map(c => c.team), first: p.first };
      })
      .sort((a, b) => (b.score - a.score) || (new Date(a.first) - new Date(b.first)))
      .slice(0, 10);
  }

  function TeamRow({ team }) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 0' }}>
        {(team || []).map((m, i) => (
          <div key={i} title={m.name} style={{ width: 46, height: 46, borderRadius: 8, background: '#0c091c', border: '1px solid #221c40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SpriteSlot dex={m.dex} name={m.name} size={36} accent="#8a5cff" />
          </div>
        ))}
      </div>
    );
  }

  function Board({ title, accent, rows, difficulty }) {
    const [openIdx, setOpenIdx] = React.useState(null);
    const board = React.useMemo(() => buildBoard(rows || [], difficulty), [rows, difficulty]);
    return (
      <div style={{ flex: '1 1 360px', minWidth: 0, background: 'linear-gradient(180deg,#14102b,#0d0a1e)', border: `1px solid ${accent}44`, borderRadius: 16, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: accent }}>{title}</span>
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#8a83a8', marginBottom: 14 }}>
          Points = genuinely different teams you've won with (each must share at most 1 Pokémon with your others). Tap a name to see their teams.
        </div>
        {board.length === 0 && (
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#9a93bb', padding: '18px 0', textAlign: 'center' }}>
            No conquerors yet. Be the first to beat it!
          </div>
        )}
        {board.map((p, i) => (
          <div key={i} style={{ borderBottom: i < board.length - 1 ? '1px solid #1d1838' : 'none' }}>
            <div onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', cursor: 'pointer' }}>
              <div style={{ width: 30, textAlign: 'center', fontFamily: "'Pixelify Sans', sans-serif", fontSize: i < 3 ? 20 : 15, color: i < 3 ? accent : '#6a6388' }}>{rankGlyph(i)}</div>
              <div style={{ flex: 1, minWidth: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#fff', fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", color: accent, fontSize: 15, fontWeight: 700 }}>{p.score}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#6a6388', width: 44, textAlign: 'right' }}>{p.score === 1 ? 'win' : 'wins'}</div>
              <div style={{ color: '#6a6388', fontSize: 12, width: 14, textAlign: 'center' }}>{openIdx === i ? '▾' : '▸'}</div>
            </div>
            {openIdx === i && (
              <div style={{ padding: '2px 0 12px 42px' }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 1, color: '#6a6388', marginBottom: 4 }}>WINNING TEAMS</div>
                {p.teams.map((t, ti) => <TeamRow key={ti} team={t} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  window.VIEWS.Leaderboard = function Leaderboard() {
    const [rows, setRows] = React.useState(null);
    const [err, setErr] = React.useState('');

    const load = React.useCallback(() => {
      if (!CONFIGURED) { setRows([]); return; }
      setErr('');
      fetchWins().then(setRows).catch(() => { setErr('Could not load the leaderboard right now. Try again shortly.'); setRows([]); });
    }, []);

    React.useEffect(() => { load(); }, [load]);
    React.useEffect(() => {
      if (!CONFIGURED) return;
      const t = setInterval(load, 30000);
      return () => clearInterval(t);
    }, [load]);

    return (
      <div>
        <PageHead kicker="HALL OF CONQUERORS" title="Pokedex Fillers Leaderboard"
          sub="Beat the Pokedex Fillers boss in the Battle Sim to earn your place. Three tiers: Normal, Hard, and the all-but-impossible Nightmare. Your score is the number of genuinely different teams you've conquered each tier with." />

        {!CONFIGURED && (
          <div style={{ maxWidth: 560, margin: '20px auto', textAlign: 'center', background: '#15112a', border: '1px solid #2a2545', borderRadius: 12, padding: 18, fontFamily: "'Space Grotesk', sans-serif", color: '#cdbfff', fontSize: 13.5, lineHeight: 1.5 }}>
            The leaderboard isn't connected yet. Paste your Supabase key into <code>view-leaderboard.jsx</code> to switch it on.
          </div>
        )}

        {err && (
          <div style={{ maxWidth: 560, margin: '12px auto', textAlign: 'center', color: '#ff8fa6', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>{err}</div>
        )}

        {/* ---- Olympic podium: the reigning #1 of each tier ---- */}
        <Podium rows={rows} />

        {/* ---- the three full boards, stacked in a slight pyramid: Nightmare
                highest, then Hard, then Normal at the base ---- */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 26 }}>
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Board title="💀 Nightmare" accent="#ff3b3b" rows={rows} difficulty="nightmare" />
          </div>
          <div style={{ width: '100%', maxWidth: 620 }}>
            <Board title="☠ Hard" accent="#ffd54a" rows={rows} difficulty="hard" />
          </div>
          <div style={{ width: '100%', maxWidth: 680 }}>
            <Board title="Normal" accent="#b9c4e6" rows={rows} difficulty="normal" />
          </div>
        </div>

        {rows === null && (
          <div style={{ textAlign: 'center', color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 13, marginTop: 18 }}>Loading…</div>
        )}
      </div>
    );
  };

  // The reigning champion of each tier, arranged like an Olympic podium:
  // Nightmare in the center on the tallest block (gold), Hard to the left
  // (silver), Normal to the right (bronze).
  function Podium({ rows }) {
    const champ = (difficulty) => (buildBoard(rows || [], difficulty)[0] || null);
    const nm = champ('nightmare'), hd = champ('hard'), no = champ('normal');
    const Block = ({ who, label, accent, height, medal, glow }) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 0', minWidth: 0 }}>
        <div style={{ fontSize: 26, marginBottom: 4 }}>{medal}</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
          {who ? who.name : '—'}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: accent, marginBottom: 6 }}>
          {who ? `${who.score} ${who.score === 1 ? 'win' : 'wins'}` : 'unclaimed'}
        </div>
        <div style={{ width: '100%', height, borderRadius: '8px 8px 0 0', background: `linear-gradient(180deg, ${accent}cc, ${accent}44)`, border: `1px solid ${accent}`, borderBottom: 'none', boxShadow: `0 0 22px ${glow}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
          <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 13, color: '#0a0816', letterSpacing: 1 }}>{label}</span>
        </div>
      </div>
    );
    return (
      <div style={{ maxWidth: 600, margin: '8px auto 0' }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 2, color: '#6a6388', textAlign: 'center', marginBottom: 12 }}>REIGNING CHAMPIONS</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, borderBottom: '2px solid #2a2545', paddingBottom: 0 }}>
          <Block who={hd} label="HARD" accent="#ffd54a" height={84} medal="🥈" glow="#ffd54a33" />
          <Block who={nm} label="NIGHTMARE" accent="#ff3b3b" height={120} medal="🥇" glow="#ff2a2a44" />
          <Block who={no} label="NORMAL" accent="#b9c4e6" height={56} medal="🥉" glow="#b9c4e633" />
        </div>
      </div>
    );
  }
})();
