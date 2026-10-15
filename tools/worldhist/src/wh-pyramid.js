/*
 * 世界歷史 第四課〈Why Did the First Cities Grow Beside Rivers? 最早的城市為什麼都在河邊？〉
 * 「金字塔怎麼蓋起來的？四種想法」：一座一層一層長高的金字塔，四種坡道假說可以切換（直坡道、折返坡道、螺旋坡道、內部坡道）。
 * 拉滑桿看蓋到多高、已經放了多少石頭（蓋到一半高時已經放了八分之七）、坡道要多長。
 * **每一種坡道都只是假說**，頁面上列出支持與反對的理由和出處，不下結論；層數、坡度、寬度都是示意。
 *
 * 資料在 data/world_history.json 的 lab（base、height：公尺；ideas[]：每一種假說的說明與出處）。
 * 除錯：document.querySelector('[data-wh-pyramid-lab]').__lab
 *   state、setP(0–1)、idea(key)、play(bool)、casing(bool)、info()、render()
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, Color, ConeGeometry, DirectionalLight, Group, HemisphereLight, Mesh,
  MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, bi, readJson } from './common.js';
import { KINDS, builtFraction, halfAt, ramp, pathLength, straightRampVolume, pyramidVolume } from './pyramid.js';
import './timeline2d.js';
import './centers2d.js';
import './sort2d.js';

const S = 0.1;                                             // 場景單位＝10 公尺
const COURSES = 36;                                        // 畫出來的層數（示意；真正的層數多得多）

function init(root) {
  const data = readJson(root);
  const B = data.base, H = data.height;
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), slider = $('.wh-py-p'), playBtn = $('.al-play');
  const state = { p: 0.42, idea: 'straight', playing: false, casing: false };
  let raf = 0, last = 0, idle = 0, visible = true;

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.5, 400);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.minDistance = 20; controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI * 0.47; controls.target.set(0, 4, 4);
    camera.position.set(48, 34, 62);
    scene.add(new HemisphereLight(0xfff4e0, 0x8a6a3a, 1.05), new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xffffff, 1.7); sun.position.set(-30, 50, 25); scene.add(sun);
    const sand = new Mesh(new PlaneGeometry(220, 220), new MeshLambertMaterial({ color: '#dcc08a' })); sand.rotation.x = -Math.PI / 2; scene.add(sand);
    const nile = new Mesh(new PlaneGeometry(16, 220), new MeshLambertMaterial({ color: '#3f86c9' })); nile.rotation.x = -Math.PI / 2; nile.position.set(70, 0.02, 0); scene.add(nile);
    const green = new Mesh(new PlaneGeometry(22, 220), new MeshLambertMaterial({ color: '#8fb86a' })); green.rotation.x = -Math.PI / 2; green.position.set(52, 0.01, 0); scene.add(green);
    // 一層一層的石塊
    const stone = new MeshLambertMaterial({ color: '#cdb27c', transparent: true, opacity: 1 });
    const courses = [];
    for (let i = 0; i < COURSES; i++) {
      const y0 = (i / COURSES) * H, w = 2 * halfAt(B, H, (i + 0.5) / COURSES);
      const m = new Mesh(new BoxGeometry(w * S, (H / COURSES) * S * 0.98, w * S), stone);
      m.position.y = (y0 + H / COURSES / 2) * S; scene.add(m); courses.push(m);
    }
    // 完工後的外層：平滑的白色石灰岩外殼
    const casing = new Mesh(new ConeGeometry(B * S / Math.SQRT2, H * S, 4, 1), new MeshLambertMaterial({ color: '#f1ead7', transparent: true, opacity: 0.95 }));
    casing.rotation.y = Math.PI / 4; casing.position.y = H * S / 2; casing.visible = false; scene.add(casing);
    const rampMat = new MeshLambertMaterial({ color: '#b98c55', transparent: true, opacity: 0.95 });
    const rampG = new Group(); scene.add(rampG);
    const sleds = [];
    for (let i = 0; i < 6; i++) { const s = new Mesh(new SphereGeometry(0.45, 10, 8), new MeshLambertMaterial({ color: '#7a3b1e' })); scene.add(s); sleds.push(s); }
    const labs = labeler($('.al-labels'), cv, camera);
    const L = { nile: labs.add('wh-lab', 'Toward the Nile<i>往尼羅河</i>'), top: labs.add('wh-lab wh-lab-fb', ''), ramp: labs.add('wh-lab wh-lab-fa', '') };
    function resize() { const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 38 : 36; camera.updateProjectionMatrix(); }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('change', () => kick());
    view = { renderer, scene, camera, controls, courses, casing, stone, rampG, rampMat, sleds, labs, L };
    resize(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History pyramid model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  // 直坡道是一個楔形的土堤；其他坡道是一段一段貼著金字塔的平台
  function wedge(path, width) {
    const [a, b] = path; const w = width / 2;
    const v = [a.x - w, 0, a.z, a.x + w, 0, a.z, b.x - w, b.y, b.z, b.x + w, b.y, b.z, b.x - w, 0, b.z, b.x + w, 0, b.z].map((n) => n * S);
    const idx = [0, 2, 3, 0, 3, 1, 4, 2, 0, 1, 3, 5, 4, 5, 3, 4, 3, 2, 0, 1, 5, 0, 5, 4];
    const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(new Float32Array(v), 3)); g.setIndex(idx); g.computeVertexNormals();
    return g;
  }
  function buildRamp() {
    if (!view) return;
    const { rampG, rampMat } = view;
    while (rampG.children.length) { const c = rampG.children.pop(); c.geometry.dispose(); }
    const path = ramp(state.idea, B, H, state.p);
    if (path.length < 2) return;
    if (state.idea === 'straight') { rampG.add(new Mesh(wedge(path, 22), rampMat)); return; }
    for (let i = 1; i < path.length; i++) {
      const a = new Vector3(path[i - 1].x, path[i - 1].y, path[i - 1].z).multiplyScalar(S), b = new Vector3(path[i].x, path[i].y, path[i].z).multiplyScalar(S);
      const len = a.distanceTo(b), m = new Mesh(new BoxGeometry(1.0, 0.35, len), rampMat);
      m.position.copy(a).add(b).multiplyScalar(0.5); m.lookAt(b); rampG.add(m);
    }
  }
  function sledsAt(t) {
    if (!view) return;
    const path = ramp(state.idea, B, H, state.p), tot = pathLength(path);
    view.sleds.forEach((s, i) => {
      s.visible = tot > 0 && !state.casing;
      if (!s.visible) return;
      let d = ((t * 0.05 + i / view.sleds.length) % 1) * tot;
      for (let k = 1; k < path.length; k++) {
        const a = path[k - 1], b = path[k], seg = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
        if (d <= seg || k === path.length - 1) { const u = Math.min(1, d / seg); s.position.set((a.x + (b.x - a.x) * u) * S, (a.y + (b.y - a.y) * u) * S + 0.6, (a.z + (b.z - a.z) * u) * S); break; }
        d -= seg;
      }
    });
  }

  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  function update() {
    const p = state.p, f = builtFraction(p);
    $('.wh-py-h').textContent = `${Math.round(p * 100)}%`;
    $('.wh-py-v').textContent = f < 1 && f * 100 >= 99.5 ? `${(Math.floor(f * 1000) / 10).toFixed(1)}%` : `${Math.round(f * 100)}%`;   // 還沒蓋完不顯示 100%
    $('.wh-py-hm').textContent = `${fmt(H * p)} m`;
    const path = ramp(state.idea, B, H, p), len = pathLength(path);
    $('.wh-py-len').textContent = len ? `${fmt(len)} m` : '—';
    const vol = state.idea === 'straight' ? straightRampVolume(H, p) / pyramidVolume(B, H) : null;
    $('.wh-py-rv').textContent = vol == null ? '—' : `${Math.round(vol * 100)}%`;
    $('.wh-py-rvrow').hidden = vol == null;
    slider.setAttribute('aria-valuetext', `${Math.round(p * 100)}% of the height · 高度的 ${Math.round(p * 100)}%`);
    root.querySelectorAll('[data-idea]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.idea === state.idea));
    root.querySelectorAll('[data-idea-card]').forEach((c) => { c.hidden = c.dataset.ideaCard !== state.idea; });
    if (!view) return;
    const n = Math.floor(p * COURSES + 1e-9), frac = p * COURSES - n;
    view.courses.forEach((m, i) => { m.visible = !state.casing && (i < n || (i === n && frac > 0.02)); m.scale.y = i === n ? Math.max(0.02, frac) : 1; m.position.y = ((i / COURSES) * H + (i === n ? frac : 1) * H / COURSES / 2) * S; });
    view.stone.opacity = state.idea === 'internal' && !state.casing ? 0.4 : 1;
    view.casing.visible = state.casing;
    view.rampG.visible = !state.casing;
    buildRamp();
    const top = ramp(state.idea, B, H, p).slice(-1)[0];
    view.L.top.innerHTML = bi(`${Math.round(p * 100)}% of the height`, `高度的 ${Math.round(p * 100)}%`);
    view.L.top.dataset.y = H * p;
    view.L.ramp.innerHTML = bi(data.ideas.find((x) => x.key === state.idea).en, data.ideas.find((x) => x.key === state.idea).zh);
    view.L.ramp.dataset.at = top ? JSON.stringify(top) : '';
  }
  function render() {
    if (!view) return;
    const { labs, L, camera } = view;
    labs.place(L.nile, new Vector3(70, 1.5, 30), true);
    labs.place(L.top, new Vector3(0, (Number(L.top.dataset.y) || 0) * S + 2.2, 0), !state.casing);
    const at = L.ramp.dataset.at ? JSON.parse(L.ramp.dataset.at) : null;
    if (at) { const path = ramp(state.idea, B, H, state.p); const mid = path[Math.floor(path.length / 2)] || at; labs.place(L.ramp, new Vector3(mid.x * S, mid.y * S + 2.5, mid.z * S), !state.casing); }
    view.renderer.render(view.scene, camera);
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    let busy = false;
    if (state.playing) { state.p = Math.min(1, state.p + dt / 18); slider.value = Math.round(state.p * 1000); update(); busy = true; if (state.p >= 1) play(false); }
    sledsAt(t / 1000);
    if (view) view.controls.update();
    render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 600) raf = requestAnimationFrame(frame);       // 雪橇一直在動，多畫一會兒
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  function setP(p) { state.p = Math.min(1, Math.max(0, p)); slider.value = Math.round(state.p * 1000); if (state.p < 1 && state.casing) casing(false); update(); kick(); }
  function idea(k) { if (KINDS.includes(k)) { state.idea = k; if (state.casing) casing(false); update(); kick(); } }
  function casing(on) { state.casing = on; const tg = root.querySelector('[data-t="casing"]'); if (tg) tg.checked = on; if (on) { state.p = 1; slider.value = 1000; } update(); kick(); }
  function play(on) {
    state.playing = on; if (on && state.p >= 1) state.p = 0;
    if (on && state.casing) casing(false);
    playBtn.setAttribute('aria-pressed', on); playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : 'Build it · 蓋起來';
    root.classList.toggle('is-playing', on); kick();
  }
  slider.addEventListener('input', () => { if (state.playing) play(false); setP(slider.value / 1000); });
  playBtn.addEventListener('click', () => play(!state.playing));
  root.addEventListener('click', (ev) => { const b = ev.target.closest('[data-idea]'); if (b) idea(b.dataset.idea); });
  root.querySelectorAll('.al-tg input').forEach((inp) => inp.addEventListener('change', () => { if (inp.dataset.t === 'casing') casing(inp.checked); }));
  if (view) $('.al-home').addEventListener('click', () => { view.camera.position.set(48, 34, 62); view.controls.target.set(0, 4, 4); view.controls.update(); kick(); });
  const DEMOS = {
    half: () => { idea('straight'); setP(0.5); },
    straight: () => { idea('straight'); setP(0.9); },
    spiral: () => { idea('spiral'); setP(0.7); },
    finished: () => { casing(true); },
  };
  const api = {
    state, setP, idea, play, casing,
    demo(n) { if (DEMOS[n]) DEMOS[n](); },
    info() { return { p: state.p, idea: state.idea, built: builtFraction(state.p), rampLength: pathLength(ramp(state.idea, B, H, state.p)), casing: state.casing, webgl: !!view }; },
    render() { update(); render(); },
    ready: () => true,
  };
  update();
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-pyramid-lab]', init, { demo: (lab, v) => lab.demo(v) });
