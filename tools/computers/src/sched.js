/*
 * 電腦概論 · 第十一課「作業系統在做什麼？」的純函式（不碰 DOM、不碰 three.js；test/sched.test.mjs）。
 *
 * 一個處理器一次只做一件事；作業系統讓很多程式**輪流**用它（輪流排程 round robin）：
 *   每個程式做一小段（時間片 slice）就換下一個；換手（switch）本身也要花時間，那段時間沒有任何程式在前進。
 * 時間的單位是示意的「拍」，不是毫秒——真的時間片多長、換手多久，這裡不給數字。
 *
 *   roundRobin(jobs, slice, sw)  jobs = [{ id, work }]，照順序輪流；回傳
 *     segs      時間軸 [{ t0, t1, id }]，id = null 表示在換手
 *     finish    每個程式做完的時刻　　firstStart  每個程式第一次輪到的時刻
 *     maxGap    每個程式「等最久的一次」（從開始或上一次做完，到下一次輪到）
 *     total、work（真正在做事的時間）、switchTime、switchShare（換手占全部時間的比例）、turns（一共輪了幾次）
 */
export function roundRobin(jobs, slice, sw = 1) {
  if (!(slice > 0)) throw new Error('slice must be positive');
  const left = jobs.map((j) => ({ id: j.id, left: j.work }));
  const segs = [], finish = {}, firstStart = {}, maxGap = {}, lastEnd = {};
  let t = 0, prev = null, switchTime = 0, turns = 0;
  jobs.forEach((j) => { lastEnd[j.id] = 0; maxGap[j.id] = 0; });
  let q = left.filter((j) => j.left > 0);
  while (q.length) {
    const next = [];
    for (const j of q) {
      if (prev !== null && prev !== j.id && sw > 0) { segs.push({ t0: t, t1: t + sw, id: null }); t += sw; switchTime += sw; }
      const d = Math.min(slice, j.left);
      if (!(j.id in firstStart)) firstStart[j.id] = t;
      maxGap[j.id] = Math.max(maxGap[j.id], t - lastEnd[j.id]);
      const lastSeg = segs[segs.length - 1];
      if (lastSeg && lastSeg.id === j.id) lastSeg.t1 = t + d; else segs.push({ t0: t, t1: t + d, id: j.id });
      t += d; j.left -= d; lastEnd[j.id] = t; prev = j.id; turns++;
      if (j.left > 0) next.push(j); else finish[j.id] = t;
    }
    q = next;
  }
  const work = jobs.reduce((s, j) => s + j.work, 0);
  return { segs, finish, firstStart, maxGap, total: t, work, switchTime, switchShare: t ? switchTime / t : 0, turns };
}
// 時刻 t 正在做什麼（回傳那一段，t 超過就回 null）
export const at = (sim, t) => sim.segs.find((s) => t >= s.t0 && t < s.t1) || null;
// 到時刻 t 為止，某個程式做了多少
export const done = (sim, id, t) => sim.segs.reduce((s, g) => (g.id === id ? s + Math.max(0, Math.min(t, g.t1) - g.t0) : s), 0);
export const worstGap = (sim) => Math.max(...Object.values(sim.maxGap));

// 模型：最多四張點單，每張要做 12 拍；小工具：三個程式
export const ORDERS = ['music', 'essay', 'browser', 'download'];
export const ORDER_WORK = 12;
export const orders = (n) => ORDERS.slice(0, n).map((id) => ({ id, work: ORDER_WORK }));
export const SLICES = [1, 3, 6, 12];
export const APPS3 = [{ id: 'download', work: 24 }, { id: 'essay', work: 12 }, { id: 'music', work: 12 }];   // 音樂排最後：時間片太長它就得等很久
export const WIDGET_SLICES = [1, 2, 3, 4, 6, 8, 12, 24];
export const STUTTER = 10;  // 小工具的示意門檻：音樂等超過 10 拍就算「會卡」
export const WASTE = 0.4;   // 示意門檻：換手占四成以上就算「太浪費」
