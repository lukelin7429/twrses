/* Philosophy 哲學 — 中譯開關、本頁目錄與閱讀進度、蘇格拉底式詰問、論證展開、首頁書架導覽。
   全部在瀏覽器裡完成，不送出任何資料。 */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* ---- 中譯開關（記在這台裝置上） ---- */
  var zhBtn = $('[data-ph-zh]');
  function setZh(on) {
    document.body.classList.toggle('ph-show-zh', on);
    if (zhBtn) zhBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  var saved = null;
  try { saved = localStorage.getItem('ph-zh'); } catch (e) {}
  setZh(saved === '1');
  if (zhBtn) zhBtn.addEventListener('click', function () {
    var on = !document.body.classList.contains('ph-show-zh');
    setZh(on);
    try { localStorage.setItem('ph-zh', on ? '1' : '0'); } catch (e) {}
  });

  /* ---- 每一段自己的「中譯」鈕：不必打開全頁中譯，也能只看這一段 ---- */
  function addTr(z) {
    if (z.classList.contains('ph-inline') || z.closest('.ph-arg-step') || z.previousElementSibling && z.previousElementSibling.classList.contains('ph-tr')) return;
    var b = el('button', 'ph-tr'); b.type = 'button'; b.setAttribute('aria-expanded', 'false');
    b.appendChild(el('span', '', '中譯')); b.appendChild(el('i', '', '▾'));
    b.setAttribute('aria-label', 'Show the Chinese translation of this paragraph · 顯示這一段的中譯');
    b.addEventListener('click', function () {
      var open = z.classList.toggle('is-open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    z.parentNode.insertBefore(b, z);
  }
  $$('.ph-zh').forEach(addTr);

  /* ---- 本頁目錄、捲動定位、閱讀進度 ---- */
  var toc = $('[data-ph-toc]'), bar = $('[data-ph-bar]');
  var secs = $$('[data-ph-toc-label]');
  var links = [];
  if (toc && secs.length) {
    secs.forEach(function (s) {
      var a = el('a', '', s.getAttribute('data-ph-toc-label'));
      a.href = '#' + s.id; toc.appendChild(a); links.push(a);
    });
  }
  var shelfTabs = $$('.ph-shelf-tab'), shelves = $$('.ph-shelf');
  function spy(list, tabs) {
    var y = window.scrollY + 170, cur = -1;
    list.forEach(function (s, i) { if (s.offsetTop <= y) cur = i; });
    tabs.forEach(function (a, i) {
      var on = i === cur;
      if (on !== a.classList.contains('on')) {
        a.classList.toggle('on', on);
        if (on && a.parentElement.scrollWidth > a.parentElement.clientWidth) {
          a.parentElement.scrollTo({ left: a.offsetLeft - 40, behavior: reduce ? 'auto' : 'smooth' });
        }
      }
    });
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      if (links.length) spy(secs, links);
      if (shelfTabs.length) spy(shelves, shelfTabs);
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? Math.min(100, window.scrollY / h * 100) : 0) + '%';
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 論證：點前提看反對意見 ---- */
  $$('[data-ph-arg] .ph-arg-step').forEach(function (b) {
    b.setAttribute('role', 'button'); b.tabIndex = 0;
    function flip() { b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); }
    b.addEventListener('click', flip);
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  });

  /* ---- 蘇格拉底式詰問 ---- */
  $$('[data-ph-elenchus]').forEach(function (root) {
    var data;
    try { data = JSON.parse($('[data-el-data]', root).textContent); } catch (e) { return; }
    var tabs = $$('[data-el-tab]', root), defsBox = $('[data-el-defs]', root), log = $('[data-el-log]', root);
    var end = $('[data-el-end]', root), hint = $('[data-el-hint]', root), count = $('[data-el-count]', root);
    var cur = null, out = 0, typing = null;

    function bi(parent, en, zh, tag) {
      var p = el(tag || 'p', '', en); parent.appendChild(p);
      var z = el('p', 'ph-zh', zh); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z);
      return p;
    }
    function type(node, text, done) {
      if (reduce) { node.textContent = text; done(); return; }
      var i = 0; node.textContent = ''; node.classList.add('ph-el-caret');
      typing = setInterval(function () {
        i += 3; node.textContent = text.slice(0, i);
        if (i >= text.length) { clearInterval(typing); typing = null; node.classList.remove('ph-el-caret'); done(); }
      }, 16);
    }
    function refresh() {
      count.textContent = out + ' of ' + cur.defs.length + ' definitions examined · 已檢驗 ' + out + '／' + cur.defs.length;
      if (out === cur.defs.length) {
        end.hidden = false; end.textContent = '';
        var h = el('h4', '', 'Aporia'); h.appendChild(el('span', '', '無路可走')); end.appendChild(h);
        bi(end, cur.end_en, cur.end_zh);
        hint.textContent = 'Every answer has failed. Try another question above, or write your own definition below. · 每個答案都垮了。換上面另一個問題試試，或在下面寫你自己的定義。';
      }
    }
    function pick(btn, d) {
      if (typing || btn.disabled) return;
      btn.disabled = true; btn.classList.add('is-out'); btn.setAttribute('data-flaw', d.flaw);
      var turn = el('div', 'ph-el-turn');
      var you = el('div', 'ph-el-you'); you.appendChild(el('small', '', d.by)); you.appendChild(el('p', '', d.en)); turn.appendChild(you);
      var soc = el('div', 'ph-el-soc'); soc.appendChild(el('span', 'ph-el-av sm', 'Σ'));
      var bub = el('div', 'ph-el-bub'); bub.appendChild(el('small', '', 'Socrates · ' + d.flaw));
      var p = el('p'); bub.appendChild(p);
      var z = el('p', 'ph-zh', d.re_zh); z.lang = 'zh-Hant'; bub.appendChild(z); addTr(z);
      bub.appendChild(el('cite', '', d.ref));
      soc.appendChild(bub); turn.appendChild(soc); log.appendChild(turn);
      var r = turn.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 40) window.scrollBy({ top: Math.min(r.bottom - window.innerHeight + 120, r.top - 150), behavior: reduce ? 'auto' : 'smooth' });
      type(p, d.re_en, function () { out++; refresh(); });
    }
    function load(key) {
      if (typing) { clearInterval(typing); typing = null; }
      cur = data.filter(function (d) { return d.key === key; })[0]; out = 0;
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-el-tab') === key ? 'true' : 'false'); });
      $('[data-el-src]', root).textContent = cur.source;
      var who = $('[data-el-who]', root); who.textContent = cur.who_en; who.appendChild(el('span', '', cur.who_zh));
      $('[data-el-q]', root).textContent = cur.q_en; $('[data-el-qzh]', root).textContent = cur.q_zh;
      hint.textContent = 'Choose the answer you find most convincing. · 選一個你覺得最有說服力的答案。';
      defsBox.textContent = ''; log.textContent = ''; end.hidden = true;
      cur.defs.forEach(function (d) {
        var b = el('button', 'ph-el-def'); b.type = 'button';
        b.appendChild(el('small', '', d.by + ' answers')); b.appendChild(el('b', '', d.en));
        var s = el('span', '', d.zh); s.lang = 'zh-Hant'; b.appendChild(s);
        b.addEventListener('click', function () { pick(b, d); });
        defsBox.appendChild(b);
      });
      refresh();
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { load(t.getAttribute('data-el-tab')); }); });
    $('[data-el-reset]', root).addEventListener('click', function () { load(cur.key); });
    load(data[0].key);
    root.__lab = { load: load, state: function () { return { key: cur.key, out: out }; } };
  });

  /* ---- 自己的定義：打字之後出現五個檢查項（只存在這個頁面的記憶體裡） ---- */
  var own = $('[data-ph-own]'), checks = $('[data-ph-own-checks]');
  if (own && checks) {
    var labels = ['Not just an example', 'Not too narrow', 'Not too broad', 'Not circular', 'Consistent with my other beliefs'];
    var built = false;
    own.addEventListener('input', function () {
      if (built || own.value.trim().length < 12) return;
      built = true;
      labels.forEach(function (t) {
        var l = el('label'); var c = el('input'); c.type = 'checkbox'; l.appendChild(c); l.appendChild(document.createTextNode(t)); checks.appendChild(l);
      });
      var done = el('p', 'ph-own-done'); checks.appendChild(done);
      checks.addEventListener('change', function () {
        var n = $$('input:checked', checks).length;
        done.textContent = n === labels.length ? 'It survived all five. Socrates would now ask a sixth question. · 五關都過了。蘇格拉底這時會問第六個問題。' : '';
      });
    });
  }

  /* ---- 首頁：數字跳動、貓頭鷹的眼睛跟著游標 ---- */
  var counts = $$('[data-ph-count]');
  if (counts.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var to = +e.target.getAttribute('data-ph-count'), t0 = performance.now();
        (function step(now) {
          var k = Math.min(1, (now - t0) / 900); k = 1 - Math.pow(1 - k, 3);
          e.target.textContent = Math.round(to * k);
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: .6 });
    counts.forEach(function (c) { io.observe(c); });
  }
  var owl = $('.ph-owl');
  if (owl && !reduce) {
    var pupils = $$('.ph-owl-pupil', owl);
    window.addEventListener('pointermove', function (e) {
      var r = owl.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .43);
      var d = Math.hypot(dx, dy) || 1, m = Math.min(6, d / 40);
      pupils.forEach(function (p) { p.style.transform = 'translate(' + (dx / d * m) + 'px,' + (dy / d * m) + 'px)'; });
    }, { passive: true });
  }
})();
