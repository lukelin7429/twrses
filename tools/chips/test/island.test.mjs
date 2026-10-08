// 晶片與半導體第八課：地圖、距離、時間軸的檢查
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { OUTLINE, PLACES, project, km, journeyKm, EVENTS, eventsBy, yearsAgo, ROLES, score, YEAR_MIN, YEAR_MAX } from '../src/islandcalc.js';

// 輪廓都落在台灣本島的範圍裡；南北約 380–400 公里
for (const [lon, lat] of OUTLINE) assert.ok(lon > 119.9 && lon < 122.1 && lat > 21.8 && lat < 25.4);
const ns = km({ lon: 121.54, lat: 25.30 }, { lon: 120.85, lat: 21.90 });
assert.ok(ns > 370 && ns < 400, String(ns));
// 距離（直線）：新竹—台南約 200 公里、台南—高雄約 40 公里、新竹—高雄約 240 公里
assert.ok(Math.abs(km(PLACES.hsinchu, PLACES.tainan) - 201) < 8);
assert.ok(Math.abs(km(PLACES.tainan, PLACES.kaohsiung) - 42) < 5);
assert.ok(Math.abs(km(PLACES.hsinchu, PLACES.kaohsiung) - 240) < 10);
assert.ok(journeyKm() > 230 && journeyKm() < 260);
// 投影：北邊的 z 比較小（畫面上方）、東邊的 x 比較大；所有地點都在輪廓的外框裡
assert.ok(project(121, 25).z < project(121, 22).z && project(122, 24).x > project(120, 24).x);
const xs = OUTLINE.map(([a, b]) => project(a, b).x), zs = OUTLINE.map(([a, b]) => project(a, b).z);
for (const p of Object.values(PLACES)) { const q = project(p.lon, p.lat); assert.ok(q.x > Math.min(...xs) && q.x < Math.max(...xs) && q.z > Math.min(...zs) && q.z < Math.max(...zs)); }
// 時間軸：由早到晚；1980 年有兩件事；1987 年以前（含）共 6 件
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i].year >= EVENTS[i - 1].year);
assert.equal(eventsBy(1980).length, 4); assert.equal(eventsBy(1987).length, 6); assert.equal(eventsBy(YEAR_MIN).length, 0); assert.equal(eventsBy(YEAR_MAX).length, EVENTS.length);
assert.equal(yearsAgo(1987), 39);
// 小遊戲：全對 7 分
assert.equal(score(ROLES), 7); assert.equal(score({ TSMC: 'design' }), 0);
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'chip-island');
if (lesson) {
  assert.equal(lesson.lab.events.length, EVENTS.length);
  lesson.lab.events.forEach((e, i) => { assert.equal(e.key, EVENTS[i].key); assert.equal(e.year, EVENTS[i].year); });
  assert.deepEqual(lesson.who.companies.map((c) => c.name).sort(), Object.keys(ROLES).sort());
}
console.log('island.test: all passed', ns.toFixed(0), km(PLACES.hsinchu, PLACES.tainan).toFixed(0), journeyKm().toFixed(0), lesson ? 'data ok' : 'no data yet');
