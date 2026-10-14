/*
 * 台灣歷史 Taiwan's Story · 第三課「台灣的原住民族是誰？」（全部是 SVG，不需要 WebGL）
 *
 * 一、族群地圖 [data-twhpeoples-lab]：只畫海岸線，每一個法定原住民族一個名字標籤，放在原住民族委員會
 *     說明的「主要分布地區」附近——**標籤不是界線**，圖上不畫任何範圍或邊界。
 *     .twh-year-range        「官方名單」的年份滑桿：那一年已經被政府核定的族亮起來（其他的變淡，但不消失——
 *                            核定的年份是政府承認的時間，不是這個族出現的時間）
 *     [data-year="2001"]     直接跳到某一次名單改變的年份
 *     .twh-people[data-people]  點名字看卡片（原民會的族名與英文、主要分布、核定年份、人口、自己的起源說法）
 * 二、南島語族的世界 [data-twh-world]：以太平洋為中心的世界地圖（Natural Earth 1:110m，公有領域），
 *     幾個說南島語言的地方；點一個地方看說明，並自己算出它和台灣的距離（geo2d.js 的 distanceKm）。
 *
 * 產物：cd tools/twhist && npm run build → assets/js/twh-peoples.js
 * 除錯：document.querySelector('[data-twhpeoples-lab]').__lab
 *   setYear(y)、year()、select(key)、selected()、listed()（那一年已核定的族）、demo(...)、
 *   check()＝亮著的標籤＝資料裡那一年已核定的族，而且畫面上的數字＝亮著的個數
 * document.querySelector('[data-twh-world]').__world：pick(key)、distance(key)
 */
import coast from './data/coast.json' with { type: 'json' };
import world from './data/world.json' with { type: 'json' };
import { lazyBoot } from './common.js';
import { initEvidence } from './evidence2d.js';
import { distanceKm, makeProjection, ringPath } from './geo2d.js';
import { groupThousands } from './timeline.js';
import { initTimelines } from './timeline2d.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
const NS = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs = {}, html) => { const e = document.createElementNS(NS, tag); for (const k of Object.keys(attrs)) e.setAttribute(k, attrs[k]); if (html !== undefined) e.innerHTML = html; return e; };

