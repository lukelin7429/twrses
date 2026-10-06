/*
 * 萬物原理 · 第十八課「麵包為什麼會膨脹？」的計算（純函式；示意用的簡化模型，不是食譜、也不是實驗數字）。
 *
 * 酵母吃糖、吐出二氧化碳；氣體被麵筋包住，麵糰就長大。越溫暖酵母越快（這個模型只算 5–40°C）。
 *   rate(T)：每分鐘的發酵速度，溫度每高 10°C 快一倍（示意）
 *   size(t, T, yeast)：麵糰是原來的幾倍大（1 → 最多 SIZE_MAX）
 *   送去烤（或蒸）：氣體受熱再脹大一次（OVEN_SPRING），然後麵糰定型
 */
export const T_MAX = 90, TEMP_MIN = 5, TEMP_MAX = 40;        // 分鐘、°C
export const SIZE_MAX = 2.0, OVEN_SPRING = 1.15;
const RATE_AT_35 = 0.045;

export const rate = (T) => RATE_AT_35 * Math.pow(2, (Math.min(TEMP_MAX, Math.max(TEMP_MIN, T)) - 35) / 10);
// 發酵進度 0～1
export function rise(t, T, yeast = true) {
  if (!yeast) return 0;
  return 1 - Math.exp(-rate(T) * Math.max(0, t));
}
export function size(t, T, yeast = true, baked = false) {
  const s = 1 + (SIZE_MAX - 1) * rise(t, T, yeast);
  return baked ? 1 + (s - 1) * OVEN_SPRING : s;
}
// 長到「原來的 k 倍」要幾分鐘；到不了回傳 Infinity
export function minutesTo(k, T, yeast = true) {
  const need = (k - 1) / (SIZE_MAX - 1);
  if (!yeast || need >= 1) return Infinity;
  return -Math.log(1 - need) / rate(T);
}
