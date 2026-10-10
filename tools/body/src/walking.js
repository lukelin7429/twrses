/*
 * 人體探索 · 第二十五課「你是怎麼走路的？」的 3D 模型：把一步放慢來看。
 *
 * 真實的：整副骨架（skeleton.glb）。左腿（我們跟著看的那一條）染成金色。
 * 會動的結構：每條腿四層巢狀 pivot——髖（股骨頭）⊃ 膝 ⊃ 踝（距骨上方）⊃ 趾（五根蹠骨遠端的平均）；
 *   手臂各一個肩 pivot，擺動方向和同側的腿相反。繞 X 軸：髖屈曲、踝背屈、腳趾上翹是負角，膝屈曲是正角（臉朝 +Z）。
 * 步態（示意，不是真人的動作紀錄）：φ（0–1）是左腿的一個週期，右腿是 φ + 0.5。
 *   髖 22 cos(2πφ) + 6；膝＝站立期一個小彎（13°）＋擺盪期一個大彎（58°）；
 *   踝＝著地後微微蹠屈、站立中期背屈 10°、推出時蹠屈 20°；腳趾在腳跟離地時上翹 38°。
 *   站立期占 60%（φ < 0.6），所以每一步有兩小段「雙腳都在地上」。
 *   跑步：把站立期壓到 38%，角度加大，兩腿都不在站立期時加一段騰空。
 * 身體的高度不是寫死的：每一格擺好姿勢後，找六個腳底標記（左右腳的腳跟、前腳掌、腳尖）最低的一個，
 *   把整個身體移到它剛好碰到地板——所以身體的上下起伏是從骨頭的幾何「算」出來的。
 * 自繪：往後滑的地板、腳底壓力的橘色圓片、足弓下的金色彈簧、重量中心的黃球和它的軌跡。
 *
 * 步伐與腳印工具（initSteps）是 2D，不需要 WebGL；腳印只觀察、不判斷。
 * 產物：cd tools/body && npm run build → assets/js/walking.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  Float32BufferAttribute, Group, HemisphereLight, Line, LineBasicMaterial, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const RAD = Math.PI / 180, UP = V(0, 1, 0);
const wrap = (d) => d - Math.round(d);
const g = (x, m, s) => Math.exp(-0.5 * (wrap(x - m) / s) ** 2);
const sm = (a, b, x) => MathUtils.smoothstep(x, a, b);
const STANCE = { walk: 0.6, run: 0.38 };

// 一條腿在週期 phi 的四個關節角（度）
export function pose(phi, run) {
  let p = ((phi % 1) + 1) % 1;
  if (run) p = p < 0.38 ? p * (0.6 / 0.38) : 0.6 + (p - 0.38) * (0.4 / 0.62);
  const k = run ? 1.45 : 1;
  return {
    hip: (run ? 30 : 22) * Math.cos(2 * Math.PI * p) + (run ? 10 : 6),
    knee: 5 + (run ? 30 : 13) * g(p, 0.13, 0.07) + (run ? 95 : 58) * g(p, 0.72, 0.09),
    ankle: 2 - 6 * g(p, 0.07, 0.035) + 10 * k * g(p, 0.42, 0.1) - 20 * k * g(p, 0.63, 0.045),
    toe: 38 * g(p, 0.57, 0.05),
  };
}
export function phaseOf(phi, run) {
  const p = ((phi % 1) + 1) % 1, s = run ? 0.38 / 0.6 : 1;
  return p < 0.04 * s ? 0 : p < 0.14 * s ? 1 : p < 0.4 * s ? 2 : p < 0.52 * s ? 3 : p < 0.6 * s ? 4 : 5;
}

// ---------------- 步伐與腳印（2D） ----------------
function initSteps(root) {
  const box = root.querySelector('.wk-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const m = q('.wk-m'), n = q('.wk-n'), len = q('.wk-len'), smsg = q('.wk-smsg');
  function calc() {
    const d = parseFloat(m.value), c = parseFloat(n.value);
    let en, zh;
    if (!(d > 0) || !(c > 0)) { len.textContent = '—'; en = 'Walk a measured distance, count your steps, and type in the number.'; zh = '走一段量好的距離，數一數走了幾步，把數字填進來。'; }
    else {
      const cm = (d / c) * 100;
      len.textContent = cm.toFixed(0);
      if (cm < 15 || cm > 150) { en = 'Hmm, that does not look like a step. Check the distance and count again.'; zh = '嗯，這看起來不像一步的長度。再確認一次距離，重新數一次。'; }
      else {
        const km = Math.round(100000 / cm / 10) * 10;
        en = `At this step, one kilometer is about ${km.toLocaleString('en-US')} steps. Longer legs take longer steps, so compare with yourself: try again walking fast. Do your steps get longer, quicker, or both?`;
        zh = `照這個步伐，走一公里大約要 ${km.toLocaleString('en-US')} 步。腿長的人步伐本來就大，所以請和自己比：用快走再量一次。你的步伐是變長、變快，還是兩個都有？`;
      }
    }
    smsg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  m.addEventListener('input', calc); n.addEventListener('input', calc);
  const shapes = [...box.querySelectorAll('.wk-shape')], pmsg = q('.wk-pmsg');
  const MSG = {
    '': ['Wet one bare foot, step on dark paper, and tap the picture that looks most like your print.', '把一隻光腳沾濕，踩在深色的紙上，再點選最像你腳印的那一張圖。'],
    narrow: ['The middle of your print is narrow: there, your arch stays off the ground.', '你的腳印中間很窄：那裡的足弓沒有碰到地面。'],
    medium: ['The middle of your print is partly filled in: part of your arch touches the ground when you stand.', '你的腳印中間有一部分是印出來的：站著的時候，足弓有一部分碰到地面。'],
    wide: ['The middle of your print is wide: most of your sole touches the ground when you stand.', '你的腳印中間很寬：站著的時候，腳底大部分都碰到地面。'],
  };
  function print(k) {
    shapes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === k ? 'true' : 'false'));
    const t = MSG[k] || MSG[''], tail = k ? [' Footprints come in many shapes, and none of them is right or wrong. Try it again standing on your toes: what changes?', '腳印有很多種形狀，沒有哪一種是對的或錯的。踮起腳尖再印一次：有什麼不一樣？'] : ['', ''];
    pmsg.innerHTML = `${esc(t[0] + tail[0])}<span class="zh">${esc(t[1] + tail[1])}</span>`;
  }
  shapes.forEach((b) => b.addEventListener('click', () => print(b.getAttribute('aria-pressed') === 'true' ? '' : b.dataset.k)));
  calc(); print('');
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const tools = initSteps(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => tools && tools.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 40);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.25; controls.maxDistance = 8;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(3, 3, 2); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);
  const under = new DirectionalLight(0xffffff, 0.9); under.position.set(0.5, -3, 1); scene.add(under);

  let PHASES = [], RUN = null;
  try { PHASES = JSON.parse(root.getAttribute('data-phases') || '[]'); RUN = JSON.parse(root.getAttribute('data-run') || 'null'); } catch (e) { /* 留空 */ }
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), phEn: $('.wk-ph-en'), phZh: $('.wk-ph-zh'), cy: $('.wk-cycle'), cyM: $('.wk-cy-m'), cySt: $('.wk-cy-st'),
    nfeet: $('.wk-nfeet'), sole: $('.wk-sole'), status: $('.wk-status'), slider: $('.wk-slider'), play: $('.al-play'), playT: $('.al-play-t'),
    views: [...root.querySelectorAll('[data-view]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, phi: 0, playing: true, run: false, trail: true, view: 'body', dist: 0, hold: false, note: '' };
  const bodyG = new Group(); bodyG.visible = false; scene.add(bodyG);
  const J = {};                                       // 每邊的關節與標記
  const P = {}, A = {};
  let bones = null, floor = null, stripes = [], pressL = null, pressR = null, spring = null, ball = null, trailLine = null;
  const trail = [];

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    bodyG.add(model); model.updateMatrixWorld(true);
    const verts = (id) => worldVerts(bones.get(id).mesh);
    const C = (id) => bones.get(id).center.clone(), Bx = (id) => bones.get(id).box;
    const end = (id, dir) => { const vs = verts(id); let lo = Infinity, hi = -Infinity; for (const v of vs) { const d = v.dot(dir); lo = Math.min(lo, d); hi = Math.max(hi, d); } return average(vs.filter((v) => v.dot(dir) > hi - 0.12 * (hi - lo))); };
    const joint = (a, b) => { const dir = C(b).sub(C(a)).normalize(); return end(a, dir).add(end(b, dir.clone().negate())).multiplyScalar(0.5); };
    const pivot = (parent, p) => { const o = new Group(); o.position.copy(p); bodyG.add(o); bodyG.updateMatrixWorld(true); parent.attach(o); return o; };
    const mark = (parent, p) => { const o = new Object3D(); o.position.copy(p); bodyG.add(o); bodyG.updateMatrixWorld(true); parent.attach(o); return o; };
    for (const b of bones.values()) { const up = ['skull', 'chest', 'spine', 'shoulder', 'arm', 'hand'].includes(b.info.region); b.mat.opacity = up ? 0.5 : 0.95; b.mat.depthWrite = !up; }
    for (const s of ['r', 'l']) {
      const sgn = s === 'r' ? -1 : 1;
      const sh = pivot(bodyG, end(`${s}-humerus`, V(0, 1, 0)));
      const top = verts(`${s}-femur`).filter((v) => v.y > Bx(`${s}-femur`).max.y - 0.05), mx = average(top).x;
      const hip = pivot(bodyG, average(top.filter((v) => (sgn < 0 ? v.x > mx : v.x < mx))));
      const kn = pivot(hip, joint(`${s}-femur`, `${s}-tibia`));
      const tal = Bx(`${s}-talus`);
      const an = pivot(kn, V(C(`${s}-talus`).x, tal.max.y - 0.006, C(`${s}-talus`).z - 0.004));
      const heads = [1, 2, 3, 4, 5].map((i) => end(`${s}-mt${i}`, V(0, 0, 1)));
      const mtp = average(heads);
      const toe = pivot(an, V(mtp.x, mtp.y, mtp.z + 0.004));
      let footMin = Infinity, tipZ = -Infinity, big = null;
      for (const b of bones.values()) {
        const id = b.info.id; if (!id.startsWith(`${s}-`)) continue;
        if (id === `${s}-humerus` || id === `${s}-radius` || id === `${s}-ulna` || b.info.region === 'hand') sh.attach(b.mesh);
        else if (id === `${s}-femur`) hip.attach(b.mesh);
        else if ([`${s}-tibia`, `${s}-fibula`, `${s}-patella`].includes(id)) kn.attach(b.mesh);
        else if (b.info.region === 'foot') {
          footMin = Math.min(footMin, b.box.min.y);
          if (/-t\d-/.test(id)) { toe.attach(b.mesh); if (b.box.max.z > tipZ) { tipZ = b.box.max.z; big = b; } } else an.attach(b.mesh);
        }
        if (s === 'l' && (b.info.region === 'leg' || b.info.region === 'foot')) { b.mat.color.setHex(0xf2c458); b.mat.opacity = 1; }
      }
      const cal = Bx(`${s}-calcaneus`);
      const heel = mark(an, V(C(`${s}-calcaneus`).x, footMin, cal.min.z + 0.018));
      const ballM = mark(an, V(heads[0].x * 0.6 + heads[4].x * 0.4, footMin, mtp.z));
      const tip = mark(toe, V(big.center.x, footMin, tipZ - 0.006));
      J[s] = { sh, hip, kn, an, toe, heel, ball: ballM, tip, sgn };
      if (s === 'l') {
        A.heel = mark(an, C('l-calcaneus').add(V(0.03, 0.01, -0.02)));
        A.arch = mark(an, V(C('l-navicular').x + 0.02, footMin + 0.035, (cal.min.z + mtp.z) / 2 + 0.01));
        A.toe = mark(toe, V(big.center.x, big.center.y + 0.01, tipZ));
        A.knee = mark(kn, kn.getWorldPosition(V(0, 0, 0)));
        A.ankle = mark(an, an.getWorldPosition(V(0, 0, 0)).add(V(0.035, 0, 0)));
        P.foot = V(C('l-talus').x, 0.07, (cal.min.z + tipZ) / 2);
      }
    }
    // 重量的中心（示意）：骨盆上方
    const pel = [...bones.values()].filter((b) => b.info.region === 'pelvis').reduce((bx, b) => (bx ? bx.union(b.box) : b.box.clone()), null);
    const pc = pel.getCenter(V(0, 0, 0));
    ball = new Mesh(new SphereGeometry(0.03, 20, 14), new MeshBasicMaterial({ color: 0xffe14a, depthTest: false, transparent: true }));
    ball.position.set(0, pc.y + 0.06, pc.z); ball.renderOrder = 9; bodyG.add(ball);
    trailLine = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xffe14a, transparent: true, opacity: 0.75, depthTest: false }));
    trailLine.geometry.setAttribute('position', new Float32BufferAttribute(new Float32Array(160 * 3), 3));
    trailLine.renderOrder = 8; scene.add(trailLine);
    // 地板與條紋
    floor = new Mesh(new BoxGeometry(1.5, 0.02, 4.4), new MeshStandardMaterial({ color: 0x24324f, roughness: 0.9, transparent: true, opacity: 0.6, depthWrite: false }));
    floor.position.set(0, -0.012, 0); floor.renderOrder = 2; scene.add(floor);
    const sm2 = new MeshBasicMaterial({ color: 0x3b4d75, transparent: true, opacity: 0.8 });
    for (let i = 0; i < 12; i++) { const m = new Mesh(new BoxGeometry(1.5, 0.004, 0.03), sm2); scene.add(m); stripes.push(m); }
    const pm = () => new Mesh(new CircleGeometry(0.035, 28), new MeshBasicMaterial({ color: 0xff7a2a, transparent: true, opacity: 0.9, side: DoubleSide, depthTest: false }));
    pressL = pm(); pressR = pm(); pressR.material.color.setHex(0xa8623a);
    for (const m of [pressL, pressR]) { m.rotation.x = -Math.PI / 2; m.renderOrder = 7; scene.add(m); }
    spring = new Mesh(new CylinderGeometry(0.004, 0.004, 1, 8), new MeshBasicMaterial({ color: 0xf2c14a, depthTest: false, transparent: true }));
    spring.renderOrder = 8; scene.add(spring);

    P.body = { t: V(0, 0.9, 0), p: V(3.3, 0.35, 1.6) };
    camera.position.copy(P.body.p).multiplyScalar(fit()); controls.target.copy(P.body.t);
    bodyG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (0.85 - camera.aspect) * 1.1, 1, 1.5);

  // ---------------- 擺姿勢 ----------------
  const wa = V(0, 0, 0), wb = V(0, 0, 0), wc = V(0, 0, 0);
  function cop(j, phi) {                              // 腳底壓力的位置（世界座標）；不在站立期回傳 null
    const p = ((phi % 1) + 1) % 1, st = STANCE[state.run ? 'run' : 'walk'];
    if (p >= st) return null;
    const t = p / st;
    j.heel.getWorldPosition(wa); j.ball.getWorldPosition(wb); j.tip.getWorldPosition(wc);
    const out = t < 0.62 ? wa.clone().lerp(wb, sm(0.08, 0.62, t)) : wb.clone().lerp(wc, sm(0.62, 1, t));
    out.y = 0.004; return out;
  }
  function apply() {
    const phi = state.phi, run = state.run, st = STANCE[run ? 'run' : 'walk'];
    const pr = ((phi + 0.5) % 1);
    if (state.ready) {
      for (const [s, ph] of [['l', phi], ['r', pr]]) {
        const j = J[s], a = pose(ph, run);
        j.hip.rotation.x = -a.hip * RAD; j.kn.rotation.x = a.knee * RAD; j.an.rotation.x = -a.ankle * RAD; j.toe.rotation.x = -a.toe * RAD;
        j.sh.rotation.x = a.hip * RAD * (run ? 0.9 : 0.6);
      }
      bodyG.position.y = 0; bodyG.updateMatrixWorld(true);
      let lo = Infinity;
      for (const s of ['l', 'r']) for (const k of ['heel', 'ball', 'tip']) lo = Math.min(lo, J[s][k].getWorldPosition(wa).y);
      const air = run && phi % 0.5 >= st ? 0.07 * Math.sin((Math.PI * ((phi % 0.5) - st)) / (0.5 - st)) : 0;
      bodyG.position.y = -lo + air; bodyG.updateMatrixWorld(true);
      // 地板條紋往後滑
      const off = (state.dist % 0.36 + 0.36) % 0.36;
      stripes.forEach((m, i) => m.position.set(0, 0.001, 2 - i * 0.36 - off));
      const cl = cop(J.l, phi), cr2 = cop(J.r, pr);
      pressL.visible = !!cl; if (cl) pressL.position.copy(cl);
      pressR.visible = !!cr2; if (cr2) pressR.position.copy(cr2);
      // 足弓的彈簧：腳跟 → 前腳掌
      J.l.heel.getWorldPosition(wa); J.l.ball.getWorldPosition(wb);
      wa.y += 0.012; wb.y += 0.012;
      wc.copy(wb).sub(wa);
      spring.position.copy(wa).add(wb).multiplyScalar(0.5); spring.scale.set(1, wc.length(), 1); spring.quaternion.setFromUnitVectors(UP, wc.normalize());
      const load = phi < st ? Math.sin(Math.PI * (phi / st)) : 0;
      spring.material.color.setRGB(0.6 + 0.4 * load, 0.45 + 0.4 * load, 0.15 + 0.2 * load); spring.scale.x = spring.scale.z = 1 + 1.6 * load;
      floor.material.opacity = state.view === 'under' ? 0.22 : 0.6;
      trailLine.visible = state.trail; ball.visible = true;
    }
    // 文字
    const ph = phaseOf(phi, run), P0 = PHASES[ph];
    if (P0) { R.phEn.textContent = P0.en; R.phZh.textContent = P0.zh; }
    R.cySt.style.width = `${st * 100}%`; R.cyM.style.left = `${phi * 100}%`;
    R.nfeet.textContent = String((phi < st ? 1 : 0) + (pr < st ? 1 : 0));
    const nk = run ? 'run' : `p${ph}`;
    if (nk !== state.note) {
      state.note = nk;
      const t = run && RUN ? [RUN.en, RUN.zh] : P0 ? [P0.note_en, P0.note_zh] : ['', ''];
      R.status.innerHTML = `${esc(t[0])}<span class="zh">${esc(t[1])}</span>`;
      R.status.className = 'ey-status wk-status ey-ok';
    }
    drawSole(phi, st);
  }

  // ---------------- 左腳的腳底（2D） ----------------
  function drawSole(phi, st) {
    const c = R.sole; if (!c) return;
    const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d);
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const x = c.getContext('2d'); x.clearRect(0, 0, w, h);
    // 腳橫著畫：腳跟在左、腳趾在右
    const L = w * 0.82, x0 = w * 0.09, cy = h * 0.52, s = L / 110;
    const pt = (u, v) => [x0 + u * s, cy + v * s];
    x.fillStyle = 'rgba(238,228,207,.16)'; x.strokeStyle = 'rgba(238,228,207,.5)'; x.lineWidth = 1.5 * d;
    const blob = (u, v, rx, ry) => { const [a, b] = pt(u, v); x.beginPath(); x.ellipse(a, b, rx * s, ry * s, 0, 0, Math.PI * 2); x.fill(); x.stroke(); };
    blob(16, 0, 15, 14); blob(74, -1, 14, 18);
    x.beginPath(); let [a, b] = pt(24, -12); x.moveTo(a, b); [a, b] = pt(64, -17); x.lineTo(a, b); [a, b] = pt(64, 14); x.lineTo(a, b); [a, b] = pt(26, 12); x.quadraticCurveTo(...pt(44, 2), a, b); x.closePath(); x.fill(); x.stroke();
    [[98, -14, 6.5], [100, -3, 5.4], [99, 6, 5], [96, 14, 4.5], [92, 21, 4]].forEach(([u, v, rr]) => blob(u, v, rr, rr));
    if (phi < st) {
      const t = phi / st, u = t < 0.62 ? MathUtils.lerp(14, 74, sm(0.08, 0.62, t)) : MathUtils.lerp(74, 98, sm(0.62, 1, t)), v = t < 0.62 ? MathUtils.lerp(2, 0, t) : MathUtils.lerp(0, -13, sm(0.62, 1, t));
      const [px, py] = pt(u, v), gr = x.createRadialGradient(px, py, 0, px, py, 20 * s);
      gr.addColorStop(0, 'rgba(255,122,42,.95)'); gr.addColorStop(1, 'rgba(255,122,42,0)');
      x.fillStyle = gr; x.beginPath(); x.arc(px, py, 20 * s, 0, Math.PI * 2); x.fill();
    }
    x.fillStyle = 'rgba(255,255,255,.55)'; x.font = `${10 * d}px sans-serif`; x.textAlign = 'center';
    x.fillText('heel · 腳跟', ...pt(16, 30)); x.fillText('toes · 腳趾', ...pt(92, 36));
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${R.slider.value}%`);
  function setPlaying(on) { state.playing = on; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Play · 播放'; }
  function setPhi(p, pause = true) { state.phi = ((p % 1) + 1) % 1; R.slider.value = Math.round(state.phi * 100); fillSlider(); if (pause) setPlaying(false); apply(); }
  function setRun(v) { state.run = v; const el = $('[data-t="run"]'); if (el) el.checked = v; trail.length = 0; apply(); }
  function setView(k, jump = false) {
    if (!P.body) return;
    state.view = k; R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === k ? 'true' : 'false'));
    // 近看腳、從地板下面看：鏡頭對準左腳「現在」的位置，之後每一格跟著它走（step 裡的 follow）
    const an = J.l.an.getWorldPosition(V(0, 0, 0));
    const v = k === 'foot' ? { t: V(an.x, an.y - 0.02, an.z + 0.05), p: V(an.x + 0.95, an.y + 0.14, an.z + 0.27) }
      : k === 'under' ? { t: V(an.x, 0, an.z + 0.06), p: V(an.x + 0.33, -1.25, an.z + 0.36) } : P.body;
    const p = k === 'body' ? v.p.clone().multiplyScalar(fit()) : v.p.clone();
    prevAn.copy(an);
    if (jump) { camera.position.copy(p); controls.target.copy(v.t); fly.t = 1; } else flyTo(p, v.t);
  }
  R.slider.addEventListener('input', () => setPhi(R.slider.value / 100));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  R.views.forEach((b) => b.addEventListener('click', () => { if (state.ready) setView(b.dataset.view); }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="trail"]', (v) => { state.trail = v; });
  bind('[data-t="run"]', (v) => setRun(v));
  $('.al-home').addEventListener('click', () => { if (state.ready) setView(state.view); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  const prevAn = V(0, 0, 0), dAn = V(0, 0, 0);
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  setPlaying(true); fillSlider();

  // ---------------- 標籤 ----------------
  const Lb = {
    heel: lab.add('ey-lb', 'Heel bone · 跟骨'), arch: lab.add('ey-lb ey-lb-o', 'Arch: the spring · 足弓：彈簧'), toe: lab.add('ey-lb', 'Big toe · 大腳趾'),
    knee: lab.add('ey-lb', 'Knee · 膝蓋'), ankle: lab.add('ey-lb', 'Ankle · 腳踝'), ball: lab.add('ey-lb ey-lb-o', 'Middle of your weight · 重量的中心'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const wp = V(0, 0, 0);
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const near = state.view !== 'body';
    const at = (el, a, off, show) => { el.hidden = !show; if (show) lab.place(el, a.getWorldPosition(wp).add(off)); };
    at(Lb.heel, A.heel, V(0, 0.035, -0.09), near); at(Lb.arch, A.arch, V(0.02, -0.045, 0), near); at(Lb.toe, A.toe, V(0, 0.05, 0.07), near);
    at(Lb.ankle, A.ankle, V(0.03, 0.06, 0.02), near);
    at(Lb.knee, A.knee, V(0, 0.02, 0.2), !near);
    Lb.ball.hidden = near; if (!near) lab.place(Lb.ball, ball.getWorldPosition(wp).add(V(0.02, 0.1, 0.32)));
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
    if (state.playing) {
      const T = state.run ? 2.1 : 3.3;               // 放慢後一個週期的秒數
      state.phi = (state.phi + dt / T) % 1;
      state.dist += (dt / T) * (state.run ? 2.4 : 1.3);
      R.slider.value = Math.round(state.phi * 100); fillSlider();
    }
    apply();
    if (state.ready && dt > 0 && state.playing) {
      trail.unshift(ball.getWorldPosition(wp).y); if (trail.length > 160) trail.pop();
      const pos = trailLine.geometry.attributes.position, bz = ball.getWorldPosition(wp).z;
      for (let i = 0; i < 160; i++) pos.setXYZ(i, 0, trail[Math.min(i, trail.length - 1)] ?? 0, bz - i * 0.011);
      pos.needsUpdate = true; trailLine.geometry.setDrawRange(0, trail.length);
    }
    if (state.ready && state.view !== 'body') {       // 鏡頭跟著左腳
      J.l.an.getWorldPosition(dAn); const cur = dAn.clone(); dAn.sub(prevAn); prevAn.copy(cur);
      if (state.view === 'under') dAn.y = 0;
      if (fly.t < 1) { fly.p1.add(dAn); fly.t1.add(dAn); } else { camera.position.add(dAn); controls.target.add(dAn); }
    }
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
    if (state.ready) step(state.hold ? 0 : dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);
  apply();

  // 除錯用：$('[data-walking-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, P, J, setPhi, setPlaying, setRun, setView, pose, phaseOf, bodyG,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => tools && tools.scrollTo() };
}

lazyBoot('[data-walking-lab]', initLab, { test: (lab) => lab.test() });
