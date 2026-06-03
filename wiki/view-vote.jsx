/* Pokémon Void — Favourite Voidmon of the Week. window.VIEWS.Vote
   Shared, everyone-sees-it leaderboard backed by Supabase (free tier).
   - One vote per browser per week.
   - Week runs Monday 00:00 America/New_York (EST/EDT) to the next Monday.
   - "Reset" is automatic: the leaderboard only tallies votes from the current
     week, so last week's votes simply fall out of the window. */
(function () {
  const { PageHead, SpriteSlot, go } = window.VUI;
  const VDEX = window.VDEX;

  // ====================================================================
  // CONFIG — paste your two PUBLIC Supabase values here (see setup guide).
  // The anon key is designed to be public; row-level security on the table
  // is what keeps votes safe. Leaving these blank shows a friendly notice.
  const SUPABASE_URL = 'https://mzrwajvztpcncthstzcq.supabase.co';
  const SUPABASE_ANON_KEY = 'PASTE_YOUR_PUBLISHABLE_KEY_HERE'; // sb_publishable_... — keep on ONE line
  // ====================================================================

  const CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
  const REST = SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/votes';
  const HEADERS = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  };

  // ---- voter id (per browser) ----
  function voterId() {
    try {
      let id = localStorage.getItem('voidmon_voter_id');
      if (!id) { id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('voidmon_voter_id', id); }
      return id;
    } catch (e) { return 'v_anon'; }
  }

  // ---- week boundary: Monday 00:00 America/New_York ----
  // We compute "now" in New York time, find the most recent Monday 00:00 there,
  // and convert that back to a UTC ISO string for the DB query. Handles EST/EDT
  // automatically via Intl (offset differs by season).
  function nyParts(date) {
    // returns {y,m,d,h,min,s, weekday} in America/New_York
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York', hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short',
    });
    const parts = {};
    fmt.formatToParts(date).forEach(p => { parts[p.type] = p.value; });
    const wkMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      y: +parts.year, m: +parts.month, d: +parts.day,
      h: +parts.hour, min: +parts.minute, s: +parts.second,
      weekday: wkMap[parts.weekday],
    };
  }
  // current NY offset in minutes (e.g. -300 for EST, -240 for EDT)
  function nyOffsetMinutes(date) {
    const p = nyParts(date);
    const asUTC = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s);
    return Math.round((asUTC - date.getTime()) / 60000);
  }
  function weekStartISO() {
    const now = new Date();
    const p = nyParts(now);
    // days since Monday (Mon=1 -> 0, Sun=0 -> 6)
    const daysSinceMon = (p.weekday + 6) % 7;
    // midnight NY today, as a UTC timestamp, then back off to Monday
    const off = nyOffsetMinutes(now); // minutes NY is ahead of UTC (negative)
    // midnight NY today in UTC ms:
    const midnightTodayUTC = Date.UTC(p.y, p.m - 1, p.d, 0, 0, 0) - off * 60000;
    const mondayUTC = midnightTodayUTC - daysSinceMon * 86400000;
    return new Date(mondayUTC).toISOString();
  }
  function nextResetLabel() {
    // next Monday 00:00 NY, shown to the user
    const startMs = Date.parse(weekStartISO());
    const next = new Date(startMs + 7 * 86400000);
    return next.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' EST';
  }

  // ---- season / week numbering for the Hall of Fame ----
  // Week 1 is anchored to the Monday of the week voting launched. Past weeks are
  // computed live from the vote rows (no snapshots needed). The current week is
  // shown by the live board above, so the Hall of Fame lists only COMPLETED weeks.
  const SEASON_ANCHOR_ISO = '2026-06-01T04:00:00.000Z'; // Monday of launch week (NY)
  const WEEK_MS = 7 * 86400000;

  // how many completed weeks have elapsed since the anchor (0 during week 1)
  function completedWeeks() {
    const anchor = Date.parse(SEASON_ANCHOR_ISO);
    const curStart = Date.parse(weekStartISO());
    const n = Math.round((curStart - anchor) / WEEK_MS);
    return Math.max(0, n);
  }
  // [startISO, endISO] for week number w (1-based)
  function weekRange(w) {
    const anchor = Date.parse(SEASON_ANCHOR_ISO);
    const start = anchor + (w - 1) * WEEK_MS;
    return [new Date(start).toISOString(), new Date(start + WEEK_MS).toISOString()];
  }
  function weekLabel(w) {
    const [s] = weekRange(w);
    const start = new Date(Date.parse(s));
    const end = new Date(Date.parse(s) + WEEK_MS - 86400000);
    const fmt = (d) => d.toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric' });
    return `${fmt(start)} – ${fmt(end)}`;
  }

  async function fetchWeekTop3(w) {
    const [since, until] = weekRange(w);
    const url = REST + '?select=mon&created_at=gte.' + encodeURIComponent(since) + '&created_at=lt.' + encodeURIComponent(until);
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error('history read failed: ' + res.status);
    const rows = await res.json();
    const counts = {};
    rows.forEach(r => { counts[r.mon] = (counts[r.mon] || 0) + 1; });
    return Object.entries(counts)
      .map(([mon, n]) => ({ mon, n, dex: (VDEX.DEX.find(d => d.name === mon) || {}).dex }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 3);
  }

  // ---- data calls ----
  async function fetchWeekVotes() {
    const since = weekStartISO();
    const url = REST + '?select=mon,voter_id,created_at&created_at=gte.' + encodeURIComponent(since);
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error('read failed: ' + res.status);
    return res.json();
  }
  async function castVote(mon) {
    const res = await fetch(REST, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ mon, voter_id: voterId() }),
    });
    if (!res.ok) throw new Error('vote failed: ' + res.status);
  }

  window.VIEWS.Vote = function Vote() {
    const [rows, setRows] = React.useState(null);   // null = loading
    const [err, setErr] = React.useState('');
    const [picking, setPicking] = React.useState('');
    const [busy, setBusy] = React.useState(false);
    const [q, setQ] = React.useState('');
    const [openWeek, setOpenWeek] = React.useState(null);   // expanded week number
    const [weekData, setWeekData] = React.useState({});      // { weekNum: [{mon,n,dex}] | 'loading' | 'error' }

    const nDone = completedWeeks();
    const toggleWeek = (w) => {
      if (openWeek === w) { setOpenWeek(null); return; }
      setOpenWeek(w);
      if (!weekData[w] && CONFIGURED) {
        setWeekData(prev => ({ ...prev, [w]: 'loading' }));
        fetchWeekTop3(w)
          .then(top => setWeekData(prev => ({ ...prev, [w]: top })))
          .catch(() => setWeekData(prev => ({ ...prev, [w]: 'error' })));
      }
    };

    const myId = voterId();
    const myVote = React.useMemo(() => {
      if (!rows) return null;
      const mine = rows.filter(r => r.voter_id === myId);
      return mine.length ? mine[mine.length - 1].mon : null;
    }, [rows, myId]);

    const load = React.useCallback(() => {
      if (!CONFIGURED) { setRows([]); return; }
      setErr('');
      fetchWeekVotes().then(setRows).catch(e => { setErr('Could not load the leaderboard right now. Try again shortly.'); setRows([]); });
    }, []);

    React.useEffect(() => { load(); }, [load]);
    // light auto-refresh every 30s
    React.useEffect(() => {
      if (!CONFIGURED) return;
      const t = setInterval(load, 30000);
      return () => clearInterval(t);
    }, [load]);

    // tally
    const tally = React.useMemo(() => {
      if (!rows) return [];
      const counts = {};
      rows.forEach(r => { counts[r.mon] = (counts[r.mon] || 0) + 1; });
      return Object.entries(counts)
        .map(([mon, n]) => ({ mon, n, dex: (VDEX.DEX.find(d => d.name === mon) || {}).dex }))
        .sort((a, b) => b.n - a.n);
    }, [rows]);

    const totalVotes = tally.reduce((s, t) => s + t.n, 0);
    const maxN = tally.length ? tally[0].n : 0;

    const allMons = React.useMemo(
      () => VDEX.DEX.filter(d => !d.undiscovered && d.stats && d.stats.HP > 0),
      []
    );
    const filtered = allMons.filter(d => !q || d.name.toLowerCase().includes(q.toLowerCase()) || String(d.dex).includes(q));

    const doVote = async (mon) => {
      if (busy || myVote) return;
      setBusy(true); setErr('');
      try { await castVote(mon); setPicking(''); await new Promise(r => setTimeout(r, 250)); load(); }
      catch (e) { setErr('Your vote did not go through. Please try again.'); }
      finally { setBusy(false); }
    };

    // ---------- render ----------
    if (!CONFIGURED) {
      return (
        <div>
          <PageHead kicker="COMMUNITY" title="Favourite Voidmon of the Week" sub="Voting isn't switched on yet. Check back soon!" />
          <div style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center', borderRadius: 16, border: '1px solid #2a2350', background: '#100c24', padding: '32px 24px', color: '#9a93bb', fontFamily: "'Space Grotesk', sans-serif" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🗳️</div>
            Weekly voting is being set up. Once it's live, you'll be able to vote for your favourite Voidmon here and see the community leaderboard.
          </div>
        </div>
      );
    }

    const medal = (i) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1));

    return (
      <div>
        <PageHead kicker="COMMUNITY" title="Favourite Voidmon of the Week"
          sub={`Vote for your favourite. One vote per person each week — resets ${nextResetLabel()}.`} />

        {/* your status / vote button */}
        <div style={{ maxWidth: 760, margin: '0 auto 22px', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#cdbfff', fontSize: 14 }}>
            {myVote
              ? <span>You voted for <strong style={{ color: '#fff' }}>{myVote}</strong> this week. Thanks! Come back next week to vote again.</span>
              : <span>You haven't voted yet this week.</span>}
          </div>
          {!myVote && (
            <button onClick={() => setPicking('open')} disabled={busy}
              style={{ cursor: busy ? 'default' : 'pointer', background: 'linear-gradient(135deg, #6a3df0, #b08fff)', border: '1px solid #c4a8ff', color: '#fff', borderRadius: 12, padding: '11px 20px', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 16 }}>
              🗳️ Cast your vote
            </button>
          )}
        </div>

        {err && <div style={{ maxWidth: 1080, margin: '0 auto 16px', color: '#ff8fa6', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, textAlign: 'center' }}>{err}</div>}

        {/* live board + hall of fame side panel (stacks on narrow screens) */}
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* leaderboard */}
        <div style={{ flex: '1 1 460px', minWidth: 300, borderRadius: 16, border: '1px solid #2a2350', background: 'linear-gradient(180deg, #14102b 0%, #0d0a1e 100%)', padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 12, color: '#b08fff', letterSpacing: 2 }}>THIS WEEK'S LEADERBOARD</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388' }}>{totalVotes} vote{totalVotes === 1 ? '' : 's'}</div>
          </div>

          {rows === null && <div style={{ color: '#6a6388', fontFamily: "'Space Grotesk', sans-serif", textAlign: 'center', padding: 24 }}>Loading…</div>}
          {rows && tally.length === 0 && <div style={{ color: '#9a93bb', fontFamily: "'Space Grotesk', sans-serif", textAlign: 'center', padding: 24 }}>No votes yet this week. Be the first!</div>}

          {tally.map((t, i) => {
            const lead = i === 0;
            const tile = lead ? 112 : 80;
            const sprite = lead ? 104 : 72;
            return (
            <div key={t.mon} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: lead ? '18px 0' : '14px 0', borderBottom: i < tally.length - 1 ? '1px solid #1d1838' : 'none' }}>
              <div style={{ width: 32, flexShrink: 0, textAlign: 'center', fontFamily: "'Pixelify Sans', sans-serif", fontSize: lead ? 22 : 18, color: i < 3 ? '#ffd54a' : '#6a6388' }}>{medal(i)}</div>
              <div style={{ width: tile, height: tile, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: lead ? 'radial-gradient(ellipse at 50% 35%, #2a2410, #100c20 75%)' : '#100c20', border: lead ? '1px solid #ffd54a' : '1px solid #221c40', boxShadow: lead ? '0 0 20px #ffd54a55, inset 0 0 14px #ffd54a18' : 'none', transition: 'width .35s ease, height .35s ease' }}>
                <SpriteSlot dex={t.dex} name={t.mon} size={sprite} accent={lead ? '#ffd54a' : '#8a5cff'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, minWidth: 0 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: lead ? 700 : 600, color: '#fff', fontSize: lead ? 21 : 17, cursor: 'pointer' }} onClick={() => go('#/pokemon/' + t.dex)}>{t.mon}</span>
                    {lead && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 1, color: '#ffd54a', border: '1px solid #6a5a1f', borderRadius: 5, padding: '2px 6px', whiteSpace: 'nowrap' }}>FAVOURITE</span>}
                  </span>
                  <span style={{ fontFamily: "'Space Mono', monospace", color: lead ? '#ffd54a' : '#cdbfff', fontSize: lead ? 17 : 15, fontWeight: 600 }}>{t.n}</span>
                </div>
                <div style={{ height: lead ? 12 : 10, borderRadius: 6, background: '#1a1533', overflow: 'hidden' }}>
                  <div style={{ width: (maxN ? Math.round((t.n / maxN) * 100) : 0) + '%', height: '100%', background: lead ? 'linear-gradient(90deg,#8a5cff,#ffd54a)' : 'linear-gradient(90deg,#5a2db3,#8a5cff)', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* hall of fame */}
        <div style={{ flex: '1 1 300px', minWidth: 260, alignSelf: 'flex-start', borderRadius: 16, border: '1px solid #2a2350', background: 'linear-gradient(180deg, #14102b 0%, #0d0a1e 100%)', padding: '20px 22px' }}>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 12, color: '#ffd54a', letterSpacing: 2, marginBottom: 4 }}>★ HALL OF FAME</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#6a6388', marginBottom: 14 }}>Past weeks' top 3. Click a week to expand.</div>
          {nDone === 0 && (
            <div style={{ color: '#9a93bb', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, padding: '12px 0', lineHeight: 1.6 }}>
              No past weeks yet — this is Week 1! After the first reset, each completed week's top 3 will appear here.
            </div>
          )}
          {Array.from({ length: nDone }, (_, k) => nDone - k).map(w => {
            const open = openWeek === w;
            const data = weekData[w];
            return (
              <div key={w} style={{ borderBottom: '1px solid #1d1838' }}>
                <button onClick={() => toggleWeek(w)}
                  style={{ width: '100%', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', textAlign: 'left' }}>
                  <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: 15, color: '#fff' }}>Week {w}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>{weekLabel(w)}</span>
                    <span style={{ color: '#b08fff', fontSize: 12, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}>▶</span>
                  </span>
                </button>
                {open && (
                  <div style={{ padding: '4px 0 14px' }}>
                    {data === 'loading' && <div style={{ color: '#6a6388', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, padding: 8 }}>Loading…</div>}
                    {data === 'error' && <div style={{ color: '#ff8fa6', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, padding: 8 }}>Couldn't load this week.</div>}
                    {Array.isArray(data) && data.length === 0 && <div style={{ color: '#9a93bb', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, padding: 8 }}>No votes were cast this week.</div>}
                    {Array.isArray(data) && data.map((t, i) => (
                      <div key={t.mon} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
                        <span style={{ width: 24, textAlign: 'center', fontFamily: "'Pixelify Sans', sans-serif", fontSize: 15, color: '#ffd54a' }}>{medal(i)}</span>
                        <div style={{ width: 52, height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: '#100c20', border: '1px solid #221c40' }}>
                          <SpriteSlot dex={t.dex} name={t.mon} size={46} accent="#8a5cff" />
                        </div>
                        <span style={{ flex: 1, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#fff', fontSize: 14, cursor: 'pointer' }} onClick={() => go('#/pokemon/' + t.dex)}>{t.mon}</span>
                        <span style={{ fontFamily: "'Space Mono', monospace", color: '#cdbfff', fontSize: 13 }}>{t.n}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>

        {/* vote picker modal */}
        {picking === 'open' && !myVote && (
          <div onClick={() => setPicking('')} style={{ position: 'fixed', inset: 0, background: 'rgba(6,4,16,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 620, maxHeight: '82vh', display: 'flex', flexDirection: 'column', borderRadius: 16, border: '1px solid #2a2350', background: '#0d0a1e', padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: 20, color: '#fff' }}>Pick your favourite</div>
                <button onClick={() => setPicking('')} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#9a93bb', fontSize: 22 }}>×</button>
              </div>
              <input value={q} autoFocus onChange={e => setQ(e.target.value)} placeholder="Search by name or dex #"
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, background: '#100c24', border: '1px solid #2a2545', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, marginBottom: 12 }} />
              <div style={{ overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
                {filtered.map(d => (
                  <button key={d.dex} onClick={() => doVote(d.name)} disabled={busy}
                    style={{ cursor: busy ? 'default' : 'pointer', background: '#15112a', border: '1px solid #2a2545', borderRadius: 10, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <SpriteSlot dex={d.dex} name={d.name} size={64} accent="#8a5cff" />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#cdbfff', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{d.name}</span>
                  </button>
                ))}
                {filtered.length === 0 && <div style={{ gridColumn: '1/-1', color: '#6a6388', textAlign: 'center', padding: 20, fontFamily: "'Space Grotesk', sans-serif" }}>No matches.</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
})();
