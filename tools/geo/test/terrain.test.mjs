import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cone, contour, contourLevels, demoMountain, gridMax, isClosed, pathStats, profile, sampleGrid, slopeAt } from '../src/terrain.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const segX = (p, q, r, s) => {   // 兩條線段有沒有相交（端點重合不算）
  const d = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const d1 = d(r, s, p), d2 = d(r, s, q), d3 = d(p, q, r), d4 = d(p, q, s);
  return ((d1 > 1e-12 && d2 < -1e-12) || (d1 < -1e-12 && d2 > 1e-12)) && ((d3 > 1e-12 && d4 < -1e-12) || (d3 < -1e-12 && d4 > 1e-12));
};

// 圓錐：高 1000 公尺、底半徑 2 公里；600 公尺的等高線是半徑 0.8 公里的圓，而且是一條閉合的線
{
  const h = cone(1000, 2), grid = sampleGrid(h, [-2.5, -2.5, 2.5, 2.5], 121);
  for (const [L, r] of [[600, 0.8], [200, 1.6], [900, 0.2]]) {
    const lines = contour(grid, L);
    assert.equal(lines.length, 1, `one line at ${L}`);
    assert.ok(isClosed(lines[0]), `closed loop at ${L}`);
    for (const [x, y] of lines[0]) near(Math.hypot(x, y), r, 0.03, `cone contour radius at ${L}`);
  }
  assert.equal(contour(grid, 1200).length, 0, 'nothing above the top');
  // 圓錐每個地方坡度一樣：高 1000、水平 2000 公尺 → 26.57 度、50%
  const s = slopeAt(h, 0.7, 0.3);
  near(s.pct, 50, 1e-3, 'cone slope percent'); near(s.deg, 26.565, 1e-3, 'cone slope degrees');
  // 往山頂的方向：在山的東邊，往西最陡（梯度指向西）
  near(slopeAt(h, 1, 0).dir, 270, 1e-3, 'uphill from the east side points west');
  near(slopeAt(h, 0, -1).dir, 0, 1e-3, 'uphill from the south side points north');
  // 等高距一樣時，等高線的間隔一樣（圓錐）
  const r1 = Math.hypot(...contour(grid, 400)[0][0]), r2 = Math.hypot(...contour(grid, 500)[0][0]), r3 = Math.hypot(...contour(grid, 600)[0][0]);
  near(r1 - r2, r2 - r3, 0.02, 'evenly spaced on an even slope');
}

