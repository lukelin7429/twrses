/*
 * 美術 Art · 遠近的線索（純函式；test/depth.test.mjs）。第六課〈畫家怎麼畫出遠和近？〉用。
 *
 * 世界裡有五座一模一樣的小山（每座山上一棵樹），立在同一片平地上，離眼睛 5、8、12、18、27 公尺。
 * 畫家把它們畫到畫面上時，可以用四種線索，每一種都可以單獨開或關（cues）：
 *   overlap   重疊：前面的蓋住後面的（關掉＝把五座山左右排開，誰也不擋誰）
 *   size      大小：遠的畫小（關掉＝五座畫得一樣大）
 *   position  位置：遠的畫在比較高的地方、靠近視平線（關掉＝五座的底邊排在同一條線上）
 *   air       空氣：遠的畫得比較淡、偏藍（關掉＝五座同一個顏色）
 * 大小與位置照透視算（和 persp.js 同一個式子）；空氣是示意：顏色照距離往「靠近地平線的天空色」混過去，
 * 混多少的曲線是我們自己選的——真實的空氣要看天氣、濕度和光線。
 */
import { clamp01, rgbToLab, rgbToLch } from './color.js';

export const EYE = { x: 0, y: 1.6, d: 3 };           // 眼睛：高 1.6 公尺，離畫面 3 公尺
export const PIC = { w: 4, h: 3 };                    // 畫面：寬 4、高 3（公尺），底邊在地面上
export const DIST = [5, 8, 12, 18, 27];               // 五座山離眼睛的距離（公尺）；第 1 座最近
export const HILL = { w: 1.1, h: 2.2 };               // 每座山（連樹）的實際寬與高
export const BASE = [0.13, 0.34, 0.2];                // 山的顏色（深綠）
export const HAZE = [0.8, 0.87, 0.95];                // 靠近地平線的天空色（淡淡的藍灰）
export const SKY_TOP = [0.36, 0.6, 0.9];
export const GROUND = [0.82, 0.74, 0.56];
export const HAZE_K = 14;                             // 空氣的「濃度」：每遠 14 公尺，原來的顏色大約剩下 37%
export const CUES = ['overlap', 'size', 'position', 'air'];
export const ALL_ON = { overlap: true, size: true, position: true, air: true };
export const ALL_OFF = { overlap: false, size: false, position: false, air: false };

/** 距離 d 的東西，顏色往天空色混多少（0＝完全是自己的顏色，1＝完全是天空色）。最近的那座山算 0。 */
export const aerialT = (d, k = HAZE_K) => clamp01(1 - Math.exp(-(d - DIST[0]) / k));
/** 空氣透視：距離 d 的東西看起來的顏色。 */
export function aerial(base, d, haze = HAZE, k = HAZE_K) {
  const t = aerialT(d, k);
  return base.map((v, i) => v + (haze[i] - v) * t);
}
/** 地面上距離 d 的一點，畫在畫面上多高（公尺，從畫面底邊算）。越遠越接近視平線。 */
export const groundY = (d, eye = EYE) => eye.y * (1 - eye.d / d);
/** 距離 d 的東西，畫面上的大小是實際大小的幾倍。 */
export const picScale = (d, eye = EYE) => eye.d / d;

// 五座山在畫面上的左右位置（公尺，畫面中心是 0）：重疊的排法、排開的排法
export const X_OVERLAP = [-0.3, 0.15, -0.02, 0.36, 0.47];
export const X_SPREAD = [-1.56, -0.78, 0, 0.78, 1.56];

/**
 * 一座山要怎麼畫：{ d, x, baseY, scale, color }。
 * 關掉某個線索時，就照最近那座山（DIST[0]）的畫法畫。
 */
export function place(d, x, cues = ALL_ON) {
  const d0 = DIST[0];
  return {
    d, x,
    scale: picScale(cues.size ? d : d0),
    baseY: groundY(cues.position ? d : d0),
    color: cues.air ? aerial(BASE, d) : BASE.slice(),
  };
}
/** 整張畫：五座山，由遠到近（先畫遠的，近的才會蓋在上面）。 */
export function compose(cues = ALL_ON) {
  return DIST.map((d, i) => ({ i, n: i + 1, ...place(d, (cues.overlap ? X_OVERLAP : X_SPREAD)[i], cues) })).sort((a, b) => b.d - a.d);
}
/** 畫面上的長方形範圍（公尺）：[x0, y0, x1, y1]。 */
export const picBox = (it) => [it.x - HILL.w * it.scale / 2, it.baseY, it.x + HILL.w * it.scale / 2, it.baseY + HILL.h * it.scale];
export const boxesOverlap = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
/** 這張畫用了幾種線索；一種都沒用就是「平的」。 */
export const cueCount = (cues) => CUES.filter((c) => cues[c]).length;
/** 3D 世界裡，第 i 座山要放在多偏左或偏右，從眼睛看過去才會落在重疊的排法上。 */
export const worldX = (i, eye = EYE) => eye.x + (X_OVERLAP[i] - eye.x) * DIST[i] / eye.d;
export const worldZ = (i, eye = EYE) => eye.d - DIST[i];

