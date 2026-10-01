/*
 * 第十課的恆星距離計算（純函式，不碰 DOM，可以直接用 node 測試：test/distance.test.mjs）。
 *
 * 距離 ＝ 1 ÷ 視差：視差 1 角秒 ＝ 1 秒差距 ＝ 3.26156 光年。視差、誤差來自 near-stars.js（Hipparcos 新版歸算）。
 * 「光是哪一年出發的」＝ 今天的年份 − 光年數；誤差範圍用視差 ± 誤差換算（越遠的星，範圍越寬）。
 * 視差橢圓：地球繞太陽一年，近星在遠方星空前畫出的小橢圓——方向與地球位置相反，大小＝視差。
 */
import { NEAR, NEAR_DESIG, NEAR_NAMED } from './near-stars.js';
import { helio } from './planets.js';

export const PC_LY = 3.26156;                 // 1 秒差距＝3.26156 光年
export const LY_KM = 9.4607e12;               // 1 光年（公里）
export const AU_PER_LY = 63241.08;
export const N_NEAR = NEAR.length / 6;
const DEG = Math.PI / 180;
const EPS = 23.4392911 * DEG;                 // J2000 黃赤交角

export const nearStar = (i) => ({
  i, ra: NEAR[i * 6], dec: NEAR[i * 6 + 1], plx: NEAR[i * 6 + 2], e: NEAR[i * 6 + 3], mag: NEAR[i * 6 + 4], bv: NEAR[i * 6 + 5],
});
/** 視差（毫角秒）→ 光年。 */
export const lyOf = (plxMas) => 1000 / plxMas * PC_LY;
/** 誤差範圍：[近, 遠]（光年）。視差減誤差 ≤ 0 時，遠端是 Infinity。 */
export const lyRange = (plx, e) => [lyOf(plx + e), plx - e > 0 ? lyOf(plx - e) : Infinity];
/** 絕對星等：放到 10 秒差距（32.6 光年）外時有多亮。 */
export const absMag = (mag, plx) => mag + 5 + 5 * Math.log10(plx / 1000);
/** 一枚硬幣（直徑 mm）要放多遠，看起來才和視差一樣大（公里）。 */
export const coinKm = (plxMas, coinMm = 20) => (coinMm / 1e6) / (plxMas / 1000 / 3600 * DEG);
export const starByKey = (k) => { const n = NEAR_NAMED[k]; return n ? { ...nearStar(n[0]), key: k, en: n[1], zh: n[2] } : null; };

