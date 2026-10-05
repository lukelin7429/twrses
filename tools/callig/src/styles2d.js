/*
 * 書法 · 第九課：顏體、柳體的資料與 2D 互動（不需要 WebGL）。
 *
 *   STY               strokes/styles.json：{ chars: { <key>: { char, en, yan: { from, strokes }, liu: { from, strokes } } } }
 *                     同一個字的兩種寫法（寫字引擎的筆畫資料；筆順、筆數一樣，差在粗細、提按和字形）。
 *                     顏體對著顏真卿的碑、柳體對著柳公權的碑自己描的（出處寫在 styles.json 的 src）。
 *   form(key, who)    → 給寫字引擎的一個字（who＝'yan'|'liu'）
 *   widths(char)      行筆（不含起筆、收筆的尖）的線寬統計，單位是字框（1000）：{ avg, max, min, ratio }
 *                     min 取第 8 百分位（免得被一兩個點拉低）
 *   drawMinis()       卡片的小圖：canvas[data-cg-style="yan|liu"][data-key]
 *   initWho(root)     root＝[data-cal-who]：「這是誰的字？」碑帖上真的字（data-img：拼圖；data-cols／data-rows；
 *                     data-items：[{ who, zh, from }]），選是誰寫的；八題一輪。data-names：{ who: { en, zh, hint_en, hint_zh } }
 *   initLike(padEl, pad, getKey)   練字板：「你的字比較像誰？」把你寫的線的平均粗細，放在柳（細）和顏（粗）之間比一比。
 *
 * 除錯：root.__who（answer(who)、next()、state）；padEl.__like()
 */
import { prepStroke, stamps, strokeDuration } from './brush.js';
import { drawStamps, paperBase } from './ink2d.js';
import ST from './strokes/styles.json';

export const STY = ST.chars;
export const CHAR_KEYS = Object.keys(STY);
export const MASTERS = ['yan', 'liu'];
export const NAME = { yan: { en: 'Yan Zhenqing', short: 'Yan', zh: '顏真卿', one: '顏' }, liu: { en: 'Liu Gongquan', short: 'Liu', zh: '柳公權', one: '柳' } };

const forms = new Map();
export function form(key, who) {
  const id = `${key}-${who}`;
  if (!forms.has(id)) {
    const c = STY[key], f = c[who];
    forms.set(id, { char: c.char, key: id, en: c.en, box: 1000, count: f.strokes.length, from: f.from, strokes: f.strokes });
  }
  return forms.get(id);
}
const prepared = new Map();
export function prep(char) {
  if (!prepared.has(char)) prepared.set(char, char.strokes.map((st) => { const s = prepStroke(st); return { s, sts: stamps(s), dur: strokeDuration(s) }; }));
  return prepared.get(char);
}
export function widthsOf(list) {
  const w = list.map((q) => q.hw * 2).sort((a, b) => a - b);
  if (!w.length) return { avg: 0, max: 0, min: 0, ratio: 1 };
  const avg = w.reduce((a, b) => a + b, 0) / w.length, max = w[w.length - 1], min = w[Math.floor(w.length * 0.08)];
  return { avg, max, min, ratio: max / Math.max(1, min) };
}
export function widths(char) {
  return widthsOf(prep(char).flatMap((m) => m.sts.filter((q) => q.phase === 1)));
}
export function drawForm(g, S, char, { color = '#151311', margin = 0.06, base = true } = {}) {
  if (base) paperBase(g, S, S, { seed: 31, fiber: 0.35 });
  const m = S * margin, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
  for (const q of prep(char)) drawStamps(g, q.sts, T, { color });
}
export function drawMinis() {
  document.querySelectorAll('canvas[data-cg-style]').forEach((c) => {
    const who = c.getAttribute('data-cg-style'), key = c.getAttribute('data-key') || CHAR_KEYS[0], S = 220;
    if (!STY[key] || !STY[key][who]) return;
    c.width = S; c.height = S;
    drawForm(c.getContext('2d'), S, form(key, who));
  });
}

