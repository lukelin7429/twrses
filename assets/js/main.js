/* 人師教育協會 twrses.org — interactions */
(function () {
  'use strict';

  /* mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      toggle.classList.toggle('on');
      var open = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!a.parentElement.classList.contains('has-sub')) menu.classList.remove('open');
      });
    });
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll('.rvl, .stagger, .sweep');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* lazy-load youtube thumbs already handled by loading="lazy"; click-to-play inline */
  document.querySelectorAll('[data-yt]').forEach(function (card) {
    card.addEventListener('click', function (ev) {
      // allow normal link open in new tab; only intercept plain left-click without modifier
    });
  });

  /* header shadow on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.style.boxShadow = '0 10px 30px -22px rgba(22,48,44,.5)';
      else header.style.boxShadow = 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
