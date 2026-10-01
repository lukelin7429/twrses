/*
 * 萬物原理 · 第十課「彩虹是怎麼形成的？」的雨滴光路計算（純函式，test/rainbow.test.mjs 會跑）。
 *
 * 水的折射率隨顏色不同：用兩點擬合的 Cauchy 式 n(λ) = A + B/λ²，
 *   兩點取自 Wikipedia「Rainbow」：750 nm → 1.330、350 nm → 1.343（綠光約 1.333）。
 * 一道光從距中心 b·R 的高度射進球形水滴：入射角 i = asin(b)，折射角 r = asin(b/n)。
 *   主虹（進去轉彎、後面反射一次、出來再轉彎）：光回頭的角度 θ₁ = 4r − 2i，最大值就是彩虹的半徑（約 42°）。
 *   副虹（反射兩次）：θ₂ = 180° + 2i − 6r，最小值約 50–53°，顏色順序相反。
 * 角度只跟折射率有關、跟水滴大小無關。
 */
export const BANDS = [
  { k: 'red', nm: 650, en: 'Red', zh: '紅', css: '#ff3b2e' },
  { k: 'orange', nm: 600, en: 'Orange', zh: '橙', css: '#ff9a2e' },
  { k: 'yellow', nm: 570, en: 'Yellow', zh: '黃', css: '#ffe03a' },
  { k: 'green', nm: 520, en: 'Green', zh: '綠', css: '#3ad17a' },
  { k: 'blue', nm: 470, en: 'Blue', zh: '藍', css: '#3d7bff' },
  { k: 'violet', nm: 410, en: 'Violet', zh: '紫', css: '#9b5cff' },
];
const D = Math.PI / 180;
const B_ = (1.343 - 1.330) / (1 / 0.35 ** 2 - 1 / 0.75 ** 2);
const A_ = 1.330 - B_ / 0.75 ** 2;
export const nWater = (nm) => A_ + B_ / (nm / 1000) ** 2;

// 主虹：光從射進的方向「回頭」幾度（b：0–1，射入點離中心的比例）
export function primaryAngle(b, n) {
  const i = Math.asin(b), r = Math.asin(b / n);
  return (4 * r - 2 * i) / D;
}
export function secondaryAngle(b, n) {
  const i = Math.asin(b), r = Math.asin(b / n);
  return 180 + (2 * i - 6 * r) / D;
}

// 找極值（彩虹的半徑）與發生的 b
function scan(f, better) {
  let best = null, bb = 0;
  for (let k = 1; k < 4000; k++) {
    const b = k / 4000, v = f(b);
    if (best == null || better(v, best)) { best = v; bb = b; }
  }
  return { angle: best, b: bb };
}
export const rainbowAngle = (n) => scan((b) => primaryAngle(b, n), (v, w) => v > w);
export const secondaryRainbowAngle = (n) => scan((b) => secondaryAngle(b, n), (v, w) => v < w);

// 2D 光路（給 3D 畫線用）：水滴圓心在原點、半徑 R，光沿 +x 前進、從高度 y = b·R 射進來。
// 回傳 [射入點, 背面反射點, 射出點, 出射方向]（皆為 [x, y]）
export function primaryPath(b, n, R = 1) {
  const refract = (d, nrm, eta) => {           // d、nrm 為單位向量，nrm 指向入射的那一側
    const c = -(d[0] * nrm[0] + d[1] * nrm[1]);
    const k = 1 - eta * eta * (1 - c * c);
    if (k < 0) return null;
    const t = eta * c - Math.sqrt(k);
    return [eta * d[0] + t * nrm[0], eta * d[1] + t * nrm[1]];
  };
  const hit = (p, d) => {                         // 從圓內 p 沿 d 走到圓周
    const bq = p[0] * d[0] + p[1] * d[1], cq = p[0] ** 2 + p[1] ** 2 - R * R;
    const t = -bq + Math.sqrt(bq * bq - cq);
    return [p[0] + d[0] * t, p[1] + d[1] * t];
  };
  const y = b * R, p1 = [-Math.sqrt(R * R - y * y), y];
  const n1 = [p1[0] / R, p1[1] / R];
  const d1 = refract([1, 0], n1, 1 / n);
  const p2 = hit(p1, d1);
  const n2 = [p2[0] / R, p2[1] / R];
  const dot = d1[0] * n2[0] + d1[1] * n2[1];
  const d2 = [d1[0] - 2 * dot * n2[0], d1[1] - 2 * dot * n2[1]];
  const p3 = hit(p2, d2);
  const d3 = refract(d2, [-p3[0] / R, -p3[1] / R], n) || d2;   // 從水裡射出：法線指向水滴內（入射那一側）
  return { p1, p2, p3, out: d3 };
}
