/*
 * 書法 · 第十五課：毛筆和鉛筆的 2D 繪圖與互動（不需要 WebGL）。純函式在 pencil.js。
 *
 *   drawLine(g, T, pts, opt)        一條鉛筆線（粗細處處一樣、圓頭）；opt.upTo＝只畫前幾點
 *   drawPencilChar(g, T, char)      整個字的鉛筆線
 *   drawMinis()                     卡片小圖：canvas[data-cg-pc="brush|pencil|both|order"]
 *   initSlim(root)                  root＝[data-cal-slim]：「把粗細拿掉」滑桿——毛筆字慢慢變成鉛筆字，位置一點都不動
 *   initSpot(root)                  root＝[data-cal-spot]：「哪一筆寫歪了？」——左邊毛筆範字，右邊鉛筆照寫但有一筆改壞了，點出來
 *
 * 除錯：root.__slim（set(f)、setChar(key)、state）；root.__spot（state、pick(第幾筆)、next()、target()）
 */
import { hitStroke, prepStroke, stamps } from './brush.js';
import { drawGrid, drawStamps, paperBase } from './ink2d.js';
import { PENCIL_INK, PENCIL_W, candidates, centerline, pathLength, slimStamps, widthRange } from './pencil.js';
import CHUN from './strokes/chun.json';
import REN from './strokes/ren.json';
import RI from './strokes/ri.json';
import SAN from './strokes/san.json';
import SHAN from './strokes/shan.json';
import SHI from './strokes/shi.json';
import SHUI from './strokes/shui.json';
import XIAO from './strokes/xiao.json';
import XIN from './strokes/xin.json';
import YONG from './strokes/yong.json';
import YUE from './strokes/yue.json';
import ZHI from './strokes/zhi.json';

