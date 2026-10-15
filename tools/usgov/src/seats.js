/*
 * 席次圖（共用引擎，第五課起）：把 n 個座位排成半圓形的議場，再依州（或任何分組）分配座位。
 * 純函式、不碰 three.js，tools/usgov/test/seats.test.mjs 有測試。
 *
 * hemicycle(n, { rows, r0, r1, span })：座位座標 [{ x, z, row, a }]。
 *   議長台在原點，座位面向 -z（鏡頭從 +z 看過去，半圓的開口朝鏡頭）；a 是角度（0＝最左、1＝最右）。
 *   每一排的座位數和半徑成正比（外圈比較長），總數剛好是 n。
 * assign(seats, groups)：依角度由左到右、同一個角度由內到外，把座位一組一組分出去，
 *   所以同一州的座位會連成一塊扇形。回傳每個座位的 key（和 seats 同順序）。
 * 座位的顏色只代表「選到的州」，不代表政黨（這個系列不畫兩黨的席次）。
 */

/** 每一排幾個座位：和半徑成正比，最大餘數法補齊，總和剛好是 n */
export function rowCounts(n, rows, r0, r1) {
  if (rows < 1 || n < rows) throw new Error('need at least one seat per row');
  const radii = Array.from({ length: rows }, (_, i) => (rows === 1 ? r0 : r0 + ((r1 - r0) * i) / (rows - 1)));
  const sum = radii.reduce((a, b) => a + b, 0);
  const exact = radii.map((r) => (n * r) / sum);
  const out = exact.map((e) => Math.max(1, Math.floor(e)));
  let left = n - out.reduce((a, b) => a + b, 0);
  const order = exact.map((e, i) => [e - Math.floor(e), i]).sort((p, q) => q[0] - p[0] || q[1] - p[1]);
  for (let k = 0; left > 0; k = (k + 1) % rows, left--) out[order[k][1]]++;
  for (let k = rows - 1; left < 0; k = (k - 1 + rows) % rows) if (out[k] > 1) { out[k]--; left++; }
  return { counts: out, radii };
}

export function hemicycle(n, { rows = 6, r0 = 2, r1 = 6, span = Math.PI } = {}) {
  const { counts, radii } = rowCounts(n, rows, r0, r1);
  const seats = [];
  counts.forEach((c, row) => {
    for (let i = 0; i < c; i++) {
      const a = c === 1 ? 0.5 : i / (c - 1);
      const th = Math.PI / 2 + span / 2 - a * span; // 左（+90°+span/2）→ 右
      seats.push({ x: radii[row] * Math.cos(th), z: -radii[row] * Math.sin(th), row, a });
    }
  });
  return seats;
}

/** 依角度由左到右（同角度由內到外）排序後，照 groups 的順序分座位 */
export function assign(seats, groups) {
  const total = groups.reduce((s, g) => s + g.n, 0);
  if (total !== seats.length) throw new Error(`groups need ${total} seats, chamber has ${seats.length}`);
  const order = seats.map((s, i) => i).sort((p, q) => seats[p].a - seats[q].a || seats[p].row - seats[q].row);
  const keys = new Array(seats.length);
  let k = 0;
  for (const g of groups) for (let j = 0; j < g.n; j++) keys[order[k++]] = g.key;
  return keys;
}

/** 占全體的百分比（一位小數） */
export function share(n, total) { return Math.round((1000 * n) / total) / 10; }

/** 每一席代表多少人（四捨五入到整數） */
export function perSeat(pop, seats) { return seats ? Math.round(pop / seats) : null; }

/** 兩州相比：大州每席代表的人數是小州的幾倍（一位小數） */
export function ratio(a, b) { return Math.round((10 * a) / b) / 10; }
