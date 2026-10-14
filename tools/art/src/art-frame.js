/*
 * 美術 Art · 第七課〈主角該放在哪裡？〉：一個畫框，裡面幾樣可以拖動的灰階形狀；頁面即時算出「視覺重量」的重心，
 * 畫在畫框上（◆）和下面的蹺蹺板上（沒有 3D；SVG，不需要 WebGL，也不載 three.js）。
 *
 * 重量的算法在 frame.js（面積 × 和紙的明度差），是示意模型，頁面的模型說明講明了。
 * 色覺差異：形狀都是灰色，每一樣有字母和名稱；重心用 ◆ 和文字（偏左／偏右／接近中央、百分比）表示，不靠顏色。
 * 鍵盤：每個形狀可以 Tab 到，用方向鍵移動（按住 Shift 一次移得多）。
 *
 * 除錯：document.querySelector('[data-artframe-lab]').__lab
 *   state、load('lean'|'sym'|'asym'|'radial'|'thirds')、move(id, x, y)、items()、balance()＝frame.js 算的重心、
 *   setGrid(bool)、setMark(bool)、demo('seesaw'|'sym'|'radial'|'thirds')、markXY()＝畫面上 ◆ 實際的位置
 * 小互動：[data-ar-bal].__bal（round()、answer('A'|'B')、correct()、next()）、
 *         [data-ar-crop].__crop（set(s, u, v)、rect()、check()、next()、state）
 */
import { css } from './color.js';
import {
  BAL_ROUNDS, CROP_TASKS, FRAME, PRESETS, SCENE, SCENE_ITEMS, THIRD_NAMES, balance, boatShare, clampTo, cropRect, cropUV,
  emptyShare, grayOfL, nearThird, thirds, verdict,
} from './frame.js';

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const PAPER = css(grayOfL(95));
// 重心的位置（名詞片語）與畫面的狀態（整句的後半）
const sideText = (v) => (v.side === 'center' ? [`near the middle (${v.pct}% off)`, `接近中央（差 ${v.pct}%）`]
  : [`${v.pct}% ${v.side} of the middle`, `中線${v.side === 'left' ? '偏左' : '偏右'} ${v.pct}%`]);
const picText = (v) => (v.side === 'center' ? ['has its balance point near the middle', '的重心接近中央'] : [`leans ${v.side} by ${v.pct}%`, `${v.side === 'left' ? '偏左' : '偏右'} ${v.pct}%`]);

