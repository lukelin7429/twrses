// 第十課的純函式：兩個宗教的篩選、兩個宗教都有的地方、路線的檢查。node test/faith.test.mjs
import assert from 'node:assert/strict';
import { FAITHS, siteYear, shows, visible, routeOn, checkSite, checkFaithRoute } from '../src/faith.js';

const sites = [
  { key: 'jer', faiths: ['christian', 'islam'], year: 30, year2: 691, also_en: 'x', also_zh: 'x' },
  { key: 'rome', faiths: ['christian'], year: 64 },
  { key: 'mecca', faiths: ['islam'], year: 610 },
  { key: 'cor', faiths: ['islam', 'christian'], year: 756, year2: 1236, also_en: 'x', also_zh: 'x' },
];
assert.deepEqual(FAITHS, ['christian', 'islam']);
// 年代：兩個一起看用第一個年代；只看第二個宗教時用 year2；沒有這個宗教就永遠不亮
assert.equal(siteYear(sites[0], 'all'), 30); assert.equal(siteYear(sites[0], 'christian'), 30); assert.equal(siteYear(sites[0], 'islam'), 691);
assert.equal(siteYear(sites[3], 'christian'), 1236); assert.equal(siteYear(sites[3], 'islam'), 756);
assert.equal(siteYear(sites[1], 'islam'), Infinity);
assert.ok(shows(sites[1], 'all') && shows(sites[1], 'christian') && !shows(sites[1], 'islam'));
const keys = (f, y) => visible(sites, f, y).map((s) => s.key);
assert.deepEqual(keys('all', 100), ['jer', 'rome']);
assert.deepEqual(keys('islam', 650), ['mecca']);
assert.deepEqual(keys('islam', 700), ['jer', 'mecca']);
assert.deepEqual(keys('christian', 1000), ['jer', 'rome']);
assert.deepEqual(keys('christian', 1300), ['jer', 'rome', 'cor']);
assert.ok(routeOn({ faith: 'islam' }, 'all') && routeOn({ faith: 'islam' }, 'islam') && !routeOn({ faith: 'islam' }, 'christian'));
// 地方的檢查
for (const s of sites) assert.equal(checkSite(s), null, s.key);
assert.match(checkSite({ key: 'a', faiths: ['christian', 'islam'], year: 30 }), /year2/);
assert.match(checkSite({ key: 'a', faiths: ['christian', 'islam'], year: 30, year2: 20, also_en: 'x', also_zh: 'x' }), /after/);
assert.match(checkSite({ key: 'a', faiths: ['christian', 'islam'], year: 30, year2: 90 }), /also/);
assert.match(checkSite({ key: 'a', faiths: ['buddhist'], year: 30 }), /bad/);
assert.match(checkSite({ key: 'a', faiths: ['islam'], year: 30, year2: 90 }), /only/);
// 路線的檢查：年代不倒退、地方的年代要對上這個宗教的年代、宗教要對
assert.equal(checkFaithRoute({ key: 'r', faith: 'christian', pts: [[35, 31, 30, 'jer'], [12, 41, 64, 'rome']] }, sites), null);
assert.equal(checkFaithRoute({ key: 'r', faith: 'islam', pts: [[39, 21, 610, 'mecca'], [35, 31, 691, 'jer']] }, sites), null);
assert.match(checkFaithRoute({ key: 'r', faith: 'islam', pts: [[39, 21, 610, 'mecca'], [35, 31, 30, 'jer']] }, sites), /back|≠/);
assert.match(checkFaithRoute({ key: 'r', faith: 'islam', pts: [[39, 21, 600], [12, 41, 640, 'rome']] }, sites), /no islam/);
assert.match(checkFaithRoute({ key: 'r', faith: 'christian', pts: [[35, 31, 30], [12, 41, 70, 'rome']] }, sites), /≠/);
assert.match(checkFaithRoute({ key: 'r', faith: 'christian', pts: [[35, 31], [12, 41, 70]] }, sites), /first and last/);
assert.match(checkFaithRoute({ key: 'r', faith: 'pagan', pts: [[35, 31, 1], [12, 41, 70]] }, sites), /bad faith/);
console.log('faith.test.mjs ok');
