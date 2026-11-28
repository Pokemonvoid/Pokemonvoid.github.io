/* Pokémon Void — Locations index + Location detail. window.VIEWS.Locations / .Location */
window.VIEWS = window.VIEWS || {};
(function () {
  const { byDex, TYPES } = window.VDEX;
  const { ROUTES, TRAINERS, ITEMS } = window.VGAME;
  const { go, SpriteSlot, TypePill, ItemIcon, PageHead, Empty } = window.VUI;

  const trainersAt = (slug) => TRAINERS.filter(t => t.loc === slug);
  const locBySlug = (slug) => ROUTES.find(r => r.slug === slug);

  // Render a route name keeping the pixel look, but drawing digits in the crisper
  // Silkscreen pixel font so ambiguous glyphs (like 2 and 5 in Pixelify Sans) read clearly.
  function RouteName({ text, size }) {
    const parts = String(text).split(/(\d+)/); // split into [letters, number, letters, ...]
    return parts.map((p, i) =>
      /^\d+$/.test(p)
        ? <span key={i} style={{ fontFamily: "'Silkscreen', monospace", fontSize: size ? size * 0.82 : undefined, letterSpacing: 1 }}>{p}</span>
        : <span key={i}>{p}</span>
    );
  }

  // ---- Recommended-team engine -------------------------------------------
  // Suggests the best 3 Pokémon for an area from the pool obtainable by then
  // (starters + everything encounterable in this area and all earlier ones),
  // scored against the area's threats (wild + trainer mons) by type coverage.
  const { eff } = window.VGAME;
  const PROGRESSION = ['saudade-town', 'route-1', 'eventide-forest', 'route-5', 'acciome-city', 'route-3', 'aphora-town', 'route-2', 'pebpup-cavern', 'limerico-town', 'route-4'];
  const STARTERS = ['001', '004', '007']; // Tamatoo, Flaret, Cubble
  const _bst = (m) => Object.values(m.stats).reduce((a, b) => a + b, 0);
  const _bestStab = (att, def) => att.types.reduce((best, at) => Math.max(best, def.types.reduce((m, dt) => m * eff(at, dt), 1)), 0);
  const _worstIncoming = (mon, threat) => threat.types.reduce((worst, at) => Math.max(worst, mon.types.reduce((m, dt) => m * eff(at, dt), 1)), 1);

  function recommendFor(slug) {
    const pi = PROGRESSION.indexOf(slug);
    if (pi < 0) return [];
    // cumulative obtainable pool: starters + encounters up to & including this area
    const pool = new Set(STARTERS);
    for (let i = 0; i <= pi; i++) {
      const rr = ROUTES.find(x => x.slug === PROGRESSION[i]);
      if (rr) (rr.encounters || []).forEach(e => pool.add(e.dex));
    }
    const here = ROUTES.find(x => x.slug === slug);
    if (!here) return [];
    // threats = this area's wild encounters + trainer-owned mons
    const threatDex = new Set();
    (here.encounters || []).forEach(e => threatDex.add(e.dex));
    (here.npcs || []).forEach(n => {
      if (Array.isArray(n.team)) n.team.forEach(m => m.dex && threatDex.add(m.dex));
      if (n.starterOptions) n.starterOptions.forEach(o => o.dex && threatDex.add(o.dex));
    });
    const threats = [...threatDex].map(byDex).filter(Boolean);
    if (threats.length === 0) return [];
    const cands = [...pool].map(byDex).filter(m => m && !m.undiscovered);
    const scored = cands.map(mon => {
      let off = 0, def = 0;
      threats.forEach(t => {
        const o = _bestStab(mon, t);
        off += o >= 2 ? 2 : o === 1 ? 0.5 : o > 0 ? 0 : -1;
        const inc = _worstIncoming(mon, t);
        def += inc >= 2 ? -1 : inc === 0 ? 1 : inc <= 0.5 ? 0.5 : 0;
      });
      return { dex: mon.dex, score: off * 2 + def + _bst(mon) / 600 };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map(s => s.dex);
  }

  // strip a trailing "x3" / "×2" quantity and normalize for matching against the catalogue
  const stripQty = (s) => s.replace(/\s*[x×]\s*\d+\s*$/i, '').trim();
  const _normItem = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let _itemIndex = null;
  const itemByName = (name) => {
    const base = stripQty(name);
    let it = ITEMS.find(i => i.name === base);
    if (it) return it;
    if (!_itemIndex) { _itemIndex = new Map(); for (const i of ITEMS) _itemIndex.set(_normItem(i.name), i); }
    it = _itemIndex.get(_normItem(base));
    if (it) return it;
    // Not in the catalogue — synthesize an entry pointing at a sprite by name.
    // ItemIcon falls back to a placeholder dot if the file doesn't exist, so this is safe.
    const fileName = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    return { name: base, icon: 'items/' + fileName + '.png' };
  };
  const ITEM_COLORS = {
    'Evolution': '#5fd13c', 'Valuable': '#ffd23c', 'Battle Items': '#8a5cff', 'Key Item': '#33d6ff',
    'Medicine': '#ff6f8f', 'Poké Ball': '#ff8a5c', 'Berries': '#d13c8a',
  };

  // ---------- index ----------
  window.VIEWS.Locations = function Locations() {
    return (
      <div>
        <PageHead kicker="REGION MAP" title="Locations" sub="The road from a sunny starting town to a tear in the sky. Open any location to see its wild Pokémon, the trainers and folk you'll meet there, and the items hidden within." />

        <div style={{ position: 'relative', paddingLeft: 38 }}>
          <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #5fd13c, #33d6ff 45%, #8a5cff 75%, #ff6f8f)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ROUTES.map((r) => {
              const endgame = r.kind === 'Dungeon';
              const trs = trainersAt(r.slug);
              const [hov, setHov] = [undefined, undefined];
              return (
                <div key={r.slug} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -32, top: 22, width: 16, height: 16, borderRadius: '50%', background: endgame ? '#8a5cff' : '#0e0b1f', border: `2px solid ${endgame ? '#b89bff' : '#33d6ff'}`, boxShadow: `0 0 12px ${endgame ? '#8a5cff' : '#33d6ff'}aa` }} />
                  <button onClick={() => go('#/location/' + r.slug)}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = endgame ? '#5a4a9e' : '#33557e'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = endgame ? '#3a2f6e' : '#221d3a'; e.currentTarget.style.transform = 'none'; }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 20, borderRadius: 14, transition: 'all .15s',
                      background: endgame ? 'linear-gradient(160deg, #1a1140, #0c0a1c)' : '#0e0b1f', border: `1px solid ${endgame ? '#3a2f6e' : '#221d3a'}` }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}><RouteName text={r.name} size={24} /></span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a5cff', letterSpacing: 0.5 }}>{r.tag.toUpperCase()}</span>
                      <span style={{ marginLeft: 'auto', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a5cff' }}>View ›</span>
                    </div>
                    <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14.5, color: '#bdb6dd', lineHeight: 1.55, maxWidth: 720, textWrap: 'pretty' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#7a7398' }}>
                      <span>◉ {r.mons.length} Pokémon</span>
                      <span>⚔ {trs.length} Trainer{trs.length === 1 ? '' : 's'}</span>
                      <span>☉ {r.npcs.length} NPC{r.npcs.length === 1 ? '' : 's'}</span>
                      <span>◆ {r.items.length} Item{r.items.length === 1 ? '' : 's'}</span>
                      <span style={{ color: '#5f5980' }}>· {r.encounter}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------- detail pieces ----------
  function MonCard({ dx }) {
    const m = byDex(dx); if (!m) return null;
    const accent = TYPES[m.types[0]].glow;
    return (
      <button onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', textAlign: 'center', padding: 12, borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a', width: 120 }}>
        <SpriteSlot dex={dx} name={m.name} size={92} accent={accent} />
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginTop: 6 }}>No.{m.dex}</div>
        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', lineHeight: 1.1, marginTop: 2 }}>{m.name}</div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', marginTop: 6 }}>{m.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/pokemon/' + dx); }} />)}</div>
      </button>
    );
  }

  function TrainerCard({ t }) {
    const isBoss = /gym leader|rival|champion|boss/i.test(t.role || '');
    const c = { glow: isBoss ? '#ff5fa2' : '#8a5cff', bg: '#3a1d6e' };
    return (
      <div style={{ padding: 16, borderRadius: 14, background: isBoss ? `linear-gradient(160deg, ${c.bg}88, #0c0a1c)` : '#0e0b1f', border: `1px solid ${isBoss ? c.glow : '#221d3a'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
          {t.sprite && <img src={'trainers/' + t.sprite} alt={t.name} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }}
            style={{ width: 56, height: 56, imageRendering: 'pixelated', flex: '0 0 auto', filter: `drop-shadow(0 0 8px ${c.glow}66)` }} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: c.glow, letterSpacing: 0.5 }}>{(t.role || '').toUpperCase()}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 19, color: '#fff' }}>{t.name}</span>
              {isBoss && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: c.glow, border: `1px solid ${c.glow}`, borderRadius: 4, padding: '2px 6px' }}>BOSS</span>}
            </span>
          </div>
        </div>
        {t.line && (
          <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#c9bfff', fontStyle: 'italic', lineHeight: 1.5 }}>{t.line}</p>
        )}
        {t.starterDependent && (t.starterNote || (t.team[0] && t.team[0].note)) && (
          <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#c9bfff', fontStyle: 'italic', lineHeight: 1.5 }}>{t.starterNote || (t.team[0] && t.team[0].note) || 'Team depends on your starter choice.'}</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(t.team || []).map((m, i) => {
            const mon = m.dex ? byDex(m.dex) : null;
            if(m.dex && (!mon || mon.undiscovered))return <div key={i} style={{color:"#8a83a8",fontSize:13}}>Unrevealed Pokémon · Lv {m.lv}</div>;
            const accent = mon ? TYPES[mon.types[0]].glow : '#8a5cff';
            const Inner = (
              <React.Fragment>
                <div style={{ flex: '0 0 auto' }}>{m.dex ? <SpriteSlot dex={m.dex} name={m.name} size={48} accent={accent} /> : <div style={{ width: 40, height: 40, borderRadius: 8, background: '#15112a', border: '1px solid #2a2350', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#7b6fb8' }}>?</div>}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#fff' }}>{m.name}</span>
                    {mon && mon.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/types'); }} />)}
                    {m.lv && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#a89fce', fontWeight: 700 }}>Lv {m.lv}</span>}
                    {m.ability && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#9a8fc8', fontWeight: 600 }}>{m.ability}</span>}
                  </div>
                  {m.moves && m.moves.length > 0 && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#a49dc0', marginTop: 3, lineHeight: 1.4 }}>{m.moves.join(' · ')}</div>}
                  {m.note && <div style={{ fontSize: 12, color: '#c4b2e6', marginTop: 4, lineHeight: 1.5 }}>{m.note}</div>}
                </div>
              </React.Fragment>
            );
            return mon
              ? <button key={i} onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: '#15112a', border: `1px solid ${accent}33`, textAlign: 'left' }}>{Inner}</button>
              : <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: '#15112a', border: '1px solid #2a2350' }}>{Inner}</div>;
          })}
          {t.starterOptions && t.starterOptions.length > 0 && (
            <div style={{ marginTop: 4, padding: '12px 14px', borderRadius: 12, background: 'linear-gradient(160deg, #1d1240, #0c0a1c)', border: '1px solid #3a2f6e' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#b08fff', letterSpacing: 0.5, marginBottom: 10 }}>+ STARTER (DEPENDS ON YOUR CHOICE)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.starterOptions.map((o, i) => {
                  const mon = o.dex ? byDex(o.dex) : null;
                  const accent = mon ? TYPES[mon.types[0]].glow : '#8a5cff';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ flex: '0 0 auto', fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: '#8a83a8', minWidth: 118 }}>You picked <strong style={{ color: '#cdbfff' }}>{o.ifYouPicked}</strong></span>
                      <span style={{ color: '#6a6388' }}>→</span>
                      <button onClick={() => mon && go('#/pokemon/' + o.dex)} style={{ cursor: mon ? 'pointer' : 'default', flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '7px 11px', borderRadius: 10, background: '#15112a', border: `1px solid ${accent}33`, textAlign: 'left' }}>
                        {mon ? <SpriteSlot dex={o.dex} name={mon.name} size={40} accent={accent} /> : null}
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>{o.name}</span>
                            {o.lv && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#a89fce', fontWeight: 700 }}>Lv {o.lv}</span>}
                          </span>
                          {o.moves && o.moves.length > 0 && <span style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#a49dc0', marginTop: 2 }}>{o.moves.join(' · ')}</span>}
                          {o.ability && <span style={{ display: 'block', fontSize: 12, color: '#9a8fc8', marginTop: 3 }}>{o.ability}</span>}
                          {o.note && <span style={{ display: 'block', fontSize: 12, color: '#c4b2e6', marginTop: 3, lineHeight: 1.5 }}>{o.note}</span>}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const H3 = ({ children }) => <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>{children}</h3>;

  // ---------- detail ----------
  window.VIEWS.Location = function Location({param}) {
    return <AreaJournal key={param} param={param}/>;
  };
  function AreaMap({file,name,pickups=[],connections=[],onConnection}) {
    const storageKey='void_map_pickups_v1:'+file;
    const [saveError,setSaveError]=React.useState(false);
    const readCollected=()=>{try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');return saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{};}catch{return {};}};
    const [collected,setCollected]=React.useState(readCollected);
    const pickupKey=item=>String(item.event)+':'+item.id;
    React.useEffect(()=>{
      const sync=event=>{if(event.key===storageKey||event.key===null)setCollected(readCollected());};
      window.addEventListener('storage',sync);
      return ()=>window.removeEventListener('storage',sync);
    },[storageKey]);
    const togglePickup=item=>{
      if(suppressClick.current)return;
      const key=pickupKey(item),next={...collected};
      if(next[key])delete next[key];else next[key]=true;
      setCollected(next);setSelectedItem(item);
      try{localStorage.setItem(storageKey,JSON.stringify(next));setSaveError(false);}catch{setSaveError(true);}
    };
    const collectedCount=pickups.filter(item=>collected[pickupKey(item)]).length;
    const [showItems,setShowItems]=React.useState(true);
    const [selectedItem,setSelectedItem]=React.useState(null);
    const [zoom, setZoom] = React.useState(1);
    const viewportRef = React.useRef(null);
    const artRef = React.useRef(null);
    const zoomRef = React.useRef(1);
    const dragRef = React.useRef(null);
    const suppressClick = React.useRef(false);
    const [dragging, setDragging] = React.useState(false);
    const zoomAt = React.useCallback((requested, clientX, clientY) => {
      const viewport = viewportRef.current, art = artRef.current;
      if (!viewport || !art) return;
      const next = Math.max(1, Math.min(4, requested));
      const bounds = viewport.getBoundingClientRect();
      const x = clientX === undefined ? viewport.clientWidth / 2 : clientX - bounds.left;
      const y = clientY === undefined ? viewport.clientHeight / 2 : clientY - bounds.top;
      const oldWidth = art.getBoundingClientRect().width;
      const mapX = viewport.scrollLeft + x, mapY = viewport.scrollTop + y;
      art.style.width = next * 100 + '%';
      const ratio = art.getBoundingClientRect().width / oldWidth;
      viewport.scrollLeft = mapX * ratio - x;
      viewport.scrollTop = mapY * ratio - y;
      zoomRef.current = next;
      setZoom(next);
    }, []);
    React.useEffect(() => {
      const viewport = viewportRef.current;
      const wheel = event => {
        event.preventDefault();
        const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
        const delta = Math.max(-160, Math.min(160, event.deltaY * units));
        zoomAt(zoomRef.current * Math.exp(-delta * .0025), event.clientX, event.clientY);
      };
      viewport.addEventListener('wheel', wheel, {passive:false});
      return () => viewport.removeEventListener('wheel', wheel);
    }, [zoomAt]);
    const {startDrag,moveDrag,endDrag}=React.useMemo(()=>window.VoidMapGestures({dragRef,suppressClick,zoomRef,zoomAt,setDragging}),[zoomAt]);

    return <div className="zone-map-viewer">
      <div className="zone-map-controls"><span>{pickups.length?collectedCount+" / "+pickups.length+" collected":"Explore the area"}</span>{pickups.length>0&&<button type="button" aria-pressed={showItems} onClick={()=>{setShowItems(v=>!v);setSelectedItem(null);}}>Items ({pickups.length})</button>}<div><button type="button" aria-label="Zoom out of area map" disabled={zoom<=1} onClick={()=>zoomAt(zoomRef.current/1.25)}>−</button><button type="button" aria-label="Reset area map zoom" onClick={()=>{zoomAt(1);viewportRef.current.scrollTo(0,0);}}>{Math.round(zoom*100)}%</button><button type="button" aria-label="Zoom into area map" disabled={zoom>=4} onClick={()=>zoomAt(zoomRef.current*1.25)}>+</button></div></div>
      <div ref={viewportRef} className={'zone-map-viewport'+(dragging?' dragging':'')} tabIndex={0} role="region" aria-label={name+' zoomable area map'} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag} onPointerLeave={event=>{if(dragRef.current&&!dragRef.current.moved)endDrag(event);}} onDragStart={event=>event.preventDefault()} onKeyDown={event=>{if(event.key==='+'||event.key==='='){event.preventDefault();zoomAt(zoomRef.current*1.25);}else if(event.key==='-'){event.preventDefault();zoomAt(zoomRef.current/1.25);}else if(event.key==='0'){event.preventDefault();zoomAt(1);viewportRef.current.scrollTo(0,0);}}}>
        <div ref={artRef} className="zone-map-art" style={{width:zoom*100+'%'}}><img src={'maps/'+file} alt={name+' area map'} draggable={false}/>{showItems&&pickups.map((item,i)=><button type="button" className={"zone-pickup"+(collected[pickupKey(item)]?" collected":"")} aria-pressed={!!collected[pickupKey(item)]} key={item.event+'-'+item.id} style={{left:item.left+'%',top:item.top+'%'}} aria-label={item.name+(item.quantity>1?' ×'+item.quantity:'')} title={item.name+(item.quantity>1?' ×'+item.quantity:'')} onClick={()=>togglePickup(item)}><img src={itemByName(item.name).icon} alt="" draggable={false}/>{collected[pickupKey(item)]&&<span className="zone-collected-check" aria-hidden="true">✓</span>}</button>)}{connections.map(c=><button type="button" className={"zone-map-exit"+(c.left<20?" edge-left":c.left>80?" edge-right":"")} key={c.event} style={{left:c.left+'%',top:c.top+'%'}} onClick={()=>{if(!suppressClick.current)onConnection(c);}} aria-label={'Go to '+c.name}>↗<span>{c.name}</span></button>)}</div>
      </div>{selectedItem&&showItems&&<div className="zone-pickup-info" role="status"><strong>{selectedItem.name}{selectedItem.quantity>1?' ×'+selectedItem.quantity:''}</strong><span><b>{collected[pickupKey(selectedItem)]?"Collected · ":"Not collected · "}</b>{selectedItem.description || (selectedItem.hidden?'Hidden item':'Ground pickup')}</span><button type="button" aria-label="Close item information" onClick={()=>setSelectedItem(null)}>×</button></div>}<p className="zone-map-help">Drag to pan · Scroll or pinch to zoom</p>{pickups.length>0&&<p className="zone-collection-note" role={saveError?'alert':undefined}>{saveError?'Progress could not be saved in this browser.':'Click an item to collect it; click again to undo. Progress is saved in this browser.'}</p>}
    </div>;
  }
  function AreaJournal({param}) {
    const [section,setSection]=React.useState('overview');
    const [questIndex,setQuestIndex]=React.useState(0);
    const [mapIndex,setMapIndex]=React.useState(0);
    const r=locBySlug(param);
    if(!r)return <Empty label={'No location named “'+param+'”.'}/>;
    const areaMaps=r.maps||[], activeMap=areaMaps[mapIndex];
    const quests=r.questGuide||[], people=r.npcs||[];
    const encounters=(r.encounters||[]).filter(e=>{const m=byDex(e.dex);return m&&!m.undiscovered;});
    const methods=[...new Set(encounters.map(e=>e.method))];
    const methodName=m=>({Land:'Tall grass',OldRod:'Old Rod',Cave:'Cave',Fishing:'Fishing'}[m]||m);
    const tabs=[['overview','Overview',null],...(quests.length?[['quests','Quests',quests.length]]:[]),...(encounters.length?[['pokemon','Pokémon',new Set(encounters.map(e=>e.dex)).size]]:[]),...(people.length?[['people','People',people.length]]:[]),...(r.items.length?[['items','Items',r.items.length]]:[])];
    const quest=quests[questIndex];
    const exits=(r.exits||'').split('|').map(x=>x.trim()).filter(Boolean);
    const related=r.related||[];
    const recommendations=recommendFor(r.slug);
    return <div className="zone">
      <a className="zone-back" href="#/locations">← Back to Interactable Map</a>
      <header className="zone-heading"><div><span className="zone-kicker">DRAPALLA / {r.kind}</span><h1>{r.name}</h1></div><span className="zone-tag">AREA JOURNAL</span></header>
      <div className="zone-layout">
        <aside className="zone-atlas">
          <div className="zone-panel-head"><span>AREA MAP</span><span>{r.name}</span></div>
          {areaMaps.length>1&&<div className="zone-map-controls" role="group" aria-label="Cavern area">{areaMaps.map((m,i)=><button key={m.file} type="button" aria-pressed={i===mapIndex} onClick={()=>setMapIndex(i)}>{m.name}</button>)}</div>}
          {r.map?<AreaMap key={activeMap?.file||r.map} file={activeMap?.file||r.map} name={activeMap?r.name+" — "+activeMap.name:r.name} pickups={activeMap?.pickups||r.pickups||[]} connections={activeMap?.connections||[]} onConnection={c=>{if(c.file){const next=areaMaps.findIndex(m=>m.file===c.file);if(next>=0)setMapIndex(next);}else if(c.slug)go('#/location/'+c.slug);}}/>:<div className="zone-no-map">Area map coming soon</div>}
          {(exits.length>0||related.length>0)&&<div className="zone-connections"><span className="zone-kicker">CONNECTIONS & PLACES</span>{exits.map((text,i)=>{const destination=text.split(/[—–]/).pop().replace(/\s*\(.*?\)/g,'').trim().toLowerCase();const target=ROUTES.find(x=>x.name.toLowerCase()===destination)||ROUTES.find(x=>x.name.toLowerCase().startsWith(destination+' '))||ROUTES.filter(x=>text.toLowerCase().includes(x.name.toLowerCase())).sort((a,b)=>b.name.length-a.name.length)[0];return target?<a key={i} href={'#/location/'+target.slug}>{text}<span>›</span></a>:<p key={i}>{text}</p>;})}{related.map(p=><a key={p.slug} href={'#/location/'+p.slug}>{p.name}<span>›</span></a>)}</div>}
        </aside>
        <section className="zone-journal" aria-label={r.name+' journal'}>
          <nav className="zone-tabs" aria-label="Area sections">{tabs.map(([id,label,count])=><button key={id} aria-pressed={section===id} onClick={()=>setSection(id)}>{label}{count!==null&&<small>{count}</small>}</button>)}</nav>
          <div className="zone-content">
            {section==='overview'&&<div><span className="zone-kicker">FIELD NOTES</span><h2>Welcome to {r.name}</h2><p className="zone-description">{r.desc}</p>{r.encounter&&<div className="zone-environment"><span>Wild encounters</span><strong>{r.encounter}</strong></div>}<div className="zone-notes">{(r.notes||[]).map(([title,text],i)=><article key={title}><span className="zone-note-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>{quests.length>0&&<button className="zone-next" onClick={()=>setSection('quests')}>Open quest journal <span>{quests.length} {quests.length===1?'quest':'quests'} ›</span></button>}</div>}
            {section==='quests'&&quest&&<div><span className="zone-kicker">QUEST JOURNAL</span><h2>Stories & side quests</h2><div className="zone-quests"><nav aria-label="Choose a quest">{quests.map((q,i)=><button key={q.title} aria-pressed={i===questIndex} onClick={()=>setQuestIndex(i)}><small>{q.kind}</small><strong>{q.title}</strong></button>)}</nav><article className="zone-quest"><span className="zone-kicker">{quest.kind}</span><h3>{quest.title}</h3><p>{quest.description}</p><dl>{quest.giver&&<><dt>Speak to</dt><dd>{quest.giver}</dd></>}{quest.report&&<><dt>Return to</dt><dd>{quest.report}</dd></>}{quest.requires?.length>0&&<><dt>Complete first</dt><dd>{quest.requires.join(' · ')}</dd></>}</dl>{quest.reward&&<div className="zone-reward"><span>REWARD</span><strong>{quest.reward}</strong></div>}</article></div></div>}
            {section==='pokemon'&&<div><span className="zone-kicker">ENCOUNTER LOG</span><h2>Wild Pokémon</h2><p className="zone-hint">Chances apply within each encounter method. Unrevealed Pokémon remain hidden.</p>{methods.map(method=><section key={method} className="zone-method"><h3>{methodName(method)}</h3>{encounters.filter(e=>e.method===method).map((e,i)=>{const m=byDex(e.dex);return <a className="zone-mon" key={e.dex+'-'+i} href={'#/pokemon/'+e.dex}><SpriteSlot dex={e.dex} name={m.name} size={52}/><div><strong>{m.name}</strong><span>{m.types.map(t=>TYPES[t].name).join(' / ')}</span></div><div className="zone-rate"><strong>{e.pct}%</strong><span>Lv {e.lv}</span></div></a>;})}</section>)}{recommendations.length>0&&<section className="zone-method"><h3>Suggested partners</h3><div className="zone-partners">{recommendations.map(dx=>{const m=byDex(dx);return <a key={dx} href={'#/pokemon/'+dx}><SpriteSlot dex={dx} name={m.name} size={48}/><span>{m.name}</span></a>;})}</div></section>}</div>}
            {section==='people'&&<div><span className="zone-kicker">TRAINERS & PEOPLE</span><h2>Who you’ll meet</h2><div className="zone-people">{people.map((t,i)=><TrainerCard key={t.name+i} t={t}/>)}</div></div>}
            {section==='items'&&<div><span className="zone-kicker">ITEM LOG</span><h2>Things to collect</h2><div className="zone-items">{r.items.map((name,i)=>{const item=itemByName(name);return <a key={name+i} href="#/items"><ItemIcon item={item} size={40}/><strong>{name}</strong><span>›</span></a>;})}</div></div>}
          </div>
        </section>
      </div>
    </div>;
  }
})();
