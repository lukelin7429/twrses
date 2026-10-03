/*
 * 書法 · 「猜下一筆」小遊戲（2D canvas，不需要 WebGL；第四課起可共用）。
 *
 *   initGuess(root, chars, keys)   root＝[data-cal-guess]；chars＝{ key: 筆畫資料 }；keys＝出題的順序
 *
 * 一個字的筆畫全部淡灰色畫出來，學生依筆順一筆一筆點：點對了那一筆變黑、標上藍色數字；
 * 點錯了那一筆閃紅、提示這個字用的筆順規則（root 的 data-hints：{ key: { en, zh } }）。
 * 判斷點到哪一筆用 brush.js 的 hitStroke（離中心線最近、90 單位以內）。觸控時頁面不捲動。
 * 除錯：root.__guess（state、tap(x, y)（字框座標）、next()）
 */
import { BOX, hitStroke, prepStroke, stamps } from './brush.js';
import { drawGrid, drawStamps, paperBase } from './ink2d.js';

export function initGuess(root, chars, keys) {
  const cv = root.querySelector('.cg-guess-cv');
  const g = cv.getContext('2d');
  const msg = root.querySelector('.cg-guess-msg');
  const scoreEl = root.querySelector('.cg-guess-score');
  const charEl = root.querySelector('.cg-guess-char');
  const hints = JSON.parse(root.getAttribute('data-hints') || '{}');
  const prepared = {};
  for (const k of keys) prepared[k] = chars[k].strokes.map((st) => { const s = prepStroke(st); return { s, sts: stamps(s) }; });
  const state = { ci: 0, key: keys[0], done: 0, right: 0, tries: 0, flash: null, firstTry: true };
  let S = 0, T = { k: 1, ox: 0, oy: 0 };

  function size() {
    const css = cv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2), px = Math.round(css * dpr);
    if (cv.width !== px || cv.height !== px) { cv.width = px; cv.height = px; }
    S = px; T = { k: px / BOX, ox: 0, oy: 0 };
    draw();
  }
  function draw() {
    if (!S) return;
    paperBase(g, S, S, { seed: 17, fiber: 0.35 });
    drawGrid(g, S * 0.012, S * 0.012, S * 0.976, { kind: 'jiu', lw: Math.max(1, S / 360) });
    const ps = prepared[state.key], ch = chars[state.key];
    ps.forEach((m, i) => {
      if (i < state.done) drawStamps(g, m.sts, T, { color: '#151311' });
      else if (state.flash && state.flash.i === i) drawStamps(g, m.sts, T, { color: 'rgb(214,72,60)', alpha: 0.75 });
      else drawStamps(g, m.sts, T, { color: 'rgb(150,140,125)', alpha: 0.32 });
    });
    for (let i = 0; i < state.done; i++) {   // 已寫的筆標藍色數字
      const st = ch.strokes[i], a = ps[i].s[0], b = ps[i].s[Math.min(ps[i].s.length - 1, 12)];
      const L = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const [x, y] = st.num || [a.x - ((b.x - a.x) / L) * 50, a.y - ((b.y - a.y) / L) * 50];
      const r = 24 * T.k;
      g.save(); g.fillStyle = 'rgba(31,111,139,.92)'; g.beginPath(); g.arc(x * T.k, y * T.k, r, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff'; g.font = `800 ${Math.round(r * 1.25)}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(String(i + 1), x * T.k, y * T.k + r * 0.06); g.restore();
    }
  }
  function say(html) { if (msg) msg.innerHTML = html; }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${state.tries}`; }
  function start(ci) {
    state.ci = ci % keys.length; state.key = keys[state.ci]; state.done = 0; state.flash = null; state.firstTry = true;
    const ch = chars[state.key];
    if (charEl) charEl.innerHTML = `${ch.char} <small>${ch.en} · ${ch.count} strokes · ${ch.count} 畫</small>`;
    say('Tap the stroke that comes first.<span class="zh">點第一筆。</span>');
    draw();
  }
  function tap(x, y) {
    const ch = chars[state.key], ps = prepared[state.key];
    if (state.done >= ps.length) return -2;
    const left = ps.map((m, i) => ({ i, s: m.s })).filter((m) => m.i >= state.done);
    const hit = hitStroke(left, x, y, 90);
    if (hit < 0) { say('Tap right on one of the gray strokes.<span class="zh">請點在灰色的筆畫上。</span>'); return hit; }
    state.tries++;
    if (hit === state.done) {
      if (state.firstTry) state.right++;
      state.done++; state.flash = null; state.firstTry = true;
      if (state.done >= ps.length) say(`Well done! That is the standard order for ${ch.char}. Tap Next for another character.<span class="zh">答對了！這就是「${ch.char}」的標準筆順。按「下一個字」繼續。</span>`);
      else say(`Yes! Stroke ${state.done} is ${ch.strokes[state.done - 1].en.toLowerCase()}. Which comes next?<span class="zh">對！第 ${state.done} 筆是${ch.strokes[state.done - 1].zh}。下一筆是哪一筆？</span>`);
    } else {
      state.firstTry = false;
      state.flash = { i: hit };
      const h = hints[state.key];
      say(`Not yet. ${h ? h.en : ''}<span class="zh">還不是這一筆。${h ? h.zh : ''}</span>`);
      setTimeout(() => { state.flash = null; draw(); }, 700);
    }
    showScore(); draw();
    return hit;
  }
  cv.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const r = cv.getBoundingClientRect();
    tap(((e.clientX - r.left) / r.width) * BOX, ((e.clientY - r.top) / r.height) * BOX);
  });
  cv.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  root.querySelectorAll('[data-guess]').forEach((b) => b.addEventListener('click', () => {
    const k = b.getAttribute('data-guess');
    if (k === 'next') start(state.ci + 1);
    if (k === 'again') start(state.ci);
  }));
  new ResizeObserver(size).observe(cv);
  start(0); size(); showScore();
  root.__guess = { state, tap, next: () => start(state.ci + 1), start };
  return root.__guess;
}
