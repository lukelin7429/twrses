/*
 * 人體探索 · 第二課「肌肉怎麼拉動骨頭？」的 3D 手臂。
 *
 * 骨頭：沿用第一課的 assets/models/skeleton.glb（BodyParts3D 真實形狀），只把右手臂實心顯示，
 *       其他骨頭淡淡地當背景。前臂（橈骨、尺骨）和整隻右手掛在一個以手肘為中心的 pivot 上旋轉。
 * 肌肉：肱二頭肌、肱三頭肌是程式畫的示意形狀（不是解剖資料）：沿一條曲線長出的管子，
 *       兩端細細的是肌腱，中段是肌腹。肌肉變短時肌腹變粗（體積大致不變），用力時變紅。
 *
 * 座標（沿用 skeleton.glb）：公尺、Y 朝上、臉朝 +Z，身體右邊在 -X，所以右手臂從 -X 那一側看。
 * 手肘彎曲 = 前臂繞 axis = normalize(上臂向下 × 向前) 旋轉；角度 0 是模型原本的姿勢（手臂自然下垂，
 * 手肘本來就微彎十幾度），畫面上顯示的是「手肘彎曲角度」= 原本的微彎 + 旋轉量。
 *
 * 三種動作（肌肉只能拉，所以要成對）：
 *   lift  舉起：二頭肌收縮變短
 *   lower 慢慢放下：重力在拉，二頭肌一邊用力一邊變長，像煞車
 *   push  推出：三頭肌收縮，把手肘伸直
 * 拿著東西時，用前臂當槓桿算出二頭肌要出多少力（手肘是支點，二頭肌接在離手肘約 4 公分的地方）。
 *
 * 產物：cd tools/body && npm run build → assets/js/arm.js
 */
