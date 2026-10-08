// 第二課：台灣為什麼地震這麼多？
// 板塊：菲律賓海板塊每年約 7–8 公分往西北擠（中央氣象署地震百問 56），取中間值。
export const RATE_CM = 7.5;
// 斷層卡多久才滑（示例；真實的斷層各不相同，也不會這麼規律）
export const MODES = { easy: { years: 40 }, hard: { years: 160 } };
export const stored = (years) => (RATE_CM * years) / 100;                 // 累積了幾公尺的板塊移動
// 從開始算起過了 t 年：已經滑了幾次、離上一次幾年
export function cycle(t, mode) {
  const T = MODES[mode].years, n = Math.floor(Math.max(0, t) / T);
  return { n, since: Math.max(0, t) - n * T, period: T, slip: stored(T), total: n * stored(T) };
}
// 地震波：P 波先到、S 波後到（維基百科：P 波在地殼約 5–8 km/s，P 與 S 約 1.7：1）。取示例值。
export const VP = 7, VS = 4;
// 強震即時警報：地震發生後約 15–20 秒算出震央，再 1–2 秒發出（地震百問 84）。取中間值。
export const ALERT_S = 19;
export const tP = (km) => km / VP;
export const tS = (km) => km / VS;
export const warning = (km, alert = ALERT_S) => Math.max(0, tS(km) - alert);   // 警報響起到 S 波抵達，有幾秒
export const blindKm = (alert = ALERT_S) => alert * VS;                          // 這個距離以內，警報來不及
