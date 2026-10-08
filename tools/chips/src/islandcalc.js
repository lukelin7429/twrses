/*
 * 晶片與半導體 · 第八課「台灣怎麼成為晶片島？」的計算（純函式）。
 *
 *   OUTLINE：台灣本島的簡化海岸線（經度、緯度，二十幾個點的示意輪廓，不是測量資料）
 *   PLACES ：課文提到的地點（大約位置）
 *   project(lon, lat)：經緯度 → 場景座標（等距圓柱投影，以台灣中間為原點；+x 往東、+z 往南）
 *   km(a, b)：兩地的直線距離（大圓距離）
 *   EVENTS ：時間軸（年份皆有出處，見 data 的 sources）
 *   ROLES  ：誰做什麼（設計／製造／封裝測試），頁面小遊戲用
 */
export const OUTLINE = [
  [121.54, 25.30], [121.75, 25.15], [122.00, 25.01], [121.87, 24.60], [121.62, 23.98], [121.38, 23.10], [121.17, 22.75],
  [120.90, 22.35], [120.85, 21.90], [120.73, 21.92], [120.59, 22.37], [120.27, 22.62], [120.15, 23.00], [120.05, 23.12],
  [120.15, 23.38], [120.20, 23.80], [120.40, 24.07], [120.52, 24.28], [120.67, 24.49], [120.92, 24.85], [121.08, 25.05], [121.41, 25.18],
];
export const PLACES = {
  hsinchu: { lon: 121.00, lat: 24.78, en: 'Hsinchu', zh: '新竹' },
  taichung: { lon: 120.62, lat: 24.21, en: 'Taichung', zh: '台中' },
  changhua: { lon: 120.54, lat: 24.08, en: 'Changhua', zh: '彰化' },
  tainan: { lon: 120.27, lat: 23.10, en: 'Tainan', zh: '台南' },
  kaohsiung: { lon: 120.30, lat: 22.72, en: 'Kaohsiung', zh: '高雄' },
};
export const CENTER = { lon: 120.95, lat: 23.65 }, SCALE = 2.1;           // 每一度緯度 2.1 個場景單位
export function project(lon, lat) {
  return { x: (lon - CENTER.lon) * Math.cos((CENTER.lat * Math.PI) / 180) * SCALE, z: -(lat - CENTER.lat) * SCALE };
}
export function km(a, b) {
  const R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// 一顆晶片在台灣可能走的一條路（示例）
export const JOURNEY = ['hsinchu', 'tainan', 'kaohsiung'];
export const journeyKm = () => JOURNEY.slice(1).reduce((s, k, i) => s + km(PLACES[JOURNEY[i]], PLACES[k]), 0);

export const EVENTS = [
  { year: 1973, key: 'itri', place: 'hsinchu' },
  { year: 1976, key: 'rca', place: 'hsinchu' },
  { year: 1980, key: 'umc', place: 'hsinchu' },
  { year: 1980, key: 'hsp', place: 'hsinchu' },
  { year: 1984, key: 'ase', place: 'kaohsiung' },
  { year: 1987, key: 'tsmc', place: 'hsinchu' },
  { year: 1995, key: 'stsp', place: 'tainan' },
  { year: 2003, key: 'ctsp', place: 'taichung' },
];
export const YEAR_MIN = 1970, YEAR_MAX = 2005;
export const eventsBy = (year) => EVENTS.filter((e) => e.year <= year);
export const yearsAgo = (year, now = 2026) => now - year;

export const ROLE_KEYS = ['design', 'make', 'pack'];
export const ROLES = { MediaTek: 'design', Nvidia: 'design', Qualcomm: 'design', AMD: 'design', TSMC: 'make', UMC: 'make', ASE: 'pack' };
export const score = (answers) => Object.keys(ROLES).filter((k) => answers[k] === ROLES[k]).length;
