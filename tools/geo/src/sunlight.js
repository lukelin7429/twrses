/*
 * 地理 Geography · 第七課「為什麼赤道熱、兩極冷？」（純函式，test/sunlight.test.mjs）。
 *
 * 一個想法：同一束陽光，直射時集中在一小塊地面；越斜，同樣的能量攤在越大的面積上，每平方公尺分到的就越少。
 *   TILT                           地軸傾斜（度，頁面引用的數字）；回歸線＝±TILT、極圈＝±(90 − TILT)
 *   SEASONS                        三個季節按鈕：太陽直射的緯度（三月與九月 0、六月 +TILT、十二月 −TILT）
 *   noonAltitude(lat, decl)        正午太陽高度角＝90 − |緯度 − 直射點緯度|（負的表示正午也在地平線下）
 *   spread(alt) / share(alt)       同一束光攤開成幾倍（1 / sin 高度角）、每平方公尺分到直射時的幾成（sin 高度角）
 *   zoneOf(lat)                    依回歸線與極圈分的五帶：'torrid'、'temperate'、'frigid'（加 hemi：'N'／'S'）
 *   sunDir(lon0, decl)             太陽在地球座標裡的方向（geo.js 的約定：y 朝北、經度 0 在 +z、東經在 +x）
 *   beam(lon0, decl, lat, half)    一束截面是正方形（半寬 half，單位是地球半徑）的平行光，中心打在 (lon0, lat)：
 *                                  回傳 { ring（地面上光斑的外框 [[lon, lat]…]）, rays（幾條代表光線的起點與落點）, ratio（光斑面積 ÷ 截面積）}
 *   PLACES                         小遊戲與 3D 用的地點（只有緯度與名字）
 */
import { DEG, RAD, lonLatToVec3, vec3ToLonLat } from './geo.js';

export const TILT = 23.44;
export const SEASONS = { march: 0, june: TILT, december: -TILT };

export function noonAltitude(lat, decl) { return 90 - Math.abs(lat - decl); }
export const spread = (alt) => (alt <= 0 ? Infinity : 1 / Math.sin(alt * RAD));
export const share = (alt) => (alt <= 0 ? 0 : Math.sin(alt * RAD));
export function zoneOf(lat) {
  const a = Math.abs(lat), hemi = lat >= 0 ? 'N' : 'S';
  if (a <= TILT) return { zone: 'torrid', hemi };
  if (a >= 90 - TILT) return { zone: 'frigid', hemi };
  return { zone: 'temperate', hemi };
}
export const sunDir = (lon0, decl) => lonLatToVec3(lon0, decl);

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/** 從截面上的一點 Q（已經在通過地心的平面上）沿太陽方向找到第一個碰到地球的點；碰不到回 null */
function hit(Q, s) {
  const b = dot(Q, s), c = dot(Q, Q) - 1, disc = b * b - c;
  if (disc < 0) return null;
  const l = -b + Math.sqrt(disc);                       // 朝太陽那一側的交點
  return [Q[0] + l * s[0], Q[1] + l * s[1], Q[2] + l * s[2]];
}
export function beam(lon0, decl, lat, half = 0.12, n = 24) {
  const s = sunDir(lon0, decl);
  const P0 = lonLatToVec3(lon0, lat);
  // 截面的兩個方向：東（垂直於子午面）與「截面上的北」
  const e1 = [Math.cos(lon0 * RAD), 0, -Math.sin(lon0 * RAD)];
  const e2 = [s[1] * e1[2] - s[2] * e1[1], s[2] * e1[0] - s[0] * e1[2], s[0] * e1[1] - s[1] * e1[0]];
  const base = dot(P0, s);
  const C = [P0[0] - base * s[0], P0[1] - base * s[1], P0[2] - base * s[2]];   // 光束中心線和通過地心、垂直太陽的平面的交點
  const at = (u, v) => [C[0] + u * e1[0] + v * e2[0], C[1] + u * e1[1] + v * e2[1], C[2] + u * e1[2] + v * e2[2]];
  const ring = [];
  const side = [[-1, -1, 1, 0], [1, -1, 0, 1], [1, 1, -1, 0], [-1, 1, 0, -1]];
  for (const [u0, v0, du, dv] of side) for (let k = 0; k < n; k++) {
    const t = k / n, p = hit(at(half * (u0 + 2 * du * t), half * (v0 + 2 * dv * t)), s);
    if (p) ring.push(vec3ToLonLat(p));
  }
  // 光斑面積：把截面切成 m × m 小格，每格落到地面的面積是 格面積 ÷ cos(入射角)
  const m = 40, cell = (2 * half / m) ** 2;
  let area = 0, full = 0;
  for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) {
    const p = hit(at(half * (-1 + (2 * i + 1) / m), half * (-1 + (2 * j + 1) / m)), s);
    if (!p) continue;
    full += cell; area += cell / dot(p, s);
  }
  const rays = [];
  for (const u of [-1, 0, 1]) for (const v of [-1, 0, 1]) {
    const Q = at(half * u * 0.85, half * v * 0.85), p = hit(Q, s);
    if (p) rays.push({ from: [Q[0] + 2.4 * s[0], Q[1] + 2.4 * s[1], Q[2] + 2.4 * s[2]], to: p });
  }
  return { ring, rays, ratio: full ? area / full : Infinity, lit: full / (4 * half * half) };
}
void DEG;

export const PLACES = {
  quito: { en: 'Quito', zh: '基多', lat: -0.2 },
  singapore: { en: 'Singapore', zh: '新加坡', lat: 1.3 },
  taipei: { en: 'Taipei', zh: '台北', lat: 25.0 },
  cairo: { en: 'Cairo', zh: '開羅', lat: 30.0 },
  sydney: { en: 'Sydney', zh: '雪梨', lat: -33.9 },
  durban: { en: 'Durban', zh: '德班', lat: -29.9 },
  london: { en: 'London', zh: '倫敦', lat: 51.5 },
  reykjavik: { en: 'Reykjavík', zh: '雷克雅維克', lat: 64.1 },
  ushuaia: { en: 'Ushuaia', zh: '烏斯懷亞', lat: -54.8 },
};
