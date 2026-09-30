/*
 * 人體探索 · 第一課「為什麼我們需要骨骼？」的 3D 骨架。
 *
 * 模型：assets/models/skeleton.glb（npm run model 從 BodyParts3D 產生，一塊骨頭一個節點，
 *       節點名稱 = bones.js 的 id）。座標：公尺、Y 朝上、臉朝 +Z、腳底 y = 0；
 *       身體的右邊在 -X（所以從正面看，他的右手在畫面左邊）。
 *
 * 互動：
 *   點骨頭 → 右側顯示英中名稱、俗名、所屬區域與它的工作
 *   區域按鈕 → 只留下那一區，鏡頭飛過去
 *   五大功能 → 把負責那項工作的骨頭上色；「保護」會畫出示意的腦、心、肺、脊髓；
 *              「造血」把紅骨髓所在的骨頭染紅，股骨、肱骨只染上端
 *   拆開骨架滑桿 → 每塊骨頭從所屬區域的中心往外移
 *   數一數手上的骨頭 → 鏡頭飛到右手，27 塊骨頭一塊一塊亮起（親身測量：學生跟著摸自己的手）
 *
 * 產物：cd tools/body && npm run build → assets/js/skeleton.js
 */
import {
  AmbientLight, Box3, CatmullRomCurve3, Color, DirectionalLight, Float32BufferAttribute, Group,
  HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene,
  SphereGeometry, TubeGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { JOBS, REGIONS, buildBones, handOrder } from './bones.js';

const BONES = buildBones();
const BY_ID = new Map(BONES.map((b) => [b.id, b]));
const REGION = new Map(REGIONS.map((r) => [r.key, r]));
const HAND = handOrder('r');

const IVORY = new Color(0xeee4cf);
const GOLD = new Color(0xffc857);
const JOB_COLOR = {
  support: new Color(0xf0b35a), protect: new Color(0x6cc3ff), move: new Color(0x7ddc9a),
  blood: new Color(0xd9382e), store: new Color(0xc9d7ff),
};
// 成人紅骨髓的位置：扁平骨＋股骨、肱骨的上端（GRADIENT 只染上面這一段）
const MARROW_REGIONS = new Set(['spine', 'chest', 'pelvis']);
const MARROW_EXTRA = new Set(['frontal', 'occipital', 'sphenoid', 'r-parietal', 'l-parietal', 'r-temporal', 'l-temporal',
  'r-scapula', 'l-scapula', 'r-clavicle', 'l-clavicle']);
const GRADIENT = new Set(['r-femur', 'l-femur', 'r-humerus', 'l-humerus']);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const labels = $('.al-labels');

  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.02, 50);
  // 直式窄畫面（手機）時骨架左右有空間，鏡頭拉近一點，全身仍放得下
  const HOME = { dir: new Vector3(0.95, 0.32, 3.3), target: new Vector3(0, 0.88, 0) };
  const homePos = () => HOME.target.clone().add(HOME.dir.clone().multiplyScalar(camera.aspect < 0.9 ? 0.8 : 1));
  camera.position.copy(homePos());
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.25;
  controls.maxDistance = 7;
  controls.target.copy(HOME.target);

  scene.add(new HemisphereLight(0xdfe8ff, 0x2a2016, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.15));
  const key = new DirectionalLight(0xfff3e0, 2.1); key.position.set(2, 3, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 1.1); rim.position.set(-2.5, 1.5, -2.5); scene.add(rim);

  // 地板上的一圈淡光，讓骨架有個「站」的地方
  const floor = new Mesh(new SphereGeometry(1, 48, 12, 0, Math.PI * 2, Math.PI / 2 - 0.001, 0.001),
    new MeshStandardMaterial({ color: 0x1b2a4d, transparent: true, opacity: 0.35 }));
  floor.scale.set(0.55, 1, 0.55);
  scene.add(floor);

  const R = {
    card: $('.sk-card'), en: $('.sk-name-en'), nick: $('.sk-nick'), zh: $('.sk-name-zh'),
    region: $('.sk-region'), rjob: $('.sk-rjob'), jobText: $('.sk-job-text'),
    countBtn: $('.sk-count'), countN: $('.sk-count-n b'), countT: $('.sk-count-t'),
    loading: $('.sk-loading'), bar: $('.sk-bar i'), apart: $('.sk-apart'),
  };

  const state = {
    ready: false, selected: null, hover: null, mode: null,   // mode: {type:'region'|'job', key} | {type:'count'}
    apart: 0, labels: true, spin: false, count: -1,
  };
  const bones = new Map();         // id → { mesh, mat, base, center, region, colors }
  const regionCenter = new Map();
  const regionAnchor = new Map();  // 區域標籤的位置：成對的部位左右交錯放，避免全擠在身體中線
  const bodyCenter = new Vector3();

  // ---------------- 示意器官（只在「保護」時出現；形狀是示意，不是真實解剖） ----------------
  const organs = new Group();
  organs.visible = false;
  scene.add(organs);
  const organMat = (c) => new MeshStandardMaterial({ color: c, transparent: true, opacity: 0.55, roughness: 0.5, depthWrite: false });

  // ---------------- 標籤 ----------------
  const lab = (cls, html) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = html; labels.appendChild(s); return s; };
  const regionLabels = REGIONS.map((r) => ({ key: r.key, el: lab('sk-rl', `${esc(r.en)} · ${esc(r.zh)}`) }));
  const selLabel = lab('sk-sel', '');
  const organLabels = [];
  const proj = new Vector3();
  function placeLabel(el, v, dy = 0) {
    proj.copy(v).project(camera);
    const w = cv.clientWidth, h = cv.clientHeight;
    const off = proj.z > 1 || Math.abs(proj.x) > 1.1 || Math.abs(proj.y) > 1.1;
    el.style.opacity = off ? 0 : 1;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, -50%)`;
  }
  const tmp = new Vector3();
  function updateLabels() {
    const focusRegion = state.mode && state.mode.type === 'region' ? state.mode.key : null;
    for (const { key, el } of regionLabels) {
      const show = state.ready && state.labels && !state.selected && state.mode?.type !== 'count'
        && (!focusRegion || focusRegion === key) && state.mode?.type !== 'job';
      el.hidden = !show;
      if (show) placeLabel(el, tmp.copy(regionAnchor.get(key)).add(offsetOf(key)));
    }
    const sel = state.mode?.type === 'count' ? HAND[state.count] : state.selected;
    selLabel.hidden = !sel || !bones.has(sel);
    if (!selLabel.hidden) {
      const b = bones.get(sel);
      b.mesh.getWorldPosition(tmp);
      placeLabel(selLabel, tmp.copy(b.center).add(b.mesh.position).sub(b.base), -26);
    }
    for (const o of organLabels) {
      o.el.hidden = !organs.visible;
      if (organs.visible) placeLabel(o.el, o.at);
    }
  }

  // ---------------- 載入模型 ----------------
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(root.getAttribute('data-model'), (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.updateMatrixWorld(true);
    const all = new Box3();
    const regionBoxes = new Map();
    model.traverse((o) => {
      if (!o.isMesh) return;
      const info = BY_ID.get(o.name) || BY_ID.get(o.parent?.name);
      if (!info) return;
      const g = o.geometry;
      g.computeVertexNormals();
      const n = g.attributes.position.count;
      const colors = new Float32Array(n * 3).fill(1);
      g.setAttribute('color', new Float32BufferAttribute(colors, 3));
      const mat = new MeshStandardMaterial({ color: IVORY.clone(), roughness: 0.62, metalness: 0, vertexColors: true, transparent: true });
      o.material = mat;
      const box = new Box3().setFromObject(o);
      const center = box.getCenter(new Vector3());
      all.union(box);
      if (!regionBoxes.has(info.region)) regionBoxes.set(info.region, new Box3());
      regionBoxes.get(info.region).union(box);
      o.userData.id = info.id;
      bones.set(info.id, { mesh: o, mat, base: o.position.clone(), center, box, region: info.region, colors });
    });
    all.getCenter(bodyCenter);
    for (const [k, b] of regionBoxes) regionCenter.set(k, b.getCenter(new Vector3()));
    const at = (id, dx = 0, dy = 0) => bones.get(id).center.clone().add(new Vector3(dx, dy, 0.06));
    const sideBox = (key, side) => regionBox(key, side).getCenter(new Vector3()).add(new Vector3(0, 0, 0.06));
    const skullTop = regionBoxes.get('skull').max.y;
    regionAnchor.set('skull', new Vector3(0, skullTop + 0.05, 0));
    regionAnchor.set('shoulder', at('l-clavicle', 0.07, 0.05));
    regionAnchor.set('chest', at('sternum', 0, 0.02));
    regionAnchor.set('spine', at('l3', 0, 0.02));
    regionAnchor.set('arm', at('r-humerus', -0.1));
    regionAnchor.set('hand', sideBox('hand', 'l').add(new Vector3(0.1, 0, 0)));
    regionAnchor.set('pelvis', at('r-hip', -0.12, 0.02));
    regionAnchor.set('leg', at('l-femur', 0.12));
    regionAnchor.set('foot', sideBox('foot', 'r').add(new Vector3(-0.1, 0, 0)));
    buildOrgans(regionBoxes);
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    applyColors();
    root.__lab.bones = bones;
  }, (e) => {
    if (e.total) R.bar.style.width = `${Math.round(e.loaded / e.total * 100)}%`;
  }, () => {
    R.loading.innerHTML = 'The skeleton could not be loaded. Please reload the page.<br><span class="zh">骨架載入失敗，請重新整理頁面。</span>';
  });

  function boneCenter(id) { return bones.get(id).center; }
  function buildOrgans(rb) {
    // 腦：顱頂幾塊骨頭圍起來的空間
    const cran = new Box3();
    for (const id of ['frontal', 'occipital', 'r-parietal', 'l-parietal', 'r-temporal', 'l-temporal']) cran.union(bones.get(id).box);
    const cs = cran.getSize(new Vector3()), cc = cran.getCenter(new Vector3());
    const brain = new Mesh(new SphereGeometry(1, 40, 28), organMat(0xf2a7b8));
    brain.scale.set(cs.x * 0.42, cs.y * 0.36, cs.z * 0.42);
    brain.position.set(cc.x, cc.y + cs.y * 0.08, cc.z - cs.z * 0.02);
    organs.add(brain);
    // 肺與心：胸廓裡面
    const ribs = rb.get('chest');
    const rs = ribs.getSize(new Vector3()), rc = ribs.getCenter(new Vector3());
    for (const side of [-1, 1]) {
      const lung = new Mesh(new SphereGeometry(1, 36, 28), organMat(0xf0bfae));
      lung.scale.set(rs.x * 0.2, rs.y * 0.34, rs.z * 0.3);
      lung.position.set(rc.x + side * rs.x * 0.2, rc.y + rs.y * 0.06, rc.z - rs.z * 0.04);
      organs.add(lung);
    }
    const heart = new Mesh(new SphereGeometry(1, 32, 24), organMat(0xd8434a));
    heart.material.opacity = 0.8;
    heart.scale.set(rs.x * 0.12, rs.y * 0.14, rs.z * 0.15);
    heart.position.set(rc.x + rs.x * 0.06, rc.y - rs.y * 0.1, rc.z + rs.z * 0.12);
    heart.rotation.z = -0.5;
    organs.add(heart);
    // 脊髓：從第一頸椎到第一、二腰椎之間（脊髓在那裡就結束了）
    const pts = ['c1', 'c3', 'c5', 'c7', 't2', 't4', 't6', 't8', 't10', 't12', 'l1', 'l2']
      .map((id) => boneCenter(id).clone().add(new Vector3(0, 0, -0.012)));
    const cord = new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), 60, 0.0065, 10), organMat(0xffe08a));
    cord.material.opacity = 0.95;
    organs.add(cord);
    const ol = (en, zh, at) => organLabels.push({ el: lab('sk-ol', `${en} · ${zh}`), at });
    ol('Brain', '腦', brain.position.clone().add(new Vector3(0, cs.y * 0.42, 0)));
    ol('Lungs', '肺', new Vector3(rc.x - rs.x * 0.2, rc.y + rs.y * 0.2, rc.z + rs.z * 0.3));
    ol('Heart', '心臟', heart.position.clone().add(new Vector3(rs.x * 0.2, -rs.y * 0.1, rs.z * 0.1)));
    ol('Spinal cord', '脊髓', boneCenter('t8').clone().add(new Vector3(0.05, 0, -0.07)));
    organs.traverse((o) => { o.renderOrder = 2; });
  }

  // ---------------- 拆開 ----------------
  const off = new Vector3();
  function offsetOf(region) {
    // 整區先從身體中心往外移
    return off.copy(regionCenter.get(region)).sub(bodyCenter).multiplyScalar(0.45 * state.apart);
  }
  function applyApart() {
    for (const b of bones.values()) {
      const o = offsetOf(b.region).clone();
      o.add(tmp.copy(b.center).sub(regionCenter.get(b.region)).multiplyScalar(0.9 * state.apart));
      b.mesh.position.copy(b.base).add(o);
    }
    organs.visible = state.apart < 0.05 && state.mode?.type === 'job' && state.mode.key === 'protect';
  }

  // ---------------- 上色 ----------------
  function inJob(key, id, b) {
    if (key === 'blood') return MARROW_REGIONS.has(b.region) || MARROW_EXTRA.has(id) || GRADIENT.has(id);
    return JOBS.find((j) => j.key === key).regions.includes(b.region);
  }
  function paint(b, fn) {
    const pos = b.mesh.geometry.attributes.position;
    const col = b.mesh.geometry.attributes.color;
    for (let k = 0; k < pos.count; k++) {
      tmp.fromBufferAttribute(pos, k).applyMatrix4(b.mesh.matrixWorld);
      const [r, g, bl] = fn(tmp);
      col.setXYZ(k, r, g, bl);
    }
    col.needsUpdate = true;
  }
  const white = () => [1, 1, 1];
  function applyColors() {
    if (!state.ready) return;
    const m = state.mode;
    const countSet = m?.type === 'count' ? new Set(HAND) : null;
    for (const [id, b] of bones) {
      let c = IVORY, op = 1, em = 0;
      let grad = false;
      if (m?.type === 'region') {
        if (b.region !== m.key) op = 0.1;
      } else if (m?.type === 'job') {
        if (inJob(m.key, id, b)) {
          c = JOB_COLOR[m.key];
          if (m.key === 'protect') op = 0.42;   // 半透明，看得到被保護的器官
          if (m.key === 'blood' && GRADIENT.has(id)) { c = IVORY; grad = true; }
        } else op = 0.16;
      } else if (countSet) {
        const i = HAND.indexOf(id);
        if (i < 0) op = 0.12;
        else if (i < state.count) c = GOLD;
        else if (i === state.count) { c = GOLD; em = 0.55; }
      }
      if (id === state.selected && !countSet) { em = 0.45; op = 1; }
      else if (id === state.hover && op === 1) em = Math.max(em, 0.12);
      b.mat.color.copy(c);
      b.mat.emissive.copy(em ? GOLD : IVORY).multiplyScalar(em ? em * 0.6 : 0);
      b.mat.opacity = op;
      b.mat.depthWrite = op === 1;
      b.mesh.renderOrder = op === 1 ? 0 : 3;
      // 股骨、肱骨：只把上端（靠近身體的那一段）染紅
      if (grad !== !!b.grad) {
        b.grad = grad;
        if (grad) {
          b.mesh.updateMatrixWorld(true);
          const top = b.box.max.y, len = b.box.max.y - b.box.min.y;
          const red = JOB_COLOR.blood;
          paint(b, (p) => {
            const t = MathUtils.smoothstep((top - p.y) / len, 0.18, 0.3);  // 0 = 上端 → 1 = 骨幹
            return [MathUtils.lerp(red.r / IVORY.r, 1, t), MathUtils.lerp(red.g / IVORY.g, 1, t), MathUtils.lerp(red.b / IVORY.b, 1, t)];
          });
        } else paint(b, white);
      }
    }
    applyApart();
  }

  // ---------------- 右側資訊卡 ----------------
  function showBone(id) {
    const b = id && BY_ID.get(id);
    R.card.classList.toggle('on', !!b);
    if (!b) return;
    const r = REGION.get(b.region);
    R.en.textContent = b.en;
    R.nick.textContent = b.nick ? `“${b.nick}”` : '';
    R.zh.textContent = b.zh;
    R.region.innerHTML = `<b>${esc(r.en)} · ${esc(r.zh)}</b>`;
    R.rjob.innerHTML = `${esc(r.job_en)}<span class="zh">${esc(r.job_zh)}</span>`;
  }
  function select(id) {
    state.selected = id;
    showBone(id);
    if (id) {
      const b = BY_ID.get(id);
      selLabel.innerHTML = `${esc(b.en)} · ${esc(b.zh)}`;
    }
    applyColors();
  }

  // ---------------- 鏡頭 ----------------
  const fly = { t: 1, p0: new Vector3(), p1: new Vector3(), t0: new Vector3(), t1: new Vector3() };
  function flyTo(pos, target) {
    fly.p0.copy(camera.position); fly.t0.copy(controls.target);
    fly.p1.copy(pos); fly.t1.copy(target); fly.t = 0;
  }
  function flyToBox(box, dir = new Vector3(0.28, 0.12, 1)) {
    const c = box.getCenter(new Vector3()), s = box.getSize(new Vector3());
    const r = Math.max(s.x, s.y, s.z) * 0.5 + 0.02;
    const dist = r / Math.sin(MathUtils.degToRad(camera.fov * 0.5)) * (camera.aspect < 1 ? 1.25 / camera.aspect ** 0.5 : 1.05);
    flyTo(c.clone().add(dir.clone().normalize().multiplyScalar(dist)), c);
  }
  function regionBox(key, side) {
    const box = new Box3();
    for (const [id, b] of bones) if (b.region === key && (!side || id.startsWith(`${side}-`))) box.union(new Box3().setFromObject(b.mesh));
    return box;
  }

  // ---------------- 模式 ----------------
  const chips = [...root.querySelectorAll('[data-region]')];
  const jobBtns = [...root.querySelectorAll('[data-job]')];
  function setMode(m) {
    stopCount(false);
    state.mode = m;
    chips.forEach((c) => c.classList.toggle('on', m?.type === 'region' && c.getAttribute('data-region') === m.key));
    jobBtns.forEach((c) => c.setAttribute('aria-pressed', m?.type === 'job' && c.getAttribute('data-job') === m.key ? 'true' : 'false'));
    const job = m?.type === 'job' ? JOBS.find((j) => j.key === m.key) : null;
    R.jobText.innerHTML = job ? `${esc(job.text_en)}<span class="zh">${esc(job.text_zh)}</span>` : R.jobText.getAttribute('data-default');
    applyColors();
  }
  function goRegion(key) {
    if (!state.ready) return;
    if (state.mode?.type === 'region' && state.mode.key === key) { setMode(null); goHome(); return; }
    select(null);
    setMode({ type: 'region', key });
    flyToBox(regionBox(key));
  }
  function goJob(key) {
    if (!state.ready) return;
    if (state.mode?.type === 'job' && state.mode.key === key) { setMode(null); return; }
    select(null);
    if (state.apart > 0) setApart(0);
    setMode({ type: 'job', key });
    if (key === 'protect') flyTo(new Vector3(0.62, 1.42, 1.45), new Vector3(0, 1.3, 0));
    else if (key === 'blood') flyTo(new Vector3(0.8, 1.2, 2.3), new Vector3(0, 1.08, 0));
    else goHome();
  }
  function goHome() { flyTo(homePos(), HOME.target); }
  function setApart(v) {
    state.apart = v;
    R.apart.value = v;
    R.apart.style.setProperty('--p', `${v * 100}%`);
    applyApart();
  }

  // ---------------- 數一數手上的骨頭 ----------------
  const COUNT_STEP = 0.9;   // 每塊骨頭停幾秒
  let countClock = 0;
  const STAGE = (i) => (i < 8
    ? ['Wrist', '手腕', 'Press around your wrist. These eight small bones slide past each other when you bend it.', '按一按手腕：這八塊小骨頭在你彎手腕時會互相滑動。']
    : i < 13
      ? ['Palm', '手掌', 'Press your palm. You can feel one long bone running toward each finger.', '按一按手掌：每根手指下面都有一根長長的骨頭。']
      : ['Fingers', '手指', 'Bend each finger. The thumb has two bones; every other finger has three.', '彎一彎每根手指：拇指有兩節，其他手指各有三節。']);
  function showCountStep() {
    const i = state.count;
    R.countN.textContent = String(Math.min(i + 1, HAND.length));
    const [en, zh, t_en, t_zh] = STAGE(Math.min(i, HAND.length - 1));
    const b = BY_ID.get(HAND[Math.min(i, HAND.length - 1)]);
    const nm = b.en.replace(/^Right /, '');
    selLabel.innerHTML = `${i + 1}. ${esc(nm[0].toUpperCase() + nm.slice(1))} · ${esc(b.zh.replace(/^右/, ''))}`;
    R.countT.innerHTML = `<b>${en} · ${zh}</b>${esc(t_en)}<span class="zh">${esc(t_zh)}</span>`;
    applyColors();
  }
  function startCount() {
    if (!state.ready) return;
    select(null);
    setMode(null);
    if (state.apart > 0) setApart(0);
    state.mode = { type: 'count' };
    state.count = 0; countClock = 0;
    root.classList.add('sk-counting');
    R.countBtn.setAttribute('aria-pressed', 'true');
    R.countBtn.querySelector('span').innerHTML = 'Stop<small>停止</small>';
    flyToBox(regionBox('hand', 'r'), new Vector3(-0.15, 0.05, 1));
    showCountStep();
  }
  function stopCount(finish) {
    if (state.mode?.type !== 'count') return;
    root.classList.remove('sk-counting');
    R.countBtn.setAttribute('aria-pressed', 'false');
    R.countBtn.querySelector('span').innerHTML = finish ? 'Count again<small>再數一次</small>' : 'Count the bones in one hand<small>數一數一隻手的骨頭</small>';
    if (finish) {
      R.countN.textContent = '27';
      R.countT.innerHTML = '<b>27 bones in one hand · 一隻手 27 塊骨頭</b>8 in the wrist, 5 in the palm, and 14 in the fingers. Your two hands hold 54 of your 206 bones, more than a quarter of them.'
        + '<span class="zh">手腕 8 塊、手掌 5 塊、手指 14 塊。兩隻手就有 54 塊，占全身 206 塊的四分之一以上。</span>';
    }
    state.mode = finish ? { type: 'count' } : null;
    state.count = finish ? HAND.length : -1;
    applyColors();
  }

  // ---------------- 操作 ----------------
  chips.forEach((c) => c.addEventListener('click', () => goRegion(c.getAttribute('data-region'))));
  jobBtns.forEach((c) => c.addEventListener('click', () => goJob(c.getAttribute('data-job'))));
  R.countBtn.addEventListener('click', () => {
    if (state.mode?.type === 'count' && state.count < HAND.length) stopCount(false);
    else startCount();
  });
  R.apart.addEventListener('input', () => setApart(parseFloat(R.apart.value)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); return el; };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="spin"]', (v) => { state.spin = v; controls.autoRotate = v; });
  controls.autoRotateSpeed = 1.2;
  $('.al-home').addEventListener('click', () => { select(null); setMode(null); setApart(0); goHome(); });
  $('.sk-clear').addEventListener('click', () => { select(null); });

  const ray = new Raycaster();
  const ndc = new Vector2();
  const meshes = () => [...bones.values()].filter((b) => b.mat.opacity > 0.5).map((b) => b.mesh);
  function pick(e) {
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(meshes(), false)[0];
    return hit ? hit.object.userData.id : null;
  }
  let down = null;
  cv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  cv.addEventListener('pointerup', (e) => {
    if (!state.ready || !down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    if (state.mode?.type === 'count') stopCount(false);
    const id = pick(e);
    select(id === state.selected ? null : id);
  });
  let hoverQueued = null;
  cv.addEventListener('pointermove', (e) => {
    if (e.buttons || e.pointerType === 'touch' || !state.ready) return;
    hoverQueued = e;
  });
  cv.addEventListener('pointerleave', () => { hoverQueued = null; if (state.hover) { state.hover = null; applyColors(); } });

  // ---------------- 尺寸 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  // 手機上九個區域標籤會擠成一團，預設關掉（開關還在，想看再打開）
  if (spaceWrap.clientWidth < 520) {
    state.labels = false;
    const tgl = $('[data-t="labels"]');
    if (tgl) tgl.checked = false;
  }

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (hoverQueued) {
      const id = pick(hoverQueued);
      hoverQueued = null;
      cv.style.cursor = id ? 'pointer' : 'grab';
      if (id !== state.hover) { state.hover = id; applyColors(); }
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    if (state.mode?.type === 'count' && state.count < HAND.length && fly.t >= 1) {
      countClock += dt;
      if (countClock >= COUNT_STEP) {
        countClock = 0;
        state.count += 1;
        if (state.count >= HAND.length) stopCount(true);
        else showCountStep();
      }
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  R.jobText.setAttribute('data-default', R.jobText.innerHTML);
  // 除錯用：$('[data-skeleton-lab]').__lab；背景分頁 rAF 停擺時用 render() 直接畫一張
  root.__lab = { camera, controls, state, select, goRegion, goJob, setApart, startCount,
    stepCount: (i) => { if (fly.t < 1) { fly.t = 1; camera.position.copy(fly.p1); controls.target.copy(fly.t1); } state.count = i; showCountStep(); }, render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); } };
  return { job: goJob, region: goRegion, count: startCount };
}

function boot() {
  const root = document.querySelector('[data-skeleton-lab]');
  if (!root) return;
  // 模型約 1 MB，等快捲進畫面再載，不拖慢頁面
  let api = null, started = false;
  const start = () => { if (!started) { started = true; api = initLab(root); } return api; };
  const io = new IntersectionObserver((ents) => {
    if (ents[0].isIntersecting) { io.disconnect(); start(); }
  }, { rootMargin: '600px' });
  io.observe(root);
  // 下方卡片的「在 3D 模型中看」按鈕
  const hook = (attr, fn) => document.querySelectorAll(`[${attr}]`).forEach((b) => b.addEventListener('click', (e) => {
    const lab = start();
    if (!lab) return;
    e.preventDefault();
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const v = b.getAttribute(attr);
    const go = () => (root.__lab?.bones ? fn(lab, v) : setTimeout(go, 150));
    go();
  }));
  hook('data-lab-job', (lab, v) => lab.job(v));
  hook('data-lab-region', (lab, v) => lab.region(v));
  hook('data-lab-count', (lab) => lab.count());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
