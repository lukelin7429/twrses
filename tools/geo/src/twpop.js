/*
 * 地理 Geography · 第十一課「台灣的人住在哪裡？」的台灣人口格網（純函式，test/twpop.test.mjs）。
 *
 * 資料：GHS-POP R2023A 2025 年推估（歐盟 JRC，CC BY 4.0），scripts/build-twpop.py 加總到第九課的 1 公里台灣格子。
 *
 *   getTwPop()                     { meta, pop: Float64Array（和 T.grid 同順序；海是 0）, total, cities }
 *   BANDS                          三個海拔帶：low（< 100 m）、mid（100–1,000 m）、high（≥ 1,000 m）
 *   bandOf(z)                      海拔 → 帶的 key
 *   bandStats(T, P)                { low: { people, km2, pShare, aShare }, mid, high }
 *   formStats(T, P)                依 landform()（第九課的分類）分：plain、basin、tableland、valley、mountain、other
 *   near(T, P, e, n, r)            半徑 r 公里內（格子中心）的人數、面積、密度
 *   verdict(density)               'many'（每平方公里 1,000 人以上）、'some'、'few'（不到 100 人）
 *   blocks(T, P, k)                k × k 公里一塊加起來：[{ e, n, people, z（平均海拔）}]（3D 的柱子）
 *   densest(T, P)                  人最多的那一格
 *   toHundred(values)              換成 100 人（最大餘數法，加起來剛好 100）
 */
import raw from './data/twpop.json' with { type: 'json' };
import { getTaiwan, landform } from './taiwan.js';

export function decodeTwPop(doc = raw, T = getTaiwan()) {
  const bin = typeof atob === 'function' ? atob(doc.p) : Buffer.from(doc.p, 'base64').toString('binary');
  const pop = new Float64Array(T.grid.length);
  let k = 0, total = 0;
  for (let i = 0; i < T.grid.length; i++) {
    if (Number.isNaN(T.grid[i])) continue;
    let v = bin.charCodeAt(2 * k) | (bin.charCodeAt(2 * k + 1) << 8);
    if (v === 65535) v = doc.big[k];
    pop[i] = v; total += v; k++;
  }
  return { meta: doc.meta, pop, total, cities: doc.cities, T };
}
let cache = null;
export const getTwPop = () => cache || (cache = decodeTwPop());

export const BANDS = [
  { key: 'low', en: 'Below 100 m', zh: '100 公尺以下', from: -Infinity, to: 100, color: '#7fd18b' },
  { key: 'mid', en: '100 to 1,000 m', zh: '100～1,000 公尺', from: 100, to: 1000, color: '#e0c36a' },
  { key: 'high', en: '1,000 m and higher', zh: '1,000 公尺以上', from: 1000, to: Infinity, color: '#b59cff' },
];
export const bandOf = (z) => (z < 100 ? 'low' : z < 1000 ? 'mid' : 'high');

const ofCell = (T, i) => { const x = i % T.nx, y = (i - x) / T.nx; return [T.e0 + x + 0.5, T.n0 + y + 0.5]; };

function share(groups, keys) {
  let P = 0, A = 0;
  for (const k of keys) { P += groups[k].people; A += groups[k].km2; }
  for (const k of keys) { groups[k].pShare = groups[k].people / P; groups[k].aShare = groups[k].km2 / A; }
  return groups;
}

export function bandStats(T, P) {
  const g = Object.fromEntries(BANDS.map((b) => [b.key, { people: 0, km2: 0 }]));
  for (let i = 0; i < T.grid.length; i++) {
    const z = T.grid[i]; if (Number.isNaN(z)) continue;
    const b = g[bandOf(z)]; b.people += P.pop[i]; b.km2 += 1;
  }
  return share(g, BANDS.map((b) => b.key));
}

export const FORMS = ['plain', 'basin', 'tableland', 'valley', 'other', 'mountain'];
let formCache = null;
/** 每一格的地形分類（第九課的 landform；分不出來的叫 other：多半是 100–1,000 公尺的丘陵與山坡） */
export function formOf(T) {
  if (formCache && formCache.T === T) return formCache.f;
  const f = new Array(T.grid.length).fill(null);
  for (let i = 0; i < T.grid.length; i++) if (!Number.isNaN(T.grid[i])) f[i] = landform(T, ...ofCell(T, i)) || 'other';
  formCache = { T, f };
  return f;
}
export function formStats(T, P) {
  const f = formOf(T), g = Object.fromEntries(FORMS.map((k) => [k, { people: 0, km2: 0 }]));
  for (let i = 0; i < f.length; i++) if (f[i]) { g[f[i]].people += P.pop[i]; g[f[i]].km2 += 1; }
  return share(g, FORMS);
}

export function near(T, P, e, n, r = 5) {
  let people = 0, km2 = 0;
  const x0 = Math.floor(e - T.e0 - r), x1 = Math.ceil(e - T.e0 + r), y0 = Math.floor(n - T.n0 - r), y1 = Math.ceil(n - T.n0 + r);
  for (let y = Math.max(0, y0); y <= Math.min(T.ny - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(T.nx - 1, x1); x++) {
    const i = y * T.nx + x; if (Number.isNaN(T.grid[i])) continue;
    if (Math.hypot(T.e0 + x + 0.5 - e, T.n0 + y + 0.5 - n) > r) continue;
    people += P.pop[i]; km2 += 1;
  }
  return { people, km2, density: km2 ? people / km2 : 0 };
}

export const verdict = (d) => (d >= 1000 ? 'many' : d < 100 ? 'few' : 'some');

export function blocks(T, P, k = 3) {
  const out = [];
  for (let by = 0; by < T.ny; by += k) for (let bx = 0; bx < T.nx; bx += k) {
    let people = 0, zs = 0, c = 0;
    for (let y = by; y < Math.min(T.ny, by + k); y++) for (let x = bx; x < Math.min(T.nx, bx + k); x++) {
      const i = y * T.nx + x; if (Number.isNaN(T.grid[i])) continue;
      people += P.pop[i]; zs += T.grid[i]; c++;
    }
    if (c) out.push({ e: T.e0 + bx + Math.min(k, T.nx - bx) / 2, n: T.n0 + by + Math.min(k, T.ny - by) / 2, people, z: zs / c, cells: c });
  }
  return out;
}

export function densest(T, P) {
  let b = -1;
  for (let i = 0; i < P.pop.length; i++) if (b < 0 || P.pop[i] > P.pop[b]) b = i;
  const [e, n] = ofCell(T, b);
  return { e, n, people: P.pop[b] };
}

export function toHundred(values) {
  const sum = values.reduce((a, b) => a + b, 0);
  const raw = values.map((v) => (v / sum) * 100), n = raw.map(Math.floor);
  let left = 100 - n.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - n[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { n[i]++; left--; } });
  return n;
}
