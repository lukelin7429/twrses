// 分數純函式的測試：node test/fraction.test.mjs
import assert from 'node:assert/strict';
import {
  COMPARE_KINDS, DENOMS, add, addBottoms, compare, cutsAlign, equal, expand, gcd, lcd, lcm, makeCompareQuiz, mulberry32, reduce, toDenominator,
  toMixed, value,
} from '../src/fraction.js';
import { fractionEn, fractionZh, ordinalEn } from '../src/names.js';

// 課文裡的例子
assert.deepEqual(add([1, 2], [1, 3]), [5, 6]);              // 1/2 + 1/3 = 3/6 + 2/6 = 5/6
assert.deepEqual(toDenominator([1, 2], 6), [3, 6]);
assert.deepEqual(toDenominator([1, 3], 6), [2, 6]);
assert.deepEqual(addBottoms([1, 2], [1, 3]), [2, 5]);       // 錯誤的答案
assert.equal(compare([2, 5], [1, 2]), -1);                  // 2/5 比 1/2 還小——加了東西反而變少，不可能
assert.deepEqual(addBottoms([1, 2], [2, 5]), [3, 7]);       // CCSS 5.NF.A.2 的例子：2/5 + 1/2 ≠ 3/7
assert.equal(compare([3, 7], [1, 2]), -1);                  // 3/7 < 1/2
assert.deepEqual(add([2, 3], [5, 4]), [23, 12]);            // CCSS 5.NF.A.1：8/12 + 15/12 = 23/12
assert.deepEqual(toDenominator([2, 3], 12), [8, 12]); assert.deepEqual(toDenominator([5, 4], 12), [15, 12]);
assert.deepEqual(add([1, 4], [1, 4]), [1, 2]);              // 同分母：1/4 + 1/4 = 2/4 = 1/2
assert.deepEqual(add([1, 2], [1, 2]), [1, 1]);
assert.ok(equal([1, 2], [2, 4]) && equal([1, 2], [3, 6]) && equal([2, 4], [3, 6]));
assert.deepEqual(reduce([6, 8]), [3, 4]); assert.deepEqual(reduce([0, 5]), [0, 1]);
assert.deepEqual(expand([3, 4], 3), [9, 12]);
assert.equal(lcd([1, 4], [1, 6]), 12); assert.equal(lcm(4, 6), 12); assert.equal(gcd(12, 18), 6);
assert.deepEqual(toMixed([3, 2]), { whole: 1, n: 1, d: 2 });   // 1 1/2
assert.deepEqual(toMixed([23, 12]), { whole: 1, n: 11, d: 12 });
assert.throws(() => toDenominator([1, 3], 8));
assert.throws(() => reduce([1, 0]));
// 同分子：分母越大，每一塊越小
assert.equal(compare([1, 3], [1, 4]), 1); assert.equal(compare([3, 8], [3, 5]), -1);

// 模型可以選的所有分數組合：通分以後真的接得起來，而且和用小數算的一樣；「分母加分母」永遠介於兩者之間
let maxLcd = 0;
for (const d1 of DENOMS) for (let n1 = 1; n1 <= d1; n1++) for (const d2 of DENOMS) for (let n2 = 1; n2 <= d2; n2++) {
  const f = [n1, d1], g = [n2, d2], D = lcd(f, g); maxLcd = Math.max(maxLcd, D);
  assert.equal(D % d1, 0); assert.equal(D % d2, 0);
  const s = add(f, g);
  assert.ok(Math.abs(value(s) - (value(f) + value(g))) < 1e-12);
  assert.deepEqual(s, reduce([toDenominator(f, D)[0] + toDenominator(g, D)[0], D]));
  assert.ok(value(s) <= 2);
  const w = addBottoms(f, g), lo = Math.min(value(f), value(g)), hi = Math.max(value(f), value(g));
  assert.ok(value(w) >= lo - 1e-12 && value(w) <= hi + 1e-12);        // 錯的答案永遠比較大的那一個還小（或一樣）
  assert.ok(value(w) < value(s));                                        // 一定比真正的和小
  // 對齊：只有公倍數的切法，兩條的舊切線才都落在新切線上
  for (let k = 1; k <= 60; k++) assert.equal(cutsAlign(d1, d2, k), k % lcm(d1, d2) === 0);
}
assert.equal(maxLcd, 60);   // 模型裡最細切成 60 塊（5 和 12、10 和 12）

// 唸法
assert.equal(fractionEn(1, 2), 'one half'); assert.equal(fractionEn(2, 2), 'two halves');
assert.equal(fractionEn(1, 3), 'one third'); assert.equal(fractionEn(3, 4), 'three fourths');
assert.equal(fractionEn(5, 6), 'five sixths'); assert.equal(fractionEn(2, 5), 'two fifths');
assert.equal(fractionEn(1, 8), 'one eighth'); assert.equal(fractionEn(11, 12), 'eleven twelfths');
assert.equal(fractionEn(23, 12), 'twenty-three twelfths'); assert.equal(fractionEn(7, 9), 'seven ninths');
assert.equal(ordinalEn(20), 'twentieth'); assert.equal(ordinalEn(24), 'twenty-fourth'); assert.equal(ordinalEn(60), 'sixtieth');
assert.equal(ordinalEn(30), 'thirtieth'); assert.equal(ordinalEn(40), 'fortieth'); assert.equal(ordinalEn(15), 'fifteenth');
assert.equal(fractionZh(3, 4), '四分之三'); assert.equal(fractionZh(1, 2), '二分之一'); assert.equal(fractionZh(5, 6), '六分之五');
assert.equal(fractionZh(23, 12), '十二分之二十三');

// 小遊戲：八題，種類對、答案對、可重現
assert.equal(COMPARE_KINDS.length, 8);
for (let seed = 1; seed <= 400; seed++) {
  const quiz = makeCompareQuiz(mulberry32(seed));
  quiz.forEach((q, k) => {
    assert.equal(q.kind, COMPARE_KINDS[k]);
    for (const f of [q.left, q.right]) { assert.ok(DENOMS.includes(f[1])); assert.ok(f[0] >= 1 && f[0] < f[1]); }
    const c = compare(q.left, q.right);
    assert.equal(q.answer, c > 0 ? 'left' : c < 0 ? 'right' : 'equal');
    if (q.kind === 'same-d') { assert.equal(q.left[1], q.right[1]); assert.notEqual(c, 0); }
    if (q.kind === 'same-n') { assert.equal(q.left[0], q.right[0]); assert.notEqual(c, 0); }
    if (q.kind === 'equal') { assert.equal(c, 0); assert.notDeepEqual(q.left, q.right); }
    if (q.kind === 'mixed') { assert.notEqual(q.left[0], q.right[0]); assert.notEqual(q.left[1], q.right[1]); assert.notEqual(c, 0); }
  });
}
assert.deepEqual(makeCompareQuiz(mulberry32(9)), makeCompareQuiz(mulberry32(9)));

console.log('fraction.test.mjs ok');
