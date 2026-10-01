/*
 * 第十二課的恆星顏色計算（純函式，不碰 DOM，可以直接用 node 測試：test/starcolor.test.mjs）。
 *
 * 顏色＝表面溫度：把黑體（Planck）光譜乘上 CIE 1931 配色函數積分成 XYZ，再換成 sRGB（最亮的一色調到 255）。
 * 配色函數用 Wyman, Sloan & Shirley（2013）的多段高斯近似（公式，不是資料表）。
 * B−V 色指數 → 溫度：Ballesteros（2012）的公式。光譜型 OBAFGKM 用常見的溫度分界。
 * 名星的溫度（TEMPS）是文獻常用的整數值（只到百位），頁面寫「約」。
 */
const DEG_C = 273.15;
export const SUN_T = 5772;          // IAU 2015 太陽有效溫度（K）
export const SUN_BV = 0.65;
export const SUN_MV = 4.83;

/** Planck 黑體輻射（相對值）：波長 nm、溫度 K。 */
export function planck(nm, T) {
  const l = nm * 1e-9, h = 6.62607015e-34, c = 299792458, k = 1.380649e-23;
  return 1 / (Math.pow(l, 5) * (Math.exp((h * c) / (l * k * T)) - 1));
}
/** 維恩位移定律：光最強的波長（nm）。 */
export const wienPeak = (T) => 2.897771955e6 / T;

const g = (x, mu, s1, s2) => { const t = (x - mu) / (x < mu ? s1 : s2); return Math.exp(-0.5 * t * t); };
/** CIE 1931 2° 配色函數（Wyman 等 2013 的多段高斯近似）。 */
export function cmf(nm) {
  return [
    1.056 * g(nm, 599.8, 37.9, 31.0) + 0.362 * g(nm, 442.0, 16.0, 26.7) - 0.065 * g(nm, 501.1, 20.4, 26.2),
    0.821 * g(nm, 568.8, 46.9, 40.5) + 0.286 * g(nm, 530.9, 16.3, 31.1),
    1.217 * g(nm, 437.0, 11.8, 36.0) + 0.681 * g(nm, 459.0, 26.0, 13.8),
  ];
}
const gamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
/** 溫度 T（K）的黑體看起來是什麼顏色：[r, g, b]（0–255，最亮的一色是 255）。 */
export function bbColor(T) {
  let X = 0, Y = 0, Z = 0;
  for (let nm = 380; nm <= 780; nm += 5) { const p = planck(nm, T), [x, y, z] = cmf(nm); X += p * x; Y += p * y; Z += p * z; }
  let r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z, gg = -0.9689 * X + 1.8758 * Y + 0.0415 * Z, b = 0.0557 * X - 0.2040 * Y + 1.0570 * Z;
  const lo = Math.min(r, gg, b); if (lo < 0) { r -= lo; gg -= lo; b -= lo; }   // 超出色域：往白色拉回
  const m = Math.max(r, gg, b);
  return [r, gg, b].map((v) => Math.round(255 * gamma(v / m)));
}
export const cssColor = (T) => `rgb(${bbColor(T).join(',')})`;

/** B−V 色指數 → 有效溫度（K），Ballesteros 2012。 */
export const bvToT = (bv) => 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62));
export const toC = (T) => T - DEG_C;

/** 光譜型（OBAFGKM）。 */
export function spectralClass(T) {
  return T >= 30000 ? 'O' : T >= 10000 ? 'B' : T >= 7500 ? 'A' : T >= 6000 ? 'F' : T >= 5200 ? 'G' : T >= 3700 ? 'K' : 'M';
}
/** 肉眼看起來的顏色。 */
export function colorName(T) {
  return T < 3700 ? { en: 'orange-red', zh: '橙紅色' } : T < 5200 ? { en: 'orange', zh: '橙色' } : T < 6000 ? { en: 'yellowish white', zh: '黃白色' }
    : T < 10000 ? { en: 'white', zh: '白色' } : T < 30000 ? { en: 'blue-white', zh: '藍白色' } : { en: 'blue', zh: '藍色' };
}
/** 光最強的波長落在哪一段。 */
export function peakBand(T) {
  const nm = wienPeak(T);
  return nm < 380 ? { en: 'ultraviolet', zh: '紫外線' } : nm > 750 ? { en: 'infrared', zh: '紅外線' } : nm < 450 ? { en: 'violet-blue', zh: '藍紫光' }
    : nm < 495 ? { en: 'blue', zh: '藍光' } : nm < 570 ? { en: 'green', zh: '綠光' } : nm < 590 ? { en: 'yellow', zh: '黃光' } : nm < 620 ? { en: 'orange', zh: '橙光' } : { en: 'red', zh: '紅光' };
}

// 名星的表面溫度（K，文獻常用值，取到百位；太陽是 IAU 標稱值）。鍵與 near-stars.js 的 NEAR_NAMED 相同。
export const TEMPS = {
  sun: 5772, proxima: 3000, acen: 5800, barnard: 3200, sirius: 9900, '61cyg': 4500, procyon: 6500, epseri: 5100, taucet: 5300,
  altair: 7700, vega: 9600, fomalhaut: 8600, pollux: 4700, arcturus: 4300, capella: 5000, castor: 10300, aldebaran: 3900,
  regulus: 12500, denebola: 8500, dubhe: 4700, achernar: 15000, alphard: 4100, spica: 25300, bellatrix: 22000, canopus: 7400,
  acrux: 24000, hadar: 25000, polaris: 6000, betelgeuse: 3600, antares: 3600, rigel: 12100, alnilam: 27000, deneb: 8500,
  alcyone: 12300, kochab: 4100,
};
