import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PLACES, SEASONS, TILT, beam, noonAltitude, share, spread, zoneOf } from '../src/sunlight.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
// 正午太陽高度角
assert.equal(noonAltitude(0, 0), 90);
assert.equal(noonAltitude(TILT, TILT), 90);
near(noonAltitude(25, 0), 65, 1e-9, 'Taipei in March');
near(noonAltitude(25, TILT), 88.44, 1e-9, 'Taipei in June');
near(noonAltitude(25, -TILT), 41.56, 1e-9, 'Taipei in December');
near(noonAltitude(90, 0), 0, 1e-9, 'pole at the equinox');
assert.ok(noonAltitude(80, -TILT) < 0, 'polar night');
// 攤開的倍數與每平方公尺的份量
near(spread(90), 1, 1e-12); near(spread(30), 2, 1e-12); near(share(30), 0.5, 1e-12);
assert.equal(spread(0), Infinity); assert.equal(share(-5), 0);
// 五帶
assert.equal(zoneOf(0).zone, 'torrid'); assert.equal(zoneOf(23).zone, 'torrid'); assert.equal(zoneOf(25).zone, 'temperate');
assert.equal(zoneOf(-70).zone, 'frigid'); assert.equal(zoneOf(-70).hemi, 'S'); assert.equal(zoneOf(66.6).zone, 'frigid');
// 3D 的光束：光斑面積 ÷ 截面積 ≈ 1 / sin(高度角)（光束很細時）
for (const [lat, decl] of [[0, 0], [25, 0], [45, 0], [60, 0], [23.5, TILT], [-30, -TILT], [70, TILT]]) {
  const b = beam(121, decl, lat, 0.01);
  near(b.ratio, spread(noonAltitude(lat, decl)), 0.02 * spread(noonAltitude(lat, decl)), `beam at ${lat} (decl ${decl})`);
  near(b.lit, 1, 1e-9, 'whole beam lands');
  // 光斑的中心在 (121, lat) 附近
  const lats = b.ring.map((p) => p[1]); near((Math.max(...lats) + Math.min(...lats)) / 2, lat, 0.5, 'centered');
}
// 粗一點的光束（頁面用的大小）：越斜光斑越大
const r = [0, 30, 60].map((lat) => beam(121, 0, lat, 0.12).ratio);
assert.ok(r[0] < r[1] && r[1] < r[2], 'more slanted, bigger patch');
assert.equal(beam(121, 0, 0, 0.12).rays.length, 9);

// 頁面資料：小遊戲答案由規則推出來
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[1].lessons.find((l) => l.slug === 'equator-and-poles');
if (lesson) {
  for (const q of lesson.sunq.questions) {
    const d = SEASONS[q.season], A = noonAltitude(PLACES[q.a].lat, d), B = noonAltitude(PLACES[q.b].lat, d);
    const want = Math.abs(A - B) < 1 ? 'same' : A > B ? 'a' : 'b';
    assert.equal(q.answer, want, `${q.a} vs ${q.b} in ${q.season}`);
  }
  assert.equal(lesson.map_english.items.length, 8);
}
console.log('sunlight.test ok', r.map((x) => x.toFixed(2)));
