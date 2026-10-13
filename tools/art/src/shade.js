/*
 * 美術 Art · 明暗（純函式；test/shade.test.mjs）。第三課〈明暗怎麼把圓形變成球？〉用，之後講素描、立體感的課共用。
 *
 * 一顆球放在桌面上，一盞燈。球面上每一點多亮，只看「那一點朝哪裡」和「光從哪裡來」：
 *   value(n, L)＝環境光＋直接光 × max(0, n·l)＋桌面的反光（只落在背光、朝下的地方）＋亮點
 * 回傳的是 0–1 的灰（螢幕的設定值，乘 255 就是 0–255）。art-ball.js 的著色器照這裡的公式寫，兩邊要一起改。
 * 這是畫圖用的簡化模型：燈當成很遠的平行光、反光只用一個式子估計、沒有真的去算光在房間裡來回反射。
 */
import { clamp01, rgbToLab } from './color.js';

export const BALL_R = 1;
export const AMBIENT = 0.06;        // 背光面最暗處還剩多少（房間裡散開的光）
export const DIFFUSE = 0.80;        // 直接照到的光最多加多少
export const BOUNCE = 0.20;         // 桌面反光最多加多少
export const SPEC = 0.30;           // 亮點最多加多少
export const SHINE = 60;            // 亮點多集中
export const TABLE = 0.50;          // 桌面被燈正正照到時的灰
export const VIEW = [0, 0.35, 0.94];   // 標示亮點時用的觀看方向（大約是預設鏡頭）

const norm = (v) => { const m = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / m, v[1] / m, v[2] / m]; };
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };

/** 燈的方向：az 方位角（0＝正前方，正值往右，度），el 仰角（度）。回傳「從球指向燈」的單位向量。 */
export function lightDir(az, el) {
  const a = az * Math.PI / 180, e = el * Math.PI / 180;
  return [Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)];
}

/** 球面上法線是 n 的那一點有多亮（0–1）。view 給了才加亮點。 */
export function ballValue(n, l, view = VIEW) {
  const ndl = dot(n, l);
  let v = AMBIENT + DIFFUSE * Math.max(0, ndl);
  // 桌面把光彈回來：只照亮朝下、而且背光的地方；燈越高，桌面越亮，彈回來的光越多
  v += BOUNCE * Math.max(0, -n[1]) * smooth(0.15, -0.35, ndl) * Math.max(0, l[1]);
  if (view && ndl > 0) {
    const h = norm([l[0] + view[0], l[1] + view[1], l[2] + view[2]]);
    v += SPEC * Math.pow(Math.max(0, dot(n, h)), SHINE);
  }
  return clamp01(v);
}

/** 把連續的灰分成 steps 階（素描的樣子）：回傳 [第幾階（0 最暗）, 那一階顯示的灰]。 */
export function quantize(v, steps) {
  const k = Math.min(steps - 1, Math.floor(clamp01(v) * steps));
  return [k, steps === 1 ? 0.5 : k / (steps - 1)];
}

/** 球（球心在 (0, R, 0)）的影子落在桌面（y＝0）的哪裡：平行光下是一個橢圓。 */
export function castShadow(l, R = BALL_R) {
  const t = R / l[1];
  const cx = -l[0] * t, cz = -l[2] * t;
  const h = Math.hypot(l[0], l[2]);
  return { cx, cz, minor: R, major: R / l[1], dirx: h ? -l[0] / h : 0, dirz: h ? -l[2] / h : 1 };
}

/** 桌面上的點 (x, 0, z) 有多亮（0–1）：照得到的地方看燈有多高，影子裡只剩環境光。 */
export function tableValue(x, z, l, R = BALL_R, soft = 0.07) {
  const lit = AMBIENT + TABLE * Math.max(0, l[1]);
  // 從這一點朝燈走，離球心最近的距離小於半徑，就是被擋住了
  const pc = [-x, R, -z], t = dot(pc, l);
  if (t <= 0) return clamp01(lit);
  const d = Math.hypot(pc[0] - l[0] * t, pc[1] - l[1] * t, pc[2] - l[2] * t);
  const open = smooth(R - soft, R + soft, d);
  return clamp01(AMBIENT + 0.03 + (lit - AMBIENT - 0.03) * open);
}

/** 這一點屬於哪一區（給標籤與測試用）。 */
export function zoneOf(n, l, view = VIEW) {
  const ndl = dot(n, l);
  if (ndl > 0 && view) {
    const h = norm([l[0] + view[0], l[1] + view[1], l[2] + view[2]]);
    if (Math.pow(Math.max(0, dot(n, h)), SHINE) > 0.5) return 'highlight';
  }
  if (ndl > 0.5) return 'light';
  if (ndl > 0.05) return 'halftone';
  if (ndl > -0.3) return 'core';
  return n[1] < -0.25 && l[1] > 0.1 ? 'reflected' : 'shadow';
}

