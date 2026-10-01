/*
 * 萬物原理 · 第十一課「聲音怎麼傳到耳朵？」的聲波計算（純函式，test/sound.test.mjs 會跑）。
 *
 * 空氣中的聲速 ≈ 331.3 + 0.606 × 溫度（°C）m/s，20 °C 約 343 m/s（Wikipedia「Speed of sound」）。
 * 波長 ＝ 聲速 ÷ 頻率；雷聲：秒數 × 343 m ≈ 秒數 ÷ 3 公里（約 2.9 秒 1 公里）。
 * 縱波：每顆分子只在自己原本的位置前後晃 s = A·sin(2π(x − x₀)/λ − 2πft)，波前還沒到的地方 s = 0。
 *   一疏一密：壓縮量 ≈ −ds/dx（正＝擠在一起、負＝散開）。
 */
export const V20 = 343;
export const MEDIA = {
  air: { v: 343, en: 'Air', zh: '空氣' },
  water: { v: 1481, en: 'Fresh water', zh: '淡水' },
  iron: { v: 5120, en: 'Iron', zh: '鐵' },
};
export const HEARING = [20, 20000];

export const speedOfSound = (tempC) => 331.3 + 0.606 * tempC;
export const wavelength = (f, v = V20) => v / f;
export const thunderKm = (seconds, v = V20) => (seconds * v) / 1000;
export const secondsPerKm = (v = V20) => 1000 / v;
export const canHear = (f) => f >= HEARING[0] && f <= HEARING[1];

// 模型裡分子的位移（x：分子原本的位置，src：聲源位置，t：從開始振動算起的秒數）
export function displacement(x, t, { A, lambda, f, src = 0, speed }) {
  const front = src + speed * t;
  if (x > front) return 0;
  return A * Math.sin((2 * Math.PI * (x - src)) / lambda - 2 * Math.PI * f * t);
}
// 壓縮量（正＝擠在一起）
export function squeeze(x, t, p) {
  const h = 1e-3;
  return -(displacement(x + h, t, p) - displacement(x - h, t, p)) / (2 * h);
}
