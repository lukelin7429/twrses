/*
 * 生命與生態 · 第五課「種子怎麼知道什麼時候該發芽？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：種子是一株睡著的小植物加上一包便當。水、溫度、空氣都對了它才醒來；
 *   先長根（往下）、再長芽（往上），便當吃完之前要長出葉子、自己做食物。
 *
 * 場景：土壤的剖面，裡面一顆種子。三支滑桿：水、溫度、生長進度；兩個開關：倒過來放、放在暗處。
 *   條件不對 → 種子不醒（訊息說出原因）。倒過來放 → 根還是往下、芽還是往上。暗處 → 芽又長又白，葉子長不好。
 * 門檻與階段在 seedcalc.js（都是示意的數字）。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-seed.js
 * 除錯：document.querySelector('[data-lifeseed-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, Color, DirectionalLight, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { check, awake, stage, rootLen, shootLen, leafSize, lunch, holding } from './seedcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const GROUND = 1.4;
const WHY = {
  dry: ['Asleep: too dry', '還在睡：太乾了'], drowned: ['Asleep: no air', '還在睡：沒有空氣'], cold: ['Asleep: too cold', '還在睡：太冷了'], hot: ['Asleep: too hot', '還在睡：太熱了'],
  sleep: ['Ready to wake', '條件都對了'], swell: ['Waking up', '正在醒來'], root: ['Growing a root', '長出根'], shoot: ['Growing a shoot', '長出芽'], leaves: ['Opening its leaves', '展開葉子'],
};

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const SKY = new Color(0x16305e), NIGHT = new Color(0x070b16);
  scene.background = SKY.clone();
  const camera = new PerspectiveCamera(34, 1, 0.1, 140);
  const TARGET = V(0, 0.9, 0);
  const homePos = () => TARGET.clone().add(V(1.2, 1.2, 15.5).multiplyScalar(camera.aspect < 0.85 ? 1.45 : camera.aspect < 1.1 ? 1.12 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 50;
  controls.minAzimuthAngle = -1.1; controls.maxAzimuthAngle = 1.1; controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.6;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xffffff, 0x2a3040, 1.2); scene.add(hemi);
  scene.add(new AmbientLight(0xffffff, 0.4));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 8, 9); scene.add(dl);

  // ---------- 土壤：後面一面牆（剖面），上面一條地面 ----------
  const DRY = new Color(0xb38a5c), WET = new Color(0x5e3f26);
  const soilMat = new MeshStandardMaterial({ color: DRY.clone(), roughness: 1 });
  const soil = new Mesh(new BoxGeometry(9, 5.6, 0.5), soilMat); soil.position.set(0, GROUND - 2.8, -0.9); scene.add(soil);
  const topMat = new MeshStandardMaterial({ color: 0x4f8a3c, roughness: 1 });
  const top = new Mesh(new BoxGeometry(9, 0.12, 1.6), topMat); top.position.set(0, GROUND, -0.35); scene.add(top);
  const waterMat = new MeshStandardMaterial({ color: 0x2f7fe0, transparent: true, opacity: 0, depthWrite: false });
  const flood = new Mesh(new BoxGeometry(9, 5.6, 0.1), waterMat); flood.position.set(0, GROUND - 2.8, -0.6); scene.add(flood);

  // ---------- 種子：兩片便當（子葉）＋種皮＋一株小植物（胚） ----------
  const seedG = new Group(); scene.add(seedG);
  const lunchMat = new MeshStandardMaterial({ color: 0xead9a4, roughness: 0.7 });
  const coatMat = new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.6, transparent: true });
  const babyMat = new MeshStandardMaterial({ color: 0xcfe9a0, roughness: 0.6 });
  const ball = new SphereGeometry(1, 28, 20);
  const halves = [-1, 1].map((s) => { const m = new Mesh(ball, lunchMat); m.position.z = s * 0.13; seedG.add(m); return m; });
  const coat = new Mesh(ball, coatMat); coat.scale.set(0.62, 0.44, 0.36); seedG.add(coat);
  const baby = new Mesh(ball, babyMat); baby.scale.set(0.16, 0.1, 0.1); baby.position.set(-0.4, -0.12, 0); baby.rotation.z = 0.5; seedG.add(baby);

  // ---------- 根與芽：沿著曲線長出來的管子，每次重畫 ----------
  const rootMat = new MeshStandardMaterial({ color: 0xf3ead2, roughness: 0.7 });
  const shootMat = new MeshStandardMaterial({ color: 0x7fc65a, roughness: 0.6 });
  const leafMat = new MeshStandardMaterial({ color: 0x4fae45, roughness: 0.6 });
  const rootMesh = new Mesh(new BoxGeometry(0.01, 0.01, 0.01), rootMat), shootMesh = new Mesh(new BoxGeometry(0.01, 0.01, 0.01), shootMat);
  scene.add(rootMesh, shootMesh);
  const sides = [0.45, 0.62, 0.8].map((t, i) => { const m = new Mesh(new BoxGeometry(0.01, 0.01, 0.01), rootMat); m.userData = { t, dir: i % 2 ? 1 : -1 }; scene.add(m); return m; });
  const leaves = [-1, 1].map((s) => { const m = new Mesh(ball, leafMat); m.userData.s = s; scene.add(m); return m; });
  const tipR = V(0, 0, 0), tipS = V(0, 0, 0), E = V(0, 0, 0);
  const PALE = new Color(0xf1ecc9), GREEN = new Color(0x7fc65a), LEAF = new Color(0x4fae45), YELLOW = new Color(0xe6da7c);
  function tube(mesh, curve, frac, r) {
    mesh.visible = frac > 0.01;
    if (!mesh.visible) return curve.getPoint(0);
    const pts = []; for (let i = 0; i <= 20; i++) pts.push(curve.getPoint((i / 20) * frac));
    mesh.geometry.dispose();
    mesh.geometry = new TubeGeometry(new CatmullRomCurve3(pts), 28, r, 8, false);
    return pts[20];
  }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    coat: lab.add('cp-lb', 'Seed coat<small>種皮</small>'),
    food: lab.add('cp-lb', 'Stored food: the packed lunch<small>存好的養分：便當</small>'),
    baby: lab.add('cp-lb lf-lb-push', 'The baby plant<small>睡著的小植物</small>'),
    root: lab.add('cp-lb', 'Root<small>根</small>'),
    shoot: lab.add('cp-lb', 'Shoot<small>芽</small>'),
    leaf: lab.add('cp-lb lf-lb-push', 'First leaves<small>最早的葉子</small>'),
    ground: lab.add('cp-lb', 'Ground level<small>地面</small>'),
  };

  const R = { water: $('.lf-sd-water'), waterOut: $('.lf-sd-water-out'), temp: $('.lf-sd-temp'), tempOut: $('.lf-sd-temp-out'), g: $('.lf-sd-g'), gOut: $('.lf-sd-g-out'),
    bar: $('.lf-sd-bar'), status: $('.lf-sd-status'), state: $('.lf-sd-state'), part: $('.lf-sd-part'), msgs: [...root.querySelectorAll('.lf-sd-msg')], play: $('.al-play'),
    flip: $('[data-t="flip"]'), dark: $('[data-t="dark"]') };
  const state = { water: 60, temp: 25, g: 0, flip: false, light: true, labels: true, playing: true, hold: 0 };

  function layout() {
    const g = state.g, ok = awake(state.water, state.temp), wet = clamp(state.water / 100);
    soilMat.color.copy(DRY).lerp(WET, wet);
    waterMat.opacity = state.water > 85 ? 0.42 : 0;
    scene.background.copy(state.light ? SKY : NIGHT); hemi.intensity = state.light ? 1.2 : 0.75;
    const swell = 1 + 0.22 * clamp(g / 18), food = lunch(g) / 100, sz = swell * (0.55 + 0.45 * food);
    seedG.rotation.z = state.flip ? Math.PI : 0;
    halves.forEach((m) => m.scale.set(0.56 * sz, 0.4 * sz, 0.2 * sz));
    coat.scale.set(0.62 * swell, 0.44 * swell, 0.36 * swell); coatMat.opacity = 1 - clamp((g - 6) / 16); coat.visible = coatMat.opacity > 0.02;
    baby.visible = g < 24;
    const f = state.flip ? -1 : 1, dx = -f;                              // 胚在種子的一端；倒過來放就換到另一邊、另一頭
    E.set(-0.4 * f, -0.12 * f, 0);
    const rootCurve = new CatmullRomCurve3([E.clone(), V(E.x + dx * 0.4, E.y - 0.3, 0), V(E.x + dx * 0.62, E.y - 1.2, 0), V(E.x + dx * 0.5, E.y - 2.2, 0.05), V(E.x + dx * 0.55, -3.5, 0)]);
    const tall = state.light ? 1 : 1.3, topY = GROUND + 2.3 * tall;
    const shootCurve = new CatmullRomCurve3([E.clone(), V(E.x + dx * 0.3, E.y + 0.35, 0), V(dx * 0.95, 0.75, 0), V(dx * 0.9, GROUND + 0.3, 0), V(dx * 0.8, topY, 0)]);
    tipR.copy(tube(rootMesh, rootCurve, rootLen(g), 0.055));
    tipS.copy(tube(shootMesh, shootCurve, shootLen(g), state.light ? 0.07 : 0.055));
    const up = tipS.y > GROUND + 0.1;
    shootMat.color.copy(state.light && up ? GREEN : PALE);
    sides.forEach((m) => {
      const k = clamp((rootLen(g) - m.userData.t) / 0.2);
      m.visible = k > 0.02;
      if (!m.visible) return;
      const a = rootCurve.getPoint(m.userData.t), b = a.clone().add(V(m.userData.dir * 0.75 * k, -0.4 * k, 0));
      m.geometry.dispose(); m.geometry = new TubeGeometry(new CatmullRomCurve3([a, a.clone().lerp(b, 0.5).add(V(0, 0.06, 0)), b]), 8, 0.03, 6, false);
    });
    const ls = leafSize(g) * (state.light ? 1 : 0.45);
    leafMat.color.copy(state.light ? LEAF : YELLOW);
    leaves.forEach((m) => {
      m.visible = ls > 0.02;
      m.scale.set(0.5 * ls, 0.07 * ls + 0.01, 0.26 * ls);
      m.position.set(tipS.x + m.userData.s * 0.42 * ls, tipS.y + 0.05, 0); m.rotation.z = m.userData.s * 0.35;
    });
    return ok;
  }
  function updateLabels() {
    const on = state.labels, g = state.g, f = state.flip ? -1 : 1, tmp = V(0, 0, 0);
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.coat, on && g < 6, 0.2 * f, 0.5 * f, 0, -14 * f);
    show(L.food, on && g < 45, 0.45, -0.75, 0, 16);
    show(L.baby, on && g < 20, E.x - 0.9 * f, E.y, 0);
    show(L.root, on && rootLen(g) > 0.15, tipR.x - 0.75, tipR.y - 0.1, 0);
    show(L.shoot, on && shootLen(g) > 0.1 && leafSize(g) < 0.3, tipS.x - 0.75, tipS.y, 0);
    show(L.leaf, on && leafSize(g) >= 0.3, tipS.x, tipS.y + 0.6, 0);
    show(L.ground, on, 3.3, GROUND + 0.35, 0);
  }
  function readout() {
    const k = holding(state.water, state.temp, state.g, state.light), c = check(state.water, state.temp), s = c === 'go' ? stage(state.g) : c;
    R.water.value = state.water; R.waterOut.textContent = `${state.water}%`;
    R.temp.value = state.temp; R.tempOut.textContent = `${state.temp} °C`;
    R.g.value = Math.round(state.g); R.gOut.textContent = `${Math.round(state.g)}%`;
    R.bar.style.width = `${lunch(state.g)}%`;
    R.status.innerHTML = `${lunch(state.g)}% left<small class="zh">還剩 ${lunch(state.g)}%</small>`;
    const why = c !== 'go' && state.g > 1 ? [WHY[s][0].replace('Asleep', 'Stopped'), WHY[s][1].replace('還在睡', '停住了')] : WHY[s];
    R.state.innerHTML = `${why[0]}<small>${why[1]}</small>`;
    R.part.innerHTML = state.g < 20 ? 'Nothing yet<small>還沒有</small>' : state.g < 45 ? 'The root, going down<small>根，往下</small>' : state.g < 80 ? 'Root down, shoot up<small>根往下，芽往上</small>' : state.light ? 'Root, shoot, and green leaves<small>根、芽和綠色的葉子</small>' : 'A long pale shoot<small>又長又白的芽</small>';
    if (R.flip) R.flip.checked = state.flip;
    if (R.dark) R.dark.checked = !state.light;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.water != null) state.water = clamp(Math.round(+o.water), 0, 100);
    if (o.temp != null) state.temp = clamp(Math.round(+o.temp), 0, 40);
    if (o.g != null) state.g = clamp(+o.g, 0, 100);
    if (o.flip != null) state.flip = !!o.flip;
    if (o.light != null) state.light = !!o.light;
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v; state.hold = 0;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.water.addEventListener('input', () => set({ water: +R.water.value }));
  R.temp.addEventListener('input', () => set({ temp: +R.temp.value }));
  R.g.addEventListener('input', () => { setPlaying(false); set({ g: +R.g.value }); });
  R.play.addEventListener('click', () => { if (!state.playing && state.g >= 100) state.g = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="flip"]', (v) => set({ flip: v, g: 0 }));
  bind('[data-t="dark"]', (v) => set({ light: !v }));
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing && awake(state.water, state.temp)) {               // 條件不對就停在原地，不會長
      if (state.g >= 100 || state.g <= 0) {
        state.hold += dt;
        if (state.hold > (state.g >= 100 ? 3.5 : 1.6)) { state.hold = 0; state.g = state.g >= 100 ? 0 : 0.01; }
      } else state.g = Math.min(100, state.g + dt * 7);
      layout(); readout();
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting; last = 0;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '120px' }).observe(root);

  set({});
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    dry: () => { setPlaying(false); set({ water: 10, temp: 25, g: 0, flip: false, light: true }); },
    root: () => { setPlaying(false); set({ water: 60, temp: 25, g: 38, flip: false, light: true }); },
    flip: () => { set({ water: 60, temp: 25, g: 0.01, flip: true, light: true }); setPlaying(true); },
    dark: () => { setPlaying(false); set({ water: 60, temp: 25, g: 100, flip: false, light: false }); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：它會不會醒？（不需要 WebGL） ----------
function initWaker() {
  const el = document.querySelector('[data-life-waker]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), verdict = JSON.parse(el.dataset.verdict), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-wk-pick button')];
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0], r = check(it.water, it.temp), v = verdict[r];
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    q('.lf-wk-en').textContent = v.en; q('.lf-wk-zh').textContent = v.zh;
    q('.lf-wk-note').textContent = it.note_en; q('.lf-wk-note-zh').textContent = it.note_zh;
    el.dataset.k = it.key; el.dataset.r = r;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__wk = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWaker);
else initWaker();

lazyBoot('[data-lifeseed-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
