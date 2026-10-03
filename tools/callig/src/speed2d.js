/*
 * 書法 · 第七課：楷書、行書、草書的資料與 2D 互動（不需要 WebGL）。
 *
 *   FORMS            { yong|zhi|shui: { kai, xing, cao } }  同一個字的三種寫法（寫字引擎的筆畫資料）
 *                    楷書＝strokes/<key>.json（筆順依教育部）；行書＝strokes/running.json（對位參考神龍本〈蘭亭序〉）；
 *                    草書＝strokes/cursive.json（對位參考故宮藏智永〈真草千字文〉拓本）
 *   stats(char)      { strokes 筆數, lifts 提筆次數, len 墨線長（字框單位）, ink 寫的秒數, time 含提筆的秒數 }
 *                    提筆一次算 AIR 秒（同 brush3d.js 的 makeWriter：提 0.22＋移 0.4＋下 0.2）
 *   threadRuns(char) 牽絲：壓力很小（< 0.22）的那幾段印子 [{ stroke, i0, i1, mid: {x, y, t} }]
 *   drawForm(g, S, char, opt)        畫一個字；opt.threads＝把牽絲塗成朱紅色（加粗一點才看得見）
 *   drawMinis()                      卡片的小圖：canvas[data-cg-script="kai|xing|cao"][data-key]
 *   initScripts(root)                root＝[data-cal-scripts]：「這是哪一種字體？」五種字體（篆隸楷行草）認一認，十題一輪。
 *                                    root 的 data-hints：{ seal|clerical|regular|running|cursive: { en, zh } }
 *
 * 除錯：root.__scripts（answer(key)、next()、state）
 */
import { prepStroke, stamps, strokeDuration } from './brush.js';
import { drawStamps, paperBase } from './ink2d.js';
import { REGULAR, clericalStamps, drawSeal } from './scripts2d.js';
import CUR from './strokes/cursive.json';
import RUN from './strokes/running.json';
import YONG from './strokes/yong.json';
import ZHI from './strokes/zhi.json';

export const AIR = 0.82;
export const SCRIPTS = ['kai', 'xing', 'cao'];
export const CHAR_KEYS = ['yong', 'zhi', 'shui'];
export const FORMS = {
  yong: { kai: YONG, xing: RUN.chars.yong, cao: CUR.chars.yong },
  zhi: { kai: ZHI, xing: RUN.chars.zhi, cao: CUR.chars.zhi },
  shui: { kai: REGULAR.shui, xing: RUN.chars.shui, cao: CUR.chars.shui },
};

const prepared = new Map();
function prep(char) {
  if (!prepared.has(char)) prepared.set(char, char.strokes.map((st) => { const s = prepStroke(st); return { s, sts: stamps(s) }; }));
  return prepared.get(char);
}
export function stats(char) {
  const P = prep(char);
  const ink = P.reduce((a, m) => a + strokeDuration(m.s), 0), len = P.reduce((a, m) => a + m.s[m.s.length - 1].s, 0);
  return { strokes: P.length, lifts: P.length - 1, len, ink, time: ink + AIR * (P.length - 1) };
}
/** 牽絲：一筆裡面壓力很小的一段（頭尾各 4% 不算——那是下筆和提筆），至少 25 單位長 */
export function threadRuns(char) {
  const out = [];
  prep(char).forEach((m, k) => {
    const L = m.s[m.s.length - 1].s || 1;
    let i0 = -1;
    const close = (i1) => {
      if (i0 < 0) return;
      const a = m.sts[i0], b = m.sts[i1 - 1];
      if (b.s - a.s >= 25) { const q = m.sts[Math.floor((i0 + i1 - 1) / 2)]; out.push({ stroke: k, i0, i1, mid: { x: q.x, y: q.y, t: q.t } }); }
      i0 = -1;
    };
    m.sts.forEach((q, i) => {
      const thin = q.p < 0.22 && q.s / L > 0.04 && q.s / L < 0.985;
      if (thin && i0 < 0) i0 = i;
      if (!thin) close(i);
    });
    close(m.sts.length);
  });
  return out;
}
export function drawForm(g, S, char, { threads = false, color = '#151311', margin = 0.06, base = true } = {}) {
  if (base) paperBase(g, S, S, { seed: 23, fiber: 0.35 });
  const m = S * margin, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
  const P = prep(char);
  for (const q of P) drawStamps(g, q.sts, T, { color });
  if (threads) for (const r of threadRuns(char)) {
    const seg = P[r.stroke].sts.slice(r.i0, r.i1).map((q) => ({ ...q, hw: Math.max(q.hw, 13), len: Math.max(q.len, 13) }));
    drawStamps(g, seg, T, { color: '#d13a25' });
  }
}
export function drawMinis() {
  document.querySelectorAll('canvas[data-cg-script]').forEach((c) => {
    const sc = c.getAttribute('data-cg-script'), key = c.getAttribute('data-key') || 'yong', S = 220;
    c.width = S; c.height = S;
    drawForm(c.getContext('2d'), S, FORMS[key][sc], { threads: sc === 'xing' });
  });
}

