/*
 * 第七課「水怎麼爬到樹頂？」的規則（life-tree.js 與 test/tree.test.mjs 共用）。
 * 樹沒有心臟。葉子上的水蒸發出去（蒸散），把後面的水一個拉一個往上拖；水柱不斷，是因為水分子彼此黏得很緊。
 * 蒸散的快慢看三件事：陽光（氣孔開不開）、空氣有多潮溼、土裡有沒有水。數字都是示意。
 */
const c01 = (v) => Math.min(1, Math.max(0, v));
export const SUN_MIN = 8, SOIL_MIN = 20;                       // 太暗或土太乾，氣孔就關起來
// 氣孔開多大（0–1）
export const stomata = (sun, soil) => (sun < SUN_MIN ? 0 : soil < SOIL_MIN ? 0 : c01((soil - SOIL_MIN) / 30));
// 水往上走多快（0–1）：氣孔開度 × 陽光 × 空氣有多乾
export const flow = (sun, humid, soil) => +(stomata(sun, soil) * c01(sun / 100) * (1 - 0.9 * c01(humid / 100))).toFixed(3);
export const holding = (sun, humid, soil) => {
  if (sun < SUN_MIN) return 'dark';
  if (soil < SOIL_MIN) return 'dry';
  if (humid >= 85) return 'humid';
  return flow(sun, humid, soil) >= 0.45 ? 'fast' : 'slow';
};
// 頁面小工具：只靠「從上面吸」最多把水抬高約 10 公尺；這棵樹是幾倍？
export const SUCTION_M = 10;
export const timesLimit = (h) => +(h / SUCTION_M).toFixed(1);
