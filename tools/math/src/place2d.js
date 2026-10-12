/*
 * 看得見的數學 · 第一課不需要 WebGL 的小互動（位值引擎 place.js 的 2D 版）。
 *
 *   pileSVG(digits, opts)   一堆位值積木的平面圖（大方塊、平板、長條、小方塊各一格；沒有積木的那一格是空的）
 *   initPile(el)   [data-mth-pile]   這堆積木是多少：八題，後五題有一位是 0；記第一次就答對的題數，不計時
 *   initSame(el)   [data-mth-same]   同一個數，三種寫法：同一堆圓點照十個、五個、二個一數各分一次
 *   drawMinis()    .mth-mini[data-pile="305"]   卡片上的小圖
 */
import { BASES, fromDigits, groupThousands, groupsOf, makePileQuiz, mulberry32, numeral, toDigits } from './place.js';
import { enWords, placeNameEn, placeNameZh, placeOneEn, zhWords } from './names.js';
import { pieceCss } from './blocks3d.js';

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;

const U = 7;                      // 一個小方塊在圖上的邊長
const COLW = [46, 100, 132, 150]; // 個位、十位、百位、千位那一格的寬
const COLH = 138;

function gridRect(x, y, w, h, fill, nx, ny) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#16223f" stroke-width="1.2"/>`;
  let d = '';
  for (let k = 1; k < nx; k++) d += `M${x + (w / nx) * k} ${y}v${h}`;
  for (let k = 1; k < ny; k++) d += `M${x} ${y + (h / ny) * k}h${w}`;
  if (d) s += `<path d="${d}" stroke="#16223f" stroke-opacity=".45" stroke-width=".7" fill="none"/>`;
  return s;
}

function drawPlace(i, n, x0, w) {
  const fill = pieceCss(i);
  let s = '';
  if (i === 0) {            // 小方塊：每直行五個
    const gx = U + 4, cols = Math.ceil(n / 5) || 1, left = x0 + (w - (cols * gx - 4)) / 2;
    for (let k = 0; k < n; k++) s += gridRect(left + Math.floor(k / 5) * gx, COLH - 8 - U - (k % 5) * (U + 4), U, U, fill, 1, 1);
  } else if (i === 1) {     // 長條：站著，第五根後面多留一點縫
    const span = n * (U + 3) - 3 + (n > 5 ? 4 : 0), left = x0 + (w - span) / 2;
    for (let k = 0; k < n; k++) s += gridRect(left + k * (U + 3) + (k >= 5 ? 4 : 0), COLH - 8 - U * 10, U, U * 10, fill, 1, 10);
  } else if (i === 2) {     // 平板：一片壓一片，往右上錯開
    const off = 6.5, span = U * 10 + (n - 1) * off, left = x0 + (w - span) / 2;
    for (let k = n - 1; k >= 0; k--) s += gridRect(left + k * off, COLH - 8 - U * 10 - k * off * 0.9, U * 10, U * 10, fill, 10, 10);
  } else {                  // 大方塊：畫成立體的盒子，一個疊一個往右上錯開
    const side = U * 8, dp = 16, off = 26, span = side + dp + (n - 1) * off, left = x0 + (w - span) / 2;
    for (let k = n - 1; k >= 0; k--) {
      const x = left + k * off, y = COLH - 8 - side - k * 20;
      s += `<path d="M${x} ${y}l${dp} ${-dp}h${side}l${-dp} ${dp}z" fill="${fill}" stroke="#16223f" stroke-width="1.2"/>`
         + `<path d="M${x + side} ${y}l${dp} ${-dp}v${side}l${-dp} ${dp}z" fill="${fill}" stroke="#16223f" stroke-width="1.2"/>`
         + `<path d="M${x + side} ${y}l${dp} ${-dp}v${side}l${-dp} ${dp}z" fill="#000" fill-opacity=".22"/>`
         + gridRect(x, y, side, side, fill, 10, 10);
    }
  }
  return s;
}

/** digits[0] 是個位。opts.names＝在每一格下面寫位名；opts.mini＝卡片小圖（不畫格子底） */
export function pileSVG(digits, opts = {}) {
  const w = digits.length, gap = 10;
  let x = 6, body = '';
  for (let i = w - 1; i >= 0; i--) {
    const cw = COLW[i];
    if (!opts.mini) body += `<rect x="${x}" y="6" width="${cw}" height="${COLH - 6}" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(160,180,230,.28)"/>`;
    body += drawPlace(i, digits[i], x, cw);
    if (opts.names) {
      body += `<text x="${x + cw / 2}" y="${COLH + 18}" text-anchor="middle" class="mth-pl-en">${placeNameEn(i)}</text>`
            + `<text x="${x + cw / 2}" y="${COLH + 34}" text-anchor="middle" class="mth-pl-zh">${placeNameZh(i)}</text>`;
    }
    x += cw + gap;
  }
  const W = x - gap + 6, H = COLH + (opts.names ? 42 : 8);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" focusable="false">${body}</svg>`;
}

