/*
 * 電腦概論 · 第十二課「檔案為什麼可以變小？」的純函式（不碰 DOM、不碰 three.js；test/rle.test.mjs）。
 *
 * 資料裡有重複，就可以寫短一點。這裡用最簡單的一種無失真壓縮：把同一列裡連續相同的顏色寫成「幾個＋什麼顏色」
 * （run-length encoding）。原圖每一格記一個數（顏色的編號）；壓縮後每一段記兩個數（幾個、什麼顏色）。
 *   encode(rows) → 每一列的 [[n, 顏色], …]　decode(runs) → rows（一格不差）　numbers(runs) → 壓縮後要記幾個數
 * 沒有重複的圖壓了反而變大（每一格都變成「1 個＋顏色」兩個數）。
 * 失真的示範：downsample(rows, k) 把每 k×k 格換成其中最多的那個顏色——丟掉的細節拿不回來。
 * 真的格式（PNG、ZIP、JPEG）用的方法複雜得多；這裡只示意「重複可以寫短」和「丟掉細節」兩件事。
 */
import { PICTURE } from './codes.js';
import { mulberry32 } from './bits.js';

// 顏色（PICTURE 用的是第二課的調色盤；這裡補上英文、中文名字，和另外幾張圖用的顏色）
export const COLORS = {
  '.': { rgb: [245, 238, 220], en: 'cream', zh: '米白' }, r: { rgb: [214, 40, 40], en: 'red', zh: '紅' }, R: { rgb: [150, 24, 32], en: 'dark red', zh: '暗紅' },
  h: { rgb: [255, 140, 130], en: 'pink', zh: '粉紅' }, w: { rgb: [255, 236, 226], en: 'white', zh: '白' }, g: { rgb: [56, 160, 72], en: 'green', zh: '綠' },
  G: { rgb: [28, 104, 50], en: 'dark green', zh: '深綠' }, b: { rgb: [110, 72, 40], en: 'brown', zh: '棕' },
  s: { rgb: [120, 190, 240], en: 'blue', zh: '藍' }, y: { rgb: [255, 211, 110], en: 'yellow', zh: '黃' },
};
const fill = (c, n = 16) => c.repeat(n);
const noise = () => {            // 固定的雜亂圖：同一列裡相鄰的兩格一定不同色
  const rng = mulberry32(12), ks = ['r', 's', 'y', 'g'], rows = [];
  for (let y = 0; y < 16; y++) { let row = '', prev = ''; for (let x = 0; x < 16; x++) { let c; do { c = ks[Math.floor(rng() * 4)]; } while (c === prev); row += c; prev = c; } rows.push(row); }
  return rows;
};
export const PICS = {
  apple: PICTURE,
  sky: [...Array(2).fill(fill('s')), ...Array(4).fill('ssssssssssyyyyss'), ...Array(4).fill(fill('s')), ...Array(6).fill(fill('g'))],
  hstripes: Array.from({ length: 16 }, (_, y) => fill(y % 2 ? 'w' : 'r')),
  vstripes: Array(16).fill('rwrwrwrwrwrwrwrw'),
  noise: noise(),
};
export const PIC_KEYS = Object.keys(PICS);

export const encodeRow = (row) => { const out = []; for (const c of row) { const last = out[out.length - 1]; if (last && last[1] === c) last[0]++; else out.push([1, c]); } return out; };
export const encode = (rows) => rows.map(encodeRow);
export const decode = (runs) => runs.map((row) => row.map(([n, c]) => c.repeat(n)).join(''));
export const pixels = (rows) => rows.length * rows[0].length;                  // 原圖要記幾個數
export const numbers = (runs) => runs.reduce((s, row) => s + row.length * 2, 0); // 壓縮後要記幾個數
export const numbersUpTo = (runs, k) => numbers(runs.slice(0, k));
export const runCount = (runs) => runs.reduce((s, row) => s + row.length, 0);

// 失真：每 k×k 格換成其中最多的那個顏色（一樣多就取最先出現的）
export function downsample(rows, k) {
  const h = rows.length, w = rows[0].length, out = rows.map((r) => [...r]);
  for (let y = 0; y < h; y += k) for (let x = 0; x < w; x += k) {
    const cnt = new Map();
    for (let dy = 0; dy < k; dy++) for (let dx = 0; dx < k; dx++) { const c = rows[y + dy][x + dx]; cnt.set(c, (cnt.get(c) || 0) + 1); }
    let best = null, bn = 0; for (const [c, n] of cnt) if (n > bn) { best = c; bn = n; }
    for (let dy = 0; dy < k; dy++) for (let dx = 0; dx < k; dx++) out[y + dy][x + dx] = best;
  }
  return out.map((r) => r.join(''));
}
export const kept = (rows, k) => (rows.length / k) * (rows[0].length / k);     // 留下幾個數
export const changed = (a, b) => a.reduce((s, row, y) => s + [...row].filter((c, x) => c !== b[y][x]).length, 0);
