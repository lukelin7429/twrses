/*
 * 世界歷史 第一課〈How Did Humans Spread Across the World? 人類怎麼走到世界各地？〉
 * 歷史地球儀：拉時間滑桿，遷徙的路線從非洲長出去；切換「冰河時期的海平面」看陸橋；點發現地點看小卡。
 * 同一支 bundle 也帶這一頁的小互動（平行時間軸、誰先到、三種證據），它們不需要 WebGL。
 *
 * 資料全部在 data/world_history.json 的 lab（build.py 輸出成 <script type="application/json">）：
 *   routes[]   { key, kind: 'main'|'early'|'debated'|'voyage', pts: [[lon, lat, ago?, 'sea'?]…] }
 *   regions[]  { key, en, zh, at, older, nearer }   抵達年代是一段估計的範圍
 *   sites[]    { key, en, zh, at, older, nearer, … } 發現地點
 *   bridges[]  { key, en, zh, at, sea? }            冰河時期露出的陸地（sea：那時候也還是海）
 *   tour[]     { ago, at, dist }                    播放時鏡頭跟著走的路
 * 路線是示意：只表示「大致的方向與先後」，不是真的走過的路徑；年代取估計範圍的中段。
 *
 * 除錯：document.querySelector('[data-wh-spread-lab]').__lab
 *   state、setAgo(年前)、setPos(0–1)、play(bool)、ice(bool)、look(lon, lat, dist, 立即?)、select(siteKey|null)、
 *   demo('africa'|'sahul'|'beringia'|'pacific')、info()、render()、ready()
 */
import { PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, esc, bi, readJson } from './common.js';
import { getLand } from './land.js';
import { makeHGlobe } from './hglobe.js';
import { toVec, toLonLat, between, angle, frontAt } from './sphere.js';
import { makeScale, describe, formatAgoRange } from './timeline.js';
import { routePoints, regionState } from './spread.js';
import './timeline2d.js';
import './order2d.js';
import './sort2d.js';

