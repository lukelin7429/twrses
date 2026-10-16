/*
 * 地理 Geography · 第五課的時間計算（純函式，test/timezone.test.mjs）。
 * 這裡的「時區」都是**理想時區**：每 15 度一區，以 15 的倍數為中心（UTC−12 到 UTC+12）。
 * 真正的時區界線會跟著各地的行政區彎曲、有半小時的時區，也有夏令時間；頁面上都有說明，但這裡不畫、不算。
 *
 *   solarTime(lon, utc)        某個經度的「太陽時」（小時，0–24）：UTC＋經度÷15
 *   idealZone(lon)             理想時區：round(經度÷15)，東經 180 度算 +12、西經 180 度算 −12
 *   zoneTime(lon, utc)         理想時區的鐘面時間：{ h, m, dayShift（相對 UTC 日期差幾天）, text }
 *   subsolarLon(utc)           太陽正在頭頂（當地正午）的經度
 *   isDay(lon, lat, utc, decl) 那裡是不是白天（太陽在地平線以上）；decl 是太陽直射點的緯度
 *   terminator(utc, decl, n)   晨昏線：離太陽直射點 90 度的那一圈（[[lon, lat], …]）
 *   fmtTime(h, m)              「3:05 p.m.」與「下午 3:05」
 *   CITIES                     課文用到的城市（只有經緯度與名字，不畫國界）
 *   DAYS                       星期
 */
const RAD = Math.PI / 180;
const mod = (a, n) => ((a % n) + n) % n;

export const solarTime = (lon, utc) => mod(utc + lon / 15, 24);
export function idealZone(lon) {
  const z = Math.round(lon / 15);
  return Math.max(-12, Math.min(12, z)) + 0;   // + 0 把 −0 變成 0
}
export function zoneTime(lon, utc, zone = idealZone(lon)) {
  const t = utc + zone, dayShift = Math.floor(t / 24), x = mod(t, 24);
  let h = Math.floor(x + 1e-9), m = Math.round((x - h) * 60);
  if (m === 60) { h += 1; m = 0; }
  return { h: h % 24, m, dayShift, zone, text: fmtTime(h % 24, m) };
}
export const subsolarLon = (utc) => mod((12 - utc) * 15 + 180, 360) - 180;
export function isDay(lon, lat, utc, decl = 0) {
  const ha = (solarTime(lon, utc) - 12) * 15 * RAD;
  const cosz = Math.sin(lat * RAD) * Math.sin(decl * RAD) + Math.cos(lat * RAD) * Math.cos(decl * RAD) * Math.cos(ha);
  return cosz > 0;
}
export function terminator(utc, decl = 0, n = 180) {
  const s = subsolarLon(utc), out = [];
  const p0 = decl * RAD;
  for (let i = 0; i <= n; i++) {
    const az = i / n * 2 * Math.PI, r = Math.PI / 2;
    const p = Math.asin(Math.sin(p0) * Math.cos(r) + Math.cos(p0) * Math.sin(r) * Math.cos(az));
    const l = Math.atan2(Math.sin(az) * Math.sin(r) * Math.cos(p0), Math.cos(r) - Math.sin(p0) * Math.sin(p));
    out.push([mod(s + l / RAD + 180, 360) - 180, p / RAD]);
  }
  return out;
}
export function fmtTime(h, m = 0) {
  const ap = h < 12 ? 'a.m.' : 'p.m.', h12 = h % 12 === 0 ? 12 : h % 12, mm = String(m).padStart(2, '0');
  const zh = h < 5 ? '凌晨' : h < 12 ? '上午' : h < 13 ? '中午' : h < 18 ? '下午' : '晚上';
  return { en: `${h12}:${mm} ${ap}`, zh: `${zh} ${h12}:${mm}`, h24: `${String(h).padStart(2, '0')}:${mm}` };
}
export const DAYS = [
  { en: 'Monday', zh: '星期一' }, { en: 'Tuesday', zh: '星期二' }, { en: 'Wednesday', zh: '星期三' }, { en: 'Thursday', zh: '星期四' },
  { en: 'Friday', zh: '星期五' }, { en: 'Saturday', zh: '星期六' }, { en: 'Sunday', zh: '星期日' },
];
export const dayName = (i) => DAYS[mod(i, 7)];

/** 只有經緯度與名字（城市名，不畫國界）。lon、lat 取到小數點後一位。 */
export const CITIES = [
  { key: 'taipei', en: 'Taipei', zh: '台北', lon: 121.5, lat: 25.0 },
  { key: 'tokyo', en: 'Tokyo', zh: '東京', lon: 139.7, lat: 35.7 },
  { key: 'sydney', en: 'Sydney', zh: '雪梨', lon: 151.2, lat: -33.9 },
  { key: 'cairo', en: 'Cairo', zh: '開羅', lon: 31.2, lat: 30.0 },
  { key: 'london', en: 'London', zh: '倫敦', lon: -0.1, lat: 51.5 },
  { key: 'rio', en: 'Rio de Janeiro', zh: '里約熱內盧', lon: -43.2, lat: -22.9 },
  { key: 'newyork', en: 'New York', zh: '紐約', lon: -74.0, lat: 40.7 },
  { key: 'losangeles', en: 'Los Angeles', zh: '洛杉磯', lon: -118.2, lat: 34.1 },
];
export const city = (k) => CITIES.find((c) => c.key === k);

/** 「在台北是 X 點，那裡是幾點？」：從台北的鐘面時間（星期 day、h 時）推回 UTC，再換成那裡的理想時區 */
export function fromTaipei(day, h, lon) {
  const tp = idealZone(city('taipei').lon);
  const utc = h - tp;                      // 可能是負的（前一天）
  const r = zoneTime(lon, utc);
  return { ...r, day: mod(day + r.dayShift, 7) };
}
