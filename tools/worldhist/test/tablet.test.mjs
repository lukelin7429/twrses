// 第三課「在泥板上寫數字」。node test/tablet.test.mjs
import assert from 'node:assert/strict';
import { groups, marks, bounds, pressOrder, read, MAX } from '../src/tablet.js';

assert.deepEqual(groups(23), { sixties: 0, tens: 2, ones: 3 });
assert.deepEqual(groups(59), { sixties: 0, tens: 5, ones: 9 });
assert.deepEqual(groups(60), { sixties: 1, tens: 0, ones: 0 });
assert.deepEqual(groups(75), { sixties: 1, tens: 1, ones: 5 });
assert.deepEqual(groups(MAX), { sixties: 1, tens: 5, ones: 9 });
for (const bad of [0, -1, 120, 2.5, NaN]) assert.throws(() => groups(bad), RangeError);
assert.throws(() => marks(5, 'pencil'), RangeError);

for (let n = 1; n <= MAX; n++) for (const st of ['wedge', 'round']) {
  const ms = marks(n, st);
  assert.equal(read(ms), n, `${st} ${n}`);
  // 不重疊
  for (let i = 0; i < ms.length; i++) for (let j = i + 1; j < ms.length; j++) assert.ok(Math.hypot(ms[i].x - ms[j].x, ms[i].y - ms[j].y) > 0.5, `${st} ${n} overlap`);
  // 每排最多 3 個，所以最多 3 排、不會太寬
  const b = bounds(ms); assert.ok(b.h <= 3.5 && b.w <= 9, `${st} ${n} too big`);
  // 大的單位寫在左邊
  const xs = (k) => ms.filter((m) => m.kind === k).map((m) => m.x);
  if (xs('ten').length && xs('one').length) assert.ok(Math.max(...xs('ten')) < Math.min(...xs('one')));
  if (xs('sixty').length && xs('ten').length) assert.ok(Math.max(...xs('sixty')) < Math.min(...xs('ten')));
}
// 1 和 60 在楔形文字裡是同一個形狀，只是位置不同（中間空一格）
{
  const one = marks(1), sixty = marks(60), sixtyOne = marks(61);
  assert.equal(one.length, 1); assert.equal(sixty.length, 1); assert.equal(sixtyOne.length, 2);
  assert.ok(sixtyOne[1].x - sixtyOne[0].x > 1.0, 'a gap separates the 60s place');
}
// 筆順：60 → 10 → 1
{
  const ord = pressOrder(marks(75)).map((m) => m.kind);
  assert.deepEqual(ord, ['sixty', 'ten', 'one', 'one', 'one', 'one', 'one']);
}
console.log('tablet.test.mjs ok');
