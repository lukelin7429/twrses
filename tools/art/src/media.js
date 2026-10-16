/*
 * 美術 Art · 第十課〈水彩、油畫、水墨有什麼不同？〉的純函式與資料（不碰 DOM，test/media.test.mjs 測）。
 *
 * 同一顆蘋果，用三種方式一層一層畫。畫面（360 × 360）分成幾個區域：蘋果的亮面、暗面、亮點、果梗、桌上的影子、紙。
 * 每一步是幾個「塗上去的動作」（op），每個動作塗在某些區域上：
 *   wash  （水彩）：透明的一層，像有顏色的玻璃紙：新顏色＝底下 ×（1 − a ×（1 − 顏料色））。只會越塗越暗。
 *   cover （油畫）：不透明的一層：新顏色＝底下往顏料色靠近 a（a 接近 1 就幾乎蓋住）。淺色可以蓋過深色。
 *   ink   （水墨）：墨加水，a＝墨的濃淡：新顏色＝底下 ×（1 − a ×（1 − 墨色））。水越多 a 越小、越淡。
 * 這些都是示意的模型，數字是自己選的；頁面的模型說明講明了。
 */

export const SIZE = 360;
export const APPLE = { cx: 180, cy: 190, rx: 100, ry: 92 };
const LIT = { cx: 140, cy: 152, r: 128 };                 // 亮面的圓：在它外面的蘋果部分是暗面
const HIGH = { cx: 142, cy: 150, rx: 18, ry: 12 };         // 亮點
const STEM = { x: 171, y: 60, w: 18, h: 40 };               // 果梗
const CAST = { cx: 225, cy: 284, rx: 92, ry: 15 };         // 桌上的影子

export const REGIONS = ['paper', 'cast', 'light', 'shadow', 'highlight', 'stem'];
const inEllipse = (x, y, e) => ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2 <= 1;
/** 畫面上 (x, y) 屬於哪一個區域。 */
export function regionAt(x, y) {
  // 果梗只在蘋果上方（和蘋果重疊的那一小段算蘋果，免得還沒畫果梗時蘋果上出現一塊缺口）
  if (x >= STEM.x && x <= STEM.x + STEM.w && y >= STEM.y && y <= STEM.y + STEM.h && !inEllipse(x, y, APPLE)) return 'stem';
  if (inEllipse(x, y, APPLE)) {
    if (inEllipse(x, y, HIGH)) return 'highlight';
    return (x - LIT.cx) ** 2 + (y - LIT.cy) ** 2 > LIT.r ** 2 ? 'shadow' : 'light';
  }
  if (inEllipse(x, y, CAST)) return 'cast';
  return 'paper';
}
/** 每個區域內部、離邊緣夠遠的取樣點（模糊不會影響到）。 */
export const PROBES = { paper: [40, 40], cast: [290, 286], light: [130, 200], shadow: [255, 230], highlight: [142, 150], stem: [180, 80] };

const RED = [0.82, 0.16, 0.14];
const DEEP = [0.42, 0.08, 0.14];
const BROWN = [0.36, 0.24, 0.14];
const SHADE = [0.55, 0.52, 0.66];
const INK = [0.06, 0.06, 0.07];

