/*
 * 看得見的數學 · 第二課不需要 WebGL 的小互動（方陣引擎 array.js 的 2D 版）。
 *
 *   arraySVG(rows, cols, opts)   一盤圓點的平面圖（rows 橫排、每排 cols 個）
 *   initMatch(el)   [data-mth-match]   哪一盤是它轉過來的：八題，記第一次就答對的題數，不計時
 *   initTable(el)   [data-mth-table]   乘法表的對稱：點一格，對角線另一邊的那一格一起亮；對摺以後剩 55 格
 *   drawArrayMinis()   .mth-mini[data-array="3x4"]   卡片上的小圖
 */
import { factsToLearn, makeTurnQuiz, mulberry32, pairsOf, total } from './array.js';

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;

/** opts.box＝外框固定成 box × box 格（選項之間大小才比得出來）；opts.fill＝圓點的顏色 */
export function arraySVG(rows, cols, opts = {}) {
  const u = 12, pad = 8, box = opts.box || 0;
  const W = Math.max(cols, box) * u + pad * 2, H = Math.max(rows, box) * u + pad * 2;
  const x0 = (W - cols * u) / 2, y0 = (H - rows * u) / 2;
  let dots = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dots += `<circle cx="${x0 + c * u + u / 2}" cy="${y0 + r * u + u / 2}" r="${u * 0.36}"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" focusable="false">`
    + `<rect x="${x0 - 4}" y="${y0 - 4}" width="${cols * u + 8}" height="${rows * u + 8}" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(160,180,230,.35)"/>`
    + `<g fill="${opts.fill || '#f4c542'}">${dots}</g></svg>`;
}
const say = (rows, cols) => `${rows} ${rows === 1 ? 'row' : 'rows'} of ${cols} · ${rows} 橫排，每排 ${cols} 個`;

export function initMatch(root) {
  const R = { pic: root.querySelector('.mth-pq-pic'), opts: root.querySelector('.mth-mq-opts'), k: root.querySelector('.mth-pq-k'), msg: root.querySelector('.mth-pq-msg'), score: root.querySelector('.mth-pq-score'), next: root.querySelector('.mth-pq-next') };
  let quiz, q, round, first, tried, done;
  const N = () => quiz.length;
  function ask() {
    round = quiz[q]; tried = false; done = false;
    const box = Math.max(round.rows, round.cols, ...round.options.flat());
    R.pic.innerHTML = arraySVG(round.rows, round.cols);
    R.pic.setAttribute('aria-label', say(round.rows, round.cols));
    R.k.innerHTML = `Question ${q + 1} of ${N()} · 第 ${q + 1} 題（共 ${N()} 題）`;
    R.opts.innerHTML = '';
    round.options.forEach(([a, b], k) => {
      const btn = el('button', 'mth-mq-opt', arraySVG(a, b, { box })); btn.type = 'button';
      btn.setAttribute('aria-label', say(a, b));
      btn.addEventListener('click', () => pick(btn, k));
      R.opts.appendChild(btn);
    });
    R.msg.innerHTML = 'Which tray below is this same tray, turned a quarter turn? Take your time.<span class="zh">下面哪一盤，是上面這一盤轉九十度的樣子？慢慢來，不計時。</span>';
    R.next.hidden = true;
  }
  function pick(b, k) {
    if (done) return;
    const { rows, cols } = round, n = total(rows, cols);
    if (k === round.correct) {
      done = true; if (!tried) first++;
      b.classList.add('is-right');
      R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Correct: ${rows} rows of ${cols} turned is ${cols} rows of ${rows}. ${rows} × ${cols} = ${n}, and ${cols} × ${rows} = ${n}. Nothing was added or taken away.`
        + `<span class="zh">答對了：${rows} 排、每排 ${cols} 個，轉過來就是 ${cols} 排、每排 ${rows} 個。${rows} × ${cols} = ${n}，${cols} × ${rows} = ${n}；轉的時候沒有多、也沒有少。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false;
      R.next.textContent = q + 1 < N() ? 'Next · 下一題' : 'See how I did · 看結果';
      R.next.focus({ preventScroll: true });
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      const [a, c] = round.options[k];
      R.msg.innerHTML = `Not quite. That tray holds ${a * c}, but the one above holds ${n}. Turning a tray cannot change how many are on it.`
        + `<span class="zh">再看一次：那一盤有 ${a * c} 個，上面這一盤有 ${n} 個。把盤子轉個方向，東西不會變多或變少。</span>`;
    }
  }
  function finish() {
    R.pic.innerHTML = ''; R.pic.removeAttribute('aria-label'); R.opts.innerHTML = '';
    R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${N()} right on the first try. ${first === N() ? 'You can see a turned tray at a glance.' : 'Play again for a new set of trays. There is no clock here.'}<span class="zh">你第一次就答對 ${first} 題（共 ${N()} 題）。${first === N() ? '轉過來的盤子，你一眼就認得出來！' : '再玩一次，題目會換新的。這裡不計時。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { quiz = makeTurnQuiz(mulberry32(s ?? seed())); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => {
    if (q >= N()) { start(); return; }
    q++;
    if (q >= N()) finish(); else ask();
  });
  start();
  root.__match = {
    start, round: () => round, q: () => q, first: () => first,
    answer: () => { const b = R.opts.querySelectorAll('button')[round.correct]; if (b) b.click(); },
    wrong: () => { const b = [...R.opts.querySelectorAll('button')].find((x, k) => k !== round.correct && !x.disabled); if (b) b.click(); },
    next: () => R.next.click(),
  };
}

