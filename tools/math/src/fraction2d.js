/*
 * 看得見的數學 · 第四課不需要 WebGL 的小互動（分數引擎 fraction.js 的 2D 版）。
 *
 *   frac(n, d)        一個排好的分數（HTML＋CSS，role="math"，aria-label 是英文唸法）——3D 的右側欄也用
 *   stripHTML(...)    一條切好、塗好的分數條
 *   initCompare(el)   [data-mth-cmp]     哪一個比較大？八題（同分母、同分子、等值、都不一樣），記第一次就答對的題數，不計時
 *   initAlign(el)     [data-mth-align]   切成一樣大：兩條原本切法不同的條子，一起再切成 k 塊，找出兩條的切線都對齊的 k
 */
import { cutsAlign, lcm, makeCompareQuiz, mulberry32, toDenominator } from './fraction.js';
import { fractionEn, fractionZh } from './names.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;

export function frac(n, d, cls = '') {
  return `<span class="mth-x ${cls}" role="math" aria-label="${fractionEn(n, d)}"><span aria-hidden="true"><span class="mth-fr"><span class="mth-fr-n">${n}</span><span class="mth-fr-d">${d}</span></span></span></span>`;
}

/** 一條分數條：k 塊、前 c 塊塗色；fine＞k 時在每一塊裡再畫細線（切細） */
export function stripHTML(k, c, opts = {}) {
  const cells = Array.from({ length: k }, (_, i) => `<i class="${i < c ? 'on' : ''}"></i>`).join('');
  return `<span class="mth-strip2 ${opts.cls || ''}" style="--k:${k}" role="img" aria-label="${opts.label || ''}">${cells}</span>`;
}

