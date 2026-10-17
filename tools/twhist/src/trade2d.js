/*
 * 台灣歷史 Taiwan's Story · 第五課「貨物往哪裡去？」：季風帶著船走的貿易航路圖（SVG，不需要 WebGL）。
 *
 *   initTrade(el)  [data-twh-trade]  設定寫在 <script type="application/json">：
 *     bbox、places[]（key、en、zh、lon、lat、nudge）、
 *     routes[]（key、from、to、season：south｜north｜all、goods[]：{en, zh}、text_en/zh、src）、
 *     seasons[]（key、en、zh、note_en/zh）、start（一開始選哪一個季節）
 *   畫的是陸地的外形（Natural Earth 1:110m，公有領域）、地點和弧線；**弧線只表示「從哪裡到哪裡」，不是真正的航線**。
 *   沒有畫任何界線。地點離開地圖框的（波斯）畫在框邊，用箭頭表示「往這個方向」。
 * 除錯：el.__trade.season(key)／route(key)／shown()（現在畫出來的航路）
 */
import world from './data/world.json' with { type: 'json' };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
const NS = 'http://www.w3.org/2000/svg';

/** 這個季節要畫哪幾條航路（純函式，測試也用） */
export function routesIn(routes, season) {
  return routes.filter((r) => r.season === season || r.season === 'all');
}

export function initTrade(root) {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
  const B = cfg.bbox, W = 640;
  const k = Math.cos(((B.s + B.n) / 2) * Math.PI / 180), s = W / ((B.e - B.w) * k), H = Math.round((B.n - B.s) * s);
  const xy = (lon, lat) => [Math.min(W - 6, Math.max(6, (lon - B.w) * k * s)), (B.n - lat) * s];
  const ring = (r) => r.map(([lo, la], i) => `${i ? 'L' : 'M'}${((lo - B.w) * k * s).toFixed(1)} ${((B.n - la) * s).toFixed(1)}`).join('') + 'Z';
  const P = Object.fromEntries(cfg.places.map((p) => [p.key, p]));
  const host = root.querySelector('.twh-trade-map');
  const m = document.createElementNS(NS, 'svg');
  m.setAttribute('viewBox', `0 0 ${W} ${H}`); m.setAttribute('class', 'twh-trade-svg'); m.setAttribute('role', 'group');
  m.setAttribute('aria-label', 'Map of East and Southeast Asia with the trade routes through Tayouan · 東亞與東南亞的地圖，畫出經過大員的貿易航路');
  m.innerHTML = `<defs><clipPath id="twhtr"><rect width="${W}" height="${H}"/></clipPath>`
    + `<marker id="twhtr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z"/></marker></defs>`
    + `<g clip-path="url(#twhtr)"><g class="twh-world-land">${world.rings.map((r) => `<path d="${ring(r)}"/>`).join('')}</g></g>`
    + '<g class="twh-trade-lines"></g><g class="twh-trade-dots"></g>';
  host.append(m);
  const lines = m.querySelector('.twh-trade-lines'), dots = m.querySelector('.twh-trade-dots');
  cfg.places.forEach((p) => {
    const [x, y] = xy(p.lon, p.lat), [dx, dy] = p.nudge || [0, -10];
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', `twh-tp${p.key === 'tayouan' ? ' is-home' : ''}${p.off ? ' is-off' : ''}`);
    g.innerHTML = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${p.key === 'tayouan' ? 6.5 : 5}"/>`
      + `<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${dx < 0 ? 'end' : dx > 0 ? 'start' : 'middle'}">${esc(p.en)}<tspan class="zh" dx="3">${esc(p.zh)}</tspan></text>`;
    dots.append(g);
  });
  const arc = (r, i, n) => {
    const [x1, y1] = xy(P[r.from].lon, P[r.from].lat), [x2, y2] = xy(P[r.to].lon, P[r.to].lat);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const bend = 0.18 * len * (r.bend || 1) * (n > 1 ? (i % 2 ? -1 : 1) : 1);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${(mx - dy / len * bend).toFixed(1)} ${(my + dx / len * bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  const tabs = root.querySelector('.twh-trade-seasons'), list = root.querySelector('.twh-trade-list'), out = root.querySelector('.twh-trade-out');
  cfg.seasons.forEach((se) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'twh-btn-d'; b.setAttribute('data-season', se.key); b.setAttribute('aria-pressed', 'false');
    b.innerHTML = bi(se.en, se.zh);
    b.addEventListener('click', () => season(se.key));
    tabs.append(b);
  });
  const st = { season: null, route: null };
  function season(key) {
    const se = cfg.seasons.find((x) => x.key === key); if (!se) return;
    st.season = key;
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-season') === key)));
    const rs = routesIn(cfg.routes, key);
    lines.innerHTML = rs.map((r, i) => `<path class="twh-tr twh-tr-${r.season}" data-route="${r.key}" d="${arc(r, i, 1)}" marker-end="url(#twhtr-a)"/>`).join('');
    lines.querySelectorAll('path').forEach((p) => p.addEventListener('click', () => route(p.getAttribute('data-route'))));
    list.innerHTML = rs.map((r) => `<li><button type="button" class="twh-spot" data-route="${r.key}" aria-pressed="false"><span>${bi(`${P[r.from].en} → ${P[r.to].en}`, `${P[r.from].zh} → ${P[r.to].zh}`)}<small>${esc(r.goods.map((g) => g.en).join(', '))}</small></span></button></li>`).join('');
    list.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => route(b.getAttribute('data-route'))));
    out.innerHTML = `<p class="twh-trade-season">${bi(se.note_en, se.note_zh)}</p>`;
    st.route = null;
  }
  function route(key) {
    const r = cfg.routes.find((x) => x.key === key); if (!r) return;
    if (!routesIn(cfg.routes, st.season).includes(r)) season(r.season === 'all' ? st.season : r.season);
    st.route = key;
    lines.querySelectorAll('path').forEach((p) => p.classList.toggle('is-on', p.getAttribute('data-route') === key));
    list.querySelectorAll('button').forEach((b) => { const on = b.getAttribute('data-route') === key; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    out.innerHTML = `<b>${bi(`${P[r.from].en} → ${P[r.to].en}`, `${P[r.from].zh} → ${P[r.to].zh}`)}</b>`
      + `<ul class="twh-trade-goods">${r.goods.map((g) => `<li>${bi(g.en, g.zh)}</li>`).join('')}</ul>`
      + `<p>${bi(r.text_en, r.text_zh)}</p><p class="twh-trade-src">${esc(r.src)}</p>`;
  }
  season(cfg.start || cfg.seasons[0].key);
  root.__trade = { season, route, shown: () => [...lines.querySelectorAll('path')].map((p) => p.getAttribute('data-route')), state: st };
}

export function initTrades() {
  document.querySelectorAll('[data-twh-trade]').forEach((r) => { if (!r.__trade) initTrade(r); });
}