export const MEDIA = {
  watercolor: {
    en: 'Watercolor', zh: '水彩', paper: [0.98, 0.97, 0.94], blur: 1,
    steps: [
      { en: 'A light pencil drawing', zh: '淡淡的鉛筆稿', ops: [], why_en: 'The spot for the highlight is planned now. It will be left unpainted.', why_zh: '亮點的位置現在就要想好，之後不塗它。' },
      { en: 'A first, pale wash', zh: '第一層：淡淡的一層', ops: [{ mode: 'wash', regions: ['light', 'shadow'], color: RED, a: 0.42 }], why_en: 'Pale color comes from more water, not from white paint. The highlight stays bare paper.', why_zh: '淡的顏色靠多加水，不是加白色；亮點留著白紙。' },
      { en: 'A second wash on the shadow side', zh: '第二層：暗面再疊一層', ops: [{ mode: 'wash', regions: ['shadow'], color: RED, a: 0.55 }, { mode: 'wash', regions: ['cast'], color: SHADE, a: 0.45 }], why_en: 'The paint is semi-transparent, so the first layer shows through the second and the shadow gets darker.', why_zh: '顏料是半透明的，第一層從第二層底下透出來，暗面就更暗了。' },
      { en: 'The darkest darks and the stem', zh: '最暗的地方和果梗', ops: [{ mode: 'wash', regions: ['shadow'], color: DEEP, a: 0.35 }, { mode: 'wash', regions: ['stem'], color: BROWN, a: 0.9 }], why_en: 'From light to dark: in this way of painting, the darkest touches come last.', why_zh: '由淺到深：用這種畫法，最暗的地方最後才畫。' },
    ],
  },
  oil: {
    en: 'Oil paint', zh: '油畫', paper: [0.93, 0.91, 0.86], blur: 0,
    steps: [
      { en: 'A dark first layer', zh: '先鋪一層暗色', why_en: 'One traditional way of oil painting works from darkest to lightest.', why_zh: '油畫有一種傳統的畫法，是從最暗畫到最亮。', ops: [{ mode: 'cover', regions: ['light', 'shadow', 'highlight', 'stem'], color: [0.32, 0.16, 0.12], a: 0.95 }, { mode: 'cover', regions: ['cast'], color: [0.4, 0.36, 0.38], a: 0.9 }] },
      { en: 'The middle colors', zh: '中間的顏色', why_en: 'The paint covers well, so the new colors hide the dark layer underneath.', why_zh: '顏料的遮蓋力強，新的顏色把底下的暗色蓋住了。', ops: [{ mode: 'cover', regions: ['light', 'highlight'], color: [0.66, 0.12, 0.12], a: 0.92 }, { mode: 'cover', regions: ['shadow'], color: [0.4, 0.07, 0.1], a: 0.92 }, { mode: 'cover', regions: ['stem'], color: BROWN, a: 0.95 }] },
      { en: 'Lighter reds on the lit side', zh: '亮面換成比較淺的紅', why_en: 'Oil dries slowly, so the painter can keep changing and blending colors.', why_zh: '油畫乾得慢，畫家可以一直修改、調和顏色。', ops: [{ mode: 'cover', regions: ['light', 'highlight'], color: [0.86, 0.22, 0.18], a: 0.9 }] },
      { en: 'A light highlight on top of the red', zh: '在紅色上面點上淺色的亮點', why_en: 'A light color can go on top of a darker one, because oil paint covers what is under it.', why_zh: '淺色可以蓋在深色上面，因為油畫顏料會把底下蓋住。', ops: [{ mode: 'cover', regions: ['highlight'], color: [0.98, 0.94, 0.88], a: 0.95 }] },
    ],
  },
  ink: {
    en: 'Ink', zh: '水墨', paper: [0.95, 0.93, 0.86], blur: 2.5,
    steps: [
      { en: 'Blank xuan paper', zh: '空白的宣紙', ops: [], why_en: 'Raw xuan paper drinks in water, so ink on it spreads and blurs.', why_zh: '生宣紙很會吸水，墨畫上去會暈開。' },
      { en: 'Light ink, with lots of water', zh: '淡墨：水很多', ops: [{ mode: 'ink', regions: ['light', 'shadow'], color: INK, a: 0.22 }], why_en: 'One black ink, many grays: the tone depends on how much water is in the brush.', why_zh: '一種黑墨，很多種灰：深淺看筆裡的水有多少。' },
      { en: 'Middle ink on the shadow side', zh: '中墨：畫暗面', ops: [{ mode: 'ink', regions: ['shadow'], color: INK, a: 0.4 }], why_en: 'Once a stroke is down, it cannot be changed or erased, so each stroke is planned.', why_zh: '筆畫一落下就改不了、擦不掉，所以每一筆都要先想好。' },
      { en: 'Dark ink for the stem', zh: '濃墨：畫果梗', ops: [{ mode: 'ink', regions: ['stem'], color: INK, a: 0.9 }], why_en: 'Little water gives dark ink. The highlight is simply paper left blank.', why_zh: '水少，墨就濃。亮點只是留下來沒畫的紙。' },
    ],
  },
};
export const MEDIUM_KEYS = ['watercolor', 'oil', 'ink'];
export const STEPS = 4;

function apply(c, op) {
  if (op.mode === 'cover') return c.map((v, i) => v + (op.color[i] - v) * op.a);
  return c.map((v, i) => v * (1 - op.a * (1 - op.color[i])));      // wash 和 ink：只會變暗
}
/** 第 step 步（0 起算）畫完時，某個區域的顏色。 */
export function colorAt(medium, step, region) {
  const m = MEDIA[medium];
  let c = m.paper.slice();
  for (let s = 0; s <= Math.min(step, m.steps.length - 1); s++) {
    for (const op of m.steps[s].ops) if (op.regions.includes(region)) c = apply(c, op);
  }
  return c;
}
/** 一個區域在這一步有沒有被塗到。 */
export const touched = (medium, step, region) => MEDIA[medium].steps[step].ops.some((op) => op.regions.includes(region));

