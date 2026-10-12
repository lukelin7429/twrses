import assert from 'node:assert/strict';
import { BITS, CAESAR_KEYS, MESSAGES, SPY_ROUNDS, bruteForce, digits, group, keyCount, shift, unshift } from '../src/cipher.js';

// Britannica 的例子：位移 4，CIPHER → GMTLIV；整句也對
assert.equal(shift('CIPHER', 4), 'GMTLIV');
assert.equal(shift('THIS IS AN ARTICLE ABOUT THE CAESAR CIPHER', 4), 'XLMW MW ER EVXMGPI EFSYX XLI GEIWEV GMTLIV');
// ROT13：做兩次回到原文；CODE → PBQR
assert.equal(shift('CODE', 13), 'PBQR'); assert.equal(shift(shift('CODE', 13), 13), 'CODE');
// 凱撒自己用的位移 3
assert.equal(shift('ABC XYZ', 3), 'DEF ABC'); assert.equal(shift('abc xyz', 3), 'def abc');
// 位移 0 與 26 不變；負的與超過 26 的照樣繞
assert.equal(shift('Hello, World! 123', 0), 'Hello, World! 123'); assert.equal(shift('Hello', 26), 'Hello'); assert.equal(shift('A', -1), 'Z'); assert.equal(shift('A', 27), 'B');
// 字母以外原樣不動
assert.equal(shift('3 pm, 你好!', 5), '3 ur, 你好!');
// 每一句訊息、每一種位移：加密再解密等於原文；而且加密後真的不一樣
for (const m of [...MESSAGES, ...SPY_ROUNDS.map((r) => r.plain)]) for (let k = 1; k <= 25; k++) { const c = shift(m, k); assert.notEqual(c, m); assert.equal(unshift(c, k), m); }
// 兩次位移等於一次（2 再 3 等於 5）
assert.equal(shift(shift('SECRET', 2), 3), shift('SECRET', 5));
// 暴力嘗試：25 種裡剛好有一種是原文，而且就是第 k 種
assert.equal(CAESAR_KEYS, 25);
for (const r of SPY_ROUNDS) { const tries = bruteForce(shift(r.plain, r.k)); assert.equal(tries.length, 25); assert.deepEqual(tries.filter((t) => t.text === r.plain).map((t) => t.k), [r.k]); }
// 模型的示範：MEET ME AT NOON 位移 3；用錯金鑰（4）解出來不是原文
assert.equal(shift('MEET ME AT NOON', 3), 'PHHW PH DW QRRQ'); assert.equal(unshift('PHHW PH DW QRRQ', 4), 'LDDS LD ZS MNNM');
// 金鑰有幾把
assert.equal(keyCount(1), 2n); assert.equal(keyCount(5), 32n); assert.ok(keyCount(5) > 25n && keyCount(4) < 25n);
assert.equal(group(keyCount(8)), '256'); assert.equal(group(keyCount(16)), '65,536'); assert.equal(group(keyCount(32)), '4,294,967,296');
assert.equal(group(keyCount(64)), '18,446,744,073,709,551,616');
assert.equal(group(keyCount(128)), '340,282,366,920,938,463,463,374,607,431,768,211,456'); assert.equal(digits(keyCount(128)), 39); assert.equal(digits(keyCount(256)), 78);
for (let i = 1; i < BITS.length; i++) assert.ok(keyCount(BITS[i]) > keyCount(BITS[i - 1]));
assert.equal(keyCount(129), keyCount(128) * 2n);                 // 每多一個位元，金鑰的數目加倍
console.log('cipher.test.mjs ok');
