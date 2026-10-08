/*
 * 晶片與半導體 · 第九課「晶片為什麼會發熱？」的計算（純函式；示意用的簡化模型，不是任何一顆晶片的規格）。
 *
 * 熱從哪裡來：電晶體每開關一次，就有一點點電流流過，這些電能最後都變成熱。
 *   動態功率 P ∝ C·V²·f（Wikipedia “Processor power dissipation”）→ relPower(v, f) = v²·f（相對值）
 * 溫度（示意）：穩定時 T = 室溫 + 功率 × 散熱的「阻力」；散熱越好，阻力越小。
 *   dT/dt = (室溫 + P·R − T) / TAU
 * 過熱保護（降頻）：超過 LIMIT 就把速度往下調，降到溫度守得住為止。
 */
export const AMBIENT = 25, LIMIT = 95, TAU = 6;          // °C、°C、秒
export const LOADS = { idle: 0.1, video: 0.35, game: 1 };            // 有多少電晶體在忙（示例）
export const COOLERS = { none: 1.6, sink: 0.8, fan: 0.45 };          // 每 1% 功率升幾 °C（示例）
export const relPower = (v = 1, f = 1) => v * v * f;                 // 相對功率
export const power = (load, speed = 1) => 100 * (LOADS[load] ?? load) * speed;        // 0–100（%）
export const steadyTemp = (load, cooler, speed = 1) => AMBIENT + power(load, speed) * COOLERS[cooler];
// 走一步：回傳新的 { T, speed }
export function step(s, { load, cooler }, dt) {
  const target = steadyTemp(load, cooler, s.speed);
  const T = s.T + ((target - s.T) / TAU) * dt;
  let speed = s.speed + (T > LIMIT ? -0.7 : 0.06) * dt;             // 太熱就降速，涼了再慢慢加回來
  speed = Math.min(1, Math.max(0.2, speed));
  return { T, speed };
}
export function simulate(opts, seconds = 120, dt = 0.05) {
  let s = { T: AMBIENT, speed: 1 }, hi = AMBIENT, minSpeed = 1;
  for (let t = 0; t < seconds; t += dt) { s = step(s, opts, dt); hi = Math.max(hi, s.T); if (t > seconds * 0.6) minSpeed = Math.min(minSpeed, s.speed); }
  return { T: s.T, speed: s.speed, hi, minSpeed };
}
// 這個負載、這種散熱下，最快能跑多快而不超過上限
export const safeSpeed = (load, cooler) => Math.min(1, (LIMIT - AMBIENT) / (100 * LOADS[load] * COOLERS[cooler]));
