/*
 * 哲學 A6 · 柏拉圖的洞穴（《理想國》卷七 514a–517a）
 *
 * 一個場景、六個視角：全景剖面＋故事的五個階段（影子、火、上坡、太陽、回來）。
 * 牆上的影子是真的：火是一盞會投影的點光源，矮牆上移動的器物把影子打在洞底的牆上。
 * 幾何是照文本排的：囚徒面對洞底的牆；身後高處有火；火與囚徒之間有一條路，路邊一道矮牆。
 *
 * 除錯：document.querySelector('[data-ph-cave]').__lab（setStage(0–5)、state()）；網址加 #cave=3 可直接跳到階段。
 */
import {
  Scene, PerspectiveCamera, WebGLRenderer, Color, Vector3, Group, Mesh, PointLight, AmbientLight,
  MeshStandardMaterial, MeshBasicMaterial, BoxGeometry, SphereGeometry, CylinderGeometry, CapsuleGeometry,
  ConeGeometry, CircleGeometry, PlaneGeometry, TorusGeometry, Shape, ShapeGeometry, ExtrudeGeometry,
  BufferGeometry, Float32BufferAttribute, DoubleSide, BackSide, PCFSoftShadowMap, MathUtils, Fog,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const HALF = 6;                 // 洞穴半寬（z 方向）
const WALL_X = -18;             // 洞底的牆（影子的銀幕）
const PARAPET_X = -4;           // 矮牆
const FIRE = new Vector3(2, 2.0, 0);
const MOUTH_X = 22, MOUTH_Y = 9;

// 六個視角：相機位置、注視點、曝光、是否剖開（藏起近側岩壁與洞頂）
const VIEWS = [
  { pos: [2, 11, 31], look: [4, 4.2, 0], exp: 1.5, cut: true },          // 0 全景
  { pos: [-12.45, 1.12, 0], look: [-18, 3.0, 0], exp: 1.25, cut: false },   // 1 影子（囚徒的眼睛）
  { pos: [-11.5, 1.6, 3.2], look: [1.5, 2.0, -0.5], exp: 1.0, cut: false }, // 2 火
  { pos: [7.5, 3.4, 0.8], look: [22, 11.2, 0], exp: 1.1, cut: false },      // 3 上坡
  { pos: [24.5, 11.6, 7.5], look: [33.5, 10.6, -1.5], exp: 1.0, cut: true },// 4 太陽
  { pos: [-7.2, 2.6, 3.6], look: [-13.5, 1.0, 0], exp: 0.75, cut: false },  // 5 回來
];

function rock(color) { return new MeshStandardMaterial({ color, roughness: 0.95, metalness: 0, side: DoubleSide }); }

function quad(a, b, c, d) {
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute([...a, ...b, ...c, ...a, ...c, ...d], 3));
  g.computeVertexNormals();
  return g;
}

// 洞穴側面輪廓（x, y）：洞底 → 平地 → 斜坡 → 洞口；再沿洞頂回來
const PROFILE = [[WALL_X, 0], [4, 0], [MOUTH_X, MOUTH_Y], [MOUTH_X, MOUTH_Y + 4.2], [4, 7.2], [WALL_X, 6]];

function silhouette(points, depth = 0.06) {
  const s = new Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  return new ExtrudeGeometry(s, { depth, bevelEnabled: false });
}

// 矮牆上被舉著走的器物：瓶、馬、人像、鳥、樹（側影；厚度沿 x，面向火）
const PUPPETS = [
  [[-0.16, 0], [0.16, 0], [0.26, 0.28], [0.12, 0.5], [0.12, 0.62], [0.2, 0.7], [-0.2, 0.7], [-0.12, 0.62], [-0.12, 0.5], [-0.26, 0.28]],
  [[-0.42, 0], [-0.34, 0], [-0.3, 0.3], [0.14, 0.3], [0.18, 0], [0.26, 0], [0.28, 0.34], [0.4, 0.62], [0.56, 0.6], [0.6, 0.72], [0.42, 0.86], [0.26, 0.6], [-0.3, 0.56], [-0.5, 0.36]],
  [[-0.1, 0], [0.1, 0], [0.12, 0.36], [0.26, 0.3], [0.3, 0.38], [0.12, 0.52], [0.1, 0.6], [0.16, 0.7], [0.1, 0.84], [-0.1, 0.84], [-0.16, 0.7], [-0.1, 0.6], [-0.12, 0.52], [-0.3, 0.38], [-0.26, 0.3], [-0.12, 0.36]],
  [[-0.5, 0.34], [-0.1, 0.3], [0, 0.1], [0.12, 0.3], [0.44, 0.38], [0.58, 0.5], [0.4, 0.5], [0.1, 0.5], [0, 0.74], [-0.12, 0.48]],
  [[-0.05, 0], [0.05, 0], [0.05, 0.3], [0.3, 0.34], [0.36, 0.58], [0.16, 0.82], [-0.16, 0.82], [-0.36, 0.58], [-0.3, 0.34], [-0.05, 0.3]],
];

