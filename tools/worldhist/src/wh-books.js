/*
 * 世界歷史 第十一課〈Who Kept Knowledge Alive? 誰把知識保存下來？〉（由第九課的 wh-silk.js 改出來）
 * 歷史地球儀：拉時間滑桿（西元前 400 年到西元 1500 年），保存與研究知識的地方一個一個亮起來。
 * 「跟著一本書走」：選一本書（幾何原本、天文學大成、蓋倫……），小亮點沿著它的旅程一站一站走，
 * 旁邊列出每一段被譯成什麼語言、是誰譯的，上面一排語言的鏈（希臘文 → 阿拉伯文 → 拉丁文）。
 * 資料欄位和第九課一樣（cities、routes、goods、demos），goods 的每一段多 lang_en／lang_zh，書多 orig_en／orig_zh。
 *
 * 資料在 data/world_history.json 的 lab（from、to、start、routes[]、cities[]、goods[]）：
 *   routes[] { key, kind: 'land'|'sea', pts: [[lon, lat, year?, cityKey?, 'sea'?]…] }（和第八課一樣，dharma.js 檢查）
 *   cities[] { key, en, zh, short_en/zh, at, year, port?, what_en/zh, when_en/zh, how_en/zh, src, url }
 *   goods[]  { key, icon, en, zh, year, dir: 'west'|'east', stops: [cityKey…], legs: [{ en, zh }…], note_en/zh, src, url }
 * 除錯：document.querySelector('[data-wh-books-lab]').__lab
 *   state、setYear(y)、play(bool)、select(key|null)、follow(key|null)、step(秒)、look(lon, lat, dist)、demo(...)、info()、render()
 */
import { PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, esc, bi, readJson } from './common.js';
import { getLand } from './land.js';
import { makeHGlobe } from './hglobe.js';
import { toVec, toLonLat, angle, frontAt } from './sphere.js';
import { routePoints } from './spread.js';
import { agoOf, fmtYear, siteState, reached, toRoute } from './dharma.js';
import { goodPath, tokenAt } from './silk.js';
import { langChain, translations } from './books.js';
import './timeline2d.js';
import './sort2d.js';
import './order2d.js';
import './match2d.js';