/** 那一年已經核定的族（recognized 是核定的年份；同一年之內算已核定） */
export function listedBy(peoples, year) { return peoples.filter((p) => p.recognized <= year); }

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cfg = JSON.parse($('script.twh-lab-data').textContent);
  const peoples = cfg.peoples, byKey = Object.fromEntries(peoples.map((p) => [p.key, p]));
  const years = [...new Set(peoples.map((p) => p.recognized))].sort((a, b) => a - b);
  const R = { year: $('.twh-age'), count: $('.twh-count'), card: $('.twh-site-card'), range: $('.twh-year-range'), msg: $('.twh-msg') };
  const state = { year: cfg.start, sel: null };

  const W = 560, proj = makeProjection(coast.bbox, W, 26), H = Math.round(proj.height);
  const map = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'twh-map-svg', role: 'group', 'aria-label': 'Map of Taiwan with the names of the officially recognized Indigenous peoples placed near where each mainly lives; no borders are drawn · 台灣地圖：法定原住民族的名字放在各族主要分布地區附近，圖上不畫任何界線' });
  map.append(svg('g', { class: 'twh-land' }, coast.rings.map((r) => `<path d="${ringPath(r, proj)}"/>`).join('')));
  const px50 = 50 / proj.kmPerPx;
  map.append(svg('g', { class: 'twh-scalebar', transform: `translate(${W - 34 - px50}, ${H - 30})` }, `<path d="M0 0v6h${px50.toFixed(1)}v-6"/><text x="${(px50 / 2).toFixed(1)}" y="-4" text-anchor="middle">50 km · 50 公里</text>`));
  map.append(svg('g', { class: 'twh-north', transform: `translate(${W - 44}, 40)` }, '<path d="M0 -16L6 6L0 2L-6 6Z"/><text y="22" text-anchor="middle">N 北</text>'));
  const tags = svg('g', { class: 'twh-peoples' });
  peoples.forEach((p) => {
    const [x, y] = proj.xy(p.lon, p.lat), [dx, dy] = p.nudge || [0, 0];
    const tx = x + dx, ty = y + dy, anchor = dx < -4 ? 'end' : dx > 4 ? 'start' : 'middle', off = anchor === 'end' ? -7 : anchor === 'start' ? 7 : 0;
    const g = svg('g', { class: 'twh-people', 'data-people': p.key, tabindex: '0', role: 'button', 'aria-label': `${p.en} · ${p.zh}` });
    g.innerHTML = (dx || dy ? `<path class="twh-site-lead" d="M${x.toFixed(1)} ${y.toFixed(1)}L${tx.toFixed(1)} ${ty.toFixed(1)}"/>` : '')
      + `<circle class="twh-people-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`
      + `<text class="twh-people-t" x="${(tx + off).toFixed(1)}" y="${(ty - 1).toFixed(1)}" text-anchor="${anchor}">${esc(p.en)}<tspan class="zh" x="${(tx + off).toFixed(1)}" dy="13">${esc(p.zh)}</tspan></text>`;
    g.addEventListener('click', () => select(p.key));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(p.key); } });
    tags.append(g);
  });
  map.append(tags);
  $('.twh-map').append(map);

  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const listed = () => listedBy(peoples, state.year).map((p) => p.key);
  function card() {
    const p = byKey[state.sel];
    if (!p) { R.card.innerHTML = `<p class="twh-site-hint">${bi('Tap a name on the map to open its card.', '點地圖上的族名，打開那一族的卡片。')}</p>`; return; }
    const on = p.recognized <= state.year;
    R.card.innerHTML =
      `<p class="twh-site-k">${bi(p.recognized_en, p.recognized_zh)}</p>`
      + `<h3>${bi(p.en, p.zh)}</h3>`
      + (p.self_en ? `<p class="twh-site-tag">${bi(p.self_en, p.self_zh)}</p>` : '')
      + `<dl class="twh-people-dl"><dt>${bi('Mainly lives in', '主要分布')}</dt><dd>${bi(p.area_en, p.area_zh)}</dd>`
      + (p.pop ? `<dt>${bi('Population', '人口')}</dt><dd>${bi(`${groupThousands(p.pop)} (${cfg.pop_month_en})`, `${groupThousands(p.pop)} 人（${cfg.pop_month_zh}）`)}</dd>` : '')
      + `</dl>`
      + (p.origin_en ? `<p class="twh-site-found"><b>${bi('In their own telling', '他們自己的說法')}</b>${bi(p.origin_en, p.origin_zh)}</p>` : '')
      + (p.note_en ? `<p class="twh-site-tag">${bi(p.note_en, p.note_zh)}</p>` : '')
      + (on ? '' : `<p class="twh-people-not">${bi(`Not yet on the official list in ${state.year}. The people was here all along; only the government’s list changed.`, `${state.year} 年還不在官方名單上。這一族一直都在，改變的只是政府的名單。`)}</p>`)
      + `<a class="twh-site-src" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.src)} &#8599;</a>`;
  }
  function show() {
    const on = listed();
    R.year.innerHTML = bi(String(state.year), `${state.year} 年`);
    const pp = on.filter((k) => byKey[k].pingpu).length, main = on.length - pp;
    R.count.innerHTML = pp
      ? bi(`${main} recognized peoples, plus ${pp === 1 ? 'the Siraya' : `${pp} Pingpu peoples`}, approved under the Pingpu law.`, `${main} 個法定原住民族，加上依平埔原住民族群身分法核定的${pp === 1 ? '西拉雅族' : ` ${pp} 個平埔族群`}。`)
      : bi(`${on.length} peoples on the government’s list in this year.`, `這一年，政府的名單上有 ${on.length} 族。`);
    tags.querySelectorAll('.twh-people').forEach((g) => {
      const k = g.getAttribute('data-people');
      g.classList.toggle('is-lit', on.includes(k));
      g.classList.toggle('is-sel', k === state.sel);
      g.setAttribute('aria-pressed', String(k === state.sel));
    });
    if (document.activeElement !== R.range) R.range.value = String(state.year);
    R.range.style.setProperty('--p', `${((state.year - cfg.min) / (cfg.max - cfg.min)) * 100}%`);
    root.querySelectorAll('[data-year]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-year')) === state.year)));
    card();
  }
  function setYear(y, quiet) {
    state.year = Math.round(Math.min(cfg.max, Math.max(cfg.min, y)));
    show();
    if (quiet) return;
    const ch = cfg.changes.find((c) => c.year === state.year);
    if (ch) say(ch.en, ch.zh);
    else R.msg.innerHTML = R.count.innerHTML;
  }
  function select(key) { state.sel = byKey[key] ? key : null; show(); root.classList.remove('al-fresh'); }

  R.range.min = String(cfg.min); R.range.max = String(cfg.max);
  R.range.addEventListener('input', () => setYear(Number(R.range.value)));
  root.querySelectorAll('[data-year]').forEach((b) => b.addEventListener('click', () => setYear(Number(b.getAttribute('data-year')))));

  const DEMO = {};
  for (const [k, d] of Object.entries(cfg.demo)) DEMO[k] = () => { setYear(d.year); select(d.people); };

  setYear(cfg.start, true);
  say(cfg.hello_en, cfg.hello_zh);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, peoples, years, setYear, select, listed,
    year: () => state.year, selected: () => state.sel, demo: (v) => DEMO[v] && DEMO[v](),
    check: () => {
      const dom = [...tags.querySelectorAll('.twh-people.is-lit')].map((g) => g.getAttribute('data-people')).sort();
      const nums = (R.count.textContent.match(/\d+/g) || []).map(Number), pp = dom.filter((k) => byKey[k].pingpu).length;
      const n = pp ? nums[0] + pp : nums[0];
      return JSON.stringify(dom) === JSON.stringify(listed().sort()) && n === dom.length;
    },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

