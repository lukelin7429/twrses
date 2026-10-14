/*
 * 美術 Art · 第七課〈主角該放在哪裡？〉的純函式（不碰 DOM，test/frame.test.mjs 測）。
 *
 * 畫框是 800 × 600 的長方形（座標 x 往右、y 往下，和 SVG 一樣）。畫框裡的東西是灰階的平面形狀（圓、長方形、三角形），
 * 每一樣有自己的明度 L*，畫在 L* 95 的紙上。
 *
 * 「視覺重量」是本課自己選的示意模型（頁面上講明不是定律）：
 *   重量 ＝ 畫框裡看得到的面積 × 和紙的明度差（|L* − 95| ÷ 100）
 *   大的東西重、深的東西重；淡到和紙一樣就沒有重量。
 * 重心＝所有東西依重量加權的平均位置。重心離畫框中央多遠（以半個畫框寬為 1），就是畫面偏左或偏右多少。
 * 面積用格點取樣算（每 4 個單位一點），這樣被畫框裁掉一半的東西，也只算看得到的那一半。
 */
import { linearToSrgb } from './color.js';

export const FRAME = { x: 0, y: 0, w: 800, h: 600 };
export const PAPER_L = 95;
export const STEP = 4;
export const CENTER_TOL = 0.06;     // 重心離中央在半個畫框寬的 6% 以內，算「接近中央」
export const THIRD_TOL = 0.06;      // 離三分點在畫框寬的 6% 以內，算「在三分點上」

/** L*（0–100）→ 灰色的 sRGB（0–1），三個通道一樣。 */
export function grayOfL(L) {
  const fy = (L + 16) / 116;
  const Y = L > 8 ? fy ** 3 : L / 903.3;
  const v = linearToSrgb(Y);
  return [v, v, v];
}
export const contrast = (L) => Math.abs(L - PAPER_L) / 100;

/** 形狀的外框（左上角與寬高）。 */
export function bbox(it) {
  if (it.shape === 'circle') return { x: it.x - it.r, y: it.y - it.r, w: 2 * it.r, h: 2 * it.r };
  return { x: it.x - it.w / 2, y: it.y - it.h / 2, w: it.w, h: it.h };
}
/** 點 (px, py) 在不在形狀裡。三角形是尖端朝上的等腰三角形。 */
export function inside(it, px, py) {
  if (it.shape === 'circle') return (px - it.x) ** 2 + (py - it.y) ** 2 <= it.r * it.r;
  const b = bbox(it);
  if (px < b.x || px > b.x + b.w || py < b.y || py > b.y + b.h) return false;
  if (it.shape === 'rect') return true;
  const t = (py - b.y) / b.h;                       // 0＝尖端、1＝底邊
  return Math.abs(px - it.x) <= (t * b.w) / 2;
}
/** 形狀真正的面積（公式）。 */
export function exactArea(it) {
  if (it.shape === 'circle') return Math.PI * it.r * it.r;
  return it.shape === 'rect' ? it.w * it.h : (it.w * it.h) / 2;
}

/** 形狀落在 rect 裡的面積與那一部分的中心（格點取樣）。 */
export function covered(it, rect = FRAME, step = STEP) {
  const b = bbox(it);
  const x0 = Math.max(b.x, rect.x), x1 = Math.min(b.x + b.w, rect.x + rect.w);
  const y0 = Math.max(b.y, rect.y), y1 = Math.min(b.y + b.h, rect.y + rect.h);
  let n = 0, sx = 0, sy = 0;
  if (x1 > x0 && y1 > y0) {
    // 格點對齊到 step 的倍數（加半格），同一個形狀不管畫框在哪裡都取同一批點
    for (let py = Math.floor(y0 / step) * step + step / 2; py < y1; py += step) {
      if (py < y0) continue;
      for (let px = Math.floor(x0 / step) * step + step / 2; px < x1; px += step) {
        if (px < x0) continue;
        if (inside(it, px, py)) { n++; sx += px; sy += py; }
      }
    }
  }
  return { area: n * step * step, cx: n ? sx / n : it.x, cy: n ? sy / n : it.y };
}

export const weightOf = (it, rect = FRAME) => covered(it, rect).area * contrast(it.L);

/** 整個畫面的重心。dx、dy：重心離畫框中央多遠（半個畫框寬／高＝1；正＝偏右／偏下）。 */
export function balance(items, rect = FRAME) {
  let W = 0, sx = 0, sy = 0;
  const parts = items.map((it) => {
    const c = covered(it, rect), w = c.area * contrast(it.L);
    W += w; sx += w * c.cx; sy += w * c.cy;
    return { id: it.id, area: c.area, weight: w };
  });
  const mx = rect.x + rect.w / 2, my = rect.y + rect.h / 2;
  const cx = W ? sx / W : mx, cy = W ? sy / W : my;
  return { total: W, cx, cy, dx: (cx - mx) / (rect.w / 2), dy: (cy - my) / (rect.h / 2), parts };
}

