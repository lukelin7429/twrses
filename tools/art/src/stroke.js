/*
 * 美術 Art · 筆畫（純函式；test/stroke.test.mjs）。畫板（pad.js）與第四課〈一條線可以說什麼？〉用，之後要畫圖的課共用。
 *
 * 一筆＝一串點 { x, y, t, p }：x、y 是畫板上的座標（邏輯單位，畫板寬 800），t 是毫秒，p 是壓力 0–1（不知道就給 0.5）。
 * 線的粗細有三種算法（BRUSHES）：
 *   fixed     固定粗細
 *   pressure  壓得越重越粗（觸控筆有回報壓力時）
 *   speed     畫得越快越細（沒有壓力時，用速度代替：像毛筆，慢慢畫墨吃得多、線比較粗）
 * 畫得很快時，可以讓線出現沒沾到墨的空隙（dry，模仿書法「飛白」的樣子）；空隙的位置由固定的種子決定，每次重畫都一樣。
 * 「快就有空隙」是這個模型自己的規則：真的毛筆要同時看筆上的墨量、紙和速度（頁面的模型說明要寫清楚）。
 */
export const PAD_W = 800, PAD_H = 500;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export const BRUSHES = {
  pen: { key: 'pen', en: 'Thin pen', zh: '細筆', mode: 'fixed', min: 2.5, max: 2.5 },
  marker: { key: 'marker', en: 'Thick marker', zh: '粗筆', mode: 'fixed', min: 14, max: 14 },
  brush: { key: 'brush', en: 'Brush', zh: '毛筆', mode: 'auto', min: 2, max: 20, vRef: 1500, dry: true },
};

export function length(pts) {
  let d = 0;
  for (let i = 1; i < pts.length; i++) d += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return d;
}
export const duration = (pts) => (pts.length > 1 ? (pts[pts.length - 1].t - pts[0].t) / 1000 : 0);
/** 平均速度（單位／秒）。 */
export const avgSpeed = (pts) => { const s = duration(pts); return s > 0 ? length(pts) / s : 0; };
/** 每一點的速度（單位／秒），和點一樣多；用前後兩段平均，比較不會抖。 */
export function speeds(pts) {
  const seg = [];
  for (let i = 1; i < pts.length; i++) {
    const dt = Math.max(1, pts[i].t - pts[i - 1].t) / 1000;
    seg.push(Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y) / dt);
  }
  if (!seg.length) return pts.map(() => 0);
  return pts.map((_, i) => (i === 0 ? seg[0] : i === pts.length - 1 ? seg[seg.length - 1] : (seg[i - 1] + seg[i]) / 2));
}
/** 這一筆有沒有真的壓力資料（滑鼠與手指通常回報固定的 0.5 或 0）。 */
export const hasPressure = (pts) => { const ps = pts.map((q) => q.p); return Math.max(...ps) - Math.min(...ps) > 0.02; };

/** 一個點的粗細。 */
export function widthAt(brush, speed, pressure, usePressure) {
  if (brush.mode === 'fixed') return brush.max;
  const k = usePressure ? clamp(pressure, 0, 1) : 1 - clamp(speed / brush.vRef, 0, 1);
  return brush.min + (brush.max - brush.min) * k;
}
/** 整筆每一點的粗細（平滑過，不會忽粗忽細）。 */
export function widths(pts, brush) {
  const v = speeds(pts), up = brush.force === 'pressure' || hasPressure(pts);   // 示範的線指定用壓力；手畫的線有壓力資料才用
  const w = pts.map((q, i) => widthAt(brush, v[i], q.p, up));
  return w.map((_, i) => { let s = 0, n = 0; for (let k = -2; k <= 2; k++) if (w[i + k] !== undefined) { s += w[i + k]; n++; } return s / n; });
}

