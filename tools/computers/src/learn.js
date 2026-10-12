/*
 * 電腦概論 · 第十五課「電腦怎麼『學習』？」的純函式（不碰 DOM、不碰 three.js；test/learn.test.mjs）。
 *
 * 機器學習：不寫規則，給有答案的例子，讓電腦一點一點調整自己。這裡用最簡單的一種——感知器（perceptron）：
 *   一條線 a·x + b·y + c = 0 把平面分成兩邊；看一個例子，分對了就不動，分錯了就把線往對的方向挪一點。
 * 資料是**自己編的示意資料**（不是量來的）：每個點是一顆水果，x＝重量、y＝有多紅（都是 0–10 的示意刻度），
 *   label +1＝蘋果、−1＝橘子。所有隨機都用固定種子，重開頁面結果都一樣。
 *
 *   makeSet(kind)   'clean'（24 顆，兩群分得開）／'few'（只有 4 顆）／'noisy'（clean 裡有幾顆的答案被標錯）
 *   init()          一開始的線（故意擺得很差）
 *   stepOnce(m, set)  看下一個例子，回 { model, i, wrong, moved }
 *   errors(m, pts)  現在分錯幾個　　train(set, limit)  一直學到一整輪都沒錯，或到上限
 *   TEST            沒看過的新水果（用來檢查學得好不好）
 */
import { mulberry32 } from './bits.js';

const TRUE = (x, y) => y - 0.6 * x - 2;            // 編資料時用的「真正的」分界（頁面上不畫）
function sample(seed, n, margin) {
  const rng = mulberry32(seed), out = [];
  while (out.length < n) {
    const label = out.length % 2 ? -1 : 1;
    const x = 1 + rng() * 8, y = 1 + rng() * 8, t = TRUE(x, y);
    if (label > 0 ? t > margin : t < -margin) out.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, label });
  }
  return out;
}
const CLEAN = sample(5, 24, 1.0);
export const TEST = sample(41, 12, 0.35);           // 新水果：有幾顆比較靠近分界
const FLIP = [3, 8, 14, 21];                        // noisy：這幾顆的答案被標錯
const FEW = [0, 1, 6, 9];                           // few：只給這四顆
export function makeSet(kind) {
  if (kind === 'few') return FEW.map((i) => ({ ...CLEAN[i] }));
  if (kind === 'noisy') return CLEAN.map((p, i) => (FLIP.includes(i) ? { ...p, label: -p.label, flipped: true } : { ...p }));
  return CLEAN.map((p) => ({ ...p }));
}
export const SETS = ['clean', 'few', 'noisy'];
const RATE = 0.12, C = 5;                           // 一次挪多少；座標先減 5 再算，線才轉得動
export const init = () => ({ a: 1, b: 0.15, c: 0, seen: 0, moves: 0, next: 0 });
export const score = (m, p) => m.a * (p.x - C) + m.b * (p.y - C) + m.c;
export const predict = (m, p) => (score(m, p) >= 0 ? 1 : -1);
export const errors = (m, pts) => pts.filter((p) => predict(m, p) !== p.label).length;
export function stepOnce(m, set) {
  const i = m.next % set.length, p = set[i], wrong = predict(m, p) !== p.label;
  const n = { ...m, seen: m.seen + 1, next: (m.next + 1) % set.length };
  if (wrong) { n.a += RATE * p.label * (p.x - C); n.b += RATE * p.label * (p.y - C); n.c += RATE * p.label; n.moves = m.moves + 1; }
  return { model: n, i, wrong, moved: wrong };
}
export const LIMIT = 240;                          // 模型最多看幾個例子就停（標錯的資料永遠定不下來）
export function train(set, limit = LIMIT, m = init()) {
  let clean = 0;
  while (m.seen < limit && clean < set.length) { const r = stepOnce(m, set); m = r.model; clean = r.wrong ? 0 : clean + 1; }
  return { model: m, converged: clean >= set.length };
}
// 線在 0–10 的方框裡的兩個端點（畫圖用）；線幾乎不存在時回 null
export function segment(m, lo = 0, hi = 10) {
  const pts = [], f = (x, y) => m.a * (x - C) + m.b * (y - C) + m.c;
  const add = (x, y) => { if (x >= lo - 1e-9 && x <= hi + 1e-9 && y >= lo - 1e-9 && y <= hi + 1e-9) pts.push([x, y]); };
  if (Math.abs(m.b) > 1e-9) { for (const x of [lo, hi]) add(x, C - (m.a * (x - C) + m.c) / m.b); }
  if (Math.abs(m.a) > 1e-9) { for (const y of [lo, hi]) add(C - (m.b * (y - C) + m.c) / m.a, y); }
  const uniq = pts.filter((p, i) => pts.findIndex((q) => Math.abs(q[0] - p[0]) < 1e-6 && Math.abs(q[1] - p[1]) < 1e-6) === i);
  return uniq.length >= 2 ? [uniq[0], uniq[1]] : (f(C, C), null);
}
