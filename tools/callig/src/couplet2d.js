/*
 * 書法 · 第十一課：春聯的資料與 2D 互動（不需要 WebGL）。
 *
 *   CHARS                 { chun: 春, fu: 福 }（寫字引擎的筆畫資料，楷書，自繪）
 *   toneClass(tone)       國語聲調 → 'ping'（一聲、二聲）或 'ze'（三聲、四聲）。只是入門的判斷法：
 *                         古代的入聲字現在分散在四個聲調裡，所以有例外（課文有說明）；
 *                         資料裡的每一副對聯都標了 ze：true|false（依古音），不靠這個函式判斷對錯
 *   upperIndex(pair)      一副對聯 [{ text, last: { zh, py, tone, ze } }, …] 裡哪一句是上聯（末字仄聲的那一句）
 *   drawFang(g, S, key, { flip, color })   畫一張斗方：紅色菱形紙＋「春」或「福」（flip＝倒過來）
 *   drawStrip(g, w, h, text, opt)          畫一條直的春聯（紅紙、直排的字；字用系統的楷體或黑體，不是書法範本）
 *   drawMinis()           卡片小圖：canvas[data-cg-fang="chun|fu"]（data-flip="1" 倒貼）
 *   initSides(root)       root＝[data-cal-sides]：「哪一句是上聯？」兩句擺在一起，選出上聯；答對後告訴你貼哪一邊。
 *                         root 的 data-couplets：[{ a, b, top }]，a／b 各是 { text, last: { zh, py, tone, ze } }
 *
 * 除錯：root.__sides（answer(0|1)、next()、state）
 */
import { prepStroke, stamps } from './brush.js';
import { drawStamps } from './ink2d.js';
import CHUN from './strokes/chun.json';
import FU from './strokes/fu.json';

export const CHARS = { chun: CHUN, fu: FU };
export const RED = '#c8281e', RED_DK = '#a81f17', INK = '#17120e', GOLD = '#f0c44c';
export const FONT = '"Kaiti TC", "BiauKai", "DFKai-SB", "標楷體", "PingFang TC", "Microsoft JhengHei", serif';
export const toneClass = (tone) => (tone === 1 || tone === 2 ? 'ping' : 'ze');
export const upperIndex = (pair) => (pair[0].last.ze ? 0 : 1);

const prepared = new Map();
function prep(char) {
  if (!prepared.has(char)) prepared.set(char, char.strokes.map((st) => stamps(prepStroke(st))));
  return prepared.get(char);
}
/** 紅紙的底：紅色＋一點點灑金 */
export function redPaper(g, w, h, seed = 3) {
  g.fillStyle = RED; g.fillRect(0, 0, w, h);
  let a = (seed * 2654435761) >>> 0 || 1;
  const r = () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
  const n = Math.round((w * h) / 2600);
  for (let i = 0; i < n; i++) {
    g.fillStyle = `rgba(245,205,96,${0.25 + r() * 0.45})`;
    const s = 1 + r() * Math.max(1.5, w / 260);
    g.fillRect(r() * w, r() * h, s, s * (0.6 + r() * 0.8));
  }
}
export function drawFang(g, S, key, { flip = false, color = INK, bg = null } = {}) {
  g.clearRect(0, 0, S, S);
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, S, S); }
  g.save();
  g.beginPath(); g.moveTo(S / 2, S * 0.02); g.lineTo(S * 0.98, S / 2); g.lineTo(S / 2, S * 0.98); g.lineTo(S * 0.02, S / 2); g.closePath(); g.clip();
  redPaper(g, S, S, 5);
  g.strokeStyle = 'rgba(240,196,76,.75)'; g.lineWidth = Math.max(1.5, S / 110);
  g.beginPath(); g.moveTo(S / 2, S * 0.07); g.lineTo(S * 0.93, S / 2); g.lineTo(S / 2, S * 0.93); g.lineTo(S * 0.07, S / 2); g.closePath(); g.stroke();
  if (flip) { g.translate(S, S); g.rotate(Math.PI); }
  const box = S * 0.5, T = { k: box / 1000, ox: (S - box) / 2, oy: (S - box) / 2 };
  for (const sts of prep(CHARS[key])) drawStamps(g, sts, T, { color });
  g.restore();
}
export function drawStrip(g, w, h, text, { color = INK, seed = 7, pad = 0.06 } = {}) {
  redPaper(g, w, h, seed);
  g.strokeStyle = 'rgba(240,196,76,.7)'; g.lineWidth = Math.max(1.5, w / 60);
  g.strokeRect(w * 0.06, w * 0.06, w * 0.88, h - w * 0.12);
  const ch = [...text], n = ch.length, cell = (h * (1 - pad * 2)) / n, size = Math.min(w * 0.7, cell * 0.86);
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `700 ${Math.round(size)}px ${FONT}`;
  ch.forEach((c, i) => g.fillText(c, w / 2, h * pad + cell * (i + 0.5)));
}
/** 橫批：橫的一條；rtl＝由右往左排（傳統） */
export function drawTop(g, w, h, text, { color = INK, rtl = true } = {}) {
  redPaper(g, w, h, 11);
  g.strokeStyle = 'rgba(240,196,76,.7)'; g.lineWidth = Math.max(1.5, h / 60);
  g.strokeRect(h * 0.06, h * 0.06, w - h * 0.12, h * 0.88);
  const ch = [...text], n = ch.length, cell = (w * 0.88) / n, size = Math.min(h * 0.7, cell * 0.86);
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `700 ${Math.round(size)}px ${FONT}`;
  ch.forEach((c, i) => { const k = rtl ? n - 1 - i : i; g.fillText(c, w * 0.06 + cell * (k + 0.5), h / 2); });
}
export function drawMinis() {
  document.querySelectorAll('canvas[data-cg-fang]').forEach((c) => {
    const key = c.getAttribute('data-cg-fang'), S = 240;
    if (!CHARS[key]) return;
    c.width = S; c.height = S;
    drawFang(c.getContext('2d'), S, key, { flip: c.getAttribute('data-flip') === '1' });
  });
}

