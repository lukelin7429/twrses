import assert from 'node:assert/strict';
import {
  AREAS_KM2, DEG, EARTH_RADIUS_KM, MERC_MAX, RAD, areaRatio, distortion, extent, forward, goreOf, greatCircle, inverseMercator,
  lonLatToVec3, mercatorScale, movePoint, moveRing, planarArea, ringArea, ringCenter, smallCircle, unroll, vec3ToLonLat,
} from '../src/geo.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const nearPt = (p, q, eps, msg) => { near(p[0], q[0], eps, msg + ' x'); near(p[1], q[1], eps, msg + ' y'); };

// 經緯度 ↔ 球面座標：北極在 +y、經度 0 在 +z、東經 90 在 +x（從 +z 看，東邊在右）
nearPt(lonLatToVec3(0, 0), [0, 0], 1e-12, 'origin'); near(lonLatToVec3(0, 0)[2], 1, 1e-12, 'lon 0 faces +z');
near(lonLatToVec3(0, 90)[1], 1, 1e-12, 'north pole is +y');
near(lonLatToVec3(90, 0)[0], 1, 1e-12, 'east 90 is +x');
assert.ok(lonLatToVec3(121, 23.5)[0] > 0 && lonLatToVec3(121, 23.5)[1] > 0, 'Taiwan is east and north');
for (const [lon, lat] of [[121, 23.5], [-40, 72], [0, 0], [179, -45], [-179.5, 10], [30, -89]]) {
  nearPt(vec3ToLonLat(lonLatToVec3(lon, lat)), [lon, lat], 1e-9, `round trip ${lon},${lat}`);
}

// 等距圓柱：x = 經度、y = 緯度（弧度）
nearPt(forward('equirect', 0, 0), [0, 0], 1e-12, 'equirect origin');
nearPt(forward('equirect', 180, 90), [Math.PI, Math.PI / 2], 1e-12, 'equirect corner');
nearPt(forward('equirect', 121, 23.5), [2.111848, 0.410152], 1e-6, 'equirect Taiwan');

// 麥卡托：已知點（Snyder 的公式 y = ln tan(π/4 + φ/2)）
nearPt(forward('mercator', 0, 0), [0, 0], 1e-12, 'mercator origin');
nearPt(forward('mercator', 90, 45), [Math.PI / 2, 0.8813736], 1e-6, 'mercator 45N');
nearPt(forward('mercator', -75, 35), [-1.3089969, 0.6528366], 1e-6, 'mercator Snyder example (75W, 35N)');
near(forward('mercator', 0, 60)[1], 1.3169579, 1e-6, 'mercator 60N');
near(forward('mercator', 0, MERC_MAX)[1], Math.PI, 1e-9, 'mercator is square at 85.0511');
near(MERC_MAX, 85.0511288, 1e-6, 'web mercator cutoff');
near(forward('mercator', 0, 90)[1], Math.PI, 1e-9, 'mercator clamps the pole');
near(forward('mercator', 0, -30)[1], -forward('mercator', 0, 30)[1], 1e-12, 'mercator is symmetric');

for (const [lon, lat] of [[121, 23.5], [-40, 72], [0, 0], [-179, -60]]) nearPt(inverseMercator(...forward('mercator', lon, lat)), [lon, lat], 1e-9, 'mercator inverse');

// 麥卡托的放大倍率：赤道 1、緯度 60 度剛好 2、面積 4 倍
near(mercatorScale(0), 1, 1e-12, 'scale at equator');
near(mercatorScale(60), 2, 1e-12, 'scale at 60');
near(mercatorScale(-60), 2, 1e-12, 'scale at 60 S');
near(mercatorScale(45), Math.SQRT2, 1e-12, 'scale at 45');
near(mercatorScale(72), 3.236068, 1e-6, 'scale at 72 (Greenland)');
{
  const d = distortion('mercator', 30, 60);
  near(d.h, 2, 1e-5, 'mercator h at 60'); near(d.k, 2, 1e-5, 'mercator k at 60'); near(d.area, 4, 1e-4, 'mercator area at 60');
  near(d.omega, 0, 1e-2, 'mercator keeps angles');
  near(d.a / d.b, 1, 1e-4, 'a circle stays a circle on Mercator');
}
for (const lat of [0, 20, 40, 60, 75, 80]) {
  const d = distortion('mercator', -100, lat);
  near(d.k, mercatorScale(lat), 1e-4, `numeric k = sec at ${lat}`);
  near(d.h, d.k, 1e-4, `conformal at ${lat}`);
}

