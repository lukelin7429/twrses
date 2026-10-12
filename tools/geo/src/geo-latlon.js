/*
 * 地理 Geography · 第二課「怎麼找到地球上任何一個地方？」。
 *
 * 一個想法：**兩個數字就是一個地址**——緯度說「離赤道多遠（南北）」，經度說「離本初子午線多遠（東西）」，而且兩個都是「角度」。
 * 3D：地球儀（globe.js，不攤平）上一個可以拖的點；它所在的緯線（金色）與經線（藍色）亮起來；
 * 打開「看角度」時地表變半透明，從地心畫出兩個角：緯度角（地心 → 赤道上同一條經線的點 → 這個點）、
 * 經度角（在赤道面上，從本初子午線轉到這條經線）。右邊欄即時讀出經緯度（小數與度分兩種寫法）。
 * 只畫陸地、海洋、經緯線；不畫國界、不標國名。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，兩支滑桿與按鈕照樣能讀出經緯度。
 * 2D（不需要 WebGL）：find2d.js「找出這個地方」、degree2d.js「一度有多長？」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-latlon.js
 * 除錯：document.querySelector('[data-geolatlon-lab]').__lab
 *   state（lon、lat、angles）、setPoint(lon, lat)、goTo('taiwan'|'zero'|'npole'|'greenwich', 立即?)、look(lon, lat)、
 *   demo('latitude'|'longitude'|'taiwan'|'pole')、readout()、pointScreen()（那個點在畫布上的像素位置）、run(秒)、render()、goHome()
 */
