/* =====================================================
   DBYC – Don Bosco Youth Centre
   App Logic v3.0 – New UI Model
   ===================================================== */
'use strict';

// ══════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════
const SK = 'dbyc_v3';
const UK = 'dbyc_uid';
// Official DBYC Groups (updated per rules document)
const GROUPS = ['Sub-Junior','Junior','Inter','Super-Senior','Elder'];
const GI = {'Sub-Junior':'🌱','Junior':'🌿','Senior':'🌳','Inter':'🎯','Super-Senior':'⭐','Elder':'👑'};

const GROUP_INFO = {
  'Sub-Junior':  { age:'6–14 yrs',  color:'#7c4dff', icon:'🌱', desc:'சிறுவர்கள் குழு' },
  'Junior':      { age:'15–18 yrs', color:'#0288d1', icon:'🌿', desc:'இளைஞர் குழு' },
  'Inter':       { age:'19–24 yrs', color:'#e65100', icon:'🎯', desc:'இடைத்தர குழு' },
  'Super-Senior':{ age:'25–35 yrs', color:'#c62828', icon:'⭐', desc:'மூத்த குழு' },
  'Elder':       { age:'35+ yrs',   color:'#37474f', icon:'👑', desc:'பெரியோர் குழு' }
};

// DBYC Official Rules (from Tamil document)
const DBYC_RULES = [
  { num:1,  head:'Membership / உறுப்பினர் சேர்க்கை',
    en:'Membership is open to youth residing in the Perin Palam area. Members must abide by all rules of Don Bosco Youth Centre.',
    ta:'இளைஞர் மன்றம் சேர்வதற்கு பேரின் பாலம் பகுதியை சேர்ந்தவராக இருக்க வேண்டும்.' },
  { num:2,  head:'Age Groups / வயது குழுக்கள்',
    en:'🌱 Sub-Junior: 6–14 yrs | 🌿 Junior: 15–18 yrs | 🎯 Inter: 19–24 yrs | ⭐ Super-Senior: 25–35 yrs | 👑 Elder: 35+ yrs',
    ta:'6–14 சிறுவர் குழு | 15–18 இளைஞர் குழு | 19–24 இடைத்தர குழு | 25–35 மூத்த குழு | 35+ பெரியோர் குழு' },
  { num:3,  head:'Attendance / வருகைப் பதிவு (75% Minimum)',
    en:'Members must attend at least 75% of all meetings and activities. Failure to maintain attendance may result in membership cancellation.',
    ta:'உறுப்பினர்கள் குறைந்தது 75% கூட்டங்களில் கலந்துகொள்ள வேண்டும். இல்லையேல் உறுப்பினர் பதவி நீக்கம் செய்யப்படலாம்.' },
  { num:4,  head:'Behaviour / நடத்தை',
    en:'Members must maintain proper behaviour at all times. Respect all leaders, members, elders and guests of the Youth Centre.',
    ta:'உறுப்பினர்கள் பொது இடத்திலும், மன்றத்திலும் நல்ல நடத்தையுடன் இருக்க வேண்டும்.' },
  { num:5,  head:'Meeting Times / கூட்ட நேரம்',
    en:'Weekdays (Mon–Fri): 4:30 PM – 7:30 PM\nSaturday: 4:00 PM – 6:00 PM\nFestival evenings: from 6:30 PM',
    ta:'திங்கள்–வெள்ளி: மாலை 4:30 – 7:30 | சனி: மாலை 4:00 – 6:00 | சிறப்பு விழா: மாலை 6:30 மணியிலிருந்து' },
  { num:6,  head:'Dress Code / உடை விதிமுறை',
    en:'Proper dress code is mandatory for all meetings and events. Indecent or improper clothing will not be permitted.',
    ta:'விழாக்களில் முறையான உடையில் மட்டுமே கலந்துகொள்ள அனுமதி உண்டு.' },
  { num:7,  head:'Discipline / ஒழுக்கம்',
    en:'Indiscipline, disrespectful behaviour, or any violation of rules will not be tolerated. Members will be warned and removed if necessary.',
    ta:'ஒழுக்கமற்ற நடத்தை கண்டிக்கப்படும். விதிமுறை மீறல் நீக்கத்திற்கு வழிவகுக்கும்.' },
  { num:8,  head:'Morning Prayer / காலை வழிபாடு',
    en:'Morning prayer is held at 10:00 AM. All members are encouraged to participate in prayer and spiritual formation activities.',
    ta:'காலை 10:00 மணிக்கு காலை வழிபாடு நடைபெறும். அனைத்து உறுப்பினர்களும் கலந்துகொள்ள வேண்டும்.' },
  { num:9,  head:'Festival Season / திருவிழா காலம்',
    en:'During festival seasons, meetings are held from 11:00 AM to 1:00 PM. All members must be present for celebrations.',
    ta:'திருவிழா காலங்களில் காலை 11:00 மணி முதல் மாலை 1:00 மணி வரை கூட்டங்கள் நடைபெறும்.' },
  { num:10, head:'Activities / செயல்பாடுகள்',
    en:'Members must participate in sports, cultural, educational and social service activities organized by DBYC.',
    ta:'கல்வி, விளையாட்டு, கலாசாரம், சமூக சேவை ஆகியவற்றில் உறுப்பினர்கள் கலந்துகொள்ள வேண்டும்.' },
  { num:11, head:'Celebrations / கொண்டாட்டங்கள்',
    en:'All members should attend DBYC celebrations including Christmas, Easter, Don Bosco feast, birthdays and group events.',
    ta:'மன்றத்தில் நடைபெறும் அனைத்து பண்டிகைகள் மற்றும் திருவிழாக்களில் உறுப்பினர்கள் கலந்துகொள்ள வேண்டும்.' },
  { num:12, head:'Salesian Values / தொன்போஸ்கோவின் மதிப்புகள்',
    en:'Members must uphold the Salesian values of Reason (Reason), Religion (Faith), and Loving Kindness (Amorevolezza) taught by St. John Bosco.',
    ta:'உறுப்பினர்கள் தொன்போஸ்கோவின் அறிவு, தர்மம் மற்றும் அன்பு ஆகிய மதிப்புகளை கடைபிடிக்க வேண்டும்.' },
  { num:13, head:'Fees / கட்டணம்',
    en:'Annual membership fee (if applicable) must be paid on time. This supports the activities and programs of DBYC.',
    ta:'ஆண்டு கட்டணம் (பொருந்தினால்) நேரத்தில் செலுத்த வேண்டும்.' },
  { num:14, head:'Group Leader Respect / குழு தலைவரை மதிக்கவும்',
    en:'Each group member must respect and follow the guidance of their Group Leader and Incharge. Disrespect to leaders is not permitted.',
    ta:'குழு தலைவரின் வழிகாட்டுதலை மதிக்க வேண்டும். தலைவரை அவமதிப்பது அனுமதிக்கப்படாது.' },
  { num:15, head:'Consequences of Violations / விதி மீறல் விளைவுகள்',
    en:'(1) First offence: Verbal warning | (2) Second offence: Written warning | (3) Third offence: Temporary suspension | (4) Continued violation: Permanent removal from DBYC',
    ta:'முதல் தடவை: வாய்மொழி எச்சரிக்கை | இரண்டாவது: எழுத்துமூல எச்சரிக்கை | மூன்றாவது: தற்காலிக நீக்கம் | தொடர்ந்தால்: நிரந்தர நீக்கம்' }
];
const PTS_LEVELS = [
  {min:0,   name:'Newcomer',  icon:'🌱', color:'#7c4dff'},
  {min:100, name:'Active',    icon:'🌿', color:'#00838f'},
  {min:250, name:'Committed', icon:'🌳', color:'#2e7d32'},
  {min:500, name:'Dedicated', icon:'🎯', color:'#e65100'},
  {min:1000,name:'Leader',    icon:'⭐', color:'#c62828'},
  {min:2000,name:'Champion',  icon:'👑', color:'#f9a825'}
];

// ══════════════════════════════════════════════════════
// DATA LAYER
// ══════════════════════════════════════════════════════
function save(d) { localStorage.setItem(SK, JSON.stringify(d)); }

function seed() {
  const d = {
    members:[], attendance:[], announcements:[], events:[], pts_log:[], nid:1,
    minutes:[], news:[], notifications:[], readNotifs:[],
    tickers:['Welcome to Don Bosco Youth Centre! 🙏 May God bless all our members!',
             'DBYC – Building Young Lives through Faith, Hope and Love.',
             '"Give me souls, take away the rest." – St. John Bosco']
  };
  addMember(d, {
    name:'Director DBYC', dob:'1980-01-01', mobile:'9000000001',
    email:'director@dbyc.org', address:'Don Bosco Youth Centre',
    group:'Elder', role:'Director', password:'admin123', photo:''
  });
  d.announcements.push({id:Date.now(),title:'Welcome to DBYC!',message:'God bless you! Welcome to Don Bosco Youth Centre.',group:'All',date:today(),author:'Director'});
  d.news.push({id:Date.now()+1, title:'DBYC App Launched!', content:'Our new member management app is now live. Download it on your phone!', category:'General', date:today(), author:'Director', pinned:true});
  d.minutes.push({id:Date.now()+2, title:'First Meeting – September 2026', date:today(), group:'All', agenda:'1. Welcome new members\n2. Group activities planning\n3. Attendance policy review', decisions:'All members must attend minimum 75% meetings. New activities planned for October.', attendees:1, author:'Director'});
  d.notifications.push({id:Date.now()+3, type:'system', title:'Welcome to DBYC!', body:'Your account has been created. God bless you!', date:today(), icon:'🙏', read:false});
  save(d); return d;
}
// Ensure old data has new fields
function migrateData(d) {
  if(!d.minutes) d.minutes=[];
  if(!d.news) d.news=[];
  if(!d.notifications) d.notifications=[];
  if(!d.readNotifs) d.readNotifs=[];
  if(!d.tickers) d.tickers=[];
  return d;
}
function getData() {
  try {
    const raw = localStorage.getItem(SK);
    if(!raw) return seed();
    return migrateData(JSON.parse(raw));
  } catch { return seed(); }
}
function addMember(d, info) {
  const id = 'DBYC' + String(d.nid++).padStart(4,'0');
  const m = {
    id, name:info.name, dob:info.dob, mobile:info.mobile,
    email:info.email||'', address:info.address||'',
    group:info.group, role:info.role||'Member',
    password:info.password||'dbyc123', photo:info.photo||'',
    points:50, joinDate:today(), active:true,
    // Extended DBYC enrollment fields
    education:info.education||'',
    schoolAddr:info.schoolAddr||'',
    religion:info.religion||'',
    maritalStatus:info.maritalStatus||'Unmarried',
    father:info.father||'',
    fatherOccup:info.fatherOccup||'',
    mother:info.mother||'',
    brothers:info.brothers||0,
    sisters:info.sisters||0,
    siblingsDbyc:info.siblingsDbyc||'',
    insta:info.insta||'',
    purpose:info.purpose||'',
    activities:info.activities||[],
    futurePlans:info.futurePlans||'',
    otherGroup:info.otherGroup||'',
    skills:info.skills||'',
    yearsInOrg:info.yearsInOrg||0
  };
  d.members.push(m);
  return m;
}
function today() { return new Date().toISOString().split('T')[0]; }
function getUser() { const id=localStorage.getItem(UK); if(!id) return null; return getData().members.find(m=>m.id===id)||null; }
function setUser(m) { localStorage.setItem(UK, m ? m.id : ''); }
function isAdmin() { const u=getUser(); return u&&['Director','Assistant Director','Incharge','Leader'].includes(u.role); }
function isSuperAdmin() { const u=getUser(); return u&&['Director','Assistant Director'].includes(u.role); }

function attStats(memberId) {
  const recs = getData().attendance.filter(a=>a.memberId===memberId);
  const present=recs.filter(a=>a.status==='present').length;
  const late=recs.filter(a=>a.status==='late').length;
  const absent=recs.filter(a=>a.status==='absent').length;
  const total=recs.length;
  const pct=total?Math.round(((present+late)/total)*100):0;
  return {present,late,absent,total,pct,recs};
}
function calcAge(dob) {
  if(!dob) return 0;
  const b=new Date(dob),n=new Date();
  return n.getFullYear()-b.getFullYear()-(n<new Date(n.getFullYear(),b.getMonth(),b.getDate())?1:0);
}
function fmtDate(d) { return d?new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'-'; }
// Official DBYC age groups per rules document
function autoGroup(age) {
  if(age<=14) return 'Sub-Junior';   // 6–14: சிறுவர்கள் குழு
  if(age<=18) return 'Junior';       // 15–18: இளைஞர் குழு
  if(age<=24) return 'Inter';        // 19–24: இடைத்தர குழு
  if(age<=35) return 'Super-Senior'; // 25–35: மூத்த குழு
  return 'Elder';                    // 35+: பெரியோர் குழு
}
function getLevel(pts) { let l=PTS_LEVELS[0]; for(const x of PTS_LEVELS){if(pts>=x.min)l=x;} return l; }
function chipClass(g) {
  return {'Sub-Junior':'chip-sub-junior','Junior':'chip-junior','Senior':'chip-senior',
          'Inter':'chip-inter','Super-Senior':'chip-super-senior','Elder':'chip-elder'}[g]||'chip-junior';
}

