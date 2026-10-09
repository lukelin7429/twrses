// 第十課：天氣預報是怎麼做出來的？
// 一條雨帶往小鎮移動。同樣的計算跑十次，每次的起點和速度只差一點點（示例的數字），
// 看十次裡有幾次在某個時段下雨 → 這個比例就是降雨機率的意思。
export const TOWN_X = 3, SPEED = 0.25;                 // 小鎮的位置；雨帶每小時走幾個模型單位（示例）
export const BAND = 1.5;                                // 雨帶的寬度（模型單位；大約 6 小時通過）
export const PERIOD = 12, HOURS = 72;                   // 每個預報時段 12 小時，共看 72 小時
export const LEAD = { near: 12, far: 48 };              // 雨帶照「最可能的那一次」幾小時後到
// 十次計算的速度誤差（示例；平均接近 0）
export const EPS = [-0.2, -0.14, -0.09, -0.05, -0.02, 0.02, 0.05, 0.09, 0.14, 0.2];
export const MAIN = 4;                                  // 單看一次的時候，看的是這一次
export const startX = (lead) => TOWN_X - SPEED * LEAD[lead];
// 第 i 次計算裡，h 小時後雨帶前緣的位置
export const frontX = (i, lead, h) => startX(lead) + SPEED * (1 + EPS[i]) * h;
// 小鎮這時候在不在雨帶裡（雨帶在前緣的後面）
export const rainingAt = (i, lead, h) => { const f = frontX(i, lead, h); return TOWN_X <= f && TOWN_X >= f - BAND; };
// 這個時段（第 p 段）裡，第 i 次計算有沒有下到雨
export function rainInPeriod(i, lead, p) {
  for (let h = p * PERIOD; h <= (p + 1) * PERIOD; h += 0.25) if (rainingAt(i, lead, h)) return true;
  return false;
}
export const runsWithRain = (lead, p) => EPS.reduce((n, _, i) => n + (rainInPeriod(i, lead, p) ? 1 : 0), 0);
export const pop = (lead, p) => Math.round((runsWithRain(lead, p) / EPS.length) * 100);
export const periodOf = (h) => Math.min(HOURS / PERIOD - 1, Math.floor(h / PERIOD));
// 天空狀況用詞（中央氣象署）：雲量占全天空 0–4/10 晴、5–8/10 多雲、9–10/10 陰
export const skyWord = (tenths) => (tenths <= 4 ? 'sunny' : tenths <= 8 ? 'cloudy' : 'overcast');
