/*
 * 人體探索 · 第五課「關節怎麼活動？」的 3D 模型：用第一課的真實骨架（skeleton.glb），讓六個關節照它真正能動的方向轉。
 *
 *   膝 knee、肘 elbow ……… 鉸鏈關節（hinge）：一個方向，彎曲／伸直
 *   髖 hip、肩 shoulder …… 球窩關節（ball-and-socket）：三個方向，前後、左右、轉動，能畫圓錐
 *   頸 neck（寰椎繞樞椎）… 樞軸關節（pivot）：轉頭；頭部轉動有一半以上在這裡，其餘分散在下面幾節頸椎
 *   拇指根部 thumb ……… 鞍狀關節（saddle）：兩個方向，讓拇指碰得到每根手指
 *
 * 骨頭掛在巢狀的 pivot 群組上：肩 ⊃ 肘 ⊃ 拇指、髖 ⊃ 膝、頸椎一節套一節 ⊃ 頭顱。
 * 換關節時，其他關節慢慢回到原位（所以父關節一定是原位，畫活動範圍時不用考慮父關節）。
 *
 * 座標（沿用 skeleton.glb）：公尺、Y 朝上、臉朝 +Z、身體右邊在 -X；只動右手、右腳。
 *   繞 X 軸轉負角度＝往前抬（髖、肩、肘屈曲）；膝屈曲是往後，所以正角度。
 *   繞 Z 軸轉負角度＝右側肢體往外（外展）。
 * 一般活動範圍：成人常見數字（教科書值），每個人不一樣；頁面有提醒。
 *
 * 產物：cd tools/body && npm run build → assets/js/joints.js
 */