// 等積投影保面積：任何地方面積倍率都是 1
for (const name of ['gallpeters', 'lambert', 'sinusoidal', 'mollweide', 'gores']) {
  for (const [lon, lat] of [[0, 0], [20, 30], [-100, 60], [150, -45], [-170, 80], [77, -72]]) {
    near(distortion(name, lon, lat).area, 1, 2e-4, `${name} is equal-area at ${lon},${lat}`);
  }
}
// 等積圓柱在標準緯線上沒有變形：高爾－彼得斯 45 度、蘭伯特在赤道
{ const d = distortion('gallpeters', 0, 45); near(d.h, 1, 1e-5, 'GP h at 45'); near(d.k, 1, 1e-5, 'GP k at 45'); }
{ const d = distortion('gallpeters', 0, 0); near(d.h, Math.SQRT2, 1e-5, 'GP stretches N–S at the equator'); near(d.k, Math.SQRT1_2, 1e-5, 'GP squeezes E–W at the equator'); }
{ const d = distortion('gallpeters', 0, 60); near(d.k, Math.SQRT2, 1e-5, 'GP k at 60'); near(d.h, Math.SQRT1_2, 1e-5, 'GP h at 60'); }
{ const d = distortion('lambert', 0, 0); near(d.h, 1, 1e-5, 'Lambert h at 0'); near(d.k, 1, 1e-5, 'Lambert k at 0'); }
// 等距圓柱：南北向距離正確（h = 1），東西向放大 1/cos，面積也放大 1/cos
{ const d = distortion('equirect', 0, 60); near(d.h, 1, 1e-6, 'equirect h'); near(d.k, 2, 1e-5, 'equirect k at 60'); near(d.area, 2, 1e-5, 'equirect area at 60'); }
// 用整張圖檢查等積：把地球切成小格，投影後的面積總和 = 4π
for (const name of ['gallpeters', 'lambert', 'mollweide', 'sinusoidal']) {
  let sum = 0;
  const st = 5;
  for (let lat = -90; lat < 90; lat += st) for (let lon = -180; lon < 180; lon += st) {
    const cell = [];
    const n = 8;
    for (let i = 0; i <= n; i++) cell.push(forward(name, lon + st * i / n, lat));
    for (let i = 0; i <= n; i++) cell.push(forward(name, lon + st, lat + st * i / n));
    for (let i = 0; i <= n; i++) cell.push(forward(name, lon + st - st * i / n, lat + st));
    for (let i = 0; i <= n; i++) cell.push(forward(name, lon, lat + st - st * i / n));
    sum += planarArea(cell);
  }
  near(sum, 4 * Math.PI, 0.02, `${name} whole-map area`);
}
// 地圖外框
near(extent('mollweide').w * extent('mollweide').h * Math.PI / 4, 4 * Math.PI, 1e-9, 'Mollweide ellipse area = sphere area');
near(extent('gallpeters').w * extent('gallpeters').h, 4 * Math.PI, 1e-9, 'Gall–Peters rectangle area = sphere area');
near(extent('lambert').w * extent('lambert').h, 4 * Math.PI, 1e-9, 'Lambert rectangle area = sphere area');
// 莫爾威：已知點
nearPt(forward('mollweide', 0, 0), [0, 0], 1e-12, 'mollweide origin');
nearPt(forward('mollweide', 180, 0), [2 * Math.SQRT2, 0], 1e-9, 'mollweide edge');
nearPt(forward('mollweide', 0, 90), [0, Math.SQRT2], 1e-9, 'mollweide pole');
near(distortion('mollweide', 0, 40.7333).k, 1, 1e-3, 'Mollweide is true to scale along 40°44′ (Snyder)');

// 橘子皮：每一瓣中央經線是直的，瓣與瓣在高緯度裂開
assert.deepEqual(goreOf(-180), { g: 0, lon0: -165, w: 30 });
assert.equal(goreOf(180).g, 11);
assert.equal(goreOf(121).g, 10); assert.equal(goreOf(121).lon0, 135);
nearPt(forward('gores', 15, 60), [15 * RAD, 60 * RAD], 1e-12, 'gore center line is straight');
{
  const left = forward('gores', 30, 60, { gore: 6 }), right = forward('gores', 30, 60, { gore: 7 });
  assert.ok(right[0] - left[0] > 0.25, 'gores split apart at 60N');
  const l0 = forward('gores', 30, 0, { gore: 6 }), r0 = forward('gores', 30, 0, { gore: 7 });
  near(l0[0], r0[0], 1e-12, 'gores touch at the equator');
}
// 極方位：北極在中心，離中心的距離 = 到極點的角距離
nearPt(forward('polar_n', 0, 90), [0, 0], 1e-12, 'pole at center');
near(Math.hypot(...forward('polar_n', 77, 30)), 60 * RAD, 1e-12, 'azimuthal equidistant radius');
nearPt(forward('polar_n', 90, 0), [Math.PI / 2, 0], 1e-12, '90E points right when 0 points down');
// 正射：背面看不到
assert.equal(forward('ortho', 180, 0), null);
nearPt(forward('ortho', 90, 0), [1, 0], 1e-12, 'ortho limb');

