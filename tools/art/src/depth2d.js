/*
 * 美術 Art · 第六課的 2D 部分（不需要 WebGL）：把「一張畫」畫到 canvas 上，以及兩個小互動。
 *   drawPicture(canvas, items, { labels })   天空、地面，再由遠到近畫每一棵樹（顏色直接用 depth.js 算的數字）
 *   [data-ar-far]      哪一個比較遠？八題，每題只用一種線索。__far：round()、answer('A'|'B')、correct()、next()
 *   [data-ar-arrange]  自己排一張風景：三棵樹各放在五個位置之一，完成三個任務。__arr：set({A,B,C})、check()、next()、state
 */
import { css } from './color.js';
import {
  ALL_ON, ARRANGE_TASKS, DIST, EYE, FAR_ROUNDS, GROUND, HAZE, HILL, PIC, SKY_TOP, arrangeItems, farPair, hillOutline,
} from './depth.js';

const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const OUT = hillOutline();

export function fitPic(canvas) {
  const k = Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1))), W = 800 * k, H = 600 * k;
  if (canvas.width !== W) { canvas.width = W; canvas.height = H; }
  return W / PIC.w;                                   // 一公尺等於幾個 canvas 像素
}
/** 畫面座標（公尺；x 以中心為 0、y 從底邊往上）→ canvas 像素。 */
export const toPx = (x, y, s) => [(x + PIC.w / 2) * s, (PIC.h - y) * s];

export function drawPicture(canvas, items, { labels = true } = {}) {
  const ctx = canvas.getContext('2d'), s = fitPic(canvas), W = canvas.width, H = canvas.height, hy = (PIC.h - EYE.y) * s;
  const g = ctx.createLinearGradient(0, 0, 0, hy);
  g.addColorStop(0, css(SKY_TOP)); g.addColorStop(1, css(HAZE));
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, hy);
  ctx.fillStyle = css(GROUND); ctx.fillRect(0, hy, W, H - hy);
  for (const it of items) {
    ctx.beginPath();
    OUT.forEach(([ox, oy], k) => { const [px, py] = toPx(it.x + ox * it.scale, it.baseY + oy * it.scale, s); if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py); });
    ctx.closePath(); ctx.fillStyle = css(it.color); ctx.fill();
  }
  if (labels) {
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const it of items) {
      const tag = it.name || String(it.n), [px, py] = toPx(it.x, it.baseY + HILL.h * it.scale + 0.09, s), r = 0.085 * s;
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fillStyle = '#10131c'; ctx.fill();
      ctx.lineWidth = 0.012 * s; ctx.strokeStyle = '#ffffff'; ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.font = `800 ${Math.round(0.11 * s)}px system-ui, sans-serif`; ctx.fillText(tag, px, py + 0.004 * s);
    }
  }
}
/** 讀出 canvas 上（畫面座標）某一點的像素。 */
export function pixelAt(canvas, x, y) {
  const s = canvas.width / PIC.w, [px, py] = toPx(x, y, s), d = canvas.getContext('2d').getImageData(Math.round(px), Math.round(py), 1, 1).data;
  return [d[0], d[1], d[2]];
}

