// 第二課「編碼」純函式的測試：node test/codes.test.mjs
import assert from 'node:assert/strict';
import {
  ART, PALETTE, PICTURE, asciiChar, audioBits, bytesToRows, charInfo, colorCount, hex2, parsePicture, pictureBits, rgbHex,
  rowsToBytes, sampleWave, wave,
} from '../src/codes.js';
import { bitString, toBits } from '../src/bits.js';

// 字元的編號：課文裡提到的每一個都自己算一遍
{
  const [A] = charInfo('A');
  assert.equal(A.code, 65); assert.equal(A.hex, 'U+0041'); assert.equal(A.bits, '1000001'); assert.deepEqual(A.utf8, [65]);
  assert.equal(bitString(toBits(65, 8)), '0100 0001');
  assert.equal('A'.charCodeAt(0), 65);                       // 課堂活動二在主控台打的那一行
  assert.equal(charInfo('a')[0].code, 97);                   // 小寫比大寫多 32
  assert.equal(charInfo('a')[0].code - A.code, 32);
  assert.equal(charInfo('Z')[0].code, 90);
  assert.equal(charInfo('0')[0].code, 48);                   // 字元「0」不是數 0
  assert.equal(charInfo(' ')[0].code, 32);
  const [yong] = charInfo('永');
  assert.equal(yong.code, 27704); assert.equal(yong.hex, 'U+6C38');   // 27704 也是教育部筆順學習網「永」的 ID
  assert.equal('永'.codePointAt(0).toString(16), '6c38');
  assert.equal(String.fromCodePoint(27704), '永');
  assert.equal(yong.utf8.length, 3);                         // UTF-8 裡一個中文字 3 個位元組
  assert.deepEqual(yong.utf8, [0xe6, 0xb0, 0xb8]);
  const [smile] = charInfo('😀');
  assert.equal(smile.hex, 'U+1F600'); assert.equal(smile.utf8.length, 4);
  assert.equal(charInfo('Hi 永😀').length, 5);                // 照碼位數，表情符號算一個
  assert.equal(charInfo('abcdefghijkl', 8).length, 8);
  assert.deepEqual(charInfo('HI').map((c) => c.code), [72, 73]);
  assert.deepEqual(charInfo('CAT').map((c) => c.code), [67, 65, 84]);
}
assert.equal('5'.charCodeAt(0), 53);                         // 迷思卡：字元「5」是 53 號
assert.equal(charInfo('P')[0].bits, '1010000'); assert.equal(charInfo('p')[0].bits, '1110000');   // Britannica 舉的例子
assert.equal(charInfo('B')[0].code, 66); assert.equal(charInfo('T')[0].code, 84);
assert.equal(parseInt('d6', 16), 214); assert.equal(parseInt('28', 16), 40);                      // #d62828
assert.equal(Math.round((65 / 255) * 100), 25);              // 0100 0001 當成紅色：25%
assert.equal(asciiChar(65), 'A'); assert.equal(asciiChar(126), '~'); assert.equal(asciiChar(32), ' ');
assert.equal(asciiChar(31), null); assert.equal(asciiChar(127), null); assert.equal(asciiChar(214), null);
assert.equal(2 ** 7, 128);                                   // 7 位元：128 個編號

// 像素牆的圖：16 × 16，每個字元都在調色盤裡，每個數都在 0–255
assert.equal(PICTURE.length, 16);
for (const row of PICTURE) { assert.equal(row.length, 16); for (const c of row) assert.ok(PALETTE[c], `調色盤沒有 ${c}`); }
{
  const px = parsePicture();
  assert.equal(px.length, 256);
  assert.ok(px.every((p) => p.length === 3 && p.every((v) => Number.isInteger(v) && v >= 0 && v <= 255)));
  px[0][0] = 0; assert.equal(PALETTE['.'][0], 245);          // 改畫面不會改到調色盤
}
assert.equal(pictureBits(16, 16), 6144);                     // 256 個像素 × 3 個數 × 8 位元
assert.equal(pictureBits(16, 16) / 8, 768);                  // ＝768 個位元組
assert.equal(colorCount(8), 16777216);                       // 256 × 256 × 256
assert.equal(256 * 256 * 256, 16777216);
assert.equal(colorCount(1), 8);
assert.equal(4000 * 3000, 12000000);                         // 課文的照片例子：1,200 萬個像素
assert.equal(pictureBits(4000, 3000) / 8, 36000000);         // 沒壓縮＝3,600 萬個位元組
assert.equal(hex2(5), '05'); assert.equal(rgbHex([214, 40, 40]), '#d62828'); assert.equal(rgbHex([255, 255, 255]), '#ffffff');

// 黑白像素畫：每列一個位元組，來回轉得回來
for (const [name, bytes] of Object.entries(ART)) {
  assert.equal(bytes.length, 8, name);
  assert.ok(bytes.every((b) => b >= 0 && b <= 255));
  const grid = bytesToRows(bytes);
  assert.equal(grid.length, 64);
  assert.deepEqual(rowsToBytes(grid), bytes);
}
assert.deepEqual(rowsToBytes([1, 0, 0, 0, 0, 0, 0, 1]), [129]);   // 最左邊 128 ＋ 最右邊 1
assert.deepEqual(ART.heart, [0, 102, 255, 255, 255, 126, 60, 24]);
assert.equal(8 * 8, 64);                                      // 64 格＝64 個位元＝8 個位元組

// 聲音取樣
for (let k = 0; k <= 100; k++) { const v = wave(k / 100); assert.ok(v >= 0 && v <= 1); }
{
  const s = sampleWave(8, 2);
  assert.equal(s.samples.length, 8); assert.equal(s.levels, 4); assert.equal(s.totalBits, 16);
  assert.ok(s.samples.every((p) => Number.isInteger(p.level) && p.level >= 0 && p.level < 4));
  // 位元越多，量到的數離真正的高度越近：誤差不超過半格
  for (const bits of [1, 2, 3, 4, 8]) { const r = sampleWave(64, bits); for (const p of r.samples) assert.ok(Math.abs(p.q - p.v) <= 0.5 / r.levels + 1e-9); }
  assert.equal(sampleWave(64, 8).levels, 256);
  assert.equal(2 ** 16, 65536);                               // 16 位元：65,536 種高度
}
assert.equal(audioBits(44100, 16, 1, 1), 705600);             // 每秒量 44,100 次 × 16 位元＝705,600 個位元（一個聲道）

console.log('codes.test.mjs ok');
