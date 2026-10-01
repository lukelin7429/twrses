// 第十三課的天平動：node test/libration.test.mjs（有 assert）
// 對照 Meeus《Astronomical Algorithms》例題 53.a：1992/4/12 0h，光學天平動 l′ = −1.206°、b′ = +4.194°
import assert from 'node:assert/strict';
import { libration, librationExtremes, diskToSeleno, moonPhase, SIDEREAL, SYNODIC } from '../src/libration.js';

const ex = libration(new Date('1992-04-12T00:00:00Z'));
console.log(`Meeus 53.a: l = ${ex.l.toFixed(3)}° (−1.206), b = ${ex.b.toFixed(3)}° (+4.194)`);
assert.ok(Math.abs(ex.l + 1.206) < 0.02 && Math.abs(ex.b - 4.194) < 0.02);
// 範圍：經度約 ±8°、緯度約 ±6.8°（2020–2029 每 6 小時掃一次）
let ml = 0, mb = 0;
for (let d = 0; d < 3653; d += 0.25) { const x = libration(new Date(Date.UTC(2020, 0, 1) + d * 864e5)); ml = Math.max(ml, Math.abs(x.l)); mb = Math.max(mb, Math.abs(x.b)); }
console.log(`2020–2029 extremes: |l| ≤ ${ml.toFixed(2)}°, |b| ≤ ${mb.toFixed(2)}°`);
assert.ok(ml > 7.5 && ml < 8.3 && mb > 6.5 && mb < 7.0);
// 看得到的月面：在月面均勻撒 4000 點，十年內只要有一刻面向地球就算看得到 → 約 59%（課本值；這裡只算光學天平動）
const dirs = [];
for (let d = 0; d < 3653; d += 1) { const x = libration(new Date(Date.UTC(2020, 0, 1) + d * 864e5)), L = x.l * Math.PI / 180, B = x.b * Math.PI / 180; dirs.push([Math.cos(B) * Math.cos(L), Math.cos(B) * Math.sin(L), Math.sin(B)]); }
let ever = 0; const NP = 4000;
for (let k = 0; k < NP; k++) {
  const z = 1 - (2 * k + 1) / NP, r = Math.sqrt(1 - z * z), ph = k * Math.PI * (3 - Math.sqrt(5)), q = [r * Math.cos(ph), r * Math.sin(ph), z];
  if (dirs.some((v) => v[0] * q[0] + v[1] * q[1] + v[2] * q[2] > 0)) ever++;
}
console.log(`${(ever / NP * 100).toFixed(1)}% of the surface faces Earth at some time (textbook: about 59%)`);
assert.ok(ever / NP > 0.57 && ever / NP < 0.6);
// 經度天平動的週期＝近點月（約 27.55 天），緯度天平動＝交點月（約 27.21 天）：看 2026 年 l 由負轉正的間隔
const ups = []; let prev = libration(new Date(Date.UTC(2026, 0, 1))).l;
for (let h = 6; h < 24 * 400; h += 6) { const t = new Date(Date.UTC(2026, 0, 1) + h * 36e5), v = libration(t).l; if (prev < 0 && v >= 0) ups.push(t); prev = v; }
const gaps = ups.slice(1).map((t, k) => (t - ups[k]) / 864e5), avg = gaps.reduce((a, b) => a + b) / gaps.length;
console.log(`longitude libration repeats every ${avg.toFixed(2)} days (anomalistic month 27.55)`);
assert.ok(Math.abs(avg - 27.55) < 0.3);
// 自轉週期＝恆星月 27.32 天，月相週期 29.53 天
assert.ok(Math.abs(SIDEREAL - 27.3217) < 0.001 && Math.abs(SYNODIC - 29.5306) < 0.001);
// 正射投影：圓盤中心＝正對的點；右緣是東經 90°、上緣是北緯 90°
assert.deepEqual(diskToSeleno(0, 0, 3, 2), { lat: 2, lon: 3 });
assert.ok(Math.abs(diskToSeleno(1, 0, 0, 0).lon - 90) < 1e-6 && Math.abs(diskToSeleno(0, 1, 0, 0).lat - 90) < 1e-6 && diskToSeleno(0.8, 0.8, 0, 0) === null);
// 2026/10/1：下弦前的殘月（亮面約 73%），一個月內東緣、西緣各有一天看得最多
const p = moonPhase(new Date('2026-10-01T12:00Z')), e = librationExtremes(new Date('2026-10-01T12:00Z'));
console.log(`2026-10-01: ${(p.illum * 100).toFixed(0)}% lit, ${p.waxing ? 'waxing' : 'waning'}; east limb best ${e.east.t.toISOString().slice(0, 10)} (l = ${e.east.l.toFixed(1)}°)`);
assert.ok(!p.waxing && p.illum > 0.65 && p.illum < 0.8 && e.east.l > 3 && e.west.l < -3);
console.log('libration: all good');
