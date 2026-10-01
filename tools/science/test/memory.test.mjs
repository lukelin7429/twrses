// 萬物原理第八課：位元與記憶體計算的檢查
import assert from 'node:assert/strict';
import { encode, decode, toBits, fromBits, charSpans, leak, readBit, timeToForget, photoBits, bitsToMB } from '../src/memcalc.js';

assert.deepEqual(encode('A'), [65]);                                  // A＝65
assert.deepEqual(toBits(65), [0, 1, 0, 0, 0, 0, 0, 1]);                // ＝01000001
assert.equal(fromBits([0, 1, 0, 0, 0, 0, 0, 1]), 65);
for (let b = 0; b < 256; b++) assert.equal(fromBits(toBits(b)), b);    // 8 個位元剛好 256 種
assert.equal(encode('HELLO').length, 5);
assert.equal(encode('彰').length, 3);                                  // 中文字 3 個位元組
assert.equal(encode('彰化').length, 6);
assert.equal(encode('😀').length, 4);                                  // emoji 4 個
assert.equal(decode(encode('彰化 Changhua')), '彰化 Changhua');        // 存進去、讀出來一樣
assert.deepEqual(encode('ABC彰化', 7), encode('ABC彰'));               // 截斷不切開中文字
assert.deepEqual(charSpans('A彰').map((s) => [s.ch, s.start, s.n]), [['A', 0, 1], ['彰', 1, 3]]);

// DRAM：漏電；門檻一半；有刷新就記得、沒刷新就忘
assert.equal(readBit(leak(1, 1, 6)), 1);
assert.equal(readBit(leak(1, 10, 6)), 0);
assert.ok(Math.abs(timeToForget(6) - 4.159) < 0.01);
assert.ok(2.5 < timeToForget(4));                                     // 模型每 2.5 秒刷新，最快漏的格子（tau 4）也來得及
assert.equal(readBit(leak(1, 1e6, Infinity)), 1);                     // 快閃記憶體不漏

// 照片：1,200 萬像素 × 24 位元＝2 億 8,800 萬個位元＝36 MB（壓縮前）
assert.equal(photoBits(12e6), 288e6);
assert.equal(bitsToMB(photoBits(12e6)), 36);
// 128 GB 的手機約 1 兆個位元
assert.equal(128e9 * 8, 1.024e12);
console.log('memory.test: all passed');
