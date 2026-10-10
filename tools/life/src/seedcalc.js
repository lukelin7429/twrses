/*
 * 第五課「種子怎麼知道什麼時候該發芽？」的規則（life-seed.js 與 test/seed.test.mjs 共用）。
 * 種子＝一株睡著的小植物＋一包便當。水、溫度、空氣都對了才醒；先長根、再長芽；便當吃完之前要長出葉子。
 * 數字都是示意（模型用的門檻），不是哪一種種子的實測值。
 */
export const WATER_MIN = 30, WATER_MAX = 85;   // 太少＝太乾；太多＝泡在水裡，沒有空氣
export const TEMP_MIN = 12, TEMP_MAX = 34;     // °C，示意的範圍
export const check = (water, temp) => (water < WATER_MIN ? 'dry' : water > WATER_MAX ? 'drowned' : temp < TEMP_MIN ? 'cold' : temp > TEMP_MAX ? 'hot' : 'go');
export const awake = (water, temp) => check(water, temp) === 'go';
// 生長進度 0–100 的四個階段
export const STAGES = [['sleep', 0], ['swell', 1], ['root', 20], ['shoot', 45], ['leaves', 80]];
export const stage = (g) => { let k = 'sleep'; for (const [name, from] of STAGES) if (g >= from) k = name; return k; };
const sm = (x) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
export const rootLen = (g) => sm((g - 20) / 55);            // 0–1
export const shootLen = (g) => sm((g - 45) / 45);           // 0–1
export const leafSize = (g) => sm((g - 80) / 20);           // 0–1
export const lunch = (g) => Math.round(100 * (1 - sm((g - 5) / 95)));   // 便當還剩幾成（示意）
// 訊息鍵：沒醒 → 原因；醒了 → 階段；暗處長到芽以後 → pale
export const holding = (water, temp, g, light) => {
  const c = check(water, temp);
  if (c !== 'go') return c;
  const s = stage(g);
  return !light && (s === 'shoot' || s === 'leaves') ? 'pale' : s;
};