// ---------------------------------------------------------------------
// 這是誰的字？
// ---------------------------------------------------------------------
export function initWho(root) {
  const img = root.getAttribute('data-img');
  const cols = Number(root.getAttribute('data-cols') || 4), rows = Number(root.getAttribute('data-rows') || 2);
  const items = JSON.parse(root.getAttribute('data-items') || '[]');
  const names = JSON.parse(root.getAttribute('data-names') || '{}');
  const whos = Object.keys(names);
  const target = root.querySelector('.cg-who-target');
  const opts = root.querySelector('.cg-who-opts');
  const msg = root.querySelector('.cg-who-msg');
  const q = root.querySelector('.cg-who-q');
  const scoreEl = root.querySelector('.cg-who-score');
  const ROUNDS = Math.min(8, items.length);
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  /** 一輪：每位書法家的題數盡量一樣多 */
  const deal = () => {
    const by = whos.map((w) => shuffle(items.map((it, i) => ({ ...it, i })).filter((it) => it.who === w)));
    const out = [];
    for (let k = 0; out.length < ROUNDS && by.some((b) => b.length > k); k++) for (const b of by) if (b[k] && out.length < ROUNDS) out.push(b[k]);
    return shuffle(out);
  };
  const state = { order: deal(), i: 0, right: 0, answered: false, firstTry: true };
  const tile = (el, i) => {
    el.style.backgroundImage = `url(${img})`;
    el.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
    el.style.backgroundPosition = `${cols > 1 ? ((i % cols) * 100) / (cols - 1) : 0}% ${rows > 1 ? (Math.floor(i / cols) * 100) / (rows - 1) : 0}%`;
  };
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${ROUNDS}`; }
  function round() {
    const it = state.order[state.i];
    state.answered = false; state.firstTry = true;
    tile(target, it.i);
    opts.innerHTML = whos.map((w) => `<button type="button" data-ans="${w}"><b>${names[w].zh}</b><span>${names[w].en}</span></button>`).join('');
    opts.querySelectorAll('[data-ans]').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-ans'))));
    if (q) q.innerHTML = `Question ${state.i + 1} of ${ROUNDS}: who wrote this ${it.zh}?<span class="zh">第 ${state.i + 1} 題（共 ${ROUNDS} 題）：這個「${it.zh}」是誰寫的？</span>`;
    if (msg) msg.innerHTML = 'Look at the lines: thick and full, or thin and sharp?<span class="zh">看看線條：又粗又飽滿，還是又細又銳利？</span>';
  }
  function answer(a) {
    if (state.answered) return null;
    const it = state.order[state.i], btn = opts.querySelector(`[data-ans="${a}"]`);
    if (a === it.who) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const n = names[it.who], last = state.i === ROUNDS - 1;
      if (msg) msg.innerHTML = `Yes! ${n.en} wrote it, on the ${it.from_en}. ${n.hint_en}${last ? ` You got ${state.right} of ${ROUNDS} on the first try.` : ''}<span class="zh">答對了！這是${n.zh}寫的，出自${it.from}。${n.hint_zh}${last ? `你一次就答對 ${state.right} 題（共 ${ROUNDS} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      const n = names[a];
      if (msg) msg.innerHTML = `Not ${n.en}. ${n.hint_en}<span class="zh">不是${n.zh}。${n.hint_zh}</span>`;
    }
    showScore();
    return a === it.who;
  }
  function next() {
    if (state.i >= ROUNDS - 1) { state.order = deal(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  root.querySelectorAll('[data-who="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-who="again"]').forEach((b) => b.addEventListener('click', () => { state.order = deal(); state.i = 0; state.right = 0; showScore(); round(); }));
  round(); showScore();
  root.__who = { state, answer, next };
  return root.__who;
}

// ---------------------------------------------------------------------
// 練字板：你的字比較像誰？（只比線的粗細）
// ---------------------------------------------------------------------
export function initLike(padEl, pad, getKey) {
  const out = padEl.querySelector('.cg-pad-like');
  if (!out) return null;
  const bar = out.querySelector('.cg-like-bar i'), txt = out.querySelector('.cg-like-t');
  function like() {
    const key = getKey();
    const y = widths(form(key, 'yan')).avg, l = widths(form(key, 'liu')).avg;
    const mine = pad.strokes.flatMap((st) => st.sts);
    if (mine.length < 12) {
      if (bar) bar.style.left = '50%';
      out.classList.remove('has');
      if (txt) txt.innerHTML = 'Write a few strokes to see whose lines yours are closer to.<span class="zh">寫幾筆，看看你的線條粗細比較接近誰。</span>';
      return null;
    }
    const w = widthsOf(mine).avg;
    const f = Math.min(1, Math.max(0, (w - l) / Math.max(1, y - l)));   // 0＝和柳一樣細，1＝和顏一樣粗
    if (bar) bar.style.left = `${Math.round(4 + f * 92)}%`;
    out.classList.add('has');
    const who = f >= 0.5 ? 'yan' : 'liu';
    if (txt) txt.innerHTML = who === 'yan'
      ? 'Your lines are thick and full, closer to <b>Yan Zhenqing</b>. Try writing faster to make them thin like Liu’s.<span class="zh">你的線條又粗又飽滿，比較接近<b>顏真卿</b>。寫快一點，試試看能不能像柳公權那樣細。</span>'
      : 'Your lines are thin and firm, closer to <b>Liu Gongquan</b>. Try writing slowly to make them thick like Yan’s.<span class="zh">你的線條又細又挺，比較接近<b>柳公權</b>。寫慢一點，試試看能不能像顏真卿那樣粗。</span>';
    return { f, who, w, yan: y, liu: l };
  }
  const cv = padEl.querySelector('.cg-pad-cv');
  for (const ev of ['pointerup', 'pointercancel']) cv.addEventListener(ev, () => setTimeout(like, 0));
  padEl.querySelectorAll('[data-pad]').forEach((b) => b.addEventListener('click', () => setTimeout(like, 0)));
  like();
  padEl.__like = like;
  return like;
}
