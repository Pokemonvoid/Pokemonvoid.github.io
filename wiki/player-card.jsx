/* Isolated Chapter 1 player card prototype. */
window.VIEWS = window.VIEWS || {};
(() => {
  const {useState,useEffect,useRef} = React;
  const {DEX,TYPES,byDex} = window.VDEX;
  const A=window.VOID_PLAYER_ASSETS,R=window.VoidPlayerRenderer,G=window.VGAME;
  const KEY='void_player_card_v1';
  const NATURES=['Hardy','Lonely','Brave','Adamant','Naughty','Bold','Docile','Relaxed','Impish','Lax','Timid','Hasty','Serious','Jolly','Naive','Modest','Mild','Quiet','Bashful','Rash','Calm','Gentle','Sassy','Careful','Quirky'];
  const available=DEX.filter(d=>!d.undiscovered);
  const LIVING_KEY='voiddex_livingdex_v1';
  function readCollection() {
    try {
      const saved=JSON.parse(localStorage.getItem(LIVING_KEY));
      const caught=new Set();
      for(const box of Array.isArray(saved?.boxes)?saved.boxes:[]) {
        for(const slot of Array.isArray(box?.slots)?box.slots.slice(0,30):[]) {
          if(!slot || !(slot.normal||slot.shiny||slot.anomaly))continue;
          const dex=window.VDEX.canonicalDex(slot.dex);
          if(available.some(d=>d.dex===dex))caught.add(dex);
        }
      }
      return {caught:caught.size,error:false};
    } catch {return {caught:0,error:true};}
  }
  const BADGES=[{id:'growth',name:'Growth Badge',asset:'GROWTH_BADGE'},{id:'culinary',name:'Culinary Badge',asset:'CULINARY_BADGE'}];
  const badgeImage=b=>`player-assets/badges/${b.asset}.png`;
  const fresh=()=>({version:1,name:'',tagline:'A new journey begins.',character:'Ronan',skin:1,hair:1,main:0,secondary:0,twoTone:false,pose:1,team:Array(6).fill(null),badges:[]});
  const movesFor=d=>[...new Set([...d.levelMoves,...d.eggMoves,...d.tmMoves,...(d.tutorMoves||[])].map(m=>m.name))].sort((a,b)=>a.localeCompare(b));
  const abilitiesFor=d=>[...new Set([...d.abilities,...(d.hidden?[d.hidden]:[])])];
  function normalize(raw) {
    if(!raw||raw.version!==1)throw new Error('This is not a supported Void player card.');
    const v=fresh();for(const key of ['name','tagline'])if(typeof raw[key]==='string')v[key]=raw[key].slice(0,key==='name'?24:64);
    if(['Ronan','Nya','Seren'].includes(raw.character))v.character=raw.character;
    for(const [key,max] of [['skin',4],['hair',4],['main',42],['secondary',42],['pose',3]])if(Number.isInteger(raw[key])&&raw[key]>=(key==='main'||key==='secondary'?0:1)&&raw[key]<=max)v[key]=raw[key];
    v.twoTone=raw.twoTone===true;v.badges=BADGES.filter(b=>Array.isArray(raw.badges)&&raw.badges.includes(b.id)).map(b=>b.id);
    v.team=Array.from({length:6},(_,i)=>{const m=raw.team?.[i],d=m&&available.find(d=>d.dex===window.VDEX.canonicalDex(m.dex));if(!d)return null;const pool=movesFor(d);return {dex:d.dex,variant:m.variant==='shiny'?'shiny':m.variant==='anomaly'&&d.anomaly&&!d.anomaly.artPending?'anomaly':'normal',ability:abilitiesFor(d).includes(m.ability)?m.ability:d.abilities[0],nature:NATURES.includes(m.nature)?m.nature:'Hardy',moves:Array.from({length:4},(_,j)=>pool.includes(m.moves?.[j])?m.moves[j]:'')};});
    return v;
  }
  function readSaved(){try{const raw=(localStorage.getItem(KEY)||localStorage.getItem('void_player_card_lab_v1'));return {value:raw?normalize(JSON.parse(raw)):fresh(),error:''};}catch{return {value:fresh(),error:'Saved card could not be read. You can import a backup or create a new card.'};}}
  const sprite=m=>`sprites/${m.dex}${m.variant&&m.variant!=='normal'?'-'+m.variant:''}.png`;
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function Portrait({look,onError}) {
    const ref=useRef();useEffect(()=>{let cancelled=false;R.render(look).then(c=>{if(cancelled)return;const out=ref.current;out.width=c.width;out.height=c.height;out.getContext('2d').drawImage(c,0,0);}).catch(e=>{if(!cancelled)onError(e.message);});return()=>{cancelled=true;};},[look.character,look.skin,look.hair,look.main,look.secondary,look.twoTone,look.pose]);
    return <canvas ref={ref} width="160" height="160" role="img" aria-label={`${look.character}, hairstyle ${look.hair}, ${A.POSES[look.pose-1].name} pose`} />;
  }
  function CharacterEditor({look, onError, children}) {
    const ref = useRef(null);
    useEffect(() => {
      const header = document.querySelector('header');
      if (!header) return;
      const update = () => ref.current?.style.setProperty('--pc-header-height', header.getBoundingClientRect().height + 'px');
      const observer = new ResizeObserver(update);
      observer.observe(header);
      update();
      return () => observer.disconnect();
    }, []);
    return <div className="pc-customize" ref={ref}>
      <aside className="pc-live-preview" aria-label="Live character preview">
        <div className="pc-live-portrait"><Portrait look={look} onError={onError}/></div>
        <div><span className="pc-eyebrow">LIVE PREVIEW</span><strong>{look.name.trim() || look.character}</strong></div>
      </aside>
      <div className="pc-customize-controls">{children}</div>
    </div>;
  }
  function Swatches({label,value,onChange,disabled}){return <div><div className="pc-color-title"><strong>{label}</strong><span>{value?A.PALETTE[value-1][0]:'Original colour'}</span></div><div className="pc-swatches">{A.PALETTE.map(([name,colors],i)=><button key={name} className="pc-swatch" type="button" disabled={disabled} aria-label={`${label}: ${name}`} title={name} aria-pressed={value===i+1} style={{background:'#'+colors[3].toString(16).padStart(6,'0')}} onClick={()=>onChange(i+1)} />)}</div><button type="button" className="pc-btn" disabled={disabled} onClick={()=>onChange(0)}>Original colour</button></div>;}
  function Segments({label,value,options,onChange}){return <div className="pc-field"><span>{label}</span><div className="pc-segment" role="group" aria-label={label}>{options.map(o=><button key={o.value} type="button" aria-pressed={value===o.value} onClick={()=>onChange(o.value)}>{o.label}</button>)}</div></div>;}
  async function exportCard(state,collection) {
    const canvas=document.createElement('canvas');canvas.width=1500;canvas.height=920;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
    const bg=c.createLinearGradient(0,0,1500,920);bg.addColorStop(0,'#2c1c40');bg.addColorStop(1,'#0c1020');c.fillStyle=bg;c.fillRect(0,0,1500,920);c.strokeStyle='#8e6fae';c.lineWidth=2;c.strokeRect(22,22,1456,876);
    const text=(t,x,y,size=20,color='#eee5ff',font='Space Grotesk')=>{c.font=`${size}px "${font}", sans-serif`;c.fillStyle=color;c.fillText(t,x,y);};
    await document.fonts.ready;text('POKÉMON VOID  /  TRAINER CARD',55,65,18,'#c5a9e0','Silkscreen');text('CHAPTER 1',1240,65,16,'#b99cce','Silkscreen');
    c.drawImage(await R.render(state),55,105,350,350);text(state.name.trim()||'Your name',440,205,54,'#ffffff','Pixelify Sans');text(state.tagline,443,255,22,'#c3aed2');text(`${state.character} · ${A.POSES[state.pose-1].name} pose`,443,300,17,'#aa91bd');text(`${state.team.filter(Boolean).length} / 6 partners     ${state.badges.length} / 2 badges`,443,350,19,'#c1a4d5');
    text(collection.error?'Living Dex unavailable':`${collection.caught} / ${available.length} Pokédex entries caught`,443,390,19,'#99dacf');
    text('BADGE COLLECTION',1120,150,14,'#c3a4d9','Silkscreen');const badgeCols=BADGES.length>4?5:2,badgeSize=BADGES.length>4?55:120,badgeGap=BADGES.length>4?65:150;for(let i=0;i<Math.min(10,BADGES.length);i++){const b=BADGES[i],earned=state.badges.includes(b.id),badgeX=1100+(i%badgeCols)*badgeGap,badgeY=180+Math.floor(i/badgeCols)*(badgeSize+30);const art=await R.load(badgeImage(b)),stamp=document.createElement('canvas');stamp.width=120;stamp.height=120;const sc=stamp.getContext('2d');sc.imageSmoothingEnabled=false;sc.drawImage(art,0,0,120,120);if(!earned){sc.globalCompositeOperation='source-in';const shade=sc.createLinearGradient(0,0,120,120);shade.addColorStop(0,'#07050d');shade.addColorStop(1,'#241c31');sc.fillStyle=shade;sc.fillRect(0,0,120,120);}c.save();c.shadowColor=earned?'#0009':'#bca6d45c';c.shadowBlur=2;c.shadowOffsetY=earned?5:2;c.drawImage(stamp,badgeX,badgeY,badgeSize,badgeSize);c.restore();if(BADGES.length<=4)text(earned?'COLLECTED':'NOT COLLECTED',badgeX,badgeY+badgeSize+25,10,'#b79bca','Silkscreen');}
    text('MY TEAM',55,465,16,'#c5a9e0','Silkscreen');
    for(let i=0;i<6;i++){const x=55+i*235,m=state.team[i];if(!m){c.strokeStyle='#594365';c.setLineDash([5,6]);c.strokeRect(x,510,215,280);c.setLineDash([]);text('EMPTY SLOT',x+45,660,13,'#816b93','Silkscreen');continue;}
      const d=byDex(m.dex),color=TYPES[d.types[0]].bg;c.fillStyle=color;c.beginPath();c.arc(x+107,610,96,0,Math.PI*2);c.fill();c.fillStyle='#171123';c.fillRect(x+10,604,194,12);c.drawImage(await R.load(sprite(m)),x-4,494,225,225);c.fillStyle=color;c.fillRect(x,720,215,82);text(d.name,x+10,752,26,'#fff','Pixelify Sans');text(d.types.join(' / '),x+10,781,11,'#f0e6ff','Silkscreen');
    }
    text('VOIDDEX · YOUR STORY, YOUR TEAM',55,865,13,'#a890b9','Silkscreen');
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('The card image could not be created.');download(blob,'void-player-card.png');
  }
  window.VIEWS.Team=function PlayerCard(){
    const [collection,setCollection]=useState(readCollection);
    useEffect(()=>{
      const refresh=()=>setCollection(readCollection());
      const storage=e=>{if(e.key===LIVING_KEY||e.key===null)refresh();};
      window.addEventListener('storage',storage);
      window.addEventListener('void-living-dex-change',refresh);
      window.addEventListener('focus',refresh);
      return()=>{window.removeEventListener('storage',storage);window.removeEventListener('void-living-dex-change',refresh);window.removeEventListener('focus',refresh);};
    },[]);
    const initial=useRef(null);if(!initial.current)initial.current=readSaved();
    const [card,setCard]=useState(initial.current.value),[save,setSave]=useState(''),[error,setError]=useState(initial.current.error),[tab,setTab]=useState('character'),[slot,setSlot]=useState(0),[query,setQuery]=useState(''),[type,setType]=useState(''),[busy,setBusy]=useState(false),[reset,setReset]=useState(false);const upload=useRef();
    useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(card));setSave('Saved on this browser');}catch{setSave('Could not save — download a backup');}},[card]);
    const patch=values=>setCard(c=>({...c,...values}));
    const updateMember=values=>setCard(c=>({...c,team:c.team.map((m,i)=>i===slot?{...m,...values}:m)}));
    const toggleBadge=id=>setCard(c=>({...c,badges:c.badges.includes(id)?c.badges.filter(b=>b!==id):[...c.badges,id]}));
    const choose=d=>{const next={dex:d.dex,variant:'normal',ability:d.abilities[0],nature:'Hardy',moves:['','','','']};setCard(c=>({...c,team:c.team.map((m,i)=>i===slot?next:m)}));};
    const member=card.team[slot],selected=member?byDex(member.dex):null;
    const filtered=available.filter(d=>(!type||d.types.includes(type))&&`${d.name} ${d.dex}`.toLowerCase().includes(query.toLowerCase()));
    const total=card.team.filter(Boolean).length;
    const handleExport=async()=>{setBusy(true);setError('');try{await exportCard(card,readCollection());}catch(e){setError(e.message);}finally{setBusy(false);}};
    const importCard=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>100000)throw new Error('Choose a player-card JSON backup under 100 KB.');const next=normalize(JSON.parse(await file.text()));setCard(next);setError('');}catch(e){setError('Could not import: '+e.message);}e.target.value='';};
    return <div className="pc">
      <header className="pc-top"><div><div className="pc-eyebrow">TRAINER CARD</div><h1>Your story. Your team.</h1><p>Create your trainer, choose your six, and collect your badges.</p></div><div><span role="status" className={'pc-save'+(save.startsWith('Could')?' error':'')}>{save}</span><div className="pc-actions"><button className="pc-btn" onClick={()=>download(new Blob([JSON.stringify(card,null,2)],{type:'application/json'}),'void-player-card.json')}>Back up card</button><button className="pc-btn primary" onClick={handleExport} disabled={busy}>{busy?'Creating image…':'Download card PNG ↗'}</button></div></div></header>
      {error&&<p role="alert" className="pc-inline-error">{error}</p>}
      <section className="pc-card" aria-label="Your player card">
        <div className="pc-card-head"><span>VOIDDEX / TRAINER CARD</span><span>CHAPTER 1</span></div>
        <div className="pc-card-upper"><div className="pc-portrait"><Portrait look={card} onError={setError}/></div><div className="pc-identity"><span className="pc-role">POKÉMON TRAINER</span><h2>{card.name.trim()||'Your name'}</h2><p>{card.tagline}</p><div className="pc-meta"><div><strong>{String(total).padStart(2,'0')}<small style={{fontSize:12,color:'#9d87b2'}}> / 06</small></strong><span>Team members</span></div><div><strong>{String(card.badges.length).padStart(2,'0')}<small style={{fontSize:12,color:'#9d87b2'}}> / 02</small></strong><span>Badges collected</span></div></div></div>
        <div className="pc-badge-board"><div className="pc-eyebrow">BADGE COLLECTION</div><div className={'pc-orbit'+(BADGES.length>4?' expanded':'')} aria-label="Gym badge collection">{BADGES.slice(0,10).map(b=><button key={b.id} className={'pc-badge '+(card.badges.includes(b.id)?'earned':'unearned')} aria-label={`${b.name}: ${card.badges.includes(b.id)?'collected':'not collected'}`} aria-pressed={card.badges.includes(b.id)} title={`Toggle ${b.name}`} onClick={()=>toggleBadge(b.id)}><span className="pc-badge-hollow" style={{maskImage:`url("${badgeImage(b)}")`,WebkitMaskImage:`url("${badgeImage(b)}")`}}/><img src={badgeImage(b)} alt={b.name}/></button>)}</div><div className="pc-badge-caption">Your milestones, collected here.</div></div></div>
        <a className="pc-collection" href="#/living" aria-label="Open Living Dex"><div><span className="pc-eyebrow">LIVING DEX</span><strong>{collection.error ? "Unavailable" : collection.caught+' / '+available.length+' entries caught'}</strong><span>Track your catches in this browser. Each Pokédex entry counts once.</span></div><span>Update collection ›</span></a><div className="pc-team">{card.team.map((m,i)=>{const d=m&&byDex(m.dex);return <div key={i} className="pc-member" style={{'--type':d?TYPES[d.types[0]].bg:'#281c39'}}><span className="pc-slot-number">0{i+1}</span>{d?<button className="pc-member-main" onClick={()=>{setSlot(i);setTab('team');}} aria-label={`Edit slot ${i+1}: ${d.name}`}><div className="pc-ball"><img src={sprite(m)} alt={`${d.name}${m.variant!=='normal'?' · '+m.variant:''}`}/></div><div className="pc-member-info"><strong>{d.name}</strong><div className="pc-types">{d.types.map(t=><span key={t} className="pc-type">{t}</span>)}</div></div></button>:<button className="pc-slot-empty" onClick={()=>{setSlot(i);setTab('team');}} aria-label={`Choose Pokémon for slot ${i+1}`}><b>＋</b><span>Choose a partner</span></button>}</div>;})}</div>
      </section>
      <div className="pc-tabs" role="tablist" aria-label="Player card editor">{[['character','Character'],['team','Team planner'],['badges','Badges'],['coverage','Team coverage']].map(([id,label])=><button key={id} id={'pc-tab-'+id} className="pc-tab" role="tab" aria-selected={tab===id} aria-controls={'pc-panel-'+id} onClick={()=>setTab(id)}>{label}</button>)}</div>
      <section className="pc-editor" role="tabpanel" id={'pc-panel-'+tab} aria-labelledby={'pc-tab-'+tab}>
        {tab==='character'&&<CharacterEditor look={card} onError={setError}><div className="pc-editor-head"><div><h2>Make it yours.</h2><p>The Chapter 1 creator’s characters, hairstyles, colours and poses.</p></div><span className="pc-role">SCHOOL UNIFORM</span></div><div className="pc-fields"><label className="pc-field">Trainer name<input aria-label="Trainer name" maxLength={24} placeholder="Enter your name" value={card.name} onChange={e=>patch({name:e.target.value})}/></label><label className="pc-field">Card message<input aria-label="Card message" maxLength={64} value={card.tagline} onChange={e=>patch({tagline:e.target.value})}/></label><Segments label="Character" value={card.character} options={['Ronan','Nya','Seren'].map(v=>({value:v,label:v}))} onChange={v=>patch({character:v})}/><Segments label="Skin tone" value={card.skin} options={[1,2,3,4].map(v=>({value:v,label:'Tone '+v}))} onChange={v=>patch({skin:v})}/><Segments label="Hairstyle" value={card.hair} options={[1,2,3,4].map(v=>({value:v,label:'Style '+v}))} onChange={v=>patch({hair:v,twoTone:v>2})}/><Segments label="Battle pose" value={card.pose} options={A.POSES.map(p=>({value:p.id,label:p.name}))} onChange={v=>patch({pose:v})}/></div><div className="pc-colors"><Swatches label="Main hair colour" value={card.main} onChange={v=>patch({main:v})}/><div><label className="pc-check"><input type="checkbox" checked={card.twoTone} onChange={e=>patch({twoTone:e.target.checked})}/> Two-tone hair</label><div style={{marginTop:14}}><Swatches label="Accent hair colour" value={card.secondary} disabled={!card.twoTone} onChange={v=>patch({secondary:v})}/></div></div></div><p className="pc-note" style={{marginTop:18}}>School uniform is the current in-game outfit. Appearance changes here only affect your card.</p></CharacterEditor>}
        {tab==='team'&&<><div className="pc-editor-head"><div><h2>Choose your six.</h2><p>Select a slot, then pick a Pokémon. Only revealed wiki entries are included.</p></div><span className="pc-role">{total} / 6 MEMBERS</span></div><div className="pc-targets" role="group" aria-label="Team slots">{card.team.map((m,i)=><button key={i} aria-pressed={i===slot} onClick={()=>setSlot(i)}>{i+1} · {m?byDex(m.dex).name:'Empty'}</button>)}</div>
        {selected&&<div className="pc-member-editor"><div className="pc-member-heading"><div><h3>{selected.name}</h3><span className="pc-note">BST {Object.values(selected.stats).reduce((a,b)=>a+b,0)} · {selected.types.join(' / ')}</span></div><button className="pc-btn" onClick={()=>patch({team:card.team.map((m,i)=>i===slot?null:m)})}>Remove from slot</button></div><div className="pc-fields"><label className="pc-field">Appearance<select aria-label="Pokémon appearance" value={member.variant} onChange={e=>updateMember({variant:e.target.value})}><option value="normal">Normal</option><option value="shiny">Shiny</option>{selected.anomaly&&!selected.anomaly.artPending&&<option value="anomaly">Anomaly</option>}</select></label><label className="pc-field">Ability<select aria-label="Pokémon ability" value={member.ability} onChange={e=>updateMember({ability:e.target.value})}>{abilitiesFor(selected).map(a=><option key={a}>{a}</option>)}</select></label><label className="pc-field">Nature<select aria-label="Pokémon nature" value={member.nature} onChange={e=>updateMember({nature:e.target.value})}>{NATURES.map(n=><option key={n}>{n}</option>)}</select></label></div><div className="pc-moves">{[0,1,2,3].map(i=><label key={i} className="pc-field">Move {i+1}<select aria-label={'Move '+(i+1)} value={member.moves[i]} onChange={e=>updateMember({moves:member.moves.map((m,j)=>j===i?e.target.value:m)})}><option value="">Choose a move</option>{movesFor(selected).filter(m=>m===member.moves[i]||!member.moves.includes(m)).map(m=><option key={m}>{m}</option>)}</select></label>)}</div></div>}
        <div className="pc-picker-toolbar"><input className="pc-search" aria-label="Search Pokémon" placeholder="Search by name or Pokédex number…" value={query} onChange={e=>setQuery(e.target.value)}/><select className="pc-search" aria-label="Filter Pokémon by type" value={type} onChange={e=>setType(e.target.value)}><option value="">All types</option>{Object.keys(TYPES).map(t=><option key={t} value={t}>{TYPES[t].name}</option>)}</select></div><div className="pc-picker-grid">{filtered.map(d=><button className="pc-choice" key={d.dex} aria-pressed={member?.dex===d.dex} aria-label={'Choose '+d.name} onClick={()=>choose(d)}><small>#{d.dex}</small><img src={`sprites/${d.dex}.png`} alt="" loading="lazy"/><strong>{d.name}</strong><div className="pc-types">{d.types.map(t=><span key={t} className="pc-type" style={{background:TYPES[t].bg}}>{t}</span>)}</div></button>)}</div>{!filtered.length&&<p>No Pokémon match those filters.</p>}</>}
        {tab==='badges'&&<><div className="pc-editor-head"><div><h2>A collection worth showing.</h2><p>Mark your earned badges to light up your player card.</p></div><span className="pc-role">{card.badges.length} / {BADGES.length} COLLECTED</span></div><div className="pc-badge-list">{BADGES.map(b=><div className="pc-badge-detail" key={b.id}><img src={badgeImage(b)} alt={b.name} style={{filter:card.badges.includes(b.id)?'none':'grayscale(1)',opacity:card.badges.includes(b.id)?1:.5}}/><div><h3>{b.name}</h3><p>{card.badges.includes(b.id)?'Displayed on your trainer card.':'Not yet in your collection.'}</p><button className="pc-btn" aria-pressed={card.badges.includes(b.id)} onClick={()=>toggleBadge(b.id)}>{card.badges.includes(b.id)?'Mark as not collected':'Mark as collected'}</button></div></div>)}</div><p className="pc-note" style={{marginTop:18}}>Click a badge silhouette to add it; click again to remove it. The collection will expand as more of the ten gyms arrive. This is your personal collection; it does not read your game save.</p></>}
        {tab==='coverage'&&<><div className="pc-editor-head"><div><h2>Know your matchups.</h2><p>Defensive type matchups for your selected team. Abilities and battle effects are not included.</p></div></div>{!total?<p>Choose your first partner to see your team’s coverage.</p>:<div className="pc-coverage">{Object.keys(TYPES).map(t=>{const values=card.team.filter(Boolean).map(m=>byDex(m.dex).types.reduce((v,def)=>v*G.eff(t,def),1));return <div className="pc-coverage-item" key={t} style={{borderTop:'3px solid '+TYPES[t].glow}}><strong>{TYPES[t].name}</strong><span>{values.filter(v=>v>1).length} weak · {values.filter(v=>v>0&&v<1).length} resist</span><span>{values.filter(v=>v===0).length} immune</span></div>;})}</div>}</>}
      </section>
      <div className="pc-bottom"><p>Saved locally in this browser. Clearing site data removes your card; keep a backup to carry it with you.</p><div className="pc-actions"><input ref={upload} hidden type="file" accept=".json,application/json" onChange={importCard}/><button className="pc-btn" onClick={()=>upload.current.click()}>Import backup</button><button className="pc-btn" onClick={()=>setReset(true)}>New card</button></div></div>
      {reset&&<div className="pc-modal-backdrop"><div className="pc-modal" role="dialog" aria-modal="true" aria-labelledby="pc-reset-title"><h2 id="pc-reset-title">Start a new card?</h2><p>This replaces the card saved in this browser. Download a backup first if you want to keep it.</p><div className="pc-actions" style={{marginTop:20}}><button className="pc-btn" autoFocus onClick={()=>setReset(false)}>Keep editing</button><button className="pc-btn primary" onClick={()=>{setCard(fresh());setSlot(0);setReset(false);}}>Start new card</button></div></div></div>}
    </div>;
  };
})();
