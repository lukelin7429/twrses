/*
 * 人體探索 · 第十一課「為什麼會換牙？」的 3D 牙齒。
 *
 * 真實的：頭骨、上頷骨、下頷骨（skeleton.glb，BodyParts3D；資料裡沒有牙齒），上下頷骨畫得比較清楚，看得到骨頭裡的恆牙。
 * 自繪示意：52 顆牙（20 顆乳牙＋32 顆恆牙，含 4 顆智齒），大約真實大小，沿著齒弓排在牙槽骨上。
 *   齒弓用橢圓（上：半寬 28 mm、深 50 mm；下：26、50），前端位置、牙槽骨高度從真實的上下頷骨頂點算出來（crest）。
 *   每顆牙：牙冠（橢球＋臼齒的牙尖）＋牙根（圓錐，臼齒 2–3 根）；本地座標 +Y＝牙根方向、牙冠在 −Y，下排轉 180°。
 *
 * 年齡（3–20 歲）驅動一切，平均年齡照牙科萌發表（ADA／Queensland Health）：
 *   乳牙：shed 前在嘴裡；shed 前 1.5 年牙根開始被吸收（變短），掉的時候往下掉、變淡。
 *   恆牙：erupt − 3 年前埋在骨頭裡（往牙根方向深 12 mm、往舌側 2 mm、淡淡的），erupt 前後往上長出，牙根跟著長。
 *   智齒 10 歲以後才出現在骨頭裡。下頷骨和下排牙掛在顳顎關節的 pivot 上，可以張開嘴巴。
 * 牙齒圖（initChart）與蛀牙剖面（initCavity）是 2D，不需要 WebGL；牙齒年齡＝在 3–20 歲間找與標記最吻合的年齡。
 *
 * 產物：cd tools/body && npm run build → assets/js/teeth.js
 */
