// 第十課的恆星距離：node test/distance.test.mjs（有 assert）
// 對照公認距離：比鄰星 4.24、南門二 4.37、天狼星 8.6、織女星 25、牛郎星 16.7、天鵝座 61 約 11.4 光年
import assert from 'node:assert/strict';
import {
  N_NEAR, starByKey, lyOf, lyRange, coinKm, separationLy, parallaxShift, departYear, eraOf, fmtYear, fmtDesig,
  birthdayStars, absMag, AU_PER_LY, LY_KM, PC_LY,
} from '../src/distance.js';

const KNOWN = [['proxima', 4.24, 0.05], ['acen', 4.37, 0.02], ['sirius', 8.6, 0.1], ['vega', 25.0, 0.3], ['altair', 16.7, 0.2],
  ['61cyg', 11.4, 0.2], ['procyon', 11.46, 0.15], ['arcturus', 36.7, 0.5]];
for (const [k, ly, tol] of KNOWN) {
  const s = starByKey(k), d = lyOf(s.plx);
  console.log(`${s.en.padEnd(17)} ${d.toFixed(2)} ly (parallax ${(s.plx / 1000).toFixed(4)}″ ± ${(s.e / 1000).toFixed(4)}″)   expected ${ly}`);
  assert.ok(Math.abs(d - ly) <= tol, `${k} distance`);
}
// 比鄰星是太陽以外最近的星（南門二 A、B 畫成同一顆，不能比比鄰星近）
const prox = starByKey('proxima');
assert.equal(prox.i, 0, 'Proxima should be the nearest star in the list');
// 單位：1 光年 ≈ 9.46 兆公里 ≈ 63,241 AU；1 秒差距 3.26 光年
assert.ok(Math.abs(LY_KM / 1e12 - 9.46) < 0.01 && Math.abs(AU_PER_LY - 63241) < 1 && Math.abs(PC_LY - 3.2616) < 1e-3);
// 牛郎織女相距約 15 光年（第五課、文化卡）
const qixi = separationLy(starByKey('vega'), starByKey('altair'));
console.log(`Vega–Altair: ${qixi.toFixed(1)} ly apart`);
assert.ok(qixi > 14 && qixi < 15.5);
// 比鄰星的視差＝從 5 公里外看一枚一元硬幣（直徑 20 mm）
const coin = coinKm(prox.plx);
console.log(`Proxima's parallax = a 20 mm coin seen from ${coin.toFixed(2)} km`);
assert.ok(coin > 5 && coin < 5.6);
// 參宿四：Hipparcos 約 500 光年，誤差約 13%；光出發在明朝（1368–1644）——2026 年看
const bet = starByKey('betelgeuse'), [bNear, bFar] = lyRange(bet.plx, bet.e);
const now = new Date('2026-10-01T12:00:00Z');
const yb = departYear(lyOf(bet.plx), now), yLo = departYear(bFar, now), yHi = departYear(bNear, now);
console.log(`Betelgeuse ${lyOf(bet.plx).toFixed(0)} ly (${bNear.toFixed(0)}–${bFar.toFixed(0)}): light left ${fmtYear(yb).en} (${fmtYear(yLo).en}–${fmtYear(yHi).en}), ${eraOf(yb).en}`);
assert.equal(eraOf(yb).zh, '明朝'); assert.equal(eraOf(yLo).zh, '明朝'); assert.equal(eraOf(yHi).zh, '明朝');
// 越遠越難量：天津四的誤差比例遠大於天狼星
const den = starByKey('deneb'), sir = starByKey('sirius');
assert.ok(den.e / den.plx > 0.1 && sir.e / sir.plx < 0.01);
// 朝代與年份
assert.equal(eraOf(2026.5 - 8.6).zh, '民國 106 年');   // 天狼星的光出發於 2017 年
assert.equal(eraOf(1911.9).zh, '清朝'); assert.equal(eraOf(1700).zh, '清朝'); assert.equal(eraOf(700).zh, '唐朝'); assert.equal(eraOf(1000).zh, '宋朝');
// 年份是天文年號（0 年＝西元前 1 年）：0.5 → 西元前 1 年、-0.5 → 西元前 2 年、1.5 → 西元 1 年
assert.equal(eraOf(-0.5).zh, '漢朝'); assert.equal(fmtYear(0.5).en, '1 BCE'); assert.equal(fmtYear(-0.5).en, '2 BCE'); assert.equal(fmtYear(1.5).en, '1');
assert.equal(fmtYear(-99.5).zh, '西元前 101 年');
// 視差橢圓：大小＝視差。黃道北極附近的星畫圓（半徑≈視差），黃道上的星畫一條線（往返＝2 倍視差）
function ellipse(ra, dec, plx) {
  let maxR = 0, minR = Infinity, maxE = -Infinity, minE = Infinity;
  for (let d = 0; d < 366; d += 2) {
    const s = parallaxShift(ra, dec, plx, new Date(Date.UTC(2026, 0, 1) + d * 86400000)), r = Math.hypot(s.east, s.north);
    maxR = Math.max(maxR, r); minR = Math.min(minR, r); maxE = Math.max(maxE, s.east); minE = Math.min(minE, s.east);
  }
  return { maxR, minR, width: maxE - minE };
}
const pole = ellipse(270, 66.56, 100), onEcl = ellipse(90, 23.44, 100);
console.log(`Ecliptic pole: radius ${pole.minR.toFixed(1)}–${pole.maxR.toFixed(1)} mas; ecliptic: ${onEcl.minR.toFixed(1)}–${onEcl.maxR.toFixed(1)} mas, width ${onEcl.width.toFixed(1)}`);
assert.ok(pole.minR > 97 && pole.maxR < 103 && onEcl.minR < 3 && Math.abs(onEcl.width - 200) < 6);
// 方向：地球在 6 月（日心黃經約 260°）時，黃經 90° 的星（冬季星空）往東移、12 月往西移——位移與地球位置相反
const jun = parallaxShift(90, 23.44, 100, new Date('2026-06-21T00:00Z')), dec = parallaxShift(90, 23.44, 100, new Date('2026-12-21T00:00Z'));
assert.ok(Math.abs(jun.east) < 5 && Math.abs(dec.east) < 5, 'solstices: star at lon 90 is in line with the Sun–Earth axis');
const mar = parallaxShift(90, 23.44, 100, new Date('2026-03-20T00:00Z')), sep = parallaxShift(90, 23.44, 100, new Date('2026-09-23T00:00Z'));
console.log(`Star at ecliptic lon 90°: March shift east ${mar.east.toFixed(0)} mas, September ${sep.east.toFixed(0)} mas`);
assert.ok(mar.east < -95 && sep.east > 95);
// 星名
assert.deepEqual(fmtDesig('Omi2 Eri'), { en: 'ο² Eridani', zh: '波江座 ο²', con: 'Eri' });
assert.equal(fmtDesig('70 Oph').en, '70 Ophiuchi');
// 生日星：10 歲 → 天苑四（10.5 光年）附近
const b10 = birthdayStars(10.5).map((s) => s.en);
console.log(`Birthday stars at 10.5: ${b10.join(', ')}`);
assert.ok(b10.includes('Epsilon Eridani'));
// 絕對星等：比鄰星很暗（約 15 等），天津四極亮
assert.ok(absMag(prox.mag, prox.plx) > 14 && absMag(den.mag, den.plx) < -6);
console.log(`${N_NEAR} stars in near-stars.js`);
console.log('distance: all good');
