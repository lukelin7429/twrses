/*
 * 晶片與半導體 · 第五課「奈米、埃米有多小？」的計算（純函式）。
 *
 *   單位：1 nm ＝ 10⁻⁹ m、1 Å ＝ 10⁻¹⁰ m ＝ 0.1 nm（Wikipedia Angstrom／Nanometre）
 *   STOPS：十的次方縮放的每一站（大小都有出處，見 data 的 sources；指甲寬「約 1 公分」是取整的示意）
 *   fmtLen(m)：把公尺換成最順口的單位（cm／mm／µm／nm，1 nm 以下加註 Å）
 *   指甲：平均每月約 3.5 mm（Yaemsiri 等 2010，經 Wikipedia Nail）→ 每秒約 1.3 nm
 *   剪紙：把 A4 的長邊（297 mm）一次剪一半，要剪幾次才不到 1 nm
 *   製程名稱：IRDS 2021 的「3 nm」節點——閘極間距 48 nm、最密金屬間距 24 nm（經 Wikipedia 3 nm process）
 */
export const NM = 1e-9, ANGSTROM = 1e-10, UM = 1e-6, MM = 1e-3, CM = 1e-2;
export const STOPS = [
  { key: 'nail', size: 1 * CM, en: 'Fingernail', zh: '指甲', about: true },
  { key: 'hair', size: 75 * UM, en: 'Human hair', zh: '頭髮', about: true },
  { key: 'rbc', size: 7 * UM, en: 'Red blood cell', zh: '紅血球', about: true },
  { key: 'bacterium', size: 2 * UM, en: 'Bacterium (E. coli)', zh: '細菌（大腸桿菌）', about: true },
  { key: 'virus', size: 100 * NM, en: 'Flu virus', zh: '流感病毒', about: true },
  { key: 'line', size: 24 * NM, en: 'Lines on a chip', zh: '晶片上的線', about: false },
  { key: 'dna', size: 2 * NM, en: 'DNA', zh: 'DNA', about: true },
  { key: 'atom', size: 0.235 * NM, en: 'Silicon atom', zh: '矽原子', about: true },
];
export const VIEW_MAX = 3 * CM, VIEW_MIN = 0.6 * NM;          // 畫面寬度的範圍
export const ZOOM_STEPS = Math.log10(VIEW_MAX / VIEW_MIN);     // 約 7.7 個「十倍」
// 滑桿 0–1 ↔ 畫面寬度（公尺），對數刻度
export const viewWidth = (z) => VIEW_MAX * Math.pow(VIEW_MIN / VIEW_MAX, Math.min(1, Math.max(0, z)));
export const zoomOf = (w) => Math.log(w / VIEW_MAX) / Math.log(VIEW_MIN / VIEW_MAX);
// 讓某一站的東西佔畫面寬度的 frac
export const zoomForStop = (key, frac = 0.3) => { const s = STOPS.find((x) => x.key === key); return Math.min(1, Math.max(0, zoomOf(s.size / frac))); };
export const magnification = (z) => VIEW_MAX / viewWidth(z);

const trim = (v) => (v >= 100 ? Math.round(v) : v >= 10 ? Math.round(v * 10) / 10 : Math.round(v * 100) / 100).toString();
export function fmtLen(m) {
  if (m >= CM) return { en: `${trim(m / CM)} cm`, zh: `${trim(m / CM)} 公分` };
  if (m >= MM) return { en: `${trim(m / MM)} mm`, zh: `${trim(m / MM)} 公釐` };
  if (m >= UM) return { en: `${trim(m / UM)} µm`, zh: `${trim(m / UM)} 微米` };
  if (m >= NM) return { en: `${trim(m / NM)} nm`, zh: `${trim(m / NM)} 奈米` };
  return { en: `${trim(m / NM)} nm (${trim(m / ANGSTROM)} Å)`, zh: `${trim(m / NM)} 奈米（${trim(m / ANGSTROM)} 埃米）` };
}
// 比例尺：不超過畫面寬度 maxFrac 的最大「1、2、5 × 10ⁿ」
export function scaleBar(view, maxFrac = 0.3) {
  const lim = view * maxFrac, p = Math.pow(10, Math.floor(Math.log10(lim)));
  const len = [5, 2, 1].map((k) => k * p).find((v) => v <= lim * 1.0000001);
  return { len, frac: len / view, ...fmtLen(len) };
}

// 指甲
export const NAIL_MM_PER_MONTH = 3.5, MONTH_S = (365.25 / 12) * 86400;
export const NAIL_NM_PER_S = (NAIL_MM_PER_MONTH * MM / MONTH_S) / NM;       // ≈ 1.33
export const nailGrowthNm = (seconds) => NAIL_NM_PER_S * Math.max(0, seconds);
export const atomsAcross = (nm) => nm / 0.235;                              // 相當於幾顆矽原子並排

// 剪紙：長度每次剪一半
export const A4_LONG_MM = 297;
export function cutsToReach(startMm, targetNm) {
  let len = startMm * MM, n = 0;
  while (len > targetNm * NM) { len /= 2; n++; }
  return { cuts: n, left: len };
}
export const lengthAfterCuts = (startMm, n) => (startMm * MM) / Math.pow(2, n);

// 製程名稱 vs. 量得到的尺寸（IRDS 2021）
export const NODES = {
  '3 nm': { name: 3, gatePitch: 48, metalPitch: 24 },
  '2 nm': { name: 2, gatePitch: 45, metalPitch: 20 },
};