function person(color, seated) {
  const g = new Group();
  const mat = new MeshStandardMaterial({ color, roughness: 0.8 });
  const body = new Mesh(new CapsuleGeometry(0.2, seated ? 0.38 : 0.74, 4, 10), mat);
  body.position.y = seated ? 0.52 : 0.92;
  const head = new Mesh(new SphereGeometry(0.17, 16, 12), mat);
  head.position.y = seated ? 1.05 : 1.62;
  g.add(body, head);
  if (seated) {
    const legs = new Mesh(new CapsuleGeometry(0.13, 0.5, 4, 8), mat);
    legs.rotation.z = Math.PI / 2; legs.position.set(-0.36, 0.2, 0);
    g.add(legs);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  return g;
}

function init(root) {
  const canvas = root.querySelector('canvas');
  const labelBox = root.querySelector('[data-cave-labels]');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true }); }
  catch (e) { root.classList.add('ph-cave-nogl'); return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const scene = new Scene();
  const DARK = new Color(0x05070c), SKY = new Color(0x9fd0f2);
  scene.background = DARK.clone();
  const camera = new PerspectiveCamera(52, 16 / 9, 0.1, 400);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.enablePan = false;
  controls.minDistance = 0.6; controls.maxDistance = 70; controls.zoomSpeed = 0.7;

  // ---- 洞穴 ----
  const cave = new Group(); scene.add(cave);
  const rk = rock(0x6d6257), rkDark = rock(0x7d7166), screenMat = rock(0x9a8d7c);
  const P = PROFILE;
  const floor1 = new Mesh(quad([P[0][0], 0, -HALF], [P[0][0], 0, HALF], [4, 0, HALF], [4, 0, -HALF]), rk);
  const floor2 = new Mesh(quad([4, 0, -HALF], [4, 0, HALF], [MOUTH_X, MOUTH_Y, HALF], [MOUTH_X, MOUTH_Y, -HALF]), rk);
  const back = new Mesh(quad([WALL_X, 0, HALF], [WALL_X, 0, -HALF], [WALL_X, 6, -HALF], [WALL_X, 6, HALF]), screenMat);
  const far = new Mesh(new ShapeGeometry((() => { const s = new Shape(); P.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); return s; })()), rkDark);
  far.position.z = -HALF;
  const near = far.clone(); near.position.z = HALF;
  const ceil1 = new Mesh(quad([WALL_X, 6, -HALF], [4, 7.2, -HALF], [4, 7.2, HALF], [WALL_X, 6, HALF]), rkDark);
  const ceil2 = new Mesh(quad([4, 7.2, -HALF], [MOUTH_X, MOUTH_Y + 4.2, -HALF], [MOUTH_X, MOUTH_Y + 4.2, HALF], [4, 7.2, HALF]), rkDark);
  [floor1, floor2, back, far].forEach((m) => { m.receiveShadow = true; });
  cave.add(floor1, floor2, back, far, near, ceil1, ceil2);
  const cutaway = [near, ceil1, ceil2];

  // 路與矮牆
  const road = new Mesh(new BoxGeometry(2.2, 0.16, HALF * 2), rock(0x7a6c5c)); road.position.set(PARAPET_X + 1.3, 0.08, 0); road.receiveShadow = true;
  const parapet = new Mesh(new BoxGeometry(0.34, 1.3, HALF * 2), rock(0x8a7a66)); parapet.position.set(PARAPET_X, 0.65, 0); parapet.castShadow = true; parapet.receiveShadow = true;
  cave.add(road, parapet);

  // 囚徒：面向洞底的牆（-x），頸上有環、鍊子拴在地上
  const prisoners = new Group(); cave.add(prisoners);
  const chainMat = new MeshStandardMaterial({ color: 0x9aa3ad, metalness: 0.7, roughness: 0.4 });
  [-3.2, -1.6, 0, 1.6, 3.2].forEach((z, i) => {
    const p = person([0xb9a88f, 0xa8947c, 0xc2b29a, 0xa08c74, 0xb4a48c][i], true); p.position.set(-12, 0, z);
    const ring = new Mesh(new TorusGeometry(0.2, 0.035, 8, 20), chainMat); ring.rotation.x = Math.PI / 2; ring.position.y = 0.86; p.add(ring);
    const chain = new Mesh(new CylinderGeometry(0.02, 0.02, 0.9, 6), chainMat); chain.position.set(0.3, 0.42, 0); chain.rotation.z = -0.5; p.add(chain);
    prisoners.add(p);
  });

  // 舉著器物走的人（蹲在矮牆後，看不到）與器物
  const puppets = new Group(); cave.add(puppets);
  const pupMat = new MeshStandardMaterial({ color: 0x3a2f28, roughness: 0.9 });
  const carriers = PUPPETS.map((pts, i) => {
    const g = new Group();
    const fig = new Mesh(silhouette(pts.map(([x, y]) => [x * 0.95, y * 0.95])), pupMat);
    fig.rotation.y = Math.PI / 2; fig.position.set(0, 1.9, 0); fig.castShadow = true;
    const stick = new Mesh(new CylinderGeometry(0.02, 0.02, 0.9, 6), pupMat); stick.position.set(0, 1.5, 0); stick.castShadow = true;
    const man = person(0x4a4038, false); man.scale.setScalar(0.66); man.position.set(0.55, 0.16, 0);
    g.add(fig, stick, man); g.position.x = PARAPET_X + 0.45; g.userData.phase = i / PUPPETS.length;
    puppets.add(g); return g;
  });

  // 火
  const fire = new Group(); fire.position.copy(FIRE); cave.add(fire);
  const flameMat = new MeshBasicMaterial({ color: 0xffb347 });
  const flames = [0.42, 0.3, 0.2].map((r, i) => { const m = new Mesh(new ConeGeometry(r, r * 2.6, 12), i ? new MeshBasicMaterial({ color: i === 1 ? 0xffd27a : 0xfff3c4 }) : flameMat); m.position.y = r * 0.9 - 0.3; fire.add(m); return m; });
  const logs = new Mesh(new CylinderGeometry(0.5, 0.62, 0.3, 10), rock(0x2c231d)); logs.position.y = -0.62; fire.add(logs);
  const stand = new Mesh(new CylinderGeometry(0.7, 0.9, 1.25, 10), rock(0x4a4038)); stand.position.set(FIRE.x, 0.62, 0); cave.add(stand);
  const fireLight = new PointLight(0xff9a3c, 95, 46, 1.6);
  fireLight.position.copy(FIRE); fireLight.castShadow = true;
  fireLight.shadow.mapSize.set(2048, 2048); fireLight.shadow.camera.near = 0.3; fireLight.shadow.camera.far = 30; fireLight.shadow.bias = -0.004;
  scene.add(fireLight);
  const ambient = new AmbientLight(0x8fa3c8, 0.16); scene.add(ambient);
  const spill = new PointLight(0xdcecff, 60, 26, 1.4); spill.position.set(MOUTH_X - 1, MOUTH_Y + 3, 0); scene.add(spill);

  // ---- 洞外（不受洞內燈光影響：用不打光的材質） ----
  const out = new Group(); scene.add(out);
  const basic = (c, o = 1) => new MeshBasicMaterial({ color: c, transparent: o < 1, opacity: o, side: DoubleSide });
  const ground = new Mesh(new PlaneGeometry(60, 60), basic(0x8bbf6a)); ground.rotation.x = -Math.PI / 2; ground.position.set(MOUTH_X + 30, MOUTH_Y - 0.01, 0); out.add(ground);
  const cliff = new Mesh(new PlaneGeometry(60, 9), basic(0x6f655b)); cliff.rotation.y = Math.PI / 2; cliff.position.set(MOUTH_X + 0.02, MOUTH_Y - 4.5, 0); out.add(cliff);
  const tree = new Group(); tree.position.set(33, MOUTH_Y, -3.5); out.add(tree);
  const trunk = new Mesh(new CylinderGeometry(0.22, 0.3, 2.2, 8), basic(0x7a5a3c)); trunk.position.y = 1.1; tree.add(trunk);
  [[0, 3, 0, 1.25], [0.8, 2.6, 0.3, 0.9], [-0.8, 2.7, -0.2, 0.95]].forEach(([x, y, z, r]) => { const b = new Mesh(new SphereGeometry(r, 14, 10), basic(0x3f8f4f)); b.position.set(x, y, z); tree.add(b); });
  const shade = new Mesh(new CircleGeometry(1.7, 24), basic(0x3d5a36, 0.55)); shade.rotation.x = -Math.PI / 2; shade.scale.set(1.6, 1, 1); shade.position.set(31, MOUTH_Y + 0.02, -2.6); out.add(shade);
  const pond = new Mesh(new CircleGeometry(2.6, 36), basic(0x6fb6d9)); pond.rotation.x = -Math.PI / 2; pond.scale.set(1.5, 1, 1); pond.position.set(34.5, MOUTH_Y + 0.02, 2.2); out.add(pond);
  // 水中倒影：樹（平貼在水面上的深色剪影）與太陽
  const reflMat = basic(0x2f6f86, 0.75);
  [[33.4, 1.2, 0.9], [34.1, 1.9, 0.7], [33.0, 2.0, 0.65]].forEach(([x, z, r]) => { const c = new Mesh(new CircleGeometry(r, 20), reflMat); c.rotation.x = -Math.PI / 2; c.position.set(x, MOUTH_Y + 0.035, z); out.add(c); });
  const reflTrunk = new Mesh(new PlaneGeometry(0.3, 1.5), reflMat); reflTrunk.rotation.x = -Math.PI / 2; reflTrunk.position.set(33.3, MOUTH_Y + 0.035, 0.2); out.add(reflTrunk);
  const sunRefl = new Mesh(new CircleGeometry(0.42, 20), basic(0xfff6c8, 0.9)); sunRefl.rotation.x = -Math.PI / 2; sunRefl.position.set(36.4, MOUTH_Y + 0.04, 2.9); out.add(sunRefl);
  const sky = new Mesh(new PlaneGeometry(400, 220), basic(0x9fd0f2)); sky.rotation.y = -Math.PI / 2; sky.position.set(120, MOUTH_Y + 40, 0); out.add(sky);
  const sun = new Mesh(new SphereGeometry(3.2, 24, 16), basic(0xfff6c8)); sun.position.set(74, MOUTH_Y + 17, -20); out.add(sun);
  const halo = new Mesh(new SphereGeometry(5.6, 24, 16), basic(0xfff1a8, 0.28)); halo.position.copy(sun.position); out.add(halo);

  // 被釋放的那個人
  const freed = person(0xf2d9a0, false); cave.add(freed);
  const FREED = [[-10.2, 0, 1.8, -1.2], [-12, 0, -1.6, Math.PI], [-9.4, 0, 2.2, 0.2], [13, 4.5, 0.6, 0], [29.5, MOUTH_Y, 1.5, 0.5], [-9.6, 0, 2.2, Math.PI * 0.9]];

  // ---- 標籤（全景才顯示） ----
  const LABELS = [
    ['Shadows on the wall', '牆上的影子', [WALL_X, 4.2, 0]], ['Prisoners', '囚徒', [-12, 1.7, 3.2]], ['Low wall', '矮牆', [PARAPET_X, 1.6, 5.4]],
    ['Carriers and figures', '舉著器物的人', [PARAPET_X + 0.6, 3.0, -1]], ['Fire', '火', [FIRE.x, 3.5, 0]], ['Steep ascent', '陡坡', [13, 6.2, 0]],
    ['Mouth of the cave', '洞口', [MOUTH_X, MOUTH_Y + 4.6, 0]], ['Reflections', '水中倒影', [34.5, MOUTH_Y + 0.6, 3.4]], ['The sun', '太陽', [44, MOUTH_Y + 7, -7]],
  ].map(([en, zh, p]) => { const s = document.createElement('span'); s.className = 'ph-cave-lab'; s.style.opacity = 0; s.innerHTML = `${en}<i lang="zh-Hant">${zh}</i>`; labelBox.appendChild(s); return { s, v: new Vector3(...p) }; });
  const proj = new Vector3();

  // ---- 視角切換 ----
  let stage = 0, t0 = 0, tween = null, showLabels = true;
  const from = { pos: new Vector3(), look: new Vector3(), exp: 1 };
  function setStage(n, instant) {
    stage = Math.max(0, Math.min(5, n | 0));
    const v = VIEWS[stage];
    from.pos.copy(camera.position); from.look.copy(controls.target); from.exp = renderer.toneMappingExposure;
    tween = { t: 0, dur: instant ? 0.001 : 2.2, to: v };
    cutaway.forEach((m) => { m.visible = !v.cut; });
    const f = FREED[stage]; freed.position.set(f[0], f[1], f[2]); freed.rotation.y = f[3];
    freed.visible = stage !== 1;
    sky.visible = stage !== 0;
    root.setAttribute('data-stage', String(stage));
    root.querySelectorAll('[data-cave-stage]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-cave-stage') === stage ? 'true' : 'false'));
    root.querySelectorAll('[data-cave-cap]').forEach((c) => { c.hidden = +c.getAttribute('data-cave-cap') !== stage; });
    // 眼睛適應：出洞時白光刺眼，回洞時一片漆黑
    const veil = root.querySelector('[data-cave-veil]');
    if (veil && !instant) { veil.className = 'ph-cave-veil ' + (stage === 4 ? 'is-glare' : stage === 5 ? 'is-dark' : ''); void veil.offsetWidth; if (stage === 4 || stage === 5) veil.classList.add('go'); }
  }
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  let last = performance.now(), clock = 0;
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000); last = now; clock += dt;
    if (tween) {
      tween.t = Math.min(1, tween.t + dt / tween.dur); const k = ease(tween.t), v = tween.to;
      camera.position.lerpVectors(from.pos, new Vector3(...v.pos), k);
      controls.target.lerpVectors(from.look, new Vector3(...v.look), k);
      renderer.toneMappingExposure = MathUtils.lerp(from.exp, v.exp, k);
      if (tween.t >= 1) tween = null;
    }
    controls.update();
    // 器物沿矮牆來回走（z 方向），火光閃動
    carriers.forEach((g) => { const u = (clock * 0.045 + g.userData.phase) % 1; g.position.z = MathUtils.lerp(HALF + 1.5, -HALF - 1.5, u); });
    const fl = 1 + 0.1 * Math.sin(clock * 9.1) + 0.06 * Math.sin(clock * 23.7);
    fireLight.intensity = 95 * fl; flames.forEach((m, i) => { m.scale.y = fl + 0.08 * Math.sin(clock * (13 + i * 5)); });
    // 背景：相機愈靠近洞口與洞外，天愈亮
    const outside = MathUtils.clamp((camera.position.x - 6) / 16, 0, 1);
    scene.background.lerpColors(DARK, SKY, stage === 0 ? 0.0 : outside);
    if (stage === 0) scene.background.set(0x0d1420);
    ambient.intensity = MathUtils.lerp(ambient.intensity, stage === 0 ? 2.4 : stage === 5 ? 0.08 : 0.16, 0.08);
    renderer.render(scene, camera);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    LABELS.forEach(({ s, v }) => {
      proj.copy(v).project(camera);
      const on = showLabels && stage === 0 && proj.z < 1 && Math.abs(proj.x) < 1 && Math.abs(proj.y) < 1;
      s.style.opacity = on ? 1 : 0;
      s.style.transform = `translate(${(proj.x * 0.5 + 0.5) * w}px, ${(-proj.y * 0.5 + 0.5) * h}px) translate(-50%, -50%)`;
    });
  }
  // rAF 在背景分頁會停；用 setInterval 當後備，確保截圖與背景面板也有畫面
  let raf = 0, lastRaf = 0;
  const loop = (now) => { lastRaf = now; frame(now); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  setInterval(() => { const now = performance.now(); if (now - lastRaf > 300) frame(now); }, 120);

  root.querySelectorAll('[data-cave-stage]').forEach((b) => b.addEventListener('click', () => setStage(+b.getAttribute('data-cave-stage'))));
  const next = root.querySelector('[data-cave-next]'); if (next) next.addEventListener('click', () => setStage(stage >= 5 ? 0 : stage + 1));
  const lab = root.querySelector('[data-cave-toggle-labels]'); if (lab) lab.addEventListener('click', () => { showLabels = !showLabels; lab.setAttribute('aria-pressed', showLabels ? 'true' : 'false'); });
  const home = root.querySelector('[data-cave-home]'); if (home) home.addEventListener('click', () => setStage(stage));

  resize(); renderer.toneMappingExposure = 1.5;
  camera.position.set(...VIEWS[0].pos); controls.target.set(...VIEWS[0].look);
  const m = /cave=(\d)/.exec(location.hash); setStage(m ? +m[1] : 0, true);
  root.classList.add('ph-cave-ready');
  return { setStage, state: () => ({ stage, cam: camera.position.toArray().map((v) => +v.toFixed(2)), shadows: renderer.shadowMap.enabled, carriers: carriers.map((g) => +g.position.z.toFixed(2)) }), renderer, scene, camera };
}

function boot() {
  const root = document.querySelector('[data-ph-cave]');
  if (!root) return;
  let started = false;
  const start = () => { if (started) return; started = true; root.__lab = init(root); };
  if (/cave=\d/.test(location.hash) || !('IntersectionObserver' in window)) { start(); return; }
  const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
  io.observe(root);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
