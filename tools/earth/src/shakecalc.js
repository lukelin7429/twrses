// 第三課：規模和震度有什麼不同？
// 規模＝一個地震放出多少能量（一個數字）；震度＝你站的地方搖得多厲害（每個地方不一樣）。
// 台灣的簡化海岸線與投影：從 tools/chips/src/islandcalc.js 抄來（示意輪廓，不是測量資料）。
export const OUTLINE = [
  [121.54, 25.30], [121.75, 25.15], [122.00, 25.01], [121.87, 24.60], [121.62, 23.98], [121.38, 23.10], [121.17, 22.75],
  [120.90, 22.35], [120.85, 21.90], [120.73, 21.92], [120.59, 22.37], [120.27, 22.62], [120.15, 23.00], [120.05, 23.12],
  [120.15, 23.38], [120.20, 23.80], [120.40, 24.07], [120.52, 24.28], [120.67, 24.49], [120.92, 24.85], [121.08, 25.05], [121.41, 25.18],
];
export const CENTER = { lon: 120.95, lat: 23.65 }, SCALE = 2.1;           // 每一度緯度 2.1 個場景單位
export function project(lon, lat) {
  return { x: (lon - CENTER.lon) * Math.cos((CENTER.lat * Math.PI) / 180) * SCALE, z: -(lat - CENTER.lat) * SCALE };
}
export const KM_PER_UNIT = 111.2 / SCALE;                                   // 1 度緯度約 111.2 公里
export function km(a, b) {
  const R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// 十個城市（大約位置）與三個示例震央（不是任何一次真實的地震）
export const CITIES = [
  { key: 'taipei', lon: 121.56, lat: 25.04, en: 'Taipei', zh: '台北' }, { key: 'hsinchu', lon: 120.97, lat: 24.80, en: 'Hsinchu', zh: '新竹' },
  { key: 'yilan', lon: 121.75, lat: 24.76, en: 'Yilan', zh: '宜蘭' }, { key: 'taichung', lon: 120.67, lat: 24.15, en: 'Taichung', zh: '台中' },
  { key: 'changhua', lon: 120.54, lat: 24.08, en: 'Changhua', zh: '彰化' }, { key: 'hualien', lon: 121.60, lat: 23.98, en: 'Hualien', zh: '花蓮' },
  { key: 'chiayi', lon: 120.45, lat: 23.48, en: 'Chiayi', zh: '嘉義' }, { key: 'tainan', lon: 120.21, lat: 22.99, en: 'Tainan', zh: '台南' },
  { key: 'taitung', lon: 121.14, lat: 22.76, en: 'Taitung', zh: '台東' }, { key: 'kaohsiung', lon: 120.30, lat: 22.63, en: 'Kaohsiung', zh: '高雄' },
];
export const EPICENTERS = { east: { lon: 121.85, lat: 23.9 }, central: { lon: 120.9, lat: 23.85 }, southwest: { lon: 120.5, lat: 23.2 } };
// 震源到你的直線距離（震央距離與深度的斜邊）
export const hypo = (distKm, depthKm) => Math.hypot(distKm, depthKm);
// 示例的衰減公式：規模越大、離得越近，地面加速度（gal＝公分／秒²）越大。不是氣象署用的公式。
export const K0 = 1.6;
export const accel = (M, rKm) => 10 ** (0.5 * M - 1.6 * Math.log10(rKm + 10) + K0);
// 地表上震度剛好降到 lv 級的距離（公里）；到不了這一級就回傳 0
export function ringKm(M, depthKm, lv) {
  const rh = 10 ** ((0.5 * M + K0 - (lv / 2 - 0.6)) / 1.6) - 10, d2 = rh * rh - depthKm * depthKm;
  return rh > 0 && d2 > 0 ? Math.sqrt(d2) : 0;
}
// 震度與加速度的關係：log α = I／2 − 0.6（中央氣象署地震百問 36）
export const intensityValue = (gal) => 2 * (Math.log10(gal) + 0.6);
export const levelOf = (v) => Math.max(0, Math.min(7, Math.floor(v)));
// 氣象署震度分級的十個級別：0、1、2、3、4、5 弱、5 強、6 弱、6 強、7。這裡把 5、6 級各從中間分開（示例）。
export function label(v) {
  const l = levelOf(v);
  if (l === 5 || l === 6) return { level: l, en: `${l}${v - l < 0.5 ? ' Lower' : ' Upper'}`, zh: `${l} ${v - l < 0.5 ? '弱' : '強'}`, idx: l === 5 ? (v - l < 0.5 ? 5 : 6) : (v - l < 0.5 ? 7 : 8) };
  return { level: l, en: String(l), zh: `${l} 級`, idx: l === 7 ? 9 : l };
}
export const intensityAt = (M, depthKm, distKm) => intensityValue(accel(M, hypo(distKm, depthKm)));
// 一個地震在十個城市的震度
export const shake = (M, depthKm, epi) => CITIES.map((c) => { const d = km(epi, c), v = intensityAt(M, depthKm, d); return { key: c.key, dist: d, v, ...label(v) }; });
// 規模差多少，能量差幾倍：10^(1.5 × 差)（地震百問 29）
export const energyRatio = (dM) => 10 ** (1.5 * dM);
