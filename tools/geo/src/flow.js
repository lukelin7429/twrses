/*
 * 地理 Geography · 第十課「台灣雨這麼多，為什麼還會缺水？」的雨水流向（純函式，test/flow.test.mjs）。
 *
 * 用第九課的台灣 1 公里地形（taiwan.js）：
 *   1. 填平窪地（priority-flood：從海岸往內，每一格至少比流出去的那一格高一點點），雨水才不會卡在格子的小坑裡。
 *   2. 每一格往八個鄰格裡「下降最多」的那一格流（D8；斜的鄰格距離算 √2 公里）；流到海就停。
 *   3. 累積流量：每一格上游有幾格（＝集水面積幾平方公里），大的就畫成河。
 *
 *   getFlow()                       { T, dir: Int32Array（下一格的編號，海是 −1）, acc: Float32Array（集水面積 km²）, filled, order }
 *   pathFrom(F, e, n)               從 (e, n) 下雨，一路流到海：{ cells: [編號…], pts: [[e, n]…], km, drop, outlet: [e, n], side: 'west'|'east' }
 *   riverCells(F, minKm2)           集水面積 ≥ minKm2 的格子
 *   longestTo(F, outletCell)        流進這個出海口、最長的一條路（公里）
 *   mainOutlets(F, k)               集水面積最大的 k 個出海口（[{ cell, e, n, area, km }]）
 *   sideOf(F, e, n)                 這個出海口在西邊還是東邊（和那一列最高點比）
 */
import { getTaiwan, sides } from './taiwan.js';

const NB = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

let cache = null;
export function getFlow() { return cache || (cache = computeFlow(getTaiwan())); }

export function computeFlow(T) {
  const { nx, ny, grid } = T, N = nx * ny;
  const land = (i) => !Number.isNaN(grid[i]);
  const filled = new Float32Array(N).fill(NaN);
  const done = new Uint8Array(N);
  // 最小堆（[高度, 編號]）
  const hv = [], hi = [];
  const push = (v, i) => { hv.push(v); hi.push(i); let c = hv.length - 1; while (c) { const p = (c - 1) >> 1; if (hv[p] <= hv[c]) break; [hv[p], hv[c]] = [hv[c], hv[p]]; [hi[p], hi[c]] = [hi[c], hi[p]]; c = p; } };
  const pop = () => {
    const v = hv[0], i = hi[0], lv = hv.pop(), li = hi.pop();
    if (hv.length) { hv[0] = lv; hi[0] = li; let c = 0; for (;;) { const l = 2 * c + 1, r = l + 1; let m = c; if (l < hv.length && hv[l] < hv[m]) m = l; if (r < hv.length && hv[r] < hv[m]) m = r; if (m === c) break; [hv[m], hv[c]] = [hv[c], hv[m]]; [hi[m], hi[c]] = [hi[c], hi[m]]; c = m; } }
    return [v, i];
  };
  const dir = new Int32Array(N).fill(-1);
  const order = [];
  // 種子：鄰近海（或在邊界）的陸地格子，往海流
  for (let i = 0; i < N; i++) {
    if (!land(i)) continue;
    const x = i % nx, y = (i - x) / nx;
    for (const [dx, dy] of NB) {
      const X = x + dx, Y = y + dy;
      if (X < 0 || Y < 0 || X >= nx || Y >= ny || !land(Y * nx + X)) { done[i] = 1; filled[i] = grid[i]; push(grid[i], i); break; }
    }
  }
  const EPS = 0.01;
  while (hv.length) {
    const [v, i] = pop();
    order.push(i);
    const x = i % nx, y = (i - x) / nx;
    for (const [dx, dy] of NB) {
      const X = x + dx, Y = y + dy;
      if (X < 0 || Y < 0 || X >= nx || Y >= ny) continue;
      const j = Y * nx + X;
      if (!land(j) || done[j]) continue;
      done[j] = 1;
      filled[j] = Math.max(grid[j], v + EPS);
      dir[j] = i;                              // 從 j 流到 i（priority-flood 給的流向，一定流得到海）
      push(filled[j], j);
    }
  }
  // 在填平後的地表上改用「下降最多」的鄰格（只要真的往下）；平地維持 priority-flood 的流向
  for (let j = 0; j < N; j++) {
    if (!land(j) || dir[j] < 0) continue;
    const x = j % nx, y = (j - x) / nx;
    let best = -1, bs = 0;
    for (const [dx, dy] of NB) {
      const X = x + dx, Y = y + dy;
      if (X < 0 || Y < 0 || X >= nx || Y >= ny) continue;
      const k = Y * nx + X;
      if (!land(k)) continue;
      const s = (filled[j] - filled[k]) / Math.hypot(dx, dy);
      if (s > bs) { bs = s; best = k; }
    }
    if (best >= 0 && bs > EPS * 2) dir[j] = best;
  }
  // 累積流量：照填平高度由高到低加
  const acc = new Float32Array(N);
  const idx = order.slice().sort((a, b) => filled[b] - filled[a]);
  for (const i of idx) { acc[i] += 1; if (dir[i] >= 0) acc[dir[i]] += acc[i]; }
  return { T, dir, acc, filled, order };
}

