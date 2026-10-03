/*
 * 書法 · 第五課的兩個 2D 互動（不需要 WebGL）。
 *
 *   initTimeline(root)   root＝[data-cal-time]：「三千年滑桿」。拉滑桿（0–5），同一個字從圖畫 → 甲骨文 → 金文 → 小篆 → 隸書 → 楷書，
 *                        相鄰兩個階段交叉淡入淡出（馬的圖畫會轉 90°，站起來像甲骨文那樣）；放開時吸到最近的階段。
 *                        root 的 data-stages：[{ key, en, zh, when_en, when_zh, text_en, text_zh }]（課程資料）。
 *                        按「播放」每個階段停一下，自己走完三千年。下方一排小圖是整個演變（點了跳過去）。
 *   initWhich(root)      root＝[data-cal-which]：「這是哪個字？」看甲骨文（或金文）選楷書；六題一輪，點錯有提示（data-hints）。
 *
 * 除錯：root.__time（set(v)、play()、state）、root.__which（answer(key)、next()、state）
 */
import { KEYS, STAGES, drawStage } from './scripts2d.js';

const NAME = { ri: '日', yue: '月', shan: '山', shui: '水', ren: '人', ma: '馬' };

function sizeCanvas(cv) {
  const css = cv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2), px = Math.round(css * dpr);
  if (cv.width !== px || cv.height !== px) { cv.width = px; cv.height = px; }
  return px;
}

// 每個字每個階段畫好一張，交叉淡入時直接貼（換大小才重畫）
const cache = new Map();
function stageImage(key, stage, S) {
  const id = `${key}|${stage}|${S}`;
  if (!cache.has(id)) {
    const c = document.createElement('canvas'); c.width = S; c.height = S;
    drawStage(c.getContext('2d'), S, key, stage);
    cache.set(id, c);
  }
  return cache.get(id);
}

export function initTimeline(root) {
  const cv = root.querySelector('.cg-time-cv');
  const g = cv.getContext('2d');
  const range = root.querySelector('.cg-time-range');
  const cap = root.querySelector('.cg-time-cap');
  const note = root.querySelector('.cg-time-note');
  const playB = root.querySelector('[data-time="play"]');
  const info = JSON.parse(root.getAttribute('data-stages') || '[]');
  const state = { key: 'ri', v: Number(range.value) || 0, playing: false };
  let S = 0, raf = 0;

  function draw() {
    if (!S) return;
    const v = Math.min(5, Math.max(0, state.v)), i = Math.min(4, Math.floor(v)), f = v - i;
    g.clearRect(0, 0, S, S);
    const A = stageImage(state.key, STAGES[i].key, S), B = stageImage(state.key, STAGES[i + 1].key, S);
    const put = (img, a, rot = 0) => {
      if (a <= 0.001) return;
      g.save(); g.globalAlpha = a;
      if (rot) { g.translate(S / 2, S / 2); g.rotate(rot); g.translate(-S / 2, -S / 2); }
      g.drawImage(img, 0, 0); g.restore();
    };
    // 馬：圖畫站起來（往逆時針轉 90°），接上甲骨文直立的馬
    const rotA = state.key === 'ma' && i === 0 ? -f * Math.PI / 2 : 0;
    put(A, 1 - f, rotA);
    put(B, f);
    const near = Math.round(v), st = info[near] || STAGES[near];
    if (cap) cap.innerHTML = `<b>${st.zh}</b> ${st.en}${st.when_en ? `<small>${st.when_en} · ${st.when_zh}</small>` : ''}`;
    if (note && note.dataset.k !== `${state.key}|${near}`) {
      note.dataset.k = `${state.key}|${near}`;
      note.innerHTML = st.text_en ? `${st.text_en}<span class="zh">${st.text_zh}</span>` : '';
    }
    range.style.setProperty('--p', `${(v / 5) * 100}%`);
    root.querySelectorAll('[data-stage]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-stage')) === near ? 'true' : 'false'));
  }
  function drawStrip() {
    root.querySelectorAll('.cg-time-mini').forEach((c, j) => {
      const s = sizeCanvas(c);
      const ctx = c.getContext('2d'); ctx.clearRect(0, 0, s, s);
      drawStage(ctx, s, state.key, STAGES[j].key);
    });
  }
  function set(v, snap = false) {
    state.v = snap ? Math.round(v) : v;
    range.value = String(state.v);
    draw();
  }
  function setKey(k) {
    state.key = k;
    root.querySelectorAll('[data-tchar]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-tchar') === k ? 'true' : 'false'));
    drawStrip(); draw();
  }
  // 播放：每個階段停 1.2 秒、移動 1.3 秒
  let t0 = 0, v0 = 0;
  function tick(t) {
    raf = 0;
    if (!state.playing) return;
    if (!t0) { t0 = t; v0 = Math.round(state.v) >= 5 ? 0 : Math.round(state.v); }
    const e = (t - t0) / 1000, per = 2.5, k = Math.floor(e / per), u = e / per - k;
    const v = v0 + k + Math.min(1, Math.max(0, (u - 0.48) / 0.52));
    if (v >= 5) { set(5); stop(); return; }
    const m = v - Math.floor(v);
    set(Math.floor(v) + m * m * (3 - 2 * m));
    raf = requestAnimationFrame(tick);
  }
  function play() {
    state.playing = true; t0 = 0;
    if (playB) { playB.setAttribute('aria-pressed', 'true'); playB.querySelector('.t').textContent = 'Pause · 暫停'; }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function stop() {
    state.playing = false;
    if (playB) { playB.setAttribute('aria-pressed', 'false'); playB.querySelector('.t').textContent = 'Play 3,000 years · 播放三千年'; }
  }
  range.addEventListener('input', () => { stop(); set(Number(range.value)); });
  range.addEventListener('change', () => set(Number(range.value), true));
  root.querySelectorAll('[data-stage]').forEach((b) => b.addEventListener('click', () => { stop(); set(Number(b.getAttribute('data-stage'))); }));
  root.querySelectorAll('.cg-time-mini').forEach((c, j) => c.addEventListener('click', () => { stop(); set(j); }));
  root.querySelectorAll('[data-tchar]').forEach((b) => b.addEventListener('click', () => setKey(b.getAttribute('data-tchar'))));
  if (playB) playB.addEventListener('click', () => (state.playing ? stop() : play()));
  new ResizeObserver(() => { S = sizeCanvas(cv); drawStrip(); draw(); }).observe(cv);
  S = sizeCanvas(cv); setKey('ri');
  root.__time = { state, set, setKey, play, stop };
  return root.__time;
}

