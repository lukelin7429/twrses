/*
 * 台灣歷史 Taiwan's Story · 第二課「幾千年前，誰住在台灣？」
 *
 * 主角是一張遺址地圖（SVG，**不需要 WebGL**）：只畫海岸線與遺址點，不畫任何界線。
 *   .twh-time-range        時間滑桿（對數：3 萬年前 … 350 年前）；那個時候有文化層的遺址會亮起來
 *   [data-jump="20000"]    直接跳到某個時候
 *   .twh-site[data-site]   地圖上的遺址點（也可以用鍵盤 Enter／空白鍵）
 *   data-t="names"         地圖上的遺址名稱
 * 右邊：選到的遺址的卡片（在哪裡、每一個文化層的年代、出土了什麼、出處）＋直的時間軸
 *       （色帶＝這個遺址的每一個文化層；游標＝滑桿上的時間）。
 * 遺址點標的是文資局資料上的鄉鎮市區，不是確切的地點。年代不詳的遺址（萬山岩雕群）畫成虛線圈，永遠不會亮。
 *
 * 另外一段「看一件文物」：人獸形玉玦的 3D 示意（jade3d.js；這一段才用 WebGL，沒有 WebGL 時只剩文字說明）。
 * 小遊戲「這是哪一個時代的東西？」沿用 evidence2d.js 的 initSort。
 *
 * 產物：cd tools/twhist && npm run build → assets/js/twh-sites.js
 * 除錯：document.querySelector('[data-twhsites-lab]').__lab
 *   setAgo(n)、ago()、select(key)、selected()、lit()（亮著的遺址）、demo(...)、tl、proj、
 *   check()＝亮著的遺址＝資料裡那個時候有文化層的遺址，而且時間軸的游標＝滑桿上的時間
 * document.querySelector('[data-twh-jade]').__jade：spot(key)、ready()
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import coast from './data/coast.json' with { type: 'json' };
import { labeler, lazyBoot } from './common.js';
import { initEvidence } from './evidence2d.js';
import { activeAt, dated, layerAt, makeProjection, ringPath } from './geo2d.js';
import { makeJade } from './jade3d.js';
import { formatAgoEn, formatAgoZh, groupThousands, makeScale, zhCount } from './timeline.js';
import { initTimelines, mountTimeline } from './timeline2d.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
const NS = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs = {}, html) => { const e = document.createElementNS(NS, tag); for (const k of Object.keys(attrs)) e.setAttribute(k, attrs[k]); if (html !== undefined) e.innerHTML = html; return e; };

export function rangeEn(l) { return `about ${groupThousands(l.fromAgo)} to ${groupThousands(l.toAgo)} years ago`; }
export function rangeZh(l) { const b = zhCount(l.toAgo); return `約 ${zhCount(l.fromAgo)} 到 ${b}${b.endsWith('萬') ? '' : ' '}年前`; }

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cfg = JSON.parse($('script.twh-lab-data').textContent);
  const sites = cfg.sites, siteOf = Object.fromEntries(sites.map((s) => [s.key, s]));
  const slider = makeScale('log', cfg.older, cfg.nearest);
  const R = { age: $('.twh-age'), count: $('.twh-count'), card: $('.twh-site-card'), range: $('.twh-time-range'), msg: $('.twh-msg'), map: $('.twh-map') };
  const state = { ago: cfg.start, sel: null, names: true };

  // ── 地圖 ────────────────────────────────────────────────────────────
  const W = 560, proj = makeProjection(coast.bbox, W, 26);
  const H = Math.round(proj.height);
  const map = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'twh-map-svg', role: 'group', 'aria-label': 'Map of Taiwan showing only the coastline and eight archaeological sites · 台灣地圖：只畫海岸線與八個考古遺址' });
  map.append(svg('g', { class: 'twh-land' }, coast.rings.map((r) => `<path d="${ringPath(r, proj)}"/>`).join('')));
  // 比例尺（50 公里）與指北
  const px50 = 50 / proj.kmPerPx;
  map.append(svg('g', { class: 'twh-scalebar', transform: `translate(${W - 34 - px50}, ${H - 30})` },
    `<path d="M0 0v6h${px50.toFixed(1)}v-6"/><text x="${(px50 / 2).toFixed(1)}" y="-4" text-anchor="middle">50 km · 50 公里</text>`));
  map.append(svg('g', { class: 'twh-north', transform: `translate(${W - 44}, 40)` }, '<path d="M0 -16L6 6L0 2L-6 6Z"/><text y="22" text-anchor="middle">N 北</text>'));
  const pins = svg('g', { class: 'twh-sites' });
  sites.forEach((s, i) => {
    const [x, y] = proj.xy(s.lon, s.lat), [dx, dy] = s.nudge || [0, 0];
    const g = svg('g', { class: `twh-site${dated(s).length ? '' : ' is-unknown'}`, 'data-site': s.key, tabindex: '0', role: 'button', 'aria-label': `${s.en} · ${s.zh}` });
    const side = dx < 0 ? 'end' : 'start', lx = x + dx + (dx < 0 ? -17 : 17);
    g.innerHTML = (dx || dy ? `<path class="twh-site-lead" d="M${x.toFixed(1)} ${y.toFixed(1)}L${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}"/><circle class="twh-site-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>` : '')
      + `<circle class="twh-site-halo" cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="20"/>`
      + `<circle class="twh-site-c" cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="12.5"/>`
      + `<text class="twh-site-n" x="${(x + dx).toFixed(1)}" y="${(y + dy + 4.6).toFixed(1)}" text-anchor="middle">${i + 1}</text>`
      + `<text class="twh-site-t" x="${lx.toFixed(1)}" y="${(y + dy - 1).toFixed(1)}" text-anchor="${side}">${esc(s.short_en)}<tspan class="zh" x="${lx.toFixed(1)}" dy="13">${esc(s.short_zh)}</tspan></text>`;
    g.addEventListener('click', () => select(s.key));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(s.key); } });
    pins.append(g);
  });
  map.append(pins);
  R.map.append(map);

  // ── 右邊：直的時間軸 ────────────────────────────────────────────────
  const tl = mountTimeline($('.twh-vtl'), { older: cfg.older, nearest: cfg.nearest, kind: 'log', vertical: true, controls: false, list: false, spans: [] });

  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const lit = () => sites.filter((s) => activeAt(s, state.ago)).map((s) => s.key);

  function card() {
    const s = siteOf[state.sel];
    if (!s) { R.card.innerHTML = `<p class="twh-site-hint">${bi('Tap a numbered dot on the map to open its card.', '點地圖上有數字的圓點，打開那個遺址的卡片。')}</p>`; tl.setSpans([]); return; }
    const now = layerAt(s, state.ago);
    const rows = s.layers.map((l, i) => {
      const on = now.includes(l), has = l.fromAgo !== undefined;
      return `<li class="${on ? 'is-on' : ''}${l.rep ? ' is-rep' : ''}"><i style="--c:var(--twh-s${(i % 6) + 1})"></i><span><b>${bi(l.en, l.zh)}</b>${has ? bi(rangeEn(l), rangeZh(l)) : bi(l.note_en, l.note_zh)}</span></li>`;
    }).join('');
    R.card.innerHTML =
      `<p class="twh-site-k">${sites.indexOf(s) + 1} · ${bi(s.where_en, s.where_zh)}</p>`
      + `<h3>${bi(s.en, s.zh)}</h3>`
      + `<p class="twh-site-tag">${bi(s.tag_en, s.tag_zh)}</p>`
      + `<p class="twh-site-lk">${bi('Layers at this site, as listed by the Bureau of Cultural Heritage', '這個遺址的文化層（依文化資產局的資料）')}</p><ul class="twh-site-layers">${rows}</ul>`
      + `<p class="twh-site-found"><b>${bi('What was found', '出土了什麼')}</b>${bi(s.found_en, s.found_zh)}</p>`
      + `<a class="twh-site-src" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.src)} &#8599;</a>`;
    tl.setSpans(dated(s).map((l) => ({ fromAgo: l.fromAgo, toAgo: Math.max(cfg.nearest, l.toAgo), cls: `layer twh-tl-s${(s.layers.indexOf(l) % 6) + 1}`, en: '', zh: '' })));
  }
  function show() {
    const on = lit();
    R.age.innerHTML = bi(formatAgoEn(state.ago), formatAgoZh(state.ago));
    R.count.innerHTML = bi(`${on.length} of ${sites.length} sites on this map have a layer from this time.`, `這張地圖上的 ${sites.length} 個遺址裡，有 ${on.length} 個有這個時候的文化層。`);
    pins.querySelectorAll('.twh-site').forEach((g) => {
      const k = g.getAttribute('data-site');
      g.classList.toggle('is-lit', on.includes(k));
      g.classList.toggle('is-sel', k === state.sel);
      g.setAttribute('aria-pressed', String(k === state.sel));
    });
    root.classList.toggle('twh-no-names', !state.names);
    tl.setCursor(state.ago, { en: formatAgoEn(state.ago).replace('about ', '≈ '), zh: formatAgoZh(state.ago).replace('約 ', '≈ ') });
    if (document.activeElement !== R.range) R.range.value = String(Math.round(slider.pos(state.ago) * 1000));
    R.range.style.setProperty('--p', `${slider.pos(state.ago) * 100}%`);
    root.querySelectorAll('[data-jump]').forEach((b) => b.setAttribute('aria-pressed', String(Math.abs(Number(b.getAttribute('data-jump')) - state.ago) < 1)));
    card();
  }
  function setAgo(a, quiet) {
    state.ago = Math.min(cfg.older, Math.max(cfg.nearest, a));
    show();
    if (!quiet) {
      const names = lit().map((k) => siteOf[k]);
      if (!names.length) say('None of these eight sites has a dated layer from this time. That does not mean nobody lived in Taiwan then: it means these sites have no layer from then, or none has been found.', '這八個遺址都沒有這個時候的、有年代的文化層。這不代表當時台灣沒有人——只代表這幾個遺址沒有那時候的地層，或還沒找到。');
      else say(`Lit up now: ${names.map((s) => s.short_en).join(', ')}.`, `現在亮著的：${names.map((s) => s.short_zh).join('、')}。`);
    }
  }
  function select(key) {
    state.sel = siteOf[key] ? key : null;
    show();
    const s = siteOf[state.sel];
    if (s && !dated(s).length) say(s.unknown_en, s.unknown_zh);
    root.classList.remove('al-fresh');
  }

  R.range.addEventListener('input', () => setAgo(slider.ago(Number(R.range.value) / 1000)));
  root.querySelectorAll('[data-jump]').forEach((b) => b.addEventListener('click', () => setAgo(Number(b.getAttribute('data-jump')))));
  const tgN = $('[data-t="names"]');
  if (tgN) tgN.addEventListener('change', () => { state.names = tgN.checked; show(); });

  const DEMO = {
    oldest() { setAgo(20000, true); select(cfg.demo.oldest); say(cfg.demo_say.oldest_en, cfg.demo_say.oldest_zh); },
    pottery() { setAgo(5000, true); select(cfg.demo.pottery); say(cfg.demo_say.pottery_en, cfg.demo_say.pottery_zh); },
    village() { setAgo(3000, true); select(cfg.demo.village); say(cfg.demo_say.village_en, cfg.demo_say.village_zh); },
    iron() { setAgo(1000, true); select(cfg.demo.iron); say(cfg.demo_say.iron_en, cfg.demo_say.iron_zh); },
  };

  setAgo(cfg.start, true);
  say('Drag the slider through time and watch which sites light up. Tap a dot to read about that site.', '拖動滑桿走過時間，看哪些遺址亮起來。點一個圓點，讀那個遺址的介紹。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, tl, proj, sites, setAgo, select, lit,
    ago: () => state.ago, selected: () => state.sel,
    demo: (v) => DEMO[v] && DEMO[v](),
    check: () => {
      const dom = [...pins.querySelectorAll('.twh-site.is-lit')].map((g) => g.getAttribute('data-site')).sort();
      const want = sites.filter((s) => activeAt(s, state.ago)).map((s) => s.key).sort();
      const c = tl.state().cursor;
      return JSON.stringify(dom) === JSON.stringify(want) && Math.abs(c - state.ago) <= 1e-6 * state.ago;
    },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

// ── 看一件文物：人獸形玉玦（3D 示意）──────────────────────────────────────
function initJade(root) {
  const cfg = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
  const stage = root.querySelector('.twh-jade-stage'), cv = root.querySelector('canvas'), out = root.querySelector('.twh-jade-out');
  const btns = [...root.querySelectorAll('[data-spot]')];
  let view = null, sel = null;
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene(); scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(30, 1, 0.1, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.minDistance = 6; controls.maxDistance = 40; controls.enablePan = false;
    scene.add(new HemisphereLight(0xeaf2ff, 0x1a2a20, 1.1)); scene.add(new AmbientLight(0xffffff, 0.3));
    const key = new DirectionalLight(0xffffff, 2.0); key.position.set(-3, 5, 12); scene.add(key);
    const rim = new DirectionalLight(0x9fe0b8, 0.9); rim.position.set(-6, 2, -8); scene.add(rim);
    const jade = makeJade(); scene.add(jade.group);
    const lab = labeler(root.querySelector('.al-labels'), cv, camera);
    const marks = Object.fromEntries(cfg.spots.map((s, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'al-lab twh-pin'; b.tabIndex = -1; b.innerHTML = `<i>${i + 1}</i>`; b.title = `${s.en} · ${s.zh}`;
      b.addEventListener('click', () => spot(s.key));
      root.querySelector('.al-labels').append(b);
      return [s.key, b];
    }));
    const tmp = new Vector3();
    const home = () => {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      const d = Math.max(9.6 / 2 / Math.tan(vf), 8.2 / 2 / Math.tan(hf));
      camera.position.set(d * 0.2, d * 0.06, d * 0.98).add(controls.target.set(0.35, 0, 0)); controls.update();
    };
    function render() {
      controls.update();
      for (const s of cfg.spots) { lab.place(marks[s.key], tmp.copy(jade.spots[s.key])); marks[s.key].classList.toggle('is-on', s.key === sel); }
      renderer.render(scene, camera);
    }
    let band0 = -1;
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      const band = camera.aspect < 0.9 ? 0 : 1; if (band !== band0) { band0 = band; home(); }
    }
    root.querySelector('.al-home').addEventListener('click', home);
    new ResizeObserver(resize).observe(stage); resize();
    return { render, jade, camera, controls };
  }
  function spot(key) {
    const s = cfg.spots.find((x) => x.key === key); if (!s) return;
    sel = key;
    btns.forEach((b) => { const on = b.getAttribute('data-spot') === key; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    out.innerHTML = `<b>${bi(s.en, s.zh)}</b>${bi(s.text_en, s.text_zh)}`;
  }
  btns.forEach((b) => b.addEventListener('click', () => spot(b.getAttribute('data-spot'))));
  let raf = 0, visible = false, booted = false;
  const loop = () => { raf = 0; if (!visible) return; if (view) view.render(); raf = requestAnimationFrame(loop); };
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !booted) { booted = true; view = make3D(); if (!view) root.classList.add('twh-jade-nogl'); }
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }, { rootMargin: '300px' }).observe(root);
  spot(cfg.spots[0].key);
  root.__jade = { spot, selected: () => sel, ready: () => booted, gl: () => !!view, render: () => view && view.render() };
}

function init2D() {
  initTimelines(); initEvidence();
  const j = document.querySelector('[data-twh-jade]'); if (j && !j.__jade) initJade(j);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-twhsites-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
