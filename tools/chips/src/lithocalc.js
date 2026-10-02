/*
 * 晶片與半導體 · 第四課的計算（純函式，node 測試在 test/litho.test.mjs）。
 *
 * 光：DUV（ArF 準分子雷射 193 nm，浸潤式 NA 1.35）與 EUV（13.5 nm，NA 0.33）；光罩上的圖案縮小 4 倍印到晶圓上。
 * 最細的線（ASML 的瑞利公式）CD ＝ k1 · λ / NA；k1 物理上限 0.25，量產常見約 0.4（Wikipedia）。
 *   DUV 0.4 × 193 / 1.35 ≈ 57 nm、EUV 0.4 × 13.5 / 0.33 ≈ 16 nm：波長短了 14 倍，線只細了約 3.5 倍（NA 也有關）。
 * 曬圖（藍曬，cyanotype）模擬：紙上每一點受到的「光量」＝曝光時間 × 光罩在那裡透光多少；
 *   顏色深淺 tone ＝ 1 − e^(−光量/DOSE0)（越曬越深、會飽和）。光罩離紙越遠，影子邊緣越糊（blur 寬度 ∝ 距離），
 *   就像曝光機要讓光準確聚焦，線條才畫得細。DOSE0、模糊係數都是示意值。
 */

export const LIGHT = {
  duv: { key: 'duv', nm: 193, NA: 1.35, optics: 'lens', air: true },
  euv: { key: 'euv', nm: 13.5, NA: 0.33, optics: 'mirror', air: false },
};
export const K1 = 0.4, K1_MIN = 0.25;
export const cd = (k, k1 = K1) => (k1 * LIGHT[k].nm) / LIGHT[k].NA;
/** 3D 剖面裡畫幾條：DUV 6 條，EUV 照最細線寬的比例多畫 */
export const segments = (k) => Math.round(6 * cd('duv') / cd(k));
export const REDUCTION = 4;
export const shrink = (mm, r = REDUCTION) => mm / r;
export const ratio = (a, b) => LIGHT[a].nm / LIGHT[b].nm;

// ---------- 藍曬 ----------
export const DOSE0 = 12;           // 曬幾分鐘到約 63%（示意；英國自然史博物館說安娜．阿特金斯的方法要 10–40 分鐘）
export const BLUR_PER_MM = 1.6;    // 光罩每離紙 1 mm，影子邊緣糊幾個像素（示意）

export function tone(minutes, transmission = 1) {
  const dose = Math.max(0, minutes) * Math.max(0, Math.min(1, transmission));
  return 1 - Math.exp(-dose / DOSE0);
}

/** 一維盒狀模糊（用來測試；畫布上用同樣的半徑做二維） */
export function blur1D(arr, radius) {
  const r = Math.max(0, Math.round(radius));
  if (!r) return arr.slice();
  const out = new Array(arr.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    let s = 0, n = 0;
    for (let k = i - r; k <= i + r; k++) { if (k >= 0 && k < arr.length) { s += arr[k]; n++; } }
    out[i] = s / n;
  }
  return out;
}
export const blurRadius = (gapMm) => Math.max(0, gapMm) * BLUR_PER_MM;

/** 邊緣有多寬：tone 從 10% 到 90% 之間跨了幾格 */
export function edgeWidth(profile) {
  const lo = Math.min(...profile), hi = Math.max(...profile), a = lo + 0.1 * (hi - lo), b = lo + 0.9 * (hi - lo);
  const i0 = profile.findIndex((v) => v >= a), i1 = profile.findIndex((v) => v >= b);
  return i1 - i0;
}
