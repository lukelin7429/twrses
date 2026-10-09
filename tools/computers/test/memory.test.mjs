// 第七課「書桌與書櫃」純函式的測試：node test/memory.test.mjs
import assert from 'node:assert/strict';
import { APPS, ITEMS, edit, isDirty, makeDesk, onDesk, powerOff, powerOn, save, usage, use } from '../src/memory.js';

assert.equal(ITEMS.length, 8);
let s = makeDesk(4);
assert.equal(s.desk.length, 0); assert.equal(s.trips, 0);

// 第一次用：要走到書櫃抄一份過來；再用一次：已經在桌上，直接拿
let r = use(s, 'essay'); s = r.state;
assert.deepEqual(r.events.map((e) => e.type), ['fetch']); assert.equal(s.trips, 1); assert.ok(onDesk(s, 'essay'));
assert.equal(s.saved.essay, 1);                                  // 書櫃上的那一份還在（是抄一份，不是搬走）
r = use(s, 'essay'); s = r.state;
assert.deepEqual(r.events.map((e) => e.type), ['hit']); assert.equal(s.trips, 1); assert.equal(s.uses, 1);

// 桌子放滿四樣；開第五樣時，最久沒用的那一樣（essay）要先放回書櫃
for (const k of ['game', 'music', 'browser']) s = use(s, k).state;
assert.equal(s.desk.length, 4); assert.equal(s.trips, 4);
s = use(s, 'game').state;                                        // 用一下 game：它變成最近用過的
r = use(s, 'photos'); s = r.state;
assert.deepEqual(r.events.map((e) => `${e.type}:${e.id}`), ['evict:essay', 'fetch:photos']);
assert.equal(s.desk.length, 4); assert.ok(!onDesk(s, 'essay')); assert.ok(onDesk(s, 'game'));
assert.equal(s.trips, 6);                                        // 滿了之後開一樣東西：放回去一趟＋拿過來一趟＝兩趟
r = use(s, 'essay'); s = r.state;                                // 再把 essay 拿回來：又是兩趟（換 music 出去）
assert.deepEqual(r.events.map((e) => `${e.type}:${e.id}`), ['evict:music', 'fetch:essay']); assert.equal(s.trips, 8);

// 存檔與關機
s = makeDesk(4); s = use(s, 'essay').state; s = edit(s, 'essay');
assert.ok(isDirty(s, 'essay')); assert.equal(s.saved.essay, 1); assert.equal(s.work.essay, 2);
let off = powerOff(s);
assert.deepEqual(off.lost, ['essay']);                           // 沒存檔就關機：修改不見了
assert.equal(off.state.desk.length, 0); assert.equal(off.state.saved.essay, 1);
let on = powerOn(off.state); on = use(on, 'essay').state;
assert.equal(on.work.essay, 1); assert.ok(!isDirty(on, 'essay')); // 再打開是舊的版本
s = save(s, 'essay');
assert.ok(!isDirty(s, 'essay')); assert.equal(s.saved.essay, 2);
off = powerOff(s);
assert.deepEqual(off.lost, []);                                   // 存了再關機：什麼都沒丟
on = use(powerOn(off.state), 'essay').state;
assert.equal(on.work.essay, 2);
assert.deepEqual(use(off.state, 'game').events.map((e) => e.type), ['off']);   // 關機時什麼都不能用
assert.equal(edit(off.state, 'game'), off.state);

// 沒存檔的東西被擠出桌面：修改暫放在書櫃，拿回來還在；可是關機一樣會丟
s = makeDesk(2); s = use(s, 'essay').state; s = edit(s, 'essay'); s = use(s, 'game').state;
r = use(s, 'music'); s = r.state;
assert.deepEqual(r.events.map((e) => `${e.type}:${e.id}`), ['evict:essay', 'fetch:music']); assert.equal(r.events[0].dirty, true);
assert.ok(isDirty(s, 'essay')); assert.ok(!onDesk(s, 'essay'));
const back = use(s, 'essay').state;
assert.equal(back.work.essay, 2); assert.ok(isDirty(back, 'essay'));
assert.deepEqual(powerOff(s).lost, ['essay']);
assert.equal(powerOff(s).state.saved.essay, 1);

// 記憶體用量的示意
assert.deepEqual(usage(8, []), { used: 0, free: 8, over: 0, full: false });
assert.deepEqual(usage(8, ['browser', 'game']), { used: 7, free: 1, over: 0, full: false });
assert.deepEqual(usage(8, ['browser', 'game', 'music']), { used: 8, free: 0, over: 0, full: true });
assert.deepEqual(usage(8, ['browser', 'game', 'photos']), { used: 10, free: 0, over: 2, full: true });
assert.equal(Object.values(APPS).reduce((a, b) => a + b, 0), 14);   // 六個全開要 14，比 8 多 6
// 課文與活動裡的數：512 GB 是 16 GB 的 32 倍；1 TB 是 8 GB 的 125 倍
assert.equal(512 / 16, 32); assert.equal(1000 / 8, 125);

console.log('memory.test.mjs ok');