export const CHARS = { yong: YONG, xin: XIN, chun: CHUN };
const GAME = [YONG, SHAN, SHI, SAN, REN, XIN, SHUI, CHUN, RI, YUE, ZHI, XIAO];
const INK = '#151311';
const cache = new Map();
/** 一個字的毛筆印子和中心線（算一次就記住） */
export function parts(char) {
  if (!cache.has(char)) cache.set(char, char.strokes.map((st) => ({ st, sts: stamps(prepStroke(st)), line: centerline(st) })));
  return cache.get(char);
}
export function drawLine(g, T, pts, { upTo = pts.length, color = PENCIL_INK, w = PENCIL_W, dash = null } = {}) {
  const n = Math.min(upTo, pts.length);
  if (n < 1) return;
  g.save(); g.strokeStyle = color; g.fillStyle = color; g.lineWidth = Math.max(1, w * T.k); g.lineCap = 'round'; g.lineJoin = 'round';
  if (dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(T.ox + pts[0].x * T.k, T.oy + pts[0].y * T.k);
  for (let i = 1; i < n; i++) g.lineTo(T.ox + pts[i].x * T.k, T.oy + pts[i].y * T.k);
  if (n === 1) g.lineTo(T.ox + pts[0].x * T.k + 0.01, T.oy + pts[0].y * T.k);
  g.stroke(); g.restore();
}
export function drawPencilChar(g, T, char, opt = {}) { for (const p of parts(char)) drawLine(g, T, p.line, opt); }
export function drawBrushChar(g, T, char, opt = {}) { for (const p of parts(char)) drawStamps(g, p.sts, T, { color: INK, ...opt }); }
function badge(g, x, y, r, n, color = 'rgba(31,111,139,.94)') {
  g.save(); g.fillStyle = color; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#fff'; g.font = `800 ${Math.round(r * 1.25)}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(String(n), x, y + r * 0.06); g.restore();
}
function numbers(g, T, char, r) {
  parts(char).forEach((p, k) => {
    let x, y;
    if (p.st.num) [x, y] = p.st.num;
    else { const a = p.line[0], b = p.line[Math.min(p.line.length - 1, 12)], L = Math.hypot(b.x - a.x, b.y - a.y) || 1; x = a.x - ((b.x - a.x) / L) * 50; y = a.y - ((b.y - a.y) / L) * 50; }
    badge(g, T.ox + x * T.k, T.oy + y * T.k, r, k + 1);
  });
}
export function drawMinis() {
  document.querySelectorAll('canvas[data-cg-pc]').forEach((cv) => {
    const k = cv.getAttribute('data-cg-pc'), S = 240;
    cv.width = S; cv.height = S;
    const g = cv.getContext('2d'), m = S * 0.06, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
    paperBase(g, S, S, { seed: 29, fiber: 0.3 });
    drawGrid(g, m, m, S - m * 2, { kind: 'tian', lw: 1, color: 'rgba(205,62,50,.4)' });
    if (k === 'brush') drawBrushChar(g, T, YONG);
    else if (k === 'both') { drawBrushChar(g, T, YONG, { color: 'rgb(120,120,120)', alpha: 0.32 }); drawPencilChar(g, T, YONG, { w: 16 }); }
    else { drawPencilChar(g, T, YONG, { w: 16 }); if (k === 'order') numbers(g, T, YONG, 13); }
  });
}

// ---------------------------------------------------------------------
// 把粗細拿掉
// ---------------------------------------------------------------------
export function initSlim(root) {
  const cv = root.querySelector('.cg-slim-cv'), g = cv.getContext('2d');
  const slider = root.querySelector('.cg-slim-f'), out = root.querySelector('.cg-slim-out');
  const R = { ratio: root.querySelector('.cg-slim-ratio'), n: root.querySelector('.cg-slim-n'), len: root.querySelector('.cg-slim-len'), msg: root.querySelector('.cg-slim-msg') };
  const state = { key: 'yong', f: 1, line: false, order: false, anim: null };
  root.querySelectorAll('[data-slim-t]').forEach((el) => { state[el.getAttribute('data-slim-t')] = el.checked; });
  let S = 0, T = { k: 1, ox: 0, oy: 0 };
  function paint() {
    const css = cv.clientWidth || 320, dpr = Math.min(window.devicePixelRatio || 1, 2), px = Math.round(css * dpr);
    if (cv.width !== px) { cv.width = px; cv.height = px; }
    S = px; T = { k: S / 1000, ox: 0, oy: 0 };
    const char = CHARS[state.key], P = parts(char);
    paperBase(g, S, S, { seed: 13, fiber: 0.35 });
    drawGrid(g, S * 0.012, S * 0.012, S * 0.976, { kind: 'tian', lw: Math.max(1, S / 360) });
    const col = state.f > 0.5 ? INK : PENCIL_INK;
    for (const p of P) drawStamps(g, slimStamps(p.sts, state.f), T, { color: col, soft: state.f > 0.2 ? S / 420 : 0 });
    if (state.line) for (const p of P) drawLine(g, T, p.line, { color: 'rgba(214,72,60,.95)', w: 5 });
    if (state.order) numbers(g, T, char, 23 * T.k);
    const all = P.flatMap((p) => slimStamps(p.sts, state.f)), r = widthRange(all);
    if (R.ratio) R.ratio.innerHTML = `${r.ratio.toFixed(1)}×<small>最粗是最細的 ${r.ratio.toFixed(1)} 倍</small>`;
    if (R.n) R.n.innerHTML = `${char.strokes.length}<small>${char.strokes.length} 筆</small>`;
    if (R.len) R.len.innerHTML = `${(pathLength(char) / 1000).toFixed(1)} boxes<small>${(pathLength(char) / 1000).toFixed(1)} 個格子寬</small>`;
    if (out) out.textContent = `${Math.round(state.f * 100)}%`;
    if (R.msg) R.msg.innerHTML = state.f > 0.95
      ? 'This is the brush. Pull the slider to the left and watch what changes, and what does not.<span class="zh">這是毛筆寫的。把滑桿往左拉，看看什麼變了、什麼沒變。</span>'
      : state.f < 0.05
        ? `Now every line has the same width, like a pencil. The count is still ${char.strokes.length} strokes, in the same order, in the same places. That part is the structure.<span class="zh">現在每一條線都一樣粗，就像鉛筆寫的。筆畫還是 ${char.strokes.length} 筆，順序一樣、位置也一樣。留下來的這些，就是結構。</span>`
        : 'The thick parts are shrinking, but no stroke has moved.<span class="zh">粗的地方在變細，可是沒有一筆移動位置。</span>';
  }
  function set(f, fromSlider = false) {
    state.f = Math.min(1, Math.max(0, f));
    if (slider && !fromSlider) slider.value = String(Math.round(state.f * 100));
    paint();
  }
  function glide(to) {
    cancelAnimationFrame(state.anim);
    const from = state.f, t0 = performance.now();
    const tick = (now) => { const u = Math.min(1, (now - t0) / 900), e = u * u * (3 - 2 * u); set(from + (to - from) * e); if (u < 1) state.anim = requestAnimationFrame(tick); };
    state.anim = requestAnimationFrame(tick);
  }
  function setChar(key) {
    if (!CHARS[key]) return;
    state.key = key;
    root.querySelectorAll('[data-slim-ch]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-slim-ch') === key ? 'true' : 'false'));
    paint();
  }
  if (slider) slider.addEventListener('input', () => { cancelAnimationFrame(state.anim); set(Number(slider.value) / 100, true); });
  root.querySelectorAll('[data-slim-ch]').forEach((b) => b.addEventListener('click', () => setChar(b.getAttribute('data-slim-ch'))));
  root.querySelectorAll('[data-slim-go]').forEach((b) => b.addEventListener('click', () => glide(b.getAttribute('data-slim-go') === 'brush' ? 1 : 0)));
  root.querySelectorAll('[data-slim-t]').forEach((el) => el.addEventListener('change', () => { state[el.getAttribute('data-slim-t')] = el.checked; paint(); }));
  new ResizeObserver(paint).observe(cv);
  paint();
  root.__slim = { state, set, setChar, paint };
  return root.__slim;
}

