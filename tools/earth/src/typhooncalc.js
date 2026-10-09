// 第八課：颱風是怎麼形成的？
// 中央氣象署颱風強度劃分（近中心最大風速，公尺／秒）：不足 17.2 是熱帶性低氣壓；輕度 17.2–32.6；中度 32.7–50.9；強烈 51.0 以上
export const TY_MIN = 17.2, MOD_MIN = 32.7, SEV_MIN = 51.0;
export const category = (v) => (v < TY_MIN ? 'td' : v < MOD_MIN ? 'mild' : v < SEV_MIN ? 'moderate' : 'severe');
// 蒲福風級表（氣象署，排到 17 級）每一級的風速下限
export const BF_MIN = [0, 0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 37.0, 41.5, 46.2, 51.0, 56.1];
export const forceOf = (ms) => { let f = 0; for (let i = 0; i < BF_MIN.length; i++) if (ms >= BF_MIN[i]) f = i; return f; };
export const kmh = (ms) => ms * 3.6;
export const V_LO = 10, V_HI = 60;
// 示意：在溫暖的海面上慢慢增強，登陸以後慢慢減弱（速率是為了動畫好看選的，不是實測）
export function step(v, place, dt) {
  const nv = place === 'sea' ? v + 2.2 * dt : v - 3.2 * dt;
  return Math.min(V_HI, Math.max(V_LO, nv));
}
// 組織程度 0–1：熱帶性低氣壓時雲還很散亂，越強螺旋和眼越清楚（示意）
export const organized = (v) => Math.min(1, Math.max(0, (v - 12) / 22));
// 颱風眼的半徑（模型單位）：越強越小（氣象署：眼的大小有隨颱風增強而縮小的趨勢）
export const eyeRadius = (v) => 1.8 - 0.7 * Math.min(1, Math.max(0, (v - TY_MIN) / (V_HI - TY_MIN)));
// 風速的分布（示意）：眼裡平靜，眼的邊緣最強，往外漸弱
export function windAt(r, vmax, re) {
  if (r < re * 0.6) return vmax * 0.08;
  if (r < re) return vmax * (0.08 + 0.92 * (r - re * 0.6) / (re * 0.4));
  return vmax * (re / r) ** 0.6;
}
