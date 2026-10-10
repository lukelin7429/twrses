import assert from 'node:assert/strict';
import { SIZES, binary, halvingGuesses, linear, makeValues, shuffle, worstBinary, worstLinear } from '../src/search.js';

// 每一種大小、每一個目標：兩種方法都找得到；步數不超過最壞情況；而且真的有目標用到最壞情況
for (let n = 1; n <= 200; n++) {
  const v = makeValues(n); let maxB = 0;
  for (let i = 1; i < n; i++) assert.ok(v[i] > v[i - 1], `sorted ${n}`);
  for (let t = 0; t < n; t++) {
    const l = linear(v, v[t]), b = binary(v, v[t]);
    assert.equal(l.found, t); assert.equal(l.steps.length, t + 1);
    assert.equal(b.found, t); assert.ok(b.steps.length <= worstBinary(n)); maxB = Math.max(maxB, b.steps.length);
  }
  assert.equal(maxB, worstBinary(n), `worst ${n}`);
  assert.equal(linear(v, -1).found, -1); assert.equal(binary(v, -1).found, -1); assert.equal(linear(v, -1).steps.length, worstLinear(n));
}
assert.deepEqual([8, 16, 32, 64].map(worstBinary), [4, 5, 6, 7]);
assert.deepEqual(SIZES.map(worstBinary), [4, 7, 10, 14, 17, 20]);
assert.equal(2 ** 20, 1048576); assert.ok(2 ** 20 > 1000000 && 2 ** 19 < 1000000);

// 模型的四個示範
const v16 = makeValues(16), v32 = makeValues(32);
assert.equal(linear(v16, v16[0]).steps.length, 1); assert.equal(binary(v16, v16[0]).steps.length, 4);      // 藏在第一個：一個一個找反而快
assert.equal(linear(v16, v16[15]).steps.length, 16); assert.equal(binary(v16, v16[15]).steps.length, 5);   // 藏在最後一個
assert.equal(linear(v32, v32[31]).steps.length, 32); assert.equal(binary(v32, v32[31]).steps.length, 6);   // 箱子加倍：16→32，5→6
// 沒排好：一個一個找還是找得到，砍一半的找法會把藏著目標的那一半丟掉
const mixed = shuffle(v16), target = mixed[0];                                                            // 示範：目標就藏在第一個箱子
assert.equal(linear(mixed, target).found, 0); assert.equal(linear(mixed, target).steps.length, 1);
assert.equal(binary(mixed, target).found, -1); assert.equal(binary(mixed, target).steps.length, 4);
assert.deepEqual(shuffle(v16), mixed);                                                                    // 固定的

// 猜數字：1 到 100 每次猜中間，最多 7 次，而且真的有數要 7 次
let worst = 0; for (let s = 1; s <= 100; s++) { const k = halvingGuesses(s); assert.ok(k >= 1 && k <= 7); worst = Math.max(worst, k); }
assert.equal(worst, 7); assert.equal(halvingGuesses(50), 1); assert.equal(worstBinary(100), 7); assert.ok(2 ** 7 >= 100 && 2 ** 6 < 100);
console.log('search.test.mjs ok');