const ROUTE_STYLE = {
  main: { color: '#ffd36e', dash: false, width: 0.0105 },
  early: { color: '#ff9d6b', dash: true, width: 0.009 },
  debated: { color: '#ffd36e', dash: true, width: 0.009 },
  voyage: { color: '#c7a2ff', dash: false, width: 0.009 },
};
const HOME = { at: [42, 12], dist: 3.9 };

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space');
  const scale = makeScale('log', data.from_ago, data.to_ago);
  const slider = $('.wh-time'), playBtn = $('.al-play');
  const state = { ago: data.from_ago, playing: false, ice: false, iceT: 0, follow: true, site: null, show: { sites: true, labels: true, graticule: true } };
  const routes = data.routes.map((r) => ({ ...r, timed: routePoints(r, 0.8) }));
  const regionEls = Object.fromEntries([...root.querySelectorAll('[data-region]')].map((el) => [el.dataset.region, el]));
  const siteBtns = [...root.querySelectorAll('[data-site]')];
  const siteCard = $('.wh-site'), iceNote = $('.wh-ice-note');
  const SPAN = 46;                                            // 整段播放幾秒
  let raf = 0, last = 0, idle = 0, visible = true;            // 畫面迴圈的狀態（kick() 在 3D 初始化時就會被叫到，要先宣告）

  // ── 3D ──
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
    for (const r of routes) {
      const st = ROUTE_STYLE[r.kind] || ROUTE_STYLE.main;
      globe.addRoute({ key: r.key, pts: r.timed, ...st });
    }
    const regionLabs = data.regions.map((g) => ({ g, el: labs.add('wh-lab wh-lab-region', `${esc(g.en)}<i>${esc(g.zh)}</i><small></small>`) }));
    for (const g of data.regions) globe.addArea({ key: g.key, at: g.at, r: g.glow || 0.16, color: g.key === 'africa' ? '#ffb347' : '#ffe9a8' });
    const bridgeLabs = data.bridges.map((b) => ({ b, el: labs.add(`wh-lab wh-lab-bridge${b.sea ? ' is-sea' : ''}`, `${esc(b.en)}<i>${esc(b.zh)}</i>`) }));
    for (const s of data.sites) globe.addDot({ key: s.key, at: s.at, color: '#ffffff', r: 0.0115 });
    const siteLab = labs.add('wh-lab wh-lab-site', '');
    const lookDir = new Vector3(), want = { dir: new Vector3(), dist: HOME.dist, on: false };
    const setCam = (at, dist) => { camera.position.fromArray(toVec(at, dist)); camera.lookAt(0, 0, 0); controls.update(); };
    function resize() {
      const w = space.clientWidth, h = space.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 0.9 ? 40 : 34;                     // 直式畫面把視角開大一點，地球才不會被切掉
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    let userAt = 0;
    controls.addEventListener('start', () => { userAt = performance.now(); want.on = false; root.classList.remove('al-fresh'); });
    controls.addEventListener('change', () => kick());
    // 點地表：找最近的發現地點（位移 < 6px 才算點）
    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1));
      ray.setFromCamera(ndc, camera);
      const p = globe.pick(ray);
      if (!p || !state.show.sites) return;
      const reach = Math.max(1.6, camera.position.length() * 1.5);     // 拉遠的時候，可以點的範圍大一點
      let best = null, bd = reach;
      for (const s of data.sites) { const d = angle(p, s.at); if (d < bd) { bd = d; best = s; } }
      api.select(best ? best.key : null);
    });
    view = { renderer, scene, camera, globe, controls, labs, regionLabs, bridgeLabs, siteLab, want, lookDir, setCam, resize, get userAt() { return userAt; } };
    resize();
    setCam(HOME.at, camera.aspect < 1 ? HOME.dist * Math.min(1.5, 1 / camera.aspect) * 0.92 : HOME.dist);
  } catch (e) { view = null; if (window.console) console.warn('World History globe: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  // ── 讀數與清單（沒有 WebGL 也照樣能用）──
  function fronts() {
    const out = {};
    for (const r of routes) out[r.key] = frontAt(r.timed, state.ago);
    return out;
  }
  function update() {
    const d = describe(state.ago);
    $('.wh-when-en').textContent = d.en.replace(/^about /, 'About ');
    $('.wh-when-zh').textContent = d.zh;
    slider.setAttribute('aria-valuetext', `${d.en} · ${d.zh}`);
    let n = 0;
    for (const g of data.regions) {
      const st = regionState(g, state.ago), el = regionEls[g.key];
      if (st !== 'not') n += 1;
      if (el) { el.dataset.state = st; el.querySelector('.wh-reach-st').innerHTML = st === 'not' ? bi('no evidence yet', '還沒有證據') : st === 'maybe' ? bi('perhaps by now', '也許已經到了') : bi('people are here', '已經有人'); }
    }
    $('.wh-count').textContent = `${n} / ${data.regions.length}`;
    for (const b of siteBtns) { const s = data.sites.find((x) => x.key === b.dataset.site); b.classList.toggle('is-later', state.ago > s.older); b.setAttribute('aria-pressed', state.site === s.key); }
    if (!view) return;
    const { globe } = view;
    globe.setAgo(state.ago, fronts());
    for (const g of data.regions) {
      const st = regionState(g, state.ago);
      globe.setArea(g.key, st === 'not' ? 0 : st === 'maybe' ? 0.16 : g.key === 'africa' ? 0.3 : 0.2);
    }
    globe.setIceAge(state.iceT);
    globe.show('graticule', state.show.graticule);
  }
  function placeLabels() {
    if (!view) return;
    const { globe, camera, labs } = view;
    const on = state.show.labels;
    const zoom = Math.min(1.15, Math.max(0.32, (camera.position.length() - 1) / 2.9));   // 圓點大小跟著鏡頭遠近，拉近時才不會變成一大團
    for (const s of data.sites) globe.setDot(s.key, { on: state.show.sites, big: state.site === s.key, dim: state.ago > s.older, k: zoom });
    for (const { g, el } of view.regionLabs) {
      const st = regionState(g, state.ago);
      el.dataset.state = st;
      if (st !== 'not' && el.dataset.txt !== st) {
        el.dataset.txt = st;
        const r = formatAgoRange(g.older, g.nearer);
        el.querySelector('small').textContent = g.label_en ? `${g.label_en} · ${g.label_zh}` : `${r.en.replace('about ', '')} · ${r.zh.replace('大約 ', '')}`;
      }
      labs.place(el, globe.pos(g.at, 1.03), on && st !== 'not' && globe.facing(g.at, camera, 0.18));
    }
    for (const { b, el } of view.bridgeLabs) labs.place(el, globe.pos(b.at, 1.02), on && state.iceT > 0.5 && globe.facing(b.at, camera, 0.25));
    const s = state.site && data.sites.find((x) => x.key === state.site);
    if (s) labs.place(view.siteLab, globe.pos(s.at, 1.02), globe.facing(s.at, camera, 0.1), -20); else view.siteLab.style.opacity = 0;
  }
  function render() {
    if (!view) return;
    view.controls.update();
    placeLabels();
    view.renderer.render(view.scene, view.camera);
  }

  // ── 鏡頭 ──
  function tourAt(ago) {
    const t = data.tour;
    if (ago >= t[0].ago) return t[0];
    for (let i = 1; i < t.length; i++) if (ago >= t[i].ago) {
      const a = t[i - 1], b = t[i], k = (scale.pos(ago) - scale.pos(a.ago)) / (scale.pos(b.ago) - scale.pos(a.ago));
      const e = k * k * (3 - 2 * k);
      return { at: between(a.at, b.at, e), dist: a.dist + (b.dist - a.dist) * e };
    }
    return t[t.length - 1];
  }
  // JSON 與 DEMOS 裡的 dist 是以橫式畫面為準；直式畫面水平視角比較窄，同樣的距離地球會被切掉，所以拉遠一點
  const fit = (dist) => (view && view.camera.aspect < 1 ? dist * Math.min(1.5, 1 / view.camera.aspect) * 0.92 : dist);
  function look(lon, lat, dist, now) {
    if (!view) return;
    view.want.dir.fromArray(toVec([lon, lat])); view.want.dist = dist ? fit(dist) : view.camera.position.length(); view.want.on = true;
    if (now) { view.setCam([lon, lat], view.want.dist); view.want.on = false; }
    kick();
  }
  function easeCam(dt, rate) {
    const { camera, want, lookDir } = view;
    if (!want.on) return false;
    const len = camera.position.length();
    lookDir.copy(camera.position).normalize();
    const k = 1 - Math.exp(-dt * rate);
    lookDir.lerp(want.dir, k).normalize();
    const nl = len + (want.dist - len) * k;
    camera.position.copy(lookDir).multiplyScalar(nl); camera.lookAt(0, 0, 0);
    if (lookDir.angleTo(want.dir) < 0.002 && Math.abs(nl - want.dist) < 0.003) want.on = false;
    return true;
  }

  // ── 時間 ──
  function setAgo(ago, fromSlider) {
    state.ago = Math.min(data.from_ago, Math.max(data.to_ago, ago));
    if (!fromSlider) slider.value = Math.round(scale.pos(state.ago) * 1000);
    update(); kick();
  }
  function play(on) {
    state.playing = on;
    if (on && scale.pos(state.ago) > 0.995) setAgo(data.from_ago);
    root.classList.toggle('is-playing', on); root.classList.remove('al-fresh');
    playBtn.setAttribute('aria-pressed', on);
    playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : scale.pos(state.ago) > 0.995 ? 'Play again · 再播一次' : 'Play · 播放';
    kick();
  }
  function ice(on) {
    state.ice = on;
    const tg = root.querySelector('[data-t="ice"]'); if (tg) tg.checked = on;
    if (iceNote) iceNote.hidden = !on;
    root.classList.toggle('is-ice', on);
    if (on && view) view.globe.loadIceAge(root.dataset.ice).then(() => kick(), () => { state.ice = false; if (tg) tg.checked = false; });
    kick();
  }
  function select(key) {
    state.site = key;
    const s = key && data.sites.find((x) => x.key === key);
    siteCard.hidden = !s;
    if (s) {
      const r = formatAgoRange(s.older, s.nearer);
      siteCard.innerHTML = `<p class="wh-site-k">${bi(s.where_en, s.where_zh)}</p><h3>${bi(s.en, s.zh)}</h3>`
        + `<dl><div><dt>${bi('What was found', '發現了什麼')}</dt><dd>${bi(s.what_en, s.what_zh)}</dd></div>`
        + `<div><dt>${bi('How long ago', '大約多久以前')}</dt><dd>${bi(s.when_en || r.en, s.when_zh || r.zh)}</dd></div>`
        + `<div><dt>${bi('How we know the age', '怎麼知道年代')}</dt><dd>${bi(s.dated_en, s.dated_zh)}</dd></div></dl>`
        + (s.note_en ? `<p class="wh-site-n">${bi(s.note_en, s.note_zh)}</p>` : '');
      if (view) { view.siteLab.innerHTML = `${esc(s.en)}<i>${esc(s.zh)}</i>`; if (!view.globe.facing(s.at, view.camera, 0.55)) look(s.at[0], s.at[1], Math.min(view.camera.position.length(), 3)); }
    }
    update(); kick();
  }
  const DEMOS = {
    africa: () => { ice(false); select(null); setAgo(120000); look(30, 14, 3.5); },
    sahul: () => { ice(true); select(null); setAgo(50000); look(124, -6, 2.5); },
    beringia: () => { ice(true); select(null); setAgo(14000); look(-150, 52, 2.9); },
    pacific: () => { ice(false); select(null); setAgo(700); look(-168, -12, 3.9); },
  };

  // ── 迴圈：有事才畫 ──
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    let busy = false;
    if (state.playing) {
      const p = Math.min(1, scale.pos(state.ago) + dt / SPAN);
      state.ago = scale.ago(p); slider.value = Math.round(p * 1000);
      if (view && state.follow && performance.now() - view.userAt > 2500) {
        const k = tourAt(state.ago);
        view.want.dir.fromArray(toVec(k.at)); view.want.dist = fit(k.dist); view.want.on = true;
      }
      update(); busy = true;
      if (p >= 1) play(false);
    }
    const target = state.ice && view && view.globe.hasIceAge() ? 1 : 0;
    if (state.iceT !== target) { state.iceT = Math.abs(target - state.iceT) < 0.02 ? target : state.iceT + (target - state.iceT) * (1 - Math.exp(-dt * 5)); update(); busy = true; }
    if (view && easeCam(dt, state.playing ? 1.6 : 4.5)) busy = true;
    render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 80) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  // ── 控制 ──
  slider.addEventListener('input', () => { if (state.playing) play(false); root.classList.remove('al-fresh'); setAgo(scale.ago(slider.value / 1000), true); });
  playBtn.addEventListener('click', () => play(!state.playing));
  root.querySelectorAll('.al-tg input').forEach((inp) => inp.addEventListener('change', () => {
    const k = inp.dataset.t;
    if (k === 'ice') ice(inp.checked);
    else if (k === 'follow') state.follow = inp.checked;
    else state.show[k] = inp.checked;
    update(); kick();
  }));
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-site]');
    if (b) { const s = data.sites.find((x) => x.key === b.dataset.site); if (state.ago > s.older) setAgo(s.older); select(state.site === s.key ? null : s.key); }
    const j = ev.target.closest('[data-jump]');
    if (j) { if (state.playing) play(false); setAgo(Number(j.dataset.jump)); if (j.dataset.look) { const [lo, la, di] = j.dataset.look.split(',').map(Number); look(lo, la, di); } }
  });
  if (view) $('.al-home').addEventListener('click', () => { select(null); look(HOME.at[0], HOME.at[1], HOME.dist); });

  const api = {
    state, data, scale, routes,
    setAgo, setPos: (p) => setAgo(scale.ago(p)), play, ice, look, select,
    demo(name) { if (state.playing) play(false); if (DEMOS[name]) DEMOS[name](); },
    info() { return { ago: Math.round(state.ago), pos: scale.pos(state.ago), ice: state.ice, iceT: state.iceT, site: state.site, webgl: !!view, fronts: fronts(), cam: view ? toLonLat(view.camera.position.toArray()).concat(view.camera.position.length()) : null }; },
    render() { update(); render(); },
    ready: () => true,
  };
  root.classList.add('al-fresh');
  setAgo(data.start_ago || data.from_ago);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-spread-lab]', init, { demo: (lab, v) => lab.demo(v) });