// 山的輪廓（一座小丘＋一棵樹），單位是公尺：x 從 -0.55 到 0.55，y 從 0 到 2.2。畫板、3D 都用這一份。
export function hillOutline(n = 18) {
  const pts = [], rx = HILL.w / 2, ry = 1.0, tw = 0.07, cr = 0.42, cy = 1.72;
  const ex = (x) => ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2));
  for (let k = 0; k <= n; k++) { const x = -rx + (rx - tw) * k / n; pts.push([x, ex(x)]); }           // 左邊的丘
  const a0 = Math.asin(tw / cr);                                                                       // 樹幹接上樹冠的角度
  pts.push([-tw, cy - cr * Math.cos(a0)]);
  for (let k = 0; k <= 2 * n; k++) { const a = -Math.PI / 2 - a0 - (2 * Math.PI - 2 * a0) * k / (2 * n); pts.push([cr * Math.cos(a), cy + cr * Math.sin(a)]); }   // 樹冠（順時針繞一圈）
  pts.push([tw, cy - cr * Math.cos(a0)]);
  for (let k = 0; k <= n; k++) { const x = tw + (rx - tw) * k / n; pts.push([x, ex(x)]); }             // 右邊的丘
  return pts;
}

/** 顏色的明度 L* 與彩度 C*（給右邊欄的讀數用）。 */
export const describeColor = (rgb) => { const [L, C, h] = rgbToLch(rgb); return { L, C, h, b: rgbToLab(rgb)[2] }; };

// 「哪一個比較遠？」八題：每題只用一種線索；far 是比較遠的那一個（A 在左、B 在右）
export const FAR_D = 14;
export const FAR_ROUNDS = [
  { cue: 'size', far: 'B' }, { cue: 'overlap', far: 'A' }, { cue: 'air', far: 'A' }, { cue: 'position', far: 'B' },
  { cue: 'overlap', far: 'B' }, { cue: 'position', far: 'A' }, { cue: 'size', far: 'A' }, { cue: 'air', far: 'B' },
];
export const CUE_NAMES = {
  overlap: { en: 'Overlap', zh: '重疊' }, size: { en: 'Size', zh: '大小' }, position: { en: 'Position', zh: '位置' }, air: { en: 'Air', zh: '空氣' },
};
/** 一題要畫的兩座山：[A, B]（先畫遠的）。只打開那一種線索。 */
export function farPair(round) {
  const cues = { ...ALL_OFF, [round.cue]: true };
  const xs = round.cue === 'overlap' ? [-0.22, 0.22] : [-0.8, 0.8];
  const A = { name: 'A', ...place(round.far === 'A' ? FAR_D : DIST[0], xs[0], cues) };
  const B = { name: 'B', ...place(round.far === 'B' ? FAR_D : DIST[0], xs[1], cues) };
  return [A, B].sort((p, q) => q.d - p.d);
}

// 「自己排一張風景」：三棵樹 A、B、C，各放在五個位置之一（1 最近、5 最遠）；三個任務
export const ARRANGE_X = { A: -0.35, B: 0.05, C: 0.4 };
export const ARRANGE_TASKS = [
  { en: 'Put C in front of everything, and A at the very back.', zh: '把 C 放到最前面，把 A 放到最後面。', check: (s) => s.C < s.B && s.B < s.A && s.A === 5 && s.C === 1 },
  { en: 'Put B behind A but in front of C.', zh: '把 B 放在 A 的後面、C 的前面。', check: (s) => s.A < s.B && s.B < s.C },
  { en: 'Make all three as far apart as you can: one at the front, one in the middle, one at the back.', zh: '讓三個彼此離得越遠越好：一個在最前面、一個在中間、一個在最後面。', check: (s) => [s.A, s.B, s.C].slice().sort().join('') === '135' },
];
export function arrangeItems(slots, cues = ALL_ON) {
  return ['A', 'B', 'C'].map((name) => ({ name, ...place(DIST[slots[name] - 1], ARRANGE_X[name], cues) })).sort((p, q) => q.d - p.d);
}
