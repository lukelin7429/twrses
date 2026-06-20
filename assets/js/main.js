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

  /* speak (Web Speech) for 🔊 buttons */
  var enVoice = null;
  function pickVoice() {
    var vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    enVoice = vs.find(function (v) { return /en[-_]US/i.test(v.lang) && /female|samantha|google/i.test(v.name); })
           || vs.find(function (v) { return /^en/i.test(v.lang); }) || null;
  }
  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  window.say = function (text, btn) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.92; if (enVoice) u.voice = enVoice;
    speechSynthesis.speak(u);
    if (btn) { btn.classList.add('on'); u.onend = function () { btn.classList.remove('on'); }; }
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); window.say(b.getAttribute('data-say'), b); }
    var t = e.target.closest('.tr-toggle');
    if (t) {
      var box = document.getElementById(t.getAttribute('data-target'));
      if (box) {
        box.classList.toggle('show');
        var open = box.classList.contains('show');
        t.textContent = open ? (t.getAttribute('data-hide') || '隱藏中文翻譯') : (t.getAttribute('data-show') || '顯示中文翻譯');
      }
    }
    var q = e.target.closest('.quiz-opt');
    if (q && !q.parentElement.classList.contains('done')) {
      var correct = q.getAttribute('data-correct') === '1';
      q.parentElement.classList.add('done');
      q.classList.add(correct ? 'right' : 'wrong');
      if (!correct) { var r = q.parentElement.querySelector('[data-correct="1"]'); if (r) r.classList.add('right'); }
    }
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
