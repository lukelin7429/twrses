// 第十三課：海水為什麼是鹹的？
// 海水平均鹽度約 3.5%（每公斤約 35 公克；NOAA）。死海 2011 年約 34.2%（Wikipedia “Dead Sea”）。
export const SEA = 3.5, DEAD = 34.2, RIVER = 0.01;          // RIVER：河水裡只有一點點（示例的數量級，重點是「非常少」）
// 一公升水曬乾剩多少公克的鹽（把一公升當成大約一公斤）
export const grams = (liters, pct) => liters * 10 * pct;
// 模型裡的鹽度：t 從 0 到 1 是「很久很久」。
//  海：水只能靠蒸發離開，鹽留下來，越積越多，最後停在今天的 3.5%（示意的曲線）
//  有出口的湖：鹽跟著水一起流走，一直很淡
export function salinity(mode, t) {
  const x = Math.min(1, Math.max(0, t));
  if (mode === 'lake') return RIVER * 3 * (1 - Math.exp(-6 * x));
  return (SEA * (1 - Math.exp(-3.2 * x))) / (1 - Math.exp(-3.2));
}
// 畫面上要留在水裡的鹽粒數
export const saltDots = (mode, t, max) => Math.round((salinity(mode, t) / SEA) * max);
