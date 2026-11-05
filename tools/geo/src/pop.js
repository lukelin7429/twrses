/*
 * 地理 Geography · 第八課「人都住在哪裡？」的人口資料（純函式，test/pop.test.mjs）。
 *
 * 資料：GHS-POP R2023A，2025 年，30 角秒（歐盟 JRC，CC BY 4.0）；處理步驟見 scripts/build-pop.py：
 * 加總成 1 度格子，再換算成「一點＝一百萬人」的點（誤差擴散，所以人少的地方也有點）。
 * 提示範圍：幾個大沙漠取自 Natural Earth 1:50m Geography Regions（公有領域，大約的範圍）；
 * 高地是海拔 3,000 公尺以上（NOAA ETOPO5，南北緯 60 度之間，0.25 度格子）；寒帶照第七課：南北緯 66.56 度（90 − 23.44）以外。
 * 各範圍占全世界人口與陸地面積的比例，在處理腳本裡用 5 分格子算好（meta.stats）；頁面只數點。
 *
 *   getPop()                       { meta, dots: Float32Array [lon, lat, …], cells: Map(index → 人), areas }
 *   cellIndex(lon, lat)            1 度格子的編號（y × 360 + x；x 0 是西經 180 到 179 度，y 0 是北緯 90 到 89 度）
 *   peopleIn(pop, lon, lat)        那一個 1 度格子裡大約住了多少人
 *   cellKm2(lat)                   那一列 1 度格子的面積（平方公里，球面、平均半徑）
 *   inRing(lon, lat, ring)／inArea(pop, kind, lon, lat)   在不在某個提示範圍裡（kind：'desert' 'high' 'polar'）
 *   areaStats(pop, kind)           那個範圍裡的點數，加上 meta.stats 的人數、占全世界人口與陸地面積的比例
 *   latBands(pop, edges)           依緯度帶分的人口
 *   PLACES / verdict(pop, place)   小遊戲的地點；verdict 用資料判斷「人多」或「人少」
 */
import raw from './data/pop.json' with { type: 'json' };

const RAD = Math.PI / 180;
export const R_KM = 6371.0088;
export const POLAR = 90 - 23.44;
export const MANY = 1_000_000;      // 小遊戲：一個 1 度格子住了一百萬人以上算「人多」
export const FEW = 100_000;         // 不到十萬人算「人少」（中間的不出題）

let cache = null;
export function decodePop(doc = raw) {
  const dots = new Float32Array(doc.dots.length);
  for (let i = 0; i < doc.dots.length; i++) dots[i] = doc.dots[i] / 10;
  const cells = new Map();
  for (const [x, y, k] of doc.cells) cells.set(y * 360 + x, k * 100);
  return { meta: doc.meta, dots, cells, areas: doc.areas };
}
export const getPop = () => cache || (cache = decodePop());

export function cellIndex(lon, lat) {
  const x = Math.min(359, Math.max(0, Math.floor(lon + 180)));
  const y = Math.min(179, Math.max(0, Math.floor(90 - lat)));
  return y * 360 + x;
}
export const peopleIn = (pop, lon, lat) => pop.cells.get(cellIndex(lon, lat)) || 0;
export const cellKm2 = (lat) => (R_KM * RAD) ** 2 * Math.cos(lat * RAD);
export function totalPeople(pop) { let s = 0; for (const v of pop.cells.values()) s += v; return s; }

/** 偶奇規則 */
export function inRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > lat) !== (yj > lat) && lon < xi + (lat - yi) * (xj - xi) / (yj - yi)) inside = !inside;
  }
  return inside;
}
const highRows = (pop) => pop.highRows || (pop.highRows = (() => {
  const rows = new Map();
  for (const [r, a, b] of pop.areas.high) { if (!rows.has(r)) rows.set(r, []); rows.get(r).push([a, b]); }
  return rows;
})());
export function inArea(pop, kind, lon, lat) {
  if (kind === 'polar') return Math.abs(lat) > POLAR;
  if (kind === 'high') {
    const runs = highRows(pop).get(Math.floor((90 - lat) * 4)), c = Math.floor((lon + 180) * 4);
    return !!runs && runs.some(([a, b]) => c >= a && c < b);
  }
  return pop.areas[kind].some((r) => inRing(lon, lat, r));
}

/** 點數用點算；人數、比例用處理腳本在 5 分格子上算好的 meta.stats */
export function areaStats(pop, kind) {
  let dots = 0;
  for (let i = 0; i < pop.dots.length; i += 2) if (inArea(pop, kind, pop.dots[i], pop.dots[i + 1])) dots++;
  const s = pop.meta.stats[kind];
  return { dots, people: s.people, share: s.share, land: s.land };
}

export function latBands(pop, edges) {
  const out = edges.slice(1).map(() => 0);
  for (const [idx, v] of pop.cells) {
    const lat = 90 - Math.floor(idx / 360) - 0.5;
    for (let i = 0; i + 1 < edges.length; i++) if (lat >= edges[i] && lat < edges[i + 1]) { out[i] += v; break; }
  }
  return out;
}

/* 小遊戲的地點：只寫地理條件（不寫國名）；人多人少由資料判斷，test/pop.test.mjs 檢查題目的答案 */
export const PLACES = {
  nile: { lon: 31.2, lat: 30.6, en: 'The Nile Delta', zh: '尼羅河三角洲' },
  sahara: { lon: 8.5, lat: 23.5, en: 'The middle of the Sahara', zh: '撒哈拉沙漠中央' },
  ganges: { lon: 89.5, lat: 23.5, en: 'The Ganges Delta', zh: '恆河三角洲' },
  tibet: { lon: 88.5, lat: 33.5, en: 'The Plateau of Tibet', zh: '青藏高原' },
  greenland: { lon: -40.5, lat: 72.5, en: 'The ice sheet of Greenland', zh: '格陵蘭的冰原' },
  java: { lon: 110.5, lat: -7.5, en: 'The island of Java', zh: '爪哇島' },
  amazon: { lon: -66.5, lat: -5.5, en: 'Deep in the Amazon rainforest', zh: '亞馬遜雨林深處' },
  taiwan: { lon: 120.5, lat: 23.5, en: 'The western plain of Taiwan', zh: '台灣西部平原' },
};
export function verdict(pop, key) {
  const p = PLACES[key], n = peopleIn(pop, p.lon, p.lat);
  return { people: n, answer: n >= MANY ? 'many' : n < FEW ? 'few' : 'between' };
}
