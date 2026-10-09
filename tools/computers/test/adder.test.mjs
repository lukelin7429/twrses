// 第四課「加法器」純函式的測試：node test/adder.test.mjs
import assert from 'node:assert/strict';
import { GATES_FULL, GATES_HALF, addBits, carryRun, columnText, fullAdder, halfAdder, makeProblem } from '../src/adder.js';
import { bitString, fromBits, mulberry32, toBits } from '../src/bits.js';
import { AND, XOR } from '../src/logic.js';

// 半加器：四種情況（課文第二段）
assert.deepEqual(halfAdder(0, 0), { sum: 0, carry: 0 });   // 0 + 0 = 0
assert.deepEqual(halfAdder(0, 1), { sum: 1, carry: 0 });   // 0 + 1 = 1
assert.deepEqual(halfAdder(1, 0), { sum: 1, carry: 0 });   // 1 + 0 = 1
assert.deepEqual(halfAdder(1, 1), { sum: 0, carry: 1 });   // 1 + 1 = 10（二）
for (const a of [0, 1]) for (const b of [0, 1]) {
  assert.equal(halfAdder(a, b).sum, XOR(a, b));            // 和這一欄就是 XOR：0、1、1、0
  assert.equal(halfAdder(a, b).carry, AND(a, b));          // 進位這一欄就是 AND：0、0、0、1
  assert.equal(halfAdder(a, b).carry * 2 + halfAdder(a, b).sum, a + b);
}
// 全加器：八種情況都等於真正的 a + b + c
for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) {
  const r = fullAdder(a, b, c);
  assert.equal(r.carry * 2 + r.sum, a + b + c);
}
for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) assert.equal(fullAdder(a, b, c).carry, a + b + c >= 2 ? 1 : 0);   // 至少兩個 1 就進位
for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) assert.equal(fullAdder(a, b, c).sum, (a + b + c) % 2);       // 一個或三個 1：寫 1（人體加法器的舉手規則）
assert.deepEqual(fullAdder(1, 1, 1), { sum: 1, carry: 1 });  // 1 + 1 + 1 = 11（三）
assert.equal(2 ** 3, 8);                                     // 三個輸入：真值表 8 列
assert.equal(GATES_HALF, 2); assert.equal(GATES_FULL, 5);    // 半加器 2 個閘；全加器＝2 個半加器＋1 個 OR＝5 個
assert.equal(GATES_HALF * 2 + 1, GATES_FULL);
assert.equal(4 * GATES_FULL, 20);                            // 模型的四位加法器：四個全加器＝20 個閘
assert.equal(64 * GATES_FULL, 320);

// 四位元加法器：0–15 的每一種組合（256 種）都要對
let longest = 0;
for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) {
  const r = addBits(toBits(a, 4), toBits(b, 4));
  assert.equal(r.value, a + b, `${a} + ${b}`);
  assert.equal(fromBits(r.bits), a + b);
  assert.equal(r.bits.length, 5);
  assert.equal(r.overflow, a + b > 15);
  assert.equal(r.steps.length, 4);
  r.steps.forEach((s, i) => { assert.equal(s.i, i); if (i) assert.equal(s.cin, r.steps[i - 1].cout); else assert.equal(s.cin, 0); });   // 進位一位接一位
  longest = Math.max(longest, carryRun(r.steps));
}
assert.equal(longest, 4);
assert.equal(16 * 16, 256);
assert.equal(15 + 15, 30); assert.equal(2 ** 5 - 1, 31);     // 最大 15 + 15 = 30，五盞燈裝得下（最多 31）
// 八位元也對（抽查全部 65,536 種）
for (let a = 0; a < 256; a++) for (let b = 0; b < 256; b++) assert.equal(addBits(toBits(a, 8), toBits(b, 8)).value, a + b);

// 課文與卡片裡的例子
const show = (a, b) => bitString(addBits(toBits(a, 4), toBits(b, 4)).bits.slice(), 0);
assert.equal(show(5, 2), '00111');     // 0101 + 0010 = 0111（5 + 2 = 7，沒有進位）
assert.equal(carryRun(addBits(toBits(5, 4), toBits(2, 4)).steps), 0);
assert.equal(show(1, 1), '00010');     // 0001 + 0001 = 0010
assert.equal(show(7, 1), '01000');     // 0111 + 0001 = 1000：進位連傳三位
assert.equal(carryRun(addBits(toBits(7, 4), toBits(1, 4)).steps), 3);
assert.equal(show(15, 1), '10000');    // 1111 + 0001 = 10000：第五盞燈
assert.equal(carryRun(addBits(toBits(15, 4), toBits(1, 4)).steps), 4);
assert.equal(show(5, 3), '01000');     // 0101 + 0011 = 1000（5 + 3 = 8）
assert.equal(show(6, 3), '01001');     // 0110 + 0011 = 1001（6 + 3 = 9）
assert.equal(columnText({ a: 1, b: 1, cin: 1, sum: 1, cout: 1 }), '1 + 1 + 1 = 11');
assert.equal(columnText({ a: 1, b: 1, cin: 0, sum: 0, cout: 1 }), '1 + 1 + 0 = 10');
assert.equal(columnText({ a: 0, b: 1, cin: 0, sum: 1, cout: 0 }), '0 + 1 + 0 = 01');
// 課堂活動二：主控台
assert.equal((0b0101 + 0b0011).toString(2), '1000');
assert.equal((0b0111 + 0b0001).toString(2), '1000');
assert.equal((0b1111 + 0b0001).toString(2), '10000');

// 練習題：一定至少進位一次，答案正確
for (let seed = 1; seed <= 300; seed++) {
  const p = makeProblem(mulberry32(seed), 4);
  assert.equal(p.value, p.a + p.b);
  assert.ok(p.steps.some((s) => s.cout));
  assert.ok(p.a >= 1 && p.a <= 15 && p.b >= 1 && p.b <= 15);
}

console.log('adder.test.mjs ok');
