/*
 * 人體探索 · 第十七課「聲音是怎麼發出來的？」的 3D 模型：空氣、嗡嗡聲、形狀。
 *
 * 真實的：頭骨與頸椎（skeleton.glb，和第十四課一樣用 clippingPlanes 從正中剖開、鏡頭從身體左邊看）、
 *   舌頭與氣管（organs.glb 的 tongue、trachea）。
 * 自繪示意：臉的輪廓（下半部跟著下巴轉、嘴唇會嘟起來或咬住）、喉頭的輪廓與會厭、側面看的聲帶、
 *   浮在脖子前方的「從上面看聲帶」放大圖（兩片聲帶在前端相連，呼吸時張開、發聲時合起來慢動作振動、音高越高拉得越長）、
 *   空氣粒子（聲帶以下淡藍；有聲時聲帶以上變黃，並擠成一口一口的）。
 *
 * 下頷骨掛在顳顎關節 pivot 上（rotation.x 正值＝張嘴），舌頭掛在下巴上再加自己的位移與傾斜。
 * 真正的舌頭每個音都會變形；這裡只移動、傾斜，是粗略的示意（頁面有註明）。
 * 五個嘴型 SHAPES：ah／ee／oo（母音）、s（sss↔zzz）、f（fff↔vvv）；「聲音」開關決定聲帶振不振動。
 *
 * 「聽聽看」是 WebAudio 合成的極簡來源—濾波器模型：鋸齒波（聲帶）→ 三個並聯帶通濾波器（共振峰，
 *   數值取自 Catford 2001 的男聲平均：i 240/2400、u 250/595、ɑ 750/940）；s、f 用濾過的雜訊。
 *   音量寫死很小（主增益 0.05），按一次最多響 5 秒。
 *
 * 嗡嗡聲檢查與一口氣碼表（initBuzz）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/voice.js
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, CircleGeometry, Color, DirectionalLight, DoubleSide, Group, HemisphereLight,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Plane, Scene, SphereGeometry, TorusGeometry,
  TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { average, labeler, lazyBoot, loadBones, loadOrgans, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
// 嘴型：jaw 下巴張開（弧度）、ty/tz 舌頭上下前後（公尺）、tilt 舌尖抬起（弧度）、round 嘴唇嘟起、bite 下唇咬上齒
const SHAPES = {
  ah: { jaw: 0.21, ty: -0.006, tz: -0.008, tilt: -0.04, round: 0, bite: 0, f: [750, 940, 2500], vowel: true },
  ee: { jaw: 0.035, ty: 0.006, tz: 0.006, tilt: 0.05, round: -0.3, bite: 0, f: [240, 2400, 3000], vowel: true },
  oo: { jaw: 0.06, ty: 0.005, tz: -0.011, tilt: -0.16, round: 1, bite: 0, f: [250, 595, 2400], vowel: true },
  s: { jaw: 0.025, ty: 0.003, tz: 0.006, tilt: 0.2, round: 0, bite: 0, f: [300, 1700, 2600], noise: [6500, 2.2, 1] },
  f: { jaw: 0.05, ty: 0, tz: 0, tilt: 0, round: 0, bite: 1, f: [300, 1300, 2500], noise: [3800, 0.7, 0.55] },
};
const hzOf = (p) => Math.round(90 * Math.pow(400 / 90, p));      // 音高滑桿 0–1 → 90–400 Hz

// ---------------- 嗡嗡聲檢查與一口氣碼表（2D） ----------------
function initBuzz(root) {
  const box = root.querySelector('.vc-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const rows = [...box.querySelectorAll('.vc-row')], score = q('.vc-score'), done = {};
  const INFO = {
    s: ['No buzz: “sss” is a voiceless sound. Your vocal folds are resting.', '沒有震動：sss 是「無聲」的音，聲帶在休息。'],
    z: ['Buzz! “zzz” is a voiced sound. Same mouth as “sss,” but the vocal folds are working.', '有震動！zzz 是「有聲」的音：嘴型和 sss 一樣，但聲帶在工作。'],
    f: ['No buzz: “fff” is voiceless. Only air is squeezing out.', '沒有震動：fff 是無聲的音，只有空氣擠出去。'],
    v: ['Buzz! “vvv” is voiced. Keep your lip on your teeth, and switch the voice on.', '有震動！vvv 是有聲的音：下唇保持碰著牙齒，把聲音打開。'],
  };
  rows.forEach((row) => {
    const k = row.dataset.sound, voiced = row.dataset.voiced === '1', msg = row.querySelector('.vc-fb');
    row.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      const ok = (b.dataset.a === '1') === voiced;
      row.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      row.classList.toggle('vc-right', ok); row.classList.toggle('vc-wrong', !ok);
      msg.innerHTML = ok ? `${esc(INFO[k][0])}<span class="zh">${esc(INFO[k][1])}</span>`
        : 'Try once more. Stretch the sound for three seconds, with your fingers resting lightly on your throat.<span class="zh">再試一次：把這個音拉長三秒，手指輕輕放在喉嚨上。</span>';
      done[k] = ok;
      const n = Object.values(done).filter(Boolean).length;
      score.innerHTML = n === 4 ? '<b>4 / 4</b> You can feel the difference between voiced and voiceless sounds!<span class="zh">你摸得出「有聲」和「無聲」的差別了！</span>' : `<b>${n} / 4</b><span class="zh">答對 ${n} 個</span>`;
    }));
  });
  // 碼表
  const btn = q('.vc-go'), out = q('.vc-sec'), list = q('.vc-tries'), best = q('.vc-best');
  let t0 = 0, timer = 0; const tries = [];
  const fmt = (s) => `${s.toFixed(1)} s`;
  function show() {
    list.innerHTML = tries.length ? tries.map((s, i) => `<li>${i + 1}. <b>${fmt(s)}</b></li>`).join('') : '';
    best.innerHTML = tries.length ? `Longest: <b>${fmt(Math.max(...tries))}</b>. Sitting up straight and starting with a big, slow breath both help.<span class="zh">最長：${Math.max(...tries).toFixed(1)} 秒。坐直、先慢慢吸一大口氣，都有幫助。</span>`
      : 'Take a breath, press Start, and say “ahh” until your air runs out. Then press Stop.<span class="zh">吸一口氣，按「開始」，說「啊——」直到沒氣為止，再按「停」。</span>';
  }
  btn.addEventListener('click', () => {
    if (!timer) {
      t0 = performance.now(); btn.setAttribute('aria-pressed', 'true'); btn.querySelector('span').innerHTML = 'Stop<small>停</small>';
      timer = setInterval(() => { out.textContent = fmt((performance.now() - t0) / 1000); }, 100);
    } else {
      clearInterval(timer); timer = 0;
      const s = (performance.now() - t0) / 1000;
      out.textContent = fmt(s); btn.setAttribute('aria-pressed', 'false'); btn.querySelector('span').innerHTML = 'Start<small>開始</small>';
      if (s >= 0.3) { tries.push(s); if (tries.length > 3) tries.shift(); }
      show();
    }
  });
  q('.vc-clear').addEventListener('click', () => { tries.length = 0; out.textContent = '0.0 s'; show(); });
  show();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), tries };
}

// ---------------- 合成聲音（WebAudio） ----------------
function makeSynth() {
  let ctx = null, N = null, stopAt = 0;
  function build() {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    ctx = new AC();
    const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    const gV = ctx.createGain(); gV.gain.value = 0; osc.connect(gV);
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
    const gW = ctx.createGain(); gW.gain.value = 0; noise.connect(gW);          // 氣音：雜訊也走共振峰
    const fs = [0, 1, 2].map((i) => { const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = [9, 11, 12][i]; const g = ctx.createGain(); g.gain.value = [1, 0.6, 0.3][i]; gV.connect(f); gW.connect(f); f.connect(g); g.connect(master); return f; });
    const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; const gN = ctx.createGain(); gN.gain.value = 0; noise.connect(nf); nf.connect(gN); gN.connect(master);   // s、f 的嘶嘶聲
    osc.start(); noise.start();
    N = { master, osc, gV, gW, fs, nf, gN };
    return true;
  }
  return {
    get on() { return !!ctx && ctx.currentTime < stopAt; },
    start() { if (!ctx && !build()) return false; if (ctx.state === 'suspended') ctx.resume(); stopAt = ctx.currentTime + 5; return true; },
    stop() { if (ctx) { stopAt = 0; N.master.gain.setTargetAtTime(0, ctx.currentTime, 0.03); } },
    update(sh, voiced, hz, loud) {
      if (!ctx) return;
      const t = ctx.currentTime, on = t < stopAt, k = 0.03;
      N.master.gain.setTargetAtTime(on ? 0.05 * (0.35 + 0.65 * loud) : 0, t, k);
      N.osc.frequency.setTargetAtTime(hz, t, k);
      sh.f.forEach((f, i) => N.fs[i].frequency.setTargetAtTime(f, t, k));
      N.gV.gain.setTargetAtTime(voiced ? (sh.vowel ? 1 : 0.5) : 0, t, k);
      N.gW.gain.setTargetAtTime(!voiced && sh.vowel ? 0.5 : 0, t, k);
      if (sh.noise) { N.nf.frequency.setTargetAtTime(sh.noise[0], t, k); N.nf.Q.setTargetAtTime(sh.noise[1], t, k); N.gN.gain.setTargetAtTime(sh.noise[2] * (voiced ? 0.6 : 1), t, k); } else N.gN.gain.setTargetAtTime(0, t, k);
    },
  };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const buzz = initBuzz(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => buzz && buzz.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.localClippingEnabled = true;
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.08; controls.maxDistance = 3;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(3, 2.5, 1.5); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(1, 1.5, -2.5); scene.add(rim);

  const SH = JSON.parse(root.getAttribute('data-shapes') || '[]');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), say: $('.vc-say'), hz: $('.vc-hz'), status: $('.vc-status'), voice: $('.vc-voice'), pitch: $('.vc-pitch'), loud: $('.vc-loud'),
    listen: $('.vc-listen'), zoom: $('.vc-zoom'), shapes: [...root.querySelectorAll('[data-shape]')], s1: $('.vc-s1'), s2: $('.vc-s2'), s3: $('.vc-s3'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, shape: 'ah', voiced: true, pitch: 0.55, loud: 0.6, zoom: false, clock: 0, cur: { ...SHAPES.ah }, open: 0.02 };
  const synth = makeSynth();
  let bones = null;
  const P = {};
  const CUT = new Plane(V(-1, 0, 0), -0.003);
  const M = {
    skin: new MeshBasicMaterial({ color: 0xf2c7a8, transparent: true, opacity: 0.75 }),
    soft: new MeshStandardMaterial({ color: 0xe58a8a, roughness: 0.6 }),
    cart: new MeshBasicMaterial({ color: 0xcfe0f2, transparent: true, opacity: 0.7 }),
    fold: new MeshStandardMaterial({ color: 0xf6e9dc, roughness: 0.45, emissive: 0x4a3a20, emissiveIntensity: 0.3 }),
    air: new MeshBasicMaterial({ color: 0x9fd8ff }), buzz: new MeshBasicMaterial({ color: 0xffe066 }), hiss: new MeshBasicMaterial({ color: 0xffffff }),
  };
  const head = new Group(), face = new Group(), topG = new Group();
  head.visible = false; face.visible = false; topG.visible = false;      // 載入完、放好位置才顯示
  scene.add(head, face, topG);
  const tube = (curve, r, mat, seg = 40, parent = head, rs = 8) => { const m = new Mesh(new TubeGeometry(curve, seg, r, rs, false), mat); parent.add(m); return m; };
  const ball = (r, mat, parent = head, seg = 10) => { const m = new Mesh(new SphereGeometry(r, seg, Math.max(6, seg - 2)), mat); parent.add(m); return m; };
  const air = [];
  let jawPivot = null, tonguePivot = null, profile = null, sideFold = null, path = null;
  const folds = [];
  const PROF_TOP = [[0.150, 1.725], [0.178, 1.700], [0.186, 1.665], [0.188, 1.630], [0.186, 1.610], [0.184, 1.598], [0.196, 1.580], [0.210, 1.565], [0.219, 1.553], [0.212, 1.545], [0.200, 1.542], [0.199, 1.534]];
  const UPPER = [0.203, 1.527], MOUTH_U = [0.198, 1.5225], MOUTH_L = [0.198, 1.5195], LOWER = [0.201, 1.514];
  const PROF_JAW = [[0.193, 1.505], [0.192, 1.495], [0.188, 1.484], [0.172, 1.474], [0.140, 1.470]], PROF_NECK = [[0.124, 1.462], [0.127, 1.448], [0.121, 1.43], [0.118, 1.40], [0.116, 1.37]];

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones;
    scene.add(sk.model); scene.add(og.model);
    for (const b of bones.values()) {
      const isHead = b.info.region === 'skull' || /^c[1-7]$/.test(b.info.id) || b.info.id === 't1';
      b.mesh.visible = isHead && b.info.id !== 'vomer';
      b.mat.opacity = 0.5; b.mat.side = DoubleSide; b.mat.clippingPlanes = [CUT]; b.mat.color.setHex(0xe6dcc6);
    }
    for (const [n, part] of og.parts) part.mesh.visible = n === 'tongue' || n === 'trachea';
    const tg = og.parts.get('tongue'), tr = og.parts.get('trachea');
    tg.mat.color.setHex(0xe9788a); tg.mat.roughness = 0.55;
    tr.mat.color.setHex(0xdfe9f5); tr.mat.transparent = true; tr.mat.opacity = 0.42; tr.mat.depthWrite = false; tr.mat.side = DoubleSide; tr.mesh.renderOrder = 2;
    // 下巴：下頷骨掛在顳顎關節上；舌頭掛在下巴上
    const mb = bones.get('mandible').box;
    jawPivot = new Group(); jawPivot.position.set(0, mb.max.y - 0.008, mb.min.z + 0.008); scene.add(jawPivot); jawPivot.updateMatrixWorld(true);
    jawPivot.attach(bones.get('mandible').mesh);
    tonguePivot = new Group(); tonguePivot.position.set(0, tg.box.min.y + 0.006, tg.box.min.z + 0.004); jawPivot.add(tonguePivot);
    tonguePivot.position.sub(jawPivot.position); tonguePivot.updateMatrixWorld(true);
    tonguePivot.attach(tg.mesh);
    P.tongue = tg.center.clone();
    // 軟顎、咽後壁
    const hp = bones.get('r-palatine').box;
    const pb = V(-0.002, hp.min.y + 0.003, hp.min.z + 0.002);
    tube(cr([pb, pb.clone().add(V(0, -0.003, -0.004)), pb.clone().add(V(0, -0.009, -0.0055)), pb.clone().add(V(0, -0.014, -0.005))]), 0.002, M.soft, 24);
    tube(cr([V(0, 1.585, 0.098), V(0, 1.565, 0.092), V(0, 1.53, 0.091), V(0, 1.47, 0.093), V(0, 1.42, 0.086)]), 0.0008, M.skin, 40, face, 6);
    // 氣管中心線：把真實氣管的頂點依高度切片取平均
    const tv = worldVerts(tr.mesh);
    const cen = (y) => { const c = average(tv.filter((v) => Math.abs(v.y - y) < 0.008)); c.x = -0.001; c.y = y; return c; };
    const y0 = tr.box.min.y + 0.01, y1 = tr.box.max.y - 0.006;
    const tPts = [0, 0.33, 0.66, 1].map((k) => cen(MathUtils.lerp(y0, y1, k)));
    // 喉頭（自繪）：聲帶在氣管頂端上方，會厭在舌根後面
    const top = tPts[3];
    P.glottis = V(-0.001, tr.box.max.y + 0.014, top.z + 0.006);
    sideFold = new Mesh(new BoxGeometry(0.004, 0.0022, 0.02), M.fold); sideFold.position.copy(P.glottis); head.add(sideFold);
    tube(cr([V(0, tr.box.max.y + 0.03, top.z + 0.02), V(0, tr.box.max.y + 0.02, top.z + 0.027), V(0, tr.box.max.y + 0.008, top.z + 0.022), V(0, tr.box.max.y - 0.002, top.z + 0.016)]), 0.0011, M.cart, 24);   // 甲狀軟骨前緣（喉結）
    tube(cr([V(0, tr.box.max.y + 0.026, top.z + 0.012), V(0, tr.box.max.y + 0.038, top.z + 0.006), V(0, tr.box.max.y + 0.047, top.z + 0.001)]), 0.0014, M.cart, 16);                                      // 會厭
    P.larynx = V(0, tr.box.max.y + 0.018, top.z + 0.03); P.trachea = tPts[1].clone();
    // 空氣的路：氣管 → 聲帶 → 咽 → 舌頭上方 → 嘴唇外面
    path = cr([...tPts, P.glottis.clone(), V(-0.001, 1.505, 0.0975), V(-0.001, 1.528, 0.097), V(-0.001, 1.5425, 0.108), V(-0.001, 1.5435, 0.135), V(-0.001, 1.538, 0.165), V(-0.001, 1.5215, 0.2), V(-0.001, 1.519, 0.26)]);
    // 找出聲帶在這條路上的位置
    let best = 9; for (let i = 0; i <= 200; i++) { const d = path.getPointAt(i / 200).distanceTo(P.glottis); if (d < best) { best = d; P.uG = i / 200; } }
    P.uLips = 0.86;
    let s = 3; const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
    for (let i = 0; i < 46; i++) { const m = ball(0.0012, M.air); m.renderOrder = 6; air.push({ m, u: i / 46, jit: V(0, rnd() - 0.5, rnd() - 0.5).multiplyScalar(0.004), rank: rnd() }); }
    buildProfile(); buildTop();
    P.target = V(0, 1.535, 0.168); P.home = V(0.66, 0.04, 0.04);
    P.lips = V(0, 1.521, 0.2);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    head.visible = true; face.visible = true; topG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.15 - camera.aspect) * 0.45, 1, 1.45);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 臉的輪廓：下半部跟著下巴轉，嘴唇會動 ----------------
  const tv2 = V(0, 0, 0);
  function buildProfile() {
    const c = state.cur, jp = jawPivot.position, pts = [];
    const rot = ([z, y]) => { tv2.set(0, y - jp.y, z - jp.z).applyAxisAngle(V(1, 0, 0), c.jaw); return V(0, tv2.y + jp.y, tv2.z + jp.z); };
    for (const [z, y] of PROF_TOP) pts.push(V(0, y, z));
    const r = Math.max(0, c.round) * 0.007 - Math.max(0, -c.round) * 0.002;
    pts.push(V(0, UPPER[1], UPPER[0] + r), V(0, MOUTH_U[1], MOUTH_U[0] + r * 0.6));
    const ml = rot(MOUTH_L), lo = rot(LOWER);
    ml.z += r * 0.6; lo.z += r;
    if (c.bite > 0) { lo.y += 0.0065 * c.bite; lo.z -= 0.006 * c.bite; ml.y += 0.003 * c.bite; ml.z -= 0.004 * c.bite; }
    pts.push(ml, lo);
    for (const p of PROF_JAW) pts.push(rot(p));
    for (const [z, y] of PROF_NECK) pts.push(V(0, y, z));
    const geo = new TubeGeometry(cr(pts), 150, 0.0009, 6, false);
    if (profile) { profile.geometry.dispose(); profile.geometry = geo; } else { profile = new Mesh(geo, M.skin); face.add(profile); }
    P.lips = V(0, (MOUTH_U[1] + ml.y) / 2, MOUTH_U[0] + r * 0.6);
  }

  // ---------------- 從上面看聲帶（浮在脖子前方） ----------------
  function buildTop() {
    const o = V(0, 1.44, 0.262);
    topG.position.copy(o);
    const disc = new Mesh(new CircleGeometry(0.034, 40), new MeshBasicMaterial({ color: 0x1b0f18 })); disc.rotation.y = Math.PI / 2; disc.position.x = -0.004; topG.add(disc);
    const ring = new Mesh(new TorusGeometry(0.034, 0.0035, 12, 48), new MeshStandardMaterial({ color: 0xcfe0f2, roughness: 0.5 })); ring.rotation.y = Math.PI / 2; topG.add(ring);
    const wind = new Mesh(new CircleGeometry(0.02, 32), new MeshBasicMaterial({ color: 0x3a1420 })); wind.rotation.y = Math.PI / 2; wind.position.set(-0.003, -0.004, 0); topG.add(wind);
    for (const sgn of [-1, 1]) {
      const g = new Group(); g.position.set(0, 0.024, 0); topG.add(g);
      const m = new Mesh(new BoxGeometry(0.005, 0.044, 0.0085), M.fold); m.position.set(0, -0.022, sgn * 0.0045); g.add(m);
      const tip = ball(0.0052, new MeshStandardMaterial({ color: 0xe8c9b8, roughness: 0.6 }), g, 12); tip.position.set(0, -0.045, sgn * 0.0045);
      folds.push({ g, m, tip, sgn });
    }
    P.top = o.clone(); P.topFront = o.clone().add(V(0, 0.046, 0)); P.topBack = o.clone().add(V(0, -0.05, 0)); P.topTitle = o.clone().add(V(0, 0.05, 0));
    P.topFold = o.clone().add(V(0, 0, 0.03));
  }

  // ---------------- 模擬 ----------------
  const tp = V(0, 0, 0);
  let lastKey = '';
  function sim(dt) {
    state.clock += dt;
    const c = state.cur, T = SHAPES[state.shape], k = dt ? 1 - Math.exp(-dt * 9) : 1;
    let moved = false;
    for (const key of ['jaw', 'ty', 'tz', 'tilt', 'round', 'bite']) { const d = T[key] - c[key]; if (Math.abs(d) > 1e-5) { c[key] += d * k; moved = true; } }
    if (moved || dt === 0) {
      jawPivot.rotation.x = c.jaw;
      tonguePivot.position.set(0, tonguePivot.userData.y0 + c.ty, tonguePivot.userData.z0 + c.tz);
      tonguePivot.rotation.x = -c.tilt;
      buildProfile();
    }
    // 聲帶：呼吸（無聲）時張開；有聲時合起來振動（慢動作）
    const hz = hzOf(state.pitch), slow = 2.2 + state.pitch * 5;
    const target = state.voiced ? 0.03 : 0.34;
    state.open += (target - state.open) * k;
    const vib = state.voiced ? 0.045 * (0.5 + 0.5 * Math.sin(state.clock * Math.PI * 2 * slow)) * (0.5 + 0.5 * state.loud) : 0;
    const stretch = 0.86 + 0.34 * state.pitch;
    for (const f of folds) { f.g.rotation.x = -f.sgn * (state.open + vib); f.g.scale.set(1, stretch, 1 / Math.sqrt(stretch)); }
    sideFold.scale.set(1, state.voiced ? 1 + 0.5 * Math.sin(state.clock * Math.PI * 2 * slow) : 0.5, stretch);
    M.fold.emissiveIntensity = state.voiced ? 0.35 + 0.35 * Math.sin(state.clock * Math.PI * 2 * slow) : 0.15;
    // 空氣
    const sp = 0.1 + 0.22 * state.loud, noisy = !T.vowel, uN = state.shape === 'f' ? 0.855 : 0.8;
    for (const a of air) {
      a.u = (a.u + dt * sp) % 1;
      a.m.visible = a.rank < 0.45 + 0.55 * state.loud;
      if (!a.m.visible) continue;
      let u = a.u; const above = u > P.uG;
      if (above && state.voiced) u = MathUtils.clamp(u + 0.014 * Math.sin((a.u * 16 - state.clock * slow) * Math.PI * 2), P.uG, 0.999);      // 擠成一口一口的
      path.getPointAt(u, tp);
      const wide = u > 0.93 ? 2.2 : u > P.uG && u < 0.6 ? 0.7 : 0.5;
      const hiss = noisy && u > uN;
      const j = hiss ? 2.2 + Math.sin(state.clock * 40 + a.rank * 30) : 1;
      a.m.position.set(tp.x, tp.y + a.jit.y * wide * j, tp.z + a.jit.z * 0.4 * j);
      a.m.material = hiss ? M.hiss : above && state.voiced ? M.buzz : M.air;
      a.m.scale.setScalar(u > 0.93 ? Math.max(0.05, (1 - u) / 0.07) : 1);
    }
    // 文字
    const info = SH.find((x) => x.key === state.shape) || {};
    const key2 = `${state.shape}|${state.voiced}`;
    if (key2 !== lastKey) {
      lastKey = key2;
      R.say.textContent = state.voiced ? info.on : info.off;
      const v = T.vowel
        ? (state.voiced ? ['Voice on: the vocal folds are closed and buzzing.', '聲音打開：聲帶合起來，正在振動。'] : ['Voice off: the vocal folds are open, so this is only a whisper.', '聲音關掉：聲帶張開，所以只剩氣音。'])
        : (state.voiced ? ['Voice on: a hiss and a buzz together.', '聲音打開：嘶嘶聲加上嗡嗡聲。'] : ['Voice off: only the hiss of air.', '聲音關掉：只有空氣的嘶嘶聲。']);
      R.status.innerHTML = `${esc(info.text_en || '')} ${esc(v[0])}<span class="zh">${esc(info.text_zh || '')}${esc(v[1])}</span>`;
      R.status.className = `ey-status vc-status ${state.voiced ? 'ey-ok' : ''}`;
      R.s2.classList.toggle('vc-off', !state.voiced);
    }
    R.hz.textContent = state.voiced ? `${hz} Hz` : '—';
    synth.update(T, state.voiced, hz, state.loud);
    if (R.listen.getAttribute('aria-pressed') === 'true' && !synth.on) R.listen.setAttribute('aria-pressed', 'false');
  }

  // ---------------- 操作 ----------------
  function setShape(kname) { if (!SHAPES[kname]) return; state.shape = kname; R.shapes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.shape === kname ? 'true' : 'false')); }
  function setVoiced(on) { state.voiced = !!on; R.voice.setAttribute('aria-pressed', on ? 'true' : 'false'); R.voice.querySelector('span').innerHTML = on ? 'Voice: ON<small>聲音：開</small>' : 'Voice: OFF<small>聲音：關</small>'; }
  const fillS = (el) => el.style.setProperty('--p', `${el.value}%`);
  R.shapes.forEach((b) => b.addEventListener('click', () => setShape(b.dataset.shape)));
  R.voice.addEventListener('click', () => setVoiced(!state.voiced));
  R.pitch.addEventListener('input', () => { state.pitch = R.pitch.value / 100; fillS(R.pitch); });
  R.loud.addEventListener('input', () => { state.loud = R.loud.value / 100; fillS(R.loud); });
  fillS(R.pitch); fillS(R.loud);
  R.listen.addEventListener('click', () => {
    if (synth.on) { synth.stop(); R.listen.setAttribute('aria-pressed', 'false'); return; }
    if (synth.start()) R.listen.setAttribute('aria-pressed', 'true');
  });
  function setZoom(on) {
    state.zoom = on; R.zoom.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!state.ready) return;
    if (on) flyTo(P.top.clone().add(V(0.3, 0, 0).multiplyScalar(fit())), P.top); else flyTo(homePos(), P.target);
  }
  R.zoom.addEventListener('click', () => setZoom(!state.zoom));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skull"]', (v) => { if (bones) for (const b of bones.values()) if ((b.info.region === 'skull' || /^c[1-7]$/.test(b.info.id) || b.info.id === 't1') && b.info.id !== 'vomer') b.mesh.visible = v; });
  bind('[data-t="face"]', (v) => { face.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) setZoom(false); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    tongue: lab.add('ey-lb ey-lb-m', 'Tongue · 舌頭'), lips: lab.add('ey-lb', 'Lips · 嘴唇'), jaw: lab.add('ey-lb', 'Jaw · 下巴'),
    box: lab.add('ey-lb ey-lb-d', 'Voice box · 喉頭'), tr: lab.add('ey-lb', 'Windpipe · 氣管'),
    s1: lab.add('ey-lb vc-lb-a', '1 Air · 空氣'), s2: lab.add('ey-lb vc-lb-b', '2 Buzz · 嗡嗡聲'), s3: lab.add('ey-lb vc-lb-s', '3 Shape · 形狀'),
    tT: lab.add('ey-lb ey-lb-o', 'Vocal folds, seen from above · 從上面看聲帶'), tF: lab.add('ey-lb', 'Front of the neck · 脖子前面'), tB: lab.add('ey-lb', 'Back · 後面'),
    tV: lab.add('ey-lb ey-lb-d', ''),
  };
  for (const el of Object.values(Lb)) el.hidden = true;      // 模型載入前先藏起來
  let autoLabels = true, lbV = null;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    if (lbV !== state.voiced) { lbV = state.voiced; Lb.tV.innerHTML = state.voiced ? 'Closed and buzzing (slow motion) · 合起來振動（慢動作）' : 'Open: air passes silently · 張開：空氣安靜地通過'; }
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const z = state.zoom, o = !z;
    show(Lb.tongue, o, P.tongue.clone().add(V(0.02, -0.02, -0.006)));
    show(Lb.lips, o, P.lips.clone().add(V(0, 0.002, 0.03)));
    show(Lb.jaw, o, V(0, 1.482, 0.215));
    show(Lb.box, o, P.larynx.clone().add(V(0, 0, 0.03)));
    show(Lb.tr, o, P.trachea.clone().add(V(0, -0.012, 0.045)));
    show(Lb.s1, o, P.trachea.clone().add(V(0, 0.02, -0.05)));
    show(Lb.s2, o, P.glottis.clone().add(V(0, 0.004, -0.055)));
    show(Lb.s3, o, V(0, 1.575, 0.15), 0);
    show(Lb.tT, o, P.topTitle, -10);
    show(Lb.tF, z, P.topFront, -14); show(Lb.tB, z, P.topBack, 10); show(Lb.tV, z, P.topBack.clone().add(V(0, -0.012, 0)), 16);
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
    if (tonguePivot.userData.y0 === undefined) { tonguePivot.userData.y0 = tonguePivot.position.y; tonguePivot.userData.z0 = tonguePivot.position.z; }
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
    if (!visible) { synth.stop(); R.listen.setAttribute('aria-pressed', 'false'); }      // 捲走就靜音
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-voice-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停住
  root.__lab = {
    camera, controls, state, P, setShape, setVoiced, setZoom, synth, buzz, hzOf,
    setPitch: (p) => { state.pitch = p; R.pitch.value = Math.round(p * 100); fillS(R.pitch); },
    setLoud: (p) => { state.loud = p; R.loud.value = Math.round(p * 100); fillS(R.loud); },
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => buzz && buzz.scrollTo() };
}

lazyBoot('[data-voice-lab]', initLab, { test: (lab) => lab.test() });
