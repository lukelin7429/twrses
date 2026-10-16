/*
 * 地理 Geography · 第六課的「大洲、大洋怎麼分」（純函式，test/regions.test.mjs）。
 *
 * 大洲和大洋的界線是人約定的，不是地上畫好的線。這裡用經緯度的規則，照**常見的**約定把陸地和海分組：
 *   歐亞：烏拉山、烏拉河、裏海、大高加索山、黑海、土耳其海峽（大約）；亞非：蘇伊士地峽與紅海；
 *   南北美：巴拿馬地峽；亞洲與大洋洲：新幾內亞以東、澳洲以南算大洋洲；南極洲：南緯 60 度以南。
 *   海洋：北冰洋＝北緯 66 度以北（大約）；南大洋（五大洋的算法）＝南緯 60 度以南；其餘照經度與大陸分開。
 * 這些都是「大約」——真正的界線各家說法不同，頁面上會講清楚。**不畫國界，只用顏色分組。**
 *
 *   continentOf(lon, lat)            七大洲的哪一洲（'asia' 'europe' 'africa' 'namerica' 'samerica' 'oceania' 'antarctica'）
 *   oceanOf(lon, lat, five)          哪一個大洋（'pacific' 'atlantic' 'indian' 'arctic' 'southern'；裏海回傳 'lake'）
 *   SCHEMES / groupOf(c, scheme)     四種大洲的算法：seven、eurasia（歐亞合一）、america（南北美合一）、five（兩個都合：歐亞、美洲、非洲、南極洲、澳洲與大洋洲）
 *   NAMES / COLORS / LABEL_AT        名稱、顏色、標籤位置
 *   landRows(polys, step)            把陸地多邊形掃描成每一列的區間（偶奇規則；裏海是洞）
 *   areaBy(land, step, fn)           用 fn(lon, lat) 分組，算每組的面積（平方公里，球面、平均半徑）
 */
const RAD = Math.PI / 180;
export const R_KM = 6371.0088;

/** 紅海的中線：從蘇伊士（32.5, 29.9）到曼德海峽（43.4, 12.6）；在線的東北邊算亞洲 */
const eastOfRedSea = (lon, lat) => (lon - 32.5) * (12.6 - 29.9) - (lat - 29.9) * (43.4 - 32.5) < 0;
/** 中美洲的陸地分界（太平洋岸往大西洋岸的參考經度，隨緯度變） */
const PAC = [[8, -79], [10, -84], [15, -91], [18, -95], [25, -101], [32, -108], [50, -100]];
export function pacificEdge(lat) {
  if (lat <= PAC[0][0]) return PAC[0][1];
  for (let i = 1; i < PAC.length; i++) if (lat <= PAC[i][0]) { const [a, x] = PAC[i - 1], [b, y] = PAC[i]; return x + (y - x) * (lat - a) / (b - a); }
  return PAC[PAC.length - 1][1];
}

export function continentOf(lon, lat) {
  if (lat < -60) return 'antarctica';
  // 美洲（含格陵蘭與阿留申群島；楚科奇半島算亞洲）
  const americas = (lon < -25 && lon > -169) || (lon <= -169 && lat < 60) || (lon > 170 && lat > 50 && lat < 56);
  if (americas) {
    if (lon < -140 && lat < 30) return 'oceania';                          // 夏威夷等太平洋島嶼
    const south = (lat < 12.6 && lon > -77.5) || (lat < 7.2 && lon > -82) || (lat < 2 && lon > -95);
    return south ? 'samerica' : 'namerica';
  }
  if (lon <= -169 && lat >= 60) return 'asia';
  // 大洋洲
  if ((lat < -10 && lon > 112) || (lon > 129.5 && lat < 1 && lat > -60) || (lon > 150 && lat < 25) || lon <= -169) return 'oceania';
  // 非洲（蘇伊士與紅海以西、地中海以南）
  if (lat < 37.6 && lon > -26 && lon < 60 && !eastOfRedSea(lon, lat) && !(lon > 32.4 && lat > 29.5) && !(lat > 35.5 && lon > 26)) {
    if (lat < 35.8 || lon < 12) return lat > 36 && lon < -9 ? 'europe' : 'africa';
  }
  // 歐洲
  if (lon > -32 && lon < 69) {
    if (lon < 26 && lat > 35) return 'europe';
    if (lon < 29.05 && lat > 40.4 && lat < 42.2) return 'europe';                         // 土耳其海峽以西
    if (lon >= 26 && lat > 44.5 && lon < 51.5) return 'europe';
    if (lon >= 37 && lon < 48 && lat > 43) return 'europe';                               // 大高加索山以北
    if (lon < 60 && lat > 51.5) return 'europe';                                          // 烏拉山以西
    if (lon < 69 && lat > 68) return 'europe';                                            // 新地島
  }
  return 'asia';
}

export function oceanOf(lon, lat, five = true) {
  if (lon > 46 && lon < 55.5 && lat > 36.4 && lat < 47.5) return 'lake';                 // 裏海
  if (lat > 66) return 'arctic';
  if (five && lat < -60) return 'southern';
  const pacific = lon >= 147 || (lat < 8 ? lon < -67 : lon < pacificEdge(lat)) || (lon >= 100 && lon < 147 && !(lat < -8 && (lon < 129 || lat < -11)));
  if (pacific && !(lon < -67 && lat >= 8 && lon > pacificEdge(lat))) return 'pacific';
  if (lon >= 20 && lon < 147 && lat < 31) return 'indian';
  return 'atlantic';
}