/** 把一組形狀畫進 SVG 的 <g>；回傳 id → 元素。 */
function drawItems(g, items, { labels = true, focus = false } = {}) {
  g.innerHTML = '';
  const map = {};
  for (const it of items) {
    const grp = el('g', { class: 'ar-fm-it', 'data-id': it.id }, g);
    if (focus) { grp.setAttribute('tabindex', '0'); grp.setAttribute('role', 'button'); grp.setAttribute('aria-label', `Shape ${it.id}, ${it.en}. Use the arrow keys to move it · 形狀 ${it.id}，${it.zh}；用方向鍵移動`); }
    const fill = css(grayOfL(it.L)), st = { fill, stroke: '#1d2230', 'stroke-width': 3 };
    if (it.shape === 'circle') el('circle', { cx: it.x, cy: it.y, r: it.r, ...st }, grp);
    else if (it.shape === 'rect') el('rect', { x: it.x - it.w / 2, y: it.y - it.h / 2, width: it.w, height: it.h, rx: 6, ...st }, grp);
    else el('polygon', { points: `${it.x},${it.y - it.h / 2} ${it.x + it.w / 2},${it.y + it.h / 2} ${it.x - it.w / 2},${it.y + it.h / 2}`, ...st }, grp);
    if (labels) {
      const lbl = it.id.replace(/\d+$/, '');
      el('circle', { cx: it.x, cy: it.y, r: 19, fill: '#10131c', stroke: '#fff', 'stroke-width': 2.5 }, grp);
      el('text', { x: it.x, y: it.y + 7, 'text-anchor': 'middle', 'font-size': 21, 'font-weight': 800, fill: '#fff' }, grp).textContent = lbl;
    }
    map[it.id] = grp;
  }
  return map;
}
function drawGrid(g, rect, on) {
  g.innerHTML = '';
  if (!on) return;
  const t = thirds(rect), sw = rect.w / 400;
  t.xs.forEach((x) => el('line', { x1: x, y1: rect.y, x2: x, y2: rect.y + rect.h, stroke: '#1d2230', 'stroke-width': 2 * sw, 'stroke-dasharray': `${10 * sw} ${8 * sw}`, opacity: 0.7 }, g));
  t.ys.forEach((y) => el('line', { x1: rect.x, y1: y, x2: rect.x + rect.w, y2: y, stroke: '#1d2230', 'stroke-width': 2 * sw, 'stroke-dasharray': `${10 * sw} ${8 * sw}`, opacity: 0.7 }, g));
  t.points.forEach(([x, y]) => el('circle', { cx: x, cy: y, r: 7 * sw, fill: 'none', stroke: '#1d2230', 'stroke-width': 2.5 * sw }, g));
}
/** 重心記號：◆ 加一圈白邊，旁邊不放字（文字在下面）。 */
function drawMark(g, b, show = true, s = 1) {
  g.innerHTML = '';
  if (!show) return;
  const { cx, cy } = b, r = 17 * s;
  el('line', { x1: FRAME.w / 2, y1: 0, x2: FRAME.w / 2, y2: FRAME.h, stroke: '#1d2230', 'stroke-width': 1.5 * s, 'stroke-dasharray': `${4 * s} ${6 * s}`, opacity: 0.55 }, g);
  el('polygon', { points: `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`, fill: '#ffd36e', stroke: '#10131c', 'stroke-width': 3.5 * s }, g);
}
/** 蹺蹺板：支點在中央，◆ 在重心的位置，板子朝重的那一邊傾斜（最多 8 度）。 */
function drawBeam(svg, b) {
  svg.innerHTML = '';
  const W = 800, mid = W / 2, y = 34, tilt = Math.max(-8, Math.min(8, b.dx * 16));
  el('polygon', { points: `${mid},${y} ${mid - 18},${y + 26} ${mid + 18},${y + 26}`, fill: '#9fb0cf' }, svg);
  const beam = el('g', { transform: `rotate(${tilt.toFixed(2)} ${mid} ${y})` }, svg);
  el('rect', { x: 30, y: y - 6, width: W - 60, height: 8, rx: 4, fill: '#e8ecf5' }, beam);
  const mx = mid + b.dx * (W / 2 - 40);
  el('polygon', { points: `${mx},${y - 26} ${mx + 13},${y - 13} ${mx},${y} ${mx - 13},${y - 13}`, fill: '#ffd36e', stroke: '#10131c', 'stroke-width': 2.5 }, beam);
}

