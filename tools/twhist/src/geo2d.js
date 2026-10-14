/*
 * 台灣歷史 Taiwan's Story · 小範圍地圖的純函式（不碰 DOM；node test/geo2d.test.mjs）。
 *
 * 台灣這麼小的範圍，用「等距圓柱＋中央緯度修正」就夠了：經度乘上 cos(中央緯度)，東西向和南北向的比例尺才會一樣。
 *   makeProjection(bbox, width, pad) → { width, height, xy(lon, lat), lonLat(x, y), kmPerPx }
 *   ringPath(ring, proj)  把一個 [[lon, lat], …] 的環變成 SVG path
 *   activeAt(site, ago)   這個遺址在「距今 ago 年」有沒有文化層（site.layers[]：{ fromAgo, toAgo }）
 *   spanOf(site)          這個遺址所有有年代的文化層，最早到最晚
 */
const RAD = Math.PI / 180;
export const KM_PER_DEG = 111.32;

export function makeProjection(bbox, width, pad = 0) {
  const lat0 = (bbox.s + bbox.n) / 2, k = Math.cos(lat0 * RAD);
  const w = (bbox.e - bbox.w) * k, h = bbox.n - bbox.s;
  const s = (width - pad * 2) / w;
  return {
    width, height: h * s + pad * 2, scale: s, k,
    xy: (lon, lat) => [pad + (lon - bbox.w) * k * s, pad + (bbox.n - lat) * s],
    lonLat: (x, y) => [bbox.w + (x - pad) / (k * s), bbox.n - (y - pad) / s],
    kmPerPx: KM_PER_DEG / s,
  };
}

export function ringPath(ring, proj) {
  return ring.map(([lon, lat], i) => { const [x, y] = proj.xy(lon, lat); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join('') + 'Z';
}

export const dated = (site) => (site.layers || []).filter((l) => l.fromAgo !== undefined && l.toAgo !== undefined);

export function activeAt(site, ago) {
  return dated(site).some((l) => ago <= l.fromAgo && ago >= l.toAgo);
}
export function layerAt(site, ago) {
  return dated(site).filter((l) => ago <= l.fromAgo && ago >= l.toAgo);
}
export function spanOf(site) {
  const d = dated(site);
  if (!d.length) return null;
  return { fromAgo: Math.max(...d.map((l) => l.fromAgo)), toAgo: Math.min(...d.map((l) => l.toAgo)) };
}

/** 兩點之間的大圓距離（公里），用來核對「一百多公里外」這類說法 */
export function distanceKm(a, b) {
  const [lo1, la1] = a, [lo2, la2] = b;
  const h = Math.sin((la2 - la1) * RAD / 2) ** 2 + Math.cos(la1 * RAD) * Math.cos(la2 * RAD) * Math.sin((lo2 - lo1) * RAD / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