export function initWhich(root) {
  const cv = root.querySelector('.cg-which-cv');
  const g = cv.getContext('2d');
  const opts = root.querySelector('.cg-which-opts');
  const msg = root.querySelector('.cg-which-msg');
  const q = root.querySelector('.cg-which-q');
  const scoreEl = root.querySelector('.cg-which-score');
  const strip = root.querySelector('.cg-which-strip');
  const scriptB = root.querySelector('[data-which="script"]');
  const hints = JSON.parse(root.getAttribute('data-hints') || '{}');
  let seed = (Date.now() % 2147483646) + 1;   // 每次進來題目順序不同
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const state = { order: shuffle(KEYS), i: 0, right: 0, tries: 0, answered: false, firstTry: true, stage: 'oracle', choices: [] };
  let S = 0;

  function draw() {
    if (!S) return;
    g.clearRect(0, 0, S, S);
    drawStage(g, S, state.order[state.i], state.stage);
  }
  function showStrip(k) {
    if (!strip) return;
    strip.innerHTML = '';
    STAGES.forEach((st) => {
      const fig = document.createElement('figure');
      const c = document.createElement('canvas'); c.width = 120; c.height = 120;
      drawStage(c.getContext('2d'), 120, k, st.key);
      const fc = document.createElement('figcaption'); fc.textContent = st.zh;
      fig.append(c, fc); strip.append(fig);
    });
    strip.hidden = false;
  }
  function round() {
    const k = state.order[state.i];
    state.answered = false; state.firstTry = true;
    const others = shuffle(KEYS.filter((x) => x !== k)).slice(0, 3);
    state.choices = shuffle([k, ...others]);
    opts.innerHTML = state.choices.map((c) => `<button type="button" data-ans="${c}">${NAME[c]}</button>`).join('');
    opts.querySelectorAll('[data-ans]').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-ans'))));
    const nm = state.stage === 'oracle' ? 'oracle bone script · 甲骨文' : 'bronze script · 金文';
    if (q) q.innerHTML = `Question ${state.i + 1} of ${KEYS.length}: which character is this ${nm.split(' · ')[0]}?<span class="zh">第 ${state.i + 1} 題（共 ${KEYS.length} 題）：這個${nm.split(' · ')[1]}是哪個字？</span>`;
    if (msg) msg.innerHTML = 'Look at the shape, then choose.<span class="zh">看形狀，再選一個字。</span>';
    if (strip) strip.hidden = true;
    draw();
  }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${Math.min(KEYS.length, state.i + (state.answered ? 1 : 0))}`; }
  function answer(a) {
    if (state.answered) return null;
    const k = state.order[state.i];
    state.tries++;
    const btn = opts.querySelector(`[data-ans="${a}"]`);
    if (a === k) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      if (msg) msg.innerHTML = `Yes! It is ${NAME[k]} (${hints[k] ? hints[k].word : ''}). Here is how it changed over 3,000 years:<span class="zh">答對了！這是「${NAME[k]}」。看看它三千年來怎麼變：</span>`;
      showStrip(k);
      if (state.i === KEYS.length - 1 && msg) msg.innerHTML += `<span class="cg-which-end">That was the last one. Tap Play again for a new round${state.stage === 'oracle' ? ', or try the bronze script' : ''}.<span class="zh">這是最後一題。按「再玩一次」重新開始${state.stage === 'oracle' ? '，或改看金文' : ''}。</span></span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      const h = hints[k];
      if (msg) msg.innerHTML = `Not quite. ${h ? h.en : ''}<span class="zh">還不是。${h ? h.zh : ''}</span>`;
    }
    showScore();
    return a === k;
  }
  function next() {
    if (state.i >= KEYS.length - 1) { state.order = shuffle(KEYS); state.i = 0; state.right = 0; state.tries = 0; }
    else state.i++;
    showScore(); round();
  }
  function setStage(s) {
    state.stage = s; state.order = shuffle(KEYS); state.i = 0; state.right = 0; state.tries = 0;
    if (scriptB) scriptB.querySelector('.t').textContent = s === 'oracle' ? 'Try the bronze script · 改看金文' : 'Back to oracle bones · 改回甲骨文';
    showScore(); round();
  }
  root.querySelectorAll('[data-which="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-which="again"]').forEach((b) => b.addEventListener('click', () => setStage(state.stage)));
  if (scriptB) scriptB.addEventListener('click', () => setStage(state.stage === 'oracle' ? 'bronze' : 'oracle'));
  new ResizeObserver(() => { S = sizeCanvas(cv); draw(); }).observe(cv);
  S = sizeCanvas(cv); round(); showScore();
  root.__which = { state, answer, next, setStage };
  return root.__which;
}