// ── 主模型 ───────────────────────────────────────────────────────
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const svg = $('.ar-fm-svg');
  const L = { grid: el('g', {}, svg), items: el('g', {}, svg), mark: el('g', {}, svg) };
  const R = { beam: $('.ar-fm-beam'), read: $('.ar-fm-read'), table: $('.ar-fm-table tbody'), msg: $('.ar-msg'), empty: $('.ar-fm-empty') };
  const state = { preset: 'lean', items: [], grid: false, mark: true, drag: null };
  let map = {};
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };

  function update() {
    const b = balance(state.items), v = verdict(b.dx), [en, zh] = sideText(v);
    drawMark(L.mark, b, state.mark);
    drawBeam(R.beam, b);
    R.read.innerHTML = state.mark ? bi(`Balance point ◆: ${en}.`, `重心 ◆：${zh}。`) : bi('The balance point is hidden. Guess where it is, then switch it back on.', '重心藏起來了。先猜它在哪裡，再打開來看。');
    R.beam.parentElement.hidden = !state.mark;
    R.empty.textContent = `Empty space · 空白: ${Math.round(emptyShare(state.items) * 100)}%`;
    const tot = b.total || 1;
    R.table.innerHTML = b.parts.map((p) => {
      const it = state.items.find((i) => i.id === p.id), k = nearThird(it.x, it.y);
      return `<tr><td><span class="ar-dp-n">${it.id.replace(/\d+$/, '')}</span></td><td>${it.en}<span class="zh">${it.zh}</span></td>`
        + `<td><span class="ar-dp-sw" style="background:${css(grayOfL(it.L))}"></span>L* ${it.L}</td><td>${Math.round((p.area / (FRAME.w * FRAME.h)) * 100)}%</td>`
        + `<td><b>${Math.round((p.weight / tot) * 100)}%</b></td><td>${k >= 0 ? `● ${THIRD_NAMES[k].en}<span class="zh">${THIRD_NAMES[k].zh}</span>` : '–'}</td></tr>`;
    }).join('');
    return b;
  }
  function render() {
    map = drawItems(L.items, state.items, { focus: true });
    drawGrid(L.grid, FRAME, state.grid);
    Object.entries(map).forEach(([id, g]) => {
      g.addEventListener('pointerdown', (e) => start(e, id));
      g.addEventListener('keydown', (e) => key(e, id));
    });
    return update();
  }
  function place(id, x, y) {
    const it = state.items.find((i) => i.id === id); if (!it) return;
    [it.x, it.y] = clampTo(Math.round(x), Math.round(y));
    const g = map[id];
    g.setAttribute('transform', '');
    // 只移動這一個形狀：重畫它的子元素位置
    const [shape, badge, txt] = g.children;
    if (it.shape === 'circle') { shape.setAttribute('cx', it.x); shape.setAttribute('cy', it.y); }
    else if (it.shape === 'rect') { shape.setAttribute('x', it.x - it.w / 2); shape.setAttribute('y', it.y - it.h / 2); }
    else shape.setAttribute('points', `${it.x},${it.y - it.h / 2} ${it.x + it.w / 2},${it.y + it.h / 2} ${it.x - it.w / 2},${it.y + it.h / 2}`);
    badge.setAttribute('cx', it.x); badge.setAttribute('cy', it.y); txt.setAttribute('x', it.x); txt.setAttribute('y', it.y + 7);
    return update();
  }
  const toSvg = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  function start(e, id) {
    e.preventDefault(); stopDemo();
    const it = state.items.find((i) => i.id === id), p = toSvg(e);
    state.drag = { id, ox: it.x - p.x, oy: it.y - p.y };
    map[id].classList.add('is-drag'); try { svg.setPointerCapture(e.pointerId); } catch (_) { /* 合成事件沒有真的指標 */ }
  }
  svg.addEventListener('pointermove', (e) => { if (!state.drag) return; const p = toSvg(e); place(state.drag.id, p.x + state.drag.ox, p.y + state.drag.oy); });
  const end = () => {
    if (!state.drag) return;
    map[state.drag.id].classList.remove('is-drag');
    const b = balance(state.items), v = verdict(b.dx), [en, zh] = picText(v);
    say(`You moved shape ${state.drag.id.replace(/\d+$/, '')}. The picture now ${en}.`, `你移動了形狀 ${state.drag.id.replace(/\d+$/, '')}。畫面現在${zh}。`);
    state.drag = null;
  };
  svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
  function key(e, id) {
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (!d) return;
    e.preventDefault(); stopDemo();
    const it = state.items.find((i) => i.id === id), s = e.shiftKey ? 40 : 10;
    place(id, it.x + d[0] * s, it.y + d[1] * s);
    const v = verdict(balance(state.items).dx), [en, zh] = picText(v);
    say(`Shape ${id.replace(/\d+$/, '')} is at ${it.x}, ${it.y}. The picture now ${en}.`, `形狀 ${id.replace(/\d+$/, '')} 在 ${it.x}, ${it.y}。畫面現在${zh}。`);
  }

  const MSG = {
    lean: ['Everything is crowded on the left, so the balance point ◆ is far to the left. Drag the shapes and watch it move.', '東西全擠在左邊，所以重心 ◆ 偏左很多。拖動形狀，看重心怎麼跑。'],
    sym: ['Symmetrical balance: the left half is a mirror image of the right half. The balance point sits exactly on the center line.', '對稱的平衡：左半邊是右半邊的鏡子。重心剛好落在中線上。'],
    asym: ['Asymmetrical balance: the two sides are different, but the picture still balances. Big and pale A sits near the middle, and small and dark B sits far out, like a light child at the end of a seesaw.', '不對稱的平衡：兩邊不一樣，畫面卻還是平衡的。大而淡的 A 靠近中間，小而深的 B 放得遠，就像蹺蹺板上輕的小孩坐在最尾端。'],
    radial: ['Radial balance: shapes spread out evenly from a center, like petals or spokes. It balances in every direction.', '放射狀的平衡：形狀從中心均勻地往外排開，像花瓣或車輪的輻條。每一個方向都平衡。'],
    thirds: ['The thirds lines divide the frame into nine equal parts. Small dark B sits where two lines cross, not in the middle. That is a habit many painters and photographers use, not a law.', '三分線把畫框分成一樣大的九格。小而深的 B 放在兩條線的交點上，而不是正中央。這是許多畫家和攝影師的習慣，不是定律。'],
  };
  function load(k, quiet = false) {
    state.preset = k; state.items = PRESETS[k].map((it) => ({ ...it }));
    $$('[data-preset]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-preset') === k)));
    const b = render();
    if (!quiet && MSG[k]) say(...MSG[k]);
    return b;
  }
  function setGrid(on) { state.grid = on; const c = $('[data-t="grid"]'); if (c) c.checked = on; drawGrid(L.grid, FRAME, on); }
  function setMark(on) { state.mark = on; const c = $('[data-t="mark"]'); if (c) c.checked = on; update(); }
  $$('[data-preset]').forEach((b) => b.addEventListener('click', () => { stopDemo(); load(b.getAttribute('data-preset')); }));
  $('[data-t="grid"]').addEventListener('change', (e) => setGrid(e.target.checked));
  $('[data-t="mark"]').addEventListener('change', (e) => setMark(e.target.checked));

  // 示範：從一個擺法慢慢移到另一個（同 id 的形狀內插）
  let raf = 0, timers = [];
  function stopDemo() { cancelAnimationFrame(raf); timers.forEach(clearTimeout); timers = []; }
  function glide(to, ms = 2600, done) {
    const from = state.items.map((it) => ({ ...it })), target = PRESETS[to].map((it) => ({ ...it })), t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms), k = ease(t);
      state.items = target.map((b) => {
        const a = from.find((i) => i.id === b.id) || b, o = { ...b };
        for (const p of ['x', 'y', 'r', 'w', 'h', 'L']) if (typeof b[p] === 'number' && typeof a[p] === 'number') o[p] = a[p] + (b[p] - a[p]) * k;
        return o;
      });
      render();
      if (t < 1) raf = requestAnimationFrame(step);
      else { state.items = target; state.preset = to; $$('[data-preset]').forEach((x) => x.setAttribute('aria-pressed', String(x.getAttribute('data-preset') === to))); render(); if (done) done(); }
    };
    raf = requestAnimationFrame(step);
  }
  const later = (s, fn) => timers.push(setTimeout(fn, s * 1000));
  const DEMO = {
    seesaw() { stopDemo(); setMark(true); load('lean'); later(2.5, () => { say('Now watch: big and pale A slides toward the middle, and small and dark B goes far out to the right.', '看好：大而淡的 A 往中間移，小而深的 B 移到右邊很遠的地方。'); glide('asym', 3200, () => say(...MSG.asym)); }); },
    sym() { stopDemo(); setMark(true); load('sym'); },
    radial() { stopDemo(); setMark(true); load('radial'); },
    thirds() { stopDemo(); setMark(true); setGrid(true); load('lean', true); say('The thirds lines are on. Watch where B goes.', '三分線打開了。看 B 移到哪裡。'); later(1.8, () => glide('thirds', 2800, () => say(...MSG.thirds))); },
  };
  document.querySelectorAll('[data-lab-demo]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const v = b.getAttribute('data-lab-demo'); if (DEMO[v]) DEMO[v]();
  }));

  load('lean');
  root.classList.add('al-ready');
  root.__lab = {
    state, load, setGrid, setMark, items: () => state.items.map((it) => ({ ...it })), balance: () => balance(state.items),
    move: (id, x, y) => place(id, x, y), demo: (v) => DEMO[v] && DEMO[v](), stop: stopDemo,
    markXY: () => { const p = L.mark.querySelector('polygon'); if (!p) return null; const pts = p.getAttribute('points').split(' ').map((s) => s.split(',').map(Number)); return [pts[0][0], (pts[0][1] + pts[2][1]) / 2]; },
  };
}