/** 重心偏哪邊：'center'｜'left'｜'right'，和偏了百分之幾。 */
export function verdict(dx) {
  const pct = Math.round(Math.abs(dx) * 100);
  if (Math.abs(dx) <= CENTER_TOL) return { side: 'center', pct };
  return { side: dx < 0 ? 'left' : 'right', pct };
}

/** 畫框裡沒有被任何東西蓋住的部分（0–1）。 */
export function emptyShare(items, rect = FRAME, step = 8) {
  let all = 0, empty = 0;
  for (let py = rect.y + step / 2; py < rect.y + rect.h; py += step) {
    for (let px = rect.x + step / 2; px < rect.x + rect.w; px += step) {
      all++;
      if (!items.some((it) => inside(it, px, py))) empty++;
    }
  }
  return empty / all;
}

/** 三分線與四個三分點。 */
export function thirds(rect = FRAME) {
  const xs = [rect.x + rect.w / 3, rect.x + (2 * rect.w) / 3];
  const ys = [rect.y + rect.h / 3, rect.y + (2 * rect.h) / 3];
  return { xs, ys, points: [[xs[0], ys[0]], [xs[1], ys[0]], [xs[0], ys[1]], [xs[1], ys[1]]] };
}
/** 點最靠近哪一個三分點；在 THIRD_TOL 以內才回傳編號（0 左上、1 右上、2 左下、3 右下），否則 -1。 */
export function nearThird(px, py, rect = FRAME) {
  const pts = thirds(rect).points;
  let best = -1, bd = Infinity;
  pts.forEach(([x, y], i) => { const d = Math.hypot(px - x, py - y); if (d < bd) { bd = d; best = i; } });
  return bd <= THIRD_TOL * rect.w ? best : -1;
}
export const THIRD_NAMES = [
  { en: 'upper left', zh: '左上' }, { en: 'upper right', zh: '右上' }, { en: 'lower left', zh: '左下' }, { en: 'lower right', zh: '右下' },
];

/** 把形狀的中心限制在 rect 裡（拖曳時用）。 */
export const clampTo = (x, y, rect = FRAME) => [Math.min(rect.x + rect.w, Math.max(rect.x, x)), Math.min(rect.y + rect.h, Math.max(rect.y, y))];

// ── 主模型的三樣東西與幾個擺法 ──────────────────────────────────────
const A = { id: 'A', shape: 'circle', r: 120, L: 78, en: 'big and pale', zh: '大而淡' };
const B = { id: 'B', shape: 'circle', r: 42, L: 18, en: 'small and dark', zh: '小而深' };
const C = { id: 'C', shape: 'rect', w: 150, h: 90, L: 55, en: 'medium', zh: '中等' };
const at = (it, x, y, extra = {}) => ({ ...it, x, y, ...extra });

export const PRESETS = {
  // 一開始：全部擠在左邊
  lean: [at(A, 230, 330), at(B, 170, 170), at(C, 330, 470)],
  // 對稱：左右一模一樣
  sym: [at(C, 400, 450), at(B, 210, 230, { id: 'B1' }), at(B, 590, 230, { id: 'B2' })],
  // 不對稱的平衡：大而淡的靠近中央，小而深的放得遠，像蹺蹺板
  asym: [at(A, 280, 330), at(B, 650, 220), at(C, 400, 520, { w: 120, h: 40, L: 88 })],
  // 放射：從中心往外均勻排開
  radial: [at(B, 400, 300, { id: 'B0', r: 50, L: 40 }),
    ...[0, 1, 2, 3, 4, 5].map((k) => at(B, 400 + 175 * Math.cos((k * Math.PI) / 3), 300 + 175 * Math.sin((k * Math.PI) / 3), { id: `R${k + 1}`, r: 30, L: 30 }))],
  // 三分法：小而深的放在右上的三分點，大而淡的在左下
  thirds: [at(A, 310, 410), at(B, 533.3, 200), at(C, 640, 500, { w: 120, h: 40, L: 88 })],
};
PRESETS.free = PRESETS.lean;

// ── 小互動一：哪一張比較平衡？（六題；答案由 balance() 決定，測試確認差距夠大） ──────────────
const pic = (...items) => items;
export const BAL_ROUNDS = [
  { why: 'center', a: pic(at(A, 230, 300)), b: pic(at(A, 400, 300)) },
  { why: 'seesaw', a: pic(at(A, 280, 330), at(B, 650, 220)), b: pic(at(A, 280, 330), at(B, 200, 150)) },
  { why: 'mirror', a: pic(at(C, 560, 200), at(C, 640, 420, { id: 'C2' })), b: pic(at(C, 220, 300), at(C, 580, 300, { id: 'C2' })) },
  { why: 'dark', a: pic(at(B, 250, 300, { r: 70, L: 15 }), at(B, 550, 300, { id: 'B2', r: 70, L: 85 })), b: pic(at(B, 250, 300, { r: 70, L: 15 }), at(B, 550, 300, { id: 'B2', r: 70, L: 15 })) },
  { why: 'radial', a: PRESETS.radial, b: PRESETS.radial.filter((it) => !['R1', 'R2', 'R6'].includes(it.id)) },
  { why: 'seesaw', a: pic(at(A, 560, 320), at(B, 700, 160)), b: pic(at(A, 520, 320), at(B, 150, 200)) },
].map((r) => ({ ...r, answer: Math.abs(balance(r.a).dx) < Math.abs(balance(r.b).dx) ? 'A' : 'B' }));

