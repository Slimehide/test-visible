// TradeFundrr — site interactions
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

  // Mobile/products dropdown toggle (click on button or has-sub)
  document.querySelectorAll('.navbar .has-sub').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.dropdown a')) return;
      el.classList.toggle('is-open');
      document.querySelectorAll('.navbar .has-sub').forEach(o => {
        if (o !== el) o.classList.remove('is-open');
      });
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.has-sub')) {
      document.querySelectorAll('.navbar .has-sub.is-open').forEach(o => o.classList.remove('is-open'));
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
