// 第九課的純函式：一件東西的旅程、小亮點的位置、換手的次數、旅程的檢查。node test/silk.test.mjs
import assert from 'node:assert/strict';
import { slerp, goodPath, legLengths, tokenAt, handoffs, checkGood } from '../src/silk.js';
import { angle } from '../src/sphere.js';

const near = (a, b, e = 1e-6) => Math.abs(a - b) < e;
// 大圓插值：兩端點、中點在兩點之間的大圓上
{
  const a = [0, 0], b = [90, 0];
  assert.deepEqual(slerp(a, b, 0).map((x) => +x.toFixed(6)), [0, 0]);
  const m = slerp(a, b, 0.5); assert.ok(near(m[0], 45) && near(m[1], 0));
  const p = [108.94, 34.27], q = [66.97, 39.65], h = slerp(p, q, 0.5);
  assert.ok(near(angle(p, h), angle(h, q), 1e-6));
}
const cities = [
  { key: 'changan', at: [108.94, 34.27], year: -200 },
  { key: 'dunhuang', at: [94.8, 40.04], year: -110 },
  { key: 'samarkand', at: [66.97, 39.65], year: -100 },
  { key: 'baghdad', at: [44.36, 33.31], year: 762 },
];
const silk = { key: 'silk', year: 800, stops: ['changan', 'dunhuang', 'samarkand', 'baghdad'], legs: [{}, {}, {}] };
{
  const path = goodPath(silk, cities);
  assert.equal(path.length, 4); assert.deepEqual(path[0], [108.94, 34.27]);
  const { legs, total } = legLengths(path);
  assert.equal(legs.length, 3); assert.ok(near(total, legs[0] + legs[1] + legs[2]));
  // 長安到撒馬爾罕大約 3,600 公里：弧度 × 6371
  assert.ok(Math.abs((legs[0] + legs[1]) * 6371 - 3600) < 400);
  // 小亮點：起點、終點、每一段的分界
  assert.deepEqual(tokenAt(path, 0).at.map((x) => +x.toFixed(6)), path[0].map((x) => +x.toFixed(6)));
  assert.equal(tokenAt(path, 0).leg, 0);
  const end = tokenAt(path, 1); assert.equal(end.leg, 2); assert.ok(near(end.at[0], 44.36, 1e-6));
  assert.equal(tokenAt(path, 0.5).leg, 1); assert.equal(tokenAt(path, 0.34).leg, 1); assert.equal(tokenAt(path, 0.32).leg, 0);
  assert.equal(handoffs(silk), 2);
}
// 檢查：一切正常；城市還沒上網路；段數不對；站名打錯
assert.equal(checkGood(silk, cities), null);
assert.match(checkGood({ ...silk, year: 700 }, cities), /baghdad joins in 762/);
assert.match(checkGood({ ...silk, legs: [{}, {}] }, cities), /legs 2/);
assert.match(checkGood({ ...silk, stops: ['changan', 'rome'], legs: [{}] }, cities), /unknown stop rome/);
assert.match(checkGood({ ...silk, stops: ['changan'], legs: [] }, cities), /two stops/);
console.log('silk.test.mjs ok');
