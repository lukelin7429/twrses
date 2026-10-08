/*
 * 書法 · 第十四課：毛筆和平頭筆的 2D 繪圖與互動（不需要 WebGL）。純函式在 nib.js。
 *
 *   penStrokes(what)            平頭筆要寫的路徑：'word'（n o a）或 'yong'（拿第三課「永」的中心線，讓平頭筆去寫——看它寫不出提按）
 *   drawNib(g, T, quads, opt)   把筆嘴掃出來的四邊形塗上去（opt.upTo＝只畫前幾個）
 *   drawPenChar(g, S, what, deg)    一張小圖：平頭筆寫的字
 *   drawBrushChar(g, S)         一張小圖：毛筆寫的「永」
 *   drawRose(g, S, nib, dir)    「方向 → 粗細」的圖：往每個方向走會多粗（像一個 8 字），dir＝現在的方向（弧度，null 不畫）
 *   drawMinis()                 卡片小圖：canvas[data-cg-pen="brush|nib|nibyong|nib90"]
 *   initTool(root)              root＝[data-cal-tool]：「這一筆是哪一種筆寫的？」八題
 *   initNibPad(root)            root＝[data-cal-nibpad]：平頭筆練字板（粗細只看方向；可調筆嘴角度）
 *
 * 除錯：root.__tool（answer('brush'|'nib')、next()、state）；root.__nibpad（write(點陣列)、clear()、state）
 */
import { prepStroke, stamps } from './brush.js';
import { drawStamps, paperBase } from './ink2d.js';
import { LETTERS, NIB_DEG, NIB_W, WORD, nibWidth, rad, smooth, sweep, wordStrokes } from './nib.js';
import REN from './strokes/ren.json';
import SHI from './strokes/shi.json';
import YONG from './strokes/yong.json';

