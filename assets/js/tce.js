/* 中醫入門 TCM Essentials — one module at a time, EN / 中英 / 中文 switch, quizzes, six widgets.
   Page HTML comes from build.py build_zhongyi_essentials(); widget data is the JSON in #tce-data.
   Progress lives only in this browser (localStorage, wrapped in try/catch). */
(function () {
  'use strict';
  var root = document.getElementById('tce');
  if (!root) return;
  var DATA = {};
  try { DATA = JSON.parse(document.getElementById('tce-data').textContent); } catch (e) {}

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function bi(t, tag) { tag = tag || 'span'; return '<' + tag + ' lang="en">' + t.en + '</' + tag + '><' + tag + ' lang="zh-Hant">' + t.zh + '</' + tag + '>'; }
  function $(s, el) { return (el || root).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || root).querySelectorAll(s)); }

  root.classList.add('js');

  /* ---------- language ---------- */
  function setLang(l) {
    root.setAttribute('data-lang', l);
    $$('[data-lang-set]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang-set') === l ? 'true' : 'false'); });
    store.set('tce-lang', l);
  }
  setLang(store.get('tce-lang', 'both'));
  $$('[data-lang-set]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang-set')); }); });

  /* ---------- progress ---------- */
  var mods = $$('.tce-mod').map(function (m) { return m.getAttribute('data-mod'); }); // "1".."12","final"
  var prog = store.get('tce-progress', { quiz: {} });
  if (!prog.quiz) prog.quiz = {};
  function paintProgress() {
    var done = 0;
    mods.forEach(function (k) {
      var q = prog.quiz[k];
      var a = $('.tce-rail a[data-go="' + k + '"]');
      if (a) a.classList.toggle('done', !!q);
      var s = $('[data-status="' + k + '"]');
      if (s) s.textContent = q ? '✓ ' + q.best + '/' + q.total : '';
      if (q) done++;
    });
    $('.tce-progress i').style.width = (100 * done / mods.length) + '%';
    var t = $('[data-progress-text]');
    if (t) t.innerHTML = done ? bi({ en: 'You have finished ' + done + ' of ' + mods.length + ' quizzes on this device.',
                                     zh: '你在這台裝置上已完成 ' + done + '／' + mods.length + ' 份測驗。' }) : '';
  }

  /* ---------- routing: one module at a time ---------- */
  var cur = null;
  function keyFromHash() {
    var h = location.hash.replace('#', '');
    if (h === 'final') return 'final';
    var m = /^m-(\d+)$/.exec(h);
    return m && mods.indexOf(m[1]) >= 0 ? m[1] : '0';
  }
  function show(k, scroll) {
    cur = k;
    root.classList.toggle('at-map', k === '0');
    $$('.tce-mod').forEach(function (m) { m.classList.toggle('on', m.getAttribute('data-mod') === k); });
    $('.tce-pager').classList.toggle('on', k !== '0');
    $$('.tce-rail a').forEach(function (a) { a.classList.toggle('cur', a.getAttribute('data-go') === k); });
    var i = mods.indexOf(k);
    var prev = $('[data-step="-1"]'), next = $('[data-step="1"]');
    prev.disabled = i <= 0;
    next.disabled = i < 0 || i >= mods.length - 1;
    var ca = $('.tce-rail a.cur');
    if (ca && ca.scrollIntoView) { var r = ca.parentNode; r.scrollLeft = ca.offsetLeft - r.clientWidth / 2; }
    if (k !== '0') initWidgets($('.tce-mod.on'));
    if (scroll) {
      var top = root.getBoundingClientRect().top + window.pageYOffset - 70;
      if (window.pageYOffset > top) window.scrollTo(0, top);
    }
  }
  function go(k) {
    var h = k === '0' ? '#start' : (k === 'final' ? '#final' : '#m-' + k);
    if (location.hash === h) { show(k, true); return; }
    history.pushState(null, '', h);
    show(k, true);
  }
  root.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]');
    if (a) { e.preventDefault(); go(a.getAttribute('data-go')); return; }
    var s = e.target.closest('[data-step]');
    if (s && !s.disabled) {
      var i = mods.indexOf(cur) + parseInt(s.getAttribute('data-step'), 10);
      if (i >= 0 && i < mods.length) go(mods[i]);
    }
  });
  window.addEventListener('popstate', function () { show(keyFromHash(), true); });
  window.addEventListener('hashchange', function () { show(keyFromHash(), true); });

  /* ---------- quizzes ---------- */
  function scoreText(n, total) {
    var en = 'You got ' + n + ' of ' + total + '.', zh = '答對 ' + n + '／' + total + ' 題。';
    if (n === total) { en += ' Perfect!'; zh += '全對！'; }
    else if (n / total >= 0.8) { en += ' Well done.'; zh += '很好。'; }
    else { en += ' Read the explanations, then try again.'; zh += '看看解說，再試一次。'; }
    return bi({ en: en, zh: zh });
  }
  $$('.tce-quiz').forEach(function (qz) {
    var key = qz.getAttribute('data-quiz');
    var qs = $$('.tce-q', qz);
    qz.addEventListener('click', function (e) {
      var b = e.target.closest('.tce-opt');
      if (b) {
        var q = b.closest('.tce-q');
        if (q.classList.contains('answered')) return;
        q.classList.add('answered');
        var a = parseInt(q.getAttribute('data-a'), 10), i = parseInt(b.getAttribute('data-i'), 10);
        var opts = $$('.tce-opt', q);
        opts.forEach(function (o) { o.disabled = true; });
        opts[a].classList.add('ok');
        if (i !== a) b.classList.add('bad'); else q.classList.add('right');
        $('.tce-why', q).hidden = false;
        var answered = $$('.tce-q.answered', qz).length;
        if (answered === qs.length) {
          var n = $$('.tce-q.right', qz).length;
          $('.tce-score', qz).innerHTML = scoreText(n, qs.length);
          var old = prog.quiz[key];
          prog.quiz[key] = { best: Math.max(n, old ? old.best : 0), total: qs.length };
          store.set('tce-progress', prog);
          paintProgress();
        }
        return;
      }
      if (e.target.closest('[data-quiz-reset]')) {
        qs.forEach(function (q) {
          q.classList.remove('answered', 'right');
          $$('.tce-opt', q).forEach(function (o) { o.disabled = false; o.classList.remove('ok', 'bad'); });
          $('.tce-why', q).hidden = true;
        });
        $('.tce-score', qz).innerHTML = '';
        qz.scrollIntoView({ block: 'start' });
      }
    });
  });

  /* ---------- widgets ---------- */
  var WIDGETS = {};
  function initWidgets(scope) {
    $$('[data-tce-widget]', scope).forEach(function (w) {
      if (w.getAttribute('data-ready')) return;
      var f = WIDGETS[w.getAttribute('data-tce-widget')];
      if (!f) return;
      w.setAttribute('data-ready', '1');
      try { f(w); } catch (err) { if (window.console) console.error('tce widget', err); }
    });
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var SVGNS = 'http://www.w3.org/2000/svg';

  /* Module 2: pick the more yang of each pair */
  var TAIJI = '<svg class="tce-taiji" viewBox="-50 -50 100 100" aria-hidden="true"><circle r="48" fill="#16302c"/>' +
    '<path d="M0 -48 A48 48 0 0 1 0 48 A24 24 0 0 1 0 0 A24 24 0 0 0 0 -48Z" fill="#fcfbf7"/>' +
    '<circle cy="-24" r="7" fill="#fcfbf7"/><circle cy="24" r="7" fill="#16302c"/><circle r="48" fill="none" stroke="#16302c" stroke-width="2"/></svg>';
  WIDGETS.yinyang = function (w) {
    var pairs = DATA.yinyang_pairs || [];
    var rows = pairs.map(function (p, n) {
      var flip = Math.random() < 0.5, a = flip ? 1 : 0, b = 1 - a;
      return '<div class="tce-yy-row" data-row="' + n + '">' +
        '<button type="button" data-pair="' + a + '">' + bi(p[a]) + '</button><span class="vs">vs</span>' +
        '<button type="button" data-pair="' + b + '">' + bi(p[b]) + '</button></div>';
    });
    w.innerHTML = '<div class="tce-w">' + TAIJI +
      '<p class="tce-w-t">' + bi({ en: 'Which is more yang?', zh: '哪一個比較偏陽？' }) + '</p>' +
      '<p class="tce-w-s">' + bi({ en: 'Tap the more yang one in each pair. Watch the last two closely.', zh: '每一組點選比較偏陽的那一個。最後兩組要仔細看。' }) + '</p>' +
      '<div class="tce-yy-grid">' + rows.join('') + '</div><p class="tce-yy-msg" aria-live="polite"></p></div>';
    var msg = $('.tce-yy-msg', w), solved = 0, last = pairs.length - 1;
    w.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pair]');
      if (!b) return;
      var row = b.closest('.tce-yy-row');
      if (row.classList.contains('done')) return;
      if (b.getAttribute('data-pair') === '0') {
        row.classList.add('done'); b.classList.add('ok');
        $$('[data-pair="1"]', row)[0].classList.add('yin');
        solved++;
        var n = parseInt(row.getAttribute('data-row'), 10);
        if (n === last || n === last - 1) {
          var both = $$('.tce-yy-row.done', w).filter(function (r) { var k = +r.getAttribute('data-row'); return k >= last - 1; }).length === 2;
          if (both) { msg.innerHTML = bi({ en: 'Notice: a 35°C day is yang next to 15°C, but yin next to a 40°C heat wave. Yin and yang are always relative.',
                                           zh: '注意：35°C 的天氣，和 15°C 比是陽，和 40°C 的熱浪比卻是陰。陰陽永遠是相對的。' }); return; }
        }
        msg.innerHTML = solved === pairs.length ? bi({ en: 'All sorted!', zh: '全部答對！' }) : '';
      } else {
        b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad');
        msg.innerHTML = bi({ en: 'Not quite — which one is warmer, brighter, more active, or more outward?', zh: '再想想：哪一個比較溫熱、明亮、活動、向外？' });
      }
    });
  };

  /* Module 5: five phases diagram */
  WIDGETS.wuxing = function (w) {
    var els = DATA.elements, labels = DATA.element_rows;
    var R = 120, cx = 160, cy = 160, nodeR = 34;
    var pos = els.map(function (e, i) { // Fire at the top, then clockwise: Earth, Metal, Water, Wood
      var ang = (-90 + (i - 1) * 72) * Math.PI / 180;
      return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) };
    });
    function shorten(p, q, d) { var dx = q.x - p.x, dy = q.y - p.y, L = Math.sqrt(dx * dx + dy * dy); return { x: p.x + dx * d / L, y: p.y + dy * d / L }; }
    var arcs = '';
    els.forEach(function (e, i) {
      var j = (i + 1) % 5, k = (i + 2) % 5;
      // generating: arc along the circle, clockwise
      var a0 = (-90 + (i - 1) * 72 + 17) * Math.PI / 180, a1 = (-90 + (j - 1) * 72 - 19) * Math.PI / 180;
      var R2 = R + 2;
      arcs += '<path class="arc gen" data-from="' + i + '" data-to="' + j + '" stroke="#3f8f4f" marker-end="url(#tce-ag)" d="M' +
        (cx + R2 * Math.cos(a0)).toFixed(1) + ' ' + (cy + R2 * Math.sin(a0)).toFixed(1) + ' A' + R2 + ' ' + R2 + ' 0 0 1 ' +
        (cx + R2 * Math.cos(a1)).toFixed(1) + ' ' + (cy + R2 * Math.sin(a1)).toFixed(1) + '"/>';
      var s = shorten(pos[i], pos[k], nodeR + 4), t = shorten(pos[k], pos[i], nodeR + 9);
      arcs += '<path class="arc ctl" data-from="' + i + '" data-to="' + k + '" stroke="#c2452d" stroke-dasharray="6 4" marker-end="url(#tce-ac)" d="M' +
        s.x.toFixed(1) + ' ' + s.y.toFixed(1) + ' L' + t.x.toFixed(1) + ' ' + t.y.toFixed(1) + '"/>';
    });
    var nodes = els.map(function (e, i) {
      return '<g class="node" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(e.name.en + ' ' + e.name.zh) + '">' +
        '<circle cx="' + pos[i].x.toFixed(1) + '" cy="' + pos[i].y.toFixed(1) + '" r="' + nodeR + '" fill="' + e.color + '" stroke="#fff" stroke-width="3"/>' +
        '<text x="' + pos[i].x.toFixed(1) + '" y="' + (pos[i].y - 2).toFixed(1) + '" text-anchor="middle" fill="#fff" font-size="22" font-weight="700" font-family="PingFang TC, sans-serif">' + e.name.zh + '</text>' +
        '<text x="' + pos[i].x.toFixed(1) + '" y="' + (pos[i].y + 16).toFixed(1) + '" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">' + e.name.en + '</text></g>';
    }).join('');
    var svg = '<svg viewBox="0 0 320 320" role="img" aria-label="Five phases: generating and controlling cycles · 五行相生相剋圖">' +
      '<defs><marker id="tce-ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3f8f4f"/></marker>' +
      '<marker id="tce-ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c2452d"/></marker></defs>' +
      arcs + nodes + '</svg>';
    var modes = [['both', { en: 'Both cycles', zh: '兩種都看' }], ['gen', { en: 'Generating 相生', zh: '相生' }], ['ctl', { en: 'Controlling 相剋', zh: '相剋' }]];
    w.innerHTML = '<div class="tce-w"><p class="tce-w-t">' + bi({ en: 'Explore the five phases', zh: '探索五行' }) + '</p>' +
      '<p class="tce-w-s">' + bi({ en: 'Green arrows: generating (mother → child). Red dashed arrows: controlling. Tap a phase to see what belongs to it.',
                                   zh: '綠色箭頭：相生（母→子）。紅色虛線：相剋。點一個五行，看看它對應哪些事物。' }) + '</p>' +
      '<div class="tce-chips">' + modes.map(function (m, n) { return '<button type="button" class="tce-chip" data-mode="' + m[0] + '" aria-pressed="' + (n === 0) + '">' + bi(m[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="tce-wx">' + svg + '<div class="tce-wx-card" aria-live="polite"></div></div></div>';
    var card = $('.tce-wx-card', w), mode = 'both', sel = 2;
    function rel(i) {
      var n = function (k) { return els[(k + 5) % 5].name; };
      return '<p class="tce-wx-rel">' + bi({
        en: '<b>' + els[i].name.en + '</b> is generated by ' + n(i - 1).en + ' and generates ' + n(i + 1).en + '. It controls ' + n(i + 2).en + ' and is controlled by ' + n(i - 2).en + '.',
        zh: '<b>' + els[i].name.zh + '</b>：' + n(i - 1).zh + '生' + els[i].name.zh + '，' + els[i].name.zh + '生' + n(i + 1).zh + '；' + els[i].name.zh + '剋' + n(i + 2).zh + '，' + n(i - 2).zh + '剋' + els[i].name.zh + '。'
      }) + '</p>';
    }
    function paint() {
      $$('.node', w).forEach(function (g) { g.classList.toggle('on', +g.getAttribute('data-i') === sel); });
      $$('.arc', w).forEach(function (p) {
        var kind = p.classList.contains('gen') ? 'gen' : 'ctl';
        var hidden = mode !== 'both' && mode !== kind;
        p.style.display = hidden ? 'none' : '';
        var touches = +p.getAttribute('data-from') === sel || +p.getAttribute('data-to') === sel;
        p.classList.toggle('dim', !touches);
      });
      var e = els[sel], rows = '';
      Object.keys(labels).forEach(function (k) { rows += '<dt>' + bi(labels[k]) + '</dt><dd>' + bi(e.rows[k]) + '</dd>'; });
      card.innerHTML = '<h4 style="color:' + e.color + '">' + e.name.zh + ' · ' + e.name.en + '</h4><dl>' + rows + '</dl>' + rel(sel);
      card.style.borderTop = '4px solid ' + e.color;
    }
    w.addEventListener('click', function (ev) {
      var g = ev.target.closest('.node');
      if (g) { sel = +g.getAttribute('data-i'); paint(); return; }
      var c = ev.target.closest('[data-mode]');
      if (c) { mode = c.getAttribute('data-mode'); $$('[data-mode]', w).forEach(function (b) { b.setAttribute('aria-pressed', b === c); }); paint(); }
    });
    w.addEventListener('keydown', function (ev) {
      var g = ev.target.closest('.node');
      if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); sel = +g.getAttribute('data-i'); paint(); }
    });
    paint();
  };

  /* Module 6: constitution reflection checklist */
  WIDGETS.constitution = function (w) {
    var cs = DATA.constitutions, items = [];
    for (var r = 0; r < 3; r++) cs.forEach(function (c, i) { items.push({ c: i, s: c.signs[r] }); }); // interleave so types aren't grouped
    w.innerHTML = '<div class="tce-w"><p class="tce-w-t">' + bi({ en: 'Which of these sound like you, most of the time?', zh: '哪些描述大多數時候符合你？' }) + '</p>' +
      '<p class="tce-w-s">' + bi({ en: 'Tick any that fit the last few months. Nothing is saved or sent anywhere.', zh: '勾選最近幾個月符合的項目。不會儲存，也不會傳送到任何地方。' }) + '</p>' +
      '<div class="tce-cs-list">' + items.map(function (it, n) {
        return '<label class="tce-cs-item"><input type="checkbox" data-c="' + it.c + '"><span>' + bi(it.s) + '</span></label>';
      }).join('') + '</div><div class="tce-cs-res" aria-live="polite"></div></div>';
    var res = $('.tce-cs-res', w);
    function paint() {
      var count = cs.map(function () { return 0; });
      $$('input[data-c]:checked', w).forEach(function (x) { count[+x.getAttribute('data-c')]++; });
      var order = cs.map(function (c, i) { return i; }).filter(function (i) { return count[i] > 0; })
        .sort(function (a, b) { return count[b] - count[a]; });
      if (!order.length) { res.innerHTML = ''; return; }
      res.innerHTML = '<p class="tce-w-t">' + bi({ en: 'Types whose descriptions you recognized', zh: '你在這些體質的描述裡看到自己' }) + '</p>' +
        order.map(function (i) {
          var c = cs[i];
          return '<div class="tce-cs-type"><h4><span>' + bi(c.name) + '</span><small>' + count[i] + '/3</small></h4>' +
            '<div class="tce-cs-bar"><i style="width:' + (100 * count[i] / 3) + '%"></i></div>' + bi(c.about, 'p') + bi(c.advice, 'p') + '</div>';
        }).join('') +
        '<p class="tce-w-s" style="margin-top:.4rem">' + bi({ en: 'A teaching tool, not an assessment. Only a licensed 中醫師 can assess constitution; new or worsening symptoms need a doctor.',
                                                             zh: '這是教學工具，不是判定。體質要由有執照的中醫師判斷；新出現或變嚴重的症狀，請看醫生。' }) + '</p>';
    }
    w.addEventListener('change', paint);
  };

  /* Module 7: food explorer */
  var NATURES = [['cold', { en: 'Cold', zh: '寒' }], ['cool', { en: 'Cool', zh: '涼' }], ['neutral', { en: 'Neutral', zh: '平' }], ['warm', { en: 'Warm', zh: '溫' }], ['hot', { en: 'Hot', zh: '熱' }]];
  var NCOLOR = { cold: '#2d5f8a', cool: '#4f9fb7', neutral: '#8a8f7a', warm: '#d99a2b', hot: '#c2452d' };
  var FLAV = { sour: { en: 'sour', zh: '酸' }, bitter: { en: 'bitter', zh: '苦' }, sweet: { en: 'sweet', zh: '甘' }, pungent: { en: 'pungent', zh: '辛' }, salty: { en: 'salty', zh: '鹹' } };
  WIDGETS.food = function (w) {
    var foods = DATA.foods, on = {};
    NATURES.forEach(function (n) { on[n[0]] = true; });
    w.innerHTML = '<div class="tce-w"><p class="tce-w-t">' + bi({ en: 'Food explorer: ' + foods.length + ' everyday foods', zh: '食物寒熱查詢：' + foods.length + ' 種日常食物' }) + '</p>' +
      '<p class="tce-w-s">' + bi({ en: 'Tap the scale to filter by nature, or search in English or Chinese.', zh: '點選寒熱刻度來篩選，或用中文、英文搜尋。' }) + '</p>' +
      '<div class="tce-fd-scale" role="group">' + NATURES.map(function (n) {
        return '<button type="button" class="n-' + n[0] + '" data-nat="' + n[0] + '" aria-pressed="true">' + n[1].zh + '<small>' + n[1].en + '</small></button>';
      }).join('') + '</div>' +
      '<div class="tce-fd-tools"><input type="search" placeholder="Search · 搜尋（e.g. ginger、薑）" aria-label="Search foods · 搜尋食物">' +
      '<label><input type="checkbox" data-plant> ' + bi({ en: 'Plant-based only', zh: '只看蔬食' }) + '</label></div>' +
      '<div class="tce-fd-list"></div><p class="tce-fd-count"></p></div>';
    var list = $('.tce-fd-list', w), q = $('input[type=search]', w), plant = $('[data-plant]', w), cnt = $('.tce-fd-count', w);
    function paint() {
      var s = q.value.trim().toLowerCase(), shown = 0, html = '';
      foods.forEach(function (f) {
        if (!on[f.nature]) return;
        if (plant.checked && !f.plant) return;
        if (s && (f.en.toLowerCase().indexOf(s) < 0 && f.zh.indexOf(s) < 0)) return;
        shown++;
        var nat = NATURES.filter(function (n) { return n[0] === f.nature; })[0][1];
        html += '<div class="tce-fd" style="border-top-color:' + NCOLOR[f.nature] + '"><b>' + esc(f.en) + ' <span class="zh">' + esc(f.zh) + '</span></b>' +
          '<div class="meta" style="color:' + NCOLOR[f.nature] + '">' + nat.zh + ' ' + nat.en + ' · ' +
          f.flavors.map(function (x) { return FLAV[x].zh; }).join('') + ' ' + f.flavors.map(function (x) { return FLAV[x].en; }).join('/') + '</div>' +
          bi(f.note, 'p') + (f.var ? '<span class="var">' + bi({ en: 'Sources differ', zh: '各家說法不一' }) + '</span>' : '') + '</div>';
      });
      list.innerHTML = html;
      cnt.innerHTML = bi({ en: 'Showing ' + shown + ' of ' + foods.length + '. Classifications follow common TCM references; books disagree on a few.',
                          zh: '顯示 ' + shown + '／' + foods.length + ' 種。分類依常見的中醫食療資料，少數食物各書說法不同。' });
    }
    w.addEventListener('click', function (e) {
      var b = e.target.closest('[data-nat]');
      if (!b) return;
      var k = b.getAttribute('data-nat');
      var all = NATURES.every(function (n) { return on[n[0]]; });
      if (all) { NATURES.forEach(function (n) { on[n[0]] = n[0] === k; }); } // first tap isolates one nature
      else { on[k] = !on[k]; if (!NATURES.some(function (n) { return on[n[0]]; })) NATURES.forEach(function (n) { on[n[0]] = true; }); }
      $$('[data-nat]', w).forEach(function (x) { x.setAttribute('aria-pressed', on[x.getAttribute('data-nat')] ? 'true' : 'false'); });
      paint();
    });
    q.addEventListener('input', paint);
    plant.addEventListener('change', paint);
    paint();
  };

  /* Module 8: organ clock */
  var PHASE_OF = { LU: 'metal', LI: 'metal', ST: 'earth', SP: 'earth', HT: 'fire', SI: 'fire', BL: 'water', KI: 'water', PC: 'fire', TE: 'fire', GB: 'wood', LR: 'wood' };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  WIDGETS.clock = function (w) {
    var segs = DATA.clock, colors = {};
    (DATA.elements || []).forEach(function (e) { colors[e.key] = e.color; });
    var cx = 160, cy = 160, r1 = 150, r0 = 78;
    function pt(h, r) { var a = (h / 24 * 360 - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    var paths = segs.map(function (s, i) {
      var h0 = s.start, h1 = s.start + 2;
      var a = pt(h0, r1), b = pt(h1, r1), c = pt(h1, r0), d = pt(h0, r0), m = pt(h0 + 1, (r0 + r1) / 2), m2 = pt(h0 + 1, (r0 + r1) / 2 + 18);
      return '<g data-i="' + i + '"><path class="seg" fill="' + colors[PHASE_OF[s.code]] + '" d="M' + a.join(' ') + ' A' + r1 + ' ' + r1 + ' 0 0 1 ' + b.join(' ') +
        ' L' + c.join(' ') + ' A' + r0 + ' ' + r0 + ' 0 0 0 ' + d.join(' ') + 'Z"/>' +
        '<text x="' + m[0].toFixed(1) + '" y="' + (m[1] - 4).toFixed(1) + '" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="PingFang TC, sans-serif">' + s.organ.zh + '</text>' +
        '<text x="' + m[0].toFixed(1) + '" y="' + (m[1] + 11).toFixed(1) + '" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">' + s.code + '</text></g>';
    }).join('');
    var ticks = [0, 6, 12, 18].map(function (h) { var p = pt(h, r0 - 14); return '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 4).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#3c534d" font-weight="700">' + pad(h) + ':00</text>'; }).join('');
    w.innerHTML = '<div class="tce-w"><p class="tce-w-t">' + bi({ en: 'The traditional organ clock', zh: '傳統的臟腑時鐘' }) + '</p>' +
      '<p class="tce-w-s">' + bi({ en: 'Midnight is at the top. Colors follow the five phases. Tap a segment — it opens on the current hour.', zh: '半夜在最上方，顏色依五行。點選任一格；一打開會停在現在的時辰。' }) + '</p>' +
      '<div class="tce-ck"><svg viewBox="0 0 320 320" role="img" aria-label="Organ clock · 臟腑時鐘">' + paths + ticks +
      '<line class="hand" x1="160" y1="160" x2="160" y2="88" stroke="#16302c" stroke-width="3" stroke-linecap="round"/><circle cx="160" cy="160" r="5" fill="#16302c"/></svg>' +
      '<div class="tce-ck-card" aria-live="polite"></div></div></div>';
    var card = $('.tce-ck-card', w), now = new Date(), hr = now.getHours() + now.getMinutes() / 60;
    var hand = $('.hand', w), hp = pt(hr, r0 - 4);
    hand.setAttribute('x2', hp[0].toFixed(1)); hand.setAttribute('y2', hp[1].toFixed(1));
    var nowI = 0;
    segs.forEach(function (s, i) { var d = (hr - s.start + 24) % 24; if (d < 2) nowI = i; });
    function pick(i) {
      var s = segs[i];
      $$('.seg', w).forEach(function (p, k) { p.classList.toggle('on', k === i); });
      card.innerHTML = '<p class="time">' + pad(s.start) + ':00 – ' + pad((s.start + 2) % 24) + ':00</p>' +
        '<p class="org">' + bi({ en: s.organ.en + ' channel (' + s.code + ')', zh: s.organ.zh + '經・' + s.branch + '時' }) + '</p>' + bi(s.note, 'p') +
        '<p class="tce-ck-now">' + bi({ en: 'Now it is ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ' — the ' + segs[nowI].organ.en + ' hour, in the tradition.',
                                         zh: '現在是 ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + '，傳統上屬於' + segs[nowI].organ.zh + '經的時辰。' }) + '</p>';
    }
    w.addEventListener('click', function (e) { var g = e.target.closest('g[data-i]'); if (g) pick(+g.getAttribute('data-i')); });
    pick(nowI);
  };

  /* Module 9: five acupressure points */
  var REGION = {
    // back of the right hand, fingers up
    hand: '<path class="limb" d="M60 200 L58 120 Q52 112 40 100 L18 70 Q12 60 20 55 Q28 50 36 60 L62 92 L64 40 Q64 28 74 28 Q84 28 84 40 L86 88 L90 22 Q90 10 100 10 Q110 10 110 22 L110 88 L116 30 Q117 19 126 19 Q135 20 134 31 L130 92 L140 52 Q143 42 151 44 Q159 47 156 58 L144 120 Q140 150 132 170 L130 200Z"/>' +
          '<path class="bone" d="M84 98 L72 160"/><text class="lbl" x="4" y="44">thumb 拇指</text><text class="lbl" x="88" y="214">back of hand 手背</text>',
    // inner (palm side) forearm, hand at the bottom
    wrist: '<path class="limb" d="M62 10 L118 10 Q124 80 122 140 L130 150 Q150 170 140 205 L60 205 Q46 172 58 150 L62 140 Q58 80 62 10Z"/>' +
           '<path d="M58 146 L124 146" stroke="#b99772" stroke-width="2"/><path class="bone" d="M84 30 L84 140 M98 30 L98 140"/>' +
           '<text class="lbl" x="128" y="150">crease</text><text class="lbl" x="128" y="163">腕橫紋</text><text class="lbl" x="78" y="184">palm 掌</text><text class="lbl" x="58" y="222">inner forearm 前臂內側</text>',
    // front of the right lower leg, knee at the top
    leg: '<path class="limb" d="M50 10 Q90 0 130 10 Q138 40 130 70 Q126 130 116 210 L74 210 Q62 130 56 70 Q44 40 50 10Z"/>' +
         '<ellipse cx="90" cy="38" rx="20" ry="16" fill="#f7ecdf" stroke="#b99772" stroke-width="2"/><path class="bone" d="M88 62 Q86 140 92 205"/>' +
         '<text class="lbl" x="114" y="34">kneecap</text><text class="lbl" x="114" y="46">膝蓋骨</text><text class="lbl" x="96" y="200">shin 脛骨</text>' +
         '<text class="lbl" x="4" y="150">outer</text><text class="lbl" x="4" y="163">side 外側</text><text class="lbl" x="30" y="222">right leg, front 右小腿前面</text>',
    // inner side of the left ankle (toes to the right, heel to the left)
    ankle: '<path class="limb" d="M70 10 L120 10 Q122 100 124 150 Q132 172 168 186 Q178 196 168 205 L40 205 Q30 190 48 172 Q66 150 68 120 Q66 60 70 10Z"/>' +
           '<circle cx="104" cy="168" r="11" fill="#f7ecdf" stroke="#b99772" stroke-width="2"/><path class="bone" d="M106 20 L106 150"/>' +
           '<text class="lbl" x="120" y="160">inner ankle</text><text class="lbl" x="120" y="172">內踝</text><text class="lbl" x="22" y="222">left foot, inner side 左腳內側</text>',
    // top of the right foot, toes up
    foot: '<path class="limb" d="M50 210 Q36 150 42 90 Q44 50 52 30 Q58 14 72 16 Q80 18 82 30 L88 22 Q96 14 104 22 L110 26 Q118 20 124 28 L130 34 Q138 30 142 40 L146 50 Q154 50 154 62 Q150 120 140 160 Q134 196 130 210Z"/>' +
          '<path class="bone" d="M66 40 L76 120 M90 34 L92 120 M108 36 L104 120 M126 44 L114 120"/>' +
          '<text class="lbl" x="40" y="12">big toe 大趾</text><text class="lbl" x="70" y="222">top of foot 足背</text>'
  };
  var DOT = { hand: [76, 112], wrist: [91, 112], leg: [72, 104], ankle: [97, 116], foot: [83, 104] }; // leg: outer side of the right shin is the viewer's left
  WIDGETS.points = function (w) {
    var pts = DATA.points, sel = 0, timer = null;
    w.innerHTML = '<div class="tce-w"><div class="tce-chips">' + pts.map(function (p, i) {
        return '<button type="button" class="tce-chip" data-p="' + i + '" aria-pressed="' + (i === 0) + '">' + p.code + ' ' + p.zh + '</button>';
      }).join('') + '</div><div class="tce-pt"></div></div>';
    var box = $('.tce-pt', w);
    function paint() {
      var p = pts[sel], d = DOT[p.region];
      box.innerHTML = '<svg viewBox="0 0 180 230" role="img" aria-label="' + esc(p.code + ' ' + p.zh) + '">' + REGION[p.region] +
        '<circle class="ring" cx="' + d[0] + '" cy="' + d[1] + '" r="9"/><circle class="dot" cx="' + d[0] + '" cy="' + d[1] + '" r="7"/></svg>' +
        '<div><h4>' + p.code + ' · ' + p.zh + ' <small>' + p.py + ' · “' + p.en + '”</small></h4><dl>' +
        '<dt>' + bi({ en: 'Where', zh: '位置' }) + '</dt><dd>' + bi(p.loc) + '</dd>' +
        '<dt>' + bi({ en: 'Traditional use', zh: '傳統用途' }) + '</dt><dd>' + bi(p.use) + '</dd>' +
        (p.warn ? '<dt>' + bi({ en: 'Caution', zh: '注意' }) + '</dt><dd class="warn">' + bi(p.warn) + '</dd>' : '') + '</dl>' +
        '<p class="tce-w-s" style="margin:.8rem 0 0">' + bi({ en: 'The sketch is simplified; go by the written location.', zh: '圖是簡化示意，請以文字描述的位置為準。' }) + '</p>' +
        '<div class="tce-pt-timer"><button type="button" class="tce-btn" data-press>' + bi({ en: 'Press for 60 seconds', zh: '按壓 60 秒' }) + '</button><output aria-live="off"></output></div></div>';
    }
    w.addEventListener('click', function (e) {
      var c = e.target.closest('[data-p]');
      if (c) { sel = +c.getAttribute('data-p'); clearInterval(timer); $$('[data-p]', w).forEach(function (b) { b.setAttribute('aria-pressed', b === c); }); paint(); return; }
      var b = e.target.closest('[data-press]');
      if (b) {
        clearInterval(timer);
        var left = 60, out = $('output', w);
        out.textContent = left + 's';
        timer = setInterval(function () {
          left--; out.textContent = left > 0 ? left + 's' : '✓';
          if (left <= 0) clearInterval(timer);
        }, 1000);
      }
    });
    paint();
  };

  paintProgress();
  show(keyFromHash(), false);
  if (keyFromHash() !== '0') { var t = root.getBoundingClientRect().top + window.pageYOffset - 70; window.scrollTo(0, t); }
})();
