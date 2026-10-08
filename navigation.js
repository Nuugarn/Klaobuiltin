/* Shared navigation. Existing page language/theme scripts are preserved. */
(function () {
 const trigger=document.querySelector('.hamburger-btn'), drawer=document.getElementById('drawer'), overlay=document.getElementById('pageOverlay'), closeButton=drawer.querySelector('.nav-close');
 let returnFocus=null;
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
 document.addEventListener('keydown',event=>{
  if(!document.body.classList.contains('menu-open')) return;
  if(event.key==='Escape') { event.preventDefault(); close(); }
  if(event.key==='Tab') {
   const items=focusable(),first=items[0],last=items[items.length-1];
   if(event.shiftKey && (document.activeElement===first || !drawer.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
   else if(!event.shiftKey && (document.activeElement===last || !drawer.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
  }
 });
 window.matchMedia('(min-width:1024px)').addEventListener('change',event=>{if(event.matches) close();});
})();
if(document.body.hasAttribute('data-destination')) {
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
    if (!wrap || !langBtn || !drop) return;

    let activeLang = localStorage.getItem('klao-lang') || 'TH';
    let theme = localStorage.getItem('klao-theme') || 'light';
    let toastTimer = null;

    function showToast(msg) {
      if (!toastEl) return;
      toastEl.textContent = '🛠️  ' + msg;
      toastEl.classList.add('is-show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 2400);
    }

    function setTheme(mode) {
      theme = mode;
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('klao-theme', mode);
      if (lightBtn) lightBtn.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
      if (darkBtn) darkBtn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
      // TODO: apply full dark theme styles site-wide
    }

    function setLang(code, label) {
      activeLang = code;
      langBtn.textContent = code;
      localStorage.setItem('klao-lang', code);
      drop.querySelectorAll('.ltw-opt').forEach(opt => {
        const on = opt.dataset.lang === code;
        opt.classList.toggle('is-active', on);
        opt.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      showToast('ภาษา ' + (label || code) + ' อยู่ระหว่างช่วงพัฒนา');
      // TODO: connect real i18n
    }

    function openDrop(open) {
      drop.hidden = !open;
      drop.classList.toggle('is-open', open);
      langBtn.classList.toggle('is-open', open);
      langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // init
    setTheme(theme);
    langBtn.textContent = activeLang;
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

    if (lightBtn) lightBtn.addEventListener('click', () => setTheme('light'));
    if (darkBtn) darkBtn.addEventListener('click', () => setTheme('dark'));

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
