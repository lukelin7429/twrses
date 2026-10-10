import assert from 'node:assert/strict';
import { GLYPHS, KEYS, KEY_IDS, diff, hex, trace } from '../src/keypath.js';

const a = trace('KeyA'), A = trace('KeyA', true);
assert.equal(a.char, 'a'); assert.equal(a.code, 97); assert.equal(a.bits, '01100001');
assert.equal(A.char, 'A'); assert.equal(A.code, 65); assert.equal(A.bits, '01000001');
assert.equal(a.usage, 4); assert.equal(A.usage, 4); assert.equal(a.usageHex, '0x04');
const d = diff(a, A);
assert.equal(d.usage, false); assert.equal(d.char, true); assert.equal(d.memory, true); assert.equal(d.screen, true);
assert.equal(a.code ^ A.code, 32);                       // 大小寫只差一個位元
assert.equal(trace('Digit1').code, 49); assert.equal(trace('Digit1', true).char, '!'); assert.equal(trace('Digit1', true).code, 33);
assert.equal(trace('Digit1').usageHex, '0x1E');
const sp = trace('Space');
assert.equal(sp.code, 32); assert.equal(sp.bits, '00100000'); assert.equal(sp.lit, 0); assert.equal(sp.usageHex, '0x2C');
assert.equal(diff(sp, trace('Space', true)).char, false);
for (const id of KEY_IDS) for (const s of [false, true]) {
  const t = trace(id, s);
  assert.equal(t.rows.length, 7); t.rows.forEach((r) => assert.equal(r.length, 5));
  assert.equal(parseInt(t.bits, 2), t.code); assert.equal(t.usage, KEYS[id].usage);
}
for (const g of Object.values(GLYPHS)) assert.equal(g.join('').replace(/[.#]/g, ''), '');
assert.equal(hex(225), '0xE1');
assert.throws(() => trace('KeyQ'));
console.log('keypath.test.mjs ok');
