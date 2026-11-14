const UI={
 brand:{en:"Tareekh ul Khulafa",ur:"تاریخ الخلفاء"},
 nHome:{en:"Home",ur:"ہوم"},nSul:{en:"Caliphs",ur:"خلفاء"},nTime:{en:"Timeline",ur:"ٹائم لائن"},
 hero:{en:"The Caliphs of Islam",ur:"خلفائے اسلام"},
 heroP:{en:"Explore the lives, conquests, families and legacies of the caliphs, beginning with the Rightly Guided Caliphs. Based on Tarikh al-Khulafa by Imam Jalal al-Din al-Suyuti.",ur:"خلفائے راشدین سے آغاز کرتے ہوئے خلفاء کی زندگی، فتوحات، خاندان اور میراث کے بارے میں جانیں۔ ماخذ: تاریخ الخلفاء، امام جلال الدین سیوطی۔"},
 search:{en:"Search a caliph (e.g. Abu Bakr, Umar)…",ur:"خلیفہ تلاش کریں (مثلاً ابوبکر، عمر)…"},
 secSearch:{en:"Search sections: wars, death, sons, daughters…",ur:"حصے تلاش کریں: جنگیں، وفات، بیٹے، بیٹیاں…"},
 light:{en:"Light mode",ur:"روشن موڈ"},dark:{en:"Dark mode",ur:"ڈارک موڈ"},page:{en:"Page",ur:"صفحہ"},prev:{en:"Previous",ur:"پچھلا"},next:{en:"Next",ur:"اگلا"},
 none:{en:"No result found",ur:"کوئی نتیجہ نہیں ملا"},
 all:{en:"All Caliphs",ur:"تمام خلفاء"},allSub:{en:"Choose a caliph to read his full profile",ur:"مکمل تعارف پڑھنے کے لیے خلیفہ منتخب کریں"},
 back:{en:"Back",ur:"واپس"},read:{en:"Read more",ur:"مزید پڑھیں"},soon:{en:"Profile coming soon",ur:"تفصیلی تعارف جلد شامل ہوگا"},soonMsg:{en:"The detailed profile of this caliph is being prepared and will be added soon.",ur:"اس خلیفہ کا تفصیلی تعارف تیار کیا جا رہا ہے اور جلد شامل کیا جائے گا۔"},
 born:{en:"Born",ur:"پیدائش"},reign:{en:"Khilafat",ur:"دورِ خلافت"},died:{en:"Died",ur:"وفات"},type:{en:"Known for",ur:"شہرت"},
 tlTitle:{en:"Timeline of Caliphs",ur:"خلفاء کی ٹائم لائن"},
 stSul:{en:"Caliphs",ur:"خلفاء"},stYears:{en:"Years",ur:"سال"},
 src:{en:"Reference: Tarikh al-Khulafa by Imam Jalal al-Din al-Suyuti; detailed original summaries based on the supplied editions, not a verbatim reproduction.",ur:"ماخذ: تاریخ الخلفاء، امام جلال الدین سیوطی؛ فراہم کردہ نسخوں کی بنیاد پر مفصل اصل خلاصے، لفظی نقل نہیں۔"}
};
let lang=localStorage.getItem("lang")||"en", theme=localStorage.getItem("theme")||"dark";
const $=s=>document.querySelector(s);
const LANGS=["en","ur","both"], LBL={en:"ENG",ur:"اردو",both:"ENG + اردو"};
function tx(o){
 if(lang==="both") return `<span class="en">${o.en}</span><span class="ur">${o.ur}</span>`;
 return o[lang];
}
function plain(o){return lang==="both"?o.en+" / "+o.ur:o[lang]}
function chrome(){
 document.documentElement.dir=lang==="ur"?"rtl":"ltr";
 document.documentElement.lang=lang==="ur"?"ur":"en";
 document.documentElement.dataset.theme=theme;
 document.body.classList.toggle("both",lang==="both");
 $("#langBtn").textContent=LBL[lang];
 $("#themeBtn").textContent=plain(theme==="dark"?UI.light:UI.dark);
 $("#brandText").innerHTML=tx(UI.brand);
 $("#nHome").innerHTML=tx(UI.nHome);$("#nSul").innerHTML=tx(UI.nSul);$("#nTime").innerHTML=tx(UI.nTime);
 $("#srcNote").innerHTML=tx(UI.src);
}
const norm=s=>(s||"").toLowerCase();
function card(s){return `<a class="card" href="#/sultan/${s.id}"><small>#${s.n}</small><h3>${tx(s.name)}</h3><small>${tx(s.epithet)}</small><br><span class="badge${s.stub?" soon":""}">${s.reign}</span><p style="margin-top:.6rem;color:var(--muted)">${s.stub?tx(UI.soon):tx(s.type)}</p><p style="margin-top:.5rem;font-weight:600">${tx(UI.read)}</p></a>`}
function home(){
 $("#app").innerHTML=`<section class="hero"><div class="orn"></div><h1>${tx(UI.hero)}</h1><p>${tx(UI.heroP)}</p>
 <div class="sw"><input id="q" autocomplete="off" placeholder="${plain(UI.search)}"><div id="res"></div></div>
 <div class="stats"><div class="stat"><b>5</b>${tx(UI.stSul)}</div><div class="stat"><b>29</b>${tx(UI.stYears)}</div></div></section>
 <div class="wrap"><h2 class="stitle">${tx(UI.all)}</h2><p class="ssub">${tx(UI.allSub)}</p><div class="grid">${ALL.map(card).join("")}</div></div>`;
 $("#q").addEventListener("input",e=>{
  const v=norm(e.target.value.trim()),r=$("#res");
  if(!v){r.innerHTML="";return}
  const hits=ALL.filter(s=>[s.name.en,s.name.ur,s.epithet.en,s.epithet.ur,s.type.en].some(x=>norm(x).includes(v)));
  r.innerHTML=`<div class="results">${hits.length?hits.map(s=>`<a href="#/sultan/${s.id}"><span>${plain(s.name)}</span><small>${s.reign}</small></a>`).join(""):`<div class="nores">${plain(UI.none)}</div>`}</div>`;
 });
}
function sultans(){
 $("#app").innerHTML=`<div class="wrap"><h2 class="stitle">${tx(UI.all)}</h2><p class="ssub">${tx(UI.allSub)}</p><div class="grid">${ALL.map(card).join("")}</div></div>`;
}
function timeline(){
 $("#app").innerHTML=`<div class="wrap"><h2 class="stitle">${tx(UI.tlTitle)}</h2><p class="ssub"></p><div class="tl">${ALL.map(s=>`<a href="#/sultan/${s.id}"><b>${s.reign}</b><br>${tx(s.name)}${s.stub?"":" - <small>"+tx(s.epithet)+"</small>"}</a>`).join("")}</div></div>`;
}
function P(x){return Array.isArray(x)?x:[x]}
function bodyHtml(b){
 const en=P(b.en).map(x=>`<p>${x}</p>`).join(""),ur=P(b.ur).map(x=>`<p>${x}</p>`).join("");
 if(lang==="both")return `<div class="en">${en}</div><div class="ur">${ur}</div>`;
 return lang==="en"?en:ur;
}
function sultan(id){
 const s=ALL.find(x=>x.id===id); if(!s){location.hash="#/";return}
 const N=s.sections.length; let p=0,v="";
 const F=(k,val)=>`<div class="fact"><small>${tx(UI[k])}</small>${val}</div>`;
 $("#app").innerHTML=`<section class="shero"><h1>${tx(s.name)}</h1><p>${tx(s.epithet)}</p>
 <div class="facts">${s.stub?F("reign",s.reign):F("born",s.born)+F("reign",s.reign)+F("died",s.died)+F("type",tx(s.type))}</div></section>
 <div class="wrap"><a class="back" href="#/sultans">${tx(UI.back)}</a>
 ${s.stub?`<div class="notice">${tx(UI.soonMsg)}</div>`:""}
 <div class="ss"${s.stub?" hidden":""}><input id="sq" placeholder="${plain(UI.secSearch)}"></div>
 <div class="chips"${s.stub?" hidden":""}>${s.sections.map((x,i)=>`<button class="chip" data-p="${i}">${i+1}. ${tx(x.title)}</button>`).join("")}</div>
 <div id="secs"></div><div id="pager" class="pager"></div></div>`;
 const art=(x,i)=>`<article class="sec"><div class="pg">${tx(UI.page)} ${i+1} / ${N}</div><h2>${tx(x.title)}</h2>${bodyHtml(x.body)}</article>`;
 const draw=()=>{
  const q=norm(v.trim());
  if(q){
   const hit=s.sections.map((x,i)=>[x,i]).filter(([x])=>[x.title.en,x.title.ur,P(x.body.en).join(" "),P(x.body.ur).join(" ")].some(t=>norm(t).includes(q)));
   $("#secs").innerHTML=hit.length?hit.map(([x,i])=>art(x,i)).join(""):`<p class="nores">${plain(UI.none)}</p>`;
   $("#pager").innerHTML="";return;
  }
  $("#secs").innerHTML=art(s.sections[p],p);
  $("#pager").innerHTML=`<button class="btn" data-go="${p-1}" ${p?"":"disabled"}>${plain(UI.prev)}</button>
   <span class="nums">${s.sections.map((x,i)=>`<button class="num${i===p?" on":""}" data-go="${i}">${i+1}</button>`).join("")}</span>
   <button class="btn" data-go="${p+1}" ${p<N-1?"":"disabled"}>${plain(UI.next)}</button>`;
 };
 const go=i=>{p=Math.max(0,Math.min(N-1,i));v="";$("#sq").value="";draw();$("#secs").scrollIntoView({behavior:"smooth",block:"start"})};
 if(s.stub)return;
 draw();
 $("#sq").addEventListener("input",e=>{v=e.target.value;draw()});
 $("#pager").onclick=e=>{const b=e.target.closest("[data-go]");if(b&&!b.disabled)go(+b.dataset.go)};
 document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>go(+c.dataset.p));
}
function route(){
 chrome();
 const h=location.hash.replace("#/","");
 if(h.startsWith("sultan/"))sultan(h.split("/")[1]);
 else if(h==="sultans")sultans();
 else if(h==="timeline")timeline();
 else home();
 window.scrollTo(0,0);
}
$("#langBtn").onclick=()=>{lang=LANGS[(LANGS.indexOf(lang)+1)%3];localStorage.setItem("lang",lang);route()};
$("#themeBtn").onclick=()=>{theme=theme==="dark"?"light":"dark";localStorage.setItem("theme",theme);chrome()};
window.addEventListener("hashchange",route);
route();