const pileLabel = (digits) => {
  const en = [], zh = [];
  for (let i = digits.length - 1; i >= 0; i--) {
    const kind = ['small cube', 'rod', 'flat', 'big cube'][i], kz = ['個小方塊', '根長條', '片平板', '個大方塊'][i];
    en.push(`${digits[i]} ${kind}${digits[i] === 1 ? '' : 's'}`); zh.push(`${digits[i]} ${kz}`);
  }
  return `${en.join(', ')} · ${zh.join('、')}`;
};

export function initPile(root) {
  const R = { pic: root.querySelector('.mth-pq-pic'), opts: root.querySelector('.mth-pq-opts'), k: root.querySelector('.mth-pq-k'), msg: root.querySelector('.mth-pq-msg'), score: root.querySelector('.mth-pq-score'), next: root.querySelector('.mth-pq-next'), names: root.querySelector('[data-t="names"]') };
  let quiz, q, round, first, tried, done;
  const N = () => quiz.length;
  function picture() {
    R.pic.innerHTML = pileSVG(round.digits, { names: R.names && R.names.checked });
    R.pic.setAttribute('aria-label', pileLabel(round.digits));
  }
  function ask() {
    round = quiz[q]; tried = false; done = false;
    picture();
    R.k.innerHTML = `Question ${q + 1} of ${N()} · 第 ${q + 1} 題（共 ${N()} 題）`;
    R.opts.innerHTML = '';
    round.options.forEach((v, k) => {
      const b = el('button', 'mth-pq-opt', groupThousands(v)); b.type = 'button';
      b.addEventListener('click', () => pick(b, k));
      R.opts.appendChild(b);
    });
    R.msg.innerHTML = 'Count each kind of block, from the biggest to the smallest. Take your time.<span class="zh">從最大的積木數到最小的，每一種各有幾個？慢慢來，不計時。</span>';
    R.next.hidden = true;
  }
  function explain() {
    const d = round.digits, parts = [], partsZh = [];
    for (let i = d.length - 1; i >= 0; i--) { parts.push(`${d[i]} ${d[i] === 1 ? placeOneEn(i) : placeNameEn(i)}`); partsZh.push(`${d[i]} 個${['一', '十', '百', '千'][i]}`); }
    const a = groupThousands(round.answer);
    let en = `Correct: ${parts.join(', ')} make ${a} (“${enWords(round.answer)}”).`, zh = `答對了：${partsZh.join('、')}，就是 ${a}（${zhWords(round.answer)}）。`;
    if (round.zeros.length) {
      const i = round.zeros[0], dropped = groupThousands(Number(String(round.answer).replace(/0/g, '')));
      en += ` There are no ${placeNameEn(i)}, so a 0 holds that place. Without it, the number would read ${dropped}.`;
      zh += `${placeNameZh(i)}一個也沒有，所以寫一個 0 把位子佔住；少了它就變成 ${dropped} 了。`;
    }
    return `${en}<span class="zh">${zh}</span>`;
  }
  function pick(b, k) {
    if (done) return;
    if (k === round.correct) {
      done = true; if (!tried) first++;
      b.classList.add('is-right');
      R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = explain();
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false;
      R.next.textContent = q + 1 < N() ? 'Next · 下一題' : 'See how I did · 看結果';
      R.next.focus({ preventScroll: true });
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = round.zeros.length
        ? 'Not quite. Look for the empty space: a place with no blocks still needs a digit.<span class="zh">再看一次：有一格是空的。沒有積木的那一位，也要寫一個數字。</span>'
        : 'Not quite. The biggest blocks are on the left; read from left to right.<span class="zh">再看一次：最大的積木在左邊，從左讀到右。</span>';
    }
  }
  function finish() {
    R.pic.innerHTML = ''; R.pic.removeAttribute('aria-label'); R.opts.innerHTML = '';
    R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${N()} right on the first try. ${first === N() ? 'You read place value like a pro, zeros and all.' : 'Play again for a new set of piles. There is no clock, and no one is keeping a list.'}<span class="zh">你第一次就答對 ${first} 題（共 ${N()} 題）。${first === N() ? '連有 0 的數都難不倒你！' : '再玩一次，題目會換新的。這裡不計時，也沒有排行榜。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { quiz = makePileQuiz(mulberry32(s ?? seed())); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => {
    if (q >= N()) { start(); return; }
    q++;
    if (q >= N()) finish(); else ask();
  });
  if (R.names) R.names.addEventListener('change', () => { if (q < N()) picture(); });
  start();
  root.__pile = {
    start, round: () => round, q: () => q, first: () => first,
    answer: () => { const b = R.opts.querySelectorAll('button')[round.correct]; if (b) b.click(); },
    wrong: () => { const b = [...R.opts.querySelectorAll('button')].find((x, k) => k !== round.correct && !x.disabled); if (b) b.click(); },
    next: () => R.next.click(),
  };
}

