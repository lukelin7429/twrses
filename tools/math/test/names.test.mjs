// 數字唸法的測試：node test/names.test.mjs
import assert from 'node:assert/strict';
import { baseDigitsEn, baseDigitsZh, enWords, placeNameEn, placeNameZh, placeOneEn, zhWords } from '../src/names.js';

// 美式英文：整數裡不加 and；21–99 有連字號
const EN = {
  0: 'zero', 7: 'seven', 10: 'ten', 13: 'thirteen', 20: 'twenty', 21: 'twenty-one', 40: 'forty', 99: 'ninety-nine',
  100: 'one hundred', 101: 'one hundred one', 110: 'one hundred ten', 305: 'three hundred five', 350: 'three hundred fifty',
  999: 'nine hundred ninety-nine', 1000: 'one thousand', 1005: 'one thousand five', 1032: 'one thousand thirty-two',
  2026: 'two thousand twenty-six', 9999: 'nine thousand nine hundred ninety-nine', 10000: 'ten thousand',
  12345: 'twelve thousand three hundred forty-five', 100000: 'one hundred thousand', 1000000: 'one million',
  23000000: 'twenty-three million', 100000000: 'one hundred million', 1000000000: 'one billion',
  1000000001: 'one billion one',
};
for (const [n, w] of Object.entries(EN)) assert.equal(enWords(Number(n)), w);
for (let n = 0; n <= 9999; n++) { const w = enWords(n); assert.ok(!/\band\b/.test(w)); assert.ok(/^[a-z -]+$/.test(w)); }
assert.throws(() => enWords(-1));
assert.throws(() => enWords(1e12));

// 中文：四位一節；中間的空位唸一個「零」
const ZH = {
  0: '零', 7: '七', 10: '十', 13: '十三', 20: '二十', 21: '二十一', 99: '九十九', 100: '一百', 101: '一百零一', 110: '一百一十',
  305: '三百零五', 350: '三百五十', 999: '九百九十九', 1000: '一千', 1005: '一千零五', 1032: '一千零三十二', 1010: '一千零一十',
  2026: '二千零二十六', 9999: '九千九百九十九', 10000: '一萬', 10005: '一萬零五', 10500: '一萬零五百', 12345: '一萬二千三百四十五',
  100000: '十萬', 150000: '十五萬', 100015: '十萬零一十五', 1000000: '一百萬', 10000000: '一千萬', 23000000: '二千三百萬',
  100000000: '一億', 100000005: '一億零五', 1000000000: '十億', 123456789: '一億二千三百四十五萬六千七百八十九',
};
for (const [n, w] of Object.entries(ZH)) assert.equal(zhWords(Number(n)), w);
// 中文數字轉回來要等於原來的數（0–9,999 每一個，加上幾個大數）
const VAL = { 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
const UNIT = { 十: 10, 百: 100, 千: 1000 };
function back(s) {
  let total = 0, sec = 0, d = 0;
  for (const ch of s) {
    if (ch in VAL) d = VAL[ch];
    else if (ch in UNIT) { sec += (d || 1) * UNIT[ch]; d = 0; }
    else if (ch === '萬') { total += (sec + d) * 10000; sec = 0; d = 0; }
    else if (ch === '億') { total += (sec + d) * 100000000; sec = 0; d = 0; }
  }
  return total + sec + d;
}
for (let n = 0; n <= 9999; n++) assert.equal(back(zhWords(n)), n);
for (const n of [10000, 10005, 99999, 100000, 1234567, 100000000, 999999999999]) assert.equal(back(zhWords(n)), n);
for (let n = 0; n <= 9999; n++) assert.ok(!/零零|零$/.test(zhWords(n)) || n === 0);

// 別的進位制：一位一位唸
assert.equal(baseDigitsEn('1101'), 'one one zero one');
assert.equal(baseDigitsZh('1101'), '一一零一');
assert.equal(baseDigitsEn('23'), 'two three');

// 位名
assert.deepEqual([0, 1, 2, 3].map((i) => placeNameEn(i, 10)), ['ones', 'tens', 'hundreds', 'thousands']);
assert.deepEqual([0, 1, 2, 3].map((i) => placeNameZh(i, 10)), ['個位', '十位', '百位', '千位']);
assert.deepEqual([0, 1, 2, 3].map((i) => placeNameEn(i, 5)), ['ones', 'fives', 'twenty-fives', 'one hundred twenty-fives']);
assert.deepEqual([0, 1, 2, 3].map((i) => placeNameZh(i, 5)), ['一', '五', '二十五', '一百二十五']);
assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((i) => placeNameEn(i, 2)), ['ones', 'twos', 'fours', 'eights', 'sixteens', 'thirty-twos', 'sixty-fours', 'one hundred twenty-eights']);
assert.equal(placeOneEn(1, 10), 'ten');
assert.equal(placeOneEn(2, 5), 'twenty-five');

console.log('names.test.mjs ok');
