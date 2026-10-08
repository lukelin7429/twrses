/*
 * 書法 · 第十五課「毛筆字和硬筆字」的純函式（沒有 DOM、沒有 three；node 測試直接跑）。
 *
 * 一個機制：**把粗細拿掉，剩下來的是結構**。毛筆和鉛筆寫同一個字，走的是同一條中心線（同一份筆畫資料）：
 * 筆畫數、筆順、每一筆從哪裡到哪裡都一樣；不一樣的只有線的粗細（毛筆跟著提按變，鉛筆從頭到尾一樣）。
 *
 *   centerline(st)            一筆的中心線 [{ x, y, s, t }]（就是毛筆走的那條路：brush.js 的 prepStroke）
 *   pathLength(char)          整個字的中心線總長（字框單位）
 *   slimStamps(sts, f)        把毛筆的印子變細：f＝1 原樣、f＝0 變成鉛筆線（每個印子一樣大）
 *   widthRange(sts)           一組印子最粗、最細的線寬，和兩者的比
 *   alter(pts, kind, sign)    把一筆改壞：'short' 太短、'long' 太長、'shift' 位置跑掉、'tilt' 斜掉（「哪一筆寫歪了？」用）
 *   deviation(a, b)           兩條線差多遠（對應點的最大距離）
 *   candidates(char)          一個字裡每一筆可以怎麼改（改完還在格子裡、而且看得出來）
 */
import { prepStroke } from './brush.js';

export const PENCIL_W = 12;                    // 鉛筆線寬（字框單位；模型裡的字框是 25 公分，所以是 0.3 公分——放大的示意）
export const PENCIL_INK = '#3d4048';           // 石墨的灰黑

export const centerline = (st) => prepStroke(st).map((q) => ({ x: q.x, y: q.y, s: q.s, t: q.t }));
export const lineLength = (pts) => pts.reduce((a, q, i) => (i ? a + Math.hypot(q.x - pts[i - 1].x, q.y - pts[i - 1].y) : 0), 0);
export const pathLength = (char) => char.strokes.reduce((a, st) => a + lineLength(centerline(st)), 0);

const lerp = (a, b, f) => a + (b - a) * f;
export function slimStamps(sts, f) {
  const h = PENCIL_W / 2;
  return sts.map((q) => ({ ...q, hw: lerp(h, q.hw, f), len: lerp(h, q.len, f) }));
}
export function widthRange(sts) {
  const w = sts.map((q) => q.hw * 2).sort((a, b) => a - b);   // 整條線（起筆、行筆、收筆都算）；最細取第 5 百分位，不算筆尖剛碰到紙的那一點
  if (!w.length) return { min: 0, max: 0, ratio: 1 };
  const min = w[Math.floor(w.length * 0.05)], max = w[w.length - 1];
  return { min, max, ratio: max / min };
}

export const KINDS = ['short', 'long', 'shift', 'tilt'];
export function alter(pts, kind, sign = 1) {
  const a = pts[0], b = pts[pts.length - 1];
  if (kind === 'short' || kind === 'long') {   // 從起點縮短或拉長
    const k = kind === 'short' ? 0.55 : 1.42;
    return pts.map((q) => ({ ...q, x: a.x + (q.x - a.x) * k, y: a.y + (q.y - a.y) * k }));
  }
  if (kind === 'tilt') {                       // 繞著起點轉 17 度
    const r = (sign * 17 * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    return pts.map((q) => ({ ...q, x: a.x + (q.x - a.x) * c - (q.y - a.y) * s, y: a.y + (q.x - a.x) * s + (q.y - a.y) * c }));
  }
  // shift：往「垂直這一筆」的方向平移 95
  const L = Math.hypot(b.x - a.x, b.y - a.y) || 1, nx = (-(b.y - a.y) / L) * sign, ny = ((b.x - a.x) / L) * sign;
  return pts.map((q) => ({ ...q, x: q.x + nx * 95, y: q.y + ny * 95 }));
}
export const deviation = (p, q) => p.reduce((m, a, i) => Math.max(m, Math.hypot(a.x - q[i].x, a.y - q[i].y)), 0);
const inBox = (pts) => pts.every((q) => q.x >= 50 && q.x <= 950 && q.y >= 50 && q.y <= 950);

/** 這個字可以出的題：[{ i 第幾筆, kind, sign, pts 改壞後的線 }]——改完要還在格子裡，而且至少偏 80（看得出來） */
export function candidates(char) {
  const out = [];
  char.strokes.forEach((st, i) => {
    const base = centerline(st), L = lineLength(base);
    for (const kind of KINDS) for (const sign of (kind === 'short' || kind === 'long' ? [1] : [1, -1])) {
      if ((kind === 'short' || kind === 'tilt' || kind === 'long') && L < 280) continue;
      const pts = alter(base, kind, sign);
      if (inBox(pts) && deviation(base, pts) >= 80) out.push({ i, kind, sign, pts });
    }
  });
  return out;
}
