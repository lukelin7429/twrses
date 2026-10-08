// 第四課：台灣的山是怎麼來的？
// 抬升：堆起來的沉積物以每年約 5 公釐的速度升高成山（維基百科 Geology of Taiwan）。
export const UPLIFT_MM = 5;
export const YUSHAN_M = 3952;                             // 玉山主峰（公尺）
// 沒有侵蝕的話：每年 mm 公釐，過了 years 年長多高（公尺）
export const noErosion = (years, mm = UPLIFT_MM) => (years * mm) / 1000;
export const yearsTo = (meters, mm = UPLIFT_MM) => (meters * 1000) / mm;
// 示例模型：山越高、越陡，被雨水和河流削得越快 → dH/dt = U − k·H
//   H：山的高度（公里）；U：抬升（公里／百萬年，數值上等於 公釐／年）；k：侵蝕的強度（每百萬年）；t：百萬年
export const EROSION = { weak: 0.6, medium: 1.25, strong: 2.5 };
export const steady = (U, k) => U / k;                    // 抬升和侵蝕打平時的高度
export const heightAt = (H0, U, k, t) => steady(U, k) + (H0 - steady(U, k)) * Math.exp(-k * t);
// 這段時間裡總共被抬高了多少、其中多少被削掉了（公里）
export const lifted = (U, t) => U * t;
export const eroded = (H0, U, k, t) => H0 + lifted(U, t) - heightAt(H0, U, k, t);