// ── 小互動一：哪一張比較平衡？ ─────────────────────────────────────
function initBal(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-bl-k'), score: $('.ar-bl-score'), steps: $('.ar-bl-steps'), msg: $('.ar-bl-msg'), next: $('.ar-bl-next'), opts: Array.from(root.querySelectorAll('[data-pick]')) };
  const P = ['A', 'B'].map((k) => { const s = root.querySelector(`.ar-bl-svg[data-p="${k}"]`); return { svg: s, items: el('g', {}, s), mark: el('g', {}, s), read: root.querySelector(`.ar-bl-read[data-p="${k}"]`) }; });
  const NQ = BAL_ROUNDS.length, state = { i: 0, right: 0, done: 0, solved: false };
  E.steps.innerHTML = BAL_ROUNDS.map(() => '<i></i>').join('');
  const round = () => BAL_ROUNDS[state.i];
  const WHY = {
    center: ['One shape alone balances on its own center. In the middle, the picture is balanced. Off to one side, it leans.', '只有一個形狀時，重心就在它自己的中心。放在中間就平衡；放在一邊，畫面就往那邊倒。'],
    seesaw: ['Like a seesaw: the big pale circle near the middle is balanced by the small dark circle far out on the other side. Put the small one on the same side and everything tips.', '像蹺蹺板：靠近中間的大淡圓，被另一邊遠遠的小深圓平衡了。把小圓放到同一邊，整個就倒向那邊。'],
    mirror: ['Two equal shapes at the same distance on each side balance exactly. That is symmetry. Both on one side, and the picture leans.', '兩個一樣的形狀，左右各一個、離中線一樣遠，就剛好平衡，這是對稱。兩個都放在同一邊，畫面就偏了。'],
    dark: ['The circles are the same size, but in this model a dark shape weighs more than a pale one. Two dark circles balance. A dark one and a pale one do not.', '兩個圓一樣大，但在這個模型裡，深的比淡的重。兩個深的圓會平衡；一深一淡就不會。'],
    radial: ['Shapes spread evenly around a center balance in every direction. Take some away from one side, and the balance tips the other way.', '在中心四周均勻排開的形狀，每個方向都平衡。從一邊拿掉幾個，重心就往另一邊倒。'],
  };
  function draw(reveal) {
    const r = round();
    ['a', 'b'].forEach((k, n) => {
      drawItems(P[n].items, r[k], { labels: false });
      const b = balance(r[k]); drawMark(P[n].mark, b, reveal);
      const [en, zh] = sideText(verdict(b.dx));
      P[n].read.innerHTML = reveal ? bi(`◆ ${en}`, `◆ ${zh}`) : '&nbsp;';
    });
  }
  function show() {
    E.k.textContent = `Question ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 題（共 ${NQ} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); b.querySelector('.ar-pk-mk').textContent = ''; });
    E.next.hidden = true;
    E.msg.innerHTML = bi('Which picture looks more balanced? Decide first. Then the page shows where each balance point ◆ is.', '哪一張看起來比較平衡？先自己決定，頁面再標出兩張的重心 ◆ 在哪裡。');
    draw(false);
  }
  function answer(k) {
    if (state.solved) return null;
    const r = round(), ok = k === r.answer;
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.forEach((b) => { b.disabled = true; });
    const good = E.opts.find((b) => b.getAttribute('data-pick') === r.answer);
    good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ more balanced · 比較平衡';
    if (!ok) { const b = E.opts.find((x) => x.getAttribute('data-pick') === k); b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ leans more · 比較偏'; }
    draw(true);
    const last = state.i === NQ - 1, w = WHY[r.why];
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} Picture ${r.answer} is more balanced. ${w[0]}${last ? ` You got ${state.right} of ${NQ}.` : ''}`, `${ok ? '✓' : '✗'} 圖 ${r.answer} 比較平衡。${w[1]}${last ? `${NQ} 題你答對了 ${state.right} 題。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; show(); }
  E.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__bal = { state, round, answer, correct: () => round().answer, next: () => go(Math.min(NQ - 1, state.i + 1)) };
}

