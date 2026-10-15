/*
 * 地理 Geography · 立體地形引擎的純函式（不碰 DOM、不碰 three.js；test/terrain.test.mjs 有測試）。
 *
 * 地形用「高度函式」h(x, y) 表示：x 往東、y 往北，單位公里；h 是海拔，單位公尺（0 是海平面，負的是海）。
 *   demoMountain()                     示意的山（10 × 10 公里）：主峰（東坡陡、西坡緩）、副峰、兩峰之間的鞍部、往西南流的山谷；四周是海
 *   cone(H, R)                         圓錐形的山（測試用：等高線是算得出半徑的圓）
 *   sampleGrid(h, box, n)              在 box = [x0, y0, x1, y1] 裡取 n × n 個點
 *   contour(grid, level)               某個高度的等高線（marching squares；回傳折線陣列，閉合的折線首尾相同）
 *   contourLevels(min, max, interval)  從 interval 的倍數開始，列出 min 到 max 之間的等高線高度
 *   profile(h, a, b, n)                沿 a → b 的剖面：[{ d 公里, z 公尺 }]
 *   slopeAt(h, x, y)                   坡度：{ deg 度, pct 百分比, rise 每公里升高幾公尺, dir 往哪個方向最陡（度，0＝北、90＝東） }
 *   pathStats(h, a, b, n)              一條直線路線：長度、起訖高度、最高點、總爬升、平均坡度、最陡的一段
 *   gridMax(grid)                      最高點
 *
 * 地形是示意，不是真實的地方；真實的台灣地形留給之後的課，用政府開放資料。
 */
export const RAD = Math.PI / 180;

const g2 = (x, y, cx, cy, sx, sy) => Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));

/**
 * 示意的山。範圍 [-5, 5] × [-5, 5] 公里（四周是海），主峰約 1,000 公尺。
 * 主峰東坡陡、西坡緩；東南邊有一座比較矮的副峰，兩峰之間是鞍部；一條山谷從鞍部下方往西南流到海邊。
 */
export function demoMountain() {
  const K = 5;   // 公里：座標除以 K 變成 −1 到 1
  const P = [-0.2, 0.15], Q = [0.25, -0.2], S = [0.04, -0.1], E = [-0.3, -0.62];
  const h = (x, y) => {
    const u = x / K, v = y / K, du = u - P[0];
    const main = 1080 * Math.exp(-((du / (du > 0 ? 0.2 : 0.55)) ** 2 + ((v - P[1]) / 0.3) ** 2));   // 東坡陡、西坡緩
    const second = 600 * g2(u, v, Q[0], Q[1], 0.19, 0.19);
    // 山谷：S → E 的一條溝，從上游慢慢變深（深度和那裡的山高成正比）
    const ex = E[0] - S[0], ey = E[1] - S[1], L2 = ex * ex + ey * ey;
    const t = Math.max(0, Math.min(1, ((u - S[0]) * ex + (v - S[1]) * ey) / L2));
    const dv = Math.hypot(u - (S[0] + ex * t), v - (S[1] + ey * t));
    const valley = 0.45 * Math.exp(-((dv / 0.055) ** 2)) * Math.min(1, t / 0.15);   // 挖掉這裡山的 45%（低的地方挖得少，不會挖出海溝）
    // 四周往海裡降
    const e = Math.max(Math.abs(u), Math.abs(v));
    const f = e < 0.6 ? 1 : e > 0.9 ? 0 : 0.5 + 0.5 * Math.cos(Math.PI * (e - 0.6) / 0.3);
    return (main + second) * (1 - valley) * f - 60;
  };
  return { h, box: [-K, -K, K, K], peak: { x: P[0] * K, y: P[1] * K }, second: { x: Q[0] * K, y: Q[1] * K }, valley: { x: (S[0] + 0.3 * (E[0] - S[0])) * K, y: (S[1] + 0.3 * (E[1] - S[1])) * K } };
}

/** 圓錐形的山：中心 (0, 0)、高 H、底半徑 R；底以外是 0 */
export const cone = (H, R) => (x, y) => Math.max(0, H * (1 - Math.hypot(x, y) / R));

export function sampleGrid(h, box, n) {
  const [x0, y0, x1, y1] = box;
  const z = new Float64Array(n * n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) z[j * n + i] = h(x0 + (x1 - x0) * i / (n - 1), y0 + (y1 - y0) * j / (n - 1));
  return { n, box, z };
}

export function gridMax(grid) {
  let best = -Infinity, k = 0;
  for (let i = 0; i < grid.z.length; i++) if (grid.z[i] > best) { best = grid.z[i]; k = i; }
  const { n, box: [x0, y0, x1, y1] } = grid;
  return { z: best, x: x0 + (x1 - x0) * (k % n) / (n - 1), y: y0 + (y1 - y0) * Math.floor(k / n) / (n - 1) };
}

export function contourLevels(min, max, interval) {
  const out = [];
  for (let L = Math.ceil(min / interval) * interval; L <= max; L += interval) out.push(L + 0);   // + 0 把 −0 變成 0
  return out;
}

/**
 * marching squares：每個格子看四個角在 level 以上或以下，切出線段；線段的端點用「在哪一條格子邊上」當作身分，
 * 相同身分的端點接起來就是一條折線。四角兩兩相對的「鞍點」格子用中心值判斷怎麼接。
 */
