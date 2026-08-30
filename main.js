/* =========================================================
   BOOSTAD — main.js
   ========================================================= */
(function(){
  'use strict';

  /* ---------- Sticky header ---------- */
  const header = document.querySelector('.header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if(burger && mobileNav){
    burger.addEventListener('click', function(){
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('in'));
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el){
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const startTime = performance.now();
    function tick(now){
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = prefix + value + suffix;
      if(progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    if('IntersectionObserver' in window){
      const cio = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, {threshold:0.5});
      counters.forEach(el=>cio.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- Portfolio filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-bar button');
  const items = document.querySelectorAll('.p-item');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item=>{
        if(cat === 'all' || item.dataset.cat === cat){
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.querySelector('#contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      let valid = true;
      const fields = form.querySelectorAll('[data-required]');
      fields.forEach(field=>{
        const wrap = field.closest('.field');
        const errEl = wrap ? wrap.querySelector('.err') : null;
        let msg = '';
        if(!field.value.trim()){
          msg = field.dataset.errRequired || 'هذا الحقل مطلوب';
        } else if(field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)){
          msg = field.dataset.errEmail || 'يرجى إدخال بريد إلكتروني صحيح';
        } else if(field.type === 'tel' && !/^[0-9+\s-]{8,}$/.test(field.value)){
          msg = field.dataset.errPhone || 'يرجى إدخال رقم هاتف صحيح';
        }
        if(msg){
          valid = false;
          if(wrap) wrap.classList.add('invalid');
          if(errEl) errEl.textContent = msg;
        } else {
          if(wrap) wrap.classList.remove('invalid');
          if(errEl) errEl.textContent = '';
        }
      });
      const successEl = document.querySelector('.form-success');
      if(valid){
        form.reset();
        if(successEl) successEl.classList.add('show');
        setTimeout(()=>{ if(successEl) successEl.classList.remove('show'); }, 6000);
      } else if(successEl){
        successEl.classList.remove('show');
      }
    });
  }

  /* ---------- Language switch ---------- */
  const translations = window.BOOSTAD_I18N || {};
  const langButtons = document.querySelectorAll('.lang-switch button');
  function setLang(lang){
    const dict = translations[lang];
    if(!dict) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      if(dict[key] !== undefined){
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.dataset.i18nPlaceholder;
      if(dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    langButtons.forEach(b=>b.classList.toggle('active', b.dataset.lang === lang));
    try{ localStorage.setItem('boostad-lang', lang); }catch(e){}
  }
  langButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });
  let initialLang = 'ar';
  try{
    const stored = localStorage.getItem('boostad-lang');
    if(stored) initialLang = stored;
  }catch(e){}
  if(initialLang !== 'ar') setLang(initialLang);
  else langButtons.forEach(b=>b.classList.toggle('active', b.dataset.lang === 'ar'));

})();
