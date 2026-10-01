// 第十五課的月亮大小：node test/moonsize.test.mjs（有 assert）
// 2026 年的超級月亮：1/3、11/24、12/24（公開值：362,312／360,768／356,740 km）；微型月亮 5/31
import assert from 'node:assert/strict';
import { fullMoons, rankFullMoons, moonNight, topoDistance, angularDiameter, geoDistance, R_EARTH } from '../src/moonsize.js';

const site = { lat: 24.08, lon: 120.54 };
const f = rankFullMoons(fullMoons(new Date('2026-01-01T00:00Z'), 13));
const sup = f.filter((x) => x.super).map((x) => x.t.toISOString().slice(0, 10)), micro = f.find((x) => x.micro);
console.log(`2026 supermoons: ${sup.join(', ')}; micromoon: ${micro.t.toISOString().slice(0, 10)}`);
assert.deepEqual(sup, ['2026-01-03', '2026-11-24', '2026-12-24']);
assert.equal(micro.t.toISOString().slice(0, 10), '2026-05-31');
for (const [d, km] of [['2026-01-03', 362312], ['2026-11-24', 360768], ['2026-12-24', 356740]]) {
  const x = f.find((y) => y.t.toISOString().startsWith(d));
  console.log(`${d}: ${x.km.toFixed(0)} km (published ${km})`);
  assert.ok(Math.abs(x.km - km) < 200);
}
// 超級月亮比微型月亮寬約 14%
const ratio = Math.max(...f.map((x) => x.size)) / Math.min(...f.map((x) => x.size));
console.log(`biggest / smallest full Moon: ${((ratio - 1) * 100).toFixed(1)}% wider`);
assert.ok(ratio > 1.12 && ratio < 1.16);
// 月亮的角直徑約半度（29.3′–34.1′ 之間）
for (const x of f) assert.ok(x.size > 29.3 && x.size < 34.1);
// 地平線上的月亮離你比較遠：剛升起時距離約等於地心距離，在頭頂時少了將近一個地球半徑
const n = moonNight(new Date('2026-10-01T04:00Z'), site);
const tw = (d) => new Date(d.getTime() + 8 * 3600000).toISOString().slice(11, 16);
console.log(`Changhua, Oct 1–2 2026: moonrise ${tw(n.rise)} (az ${n.riseAz.toFixed(0)}°), highest ${tw(n.top)} at ${n.topAlt.toFixed(0)}°; ${n.riseSize.toFixed(2)}′ → ${n.topSize.toFixed(2)}′ (+${((n.topSize / n.riseSize - 1) * 100).toFixed(1)}%)`);
assert.ok(n.topSize > n.riseSize && n.topSize / n.riseSize - 1 > 0.01 && n.topSize / n.riseSize - 1 < 0.025);
assert.ok(Math.abs(n.riseKm - Math.sqrt(geoDistance(n.rise) ** 2 + R_EARTH ** 2)) < 200);   // 升起時（高度≈0）距離≈√(d²+R²)
// 月出在晚上，從東方偏北升起（月亮在雙子座附近，赤緯偏北）
const rh = +tw(n.rise).slice(0, 2);
assert.ok(rh >= 20 && rh <= 22 && n.riseAz > 50 && n.riseAz < 80);
// 一致性：頭頂時的距離＝地心距離 − 地球半徑
assert.ok(Math.abs(angularDiameter(384400) - 31.08) < 0.05);   // 平均距離時約 31′
assert.ok(topoDistance(n.top, site) < geoDistance(n.top) - R_EARTH * 0.95);
console.log('moonsize: all good');
