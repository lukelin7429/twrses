/*
 * 美術 Art · 第十課〈水彩、油畫、水墨有什麼不同？〉：同一顆蘋果，三種畫法並排，一步一步往前（沒有 3D；2D canvas）。
 *
 * 每一格逐點上色：regionAt() 決定這一點屬於哪個區域，colorAt() 算出那個區域畫到這一步的顏色（media.js）。
 * 水彩的邊緣模糊一點點，水墨模糊多一點（墨在宣紙上會暈開，示意）；取樣點離邊緣夠遠，不受模糊影響。
 * 色覺差異：每一格上面有名稱、每一步有文字說明；小遊戲的選項是文字。
 *
 * 除錯：document.querySelector('[data-artmedia-lab]').__lab
 *   state、setStep(n)、expect(medium, region)＝公式 [r, g, b]（0–255）、pixel(medium, region)＝canvas 上實際的像素、demo('wc'|'oil'|'ink'|'all')
 * 小互動：[data-ar-which].__which（round()、answer(medium)、next()）、[data-ar-next].__next（round()、answer(i)、next()）
 */
import { css, to255 } from './color.js';
import { APPLE, MEDIA, MEDIUM_KEYS, NEXT_ROUNDS, PROBES, SIZE, STEPS, WHICH_ROUNDS, colorAt, regionAt } from './media.js';

const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;

// 區域地圖只算一次
let MAP = null;
function regionMap() {
  if (MAP) return MAP;
  MAP = new Uint8Array(SIZE * SIZE);
  const idx = { paper: 0, cast: 1, light: 2, shadow: 3, highlight: 4, stem: 5 };
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) MAP[y * SIZE + x] = idx[regionAt(x + 0.5, y + 0.5)];
  return MAP;
}
const ORDER = ['paper', 'cast', 'light', 'shadow', 'highlight', 'stem'];

