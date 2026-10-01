// 萬物原理第七課：GPS 定位計算的檢查
import assert from 'node:assert/strict';
import {
  C_KM_S, R_E, ALT_KM, ORBIT_KM, REL_US_PER_DAY, CHANGHUA, fromLatLon, toLatLon, constellation, elevationDeg,
  travelSec, metersPerMicrosecond, measuredRange, groundCircle, twoPoints, solveFix, pickSats, dist,
} from '../src/gpscalc.js';

const near = (a, b, tol) => Math.abs(a - b) <= tol;
const rx = fromLatLon(CHANGHUA.lat, CHANGHUA.lon);

assert.ok(near(ORBIT_KM, 26571, 1));                                   // 軌道半徑約 26,571 km
assert.ok(near(travelSec(ALT_KM) * 1000, 67.4, 0.1));                    // 正上方的衛星：約 0.067 秒
assert.ok(near(metersPerMicrosecond(), 299.8, 0.1));                     // 時鐘差一微秒 ≈ 300 m
assert.ok(near(REL_US_PER_DAY * metersPerMicrosecond() / 1000, 11.4, 0.1)); // 38 µs ≈ 11 km
assert.ok(near(toLatLon(rx).lat, 24.08, 1e-9) && near(toLatLon(rx).lon, 120.54, 1e-9));

// 星座：24 顆、都在軌道上；彰化一整天（每 10 分鐘看一次）至少看得到 4 顆
const sats0 = constellation(0);
assert.equal(sats0.length, 24);
assert.ok(sats0.every((s) => near(Math.hypot(...s.pos), ORBIT_KM, 1e-6)));
for (let t = 0; t < 24; t += 1 / 6) {
  const vis = constellation(t).filter((s) => elevationDeg(rx, s.pos) >= 10).length;
  assert.ok(vis >= 4, `t=${t.toFixed(2)} h 只看得到 ${vis} 顆`);
}
// 每天繞兩圈：12 小時（半個恆星日）後幾乎回到原位
assert.ok(dist(constellation(11.967)[5].pos, sats0[5].pos) < 1);

const used = pickSats(rx, sats0, 4).map((s) => s.pos);
assert.equal(used.length, 4);
const travel = used.map((s) => travelSec(dist(rx, s)) * 1000);
assert.ok(travel.every((ms) => ms > 67 && ms < 87));                     // 訊號走 0.067–0.086 秒

// 時鐘準：每個「地面上的圓」都通過彰化；兩顆衛星的兩個交點之一就是彰化
for (const s of used) {
  const c = groundCircle(s, measuredRange(rx, s));
  assert.ok(near(rx[0] * c.n[0] + rx[1] * c.n[1] + rx[2] * c.n[2], c.d, 1e-6));
}
const two = twoPoints(used[0], dist(rx, used[0]), used[1], dist(rx, used[1]));
assert.equal(two.length, 2);
assert.ok(Math.min(...two.map((p) => dist(p, rx))) < 1e-3);

// 三顆＋在地面上、時鐘準 → 誤差不到 1 公尺
const r3 = used.slice(0, 3).map((s) => measuredRange(rx, s));
assert.ok(dist(solveFix(used.slice(0, 3), r3, { surface: true }).pos, rx) < 0.001);

// 手機時鐘快 1 微秒、只用三顆 → 藍點偏掉（至少 100 m）
const r3b = used.slice(0, 3).map((s) => measuredRange(rx, s, 1e-6));
assert.ok(dist(solveFix(used.slice(0, 3), r3b, { surface: true }).pos, rx) > 0.1);
// 時鐘快 1 毫秒、三顆 → 偏好幾百公里
assert.ok(dist(solveFix(used.slice(0, 3), used.slice(0, 3).map((s) => measuredRange(rx, s, 1e-3)), { surface: true }).pos, rx) > 100);

// 第四顆：連時鐘誤差一起解 → 位置回到 1 公尺內，解出的誤差就是 1 毫秒（約 299.79 km）
const r4 = used.map((s) => measuredRange(rx, s, 1e-3));
const f4 = solveFix(used, r4, { clock: true });
assert.ok(dist(f4.pos, rx) < 0.001);
assert.ok(near(f4.biasKm / C_KM_S, 1e-3, 1e-9));
assert.ok(near(Math.hypot(...f4.pos), R_E, 0.001));
console.log('gps.test: all passed');
