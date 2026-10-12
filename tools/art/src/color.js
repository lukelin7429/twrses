/*
 * 美術 Art · 顏色引擎（純函式，沒有 DOM、沒有 three.js；test/color.test.mjs）。
 *
 * 顏色一律是 [r, g, b]，每個數字 0–1，代表「螢幕上那個子像素開多亮」（sRGB 編碼後的值，乘 255 就是常見的 0–255）。
 *
 *   mixLight(parts)   光的混色（加法）：各盞燈的顏色乘上亮度後相加，超過 1 就截在 1。
 *   mixPaint(parts)   顏料混色的「示意模型」（減法）：白紙反射全部的光，每一層顏料各自「吸掉」一部分的紅、綠、藍。
 *                     這不是真的顏料：只把光分成紅綠藍三段、顏料當成透明的色片一層一層疊、吸收的比例是我們自己選的。
 *   rgbToHsl / hslToRgb / rgbToHsv     螢幕上常用的色相、彩度、亮度數字
 *   rgbToLab / rgbToLch / deltaE       CIELAB（D65）：L* 是明度、C* 是彩度、h 是色相角；deltaE 是 CIE76 色差
 *   colorName(rgb)    給顏色一個英文與中文名稱（色覺差異：互動裡每個顏色都要有文字）
 */

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const to255 = (rgb) => rgb.map((v) => Math.round(clamp01(v) * 255));
export const hex = (rgb) => '#' + to255(rgb).map((v) => v.toString(16).padStart(2, '0')).join('');
export const css = (rgb) => { const [r, g, b] = to255(rgb); return `rgb(${r}, ${g}, ${b})`; };

// ── 光（加法混色）──────────────────────────────────────────────────────
export const LIGHTS = [
  { key: 'r', letter: 'R', en: 'Red', zh: '紅', rgb: [1, 0, 0] },
  { key: 'g', letter: 'G', en: 'Green', zh: '綠', rgb: [0, 1, 0] },
  { key: 'b', letter: 'B', en: 'Blue', zh: '藍', rgb: [0, 0, 1] },
];

/** parts: [{ rgb, k }]，k 是亮度 0–1。回傳相加後的顏色。 */
export function mixLight(parts) {
  const out = [0, 0, 0];
  for (const p of parts) {
    const k = p.k === undefined ? 1 : p.k;
    for (let c = 0; c < 3; c++) out[c] += p.rgb[c] * k;
  }
  return out.map(clamp01);
}

// ── 顏料（減法混色的示意模型）──────────────────────────────────────────
// absorb＝這種顏料塗滿一層時，吸掉多少紅光、綠光、藍光（0＝完全不吸，1＝全部吸掉）。
// 理想的黃只吸藍、洋紅只吸綠、青只吸紅；這裡刻意不做成理想值（主要的那一段吸掉九成左右，另外兩段也吸掉一點），
// 所以三層疊起來是「接近黑」而不是純黑。這些數字是示意，不是量出來的。
export const PIGMENTS = [
  { key: 'y', letter: 'Y', en: 'Yellow', zh: '黃', absorb: [0.02, 0.06, 0.92] },
  { key: 'm', letter: 'M', en: 'Magenta', zh: '洋紅', absorb: [0.06, 0.90, 0.10] },
  { key: 'c', letter: 'C', en: 'Cyan', zh: '青', absorb: [0.92, 0.10, 0.04] },
];
export const PAPER = [1, 1, 1];

/** 一層顏料讓多少光通過：amount 0（沒塗）到 1（塗滿一層）。 */
export const pigmentPass = (absorb, amount = 1) => absorb.map((a) => 1 - clamp01(amount) * a);

/** parts: [{ absorb, k }]。白紙的光依序被每一層吸掉一部分，剩下的就是看到的顏色。 */
export function mixPaint(parts, paper = PAPER) {
  const out = paper.slice();
  for (const p of parts) {
    const pass = pigmentPass(p.absorb, p.k === undefined ? 1 : p.k);
    for (let c = 0; c < 3; c++) out[c] *= pass[c];
  }
  return out.map(clamp01);
}

export const pigmentColor = (key, amount = 1) => mixPaint([{ absorb: PIGMENTS.find((p) => p.key === key).absorb, k: amount }]);

// ── 螢幕上常用的色相／彩度／亮度 ───────────────────────────────────────
/** → [h 0–360, s 0–1, l 0–1] */
export function rgbToHsl([r, g, b]) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  return [hueOf(r, g, b, mx, d), s, l];
}
/** → [h 0–360, s 0–1, v 0–1] */
export function rgbToHsv([r, g, b]) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (d === 0) return [0, 0, mx];
  return [hueOf(r, g, b, mx, d), d / mx, mx];
}
function hueOf(r, g, b, mx, d) {
  let h;
  if (mx === r) h = ((g - b) / d) % 6;
  else if (mx === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}
export function hslToRgb([h, s, l]) {
  const c = (1 - Math.abs(2 * l - 1)) * s, hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1)), m = l - c / 2;
  const [r, g, b] = hp < 1 ? [c, x, 0] : hp < 2 ? [x, c, 0] : hp < 3 ? [0, c, x] : hp < 4 ? [0, x, c] : hp < 5 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m];
}

