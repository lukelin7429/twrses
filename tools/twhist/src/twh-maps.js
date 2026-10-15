/*
 * 台灣歷史 Taiwan's Story · 第四課「世界最早怎麼畫台灣？」（全部是 HTML／SVG，不需要 WebGL）
 *
 * 老地圖展示台 [data-twhmaps-lab]：一次看一張館藏的老地圖（影像都是館方明確開放授權的，存在
 * assets/img/taiwan-history/maps/，來源與授權寫在資料裡、也印在畫面上）。
 *   [data-map="k"] / .twh-prev / .twh-next   換一張（依年代排序）
 *   .twh-zoom-in / .twh-zoom-out / 拖曳       放大、移動影像（不改影像本身）
 *   .twh-hot[data-hot]                       影像上的重點（位置用百分比，跟著放大一起動）
 *   data-t="today"                           旁邊顯示今天的海岸線（Natural Earth），只是並排對照，
 *                                            **不把老地圖硬疊到今天的地圖上**——形狀不對正是這一課要看的
 * 右邊：這張地圖的卡片（誰畫的、哪一年、收藏在哪裡、館藏編號、授權、連結）＋直的時間軸。
 *
 * 產物：cd tools/twhist && npm run build → assets/js/twh-maps.js
 * 除錯：document.querySelector('[data-twhmaps-lab]').__lab
 *   show(key)、current()、zoom(f)、hot(key)、demo(...)、check()＝畫面上的影像、卡片、時間軸游標都是同一張地圖
 */
import coast from './data/coast.json' with { type: 'json' };
import { lazyBoot } from './common.js';
import { initEvidence } from './evidence2d.js';
import { makeProjection, ringPath } from './geo2d.js';
import { yearToAgo } from './timeline.js';
import { initTimelines, mountTimeline } from './timeline2d.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;

