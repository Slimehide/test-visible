$(document).ready(function(){
  $('.real-support__cards>.card').on('click' ,function(e){
    $(this).toggleClass("opened");
    if ($(this).hasClass('opened')) {
      $(this).find(".symbol").text("-");
      $(this).find("p").slideDown(300);
    } else{
      $(this).find(".symbol").text("+");
      $(this).find("p").slideUp(300);      
    }
  });


  $('.hero .video__wrapper .switcher ul li a').on("click" ,function(e){
    e.preventDefault();
    if (!$(this).hasClass("current")) {
      $(this).closest("ul").find('.current').removeClass("current");
      $(this).addClass('current');
      $(this).closest('.video__wrapper').find(".tab").css('display' ,"none");
      $(this).closest('.video__wrapper').find('.tab.' + $(this).attr("data-tab")).fadeIn(300);
    }
  });

  $('.accordion').on("click" ,function(e){
    e.preventDefault();
    if ($(this).hasClass('opened')) {
      $(this).removeClass('opened');
      $(this).find(".content").slideUp(300);
    } else {
      $(this).addClass('opened');
      $(this).find(".content").slideDown(300);
    }
  });

  $('.faq__col .qa').on("click" ,function(e){
    e.preventDefault();
    if ($(this).hasClass('opened')) {
      $(this).removeClass('opened');
      $(this).find('.qa__body').slideUp(300);
    } else {
      $(this).addClass('opened');
      $(this).find('.qa__body').slideDown(300);
    }
  });

  $('.programs-tabs__nav>button').on('click' ,function(e){
    e.preventDefault();
    if (!$(this).hasClass('is-active')) {
      $(this).closest('.programs-tabs__nav').find("button").removeClass("is-active");
      $(this).addClass("is-active");
      $(this).closest('.programs-tabs').find(".programs-tabs__panel").css("display" ,"none");
      $(this).closest(".programs-tabs").find(".programs-tabs__panel[data-panel="+ $(this).attr("data-tab") +"]").fadeIn(300);
    }
  });

  $('.tab__box .switcher ul li a').on("click" ,function(e){
    e.preventDefault();
    if (!$(this).hasClass("active")) {
      $(this).closest("ul").find('.active').removeClass("active");
      $(this).addClass('active');
      $(this).closest('.tab__box').find(".content > .elem").css('display' ,"none");
      $(this).closest('.tab__box').find('.content > .elem.' + $(this).attr("data-tab")).fadeIn(300);
    }
  });

  // Trader-payouts deck — Swiper "cards" effect handles the 3D stack.
  // The "See all" button advances to the next card.
  $('.trader-payouts').each(function(){
    var section = this;
    var $cta = $(section).find('.trader-payouts__cta');
    var swiperEl = section.querySelector('.trader-swiper');
    if (!swiperEl || typeof window.Swiper === 'undefined') return;
    var instance = new window.Swiper(swiperEl, {
      effect: 'cards',
      grabCursor: true,
      loop: true,
      speed: 600,
      longSwipes: false,
      longSwipesRatio: 0.25,
      shortSwipes: true,
      threshold: 6,
      followFinger: true,
      resistanceRatio: 0.85,
      cardsEffect: {
        slideShadows: false,
        perSlideOffset: 12,
        perSlideRotate: 0
      }
    });
    // Ensure every swipe-end snap uses the full `speed` duration so quick
    // flicks don't skip the animation.
    instance.on('touchEnd', function () {
      this.params.speed = 600;
    });
    instance.on('slideChangeTransitionStart', function () {
      this.params.speed = 600;
    });
    $cta.on('click', function(e){
      e.preventDefault();
      instance.slideNext();
    });
  });

  $('.help__me--choose .form__box .pick-one > a').on('click' ,function(e){
    e.preventDefault();
    var $a = $(this);
    var $step = $a.closest('.step');
    $step.find('.pick-one > a').removeClass('current');
    $a.addClass('current');
    var $next = $step.nextAll('.step').first();
    if ($next.length){
      if (!$next.is(':visible')) $next.fadeIn(300);
    } else {
      var $rec = $step.nextAll('.recommend__plan').first();
      if ($rec.length && !$rec.is(':visible')) $rec.fadeIn(300);
    }
  });
});
(function () {
  'use strict';

  // Sticky-on-scroll style for navbar
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  const navMenu = document.querySelector('.navbar__nav');
  const navCta  = document.querySelector('.navbar > .navbar__cta, .navbar__nav > .navbar__cta');
  const mobileMQ = window.matchMedia('(max-width: 1140px)');


  const SLIDE_DURATION = 300;

  function closeSub(el, animate) {
    if (!el) return;
    const $dropdown = window.jQuery ? jQuery(el).children('.dropdown') : null;
    el.classList.remove('is-open');
    if ($dropdown && mobileMQ.matches) {
      if (animate) $dropdown.stop(true, false).slideUp(SLIDE_DURATION);
      else $dropdown.stop(true, true).hide();
    }
  }

  function openSub(el) {
    if (!el) return;
    document.querySelectorAll('.navbar .has-sub.is-open').forEach(o => {
      if (o !== el) closeSub(o, true);
    });
    el.classList.add('is-open');
    if (window.jQuery && mobileMQ.matches) {
      jQuery(el).children('.dropdown').stop(true, false).slideDown(SLIDE_DURATION);
    }
  }

  document.querySelectorAll('.navbar .has-sub').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.dropdown a')) return;
      if (el.classList.contains('is-open')) closeSub(el, true);
      else openSub(el);
    });
  });

  // Move the "Get Funded" CTA inside the dropdown menu on tablet/mobile
  // and back outside the menu on desktop. Desktop markup is left untouched.
  function placeCta() {
    if (!navbar || !navMenu || !navCta) return;
    if (mobileMQ.matches) {
      if (navCta.parentElement !== navMenu) navMenu.appendChild(navCta);
    } else {
      if (navCta.parentElement !== navbar) navbar.appendChild(navCta);
    }
  }
  placeCta();
  // when crossing the mobile breakpoint, reset any inline slide styles so
  // desktop hover behaviour resumes cleanly.
  function onBreakpointChange() {
    placeCta();
    document.querySelectorAll('.navbar .has-sub .dropdown').forEach(d => {
      if (window.jQuery) jQuery(d).stop(true, true);
      d.removeAttribute('style');
    });
    document.querySelectorAll('.navbar .has-sub.is-open').forEach(o => o.classList.remove('is-open'));
  }
  if (mobileMQ.addEventListener) mobileMQ.addEventListener('change', onBreakpointChange);
  else if (mobileMQ.addListener) mobileMQ.addListener(onBreakpointChange);

  function closeAllSubs(animate) {
    document.querySelectorAll('.navbar .has-sub.is-open').forEach(o => closeSub(o, animate));
  }

  function closeMenu(animate) {
    if (navbar) navbar.classList.remove('is-open');
    if (navToggle) {
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    closeAllSubs(animate);
  }

  if (navToggle && navbar) {
    navToggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = !navbar.classList.contains('is-open');
      navbar.classList.toggle('is-open', open);
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) closeAllSubs(false);
    });
  }

  // Close mobile menu when a real nav link is followed
  document.querySelectorAll('.navbar__nav > a, .navbar .has-sub .dropdown a').forEach(a => {
    a.addEventListener('click', () => closeMenu(false));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeMenu(true);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.has-sub')) closeAllSubs(true);
    if (navbar && navbar.classList.contains('is-open') && !e.target.closest('.navbar')) {
      closeMenu(true);
    }
  });

  // Highlight active nav-link
  const path = window.location.pathname.replace(/\/+$/,'').split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a[data-route]').forEach(a => {
    if (a.dataset.route === path) a.classList.add('is-active');
  });

  // FAQ accordion: only one open at a time per group
  document.querySelectorAll('.faq__grid').forEach(group => {
    group.addEventListener('click', e => {
      const summary = e.target.closest('summary');
      if (!summary) return;
      const open = summary.parentElement;
      requestAnimationFrame(() => {
        group.querySelectorAll('details[open]').forEach(d => {
          if (d !== open) d.removeAttribute('open');
        });
      });
    });
  });



  // Help-me-choose recommender (Pricing page)
  document.querySelectorAll('[data-quiz]').forEach(quiz => {
    const state = { market: 'options', experience: 'experienced', priority: 'fast' };
    const result = quiz.querySelector('[data-result]');
    const recs = {
      'options-experienced-fast': { name: 'Options Instant Funding', why: "Based on your experience and preference for immediate access, Options Instant Funding is the strongest fit." },
      'options-experienced-cheap': { name: 'Options Evaluation', why: "Lowest entry cost and your edge proves itself through the published profit target." },
      'options-developing-fast':   { name: 'Options Instant Funding', why: "Skip the eval and trade real capital while you build consistency." },
      'stocks-experienced-fast':   { name: 'Stocks Instant Funding', why: "No PDT, real institutional account, day-one funding." },
      'stocks-experienced-cheap':  { name: 'Stocks Evaluation', why: "Lowest entry cost path to a real funded stocks account." },
      'futures-experienced-fast':  { name: 'FunderFlex 50K', why: "NinjaTrader-powered futures with the most flexible scaling." },
      'crypto-new-fast':           { name: 'Crypto waitlist', why: "Crypto programs launch shortly — same institutional discipline as stocks/options/futures." }
    };
    const updateUI = () => {
      quiz.querySelectorAll('[data-q]').forEach(q => {
        const key = q.dataset.q;
        q.querySelectorAll('[data-v]').forEach(opt => {
          opt.classList.toggle('is-selected', opt.dataset.v === state[key]);
        });
      });
      const key = `${state.market}-${state.experience}-${state.priority}`;
      const r = recs[key] || recs['options-experienced-fast'];
      if (result) {
        result.querySelector('[data-rec-name]').textContent = r.name;
        result.querySelector('[data-rec-why]').textContent = r.why;
      }
    };
    quiz.addEventListener('click', e => {
      const opt = e.target.closest('[data-v]');
      if (!opt) return;
      const q = opt.closest('[data-q]');
      state[q.dataset.q] = opt.dataset.v;
      updateUI();
    });
    updateUI();
  });

  // Newsletter — basic email validation
  const news = document.querySelector('.newsletter__form');
  if (news) {
    news.addEventListener('submit', e => {
      e.preventDefault();
      const i = news.querySelector('input[type=email]');
      const v = (i.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      news.classList.toggle('is-error', !valid);
      if (valid) {
        news.classList.add('is-success');
        i.value = '';
        const m = document.createElement('p');
        m.className = 'newsletter__msg';
        m.textContent = "Thanks — you're on the list.";
        news.parentNode.appendChild(m);
        setTimeout(() => m.remove(), 5000);
      }
    });
  }
})();