import {
  AmbientLight, BufferAttribute, BufferGeometry, DirectionalLight, DoubleSide, Line, LineBasicMaterial, MathUtils, Mesh, MeshBasicMaterial,
  PerspectiveCamera, Raycaster, Scene, Sphere, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { RAD, angleBetween, formatLat, formatLon, formatPlace, lonLatToVec3, vec3ToLonLat } from './geo.js';
import { getLand } from './land.js';
import { makeGlobe } from './globe.js';
import { initFind } from './find2d.js';
import { initDegree } from './degree2d.js';

const FOV = 32;
const SPOTS = {
  taiwan: { lon: 121, lat: 23.7 },
  zero: { lon: 0, lat: 0 },
  npole: { lon: 0, lat: 90 },
  greenwich: { lon: 0, lat: 51.5 },
};
const START = SPOTS.taiwan;
const GRAB = 8;   // 離那個點幾度以內按下去算「抓住它」
const V = (a) => new Vector3(a[0], a[1], a[2]);
const viewDir = (lon, lat) => V(lonLatToVec3(lon - 22, MathUtils.clamp(lat * 0.55 + 14, -60, 62)));

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const land = getLand();
  const state = { lon: START.lon, lat: START.lat, angles: true, labels: true, tween: null, fly: null };
  const latSl = $('.gg-ll-lat'), lonSl = $('.gg-ll-lon');
  const note = $('.gg-ll-note');

  function readout() {
    const { lon, lat } = state;
    const pole = Math.abs(lat) > 89.75;
    $('.gg-ll-addr').textContent = pole ? formatLat(lat) : formatPlace(lon, lat);
    $('.gg-ll-dm').textContent = pole ? formatLat(lat, 'dm') : formatPlace(lon, lat, 'dm');
    $('.gg-ll-latv').textContent = formatLat(lat);
    $('.gg-ll-lonv').textContent = pole ? '—' : formatLon(lon);
    const k = pole ? 'pole' : Math.abs(lat) < 0.25 && Math.abs(lon) < 0.25 ? 'zero' : Math.abs(lat) < 0.25 ? 'equator' : Math.abs(lon) < 0.25 ? 'prime' : Math.abs(lon) > 179.75 ? 'anti' : 'plain';
    note.querySelectorAll('[data-when]').forEach((s) => { s.hidden = s.dataset.when !== k; });
    $('.gg-ll-ns').dataset.side = Math.abs(lat) < 0.25 ? 'mid' : lat > 0 ? 'a' : 'b';
    $('.gg-ll-ew').dataset.side = pole || Math.abs(lon) < 0.25 || Math.abs(lon) > 179.75 ? 'mid' : lon > 0 ? 'a' : 'b';
    latSl.value = lat; lonSl.value = lon;
    return { addr: $('.gg-ll-addr').textContent, dm: $('.gg-ll-dm').textContent, kind: k };
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x050914, 1);
    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
    scene.add(camera);
    scene.add(new AmbientLight(0xffffff, 1.15));
    const sun = new DirectionalLight(0xffffff, 2.3);
    sun.position.set(-0.6, 0.8, 1.6);
    camera.add(sun);
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const maxTex = renderer.capabilities.maxTextureSize || 2048;
    const globe = makeGlobe({ land, texWidth: small || maxTex < 4096 ? 2048 : 4096, selRadius: 2.4 });
    scene.add(globe.group);
    globe.show('circles', false);
    globe.addMark(121, 23.7, 0xff4d4d, 0.8);
    const prime = globe.addPath(0xff8fd8, 0.95, 80, 0.006);
    prime.set(Array.from({ length: 73 }, (_, i) => [0, -90 + i * 2.5]), 6);
    const merid = globe.addPath(0x6fe0ff, 1, 80, 0.008);

    // ── 地球內部的兩個角 ──
    const inner = {};
    const mkLine = (color, n) => { const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(new Float32Array(n * 3), 3)); const l = new Line(g, new LineBasicMaterial({ color, transparent: true, opacity: 0.95, depthTest: false })); l.frustumCulled = false; l.renderOrder = 5; return l; };
    const mkFan = (color, n) => { const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(new Float32Array((n + 2) * 3), 3)); const idx = []; for (let i = 1; i <= n; i++) idx.push(0, i, i + 1); g.setIndex(idx); const m = new Mesh(g, new MeshBasicMaterial({ color, transparent: true, opacity: 0.42, side: DoubleSide, depthTest: false, depthWrite: false })); m.frustumCulled = false; m.renderOrder = 4; return m; };
    const NW = 40;
    inner.toP = mkLine(0xffd36e, 2); inner.toF = mkLine(0xffffff, 2); inner.toZ = mkLine(0xff8fd8, 2);
    inner.latFan = mkFan(0xffd36e, NW); inner.lonFan = mkFan(0x6fe0ff, NW);
    inner.core = new Mesh(new SphereGeometry(0.028, 16, 12), new MeshBasicMaterial({ color: 0xffffff, depthTest: false }));
    inner.core.renderOrder = 6;
    const innerGrp = [inner.toP, inner.toF, inner.toZ, inner.latFan, inner.lonFan, inner.core];
    innerGrp.forEach((o) => scene.add(o));
    const put = (obj, pts) => { const a = obj.geometry.getAttribute('position'); pts.forEach((p, i) => a.setXYZ(i, p[0], p[1], p[2])); a.needsUpdate = true; };
    const sc = (p, k) => [p[0] * k, p[1] * k, p[2] * k];
    function buildInner() {
      const { lon, lat } = state;
      const P = lonLatToVec3(lon, lat), F = lonLatToVec3(lon, 0), Z = lonLatToVec3(0, 0), O = [0, 0, 0];
      put(inner.toP, [O, P]); put(inner.toF, [O, F]); put(inner.toZ, [O, Z]);
      const a = [O], b = [O];
      for (let i = 0; i <= NW; i++) a.push(sc(lonLatToVec3(lon, lat * i / NW), 0.5));
      for (let i = 0; i <= NW; i++) b.push(sc(lonLatToVec3(lon * i / NW, 0), 0.72));
      put(inner.latFan, a); put(inner.lonFan, b);
    }
    function applyAngles() {
      innerGrp.forEach((o) => { o.visible = state.angles; });
      globe.setOpacity(state.angles ? 0.6 : 1, state.angles);   // 半透明時只畫朝向鏡頭的那一面，背面的陸地才不會透過來
    }
    function syncPoint() {
      const { lon, lat } = state;
      globe.setSelection(lon, lat);
      merid.set(Array.from({ length: 73 }, (_, i) => [lon, -90 + i * 2.5]), Math.min(11, Math.max(0, Math.floor((lon + 180) / 30))));
      buildInner();
    }

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.6; controls.zoomSpeed = 0.7;
    const tanF = Math.tan(FOV * RAD / 2);
    let dist = 4.6;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect; camera.updateProjectionMatrix();
      const want = Math.max(1.1 / tanF, 1.1 / (tanF * aspect)) * 1.1;
      const dirN = camera.position.lengthSq() > 0 ? camera.position.clone().normalize() : viewDir(state.lon, state.lat);
      const zoom = camera.position.lengthSq() > 0 ? camera.position.length() / dist : 1;
      dist = want;
      camera.position.copy(dirN).multiplyScalar(dist * MathUtils.clamp(zoom, 0.45, 1.5));
      controls.minDistance = dist * 0.45; controls.maxDistance = dist * 1.5;
      camera.lookAt(0, 0, 0);
    }
    camera.position.copy(viewDir(state.lon, state.lat)).multiplyScalar(dist);

    const labs = labeler($('.al-labels'), cv, camera);
    const fixed = [
      { lon: -32, lat: 0, html: 'Equator <i>赤道</i>', cls: 'gg-lab-eq', dy: -11 },
      { lon: 0, lat: 36, html: 'Prime meridian <i>本初子午線</i>', cls: 'gg-lab-pm', dy: 0 },
      { lon: 0, lat: 90, html: 'North Pole <i>北極</i>', cls: '', dy: -12 },
      { lon: 0, lat: -90, html: 'South Pole <i>南極</i>', cls: '', dy: 12 },
      { lon: 121, lat: 23.7, html: 'Taiwan <i>台灣</i>', cls: 'gg-lab-tw', dy: 16 },
    ].map((l) => ({ ...l, el: labs.add(`gg-lab ${l.cls}`, l.html) }));
    const ptLab = labs.add('gg-lab gg-lab-pt', '');
    const P = new Vector3(), toCam = new Vector3();
    function placeLabels() {
      for (const l of fixed) {
        if (!state.labels) { l.el.style.opacity = 0; continue; }
        P.set(...lonLatToVec3(l.lon, l.lat)).multiplyScalar(1.02);
        labs.place(l.el, P, l.dy);
        toCam.copy(camera.position).sub(P).normalize();
        if (P.clone().normalize().dot(toCam) < 0.1) l.el.style.opacity = 0;
      }
      P.set(...lonLatToVec3(state.lon, state.lat)).multiplyScalar(1.03);
      ptLab.textContent = Math.abs(state.lat) > 89.75 ? formatLat(state.lat) : formatPlace(state.lon, state.lat);
      labs.place(ptLab, P, -22);
      toCam.copy(camera.position).sub(P).normalize();
      if (P.clone().normalize().dot(toCam) < 0.05) ptLab.style.opacity = 0;
    }

    // ── 拖那個點／點一下把它移過去 ──
    const ray = new Raycaster(), ndc = new Vector2(), unit = new Sphere(new Vector3(), 1), hitV = new Vector3();
    function pick(e) {
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      return ray.ray.intersectSphere(unit, hitV) ? vec3ToLonLat([hitV.x, hitV.y, hitV.z]) : null;
    }
    let down = null, dragging = false;
    cv.addEventListener('pointerdown', (e) => {
      const h = pick(e);
      down = { x: e.clientX, y: e.clientY };
      if (h && angleBetween(h[0], h[1], state.lon, state.lat) < GRAB) {
        dragging = true; controls.enabled = false; state.tween = null; state.fly = null;
        try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 沒有也沒關係 */ }
        cv.classList.add('gg-grabbing');
      }
    }, true);
    cv.addEventListener('pointermove', (e) => {
      if (!dragging) { const h = pick(e); cv.classList.toggle('gg-can-grab', !!h && angleBetween(h[0], h[1], state.lon, state.lat) < GRAB); return; }
      const h = pick(e);
      if (h) api.setPoint(h[0], h[1]);
    });
    const up = (e) => {
      if (dragging) { dragging = false; controls.enabled = true; cv.classList.remove('gg-grabbing'); down = null; return; }
      if (down && e.type === 'pointerup' && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 6) { const h = pick(e); if (h) { state.tween = null; api.setPoint(h[0], h[1]); } }
      down = null;
    };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    function render() { globe.update(); renderer.render(scene, camera); placeLabels(); }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize(); applyAngles(); syncPoint();
    return {
      renderer, camera, controls, globe, render, syncPoint, applyAngles,
      setDir(d) { const len = camera.position.length() || dist; camera.position.copy(d).multiplyScalar(len); camera.lookAt(0, 0, 0); },
      home() { camera.position.copy(viewDir(state.lon, state.lat)).multiplyScalar(dist); camera.lookAt(0, 0, 0); },
      screen() { P.set(...lonLatToVec3(state.lon, state.lat)).project(camera); const r = cv.getBoundingClientRect(); return [r.left + (P.x * 0.5 + 0.5) * r.width, r.top + (-P.y * 0.5 + 0.5) * r.height]; },
    };
  }

  const api = {
    state,
    ready: () => true,
    setPoint(lon, lat) {
      state.lat = MathUtils.clamp(Math.round(lat * 10) / 10, -90, 90);
      let L = ((lon + 180) % 360 + 360) % 360 - 180;
      if (L === -180 && lon > 0) L = 180;
      state.lon = Math.round(L * 10) / 10;
      if (view) view.syncPoint();
      readout(); kick();
    },
    /** 鏡頭轉去看某個經緯度（慢慢轉過去） */
    look(lon, lat, instant) {
      if (!view) return;
      const d = viewDir(lon, lat);
      if (instant) { view.setDir(d); state.fly = null; } else state.fly = { to: d };
      kick();
    },
    goTo(key, instant) {
      const s = SPOTS[key];
      if (!s) return;
      if (instant) { state.tween = null; api.setPoint(s.lon, s.lat); api.look(s.lon, s.lat, true); return; }
      state.tween = { from: [state.lon, state.lat], to: [s.lon, s.lat], t: 0, dur: 1.6 };
      api.look(s.lon, s.lat);
    },
    demo(k) {
      const setT = (key, on) => { const c = root.querySelector(`[data-t="${key}"]`); if (c && c.checked !== on) { c.checked = on; c.dispatchEvent(new Event('change')); } };
      if (k === 'latitude') { setT('angles', true); api.setPoint(121, 0); api.look(121, 20); state.tween = { from: [121, 0], to: [121, 60], t: 0, dur: 4, then: { from: [121, 60], to: [121, 23.7], t: 0, dur: 2.5 } }; }
      else if (k === 'longitude') { setT('angles', true); api.setPoint(0, 0); api.look(60, 25); state.tween = { from: [0, 0], to: [121, 0], t: 0, dur: 4.5 }; }
      else if (k === 'taiwan') { setT('angles', true); api.goTo('taiwan'); }
      else if (k === 'pole') { setT('angles', false); api.look(state.lon, 62); state.tween = { from: [state.lon, state.lat], to: [state.lon, 90], t: 0, dur: 3 }; }
      kick();
    },
    goHome() { if (view) { view.home(); kick(); } },
    readout,
    pointScreen: () => (view ? view.screen() : null),
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };

  latSl.addEventListener('input', () => { state.tween = null; api.setPoint(state.lon, +latSl.value); });
  lonSl.addEventListener('input', () => { state.tween = null; api.setPoint(+lonSl.value, state.lat); if (view && !state.fly) api.look(state.lon, state.lat); });
  root.querySelectorAll('[data-spot]').forEach((b) => b.addEventListener('click', () => api.goTo(b.dataset.spot)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'angles') { state.angles = c.checked; if (view) view.applyAngles(); }
    else if (view) view.globe.show(k, c.checked);
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());

  let raf = 0, last = 0, visible = true, idle = 0;
  const ease = (x) => x * x * (3 - 2 * x);
  const tmpDir = new Vector3();
  function step(dt) {
    let moving = false;
    if (state.tween) {
      const tw = state.tween;
      tw.t = Math.min(1, tw.t + dt / tw.dur);
      const k = ease(tw.t);
      let dl = tw.to[0] - tw.from[0];
      if (dl > 180) dl -= 360; else if (dl < -180) dl += 360;
      const lon = tw.from[0] + dl * k, lat = tw.from[1] + (tw.to[1] - tw.from[1]) * k;
      if (tw.t >= 1) state.tween = tw.then || null;
      api.setPoint(tw.t >= 1 ? tw.to[0] : lon, tw.t >= 1 ? tw.to[1] : lat);
      moving = true;
    }
    if (view && state.fly) {
      tmpDir.copy(view.camera.position).normalize();
      const left = tmpDir.angleTo(state.fly.to);
      if (left < 0.01) state.fly = null;
      else { tmpDir.lerp(state.fly.to, Math.min(1, dt * 3.2)).normalize(); view.setDir(tmpDir); }
      moving = true;
    }
    if (view && view.controls.enabled && !state.fly && view.controls.update()) moving = true;
    return moving;
  }
  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    const moving = step(dt);
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 90) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  if (view) {
    view.controls.addEventListener('start', () => { state.fly = null; kick(); });
    view.controls.addEventListener('change', kick);
    cv.addEventListener('pointerdown', kick); cv.addEventListener('wheel', kick, { passive: true });
  }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  const land = getLand();
  document.querySelectorAll('[data-gg-find]').forEach((el) => initFind(el, land));
  document.querySelectorAll('[data-gg-degree]').forEach((el) => initDegree(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geolatlon-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
