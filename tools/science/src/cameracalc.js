/*
 * 萬物原理 · 第十二課「相機怎麼拍下照片？」的成像與像素計算（純函式，test/camera.test.mjs 會跑）。
 *
 * 薄透鏡公式：1/f = 1/物距 + 1/像距；放大率 = 像距 ÷ 物距，影像上下左右顛倒。
 * 感光元件不在像距上時，一個點會變成一個小圓（模糊圈）：直徑 = 光圈 × |感光元件位置 − 像距| ÷ 像距。
 * 針孔（沒有鏡頭）：光直直穿過小孔，影像大小 = 孔到感光元件的距離 ÷ 物距；模糊圈約等於孔的大小。
 * 拜耳濾色陣列（RGGB）：每 2 × 2 格裡 1 紅、2 綠、1 藍，綠色是紅、藍的兩倍（Bayer 1976 年專利）。
 */
export const imageDistance = (f, objDist) => 1 / (1 / f - 1 / objDist);
export const magnification = (objDist, imgDist) => imgDist / objDist;
export const blurDiameter = (aperture, sensorDist, imgDist) => aperture * Math.abs(sensorDist - imgDist) / imgDist;
// 影像上的位置：物體上高度 y 的點，落在感光元件上 −y × 放大率（倒過來）
export const imageHeight = (y, objDist, imgDist) => -y * imgDist / objDist;
export const pinholeBlur = (holeDiam, objDist, sensorDist) => holeDiam * (objDist + sensorDist) / objDist;

// 每一格的濾色片：0 紅、1 綠、2 藍
export const bayer = (row, col) => (row % 2 === 0 ? (col % 2 === 0 ? 0 : 1) : (col % 2 === 0 ? 1 : 2));
export function bayerCounts(w, h) {
  const c = [0, 0, 0];
  for (let r = 0; r < h; r++) for (let k = 0; k < w; k++) c[bayer(r, k)]++;
  return c;
}
export const megapixels = (w, h) => (w * h) / 1e6;
// 亮度與光圈面積成正比（光圈直徑加倍，進光變四倍）
export const exposure = (aperture, ref = 1) => (aperture / ref) ** 2;
