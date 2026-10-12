/*
 * 地理 Geography · 地球儀引擎的純函式（不碰 DOM、不碰 three.js；test/geo.test.mjs 有測試）。
 *
 * 角度一律用「度」進出（經度 lon：東經為正；緯度 lat：北緯為正），地圖座標以地球半徑 R = 1 為單位。
 * 球面座標：y 軸朝北極，經度 0 在 +z，東經在 +x——從 +z 往地球看，東邊在右手邊（不會左右顛倒）。
 *
 *   lonLatToVec3 / vec3ToLonLat      經緯度 ↔ 球面座標
 *   forward(name, lon, lat, opt)     投影的正算：equirect 等距圓柱、mercator 麥卡托、gallpeters／lambert 等積圓柱、
 *                                    sinusoidal 正弦、mollweide 莫爾威（等積）、gores 一瓣一瓣的正弦（橘子皮）、
 *                                    polar_n／polar_s 極方位等距、ortho 正射（從遠處看的地球）
 *   distortion(name, lon, lat)       那一點的變形：h 南北向倍率、k 東西向倍率、area 面積倍率、a／b 變形橢圓的長短軸、omega 最大角度變形
 *   inverseMercator(x, y)           麥卡托的反算
 *   mercatorScale(lat)               麥卡托的放大倍率 = 1 / cos(緯度)
 *   greatCircle(lon1, lat1, lon2, lat2, R)   大圓距離
 *   unroll(lon, lat, s)              球面連續攤平成等距圓柱的中間形狀（s 從 1 到 0）
 *   movePoint / moveRing             把一塊陸地在球面上原封不動搬到別的地方（形狀與面積不變）
 *   ringArea(ring, R)                球面多邊形的面積
 *   smallCircle(lon, lat, radiusDeg) 球面上的一個圓（變形圓用）
 *
 * 公式出處：John P. Snyder, Map Projections: A Working Manual, USGS Professional Paper 1395 (1987)。
 */
export const RAD = Math.PI / 180;
export const DEG = 180 / Math.PI;
export const EARTH_RADIUS_KM = 6371.0088;                       // 平均半徑（只用在測試與距離換算）
export const MERC_MAX = Math.atan(Math.sinh(Math.PI)) * DEG;    // 85.0511…：麥卡托地圖剛好是正方形的緯度
const SQRT2 = Math.SQRT2;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function lonLatToVec3(lon, lat, R = 1) {
  const l = lon * RAD, p = lat * RAD, c = Math.cos(p);
  return [R * c * Math.sin(l), R * Math.sin(p), R * c * Math.cos(l)];
}
export function vec3ToLonLat([x, y, z]) {
  const r = Math.hypot(x, y, z) || 1;
  return [Math.atan2(x, z) * DEG, Math.asin(clamp(y / r, -1, 1)) * DEG];
}

/** 橘子皮：n 瓣，每瓣寬 360/n 度；回傳那個經度落在第幾瓣與那一瓣的中央經線 */
export function goreOf(lon, n = 12) {
  const w = 360 / n;
  const g = clamp(Math.floor((lon + 180) / w), 0, n - 1);
  return { g, lon0: -180 + (g + 0.5) * w, w };
}

function mollweideTheta(p) {
  if (Math.abs(Math.abs(p) - Math.PI / 2) < 1e-12) return Math.sign(p) * Math.PI / 2;
  let t = p;
  const k = Math.PI * Math.sin(p);
  for (let i = 0; i < 60; i++) {
    const d = (2 * t + Math.sin(2 * t) - k) / (2 + 2 * Math.cos(2 * t));
    t -= d;
    if (Math.abs(d) < 1e-13) break;
  }
  return t;
}

export const PROJECTIONS = {
  equirect: { en: 'Plate carrée', zh: '等距圓柱投影' },
  mercator: { en: 'Mercator', zh: '麥卡托投影' },
  gallpeters: { en: 'Gall–Peters', zh: '高爾－彼得斯投影' },
  lambert: { en: 'Lambert cylindrical equal-area', zh: '蘭伯特等積圓柱投影' },
  sinusoidal: { en: 'Sinusoidal', zh: '正弦投影' },
  mollweide: { en: 'Mollweide', zh: '莫爾威投影' },
  gores: { en: 'Gores', zh: '一瓣一瓣攤開' },
  polar_n: { en: 'North polar azimuthal equidistant', zh: '北極方位等距投影' },
  polar_s: { en: 'South polar azimuthal equidistant', zh: '南極方位等距投影' },
  ortho: { en: 'Orthographic', zh: '正射投影' },
};