const HOWMANY = { 10: ['Count by tens', '十個一數'], 5: ['Count by fives', '五個一數'], 2: ['Count by twos', '二個一數'] };
const SIZE_ZH = (n) => zhWords(n);
/** 一堆圓點排成幾直行：十個排 5 × 2、二十五個排 5 × 5、二進位的 4／8／16／32 排成 2 × 2、4 × 2、4 × 4、8 × 4 */
const GROUP_COLS = { 2: 2, 4: 2, 5: 5, 8: 4, 10: 5, 16: 4, 25: 5, 32: 8 };

export function initSame(root) {
  const R = { range: root.querySelector('.mth-sm-range'), out: root.querySelector('.mth-sm-out'), panels: root.querySelector('.mth-sm-panels'), msg: root.querySelector('.mth-sm-msg') };
  const max = Number(R.range.max);
  let n = Number(R.range.value);
  function panel(base) {
    const groups = groupsOf(n, base), digits = toDigits(n, base);
    let dots = '';
    groups.forEach((g) => {
      for (let k = 0; k < g.count; k++) {
        const cols = GROUP_COLS[g.size] || Math.min(g.size, 5);
        dots += `<span class="mth-sm-g${g.size === 1 ? ' is-one' : ''}" style="--c:${cols}" title="${g.size}">${'<i></i>'.repeat(g.size)}</span>`;
      }
    });
    const words = groups.map((g) => `${g.count} ${g.size === 1 ? (g.count === 1 ? 'one' : 'ones') : (g.count === 1 ? placeOneEn(Math.round(Math.log(g.size) / Math.log(base)), base) : placeNameEn(Math.round(Math.log(g.size) / Math.log(base)), base))}`).join(' + ');
    const wordsZh = groups.map((g) => `${g.count} 個${SIZE_ZH(g.size)}`).join('＋');
    return `<article class="mth-sm-p" data-base="${base}">
  <p class="mth-k">${HOWMANY[base][0]} · ${HOWMANY[base][1]}</p>
  <div class="mth-sm-dots" role="img" aria-label="${n} dots in groups: ${words} · ${n} 個圓點：${wordsZh}">${dots}</div>
  <p class="mth-sm-num"><b>${numeral(digits)}</b>${base === 10 ? '' : `<sub>${base === 5 ? 'five' : 'two'}</sub>`}</p>
  <p class="mth-sm-w">${words}<span class="zh">${wordsZh}</span></p>
</article>`;
  }
  function show() {
    R.out.textContent = String(n);
    R.range.value = String(n);
    R.panels.innerHTML = BASES.map(panel).join('');
    const d5 = numeral(toDigits(n, 5)), d2 = numeral(toDigits(n, 2));
    R.msg.innerHTML = `The pile did not change: there are still ${n} dots (“${enWords(n)}”). Only the size of the groups changed, so the same amount is written ${n}, ${d5}, and ${d2}.`
      + `<span class="zh">東西沒有變，還是 ${n} 個（${zhWords(n)}）；變的只是「幾個一數」，所以同樣多的東西可以寫成 ${n}、${d5}、${d2}。</span>`;
  }
  const setN = (v) => { n = Math.max(1, Math.min(max, Math.round(v))); show(); };
  R.range.addEventListener('input', () => setN(Number(R.range.value)));
  root.querySelector('.mth-sm-minus').addEventListener('click', () => setN(n - 1));
  root.querySelector('.mth-sm-plus').addEventListener('click', () => setN(n + 1));
  show();
  root.__same = { set: setN, n: () => n, written: () => Object.fromEntries(BASES.map((b) => [b, numeral(toDigits(n, b))])), dots: () => Object.fromEntries(BASES.map((b) => [b, root.querySelectorAll(`[data-base="${b}"] .mth-sm-dots i`).length])) };
}

export function drawMinis() {
  document.querySelectorAll('.mth-mini[data-pile]').forEach((m) => {
    const digits = m.getAttribute('data-pile').split('').reverse().map(Number);
    m.innerHTML = pileSVG(digits, { mini: true });
    m.dataset.value = String(fromDigits(digits, 10));
  });
}
