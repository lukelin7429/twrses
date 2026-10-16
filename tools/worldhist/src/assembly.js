/*
 * 世界歷史 第五課〈What Did the Greeks Start? 希臘人開了什麼頭？〉的純函式（node test/assembly.test.mjs）。
 *
 *   figures(groups, per)           每一群人畫幾個小人（一個小人代表 per 個人；至少 1 個）
 *   shares(groups)                 每一群占全部的比例（用 groups[].use 這個「示意用的估計」）
 *   gridBlock(n, cols, gap)        n 個小人排成方陣（以原點為中心）：[{ x, z }]
 *   fanSeats(n, opt)               n 個座位排在扇形的山坡上（一排一排往外、往上）：[{ x, y, z, row }]
 *   handsUp(n, share, seed)        n 個人裡剛好 round(n·share) 個舉手，位置打散（固定的種子，畫面才不會每次跳）
 *   judgeHands(yes, no, margin)    主席「用看的」判斷舉手的結果：'yes'／'no'／'close'（差距小於 margin 就看不出來）
 *   ostracism(votes, rule, need)   陶片放逐：兩種讀法
 *       'quorum'   全部的陶片至少 need 片（6,000），票最多的人被放逐（普魯塔克的說法）
 *       'against'  寫同一個名字的陶片要有 need 片，那個人才被放逐（菲洛科羅斯殘篇的一種讀法）
 *
 * 「判斷舉手」的門檻是教學用的假設：古代的主席沒有計票，是看出來的——史料只說看，沒有說差多少才算看得出來。
 */
export function figures(groups, per) {
  return groups.map((g) => Math.max(1, Math.round(g.use / per)));
}

export function shares(groups) {
  const tot = groups.reduce((s, g) => s + g.use, 0);
  return groups.map((g) => g.use / tot);
}

export function gridBlock(n, cols, gap = 1) {
  const rows = Math.ceil(n / cols), out = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const inRow = r === rows - 1 ? n - r * cols : cols;            // 最後一排置中
    out.push({ x: (c - (inRow - 1) / 2) * gap, z: (r - (rows - 1) / 2) * gap });
  }
  return out;
}

/** 扇形座位：圓心在講台（原點），半徑 r0 到 r1，張角 angle（弧度，對稱於 −z 方向），每排往外升高 rise。 */
export function fanSeats(n, { r0 = 6, r1 = 20, angle = 2.4, gap = 0.9, rise = 0.35 } = {}) {
  const out = [];
  let r = r0, row = 0;
  while (out.length < n && r <= r1 + 1e-9) {
    const arc = r * angle, k = Math.max(1, Math.floor(arc / gap));
    for (let i = 0; i < k && out.length < n; i++) {
      const t = k === 1 ? 0.5 : i / (k - 1), a = -angle / 2 + t * angle;
      out.push({ x: Math.sin(a) * r, y: row * rise, z: -Math.cos(a) * r, row });
    }
    r += gap; row += 1;
  }
  return out;
}

/** 固定種子的亂數（mulberry32）。 */
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function handsUp(n, share, seed = 7) {
  const k = Math.round(n * Math.min(1, Math.max(0, share)));
  const idx = Array.from({ length: n }, (_, i) => i), r = rng(seed);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const up = new Array(n).fill(false);
  for (let i = 0; i < k; i++) up[idx[i]] = true;
  return up;
}

export function judgeHands(yes, no, margin = 0.1) {
  const tot = yes + no;
  if (tot <= 0) return 'close';
  const d = (yes - no) / tot;
  if (Math.abs(d) < margin) return 'close';
  return d > 0 ? 'yes' : 'no';
}

export const RULES = ['quorum', 'against'];

export function ostracism(votes, rule, need = 6000) {
  if (!RULES.includes(rule)) throw new RangeError(`Unknown rule: ${rule}`);
  const names = Object.keys(votes);
  const total = names.reduce((s, k) => s + votes[k], 0);
  const sorted = names.slice().sort((a, b) => votes[b] - votes[a]);
  const top = sorted[0] ?? null, topVotes = top ? votes[top] : 0;
  const tie = sorted.length > 1 && votes[sorted[1]] === topVotes && topVotes > 0;
  let exiled = null, reason;
  if (rule === 'quorum') {
    if (total < need) reason = 'too-few';
    else if (tie) reason = 'tie';
    else { exiled = top; reason = 'most'; }
  } else {
    if (topVotes < need) reason = 'too-few';
    else if (tie) reason = 'tie';
    else { exiled = top; reason = 'enough'; }
  }
  return { total, top, topVotes, exiled, reason };
}