/**
 * 正算：經緯度（度）→ 地圖座標 [x, y]（R = 1）。
 * opt.gore：橘子皮的第幾瓣（瓣的邊界上的點屬於哪一瓣要指定，否則照經度判斷）；opt.n：幾瓣（預設 12）。
 * opt.lon0／opt.lat0：正射投影的中心。
 */
export function forward(name, lon, lat, opt = {}) {
  const l = lon * RAD, p = lat * RAD;
  switch (name) {
    case 'equirect': return [l, p];
    case 'mercator': {
      const q = clamp(lat, -MERC_MAX, MERC_MAX) * RAD;
      return [l, Math.log(Math.tan(Math.PI / 4 + q / 2))];
    }
    case 'gallpeters': { const c = Math.SQRT1_2; return [l * c, Math.sin(p) / c]; }   // 標準緯線 45°
    case 'lambert': return [l, Math.sin(p)];                                          // 標準緯線 0°
    case 'sinusoidal': return [l * Math.cos(p), p];
    case 'mollweide': { const t = mollweideTheta(p); return [(2 * SQRT2 / Math.PI) * l * Math.cos(t), SQRT2 * Math.sin(t)]; }
    case 'gores': {
      const n = opt.n || 12, w = 360 / n;
      const g = opt.gore != null ? opt.gore : goreOf(lon, n).g;
      const l0 = (-180 + (g + 0.5) * w) * RAD;
      return [l0 + (l - l0) * Math.cos(p), p];
    }
    case 'polar_n': { const r = Math.PI / 2 - p; return [r * Math.sin(l), -r * Math.cos(l)]; }
    case 'polar_s': { const r = Math.PI / 2 + p; return [r * Math.sin(l), r * Math.cos(l)]; }
    case 'ortho': {
      const l0 = (opt.lon0 || 0) * RAD, p0 = (opt.lat0 || 0) * RAD;
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l - l0);
      if (cosc < 0) return null;   // 在地球背面
      return [Math.cos(p) * Math.sin(l - l0), Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l - l0)];
    }
    default: throw new Error('unknown projection ' + name);
  }
}

/** 麥卡托的反算：地圖座標（R = 1）→ 經緯度（度） */
export function inverseMercator(x, y) {
  return [x * DEG, (2 * Math.atan(Math.exp(y)) - Math.PI / 2) * DEG];
}

/** 整張地圖的外框（R = 1）：{ w, h } 是全寬與全高 */
export function extent(name) {
  switch (name) {
    case 'equirect': case 'sinusoidal': case 'gores': return { w: 2 * Math.PI, h: Math.PI };
    case 'mercator': return { w: 2 * Math.PI, h: 2 * Math.PI };
    case 'gallpeters': return { w: 2 * Math.PI * Math.SQRT1_2, h: 2 * SQRT2 };
    case 'lambert': return { w: 2 * Math.PI, h: 2 };
    case 'mollweide': return { w: 4 * SQRT2, h: 2 * SQRT2 };
    case 'polar_n': case 'polar_s': return { w: 2 * Math.PI, h: 2 * Math.PI };
    case 'ortho': return { w: 2, h: 2 };
    default: throw new Error('unknown projection ' + name);
  }
}

/** 麥卡托在某個緯度的放大倍率（長度）：1 / cos(緯度)。面積是它的平方。 */
export const mercatorScale = (lat) => 1 / Math.cos(lat * RAD);

/**
 * 某一點的變形（Snyder 式 4-10 到 4-14，用數值微分）：
 *   h 沿經線（南北向）的長度倍率、k 沿緯線（東西向）的長度倍率、area 面積倍率、
 *   a／b 變形橢圓（Tissot 指示橢圓）的長、短半軸、omega 最大角度變形（度）。
 */
export function distortion(name, lon, lat, opt = {}) {
  const d = 1e-4;   // 度
  const la = clamp(lat, -89.9, 89.9);
  const o = name === 'gores' ? { ...opt, gore: opt.gore != null ? opt.gore : goreOf(lon, opt.n).g } : opt;
  const f = (x, y) => forward(name, x, y, o);
  const [x1, y1] = f(lon - d, la), [x2, y2] = f(lon + d, la), [x3, y3] = f(lon, la - d), [x4, y4] = f(lon, la + d);
  const s = 1 / (2 * d * RAD);
  const xl = (x2 - x1) * s, yl = (y2 - y1) * s, xp = (x4 - x3) * s, yp = (y4 - y3) * s;
  const cos = Math.cos(la * RAD);
  const h = Math.hypot(xp, yp), k = Math.hypot(xl, yl) / cos;
  const area = Math.abs(xl * yp - yl * xp) / cos;
  const ap = Math.sqrt(h * h + k * k + 2 * area), bp = Math.sqrt(Math.max(0, h * h + k * k - 2 * area));
  return { h, k, area, a: (ap + bp) / 2, b: (ap - bp) / 2, omega: 2 * Math.asin(clamp(bp / ap, 0, 1)) * DEG };
}

