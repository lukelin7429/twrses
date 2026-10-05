/*
 * 萬物原理 · 第十五課「電梯怎麼舉起那麼重的東西？」的 3D 電梯井（自繪示意；樓層畫得比真的矮）。
 *
 * 一個機制：鋼索繞過頂樓的曳引輪，一頭掛車廂、一頭掛差不多一樣重的平衡錘。兩邊幾乎平衡，
 *   馬達只要撐住「兩邊的重量差」；拿掉平衡錘，馬達就得撐住整個車廂加乘客。
 *   鋼索萬一全斷：調速器發現掉太快，安全裝置夾住導軌，車廂只掉一小段就停住（奧的斯 1853 年的發明）。
 *
 * 場景：8 層樓的電梯井（每層 1.5 單位），車廂在左、平衡錘在右，曳引輪在頂樓。
 *   車廂上下時平衡錘反方向移動。數字用 elevcalc.js（車廂 1,000 kg、平衡錘 1,450 kg、每人 70 kg，都是示意）。
 *
 * 產物：cd tools/science && npm run build → assets/js/elevator-lift.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, Color, CylinderGeometry, DirectionalLight, EdgesGeometry, Group,
  HemisphereLight, Line, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, Scene, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { G, COUNTERWEIGHT, MAX_PEOPLE, ROPES, TRIP_SPEED, BRAKE_G, carMass, imbalance, motorLoad } from './elevcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const FLOORS = 8, FH = 1.5, CAR_H = 1.3, CAR_W = 1.7, CAR_D = 1.5, CAR_X = -0.45, CW_X = 1.0, CW_H = 1.6;
const TOP = (FLOORS - 1) * FH;             // 車廂底部最高到這裡
const SHEAVE_Y = FLOORS * FH + 1.2, SHEAVE_X = (CAR_X + CW_X) / 2, SHEAVE_R = (CW_X - CAR_X) / 2;
const floorY = (f) => (f - 1) * FH;

const MSG = {
  light: ['With few riders, the counterweight is the heavier side, so the car actually wants to go up. The motor only has to hold back the difference.',
    '乘客少的時候，平衡錘那一邊比較重，車廂其實是想往上跑的。馬達只要拉住兩邊的重量差。'],
  balanced: ['Almost perfectly balanced. The car with its riders weighs about the same as the counterweight, so the motor hardly has to work at all.',
    '幾乎完全平衡。車廂加乘客和平衡錘差不多重，馬達幾乎不用出力。'],
  heavy: ['A full car is heavier than the counterweight, but only by a few hundred kilograms. That difference is all the motor has to lift.',
    '坐滿的車廂比平衡錘重，但只多幾百公斤。馬達要舉的就只有這個差。'],
  nocw: ['No counterweight: now the motor must hold up the whole car and everyone in it. That takes several times more force and energy.',
    '沒有平衡錘：現在馬達得撐住整個車廂和裡面所有的人，要好幾倍的力氣和電。'],
  cut: ['Every cable is cut! The car starts to fall, the governor notices at once, and the safety brakes clamp onto the guide rails. The car stops after dropping only about half a meter.',
    '鋼索全斷了！車廂開始往下掉，調速機馬上發現，安全裝置夾住導軌。車廂只掉了大約半公尺就停住。'],
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
  scene.background = new Color(0x101a30);
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const TARGET = V(-0.3, 7.0, 0);
  const homePos = () => TARGET.clone().add(V(8, 1.5, 26).multiplyScalar(camera.aspect < 0.7 ? 1.0 : camera.aspect < 0.9 ? 0.86 : camera.aspect < 1.2 ? 1.05 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 60;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6efff, 0x223044, 0.95));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const sun = new DirectionalLight(0xffffff, 1.2); sun.position.set(6, 16, 12); scene.add(sun);

  // ---------------- 電梯井、樓層 ----------------
  const shaftH = FLOORS * FH + 2.2;
  scene.add(at(new LineSegments(new EdgesGeometry(new BoxGeometry(3.4, shaftH, 2.2)), new LineBasicMaterial({ color: 0x6f86c0, transparent: true, opacity: 0.5 })), 0.2, shaftH / 2, 0));
  scene.add(at(new Mesh(new BoxGeometry(3.4, shaftH, 0.06), new MeshStandardMaterial({ color: 0x1b2740, roughness: 0.9 })), 0.2, shaftH / 2, -1.12));
  const slabMat = new MeshStandardMaterial({ color: 0x4a5568, roughness: 0.8 });
  for (let f = 1; f <= FLOORS; f++) scene.add(at(new Mesh(new BoxGeometry(2.2, 0.1, 2.0), slabMat), -2.65, floorY(f) - 0.05, 0));
  scene.add(at(new Mesh(new BoxGeometry(5.6, 0.2, 2.6), slabMat), -0.9, -0.3, 0));
  // 導軌
  const railMat = new MeshStandardMaterial({ color: 0xaab4c8, metalness: 0.7, roughness: 0.3 });
  const RAIL_X = [CAR_X - CAR_W / 2 - 0.08, CAR_X + CAR_W / 2 + 0.08];
  for (const x of RAIL_X) scene.add(at(new Mesh(new BoxGeometry(0.06, FLOORS * FH + 0.6, 0.06), railMat), x, (FLOORS * FH + 0.6) / 2 - 0.2, -0.6));

  // ---------------- 曳引輪與馬達 ----------------
  const sheave = new Group(); at(sheave, SHEAVE_X, SHEAVE_Y, 0); scene.add(sheave);
  sheave.add(new Mesh(new TorusGeometry(SHEAVE_R, 0.07, 12, 48), new MeshStandardMaterial({ color: 0xd8c27a, metalness: 0.7, roughness: 0.3 })));
  for (let k = 0; k < 4; k++) { const sp = new Mesh(new BoxGeometry(SHEAVE_R * 2, 0.05, 0.05), railMat); sp.rotation.z = k * Math.PI / 4; sheave.add(sp); }
  const motorMat = new MeshStandardMaterial({ color: 0x3d6fd8, emissive: 0x000000, metalness: 0.4, roughness: 0.4 });
  const motor = at(new Mesh(new CylinderGeometry(0.42, 0.42, 0.9, 24), motorMat), SHEAVE_X, SHEAVE_Y, -0.75); motor.rotation.x = Math.PI / 2; scene.add(motor);
  scene.add(at(new Mesh(new BoxGeometry(3.4, 0.12, 2.2), slabMat), 0.2, SHEAVE_Y - SHEAVE_R - 0.35, 0));

  // ---------------- 車廂 ----------------
  const car = new Group(); scene.add(car);
  car.add(at(new Mesh(new BoxGeometry(CAR_W, 0.08, CAR_D), new MeshStandardMaterial({ color: 0x9aa6bd, metalness: 0.5, roughness: 0.4 })), 0, 0.04, 0));
  car.add(at(new Mesh(new BoxGeometry(CAR_W, 0.08, CAR_D), new MeshStandardMaterial({ color: 0x9aa6bd, metalness: 0.5, roughness: 0.4 })), 0, CAR_H, 0));
  car.add(at(new Mesh(new BoxGeometry(CAR_W, CAR_H, 0.05), new MeshStandardMaterial({ color: 0xcfd8ea, roughness: 0.6 })), 0, CAR_H / 2, -CAR_D / 2));
  car.add(at(new LineSegments(new EdgesGeometry(new BoxGeometry(CAR_W, CAR_H, CAR_D)), new LineBasicMaterial({ color: 0xffffff })), 0, CAR_H / 2, 0));
  const glass = new Mesh(new BoxGeometry(CAR_W, CAR_H, CAR_D), new MeshStandardMaterial({ color: 0x9fd4ff, transparent: true, opacity: 0.1, depthWrite: false }));
  car.add(at(glass, 0, CAR_H / 2, 0));
  car.position.x = CAR_X;
  // 乘客
  const people = [];
  const SHIRT = [0xffb02e, 0x58b4ff, 0x7cf29a, 0xff7ad9, 0xffd36e, 0xb89cff];
  for (let k = 0; k < MAX_PEOPLE; k++) {
    const g = new Group();
    g.add(at(new Mesh(new CylinderGeometry(0.1, 0.12, 0.55, 10), new MeshStandardMaterial({ color: SHIRT[k % 6] })), 0, 0.36, 0));
    g.add(at(new Mesh(new SphereGeometry(0.11, 12, 10), new MeshStandardMaterial({ color: 0xf1d2b6 })), 0, 0.76, 0));
    g.position.set(-0.6 + (k % 4) * 0.4, 0.08, 0.45 - Math.floor(k / 4) * 0.42);
    car.add(g); people.push(g);
  }
  // 安全裝置（夾住導軌時變紅）
  const brakeMat = new MeshStandardMaterial({ color: 0x6b7385, emissive: 0x000000 });
  for (const s of [-1, 1]) car.add(at(new Mesh(new BoxGeometry(0.22, 0.2, 0.2), brakeMat), s * (CAR_W / 2 + 0.02), 0.02, -0.6));

  // ---------------- 平衡錘 ----------------
  const cw = new Mesh(new BoxGeometry(0.5, CW_H, 1.3), new MeshStandardMaterial({ color: 0x70798c, metalness: 0.6, roughness: 0.5 }));
  cw.position.x = CW_X; scene.add(cw);
  const cwEdges = new LineSegments(new EdgesGeometry(new BoxGeometry(0.5, CW_H, 1.3)), new LineBasicMaterial({ color: 0xcfd8ea }));
  cw.add(cwEdges);

  // ---------------- 鋼索 ----------------
  const ropeMat = new LineBasicMaterial({ color: 0xe8ecf4 });
  const ropes = [];
  for (let k = 0; k < ROPES; k++) {
    const z = (k - (ROPES - 1) / 2) * 0.07;
    const mk = () => { const l = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 1, 0)]), ropeMat); l.frustumCulled = false; scene.add(l); return l; };
    const arcPts = []; for (let i = 0; i <= 24; i++) { const a = Math.PI - (i / 24) * Math.PI; arcPts.push(V(SHEAVE_X + Math.cos(a) * SHEAVE_R, SHEAVE_Y + Math.sin(a) * SHEAVE_R, z)); }
    const arc = new Line(new BufferGeometry().setFromPoints(arcPts), ropeMat); scene.add(arc);
    ropes.push({ z, a: mk(), b: mk(), arc });
  }

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    motor: lab.add('bt-lb bt-lb-e', 'Motor and drive wheel<small>馬達與曳引輪</small>'),
    car: lab.add('bt-lb bt-lb-b', ''),
    cw: lab.add('bt-lb ev-lb-cw', ''),
    rope: lab.add('bt-lb ip-region', `${ROPES} steel cables<small>${ROPES} 條鋼索</small>`),
    rail: lab.add('bt-lb ip-region', 'Guide rail<small>導軌</small>'),
    brake: lab.add('bt-lb ip-lb-lost', 'Safety brakes grip the rails<small>安全裝置夾住導軌</small>'),
    floors: Array.from({ length: FLOORS }, (_, i) => lab.add('bt-lb ev-lb-floor', `${i + 1}F`)),
  };

  const R = {
    people: $('.ev-people'), peopleOut: $('.ev-people-out'), floor: $('.ev-floor'), floorOut: $('.ev-floor-out'),
    carKg: $('.ev-carkg'), cwKg: $('.ev-cwkg'), hold: $('.ev-hold'), barA: $('.ev-bar-a'), barB: $('.ev-bar-b'), valA: $('.ev-val-a'), valB: $('.ev-val-b'),
    status: $('.ev-status'), cut: $('.ev-cut'), fix: $('.ev-fix'), msg: $('.ev-msg'), play: $('.al-play'),
  };
  const state = {
    people: 6, cwOn: true, labels: true, playing: true, y: 0, target: floorY(1), wait: 1.5, dir: 1,
    cut: false, v: 0, braked: false, dropped: 0, cwY: 0, cwV: 0, spin: 0, lastMsg: '', msgKey: 'balanced',
  };

  // ---------------- 每格 ----------------
  function step(dt) {
    const h = state.playing ? dt : 0;
    if (state.cut) {
      if (!state.braked && h) {
        state.v += G * h;
        if (state.v >= TRIP_SPEED) state.braked = true;
      } else if (state.v > 0 && h) {
        state.v = Math.max(0, state.v - BRAKE_G * G * h);
      }
      const dy = state.v * h; state.y = Math.max(0, state.y - dy); state.dropped += dy;
      if (state.y === 0) state.v = 0;
      if (state.cwOn && h) { state.cwV += G * h; state.cwY = Math.max(CW_H / 2 + 0.05, state.cwY - state.cwV * h); }   // 平衡錘掉到井底的緩衝器
    } else {
      if (h) {
        if (Math.abs(state.target - state.y) < 0.01) {
          state.wait -= h;
          if (state.wait <= 0) {       // 自動上下跑
            let f; do { f = 1 + Math.floor(Math.random() * FLOORS); } while (Math.abs(floorY(f) - state.y) < 0.1);
            setFloor(f);
          }
        } else {
          const d = state.target - state.y, sp = Math.min(2.2, 0.5 + Math.abs(d) * 1.4);
          const mv = Math.sign(d) * Math.min(Math.abs(d), sp * h);
          state.y += mv; state.spin += mv / SHEAVE_R;
        }
      }
      state.cwY = TOP - state.y + CW_H / 2 + 0.2;
    }
    car.position.y = state.y;
    cw.position.y = state.cwY; cw.visible = state.cwOn;
    sheave.rotation.z = -state.spin;
    people.forEach((p, k) => { p.visible = k < state.people; });
    brakeMat.color.setHex(state.braked ? 0xff4a3a : 0x6b7385); brakeMat.emissive.setHex(state.braked ? 0x991a10 : 0x000000);
    const load = motorLoad(state.people, state.cwOn);
    motorMat.emissive.setRGB(...[0.9, 0.35, 0.1].map((c) => c * Math.min(1, load / 1840) * 1.2));
    for (const r of ropes) {
      r.a.visible = r.arc.visible = !state.cut; r.b.visible = !state.cut && state.cwOn;
      r.a.geometry.setFromPoints([V(CAR_X, state.y + CAR_H + 0.04, r.z), V(CAR_X, SHEAVE_Y, r.z)]);
      r.b.geometry.setFromPoints([V(CW_X, state.cwY + CW_H / 2, r.z), V(CW_X, SHEAVE_Y, r.z)]);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.motor, on, narrow ? V(SHEAVE_X, SHEAVE_Y + SHEAVE_R + 0.2, 0) : V(SHEAVE_X + SHEAVE_R + 0.5, SHEAVE_Y, 0), narrow ? -16 : 0);
    L.motor.style.marginLeft = narrow ? '0' : '85px';
    L.car.innerHTML = `Car ${carMass(state.people).toLocaleString('en-US')} kg<small>車廂＋${state.people} 人</small>`;
    show(L.car, on, narrow ? V(CAR_X, state.y, CAR_D / 2) : V(CAR_X - CAR_W / 2 - 0.2, state.y + CAR_H / 2, CAR_D / 2), narrow ? 20 : 0);
    L.car.style.marginLeft = narrow ? '0' : '-70px';
    L.cw.innerHTML = `Counterweight ${COUNTERWEIGHT.toLocaleString('en-US')} kg<small>平衡錘</small>`;
    show(L.cw, on && state.cwOn, narrow ? V(CW_X, state.cwY + CW_H / 2, 0) : V(CW_X + 0.35, state.cwY, 0.65), narrow ? -20 : 0);
    L.cw.style.marginLeft = narrow ? '-30px' : '80px';
    show(L.rope, on && !state.cut && !narrow, V(CAR_X, Math.min(SHEAVE_Y - 1.2, state.y + CAR_H + 2.2), 0), 0);
    show(L.rail, on && !narrow, V(RAIL_X[0], Math.max(1.2, state.y - 1.6), -0.6), 0);
    show(L.brake, state.braked, V(CAR_X, state.y - 0.1, CAR_D / 2), narrow ? 52 : 22);
    L.floors.forEach((el, i) => show(el, on && (!narrow || i % 2 === 0 || i === FLOORS - 1), V(-3.6, floorY(i + 1) + 0.35, 1.0)));
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const kg = (n) => `${Math.round(n).toLocaleString('en-US')} kg`;
  function readout() {
    R.peopleOut.textContent = String(state.people);
    R.people.style.setProperty('--p', `${state.people / MAX_PEOPLE * 100}%`);
    const fl = Math.round(state.y / FH) + 1;
    R.floorOut.textContent = `${fl}F`;
    R.carKg.textContent = kg(carMass(state.people));
    R.cwKg.innerHTML = state.cwOn ? kg(COUNTERWEIGHT) : 'Removed<small>拿掉了</small>';
    const withCw = motorLoad(state.people, true), without = motorLoad(state.people, false);
    const d = imbalance(state.people);
    R.hold.innerHTML = state.cut ? '0 kg<small>brakes hold it 煞車撐住</small>' : state.cwOn ? `${kg(withCw)}<small>${Math.abs(d) < 40 ? 'balanced 平衡' : d > 0 ? 'car side heavier 車廂較重' : 'counterweight heavier 平衡錘較重'}</small>` : `${kg(without)}<small>everything 全部</small>`;
    R.barA.style.setProperty('--w', `${withCw / 1840 * 100}%`); R.valA.textContent = kg(withCw);
    R.barB.style.setProperty('--w', `${without / 1840 * 100}%`); R.valB.textContent = kg(without);
    root.classList.toggle('ev-nocw', !state.cwOn);
    let key, st;
    if (state.cut) { key = 'cut'; st = state.v > 0 && !state.braked ? ['Falling!', '往下掉！', 'bad'] : [`Stopped after ${state.dropped.toFixed(1)} m`, `掉了 ${state.dropped.toFixed(1)} 公尺就停住`, 'ok']; }
    else if (!state.cwOn) { key = 'nocw'; st = ['No counterweight', '沒有平衡錘', 'bad']; }
    else if (Math.abs(d) < 40) { key = 'balanced'; st = ['Almost balanced', '幾乎平衡', 'ok']; }
    else if (d < 0) { key = 'light'; st = ['Counterweight is heavier', '平衡錘比較重', '']; }
    else { key = 'heavy'; st = ['Car side is heavier', '車廂這邊比較重', '']; }
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `ev-status ${st[2]}`;
    R.cut.disabled = state.cut; R.fix.disabled = !state.cut;
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setPeople(n) { state.people = MathUtils.clamp(Math.round(+n), 0, MAX_PEOPLE); R.people.value = String(state.people); }
  function setFloor(f) { state.target = floorY(MathUtils.clamp(Math.round(+f), 1, FLOORS)); state.wait = 1.6; R.floor.value = String(Math.round(state.target / FH) + 1); }
  function setCw(v) { state.cwOn = v; const t = $('[data-t="cw"]'); if (t) t.checked = v; }
  function cut() { if (state.cut) return; if (state.y < floorY(5)) { state.y = floorY(6); state.target = state.y; } state.cut = true; state.v = 0; state.braked = false; state.dropped = 0; state.cwV = 0; state.cwY = TOP - state.y + CW_H / 2 + 0.2; }
  function fix() { state.cut = false; state.v = 0; state.braked = false; state.target = floorY(Math.round(state.y / FH) + 1); state.y = state.target; state.wait = 1.5; }
  R.people.addEventListener('input', () => setPeople(R.people.value));
  R.floor.addEventListener('input', () => { if (!state.cut) setFloor(R.floor.value); });
  R.cut.addEventListener('click', cut);
  R.fix.addEventListener('click', fix);
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="cw"]', setCw);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

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
    camera.fov = camera.aspect < 0.9 ? 40 : 34;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setPeople(6); setFloor(4); state.y = floorY(1);
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    balanced: () => { fix(); setCw(true); setPeople(6); setPlaying(true); },
    full: () => { fix(); setCw(true); setPeople(MAX_PEOPLE); setPlaying(true); },
    nocw: () => { fix(); setPeople(MAX_PEOPLE); setCw(false); setPlaying(true); },
    cut: () => { fix(); setCw(true); setPeople(8); setPlaying(true); cut(); },
  };
  // 除錯：document.querySelector('[data-elevator-lab]').__lab
  root.__lab = {
    camera, controls, state, setPeople, setFloor, setCw, cut, fix,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-elevator-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