// ---------------------------------------------------------------------
// 這是哪一種字體？（單元二總複習：篆、隸、楷、行、草）
// ---------------------------------------------------------------------
const NAMES = {
  seal: { en: 'Seal', zh: '篆書' }, clerical: { en: 'Clerical', zh: '隸書' }, regular: { en: 'Regular', zh: '楷書' },
  running: { en: 'Running', zh: '行書' }, cursive: { en: 'Cursive', zh: '草書' },
};
const ORDER = ['seal', 'clerical', 'regular', 'running', 'cursive'];
const POOL = {
  seal: ['ri', 'yue', 'shan', 'shui', 'ren', 'ma'],
  clerical: ['san', 'tu', 'shan', 'ren', 'shui', 'ri', 'yue'],
  regular: ['yong', 'zhi', 'shui', 'shan', 'ri', 'ren'],
  running: ['yong', 'zhi', 'shui'],
  cursive: ['yong', 'zhi', 'shui'],
};
const GLYPH = { ri: '日', yue: '月', shan: '山', shui: '水', ren: '人', ma: '馬', san: '三', tu: '土', yong: '永', zhi: '之' };
function drawItem(g, S, script, key) {
  paperBase(g, S, S, { seed: 29, fiber: 0.35 });
  const m = S * 0.08, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
  if (script === 'seal') { drawSeal(g, key, T); return; }
  if (script === 'clerical') { for (const sts of clericalStamps(key)) drawStamps(g, sts, T, { color: '#151311' }); return; }
  const char = script === 'regular' ? (FORMS[key] ? FORMS[key].kai : REGULAR[key]) : FORMS[key][script === 'running' ? 'xing' : 'cao'];
  for (const q of prep(char)) drawStamps(g, q.sts, T, { color: '#151311' });
}
export function initScripts(root) {
  const cv = root.querySelector('.cg-scripts-cv');
  const g = cv.getContext('2d');
  const opts = root.querySelector('.cg-scripts-opts');
  const msg = root.querySelector('.cg-scripts-msg');
  const q = root.querySelector('.cg-scripts-q');
  const scoreEl = root.querySelector('.cg-scripts-score');
  const hints = JSON.parse(root.getAttribute('data-hints') || '{}');
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  /** 一輪十題：五種字體各兩題，字不重複同一種寫法 */
  const deal = () => shuffle(ORDER.flatMap((s) => shuffle(POOL[s]).slice(0, 2).map((key) => ({ script: s, key }))));
  const state = { items: deal(), i: 0, right: 0, answered: false, firstTry: true };
  let S = 0;
  const N = () => state.items.length;

  function size() {
    const css = cv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2), px = Math.round(css * dpr);
    if (cv.width !== px || cv.height !== px) { cv.width = px; cv.height = px; }
    S = px; draw();
  }
  function draw() { if (S) { const it = state.items[state.i]; drawItem(g, S, it.script, it.key); } }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${N()}`; }
  function round() {
    state.answered = false; state.firstTry = true;
    opts.innerHTML = ORDER.map((s) => `<button type="button" data-ans="${s}"><b>${NAMES[s].zh}</b><span>${NAMES[s].en}</span></button>`).join('');
    opts.querySelectorAll('[data-ans]').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-ans'))));
    if (q) q.innerHTML = `Question ${state.i + 1} of ${N()}: which script is this?<span class="zh">第 ${state.i + 1} 題（共 ${N()} 題）：這是哪一種字體？</span>`;
    if (msg) msg.innerHTML = 'Look at the lines: even or changing? Separate or joined?<span class="zh">看看線條：粗細一樣還是有變化？一筆一筆分開，還是連在一起？</span>';
    draw();
  }
  function answer(a) {
    if (state.answered) return null;
    const it = state.items[state.i], btn = opts.querySelector(`[data-ans="${a}"]`);
    if (a === it.script) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const h = hints[it.script] || { en: '', zh: '' }, last = state.i === N() - 1;
      if (msg) msg.innerHTML = `Yes! This is ${GLYPH[it.key]} in ${NAMES[it.script].en.toLowerCase()} script. ${h.en}${last ? ` You got ${state.right} of ${N()} on the first try.` : ''}<span class="zh">答對了！這是${NAMES[it.script].zh}的「${GLYPH[it.key]}」。${h.zh}${last ? `你一次就答對 ${state.right} 題（共 ${N()} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      const h = hints[a] || { en: '', zh: '' };
      if (msg) msg.innerHTML = `Not ${NAMES[a].en.toLowerCase()} script. ${h.en}<span class="zh">不是${NAMES[a].zh}。${h.zh}</span>`;
    }
    showScore();
    return a === it.script;
  }
  function next() {
    if (state.i >= N() - 1) { state.items = deal(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  root.querySelectorAll('[data-scripts="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-scripts="again"]').forEach((b) => b.addEventListener('click', () => { state.items = deal(); state.i = 0; state.right = 0; showScore(); round(); }));
  new ResizeObserver(size).observe(cv);
  round(); size(); showScore();
  root.__scripts = { state, answer, next };
  return root.__scripts;
}
