/*
 * 世界歷史 第八課〈How Did Buddhism Begin and Travel? 佛教怎麼開始、怎麼傳出去？〉
 * 歷史地球儀：拉時間滑桿（西元前 500 年到西元 1000 年左右），佛教傳播的路線從印度北部長出去——
 * 往南走海路（斯里蘭卡、東南亞），往北、往東走陸路（中亞、中國、朝鮮半島、日本），後來也到西藏。
 * 點路上的地方看小卡：每一個年代都標明是「傳統上說」還是「史料／考古顯示」。路線只表示大致的方向與先後。
 *
 * 資料在 data/world_history.json 的 lab（from、to、start、routes[]、sites[]）：
 *   routes[] { key, kind: 'land'|'sea'|'north', pts: [[lon, lat, year?, siteKey?, 'sea'?]…] }
 *   sites[]  { key, en, zh, at, year, tag: 'tradition'|'evidence', what_en/zh, when_en/zh, how_en/zh, src, url }
 * 除錯：document.querySelector('[data-wh-dharma-lab]').__lab
 *   state、setYear(y)、play(bool)、select(key|null)、look(lon, lat, dist)、demo(...)、info()、render()
 */
import { PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, esc, bi, readJson } from './common.js';
import { getLand } from './land.js';
import { makeHGlobe } from './hglobe.js';
import { toVec, toLonLat, angle, frontAt } from './sphere.js';
import { routePoints } from './spread.js';
import { agoOf, fmtYear, siteState, reached, toRoute } from './dharma.js';
import './timeline2d.js';
import './sort2d.js';
import './match2d.js';

