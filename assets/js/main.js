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

  /* scroll reveal — getBoundingClientRect 版（不用 IntersectionObserver）
     原本用 IO + threshold 0.14：比視窗高 ~7 倍的元素（如 100 張卡的網格）露出面積永遠到不了 14%，
     導致整批內容卡在 opacity:0 → 整頁空白。改用 gBCR：元素上緣進入視窗就揭示，與高度無關。 */
  var revealEls = [].slice.call(document.querySelectorAll('.rvl, .stagger, .sweep'));
  if (revealEls.length) {
    var revealScan = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = revealEls.length - 1; i >= 0; i--) {
        var r = revealEls[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {   // 上緣進入視窗下 92% 且未完全捲離 → 揭示
          revealEls[i].classList.add('in');
          revealEls.splice(i, 1);
        }
      }
    };
    revealScan();
    window.addEventListener('scroll', revealScan, { passive: true });
    window.addEventListener('resize', revealScan, { passive: true });
    window.addEventListener('load', revealScan);
  }

  /* click-to-play: play the video INLINE in its own card — no lightbox, never pop out to YouTube */
  document.addEventListener('click', function (ev) {
    var card = ev.target.closest('[data-yt]');
    if (!card) return;
    ev.preventDefault();                    // hard-block any navigation to YouTube
    if (card.classList.contains('playing')) return;
    var stage = card.querySelector('.vthumb') || card;
    var id = card.getAttribute('data-yt');
    var title = (card.getAttribute('title') || '影片').replace(/"/g, '&quot;');
    stage.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + id +
      '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + title + '" ' +
      'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen ' +
      'style="position:absolute;inset:0;width:100%;height:100%;border:0;display:block"></iframe>';
    card.classList.add('playing');
  });

  /* 期刊就地翻頁閱讀器 */
  (function () {
    var reader = document.getElementById('periReader');
    if (!reader) return;
    var img = reader.querySelector('.pr-img'),
        curEl = reader.querySelector('.pr-cur'),
        totEl = reader.querySelector('.pr-total');
    var base = '', total = 1, cur = 1;
    function show(n) { if (n < 1) n = total; if (n > total) n = 1; cur = n; img.src = base + n + '.jpg'; curEl.textContent = n; }
    document.addEventListener('click', function (e) {
      var cover = e.target.closest('.peri-cover[data-read]');
      if (cover) {
        e.preventDefault();
        base = cover.getAttribute('data-read'); total = +cover.getAttribute('data-pages');
        reader.querySelector('.pr-title').textContent = cover.getAttribute('data-title');
        reader.querySelector('.pr-dl').href = cover.getAttribute('data-pdf');
        totEl.textContent = total;
        var card = cover.closest('.peri-card');
        card.parentNode.insertBefore(reader, card.nextSibling);   // 全寬列插在該卡之後
        reader.hidden = false; show(1);
        reader.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      var b = e.target.closest('.pr-prev, .pr-next, .pr-close');
      if (b) {
        if (b.classList.contains('pr-close')) { reader.hidden = true; img.src = ''; }
        else show(cur + (b.classList.contains('pr-next') ? 1 : -1));
      }
    });
    document.addEventListener('keydown', function (e) {
      if (reader.hidden) return;
      if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === 'Escape') { reader.hidden = true; img.src = ''; }
    });
  })();

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
    var lec = e.target.closest('.lec-btn');
    if (lec) {
      e.preventDefault();
      var wrap = lec.closest('.lecture');
      var stage = wrap.querySelector('.lec-stage');
      var icon = lec.querySelector('.lec-play');
      if (wrap.classList.contains('playing')) {        // toggle off → stop
        stage.innerHTML = ''; wrap.classList.remove('playing'); if (icon) icon.textContent = '▶';
      } else {
        document.querySelectorAll('.lecture.playing').forEach(function (o) {  // only one at a time
          o.querySelector('.lec-stage').innerHTML = ''; o.classList.remove('playing');
          var oi = o.querySelector('.lec-play'); if (oi) oi.textContent = '▶';
        });
        var id = lec.getAttribute('data-ytin');
        var tEl = lec.querySelector('.lec-t');
        var ttl = (tEl ? tEl.textContent : '講解').replace(/"/g, '&quot;');
        stage.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id +
          '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + ttl +
          '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
        wrap.classList.add('playing'); if (icon) icon.textContent = '❚❚';
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

  /* carousel */
  document.querySelectorAll('[data-carousel]').forEach(function (car) {
    var track = car.querySelector('.car-track');
    var slides = car.querySelectorAll('.car-slide');
    var dots = car.querySelectorAll('.car-dot');
    var n = slides.length, i = 0, timer;
    function go(k) {
      i = (k + n) % n;
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
    }
    function play() { stop(); timer = setInterval(function () { go(i + 1); }, 5000); }
    function stop() { if (timer) clearInterval(timer); }
    var prev = car.querySelector('.car-prev'), next = car.querySelector('.car-next');
    if (prev) prev.addEventListener('click', function () { go(i - 1); play(); });
    if (next) next.addEventListener('click', function () { go(i + 1); play(); });
    dots.forEach(function (d) { d.addEventListener('click', function () { go(+d.getAttribute('data-i')); play(); }); });
    car.addEventListener('mouseenter', stop);
    car.addEventListener('mouseleave', play);
    if (n > 1) play();
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