import {
  AmbientLight, Color, ConeGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtAge = (a) => (Math.round(a * 2) / 2).toString();

// ---------------- 牙齒資料（年齡＝歲，寬＝近遠心寬度 mm） ----------------
const ADULT = {
  u: [
    { en: 'Central incisor', zh: '正中門牙', k: 'inc', w: 8.5, ch: 10.5, rl: 13, erupt: 7.5 },
    { en: 'Lateral incisor', zh: '側門牙', k: 'inc', w: 6.5, ch: 9, rl: 13, erupt: 8.5 },
    { en: 'Canine', zh: '犬齒', k: 'can', w: 7.5, ch: 10, rl: 17, erupt: 11.5 },
    { en: 'First premolar', zh: '第一小臼齒', k: 'pm', w: 7, ch: 8.5, rl: 14, erupt: 10.5 },
    { en: 'Second premolar', zh: '第二小臼齒', k: 'pm', w: 6.5, ch: 8, rl: 14, erupt: 11 },
    { en: 'First molar (six-year molar)', zh: '第一大臼齒（六歲臼齒）', k: 'mol', w: 10, ch: 7.5, rl: 12, erupt: 6.5 },
    { en: 'Second molar (twelve-year molar)', zh: '第二大臼齒（十二歲臼齒）', k: 'mol', w: 9, ch: 7, rl: 11, erupt: 12.5 },
    { en: 'Wisdom tooth', zh: '智齒', k: 'mol', w: 8.5, ch: 6.5, rl: 10, erupt: 19 },
  ],
  l: [
    { en: 'Central incisor', zh: '正中門牙', k: 'inc', w: 5, ch: 9, rl: 12.5, erupt: 6.5 },
    { en: 'Lateral incisor', zh: '側門牙', k: 'inc', w: 5.5, ch: 9.5, rl: 14, erupt: 7.5 },
    { en: 'Canine', zh: '犬齒', k: 'can', w: 7, ch: 11, rl: 16, erupt: 9.5 },
    { en: 'First premolar', zh: '第一小臼齒', k: 'pm', w: 7, ch: 8.5, rl: 14, erupt: 11 },
    { en: 'Second premolar', zh: '第二小臼齒', k: 'pm', w: 7, ch: 8, rl: 14.5, erupt: 11.5 },
    { en: 'First molar (six-year molar)', zh: '第一大臼齒（六歲臼齒）', k: 'mol', w: 11, ch: 7.5, rl: 14, erupt: 6.5 },
    { en: 'Second molar (twelve-year molar)', zh: '第二大臼齒（十二歲臼齒）', k: 'mol', w: 10.5, ch: 7, rl: 13, erupt: 12 },
    { en: 'Wisdom tooth', zh: '智齒', k: 'mol', w: 10, ch: 6.5, rl: 11, erupt: 19 },
  ],
};
const BABY = {
  u: [
    { en: 'Baby central incisor', zh: '乳正中門牙', k: 'inc', w: 6.5, ch: 6, rl: 10, shed: 6.5 },
    { en: 'Baby lateral incisor', zh: '乳側門牙', k: 'inc', w: 5, ch: 5.6, rl: 10, shed: 7.5 },
    { en: 'Baby canine', zh: '乳犬齒', k: 'can', w: 7, ch: 6.5, rl: 13, shed: 11 },
    { en: 'Baby first molar', zh: '第一乳臼齒', k: 'mol', w: 7, ch: 5.2, rl: 8, shed: 10 },
    { en: 'Baby second molar', zh: '第二乳臼齒', k: 'mol', w: 9, ch: 5.5, rl: 9, shed: 11 },
  ],
  l: [
    { en: 'Baby central incisor', zh: '乳正中門牙', k: 'inc', w: 4, ch: 5, rl: 9, shed: 6.5 },
    { en: 'Baby lateral incisor', zh: '乳側門牙', k: 'inc', w: 4.5, ch: 5.2, rl: 10, shed: 7.5 },
    { en: 'Baby canine', zh: '乳犬齒', k: 'can', w: 5, ch: 6, rl: 11.5, shed: 10.5 },
    { en: 'Baby first molar', zh: '第一乳臼齒', k: 'mol', w: 8, ch: 5.5, rl: 8, shed: 10 },
    { en: 'Baby second molar', zh: '第二乳臼齒', k: 'mol', w: 10, ch: 5.5, rl: 9, shed: 11 },
  ],
};
// 某個位置（1–7）在某個年齡應該是：1＝乳牙、2＝恆牙、3＝空位
function predicted(jaw, pos, age) {
  const a = ADULT[jaw][pos - 1];
  if (pos >= 6) return age >= a.erupt ? 2 : 3;
  const b = BABY[jaw][pos - 1];
  if (age >= a.erupt) return 2;
  return age < b.shed ? 1 : 3;
}

// ---------------- 牙齒圖（2D） ----------------
function initChart(root, onShow) {
  const box = root.querySelector('.th-chart');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const cells = [...box.querySelectorAll('.th-c')], out = box.querySelector('.th-result'), to3d = box.querySelector('.th-to3d');
  let best = null;
  function calc() {
    const marked = cells.filter((c) => c.dataset.st !== '0');
    const n = (s) => cells.filter((c) => c.dataset.st === s).length;
    const baby = n('1'), adult = n('2'), gap = n('3');
    if (marked.length < 4) {
      best = null; to3d.hidden = true;
      out.innerHTML = `Marked ${marked.length} of 28 spots. Mark at least 4, and the more the better.<span class="zh">已標記 ${marked.length} 個位置（共 28 個）。至少標 4 個，標越多越準。</span>`;
      return;
    }
    let min = 1e9, hits = [];
    for (let A = 3; A <= 20.001; A += 0.1) {
      let miss = 0;
      for (const c of marked) if (predicted(c.dataset.jaw, +c.dataset.pos, A) !== +c.dataset.st) miss++;
      if (miss < min) { min = miss; hits = [A]; } else if (miss === min) hits.push(A);
    }
    best = hits[Math.floor(hits.length / 2)];
    const lo = hits[0], hi = hits[hits.length - 1];
    const range = hi - lo > 0.6 ? ` (anywhere from about ${fmtAge(lo)} to ${fmtAge(hi)})` : '';
    const rangeZh = hi - lo > 0.6 ? `（大約 ${fmtAge(lo)} 到 ${fmtAge(hi)} 歲之間）` : '';
    out.innerHTML = `<b>${baby + adult}</b> teeth marked: ${baby} baby, ${adult} adult, and ${gap} gaps. Your teeth look like a typical <b>${fmtAge(best)}-year-old</b>'s${range}.`
      + `<span class="zh">標記了 ${baby + adult} 顆牙：乳牙 ${baby} 顆、恆牙 ${adult} 顆，空位 ${gap} 個。你的牙齒像一般 ${fmtAge(best)} 歲的孩子${rangeZh}。</span>`;
    to3d.hidden = !onShow;
  }
  cells.forEach((c) => c.addEventListener('click', () => {
    const molar = +c.dataset.pos >= 6;
    const order = molar ? ['0', '2', '3'] : ['0', '1', '2', '3'];
    c.dataset.st = order[(order.indexOf(c.dataset.st) + 1) % order.length];
    calc();
  }));
  box.querySelector('.th-clear').addEventListener('click', () => { cells.forEach((c) => { c.dataset.st = '0'; }); calc(); });
  to3d.addEventListener('click', () => { if (best != null && onShow) onShow(best); });
  calc();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

// ---------------- 蛀牙剖面（2D） ----------------
const CAV = [
  ['A healthy molar: hard white enamel outside, softer dentin under it, and the pulp with nerves and blood vessels in the middle.', '健康的臼齒：外面是堅硬的白色琺瑯質，下面是比較軟的象牙質，中間是有神經和血管的牙髓。'],
  ['Bacteria live in plaque, a sticky film that builds up in the grooves when teeth are not brushed.', '細菌住在牙菌斑裡：沒刷乾淨時，黏黏的薄膜會堆在牙齒的溝裡。'],
  ['When you eat sugar, the bacteria make acid. The acid pulls minerals out of the enamel and leaves a chalky white spot.', '吃糖的時候，細菌產生酸。酸把琺瑯質裡的礦物質溶出來，留下白白的斑點。'],
  ['The enamel breaks through and the hole spreads faster in the softer dentin. Now only a dentist can fix it.', '琺瑯質被蛀穿，洞在比較軟的象牙質裡擴大得更快。這時只有牙醫補得起來。'],
  ['The hole reaches the pulp, and the nerve hurts. Brushing, fluoride, and fewer sweets stop this from the very first step.', '洞蛀到牙髓，神經就痛了。刷牙、用氟、少吃甜食，從第一步就能擋住它。'],
];
function initCavity(root) {
  const box = root.querySelector('.th-cav');
  if (!box || box.dataset.ready) return;
  box.dataset.ready = '1';
  const cv = box.querySelector('.th-cav-cv'), g = cv.getContext('2d'), msg = box.querySelector('.th-cav-msg');
  const btns = [...box.querySelectorAll('[data-cav]')];
  function tooth(path) {
    // 臼齒輪廓：牙冠（上方兩個牙尖）＋兩根牙根，W=360、H=300
    path.moveTo(95, 120); path.bezierCurveTo(90, 60, 120, 40, 150, 52); path.bezierCurveTo(165, 58, 172, 70, 180, 70);
    path.bezierCurveTo(188, 70, 195, 58, 210, 52); path.bezierCurveTo(240, 40, 270, 60, 265, 120);
    path.bezierCurveTo(262, 150, 250, 160, 245, 175); path.lineTo(235, 280); path.quadraticCurveTo(222, 292, 212, 280);
    path.lineTo(196, 182); path.quadraticCurveTo(180, 175, 164, 182); path.lineTo(148, 280); path.quadraticCurveTo(138, 292, 125, 280);
    path.lineTo(115, 175); path.bezierCurveTo(110, 160, 98, 150, 95, 120); path.closePath();
  }
  function draw(step) {
    const W = cv.width, H = cv.height;
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#0a1224'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#e9dcc0'; g.fillRect(0, 165, W, H - 165);                        // 骨頭
    g.fillStyle = '#e88f9a'; g.beginPath(); g.moveTo(0, 150); g.quadraticCurveTo(100, 135, 112, 148); g.lineTo(112, 175); g.lineTo(0, 175); g.fill();
    g.beginPath(); g.moveTo(W, 150); g.quadraticCurveTo(260, 135, 248, 148); g.lineTo(248, 175); g.lineTo(W, 175); g.fill();   // 牙齦
    const p = new Path2D(); tooth(p);
    g.fillStyle = '#f2e3b8'; g.fill(p);                                               // 象牙質
    g.save(); g.clip(p);
    g.fillStyle = '#fbfaf5'; g.beginPath(); g.moveTo(80, 128); g.bezierCurveTo(100, 132, 120, 70, 150, 64); g.bezierCurveTo(166, 70, 172, 84, 180, 84);
    g.bezierCurveTo(188, 84, 195, 70, 210, 64); g.bezierCurveTo(240, 70, 260, 132, 280, 128); g.lineTo(280, 20); g.lineTo(80, 20); g.fill();   // 琺瑯質
    g.restore();
    g.strokeStyle = 'rgba(10,18,36,.35)'; g.lineWidth = 2; g.stroke(p);
    const pulp = new Path2D();                                                        // 牙髓與根管
    pulp.moveTo(140, 140); pulp.bezierCurveTo(140, 105, 160, 100, 180, 112); pulp.bezierCurveTo(200, 100, 220, 105, 220, 140);
    pulp.lineTo(222, 265); pulp.lineTo(214, 265); pulp.lineTo(208, 160); pulp.quadraticCurveTo(180, 150, 152, 160); pulp.lineTo(146, 265); pulp.lineTo(138, 265); pulp.closePath();
    g.fillStyle = step >= 4 ? '#ff4d4d' : '#e35d6a'; g.fill(pulp);
    if (step >= 1) {                                                                  // 牙菌斑與細菌
      g.fillStyle = 'rgba(190,210,90,.85)'; g.beginPath(); g.ellipse(180, 76, 22, 9, 0, 0, 7); g.fill();
      g.fillStyle = '#5b7a1e';
      for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(166 + (i % 5) * 7, 72 + Math.floor(i / 5) * 6, 2.6, 1.6, i, 0, 7); g.fill(); }
    }
    if (step >= 2) {
      g.fillStyle = 'rgba(255,170,60,.9)';
      for (const [x, y] of [[150, 42], [205, 38], [178, 30]]) { g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); }
      g.fillStyle = '#fff'; g.font = '700 12px sans-serif'; g.textAlign = 'center'; g.fillText('acid · 酸', 178, 20);
      if (step === 2) { g.fillStyle = 'rgba(255,255,255,.95)'; g.beginPath(); g.ellipse(180, 86, 14, 6, 0, 0, 7); g.fill(); }
    }
    if (step >= 3) {
      g.fillStyle = '#3b2412'; g.beginPath(); g.moveTo(168, 80); g.quadraticCurveTo(180, 74, 192, 80); g.lineTo(198, step >= 4 ? 118 : 104);
      g.quadraticCurveTo(180, step >= 4 ? 128 : 112, 162, step >= 4 ? 118 : 104); g.closePath(); g.fill();
    }
    if (step >= 4) {
      g.strokeStyle = '#ffe08a'; g.lineWidth = 3;
      for (const [x, y] of [[240, 95], [252, 120], [118, 100]]) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + 8, y - 10); g.lineTo(x + 2, y - 10); g.lineTo(x + 10, y - 22); g.stroke(); }
    }
    g.fillStyle = 'rgba(255,255,255,.75)'; g.font = '600 11px sans-serif'; g.textAlign = 'left';
    g.fillText('enamel · 琺瑯質', 272, 70); g.fillText('dentin · 象牙質', 272, 140); g.textAlign = 'center'; g.fillText('pulp · 牙髓', 180, 140); g.textAlign = 'left';
    g.fillStyle = 'rgba(10,18,36,.7)'; g.fillText('gum · 牙齦', 8, 140); g.fillText('bone · 骨頭', 8, 290);
    msg.innerHTML = `${esc(CAV[step][0])}<span class="zh">${esc(CAV[step][1])}</span>`;
    btns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.cav === step ? 'true' : 'false'));
  }
  btns.forEach((b) => b.addEventListener('click', () => draw(+b.dataset.cav)));
  draw(0);
}