// 大圓距離
near(greatCircle(0, 0, 90, 0), EARTH_RADIUS_KM * Math.PI / 2, 1e-6, 'quarter of the equator');
near(greatCircle(0, 0, 0, 90), 10007.557, 0.01, 'equator to pole');
near(greatCircle(121.5654, 25.0330, -73.9857, 40.7484), 12550, 60, 'Taipei to New York, about 12,550 km');
near(greatCircle(10, 20, 10, 20), 0, 1e-9, 'zero distance');
near(greatCircle(0, 0, 180, 0), EARTH_RADIUS_KM * Math.PI, 1e-6, 'half way around');
near(greatCircle(0, 0, 0, 1, 1), RAD, 1e-12, 'one degree in radians');

// 連續攤平：s = 1 是球，s = 0 是等距圓柱
for (const [lon, lat] of [[0, 0], [121, 23.5], [-150, -60], [180, 89]]) {
  const a = unroll(lon, lat, 1), b = lonLatToVec3(lon, lat);
  near(a[0], b[0], 1e-12, 'unroll s=1 x'); near(a[1], b[1], 1e-12, 'unroll s=1 y'); near(a[2], b[2], 1e-12, 'unroll s=1 z');
  const f = unroll(lon, lat, 0), e = forward('equirect', lon, lat);
  near(f[0], e[0], 1e-12, 'unroll s=0 x'); near(f[1], e[1], 1e-12, 'unroll s=0 y'); near(f[2], 0, 1e-12, 'flat map at z=0');
  const m = unroll(lon, lat, 1e-3);
  near(m[0], e[0], 1e-3, 'unroll is continuous near 0'); near(m[2], 0, 1e-2, 'unroll z continuous near 0');
}
near(unroll(0, 0, 0.5)[2], 0.5, 1e-12, 'the front point slides back as the globe opens');

// 在球面上搬動：形狀與面積不變
nearPt(movePoint([-40, 72], [-40, 72], [20, 0]), [20, 0], 1e-9, 'center goes to the target');
{
  const ring = smallCircle(-40, 72, 8, 96);
  const moved = moveRing(ring, [-40, 72], [25, 0]);
  near(ringArea(moved), ringArea(ring), 1e-9, 'area unchanged by moving');
  near(greatCircle(...moved[0], ...moved[30], 1), greatCircle(...ring[0], ...ring[30], 1), 1e-9, 'distances unchanged by moving');
  nearPt(ringCenter(moved), [25, 0], 1e-6, 'ring center follows');
  // 麥卡托把這個圓在北緯 72 度畫得比在赤道大 1/cos² 倍左右
  const big = planarArea(ring.map(([a, b]) => forward('mercator', a, b))), small = planarArea(moved.map(([a, b]) => forward('mercator', a, b)));
  assert.ok(big / small > 9 && big / small < 13, `Mercator inflation at 72N is about ${mercatorScale(72) ** 2}, got ${big / small}`);
}
// 球面面積：一個半球、一個小圓
near(ringArea([[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0], [180, 89.999999], [-180, 89.999999]]), 2 * Math.PI, 1e-6, 'northern hemisphere');
near(ringArea(smallCircle(10, 20, 5, 720)), 2 * Math.PI * (1 - Math.cos(5 * RAD)), 1e-5, 'spherical cap');

// 比大小：數字照 data/geography.json 的出處；比值在這裡算
assert.equal(AREAS_KM2.greenland, 2166086);
assert.equal(AREAS_KM2.africa, 30365000);
near(areaRatio('africa', 'greenland'), 14.018, 1e-3, 'Africa is about 14 times the size of Greenland');
assert.equal(Math.round(areaRatio('africa', 'greenland')), 14);
assert.equal(AREAS_KM2.australia, 7656127);
near(areaRatio('australia', 'greenland'), 3.535, 1e-3, 'mainland Australia is about 3.5 times the size of Greenland');
near(areaRatio('antarctica', 'greenland'), 6.556, 1e-3, 'Antarctica is about 6.6 times the size of Greenland');
near(DEG * RAD, 1, 1e-15, 'deg/rad');
console.log('geo.test ok');
