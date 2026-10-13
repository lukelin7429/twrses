/*
 * 世界歷史 World History · 球面上的幾何（純函式；node test/sphere.test.mjs）。
 *
 * 角度一律用度。球的半徑是 1：y 朝北極，經度 0 在 +z，東經在 +x。
 * 從 +z（本初子午線外面）看過去，東邊在右、北邊在上——和地圖一樣，不會左右顛倒。
 */
const RAD = Math.PI / 180;
export const EARTH_KM = 6371.0088;      // 平均半徑（IUGG）

export function toVec([lon, lat], r = 1) {
  const c = Math.cos(lat * RAD);
  return [r * c * Math.sin(lon * RAD), r * Math.sin(lat * RAD), r * c * Math.cos(lon * RAD)];
}
export function toLonLat([x, y, z]) {
  const r = Math.hypot(x, y, z);
  return [Math.atan2(x, z) / RAD, Math.asin(Math.max(-1, Math.min(1, y / r))) / RAD];
}
/** 貼圖座標（等距圓柱，經度 -180 在左、北在上）：u 往東、v 往北，都在 0–1。 */
export const toUV = ([lon, lat]) => [(lon + 180) / 360, (lat + 90) / 180];

/** 兩點之間的角距離（度）。 */
export function angle(a, b) {
  const s1 = Math.sin((b[1] - a[1]) * RAD / 2), s2 = Math.sin((b[0] - a[0]) * RAD / 2);
  const h = s1 * s1 + Math.cos(a[1] * RAD) * Math.cos(b[1] * RAD) * s2 * s2;
  return 2 * Math.asin(Math.min(1, Math.sqrt(h))) / RAD;
}
export const km = (a, b) => angle(a, b) * RAD * EARTH_KM;

/** 大圓上的內插：t＝0 在 a、t＝1 在 b。 */
export function between(a, b, t) {
  const A = toVec(a), B = toVec(b), w = angle(a, b) * RAD;
  if (w < 1e-9) return a.slice();
  const k0 = Math.sin((1 - t) * w) / Math.sin(w), k1 = Math.sin(t * w) / Math.sin(w);
  return toLonLat([A[0] * k0 + B[0] * k1, A[1] * k0 + B[1] * k1, A[2] * k0 + B[2] * k1]);
}

/**
 * 把幾個轉折點連成一條貼著球面的路線：每一段走大圓，每 step 度插一點。
 * 回傳 [{ p: [lon, lat], d }]，d 是從起點算起的累計角距離（度）。
 */
export function trace(waypoints, step = 1) {
  const out = [{ p: waypoints[0].slice(0, 2), d: 0 }];
  let d = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const a = waypoints[i - 1], b = waypoints[i], w = angle(a, b), n = Math.max(1, Math.ceil(w / step));
    for (let k = 1; k <= n; k++) out.push({ p: between(a, b, k / n), d: d + w * k / n });
    d += w;
  }
  return out;
}

/**
 * 路線「隨時間長出來」：轉折點可以帶年代 [lon, lat, ago]（距今幾年；第一點和最後一點一定要有）。
 * 沒有年代的轉折點照距離在前後兩個有年代的點之間內插。回傳 trace() 的每一點加上 ago。
 * 年代必須越走越近（不會倒退）。
 */
export function timedTrace(waypoints, step = 1) {
  const pts = trace(waypoints, step);
  const marks = [];                                        // 有年代的轉折點：{ d, ago }
  let d = 0;
  waypoints.forEach((w, i) => {
    if (i) d += angle(waypoints[i - 1], w);
    if (w[2] != null) marks.push({ d, ago: w[2] });
  });
  if (waypoints[0][2] == null || waypoints[waypoints.length - 1][2] == null) throw new Error('First and last waypoint need an age');
  for (let i = 1; i < marks.length; i++) if (marks[i].ago > marks[i - 1].ago) throw new Error('Ages must not go back in time along a route');
  let k = 0;
  return pts.map((pt) => {
    while (k < marks.length - 2 && pt.d > marks[k + 1].d + 1e-9) k++;
    const m0 = marks[k], m1 = marks[k + 1];
    const t = m1.d > m0.d ? Math.min(1, Math.max(0, (pt.d - m0.d) / (m1.d - m0.d))) : 1;
    return { p: pt.p, d: pt.d, ago: m0.ago + (m1.ago - m0.ago) * t };
  });
}

/** 在某個年代（距今 ago 年），這條路線走到哪裡？還沒出發回傳 null；已經走完回傳終點。 */
export function frontAt(timed, ago) {
  if (ago > timed[0].ago) return null;
  for (let i = 1; i < timed.length; i++) {
    const a = timed[i - 1], b = timed[i];
    if (ago <= a.ago && ago >= b.ago) {
      const t = a.ago === b.ago ? 1 : (a.ago - ago) / (a.ago - b.ago);
      return { p: between(a.p, b.p, t), d: a.d + (b.d - a.d) * t, done: false };
    }
  }
  const last = timed[timed.length - 1];
  return { p: last.p.slice(), d: last.d, done: true };
}

/** 點有沒有在環（[[lon, lat], …]，平面算法，不跨 180 度線）裡面。 */
export function inRing([x, y], ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[i], [x2, y2] = ring[j];
    if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c;
  }
  return c;
}
