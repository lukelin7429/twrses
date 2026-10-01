// 第十四課的銀河：node test/galaxy.test.mjs（有 assert）
// 銀道座標對照公認值：銀河中心 RA 266.405°、Dec −28.936°（J2000，17h45m37s −28°56′）；織女星、牛郎星、天津四、參宿四的銀經銀緯
import assert from 'node:assert/strict';
import { eqToGal, galToEq, milkyWayAt, planeConstellation } from '../src/galaxy.js';

const gc = galToEq(0, 0);
console.log(`Galactic center: RA ${gc.ra.toFixed(3)}°, Dec ${gc.dec.toFixed(3)}°`);
assert.ok(Math.abs(gc.ra - 266.405) < 0.01 && Math.abs(gc.dec + 28.936) < 0.01);
const KNOWN = [['Vega', 279.2347, 38.7837, 67.45, 19.24], ['Altair', 297.6958, 8.8683, 47.74, -8.91], ['Deneb', 310.358, 45.280, 84.28, 2.00], ['Betelgeuse', 88.793, 7.407, 199.79, -8.96]];
for (const [n, ra, dec, l, b] of KNOWN) {
  const g = eqToGal(ra, dec);
  console.log(`${n.padEnd(11)} l ${g.l.toFixed(2)}°, b ${g.b.toFixed(2)}°   (expected ${l}, ${b})`);
  assert.ok(Math.abs(g.l - l) < 0.05 && Math.abs(g.b - b) < 0.05, n);
}
// 來回換算一致
for (let k = 0; k < 50; k++) { const ra = (k * 73) % 360, dec = -80 + (k * 37) % 160, g = eqToGal(ra, dec), q = galToEq(g.l, g.b); assert.ok(Math.abs(((q.ra - ra + 540) % 360) - 180) < 1e-6 && Math.abs(q.dec - dec) < 1e-6); }
// 牛郎、織女分在銀河兩岸：一個在銀河中線南邊、一個在北邊
assert.ok(eqToGal(297.6958, 8.8683).b < 0 && eqToGal(279.2347, 38.7837).b > 0);
// 彰化 2026/10/1 晚上九點：銀心在西南方低空，光帶從人馬座經天鵝座到仙后座，最高點接近天頂附近（高 60° 以上）
const site = { lat: 24.08, lon: 120.54 };
const w = milkyWayAt(new Date(Date.UTC(2026, 9, 1, 13)), site);
console.log(`Changhua, Oct 1 2026, 9 p.m.: center ${w.gcAlt.toFixed(0)}° up (az ${w.gcAz.toFixed(0)}°); band through ${w.cons.map((c) => c.en).join(', ')}`);
assert.ok(w.gcAlt > 0 && w.gcAlt < 25 && w.gcAz > 200 && w.gcAz < 250 && w.top.alt > 60);
assert.ok(['Sagittarius', 'Aquila', 'Cygnus', 'Cassiopeia'].every((n) => w.cons.some((c) => c.en === n)));
// 晚上九點看得到銀心（高於 15°）的月份：6–9 月（夏季銀河）
const months = [];
for (let m = 0; m < 12; m++) if (milkyWayAt(new Date(Date.UTC(2026, m, 15, 13)), site).gcAlt > 15) months.push(m + 1);
console.log(`Months when the center is up at 9 p.m.: ${months.join(', ')}`);
assert.deepEqual(months, [6, 7, 8, 9]);
assert.equal(planeConstellation(80).en, 'Cygnus'); assert.equal(planeConstellation(199.8).en, 'Orion and Monoceros'); assert.equal(planeConstellation(359).en, 'Sagittarius');
console.log('galaxy: all good');
