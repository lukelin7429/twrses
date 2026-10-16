import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CITIES, city, dayName, fmtTime, fromTaipei, idealZone, isDay, solarTime, subsolarLon, terminator, zoneTime } from '../src/timezone.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// 每 15 度差 1 小時
near(solarTime(0, 12), 12, 1e-12, 'Greenwich at 12 UTC'); near(solarTime(15, 12), 13, 1e-12, '15 E is an hour ahead');
near(solarTime(-15, 12), 11, 1e-12, '15 W is an hour behind'); near(solarTime(120, 12), 20, 1e-12, '120 E');
near(solarTime(-180, 6), 18, 1e-12); near(solarTime(180, 6), 18, 1e-12, 'both sides of 180 have the same solar time');
for (let lon = -180; lon <= 180; lon += 7.5) near(((solarTime(lon + 15, 3) - solarTime(lon, 3)) % 24 + 24) % 24, 1, 1e-9, `15 degrees = 1 hour at ${lon}`);
// 理想時區
assert.deepEqual([0, 7.4, 7.6, 22.5 - 0.1, 121.5, 139.7, 151.2, -0.1, -74, -118.2, -43.2, 31.2, 179, -179, 180, -180].map(idealZone), [0, 0, 1, 1, 8, 9, 10, 0, -5, -8, -3, 2, 12, -12, 12, -12]);
for (const c of CITIES) assert.ok(Number.isInteger(idealZone(c.lon)));
assert.equal(idealZone(city('taipei').lon), 8, 'Taipei is UTC+8'); assert.equal(idealZone(city('newyork').lon), -5, 'New York (standard time) is UTC-5');
// 鐘面時間與日期
assert.deepEqual((({ h, m, dayShift }) => ({ h, m, dayShift }))(zoneTime(121.5, 6)), { h: 14, m: 0, dayShift: 0 });
assert.deepEqual((({ h, m, dayShift }) => ({ h, m, dayShift }))(zoneTime(-74, 6)), { h: 1, m: 0, dayShift: 0 });
assert.deepEqual((({ h, dayShift }) => ({ h, dayShift }))(zoneTime(121.5, 20)), { h: 4, dayShift: 1 }, 'Taipei is already tomorrow');
assert.deepEqual((({ h, dayShift }) => ({ h, dayShift }))(zoneTime(-118.2, 3)), { h: 19, dayShift: -1 }, 'Los Angeles is still yesterday');
assert.equal(zoneTime(121.5, 6).h - zoneTime(-74, 6).h, 13, 'Taipei is 13 hours ahead of New York in standard time');
// 跨過國際換日線：同一個瞬間，東經 179 和西經 179 鐘面一樣（差 24 小時），日期差一天
{ const a = zoneTime(179, 10), b = zoneTime(-179, 10); assert.equal(a.h, b.h); assert.equal(a.dayShift - b.dayShift, 1, 'west of the line is one day ahead'); }
// 從台北推
{ const r = fromTaipei(0, 15, city('newyork').lon); assert.deepEqual([r.h, r.day], [2, 0]); }   // 星期一下午 3 點台北 → 紐約星期一凌晨 2 點
{ const r = fromTaipei(1, 8, city('losangeles').lon); assert.deepEqual([r.h, r.day], [16, 0]); }  // 星期二早上 8 點台北 → 洛杉磯星期一下午 4 點
{ const r = fromTaipei(6, 23, city('sydney').lon); assert.deepEqual([r.h, r.day], [1, 0]); }      // 星期日晚上 11 點台北 → 雪梨星期一凌晨 1 點
assert.equal(dayName(-1).en, 'Sunday'); assert.equal(dayName(7).zh, '星期一');
assert.deepEqual(fmtTime(0, 0), { en: '12:00 a.m.', zh: '凌晨 12:00', h24: '00:00' });
assert.deepEqual(fmtTime(12, 30), { en: '12:30 p.m.', zh: '中午 12:30', h24: '12:30' });
assert.deepEqual(fmtTime(15, 5), { en: '3:05 p.m.', zh: '下午 3:05', h24: '15:05' });
// 太陽直射點：UTC 12 點在本初子午線、UTC 0 點在 180 度、UTC 4 點在西經 120 度
near(subsolarLon(12), 0, 1e-12); near(Math.abs(subsolarLon(0)), 180, 1e-12); near(subsolarLon(4), 120, 1e-12); near(subsolarLon(20), -120, 1e-12);
// 白天黑夜：春分（直射赤道）時，正午那一邊是白天、對面是夜晚；晨昏線上每一點離直射點 90 度
assert.equal(isDay(0, 0, 12, 0), true); assert.equal(isDay(180, 0, 12, 0), false); assert.equal(isDay(121.5, 25, 4, 0), true, 'noon in Taipei is about 4 UTC');
assert.equal(isDay(-74, 40.7, 4, 0), false, 'then it is night in New York');
assert.equal(isDay(0, 89, 0, 23.44), true, 'midnight sun near the North Pole in June'); assert.equal(isDay(0, -89, 12, 23.44), false, 'polar night in the south in June');
const D = (a, b) => { const R = Math.PI / 180; return Math.acos(Math.sin(a[1] * R) * Math.sin(b[1] * R) + Math.cos(a[1] * R) * Math.cos(b[1] * R) * Math.cos((a[0] - b[0]) * R)) / R; };
for (const [utc, decl] of [[0, 0], [5.5, 23.44], [17, -23.44]]) for (const p of terminator(utc, decl, 36)) near(D(p, [subsolarLon(utc), decl]), 90, 1e-6, 'terminator is 90 degrees from the subsolar point');

// 頁面資料：「那裡幾點？」八題的答案由程式算
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[1].lessons.find((l) => l.slug === 'time-zones');
const qs = lesson.clock.questions;
assert.equal(qs.length, 8);
for (const q of qs) {
  const lon = q.city ? city(q.city).lon : q.lon;
  const r = fromTaipei(q.day, q.h, lon);
  const want = `${r.day}-${r.h}`;
  assert.ok(q.options.includes(q.answer) && q.options.length >= 3, `${q.en}: options`);
  assert.equal(q.answer, want, `${q.en}: expected ${want}`);
  assert.ok(q.en && q.zh && q.why_en && q.why_zh);
}
assert.equal(lesson.map_english.items.length, 8);
console.log('timezone.test ok');
