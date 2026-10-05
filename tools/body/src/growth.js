/*
 * 人體探索 · 第十六課「你是怎麼長高的？」的 3D 模型：看一條腿長大。
 *
 * 真實的：整副骨架（skeleton.glb）在左邊，站在一把尺旁邊，依年齡等比例縮放；
 *   右邊是放大 2.1 倍的右腿骨（股骨、髕骨、脛骨、腓骨的複製品，各有自己的材質），長度依年齡縮放、粗細縮得少一點。
 * 自繪示意：四片生長板（股骨近端在股骨頭下方、股骨遠端、脛骨近端、脛骨遠端）——比骨頭略寬的發亮圓盤，
 *   位置與半徑從真實骨頭的頂點切片算出來；小火花從生長板往「骨幹那一側」移動＝新的骨頭加在那裡。
 *   生長板厚度隨年齡變薄（14 歲起），17 歲閉合成一條細線。X 光畫面：背景全黑、骨頭變亮變透明、生長板是暗色縫隙。
 *
 * 身高 HT 是「一個舉例的孩子」（示意，不是標準，也不是預測）；股骨長＝身高 × 0.2735（模型的比例）。
 * 右欄「生長板裡面」是 2D canvas：軟骨細胞一疊一疊往下排，底下變成骨頭；速度跟著每年長高的公分數。
 *
 * 早晚身高與臂展（initMeasure）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/growth.js
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IVORY, average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const A0 = 2, A1 = 18, MAG = 2.1, FULL = 171.5, FEMUR = 0.2735;
// 一個舉例的孩子：2–18 歲每年的身高（公分）
const HT = [87, 95, 102, 109, 115, 121, 127, 132, 138, 144, 151, 158, 164, 168, 170, 171, 171.5];
const heightAt = (a) => { const x = MathUtils.clamp(a, A0, A1) - A0, i = Math.min(HT.length - 2, Math.floor(x)); return MathUtils.lerp(HT[i], HT[i + 1], x - i); };
const speedAt = (a) => { const lo = Math.max(A0, a - 0.5), hi = Math.min(A1, a + 0.5); return (heightAt(hi) - heightAt(lo)) / (hi - lo); };      // 公分／年
const openAt = (a) => 1 - MathUtils.smoothstep(a, 14, 17);      // 生長板還剩多少（1＝全開，0＝閉合）
const PLATE = new Color(0x4fe3d0), LINE = new Color(0xb9a98a), XBONE = new Color(0xe6f1ff), XGAP = new Color(0x04060c);

// ---------------- 早晚身高與臂展（2D） ----------------
function initMeasure(root) {
  const box = root.querySelector('.gw-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const am = q('.gw-am'), pm = q('.gw-pm'), span = q('.gw-span'), diff = q('.gw-diff'), msg = q('.gw-msg'), bA = q('.gw-bar-am i'), bP = q('.gw-bar-pm i'), ratio = q('.gw-ratio'), smsg = q('.gw-smsg'), fig = q('.gw-fig');
  const num = (el) => { const v = parseFloat(el.value); return v >= 50 && v <= 230 ? v : null; };
  function draw() {
    const a = num(am), p = num(pm), s = num(span);
    let en, zh, cls = '';
    if (a === null || p === null) { diff.textContent = '—'; en = 'Enter your morning and evening heights in centimeters, for example 132.4.'; zh = '輸入早上和晚上的身高（公分），例如 132.4。'; bA.style.height = '0%'; bP.style.height = '0%'; }
    else {
      const d = Math.round((a - p) * 10) / 10, lo = Math.min(a, p) - 3;
      bA.style.height = `${MathUtils.clamp(((a - lo) / 5) * 100, 4, 100)}%`; bP.style.height = `${MathUtils.clamp(((p - lo) / 5) * 100, 4, 100)}%`;
      diff.textContent = `${d > 0 ? '+' : ''}${d.toFixed(1)} cm`;
      if (d > 3) { en = 'That is a big difference. Measure again: same wall, no shoes, heels and head touching, book flat.'; zh = '差得有點多，再量一次：同一面牆、不穿鞋、腳跟和頭貼牆、書放平。'; cls = 'gw-warn'; }
      else if (d >= 0.3) { en = `You were ${d.toFixed(1)} cm taller in the morning. During the day, the discs in your spine were squeezed. Tonight they will fill out again.`; zh = `你早上高了 ${d.toFixed(1)} 公分。白天，脊椎裡的椎間盤被壓扁了；今晚它們又會恢復飽滿。`; cls = 'gw-ok'; }
      else if (d > -0.3) { en = 'Almost no difference. Did you measure right after getting up? The discs start to squeeze as soon as you stand.'; zh = '幾乎沒有差別。早上是一起床就量的嗎？你一站起來，椎間盤就開始被壓扁了。'; }
      else { en = 'Taller in the evening? That would be unusual. A small difference in how you stand can change the number, so try again tomorrow.'; zh = '晚上比較高？這不太常見。站姿差一點點，數字就會不同，明天再量一次看看。'; cls = 'gw-warn'; }
    }
    msg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`; msg.className = `gw-msg ${cls}`;
    const h = a !== null ? a : p;
    if (s === null || h === null) { ratio.textContent = '—'; fig.style.setProperty('--w', '100%'); smsg.innerHTML = 'Enter your arm span and at least one height.<span class="zh">輸入臂展，以及至少一個身高。</span>'; }
    else {
      const r = (s / h) * 100, dcm = Math.round((s - h) * 10) / 10;
      ratio.textContent = `${r.toFixed(0)}%`; fig.style.setProperty('--w', `${MathUtils.clamp(r, 70, 130)}%`);
      smsg.innerHTML = Math.abs(dcm) <= 3
        ? `Your arm span is ${Math.abs(dcm).toFixed(1)} cm ${dcm >= 0 ? 'more' : 'less'} than your height: almost the same!<span class="zh">你的臂展比身高${dcm >= 0 ? '多' : '少'} ${Math.abs(dcm).toFixed(1)} 公分：幾乎一樣！</span>`
        : `Your arm span is ${Math.abs(dcm).toFixed(1)} cm ${dcm >= 0 ? 'more' : 'less'} than your height. People are built in different ways, and both are fine.<span class="zh">你的臂展比身高${dcm >= 0 ? '多' : '少'} ${Math.abs(dcm).toFixed(1)} 公分。每個人的身材比例不一樣，都很正常。</span>`;
    }
  }
  for (const el of [am, pm, span]) el.addEventListener('input', draw);
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const tool = initMeasure(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => tool && tool.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const BG = new Color(0x0a1224);
  scene.background = BG.clone();
  const camera = new PerspectiveCamera(32, 1, 0.02, 40);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.3; controls.maxDistance = 9;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(2, 3, 4); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const NOTES = JSON.parse(root.getAttribute('data-notes') || '{}');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), age: $('.gw-age'), h: $('.gw-h'), femur: $('.gw-femur'), speed: $('.gw-speed'), status: $('.gw-status'),
    cells: $('.gw-cells'), slider: $('.gw-slider'), play: $('.al-play'), playT: $('.al-play-t'), xray: $('.gw-xray'), knee: $('.gw-knee'), jumps: [...root.querySelectorAll('[data-age]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, age: A0, playing: false, clock: 0, xray: false, knee: false, phase: 0 };
  let bones = null;
  const P = {};
  const bodyG = new Group(), rulerG = new Group(), legG = new Group(), legIn = new Group();
  bodyG.visible = false; rulerG.visible = false; legG.visible = false;      // 載入完、放好位置才顯示
  legG.add(legIn); scene.add(bodyG, rulerG, legG);
  const BX = -0.62, LX = 0.46;
  const legMats = [], plates = [], sparks = [];
  let marker = null, floor = null;
  const M = { spark: new MeshBasicMaterial({ color: 0xfff2a0 }), tick: new MeshBasicMaterial({ color: 0x9fb4d8 }), mark: new MeshBasicMaterial({ color: 0xffd36e }) };

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    bodyG.add(model); bodyG.position.set(BX, 0, 0);
    for (const b of bones.values()) { b.mat.opacity = 0.9; b.mat.transparent = true; }
    model.updateMatrixWorld(true);
    // ---------- 放大的右腿：複製股骨、髕骨、脛骨、腓骨 ----------
    const ids = ['r-femur', 'r-patella', 'r-tibia', 'r-fibula'];
    const fem = bones.get('r-femur'), tib = bones.get('r-tibia');
    const cx = (fem.center.x + tib.center.x) / 2, cz = (fem.center.z + tib.center.z) / 2, y0 = tib.box.min.y;
    P.legLen = fem.box.max.y - y0;
    legIn.position.set(-cx, -y0, -cz);
    for (const id of ids) {
      const src = bones.get(id).mesh, m = src.clone();
      m.material = new MeshStandardMaterial({ color: IVORY.clone(), roughness: 0.62, transparent: true, opacity: 0.96 });
      m.position.copy(src.getWorldPosition(V(0, 0, 0))).sub(bodyG.position); m.quaternion.copy(src.getWorldQuaternion(new Quaternion())); m.scale.copy(src.getWorldScale(V(0, 0, 0)));
      legIn.add(m); legMats.push(m.material);
    }
    // ---------- 生長板：從真實骨頭的頂點切片找中心與半徑 ----------
    const slice = (mesh, y, band = 0.007) => {
      const vs = worldVerts(mesh, (v) => Math.abs(v.y - y) < band).map((v) => v.sub(bodyG.position));
      const c = average(vs); c.y = y;
      let r = 0; for (const v of vs) r = Math.max(r, Math.hypot(v.x - c.x, v.z - c.z));
      return { c, r };
    };
    const addPlate = (name, c, r, normal, toShaft) => {
      const mat = new MeshStandardMaterial({ color: PLATE.clone(), emissive: PLATE.clone(), emissiveIntensity: 0.7, roughness: 0.4, transparent: true, opacity: 0.95, side: DoubleSide });
      const m = new Mesh(new CylinderGeometry(r * 1.07, r * 1.07, 1, 36), mat);
      m.position.copy(c); m.quaternion.setFromUnitVectors(V(0, 1, 0), normal.clone().normalize()); m.renderOrder = 3;
      legIn.add(m);
      const p = { name, m, mat, c: c.clone(), r: r * 1.07, n: normal.clone().normalize(), dir: toShaft.clone().normalize(), u: V(0, 0, 0), w: V(0, 0, 0) };
      p.u.copy(Math.abs(p.n.y) > 0.9 ? V(1, 0, 0) : V(0, 1, 0)).cross(p.n).normalize(); p.w.copy(p.n).cross(p.u).normalize();
      plates.push(p);
      for (let i = 0; i < 9; i++) { const s = new Mesh(new SphereGeometry(0.0038, 8, 6), M.spark); s.renderOrder = 5; legIn.add(s); sparks.push({ s, p, a: (i / 9) * Math.PI * 2 + plates.length, off: i / 9 }); }
      return p;
    };
    const fd = slice(fem.mesh, fem.box.min.y + 0.045), tp = slice(tib.mesh, tib.box.max.y - 0.03), td = slice(tib.mesh, tib.box.min.y + 0.03);
    addPlate('fd', fd.c, fd.r, V(0, 1, 0), V(0, 1, 0));
    addPlate('tp', tp.c, tp.r, V(0, 1, 0), V(0, -1, 0));
    addPlate('td', td.c, td.r, V(0, 1, 0), V(0, 1, 0));
    // 股骨頭：最上面、最靠身體中線的那一團頂點
    const top = worldVerts(fem.mesh, (v) => v.y > fem.box.max.y - 0.05).map((v) => v.sub(bodyG.position));
    const maxX = Math.max(...top.map((v) => v.x));
    const headC = average(top.filter((v) => v.x > maxX - 0.035));
    const neck = V(-0.78, -0.62, 0).normalize();                    // 從股骨頭往外下方（往大轉子、骨幹）
    addPlate('fp', headC.clone().addScaledVector(neck, 0.016), 0.024, neck, neck);
    P.knee = V((fd.c.x + tp.c.x) / 2, (fd.c.y + tp.c.y) / 2, (fd.c.z + tp.c.z) / 2);
    P.fd = fd.c.clone(); P.tp = tp.c.clone(); P.td = td.c.clone(); P.fp = headC.clone();
    P.femMid = fem.center.clone(); P.tibMid = tib.center.clone(); P.top = V(fem.center.x, fem.box.max.y, fem.center.z);
    legG.position.set(LX, 0.012, 0);

    // ---------- 尺 ----------
    const rx = BX - 0.36;
    const stick = new Mesh(new BoxGeometry(0.012, 1.85, 0.012), M.tick); stick.position.set(rx, 0.925, 0); rulerG.add(stick);
    for (let c = 0; c <= 180; c += 10) { const big = c % 50 === 0, t = new Mesh(new BoxGeometry(big ? 0.11 : 0.055, big ? 0.008 : 0.004, 0.006), M.tick); t.position.set(rx + (big ? 0.055 : 0.0275), c / 100, 0); rulerG.add(t); }
    marker = new Mesh(new BoxGeometry(0.62, 0.006, 0.006), M.mark); marker.position.set(rx + 0.31, 1, 0); rulerG.add(marker);
    floor = new Mesh(new BoxGeometry(2.3, 0.012, 0.7), new MeshStandardMaterial({ color: 0x1f2942, roughness: 1 })); floor.position.set(-0.12, -0.006, 0); scene.add(floor);
    P.rx = rx;

    P.target = V(-0.1, 0.95, 0); P.home = V(0.35, 0.12, 3.75);
    apply();
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    bodyG.visible = true; rulerG.visible = true; legG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.15 - camera.aspect) * 0.5, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }
  const legW = (v) => legIn.localToWorld(v.clone());      // 腿骨原本的座標 → 世界座標

  // ---------------- 依年齡更新 ----------------
  const tc = new Color();
  function apply() {
    const a = state.age, h = heightAt(a), k = h / FULL, kw = Math.pow(k, 0.82), open = openAt(a), x = state.xray;
    bodyG.scale.setScalar(k);
    legG.scale.set(MAG * kw, MAG * k, MAG * kw);
    legG.updateMatrixWorld(true);
    marker.position.y = 1.70 * k;                                   // 模型全高 1.70 公尺對應 171.5 公分
    for (const p of plates) {
      const t = MathUtils.lerp(0.0016, 0.011, open);                // 板的厚度（畫厚了）
      p.m.scale.set(1, t, 1);
      if (x) { p.mat.color.copy(XGAP).lerp(XBONE, 1 - open); p.mat.emissive.setHex(0x000000); p.mat.opacity = open > 0.02 ? 0.96 : 0.35; }
      else { p.mat.color.copy(LINE).lerp(PLATE, open); p.mat.emissive.copy(p.mat.color); p.mat.emissiveIntensity = 0.75 * open; p.mat.opacity = 0.95; }
    }
    for (const m of legMats) { m.color.copy(x ? XBONE : IVORY); m.opacity = x ? 0.5 : 0.96; m.emissive.setHex(x ? 0x5f7090 : 0x000000); m.depthWrite = !x; }
    if (bones) for (const b of bones.values()) { b.mat.color.copy(x ? XBONE : IVORY); b.mat.opacity = x ? 0.5 : 0.9; b.mat.emissive.setHex(x ? 0x5f7090 : 0x000000); b.mat.depthWrite = !x; }
    scene.background.copy(x ? tc.setHex(0x000000) : BG);
    floor.visible = !x;
    // 文字
    const sp = speedAt(a) * (open > 0 ? 1 : 0);
    R.age.textContent = String(Math.floor(a + 0.001));
    R.h.textContent = `${Math.round(h)} cm`; R.femur.textContent = `${(h * FEMUR).toFixed(1)} cm`; R.speed.textContent = sp < 0.3 ? '0' : `${sp.toFixed(1)} cm`;
    const key2 = open <= 0.02 ? 'closed' : open < 0.85 ? 'closing' : sp >= 6.4 && a > 9 ? 'fast' : 'steady';
    if (state.note !== key2) { state.note = key2; const n = NOTES[key2] || {}; R.status.innerHTML = `${esc(n.en || '')}<span class="zh">${esc(n.zh || '')}</span>`; R.status.className = `ey-status gw-status ${key2 === 'closed' ? '' : key2 === 'closing' ? 'ey-bad' : 'ey-ok'}`; }
    R.jumps.forEach((b) => b.setAttribute('aria-pressed', Math.abs(+b.dataset.age - a) < 0.05 ? 'true' : 'false'));
    state.h = h; state.open = open; state.speed = sp;
  }

  function sim(dt) {
    state.clock += dt;
    if (state.playing) {
      state.age = Math.min(A1, state.age + dt / 1.5);
      R.slider.value = state.age; fillSlider();
      if (state.age >= A1) setPlaying(false);
    }
    apply();
    const act = state.open * MathUtils.clamp(state.speed / 7, 0, 1.2);
    state.phase += dt * (0.25 + act * 0.9);
    for (const k of sparks) {
      const s = (state.phase * 0.6 + k.off) % 1, p = k.p;
      k.s.visible = !state.xray && act > 0.05 && k.off < 0.25 + act;
      if (!k.s.visible) continue;
      const ang = k.a + s * 0.6;
      k.s.position.copy(p.c).addScaledVector(p.u, Math.cos(ang) * p.r).addScaledVector(p.w, Math.sin(ang) * p.r).addScaledVector(p.dir, 0.006 + s * 0.05);
      k.s.scale.setScalar(Math.sin(Math.PI * s) * 1.2 + 0.1);
    }
    drawCells(dt);
  }

  // ---------------- 生長板裡面（2D） ----------------
  function drawCells() {
    const c = R.cells; if (!c) return;
    const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d);
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d'), open = state.open === undefined ? 1 : state.open, x = state.xray;
    const bone = x ? '#e6f1ff' : '#eee4cf', cart = x ? '#04060c' : '#1f7f78', cell = x ? '#1a2233' : '#7ff0e0';
    g.fillStyle = bone; g.fillRect(0, 0, w, h);
    // 骨頭的小孔（示意）
    g.fillStyle = x ? 'rgba(120,140,170,.35)' : 'rgba(170,150,110,.35)';
    for (let i = 0; i < 46; i++) { const px = ((i * 97) % 100) / 100 * w, py = ((i * 61) % 100) / 100 * h; g.beginPath(); g.ellipse(px, py, 3 * d, 2 * d, i, 0, Math.PI * 2); g.fill(); }
    const top = h * 0.2, band = h * 0.52 * open + (open > 0.02 ? 0 : 0);
    if (open <= 0.02) { g.strokeStyle = x ? '#aebcd2' : '#b9a98a'; g.lineWidth = 2 * d; g.beginPath(); g.moveTo(0, top + h * 0.26); g.lineTo(w, top + h * 0.26); g.stroke(); }
    else {
      const y0 = top + (h * 0.52 - band) / 2;
      g.fillStyle = cart; g.fillRect(0, y0, w, band);
      const cols = 9, rows = 7, ph = state.phase % 1;
      for (let i = 0; i < cols; i++) {
        const cxp = ((i + 0.5) / cols) * w;
        for (let j = -1; j < rows; j++) {
          const u = (j + ((ph + i * 0.37) % 1)) / rows;                 // 0＝骨端那一側（剛分裂），1＝骨幹那一側（變成骨頭）
          if (u < 0 || u > 1) continue;
          const yy = y0 + u * band, rx = (3 + 5 * u) * d * Math.min(1, band / (h * 0.3) + 0.3), ry = (1.6 + 4.6 * u) * d * Math.min(1, band / (h * 0.3) + 0.3);
          g.globalAlpha = u > 0.82 ? Math.max(0, (1 - u) / 0.18) : 1;
          g.fillStyle = u > 0.82 ? bone : cell; g.beginPath(); g.ellipse(cxp, yy, rx, ry, 0, 0, Math.PI * 2); g.fill();
        }
      }
      g.globalAlpha = 1;
    }
    g.font = `700 ${10.5 * d}px system-ui, sans-serif`; g.fillStyle = x ? '#0a1224' : '#5a4a2a'; g.textBaseline = 'middle';
    g.textAlign = 'left'; g.fillText('Bone end · 骨端', 6 * d, h * 0.09);
    g.fillText('Shaft: new bone · 骨幹：新的骨頭', 6 * d, h * 0.9);
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${((R.slider.value - A0) / (A1 - A0)) * 100}%`);
  function setPlaying(on) { state.playing = on; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Play · 播放'; }
  function setAge(a, pause = true) { state.age = MathUtils.clamp(a, A0, A1); R.slider.value = state.age; fillSlider(); if (pause) setPlaying(false); if (state.ready) apply(); }
  R.slider.addEventListener('input', () => setAge(+R.slider.value));
  R.play.addEventListener('click', () => { if (!state.playing && state.age >= A1 - 0.01) setAge(A0, false); setPlaying(!state.playing); });
  R.jumps.forEach((b) => b.addEventListener('click', () => setAge(+b.dataset.age)));
  function setXray(on) { state.xray = on; R.xray.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('gw-isxray', on); if (state.ready) apply(); }
  R.xray.addEventListener('click', () => setXray(!state.xray));
  function setKnee(on) {
    state.knee = on; R.knee.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!state.ready) return;
    if (on) { const kp = legW(P.knee); flyTo(kp.clone().add(V(0.25, 0.08, 1.05).multiplyScalar(fit())), kp); } else flyTo(homePos(), P.target);
  }
  R.knee.addEventListener('click', () => setKnee(!state.knee));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skel"]', (v) => { bodyG.visible = v; rulerG.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) setKnee(false); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  fillSlider();

  // ---------------- 標籤 ----------------
  const Lb = {
    fem: lab.add('ey-lb', 'Thighbone · 股骨'), tib: lab.add('ey-lb', 'Shinbone · 脛骨'),
    pk: lab.add('ey-lb gw-lb-p', ''), pa: lab.add('ey-lb gw-lb-p', ''), ph: lab.add('ey-lb gw-lb-p', ''),
    mag: lab.add('ey-lb ey-lb-o', 'Leg bones, magnified · 放大的腿骨'), ex: lab.add('ey-lb ey-lb-d', ''),
    r50: lab.add('ey-lb gw-lb-r', '50 cm'), r100: lab.add('ey-lb gw-lb-r', '100 cm'), r150: lab.add('ey-lb gw-lb-r', '150 cm'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;      // 模型載入前先藏起來
  let autoLabels = true, lbKey = '';
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const closed = state.open <= 0.02, k = closed ? 'c' : 'o';
    if (lbKey !== k) { lbKey = k; const t = closed ? 'Closed: a thin line · 閉合了：只剩一條線' : 'Growth plates · 生長板'; Lb.pk.innerHTML = t; Lb.pa.innerHTML = closed ? 'Closed · 閉合' : 'Growth plate · 生長板'; Lb.ph.innerHTML = closed ? 'Closed · 閉合' : 'Growth plate · 生長板'; }
    Lb.ex.innerHTML = `Example child: ${Math.round(state.h)} cm · 舉例的孩子`;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const kn = state.knee, sk = bodyG.visible;
    show(Lb.fem, true, legW(P.femMid).add(V(-0.2, 0, 0)));
    show(Lb.tib, true, legW(P.tibMid).add(V(-0.2, 0, 0)));
    show(Lb.pk, true, legW(P.knee).add(V(kn ? 0.16 : 0.27, 0, 0)));
    show(Lb.pa, !kn, legW(P.td).add(V(0.24, 0, 0)));
    show(Lb.ph, !kn, legW(P.fp).add(V(0.26, 0, 0)));
    show(Lb.mag, !kn, legW(P.top), -30);
    show(Lb.ex, !kn && sk, V(P.rx + 0.4, marker.position.y, 0), -14);
    show(Lb.r50, !kn && sk, V(P.rx - 0.07, 0.5, 0)); show(Lb.r100, !kn && sk, V(P.rx - 0.07, 1.0, 0)); show(Lb.r150, !kn && sk, V(P.rx - 0.07, 1.5, 0));
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
    } else if (state.knee) { const kp = legW(P.knee); controls.target.lerp(kp, 0.2); }      // 骨頭長高時，鏡頭跟著膝蓋
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

  // 除錯用：$('[data-growth-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停住
  root.__lab = {
    camera, controls, state, P, plates, heightAt, speedAt, openAt, setAge, setXray, setKnee, setPlaying,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => tool && tool.scrollTo() };
}

lazyBoot('[data-growth-lab]', initLab, { test: (lab) => lab.test() });
