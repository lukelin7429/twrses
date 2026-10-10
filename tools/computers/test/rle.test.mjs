import assert from 'node:assert/strict';
import { COLORS, PICS, PIC_KEYS, changed, decode, downsample, encode, encodeRow, kept, numbers, pixels, runCount } from '../src/rle.js';

assert.deepEqual(encodeRow('rrrrrwwb'), [[5, 'r'], [2, 'w'], [1, 'b']]);
assert.deepEqual(encodeRow('rwrw'), [[1, 'r'], [1, 'w'], [1, 'r'], [1, 'w']]);
// 每一張圖：16×16、顏色都有名字、解開後和原圖完全一樣
const N = {};
for (const k of PIC_KEYS) {
  const rows = PICS[k]; assert.equal(rows.length, 16); rows.forEach((r) => { assert.equal(r.length, 16); for (const c of r) assert.ok(COLORS[c], `${k} ${c}`); });
  const runs = encode(rows); assert.deepEqual(decode(runs), rows, k); assert.equal(pixels(rows), 256);
  N[k] = numbers(runs); assert.equal(N[k], runCount(runs) * 2);
}
console.log('numbers', JSON.stringify(N));
assert.equal(N.hstripes, 32); assert.equal(N.vstripes, 512); assert.equal(N.noise, 512);   // 橫條 16 段；直條與雜亂每格一段，變成兩倍
assert.equal(N.sky, 48); assert.equal(N.apple, 156);
// 橫條和直條是同一種條紋轉 90 度
assert.deepEqual(PICS.vstripes.map((_, x) => PICS.vstripes.map((r) => r[x]).join('')), PICS.hstripes);
// 失真：k = 1 完全不變；k 越大留下的數越少、改掉的格子越多；改掉的拿不回來（再做一次也一樣）
const a = PICS.apple;
assert.deepEqual(downsample(a, 1), a); assert.deepEqual([1, 2, 4, 8].map((k) => kept(a, k)), [256, 64, 16, 4]);
const ch = [2, 4, 8].map((k) => changed(a, downsample(a, k))); console.log('changed', JSON.stringify(ch));
assert.deepEqual(ch, [41, 74, 116]);
assert.deepEqual(downsample(downsample(a, 4), 4), downsample(a, 4));
console.log('rle.test.mjs ok');