const ROUTE_STYLE = {
  land: { color: '#ffd36e', dash: false, width: 0.0095 },
  sea: { color: '#7fe3ff', dash: false, width: 0.0095 },
  north: { color: '#ffb48a', dash: true, width: 0.0085 },
};
const HOME = { at: [92, 26], dist: 3.3 };
const TAG = { tradition: ['Tradition says', '傳統上說'], evidence: ['Evidence shows', '史料／考古顯示'] };

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), slider = $('.wh-time'), playBtn = $('.al-play');
  const state = { year: data.start ?? data.from, playing: false, site: null };
  const routes = data.routes.map((r) => ({ ...r, timed: routePoints(toRoute(r), 0.8) }));
  const siteBtns = [...root.querySelectorAll('[data-site]')];
  const card = $('.wh-site');
  const SPAN = 40, span = data.to - data.from;
  let raf = 0, last = 0, idle = 0, visible = true;

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 50);
    const globe = makeHGlobe({ land: getLand(), texWidth: small ? 2048 : 4096 });
    scene.add(globe.group);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12;
    controls.minDistance = 1.5; controls.maxDistance = 6; controls.zoomSpeed = 0.7;
    const labs = labeler($('.al-labels'), cv, camera);
    for (const r of routes) globe.addRoute({ key: r.key, pts: r.timed, ...(ROUTE_STYLE[r.kind] || ROUTE_STYLE.land) });
    for (const s of data.sites) globe.addDot({ key: s.key, at: s.at, color: s.tag === 'tradition' ? '#ffd9a3' : '#ffffff', r: 0.0105 });
    const siteLabs = data.sites.map((s) => ({ s, el: labs.add(`wh-lab wh-lab-dh${s.tag === 'tradition' ? ' is-trad' : ''}`, `${esc(s.short_en || s.en)}<i>${esc(s.short_zh || s.zh)}</i>`) }));
    const want = { dir: new Vector3(), dist: HOME.dist, on: false }, lookDir = new Vector3();
    const setCam = (at, dist) => { camera.position.fromArray(toVec(at, dist)); camera.lookAt(0, 0, 0); controls.update(); };
    function resize() {
      const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 0.9 ? 40 : 34; camera.updateProjectionMatrix();
    }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    let userAt = 0;
    controls.addEventListener('start', () => { userAt = performance.now(); want.on = false; });
    controls.addEventListener('change', () => kick());
    const ray = new Raycaster(), ndc = new Vector2(); let down = null;
    cv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1));
      ray.setFromCamera(ndc, camera);
      const p = globe.pick(ray); if (!p) return;
      let best = null, bd = Math.max(1.2, camera.position.length() * 1.2);
      for (const s of reached(data.sites, state.year)) { const d = angle(p, s.at); if (d < bd) { bd = d; best = s; } }
      select(best ? best.key : null);
    });
    view = { renderer, scene, camera, globe, controls, labs, siteLabs, want, lookDir, setCam, get userAt() { return userAt; } };
    resize();
    setCam(HOME.at, camera.aspect < 1 ? HOME.dist * Math.min(1.5, 1 / camera.aspect) * 0.92 : HOME.dist);
  } catch (e) { view = null; if (window.console) console.warn('World History Buddhism globe: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  const fit = (dist) => (view && view.camera.aspect < 1 ? dist * Math.min(1.5, 1 / view.camera.aspect) * 0.92 : dist);
  function fronts() { const out = {}; for (const r of routes) out[r.key] = frontAt(r.timed, agoOf(state.year)); return out; }
  function update() {
    const f = fmtYear(state.year);
    $('.wh-when-en').textContent = `Around ${f.en}`; $('.wh-when-zh').textContent = `大約${f.zh}`;
    slider.setAttribute('aria-valuetext', `${f.en} · ${f.zh}`);
    const r = reached(data.sites, state.year);
    $('.wh-count').textContent = `${r.length} / ${data.sites.length}`;
    for (const b of siteBtns) { const s = data.sites.find((x) => x.key === b.dataset.site); b.classList.toggle('is-later', siteState(s, state.year) === 'not'); b.setAttribute('aria-pressed', state.site === s.key); }
    if (view) view.globe.setAgo(agoOf(state.year), fronts());
  }
  function placeLabels() {
    if (!view) return;
    const { globe, camera, labs } = view;
    const zoom = Math.min(1.15, Math.max(0.32, (camera.position.length() - 1) / 2.6));
    for (const s of data.sites) globe.setDot(s.key, { on: siteState(s, state.year) === 'yes', big: state.site === s.key, k: zoom });
    // 印度北部幾個地方靠得很近，標籤會疊在一起：只標選中的、最近三百年內才到的；拉近（距離 < 2.3）才全部標出來
    const near = camera.position.length() < 2.3, narrow = root.clientWidth < 600;
  const newest = reached(data.sites, state.year).sort((x, y) => y.year - x.year)[0]?.key;
    for (const { s, el } of view.siteLabs) {
      const recent = narrow ? s.key === newest : state.year - s.year < 300;
    const on = siteState(s, state.year) === 'yes' && (s.key === state.site || (!narrow && near) || recent);
      labs.place(el, globe.pos(s.at, 1.03), on && globe.facing(s.at, camera, 0.2), -16);
    }
  }
  function render() { if (!view) return; view.controls.update(); placeLabels(); view.renderer.render(view.scene, view.camera); }
  function look(lon, lat, dist, now) {
    if (!view) return;
    view.want.dir.fromArray(toVec([lon, lat])); view.want.dist = dist ? fit(dist) : view.camera.position.length(); view.want.on = true;
    if (now) { view.setCam([lon, lat], view.want.dist); view.want.on = false; }
    kick();
  }
  function easeCam(dt, rate) {
    const { camera, want, lookDir } = view; if (!want.on) return false;
    const len = camera.position.length(); lookDir.copy(camera.position).normalize();
    const k = 1 - Math.exp(-dt * rate); lookDir.lerp(want.dir, k).normalize();
    const nl = len + (want.dist - len) * k; camera.position.copy(lookDir).multiplyScalar(nl); camera.lookAt(0, 0, 0);
    if (lookDir.angleTo(want.dir) < 0.002 && Math.abs(nl - want.dist) < 0.003) want.on = false;
    return true;
  }
  function setYear(y, fromSlider) {
    state.year = Math.min(data.to, Math.max(data.from, y));
    if (!fromSlider) slider.value = Math.round(state.year);
    update(); kick();
  }
  function play(on) {
    state.playing = on; if (on && state.year >= data.to - 1) setYear(data.from);
    root.classList.toggle('is-playing', on); playBtn.setAttribute('aria-pressed', on);
    playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : 'Play · 播放'; kick();
  }
  function select(key) {
    state.site = key;
    const s = key && data.sites.find((x) => x.key === key);
    card.hidden = !s;
    if (s) {
      const t = TAG[s.tag];
      card.innerHTML = `<p class="wh-site-k wh-tag-${s.tag}">${bi(t[0], t[1])}</p><h3>${bi(s.en, s.zh)}</h3>`
        + `<dl><div><dt>${bi('What happened', '發生了什麼')}</dt><dd>${bi(s.what_en, s.what_zh)}</dd></div>`
        + `<div><dt>${bi('When', '什麼時候')}</dt><dd>${bi(s.when_en, s.when_zh)}</dd></div>`
        + `<div><dt>${bi('How we know', '怎麼知道')}</dt><dd>${bi(s.how_en, s.how_zh)}</dd></div></dl>`
        + (s.url ? `<a class="wh-py-src" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.src)} &#8599;</a>` : '');
      if (view && !view.globe.facing(s.at, view.camera, 0.5)) look(s.at[0], s.at[1], Math.min(view.camera.position.length(), 3));
    }
    update(); kick();
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    let busy = false;
    if (state.playing) {
      const before = state.year;
      state.year = Math.min(data.to, state.year + (dt / SPAN) * span); slider.value = Math.round(state.year);
      const newly = data.sites.filter((s) => s.year > before && s.year <= state.year);
      if (view && newly.length && performance.now() - view.userAt > 2500) { const s = newly[newly.length - 1]; look(s.at[0], s.at[1], s.dist || 3.1); }
      update(); busy = true;
      if (state.year >= data.to) play(false);
    }
    if (view && easeCam(dt, state.playing ? 1.8 : 4.5)) busy = true;
    render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 80) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  slider.addEventListener('input', () => { if (state.playing) play(false); setYear(+slider.value, true); });
  playBtn.addEventListener('click', () => play(!state.playing));
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-site]');
    if (b) { const s = data.sites.find((x) => x.key === b.dataset.site); if (siteState(s, state.year) === 'not') setYear(s.year); select(state.site === s.key ? null : s.key); }
  });
  if (view) $('.al-home').addEventListener('click', () => { select(null); look(HOME.at[0], HOME.at[1], HOME.dist); });
  const DEMOS = {
    start: () => { select(null); setYear(data.from + 100); look(84, 25, 2.6); },
    ashoka: () => { setYear(-230); select('sanchi'); look(80, 20, 2.8); },
    south: () => { setYear(500); select('anuradhapura'); look(85, 10, 3.2); },
    north: () => { setYear(700); select(null); look(105, 35, 3.6); },
  };
  const api = {
    state, data, routes, setYear, play, select, look,
    demo(n) { if (state.playing) play(false); if (DEMOS[n]) DEMOS[n](); },
    info() { return { year: Math.round(state.year), reached: reached(data.sites, state.year).length, site: state.site, webgl: !!view, cam: view ? toLonLat(view.camera.position.toArray()).concat(view.camera.position.length()) : null }; },
    render() { update(); render(); },
    ready: () => true,
  };
  setYear(state.year);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-dharma-lab]', init, { demo: (lab, v) => lab.demo(v) });
