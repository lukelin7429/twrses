/*
 * 萬物原理 · 第七課「GPS 怎麼知道你在哪裡？」的定位計算（純函式，test/gps.test.mjs 會跑）。
 *
 * 單位：公里、秒。地球當成半徑 6,371 km 的正球。座標系跟 three.js 場景一致：
 *   y 軸指北極；經度 0° 在 +x，東經 90° 在 −z（跟天文 earthmap 的貼圖一樣）。
 * 星座：GPS 基本設計 24 個位置（6 個軌道面、各 4 顆、傾角 55°、高度約 20,200 km、每天繞地球兩圈）。
 *   每顆的初始相位是示意的，不是今天真實衛星的位置。地球自轉沒畫（場景裡地球不轉）。
 * 定位：每顆衛星的「量到的距離」＝ 光速 × 訊號走的時間。手機的時鐘若快了 e 秒，每段距離都多算 c·e。
 *   solveFix 用高斯－牛頓法解：未知數 (x, y, z) 或 (x, y, z, 時鐘誤差)；衛星不到四顆時，
 *   另外加「人在地面上」(|p| = R) 這個條件，讓三顆也能定出一點。
 */
export const C_KM_S = 299792.458;          // 光速（公里／秒）
export const R_E = 6371;                   // 地球平均半徑（公里）
export const ALT_KM = 20200;               // GPS 軌道高度（GPS.gov：約 20,200 km）
export const ORBIT_KM = R_E + ALT_KM;      // 軌道半徑約 26,571 km
export const PERIOD_H = 11.967;            // 半個恆星日：每天繞兩圈
export const INCL_DEG = 55;
export const PLANES = 6, PER_PLANE = 4;
export const REL_US_PER_DAY = 45 - 7;      // 廣義相對論快 45 µs、狹義相對論慢 7 µs → 每天快 38 µs
export const CHANGHUA = { lat: 24.08, lon: 120.54 };
const D = Math.PI / 180;

export function fromLatLon(latDeg, lonDeg, r = R_E) {
  const a = latDeg * D, b = lonDeg * D;
  return [r * Math.cos(a) * Math.cos(b), r * Math.sin(a), -r * Math.cos(a) * Math.sin(b)];
}
export function toLatLon(p) {
  const r = Math.hypot(p[0], p[1], p[2]);
  return { lat: Math.asin(p[1] / r) / D, lon: Math.atan2(-p[2], p[0]) / D };
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const dist = (a, b) => len(sub(a, b));

// 24 顆衛星在 tHours 小時時的位置（公里）。名字 G01–G24 只是編號，不是真實的 PRN。
export function constellation(tHours = 0) {
  const out = [];
  const i = INCL_DEG * D, w = 2 * Math.PI / PERIOD_H;
  for (let p = 0; p < PLANES; p++) {
    const raan = (p * 60 + 20) * D;
    for (let k = 0; k < PER_PLANE; k++) {
      const u = (k * 90 + p * 15) * D + w * tHours;
      // 標準座標（Z 指北）再換成場景座標 (X, Z, −Y)
      const X = Math.cos(raan) * Math.cos(u) - Math.sin(raan) * Math.sin(u) * Math.cos(i);
      const Y = Math.sin(raan) * Math.cos(u) + Math.cos(raan) * Math.sin(u) * Math.cos(i);
      const Z = Math.sin(u) * Math.sin(i);
      out.push({ id: p * PER_PLANE + k, name: `G${String(p * PER_PLANE + k + 1).padStart(2, '0')}`, plane: p,
        pos: [X * ORBIT_KM, Z * ORBIT_KM, -Y * ORBIT_KM] });
    }
  }
  return out;
}

// 從地面點 rx 看衛星的仰角（度）：0 在地平線、90 在頭頂
export function elevationDeg(rx, sat) {
  const v = sub(sat, rx);
  return Math.asin(dot(v, rx) / (len(v) * len(rx))) / D;
}

export const travelSec = (km) => km / C_KM_S;
export const metersPerMicrosecond = () => C_KM_S * 1e-6 * 1000;   // 約 300 m

// 手機量到的距離（虛擬距離）：真實距離 ＋ 時鐘誤差造成的多算
export function measuredRange(rx, sat, clockErrSec = 0) {
  return dist(rx, sat) + C_KM_S * clockErrSec;
}

// 「距離 ρ 的球」和地表的交線是一個圓：{ p : |p| = R, p·n = d }。n 是衛星方向的單位向量。
export function groundCircle(sat, rho, R = R_E) {
  const s = len(sat);
  const d = (R * R + s * s - rho * rho) / (2 * s);
  if (Math.abs(d) > R) return null;
  return { n: scale(sat, 1 / s), d, r: Math.sqrt(R * R - d * d) };
}

// 兩個圓（兩顆衛星）在地表上交會的兩點；沒有交點回傳 []
export function twoPoints(s1, r1, s2, r2, R = R_E) {
  const k1 = (R * R + dot(s1, s1) - r1 * r1) / 2, k2 = (R * R + dot(s2, s2) - r2 * r2) / 2;
  const a11 = dot(s1, s1), a12 = dot(s1, s2), a22 = dot(s2, s2);
  const det = a11 * a22 - a12 * a12;
  if (Math.abs(det) < 1e-9) return [];
  const a = (k1 * a22 - k2 * a12) / det, b = (k2 * a11 - k1 * a12) / det;
  const base = [s1[0] * a + s2[0] * b, s1[1] * a + s2[1] * b, s1[2] * a + s2[2] * b];
  const nrm = cross(s1, s2);
  const t2 = (R * R - dot(base, base)) / dot(nrm, nrm);
  if (t2 < 0) return [];
  const t = Math.sqrt(t2);
  return [base.map((v, j) => v + nrm[j] * t), base.map((v, j) => v - nrm[j] * t)];
}

function solveLinear(A, b) {
  const n = b.length, M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    [M[c], M[piv]] = [M[piv], M[c]];
    if (Math.abs(M[c][c]) < 1e-12) return null;
    for (let r = c + 1; r < n; r++) {
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = M[r][n];
    for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k];
    x[r] = s / M[r][r];
  }
  return x;
}

