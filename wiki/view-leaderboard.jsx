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
  const SUPABASE_URL = 'https://mzrwajvztpcncthstzcq.supabase.co';
  const SUPABASE_ANON_KEY = 'PASTE_YOUR_PUBLISHABLE_KEY_HERE'; // sb_publishable_... — keep on ONE line
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

  // build a top-10 board from raw rows for one difficulty.
  // groups by player_name (case-insensitive), score = # of distinct team_keys.
  function buildBoard(rows, difficulty) {
    const byPlayer = {};
    rows.filter(r => r.difficulty === difficulty).forEach(r => {
      const key = (r.player_name || 'Anonymous').trim() || 'Anonymous';
      const k = key.toLowerCase();
      if (!byPlayer[k]) byPlayer[k] = { name: key, teams: {}, first: r.created_at };
      // de-dupe by team_key (DB also enforces this, but be safe on display)
      byPlayer[k].teams[r.team_key] = r.team;
    });
    return Object.values(byPlayer)
      .map(p => ({ name: p.name, score: Object.keys(p.teams).length, teams: Object.values(p.teams), first: p.first }))
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
          Points = different teams you've won with. Tap a name to see their teams.
        </div>
        {board.length === 0 && (
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#9a93bb', padding: '18px 0', textAlign: 'center' }}>
            No conquerors yet. Be the first to beat it!
          </div>
        )}
        {board.map((p, i) => (
          <div key={p.name} style={{ borderBottom: i < board.length - 1 ? '1px solid #1d1838' : 'none' }}>
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
          sub="Beat the Pokedex Fillers boss in the Battle Sim to earn your place. Your score is the number of different teams you've conquered each difficulty with — find more winning teams to climb." />

        {!CONFIGURED && (
          <div style={{ maxWidth: 560, margin: '20px auto', textAlign: 'center', background: '#15112a', border: '1px solid #2a2545', borderRadius: 12, padding: 18, fontFamily: "'Space Grotesk', sans-serif", color: '#cdbfff', fontSize: 13.5, lineHeight: 1.5 }}>
            The leaderboard isn't connected yet. Paste your Supabase key into <code>view-leaderboard.jsx</code> to switch it on.
          </div>
        )}

        {err && (
          <div style={{ maxWidth: 560, margin: '12px auto', textAlign: 'center', color: '#ff8fa6', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>{err}</div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 16, alignItems: 'flex-start' }}>
          <Board title="Normal" accent="#b9c4e6" rows={rows} difficulty="normal" />
          <Board title="Hard ☠" accent="#ffd54a" rows={rows} difficulty="hard" />
        </div>

        {rows === null && (
          <div style={{ textAlign: 'center', color: '#6a6388', fontFamily: "'Space Mono', monospace", fontSize: 13, marginTop: 18 }}>Loading…</div>
        )}
      </div>
    );
  };
})();