// ── 南島語族的世界 ──────────────────────────────────────────────────────
function initWorld(root) {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
  const places = cfg.places, home = places.find((p) => p.key === cfg.home);
  const W = 760, B = world.bbox;
  // 這麼大的範圍不做緯度修正：用等距圓柱（經緯度各一度一樣長），赤道附近變形最小
  const s = W / (B.e - B.w), H = Math.round((B.n - B.s) * s);
  const xy = (lon, lat) => [(lon - B.w) * s, (B.n - lat) * s];
  const path = (r) => r.map(([lo, la], i) => { const [x, y] = xy(lo, la); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join('') + 'Z';
  const host = root.querySelector('.twh-world-map');
  const m = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'twh-world-svg', role: 'group', 'aria-label': 'Map of the Indian and Pacific Oceans with places where Austronesian languages are spoken · 印度洋與太平洋的地圖，標出說南島語言的地方' });
  m.innerHTML = `<defs><clipPath id="twhw"><rect width="${W}" height="${H}"/></clipPath></defs>`
    + `<g clip-path="url(#twhw)"><g class="twh-world-land">${world.rings.map((r) => `<path d="${path(r)}"/>`).join('')}</g>`
    + `<path class="twh-world-eq" d="M0 ${xy(0, 0)[1].toFixed(1)}H${W}"/></g>`;
  const lines = svg('g', { class: 'twh-world-lines' }), dots = svg('g', { class: 'twh-world-dots' });
  m.append(lines, dots);
  places.forEach((p, i) => {
    const [x, y] = xy(p.lon, p.lat), [dx, dy] = p.nudge || [0, 14];
    const g = svg('g', { class: `twh-wp${p.key === cfg.home ? ' is-home' : ''}`, 'data-place': p.key, tabindex: '0', role: 'button', 'aria-label': `${p.en} · ${p.zh}` });
    g.innerHTML = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${p.key === cfg.home ? 7 : 5.5}"/>`
      + `<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${dx < 0 ? 'end' : dx > 0 ? 'start' : 'middle'}">${esc(p.en)}<tspan class="zh" dx="4">${esc(p.zh)}</tspan></text>`;
    g.addEventListener('click', () => pick(p.key));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(p.key); } });
    dots.append(g);
  });
  host.append(m);
  const out = root.querySelector('.twh-world-out');
  const distance = (key) => { const p = places.find((x) => x.key === key); return p ? distanceKm([home.lon, home.lat], [p.lon, p.lat]) : NaN; };
  function pick(key) {
    const p = places.find((x) => x.key === key); if (!p) return;
    dots.querySelectorAll('.twh-wp').forEach((g) => g.classList.toggle('is-on', g.getAttribute('data-place') === key));
    lines.innerHTML = '';
    let dist = '';
    if (key !== cfg.home) {
      const [x1, y1] = xy(home.lon, home.lat), [x2, y2] = xy(p.lon, p.lat);
      lines.innerHTML = `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      const km = Math.round(distance(key) / 100) * 100;
      dist = `<p class="twh-world-km">${bi(`About ${groupThousands(km)} km from Taiwan in a straight line (great-circle distance, worked out on this page).`, `和台灣的直線距離大約 ${groupThousands(km)} 公里（大圓距離，本頁自己算的）。`)}</p>`;
    }
    out.innerHTML = `<b>${bi(p.en, p.zh)}</b>${bi(p.text_en, p.text_zh)}${dist}`;
  }
  pick(cfg.start || cfg.home);
  root.__world = { pick, distance };
}

function init2D() {
  initTimelines(); initEvidence();
  const w = document.querySelector('[data-twh-world]'); if (w && !w.__world) initWorld(w);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-twhpeoples-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
