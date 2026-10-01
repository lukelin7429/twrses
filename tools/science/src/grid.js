/*
 * 萬物原理 · 第二課「插座裡的電從哪裡來？」的發電機計算（純函式，test/generator.test.mjs 會跑）。
 *
 * 磁鐵繞軸轉 θ，穿過線圈的磁通 ∝ cos θ，感應電壓 ∝ 轉速 × sin θ（法拉第定律）。
 * 交流電每轉一圈換兩次方向；同步發電機的轉速 rpm = 120 × 頻率 ÷ 極數（兩極、60 Hz → 3,600 rpm）。
 * 台灣電網 60 Hz、家用插座 110 V（台電）。
 */
export const REAL_HZ = 60;

// 電壓（−1…1）：轉速 f（每秒幾圈）佔最快 fMax 的比例 × sin θ
export function emf(f, theta, fMax) {
  return fMax > 0 ? (f / fMax) * Math.sin(theta) : 0;
}

// 電流每秒換幾次方向：每轉一圈換兩次
export function flipsPerSecond(f) {
  return 2 * f;
}

// 同步發電機：poles 極、hz 赫茲時每分鐘幾轉
export function realRpm(poles, hz = REAL_HZ) {
  return 120 * hz / poles;
}

// 一圈裡的平均功率（∝ 電壓²）：sin² 的平均是 1/2，所以轉速加倍、亮度變四倍
export function meanPower(f, fMax, steps = 720) {
  let s = 0;
  for (let i = 0; i < steps; i++) { const v = emf(f, (i + 0.5) / steps * Math.PI * 2, fMax); s += v * v; }
  return s / steps;
}