assert.deepEqual(contourLevels(-40, 1030, 100), [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
assert.deepEqual(contourLevels(0, 260, 50), [0, 50, 100, 150, 200, 250]);

// 剖面：兩端的高度等於那兩點的高度；長度是兩點的距離
{
  const { h } = demoMountain();
  const pr = profile(h, [-3.2, 0.6], [2.4, -0.8], 80);
  near(pr[0].z, h(-3.2, 0.6), 1e-9, 'profile start'); near(pr[80].z, h(2.4, -0.8), 1e-9, 'profile end');
  near(pr[80].d, Math.hypot(5.6, 1.4), 1e-12, 'profile length');
}

// 示意的山：主峰約 1,000 公尺、四周是海、副峰比主峰低、東坡比西坡陡
const M = demoMountain(), grid = sampleGrid(M.h, M.box, 161), top = gridMax(grid);
assert.ok(top.z > 980 && top.z < 1100, `summit height ${top.z}`);
near(top.x, M.peak.x, 0.15, 'summit x'); near(top.y, M.peak.y, 0.15, 'summit y');
for (const [x, y] of [[-5, -5], [5, 5], [-5, 2], [4.8, -4.8], [-4.6, 0.6]]) assert.ok(M.h(x, y) < 0, `sea at the edge ${x},${y}`);
assert.ok(M.h(M.second.x, M.second.y) > 450 && M.h(M.second.x, M.second.y) < top.z - 250, 'second peak is lower');
{
  const east = slopeAt(M.h, M.peak.x + 0.8, M.peak.y), west = slopeAt(M.h, M.peak.x - 0.8, M.peak.y);
  assert.ok(east.deg < 45 && west.deg > 8, `slopes look like real hills: ${east.deg}, ${west.deg}`);
  assert.ok(east.deg > 2 * west.deg, `east side steeper: ${east.deg} vs ${west.deg}`);
  // 陡的那一邊等高線比較密：同樣兩條等高線之間，東邊的水平距離比較短
  const along = (sign) => { let d500 = null, d700 = null; for (let s = 0; s < 4; s += 0.002) { const z = M.h(M.peak.x + sign * s, M.peak.y); if (d700 == null && z < 700) d700 = s; if (d500 == null && z < 500) { d500 = s; break; } } return d500 - d700; };
  assert.ok(along(1) < along(-1) / 2, `contours closer together on the steep side: ${along(1)} vs ${along(-1)}`);
}
// 海岸線（0 公尺）是閉合的一圈；每一條 100 公尺間隔的等高線都互不相交
{
  const coast = contour(grid, 0);
  assert.ok(coast.some(isClosed), 'the coastline closes');
  const all = [];
  for (const L of contourLevels(0, top.z, 100)) for (const line of contour(grid, L)) all.push({ L, line });
  let bad = 0;
  for (let a = 0; a < all.length; a++) for (let b = a + 1; b < all.length; b++) {
    if (all[a].L === all[b].L) continue;
    const A = all[a].line, B = all[b].line;
    for (let i = 0; i + 1 < A.length && !bad; i += 1) for (let j = 0; j + 1 < B.length; j += 1) if (segX(A[i], A[i + 1], B[j], B[j + 1])) { bad++; break; }
  }
  assert.equal(bad, 0, 'contour lines of different heights never cross');
}
// 鞍部：主峰與副峰之間的連線上，最低的那一點比兩座山頂都低、但還在海面上
{
  const pr = profile(M.h, [M.peak.x, M.peak.y], [M.second.x, M.second.y], 200);
  const low = pr.reduce((m, p) => (p.z < m.z ? p : m));
  assert.ok(low.z > 150 && low.z < M.h(M.second.x, M.second.y) - 60, `saddle height ${low.z}`);
}
// 路線：平均坡度 = 高度差 ÷ 水平距離
{
  const s = pathStats(cone(1000, 2), [2, 0], [0, 0]);
  near(s.len, 2, 1e-12); near(s.z1 - s.z0, 1000, 1e-9); near(s.avgDeg, 26.565, 1e-3); near(s.climb, 1000, 1e-6); near(s.maxDeg, 26.565, 1e-2);
}

// 頁面資料：「哪一條路比較陡？」八題的答案要和計算一致，而且差距夠明顯
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[0].lessons.find((l) => l.slug === 'contour-lines');
const qs = lesson.steep.questions;
assert.equal(qs.length, 8);
for (const q of qs) {
  const A = pathStats(M.h, q.a[0], q.a[1]), B = pathStats(M.h, q.b[0], q.b[1]);
  const val = (s) => (q.ask === 'steeper' ? s.avgDeg : q.ask === 'easier' ? -s.avgDeg : q.ask === 'higher' ? s.top : s.climb);
  const want = val(A) > val(B) ? 'a' : 'b';
  assert.equal(q.answer, want, `${q.en}: answer should be ${want}`);
  const [hi, lo] = [Math.max(Math.abs(val(A)), Math.abs(val(B))), Math.min(Math.abs(val(A)), Math.abs(val(B)))];
  assert.ok(hi > lo * 1.35, `${q.en}: the difference should be clear (${hi} vs ${lo})`);
  assert.ok(q.en && q.zh && q.why_en && q.why_zh);
}
assert.equal(lesson.map_english.items.length, 8);
console.log('terrain.test ok', { summit: Math.round(top.z) });