export function initTable(root) {
  const N = 10;
  const R = { grid: root.querySelector('.mth-tb-grid'), msg: root.querySelector('.mth-tb-msg'), fold: root.querySelector('[data-t="fold"]'), count: root.querySelector('.mth-tb-count') };
  let sel = null;
  let html = '<span class="mth-tb-c mth-tb-h mth-tb-corner">×</span>';
  for (let b = 1; b <= N; b++) html += `<span class="mth-tb-c mth-tb-h" data-col="${b}">${b}</span>`;
  for (let a = 1; a <= N; a++) {
    html += `<span class="mth-tb-c mth-tb-h" data-row="${a}">${a}</span>`;
    for (let b = 1; b <= N; b++) html += `<button type="button" class="mth-tb-c${a === b ? ' is-diag' : a > b ? ' is-lower' : ' is-upper'}" data-a="${a}" data-b="${b}" aria-label="${a} × ${b} = ${a * b}">${a * b}</button>`;
  }
  R.grid.innerHTML = html;
  const cell = (a, b) => R.grid.querySelector(`[data-a="${a}"][data-b="${b}"]`);
  function show() {
    R.grid.querySelectorAll('.is-sel, .is-twin, .is-head').forEach((c) => c.classList.remove('is-sel', 'is-twin', 'is-head'));
    const folded = R.fold.checked;
    root.classList.toggle('is-folded', folded);
    R.count.innerHTML = folded
      ? `<b>${factsToLearn(N)}</b> squares left to learn · 還要記的格子`
      : `<b>${N * N}</b> squares in the table · 表裡一共幾格`;
    if (!sel) {
      R.msg.innerHTML = folded
        ? `Fold the table along the gold diagonal and every faded square lands on its twin. That leaves ${N} squares on the diagonal and ${pairsOf(N)} pairs: ${N} + ${pairsOf(N)} = ${factsToLearn(N)} facts, not ${N * N}.<span class="zh">沿著金色的對角線把表對摺，每一個變淡的格子都會疊在和它一樣的格子上。剩下對角線上的 ${N} 格，加上 ${pairsOf(N)} 對：${N}＋${pairsOf(N)}＝${factsToLearn(N)} 格，而不是 ${N * N} 格。</span>`
        : 'Tap any square. Its twin on the other side of the gold diagonal lights up too.<span class="zh">點任何一格，金色對角線另一邊和它成對的那一格也會亮起來。</span>';
      return;
    }
    const [a, b] = sel, v = a * b;
    cell(a, b).classList.add('is-sel');
    R.grid.querySelector(`[data-row="${a}"]`).classList.add('is-head'); R.grid.querySelector(`[data-col="${b}"]`).classList.add('is-head');
    if (a !== b) {
      cell(b, a).classList.add('is-twin');
      R.msg.innerHTML = `${a} × ${b} = ${v}, and across the diagonal ${b} × ${a} = ${v}. Learn one and you know both.<span class="zh">${a} × ${b} = ${v}，對角線另一邊的 ${b} × ${a} 也是 ${v}。記住一個，兩個都會了。</span>`;
    } else {
      R.msg.innerHTML = `${a} × ${a} = ${v} sits on the diagonal. Swapping its two numbers changes nothing, so it has no twin. It is a square number: ${a} rows of ${a} make a square.<span class="zh">${a} × ${a} = ${v} 在對角線上。兩個數一樣，換過來還是自己，所以它沒有成對的格子。這是一個平方數：${a} 排、每排 ${a} 個，排起來是正方形。</span>`;
    }
  }
  R.grid.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-a]'); if (!b) return;
    sel = [Number(b.getAttribute('data-a')), Number(b.getAttribute('data-b'))]; show();
  });
  R.fold.addEventListener('change', () => { sel = null; show(); });
  show();
  root.__table = {
    pick: (a, b) => { sel = [a, b]; show(); }, fold: (v) => { R.fold.checked = v; sel = null; show(); },
    lit: () => [...R.grid.querySelectorAll('.is-sel, .is-twin')].map((c) => c.textContent),
    counts: () => ({ all: R.grid.querySelectorAll('button').length, diag: R.grid.querySelectorAll('.is-diag').length, lower: R.grid.querySelectorAll('.is-lower').length, upper: R.grid.querySelectorAll('.is-upper').length }),
    mismatches: () => { let bad = 0; for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) if (cell(a, b).textContent !== cell(b, a).textContent || Number(cell(a, b).textContent) !== a * b) bad++; return bad; },
  };
}

export function drawArrayMinis() {
  document.querySelectorAll('.mth-mini[data-array]').forEach((m) => {
    const [r, c] = m.getAttribute('data-array').split('x').map(Number);
    m.innerHTML = arraySVG(r, c);
    m.dataset.value = String(r * c);
  });
}
