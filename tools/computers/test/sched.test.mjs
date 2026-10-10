import assert from 'node:assert/strict';
import { APPS3, STUTTER, WASTE, WIDGET_SLICES, at, done, orders, roundRobin, worstGap } from '../src/sched.js';

// 基本性質：每個程式做的量等於它需要的量；時間軸首尾相接；總時間＝工作＋換手
for (const n of [1, 2, 3, 4]) for (const slice of [1, 2, 3, 4, 6, 12, 20]) for (const sw of [0, 1, 2]) {
  const jobs = orders(n), s = roundRobin(jobs, slice, sw);
  for (const j of jobs) assert.equal(done(s, j.id, s.total), j.work);
  for (let i = 1; i < s.segs.length; i++) assert.equal(s.segs[i].t0, s.segs[i - 1].t1);
  assert.equal(s.segs[0].t0, 0); assert.equal(s.total, s.work + s.switchTime);
  assert.equal(Math.max(...Object.values(s.finish)), s.total);
}
// 只有一個程式：完全不用換手
const one = roundRobin(orders(1), 3, 1);
assert.equal(one.total, 12); assert.equal(one.switchTime, 0); assert.equal(one.segs.length, 1);

// 模型的四個示範（四張點單、每張 12 拍、換手 1 拍）
const S = (slice, n = 4) => roundRobin(orders(n), slice, 1);
const long = S(12);          // 一張做完才換下一張
assert.equal(long.total, 51); assert.equal(long.switchTime, 3); assert.equal(long.firstStart.download, 39); assert.equal(worstGap(long), 39);
const mid = S(3);            // 每張做 3 拍就換
assert.equal(mid.total, 63); assert.equal(mid.switchTime, 15); assert.equal(mid.firstStart.download, 12); assert.equal(worstGap(mid), 13);
assert.equal(Math.round(mid.switchShare * 100), 24);
const tiny = S(1);           // 每張做 1 拍就換：快一半的時間在換手
assert.equal(tiny.total, 95); assert.equal(tiny.switchTime, 47); assert.equal(worstGap(tiny), 7); assert.equal(Math.round(tiny.switchShare * 100), 49);
assert.equal(Math.round(long.switchShare * 100), 6);
// 時間片越短：等最久的時間越短，但全部做完越晚
assert.ok(worstGap(tiny) < worstGap(mid) && worstGap(mid) < worstGap(long));
assert.ok(tiny.total > mid.total && mid.total > long.total);
assert.equal(at(long, 0).id, 'music'); assert.equal(at(long, 12).id, null); assert.equal(at(long, 13).id, 'essay'); assert.equal(at(long, 999), null);
assert.equal(done(mid, 'music', 3), 3); assert.equal(done(mid, 'essay', 3), 0);

// 小工具（下載 24、作文 12、音樂 12；音樂排最後）：每一種時間片的數字
const T = Object.fromEntries(WIDGET_SLICES.map((k) => [k, roundRobin(APPS3, k, 1)]));
const row = (k) => [T[k].total, T[k].maxGap.music, Math.round(T[k].switchShare * 100)];
assert.deepEqual(WIDGET_SLICES.map(row), [[84, 5, 43], [66, 7, 27], [60, 9, 20], [57, 11, 16], [54, 15, 11], [54, 18, 11], [51, 26, 6], [50, 38, 4]]);
// 三個區：太短（換手太多）、剛好、太長（音樂會卡）
const zone = (k) => (T[k].switchShare >= WASTE ? 'waste' : T[k].maxGap.music > STUTTER ? 'stutter' : 'ok');
assert.deepEqual(WIDGET_SLICES.map(zone), ['waste', 'ok', 'ok', 'stutter', 'stutter', 'stutter', 'stutter', 'stutter']);
console.log('sched.test.mjs ok');
