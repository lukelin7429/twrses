// 第十一課：晶圓廠的水和電。
// 水：回收率 r（0–0.9）→ 每用 100 公升，要補多少新水；一滴水平均被用幾次。
export const fresh = (use, r) => use * (1 - r);
export const timesUsed = (r) => 1 / (1 - r);
// 無塵室等級（ISO 14644-1）：每立方公尺空氣裡，0.5 微米以上的微粒最多幾顆（維基百科 Cleanroom 的表）
export const ISO = { 9: 35200000, 8: 3520000, 7: 352000, 6: 35200, 5: 3520, 4: 352, 3: 35 };
export const cleaner = (n) => ISO[9] / ISO[n];
// 曝光機耗電（維基百科 EUV lithography，2020 年量測，單位 MW）
export const TOOL_MW = { duv: 0.13, euv: 1.31 };