export function initFar(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-fr-k'), score: $('.ar-fr-score'), steps: $('.ar-fr-steps'), cv: $('.ar-fr-cv'), opts: Array.from(root.querySelectorAll('[data-pick]')), msg: $('.ar-fr-msg'), next: $('.ar-fr-next') };
  const state = { i: 0, right: 0, done: 0, solved: false };
  const NQ = FAR_ROUNDS.length;
  E.steps.innerHTML = FAR_ROUNDS.map(() => '<i></i>').join('');
  const round = () => FAR_ROUNDS[state.i];
  const WHY = {
    overlap: ['Overlap', 'It is partly hidden, so something else must be in front of it.', '重疊', '它有一部分被擋住了，所以一定有別的東西在它前面。'],
    size: ['Size', 'It is drawn smaller, and the two trees are really the same size.', '大小', '它畫得比較小，而兩棵樹實際上一樣大。'],
    position: ['Position', 'Its foot is higher on the picture, closer to the horizon.', '位置', '它的底邊在畫面上比較高，比較靠近地平線。'],
    air: ['Air', 'It is paler and bluer, as if more air lay between you and it.', '空氣', '它比較淡、比較藍，好像和你之間隔著比較多的空氣。'],
  };
  function draw() {
    drawPicture(E.cv, farPair(round()));
    E.k.textContent = `Question ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 題（共 ${NQ} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((x, n) => { x.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); b.querySelector('.ar-pk-mk').textContent = ''; });
    E.next.hidden = true;
    E.msg.innerHTML = bi('The two trees are really the same size and the same color. Which one looks farther away?', '兩棵樹實際上一樣大、一樣顏色。哪一棵看起來比較遠？');
  }
  function answer(pick) {
    if (state.solved) return null;
    const r = round(), ok = pick === r.far, w = WHY[r.cue];
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.forEach((b) => { b.disabled = true; });
    const good = E.opts.find((b) => b.getAttribute('data-pick') === r.far);
    good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ this one · 是這個';
    if (!ok) { const b = E.opts.find((x) => x.getAttribute('data-pick') === pick); b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個'; }
    const last = state.i === NQ - 1;
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} Tree ${r.far} is the far one. The cue here is ${w[0].toLowerCase()}: ${w[1]}${last ? ` You got ${state.right} of ${NQ}.` : ''}`, `${ok ? '✓' : '✗'} 比較遠的是 ${r.far}。這一題用的線索是「${w[2]}」：${w[3]}${last ? `${NQ} 題裡你答對了 ${state.right} 題。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; draw(); }
  E.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  window.addEventListener('resize', () => drawPicture(E.cv, farPair(round())));
  go(0);
  root.__far = { state, round, answer, correct: () => round().far, next: () => go(Math.min(NQ - 1, state.i + 1)) };
}

export function initArrange(root) {
  const $ = (s) => root.querySelector(s);
  const E = { cv: $('.ar-ag-cv'), task: $('.ar-ag-task'), k: $('.ar-ag-k'), msg: $('.ar-ag-msg'), check: $('.ar-ag-check'), next: $('.ar-ag-next'), rows: Array.from(root.querySelectorAll('[data-tree]')) };
  const state = { t: 0, slots: { A: 3, B: 3, C: 3 }, solved: false };
  const NT = ARRANGE_TASKS.length;
  function draw() {
    drawPicture(E.cv, arrangeItems(state.slots, ALL_ON));
    E.k.textContent = `Task ${state.t + 1} of ${NT} · 第 ${state.t + 1} 個任務（共 ${NT} 個）`;
    E.task.innerHTML = bi(ARRANGE_TASKS[state.t].en, ARRANGE_TASKS[state.t].zh);
    E.rows.forEach((row) => {
      const name = row.getAttribute('data-tree'), v = state.slots[name];
      row.querySelector('input').value = v; row.querySelector('input').disabled = state.solved;
      row.querySelector('output').textContent = `${v} · ${DIST[v - 1]} m`;
    });
    E.check.hidden = state.solved; E.next.hidden = !state.solved;
    E.next.textContent = state.t === NT - 1 ? 'Start again · 重新開始' : 'Next task · 下一個任務';
  }
  function check() {
    if (state.solved) return null;
    const ok = ARRANGE_TASKS[state.t].check(state.slots);
    if (ok) { state.solved = true; E.msg.innerHTML = bi('✓ Done. Look at how the picture shows it: the far tree is smaller, higher, paler, and partly hidden.', '✓ 完成了。看看畫面是怎麼表現的：遠的那棵比較小、比較高、比較淡，而且有一部分被擋住。'); }
    else E.msg.innerHTML = bi('✗ Not yet. Place 1 is the nearest and place 5 is the farthest. Read the task again and move the sliders.', '✗ 還沒有。位置 1 最近，位置 5 最遠。再讀一次任務，移動滑桿。');
    draw();
    return ok;
  }
  function go(t) {
    state.t = t; state.slots = { A: 3, B: 3, C: 3 }; state.solved = false;
    E.msg.innerHTML = bi('All three trees start at the same distance, so they overlap in one clump. Move each one nearer or farther.', '三棵樹一開始都在同樣的距離，所以擠成一團。把每一棵移近或移遠。');
    draw();
  }
  E.rows.forEach((row) => row.querySelector('input').addEventListener('input', (e) => { state.slots[row.getAttribute('data-tree')] = Number(e.target.value); draw(); }));
  E.check.addEventListener('click', check);
  E.next.addEventListener('click', () => go(state.t === NT - 1 ? 0 : state.t + 1));
  window.addEventListener('resize', draw);
  go(0);
  root.__arr = { state, check, set: (s) => { Object.assign(state.slots, s); draw(); }, next: () => go(Math.min(NT - 1, state.t + 1)) };
}
