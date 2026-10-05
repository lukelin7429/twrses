/*
 * 萬物原理 · 第十四課「腳踏車騎起來為什麼不會倒？」的平衡計算（純函式，test/bike.test.mjs 會跑）。
 *
 * 簡化的教學模型（不是完整的 Whipple 腳踏車方程）：把車和上面的重量看成一根會倒的桿子（重心高 h），
 *   車往哪邊轉彎，離心效應就把它往另一邊推回來：
 *     h·φ'' = g·sin φ − (v²/w)·tan δ·cos φ − (b·v/w)·δ'·cos φ
 *   φ：傾斜角（往右為正）、δ：前輪轉向角（往右為正）、v：速度、w：軸距、b：重心到後輪的距離。
 *   「前輪會自己往倒的那一邊轉」用一條簡單的規則代表：τ·δ' = K·φ − δ（前輪朝著 K·φ 追過去，τ 是反應時間）。
 *   線性化後的穩定條件（Routh）：v² > g·w/K（夠快才接得住），而且 v < b/τ（前輪反應要夠快，否則越擺越大）。
 *   τ = 0.03 秒 → 上限約時速 50 公里，在滑桿範圍（0–30）以外。
 *   真實腳踏車的這個自動轉向，來自前叉幾何、重量分布、陀螺效應等好幾個因素的組合（Kooijman 等，Science 2011）。
 * 結論：v² > g·w/K 時，轉彎的推回力大過重力的傾倒力 → 自己站直；太慢就接不住。前輪鎖死（δ = 0）一定倒。
 */
export const G = 9.81;
export const BIKE = { h: 0.75, w: 1.02, b: 0.42, K: 1.3, tau: 0.03, maxSteer: 40 * Math.PI / 180 };
export const FALL = 60 * Math.PI / 180;

export const criticalSpeed = (p = BIKE) => Math.sqrt(G * p.w / p.K);   // m/s
export const wobbleSpeed = (p = BIKE) => p.b / p.tau;                  // 超過這個速度會越擺越大（m/s）
export const kmh = (ms) => ms * 3.6;

// 往前走一小步；s = { phi, dphi, delta, x, z, psi }；locked：前輪鎖死不能轉
export function step(s, v, dt, { locked = false, p = BIKE } = {}) {
  let ddelta = 0;
  if (!locked) {
    ddelta = (p.K * s.phi - s.delta) / p.tau;
    let nd = s.delta + ddelta * dt;
    if (Math.abs(nd) > p.maxSteer) { nd = Math.sign(nd) * p.maxSteer; ddelta = 0; }
    s.delta = nd;
  } else {
    s.delta += (0 - s.delta) * Math.min(1, dt * 20);
  }
  const c = Math.cos(s.phi);
  const ddphi = (G * Math.sin(s.phi) - (v * v / p.w) * Math.tan(s.delta) * c - (p.b * v / p.w) * ddelta * c) / p.h;
  s.dphi += ddphi * dt;
  s.phi += s.dphi * dt;
  s.psi += (v * Math.tan(s.delta) / p.w) * dt;      // 車頭方向（往右轉為正）
  s.x += v * Math.cos(s.psi) * dt;
  s.z += v * Math.sin(s.psi) * dt;
  return s;
}

export const fresh = () => ({ phi: 0, dphi: 0, delta: 0, x: 0, z: 0, psi: 0 });

// 側推一下（給一個傾倒的角速度）之後跑 sec 秒：有沒有倒、最大傾斜、最後的傾斜
export function pushTest(v, { push = 0.45, sec = 8, locked = false, p = BIKE } = {}) {
  const s = fresh(); s.dphi = push;
  let maxLean = 0, fell = false;
  for (let t = 0; t < sec; t += 0.002) {
    step(s, v, 0.002, { locked, p });
    maxLean = Math.max(maxLean, Math.abs(s.phi));
    if (Math.abs(s.phi) > FALL) { fell = true; break; }
  }
  return { fell, maxLean, endLean: Math.abs(s.phi), s };
}