/** 六個標示點在球面上的法線（看得到的那一面），以及影子的中心。 */
export function landmarks(l, view = VIEW) {
  const v = norm(view);
  const h = norm([l[0] + v[0], l[1] + v[1], l[2] + v[2]]);
  const k = dot(v, l);
  let t = [v[0] - k * l[0], v[1] - k * l[1], v[2] - k * l[2]];           // 朝向觀看者、又剛好在明暗交界上
  if (Math.hypot(t[0], t[1], t[2]) < 1e-3) t = [1, 0, 0];
  t = norm(t);
  // u：同時垂直於光和 t 的方向，讓「亮面」的標示點避開亮點
  const u = norm([l[1] * t[2] - l[2] * t[1], l[2] * t[0] - l[0] * t[2], l[0] * t[1] - l[1] * t[0]]);
  const s = castShadow(l);
  return {
    highlight: h,
    light: norm([l[0] + t[0] * 0.8 + u[0] * 0.6, l[1] + t[1] * 0.8 + u[1] * 0.6, l[2] + t[2] * 0.8 + u[2] * 0.6]),
    halftone: norm([l[0] * 0.3 + t[0], l[1] * 0.3 + t[1], l[2] * 0.3 + t[2]]),
    core: norm([t[0] - l[0] * 0.14, t[1] - l[1] * 0.14, t[2] - l[2] * 0.14]),
    reflected: norm([t[0] * 1.1 - l[0] * 0.5, t[1] * 1.1 - 0.75, t[2] * 1.1 - l[2] * 0.5]),
    cast: [s.cx + s.dirx * s.major * 0.55, 0, s.cz + s.dirz * s.major * 0.55],   // 影子裡靠外側的一點（影子中心常被球擋住）
  };
}

/** 灰（0–1）的明度 L*（0–100）。 */
export const lightness = (v) => rgbToLab([v, v, v])[0];

/** 光從哪裡來，用話說：{ side: left|right|front|behind, height: low|middle|high }。 */
export function describeLight(az, el) {
  const a = ((az + 540) % 360) - 180;
  const side = Math.abs(a) <= 30 ? 'front' : Math.abs(a) >= 150 ? 'behind' : a > 0 ? 'right' : 'left';
  return { side, height: el < 30 ? 'low' : el < 60 ? 'middle' : 'high' };
}

// 「燈在哪裡？」六題：答案是 az／el；四個選項都是 DIRS 的 key
export const DIRS = {
  ul: { az: -55, el: 50, arrow: '↖', en: 'Upper left', zh: '左上方' },
  ur: { az: 55, el: 50, arrow: '↗', en: 'Upper right', zh: '右上方' },
  top: { az: 0, el: 82, arrow: '↑', en: 'Straight above', zh: '正上方' },
  left: { az: -80, el: 14, arrow: '←', en: 'Low on the left', zh: '左邊，很低' },
  right: { az: 80, el: 14, arrow: '→', en: 'Low on the right', zh: '右邊，很低' },
  front: { az: 0, el: 30, arrow: '●', en: 'In front, near you', zh: '正前方，靠近你' },
};
export const LAMP_ROUNDS = [
  { answer: 'ul', options: ['ul', 'ur', 'top', 'right'] },
  { answer: 'right', options: ['left', 'right', 'top', 'ul'] },
  { answer: 'top', options: ['front', 'top', 'ul', 'left'] },
  { answer: 'ur', options: ['ul', 'left', 'ur', 'front'] },
  { answer: 'left', options: ['right', 'ur', 'top', 'left'] },
  { answer: 'front', options: ['top', 'front', 'right', 'ul'] },
];

// 「由亮排到暗」三回合：五塊灰（0–1），越後面的回合彼此越接近
export const SORT_ROUNDS = [
  [0.95, 0.72, 0.5, 0.28, 0.08],
  [0.82, 0.68, 0.54, 0.4, 0.26],
  [0.7, 0.62, 0.54, 0.46, 0.38],
];
/** 固定的打亂順序（不靠亂數，測試才穩定）。 */
export const SHUFFLES = [[2, 4, 0, 3, 1], [3, 0, 4, 1, 2], [1, 3, 0, 4, 2]];
export const isSorted = (vals) => vals.every((v, i) => i === 0 || vals[i - 1] > v);
