/*
 * 人體探索 · 第四課「空氣怎麼進到血液裡？」的 3D 胸腔。
 *
 * 真實的：胸廓（肋骨、胸骨、胸椎、鎖骨），沿用第一課 assets/models/skeleton.glb（BodyParts3D）。
 * 自繪示意：左右兩片肺（左肺較小、有容納心臟的凹口）、橫膈膜、氣管與支氣管樹、肺泡、小小的心臟。
 *
 * 呼吸的道理（本課的大觀念）：肺自己不會吸氣。
 *   吸氣：橫膈膜收縮變平、往下移；肋間肌把肋骨往上往外抬（像水桶的提把）→ 胸腔變大 → 空氣湧進來
 *   吐氣（安靜時）：橫膈膜放鬆、彈回圓頂；肋骨落下；肺像被撐開的氣球一樣縮回去 → 空氣被擠出去
 * 模型裡的 b（0＝吐完、1＝吸滿）同時驅動：肺的大小、橫膈膜的高度與圓頂、肋骨的角度、氣流粒子。
 *
 * 氣流粒子沿著支氣管樹從氣管走到肺泡（吸氣）再走回來（吐氣）；吸進來是淡藍色（新鮮空氣），
 * 吐出去是暖黃色（二氧化碳比較多，但仍有約 16% 的氧氣）。
 * 右側小窗是 2D 動畫：一個肺泡與包著它的微血管，氧氣進血、二氧化碳出來，血球由暗紅變鮮紅。
 *
 * 親身測量：按住「吸氣」按鈕，模型跟著你即時呼吸；或數 30 秒呼吸次數 ×2，模型改用你的節奏。
 *
 * 座標（沿用 skeleton.glb）：公尺、Y 朝上、臉朝 +Z，身體右邊在 -X（從正面看在畫面左邊）。
 * 產物：cd tools/body && npm run build → assets/js/lungs.js
 */