// ── CIELAB（D65 白點）：明度 L*、彩度 C*、色相角 h ──────────────────────
export const srgbToLinear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
export const linearToSrgb = (v) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);
const WHITE = [0.95047, 1, 1.08883];
export function rgbToXyz(rgb) {
  const [r, g, b] = rgb.map((v) => srgbToLinear(clamp01(v)));
  return [
    0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
    0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
    0.0193339 * r + 0.1191920 * g + 0.9503041 * b,
  ];
}
/** 相對亮度 Y（0–1）：同樣開到最亮，綠看起來比紅亮、紅比藍亮。 */
export const luminance = (rgb) => rgbToXyz(rgb)[1];
export function rgbToLab(rgb) {
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const [x, y, z] = rgbToXyz(rgb).map((v, i) => f(v / WHITE[i]));
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
/** → [L* 明度 0–100, C* 彩度, h 色相角 0–360] */
export function rgbToLch(rgb) {
  const [L, a, b] = rgbToLab(rgb);
  const h = Math.atan2(b, a) * 180 / Math.PI;
  return [L, Math.hypot(a, b), h < 0 ? h + 360 : h];
}
/** 兩個顏色差多少（CIE76：Lab 空間裡的直線距離）。0＝一樣；黑和白相差 100。 */
export function deltaE(a, b) {
  const p = rgbToLab(a), q = rgbToLab(b);
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

export const MATCH_AT = 6;     // 色差在這個數字以內，「調出這個顏色」算調出來了
export const CLOSE_AT = 15;
export function matchGrade(dE) {
  if (dE <= MATCH_AT) return { key: 'match', mark: '●', en: 'A match', zh: '調出來了' };
  if (dE <= CLOSE_AT) return { key: 'close', mark: '◐', en: 'Close', zh: '很接近' };
  if (dE <= 35) return { key: 'near', mark: '○', en: 'Getting there', zh: '還差一點' };
  return { key: 'far', mark: '△', en: 'Far apart', zh: '差很多' };
}

// ── 顏色的名字 ────────────────────────────────────────────────────────
const N = (key, en, zh) => ({ key, en, zh });
export function colorName(rgb) {
  const c = rgb.map(clamp01);
  const [h, s, v] = rgbToHsv(c);
  if (v < 0.06) return N('black', 'Black', '黑');
  if (v < 0.2) return N('nearblack', 'Almost black', '接近黑');
  if (s < 0.12) {
    if (v > 0.93) return N('white', 'White', '白');
    if (v > 0.62) return N('lightgray', 'Light gray', '淺灰');
    if (v > 0.35) return N('gray', 'Gray', '灰');
    return N('darkgray', 'Dark gray', '深灰');
  }
  let base;
  if (h < 15 || h >= 345) base = N('red', 'red', '紅');
  else if (h < 45) base = N('orange', 'orange', '橙');
  else if (h < 70) base = N('yellow', 'yellow', '黃');
  else if (h < 165) base = N('green', 'green', '綠');
  else if (h < 200) base = N('cyan', 'cyan', '青');
  else if (h < 255) base = N('blue', 'blue', '藍');
  else if (h < 290) base = N('purple', 'purple', '紫');
  else base = N('magenta', 'magenta', '洋紅');
  const cap = (t) => t[0].toUpperCase() + t.slice(1);
  if (base.key === 'orange' && v < 0.62) return N('brown', 'Brown', '棕');
  if ((base.key === 'red' || base.key === 'magenta') && s < 0.6 && v > 0.8) return N('pink', 'Pink', '粉紅');
  if (v < 0.55) return N('dark' + base.key, 'Dark ' + base.en, '暗' + base.zh);
  if (s < 0.5 && v > 0.8) return N('light' + base.key, 'Light ' + base.en, '淺' + base.zh);
  return N(base.key, cap(base.en), base.zh);
}

/** 色塊上的字要用深色還是淺色。 */
export const inkOn = (rgb) => (luminance(rgb) > 0.36 ? '#10131c' : '#ffffff');

/** 0–1 → "100%" */
export const pct = (v) => `${Math.round(clamp01(v) * 100)}%`;

// ── 「調出這個顏色」的題目 ────────────────────────────────────────────
// light：三個數字是紅、綠、藍三盞燈的亮度；paint：三個數字是黃、洋紅、青三層顏料的厚度。
export const MATCH_ROUNDS = [
  { mode: 'light', mix: [1, 1, 0] },
  { mode: 'light', mix: [1, 0.5, 0] },
  { mode: 'light', mix: [0.6, 0.6, 0.6] },
  { mode: 'light', mix: [1, 0.5, 0.75] },
  { mode: 'paint', mix: [1, 1, 0] },
  { mode: 'paint', mix: [1, 0, 1] },
  { mode: 'paint', mix: [1, 0.5, 0] },
  { mode: 'paint', mix: [0.5, 1, 1] },
];
export function mixOf(mode, mix) {
  return mode === 'light'
    ? mixLight(LIGHTS.map((l, i) => ({ rgb: l.rgb, k: mix[i] })))
    : mixPaint(PIGMENTS.map((p, i) => ({ absorb: p.absorb, k: mix[i] })));
}
/** 每根滑桿該往哪邊調：-1 少一點、0 差不多、+1 多一點（tol 是容許的差距）。 */
export const sliderHints = (mine, target, tol = 0.08) => mine.map((v, i) => (Math.abs(v - target[i]) <= tol ? 0 : v < target[i] ? 1 : -1));