export function contour(grid, level) {
  const { n, box: [x0, y0, x1, y1], z } = grid;
  const dx = (x1 - x0) / (n - 1), dy = (y1 - y0) / (n - 1);
  const v = (i, j) => z[j * n + i] - level;
  const above = (i, j) => v(i, j) > 0;
  // 邊的編號：橫邊 (i, j)-(i+1, j) 是 2*(j*n+i)，直邊 (i, j)-(i, j+1) 是 2*(j*n+i)+1
  const pt = new Map();
  const point = (id) => {
    let p = pt.get(id);
    if (p) return p;
    const k = id >> 1, i = k % n, j = (k - i) / n;
    let a, b, ax, ay, bx, by;
    if (id & 1) { a = v(i, j); b = v(i, j + 1); ax = i; ay = j; bx = i; by = j + 1; } else { a = v(i, j); b = v(i + 1, j); ax = i; ay = j; bx = i + 1; by = j; }
    const t = a / (a - b);
    p = [x0 + (ax + (bx - ax) * t) * dx, y0 + (ay + (by - ay) * t) * dy];
    pt.set(id, p);
    return p;
  };
  const segs = [];
  for (let j = 0; j < n - 1; j++) for (let i = 0; i < n - 1; i++) {
    const c = (above(i, j) ? 1 : 0) | (above(i + 1, j) ? 2 : 0) | (above(i + 1, j + 1) ? 4 : 0) | (above(i, j + 1) ? 8 : 0);
    if (c === 0 || c === 15) continue;
    const B = 2 * (j * n + i), T = 2 * ((j + 1) * n + i), L = 2 * (j * n + i) + 1, R = 2 * (j * n + i + 1) + 1;
    const add = (a, b) => segs.push([a, b]);
    switch (c) {
      case 1: case 14: add(L, B); break;
      case 2: case 13: add(B, R); break;
      case 3: case 12: add(L, R); break;
      case 4: case 11: add(R, T); break;
      case 6: case 9: add(B, T); break;
      case 7: case 8: add(L, T); break;
      case 5: case 10: {
        const mid = (v(i, j) + v(i + 1, j) + v(i + 1, j + 1) + v(i, j + 1)) / 4 > 0;
        if ((c === 5) === mid) { add(L, T); add(B, R); } else { add(L, B); add(R, T); }
        break;
      }
      default: break;
    }
  }
  // 接起來
  const at = new Map();
  segs.forEach(([a, b], k) => { for (const e of [a, b]) { const l = at.get(e); l ? l.push(k) : at.set(e, [k]); } });
  const used = new Uint8Array(segs.length), lines = [];
  const other = (k, e) => (segs[k][0] === e ? segs[k][1] : segs[k][0]);
  for (let s = 0; s < segs.length; s++) {
    if (used[s]) continue;
    used[s] = 1;
    const ids = [segs[s][0], segs[s][1]];
    for (const dir of [1, 0]) {   // 往兩頭延伸
      for (;;) {
        const end = dir ? ids[ids.length - 1] : ids[0];
        const next = (at.get(end) || []).find((k) => !used[k]);
        if (next == null) break;
        used[next] = 1;
        const e = other(next, end);
        if (dir) ids.push(e); else ids.unshift(e);
        if (e === (dir ? ids[0] : ids[ids.length - 1])) break;
      }
    }
    lines.push(ids.map(point));
  }
  return lines;
}

/** 折線是不是閉合的（首尾是同一點） */
export const isClosed = (line) => line.length > 2 && line[0] === line[line.length - 1];

export function profile(h, [ax, ay], [bx, by], n = 120) {
  const len = Math.hypot(bx - ax, by - ay), out = [];
  for (let i = 0; i <= n; i++) { const t = i / n; out.push({ d: len * t, z: h(ax + (bx - ax) * t, ay + (by - ay) * t) }); }
  return out;
}

/** 坡度：用中央差分算梯度；x、y 是公里、h 是公尺，所以每公里升高的公尺數除以 1000 才是坡度的正切 */
export function slopeAt(h, x, y, e = 0.004) {
  const gx = (h(x + e, y) - h(x - e, y)) / (2 * e), gy = (h(x, y + e) - h(x, y - e)) / (2 * e);
  const rise = Math.hypot(gx, gy);
  const tan = rise / 1000;
  return { rise, pct: tan * 100, deg: Math.atan(tan) / RAD, dir: ((Math.atan2(gx, gy) / RAD) + 360) % 360 };
}

/** 一條直線路線的數字：平均坡度＝起訖高度差 ÷ 水平距離；最陡的一段看每一小段 */
export function pathStats(h, a, b, n = 200) {
  const pr = profile(h, a, b, n);
  let climb = 0, steep = 0, top = -Infinity;
  for (let i = 1; i < pr.length; i++) {
    const dz = pr[i].z - pr[i - 1].z, dd = (pr[i].d - pr[i - 1].d) * 1000;
    if (dz > 0) climb += dz;
    steep = Math.max(steep, Math.abs(dz) / dd);
  }
  for (const p of pr) top = Math.max(top, p.z);
  const len = pr[pr.length - 1].d;
  return { len, z0: pr[0].z, z1: pr[pr.length - 1].z, top, climb, avgDeg: Math.atan(Math.abs(pr[pr.length - 1].z - pr[0].z) / (len * 1000)) / RAD, maxDeg: Math.atan(steep) / RAD };
}
