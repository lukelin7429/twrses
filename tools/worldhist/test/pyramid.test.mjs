// 第四課「金字塔怎麼蓋」的幾何。node test/pyramid.test.mjs
import assert from 'node:assert/strict';
import { KINDS, pyramidVolume, builtFraction, heightForFraction, halfAt, ramp, pathLength, straightRampVolume } from '../src/pyramid.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} ≉ ${b}`);
const B = 230, H = 146;
near(pyramidVolume(3, 3), 9);
near(builtFraction(0), 0); near(builtFraction(1), 1);
near(builtFraction(0.5), 0.875);                      // 蓋到一半高，已經放了八分之七的石頭
assert.ok(builtFraction(1 / 3) > 0.7);                 // 三分之一的高度，七成的石頭
for (const f of [0, 0.1, 0.5, 0.875, 0.99, 1]) near(builtFraction(heightForFraction(f)), f, 1e-12);
near(heightForFraction(0.5), 1 - Math.cbrt(0.5));
assert.ok(heightForFraction(0.5) < 0.21);              // 放了一半的石頭時，還不到兩成的高度
near(halfAt(B, H, 0), 115); near(halfAt(B, H, 1), 0); near(halfAt(B, H, 0.5), 57.5);
// 體積和金字塔一樣，用切片加總驗證
{
  let v = 0; const n = 2000;
  for (let i = 0; i < n; i++) { const y = (i + 0.5) / n; const w = 2 * halfAt(B, H, y); v += w * w * H / n; }
  near(v / pyramidVolume(B, H), 1, 1e-5);
}
// 坡道：每一種都從地面開始、結束在目前的頂層高度；不會穿過金字塔外面太遠
for (const k of KINDS) {
  for (const p of [0.1, 0.37, 0.6, 1]) {
    const path = ramp(k, B, H, p);
    assert.ok(path.length >= 2, `${k} ${p}`);
    near(path[0].y, 0); near(path[path.length - 1].y, H * p, 1e-9);
    for (let i = 1; i < path.length; i++) assert.ok(path[i].y >= path[i - 1].y - 1e-9, `${k} goes down`);
    for (const q of path) {
      const r = Math.max(Math.abs(q.x), Math.abs(q.z)), edge = halfAt(B, H, q.y / H);
      if (k === 'internal') assert.ok(r <= edge + 1e-9, 'internal ramp stays inside');
      if (k === 'spiral' || k === 'zigzag') assert.ok(Math.abs(r - edge) < edge * 0.05 + 1e-6 || r < edge, `${k} hugs the faces`);
    }
  }
  assert.deepEqual(ramp(k, B, H, 0), []);
}
assert.throws(() => ramp('teleport', B, H, 0.5), RangeError);
// 直坡道越蓋越長，到頂端時是高度的 10 倍（坡度 1:10）而且體積會變得非常大
{
  const L = (p) => pathLength(ramp('straight', B, H, p));
  assert.ok(L(1) > L(0.5) * 1.9);
  near(L(1), Math.hypot(H * 10, H), 1e-6);
  assert.ok(straightRampVolume(H, 1) > 0.15 * pyramidVolume(B, H));
  near(straightRampVolume(H, 0.5), straightRampVolume(H, 1) / 4);
}
// 繞著面走的螺旋，越往上每一面越短，坡就越陡：最後一段比 1:10 陡得多（這是它的難題之一）
{
  const s = ramp('spiral', B, H, 1), a = s[s.length - 2], z = s[s.length - 1];
  const run = Math.hypot(z.x - a.x, z.z - a.z), rise = z.y - a.y;
  assert.ok(run / rise < 10, 'top leg steeper than 1:10');
  const f = ramp('spiral', B, H, 1); assert.ok(Math.hypot(f[1].x - f[0].x, f[1].z - f[0].z) / (f[1].y - f[0].y) > 10, 'bottom leg gentler');
}
console.log('pyramid.test.mjs ok');
