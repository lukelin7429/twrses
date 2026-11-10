/*
 * 世界歷史 第十課〈How Did Christianity and Islam Begin and Spread? 基督宗教和伊斯蘭教怎麼開始、怎麼傳開？〉
 * 歷史地球儀：拉時間滑桿（大約西元 1 年到 1500 年），看基督宗教（紫色）從耶路撒冷、伊斯蘭教（綠色）從麥加和麥地那傳出去。
 * 實線是陸路、虛線是海路。可以兩個一起看，也可以只看其中一個。
 * 點路上的地方看小卡：每一個年代都標明是「傳統上說」還是「史料／考古顯示」；兩個宗教都有的地方，卡片寫清楚各自的年代。
 * 路線只表示大致的方向與先後，不是確切的道路，也不表示整個地區的人都信了。
 *
 * 資料在 data/world_history.json 的 lab（from、to、start、routes[]、sites[]、demos[]）：
 *   routes[] { key, faith: 'christian'|'islam', kind: 'land'|'sea', pts: [[lon, lat, year?, siteKey?, 'sea'?]…] }
 *   sites[]  { key, en, zh, at, faiths: [...], year, year2?, tag: 'tradition'|'evidence', what/when/how_en/zh, also_en/zh?, src, url }
 *   demos[]  { key, year, faith?, site?, look: [lon, lat, dist] }
 * 除錯：document.querySelector('[data-wh-faith-lab]').__lab
 *   state、setYear(y)、play(bool)、filter('all'|'christian'|'islam')、select(key|null)、look(lon, lat, dist)、demo(...)、info()、render()
 */
import { PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, esc, bi, readJson } from './common.js';
import { getLand } from './land.js';
import { makeHGlobe } from './hglobe.js';
import { toVec, toLonLat, angle, frontAt } from './sphere.js';
import { routePoints } from './spread.js';
import { agoOf, fmtYear, toRoute } from './dharma.js';
import { siteYear, shows, visible, routeOn } from './faith.js';
import './timeline2d.js';
import './sort2d.js';
import './match2d.js';

