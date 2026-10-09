// 第七課：風是怎麼來的？
// 蒲福風級與風速的經驗式：V = 0.836 × B^(3/2)（公尺／秒；中央氣象署 氣象常識「蒲福風級」）
export const beaufortSpeed = (B) => 0.836 * B ** 1.5;
// 陸上應用之蒲福風級表（氣象署）：每一級的風速下限（公尺／秒）
export const BEAUFORT_MIN = [0, 0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7];
export const BEAUFORT_MAX = [0.2, 1.5, 3.3, 5.4, 7.9, 10.7, 13.8, 17.1, 20.7, 24.4, 28.4, 32.6, 36.9];
export const forceOf = (ms) => { let f = 0; for (let i = 0; i < BEAUFORT_MIN.length; i++) if (ms >= BEAUFORT_MIN[i]) f = i; return f; };
export const kmh = (ms) => ms * 3.6;
// 一天：陸地的溫度變化比海大（示例的溫度曲線；陸地下午三點最熱）
const wave = (x, peak, period) => Math.cos(((x - peak) / period) * 2 * Math.PI);
export const DAY = { land: (h) => 26 + 6 * wave(h, 15, 24), sea: (h) => 26 + 1 * wave(h, 17, 24) };
// 一年：大陸的溫度變化比海洋大（示例；一月最冷、七月最熱）
export const YEAR = { land: (m) => 18 + 16 * wave(m, 7, 12), sea: (m) => 24 + 4 * wave(m, 8, 12) };
// 溫差 → 風：陸地比較熱，風從海吹向陸（海風／夏季季風）；陸地比較冷，風從陸吹向海
export function breeze(mode, x) {
  const T = mode === 'day' ? DAY : YEAR, land = T.land(x), sea = T.sea(x), d = land - sea;
  const dir = Math.abs(d) < 0.8 ? 'calm' : d > 0 ? 'onshore' : 'offshore';
  // 風力（示例的換算）：一天裡海風最強 3–4 級、陸風 1–2 級（氣象常識「海陸風」）
  const force = dir === 'calm' ? 0 : mode === 'day' ? (d > 0 ? Math.min(4, Math.max(1, Math.round(d * 0.62))) : Math.min(2, Math.max(1, Math.round(-d * 0.4)))) : d > 0 ? Math.min(4, Math.max(1, Math.round(d * 0.55))) : Math.min(6, Math.max(1, Math.round(-d * 0.38)));
  return { land, sea, diff: d, dir, force };
}
