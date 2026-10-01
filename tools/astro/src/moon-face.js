/*
 * 天文教育 · 第十三課「月亮為什麼總是同一面對著我們？」的 3D 模型。
 *
 * 一個機制：同步自轉——月亮自轉一圈正好等於繞地球一圈（27.32 天），所以永遠同一面朝向地球。
 * 左 太空視角：地球在原點，月亮沿橢圓軌道繞行（克卜勒方程式，偏心率 0.055），月面上插一支「正面箭頭」。
 *   三種自轉可以切換：真實（同步）、不自轉、轉太快（每繞一圈轉兩圈）。真實模式下自轉等速、公轉忽快忽慢，
 *   自轉軸又和軌道面斜 6.7°——所以箭頭會在地月連線兩旁微微擺動（天平動），可以放大 3 倍看清楚。
 * 右 從地球看：另一個小場景，相機在地球上對著月亮（第一課的 Lommel–Seeliger 月面著色），看得出永遠同一張臉。
 * 月面花紋：common.js 的 makeMoonTexture（近地面中心在 mesh 的 +X，東經在右）。
 *
 * 產物：cd tools/astro && npm run build → assets/js/moon-face.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Float32BufferAttribute,
  Group, Line, LineBasicMaterial, LineDashedMaterial, LineLoop, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, atmosphereMaterial, glowTexture, makeMoonTexture, skyMoonMaterial, starField } from './common.js';
import { makeClouds, makeRealEarth } from './earthmap.js';
import { SIDEREAL, diskToSeleno, libration, librationExtremes, librationPath, moonPhase } from './libration.js';

const D = 9;                 // 地月平均距離（畫面單位；真實是 60 個地球半徑，這裡壓縮）
const RM = 0.8;              // 月球半徑（放大約 3 倍）
const E0 = 0.0549;           // 月球軌道偏心率
const TILT = 6.68;           // 月球自轉軸對軌道面法線的傾角（度）
const YEAR = 365.256;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 克卜勒方程式：平近點角 M（弧度）→ 真近點角。 */
function trueAnomaly(M, e) {
  let E = M;
  for (let k = 0; k < 8; k++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), skyCv = $('.mf-sky-cv');
  let renderer, skyRenderer;
  try {
    renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true });
    skyRenderer = new WebGLRenderer({ canvas: skyCv, antialias: true });
  } catch (e) { root.classList.add('al-nogl'); return null; }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr); skyRenderer.setPixelRatio(dpr);
  const state = { t: 0, playing: false, speed: 2, mode: 'locked', boost: 1, arrow: true };

  const moonTex = makeMoonTexture(), earthTex = makeRealEarth(), cloudTex = makeClouds();
  // ---------------- 太空視角 ----------------
  const scene = new Scene(); scene.background = new Color(0x050814);
  const camera = new PerspectiveCamera(40, 1.6, 0.05, 6000);
  const controls = new OrbitControls(camera, spaceCv);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false; controls.minDistance = 3; controls.maxDistance = 60;
  scene.add(starField(1800, 2500, 99, 1.6));
  scene.add(new AmbientLight(0xb8c6ff, 0.22));
  const sunLight = new DirectionalLight(0xfff4e0, 3.0); scene.add(sunLight);
  const sun = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.3, 'rgba(255,190,80,.4)'], [1, 'rgba(255,120,20,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
  sun.scale.setScalar(9); scene.add(sun);
  const earth = new Mesh(new SphereGeometry(1, 64, 48), new MeshLambertMaterial({ map: earthTex })); scene.add(earth);
  const clouds = new Mesh(new SphereGeometry(1.012, 48, 32), new MeshLambertMaterial({ map: cloudTex, transparent: true, depthWrite: false })); scene.add(clouds);
  scene.add(new Mesh(new SphereGeometry(1.1, 48, 32), atmosphereMaterial()));
  // 軌道（橢圓，跟著偏心率放大重畫）
  const orbit = new LineLoop(new BufferGeometry().setAttribute('position', new Float32BufferAttribute(new Float32Array(256 * 3), 3)), new LineBasicMaterial({ color: 0x9fb0cf, transparent: true, opacity: 0.45 }));
  scene.add(orbit);
  // 月亮：tiltG（自轉軸的傾斜，空間中固定）⊃ spinG（自轉）⊃ 月球＋正面箭頭
  const moonG = new Group(); scene.add(moonG);
  const tiltG = new Group(); moonG.add(tiltG);
  const spinG = new Group(); tiltG.add(spinG);
  const moon = new Mesh(new SphereGeometry(RM, 64, 48), new MeshLambertMaterial({ map: moonTex })); spinG.add(moon);
  const arrowG = new Group(); spinG.add(arrowG);
  {
    const mat = new MeshBasicMaterial({ color: 0xff7a5c });
    const shaft = new Mesh(new CylinderGeometry(0.035, 0.035, 0.9, 12), mat); shaft.rotation.z = -Math.PI / 2; shaft.position.x = RM + 0.45; arrowG.add(shaft);
    const head = new Mesh(new ConeGeometry(0.11, 0.26, 16), mat); head.rotation.z = -Math.PI / 2; head.position.x = RM + 0.98; arrowG.add(head);
  }
  // 地月連線（虛線）
  const sight = new Line(new BufferGeometry().setFromPoints([new Vector3(), new Vector3(1, 0, 0)]), new LineDashedMaterial({ color: 0x9fe8de, dashSize: 0.3, gapSize: 0.25, transparent: true, opacity: 0.7 }));
  scene.add(sight);

  // ---------------- 從地球看 ----------------
  const skyScene = new Scene(); skyScene.background = new Color(0x02040c);
  skyScene.add(starField(500, 300, 7, 1.4));
  const skyMat = skyMoonMaterial(moonTex);
  skyMat.uniforms.earthshine.value = 0.1;   // 暗面也留一點光，才看得出「同一張臉」
  const skyMoon = new Mesh(new SphereGeometry(1, 96, 64), skyMat); skyScene.add(skyMoon);
  const skyCam = new PerspectiveCamera(7.5, 1, 0.1, 1000);

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const L = { earth: mk('mf-earth', 'Earth · 地球'), moon: mk('moon', 'Moon · 月亮'), arrow: mk('mf-arrow', 'Near-side arrow · 正面箭頭'), sun: mk('sun', '&#9728; Sunlight · 陽光') };
  const proj = new Vector3();
  let shown = new Set(), prevShown = new Set(), cw = 0, ch = 0;
  function place(el, v, dy = 6) {
    proj.copy(v).project(camera);
    if (proj.z > 1 || Math.abs(proj.x) > 1.02 || Math.abs(proj.y) > 1.02) return false;
    el.style.opacity = 1; shown.add(el);
    el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * cw}px, ${(-proj.y * 0.5 + 0.5) * ch + dy}px) translate(-50%, 0)`;
    return true;
  }

  // ---------------- 狀態 ----------------
  const R = { day: $('.mf-day'), spin: $('.mf-spin'), off: $('.mf-off'), face: $('.mf-face'), note: $('.mf-note') };
  let geo = { pos: new Vector3(), M: 0, nu: 0 };
  function orbitShape() {
    const e = E0 * state.boost, a = orbit.geometry.attributes.position.array;
    for (let k = 0; k < 256; k++) { const nu = (k / 256) * TAU, r = D * (1 - e * e) / (1 + e * Math.cos(nu)); a.set([r * Math.cos(nu), 0, -r * Math.sin(nu)], k * 3); }
    orbit.geometry.attributes.position.needsUpdate = true;
    tiltG.rotation.set(0, 0, TILT * state.boost * DEG);
  }
  function update() {
    const t = state.t, e = E0 * state.boost;
    const M = (t / SIDEREAL) * TAU, nu = trueAnomaly(M, e), r = D * (1 - e * e) / (1 + e * Math.cos(nu));
    const pos = new Vector3(r * Math.cos(nu), 0, -r * Math.sin(nu));
    moonG.position.copy(pos);
    // 自轉角（繞 Y）：+X 指向地球需要 nu + π；真實是等速的 M + π
    const spin = state.mode === 'locked' ? M + Math.PI : state.mode === 'fast' ? 2 * M + Math.PI : Math.PI;
    spinG.rotation.y = spin;
    arrowG.visible = state.arrow;
    // 太陽方向：每年繞一圈（從北方看逆時針），月相就跟著變；第 0 天接近滿月，月面最清楚
    const s = (t / YEAR) * TAU + Math.PI - 0.25, sunDir = new Vector3(Math.cos(s), 0, -Math.sin(s));
    sunLight.position.copy(sunDir); sun.position.copy(sunDir.clone().multiplyScalar(60));
    earth.rotation.y = t * TAU; clouds.rotation.y = t * TAU * 1.03;
    sight.geometry.setFromPoints([new Vector3(), pos]); sight.computeLineDistances();
    geo = { pos, M, nu, spin, sunDir };
    // 從地球看：相機在 (地球 − 月球) 方向，月球在原點、方向照抄
    moonG.updateMatrixWorld(true);
    spinG.getWorldQuaternion(skyMoon.quaternion);
    const toEarth = pos.clone().negate().normalize();
    skyCam.position.copy(toEarth.clone().multiplyScalar(18)); skyCam.up.set(0, 1, 0); skyCam.lookAt(0, 0, 0); skyCam.updateMatrixWorld();
    skyMat.uniforms.sunDir.value.copy(sunDir).transformDirection(skyCam.matrixWorldInverse);
    readouts();
  }
  function readouts() {
    const t = state.t, orbits = t / SIDEREAL, turns = state.mode === 'locked' ? orbits : state.mode === 'fast' ? 2 * orbits : 0;
    R.day.innerHTML = `Day ${t.toFixed(1)}<span>第 ${t.toFixed(1)} 天</span>`;
    R.spin.innerHTML = `${orbits.toFixed(2)} orbits, ${turns.toFixed(2)} spins<span>繞地球 ${orbits.toFixed(2)} 圈，自轉 ${turns.toFixed(2)} 圈</span>`;
    // 箭頭偏離地月連線多少度（從地球看月面左右轉了多少）
    const off = ((((geo.spin - Math.PI - geo.nu) / DEG) % 360) + 540) % 360 - 180;
    R.off.innerHTML = `${off >= 0 ? '+' : ''}${off.toFixed(1)}°<span>${state.mode === 'locked' ? '左右擺動不超過 ' + (7.9 * state.boost).toFixed(0) + '°：天平動' : '一直在變：月面會轉走'}</span>`;
    R.face.innerHTML = state.mode === 'locked' ? 'Always the same face<span>永遠是同一張臉</span>' : state.mode === 'nospin' ? 'A different side every week<span>每週換一面</span>' : 'Spins past us twice a month<span>一個月轉過我們兩次</span>';
    R.note.innerHTML = state.mode === 'locked'
      ? 'Real Moon: one spin for every trip around Earth. The arrow stays near the Earth–Moon line.<span>真實的月亮：繞地球一圈、自轉一圈，箭頭一直貼著地月連線。</span>'
      : state.mode === 'nospin' ? 'If the Moon did not spin, the arrow would point the same way in space, and Earth would see every side in turn.<span>如果月亮不自轉，箭頭永遠指向太空中同一個方向，地球會輪流看到每一面。</span>'
        : 'Spinning too fast, the Moon would show us its far side too.<span>轉太快的話，背面也會轉過來給我們看。</span>';
  }

  // ---------------- 相機 ----------------
  const HOME = new Vector3(3.5, 12, 11.5);
  camera.position.copy(HOME); controls.target.set(0, 0, 0);
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false); camera.aspect = w / h;
      const hMin = (camera.aspect < 1.1 ? 66 : 58) * DEG;
      camera.fov = Math.max(40, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    const s = skyCv.parentElement.clientWidth;
    if (s) skyRenderer.setSize(s, s, false);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(skyCv.parentElement);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play'), slider = $('.mf-time');
  function setT(t) {
    state.t = Math.max(0, t);
    slider.value = String(state.t % (2 * SIDEREAL)); slider.style.setProperty('--p', `${(state.t % (2 * SIDEREAL)) / (2 * SIDEREAL) * 100}%`);
    update();
  }
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setMode(m) {
    state.mode = m;
    $$('.mf-mode button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === m ? 'true' : 'false'));
    update();
  }
  function setSpeed(v) { state.speed = v; $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.speed === v ? 'true' : 'false')); }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(+b.dataset.speed); if (!state.playing) setPlaying(true); }));
  $$('.mf-mode button').forEach((b) => b.addEventListener('click', () => { setMode(b.dataset.mode); root.classList.remove('al-fresh'); }));
  slider.addEventListener('input', () => { setPlaying(false); setT(parseFloat(slider.value)); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="arrow"]', (v) => { state.arrow = v; update(); });
  bind('[data-t="boost"]', (v) => { state.boost = v ? 3 : 1; orbitShape(); update(); });
  $('.al-home').addEventListener('click', () => { camera.position.copy(HOME); controls.target.set(0, 0, 0); });

  function updateLabels() {
    cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set();
    place(L.earth, new Vector3(0, -1.2, 0), 8);
    place(L.moon, geo.pos.clone().add(new Vector3(0, -RM - 0.2, 0)), 8);
    if (state.arrow) { const tip = new Vector3(RM + 1.2, 0, 0).applyQuaternion(spinG.getWorldQuaternion(spinG.quaternion.clone())).add(geo.pos); place(L.arrow, tip, -26); }
    place(L.sun, geo.sunDir.clone().multiplyScalar(14), 0);
    for (const el of prevShown) if (!shown.has(el)) el.style.opacity = 0;
  }

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function render() { controls.update(); updateLabels(); renderer.render(scene, camera); skyRenderer.render(skyScene, skyCam); }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setT(state.t + dt * state.speed);
    render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  resize(); orbitShape(); setT(0);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setMode, setPlaying, render };
  return { setMode };
}

// ---------------------------------------------------------------------------
// 頁面下方：今晚的月亮（真實天平動＋月相，用同一張月面貼圖正射投影），以及這個月的天平動路徑
function drawMoonDisk(cv, tex, l, b, phase) {
  const W = cv.clientWidth || 260, dpr = Math.min(window.devicePixelRatio || 1, 2), N = Math.round(W * dpr);
  if (cv.width !== N || cv.height !== N) { cv.width = N; cv.height = N; }
  const c = cv.getContext('2d'), img = c.createImageData(N, N), src = tex.image, sw = src.width, sh = src.height;
  const sd = src.getContext('2d').getImageData(0, 0, sw, sh).data, out = img.data;
  // 太陽方向（觀測者座標：x 右、y 上、z 朝向我們）：漸盈右邊亮（北半球）
  const i = phase.waxing ? (180 - phase.elong) * DEG : (phase.elong - 180) * DEG, sgn = phase.waxing ? 1 : -1;
  const sx = sgn * Math.sin(Math.abs(i)), sz = Math.cos(i);
  for (let py = 0; py < N; py++) {
    for (let px = 0; px < N; px++) {
      const x = (px + 0.5) / N * 2 - 1, y = 1 - (py + 0.5) / N * 2, q = diskToSeleno(x, y, l, b), o = (py * N + px) * 4;
      if (!q) { out[o + 3] = 0; continue; }
      const u = Math.min(sw - 1, Math.floor((q.lon / 360 + 0.5) * sw)), v = Math.min(sh - 1, Math.floor((0.5 - q.lat / 180) * sh)), so = (v * sw + u) * 4;
      const z = Math.sqrt(Math.max(0, 1 - x * x - y * y)), mu0 = x * sx + z * sz;
      let lit = mu0 > 0 ? Math.min(2 * mu0 / (mu0 + z + 1e-4), 1.35) : 0;
      lit = lit * Math.min(1, Math.max(0, (mu0 + 0.02) / 0.06)) + 0.05;
      out[o] = Math.min(255, sd[so] * lit); out[o + 1] = Math.min(255, sd[so + 1] * lit); out[o + 2] = Math.min(255, sd[so + 2] * lit); out[o + 3] = 255;
    }
  }
  c.putImageData(img, 0, 0);
}
function drawPath(cv, path, now) {
  const W = cv.clientWidth || 260, H = W, dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#02040c'; c.fillRect(0, 0, W, H);
  const S = W / 2 / 9.5, cx = W / 2, cy = H / 2, X = (l) => cx + l * S, Y = (b) => cy - b * S;
  c.strokeStyle = 'rgba(160,180,230,.25)'; c.lineWidth = 1;
  for (let k = -8; k <= 8; k += 4) { c.beginPath(); c.moveTo(X(k), Y(-9)); c.lineTo(X(k), Y(9)); c.stroke(); c.beginPath(); c.moveTo(X(-9), Y(k)); c.lineTo(X(9), Y(k)); c.stroke(); }
  c.strokeStyle = 'rgba(255,211,110,.75)'; c.lineWidth = 1.6; c.beginPath();
  path.forEach((p, k) => (k ? c.lineTo(X(p.l), Y(p.b)) : c.moveTo(X(p.l), Y(p.b)))); c.stroke();
  c.fillStyle = '#4fd1c5'; c.beginPath(); c.arc(X(now.l), Y(now.b), 6, 0, TAU); c.fill();
  c.fillStyle = '#9fb0cf'; c.font = `700 ${Math.max(10, W * 0.04)}px system-ui, sans-serif`; c.textAlign = 'center';
  c.fillText('North tips toward us · 北邊轉過來', cx, 16); c.fillText('South · 南邊', cx, H - 8);
  c.save(); c.translate(W - 10, cy); c.rotate(Math.PI / 2); c.fillText('East edge (right) · 東緣（右）', 0, 0); c.restore();
  c.save(); c.translate(12, cy); c.rotate(-Math.PI / 2); c.fillText('West edge (left) · 西緣（左）', 0, 0); c.restore();
}
function renderTonight(box) {
  const now = new Date(), lb = libration(now), ph = moonPhase(now), ex = librationExtremes(now);
  const tex = makeMoonTexture();
  const tw = (d) => { const x = new Date(d.getTime() + 8 * 3600000); return { m: x.getUTCMonth() + 1, d: x.getUTCDate() }; };
  const day = (d) => { const x = tw(d); return { en: `${MON[x.m - 1]} ${x.d}`, zh: `${x.m}/${x.d}` }; };
  const dir = (v, pos, neg) => (Math.abs(v) < 0.5 ? null : v > 0 ? pos : neg);
  const ew = dir(lb.l, ['east edge (right side)', '東緣（右側）'], ['west edge (left side)', '西緣（左側）']);
  const ns = dir(lb.b, ['north pole', '北極'], ['south pole', '南極']);
  const parts = [ew && `${Math.abs(lb.l).toFixed(1)}° around the ${ew[0]}`, ns && `${Math.abs(lb.b).toFixed(1)}° over the ${ns[0]}`].filter(Boolean);
  const partsZh = [ew && `${ew[1]}多露出 ${Math.abs(lb.l).toFixed(1)}°`, ns && `${ns[1]}多露出 ${Math.abs(lb.b).toFixed(1)}°`].filter(Boolean);
  const e = day(ex.east.t), w = day(ex.west.t), n = day(ex.north.t), s = day(ex.south.t);
  box.innerHTML = `<div class="mf-tn">
    <figure class="mf-fig"><canvas class="mf-disk" aria-label="Today's Moon with its real tilt · 今天的月亮（真實天平動）"></canvas>
      <figcaption>Today's Moon, north up: real phase and real tilt. Light areas are highlands; dark patches are the maria, the same patterns people have always seen. · 今天的月亮（北在上）：真實的月相與天平動。暗色的是月海，人類一直看到的同一組花紋。</figcaption></figure>
    <div class="mf-tn-text">
      <p class="tn-when">Today the Moon is ${Math.round(ph.illum * 100)}% lit and ${ph.waxing ? 'waxing' : 'waning'}<span>今天的月亮亮面 ${Math.round(ph.illum * 100)}%，${ph.waxing ? '漸盈' : '漸虧'}</span></p>
      <p class="mf-big">${parts.length ? `It is tipped to show us ${parts.join(' and ')}.` : 'It is facing us almost exactly straight on today.'}<span>${partsZh.length ? `它今天微微轉過來，${partsZh.join('、')}。` : '今天它幾乎正面對著我們。'}</span></p>
      <ul class="mf-best">
        <li><b>${e.en}</b> Best day this month to peek around the east edge (${ex.east.l.toFixed(1)}°), where Mare Crisium sits<span>${e.zh}：這個月最能看到東緣（${ex.east.l.toFixed(1)}°），危海所在的那一邊</span></li>
        <li><b>${w.en}</b> Best day for the west edge (${Math.abs(ex.west.l).toFixed(1)}°), beyond the Ocean of Storms<span>${w.zh}：最能看到西緣（${Math.abs(ex.west.l).toFixed(1)}°），風暴洋外側</span></li>
        <li><b>${n.en}</b> / <b>${s.en}</b> The north and south poles tip toward us<span>${n.zh}／${s.zh}：北極、南極各自轉過來</span></li>
      </ul>
      <figure class="mf-fig mf-fig2"><canvas class="mf-path" aria-label="The Moon's tilt over a month · 一個月的天平動路徑"></canvas>
        <figcaption>How the Moon rocks and nods over a month (gold line, 15 days before and after today); the teal dot is today. · 一個月裡月亮怎麼左右搖、上下點頭（金線：今天前後各 15 天）；青色圓點是今天。</figcaption></figure>
    </div></div>`;
  drawMoonDisk(box.querySelector('.mf-disk'), tex, lb.l, lb.b, ph);
  drawPath(box.querySelector('.mf-path'), librationPath(now, 15, 6), lb);
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-moonface-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-libration]');
  if (tn) renderTonight(tn);
  document.querySelectorAll('[data-lab-mode]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setMode(b.getAttribute('data-lab-mode'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