// ---------------------------------------------------------------------
// 哪一句是上聯？
// ---------------------------------------------------------------------
const TONE = ['', '一聲', '二聲', '三聲', '四聲'], TONE_EN = ['', 'first', 'second', 'third', 'fourth'];
export function initSides(root) {
  const all = JSON.parse(root.getAttribute('data-couplets') || '[]');
  const cvs = [root.querySelector('.cg-sides-a'), root.querySelector('.cg-sides-b')];
  const btns = [root.querySelector('[data-side="0"]'), root.querySelector('[data-side="1"]')];
  const msg = root.querySelector('.cg-sides-msg'), q = root.querySelector('.cg-sides-q'), scoreEl = root.querySelector('.cg-sides-score');
  const ROUNDS = Math.min(8, all.length);
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const deal = () => shuffle(all).slice(0, ROUNDS).map((c) => (rand() < 0.5 ? [c.a, c.b] : [c.b, c.a]));
  const state = { order: deal(), i: 0, right: 0, answered: false, firstTry: true };
  function paint() {
    const pair = state.order[state.i];
    cvs.forEach((cv, k) => {
      if (!cv) return;
      const n = [...pair[k].text].length, w = 150, h = Math.round(w * 0.2 + n * w * 0.82);
      cv.width = w; cv.height = h; cv.style.aspectRatio = `${w} / ${h}`;
      drawStrip(cv.getContext('2d'), w, h, pair[k].text, { seed: 7 + k });
    });
  }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${ROUNDS}`; }
  function round() {
    const pair = state.order[state.i];
    state.answered = false; state.firstTry = true;
    paint();
    btns.forEach((b, k) => {
      b.disabled = false; b.classList.remove('ok', 'no');
      const L = pair[k].last;
      b.innerHTML = `<b>${pair[k].text}</b><span>last character 末字：${L.zh} ${L.py}（${TONE[L.tone]}）</span>`;
    });
    if (q) q.innerHTML = `Round ${state.i + 1} of ${ROUNDS}: which line is the upper line?<span class="zh">第 ${state.i + 1} 題（共 ${ROUNDS} 題）：哪一句是上聯？</span>`;
    if (msg) msg.innerHTML = 'Say the last character of each line. Which one ends in the third or fourth tone?<span class="zh">唸唸看兩句的最後一個字。哪一個是三聲或四聲？</span>';
  }
  function answer(k) {
    if (state.answered) return null;
    const pair = state.order[state.i], up = upperIndex(pair), U = pair[up].last, D = pair[1 - up].last;
    const ok = k === up;
    if (ok) {
      if (state.firstTry) state.right++;
      state.answered = true;
      btns[k].classList.add('ok'); btns.forEach((b) => { b.disabled = true; });
      const last = state.i === ROUNDS - 1;
      if (msg) msg.innerHTML = `Yes! ${U.zh} (${U.py}) is ${TONE_EN[U.tone]} tone, an oblique tone, so this is the upper line. ${D.zh} (${D.py}) is ${TONE_EN[D.tone]} tone, a level tone: the lower line. Hang the upper line on the right as you face the door.${last ? ` You got ${state.right} of ${ROUNDS} on the first try.` : ''}`
        + `<span class="zh">答對了！「${U.zh}」是${TONE[U.tone]}（仄聲），所以這一句是上聯；「${D.zh}」是${TONE[D.tone]}（平聲），是下聯。面對大門，上聯貼右邊。${last ? `你一次就答對 ${state.right} 題（共 ${ROUNDS} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      btns[k].classList.add('no'); btns[k].disabled = true;
      const L = pair[k].last;
      if (msg) msg.innerHTML = `Not this one. ${L.zh} (${L.py}) is ${TONE_EN[L.tone]} tone, a level tone, so this line is the lower line.<span class="zh">不是這一句。「${L.zh}」是${TONE[L.tone]}（平聲），所以這一句是下聯。</span>`;
    }
    showScore();
    return ok;
  }
  function next() {
    if (state.i >= ROUNDS - 1) { state.order = deal(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  btns.forEach((b, k) => b.addEventListener('click', () => answer(k)));
  root.querySelectorAll('[data-sides="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-sides="again"]').forEach((b) => b.addEventListener('click', () => { state.order = deal(); state.i = 0; state.right = 0; showScore(); round(); }));
  round(); showScore();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paint);
  root.__sides = { state, answer, next };
  return root.__sides;
}
