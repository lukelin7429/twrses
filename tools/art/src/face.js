/*
 * 美術 Art · 第八課〈為什麼畫的臉常常怪怪的？〉的純函式（不碰 DOM，test/face.test.mjs 測）。
 *
 * 單位：頭的高度＝1，下巴 y = 0，頭頂 y = 1（頭髮另外算）。這是一顆簡化的「平均」成人頭，不是任何人的臉。
 * 線的位置照一份大學的繪畫講義（University of Evansville Drawing Lab, “Standard Human Facial Proportions”）：
 *   眼睛在頭頂和下巴的正中間；鼻子底在眼睛和下巴的正中間；嘴巴在鼻子底和下巴的正中間；
 *   耳朵從眉毛的高度到鼻子底的高度；嘴角對齊眼睛的中心。
 * 髮際線和眉毛的高度講義沒有給數字，是自己選的。維特魯威的「三等分」（下巴到鼻孔、鼻孔到眉、眉到髮際線一樣長）
 * 和這份講義的鼻子位置不完全一樣；測量真人的研究（Farkas 1985）發現這些古典比例都不代表平均的臉。頁面都講明了。
 */

export const HAIRLINE = 0.84;
export const LINES = {
  top: 1,
  hairline: HAIRLINE,
  brow: 0.57,
  eye: 0.5,
  nose: 0.25,
  mouth: 0.125,
  chin: 0,
};
export const LINE_ORDER = ['top', 'hairline', 'brow', 'eye', 'nose', 'mouth', 'chin'];
export const LINE_NAMES = {
  top: { en: 'Top of the head', zh: '頭頂' },
  hairline: { en: 'Hairline', zh: '髮際線' },
  brow: { en: 'Eyebrows', zh: '眉毛' },
  eye: { en: 'Eyes: halfway', zh: '眼睛：一半' },
  nose: { en: 'Bottom of the nose', zh: '鼻子底' },
  mouth: { en: 'Mouth', zh: '嘴巴' },
  chin: { en: 'Chin', zh: '下巴' },
};

// 頭的外形：正面的半寬（頭高的倍數）。上半是半個橢圓，下半往下巴收窄。
export const HEAD_W = 0.37;            // 最寬處的半寬（整個頭寬約為頭高的 0.74）
export const DEPTH_K = 1.2;            // 前後比左右深（頭從前面到後面比左右寬）
export const CHIN_W = 0.3;             // 下巴底部的寬度（最寬處的倍數）：下巴是平的，不是尖的
export function halfWidth(y) {
  if (y < 0 || y >= 1) return 0;
  if (y >= 0.5) { const t = (y - 0.5) / 0.5; return HEAD_W * Math.sqrt(Math.max(0, 1 - t * t)); }   // 上半：半個橢圓
  const u = y / 0.5;                   // 0（下巴）… 1（眼睛）
  return HEAD_W * (CHIN_W + (1 - CHIN_W) * Math.sqrt(Math.max(0, 1 - (1 - u) ** 2)));               // 下半：往下巴收窄
}
export const halfDepth = (y) => halfWidth(y) * DEPTH_K;

/** 正面的輪廓（給 SVG 和 canvas 用）：回傳 [x, y] 的點，y 往上。 */
export function outline(n = 120) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const y = 1 - i / n; pts.push([halfWidth(y), y]); }
  for (let i = n; i >= 0; i--) { const y = 1 - i / n; pts.push([-halfWidth(y), y]); }   // 下巴的底邊是平的
  return pts;
}

// 眼睛的大小和間距是自己選的數字（查不到可靠的「眼距等於眼寬」出處，頁面不寫這條規則）。
export const EYE_W = (2 * halfWidth(0.5)) / 5;
export const eyeCenters = (y = LINES.eye) => [[-EYE_W, y], [EYE_W, y]];

// 初學者常見的畫法：眼睛畫得太高（Carbon & Wirth 2014 發現畫的人眼睛一律放得太高；0.64 這個數字是示意，頁面上講明）。
export const HIGH_EYE = 0.64;

/** 把頭轉成畫面座標：頭高 h 像素、下巴在 (cx, baseY)。 */
export const toScreen = ([x, y], cx, baseY, h) => [cx + x * h, baseY - y * h];
export const fromScreenY = (py, baseY, h) => (baseY - py) / h;

// ── 小互動一：眼睛該在哪裡？（三顆頭，頭髮不一樣） ──────────────────────
export const HAIR = {
  none: { en: 'No hair', zh: '沒有頭髮', front: 1, puff: 0 },
  short: { en: 'Short hair', zh: '短髮', front: HAIRLINE, puff: 0.05 },
  bangs: { en: 'Hair with bangs', zh: '有瀏海', front: 0.68, puff: 0.07 },
};
export const EYE_ROUNDS = ['none', 'short', 'bangs'];
export const GRADE = { exact: 0.03, close: 0.08 };
/** 猜的眼睛高度（0–1）和真正的一半差多少；百分比是頭高的百分之幾。 */
export function gradeEye(guess, truth = LINES.eye) {
  // 用四捨五入後的百分比判斷，畫面上寫的數字和評等才一致
  const d = guess - truth, pct = Math.round(Math.abs(d) * 100);
  const grade = pct <= GRADE.exact * 100 ? 'exact' : pct <= GRADE.close * 100 ? 'close' : 'off';
  return { d, pct, grade, dir: grade === 'exact' ? 'on' : d > 0 ? 'high' : 'low' };
}
/** 有頭髮時，看得到的頭頂比真正的頭頂高 puff；從看得到的頭頂量，一半會落在哪裡。 */
export const visibleHalf = (hairKey) => (1 + HAIR[hairKey].puff) / 2;

// ── 小互動二：畫板上的頭（pad.js 的邏輯座標 800 × 500） ───────────────────
export const PAD_HEAD = { cx: 290, baseY: 470, h: 420 };   // 頭放左邊，右邊留給線的名稱
export const padY = (name) => PAD_HEAD.baseY - LINES[name] * PAD_HEAD.h;
