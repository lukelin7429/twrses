// 第六課的純函式：楔形石的位置、放的順序、拱撐不撐得住、水道的坡度。node test/arch.test.mjs
import assert from 'node:assert/strict';
import { voussoirs, keystoneIndex, placeOrder, placedSet, stands, reason, gradient, ratio } from '../src/arch.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} ≉ ${b}`);

// 楔形石：剛好蓋滿半圓、左右對稱、拱心石在正上方
{
  const R = 4, t = 0.6, n = 13, v = voussoirs(R, t, n);
  assert.equal(v.length, n);
  near(v[0].a0, Math.PI); near(v[n - 1].a1, 0);
  for (let i = 1; i < n; i++) near(v[i].a0, v[i - 1].a1);
  for (let i = 0; i < n; i++) { near(v[i].cx, -v[n - 1 - i].cx); near(v[i].cy, v[n - 1 - i].cy); }
  const k = v.find((b) => b.key);
  assert.equal(k.i, 6); near(k.cx, 0); near(k.cy, R + t / 2);
  assert.ok(v.every((b) => b.cy >= 0));
}
assert.throws(() => keystoneIndex(12), RangeError);
assert.throws(() => keystoneIndex(1), RangeError);

// 放的順序：每一塊剛好一次，兩邊輪流，拱心石最後
{
  const o = placeOrder(13);
  assert.equal(o.length, 13); assert.equal(new Set(o).size, 13);
  assert.equal(o[o.length - 1], keystoneIndex(13));
  assert.deepEqual(o.slice(0, 4), [0, 12, 1, 11]);
  assert.ok(!placedSet(13, 12).has(6)); assert.ok(placedSet(13, 13).has(6));
  assert.equal(placedSet(13, 99).size, 13); assert.equal(placedSet(13, -2).size, 0);
}

// 撐不撐得住：拱架在就撐得住；拿掉拱架要石頭全到位、又夠厚
{
  const base = { n: 13, R: 4, minRatio: 0.11 };
  assert.ok(stands({ ...base, placed: 3, t: 0.1, centering: true }));
  assert.equal(reason({ ...base, placed: 12, t: 0.8, centering: false }), 'missing');
  assert.ok(!stands({ ...base, placed: 12, t: 0.8, centering: false }));
  assert.equal(reason({ ...base, placed: 13, t: 0.3, centering: false }), 'thin');   // 0.3 / 4.15 ≈ 0.072
  assert.ok(stands({ ...base, placed: 13, t: 0.6, centering: false }));              // 0.6 / 4.3 ≈ 0.14
  // 比例用中線半徑：t = 0.44 時 t/R內 = 0.11 剛好，但 t/(R + t/2) ≈ 0.104，撐不住
  near(ratio(0.44, 4), 0.44 / 4.22);
  assert.equal(reason({ ...base, placed: 13, t: 0.44, centering: false }), 'thin');
  assert.ok(stands({ ...base, placed: 13, t: 0.47, centering: false }));             // 0.47 / 4.235 ≈ 0.111
}

// 坡度：降 12 公尺、走 48 公里 → 每公里 25 公分
near(gradient(12, 48), 25);
console.log('arch.test.mjs ok');
