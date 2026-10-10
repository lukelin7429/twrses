/*
 * 第十一課「毛毛蟲怎麼變成蝴蝶？」的規則（life-meta.js 與 test/meta.test.mjs 共用）。
 * 完全變態的四個階段：卵 → 幼蟲（專門吃和長大，蛻皮好幾次）→ 蛹（幼蟲的構造被拆掉，成蟲的構造長出來）→ 成蟲（專門飛和生小孩）。
 * 時間 0–100 是示意的進度，不是天數。
 */
const c01 = (v) => Math.min(1, Math.max(0, v));
const sm = (x) => { const t = c01(x); return t * t * (3 - 2 * t); };
export const STAGES = [['egg', 0], ['larva', 10], ['pupa', 50], ['adult', 85]];
export const stage = (t) => { let k = 'egg'; for (const [name, from] of STAGES) if (t >= from) k = name; return k; };
export const INSTARS = 5;                                               // 例子：帝王斑蝶的幼蟲有五齡
export const instar = (t) => (stage(t) === 'larva' ? Math.min(INSTARS, 1 + Math.floor(((t - 10) / 40) * INSTARS)) : 0);
export const larvaSize = (t) => 0.3 + 0.7 * (instar(t) / INSTARS);      // 每蛻一次皮就大一號（0–1）
// 蛹裡面：幼蟲的構造還剩多少、成蟲的構造長出多少（0–1）
export const larvalLeft = (t) => +(1 - sm((t - 50) / 28)).toFixed(3);
export const adultBuilt = (t) => +sm((t - 58) / 27).toFixed(3);
export const wingSpread = (t) => +sm((t - 85) / 9).toFixed(3);          // 剛出來時翅膀是皺的，慢慢撐開
export const holding = (t, inside) => { const k = stage(t); return k === 'pupa' ? (inside ? 'pupa_in' : 'pupa') : k === 'adult' ? (wingSpread(t) < 1 ? 'adult_new' : 'adult') : k; };
// 頁面小工具：這種昆蟲有幾個階段
export const cycle = (kind) => (kind === 'complete' ? ['egg', 'larva', 'pupa', 'adult'] : ['egg', 'nymph', 'adult']);