/** 把某種畫法畫到第 step 步，畫進 canvas（SIZE × SIZE）。 */
function paint(cv, medium, step) {
  if (cv.width !== SIZE) { cv.width = SIZE; cv.height = SIZE; }
  const ctx = cv.getContext('2d'), m = MEDIA[medium], map = regionMap();
  const cols = ORDER.map((r) => to255(colorAt(medium, step, r)));
  const img = ctx.createImageData(SIZE, SIZE), d = img.data;
  for (let i = 0; i < map.length; i++) { const c = cols[map[i]]; d[i * 4] = c[0]; d[i * 4 + 1] = c[1]; d[i * 4 + 2] = c[2]; d[i * 4 + 3] = 255; }
  if (m.blur) {
    // 先畫到暫存 canvas，再模糊貼回來（四邊先填紙色，避免模糊時邊緣變暗）
    const tmp = document.createElement('canvas'); tmp.width = SIZE; tmp.height = SIZE; tmp.getContext('2d').putImageData(img, 0, 0);
    ctx.fillStyle = css(m.paper); ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.filter = `blur(${m.blur}px)`; ctx.drawImage(tmp, 0, 0); ctx.filter = 'none';
  } else ctx.putImageData(img, 0, 0);
  if (medium === 'watercolor') {                                        // 鉛筆稿：一直留著，很淡
    ctx.strokeStyle = 'rgba(80,80,90,.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(APPLE.cx, APPLE.cy, APPLE.rx, APPLE.ry, 0, 0, Math.PI * 2); ctx.stroke();
  }
}
const pixelOf = (cv, region) => { const [x, y] = PROBES[region]; const p = cv.getContext('2d').getImageData(x, y, 1, 1).data; return [p[0], p[1], p[2]]; };

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cvs = Object.fromEntries(MEDIUM_KEYS.map((k) => [k, root.querySelector(`.ar-md-cv[data-m="${k}"]`)]));
  const caps = Object.fromEntries(MEDIUM_KEYS.map((k) => [k, root.querySelector(`.ar-md-cap[data-m="${k}"]`)]));
  const R = { k: $('.ar-md-k'), sl: $('.ar-md-sl input'), msg: $('.ar-msg'), prev: $('.ar-md-prev'), next: $('.ar-md-nextb') };
  const state = { step: 0 };
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  function render() {
    for (const k of MEDIUM_KEYS) {
      paint(cvs[k], k, state.step);
      const s = MEDIA[k].steps[state.step];
      caps[k].innerHTML = `<b>${state.step + 1}. ${s.en}</b><span class="zh">${s.zh}</span><span class="ar-md-why">${s.why_en || ''}<span class="zh">${s.why_zh || ''}</span></span>`;
    }
    R.k.textContent = `Step ${state.step + 1} of ${STEPS} · 第 ${state.step + 1} 步（共 ${STEPS} 步）`;
    R.sl.value = state.step + 1; R.prev.disabled = state.step === 0; R.next.disabled = state.step === STEPS - 1;
  }
  function setStep(n) { state.step = Math.max(0, Math.min(STEPS - 1, n)); render(); }
  R.sl.addEventListener('input', () => { stop(); setStep(R.sl.value - 1); });
  R.prev.addEventListener('click', () => { stop(); setStep(state.step - 1); });
  R.next.addEventListener('click', () => { stop(); setStep(state.step + 1); });

  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; root.removeAttribute('data-focus'); };
  const play = (list) => { stop(); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };
  const walk = (focus, en, zh) => {
    stop(); if (focus) root.setAttribute('data-focus', focus); setStep(0); say(en, zh);
    play([1, 2, 3].map((n) => ({ at: 2.4 * n, fn: () => setStep(n) })).concat([{ at: 2.4 * 3 + 2.5, fn: () => root.removeAttribute('data-focus') }]));
  };
  const DEMO = {
    wc: () => walk('watercolor', 'Watch the watercolor apple. Each wash makes it darker, and the white highlight is the paper itself, never touched.', '看水彩的蘋果：每疊一層就更暗一點；白色的亮點就是紙本身，從頭到尾沒有塗。'),
    oil: () => walk('oil', 'Watch the oil apple. It starts dark, and lighter paint goes on top, covering what is underneath. Even the light highlight is painted over the red.', '看油畫的蘋果：一開始是暗的，淺的顏色再蓋上去，把底下蓋住；連淺色的亮點，也是畫在紅色上面。'),
    ink: () => walk('ink', 'Watch the ink apple. Only one color, black, but light, middle, and dark ink, depending on how much water is in the brush.', '看水墨的蘋果：只有一種顏色，黑色；但看筆裡的水有多少，就有淡墨、中墨、濃墨。'),
    all: () => walk(null, 'All three at once. Compare how each one gets from blank paper to a finished apple.', '三種一起看：比比看它們怎麼從一張白紙，變成一顆畫好的蘋果。'),
  };
  document.querySelectorAll('[data-lab-demo]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault(); root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const v = b.getAttribute('data-lab-demo'); if (DEMO[v]) DEMO[v]();
  }));
  render();
  say('Move the slider, or use the buttons, to go step by step. The same apple is painted three ways at once.', '拖動滑桿或按按鈕，一步一步往前。同一顆蘋果，同時用三種方式畫。');
  root.classList.add('al-ready');
  root.__lab = { state, setStep, expect: (m, r) => to255(colorAt(m, state.step, r)), pixel: (m, r) => pixelOf(cvs[m], r), demo: (v) => DEMO[v] && DEMO[v](), stop };
}

