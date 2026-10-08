// 第一課：地球裡面有什麼？數字照中央氣象署地震百問第 2、3、24 題。
export const R = 6371;                                   // 地球半徑（公里）
// 深度（公里）：地殼平均厚 17；地函到 2900；外核厚約 2220；內核半徑 1251
export const LAYERS = [
  { key: 'crust', top: 0, bottom: 17 },
  { key: 'mantle', top: 17, bottom: 2900 },
  { key: 'outer', top: 2900, bottom: 5120 },
  { key: 'inner', top: 5120, bottom: 6371 },
];
export const layerAt = (d) => LAYERS.find((l) => d < l.bottom) || LAYERS[LAYERS.length - 1];
export const thickness = (key) => { const l = LAYERS.find((x) => x.key === key); return l.bottom - l.top; };
// 一層占地球體積的比例（球殼）
export function volFrac(key) {
  const l = LAYERS.find((x) => x.key === key), ro = R - l.top, ri = R - l.bottom;
  return (ro ** 3 - ri ** 3) / R ** 3;
}
export const pctToCenter = (d) => (d / R) * 100;
// 人類鑽過最深的洞：科拉超深鑽孔 12,262 公尺（維基百科 Kola Superdeep Borehole）
export const KOLA_KM = 12.262;
// 用固定的速度一路往下，每一層要走幾小時
export const travel = (kmh) => LAYERS.map((l) => ({ key: l.key, hours: (l.bottom - l.top) / kmh }));
export const totalHours = (kmh) => R / kmh;
// P 波陰影帶：離震央 103° 到 143° 之間收不到直接的 P 波（地震百問 24）
export const SHADOW = [103, 143];
export const rayKind = (deg) => (deg <= SHADOW[0] ? 'direct' : deg < SHADOW[1] ? 'shadow' : 'core');