// ══════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════
function toast(msg,ms=3000){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),ms);
}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function $(id){return document.getElementById(id);}
function prevPhoto(inp,imgId,hintId){
  const f=inp.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=e=>{
    const img=$(imgId); img.src=e.target.result; img.style.display='block';
    const h=$(hintId); if(h) h.textContent='✅ Photo selected';
  };
  r.readAsDataURL(f);
}
async function photoData(inputId){
  return new Promise(res=>{
    const inp=$(inputId), f=inp&&inp.files&&inp.files[0];
    if(!f){res('');return;}
    const r=new FileReader(); r.onload=e=>res(e.target.result); r.readAsDataURL(f);
  });
}
function populateSelect(id,members){
  const el=$(id); if(!el) return;
  el.innerHTML=members.map(m=>`<option value="${m.id}">${m.name} (${m.id})</option>`).join('');
}
function allMemberSelects(){
  const d=getData(), ms=d.members.filter(m=>m.active);
  ['attMemberSel','genQRMemberSel','certAttSel','certMemSel','certMeritSel','idcardMemberSel'].forEach(id=>populateSelect(id,ms));
  $('attDateInput') && ($('attDateInput').value=today());
  $('groupAttDate') && ($('groupAttDate').value=today());
}

// ══════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════
function doLogin(){
  const u=$('loginUser').value.trim(), p=$('loginPass').value;
  if(!u||!p){toast('⚠️ Enter ID and password');return;}
  const d=getData();
  const m=d.members.find(x=>(x.id===u||x.mobile===u||x.email===u)&&x.password===p&&x.active);
  if(!m){toast('❌ Invalid credentials');return;}
  setUser(m); launchApp();
}
function doRegister(){
  const name=$('rName').value.trim(), dob=$('rDob').value, mobile=$('rMobile').value.trim(), pass=$('rPass').value;
  if(!name||!dob||!mobile||!pass){toast('⚠️ Fill all required fields (*)');return;}
  if(!$('rRulesAgree').checked){toast('⚠️ Please agree to DBYC Rules & Regulations');return;}
  const d=getData();
  if(d.members.find(m=>m.mobile===mobile)){toast('⚠️ Mobile number already registered');return;}
  // Get marital status from radio buttons
  const maritalYes=$('rMaritalYes'); const maritalStatus=maritalYes&&maritalYes.checked?'Married':'Unmarried';
  // Collect activities
  const acts=[]; const actIds=['Sports','Music','Drama','Dance','Service','Prayer','Leadership','Exercise','Art','Other'];
  actIds.forEach(a=>{const el=$('rAct'+a);if(el&&el.checked)acts.push(a);});
  const photo=$('rPhotoPreview')?.src||'';
  const group=autoGroup(calcAge(dob));
  const m=addMember(d,{
    name, dob, mobile, pass,
    email:$('rEmail')?.value.trim()||'',
    address:$('rAddress')?.value.trim()||'',
    education:$('rEducation')?.value.trim()||'',
    schoolAddr:$('rSchoolAddr')?.value.trim()||'',
    religion:$('rReligion')?.value||'',
    maritalStatus,
    insta:$('rInsta')?.value.trim()||'',
    father:$('rFather')?.value.trim()||'',
    fatherOccup:$('rFatherOccup')?.value.trim()||'',
    mother:$('rMother')?.value.trim()||'',
    brothers:parseInt($('rBrothers')?.value)||0,
    sisters:parseInt($('rSisters')?.value)||0,
    siblingsDbyc:$('rSiblingsDbyc')?.value.trim()||'',
    purpose:$('rPurpose')?.value.trim()||'',
    activities:acts,
    futurePlans:$('rFuturePlans')?.value.trim()||'',
    otherGroup:$('rOtherGroup')?.value.trim()||'',
    skills:$('rSkills')?.value.trim()||'',
    yearsInOrg:parseInt($('rYearsInOrg')?.value)||0,
    group, role:'Member', password:pass,
    photo:photo.startsWith('data:')?photo:''
  });
  save(d); toast(`✅ Registered! Your ID: ${m.id} | Group: ${group}`);
  setUser(m); setTimeout(launchApp,1200);
}
function doLogout(){
  setUser(null);
  $('app').classList.remove('show');
  $('auth-screen').style.display='flex';
  showPanel('login');
  stopScanner();
}
function showPanel(name){
  ['login-panel','register-panel','rules-panel'].forEach(id=>{const el=$(id);if(el)el.style.display='none';});
  const target=$(name+'-panel');
  if(target) target.style.display='block';
  if(name==='rules') renderRulesPanel();
}
function autoCalcAge(){
  const dob=$('rDob')?.value; if(!dob) return;
  const age=calcAge(dob);
  if($('rAge'))$('rAge').value=age;
  const group=autoGroup(age);
  // visual feedback
  const gi=GROUP_INFO[group];
  toast(`Auto-assigned group: ${gi?.icon||''} ${group} (${gi?.age||''} | ${gi?.desc||''}) ✅`);
}
function renderRulesPanel(){
  const el=$('rulesContent'); if(!el) return;
  el.innerHTML=`
    <div style="background:#e8f0fe;border-radius:12px;padding:12px;margin-bottom:16px;text-align:center">
      <div style="font-size:0.8rem;color:#1a237e;font-weight:700">📋 Official DBYC Age Groups</div>
      ${Object.entries(GROUP_INFO).map(([g,gi])=>`
        <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.78rem;border-bottom:1px solid #c5cae9">
          <span>${gi.icon} <b>${g}</b> / ${gi.desc}</span><span style="color:${gi.color};font-weight:700">${gi.age}</span>
        </div>`).join('')}
    </div>
    ${DBYC_RULES.map(r=>`
      <div style="margin-bottom:12px;padding:12px;background:#fff;border-radius:12px;border-left:4px solid #1a237e;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
        <div style="font-size:0.82rem;font-weight:800;color:#1a237e;margin-bottom:6px">${r.num}. ${r.head}</div>
        <div style="font-size:0.78rem;color:#333;margin-bottom:4px;line-height:1.6">${r.en}</div>
        <div style="font-size:0.72rem;color:#607d8b;font-style:italic;line-height:1.5">${r.ta}</div>
      </div>`).join('')}
    <div style="text-align:center;padding:16px 0 8px;font-size:0.75rem;color:#607d8b">
      <img src="images/dbyc-logo.jpg" style="width:40px;height:40px;border-radius:50%;border:2px solid #1a237e;object-fit:cover;display:block;margin:0 auto 8px" onerror="this.style.display='none'">
      <em>"Give me souls, take away the rest." – St. John Bosco</em><br>
      பேரின் பாலம், சென்னை – 600 017
    </div>`;
}

// ══════════════════════════════════════════════════════
// APP LAUNCH
// ══════════════════════════════════════════════════════
function launchApp(){
  $('auth-screen').style.display='none';
  $('app').classList.add('show');
  allMemberSelects();
  updateHeader();
  renderHome();
  initTicker();
  initSlideshow();
  goPage('home');
}
function updateHeader(){
  const u=getUser(); if(!u) return;
  // drawer
  const dAvatar=$('drawerAvatar');
  dAvatar.innerHTML = u.photo
    ? `<img src="${u.photo}" class="drawer-avatar" alt="">`
    : `<div class="drawer-avatar-ph">${GI[u.group]||'👤'}</div>`;
  $('drawerName').textContent=u.name;
  $('drawerRole').textContent=`${u.role} • ${u.group}`;
  $('drawerId').textContent=u.id;
  if(isAdmin()){$('drawerAdminSection').style.display='';$('drawerAdminItem').style.display='';}
  // admin tile
  if($('adminTile')) $('adminTile').style.display=isAdmin()?'':'none';
  if($('addMemberBtn')) $('addMemberBtn').style.display=isSuperAdmin()?'':'none';
  if($('addEventBtn')) $('addEventBtn').style.display=isAdmin()?'':'none';
}
function initTicker(){
  const d=getData();
  const anns=d.announcements.slice(-5).map(a=>a.title+'– '+a.message);
  const ticks=[...d.tickers,...anns];
  const el=$('tickerText');
  if(el) el.textContent=ticks.join('   •   ');
}
function initSlideshow(){
  const slides=document.querySelectorAll('.bg-slide'); let i=0;
  setInterval(()=>{
    slides[i].classList.remove('on');
    i=(i+1)%slides.length;
    slides[i].classList.add('on');
  },6000);
}

// ══════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════
const PAGE_NAV_MAP={'home':'bnav-home','members':'bnav-members','scanner':'bnav-scanner','birthdays':'bnav-birthdays','account':'bnav-account'};
let currentPage='home';
function goPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-btn').forEach(b=>b.classList.remove('active'));
  const pg=$('page-'+name);
  if(pg) pg.classList.add('active');
  const bn=PAGE_NAV_MAP[name];
  if(bn) $(bn).classList.add('active');
  currentPage=name;
  $('mainScroll').scrollTop=0;
  // Show/hide header
  const noHeader=['profile','members','attendance','qr','scanner','idcard','certificates','points','events','birthdays','news','notifications','reports','account','rules','minutes'];
  $('appHeader').style.display=noHeader.includes(name)?'none':'';
  // Render
  const renders={home:renderHome,profile:renderProfile,
    members:()=>{renderMemberList();if(isAdmin())$('addMemberBtn').style.display='';},
    attendance:renderMyAtt,qr:renderQRPage,scanner:()=>{},
    idcard:()=>{renderIDCardPage();allMemberSelects();},
    certificates:()=>{populateCertSelects();},points:renderPoints,birthdays:renderBirthdays,
    news:renderNews,notifications:renderNotifications,events:renderEvents,
    rules:renderRulesPage,
    minutes:renderMinutes,
    reports:()=>{if(!isAdmin()){$('adminTabContent').innerHTML='<div class="empty-msg">🔒 Admin access required</div>';return;}switchAdminTab('stats');}
  };
  if(renders[name]) renders[name]();
}
function toggleDrawer(open){
  $('drawer').classList.toggle('open',open);
  $('drawerOverlay').classList.toggle('open',open);
}

// ══════════════════════════════════════════════════════
// RULES PAGE (in-app)
// ══════════════════════════════════════════════════════
function renderRulesPage(){
  // Age groups table
  const gt=$('rulesGroupTable');
  if(gt) gt.innerHTML=Object.entries(GROUP_INFO).map(([g,gi])=>`
    <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #eee">
      <span style="font-size:1.6rem">${gi.icon}</span>
      <div style="flex:1">
        <div style="font-weight:800;color:${gi.color}">${g}</div>
        <div style="font-size:0.72rem;color:var(--dbyc-muted)">${gi.desc}</div>
      </div>
      <div style="background:${gi.color};color:#fff;padding:4px 12px;border-radius:20px;font-size:0.75rem;font-weight:700">${gi.age}</div>
    </div>`).join('');
  // Rules list
  const rl=$('rulesAppList');
  if(rl) rl.innerHTML=DBYC_RULES.map(r=>`
    <div class="white-card" style="margin:0 0 10px;padding:14px;border-left:4px solid #1a237e">
      <div style="font-size:0.85rem;font-weight:800;color:#1a237e;margin-bottom:6px">${r.num}. ${r.head}</div>
      <div style="font-size:0.8rem;color:#333;line-height:1.6;margin-bottom:6px">${r.en}</div>
      <div style="font-size:0.73rem;color:#607d8b;font-style:italic;line-height:1.5;border-top:1px solid #eee;padding-top:6px">${r.ta}</div>
    </div>`).join('');
}

