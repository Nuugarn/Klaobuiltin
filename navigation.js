/* Shared navigation. Existing page language/theme scripts are preserved. */
(function () {
 const trigger=document.querySelector('.hamburger-btn'), drawer=document.getElementById('drawer'), overlay=document.getElementById('pageOverlay'), closeButton=drawer.querySelector('.nav-close');
 let returnFocus=null;
 const header=document.querySelector('.site-header');
 let lastHeaderScrollY=Math.max(0,window.scrollY || 0), headerDirection=0, headerTravel=0;
 function updateHeader() {
  const y=Math.max(0,window.scrollY || 0), delta=y-lastHeaderScrollY;
  lastHeaderScrollY=y;
  document.body.classList.toggle('sticky-header',y>8);
  header.classList.toggle('header-glass',y>24);
  if(y<160 || document.body.classList.contains('menu-open') || header.contains(document.activeElement)) {
   header.classList.remove('header-hidden'); headerTravel=0; headerDirection=0; return;
  }
  const direction=Math.sign(delta);
  if(!direction) return;
  if(direction!==headerDirection) { headerDirection=direction; headerTravel=0; }
  headerTravel+=Math.abs(delta);
  if(headerTravel<14) return;
  header.classList.toggle('header-hidden',headerDirection>0);
  headerTravel=0;
 }
 window.addEventListener('scroll',updateHeader,{passive:true});
 header.addEventListener('focusin',()=>header.classList.remove('header-hidden'));
 updateHeader();
 const focusable=()=>Array.from(drawer.querySelectorAll('a[href],button:not([disabled])'));
 function close() {
  if(!document.body.classList.contains('menu-open')) return;
  document.body.classList.remove('menu-open'); document.documentElement.classList.remove('menu-open');
  trigger.setAttribute('aria-expanded','false');
  if(returnFocus && returnFocus.isConnected) returnFocus.focus();
 }
 function open() {
  returnFocus=document.activeElement;
  document.body.classList.add('menu-open'); document.documentElement.classList.add('menu-open');
  trigger.setAttribute('aria-expanded','true');
  updateHeader();
  // Apply visible styles before moving keyboard focus into the drawer.
  drawer.getBoundingClientRect();
  closeButton.focus();
 }
 trigger.addEventListener('click',()=>document.body.classList.contains('menu-open')?close():open());
 closeButton.addEventListener('click',close); overlay.addEventListener('click',close);
 drawer.addEventListener('transitionend',event=>{
  if(event.target===drawer && event.propertyName==='transform' && document.body.classList.contains('menu-open') && !drawer.contains(document.activeElement)) closeButton.focus();
 });
 drawer.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',close));
 // Touch presses have no persistent hover state; restore the current-page color on release.
 let touchPressedLink=null;
 function clearTouchPress() {
  if(touchPressedLink) touchPressedLink.classList.remove('is-touch-pressed');
  touchPressedLink=null;
 }
 document.querySelectorAll('.desktop-navigation a,.nav-drawer-links a').forEach(link=>{
  link.addEventListener('pointerdown',event=>{
   if(event.pointerType!=='touch') return;
   clearTouchPress();
   touchPressedLink=link;
   link.classList.add('is-touch-pressed');
  });
  link.addEventListener('lostpointercapture',clearTouchPress);
 });
 document.addEventListener('pointerup',clearTouchPress);
 document.addEventListener('pointercancel',clearTouchPress);
 window.addEventListener('blur',clearTouchPress);
 document.addEventListener('visibilitychange',()=>{if(document.hidden) clearTouchPress();});
 // The homepage keeps "หน้าแรก" current; section links will become page links later.
 const homeView=document.getElementById('home-view');
 if(homeView) {
  const logo=document.querySelector('.site-logo');
  logo.addEventListener('click',event=>{
   if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   event.preventDefault();
   history.replaceState(null,'',location.pathname+location.search+'#home-view');
   window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
 }
 document.addEventListener('keydown',event=>{
  if(!document.body.classList.contains('menu-open')) return;
  if(event.key==='Escape') { event.preventDefault(); close(); }
  if(event.key==='Tab') {
   const items=focusable(),first=items[0],last=items[items.length-1];
   if(event.shiftKey && (document.activeElement===first || !drawer.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
   else if(!event.shiftKey && (document.activeElement===last || !drawer.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
  }
 });
 window.matchMedia('(min-width:840px)').addEventListener('change',event=>{if(event.matches) close();});
})();
if(document.getElementById('langThemeWidget')) {
  /* Language + Theme widget (vanilla port of LanguageThemeWidget) */
  (function(){
    const LANGS = [
      { code: 'TH', label: 'ไทย' },
      { code: 'EN', label: 'English' },
      { code: 'LA', label: 'ລາວ' }
    ];
    const wrap = document.getElementById('langThemeWidget');
    const langBtn = document.getElementById('ltwLangBtn');
    const drop = document.getElementById('ltwDrop');
    const lightBtn = document.getElementById('ltwLightBtn');
    const darkBtn = document.getElementById('ltwDarkBtn');
    const toastEl = document.getElementById('ltwToast');
    if (!wrap || !langBtn || !drop || wrap.dataset.widgetBound) return;
    wrap.dataset.widgetBound = 'true';

    let activeLang = localStorage.getItem('klao-lang') || 'TH';
    let toastTimer = null;
    let themeResetTimer = null;

    function showToast(msg, duration, kind) {
      if (!toastEl) return;
      toastEl.dataset.language = activeLang;
      toastEl.dataset.kind = kind || 'language';
      toastEl.textContent = msg;
      toastEl.classList.add('is-show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), duration || 5600);
    }

    function setLightTheme() {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('klao-theme', 'light');
      if (lightBtn) lightBtn.setAttribute('aria-pressed', 'true');
      if (darkBtn) darkBtn.setAttribute('aria-pressed', 'false');
    }

    function previewDarkTheme() {
      if (themeResetTimer) clearTimeout(themeResetTimer);
      if (lightBtn) lightBtn.setAttribute('aria-pressed', 'false');
      if (darkBtn) darkBtn.setAttribute('aria-pressed', 'true');
      showToast('กำลังพัฒนา...', 2200, 'theme');
      themeResetTimer = setTimeout(setLightTheme, 500);
    }

    function renderActiveLang() {
      const active = LANGS.find(lang => lang.code === activeLang) || LANGS[0];
      activeLang = active.code;
      langBtn.dataset.lang = active.code;
      langBtn.innerHTML = '<span class="ltw-flag" aria-hidden="true"></span>';
      langBtn.setAttribute('aria-label', 'ภาษา: ' + active.label);
    }

    function setLang(code, label) {
      activeLang = code;
      renderActiveLang();
      localStorage.setItem('klao-lang', code);
      drop.querySelectorAll('.ltw-opt').forEach(opt => {
        const on = opt.dataset.lang === code;
        opt.classList.toggle('is-active', on);
        opt.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      const languageName = code === 'EN' ? 'English (EN)' : 'ลาว / ລາວ (LA)';
      showToast(code === 'EN' ? 'English version is in development — content remains in Thai.' :
        code === 'TH' ? 'กำลังแสดงเนื้อหาภาษาไทย' :
        'เวอร์ชันภาษา ' + languageName + ' กำลังพัฒนา / เร็ว ๆ นี้ — เนื้อหายังคงเป็นภาษาไทย');
      // TODO: connect real i18n
    }

    function openDrop(open) {
      drop.hidden = !open;
      drop.classList.toggle('is-open', open);
      langBtn.classList.toggle('is-open', open);
      langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // init
    setLightTheme();
    renderActiveLang();
    drop.querySelectorAll('.ltw-opt').forEach(opt => {
      const on = opt.dataset.lang === activeLang;
      opt.classList.toggle('is-active', on);
      opt.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    langBtn.addEventListener('click', () => {
      const idx = LANGS.findIndex(l => l.code === activeLang);
      const next = LANGS[(idx + 1) % LANGS.length];
      setLang(next.code, next.label);
      openDrop(true);
    });

    drop.querySelectorAll('.ltw-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        setLang(opt.dataset.lang, opt.dataset.label);
        openDrop(false);
      });
    });

    if (lightBtn) lightBtn.addEventListener('click', setLightTheme);
    if (darkBtn) darkBtn.addEventListener('click', previewDarkTheme);

    document.addEventListener('mousedown', (e) => {
      if (!wrap.contains(e.target)) openDrop(false);
    });
    document.addEventListener('touchstart', (e) => {
      if (!wrap.contains(e.target)) openDrop(false);
    }, { passive: true });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') openDrop(false);
    });
  })();


}

(function () {
  const facebookUrl = 'https://www.facebook.com/share/1EQR822dQ8/';
  const lineUrl = 'https://line.me/R/ti/p/@380tjpje';
  const icons = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2.5V5.5H14c-1.9 0-3.5 1.6-3.5 3.5v2H8v3h2.5V20h3v-6h2.3l.5-3h-2.8V9c0-.6.4-1 1-1z"/></svg>',
    line: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 5.82 2 10.5c0 4.2 3.73 7.72 8.75 8.4.34.07.8.22.92.5.1.26.07.66.03.92l-.15 1.02c-.05.3-.22 1.18 1.03.64C16.32 20.14 22 15.9 22 10.5 22 5.82 17.52 2 12 2zm-5.1 6.2h1.2v4.4H6.9V8.2zm2 0h1.2v4.4H8.9V8.2zm2 0h1.1l1.7 2.4V8.2h1.2v4.4h-1.1L12.1 10v2.6h-1.2V8.2zm4.7 0h3.1v1h-1.9v.7h1.8v1h-1.8v.7h1.9v1h-3.1V8.2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7.5 3.5h9A4 4 0 0 1 20.5 7.5v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4Z"/><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.9" r="1"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 3.2h2.7c.2 1.8 1.3 3.1 3.1 3.6v2.7a7.4 7.4 0 0 1-3.1-1v6.2a5.5 5.5 0 1 1-5.5-5.5c.4 0 .8 0 1.2.1V12a3 3 0 1 0 1.6 2.7V3.2z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.2 20.8l4.7-1.2A8.7 8.7 0 1 0 12 3.2Zm0 15.8a7.1 7.1 0 0 1-3.6-1l-.3-.2-2.8.7.7-2.7-.2-.3A7.1 7.1 0 1 1 12 19Zm3.9-5.3c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a5.8 5.8 0 0 1-1.7-1.1 6.2 6.2 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4l-.8-1.8c-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.1.9 2.3a8.7 8.7 0 0 0 3.4 3c.5.2.9.4 1.2.5.5.2 1 .2 1.3.1.4-.1 1.4-.6 1.6-1.2s.2-1.1.1-1.2-.2-.2-.4-.3Z"/></svg>'
  };

  function socialItems(className, includeWhatsApp) {
    const items = [
      '<a class="social-icon social-icon--facebook ' + className + '" href="' + facebookUrl + '" target="_blank" rel="noopener" aria-label="Facebook">' + icons.facebook + '</a>',
      '<a class="social-icon social-icon--line ' + className + '" href="' + lineUrl + '" target="_blank" rel="noopener" aria-label="LINE">' + icons.line + '</a>',
      '<button class="social-icon social-icon--instagram ' + className + '" type="button" aria-label="Instagram — ยังไม่เปิดใช้งาน" disabled>' + icons.instagram + '</button>',
      '<button class="social-icon social-icon--tiktok ' + className + '" type="button" aria-label="TikTok — ยังไม่เปิดใช้งาน" disabled>' + icons.tiktok + '</button>'
    ];
    if (includeWhatsApp) items.push('<button class="social-icon social-icon--whatsapp ' + className + '" type="button" aria-label="WhatsApp — ยังไม่เปิดใช้งาน" disabled>' + icons.whatsapp + '</button>');
    return items.join('');
  }

  const drawer = document.getElementById('drawer');
  if (drawer && !drawer.querySelector('.drawer-social')) {
    const drawerSocial = document.createElement('div');
    drawerSocial.className = 'drawer-social';
    drawerSocial.innerHTML = '<span class="drawer-social-title">Social media</span><div class="drawer-social-list">' + socialItems('drawer-social-item') + '</div>';
    drawer.querySelector('.nav-cta').before(drawerSocial);
  }

  if (document.querySelector('.homepage-back-top') && !document.querySelector('.social-fab')) {
    const fab = document.createElement('div');
    fab.className = 'social-fab';
    fab.innerHTML = '<div class="social-fab-actions" id="socialFabActions">' + socialItems('social-fab-item', true) + '</div><button class="social-fab-toggle" type="button" aria-label="เปิดช่องทาง Social media" aria-controls="socialFabActions" aria-expanded="false"></button>';
    document.body.appendChild(fab);
    const toggle = fab.querySelector('.social-fab-toggle');
    function setOpen(open) {
      fab.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'ปิดช่องทาง Social media' : 'เปิดช่องทาง Social media');
    }
    toggle.addEventListener('click', () => setOpen(!fab.classList.contains('is-open')));
    document.addEventListener('pointerdown', event => { if (!fab.contains(event.target)) setOpen(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  }
}());

(function () {
  document.querySelectorAll('img').forEach(image => image.setAttribute('draggable', 'false'));
  document.addEventListener('dragstart', event => {
    if (event.target.closest && event.target.closest('img')) event.preventDefault();
  });
  document.addEventListener('contextmenu', event => {
    if (event.target.closest && event.target.closest('img')) event.preventDefault();
  });
  document.addEventListener('selectstart', event => {
    if (!event.target.closest || !event.target.closest('input,textarea,[contenteditable="true"]')) event.preventDefault();
  });
}());
