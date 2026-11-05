/*
 * 世界歷史 第六課〈How Did Rome Hold an Empire Together? 羅馬怎麼管住那麼大的地方？〉
 * 「一座石拱怎麼撐住自己？」：兩座拱座之間先搭木頭的拱架（centering），楔形石從兩邊一塊一塊往上放，拱心石最後放。
 * 拆掉拱架：石頭全部到位、拱夠厚，拱就撐得住；少一塊、或拱太薄，就塌下來（塌的樣子是示意）。
 * 「多厚才撐得住」用 lab.min_ratio（依出處；簡化的模型：只受自己的重量、石塊不滑動、不壓碎）。
 *
 * 資料在 data/world_history.json 的 lab（R、n、t、t_min、t_max、min_ratio、status{}）。
 * 除錯：document.querySelector('[data-wh-arch-lab]').__lab
 *   state、place(k)、thick(t)、centering(bool)、build(bool)、info()、settle()、render()
 */
import {
  AmbientLight, BoxGeometry, CylinderGeometry, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight, Mesh, MeshLambertMaterial,
  PerspectiveCamera, PlaneGeometry, Scene, Shape, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, bi, readJson } from './common.js';
import { voussoirs, placedSet, keystoneIndex, stands, reason, ratio } from './arch.js';
import './timeline2d.js';
import './centers2d.js';
import './sort2d.js';

const H0 = 2.2;                                            // 拱腳的高度（拱座頂端）
const DEPTH = 3;                                           // 拱的寬度（往畫面裡）

