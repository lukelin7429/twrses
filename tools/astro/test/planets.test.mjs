// 第七課的行星位置：node test/planets.test.mjs（有 assert）
// 逆行起訖對照公開的星曆（停留點，UT 日期），容許誤差 2 天
import assert from 'node:assert/strict';
import { geo, retrogrades, dailyMotion, LIGHT_S_PER_AU, RADIUS_KM, AU_KM } from '../src/planets.js';

const day = (d) => d.toISOString().slice(0, 10);
const close = (a, b, tol = 2) => Math.abs(a.getTime() - new Date(b + 'T12:00Z').getTime()) / 86400000 <= tol;
const KNOWN = [
  ['mercury', '2025-03-15', '2025-04-07'],
  ['venus', '2025-03-02', '2025-04-13'],
  ['mars', '2024-12-07', '2025-02-24'],
  ['saturn', '2025-07-13', '2025-11-28'],
  ['jupiter', '2025-11-11', '2026-03-11'],
  ['mars', '2027-01-10', '2027-04-01'],
];
for (const [k, s, e] of KNOWN) {
  const r = retrogrades(k, new Date(new Date(s + 'T00:00Z').getTime() - 20 * 86400000), 400)[0];
  console.log(`${k.padEnd(8)} retrograde ${day(r.start)} → ${day(r.end)}   (expected ${s} → ${e})`);
  assert.ok(close(r.start, s) && close(r.end, e), `${k} retrograde`);
}
// 火星 2025/1/16 衝：離太陽約 180°、地心距離約 0.64 AU、亮度約 −1.4 等
const m = geo('mars', new Date('2025-01-16T03:00Z'));
console.log(`Mars at opposition: elong ${m.elong.toFixed(1)}°, ${m.dist.toFixed(3)} AU, mag ${m.mag.toFixed(1)}`);
assert.ok(Math.abs(Math.abs(m.elong) - 180) < 3 && Math.abs(m.dist - 0.642) < 0.01 && Math.abs(m.mag + 1.4) < 0.3);
// 逆行時黃經每天往西走（負值），順行時往東
assert.ok(dailyMotion('mars', new Date('2025-01-16T00:00Z')) < 0 && dailyMotion('mars', new Date('2025-06-01T00:00Z')) > 0);
// 金星最亮約 −4.6～−4.9 等；木星衝（2026/1/10）約 −2.7 等
const v = geo('venus', new Date('2025-02-16T00:00Z')), j = geo('jupiter', new Date('2026-01-10T00:00Z'));
console.log(`Venus 2025-02-16 mag ${v.mag.toFixed(1)}, Jupiter 2026-01-10 mag ${j.mag.toFixed(1)}`);
assert.ok(v.mag < -4.4 && v.mag > -5.0 && j.mag < -2.4 && j.mag > -2.9);
// 天王星、海王星：衝（2025/11/21、2025/9/23）時離太陽約 180°；日心距離約 19.5、29.9 AU
for (const [k, d, r] of [['uranus', '2025-11-21', 19.5], ['neptune', '2025-09-23', 29.9]]) {
  const g = geo(k, new Date(d + 'T12:00Z'));
  console.log(`${k} ${d}: elong ${g.elong.toFixed(1)}°, ${g.r.toFixed(2)} AU from the Sun, ${g.dist.toFixed(2)} AU from Earth`);
  assert.ok(Math.abs(Math.abs(g.elong) - 180) < 2 && Math.abs(g.r - r) < 0.3);
}
// 第九課：光從太陽到地球 499.0 秒（8 分 19 秒）；太陽縮成 24 cm 籃球時，地球 2.2 mm、離 26 m，海王星離 776 m
assert.ok(Math.abs(LIGHT_S_PER_AU - 499.0) < 0.1);
const k = 0.24 / (2 * RADIUS_KM.sun * 1000);
const earthMm = 2 * RADIUS_KM.earth * 1e6 * k, earthM = AU_KM * 1000 * k, nepM = 30.07 * AU_KM * 1000 * k;
console.log(`basketball Sun: Earth ${earthMm.toFixed(1)} mm at ${earthM.toFixed(1)} m, Neptune at ${nepM.toFixed(0)} m`);
assert.ok(Math.abs(earthMm - 2.2) < 0.05 && Math.abs(earthM - 25.8) < 0.2 && Math.abs(nepM - 776) < 3);
console.log('planets.test OK');