const COLOR = { christian: '#cdb0ff', islam: '#7fe3a6' };
const NAME = { christian: ['Christianity', '基督宗教'], islam: ['Islam', '伊斯蘭教'] };
const HOME = { at: [32, 30], dist: 3.3 };
const TAG = { tradition: ['Tradition says', '傳統上說'], evidence: ['Evidence shows', '史料／考古顯示'] };

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), slider = $('.wh-time'), playBtn = $('.al-play');
  const state = { year: data.start ?? data.from, playing: false, site: null, faith: 'all' };
  const routes = data.routes.map((r) => ({ ...r, timed: routePoints(toRoute(r), 0.8) }));
  const siteBtns = [...root.querySelectorAll('[data-site]')], faithBtns = [...root.querySelectorAll('[data-faith]')];
  const card = $('.wh-site');
  const SPAN = 45, span = data.to - data.from;
  let raf = 0, last = 0, idle = 0, visibleOnPage = true;
  const lit = () => visible(data.sites, state.faith, state.year);

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
    for (const r of routes) globe.addRoute({ key: r.key, pts: r.timed, color: COLOR[r.faith], sea: COLOR[r.faith], dash: r.kind === 'sea', width: 0.009 });
    for (const s of data.sites) globe.addDot({ key: s.key, at: s.at, color: s.tag === 'tradition' ? '#ffd9a3' : '#ffffff', r: 0.0105 });
    const siteLabs = data.sites.map((s) => ({ s, el: labs.add(`wh-lab wh-lab-dh wh-lab-fa${s.tag === 'tradition' ? ' is-trad' : ''}`,
      `<span class="wh-fa-pips">${s.faiths.map((f) => `<span class="wh-fa-pip is-${f}"></span>`).join('')}</span>${esc(s.short_en || s.en)}<i>${esc(s.short_zh || s.zh)}</i>`) }));
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
      for (const s of lit()) { const d = angle(p, s.at); if (d < bd) { bd = d; best = s; } }
      select(best ? best.key : null);
    });
    view = { renderer, scene, camera, globe, controls, labs, siteLabs, want, lookDir, setCam, get userAt() { return userAt; } };
    resize();
    setCam(HOME.at, camera.aspect < 1 ? HOME.dist * Math.min(1.5, 1 / camera.aspect) * 0.92 : HOME.dist);
  } catch (e) { view = null; if (window.console) console.warn('World History faiths globe: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  const fit = (dist) => (view && view.camera.aspect < 1 ? dist * Math.min(1.5, 1 / view.camera.aspect) * 0.92 : dist);
  function fronts() { const out = {}; for (const r of routes) out[r.key] = frontAt(r.timed, agoOf(state.year)); return out; }
  function update() {
    const f = fmtYear(state.year);
    $('.wh-when-en').textContent = `Around ${f.en}`; $('.wh-when-zh').textContent = `大約${f.zh}`;
    slider.setAttribute('aria-valuetext', `${f.en} · ${f.zh}`);
    const pool = data.sites.filter((s) => shows(s, state.faith));
    $('.wh-count').textContent = `${lit().length} / ${pool.length}`;
    for (const b of siteBtns) {
      const s = data.sites.find((x) => x.key === b.dataset.site);
      b.hidden = !shows(s, state.faith);
      // 兩個宗教都有的地方：只看第二個宗教時，按鈕上的年代換成那個宗教的年代
      if (s.faiths.length > 1) { const y = fmtYear(siteYear(s, state.faith)); b.querySelector('small').innerHTML = bi(y.en, y.zh); }
      b.classList.toggle('is-later', state.year < siteYear(s, state.faith)); b.setAttribute('aria-pressed', state.site === s.key);
    }
    for (const b of faithBtns) b.setAttribute('aria-pressed', b.dataset.faith === state.faith);
    if (view) { for (const r of routes) view.globe.setRoute(r.key, routeOn(r, state.faith)); view.globe.setAgo(agoOf(state.year), fronts()); }
  }
  function placeLabels() {
    if (!view) return;
    const { globe, camera, labs } = view;
    const zoom = Math.min(1.15, Math.max(0.32, (camera.position.length() - 1) / 2.6));
    const on = new Set(lit().map((s) => s.key));
    for (const s of data.sites) globe.setDot(s.key, { on: on.has(s.key), big: state.site === s.key, k: zoom });
    // 地中海一帶的地方靠得很近：優先標選中的、再標最近兩百年才亮起來的（新的在前）；拉近才全部標；太靠近已經標了的就不標（手機上只標選中的和最新的）
    const near = camera.position.length() < 2.3, narrow = root.clientWidth < 600;
    const order = lit().sort((x, y) => siteYear(y, state.faith) - siteYear(x, state.faith));
    const want = [];
    if (state.site) want.push(state.site);
    for (const [i, s] of order.entries()) if ((!narrow && near) || (narrow ? i === 0 : state.year - siteYear(s, state.faith) < 200)) want.push(s.key);
    const gap = (narrow ? 14 : 9.5) * (camera.position.length() - 1) / 2.6, shown = [];
    for (const k of want) {
      const s = data.sites.find((x) => x.key === k);
      if (!s || shown.includes(s) || !on.has(k) || !globe.facing(s.at, camera, 0.2)) continue;
      if (shown.some((o) => angle(o.at, s.at) < gap)) continue;
      shown.push(s);
    }
    for (const { s, el } of view.siteLabs) labs.place(el, globe.pos(s.at, 1.03), shown.includes(s), -16);
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
  function filter(f) {
    state.faith = ['christian', 'islam'].includes(f) ? f : 'all';
    if (state.site && !shows(data.sites.find((x) => x.key === state.site), state.faith)) select(null);
    update(); kick();
  }
  function part(f, year) {
    return `<p class="wh-fa-part is-${f}"><span class="wh-fa-pip is-${f}"></span>${bi(NAME[f][0], NAME[f][1])} · ${bi(fmtYear(year).en, fmtYear(year).zh)}</p>`;
  }
  function select(key) {
    state.site = key;
    const s = key && data.sites.find((x) => x.key === key);
    card.hidden = !s;
    if (s) {
      const t = TAG[s.tag], [f1, f2] = s.faiths;
      card.innerHTML = `<p class="wh-site-k wh-tag-${s.tag}">${bi(t[0], t[1])}</p><h3>${bi(s.en, s.zh)}</h3>`
        + part(f1, s.year)
        + `<dl><div><dt>${bi('What happened', '發生了什麼')}</dt><dd>${bi(s.what_en, s.what_zh)}</dd></div>`
        + `<div><dt>${bi('When', '什麼時候')}</dt><dd>${bi(s.when_en, s.when_zh)}</dd></div>`
        + `<div><dt>${bi('How we know', '怎麼知道')}</dt><dd>${bi(s.how_en, s.how_zh)}</dd></div></dl>`
        + (f2 ? `${part(f2, s.year2)}<p class="wh-fa-also">${bi(s.also_en, s.also_zh)}</p>` : '')
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
      const newly = data.sites.filter((s) => shows(s, state.faith) && siteYear(s, state.faith) > before && siteYear(s, state.faith) <= state.year);
      if (view && newly.length && performance.now() - view.userAt > 2500) { const s = newly[newly.length - 1]; look(s.at[0], s.at[1], 3.2); }
      update(); busy = true;
      if (state.year >= data.to) play(false);
    }
    if (view && easeCam(dt, state.playing ? 1.6 : 4.5)) busy = true;
    render();
    idle = busy ? 0 : idle + 1;
    if (visibleOnPage && idle < 80) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visibleOnPage) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visibleOnPage = ents[0].isIntersecting; if (visibleOnPage) kick(); }).observe(root);

  slider.addEventListener('input', () => { if (state.playing) play(false); setYear(+slider.value, true); });
  playBtn.addEventListener('click', () => play(!state.playing));
  root.addEventListener('click', (ev) => {
    const fb = ev.target.closest('[data-faith]');
    if (fb) { filter(fb.dataset.faith); return; }
    const b = ev.target.closest('[data-site]');
    if (b) { const s = data.sites.find((x) => x.key === b.dataset.site); const y = siteYear(s, state.faith); if (state.year < y) setYear(y); select(state.site === s.key ? null : s.key); }
  });
  if (view) $('.al-home').addEventListener('click', () => { select(null); look(HOME.at[0], HOME.at[1], HOME.dist); });
  const DEMOS = Object.fromEntries((data.demos || []).map((d) => [d.key, () => {
    select(null); filter(d.faith || 'all'); setYear(d.year);
    if (d.site) select(d.site);
    if (d.look) look(d.look[0], d.look[1], d.look[2]);
  }]));
  const api = {
    state, data, routes, setYear, play, filter, select, look,
    demo(n) { if (state.playing) play(false); if (DEMOS[n]) DEMOS[n](); },
    info() { return { year: Math.round(state.year), faith: state.faith, lit: lit().length, site: state.site, webgl: !!view, cam: view ? toLonLat(view.camera.position.toArray()).concat(view.camera.position.length()) : null }; },
    render() { update(); render(); },
    ready: () => true,
  };
  setYear(state.year);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-faith-lab]', init, { demo: (lab, v) => lab.demo(v) });
