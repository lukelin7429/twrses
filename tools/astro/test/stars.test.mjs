// 第五課的星表與星空計算：node test/stars.test.mjs（有 assert，錯了會直接失敗）
import assert from 'node:assert/strict';
import { STARS, LINES, NAMED_IDX } from '../src/stars-data.js';
import { NAMED, FIGURES } from '../src/figures.js';
import { N_STARS, allStarsAltAz, altAz, meridianZodiac, starEqOfDate, sunConstellation, zodiacAt, riseSet } from '../src/sky.js';

const SITE = { lat: 24.08, lon: 120.54 };
const H = 3600000;
const tw = (s) => new Date(new Date(s + 'Z').getTime() - 8 * H);     // 台灣時間字串 → Date
const idx = (en) => NAMED_IDX[NAMED.findIndex((n) => n[1] === en)];

// 1. 星表：參宿四的 J2000 位置（SIMBAD：RA 88.793°、Dec +7.407°）、天狼星最亮
const b = idx('Betelgeuse');
assert.ok(Math.abs(STARS[b * 4] - 88.793) < 0.01 && Math.abs(STARS[b * 4 + 1] - 7.407) < 0.01, 'Betelgeuse position');
assert.equal(idx('Sirius'), 0, 'Sirius is the brightest star in the list');
assert.ok(FIGURES.every((f) => LINES[f.abbr].length >= 2), 'every figure has lines');
console.log(`stars: ${N_STARS}, Betelgeuse RA ${STARS[b * 4]} Dec ${STARS[b * 4 + 1]}`);

// 2. 歲差後的位置：2026 年參宿四赤經比 J2000 大約 0.3°
const q = starEqOfDate(b, new Date('2026-10-01T00:00Z'));
assert.ok(q.ra - 88.793 > 0.25 && q.ra - 88.793 < 0.45, `precessed RA ${q.ra}`);

// 3. 太陽在哪個星座前面（IAU 邊界）：10/1 室女、12/1 蛇夫、3/1 寶瓶、6/1 金牛
for (const [d, want] of [['2026-10-01', 'Vir'], ['2026-12-01', 'Oph'], ['2026-03-01', 'Aqr'], ['2026-06-01', 'Tau'], ['2026-08-15', 'Leo']]) {
  const s = sunConstellation(new Date(d + 'T04:00:00Z'));
  assert.equal(s.sun, want, `Sun on ${d}`);
  console.log(`Sun on ${d}: ${s.sun}, opposite ${s.opposite}`);
}
assert.equal(zodiacAt(250), 'Oph');

// 4. 參商：一整年、每 10 分鐘，參宿四與心宿二從來不會同時高於地平線 6°（一個剛升、一個將落時最多各約 5°）
let worst = -90, when = null;
for (let t = Date.UTC(2026, 0, 1); t < Date.UTC(2027, 0, 1); t += 10 * 60000) {
  const d = new Date(t);
  const a1 = altAz(...Object.values(starEqOfDate(b, d)), d, SITE).alt;
  const a2 = altAz(...Object.values(starEqOfDate(idx('Antares'), d)), d, SITE).alt;
  const m = Math.min(a1, a2);
  if (m > worst) { worst = m; when = d; }
}
console.log(`Shen–Shang: highest both-up altitude ${worst.toFixed(2)}° at ${when.toISOString()}`);
assert.ok(worst < 6, 'Betelgeuse and Antares are never both above 6°');

// 5. 四季晚上九點（彰化）：一月獵戶、四月獅子、七月天蠍、十月飛馬都在天上
const alt = (name, date) => { const a = allStarsAltAz(date, SITE); return a[idx(name) * 2]; };
for (const [d, star] of [['2026-01-15T21:00', 'Betelgeuse'], ['2026-04-15T21:00', 'Regulus'], ['2026-07-15T21:00', 'Antares'], ['2026-10-15T21:00', 'Fomalhaut']]) {
  const a = alt(star, tw(d));
  console.log(`${d} ${star} alt ${a.toFixed(1)}°`);
  assert.ok(a > 20, `${star} is up on ${d}`);
}
// 同一顆星每晚早約 4 分鐘升起：參宿四 10/1 與 10/31 的升起時刻差約 2 小時
const riseOf = (day) => { const t0 = tw(day + 'T12:00'); return riseSet((d) => altAz(...Object.values(starEqOfDate(b, d)), d, SITE).alt, t0, new Date(t0.getTime() + 24 * H)).rise; };
const r1 = riseOf('2026-10-01'), r2 = riseOf('2026-10-31');
const diff = ((r1.getTime() + 30 * 24 * H) - r2.getTime()) / 60000;
console.log(`Betelgeuse rises ${new Date(r1.getTime() + 8 * H).toISOString().slice(11, 16)} on 10/1, ${new Date(r2.getTime() + 8 * H).toISOString().slice(11, 16)} on 10/31 (earlier by ${diff.toFixed(0)} min)`);
assert.ok(diff > 110 && diff < 125, 'rises about 2 hours earlier a month later');
console.log('meridian zodiac, 2026-10-01 21:00 Changhua:', meridianZodiac(tw('2026-10-01T21:00'), SITE));
console.log('stars.test OK');