const ofCell = (F, i) => { const x = i % F.T.nx, y = (i - x) / F.T.nx; return [F.T.e0 + x + 0.5, F.T.n0 + y + 0.5]; };
export const cellOf = (F, e, n) => { const x = Math.floor(e - F.T.e0), y = Math.floor(n - F.T.n0); return x < 0 || y < 0 || x >= F.T.nx || y >= F.T.ny ? -1 : y * F.T.nx + x; };

export function sideOf(F, e, n) {
  const s = sides(F.T, n) || sides(F.T, n + 3) || sides(F.T, n - 3);
  return s && e > s.top.e ? 'east' : 'west';
}

export function pathFrom(F, e, n) {
  let i = cellOf(F, e, n);
  if (i < 0 || Number.isNaN(F.T.grid[i])) return null;
  const cells = [i];
  let km = 0;
  for (let guard = 0; guard < 5000 && F.dir[i] >= 0; guard++) {
    const j = F.dir[i], [a, b] = ofCell(F, i), [c, d] = ofCell(F, j);
    km += Math.hypot(c - a, d - b); cells.push(j); i = j;
  }
  // 最後一格到海岸：再加半格
  km += 0.5;
  const pts = cells.map((c) => ofCell(F, c)), outlet = pts[pts.length - 1];
  return { cells, pts, km, drop: F.T.grid[cells[0]] - F.T.grid[i], outlet, side: sideOf(F, outlet[0], outlet[1]) };
}

export function riverCells(F, minKm2) { const out = []; for (let i = 0; i < F.acc.length; i++) if (F.acc[i] >= minKm2) out.push(i); return out; }

/** 流進 outletCell 的最長一條路（公里）：由上游往下推「到出海口的距離」太慢，改成從出海口往上游找最遠的一格 */
export function longestTo(F, outletCell) {
  const { nx } = F.T, up = new Map();
  for (let i = 0; i < F.dir.length; i++) if (F.dir[i] >= 0) { const j = F.dir[i]; if (!up.has(j)) up.set(j, []); up.get(j).push(i); }
  const dist = new Map([[outletCell, 0.5]]), stack = [outletCell];
  let best = 0.5;
  while (stack.length) {
    const j = stack.pop(), dj = dist.get(j);
    for (const i of up.get(j) || []) {
      const xi = i % nx, xj = j % nx, yi = (i - xi) / nx, yj = (j - xj) / nx;
      const d = dj + Math.hypot(xi - xj, yi - yj);
      dist.set(i, d); if (d > best) best = d; stack.push(i);
    }
  }
  return best;
}

export function mainOutlets(F, k = 8) {
  const outs = [];
  for (let i = 0; i < F.dir.length; i++) if (!Number.isNaN(F.T.grid[i]) && F.dir[i] < 0) outs.push(i);
  outs.sort((a, b) => F.acc[b] - F.acc[a]);
  return outs.slice(0, k).map((cell) => { const [e, n] = ofCell(F, cell); return { cell, e, n, area: F.acc[cell], km: longestTo(F, cell), side: sideOf(F, e, n) }; });
}
