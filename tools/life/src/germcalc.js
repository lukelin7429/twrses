/*
 * 第四課「細菌和病毒哪裡不一樣？」的規則（life-germ.js 與 test/germ.test.mjs 共用）。
 * 細菌：一個完整的細胞，自己長大、一分為二 → 每一代數量加倍。
 * 病毒：一包說明書，自己什麼都不能做；要進到細胞裡，讓細胞替它做出新的病毒。
 */
export const MAX_GEN = 5;                       // 模型最多畫到第 5 代（32 個）
export const DOUBLING_MIN = 20;                 // 例子：大腸桿菌在最理想的條件下，最快約 20 分鐘分裂一次
export const cells = (gen) => 2 ** Math.floor(gen);
export const minutes = (gen) => Math.floor(gen) * DOUBLING_MIN;
// 第 gen 代、第 i 個細胞的位置：每一次分裂沿一個軸往兩邊分（x、y、z、x、y）
const AXIS = [0, 1, 2, 0, 1], DIST = [1.5, 0.9, 0.5, 0.75, 0.45];
export function slot(i, gen) {
  const p = [0, 0, 0];
  for (let j = 0; j < gen; j++) p[AXIS[j]] += ((i >> (gen - 1 - j)) & 1 ? 1 : -1) * DIST[j];
  return p;
}
// 病毒那一邊的四個階段（滑桿 0–100）
export const STAGES = [['land', 0], ['inject', 25], ['copy', 45], ['burst', 80]];
export const stage = (s) => { let k = 'land'; for (const [name, from] of STAGES) if (s >= from) k = name; return k; };
export const COPIES = 8;                        // 模型裡細胞替病毒做出 8 個（示意）
export const copiesShown = (s) => (s < 45 ? 0 : s >= 80 ? COPIES : Math.min(COPIES, Math.floor(((s - 45) / 35) * COPIES) + 1));
export const virusCount = (s) => (s >= 80 ? COPIES : 1);
export const holding = (view, v) => (view === 'virus' ? `v_${stage(v)}` : v <= 0 ? 'b_one' : v >= MAX_GEN ? 'b_full' : v % 1 > 0.02 ? 'b_split' : 'b_some');
// 頁面小工具：一毫米可以排幾個（大小用奈米）
export const acrossMm = (nm) => Math.round(1e6 / nm);
export const timesBigger = (a, b) => a / b;