// ── 小互動一：這是哪一種畫法？（畫完的蘋果放大一塊；at＝放大的中心） ─────────────────
export const WHICH_ROUNDS = [
  { medium: 'watercolor', at: [150, 160], ask_en: 'A close-up of a highlight. Which way was it painted?', ask_zh: '亮點的特寫。這是用哪一種方式畫的？',
    why_en: 'Watercolor. The bright spot is the bare paper, left unpainted from the start.', why_zh: '水彩。最亮的地方是沒塗過的紙，從一開始就留下來。' },
  { medium: 'ink', at: [180, 92], ask_en: 'A close-up of the stem. Which way was it painted?', ask_zh: '果梗的特寫。這是用哪一種方式畫的？',
    why_en: 'Ink. Only black and gray, and the edges spread softly into the paper.', why_zh: '水墨。只有黑和灰，邊緣軟軟地暈進紙裡。' },
  { medium: 'oil', at: [150, 160], ask_en: 'A close-up of a highlight. Which way was it painted?', ask_zh: '亮點的特寫。這是用哪一種方式畫的？',
    why_en: 'Oil paint. The highlight is a light paint laid on top of the red, with a sharp edge.', why_zh: '油畫。亮點是蓋在紅色上面的淺色顏料，邊緣很清楚。' },
  { medium: 'watercolor', at: [265, 270], ask_en: 'A close-up of the shadow side and the table. Which way was it painted?', ask_zh: '暗面和桌面的特寫。這是用哪一種方式畫的？',
    why_en: 'Watercolor. The shadow is made of washes laid one over another, and the paper shows through.', why_zh: '水彩。暗面是一層一層疊上去的，紙的白還透得出來。' },
  { medium: 'oil', at: [180, 92], ask_en: 'A close-up of the stem. Which way was it painted?', ask_zh: '果梗的特寫。這是用哪一種方式畫的？',
    why_en: 'Oil paint. Solid color that covers what is under it, with crisp edges.', why_zh: '油畫。把底下蓋住的實色，邊緣很清楚。' },
  { medium: 'ink', at: [255, 230], ask_en: 'A close-up of the shadow side. Which way was it painted?', ask_zh: '暗面的特寫。這是用哪一種方式畫的？',
    why_en: 'Ink. The shadow is a darker gray made with less water, and there is no color at all.', why_zh: '水墨。暗面是水比較少的深灰色，完全沒有彩色。' },
];

// ── 小互動二：下一步該畫什麼？（answer＝正確選項的位置） ───────────────────────
export const NEXT_ROUNDS = [
  { medium: 'watercolor', step: 1, answer: 1,
    options: [{ en: 'Paint white over the place where the highlight should be', zh: '在亮點的位置塗上白色' }, { en: 'Lay a second, darker wash on the shadow side', zh: '在暗面再疊一層比較深的顏色' }, { en: 'Cover the whole apple with thick dark paint', zh: '把整顆蘋果塗上厚厚的深色' }],
    why_en: 'In this way of painting watercolor, you work from light to dark, one wash over another. The highlight was left as white paper from the start.', why_zh: '用這種水彩畫法，由淺到深，一層疊一層；亮點從一開始就留著白紙。' },
  { medium: 'oil', step: 2, answer: 0,
    options: [{ en: 'Paint the light highlight on top', zh: '在上面畫淺色的亮點' }, { en: 'Wait for the paper to show through', zh: '等紙的白色透出來' }, { en: 'Add lots of water to make it paler', zh: '加很多水讓它變淡' }],
    why_en: 'Oil paint covers well, so a light color can go on top of a darker one.', why_zh: '油畫顏料的遮蓋力強，淺色可以蓋在深色上面。' },
  { medium: 'ink', step: 1, answer: 2,
    options: [{ en: 'Paint the highlight in white ink', zh: '用白色的墨畫亮點' }, { en: 'Add red and yellow paint', zh: '加上紅色和黃色的顏料' }, { en: 'Use ink with less water for the shadow side', zh: '用水比較少的墨畫暗面' }],
    why_en: 'In ink painting, the tone comes from how much water is in the brush. Less water gives a darker gray.', why_zh: '水墨的深淺來自筆裡的水有多少；水越少，墨色越深。' },
  { medium: 'watercolor', step: 2, answer: 0,
    options: [{ en: 'Add the darkest darks and the stem', zh: '畫最暗的地方和果梗' }, { en: 'Cover the shadow with pale paint to make it lighter', zh: '用淺色蓋住暗面，讓它變亮' }, { en: 'Scrape the paint off and start over', zh: '把顏料刮掉重來' }],
    why_en: 'Watercolor is semi-transparent, so a pale wash laid over a dark one will not make it lighter. The darkest touches come last.', why_zh: '水彩是半透明的，淡色疊在深色上面不會讓它變亮；最暗的地方最後才畫。' },
];