function init(root) {
  const data = readJson(root);
  const R = data.R, n = data.n, K = keystoneIndex(n);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), kSlider = $('.wh-ar-k'), tSlider = $('.wh-ar-t'), playBtn = $('.al-play'), cBtn = $('[data-act="centering"]');
  const state = { k: n, t: data.t, centering: true, building: false, fall: 0, fallen: false };
  let raf = 0, last = 0, idle = 0, visible = true, buildAt = 0;

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.3, 300);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.minDistance = 8; controls.maxDistance = 60;
    controls.maxPolarAngle = Math.PI * 0.49; controls.target.set(0, 4, 0);
    camera.position.set(9, 7.5, 17);
    scene.add(new HemisphereLight(0xfff6e4, 0x7a6a4a, 1.0), new AmbientLight(0xffffff, 0.25));
    const sun = new DirectionalLight(0xffffff, 1.6); sun.position.set(-12, 20, 14); scene.add(sun);
    const ground = new Mesh(new PlaneGeometry(120, 120), new MeshLambertMaterial({ color: '#b9b073' })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const river = new Mesh(new PlaneGeometry(2 * R - 1.2, 120), new MeshLambertMaterial({ color: '#4b8cc8' })); river.rotation.x = -Math.PI / 2; river.position.y = 0.02; scene.add(river);
    const stoneMat = new MeshLambertMaterial({ color: '#d8c7a3' }), keyMat = new MeshLambertMaterial({ color: '#e9b85a' });
    const woodMat = new MeshLambertMaterial({ color: '#8a5a2b' });
    const abutL = new Mesh(new BoxGeometry(3, H0, DEPTH + 0.6), stoneMat), abutR = abutL.clone(); scene.add(abutL, abutR);
    const blocks = new Group(); scene.add(blocks);
    const frame = new Group(); scene.add(frame);
    const labs = labeler($('.al-labels'), cv, camera);
    const L = {
      key: labs.add('wh-lab wh-lab-fb', 'Keystone<i>拱心石</i>'),
      frame: labs.add('wh-lab', 'Wooden centering<i>木頭拱架</i>'),
      abut: labs.add('wh-lab', 'Abutment<i>拱座</i>'),
      status: labs.add('wh-lab wh-lab-fa', ''),
    };
    function resize() { const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 46 : 36; camera.updateProjectionMatrix(); }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('change', () => kick());
    view = { renderer, scene, camera, controls, blocks, frame, abutL, abutR, stoneMat, keyMat, woodMat, labs, L };
    resize(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History arch model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  // 拱的形狀：每一塊楔形石是一段圓環，往畫面裡擠出 DEPTH
  function sector(r0, r1, a0, a1, depth) {
    const lo = Math.min(a0, a1), hi = Math.max(a0, a1);                        // 一定走短的那一段弧（逆時針從小角度到大角度）
    const sh = new Shape(); sh.absarc(0, 0, r1, lo, hi, false); sh.absarc(0, 0, r0, hi, lo, true);
    const g = new ExtrudeGeometry(sh, { depth, bevelEnabled: false, curveSegments: 6 }); g.translate(0, 0, -depth / 2); return g;
  }
  let pieces = [];
  function buildArch() {
    if (!view) return;
    const { blocks, frame, abutL, abutR, stoneMat, keyMat, woodMat } = view;
    while (blocks.children.length) { const c = blocks.children.pop(); c.geometry.dispose(); }
    while (frame.children.length) { const c = frame.children.pop(); c.geometry.dispose(); }
    const t = state.t, gap = 0.012;
    pieces = voussoirs(R, t, n).map((b) => {
      const g = sector(R, R + t, b.a1 + gap, b.a0 - gap, DEPTH); g.translate(-b.cx, -b.cy, 0);     // 每一塊以自己的中心為原點，塌下來時才會繞自己轉
      const m = new Mesh(g, b.key ? keyMat : stoneMat);
      m.userData = { home: new Vector3(b.cx, H0 + b.cy, 0), b, v: new Vector3(), w: 0 };
      m.position.copy(m.userData.home); blocks.add(m); return m;
    });
    abutL.position.set(-(R + t / 2), H0 / 2, 0); abutR.position.set(R + t / 2, H0 / 2, 0);
    abutL.scale.x = abutR.scale.x = Math.max(1, (t + 1.6) / 3);
    // 拱架：一道貼著拱底的木頭弧，下面幾根柱子撐在地上
    frame.add(new Mesh(sector(R - 0.32, R - 0.02, 0.02, Math.PI - 0.02, DEPTH - 0.4), woodMat));
    for (const a of [0.35, 0.9, Math.PI / 2, Math.PI - 0.9, Math.PI - 0.35]) {
      const x = Math.cos(a) * (R - 0.3), top = H0 + Math.sin(a) * (R - 0.3);
      for (const z of [-(DEPTH - 0.8) / 2, (DEPTH - 0.8) / 2]) { const p = new Mesh(new CylinderGeometry(0.09, 0.09, top, 6), woodMat); p.position.set(x, top / 2, z); frame.add(p); }
    }
  }

  const ease = (u) => (u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u));
  function place(dt = 1) {
    if (!view) return;
    const set = placedSet(n, state.k);
    pieces.forEach((m, i) => {
      const ud = m.userData;
      if (!set.has(i)) { m.visible = false; return; }
      m.visible = true;
      if (state.fallen) return;                       // 塌下來的石頭由 tumble() 處理
      const age = ud.age = Math.min(1, (ud.age ?? 0) + dt / 0.5);      // 剛放上去的那一塊從上面落下來
      m.position.copy(ud.home); m.position.y += (1 - ease(age)) * 3; m.rotation.set(0, 0, 0);
    });
    view.frame.visible = state.frameY > -H0 - R;
    view.frame.position.y = state.frameY;
  }
  // 塌下來（示意）：典型的「四個鉸點」塌法——拱頂往下掉，兩邊的拱腰往外推，
  // 下段繞著拱腳轉、上段跟著拱頂移動；拱心石（如果有）直接往下掉。碰到地面就停。
  function tumble(dt) {
    if (!view) return false;
    const t = state.t, rm = R + t / 2, h = Math.max(1, Math.round(n / 6)), th = Math.PI - (h / n) * Math.PI, floor = Math.max(0.3, t * 0.5);
    const prevD = state.fold;
    state.foldV = (state.foldV || 0) + dt * 6; state.fold = state.fold + state.foldV * dt;
    const solve = (side, d) => {
      const A = { x: side * (R + t / 2), y: H0 }, B0 = { x: side * -Math.cos(th) * rm * -1, y: H0 + Math.sin(th) * rm }, C0 = { x: 0, y: H0 + rm };
      B0.x = side * Math.abs(Math.cos(th)) * rm;
      const C = { x: 0, y: C0.y - d }, rAB = Math.hypot(B0.x - A.x, B0.y - A.y), rBC = Math.hypot(C0.x - B0.x, C0.y - B0.y);
      const dx = C.x - A.x, dy = C.y - A.y, D = Math.hypot(dx, dy);
      if (D > rAB + rBC || D < Math.abs(rAB - rBC)) return null;
      const a = (rAB * rAB - rBC * rBC + D * D) / (2 * D), hh = Math.sqrt(Math.max(0, rAB * rAB - a * a));
      const mx = A.x + (a * dx) / D, my = A.y + (a * dy) / D;
      const c1 = { x: mx + (hh * dy) / D, y: my - (hh * dx) / D }, c2 = { x: mx - (hh * dy) / D, y: my + (hh * dx) / D };
      const prev = state.prevB?.[side] ?? B0;                                     // 跟著上一個位置走，動作才連續
      const B = Math.hypot(c1.x - prev.x, c1.y - prev.y) < Math.hypot(c2.x - prev.x, c2.y - prev.y) ? c1 : c2;
      return { A, B0, C0, B, C, rotL: Math.atan2(B.y - A.y, B.x - A.x) - Math.atan2(B0.y - A.y, B0.x - A.x), rotU: Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(C0.y - B0.y, C0.x - B0.x) };
    };
    const pose = (d) => {
      const L = solve(-1, d), Rr = solve(1, d);
      if (!L || !Rr || d > R * 0.85) return false;                                 // 拱頂掉到大約拱腳的高度就停
      state.prevB = { [-1]: L.B, [1]: Rr.B };
      let ok = true;
      pieces.forEach((m) => {
        if (!m.visible) return;
        const ud = m.userData, b = ud.b, side = b.i < K ? -1 : 1, S = side < 0 ? L : Rr, hx = ud.home.x, hy = ud.home.y;
        if (b.i === K) { m.position.set(hx, hy - d, 0); m.rotation.set(0, 0, 0); }
        else if ((side < 0 && b.i < h) || (side > 0 && b.i > n - 1 - h)) {
          const c = Math.cos(S.rotL), s2 = Math.sin(S.rotL), x = hx - S.A.x, y = hy - S.A.y;
          m.position.set(S.A.x + x * c - y * s2, S.A.y + x * s2 + y * c, 0); m.rotation.set(0, 0, S.rotL);
        } else {
          const c = Math.cos(S.rotU), s2 = Math.sin(S.rotU), x = hx - S.B0.x, y = hy - S.B0.y;
          m.position.set(S.B.x + x * c - y * s2, S.B.y + x * s2 + y * c, 0); m.rotation.set(0, 0, S.rotU);
        }
        if (m.position.y < floor) ok = false;
      });
      return ok;
    };
    const keep = state.prevB;
    if (!pose(state.fold)) { state.fold = prevD; state.foldV = 0; state.prevB = keep; pose(state.fold); return false; }
    return true;
  }

  function status() {
    const o = { n, placed: state.k, t: state.t, R, centering: state.centering, minRatio: data.min_ratio };
    return { ok: stands(o), why: reason(o) };
  }
  function update() {
    const st = status(), txt = data.status[st.why];
    $('.wh-ar-n').textContent = `${state.k} / ${n}`;
    $('.wh-ar-ratio').textContent = ratio(state.t, R).toFixed(4);
    $('.wh-ar-min').textContent = data.min_ratio.toFixed(4);
    const out = $('.wh-ar-status'); out.innerHTML = bi(txt.en, txt.zh); out.dataset.ok = st.ok;
    $('.wh-ar-tm').textContent = `${state.t.toFixed(2)} m`;
    root.querySelector('.wh-ar-ratio').closest('div').classList.toggle('is-bad', ratio(state.t, R) < data.min_ratio);
    cBtn.innerHTML = state.centering ? 'Remove the centering<small>拆掉拱架</small>' : 'Put the centering back<small>把拱架放回去</small>';
    cBtn.setAttribute('aria-pressed', !state.centering);
    kSlider.setAttribute('aria-valuetext', `${state.k} of ${n} stones placed · 放了 ${state.k} 塊`);
    tSlider.setAttribute('aria-valuetext', `${state.t.toFixed(2)} meters thick · 厚 ${state.t.toFixed(2)} 公尺`);
    if (view) view.L.status.innerHTML = bi(txt.short_en, txt.short_zh);
  }
  function render() {
    if (!view) return;
    const { labs, L, camera } = view, set = placedSet(n, state.k);
    labs.place(L.key, new Vector3(0, H0 + R + state.t + 0.9, DEPTH / 2), set.has(K) && !state.fallen);
    labs.place(L.frame, new Vector3(-R * 0.45, H0 + state.frameY + 0.6, DEPTH / 2), state.centering);
    labs.place(L.abut, new Vector3(R + state.t / 2, H0 + 0.5, DEPTH / 2 + 0.4), true);
    labs.place(L.status, new Vector3(0, H0 + R + state.t + 2.4, 0), !state.centering);
    view.renderer.render(view.scene, camera);
  }
  state.frameY = 0; state.fold = 0; state.foldV = 0;
  function frameFn(tm) {
    raf = 0;
    const dt = Math.min(0.05, last ? (tm - last) / 1000 : 0.016); last = tm;
    let busy = false;
    if (state.building && tm - buildAt > 450) {
      if (state.k >= n) build(false); else { state.k += 1; kSlider.value = state.k; resetFall(); update(); buildAt = tm; }
      busy = true;
    }
    const target = state.centering ? 0 : -(H0 + R + 1);
    if (Math.abs(state.frameY - target) > 1e-3) { state.frameY += Math.sign(target - state.frameY) * Math.min(Math.abs(target - state.frameY), dt * 3); busy = true; }
    if (!state.centering && !status().ok && state.frameY < -0.6 && !state.fallen) state.fallen = true;
    if (state.fallen) { if (tumble(dt)) busy = true; }
    place(dt);
    if (pieces.some((m) => m.visible && (m.userData.age ?? 1) < 1)) busy = true;
    if (view) view.controls.update();
    render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frameFn);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frameFn); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  function resetFall() { state.fallen = false; state.fold = 0; state.foldV = 0; state.prevB = null; pieces.forEach((m) => { m.position.copy(m.userData.home); m.rotation.set(0, 0, 0); }); }
  function placeK(k) { state.k = Math.max(0, Math.min(n, Math.round(k))); kSlider.value = state.k; resetFall(); update(); kick(); }
  function thick(t) { state.t = Math.max(data.t_min, Math.min(data.t_max, t)); tSlider.value = Math.round(state.t * 100); resetFall(); buildArch(); pieces.forEach((m) => { m.userData.age = 1; }); update(); kick(); }
  function centering(on) { state.centering = on; if (on) resetFall(); update(); kick(); }
  function build(on) {
    state.building = on; buildAt = performance.now();
    if (on) { state.k = 0; kSlider.value = 0; centering(true); }
    playBtn.setAttribute('aria-pressed', on); playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : 'Build it · 蓋起來';
    root.classList.toggle('is-playing', on); kick();
  }
  kSlider.addEventListener('input', () => { if (state.building) build(false); placeK(+kSlider.value); });
  tSlider.addEventListener('input', () => thick(tSlider.value / 100));
  playBtn.addEventListener('click', () => build(!state.building));
  cBtn.addEventListener('click', () => centering(!state.centering));
  if (view) $('.al-home').addEventListener('click', () => { view.camera.position.set(9, 7.5, 17); view.controls.target.set(0, 4, 0); view.controls.update(); kick(); });
  const DEMOS = {
    build: () => { thick(data.t); build(true); },
    remove: () => { build(false); thick(data.t); placeK(n); centering(false); },
    nokey: () => { build(false); thick(data.t); placeK(n - 1); centering(false); },
    thin: () => { build(false); placeK(n); thick(data.t_min); centering(false); },
  };
  const api = {
    state, place: placeK, thick, centering, build,
    demo(k) { if (DEMOS[k]) DEMOS[k](); },
    info() { const s = status(); return { k: state.k, n, t: state.t, ratio: ratio(state.t, R), centering: state.centering, stands: s.ok, why: s.why, webgl: !!view }; },
    settle() { state.frameY = state.centering ? 0 : -(H0 + R + 1); pieces.forEach((m) => { m.userData.age = 1; }); if (!state.centering && !status().ok) { state.fallen = true; for (let i = 0; i < 400; i++) if (!tumble(0.02)) break; } place(0); render(); },
    render() { place(0); update(); render(); },
    dbg() { return { kids: view ? view.blocks.children.length : 0, pieces: pieces.map((m) => [m.userData.b.i, +m.position.x.toFixed(2), +m.position.y.toFixed(2), +m.rotation.z.toFixed(2), m.visible]) }; },
    cam(x, y, z) { if (view) { view.camera.position.set(x, y, z); view.controls.target.set(0, 4, 0); view.controls.update(); render(); } },   // 除錯：換視角
    ready: () => true,
  };
  buildArch(); pieces.forEach((m) => { m.userData.age = 1; });
  update(); place(0);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-arch-lab]', init, { demo: (lab, v) => lab.demo(v) });
