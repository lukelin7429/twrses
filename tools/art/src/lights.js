/*
 * 美術 Art · 第一課：牆面上每一點是什麼顏色（純函式；test/lights.test.mjs）。
 * art-lights.js 的著色器照這裡的公式算（一個像素一個像素），這裡的版本給右邊欄的讀數、標籤位置和測試用。
 *
 * 座標：牆在 z = 0 的平面上，牆上的點是 (x, y)。燈在牆前面（z > 0），每盞燈在牆上打出一個圓形的光斑。
 *   spots[i] = { x, y, k, on }   光斑（或顏料色片）的圓心、亮度（厚度）0–1、開或關
 *   lamps[i] = [x, y, z]         燈的位置（算影子用）
 *   obj      = { on, x, y, z, rad }   擋在燈和牆之間的球
 */
import { LIGHTS, PIGMENTS, clamp01, pigmentPass } from './color.js';

export const WALL = { w: 13, h: 7, cy: 4.1 };            // 牆的寬、高、中心高度
export const SPOT_R = 2.05;                               // 光斑半徑
export const SOFT_LIGHT = 0.22;                           // 光斑邊緣柔和的寬度
export const SOFT_PAINT = 0.03;                           // 顏料色片的邊緣（幾乎是硬邊）
export const SOFT_SHADOW = 0.07;
export const LAMPS = [[-1.3, 1.7, 6], [0, 0.4, 6], [1.3, 1.7, 6]];   // 排成三角形，三個影子才會各自露出一塊
export const OBJ = { on: false, x: 0, y: 3.2, z: 1.5, rad: 0.6 };

export const smoothstep = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };

/** 離圓心 dist 的地方，光斑有多亮：圓內 1、圓外 0，邊緣 soft 寬的一圈平滑過渡。 */
export const spotMask = (dist, r = SPOT_R, soft = SOFT_LIGHT) => 1 - smoothstep(r - soft, r, dist);

/** 牆上的點 P＝[x, y, 0] 看得到燈 L 嗎？球（圓心 C、半徑 rad）擋住就是 0，沒擋住是 1。 */
export function shadowMask(P, L, C, rad, soft = SOFT_SHADOW) {
  const d = [L[0] - P[0], L[1] - P[1], L[2] - (P[2] || 0)];
  const len = Math.hypot(d[0], d[1], d[2]);
  const u = d.map((v) => v / len);
  const pc = [C[0] - P[0], C[1] - P[1], C[2] - (P[2] || 0)];
  const t = pc[0] * u[0] + pc[1] * u[1] + pc[2] * u[2];
  if (t <= 0 || t >= len) return 1;
  const dist = Math.hypot(pc[0] - u[0] * t, pc[1] - u[1] * t, pc[2] - u[2] * t);
  return smoothstep(rad - soft, rad + soft, dist);
}

/** 球的影子落在牆上的哪裡（影子中心與大約的半徑）。 */
export function shadowOnWall(L, C, rad) {
  const t = L[2] / (L[2] - C[2]);
  return { x: L[0] + (C[0] - L[0]) * t, y: L[1] + (C[1] - L[1]) * t, r: rad * t };
}

/** 每盞燈在這一點貢獻多少（0–1），已經乘上亮度與影子。 */
export function lightParts(x, y, st) {
  return st.spots.map((s, i) => {
    if (!s.on) return 0;
    let m = spotMask(Math.hypot(x - s.x, y - s.y), st.r || SPOT_R, SOFT_LIGHT) * s.k;
    if (m > 0 && st.obj && st.obj.on) m *= shadowMask([x, y, 0], st.lamps[i], [st.obj.x, st.obj.y, st.obj.z], st.obj.rad);
    return m;
  });
}

/** 光的模式：牆上 (x, y) 的顏色。暗房裡沒被照到的地方是黑的。 */
export function wallLight(x, y, st) {
  const p = lightParts(x, y, st);
  const out = [0, 0, 0];
  for (let i = 0; i < 3; i++) for (let c = 0; c < 3; c++) out[c] += LIGHTS[i].rgb[c] * p[i];
  return out.map(clamp01);
}

/** 顏料的模式：白牆（白光照著），每片色片吸掉一部分的光。 */
export function wallPaint(x, y, st) {
  const out = [1, 1, 1];
  st.spots.forEach((s, i) => {
    if (!s.on) return;
    const m = spotMask(Math.hypot(x - s.x, y - s.y), st.r || SPOT_R, SOFT_PAINT) * s.k;
    const pass = pigmentPass(PIGMENTS[i].absorb, m);
    for (let c = 0; c < 3; c++) out[c] *= pass[c];
  });
  return out.map(clamp01);
}

export const wallColor = (x, y, st) => (st.mode === 'paint' ? wallPaint(x, y, st) : wallLight(x, y, st));

/**
 * 七種重疊區（哪幾個圓蓋到）各占多大、中心在哪裡。回傳以 bit 編碼的 key（1＝第一個、2＝第二個、4＝第三個）。
 * 只看圓的位置，不看亮度與影子。
 */
export function regions(st, nx = 78, ny = 44) {
  const r = st.r || SPOT_R, out = {};
  for (let k = 1; k < 8; k++) out[k] = { n: 0, x: 0, y: 0 };
  const x0 = -WALL.w / 2, y0 = WALL.cy - WALL.h / 2;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const x = x0 + (i + 0.5) / nx * WALL.w, y = y0 + (j + 0.5) / ny * WALL.h;
      let k = 0;
      st.spots.forEach((s, b) => { if (s.on && Math.hypot(x - s.x, y - s.y) < r - SOFT_LIGHT) k |= 1 << b; });
      if (k) { out[k].n++; out[k].x += x; out[k].y += y; }
    }
  }
  const cell = (WALL.w / nx) * (WALL.h / ny);
  for (let k = 1; k < 8; k++) {
    const o = out[k];
    out[k] = o.n ? { area: o.n * cell, x: o.x / o.n, y: o.y / o.n } : { area: 0, x: 0, y: 0 };
  }
  return out;
}

/** 讓圓心留在牆面裡。 */
export function clampSpot(x, y, margin = 0.6) {
  const hw = WALL.w / 2 - margin, hh = WALL.h / 2 - margin;
  return [Math.min(hw, Math.max(-hw, x)), Math.min(WALL.cy + hh, Math.max(WALL.cy - hh, y))];
}

// 幾種排法（圓心）
export const LAYOUTS = {
  venn: [[-1.25, 3.4], [1.25, 3.4], [0, 5.5]],          // 兩兩重疊、中間三個都重疊
  together: [[0, 4.1], [0, 4.1], [0, 4.1]],                // 三個疊在同一個地方
  apart: [[-4.3, 4.1], [0, 4.1], [4.3, 4.1]],              // 完全分開
  pair: [[-0.9, 4.1], [0.9, 4.1], [4.3, 5.2]],             // 前兩個重疊，第三個在旁邊
};
