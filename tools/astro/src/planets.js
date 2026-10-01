/*
 * 第七課的行星位置（純函式，不碰 DOM，可以直接用 node 測試：test/planets.test.mjs）。
 *
 * 軌道根數：NASA/JPL Solar System Dynamics〈Approximate Positions of the Planets〉（E. M. Standish）
 * 表一，相對 J2000 平黃道與春分點，適用 1800–2050 年。誤差：水星、金星、地球約 20″，火星 40″，
 * 木星 400″，土星 600″——畫星圖、找逆行日期綽綽有餘（逆行起訖誤差在一天以內）。
 * 地球用「地月質心」（EM Bary），與真正的地心差不到 0.0001 AU，看行星時可忽略。
 * 不含光行差與章動；黃經是 J2000，要換成當天的位置時加上 sky.js 的 precession()。
 */
const DEG = Math.PI / 180;
const norm360 = (x) => ((x % 360) + 360) % 360;

// [a, e, I, L, ϖ, Ω] 與每世紀變化率
const EL = {
  mercury: [[0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593], [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081]],
  venus: [[0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255], [0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418]],
  earth: [[1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0], [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0]],
  mars: [[1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891], [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343]],
  jupiter: [[5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909], [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106]],
  saturn: [[9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448], [-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794]],
  uranus: [[19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503], [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589]],
  neptune: [[30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574], [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664]],
};
export const PLANET_KEYS = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];        // 肉眼看得到的五顆（第七課）
export const ALL_PLANETS = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
// 平均半徑（km，NASA 行星資料表）；太陽 695,700 km（IAU 名目值）
export const RADIUS_KM = { sun: 695700, mercury: 2439.7, venus: 6051.8, earth: 6371.0, mars: 3389.5, jupiter: 69911, saturn: 58232, uranus: 25362, neptune: 24622, moon: 1737.4 };
export const AU_KM = 149597870.7;
export const LIGHT_S_PER_AU = AU_KM / 299792.458;          // 499.0 秒

// 視星等：Meeus《Astronomical Algorithms》第 41 章（土星不含光環的傾斜，最多差約半等）
const MAG = {
  mercury: (i) => -0.42 + 0.0380 * i - 0.000273 * i * i + 0.000002 * i * i * i,
  venus: (i) => -4.40 + 0.0009 * i + 0.000239 * i * i - 0.00000065 * i * i * i,
  mars: (i) => -1.52 + 0.016 * i,
  jupiter: (i) => -9.40 + 0.005 * i,
  saturn: () => -8.88,
  uranus: () => -7.19,
  neptune: () => -6.87,
};

const T = (date) => (date.getTime() / 86400000 + 2440587.5 + 69 / 86400 - 2451545) / 36525;

/** 日心黃道直角座標（AU，J2000）：x 朝春分點、z 朝黃道北極。 */
export function helio(key, date) {
  const t = T(date), [e0, r] = EL[key];
  const [a, e, I, L, wb, Om] = e0.map((v, k) => v + r[k] * t);
  const w = wb - Om;
  let M = norm360(L - wb); if (M > 180) M -= 360;
  // 克卜勒方程式（牛頓法，度）
  const es = e / DEG;
  let E = M + es * Math.sin(M * DEG);
  for (let k = 0; k < 8; k++) { const dM = M - (E - es * Math.sin(E * DEG)); E += dM / (1 - e * Math.cos(E * DEG)); }
  const xp = a * (Math.cos(E * DEG) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E * DEG);
  const cw = Math.cos(w * DEG), sw = Math.sin(w * DEG), cO = Math.cos(Om * DEG), sO = Math.sin(Om * DEG), cI = Math.cos(I * DEG), sI = Math.sin(I * DEG);
  return [
    (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    (sw * sI) * xp + (cw * sI) * yp,
  ];
}

/** 從地球看：J2000 黃經黃緯（度）、地心距離與日心距離（AU）、相位角、視星等、離太陽的角距（東正西負）。 */
export function geo(key, date) {
  const p = helio(key, date), E = helio('earth', date);
  const d = [p[0] - E[0], p[1] - E[1], p[2] - E[2]];
  const dist = Math.hypot(...d), r = Math.hypot(...p), R = Math.hypot(...E);
  const lon = norm360(Math.atan2(d[1], d[0]) / DEG), lat = Math.asin(d[2] / dist) / DEG;
  const i = Math.acos(Math.max(-1, Math.min(1, (r * r + dist * dist - R * R) / (2 * r * dist)))) / DEG;
  const sunLon = norm360(Math.atan2(-E[1], -E[0]) / DEG);
  const elong = ((lon - sunLon + 540) % 360) - 180;          // 正：在太陽東邊（黃昏看得到），負：西邊（清晨）
  return { lon, lat, dist, r, phase: i, mag: MAG[key](i) + 5 * Math.log10(r * dist), elong };
}

/** 黃經每天變化多少度（正：往東＝順行，負：往西＝逆行）。 */
export function dailyMotion(key, date) {
  const a = geo(key, new Date(date.getTime() - 43200000)).lon, b = geo(key, new Date(date.getTime() + 43200000)).lon;
  return ((b - a + 540) % 360) - 180;
}

/**
 * 從 from 開始往後找逆行（最多找 days 天）：回傳 [{ start, end, mid }]，start/end 是停留點（黃經運動變號）。
 * 若 from 當下就在逆行中，第一段的 start 會往回找。
 */
export function retrogrades(key, from, days = 800) {
  const DAY = 86400000, out = [];
  const m = (t) => dailyMotion(key, new Date(t));
  const refine = (a, b) => { for (let k = 0; k < 30; k++) { const c = (a + b) / 2; if ((m(a) < 0) === (m(c) < 0)) a = c; else b = c; } return new Date((a + b) / 2); };
  let t = from.getTime(), cur = null;
  if (m(t) < 0) { let s = t; while (m(s - DAY) < 0) s -= DAY; cur = { start: refine(s - DAY, s) }; }
  let prev = m(t);
  for (let k = 1; k <= days; k++) {
    const tt = t + k * DAY, v = m(tt);
    if (prev >= 0 && v < 0) cur = { start: refine(tt - DAY, tt) };
    if (prev < 0 && v >= 0 && cur) { cur.end = refine(tt - DAY, tt); cur.mid = new Date((cur.start.getTime() + cur.end.getTime()) / 2); out.push(cur); cur = null; }
    prev = v;
  }
  return out;
}
