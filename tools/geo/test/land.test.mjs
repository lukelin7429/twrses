import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decodeLand, decodeRing } from '../src/land.js';
import { AREAS_KM2, EARTH_RADIUS_KM, ringArea, ringCenter } from '../src/geo.js';

const doc = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = decodeLand(doc);
const inside = ([x, y], ring) => {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[i], [x2, y2] = ring[j];
    if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c;
  }
  return c;
};
const isLand = (pt) => land.polys.some((p) => inside(pt, p[0]) && !p.slice(1).some((h) => inside(pt, h)));

assert.match(doc.source, /Natural Earth/); assert.equal(doc.version, '5.1.2'); assert.match(doc.license, /Public domain/);
assert.deepEqual(decodeRing('CCDD', 0.05).map(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]), [[0.05, 0.05], [-0.05, -0.05]]);   // C = +1、D = −2（zigzag）
assert.ok(land.polys.length > 300, 'polygons');
for (const p of land.polys) for (const r of p) {
  assert.ok(r.length >= 3, 'ring has at least 3 points');
  for (const [x, y] of r) assert.ok(x >= -180.001 && x <= 180.001 && y >= -90.001 && y <= 90.001, `in range ${x},${y}`);
}

// 東西南北沒有顛倒：已知是陸地／海洋的點
for (const [name, pt] of [['Taiwan', [121, 23.7]], ['Greenland', [-40, 72]], ['Africa', [20, 5]], ['Australia', [134, -25]],
  ['Antarctica', [0, -80]], ['South America', [-60, -10]], ['North America', [-100, 45]], ['Honshu', [138.5, 36]],
  ['Madagascar', [46.7, -19.5]], ['Iceland', [-18.5, 65]], ['Hainan', [109.7, 19.2]], ['New Zealand', [170.5, -44.5]]]) {
  assert.ok(isLand(pt), `${name} should be land`);
}
for (const [name, pt] of [['mid Pacific', [-150, 0]], ['mid Atlantic', [-30, 0]], ['Indian Ocean', [80, -20]],
  ['Taiwan Strait', [119.3, 24.2]], ['east of Taiwan', [123.5, 23.5]], ['Caspian Sea', [51, 42]], ['Arctic Ocean', [0, 88]],
  ['Mediterranean', [18, 35]], ['Gulf of Mexico', [-90, 25]]]) {
  assert.ok(!isLand(pt), `${name} should be sea`);
}

// 台灣：位置與大小
{
  const tw = land.pieces.taiwan;
  const [lon, lat] = ringCenter(tw);
  assert.ok(lon > 120.5 && lon < 121.5 && lat > 23 && lat < 24.3, `Taiwan center ${lon},${lat}`);
  const xs = tw.map((p) => p[0]), ys = tw.map((p) => p[1]);
  assert.ok(Math.min(...xs) > 119.9 && Math.max(...xs) < 122.2 && Math.min(...ys) > 21.7 && Math.max(...ys) < 25.5, 'Taiwan bounding box');
  const km2 = ringArea(tw, EARTH_RADIUS_KM);
  assert.ok(km2 > 33000 && km2 < 38000, `Taiwan main island is about 36,000 km², got ${km2}`);
}

// 三塊拿來比大小的陸塊：簡化後的外形算出來的面積，和引用的數字差不到幾個百分點
const pct = (k) => ringArea(land.pieces[k], EARTH_RADIUS_KM) / AREAS_KM2[k];
assert.ok(Math.abs(pct('greenland') - 1) < 0.03, `Greenland outline area ${pct('greenland')}`);
assert.ok(Math.abs(pct('australia') - 1) < 0.03, `Australia outline area ${pct('australia')}`);   // 引用的是澳洲本土的數字
assert.ok(pct('africa') > 0.94 && pct('africa') < 1.0, `Africa mainland outline area ${pct('africa')}`);   // 引用的數字含馬達加斯加等島嶼
// 非洲那一塊切得對：有開普敦、沒有阿拉伯半島與歐洲
assert.ok(inside([20, -30], land.pieces.africa) && inside([-5, 12], land.pieces.africa) && inside([45, 8], land.pieces.africa));
assert.ok(!inside([45, 24], land.pieces.africa) && !inside([10, 48], land.pieces.africa) && !inside([35.5, 31], land.pieces.africa));
const ratio = ringArea(land.pieces.africa) / ringArea(land.pieces.greenland);
assert.ok(ratio > 13 && ratio < 14.5, `Africa mainland / Greenland from the outlines: ${ratio}`);
console.log('land.test ok', { polys: land.polys.length, greenland: pct('greenland').toFixed(3), australia: pct('australia').toFixed(3), africa: pct('africa').toFixed(3), ratio: ratio.toFixed(2) });