function todaySVG() {
  const W = 220, proj = makeProjection(coast.bbox, W, 10), H = Math.round(proj.height);
  return `<svg viewBox="0 0 ${W} ${H}" class="twh-today-svg" role="img" aria-label="Taiwan's coastline today (Natural Earth) · 今天的台灣海岸線（Natural Earth）"><g class="twh-land">${coast.rings.map((r) => `<path d="${ringPath(r, proj)}"/>`).join('')}</g></svg>`;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cfg = JSON.parse($('script.twh-lab-data').textContent);
  const maps = cfg.maps.slice().sort((a, b) => a.year - b.year), byKey = Object.fromEntries(maps.map((m) => [m.key, m]));
  const now = new Date().getFullYear();
  const R = { frame: $('.twh-mapframe'), img: $('.twh-mapimg'), hots: $('.twh-hots'), card: $('.twh-site-card'), year: $('.twh-age'), msg: $('.twh-msg'), today: $('.twh-today'), dots: $('.twh-mapdots') };
  const state = { key: maps[0].key, z: 1, x: 0, y: 0, hot: null };
  R.today.innerHTML = `<p class="al-sky-k">Today · 今天</p>${todaySVG()}<p class="twh-today-n">${bi('Coastline: Natural Earth, public domain', '海岸線：Natural Earth，公有領域')}</p>`;
  const tl = mountTimeline($('.twh-vtl'), { older: cfg.older, nearest: cfg.nearest, nearestLinear: cfg.nearest, kind: 'linear', vertical: true, controls: false, list: false,
    spans: maps.map((m) => ({ fromAgo: yearToAgo(m.year, now) + 1.5, toAgo: yearToAgo(m.year, now) - 1.5, cls: 'layer twh-tl-s1', en: '', zh: '' })) });
  maps.forEach((m, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'twh-mapdot'; b.setAttribute('data-map', m.key);
    b.innerHTML = `<b>${m.year}</b><small>${esc(m.short_en)}</small>`;
    b.setAttribute('aria-label', `${m.year}: ${m.en} · ${m.zh}`);
    b.addEventListener('click', () => show(m.key));
    R.dots.append(b);
  });
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  function place() {
    R.frame.style.setProperty('--z', state.z); R.frame.style.setProperty('--x', `${state.x}px`); R.frame.style.setProperty('--y', `${state.y}px`);
    $('.twh-zoom-out').disabled = state.z <= 1;
  }
  function hot(k) {
    const m = byKey[state.key], h = m.hots.find((x) => x.key === k); if (!h) return;
    state.hot = k;
    R.hots.querySelectorAll('.twh-hot').forEach((b) => b.classList.toggle('is-on', b.getAttribute('data-hot') === k));
    say(h.en, h.zh);
  }
  function show(key) {
    const m = byKey[key]; if (!m) return;
    state.key = key; state.z = 1; state.x = 0; state.y = 0; state.hot = null;
    R.img.src = m.img; R.img.alt = `${m.en} (${m.year}) · ${m.zh}`;
    R.img.style.aspectRatio = `${m.w} / ${m.h}`;
    R.hots.innerHTML = '';
    m.hots.forEach((h, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'twh-hot'; b.setAttribute('data-hot', h.key);
      b.style.left = `${h.x}%`; b.style.top = `${h.y}%`;
      b.innerHTML = `<i>${i + 1}</i>`; b.title = `${h.en}`;
      b.addEventListener('click', (e) => { e.stopPropagation(); hot(h.key); });
      R.hots.append(b);
    });
    R.year.innerHTML = bi(String(m.year_label_en || m.year), m.year_label_zh || `${m.year} 年`);
    R.card.innerHTML = `<h3>${bi(m.en, m.zh)}</h3>`
      + `<dl class="twh-people-dl"><dt>${bi('Made by', '繪製')}</dt><dd>${bi(m.maker_en, m.maker_zh)}</dd>`
      + `<dt>${bi('What to notice', '值得注意')}</dt><dd>${bi(m.notice_en, m.notice_zh)}</dd>`
      + `<dt>${bi('Kept at', '收藏')}</dt><dd>${bi(m.held_en, m.held_zh)}${m.id ? `<br><small>${esc(m.id)}</small>` : ''}</dd>`
      + `<dt>${bi('License', '授權')}</dt><dd>${esc(m.license)}</dd></dl>`
      + `<a class="twh-site-src" href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.src)} &#8599;</a>`;
    R.dots.querySelectorAll('.twh-mapdot').forEach((b) => { const on = b.getAttribute('data-map') === key; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    tl.setCursor(yearToAgo(m.year, now), { en: String(m.year), zh: `${m.year} 年` });
    const i = maps.indexOf(m);
    $('.twh-prev').disabled = i === 0; $('.twh-next').disabled = i === maps.length - 1;
    say(m.say_en, m.say_zh);
    place();
    root.classList.remove('al-fresh');
  }
  const step = (d) => { const i = maps.findIndex((m) => m.key === state.key) + d; if (maps[i]) show(maps[i].key); };
  $('.twh-prev').addEventListener('click', () => step(-1));
  $('.twh-next').addEventListener('click', () => step(1));
  const zoom = (f) => { state.z = Math.min(4, Math.max(1, state.z * f)); if (state.z === 1) { state.x = 0; state.y = 0; } place(); };
  $('.twh-zoom-in').addEventListener('click', () => zoom(1.5));
  $('.twh-zoom-out').addEventListener('click', () => zoom(1 / 1.5));
  let drag = null;
  R.frame.addEventListener('pointerdown', (e) => { if (state.z <= 1 || e.target.closest('button')) return; drag = { x: e.clientX, y: e.clientY, x0: state.x, y0: state.y }; R.frame.setPointerCapture(e.pointerId); });
  R.frame.addEventListener('pointermove', (e) => { if (!drag) return; state.x = drag.x0 + (e.clientX - drag.x); state.y = drag.y0 + (e.clientY - drag.y); place(); });
  const end = () => { drag = null; };
  R.frame.addEventListener('pointerup', end); R.frame.addEventListener('pointercancel', end);
  const tg = $('[data-t="today"]');
  if (tg) tg.addEventListener('change', () => root.classList.toggle('twh-no-today', !tg.checked));
  document.addEventListener('keydown', (e) => { if (!root.matches(':hover') && !root.contains(document.activeElement)) return; if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });

  const DEMO = {};
  for (const [k, d] of Object.entries(cfg.demo)) DEMO[k] = () => { show(d.map); if (d.hot) hot(d.hot); };
  show(maps[0].key);
  say(cfg.hello_en, cfg.hello_zh);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, maps, tl, show, hot, zoom, current: () => state.key, demo: (v) => DEMO[v] && DEMO[v](),
    check: () => {
      const m = byKey[state.key];
      return R.img.getAttribute('src') === m.img && R.card.textContent.includes(m.en) && Math.abs(tl.state().cursor - yearToAgo(m.year, now)) < 1e-6
        && R.hots.querySelectorAll('.twh-hot').length === m.hots.length;
    },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() { initTimelines(); initEvidence(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-twhmaps-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