// ── 小互動一：這是哪一種畫法？（畫完的蘋果放大一塊） ─────────────────────────
function initWhich(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-wc-k'), score: $('.ar-wc-score'), steps: $('.ar-wc-steps'), cv: $('.ar-wc-cv'), opts: Array.from(root.querySelectorAll('[data-medium]')), msg: $('.ar-wc-msg'), next: $('.ar-wc-next') };
  const N = WHICH_ROUNDS.length, state = { i: 0, right: 0, done: 0, solved: false };
  E.steps.innerHTML = WHICH_ROUNDS.map(() => '<i></i>').join('');
  const full = {}; const fullOf = (m) => { if (!full[m]) { full[m] = document.createElement('canvas'); paint(full[m], m, STEPS - 1); } return full[m]; };
  const round = () => WHICH_ROUNDS[state.i];
  function show() {
    const r = round(), src = fullOf(r.medium), [cx, cy] = r.at, z = r.zoom || 2.2, w = 280, h = 200;
    E.cv.width = w; E.cv.height = h;
    const ctx = E.cv.getContext('2d'); ctx.imageSmoothingEnabled = true;
    ctx.drawImage(src, cx - w / z / 2, cy - h / z / 2, w / z, h / z, 0, 0, w, h);
    E.k.textContent = `Close-up ${state.i + 1} of ${N} · 第 ${state.i + 1} 張特寫（共 ${N} 張）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); b.querySelector('.ar-pk-mk').textContent = ''; });
    E.next.hidden = true;
    E.msg.innerHTML = bi(r.ask_en, r.ask_zh);
  }
  function answer(m) {
    if (state.solved) return null;
    const r = round(), ok = m === r.medium;
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.forEach((b) => { b.disabled = true; });
    const good = E.opts.find((b) => b.getAttribute('data-medium') === r.medium); good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ this one · 是這個';
    if (!ok) { const b = E.opts.find((x) => x.getAttribute('data-medium') === m); b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個'; }
    const last = state.i === N - 1;
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} ${r.why_en}${last ? ` You got ${state.right} of ${N}.` : ''}`, `${ok ? '✓' : '✗'} ${r.why_zh}${last ? `${N} 題你答對了 ${state.right} 題。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next close-up · 下一張';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; show(); }
  E.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-medium'))));
  E.next.addEventListener('click', () => { if (state.i === N - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__which = { state, round, answer, next: () => go(Math.min(N - 1, state.i + 1)) };
}

// ── 小互動二：下一步該畫什麼？ ─────────────────────────────────────
function initNext(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-nx-k'), score: $('.ar-nx-score'), steps: $('.ar-nx-steps'), cv: $('.ar-nx-cv'), ask: $('.ar-nx-ask'), opts: $('.ar-nx-opts'), msg: $('.ar-nx-msg'), next: $('.ar-nx-next') };
  const N = NEXT_ROUNDS.length, state = { i: 0, right: 0, done: 0, solved: false };
  E.steps.innerHTML = NEXT_ROUNDS.map(() => '<i></i>').join('');
  const round = () => NEXT_ROUNDS[state.i];
  function show() {
    const r = round(), m = MEDIA[r.medium];
    paint(E.cv, r.medium, r.step);
    E.k.textContent = `Question ${state.i + 1} of ${N} · 第 ${state.i + 1} 題（共 ${N} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.ask.innerHTML = bi(`This ${m.en.toLowerCase()} apple is at step ${r.step + 1}. What should the painter do next?`, `這顆${m.zh}的蘋果畫到第 ${r.step + 1} 步。下一步該做什麼？`);
    E.opts.innerHTML = r.options.map((o, n) => `<button type="button" class="ar-lp-opt" data-n="${n}"><i aria-hidden="true">${'ABC'[n]}</i><b>${o.en}</b><span class="zh">${o.zh}</span><span class="ar-pk-mk"></span></button>`).join('');
    E.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => answer(Number(b.getAttribute('data-n')))));
    E.next.hidden = true; E.msg.innerHTML = '&nbsp;';
  }
  function answer(n) {
    if (state.solved) return null;
    const r = round(), ok = n === r.answer;
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
    const good = E.opts.querySelector(`[data-n="${r.answer}"]`); good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ this one · 是這個';
    if (!ok) { const x = E.opts.querySelector(`[data-n="${n}"]`); x.classList.add('is-wrong'); x.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個'; }
    const last = state.i === N - 1;
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} ${r.why_en}${last ? ` You got ${state.right} of ${N}.` : ''}`, `${ok ? '✓' : '✗'} ${r.why_zh}${last ? `${N} 題你答對了 ${state.right} 題。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; show(); }
  E.next.addEventListener('click', () => { if (state.i === N - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__next = { state, round, answer, next: () => go(Math.min(N - 1, state.i + 1)) };
}

function boot() {
  const lab = document.querySelector('[data-artmedia-lab]'); if (lab) initLab(lab);
  const a = document.querySelector('[data-ar-which]'); if (a) initWhich(a);
  const b = document.querySelector('[data-ar-next]'); if (b) initNext(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
