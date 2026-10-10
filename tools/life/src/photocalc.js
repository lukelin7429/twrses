// 第二課：葉子怎麼用陽光做出食物？
// 真的：6 CO2 + 6 H2O +（光）→ C6H12O6 + 6 O2。每做一個葡萄糖，要 6 個二氧化碳、6 個水，放出 6 個氧氣；氧氣來自水。
export const PER_SUGAR = 6;
export const recipe = (sugars) => ({ co2: PER_SUGAR * sugars, water: PER_SUGAR * sugars, oxygen: PER_SUGAR * sugars, sugar: sugars });
// 下面是示意：三樣東西（光、二氧化碳、水）各用 0–100 表示「夠不夠」，最缺的那一樣決定做得多快。
const clamp = (x) => Math.min(100, Math.max(0, x));
// 氣孔開多大：水不夠的時候，葉子把氣孔關小來省水（0–1）
export const stomata = (water) => Math.min(1, clamp(water) / 60);
// 畫面上氣孔開多大：天黑了也會關起來（大部分的植物晚上關氣孔）
export const stomataOpen = (light, water) => (clamp(light) < 5 ? 0 : stomata(water));
// 真正進得了葉子的二氧化碳：外面有多少 × 氣孔開多大
export const co2In = (co2, water) => clamp(co2) * stomata(water);
export function limits(light, co2, water) { return { light: clamp(light), co2: co2In(co2, water), water: clamp(water) }; }
// 做糖的快慢（0–100）：被最缺的那一樣卡住
export function rate(light, co2, water) { const l = limits(light, co2, water); return Math.min(l.light, l.co2, l.water); }
// 現在是被什麼卡住：dark（幾乎沒有光）、light、co2、water，或 go（三樣都夠）
export function holding(light, co2, water) {
  if (clamp(light) < 5) return 'dark';
  const l = limits(light, co2, water), r = Math.min(l.light, l.co2, l.water);
  if (r >= 70) return 'go';
  if (l.water === r && clamp(water) < 60) return 'water';       // 水不夠：直接缺水，也讓氣孔關小
  return l.light === r ? 'light' : l.co2 === r ? 'co2' : 'water';
}