import {
  AmbientLight, ArrowHelper, BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color,
  CylinderGeometry, DirectionalLight, Group, HemisphereLight, Line, LineBasicMaterial, MathUtils, Mesh,
  MeshStandardMaterial, PerspectiveCamera, RepeatWrapping, Scene, SphereGeometry, SRGBColorSpace,
  TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const G = 9.8;
const FOREARM_KG = 1.6;                    // 成人前臂＋手約 1.5–2 公斤，重心約在前臂中間偏近端
const RELAXED = new Color(0xd9a39b), ACTIVE = new Color(0xe0412f), BRAKE = new Color(0xef8a3c);
const TENDON = new Color(0xf4efe6);
const LOADS = {
  0: { en: 'Nothing', zh: '空手' },
  0.2: { en: 'An apple', zh: '一顆蘋果' },
  0.6: { en: 'A water bottle', zh: '一瓶水' },
  3: { en: 'A 3 kg dumbbell', zh: '3 公斤啞鈴' },
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 肌肉紋理：沿著長邊的細纖維
function fiberTexture() {
  const c = document.createElement('canvas');
  c.width = 8; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, 8, 128);
  for (let y = 0; y < 128; y += 3 + (y % 5)) {
    g.fillStyle = `rgba(90,20,20,${0.1 + (y % 7) / 50})`;
    g.fillRect(0, y, 8, 1);
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(1, 3);
  return t;
}

// 沿曲線長出的管子；兩端細（肌腱），中段粗（肌腹）
function makeMuscle(tex, bellyA, bellyB) {
  const SEG = 72, RAD = 20;
  const geo = new BufferGeometry();
  const n = (SEG + 1) * (RAD + 1);
  geo.setAttribute('position', new BufferAttribute(new Float32Array(n * 3), 3));
  geo.setAttribute('color', new BufferAttribute(new Float32Array(n * 3), 3));
  const uv = new Float32Array(n * 2), idx = [];
  for (let i = 0; i <= SEG; i++) {
    for (let j = 0; j <= RAD; j++) {
      const k = i * (RAD + 1) + j;
      uv[k * 2] = i / SEG; uv[k * 2 + 1] = j / RAD;
      if (i < SEG && j < RAD) {
        const a = k, b = k + RAD + 1;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }
  geo.setAttribute('uv', new BufferAttribute(uv, 2));
  geo.setIndex(idx);
  const mat = new MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.5, metalness: 0 });
  const mesh = new Mesh(geo, mat);
  return { mesh, geo, SEG, RAD, bellyA, bellyB, curve: null, length: 0, rest: 0, color: RELAXED.clone() };
}

const tN = new Vector3(), tB = new Vector3(), tP = new Vector3(), tT = new Vector3();
function updateMuscle(m, pts, rBelly, rTendon) {
  m.curve = new CatmullRomCurve3(pts, false, 'centripetal');
  m.length = m.curve.getLength();
  const pos = m.geo.attributes.position, col = m.geo.attributes.color;
  const up = new Vector3(0, 1, 0);
  for (let i = 0; i <= m.SEG; i++) {
    const t = i / m.SEG;
    m.curve.getPointAt(t, tP);
    m.curve.getTangentAt(t, tT);
    // 管子的截面方向：用固定的參考方向，避免 Frenet 標架翻轉造成扭曲
    tN.crossVectors(tT, Math.abs(tT.y) > 0.9 ? tB.set(1, 0, 0) : up).normalize();
    tB.crossVectors(tT, tN).normalize();
    const s = MathUtils.clamp((t - m.bellyA) / (m.bellyB - m.bellyA), 0, 1);
    const belly = s > 0 && s < 1 ? Math.pow(Math.sin(Math.PI * s), 0.75) : 0;
    const r = rTendon + (rBelly - rTendon) * belly;
    // 肌腱（兩端）白色、肌腹用目前的顏色，中間漸變
    const w = MathUtils.smoothstep(belly, 0.05, 0.35);
    const cr = MathUtils.lerp(TENDON.r, m.color.r, w), cg = MathUtils.lerp(TENDON.g, m.color.g, w), cb = MathUtils.lerp(TENDON.b, m.color.b, w);
    for (let j = 0; j <= m.RAD; j++) {
      const a = (j / m.RAD) * Math.PI * 2;
      const k = i * (m.RAD + 1) + j;
      pos.setXYZ(k, tP.x + (tN.x * Math.cos(a) + tB.x * Math.sin(a)) * r,
        tP.y + (tN.y * Math.cos(a) + tB.y * Math.sin(a)) * r,
        tP.z + (tN.z * Math.cos(a) + tB.z * Math.sin(a)) * r);
      col.setXYZ(k, cr, cg, cb);
    }
  }
  pos.needsUpdate = true; col.needsUpdate = true;
  m.geo.computeVertexNormals();
  m.geo.computeBoundingSphere();
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
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.3;
  controls.maxDistance = 4;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a2016, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.15));
  const key = new DirectionalLight(0xfff3e0, 2.1); key.position.set(-3, 3, 2); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 1.0); rim.position.set(2, 1.5, -2.5); scene.add(rim);

  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), deg: $('.am-deg'), slider: $('.am-bend'),
    bi: $('.am-bi'), tri: $('.am-tri'), kg: $('.am-kg'), kgT: $('.am-kg-t'), say: $('.am-say'),
    play: $('.al-play'),
  };
  const lab = labeler($('.al-labels'), cv, camera);

  const state = {
    ready: false, theta: 0, load: 0, mode: 'rest', queue: [], speed: 70,   // 度/秒
    labels: true, arrows: true, lever: false, whole: true, playing: false,
  };
  let restBend = 0, maxTheta = 120;
  const J = {};                      // 關節與附著點（世界座標；前臂上的點掛在 pivot 底下）
  const pivot = new Group();
  scene.add(pivot);
  const tex = fiberTexture();
  const biceps = makeMuscle(tex, 0.16, 0.86);
  const triceps = makeMuscle(tex, 0.1, 0.78);
  scene.add(biceps.mesh, triceps.mesh);

  // 拉力箭頭：肌肉只能拉，所以箭頭一律從附著點指向肌腹
  const arrowB = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(), 0.06, 0xffd36e, 0.018, 0.012);
  const arrowT = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(), 0.06, 0xffd36e, 0.018, 0.012);
  scene.add(arrowB, arrowT);

  // 槓桿示意：支點（手肘）、施力臂、負重臂
  const leverG = new Group();
  scene.add(leverG);
  const fulcrum = new Mesh(new TorusGeometry(0.018, 0.004, 10, 32), new MeshStandardMaterial({ color: 0xffd36e, emissive: 0x6b4a00 }));
  leverG.add(fulcrum);
  const lineMat = (c) => new LineBasicMaterial({ color: c, depthTest: false, transparent: true });
  const loadLine = new Line(new BufferGeometry().setFromPoints([new Vector3(), new Vector3()]), lineMat(0x7ad7ff));
  const effortLine = new Line(new BufferGeometry().setFromPoints([new Vector3(), new Vector3()]), lineMat(0xff6b5e));
  loadLine.renderOrder = effortLine.renderOrder = 5;
  leverG.add(loadLine, effortLine);

  // 手上的東西（跟著手一起轉）
  const held = new Group();
  const mk = (geo, c) => new Mesh(geo, new MeshStandardMaterial({ color: c, roughness: 0.45 }));
  const apple = mk(new SphereGeometry(0.036, 24, 16), 0xc8302a);
  const bottle = mk(new CylinderGeometry(0.03, 0.03, 0.2, 24), 0x6fb7e8);
  bottle.material.transparent = true; bottle.material.opacity = 0.8;
  const dumbbell = new Group();
  const bar = mk(new CylinderGeometry(0.012, 0.012, 0.2, 16), 0x9aa3ad);
  const plateL = mk(new CylinderGeometry(0.05, 0.05, 0.03, 32), 0x2d333b);
  const plateR = plateL.clone();
  plateL.position.y = 0.08; plateR.position.y = -0.08;
  dumbbell.add(bar, plateL, plateR);
  for (const o of [bottle, dumbbell]) o.rotation.z = Math.PI / 2;     // 握把方向＝左右（X）
  held.add(apple, bottle, dumbbell);

  const L = {
    bi: lab.add('am-lb am-lb-bi', 'Biceps · 肱二頭肌'),
    tri: lab.add('am-lb am-lb-tri', 'Triceps · 肱三頭肌'),
    hum: lab.add('am-lb', 'Humerus · 肱骨'),
    rad: lab.add('am-lb', 'Radius · 橈骨'),
    uln: lab.add('am-lb', 'Ulna · 尺骨'),
    elb: lab.add('am-lb am-lb-j', 'Elbow joint · 肘關節'),
    ten: lab.add('am-lb am-lb-t', 'Tendon · 肌腱'),
    pv: lab.add('am-lb am-lb-lv', 'Pivot · 支點'),
    ef: lab.add('am-lb am-lb-ef', 'Effort · 施力'),
    ld: lab.add('am-lb am-lb-ld', 'Load · 負重'),
  };

  let bones = null;
  const ARM = new Set(['r-humerus', 'r-radius', 'r-ulna', 'r-scapula', 'r-clavicle']);
  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    const isArm = (id, b) => ARM.has(id) || (b.info.region === 'hand' && id.startsWith('r-'));
    for (const [id, b] of bones) b.solid = isArm(id, b);

    // 關節中心：肱骨最下面 2.5 公分的平均（肱骨滑車＋小頭）、最上面 3 公分（肱骨頭）
    const hum = bones.get('r-humerus');
    const hv = worldVerts(hum.mesh);
    const yMin = Math.min(...hv.map((v) => v.y)), yMax = Math.max(...hv.map((v) => v.y));
    J.E = average(hv.filter((v) => v.y < yMin + 0.025));
    J.H = average(hv.filter((v) => v.y > yMax - 0.03));
    J.hand = bones.get('r-mc3').center.clone();
    const u = J.E.clone().sub(J.H).normalize();                 // 上臂，向下
    const fwd = new Vector3(0, 0, 1).addScaledVector(u, -u.z).normalize();
    J.axis = new Vector3().crossVectors(u, fwd).normalize();   // 彎曲時前臂往前、往上轉
    J.u = u; J.fwd = fwd;
    const upperLen = J.H.distanceTo(J.E);
    // 原本的微彎角度（在彎曲平面上量）
    const fore = J.hand.clone().sub(J.E);
    const proj = (v) => v.clone().addScaledVector(J.axis, -v.dot(J.axis)).normalize();
    restBend = MathUtils.radToDeg(proj(u).angleTo(proj(fore)));
    maxTheta = 138 - restBend;
    R.slider.min = String(Math.round(restBend));
    R.slider.max = '138';

    // 前臂與整隻手掛到 pivot（手肘）上
    pivot.position.copy(J.E);
    pivot.updateMatrixWorld();
    for (const [id, b] of bones) {
      if (id === 'r-radius' || id === 'r-ulna' || (b.info.region === 'hand' && id.startsWith('r-'))) pivot.attach(b.mesh);
    }
    // 附著點。二頭肌：起點在肩胛骨（肱骨頭前上方），止點在橈骨粗隆（手肘下約 4 公分、前側）
    //         三頭肌：起點在肱骨頭後下方，止點在鷹嘴（尺骨頂端、手肘後面）
    const foreDir = fore.clone().normalize();
    const foreFwd = fwd.clone().addScaledVector(foreDir, -fwd.dot(foreDir)).normalize();
    const local = (w) => pivot.worldToLocal(w.clone());
    J.bO = J.H.clone().addScaledVector(fwd, 0.028).addScaledVector(u, -0.022).addScaledVector(J.axis, -0.012);
    J.bP1 = J.H.clone().addScaledVector(u, upperLen * 0.3).addScaledVector(fwd, 0.03);
    J.bP2 = J.H.clone().addScaledVector(u, upperLen * 0.68).addScaledVector(fwd, 0.036);
    J.bP3L = local(J.E.clone().addScaledVector(fwd, 0.03).addScaledVector(u, -0.01));   // 手肘前方，跟著前臂轉一半
    J.bIL = local(J.E.clone().addScaledVector(foreDir, 0.042).addScaledVector(foreFwd, 0.012));
    J.tO = J.H.clone().addScaledVector(u, 0.045).addScaledVector(fwd, -0.028);
    J.tP1 = J.H.clone().addScaledVector(u, upperLen * 0.38).addScaledVector(fwd, -0.034);
    J.tP2 = J.H.clone().addScaledVector(u, upperLen * 0.8).addScaledVector(fwd, -0.03);
    J.tIL = local(J.E.clone().addScaledVector(foreDir, -0.012).addScaledVector(foreFwd, -0.022));
    J.tWL = local(J.E.clone().addScaledVector(fwd, -0.03).addScaledVector(u, -0.014));   // 手肘後方，跟著前臂轉一半
    J.handL = local(J.hand);
    J.radL = local(bones.get('r-radius').center);
    J.ulnL = local(bones.get('r-ulna').center);
    J.humMid = J.H.clone().lerp(J.E, 0.2);
    // 手上的東西：放在手掌前面、手指中段
    held.position.copy(local(J.hand.clone().addScaledVector(foreDir, 0.05).addScaledVector(foreFwd, 0.04)));
    pivot.add(held);

    fulcrum.position.copy(J.E);
    fulcrum.lookAt(J.E.clone().add(J.axis));

    // 鏡頭：從身體右側、稍微偏前看右手臂
    const mid = J.H.clone().lerp(J.hand, 0.5).add(new Vector3(0, 0.02, 0.12));
    J.target = mid;
    J.home = mid.clone().add(new Vector3(-1.2, 0.14, 0.6));
    camera.position.copy(homePos());
    controls.target.copy(J.target);

    applyBones();
    setTheta(0);
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready', 'al-fresh');
  }).catch(() => {
    R.loading.innerHTML = 'The arm could not be loaded. Please reload the page.<br><span class="zh">手臂模型載入失敗，請重新整理頁面。</span>';
  });

  function homePos() { return J.target.clone().add(J.home.clone().sub(J.target).multiplyScalar(camera.aspect < 0.9 ? 1.25 : 1)); }

  function applyBones() {
    for (const b of bones.values()) {
      const show = b.solid || state.whole;
      b.mesh.visible = show;
      b.mat.opacity = b.solid ? 1 : 0.1;
      b.mat.depthWrite = b.solid;
      b.mesh.renderOrder = b.solid ? 0 : 2;
    }
  }

  // ---------------- 狀態 → 畫面 ----------------
  const w = (p) => pivot.localToWorld(p.clone());
  const act = { bi: 0.05, tri: 0.05 };
  const MODES = {
    rest:  { bi: ['Relaxed', '放鬆', 0.05], tri: ['Relaxed', '放鬆', 0.05],
      en: 'Arm hanging loosely. Both muscles are relaxed, so both feel soft.', zh: '手臂自然下垂，兩條肌肉都放鬆，摸起來都軟軟的。' },
    lift:  { bi: ['Pulling · getting shorter', '收縮（正在變短）', 1], tri: ['Relaxing · being stretched', '放鬆（被拉長）', 0.06],
      en: 'The biceps shortens and pulls the forearm up. The triceps relaxes and lets itself be stretched.', zh: '二頭肌收縮變短，把前臂往上拉；三頭肌放鬆，讓自己被拉長。' },
    lower: { bi: ['Braking · getting longer', '用力但正在變長', 0.6], tri: ['Relaxed', '放鬆', 0.06],
      en: 'Gravity pulls the forearm down. The biceps stays on and lets go little by little, like a brake.', zh: '重力把前臂往下拉；二頭肌沒有休息，而是一點一點放開，就像煞車。' },
    push:  { bi: ['Relaxing · being stretched', '放鬆（被拉長）', 0.06], tri: ['Pulling · getting shorter', '收縮（正在變短）', 1],
      en: 'To straighten the elbow with force, like pushing a door, the triceps shortens and pulls on the back of the elbow.', zh: '要用力把手肘伸直（像推門），就換三頭肌收縮，拉住手肘後面。' },
    hold:  { bi: ['Holding', '用力撐住', 0.4], tri: ['Relaxed', '放鬆', 0.08],
      en: 'Holding still still takes work: the biceps pulls just hard enough to balance the weight.', zh: '停住不動也要用力：二頭肌剛好出力，和重量平衡。' },
  };
  function setTheta(th) {
    state.theta = MathUtils.clamp(th, 0, maxTheta);
    pivot.quaternion.setFromAxisAngle(J.axis, MathUtils.degToRad(state.theta));
    pivot.updateMatrixWorld(true);
    refresh();
  }
  function refresh() {
    const m = MODES[state.mode];
    let biA = m.bi[2], triA = m.tri[2];
    if (state.mode === 'hold') biA = MathUtils.clamp(0.25 + state.load * 0.2, 0.25, 0.9);
    act.bi = biA; act.tri = triA;
    biceps.color.copy(RELAXED).lerp(state.mode === 'lower' ? BRAKE : ACTIVE, biA);
    triceps.color.copy(RELAXED).lerp(ACTIVE, triA);
    // 肌肉形狀：前臂上的點跟著 pivot；手肘前的過渡點轉一半，彎起來時肌腱才會貼著關節繞過去
    const half = new Group();
    half.position.copy(J.E);
    half.quaternion.setFromAxisAngle(J.axis, MathUtils.degToRad(state.theta * 0.5));
    half.updateMatrixWorld(true);
    const bP3 = half.localToWorld(J.bP3L.clone());
    const bI = w(J.bIL), tI = w(J.tIL);
    const tWrap = half.localToWorld(J.tWL.clone());
    const bPts = [J.bO, J.bP1, J.bP2, bP3, bI];
    const tPts = [J.tO, J.tP1, J.tP2, tWrap, tI];
    if (!biceps.rest) { updateMuscle(biceps, bPts, 0.02, 0.0035); biceps.rest = biceps.length; }
    if (!triceps.rest) { updateMuscle(triceps, tPts, 0.022, 0.004); triceps.rest = triceps.length; }
    const biR = 0.02 * Math.sqrt(1 / bellyRatio(biceps, curveLen(bPts))) * (1 + 0.12 * biA);
    const triR = 0.022 * Math.sqrt(1 / bellyRatio(triceps, curveLen(tPts))) * (1 + 0.12 * triA);
    updateMuscle(biceps, bPts, biR, 0.0035);
    updateMuscle(triceps, tPts, triR, 0.004);

    // 箭頭：從止點指向肌腹
    placeArrow(arrowB, biceps, bI, 0.78, biA);
    placeArrow(arrowT, triceps, tI, 0.72, triA);

    // 槓桿：負重臂＝手肘到手的水平距離；施力臂＝手肘到二頭肌拉力線的垂直距離
    const hand = w(J.handL);
    const dHand = Math.hypot(hand.x - J.E.x, hand.z - J.E.z);
    const pullDir = biceps.curve.getPointAt(0.82).sub(bI).normalize();
    const toE = J.E.clone().sub(bI);
    const effort = toE.clone().cross(pullDir).length();
    const foot = bI.clone().addScaledVector(pullDir, toE.dot(pullDir));
    const torque = G * (state.load * dHand + FOREARM_KG * dHand * 0.45);
    const kgf = torque / Math.max(effort, 0.012) / G;
    loadLine.geometry.setFromPoints([J.E, new Vector3(hand.x, J.E.y, hand.z)]);
    effortLine.geometry.setFromPoints([J.E, foot]);
    J.foot = foot; J.handW = hand;

    // 讀數
    const bend = restBend + state.theta;
    R.deg.textContent = `${Math.round(bend)}°`;
    R.slider.value = String(Math.round(bend));
    R.slider.style.setProperty('--p', `${((bend - restBend) / (138 - restBend)) * 100}%`);
    muscleRow(R.bi, m.bi, biA, biceps);
    muscleRow(R.tri, m.tri, triA, triceps);
    const loadName = LOADS[state.load];
    if ((state.mode === 'lift' || state.mode === 'hold' || state.mode === 'lower') && state.theta > 4) {
      R.kg.textContent = `≈ ${kgf < 10 ? kgf.toFixed(1) : Math.round(kgf)} kg`;
      const ratio = effort > 0 ? dHand / effort : 0;
      R.kgT.innerHTML = `Your biceps pulls about as hard as lifting this much, to hold ${esc(loadName.en.toLowerCase())} plus your forearm. It attaches only ${Math.round(effort * 100)} cm from the elbow, but your hand is ${Math.round(dHand * 100)} cm away, so it pulls about ${Math.round(ratio)} times harder than the weight.`
        + `<span class="zh">要撐住${esc(loadName.zh === '空手' ? '前臂本身' : `${loadName.zh}和前臂`)}，二頭肌出的力大約等於舉起這麼重的東西。它離手肘只有 ${Math.round(effort * 100)} 公分，手卻在 ${Math.round(dHand * 100)} 公分外，所以要出大約 ${Math.round(ratio)} 倍的力。</span>`;
    } else if (state.mode === 'push') {
      R.kg.textContent = '—';
      R.kgT.innerHTML = 'How hard the triceps pulls depends on how hard you push.<span class="zh">三頭肌出多少力，看你推得多用力。</span>';
    } else {
      R.kg.textContent = '—';
      R.kgT.innerHTML = 'Bend the elbow to see how hard the biceps has to pull.<span class="zh">把手肘彎起來，看二頭肌要出多少力。</span>';
    }
    R.say.innerHTML = `${esc(m.en)}<span class="zh">${esc(m.zh)}</span>`;
    for (const [k, o] of Object.entries({ apple, bottle, dumbbell })) o.visible = (k === 'apple' && state.load === 0.2) || (k === 'bottle' && state.load === 0.6) || (k === 'dumbbell' && state.load === 3);
    arrowB.visible = state.arrows && biA > 0.3;
    arrowT.visible = state.arrows && triA > 0.3;
    leverG.visible = state.lever;
    effortLine.visible = state.mode !== 'push';       // 推的時候是三頭肌在拉，二頭肌的施力臂不適用
  }
  // 肌腱約占整條的 TENDON_FRAC，長度不變；變長變短的是中間的肌腹
  const TENDON_FRAC = 0.4;
  function bellyRatio(m, len) { const t = m.rest * TENDON_FRAC; return (len - t) / (m.rest - t); }
  function curveLen(pts) { return new CatmullRomCurve3(pts, false, 'centripetal').getLength(); }
  function placeArrow(a, m, at, t, strength) {
    const dir = m.curve.getPointAt(t).sub(at).normalize();
    a.position.copy(at).addScaledVector(dir, -0.02);
    a.setDirection(dir);
    a.setLength(0.03 + 0.05 * strength, 0.018, 0.012);
  }
  function muscleRow(el, st, a, m) {
    el.querySelector('.am-state').innerHTML = `${esc(st[0])}<small>${esc(st[1])}</small>`;
    el.classList.toggle('on', a > 0.3);
    el.classList.toggle('brake', state.mode === 'lower' && el === R.bi);
    const pct = Math.round(bellyRatio(m, m.length) * 100);
    el.querySelector('.am-len s').style.width = `${Math.min(100, pct / 1.3)}%`;
    el.querySelector('.am-len-t').textContent = `${pct}%`;
  }

  // ---------------- 動作 ----------------
  function run(moves) { state.queue = moves.slice(); nextMove(); }
  function nextMove() {
    const mv = state.queue.shift();
    if (!mv) { settle(); return; }
    state.mode = mv.mode;
    state.target = mv.to;
    refresh();
  }
  function settle() {
    state.target = null;
    state.mode = state.theta > 6 ? 'hold' : 'rest';
    refresh();
    if (state.playing) run(state.theta > maxTheta / 2 ? [{ to: 0, mode: 'lower' }] : [{ to: maxTheta * 0.8, mode: 'lift' }]);
  }
  const ACTS = {
    lift: () => run([{ to: maxTheta * 0.8, mode: 'lift' }]),
    lower: () => run(state.theta < 20 ? [{ to: maxTheta * 0.8, mode: 'lift' }, { to: 0, mode: 'lower' }] : [{ to: 0, mode: 'lower' }]),
    push: () => run(state.theta < 40 ? [{ to: maxTheta * 0.75, mode: 'lift' }, { to: 0, mode: 'push' }] : [{ to: 0, mode: 'push' }]),
  };
  root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => {
    if (!state.ready) return;
    setPlaying(false);
    ACTS[b.getAttribute('data-act')]();
  }));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    if (v && state.load === 0) setLoad(3);
    if (v) settle();
    else { state.queue = []; state.target = null; }
  }
  R.play.addEventListener('click', () => { if (state.ready) setPlaying(!state.playing); });
  function setLoad(kg) {
    state.load = kg;
    root.querySelectorAll('[data-load]').forEach((b) => b.setAttribute('aria-pressed', parseFloat(b.getAttribute('data-load')) === kg ? 'true' : 'false'));
    if (state.ready) refresh();
  }
  root.querySelectorAll('[data-load]').forEach((b) => b.addEventListener('click', () => setLoad(parseFloat(b.getAttribute('data-load')))));
  let dragPrev = null, dragTimer = 0;
  R.slider.addEventListener('input', () => {
    if (!state.ready) return;
    setPlaying(false);
    state.queue = []; state.target = null;
    const th = parseFloat(R.slider.value) - restBend;
    if (dragPrev !== null && Math.abs(th - dragPrev) > 0.3) state.mode = th > dragPrev ? 'lift' : 'lower';
    dragPrev = th;
    setTheta(th);
    clearTimeout(dragTimer);
    dragTimer = setTimeout(() => { dragPrev = null; settle(); }, 350);
  });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); if (state.ready) { applyBones(); refresh(); } }); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="arrows"]', (v) => { state.arrows = v; });
  bind('[data-t="lever"]', (v) => { state.lever = v; });
  bind('[data-t="whole"]', (v) => { state.whole = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), J.target); });

  const fly = { t: 1, p0: new Vector3(), p1: new Vector3(), t0: new Vector3(), t1: new Vector3() };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const side = new Vector3(-0.045, 0, 0);    // 標籤往鏡頭那一側（身體右側）偏一點
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(L)) el.hidden = !on;
    if (!on) return;
    const lv = state.lever;
    lab.place(L.bi, biceps.curve.getPointAt(0.55).add(side).addScaledVector(J.fwd, 0.075));
    lab.place(L.tri, triceps.curve.getPointAt(0.3).add(side).addScaledVector(J.fwd, -0.085));
    lab.place(L.hum, J.humMid.clone().add(side));
    lab.place(L.rad, w(J.radL).add(side).addScaledVector(J.fwd, 0.01));
    lab.place(L.uln, w(J.ulnL).add(side).addScaledVector(J.fwd, -0.03));
    lab.place(L.elb, J.E.clone().add(side), lv ? -40 : 0);
    lab.place(L.ten, biceps.curve.getPointAt(0.93).add(side), 18);
    L.elb.hidden = lv;
    L.pv.hidden = L.ld.hidden = !lv;
    L.ef.hidden = !lv || state.mode === 'push';
    if (lv) {
      lab.place(L.pv, J.E.clone().add(side), -26);
      lab.place(L.ef, J.foot.clone().lerp(J.E, 0.4).add(side), 16);
      lab.place(L.ld, new Vector3(J.handW.x, J.E.y, J.handW.z).lerp(J.E, 0.35).add(side), -16);
    }
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const wd = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!wd || !h) return;
    renderer.setSize(wd, h, false);
    camera.aspect = wd / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  if (spaceWrap.clientWidth < 520) {
    state.labels = false;
    const t = $('[data-t="labels"]'); if (t) t.checked = false;
  }

  let visible = false, raf = 0, last = 0;
  function step(dt) {
    if (state.target != null) {
      const d = state.target - state.theta;
      const s = state.speed * (state.mode === 'lower' ? 0.6 : 1) * dt;
      if (Math.abs(d) <= s) { setTheta(state.target); nextMove(); }
      else setTheta(state.theta + Math.sign(d) * s);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.ready) step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-arm-lab]').__lab；背景分頁 rAF 很慢時用 setBend()／render() 直接畫
  root.__lab = {
    camera, controls, state, J, setLoad,
    setBend: (deg, mode = 'hold') => { state.queue = []; state.target = null; state.mode = mode; setTheta(deg - restBend); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return {
    ready: () => state.ready,
    demo: (what) => { setPlaying(false); if (what === 'lever') { const t = $('[data-t="lever"]'); t.checked = true; state.lever = true; setLoad(3); ACTS.lift(); } else (ACTS[what] || ACTS.lift)(); },
  };
}

lazyBoot('[data-arm-lab]', initLab, { demo: (lab, v) => lab.demo(v || 'lift') });
