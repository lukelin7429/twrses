/*
 * 美術 Art · 色相環與配色（純函式；test/wheel.test.mjs）。第二課〈顏色怎麼搭配？〉用，之後講配色的課共用。
 *
 * 色相環不只一種。這裡放兩個，各十二格、順時針排：
 *   ryb  畫家的色相環：紅、黃、藍三個原色等距，中間是橙、綠、紫。十二個色塊是「代表這個名稱」的螢幕顏色，不是任何顏料的實測值。
 *   rgb  螢幕的色相環：色相角每 30° 一格（hslToRgb），紅、綠、藍三個原色等距，中間是黃、青、洋紅。
 * 「對面的顏色」（互補色）在兩個色相環上不一樣：紅的對面，在 ryb 是綠，在 rgb 是青。
 */
import { deltaE, hslToRgb } from './color.js';

const hexToRgb = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16) / 255);
const RYB = [
  ['#fe2712', 'Red', '紅'], ['#fd5308', 'Red-orange', '紅橙'], ['#fb9902', 'Orange', '橙'], ['#fabc02', 'Yellow-orange', '黃橙'],
  ['#fefe33', 'Yellow', '黃'], ['#d0ea2b', 'Yellow-green', '黃綠'], ['#66b032', 'Green', '綠'], ['#0a9aa0', 'Blue-green', '藍綠'],
  ['#0247fe', 'Blue', '藍'], ['#3d01a4', 'Blue-purple', '藍紫'], ['#8601af', 'Purple', '紫'], ['#a7194b', 'Red-purple', '紅紫'],
];
const RGB = [
  ['Red', '紅'], ['Orange', '橙'], ['Yellow', '黃'], ['Yellow-green', '黃綠'], ['Green', '綠'], ['Spring green', '春綠'],
  ['Cyan', '青'], ['Sky blue', '天藍'], ['Blue', '藍'], ['Purple', '紫'], ['Magenta', '洋紅'], ['Rose', '玫瑰紅'],
];
export const N = 12;
export const WHEELS = {
  ryb: {
    key: 'ryb', en: "Painter's wheel", zh: '畫家的色相環', primaries: [0, 4, 8],
    hues: RYB.map(([hex, en, zh], i) => ({ i, n: i + 1, en, zh, rgb: hexToRgb(hex) })),
  },
  rgb: {
    key: 'rgb', en: 'Screen wheel', zh: '螢幕的色相環', primaries: [0, 4, 8],
    hues: RGB.map(([en, zh], i) => ({ i, n: i + 1, en, zh, rgb: hslToRgb([i * 30, 1, 0.5]).map((v) => Math.round(v * 255) / 255) })),
  },
};
export const mod = (i) => ((i % N) + N) % N;

// 配色：回傳色相環上的格子編號，第一個是主色
export const SCHEMES = {
  analogous: { key: 'analogous', en: 'Neighbors', zh: '類似色', mark: '◆', steps: [0, -1, 1] },
  complementary: { key: 'complementary', en: 'Opposites', zh: '互補色', mark: '▲', steps: [0, 6] },
  triad: { key: 'triad', en: 'Three evenly spaced', zh: '三等分', mark: '■', steps: [0, 4, 8] },
};
export const schemeIdx = (kind, i) => SCHEMES[kind].steps.map((s) => mod(i + s));
export const complementOf = (i) => mod(i + 6);
export const schemeColors = (wheel, kind, i) => schemeIdx(kind, i).map((k) => WHEELS[wheel].hues[k]);

// 暖色與冷色（寒色）是慣用的說法：常見的講法是紅到黃叫暖色、藍綠到藍紫叫冷色（Wikipedia “Color theory”）。
// 綠和紫算哪一邊，各家說法不同（教育部辭典把綠、紫算寒色），這裡標成 between。
const WARMTH = {
  ryb: ['warm', 'warm', 'warm', 'warm', 'warm', 'between', 'between', 'cool', 'cool', 'cool', 'between', 'between'],
  rgb: ['warm', 'warm', 'warm', 'between', 'between', 'between', 'cool', 'cool', 'cool', 'cool', 'between', 'between'],
};
export const warmth = (wheel, i) => WARMTH[wheel][mod(i)];

// 淺色（加白）與暗色（加黑）：t＝0 不變，1＝全白或全黑
export const tint = (rgb, t) => rgb.map((v) => v + (1 - v) * t);
export const shade = (rgb, t) => rgb.map((v) => v * (1 - t));

/** 同一張圖的七個區塊各用什麼顏色。colors＝兩個或三個 [r, g, b]，第一個是主色。 */
export function pictureColors(colors) {
  const a = colors[0], b = colors[1], c = colors[2];
  return {
    sky: tint(b, 0.74), far: tint(b, 0.36), near: b, wall: a, roof: shade(a, 0.38), door: shade(b, 0.5),
    window: tint(a, 0.72), sun: c || tint(a, 0.5),
  };
}

/** 主色（第一個）和其他幾個顏色，最多相差多少（CIE76 色差；黑白相差 100）。 */
export function mainDelta(colors) {
  let m = 0;
  for (let j = 1; j < colors.length; j++) m = Math.max(m, deltaE(colors[0], colors[j]));
  return m;
}

// 「這是哪一個？」六題。answer 與 options 都是色相環上的格子編號；kind：opposite 對面、neighbor 旁邊、cool／warm
export const PICK_ROUNDS = [
  { wheel: 'ryb', kind: 'opposite', of: 0, options: [6, 4, 8, 2] },
  { wheel: 'ryb', kind: 'neighbor', of: 2, options: [8, 3, 6, 10] },
  { wheel: 'ryb', kind: 'cool', options: [1, 4, 8, 0] },
  { wheel: 'ryb', kind: 'opposite', of: 8, options: [4, 6, 2, 10] },
  { wheel: 'rgb', kind: 'opposite', of: 0, options: [4, 8, 6, 2] },
  { wheel: 'rgb', kind: 'opposite', of: 8, options: [0, 2, 4, 6] },
];
export function pickAnswer(r) {
  if (r.kind === 'opposite') return complementOf(r.of);
  if (r.kind === 'neighbor') return r.options.find((o) => mod(o - r.of) === 1 || mod(o - r.of) === N - 1);
  return r.options.find((o) => warmth(r.wheel, o) === r.kind);
}
