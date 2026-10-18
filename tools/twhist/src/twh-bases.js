/*
 * 台灣歷史 Taiwan's Story · 第六課「西班牙人在北部留下了什麼？」
 *
 * 主角是一張據點地圖（SVG，**不需要 WebGL**）：只畫海岸線、三個據點和幾個族群的名字，不畫任何界線。
 *   .twh-year-range       年份滑桿（1624–1668）；每個據點的圓點依那一年由誰駐守變色（西班牙／荷蘭／沒有人駐守）
 *   [data-year="1626"]    直接跳到某一年
 *   .twh-base[data-base]  地圖上的據點（也可以用鍵盤 Enter／空白鍵）
 *   data-t="peoples"      地圖上的族群名字（標的是名字，不是界線；永遠都在，不隨年份變）
 * 右邊：選到的據點的卡片（那一年叫什麼、誰在那裡、前後的變化、今天留下了什麼、出處）＋直的時間軸
 *       （色帶＝這個據點每一段由誰駐守；游標＝滑桿上的年份）。
 * 小遊戲「挖到了、還在，還是失傳了？」沿用 evidence2d.js 的 initSort。
 *
 * 產物：cd tools/twhist && npm run build → assets/js/twh-bases.js
 * 除錯：document.querySelector('[data-twhbases-lab]').__lab
 *   setYear(y)、year()、select(key)、holder(key, y)、demo(...)、check()＝每個圓點的顏色＝資料裡那一年的駐守者，而且時間軸游標＝滑桿上的年份
 */
import coast from './data/coast.json' with { type: 'json' };
import { lazyBoot } from './common.js';
import { initEvidence } from './evidence2d.js';
import { makeProjection, ringPath } from './geo2d.js';
import { yearToAgo } from './timeline.js';
import { initTimelines, mountTimeline } from './timeline2d.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
const NS = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs = {}, html) => { const e = document.createElementNS(NS, tag); for (const k of Object.keys(attrs)) e.setAttribute(k, attrs[k]); if (html !== undefined) e.innerHTML = html; return e; };

