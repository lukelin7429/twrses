/*
 * 世界歷史 第七課〈How Did Qin and Han Unite China? 秦和漢怎麼統一中國？〉的純函式（node test/coins.test.mjs）。
 *
 * 戰國各國的錢長得不一樣；秦統一以後只用一種：圓形、中間方孔的半兩錢。這裡只畫外形（單位：公分），不畫錢上的字。
 *   outline(kind, size)   → { outer: [[x, y], …], holes: [[[x, y], …]] }（以原點為中心，y 往上）
 *       'spade'    布幣：上面一個短柄、下面兩隻腳（方足布）；size = { h, w }
 *       'knife'    刀幣：彎的刀身、末端一個圓環；size = { len, w }
 *       'round'    圜錢：圓形、中間圓孔；size = { d, hole }
 *       'square'   方孔圓錢（秦半兩、漢五銖）；size = { d, hole }
 *       'antnose'  蟻鼻錢（楚）：小小的橢圓、一面鼓起；size = { h, w }
 *   area(poly)            多邊形面積（鞋帶公式，取絕對值）
 *   inside(pt, poly)      點在不在多邊形裡
 *   bbox(poly)            [minX, minY, maxX, maxY]
 */
export const KINDS = ['spade', 'knife', 'round', 'square', 'antnose'];

const circle = (r, n = 40, cx = 0, cy = 0, rev = false) => {
  const out = [];
  for (let i = 0; i < n; i++) { const a = (rev ? -1 : 1) * (i / n) * Math.PI * 2; out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
  return out;
};

export function outline(kind, size) {
  if (kind === 'spade') {
    const { h, w } = size, hw = w / 2, top = h / 2, bot = -h / 2, neck = top - h * 0.28, stem = w * 0.18, crotch = bot + h * 0.22, foot = w * 0.16;
    return { outer: [[-stem, top], [stem, top], [stem, neck], [hw * 0.82, neck - h * 0.04], [hw, bot], [foot, bot], [w * 0.08, crotch], [-w * 0.08, crotch], [-foot, bot], [-hw, bot], [-hw * 0.82, neck - h * 0.04], [-stem, neck]], holes: [] };
  }
  if (kind === 'knife') {
    const { len, w } = size, ringR = w * 0.62, bladeLen = len - ringR * 2, n = 14, outer = [], back = [];
    // 刀身：從刀柄（左）到刀尖（右），微微往上彎
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = -len / 2 + ringR * 2 + t * bladeLen, bend = Math.sin(t * Math.PI * 0.9) * w * 0.35;
      const hw = (t < 0.35 ? w * 0.28 : w * (0.28 + (t - 0.35) * 0.35)) * (t > 0.92 ? (1 - t) / 0.08 * 0.8 + 0.2 : 1);
      outer.push([x, bend + hw]); back.unshift([x, bend - hw]);
    }
    // 刀柄末端的圓環：從刀背接點往外繞一圈，回到刀刃那一邊的接點
    const cx = -len / 2 + ringR, ring = [];
    for (let i = 0; i <= 24; i++) { const a = -Math.PI / 3 - (i / 24) * (4 * Math.PI / 3); ring.push([cx + Math.cos(a) * ringR, Math.sin(a) * ringR]); }
    return { outer: [...outer, ...back, ...ring], holes: [circle(ringR * 0.5, 20, cx, 0, true)] };
  }
  if (kind === 'round' || kind === 'square') {
    const { d, hole } = size, r = d / 2, h = hole / 2;
    const holePoly = kind === 'round' ? circle(h, 24, 0, 0, true) : [[-h, -h], [-h, h], [h, h], [h, -h]];
    return { outer: circle(r, 48), holes: [holePoly] };
  }
  if (kind === 'antnose') {
    const { h, w } = size, out = [];
    for (let i = 0; i < 32; i++) { const a = (i / 32) * Math.PI * 2, s = Math.sin(a); out.push([Math.cos(a) * (w / 2) * (1 - 0.18 * Math.max(0, s)), s * (h / 2)]); }
    return { outer: out, holes: [] };
  }
  throw new RangeError(`Unknown coin: ${kind}`);
}

export function area(poly) {
  let s = 0;
  for (let i = 0; i < poly.length; i++) { const [x1, y1] = poly[i], [x2, y2] = poly[(i + 1) % poly.length]; s += x1 * y2 - x2 * y1; }
  return Math.abs(s) / 2;
}

export function inside([x, y], poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

export function bbox(poly) {
  const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}
