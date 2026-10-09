// 第六課小處理器模擬器的測試：node test/cpu.test.mjs
import assert from 'node:assert/strict';
import { CARDS, I, N, OPS, PROGRAMS, SIZE, add8, cellText, checkAdd, makePrediction, makeState, run, runInstruction, tick } from '../src/cpu.js';
import { mulberry32 } from '../src/bits.js';

assert.equal(OPS.length, 5); assert.equal(SIZE, 8);
assert.equal(cellText(I('LOAD', 5)), 'LOAD 5'); assert.equal(cellText(I('STOP')), 'STOP'); assert.equal(cellText(N(3)), '3'); assert.equal(cellText(makeState([]).mem[0]), '');

// 3 + 4：四條指令，一共 12 個小步驟，第 7 格變成 7
{
  let s = makeState(PROGRAMS.add34);
  const phases = [];
  for (let k = 0; k < 40 && !s.halted; k++) { const r = tick(s); phases.push(r.event.phase); s = r.state; }
  assert.equal(phases.length, 12);
  assert.deepEqual(phases.slice(0, 6), ['fetch', 'decode', 'execute', 'fetch', 'decode', 'execute']);
  assert.equal(s.mem[7].num, 7); assert.equal(s.a, 7); assert.equal(s.done, 4); assert.equal(s.halted, true); assert.equal(s.error, null);
  assert.equal(s.mem[5].num, 3); assert.equal(s.mem[6].num, 4);     // 原來的兩個數還在
  assert.equal(4 * 3, 12);
}
// 一步一步看：拿（計數器指的那一格抄進指令暫存器）→ 看懂 → 照做，計數器加一
{
  const s0 = makeState(PROGRAMS.add34);
  const f = tick(s0); assert.equal(f.event.phase, 'fetch'); assert.equal(f.event.from, 0); assert.equal(cellText(f.state.ir), 'LOAD 5'); assert.equal(f.state.pc, 0);
  assert.equal(s0.ir, null);                                          // tick 不改舊的 state
  const d = tick(f.state); assert.equal(d.event.phase, 'decode'); assert.equal(d.event.op, 'LOAD'); assert.equal(d.event.arg, 5);
  const e = tick(d.state); assert.equal(e.event.phase, 'execute'); assert.equal(e.state.a, 3); assert.equal(e.state.pc, 1); assert.equal(e.event.next, 1);
  const r = runInstruction(e.state); assert.equal(r.state.a, 7); assert.equal(r.events.length, 3); assert.equal(r.events[2].x, 3); assert.equal(r.events[2].y, 4);
}
// 一直加一：JUMP 把計數器改回 0，所以永遠不會停
{
  const r = run(makeState(PROGRAMS.count), 40);
  assert.equal(r.state.halted, false); assert.equal(r.state.done, 40);
  assert.equal(r.state.mem[6].num, 10);                               // 每 4 條指令加一次：40 條 → 10
  assert.equal(r.trace.filter((t) => t.op === 'JUMP').length, 10);
  assert.ok(r.trace.filter((t) => t.op === 'JUMP').every((t) => t.next === 0));
  const long = run(makeState(PROGRAMS.count), 4 * 300);               // 八位元：數到 255 再加一就繞回 0
  assert.equal(long.state.mem[6].num, 300 - 256);
}
assert.deepEqual(add8(3, 4), { value: 7, overflow: false });
assert.deepEqual(add8(255, 1), { value: 0, overflow: true });
assert.deepEqual(add8(200, 100), { value: 44, overflow: true });
for (let x = 0; x < 256; x += 5) for (let y = 0; y < 256; y += 7) assert.equal(add8(x, y).value, (x + y) % 256);

// 出錯的情形：把一個數當成指令、計數器跑出記憶體
{
  const r = run(makeState([I('LOAD', 5), null, null, null, null, N(3)]), 10);
  assert.equal(r.state.halted, true); assert.equal(r.state.error, 'notinstruction'); assert.equal(r.state.done, 1);
  const out = run(makeState([I('JUMP', 7), null, null, null, null, null, null, I('LOAD', 0)]), 10);
  assert.equal(out.state.error, 'range');
}

// 「自己排程式」：正確答案、順序可以換、各種錯法
assert.equal(CARDS.length, 8);
assert.ok(checkAdd([I('LOAD', 5), I('ADD', 6), I('STORE', 7), I('STOP')]).ok);
assert.ok(checkAdd([I('LOAD', 6), I('ADD', 5), I('STORE', 7), I('STOP')]).ok);           // 4 + 3 也可以
assert.equal(checkAdd([I('LOAD', 5), I('ADD', 6), I('STORE', 7), I('JUMP', 0)]).reason, 'forever');
assert.equal(checkAdd([I('LOAD', 5), I('ADD', 6), I('STORE', 7), null]).reason, 'notinstruction');   // 忘了 STOP：跑去把空格當指令
assert.equal(checkAdd([I('ADD', 6), I('LOAD', 5), I('STORE', 7), I('STOP')]).reason, 'wrong');      // 順序錯：存進去的是 3
assert.equal(checkAdd([I('LOAD', 5), I('ADD', 5), I('STORE', 7), I('STOP')]).reason, 'wrong');      // 3 + 3
assert.equal(checkAdd([I('LOAD', 6), I('STORE', 5), I('ADD', 5), I('STOP')]).reason, 'spoiled');    // 把原來的 3 蓋掉了
assert.equal(checkAdd([I('STOP'), null, null, null]).reason, 'wrong');
assert.equal(checkAdd([I('LOAD', 5), I('ADD', 6), I('STORE', 7), I('STOP')]).trace.length, 4);

// 「猜下一步」：選項不重複、答案在裡面、答案和模擬器算的一樣
for (let seed = 1; seed <= 400; seed++) {
  const q = makePrediction(mulberry32(seed));
  assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4); assert.equal(q.options[q.correct], q.answer);
  const cells = [null, null, null, null, null, N(q.m), N(q.m), N(q.m)];
  cells[q.pc] = q.op === 'JUMP' ? I('JUMP', q.arg) : I(q.op, q.arg);
  let s = makeState(cells); s.pc = q.pc; s.a = q.a;
  s = runInstruction(s).state;
  const got = q.ask === 'a' ? s.a : q.ask === 'pc' ? s.pc : s.mem[q.arg].num;
  assert.equal(got, q.answer, `${q.op} ${q.arg}`);
}

// 課文裡的數：3.2 GHz＝每秒 32 億個週期
assert.equal(3.2 * 1e9, 3200000000);
assert.equal(1e9, 1000000000);

console.log('cpu.test.mjs ok');
