/*
 * 把 Hipparcos 新版歸算（van Leeuwen 2007，CDS I/311）轉成第十課用的精簡星表：src/near-stars.js
 *
 * 授權：ESA 的 Hipparcos 星表以 CC BY-NC 3.0 IGO 發布，必須標「Credit: ESA」——
 * 產生出來的 near-stars.js 也一樣，頁面模型下方的出處行（lab.credit_html）要保留。
 * （Gaia 也是同一個授權；但 Gaia 對天狼星、織女星這類極亮的星會飽和、量不準，所以選 Hipparcos。）
 *
 * 原始檔不進 repo，下載到 ~/Documents/twrses-hip2/：
 *   mkdir -p ~/Documents/twrses-hip2 && cd ~/Documents/twrses-hip2
 *   curl -O https://cdsarc.cds.unistra.fr/ftp/I/311/ReadMe -O https://cdsarc.cds.unistra.fr/ftp/I/311/hip2.dat.gz && gunzip -k hip2.dat.gz
 * 另外用第五課的耶魯亮星星表（~/Documents/twrses-bsc5/catalog）比對出拜耳／佛蘭斯蒂德名稱（ε Eridani 之類）。
 * 然後在 tools/astro 底下：npm run near
 *
 * 收錄：20 光年內全部（多半是肉眼看不到的紅矮星）、100 光年內亮於 6 等、更遠但亮於 3 等，再加上 NAMES 裡的星。
 * 位置用自行推到 J2000.0；視差、誤差照原值（毫角秒）。
 * 南門二 A、B 在 Hipparcos 裡互相矛盾（4.32 與 4.09 光年，雙星軌道運動沒解好），改用 Kervella et al. 2016
 * 的系統視差 747.17 ± 0.61 mas（A&A 594, A107），頁面出處行也有寫。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';

const HIP2 = process.argv[2] || `${homedir()}/Documents/twrses-hip2/hip2.dat`;
const BSC = process.argv[3] || `${homedir()}/Documents/twrses-bsc5/catalog`;
const RAD = 180 / Math.PI;

// 有名字的星：HIP → [key, 英文, 中文]。key 給頁面按鈕用（data-lab-star）；中文名與第五課 figures.js 一致。
const NAMES = {
  70890: ['proxima', 'Proxima Centauri', '比鄰星'], 71683: ['acen', 'Alpha Centauri', '南門二'],
  87937: ['barnard', "Barnard's Star", '巴納德星'], 32349: ['sirius', 'Sirius', '天狼星'],
  104214: ['61cyg', '61 Cygni', '天鵝座 61'], 37279: ['procyon', 'Procyon', '南河三'],
  16537: ['epseri', 'Epsilon Eridani', '天苑四'], 8102: ['taucet', 'Tau Ceti', '天倉五'],
  97649: ['altair', 'Altair', '牛郎星'], 91262: ['vega', 'Vega', '織女星'], 113368: ['fomalhaut', 'Fomalhaut', '北落師門'],
  37826: ['pollux', 'Pollux', '北河三'], 69673: ['arcturus', 'Arcturus', '大角星'], 24608: ['capella', 'Capella', '五車二'],
  36850: ['castor', 'Castor', '北河二'], 21421: ['aldebaran', 'Aldebaran', '畢宿五'], 49669: ['regulus', 'Regulus', '軒轅十四'],
  57632: ['denebola', 'Denebola', '五帝座一'], 54061: ['dubhe', 'Dubhe', '天樞'], 7588: ['achernar', 'Achernar', '水委一'],
  46390: ['alphard', 'Alphard', '星宿一'], 65474: ['spica', 'Spica', '角宿一'], 25336: ['bellatrix', 'Bellatrix', '參宿五'],
  30438: ['canopus', 'Canopus', '老人星'], 60718: ['acrux', 'Acrux', '十字架二'], 68702: ['hadar', 'Hadar', '馬腹一'],
  11767: ['polaris', 'Polaris', '北極星'], 27989: ['betelgeuse', 'Betelgeuse', '參宿四'], 80763: ['antares', 'Antares', '心宿二'],
  24436: ['rigel', 'Rigel', '參宿七'], 26311: ['alnilam', 'Alnilam', '參宿二'], 102098: ['deneb', 'Deneb', '天津四'],
  17702: ['alcyone', 'Alcyone (Pleiades)', '昴宿六'], 72607: ['kochab', 'Kochab', '帝星'],
};
const ACEN = { plx: 747.17, e: 0.61 };   // Kervella et al. 2016
const SKIP = new Set([71681]);           // 南門二 B：和 A 畫成同一顆

// ---- 耶魯亮星星表：拿來比對名稱 ----
const bsc = [];
for (const line of readFileSync(BSC, 'latin1').split('\n')) {
  if (line.length < 110 || !line.slice(75, 77).trim()) continue;
  const ra = (+line.slice(75, 77) + +line.slice(77, 79) / 60 + +line.slice(79, 83) / 3600) * 15;
  const dec = (line[83] === '-' ? -1 : 1) * (+line.slice(84, 86) + +line.slice(86, 88) / 60 + +line.slice(88, 90) / 3600);
  const fl = line.slice(4, 7).trim(), by = line.slice(7, 10).trim(), sup = line.slice(10, 11).trim(), con = line.slice(11, 14).trim();
  bsc.push({ ra, dec, fl, by, sup, con, mag: +line.slice(102, 107) });
}
bsc.sort((a, b) => a.ra - b.ra);
function bscMatch(ra, dec, hp) {
  let best = null;
  for (const b of bsc) {
    if (Math.abs(b.ra - ra) > 0.3 && Math.abs(Math.abs(b.ra - ra) - 360) > 0.3) continue;
    const dra = ((b.ra - ra + 540) % 360) - 180;
    const d = Math.hypot(dra * Math.cos(dec / RAD), b.dec - dec) * 3600;
    if (d < 60 && Math.abs(b.mag - hp) < 1.2 && (!best || d < best.d)) best = { d, b };
  }
  return best && best.b;
}
const desig = (b) => (b && b.con ? (b.by ? `${b.by}${b.sup ? b.sup : ''} ${b.con}` : b.fl ? `${b.fl} ${b.con}` : '') : '');

// ---- Hipparcos 新版歸算 ----
const PC_LY = 3.26156;
const stars = [];
for (const l of readFileSync(HIP2, 'latin1').split('\n')) {
  if (l.length < 170) continue;
  const hip = +l.slice(0, 6);
  if (SKIP.has(hip)) continue;
  let plx = +l.slice(43, 50), e = +l.slice(83, 89);
  const hp = +l.slice(129, 136), bvs = l.slice(152, 158).trim();
  if (hip === 71683) ({ plx, e } = ACEN);
  if (!(plx > 0)) continue;
  const ly = 1000 / plx * PC_LY;
  const named = NAMES[hip];
  if (!(named || ly <= 20 || (ly <= 100 && hp <= 6) || hp <= 3)) continue;
  // 位置：ICRS、曆元 1991.25 → 用自行推到 2000.0
  const ra0 = +l.slice(15, 28) * RAD, de0 = +l.slice(29, 42) * RAD;
  const pmra = +l.slice(51, 59), pmde = +l.slice(60, 68), dt = 8.75;
  const dec = de0 + pmde * dt / 3.6e6;
  const ra = (ra0 + pmra * dt / 3.6e6 / Math.cos(de0 / RAD) + 360) % 360;
  stars.push({ hip, ra, dec, plx, e, hp, bv: bvs ? +bvs : 0.6, named, des: hp <= 6.5 ? desig(bscMatch(ra, dec, hp)) : '' });
}
stars.sort((a, b) => b.plx - a.plx);   // 由近到遠
for (const [h, n] of Object.entries(NAMES)) if (!stars.find((s) => s.hip === +h)) throw new Error(`找不到 HIP ${h} ${n[1]}`);

const flat = stars.flatMap((s) => [+s.ra.toFixed(4), +s.dec.toFixed(4), +s.plx.toFixed(2), +s.e.toFixed(2), +s.hp.toFixed(2), +s.bv.toFixed(2)]);
const named = Object.fromEntries(stars.map((s, i) => [i, s.named]).filter(([, n]) => n).map(([i, n]) => [n[0], [i, n[1], n[2]]]));
const des = Object.fromEntries(stars.map((s, i) => [i, s.des]).filter(([, d]) => d));
const out = `// 由 scripts/build-near.mjs 從 Hipparcos 新版歸算（van Leeuwen 2007，CDS I/311）產生，不要手改。
// Credit: ESA（CC BY-NC 3.0 IGO）。南門二用 Kervella et al. 2016 的視差。
// NEAR：每 6 個數字一顆星——J2000 赤經（度）、赤緯（度）、視差（毫角秒）、視差誤差（毫角秒）、Hipparcos 星等、B−V；由近到遠。
export const NEAR = ${JSON.stringify(flat)};
export const HIP = ${JSON.stringify(stars.map((s) => s.hip))};
// key → [索引, 英文名, 中文名]
export const NEAR_NAMED = ${JSON.stringify(named)};
// 索引 → 拜耳／佛蘭斯蒂德名（比對耶魯亮星星表），只給肉眼看得到的星
export const NEAR_DESIG = ${JSON.stringify(des)};
`;
writeFileSync(new URL('../src/near-stars.js', import.meta.url), out);
const n20 = stars.filter((s) => 1000 / s.plx * PC_LY <= 20);
console.log(`${stars.length} stars; ${n20.length} within 20 ly (${n20.filter((s) => s.hp <= 6).length} brighter than 6th mag); ${(out.length / 1024).toFixed(1)} KB`);