import {
  AmbientLight, Box3, Color, CylinderGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight,
  InstancedMesh, MathUtils, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Quaternion, Scene,
  SphereGeometry, Vector3, WebGLRenderer, CatmullRomCurve3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const AIR_IN = new Color(0xbfe6ff), AIR_OUT = new Color(0xffc76b);
const TIDAL_L = 0.5;                         // 成人安靜時每口約 0.5 公升
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 肺的形狀：從球變形——內側壓平、底部內凹（坐在橫膈膜上）、上面收尖；左肺在前下方挖出心臟凹口
function lungGeometry(side) {
  const g = new SphereGeometry(1, 48, 36);
  const p = g.attributes.position;
  const v = V(0, 0, 0);
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const medial = side === 'r' ? v.x > 0 : v.x < 0;         // 靠身體中線那一側
    if (medial) v.x *= 0.5;
    if (v.y < 0) v.y += 0.45 * (1 - Math.min(1, v.x * v.x + v.z * v.z)) * -v.y;   // 底部內凹
    if (v.y > 0.3) { const k = 1 - (v.y - 0.3) * 0.45; v.x *= k; v.z *= k; }        // 肺尖收窄
    if (side === 'l' && medial && v.z > 0.1 && v.y < 0.2) v.x *= 0.45;               // 心臟凹口
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

// ---------------- 2D 小窗：一個肺泡 ----------------
function alveolusView(canvas) {
  const g = canvas.getContext('2d');
  const O2 = [], CO2 = [], CELLS = [];
  for (let i = 0; i < 26; i++) O2.push({ t: Math.random(), a: Math.random() * Math.PI * 2, r: Math.random() });
  for (let i = 0; i < 18; i++) CO2.push({ t: Math.random(), a: Math.random() * Math.PI * 2, r: Math.random() });
  for (let i = 0; i < 9; i++) CELLS.push({ u: i / 9 });
  function draw(dt, b) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return;
    if (canvas.width !== Math.round(W * dpr)) { canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#060a16'; g.fillRect(0, 0, W, H);
    const cx = W * 0.5, cy = H * 0.42, R = Math.min(W, H) * (0.3 + 0.03 * b);
    // 微血管：繞著肺泡下半圈的彎管
    const capR = R + Math.min(W, H) * 0.075;
    g.lineWidth = Math.min(W, H) * 0.1;
    const grad = g.createLinearGradient(cx - capR, 0, cx + capR, 0);
    grad.addColorStop(0, '#7a2a66'); grad.addColorStop(0.55, '#c23a55'); grad.addColorStop(1, '#ff3434');
    g.strokeStyle = grad; g.globalAlpha = 0.55;
    g.beginPath(); g.arc(cx, cy, capR, Math.PI * 0.95, Math.PI * 0.05, true); g.stroke();
    g.globalAlpha = 1;
    // 肺泡
    g.fillStyle = 'rgba(191,230,255,.12)'; g.strokeStyle = 'rgba(242,167,184,.9)'; g.lineWidth = 2.5;
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill(); g.stroke();
    // 血球：沿微血管由左往右，顏色由暗紅變鮮紅
    for (const c of CELLS) {
      c.u = (c.u + dt * 0.12) % 1;
      const a = Math.PI * 0.95 - c.u * Math.PI * 0.9;       // 由左下到右下（逆時針往下繞）
      const ang = Math.PI - a;
      const x = cx + Math.cos(ang) * capR * -1, y = cy + Math.sin(a) * capR;
      const col = c.u < 0.3 ? '#7a2a66' : c.u > 0.7 ? '#ff3434' : '#c23a55';
      g.fillStyle = col;
      g.beginPath(); g.ellipse(x, y, Math.min(W, H) * 0.035, Math.min(W, H) * 0.022, a, 0, Math.PI * 2); g.fill();
    }
    // 氧氣（藍）：從肺泡中間往下穿過牆進到血裡
    g.font = `${Math.round(Math.min(W, H) * 0.045)}px sans-serif`;
    for (const d of O2) {
      d.t += dt * 0.35;
      if (d.t > 1) { d.t = 0; d.a = Math.PI * (0.15 + Math.random() * 0.7); d.r = Math.random(); }
      const r0 = R * 0.2 + d.r * R * 0.35, r1 = capR;
      const rr = r0 + (r1 - r0) * d.t;
      const x = cx + Math.cos(d.a) * rr, y = cy + Math.sin(d.a) * rr;
      g.fillStyle = `rgba(122,215,255,${d.t > 0.9 ? (1 - d.t) * 10 : 1})`;
      g.beginPath(); g.arc(x, y, Math.min(W, H) * 0.014, 0, Math.PI * 2); g.fill();
    }
    // 二氧化碳（黃）：從血裡往上出來進到肺泡
    for (const d of CO2) {
      d.t += dt * 0.3;
      if (d.t > 1) { d.t = 0; d.a = Math.PI * (0.15 + Math.random() * 0.7); d.r = Math.random(); }
      const r0 = capR, r1 = R * 0.25 + d.r * R * 0.4;
      const rr = r0 + (r1 - r0) * d.t;
      const x = cx + Math.cos(d.a) * rr, y = cy + Math.sin(d.a) * rr;
      g.fillStyle = `rgba(255,199,107,${d.t > 0.9 ? (1 - d.t) * 10 : 0.95})`;
      g.beginPath(); g.arc(x, y, Math.min(W, H) * 0.013, 0, Math.PI * 2); g.fill();
    }
    // 標示
    g.fillStyle = '#cfe0ff'; g.textAlign = 'center';
    g.fillText('air sac · 肺泡', cx, cy - R * 0.55);
    g.fillStyle = '#ffb4a8';
    g.fillText('capillary · 微血管', cx, Math.min(H - 6, cy + capR + Math.min(W, H) * 0.12));
  }
  return { draw };
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
  controls.minDistance = 0.25; controls.maxDistance = 4;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.18));
  const key = new DirectionalLight(0xfff3e0, 2.0); key.position.set(1.5, 3, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.9); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), bpm: $('.lu-bpm'), src: $('.lu-src'), phase: $('.lu-phase'),
    phaseT: $('.lu-phase-t'), hold: $('.lu-hold'), play: $('.al-play'),
    lmin: $('.lu-lmin'), lday: $('.lu-lday'), day: $('.lu-day'),
    measure: $('.hr-measure'), tap: $('.hr-tap'), tapN: $('.hr-tap-n'), tapS: $('.hr-tap-s'), tapBox: $('.hr-tapbox'), tapMsg: $('.hr-tap-msg'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const alv = alveolusView($('.lu-alv'));
  const state = {
    ready: false, rate: 16, src: 'rest', phase: 0, b: 0, playing: true, holding: false, manual: false,
    labels: true, ribs: true, airways: true, heart: true, measuring: null,
  };

  let bones = null;
  const J = {};
  const ribs = [];
  const lungs = {};
  const lungG = {};
  const tree = { r: [], l: [] };      // 每一邊的支氣管線段 { a, b, r, depth }
  const paths = [];                   // 氣流粒子的路線（氣管頂端 → 某個肺泡）
  let airCells = null, alvMesh = null, segMesh = null, diaphragm = null, heart = null, trachea = null;
  const air = [];

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    const KEEP = (id, b) => b.info.region === 'chest' || /^t\d+$/.test(id) || /^c[3-7]$/.test(id) || /clavicle/.test(id);
    const chest = new Box3();
    for (const [id, b] of bones) {
      b.keep = KEEP(id, b);
      b.mesh.visible = b.keep;
      if (b.info.region === 'chest') chest.union(b.box);
    }
    const cs = chest.getSize(V(0, 0, 0)), cc = chest.getCenter(V(0, 0, 0));
    J.cs = cs; J.cc = cc;

    // 肋骨的「提把」轉軸：每根肋骨後端（最靠脊椎、最後面的點）附近，繞 X 軸轉，前端往上抬
    for (const [id, b] of bones) {
      if (!/rib/.test(id)) continue;
      const pivot = new Group();
      pivot.position.set(b.box.getCenter(V(0, 0, 0)).x * 0.25, b.box.max.y - 0.01, b.box.min.z + 0.01);
      scene.add(pivot);
      pivot.updateMatrixWorld();
      pivot.attach(b.mesh);
      const n = parseInt(id.split('-').pop(), 10);
      ribs.push({ pivot, amp: MathUtils.degToRad(n <= 7 ? 3.2 : 2.2) });
    }
    const st = bones.get('sternum');
    J.sternum = st.mesh; J.sternum0 = st.mesh.position.clone();

    // 肺：放在胸廓裡，左右各一
    const H = cs.y * 0.78, Wd = cs.x * 0.36, D = cs.z * 0.72;
    for (const side of ['r', 'l']) {
      const g = new Group();
      const sx = side === 'r' ? -1 : 1;
      const apex = V(cc.x + sx * cs.x * 0.2, cc.y + cs.y * 0.43, cc.z - cs.z * 0.02);
      g.position.copy(apex);
      scene.add(g);
      const m = new Mesh(lungGeometry(side), new MeshStandardMaterial({ color: 0xee8fa6, roughness: 0.55, transparent: true, opacity: 0.62, depthWrite: false, side: DoubleSide }));
      const w = side === 'l' ? Wd * 0.92 : Wd;
      m.scale.set(w / 2, H / 2, D / 2);
      m.position.set(0, -H / 2, 0);          // 以肺尖為原點，放大時往下長
      m.renderOrder = 3;
      g.add(m);
      lungs[side] = m; lungG[side] = g;
    }
    J.H = H;
    // 橫膈膜：肺底下的圓頂肌肉
    const dia = new Mesh(new SphereGeometry(1, 48, 16, 0, Math.PI * 2, 0, Math.PI * 0.42),
      new MeshStandardMaterial({ color: 0xb4544a, roughness: 0.6, transparent: true, opacity: 0.78, side: DoubleSide }));
    dia.scale.set(cs.x * 0.44, cs.y * 0.18, cs.z * 0.44);
    J.diaTop = cc.y + cs.y * 0.43 - H - 0.005;
    J.diaY0 = J.diaTop - cs.y * 0.18;
    dia.position.set(cc.x, J.diaY0, cc.z - cs.z * 0.02);
    scene.add(dia);
    diaphragm = dia;
    // 小小的心臟（接第三課）：兩肺之間、橫膈膜上面，偏左
    heart = new Mesh(new SphereGeometry(1, 32, 24), new MeshStandardMaterial({ color: 0xd8434a, roughness: 0.45, transparent: true, opacity: 0.85 }));
    heart.scale.set(cs.x * 0.13, cs.y * 0.17, cs.z * 0.22);
    heart.rotation.z = -0.5;
    heart.position.set(cc.x + cs.x * 0.06, J.diaTop + cs.y * 0.12, cc.z + cs.z * 0.08);
    scene.add(heart);

    // 氣管：從脖子往下到胸骨後面分岔（隆凸）
    const top = V(cc.x, cc.y + cs.y * 0.62, cc.z + cs.z * 0.02);
    const carina = V(cc.x, cc.y + cs.y * 0.26, cc.z - cs.z * 0.02);
    J.top = top; J.carina = carina;
    const airway = new MeshStandardMaterial({ color: 0xf6e7c8, roughness: 0.5 });
    trachea = new Mesh(new CylinderGeometry(0.009, 0.009, top.distanceTo(carina), 16), airway);
    trachea.position.copy(top).lerp(carina, 0.5);
    scene.add(trachea);
    // 支氣管樹：先在每片肺裡均勻撒下末端點（肺泡的位置），再從隆凸往這些點「一分為二」地長過去——
    // 每個分岔點朝還沒到達的那群點的中心走一段，再把那群點沿最長的方向切成兩半。這樣樹會填滿整片肺，
    // 不會擠在一角或穿出肺外。線段存在各自肺的局部座標裡（跟著肺一起變大）。
    const seg = [];
    const leaves = [];
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    function lungPoint(side) {
      const w = (side === 'l' ? Wd * 0.92 : Wd) / 2;
      for (;;) {
        const v = V(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1);
        if (v.lengthSq() > 0.62) continue;                 // 留在肺的內部（半徑約 0.79 以內）
        const medial = side === 'r' ? v.x > 0 : v.x < 0;
        if (medial) v.x *= 0.5;
        if (side === 'l' && medial && v.z > 0.1 && v.y < 0.2) continue;   // 避開心臟凹口
        if (v.y > 0.3) { const k = 1 - (v.y - 0.3) * 0.45; v.x *= k; v.z *= k; }
        return V(v.x * w, v.y * H / 2 - H / 2, v.z * D / 2);
      }
    }
    function branch(side, start, targets, r, route) {
      if (targets.length === 1) {
        seg.push({ side, a: start, b: targets[0], r });
        leaves.push({ side, p: targets[0], route: route.concat([targets[0]]) });
        return;
      }
      const c = V(0, 0, 0);
      for (const t of targets) c.add(t);
      c.multiplyScalar(1 / targets.length);
      const p = start.clone().lerp(c, targets.length > 8 ? 0.45 : 0.6);
      seg.push({ side, a: start, b: p, r });
      // 沿著變化最大的方向切成兩半
      const ext = ['x', 'y', 'z'].map((k) => Math.max(...targets.map((t) => t[k])) - Math.min(...targets.map((t) => t[k])));
      const ax = ['x', 'y', 'z'][ext.indexOf(Math.max(...ext))];
      const sorted = targets.slice().sort((a, b) => a[ax] - b[ax]);
      const h = Math.floor(sorted.length / 2);
      const rt = route.concat([p]);
      branch(side, p, sorted.slice(0, h), r * 0.78, rt);
      branch(side, p, sorted.slice(h), r * 0.78, rt);
    }
    for (const side of ['r', 'l']) {
      const g = lungG[side];
      g.updateMatrixWorld();
      const n = side === 'r' ? 48 : 40;                     // 左肺小一點
      const targets = Array.from({ length: n }, () => lungPoint(side));
      const aL = g.worldToLocal(carina.clone());
      // 主支氣管：先走到肺門（肺的內側中上方），右邊比較短、比較陡
      const hilum = V((side === 'r' ? 1 : -1) * Wd * 0.12, -H * (side === 'r' ? 0.3 : 0.34), 0);
      seg.push({ side, a: aL, b: hilum, r: 0.0075 });
      branch(side, hilum, targets, 0.0058, [aL.clone(), hilum.clone()]);
    }
    // 線段 → 圓柱（InstancedMesh，兩邊各一組，掛在各自的肺群組底下）
    const dummy = new Object3D();
    const up = V(0, 1, 0);
    for (const side of ['r', 'l']) {
      const list = seg.filter((s) => s.side === side);
      const im = new InstancedMesh(new CylinderGeometry(1, 1, 1, 8), airway, list.length);
      list.forEach((s, i) => {
        const d = s.b.clone().sub(s.a);
        dummy.position.copy(s.a).addScaledVector(d, 0.5);
        dummy.quaternion.setFromUnitVectors(up, d.clone().normalize());
        dummy.scale.set(s.r, d.length(), s.r);
        dummy.updateMatrix();
        im.setMatrixAt(i, dummy.matrix);
      });
      lungG[side].add(im);
      tree[side] = im;
      // 末端的肺泡：一串小葡萄
      const lv = leaves.filter((l) => l.side === side);
      const am = new InstancedMesh(new SphereGeometry(1, 10, 8), new MeshStandardMaterial({ color: 0xff9fb5, roughness: 0.5, transparent: true, opacity: 0.85 }), lv.length * 3);
      let k = 0;
      for (const l of lv) {
        for (let j = 0; j < 3; j++) {
          dummy.position.copy(l.p).add(V((Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012));
          dummy.quaternion.identity();
          const s = 0.0045 + Math.random() * 0.002;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          am.setMatrixAt(k++, dummy.matrix);
        }
      }
      lungG[side].add(am);
      if (side === 'r') alvMesh = [am]; else alvMesh.push(am);
    }
    // 氣流粒子：從脖子進來 → 隆凸 → 沿某條路到某個肺泡
    for (let i = 0; i < 90; i++) {
      const l = leaves[Math.floor(Math.random() * leaves.length)];
      paths.push({ side: l.side, route: l.route });
      air.push({ path: paths[i], off: Math.random() });
    }
    airCells = new InstancedMesh(new SphereGeometry(0.0065, 8, 6), new MeshStandardMaterial({ roughness: 0.3, emissive: 0x335577 }), air.length);
    airCells.renderOrder = 4;
    scene.add(airCells);

    // 鏡頭：正面稍偏右上
    J.target = V(cc.x, cc.y - cs.y * 0.02, cc.z);
    J.home = V(0.34, 0.16, 1.12);
    camera.position.copy(homePos());
    controls.target.copy(J.target);

    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    readout();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  function homePos() { return J.target.clone().add(J.home.clone().multiplyScalar(camera.aspect < 0.9 ? 1.3 : 1)); }

  // ---------------- 呼吸 ----------------
  // 一次呼吸：吸氣占 40%、吐氣占 60%，兩段都用平滑曲線
  function breathShape(p) {
    return p < 0.4 ? MathUtils.smootherstep(p / 0.4, 0, 1) : 1 - MathUtils.smootherstep((p - 0.4) / 0.6, 0, 1);
  }
  const dummy = new Object3D();
  const tmp = V(0, 0, 0), tmp2 = V(0, 0, 0);
  let lastB = 0, inhaling = true;
  function applyBreath(dt) {
    const b = state.b;
    inhaling = b > lastB + 1e-5 ? true : b < lastB - 1e-5 ? false : inhaling;
    lastB = b;
    // 肺：往下、往外長
    for (const side of ['r', 'l']) lungG[side].scale.set(1 + 0.05 * b, 1 + 0.09 * b, 1 + 0.07 * b);
    // 橫膈膜：收縮時變平、往下
    // 圓頂頂端跟著肺底往下（肺往下長 9%），同時壓平一點
    diaphragm.scale.y = J.cs.y * (0.18 - 0.05 * b);
    diaphragm.position.y = J.diaY0 - J.H * 0.09 * b + J.cs.y * 0.05 * b;
    // 肋骨：前端往上抬（提把），胸骨跟著往前往上
    for (const r of ribs) r.pivot.rotation.x = -r.amp * b;
    J.sternum.position.copy(J.sternum0).add(tmp.set(0, 0.008 * b, 0.012 * b));
    // 空氣粒子：吸氣時由外往內走，吐氣時由內往外走
    const col = new Color();
    for (let i = 0; i < air.length; i++) {
      const a = air[i];
      const f = MathUtils.clamp(b * 1.25 - a.off * 0.25, 0, 1);    // 0 = 在脖子、1 = 在肺泡
      const g = lungG[a.path.side];
      // 氣管那一段在世界座標；進入支氣管後用肺的局部座標轉成世界座標
      if (f < 0.25) tmp.copy(J.top).lerp(J.carina, f / 0.25);
      else {
        const r = a.path.route;
        const u = (f - 0.25) / 0.75 * (r.length - 1);
        const k = Math.min(r.length - 2, Math.floor(u));
        tmp.copy(r[k]).lerp(r[k + 1], u - k);
        g.localToWorld(tmp);
      }
      dummy.position.copy(tmp);
      const vis = b > 0.02 || !inhaling;
      const s = vis ? 1 : 0.001;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      airCells.setMatrixAt(i, dummy.matrix);
      airCells.setColorAt(i, inhaling ? AIR_IN : col.copy(AIR_IN).lerp(AIR_OUT, MathUtils.clamp(1.2 - f, 0, 1) * 0.9 + 0.1));
    }
    airCells.instanceMatrix.needsUpdate = true;
    if (airCells.instanceColor) airCells.instanceColor.needsUpdate = true;
    // 讀數
    const ph = R.phase;
    const key = state.holding ? (b >= 0.999 ? 'full' : 'in')
      : (state.playing && inhaling && b < 0.999) ? 'in'
      : b > 0.001 ? 'out' : 'rest';
    if (ph.dataset.k !== key) {
      ph.dataset.k = key;
      const T = {
        in: ['Breathing in', '吸氣', 'The diaphragm tightens and moves down, the ribs lift up and out, the chest gets bigger, and air rushes in.', '橫膈膜收縮往下移，肋骨往上往外抬，胸腔變大，空氣湧進來。'],
        out: ['Breathing out', '吐氣', 'The diaphragm relaxes and domes back up, the ribs drop, and the stretchy lungs spring back, pushing air out.', '橫膈膜放鬆、彈回圓頂，肋骨落下，有彈性的肺縮回去，把空氣擠出去。'],
        full: ['Lungs full', '吸飽了', 'The diaphragm is as low as it goes and the chest is as big as it gets. Let go to breathe out.', '橫膈膜降到最低，胸腔撐到最大。放開按鈕就吐氣。'],
        rest: ['Resting', '停在吐完', 'Hold the button to breathe in. Let go to breathe out.', '按住按鈕吸氣，放開就吐氣。'],
      }[key];
      ph.innerHTML = `${esc(T[0])}<small>${esc(T[1])}</small>`;
      R.phaseT.innerHTML = `${esc(T[2])}<span class="zh">${esc(T[3])}</span>`;
      root.classList.toggle('lu-in', key === 'in' || key === 'full');
      root.classList.toggle('lu-out', key === 'out');
    }
  }

  // ---------------- 讀數 ----------------
  const SRC = { sleep: ['Asleep', '睡覺時'], rest: ['Adult at rest', '成人安靜時'], child: ['Child at rest', '孩子安靜時'], run: ['Running', '跑步時'], you: ['Your breathing', '你的呼吸'] };
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  function readout() {
    R.bpm.textContent = String(Math.round(state.rate));
    const s = SRC[state.src];
    R.src.innerHTML = `${esc(s[0])}<small>${esc(s[1])}</small>`;
    // 跑步時每口也會變深；這裡用安靜時的 0.5 公升，數字偏保守
    R.lmin.textContent = (state.rate * TIDAL_L).toFixed(1);
    R.lday.textContent = fmt(state.rate * TIDAL_L * 1440);
    R.day.textContent = fmt(state.rate * 1440);
    root.querySelectorAll('[data-rate]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-rate') === state.src ? 'true' : 'false'));
  }

  // ---------------- 操作 ----------------
  const RATES = { sleep: 12, rest: 16, child: 20, run: 40 };
  root.querySelectorAll('[data-rate]').forEach((b) => b.addEventListener('click', () => {
    state.src = b.getAttribute('data-rate'); state.rate = RATES[state.src];
    setPlaying(true);
    readout();
  }));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  // 按住吸氣、放開吐氣：模型跟著你即時呼吸
  const holdOn = (e) => { e.preventDefault(); state.holding = true; setPlaying(false); R.hold.classList.add('on'); };
  const holdOff = () => { if (!state.holding) return; state.holding = false; R.hold.classList.remove('on'); };
  R.hold.addEventListener('pointerdown', holdOn);
  R.hold.addEventListener('pointerup', holdOff);
  R.hold.addEventListener('pointerleave', holdOff);
  R.hold.addEventListener('pointercancel', holdOff);
  R.hold.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) holdOn(e); });
  R.hold.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') holdOff(); });
  R.hold.addEventListener('contextmenu', (e) => e.preventDefault());

  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="ribs"]', (v) => { state.ribs = v; if (bones) for (const b of bones.values()) if (b.keep) b.mesh.visible = v; });
  bind('[data-t="airways"]', (v) => { state.airways = v; for (const s of ['r', 'l']) { tree[s].visible = v; } alvMesh.forEach((m) => { m.visible = v; }); trachea.visible = v; });
  bind('[data-t="heart"]', (v) => { state.heart = v; heart.visible = v; });
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), J.target); });

  // 數呼吸：30 秒內每吸一口氣就按一次，×2 就是每分鐘
  const MEASURE_S = 30;
  function startMeasure() {
    state.measuring = { t0: performance.now(), n: 0 };
    R.tapBox.classList.add('on');
    R.measure.hidden = true;
    R.tapN.textContent = '0';
    R.tapS.textContent = String(MEASURE_S);
    R.tapMsg.innerHTML = 'Breathe normally. Tap the button (or press the space bar) each time you breathe in.<span class="zh">正常呼吸，每吸一口氣就按一次（或空白鍵）。</span>';
  }
  function tapOnce() {
    if (!state.measuring) return;
    state.measuring.n += 1;
    R.tapN.textContent = String(state.measuring.n);
    R.tap.classList.remove('hit'); void R.tap.offsetWidth; R.tap.classList.add('hit');
  }
  function endMeasure() {
    const n = state.measuring.n;
    state.measuring = null;
    R.tapBox.classList.remove('on');
    R.measure.hidden = false;
    R.measure.querySelector('span').innerHTML = 'Count again<small>再數一次</small>';
    if (n < 3) { R.tapMsg.innerHTML = 'Only a few taps. Try again, tapping once for every breath in.<span class="zh">按的次數太少，再試一次，每吸一口就按一下。</span>'; return; }
    state.rate = MathUtils.clamp(n * 2, 6, 60); state.src = 'you';
    setPlaying(true);
    readout();
    R.tapMsg.innerHTML = `${n} breaths in 30 seconds × 2 = <b>${state.rate}</b> breaths a minute. The lungs in the model now breathe with you.`
      + `<span class="zh">30 秒 ${n} 次 × 2 ＝ 每分鐘 <b>${state.rate}</b> 次。模型裡的肺現在跟著你的節奏呼吸。</span>`;
  }
  R.measure.addEventListener('click', startMeasure);
  R.tap.addEventListener('pointerdown', (e) => { e.preventDefault(); tapOnce(); });
  R.tap.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); tapOnce(); } });
  document.addEventListener('keydown', (e) => {
    if (state.measuring && e.key === ' ' && document.activeElement !== R.tap) { e.preventDefault(); tapOnce(); }
  });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const L = {
    tr: lab.add('lu-lb', 'Trachea · 氣管'), br: lab.add('lu-lb', 'Bronchi · 支氣管'),
    rl: lab.add('lu-lb lu-lb-lung', 'Right lung · 右肺'), ll: lab.add('lu-lb lu-lb-lung', 'Left lung · 左肺'),
    dia: lab.add('lu-lb lu-lb-dia', 'Diaphragm · 橫膈膜'), rib: lab.add('lu-lb', 'Ribs · 肋骨'),
    ht: lab.add('lu-lb lu-lb-ht', 'Heart · 心臟'), alv: lab.add('lu-lb lu-lb-alv', 'Air sacs · 肺泡'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(L)) el.hidden = !on;
    if (!on) return;
    const { cc, cs } = J;
    lab.place(L.tr, J.top.clone().lerp(J.carina, 0.35).add(V(0.05, 0, 0.03)));
    lab.place(L.br, J.carina.clone().add(V(0.0, -0.025, 0.06)));
    lab.place(L.rl, lungG.r.localToWorld(V(-J.cs.x * 0.14, -J.H * 0.55, J.cs.z * 0.2)));
    lab.place(L.ll, lungG.l.localToWorld(V(J.cs.x * 0.14, -J.H * 0.55, J.cs.z * 0.2)));
    lab.place(L.dia, V(cc.x - cs.x * 0.22, diaphragm.position.y + diaphragm.scale.y * 0.9, cc.z + cs.z * 0.35));
    L.rib.hidden = !state.ribs;
    const rib = bones.get('l-rib-4').box.getCenter(tmp2);
    lab.place(L.rib, V(rib.x + cs.x * 0.33, rib.y, rib.z + cs.z * 0.25));
    L.ht.hidden = !state.heart;
    lab.place(L.ht, heart.position.clone().add(V(cs.x * 0.05, -cs.y * 0.05, cs.z * 0.25)));
    L.alv.hidden = !state.airways;
    lab.place(L.alv, lungG.l.localToWorld(V(J.cs.x * 0.2, -J.H * 0.85, 0)));
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

  let visible = false, raf = 0, last = 0;
  function step(dt) {
    if (state.holding) state.b = Math.min(1, state.b + dt / 1.8);
    else if (state.playing) {
      state.phase = (state.phase + dt * state.rate / 60) % 1;
      state.b = breathShape(state.phase);
    } else state.b = Math.max(0, state.b - dt / 2.4);
    if (!state.playing && !state.holding && state.b === 0) state.phase = 0;
    if (state.measuring) {
      const left = MEASURE_S - (performance.now() - state.measuring.t0) / 1000;
      R.tapS.textContent = String(Math.max(0, Math.ceil(left)));
      if (left <= 0) endMeasure();
    }
    if (state.ready) applyBreath(dt);
    alv.draw(dt, state.b);
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
  root.classList.add('is-playing');

  // 除錯用：$('[data-lungs-lab]').__lab；背景分頁 rAF 很慢時用 setB(0–1)／run(秒)／render()
  root.__lab = {
    camera, controls, state,
    setB: (b) => { state.playing = false; state.b = b; applyBreath(0); },
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, measure: startMeasure };
}

lazyBoot('[data-lungs-lab]', initLab, { measure: (lab) => lab.measure() });
