/*
 * 書法 · 第六課的兩個 2D 互動（不需要 WebGL）。
 *
 *   initWipe(root)   root＝[data-cal-wipe]：「隸變前後」。同一個字框裡，分隔線左邊畫小篆（藍灰色）、右邊畫隸書（墨色）；
 *                    拉滑桿或直接在畫布上拖，分隔線左右移動。root 的 data-notes：{ key: { en, zh } }（這個字變了什麼）。
 *                    下方讀數：兩種字體在我們畫的字框裡「高 ÷ 寬」各是多少（只有一條橫線的「一」不算）。
 *   initTail(root)   root＝[data-cal-tail]：「找燕尾」。隸書的字畫出來，點有燕尾的那一筆（brush.js 的 hitStroke）；
 *                    點對了那一筆變朱紅色、圈出尾巴；點錯了閃一下並提示。六個字一輪，每個字正好一個燕尾。
 *
 * 除錯：root.__wipe（set(0–1)、setKey(k)、state）、root.__tail（tap(x, y) 字框座標、next()、state）
 */
import { hitStroke, prepStroke } from './brush.js';
import { drawStamps, paperBase } from './ink2d.js';
import { CLERICAL, CLERICAL_KEYS, clericalStamps, drawSeal, glyphFor } from './scripts2d.js';

function sizeCanvas(cv) {
  const css = cv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2), px = Math.round(css * dpr);
  if (cv.width !== px || cv.height !== px) { cv.width = px; cv.height = px; }
  return px;
}
/** 一組筆畫（點陣列的前兩個值是 x、y）的外框 */
export function bbox(strokes) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const st of strokes) for (const q of st.pts) { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); }
  return { w: x1 - x0, h: y1 - y0 };
}

export function initWipe(root) {
  const cv = root.querySelector('.cg-wipe-cv');
  const g = cv.getContext('2d');
  const range = root.querySelector('.cg-wipe-range');
  const note = root.querySelector('.cg-wipe-note');
  const ratio = root.querySelector('.cg-wipe-ratio');
  const notes = JSON.parse(root.getAttribute('data-notes') || '{}');
  const state = { key: 'san', v: Number(range.value) / 100 };
  let S = 0;
  const layer = { seal: document.createElement('canvas'), cler: document.createElement('canvas'), key: '', S: 0 };

  function layers() {
    if (layer.key === state.key && layer.S === S) return;
    layer.key = state.key; layer.S = S;
    const m = S * 0.07, T = { k: (S - m * 2) / 1000, ox: m, oy: m };
    for (const c of [layer.seal, layer.cler]) { c.width = S; c.height = S; }
    drawSeal(layer.seal.getContext('2d'), state.key, T, { color: '#3d5a80' });
    const gc = layer.cler.getContext('2d');
    for (const sts of clericalStamps(state.key)) drawStamps(gc, sts, T, { color: '#151311' });
  }
  function draw() {
    if (!S) return;
    layers();
    paperBase(g, S, S, { seed: 13, fiber: 0.4 });
    const x = Math.round(S * state.v);
    g.save(); g.beginPath(); g.rect(0, 0, x, S); g.clip(); g.drawImage(layer.seal, 0, 0); g.restore();
    g.save(); g.beginPath(); g.rect(x, 0, S - x, S); g.clip(); g.drawImage(layer.cler, 0, 0); g.restore();
    // 分隔線與把手
    g.save();
    g.strokeStyle = '#d99a2b'; g.lineWidth = Math.max(2, S / 180); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, S); g.stroke();
    const r = S * 0.035;
    g.fillStyle = '#d99a2b'; g.beginPath(); g.arc(x, S / 2, r, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#fff'; g.font = `800 ${Math.round(r * 1.1)}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('⇔', x, S / 2 + r * 0.05);
    g.font = `700 ${Math.round(S * 0.038)}px system-ui, "PingFang TC", sans-serif`; g.textBaseline = 'top';
    if (x > S * 0.2) { g.fillStyle = '#3d5a80'; g.textAlign = 'left'; g.fillText('小篆 Seal', S * 0.03, S * 0.025); }
    if (x < S * 0.8) { g.fillStyle = '#151311'; g.textAlign = 'right'; g.fillText('隸書 Clerical', S * 0.97, S * 0.025); }
    g.restore();
    range.style.setProperty('--p', `${state.v * 100}%`);
  }
  function info() {
    const n = notes[state.key];
    if (note) note.innerHTML = n ? `${n.en}<span class="zh">${n.zh}</span>` : '';
    if (ratio) {
      const a = bbox(glyphFor(state.key, 'seal')), b = bbox(glyphFor(state.key, 'clerical'));
      if (a.h < 60 || b.h < 60) { ratio.hidden = true; return; }
      ratio.hidden = false;
      const f = (q) => (q.h / q.w).toFixed(1);
      ratio.innerHTML = `<span><b>${f(a)}</b>Seal: height ÷ width<small>小篆：高 ÷ 寬</small></span><i aria-hidden="true">→</i><span><b>${f(b)}</b>Clerical: height ÷ width<small>隸書：高 ÷ 寬</small></span>`;
    }
  }
  function set(v) { state.v = Math.min(1, Math.max(0, v)); range.value = String(Math.round(state.v * 100)); draw(); }
  function setKey(k) {
    state.key = k;
    root.querySelectorAll('[data-wchar]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-wchar') === k ? 'true' : 'false'));
    info(); draw();
  }
  range.addEventListener('input', () => set(Number(range.value) / 100));
  let drag = false;
  const at = (e) => { const r = cv.getBoundingClientRect(); set((e.clientX - r.left) / r.width); };
  cv.addEventListener('pointerdown', (e) => { drag = true; cv.setPointerCapture(e.pointerId); at(e); e.preventDefault(); });
  cv.addEventListener('pointermove', (e) => { if (drag) at(e); });
  cv.addEventListener('pointerup', () => { drag = false; });
  cv.addEventListener('pointercancel', () => { drag = false; });
  root.querySelectorAll('[data-wchar]').forEach((b) => b.addEventListener('click', () => setKey(b.getAttribute('data-wchar'))));
  new ResizeObserver(() => { S = sizeCanvas(cv); draw(); }).observe(cv);
  S = sizeCanvas(cv); setKey(state.key);
  root.__wipe = { state, set, setKey };
  return root.__wipe;
}

