/*
 * 萬物原理 · 第九課「天空為什麼是藍色的？」的散射計算（純函式，test/sky.test.mjs 會跑）。
 *
 * 瑞利散射：空氣分子比光的波長小很多，散射的強度與波長的四次方成反比 → 藍光（短）散得比紅光（長）多。
 * 光學厚度（示意，接近乾淨空氣的量級）：TAU_500 × (500/λ)^4.05，綠光約 0.1。
 * 空氣質量（陽光斜著穿過多少空氣，正上方＝1）：Kasten & Young (1989)，地平線約 38。
 * 天空亮度：平行平面大氣、只算一次散射（單次散射）。從看的方向（空氣質量 mv）看出去、太陽在空氣質量 m：
 *   L = S · mv · (e^(−τ·mv) − e^(−τ·m)) / (m − mv)；m = mv 時 L = S · m · τ · e^(−τ·m)。
 *   乾淨空氣、不算灰塵與雲；真正的夕陽常因灰塵更紅更暗。
 * 太陽光譜用 5,778 K 的黑體近似（紫光本來就比藍光少一點）。
 */
export const BANDS = [
  { k: 'violet', nm: 410, en: 'Violet', zh: '紫', rgb: [0.22, 0.08, 0.7] },
  { k: 'blue', nm: 460, en: 'Blue', zh: '藍', rgb: [0.04, 0.38, 1.0] },
  { k: 'green', nm: 530, en: 'Green', zh: '綠', rgb: [0.18, 0.85, 0.32] },
  { k: 'yellow', nm: 580, en: 'Yellow', zh: '黃', rgb: [0.9, 0.8, 0.08] },
  { k: 'red', nm: 650, en: 'Red', zh: '紅', rgb: [1.0, 0.12, 0.06] },
];
export const TAU_500 = 0.145;
const D = Math.PI / 180;

// 散射的強度比：短波長 a 比長波長 b 多幾倍
export const scatterRatio = (aNm, bNm) => (bNm / aNm) ** 4;
export const tauAt = (nm) => TAU_500 * (500 / nm) ** 4.05;

export function airMass(elevDeg) {
  const z = 90 - Math.max(0, Math.min(90, elevDeg));
  return 1 / (Math.cos(z * D) + 0.50572 * (96.07995 - z) ** -1.6364);
}

// 黑體（5,778 K）相對亮度，綠光 530 nm ＝ 1
export function sunSpectrum(nm, T = 5778) {
  const planck = (l) => { const m = l * 1e-9; return 1 / (m ** 5 * (Math.exp(0.0143877735 / (m * T)) - 1)); };
  return planck(nm) / planck(530);
}

// 直射陽光穿過大氣後剩多少（0–1）；air = false 是沒有大氣（像月球）
export const transmit = (nm, elevDeg, air = true) => (air ? Math.exp(-tauAt(nm) * airMass(elevDeg)) : 1);

export function skyRadiance(nm, sunElevDeg, viewElevDeg = 90, air = true) {
  if (!air || sunElevDeg < 0) return 0;
  const t = tauAt(nm), m = airMass(sunElevDeg), mv = airMass(viewElevDeg);
  const S = sunSpectrum(nm);
  if (Math.abs(m - mv) < 1e-6) return S * m * t * Math.exp(-t * m);
  return S * mv * (Math.exp(-t * mv) - Math.exp(-t * m)) / (m - mv);
}

// 一組各色亮度 → 顯示用的 RGB（0–1），exposure 控制曝光
// 保留色相：先算顏色比例，再用最亮的那個通道決定整體亮度（1 − e^(−x) 的曲線）
export function toRGB(levels, exposure = 1) {
  const c = [0, 0, 0];
  BANDS.forEach((b, i) => { for (let j = 0; j < 3; j++) c[j] += levels[i] * b.rgb[j]; });
  const mx = Math.max(...c);
  if (mx <= 0) return [0, 0, 0];
  const bright = 1 - Math.exp(-mx * exposure);
  return c.map((v) => (v / mx) * bright);
}
export const skyColor = (sunElevDeg, viewElevDeg = 90, air = true, exposure = 9) =>
  toRGB(BANDS.map((b) => skyRadiance(b.nm, sunElevDeg, viewElevDeg, air)), exposure);
export const sunColor = (sunElevDeg, air = true, exposure = 1.6) =>
  toRGB(BANDS.map((b) => sunSpectrum(b.nm) * transmit(b.nm, sunElevDeg, air)), exposure);
