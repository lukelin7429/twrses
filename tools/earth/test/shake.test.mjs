import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { CITIES, EPICENTERS, km, project, hypo, accel, intensityValue, levelOf, label, intensityAt, shake, energyRatio, ringKm } from '../src/shakecalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
const C = Object.fromEntries(CITIES.map((c) => [c.key, c]));
assert.equal(CITIES.length, 10);
near(km(C.taipei, C.kaohsiung), 297, 12); near(km(C.taichung, C.changhua), 15, 6);
assert.ok(project(C.taipei.lon, C.taipei.lat).z < project(C.kaohsiung.lon, C.kaohsiung.lat).z);     // 北在上（−z）
near(hypo(30, 40), 50, 1e-9);
// 氣象署的關係式：震度差 1 級，加速度約差 3 倍（10^0.5）
near(intensityValue(10 ** 0.5 * 25) - intensityValue(25), 1, 1e-9);
near(intensityValue(10 ** (4 / 2 - 0.6)), 4, 1e-9);
// 規模：差 1 約 32 倍、差 2 是 1,000 倍
near(energyRatio(1), 31.62, 0.01); near(energyRatio(2), 1000, 1e-6); near(energyRatio(0), 1, 1e-12);
// 同一個地震只有一個規模，但離得越遠震度越小
const s = shake(6.5, 15, EPICENTERS.east), byKey = Object.fromEntries(s.map((x) => [x.key, x]));
assert.ok(byKey.hualien.v > byKey.taipei.v && byKey.taipei.v > byKey.kaohsiung.v);
assert.ok(new Set(s.map((x) => x.level)).size >= 3);
// 規模越大，每個地方都搖得更厲害；越深，震央附近搖得比較小
assert.ok(shake(7, 15, EPICENTERS.east).every((x, i) => x.v > s[i].v));
assert.ok(intensityAt(6.5, 80, 5) < intensityAt(6.5, 10, 5));
// 深的地震往外減得慢：近處和遠處的差距比較小
assert.ok(intensityAt(6.5, 10, 5) - intensityAt(6.5, 10, 150) > intensityAt(6.5, 80, 5) - intensityAt(6.5, 80, 150));
// 示例公式的量級：規模 7.3、很淺、就在旁邊 → 最大的 7 級；規模 3 在 100 公里外幾乎沒感覺
assert.equal(levelOf(intensityAt(7.3, 8, 5)), 7); assert.ok(levelOf(intensityAt(3, 10, 100)) <= 1);
// 等震度圈：算出來的距離上，震度剛好是那一級；級數越高圈越小
near(intensityAt(6.5, 15, ringKm(6.5, 15, 3)), 3, 1e-6); assert.ok(ringKm(6.5, 15, 4) < ringKm(6.5, 15, 3)); assert.equal(ringKm(4, 60, 6), 0);
assert.equal(levelOf(-2), 0); assert.equal(levelOf(9.4), 7);
assert.equal(label(5.2).zh, '5 弱'); assert.equal(label(5.7).zh, '5 強'); assert.equal(label(6.1).en, '6 Lower'); assert.equal(label(4.9).zh, '4 級'); assert.equal(label(7.6).idx, 9);
assert.deepEqual([0.2, 1.5, 2.5, 3.5, 4.5, 5.2, 5.7, 6.2, 6.7, 7.5].map((v) => label(v).idx), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'magnitude-and-intensity');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['small', 'mid', 'big', 'deep']); assert.equal(lesson.scale10.levels.length, 10); }
console.log('shake.test: all passed', s.map((x) => `${x.key[0]}${x.zh.replace(' ', '')}`).join(' '), lesson ? 'data ok' : 'no data yet');