// ---------------- 3D ----------------
function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  initCavity(root);
  let api3d = null;
  const chart = initChart(root, (age) => { if (api3d) { root.scrollIntoView({ behavior: 'smooth', block: 'center' }); api3d.setAge(age); } });
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => chart && chart.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.005, 20);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.05; controls.maxDistance = 2;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.15));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(1, 2, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 1, -2); scene.add(rim);

  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), ageN: $('.th-age-n'), ageIn: $('.th-age-in'), ages: [...root.querySelectorAll('[data-age]')],
    nb: $('.th-n-baby'), na: $('.th-n-adult'), nw: $('.th-n-wait'), status: $('.th-status'), card: $('.th-card'),
    nameEn: $('.th-name-en'), nameZh: $('.th-name-zh'), set: $('.th-set'), when: $('.th-when'), play: $('.al-play'), playT: $('.al-play-t'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, age: 8, open: 1, openT: 1, playing: false, pick: null };
  const M = {
    baby: new MeshStandardMaterial({ color: 0xfdfcf6, roughness: 0.28 }),
    adult: new MeshStandardMaterial({ color: 0xf1e3c2, roughness: 0.32 }),
  };
  const teeth = [];
  let bones = null, jawPivot = null;
  const P = {};
  const SEL = new Color(0xffc857);

  // 把球「方」一點（超橢球）：門牙正面接近圓角長方形，臼齒是圓角方塊
  const geoCache = {};
  function crownGeo(ex) {
    if (geoCache[ex]) return geoCache[ex];
    const g = new SphereGeometry(1, 24, 18), p = g.attributes.position;
    const f = (v) => Math.sign(v) * Math.pow(Math.abs(v), ex);
    for (let i = 0; i < p.count; i++) p.setXYZ(i, f(p.getX(i)), f(p.getY(i)), p.getZ(i));
    g.computeVertexNormals();
    return (geoCache[ex] = g);
  }
  function makeTooth(d, baby) {
    const g = new Group(), mm = new Group();
    mm.scale.setScalar(0.001); g.add(mm);
    const mat = (baby ? M.baby : M.adult).clone();
    mat.transparent = true;
    const depth = d.k === 'inc' ? 0.62 : d.k === 'can' ? 0.95 : d.k === 'pm' ? 1.25 : 1.05;
    const crown = new Mesh(crownGeo(d.k === 'inc' ? 0.5 : d.k === 'can' ? 0.8 : 0.65), mat);
    crown.scale.set(d.w / 2, d.ch / 2, (d.w * depth) / 2);
    crown.position.y = -d.ch / 2 + 0.6;
    mm.add(crown);
    if (d.k === 'can') { const tip = new Mesh(new ConeGeometry(d.w * 0.28, d.ch * 0.35, 12), mat); tip.rotation.x = Math.PI; tip.position.y = -d.ch + 0.4; mm.add(tip); }
    if (d.k === 'pm' || d.k === 'mol') {
      const cs = d.k === 'pm' ? [[0, -0.22], [0, 0.22]] : [[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]];
      for (const [cx, cz] of cs) { const c = new Mesh(new SphereGeometry(d.w * 0.2, 12, 8), mat); c.position.set(cx * d.w, -d.ch + 1.0, cz * d.w * depth); mm.add(c); }
    }
    const roots = new Group(); mm.add(roots);
    const nr = d.k === 'mol' ? 2 : 1, rr = d.w * (nr > 1 ? 0.2 : 0.3);
    for (let i = 0; i < nr; i++) {
      const r = new Mesh(new ConeGeometry(rr, d.rl, 12), mat);
      r.position.set(nr > 1 ? (i ? 1 : -1) * d.w * 0.26 : 0, d.rl / 2, 0);
      roots.add(r);
    }
    g.userData = { mat, roots };
    g.traverse((o) => { if (o.isMesh) o.userData.tooth = g; });
    return g;
  }

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      const head = b.info.region === 'skull' || /^c[1-3]$/.test(b.info.id);
      b.mesh.visible = head;
      const jaw = ['r-maxilla', 'l-maxilla', 'mandible'].includes(b.info.id);
      b.mat.opacity = jaw ? 0.3 : 0.12; b.mat.depthWrite = false; b.mesh.renderOrder = 1;
    }
    const mx = [...worldVerts(bones.get('r-maxilla').mesh), ...worldVerts(bones.get('l-maxilla').mesh)];
    const md = worldVerts(bones.get('mandible').mesh);
    const upFront = Math.max(...mx.map((v) => v.z)) - 0.008, loFront = Math.max(...md.map((v) => v.z)) - 0.006;
    // 牙槽骨高度：齒位附近 5 mm 內，上頷取最低點、下頷取最高點（排除下頷枝）
    const crest = (verts, x, z, up) => {
      let best = null;
      for (const v of verts) {
        if ((v.x - x) ** 2 + (v.z - z) ** 2 > 0.005 ** 2) continue;
        if (!up && v.y > 1.535) continue;            // 下頷：排除往上升的下頷枝（這副骨架的牙槽骨頂約在 1.52 m）
        if (best == null || (up ? v.y < best : v.y > best)) best = v.y;
      }
      return best;
    };
    // 齒弓：橢圓的弧長表
    const arch = (a, b, z0) => {
      const tab = [[0, 0]];
      let s = 0, prev = V(0, 0, z0);
      for (let i = 1; i <= 400; i++) {
        const th = (i / 400) * 2.2, p = V(a * Math.sin(th), 0, z0 - b * (1 - Math.cos(th)));
        s += p.distanceTo(prev); prev = p; tab.push([s, th]);
      }
      return (sm, side) => {
        let th = 2.2;
        for (let i = 1; i < tab.length; i++) if (tab[i][0] >= sm) { const [s0, t0] = tab[i - 1], [s1, t1] = tab[i]; th = t0 + ((sm - s0) / (s1 - s0)) * (t1 - t0); break; }
        const sx = side === 'r' ? -1 : 1;
        const x = sx * a * Math.sin(th), z = z0 - b * (1 - Math.cos(th));
        const n = V(x / (a * a), 0, (z - (z0 - b)) / (b * b)).normalize();
        return { x, z, ang: Math.atan2(n.x, n.z) };
      };
    };
    const archs = { u: arch(0.028, 0.05, upFront), l: arch(0.026, 0.05, loFront) };
    // 下頷骨掛在顳顎關節上，張嘴時一起轉
    const mb = bones.get('mandible').box;
    jawPivot = new Group(); jawPivot.position.set(0, mb.max.y - 0.008, mb.min.z + 0.008); scene.add(jawPivot); jawPivot.updateMatrixWorld(true);
    jawPivot.attach(bones.get('mandible').mesh);
    for (const jaw of ['u', 'l']) for (const side of ['r', 'l']) {
      const up = jaw === 'u', verts = up ? mx : md;
      const place = (list, baby) => {
        let s = 0;
        list.forEach((d, i) => {
          const c = archs[jaw]((s + d.w / 2) / 1000, side);
          s += d.w;
          const y0 = crest(verts, c.x, c.z, up) ?? (up ? 1.536 : 1.52);
          const outer = new Group();
          outer.position.set(c.x, y0 + (up ? 0.0015 : -0.0015), c.z); outer.rotation.y = c.ang;
          const t = makeTooth(d, baby);
          if (!up) t.rotation.z = Math.PI;
          outer.add(t);
          if (up) scene.add(outer); else { jawPivot.add(outer); outer.position.sub(jawPivot.position); }
          teeth.push({ d, baby, jaw, side, pos: i + 1, outer, t, rest: outer.position.clone() });
        });
      };
      place(ADULT[jaw], false);
      place(BABY[jaw], true);
    }
    const front = V(0, (1.536 + 1.52) / 2, (upFront + loFront) / 2);
    P.target = front.clone().add(V(0, 0.002, -0.022));
    P.home = V(0.08, 0.04, 0.2);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    setAge(8);
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.35 - camera.aspect) * 0.7, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 年齡 ----------------
  const tmp = V(0, 0, 0);
  function applyAge() {
    const age = state.age;
    let nb = 0, na = 0, nw = 0;
    for (const T of teeth) {
      const { d, baby, t, outer } = T;
      const { mat, roots } = t.userData;
      let vis = true, dy = 0, inward = 0, op = 1, rs = 1;
      if (baby) {
        const fall = MathUtils.clamp((age - d.shed) / 0.15, 0, 1);
        vis = fall < 1;
        dy = -0.012 * fall * fall;                    // 往咬合面方向掉
        op = 1 - fall;
        rs = MathUtils.clamp(1 - (age - (d.shed - 1.5)) / 1.5, 0.12, 1);
        if (age < d.shed) nb++;
      } else {
        const start = d.erupt - 3, p = MathUtils.smoothstep(age, start, d.erupt + 0.4);
        if (d.erupt > 15 && age < 10) vis = false;    // 智齒 10 歲以後才在骨頭裡出現
        dy = 0.012 * (1 - p);                          // 往牙根方向埋
        inward = 0.002 * (1 - p);
        rs = 0.25 + 0.75 * p;
        op = p > 0.85 ? 1 : 0.55;
        if (vis) { if (p > 0.85) na++; else nw++; }
      }
      outer.visible = vis;
      if (!vis) continue;
      // 位移在牙齒自己的座標裡：+Y 是牙根方向（下排已轉 180°），−Z 是舌側
      tmp.set(0, T.jaw === 'u' ? dy : -dy, -inward).applyEuler(outer.rotation);
      outer.position.copy(T.rest).add(tmp);
      roots.scale.y = rs;
      mat.opacity = op; mat.depthWrite = op > 0.9;
      mat.emissive.copy(T === state.pick ? SEL : new Color(0)).multiplyScalar(T === state.pick ? 0.35 : 0);
    }
    R.nb.textContent = nb; R.na.textContent = na; R.nw.textContent = nw;
    R.ageN.textContent = fmtAge(age);
    R.ageIn.value = age; R.ageIn.style.setProperty('--p', `${((age - 3) / 17) * 100}%`);
    R.ages.forEach((b) => b.setAttribute('aria-pressed', Math.abs(+b.dataset.age - age) < 0.05 ? 'true' : 'false'));
    const S = age < 6 ? ['All 20 baby teeth are in. The adult teeth are already growing inside the jaws, right under them.', '20 顆乳牙都長齊了。恆牙已經在頷骨裡、就在乳牙正下方慢慢長。']
      : age < 7 ? ['The six-year molars come in at the back, and the lower front baby teeth get loose.', '六歲臼齒從後面長出來，下排的乳門牙開始搖動。']
        : age < 9 ? ['The front teeth trade places: gaps, and big new incisors.', '門牙換班中：有缺口，也有大大的新門牙。']
          : age < 12 ? ['Canines and premolars replace the baby canines and baby molars.', '犬齒和小臼齒，接替乳犬齒和乳臼齒。']
            : age < 13.5 ? ['The twelve-year molars come in, and the last baby teeth are gone.', '十二歲臼齒長出來，最後幾顆乳牙也換完了。']
              : age < 17 ? ['All 28 adult teeth are in. The wisdom teeth wait deep in the jaw.', '28 顆恆牙都到齊了，智齒還在頷骨深處等著。']
                : ['Wisdom teeth may come in now, or never. Some people have no room for them.', '智齒可能在這時候長出來，也可能一輩子都不長；有些人根本沒有位置。'];
    const h = `${esc(S[0])}<span class="zh">${esc(S[1])}</span>`;
    if (R.status.innerHTML !== h) R.status.innerHTML = h;
  }
  function setAge(a) { state.age = MathUtils.clamp(a, 3, 20); if (state.ready || teeth.length) applyAge(); }
  function pickTooth(T) {
    state.pick = T;
    R.card.classList.toggle('on', !!T);
    if (T) {
      const { d, baby } = T;
      R.nameEn.textContent = d.en; R.nameZh.textContent = d.zh;
      R.set.textContent = `${baby ? 'Baby tooth · 乳牙' : 'Adult tooth · 恆牙'} · ${T.jaw === 'u' ? 'upper · 上排' : 'lower · 下排'}`;
      R.when.innerHTML = baby
        ? `Usually falls out at about age ${fmtAge(d.shed)}.<span class="zh">通常大約 ${fmtAge(d.shed)} 歲掉落。</span>`
        : d.erupt > 15 ? 'Comes in at about 17 to 25, or never.<span class="zh">大約 17 到 25 歲長出，或一輩子都不長。</span>'
          : `Usually comes in at about age ${fmtAge(d.erupt)}.<span class="zh">通常大約 ${fmtAge(d.erupt)} 歲長出來。</span>`;
    }
    applyAge();
  }

  // ---------------- 操作 ----------------
  R.ageIn.addEventListener('input', () => { stopPlay(); setAge(+R.ageIn.value); });
  R.ages.forEach((b) => b.addEventListener('click', () => { stopPlay(); setAge(+b.dataset.age); }));
  function stopPlay() { state.playing = false; R.play.setAttribute('aria-pressed', 'false'); R.playT.textContent = 'Play · 播放'; root.classList.remove('is-playing'); }
  R.play.addEventListener('click', () => {
    if (state.playing) { stopPlay(); return; }
    if (state.age >= 19.9) setAge(3);
    state.playing = true; R.play.setAttribute('aria-pressed', 'true'); R.playT.textContent = 'Pause · 暫停'; root.classList.add('is-playing');
  });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="open"]', (v) => { state.openT = v ? 1 : 0; });
  bind('[data-t="skull"]', (v) => { if (bones) for (const b of bones.values()) if (b.info.region === 'skull' || /^c[1-3]$/.test(b.info.id)) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const ray = new Raycaster(), ptr = new Vector2();
  let down = null;
  cv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  cv.addEventListener('pointerup', (e) => {
    if (!state.ready || !down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const r = cv.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const meshes = [];
    for (const T of teeth) if (T.outer.visible) T.t.traverse((o) => { if (o.isMesh) meshes.push(o); });
    const hit = ray.intersectObjects(meshes, false)[0];
    pickTooth(hit ? teeth.find((T) => T.t === hit.object.userData.tooth) : null);
  });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    baby: lab.add('ey-lb', 'Baby tooth · 乳牙'), adult: lab.add('ey-lb ea-lb-b', 'Adult tooth · 恆牙'),
    wait: lab.add('ey-lb', 'Waiting in the bone · 在骨頭裡等待'), six: lab.add('ey-lb ea-lb-a', 'Six-year molar · 六歲臼齒'),
    wis: lab.add('ey-lb', 'Wisdom tooth · 智齒'), pick: lab.add('ey-lb ey-lb-d', ''),
  };
  let autoLabels = true, pickText = '';
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const wp = V(0, 0, 0);
  const at = (T, dy = 0) => { T.t.getWorldPosition(wp); return wp.clone().add(V(0, dy, 0)); };
  const find = (f) => teeth.find(f);
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const a = state.age;
    const bab = find((T) => T.baby && T.jaw === 'u' && T.side === 'l' && a < T.d.shed && T.pos >= (a < 10 ? 4 : 3));
    show(Lb.baby, !!bab, bab ? at(bab, -0.012) : wp, 0);
    const adl = find((T) => !T.baby && T.jaw === 'u' && T.side === 'r' && T.pos <= 2 && a >= T.d.erupt);
    show(Lb.adult, !!adl, adl ? at(adl, -0.014) : wp, 0);
    const wt = find((T) => !T.baby && T.jaw === 'l' && T.side === 'r' && T.pos === 3 && a < T.d.erupt - 0.3);
    show(Lb.wait, !!wt, wt ? at(wt, -0.01) : wp, 0);
    const six = find((T) => !T.baby && T.jaw === 'u' && T.side === 'l' && T.pos === 6);
    show(Lb.six, !!six && a >= 5.5 && a < 13, six ? at(six, 0.012) : wp, 0);
    const wis = find((T) => !T.baby && T.jaw === 'l' && T.side === 'l' && T.pos === 8);
    show(Lb.wis, !!wis && a >= 13, wis ? at(wis, -0.012) : wp, 0);
    if (state.pick) {
      const tx = `${state.pick.d.en} · ${state.pick.d.zh}`;
      if (tx !== pickText) { Lb.pick.textContent = tx; pickText = tx; }
    }
    show(Lb.pick, !!state.pick && state.pick.outer.visible, state.pick ? at(state.pick, state.pick.jaw === 'u' ? 0.016 : -0.016) : wp, 0);
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
    if (autoLabels) { state.labels = w >= 520; if (tgL) tgL.checked = state.labels; }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  function step(dt) {
    if (!state.ready) return;
    if (state.playing) {
      setAge(state.age + dt * 1.2);                  // 一年約 0.8 秒
      if (state.age >= 20) stopPlay();
    }
    state.open += (state.openT - state.open) * Math.min(1, dt * 4);
    if (jawPivot) jawPivot.rotation.x = MathUtils.degToRad(16) * state.open;
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  let visible = false, raf = 0, last = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (tm - (last || tm)) / 1000);
    last = tm;
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-teeth-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, teeth, setAge, pickTooth,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  api3d = { setAge: (a) => { stopPlay(); setAge(a); } };
  return { ready: () => state.ready, test: () => chart && chart.scrollTo() };
}

lazyBoot('[data-teeth-lab]', initLab, { test: (lab) => lab.test() });