// ── 小互動二：裁切看看（同一張寬的風景，移動 4:3 的裁切框） ──────────────────────
export const SCENE = { w: 1600, h: 900, horizon: 520, shore: 470 };
export const SCENE_ITEMS = [
  { id: 'boat', shape: 'rect', x: 1040, y: 640, w: 150, h: 130, en: 'boat', zh: '船' },
  { id: 'tree', shape: 'rect', x: 230, y: 420, w: 110, h: 200, en: 'tree', zh: '樹' },
  { id: 'house', shape: 'rect', x: 400, y: 470, w: 130, h: 110, en: 'house', zh: '房子' },
  { id: 'sun', shape: 'circle', x: 1380, y: 170, r: 55, en: 'sun', zh: '太陽' },
];
export const CROP_MIN = 280, CROP_MAX = 1200;
/** 由三根滑桿（0–1）算出裁切框：s 決定寬度，u、v 決定位置；框永遠在風景裡、永遠是 4:3。 */
export function cropRect(s, u, v) {
  const w = CROP_MIN + (CROP_MAX - CROP_MIN) * s, h = (w * 3) / 4;
  return { x: (SCENE.w - w) * u, y: (SCENE.h - h) * v, w, h };
}
/** 反過來：給裁切框的左上角，求 u、v（拖曳時用）。 */
export function cropUV(rect) {
  const u = SCENE.w > rect.w ? rect.x / (SCENE.w - rect.w) : 0, v = SCENE.h > rect.h ? rect.y / (SCENE.h - rect.h) : 0;
  return [Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v))];
}
const boxIn = (b, r) => b.x >= r.x && b.y >= r.y && b.x + b.w <= r.x + r.w && b.y + b.h <= r.y + r.h;
const boxOut = (b, r) => b.x + b.w <= r.x || b.x >= r.x + r.w || b.y + b.h <= r.y || b.y >= r.y + r.h;
export const fullyIn = (it, r) => boxIn(bbox(it), r);
export const fullyOut = (it, r) => boxOut(bbox(it), r);
const item = (id) => SCENE_ITEMS.find((it) => it.id === id);

export const CROP_TASKS = [
  {
    key: 'third',
    en: 'Put the boat on one of the four thirds points.', zh: '把船放在四個三分點的其中一個上。',
    check(r) {
      const b = item('boat');
      if (!fullyIn(b, r)) return { ok: false, en: 'The whole boat has to be inside the frame.', zh: '整艘船都要在框裡。' };
      const k = nearThird(b.x, b.y, r);
      return k < 0 ? { ok: false, en: 'Close, but the boat is not on a thirds point yet. Turn on the thirds lines to see them.', zh: '差一點，船還沒落在三分點上。打開三分線就看得到。' }
        : { ok: true, k, en: `The boat sits on the ${THIRD_NAMES[k].en} thirds point.`, zh: `船落在${THIRD_NAMES[k].zh}的三分點上。` };
    },
  },
  {
    key: 'alone',
    en: 'Crop so that the boat is in the picture, but the tree and the house are not.', zh: '裁成船在畫面裡，樹和房子都不在。',
    check(r) {
      if (!fullyIn(item('boat'), r)) return { ok: false, en: 'The whole boat has to be inside the frame.', zh: '整艘船都要在框裡。' };
      const left = ['tree', 'house'].filter((id) => !fullyOut(item(id), r));
      return left.length ? { ok: false, en: `Some of the ${left.map((id) => item(id).en).join(' and the ')} is still in the picture.`, zh: `${left.map((id) => item(id).zh).join('和')}還有一部分在畫面裡。` }
        : { ok: true, en: 'Only the boat, the water, and the sky are left. Nothing else asks for attention.', zh: '只剩下船、水和天空，沒有別的東西搶注意力。' };
    },
  },
  {
    key: 'big',
    en: 'Crop close: make the boat fill at least one tenth of the picture.', zh: '裁得近一點：讓船至少占畫面的十分之一。',
    check(r) {
      const b = item('boat');
      if (!fullyIn(b, r)) return { ok: false, en: 'The whole boat has to be inside the frame.', zh: '整艘船都要在框裡。' };
      const share = (b.w * b.h) / (r.w * r.h);
      return share >= 0.1 ? { ok: true, share, en: `The boat now fills ${Math.round(share * 100)}% of the picture. The same boat looks much more important.`, zh: `船現在占畫面的 ${Math.round(share * 100)}%。同一艘船，看起來重要多了。` }
        : { ok: false, share, en: `The boat fills ${Math.round(share * 100)}% of the picture. Make the frame smaller.`, zh: `船占畫面的 ${Math.round(share * 100)}%。把框縮小一點。` };
    },
  },
];
export const boatShare = (r) => { const b = item('boat'); return fullyIn(b, r) ? (b.w * b.h) / (r.w * r.h) : 0; };
