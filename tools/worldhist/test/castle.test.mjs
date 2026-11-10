// 第十二課的純函式：四個階段、每個階段看得到哪些部分、圓周上的點與牆段、部分的檢查。node test/castle.test.mjs
import assert from 'node:assert/strict';
import { STAGES, stageIndex, partsAt, newAt, ringPoints, segments, checkParts } from '../src/castle.js';

assert.deepEqual(STAGES, ['motte', 'keep', 'curtain', 'concentric']);
assert.equal(stageIndex('curtain'), 2); assert.equal(stageIndex('moat'), -1);
const parts = [
  { key: 'motte', stages: ['motte'] },
  { key: 'palisade', stages: ['motte', 'keep'] },
  { key: 'keep', stages: ['keep', 'curtain', 'concentric'] },
  { key: 'curtain', stages: ['curtain', 'concentric'] },
  { key: 'outer', stages: ['concentric'] },
];
assert.deepEqual(partsAt(parts, 'keep').map((p) => p.key), ['palisade', 'keep']);
assert.deepEqual(newAt(parts, 'motte').map((p) => p.key), ['motte', 'palisade']);
assert.deepEqual(newAt(parts, 'curtain').map((p) => p.key), ['curtain']);
assert.deepEqual(newAt(parts, 'concentric').map((p) => p.key), ['outer']);
assert.equal(checkParts(parts), null);
assert.match(checkParts([...parts, { key: 'motte', stages: ['motte'] }]), /repeated/);
assert.match(checkParts([{ key: 'x', stages: ['motte', 'curtain'] }]), /consecutive/);
assert.match(checkParts([{ key: 'x', stages: ['tower'] }]), /unknown/);
assert.match(checkParts([{ key: 'x', stages: [] }]), /needs/);
// 圓周上的點：距離圓心都是 r；第一個點在 +z；相鄰點連成的牆段長度一樣、加起來接近圓周
const pts = ringPoints(8, 10);
for (const [x, z] of pts) assert.ok(Math.abs(Math.hypot(x, z) - 10) < 1e-9);
assert.ok(Math.abs(pts[0][0]) < 1e-9 && Math.abs(pts[0][1] - 10) < 1e-9);
const segs = segments(ringPoints(64, 10));
assert.equal(segs.length, 64);
assert.ok(segs.every((s) => Math.abs(s.len - segs[0].len) < 1e-9));
assert.ok(Math.abs(segs.reduce((a, s) => a + s.len, 0) - 2 * Math.PI * 10) < 0.05);
// 牆段的方向：從 (0,10) 到下一個點，角度沿著切線
const s0 = segments([[0, 0], [0, 5], [5, 5], [5, 0]])[0];
assert.equal(s0.len, 5); assert.equal(s0.cx, 0); assert.equal(s0.cz, 2.5); assert.ok(Math.abs(s0.angle) < 1e-9);
console.log('castle.test.mjs ok');
