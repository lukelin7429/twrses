/*
 * 萬物原理 · 第十四課「腳踏車騎起來為什麼不會倒？」的 3D 腳踏車（自繪示意；平衡用 bikecalc.js 的簡化模型）。
 *
 * 一個機制：車子往一邊倒時，前輪會往倒的那一邊轉，車輪就跑回車身底下把它「接住」。
 *   跑得夠快（這個模型約時速 10 公里以上）才接得住；太慢、停著、或前輪鎖死不能轉，就會倒。
 *   沒有人騎：像真正的實驗一樣，把腳踏車推出去、放手，再從旁邊推它一下。
 *
 * 場景：腳踏車沿 +x 前進（右手邊是 +z）；車頭方向 ψ 往右轉為正（three 的 rotation.y = −ψ）、
 *   傾斜 φ 往右為正（繞前進方向的軸，rotation.x = +φ）、前輪轉向 δ 往右為正（繞後傾的轉向軸）。
 *   鏡頭跟著車走；地面是會跟著平移的格線；輪胎痕跡畫出前輪怎麼「繞回車身底下」。
 *
 * 產物：cd tools/science && npm run build → assets/js/bicycle-balance.js
 */
import {
  AmbientLight, BufferGeometry, CanvasTexture, Color, CylinderGeometry, DirectionalLight, Float32BufferAttribute, Group,
  HemisphereLight, Line, LineBasicMaterial, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry,
  Quaternion, RepeatWrapping, Scene, SphereGeometry, SRGBColorSpace, TorusGeometry, Vector3, WebGLRenderer, BoxGeometry,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { BIKE, FALL, criticalSpeed, kmh, step as simStep, fresh } from './bikecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const WR = 0.34, WB = BIKE.w, TRACK_N = 500;
const HEAD = V(0.8, 0.92, 0), AXLE = V(WB, WR, 0);

const MSG = {
  go: ['The bike is rolling with nobody on it. Give it a sideways push: the front wheel turns toward the side it is falling to, the wheels steer back under the bike, and it stands up again.',
    '腳踏車沒有人騎，自己往前滾。從旁邊推它一下：前輪會往倒的那一邊轉，車輪繞回車身底下，車子又站直了。'],
  catching: ['It is leaning, so the front wheel has turned toward the lean. Watch the tire tracks: the front wheel swings out to that side and brings the wheels back under the bike.',
    '車子歪了，前輪就往歪的那一邊轉。看輪胎痕跡：前輪往那一邊繞出去，把車輪帶回車身底下。'],
  slow: ['Too slow. The front wheel still turns toward the lean, but the bike is not moving fast enough for that turn to bring the wheels back under it in time.',
    '太慢了。前輪還是會往倒的那邊轉，但車子跑得不夠快，來不及把車輪帶回車身底下。'],
  fallen: ['It fell over. Stand it up and try a higher speed, or unlock the front wheel.',
    '倒了。把它扶起來，試試更快的速度，或把前輪的鎖打開。'],
  locked: ['With the front wheel locked straight, the bike cannot steer its wheels under the lean. It falls over even when it is going fast.',
    '前輪被鎖死、只能直走，車子就沒辦法把車輪轉到傾斜的那一邊去。就算跑得很快，還是會倒。'],
  still: ['Standing still, a bike cannot catch itself, just like a pencil balanced on its point. It needs to be moving.',
    '停著不動的腳踏車接不住自己，就像立在筆尖上的鉛筆。它得動起來才行。'],
};

function gridTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#3f4a5a'; g.fillRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 2; g.strokeRect(0, 0, 128, 128);
  g.fillStyle = 'rgba(255,255,255,.05)'; g.fillRect(0, 0, 64, 64); g.fillRect(64, 64, 64, 64);
  const t = new CanvasTexture(c); t.wrapS = t.wrapT = RepeatWrapping; t.colorSpace = SRGBColorSpace;
  return t;
}

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
  scene.background = new Color(0x1a2a44);
  const camera = new PerspectiveCamera(36, 1, 0.1, 300);
  const OFFSET = () => V(-2.6, 2.1, 4.4).multiplyScalar(camera.aspect < 0.9 ? 1.5 : camera.aspect < 1.2 ? 1.2 : 1);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 2; controls.maxDistance = 30;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.enablePan = false;
  scene.add(new HemisphereLight(0xe6efff, 0x2a3320, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const sun = new DirectionalLight(0xfff1d6, 1.4); sun.position.set(-4, 9, 6); scene.add(sun);

  // ---------------- 地面（跟著車子平移的格線） ----------------
  const TILE = 2;
  const gtex = gridTexture(); gtex.repeat.set(60, 60);
  const ground = new Mesh(new PlaneGeometry(120, 120), new MeshStandardMaterial({ map: gtex, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; scene.add(ground);

  // ---------------- 腳踏車 ----------------
  const bike = new Group(); scene.add(bike);          // 位置＝後輪著地點、朝向
  const lean = new Group(); bike.add(lean);            // 傾斜
  const frameMat = new MeshStandardMaterial({ color: 0xe04a3a, metalness: 0.4, roughness: 0.4 });
  const darkMat = new MeshStandardMaterial({ color: 0x1b1f28, roughness: 0.7 });
  const metal = new MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.7, roughness: 0.3 });
  function tube(a, b, r, mat, parent) {
    const d = b.clone().sub(a), len = d.length();
    const m = new Mesh(new CylinderGeometry(r, r, len, 10), mat);
    m.position.copy(a).addScaledVector(d, 0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), d.clone().normalize());
    parent.add(m); return m;
  }
  function wheel(parent) {
    const g = new Group(); parent.add(g);
    g.add(new Mesh(new TorusGeometry(WR - 0.02, 0.025, 10, 40), darkMat));
    g.add(new Mesh(new TorusGeometry(WR - 0.05, 0.012, 8, 40), metal));
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI; tube(V(Math.cos(a) * (WR - 0.05), Math.sin(a) * (WR - 0.05), 0), V(-Math.cos(a) * (WR - 0.05), -Math.sin(a) * (WR - 0.05), 0), 0.004, metal, g); }
    const mark = at(new Mesh(new SphereGeometry(0.03, 10, 8), new MeshStandardMaterial({ color: 0xffd36e, emissive: 0x6a4a00 })), WR - 0.05, 0, 0.02); g.add(mark);
    return g;
  }
  const BB = V(0.42, 0.3, 0), SEAT = V(0.24, 0.95, 0), REAR = V(0, WR, 0);
  tube(BB, SEAT, 0.022, frameMat, lean); tube(SEAT, HEAD.clone().add(V(-0.03, 0.02, 0)), 0.02, frameMat, lean);
  tube(BB, HEAD.clone().add(V(-0.01, -0.1, 0)), 0.024, frameMat, lean);
  tube(REAR, BB, 0.014, frameMat, lean); tube(REAR, SEAT.clone().add(V(0.02, -0.12, 0)), 0.014, frameMat, lean);
  lean.add(at(new Mesh(new BoxGeometry(0.26, 0.04, 0.12), darkMat), SEAT.x - 0.02, SEAT.y + 0.05, 0));
  tube(SEAT.clone().add(V(0, -0.02, 0)), SEAT.clone().add(V(-0.01, 0.05, 0)), 0.014, metal, lean);
  const rearWheel = wheel(lean); rearWheel.position.copy(REAR);
  // 轉向組：繞著後傾的轉向軸轉（車頭管 → 前輪軸）
  const steer = new Group(); steer.position.copy(HEAD); lean.add(steer);
  const AXIS_UP = HEAD.clone().sub(AXLE).normalize();
  const REL = AXLE.clone().sub(HEAD);
  for (const s of [-1, 1]) tube(V(0, -0.02, s * 0.045), REL.clone().add(V(0, 0, s * 0.045)), 0.012, metal, steer);
  tube(V(0, -0.1, 0), V(-0.03, 0.14, 0), 0.02, frameMat, steer);
  tube(V(-0.03, 0.14, -0.27), V(-0.03, 0.14, 0.27), 0.013, darkMat, steer);
  const frontWheel = wheel(steer); frontWheel.position.copy(REL);

  // 輪胎痕跡
  const mkTrack = (c) => {
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(new Float32Array(TRACK_N * 3), 3));
    const l = new Line(g, new LineBasicMaterial({ color: c })); l.frustumCulled = false; scene.add(l);
    return { l, g, n: 0, pts: [] };
  };
  const trackR = mkTrack(0x9fd4ff), trackF = mkTrack(0xffd36e);
  function pushTrack(t, x, z) {
    t.pts.push(x, 0.012, z); if (t.pts.length > TRACK_N * 3) t.pts.splice(0, 3);
    t.g.attributes.position.array.set(t.pts); t.g.setDrawRange(0, t.pts.length / 3); t.g.attributes.position.needsUpdate = true;
  }

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    steer: lab.add('bt-lb bk-lb-steer', 'Front wheel turns toward the lean<small>前輪往倒的那邊轉</small>'),
    lock: lab.add('bt-lb ip-lb-lost', 'Front wheel locked<small>前輪鎖住了</small>'),
    front: lab.add('bt-lb bt-lb-b', 'Front wheel track<small>前輪的痕跡</small>'),
    rear: lab.add('bt-lb bt-lb-e', 'Rear wheel track<small>後輪的痕跡</small>'),
    nobody: lab.add('bt-lb ip-region', 'No rider<small>沒有人騎</small>'),
  };

  const R = {
    v: $('.bk-v'), vOut: $('.bk-v-out'), status: $('.bk-status'), leanV: $('.bk-lean'), steerV: $('.bk-steer'), need: $('.bk-need'),
    msg: $('.bk-msg'), play: $('.al-play'), push: $('.bk-push'), up: $('.bk-up'),
  };
  const sim = fresh();
  const state = { speed: 18, locked: false, labels: true, tracks: true, playing: true, fallen: false, side: 1, dist: 0, sinceTrack: 0, catching: 0, lastMsg: '' };
  const VC = kmh(criticalSpeed());

  function standUp() { sim.phi = 0.004 * state.side; sim.dphi = 0; sim.delta = 0; state.fallen = false; }
  function push() { if (state.fallen) standUp(); sim.dphi += 1.15 * state.side; state.side *= -1; state.catching = 2.5; }

  const q = new Quaternion(), prev = V(0, 0, 0);
  function step(dt) {
    const v = state.fallen ? 0 : state.speed / 3.6;
    prev.copy(bike.position);
    if (state.playing && !state.fallen) {
      const n = 10, h = dt / n;
      for (let k = 0; k < n; k++) {
        simStep(sim, v, h, { locked: state.locked });
        sim.dphi += (Math.random() - 0.5) * 0.02 * h * 60 * 0.05;    // 一點點擾動：太慢時終究會倒
        if (Math.abs(sim.phi) > FALL) { state.fallen = true; sim.phi = Math.sign(sim.phi) * 1.5; sim.dphi = 0; break; }
      }
      state.dist += v * dt; state.sinceTrack += v * dt;
      if (state.catching > 0) state.catching -= dt;
    }
    bike.position.set(sim.x, 0, sim.z);
    bike.rotation.y = -sim.psi;
    lean.rotation.x = sim.phi;
    q.setFromAxisAngle(AXIS_UP, -sim.delta); steer.quaternion.copy(q);
    rearWheel.rotation.z = -state.dist / WR; frontWheel.rotation.z = -state.dist / WR;
    if (state.sinceTrack > 0.06) {
      state.sinceTrack = 0;
      pushTrack(trackR, sim.x, sim.z);
      pushTrack(trackF, sim.x + WB * Math.cos(sim.psi), sim.z + WB * Math.sin(sim.psi));
    }
    trackR.l.visible = trackF.l.visible = state.tracks;
    ground.position.set(Math.round(sim.x / TILE) * TILE, 0, Math.round(sim.z / TILE) * TILE);
    // 鏡頭跟著車走
    const d = bike.position.clone().sub(prev);
    camera.position.add(d); controls.target.add(d);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.8);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0.clone().add(bike.position), fly.p1.clone().add(bike.position), k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const fw = V(sim.x + WB * Math.cos(sim.psi), 0.75, sim.z + WB * Math.sin(sim.psi));
    show(L.steer, on && !state.locked && !state.fallen && Math.abs(sim.delta) > 0.035, fw, -30);
    show(L.lock, state.locked && !state.fallen, fw, -30);
    show(L.nobody, on && !narrow && !state.fallen, V(sim.x + 0.2, 1.25, sim.z), -14);
    const tp = (t, k) => (t.pts.length > k * 3 + 3 ? V(t.pts[t.pts.length - k * 3 - 3], 0.02, t.pts[t.pts.length - k * 3 - 1]) : null);
    const pf = tp(trackF, 28), pr = tp(trackR, 46);
    show(L.front, on && state.tracks && !narrow && !!pf && !state.fallen, pf || V(0, 0, 0), 16);
    show(L.rear, on && state.tracks && !narrow && !!pr && !state.fallen, pr || V(0, 0, 0), -16);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    R.vOut.textContent = `${Math.round(state.speed)} km/h`;
    R.v.style.setProperty('--p', `${state.speed / 30 * 100}%`);
    const deg = sim.phi * 180 / Math.PI, sd = sim.delta * 180 / Math.PI;
    const side = (x, a, b) => (Math.abs(x) < 0.5 ? '' : x > 0 ? a : b);
    R.leanV.innerHTML = state.fallen ? 'Down<small>倒了</small>' : `${Math.abs(deg).toFixed(0)}°<small>${side(deg, 'right 右', 'left 左')}</small>`;
    R.steerV.innerHTML = `${Math.abs(sd).toFixed(0)}°<small>${side(sd, 'right 右', 'left 左')}</small>`;
    R.need.textContent = `${VC.toFixed(0)} km/h`;
    let st, key;
    if (state.fallen) { st = ['It fell over', '倒了', 'bad']; key = state.locked ? 'locked' : state.speed < 1 ? 'still' : 'fallen'; }
    else if (state.locked) { st = ['Front wheel locked', '前輪鎖住', 'bad']; key = 'locked'; }
    else if (state.speed < 1) { st = ['Standing still', '停著不動', 'bad']; key = 'still'; }
    else if (Math.abs(deg) > 2 && state.speed < VC) { st = ['Falling…', '快倒了……', 'bad']; key = 'slow'; }
    else if (state.speed < VC) { st = ['Too slow to catch itself', '太慢，接不住自己', '']; key = 'slow'; }
    else if (Math.abs(deg) > 1.5 || state.catching > 0) { st = ['Catching itself', '正在接住自己', 'ok']; key = 'catching'; }
    else { st = ['Balancing by itself', '自己保持平衡', 'ok']; key = 'go'; }
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`;
    R.status.className = `bk-status ${st[2]}`;
    R.up.disabled = !state.fallen;
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setSpeed(v) { state.speed = MathUtils.clamp(+v, 0, 30); R.v.value = String(state.speed); }
  function setLocked(v) { state.locked = v; const t = $('[data-t="lock"]'); if (t) t.checked = v; }
  R.v.addEventListener('input', () => setSpeed(R.v.value));
  R.push.addEventListener('click', push);
  R.up.addEventListener('click', standUp);
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="tracks"]', (v) => { state.tracks = v; });
  bind('[data-t="lock"]', setLocked);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0) };
  $('.al-home').addEventListener('click', () => { fly.p0.copy(camera.position).sub(bike.position); fly.p1.copy(OFFSET()).add(V(0.5, 0.6, 0)); fly.t = 0; controls.target.copy(bike.position).add(V(0.5, 0.6, 0)); });

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 46 : 36;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  controls.target.set(0.5, 0.6, 0);
  camera.position.copy(controls.target).add(OFFSET());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(18); standUp();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    fast: () => { setLocked(false); setSpeed(20); standUp(); setPlaying(true); push(); },
    slow: () => { setLocked(false); setSpeed(5); standUp(); setPlaying(true); push(); },
    locked: () => { setSpeed(20); standUp(); setLocked(true); setPlaying(true); push(); },
    still: () => { setLocked(false); setSpeed(0); standUp(); setPlaying(true); push(); },
  };
  // 除錯：document.querySelector('[data-bicycle-lab]').__lab
  root.__lab = {
    camera, controls, state, sim, setSpeed, setLocked, push, standUp, VC,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-bicycle-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
