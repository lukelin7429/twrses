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

  /* ---- A4：阿基里斯與烏龜（芝諾的走法 vs. 時鐘的走法） ---- */
  $$('[data-ph-zeno]').forEach(function (root) {
    var VA = 10, HEAD = 100, X0 = 40, X1 = 960;
    var r = 10, n, a, t, clock, timer = null, mode;
    var gA = $('[data-zn-a]', root), gT = $('[data-zn-t]', root), gL = $('[data-zn-limit]', root), marks = $('[data-zn-marks]', root);
    var rows = $('[data-zn-rows]', root), msg = $('[data-zn-msg]', root);
    function vt() { return VA / r; }
    function meet() { return HEAD / (1 - 1 / r); }          // 追上的位置
    function tMeet() { return HEAD / (VA - vt()); }           // 追上的時刻
    function sx(m) { return X0 + (X1 - X0) * m / (meet() * 1.22); }
    function fmt(v, unit) {
      var s;
      if (v === 0) s = '0';
      else if (v >= 0.01) s = String(+v.toPrecision(6));
      else s = v.toExponential(2).replace('e-', ' × 10⁻').replace(/⁻(\d+)/, function (_, d) { return '⁻' + d.split('').map(function (c) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]; }).join(''); });
      return s + ' ' + unit;
    }
    function draw() {
      gA.setAttribute('transform', 'translate(' + sx(a) + ',0)');
      gT.setAttribute('transform', 'translate(' + sx(t) + ',0)');
      gL.setAttribute('transform', 'translate(' + sx(meet()) + ',0)');
      $('text', gL).textContent = fmt(+meet().toPrecision(6), 'm');
      $('[data-zn-n]', root).textContent = mode === 'run' ? '—' : n;
      $('[data-zn-time]', root).textContent = mode === 'run' ? clock.toFixed(2) + ' s' : String(+clock.toPrecision(14)) + ' s';
      $('[data-zn-gap]', root).textContent = mode === 'run' ? (t >= a ? (t - a).toFixed(1) + ' m' : 'ahead by ' + (a - t).toFixed(1) + ' m') : fmt(n ? HEAD / Math.pow(r, n) : HEAD, 'm');
      $('[data-zn-lim]', root).textContent = fmt(+tMeet().toPrecision(6), 's');
    }
    function say(en, zh) { msg.textContent = en; var z = el('span', '', zh); z.lang = 'zh-Hant'; msg.appendChild(z); }
    function reset() {
      if (timer) { clearInterval(timer); timer = null; }
      root.classList.remove('is-running');
      n = 0; a = 0; t = HEAD; clock = 0; mode = 'zeno'; rows.textContent = ''; marks.textContent = '';
      $$('[data-zn-r]', root).forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-zn-r') === r ? 'true' : 'false'); });
      say('Press “Zeno’s next stage.” Each press takes Achilles to where the tortoise was.', '按「芝諾的下一階段」。每按一次，阿基里斯就到達烏龜剛才所在的位置。');
      draw();
    }
    function step() {
      if (timer) return;
      if (mode === 'run') reset();
      var d = t - a, dt = d / VA;
      var m = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      m.setAttribute('x1', sx(t)); m.setAttribute('x2', sx(t)); m.setAttribute('y1', 112); m.setAttribute('y2', 128); m.setAttribute('class', 'ph-zn-mark'); marks.appendChild(m);
      n++;
      // 用閉合式算，避免一步步累加的浮點誤差：第 n 階段後差距＝HEAD／rⁿ
      var gap = HEAD / Math.pow(r, n); d = HEAD / Math.pow(r, n - 1); dt = d / VA;
      clock = (HEAD / VA) * (1 - Math.pow(r, -n)) / (1 - 1 / r); a = VA * clock; t = a + gap;
      var long = String(+clock.toPrecision(14)) + ' s';
      var tr = el('tr'); [n, fmt(d, 'm'), fmt(dt, 's'), fmt(gap, 'm'), long].forEach(function (c) { tr.appendChild(el('td', '', String(c))); });
      rows.appendChild(tr); tr.scrollIntoView({ block: 'nearest' });
      if (n < 4) say('A gap remains, so there is another stage to run.', '還剩一段差距，所以還有下一個階段要跑。');
      else if (n < 12) say('The gap keeps shrinking by the same factor. The clock creeps toward ' + fmt(+tMeet().toPrecision(6), 's') + ' and has not reached it.', '差距一直以同樣的比例縮小。時鐘慢慢逼近 ' + fmt(+tMeet().toPrecision(6), 's') + '，但還沒到。');
      else say('You could press forever: no stage is the last. Yet all of them together take less than ' + fmt(+tMeet().toPrecision(6), 's') + '. Now let the clock run.', '你可以永遠按下去：沒有哪一個階段是最後一個。可是它們全部加起來，花不到 ' + fmt(+tMeet().toPrecision(6), 's') + '。現在讓時鐘自己走。');
      draw();
    }
    function run() {
      if (timer) return;
      reset(); mode = 'run'; root.classList.add('is-running');
      var T = tMeet(), end = T * 1.2, t0 = Date.now(), dur = 6000, passed = false;
      say('The clock is running at an even pace.', '時鐘以均勻的速度在走。');
      timer = setInterval(function () {
        var k = Math.min(1, (Date.now() - t0) / dur);
        clock = end * k; a = VA * clock; t = HEAD + vt() * clock;
        if (!passed && clock >= T) { passed = true; say('At ' + fmt(+T.toPrecision(6), 's') + ' they are level, and after that Achilles is ahead. Zeno’s stages all lie before this moment.', '在 ' + fmt(+T.toPrecision(6), 's') + ' 兩者並肩，之後阿基里斯就領先了。芝諾的那些階段，全都落在這一刻之前。'); }
        draw();
        if (k >= 1) { clearInterval(timer); timer = null; }
      }, 30);
    }
    $('[data-zn-step]', root).addEventListener('click', step);
    $('[data-zn-run]', root).addEventListener('click', run);
    $('[data-zn-reset]', root).addEventListener('click', reset);
    $$('[data-zn-r]', root).forEach(function (b) { b.addEventListener('click', function () { r = +b.getAttribute('data-zn-r'); reset(); }); });
    reset();
    root.__lab = { step: step, run: run, state: function () { return { r: r, n: n, a: a, t: t, clock: clock, meet: meet(), tMeet: tMeet(), mode: mode }; } };
  });

  /* ---- A5：懷疑的階梯（先預測、再施加懷疑） ---- */
  $$('[data-ph-doubt]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-db-data]', root).textContent); } catch (e) { return; }
    var grid = $('[data-db-grid]', root), q = $('[data-db-q]', root), out = $('[data-db-out]', root);
    var go = $('[data-db-go]', root), wavesEl = $('[data-db-waves]', root), count = $('[data-db-count]', root);
    var w, cards, phase, hits;
    function zhp(parent, text, cls) { var z = el('p', cls || 'ph-zh', text); z.lang = 'zh-Hant'; parent.appendChild(z); if (!cls) addTr(z); return z; }
    function standing() { return cards.filter(function (c) { return !c.fallen; }); }
    function paint() {
      wavesEl.textContent = '';
      D.waves.forEach(function (wv, k) {
        var s = el('span', k < w ? 'done' : (k === w ? 'cur' : ''), (k + 1) + '. ' + wv.name.en); wavesEl.appendChild(s);
      });
      count.textContent = standing().length + ' of ' + cards.length + ' still standing · 還站著 ' + standing().length + '／' + cards.length;
    }
    function ask() {
      phase = 'predict'; out.textContent = ''; q.textContent = '';
      var wv = D.waves[w];
      q.appendChild(el('small', '', 'Wave ' + (w + 1) + ' · 第 ' + (w + 1) + ' 波 — ' + wv.name.zh));
      q.appendChild(el('p', '', wv.q.en)); zhp(q, wv.q.zh, 'ph-db-qzh');
      q.appendChild(el('p', 'ph-db-hint', 'Tap the beliefs you expect to fall, then apply the doubt. · 點選你預期會倒下的信念，再施加懷疑。'));
      go.hidden = false; go.textContent = 'Apply the doubt · 施加懷疑';
      cards.forEach(function (c) { c.b.classList.remove('is-miss', 'is-hit'); c.pick = false; c.b.setAttribute('aria-pressed', 'false'); c.b.disabled = c.fallen; });
      paint();
    }
    function apply() {
      var wv = D.waves[w], right = 0, total = 0;
      standing().forEach(function (c) {
        var falls = c.lv === w + 1; total++;
        if (falls === c.pick) right++; else c.b.classList.add('is-miss');
        c.b.disabled = true;
        if (falls) { c.fallen = true; c.b.classList.add('is-fallen'); c.b.setAttribute('data-wave', String(w + 1)); }
      });
      hits += right;
      var card = el('div', 'ph-vl-card');
      var head = el('p', 'ph-vl-verdict'); head.appendChild(el('b', '', wv.name.en));
      head.appendChild(el('em', right === total ? 'ok' : 'no', 'You matched Descartes on ' + right + ' of ' + total + ' · 與笛卡兒一致 ' + right + '／' + total)); card.appendChild(head);
      var why = el('div', 'ph-vl-why'); why.appendChild(el('p', '', wv.why.en)); zhp(why, wv.why.zh); card.appendChild(why);
      card.appendChild(el('p', 'ph-vl-skip', wv.ref));
      out.textContent = ''; out.appendChild(card);
      phase = 'shown'; w++;
      if (w < D.waves.length) go.textContent = 'Next wave · 下一波 →';
      else {
        go.hidden = true;
        cards.forEach(function (c) { if (!c.fallen) c.b.classList.add('is-cogito'); });
        var end = el('div', 'ph-el-end'); var h = el('h4', '', 'Cogito'); h.appendChild(el('span', '', '我思')); end.appendChild(h);
        end.appendChild(el('p', '', D.end.en)); zhp(end, D.end.zh); out.appendChild(end);
      }
      paint();
    }
    function reset() {
      w = 0; hits = 0; grid.textContent = '';
      cards = D.beliefs.map(function (bf) {
        var b = el('button', 'ph-db-card'); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
        b.appendChild(el('b', '', bf.t.en)); var z = el('span', '', bf.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        var c = { b: b, lv: bf.lv, fallen: false, pick: false };
        b.addEventListener('click', function () { if (phase !== 'predict' || c.fallen) return; c.pick = !c.pick; b.setAttribute('aria-pressed', c.pick ? 'true' : 'false'); });
        grid.appendChild(b); return c;
      });
      ask();
    }
    go.addEventListener('click', function () { if (phase === 'predict') apply(); else if (w < D.waves.length) ask(); });
    $('[data-db-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { w: w, standing: standing().length, hits: hits, phase: phase }; } };
  });

  /* ---- A7：把正方形加倍（《美諾篇》）與莫利紐茲問題 ---- */
  $$('[data-ph-meno]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-mn-data]', root).textContent); } catch (e) { return; }
    var say = $('[data-mn-say]', root), note = $('[data-mn-note]', root), opts = $('[data-mn-opts]', root), area = $('[data-mn-area]', root);
    var AREA = { start: 'Area 4 · 面積 4', four: 'Side 4 → area 16 · 邊長 4 → 面積 16', three: 'Side 3 → area 9 · 邊長 3 → 面積 9', diag: 'How many halves? · 幾個「半個」？', done: 'Area 8 · 面積 8' };
    var path = [];
    function zhp(parent, text) { var z = el('p', 'ph-zh', text); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function go(key, wrong) {
      var st = D.steps.filter(function (x) { return x.key === key; })[0];
      if (!wrong) path.push(key);
      root.setAttribute('data-state', key); area.textContent = AREA[key];
      say.textContent = ''; say.appendChild(el('p', '', st.say.en)); zhp(say, st.say.zh);
      note.textContent = ''; note.hidden = !st.note;
      if (st.note) { note.appendChild(el('p', '', st.note.en)); zhp(note, st.note.zh); }
      if (wrong) { note.hidden = false; note.textContent = ''; note.appendChild(el('p', '', 'Count again. Each diagonal cuts one of the four squares in half, and the tilted figure takes one half from each. · 再數一次。每條對角線把四個正方形之一切成兩半，斜著的圖形從每個正方形各取一半。')); }
      opts.textContent = '';
      st.opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { go(o.go, !!o.wrong); }); opts.appendChild(b);
      });
    }
    $('[data-mn-reset]', root).addEventListener('click', function () { path = []; go('start'); });
    go('start');
    var hm = /meno=(\w+)/.exec(location.hash); if (hm) go(hm[1]);   // 截圖用：#meno=done
    root.__lab = { go: go, state: function () { return { state: root.getAttribute('data-state'), path: path.slice() }; } };
  });
  $$('[data-ph-molyneux]').forEach(function (root) {
    var out = $('[data-ml-out]', root);
    $$('[data-ml]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-ml'); out.hidden = false;
        $$('[data-ml]', root).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        $('[data-ml-yes]', root).classList.toggle('is-yours', v === 'yes'); $('[data-ml-no]', root).classList.toggle('is-yours', v === 'no');
      });
    });
  });

  /* ---- A8：羅素的雞（歸納），以及替歸納找理由 ---- */
  $$('[data-ph-chicken]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ck-data]', root).textContent); } catch (e) { return; }
    var days = $('[data-ck-days]', root), bar = $('[data-ck-bar]', root), pct = $('[data-ck-pct]', root), msg = $('[data-ck-msg]', root);
    var next = $('[data-ck-next]', root), dayEl = $('[data-ck-day]', root), conf = $('[data-ck-conf]', root);
    var n, dead;
    function say(en, zh) { msg.textContent = en; var z = el('span', '', zh); z.lang = 'zh-Hant'; msg.appendChild(z); }
    function paint() {
      var p = (n + 1) / (n + 2);                    // 拉普拉斯接續律
      bar.style.width = (dead ? 0 : p * 100) + '%'; pct.textContent = dead ? '—' : (p * 100).toFixed(1) + '%';
      dayEl.textContent = 'Day ' + (n + (dead ? 1 : 0)) + ' · 第 ' + (n + (dead ? 1 : 0)) + ' 天';
      conf.textContent = dead ? '' : 'Confidence in grain tomorrow · 對「明天有穀子」的信心';
      root.classList.toggle('is-dead', dead);
    }
    function reset() {
      n = 0; dead = false; days.textContent = ''; next.hidden = false;
      say('You have just hatched. You have no idea what mornings are like.', '你剛孵出來，完全不知道早晨是什麼樣子。'); paint();
    }
    function step() {
      if (dead) return;
      if (n >= D.last) {
        dead = true; var x = el('i', 'x', '✕'); days.appendChild(x); next.hidden = true;
        say(D.end.en, D.end.zh); paint(); return;
      }
      n++; days.appendChild(el('i', '', '🌾'));
      var p = ((n + 1) / (n + 2) * 100).toFixed(1);
      if (n === 1) say(D.fed.en + ' One morning proves little.', D.fed.zh + '一個早上證明不了什麼。');
      else if (n < 6) say(D.fed.en + ' The pattern is starting to look reliable.', D.fed.zh + '這個規律開始顯得可靠了。');
      else if (n < 12) say(D.fed.en + ' ' + n + ' mornings out of ' + n + '. You begin to run toward him.', D.fed.zh + n + ' 個早上，' + n + ' 次都有。你開始朝他跑過去。');
      else say(D.fed.en + ' You are now ' + p + '% sure about tomorrow, and with good reason.', D.fed.zh + '你現在對明天有 ' + p + '% 的把握，而且理由充分。');
      paint();
    }
    next.addEventListener('click', step);
    $('[data-ck-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { step: step, data: D, state: function () { return { n: n, dead: dead, pct: pct.textContent }; } };
  });
  $$('[data-ph-ckj]').forEach(function (root) {
    var lab = document.querySelector('[data-ph-chicken]'); if (!lab || !lab.__lab) return;
    var J = lab.__lab.data.justify, reply = $('[data-ck-reply]', root), tried = $('[data-ck-tried]', root), seen = {};
    $$('[data-ck-j]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-ck-j'), o = J.opts[i]; seen[i] = true;
        $$('[data-ck-j]', root).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        b.classList.add('is-seen');
        reply.hidden = false; reply.textContent = '';
        reply.appendChild(el('b', '', o.tag)); reply.appendChild(el('p', '', o.r.en));
        var z = el('p', 'ph-zh', o.r.zh); z.lang = 'zh-Hant'; reply.appendChild(z); addTr(z);
        var k = Object.keys(seen).length;
        tried.textContent = k === J.opts.length ? 'You have tried all four. Three lead back to the question, and the fourth declines to answer it. That is Hume’s problem. · 四個你都試過了。三個繞回問題本身，第四個拒絕回答。這就是休謨的問題。' : k + ' of ' + J.opts.length + ' tried · 已試 ' + k + '／' + J.opts.length;
      });
    });
  });

  /* ---- A10：踏進這條河（水滴流過石頭；踏進去會標記碰到腳的水） ---- */
  $$('[data-ph-river]').forEach(function (root) {
    var N;
    try { N = JSON.parse($('[data-rv-data]', root).textContent); } catch (e) { return; }
    var cv = $('canvas', root), g = cv.getContext('2d'), W = cv.width, H = cv.height;
    var msg = $('[data-rv-msg]', root), stepsEl = $('[data-rv-steps]', root), leftEl = $('[data-rv-left]', root), passedEl = $('[data-rv-passed]', root), stateEl = $('[data-rv-state]', root);
    var ROCK = { x: 610, y: 215, r: 34 }, FOOT = { x: 330, y: 205, r: 62 };
    var drops, steps, passed, frozen, pattern, firstTotal, said;
    function bankTop(x) { return 70 + 16 * Math.sin(x / 150); }
    function bankBot(x) { return 350 + 18 * Math.sin(x / 130 + 1.4); }
    function spawn(x) {
      var t = Math.random();
      return { x: x, t: t, y: 0, v: 1.5 + 1.6 * (1 - Math.abs(t - 0.5) * 2) + Math.random() * 0.4, tag: 0, eddy: 0, a: Math.random() * 6.28 };
    }
    function say(key) { if (said === key) return; said = key; var o = N[key]; msg.textContent = o.en; var z = el('span', '', o.zh); z.lang = 'zh-Hant'; msg.appendChild(z); }
    function reset() {
      drops = []; for (var i = 0; i < 760; i++) drops.push(spawn(Math.random() * W));
      steps = 0; passed = 0; frozen = false; pattern = false; firstTotal = 0; said = null;
      $('[data-rv-freeze]', root).setAttribute('aria-pressed', 'false'); $('[data-rv-pattern]', root).setAttribute('aria-pressed', 'false');
      say('start'); readout();
    }
    function readout() {
      stepsEl.textContent = steps; passedEl.textContent = passed;
      var left = drops.filter(function (d) { return d.tag === 1; }).length;
      leftEl.textContent = firstTotal ? left + ' / ' + firstTotal : '—';
      stateEl.textContent = frozen ? 'stopped · 停住' : 'flowing · 流動';
      if (steps === 1 && firstTotal && left === 0 && !frozen && !pattern) say('gone');
    }
    function step() {
      steps++; var n = 0;
      drops.forEach(function (d) { var dx = d.x - FOOT.x, dy = d.y - FOOT.y; if (dx * dx + dy * dy < FOOT.r * FOOT.r) { d.tag = steps === 1 ? 1 : 2; n++; } });
      if (steps === 1) firstTotal = n;
      said = null; say(steps === 1 ? 'step1' : 'step2'); readout();
    }
    function tick() {
      drops.forEach(function (d, i) {
        if (!frozen) {
          if (d.eddy > 0) {                          // 困在石頭後面的漩渦裡轉幾圈
            d.a += 0.11; d.eddy--; d.x = ROCK.x + 62 + Math.cos(d.a) * 22; d.yo = Math.sin(d.a) * 20;
            if (d.eddy === 0) { d.t = (ROCK.y + d.yo - bankTop(d.x)) / (bankBot(d.x) - bankTop(d.x)); d.yo = null; }
          } else {
            d.x += d.v;
            var y = bankTop(d.x) + d.t * (bankBot(d.x) - bankTop(d.x)), dx = d.x - ROCK.x, dy = y - ROCK.y, r2 = dx * dx + dy * dy, R = ROCK.r + 9;
            if (r2 < R * R) { d.t += (dy >= 0 ? 1 : -1) * 0.012; }                       // 繞過石頭
            if (dx > 20 && dx < 60 && Math.abs(dy) < 46 && Math.random() < 0.09) { d.eddy = 90 + Math.floor(Math.random() * 120); d.a = Math.random() * 6.28; }
          }
          if (d.x > W + 6) { if (d.tag) { /* 被標記的水流走了 */ } drops[i] = spawn(-6); passed++; }
        }
        d.y = d.eddy > 0 && d.yo != null ? ROCK.y + d.yo : bankTop(d.x) + Math.min(0.97, Math.max(0.03, d.t)) * (bankBot(d.x) - bankTop(d.x));
      });
      draw(); readout();
    }
    function draw() {
      g.fillStyle = '#cdbb8f'; g.fillRect(0, 0, W, H);
      g.beginPath(); g.moveTo(0, bankTop(0)); for (var x = 0; x <= W; x += 10) g.lineTo(x, bankTop(x)); for (x = W; x >= 0; x -= 10) g.lineTo(x, bankBot(x)); g.closePath();
      g.fillStyle = frozen ? '#9fc4d6' : '#2f7fa8'; g.fill();
      if (pattern) {
        g.strokeStyle = '#ffd36e'; g.lineWidth = 3; g.setLineDash([9, 7]);
        g.beginPath(); for (x = 0; x <= W; x += 10) g.lineTo(x, bankTop(x)); g.stroke();
        g.beginPath(); for (x = 0; x <= W; x += 10) g.lineTo(x, bankBot(x)); g.stroke();
        g.beginPath(); g.arc(ROCK.x + 62, ROCK.y, 31, 0, 6.3); g.stroke(); g.setLineDash([]);
        g.fillStyle = '#ffd36e'; g.font = '700 17px sans-serif'; g.fillText('eddy · 漩渦', ROCK.x + 100, ROCK.y - 30); g.fillText('banks · 河岸', 24, bankTop(24) - 12);
      }
      drops.forEach(function (d) {
        g.fillStyle = d.tag === 1 ? '#ff9d5c' : d.tag === 2 ? '#7ff0c8' : 'rgba(255,255,255,.55)';
        g.beginPath(); g.arc(d.x, d.y, d.tag ? 4.6 : 2.4, 0, 6.3); g.fill();
      });
      g.fillStyle = '#6b6258'; g.beginPath(); g.arc(ROCK.x, ROCK.y, ROCK.r, 0, 6.3); g.fill();
      g.fillStyle = '#857b6f'; g.beginPath(); g.arc(ROCK.x - 8, ROCK.y - 9, ROCK.r * 0.55, 0, 6.3); g.fill();
      if (steps) {
        g.strokeStyle = '#fff'; g.lineWidth = 2.5; g.setLineDash([6, 5]); g.beginPath(); g.arc(FOOT.x, FOOT.y, FOOT.r, 0, 6.3); g.stroke(); g.setLineDash([]);
        g.fillStyle = '#fff'; g.font = '700 16px sans-serif'; g.fillText('you · 你', FOOT.x - 28, FOOT.y - FOOT.r - 9);
      }
    }
    $('[data-rv-step]', root).addEventListener('click', step);
    $('[data-rv-freeze]', root).addEventListener('click', function (e) { frozen = !frozen; e.currentTarget.setAttribute('aria-pressed', frozen ? 'true' : 'false'); e.currentTarget.firstChild.textContent = frozen ? 'Let it flow · 讓它流' : 'Stop the river · 把河停住'; said = null; say(frozen ? 'frozen' : (steps ? 'step' + Math.min(2, steps) : 'start')); });
    $('[data-rv-pattern]', root).addEventListener('click', function (e) { pattern = !pattern; e.currentTarget.setAttribute('aria-pressed', pattern ? 'true' : 'false'); said = null; if (pattern) say('pattern'); });
    $('[data-rv-reset]', root).addEventListener('click', reset);
    reset(); for (var k = 0; k < 200; k++) tick(); passed = 0;
    if (/river=step/.test(location.hash)) { step(); for (k = 0; k < 28; k++) tick(); pattern = true; }   // 截圖用
    setInterval(tick, 33);
    root.__lab = { step: step, tick: tick, state: function () { return { steps: steps, passed: passed, frozen: frozen, pattern: pattern, first: firstTotal, left: drops.filter(function (d) { return d.tag === 1; }).length, said: said }; } };
  });

  /* ---- A11：拉普拉斯的球桌（決定性的小宇宙）與作弊的信封 ---- */
  $$('[data-ph-demon]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-dm-data]', root).textContent); } catch (e) { return; }
    var cv = $('canvas', root), g = cv.getContext('2d'), W = cv.width, H = cv.height, R = 17, STEPS = 620, DT = 1 / 60;
    var msg = $('[data-dm-msg]', root), runsEl = $('[data-dm-runs]', root), tEl = $('[data-dm-t]', root), endEl = $('[data-dm-end]', root), angEl = $('[data-dm-ang]', root);
    var COL = ['#e2553d', '#f3e3b8', '#9fc3ea', '#4fd1a5', '#ffd36e', '#c9a0dc'];
    var angle = 30, runs, last, timer = null, balls, trail, k, said;
    function init() {
      var a = angle * Math.PI / 180, sp = 430;
      balls = [{ x: 150, y: 220, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp }, { x: 520, y: 150, vx: 0, vy: 0 }, { x: 600, y: 300, vx: -60, vy: 20 },
               { x: 760, y: 200, vx: 0, vy: 0 }, { x: 430, y: 340, vx: 40, vy: -30 }, { x: 850, y: 330, vx: 0, vy: 0 }];
      trail = []; k = 0;
    }
    function stepSim() {
      var i, j, b, c, dx, dy, d, nx, ny, p, ov;
      for (i = 0; i < balls.length; i++) {
        b = balls[i]; b.x += b.vx * DT; b.y += b.vy * DT;
        if (b.x < R) { b.x = R; b.vx = -b.vx; } if (b.x > W - R) { b.x = W - R; b.vx = -b.vx; }
        if (b.y < R) { b.y = R; b.vy = -b.vy; } if (b.y > H - R) { b.y = H - R; b.vy = -b.vy; }
      }
      for (i = 0; i < balls.length; i++) for (j = i + 1; j < balls.length; j++) {
        b = balls[i]; c = balls[j]; dx = c.x - b.x; dy = c.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 2 * R && d > 0) {
          nx = dx / d; ny = dy / d; p = (b.vx - c.vx) * nx + (b.vy - c.vy) * ny;
          if (p > 0) { b.vx -= p * nx; b.vy -= p * ny; c.vx += p * nx; c.vy += p * ny; }
          ov = (2 * R - d) / 2; b.x -= nx * ov; b.y -= ny * ov; c.x += nx * ov; c.y += ny * ov;
        }
      }
      k++; if (k % 3 === 0) trail.push([balls[0].x, balls[0].y]);
    }
    function draw() {
      g.fillStyle = '#17543f'; g.fillRect(0, 0, W, H);
      g.strokeStyle = 'rgba(255,255,255,.22)'; g.lineWidth = 2; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.stroke(); g.setLineDash([]);
      g.fillStyle = 'rgba(255,255,255,.3)'; g.font = '700 15px sans-serif'; g.fillText('left · 左', 14, 24); g.fillText('right · 右', W - 92, 24);
      if (trail.length > 1) { g.strokeStyle = 'rgba(226,85,61,.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(trail[0][0], trail[0][1]); trail.forEach(function (p) { g.lineTo(p[0], p[1]); }); g.stroke(); }
      balls.forEach(function (b, i) { g.fillStyle = COL[i]; g.beginPath(); g.arc(b.x, b.y, R, 0, 6.3); g.fill(); g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 1.5; g.stroke(); });
    }
    function say(key, o) {
      said = key; var n = D.notes[key], en = n.en, zh = n.zh;
      if (o) { en = en.replace('{side}', o.side); zh = zh.replace('{side_zh}', o.zh); }
      msg.textContent = en; var z = el('span', '', zh); z.lang = 'zh-Hant'; msg.appendChild(z);
    }
    function result() { var b = balls[0]; return { side: b.x < W / 2 ? 'left' : 'right', zh: b.x < W / 2 ? '左' : '右', sig: b.x.toFixed(6) + ',' + b.y.toFixed(6) }; }
    function finish(nudged) {
      var r = result(); runs++; runsEl.textContent = runs; endEl.textContent = r.side + ' · ' + r.zh + ' (' + balls[0].x.toFixed(1) + ', ' + balls[0].y.toFixed(1) + ')';
      if (nudged) say('nudged'); else if (last && last.sig === r.sig) say('same'); else say('ran', r);
      last = r; $('[data-dm-run]', root).textContent = 'Rewind and run again · 倒回去再跑一次';
    }
    function run(nudged, instant) {
      if (timer) return; init(); draw();
      if (instant) { while (k < STEPS) stepSim(); draw(); tEl.textContent = (k * DT).toFixed(1) + ' s'; finish(nudged); return; }
      timer = setInterval(function () {
        for (var n = 0; n < 2 && k < STEPS; n++) stepSim();
        draw(); tEl.textContent = (k * DT).toFixed(1) + ' s';
        if (k >= STEPS) { clearInterval(timer); timer = null; finish(nudged); }
      }, 16);
    }
    function reset() { if (timer) { clearInterval(timer); timer = null; } angle = 30; runs = 0; last = null; runsEl.textContent = 0; endEl.textContent = '—'; tEl.textContent = '0.0 s'; angEl.textContent = '30.00°'; $('[data-dm-run]', root).textContent = 'Run the universe · 讓宇宙運行'; init(); draw(); say('start'); }
    $('[data-dm-run]', root).addEventListener('click', function () { run(false); });
    $('[data-dm-nudge]', root).addEventListener('click', function () { if (timer) return; angle = +(angle + 0.01).toFixed(2); angEl.textContent = angle.toFixed(2) + '°'; last = null; run(true); });
    $('[data-dm-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { run: run, state: function () { return { runs: runs, angle: angle, said: said, last: last, busy: !!timer }; } };
  });
  $$('[data-ph-envelope]').forEach(function (root) {
    var dm = document.querySelector('[data-ph-demon] [data-dm-data]'); if (!dm) return;
    var E = JSON.parse(dm.textContent).envelope, out = $('[data-env-out]', root), card = $('[data-env-card]', root);
    $$('[data-env]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-env'), o = E[v];
        $$('[data-env]', root).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        card.textContent = o.en + ' · ' + o.zh; card.classList.add('is-open');
        out.hidden = false; out.textContent = '';
        out.appendChild(el('b', '', 'The envelope · 信封'));
        out.appendChild(el('p', '', E.open.en.replace('{pick}', o.en)));
        var z = el('p', 'ph-zh', E.open.zh.replace('{pick_zh}', o.zh)); z.lang = 'zh-Hant'; out.appendChild(z); addTr(z);
        out.appendChild(el('p', 'ph-env-confess', E.confess.en));
        var z2 = el('p', 'ph-zh', E.confess.zh); z2.lang = 'zh-Hant'; out.appendChild(z2); addTr(z2);
      });
    });
  });

  /* ---- A12：「現在」有多長？＋量一段時間＋A／B 系列 ---- */
  $$('[data-ph-now]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-nw-data]', root).textContent); } catch (e) { return; }
    var bar = $('[data-nw-bar]', root), msg = $('[data-nw-msg]', root), lvl = $('[data-nw-level]', root), frac = $('[data-nw-frac]', root), zoom = $('[data-nw-zoom]', root), i;
    function say(o) { msg.textContent = o.en; var z = el('span', '', o.zh); z.lang = 'zh-Hant'; msg.appendChild(z); }
    function paint() {
      var L = D.levels[Math.min(i, D.levels.length - 1)], n = L.parts, shown = Math.min(n, 60), now = Math.floor(shown * 0.42);
      bar.textContent = ''; bar.classList.remove('ph-nw-in'); void bar.offsetWidth; bar.classList.add('ph-nw-in');
      for (var k = 0; k < shown; k++) bar.appendChild(el('i', k < now ? 'p' : k === now ? 'n' : 'f'));
      lvl.textContent = 'The “present”: ' + L.u.en + ' · 「現在」：' + L.u.zh;
      frac.textContent = '1 of ' + n.toLocaleString('en-US') + ' ' + L.pu.en + ' is now · ' + n.toLocaleString('en-US') + ' ' + L.pu.zh + '裡只有 1 是此刻';
      if (i >= D.levels.length) { say(D.end); zoom.textContent = 'Closer still · 還要更近'; bar.classList.add('is-end'); }
      else { say(L.say); zoom.textContent = 'Look closer · 再看近一點'; bar.classList.remove('is-end'); }
    }
    zoom.addEventListener('click', function () { i = Math.min(i + 1, D.levels.length); paint(); });
    $('[data-nw-reset]', root).addEventListener('click', function () { i = 0; paint(); });
    i = 0; paint();
    root.__lab = { state: function () { return { i: i, levels: D.levels.length, cells: bar.children.length }; }, data: D };
  });
  $$('[data-ph-measure]').forEach(function (root) {
    var now = document.querySelector('[data-ph-now]'); if (!now || !now.__lab) return;
    var M = now.__lab.data.measure, lamp = $('[data-ms-lamp]', root), start = $('[data-ms-start]', root), box = $('[data-ms-guessbox]', root), range = $('[data-ms-range]', root), val = $('[data-ms-val]', root), out = $('[data-ms-out]', root);
    var DUR = [2.5, 4.0, 5.5, 3.0, 6.5], n = 0, actual = 0, busy = false;
    range.addEventListener('input', function () { val.textContent = (+range.value).toFixed(1) + ' s'; });
    start.addEventListener('click', function () {
      if (busy) return; busy = true; actual = DUR[n % DUR.length]; n++; out.hidden = true; box.hidden = true; lamp.classList.add('on'); start.disabled = true;
      setTimeout(function () { lamp.classList.remove('on'); box.hidden = false; busy = false; start.disabled = false; start.textContent = 'Again · 再一次'; }, actual * 1000);
    });
    $('[data-ms-ok]', root).addEventListener('click', function () {
      var g = (+range.value).toFixed(1), a = actual.toFixed(1); out.hidden = false; out.textContent = '';
      out.appendChild(el('b', '', a + ' s · ' + g + ' s'));
      out.appendChild(el('p', '', M.after.en.replace('{actual}', a).replace('{guess}', g)));
      var z = el('p', 'ph-zh', M.after.zh.replace('{actual}', a).replace('{guess}', g)); z.lang = 'zh-Hant'; out.appendChild(z); addTr(z);
    });
    root.__lab = { state: function () { return { n: n, actual: actual, busy: busy }; } };
  });
  $$('[data-ph-series]').forEach(function (root) {
    var now = document.querySelector('[data-ph-now]'); if (!now || !now.__lab) return;
    var S = now.__lab.data.series, list = $('[data-sr-list]', root), note = $('[data-sr-note]', root), opened = Date.now(), mode = 'a';
    function ago(sec) { return sec < 90 ? Math.round(sec) + ' seconds ago · ' + Math.round(sec) + ' 秒前' : (sec / 60).toFixed(1) + ' minutes ago · ' + (sec / 60).toFixed(1) + ' 分鐘前'; }
    function paint() {
      var yr = new Date().getFullYear(), sec = (Date.now() - opened) / 1000;
      list.textContent = '';
      S.events.forEach(function (e, k) {
        var li = el('li'); li.appendChild(el('b', '', e.t.en)); var z = el('span', '', e.t.zh); z.lang = 'zh-Hant'; li.appendChild(z);
        var tag;
        if (mode === 'a') {
          if (e.y === 'open') tag = 'past · 過去 — ' + ago(sec);
          else if (e.y === 'later') tag = 'future · 未來';
          else tag = 'past · 過去 — ' + (yr - e.y).toLocaleString('en-US') + ' years ago · ' + (yr - e.y) + ' 年前';
          if (e.y === 'later') li.className = 'f';
        } else {
          tag = k === 0 ? 'the earliest of these · 這幾件裡最早的' : 'later than the one above · 晚於上一件';
          if (typeof e.y === 'number' && k > 0 && typeof S.events[k - 1].y === 'number') tag += ' — by ' + (e.y - S.events[k - 1].y).toLocaleString('en-US') + ' years · 相隔 ' + (e.y - S.events[k - 1].y) + ' 年';
        }
        li.appendChild(el('i', '', tag)); list.appendChild(li);
      });
      if (mode === 'a') { var nowLi = el('li', 'now'); nowLi.appendChild(el('b', '', 'NOW · 現在')); list.insertBefore(nowLi, list.lastChild); }
      var o = mode === 'a' ? S.a : S.b; note.textContent = ''; note.appendChild(el('p', '', o.en)); var z2 = el('p', 'ph-zh', o.zh); z2.lang = 'zh-Hant'; note.appendChild(z2); addTr(z2);
    }
    $$('[data-sr]', root).forEach(function (b) { b.addEventListener('click', function () { mode = b.getAttribute('data-sr'); root.setAttribute('data-mode', mode); $$('[data-sr]', root).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); paint(); }); });
    paint(); setInterval(function () { if (mode === 'a') { var it = list.children[3]; if (it) { var t = it.querySelector('i'); if (t) t.textContent = 'past · 過去 — ' + ago((Date.now() - opened) / 1000); } } }, 1000);
    root.__lab = { state: function () { return { mode: mode, items: list.children.length, third: list.children[3] && list.children[3].textContent }; } };
  });

  /* ---- A14：瑪麗的房間＋心靈的階梯 ---- */
  $$('[data-ph-minds]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-md-data]', root).textContent); } catch (e) { return; }
    var room = $('[data-md-room]', root), door = $('[data-md-door]', root), after = $('[data-md-after]', root), count = $('[data-md-count]', root);
    var facts = $$('[data-md-fact]', root), mopts = $$('[data-md-opt]', root), mv = $$('[data-md-v]', root);
    var ranges = $$('[data-md-range]', root), go = $('[data-md-go]', root), left = $('[data-md-left]', root), out = $('[data-md-out]', root), voices = $('[data-md-voices]', root);
    var touched = {}, picked = null;
    function paintFacts() {
      var n = facts.filter(function (f) { return f.classList.contains('is-read'); }).length;
      door.disabled = n < facts.length;
      count.textContent = n < facts.length ? 'Read all four files first · 先讀完四份檔案（' + n + '／' + facts.length + '）' : '';
    }
    facts.forEach(function (f) { f.addEventListener('click', function () { f.classList.add('is-read'); paintFacts(); }); });
    function open() { room.setAttribute('data-open', '1'); after.hidden = false; door.hidden = true; count.textContent = ''; }
    door.addEventListener('click', open);
    function pick(k) {
      picked = k;
      mopts.forEach(function (b) { var on = b.getAttribute('data-md-opt') === k; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('is-right', on); });
      mv.forEach(function (c) { c.hidden = c.getAttribute('data-md-v') !== k; });
    }
    mopts.forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-md-opt')); }); });

    function val(k) { return +$('[data-md-range="' + k + '"]', root).value; }
    function paintLeft() {
      var n = ranges.length - Object.keys(touched).length;
      go.disabled = n > 0;
      left.textContent = n > 0 ? n + ' still to set · 還有 ' + n + ' 條沒拉' : '';
    }
    ranges.forEach(function (r) {
      var k = r.getAttribute('data-md-range'), o = $('[data-md-val="' + k + '"]', root);
      function touch() { touched[k] = 1; o.textContent = r.value; r.classList.add('is-set'); paintLeft(); }
      r.addEventListener('input', touch); r.addEventListener('change', touch);
      r.addEventListener('pointerdown', touch); r.addEventListener('keydown', function () { setTimeout(touch, 0); });
    });
    function lc(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
    function card(label, o) {
      var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('small', 'ph-tp-k', label)); c.appendChild(el('p', '', o.en));
      var z = el('p', 'ph-zh', o.zh); z.lang = 'zh-Hant'; c.appendChild(z); addTr(z); return c;
    }
    function read() {
      out.textContent = '';
      var R = D.reads, it = D.items, v = it.map(function (x) { return val(x.k); });
      out.appendChild(card('Your closest friend · 你最好的朋友', v[0] >= 98 ? R.friend_sure : R.friend_unsure));
      var best = 0, at = -1;
      for (var i = 0; i < v.length - 1; i++) { var d = v[i] - v[i + 1]; if (d > best) { best = d; at = i; } }
      if (best < 12) out.appendChild(card('Your steepest drop · 你掉得最陡的地方', R.flat));
      else out.appendChild(card('Your steepest drop · 你掉得最陡的地方', {
        en: R.drop.en.replace('{a}', lc(it[at].en)).replace('{b}', lc(it[at + 1].en)),
        zh: R.drop.zh.replace('{a}', '「' + it[at].zh + '」').replace('{b}', '「' + it[at + 1].zh + '」') }));
      var diff = val('ai') - val('octopus');
      out.appendChild(card('The octopus and the machine · 章魚與機器', diff > 10 ? R.ai_over : diff < -10 ? R.ai_under : R.ai_same));
      voices.hidden = false;
      return { at: at, best: best, diff: diff };
    }
    go.addEventListener('click', read);
    function reset() {
      facts.forEach(function (f) { f.classList.remove('is-read'); });
      room.setAttribute('data-open', '0'); after.hidden = true; door.hidden = false; pick(null);
      touched = {}; ranges.forEach(function (r) { r.value = 50; r.classList.remove('is-set'); $('[data-md-val="' + r.getAttribute('data-md-range') + '"]', root).textContent = '?'; });
      out.textContent = ''; voices.hidden = true; paintFacts(); paintLeft();
    }
    $('[data-md-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = {
      state: function () { return { open: room.getAttribute('data-open'), picked: picked, touched: Object.keys(touched).length, cards: out.children.length, voices: !voices.hidden }; },
      readAll: function () { facts.forEach(function (f) { f.click(); }); },
      set: function (o) { Object.keys(o).forEach(function (k) { var r = $('[data-md-range="' + k + '"]', root); r.value = o[k]; r.dispatchEvent(new Event('input')); }); },
      read: read
    };
    if (/[#&]minds=open/.test(location.hash)) { root.__lab.readAll(); open(); pick('concept'); root.__lab.set({ friend: 100, stranger: 96, newborn: 88, dog: 84, bat: 70, octopus: 55, bee: 20, ai: 12, thermostat: 0 }); read(); }
  });

  /* ---- A15：坐進房間（瑟爾的中文房間，改用喬治亞文） ---- */
  $$('[data-ph-room]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-rm-data]', root).textContent); } catch (e) { return; }
    var slip = $('[data-rm-in]', root), msg = $('[data-rm-msg]', root), dots = $('[data-rm-dots]', root), count = $('[data-rm-count]', root);
    var desk = $('[data-rm-desk]', root), end = $('[data-rm-end]', root), cards = $$('[data-rm-card]', root), replies = $('[data-rm-replies]', root);
    var i, tries, ans;
    function paint() {
      var n = D.rounds.length;
      dots.textContent = ''; D.rounds.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = i < n ? 'Slip ' + (i + 1) + ' of ' + n + ' · 第 ' + (i + 1) + '／' + n + ' 張紙條' : '';
    }
    function show() {
      msg.textContent = ''; slip.textContent = '';
      var k = el('span', 'ph-ka', D.rules[D.rounds[i]].i); k.lang = 'ka'; slip.appendChild(k);
      slip.classList.remove('is-in'); void slip.offsetWidth; slip.classList.add('is-in');
      paint();
    }
    function finish() { desk.classList.add('is-done'); end.hidden = false; slip.textContent = ''; msg.textContent = ''; paint(); }
    cards.forEach(function (c) {
      c.addEventListener('click', function () {
        if (i >= D.rounds.length) return;
        if (+c.getAttribute('data-rm-card') !== D.rounds[i]) {
          tries++; msg.textContent = D.wrong.en + ' ' + D.wrong.zh; c.classList.remove('is-no'); void c.offsetWidth; c.classList.add('is-no'); return;
        }
        c.classList.add('is-out'); c.disabled = true; i++;
        if (i < D.rounds.length) setTimeout(show, reduce ? 0 : 450); else setTimeout(finish, reduce ? 0 : 450);
        paint();
      });
    });
    $$('[data-rm-opt]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var kv = b.getAttribute('data-rm-opt').split(':'), key = kv[0];
        ans[key] = kv[1];
        $$('[data-rm-opt^="' + key + ':"]', root).forEach(function (x) { var on = x === b; x.classList.toggle('is-right', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        $$('[data-rm-v^="' + key + ':"]', root).forEach(function (v) { v.hidden = v.getAttribute('data-rm-v') !== key + ':' + kv[1]; });
        if (key === 'q1') $('[data-rm-ask="q2"]', root).hidden = false;
        if (key === 'q2') replies.hidden = false;
      });
    });
    $$('[data-rm-more]', root).forEach(function (b) {
      b.addEventListener('click', function () { var s = b.nextElementSibling; s.hidden = !s.hidden; b.setAttribute('aria-expanded', s.hidden ? 'false' : 'true'); });
    });
    function reset() {
      i = 0; tries = 0; ans = {};
      cards.forEach(function (c) { c.classList.remove('is-out', 'is-no'); c.disabled = false; });
      desk.classList.remove('is-done'); end.hidden = true; replies.hidden = true; $('[data-rm-ask="q2"]', root).hidden = true;
      $$('[data-rm-v]', root).forEach(function (v) { v.hidden = true; });
      $$('[data-rm-opt]', root).forEach(function (x) { x.classList.remove('is-right'); x.setAttribute('aria-pressed', 'false'); });
      $$('[data-rm-more]', root).forEach(function (b) { b.nextElementSibling.hidden = true; b.setAttribute('aria-expanded', 'false'); });
      show();
    }
    $('[data-rm-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = {
      state: function () { return { i: i, tries: tries, ans: ans, done: !end.hidden, q2: !$('[data-rm-ask="q2"]', root).hidden, replies: !replies.hidden }; },
      play: function () { i = D.rounds.length; cards.forEach(function (c) { if (D.rounds.indexOf(+c.getAttribute('data-rm-card')) >= 0) { c.classList.add('is-out'); c.disabled = true; } }); finish(); }
    };
    if (/[#&]room=done/.test(location.hash)) { root.__lab.play(); $('[data-rm-opt="q1:no"]', root).click(); $('[data-rm-opt="q2:yes"]', root).click(); $('[data-rm-more]', root).click(); }
  });

  /* ---- A16：把車拆開＋休謨的內觀 ---- */
  $$('[data-ph-selfhunt]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-sh-data]', root).textContent); } catch (e) { return; }
    var parts = $$('[data-sh-part]', root), msg = $('[data-sh-msg]', root), end = $('[data-sh-end]', root), hint = $('[data-sh-hint]', root);
    var clock = $('[data-sh-clock]', root), secs = $('[data-sh-secs]', root), ring = $('[data-sh-ring]', root), list = $('[data-sh-list]', root), out = $('[data-sh-out]', root);
    var start = $('[data-sh-start]', root), skip = $('[data-sh-skip]', root), items = $$('[data-sh-item]', root);
    var off, timer = null, picked = null, C = 2 * Math.PI * 52;
    function name(k) { for (var i = 0; i < D.parts.length; i++) if (D.parts[i].k === k) return D.parts[i].n; }
    function take(g) {
      var k = g.getAttribute('data-sh-part'); if (off[k]) return; off[k] = 1;
      g.classList.add('is-off'); g.setAttribute('aria-disabled', 'true'); g.tabIndex = -1;
      $('[data-sh-chip="' + k + '"]', root).classList.add('is-on');
      var n = name(k); hint.hidden = true;
      msg.textContent = D.tpl.en.split('{p}').join(n.en) + ' ' + D.tpl.zh.split('{p}').join(n.zh);
      if (Object.keys(off).length === parts.length) { end.hidden = false; }
    }
    parts.forEach(function (g) {
      g.addEventListener('click', function () { take(g); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); take(g); } });
    });
    $$('[data-sh-opt]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        picked = b.getAttribute('data-sh-opt');
        $$('[data-sh-opt]', root).forEach(function (x) { var on = x === b; x.classList.toggle('is-right', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        $$('[data-sh-v]', root).forEach(function (v) { v.hidden = v.getAttribute('data-sh-v') !== picked; });
        root.classList.toggle('is-whole', picked === 'name');
      });
    });
    function showList() { if (timer) { clearInterval(timer); timer = null; } clock.hidden = true; list.hidden = false; start.hidden = true; skip.hidden = true; }
    start.addEventListener('click', function () {
      var t = 30; clock.hidden = false; start.disabled = true; secs.textContent = t;
      ring.style.strokeDasharray = C; ring.style.strokeDashoffset = 0;
      timer = setInterval(function () { t--; secs.textContent = t; ring.style.strokeDashoffset = C * (1 - t / 30); if (t <= 0) showList(); }, 1000);
    });
    skip.addEventListener('click', showList);
    items.forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }); });
    function card(label, o) {
      var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('small', 'ph-tp-k', label)); c.appendChild(el('p', '', o.en));
      var z = el('p', 'ph-zh', o.zh); z.lang = 'zh-Hant'; c.appendChild(z); addTr(z); return c;
    }
    function read() {
      out.textContent = '';
      var on = {}; items.forEach(function (b) { if (b.getAttribute('aria-pressed') === 'true') on[b.getAttribute('data-sh-item')] = 1; });
      var n = Object.keys(on).length, R = D.reads;
      out.appendChild(card('Your list · 你的清單', { en: R.count.en.replace('{n}', n), zh: R.count.zh.replace('{n}', n) }));
      if (on.self) out.appendChild(card('A self apart · 一個在外的「我」', R.self));
      if (on.watcher) out.appendChild(card('The watcher · 那個觀看者', R.watcher));
      if (!on.self && !on.watcher) out.appendChild(card('Hume’s result · 休謨的結果', R.plain));
      return on;
    }
    $('[data-sh-go]', root).addEventListener('click', read);
    function reset() {
      off = {}; picked = null; if (timer) { clearInterval(timer); timer = null; }
      parts.forEach(function (g) { g.classList.remove('is-off'); g.removeAttribute('aria-disabled'); g.tabIndex = 0; });
      $$('[data-sh-chip]', root).forEach(function (c) { c.classList.remove('is-on'); });
      $$('[data-sh-opt]', root).forEach(function (x) { x.classList.remove('is-right'); x.setAttribute('aria-pressed', 'false'); });
      $$('[data-sh-v]', root).forEach(function (v) { v.hidden = true; });
      root.classList.remove('is-whole'); msg.textContent = ''; hint.hidden = false; end.hidden = true;
      clock.hidden = true; list.hidden = true; start.hidden = false; start.disabled = false; skip.hidden = false; out.textContent = '';
      items.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    }
    $('[data-sh-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { off: Object.keys(off).length, end: !end.hidden, picked: picked, whole: root.classList.contains('is-whole'), list: !list.hidden, cards: out.children.length }; }, read: read };
    var m = /[#&]self=(\w+)/.exec(location.hash);
    if (m) { parts.forEach(take); if (m[1] !== 'apart') $('[data-sh-opt="name"]', root).click(); showList(); ['sound', 'breath', 'words', 'watcher'].forEach(function (k) { $('[data-sh-item="' + k + '"]', root).click(); }); read(); }
  });

  /* ---- A17：電車難題五個版本 ---- */
  $$('[data-ph-trolley]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-tr-data]', root).textContent); } catch (e) { return; }
    var text = $('[data-tr-text]', root), opts = $('[data-tr-opts]', root), out = $('[data-tr-out]', root), next = $('[data-tr-next]', root), dots = $('[data-tr-dots]', root), count = $('[data-tr-count]', root), car = $('[data-tr-car]', root);
    var STOP = { main: [0.76, 'five'], side: [0.8, 'one'], loop: [0.52, 'lone'], right: [0.8, 'you'], stop: [0.47, 'big'] };
    var i, ans, raf = 0;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function place(pathKey, frac) {
      var p = $('[data-tr-path="' + pathKey + '"]', root), L = p.getTotalLength(), a = p.getPointAtLength(L * frac), b = p.getPointAtLength(Math.min(L, L * frac + 2));
      car.setAttribute('transform', 'translate(' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + ') rotate(' + (Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI).toFixed(1) + ')');
    }
    function clearScene() { cancelAnimationFrame(raf); $$('[data-tr-fig]', root).forEach(function (g) { g.classList.remove('is-hit', 'is-down'); }); place('main', 0.04); }
    function run(key, done) {
      if (!key) { done(); return; }
      var path = key === 'stop' ? 'main' : key, end = STOP[key][0], who = STOP[key][1], t0 = null, dur = reduce ? 1 : 1700;
      if (key === 'stop') $('[data-tr-fig="big"]', root).classList.add('is-down');
      function step(ts) {
        if (t0 === null) t0 = ts; var u = Math.min(1, (ts - t0) / dur), e = u * u * (3 - 2 * u);
        place(path, 0.04 + (end - 0.04) * e);
        if (u < 1) raf = requestAnimationFrame(step); else { $('[data-tr-fig="' + who + '"]', root).classList.add('is-hit'); done(); }
      }
      raf = requestAnimationFrame(step);
    }
    function paint() {
      var n = D.cases.length; dots.textContent = '';
      D.cases.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = i < n ? 'Case ' + (i + 1) + ' of ' + n + ' · 第 ' + (i + 1) + '／' + n + ' 個案例' : '';
    }
    function card(label, o, cls) { var c = el('div', 'ph-vl-card ' + (cls || 'is-valid')); c.appendChild(el('small', 'ph-tp-k', label)); c.appendChild(el('p', '', o.en)); zhp(c, o.zh); return c; }
    function show() {
      var c = D.cases[i]; out.textContent = ''; next.hidden = true; opts.textContent = ''; text.textContent = '';
      root.setAttribute('data-scene', c.scene); clearScene();
      var h = el('h4', '', c.title.en); var hz = el('span', '', c.title.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', c.text.en)); zhp(text, c.text.zh);
      c.opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { choose(c, o, b); }); opts.appendChild(b);
      });
      paint();
    }
    function pattern() {
      var s = ans.s === 'y', f = ans.f === 'y', l = ans.l === 'y', t = ans.t === 'y';
      if (s && f && l && t) return 'all'; if (!s && !f && !l && !t) return 'none';
      if (s && !f && !t) return l ? 'common' : 'dde'; if (s && f && !t) return 'push'; return 'mixed';
    }
    function summary() {
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'Your five answers'); h.appendChild(el('span', '', '你的五個答案')); e.appendChild(h);
      var yn = function (v) { return v === 'y' ? 'yes' : 'no'; };
      e.appendChild(el('p', '', 'Switch: ' + yn(ans.s) + ' · Footbridge: ' + yn(ans.f) + ' · Loop: ' + yn(ans.l) + ' · Surgeon: ' + yn(ans.t) + ' · Third track: ' + ({ self: 'yourself', other: 'the stranger', none: 'nothing' })[ans.m] + '.'));
      out.appendChild(e);
      out.appendChild(card('The pattern of your first four answers · 你前四個答案的樣式', D.patterns[pattern()]));
      out.appendChild(card('The third track · 第三條軌道', D.third[ans.m], 'is-sound'));
    }
    function choose(c, o, btn) {
      if (ans[c.key]) return; ans[c.key] = o.k;
      $$('button', opts).forEach(function (x) { x.disabled = true; }); btn.classList.add('is-right');
      run(o.path, function () {
        if (c.note[o.k].en !== 'Noted.') out.appendChild(card('Noted · 記下了', c.note[o.k]));
        if (i < D.cases.length - 1) next.hidden = false; else { i++; paint(); i--; summary(); }
      });
    }
    next.addEventListener('click', function () { i++; show(); });
    function reset() { i = 0; ans = {}; show(); }
    $('[data-tr-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, ans: ans, scene: root.getAttribute('data-scene'), car: car.getAttribute('transform'), pattern: pattern() }; },
      jump: function (a) { ans = a; i = D.cases.length - 1; root.setAttribute('data-scene', 'three'); clearScene(); out.textContent = ''; opts.textContent = ''; next.hidden = true; i++; paint(); i--; summary(); return pattern(); } };
    var m = /[#&]trolley=(\w+)/.exec(location.hash);
    if (m) { if (m[1] === 'end') root.__lab.jump({ s: 'y', f: 'n', l: 'y', t: 'n', m: 'other' }); else { var k = ['switch', 'bridge', 'loop', 'ward', 'three'].indexOf(m[1]); if (k > 0) { i = k; show(); } } }
  });

  /* ---- A18：三個兩難、四位顧問 ---- */
  $$('[data-ph-advisers]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-av-data]', root).textContent); } catch (e) { return; }
    var text = $('[data-av-text]', root), opts = $('[data-av-opts]', root), out = $('[data-av-out]', root), end = $('[data-av-end]', root), next = $('[data-av-next]', root), dots = $('[data-av-dots]', root), count = $('[data-av-count]', root);
    var ORDER = ['mill', 'kant', 'ari', 'kong'], i, tally, picks;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function paint() {
      var n = D.cases.length; dots.textContent = '';
      D.cases.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = i < n ? 'Case ' + (i + 1) + ' of ' + n + ' · 第 ' + (i + 1) + '／' + n + ' 個案例' : '';
    }
    function show() {
      var c = D.cases[i]; out.textContent = ''; end.textContent = ''; next.hidden = true; opts.textContent = ''; text.textContent = '';
      var h = el('h4', '', c.title.en); var hz = el('span', '', c.title.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', c.text.en)); zhp(text, c.text.zh);
      c.opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { choose(c, o, b); }); opts.appendChild(b);
      });
      paint();
    }
    function choose(c, o, btn) {
      if (picks[i]) return; picks[i] = o.k;
      $$('button', opts).forEach(function (x) { x.disabled = true; }); btn.classList.add('is-right');
      c.adv.forEach(function (a) {
        var same = a.p === o.k; if (same) tally[a.w]++;
        var card = el('div', 'ph-vl-card ph-av-card' + (same ? ' is-with' : ''));
        var k = el('small', 'ph-tp-k', D.who[a.w].en + ' · ' + D.who[a.w].zh); card.appendChild(k);
        card.appendChild(el('em', 'ph-av-tag', same ? 'agrees with you · 跟你一致' : 'advises otherwise · 建議不同'));
        card.appendChild(el('p', '', a.t.en)); zhp(card, a.t.zh); out.appendChild(card);
      });
      if (i < D.cases.length - 1) next.hidden = false; else { i++; paint(); i--; summary(); }
    }
    function top() {
      var best = -1, who = [];
      ORDER.forEach(function (w) { if (tally[w] > best) { best = tally[w]; who = [w]; } else if (tally[w] === best) who.push(w); });
      return who.length === 1 ? who[0] : (who.length === 2 && who[0] === 'ari' && who[1] === 'kong') ? 'virtue' : 'tie';
    }
    function summary() {
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'Whose advice you followed'); h.appendChild(el('span', '', '你聽了誰的建議')); e.appendChild(h);
      var bars = el('div', 'ph-av-bars');
      ORDER.forEach(function (w) {
        var r = el('div', 'ph-av-bar'); r.appendChild(el('b', '', D.who[w].en + ' ' + D.who[w].zh));
        var t = el('span', ''); var f = el('i', ''); f.style.width = (tally[w] / D.cases.length * 100) + '%'; t.appendChild(f); r.appendChild(t);
        r.appendChild(el('em', '', tally[w] + ' / ' + D.cases.length)); bars.appendChild(r);
      });
      e.appendChild(bars); var v = D.end[top()]; e.appendChild(el('p', '', v.en)); zhp(e, v.zh); end.appendChild(e);
    }
    next.addEventListener('click', function () { i++; show(); });
    function reset() { i = 0; tally = { mill: 0, kant: 0, ari: 0, kong: 0 }; picks = {}; show(); }
    $('[data-av-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, tally: tally, picks: picks, top: top(), cards: out.children.length, ended: !!end.children.length }; },
      play: function (seq) { reset(); seq.forEach(function (k, n) { var bs = $$('button', opts); bs[k === 'a' ? 0 : 1].click(); if (n < seq.length - 1) next.click(); }); return top(); } };
    var m = /[#&]advisers=([ab]{3})/.exec(location.hash); if (m) root.__lab.play(m[1].split(''));
  });

  /* ---- A19：戴上戒指（蓋吉斯的戒指） ---- */
  $$('[data-ph-ring]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-rg-data]', root).textContent); } catch (e) { return; }
    var turn = $('[data-rg-turn]', root), turned = $('[data-rg-turned]', root), body = $('[data-rg-body]', root), text = $('[data-rg-text]', root), opts = $('[data-rg-opts]', root);
    var why = $('[data-rg-why]', root), reasons = $('[data-rg-reasons]', root), end = $('[data-rg-end]', root), next = $('[data-rg-next]', root), dots = $('[data-rg-dots]', root), count = $('[data-rg-count]', root);
    var KEYS = ['did', 'fear', 'conscience', 'self', 'others'], LABEL = { did: { en: 'Did it', zh: '做了' }, fear: { en: 'Fear of discovery', zh: '怕被發現' }, conscience: { en: 'I would know', zh: '我自己會知道' }, self: { en: 'Who I am', zh: '我是什麼人' }, others: { en: 'Someone is wronged', zh: '有人受不義' } };
    var i, tally, done;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function btn(o, fn) { var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o.en)); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); b.addEventListener('click', function () { fn(b); }); return b; }
    function paint() {
      var n = D.scenes.length; dots.textContent = '';
      D.scenes.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = root.getAttribute('data-on') === '1' && i < n ? 'Situation ' + (i + 1) + ' of ' + n + ' · 第 ' + (i + 1) + '／' + n + ' 個情境' : '';
    }
    function record(k) { tally[k]++; done = true; if (i < D.scenes.length - 1) next.hidden = false; else { i++; paint(); i--; summary(); } }
    function show() {
      var c = D.scenes[i]; done = false; text.textContent = ''; opts.textContent = ''; reasons.textContent = ''; why.hidden = true; end.textContent = ''; next.hidden = true;
      var h = el('h4', '', c.title.en); var hz = el('span', '', c.title.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', c.text.en)); zhp(text, c.text.zh);
      opts.appendChild(btn(D.do, function (b) { if (done || !why.hidden) return; lock(opts, b); record('did'); }));
      opts.appendChild(btn(D.dont, function (b) { if (done || !why.hidden) return; lock(opts, b); why.hidden = false; }));
      D.reasons.forEach(function (r) { reasons.appendChild(btn(r.t, function (b) { if (done) return; lock(reasons, b); record(r.k); })); });
      paint();
    }
    function lock(box, b) { $$('button', box).forEach(function (x) { x.disabled = true; }); b.classList.add('is-right'); }
    function verdict() {
      if (tally.did >= 3) return 'did';
      var best = 0, who = [];
      KEYS.slice(1).forEach(function (k) { if (tally[k] > best) { best = tally[k]; who = [k]; } else if (tally[k] === best && best > 0) who.push(k); });
      return (who.length === 1 && best >= 2) ? who[0] : 'mixed';
    }
    function summary() {
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'What moved you'); h.appendChild(el('span', '', '推動你的是什麼')); e.appendChild(h);
      var bars = el('div', 'ph-av-bars');
      KEYS.forEach(function (k) {
        var r = el('div', 'ph-av-bar'); r.appendChild(el('b', '', LABEL[k].en + ' ' + LABEL[k].zh));
        var t = el('span', ''); var f = el('i', ''); f.style.width = (tally[k] / D.scenes.length * 100) + '%'; t.appendChild(f); r.appendChild(t);
        r.appendChild(el('em', '', tally[k] + ' / ' + D.scenes.length)); bars.appendChild(r);
      });
      e.appendChild(bars); var v = D.ends[verdict()]; e.appendChild(el('p', '', v.en)); zhp(e, v.zh); end.appendChild(e);
    }
    turn.addEventListener('click', function () { root.setAttribute('data-on', '1'); turn.hidden = true; turned.hidden = false; body.hidden = false; show(); });
    next.addEventListener('click', function () { i++; show(); });
    function reset() { i = 0; tally = { did: 0, fear: 0, conscience: 0, self: 0, others: 0 }; done = false; root.setAttribute('data-on', '0'); turn.hidden = false; turned.hidden = true; body.hidden = true; next.hidden = true; end.textContent = ''; paint(); }
    $('[data-rg-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { on: root.getAttribute('data-on'), i: i, tally: tally, verdict: verdict(), ended: !!end.children.length }; },
      play: function (seq) { reset(); turn.click(); seq.forEach(function (k, n) { if (k === 'did') $$('button', opts)[0].click(); else { $$('button', opts)[1].click(); $$('button', reasons)[['fear', 'conscience', 'self', 'others'].indexOf(k)].click(); } if (n < seq.length - 1) next.click(); }); return verdict(); } };
    var m = /[#&]ring=([a-z,]+)/.exec(location.hash); if (m) root.__lab.play(m[1].split(','));
  });

  /* ---- A20：六份證據（性善↔性惡的滑桿軌跡） ---- */
  $$('[data-ph-evidence]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ev-data]', root).textContent); } catch (e) { return; }
    var text = $('[data-ev-text]', root), reads = $('[data-ev-reads]', root), slide = $('[data-ev-slide]', root), range = $('[data-ev-range]', root), val = $('[data-ev-val]', root), rec = $('[data-ev-rec]', root), end = $('[data-ev-end]', root), dots = $('[data-ev-dots]', root), count = $('[data-ev-count]', root);
    var NS = 'http://www.w3.org/2000/svg', i, path;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function paint() {
      var n = D.cards.length; dots.textContent = '';
      for (var k = 0; k <= n; k++) dots.appendChild(el('i', k < i + 1 ? 'ok' : k === i + 1 ? 'cur' : ''));
      count.textContent = i < 0 ? 'Your starting point · 你的起點' : i < n ? 'Evidence ' + (i + 1) + ' of ' + n + ' · 第 ' + (i + 1) + '／' + n + ' 份證據' : '';
    }
    function side(label, o, cls) { var c = el('div', 'ph-vl-card ph-ev-side ' + cls); c.appendChild(el('small', 'ph-tp-k', label)); c.appendChild(el('p', '', o.en)); zhp(c, o.zh); return c; }
    function show() {
      text.textContent = ''; reads.textContent = '';
      if (i < 0) { var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.start.en)); var qz = el('span', '', D.start.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q); }
      else {
        var c = D.cards[i]; var h = el('h4', '', (i + 1) + ' · ' + c.t.en); var hz = el('span', '', c.t.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
        text.appendChild(el('p', '', c.x.en)); zhp(text, c.x.zh);
        reads.appendChild(side('Read toward “good” · 往性善讀', c.g, 'is-g')); reads.appendChild(side('Read toward “bad” · 往性惡讀', c.b, 'is-b'));
      }
      paint();
    }
    function chart() {
      var W = 560, H = 190, L = 34, R = 14, T = 14, Bm = 34, n = path.length, svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('class', 'ph-ev-chart'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Your position after each piece of evidence · 每一份證據之後你的立場');
      function X(k) { return L + (W - L - R) * k / (n - 1); } function Y(v) { return T + (H - T - Bm) * (1 - v / 100); }
      function add(tag, at, cls, txt) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (a) { e.setAttribute(a, at[a]); }); if (cls) e.setAttribute('class', cls); if (txt != null) e.textContent = txt; svg.appendChild(e); return e; }
      [0, 50, 100].forEach(function (v) { add('line', { x1: L, x2: W - R, y1: Y(v), y2: Y(v) }, v === 50 ? 'mid' : 'grid'); add('text', { x: L - 6, y: Y(v) + 4, 'text-anchor': 'end' }, 'ax', v); });
      add('polyline', { points: path.map(function (v, k) { return X(k).toFixed(1) + ',' + Y(v).toFixed(1); }).join(' ') }, 'line');
      path.forEach(function (v, k) { add('circle', { cx: X(k), cy: Y(v), r: 5.5 }, 'pt'); add('text', { x: X(k), y: H - 12, 'text-anchor': 'middle' }, 'ax', k === 0 ? 'start' : k); });
      return svg;
    }
    function result() {
      var best = 0, at = -1;
      for (var k = 1; k < path.length; k++) { var d = Math.abs(path[k] - path[k - 1]); if (d > best) { best = d; at = k; } }
      var last = path[path.length - 1], zone = last >= 62 ? 'good' : last <= 38 ? 'bad' : 'mid';
      return { best: best, at: at, zone: zone, dir: at > 0 ? (path[at] > path[at - 1] ? 'hi' : 'lo') : null };
    }
    function summary() {
      slide.hidden = true; text.textContent = ''; reads.textContent = '';
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'The path you took'); h.appendChild(el('span', '', '你走過的路徑')); e.appendChild(h);
      e.appendChild(chart());
      var r = result(), m;
      if (r.best < 6) m = D.ends.still;
      else { var c = D.cards[r.at - 1]; m = { en: D.ends.moved.en.replace('{t}', c.t.en).replace('{n}', r.best).replace('{d}', '“' + D[r.dir].en + '”'), zh: D.ends.moved.zh.replace('{t}', c.t.zh).replace('{n}', r.best).replace('{d}', '「' + D[r.dir].zh + '」') }; }
      e.appendChild(el('p', '', m.en)); zhp(e, m.zh);
      var z = D.ends[r.zone]; e.appendChild(el('p', 'ph-ev-zone', z.en)); zhp(e, z.zh); end.appendChild(e);
    }
    range.addEventListener('input', function () { val.textContent = range.value; });
    rec.addEventListener('click', function () { path.push(+range.value); i++; if (i < D.cards.length) show(); else { paint(); summary(); } });
    function reset() { i = -1; path = []; range.value = 50; val.textContent = '50'; slide.hidden = false; end.textContent = ''; show(); }
    $('[data-ev-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, path: path.slice(), ended: !!end.children.length, res: path.length > 1 ? result() : null }; },
      play: function (vals) { reset(); vals.forEach(function (v) { range.value = v; range.dispatchEvent(new Event('input')); rec.click(); }); return result(); } };
    var m = /[#&]evidence=([\d,]+)/.exec(location.hash); if (m) root.__lab.play(m[1].split(',').map(Number));
  });

  /* ---- A21：體驗機 ---- */
  $$('[data-ph-machine]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-mc-data]', root).textContent); } catch (e) { return; }
    var pick = $('[data-mc-pick]', root), items = $$('[data-mc-item]', root), ready = $('[data-mc-ready]', root), nEl = $('[data-mc-n]', root), ask = $('[data-mc-ask]', root), text = $('[data-mc-text]', root), opts = $('[data-mc-opts]', root), end = $('[data-mc-end]', root), dots = $('[data-mc-dots]', root), count = $('[data-mc-count]', root);
    var MAX = 5, i, ans, chosen;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function sel() { return items.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).map(function (b) { return +b.getAttribute('data-mc-item'); }); }
    function paintPick() { var n = sel().length; ready.disabled = n < 1; nEl.textContent = n + ' / ' + MAX; items.forEach(function (b) { b.disabled = n >= MAX && b.getAttribute('aria-pressed') !== 'true'; }); }
    items.forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); paintPick(); }); });
    function paint() {
      var n = D.qs.length; dots.textContent = '';
      D.qs.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = i >= 0 && i < n ? 'Question ' + (i + 1) + ' of ' + n + ' · 第 ' + (i + 1) + '／' + n + ' 題' : '';
    }
    function show() {
      var q = D.qs[i]; text.textContent = ''; opts.textContent = '';
      root.setAttribute('data-in', q.key === 'wake' ? '1' : '0');
      var h = el('h4', '', q.title.en); var hz = el('span', '', q.title.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', q.text.en)); zhp(text, q.text.zh);
      q.opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { ans[q.key] = o.k; i++; if (i < D.qs.length) show(); else finish(); }); opts.appendChild(b);
      });
      paint();
    }
    function verdict() {
      if (ans.life === 'y' && ans.wake === 'n' && ans.child === 'y') return 'hed';
      if (ans.life === 'n' && ans.wake === 'y') return 'real';
      if (ans.life === 'n' && ans.wake === 'n') return 'quo';
      return 'mixed';
    }
    function para(e, o, cls) { e.appendChild(el('p', cls || '', o.en)); zhp(e, o.zh); }
    function finish() {
      ask.hidden = true; paint(); root.setAttribute('data-in', ans.life === 'y' ? '1' : '0');
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'What your answers show'); h.appendChild(el('span', '', '你的答案顯示了什麼')); e.appendChild(h);
      var yn = function (v, a, b) { return v === 'y' ? a : b; };
      e.appendChild(el('p', 'ph-mc-sum', 'For life: ' + yn(ans.life, 'plug in', 'stay out') + ' · Two years: ' + yn(ans.trial, 'yes', 'no') + ' · Told you are inside: ' + yn(ans.wake, 'wake', 'stay') + ' · Your child: ' + yn(ans.child, 'plug in', 'do not') + '.'));
      para(e, D.ends[verdict()]);
      if (ans.life === 'y' && ans.child === 'n') para(e, D.ends.child_gap, 'ph-ev-zone');
      if (chosen.indexOf(9) >= 0) para(e, D.ends.peace, 'ph-ev-zone');
      end.appendChild(e);
    }
    ready.addEventListener('click', function () { chosen = sel(); pick.hidden = true; ask.hidden = false; i = 0; show(); });
    function reset() { i = -1; ans = {}; chosen = []; items.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); b.disabled = false; }); pick.hidden = false; ask.hidden = true; end.textContent = ''; root.setAttribute('data-in', '0'); paintPick(); paint(); }
    $('[data-mc-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, ans: ans, chosen: chosen, picked: sel().length, verdict: i >= D.qs.length ? verdict() : null, ended: !!end.children.length, tank: root.getAttribute('data-in') }; },
      play: function (picks, seq) { reset(); picks.forEach(function (k) { items[k].click(); }); ready.click(); seq.split('').forEach(function (c) { $$('button', opts)[c === 'y' ? 0 : 1].click(); }); return verdict(); } };
    var m = /[#&]machine=([yn]{4})/.exec(location.hash); if (m) root.__lab.play([0, 4, 9], m[1]);
  });

  /* ---- A22：十二件事、三個籃子（控制的分類） ---- */
  $$('[data-ph-sort]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-so-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-so-play]', root), card = $('[data-so-card]', root), end = $('[data-so-end]', root), dots = $('[data-so-dots]', root), count = $('[data-so-count]', root);
    var NAME = {}; D.bins.forEach(function (b) { NAME[b.k] = b.t; });
    var i, picks;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function paint() {
      var n = D.cards.length; dots.textContent = '';
      D.cards.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = i < n ? (i + 1) + ' / ' + n : '';
      D.bins.forEach(function (b) { $('[data-so-n="' + b.k + '"]', root).textContent = picks.filter(function (p) { return p === b.k; }).length; });
    }
    function show() {
      var c = D.cards[i]; card.textContent = '';
      card.appendChild(el('b', '', c.t.en)); var z = el('span', '', c.t.zh); z.lang = 'zh-Hant'; card.appendChild(z);
      card.classList.remove('is-in'); void card.offsetWidth; card.classList.add('is-in'); paint();
    }
    function verdict() {
      var part = 0, wide = 0, narrow = 0;
      D.cards.forEach(function (c, k) { var p = picks[k]; if (p === 'part') part++; if (p === 'up' && c.e === 'not') wide++; if (p !== 'up' && c.e === 'up') narrow++; });
      return wide >= 2 ? 'wide' : narrow >= 2 ? 'narrow' : part <= 1 ? 'strict' : 'three';
    }
    function cell(k, same) { var td = el('td', 'is-' + k + (same ? ' same' : '')); td.appendChild(el('b', '', NAME[k].en)); var z = el('span', '', NAME[k].zh); z.lang = 'zh-Hant'; td.appendChild(z); return td; }
    function finish() {
      play.hidden = true; paint();
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'Three ways of sorting'); h.appendChild(el('span', '', '三種分法')); e.appendChild(h);
      var wrap = el('div', 'ph-so-wrap'), tb = el('table', 'ph-so-table'), hd = el('tr', '');
      hd.appendChild(el('th', '', ''));
      ['you', 'e', 'i'].forEach(function (w) { var th = el('th', ''); th.appendChild(el('b', '', D.who[w].en)); var z = el('span', '', D.who[w].zh); z.lang = 'zh-Hant'; th.appendChild(z); hd.appendChild(th); });
      tb.appendChild(hd);
      D.cards.forEach(function (c, k) {
        var tr = el('tr', ''); var th = el('th', ''); th.appendChild(el('b', '', c.t.en)); var z = el('span', '', c.t.zh); z.lang = 'zh-Hant'; th.appendChild(z); tr.appendChild(th);
        tr.appendChild(cell(picks[k], false)); tr.appendChild(cell(c.e, picks[k] === c.e)); tr.appendChild(cell(c.i, picks[k] === c.i)); tb.appendChild(tr);
      });
      wrap.appendChild(tb); e.appendChild(wrap);
      var ae = 0, ai = 0; D.cards.forEach(function (c, k) { if (picks[k] === c.e) ae++; if (picks[k] === c.i) ai++; });
      e.appendChild(el('p', 'ph-mc-sum', 'You agree with Epictetus on ' + ae + ' of ' + D.cards.length + ' and with Irvine on ' + ai + '. · 你跟愛比克泰德有 ' + ae + ' 項相同，跟厄文有 ' + ai + ' 項相同。'));
      var v = D.ends[verdict()]; e.appendChild(el('p', '', v.en)); zhp(e, v.zh); end.appendChild(e);
    }
    $$('[data-so-bin]', root).forEach(function (b) { b.addEventListener('click', function () { if (i >= D.cards.length) return; picks[i] = b.getAttribute('data-so-bin'); i++; if (i < D.cards.length) show(); else finish(); }); });
    function reset() { i = 0; picks = []; play.hidden = false; end.textContent = ''; show(); }
    $('[data-so-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, picks: picks.slice(), ended: !!end.children.length, verdict: i >= D.cards.length ? verdict() : null }; },
      play: function (seq) { reset(); seq.forEach(function (k) { $('[data-so-bin="' + k + '"]', root).click(); }); return verdict(); },
      keys: function (w) { return D.cards.map(function (c) { return c[w]; }); } };
    var m = /[#&]sort=(\w+)/.exec(location.hash); if (m) root.__lab.play(root.__lab.keys(m[1] === 'e' ? 'e' : 'i'));
  });

  /* ---- A23：三位朋友（亞里斯多德的三種友誼＋益者三友） ---- */
  $$('[data-ph-friends]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-fr-data]', root).textContent); } catch (e) { return; }
    var ask = $('[data-fr-ask]', root), text = $('[data-fr-text]', root), opts = $('[data-fr-opts]', root), out = $('[data-fr-out]', root), act = $('[data-fr-act]', root), again = $('[data-fr-again]', root), done = $('[data-fr-done]', root), end = $('[data-fr-end]', root), dots = $('[data-fr-dots]', root), count = $('[data-fr-count]', root);
    var f, q, cur, all;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); }
    function kind(a) { return !a.use ? 'use' : !a.fun ? 'fun' : (a.zhi && a.liang && a.glad) ? 'whole' : 'way'; }
    function paint() {
      dots.textContent = ''; D.qs.forEach(function (_, k) { dots.appendChild(el('i', k < q ? 'ok' : k === q ? 'cur' : '')); });
      count.textContent = D.names[f].en + ' · ' + D.names[f].zh + (q < D.qs.length ? '　' + (q + 1) + ' / ' + D.qs.length : '');
    }
    function badges(a) { var w = el('div', 'ph-fr-marks'); ['zhi', 'liang', 'wen'].forEach(function (k) { var s = el('span', a[k] ? 'on' : '', D.marks[k].en); w.appendChild(s); }); return w; }
    function show() {
      var Q = D.qs[q]; text.textContent = ''; opts.textContent = '';
      var h = el('h4', '', D.names[f].en); var hz = el('span', '', D.names[f].zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', Q.t.en)); zhp(text, Q.t.zh);
      [[true, D.yes], [false, D.no]].forEach(function (p) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', p[1].en)); var z = el('span', '', p[1].zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { cur[Q.k] = p[0]; q++; if (q < D.qs.length) show(); else result(); }); opts.appendChild(b);
      });
      paint();
    }
    function result() {
      ask.hidden = true; paint(); all.push(cur);
      var k = kind(cur), K = D.kinds[k], c = el('div', 'ph-vl-card is-valid');
      c.appendChild(el('small', 'ph-tp-k', D.names[f].en + ' · ' + D.names[f].zh));
      var h = el('h5', 'ph-fr-kind', K.n.en); var hz = el('span', '', K.n.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); c.appendChild(h);
      c.appendChild(badges(cur)); c.appendChild(el('p', '', K.t.en)); zhp(c, K.t.zh); out.textContent = ''; out.appendChild(c);
      act.hidden = false; again.hidden = f >= D.names.length - 1; lab2(again, D.again); lab2(done, D.done); done.hidden = all.length < 2;
    }
    function compare() {
      act.hidden = true; out.textContent = '';
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'Your friends, side by side'); h.appendChild(el('span', '', '把你的朋友並排來看')); e.appendChild(h);
      all.forEach(function (a, n) {
        var r = el('div', 'ph-fr-row'); r.appendChild(el('b', '', D.names[n].en + ' ' + D.names[n].zh));
        var K = D.kinds[kind(a)].n; var s = el('span', 'ph-fr-k is-' + kind(a), K.en + ' · ' + K.zh); r.appendChild(s); r.appendChild(badges(a)); e.appendChild(r);
      });
      e.appendChild(el('p', '', D.end.en)); zhp(e, D.end.zh); end.appendChild(e);
    }
    function start(n) { f = n; q = 0; cur = {}; ask.hidden = false; act.hidden = true; out.textContent = ''; show(); }
    again.addEventListener('click', function () { start(f + 1); });
    done.addEventListener('click', compare);
    function reset() { all = []; end.textContent = ''; start(0); }
    $('[data-fr-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { f: f, q: q, n: all.length, kinds: all.map(kind), ended: !!end.children.length }; },
      play: function (list) { reset(); list.forEach(function (seq, n) { if (n) again.click(); seq.split('').forEach(function (c) { $$('button', opts)[c === 'y' ? 0 : 1].click(); }); }); if (all.length > 1) done.click(); return all.map(kind); } };
    var m = /[#&]friends=([yn,]+)/.exec(location.hash); if (m) root.__lab.play(m[1].split(','));
  });

  /* ---- A24：六個池塘（在哪一步停下來） ---- */
  $$('[data-ph-pond]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-pd-data]', root).textContent); } catch (e) { return; }
    var ask = $('[data-pd-ask]', root), text = $('[data-pd-text]', root), opts = $('[data-pd-opts]', root), out = $('[data-pd-out]', root), voices = $('[data-pd-voices]', root), chips = $$('[data-pd-chip]', root);
    var i, stop;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function paint() { chips.forEach(function (c, k) { c.className = 'ph-pd-chip' + (stop !== null && k === stop ? ' is-stop' : k < i ? ' is-yes' : k === i && stop === null ? ' is-cur' : ''); }); }
    function show() {
      var st = D.steps[i]; text.textContent = ''; opts.textContent = '';
      var h = el('h4', '', 'Pond ' + (i + 1)); var hz = el('span', '', '第 ' + (i + 1) + ' 個池塘'); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', st.t.en)); zhp(text, st.t.zh);
      [[true, D.yes], [false, D.no]].forEach(function (p) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', p[1].en)); var z = el('span', '', p[1].zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { if (p[0]) { i++; if (i < D.steps.length) show(); else finish('all'); } else { stop = i; finish(D.steps[i].k); } }); opts.appendChild(b);
      });
      paint();
    }
    function finish(key) {
      ask.hidden = true; paint();
      var c = el('div', 'ph-vl-card is-valid'), v = D.ends[key];
      c.appendChild(el('small', 'ph-tp-k', key === 'all' ? 'You went all the way · 你走到了底' : 'What stopped you: ' + D.steps[stop].f.en + ' · 讓你停下來的：' + D.steps[stop].f.zh));
      c.appendChild(el('p', '', v.en)); zhp(c, v.zh); out.appendChild(c); voices.hidden = false;
    }
    function reset() { i = 0; stop = null; ask.hidden = false; out.textContent = ''; voices.hidden = true; show(); }
    $('[data-pd-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, stop: stop, ended: !!out.children.length, voices: !voices.hidden }; },
      play: function (n) { reset(); for (var k = 0; k < n; k++) $$('button', opts)[0].click(); if (n < D.steps.length) $$('button', opts)[1].click(); return stop === null ? 'all' : D.steps[stop].k; } };
    var m = /[#&]pond=(\d)/.exec(location.hash); if (m) root.__lab.play(+m[1]);
  });

  /* ---- A25：公共的鍋（公共財遊戲，前五輪無規則、後五輪可罰款） ---- */
  $$('[data-ph-commons]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-cm-data]', root).textContent); } catch (e) { return; }
    var chartEl = $('[data-cm-chart]', root), table = $('[data-cm-table]', root), play = $('[data-cm-play]', root), text = $('[data-cm-text]', root), inp = $('[data-cm-in]', root), range = $('[data-cm-range]', root), val = $('[data-cm-val]', root), put = $('[data-cm-put]', root), after = $('[data-cm-after]', root), next = $('[data-cm-next]', root), note = $('[data-cm-note]', root), end = $('[data-cm-end]', root), dots = $('[data-cm-dots]', root), count = $('[data-cm-count]', root);
    var NS = 'http://www.w3.org/2000/svg', N = 10, MULT = 1.6, r, hist, total, cur, myFines, lastFined;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o, arrow) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); if (arrow) b.appendChild(document.createTextNode(' →')); }
    function mean(a) { return a.reduce(function (x, y) { return x + y; }, 0) / a.length; }
    function clamp(v) { return Math.max(0, Math.min(10, Math.round(v))); }
    function bots(me) {
      if (!hist.length) return [8, 6, 2];
      var p = hist[hist.length - 1].c, out = [], fines = r >= 5;
      for (var b = 1; b <= 3; b++) {
        var others = mean(p.filter(function (_, k) { return k !== b; })), grp = mean(p), v;
        if (fines && lastFined[b]) v = Math.max(p[b], Math.round(grp) + 1);
        else if (b === 1) v = fines ? Math.max(6, p[1], others + 1) : 0.5 * p[1] + 0.5 * others;
        else if (b === 2) v = fines ? Math.max(5, p[2], others) + 0.5 : 0.85 * others;
        else v = fines ? Math.max(0.5 * others - 1, p[3] - 1) : 0.5 * others - 1;
        out.push(clamp(v));
      }
      return out;
    }
    function paint() {
      dots.textContent = ''; for (var k = 0; k < N; k++) dots.appendChild(el('i', k < r ? 'ok' : k === r ? 'cur' : ''));
      count.textContent = r < N ? D.phase[r < 5 ? 0 : 1].en + ' · ' + D.phase[r < 5 ? 0 : 1].zh : '';
    }
    function drawChart() {
      chartEl.textContent = ''; var W = 560, H = 120, svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      function add(tag, at, cls, txt) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (a) { e.setAttribute(a, at[a]); }); if (cls) e.setAttribute('class', cls); if (txt != null) e.textContent = txt; svg.appendChild(e); }
      add('line', { x1: 30, x2: W - 6, y1: 96, y2: 96 }, 'ax'); add('text', { x: 24, y: 100, 'text-anchor': 'end' }, 'lb', '0'); add('text', { x: 24, y: 18, 'text-anchor': 'end' }, 'lb', '10');
      add('line', { x1: 30 + 5 * 52 + 1, x2: 30 + 5 * 52 + 1, y1: 6, y2: 108 }, 'sep');
      for (var k = 0; k < N; k++) {
        var x = 36 + k * 52, a = hist[k] ? mean(hist[k].c) : 0, h = a / 10 * 82;
        add('rect', { x: x, y: 96 - h, width: 38, height: Math.max(h, hist[k] ? 1 : 0), rx: 4 }, hist[k] ? (k < 5 ? 'b1' : 'b2') : 'b0');
        if (hist[k]) add('text', { x: x + 19, y: 92 - h, 'text-anchor': 'middle' }, 'lb', a.toFixed(1));
        add('text', { x: x + 19, y: 112, 'text-anchor': 'middle' }, 'lb', k + 1);
      }
      chartEl.appendChild(svg);
    }
    function drawTable(canFine) {
      table.textContent = '';
      D.names.forEach(function (nm, k) {
        var row = el('div', 'ph-cm-p' + (k === 0 ? ' is-you' : '')); row.appendChild(el('b', '', nm.en + ' ' + nm.zh));
        row.appendChild(el('span', 'ph-cm-c', cur ? 'put in ' + cur.c[k] + ' · 投 ' + cur.c[k] : '—'));
        var f = cur && cur.f[k] ? '  −' + cur.f[k] * 3 : '';
        row.appendChild(el('span', 'ph-cm-e', cur ? 'earned ' + cur.e[k].toFixed(1) + f : ''));
        row.appendChild(el('em', '', total[k].toFixed(1)));
        if (canFine && k > 0) { var b = el('button', 'ph-cm-fine'); b.type = 'button'; lab2(b, D.fine); b.addEventListener('click', function () { fine(k); }); row.appendChild(b); }
        table.appendChild(row);
      });
    }
    function fine(k) { cur.f[k]++; cur.paid[0]++; total[0] -= 1; total[k] -= 3; myFines++; lastFined[k] = true; drawTable(true); }
    function ask() {
      text.textContent = ''; var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.ask.en)); var qz = el('span', '', D.ask.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      inp.hidden = false; after.hidden = true; lab2(put, D.put); paint(); drawTable(false);
    }
    function round(me) {
      var c = [me].concat(bots(me)), pot = c.reduce(function (x, y) { return x + y; }, 0), share = pot * MULT / 4, grp = mean(c);
      cur = { c: c, e: c.map(function (v) { return 10 - v + share; }), f: [0, 0, 0, 0], paid: [0, 0, 0, 0] };
      cur.e.forEach(function (v, k) { total[k] += v; });
      lastFined = {};
      if (r >= 5) [1, 2].forEach(function (b) { c.forEach(function (v, k) { if (k !== b && (v < grp - 1.5 || v <= c[b] - 4)) { var n = v <= c[b] - 6 ? 2 : 1; cur.f[k] += n; cur.paid[b] += n; total[b] -= n; total[k] -= 3 * n; lastFined[k] = true; } }); });
      hist.push(cur); drawChart(); drawTable(r >= 5); inp.hidden = true; after.hidden = false; lab2(next, r === N - 1 ? { en: 'See the result', zh: '看結果' } : D.next, true);
      note.textContent = r >= 5 ? D.fineNote.en + ' ' + D.fineNote.zh : '';
      text.textContent = '';
      if (r === 4) { text.appendChild(el('p', '', D.mid.en)); zhp(text, D.mid.zh); }
    }
    function finish() {
      play.hidden = true; paint(); drawTable(false);
      var a = mean(hist.slice(0, 5).map(function (h) { return mean(h.c); })), b = mean(hist.slice(5).map(function (h) { return mean(h.c); }));
      var mine = mean(hist.map(function (h) { return h.c[0]; })), theirs = mean(hist.map(function (h) { return mean(h.c.slice(1)); }));
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'What happened to the pot'); h.appendChild(el('span', '', '那口鍋發生了什麼事')); e.appendChild(h);
      function para(o, rep) { var en = o.en, zh = o.zh; if (rep && rep.n === 1) en = en.replace('{n} times', 'once'); Object.keys(rep || {}).forEach(function (k) { en = en.replace('{' + k + '}', rep[k]); zh = zh.replace('{' + k + '}', rep[k]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      para(b > a ? D.ends.pattern : D.ends.pattern_flat, { a: a.toFixed(1), b: b.toFixed(1) });
      para(mine < theirs - 1 ? D.ends.you_free : mine > theirs + 1 ? D.ends.you_gave : D.ends.you_mid);
      para(myFines ? D.ends.fined : D.ends.nofine, { n: myFines });
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.q.en)); var qz = el('span', '', D.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var box = el('div', 'ph-vl-opts ph-tp-opts'), out = el('div', 'ph-vl-out');
      D.qopts.forEach(function (o) {
        var bt = el('button', 'ph-vl-opt'); bt.type = 'button'; bt.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; bt.appendChild(z);
        bt.addEventListener('click', function () { $$('button', box).forEach(function (x) { x.classList.toggle('is-right', x === bt); }); out.textContent = ''; var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c); });
        box.appendChild(bt);
      });
      e.appendChild(box); e.appendChild(out); end.appendChild(e);
      return { a: a, b: b, mine: mine, theirs: theirs };
    }
    range.addEventListener('input', function () { val.textContent = range.value; });
    put.addEventListener('click', function () { round(+range.value); });
    next.addEventListener('click', function () { r++; if (r < N) ask(); else finish(); });
    function reset() { r = 0; hist = []; total = [0, 0, 0, 0]; cur = null; myFines = 0; lastFined = {}; play.hidden = false; end.textContent = ''; range.value = 5; val.textContent = '5'; drawChart(); drawTable(false); ask(); }
    $('[data-cm-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { r: r, hist: hist.map(function (h) { return h.c; }), total: total.map(function (t) { return +t.toFixed(1); }), fines: myFines, ended: !!end.children.length }; },
      play: function (list, finesAt) { reset(); var res; list.forEach(function (v, k) { range.value = v; put.click(); if (finesAt && finesAt.indexOf(k) >= 0) { var b = $('.ph-cm-fine', root); if (b) b.click(); } next.click(); }); return this.state(); } };
    var m = /[#&]commons=([\d,]+)/.exec(location.hash); if (m) root.__lab.play(m[1].split(',').map(Number), [6]);
  });

  /* ---- A26：在知道之前先選（無知之幕） ---- */
  $$('[data-ph-veil]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-vi-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-vi-play]', root), text = $('[data-vi-text]', root), plans = $('[data-vi-plans]', root), act = $('[data-vi-act]', root), draw = $('[data-vi-draw]', root), end = $('[data-vi-end]', root), dots = $('[data-vi-dots]', root), count = $('[data-vi-count]', root);
    var NS = 'http://www.w3.org/2000/svg', MAX = 222, step, picks, pos;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function bars(v, mark, veiled) {
      var W = 200, H = 118, svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('aria-hidden', 'true');
      v.forEach(function (x, k) {
        var h = Math.max(3, x / MAX * 88), r = document.createElementNS(NS, 'rect');
        r.setAttribute('x', 8 + k * 38); r.setAttribute('y', 104 - h); r.setAttribute('width', 30); r.setAttribute('height', h); r.setAttribute('rx', 3);
        r.setAttribute('class', k === mark ? 'me' : veiled ? 'vd' : 'b'); svg.appendChild(r);
        var t = document.createElementNS(NS, 'text'); t.setAttribute('x', 23 + k * 38); t.setAttribute('y', 100 - h); t.setAttribute('text-anchor', 'middle'); t.setAttribute('class', k === mark ? 'lb me' : 'lb'); t.textContent = x; svg.appendChild(t);
      });
      var ln = document.createElementNS(NS, 'line'); ln.setAttribute('x1', 4); ln.setAttribute('x2', W - 4); ln.setAttribute('y1', 104.5); ln.setAttribute('y2', 104.5); ln.setAttribute('class', 'ax'); svg.appendChild(ln);
      return svg;
    }
    function mean(v) { return v.reduce(function (a, b) { return a + b; }, 0) / v.length; }
    function paint() {
      dots.textContent = ''; for (var k = 0; k < 3; k++) dots.appendChild(el('i', k < step ? 'ok' : k === step ? 'cur' : ''));
      count.textContent = step < 3 ? D.steps[step].tag.en + ' · ' + D.steps[step].tag.zh.split(' · ').pop() : '';
    }
    function show() {
      paint(); text.textContent = ''; plans.textContent = ''; act.hidden = true;
      if (step >= 3) {
        var q0 = el('p', 'ph-vl-q'); q0.appendChild(el('b', '', D.steps[2].q.en.split('. ')[0] + '.')); text.appendChild(q0);
        act.hidden = false; draw.textContent = ''; draw.appendChild(document.createTextNode(D.draw.en + ' · ')); var z = el('span', '', D.draw.zh); z.lang = 'zh-Hant'; draw.appendChild(z); draw.appendChild(document.createTextNode(' →'));
        return;
      }
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.steps[step].q.en)); var qz = el('span', '', D.steps[step].q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      var mark = step === 0 ? 4 : step === 1 ? 0 : -1;
      D.plans.forEach(function (p) {
        var b = el('button', 'ph-vi-plan'); b.type = 'button'; b.setAttribute('data-k', p.k);
        b.appendChild(el('b', '', p.name.en)); var nz = el('span', 'ph-vi-zh', p.name.zh); nz.lang = 'zh-Hant'; b.appendChild(nz);
        b.appendChild(bars(p.v, mark, step === 2));
        b.appendChild(el('em', '', D.avg.en + ' ' + mean(p.v).toFixed(0) + ' · ' + D.avg.zh + ' ' + mean(p.v).toFixed(0)));
        b.appendChild(el('span', 'ph-vi-d', p.d.en)); var dz = el('span', 'ph-vi-d ph-vi-zh', p.d.zh); dz.lang = 'zh-Hant'; b.appendChild(dz);
        b.addEventListener('click', function () { picks[step] = p.k; step++; show(); });
        plans.appendChild(b);
      });
    }
    function plan(k) { return D.plans.filter(function (p) { return p.k === k; })[0]; }
    function finish(forced) {
      pos = forced != null ? forced : Math.floor(Math.random() * 5);
      play.hidden = true;
      var e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      var tb = el('div', 'ph-vi-rows'), at = [4, 0, pos];
      picks.forEach(function (k, i) {
        var p = plan(k), row = el('div', 'ph-vi-row' + (i === 2 ? ' is-veil' : ''));
        var a = el('span', 'ph-vi-when', D.rowlab[i].en); var az = el('span', '', D.rowlab[i].zh); az.lang = 'zh-Hant'; a.appendChild(az); row.appendChild(a);
        var nm = el('b', '', p.name.en + ' '); var nz = el('span', '', p.name.zh); nz.lang = 'zh-Hant'; nm.appendChild(nz); row.appendChild(nm);
        row.appendChild(bars(p.v, at[i], false));
        tb.appendChild(row);
      });
      e.appendChild(tb);
      function para(o, rep) { var en = o.en, zh = o.zh; Object.keys(rep || {}).forEach(function (k) { en = en.replace('{' + k + '}', rep[k].en != null ? rep[k].en : rep[k]); zh = zh.replace('{' + k + '}', rep[k].zh != null ? rep[k].zh : rep[k]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      var mine = plan(picks[2]);
      para(D.lift, { pos: { en: D.pos[pos].en.toLowerCase(), zh: D.pos[pos].zh }, x: mine.v[pos], m: plan('maximin').v[pos], t: plan('total').v[pos] });
      para(picks[0] === picks[1] && picks[1] === picks[2] ? D.same : D.moved);
      para(D.verdicts[picks[2]]);
      para(D.nozick);
      end.appendChild(e);
    }
    draw.addEventListener('click', function () { finish(); });
    function reset() { step = 0; picks = []; pos = null; play.hidden = false; end.textContent = ''; show(); }
    $('[data-vi-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { step: step, picks: picks.slice(), pos: pos, ended: !!end.children.length }; },
      play: function (ks, p) { reset(); ks.forEach(function (k) { var b = $('.ph-vi-plan[data-k="' + k + '"]', root); if (b) b.click(); }); if (p != null && step >= 3) finish(p); return this.state(); } };
    var m = /[#&]veil=([a-d]{1,3})([1-5])?/.exec(location.hash);
    if (m) root.__lab.play(m[1].split('').map(function (c) { return D.plans['abcd'.indexOf(c)].k; }), m[2] ? +m[2] - 1 : null);
  });

  /* ---- A27：你來立法（彌爾的傷害原則，九個案例） ---- */
  $$('[data-ph-liberty]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-lb-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-lb-play]', root), text = $('[data-lb-text]', root), btns = $('[data-lb-btns]', root), out = $('[data-lb-out]', root), act = $('[data-lb-act]', root), next = $('[data-lb-next]', root), end = $('[data-lb-end]', root), dots = $('[data-lb-dots]', root), count = $('[data-lb-count]', root);
    var N = D.cases.length, i, ans;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o, arrow) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); if (arrow) b.appendChild(document.createTextNode(' →')); }
    function paint() {
      dots.textContent = ''; for (var k = 0; k < N; k++) dots.appendChild(el('i', k < ans.length ? (ans[k] === D.cases[k].m ? 'ok' : 'no') : k === i ? 'cur' : ''));
      count.textContent = i < N ? (i + 1) + ' / ' + N : '';
    }
    function show() {
      var c = D.cases[i]; paint(); text.textContent = ''; out.textContent = ''; btns.textContent = ''; act.hidden = true;
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', c.t.en)); var qz = el('span', '', c.t.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      ['ban', 'allow'].forEach(function (k) { var b = el('button', 'ph-lb-btn is-' + k); b.type = 'button'; b.setAttribute('data-k', k); lab2(b, D[k]); b.addEventListener('click', function () { answer(k); }); btns.appendChild(b); });
    }
    function answer(k) {
      if (ans.length > i) return;
      var c = D.cases[i]; ans.push(k); paint();
      $$('button', btns).forEach(function (b) { b.disabled = true; b.classList.toggle('is-mine', b.getAttribute('data-k') === k); b.classList.toggle('is-mill', b.getAttribute('data-k') === c.m); });
      var card = el('div', 'ph-vl-card ' + (k === c.m ? 'is-valid' : 'is-invalid'));
      var tag = el('p', 'ph-lb-tag'); tag.appendChild(el('b', '', D.mill.en + ': ' + D[c.m].en)); var tz = el('span', '', D.mill.zh + '：' + D[c.m].zh); tz.lang = 'zh-Hant'; tag.appendChild(tz); card.appendChild(tag);
      card.appendChild(el('p', '', c.why.en)); zhp(card, c.why.zh); out.appendChild(card);
      act.hidden = false; lab2(next, i === N - 1 ? D.finish : D.next, true);
    }
    function finish() {
      play.hidden = true; paint();
      var n = 0, f = {}; D.cases.forEach(function (c, k) { if (ans[k] === c.m) n++; else if (ans[k] === 'ban') f[c.g] = 1; else f.lib = 1; });
      var e = el('div', 'ph-el-end'); var h = el('h4', '', 'Your principles'); h.appendChild(el('span', '', '你的原則')); e.appendChild(h);
      function para(o, rep) { var en = o.en, zh = o.zh; Object.keys(rep || {}).forEach(function (k) { en = en.replace('{' + k + '}', rep[k]); zh = zh.replace('{' + k + '}', rep[k]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      para(D.score, { n: n });
      var any = false; ['pat', 'off', 'mor', 'lib'].forEach(function (k) { if (f[k]) { any = true; para(D.flags[k]); } });
      if (!any) para(D.flags.mill);
      para(D.close); end.appendChild(e);
      return { n: n, flags: Object.keys(f) };
    }
    next.addEventListener('click', function () { i++; if (i < N) show(); else finish(); });
    function reset() { i = 0; ans = []; play.hidden = false; end.textContent = ''; show(); }
    $('[data-lb-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, ans: ans.slice(), ended: !!end.children.length }; },
      play: function (list) { reset(); list.forEach(function (k) { var b = $('.ph-lb-btn[data-k="' + k + '"]', root); if (b) { b.click(); next.click(); } }); return this.state(); } };
    var m = /[#&]liberty=([ba]+)/.exec(location.hash); if (m) root.__lab.play(m[1].split('').map(function (c) { return c === 'b' ? 'ban' : 'allow'; }));
  });

  /* ---- A28：孔多塞的陪審團（多數決什麼時候可靠） ---- */
  $$('[data-ph-jury]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-jy-data]', root).textContent); } catch (e) { return; }
    var NS = [1, 3, 11, 51, 101, 501, 1001], NSVG = 'http://www.w3.org/2000/svg';
    var ip = $('[data-jy-p]', root), inn = $('[data-jy-n]', root), ic = $('[data-jy-c]', root), op = $('[data-jy-p-out]', root), on = $('[data-jy-n-out]', root), oc = $('[data-jy-c-out]', root);
    var b1 = $('[data-jy-b1]', root), b2 = $('[data-jy-b2]', root), v1 = $('[data-jy-v1]', root), v2 = $('[data-jy-v2]', root), vote = $('[data-jy-vote]', root), res = $('[data-jy-res]', root), dots = $('[data-jy-dots]', root), finds = $('[data-jy-finds]', root), end = $('[data-jy-end]', root);
    var found;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lgam(x) { var c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.001208650973866179, -0.000005395239384953], y = x, t = x + 5.5, s = 1.000000000190015; t -= (x + 0.5) * Math.log(t); for (var j = 0; j < 6; j++) s += c[j] / ++y; return -t + Math.log(2.5066282746310005 * s / x); }
    function maj(n, q) {
      if (q <= 0) return 0; if (q >= 1) return 1;
      var s = 0, lq = Math.log(q), l1 = Math.log(1 - q);
      for (var k = (n + 1) / 2; k <= n; k++) s += Math.exp(lgam(n + 1) - lgam(k + 1) - lgam(n - k + 1) + k * lq + (n - k) * l1);
      return Math.min(1, s);
    }
    function vals() { return { p: +ip.value / 100, n: NS[+inn.value], c: +ic.value / 100 }; }
    function prob(v) { return v.p * maj(v.n, v.c + (1 - v.c) * v.p) + (1 - v.p) * maj(v.n, (1 - v.c) * v.p); }
    function pct(x) { return x > 0.999 ? '>99.9%' : x < 0.001 ? '<0.1%' : (x * 100).toFixed(1) + '%'; }
    function drawFinds() {
      finds.textContent = ''; var h = el('h4', 'ph-jy-h', D.todo.en + ' '); var hz = el('span', '', D.todo.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); finds.appendChild(h);
      D.finds.forEach(function (f) {
        var it = el('div', 'ph-jy-find' + (found[f.k] ? ' is-found' : '')); var t = el('p', 'ph-jy-t'); t.appendChild(el('b', '', (found[f.k] ? '✓ ' : '○ ') + f.t.en)); var tz = el('span', '', f.t.zh); tz.lang = 'zh-Hant'; t.appendChild(tz); it.appendChild(t);
        if (found[f.k]) { var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', f.v.en)); zhp(c, f.v.zh); it.appendChild(c); }
        finds.appendChild(it);
      });
    }
    function drawEnd() {
      end.textContent = ''; if (!(found.up && found.down && found.copy)) return;
      var e = el('div', 'ph-el-end'); var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.q.en)); var qz = el('span', '', D.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var box = el('div', 'ph-vl-opts ph-tp-opts'), out = el('div', 'ph-vl-out');
      D.qopts.forEach(function (o) {
        var bt = el('button', 'ph-vl-opt'); bt.type = 'button'; bt.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; bt.appendChild(z);
        bt.addEventListener('click', function () { $$('button', box).forEach(function (x) { x.classList.toggle('is-right', x === bt); }); out.textContent = ''; var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c); });
        box.appendChild(bt);
      });
      e.appendChild(box); e.appendChild(out); end.appendChild(e);
    }
    function update() {
      var v = vals(), P = prob(v);
      op.textContent = Math.round(v.p * 100) + '%'; on.textContent = v.n; oc.textContent = Math.round(v.c * 100) + '%';
      b1.style.width = (v.p * 100) + '%'; v1.textContent = pct(v.p); b2.style.width = (P * 100) + '%'; v2.textContent = pct(P);
      var was = Object.keys(found).length;
      if (v.p > 0.5 && v.p <= 0.6 && v.c <= 0.1 && P >= 0.95) found.up = 1;
      if (v.p < 0.5 && v.p >= 0.4 && v.c <= 0.1 && P <= 0.05) found.down = 1;
      if (v.p >= 0.6 && v.n >= 101 && v.c >= 0.6) found.copy = 1;
      if (Object.keys(found).length !== was) { drawFinds(); drawEnd(); }
      return P;
    }
    function hold(seed) {
      var v = vals(), lead = Math.random() < v.p, r = 0, svg = document.createElementNS(NSVG, 'svg'), cols = v.n <= 11 ? v.n : v.n <= 101 ? 26 : 56, sz = v.n <= 101 ? 14 : 8, gap = v.n <= 101 ? 4 : 2, rows = Math.ceil(v.n / cols);
      svg.setAttribute('viewBox', '0 0 ' + (cols * (sz + gap)) + ' ' + (rows * (sz + gap))); svg.style.maxWidth = (cols * (sz + gap)) + 'px';
      for (var k = 0; k < v.n; k++) {
        var ok = Math.random() < v.c ? lead : Math.random() < v.p; if (ok) r++;
        var c = document.createElementNS(NSVG, 'rect'); c.setAttribute('x', (k % cols) * (sz + gap)); c.setAttribute('y', Math.floor(k / cols) * (sz + gap)); c.setAttribute('width', sz); c.setAttribute('height', sz); c.setAttribute('rx', sz / 4); c.setAttribute('class', ok ? 'ok' : 'no'); svg.appendChild(c);
      }
      dots.textContent = ''; dots.appendChild(svg);
      var o = r > v.n / 2 ? D.res_ok : D.res_no; res.textContent = o.en.replace('{r}', r).replace('{w}', v.n - r) + ' ' + o.zh.replace('{r}', r).replace('{w}', v.n - r);
      return r;
    }
    [ip, inn, ic].forEach(function (i) { i.addEventListener('input', function () { update(); dots.textContent = ''; res.textContent = ''; }); });
    vote.addEventListener('click', function () { hold(); });
    vote.textContent = ''; vote.appendChild(document.createTextNode(D.vote.en + ' · ')); (function () { var z = el('span', '', D.vote.zh); z.lang = 'zh-Hant'; vote.appendChild(z); })();
    function reset() { found = {}; ip.value = 50; inn.value = 2; ic.value = 0; dots.textContent = ''; res.textContent = ''; drawFinds(); drawEnd(); update(); }
    $('[data-jy-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { var v = vals(); return { p: v.p, n: v.n, c: v.c, P: +prob(v).toFixed(4), found: Object.keys(found), ended: !!end.children.length }; },
      set: function (p, n, c) { ip.value = p; inn.value = NS.indexOf(n); ic.value = c; update(); return this.state(); }, vote: hold, maj: maj };
    var m = /[#&]jury=([\d,\-]+)/.exec(location.hash);
    if (m) { m[1].split(',').forEach(function (t) { var a = t.split('-').map(Number); root.__lab.set(a[0], a[1], a[2] || 0); }); hold(); }
  });

  /* ---- A29：你來策展（十樣東西，四個藝術的定義） ---- */
  $$('[data-ph-curator]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-cu-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-cu-play]', root), text = $('[data-cu-text]', root), btns = $('[data-cu-btns]', root), end = $('[data-cu-end]', root), dots = $('[data-cu-dots]', root), count = $('[data-cu-count]', root);
    var N = D.items.length, i, ans;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); }
    function paint() { dots.textContent = ''; for (var k = 0; k < N; k++) dots.appendChild(el('i', k < ans.length ? (ans[k] ? 'ok' : 'no') : k === i ? 'cur' : '')); count.textContent = i < N ? (i + 1) + ' / ' + N : ''; }
    function show() {
      var c = D.items[i]; paint(); text.textContent = ''; btns.textContent = '';
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', c.t.en)); var qz = el('span', '', c.t.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      [['yes', 1], ['no', 0]].forEach(function (p) { var b = el('button', 'ph-lb-btn ' + (p[1] ? 'is-allow' : 'is-ban')); b.type = 'button'; b.setAttribute('data-k', p[0]); lab2(b, D[p[0]]); b.addEventListener('click', function () { ans.push(p[1]); i++; if (i < N) show(); else finish(); }); btns.appendChild(b); });
    }
    function finish() {
      play.hidden = true; paint();
      var sc = D.theories.map(function (t, ti) { var n = 0, miss = []; D.items.forEach(function (it, k) { if (it.v[ti] === ans[k]) n++; else miss.push(k); }); return { t: t, n: n, miss: miss }; });
      var top = sc.slice().sort(function (a, b) { return b.n - a.n; })[0];
      var e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      var tb = el('div', 'ph-cu-rows');
      sc.forEach(function (x) {
        var row = el('div', 'ph-cu-row' + (x === top && top.n > 6 ? ' is-top' : '')); var nm = el('b', '', x.t.name.en + ' '); var nz = el('span', '', x.t.name.zh); nz.lang = 'zh-Hant'; nm.appendChild(nz); row.appendChild(nm);
        row.appendChild(el('span', 'ph-cu-who', x.t.who.en)); var bar = el('div', 'ph-cu-bar'); var u = el('u'); u.style.width = (x.n * 10) + '%'; bar.appendChild(u); row.appendChild(bar); row.appendChild(el('em', '', x.n + ' / 10'));
        var d = el('span', 'ph-cu-d', x.t.d.en); row.appendChild(d); var dz = el('span', 'ph-cu-d ph-cu-zh', x.t.d.zh); dz.lang = 'zh-Hant'; row.appendChild(dz);
        tb.appendChild(row);
      });
      e.appendChild(tb);
      function para(o, rep) { var en = o.en, zh = o.zh; Object.keys(rep || {}).forEach(function (k) { en = en.replace('{' + k + '}', rep[k].en != null ? rep[k].en : rep[k]); zh = zh.replace('{' + k + '}', rep[k].zh != null ? rep[k].zh : rep[k]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      if (top.n <= 6) para(D.none);
      else {
        para(D.best, { name: { en: top.t.name.en + ' (' + top.n + ' of 10)', zh: top.t.name.zh + '（10 項當中的 ' + top.n + ' 項）' } });
        if (top.miss.length) {
          var ul = el('ul', 'ph-cu-miss'); e.appendChild(el('p', 'ph-ev-zone', D.miss.en.replace(' {list}.', ''))); zhp(e, D.miss.zh.replace('{list}。', ''));
          top.miss.forEach(function (k) { var li = el('li', '', D.items[k].t.en + ' — ' + (ans[k] ? D.yes.en : D.no.en)); var z = el('span', '', D.items[k].t.zh + '——' + (ans[k] ? D.yes.zh : D.no.zh)); z.lang = 'zh-Hant'; li.appendChild(z); ul.appendChild(li); });
          e.appendChild(ul);
        } else para(D.nomiss);
        para(top.t.trouble);
      }
      para(D.close); end.appendChild(e);
    }
    function reset() { i = 0; ans = []; play.hidden = false; end.textContent = ''; show(); }
    $('[data-cu-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, ans: ans.slice(), ended: !!end.children.length }; },
      play: function (str) { reset(); str.split('').forEach(function (c) { var b = $('.ph-lb-btn[data-k="' + (c === 'y' ? 'yes' : 'no') + '"]', root); if (b && i < N) b.click(); }); return this.state(); } };
    var m = /[#&]curator=([yn]+)/.exec(location.hash); if (m) root.__lab.play(m[1]);
  });

  /* ---- A30：測測你的眼睛（細膩度、比例、誰錯了） ---- */
  $$('[data-ph-taste]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ts-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-ts-play]', root), text = $('[data-ts-text]', root), area = $('[data-ts-area]', root), end = $('[data-ts-end]', root), dots = $('[data-ts-dots]', root), count = $('[data-ts-count]', root);
    var DELTA = [10, 7, 5, 3, 2], TOTAL = 9, step, hits, rect, ans, odd;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); }
    function head(tag, q) {
      dots.textContent = ''; for (var k = 0; k < TOTAL; k++) dots.appendChild(el('i', k < step ? 'ok' : k === step ? 'cur' : ''));
      count.textContent = tag ? tag.en + ' · ' + tag.zh.split(' · ').pop() : '';
      text.textContent = ''; area.textContent = ''; area.className = 'ph-ts-area';
      if (q) { var p = el('p', 'ph-vl-q'); p.appendChild(el('b', '', q.en)); var z = el('span', '', q.zh); z.lang = 'zh-Hant'; p.appendChild(z); text.appendChild(p); }
    }
    function show() {
      if (step < 5) {
        head(D.p1.tag, D.p1.q); area.classList.add('is-sq');
        var hue = Math.floor(Math.random() * 360), L = 46 + Math.floor(Math.random() * 10), d = DELTA[step] * (Math.random() < 0.5 ? 1 : -1); odd = Math.floor(Math.random() * 4);
        for (var k = 0; k < 4; k++) (function (k) {
          var b = el('button', 'ph-ts-sq'); b.type = 'button'; b.setAttribute('aria-label', 'Square ' + (k + 1)); b.style.background = 'hsl(' + hue + ',52%,' + (L + (k === odd ? d : 0)) + '%)';
          b.addEventListener('click', function () { hits.push(k === odd ? 1 : 0); step++; show(); }); area.appendChild(b);
        })(k);
      } else if (step === 5) {
        head(D.p2.tag, D.p2.q); area.classList.add('is-rc');
        D.p2.ratios.forEach(function (o, k) {
          var w = Math.sqrt(7000 * o.r), h = 7000 / w, b = el('button', 'ph-ts-rc'); b.type = 'button'; b.setAttribute('aria-label', 'Rectangle ' + (k + 1));
          var i = el('i'); i.style.width = w.toFixed(0) + 'px'; i.style.height = h.toFixed(0) + 'px'; b.appendChild(i);
          b.addEventListener('click', function () { rect = k; step++; show(); }); area.appendChild(b);
        });
      } else if (step < 9) {
        head(D.p3.tag, D.p3.items[step - 6]); area.classList.add('is-yn');
        [['yes', 1], ['no', 0]].forEach(function (p) { var b = el('button', 'ph-ts-yn'); b.type = 'button'; b.setAttribute('data-k', p[0]); lab2(b, D[p[0]]); b.addEventListener('click', function () { ans.push(p[1]); step++; show(); }); area.appendChild(b); });
      } else finish();
    }
    function finish() {
      head(null, null); play.hidden = true;
      var n = hits.reduce(function (a, b) { return a + b; }, 0), e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      function para(o, rep) { var en = o.en, zh = o.zh; Object.keys(rep || {}).forEach(function (k) { en = en.replace('{' + k + '}', rep[k]); zh = zh.replace('{' + k + '}', rep[k]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      para(n >= 4 ? D.delic.high : D.delic.low, { n: n });
      para(rect === 3 ? D.rect.golden : D.rect.other, { r: D.p2.ratios[rect].n });
      var key = !ans[0] ? 'skeptic' : !ans[1] && !ans[2] ? 'subj' : !ans[1] && ans[2] ? 'mid' : ans[1] && ans[2] ? 'obj' : 'odd';
      para(D.pos[key]); para(D.close); end.appendChild(e);
      return key;
    }
    function reset() { step = 0; hits = []; rect = null; ans = []; play.hidden = false; end.textContent = ''; show(); }
    $('[data-ts-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { step: step, hits: hits.slice(), rect: rect, ans: ans.slice(), odd: odd, ended: !!end.children.length }; },
      play: function (sq, rc, yn) { reset(); (sq || '').split('').forEach(function (c) { var bs = $$('.ph-ts-sq', root); if (bs.length) bs[c === 'c' ? odd : (odd + 1) % 4].click(); }); if (rc != null && step === 5) $$('.ph-ts-rc', root)[rc].click(); (yn || '').split('').forEach(function (c) { var b = $('.ph-ts-yn[data-k="' + (c === 'y' ? 'yes' : 'no') + '"]', root); if (b) b.click(); }); return this.state(); } };
    var m = /[#&]taste=([cw]*)(?:,(\d))?(?:,([yn]*))?/.exec(location.hash); if (m) root.__lab.play(m[1], m[2] != null ? +m[2] : null, m[3]);
  });

  /* ---- A31：搭一齣悲劇（主角、結局、原因；為什麼會有人想看） ---- */
  $$('[data-ph-tragedy]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-tg-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-tg-play]', root), text = $('[data-tg-text]', root), opts = $('[data-tg-opts]', root), picksEl = $('[data-tg-picks]', root), end = $('[data-tg-end]', root), dots = $('[data-tg-dots]', root), count = $('[data-tg-count]', root);
    var step, picks;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function optBtn(o, sub) { var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.setAttribute('data-k', o.k); b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z); if (sub) b.appendChild(el('i', 'ph-tg-who', sub)); return b; }
    function paint() {
      dots.textContent = ''; for (var k = 0; k < 4; k++) dots.appendChild(el('i', k < step ? 'ok' : k === step ? 'cur' : ''));
      count.textContent = step < 3 ? D.steps[step].tag.en + ' · ' + D.steps[step].tag.zh.split(' · ').pop() : '';
      picksEl.textContent = '';
      picks.forEach(function (k, i) { var o = D.steps[i].opts.filter(function (x) { return x.k === k; })[0], c = el('span', 'ph-tg-chip', o.t.en + ' '); var z = el('i', '', o.t.zh); z.lang = 'zh-Hant'; c.appendChild(z); picksEl.appendChild(c); });
    }
    function show() {
      paint(); text.textContent = ''; opts.textContent = '';
      if (step >= 3) return verdict();
      var s = D.steps[step], q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', s.q.en)); var qz = el('span', '', s.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      s.opts.forEach(function (o) { var b = optBtn(o); b.addEventListener('click', function () { picks.push(o.k); step++; show(); }); opts.appendChild(b); });
    }
    function verdict() {
      play.hidden = true; end.textContent = '';
      var e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      function para(o) { e.appendChild(el('p', 'ph-ev-zone', o.en)); zhp(e, o.zh); }
      para(D.verdicts[picks[0] + '-' + picks[1]]); if (picks[1] === 'ruin') para(D.causes[picks[2]]);
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.whyq.en)); var qz = el('span', '', D.whyq.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var box = el('div', 'ph-vl-opts ph-tg-opts ph-tg-whys'), out = el('div', 'ph-vl-out');
      D.whys.forEach(function (o) {
        var b = optBtn(o);
        b.addEventListener('click', function () { if (step < 4) { step = 4; paint(); } $$('button', box).forEach(function (x) { x.classList.toggle('is-right', x === b); }); out.textContent = ''; var c = el('div', 'ph-vl-card is-valid'); var tag = el('p', 'ph-tg-tag'); tag.appendChild(el('b', '', o.who.en)); var tz = el('span', '', o.who.zh); tz.lang = 'zh-Hant'; tag.appendChild(tz); c.appendChild(tag); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c); });
        box.appendChild(b);
      });
      e.appendChild(box); e.appendChild(out); end.appendChild(e);
    }
    function reset() { step = 0; picks = []; play.hidden = false; end.textContent = ''; show(); }
    $('[data-tg-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { step: step, picks: picks.slice(), ended: !!end.children.length }; },
      play: function (ks, why) { reset(); ks.forEach(function (k) { var b = $('[data-tg-opts] .ph-vl-opt[data-k="' + k + '"]', play); if (b) b.click(); }); if (why) { var w = $('.ph-tg-whys .ph-vl-opt[data-k="' + why + '"]', root); if (w) w.click(); } return this.state(); } };
    var m = /[#&]tragedy=([a-z,\-]+)/.exec(location.hash); if (m) { var a = m[1].split(','); root.__lab.play(a.slice(0, 3), a[3]); }
  });

  /* ---- A32：原作還是複本？（八個案例） ---- */
  $$('[data-ph-copies]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-cp-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-cp-play]', root), text = $('[data-cp-text]', root), btns = $('[data-cp-btns]', root), out = $('[data-cp-out]', root), act = $('[data-cp-act]', root), next = $('[data-cp-next]', root), end = $('[data-cp-end]', root), dots = $('[data-cp-dots]', root), count = $('[data-cp-count]', root);
    var N = D.cases.length, i, ans;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o, arrow) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); if (arrow) b.appendChild(document.createTextNode(' →')); }
    function paint() { dots.textContent = ''; for (var k = 0; k < N; k++) dots.appendChild(el('i', k < ans.length ? (ans[k] ? 'ok' : 'no') : k === i ? 'cur' : '')); count.textContent = i < N ? (i + 1) + ' / ' + N : ''; }
    function show() {
      var c = D.cases[i]; paint(); text.textContent = ''; out.textContent = ''; btns.textContent = ''; act.hidden = true;
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', c.t.en)); var qz = el('span', '', c.t.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      [['orig', 1], ['same', 0]].forEach(function (p) { var b = el('button', 'ph-cp-btn'); b.type = 'button'; b.setAttribute('data-k', p[0]); lab2(b, (p[1] ? c.o : c.s) || D[p[0]]); b.addEventListener('click', function () { answer(p[1], b); }); btns.appendChild(b); });
    }
    function answer(v, b) {
      if (ans.length > i) return;
      ans.push(v); paint(); $$('button', btns).forEach(function (x) { x.disabled = true; x.classList.toggle('is-mine', x === b); });
      var c = D.cases[i], card = el('div', 'ph-vl-card is-valid'); card.appendChild(el('p', '', c.why.en)); zhp(card, c.why.zh); out.appendChild(card);
      act.hidden = false; lab2(next, i === N - 1 ? D.finish : D.next, true);
    }
    function finish() {
      play.hidden = true; paint();
      var n = ans.reduce(function (a, b) { return a + b; }, 0), e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      function para(o, rep) { var en = o.en, zh = o.zh; Object.keys(rep || {}).forEach(function (k) { en = en.replace('{' + k + '}', rep[k]); zh = zh.replace('{' + k + '}', rep[k]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      para(D.score, { n: n }); para(D.views[n <= 1 ? 'look' : n >= 7 ? 'hist' : 'mixed']); para(D.close); end.appendChild(e);
    }
    next.addEventListener('click', function () { i++; if (i < N) show(); else finish(); });
    function reset() { i = 0; ans = []; play.hidden = false; end.textContent = ''; show(); }
    $('[data-cp-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, ans: ans.slice(), ended: !!end.children.length }; },
      play: function (str) { reset(); str.split('').forEach(function (c) { var b = $('.ph-cp-btn[data-k="' + (c === 'o' ? 'orig' : 'same') + '"]', root); if (b && i < N) { b.click(); next.click(); } }); return this.state(); } };
    var m = /[#&]copies=([os]+)/.exec(location.hash); if (m) root.__lab.play(m[1]);
  });

  /* ---- A33：盒子村（維根斯坦的盒中甲蟲） ---- */
  $$('[data-ph-beetle]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-bt-data]', root).textContent); } catch (e) { return; }
    var boxes = $('[data-bt-boxes]', root), talk = $('[data-bt-talk]', root), play = $('[data-bt-play]', root), text = $('[data-bt-text]', root), opts = $('[data-bt-opts]', root), out = $('[data-bt-out]', root), act = $('[data-bt-act]', root), next = $('[data-bt-next]', root), end = $('[data-bt-end]', root), dots = $('[data-bt-dots]', root), count = $('[data-bt-count]', root);
    var ICON = ['🪲', '🪨', '🔘', '〰️', ''], step, ans, opened;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o, arrow) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); if (arrow) b.appendChild(document.createTextNode(' →')); }
    function drawBoxes() {
      var pain = step >= 2;
      boxes.textContent = ''; boxes.className = 'ph-bt-boxes' + (opened && !pain ? ' is-open' : '') + (pain ? ' is-pain' : '');
      D.names.forEach(function (n, k) {
        var b = el('div', 'ph-bt-box'); b.appendChild(el('b', '', n));
        var lid = el('div', 'ph-bt-lid'); lid.setAttribute('aria-hidden', 'true'); lid.appendChild(el('i', '', opened && !pain ? (ICON[k] || '∅') : pain ? '⚡' : '?')); b.appendChild(lid);
        var cap = el('span', 'ph-bt-cap', opened && !pain ? D.inside[k].en : pain ? '“pain”' : '“' + D.word.en + '”'); b.appendChild(cap);
        var cz = el('span', 'ph-bt-cap ph-bt-zh', opened && !pain ? D.inside[k].zh : pain ? '「痛」' : '「' + D.word.zh + '」'); cz.lang = 'zh-Hant'; b.appendChild(cz);
        boxes.appendChild(b);
      });
    }
    function drawTalk() {
      talk.textContent = ''; if (step > 1) return;
      D.talk.forEach(function (t) { var p = el('p', '', t.en); var z = el('span', '', t.zh); z.lang = 'zh-Hant'; p.appendChild(z); talk.appendChild(p); });
    }
    function paint() { dots.textContent = ''; for (var k = 0; k < 3; k++) dots.appendChild(el('i', k < ans.length ? 'ok' : k === step ? 'cur' : '')); count.textContent = step < 3 ? D.steps[step].tag.en + ' · ' + D.steps[step].tag.zh : ''; }
    function show() {
      paint(); drawBoxes(); drawTalk(); text.textContent = ''; opts.textContent = ''; out.textContent = ''; act.hidden = true;
      if (step === 1 && !opened) { act.hidden = false; lab2(next, D.open, true); return; }
      var s = D.steps[step], q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', s.q.en)); var qz = el('span', '', s.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      s.opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.setAttribute('data-k', o.k); b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () {
          if (ans.length > step) return;
          ans.push(o.k); paint(); $$('button', opts).forEach(function (x) { x.disabled = true; x.classList.toggle('is-right', x === b); });
          var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c);
          act.hidden = false; lab2(next, step === 2 ? { en: 'See where you put the meaning', zh: '看看你把意義放在哪裡' } : step === 0 ? D.open : { en: 'Next question', zh: '下一題' }, true);
        });
        opts.appendChild(b);
      });
    }
    function finish() {
      play.hidden = true; talk.textContent = ''; paint();
      var n = ans.filter(function (k) { return k === 'use'; }).length, e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      var o = D.ends[n === 3 ? 'use' : n === 0 ? 'inner' : 'mixed']; e.appendChild(el('p', 'ph-ev-zone', o.en)); zhp(e, o.zh); end.appendChild(e);
    }
    next.addEventListener('click', function () {
      if (step === 0 && ans.length === 1) { step = 1; opened = true; show(); }
      else if (step === 1 && !opened) { opened = true; show(); }
      else if (ans.length > step) { step++; if (step < 3) show(); else finish(); }
    });
    function reset() { step = 0; ans = []; opened = false; play.hidden = false; end.textContent = ''; show(); }
    $('[data-bt-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { step: step, ans: ans.slice(), opened: opened, ended: !!end.children.length }; },
      play: function (ks) { reset(); ks.forEach(function (k) { var b = $('.ph-bt-opts .ph-vl-opt[data-k="' + k + '"]', root); if (b) { b.click(); next.click(); } }); return this.state(); } };
    var m = /[#&]beetle=([a-z,]+)/.exec(location.hash); if (m) root.__lab.play(m[1].split(','));
  });

  /* ---- A34：2–4–6 遊戲（華生的規則發現實驗） ---- */
  $$('[data-ph-wason]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ws-data]', root).textContent); } catch (e) { return; }
    var play = $('[data-ws-play]', root), form = $('[data-ws-form]', root), ins = $$('[data-ws-n]', root), testB = $('[data-ws-test]', root), log = $('[data-ws-log]', root), ready = $('[data-ws-ready]', root), guess = $('[data-ws-guess]', root), qEl = $('[data-ws-q]', root), opts = $('[data-ws-opts]', root), end = $('[data-ws-end]', root);
    var tests;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function lab2(b, o, arrow) { b.textContent = ''; b.appendChild(document.createTextNode(o.en + ' · ')); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; b.appendChild(z); if (arrow) b.appendChild(document.createTextNode(' →')); }
    function fits(a) { return a[0] < a[1] && a[1] < a[2]; }
    function row(a, ok, seed) {
      var r = el('div', 'ph-ws-row ' + (ok ? 'is-ok' : 'is-no')); r.appendChild(el('b', '', a.join(', ')));
      var s = el('span', '', (ok ? '✓ ' + D.fits.en : '✗ ' + D.nofit.en) + (seed ? ' (' + D.seed.en + ')' : '')); r.appendChild(s);
      var z = el('i', '', (ok ? D.fits.zh : D.nofit.zh) + (seed ? '（' + D.seed.zh + '）' : '')); z.lang = 'zh-Hant'; r.appendChild(z); return r;
    }
    function drawLog() {
      log.textContent = ''; var h = el('p', 'ph-ws-h', D.log.en + ' '); var hz = el('span', '', D.log.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); log.appendChild(h);
      log.appendChild(row([2, 4, 6], true, true)); tests.forEach(function (t) { log.appendChild(row(t.a, t.ok)); });
    }
    function doTest(a) { if (a.some(function (x) { return isNaN(x); })) return false; tests.push({ a: a, ok: fits(a) }); drawLog(); return true; }
    form.addEventListener('submit', function (ev) { ev.preventDefault(); if (doTest(ins.map(function (i) { return parseFloat(i.value); }))) { ins.forEach(function (i) { i.value = ''; }); ins[0].focus(); } });
    ready.addEventListener('click', function () { guess.hidden = false; ready.hidden = true; });
    function finish(k) {
      play.hidden = true;
      var y = tests.filter(function (t) { return t.ok; }).length, x = tests.length - y, g = D.rules.filter(function (r) { return r.k === k; })[0];
      var e = el('div', 'ph-el-end'); var h = el('h4', '', D.heads.en); h.appendChild(el('span', '', D.heads.zh)); e.appendChild(h);
      function para(o, rep) { var en = o.en, zh = o.zh; Object.keys(rep || {}).forEach(function (kk) { en = en.replace('{' + kk + '}', rep[kk].en != null ? rep[kk].en : rep[kk]); zh = zh.replace('{' + kk + '}', rep[kk].zh != null ? rep[kk].zh : rep[kk]); }); e.appendChild(el('p', 'ph-ev-zone', en)); zhp(e, zh); }
      para(D.answer);
      if (k === 'rise') para(D.ends.right); else para(D.ends.wrong, { g: { en: g.t.en, zh: g.t.zh } });
      para(D.ends.stats, { n: tests.length, y: y, x: x });
      var plain = tests.every(function (t) { return t.a[1] - t.a[0] === 2 && t.a[2] - t.a[1] === 2; });
      para(tests.length < 3 ? D.ends.few : plain ? D.ends.noneg : x === 0 ? D.ends.pos : D.ends.neg);
      para(D.close); end.appendChild(e);
      var lg = el('div', 'ph-ws-log'); lg.appendChild(row([2, 4, 6], true, true)); tests.forEach(function (t) { lg.appendChild(row(t.a, t.ok)); }); end.insertBefore(lg, e);
    }
    function reset() {
      tests = []; play.hidden = false; guess.hidden = true; ready.hidden = false; end.textContent = ''; ins.forEach(function (i) { i.value = ''; });
      lab2(testB, D.test); lab2(ready, D.ready, true); drawLog();
      qEl.textContent = ''; var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.guessq.en)); var qz = el('span', '', D.guessq.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); qEl.appendChild(q);
      opts.textContent = '';
      D.rules.forEach(function (r) { var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.setAttribute('data-k', r.k); b.appendChild(el('b', '', r.t.en)); var z = el('span', '', r.t.zh); z.lang = 'zh-Hant'; b.appendChild(z); b.addEventListener('click', function () { finish(r.k); }); opts.appendChild(b); });
    }
    $('[data-ws-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { tests: tests.map(function (t) { return t.a.join('-') + (t.ok ? '+' : '-'); }), guessing: !guess.hidden, ended: !!end.children.length }; },
      play: function (sets, k) { reset(); sets.forEach(function (a) { doTest(a); }); if (k) { ready.click(); finish(k); } return this.state(); } };
    var m = /[#&]wason=([\d.,;_\-]*?)(?:;([a-z0-9]+))?$/.exec(location.hash);
    if (m) root.__lab.play(m[1] ? m[1].split(',').map(function (t) { return t.split('_').map(Number); }) : [], m[2]);
  });

  /* ---- A35：火星的那個圈（本輪 vs. 日心） ---- */
  $$('[data-ph-epicycle]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ep-data]', root).textContent); } catch (e) { return; }
    var NS = 'http://www.w3.org/2000/svg', AM = 1.524, WE = 2 * Math.PI, WM = 2 * Math.PI / 1.881, T0 = -1.07, T1 = 1.07, STEPS = 240;
    var sky = $('[data-ep-sky]', root), mdl = $('[data-ep-model]', root), modes = $('[data-ep-modes]', root), ctls = $('[data-ep-ctls]', root), ir = $('[data-ep-r]', root), ip = $('[data-ep-p]', root), or_ = $('[data-ep-r-out]', root), op = $('[data-ep-p-out]', root), bar = $('[data-ep-bar]', root), val = $('[data-ep-val]', root), text = $('[data-ep-text]', root), end = $('[data-ep-end]', root), cap1 = $('[data-ep-cap1]', root), cap2 = $('[data-ep-cap2]', root);
    var mode, fitted, seenSun, tNow = 0, timer = null, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function bi(elm, o) { elm.textContent = ''; elm.appendChild(document.createTextNode(o.en + ' ')); var z = el('i', '', o.zh); z.lang = 'zh-Hant'; elm.appendChild(z); }
    function obs(t) { return [AM * Math.cos(WM * t) - Math.cos(WE * t), AM * Math.sin(WM * t) - Math.sin(WE * t)]; }
    function mod(t, r, p) { var a = 2 * Math.PI * t / p + Math.PI; return [AM * Math.cos(WM * t) + r * Math.cos(a), AM * Math.sin(WM * t) + r * Math.sin(a)]; }
    function misfit(r, p) {
      var s = 0; for (var k = 0; k <= STEPS; k++) { var t = T0 + (T1 - T0) * k / STEPS, a = obs(t), b = mod(t, r, p), d = Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]); d = Math.atan2(Math.sin(d), Math.cos(d)); s += d * d; }
      return Math.sqrt(s / (STEPS + 1)) * 180 / Math.PI;
    }
    function path(fn, sc) { var d = ''; for (var k = 0; k <= STEPS; k++) { var t = T0 + (T1 - T0) * k / STEPS, q = fn(t); d += (k ? 'L' : 'M') + (q[0] * sc).toFixed(1) + ' ' + (-q[1] * sc).toFixed(1); } return d; }
    function add(svg, tag, at, cls) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (a) { e.setAttribute(a, at[a]); }); if (cls) e.setAttribute('class', cls); svg.appendChild(e); return e; }
    function vals() { return { r: +ir.value, p: +ip.value }; }
    function draw() {
      var v = vals(), SC = 52, sun = mode === 'sun';
      sky.textContent = ''; add(sky, 'path', { d: path(obs, SC) }, 'obs');
      add(sky, 'path', { d: path(sun ? obs : function (t) { return mod(t, v.r, v.p); }, SC) }, 'mod');
      add(sky, 'circle', { cx: 0, cy: 0, r: 5 }, 'earth');
      var q = sun ? obs(tNow) : mod(tNow, v.r, v.p); add(sky, 'circle', { cx: q[0] * SC, cy: -q[1] * SC, r: 4.5 }, 'mars');
      mdl.textContent = '';
      if (sun) {
        var S2 = 80; add(mdl, 'circle', { cx: 0, cy: 0, r: S2 }, 'ep-orb'); add(mdl, 'circle', { cx: 0, cy: 0, r: AM * S2 }, 'ep-orb'); add(mdl, 'circle', { cx: 0, cy: 0, r: 8 }, 'sun');
        var e = [Math.cos(WE * tNow) * S2, -Math.sin(WE * tNow) * S2], m = [AM * Math.cos(WM * tNow) * S2, -AM * Math.sin(WM * tNow) * S2];
        add(mdl, 'line', { x1: e[0], y1: e[1], x2: e[0] + (m[0] - e[0]) * 2.2, y2: e[1] + (m[1] - e[1]) * 2.2 }, 'sight'); add(mdl, 'circle', { cx: e[0], cy: e[1], r: 5 }, 'earth'); add(mdl, 'circle', { cx: m[0], cy: m[1], r: 4.5 }, 'mars');
      } else {
        var S3 = 52, c = [AM * Math.cos(WM * tNow) * S3, -AM * Math.sin(WM * tNow) * S3], a = 2 * Math.PI * tNow / v.p + Math.PI, pm = [c[0] + v.r * Math.cos(a) * S3, c[1] - v.r * Math.sin(a) * S3];
        add(mdl, 'circle', { cx: 0, cy: 0, r: AM * S3 }, 'ep-orb'); if (v.r > 0) add(mdl, 'circle', { cx: c[0], cy: c[1], r: v.r * S3 }, 'epi');
        add(mdl, 'line', { x1: c[0], y1: c[1], x2: pm[0], y2: pm[1] }, 'sight'); add(mdl, 'circle', { cx: 0, cy: 0, r: 5 }, 'earth'); add(mdl, 'circle', { cx: pm[0], cy: pm[1], r: 4.5 }, 'mars');
      }
    }
    function update() {
      var v = vals(), mf = mode === 'sun' ? 0 : misfit(v.r, v.p);
      or_.textContent = v.r.toFixed(2); op.textContent = v.p.toFixed(2) + ' ' + D.yr.en;
      bar.style.width = Math.max(2, 100 - Math.min(100, mf * 2.5)) + '%'; bar.className = mf < 2 ? 'is-ok' : ''; val.textContent = mf.toFixed(1) + '°';
      ctls.hidden = mode === 'sun';
      text.textContent = '';
      var o = mode === 'sun' ? D.cop : mf < 2 ? D.ptol.done : v.r < 0.15 ? D.ptol.start : mf < 8 ? D.ptol.near : D.ptol.far;
      if (mode !== 'sun' && mf < 2) fitted = true;
      text.appendChild(el('p', '', o.en)); zhp(text, o.zh);
      $$('button', modes).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-k') === mode ? 'true' : 'false'); });
      draw(); drawEnd(); return mf;
    }
    function drawEnd() {
      if (!seenSun) { end.textContent = ''; return; }
      if (end.children.length) return;
      var e = el('div', 'ph-el-end'); var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.q.en)); var qz = el('span', '', D.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var box = el('div', 'ph-vl-opts ph-tp-opts ph-ep-opts'), out = el('div', 'ph-vl-out');
      D.qopts.forEach(function (o) {
        var bt = el('button', 'ph-vl-opt'); bt.type = 'button'; bt.setAttribute('data-k', o.k); bt.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; bt.appendChild(z);
        bt.addEventListener('click', function () { $$('button', box).forEach(function (x) { x.classList.toggle('is-right', x === bt); }); out.textContent = ''; var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c); });
        box.appendChild(bt);
      });
      e.appendChild(box); e.appendChild(out); end.appendChild(e);
    }
    function setMode(k) { mode = k; if (k === 'sun') seenSun = true; update(); }
    modes.textContent = '';
    [['earth', 0], ['sun', 1]].forEach(function (p) { var b = el('button', 'ph-ep-mode'); b.type = 'button'; b.setAttribute('data-k', p[0]); b.appendChild(document.createTextNode(D.modes[p[1]].en + ' · ')); var z = el('span', '', D.modes[p[1]].zh); z.lang = 'zh-Hant'; b.appendChild(z); b.addEventListener('click', function () { setMode(p[0]); }); modes.appendChild(b); });
    bi($('[data-ep-lr]', root), D.lr); bi($('[data-ep-lp]', root), D.lp); bi($('[data-ep-fit]', root), D.fit);
    cap1.textContent = ''; [['obs', 0], ['mod', 1]].forEach(function (p) { var s = el('span', 'k-' + p[0], D.legend[p[1]].en + ' '); var z = el('i', '', D.legend[p[1]].zh); z.lang = 'zh-Hant'; s.appendChild(z); cap1.appendChild(s); });
    [ir, ip].forEach(function (i) { i.addEventListener('input', update); });
    function tick() { tNow += 0.012; if (tNow > T1) tNow = T0; draw(); }
    function start() { if (reduce || timer) return; timer = setInterval(tick, 50); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) start(); else stop(); }); }).observe(root); else start();
    function reset() { mode = 'earth'; fitted = false; seenSun = false; ir.value = 0; ip.value = 1.6; tNow = 0; end.textContent = ''; update(); }
    $('[data-ep-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { var v = vals(); return { mode: mode, r: v.r, p: v.p, misfit: +(mode === 'sun' ? 0 : misfit(v.r, v.p)).toFixed(2), fitted: fitted, asked: !!end.children.length }; },
      set: function (r, p, m) { if (m) mode = m; ir.value = r; ip.value = p; if (m === 'sun') seenSun = true; update(); return this.state(); }, misfit: misfit, freeze: function (t) { stop(); tNow = t; draw(); } };
    var m = /[#&]epicycle=([\d.]+)-([\d.]+)(?:,(sun|earth))?/.exec(location.hash); if (m) { root.__lab.set(+m[1], +m[2], m[3] || 'earth'); root.__lab.freeze(0.25); }
  });

  /* ---- A36：把內角加起來（平面 vs. 球面） ---- */
  $$('[data-ph-angles]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ag-data]', root).textContent); } catch (e) { return; }
    var NS = 'http://www.w3.org/2000/svg', DEG = 180 / Math.PI, CX = 200, CY = 158, R = 128, TILT = 38 / DEG;
    var svg = $('[data-ag-svg]', root), modes = $('[data-ag-modes]', root), ctls = $('[data-ag-ctls]', root), iw = $('[data-ag-w]', root), ih = $('[data-ag-h]', root), ow = $('[data-ag-w-out]', root), oh = $('[data-ag-h-out]', root), sumv = $('[data-ag-sumv]', root), parts = $('[data-ag-parts]', root), text = $('[data-ag-text]', root), end = $('[data-ag-end]', root), shuf = $('[data-ag-shuffle]', root);
    var mode, seenGlobe, P, drag = -1, START = [[90, 235], [320, 215], [170, 60]];
    var SETS = [[[60, 250], [350, 250], [60, 70]], [[40, 150], [360, 170], [200, 130]], [[150, 260], [250, 260], [200, 40]], [[50, 60], [340, 100], [120, 270]], [[180, 200], [240, 190], [215, 140]]], si = 0;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function bi(elm, o) { elm.textContent = ''; elm.appendChild(document.createTextNode(o.en + ' ')); var z = el('i', '', o.zh); z.lang = 'zh-Hant'; elm.appendChild(z); }
    function add(tag, at, cls, txt) { var e = document.createElementNS(NS, tag); Object.keys(at).forEach(function (a) { e.setAttribute(a, at[a]); }); if (cls) e.setAttribute('class', cls); if (txt != null) e.textContent = txt; svg.appendChild(e); return e; }
    function flatAngles() {
      return [0, 1, 2].map(function (i) { var a = P[i], b = P[(i + 1) % 3], c = P[(i + 2) % 3], u = [b[0] - a[0], b[1] - a[1]], v = [c[0] - a[0], c[1] - a[1]], n = Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]); return n ? Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / n))) * DEG : 0; });
    }
    function globeAngles() { var w = +iw.value, h = +ih.value / DEG, b = Math.atan2(1, Math.cos(h) * Math.tan(w / 2 / DEG)) * DEG; return [w, b, b]; }
    function proj(th, ph) { var x = Math.sin(th) * Math.sin(ph), y = Math.cos(th), z = Math.sin(th) * Math.cos(ph); return [CX + R * x, CY - R * (y * Math.cos(TILT) - z * Math.sin(TILT)), y * Math.sin(TILT) + z * Math.cos(TILT)]; }
    function proj3(v) { return [CX + R * v[0], CY - R * (v[1] * Math.cos(TILT) - v[2] * Math.sin(TILT)), v[1] * Math.sin(TILT) + v[2] * Math.cos(TILT)]; }
    function line(fn, n) { var d = '', pen = false; for (var k = 0; k <= n; k++) { var q = fn(k / n); if (q[2] < 0) { pen = false; continue; } d += (pen ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); pen = true; } return d; }
    function labels(pts, ang, off) {
      var g = [(pts[0][0] + pts[1][0] + pts[2][0]) / 3, (pts[0][1] + pts[1][1] + pts[2][1]) / 3];
      pts.forEach(function (p, i) { var dx = p[0] - g[0], dy = p[1] - g[1], n = Math.hypot(dx, dy) || 1, x = Math.max(22, Math.min(378, p[0] + dx / n * off)), y = Math.max(14, Math.min(292, p[1] + dy / n * off + 4)); add('text', { x: x.toFixed(1), y: y.toFixed(1), 'text-anchor': 'middle' }, 'lab', ang[i].toFixed(1) + '°'); });
    }
    function draw() {
      svg.textContent = '';
      var ang;
      if (mode === 'flat') {
        for (var gx = 40; gx < 400; gx += 40) add('line', { x1: gx, y1: 0, x2: gx, y2: 300 }, 'grid');
        for (var gy = 30; gy < 300; gy += 40) add('line', { x1: 0, y1: gy, x2: 400, y2: gy }, 'grid');
        ang = flatAngles();
        add('polygon', { points: P.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') }, 'tri');
        P.forEach(function (p, i) { add('circle', { cx: p[0], cy: p[1], r: 11, 'data-i': i }, 'knob'); });
        labels(P, ang, 32);
      } else {
        var w = +iw.value / DEG, h = +ih.value / DEG;
        add('circle', { cx: CX, cy: CY, r: R }, 'ball');
        [30, 60, 90].forEach(function (c) { add('path', { d: line(function (u) { return proj(c / DEG, u * 2 * Math.PI - Math.PI); }, 96) }, c === 90 ? 'eq' : 'grat'); });
        for (var m = -150; m <= 180; m += 30) (function (m) { add('path', { d: line(function (u) { return proj(u * Math.PI / 2, m / DEG); }, 30) }, 'grat'); })(m);
        var b3 = [Math.sin(h) * Math.sin(-w / 2), Math.cos(h), Math.sin(h) * Math.cos(-w / 2)], c3 = [Math.sin(h) * Math.sin(w / 2), Math.cos(h), Math.sin(h) * Math.cos(w / 2)];
        var om = Math.acos(Math.max(-1, Math.min(1, b3[0] * c3[0] + b3[1] * c3[1] + b3[2] * c3[2]))), so = Math.sin(om) || 1;
        function base(u) { var a = Math.sin((1 - u) * om) / so, c = Math.sin(u * om) / so; return proj3([a * b3[0] + c * c3[0], a * b3[1] + c * c3[1], a * b3[2] + c * c3[2]]); }
        var d = '', k, q;
        for (k = 0; k <= 30; k++) { q = proj(h * k / 30, -w / 2); d += (k ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }
        for (k = 1; k <= 40; k++) { q = base(k / 40); d += 'L' + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }
        for (k = 29; k >= 0; k--) { q = proj(h * k / 30, w / 2); d += 'L' + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }
        add('path', { d: d + 'Z' }, 'tri');
        ang = globeAngles();
        var pts = [proj(0, 0), proj(h, -w / 2), proj(h, w / 2)];
        labels(pts, ang, 22);
        pts.forEach(function (p) { add('circle', { cx: p[0], cy: p[1], r: 4 }, 'dot'); });
      }
      return ang;
    }
    function update() {
      var ang = draw(), s = ang[0] + ang[1] + ang[2], ex = s - 180;
      sumv.textContent = s.toFixed(1) + '°'; sumv.className = ex > 0.05 ? 'is-over' : '';
      parts.textContent = ang.map(function (a) { return a.toFixed(1) + '°'; }).join(' + ') + (ex > 0.05 ? '  (180° + ' + ex.toFixed(1) + '°)' : '');
      ow.textContent = iw.value + '°'; oh.textContent = ih.value + '°';
      ctls.hidden = mode !== 'globe'; shuf.hidden = mode !== 'flat';
      var o = mode === 'flat' ? D.flat : +ih.value >= 88 ? D.globe.big : ex < 8 ? D.globe.small : D.globe.mid;
      if (text.getAttribute('data-k') !== o.en) { text.setAttribute('data-k', o.en); text.textContent = ''; text.appendChild(el('p', '', o.en)); zhp(text, o.zh); }
      $$('button', modes).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-k') === mode ? 'true' : 'false'); });
      drawEnd(); return s;
    }
    function drawEnd() {
      if (!seenGlobe) { end.textContent = ''; return; }
      if (end.children.length) return;
      var e = el('div', 'ph-el-end'); var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.q.en)); var qz = el('span', '', D.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var box = el('div', 'ph-vl-opts ph-tp-opts ph-ag-opts'), out = el('div', 'ph-vl-out');
      D.qopts.forEach(function (o) {
        var bt = el('button', 'ph-vl-opt'); bt.type = 'button'; bt.setAttribute('data-k', o.k); bt.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; bt.appendChild(z);
        bt.addEventListener('click', function () { $$('button', box).forEach(function (x) { x.classList.toggle('is-right', x === bt); }); out.textContent = ''; var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c); });
        box.appendChild(bt);
      });
      e.appendChild(box); e.appendChild(out); end.appendChild(e);
    }
    function setMode(k) { mode = k; if (k === 'globe') seenGlobe = true; update(); }
    function pt(ev) { var m = svg.getScreenCTM(); if (!m) return null; var p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; p = p.matrixTransform(m.inverse()); return [Math.max(12, Math.min(388, p.x)), Math.max(12, Math.min(288, p.y))]; }
    svg.addEventListener('pointerdown', function (ev) { if (mode !== 'flat') return; var q = pt(ev); if (!q) return; var best = -1, bd = 1e9; P.forEach(function (p, i) { var d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < bd) { bd = d; best = i; } }); if (bd > 40) return; drag = best; try { svg.setPointerCapture(ev.pointerId); } catch (e) {} ev.preventDefault(); });
    svg.addEventListener('pointermove', function (ev) { if (drag < 0) return; var q = pt(ev); if (!q) return; P[drag] = q; update(); });
    ['pointerup', 'pointercancel'].forEach(function (n) { svg.addEventListener(n, function () { drag = -1; }); });
    modes.textContent = '';
    [['flat', 0], ['globe', 1]].forEach(function (p) { var b = el('button', 'ph-ag-mode'); b.type = 'button'; b.setAttribute('data-k', p[0]); b.appendChild(document.createTextNode(D.modes[p[1]].en + ' · ')); var z = el('span', '', D.modes[p[1]].zh); z.lang = 'zh-Hant'; b.appendChild(z); b.addEventListener('click', function () { setMode(p[0]); }); modes.appendChild(b); });
    bi($('[data-ag-lw]', root), D.lw); bi($('[data-ag-lh]', root), D.lh); bi($('[data-ag-suml]', root), D.sum); bi(shuf, D.shuffle);
    [iw, ih].forEach(function (i) { i.addEventListener('input', update); });
    shuf.addEventListener('click', function () { P = SETS[si % SETS.length].map(function (p) { return p.slice(); }); si++; update(); });
    function reset() { mode = 'flat'; seenGlobe = false; si = 0; P = START.map(function (p) { return p.slice(); }); iw.value = 40; ih.value = 20; end.textContent = ''; text.removeAttribute('data-k'); update(); }
    $('[data-ag-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { var a = mode === 'flat' ? flatAngles() : globeAngles(); return { mode: mode, angles: a.map(function (x) { return +x.toFixed(2); }), sum: +(a[0] + a[1] + a[2]).toFixed(2), w: +iw.value, h: +ih.value, asked: !!end.children.length }; },
      set: function (w, h) { iw.value = w; ih.value = h; setMode('globe'); return this.state(); }, move: function (i, x, y) { P[i] = [x, y]; setMode('flat'); return this.state(); }, shuffle: function () { shuf.click(); return this.state(); } };
    var hm = /[#&]angles=(\d+)-(\d+)/.exec(location.hash); if (hm) root.__lab.set(+hm[1], +hm[2]);
  });

  /* ---- A37：你的線畫在哪裡（圈內圈外 vs. 理由） ---- */
  $$('[data-ph-circle]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ci-data]', root).textContent); } catch (e) { return; }
    var grid = $('[data-ci-grid]', root), count = $('[data-ci-count]', root), next = $('[data-ci-next]', root), two = $('[data-ci-two]', root), rbox = $('[data-ci-reasons]', root), out = $('[data-ci-out]', root);
    var inside, reason, drawn;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function bi(elm, o) { elm.textContent = ''; elm.appendChild(document.createTextNode(o.en + ' ')); var z = el('i', '', o.zh); z.lang = 'zh-Hant'; elm.appendChild(z); }
    function pair(tag, cls, o) { var e = el(tag, cls); e.appendChild(el('b', '', o.en)); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; e.appendChild(z); return e; }
    function drawGrid() {
      grid.textContent = '';
      D.beings.forEach(function (b) {
        var on = !!inside[b.k], bt = pair('button', 'ph-ci-card' + (on ? ' is-in' : ''), b); bt.type = 'button'; bt.setAttribute('aria-pressed', on ? 'true' : 'false'); bt.setAttribute('data-k', b.k);
        var tag = el('em', '', (on ? D.inl : D.outl).en + ' · '); var tz = el('i', '', (on ? D.inl : D.outl).zh); tz.lang = 'zh-Hant'; tag.appendChild(tz); bt.appendChild(tag);
        bt.addEventListener('click', function () { inside[b.k] = !inside[b.k]; drawGrid(); if (reason) result(); });
        grid.appendChild(bt);
      });
      var n = D.beings.filter(function (b) { return inside[b.k]; }).length;
      count.textContent = D.inl.en + ' ' + n + ' · ' + D.outl.en + ' ' + (D.beings.length - n);
    }
    function compare(r) {
      var add = [], drop = [], unsure = [];
      D.beings.forEach(function (b) { var s = r.set[b.k] || 0; if (s === 2) unsure.push(b); else if (s === 1 && !inside[b.k]) add.push(b); else if (s === 0 && inside[b.k]) drop.push(b); });
      return { add: add, drop: drop, unsure: unsure };
    }
    function names(list, zh) { return list.map(function (b) { return zh ? b.zh : b.en.replace(/^An? /, '').toLowerCase(); }).join(zh ? '、' : ', '); }
    function result() {
      var r = D.reasons.filter(function (x) { return x.k === reason; })[0]; if (!r) return;
      var c = compare(r), n = c.add.length + c.drop.length;
      out.textContent = '';
      var e = el('div', 'ph-el-end ph-ci-res'), head = n ? D.res.gap : D.res.fit;
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', head.en.replace('{n} place(s)', n + (n === 1 ? ' place' : ' places')))); var qz = el('span', '', head.zh.replace('{n}', n)); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var tb = el('div', 'ph-ci-table');
      D.beings.forEach(function (b) {
        var s = r.set[b.k] || 0, mine = !!inside[b.k], bad = s !== 2 && (s === 1) !== mine, row = el('div', 'ph-ci-row' + (bad ? ' is-bad' : s === 2 ? ' is-q' : ''));
        row.appendChild(pair('span', 'nm', b));
        var a = el('span', 'cell' + (mine ? ' in' : ''), mine ? '●' : '○'), z = el('span', 'cell' + (s === 1 ? ' in' : ''), s === 2 ? '?' : s === 1 ? '●' : '○');
        row.appendChild(a); row.appendChild(z); tb.appendChild(row);
      });
      var hd = el('div', 'ph-ci-row hd'); hd.appendChild(el('span', 'nm', '')); hd.appendChild(el('span', 'cell', 'You · 你')); hd.appendChild(el('span', 'cell', 'Reason · 理由')); tb.insertBefore(hd, tb.firstChild);
      e.appendChild(tb);
      [['add', c.add], ['drop', c.drop], ['unsure', c.unsure]].forEach(function (p) {
        if (!p[1].length) return;
        var li = el('p', 'ph-ci-list is-' + p[0]); li.appendChild(el('b', '', D.res[p[0]].en + ' ')); li.appendChild(document.createTextNode(names(p[1], false) + '. ')); var z = el('span', '', D.res[p[0]].zh + names(p[1], true) + '。'); z.lang = 'zh-Hant'; li.appendChild(z); e.appendChild(li);
      });
      var card = el('div', 'ph-vl-card is-valid'); card.appendChild(el('p', 'ph-ci-who', r.who.en + ' · ' + r.who.zh)); card.appendChild(el('p', '', r.v.en)); zhp(card, r.v.zh); e.appendChild(card);
      var coda = el('div', 'ph-ci-coda'); coda.appendChild(el('p', '', D.res.coda.en)); zhp(coda, D.res.coda.zh); e.appendChild(coda);
      out.appendChild(e);
      $$('button', rbox).forEach(function (x) { x.classList.toggle('is-right', x.getAttribute('data-k') === reason); });
    }
    function showTwo() { drawn = true; two.hidden = false; next.hidden = true; }
    rbox.textContent = '';
    D.reasons.forEach(function (r) {
      var bt = pair('button', 'ph-vl-opt', r.t); bt.type = 'button'; bt.setAttribute('data-k', r.k);
      bt.addEventListener('click', function () { reason = r.k; result(); });
      rbox.appendChild(bt);
    });
    bi($('[data-ci-step1]', root), D.step1); bi($('[data-ci-step2]', root), D.step2); bi(next, D.next);
    next.addEventListener('click', showTwo);
    function reset() { inside = {}; D.start.forEach(function (k) { inside[k] = true; }); reason = null; drawn = false; two.hidden = true; next.hidden = false; out.textContent = ''; $$('button', rbox).forEach(function (x) { x.classList.remove('is-right'); }); drawGrid(); }
    $('[data-ci-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { var r = reason && D.reasons.filter(function (x) { return x.k === reason; })[0], c = r ? compare(r) : null; return { inside: D.beings.filter(function (b) { return inside[b.k]; }).map(function (b) { return b.k; }), drawn: drawn, reason: reason, add: c ? c.add.map(function (b) { return b.k; }) : null, drop: c ? c.drop.map(function (b) { return b.k; }) : null, unsure: c ? c.unsure.map(function (b) { return b.k; }) : null }; },
      set: function (list, r) { inside = {}; list.forEach(function (k) { inside[k] = true; }); drawGrid(); showTwo(); if (r) { reason = r; result(); } return this.state(); } };
    var hm = /[#&]circle=([a-z.]*)(?:,([a-z]+))?/.exec(location.hash); if (hm) root.__lab.set(hm[1] ? hm[1].split('.') : [], hm[2]);
  });

  /* ---- A38：定一個折現率（多遠的人算多少） ---- */
  $$('[data-ph-discount]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-dc-data]', root).textContent); } catch (e) { return; }
    var ir = $('[data-dc-r]', root), or_ = $('[data-dc-r-out]', root), marks = $('[data-dc-marks]', root), rows = $('[data-dc-rows]', root), text = $('[data-dc-text]', root), end = $('[data-dc-end]', root);
    var touched;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function bi(elm, o) { elm.textContent = ''; elm.appendChild(document.createTextNode(o.en + ' ')); var z = el('i', '', o.zh); z.lang = 'zh-Hant'; elm.appendChild(z); }
    function need(r, y) { return Math.pow(1 + r / 100, y); }
    function fmt(n) {
      if (n < 9.95) return n.toFixed(n < 1.005 ? 0 : 1);
      if (n < 1e6) return Math.round(n).toLocaleString('en-US');
      if (n < 1e9) return (n / 1e6).toFixed(n < 1e7 ? 1 : 0) + ' million';
      if (n < 1e12) return (n / 1e9).toFixed(n < 1e10 ? 1 : 0) + ' billion';
      return (n / 1e12).toFixed(n < 1e13 ? 1 : 0) + ' trillion';
    }
    function update() {
      var r = +ir.value;
      or_.textContent = r.toFixed(1) + '%';
      rows.textContent = '';
      D.rows.forEach(function (w) {
        var n = need(r, w.y), row = el('div', 'ph-dc-row');
        var nm = el('span', 'nm'); nm.appendChild(el('b', '', w.t.en)); var z = el('i', '', w.t.zh); z.lang = 'zh-Hant'; nm.appendChild(z); row.appendChild(nm);
        var bar = el('span', 'bar'), u = el('u'); u.style.width = Math.max(1.2, 100 / n) + '%'; if (100 / n < 1) u.className = 'is-gone'; bar.appendChild(u); row.appendChild(bar);
        var num = el('span', 'num'); num.appendChild(el('b', '', fmt(n))); num.appendChild(document.createTextNode(' ' + (fmt(n) === '1' ? 'person' : D.unit.en) + ' ')); var uz = el('i', '', D.unit.zh); uz.lang = 'zh-Hant'; num.appendChild(uz); row.appendChild(num);
        rows.appendChild(row);
      });
      var o = r === 0 ? D.notes.zero : r <= 0.5 ? D.notes.low : r <= 3.5 ? D.notes.mid : D.notes.high;
      if (text.getAttribute('data-k') !== o.en) { text.setAttribute('data-k', o.en); text.textContent = ''; text.appendChild(el('p', '', o.en)); zhp(text, o.zh); }
      $$('button', marks).forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-r') === r ? 'true' : 'false'); });
      drawEnd();
    }
    function drawEnd() {
      if (!touched) { end.textContent = ''; return; }
      if (end.children.length) return;
      var e = el('div', 'ph-el-end'); var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.q.en)); var qz = el('span', '', D.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var box = el('div', 'ph-vl-opts ph-tp-opts ph-dc-opts'), out = el('div', 'ph-vl-out');
      D.qopts.forEach(function (o) {
        var bt = el('button', 'ph-vl-opt'); bt.type = 'button'; bt.setAttribute('data-k', o.k); bt.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; bt.appendChild(z);
        bt.addEventListener('click', function () { $$('button', box).forEach(function (x) { x.classList.toggle('is-right', x === bt); }); out.textContent = ''; var c = el('div', 'ph-vl-card is-valid'); c.appendChild(el('p', '', o.v.en)); zhp(c, o.v.zh); out.appendChild(c); });
        box.appendChild(bt);
      });
      e.appendChild(box); e.appendChild(out); end.appendChild(e);
    }
    marks.textContent = '';
    D.marks.forEach(function (m) {
      var b = el('button', 'ph-dc-mark'); b.type = 'button'; b.setAttribute('data-r', m.r); b.appendChild(el('b', '', m.r + '%')); b.appendChild(document.createTextNode(' ' + m.t.en + ' ')); var z = el('i', '', m.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
      b.addEventListener('click', function () { ir.value = m.r; touched = true; update(); });
      marks.appendChild(b);
    });
    bi($('[data-dc-lr]', root), D.rate); bi($('[data-dc-head]', root), D.head);
    ir.addEventListener('input', function () { touched = true; update(); });
    function reset() { touched = false; ir.value = 3; end.textContent = ''; text.removeAttribute('data-k'); update(); }
    $('[data-dc-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { var r = +ir.value; return { rate: r, need: D.rows.map(function (w) { return +need(r, w.y).toPrecision(4); }), shown: D.rows.map(function (w) { return fmt(need(r, w.y)); }), asked: !!end.children.length }; },
      set: function (r) { ir.value = r; touched = true; update(); return this.state(); } };
    var hm = /[#&]discount=([\d.]+)/.exec(location.hash); if (hm) root.__lab.set(+hm[1]);
  });

  /* ---- A39：寫一本規則書（一條規則走過五個情境） ---- */
  $$('[data-ph-rulebook]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-ru-data]', root).textContent); } catch (e) { return; }
    var rbox = $('[data-ru-rules]', root), cbox = $('[data-ru-cases]', root), out = $('[data-ru-out]', root), triedBox = $('[data-ru-tried]', root);
    var rule, votes, tried;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function bi(elm, o) { elm.textContent = ''; elm.appendChild(document.createTextNode(o.en + ' ')); var z = el('i', '', o.zh); z.lang = 'zh-Hant'; elm.appendChild(z); }
    function pair(tag, cls, o) { var e = el(tag, cls); e.appendChild(el('b', '', o.en)); var z = el('span', '', o.zh); z.lang = 'zh-Hant'; e.appendChild(z); return e; }
    function R(k) { return D.rules.filter(function (x) { return x.k === k; })[0]; }
    function count() { return D.cases.filter(function (c) { return votes[c.k] === true; }).length; }
    function done() { return D.cases.every(function (c) { return votes[c.k] != null; }); }
    function drawCases() {
      cbox.textContent = ''; if (!rule) return;
      var shown = 0;
      D.cases.forEach(function (c, i) {
        if (i > 0 && votes[D.cases[i - 1].k] == null) return;
        shown++;
        var card = el('div', 'ph-ru-case' + (votes[c.k] === true ? ' is-ok' : votes[c.k] === false ? ' is-no' : ''));
        var h = el('p', 'ph-ru-h'); h.appendChild(el('em', '', (i + 1) + ' / ' + D.cases.length)); h.appendChild(el('b', '', c.t.en)); var hz = el('span', '', c.t.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); card.appendChild(h);
        card.appendChild(el('p', 'ph-ru-s', c.s.en)); zhp(card, c.s.zh);
        var act = el('div', 'ph-ru-act'); var lab = el('p', 'ph-ru-l'); bi(lab, D.does); act.appendChild(lab);
        act.appendChild(el('p', 'ph-ru-a', '… ' + c.a[rule].en)); zhp(act, '……' + c.a[rule].zh); card.appendChild(act);
        var bt = el('div', 'ph-ru-vote');
        [[true, D.ok, 'ok'], [false, D.no, 'no']].forEach(function (p) {
          var b = pair('button', 'ph-ru-btn is-' + p[2], p[1]); b.type = 'button'; b.setAttribute('aria-pressed', votes[c.k] === p[0] ? 'true' : 'false');
          b.addEventListener('click', function () { votes[c.k] = p[0]; drawCases(); result(); });
          bt.appendChild(b);
        });
        card.appendChild(bt); cbox.appendChild(card);
      });
    }
    function result() {
      out.textContent = ''; if (!rule || !done()) { drawTried(); return; }
      var n = count(), r = R(rule); tried[rule] = n;
      var e = el('div', 'ph-el-end'); var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', D.res.score.en.replace('{n}', n))); var qz = el('span', '', D.res.score.zh.replace('{n}', n)); qz.lang = 'zh-Hant'; q.appendChild(qz); e.appendChild(q);
      var card = el('div', 'ph-vl-card is-valid'); card.appendChild(el('p', 'ph-ru-who', r.who.en + ' · ' + r.who.zh)); card.appendChild(el('p', '', r.v.en)); zhp(card, r.v.zh); e.appendChild(card);
      if (Object.keys(tried).length === D.rules.length) { var all = el('div', 'ph-ru-all'); all.appendChild(el('p', '', D.res.all.en)); zhp(all, D.res.all.zh); e.appendChild(all); }
      out.appendChild(e); drawTried();
    }
    function drawTried() {
      var ks = D.rules.filter(function (r) { return tried[r.k] != null; });
      triedBox.hidden = !ks.length; triedBox.textContent = ''; if (!ks.length) return;
      var h = el('p', 'ph-ru-th'); bi(h, D.res.tried); triedBox.appendChild(h);
      ks.forEach(function (r) { var row = el('div', 'ph-ru-tr'); row.appendChild(pair('span', 'nm', r.t)); var s = el('span', 'sc'); for (var i = 0; i < D.cases.length; i++) s.appendChild(el('u', i < tried[r.k] ? 'on' : '')); s.appendChild(el('b', '', tried[r.k] + ' / ' + D.cases.length)); row.appendChild(s); triedBox.appendChild(row); });
      $$('button', rbox).forEach(function (x) { x.classList.toggle('is-done', tried[x.getAttribute('data-k')] != null); });
    }
    function choose(k) { rule = k; votes = {}; out.textContent = ''; $$('button', rbox).forEach(function (x) { x.classList.toggle('is-right', x.getAttribute('data-k') === k); }); drawCases(); drawTried(); }
    rbox.textContent = '';
    D.rules.forEach(function (r) { var bt = pair('button', 'ph-vl-opt', r.t); bt.type = 'button'; bt.setAttribute('data-k', r.k); bt.addEventListener('click', function () { choose(r.k); }); rbox.appendChild(bt); });
    bi($('[data-ru-pick]', root), D.pick);
    function reset() { rule = null; votes = {}; tried = {}; cbox.textContent = ''; out.textContent = ''; $$('button', rbox).forEach(function (x) { x.classList.remove('is-right'); x.classList.remove('is-done'); }); drawTried(); }
    $('[data-ru-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { rule: rule, votes: D.cases.map(function (c) { return votes[c.k] == null ? null : votes[c.k]; }), done: !!rule && done(), score: rule && done() ? count() : null, tried: JSON.parse(JSON.stringify(tried)) }; },
      run: function (k, pattern) { choose(k); D.cases.forEach(function (c, i) { votes[c.k] = pattern.charAt(i) === '1'; }); drawCases(); result(); return this.state(); } };
    var hm = /[#&]rulebook=([a-z]+)(?:,([01]{5}))?/.exec(location.hash); if (hm && R(hm[1])) { if (hm[2]) root.__lab.run(hm[1], hm[2]); else choose(hm[1]); }
  });

  /* ---- A13：去火星三趟（帕菲特的傳送機） ---- */
  $$('[data-ph-teleport]').forEach(function (root) {
    var D;
    try { D = JSON.parse($('[data-tp-data]', root).textContent); } catch (e) { return; }
    var text = $('[data-tp-text]', root), opts = $('[data-tp-opts]', root), out = $('[data-tp-out]', root), next = $('[data-tp-next]', root), dots = $('[data-tp-dots]', root), count = $('[data-tp-count]', root);
    var i, ans;
    function zhp(parent, t) { var z = el('p', 'ph-zh', t); z.lang = 'zh-Hant'; parent.appendChild(z); addTr(z); }
    function paint() {
      dots.textContent = ''; D.stages.forEach(function (_, k) { dots.appendChild(el('i', k < i ? 'ok' : k === i ? 'cur' : '')); });
      count.textContent = i < D.stages.length ? 'Trip ' + (i + 1) + ' of ' + D.stages.length + ' · 第 ' + (i + 1) + '／' + D.stages.length + ' 趟' : '';
    }
    function card(label, o, cls) { var c = el('div', 'ph-vl-card ' + (cls || '')); c.appendChild(el('small', 'ph-tp-k', label)); c.appendChild(el('p', '', o.en)); zhp(c, o.zh); return c; }
    function show() {
      var st = D.stages[i]; out.textContent = ''; next.hidden = true; opts.textContent = ''; text.textContent = '';
      root.setAttribute('data-scene', 'idle'); void root.offsetWidth; root.setAttribute('data-scene', st.scene);
      var h = el('h4', '', st.title.en); var hz = el('span', '', st.title.zh); hz.lang = 'zh-Hant'; h.appendChild(hz); text.appendChild(h);
      text.appendChild(el('p', '', st.text.en)); zhp(text, st.text.zh);
      var q = el('p', 'ph-vl-q'); q.appendChild(el('b', '', st.q.en)); var qz = el('span', '', st.q.zh); qz.lang = 'zh-Hant'; q.appendChild(qz); text.appendChild(q);
      st.opts.forEach(function (o) {
        var b = el('button', 'ph-vl-opt'); b.type = 'button'; b.appendChild(el('b', '', o.t.en)); var z = el('span', '', o.t.zh); z.lang = 'zh-Hant'; b.appendChild(z);
        b.addEventListener('click', function () { choose(st, o, b); }); opts.appendChild(b);
      });
      paint();
    }
    function choose(st, o, btn) {
      if (ans[st.key]) return; ans[st.key] = o.k;
      $$('button', opts).forEach(function (x) { x.disabled = true; }); btn.classList.add('is-right');
      if (st.key === 'q2') out.appendChild(card('What your two answers commit you to · 你的兩個答案讓你必須承擔什麼', D.verdicts[ans.q1 + '-' + ans.q2], 'is-valid'));
      if (st.key === 'q3') { out.appendChild(card('Parfit’s comment · 帕菲特的評論', D.q3[o.k], 'is-sound')); }
      if (st.key === 'q1') out.appendChild(card('Noted · 記下了', o.k === 'yes' ? { en: 'Hold on to that answer. The next trip will test it.', zh: '記住這個答案。下一趟會考驗它。' } : { en: 'Hold on to that answer. The next trip will ask what, exactly, was lost.', zh: '記住這個答案。下一趟會問：失去的到底是什麼？' }));
      if (i < D.stages.length - 1) { next.hidden = false; next.textContent = 'Next trip · 下一趟 →'; }
      else { var e = el('div', 'ph-el-end'); var h = el('h4', '', 'Your three answers'); h.appendChild(el('span', '', '你的三個答案')); e.appendChild(h);
        e.appendChild(el('p', '', 'Trip 1: ' + ans.q1 + ' · Trip 2: ' + ans.q2 + ' · Trip 3: ' + (ans.q3 === 'death' ? 'death' : 'as good as survival') + '. Parfit’s own answers were: it does not matter whether we call it “me”; neither is strictly me and that is not a loss; as good as survival.'));
        zhp(e, '帕菲特自己的答案是：叫不叫它「我」並不重要；嚴格說兩個都不是我，而這並不是損失；跟存活差不多一樣好。'); out.appendChild(e); }
      i++; paint(); i--;
    }
    next.addEventListener('click', function () { i++; show(); });
    function reset() { i = 0; ans = {}; show(); }
    $('[data-tp-reset]', root).addEventListener('click', reset);
    reset();
    root.__lab = { state: function () { return { i: i, ans: ans, scene: root.getAttribute('data-scene') }; } };
  });

  /* ---- 通用：先選邊、再看回應（data-ph-pick） ---- */
  $$('[data-ph-pick]').forEach(function (root) {
    var btns = $$('[data-pick]', root), reps = $$('[data-pick-reply]', root), tried = $('[data-pick-tried]', root), seen = {};
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var i = b.getAttribute('data-pick'); seen[i] = true; b.classList.add('is-seen');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        reps.forEach(function (r) { r.hidden = r.getAttribute('data-pick-reply') !== i; });
        var k = Object.keys(seen).length;
        if (tried) tried.textContent = k === btns.length ? 'You have read all ' + k + ' replies. Notice that each answer was given a cost. · ' + k + ' 個回應你都讀過了。注意：每一個答案都被指出了代價。' : k + ' of ' + btns.length + ' read · 已讀 ' + k + '／' + btns.length;
      });
    });
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
