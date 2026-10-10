import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FACING, LEVELS, PROGS, ROOMS, build, count, facingAnswer, ifWall, parseLevel, rep, run, seq, wallAhead } from '../src/robot.js';

const lv = parseLevel(['..F', '.#.', '^..']);
assert.deepEqual(lv.start, { x: 0, y: 2, dir: 0 }); assert.deepEqual(lv.flag, { x: 2, y: 0 });
assert.equal(run(lv, seq('FFRFF')).result, 'goal');
assert.equal(run(lv, seq('FFRF')).result, 'end');                  // 少一步：做完了，沒到
const b = run(lv, seq('FFFRFF'));                                  // 多一步：撞牆，後面的不做了
assert.equal(b.result, 'bump'); assert.equal(b.steps.length, 3); assert.deepEqual(b.final, { x: 0, y: 0, dir: 0 });
assert.equal(run(lv, seq('RFLF')).result, 'bump');                 // 撞到中間那塊牆
assert.equal(wallAhead(lv, { x: 0, y: 2, dir: 3 }), true);         // 格子外面算牆
assert.equal(run(lv, [rep(1000, 'L')], 50).result, 'limit');
assert.equal(count(seq('FLFR')), 4); assert.equal(count([rep(4, 'FLFR')]), 5); assert.equal(count([rep(20, [ifWall('L'), { op: 'F' }])]), 4);
assert.throws(() => run(lv, [{ op: 'X' }]));

// 3D 的四個程式
const r = (k, room) => run(ROOMS[room || PROGS[k].room], PROGS[k].prog);
assert.equal(r('seq').result, 'goal'); assert.equal(r('seq').steps.length, 15); assert.equal(count(PROGS.seq.prog), 15);
assert.equal(r('loop').result, 'goal'); assert.equal(r('loop').steps.length, 15); assert.equal(count(PROGS.loop.prog), 5);
assert.deepEqual(r('seq').final, r('loop').final);
const bug = r('bug'); assert.equal(bug.result, 'end'); assert.equal(bug.steps.length, 14); assert.equal(count(PROGS.bug.prog), 14); assert.deepEqual(bug.final, { x: 0, y: 1, dir: 3 });
assert.equal(r('cond', 'roomA').result, 'goal'); assert.equal(r('cond', 'roomB').result, 'goal');
assert.notEqual(r('cond', 'roomA').steps.length, r('cond', 'roomB').steps.length);
// 沒有條件的固定走法，在另一個房間就不行
const fixedA = seq('FFFFFLFFFFFLFFFFFLFF');
assert.equal(run(ROOMS.roomA, fixedA).result, 'goal'); assert.notEqual(run(ROOMS.roomB, fixedA).result, 'goal');

// 小遊戲三關：標準解法走得到，而且用的指令數等於 par
for (const L of LEVELS) {
  const p = build(L.solution.tokens, L.solution.n);
  assert.equal(run(L.level, p).result, 'goal', L.key); assert.equal(count(p), L.par, L.key);
  assert.ok(L.solution.tokens.length <= L.max, L.key);
}
// 第二關：不用重複、只排四條以內走不到
assert.notEqual(run(LEVELS[1].level, build(['F', 'L', 'F', 'R'], 1)).result, 'goal');
// 第三關：只會前進、不看牆，就撞牆
assert.equal(run(LEVELS[2].level, build(['F', 'F'], 12)).result, 'bump');

// 八題「面向哪邊」：資料檔裡寫的答案要和算出來的一樣
assert.deepEqual(FACING.map(facingAnswer), ['E', 'S', 'E', 'N', 'E', 'E', 'W', 'W']);
const data = JSON.parse(readFileSync(new URL('../../../data/computers.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'what-is-a-program');
if (lesson) assert.deepEqual(lesson.facing.tasks.map((t) => t.answer), FACING.map(facingAnswer));
console.log('robot.test.mjs ok');
