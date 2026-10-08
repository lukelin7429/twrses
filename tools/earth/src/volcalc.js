// 第五課：火山怎麼噴發？
// 兩個旋鈕：岩漿黏不黏（runny／sticky）、氣體多不多（low／high）→ 四種噴發的樣子（示例的分類，真實的火山是連續變化的）
export const STYLES = {
  'runny-low': 'flow',        // 稀、氣少：熔岩靜靜流出來
  'runny-high': 'fountain',   // 稀、氣多：熔岩噴泉
  'sticky-low': 'dome',       // 黏、氣少：慢慢擠出一團
  'sticky-high': 'blast',     // 黏、氣多：爆炸，火山灰柱
};
export const styleOf = (magma, gas) => STYLES[`${magma}-${gas}`];
export const explosive = (magma, gas) => styleOf(magma, gas) === 'blast';
// 壓力：地表 1 大氣壓；往下每 1 公里，上面的岩石多壓約 265 大氣壓（示例：岩石密度取水的 2.7 倍）
export const ATM_PER_KM = 265;
export const pressure = (km) => 1 + ATM_PER_KM * Math.max(0, km);
// 波以耳定律：同樣多的氣體，壓力變幾分之一，體積就變幾倍
export const expand = (fromKm, toKm = 0) => pressure(fromKm) / pressure(toKm);
export const radiusRatio = (fromKm, toKm = 0) => Math.cbrt(expand(fromKm, toKm));
// 模型裡壓力怎麼累積：每一輪從 0 升到 1 就噴發（示例）；黏的岩漿撐得比較久
export const CYCLE_S = { flow: 5, fountain: 6, dome: 9, blast: 12 };
