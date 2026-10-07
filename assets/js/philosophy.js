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

  /* ---- A2：有效、健全，還是都不是？ ---- */
  $$('[data-ph-validity]').forEach(function (root) {
    var items;
    try { items = JSON.parse($('[data-vl-data]', root).textContent); } catch (e) { return; }
    var arg = $('[data-vl-arg]', root), ask = $('[data-vl-ask]', root), out = $('[data-vl-out]', root);
    var dots = $('[data-vl-dots]', root), count = $('[data-vl-count]', root), next = $('[data-vl-next]', root);
    var i = 0, score = [], finished = false;

    function line(k, o, cls) {
      var row = el('div', 'ph-vl-line ' + (cls || ''));
      row.appendChild(el('span', 'ph-vl-k', k));
      var b = el('div'); b.appendChild(el('p', '', o.en));
      var z = el('p', 'ph-zh', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); addTr(z);
      row.appendChild(b); return row;
    }
    function choice(q, qzh, opts, cb) {
      ask.textContent = '';
      var p = el('p', 'ph-vl-q'); p.appendChild(el('b', '', q)); var s = el('span', '', qzh); s.lang = 'zh-Hant'; p.appendChild(s); ask.appendChild(p);
      var box = el('div', 'ph-vl-opts');
      opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o[0])); var z = el('span', '', o[1]); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { cb(o[2]); }); box.appendChild(b);
      });
      ask.appendChild(box);
    }
    function paint() {
      dots.textContent = '';
      items.forEach(function (_, k) {
        dots.appendChild(el('i', k < score.length ? (score[k] ? 'ok' : 'no') : (k === i && !finished ? 'cur' : '')));
      });
      count.textContent = finished ? '' : 'Argument ' + (i + 1) + ' of ' + items.length + ' · 第 ' + (i + 1) + '／' + items.length + ' 個';
    }
    function verdict(it) { return it.valid ? (it.true ? ['Valid and sound', '有效，而且健全', 'sound'] : ['Valid but unsound', '有效，但不健全', 'valid']) : ['Invalid', '無效', 'invalid']; }
    function reveal(it, saidValid, saidTrue) {
      var right = saidValid === it.valid && (!it.valid || saidTrue === it.true);
      score.push(right); ask.textContent = ''; out.textContent = '';
      var v = verdict(it);
      var card = el('div', 'ph-vl-card is-' + v[2]);
      var head = el('p', 'ph-vl-verdict'); head.appendChild(el('b', '', v[0])); var hz = el('span', '', v[1]); hz.lang = 'zh-Hant'; head.appendChild(hz);
      head.appendChild(el('em', right ? 'ok' : 'no', right ? 'You had it · 你答對了' : 'Look again · 再看一次'));
      card.appendChild(head);
      var form = el('div', 'ph-vl-form'); form.appendChild(el('small', '', 'The form · 形式 — ' + it.name));
      it.form.forEach(function (f) { form.appendChild(el('code', f.charAt(0) === '∴' ? 'c' : '', f)); });
      card.appendChild(form);
      var why = el('div', 'ph-vl-why'); why.appendChild(el('p', '', it.why.en)); var wz = el('p', 'ph-zh', it.why.zh); wz.lang = 'zh-Hant'; why.appendChild(wz); addTr(wz);
      card.appendChild(why);
      if (!it.valid && saidValid === false) { /* 答對無效：不必問前提 */ }
      if (!it.valid) {
        var note = el('p', 'ph-vl-skip', 'An invalid argument is unsound whatever its premises, so there is no second question. · 無效的論證不管前提如何都不健全，所以沒有第二個問題。');
        card.appendChild(note);
      }
      if (it.counter) {
        var c = el('div', 'ph-vl-counter'); c.appendChild(el('small', '', 'Same form, true premises, false conclusion · 同一個形式、真前提、假結論'));
        c.appendChild(el('p', '', it.counter.en)); var cz = el('p', 'ph-zh', it.counter.zh); cz.lang = 'zh-Hant'; c.appendChild(cz); addTr(cz);
        card.appendChild(c);
      }
      out.appendChild(card);
      next.hidden = false;
      next.textContent = i === items.length - 1 ? 'See your result · 看結果 →' : 'Next argument · 下一個 →';
      paint();
    }
    function show() {
      var it = items[i]; finished = false;
      arg.textContent = ''; out.textContent = ''; next.hidden = true;
      it.p.forEach(function (p, k) { arg.appendChild(line('P' + (k + 1), p)); });
      arg.appendChild(line('∴', it.c, 'is-c'));
      arg.classList.remove('ph-vl-in'); void arg.offsetWidth; arg.classList.add('ph-vl-in');
      choice('Does the conclusion follow from the premises?', '結論從前提推得出來嗎？',
        [['Yes: valid', '推得出來：有效', true], ['No: invalid', '推不出來：無效', false]], function (sv) {
          if (!sv || !it.valid) { reveal(it, sv, null); return; }
          choice('It is valid. Are the premises all true?', '它是有效的。前提全是真的嗎？',
            [['Yes: sound', '全真：健全', true], ['No: unsound', '有假：不健全', false]], function (st) { reveal(it, true, st); });
        });
      paint();
    }
    function finish() {
      finished = true; arg.textContent = ''; ask.textContent = ''; out.textContent = ''; next.hidden = true;
      var n = score.filter(Boolean).length;
      var card = el('div', 'ph-el-end');
      var h = el('h4', '', n + ' of ' + items.length); h.appendChild(el('span', '', '答對 ' + n + '／' + items.length)); card.appendChild(h);
      card.appendChild(el('p', '', n === items.length
        ? 'You kept the two questions apart every time. That separation is the whole lesson.'
        : 'The usual slip is to let a true conclusion pass for a valid argument, or a false one for an invalid argument. Try again and judge the form first.'));
      var z = el('p', 'ph-zh', n === items.length ? '你每一次都把兩個問題分開了。這個「分開」就是這一課的全部。' : '最常見的失誤，是因為結論為真就當它有效，或因為結論為假就當它無效。再試一次，先判斷形式。');
      z.lang = 'zh-Hant'; card.appendChild(z); addTr(z);
      out.appendChild(card); paint();
    }
    next.addEventListener('click', function () { if (i < items.length - 1) { i++; show(); } else finish(); });
    $('[data-vl-reset]', root).addEventListener('click', function () { i = 0; score = []; show(); });
    show();
    root.__lab = { state: function () { return { i: i, score: score.slice(), finished: finished }; } };
  });

  /* ---- A3：指出毛病（四選一） ---- */
  $$('[data-ph-fallacy]').forEach(function (root) {
    var items;
    try { items = JSON.parse($('[data-fl-data]', root).textContent); } catch (e) { return; }
    var card = $('[data-fl-card]', root), ask = $('[data-fl-ask]', root), out = $('[data-fl-out]', root);
    var dots = $('[data-fl-dots]', root), count = $('[data-fl-count]', root), next = $('[data-fl-next]', root);
    var i = 0, score = [], finished = false;
    function zhp(parent, text) { var z = el('p', 'ph-zh', text); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function paint() {
      dots.textContent = '';
      items.forEach(function (_, k) { dots.appendChild(el('i', k < score.length ? (score[k] ? 'ok' : 'no') : (k === i && !finished ? 'cur' : ''))); });
      count.textContent = finished ? '' : (i + 1) + ' of ' + items.length + ' · 第 ' + (i + 1) + '／' + items.length + ' 段';
    }
    function block(cls, label, o) {
      var d = el('div', cls); d.appendChild(el('small', '', label)); d.appendChild(el('p', '', o.en)); zhp(d, o.zh); return d;
    }
    function answer(k, btns) {
      var it = items[i], right = k === it.k; score.push(right);
      btns.forEach(function (b, n) { b.disabled = true; if (n === it.k) b.classList.add('is-right'); else if (n === k) b.classList.add('is-wrong'); });
      var c = el('div', 'ph-vl-card ' + (right ? 'is-sound' : 'is-invalid'));
      var head = el('p', 'ph-vl-verdict'); head.appendChild(el('b', '', it.a));
      head.appendChild(el('em', right ? 'ok' : 'no', right ? 'You had it · 你答對了' : 'Look again · 再看一次')); c.appendChild(head);
      c.appendChild(block('ph-vl-why', 'What is wrong · 毛病在哪', it.why));
      c.appendChild(block('ph-fl-fix', 'What it imitates, and the repair · 它模仿什麼、怎麼修', it.fix));
      out.appendChild(c); next.hidden = false;
      next.textContent = i === items.length - 1 ? 'See your result · 看結果 →' : 'Next · 下一段 →';
      paint();
    }
    function show() {
      var it = items[i]; finished = false; card.textContent = ''; ask.textContent = ''; out.textContent = ''; next.hidden = true;
      card.appendChild(el('small', '', it.src));
      card.appendChild(el('p', 'ph-fl-t', it.t.en)); var z = el('p', 'ph-fl-zh', it.t.zh); z.lang = 'zh-Hant'; card.appendChild(z);
      card.classList.remove('ph-vl-in'); void card.offsetWidth; card.classList.add('ph-vl-in');
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', 'Which diagnosis fits best?')); var qs = el('span', '', '哪一個診斷最貼切？'); qs.lang = 'zh-Hant'; q.appendChild(qs); ask.appendChild(q);
      var box = el('div', 'ph-vl-opts'), btns = [];
      it.opts.forEach(function (o, k) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o));
        b.addEventListener('click', function () { if (!b.disabled) answer(k, btns); }); btns.push(b); box.appendChild(b);
      });
      ask.appendChild(box); paint();
    }
    function finish() {
      finished = true; card.textContent = ''; ask.textContent = ''; out.textContent = ''; next.hidden = true;
      var n = score.filter(Boolean).length, c = el('div', 'ph-el-end');
      var h = el('h4', '', n + ' of ' + items.length); h.appendChild(el('span', '', '答對 ' + n + '／' + items.length)); c.appendChild(h);
      c.appendChild(el('p', '', 'The names matter less than the second line of each answer. For the next week, try to notice which respectable pattern a weak argument is borrowing, starting with your own.'));
      zhp(c, '名稱沒有每題解說的第二行重要。接下來一個禮拜，試著留意一個弱論證借用了哪個正當的樣式，從你自己的論證開始。');
      out.appendChild(c); paint();
    }
    next.addEventListener('click', function () { if (i < items.length - 1) { i++; show(); } else finish(); });
    $('[data-fl-reset]', root).addEventListener('click', function () { i = 0; score = []; show(); });
    show();
    root.__lab = { state: function () { return { i: i, score: score.slice(), finished: finished }; } };
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