import {
  AdditiveBlending, AmbientLight, BufferAttribute, BufferGeometry, CanvasTexture, Color, DirectionalLight,
  DoubleSide, Group, HemisphereLight, Line, LineBasicMaterial, MathUtils, Mesh, MeshBasicMaterial,
  PerspectiveCamera, Quaternion, Scene, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IVORY, average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const DEG = Math.PI / 180;
const MOVING = new Color(0xffe2a0);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const TYPES = {
  hinge: { en: 'Hinge joint', zh: '鉸鏈關節', icon: '🚪', like_en: 'Works like a door: it swings one way and back.', like_zh: '像一扇門：只能朝一個方向開、再關回來。' },
  ball: { en: 'Ball-and-socket joint', zh: '球窩關節', icon: '🕹️', like_en: 'Works like a joystick: a round ball in a cup moves in every direction, even in circles.', like_zh: '像遊戲搖桿：圓球卡在杯子裡，往哪個方向都能動，還能畫圓。' },
  pivot: { en: 'Pivot joint', zh: '樞軸關節', icon: '🔄', like_en: 'Works like a doorknob: one bone turns around another.', like_zh: '像門把：一塊骨頭繞著另一塊轉。' },
  saddle: { en: 'Saddle joint', zh: '鞍狀關節', icon: '🐎', like_en: 'Two curved surfaces fit like a rider in a saddle: it rocks two ways.', like_zh: '兩個彎曲的面像騎士坐在馬鞍上：可以朝兩個方向搖。' },
};
// 每個關節的資料：自由度（滑桿）、一般活動範圍、日常例子
const INFO = {
  knee: { en: 'Knee', zh: '膝關節', type: 'hinge', ex_en: 'Kicking a ball, climbing stairs, squatting', ex_zh: '踢球、爬樓梯、蹲下',
    dofs: [{ key: 'flex', en: 'Bend · straighten', zh: '彎曲・伸直', min: 0, max: 140 }] },
  elbow: { en: 'Elbow', zh: '肘關節', type: 'hinge', ex_en: 'Lifting a cup to your mouth, doing push-ups', ex_zh: '拿杯子到嘴邊、做伏地挺身',
    dofs: [{ key: 'flex', en: 'Bend · straighten', zh: '彎曲・伸直', min: 0, max: 145 }] },
  hip: { en: 'Hip', zh: '髖關節', type: 'ball', ex_en: 'Walking, kicking, sitting cross-legged', ex_zh: '走路、踢腿、盤腿坐',
    dofs: [{ key: 'flex', en: 'Forward · back', zh: '往前・往後', min: -20, max: 120 },
      { key: 'abd', en: 'Out to the side · in', zh: '往外・往內', min: -25, max: 45 },
      { key: 'rot', en: 'Twist in · out', zh: '往內轉・往外轉', min: -40, max: 45 }] },
  shoulder: { en: 'Shoulder', zh: '肩關節', type: 'ball', ex_en: 'Throwing, swimming, reaching a high shelf', ex_zh: '丟球、游泳、拿高處的東西',
    dofs: [{ key: 'flex', en: 'Forward · back', zh: '往前・往後', min: -50, max: 180 },
      { key: 'abd', en: 'Out to the side · in', zh: '往外・往內', min: -30, max: 180 },
      { key: 'rot', en: 'Twist in · out', zh: '往內轉・往外轉', min: -70, max: 90 }] },
  neck: { en: 'Top of the neck', zh: '頸部頂端（寰椎與樞椎）', type: 'pivot', ex_en: 'Shaking your head to say “no”, checking for cars', ex_zh: '搖頭說「不」、過馬路左右看',
    dofs: [{ key: 'turn', en: 'Turn left · right', zh: '往左轉・往右轉', min: -80, max: 80 }] },
  thumb: { en: 'Base of the thumb', zh: '拇指根部', type: 'saddle', ex_en: 'Holding a pencil, texting, picking up a coin', ex_zh: '握筆、打字、撿起硬幣',
    dofs: [{ key: 'flex', en: 'Across the palm · back', zh: '橫過手掌・往回', min: -15, max: 50 },
      { key: 'abd', en: 'Away from the palm · back', zh: '離開手掌・往回', min: 0, max: 60 }] },
};
const ORDER = ['knee', 'hip', 'elbow', 'shoulder', 'neck', 'thumb'];

function glowTex() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,211,110,.75)'); gr.addColorStop(1, 'rgba(255,190,80,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
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
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.02, 50);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.2; controls.maxDistance = 6;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a2016, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.15));
  const key = new DirectionalLight(0xfff3e0, 2.1); key.position.set(-2, 3, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 1.0); rim.position.set(2, 1.5, -2.5); scene.add(rim);

  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), name: $('.jt-name'), zh: $('.jt-zh'), type: $('.jt-type'),
    like: $('.jt-like'), ways: $('.jt-ways'), ex: $('.jt-ex'), sliders: $('.jt-sliders'), say: $('.jt-say'),
    circle: $('.jt-circle'), reset: $('.jt-reset'), chips: [...root.querySelectorAll('[data-joint]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, joint: 'knee', labels: true, range: true, trace: true, anim: null };
  const J = {};           // 關節：{ group, pivot, ang:{}, target:{}, compose:[...], tip(local), fan, camDir, camDist }
  let bones = null;

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    model.updateMatrixWorld(true);
    const B = (id) => bones.get(id);
    const isR = (id, region) => id.startsWith('r-') && bones.get(id).info.region === region;
    const ids = [...bones.keys()];

    // ---------- 關節中心 ----------
    const fem = worldVerts(B('r-femur').mesh);
    const fy0 = Math.min(...fem.map((v) => v.y)), fy1 = Math.max(...fem.map((v) => v.y));
    const kneeC = average(fem.filter((v) => v.y < fy0 + 0.025));
    const topF = fem.filter((v) => v.y > fy1 - 0.06);
    const midX = topF.map((v) => v.x).sort((a, b) => a - b)[Math.floor(topF.length / 2)];
    const hipC = average(topF.filter((v) => v.x > midX));          // 股骨頭在內側（右腳的內側是 +X）
    const hum = worldVerts(B('r-humerus').mesh);
    const hy0 = Math.min(...hum.map((v) => v.y)), hy1 = Math.max(...hum.map((v) => v.y));
    const elbowC = average(hum.filter((v) => v.y < hy0 + 0.025));
    const shoulderC = average(hum.filter((v) => v.y > hy1 - 0.03));
    const c2 = worldVerts(B('c2').mesh);
    const c2y = Math.max(...c2.map((v) => v.y));
    const neckC = average(c2.filter((v) => v.y > c2y - 0.012));      // 齒突：寰椎繞著它轉
    const trap = B('r-trapezium').center;
    const mc1 = worldVerts(B('r-mc1').mesh).sort((a, b) => a.distanceTo(trap) - b.distanceTo(trap));
    const thumbC = average(mc1.slice(0, Math.max(8, Math.floor(mc1.length * 0.15))));
    const ankle = B('r-tibia').box.min.clone().lerp(B('r-tibia').box.max, 0.5).setY(B('r-tibia').box.min.y + 0.01);
    const wrist = V(B('r-radius').center.x, B('r-radius').box.min.y + 0.01, B('r-radius').center.z);

    // ---------- 巢狀群組（先建最裡面的） ----------
    const mk = (pivot) => { const g = new Group(); g.position.copy(pivot); scene.add(g); g.updateMatrixWorld(); return g; };
    const thumbG = mk(thumbC);
    for (const id of ['r-mc1', 'r-f1-p', 'r-f1-d']) thumbG.attach(B(id).mesh);
    const elbowG = mk(elbowC);
    for (const id of ids) if (id === 'r-radius' || id === 'r-ulna' || (isR(id, 'hand') && !['r-mc1', 'r-f1-p', 'r-f1-d'].includes(id))) elbowG.attach(B(id).mesh);
    elbowG.attach(thumbG);
    const shoulderG = mk(shoulderC);
    shoulderG.attach(B('r-humerus').mesh);
    shoulderG.attach(elbowG);
    const kneeG = mk(kneeC);
    for (const id of ids) if (['r-tibia', 'r-fibula', 'r-patella'].includes(id) || isR(id, 'foot')) kneeG.attach(B(id).mesh);
    const hipG = mk(hipC);
    hipG.attach(B('r-femur').mesh);
    hipG.attach(kneeG);
    // 頸：c7 ⊃ c6 ⊃ … ⊃ c2 ⊃ (c1＋頭顱)；每一節繞自己的中心、繞垂直軸轉一點
    const neckChain = [];
    let parent = scene;
    for (const v of ['c7', 'c6', 'c5', 'c4', 'c3', 'c2']) {
      const g = new Group(); g.position.copy(B(v).center);
      parent.add(g);
      if (parent !== scene) g.position.copy(parent.worldToLocal(B(v).center.clone()));
      g.updateMatrixWorld();
      g.attach(B(v).mesh);
      neckChain.push({ g, frac: v === 'c2' ? 0.05 : 0.06 });
      parent = g;
    }
    const headG = new Group();
    parent.add(headG);
    headG.position.copy(parent.worldToLocal(neckC.clone()));
    headG.updateMatrixWorld();
    for (const id of ids) if (id === 'c1' || (bones.get(id).info.region === 'skull' && id !== 'hyoid')) headG.attach(B(id).mesh);
    neckChain.push({ g: headG, frac: 0.65 });

    // ---------- 關節設定 ----------
    const X = V(1, 0, 0), Y = V(0, 1, 0), Z = V(0, 0, 1);
    const femurAxis = kneeC.clone().sub(hipC).normalize();
    const humAxis = elbowC.clone().sub(shoulderC).normalize();
    const thumbDir = B('r-f1-d').center.clone().sub(thumbC).normalize();
    const thumbAbdAxis = new Vector3().crossVectors(thumbDir, Z).normalize();
    const local = (g, w) => g.worldToLocal(w.clone());
    const def = (name, g, pivot, axes, tipW, camDir, camDist, look = 0) => {
      J[name] = { group: g, pivot, axes, tip: g ? local(g, tipW) : tipW.clone(), camDir, camDist, look, ang: {}, target: {} };
      for (const d of INFO[name].dofs) { J[name].ang[d.key] = 0; J[name].target[d.key] = 0; }
    };
    // axes：每個自由度轉哪個軸、正負號；compose 的順序＝先轉 rot，再 flex，最後 abd
    def('knee', kneeG, kneeC, { flex: [X, +1] }, ankle, V(-1, 0.2, 0.2), 1.75, 0.1);
    def('elbow', elbowG, elbowC, { flex: [X, -1] }, wrist, V(-1, 0.2, 0.3), 1.25, 0.1);
    def('hip', hipG, hipC, { rot: [femurAxis, +1], flex: [X, -1], abd: [Z, -1] }, kneeC, V(-0.8, 0.25, 1), 2.3, 0.3);
    def('shoulder', shoulderG, shoulderC, { rot: [humAxis, +1], flex: [X, -1], abd: [Z, -1] }, elbowC, V(-0.6, 0.25, 1), 2.0, 0.15);
    def('neck', null, neckC, { turn: [Y, +1] }, B('frontal').center.clone().add(V(0, -0.05, 0.1)), V(0.15, 0.45, 1), 0.8);
    def('thumb', thumbG, thumbC, { flex: [Z, +1], abd: [thumbAbdAxis, +1] }, B('r-f1-d').center, V(-0.35, 0.1, 1), 0.42, 0.3);
    J.neck.chain = neckChain;
    J.neck.tip = B('frontal').center.clone().add(V(0, -0.05, 0.1));
    J.neck.tipLocal = headG.worldToLocal(J.neck.tip.clone());
    J.neck.headG = headG;

    // ---------- 活動範圍（扇形／圓錐） ----------
    for (const name of ORDER) J[name].fan = buildFan(name);

    for (const b of bones.values()) b.base = b.mat.color.clone();
    selectJoint('knee', true);
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The skeleton could not be loaded. Please reload the page.<br><span class="zh">骨架載入失敗，請重新整理頁面。</span>';
  });

  // ---------------- 旋轉 ----------------
  const qa = new Quaternion(), qtmp = new Quaternion();
  function jointQuat(name, ang, out = new Quaternion()) {
    const j = J[name];
    out.identity();
    for (const k of ['rot', 'flex', 'abd', 'turn']) {
      if (!(k in j.axes) || !(k in ang)) continue;
      const [axis, sign] = j.axes[k];
      qtmp.setFromAxisAngle(axis, sign * ang[k] * DEG);
      out.premultiply(qtmp);
    }
    return out;
  }
  function applyJoint(name) {
    const j = J[name];
    if (name === 'neck') {
      for (const c of j.chain) c.g.quaternion.setFromAxisAngle(V(0, 1, 0), j.ang.turn * c.frac * DEG);
      return;
    }
    j.group.quaternion.copy(jointQuat(name, j.ang, qa));
  }
  function tipWorld(name, out = V(0, 0, 0)) {
    const j = J[name];
    if (name === 'neck') { j.headG.updateMatrixWorld(true); return out.copy(j.tipLocal).applyMatrix4(j.headG.matrixWorld); }
    j.group.updateMatrixWorld(true);
    return out.copy(j.tip).applyMatrix4(j.group.matrixWorld);
  }

  // 活動範圍：在原位時，把末端點掃過範圍的邊界，畫成從關節中心出發的半透明扇形
  function buildFan(name) {
    const j = J[name];
    const dofs = INFO[name].dofs.filter((d) => d.key !== 'rot');
    const pts = [];
    const rest = name === 'neck' ? j.tip.clone() : j.tip.clone().applyMatrix4(j.group.matrixWorld);
    const tipAt = (ang) => {
      if (name === 'neck') {
        const q = new Quaternion().setFromAxisAngle(V(0, 1, 0), ang.turn * DEG);
        return rest.clone().sub(j.pivot).applyQuaternion(q).add(j.pivot);
      }
      return rest.clone().sub(j.pivot).applyQuaternion(jointQuat(name, ang)).add(j.pivot);
    };
    if (dofs.length === 1) {
      const d = dofs[0];
      for (let i = 0; i <= 48; i++) pts.push(tipAt({ [d.key]: d.min + (d.max - d.min) * i / 48 }));
    } else {
      // 兩個方向：繞一圈橢圓（四個方向的極限之間平滑內插）
      const [a, b] = dofs;
      for (let i = 0; i <= 96; i++) {
        const t = i / 96 * Math.PI * 2;
        const c = Math.cos(t), s = Math.sin(t);
        pts.push(tipAt({ [a.key]: c >= 0 ? a.max * c : -a.min * c, [b.key]: s >= 0 ? b.max * s : -b.min * s }));
      }
    }
    // 扇形三角形：關節中心 → 相鄰兩個邊界點
    const pos = [];
    for (let i = 0; i < pts.length - 1; i++) pos.push(...j.pivot.toArray(), ...pts[i].toArray(), ...pts[i + 1].toArray());
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
    const g = new Group();
    const fan = new Mesh(geo, new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.13, side: DoubleSide, depthWrite: false }));
    fan.renderOrder = 4;
    const edge = new Line(new BufferGeometry().setFromPoints(pts), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.75 }));
    g.add(fan, edge);
    g.visible = false;
    scene.add(g);
    return g;
  }

  // 軌跡：畫圓圈時，把末端走過的路線畫出來
  const TRACE_N = 240;
  const tracePts = [];
  const traceLine = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0x7ad7ff, transparent: true, opacity: 0.95 }));
  traceLine.renderOrder = 5;
  scene.add(traceLine);
  const glow = new Sprite(new SpriteMaterial({ map: glowTex(), blending: AdditiveBlending, depthWrite: false, transparent: true }));
  glow.scale.set(0.07, 0.07, 1);
  scene.add(glow);

  // ---------------- 選關節 ----------------
  function movingIds(name) {
    const out = new Set();
    const g = name === 'neck' ? J.neck.headG : J[name].group;
    g.traverse((o) => { if (o.isMesh && o.userData.id) out.add(o.userData.id); });
    return out;
  }
  function tint() {
    const ids = movingIds(state.joint);
    for (const [id, b] of bones) b.mat.color.copy(ids.has(id) ? MOVING : IVORY);
  }
  function selectJoint(name, instant = false) {
    state.joint = name;
    state.anim = null;
    tracePts.length = 0; traceLine.geometry.setFromPoints([]);
    for (const n of ORDER) for (const k in J[n].target) J[n].target[k] = 0;   // 其他關節回原位（這個也從原位開始）
    if (instant) for (const n of ORDER) { for (const k in J[n].ang) J[n].ang[k] = 0; applyJoint(n); }
    R.chips.forEach((c) => c.classList.toggle('on', c.getAttribute('data-joint') === name));
    const info = INFO[name], ty = TYPES[info.type];
    R.name.textContent = info.en;
    R.zh.textContent = info.zh;
    R.type.innerHTML = `<i aria-hidden="true">${ty.icon}</i>${esc(ty.en)}<small>${esc(ty.zh)}</small>`;
    R.type.className = `jt-type jt-${info.type}`;
    R.like.innerHTML = `${esc(ty.like_en)}<span class="zh">${esc(ty.like_zh)}</span>`;
    const n = info.dofs.length;
    R.ways.innerHTML = `<b>${n}</b> ${n === 1 ? 'way to move' : 'ways to move'}<small>可以朝 ${n} 個方向動</small>`;
    R.ex.innerHTML = `<b>Everyday · 生活中</b>${esc(info.ex_en)}<span class="zh">${esc(info.ex_zh)}</span>`;
    R.sliders.innerHTML = info.dofs.map((d) => `<label class="jt-sl"><span class="jt-sl-k">${esc(d.en)}<small>${esc(d.zh)}</small></span>`
      + `<input type="range" min="${d.min}" max="${d.max}" step="1" value="0" data-dof="${d.key}">`
      + `<span class="jt-sl-v"><b data-v="${d.key}">0°</b><small>Typical ${d.min}° to ${d.max}° · 一般範圍</small></span></label>`).join('');
    R.sliders.querySelectorAll('input').forEach((inp) => inp.addEventListener('input', () => {
      state.anim = null;
      J[name].target[inp.dataset.dof] = parseFloat(inp.value);
      J[name].ang[inp.dataset.dof] = parseFloat(inp.value);
    }));
    R.circle.innerHTML = info.type === 'ball' || info.type === 'saddle'
      ? '&#9711; Draw a circle<small>畫一個圓圈</small>' : '&#9711; Try to draw a circle<small>試著畫圓圈</small>';
    R.say.innerHTML = 'Drag the slider, or press the circle button.<span class="zh">拖動滑桿，或按「畫圓圈」。</span>';
    for (const m of ORDER) if (J[m].fan) J[m].fan.visible = state.range && m === name;
    tint();
    const j = J[name];
    const target = name === 'neck' ? j.pivot.clone().add(V(0, 0.04, 0.02)) : j.pivot.clone().lerp(tipWorld(name), j.look);
    flyTo(target.clone().addScaledVector(j.camDir.clone().normalize(), j.camDist * (camera.aspect < 0.9 ? 1.3 : 1)), target, instant);
  }
  function syncSliders() {
    const j = J[state.joint];
    R.sliders.querySelectorAll('input').forEach((inp) => {
      const v = j.ang[inp.dataset.dof];
      if (document.activeElement !== inp) inp.value = String(Math.round(v));
      const lo = parseFloat(inp.min), hi = parseFloat(inp.max);
      inp.style.setProperty('--p', `${(v - lo) / (hi - lo) * 100}%`);
      R.sliders.querySelector(`[data-v="${inp.dataset.dof}"]`).textContent = `${Math.round(v)}°`;
    });
  }

  // 畫圓圈：球窩、鞍狀關節繞一圈橢圓；鉸鏈、樞軸只能來回擺，所以只會畫出一段弧
  function drawCircle() {
    const name = state.joint, info = INFO[name];
    tracePts.length = 0;
    const dofs = info.dofs.filter((d) => d.key !== 'rot');
    if (dofs.length >= 2) {
      const [a, b] = dofs;
      state.anim = { t: 0, dur: 5, fn: (t) => {
        const ph = t * Math.PI * 2;
        const c = Math.cos(ph), s = Math.sin(ph);
        const k = MathUtils.smoothstep(t, 0, 0.12) * (1 - MathUtils.smoothstep(t, 0.9, 1));
        return { [a.key]: (c >= 0 ? a.max * c : -a.min * c) * 0.75 * k + (a.max + a.min) * 0.15 * k, [b.key]: (s >= 0 ? b.max * s : -b.min * s) * 0.75 * k };
      } };
      R.say.innerHTML = 'A ball in a socket can swing in every direction, so the end of the bone draws a circle, and the bone sweeps out a cone.'
        + '<span class="zh">球窩（或鞍狀）關節可以朝各個方向擺，所以骨頭末端畫出一個圓，整根骨頭掃出一個圓錐。</span>';
      if (info.type === 'saddle') R.say.innerHTML = 'The saddle joint rocks two ways, so the thumb can sweep in a circle and reach every fingertip.<span class="zh">鞍狀關節可以朝兩個方向搖，所以拇指能繞一圈，碰到每一根手指。</span>';
    } else {
      const d = dofs[0];
      state.anim = { t: 0, dur: 4, fn: (t) => ({ [d.key]: name === 'neck' ? Math.sin(t * Math.PI * 2) * d.max * 0.85 : Math.sin(t * Math.PI) * d.max * 0.9 }) };
      R.say.innerHTML = name === 'neck'
        ? 'A pivot joint only turns around one axis, so the nose traces an arc from side to side, not a circle.<span class="zh">樞軸關節只能繞一根軸轉，所以鼻尖只畫出左右一段弧，畫不出圓。</span>'
        : 'A hinge can only swing one way and back, like a door, so it draws an arc, never a circle. Try it with your own knee or elbow.<span class="zh">鉸鏈只能像門一樣往一個方向擺、再擺回來，所以只畫得出一段弧，畫不出圓。用自己的膝蓋或手肘試試看。</span>';
    }
  }

  // ---------------- 操作 ----------------
  R.chips.forEach((c) => c.addEventListener('click', () => { if (state.ready) selectJoint(c.getAttribute('data-joint')); }));
  R.circle.addEventListener('click', () => { if (state.ready) drawCircle(); });
  R.reset.addEventListener('click', () => {
    if (!state.ready) return;
    state.anim = null; tracePts.length = 0; traceLine.geometry.setFromPoints([]);
    for (const k in J[state.joint].target) J[state.joint].target[k] = 0;
  });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="range"]', (v) => { state.range = v; if (state.ready) for (const m of ORDER) J[m].fan.visible = v && m === state.joint; });
  bind('[data-t="trace"]', (v) => { state.trace = v; traceLine.visible = glow.visible = v; });
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) selectJoint(state.joint); });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }

  // ---------------- 標籤 ----------------
  const L = {
    pv: lab.add('jt-lb jt-lb-pv', ''),
    tip: lab.add('jt-lb', ''),
  };
  const TIP = { knee: 'Ankle · 腳踝', elbow: 'Wrist · 手腕', hip: 'Knee · 膝蓋', shoulder: 'Elbow · 手肘', neck: 'Nose · 鼻尖', thumb: 'Thumb tip · 拇指尖' };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const tw = V(0, 0, 0);
  function updateLabels() {
    const on = state.ready && state.labels;
    L.pv.hidden = L.tip.hidden = !on;
    if (!on) return;
    const info = INFO[state.joint];
    L.pv.innerHTML = `${esc(info.en)} · ${esc(info.zh.replace(/（.*）/, ''))}`;
    lab.place(L.pv, J[state.joint].pivot, -22);
    L.tip.textContent = TIP[state.joint];
    lab.place(L.tip, tipWorld(state.joint, tw), 18);
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
    if (autoLabels) { state.labels = w >= 420; if (tgL) tgL.checked = state.labels; }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  function step(dt) {
    if (!state.ready) return;
    const cur = J[state.joint];
    if (state.anim) {
      state.anim.t += dt / state.anim.dur;
      const t = Math.min(1, state.anim.t);
      Object.assign(cur.target, state.anim.fn(t));
      Object.assign(cur.ang, cur.target);
      if (state.anim.t >= 1) { state.anim = null; for (const k in cur.target) cur.target[k] = 0; }
    }
    // 其他關節（與鬆開滑桿後）慢慢走向目標
    for (const n of ORDER) {
      const j = J[n];
      let moved = false;
      for (const k in j.ang) {
        if (n === state.joint && (state.anim || document.activeElement?.dataset?.dof === k)) continue;
        const d = j.target[k] - j.ang[k];
        if (Math.abs(d) > 0.05) { j.ang[k] += d * Math.min(1, dt * 5); moved = true; } else j.ang[k] = j.target[k];
      }
      if (moved || n === state.joint) applyJoint(n);
    }
    syncSliders();
    // 軌跡與末端亮點
    tipWorld(state.joint, tw);
    glow.position.copy(tw);
    if (state.anim) {
      tracePts.push(tw.clone());
      if (tracePts.length > TRACE_N) tracePts.shift();
      traceLine.geometry.setFromPoints(tracePts);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
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

  // 除錯用：$('[data-joints-lab]').__lab；背景分頁 rAF 很慢時用 set()／run(秒)／render()
  root.__lab = {
    camera, controls, state, J, selectJoint, drawCircle,
    set: (name, ang) => { selectJoint(name, true); Object.assign(J[name].ang, ang); Object.assign(J[name].target, ang); applyJoint(name); },
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return {
    ready: () => state.ready,
    joint: (name) => { selectJoint(name); setTimeout(() => drawCircle(), 900); },
  };
}

lazyBoot('[data-joints-lab]', initLab, { joint: (lab, v) => lab.joint(v) });