/** 大圓距離（haversine）。預設回傳公里。 */
export function greatCircle(lon1, lat1, lon2, lat2, R = EARTH_RADIUS_KM) {
  const p1 = lat1 * RAD, p2 = lat2 * RAD, dp = p2 - p1, dl = (lon2 - lon1) * RAD;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

/**
 * 球面 → 等距圓柱地圖之間的連續變形。s = 1 是半徑 1 的球，s → 0 是平面（x = 經度、y = 緯度，弧度）。
 * 做法：把點放在半徑 1/s 的大球上、角度縮成 s 倍——球越來越大，表面越來越平，面向 +z 的那一點（經緯度 0, 0）不動。
 * 回傳 [x, y, z]；z 另外加上 s，讓最後攤平的地圖落在 z = 0。
 */
export function unroll(lon, lat, s) {
  const l = lon * RAD, p = lat * RAD;
  if (s < 1e-4) return [l, p, s];
  const r = 1 / s, ls = l * s, ps = p * s;
  return [r * Math.cos(ps) * Math.sin(ls), r * Math.sin(ps), r * (Math.cos(ps) * Math.cos(ls) - 1) + s];
}

/**
 * 把球面上的點從「以 from 為中心」搬到「以 to 為中心」：先繞地軸轉到經度 0，再沿經線改變緯度，最後轉到新的經度。
 * 這是剛體轉動，所以形狀、面積、兩點距離都不變。
 */
export function movePoint([lon, lat], [lonA, latA], [lonB, latB]) {
  const [x, y, z] = lonLatToVec3(lon - lonA, lat);
  const d = (latB - latA) * RAD, c = Math.cos(d), s = Math.sin(d);
  const [l, p] = vec3ToLonLat([x, y * c + z * s, -y * s + z * c]);
  let L = l + lonB;
  L = ((L + 180) % 360 + 360) % 360 - 180;
  return [L, p];
}
export const moveRing = (ring, from, to) => ring.map((pt) => movePoint(pt, from, to));

/** 球面多邊形的面積（R 的平方為單位；預設 R = 1，全球是 4π）。環不能跨過兩極。 */
export function ringArea(ring, R = 1) {
  let s = 0;
  for (let i = 0; i < ring.length; i++) {
    const [l1, p1] = ring[i], [l2, p2] = ring[(i + 1) % ring.length];
    let dl = l2 - l1;
    if (dl > 180) dl -= 360; else if (dl < -180) dl += 360;
    s += dl * RAD * (2 + Math.sin(p1 * RAD) + Math.sin(p2 * RAD));
  }
  return Math.abs(s) / 2 * R * R;
}
/** 平面多邊形的面積（鞋帶公式） */
export function planarArea(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length]; s += x1 * y2 - x2 * y1; }
  return Math.abs(s) / 2;
}
/** 環的「中心」：各頂點的球面向量平均後的方向 */
export function ringCenter(ring) {
  let x = 0, y = 0, z = 0;
  for (const [lon, lat] of ring) { const v = lonLatToVec3(lon, lat); x += v[0]; y += v[1]; z += v[2]; }
  return vec3ToLonLat([x, y, z]);
}

/** 球面上以 (lon, lat) 為圓心、角半徑 radiusDeg 的圓，n 個點 */
export function smallCircle(lon, lat, radiusDeg, n = 48) {
  const out = [];
  const r = radiusDeg * RAD, p0 = lat * RAD;
  for (let i = 0; i < n; i++) {
    const az = (i / n) * 2 * Math.PI;
    const p = Math.asin(Math.sin(p0) * Math.cos(r) + Math.cos(p0) * Math.sin(r) * Math.cos(az));
    const l = Math.atan2(Math.sin(az) * Math.sin(r) * Math.cos(p0), Math.cos(r) - Math.sin(p0) * Math.sin(p));
    out.push([lon + l * DEG, p * DEG]);
  }
  return out;
}

/**
 * 拿來比大小的陸塊面積（平方公里）。數字與出處寫在 data/geography.json 的 sources；這裡的數字要和那裡一致，
 * test/geo.test.mjs 會檢查比值。
 */
export const AREAS_KM2 = {
  greenland: 2166086,
  africa: 30365000,
  australia: 7656127,    // 澳洲本土（不含塔斯馬尼亞等島嶼；含島嶼是 7,688,287）
  antarctica: 14200000,
};
export const areaRatio = (a, b) => AREAS_KM2[a] / AREAS_KM2[b];
