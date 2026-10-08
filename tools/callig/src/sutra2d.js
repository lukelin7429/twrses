/*
 * 書法 · 第十三課：抄經的資料與 2D 互動（不需要 WebGL）。
 *
 *   CH                        五個字的筆畫資料（楷書，自繪）：心 xin、色 se、即 ji、是 shi4、空 kong
 *   LINE                      「色即是空，空即是色」八個字（〈心經〉裡的一句）
 *   cellOf(i, cols, rows)     第 i 個字放在哪一格：由上到下、**由右到左**（第一行在最右邊）→ { col, row, cx, cy }（字框座標）
 *   page(keys, opt)           把一串字縮小、排進格子，合成一個「字」給寫字引擎一次寫完。
 *                             opt.mode：'steady'（慢而勻：每個字一樣大、都在格子正中間）｜'rushed'（趕著寫：大小不一、歪、偏、線細，示意）
 *                             回傳 { char, cells: [{ key, from, to（筆的索引）, cx, cy, s, dx, dy, rot }], evenness（0–100，示意） }
 *   readingOrder(cols, rows)  閱讀順序：格子編號（row * cols + col，col 0 在最左）排成的陣列
 *   drawRules(g, T, opt)      烏絲欄：直行的界線（和淡淡的格線）
 *   initOrder(root)           root＝[data-cal-order]：「下一個字寫在哪一格？」照順序點完所有格子
 *
 * 除錯：root.__order（tap(index)、reset()、state）
 */
import CHX from './strokes/xin.json';
import CHS from './strokes/se.json';
import CHJ from './strokes/ji.json';
import CHI from './strokes/shi4.json';
import CHK from './strokes/kong.json';

export const CH = { xin: CHX, se: CHS, ji: CHJ, shi4: CHI, kong: CHK };   // 「是」的 key 是 shi4（shi 已經是第四課的「十」）
export const LINE = ['se', 'ji', 'shi4', 'kong', 'kong', 'ji', 'shi4', 'se'];
export const GRID = { cols: 2, rows: 4, cell: 236, x0: 264, y0: 28, scale: 0.196 };   // 格子在字框裡的位置（x0／y0＝左上角）；一個字縮成格子的 83%