/** 赤道直角座標（+x 春分點、+z 天北極），長度 r。 */
export function eqVec(ra, dec, r = 1) {
  const a = ra * DEG, d = dec * DEG;
  return [r * Math.cos(d) * Math.cos(a), r * Math.cos(d) * Math.sin(a), r * Math.sin(d)];
}
/** 赤道 → 黃道直角座標（+z 黃道北極）。 */
export const eqToEclVec = ([x, y, z]) => [x, y * Math.cos(EPS) + z * Math.sin(EPS), -y * Math.sin(EPS) + z * Math.cos(EPS)];
/** 兩顆星之間的距離（光年）。 */
export function separationLy(a, b) {
  const p = eqVec(a.ra, a.dec, lyOf(a.plx)), q = eqVec(b.ra, b.dec, lyOf(b.plx));
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

/** 地球的日心位置（AU，赤道直角座標 J2000）。 */
export function earthEq(date) {
  const [x, y, z] = helio('earth', date);
  return [x, y * Math.cos(EPS) - z * Math.sin(EPS), y * Math.sin(EPS) + z * Math.cos(EPS)];
}
/**
 * 某天的視差位移（毫角秒）：east 往東為正、north 往北為正。
 * 從地球看，星的方向 ＝ 星的位置 − 地球位置，所以位移是「地球位置在天球切平面上的投影」取負號 × 視差。
 */
export function parallaxShift(ra, dec, plxMas, date) {
  const E = earthEq(date), a = ra * DEG, d = dec * DEG;
  const eE = [-Math.sin(a), Math.cos(a), 0];
  const eN = [-Math.sin(d) * Math.cos(a), -Math.sin(d) * Math.sin(a), Math.cos(d)];
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  return { east: -plxMas * dot(E, eE), north: -plxMas * dot(E, eN) };
}

// ---------------------------------------------------------------------------
// 光是哪一年出發的
export const yearFrac = (date) => { const y = date.getUTCFullYear(), t0 = Date.UTC(y, 0, 1), t1 = Date.UTC(y + 1, 0, 1); return y + (date.getTime() - t0) / (t1 - t0); };
export const departYear = (ly, date = new Date()) => yearFrac(date) - ly;

// 中國朝代（台灣課本常用的起訖年；西元前用負數，沒有西元 0 年）
const ERAS = [
  [-1600, '商朝', 'the Shang dynasty'], [-1046, '西周', 'the Western Zhou dynasty'], [-770, '春秋時代', 'the Spring and Autumn period'],
  [-475, '戰國時代', 'the Warring States period'], [-221, '秦朝', 'the Qin dynasty'], [-202, '漢朝', 'the Han dynasty'],
  [220, '三國時代', 'the Three Kingdoms period'], [266, '晉朝', 'the Jin dynasty'], [420, '南北朝', 'the Northern and Southern dynasties'],
  [581, '隋朝', 'the Sui dynasty'], [618, '唐朝', 'the Tang dynasty'], [907, '五代十國', 'the Five Dynasties period'],
  [960, '宋朝', 'the Song dynasty'], [1271, '元朝', 'the Yuan dynasty'], [1368, '明朝', 'the Ming dynasty'], [1644, '清朝', 'the Qing dynasty'],
  [1912, '民國', 'the Republic of China'],
];
/** 年份（可為小數；西元前為負）→ 整數年，跳過西元 0 年。 */
export const calYear = (y) => { const f = Math.floor(y); return f <= 0 ? f - 1 : f; };
export const fmtYear = (y) => { const c = calYear(y); return c < 0 ? { en: `${-c} BCE`, zh: `西元前 ${-c} 年` } : { en: String(c), zh: `${c} 年` }; };
/** 那一年在中國是什麼朝代。 */
export function eraOf(y) {
  const c = calYear(y);
  let hit = null;
  for (const e of ERAS) if (c >= e[0]) hit = e;
  if (!hit) return { en: 'before the Shang dynasty', zh: '商朝以前', key: 'pre' };
  if (hit[1] === '民國') return { en: `ROC year ${c - 1911}`, zh: `民國 ${c - 1911} 年`, key: 'roc' };
  return { en: hit[2], zh: hit[1], key: hit[1] };
}

// ---------------------------------------------------------------------------
// 星名：耶魯星表的 'Eps Eri' → ε Eridani／波江座 ε
const GREEK = { Alp: 'α', Bet: 'β', Gam: 'γ', Del: 'δ', Eps: 'ε', Zet: 'ζ', Eta: 'η', The: 'θ', Iot: 'ι', Kap: 'κ', Lam: 'λ', Mu: 'μ', Nu: 'ν', Xi: 'ξ', Omi: 'ο', Pi: 'π', Rho: 'ρ', Sig: 'σ', Tau: 'τ', Ups: 'υ', Phi: 'φ', Chi: 'χ', Psi: 'ψ', Ome: 'ω' };
export const CONS = {
  And: ['Andromedae', '仙女座'], Ant: ['Antliae', '唧筒座'], Aps: ['Apodis', '天燕座'], Aqr: ['Aquarii', '寶瓶座'], Aql: ['Aquilae', '天鷹座'],
  Ara: ['Arae', '天壇座'], Ari: ['Arietis', '白羊座'], Aur: ['Aurigae', '御夫座'], Boo: ['Bootis', '牧夫座'], Cae: ['Caeli', '雕具座'],
  Cam: ['Camelopardalis', '鹿豹座'], Cnc: ['Cancri', '巨蟹座'], CVn: ['Canum Venaticorum', '獵犬座'], CMa: ['Canis Majoris', '大犬座'],
  CMi: ['Canis Minoris', '小犬座'], Cap: ['Capricorni', '摩羯座'], Car: ['Carinae', '船底座'], Cas: ['Cassiopeiae', '仙后座'],
  Cen: ['Centauri', '半人馬座'], Cep: ['Cephei', '仙王座'], Cet: ['Ceti', '鯨魚座'], Cha: ['Chamaeleontis', '蝘蜓座'], Cir: ['Circini', '圓規座'],
  Col: ['Columbae', '天鴿座'], Com: ['Comae Berenices', '后髮座'], CrA: ['Coronae Australis', '南冕座'], CrB: ['Coronae Borealis', '北冕座'],
  Crv: ['Corvi', '烏鴉座'], Crt: ['Crateris', '巨爵座'], Cru: ['Crucis', '南十字座'], Cyg: ['Cygni', '天鵝座'], Del: ['Delphini', '海豚座'],
  Dor: ['Doradus', '劍魚座'], Dra: ['Draconis', '天龍座'], Equ: ['Equulei', '小馬座'], Eri: ['Eridani', '波江座'], For: ['Fornacis', '天爐座'],
  Gem: ['Geminorum', '雙子座'], Gru: ['Gruis', '天鶴座'], Her: ['Herculis', '武仙座'], Hor: ['Horologii', '時鐘座'], Hya: ['Hydrae', '長蛇座'],
  Hyi: ['Hydri', '水蛇座'], Ind: ['Indi', '印地安座'], Lac: ['Lacertae', '蝎虎座'], Leo: ['Leonis', '獅子座'], LMi: ['Leonis Minoris', '小獅座'],
  Lep: ['Leporis', '天兔座'], Lib: ['Librae', '天秤座'], Lup: ['Lupi', '豺狼座'], Lyn: ['Lyncis', '天貓座'], Lyr: ['Lyrae', '天琴座'],
  Men: ['Mensae', '山案座'], Mic: ['Microscopii', '顯微鏡座'], Mon: ['Monocerotis', '麒麟座'], Mus: ['Muscae', '蒼蠅座'], Nor: ['Normae', '矩尺座'],
  Oct: ['Octantis', '南極座'], Oph: ['Ophiuchi', '蛇夫座'], Ori: ['Orionis', '獵戶座'], Pav: ['Pavonis', '孔雀座'], Peg: ['Pegasi', '飛馬座'],
  Per: ['Persei', '英仙座'], Phe: ['Phoenicis', '鳳凰座'], Pic: ['Pictoris', '繪架座'], Psc: ['Piscium', '雙魚座'], PsA: ['Piscis Austrini', '南魚座'],
  Pup: ['Puppis', '船尾座'], Pyx: ['Pyxidis', '羅盤座'], Ret: ['Reticuli', '網罟座'], Sge: ['Sagittae', '天箭座'], Sgr: ['Sagittarii', '人馬座'],
  Sco: ['Scorpii', '天蠍座'], Scl: ['Sculptoris', '玉夫座'], Sct: ['Scuti', '盾牌座'], Ser: ['Serpentis', '巨蛇座'], Sex: ['Sextantis', '六分儀座'],
  Tau: ['Tauri', '金牛座'], Tel: ['Telescopii', '望遠鏡座'], Tri: ['Trianguli', '三角座'], TrA: ['Trianguli Australis', '南三角座'],
  Tuc: ['Tucanae', '杜鵑座'], UMa: ['Ursae Majoris', '大熊座'], UMi: ['Ursae Minoris', '小熊座'], Vel: ['Velorum', '船帆座'],
  Vir: ['Virginis', '室女座'], Vol: ['Volantis', '飛魚座'], Vul: ['Vulpeculae', '狐狸座'],
};
const SUP = { 1: '¹', 2: '²', 3: '³' };
/** 'Omi2 Eri' → { en: 'ο² Eridani', zh: '波江座 ο²', con: 'Eri' }；'70 Oph' → 70 Ophiuchi／蛇夫座 70。 */
export function fmtDesig(d) {
  if (!d) return null;
  const [a, con] = d.split(' ');
  const c = CONS[con];
  if (!c) return null;
  const m = /^([A-Z][a-z]{1,2})(\d?)$/.exec(a);
  const sym = m && GREEK[m[1]] ? GREEK[m[1]] + (SUP[m[2]] || '') : a;
  return { en: `${sym} ${c[0]}`, zh: `${c[1]} ${sym}`, con };
}
/** 某顆星的名字：有俗名用俗名，否則用拜耳／佛蘭斯蒂德名。 */
const NAME_BY_IDX = Object.fromEntries(Object.entries(NEAR_NAMED).map(([k, [i, en, zh]]) => [i, { key: k, en, zh }]));
export function starName(i) {
  if (NAME_BY_IDX[i]) return NAME_BY_IDX[i];
  const d = fmtDesig(NEAR_DESIG[i]);
  return d ? { key: null, en: d.en, zh: d.zh } : null;
}

/**
 * 生日星：光年數最接近 age（歲）的肉眼可見星（亮於 maxMag 等、距離誤差小於 5%、有名字、ok(s) 為真），由近到遠回傳前 n 顆。
 */
export function birthdayStars(age, n = 3, maxMag = 5.0, ok = () => true) {
  const out = [];
  for (let i = 0; i < N_NEAR; i++) {
    const s = nearStar(i), name = starName(i);
    if (s.mag > maxMag || !name || s.e / s.plx > 0.05 || !ok(s)) continue;
    out.push({ ...s, ...name, ly: lyOf(s.plx), off: Math.abs(lyOf(s.plx) - age) });
  }
  return out.sort((a, b) => a.off - b.off).slice(0, n).sort((a, b) => a.ly - b.ly);
}
