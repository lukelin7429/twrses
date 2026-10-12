// 位值積木引擎純函式的測試：node test/place.test.mjs
import assert from 'node:assert/strict';
import {
  BASES, WIDTHS, PILE_PATTERNS, carrySteps, columnSize, columns, digitsNeeded, expandedText, fromDigits, fusedBox, fusedSlots,
  groupMyriads, groupThousands, groupsOf, increment, makePileQuiz, maxValue, mulberry32, numeral, pieceDims, placeValue,
  regroupings, slots, stackAxis, terms, toDigits,
} from '../src/place.js';

// 位值：十進位是 1、10、100、1000；五進位是 1、5、25、125；二進位是 1、2、4、8……
assert.deepEqual([0, 1, 2, 3].map((i) => placeValue(i, 10)), [1, 10, 100, 1000]);
assert.deepEqual([0, 1, 2, 3].map((i) => placeValue(i, 5)), [1, 5, 25, 125]);
assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((i) => placeValue(i, 2)), [1, 2, 4, 8, 16, 32, 64, 128]);

// 模型的範圍（課文與頁面上寫的數）
assert.equal(maxValue(WIDTHS[10], 10), 9999);
assert.equal(maxValue(WIDTHS[5], 5), 624);       // 4×125 + 4×25 + 4×5 + 4
assert.equal(4 * 125 + 4 * 25 + 4 * 5 + 4, 624);
assert.equal(maxValue(WIDTHS[2], 2), 255);       // 和電腦概論第一課的八個開關一樣

// 拆成各位數（索引 0 是個位）
assert.deepEqual(toDigits(0, 10, 4), [0, 0, 0, 0]);
assert.deepEqual(toDigits(305, 10, 4), [5, 0, 3, 0]);
assert.deepEqual(toDigits(305, 10), [5, 0, 3]);
assert.deepEqual(toDigits(9999, 10, 4), [9, 9, 9, 9]);
assert.deepEqual(toDigits(13, 5), [3, 2]);            // 2 個五 + 3 個一
assert.deepEqual(toDigits(13, 2), [1, 0, 1, 1]);      // 8 + 4 + 0 + 1
assert.deepEqual(toDigits(13, 2, 8), [1, 0, 1, 1, 0, 0, 0, 0]);
assert.equal(numeral(toDigits(305, 10, 4)), '305');
assert.equal(numeral(toDigits(305, 10, 4), false), '0305');
assert.equal(numeral(toDigits(0, 10, 4)), '0');
assert.equal(numeral(toDigits(13, 5)), '23');
assert.equal(numeral(toDigits(13, 2)), '1101');
assert.equal(numeral(toDigits(10, 2)), '1010');       // 課文：十根手指在二進位寫成 1010
assert.equal(numeral(toDigits(10, 5)), '20');
assert.equal(numeral(toDigits(25, 5)), '100');
assert.equal(numeral(toDigits(24, 5)), '44');
assert.equal(numeral(toDigits(60, 10)), '60');
assert.throws(() => toDigits(-1, 10));
assert.throws(() => toDigits(1.5, 10));

// 各位數加回去等於原來的數：三種進位制、模型範圍內每一個數
for (const base of BASES) {
  const w = WIDTHS[base];
  for (let n = 0; n <= maxValue(w, base); n++) {
    const d = toDigits(n, base, w);
    assert.equal(d.length, w);
    assert.ok(d.every((x) => x >= 0 && x < base));
    assert.equal(fromDigits(d, base), n);
    assert.equal(terms(n, base, w).reduce((s, t) => s + t.value, 0), n);
    assert.equal(parseInt(numeral(d), base), n);          // 和 JavaScript 內建的轉換對一次
    assert.equal(numeral(toDigits(n, base)), n.toString(base));
  }
}
assert.equal(digitsNeeded(0, 10), 1);
assert.equal(digitsNeeded(9, 10), 1);
assert.equal(digitsNeeded(10, 10), 2);
assert.equal(digitsNeeded(9999, 10), 4);
assert.equal(digitsNeeded(255, 2), 8);
assert.equal(digitsNeeded(256, 2), 9);

