// 第二課「一個村子的一年」的純函式。node test/farm.test.mjs
import assert from 'node:assert/strict';
import { season, field, granary, larder, blend, camp, part, SEASONS } from '../src/farm.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} ≉ ${b}`);
assert.deepEqual(SEASONS, ['spring', 'summer', 'autumn', 'winter']);
assert.equal(season(0).i, 0); assert.equal(season(2.99).i, 0); assert.equal(season(3).i, 1);
assert.equal(season(6).i, 2); assert.equal(season(9).i, 3); assert.equal(season(12).i, 0); assert.equal(season(-1).i, 3);
near(season(4.5).k, 0.5);
assert.deepEqual(part(0), { season: 0, third: 0 }); assert.deepEqual(part(5.9), { season: 1, third: 2 });

// 田：春天播種，夏天長高，秋天變黃、收割，冬天是空的
assert.equal(field(0).h, 0); assert.equal(field(0).sown, 0); near(field(1).sown, 1);
assert.ok(field(3).h > 0.1 && field(3).h < field(5).h);
near(field(6).h, 1); near(field(6.5).ripe, 1); assert.equal(field(6.4).cut, 0);
near(field(8).cut ?? 1, 1, 1); assert.equal(field(9).h, 0); assert.equal(field(11).sown, 0);
{
  let h = -1;
  for (let m = 0; m <= 6; m += 0.25) { const v = field(m).h; assert.ok(v >= h - 1e-12); h = v; }
  let c = -1;
  for (let m = 6.5; m < 8; m += 0.1) { const v = field(m).cut; assert.ok(v >= c); c = v; }
}
// 歉收的一年：長不高，而且夏天就枯了
assert.ok(field(6, true).h < 0.5 && field(6, true).wilt > 0.9 && field(6).wilt === 0);

// 穀倉：收割完最滿，之後只減不增，一直到下一次收割
near(granary(8), 1);
{
  let g = 2;
  for (let k = 0; k <= 10.4; k += 0.2) { const v = granary(8 + k); assert.ok(v <= g + 1e-12, `granary rises at ${8 + k}`); g = v; }
  assert.ok(granary(6.4) > 0.1 && granary(6.4) < 0.2);        // 正常的一年：青黃不接的時候還剩一點
  assert.ok(granary(7.2) > granary(6.6));                       // 收割時往上
  near(granary(6.5), granary(6.49), 0.01);                      // 接得起來，不會跳
  near(granary(7.999), granary(8), 0.01);
}
// 歉收：裝不到四成，春天就見底
assert.ok(granary(8, true) < 0.4);
assert.equal(granary(2, true), 0);
assert.ok(granary(11, true) > 0 && granary(11, true) < granary(11));
for (let m = 0; m < 12; m += 0.37) { for (const b of [false, true]) { const v = granary(m, b); assert.ok(v >= 0 && v <= 1); const w = larder(m, b); assert.ok(w >= 0 && w <= 1); } }

// 採集狩獵的存糧：一直不多，秋天存一些；歉收的一年變化比穀倉小得多
assert.ok(Math.max(...[...Array(48)].map((_, i) => larder(i / 4))) < 0.4);
assert.ok(larder(9) > larder(5));
assert.ok(granary(8) - granary(8, true) > 3 * (larder(9) - larder(9, true)));
near(larder(5.99), larder(6), 0.01); near(larder(8.99), larder(9), 0.01);

// 人物與營地：每一季大部分時間待在原地，季末才移動
assert.deepEqual(blend(0.5), { a: 0, b: 1, w: 0 });
assert.equal(blend(2.99).a, 0); assert.ok(blend(2.99).w > 0.99);
assert.equal(blend(11).b, 0);
{
  const spots = [[0, 0], [4, 0], [4, 4], [0, 4]];
  assert.deepEqual(camp(1, spots), [0, 0]);
  assert.deepEqual(camp(4, spots), [4, 0]);
  const mid = camp(2.625, spots); near(mid[0], 2, 1e-9); near(mid[1], 0);
  const back = camp(11.9, spots); assert.ok(back[1] < 1 && back[0] === 0);
  let x = -1;
  for (let m = 2; m <= 3; m += 0.05) { const p = camp(m, spots)[0]; assert.ok(p >= x - 1e-12); x = p; }
}
console.log('farm.test.mjs ok');