export function initCompare(root) {
  const R = { k: root.querySelector('.mth-pq-k'), a: root.querySelector('.mth-cmp-a'), b: root.querySelector('.mth-cmp-b'), opts: root.querySelector('.mth-cmp-opts'), msg: root.querySelector('.mth-pq-msg'), score: root.querySelector('.mth-pq-score'), next: root.querySelector('.mth-pq-next'), show: root.querySelector('[data-t="strips"]') };
  let quiz, q, it, first, tried, done;
  const N = () => quiz.length;
  function draw() {
    const strips = R.show && R.show.checked;
    const side = (f) => `<span class="mth-cmp-f">${frac(f[0], f[1])}</span>${strips ? stripHTML(f[1], f[0], { label: `${fractionEn(f[0], f[1])} · ${fractionZh(f[0], f[1])}` }) : ''}`;
    R.a.innerHTML = side(it.left); R.b.innerHTML = side(it.right);
  }
  function ask() {
    it = quiz[q]; tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${N()} · 第 ${q + 1} 題（共 ${N()} 題）`;
    draw();
    R.opts.querySelectorAll('button').forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    R.msg.innerHTML = 'Which is more? Picture both as pieces of the same strip.<span class="zh">哪一個比較多？想像它們都是同一條的幾塊。</span>';
    R.next.hidden = true;
  }
  function why() {
    const [a, b] = [it.left, it.right];
    if (it.kind === 'same-d') return [`Same size pieces (${a[1]}ths of the same strip), so more pieces means more.`, `每一塊一樣大（都是 ${a[1]} 等分的一塊），塊數多的就多。`];
    if (it.kind === 'same-n') return [`The same number of pieces, but cutting a strip into more pieces makes each piece smaller.`, `塊數一樣，可是一條切得越多塊，每一塊就越小。`];
    if (it.kind === 'equal') return [`They are the same amount: the pieces are just cut differently.`, `一樣多：只是切法不一樣。`];
    const D = lcm(a[1], b[1]), x = toDenominator(a, D), y = toDenominator(b, D);
    return [`Cut both into ${D} equal pieces: ${x[0]}/${D} and ${y[0]}/${D}.`, `兩條都切成 ${D} 塊：${D} 分之 ${x[0]} 和 ${D} 分之 ${y[0]}。`];
  }
  function pick(btn) {
    if (done) return;
    const ans = btn.getAttribute('data-ans');
    if (ans === it.answer) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right');
      R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      const w = why();
      R.msg.innerHTML = `Correct. ${w[0]}<span class="zh">答對了。${w[1]}</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false;
      R.next.textContent = q + 1 < N() ? 'Next · 下一題' : 'See how I did · 看結果';
      R.next.focus({ preventScroll: true });
      if (R.show && !R.show.checked) { R.show.checked = true; draw(); R.show.checked = false; }
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not quite. Try turning on the strips, or think about how big each piece is.<span class="zh">再看一次：打開下面的分數條，或想想每一塊有多大。</span>';
    }
  }
  function finish() {
    R.a.innerHTML = ''; R.b.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
    R.msg.innerHTML = `You got ${first} of ${N()} right on the first try. ${first === N() ? 'You can see the size of a fraction, not just its numbers.' : 'Play again for a new set. There is no clock here.'}<span class="zh">你第一次就答對 ${first} 題（共 ${N()} 題）。${first === N() ? '你看分數，看的是大小，不只是數字！' : '再玩一次，題目會換新的。這裡不計時。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { quiz = makeCompareQuiz(mulberry32(s ?? seed())); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => pick(b)));
  R.next.addEventListener('click', () => { if (q >= N()) { start(); return; } q++; if (q >= N()) finish(); else ask(); });
  if (R.show) R.show.addEventListener('change', () => { if (q < N()) draw(); });
  start();
  root.__cmp = {
    start, item: () => it, first: () => first,
    answer: () => R.opts.querySelector(`[data-ans="${it.answer}"]`).click(),
    wrong: () => R.opts.querySelector(`[data-ans="${it.answer === 'left' ? 'right' : 'left'}"]`).click(),
    next: () => R.next.click(),
  };
}

const PAIRS = [[[1, 2], [1, 3]], [[1, 3], [1, 4]], [[3, 4], [1, 6]], [[2, 5], [1, 2]], [[3, 8], [1, 6]], [[1, 4], [3, 10]], [[2, 3], [1, 5]]];

export function initAlign(root) {
  const R = { pairs: root.querySelector('.mth-al-pairs'), range: root.querySelector('.mth-al-range'), out: root.querySelector('.mth-al-out'), a: root.querySelector('.mth-al-a'), b: root.querySelector('.mth-al-b'), msg: root.querySelector('.mth-al-msg') };
  let p = 0, k = 1;
  R.pairs.innerHTML = PAIRS.map(([f, g], i) => `<button type="button" data-p="${i}" aria-pressed="${i === 0}">${frac(...f)}<span>and</span>${frac(...g)}</button>`).join('');
  function row(f, label) {
    const d = f[1], ok = k % d === 0;
    const fine = Array.from({ length: k - 1 }, (_, i) => `<b style="left:${((i + 1) / k) * 100}%"></b>`).join('');
    const coarse = Array.from({ length: d - 1 }, (_, i) => { const at = (i + 1) / d, hit = Math.abs(at * k - Math.round(at * k)) < 1e-9; return `<em class="${hit ? 'hit' : 'miss'}" style="left:${at * 100}%"></em>`; }).join('');
    return `<span class="mth-al-lab">${label}${frac(f[0], f[1])}</span><span class="mth-al-bar" role="img" aria-label="${fractionEn(f[0], f[1])}, cut ${ok ? 'evenly' : 'unevenly'} into ${k}"><span class="mth-al-fill" style="width:${(f[0] / d) * 100}%"></span>${fine}${coarse}</span>`;
  }
  function show() {
    const [f, g] = PAIRS[p], D = lcm(f[1], g[1]), both = cutsAlign(f[1], g[1], k);
    R.pairs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-p')) === p)));
    R.range.value = String(k); R.out.textContent = String(k);
    R.a.innerHTML = row(f, ''); R.b.innerHTML = row(g, '');
    root.classList.toggle('is-aligned', both);
    if (both) {
      const x = toDenominator(f, k), y = toDenominator(g, k);
      R.msg.innerHTML = `Every old cut lands on a new one. Both strips are now in ${k} equal pieces: ${frac(...f)} = ${frac(...x)} and ${frac(...g)} = ${frac(...y)}, so the sum is ${frac(x[0] + y[0], k)}.${k === D ? ` ${k} is the smallest number that works.` : ` ${D} would work too, with bigger pieces.`}`
        + `<span class="zh">每一道舊切線都落在新切線上了。兩條現在都是 ${k} 等分：${fractionZh(f[0], f[1])}＝${fractionZh(x[0], k)}，${fractionZh(g[0], g[1])}＝${fractionZh(y[0], k)}，加起來是${fractionZh(x[0] + y[0], k)}。${k === D ? `${k} 是行得通的最小的數。` : `${D} 也行得通，而且每一塊比較大。`}</span>`;
    } else {
      const which = [f, g].filter((h) => k % h[1]).map((h) => h[1]);
      R.msg.innerHTML = `Not yet: the red marks are old cuts that fall inside a new piece. ${k} is not a multiple of ${which.join(' and ')}.`
        + `<span class="zh">還不行：紅色的是落在新的一塊中間的舊切線。${k} 不是 ${which.join(' 和 ')} 的倍數。</span>`;
    }
  }
  R.pairs.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (!b) return; p = Number(b.getAttribute('data-p')); k = 1; show(); });
  R.range.addEventListener('input', () => { k = Number(R.range.value); show(); });
  root.querySelector('.mth-al-minus').addEventListener('click', () => { k = Math.max(1, k - 1); show(); });
  root.querySelector('.mth-al-plus').addEventListener('click', () => { k = Math.min(Number(R.range.max), k + 1); show(); });
  show();
  root.__align = { set: (pi, kk) => { p = pi; k = kk; show(); }, aligned: () => root.classList.contains('is-aligned'), pairs: () => PAIRS.length, misses: () => root.querySelectorAll('em.miss').length };
}

