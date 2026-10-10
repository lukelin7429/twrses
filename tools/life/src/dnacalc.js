/*
 * 第三課「DNA 是什麼？」的規則（life-dna.js 與 test/dna.test.mjs 共用）。
 * 四個字母 A、T、C、G；配對規則只有一條：A 配 T、C 配 G。複製＝把兩股拉開，各自照規則補上新的一股。
 */
export const LETTERS = ['A', 'T', 'C', 'G'];
export const PAIR = { A: 'T', T: 'A', C: 'G', G: 'C' };
export const START = 'ATGCCGTAAGCT';                                   // 模型裡的 12 個字母（示意，不是哪個真的基因）
export const partner = (seq) => [...seq].map((c) => PAIR[c]).join('');
export const next = (c) => LETTERS[(LETTERS.indexOf(c) + 1) % 4];
export const change = (seq, i) => seq.slice(0, i) + next(seq[i]) + seq.slice(i + 1);
export const diff = (a, b) => [...a].reduce((n, c, i) => n + (c !== b[i] ? 1 : 0), 0);
// 複製：兩份，每份一股舊的、一股新的；兩份讀起來一模一樣
export const copy = (seq) => { const p = partner(seq); return [{ old: seq, fresh: partner(seq) }, { old: p, fresh: partner(p) }]; };
export const opened = (pct, n) => Math.round((Math.min(100, Math.max(0, pct)) / 100) * n);
export const holding = (pct, changed) => (pct <= 0 ? (changed ? 'changed' : 'closed') : pct < 100 ? 'opening' : changed ? 'donechanged' : 'done');
// 頁面小工具：只留下四個字母；n 個字母可以排出 4 的 n 次方種訊息
export const clean = (s, max = 12) => String(s).toUpperCase().replace(/[^ATCG]/g, '').slice(0, max);
export const combos = (n) => 4 ** n;
