/* Hit areas follow the original map artwork at its native pixel resolution. */
(function () {
  const { PageHead, go } = window.VUI;
  const { ROUTES } = window.VGAME;
  const nodes = window.VOID_REGION;
  const originalLocation = window.VIEWS.Location;
  const routeFor = node => ROUTES.find(route => route.name === node.name || route.slug === node.slug);
  const destination = node => '#/location/' + (routeFor(node)?.slug || node.slug);

  window.VIEWS.Locations = function RegionMap() {
    const [query, setQuery] = React.useState('');
    const [hover, setHover] = React.useState(null);
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
    const {startDrag,moveDrag,endDrag}=React.useMemo(()=>window.VoidMapGestures({dragRef,suppressClick,zoomRef,zoomAt,setDragging,onDrag:()=>setHover(null)}),[zoomAt]);
    const matches = nodes.filter(node => node.name.toLowerCase().includes(query.trim().toLowerCase()));
    return <div>
      <PageHead kicker="REGION MAP" title="Explore Drapalla" sub="Choose a town, route or landmark to explore its Pokémon, people and places." />
      <style>{`
        .region-layout { display:grid; grid-template-columns:minmax(0,1fr) 240px; gap:20px; align-items:start; }
        .region-frame { border:1px solid #44345e; border-radius:14px; overflow:hidden; background:#0e1020; }
        .region-toolbar { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:14px 16px; color:#d8c9ed; min-height:58px; }
        .region-toolbar button { background:#211732; border:1px solid #57416e; color:#eee2ff; border-radius:6px; padding:7px 11px; cursor:pointer; font:inherit; }
        .region-scroll { overflow:auto; height:min(60vh, 580px); overscroll-behavior:contain; touch-action:none; cursor:grab; user-select:none; }
        .region-scroll.dragging,.region-scroll.dragging * { cursor:grabbing!important; }
        .region-art { position:relative; line-height:0; }
        .region-art img { width:100%; height:auto; image-rendering:pixelated; display:block; }
        .region-art svg { position:absolute; inset:0; width:100%; height:100%; }
        .region-hit path { fill:transparent; stroke:none; shape-rendering:crispEdges; pointer-events:fill; }
        .region-hit:hover path,.region-hit:focus path,.region-hit.selected path { fill:#fff4a655; }
        .region-hit { cursor:pointer; outline:none; }
        .region-caption { margin:0; padding:13px 16px; color:#a99bbc; font-size:12px; line-height:1.5; }
        .region-index { border:1px solid #322742; border-radius:12px; padding:12px; background:#100c1d; }
        .region-index input { box-sizing:border-box; width:100%; padding:11px; background:#1c1429; color:#eee3ff; border:1px solid #4b365f; border-radius:7px; font:inherit; }
        .region-links { display:flex; flex-direction:column; gap:3px; margin-top:10px; max-height:520px; overflow:auto; }
        .region-links a { color:#bcb0cf; text-decoration:none; padding:10px; border-radius:6px; font-size:13px; }
        .region-links a:hover,.region-links a:focus-visible { background:#30213f; color:#fff; outline:1px solid #ac89cc; }
        .region-links small { display:block; color:#8b7c9d; font-size:10px; margin-top:4px; }
        @media(max-width:760px) { .region-layout {grid-template-columns:1fr;} .region-links {max-height:240px;} .region-toolbar {flex-wrap:wrap;} }
      `}</style>
      <div className="region-layout">
        <div className="region-frame">
          <div className="region-toolbar"><strong>{hover || 'Drapalla'}</strong><div style={{display:'flex',gap:6}}><button aria-label="Zoom out" disabled={zoom<=1} onClick={()=>zoomAt(zoomRef.current/1.25)}>−</button><button aria-label="Reset map zoom" onClick={()=>{zoomAt(1); viewportRef.current.scrollTo(0,0);}}>{Math.round(zoom*100)}%</button><button aria-label="Zoom in" disabled={zoom>=4} onClick={()=>zoomAt(zoomRef.current*1.25)}>+</button></div></div>
          <div ref={viewportRef} className={'region-scroll'+(dragging?' dragging':'')} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag} onPointerLeave={event=>{if(dragRef.current && !dragRef.current.moved)endDrag(event);}} onDragStart={event=>event.preventDefault()} onClickCapture={event=>{if(suppressClick.current){event.preventDefault();event.stopPropagation();suppressClick.current=false;}}}><div ref={artRef} className="region-art" style={{width:(zoom*100)+'%'}}>
            <img src="maps/drapalla-region.png" width="480" height="320" alt="Drapalla region map" />
            <svg viewBox="0 0 480 320" aria-label="Interactive location map">
              {matches.filter(node=>node.path).map(node=><a key={node.slug} href={destination(node)} aria-label={'Explore '+node.name} className={'region-hit'+(hover===node.name?' selected':'')} onMouseEnter={()=>setHover(node.name)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(node.name)} onBlur={()=>setHover(null)}>
                <title>{node.name}</title><path d={node.path} />
              </a>)}
            </svg>
          </div></div>
          <p className="region-caption">Click a town or route to open it. Drag to pan; scroll to zoom towards your cursor. The full region is shown; some area pages are still being prepared.</p>
        </div>
        <aside className="region-index"><input aria-label="Find a location" placeholder="Find a location…" value={query} onChange={event=>setQuery(event.target.value)} /><nav className="region-links" aria-label="Map locations">{matches.map(node=><a key={node.slug} href={destination(node)} onMouseEnter={()=>setHover(node.name)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(node.name)} onBlur={()=>setHover(null)}>{node.name}{!routeFor(node)&&<small>Details coming soon</small>}</a>)}{!matches.length&&<p style={{color:'#aaa'}}>No matching locations.</p>}</nav></aside>
      </div>
    </div>;
  };

  window.VIEWS.Location = function RegionLocation(props) {
    if (ROUTES.some(route=>route.slug===props.param)) return React.createElement(originalLocation,props);
    const node=nodes.find(node=>node.slug===props.param);
    if (!node) return React.createElement(originalLocation,props);
    return <div><a className="zone-back" href="#/locations">← Back to Interactable Map</a><PageHead kicker="DRAPALLA" title={node.name} sub="Area details are coming soon." /></div>;
  };
})();