export { YONG };
const INK = '#151311';
export function penStrokes(what = 'word') {
  if (what === 'yong') return YONG.strokes.map((st) => ({ en: st.en, zh: st.zh, letter: '永', path: smooth(st.pts.map((q) => [q[0], q[1]]), 6) }));
  return wordStrokes(WORD);
}
export function drawNib(g, T, quads, { upTo = quads.length, color = INK } = {}) {
  g.save(); g.fillStyle = color; g.strokeStyle = color; g.lineWidth = Math.max(0.6, T.k * 1.2); g.lineJoin = 'round';
  for (let i = 0; i < Math.min(upTo, quads.length); i++) {
    const q = quads[i].q;
    g.beginPath(); g.moveTo(T.ox + q[0][0] * T.k, T.oy + q[0][1] * T.k);
    for (let j = 1; j < 4; j++) g.lineTo(T.ox + q[j][0] * T.k, T.oy + q[j][1] * T.k);
    g.closePath(); g.fill(); g.stroke();
  }
  g.restore();
}
export function drawPenChar(g, S, what = 'word', deg = NIB_DEG, { base = true, W = NIB_W } = {}) {
  if (base) paperBase(g, S, S, { seed: 37, fiber: 0.3 });
  const m = S * 0.06, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
  if (what === 'word') {   // 基線與 x 高度線
    g.save(); g.strokeStyle = 'rgba(31,111,139,.35)'; g.lineWidth = Math.max(1, S / 300);
    for (const y of [300, 700]) { g.beginPath(); g.moveTo(T.ox + 40 * T.k, T.oy + y * T.k); g.lineTo(T.ox + 960 * T.k, T.oy + y * T.k); g.stroke(); }
    g.restore();
  }
  for (const st of penStrokes(what)) drawNib(g, T, sweep(st.path, W, rad(deg)));
}
const brushCache = new Map();
const bst = (char) => { if (!brushCache.has(char)) brushCache.set(char, char.strokes.map((st) => stamps(prepStroke(st)))); return brushCache.get(char); };
export function drawBrushChar(g, S, char = YONG, { base = true } = {}) {
  if (base) paperBase(g, S, S, { seed: 23, fiber: 0.3 });
  const m = S * 0.06, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
  for (const sts of bst(char)) drawStamps(g, sts, T, { color: INK });
}
export function drawRose(g, S, nib, dir = null) {
  const c = S / 2, R = S * 0.4;
  g.clearRect(0, 0, S, S);
  g.save();
  g.strokeStyle = 'rgba(160,180,230,.22)'; g.lineWidth = 1;
  g.beginPath(); g.arc(c, c, R, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.moveTo(c - R, c); g.lineTo(c + R, c); g.moveTo(c, c - R); g.lineTo(c, c + R); g.stroke();
  g.beginPath();
  for (let i = 0; i <= 180; i++) { const a = (i / 180) * Math.PI * 2, r = R * Math.abs(Math.sin(a - nib)); const x = c + Math.cos(a) * r, y = c - Math.sin(a) * r; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
  g.closePath(); g.fillStyle = 'rgba(143,211,234,.22)'; g.fill(); g.strokeStyle = '#8fd3ea'; g.lineWidth = 2; g.stroke();
  g.strokeStyle = '#ffd36e'; g.lineWidth = Math.max(3, S / 40); g.lineCap = 'round';   // 筆嘴那條邊
  g.beginPath(); g.moveTo(c - Math.cos(nib) * R * 0.3, c + Math.sin(nib) * R * 0.3); g.lineTo(c + Math.cos(nib) * R * 0.3, c - Math.sin(nib) * R * 0.3); g.stroke();
  if (dir !== null) {
    const r = R * Math.abs(Math.sin(dir - nib));
    g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1.5; g.setLineDash([4, 3]);
    g.beginPath(); g.moveTo(c, c); g.lineTo(c + Math.cos(dir) * R, c - Math.sin(dir) * R); g.stroke(); g.setLineDash([]);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(c + Math.cos(dir) * r, c - Math.sin(dir) * r, Math.max(4, S / 36), 0, Math.PI * 2); g.fill();
  }
  g.restore();
}
export function drawMinis() {
  document.querySelectorAll('canvas[data-cg-pen]').forEach((cv) => {
    const k = cv.getAttribute('data-cg-pen'), S = 240;
    cv.width = S; cv.height = S;
    const g = cv.getContext('2d');
    if (k === 'brush') drawBrushChar(g, S);
    else if (k === 'nibyong') drawPenChar(g, S, 'yong', NIB_DEG, { W: 70 });
    else drawPenChar(g, S, 'word', k === 'nib90' ? 90 : NIB_DEG);
  });
}

// ---------------------------------------------------------------------
// 這一筆是哪一種筆寫的？
// ---------------------------------------------------------------------
const NAME = { brush: { en: 'Brush', zh: '毛筆', hint_en: 'A brush line swells and thins as the hand presses and lifts, and its ends are rounded or pointed.', hint_zh: '毛筆的線會隨著提按變粗變細，頭尾是圓的或尖的。' },
  nib: { en: 'Broad-edge pen', zh: '平頭筆', hint_en: 'A broad-edge pen line changes width only when it changes direction, and its ends are cut off at a slant.', hint_zh: '平頭筆的線只有轉方向時才變粗細，頭尾是斜斜切平的。' } };
export function initTool(root) {
  const cv = root.querySelector('.cg-tool-cv'), g = cv.getContext('2d');
  const opts = root.querySelector('.cg-tool-opts'), msg = root.querySelector('.cg-tool-msg'), q = root.querySelector('.cg-tool-q'), scoreEl = root.querySelector('.cg-tool-score');
  const ROUNDS = 8;
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const brushPool = [...YONG.strokes, ...REN.strokes, ...SHI.strokes].map((st) => ({ tool: 'brush', st }));
  const nibPool = [...WORD.flatMap((k) => LETTERS[k].strokes.map((st) => ({ tool: 'nib', path: smooth(st.pts) }))),
    ...[YONG.strokes[2], YONG.strokes[4], REN.strokes[0]].map((st) => ({ tool: 'nib', path: smooth(st.pts.map((p) => [p[0], p[1]]), 6) }))];
  const deal = () => shuffle([...shuffle(brushPool).slice(0, 4), ...shuffle(nibPool).slice(0, 4)]);
  const state = { order: deal(), i: 0, right: 0, answered: false, firstTry: true };
  function paint() {
    const css = cv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2), S = Math.round(css * dpr);
    if (cv.width !== S) { cv.width = S; cv.height = S; }
    paperBase(g, S, S, { seed: 41, fiber: 0.35 });
    const it = state.order[state.i];
    const pts = it.tool === 'brush' ? it.st.pts : it.path;
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys), k = (S * 0.62) / Math.max(w, h, 120);
    const T = { k, ox: S / 2 - ((Math.max(...xs) + Math.min(...xs)) / 2) * k, oy: S / 2 - ((Math.max(...ys) + Math.min(...ys)) / 2) * k };
    if (it.tool === 'brush') drawStamps(g, stamps(prepStroke(it.st)), T, { color: INK });
    else drawNib(g, T, sweep(it.path, NIB_W, rad(NIB_DEG), 5));
  }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${ROUNDS}`; }
  function round() {
    state.answered = false; state.firstTry = true;
    opts.innerHTML = ['brush', 'nib'].map((s) => `<button type="button" data-ans="${s}"><b>${NAME[s].zh}</b><span>${NAME[s].en}</span></button>`).join('');
    opts.querySelectorAll('[data-ans]').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-ans'))));
    if (q) q.innerHTML = `Question ${state.i + 1} of ${ROUNDS}: which tool made this stroke?<span class="zh">第 ${state.i + 1} 題（共 ${ROUNDS} 題）：這一筆是哪一種筆寫的？</span>`;
    if (msg) msg.innerHTML = 'Look at the two ends of the line. Rounded or pointed, or cut off at a slant?<span class="zh">看看線的兩頭：圓圓尖尖的，還是斜斜切平的？</span>';
    paint();
  }
  function answer(a) {
    if (state.answered) return null;
    const it = state.order[state.i], btn = opts.querySelector(`[data-ans="${a}"]`), ok = a === it.tool;
    if (ok) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const last = state.i === ROUNDS - 1;
      if (msg) msg.innerHTML = `Yes, a ${NAME[a].en.toLowerCase()}. ${NAME[a].hint_en}${last ? ` You got ${state.right} of ${ROUNDS} on the first try.` : ''}<span class="zh">答對了，是${NAME[a].zh}。${NAME[a].hint_zh}${last ? `你一次就答對 ${state.right} 題（共 ${ROUNDS} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      if (msg) msg.innerHTML = `Not the ${NAME[a].en.toLowerCase()}. ${NAME[a].hint_en}<span class="zh">不是${NAME[a].zh}。${NAME[a].hint_zh}</span>`;
    }
    showScore();
    return ok;
  }
  function next() {
    if (state.i >= ROUNDS - 1) { state.order = deal(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  root.querySelectorAll('[data-tool="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-tool="again"]').forEach((b) => b.addEventListener('click', () => { state.order = deal(); state.i = 0; state.right = 0; showScore(); round(); }));
  new ResizeObserver(paint).observe(cv);
  round(); showScore();
  root.__tool = { state, answer, next };
  return root.__tool;
}

// ---------------------------------------------------------------------
// 平頭筆練字板
// ---------------------------------------------------------------------
export function initNibPad(root) {
  const cv = root.querySelector('.cg-nibpad-cv'), g = cv.getContext('2d');
  const slider = root.querySelector('.cg-nibpad-deg'), degOut = root.querySelector('.cg-nibpad-deg-out'), out = root.querySelector('.cg-nibpad-out'), rose = root.querySelector('.cg-nibpad-rose');
  const state = { deg: NIB_DEG, guide: true, strokes: [], cur: null };
  let S = 0, T = { k: 1, ox: 0, oy: 0 };
  function size() {
    const css = cv.clientWidth || 320, dpr = Math.min(window.devicePixelRatio || 1, 2), px = Math.round(css * dpr);
    if (cv.width !== px) { cv.width = px; cv.height = px; }
    S = px; T = { k: px / 1000, ox: 0, oy: 0 }; render();
  }
  function render() {
    if (!S) return;
    paperBase(g, S, S, { seed: 43, fiber: 0.3 });
    g.save(); g.strokeStyle = 'rgba(31,111,139,.4)'; g.lineWidth = Math.max(1, S / 320);
    for (const y of [300, 700]) { g.beginPath(); g.moveTo(30 * T.k, y * T.k); g.lineTo(970 * T.k, y * T.k); g.stroke(); }
    g.restore();
    if (state.guide) {   // 淡紅色的範字（先不透明畫在暫存畫布，再整張淡淡貼上，才不會越疊越深）
      const t = document.createElement('canvas'); t.width = S; t.height = S;
      const q = t.getContext('2d');
      for (const st of penStrokes('word')) drawNib(q, T, sweep(st.path, NIB_W, rad(state.deg)), { color: 'rgb(214,72,60)' });
      g.save(); g.globalAlpha = 0.28; g.drawImage(t, 0, 0); g.restore();
    }
    for (const st of state.strokes) if (st.pts.length > 1) drawNib(g, T, sweep(st.pts, NIB_W, rad(st.deg), 4));
    if (rose) { const R = 140; if (rose.width !== R) { rose.width = R; rose.height = R; } drawRose(rose.getContext('2d'), R, rad(state.deg), state.lastDir ?? null); }
    if (degOut) degOut.textContent = `${state.deg}°`;
  }
  const toBox = (e) => { const r = cv.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 1000, ((e.clientY - r.top) / r.height) * 1000]; };
  function begin(p) { state.cur = { pts: [p], deg: state.deg }; state.strokes.push(state.cur); }
  function move(p) {
    const c = state.cur; if (!c) return;
    const a = c.pts[c.pts.length - 1], d = Math.hypot(p[0] - a[0], p[1] - a[1]);
    if (d < 3) return;
    c.pts.push(p);
    state.lastDir = Math.atan2(-(p[1] - a[1]), p[0] - a[0]);
    const w = nibWidth(NIB_W, state.lastDir, rad(c.deg));
    if (out) out.innerHTML = `Width now: <b>${Math.round((w / NIB_W) * 100)}%</b> of the nib<span class="zh">現在的線寬：筆嘴寬的 <b>${Math.round((w / NIB_W) * 100)}%</b></span>`;
    render();
  }
  function end() { state.cur = null; }
  cv.addEventListener('pointerdown', (e) => { if (e.button > 0) return; e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 合成事件 */ } begin(toBox(e)); });
  cv.addEventListener('pointermove', (e) => { if (state.cur) { e.preventDefault(); const evs = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : []; for (const ev of (evs.length ? evs : [e])) move(toBox(ev)); } });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) cv.addEventListener(ev, end);
  cv.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  cv.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  if (slider) slider.addEventListener('input', () => { state.deg = Number(slider.value); render(); });
  root.querySelectorAll('[data-nibpad]').forEach((b) => b.addEventListener('click', () => {
    const k = b.getAttribute('data-nibpad');
    if (k === 'clear') state.strokes.length = 0;
    if (k === 'undo') state.strokes.pop();
    render();
  }));
  const gd = root.querySelector('[data-nibpad-t="guide"]');
  if (gd) gd.addEventListener('change', () => { state.guide = gd.checked; render(); });
  new ResizeObserver(size).observe(cv);
  size();
  if (out) out.innerHTML = 'Draw a line down, then a line across. Which is thicker?<span class="zh">畫一條直的，再畫一條橫的。哪一條比較粗？</span>';
  root.__nibpad = { state, clear: () => { state.strokes.length = 0; render(); },
    write(pts) { begin(pts[0]); pts.slice(1).forEach(move); end(); return widthOf(state.strokes[state.strokes.length - 1]); } };
  function widthOf(st) { const q = sweep(st.pts, NIB_W, rad(st.deg), 4); return q.reduce((a, k) => a + k.w, 0) / (q.length || 1); }
  return root.__nibpad;
}
