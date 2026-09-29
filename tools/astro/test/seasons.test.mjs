// 第三課的日出日落與節氣：node test/seasons.test.mjs
import { dayInfo, solarTermsOfYear, SOLAR_TERMS, apsidesOfYear, sunAltAz } from '../src/ephem.js';
const hm = (h) => h == null ? '--:--' : `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
const tw = (d) => new Date(d.getTime() + 8 * 3600000).toISOString().slice(0, 16).replace('T', ' ');
const sites = { Taipei: { lat: 25.04, lon: 121.56, tz: 8 }, Changhua: { lat: 24.08, lon: 120.54, tz: 8 },
  Sydney: { lat: -33.87, lon: 151.21, tz: 10 }, Tromso: { lat: 69.65, lon: 18.96, tz: 1 }, Singapore: { lat: 1.35, lon: 103.82, tz: 8 } };
for (const [n, s] of Object.entries(sites)) {
  for (const day of ['2026-03-20', '2026-06-21', '2026-09-23', '2026-12-22']) {
    const i = dayInfo(new Date(day + 'T04:00:00Z'), s);
    console.log(n.padEnd(9), day, 'rise', hm(i.rise), 'set', hm(i.set), 'len', hm(i.length), 'noonAlt', i.noonAlt.toFixed(1), i.polar || '');
  }
}
for (const t of solarTermsOfYear(2026)) console.log(SOLAR_TERMS[t.index][0], tw(t.date));
const a = apsidesOfYear(2026); console.log('perihelion', tw(a.peri), 'aphelion', tw(a.aph));
console.log('Changhua noon 2026-06-21', sunAltAz(new Date('2026-06-21T04:10:00Z'), sites.Changhua));
