/*
 * 電腦概論 · 第六課「小處理器」的模擬器（純函式：不碰 DOM、不碰 three.js；npm test）。
 * **這是自己設計的教學用處理器，不是任何真實的指令集。**
 *
 * 記憶體：8 格（位址 0–7）。每一格放一條指令 { op, arg } 或一個數 { num }（0–255）。
 * 暫存器：pc（程式計數器：下一條指令在第幾格）、ir（指令暫存器：正在看的那一條）、a（累加器：手上的那個數）。
 * 五種指令：
 *   LOAD n    把第 n 格的數抄進 A
 *   ADD n     把第 n 格的數加到 A 上（用第四課的加法器 addBits，八位元；超過 255 就繞回去）
 *   STORE n   把 A 抄到第 n 格
 *   JUMP n    下一條改成從第 n 格拿
 *   STOP      停
 * 一條指令分三個小步驟（phase）：fetch（拿）→ decode（看懂）→ execute（照做，然後計數器加一）。
 *
 *   I(op, arg) / N(num)        建一格
 *   makeState(cells)           → { mem, pc, ir, a, phase, halted, error, done（做完幾條） }
 *   tick(state)                走一個小步驟，回傳 { state（新的，不改舊的）, event }
 *                              event = { phase, op, arg, from, to, value, pc, text: 'fetch'|… }
 *   runInstruction(state)      走完一整條（三個小步驟）
 *   run(state, max)            一直跑到停或做滿 max 條；回傳 { state, trace（每條一筆） }
 *   cellText(cell)             'LOAD 5'、'3'、''
 *   PROGRAMS                   add34（3 + 4）、count（一直加一，用 JUMP 繞回去）
 *   CARDS                      「自己排程式」可以選的指令卡
 *   checkAdd(slots)            四個空格排好的程式能不能把 3 + 4 算進第 7 格並停下來：{ ok, reason, trace, state }
 *   makePrediction(rng)        「猜下一步」的一題：{ text 用的資料, answer, options }
 */
import { addBits } from './adder.js';
import { fromBits, toBits } from './bits.js';

export const OPS = ['LOAD', 'ADD', 'STORE', 'JUMP', 'STOP'];
export const SIZE = 8;
export const I = (op, arg) => (op === 'STOP' ? { op } : { op, arg });
export const N = (num) => ({ num });
const EMPTY = () => ({ num: 0, blank: true });

export function makeState(cells) {
  const mem = Array.from({ length: SIZE }, (_, i) => (cells[i] ? { ...cells[i] } : EMPTY()));
  return { mem, pc: 0, ir: null, a: 0, phase: 'fetch', halted: false, error: null, done: 0 };
}

export const cellText = (c) => (!c ? '' : c.op ? (c.op === 'STOP' ? 'STOP' : `${c.op} ${c.arg}`) : c.blank ? '' : String(c.num));
const clone = (s) => ({ ...s, mem: s.mem.map((c) => ({ ...c })), ir: s.ir ? { ...s.ir } : null });
/** 用第四課的加法器把兩個 0–255 的數加起來（八位元，進位掉出去就繞回去）。 */
export function add8(x, y) { const r = addBits(toBits(x, 8), toBits(y, 8)); return { value: fromBits(r.bits.slice(0, 8)), overflow: r.overflow }; }

