/*
 * 美國政治 U.S. Government · 修憲門檻的算術（純函式，test/amend.test.mjs）。
 *
 * 憲法第五條寫的是分數（兩院各三分之二、四分之三的州），不是人數；人數要看當時有幾席、幾州。
 * 席次與州數由呼叫的人給（頁面資料 data/us_government.json 的 amend.bodies，標了來源與年份）。
 * 注意：國會的三分之二是「出席並投票的議員」的三分之二（要有法定人數在場），所以這裡算的是「全員到齊投票」時的票數。
 */
/** 至少要幾票才達到 num/den（例如 435 席的三分之二 → 290） */
export function need(total, num, den) { return Math.ceil((total * num) / den - 1e-9); }
/** 過半數（嚴格大於一半）：435 → 218、100 → 51 */
export function majority(total) { return Math.floor(total / 2) + 1; }
/** 最少幾個反對就能擋下來 */
export function blockers(total, num, den) { return total - need(total, num, den) + 1; }

/** 兩種提案方式 × 兩種批准方式 */
export const PROPOSE = ['congress', 'convention'];
export const RATIFY = ['legislatures', 'conventions'];

/**
 * 一條修憲路線要過的關卡。bodies = { house, senate, states }。
 * 回傳 [{ key, total, need, frac:[num,den] }]，照順序。
 */
export function gates(propose, ratify, bodies) {
  const out = [];
  if (propose === 'congress') {
    out.push({ key: 'house', total: bodies.house, need: need(bodies.house, 2, 3), frac: [2, 3] });
    out.push({ key: 'senate', total: bodies.senate, need: need(bodies.senate, 2, 3), frac: [2, 3] });
  } else if (propose === 'convention') {
    out.push({ key: 'applications', total: bodies.states, need: need(bodies.states, 2, 3), frac: [2, 3] });
    out.push({ key: 'convention', total: null, need: null, frac: null });
  } else throw new Error(`unknown proposal method: ${propose}`);
  if (!RATIFY.includes(ratify)) throw new Error(`unknown ratification method: ${ratify}`);
  out.push({ key: ratify === 'legislatures' ? 'state_legislatures' : 'state_conventions', total: bodies.states, need: need(bodies.states, 3, 4), frac: [3, 4] });
  return out;
}

/** 用三個數字試試看：眾議院、參議院贊成票，批准的州數 → 每一關過不過、整體過不過 */
export function tally(votes, bodies) {
  const h = need(bodies.house, 2, 3), s = need(bodies.senate, 2, 3), r = need(bodies.states, 3, 4);
  const house = votes.house >= h, senate = votes.senate >= s, states = votes.states >= r;
  return {
    house, senate, states,
    proposed: house && senate,
    ratified: house && senate && states,
    // 同樣的票數如果只是一般法案（兩院各過半）會不會過
    ordinary: votes.house >= majority(bodies.house) && votes.senate >= majority(bodies.senate),
  };
}

/** 歷史紀錄的比例：ratified / proposed（百分比，取到小數兩位） */
export function rate(part, whole) { return Math.round((part / whole) * 10000) / 100; }