/** 這個據點在 y 年由誰駐守（held[]：{ from, to, who }；from 年起、到 to 年為止都算；換手的那一年算新的一方）；沒有人駐守回傳 null */
export function heldAt(base, y) {
  const hs = base.held.filter((x) => y >= x.from && y <= x.to);
  return hs.length ? hs[hs.length - 1] : null;
}
export function holderAt(base, y) { const h = heldAt(base, y); return h ? h.who : null; }

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cfg = JSON.parse($('script.twh-lab-data').textContent);
  const bases = cfg.bases, baseOf = Object.fromEntries(bases.map((b) => [b.key, b]));
  const WHO = cfg.who;   // { es: { en, zh }, nl: {…}, none: {…} }
  const now = new Date().getFullYear();
  const R = { age: $('.twh-age'), count: $('.twh-count'), card: $('.twh-site-card'), range: $('.twh-year-range'), msg: $('.twh-msg'), map: $('.twh-map') };
  const state = { year: cfg.start, sel: cfg.start_base, peoples: true };

  // ── 地圖 ────────────────────────────────────────────────────────────
  const W = 560, proj = makeProjection(coast.bbox, W, 26);
  const H = Math.round(proj.height);
  const map = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'twh-map-svg', role: 'group', 'aria-label': 'Map of Taiwan showing only the coastline, three forts, and the names of some Indigenous peoples · 台灣地圖：只畫海岸線、三個據點和幾個原住民族群的名字' });
  map.append(svg('g', { class: 'twh-land' }, coast.rings.map((r) => `<path d="${ringPath(r, proj)}"/>`).join('')));
  const px50 = 50 / proj.kmPerPx;
  map.append(svg('g', { class: 'twh-scalebar', transform: `translate(${W - 34 - px50}, ${H - 30})` },
    `<path d="M0 0v6h${px50.toFixed(1)}v-6"/><text x="${(px50 / 2).toFixed(1)}" y="-4" text-anchor="middle">50 km · 50 公里</text>`));
  map.append(svg('g', { class: 'twh-north', transform: `translate(${W - 44}, 150)` }, '<path d="M0 -16L6 6L0 2L-6 6Z"/><text y="22" text-anchor="middle">N 北</text>'));
  const ppl = svg('g', { class: 'twh-ppl' });
  cfg.peoples.forEach((p) => {
    const [x, y] = proj.xy(p.lon, p.lat);
    ppl.append(svg('text', { x: x.toFixed(1), y: y.toFixed(1), 'text-anchor': p.anchor || 'middle' }, `${esc(p.en)}<tspan class="zh" x="${x.toFixed(1)}" dy="13">${esc(p.zh)}</tspan>`));
  });
  map.append(ppl);
  const pins = svg('g', { class: 'twh-sites' });
  bases.forEach((b, i) => {
    const [x, y] = proj.xy(b.lon, b.lat), [dx, dy] = b.nudge || [0, 0];
    const g = svg('g', { class: 'twh-site twh-base', 'data-base': b.key, tabindex: '0', role: 'button', 'aria-label': `${b.en} · ${b.zh}` });
    const side = dx < 0 ? 'end' : 'start', lx = x + dx + (dx < 0 ? -17 : 17);
    g.innerHTML = (dx || dy ? `<path class="twh-site-lead" d="M${x.toFixed(1)} ${y.toFixed(1)}L${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}"/><circle class="twh-site-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>` : '')
      + `<circle class="twh-site-halo" cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="20"/>`
      + `<circle class="twh-site-c" cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="12.5"/>`
      + `<text class="twh-site-n" x="${(x + dx).toFixed(1)}" y="${(y + dy + 4.6).toFixed(1)}" text-anchor="middle">${i + 1}</text>`
      + `<text class="twh-site-t" x="${lx.toFixed(1)}" y="${(y + dy - 1).toFixed(1)}" text-anchor="${side}">${esc(b.short_en)}<tspan class="zh" x="${lx.toFixed(1)}" dy="13">${esc(b.short_zh)}</tspan></text>`;
    g.addEventListener('click', () => select(b.key));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(b.key); } });
    pins.append(g);
  });
  map.append(pins);
  R.map.append(map);

  // ── 右邊：直的時間軸 ────────────────────────────────────────────────
  const tl = mountTimeline($('.twh-vtl'), { older: cfg.older, nearest: cfg.nearest, nearestLinear: cfg.nearest, kind: 'linear', vertical: true, controls: false, list: false, spans: [] });
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };

  function card() {
    const b = baseOf[state.sel];
    if (!b) { R.card.innerHTML = `<p class="twh-site-hint">${bi('Tap a numbered dot on the map to open its card.', '點地圖上有數字的圓點，打開那個據點的卡片。')}</p>`; tl.setSpans([]); return; }
    const h = heldAt(b, state.year), who = h ? h.who : null;
    const rows = b.held.map((x) => `<li class="${x === h ? 'is-on' : ''}"><i class="twh-who-${x.who}"></i><span><b>${x.from}–${x.to} · ${bi(WHO[x.who].en, WHO[x.who].zh)}</b>${bi(x.name_en, x.name_zh)}</span></li>`).join('');
    R.card.innerHTML =
      `<p class="twh-site-k">${bases.indexOf(b) + 1} · ${bi(b.where_en, b.where_zh)}</p>`
      + `<h3>${bi(b.en, b.zh)}</h3>`
      + `<p class="twh-site-tag">${who ? bi(`In ${state.year}: ${WHO[who].en}`, `${state.year} 年：${WHO[who].zh}`) : bi(`In ${state.year}: ${b.none_en}`, `${state.year} 年：${b.none_zh}`)}</p>`
      + `<ul class="twh-site-layers">${rows}</ul>`
      + `<p class="twh-site-found"><b>${bi('What is left today', '今天留下了什麼')}</b>${bi(b.today_en, b.today_zh)}</p>`
      + `<a class="twh-site-src" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.src)} &#8599;</a>`;
    tl.setSpans(b.held.map((x) => ({ fromAgo: yearToAgo(x.from, now) + 0.5, toAgo: yearToAgo(x.to, now) - 0.5, cls: `layer twh-tl-${x.who}`, en: '', zh: '' })));
  }
  function show() {
    const y = state.year;
    R.age.innerHTML = bi(String(y), `${y} 年`);
    const es = bases.filter((b) => holderAt(b, y) === 'es').length, nl = bases.filter((b) => holderAt(b, y) === 'nl').length;
    R.count.innerHTML = bi(`Forts held by the Spanish: ${es}; by the Dutch: ${nl}.`, `西班牙人駐守的據點：${es} 個；荷蘭人：${nl} 個。`);
    pins.querySelectorAll('.twh-base').forEach((g) => {
      const k = g.getAttribute('data-base'), who = holderAt(baseOf[k], y) || 'none';
      g.setAttribute('data-who', who);
      g.classList.toggle('is-sel', k === state.sel);
      g.setAttribute('aria-pressed', String(k === state.sel));
    });
    root.classList.toggle('twh-no-ppl', !state.peoples);
    tl.setCursor(yearToAgo(y, now), { en: String(y), zh: `${y} 年` });
    if (document.activeElement !== R.range) R.range.value = String(y);
    R.range.style.setProperty('--p', `${((y - cfg.from) / (cfg.to - cfg.from)) * 100}%`);
    root.querySelectorAll('[data-year]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-year')) === y)));
    card();
  }
  function setYear(y, quiet) {
    state.year = Math.round(Math.min(cfg.to, Math.max(cfg.from, y)));
    show();
    if (!quiet) {
      const ev = cfg.years.find((x) => x.year === state.year);
      if (ev) say(ev.en, ev.zh);
    }
  }
  function select(key) {
    if (!baseOf[key]) return;
    state.sel = key; show();
    root.classList.remove('al-fresh');
  }
  R.range.min = String(cfg.from); R.range.max = String(cfg.to);
  R.range.addEventListener('input', () => setYear(Number(R.range.value)));
  root.querySelectorAll('[data-year]').forEach((b) => b.addEventListener('click', () => setYear(Number(b.getAttribute('data-year')))));
  const tg = $('[data-t="peoples"]');
  if (tg) tg.addEventListener('change', () => { state.peoples = tg.checked; show(); });

  const DEMO = {};
  for (const [k, d] of Object.entries(cfg.demo)) DEMO[k] = () => { select(d.base); setYear(d.year); };

  setYear(cfg.start, true);
  say(cfg.hello_en, cfg.hello_zh);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, tl, bases, setYear, select, year: () => state.year, holder: (k, y) => holderAt(baseOf[k], y ?? state.year), demo: (v) => DEMO[v] && DEMO[v](),
    check: () => {
      const okDots = [...pins.querySelectorAll('.twh-base')].every((g) => g.getAttribute('data-who') === (holderAt(baseOf[g.getAttribute('data-base')], state.year) || 'none'));
      return okDots && Math.abs(tl.state().cursor - yearToAgo(state.year, now)) < 1e-6;
    },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() { initTimelines(); initEvidence(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-twhbases-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