// 展開：0 也寫出來
assert.equal(expandedText(305), '300 + 0 + 5');
assert.equal(expandedText(1032), '1,000 + 0 + 30 + 2');
assert.equal(expandedText(7), '7');
assert.deepEqual(terms(305, 10).map((t) => t.digit), [3, 0, 5]);

// 加一：不用進位
assert.deepEqual(carrySteps([0, 0, 0, 0], 10), [{ i: 0, from: 0, to: 1, carry: false }]);
assert.deepEqual(increment(toDigits(304, 10, 4), 10).digits, toDigits(305, 10, 4));
// 9 → 10：個位滿了，歸零，十位加一
assert.deepEqual(carrySteps(toDigits(9, 10, 4), 10), [{ i: 0, from: 9, to: 0, carry: true }, { i: 1, from: 0, to: 1, carry: false }]);
// 99 → 100、999 → 1000：連續進位兩次、三次
assert.equal(carrySteps(toDigits(99, 10, 4), 10).filter((s) => s.carry).length, 2);
assert.equal(carrySteps(toDigits(999, 10, 4), 10).filter((s) => s.carry).length, 3);
assert.deepEqual(increment(toDigits(999, 10, 4), 10).digits, [0, 0, 0, 1]);
assert.equal(increment(toDigits(999, 10, 4), 10).overflow, false);
// 9,999 再加一：四位都滿了，裝不下
assert.equal(increment(toDigits(9999, 10, 4), 10).overflow, true);
assert.deepEqual(increment(toDigits(9999, 10, 4), 10).digits, [0, 0, 0, 0]);
// 109 → 110：只進位一次，百位不動
assert.deepEqual(carrySteps(toDigits(109, 10, 4), 10).map((s) => s.i), [0, 1]);
// 五進位：4 → 10、24 → 100
assert.deepEqual(increment(toDigits(4, 5, 4), 5).digits, [0, 1, 0, 0]);
assert.deepEqual(increment(toDigits(24, 5, 4), 5).digits, [0, 0, 1, 0]);
assert.equal(increment(toDigits(624, 5, 4), 5).overflow, true);
// 二進位：1 → 10、3 → 100、7 → 1000、255 溢位
assert.deepEqual(increment(toDigits(1, 2, 8), 2).digits, toDigits(2, 2, 8));
assert.equal(carrySteps(toDigits(7, 2, 8), 2).filter((s) => s.carry).length, 3);
assert.equal(carrySteps(toDigits(127, 2, 8), 2).length, 8);
assert.equal(increment(toDigits(255, 2, 8), 2).overflow, true);
// 每一個數加一都對（三種進位制、整個範圍），而且每一步都是合法的數字
for (const base of BASES) {
  const w = WIDTHS[base], top = maxValue(w, base);
  for (let n = 0; n < top; n++) {
    const r = increment(toDigits(n, base, w), base);
    assert.equal(fromDigits(r.digits, base), n + 1);
    assert.equal(r.overflow, false);
    r.steps.forEach((s) => { assert.ok(s.to >= 0 && s.to < base); assert.equal(s.carry, s.from === base - 1); });
  }
}

// 從 0 數到某個數，一共併了幾次（課文與卡片裡的數字）
assert.deepEqual(regroupings(100, 10, 3), [10, 1, 0]);      // 數到 100：十個一併成十 10 次、十個十併成百 1 次
assert.deepEqual(regroupings(1000, 10, 4), [100, 10, 1, 0]);
assert.deepEqual(regroupings(9, 10, 2), [0, 0]);
assert.deepEqual(regroupings(8, 2, 4), [4, 2, 1, 0]);

// 積木的大小：體積就是它代表的數
for (const base of BASES) for (let i = 0; i < 8; i++) {
  const [x, y, z] = pieceDims(i, base);
  assert.equal(x * y * z, placeValue(i, base));
  // 滿了併起來的那一塊，大小等於下一位的積木
  assert.deepEqual(fusedBox(i, base).size, pieceDims(i + 1, base));
}
assert.deepEqual(pieceDims(0, 10), [1, 1, 1]);       // 小方塊
assert.deepEqual(pieceDims(1, 10), [1, 1, 10]);      // 長條
assert.deepEqual(pieceDims(2, 10), [10, 1, 10]);     // 平板
assert.deepEqual(pieceDims(3, 10), [10, 10, 10]);    // 大方塊
assert.deepEqual(pieceDims(7, 2), [4, 4, 8]);        // 二進位的 128
assert.deepEqual([0, 1, 2, 3].map(stackAxis), [2, 0, 1, 2]);