export function tick(state) {
  if (state.halted) return { state, event: { phase: 'halted' } };
  const s = clone(state);
  if (s.phase === 'fetch') {
    if (s.pc < 0 || s.pc >= SIZE) { s.halted = true; s.error = 'range'; return { state: s, event: { phase: 'error', error: 'range', pc: state.pc } }; }
    s.ir = { ...s.mem[s.pc] }; s.phase = 'decode';
    return { state: s, event: { phase: 'fetch', pc: s.pc, from: s.pc, cell: s.ir } };
  }
  if (s.phase === 'decode') {
    if (!s.ir.op) { s.halted = true; s.error = 'notinstruction'; return { state: s, event: { phase: 'error', error: 'notinstruction', pc: s.pc, cell: s.ir } }; }
    s.phase = 'execute';
    return { state: s, event: { phase: 'decode', op: s.ir.op, arg: s.ir.arg, pc: s.pc } };
  }
  // execute
  const { op, arg } = s.ir, ev = { phase: 'execute', op, arg, pc: s.pc };
  const num = (i) => (s.mem[i] && !s.mem[i].op ? s.mem[i].num : 0);
  if (op === 'LOAD') { s.a = num(arg); ev.value = s.a; s.pc += 1; }
  else if (op === 'ADD') { const r = add8(s.a, num(arg)); ev.x = s.a; ev.y = num(arg); s.a = r.value; ev.value = s.a; ev.overflow = r.overflow; s.pc += 1; }
  else if (op === 'STORE') { s.mem[arg] = { num: s.a }; ev.value = s.a; s.pc += 1; }
  else if (op === 'JUMP') { s.pc = arg; }
  else if (op === 'STOP') { s.halted = true; }
  ev.next = s.pc; s.done += 1; s.phase = 'fetch';
  return { state: s, event: ev };
}

export function runInstruction(state) {
  let s = state; const events = [];
  for (let k = 0; k < 3 && !s.halted; k++) { const r = tick(s); s = r.state; events.push(r.event); if (r.event.phase === 'execute' || r.event.phase === 'error') break; }
  return { state: s, events };
}

export function run(state, max = 50) {
  let s = state; const trace = [];
  while (!s.halted && s.done < max) {
    const before = s.done, r = runInstruction(s); s = r.state;
    const last = r.events[r.events.length - 1];
    trace.push({ ...last, a: s.a });
    if (s.done === before && !s.halted) break;
  }
  return { state: s, trace };
}

export const PROGRAMS = {
  add34: [I('LOAD', 5), I('ADD', 6), I('STORE', 7), I('STOP'), null, N(3), N(4), N(0)],
  count: [I('LOAD', 6), I('ADD', 7), I('STORE', 6), I('JUMP', 0), null, null, N(0), N(1)],
};

export const CARDS = [I('LOAD', 5), I('LOAD', 6), I('ADD', 5), I('ADD', 6), I('STORE', 7), I('STORE', 5), I('JUMP', 0), I('STOP')];

/** slots：四個指令（或 null），放進第 0–3 格；第 5、6、7 格是 3、4、0。 */
export function checkAdd(slots) {
  const cells = [slots[0], slots[1], slots[2], slots[3], null, N(3), N(4), N(0)];
  const r = run(makeState(cells), 24), s = r.state;
  let reason = 'ok';
  if (s.error) reason = s.error;
  else if (!s.halted) reason = 'forever';
  else if (s.mem[7].num !== 7) reason = s.mem[5].num !== 3 ? 'spoiled' : 'wrong';
  return { ok: reason === 'ok', reason, trace: r.trace, state: s };
}

export function makePrediction(rng) {
  const op = ['LOAD', 'ADD', 'ADD', 'STORE', 'JUMP'][Math.floor(rng() * 5)];
  const a = 1 + Math.floor(rng() * 20), m = 1 + Math.floor(rng() * 20), arg = 5 + Math.floor(rng() * 3), pc = Math.floor(rng() * 4);
  const target = op === 'JUMP' ? Math.floor(rng() * 4) : arg;
  let ask, answer;
  if (op === 'LOAD') { ask = 'a'; answer = m; }
  else if (op === 'ADD') { ask = 'a'; answer = add8(a, m).value; }
  else if (op === 'STORE') { ask = 'cell'; answer = a; }
  else { ask = 'pc'; answer = target; }
  const pool = [a, m, a + m, Math.abs(a - m), pc + 1, target, arg, answer + 1, answer + 2, 0];
  const options = [answer];
  for (const v of pool) { if (options.length === 4) break; if (v >= 0 && !options.includes(v)) options.push(v); }
  for (let v = 1; options.length < 4; v++) if (!options.includes(v)) options.push(v);
  for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
  return { op, arg: target, a, m, pc, ask, answer, options, correct: options.indexOf(answer) };
}
