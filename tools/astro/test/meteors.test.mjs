// 第十一課的流星雨：node test/meteors.test.mjs（有 assert）
// 極大時刻對照 IMO《2027 Meteor Shower Calendar》文中寫的時刻（UT），容許 1.5 小時
import assert from 'node:assert/strict';
import {
  SHOWERS, PARENTS, showerByKey, peakOf, upcomingPeaks, nightOf, moonIllum, nodeNearEarth, earthLonAt, orbitPoint, solarLonJ2000,
} from '../src/meteors.js';

const site = { lat: 24.08, lon: 120.54 };
const IMO_2027 = [['qua', '2027-01-04T03:25Z'], ['lyr', '2027-04-23T01:40Z'], ['per', '2027-08-13T09:00Z'],
  ['leo', '2027-11-18T06:00Z'], ['gem', '2027-12-14T20:00Z'], ['urs', '2027-12-23T04:00Z']];
for (const [k, t] of IMO_2027) {
  const p = peakOf(showerByKey(k), 2027), dh = (p - new Date(t)) / 3600000;
  console.log(`${k} 2027 peak ${p.toISOString().slice(0, 16)}Z (IMO ${t.slice(0, 16)}Z, ${dh >= 0 ? '+' : ''}${dh.toFixed(2)} h)`);
  assert.ok(Math.abs(dh) <= 1.5, `${k} peak time`);
}
// 太陽黃經解得準：極大時刻的 λ☉ 與表列值差不到 0.001°
for (const s of SHOWERS) assert.ok(Math.abs(solarLonJ2000(peakOf(s, 2026)) - s.lam) < 1e-3, `${s.key} λ`);
// 每年同一天：2026–2030 的英仙座極大都在 8 月 12–13 日
for (let y = 2026; y <= 2030; y++) { const p = peakOf(showerByKey('per'), y); assert.ok(p.getUTCMonth() === 7 && [12, 13].includes(p.getUTCDate()), `Perseids ${y}`); }
// 月光：2026 英仙座（8/12 新月、日全食那天）沒有月光；2027 雙子座遇滿月、象限儀座接近新月（IMO 文字）
const m26 = moonIllum(peakOf(showerByKey('per'), 2026)), g27 = moonIllum(peakOf(showerByKey('gem'), 2027)), q27 = moonIllum(peakOf(showerByKey('qua'), 2027));
console.log(`Moon lit: Perseids 2026 ${(m26 * 100).toFixed(0)}%, Geminids 2027 ${(g27 * 100).toFixed(0)}%, Quadrantids 2027 ${(q27 * 100).toFixed(0)}%`);
assert.ok(m26 < 0.03 && g27 > 0.95 && q27 < 0.2);
// 地球穿過碎屑帶：母天體軌道離「極大時刻的地球」都在 0.2 AU 以內
for (const s of SHOWERS) {
  const L = earthLonAt(s.lam) * Math.PI / 180, E = [Math.cos(L), Math.sin(L), 0], el = PARENTS[s.parent];
  let min = 9;
  for (let nu = -179.9; nu < 180; nu += 0.1) { const p = orbitPoint(el, nu); min = Math.min(min, Math.hypot(p[0] - E[0], p[1] - E[1], p[2] - E[2])); }
  assert.ok(min < 0.2, `${s.key}: parent orbit ${min.toFixed(3)} AU from Earth`);
}
// 交點：斯威夫特－塔特爾（英仙座）、坦普爾－塔特爾（獅子座）、塔特爾（小熊座）的近地交點就在地球極大時的位置（差 1° 內，離太陽約 1 AU）
for (const k of ['per', 'leo', 'urs']) {
  const s = showerByKey(k), n = nodeNearEarth(PARENTS[s.parent]), d = Math.abs(((n.lon - earthLonAt(s.lam) + 540) % 360) - 180);
  console.log(`${k}: node at ${n.lon.toFixed(1)}° (${n.r.toFixed(2)} AU), Earth at ${earthLonAt(s.lam).toFixed(1)}°`);
  assert.ok(d < 1 && Math.abs(n.r - 1) < 0.1);
}
// 2026/10/1 起：下一個是獵戶座（10/21–22），然後獅子座、雙子座
const up = upcomingPeaks(new Date('2026-10-01T04:00Z'));
console.log('Next peaks: ' + up.slice(0, 4).map((x) => `${x.shower.key} ${x.peak.toISOString().slice(0, 10)}`).join(', '));
assert.deepEqual(up.slice(0, 3).map((x) => x.shower.key), ['ori', 'leo', 'gem']);
// 彰化：2026 雙子座極大那夜，輻射點最高 80° 左右（凌晨兩點前後），理想暗空每小時約 150 顆
const g = nightOf(showerByKey('gem'), peakOf(showerByKey('gem'), 2026), site);
const bh = new Date(g.best.getTime() + 8 * 3600000).getUTCHours();
console.log(`Geminids 2026 over Changhua: night of ${g.night.m}/${g.night.d}, best ~${bh}:00, radiant ${g.radAlt.toFixed(0)}°, ~${g.rate}/h, Moon ${(g.moonIllum * 100).toFixed(0)}%`);
assert.ok(g.night.m === 12 && g.night.d === 14 && g.radAlt > 75 && g.rate > 140 && (bh <= 3 || bh >= 23));
// 獵戶座 2026：月亮在凌晨之前落下，輻射點凌晨四點多最高
const o = nightOf(showerByKey('ori'), peakOf(showerByKey('ori'), 2026), site);
assert.ok(o.moonAlt < 0 && o.radAlt > 70);
// 2026 小熊座遇滿月：最佳時刻（清晨）月亮剛下山，但兩小時前還在天上
const u = nightOf(showerByKey('urs'), peakOf(showerByKey('urs'), 2026), site);
assert.ok(u.moonIllum > 0.9 && u.moonAlt2 > 0);
console.log('meteors: all good');
