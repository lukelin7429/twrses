/*
 * 電腦概論 · 第三課「邏輯閘」的純函式（不碰 DOM、不碰 three.js；npm test）。輸入輸出一律是 0 或 1。
 *
 *   AND(a, b) / OR(a, b) / NOT(a) / XOR(a, b)
 *   GATES                    三種基本閘：{ key, inputs（幾個輸入）, fn, en, zh, sym }
 *   truthTable(key)          一個閘的真值表：[{ a, b, out }]（NOT 只有 a）
 *   evalCircuit(spec, a, b)  「接閘」小遊戲的電路：spec = { gate: 'and'|'or', notA, notB, notOut }
 *   circuitTable(spec)       這個電路四種輸入的輸出：[00, 01, 10, 11]（順序 a b）
 *   PUZZLES                  六題「把閘接起來」：{ key, target（四個輸出）, 答案 spec }
 *   solved(spec, puzzle)     四列都對了沒
 *   sameTable(a, b)
 *   exprText(spec)           「NOT A AND B」
 *   makeQuestion(rng, i)     真值表測驗的一題（越後面越難）：{ text, a, b, answer }
 */

export const AND = (a, b) => (a && b ? 1 : 0);
export const OR = (a, b) => (a || b ? 1 : 0);
export const NOT = (a) => (a ? 0 : 1);
export const XOR = (a, b) => (a !== b ? 1 : 0);

export const GATES = {
  and: { key: 'and', inputs: 2, fn: AND, en: 'AND', zh: '而且' },
  or: { key: 'or', inputs: 2, fn: OR, en: 'OR', zh: '或者' },
  not: { key: 'not', inputs: 1, fn: NOT, en: 'NOT', zh: '不是' },
};

export function truthTable(key) {
  const g = GATES[key];
  if (g.inputs === 1) return [0, 1].map((a) => ({ a, out: g.fn(a) }));
  const rows = [];
  for (const a of [0, 1]) for (const b of [0, 1]) rows.push({ a, b, out: g.fn(a, b) });
  return rows;
}

export function evalCircuit(spec, a, b) {
  const x = spec.notA ? NOT(a) : a, y = spec.notB ? NOT(b) : b;
  const out = spec.gate === 'or' ? OR(x, y) : AND(x, y);
  return spec.notOut ? NOT(out) : out;
}

export const circuitTable = (spec) => [[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => evalCircuit(spec, a, b));
export const sameTable = (p, q) => p.length === q.length && p.every((v, i) => v === q[i]);

export const PUZZLES = [
  { key: 'alarm', target: [0, 0, 0, 1], answer: { gate: 'and' } },
  { key: 'bell', target: [0, 1, 1, 1], answer: { gate: 'or' } },
  { key: 'play', target: [0, 1, 0, 0], answer: { gate: 'and', notA: true } },
  { key: 'belt', target: [0, 0, 1, 0], answer: { gate: 'and', notB: true } },
  { key: 'umbrella', target: [1, 0, 1, 1], answer: { gate: 'or', notB: true } },
  { key: 'dark', target: [1, 0, 0, 0], answer: { gate: 'and', notA: true, notB: true } },
];

export const solved = (spec, puzzle) => sameTable(circuitTable(spec), puzzle.target);

export function exprText(spec, and = 'AND', or = 'OR', not = 'NOT') {
  const a = spec.notA ? `${not} A` : 'A', b = spec.notB ? `${not} B` : 'B';
  return `${a} ${spec.gate === 'or' ? or : and} ${b}`;
}

/** 八題：1–2 題 AND、3–4 題 OR、5 題 NOT、6–8 題兩個閘接在一起。 */
export function makeQuestion(rng, i) {
  const a = rng() < 0.5 ? 0 : 1, b = rng() < 0.5 ? 0 : 1;
  if (i < 2) return { text: 'A AND B', a, b, answer: AND(a, b) };
  if (i < 4) return { text: 'A OR B', a, b, answer: OR(a, b) };
  if (i < 5) return { text: 'NOT A', a, b: null, answer: NOT(a) };
  const kinds = [
    { text: 'NOT (A AND B)', f: () => NOT(AND(a, b)) },
    { text: 'NOT (A OR B)', f: () => NOT(OR(a, b)) },
    { text: '(NOT A) AND B', f: () => AND(NOT(a), b) },
    { text: 'A OR (NOT B)', f: () => OR(a, NOT(b)) },
    { text: '(NOT A) OR (NOT B)', f: () => OR(NOT(a), NOT(b)) },
  ];
  const k = kinds[Math.floor(rng() * kinds.length)];
  return { text: k.text, a, b, answer: k.f() };
}
