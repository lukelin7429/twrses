/*
 * 美國政治 U.S. Government · 五十州地圖的資料與純函式（每課共用；test/usmap.test.mjs）。
 *
 * 底圖：美國人口普查局 cb_2024_us_state_20m（人口普查局要求註明來源），scripts/build-states.py 投影成 Albers USA、簡化後存在 data/states.json。
 * 座標是一張約 960 × 600 的畫布（x 向右、y 向下），阿拉斯加與夏威夷在左下角（縮小、不照實際位置）。
 * 50 州＋哥倫比亞特區；不含波多黎各與其他領地。
 *
 *   getStates() → [{ abbr, name, fips, aland, rings: [[[x, y], …], …], bbox: [x0, y0, x1, y1], center: [x, y] }]
 *   TILES：方塊地圖的位置（abbr → [欄, 列]），12 欄 × 8 列，每州一格，大致保留相對位置
 *   ringPath(ring)：SVG 的 path 字串
 *   extent(values)、norm(v, lo, hi)、colorAt(t)、formatValue(v, fmt)、ranked(values)：著色與排名
 *   popSide(pop, maxPop, cell)：依人口換算方塊邊長（面積和人口成正比）
 */
import RAW from './data/states.json' with { type: 'json' };

export function decodeRing(enc) {
  const out = [];
  let x = enc[0], y = enc[1];
  out.push([x / 10, y / 10]);
  for (let i = 2; i < enc.length; i += 2) { x += enc[i]; y += enc[i + 1]; out.push([x / 10, y / 10]); }
  return out;
}
export function ringArea(r) {
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += r[j][0] * r[i][1] - r[i][0] * r[j][1];
  return a / 2;
}
function ringCentroid(r) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const f = r[j][0] * r[i][1] - r[i][0] * r[j][1];
    a += f; cx += (r[j][0] + r[i][0]) * f; cy += (r[j][1] + r[i][1]) * f;
  }
  return [cx / (3 * a), cy / (3 * a)];
}
let cache = null;
export function getStates() {
  if (cache) return cache;
  cache = RAW.states.map((s) => {
    const rings = s.rings.map(decodeRing);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const r of rings) for (const [x, y] of r) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    const big = rings.reduce((m, r) => (Math.abs(ringArea(r)) > Math.abs(ringArea(m)) ? r : m), rings[0]);
    return { abbr: s.abbr, name: s.name, fips: s.fips, aland: s.aland, rings, bbox: [x0, y0, x1, y1], center: ringCentroid(big) };
  });
  return cache;
}
export const META = RAW.meta;
export const W = 960, H = 610;

// 方塊地圖：每州一格（欄, 列）。排法參考常見的「方格地圖」，讓鄰近的州大致相鄰。
export const TILES = {
  AK: [0, 0], ME: [11, 0], VT: [10, 1], NH: [11, 1],
  WA: [1, 2], ID: [2, 2], MT: [3, 2], ND: [4, 2], MN: [5, 2], IL: [6, 2], WI: [7, 2], MI: [8, 2], NY: [9, 2], RI: [10, 2], MA: [11, 2],
  OR: [1, 3], NV: [2, 3], WY: [3, 3], SD: [4, 3], IA: [5, 3], IN: [6, 3], OH: [7, 3], PA: [8, 3], NJ: [9, 3], CT: [10, 3],
  CA: [1, 4], UT: [2, 4], CO: [3, 4], NE: [4, 4], MO: [5, 4], KY: [6, 4], WV: [7, 4], VA: [8, 4], MD: [9, 4], DE: [10, 4],
  AZ: [2, 5], NM: [3, 5], KS: [4, 5], AR: [5, 5], TN: [6, 5], NC: [7, 5], SC: [8, 5], DC: [9, 5],
  OK: [4, 6], LA: [5, 6], MS: [6, 6], AL: [7, 6], GA: [8, 6],
  HI: [0, 7], TX: [4, 7], FL: [9, 7],
};
export const TILE_COLS = 12, TILE_ROWS = 8;

export function ringPath(r) {
  return 'M' + r.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
}

/** 數值的最小與最大（略過 null） */
export function extent(values) {
  let lo = Infinity, hi = -Infinity;
  for (const v of Object.values(values)) if (typeof v === 'number' && Number.isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
  return lo === Infinity ? [0, 0] : [lo, hi];
}
export function norm(v, lo, hi) { return hi === lo ? 0.5 : Math.min(1, Math.max(0, (v - lo) / (hi - lo))); }

// 依序的色階：深藍綠 → 金（刻意不用紅與藍，避免看起來像政黨的顏色）
export const PALETTE = ['#163d4f', '#1f5d66', '#2c7d72', '#4e9c74', '#86b86f', '#c6cc6a', '#f0d36e'];
export function colorAt(t) {
  const x = Math.min(1, Math.max(0, t)) * (PALETTE.length - 1);
  const i = Math.min(PALETTE.length - 2, Math.floor(x)), f = x - i;
  const a = hex(PALETTE[i]), b = hex(PALETTE[i + 1]);
  return '#' + a.map((c, k) => Math.round(c + (b[k] - c) * f).toString(16).padStart(2, '0')).join('');
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

/** 數值的顯示方式：year／pct（百分比，最多兩位小數）／int（千分位）／raw */
export function formatValue(v, fmt) {
  if (v == null || (typeof v === 'number' && !Number.isFinite(v))) return '—';
  if (fmt === 'year') return String(v);
  if (fmt === 'pct') return `${Number(v.toFixed(3))}%`;
  if (fmt === 'int') return v.toLocaleString('en-US');
  return String(v);
}
/** 由大到小排序：[[abbr, value], …]（略過 null；同值照字母） */
export function ranked(values, asc = false) {
  return Object.entries(values).filter(([, v]) => typeof v === 'number').sort((p, q) => (asc ? p[1] - q[1] : q[1] - p[1]) || p[0].localeCompare(q[0]));
}
/** 方塊的邊長：面積和人口成正比；人口最多的州剛好填滿一格（再留一點邊） */
export function popSide(pop, maxPop, cell) { return cell * 0.92 * Math.sqrt(Math.max(0, pop) / maxPop); }

/** 各州的中文名（台灣通用的譯名） */
export const ZH = {
  AL: '阿拉巴馬', AK: '阿拉斯加', AZ: '亞利桑那', AR: '阿肯色', CA: '加利福尼亞', CO: '科羅拉多', CT: '康乃狄克', DE: '德拉瓦', DC: '哥倫比亞特區',
  FL: '佛羅里達', GA: '喬治亞', HI: '夏威夷', ID: '愛達荷', IL: '伊利諾', IN: '印第安納', IA: '愛荷華', KS: '堪薩斯', KY: '肯塔基', LA: '路易斯安那',
  ME: '緬因', MD: '馬里蘭', MA: '麻薩諸塞', MI: '密西根', MN: '明尼蘇達', MS: '密西西比', MO: '密蘇里', MT: '蒙大拿', NE: '內布拉斯加', NV: '內華達',
  NH: '新罕布夏', NJ: '紐澤西', NM: '新墨西哥', NY: '紐約', NC: '北卡羅來納', ND: '北達科他', OH: '俄亥俄', OK: '奧克拉荷馬', OR: '奧勒岡', PA: '賓夕法尼亞',
  RI: '羅德島', SC: '南卡羅來納', SD: '南達科他', TN: '田納西', TX: '德克薩斯', UT: '猶他', VT: '佛蒙特', VA: '維吉尼亞', WA: '華盛頓', WV: '西維吉尼亞',
  WI: '威斯康辛', WY: '懷俄明',
};