export function initTail(root) {
  const cv = root.querySelector('.cg-tail-cv');
  const g = cv.getContext('2d');
  const msg = root.querySelector('.cg-tail-msg');
  const q = root.querySelector('.cg-tail-q');
  const scoreEl = root.querySelector('.cg-tail-score');
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const samples = Object.fromEntries(CLERICAL_KEYS.map((k) => [k, CLERICAL.chars[k].strokes.map((st) => prepStroke(st))]));
  const state = { order: shuffle(CLERICAL_KEYS), i: 0, right: 0, done: false, firstTry: true, flash: -1 };
  let S = 0, T = { k: 1, ox: 0, oy: 0 };

  function draw() {
    if (!S) return;
    const k = state.order[state.i], c = CLERICAL.chars[k];
    paperBase(g, S, S, { seed: 19, fiber: 0.4 });
    clericalStamps(k).forEach((sts, i) => {
      const color = state.done && i === c.tail ? '#c4321f' : i === state.flash ? '#8a8378' : '#151311';
      drawStamps(g, sts, T, { color });
    });
    if (state.done) {   // 圈出燕尾
      const P = c.strokes[c.tail].pts, e = P[P.length - 3];
      g.save(); g.strokeStyle = '#d99a2b'; g.lineWidth = Math.max(2, S / 150); g.setLineDash([S / 50, S / 70]);
      g.beginPath(); g.arc(T.ox + e[0] * T.k, T.oy + (e[1] - 10) * T.k, 95 * T.k, 0, Math.PI * 2); g.stroke(); g.restore();
    }
  }
  function say(html) { if (msg) msg.innerHTML = html; }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${CLERICAL_KEYS.length}`; }
  function round() {
    const c = CLERICAL.chars[state.order[state.i]];
    state.done = false; state.firstTry = true; state.flash = -1;
    if (q) q.innerHTML = `Character ${state.i + 1} of ${CLERICAL_KEYS.length}: ${c.char} (${c.en}), ${c.count} ${c.count === 1 ? 'stroke' : 'strokes'}<span class="zh">第 ${state.i + 1} 個字（共 ${CLERICAL_KEYS.length} 個）：「${c.char}」，${c.count} 畫</span>`;
    say('Tap the stroke that ends with a swallow tail.<span class="zh">點一下有燕尾的那一筆。</span>');
    draw();
  }
  function tap(x, y) {
    if (state.done) return -2;
    const k = state.order[state.i], c = CLERICAL.chars[k];
    const hit = hitStroke(samples[k].map((s, i) => ({ i, s })), x, y, 90);
    if (hit < 0) { say('Tap right on a stroke.<span class="zh">請點在筆畫上。</span>'); return hit; }
    if (hit === c.tail) {
      state.done = true;
      if (state.firstTry) state.right++;
      const last = state.i === CLERICAL_KEYS.length - 1;
      say(`Yes! The ${c.strokes[hit].en.toLowerCase()} stroke ends with a press and a flick up to the right. The other strokes end round.${last ? ' That was the last one: every character here has just one swallow tail.' : ''}<span class="zh">對！這一筆（${c.strokes[hit].zh}）收筆先按、再往右上挑出去；其他的筆畫收筆都是圓的。${last ? '這是最後一個字：這裡每個字都只有一個燕尾。' : ''}</span>`);
    } else {
      state.firstTry = false; state.flash = hit;
      say('Not that one: it ends round. Look for the stroke that is pressed down and then flicked up to the right.<span class="zh">不是這一筆，它的收筆是圓的。找找哪一筆最後按下去、再往右上挑出去。</span>');
      setTimeout(() => { state.flash = -1; draw(); }, 700);
    }
    showScore(); draw();
    return hit;
  }
  function next() {
    if (state.i >= CLERICAL_KEYS.length - 1) { state.order = shuffle(CLERICAL_KEYS); state.i = 0; state.right = 0; }
    else state.i++;
    showScore(); round();
  }
  cv.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const r = cv.getBoundingClientRect();
    tap((((e.clientX - r.left) / r.width) * S - T.ox) / T.k, (((e.clientY - r.top) / r.height) * S - T.oy) / T.k);
  });
  cv.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  root.querySelectorAll('[data-tail="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-tail="again"]').forEach((b) => b.addEventListener('click', () => { state.order = shuffle(CLERICAL_KEYS); state.i = 0; state.right = 0; showScore(); round(); }));
  new ResizeObserver(() => { S = sizeCanvas(cv); const m = S * 0.06; T = { k: (S - m * 2) / 1000, ox: m, oy: m }; draw(); }).observe(cv);
  S = sizeCanvas(cv); { const m = S * 0.06; T = { k: (S - m * 2) / 1000, ox: m, oy: m }; }
  round(); showScore();
  root.__tail = { state, tap, next };
  return root.__tail;
}
