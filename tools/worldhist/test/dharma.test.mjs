// 第八課的純函式：西元年和距今的換算、地方到了沒、路線的年代。node test/dharma.test.mjs
import assert from 'node:assert/strict';
import { agoOf, fmtYear, siteState, reached, toRoute, checkRoute } from '../src/dharma.js';
import { routePoints } from '../src/spread.js';
import { frontAt } from '../src/sphere.js';
import { matchOptions } from '../src/dharma.js';

assert.equal(agoOf(-250), 2250); assert.equal(agoOf(105), 1895);
assert.deepEqual(fmtYear(-250), { en: '250 BCE', zh: '西元前 250 年' });
assert.deepEqual(fmtYear(65), { en: '65 CE', zh: '西元 65 年' });

const sites = [{ key: 'a', year: -400 }, { key: 'b', year: -250 }, { key: 'c', year: 65 }];
assert.equal(siteState(sites[1], -251), 'not'); assert.equal(siteState(sites[1], -250), 'yes');
assert.deepEqual(reached(sites, 0).map((s) => s.key), ['a', 'b']);

// 路線：年代換成距今後，前端隨時間往前走；還沒出發時沒有前端
{
  const r = { key: 'north', pts: [[83, 25, -250, 'b'], [72, 34], [94, 40, 0], [112, 34.7, 65, 'c']] };
  assert.equal(checkRoute(r, sites), null);
  const t = routePoints(toRoute(r), 1);
  assert.equal(frontAt(t, agoOf(-300)), null);
  const mid = frontAt(t, agoOf(20)), end = frontAt(t, agoOf(200));
  assert.ok(mid && !mid.done); assert.ok(end && end.done);
  assert.equal(checkRoute({ pts: [[0, 0, 10], [1, 1, 5]] }), 'year goes back at waypoint 1');
  assert.equal(checkRoute({ pts: [[0, 0, -250, 'b'], [1, 1, 70, 'c']] }, sites), 'waypoint c year 70 ≠ site 65');
  assert.equal(checkRoute({ pts: [[0, 0], [1, 1, 5]] }), 'first and last waypoint need a year');
  const sea = toRoute({ pts: [[80, 8, -250], [81, 7, -240, 'sea']] });
  assert.deepEqual(sea.pts[1], [81, 7, 2240, 'sea']);
}
// 「同一個詞，三種語言」的選項：四個、不重複、一定包含正解、每次一樣
for (let i = 0; i < 9; i++) {
  const o = matchOptions(9, i);
  assert.equal(o.length, 4); assert.equal(new Set(o).size, 4); assert.ok(o.includes(i));
  assert.ok(o.every((j) => j >= 0 && j < 9)); assert.deepEqual(matchOptions(9, i), o);
}
assert.equal(matchOptions(3, 0).length, 3);
console.log('dharma.test.mjs ok');
