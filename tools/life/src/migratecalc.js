/*
 * 第十二課「候鳥怎麼認路？」的規則（life-migrate.js 與 test/migrate.test.mjs 共用）。
 * 候鳥不是只靠一種方法認路：太陽、星星、地球的磁場、記得住的地標，好幾種一起用。
 * 每一種線索都有用不上的時候（太陽要白天又沒雲、星星要晚上又沒雲、地標要看得到陸地），所以要有備用的。
 */
export const CUES = ['sun', 'stars', 'magnet', 'land'];
// 旅程 0–100（示意）：北方的陸地 → 海 → 台灣 → 海 → 南方的陸地
export const overLand = (j) => j <= 14 || (j >= 44 && j <= 56) || j >= 86;
// 這個時候，哪些線索「存在」
export function present({ day, clear, journey }) {
  return { sun: day && clear, stars: !day && clear, magnet: true, land: day && overLand(journey) };
}
// 鳥用得上的線索＝存在，而且這種感覺沒有被關掉
export function usable(cond, senses) {
  const p = present(cond);
  return CUES.filter((k) => p[k] && senses[k] !== false);
}
export const holding = (cond, senses) => {
  const n = usable(cond, senses).length;
  if (n === 0) return 'lost';
  if (n === 1) return 'one';
  return !cond.clear ? 'cloudy' : cond.day ? 'day' : 'night';
};
// 頁面小工具：這段路等於幾個台灣那麼長（台灣南北長約 394 公里）
export const TAIWAN_KM = 394;
export const taiwans = (km) => Math.round(km / TAIWAN_KM);