// 位子：同一格裡的積木不重疊；縫合以後剛好填滿併起來的那一塊
const overlap = (a, b, d) => [0, 1, 2].every((k) => Math.abs(a[k] - b[k]) < d[k] - 1e-9);
for (const base of BASES) {
  const w = WIDTHS[base];
  for (let i = 0; i < w; i++) {
    const top = i === w - 1, d = pieceDims(i, base), ss = slots(i, base, top);
    assert.equal(ss.length, top ? base - 1 : base);
    for (let a = 0; a < ss.length; a++) for (let b = a + 1; b < ss.length; b++) assert.ok(!overlap(ss[a], ss[b], d), `overlap base ${base} place ${i}`);
    const size = columnSize(i, base, top);
    ss.forEach((p) => [0, 1, 2].forEach((k) => { assert.ok(p[k] - d[k] / 2 >= -1e-9); assert.ok(p[k] + d[k] / 2 <= size[k] + 1e-9); }));
    if (!top) {
      const fs = fusedSlots(i, base), box = fusedBox(i, base), ax = stackAxis(i);
      assert.equal(fs.length, base);
      fs.forEach((p, k) => assert.ok(Math.abs(p[ax] - (k + 0.5) * d[ax]) < 1e-9));
      assert.ok(Math.abs(fs[base - 1][ax] + d[ax] / 2 - box.size[ax]) < 1e-9);
    }
  }
  // 桌上的格子：個位在最右邊，格子之間不重疊，整排置中
  const cols = columns(base);
  assert.equal(cols.length, w);
  for (let i = 1; i < w; i++) assert.ok(cols[i].x0 + cols[i].size[0] < cols[i - 1].x0);
  assert.ok(Math.abs(cols[0].x0 + cols[0].size[0] + cols[w - 1].x0) < 1e-9);
}

// 寫法
assert.equal(groupThousands(0), '0');
assert.equal(groupThousands(999), '999');
assert.equal(groupThousands(1000), '1,000');
assert.equal(groupThousands(9999), '9,999');
assert.equal(groupThousands(12345678), '12,345,678');
assert.equal(groupThousands(1000000), '1,000,000');
assert.equal(groupMyriads(12345678), '1234,5678');
assert.equal(groupMyriads(100000000), '1,0000,0000');

// 這堆積木是多少：八題，後五題有 0；選項不重複、答案在裡面、可重現
assert.equal(PILE_PATTERNS.length, 8);
for (let seed = 1; seed <= 400; seed++) {
  const quiz = makePileQuiz(mulberry32(seed));
  assert.equal(quiz.length, 8);
  quiz.forEach((q, k) => {
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.options[q.correct], q.answer);
    assert.equal(fromDigits(q.digits, 10), q.answer);
    assert.ok(q.answer >= 10 && q.answer <= 3999);
    assert.equal(q.zeros.length > 0, k >= 3);
    assert.equal(q.digits.length, PILE_PATTERNS[k].length);
    if (q.digits.length === 4) assert.ok(q.digits[3] <= 3);
    q.options.forEach((o) => assert.ok(Number.isInteger(o) && o > 0));
    if (k >= 3) assert.ok(q.options.includes(Number(String(q.answer).replace(/0/g, ''))));   // 「把 0 丟掉」一定在選項裡
  });
}
assert.deepEqual(makePileQuiz(mulberry32(7)), makePileQuiz(mulberry32(7)));

// 同一個數，三種寫法
assert.deepEqual(groupsOf(13, 10), [{ size: 10, count: 1 }, { size: 1, count: 3 }]);
assert.deepEqual(groupsOf(13, 5), [{ size: 5, count: 2 }, { size: 1, count: 3 }]);
assert.deepEqual(groupsOf(13, 2), [{ size: 8, count: 1 }, { size: 4, count: 1 }, { size: 2, count: 0 }, { size: 1, count: 1 }]);
for (let n = 1; n <= 40; n++) for (const base of BASES) assert.equal(groupsOf(n, base).reduce((s, g) => s + g.size * g.count, 0), n);

console.log('place.test.mjs ok');