const ROUTE_STYLE = {
  land: { color: '#ffd36e', dash: false, width: 0.0085 },
  sea: { color: '#7fe3ff', dash: false, width: 0.0085 },
  good: { color: '#b9f27c', sea: '#b9f27c', dash: false, width: 0.0125 },
};
const HOME = { at: [35, 33], dist: 3.5 };
const LEG_SEC = 2.4;

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), slider = $('.wh-time'), playBtn = $('.al-play');
  const state = { year: data.start ?? data.from, playing: false, site: null, good: null, t: 0, walking: false };
  const routes = data.routes.map((r) => ({ ...r, timed: routePoints(toRoute(r), 0.8) }));
  const cityBtns = [...root.querySelectorAll('[data-site]')], goodBtns = [...root.querySelectorAll('[data-good]')];
  const card = $('.wh-site'), gcard = $('.wh-sk-good');
  const SPAN = 40, span = data.to - data.from;
  const byGood = Object.fromEntries(data.goods.map((g) => [g.key, { ...g, path: goodPath(g, data.cities) }]));
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
    // 每一件東西的旅程：一條一直都在、平常藏起來的粉紅色路線（年代設在滑桿最早之前，所以不會被時間截斷）
    for (const g of Object.values(byGood)) {
      const pts = g.path.map((p, i) => [p[0], p[1], data.from - 1, ...(g.sea && g.sea[i] ? ['sea'] : [])]);
      globe.addRoute({ key: `good-${g.key}`, pts: routePoints(toRoute({ pts }), 0.8), ...ROUTE_STYLE.good });
      globe.setRoute(`good-${g.key}`, false);
      globe.routes[`good-${g.key}`].mesh.renderOrder = 5;
    }
    for (const c of data.cities) globe.addDot({ key: c.key, at: c.at, color: c.port ? '#bff3ff' : '#ffffff', r: 0.0105 });
    const token = globe.addDot({ key: 'token', at: [0, 0], color: '#b9f27c', r: 0.016 }); token.g.visible = false;
    const cityLabs = data.cities.map((c) => ({ c, el: labs.add('wh-lab wh-lab-sk', `${esc(c.short_en || c.en)}<i>${esc(c.short_zh || c.zh)}</i>`) }));
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
      for (const c of reached(data.cities, state.year)) { const d = angle(p, c.at); if (d < bd) { bd = d; best = c; } }
      select(best ? best.key : null);
    });
    view = { renderer, scene, camera, globe, controls, labs, cityLabs, token, want, lookDir, setCam, get userAt() { return userAt; } };
    resize();
    setCam(HOME.at, camera.aspect < 1 ? HOME.dist * Math.min(1.5, 1 / camera.aspect) * 0.92 : HOME.dist);
  } catch (e) { view = null; if (window.console) console.warn('World History books globe: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  const fit = (dist) => (view && view.camera.aspect < 1 ? dist * Math.min(1.5, 1 / view.camera.aspect) * 0.92 : dist);
  function fronts() { const out = {}; for (const r of routes) out[r.key] = frontAt(r.timed, agoOf(state.year)); return out; }
  function update() {
    const f = fmtYear(state.year);
    $('.wh-when-en').textContent = `Around ${f.en}`; $('.wh-when-zh').textContent = `大約${f.zh}`;
    slider.setAttribute('aria-valuetext', `${f.en} · ${f.zh}`);
    const r = reached(data.cities, state.year);
    $('.wh-count').textContent = `${r.length} / ${data.cities.length}`;
    for (const b of cityBtns) { const c = data.cities.find((x) => x.key === b.dataset.site); b.classList.toggle('is-later', siteState(c, state.year) === 'not'); b.setAttribute('aria-pressed', state.site === c.key); }
    for (const b of goodBtns) b.setAttribute('aria-pressed', state.good === b.dataset.good);
    if (view) view.globe.setAgo(agoOf(state.year), fronts());
  }
  function placeToken() {
    if (!view) return;
    const g = state.good && byGood[state.good];
    view.token.g.visible = !!g;
    if (!g) return;
    const { at, leg } = tokenAt(g.path, state.t);
    const v = new Vector3().fromArray(toVec(at));
    view.token.g.position.copy(v).multiplyScalar(1.009); view.token.g.lookAt(v.clone().multiplyScalar(3));
    gcard.querySelectorAll('li').forEach((li, i) => { li.classList.toggle('is-now', i === leg && state.t < 1); li.classList.toggle('is-done', i < leg || state.t >= 1); });
  }
  function placeLabels() {
    if (!view) return;
    const { globe, camera, labs } = view;
    const zoom = Math.min(1.15, Math.max(0.32, (camera.position.length() - 1) / 2.6));
    const g = state.good && byGood[state.good], onPath = new Set(g ? g.stops : []);
    for (const c of data.cities) globe.setDot(c.key, { on: siteState(c, state.year) === 'yes', big: state.site === c.key || onPath.has(c.key), dim: !!g && !onPath.has(c.key), k: zoom });
    // 城市很多，標籤會疊在一起：跟著一件東西走的時候只標它經過的城市；平常標選中的、最近兩百年才上網路的；拉近才全部標出來（手機上只標選中的和最新的）
    const near = camera.position.length() < 2.3, narrow = root.clientWidth < 600;
    const newest = reached(data.cities, state.year).sort((x, y) => y.year - x.year)[0]?.key;
    // 優先順序：跟著走的那一段的兩端 → 起點、終點 → 選中的 → 其他；太靠近已經標了的就不標（拉得越近，可以靠得越近）
    const want = [];
    if (g) {
      const leg = tokenAt(g.path, state.t).leg;
      for (const k of [g.stops[leg + 1], g.stops[leg], g.stops[g.stops.length - 1], g.stops[0], ...(narrow ? [] : g.stops)]) want.push(k);
    } else {
      if (state.site) want.push(state.site);
      for (const c of data.cities) if ((!narrow && near) || (narrow ? c.key === newest : state.year - c.year < 200)) want.push(c.key);
    }
    const gap = (narrow ? 14 : 9.5) * (camera.position.length() - 1) / 2.6, shown = [];
    for (const k of want) {
      const c = data.cities.find((x) => x.key === k);
      if (!c || shown.includes(c) || siteState(c, state.year) !== 'yes' || !globe.facing(c.at, camera, 0.2)) continue;
      if (shown.some((o) => angle(o.at, c.at) < gap)) continue;
      shown.push(c);
    }
    for (const { c, el } of view.cityLabs) labs.place(el, globe.pos(c.at, 1.03), shown.includes(c), -16);
  }
  function render() { if (!view) return; view.controls.update(); placeToken(); placeLabels(); view.renderer.render(view.scene, view.camera); }
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
    if (state.good && state.year < byGood[state.good].year) follow(null);
    update(); kick();
  }
  function play(on) {
    state.playing = on; if (on && state.year >= data.to - 1) setYear(data.from);
    if (on) follow(null);
    root.classList.toggle('is-playing', on); playBtn.setAttribute('aria-pressed', on);
    playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : 'Play · 播放'; kick();
  }
  function cityCard(c) {
    return `<p class="wh-site-k">${bi('Place of learning', '學術的地方')}</p><h3>${bi(c.en, c.zh)}</h3>`
      + `<dl><div><dt>${bi('Why it mattered', '為什麼重要')}</dt><dd>${bi(c.what_en, c.what_zh)}</dd></div>`
      + `<div><dt>${bi('When', '什麼時候')}</dt><dd>${bi(c.when_en, c.when_zh)}</dd></div>`
      + `<div><dt>${bi('How we know', '怎麼知道')}</dt><dd>${bi(c.how_en, c.how_zh)}</dd></div></dl>`
      + (c.url ? `<a class="wh-py-src" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.src)} &#8599;</a>` : '');
  }
  function select(key) {
    state.site = key;
    const c = key && data.cities.find((x) => x.key === key);
    card.hidden = !c;
    if (c) {
      card.innerHTML = cityCard(c);
      if (view && !view.globe.facing(c.at, view.camera, 0.5)) look(c.at[0], c.at[1], Math.min(view.camera.position.length(), 3.2));
    }
    update(); kick();
  }
  function goodCard(g) {
    const name = (k) => { const c = data.cities.find((x) => x.key === k); return [c.short_en || c.en, c.short_zh || c.zh]; };
    const n = translations(g);
    const chain = langChain(g).map((l) => `<span class="wh-bk-lang">${bi(l.en, l.zh)}</span>`).join('<span class="wh-bk-arrow" aria-hidden="true">→</span>');
    const legs = g.legs.map((l, i) => {
      const [a, b] = [name(g.stops[i]), name(g.stops[i + 1])];
      return `<li><b>${bi(`${a[0]} → ${b[0]}`, `${a[1]} → ${b[1]}`)}</b><span class="wh-bk-into">${bi(`In ${l.lang_en}`, `${l.lang_zh}`)}</span>${bi(l.en, l.zh)}</li>`;
    }).join('');
    return `<p class="wh-site-k">${bi('Follow a book', '跟著一本書走')}</p>`
      + `<h3><span aria-hidden="true">${g.icon}</span> ${bi(g.en, g.zh)}</h3>`
      + `<p class="wh-bk-chain">${chain}</p>`
      + `<ol class="wh-sk-legs">${legs}</ol>`
      + `<p class="wh-sk-hands">${n ? bi(`Translated into a new language ${n === 1 ? 'once' : `${n} times`} on this journey`, `這一路上換了 ${n} 次語言`) : bi('Kept in the same language all the way', '一路都是同一種語言')}</p>`
      + `<p class="wh-sk-note">${bi(g.note_en, g.note_zh)}</p>`
      + (g.url ? `<a class="wh-py-src" href="${esc(g.url)}" target="_blank" rel="noopener">${esc(g.src)} &#8599;</a>` : '')
      + `<button type="button" class="wh-btn wh-sk-again" data-act="again">${bi('Watch again', '再看一次')}</button>`;
  }
  function follow(key) {
    const g = key && byGood[key];
    if (state.good && view) view.globe.setRoute(`good-${state.good}`, false);
    state.good = g ? key : null; state.t = 0; state.walking = !!g;
    gcard.hidden = !g;
    if (g) {
      if (state.playing) play(false);
      if (state.year < g.year) { state.year = g.year; slider.value = g.year; }
      select(null);
      gcard.innerHTML = goodCard(g);
      if (view) {
        view.globe.setRoute(`good-${key}`, true);
        const mid = g.path[Math.floor(g.path.length / 2)];
        look(mid[0], mid[1], g.dist || 3.6);
      }
    }
    update(); kick();
  }
  function step(dt) {
    if (!state.walking || !state.good) return false;
    const n = byGood[state.good].stops.length - 1;
    state.t = Math.min(1, state.t + dt / (LEG_SEC * n));
    if (state.t >= 1) state.walking = false;
    return true;
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    let busy = false;
    if (state.playing) {
      const before = state.year;
      state.year = Math.min(data.to, state.year + (dt / SPAN) * span); slider.value = Math.round(state.year);
      const newly = data.cities.filter((c) => c.year > before && c.year <= state.year);
      if (view && newly.length && performance.now() - view.userAt > 2500) { const c = newly[newly.length - 1]; look(c.at[0], c.at[1], c.dist || 3.4); }
      update(); busy = true;
      if (state.year >= data.to) play(false);
    }
    if (step(dt)) busy = true;
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
    if (b) { follow(null); const c = data.cities.find((x) => x.key === b.dataset.site); if (siteState(c, state.year) === 'not') setYear(c.year); select(state.site === c.key ? null : c.key); return; }
    const g = ev.target.closest('[data-good]');
    if (g) { follow(state.good === g.dataset.good ? null : g.dataset.good); return; }
    if (ev.target.closest('[data-act="again"]')) { state.t = 0; state.walking = true; kick(); }
  });
  if (view) $('.al-home').addEventListener('click', () => { follow(null); select(null); look(HOME.at[0], HOME.at[1], HOME.dist); });
  const DEMOS = Object.fromEntries((data.demos || []).map((d) => [d.key, () => {
    follow(null); select(null); setYear(d.year);
    if (d.good) { follow(d.good); if (d.t != null) { state.t = d.t; state.walking = false; } }
    if (d.site) select(d.site);
    if (d.look) look(d.look[0], d.look[1], d.look[2]);
  }]));
  const api = {
    state, data, routes, setYear, play, select, follow, look,
    step(sec) { step(sec); render(); },
    demo(n) { if (state.playing) play(false); if (DEMOS[n]) DEMOS[n](); },
    info() { return { year: Math.round(state.year), cities: reached(data.cities, state.year).length, site: state.site, good: state.good, t: state.t, webgl: !!view, cam: view ? toLonLat(view.camera.position.toArray()).concat(view.camera.position.length()) : null }; },
    render() { update(); render(); },
    ready: () => true,
  };
  setYear(state.year);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-books-lab]', init, { demo: (lab, v) => lab.demo(v) });