// ══════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════
function renderHome(){
  const u=getUser(); if(!u) return;
  const d=getData(); const now=new Date();
  const hrs=now.getHours();
  const greet=hrs<5?'Good Night,':hrs<12?'Good Morning,':hrs<17?'Good Afternoon,':'Good Evening,';
  $('wcGreeting').textContent=greet;
  $('wcName').textContent=u.name;
  $('wcRole').textContent=`${GI[u.group]||''} ${u.group} • ${u.role}`;
  $('wcId').textContent=`🆔 ${u.id}`;
  const att=attStats(u.id); const lv=getLevel(u.points||0);
  $('wcAtt').textContent=`📋 ${att.pct}% Attendance • ${lv.icon} ${u.points||0} pts`;
  // avatar
  const aw=$('welcomeAvatarWrap');
  aw.innerHTML=u.photo
    ? `<img src="${u.photo}" class="welcome-avatar" alt="">`
    : `<div class="welcome-avatar-ph">${GI[u.group]||'👤'}</div>`;

  // ── Today's Birthdays Banner ──
  const todayBdays=getTodayBirthdays(d);
  const bdayBannerEl=$('homeBirthdayBanner');
  if(bdayBannerEl){
    if(todayBdays.length>0){
      bdayBannerEl.style.display='';
      bdayBannerEl.innerHTML=`
        <div style="background:linear-gradient(135deg,#ff8f00,#ffd54f);border-radius:14px;padding:14px;margin:14px 14px 0;display:flex;align-items:center;gap:12px;cursor:pointer;box-shadow:0 4px 16px rgba(255,143,0,0.3)" onclick="goPage('birthdays')">
          <div style="font-size:2.5rem">🎂</div>
          <div style="flex:1">
            <div style="font-weight:900;color:#1a237e;font-size:0.95rem">🎉 Birthday${todayBdays.length>1?'s':''} Today!</div>
            <div style="font-size:0.82rem;color:#1a237e;margin-top:2px">${todayBdays.map(m=>m.name).join(', ')}</div>
            <div style="font-size:0.68rem;color:#5d4037;margin-top:2px">Tap to celebrate • ${todayBdays.map(m=>calcAge(m.dob)+' yrs').join(', ')}</div>
          </div>
          <div style="font-size:1.5rem">›</div>
        </div>`;
    } else { bdayBannerEl.style.display='none'; }
  }

  // ── Stats Row ──
  const msActive=d.members.filter(m=>m.active).length;
  const todayPresent=d.attendance.filter(a=>a.date===today()&&a.status==='present').length;
  const totalMinutes=d.minutes?.length||0;
  const totalNews=(d.news?.length||0)+(d.announcements?.length||0);
  const statsEl=$('homeDashStats');
  if(statsEl) statsEl.innerHTML=`
    <div onclick="goPage('members')" style="cursor:pointer" class="stat-box"><div class="stat-val" style="color:#1a237e">${msActive}</div><div class="stat-lbl">Members</div></div>
    <div onclick="goPage('attendance')" style="cursor:pointer" class="stat-box"><div class="stat-val" style="color:#2e7d32">${todayPresent}</div><div class="stat-lbl">Today</div></div>
    <div onclick="goPage('minutes')" style="cursor:pointer" class="stat-box"><div class="stat-val" style="color:#e65100">${totalMinutes}</div><div class="stat-lbl">Minutes</div></div>
    <div onclick="goPage('news')" style="cursor:pointer" class="stat-box"><div class="stat-val" style="color:#c62828">${totalNews}</div><div class="stat-lbl">News</div></div>`;

  // ── Announcements ──
  const anns=d.announcements.filter(a=>a.group==='All'||a.group===u.group).reverse().slice(0,4);
  $('homeAnnouncements').innerHTML=anns.length
    ? anns.map(a=>`<div class="ann-item" onclick="goPage('news')" style="cursor:pointer"><div class="ann-title">📣 ${a.title}</div><div class="ann-msg">${a.message}</div><div class="ann-meta">${a.group} • ${fmtDate(a.date)} • ${a.author}</div></div>`).join('')
    : '<div class="empty-msg">No announcements yet</div>';

  // ── Upcoming Birthdays sidebar ──
  const upcomingEl=$('homeUpcomingBdays');
  if(upcomingEl){
    const upcoming=getUpcomingBirthdays(d,5);
    upcomingEl.innerHTML=upcoming.length
      ? upcoming.map(m=>{
          const daysLeft=m._daysLeft;
          return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eee;cursor:pointer" onclick="goPage('birthdays')">
            ${m.photo?`<img src="${m.photo}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #ff8f00" alt="">`:`<div style="width:38px;height:38px;border-radius:50%;background:#ff8f00;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff">${daysLeft===0?'🎂':GI[m.group]||'👤'}</div>`}
            <div style="flex:1"><div style="font-size:0.82rem;font-weight:700">${m.name}</div><div style="font-size:0.68rem;color:var(--dbyc-muted)">${m.group}</div></div>
            <div style="font-size:0.72rem;font-weight:800;color:${daysLeft===0?'#e65100':'#1a237e'}">${daysLeft===0?'🎉 Today!':`in ${daysLeft}d`}</div>
          </div>`;
        }).join('')
      : '<div class="text-muted" style="padding:8px 0;font-size:0.82rem">No upcoming birthdays</div>';
  }

  // ── Recent News ──
  const recentNewsEl=$('homeRecentNews');
  if(recentNewsEl){
    const recentNews=[...(d.news||[])].reverse().slice(0,3);
    recentNewsEl.innerHTML=recentNews.length
      ? recentNews.map(n=>`<div style="padding:10px 0;border-bottom:1px solid #eee;cursor:pointer" onclick="goPage('news')">
          ${n.pinned?'<span style="font-size:0.62rem;background:#e53935;color:#fff;padding:2px 6px;border-radius:8px;margin-right:4px">📌 PINNED</span>':''}
          <div style="font-weight:700;font-size:0.85rem;color:#1a237e;margin-top:2px">${n.title}</div>
          <div style="font-size:0.75rem;color:#555;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${n.content}</div>
          <div style="font-size:0.65rem;color:var(--dbyc-muted);margin-top:3px">📅 ${fmtDate(n.date)} • ${n.category||'News'}</div>
        </div>`).join('')
      : '<div class="empty-msg" style="padding:10px 0;font-size:0.82rem">No news yet</div>';
  }

  // ── Notification badges ──
  updateAllBadges(d, u);
  if(isAdmin()&&$('adminTile'))$('adminTile').style.display='';
}

function updateAllBadges(d, u){
  if(!u) return;
  const unreadNotifs=(d.notifications||[]).filter(n=>!n.read&&(n.memberId===u.id||n.memberId==='all')).length;
  const nb=$('notifBadge');
  if(nb){if(unreadNotifs>0){nb.style.display='flex';nb.textContent=unreadNotifs>99?'99+':unreadNotifs;}else{nb.style.display='none';}}
  const nc=(d.news||[]).length+(d.announcements||[]).length;
  const newsB=$('newsBadge'),diB=$('di-news-badge');
  if(nc>0){if(newsB){newsB.style.display='flex';newsB.textContent=nc;}if(diB){diB.style.display='flex';diB.textContent=nc;}}
  const minB=$('minutesBadge');
  if(minB&&(d.minutes||[]).length>0){minB.style.display='flex';minB.textContent=(d.minutes||[]).length;}
}

function getTodayBirthdays(d){
  const n=new Date(); const mo=n.getMonth()+1; const day=n.getDate();
  return d.members.filter(m=>{
    if(!m.dob||!m.active) return false;
    const parts=m.dob.split('-');
    return parseInt(parts[1])===mo && parseInt(parts[2])===day;
  });
}
function getUpcomingBirthdays(d, count=10){
  const n=new Date(); const thisYear=n.getFullYear();
  return d.members.filter(m=>m.active&&m.dob).map(m=>{
    const parts=m.dob.split('-'); const mo=parseInt(parts[1])-1; const day=parseInt(parts[2]);
    let next=new Date(thisYear,mo,day);
    if(next<n) next=new Date(thisYear+1,mo,day);
    const daysLeft=Math.round((next-n)/(1000*60*60*24));
    return {...m,_daysLeft:daysLeft,_next:next};
  }).sort((a,b)=>a._daysLeft-b._daysLeft).slice(0,count);
}


// ══════════════════════════════════════════════════════
// PROFILE PAGE
// ══════════════════════════════════════════════════════
function renderProfile(){
  const u=getUser(); if(!u) return;
  const att=attStats(u.id);
  const lv=getLevel(u.points||0);
  // photo
  const pe=$('profilePhotoEl');
  pe.innerHTML=u.photo
    ? `<img src="${u.photo}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:4px solid var(--dbyc-gold)" alt="">`
    : `<div style="width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:4px solid var(--dbyc-gold)">${GI[u.group]||'👤'}</div>`;
  $('profileNameEl').textContent=u.name;
  $('profileRoleEl').textContent=`${GI[u.group]||''} ${u.group} • ${u.role}`;
  $('profileIdEl').textContent=`🆔 ${u.id}`;
  $('profileJoinEl').textContent=`Member since ${fmtDate(u.joinDate)}`;
  // att summary
  $('profileAttSummary').innerHTML=`
    <div class="att-box att-present"><div class="att-val">${att.present}</div><div class="att-lbl">Present</div></div>
    <div class="att-box att-late"><div class="att-val">${att.late}</div><div class="att-lbl">Late</div></div>
    <div class="att-box att-absent"><div class="att-val">${att.absent}</div><div class="att-lbl">Absent</div></div>
    <div class="att-box att-total"><div class="att-val">${att.total}</div><div class="att-lbl">Sessions</div></div>`;
  $('profileAttBar').style.width=att.pct+'%';
  $('profileAttPct').textContent=att.pct+'% Attendance Rate';
  // info
  $('profileInfoGrid').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.82rem">
      <div><div style="color:var(--dbyc-muted);font-size:0.68rem">📅 Date of Birth</div><b>${fmtDate(u.dob)} (${calcAge(u.dob)} yrs)</b></div>
      <div><div style="color:var(--dbyc-muted);font-size:0.68rem">📱 Mobile</div><b>${u.mobile}</b></div>
      <div><div style="color:var(--dbyc-muted);font-size:0.68rem">📧 Email</div><b>${u.email||'—'}</b></div>
      <div><div style="color:var(--dbyc-muted);font-size:0.68rem">📍 Address</div><b>${u.address||'—'}</b></div>
    </div>`;
  // points
  const next=PTS_LEVELS.find(l=>l.min>(u.points||0));
  const pct=next?Math.min(100,Math.round(((u.points||0)-lv.min)/(next.min-lv.min)*100)):100;
  $('profilePointsSection').innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <span style="font-size:2.5rem">${lv.icon}</span>
      <div style="flex:1">
        <div style="font-weight:800;color:${lv.color};font-size:1.1rem">${lv.name}</div>
        <div class="progress-bar" style="margin:6px 0"><div class="progress-fill" style="width:${pct}%;background:${lv.color}"></div></div>
        <div style="font-size:0.72rem;color:var(--dbyc-muted)">${u.points||0} pts${next?` • ${next.min-(u.points||0)} to ${next.name}`:' • Max Level!'}</div>
      </div>
      <div style="font-size:1.5rem;font-weight:900;color:${lv.color}">${u.points||0}</div>
    </div>`;
}
function triggerProfilePhotoChange(){ $('profilePhotoFileInput').click(); }
function onProfilePhotoChange(inp){
  const f=inp.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=e=>{
    const photo=e.target.result;
    const d=getData(), u=getUser();
    const m=d.members.find(x=>x.id===u.id);
    if(m){m.photo=photo;save(d);}
    renderProfile(); updateHeader(); toast('✅ Photo updated!');
  };
  r.readAsDataURL(f);
}
function openEditProfileModal(){ openEditMemberModal(getUser()?.id); }

// ══════════════════════════════════════════════════════
// MEMBERS PAGE
// ══════════════════════════════════════════════════════
function renderMemberList(){
  const search=($('memberSearchInput')?.value||'').toLowerCase();
  const group=$('memberGroupFilter')?.value||'';
  const d=getData();
  let ms=d.members.filter(m=>m.active);
  if(group) ms=ms.filter(m=>m.group===group);
  if(search) ms=ms.filter(m=>m.name.toLowerCase().includes(search)||m.id.toLowerCase().includes(search)||(m.mobile||'').includes(search));
  const el=$('memberListEl');
  el.innerHTML=ms.length
    ? ms.map(m=>`
      <div class="member-row" onclick="openMemberDetail('${m.id}')">
        ${m.photo?`<img src="${m.photo}" class="member-row-avatar" alt="">`:`<div class="member-row-avatar-ph">${GI[m.group]||'👤'}</div>`}
        <div style="flex:1">
          <div class="member-row-name">${m.name}</div>
          <div class="member-row-sub">${m.id} • <span class="group-chip ${chipClass(m.group)}">${m.group}</span> • ${m.role}</div>
          <div class="member-row-sub">📋 ${attStats(m.id).pct}% • ⭐ ${m.points||0} pts</div>
        </div>
        <span style="color:#ccc;font-size:1.2rem">›</span>
      </div>`).join('')
    : '<div class="empty-msg">No members found</div>';
}
function openMemberDetail(id){
  const d=getData(); const m=d.members.find(x=>x.id===id); if(!m) return;
  const att=attStats(id); const lv=getLevel(m.points||0);
  $('memberDetailBody').innerHTML=`
    <div style="text-align:center;padding:16px 0 10px">
      ${m.photo?`<img src="${m.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #1a237e" alt="">`:`<div style="width:80px;height:80px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto">${GI[m.group]||'👤'}</div>`}
      <div style="font-size:1.1rem;font-weight:900;margin-top:10px">${m.name}</div>
      <span class="group-chip ${chipClass(m.group)}">${m.group}</span>
      <span style="font-size:0.8rem;color:#607d8b;margin-left:6px">${m.role}</span>
    </div>
    <div class="att-summary">
      <div class="att-box att-present"><div class="att-val">${att.present}</div><div class="att-lbl">Present</div></div>
      <div class="att-box att-late"><div class="att-val">${att.late}</div><div class="att-lbl">Late</div></div>
      <div class="att-box att-absent"><div class="att-val">${att.absent}</div><div class="att-lbl">Absent</div></div>
      <div class="att-box att-total"><div class="att-val">${att.pct}%</div><div class="att-lbl">Rate</div></div>
    </div>
    <div style="font-size:0.82rem;margin:10px 0">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div><span style="color:var(--dbyc-muted);font-size:0.68rem">🆔 ID</span><br><b>${m.id}</b></div>
        <div><span style="color:var(--dbyc-muted);font-size:0.68rem">📅 DOB</span><br><b>${fmtDate(m.dob)}</b></div>
        <div><span style="color:var(--dbyc-muted);font-size:0.68rem">📱 Mobile</span><br><b>${m.mobile}</b></div>
        <div><span style="color:var(--dbyc-muted);font-size:0.68rem">📧 Email</span><br><b>${m.email||'—'}</b></div>
        <div><span style="color:var(--dbyc-muted);font-size:0.68rem">📆 Joined</span><br><b>${fmtDate(m.joinDate)}</b></div>
        <div><span style="color:var(--dbyc-muted);font-size:0.68rem">📍 Address</span><br><b>${m.address||'—'}</b></div>
      </div>
    </div>
    <div style="text-align:center;padding:8px 0;font-size:1.4rem">${lv.icon} <span style="color:${lv.color};font-weight:800">${lv.name}</span> • <span style="font-weight:900">⭐ ${m.points||0}</span></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      <button class="btn-sm btn-blue-sm" onclick="closeModal('memberDetailModal');goPage('idcard');setTimeout(()=>{$('idcardMemberSel').value='${m.id}';renderIDCardPreview()},100)">🪪 ID Card</button>
      <button class="btn-sm btn-green-sm" onclick="closeModal('memberDetailModal');genQRFor('${m.id}')">📱 QR Code</button>
      ${isAdmin()?`<button class="btn-sm btn-gold-sm" onclick="openPtsModal('${m.id}')">⭐ Points</button>`:''}
      ${isSuperAdmin()?`<button class="btn-sm btn-red-sm" onclick="closeModal('memberDetailModal');openEditMemberModal('${m.id}')">✏️ Edit</button>`:''}
    </div>
    <div style="height:20px"></div>`;
  openModal('memberDetailModal');
}
function openAddMemberModal(){
  $('memberModalTitle').textContent='Add New Member';
  $('modalMemberId').value='';
  ['mfName','mfDob','mfMobile','mfEmail','mfAddress','mfPass'].forEach(id=>{if($(id))$(id).value='';});
  if($('mfGroup'))$('mfGroup').value='Junior';
  if($('mfRole'))$('mfRole').value='Member';
  $('modalPhotoPreview').style.display='none';
  $('modalPhotoHint').textContent='📷 Upload Photo';
  $('modalPhoto').value='';
  $('mfGroupWrap').style.display='';
  $('mfRoleWrap').style.display=isSuperAdmin()?'':'none';
  openModal('memberModal');
}
function openEditMemberModal(id){
  const d=getData(); const m=d.members.find(x=>x.id===id); if(!m) return;
  $('memberModalTitle').textContent='Edit Member';
  $('modalMemberId').value=m.id;
  $('mfName').value=m.name; $('mfDob').value=m.dob; $('mfMobile').value=m.mobile;
  $('mfEmail').value=m.email||''; $('mfAddress').value=m.address||'';
  $('mfGroup').value=m.group; $('mfRole').value=m.role; $('mfPass').value='';
  if(m.photo){$('modalPhotoPreview').src=m.photo;$('modalPhotoPreview').style.display='block';$('modalPhotoHint').textContent='✅ Photo loaded';}
  else{$('modalPhotoPreview').style.display='none';$('modalPhotoHint').textContent='📷 Upload Photo';}
  $('modalPhoto').value='';
  $('mfGroupWrap').style.display=isSuperAdmin()?'':'none';
  $('mfRoleWrap').style.display=isSuperAdmin()?'':'none';
  openModal('memberModal');
}
async function saveMemberModal(){
  const name=$('mfName').value.trim(), dob=$('mfDob').value, mobile=$('mfMobile').value.trim();
  const email=$('mfEmail').value.trim(), address=$('mfAddress').value.trim();
  const group=$('mfGroup').value, role=$('mfRole').value, pass=$('mfPass').value;
  const editId=$('modalMemberId').value;
  if(!name||!dob||!mobile){toast('⚠️ Fill required fields');return;}
  let photo='';
  if($('modalPhoto').files&&$('modalPhoto').files[0]) photo=await photoData('modalPhoto');
  const d=getData();
  if(editId){
    const m=d.members.find(x=>x.id===editId); if(!m) return;
    m.name=name; m.dob=dob; m.mobile=mobile; m.email=email; m.address=address;
    if(isSuperAdmin()){m.group=group; m.role=role;}
    if(photo) m.photo=photo;
    if(pass) m.password=pass;
    // if editing own profile, update session
    if(getUser()?.id===editId) {} // user stays logged in
    toast('✅ Member updated!');
  } else {
    if(d.members.find(m=>m.mobile===mobile)){toast('⚠️ Mobile already exists');return;}
    const m=addMember(d,{name,dob,mobile,email,address,group,role,password:pass||'dbyc123',photo});
    toast(`✅ Added! ID: ${m.id}`);
  }
  save(d); closeModal('memberModal');
  allMemberSelects(); renderMemberList(); updateHeader();
}

// ══════════════════════════════════════════════════════
// ATTENDANCE
// ══════════════════════════════════════════════════════
function switchAttTab(tab){
  $('attMyPanel').style.display=tab==='my'?'':'none';
  $('attMarkPanel').style.display=tab==='mark'?'':'none';
  $('attGroupPanel').style.display=tab==='group'?'':'none';
  if(tab==='my') renderMyAtt();
  if(!isAdmin()){$('btnMarkTab').style.display='none';$('btnGroupTab').style.display='none';}
}
function renderMyAtt(){
  const u=getUser(); if(!u) return;
  const att=attStats(u.id);
  $('myAttBoxes').innerHTML=`
    <div class="att-box att-present"><div class="att-val">${att.present}</div><div class="att-lbl">Present</div></div>
    <div class="att-box att-late"><div class="att-val">${att.late}</div><div class="att-lbl">Late</div></div>
    <div class="att-box att-absent"><div class="att-val">${att.absent}</div><div class="att-lbl">Absent</div></div>
    <div class="att-box att-total"><div class="att-val">${att.total}</div><div class="att-lbl">Sessions</div></div>`;
  $('myAttBar').style.width=att.pct+'%';
  $('myAttPct').textContent=att.pct+'%';
  renderCalendar(u.id);
  const recent=att.recs.slice(-5).reverse();
  $('myAttRecent').innerHTML=recent.length
    ? recent.map(r=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:0.82rem">
        <div><b>${r.session||'Session'}</b><br><span style="color:var(--dbyc-muted);font-size:0.7rem">${fmtDate(r.date)}</span></div>
        <span style="${r.status==='present'?'color:#2e7d32':r.status==='late'?'color:#e65100':'color:#c62828'};font-weight:700">${r.status==='present'?'✅ Present':r.status==='late'?'⏰ Late':'❌ Absent'}</span>
      </div>`).join('')
    : '<div class="empty-msg">No records yet</div>';
}
function renderCalendar(memberId){
  const d=getData(), recs=d.attendance.filter(a=>a.memberId===memberId);
  const n=new Date(), y=n.getFullYear(), mo=n.getMonth();
  const first=new Date(y,mo,1), last=new Date(y,mo+1,0);
  const days=['S','M','T','W','T','F','S'];
  let html=`<div style="text-align:center;font-weight:700;color:#1a237e;margin-bottom:8px">${first.toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</div>`;
  html+=`<div class="cal-grid">${days.map(d=>`<div class="cal-day-hdr">${d}</div>`).join('')}`;
  for(let i=0;i<first.getDay();i++) html+='<div></div>';
  for(let day=1;day<=last.getDate();day++){
    const ds=`${y}-${String(mo+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const rec=recs.find(r=>r.date===ds);
    const isToday=day===n.getDate()&&mo===n.getMonth()&&y===n.getFullYear();
    let cls='cal-empty';
    if(rec) cls=rec.status==='present'?'cal-present':rec.status==='late'?'cal-late':'cal-absent';
    html+=`<div class="cal-day ${cls}${isToday?' cal-today':''}">${day}</div>`;
  }
  html+='</div><div style="display:flex;gap:10px;margin-top:8px;font-size:0.7rem;color:var(--dbyc-muted)"><span style="color:#2e7d32">■ Present</span><span style="color:#e65100">■ Late</span><span style="color:#c62828">■ Absent</span></div>';
  $('myAttCalendar').innerHTML=html;
}
function doMarkAtt(){
  if(!isAdmin()){toast('⛔ Admin only');return;}
  const session=$('attSessionInput').value.trim()||'General Session';
  const date=$('attDateInput').value, memberId=$('attMemberSel').value, status=$('attStatusSel').value;
  if(!date||!memberId){toast('⚠️ Fill all fields');return;}
  markAtt(memberId,date,session,status); toast('✅ Attendance saved!');
}
function markAtt(memberId,date,session,status){
  const d=getData(), u=getUser();
  const idx=d.attendance.findIndex(a=>a.memberId===memberId&&a.date===date&&a.session===session);
  const rec={memberId,date,session,status,by:u?.id,at:new Date().toISOString()};
  if(idx>=0) d.attendance[idx]=rec; else d.attendance.push(rec);
  const m=d.members.find(x=>x.id===memberId);
  if(m){if(status==='present')m.points=(m.points||0)+5;if(status==='late')m.points=(m.points||0)+2;}
  save(d);
}
function loadGroupAttList(){
  if(!isAdmin()) return;
  const group=$('groupAttSel').value, d=getData();
  const ms=d.members.filter(m=>m.active&&m.group===group);
  $('groupAttListEl').innerHTML=ms.map(m=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eee">
      ${m.photo?`<img src="${m.photo}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid #1a237e" alt="">`:`<div style="width:36px;height:36px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff">${GI[m.group]||'👤'}</div>`}
      <div style="flex:1;font-size:0.85rem"><b>${m.name}</b><br><span style="color:var(--dbyc-muted);font-size:0.7rem">${m.id}</span></div>
      <select id="ga_${m.id}" class="form-select" style="max-width:110px;padding:6px 8px">
        <option value="present">✅ Present</option>
        <option value="absent">❌ Absent</option>
        <option value="late">⏰ Late</option>
      </select>
    </div>`).join('')||'<div class="empty-msg">No members</div>';
}
function saveGroupAtt(){
  if(!isAdmin()) return;
  const group=$('groupAttSel').value, session=$('groupAttSession').value||'Group Session', date=$('groupAttDate').value;
  if(!date){toast('⚠️ Select date');return;}
  const d=getData(); const ms=d.members.filter(m=>m.active&&m.group===group);
  let cnt=0; ms.forEach(m=>{const sel=$('ga_'+m.id);if(sel){markAtt(m.id,date,session,sel.value);cnt++;}});
  toast(`✅ Saved ${cnt} records!`);
}

// ══════════════════════════════════════════════════════
// QR CODE
// ══════════════════════════════════════════════════════
function renderQRPage(){
  const u=getUser(); if(!u) return;
  const container=$('myQRContainer');
  container.innerHTML='';
  try{
    new QRCode(container,{text:JSON.stringify({id:u.id,name:u.name,group:u.group,role:u.role}),
      width:200,height:200,colorDark:'#1a237e',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
  }catch(e){container.innerHTML=`<div style="width:200px;height:200px;display:flex;align-items:center;justify-content:center;color:#1a237e;font-size:0.8rem;padding:10px;text-align:center">QR: ${u.id}</div>`;}
  $('qrMemberInfo').textContent=`${u.name} • ${u.group} • ${u.id}`;
  allMemberSelects();
}
function downloadMyQR(){
  const canvas=document.querySelector('#myQRContainer canvas');
  if(!canvas){toast('⚠️ QR not ready');return;}
  const a=document.createElement('a'); a.download=`DBYC_QR_${getUser()?.id}.png`; a.href=canvas.toDataURL(); a.click();
  toast('✅ QR Downloaded!');
}
function generateForMember(){
  const id=$('genQRMemberSel').value, d=getData();
  const m=d.members.find(x=>x.id===id); if(!m) return;
  const cont=$('genQRResult');
  cont.innerHTML=`<div style="font-weight:700;color:#1a237e;margin-bottom:8px">${m.name}</div><div id="genQRBox" style="display:inline-block;padding:10px;background:#fff;border-radius:12px;border:3px solid #1a237e"></div>`;
  try{new QRCode($('genQRBox'),{text:JSON.stringify({id:m.id,name:m.name,group:m.group}),width:160,height:160,colorDark:'#1a237e',colorLight:'#ffffff'});}catch(e){}
  setTimeout(()=>{
    const canvas=document.querySelector('#genQRBox canvas');
    if(canvas){
      const btn=document.createElement('button'); btn.className='btn-sm btn-blue-sm'; btn.style.marginTop='10px';
      btn.textContent='⬇️ Download'; btn.onclick=()=>{const a=document.createElement('a');a.download=`DBYC_QR_${m.id}.png`;a.href=canvas.toDataURL();a.click();};
      cont.appendChild(document.createElement('br')); cont.appendChild(btn);
    }
  },500);
}
function genQRFor(id){
  goPage('qr'); setTimeout(()=>{if($('genQRMemberSel')){$('genQRMemberSel').value=id;generateForMember();}},200);
}

// ══════════════════════════════════════════════════════
// QR SCANNER
// ══════════════════════════════════════════════════════
let scanStream=null;
async function startScanner(){
  try{
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
    scanStream=stream;
    $('scanVideo').srcObject=stream;
    $('scannerStartArea').style.display='none';
    $('scannerActiveArea').style.display='';
    // Use ZXing if available
    if(window.ZXing){
      try{
        const reader=new ZXing.BrowserQRCodeReader();
        reader.decodeFromVideoDevice(null,'scanVideo',(result)=>{if(result){stopScanner();processQR(result.getText());}});
      }catch(e){}
    }
    toast('📷 Camera started');
  }catch(e){toast('⚠️ Camera denied – use manual ID');}
}
function stopScanner(){
  if(scanStream){scanStream.getTracks().forEach(t=>t.stop());scanStream=null;}
  if($('scannerStartArea'))$('scannerStartArea').style.display='';
  if($('scannerActiveArea'))$('scannerActiveArea').style.display='none';
}
function processQR(text){
  try{let id;try{id=JSON.parse(text).id;}catch{id=text.trim();}checkin(id);}
  catch{toast('❌ Invalid QR');}
}
function doManualCheckin(){
  const id=$('manualId').value.trim(), session=$('manualSession').value.trim()||'QR Check-in';
  if(!id){toast('⚠️ Enter Member ID');return;}
  checkin(id,session);
}
function checkin(memberId,session='QR Check-in'){
  const d=getData(); const m=d.members.find(x=>x.id===memberId&&x.active);
  const res=$('checkinResultArea');
  if(!m){
    res.innerHTML=`<div class="checkin-card checkin-fail"><div style="font-size:2.5rem">❌</div><div style="font-size:1.1rem;font-weight:700;color:#c62828">Member Not Found</div><div style="color:var(--dbyc-muted);font-size:0.82rem">ID: ${memberId}</div></div>`;
    toast('❌ Not found!'); return;
  }
  const t=today(); const existing=d.attendance.find(a=>a.memberId===memberId&&a.date===t&&a.status!=='absent');
  if(existing){
    res.innerHTML=`<div class="checkin-card checkin-already"><div style="font-size:2.5rem">ℹ️</div><div style="font-size:1.1rem;font-weight:700;color:#3949ab">${m.name}</div><div style="color:var(--dbyc-muted);font-size:0.82rem">Already checked in today (${existing.status})</div></div>`;
    toast(`ℹ️ Already checked in`); return;
  }
  markAtt(memberId,t,session,'present');
  const att=attStats(memberId);
  res.innerHTML=`<div class="checkin-card checkin-success">
    <div style="font-size:2.5rem">✅</div>
    <div style="font-size:1.3rem;font-weight:900;color:#2e7d32">${m.name}</div>
    <div style="font-size:0.85rem;color:var(--dbyc-muted);margin:4px 0">${GI[m.group]||''} ${m.group} • ${m.role}</div>
    <div style="font-size:0.78rem;color:#1a237e">🆔 ${m.id} • 📋 ${att.pct}% • ⭐ ${d.members.find(x=>x.id===memberId)?.points||0} pts</div>
    <div style="font-size:0.72rem;color:var(--dbyc-muted);margin-top:4px">Checked in at ${new Date().toLocaleTimeString('en-IN')}</div>
  </div>`;
  toast(`✅ ${m.name} checked in!`);
}

// ══════════════════════════════════════════════════════
// ID CARD
// ══════════════════════════════════════════════════════
function renderIDCardPage(){
  const d=getData(), ms=d.members.filter(m=>m.active);
  populateSelect('idcardMemberSel',ms);
  if(ms.length) renderIDCardPreview();
}
function renderIDCardPreview(){
  const id=$('idcardMemberSel')?.value; if(!id) return;
  const d=getData(); const m=d.members.find(x=>x.id===id); if(!m) return;
  const att=attStats(id); const lv=getLevel(m.points||0);
  $('idcardPreview').innerHTML=buildIDCard(m,att,lv);
  setTimeout(()=>addQRToCard(m),300);
}
function buildIDCard(m,att,lv){
  return `<div class="id-card" id="idcard_${m.id}">
    <div class="id-card-top">
      <img src="images/dbyc-logo.jpg" class="id-card-top-logo" alt="" onerror="this.style.display='none'">
      <div class="id-card-top-title">DON BOSCO YOUTH CENTRE<br><span style="font-size:0.62rem">DBYC Member ID Card</span></div>
    </div>
    <div class="id-card-body">
      ${m.photo?`<img src="${m.photo}" class="id-card-photo" alt="">`:`<div class="id-card-photo-ph">${GI[m.group]||'👤'}</div>`}
      <div class="id-card-info">
        <div class="id-card-name">${m.name}</div>
        <div class="id-card-role">${m.role} • ${m.group}</div>
        <div class="id-card-detail">🆔 ${m.id}</div>
        <div class="id-card-detail">📅 ${fmtDate(m.dob)} (${calcAge(m.dob)} yrs)</div>
        <div class="id-card-detail">📱 ${m.mobile}</div>
        <div class="id-card-detail">📆 Since ${fmtDate(m.joinDate)}</div>
        <div style="margin-top:4px;font-size:0.65rem;color:${lv.color}">${lv.icon} ${lv.name} • ⭐ ${m.points||0} pts</div>
        <div style="font-size:0.65rem;color:#aab4e8">📋 ${att.pct}% Attendance</div>
      </div>
    </div>
    <div class="id-card-foot">
      <div style="font-size:0.62rem;color:#aab4e8">Valid 2026-27<br>Don Bosco Youth Centre</div>
      <div class="id-card-qr-mini" id="idcard_qr_${m.id}"></div>
    </div>
  </div>`;
}
function addQRToCard(m){
  const el=$('idcard_qr_'+m.id); if(!el) return;
  try{new QRCode(el,{text:JSON.stringify({id:m.id,name:m.name}),width:46,height:46,colorDark:'#1a237e',colorLight:'#ffffff'});}catch(e){}
}
function downloadIDCard(){
  const id=$('idcardMemberSel')?.value; if(!id) return;
  const el=$('idcard_'+id);
  if(el&&typeof html2canvas!=='undefined'){
    html2canvas(el,{backgroundColor:'#0d1642',scale:2}).then(c=>{
      const a=document.createElement('a'); a.download=`DBYC_ID_${id}.png`; a.href=c.toDataURL(); a.click();
      toast('✅ ID Card downloaded!');
    });
  } else toast('⚠️ Export not available');
}
function printIDCard(){
  const id=$('idcardMemberSel')?.value; const el=$('idcard_'+id);
  if(!el) return;
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>DBYC ID Card</title><style>body{margin:0;display:flex;justify-content:center;padding:20px;background:#fff}</style></head><body>${el.outerHTML}<script>window.onload=()=>window.print()<\/script></body></html>`);
  w.document.close();
}

// ══════════════════════════════════════════════════════
// CERTIFICATES
// ══════════════════════════════════════════════════════
function populateCertSelects(){
  const ms=getData().members.filter(m=>m.active);
  ['certAttSel','certMemSel','certMeritSel'].forEach(id=>populateSelect(id,ms));
}
function setCertTab(tab){
  ['att','mem','merit'].forEach(t=>$('cert'+t.charAt(0).toUpperCase()+t.slice(1)+'Panel').style.display=t===tab?'':'none');
}
function makeCert(type){
  const selId=type==='att'?'certAttSel':type==='mem'?'certMemSel':'certMeritSel';
  const id=$(selId).value; const d=getData(); const m=d.members.find(x=>x.id===id); if(!m) return;
  const att=attStats(id); const dt=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  let certHTML='';
  if(type==='att'){
    const period=$('certAttPeriod').value;
    certHTML=buildCert('ATTENDANCE CERTIFICATE',m.name,
      `This is to certify that <strong>${m.name}</strong>, Member ID <strong>${m.id}</strong>, of the <strong>${m.group}</strong> group, has maintained an attendance record of <strong>${att.pct}%</strong> (${att.present} present, ${att.late} late out of ${att.total} sessions) during <strong>${period}</strong> at Don Bosco Youth Centre.`,
      dt,`${att.pct}% Attendance • ${att.total} Sessions`);
    $('certAttPreview').innerHTML=certHTML;
  } else if(type==='mem'){
    certHTML=buildCert('MEMBERSHIP CERTIFICATE',m.name,
      `This is to certify that <strong>${m.name}</strong> is a valued member of Don Bosco Youth Centre (DBYC) as a <strong>${m.role}</strong> of the <strong>${m.group}</strong> group. Membership granted on <strong>${fmtDate(m.joinDate)}</strong> in recognition of commitment to the values of Don Bosco Youth Centre.`,
      dt,`${m.group} • ${m.role} • ID: ${m.id}`);
    $('certMemPreview').innerHTML=certHTML;
  } else {
    const reason=$('certMeritReason').value.trim()||'Outstanding Contribution';
    certHTML=buildCert('MERIT CERTIFICATE',m.name,
      `This is to certify that <strong>${m.name}</strong>, Member ID <strong>${m.id}</strong>, of the <strong>${m.group}</strong> group, is awarded this Merit Certificate for <strong>${reason}</strong> at Don Bosco Youth Centre, in recognition of exceptional dedication and contribution.`,
      dt,reason);
    $('certMeritPreview').innerHTML=certHTML;
  }
}
function buildCert(type,name,body,date,reason){
  return `<div class="cert-wrap" id="certEl" style="margin-top:14px">
    <img src="images/dbyc-logo.jpg" class="cert-header-logo" onerror="this.style.display='none'" alt="DBYC">
    <div class="cert-org">DON BOSCO YOUTH CENTRE</div>
    <div class="cert-type">${type}</div>
    <div class="cert-to">This is to certify that</div>
    <div class="cert-name">${name}</div>
    <div class="cert-body-text">${body}</div>
    <div class="cert-reason">⭐ ${reason}</div>
    <div class="cert-sigs">
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Date: ${date}</div></div>
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Director, DBYC</div></div>
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Asst. Director</div></div>
    </div>
    <div style="margin-top:14px;font-size:0.68rem;color:#777">Don Bosco Youth Centre • Issued ${date}</div>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap">
      <button class="btn-sm btn-blue-sm" onclick="downloadCert()">⬇️ Download</button>
      <button class="btn-sm btn-gold-sm" onclick="printCert()">🖨️ Print</button>
    </div>
  </div>`;
}
function downloadCert(){
  const el=$('certEl');
  if(!el){toast('⚠️ Generate first');return;}
  if(typeof html2canvas!=='undefined'&&typeof jspdf!=='undefined'){
    html2canvas(el,{backgroundColor:'#fffde7',scale:2}).then(c=>{
      const {jsPDF}=jspdf; const pdf=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
      pdf.addImage(c.toDataURL(),'PNG',10,10,277,185); pdf.save('DBYC_Certificate.pdf');
      toast('✅ PDF saved!');
    });
  } else if(typeof html2canvas!=='undefined'){
    html2canvas(el,{backgroundColor:'#fffde7',scale:2}).then(c=>{
      const a=document.createElement('a');a.download='DBYC_Certificate.png';a.href=c.toDataURL();a.click();
      toast('✅ Certificate saved!');
    });
  } else toast('⚠️ Library not loaded');
}
function printCert(){
  const el=$('certEl'); if(!el) return;
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>DBYC Certificate</title><style>body{margin:20px;font-family:serif;background:#fffde7}</style></head><body>${el.innerHTML.replace(/<button[^>]*>.*?<\/button>/gs,'')}<script>window.onload=()=>window.print()<\/script></body></html>`);
  w.document.close();
}

// ══════════════════════════════════════════════════════
// POINTS / LEVELS
// ══════════════════════════════════════════════════════
function renderPoints(){
  const u=getUser(); if(!u) return;
  const lv=getLevel(u.points||0);
  const next=PTS_LEVELS.find(l=>l.min>(u.points||0));
  const pct=next?Math.min(100,Math.round(((u.points||0)-lv.min)/(next.min-lv.min)*100)):100;
  $('myPointsSection').innerHTML=`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:4rem">${lv.icon}</div>
      <div style="font-size:1.5rem;font-weight:900;color:${lv.color}">${lv.name}</div>
      <div style="font-size:2rem;font-weight:900;margin:8px 0">⭐ ${u.points||0}</div>
      <div class="progress-bar" style="max-width:260px;margin:8px auto"><div class="progress-fill" style="width:${pct}%;background:${lv.color}"></div></div>
      <div style="font-size:0.78rem;color:var(--dbyc-muted)">${next?`${next.min-(u.points||0)} pts to ${next.name}`:' Max Level Achieved! 🎉'}</div>
    </div>
    <div style="font-size:0.78rem;color:var(--dbyc-muted);text-align:center;margin-top:8px">
      Earn points: 📋 Present (+5) • ⏰ Late (+2) • Registration (+50)
    </div>`;
  // Leaderboard
  const d=getData(), sorted=[...d.members].filter(m=>m.active).sort((a,b)=>(b.points||0)-(a.points||0));
  $('leaderboardEl').innerHTML=sorted.slice(0,15).map((m,i)=>{
    const ml=getLevel(m.points||0); const medals=['🥇','🥈','🥉'];
    return `<div class="lb-row lb-${i+1}">
      <div class="lb-rank">${medals[i]||`#${i+1}`}</div>
      ${m.photo?`<img src="${m.photo}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid #1a237e" alt="">`:`<div style="width:36px;height:36px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff">${GI[m.group]||'👤'}</div>`}
      <div style="flex:1"><div style="font-weight:700;font-size:0.88rem">${m.name}</div><div style="font-size:0.7rem;color:var(--dbyc-muted)">${m.group} • ${ml.icon} ${ml.name}</div></div>
      <div class="lb-pts">${m.points||0} ⭐</div>
    </div>`;
  }).join('');
  // Level system
  $('levelSystemEl').innerHTML=PTS_LEVELS.map(l=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eee">
      <span style="font-size:1.5rem">${l.icon}</span>
      <div style="flex:1"><b style="color:${l.color}">${l.name}</b><div style="font-size:0.72rem;color:var(--dbyc-muted)">${l.min}+ points</div></div>
      ${(u.points||0)>=l.min?'<span style="color:#2e7d32;font-weight:800">✅</span>':'<span style="color:#ddd">○</span>'}
    </div>`).join('');
}
function openPtsModal(memberId){
  $('ptsMemberId').value=memberId;
  $('ptsAmount').value=10; $('ptsReason').value='';
  openModal('pointsModal');
}
function doAwardPoints(){
  if(!isAdmin()){toast('⛔ Admin only');return;}
  const id=$('ptsMemberId').value, pts=parseInt($('ptsAmount').value)||0, reason=$('ptsReason').value||'Award';
  if(!pts){toast('⚠️ Enter points');return;}
  const d=getData(); const m=d.members.find(x=>x.id===id); if(!m) return;
  m.points=(m.points||0)+pts;
  d.pts_log.push({memberId:id,pts,reason,date:today(),by:getUser()?.id});
  save(d); closeModal('pointsModal'); toast(`✅ +${pts} pts awarded!`);
  renderPoints();
}

// ══════════════════════════════════════════════════════
// EVENTS
// ══════════════════════════════════════════════════════
function renderEvents(){
  const d=getData();
  $('eventsList').innerHTML=d.events?.length
    ? [...d.events].reverse().map(ev=>`
      <div style="padding:12px 0;border-bottom:1px solid #eee">
        <div style="font-weight:700;color:#1a237e">🎉 ${ev.title}</div>
        <div style="font-size:0.78rem;color:var(--dbyc-muted);margin:3px 0">📅 ${fmtDate(ev.date)}</div>
        <div style="font-size:0.82rem;color:#333">${ev.desc||''}</div>
      </div>`).join('')
    : '<div class="empty-msg">No events yet</div>';
  if($('addEventBtn')) $('addEventBtn').style.display=isAdmin()?'':'none';
}
function openAddEvent(){
  $('evTitle').value=''; $('evDate').value=today(); $('evDesc').value='';
  openModal('eventModal');
}
function saveEvent(){
  const title=$('evTitle').value.trim(), date=$('evDate').value, desc=$('evDesc').value.trim();
  if(!title||!date){toast('⚠️ Fill title and date');return;}
  const d=getData(); if(!d.events) d.events=[];
  d.events.push({id:Date.now(),title,date,desc,by:getUser()?.id}); save(d);
  closeModal('eventModal'); toast('✅ Event saved!'); renderEvents();
}

// ══════════════════════════════════════════════════════
// BIRTHDAYS – Full Feature
// ══════════════════════════════════════════════════════
function renderBirthdays(){
  const d=getData(); const now=new Date();
  const mo=now.getMonth()+1; const todayDay=now.getDate();
  const todayBdays=getTodayBirthdays(d);
  const upcoming=getUpcomingBirthdays(d,30);

  // Today's birthdays hero
  const todayEl=$('bdayTodaySection');
  if(todayEl){
    if(todayBdays.length>0){
      todayEl.innerHTML=`
        <div style="background:linear-gradient(135deg,#ff8f00,#ffd54f);border-radius:16px;padding:16px;margin-bottom:14px;text-align:center">
          <div style="font-size:2.5rem">🎂🎉🎈</div>
          <div style="font-size:1.1rem;font-weight:900;color:#1a237e;margin-top:6px">Today's Birthday${todayBdays.length>1?'s':''}!</div>
          ${todayBdays.map(m=>`
            <div style="background:rgba(255,255,255,0.7);border-radius:12px;padding:12px;margin-top:10px;display:flex;align-items:center;gap:12px">
              ${m.photo?`<img src="${m.photo}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:3px solid #1a237e" alt="">`:`<div style="width:60px;height:60px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:#fff;flex-shrink:0">🎂</div>`}
              <div style="flex:1;text-align:left">
                <div style="font-size:1rem;font-weight:900;color:#1a237e">${m.name}</div>
                <div style="font-size:0.8rem;color:#5d4037">${GI[m.group]||''} ${m.group} • ${m.role}</div>
                <div style="font-size:0.75rem;color:#5d4037">🎂 Turning ${calcAge(m.dob)} today!</div>
              </div>
            </div>
            <div style="display:flex;gap:6px;margin-top:8px;justify-content:center">
              <button class="btn-sm btn-blue-sm" onclick="shareBirthdayWish('${m.id}')">🎊 Send Wish</button>
              <button class="btn-sm btn-gold-sm" onclick="genBirthdayCard('${m.id}')">🎨 Birthday Card</button>
            </div>`).join('')}
        </div>`;
    } else {
      todayEl.innerHTML=`<div style="text-align:center;padding:12px 0;color:var(--dbyc-muted);font-size:0.85rem;margin-bottom:10px">🗓️ No birthdays today</div>`;
    }
  }

  // This month's list
  const thisMo=d.members.filter(m=>{
    if(!m.dob||!m.active) return false;
    return parseInt(m.dob.split('-')[1])===mo;
  }).sort((a,b)=>parseInt(a.dob.split('-')[2])-parseInt(b.dob.split('-')[2]));

  const listEl=$('birthdayList');
  if(listEl) listEl.innerHTML=thisMo.length
    ? thisMo.map(m=>{
        const bday=parseInt(m.dob.split('-')[2]);
        const isToday=bday===todayDay;
        const isPast=bday<todayDay;
        const daysLeft=bday-todayDay;
        return `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #eee${isToday?';background:#fff9c4;border-radius:10px;padding:10px;margin:0 -4px':''}">
          ${m.photo
            ? `<img src="${m.photo}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2.5px solid ${isToday?'#ff8f00':isPast?'#ccc':'#1a237e'};${isPast?'opacity:0.6':''}" alt="">`
            : `<div style="width:48px;height:48px;border-radius:50%;background:${isToday?'linear-gradient(135deg,#ff8f00,#ffd54f)':isPast?'#ccc':'#1a237e'};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;color:#fff">${isToday?'🎂':GI[m.group]||'👤'}</div>`}
          <div style="flex:1">
            <div style="font-weight:700;color:${isToday?'#e65100':isPast?'#999':'#111'};font-size:0.9rem">${m.name} ${isToday?'🎉':isPast?'✓':''}</div>
            <div style="font-size:0.7rem;color:var(--dbyc-muted)">${m.group} • 🎂 ${m.dob.split('-')[2]} ${now.toLocaleDateString('en-IN',{month:'long'})} (${calcAge(m.dob)} yrs)</div>
          </div>
          <div style="text-align:right;font-size:0.72rem;font-weight:800">
            ${isToday?'<span style="color:#e65100">🎉 Today!</span>':isPast?`<span style="color:#999">${Math.abs(daysLeft)}d ago</span>`:`<span style="color:#1a237e">in ${daysLeft}d</span>`}
          </div>
        </div>`;
      }).join('')
    : `<div class="empty-msg">No birthdays in ${now.toLocaleDateString('en-IN',{month:'long'})}</div>`;

  // Upcoming all months
  const upcomingEl=$('bdayUpcomingList');
  if(upcomingEl) upcomingEl.innerHTML=upcoming.filter(m=>m._daysLeft>0).slice(0,10).map(m=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eee">
      ${m.photo?`<img src="${m.photo}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #1a237e" alt="">`:`<div style="width:38px;height:38px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff">${GI[m.group]||'👤'}</div>`}
      <div style="flex:1"><div style="font-weight:700;font-size:0.85rem">${m.name}</div><div style="font-size:0.7rem;color:var(--dbyc-muted)">${m.group} • 🎂 ${fmtDate(m.dob)}</div></div>
      <div style="background:#e8eaf6;color:#3949ab;padding:4px 10px;border-radius:12px;font-size:0.72rem;font-weight:800">
        ${m._daysLeft===0?'🎉 Today!':m._daysLeft===1?'Tomorrow!':'in '+m._daysLeft+' days'}
      </div>
    </div>`).join('')||'<div class="empty-msg">No upcoming</div>';
}
function shareBirthdayWish(memberId){
  const d=getData(); const m=d.members.find(x=>x.id===memberId); if(!m) return;
  const msg=`🎂 Happy Birthday ${m.name}! 🎉\nWishing you a wonderful ${calcAge(m.dob)}th birthday!\nWith love from DBYC – Don Bosco Youth Centre 🙏\n"Give me souls, take away the rest." – St. John Bosco`;
  if(navigator.share){navigator.share({title:`Happy Birthday ${m.name}!`,text:msg}).catch(()=>{});}
  else{navigator.clipboard.writeText(msg).then(()=>toast('✅ Birthday wish copied to clipboard!')).catch(()=>toast(msg));}
}
function genBirthdayCard(memberId){
  const d=getData(); const m=d.members.find(x=>x.id===memberId); if(!m) return;
  const card=document.createElement('div');
  card.style.cssText='width:360px;background:linear-gradient(135deg,#1a237e,#7b1fa2);padding:30px;border-radius:20px;text-align:center;font-family:sans-serif;position:fixed;left:-9999px;top:0';
  card.innerHTML=`<div style="font-size:3rem">🎂🎉🎈</div><div style="font-size:1.5rem;font-weight:900;color:#ffd700;margin:10px 0">Happy Birthday!</div>${m.photo?`<img src="${m.photo}" style="width:80px;height:80px;border-radius:50%;border:3px solid #ffd700;object-fit:cover;margin:10px 0" alt="">`:''}<div style="font-size:1.2rem;font-weight:800;color:#fff;margin:8px 0">${m.name}</div><div style="font-size:0.85rem;color:#aab4e8">Turning ${calcAge(m.dob)} • ${m.group}</div><div style="font-size:0.75rem;color:#ffd700;margin-top:12px;font-style:italic">"Give me souls, take away the rest."<br>– St. John Bosco</div><div style="font-size:0.7rem;color:#aab4e8;margin-top:8px">❤️ With love from DBYC</div>`;
  document.body.appendChild(card);
  if(typeof html2canvas!=='undefined'){
    html2canvas(card,{scale:2,backgroundColor:'#1a237e'}).then(c=>{
      const a=document.createElement('a');a.download=`DBYC_Birthday_${m.name.replace(/\s/g,'_')}.png`;a.href=c.toDataURL();a.click();
      document.body.removeChild(card); toast('🎂 Birthday card downloaded!');
    });
  } else { document.body.removeChild(card); toast('⚠️ html2canvas library required'); }
}

// ══════════════════════════════════════════════════════
// NEWS & UPDATES – Full Feature
// ══════════════════════════════════════════════════════
function renderNews(){
  const d=getData(), u=getUser();
  const allNews=[...(d.news||[])].reverse();
  const allAnns=d.announcements.filter(a=>a.group==='All'||a.group===u?.group).reverse();
  const newsAddBtn=$('newsAddBtn');
  if(newsAddBtn) newsAddBtn.style.display=isAdmin()?'':'none';

  // Pinned first
  const pinned=allNews.filter(n=>n.pinned);
  const regular=allNews.filter(n=>!n.pinned);

  const el=$('newsList');
  if(!el) return;
  let html='';
  if(pinned.length>0){
    html+=`<div style="font-size:0.72rem;font-weight:800;color:#e53935;letter-spacing:1px;margin-bottom:8px">📌 PINNED</div>`;
    html+=pinned.map(n=>newsItemHtml(n,d,u)).join('');
    html+=`<div style="font-size:0.72rem;font-weight:800;color:#607d8b;letter-spacing:1px;margin:14px 0 8px">📰 ALL NEWS</div>`;
  }
  html+=regular.map(n=>newsItemHtml(n,d,u)).join('');
  if(allAnns.length>0){
    html+=`<div style="font-size:0.72rem;font-weight:800;color:#1a237e;letter-spacing:1px;margin:14px 0 8px">📣 ANNOUNCEMENTS</div>`;
    html+=allAnns.map(a=>`<div style="padding:12px 0;border-bottom:1px solid #eee">
      <div style="font-weight:700;color:#1a237e;font-size:0.88rem">📣 ${a.title}</div>
      <div style="font-size:0.8rem;color:#333;margin:4px 0;line-height:1.5">${a.message}</div>
      <div style="font-size:0.65rem;color:var(--dbyc-muted)">${a.group} • ${fmtDate(a.date)} • ${a.author}</div>
    </div>`).join('');
  }
  el.innerHTML=html||'<div class="empty-msg">No news yet</div>';
}
function newsItemHtml(n,d,u){
  const cats={'General':'🗞️','Event':'🎉','Announcement':'📣','Sports':'🏃','Prayer':'🙏','Achievement':'🏆','Alert':'⚠️'};
  const icon=cats[n.category]||'📰';
  return `<div style="padding:12px 0;border-bottom:1px solid #eee">
    ${n.pinned?'<span style="font-size:0.6rem;background:#e53935;color:#fff;padding:1px 6px;border-radius:8px;margin-right:4px">📌</span>':''}
    <span style="font-size:0.6rem;background:#e8eaf6;color:#3949ab;padding:1px 6px;border-radius:8px">${icon} ${n.category||'News'}</span>
    <div style="font-weight:800;font-size:0.9rem;color:#1a237e;margin-top:4px">${n.title}</div>
    <div style="font-size:0.8rem;color:#333;margin:4px 0;line-height:1.6">${n.content}</div>
    <div style="font-size:0.65rem;color:var(--dbyc-muted);display:flex;justify-content:space-between;margin-top:4px">
      <span>📅 ${fmtDate(n.date)} • ✍️ ${n.author}</span>
      ${isAdmin()?`<button onclick="deleteNews(${n.id})" style="background:none;border:none;color:#e53935;font-size:0.72rem;cursor:pointer">🗑️ Delete</button>`:''}
    </div>
  </div>`;
}
function openAddNews(){
  if(!isAdmin()){toast('⛔ Admin only');return;}
  $('newsModalTitle').textContent='📰 Add News';
  $('newsTitle').value=''; $('newsContent').value=''; $('newsCategory').value='General'; $('newsPinned').checked=false;
  openModal('newsModal');
}
function saveNews(){
  if(!isAdmin()) return;
  const title=$('newsTitle').value.trim(), content=$('newsContent').value.trim();
  if(!title||!content){toast('⚠️ Fill all fields');return;}
  const d=getData(), u=getUser();
  if(!d.news) d.news=[];
  const item={id:Date.now(),title,content,category:$('newsCategory').value,date:today(),author:u?.name||'Admin',pinned:$('newsPinned').checked};
  d.news.push(item);
  pushNotification(d,'all','📰 New News Posted',title,'#e53935','news');
  save(d); closeModal('newsModal'); toast('✅ News published!'); renderNews();
  updateTickerFromData();
}
function deleteNews(id){
  if(!isAdmin()||!confirm('Delete this news?')) return;
  const d=getData(); d.news=(d.news||[]).filter(n=>n.id!==id); save(d); renderNews(); toast('🗑️ Deleted');
}

// ══════════════════════════════════════════════════════
// NOTIFICATIONS – Full System
// ══════════════════════════════════════════════════════
function pushNotification(d, memberId, title, body, color='#1a237e', type='info'){
  if(!d.notifications) d.notifications=[];
  d.notifications.push({id:Date.now(),memberId,title,body,color,type,date:today(),read:false});
  // Trim to 100 max
  if(d.notifications.length>100) d.notifications=d.notifications.slice(-100);
}
function markAllNotifsRead(){
  const d=getData(), u=getUser();
  (d.notifications||[]).forEach(n=>{if(n.memberId===u?.id||n.memberId==='all')n.read=true;});
  save(d); renderNotifications(); updateAllBadges(d,u); toast('✅ All marked as read');
}
function renderNotifications(){
  const d=getData(), u=getUser(); if(!u) return;
  // Combine: real notifications + birthday alerts + announcements
  const myNotifs=[...(d.notifications||[])].filter(n=>n.memberId==='all'||n.memberId===u.id).reverse();
  // Birthday notifications
  const todayBdays=getTodayBirthdays(d);
  const bdayNotifs=todayBdays.map(m=>({id:'bday_'+m.id,memberId:'all',title:`🎂 ${m.name}'s Birthday Today!`,body:`${m.name} is turning ${calcAge(m.dob)} today! 🎉`,color:'#ff8f00',type:'birthday',date:today(),read:false}));
  // Upcoming birthdays (3 days)
  const upcoming=getUpcomingBirthdays(d,30).filter(m=>m._daysLeft>0&&m._daysLeft<=3);
  const upcomingNotifs=upcoming.map(m=>({id:'upbday_'+m.id,memberId:'all',title:`🎂 Birthday in ${m._daysLeft} day${m._daysLeft>1?'s':''}!`,body:`${m.name}'s birthday is on ${fmtDate(m.dob)} (${m._daysLeft} day${m._daysLeft>1?'s':''} away)`,color:'#ff8f00',type:'birthday',date:today(),read:false}));
  const allNotifs=[...bdayNotifs,...upcomingNotifs,...myNotifs];

  const el=$('notifList');
  const markReadBtn=$('markReadBtn');
  const unreadCount=myNotifs.filter(n=>!n.read).length;
  if(markReadBtn) markReadBtn.style.display=unreadCount>0?'':'none';

  el.innerHTML=allNotifs.length
    ? allNotifs.map(n=>`
      <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #eee;align-items:flex-start;${!n.read?'background:#f7f9ff;margin:0 -16px;padding:12px 16px;border-radius:8px;margin-bottom:2px':''}">
        <div style="width:42px;height:42px;border-radius:12px;background:${n.color||'#1a237e'};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">
          ${n.type==='birthday'?'🎂':n.type==='news'?'📰':n.type==='attendance'?'📋':n.type==='points'?'⭐':n.type==='system'?'🙏':'📣'}
        </div>
        <div style="flex:1">
          <div style="font-size:0.88rem;font-weight:${!n.read?'800':'600'};color:#111">${n.title}</div>
          <div style="font-size:0.78rem;color:#444;margin-top:3px;line-height:1.4">${n.body}</div>
          <div style="font-size:0.65rem;color:var(--dbyc-muted);margin-top:4px">📅 ${fmtDate(n.date)}</div>
        </div>
        ${!n.read&&!n.id.toString().startsWith('bday')&&!n.id.toString().startsWith('upbday')?`<div style="width:8px;height:8px;border-radius:50%;background:#1a237e;flex-shrink:0;margin-top:4px"></div>`:''}
      </div>`).join('')
    : '<div class="empty-msg">📭 No notifications yet</div>';

  // Mark visible ones as read
  setTimeout(()=>{
    const d2=getData();
    (d2.notifications||[]).forEach(n=>{if(n.memberId===u.id||n.memberId==='all')n.read=true;});
    save(d2);
    const nb=$('notifBadge'); if(nb) nb.style.display='none';
  },2000);
}

// ══════════════════════════════════════════════════════
// DBYC MINUTES
// ══════════════════════════════════════════════════════
function renderMinutes(){
  const d=getData(), u=getUser();
  const addBtn=$('minutesAddBtn');
  if(addBtn) addBtn.style.display=isAdmin()?'':'none';
  const mins=[...(d.minutes||[])].reverse();
  const el=$('minutesList'); if(!el) return;
  el.innerHTML=mins.length
    ? mins.map(m=>`
      <div style="padding:14px 0;border-bottom:2px solid #e8eaf6">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px">
          <div>
            <div style="font-weight:900;font-size:0.92rem;color:#1a237e">📋 ${m.title}</div>
            <div style="font-size:0.7rem;color:var(--dbyc-muted)">📅 ${fmtDate(m.date)} • 👥 ${m.group||'All'} • ✍️ ${m.author} • 🧑‍🤝‍🧑 ${m.attendees||0} present</div>
          </div>
          ${isAdmin()?`<button onclick="deleteMinutes(${m.id})" style="background:none;border:none;color:#e53935;font-size:0.85rem;cursor:pointer;flex-shrink:0">🗑️</button>`:''}
        </div>
        ${m.agenda?`<div style="margin:8px 0"><div style="font-size:0.72rem;font-weight:800;color:#e65100;letter-spacing:1px;margin-bottom:3px">📌 AGENDA</div><div style="font-size:0.8rem;color:#333;line-height:1.6;white-space:pre-line;padding:8px;background:#fff3e0;border-radius:8px;border-left:3px solid #e65100">${m.agenda}</div></div>`:''}
        ${m.decisions?`<div style="margin:8px 0"><div style="font-size:0.72rem;font-weight:800;color:#2e7d32;letter-spacing:1px;margin-bottom:3px">✅ DECISIONS</div><div style="font-size:0.8rem;color:#333;line-height:1.6;white-space:pre-line;padding:8px;background:#e8f5e9;border-radius:8px;border-left:3px solid #2e7d32">${m.decisions}</div></div>`:''}
        ${m.notes?`<div style="font-size:0.78rem;color:#555;background:#f5f5f5;padding:8px;border-radius:8px;margin-top:6px;white-space:pre-line">${m.notes}</div>`:''}
        <div style="display:flex;gap:6px;margin-top:8px">
          <button class="btn-sm btn-blue-sm" onclick="printMinutes(${m.id})">🖨️ Print</button>
          <button class="btn-sm" style="background:#f0f4ff;color:#1a237e" onclick="exportMinutesPDF(${m.id})">📄 PDF</button>
        </div>
      </div>`).join('')
    : '<div class="empty-msg">No meeting minutes posted yet</div>';
}
function openAddMinutes(){
  if(!isAdmin()){toast('⛔ Admin only');return;}
  $('minTitle').value=`Meeting – ${new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'})}`;
  $('minDate').value=today(); $('minGroup').value='All';
  $('minAgenda').value=''; $('minDecisions').value=''; $('minNotes').value=''; $('minAttendees').value=0;
  openModal('minutesModal');
}
function saveMinutes(){
  if(!isAdmin()) return;
  const title=$('minTitle').value.trim(), date=$('minDate').value;
  if(!title||!date){toast('⚠️ Fill title and date');return;}
  const d=getData(), u=getUser();
  if(!d.minutes) d.minutes=[];
  const item={id:Date.now(),title,date,group:$('minGroup').value,agenda:$('minAgenda').value.trim(),decisions:$('minDecisions').value.trim(),notes:$('minNotes').value.trim(),attendees:parseInt($('minAttendees').value)||0,author:u?.name||'Admin'};
  d.minutes.push(item);
  pushNotification(d,'all','📋 New Meeting Minutes Posted',title,'#e65100','minutes');
  save(d); closeModal('minutesModal'); toast('✅ Minutes saved!'); renderMinutes();
  if($('minutesBadge')){$('minutesBadge').style.display='flex';$('minutesBadge').textContent=d.minutes.length;}
}
function deleteMinutes(id){
  if(!isAdmin()||!confirm('Delete these minutes?')) return;
  const d=getData(); d.minutes=(d.minutes||[]).filter(m=>m.id!==id); save(d); renderMinutes(); toast('🗑️ Deleted');
}
function printMinutes(id){
  const d=getData(); const m=d.minutes?.find(x=>x.id===id); if(!m) return;
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>DBYC Minutes – ${m.title}</title><style>body{font-family:sans-serif;max-width:700px;margin:0 auto;padding:20px}h1{color:#1a237e}h3{color:#e65100}.box{background:#f5f5f5;padding:12px;border-radius:8px;margin:8px 0;white-space:pre-line}</style></head><body>
    <div style="text-align:center;border-bottom:2px solid #1a237e;padding-bottom:16px;margin-bottom:20px">
      <h2 style="color:#1a237e;margin:0">DON BOSCO YOUTH CENTRE</h2>
      <div style="color:#607d8b;font-size:0.9rem">பேரின் பாலம், சென்னை – 600 017</div>
      <h3 style="margin:8px 0">MEETING MINUTES</h3>
    </div>
    <h1>${m.title}</h1>
    <p><strong>Date:</strong> ${fmtDate(m.date)} | <strong>Group:</strong> ${m.group} | <strong>Present:</strong> ${m.attendees} members | <strong>Recorded by:</strong> ${m.author}</p>
    ${m.agenda?`<h3>📌 Agenda</h3><div class="box">${m.agenda}</div>`:''}
    ${m.decisions?`<h3>✅ Decisions</h3><div class="box">${m.decisions}</div>`:''}
    ${m.notes?`<h3>📝 Additional Notes</h3><div class="box">${m.notes}</div>`:''}
    <div style="margin-top:30px;border-top:2px solid #1a237e;padding-top:16px;display:flex;justify-content:space-around">
      <div style="text-align:center"><div style="width:120px;border-top:1px solid #333;margin:0 auto 4px"></div><div style="font-size:0.8rem">Director, DBYC</div></div>
      <div style="text-align:center"><div style="width:120px;border-top:1px solid #333;margin:0 auto 4px"></div><div style="font-size:0.8rem">Asst. Director</div></div>
      <div style="text-align:center"><div style="width:120px;border-top:1px solid #333;margin:0 auto 4px"></div><div style="font-size:0.8rem">Secretary</div></div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`);
  w.document.close();
}
function exportMinutesPDF(id){
  if(typeof jspdf==='undefined'){toast('⚠️ PDF library not available. Use Print instead.');printMinutes(id);return;}
  const d=getData(); const m=d.minutes?.find(x=>x.id===id); if(!m) return;
  const {jsPDF}=jspdf; const pdf=new jsPDF();
  pdf.setFontSize(16);pdf.setTextColor(26,35,126);pdf.text('DON BOSCO YOUTH CENTRE',105,15,{align:'center'});
  pdf.setFontSize(10);pdf.setTextColor(100,100,100);pdf.text('பேரின் பாலம், சென்னை – 600 017',105,22,{align:'center'});
  pdf.setFontSize(13);pdf.setTextColor(26,35,126);pdf.text('MEETING MINUTES',105,32,{align:'center'});
  pdf.setFontSize(12);pdf.setTextColor(50,50,50);pdf.text(m.title,15,44);
  pdf.setFontSize(9);pdf.text(`Date: ${fmtDate(m.date)} | Group: ${m.group} | Present: ${m.attendees} | By: ${m.author}`,15,52);
  let y=62;
  if(m.agenda){pdf.setFontSize(10);pdf.setTextColor(230,81,0);pdf.text('AGENDA:',15,y);y+=6;pdf.setFontSize(9);pdf.setTextColor(50,50,50);const lines=pdf.splitTextToSize(m.agenda,180);pdf.text(lines,15,y);y+=lines.length*6+4;}
  if(m.decisions){pdf.setFontSize(10);pdf.setTextColor(46,125,50);pdf.text('DECISIONS:',15,y);y+=6;pdf.setFontSize(9);pdf.setTextColor(50,50,50);const lines=pdf.splitTextToSize(m.decisions,180);pdf.text(lines,15,y);y+=lines.length*6+4;}
  if(m.notes){pdf.setFontSize(10);pdf.setTextColor(100,100,100);pdf.text('NOTES:',15,y);y+=6;pdf.setFontSize(9);const lines=pdf.splitTextToSize(m.notes,180);pdf.text(lines,15,y);}
  pdf.save(`DBYC_Minutes_${m.title.replace(/\s+/g,'_')}.pdf`);
  toast('✅ PDF saved!');
}

function filterNews(btn, cat){
  document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('filter-active'));
  btn.classList.add('filter-active');
  const d=getData(), u=getUser();
  const el=document.getElementById('newsList'); if(!el) return;
  let news=[...(d.news||[])].reverse();
  let anns=d.announcements.filter(a=>a.group==='All'||a.group===u?.group).reverse();
  if(cat!=='all'){
    news=news.filter(n=>n.category===cat);
    anns=cat==='Announcement'?anns:[];
  }
  let html='';
  news.forEach(n=>{html+=newsItemHtml(n,d,u);});
  if(anns.length>0){
    html+='<div style="font-size:0.72rem;font-weight:800;color:#1a237e;letter-spacing:1px;margin:10px 0 6px">ANNOUNCEMENTS</div>';
    anns.forEach(a=>{html+=`<div style="padding:10px 0;border-bottom:1px solid #eee"><div style="font-weight:700;color:#1a237e;font-size:0.85rem">${a.title}</div><div style="font-size:0.8rem;color:#333;margin:3px 0">${a.message}</div><div style="font-size:0.65rem;color:var(--dbyc-muted)">${a.group} • ${fmtDate(a.date)} • ${a.author}</div></div>`;});
  }
  el.innerHTML=html||'<div class="empty-msg">No news in this category</div>';
}

function updateTickerFromData(){
  const d=getData(); const u=getUser();
  const anns=d.announcements.slice(-3).map(a=>a.title+' – '+a.message);
  const news=(d.news||[]).slice(-2).map(n=>n.title);
  const ticks=[...d.tickers,...anns,...news];
  const el=$('tickerText'); if(el) el.textContent=ticks.join('   •   ');
}
    : '<div class="empty-msg">No notifications</div>';
}

// ══════════════════════════════════════════════════════
// ADMIN REPORTS
// ══════════════════════════════════════════════════════
function switchAdminTab(tab){
  const renders={
    stats:renderAdminStats,
    members:renderManageMembers,
    announce:renderAnnounce,
    export:renderExport,
    leaderboard:()=>{renderPoints();$('adminTabContent').innerHTML=$('leaderboardEl').innerHTML||'';},
    attendance:renderAttReport
  };
  if(renders[tab]) renders[tab]();
}
function renderAdminStats(){
  const d=getData(); const ms=d.members.filter(m=>m.active);
  const todayAtt=d.attendance.filter(a=>a.date===today()&&a.status==='present').length;
  const gc={};GROUPS.forEach(g=>gc[g]=ms.filter(m=>m.group===g).length);
  $('adminTabContent').innerHTML=`
    <div class="stat-row" style="margin-bottom:14px">
      <div class="stat-box"><div class="stat-val">${ms.length}</div><div class="stat-lbl">Members</div></div>
      <div class="stat-box"><div class="stat-val">${todayAtt}</div><div class="stat-lbl">Today Present</div></div>
      <div class="stat-box"><div class="stat-val">${d.attendance.length}</div><div class="stat-lbl">All Records</div></div>
      <div class="stat-box"><div class="stat-val">${d.announcements.length}</div><div class="stat-lbl">Announcements</div></div>
    </div>
    <div class="white-card" style="margin:0 0 14px">
      <div class="card-title">👥 Members by Group</div>
      ${GROUPS.map(g=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;font-size:0.85rem"><span>${GI[g]||''} ${g}</span><b>${gc[g]||0}</b></div>`).join('')}
    </div>
    <div class="white-card" style="margin:0">
      <div class="card-title">🕓 Recent Check-ins</div>
      ${[...d.attendance].reverse().slice(0,8).map(a=>{const m=d.members.find(x=>x.id===a.memberId);return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:0.82rem"><div><b>${m?.name||a.memberId}</b><br><span style="color:var(--dbyc-muted);font-size:0.7rem">${a.session||''} • ${fmtDate(a.date)}</span></div><span style="${a.status==='present'?'color:#2e7d32':a.status==='late'?'color:#e65100':'color:#c62828'};font-weight:700">${a.status}</span></div>`;}).join('')||'<div class="empty-msg">No records</div>'}
    </div>`;
}
function renderManageMembers(){
  const d=getData();
  $('adminTabContent').innerHTML=`
    <div class="white-card" style="margin:0">
      <div class="card-title">👥 All Members</div>
      ${isSuperAdmin()?`<button class="btn-primary" style="margin-bottom:12px" onclick="openAddMemberModal()">➕ Add New Member</button>`:''}
      ${d.members.filter(m=>m.active).map(m=>`
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eee">
          ${m.photo?`<img src="${m.photo}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:1.5px solid #1a237e" alt="">`:`<div style="width:38px;height:38px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff">${GI[m.group]||'👤'}</div>`}
          <div style="flex:1;font-size:0.82rem"><b>${m.name}</b><br><span style="color:var(--dbyc-muted)">${m.id} • ${m.group} • ${m.role}</span></div>
          <div style="display:flex;gap:4px">
            <button class="btn-sm btn-blue-sm" onclick="openEditMemberModal('${m.id}')">✏️</button>
            <button class="btn-sm btn-gold-sm" onclick="openPtsModal('${m.id}')">⭐</button>
            ${isSuperAdmin()?`<button class="btn-sm btn-red-sm" onclick="removeMember('${m.id}')">🗑️</button>`:''}
          </div>
        </div>`).join('')}
    </div>`;
}
function removeMember(id){
  if(!confirm('Remove this member?')) return;
  const d=getData(); const m=d.members.find(x=>x.id===id); if(m){m.active=false;save(d);renderManageMembers();toast('Removed');}
}
function renderAnnounce(){
  const d=getData();
  $('adminTabContent').innerHTML=`
    <div class="white-card" style="margin:0 0 14px">
      <div class="card-title">📣 Post Announcement</div>
      <div class="form-field"><label class="form-label">Title</label><input type="text" id="annTitle" class="form-input" placeholder="Title"></div>
      <div class="form-field"><label class="form-label">Message</label><textarea id="annMsg" class="form-input" style="resize:vertical;min-height:70px" placeholder="Message..."></textarea></div>
      <div class="form-field"><label class="form-label">Target</label>
        <select id="annGroup" class="form-select"><option value="All">All Members</option>${GROUPS.map(g=>`<option value="${g}">${g}</option>`).join('')}</select>
      </div>
      <button class="btn-primary" onclick="postAnn()">📤 Post</button>
    </div>
    <div class="white-card" style="margin:0">
      <div class="card-title">📋 Posted</div>
      ${[...d.announcements].reverse().map(a=>`<div class="ann-item"><div class="ann-title">${a.title}</div><div class="ann-msg">${a.message}</div><div class="ann-meta">${a.group} • ${fmtDate(a.date)}</div></div>`).join('')||'<div class="empty-msg">None</div>'}
    </div>`;
}
function postAnn(){
  const title=$('annTitle')?.value.trim(), msg=$('annMsg')?.value.trim(), group=$('annGroup')?.value;
  if(!title||!msg){toast('⚠️ Fill all fields');return;}
  const d=getData(); const u=getUser();
  d.announcements.push({id:Date.now(),title,message:msg,group,date:today(),author:u?.name||'Admin'});
  save(d); toast('✅ Posted!'); renderAnnounce(); initTicker();
}
function renderExport(){
  $('adminTabContent').innerHTML=`
    <div class="white-card" style="margin:0">
      <div class="card-title">📥 Export Data</div>
      <button class="btn-primary" onclick="expMembers()">📊 Members CSV</button>
      <button class="btn-primary" onclick="expAttendance()">📊 Attendance CSV</button>
      <button class="btn-primary" onclick="expPDF()">📄 Full PDF Report</button>
    </div>`;
}
function renderAttReport(){
  const d=getData();
  const ms=d.members.filter(m=>m.active);
  $('adminTabContent').innerHTML=`<div class="white-card" style="margin:0">
    <div class="card-title">📋 Attendance Summary</div>
    ${ms.map(m=>{const att=attStats(m.id);return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #eee">
      ${m.photo?`<img src="${m.photo}" style="width:34px;height:34px;border-radius:50%;object-fit:cover;border:1px solid #1a237e" alt="">`:`<div style="width:34px;height:34px;border-radius:50%;background:#1a237e;display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#fff">${GI[m.group]||'👤'}</div>`}
      <div style="flex:1;font-size:0.82rem"><b>${m.name}</b><br><span style="color:var(--dbyc-muted);font-size:0.7rem">${m.group}</span></div>
      <div style="text-align:right;font-size:0.78rem"><b style="color:${att.pct>=75?'#2e7d32':att.pct>=50?'#e65100':'#c62828'}">${att.pct}%</b><br><span style="color:var(--dbyc-muted)">${att.present}P ${att.late}L ${att.absent}A</span></div>
    </div>`;}).join('')}
  </div>`;
}

// ══════════════════════════════════════════════════════
// EXPORT FUNCTIONS
// ══════════════════════════════════════════════════════
function expMembers(){
  const d=getData();
  const rows=[['ID','Name','DOB','Age','Mobile','Email','Group','Role','JoinDate','Points','Att%']];
  d.members.filter(m=>m.active).forEach(m=>{const a=attStats(m.id);rows.push([m.id,m.name,m.dob,calcAge(m.dob),m.mobile,m.email||'',m.group,m.role,m.joinDate,m.points||0,a.pct+'%']);});
  dlCSV(rows.map(r=>r.join(',')).join('\n'),'DBYC_Members.csv');
}
function expAttendance(){
  const d=getData();
  const rows=[['MemberID','Name','Group','Date','Session','Status']];
  d.attendance.forEach(a=>{const m=d.members.find(x=>x.id===a.memberId);rows.push([a.memberId,m?.name||'',m?.group||'',a.date,a.session||'',a.status]);});
  dlCSV(rows.map(r=>r.join(',')).join('\n'),'DBYC_Attendance.csv');
}
function dlCSV(content,name){
  const b=new Blob([content],{type:'text/csv'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();
  toast('✅ Exported!');
}
function expPDF(){
  if(typeof jspdf==='undefined'){toast('⚠️ PDF library not available');return;}
  const d=getData(); const {jsPDF}=jspdf;
  const pdf=new jsPDF();
  pdf.setFontSize(18);pdf.setTextColor(26,35,126);pdf.text('DON BOSCO YOUTH CENTRE',105,18,{align:'center'});
  pdf.setFontSize(12);pdf.text('Member Report',105,28,{align:'center'});
  pdf.setFontSize(9);pdf.setTextColor(100,100,100);pdf.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`,105,36,{align:'center'});
  let y=46;pdf.setFontSize(11);pdf.setTextColor(26,35,126);pdf.text('Members:',15,y);y+=7;
  pdf.setFontSize(8);pdf.setTextColor(50,50,50);
  d.members.filter(m=>m.active).forEach(m=>{
    const a=attStats(m.id);
    if(y>275){pdf.addPage();y=20;}
    pdf.text(`${m.id} | ${m.name} | ${m.group} | ${m.role} | ${a.pct}% | ${m.points||0}pts`,15,y);y+=6;
  });
  pdf.save('DBYC_Report.pdf');toast('✅ PDF saved!');
}

// ══════════════════════════════════════════════════════
// ACCOUNT SETTINGS
// ══════════════════════════════════════════════════════
function renderAccount(){
  const u=getUser(); if(!u) return;
  $('settingsUserCard').innerHTML=`
    ${u.photo?`<img src="${u.photo}" class="settings-avatar" alt="">`:`<div class="settings-avatar-ph">${GI[u.group]||'👤'}</div>`}
    <div><div class="settings-name">${u.name}</div><div class="settings-email">${u.email||u.mobile}</div><div style="font-size:0.7rem;color:#607d8b;margin-top:2px">${u.group} • ${u.role} • ${u.id}</div></div>`;
}
function showAbout(){
  alert('DBYC – Don Bosco Youth Centre\nBuilding Young Lives through Faith, Hope and Love.\n\n"Give me souls, take away the rest." – St. John Bosco\n\nVersion 3.0 | 2026');
}
function openChangeUsername(){
  const name=prompt('Enter new username (used for login):','');
  if(!name||!name.trim()) return;
  toast('ℹ️ Username is your Member ID – contact admin to change your ID.');
}
function openChangePassword(){ openModal('changePwModal'); }
function doChangePassword(){
  const curr=$('cpCurrent').value, nw=$('cpNew').value, conf=$('cpConfirm').value;
  if(!curr||!nw||!conf){toast('⚠️ Fill all fields');return;}
  if(nw!==conf){toast('⚠️ Passwords do not match');return;}
  const d=getData(), u=getUser();
  const m=d.members.find(x=>x.id===u.id);
  if(!m||m.password!==curr){toast('❌ Current password wrong');return;}
  m.password=nw; save(d); closeModal('changePwModal'); toast('✅ Password changed!');
}

// ══════════════════════════════════════════════════════
// APP INIT
// ══════════════════════════════════════════════════════
window.addEventListener('load',()=>{
  if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
  initSlideshow();
  setTimeout(()=>{
    $('splash').classList.add('hide');
    setTimeout(()=>{
      $('splash').style.display='none';
      const u=getUser();
      if(u) launchApp(); else $('auth-screen').style.display='flex';
    },700);
  },3000);
});