// ---------------------------------------------------------------------
// 哪一筆寫歪了？
// ---------------------------------------------------------------------
const WHY = {
  short: { en: 'too short', zh: '太短了' }, long: { en: 'too long', zh: '太長了' },
  shift: { en: 'in the wrong place', zh: '位置跑掉了' }, tilt: { en: 'leaning the wrong way', zh: '斜掉了' },
};
export function initSpot(root) {
  const cv = root.querySelector('.cg-spot-cv'), g = cv.getContext('2d');
  const msg = root.querySelector('.cg-spot-msg'), q = root.querySelector('.cg-spot-q'), scoreEl = root.querySelector('.cg-spot-score');
  const ROUNDS = 8;
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  function deal() {   // 八題：八個不同的字，四種錯法盡量都出現
    const kinds = shuffle(['short', 'long', 'shift', 'tilt', 'short', 'long', 'shift', 'tilt']);
    return shuffle(GAME).slice(0, ROUNDS).map((char, n) => {
      const cs = candidates(char), want = cs.filter((c) => c.kind === kinds[n]), pool = want.length ? want : cs;
      return { char, ...pool[Math.floor(rand() * pool.length)] };
    });
  }
  const state = { order: deal(), i: 0, right: 0, answered: false, firstTry: true, wrong: [] };
  let W = 0, H = 0, TL = null, TR = null;
  const cur = () => state.order[state.i];
  const lines = () => { const it = cur(); return parts(it.char).map((p, k) => (k === it.i ? it.pts : p.line)); };
  function paint() {
    const css = cv.clientWidth || 320, dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.round(css * dpr); H = Math.round(W / 2);
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    paperBase(g, W, H, { seed: 43, fiber: 0.3 });
    const pad = H * 0.06, box = H - pad * 2 - H * 0.1, top = pad + H * 0.1, gap = (W - box * 2) / 3;
    TL = { k: box / 1000, ox: gap, oy: top }; TR = { k: box / 1000, ox: gap * 2 + box, oy: top };
    const it = cur();
    g.save(); g.fillStyle = '#5b5346'; g.font = `800 ${Math.round(H * 0.058)}px system-ui, "PingFang TC", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('Model · 毛筆範字', TL.ox + box / 2, pad + H * 0.03); g.fillText('Pencil copy · 鉛筆照著寫', TR.ox + box / 2, pad + H * 0.03); g.restore();
    for (const T of [TL, TR]) drawGrid(g, T.ox, T.oy, box, { kind: 'jiu', lw: Math.max(1, H / 300), color: 'rgba(205,62,50,.5)' });
    drawBrushChar(g, TL, it.char);
    const L = lines();
    L.forEach((pts, k) => {
      const bad = state.wrong.includes(k), hit = state.answered && k === it.i;
      drawLine(g, TR, pts, { color: hit ? '#b2493d' : bad ? '#8a8f99' : PENCIL_INK, w: 15 });
    });
    if (state.answered) {   // 答對以後：綠色虛線畫出它該在的地方
      drawLine(g, TR, parts(it.char)[it.i].line, { color: '#2f8f5b', w: 11, dash: [Math.max(4, H / 60), Math.max(4, H / 60)] });
      drawLine(g, TL, parts(it.char)[it.i].line, { color: 'rgba(47,143,91,.95)', w: 9 });
    }
  }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${ROUNDS}`; }
  function round() {
    state.answered = false; state.firstTry = true; state.wrong = [];
    const it = cur();
    if (q) q.innerHTML = `Question ${state.i + 1} of ${ROUNDS}: ${it.char.char} has ${it.char.strokes.length} ${it.char.strokes.length === 1 ? 'stroke' : 'strokes'}. Which one is off in the pencil copy?<span class="zh">第 ${state.i + 1} 題（共 ${ROUNDS} 題）：「${it.char.char}」有 ${it.char.strokes.length} 筆。鉛筆照著寫的那個字，哪一筆寫歪了？</span>`;
    if (msg) msg.innerHTML = 'Tap the stroke on the right that does not match the model. Use the grid lines to compare.<span class="zh">點右邊和範字不一樣的那一筆。可以用格線來比位置。</span>';
    paint();
  }
  function pick(k) {
    if (state.answered || k < 0) return null;
    const it = cur(), st = it.char.strokes[k], ok = k === it.i;
    if (ok) {
      if (state.firstTry) state.right++;
      state.answered = true;
      const last = state.i === ROUNDS - 1;
      if (msg) msg.innerHTML = `Yes. Stroke ${k + 1} (${st.en.toLowerCase()}) is ${WHY[it.kind].en}. The green dashes show where it belongs.${last ? ` You found ${state.right} of ${ROUNDS} on the first try.` : ''}<span class="zh">答對了。第 ${k + 1} 筆（${st.zh}）${WHY[it.kind].zh}。綠色虛線是它該在的地方。${last ? `你一次就找到 ${state.right} 題（共 ${ROUNDS} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (!state.wrong.includes(k)) state.wrong.push(k);
      if (msg) msg.innerHTML = `Stroke ${k + 1} (${st.en.toLowerCase()}) matches the model. Check where each stroke starts and ends against the grid.<span class="zh">第 ${k + 1} 筆（${st.zh}）和範字一樣。對著格線，看看每一筆從哪裡開始、到哪裡結束。</span>`;
    }
    showScore(); paint();
    return ok;
  }
  function next() {
    if (state.i >= ROUNDS - 1) { state.order = deal(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  cv.addEventListener('click', (e) => {
    const r = cv.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * W, y = ((e.clientY - r.top) / r.height) * H;
    if (!TR || x < TR.ox - 20 * TR.k) return;
    const bx = (x - TR.ox) / TR.k, by = (y - TR.oy) / TR.k;
    pick(hitStroke(lines().map((s, i) => ({ i, s })), bx, by, 90));
  });
  root.querySelectorAll('[data-spot="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-spot="again"]').forEach((b) => b.addEventListener('click', () => { state.order = deal(); state.i = 0; state.right = 0; showScore(); round(); }));
  new ResizeObserver(paint).observe(cv);
  round(); showScore();
  root.__spot = { state, pick, next, target: () => cur().i, kind: () => cur().kind };
  return root.__spot;
}