/** 平滑：每個點換成它和前後各 k 個點的平均（頭尾不動）。 */
export function smooth(pts, k = 1) {
  return pts.map((q, i) => {
    if (i === 0 || i === pts.length - 1) return { ...q };
    const kk = Math.min(k, i, pts.length - 1 - i);          // 靠近頭尾時把視窗縮小，兩邊取一樣多，直線才不會被拉歪
    let x = 0, y = 0, n = 0;
    for (let j = -kk; j <= kk; j++) { x += pts[i + j].x; y += pts[i + j].y; n++; }
    return { ...q, x: x / n, y: y / n };
  });
}
/** 抖動：每個點離「平滑後的線」平均多遠（單位）。線越抖，數字越大。 */
export function wobble(pts) {
  if (pts.length < 5) return 0;
  const s = smooth(pts, 3);
  let d = 0;
  for (let i = 0; i < pts.length; i++) d += Math.hypot(pts[i].x - s[i].x, pts[i].y - s[i].y);
  return d / pts.length;
}
/** 從起點到終點的方向（度；0＝往右，90＝往下，因為畫面的 y 朝下）。 */
export function direction(pts) {
  if (pts.length < 2) return 0;
  const a = pts[0], b = pts[pts.length - 1];
  return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}
export function bbox(pts) {
  const xs = pts.map((q) => q.x), ys = pts.map((q) => q.y);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}

export const FAST_AT = 700, SLOW_AT = 300;       // 平均速度（單位／秒）：超過算快，低於算慢
/** 用話描述一筆：速度、粗細、穩不穩。 */
export function describe(pts, brush = BRUSHES.brush) {
  const v = avgSpeed(pts), w = widths(pts, brush), wb = wobble(pts);
  return {
    length: length(pts), seconds: duration(pts), speed: v,
    pace: v >= FAST_AT ? 'fast' : v <= SLOW_AT ? 'slow' : 'medium',
    wmin: w.length ? Math.min(...w) : 0, wmax: w.length ? Math.max(...w) : 0,
    steady: wb < 1.2,
  };
}

/** 固定種子的亂數（0–1），測試與重畫才會每次一樣。 */
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/** 飛白：這一點要不要留白。速度超過 vRef 的六成才開始出現，越快空隙越多。 */
export function dryGap(brush, speed, r) {
  if (!brush.dry) return false;
  const k = clamp((speed / brush.vRef - 0.6) / 0.6, 0, 1);
  return r < k * 0.55;
}

// ── 五種示範的線：同一條路徑，用五種方式畫 ────────────────────────────
// 路徑是一條平緩的波浪線，從左到右。
const path = (u) => ({ x: 90 + 620 * u, y: 250 + 70 * Math.sin(u * Math.PI * 2) * (1 - 0.25 * u) });
export const LINES = {
  even: { key: 'even', en: 'Thin and steady', zh: '細而穩', seconds: 2.6, press: () => 0.18, shake: 0 },
  heavy: { key: 'heavy', en: 'Thick and heavy', zh: '粗而重', seconds: 3.4, press: () => 0.92, shake: 0 },
  fast: { key: 'fast', en: 'Fast, with gaps', zh: '很快，有空隙', seconds: 0.42, press: () => 0.7, shake: 0, dry: true },
  shaky: { key: 'shaky', en: 'Shaky', zh: '抖動', seconds: 3.0, press: () => 0.4, shake: 5 },
  taper: { key: 'taper', en: 'Thick to thin', zh: '由粗到細', seconds: 1.8, press: (u) => 0.95 - 0.85 * u, shake: 0 },
};
/** 產生一條示範的線（一串點）。n＝點數。 */
export function makeLine(kind, n = 120) {
  const L = LINES[kind], r = rng(kind.length * 977 + kind.charCodeAt(0));
  const pts = [];
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1), q = path(u);
    pts.push({ x: q.x + (r() - 0.5) * 2 * L.shake, y: q.y + (r() - 0.5) * 2 * L.shake, t: Math.round(u * L.seconds * 1000), p: L.press(u) });
  }
  return pts;
}
/** 示範的線用的筆：壓力決定粗細；fast 那一條另外加飛白。 */
export const demoBrush = (kind) => ({ ...BRUSHES.brush, force: 'pressure', min: 2, max: 22, vRef: 1500, dry: !!LINES[kind].dry });