/*
 * 定位：sats 是衛星位置（公里）、rhos 是量到的距離。
 *   clock = true：一起解手機時鐘誤差 b（以公里表示，b / c 就是秒）——四顆以上才用。
 *   surface = true：加「在地面上」的條件（衛星不到四顆時用）。
 * 回傳 { pos, biasKm, ok }。
 */
export function solveFix(sats, rhos, { clock = false, surface = false, guess = null } = {}) {
  let x = guess ? [...guess] : fromLatLon(23.7, 121, R_E);
  let b = 0;
  const nu = clock ? 4 : 3;
  for (let it = 0; it < 30; it++) {
    const J = [], r = [];
    sats.forEach((s, i) => {
      const v = sub(x, s), L = len(v);
      J.push(clock ? [v[0] / L, v[1] / L, v[2] / L, 1] : [v[0] / L, v[1] / L, v[2] / L]);
      r.push(rhos[i] - (L + b));
    });
    if (surface) {
      const L = len(x);
      J.push(clock ? [x[0] / L, x[1] / L, x[2] / L, 0] : [x[0] / L, x[1] / L, x[2] / L]);
      r.push(R_E - L);
    }
    const A = Array.from({ length: nu }, () => new Array(nu).fill(0)), g = new Array(nu).fill(0);
    J.forEach((row, k) => { for (let a = 0; a < nu; a++) { g[a] += row[a] * r[k]; for (let c = 0; c < nu; c++) A[a][c] += row[a] * row[c]; } });
    const dx = solveLinear(A, g);
    if (!dx) return { pos: x, biasKm: b, ok: false };
    x = [x[0] + dx[0], x[1] + dx[1], x[2] + dx[2]];
    if (clock) b += dx[3];
    if (Math.hypot(dx[0], dx[1], dx[2], clock ? dx[3] : 0) < 1e-7) break;
  }
  return { pos: x, biasKm: b, ok: true };
}

// 從看得到的衛星裡挑 n 顆：先挑最高的，之後每次挑「和已選的分得最開」的（幾何越分散，交會越準）
export function pickSats(rx, sats, n = 4, minElev = 15) {
  const vis = sats.filter((s) => elevationDeg(rx, s.pos) >= minElev);
  if (!vis.length) return [];
  const dir = (s) => { const v = sub(s.pos, rx); return scale(v, 1 / len(v)); };
  const chosen = [vis.reduce((a, s) => (elevationDeg(rx, s.pos) > elevationDeg(rx, a.pos) ? s : a))];
  while (chosen.length < Math.min(n, vis.length)) {
    let best = null, bestScore = -Infinity;
    for (const s of vis) {
      if (chosen.includes(s)) continue;
      const minAng = Math.min(...chosen.map((c) => Math.acos(Math.max(-1, Math.min(1, dot(dir(s), dir(c)))))));
      if (minAng > bestScore) { bestScore = minAng; best = s; }
    }
    chosen.push(best);
  }
  return chosen;
}
