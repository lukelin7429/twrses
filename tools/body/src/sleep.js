/*
 * 人體探索 · 第十五課「為什麼要睡覺？」的 3D 模型：一整晚的睡眠。
 *
 * 真實的：骨架（skeleton.glb）整副放進 bodyG，再把 bodyG 繞 X 軸轉 −90° 讓它仰躺（頭在 −Z、臉朝上）。
 *   自繪的東西都用「站著」的座標放進 bodyG（骨頭的包圍盒才用得上）；標籤位置用 bodyG.localToWorld 換成世界座標。
 * 自繪示意：大腦兩半球（沿用第七課的功能區頂點色）、眼球、心臟、腦下垂體（生長激素，綠點沿脊柱流到腿骨）、
 *   松果體（褪黑激素，紫色光暈）、記憶火花；房間（床、牆、窗外的月亮／太陽）。
 *
 * 時間軸 state.min：0＝晚上 9:00 關燈，範圍 −30（20:30）～ 630（07:30）；播放時 1 秒＝15 分鐘。
 * 睡眠階段 SEG 是「典型的一晚」（示意，不是量測）：W 醒、L 淺睡（N1＋N2）、D 深睡（N3）、R 快速動眼期。
 *   深睡集中在前三輪、快速動眼期越到早上越長（第一次約在入睡後 80 分鐘）。
 * 每個階段決定：大腦各區亮度（深睡整顆腦同步慢慢起伏；REM 視覺區最亮、思考區最暗）、眼球（REM 快速跳動）、
 *   肌肉張力（REM＝0，手腳骨頭變藍）、心跳快慢、生長激素（深睡）、記憶火花；褪黑激素只看時鐘。
 * 右欄的腦波是 2D canvas，下方的睡眠階段圖也是 2D canvas（可點、可拖）。
 *
 * 睡眠計算機（initCalc）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/sleep.js
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, CatmullRomCurve3, CircleGeometry, Color, DirectionalLight, Group, HemisphereLight,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IVORY, labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const T0 = -30, T1 = 630, MIN_PER_SEC = 15;
// 典型的一晚（分鐘，0＝21:00）：[開始, 階段]
const SEG = [[T0, 'W'], [10, 'L'], [32, 'D'], [82, 'L'], [90, 'R'], [97, 'L'], [112, 'D'], [165, 'L'], [175, 'R'], [190, 'L'], [215, 'D'], [250, 'L'], [265, 'R'], [290, 'L'],
  [320, 'D'], [335, 'L'], [350, 'R'], [385, 'L'], [430, 'R'], [470, 'L'], [505, 'R'], [545, 'L'], [585, 'W'], [T1, 'W']];
const stageAt = (m) => { let s = 'W'; for (const [t, k] of SEG) { if (m >= t) s = k; else break; } return s; };
const totals = (m) => { const o = { L: 0, D: 0, R: 0 }; for (let i = 0; i < SEG.length - 1; i++) { const [a, k] = SEG[i], b = SEG[i + 1][0]; if (k !== 'W' && m > a) o[k] += Math.min(m, b) - a; } return o; };
const melAt = (m) => (m < 195 ? MathUtils.smoothstep(m, -90, 195) : m < 400 ? 1 : 1 - 0.88 * MathUtils.smoothstep(m, 400, 620));      // 傍晚上升、凌晨最高、早上消退
const clockOf = (m) => { const t = ((21 * 60 + Math.round(m)) % 1440 + 1440) % 1440, h = Math.floor(t / 60), mm = t % 60; return `${h % 12 === 0 ? 12 : h % 12}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
const SCOL = { W: '#ffd36e', L: '#7fb0ff', D: '#4a63d8', R: '#ff8fc0' }, LEVEL = { W: 0, R: 1, L: 2, D: 3 };
// 各階段的大腦活動（0–1）
const REGIONS = {
  think: { color: 0x7fb0ff, test: (x, y, z) => z > 0.38 },
  motor: { color: 0xff8a5c, test: (x, y, z) => z > -0.02 && z <= 0.3 && y > -0.05 },
  touch: { color: 0xffd36e, test: (x, y, z) => z > -0.36 && z <= -0.02 && y > -0.05 },
  vision: { color: 0x7ddc9a, test: (x, y, z) => z <= -0.58 },
  hearing: { color: 0xc59cff, test: (x, y, z, lat) => lat > 0.55 && y < -0.2 && z > -0.5 && z < 0.3 },
};
const ACT = {
  W: { think: 1, motor: 0.8, touch: 0.8, vision: 0.9, hearing: 0.8, rest: 0.5 },
  L: { think: 0.25, motor: 0.2, touch: 0.25, vision: 0.2, hearing: 0.3, rest: 0.15 },
  D: { think: 0.1, motor: 0.08, touch: 0.1, vision: 0.08, hearing: 0.1, rest: 0.05 },
  R: { think: 0.12, motor: 0.75, touch: 0.5, vision: 1, hearing: 0.6, rest: 0.45 },
};
const TONE = { W: 1, L: 0.6, D: 0.4, R: 0 }, HEART = { W: 1.4, L: 1.2, D: 1.0, R: 1.35 };
const BASE = new Color(0x6f5a78), OFF = new Color(0x5b8cff), RESTC = new Color(0xf0b4c4);
const RC = Object.fromEntries(Object.entries(REGIONS).map(([k, r]) => [k, new Color(r.color)]));

// ---------------- 睡眠計算機（2D） ----------------
function initCalc(root) {
  const box = root.querySelector('.zz-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const KEY = 'twrses-sleep-week';
  const q = (s) => box.querySelector(s);
  const bed = q('.zz-bed'), wake = q('.zz-wake'), out = q('.zz-hours'), msg = q('.zz-msg'), avg = q('.zz-avg'), days = [...box.querySelectorAll('.zz-day')];
  let week = new Array(7).fill(null);
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(s) && s.length === 7) week = s.map((x) => (typeof x === 'number' && x > 0 && x <= 24 ? x : null)); } catch (e) { /* 沒有 localStorage 也能用 */ }
  const mins = (v) => { const m = /^(\d{1,2}):(\d{2})/.exec(v || ''); return m ? +m[1] * 60 + +m[2] : null; };
  const hoursNow = () => { const a = mins(bed.value), b = mins(wake.value); if (a === null || b === null) return null; let dlt = b - a; if (dlt <= 0) dlt += 1440; return dlt / 60; };
  const fmt = (h) => { const m = Math.round(h * 60); return [`${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`, `${Math.floor(m / 60)} 小時 ${m % 60} 分`]; };
  function draw() {
    const h = hoursNow();
    let en, zh, cls = '';
    if (h === null) { out.textContent = '—'; en = 'Enter both times.'; zh = '請輸入兩個時間。'; }
    else {
      out.textContent = fmt(h)[0];
      if (h > 16) { en = 'That is a very long sleep. Check the two times again.'; zh = '這樣睡太久了，再檢查一次兩個時間。'; cls = 'zz-warn'; }
      else if (h >= 9 && h <= 12) { en = `${fmt(h)[0]}: inside the 9 to 12 hours that children from 6 to 12 need. Well done!`; zh = `${fmt(h)[1]}：在 6 到 12 歲孩子需要的 9 到 12 小時之內，做得好！`; cls = 'zz-ok'; }
      else if (h < 9) { const need = fmt(9 - h); en = `${fmt(h)[0]}: about ${need[0]} short of 9 hours. Could bedtime move a little earlier tonight?`; zh = `${fmt(h)[1]}：離 9 小時還差大約 ${need[1]}。今晚可以早一點睡嗎？`; cls = 'zz-warn'; }
      else { en = `${fmt(h)[0]}: more than 12 hours. A long sleep now and then is fine, for example after a busy week.`; zh = `${fmt(h)[1]}：超過 12 小時。偶爾睡久一點沒關係，例如忙了一整個星期之後。`; }
    }
    msg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`; msg.className = `zz-msg ${cls}`;
    const got = week.filter((x) => x !== null);
    days.forEach((b, i) => {
      const v = week[i], bar = b.querySelector('i'), num = b.querySelector('b');
      bar.style.height = `${v === null ? 0 : Math.min(100, (v / 12) * 100)}%`;
      bar.className = v === null ? '' : v >= 9 ? 'zz-ok' : 'zz-warn';
      num.textContent = v === null ? '+' : (Math.round(v * 10) / 10).toString();
      b.setAttribute('aria-pressed', v === null ? 'false' : 'true');
    });
    if (!got.length) avg.innerHTML = 'Tap a day to save last night’s sleep there. Tap it again to clear it.<span class="zh">點一下星期幾，把昨晚的睡眠存進去；再點一次就清除。</span>';
    else { const a = got.reduce((x, y) => x + y, 0) / got.length, ok = got.filter((x) => x >= 9).length; avg.innerHTML = `Average of ${got.length} ${got.length === 1 ? 'night' : 'nights'}: <b>${fmt(a)[0]}</b>. Nights with 9 hours or more: <b>${ok}</b>.<span class="zh">${got.length} 個晚上的平均：${fmt(a)[1]}；睡滿 9 小時的有 ${ok} 晚。</span>`; }
    try { localStorage.setItem(KEY, JSON.stringify(week)); } catch (e) { /* ignore */ }
  }
  bed.addEventListener('input', draw); wake.addEventListener('input', draw);
  days.forEach((b, i) => b.addEventListener('click', () => { const h = hoursNow(); week[i] = week[i] === null ? (h === null || h > 16 ? null : h) : null; draw(); }));
  q('.zz-clear').addEventListener('click', () => { week = new Array(7).fill(null); draw(); });
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), week: () => week };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const calc = initCalc(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => calc && calc.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.02, 40);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.25; controls.maxDistance = 6; controls.maxPolarAngle = Math.PI * 0.495;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.6); key.position.set(2, 4, 1.5); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 2, -2.5); scene.add(rim);

  const STAGES = JSON.parse(root.getAttribute('data-stages') || '{}');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), time: $('.zz-t'), stage: $('.zz-stage'), status: $('.zz-status'), eeg: $('.zz-eeg'), hyp: $('.zz-hyp canvas'),
    slider: $('.zz-time'), play: $('.al-play'), playT: $('.al-play-t'), tL: $('.zz-tl'), tD: $('.zz-td'), tR: $('.zz-tr'),
    mTone: $('.zz-m-tone i'), mGh: $('.zz-m-gh i'), mMel: $('.zz-m-mel i'), jumps: [...root.querySelectorAll('[data-jump]')], head: $('.zz-head'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, min: T0, playing: true, clock: 0, stage: 'W', tone: 1, gh: 0, mel: 0, mem: 0, headView: false, act: { ...ACT.W } };
  let bones = null;
  const P = {};
  const room = new Group(), bodyG = new Group();
  room.visible = false; bodyG.visible = false;       // 載入完、放好位置才顯示
  scene.add(room, bodyG);
  const W = (v) => bodyG.localToWorld(v.clone());   // 站著的座標 → 世界座標
  const ball = (r, mat, parent = bodyG, seg = 12) => { const m = new Mesh(new SphereGeometry(r, seg, Math.max(6, seg - 2)), mat); parent.add(m); return m; };

  const hemis = [], limbs = [], ghDots = [], memDots = [], eyes = [];
  let heart = null, melGlow = null, pitGlow = null, sky = null, moon = null, sun = null, stars = null, wall = null, lampGlow = null;
  const M = {
    gh: new MeshBasicMaterial({ color: 0x6fe08a }), mel: new MeshBasicMaterial({ color: 0xb48cff, transparent: true, opacity: 0, depthWrite: false }),
    mem: new MeshBasicMaterial({ color: 0xffd36e }), dream: new MeshBasicMaterial({ color: 0xff9fd0 }),
    heart: new MeshStandardMaterial({ color: 0xd9433f, roughness: 0.5 }),
    pit: new MeshBasicMaterial({ color: 0x6fe08a }), pin: new MeshBasicMaterial({ color: 0xb48cff }),
  };

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    bodyG.add(model);
    let minZ = 9;
    for (const b of bones.values()) {
      const reg = b.info.region;
      b.mat.opacity = reg === 'skull' ? 0.16 : 0.62; b.mat.depthWrite = reg !== 'skull'; b.mesh.renderOrder = reg === 'skull' ? 4 : 1;
      if (['arm', 'hand', 'leg', 'foot'].includes(reg)) limbs.push(b);
      minZ = Math.min(minZ, b.box.min.z);
    }
    const Bn = (id) => bones.get(id), C = (id) => Bn(id).center.clone();
    // ---------- 大腦（沿用第七課的畫法） ----------
    const cran = Bn('frontal').box.clone();
    for (const id of ['occipital', 'r-parietal', 'l-parietal', 'r-temporal', 'l-temporal']) cran.union(Bn(id).box);
    const cs = cran.getSize(V(0, 0, 0)), cc = cran.getCenter(V(0, 0, 0));
    const bc = V(cc.x, cc.y + cs.y * 0.06, cc.z - cs.z * 0.02);
    const hsx = cs.x * 0.2, hsy = cs.y * 0.33, hsz = cs.z * 0.4;
    for (const side of [1, -1]) {
      const g = new SphereGeometry(1, 48, 34);
      const pos = g.attributes.position, col = new Float32Array(pos.count * 3), reg = new Array(pos.count).fill('rest');
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        if (side * x < -0.25) pos.setX(i, x * 0.55);
        for (const [k, r] of Object.entries(REGIONS)) if (r.test(x, y, z, side * x)) { reg[i] = k; break; }
      }
      g.setAttribute('color', new BufferAttribute(col, 3));
      g.computeVertexNormals();
      const m = new Mesh(g, new MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 }));
      m.scale.set(hsx, hsy, hsz); m.position.set(bc.x + side * hsx * 0.95, bc.y, bc.z); m.renderOrder = 3;
      bodyG.add(m);
      hemis.push({ mesh: m, reg, col });
    }
    const cereb = ball(1, new MeshStandardMaterial({ color: 0x8a6a86, roughness: 0.6 }), bodyG, 24);
    cereb.scale.set(cs.x * 0.26, cs.y * 0.13, cs.z * 0.17); cereb.position.set(bc.x, bc.y - hsy * 0.85, bc.z - hsz * 0.6);
    P.brain = V(bc.x, bc.y + hsy, bc.z + hsz * 0.2);
    // ---------- 眼球 ----------
    for (const s of [-1, 1]) {
      const g = new Group(); g.position.set(s * 0.031, 1.613, 0.15); bodyG.add(g);
      ball(0.0115, new MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.35 }), g, 18);
      const iris = new Mesh(new CircleGeometry(0.0052, 20), new MeshBasicMaterial({ color: 0x3a2a1a })); iris.position.z = 0.0117; g.add(iris);
      eyes.push(g);
    }
    P.eyes = V(0, 1.613, 0.165);
    // ---------- 心臟 ----------
    heart = ball(0.034, M.heart, bodyG, 18); heart.position.set(0.02, C('t6').y, Bn('t6').box.max.z + 0.06); heart.scale.set(1, 1.15, 0.9);
    P.heart = heart.position.clone().add(V(0, 0, 0.05));
    // ---------- 腦下垂體（生長激素）、松果體（褪黑激素） ----------
    const sph = Bn('sphenoid');
    const pit = ball(0.0055, M.pit, bodyG, 12); pit.position.set(0, sph.center.y + 0.004, sph.center.z); pit.renderOrder = 6;
    pitGlow = ball(0.014, new MeshBasicMaterial({ color: 0x6fe08a, transparent: true, opacity: 0, depthWrite: false }), bodyG, 14); pitGlow.position.copy(pit.position); pitGlow.renderOrder = 6;
    P.pit = pit.position.clone();
    const pin = ball(0.0045, M.pin, bodyG, 12); pin.position.set(0, bc.y - hsy * 0.1, bc.z - hsz * 0.25); pin.renderOrder = 6;
    melGlow = ball(0.05, M.mel, bodyG, 20); melGlow.position.copy(pin.position); melGlow.renderOrder = 5;
    P.pin = pin.position.clone();
    // 生長激素的路線：腦下垂體 → 沿脊柱 → 骨盆 → 左右腿骨
    const spine = [P.pit.clone(), C('c4').add(V(0, 0, 0.02)), C('t4').add(V(0, 0, 0.03)), C('t10').add(V(0, 0, 0.03)), C('l3').add(V(0, 0, 0.02)), C('sacrum').add(V(0, 0.04, 0.03))];
    P.ghPaths = [-1, 1].map((s) => { const side = s < 0 ? 'r' : 'l'; return cr([...spine, C(`${side}-hip`).add(V(0, -0.02, 0.01)), V(C(`${side}-femur`).x, Bn(`${side}-femur`).box.max.y - 0.04, C(`${side}-femur`).z), C(`${side}-femur`), V(C(`${side}-femur`).x * 0.8, Bn(`${side}-femur`).box.min.y + 0.03, C(`${side}-femur`).z), C(`${side}-tibia`)]); });
    P.ghArm = [-1, 1].map((s) => { const side = s < 0 ? 'r' : 'l'; return cr([spine[0], spine[1], C('t1').add(V(0, 0, 0.03)), C(`${side}-scapula`).add(V(s * 0.03, 0.06, 0.03)), C(`${side}-humerus`)]); });
    for (let i = 0; i < 36; i++) { const m = ball(0.006, M.gh, bodyG, 8); m.renderOrder = 6; ghDots.push({ m, path: i % 6 < 4 ? P.ghPaths[i % 2] : P.ghArm[i % 2], off: i / 36, rank: (i * 7) % 36 / 36 }); }
    P.gh = C('l3').add(V(0, 0, 0.09));
    // 記憶火花：從大腦深處（海馬迴附近）往表面
    P.hip = V(bc.x, bc.y - hsy * 0.25, bc.z - hsz * 0.05);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, e = 0.25 + ((i * 5) % 7) / 9;
      const to = V(bc.x + Math.cos(a) * Math.cos(e) * hsx * 2.1, bc.y + Math.sin(e) * hsy * 1.05, bc.z + Math.sin(a) * Math.cos(e) * hsz * 1.02);
      const m = ball(0.0042, M.mem, bodyG, 8); m.renderOrder = 7; memDots.push({ m, to, off: i / 14 });
    }
    P.thigh = C('l-femur').add(V(0.06, 0, 0.05));

    // ---------- 躺下：整組繞 X 轉 −90°（頭在 −Z、臉朝上），背貼床面 ----------
    bodyG.rotation.x = -Math.PI / 2;
    bodyG.position.set(0, -minZ + 0.006, 0.85);
    bodyG.updateMatrixWorld(true);
    buildRoom();
    P.target = V(-0.15, 0.27, -0.06); P.home = V(2.2, 0.95, -1.2);
    P.headT = W(V(0, 1.62, 0.09)); P.headHome = V(0.5, 0.5, 0.34);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    room.visible = true; bodyG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.2 - camera.aspect) * 0.75, 1, 1.7);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 房間：床、牆、窗 ----------------
  function buildRoom() {
    const box = (w, h, dp, color, x, y, z, rough = 0.9) => { const m = new Mesh(new BoxGeometry(w, h, dp), new MeshStandardMaterial({ color, roughness: rough })); m.position.set(x, y, z); room.add(m); return m; };
    box(0.98, 0.2, 2.08, 0x3d5a8a, 0, -0.1, 0);                     // 床墊
    box(1.04, 0.12, 2.14, 0x6b4a34, 0, -0.26, 0);                   // 床架
    box(1.04, 0.62, 0.06, 0x6b4a34, 0, -0.01, -1.08);               // 床頭板
    const pillow = ball(1, new MeshStandardMaterial({ color: 0xe9eef8, roughness: 0.95 }), room, 20); pillow.scale.set(0.3, 0.035, 0.19); pillow.position.set(0, -0.004, -0.78);
    const floor = new Mesh(new PlaneGeometry(6, 6), new MeshStandardMaterial({ color: 0x1a2136, roughness: 1 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -0.32; room.add(floor);
    wall = new Mesh(new PlaneGeometry(6, 2.6), new MeshStandardMaterial({ color: 0x27304e, roughness: 1 })); wall.rotation.y = Math.PI / 2; wall.position.set(-1.25, 0.98, 0); room.add(wall);
    const backWall = new Mesh(new PlaneGeometry(2.6, 2.6), new MeshStandardMaterial({ color: 0x242c48, roughness: 1 })); backWall.position.set(0.05, 0.98, -1.3); room.add(backWall);
    // 窗：在 −X 的牆上，天空、月亮、太陽、星星都只是窗框裡的平面
    const wx = -1.24, wy = 1.15, wz = 0.1;
    sky = new Mesh(new PlaneGeometry(1.1, 0.9), new MeshBasicMaterial({ color: 0x0b1640 })); sky.rotation.y = Math.PI / 2; sky.position.set(wx, wy, wz); room.add(sky);
    stars = new Group(); room.add(stars);
    const rnd = (() => { let s = 5; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; })();
    const starMat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    for (let i = 0; i < 26; i++) { const st = new Mesh(new CircleGeometry(0.004 + rnd() * 0.004, 8), starMat); st.rotation.y = Math.PI / 2; st.position.set(wx + 0.002, wy - 0.42 + rnd() * 0.84, wz - 0.52 + rnd() * 1.04); stars.add(st); }
    stars.userData.mat = starMat;
    moon = new Mesh(new CircleGeometry(0.07, 28), new MeshBasicMaterial({ color: 0xfdf6d8 })); moon.rotation.y = Math.PI / 2; room.add(moon);
    sun = new Mesh(new CircleGeometry(0.09, 28), new MeshBasicMaterial({ color: 0xffc94a })); sun.rotation.y = Math.PI / 2; room.add(sun);
    const frame = 0x8a6a4c;
    for (const [w, h, y, z] of [[0.05, 0.98, wy, wz - 0.57], [0.05, 0.98, wy, wz + 0.57], [0.05, 0.9, wy, wz]]) { const f = box(0.03, h, w, frame, wx + 0.012, y, z); f.renderOrder = 2; }
    for (const y of [wy - 0.47, wy + 0.47, wy]) box(0.03, 0.05, 1.19, frame, wx + 0.012, y, wz);
    // 床頭燈
    box(0.34, 0.5, 0.34, 0x5a4636, -0.78, -0.07, -0.98);
    box(0.03, 0.2, 0.03, 0xb9a98a, -0.78, 0.28, -0.98);
    lampGlow = ball(0.09, new MeshBasicMaterial({ color: 0xffe2a0 }), room, 16); lampGlow.position.set(-0.78, 0.43, -0.98);
    P.win = V(wx, wy, wz); P.winLb = V(wx, wy + 0.56, wz);
  }
  const NIGHT = new Color(0x0b1640), DAWN = new Color(0xf2a36a), DAY = new Color(0x8fd0ff), DUSK = new Color(0x2a2f66), tmpC = new Color();
  function drawRoom() {
    const m = state.min;
    // 天空：睡前深藍 → 夜 → 清晨橘 → 早上淺藍
    if (m < 0) tmpC.copy(DUSK).lerp(NIGHT, MathUtils.smoothstep(m, T0, 0));
    else if (m < 500) tmpC.copy(NIGHT);
    else if (m < 560) tmpC.copy(NIGHT).lerp(DAWN, MathUtils.smoothstep(m, 500, 560));
    else tmpC.copy(DAWN).lerp(DAY, MathUtils.smoothstep(m, 560, 615));
    sky.material.color.copy(tmpC);
    stars.userData.mat.opacity = 0.9 * (1 - MathUtils.smoothstep(m, 480, 540));
    // 月亮從窗的一邊走到另一邊；太陽在清晨升起
    const u = (m - T0) / (540 - T0);
    moon.visible = u < 1.02; moon.position.set(P.win.x + 0.004, P.win.y + 0.28 - 0.5 * (u - 0.45) * (u - 0.45) * 2.2 + 0.0, P.win.z + 0.46 - 0.92 * u);
    const sv = MathUtils.smoothstep(m, 530, 620);
    sun.visible = sv > 0; sun.position.set(P.win.x + 0.004, P.win.y - 0.52 + 0.55 * sv, P.win.z + 0.3);
    if (sun.position.y < P.win.y - 0.4) sun.scale.setScalar(Math.max(0.001, (sun.position.y - (P.win.y - 0.52)) / 0.12)); else sun.scale.setScalar(1);
    // 室內：睡前開床頭燈，關燈後變暗，早上亮起來
    const lamp = 1 - MathUtils.smoothstep(m, -4, 2), day = MathUtils.smoothstep(m, 540, 615);
    lampGlow.material.color.setRGB(0.25 + 0.75 * lamp, 0.22 + 0.67 * lamp, 0.2 + 0.43 * lamp);
    const lv = 0.32 + 0.5 * lamp + 0.68 * day;
    wall.material.color.setRGB(0.153 * lv * 1.6, 0.188 * lv * 1.6, 0.306 * lv * 1.6);
    scene.background.setRGB(0.039 + 0.03 * lamp + 0.06 * day, 0.071 + 0.03 * lamp + 0.09 * day, 0.141 + 0.02 * lamp + 0.12 * day);
  }

  // ---------------- 模擬 ----------------
  const cTmp = new Color(), eyeTarget = [0, 0], eyeNow = [0, 0]; let eyeNext = 0, lastStage = '';
  function sim(dt) {
    state.clock += dt;
    if (state.playing) { state.min += dt * MIN_PER_SEC; if (state.min >= T1) state.min = T0; R.slider.value = Math.round(state.min); fillSlider(); }
    const m = state.min, st = stageAt(m), c = state.clock;
    state.stage = st;
    const k = 1 - Math.exp(-dt * 5);
    for (const key in state.act) state.act[key] += (ACT[st][key] - state.act[key]) * (dt ? k : 1);
    state.tone += (TONE[st] - state.tone) * (dt ? k : 1);
    const ghT = st === 'D' ? (m < 200 ? 1 : 0.6) : 0.04;
    state.gh += (ghT - state.gh) * (dt ? 1 - Math.exp(-dt * 2.5) : 1);
    state.mel = melAt(m);
    state.mem += ((st === 'D' ? 1 : st === 'L' ? 0.45 : st === 'R' ? 0.6 : 0) - state.mem) * (dt ? k : 1);
    // 大腦：各區亮度；深睡時整顆腦同步慢慢起伏（慢波）
    const slow = st === 'D' ? 0.16 * (0.5 + 0.5 * Math.sin(c * 2 * Math.PI * 0.8)) : 0;
    const flick = st === 'R' ? 0.12 * Math.sin(c * 19) : st === 'W' ? 0.05 * Math.sin(c * 13) : 0;
    for (const h of hemis) {
      for (let i = 0; i < h.reg.length; i++) {
        const key = h.reg[i], a = MathUtils.clamp(state.act[key] + slow + (key === 'rest' ? 0 : flick), 0, 1);
        if (key === 'rest') cTmp.copy(BASE).lerp(RESTC, Math.min(1, a * 1.3)); else cTmp.copy(BASE).lerp(RC[key], a);
        h.col[i * 3] = cTmp.r; h.col[i * 3 + 1] = cTmp.g; h.col[i * 3 + 2] = cTmp.b;
      }
      h.mesh.geometry.attributes.color.needsUpdate = true;
    }
    // 眼球：REM 快速跳動，剛入睡慢慢飄，其餘不動
    if (st === 'R') { if (c > eyeNext) { eyeTarget[0] = (Math.random() - 0.5) * 1.1; eyeTarget[1] = (Math.random() - 0.5) * 0.7; eyeNext = c + 0.12 + Math.random() * 0.4; } }
    else if (st === 'W' && m < 10) { eyeTarget[0] = 0.25 * Math.sin(c * 0.6); eyeTarget[1] = 0.1 * Math.sin(c * 0.4); }
    else { eyeTarget[0] = 0; eyeTarget[1] = st === 'W' ? 0 : 0.5; }
    const ek = dt ? 1 - Math.exp(-dt * (st === 'R' ? 30 : 3)) : 1;
    eyeNow[0] += (eyeTarget[0] - eyeNow[0]) * ek; eyeNow[1] += (eyeTarget[1] - eyeNow[1]) * ek;
    for (const g of eyes) { g.rotation.y = eyeNow[0]; g.rotation.x = -eyeNow[1]; }
    // 肌肉張力：REM 時手腳變藍
    for (const b of limbs) b.mat.color.copy(OFF).lerp(IVORY, MathUtils.clamp(state.tone * 1.6, 0, 1));
    // 心跳
    const hb = (c * HEART[st] + (st === 'R' ? 0.12 * Math.sin(c * 1.7) : 0)) % 1;
    heart.scale.setScalar(1 + 0.1 * Math.exp(-hb * 9)); heart.scale.y *= 1.15; heart.scale.z *= 0.9;
    // 生長激素
    for (const g of ghDots) { g.m.visible = g.rank < state.gh; if (g.m.visible) g.path.getPointAt((c * 0.11 + g.off) % 1, g.m.position); }
    pitGlow.material.opacity = 0.55 * state.gh * (0.7 + 0.3 * Math.sin(c * 5)); pitGlow.scale.setScalar(1 + state.gh * 0.6);
    // 褪黑激素
    M.mel.opacity = 0.42 * state.mel; melGlow.scale.setScalar(0.5 + 0.7 * state.mel + 0.04 * Math.sin(c * 1.5));
    // 記憶火花（REM 換成粉紅色＝夢）
    for (const d of memDots) {
      const s = (c * (st === 'R' ? 0.9 : 0.45) + d.off) % 1;
      d.m.visible = d.off < state.mem + 0.05 && state.mem > 0.08;
      d.m.material = st === 'R' ? M.dream : M.mem;
      if (d.m.visible) { d.m.position.lerpVectors(P.hip, d.to, s); d.m.scale.setScalar(0.5 + Math.sin(Math.PI * s)); }
    }
    drawRoom();
    // 文字
    const zone = m < 10 ? 'pre' : m >= 585 ? 'post' : st, info = STAGES[zone] || STAGES[st] || {}, name = STAGES[st] || {};
    R.time.textContent = clockOf(m);
    if (lastStage !== zone) {
      lastStage = zone;
      R.stage.innerHTML = `${esc(name.en || '')}<small>${esc(name.zh || '')}</small>`; R.stage.style.setProperty('--c', SCOL[st]);
      R.status.innerHTML = `${esc(info.text_en || '')}<span class="zh">${esc(info.text_zh || '')}</span>`;
    }
    const tt = totals(m), hm = (x) => `${Math.floor(x / 60)}:${String(Math.round(x % 60)).padStart(2, '0')}`;
    R.tL.textContent = hm(tt.L); R.tD.textContent = hm(tt.D); R.tR.textContent = hm(tt.R);
    R.mTone.style.width = `${Math.round(state.tone * 100)}%`; R.mGh.style.width = `${Math.round(state.gh * 100)}%`; R.mMel.style.width = `${Math.round(state.mel * 100)}%`;
    R.jumps.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    drawEEG(st, c); drawHyp();
  }

  // ---------------- 腦波（2D） ----------------
  function wave(st, t) {
    if (st === 'W') return 0.16 * Math.sin(t * 2 * Math.PI * 10) + 0.08 * Math.sin(t * 2 * Math.PI * 21 + 1);
    if (st === 'L') { const sp = Math.max(0, Math.sin(t * 2 * Math.PI * 0.28)) ** 8; return 0.26 * Math.sin(t * 2 * Math.PI * 5) + 0.1 * Math.sin(t * 2 * Math.PI * 8.3) + 0.45 * sp * Math.sin(t * 2 * Math.PI * 13); }
    if (st === 'D') return 0.82 * Math.sin(t * 2 * Math.PI * 1.1) + 0.2 * Math.sin(t * 2 * Math.PI * 2.4 + 0.6);
    return 0.17 * Math.sin(t * 2 * Math.PI * 7) + 0.1 * Math.sin(t * 2 * Math.PI * 16 + 2) + 0.06 * Math.sin(t * 2 * Math.PI * 3.1);
  }
  function sizeCanvas(c) { const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d); if (w && h && (c.width !== w || c.height !== h)) { c.width = w; c.height = h; } return d; }
  function drawEEG(st, c) {
    const cvs = R.eeg; if (!cvs) return;
    const d = sizeCanvas(cvs), g = cvs.getContext('2d'), w = cvs.width, h = cvs.height;
    if (!w || !h) return;
    g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 1; g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();
    g.strokeStyle = SCOL[st]; g.lineWidth = 1.6 * d; g.lineJoin = 'round'; g.beginPath();
    for (let x = 0; x <= w; x += 2) { const t = c - 4 + (x / w) * 4, y = h / 2 - wave(st, t) * h * 0.46; if (x === 0) g.moveTo(x, y); else g.lineTo(x, y); }
    g.stroke();
  }
  // ---------------- 睡眠階段圖（2D，可點、可拖） ----------------
  const HP = { l: 0, r: 0, t: 0, b: 0 };
  function drawHyp() {
    const cvs = R.hyp; if (!cvs) return;
    const d = sizeCanvas(cvs), g = cvs.getContext('2d'), w = cvs.width, h = cvs.height;
    if (!w || !h) return;
    const narrow = w / d < 460;
    HP.l = (narrow ? 44 : 104) * d; HP.r = 8 * d; HP.t = 8 * d; HP.b = 20 * d;
    const X = (m) => HP.l + ((m - T0) / (T1 - T0)) * (w - HP.l - HP.r), Y = (lv) => HP.t + (lv / 3) * (h - HP.t - HP.b);
    g.clearRect(0, 0, w, h);
    g.font = `${700} ${(narrow ? 9.5 : 11) * d}px system-ui, sans-serif`; g.textBaseline = 'middle';
    const names = narrow ? { W: 'Awake', R: 'REM', L: 'Light', D: 'Deep' } : { W: 'Awake 醒著', R: 'REM 快速動眼', L: 'Light 淺睡', D: 'Deep 深睡' };
    for (const k of ['W', 'R', 'L', 'D']) {
      g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1; g.beginPath(); g.moveTo(HP.l, Y(LEVEL[k])); g.lineTo(w - HP.r, Y(LEVEL[k])); g.stroke();
      g.fillStyle = SCOL[k]; g.textAlign = 'left'; g.fillText(names[k], 2 * d, Y(LEVEL[k]));
    }
    g.fillStyle = 'rgba(255,255,255,.5)'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    for (let hr = 0; hr <= 10; hr += narrow ? 2 : 1) { const m = hr * 60, lab2 = `${((9 + hr - 1) % 12) + 1}${9 + hr < 12 ? ' PM' : ' AM'}`; g.fillText(lab2, X(m), h - 5 * d); g.fillRect(X(m) - 0.5, h - HP.b, 1, 4 * d); }
    // 階梯線
    g.lineWidth = 3 * d; g.lineCap = 'round';
    for (let i = 0; i < SEG.length - 1; i++) {
      const [a, k] = SEG[i], b = SEG[i + 1][0];
      g.strokeStyle = SCOL[k]; g.globalAlpha = a < state.min ? 1 : 0.4;
      g.beginPath(); g.moveTo(X(a), Y(LEVEL[k])); g.lineTo(X(b), Y(LEVEL[k])); g.stroke();
      if (i < SEG.length - 2) { g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 1 * d; g.beginPath(); g.moveTo(X(b), Y(LEVEL[k])); g.lineTo(X(b), Y(LEVEL[SEG[i + 1][1]])); g.stroke(); g.lineWidth = 3 * d; }
    }
    g.globalAlpha = 1;
    const x = X(state.min);
    g.strokeStyle = '#fff'; g.lineWidth = 1.5 * d; g.beginPath(); g.moveTo(x, HP.t - 4 * d); g.lineTo(x, h - HP.b); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(x, Y(LEVEL[state.stage]), 5 * d, 0, Math.PI * 2); g.fill();
  }
  function hypAt(e) {
    const r = R.hyp.getBoundingClientRect(), d = R.hyp.width / r.width || 1;
    const u = ((e.clientX - r.left) * d - HP.l) / (R.hyp.width - HP.l - HP.r);
    setMin(T0 + MathUtils.clamp(u, 0, 1) * (T1 - T0), true);
  }
  let dragging = false;
  R.hyp.addEventListener('pointerdown', (e) => { dragging = true; R.hyp.setPointerCapture(e.pointerId); hypAt(e); });
  R.hyp.addEventListener('pointermove', (e) => { if (dragging) hypAt(e); });
  R.hyp.addEventListener('pointerup', () => { dragging = false; });
  R.hyp.addEventListener('pointercancel', () => { dragging = false; });

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${((R.slider.value - T0) / (T1 - T0)) * 100}%`);
  function setPlaying(on) { state.playing = on; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Play · 播放'; }
  function setMin(m, pause) { state.min = MathUtils.clamp(m, T0, T1); R.slider.value = Math.round(state.min); fillSlider(); if (pause) setPlaying(false); }
  R.slider.addEventListener('input', () => setMin(+R.slider.value, true));
  R.play.addEventListener('click', () => { if (!state.playing && state.min >= T1 - 1) setMin(T0); setPlaying(!state.playing); });
  R.jumps.forEach((b) => b.addEventListener('click', () => { setMin(+b.dataset.jump, true); }));
  function setHead(on) {
    state.headView = on; R.head.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!state.ready) return;
    if (on) flyTo(P.headT.clone().add(P.headHome.clone().multiplyScalar(fit())), P.headT); else flyTo(homePos(), P.target);
  }
  R.head.addEventListener('click', () => setHead(!state.headView));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skel"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  bind('[data-t="room"]', (v) => { room.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) setHead(false); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  fillSlider(); setPlaying(true);

  // ---------------- 標籤 ----------------
  const Lb = {
    brain: lab.add('ey-lb ey-lb-o', ''), eyes: lab.add('ey-lb', ''), limbs: lab.add('ey-lb zz-lb-b', ''), heart: lab.add('ey-lb ey-lb-m', ''),
    gh: lab.add('ey-lb zz-lb-g', 'Growth hormone · 生長激素'), pit: lab.add('ey-lb zz-lb-g', 'Gland under the brain · 腦下垂體'), mel: lab.add('ey-lb zz-lb-p', 'Melatonin · 褪黑激素'),
    win: lab.add('ey-lb', ''),
  };
  for (const el of Object.values(Lb)) el.hidden = true;      // 模型載入前先藏起來，不然會疊在左上角
  let autoLabels = true, lbStage = '';
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const st = state.stage, hv = state.headView;
    if (lbStage !== st) {
      lbStage = st;
      Lb.brain.innerHTML = { W: 'Brain: busy all over · 大腦：到處都在忙', L: 'Brain: slowing down · 大腦：慢下來了', D: 'Brain: big, slow waves · 大腦：又大又慢的波', R: 'Brain: dreaming · 大腦：正在做夢' }[st];
      Lb.eyes.innerHTML = st === 'R' ? 'Eyes darting · 眼球快速轉動' : st === 'W' ? 'Eyes · 眼睛' : 'Eyes still · 眼睛不動';
      Lb.limbs.innerHTML = st === 'R' ? 'Big muscles: switched off · 大肌肉：關掉了' : st === 'W' ? 'Muscles: ready to move · 肌肉：隨時能動' : 'Muscles: relaxed · 肌肉：放鬆';
      Lb.heart.innerHTML = st === 'D' ? 'Heart: slow and steady · 心跳：又慢又穩' : st === 'R' ? 'Heart: faster, uneven · 心跳：變快、不規則' : st === 'L' ? 'Heart: slowing · 心跳：變慢' : 'Heart · 心臟';
    }
    const m = state.min;
    Lb.win.innerHTML = m >= 560 ? 'Sunrise · 日出' : m >= 0 ? 'Night · 夜晚' : 'Evening · 傍晚';
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(Lb.brain, true, W(P.brain), hv ? -64 : -22);
    show(Lb.eyes, hv, W(P.eyes.clone().add(V(0.07, 0, 0.03))), 0);
    show(Lb.limbs, !hv, W(P.thigh), -16);
    show(Lb.heart, !hv, W(P.heart), -14);
    show(Lb.gh, !hv && state.gh > 0.3, W(P.gh), -10);
    show(Lb.pit, hv, W(P.pit), 26);
    show(Lb.mel, hv && state.mel > 0.25, W(P.pin).add(V(0, 0, -0.1)), 0);
    show(Lb.win, !hv && room.visible, P.winLb, 0);
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
    sim(dt);
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
    step(state.hold ? 0 : dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-sleep-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停住
  root.__lab = {
    camera, controls, state, P, stageAt, totals, melAt, calc, setHead, setPlaying,
    setMin: (m) => setMin(m, true),
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => calc && calc.scrollTo() };
}

lazyBoot('[data-sleep-lab]', initLab, { test: (lab) => lab.test() });
