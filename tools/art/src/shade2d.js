/*
 * 美術 Art · 第三課的兩個小互動（不需要 WebGL；球畫在 2D canvas 上，用的是 shade.js 同一條公式）。
 *   [data-ar-lamp]  燈在哪裡？六題：看球的明暗和影子，選出光從哪裡來（選項有箭頭和文字）。__lamp：round()、answer(key)、next()、correct()
 *   [data-ar-sort]  由亮排到暗：五塊灰，點兩塊交換位置，排好再對答案（對完顯示每塊的 L*）。__sort：order()、swap(i, j)、check()、next()
 */
import { DIRS, LAMP_ROUNDS, SHUFFLES, SORT_ROUNDS, ballValue, isSorted, lightDir, lightness, tableValue } from './shade.js';

const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;

/** 從正前方稍微偏上看一顆球：畫在 canvas 上。 */
export function drawBall(cv, l) {
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  const r = Math.round(H * 0.3), cx = W / 2, cy = Math.round(H * 0.46), base = cy + r, k = 0.36;   // k：桌面往後的壓扁程度
  const horizon = base - Math.round(3.2 * r * k);
  const img = ctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v;
      const dx = (x - cx) / r, dy = (cy - y) / r, rr = dx * dx + dy * dy;
      if (rr <= 1) v = ballValue([dx, dy, Math.sqrt(1 - rr)], l, [0, 0, 1]);
      else if (y >= horizon) v = tableValue(dx, (y - base) / (r * k), l);
      else v = 0.1;
      const g = Math.round(v * 255), o = (y * W + x) * 4;
      d[o] = d[o + 1] = d[o + 2] = g; d[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function initLamp(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-lp-k'), score: $('.ar-lp-score'), steps: $('.ar-lp-steps'), cv: $('.ar-lp-cv'), opts: $('.ar-lp-opts'), msg: $('.ar-lp-msg'), next: $('.ar-lp-next') };
  const state = { i: 0, right: 0, done: 0, tried: false, solved: false };
  const NQ = LAMP_ROUNDS.length;
  E.steps.innerHTML = LAMP_ROUNDS.map(() => '<i></i>').join('');
  const round = () => LAMP_ROUNDS[state.i];
  function draw() {
    const r = round(), a = DIRS[r.answer];
    drawBall(E.cv, lightDir(a.az, a.el));
    E.k.textContent = `Question ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 題（共 ${NQ} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.opts.innerHTML = r.options.map((o) => `<button type="button" class="ar-lp-opt" data-o="${o}"><i aria-hidden="true">${DIRS[o].arrow}</i><b>${DIRS[o].en}</b><span class="zh">${DIRS[o].zh}</span><span class="ar-pk-mk"></span></button>`).join('');
    E.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-o'))));
    E.next.hidden = true;
    E.msg.innerHTML = bi('Where is the lamp? Look for the lightest part of the ball, then see which way the shadow points.', '燈在哪裡？先找球上最亮的地方，再看影子往哪一邊倒。');
  }
  function answer(o) {
    if (state.solved) return null;
    const r = round(), b = E.opts.querySelector(`[data-o="${o}"]`);
    if (o === r.answer) {
      state.solved = true; state.done++; if (!state.tried) state.right++;
      b.classList.add('is-right'); b.querySelector('.ar-pk-mk').textContent = '✓ right · 答對了';
      E.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      const why = {
        ul: ['The lightest part is at the upper left, and the shadow falls to the right. The shadow always points away from the lamp.', '最亮的地方在左上，影子落在右邊。影子永遠指向燈的反方向。'],
        ur: ['The lightest part is at the upper right, and the shadow falls to the left.', '最亮的地方在右上，影子落在左邊。'],
        top: ['The top of the ball is lightest, and the shadow is a small patch right under it.', '球的頂端最亮，影子是正下方的一小塊。'],
        left: ['The light skims in from the left. Half the ball is dark, and the shadow is very long.', '光從左邊低低地掃過來。球有一半是暗的，影子拉得很長。'],
        right: ['The light skims in from the right. Half the ball is dark, and the shadow is very long.', '光從右邊低低地掃過來。球有一半是暗的，影子拉得很長。'],
        front: ['Almost the whole ball is light, and the shadow hides behind it. A lamp beside your eyes makes a ball look flattest.', '幾乎整顆球都是亮的，影子躲在球後面。燈在眼睛旁邊的時候，球看起來最扁平。'],
      }[r.answer];
      const last = state.i === NQ - 1;
      E.msg.innerHTML = bi(`✓ ${why[0]}${last ? ` You got ${state.right} of ${NQ} right on the first try.` : ''}`, `✓ ${why[1]}${last ? `${NQ} 題裡有 ${state.right} 題第一次就答對。` : ''}`);
      E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
      E.score.textContent = `${state.right} / ${state.done}`;
    } else {
      state.tried = true; b.disabled = true; b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個';
      E.msg.innerHTML = bi('✗ Not from there. The shadow points away from the lamp, and the lightest part of the ball faces it.', '✗ 不是從那裡。影子指向燈的反方向，球上最亮的地方則朝著燈。');
    }
    return o === r.answer;
  }
  function go(i) { state.i = i; state.tried = false; state.solved = false; draw(); }
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__lamp = { state, round, answer, next: () => go(Math.min(NQ - 1, state.i + 1)), correct: () => round().answer };
}

export function initSort(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-so-k'), row: $('.ar-so-row'), msg: $('.ar-so-msg'), check: $('.ar-so-check'), next: $('.ar-so-next') };
  const state = { i: 0, order: [], pick: -1, solved: false, checks: 0 };
  const NR = SORT_ROUNDS.length;
  const vals = () => state.order.map((k) => SORT_ROUNDS[state.i][k]);
  function draw() {
    const v = vals();
    E.k.textContent = `Round ${state.i + 1} of ${NR} · 第 ${state.i + 1} 回合（共 ${NR} 回合）`;
    E.row.innerHTML = v.map((g, n) => {
      const c = Math.round(g * 255);
      return `<button type="button" class="ar-so-sq${state.pick === n ? ' is-pick' : ''}" data-n="${n}" aria-pressed="${state.pick === n}" aria-label="Square in place ${n + 1} · 第 ${n + 1} 格的方塊"${state.solved ? ' disabled' : ''}>`
        + `<i style="background:rgb(${c}, ${c}, ${c})"></i><span class="ar-so-pos">${n + 1}</span><span class="ar-so-l">${state.solved ? `L* ${lightness(g).toFixed(0)}` : ''}</span></button>`;
    }).join('');
    E.row.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => tap(Number(b.getAttribute('data-n')))));
    E.check.hidden = state.solved;
    E.next.hidden = !state.solved;
    E.next.textContent = state.i === NR - 1 ? 'Play again · 再玩一次' : 'Next round · 下一回合';
  }
  function swap(a, b) { const o = state.order; [o[a], o[b]] = [o[b], o[a]]; state.pick = -1; draw(); }
  function tap(n) {
    if (state.solved) return;
    if (state.pick < 0) { state.pick = n; draw(); E.msg.innerHTML = bi(`Square ${n + 1} is picked (it has a thick dashed border). Now click the square to trade places with.`, `選了第 ${n + 1} 格（粗虛線框起來的那一塊）。再點要和它交換位置的那一塊。`); return; }
    if (state.pick === n) { state.pick = -1; draw(); return; }
    swap(state.pick, n);
    E.msg.innerHTML = bi('Traded. Keep going, then press Check.', '交換好了。繼續排，排好再按「對答案」。');
  }
  function check() {
    if (state.solved) return null;
    state.checks++;
    const v = vals(), ok = isSorted(v);
    if (ok) {
      state.solved = true;
      E.msg.innerHTML = bi(`✓ In order, from light to dark. The L* numbers under the squares show how far apart they are. ${state.i === NR - 1 ? 'That was the hardest round.' : 'The next round is harder: the grays are closer together.'}`, `✓ 排對了，由亮到暗。方塊下面的 L* 數字顯示它們彼此差多少。${state.i === NR - 1 ? '這是最難的一回合。' : '下一回合更難：灰色彼此更接近。'}`);
    } else {
      const sorted = [...v].sort((a, b) => b - a), n = v.filter((g, k) => g === sorted[k]).length;
      E.msg.innerHTML = bi(`✗ Not yet. ${n} of the 5 squares are in the right place. Place 1 is for the lightest and place 5 for the darkest.`, `✗ 還沒排好。5 塊裡有 ${n} 塊在對的位置。第 1 格放最亮的，第 5 格放最暗的。`);
    }
    draw();
    return ok;
  }
  function go(i) {
    state.i = i; state.order = SHUFFLES[i].slice(); state.pick = -1; state.solved = false; state.checks = 0;
    E.msg.innerHTML = bi('Click one square, then another, to trade their places. Put the lightest on the left and the darkest on the right.', '點一塊，再點另一塊，兩塊就會交換位置。把最亮的排在左邊，最暗的排在右邊。');
    draw();
  }
  E.check.addEventListener('click', check);
  E.next.addEventListener('click', () => go(state.i === NR - 1 ? 0 : state.i + 1));
  go(0);
  root.__sort = { state, order: () => state.order.slice(), vals, swap, check, next: () => go(Math.min(NR - 1, state.i + 1)), solve: () => { state.order = [0, 1, 2, 3, 4]; draw(); } };
}
