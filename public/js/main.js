// Stars
const cv=document.getElementById('stars'),cx=cv.getContext('2d');
let st=[];
function rsz(){cv.width=innerWidth;cv.height=innerHeight}
function ist(){st=Array.from({length:150},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.2,ph:Math.random()*Math.PI*2,sp:Math.random()*.007+.002}))}
function dst(t){cx.clearRect(0,0,cv.width,cv.height);st.forEach(s=>{const a=.2+.55*Math.sin(t*s.sp+s.ph);cx.beginPath();cx.arc(s.x,s.y,s.r,0,Math.PI*2);cx.fillStyle=`rgba(200,215,255,${a})`;cx.fill()});requestAnimationFrame(dst)}
rsz();ist();requestAnimationFrame(dst);
addEventListener('resize',()=>{rsz();ist()});

// Tabs
document.querySelectorAll('.nav-link').forEach(l=>{
  l.addEventListener('click',()=>{
    document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    l.classList.add('active');
    document.getElementById('tab-'+l.dataset.tab)?.classList.add('active');
  });
});

// Proxy
function buildUrl(raw){
  let url=raw.trim();
  if(!/^https?:\/\//.test(url)&&!/^[\w-]+\.[a-z]{2,}/.test(url))
    url='https://www.google.com/search?q='+encodeURIComponent(url);
  else if(!/^https?:\/\//.test(url)) url='https://'+url;
  if(typeof __uv$config!=='undefined') return __uv$config.prefix+__uv$config.encodeUrl(url);
  return url;
}
const overlay=document.getElementById('proxy-overlay');
const frame=document.getElementById('proxy-frame');
const urlDisplay=document.getElementById('proxy-url-display');
let curUrl='';
function openProxy(raw){curUrl=raw;urlDisplay.textContent=raw;frame.src=buildUrl(raw);overlay.classList.remove('hidden');document.body.style.overflow='hidden'}
function closeProxy(){overlay.classList.add('hidden');frame.src='about:blank';document.body.style.overflow='';curUrl=''}
document.getElementById('proxy-close').addEventListener('click',closeProxy);
document.getElementById('proxy-back').addEventListener('click',()=>{try{frame.contentWindow.history.back()}catch(_){}});
document.getElementById('proxy-forward').addEventListener('click',()=>{try{frame.contentWindow.history.forward()}catch(_){}});
document.getElementById('proxy-reload').addEventListener('click',()=>{frame.src=frame.src});
document.getElementById('proxy-newtab').addEventListener('click',()=>window.open(buildUrl(curUrl),'_blank'));
document.getElementById('go-btn').addEventListener('click',()=>{const v=document.getElementById('proxy-input').value.trim();if(v)openProxy(v)});
document.getElementById('proxy-input').addEventListener('keydown',e=>{if(e.key==='Enter'){const v=e.target.value.trim();if(v)openProxy(v)}});
document.querySelectorAll('.hint').forEach(h=>h.addEventListener('click',()=>{document.getElementById('proxy-input').value=h.dataset.q;openProxy(h.dataset.q)}));
document.querySelectorAll('.qbtn').forEach(b=>b.addEventListener('click',()=>openProxy(b.dataset.url)));
document.querySelectorAll('.gcard').forEach(c=>c.addEventListener('click',()=>openProxy(c.dataset.url)));
document.querySelectorAll('.acard').forEach(c=>c.addEventListener('click',()=>openProxy(c.dataset.url)));

// Settings
document.getElementById('apply-preset').addEventListener('click',()=>{
  const v=document.getElementById('cloak-preset').value;if(!v)return;
  const[t,i]=v.split('|');
  if(t)document.title=t;
  let lk=document.querySelector("link[rel~='icon']");
  if(!lk){lk=document.createElement('link');lk.rel='icon';document.head.appendChild(lk)}
  lk.href=i;localStorage.setItem('ct',t);localStorage.setItem('ci',i);
});
let pk=localStorage.getItem('pk')||'Escape';
let pu=localStorage.getItem('pu')||'https://classroom.google.com';
document.getElementById('panic-key').value=pk;
document.getElementById('panic-url').value=pu;
document.getElementById('save-panic').addEventListener('click',()=>{
  pk=document.getElementById('panic-key').value;
  pu=document.getElementById('panic-url').value||'https://classroom.google.com';
  localStorage.setItem('pk',pk);localStorage.setItem('pu',pu);
});
document.addEventListener('keydown',e=>{if(e.key===pk&&!e.ctrlKey&&!e.metaKey)location.replace(pu)});
const ct=localStorage.getItem('ct');const ci=localStorage.getItem('ci');
if(ct)document.title=ct;
if(ci){let lk=document.querySelector("link[rel~='icon']");if(lk)lk.href=ci}
window.addEventListener('load',()=>{
  const s=document.getElementById('status-display');
  if(typeof __uv$config!=='undefined')
    s.innerHTML='<span style="color:#34d399">✓ Ultraviolet active</span> — prefix: <code style="color:#7c8fff">'+__uv$config.prefix+'</code>';
  else s.innerHTML='<span style="color:#ff4d6d">✗ UV not loaded</span> — check server logs';
});
