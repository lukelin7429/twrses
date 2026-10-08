// 第三課「邏輯閘」純函式的測試：node test/logic.test.mjs
import assert from 'node:assert/strict';
import { AND, GATES, NOT, OR, PUZZLES, XOR, circuitTable, evalCircuit, exprText, makeQuestion, sameTable, solved, truthTable } from '../src/logic.js';
import { mulberry32 } from '../src/bits.js';

// 三種基本閘的真值表（課文與模型裡的每一列）
assert.deepEqual(truthTable('and').map((r) => r.out), [0, 0, 0, 1]);   // 兩個都是 1 才是 1
assert.deepEqual(truthTable('or').map((r) => r.out), [0, 1, 1, 1]);    // 有一個是 1 就是 1（兩個都是也算）
assert.deepEqual(truthTable('not').map((r) => r.out), [1, 0]);         // 反過來
assert.deepEqual(truthTable('and').map((r) => `${r.a}${r.b}`), ['00', '01', '10', '11']);
assert.equal(truthTable('and').length, 4); assert.equal(truthTable('not').length, 2);
assert.equal(2 ** 2, 4); assert.equal(2 ** 3, 8);                      // 兩個輸入 4 列、三個輸入 8 列
assert.equal(AND(1, 1), 1); assert.equal(1 + 1, 2);                    // 迷思卡：AND 不是加法，1 AND 1 是 1
assert.equal(OR(1, 1), 1); assert.equal(XOR(1, 1), 0);                 // OR 包含「兩個都是」；XOR 才是「只能一個」
assert.deepEqual([[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => XOR(a, b)), [0, 1, 1, 0]);
assert.equal(GATES.not.inputs, 1);

// 課堂活動二在主控台打的那幾行
assert.equal(true && false, false); assert.equal(true || false, true); assert.equal(!true, false);
assert.equal(!true && true, false); assert.equal(!(true && true), false);
assert.equal(true && true, true); assert.equal(false || false, false);

// 笛摩根：NOT (A AND B) ＝ (NOT A) OR (NOT B)；NOT (A OR B) ＝ (NOT A) AND (NOT B)
for (const a of [0, 1]) for (const b of [0, 1]) {
  assert.equal(NOT(AND(a, b)), OR(NOT(a), NOT(b)));
  assert.equal(NOT(OR(a, b)), AND(NOT(a), NOT(b)));
  // 只用 NAND 也做得出三種基本閘
  const NAND = (x, y) => NOT(AND(x, y));
  assert.equal(NAND(a, a), NOT(a));
  assert.equal(NAND(NAND(a, b), NAND(a, b)), AND(a, b));
  assert.equal(NAND(NAND(a, a), NAND(b, b)), OR(a, b));
}

// 「把閘接起來」：每一題的答案真的對；每一題的目標都不一樣；用「AND／OR＋輸入前加 NOT」一定接得出來
assert.equal(PUZZLES.length, 6);
assert.equal(new Set(PUZZLES.map((p) => p.target.join(''))).size, 6);
for (const p of PUZZLES) {
  assert.ok(solved(p.answer, p), p.key);
  assert.equal(p.target.length, 4);
}
assert.ok(!solved({ gate: 'or' }, PUZZLES[0]));
assert.deepEqual(circuitTable({ gate: 'and' }), [0, 0, 0, 1]);
assert.deepEqual(circuitTable({ gate: 'and', notA: true }), [0, 1, 0, 0]);   // 沒下雨（NOT A）而且功課做完（B）
assert.equal(evalCircuit({ gate: 'and', notB: true }, 1, 0), 1);             // 車在動（A）而且沒繫安全帶（NOT B）
assert.equal(evalCircuit({ gate: 'and', notOut: true }, 1, 1), 0);
assert.ok(sameTable([1, 0], [1, 0])); assert.ok(!sameTable([1, 0], [0, 1]));
assert.equal(exprText({ gate: 'and', notA: true }), 'NOT A AND B');
assert.equal(exprText({ gate: 'or', notB: true }), 'A OR NOT B');
// 八種接法（2 種閘 × 輸入各可以加 NOT）得到八張不同的真值表
{
  const seen = new Set();
  for (const gate of ['and', 'or']) for (const notA of [false, true]) for (const notB of [false, true]) seen.add(circuitTable({ gate, notA, notB }).join(''));
  assert.equal(seen.size, 8);
}

// 測驗題：答案是 0 或 1；前五題的題型固定
for (let seed = 1; seed <= 200; seed++) {
  const rng = mulberry32(seed);
  for (let i = 0; i < 8; i++) {
    const q = makeQuestion(rng, i);
    assert.ok(q.answer === 0 || q.answer === 1);
    if (i < 2) assert.equal(q.text, 'A AND B');
    if (i === 4) { assert.equal(q.text, 'NOT A'); assert.equal(q.b, null); assert.equal(q.answer, NOT(q.a)); }
    if (i >= 5) assert.ok(q.text.includes('NOT'));
  }
}

console.log('logic.test.mjs ok');
