/*
 * 世界歷史 第十課〈How Did Christianity and Islam Begin and Spread? 基督宗教和伊斯蘭教怎麼開始、怎麼傳開？〉的純函式（node test/faith.test.mjs）。
 *
 * 時間和第八、九課一樣用西元年；換算沿用 dharma.js（agoOf、fmtYear、toRoute）。
 * 每一個地方有 faiths：['christian']、['islam']，或兩個都有（例如耶路撒冷、君士坦丁堡、科爾多瓦）；
 * 兩個都有的地方，year 是第一個宗教在卡片上的年代，year2 是第二個宗教的年代。
 *   FAITHS                         兩個宗教的 key（christian、islam）
 *   siteYear(site, faith)          這個地方在「只看某一個宗教」時亮起來的年代（'all' 用第一個年代）
 *   shows(site, faith)             這個地方在這個篩選下要不要出現（'all' 全部都出現）
 *   visible(sites, faith, year)    這一年、這個篩選下已經亮起來的地方
 *   routeOn(route, faith)          這條路線在這個篩選下要不要畫
 *   checkFaithRoute(route, sites)  轉折點的年代不倒退；標了地方的轉折點，年代要等於那個地方的 year 或 year2，宗教也要對
 *   checkSite(site)                faiths 合法、兩個宗教的地方要有 year2（而且比 year 晚）和 also_en／also_zh；錯了回傳字串
 */
export const FAITHS = ['christian', 'islam'];

export function siteYear(site, faith = 'all') {
  if (faith === 'all' || site.faiths[0] === faith) return site.year;
  return site.faiths.includes(faith) ? site.year2 : Infinity;
}

export const shows = (site, faith = 'all') => faith === 'all' || site.faiths.includes(faith);

export const visible = (sites, faith, year) => sites.filter((s) => shows(s, faith) && year >= siteYear(s, faith));

export const routeOn = (route, faith = 'all') => faith === 'all' || route.faith === faith;

export function checkSite(s) {
  if (!Array.isArray(s.faiths) || !s.faiths.length || s.faiths.some((f) => !FAITHS.includes(f))) return `${s.key}: bad faiths`;
  if (new Set(s.faiths).size !== s.faiths.length) return `${s.key}: repeated faith`;
  if (s.faiths.length === 2) {
    if (typeof s.year2 !== 'number' || s.year2 <= s.year) return `${s.key}: year2 must be after year`;
    if (!s.also_en || !s.also_zh) return `${s.key}: needs also_en and also_zh`;
  } else if (s.year2 != null) return `${s.key}: year2 only for places with both faiths`;
  return null;
}

export function checkFaithRoute(route, sites = []) {
  if (!FAITHS.includes(route.faith)) return `${route.key}: bad faith`;
  const timed = route.pts.filter((w) => typeof w[2] === 'number');
  if (typeof route.pts[0][2] !== 'number' || typeof route.pts[route.pts.length - 1][2] !== 'number') return `${route.key}: first and last waypoint need a year`;
  for (let i = 1; i < timed.length; i++) if (timed[i][2] < timed[i - 1][2]) return `${route.key}: year goes back at waypoint ${i}`;
  const by = Object.fromEntries(sites.map((s) => [s.key, s]));
  for (const w of route.pts) {
    const k = w.find((x) => typeof x === 'string' && x !== 'sea');
    if (!k) continue;
    const s = by[k];
    if (!s) return `${route.key}: unknown site ${k}`;
    if (!s.faiths.includes(route.faith)) return `${route.key}: ${k} has no ${route.faith}`;
    if (typeof w[2] === 'number' && w[2] !== siteYear(s, route.faith)) return `${route.key}: ${k} year ${w[2]} ≠ ${siteYear(s, route.faith)}`;
  }
  return null;
}