export const SCHEMES = {
  seven: { en: 'Seven continents', zh: '七大洲', groups: ['asia', 'africa', 'namerica', 'samerica', 'antarctica', 'europe', 'oceania'] },
  eurasia: { en: 'Six: Europe and Asia together', zh: '六大洲：歐亞合一', groups: ['eurasia', 'africa', 'namerica', 'samerica', 'antarctica', 'oceania'] },
  america: { en: 'Six: the Americas together', zh: '六大洲：南北美合一', groups: ['asia', 'africa', 'america', 'antarctica', 'europe', 'oceania'] },
  five: { en: 'Five: Eurasia and America', zh: '五大洲：歐亞合一、南北美合一', groups: ['eurasia', 'america', 'africa', 'antarctica', 'oceania'] },
};
export function groupOf(c, scheme = 'seven') {
  if ((scheme === 'eurasia' || scheme === 'five') && (c === 'europe' || c === 'asia')) return 'eurasia';
  if ((scheme === 'america' || scheme === 'five') && (c === 'namerica' || c === 'samerica')) return 'america';
  return c;
}
export const NAMES = {
  asia: { en: 'Asia', zh: '亞洲' }, europe: { en: 'Europe', zh: '歐洲' }, africa: { en: 'Africa', zh: '非洲' },
  namerica: { en: 'North America', zh: '北美洲' }, samerica: { en: 'South America', zh: '南美洲' }, oceania: { en: 'Australia and Oceania', zh: '大洋洲' },
  antarctica: { en: 'Antarctica', zh: '南極洲' }, eurasia: { en: 'Eurasia', zh: '歐亞大陸' }, america: { en: 'America', zh: '美洲' },
  pacific: { en: 'Pacific Ocean', zh: '太平洋' }, atlantic: { en: 'Atlantic Ocean', zh: '大西洋' }, indian: { en: 'Indian Ocean', zh: '印度洋' },
  arctic: { en: 'Arctic Ocean', zh: '北冰洋' }, southern: { en: 'Southern Ocean', zh: '南大洋' }, lake: { en: 'Caspian Sea (a lake)', zh: '裏海（湖泊）' },
};
export const COLORS = {
  asia: '#e8a33d', europe: '#7a6fd6', africa: '#d9734e', namerica: '#4fa36a', samerica: '#9bc74a', oceania: '#d65f9a', antarctica: '#e9eef4',
  eurasia: '#c98a46', america: '#6bb35a',
  pacific: '#1f5fa8', atlantic: '#3b8fd6', indian: '#138a86', arctic: '#8cc3e6', southern: '#6b6fc0', lake: '#9fd0f0',
};
export const LABEL_AT = {
  asia: [92, 48], europe: [22, 53], africa: [20, 6], namerica: [-102, 45], samerica: [-60, -14], oceania: [134, -25], antarctica: [60, -80],
  eurasia: [65, 52], america: [-85, 15],
  pacific: [-150, 5], atlantic: [-35, 12], indian: [78, -22], arctic: [10, 84], southern: [-110, -64],
};

/** 掃描線：每一列（緯度中心 lat）在哪些經度區間是陸地 */
export function landRows(polys, step = 0.25) {
  const edges = [];
  for (const p of polys) for (const ring of p) for (let i = 0; i < ring.length; i++) { const a = ring[i], b = ring[(i + 1) % ring.length]; if (a[1] !== b[1]) edges.push(a[0], a[1], b[0], b[1]); }
  const rows = [];
  for (let lat = -90 + step / 2; lat < 90; lat += step) {
    const xs = [];
    for (let k = 0; k < edges.length; k += 4) {
      const x1 = edges[k], y1 = edges[k + 1], x2 = edges[k + 2], y2 = edges[k + 3];
      if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + (lat - y1) * (x2 - x1) / (y2 - y1));
    }
    xs.sort((a, b) => a - b);
    const iv = [];
    for (let i = 0; i + 1 < xs.length; i += 2) iv.push([xs[i], xs[i + 1]]);
    rows.push({ lat, iv });
  }
  return rows;
}
export function areaBy(rows, step, fn) {
  const out = {};
  for (const { lat, iv } of rows) {
    const cell = (R_KM * step * RAD) * (R_KM * step * RAD) * Math.cos(lat * RAD);
    for (const [a, b] of iv) for (let lon = Math.ceil((a - step / 2) / step) * step + step / 2; lon < b; lon += step) {
      const g = fn(lon, lat);
      if (g) out[g] = (out[g] || 0) + cell;
    }
  }
  return out;
}

/** 這個經緯度是不是陸地（用 landRows 的結果查；step 要和 landRows 一樣） */
export function makeIsLand(rows, step = rows[1].lat - rows[0].lat) {
  return (lon, lat) => {
    const r = rows[Math.min(rows.length - 1, Math.max(0, Math.floor((lat + 90) / step)))];
    return !!r && r.iv.some(([a, b]) => lon >= a && lon <= b);
  };
}
/** 海洋各區的面積：全球的格子減去陸地 */
export function oceanAreas(rows, five = true) {
  const step = rows[1].lat - rows[0].lat, isLand = makeIsLand(rows, step), out = {};
  for (const { lat } of rows) {
    const cell = (R_KM * step * RAD) * (R_KM * step * RAD) * Math.cos(lat * RAD);
    for (let lon = -180 + step / 2; lon < 180; lon += step) {
      if (isLand(lon, lat)) continue;
      const o = oceanOf(lon, lat, five);
      out[o] = (out[o] || 0) + cell;
    }
  }
  return out;
}
