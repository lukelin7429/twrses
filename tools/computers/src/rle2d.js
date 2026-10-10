/*
 * 電腦概論 · 第十二課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initRleDraw(el)  [data-cp-rledraw]  自己畫一張 8 × 8 的圖（四種顏色），旁邊即時列出每一列壓縮後的寫法，
 *                                       和「原來 64 個數／現在幾個數」。看誰畫得出最好壓、最難壓的圖。
 *   initLossy(el)    [data-cp-lossy]    失真：把蘋果圖每 k × k 格換成一個顏色，並排看原圖與結果、留下幾個數、改掉幾格；
 *                                       按「還原」會發現回不去。
 *   「一點都不能少，還是可以丟掉一點？」八題用 key2d.js 的 initChoice（通用選項題）。
 */
import { COLORS, PICS, changed, downsample, encode, kept, numbers } from './rle.js';

const css = (c) => `rgb(${COLORS[c].rgb.join(',')})`;
const INK = ['.', 'r', 's', 'y'];

export function initRleDraw(root) {
  const $ = (s) => root.querySelector(s);
  const R = { grid: $('.cp-rd-grid'), pal: $('.cp-rd-pal'), rows: $('.cp-rd-rows'), now: $('.cp-rd-now'), bar: $('.cp-rd-bar'), msg: $('.cp-rd-msg') };
  let g = Array.from({ length: 8 }, () => Array(8).fill('.')), ink = 'r', down = false;
  const cells = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `row ${y + 1}, column ${x + 1}`); b.addEventListener('pointerdown', (e) => { e.preventDefault(); down = true; paint(x, y); }); b.addEventListener('pointerenter', () => { if (down) paint(x, y); }); b.addEventListener('click', () => paint(x, y)); R.grid.appendChild(b); cells.push(b); }
  window.addEventListener('pointerup', () => { down = false; });
  INK.forEach((c) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-ink', c); b.style.background = css(c); b.title = `${COLORS[c].en} · ${COLORS[c].zh}`; b.setAttribute('aria-label', b.title); b.addEventListener('click', () => { ink = c; show(); }); R.pal.appendChild(b); });
  function paint(x, y) { if (g[y][x] === ink) return; g[y][x] = ink; show(); }
  function show() {
    cells.forEach((b, i) => { b.style.background = css(g[Math.floor(i / 8)][i % 8]); });
    R.pal.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-ink') === ink ? 'true' : 'false'));
    const runs = encode(g.map((r) => r.join(''))), n = numbers(runs);
    R.rows.innerHTML = runs.map((row) => `<li>${row.map(([k, c]) => `<span><b>${k}</b><i style="background:${css(c)}"></i></span>`).join('')}</li>`).join('');
    R.now.textContent = String(n); R.bar.style.width = `${Math.min(100, (n / 128) * 100)}%`;
    root.setAttribute('data-zone', n < 64 ? 'small' : n === 64 ? 'same' : 'big');
    R.msg.innerHTML = n < 64
      ? `Your picture needs 64 numbers as it is, and only ${n} when it is packed. ${n === 16 ? 'That is the smallest possible: every row is a single color.' : 'Can you draw one that packs even smaller?'}<span class="zh">你的圖原來要記 64 個數，壓縮後只要 ${n} 個。${n === 16 ? '這是最小的了：每一列都只有一種顏色。' : '你畫得出壓得更小的圖嗎？'}</span>`
      : n === 64 ? 'Packed and unpacked take exactly the same room: 64 numbers. Nothing is gained.<span class="zh">壓縮前後一樣大：都是 64 個數。什麼都沒省到。</span>'
        : `Packed, this picture needs ${n} numbers, more than the 64 it started with. There is too little repetition, so writing “how many” for every piece costs more than it saves.${n === 128 ? ' This is the worst possible.' : ''}<span class="zh">這張圖壓縮後要 ${n} 個數，比原來的 64 個還多。重複的地方太少，每一段都要多寫一個「幾個」，寫的比省的還多。${n === 128 ? '這是最慘的情況了。' : ''}</span>`;
  }
  const set = (rows) => { g = rows.map((r) => [...r]); show(); };
  const PRE = { clear: () => Array(8).fill('........'), rows: () => Array.from({ length: 8 }, (_, y) => (y % 2 ? 's' : 'y').repeat(8)), checker: () => Array.from({ length: 8 }, (_, y) => Array.from({ length: 8 }, (_, x) => ((x + y) % 2 ? 'r' : '.')).join('')) };
  root.querySelectorAll('[data-pre]').forEach((b) => b.addEventListener('click', () => set(PRE[b.getAttribute('data-pre')]())));
  set(['........', '..rrrr..', '.rrrrrr.', '.rrrrrr.', '.rrrrrr.', '.rrrrrr.', '..rrrr..', '........']);
  root.__rledraw = { set, pre: (k) => set(PRE[k]()), state: () => ({ n: Number(R.now.textContent), zone: root.getAttribute('data-zone') }) };
}

export function initLossy(root) {
  const $ = (s) => root.querySelector(s);
  const A = PICS.apple, R = { a: $('.cp-ls-a'), b: $('.cp-ls-b'), ks: [...root.querySelectorAll('[data-k]')], kept: $('.cp-ls-kept'), ch: $('.cp-ls-ch'), msg: $('.cp-ls-msg'), back: $('.cp-ls-back') };
  const draw = (el, rows) => { el.innerHTML = rows.map((r) => [...r].map((c) => `<i style="background:${css(c)}"></i>`).join('')).join(''); };
  let k = 1;
  function set(v) {
    k = v; const out = downsample(A, k), n = kept(A, k), c = changed(A, out);
    draw(R.b, out); R.ks.forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-k')) === k ? 'true' : 'false'));
    R.kept.textContent = String(n); R.ch.textContent = String(c); R.back.disabled = k === 1;
    R.msg.innerHTML = k === 1
      ? 'Nothing has been thrown away yet: 256 squares, 256 numbers. Choose a bigger block.<span class="zh">還沒有丟掉任何東西：256 格，256 個數。選大一點的方塊看看。</span>'
      : `Every block of ${k} × ${k} squares is now one color, so only ${n} numbers are kept instead of 256. ${c} squares are no longer the color they were. ${k === 2 ? 'From a distance, it still looks like the apple.' : k === 4 ? 'You can still guess what it is.' : 'Too much is gone.'}<span class="zh">每 ${k} × ${k} 格現在都是同一個顏色，所以只留下 ${n} 個數，不是 256 個。有 ${c} 格已經不是原來的顏色了。${k === 2 ? '遠遠看，還是那顆蘋果。' : k === 4 ? '還猜得出是什麼。' : '丟掉太多了。'}</span>`;
  }
  R.ks.forEach((b) => b.addEventListener('click', () => set(Number(b.getAttribute('data-k')))));
  R.back.addEventListener('click', () => {
    R.msg.innerHTML = `There is nothing to bring back. Only ${kept(A, k)} numbers were kept, and they do not say what the other squares used to be. The best the computer can do is draw each number as a big block again, which is what you already see.<span class="zh">沒有東西可以還原。只留下了 ${kept(A, k)} 個數，它們沒有記下其他格子原來是什麼顏色。電腦最多只能把每個數再畫成一大塊——也就是你現在看到的樣子。</span>`;
  });
  draw(R.a, A); set(1);
  root.__lossy = { set, back: () => R.back.click(), state: () => ({ k, kept: R.kept.textContent, changed: R.ch.textContent }) };
}
