/* Character compositing and hair ramps from the supplied Chapter 1 creator. */
window.VoidPlayerRenderer = (() => {
  const A = window.VOID_PLAYER_ASSETS, files = new Set(A.files), images = new Map();
  const rgb = n => [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const lum = n => { const [r,g,b]=rgb(n); return .299*r+.587*g+.114*b; };
  const load = src => {
    if (!images.has(src)) images.set(src,new Promise((resolve,reject)=>{ const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>{images.delete(src);reject(new Error('Could not load '+src));};image.src=src; }));
    return images.get(src);
  };
  function ramp(index,t) {
    const positions=[0,.2,.42,.62,1],keys=A.PALETTE[index-1][1];t=Math.max(0,Math.min(1,t));
    for(let i=0;i<4;i++)if(t<=positions[i+1]){const a=rgb(keys[i]),b=rgb(keys[i+1]),f=(t-positions[i])/(positions[i+1]-positions[i]);return a.map((v,j)=>Math.round(v+(b[j]-v)*f));}
    return rgb(keys[4]);
  }
  function family(list,anchor,index,t0=.62) {
    const result=new Map();if(!list.length||!index)return result;
    const values=list.map(lum),lo=Math.min(...values),hi=Math.max(...values),mid=anchor||values.reduce((a,b)=>a+b,0)/values.length;
    list.forEach((n,i)=>{const l=values[i];const t=l<=mid?t0-Math.pow(mid>lo?(mid-l)/(mid-lo):0,1.5)*.5:t0+(hi>mid?(l-mid)/(hi-mid):0)*.32;result.set(n,ramp(index,t));});return result;
  }
  const merge = (a,b) => {for(const [k,v] of b)a.set(k,v);return a;};
  function hairMap(look,one) {
    const key=look.character==='Nya'?'nia':look.character.toLowerCase(),style=look.hair;
    const [main,accent]=A.TABLE[key][style],anchors=A.ANCHOR[key][style],shade=A.SHADE[key]?.[style]||[];
    let map=new Map();
    if(one) map=family((A.TABLE_ONE_TONE[key]?.[style]||[...main,...accent]).filter(c=>!shade.includes(c)),A.ANCHOR_ONE[key]?.[style],look.main);
    else if(look.twoTone){map=family(main,anchors[0],look.main);merge(map,family(accent,anchors[1],look.secondary));}
    else if(look.main)map=family([...main,...accent],anchors[0],look.main);
    else {
      const normalize=list=>{const vals=list.map(lum),lo=Math.min(...vals),span=Math.max(...vals)-lo||1;return vals.map(v=>(v-lo)/span);};
      const m=normalize(main),a=normalize(accent);accent.forEach((n,i)=>{let closest=0;for(let j=1;j<m.length;j++)if(Math.abs(m[j]-a[i])<Math.abs(m[closest]-a[i]))closest=j;map.set(n,rgb(main[closest]));});
    }
    const shades=family(shade,anchors[2],look.main,.45);for(const [n,c] of shades){const l=.299*c[0]+.587*c[1]+.114*c[2];map.set(n,c.map(v=>Math.round((v+l)/2)));}return map;
  }
  async function render(look,kind='front') {
    const folder=kind==='front'?A.POSES[look.pose-1].folder:'UI';
    const base=`player-assets/${look.character}/${folder}`;
    const skin=base+`/skin/${look.skin}.png`,clothes=A.files.find(f=>f.startsWith(base+'/clothes/')&&f.endsWith('.png'));
    let hair=base+`/hair/${look.hair}.png`;const alternate=base+`/hair_1tone/${look.hair}.png`,one=!look.twoTone&&files.has(alternate);if(one)hair=alternate;
    const [body,outfit,head]=await Promise.all([load(skin),clothes?load(clothes):null,load(hair)]);
    const canvas=document.createElement('canvas');canvas.width=body.width;canvas.height=body.height;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(body,0,0);if(outfit)ctx.drawImage(outfit,0,0);
    const layer=document.createElement('canvas');layer.width=head.width;layer.height=head.height;const lc=layer.getContext('2d');lc.drawImage(head,0,0);const pixels=lc.getImageData(0,0,layer.width,layer.height),map=hairMap(look,one);
    const key=look.character==='Nya'?'nia':look.character.toLowerCase(),keep=A.KEEP[key]?.[look.hair]?.[folder]||[],mainColors=new Set(A.TABLE[key][look.hair][0]);
    for(let i=0;i<pixels.data.length;i+=4){if(!pixels.data[i+3])continue;const n=(pixels.data[i]<<16)|(pixels.data[i+1]<<8)|pixels.data[i+2],x=(i/4)%layer.width,y=Math.floor(i/4/layer.width);if(keep.some(([rx,ry,w,h])=>x>=rx&&x<rx+w&&y>=ry&&y<ry+h)&&!mainColors.has(n))continue;const c=map.get(n);if(c){pixels.data[i]=c[0];pixels.data[i+1]=c[1];pixels.data[i+2]=c[2];}}
    lc.putImageData(pixels,0,0);ctx.drawImage(layer,0,0);return canvas;
  }
  return {render,load};
})();
