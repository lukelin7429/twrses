// 第八課的日晷：node test/sundial.test.mjs（有 assert）
import assert from 'node:assert/strict';
import { sunEquatorial, dayInfo, sunAltAz } from '../src/ephem.js';

const CH = { lat: 24.08, lon: 120.54, tz: 8 };
const LON_MIN = (CH.lon - 120) * 4;                 // 彰化在 120°E 以東，日晷比時鐘快約 2.16 分
const eot = (y, m, d) => sunEquatorial(new Date(Date.UTC(y, m - 1, d, 4))).eotMin;
// 1. 均時差的極值（公認值：11/3 約 +16.4 分、2/11 約 −14.2 分、5/14 約 +3.7、7/26 約 −6.5）
const year = [];
for (let k = 0; k < 365; k++) { const d = new Date(Date.UTC(2026, 0, 1 + k, 4)); year.push([d, sunEquatorial(d).eotMin]); }
const mx = year.reduce((a, b) => (b[1] > a[1] ? b : a)), mn = year.reduce((a, b) => (b[1] < a[1] ? b : a));
const day = (d) => d.toISOString().slice(5, 10);
console.log(`EoT max ${mx[1].toFixed(2)} min on ${day(mx[0])}, min ${mn[1].toFixed(2)} min on ${day(mn[0])}`);
assert.ok(Math.abs(mx[1] - 16.4) < 0.3 && ['11-02', '11-03', '11-04'].includes(day(mx[0])));
assert.ok(Math.abs(mn[1] + 14.2) < 0.3 && ['02-10', '02-11', '02-12'].includes(day(mn[0])));
for (const [m, d, want] of [[5, 14, 3.7], [7, 26, -6.5]]) assert.ok(Math.abs(eot(2026, m, d) - want) < 0.4, `EoT ${m}/${d}`);
// 2. 彰化：日晷減時鐘＝均時差＋經度修正；11 月初快約 18.6 分、2 月中慢約 12 分
console.log(`Changhua sundial − clock: Nov 3 ${(eot(2026, 11, 3) + LON_MIN).toFixed(1)} min, Feb 11 ${(eot(2026, 2, 11) + LON_MIN).toFixed(1)} min`);
// 3. 彰化的太陽正午（時鐘時間）＝ 12:00 −（日晷減時鐘）
for (const [m, d] of [[11, 3], [2, 11], [10, 1]]) {
  const n = dayInfo(new Date(Date.UTC(2026, m - 1, d, 4)), CH).noon, want = 12 - (eot(2026, m, d) + LON_MIN) / 60;
  console.log(`solar noon ${m}/${d}: ${Math.floor(n)}:${String(Math.round((n % 1) * 60)).padStart(2, '0')}`);
  assert.ok(Math.abs(n - want) * 60 < 0.5);
  // 那一刻太陽正在正南方（方位 180°）
  const t = new Date(Date.UTC(2026, m - 1, d, 0) + (n - 8) * 3600000);
  assert.ok(Math.abs(sunAltAz(t, CH).az - 180) < 0.3, 'Sun due south at solar noon');
}
// 4. 正午影長：夏至彰化幾乎沒有影子（太陽高約 89.4°），冬至影長約竿高的 1.09 倍
const noonAlt = (m, d) => dayInfo(new Date(Date.UTC(2026, m - 1, d, 4)), CH).noonAlt;
const jun = noonAlt(6, 21), dec = noonAlt(12, 22);
console.log(`noon altitude: Jun 21 ${jun.toFixed(1)}°, Dec 22 ${dec.toFixed(1)}° → shadow ${(1 / Math.tan(dec * Math.PI / 180)).toFixed(2)} × stick`);
assert.ok(jun > 89 && Math.abs(1 / Math.tan(dec * Math.PI / 180) - 1.09) < 0.03);
// 5. 高雄（22.63°N，北回歸線以南）：6 月中正午太陽在頭頂北邊，影子朝南
const ks = { lat: 22.63, lon: 120.3, tz: 8 };
assert.ok(sunEquatorial(new Date(Date.UTC(2026, 5, 21, 4))).dec > ks.lat);
console.log('sundial.test OK');