export function cellOf(i, cols = GRID.cols, rows = GRID.rows) {
  const c = Math.floor(i / rows), row = i % rows, col = cols - 1 - c;   // 第一行在最右邊
  return { col, row, cx: GRID.x0 + (col + 0.5) * GRID.cell, cy: GRID.y0 + (row + 0.5) * GRID.cell };
}
export function readingOrder(cols, rows) {
  const out = [];
  for (let c = cols - 1; c >= 0; c--) for (let r = 0; r < rows; r++) out.push(r * cols + c);
  return out;
}
function rng(seed) {
  let a = (seed * 2654435761) >>> 0 || 1;
  return () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
}
export function page(keys = LINE, { mode = 'steady', seed = 11 } = {}) {
  const r = rng(seed), strokes = [], cells = [];
  let dev = 0;
  keys.forEach((key, i) => {
    const { cx, cy } = cellOf(i);
    const rushed = mode === 'rushed';
    const s = GRID.scale * (rushed ? 0.62 + r() * 0.72 : 1);
    const dx = rushed ? (r() - 0.5) * 110 : 0, dy = rushed ? (r() - 0.5) * 90 : 0;
    const rot = rushed ? (r() - 0.5) * 0.5 : 0, pk = rushed ? 0.12 + r() * 0.12 : 0.21, vk = rushed ? 0.95 : 0.34;
    const cos = Math.cos(rot), sin = Math.sin(rot), from = strokes.length;
    for (const st of CH[key].strokes) {
      strokes.push({ ...st, n: strokes.length + 1, pts: st.pts.map(([x, y, p, v]) => {
        const u = (x - 500) * s, w = (y - 500) * s;
        return [Math.round((cx + dx + u * cos - w * sin) * 10) / 10, Math.round((cy + dy + u * sin + w * cos) * 10) / 10, p * pk, v * vk];
      }) });
    }
    cells.push({ key, from, to: strokes.length - 1, cx, cy, s, dx, dy, rot });
    dev += Math.abs(s / GRID.scale - 1) * 1.6 + Math.hypot(dx, dy) / 60 + Math.abs(rot) * 2.2;
    for (const st of strokes.slice(from)) for (const q of st.pts) { q[0] = Math.min(990, Math.max(10, q[0])); q[1] = Math.min(990, Math.max(10, q[1])); }   // 再怎麼歪也留在字框裡
  });
  const evenness = Math.max(0, Math.round(100 - (dev / keys.length) * 48));
  return { char: { char: '色即是空空即是色', key: `page-${mode}`, box: 1000, count: strokes.length, strokes }, cells, evenness };
}
export function drawRules(g, T, { cols = GRID.cols, rows = GRID.rows, color = 'rgba(40,36,30,.78)', faint = 'rgba(40,36,30,.16)' } = {}) {
  const X = (v) => T.ox + v * T.k, Y = (v) => T.oy + v * T.k;
  const x0 = GRID.x0, x1 = GRID.x0 + cols * GRID.cell, y0 = GRID.y0, y1 = GRID.y0 + rows * GRID.cell;
  g.save();
  g.strokeStyle = faint; g.lineWidth = Math.max(1, T.k * 2);
  for (let r = 1; r < rows; r++) { g.beginPath(); g.moveTo(X(x0), Y(y0 + r * GRID.cell)); g.lineTo(X(x1), Y(y0 + r * GRID.cell)); g.stroke(); }
  g.strokeStyle = color; g.lineWidth = Math.max(1.5, T.k * 3.2);
  for (let c = 0; c <= cols; c++) { g.beginPath(); g.moveTo(X(x0 + c * GRID.cell), Y(y0)); g.lineTo(X(x0 + c * GRID.cell), Y(y1)); g.stroke(); }
  g.lineWidth = Math.max(2, T.k * 5);
  g.beginPath(); g.moveTo(X(x0), Y(y0)); g.lineTo(X(x1), Y(y0)); g.moveTo(X(x0), Y(y1)); g.lineTo(X(x1), Y(y1)); g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------
// 下一個字寫在哪一格？
// ---------------------------------------------------------------------
export function initOrder(root) {
  const cols = Number(root.getAttribute('data-cols') || 3), rows = Number(root.getAttribute('data-rows') || 4);
  const grid = root.querySelector('.cg-order-grid'), msg = root.querySelector('.cg-order-msg'), out = root.querySelector('.cg-order-n');
  const order = readingOrder(cols, rows);
  const state = { next: 0, misses: 0 };
  grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  grid.innerHTML = Array.from({ length: cols * rows }, (_, i) => `<button type="button" data-cell="${i}" aria-label="Row ${Math.floor(i / cols) + 1}, column ${(i % cols) + 1} from the left · 第 ${Math.floor(i / cols) + 1} 列、左邊數來第 ${(i % cols) + 1} 行"></button>`).join('');
  const btn = (i) => grid.querySelector(`[data-cell="${i}"]`);
  const say = (en, zh) => { if (msg) msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() { if (out) out.textContent = `${state.next} / ${order.length}`; }
  function tap(i) {
    if (state.next >= order.length) return null;
    const b = btn(i);
    if (i === order[state.next]) {
      state.next++;
      b.classList.add('ok'); b.disabled = true; b.textContent = String(state.next);
      if (state.next === 1) say('Yes: the first character goes at the top of the column on the right. Where next?', '對了：第一個字寫在最右邊那一行的最上面。接下來呢？');
      else if (state.next === order.length) say(`All ${order.length} squares, in order: down each column, and the columns go from right to left.${state.misses ? '' : ' Not one wrong tap!'}`, `${order.length} 格都照順序走完了：每一行由上往下，行由右往左。${state.misses ? '' : '一次都沒有點錯！'}`);
      else if (state.next % rows === 0) say('That column is full. The next column is the one to its left.', '這一行寫滿了。下一行在它的左邊。');
      else say('Keep going down the column.', '沿著這一行繼續往下。');
      show();
      return true;
    }
    state.misses++;
    b.classList.add('no'); setTimeout(() => b.classList.remove('no'), 500);
    say(state.next === 0 ? 'Not there. A sutra page starts at the top right.' : (state.next % rows === 0 ? 'Not there. When a column is full, move one column to the left and start at the top.' : 'Not there. Finish this column first: go straight down.'),
      state.next === 0 ? '不是那裡。抄經從右上角開始。' : (state.next % rows === 0 ? '不是那裡。一行寫滿以後，往左換一行，從最上面開始。' : '不是那裡。先把這一行寫完：直直往下。'));
    return false;
  }
  function reset() {
    state.next = 0; state.misses = 0;
    grid.querySelectorAll('button').forEach((b) => { b.disabled = false; b.className = ''; b.textContent = ''; });
    say('Tap the square where the first character goes.', '點一下第一個字要寫的那一格。');
    show();
  }
  grid.querySelectorAll('[data-cell]').forEach((b) => b.addEventListener('click', () => tap(Number(b.getAttribute('data-cell')))));
  root.querySelectorAll('[data-order="reset"]').forEach((b) => b.addEventListener('click', reset));
  reset();
  root.__order = { state, tap, reset, order };
  return root.__order;
}
