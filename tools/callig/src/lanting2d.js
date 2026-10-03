/*
 * 書法 · 第八課的 2D 互動（不需要 WebGL）。
 *
 *   ZHI              strokes/lanting.json 的四個「之」（z1、z4、z6、z12；index＝全文第幾個）
 *   quad(keys)       把四個字縮小排成 2×2，合成一個「字」給寫字引擎一次寫完（3D 的「四個一起寫」）
 *   initSame(root)   root＝[data-cal-same]：「找出一樣的之」。上面一個「之」，下面四個選項（都是神龍本摹本裡真的字，
 *                    圖在 root 的 data-img：5 × 4 的拼圖，每格一個「之」），點出一模一樣的那一個；八題一輪。
 *                    root 的 data-names：二十個「之」各出自哪一句（答對後顯示）。
 *
 * 除錯：root.__same（answer(tileIndex)、next()、state）
 */
import LT from './strokes/lanting.json';

export const ZHI = LT.chars;
export const ZHI_KEYS = ['z1', 'z4', 'z6', 'z12'];

export function quad(keys = ZHI_KEYS) {
  const off = [[20, 20], [520, 20], [20, 520], [520, 520]];
  const strokes = [];
  keys.forEach((k, i) => {
    for (const st of ZHI[k].strokes) strokes.push({ ...st, n: strokes.length + 1, pts: st.pts.map(([x, y, p, v]) => [off[i][0] + x * 0.46, off[i][1] + y * 0.46, p * 0.52, v * 0.6]) });
  });
  return { char: '之', key: 'quad', box: 1000, count: strokes.length, strokes };
}

export function initSame(root) {
  const img = root.getAttribute('data-img');
  const names = JSON.parse(root.getAttribute('data-names') || '[]');
  const target = root.querySelector('.cg-same-target');
  const opts = root.querySelector('.cg-same-opts');
  const msg = root.querySelector('.cg-same-msg');
  const q = root.querySelector('.cg-same-q');
  const scoreEl = root.querySelector('.cg-same-score');
  const N = 20, ROUNDS = 8, SKIP = 12;   // 第 13 個（向之）是塗改過的，不出題
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const pool = () => shuffle([...Array(N).keys()].filter((i) => i !== SKIP));
  const state = { order: pool(), i: 0, right: 0, answered: false, firstTry: true, choices: [] };
  const tile = (el, i) => {
    el.style.backgroundImage = `url(${img})`;
    el.style.backgroundSize = '500% 400%';
    el.style.backgroundPosition = `${(i % 5) * 25}% ${Math.floor(i / 5) * (100 / 3)}%`;
  };
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${ROUNDS}`; }
  function round() {
    const t = state.order[state.i];
    state.answered = false; state.firstTry = true;
    state.choices = shuffle([t, ...shuffle(state.order.filter((x) => x !== t)).slice(0, 3)]);
    tile(target, t);
    opts.innerHTML = state.choices.map((c) => `<button type="button" data-tile="${c}" aria-label="Choice · 選項"></button>`).join('');
    opts.querySelectorAll('[data-tile]').forEach((b) => { tile(b, Number(b.getAttribute('data-tile'))); b.addEventListener('click', () => answer(Number(b.getAttribute('data-tile')))); });
    if (q) q.innerHTML = `Round ${state.i + 1} of ${ROUNDS}: which one is exactly the same?<span class="zh">第 ${state.i + 1} 題（共 ${ROUNDS} 題）：下面哪一個和上面的一模一樣？</span>`;
    if (msg) msg.innerHTML = 'Look at the dot, the turns, and the last line.<span class="zh">看看那一點、轉彎的地方，還有最後一筆。</span>';
  }
  function answer(c) {
    if (state.answered) return null;
    const t = state.order[state.i], btn = opts.querySelector(`[data-tile="${c}"]`);
    if (c === t) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const last = state.i === ROUNDS - 1;
      if (msg) msg.innerHTML = `Yes! This is 之 number ${t + 1}, from ${names[t] || ''}.${last ? ` You found ${state.right} of ${ROUNDS} on the first try.` : ''}<span class="zh">答對了！這是第 ${t + 1} 個「之」，出自「${names[t] || ''}」。${last ? `你一次就找到 ${state.right} 個（共 ${ROUNDS} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      if (msg) msg.innerHTML = 'Close, but not the same. Every 之 in the scroll is a little different.<span class="zh">很像，但不是同一個。卷子裡每個「之」都有一點不一樣。</span>';
    }
    showScore();
    return c === t;
  }
  function next() {
    if (state.i >= ROUNDS - 1) { state.order = pool(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  root.querySelectorAll('[data-same="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-same="again"]').forEach((b) => b.addEventListener('click', () => { state.order = pool(); state.i = 0; state.right = 0; showScore(); round(); }));
  round(); showScore();
  root.__same = { state, answer, next };
  return root.__same;
}
