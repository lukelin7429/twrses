/*
 * 萬物原理 · 第十三課「飛機為什麼飛得起來？」的機翼氣流計算（純函式，test/lift.test.mjs 會跑）。
 *
 * 氣流用茹科夫斯基（Joukowski）翼型的位勢流：在 ζ 平面上，均勻氣流以迎角 α 流過一個帶環流 Γ 的圓，
 *   再用 z = ζ + 1/ζ 把圓變成機翼形狀（弦長約 4）。環流照庫塔條件取 Γ = 4πUa·sin(α + β)，讓氣流在尾緣平順離開。
 *   這是理想（沒有黏性）的氣流：能畫出「上方流得快、後面往下轉」，但算不出失速；
 *   失速（迎角超過約 15°，本模型的設定）另外用一個係數把升力降下來，畫面上讓上方氣流亂掉。
 * 升力 ＝ ½ρV²·S·CL（NASA 升力公式）：速度加倍，升力變四倍。
 * 座標：機翼自己的座標（弦沿 x、前緣在 −x），世界座標把機翼抬頭 α 度。
 */
const D = Math.PI / 180;
export const MU = [-0.09, 0.09];                       // 圓心（往前、往上偏一點 → 有厚度、有彎度）
export const A = Math.hypot(1 - MU[0], MU[1]);         // 圓的半徑：通過 ζ = 1（尾緣）
export const BETA = Math.atan2(MU[1], 1 - MU[0]);      // 彎度造成的零升力角（負的）
export const STALL_DEG = 15;

// 複數小工具（[實部, 虛部]）
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const csqrt = (a) => { const r = Math.hypot(a[0], a[1]); const re = Math.sqrt((r + a[0]) / 2); const im = Math.sign(a[1] || 1) * Math.sqrt(Math.max(0, (r - a[0]) / 2)); return [re, im]; };
const cexp = (t) => [Math.cos(t), Math.sin(t)];

export const circulation = (alphaDeg, U = 1) => 4 * Math.PI * U * A * Math.sin(alphaDeg * D + BETA);

// 機翼外形（機翼座標）：n 個點
export function airfoil(n = 120) {
  const pts = [];
  for (let k = 0; k < n; k++) {
    const t = (k / n) * Math.PI * 2;
    const z = [MU[0] + A * Math.cos(t), MU[1] + A * Math.sin(t)];
    const inv = cdiv([1, 0], z);
    pts.push([z[0] + inv[0], z[1] + inv[1]]);
  }
  return pts;
}
export const chord = () => { const p = airfoil(400); const xs = p.map((q) => q[0]); return Math.max(...xs) - Math.min(...xs); };

// z（機翼座標）→ ζ：取在圓外的那個根
function toZeta(z) {
  const s = csqrt([z[0] * z[0] - z[1] * z[1] - 4, 2 * z[0] * z[1]]);
  const r1 = [(z[0] + s[0]) / 2, (z[1] + s[1]) / 2], r2 = [(z[0] - s[0]) / 2, (z[1] - s[1]) / 2];
  const d1 = Math.hypot(r1[0] - MU[0], r1[1] - MU[1]), d2 = Math.hypot(r2[0] - MU[0], r2[1] - MU[1]);
  return d1 >= d2 ? r1 : r2;
}
export function inside(z) {
  const zeta = toZeta(z);
  return Math.hypot(zeta[0] - MU[0], zeta[1] - MU[1]) < A * 1.003;
}
// 機翼座標裡的速度 [u, v]（自由氣流速度 U、迎角 α）
export function velocity(z, alphaDeg, U = 1, gamma = circulation(alphaDeg, U)) {
  const a = alphaDeg * D;
  const zeta = toZeta(z);
  const w = [zeta[0] - MU[0], zeta[1] - MU[1]];
  const w2 = cmul(w, w);
  const term1 = cexp(-a);
  const term2 = cdiv(cmul([A * A, 0], cexp(a)), w2);
  const term3 = cdiv([0, gamma / (2 * Math.PI)], w);
  const dW = [U * (term1[0] - term2[0]) + term3[0], U * (term1[1] - term2[1]) + term3[1]];
  const dz = [1 - cdiv([1, 0], cmul(zeta, zeta))[0], -cdiv([1, 0], cmul(zeta, zeta))[1]];
  const c = cdiv(dW, dz);                                  // = u − i v
  let u = c[0], v = -c[1];
  const sp = Math.hypot(u, v);
  if (!Number.isFinite(sp)) return [U, 0];
  if (sp > 3 * U) { u *= 3 * U / sp; v *= 3 * U / sp; }   // 尾緣附近數值上的尖點，夾住
  return [u, v];
}
// 世界 ↔ 機翼座標（機翼抬頭 α：世界 = R(−α)·機翼）
export function toWing(p, alphaDeg) { const a = alphaDeg * D; return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]; }
export function toWorld(p, alphaDeg) { const a = -alphaDeg * D; return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]; }

// 升力係數：位勢流的 CL × 失速係數
export const clIdeal = (alphaDeg) => (2 * circulation(alphaDeg)) / chord();
export function stallFactor(alphaDeg) {
  if (alphaDeg <= STALL_DEG) return 1;
  return Math.max(0.5, 1 - (alphaDeg - STALL_DEG) * 0.07);
}
export const cl = (alphaDeg) => clIdeal(alphaDeg) * stallFactor(alphaDeg);
// 升力（相對值）∝ CL × V²
export const liftRel = (alphaDeg, v) => cl(alphaDeg) * v * v;
