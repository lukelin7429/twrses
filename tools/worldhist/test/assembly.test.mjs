// 第五課的純函式：小人數量、方陣、扇形座位、舉手、判斷、陶片放逐的兩種讀法。node test/assembly.test.mjs
import assert from 'node:assert/strict';
import { figures, shares, gridBlock, fanSeats, handsUp, judgeHands, ostracism, RULES, rng } from '../src/assembly.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} ≉ ${b}`);
const G = [{ use: 30000 }, { use: 90000 }, { use: 25000 }, { use: 60000 }];

// 小人：每個代表 per 人，至少 1 個；比例加起來是 1
assert.deepEqual(figures(G, 500), [60, 180, 50, 120]);
assert.deepEqual(figures([{ use: 10 }], 500), [1]);
near(shares(G).reduce((s, x) => s + x, 0), 1);
near(shares(G)[0], 30000 / 205000);

// 方陣：數量對、置中、彼此不重疊
for (const [n, cols] of [[1, 5], [7, 3], [60, 10], [61, 10]]) {
  const b = gridBlock(n, cols, 1);
  assert.equal(b.length, n);
  near(b.reduce((s, p) => s + p.z, 0) / n, 0, 0.51);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) assert.ok(Math.hypot(b[i].x - b[j].x, b[i].z - b[j].z) >= 0.999, 'grid overlap');
}

// 扇形座位：數量對（放得下的話）、都在扇形裡、一排比一排高、不重疊
{
  const opt = { r0: 6, r1: 20, angle: 2.4, gap: 0.9, rise: 0.35 };
  const s = fanSeats(120, opt);
  assert.equal(s.length, 120);
  for (const p of s) {
    const r = Math.hypot(p.x, p.z), a = Math.atan2(p.x, -p.z);
    assert.ok(r >= opt.r0 - 1e-9 && r <= opt.r1 + 1e-9, 'radius');
    assert.ok(Math.abs(a) <= opt.angle / 2 + 1e-9, 'angle');
    near(p.y, p.row * opt.rise);
  }
  for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) assert.ok(Math.hypot(s[i].x - s[j].x, s[i].z - s[j].z) >= 0.85, 'seat overlap');
  assert.ok(fanSeats(100000, opt).length < 100000, 'a full hill stops at r1');
}

// 舉手：剛好 round(n·share) 個；同一個種子結果一樣
{
  const up = handsUp(120, 0.55);
  assert.equal(up.filter(Boolean).length, 66);
  assert.deepEqual(handsUp(120, 0.55), up);
  assert.equal(handsUp(120, 0).filter(Boolean).length, 0);
  assert.equal(handsUp(120, 1).filter(Boolean).length, 120);
  const r = rng(1); for (let i = 0; i < 100; i++) { const v = r(); assert.ok(v >= 0 && v < 1); }
}

// 用看的判斷：差很多才看得出來
assert.equal(judgeHands(80, 20), 'yes');
assert.equal(judgeHands(20, 80), 'no');
assert.equal(judgeHands(52, 48), 'close');
assert.equal(judgeHands(0, 0), 'close');

// 陶片放逐：同一堆陶片，兩種讀法結果可以不一樣
{
  const a = { Aristides: 4000, Themistocles: 2500 };        // 一共 6,500 片，但沒有人超過 6,000
  assert.equal(ostracism(a, 'quorum').exiled, 'Aristides');
  assert.equal(ostracism(a, 'against').exiled, null);
  assert.equal(ostracism(a, 'against').reason, 'too-few');
  const b = { A: 3000, B: 2000 };                           // 不到 6,000：兩種讀法都不放逐
  for (const r of RULES) assert.equal(ostracism(b, r).exiled, null);
  const c = { A: 6200, B: 900 };                            // 兩種讀法都放逐 A
  for (const r of RULES) assert.equal(ostracism(c, r).exiled, 'A');
  assert.equal(ostracism({ A: 3500, B: 3500 }, 'quorum').reason, 'tie');
  assert.equal(ostracism(a, 'quorum').total, 6500);
  assert.throws(() => ostracism(a, 'vibes'), RangeError);
}
console.log('assembly.test.mjs ok');
