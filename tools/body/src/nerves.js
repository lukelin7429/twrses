/*
 * 人體探索 · 第七課「大腦怎麼指揮全身？」的 3D 神經系統。
 *
 * 真實的：骨架（skeleton.glb，BodyParts3D），淡淡地當位置參考；右前臂、右小腿掛在 pivot 上可以動。
 * 自繪示意：大腦（左右兩個半球，依功能區上色）、小腦、腦幹、脊髓、眼睛與視神經、到四肢的神經。
 *
 * 四個情境（訊號是沿著神經跑的光點，慢動作播放，畫面上的毫秒是真實時間）：
 *   ruler 接住掉下的尺：眼睛 → 視覺區（後腦）→ 前額決定 → 左腦運動區（左腦管右手，在腦幹交叉）→ 脊髓 → 右手
 *   hot   碰到燙鍋子：手 → 神經 → 脊髓，脊髓直接叫手臂縮回（反射，不經過大腦）；訊號同時往上走，
 *         大腦稍後才「感覺到燙」——痛覺走的是比較慢的神經
 *   knee  膝跳反射：敲髕骨下方 → 大腿神經 → 腰椎的脊髓 → 大腿肌肉 → 小腿踢出
 *   toes  動動腳趾：大腦一路傳到腳趾，最長的一條路
 * 各段的毫秒數是教科書等級的估計（神經傳導約 50–100 公尺／秒、肌肉收縮數十毫秒），寫在 SCEN 裡。
 * 反應測驗：畫面上的尺隨機時間開始掉，按下去的那一刻算反應時間；換算尺掉了幾公分（d = ½ g t²）。
 *
 * 座標（沿用 skeleton.glb）：公尺、Y 朝上、臉朝 +Z、身體右邊在 -X。
 * 產物：cd tools/body && npm run build → assets/js/nerves.js
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, BufferAttribute, CanvasTexture, CatmullRomCurve3, Color,
  CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const G = 9.8;
const SLOW = 40;             // 慢動作：1 毫秒的真實時間＝畫面上 40 毫秒
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');

// 大腦功能區（在半球的單位球座標裡判斷；z 朝前）
const REGIONS = {
  think: { color: 0x7fb0ff, test: (x, y, z) => z > 0.38 },
  motor: { color: 0xff8a5c, test: (x, y, z) => z > -0.02 && z <= 0.3 && y > -0.05 },
  touch: { color: 0xffd36e, test: (x, y, z) => z > -0.36 && z <= -0.02 && y > -0.05 },
  vision: { color: 0x7ddc9a, test: (x, y, z) => z <= -0.58 },
  hearing: { color: 0xc59cff, test: (x, y, z, lat) => lat > 0.55 && y < -0.2 && z > -0.5 && z < 0.3 },
};
const BASE = new Color(0xf0b4c4);

function glowTex() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,240,180,.85)'); gr.addColorStop(1, 'rgba(255,210,100,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

// ---------------- 反應測驗（2D，不需要 WebGL，3D 模型載不出來也能做） ----------------
// 點一下開始 → 隨機 1.5–4 秒後尺開始掉（真實的自由落體）→ 按下的那一刻就是反應時間；尺掉的公分＝½gt²。
function initReaction(root) {
  const box = root.querySelector('.nv-rt-box'), cv = root.querySelector('.nv-rt-cv');
  const msg = root.querySelector('.nv-rt-msg'), list = root.querySelector('.nv-rt-list'), use = root.querySelector('.nv-rt-use');
  if (!box || box.dataset.ready) return;
  box.dataset.ready = '1';
  const rt = { phase: 'idle', t0: 0, timer: 0, tries: [], raf: 0, avg: null };
  const g2 = cv.getContext('2d');
  function draw(fallCm) {
    const W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!W || !H) return;
    if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    g2.setTransform(dpr, 0, 0, dpr, 0, 0);
    g2.clearRect(0, 0, W, H);
    const pxPerCm = H / 40, top = 6 + fallCm * pxPerCm;
    g2.fillStyle = '#f6e7c8'; g2.fillRect(W / 2 - 16, top, 32, 30 * pxPerCm);
    g2.fillStyle = '#5a4a2a'; g2.font = '9px sans-serif'; g2.textAlign = 'left';
    for (let c = 0; c <= 30; c++) {
      const y = top + c * pxPerCm;
      g2.fillRect(W / 2 - 16, y, c % 5 === 0 ? 12 : 6, 1);
      if (c % 5 === 0 && c > 0) g2.fillText(String(c), W / 2 - 2, y + 3);
    }
    g2.fillStyle = 'rgba(255,211,110,.85)';                        // 兩根手指
    g2.fillRect(W / 2 - 34, H * 0.22, 14, 4); g2.fillRect(W / 2 + 20, H * 0.22, 14, 4);
  }
  function fall() {
    rt.raf = 0;
    if (rt.phase !== 'drop') return;
    const tt = (performance.now() - rt.t0) / 1000;
    const cm = 0.5 * G * tt * tt * 100;
    draw(Math.min(cm, 34));
    if (cm > 34) {
      rt.phase = 'done'; box.className = 'nv-rt-box';
      msg.innerHTML = 'The ruler fell all the way! Tap to try again.<span class="zh">尺整個掉下去了！點一下再試一次。</span>';
      return;
    }
    rt.raf = requestAnimationFrame(fall);
  }
  function start() {
    clearTimeout(rt.timer);
    rt.phase = 'wait'; box.className = 'nv-rt-box wait';
    msg.innerHTML = 'Get ready… tap the moment the ruler starts to fall.<span class="zh">準備……尺一開始掉就馬上按。</span>';
    draw(0);
    rt.timer = setTimeout(() => { rt.phase = 'drop'; rt.t0 = performance.now(); box.className = 'nv-rt-box drop'; if (!rt.raf) rt.raf = requestAnimationFrame(fall); }, 1500 + Math.random() * 2500);
  }
  function tap() {
    if (rt.phase === 'idle' || rt.phase === 'done') { start(); return; }
    if (rt.phase === 'wait') {
      clearTimeout(rt.timer); rt.phase = 'done'; box.className = 'nv-rt-box';
      msg.innerHTML = 'Too soon! Wait until the ruler moves. Tap to try again.<span class="zh">太早了！等尺開始動再按。點一下再試一次。</span>';
      return;
    }
    const ms = Math.round(performance.now() - rt.t0);
    rt.phase = 'done'; box.className = 'nv-rt-box';
    const cm = 0.5 * G * (ms / 1000) ** 2 * 100;
    draw(Math.min(cm, 34));
    rt.tries.push(ms);
    if (rt.tries.length > 5) rt.tries.shift();
    rt.avg = Math.round(rt.tries.reduce((a, b) => a + b, 0) / rt.tries.length);
    msg.innerHTML = `<b>${ms} ms</b> · the ruler fell about <b>${cm.toFixed(1)} cm</b>. Tap to go again.<span class="zh">${ms} 毫秒，尺大約掉了 ${cm.toFixed(1)} 公分。點一下再來一次。</span>`;
    list.innerHTML = rt.tries.map((t) => `<span>${t}</span>`).join('') + `<b>Average · 平均 ${rt.avg} ms</b>`;
    use.hidden = !root.__useRT;
  }
  box.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(); });
  box.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); tap(); } });
  use.addEventListener('click', () => { if (root.__useRT && rt.avg) root.__useRT(rt.avg); });
  new ResizeObserver(() => { if (rt.phase !== 'drop') draw(0); }).observe(cv);
  draw(0);
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  initReaction(root);
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
  controls.minDistance = 0.25; controls.maxDistance = 6;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.2));
  const key = new DirectionalLight(0xfff3e0, 2.0); key.position.set(1.5, 3, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.9); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const SC = JSON.parse(root.getAttribute('data-scen') || '{}');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), title: $('.nv-title'), zh: $('.nv-zh'), ms: $('.nv-ms'),
    steps: $('.nv-steps'), note: $('.nv-note'), dist: $('.nv-dist'), scen: [...root.querySelectorAll('[data-scen-go]')],
    rtBox: $('.nv-rt-box'), rtCv: $('.nv-rt-cv'), rtMsg: $('.nv-rt-msg'), rtList: $('.nv-rt-list'), rtUse: $('.nv-rt-use'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, scen: null, t: 0, running: false, myRT: null };

  let bones = null;
  const P = {};                    // 路線
  const hemis = [];                // 兩個半球 { mesh, side, colors, region[] }
  let pulses = [], kneeG = null, elbowG = null, ruler = null, pan = null, hammer = null;

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      b.mat.opacity = b.info.region === 'skull' ? 0.12 : 0.18;
      b.mat.depthWrite = false;
      b.mesh.renderOrder = 1;
    }
    const B = (id) => bones.get(id);
    const C = (id) => B(id).center.clone();

    // ---------- 腦 ----------
    const cran = B('frontal').box.clone();
    for (const id of ['occipital', 'r-parietal', 'l-parietal', 'r-temporal', 'l-temporal']) cran.union(B(id).box);
    const cs = cran.getSize(V(0, 0, 0)), cc = cran.getCenter(V(0, 0, 0));
    const bc = V(cc.x, cc.y + cs.y * 0.06, cc.z - cs.z * 0.02);
    P.bc = bc; P.cs = cs;
    const hsx = cs.x * 0.2, hsy = cs.y * 0.33, hsz = cs.z * 0.4;
    for (const side of [1, -1]) {                       // +1＝左半球（+X），-1＝右半球
      const g = new SphereGeometry(1, 56, 40);
      const pos = g.attributes.position;
      const col = new Float32Array(pos.count * 3);
      const reg = new Array(pos.count).fill(null);
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        if (side * x < -0.25) pos.setX(i, x * 0.55);                // 兩半球中間的縫：內側壓平
        const lat = side * x;
        for (const [k, r] of Object.entries(REGIONS)) if (r.test(x, y, z, lat)) { reg[i] = k; break; }
        col[i * 3] = BASE.r; col[i * 3 + 1] = BASE.g; col[i * 3 + 2] = BASE.b;
      }
      g.setAttribute('color', new BufferAttribute(col, 3));
      g.computeVertexNormals();
      const m = new Mesh(g, new MeshStandardMaterial({ vertexColors: true, roughness: 0.55, transparent: true, opacity: 0.9 }));
      m.scale.set(hsx, hsy, hsz);
      m.position.set(bc.x + side * hsx * 0.95, bc.y, bc.z);
      m.renderOrder = 3;
      scene.add(m);
      hemis.push({ mesh: m, side, reg });
    }
    const cereb = new Mesh(new SphereGeometry(1, 32, 22), new MeshStandardMaterial({ color: 0xd98aa6, roughness: 0.6 }));
    cereb.scale.set(cs.x * 0.26, cs.y * 0.13, cs.z * 0.17);
    cereb.position.set(bc.x, bc.y - hsy * 0.85, bc.z - hsz * 0.6);
    scene.add(cereb);
    P.cereb = cereb;
    const stemTop = V(bc.x, bc.y - hsy * 0.45, bc.z - hsz * 0.15);
    const c1 = C('c1').add(V(0, 0, -0.01));
    // ---------- 脊髓（脊髓在第一、二腰椎結束，下面是一束馬尾神經） ----------
    const cordPts = [stemTop, c1, ...['c3', 'c5', 'c7', 't2', 't5', 't8', 't11', 'l1'].map((id) => C(id).add(V(0, 0, -0.014)))];
    P.cord = cr(cordPts);
    const tube = (curve, r, c, op = 0.85, seg = 120) => {
      const m = new Mesh(new TubeGeometry(curve, seg, r, 10, false), new MeshStandardMaterial({ color: c, roughness: 0.5, transparent: op < 1, opacity: op }));
      m.renderOrder = 2; scene.add(m); return m;
    };
    tube(P.cord, 0.0065, 0xffe08a);
    P.cauda = cr([C('l1').add(V(0, 0, -0.014)), C('l3').add(V(0, 0, -0.014)), C('l5').add(V(0, 0, -0.012)), C('sacrum').add(V(0, 0.02, 0))]);
    tube(P.cauda, 0.0045, 0xffe08a);
    P.stemTop = stemTop; P.c1 = c1;
    // 在脊髓上找某一節的位置
    const cordAt = (id) => C(id).add(V(0, 0, -0.014));

    // ---------- 眼睛與視神經 ----------
    const fr = B('frontal').box;
    const eyeY = fr.min.y - 0.012, eyeZ = fr.max.z - 0.022;
    const eyes = [V(-0.031, eyeY, eyeZ), V(0.031, eyeY, eyeZ)];
    for (const e of eyes) {
      const m = new Mesh(new SphereGeometry(0.012, 20, 14), new MeshStandardMaterial({ color: 0xf6f3ea, roughness: 0.3 }));
      m.position.copy(e); scene.add(m);
    }
    const chiasm = V(bc.x, eyeY - 0.002, bc.z + hsz * 0.35);
    const occ = V(bc.x, bc.y - hsy * 0.05, bc.z - hsz * 0.85);
    P.optic = cr([eyes[0], chiasm, V(bc.x + 0.01, bc.y - hsy * 0.15, bc.z - hsz * 0.3), occ]);
    tube(cr([eyes[0], chiasm]), 0.0028, 0xffe08a); tube(cr([eyes[1], chiasm]), 0.0028, 0xffe08a);
    tube(cr([chiasm, V(bc.x + 0.012, bc.y - hsy * 0.15, bc.z - hsz * 0.3), occ]), 0.0028, 0xffe08a, 0.6);
    P.eyes = eyes;

    // ---------- 腦裡的路（視覺 → 前額 → 左腦運動區 → 腦幹交叉） ----------
    const front = V(bc.x + hsx * 0.6, bc.y + hsy * 0.25, bc.z + hsz * 0.75);
    const motorL = V(bc.x + hsx * 0.9, bc.y + hsy * 0.85, bc.z + hsz * 0.12);
    const touchL = V(bc.x + hsx * 0.9, bc.y + hsy * 0.85, bc.z - hsz * 0.18);
    P.think = cr([occ, V(bc.x + hsx * 0.8, bc.y + hsy * 0.4, bc.z - hsz * 0.2), front]);
    P.toMotor = cr([front, V(bc.x + hsx * 0.9, bc.y + hsy * 0.7, bc.z + hsz * 0.45), motorL]);
    P.motorDown = cr([motorL, V(bc.x + hsx * 0.5, bc.y + hsy * 0.2, bc.z), V(bc.x + 0.004, stemTop.y + 0.01, stemTop.z), stemTop, c1]);
    P.motorL = motorL; P.touchL = touchL; P.front = front; P.occ = occ;

    // ---------- 四肢的神經 ----------
    const humT = (s) => B(`${s}-humerus`).box, femT = (s) => B(`${s}-femur`).box;
    const limbs = {};
    for (const s of ['r', 'l']) {
      const sx = s === 'r' ? -1 : 1;
      const hb = humT(s), fb = femT(s);
      const shoulder = V(hb.getCenter(V(0, 0, 0)).x, hb.max.y - 0.03, hb.getCenter(V(0, 0, 0)).z);
      const elbow = V(hb.getCenter(V(0, 0, 0)).x, hb.min.y + 0.02, hb.getCenter(V(0, 0, 0)).z + 0.01);
      const wrist = V(B(`${s}-radius`).center.x, B(`${s}-radius`).box.min.y + 0.01, B(`${s}-radius`).center.z);
      const finger = C(`${s}-f2-d`);
      limbs[s + 'Arm'] = cr([cordAt('c6'), V(sx * 0.05, C('c7').y - 0.01, C('c7').z + 0.01), shoulder, elbow, wrist, C(`${s}-mc2`), finger]);
      const hip = V(fb.getCenter(V(0, 0, 0)).x, fb.max.y - 0.04, fb.getCenter(V(0, 0, 0)).z - 0.01);
      const knee = V(fb.getCenter(V(0, 0, 0)).x, fb.min.y + 0.03, fb.getCenter(V(0, 0, 0)).z - 0.02);
      const ankle = V(B(`${s}-tibia`).center.x, B(`${s}-tibia`).box.min.y + 0.02, B(`${s}-tibia`).center.z - 0.01);
      limbs[s + 'Leg'] = cr([C('sacrum').add(V(sx * 0.02, 0.02, 0)), hip, knee, ankle, C(`${s}-mt1`), C(`${s}-t1-d`)]);
      tube(limbs[s + 'Arm'], 0.0028, 0xffe08a, 0.8, 160);
      tube(limbs[s + 'Leg'], 0.0032, 0xffe08a, 0.8, 160);
    }
    P.rArm = limbs.rArm; P.rLeg = limbs.rLeg;
    // 反射弧：腿的訊號從腰椎進入脊髓（模型裡畫在 L3）
    P.kneeUp = cr([C('r-patella').add(V(0, -0.03, 0.02)), V(femT('r').getCenter(V(0, 0, 0)).x, femT('r').min.y + 0.05, femT('r').getCenter(V(0, 0, 0)).z),
      V(femT('r').getCenter(V(0, 0, 0)).x, femT('r').max.y - 0.04, femT('r').getCenter(V(0, 0, 0)).z - 0.01), C('l3').add(V(-0.01, 0, -0.014))]);
    P.kneeDown = cr([C('l3').add(V(-0.01, 0, -0.014)), V(femT('r').getCenter(V(0, 0, 0)).x, femT('r').max.y - 0.06, femT('r').getCenter(V(0, 0, 0)).z + 0.02),
      V(femT('r').getCenter(V(0, 0, 0)).x, (femT('r').max.y + femT('r').min.y) / 2, femT('r').max.z)]);
    tube(P.kneeUp, 0.0026, 0xffe08a, 0.6); tube(P.kneeDown, 0.0026, 0xffe08a, 0.6);

    // ---------- 會動的部分 ----------
    const hum = worldVerts(B('r-humerus').mesh);
    const hy0 = Math.min(...hum.map((v) => v.y));
    const elbowC = average(hum.filter((v) => v.y < hy0 + 0.025));
    elbowG = new Group(); elbowG.position.copy(elbowC); scene.add(elbowG); elbowG.updateMatrixWorld();
    for (const [id, b] of bones) if (id === 'r-radius' || id === 'r-ulna' || (b.info.region === 'hand' && id.startsWith('r-'))) elbowG.attach(b.mesh);
    const fem = worldVerts(B('r-femur').mesh);
    const fy0 = Math.min(...fem.map((v) => v.y));
    const kneeC = average(fem.filter((v) => v.y < fy0 + 0.025));
    kneeG = new Group(); kneeG.position.copy(kneeC); scene.add(kneeG); kneeG.updateMatrixWorld();
    for (const [id, b] of bones) if (['r-tibia', 'r-fibula', 'r-patella'].includes(id) || (b.info.region === 'foot' && id.startsWith('r-'))) kneeG.attach(b.mesh);
    P.handIds = [...bones.keys()].filter((id) => bones.get(id).info.region === 'hand' && id.startsWith('r-'));
    P.toeIds = [...bones.keys()].filter((id) => bones.get(id).info.region === 'foot' && id.startsWith('r-'));
    // 道具：尺、燙鍋子、小槌子
    const handC = C('r-mc3');
    ruler = new Mesh(new BoxGeometry(0.03, 0.3, 0.003), new MeshStandardMaterial({ color: 0xf6e7c8, roughness: 0.5, emissive: 0x221a08 }));
    P.rulerY0 = handC.y + 0.2;
    ruler.position.set(handC.x, P.rulerY0, handC.z + 0.05);
    scene.add(ruler); ruler.visible = false;
    pan = new Mesh(new CylinderGeometry(0.06, 0.05, 0.02, 32), new MeshStandardMaterial({ color: 0x3a3f46, emissive: 0xff5a1f, emissiveIntensity: 0.6, roughness: 0.4 }));
    pan.position.set(handC.x, handC.y - 0.04, handC.z + 0.08);
    scene.add(pan); pan.visible = false;
    hammer = new Group();
    const head = new Mesh(new CylinderGeometry(0.012, 0.012, 0.05, 16), new MeshStandardMaterial({ color: 0xd8434a }));
    head.rotation.z = Math.PI / 2;
    const handle = new Mesh(new CylinderGeometry(0.004, 0.004, 0.16, 8), new MeshStandardMaterial({ color: 0xc9c9c9 }));
    handle.position.y = 0.08;
    hammer.add(head, handle);
    const pat = C('r-patella');
    P.hammerAt = V(pat.x, pat.y - 0.045, pat.z + 0.03);
    hammer.position.copy(P.hammerAt).add(V(0, 0.02, 0.08));
    scene.add(hammer); hammer.visible = false;

    // 鏡頭
    P.target = V(0, (bc.y + C('l5').y) / 2 + 0.05, 0.02);
    P.home = V(0.45, 0.12, 2.2);
    camera.position.copy(homePos());
    controls.target.copy(P.target);

    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    choose('ruler');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(camera.aspect < 0.9 ? 1.3 : 1)); }

  // ---------------- 大腦上色 ----------------
  function paintBrain(active) {
    for (const h of hemis) {
      const col = h.mesh.geometry.attributes.color;
      for (let i = 0; i < col.count; i++) {
        const k = h.reg[i];
        let c = BASE;
        if (k && active[k] && (active[k] === 'both' || active[k] === (h.side > 0 ? 'left' : 'right'))) c = new Color(REGIONS[k].color);
        else if (k && state.mapAll) c = new Color(REGIONS[k].color).lerp(BASE, 0.45);
        col.setXYZ(i, c.r, c.g, c.b);
      }
      col.needsUpdate = true;
    }
  }

  // ---------------- 情境 ----------------
  // 每一段：{ path, t0, t1（毫秒）, color }；事件：{ at, region:{...}, act, text }
  const SIG = 0xfff1b8, PAIN = 0xff7a59;
  function build(name, rt) {
    const segs = [], ev = [];
    if (name === 'ruler') {
      const total = rt || 200;
      // 估計：眼睛與視覺 50、思考決定 total-130、運動區到手 20、肌肉收縮 60
      const think = Math.max(20, total - 130);
      segs.push({ path: P.optic, t0: 0, t1: 50, color: SIG });
      segs.push({ path: P.think, t0: 50, t1: 50 + think, color: SIG });
      segs.push({ path: P.toMotor, t0: 50 + think, t1: 60 + think, color: SIG });
      segs.push({ path: P.motorDown, t0: 60 + think, t1: 64 + think, color: SIG });
      segs.push({ path: P.cord, t0: 64 + think, t1: 66 + think, color: SIG, part: [0, 0.4] });
      segs.push({ path: P.rArm, t0: 66 + think, t1: 70 + think + 10, color: SIG });
      ev.push({ at: 0, act: 'rulerDrop' }, { at: 30, region: { vision: 'both' } }, { at: 50 + think * 0.3, region: { vision: 'both', think: 'both' } },
        { at: 50 + think, region: { think: 'both', motor: 'left' } }, { at: 80 + think, act: 'grip' }, { at: total, act: 'rulerStop' });
      return { segs, ev, total, rt: total };
    }
    if (name === 'hot') {
      segs.push({ path: P.rArm, t0: 0, t1: 15, color: SIG, rev: true });                 // 手 → 脊髓
      segs.push({ path: P.rArm, t0: 16, t1: 31, color: SIG });                           // 脊髓 → 手臂肌肉（反射）
      segs.push({ path: P.cord, t0: 15, t1: 22, color: SIG, rev: true, part: [0, 0.35] });   // 同時往上
      segs.push({ path: P.motorDown, t0: 22, t1: 30, color: SIG, rev: true });
      segs.push({ path: P.rArm, t0: 0, t1: 420, color: PAIN, rev: true, slow: true });     // 慢的痛覺
      ev.push({ at: 0, act: 'panOn' }, { at: 35, act: 'pull' }, { at: 32, region: { touch: 'left' } },
        { at: 450, region: { touch: 'left', think: 'both' }, act: 'ouch' });
      return { segs, ev, total: 600 };
    }
    if (name === 'knee') {
      segs.push({ path: P.kneeUp, t0: 0, t1: 8, color: SIG });
      segs.push({ path: P.kneeDown, t0: 9, t1: 16, color: SIG });
      ev.push({ at: -60, act: 'hammer' }, { at: 22, act: 'kick' });
      return { segs, ev, total: 140 };
    }
    // toes：大腦 → 脊髓 → 馬尾 → 腿 → 腳趾
    segs.push({ path: P.toMotor, t0: 0, t1: 10, color: SIG });
    segs.push({ path: P.motorDown, t0: 10, t1: 14, color: SIG });
    segs.push({ path: P.cord, t0: 14, t1: 21, color: SIG });
    segs.push({ path: P.cauda, t0: 21, t1: 24, color: SIG });
    segs.push({ path: P.rLeg, t0: 24, t1: 40, color: SIG });
    ev.push({ at: 0, region: { think: 'both', motor: 'left' } }, { at: 45, act: 'toes' });
    return { segs, ev, total: 110 };
  }

  const glowT = glowTex();
  function makePulse(color) {
    const s = new Sprite(new SpriteMaterial({ map: glowT, color, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
    s.scale.set(0.035, 0.035, 1); s.renderOrder = 9; scene.add(s); return s;
  }
  let cur = null;
  function choose(name, rt) {
    for (const p of pulses) scene.remove(p.sprite);
    pulses = [];
    resetProps();
    cur = build(name, rt);
    if (name === 'ruler') state.lastRT = rt;
    state.scen = name; state.t = cur.ev.some((e) => e.at < 0) ? -80 : -20; state.running = true;
    for (const s of cur.segs) pulses.push({ seg: s, sprite: makePulse(s.color) });
    cur.done = new Set();
    R.scen.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-scen-go') === name ? 'true' : 'false'));
    const sc = SC[name] || {};
    R.title.textContent = sc.en || ''; R.zh.textContent = sc.zh || '';
    let steps = (sc.steps || []).slice();
    if (name === 'ruler' && rt) {
      // 用你的反應時間：前 50 毫秒（眼睛）不變，其餘等比例縮放；最後一步換成「你的手合起來」
      const k = (rt - 50) / (200 - 50);
      steps = steps.slice(0, -1).map((st) => ({ ...st, at: st.at <= 50 ? st.at : Math.round(50 + (st.at - 50) * k) }));
      steps.push({ at: rt, en: 'Your hand closes: this is your own reaction time.', zh: '你的手合起來：這是你自己的反應時間。', you: true });
    }
    R.steps.innerHTML = steps.map((st) => `<li${st.you ? ' class="nv-you"' : ''} data-at="${st.at}"><b>${st.at} ms</b>${esc(st.en)}<span class="zh">${esc(st.zh)}</span></li>`).join('');
    R.note.innerHTML = `${esc(sc.note_en || '')}<span class="zh">${esc(sc.note_zh || '')}</span>`;
    const len = cur.segs.filter((s) => !s.slow).reduce((a, s) => a + s.path.getLength() * (s.part ? s.part[1] - s.part[0] : 1), 0);
    R.dist.textContent = `${len.toFixed(2)} m`;
    paintBrain({});
    // 鏡頭：每個情境看它發生的地方
    const hand = bones.get('r-mc3').center, knee = bones.get('r-patella').center;
    const VIEW = {
      ruler: [V(-0.07, P.bc.y * 0.38 + hand.y * 0.62, 0.02), 1.65],
      hot: [V(-0.1, P.bc.y * 0.3 + hand.y * 0.7, 0.03), 1.6],
      knee: [V(-0.05, (knee.y + bones.get('l3').center.y) / 2, 0.03), 1.45],
      toes: [V(0, (P.bc.y + bones.get('r-tibia').box.min.y) / 2, 0.02), 2.35],
    };
    const [tgt, dist] = VIEW[name];
    flyTo(tgt.clone().add(P.home.clone().normalize().multiplyScalar(dist * (camera.aspect < 0.9 ? 1.3 : 1))), tgt);
  }
  function resetProps() {
    ruler.visible = false; ruler.position.y = P.rulerY0;
    pan.visible = false; hammer.visible = false;
    elbowG.quaternion.identity(); kneeG.quaternion.identity();
    for (const id of [...P.handIds, ...P.toeIds]) {
      const b = bones.get(id);
      b.mat.emissive.setHex(0x000000);
      if (b.baseY != null) b.mesh.position.y = b.baseY;
    }
    state.act = {};
  }
  const ax = V(1, 0, 0);
  function stepScenario(dtMs) {
    if (!cur || !state.running) return;
    state.t += dtMs;
    const t = state.t;
    for (const p of pulses) {
      const s = p.seg;
      const f = (t - s.t0) / (s.t1 - s.t0);
      p.sprite.visible = f >= 0 && f <= 1;
      if (!p.sprite.visible) continue;
      let u = s.rev ? 1 - f : f;
      if (s.part) u = s.part[0] + (s.part[1] - s.part[0]) * u;
      s.path.getPointAt(MathUtils.clamp(u, 0, 1), p.sprite.position);
    }
    for (const e of cur.ev) {
      if (cur.done.has(e) || t < e.at) continue;
      cur.done.add(e);
      if (e.region) paintBrain(e.region);
      if (e.act === 'rulerDrop') { ruler.visible = true; state.act.drop = e.at; }
      if (e.act === 'rulerStop') state.act.stop = true;
      if (e.act === 'grip') for (const id of P.handIds) bones.get(id).mat.emissive.setHex(0x6b4a00);
      if (e.act === 'panOn') pan.visible = true;
      if (e.act === 'pull') state.act.pull = t;
      if (e.act === 'ouch') state.act.ouch = true;
      if (e.act === 'hammer') { hammer.visible = true; state.act.hammer = t; }
      if (e.act === 'kick') state.act.kick = t;
      if (e.act === 'toes') { state.act.toes = t; for (const id of P.toeIds) bones.get(id).mat.emissive.setHex(0x6b4a00); }
    }
    // 尺往下掉（真實的自由落體），手合起來就停
    if (state.act.drop != null && !state.act.stop) {
      const tt = (t - state.act.drop) / 1000;
      ruler.position.y = P.rulerY0 - 0.5 * G * tt * tt;
    }
    if (state.act.pull != null) {
      const k = MathUtils.clamp((t - state.act.pull) / 60, 0, 1);
      elbowG.quaternion.setFromAxisAngle(ax, -MathUtils.degToRad(55) * MathUtils.smootherstep(k, 0, 1));
    }
    if (state.act.hammer != null) {
      const k = MathUtils.clamp((t - state.act.hammer) / 60, 0, 1);
      hammer.position.copy(P.hammerAt).add(V(0, 0.02 * (1 - k), 0.08 * (1 - k)));
    }
    if (state.act.kick != null) {
      const k = MathUtils.clamp((t - state.act.kick) / 90, 0, 1);
      kneeG.quaternion.setFromAxisAngle(ax, -MathUtils.degToRad(28) * Math.sin(k * Math.PI));
    }
    if (state.act.toes != null) {
      const k = (t - state.act.toes) / 60;
      for (const id of P.toeIds.filter((i) => /-t\d/.test(i))) bones.get(id).mesh.position.y = (bones.get(id).baseY ??= bones.get(id).mesh.position.y) + 0.004 * Math.sin(k * Math.PI * 2);
    }
    R.ms.textContent = `${Math.max(0, Math.round(Math.min(t, cur.total)))} ms`;
    R.steps.querySelectorAll('li').forEach((li) => li.classList.toggle('on', t >= parseFloat(li.dataset.at)));
    if (t >= cur.total + 250) { state.running = false; for (const p of pulses) p.sprite.visible = false; }
  }

  // 反應測驗在 initReaction（不需要 WebGL）；這裡只接「用我的時間播放」
  root.__useRT = (ms) => { if (state.ready) choose('ruler', ms); };

  // ---------------- 操作 ----------------
  R.scen.forEach((b) => b.addEventListener('click', () => { if (state.ready) choose(b.getAttribute('data-scen-go')); }));
  $('.nv-replay').addEventListener('click', () => { if (state.ready && state.scen) choose(state.scen, state.scen === 'ruler' ? state.lastRT : undefined); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="map"]', (v) => { state.mapAll = v; paintBrain({}); });
  bind('[data-t="skel"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const L = {
    brain: lab.add('nv-lb', 'Brain · 大腦'), cereb: lab.add('nv-lb', 'Cerebellum · 小腦'),
    cord: lab.add('nv-lb', 'Spinal cord · 脊髓'), nerve: lab.add('nv-lb', 'Nerves · 神經'),
    eye: lab.add('nv-lb', 'Eyes · 眼睛'), ouch: lab.add('nv-lb nv-lb-ouch', 'Ouch! · 好燙！'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const [k, el] of Object.entries(L)) el.hidden = !on || k === 'ouch';
    if (!state.ready) return;
    L.ouch.hidden = !(state.scen === 'hot' && state.act?.ouch && state.running);
    if (!L.ouch.hidden) lab.place(L.ouch, P.bc.clone().add(V(0.12, 0.08, 0)));
    if (!on) return;
    lab.place(L.brain, P.bc.clone().add(V(0.13, 0.04, 0.02)));
    lab.place(L.cereb, P.cereb.position.clone().add(V(0.11, -0.01, 0)));
    lab.place(L.cord, P.cord.getPointAt(0.55).add(V(0.07, 0, 0)));
    lab.place(L.nerve, P.rArm.getPointAt(0.45).add(V(-0.07, 0, 0)));
    lab.place(L.eye, P.eyes[0].clone().add(V(-0.08, 0, 0.02)));
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
    stepScenario(dt * 1000 / SLOW);
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

  // 除錯用：$('[data-nerves-lab]').__lab；背景分頁 rAF 很慢時用 choose()／runMs(毫秒)／render()
  root.__lab = {
    camera, controls, state, choose: (n, r) => choose(n, r),
    runMs: (ms) => { for (let t = 0; t < ms; t += 2) stepScenario(2); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, scen: (n) => choose(n), test: () => { R.rtBox.scrollIntoView({ block: 'center' }); R.rtBox.focus(); } };
}

lazyBoot('[data-nerves-lab]', initLab, { scen: (lab, v) => lab.scen(v), test: (lab) => lab.test() });
