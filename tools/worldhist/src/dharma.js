/*
 * 世界歷史 第八課〈How Did Buddhism Begin and Travel? 佛教怎麼開始、怎麼傳出去？〉的純函式（node test/dharma.test.mjs）。
 *
 * 這一課的時間用「西元年」（負的是西元前），不用「距今幾年」；歷史地球儀（hglobe.js）的路線用的是距今，這裡負責換算。
 *   agoOf(year)                 西元年 → 距今幾年（以 2000 年為「今」，和 timeline.js 一樣）
 *   fmtYear(year)               { en: '250 BCE' | '105 CE', zh: '西元前 250 年' | '西元 105 年' }
 *   siteState(site, year)       'not'（還沒到）／'yes'（到了）
 *   reached(sites, year)        到這一年為止已經到了的地方
 *   toRoute(route)              JSON 的路線 { pts: [[lon, lat, year?, 'sea'?]…] } → spread.js 的 routePoints 要的格式（年代換成距今）
 *   matchOptions(n, i)          「同一個詞，三種語言」第 i 題的四個選項（固定的種子打亂，含正解）
 *   checkRoute(route, sites)    路線上有年代的轉折點不能倒退；如果轉折點標了 site，年代要和那個地方一致
 * 每一個地方都分清楚 tag：'tradition'（傳統上說）或 'evidence'（史料／考古顯示）。
 */
export const agoOf = (year) => 2000 - year;

export function fmtYear(year) {
  const y = Math.round(year);
  if (y < 0) return { en: `${-y} BCE`, zh: `西元前 ${-y} 年` };
  return { en: `${y} CE`, zh: `西元 ${y} 年` };
}

export const siteState = (site, year) => (year >= site.year ? 'yes' : 'not');
export const reached = (sites, year) => sites.filter((s) => siteState(s, year) === 'yes');

export function toRoute(route) {
  return { ...route, pts: route.pts.map((w) => {
    const out = [w[0], w[1], typeof w[2] === 'number' ? agoOf(w[2]) : null];
    if (w.includes('sea')) out.push('sea');
    return out;
  }) };
}

export function checkRoute(route, sites = []) {
  const years = route.pts.filter((w) => typeof w[2] === 'number').map((w) => w[2]);
  if (typeof route.pts[0][2] !== 'number' || typeof route.pts[route.pts.length - 1][2] !== 'number') return 'first and last waypoint need a year';
  for (let i = 1; i < years.length; i++) if (years[i] < years[i - 1]) return `year goes back at waypoint ${i}`;
  const by = Object.fromEntries(sites.map((s) => [s.key, s]));
  for (const w of route.pts) {
    const k = w.find((x) => typeof x === 'string' && x !== 'sea');
    if (k && by[k] && typeof w[2] === 'number' && w[2] !== by[k].year) return `waypoint ${k} year ${w[2]} ≠ site ${by[k].year}`;
  }
  return null;
}

/** 第 i 題的四個選項：正解加上三個別的詞（固定的種子）；回傳 item 的索引。 */
export function matchOptions(n, i, k = 4, seed = 11) {
  let a = (seed * 9301 + i * 49297) % 233280;
  const rnd = () => { a = (a * 9301 + 49297) % 233280; return a / 233280; };
  const others = [...Array(n).keys()].filter((j) => j !== i);
  for (let x = others.length - 1; x > 0; x--) { const y = Math.floor(rnd() * (x + 1)); [others[x], others[y]] = [others[y], others[x]]; }
  const opts = [i, ...others.slice(0, Math.min(k, n) - 1)];
  for (let x = opts.length - 1; x > 0; x--) { const y = Math.floor(rnd() * (x + 1)); [opts[x], opts[y]] = [opts[y], opts[x]]; }
  return opts;
}
