(()=>{
'use strict';
const pages=window.SLIDES,stage=document.querySelector('#stage'),slide=document.querySelector('#slide'),viewport=document.querySelector('#viewport'),counter=document.querySelector('#counter');
const eventName='2027新品推介会<br>暨品牌招商会',hotel='南昌施柏阁大观酒店';
const logo='<img class="brand-logo" src="assets/9bffe3e2de8b1602.webp" alt="回力">';
const shoe='<img class="collage-shoe" src="assets/b2dd9bd1a73dd3f2.webp" alt="回力国潮拼贴帆布鞋插图">';
const navURL='https://uri.amap.com/search?keyword='+encodeURIComponent(hotel)+'&city='+encodeURIComponent('南昌')+'&view=map';
let index=0,lastTurn=0,touchStart=null,leaving=null,pageMotion=null,entranceTimer=null;const albums=new Map(),draft={};
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const choreography=[
 {name:'cosmic',settle:2100},{name:'impact',settle:1550},{name:'mirror',settle:1800},
 {name:'sprint',settle:1500},{name:'heritage',settle:2350},{name:'turntable',settle:2150},
 {name:'blinds',settle:1900},{name:'relay',settle:2000},{name:'envelope',settle:2450},
 {name:'timeline',settle:2100},{name:'locate',settle:2150},{name:'fields',settle:2000},{name:'resolve',settle:2650}
];
function entranceFrames(scene,direction){
 const d=direction;
 return [
  [{opacity:0,transform:'scale(1.16)'},{opacity:1,transform:'scale(1)'}],
  [{transform:`translateY(${-d*16}%) scale(1.12)`,opacity:.4},{transform:'translateY(0) scale(1)',opacity:1}],
  [{clipPath:'inset(0 50% 0 50%)'},{clipPath:'inset(0 0% 0 0%)'}],
  [{transform:`translate(${d*55}%,${d*22}%) skewX(-8deg)`},{transform:'translate(0,0) skewX(0deg)'}],
  [{clipPath:'inset(100% 0 0 0)',transform:'scale(1.04)'},{clipPath:'inset(0 0 0 0)',transform:'scale(1)'}],
  [{transform:`perspective(1100px) rotateY(${d*18}deg) scale(.94)`,opacity:0},{transform:'perspective(1100px) rotateY(0deg) scale(1)',opacity:1}],
  [{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}],
  [{transform:`translateX(${-d*70}%)`,opacity:.5},{transform:'translateX(0)',opacity:1}],
  [{transform:'perspective(1200px) rotateX(-14deg) translateY(7%)',opacity:.3},{transform:'perspective(1200px) rotateX(0deg) translateY(0)',opacity:1}],
  [{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],
  [{transform:'scale(1.18)',filter:'blur(3px)',opacity:.2},{transform:'scale(1)',filter:'blur(0px)',opacity:1}],
  [{transform:'translateY(10%) scale(.96)',opacity:0},{transform:'translateY(0) scale(1)',opacity:1}],
  [{clipPath:'circle(12% at 50% 40%)',opacity:.4},{clipPath:'circle(110% at 50% 40%)',opacity:1}]
 ][scene];
}

const stamp=(cls='')=>`<div class="stamp ${cls}" aria-label="百年回力，回天之力"><span class="stamp-a" aria-hidden="true">百年<br>回力</span><span class="stamp-b" aria-hidden="true">回天<br>之力</span></div>`;
const sidebands=()=>{const words='WARRIOR 2027　➤　POWER OF TIMES　➤　1927—2027　➤　';const band=`<span class="band-track"><span>${words.repeat(2)}</span><span>${words.repeat(2)}</span></span>`;return `<div class="sideband left" aria-hidden="true">${band}</div><div class="sideband right" aria-hidden="true">${band}</div>`;};
const signature=()=>'<div class="page-signature">百年回力 · 回天之力</div>';
const pattern=()=>'<div class="pattern-layer" aria-hidden="true"></div>';
const corners=()=>`<div class="corner-characters" aria-hidden="true">${['cd69414e81e15b6c','b489aceb3f53bf48','cbd01171321d64af','4da1414aafa013a7'].map((s,i)=>`<img class="corner c${i}" src="assets/${s}.webp" alt="">`).join('')}</div>`;
const orbit=()=>`<svg class="orbit" viewBox="0 0 375 780" aria-hidden="true"><defs><path id="orbit-path" d="M187.5 128 A169 252 0 1 1 187.5 632 A169 252 0 1 1 187.5 128"/></defs><text><textPath href="#orbit-path" textLength="1350" lengthAdjust="spacingAndGlyphs">WARRIOR 2027 NEW PRODUCT CONFERENCE　WARRIOR POWER OF TIMES　WARRIOR 2027 NEW PRODUCT CONFERENCE　</textPath></text></svg>`;
function gallery(p){
 const active=albums.get(index)||0,group=Math.floor(active/4),visible=p.photos.slice(group*4,group*4+4);
 return `<div class="gallery-heading"><b>${p.label}</b><span>1927—2027</span></div><div class="photo-strips">${visible.map((n,i)=>`<figure><figcaption><b>WARRIOR</b><span>${p.label} ${String(group*4+i+1).padStart(2,'0')}</span><i aria-hidden="true">➤</i></figcaption><button data-photo="${n}" aria-label="放大${p.label}第${group*4+i+1}张照片"><img src="assets/event-${String(n).padStart(2,'0')}.jpg" alt="${p.label}第${group*4+i+1}张照片" loading="eager"></button></figure>`).join('')}</div><div class="album-controls" aria-label="照片分组">${Array.from({length:Math.ceil(p.photos.length/4)},(_,i)=>`<button data-album="${i*4}" class="${i===group?'selected':''}" aria-pressed="${i===group}" aria-label="查看第${i*4+1}至${Math.min(i*4+4,p.photos.length)}张照片">${i*4+1}—${Math.min(i*4+4,p.photos.length)}</button>`).join('')}<span>点击照片放大</span></div>`;
}
function paper(inner,cls){return `${pattern()}<div class="paper ${cls}"><div class="paper-inside">${inner}</div></div>${signature()}`;}
function content(p){switch(p.kind){
case 'cover':return `<img class="galaxy" src="assets/galaxy-clean-v2.png" alt="">${orbit()}${corners()}${stamp('cover-stamp')}<p class="cover-slogan">穿回力，无压力</p><p class="cover-years">1927—2027</p><h1 class="cover-event">${eventName}</h1><div class="cover-location">12月8日 · 南昌</div>`;
case 'statement':return `<div class="statement-bg ${p.art?'art-bg':p.tone==='red'?'red-bg':'blue-bg'}" aria-hidden="true"></div>${pattern()}${sidebands()}<div class="statement-copy"><p class="statement-english">${p.english}</p><p class="statement-small">${p.title}<br>${p.line}</p><span class="brand-block">中国回力</span><h1>百年回力</h1><h2 class="power-tag ${p.tag==='自信之力'?'solid':''}">是${p.tag}</h2><div class="statement-lines">${p.title}<br>${p.line}</div></div><div class="statement-logo">${logo}</div><p class="statement-slogan">穿回力，无压力</p>`;
case 'century':return `${pattern()}${sidebands()}<div class="century-top">中国回力　1927—2027</div><h1 class="century-title"><span>百年</span><span>回力</span></h1><h2 class="century-sub">回天之力</h2><p class="century-slogan">穿回力，无压力</p><div class="century-shoe">${shoe}</div><div class="century-bottom"><span>1927</span><i></i><span>2027</span></div>`;
case 'product':return `${pattern()}${sidebands()}<div class="warrior-word" aria-hidden="true">WARRIOR</div><div class="product-brand">${logo}<span>×</span><b>中国<br>国潮</b></div><h1 class="product-title">2027新品推介会<br>暨品牌招商会</h1><h2 class="product-theme">百年回力，回天之力<br>穿回力，无压力</h2><p class="product-years">1927—2027</p><span class="product-brand-label">中国回力</span><div class="product-shoe">${shoe}</div>`;
case 'gallery':return `${pattern()}${gallery(p)}`;
case 'invitation':return paper(`<div class="letter-brand"><span>中国心</span>${stamp('letter-stamp')}<span>国货强</span></div><p class="letter-event">${eventName}</p><h1>诚挚邀您莅临</h1><p class="letter-theme">百年回力，回天之力</p><div class="letter-details"><p><span>活动时间</span><strong>12月8日</strong></p><p><span>活动地点</span><strong>${hotel}</strong></p><address>江西省南昌市红谷滩区<br>九龙湖管理处南龙蟠街333号</address></div><p class="letter-slogan">穿回力，无压力</p><div class="letter-logo">${logo}</div><p class="letter-years">1927—2027</p>`,'invitation');
case 'agenda':return paper(`<div class="paper-heading"><h1>活动议程</h1><span>12月8日</span></div><p class="paper-event">2027新品推介会暨品牌招商会</p><ol>${p.rows.map(r=>`<li><time>${r[0]}</time><div><b>${r[1]}</b>${r[2]?`<small>${r[2]}</small>`:''}</div></li>`).join('')}</ol><div class="paper-note">${hotel}</div><div class="agenda-logo">${logo}</div>`,'agenda');
case 'venue':return paper(`<div class="paper-heading"><h1>活动地点</h1><span>南昌</span></div><h2>${hotel}</h2><address>${p.address}</address><button class="map-photo" data-map aria-label="放大酒店地图"><img src="assets/venue-map.jpg" alt="南昌施柏阁大观酒店周边地图及地址"></button><a class="primary-button" href="${navURL}" target="_blank" rel="noopener">打开地图导航 ↗</a>`,'venue');
case 'rsvp':return `<p class="rsvp-english">CHINA’S WARRIOR<br><span>CHINESE TREND</span></p><img class="outline-brand" src="assets/445632640c81b8ef.webp" alt="中国回力"><h1 class="rsvp-title">参会登记</h1><p class="rsvp-event">2027新品推介会暨品牌招商会</p><form class="rsvp-form">${[['region','所在区域','text'],['name','姓名','text'],['count','参会人数','number'],['arrival','抵达时间','text'],['phone','联系电话','tel']].map(([n,l,t])=>`<label><span class="sr-only">${l}</span><input name="${n}" aria-label="${l}" type="${t}" required ${t==='number'?'min="1" step="1"':''} ${t==='tel'?'inputmode="tel"':''} autocomplete="${n==='name'?'name':n==='phone'?'tel':'off'}" placeholder="${l}"></label>`).join('')}<button class="primary-button" type="submit">确认参会信息</button></form><div class="rsvp-logo">${logo}</div>${signature()}`;
case 'end':return `<img class="galaxy end-galaxy" src="assets/galaxy-clean-v2.png" alt="">${corners()}${stamp('end-stamp')}<h1 class="end-theme">百年回力，回天之力</h1><p class="end-slogan">穿回力，无压力</p><h2 class="end-event">${eventName}</h2><p class="end-location">12月8日 · ${hotel}</p><button class="replay-button" data-replay>返回首页</button>`;
}}
function resize(){const scale=Math.min(innerWidth/375,innerHeight/780,1.12);stage.style.transform=`translate(-50%,-50%) scale(${scale})`;}
function initMotion(){
 const svg=slide.querySelector('.orbit'),path=svg?.querySelector('path'),text=svg?.querySelector('textPath');
 if(svg&&path&&text){
  const length=path.getTotalLength(),words=text.textContent;
  text.textContent=words+words;text.setAttribute('textLength',String(length*2));text.setAttribute('startOffset',String(-length));
  const animation=document.createElementNS('http://www.w3.org/2000/svg','animate');
  for(const [key,value] of Object.entries({attributeName:'startOffset',from:String(-length),to:'0',dur:'38s',repeatCount:'indefinite'}))animation.setAttribute(key,value);
  text.append(animation);if(reducedMotion.matches)svg.pauseAnimations();
 }
 const title=index===2?slide.querySelector('.statement-copy h1'):null;
 if(title){const copy=title.textContent;title.setAttribute('aria-label',copy);title.innerHTML=Array.from(copy).map((char,n)=>`<span class="mirror-char" aria-hidden="true" style="--char:${n};--mirror:${n<2?-1:1}">${char}</span>`).join('');}
 if(index===4)for(const year of slide.querySelectorAll('.century-bottom>span')){const copy=year.textContent;year.setAttribute('aria-label',copy);year.innerHTML=Array.from(copy).map((digit,n)=>`<span class="year-digit" aria-hidden="true" style="--digit:${n}">${digit}</span>`).join('');}
 slide.querySelectorAll('.photo-strips figure,.agenda li,.rsvp-form label').forEach((el,n)=>el.style.setProperty('--order',n));
}
function show(i){
 const next=Math.max(0,Math.min(pages.length-1,i)),direction=Math.sign(next-index),hasScene=!!slide.firstElementChild;
 clearTimeout(entranceTimer);pageMotion?.cancel();leaving?.remove();leaving=null;
 if(hasScene&&direction&&!reducedMotion.matches){
  leaving=slide.cloneNode(true);leaving.removeAttribute('id');leaving.removeAttribute('aria-live');leaving.setAttribute('aria-hidden','true');leaving.inert=true;leaving.classList.add('page-outgoing');
  const path=leaving.querySelector('[id="orbit-path"]');if(path){path.id='orbit-path-outgoing';leaving.querySelector('textPath')?.setAttribute('href','#orbit-path-outgoing');}
  leaving.querySelectorAll('svg').forEach(x=>x.pauseAnimations());stage.insertBefore(leaving,slide);
 }
 index=next;const p=pages[index];viewport.dataset.tone=(p.kind==='cover'||p.kind==='end')?'black':p.tone;
 slide.className=`page page-${p.kind} tone-${p.tone} scene-${String(index+1).padStart(2,'0')}${p.art?' with-art':''}`;slide.dataset.motion=choreography[index].name;slide.innerHTML=content(p);slide.setAttribute('aria-label',`第${index+1}页，共${pages.length}页：${p.label}`);
 counter.textContent=`${index+1} / ${pages.length}`;document.querySelector('#progress').style.width=`${(index+1)/pages.length*100}%`;
 document.querySelector('#prev').disabled=index===0;document.querySelector('#next').disabled=index===pages.length-1;
 if(p.kind==='rsvp')for(const input of slide.querySelectorAll('input'))input.value=draft[input.name]||'';
 initMotion();
 if(!reducedMotion.matches)entranceTimer=setTimeout(()=>{for(const a of slide.getAnimations({subtree:true})){const timing=a.effect?.getTiming();if(timing&&timing.iterations!==Infinity)try{a.finish()}catch{}}},choreography[index].settle);
 if(leaving){
  const old=leaving,options={duration:420,easing:'cubic-bezier(.22,.75,.25,1)',fill:'both'};
  old.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(${-direction*18}%)`,opacity:.45}],options);
  pageMotion=slide.animate(entranceFrames(index,direction),options);
  const incoming=pageMotion;
  const cleanup=setTimeout(()=>{if(leaving===old){incoming.finish();old.remove();leaving=null;}},480);
  incoming.finished.then(()=>{clearTimeout(cleanup);old.remove();if(leaving===old)leaving=null;}).catch(()=>{clearTimeout(cleanup);old.remove();});
 }
}
function turn(delta){if(document.querySelector('dialog[open]')||Date.now()-lastTurn<420)return;const n=index+delta;if(n<0||n>=pages.length)return;lastTurn=Date.now();show(n);}
function openPhoto(src){const returnFocus=document.activeElement,d=document.createElement('dialog');d.className='photo-lightbox';d.setAttribute('aria-label','放大查看图片');d.innerHTML='<button class="close-photo" aria-label="关闭照片">×</button><img alt="放大查看图片">';d.querySelector('img').src=src;document.body.append(d);d.querySelector('button').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()};d.onclose=()=>{d.remove();returnFocus?.focus()};d.showModal();}
slide.addEventListener('click',e=>{const t=e.target.closest('[data-album]');if(t){albums.set(index,Number(t.dataset.album));show(index);slide.querySelector(`[data-album="${t.dataset.album}"]`).focus();return;}const p=e.target.closest('[data-photo]');if(p){openPhoto(`assets/event-${String(p.dataset.photo).padStart(2,'0')}.jpg`);return;}if(e.target.closest('[data-map]'))openPhoto('assets/venue-map.jpg');if(e.target.closest('[data-replay]'))show(0);});
slide.addEventListener('input',e=>{if(e.target.matches('input'))draft[e.target.name]=e.target.value;});
slide.addEventListener('submit',e=>{
 e.preventDefault();if(!e.target.reportValidity())return;
 const modal=document.createElement('dialog');modal.className='confirmation-dialog';modal.setAttribute('aria-labelledby','confirmation-title');
 modal.innerHTML='<h2 id="confirmation-title">参会信息确认</h2><dl></dl><div class="confirmation-actions"><button type="button" data-edit>返回修改</button><button type="button" data-confirm>确认信息</button></div>';
 const labels={region:'所在区域',name:'姓名',count:'参会人数',arrival:'抵达时间',phone:'联系电话'};
 for(const [key,label] of Object.entries(labels)){const row=document.createElement('div'),term=document.createElement('dt'),value=document.createElement('dd');term.textContent=label;value.textContent=draft[key]||'';row.append(term,value);modal.querySelector('dl').append(row);}
 document.body.append(modal);modal.querySelector('[data-edit]').onclick=()=>modal.close();modal.querySelector('[data-confirm]').onclick=()=>{modal.close();const n=document.querySelector('#notice');n.textContent='参会信息已确认';n.classList.add('show');setTimeout(()=>n.classList.remove('show'),2400);};modal.onclose=()=>modal.remove();modal.showModal();
});
document.querySelector('#prev').onclick=()=>turn(-1);document.querySelector('#next').onclick=()=>turn(1);
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select')||document.querySelector('dialog[open]'))return;if(['ArrowDown','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();turn(1)}if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();turn(-1)}});
viewport.addEventListener('wheel',e=>{if(document.querySelector('dialog[open]')||e.target.closest('input'))return;e.preventDefault();if(Math.abs(e.deltaY)>15)turn(e.deltaY>0?1:-1);},{passive:false});
viewport.addEventListener('touchstart',e=>{touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY,target:e.target}},{passive:true});
viewport.addEventListener('touchend',e=>{if(!touchStart)return;const start=touchStart;touchStart=null;if(start.target.closest('input,textarea,button,a,dialog'))return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dy)>50&&Math.abs(dy)>Math.abs(dx))turn(dy<0?1:-1);},{passive:true});
reducedMotion.addEventListener('change',()=>{for(const svg of slide.querySelectorAll('svg'))reducedMotion.matches?svg.pauseAnimations():svg.unpauseAnimations();if(reducedMotion.matches){pageMotion?.cancel();leaving?.remove();leaving=null;}});
addEventListener('resize',resize);resize();show(0);
})();
