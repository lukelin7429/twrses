// 第七課的純函式：錢的外形。node test/coins.test.mjs
import assert from 'node:assert/strict';
import { outline, area, inside, bbox, KINDS } from '../src/coins.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) <= e, `${a} ≉ ${b}`);
const SIZES = { spade: { h: 4.6, w: 2.8 }, knife: { len: 14, w: 1.8 }, round: { d: 4, hole: 0.8 }, square: { d: 3, hole: 0.9 }, antnose: { h: 1.9, w: 1.2 } };

for (const k of KINDS) {
  const o = outline(k, SIZES[k]);
  assert.ok(o.outer.length >= 4, k);
  assert.ok(area(o.outer) > 0, `${k} area`);
  for (const h of o.holes) {
    assert.ok(area(h) < area(o.outer), `${k} hole smaller`);
    for (const p of h) assert.ok(inside(p, o.outer), `${k} hole inside`);
  }
  const [x0, y0, x1, y1] = bbox(o.outer);
  near((x0 + x1) / 2, 0, 0.6); near((y0 + y1) / 2, 0, 0.6);
}
// 大小：圓錢的直徑、布幣的高與寬、刀幣的長度都照給的尺寸
{
  const [x0, , x1] = bbox(outline('square', SIZES.square).outer); near(x1 - x0, 3, 0.01);
  const [sx0, sy0, sx1, sy1] = bbox(outline('spade', SIZES.spade).outer); near(sy1 - sy0, 4.6, 1e-9); near(sx1 - sx0, 2.8, 1e-9);
  const [kx0, , kx1] = bbox(outline('knife', SIZES.knife).outer); near(kx1 - kx0, 14, 0.3);
  const [ax0, ay0, ax1, ay1] = bbox(outline('antnose', SIZES.antnose).outer); near(ay1 - ay0, 1.9, 0.01); near(ax1 - ax0, 1.2, 0.01);
}
// 方孔是方的、圓孔是圓的
{
  const sq = outline('square', SIZES.square).holes[0]; assert.equal(sq.length, 4); near(area(sq), 0.81, 1e-9);
  const rd = outline('round', SIZES.round).holes[0]; near(area(rd), Math.PI * 0.16, 0.02);
}
// 圓錢中間是空的：孔的中心不在「錢」上（在外圈裡，也在孔裡）
assert.ok(inside([0, 0], outline('square', SIZES.square).holes[0]));
assert.ok(!inside([0, 0], outline('antnose', SIZES.antnose).outer) === false);
assert.throws(() => outline('shell', {}), RangeError);
console.log('coins.test.mjs ok');
