// 第十一課：河流怎麼改變大地？
// 一條從山到海的河（模型單位，全部示意）：x 從 -7（山上）到 7（海）
export const X0 = -7, X1 = 7, FOOT = -2, SHORE = 4;       // 山腳、海岸的位置
// 地面的高度：山區很陡，平原很緩，海面以下
export function ground(x) {
  if (x <= FOOT) return 0.6 + ((FOOT - x) / (FOOT - X0)) ** 1.25 * 3.4;
  if (x <= SHORE) return 0.6 * ((SHORE - x) / (SHORE - FOOT)) ** 1.8;        // 越靠海越平
  return -0.5 * Math.min(1, (x - SHORE) / 1.5);
}
export const slope = (x) => (ground(x - 0.05) - ground(x + 0.05)) / 0.1;
// 水量：枯水期、平常、颱風大水（倍數是示例）
export const WATER = { dry: 0.55, normal: 1, flood: 1.9 };
// 水流的快慢（示意）：越陡越快、水越多越快；進了海就慢下來
export function flow(x, water) {
  if (x >= SHORE) return 0.03 * WATER[water];
  return WATER[water] * (0.16 + 0.9 * Math.max(0, slope(x)) ** 0.7);
}
// 三種顆粒：越大越需要快的水才帶得動（門檻是示例，只有順序是重點）
export const GRAINS = { gravel: 0.66, sand: 0.3, mud: 0.07 };
// 這種顆粒會在哪裡停下來（水流第一次慢到帶不動它的地方）
export function settleX(grain, water) {
  for (let x = X0 + 0.4; x <= X1; x += 0.05) if (flow(x, water) < GRAINS[grain]) return Math.round(x * 100) / 100;
  return X1;
}
export const zoneOf = (x) => (x < FOOT - 0.6 ? 'mountain' : x < FOOT + 1.6 ? 'fan' : x < SHORE ? 'plain' : 'sea');