/** 把一筆變成要畫的小段：[{ x0, y0, x1, y1, w, gap }]。畫板和測試用同一份。 */
export function segments(pts, brush, seed = 7) {
  const w = widths(pts, brush), v = speeds(pts), r = rng(seed), out = [];
  for (let i = 1; i < pts.length; i++) {
    out.push({ x0: pts[i - 1].x, y0: pts[i - 1].y, x1: pts[i].x, y1: pts[i].y, w: (w[i - 1] + w[i]) / 2, gap: dryGap(brush, (v[i - 1] + v[i]) / 2, r()) });
  }
  return out;
}

// 「這條線是怎麼畫的？」六題：速度（fast／slow）× 力道（light／heavy）
export const HOW = {
  'slow-light': { en: 'Slowly and lightly', zh: '慢慢地、輕輕地', seconds: 3.2, press: 0.15 },
  'slow-heavy': { en: 'Slowly and heavily', zh: '慢慢地、重重地', seconds: 3.2, press: 0.9 },
  'fast-light': { en: 'Fast and lightly', zh: '很快、輕輕地', seconds: 0.4, press: 0.2 },
  'fast-heavy': { en: 'Fast and heavily', zh: '很快、重重地', seconds: 0.4, press: 0.9 },
};
export const HOW_ROUNDS = ['slow-heavy', 'fast-light', 'slow-light', 'fast-heavy', 'slow-heavy', 'fast-light'].map((answer, i) => ({ answer, shape: i % 3 }));
/** 題目的線：三種路徑（弧、鉤、圈）輪流；速度與力道照答案。 */
export function howLine(round, n = 110) {
  const h = HOW[round.answer], pts = [];
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    let x, y;
    if (round.shape === 0) { x = 110 + 580 * u; y = 330 - 190 * Math.sin(u * Math.PI); }
    else if (round.shape === 1) { x = 160 + 480 * u; y = 150 + 230 * u * u - 90 * Math.max(0, u - 0.8) * 5 * (u - 0.8) * 5; }
    else { const a = u * Math.PI * 1.75 - Math.PI * 0.9; x = 400 + 210 * Math.cos(a) * (0.6 + 0.4 * u); y = 250 + 150 * Math.sin(a) * (0.6 + 0.4 * u); }
    pts.push({ x, y, t: Math.round(u * h.seconds * 1000), p: h.press });
  }
  return pts;
}
export const howBrush = () => ({ ...BRUSHES.brush, force: 'pressure', min: 2, max: 22, vRef: 1500, dry: true });

// 「幾何的形狀，還是自然的形狀？」八個剪影（SVG path，畫在 100×100 的格子裡）
export const SHAPES = [
  { key: 'square', kind: 'geometric', en: 'Square', zh: '正方形', d: 'M18 18H82V82H18Z' },
  { key: 'leaf', kind: 'organic', en: 'Leaf', zh: '葉子', d: 'M50 8C78 24 88 52 62 90C58 76 52 70 50 92C48 70 42 76 38 90C12 52 22 24 50 8Z' },
  { key: 'circle', kind: 'geometric', en: 'Circle', zh: '圓形', d: 'M50 12A38 38 0 1 0 50 88A38 38 0 1 0 50 12Z' },
  { key: 'cloud', kind: 'organic', en: 'Cloud', zh: '雲', d: 'M24 70C8 70 6 50 22 46C20 30 40 22 50 34C58 20 82 26 80 44C96 46 94 70 78 70Z' },
  { key: 'triangle', kind: 'geometric', en: 'Triangle', zh: '三角形', d: 'M50 12L90 84H10Z' },
  { key: 'puddle', kind: 'organic', en: 'Puddle', zh: '水窪', d: 'M20 40C30 18 52 30 64 22C84 14 96 40 82 56C94 74 70 90 52 80C36 92 8 82 16 62C6 54 12 46 20 40Z' },
  { key: 'hexagon', kind: 'geometric', en: 'Hexagon', zh: '六邊形', d: 'M50 10L85 30V70L50 90L15 70V30Z' },
  { key: 'pebble', kind: 'organic', en: 'Pebble', zh: '小石頭', d: 'M30 30C46 14 76 20 86 42C94 62 78 84 54 84C30 86 10 70 14 50C16 40 22 36 30 30Z' },
];
