/*
 * 美國政治 U.S. Government · 選區劃分（第七課；純函式，test/districts.test.mjs）。
 *
 * 一張 n×n 的虛構格子地圖：每一格人數相同，voters[i] 是這一格多數選民屬於哪一群（'g' 綠、'o' 橘；
 * 刻意不用紅藍、不標政黨）。plan[i] 是這一格被畫進第幾區（0 起算；-1＝還沒畫）。
 *   tally(voters, plan, k)  每一區的格數、各群格數、誰贏（'g'｜'o'｜'tie'｜null＝空區）
 *   seats(voters, plan, k)  兩群各贏幾區、平手幾區
 *   check(plan, n, k)       每區格數是否相等（size＝n*n/k）、每區是否相連（上下左右相鄰）、是否每格都畫了
 *   presets(n, k)           三種預設畫法：cols（照欄）、rows（照列）、boxes（方塊）
 *   edges(plan, n)          兩格屬於不同區的邊（畫選區邊界用）
 */
export function tally(voters, plan, k) {
  const out = Array.from({ length: k }, () => ({ cells: 0, g: 0, o: 0, win: null }));
  plan.forEach((d, i) => { if (d >= 0 && d < k) { out[d].cells++; out[d][voters[i]]++; } });
  for (const d of out) d.win = d.cells === 0 ? null : d.g > d.o ? 'g' : d.o > d.g ? 'o' : 'tie';
  return out;
}

export function seats(voters, plan, k) {
  const t = tally(voters, plan, k);
  return { g: t.filter((d) => d.win === 'g').length, o: t.filter((d) => d.win === 'o').length, tie: t.filter((d) => d.win === 'tie').length };
}

export function check(plan, n, k) {
  const size = (n * n) / k;
  const sizes = Array(k).fill(0);
  plan.forEach((d) => { if (d >= 0) sizes[d]++; });
  const connected = sizes.map((s, d) => {
    if (!s) return false;
    const start = plan.indexOf(d), seen = new Set([start]), q = [start];
    while (q.length) {
      const i = q.pop(), r = Math.floor(i / n), c = i % n;
      for (const [rr, cc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
        if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue;
        const j = rr * n + cc;
        if (plan[j] === d && !seen.has(j)) { seen.add(j); q.push(j); }
      }
    }
    return seen.size === s;
  });
  const complete = plan.every((d) => d >= 0);
  return { size, sizes, equal: sizes.every((s) => s === size), connected, complete, valid: complete && sizes.every((s) => s === size) && connected.every(Boolean) };
}

export function presets(n, k) {
  const cols = [], rows = [], boxes = [];
  const bw = n / 2, bh = (n * n) / k / bw;          // 方塊：寬 n/2、高 size/(n/2)
  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n), c = i % n;
    cols.push(Math.floor((c * k) / n));
    rows.push(Math.floor((r * k) / n));
    boxes.push(Math.floor(r / bh) * 2 + Math.floor(c / bw));
  }
  return { cols, rows, boxes };
}

export function edges(plan, n) {
  const out = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const i = r * n + c;
    if (c < n - 1 && plan[i] !== plan[i + 1]) out.push({ r, c, side: 'e' });
    if (r < n - 1 && plan[i] !== plan[i + n]) out.push({ r, c, side: 's' });
  }
  return out;
}

/** 虛構地圖：左邊 split 欄是綠、其餘是橘 */
export function stripeVoters(n, split) {
  return Array.from({ length: n * n }, (_, i) => (i % n < split ? 'g' : 'o'));
}
