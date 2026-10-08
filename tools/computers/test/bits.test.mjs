// 位元引擎純函式的測試：node test/bits.test.mjs
import assert from 'node:assert/strict';
import {
  bitString, countMisreads, countStates, fromBits, increment, levelValues, makeRound, margin, maxValue, mulberry32,
  placeValue, readLevel, rippleSteps, sumText, terms, toBits,
} from '../src/bits.js';

// 位值：最右邊是 1，往左每一位加倍 —— 八位是 1、2、4、8、16、32、64、128
assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map(placeValue), [1, 2, 4, 8, 16, 32, 64, 128]);

// 課文裡的數字，自己算一遍
assert.equal(maxValue(8), 255);                       // 八個開關全開：128+64+32+16+8+4+2+1
assert.equal(128 + 64 + 32 + 16 + 8 + 4 + 2 + 1, 255);
assert.equal(countStates(8), 256);                    // 0–255 一共 256 種排法
assert.equal(maxValue(5), 31);                        // 五根手指：16+8+4+2+1
assert.equal(countStates(5), 32);
assert.equal(maxValue(10), 1023);                     // 十根手指
assert.equal(maxValue(1), 1);
assert.equal(countStates(2), 4);
assert.equal(countStates(3), 8);
assert.equal(countStates(16), 65536);
assert.equal(maxValue(4), 15);

// 來回轉換：0–255 每一個數都轉得回來
for (let n = 0; n <= 255; n++) assert.equal(fromBits(toBits(n, 8)), n);
assert.deepEqual(toBits(13, 8), [1, 0, 1, 1, 0, 0, 0, 0]);   // 索引 0 是最右邊
assert.equal(bitString(toBits(13, 8)), '0000 1101');
assert.equal(bitString(toBits(21, 5), 0), '10101');
assert.equal(bitString(toBits(255, 8)), '1111 1111');
assert.deepEqual(toBits(256, 8), toBits(0, 8));               // 裝不下的高位丟掉

// 算式
assert.deepEqual(terms(toBits(13, 8)), [8, 4, 1]);
assert.equal(sumText(toBits(13, 8)), '8 + 4 + 1 = 13');
assert.equal(sumText(toBits(13, 8), '＋'), '8＋4＋1 = 13');
assert.equal(sumText(toBits(0, 8)), '0');
assert.equal(sumText(toBits(64, 8)), '64');
assert.equal(sumText(toBits(255, 8)), '128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255');
assert.equal(sumText(toBits(31, 5)), '16 + 8 + 4 + 2 + 1 = 31');

// 加一與進位
for (let n = 0; n < 255; n++) {
  const r = increment(toBits(n, 8));
  assert.equal(fromBits(r.bits), n + 1);
  assert.equal(r.overflow, false);
  // 骨牌：由右往左一位接一位，中間不跳號；只有最後一步是 0→1
  r.steps.forEach((s, k) => { assert.equal(s.i, k); assert.equal(s.to, k === r.steps.length - 1 ? 1 : 0); assert.equal(s.carry, k < r.steps.length - 1); });
}
assert.equal(rippleSteps(toBits(0, 8)).length, 1);     // 0 → 1：只動一個開關
assert.equal(rippleSteps(toBits(7, 8)).length, 4);     // 0111 → 1000：動四個
assert.equal(rippleSteps(toBits(127, 8)).length, 8);   // 0111 1111 → 1000 0000：八個全動
{
  const r = increment(toBits(255, 8));                 // 全開再加一：全部歸零，進位掉出最左邊
  assert.equal(fromBits(r.bits), 0);
  assert.equal(r.overflow, true);
  assert.equal(r.steps.length, 8);
}
// 從 0 數到 255，每一位各翻幾次：最右邊每次都翻（255 次），往左每一位減半
{
  const flips = Array(8).fill(0);
  let b = toBits(0, 8);
  for (let n = 0; n < 255; n++) { const r = increment(b); r.steps.forEach((s) => flips[s.i]++); b = r.bits; }
  assert.deepEqual(flips, [255, 127, 63, 31, 15, 7, 3, 1]);
}

// 課堂活動「人體計數器」：五個人從 0 數到 31，各自站起來或坐下幾次
{
  const flips = Array(5).fill(0);
  let b = toBits(0, 5);
  for (let n = 0; n < 31; n++) { const r = increment(b); r.steps.forEach((s) => flips[s.i]++); b = r.bits; }
  assert.deepEqual(flips, [31, 15, 7, 3, 1]);
}
// 課文與迷思卡裡的數字
assert.equal(maxValue(16), 65535);
assert.equal(countStates(32), 4294967296);            // 32 個開關：超過四十億種排法
assert.equal(countStates(6), 64);                     // 六條線、每條兩種樣子：64 種（六十四卦）
assert.equal((13).toString(2), '1101');               // 課堂活動二：瀏覽器主控台的 (13).toString(2)
assert.equal((255).toString(2), '11111111');
assert.equal(parseInt('1101', 2), 13);
assert.equal(sumText(toBits(7, 8)), '4 + 2 + 1 = 7');
assert.equal(bitString(toBits(7, 4), 0), '0111');
assert.equal(bitString(toBits(8, 4), 0), '1000');
assert.equal(sumText(toBits(19, 5)), '16 + 2 + 1 = 19');

// 小測驗：四個選項不重複、都在範圍內、答案在裡面、燈和答案對得上
for (let seed = 1; seed <= 400; seed++) {
  const rng = mulberry32(seed);
  for (const width of [4, 5, 8]) {
    const r = makeRound(rng, width);
    assert.equal(r.options.length, 4);
    assert.equal(new Set(r.options).size, 4);
    assert.ok(r.options.every((v) => Number.isInteger(v) && v >= 0 && v <= maxValue(width)));
    assert.equal(r.options[r.correct], r.answer);
    assert.equal(fromBits(r.bits), r.answer);
    assert.equal(r.bits.length, width);
    assert.ok(r.answer >= 1);
  }
}
for (let a = 0; a <= 31; a++) assert.equal(new Set(makeRound(mulberry32(a + 7), 5, { answer: a }).options).size, 4);
assert.equal(mulberry32(42)(), mulberry32(42)());       // 同一顆種子，同一串亂數

// 為什麼不用十種亮度：界線離每一階多遠
assert.deepEqual(levelValues(2), [0, 1]);
assert.equal(levelValues(10).length, 10);
assert.equal(margin(2), 0.5);                           // 開／關：雜訊要超過滿刻度的一半才會讀錯
assert.ok(Math.abs(margin(10) - 1 / 18) < 1e-12);       // 十階：超過 1/18（約 5.6%）就可能讀錯
assert.equal(Math.round(margin(2) / margin(10)), 9);    // 兩階的容許範圍是十階的 9 倍
assert.equal(readLevel(0.49, 2), 0);
assert.equal(readLevel(0.51, 2), 1);
assert.equal(readLevel(-0.3, 10), 0);
assert.equal(readLevel(1.4, 10), 9);
for (const [levels, noise] of [[2, 0.2], [2, 0.45], [10, 0.05]]) assert.equal(countMisreads(levels, noise, 5000, mulberry32(9)).wrong, 0);   // 雜訊比界線小：一次都不會錯
assert.ok(countMisreads(10, 0.2, 5000, mulberry32(9)).wrong > 2500);   // 20% 的雜訊：十階大半讀錯
assert.equal(countMisreads(2, 0.2, 5000, mulberry32(9)).wrong, 0);     // 同樣的雜訊：開／關一次都沒錯

console.log('bits.test.mjs ok');
