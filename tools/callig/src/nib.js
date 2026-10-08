/*
 * 書法 · 第十四課：平頭筆（broad-edge pen）的純函式（node 可以直接測，test/nib.test.mjs）。
 *
 * 平頭筆的筆嘴是一條扁平的邊，寫字時這條邊和橫線的夾角固定（筆嘴角度，常用 30° 上下）。
 * 所以線條的粗細不看按多重，只看「筆往哪個方向走」：
 *   nibWidth(W, dir, nib)      筆嘴寬 W、行進方向 dir、筆嘴角度 nib（弧度，數學座標：0＝往右，逆時針為正）→ 線寬＝W·|sin(dir − nib)|
 *                              順著筆嘴的方向走最細（0），垂直筆嘴的方向走最粗（W）
 *   edge(nib)                  筆嘴那條邊的單位向量（畫布座標，y 往下）：[cos, −sin]
 *   resample(pts, step)        折線照固定間距取樣 → [{ x, y, s（走了多遠） }]
 *   smooth(pts, n)             Catmull-Rom 曲線取樣
 *   sweep(pts, W, nib)         筆嘴掃過一條路徑：每一小段一個四邊形 [[x, y] × 4]＋那一段的線寬、方向、走了多遠
 *   widthStats(quads)          { min, max, avg }（照長度加權）
 *   LETTERS / WORD             自己畫的拉丁字母骨架（n、o、a；字框 1000，基線 y＝700，x 高度＝400）
 */
export const NIB_W = 90;                       // 筆嘴寬（字框單位）；x 高度 400 ≈ 4.4 個筆嘴寬
export const NIB_DEG = 30;
export const rad = (d) => (d * Math.PI) / 180;
export const nibWidth = (W, dir, nib) => W * Math.abs(Math.sin(dir - nib));
export const edge = (nib) => [Math.cos(nib), -Math.sin(nib)];

export function smooth(p, n = 10) {
  if (p.length < 3) return p.map((q) => [q[0], q[1]]);
  const o = [];
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[Math.max(0, i - 1)], b = p[i], c = p[i + 1], d = p[Math.min(p.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (j) => 0.5 * ((2 * b[j]) + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t2 + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t3);
      o.push([f(0), f(1)]);
    }
  }
  o.push([p[p.length - 1][0], p[p.length - 1][1]]);
  return o;
}
export function resample(pts, step = 6) {
  const out = [{ x: pts[0][0], y: pts[0][1], s: 0 }];
  let s = 0, carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const ax = pts[i - 1][0], ay = pts[i - 1][1], dx = pts[i][0] - ax, dy = pts[i][1] - ay, L = Math.hypot(dx, dy);
    if (!L) continue;
    let d = step - carry;
    while (d <= L) { out.push({ x: ax + (dx * d) / L, y: ay + (dy * d) / L, s: s + d }); d += step; }
    carry = L - (d - step); s += L;
  }
  const e = pts[pts.length - 1], last = out[out.length - 1];
  if (Math.hypot(e[0] - last.x, e[1] - last.y) > 0.5) out.push({ x: e[0], y: e[1], s });
  return out;
}
/** 筆嘴掃過路徑。dir 用數學座標（畫布的 y 往下，所以 dy 要反過來） */
export function sweep(pts, W = NIB_W, nib = rad(NIB_DEG), step = 6) {
  const P = resample(pts, step), [ex, ey] = edge(nib), h = W / 2, quads = [];
  for (let i = 1; i < P.length; i++) {
    const a = P[i - 1], b = P[i], dir = Math.atan2(-(b.y - a.y), b.x - a.x);
    quads.push({ q: [[a.x - ex * h, a.y - ey * h], [a.x + ex * h, a.y + ey * h], [b.x + ex * h, b.y + ey * h], [b.x - ex * h, b.y - ey * h]],
      w: nibWidth(W, dir, nib), dir, s0: a.s, s1: b.s, x: b.x, y: b.y });
  }
  return quads;
}
export function widthStats(quads) {
  let min = Infinity, max = 0, sum = 0, L = 0;
  for (const k of quads) { const d = k.s1 - k.s0; min = Math.min(min, k.w); max = Math.max(max, k.w); sum += k.w * d; L += d; }
  return { min: quads.length ? min : 0, max, avg: L ? sum / L : 0, len: L };
}

/** 自己畫的字母骨架（圓形的 o 為基礎的寫法；一個字母分幾筆、每一筆由上往下或由左往右，平頭筆不往上推） */
export const LETTERS = {
  n: { en: 'n', strokes: [
    { en: 'Downstroke', zh: '豎', pts: [[96, 300], [96, 500], [96, 700]] },
    { en: 'Arch and downstroke', zh: '拱形接豎', pts: [[96, 410], [142, 330], [216, 302], [278, 336], [298, 420], [298, 560], [298, 700]] },
  ] },
  o: { en: 'o', strokes: [
    { en: 'Left curve', zh: '左半圓', pts: [[530, 300], [440, 334], [396, 420], [390, 500], [396, 580], [440, 666], [530, 700]] },
    { en: 'Right curve', zh: '右半圓', pts: [[530, 300], [620, 334], [664, 420], [670, 500], [664, 580], [620, 666], [530, 700]] },
  ] },
  a: { en: 'a', strokes: [
    { en: 'Arch and downstroke', zh: '拱形接豎', pts: [[752, 352], [810, 306], [872, 310], [906, 360], [910, 440], [910, 570], [910, 700]] },
    { en: 'Bowl', zh: '圓肚', pts: [[910, 486], [840, 470], [776, 510], [748, 584], [770, 660], [832, 692], [888, 660], [910, 600]] },
  ] },
};
export const WORD = ['n', 'o', 'a'];
/** 一串字母 → 一筆一筆的路徑（曲線取樣好的） */
export const wordStrokes = (keys = WORD) => keys.flatMap((k) => LETTERS[k].strokes.map((st) => ({ ...st, letter: k, path: smooth(st.pts) })));