// ── 小互動二：裁切看看 ─────────────────────────────────────────────
function drawScene(g) {
  g.innerHTML = '';
  const { w, h, horizon, shore } = SCENE;
  el('rect', { x: 0, y: 0, width: w, height: horizon, fill: '#d4e5f3' }, g);
  el('rect', { x: 0, y: horizon, width: w, height: h - horizon, fill: '#7fa7c4' }, g);
  el('path', { d: `M0 ${shore} L520 ${shore} Q600 ${shore + 30} 660 ${horizon + 120} L700 ${h} L0 ${h} Z`, fill: '#c9b98d', stroke: '#8a7a50', 'stroke-width': 3 }, g);
  for (let k = 0; k < 9; k++) el('path', { d: `M${760 + k * 95} ${horizon + 60 + (k % 3) * 70} q20 -8 40 0 q20 8 40 0`, fill: 'none', stroke: '#eef4fa', 'stroke-width': 3, opacity: 0.8 }, g);
  const it = (id) => SCENE_ITEMS.find((x) => x.id === id);
  const sun = it('sun'); el('circle', { cx: sun.x, cy: sun.y, r: sun.r, fill: '#fff4c7', stroke: '#c9a646', 'stroke-width': 4 }, g);
  const t = it('tree'), tx = t.x, ty = t.y - t.h / 2;
  el('rect', { x: tx - 12, y: ty + 110, width: 24, height: 90, fill: '#6b4f33' }, g);
  el('ellipse', { cx: tx, cy: ty + 70, rx: 55, ry: 70, fill: '#4f7a4a', stroke: '#2e4a2b', 'stroke-width': 4 }, g);
  const hs = it('house'), hx = hs.x - hs.w / 2, hy = hs.y - hs.h / 2;
  el('rect', { x: hx + 10, y: hy + 45, width: hs.w - 20, height: hs.h - 45, fill: '#f2e6d0', stroke: '#6b5a40', 'stroke-width': 4 }, g);
  el('polygon', { points: `${hx},${hy + 50} ${hs.x},${hy} ${hx + hs.w},${hy + 50}`, fill: '#a3523d', stroke: '#6b2f22', 'stroke-width': 4 }, g);
  el('rect', { x: hs.x - 14, y: hy + 70, width: 28, height: 40, fill: '#6b5a40' }, g);
  const b = it('boat'), bx = b.x - b.w / 2, by = b.y - b.h / 2;
  el('polygon', { points: `${b.x + 4},${by} ${b.x + 4},${by + 92} ${bx + b.w - 18},${by + 92}`, fill: '#fbfbf7', stroke: '#1d2230', 'stroke-width': 4 }, g);
  el('line', { x1: b.x, y1: by, x2: b.x, y2: by + 96, stroke: '#1d2230', 'stroke-width': 5 }, g);
  el('polygon', { points: `${bx},${by + 96} ${bx + b.w},${by + 96} ${bx + b.w - 24},${by + b.h} ${bx + 24},${by + b.h}`, fill: '#26324a', stroke: '#10131c', 'stroke-width': 4 }, g);
}
function initCrop(root) {
  const $ = (s) => root.querySelector(s);
  const over = $('.ar-cr-over'), view = $('.ar-cr-view');
  const G = { scene: el('g', {}, over), labels: el('g', {}, over), shade: el('path', { fill: 'rgba(16,19,28,.55)', 'fill-rule': 'evenodd' }, over), box: el('rect', { fill: 'none', stroke: '#ffd36e', 'stroke-width': 8, class: 'ar-cr-box' }, over) };
  const V = { scene: el('g', {}, view), grid: el('g', {}, view) };
  drawScene(G.scene); drawScene(V.scene);
  SCENE_ITEMS.forEach((it) => {
    // 字要夠大：手機上整片風景只有三百多像素寬
    const half = it.shape === 'circle' ? it.r : it.h / 2, above = it.id === 'tree';
    const tx = it.x, ty = above ? it.y - half - 24 : it.y + half + 62, wd = 27 * it.en.length + 50 * it.zh.length + 50;
    el('rect', { x: tx - wd / 2, y: ty - 46, width: wd, height: 62, rx: 31, fill: '#10131c', opacity: 0.88 }, G.labels);
    el('text', { x: tx, y: ty, 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 800, fill: '#fff' }, G.labels).textContent = `${it.en} ${it.zh}`;
  });
  const E = { k: $('.ar-cr-k'), task: $('.ar-cr-task'), msg: $('.ar-cr-msg'), check: $('.ar-cr-check'), next: $('.ar-cr-next'), read: $('.ar-cr-read'), sl: Array.from(root.querySelectorAll('.ar-cr-sl input')), grid: $('[data-t="cgrid"]') };
  const state = { i: 0, s: 1, u: 0, v: 0, solved: false, drag: null };
  const rect = () => cropRect(state.s, state.u, state.v);
  function draw() {
    const r = rect(), { w, h } = SCENE;
    G.shade.setAttribute('d', `M0 0H${w}V${h}H0Z M${r.x} ${r.y}H${r.x + r.w}V${r.y + r.h}H${r.x}Z`);
    ['x', 'y'].forEach((k) => G.box.setAttribute(k, r[k])); G.box.setAttribute('width', r.w); G.box.setAttribute('height', r.h);
    view.setAttribute('viewBox', `${r.x} ${r.y} ${r.w} ${r.h}`);
    drawGrid(V.grid, r, E.grid.checked);
    E.sl[0].value = Math.round(state.s * 100); E.sl[1].value = Math.round(state.u * 100); E.sl[2].value = Math.round(state.v * 100);
    const share = boatShare(r);
    E.read.textContent = `Frame · 框: ${Math.round(r.w)} × ${Math.round(r.h)} · Boat · 船: ${share ? `${Math.round(share * 100)}%` : 'not all inside · 不完整'}`;
  }
  function set(s, u, v) { state.s = Math.min(1, Math.max(0, s)); state.u = Math.min(1, Math.max(0, u)); state.v = Math.min(1, Math.max(0, v)); draw(); }
  E.sl.forEach((inp, n) => inp.addEventListener('input', () => { const a = [state.s, state.u, state.v]; a[n] = inp.value / 100; set(...a); }));
  E.grid.addEventListener('change', draw);
  const toSvg = (e) => { const p = over.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(over.getScreenCTM().inverse()); };
  over.addEventListener('pointerdown', (e) => {
    const p = toSvg(e), r = rect();
    if (p.x < r.x || p.x > r.x + r.w || p.y < r.y || p.y > r.y + r.h) return;
    e.preventDefault(); state.drag = { ox: p.x - r.x, oy: p.y - r.y }; try { over.setPointerCapture(e.pointerId); } catch (_) { /* 合成事件沒有真的指標 */ }
  });
  over.addEventListener('pointermove', (e) => {
    if (!state.drag) return;
    const p = toSvg(e), r = rect(), [u, v] = cropUV({ ...r, x: p.x - state.drag.ox, y: p.y - state.drag.oy });
    set(state.s, u, v);
  });
  const end = () => { state.drag = null; };
  over.addEventListener('pointerup', end); over.addEventListener('pointercancel', end);
  function check() {
    if (state.solved) return null;
    const res = CROP_TASKS[state.i].check(rect());
    E.msg.innerHTML = bi(`${res.ok ? '✓' : '✗'} ${res.en}`, `${res.ok ? '✓' : '✗'} ${res.zh}`);
    if (res.ok) { state.solved = true; E.check.hidden = true; E.next.hidden = false; E.next.textContent = state.i === CROP_TASKS.length - 1 ? 'Start again · 從頭再來' : 'Next task · 下一個任務'; }
    return res.ok;
  }
  function go(i) {
    state.i = i; state.solved = false;
    const t = CROP_TASKS[i];
    E.k.textContent = `Task ${i + 1} of ${CROP_TASKS.length} · 第 ${i + 1} 個任務（共 ${CROP_TASKS.length} 個）`;
    E.task.innerHTML = bi(t.en, t.zh);
    E.msg.innerHTML = bi('Drag the yellow frame, or use the three sliders. The right side shows the picture you get.', '拖動黃色的框，或用三根滑桿。右邊是裁出來的畫面。');
    E.check.hidden = false; E.next.hidden = true;
    set(1, 0, 0);
  }
  E.check.addEventListener('click', check);
  E.next.addEventListener('click', () => go(state.i === CROP_TASKS.length - 1 ? 0 : state.i + 1));
  go(0);
  root.__crop = { state, set, rect, check, next: () => go(Math.min(CROP_TASKS.length - 1, state.i + 1)) };
}

function boot() {
  const lab = document.querySelector('[data-artframe-lab]'); if (lab) initLab(lab);
  const b = document.querySelector('[data-ar-bal]'); if (b) initBal(b);
  const c = document.querySelector('[data-ar-crop]'); if (c) initCrop(c);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
