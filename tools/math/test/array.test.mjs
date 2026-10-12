// 方陣純函式的測試：node test/array.test.mjs
import assert from 'node:assert/strict';
import {
  MAX, TURN_RANGES, cells, extent, factsToLearn, groups, makeTurnQuiz, mirror, mulberry32, pairsOf, position, skipCount, sumText,
  tableValue, total, turn,
} from '../src/array.js';

// 課文裡的例子
assert.equal(total(3, 4), 12);
assert.equal(total(4, 3), 12);
assert.deepEqual(skipCount(3, 4, 'rows'), [4, 8, 12]);        // 一排一排數：4、8、12
assert.deepEqual(skipCount(3, 4, 'cols'), [3, 6, 9, 12]);     // 一行一行數：3、6、9、12
assert.equal(sumText(3, 4, 'rows'), '4 + 4 + 4 = 12');
assert.equal(sumText(3, 4, 'cols'), '3 + 3 + 3 + 3 = 12');
assert.equal(sumText(1, 7, 'rows'), '7 = 7');
assert.equal(sumText(3, 4, 'rows', '＋'), '4＋4＋4 = 12');
assert.equal(total(6, 7), 42); assert.equal(total(7, 6), 42);
assert.equal(total(7, 8), 56); assert.equal(total(8, 7), 56);
assert.equal(total(9, 9), 81);                                 // 九九八十一
assert.equal(total(5, 5), 25);                                 // five squared

// 每一種大小（1–10 × 1–10）：兩種數法數出來一樣多，而且就是 rows × cols
for (let r = 1; r <= MAX; r++) for (let c = 1; c <= MAX; c++) {
  const byRows = skipCount(r, c, 'rows'), byCols = skipCount(r, c, 'cols');
  assert.equal(byRows.length, r); assert.equal(byCols.length, c);
  assert.equal(byRows[r - 1], r * c); assert.equal(byCols[c - 1], r * c);
  assert.equal(cells(r, c).length, r * c);
  // 分組不重不漏
  for (const by of ['rows', 'cols']) {
    const seen = new Set(groups(r, c, by).flat().map((x) => `${x.r},${x.c}`));
    assert.equal(seen.size, r * c);
  }
  // 轉九十度：新盤是 c 排、每排 r 個；每一格各有一個新位子，不重疊、不出界
  const moved = cells(r, c).map((x) => turn(x.r, x.c, r));
  assert.equal(new Set(moved.map((x) => `${x.r},${x.c}`)).size, r * c);
  moved.forEach((x) => { assert.ok(x.r >= 0 && x.r < c); assert.ok(x.c >= 0 && x.c < r); });
  // 轉四次回到原位（每轉一次，排數和每排個數對調）
  cells(r, c).forEach((x) => {
    let p = { ...x }, rows = r, cols = c;
    for (let k = 0; k < 4; k++) { p = turn(p.r, p.c, rows); [rows, cols] = [cols, rows]; }
    assert.deepEqual(p, x);
  });
  // 位置：整盤置中，大小對得上
  const xs = cells(r, c).map((x) => position(x.r, x.c, r, c, 0.25));
  assert.ok(Math.abs(xs.reduce((s, p) => s + p[0], 0)) < 1e-9);
  assert.ok(Math.abs(xs.reduce((s, p) => s + p[1], 0)) < 1e-9);
  const [w, d] = extent(r, c, 0.25);
  assert.ok(Math.abs(Math.max(...xs.map((p) => p[0])) - Math.min(...xs.map((p) => p[0])) + 1 - w) < 1e-9);
  assert.ok(Math.abs(Math.max(...xs.map((p) => p[1])) - Math.min(...xs.map((p) => p[1])) + 1 - d) < 1e-9);
}
// 靠攏以後是一個長方形：寬 × 深＝格數（面積）
assert.deepEqual(extent(3, 4, 0), [4, 3]);
assert.equal(extent(3, 4, 0)[0] * extent(3, 4, 0)[1], 12);
// 轉九十度的方向：最後面那一排最左邊的 (0,0) 轉到最後面那一排的最右邊
assert.deepEqual(turn(0, 0, 3), { r: 0, c: 2 });
assert.deepEqual(turn(2, 0, 3), { r: 0, c: 0 });
assert.deepEqual(turn(0, 3, 3), { r: 3, c: 2 });

// 乘法表：對角線兩邊一樣
for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) { const [x, y] = mirror(a, b); assert.equal(tableValue(a, b), tableValue(x, y)); }
assert.equal(pairsOf(10), 45);          // 十乘十的表：對角線以外 90 格，兩兩成對是 45 對
assert.equal(factsToLearn(10), 55);     // 對角線 10 格＋45 對＝55
assert.equal(10 * 10 - factsToLearn(10), 45);
assert.equal(factsToLearn(9), 45);      // 九九乘法表（1–9）：45
assert.equal(pairsOf(9), 36);
// 自己數一遍
let n = 0; for (let a = 1; a <= 10; a++) for (let b = a; b <= 10; b++) n++;
assert.equal(n, 55);

// 小遊戲：八題；答案是轉過來的那一盤；其他三盤的總數都不一樣；可重現
assert.equal(TURN_RANGES.length, 8);
for (let seed = 1; seed <= 500; seed++) {
  const quiz = makeTurnQuiz(mulberry32(seed));
  assert.equal(quiz.length, 8);
  quiz.forEach((q, k) => {
    assert.notEqual(q.rows, q.cols);
    assert.ok(q.rows >= TURN_RANGES[k][0] && q.rows <= TURN_RANGES[k][1]);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((o) => o.join('x'))).size, 4);
    assert.deepEqual(q.options[q.correct], [q.cols, q.rows]);
    q.options.forEach((o, i) => { assert.ok(o[0] >= 1 && o[0] <= MAX && o[1] >= 1 && o[1] <= MAX); assert.equal(o[0] * o[1] === q.total, i === q.correct); });
  });
}
assert.deepEqual(makeTurnQuiz(mulberry32(5)), makeTurnQuiz(mulberry32(5)));

console.log('array.test.mjs ok');
