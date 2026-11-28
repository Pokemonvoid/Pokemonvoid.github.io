/* Shared pointer gestures for the region and area maps. */
window.VoidMapGestures = function({dragRef,suppressClick,zoomRef,zoomAt,setDragging,onDrag}) {
  const pointers=new Map();
  let pinch=null;
  const geometry=()=>{const [a,b]=[...pointers.values()];return {distance:Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)),x:(a.x+b.x)/2,y:(a.y+b.y)/2};};
  const startDrag=event=>{
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size>=2){
      pinch=geometry();dragRef.current=null;suppressClick.current=true;setDragging(true);onDrag?.();
      for(const id of pointers.keys())event.currentTarget.setPointerCapture(id);
      return;
    }
    suppressClick.current=false;
    dragRef.current={id:event.pointerId,x:event.clientX,y:event.clientY,left:event.currentTarget.scrollLeft,top:event.currentTarget.scrollTop,moved:false};
  };
  const moveDrag=event=>{
    if(!pointers.has(event.pointerId))return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size>=2){
      const next=geometry();event.preventDefault();
      zoomAt(zoomRef.current*next.distance/pinch.distance,pinch.x,pinch.y);
      event.currentTarget.scrollLeft-=next.x-pinch.x;
      event.currentTarget.scrollTop-=next.y-pinch.y;
      pinch=next;suppressClick.current=true;return;
    }
    const drag=dragRef.current;if(!drag||drag.id!==event.pointerId)return;
    const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
    if(!drag.moved&&Math.hypot(dx,dy)<5)return;
    if(!drag.moved){drag.moved=true;event.currentTarget.setPointerCapture(event.pointerId);setDragging(true);onDrag?.();}
    event.preventDefault();event.currentTarget.scrollLeft=drag.left-dx;event.currentTarget.scrollTop=drag.top-dy;
  };
  const endDrag=event=>{
    if(!pointers.has(event.pointerId))return;
    pointers.delete(event.pointerId);
    suppressClick.current=!!(pinch||dragRef.current?.moved||suppressClick.current);
    pinch=null;dragRef.current=null;
    if(pointers.size===1){
      const [id,p]=[...pointers.entries()][0];
      dragRef.current={id,x:p.x,y:p.y,left:event.currentTarget.scrollLeft,top:event.currentTarget.scrollTop,moved:true};
    }else if(pointers.size>=2)pinch=geometry();
    setDragging(pointers.size>0);
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return {startDrag,moveDrag,endDrag};
};
