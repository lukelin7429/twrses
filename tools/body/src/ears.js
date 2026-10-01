/*
 * 人體探索 · 第九課「耳朵怎麼聽見聲音？」的 3D 耳朵。
 *
 * 真實的：頭骨（skeleton.glb，BodyParts3D），淡淡地當位置參考；其他骨頭不顯示。
 * 自繪示意：放大 4 倍、剖開前半的右耳——外耳（畫得比這個比例小）、耳道、鼓膜、三塊聽小骨（BodyParts3D 沒有）、
 *   中耳腔、耳咽管、前庭、耳蝸（可以拉直）、三個半規管、聽神經；淡淡的大腦與兩側的聽覺區。
 *
 * 耳朵座標（ear frame）：1 單位＝真實 1 mm；原點＝鼓膜中心；軸向與場景相同（+X＝往身體中線、-X＝往外，+Y＝上，+Z＝臉的前方）。
 *   earG 放在頭骨右邊的鼓膜位置、縮放 S（4 倍）。剖面在 z = 0：耳道、外耳、中耳腔只留後半（z ≤ 0），鏡頭從前方看進去。
 *
 * 聲音（示意）：空氣粒子沿 x 前後振動 dx = A·sin(k(x − c·t))；音高決定畫面上的波長（20 Hz 34 mm → 20 kHz 7 mm），
 *   音量（分貝）決定振幅。真實的空氣振動快得看不見，這裡放慢成每秒 1–4 下。
 *   鎚骨＋砧骨繞同一個支點擺動，鐙骨跟著前後推，鼓膜中心（臍）跟著鎚骨柄。
 * 耳蝸的音高地圖：Greenwood 公式 f = 165.4·(10^(2.1·x) − 0.88)，x＝從尖端量起的比例（0 尖端低音、1 入口高音）。
 * 平衡：按「轉圈圈」，水平半規管裡的液體先落後（反向流）、等速轉時跟上，停下來後繼續往前流 → 頭暈。
 * 聽力測驗（initHearingTest）是 2D＋WebAudio，不需要 WebGL；音量寫死在很小聲（增益 0.05），每個音 1.4 秒。
 *
 * 產物：cd tools/body && npm run build → assets/js/ears.js
 */
import {
  AdditiveBlending, AmbientLight, BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color,
  DirectionalLight, DoubleSide, Float32BufferAttribute, Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Points, PointsMaterial, RingGeometry, Scene, Shape, ShapeGeometry,
  SphereGeometry, Sprite, SpriteMaterial, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const S = 0.004;                                   // 耳朵座標 1 mm → 場景 4 mm（放大 4 倍）
const SRC_X = -46;                                 // 聲源在耳朵座標的位置（距離不照比例）
const HZ_MIN = 20, HZ_MAX = 20000;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtHz = (f) => Math.round(f).toLocaleString('en-US');
const hzFromSlider = (v) => HZ_MIN * Math.pow(HZ_MAX / HZ_MIN, v / 1000);
const sliderFromHz = (f) => Math.round((1000 * Math.log(f / HZ_MIN)) / Math.log(HZ_MAX / HZ_MIN));
// Greenwood：從耳蝸入口（0）量到尖端（1）的位置
const placeOf = (f) => 1 - MathUtils.clamp(Math.log10(f / 165.4 + 0.88) / 2.1, 0, 1);

// ---------------- 小工具：繞 X 軸的旋轉體 ----------------
// prof: [[r, x], ...]；phi0..phi1 是繞 X 軸的角度（(y, z) = r·(cos, sin)），只留 z ≤ 0 就用 π..2π
function revolveX(prof, seg = 40, phi0 = Math.PI, phi1 = Math.PI * 2) {
  const n = prof.length, pos = [], idx = [];
  for (let j = 0; j <= seg; j++) {
    const ph = phi0 + ((phi1 - phi0) * j) / seg, c = Math.cos(ph), s = Math.sin(ph);
    for (const [r, x] of prof) pos.push(x, r * c, r * s);
  }
  for (let j = 0; j < seg; j++) for (let i = 0; i < n - 1; i++) {
    const a = j * n + i, b = a + n;
    idx.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
// z = 0 剖面上的多邊形 [[x, y], ...]
function capZ(polys) {
  const shapes = polys.map((p) => { const s = new Shape(); p.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); return s; });
  return new ShapeGeometry(shapes);
}
// 粗細會變、顏色會變的管子（耳蝸、耳咽管）
function taperTube(pts, rFn, colFn, radial = 12) {
  const curve = new CatmullRomCurve3(pts, false, 'centripetal');
  const n = pts.length * 2;
  const fr = curve.computeFrenetFrames(n, false);
  const pos = [], col = [], idx = [];
  const p = V(0, 0, 0), c = new Color();
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    curve.getPointAt(t, p);
    const r = rFn(t);
    if (colFn) colFn(t, c);
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      pos.push(p.x + r * (ca * fr.normals[i].x + sa * fr.binormals[i].x),
        p.y + r * (ca * fr.normals[i].y + sa * fr.binormals[i].y),
        p.z + r * (ca * fr.normals[i].z + sa * fr.binormals[i].z));
      if (colFn) col.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i < n; i++) for (let j = 0; j < radial; j++) {
    const a = i * (radial + 1) + j, b = a + radial + 1;
    idx.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  if (colFn) g.setAttribute('color', new Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
function glowTex(inner = 'rgba(255,240,200,.9)', outer = 'rgba(255,200,120,0)') {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, inner); gr.addColorStop(1, outer);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}
function dotTex() {
  const c = document.createElement('canvas'); c.width = c.height = 32;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.55, 'rgba(255,255,255,.85)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
  return new CanvasTexture(c);
}
function emojiTex(ch) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.font = '96px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(ch, 64, 70);
  return new CanvasTexture(c);
}

// ---------------- 聲音（WebAudio，固定很小聲） ----------------
let actx = null;
function audio() {
  if (!actx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; actx = new AC(); }
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function makeTone(freq, gain) {
  const a = audio();
  if (!a) return null;
  const o = a.createOscillator(), g = a.createGain();
  o.type = 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0, a.currentTime);
  g.gain.linearRampToValueAtTime(gain, a.currentTime + 0.06);
  o.connect(g).connect(a.destination);
  o.start();
  return {
    o, g,
    stop(after = 0) {
      const t = a.currentTime + after;
      g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 0.06);
      try { o.stop(t + 0.08); } catch (e) { /* 已經排定停止 */ }
    },
  };
}

// ---------------- 聽力測驗（2D，不需要 WebGL） ----------------
const STEPS = [8000, 10000, 12000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
const TEST_GAIN = 0.05, CAL_GAIN = 0.04, TONE_SEC = 1.4;
function initHearingTest(root, onShow3D, onHeard) {
  const strip = root.querySelector('.ea-strip');
  if (!strip || strip.dataset.ready) return null;
  strip.dataset.ready = '1';
  const $ = (s) => strip.querySelector(s);
  const msg = $('.ea-ht-msg'), lis = [...strip.querySelectorAll('.ea-ladder li')];
  const B = { cal: $('.ea-ht-cal'), start: $('.ea-ht-start'), yes: $('.ea-ht-yes'), no: $('.ea-ht-no'), again: $('.ea-ht-again'), d3: $('.ea-ht-3d') };
  const st = { i: -1, top: null, tone: null, timer: 0 };
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const show = (...keys) => { for (const [k, b] of Object.entries(B)) b.hidden = !keys.includes(k); };
  function play(f, g) {
    if (st.tone) st.tone.stop();
    clearTimeout(st.timer);
    st.tone = makeTone(f, g);
    if (!st.tone) { say('This browser cannot play sounds.', '這個瀏覽器無法播放聲音。'); return; }
    st.tone.stop(TONE_SEC);
    lis.forEach((li) => li.classList.toggle('cur', +li.dataset.hz === f));
    st.timer = setTimeout(() => lis.forEach((li) => li.classList.remove('cur')), TONE_SEC * 1000);
  }
  function ask() {
    const f = STEPS[st.i];
    say(`Listen: <b>${fmtHz(f)} Hz</b>. Can you hear it?`, `仔細聽：${fmtHz(f)} 赫茲，聽得到嗎？`);
    show('yes', 'no', 'again', 'cal');
    play(f, TEST_GAIN);
  }
  function finish() {
    if (st.tone) st.tone.stop();
    const f = st.top;
    if (!f) {
      say('You did not hear the 8,000 Hz note. Play the 1,000 Hz test note first and check that the sound is on, then try again.',
        '沒有聽到 8,000 赫茲的音。先播放 1,000 赫茲的試聽音，確認聲音有打開，再試一次。');
    } else {
      const note = f >= 17000 ? ['That is typical for young ears.', '這是年輕耳朵常見的成績。']
        : f >= 12000 ? ['Many adults hear up to about here.', '很多大人大約聽到這裡。']
          : ['Check your speakers, or try again a little louder, as long as it stays comfortable.', '檢查一下喇叭，或在舒服的範圍內稍微調大聲再試一次。'];
      say(`You heard up to <b>${fmtHz(f)} Hz</b>. ${note[0]} Some speakers cannot play the very highest notes, so your ears may be even better than this.`,
        `你聽得到 ${fmtHz(f)} 赫茲。${note[1]}有些喇叭放不出最高的音，所以你的耳朵可能比這個成績更好。`);
      if (onHeard) onHeard(f);
    }
    B.start.innerHTML = '&#8634; Start over<small>重新測一次</small>';
    show('start', 'cal', ...(f ? ['d3'] : []));
  }
  B.cal.addEventListener('click', () => {
    play(1000, CAL_GAIN);
    if (st.i < 0) say('Turn your device volume down until this note is soft but clear. Then start the test.', '把裝置的音量調小，調到這個音輕輕的但清楚，再開始測驗。');
  });
  B.start.addEventListener('click', () => {
    st.i = 0; st.top = null;
    lis.forEach((li) => li.classList.remove('yes', 'no', 'cur'));
    ask();
  });
  B.again.addEventListener('click', () => play(STEPS[st.i], TEST_GAIN));
  B.yes.addEventListener('click', () => {
    const f = STEPS[st.i];
    st.top = f;
    lis.find((li) => +li.dataset.hz === f)?.classList.add('yes');
    st.i++;
    if (st.i >= STEPS.length) finish(); else ask();
  });
  B.no.addEventListener('click', () => {
    lis.find((li) => +li.dataset.hz === STEPS[st.i])?.classList.add('no');
    finish();
  });
  B.d3.addEventListener('click', () => { if (st.top && onShow3D) onShow3D(st.top); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && st.tone) st.tone.stop(); });
  say('Start with the 1,000 Hz test note to set your volume. Then the test plays higher and higher notes, from 8,000 Hz up to 20,000 Hz.',
    '先播放 1,000 赫茲的試聽音調好音量。接著測驗會一個比一個高，從 8,000 赫茲一路到 20,000 赫茲。');
  show('cal', 'start');
  return { scrollTo: () => strip.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

// ---------------- 右欄的音高、音量刻度 ----------------
function meters(root) {
  const q = (s) => root.querySelector(s);
  const hz = q('.ea-hz'), hzW = q('.ea-hz-w'), db = q('.ea-db'), dbW = q('.ea-db-w');
  const hzMark = q('.ea-hzbar .ea-mark'), dbMark = q('.ea-dbbar .ea-mark'), heard = q('.ea-heard');
  let last = '';
  return {
    set(f, d) {
      const k = `${Math.round(f)}|${d}`;
      if (k === last) return;
      last = k;
      hz.textContent = `${fmtHz(f)} Hz`;
      hzW.textContent = f < 250 ? 'low · 低' : f < 2000 ? 'middle · 中' : 'high · 高';
      hzMark.style.left = `${(sliderFromHz(f) / 10).toFixed(1)}%`;
      db.textContent = `${d} dB`;
      dbW.textContent = d < 30 ? 'very quiet · 很小聲' : d < 70 ? 'safe · 安全' : d < 85 ? 'loud · 大聲' : d < 120 ? 'harmful over time · 聽久會受傷' : 'painful · 會痛';
      dbMark.style.left = `${Math.min(100, (d / 130) * 100).toFixed(1)}%`;
      root.classList.toggle('ea-loud', d >= 85);
    },
    heard(f) { heard.hidden = false; heard.style.width = `${(sliderFromHz(f) / 10).toFixed(1)}%`; },
  };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  let lab3d = null;
  const M_ = meters(root);
  const test = initHearingTest(root,
    (f) => { if (lab3d) { root.scrollIntoView({ behavior: 'smooth', block: 'center' }); lab3d.setHz(f); } },
    (f) => M_.heard(f));
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => test && test.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.08; controls.maxDistance = 3;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.9); key.position.set(-1.5, 2.4, 2.6); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(2, 1.5, -2.5); scene.add(rim);

  const PRE = JSON.parse(root.getAttribute('data-pre') || '{}');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), status: $('.ea-status'),
    pres: [...root.querySelectorAll('[data-pre]')], hz: $('.ea-hz-in'), db: $('.ea-db-in'),
    uncoil: $('.ea-uncoil'), spin: $('.ea-spin'), play: $('.ea-play'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    ready: false, labels: true, waves: true, skullOn: true, pre: 'bird', hz: 4000, db: 50,
    unc: 0, uncT: 0, t: 0, spin: null, spinT: 0, fluid: 0, playing: false,
  };
  let bones = null, Ed = null;
  const earG = new Group();
  earG.scale.setScalar(S);
  earG.visible = false;                            // 載入完、放好位置才顯示
  scene.add(earG);
  const P = {};
  const W = (p) => p.clone().multiplyScalar(S).add(earG.position);

  // ---------- 材質 ----------
  const M = {
    skin: new MeshStandardMaterial({ color: 0xe8b49c, roughness: 0.7, side: DoubleSide }),
    skinCut: new MeshStandardMaterial({ color: 0xc9806c, roughness: 0.8, side: DoubleSide }),
    drum: new MeshStandardMaterial({ color: 0xdcd6ea, roughness: 0.35, transparent: true, opacity: 0.85, side: DoubleSide }),
    cavity: new MeshStandardMaterial({ color: 0xf2c5c0, roughness: 0.6, transparent: true, opacity: 0.22, side: DoubleSide, depthWrite: false }),
    bone: new MeshStandardMaterial({ color: 0xf3ead6, roughness: 0.5, emissive: 0x000000 }),
    inner: new MeshStandardMaterial({ color: 0xefe6cf, roughness: 0.45, transparent: true, opacity: 0.75 }),
    cochlea: new MeshStandardMaterial({ vertexColors: true, roughness: 0.45 }),
    tube: new MeshStandardMaterial({ color: 0xf0b2a8, roughness: 0.6, transparent: true, opacity: 0.55, side: DoubleSide, depthWrite: false }),
    nerve: new MeshStandardMaterial({ color: 0xffe08a, roughness: 0.5 }),
    fluid: new MeshBasicMaterial({ color: 0x5ad0ff, depthTest: false }),
    window: new MeshStandardMaterial({ color: 0xf6e7c8, roughness: 0.5, side: DoubleSide }),
  };

  // ---------- 外耳、耳道（只留後半） ----------
  {
    const canal = [[3.3, -26], [3.3, -0.4], [5.2, -0.4], [5.2, -26], [3.3, -26]];
    earG.add(new Mesh(revolveX(canal, 36), M.skin));
    earG.add(new Mesh(capZ([[[-26, 3.3], [-0.4, 3.3], [-0.4, 5.2], [-26, 5.2]], [[-26, -3.3], [-0.4, -3.3], [-0.4, -5.2], [-26, -5.2]]]), M.skinCut));
    // 外耳：往外張開的喇叭口，上半大、下半小（耳垂）
    const outer = [[5.2, -25.5], [6.6, -27.6], [9.2, -29.6], [12.6, -30.8], [15.6, -31.2]];
    const innerP = [[15.6, -29.9], [12.4, -29.4], [9.0, -28.2], [6.6, -26.4], [5.2, -24.6]];
    const prof = [...outer, ...innerP, outer[0]];
    const g = revolveX(prof, 40);
    const a = g.attributes.position;
    for (let i = 0; i < a.count; i++) a.setY(i, a.getY(i) * (a.getY(i) > 0 ? 1.25 : 0.85));
    g.computeVertexNormals();
    earG.add(new Mesh(g, M.skin));
    const top = prof.map(([r, x]) => [x, r * 1.25]), bot = prof.map(([r, x]) => [x, -r * 0.85]);
    earG.add(new Mesh(capZ([top, bot]), M.skinCut));
    P.pinnaTop = V(-31, 18.5, 0); P.canalMid = V(-14, 5.2, 0);
  }

  // ---------- 鼓膜（往內凹的淺錐，上緣往外傾） ----------
  const drumG = new Group();
  drumG.rotation.z = MathUtils.degToRad(-18);
  const drum = new Mesh(revolveX([[0, 1.5], [1.4, 1.0], [2.8, 0.5], [4.2, 0]], 36, 0, Math.PI * 2), M.drum);
  drumG.add(drum);
  earG.add(drumG);

  // ---------- 中耳腔（後半）、卵圓窗、耳咽管 ----------
  const cav = new Mesh(new SphereGeometry(1, 32, 22, Math.PI, Math.PI), M.cavity);
  cav.scale.set(4.8, 7.2, 4.2); cav.position.set(3.4, 1.1, 0);
  earG.add(cav);
  const oval = new Mesh(new RingGeometry(0.9, 1.35, 24).rotateY(Math.PI / 2), M.window);
  oval.position.set(6.85, -0.2, 0);
  earG.add(oval);
  earG.add(new Mesh(taperTube([V(3.6, -5.6, 0.8), V(7.5, -10.5, 5), V(12.5, -17.5, 11.5), V(16.5, -24, 17)], (t) => 0.8 + 0.9 * t), M.tube));

  // ---------- 三塊聽小骨：鎚骨＋砧骨繞支點擺動，鐙骨前後推 ----------
  const PIV = V(2.6, 4.7, 0);
  const pivot = new Group(); pivot.position.copy(PIV); earG.add(pivot);
  const rel = (x, y, z) => V(x - PIV.x, y - PIV.y, z - PIV.z);
  const bone = (geo, pos, parent, scale) => { const m = new Mesh(geo, M.bone); m.position.copy(pos); if (scale) m.scale.set(...scale); parent.add(m); return m; };
  const malleus = new Group(), incus = new Group();
  pivot.add(malleus, incus);
  malleus.add(new Mesh(taperTube([rel(0.9, -1.3, 0), rel(1.2, 1.0, 0.1), rel(1.6, 3.4, 0.2)], (t) => 0.32 + 0.22 * t), M.bone));
  bone(new SphereGeometry(1.25, 20, 14), rel(1.9, 4.75, 0.2), malleus);
  bone(new SphereGeometry(1, 20, 14), rel(3.45, 4.75, -0.1), incus, [1.3, 1.1, 1.0]);
  incus.add(new Mesh(taperTube([rel(4.4, 5.0, -0.2), rel(5.6, 5.4, -0.4)], () => 0.32), M.bone));
  incus.add(new Mesh(taperTube([rel(3.7, 4.0, -0.1), rel(4.1, 2.0, 0), rel(4.45, 0.45, 0)], (t) => 0.42 - 0.12 * t), M.bone));
  bone(new SphereGeometry(0.36, 14, 10), rel(4.55, 0.2, 0), incus);
  const stapes = new Group(); earG.add(stapes);
  stapes.add(new Mesh(taperTube([V(4.85, 0.15, 0), V(5.7, 0.6, 0), V(6.55, 0.62, 0)], () => 0.17), M.bone));
  stapes.add(new Mesh(taperTube([V(4.85, 0.15, 0), V(5.7, -0.75, 0), V(6.55, -0.95, 0)], () => 0.17), M.bone));
  bone(new SphereGeometry(0.33, 14, 10), V(4.85, 0.15, 0), stapes);
  bone(new SphereGeometry(1, 20, 12), V(6.62, -0.17, 0), stapes, [0.18, 1.0, 0.6]);
  P.hammer = V(1.9, 4.75, 0.2); P.anvil = V(3.45, 4.75, 0); P.stirrup = V(5.8, -0.2, 0);

  // ---------- 內耳：前庭、半規管、耳蝸 ----------
  const vest = new Mesh(new SphereGeometry(2.0, 24, 16), M.inner);
  vest.position.set(8.7, 0.7, -0.8); earG.add(vest);
  const canals = [
    { c: V(11.0, 4.3, -2.8), rot: [Math.PI / 2, 0, 0] },   // 水平（外側）半規管
    { c: V(10.4, 6.8, -0.8), rot: [0, Math.PI / 2, 0] },   // 前半規管
    { c: V(13.0, 6.3, -4.4), rot: [0, 0, 0] },             // 後半規管
  ];
  for (const k of canals) {
    const m = new Mesh(new TorusGeometry(2.7, 0.34, 10, 40), M.inner);
    m.position.copy(k.c); m.rotation.set(...k.rot); earG.add(m);
    k.mesh = m;
  }
  P.canals = V(11.6, 9.8, -2.5);
  // 平衡模式：水平半規管裡的液體點
  const fluidDots = [];
  for (let i = 0; i < 8; i++) { const d = new Mesh(new SphereGeometry(0.5, 12, 8), M.fluid); d.visible = false; d.renderOrder = 8; earG.add(d); fluidDots.push(d); }
  // 耳蝸：螺旋 ↔ 拉直；顏色＝音高地圖（入口紫＝高音、尖端紅＝低音）
  const C_START = V(8.9, -1.2, 0), A0 = MathUtils.degToRad(150), R0 = 4.2, R1 = 0.75, TURNS = 2.6, C_LEN = 32;
  const C_CTR = C_START.clone().sub(V(R0 * Math.cos(A0), R0 * Math.sin(A0), 0));
  const C_DIR = V(1, -0.33, 0).normalize();
  const cochPt = (t, u) => {
    const a = A0 - Math.PI * 2 * TURNS * t, r = R0 * Math.pow(R1 / R0, t);
    const sp = V(C_CTR.x + r * Math.cos(a), C_CTR.y + r * Math.sin(a), 2.4 * t);
    return sp.lerp(C_START.clone().addScaledVector(C_DIR, C_LEN * t), u);
  };
  const cmapColor = (t, c) => c.setHSL(0.78 * (1 - t), 0.75, 0.6);
  const cochlea = new Mesh(new BufferGeometry(), M.cochlea);
  earG.add(cochlea);
  let cochU = -1;
  function buildCochlea(u) {
    if (Math.abs(u - cochU) < 1e-3) return;
    cochU = u;
    const pts = [];
    for (let i = 0; i <= 90; i++) pts.push(cochPt(i / 90, u));
    cochlea.geometry.dispose();
    cochlea.geometry = taperTube(pts, (t) => 0.82 - 0.46 * t, cmapColor, 10);
    P.cochCtr = cochPt(0.35, u).add(V(0, -4.8 - 2 * u, 0));
  }
  // 音高亮點、往亮點跑的波
  const spotTex = glowTex('rgba(255,250,220,.9)', 'rgba(255,220,120,0)');
  const spot = new Sprite(new SpriteMaterial({ map: spotTex, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
  spot.renderOrder = 9; earG.add(spot);
  const runners = [];
  for (let i = 0; i < 4; i++) {
    const s = new Sprite(new SpriteMaterial({ map: spotTex, color: 0xbfe8ff, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
    s.scale.set(1.1, 1.1, 1); s.renderOrder = 9; earG.add(s); runners.push(s);
  }

  // ---------- 空氣振動的粒子 ----------
  const NP = 1700, base = new Float32Array(NP * 3);
  const rmax = (x) => (x < -32 ? 13 + 2 * ((x - SRC_X) / (-32 - SRC_X)) : x < -26 ? MathUtils.lerp(15, 3.0, (x + 32) / 6) : 2.9);
  for (let i = 0; i < NP; i++) {
    const x = MathUtils.lerp(SRC_X + 6, -0.9, Math.pow(Math.random(), 0.8));
    const r = rmax(x);
    base[i * 3] = x; base[i * 3 + 1] = (Math.random() * 2 - 1) * r;
    base[i * 3 + 2] = x < -26 ? (Math.random() * 2 - 1) * 3 : -Math.random() * 2.8 + 0.4;
  }
  const pg = new BufferGeometry();
  pg.setAttribute('position', new BufferAttribute(new Float32Array(base), 3));
  pg.setAttribute('color', new BufferAttribute(new Float32Array(NP * 3), 3));
  const air = new Points(pg, new PointsMaterial({ size: 0.9 * S, map: dotTex(), vertexColors: true, transparent: true, depthWrite: false, alphaTest: 0.05 }));
  air.renderOrder = 4; earG.add(air);
  // 聲源（emoji 貼圖）
  const srcTex = {};
  const src = new Sprite(new SpriteMaterial({ transparent: true, depthWrite: false }));
  src.position.set(SRC_X, 1.5, 0); src.scale.set(11, 11, 1); src.renderOrder = 8; earG.add(src);
  function setSrcIcon(ch) {
    if (!srcTex[ch]) srcTex[ch] = emojiTex(ch);
    src.material.map = srcTex[ch]; src.material.needsUpdate = true;
  }

  // ---------- 載入骨架：頭骨、大腦、聽神經 ----------
  const brainMeshes = [], hearAreas = [], pulses = [];
  let nerveW = [];
  const pulseTex = glowTex();
  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      b.mesh.visible = b.info.region === 'skull' || /^c[1-4]$/.test(b.info.id);
      b.mat.opacity = 0.13; b.mat.depthWrite = false; b.mesh.renderOrder = 1;
    }
    const B = (id) => bones.get(id);
    const tb = B('r-temporal').box, tc = tb.getCenter(V(0, 0, 0));
    Ed = V(tb.min.x + 0.017, tc.y - 0.004, tc.z + 0.003);   // 右耳鼓膜（身體右邊在 -X）
    earG.position.copy(Ed);
    earG.updateMatrixWorld(true);
    const cran = B('frontal').box.clone();
    for (const id of ['occipital', 'r-parietal', 'l-parietal', 'r-temporal', 'l-temporal']) cran.union(B(id).box);
    const cs = cran.getSize(V(0, 0, 0)), cc = cran.getCenter(V(0, 0, 0));
    const bc = V(cc.x, cc.y + cs.y * 0.06, cc.z - cs.z * 0.02);
    const hsx = cs.x * 0.2, hsy = cs.y * 0.33, hsz = cs.z * 0.4;
    const bm = new MeshStandardMaterial({ color: 0xf0b4c4, roughness: 0.6, transparent: true, opacity: 0.13, depthWrite: false });
    for (const side of [1, -1]) {
      const m = new Mesh(new SphereGeometry(1, 40, 28), bm);
      m.scale.set(hsx, hsy, hsz); m.position.set(bc.x + side * hsx * 0.95, bc.y, bc.z); m.renderOrder = 2;
      scene.add(m); brainMeshes.push(m);
      // 聽覺區：顳葉上緣（左右都有，兩隻耳朵的訊號都會送到兩邊）
      const h = new Mesh(new SphereGeometry(1, 24, 16), new MeshStandardMaterial({ color: 0xffb066, emissive: 0xc0601a, emissiveIntensity: 0.3, transparent: true, opacity: 0.28, depthWrite: false }));
      h.scale.set(hsx * 0.28, hsy * 0.16, hsz * 0.3);
      h.position.set(bc.x + side * hsx * 1.62, bc.y - hsy * 0.32, bc.z + hsz * 0.02); h.renderOrder = 3;
      scene.add(h); brainMeshes.push(h); hearAreas.push(h);
    }
    // 聽神經：耳蝸＋前庭 → 腦幹 → 往上分到兩側的聽覺區
    const join = W(V(16.5, 0.2, -2.2));
    const bs0 = V(bc.x, Ed.y - 0.008, Ed.z - 0.016);
    const stub = new CatmullRomCurve3([V(12.4, -3.4, -1.0), V(15, -1.4, -2.0), V(16.5, 0.2, -2.2)]);
    const stub2 = new CatmullRomCurve3([V(9.6, 2.2, -1.5), V(13.5, 1.5, -2.2), V(16.5, 0.2, -2.2)]);
    for (const c of [stub, stub2]) earG.add(new Mesh(new TubeGeometry(c, 20, 0.55, 8, false), M.nerve));
    const toStem = new CatmullRomCurve3([join, V((join.x + bs0.x) / 2, bs0.y + 0.002, (join.z + bs0.z) / 2), bs0]);
    const ups = hearAreas.map((h) => new CatmullRomCurve3([bs0, V(bs0.x + (h.position.x - bs0.x) * 0.25, bs0.y + 0.03, bs0.z + 0.004), V(h.position.x * 0.8 + bs0.x * 0.2, h.position.y - 0.006, h.position.z), h.position.clone()]));
    for (const c of [toStem, ...ups]) {
      const m = new Mesh(new TubeGeometry(c, 60, 0.0024, 8, false), M.nerve); m.renderOrder = 4; scene.add(m); nerveW.push(m);
    }
    P.stub = stub; P.toStem = toStem; P.ups = ups;
    for (let i = 0; i < 6; i++) {
      const s = new Sprite(new SpriteMaterial({ map: pulseTex, color: 0xfff1b8, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
      s.scale.set(0.007, 0.007, 1); s.renderOrder = 9; scene.add(s); pulses.push(s);
    }
    // 鏡頭：從前方、稍微偏右、偏上看剖面
    P.target = W(V(-12, 0.5, 0));
    P.home = V(-0.07, 0.08, 0.34);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    buildCochlea(0);
    choosePre('bird');
    earG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.35 - camera.aspect) * 1.15, 1, 1.65);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 狀態 ----------------
  function choosePre(k) {
    const p = PRE[k];
    if (!p) return;
    state.pre = k;
    setHz(p.hz, true); setDb(p.db);
    setSrcIcon(p.icon);
    R.pres.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pre') === k ? 'true' : 'false'));
  }
  function setHz(f, keepPre) {
    state.hz = MathUtils.clamp(f, HZ_MIN, HZ_MAX);
    R.hz.value = sliderFromHz(state.hz); R.hz.style.setProperty('--p', `${R.hz.value / 10}%`);
    if (!keepPre) clearPre();
    if (tone) tone.o.frequency.setTargetAtTime(state.hz, tone.o.context.currentTime, 0.02);
  }
  function setDb(d) {
    state.db = Math.round(MathUtils.clamp(d, 0, 130));
    R.db.value = state.db; R.db.style.setProperty('--p', `${(state.db / 130) * 100}%`);
  }
  function clearPre() {
    if (!state.pre) return;
    state.pre = null;
    R.pres.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    setSrcIcon('🔊');
  }
  function setUncoil(on) {
    state.uncT = on ? 1 : 0; R.uncoil.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!state.ready) return;
    if (on) {                                         // 鏡頭移到拉直的耳蝸前面
      const t = W(cochPt(0.45, 1));
      flyTo(t.clone().add(V(-0.03, 0.05, 0.2).multiplyScalar(fit())), t);
    } else flyTo(homePos(), P.target);
  }
  function startSpin() {
    state.spin = 'spin'; state.spinT = 0; R.spin.setAttribute('aria-pressed', 'true');
    if (state.ready) {                                // 鏡頭轉到上方，看得到水平半規管
      const t = W(V(11, 4.3, -2.8));
      flyTo(t.clone().add(V(-0.03, 0.085, 0.06).multiplyScalar(fit())), t);
    }
  }
  let tone = null;
  function setPlaying(on) {
    state.playing = on;
    R.play.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on && !tone) tone = makeTone(state.hz, 0.035);
    if (!on && tone) { tone.stop(); tone = null; }
  }

  // ---------------- 操作 ----------------
  R.pres.forEach((b) => b.addEventListener('click', () => choosePre(b.getAttribute('data-pre'))));
  R.hz.addEventListener('input', () => setHz(hzFromSlider(+R.hz.value)));
  R.db.addEventListener('input', () => { setDb(+R.db.value); clearPre(); });
  R.uncoil.addEventListener('click', () => setUncoil(state.uncT < 0.5));
  R.spin.addEventListener('click', () => startSpin());
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="waves"]', (v) => { state.waves = v; });
  bind('[data-t="skull"]', (v) => {
    state.skullOn = v;
    if (bones) for (const b of bones.values()) if (b.info.region === 'skull' || /^c[1-4]$/.test(b.info.id)) b.mesh.visible = v;
    for (const m of [...brainMeshes, ...nerveW]) m.visible = v;
  });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) setPlaying(false); });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 文字 ----------------
  function setStatus(tPlace) {
    let en, zh, cls;
    if (state.spin) {
      cls = 'ey-blindmsg';
      if (state.spin === 'spin') {
        en = 'Spinning! At first the liquid in the loop lags behind and bends the hair cells. After a few seconds it catches up, and the feeling of turning fades.';
        zh = '轉圈中！一開始圓環裡的液體跟不上，把毛細胞推彎；幾秒後液體跟上了，轉動的感覺就變淡。';
      } else {
        en = 'Stop! Your head stopped, but the liquid keeps swirling, so your brain thinks you are still turning. That is the dizzy feeling.';
        zh = '停！頭停下來了，液體卻還在轉，大腦以為你還在轉——這就是頭暈的感覺。';
      }
    } else {
      const f = fmtHz(state.hz), pct = Math.round(tPlace * 100);
      const where = tPlace < 0.34 ? ['near the entrance of the cochlea, where the high notes are', '耳蝸入口附近，高音的地方']
        : tPlace < 0.67 ? ['in the middle of the cochlea', '耳蝸的中段'] : ['near the tip of the cochlea, where the low notes are', '耳蝸尖端附近，低音的地方'];
      en = `${f} Hz: the air shakes ${f} times a second. It bends hair cells ${where[0]} (${pct}% of the way in).`;
      zh = `${f} 赫茲：空氣每秒振動 ${f} 次，讓${where[1]}的毛細胞彎曲（往裡走 ${pct}%）。`;
      const d = state.db;
      if (d >= 120) { en += ` ${d} dB is painfully loud. Cover your ears!`; zh += `${d} 分貝大到會痛，快摀住耳朵！`; cls = 'ey-bad'; }
      else if (d >= 85) { en += ` ${d} dB can harm hair cells if you listen for a long time.`; zh += `${d} 分貝聽久了會傷害毛細胞。`; cls = 'ey-bad'; }
      else if (d < 20) { en += ` ${d} dB is so quiet that it is hard to hear at all.`; zh += `${d} 分貝非常小聲，幾乎聽不到。`; cls = ''; }
      else { en += ` ${d} dB is safe to listen to.`; zh += `${d} 分貝聽起來是安全的。`; cls = 'ey-ok'; }
    }
    const h = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
    if (R.status.innerHTML !== h) { R.status.innerHTML = h; R.status.className = `ey-status ea-status ${cls}`; }
  }

  // ---------------- 標籤 ----------------
  const Lb = {
    pinna: lab.add('ey-lb', 'Outer ear · 外耳'), canal: lab.add('ey-lb', 'Ear canal · 耳道'), drum: lab.add('ey-lb', 'Eardrum · 鼓膜'),
    bones: lab.add('ey-lb ea-lb-b', 'Three tiny bones · 三塊聽小骨'), hammer: lab.add('ey-lb ea-lb-b', 'Hammer · 鎚骨'),
    anvil: lab.add('ey-lb ea-lb-b', 'Anvil · 砧骨'), stirrup: lab.add('ey-lb ea-lb-b', 'Stirrup · 鐙骨'),
    cochlea: lab.add('ey-lb', 'Cochlea · 耳蝸'), high: lab.add('ey-lb ea-lb-hi', 'High notes · 高音'), low: lab.add('ey-lb ea-lb-lo', 'Low notes · 低音'),
    canals: lab.add('ey-lb', 'Semicircular canals · 半規管'), tube: lab.add('ey-lb', 'To the back of the nose · 耳咽管'),
    nerve: lab.add('ey-lb', 'Hearing nerve · 聽神經'), area: lab.add('ey-lb ea-lb-a', 'Hearing area · 聽覺區'),
    src: lab.add('ey-lb ey-lb-o', ''), spot: lab.add('ey-lb ey-lb-f', ''),
  };
  let autoLabels = true, srcText = '', spotText = '';
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels(tPlace) {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const near = camera.position.distanceTo(W(V(4, 1, 0))) < 0.3;
    const u = state.unc;
    show(Lb.pinna, true, W(P.pinnaTop), -6);
    show(Lb.canal, true, W(P.canalMid), -12);
    show(Lb.drum, true, W(V(-1.2, -5.6, 0)), 12);
    show(Lb.bones, !near, W(V(3.4, 7.6, 0)), -8);
    show(Lb.hammer, near, W(V(0.2, 7.4, 0.2)), -6);
    show(Lb.anvil, near, W(V(5.4, 7.0, 0)), -6);
    show(Lb.stirrup, near, W(V(6.2, -2.4, 0)), 10);
    show(Lb.cochlea, true, W(P.cochCtr), 10);
    show(Lb.high, near || u > 0.5, W(cochPt(0.03, u).add(V(0, -1.6, 0))), 12);
    show(Lb.low, near || u > 0.5, W(cochPt(0.98, u).add(V(0, -1.4, 0))), 12);
    show(Lb.canals, near || !!state.spin, W(P.canals), -8);
    show(Lb.tube, near, W(V(12.5, -17.5, 11.5)), 12);
    show(Lb.nerve, !!P.toStem && state.skullOn && near, P.toStem ? P.toStem.getPointAt(0.5) : V(0, 0, 0), -12);
    show(Lb.area, !!hearAreas[0] && state.skullOn, hearAreas[0] ? hearAreas[0].position.clone().add(V(0, 0.02, 0)) : V(0, 0, 0), -6);
    const p = PRE[state.pre], st = p ? `${p.en} · ${p.zh}` : 'Your sound · 你的聲音';
    if (st !== srcText) { Lb.src.textContent = st; srcText = st; }
    show(Lb.src, true, W(V(SRC_X, 9, 0)), -6);
    const sp = `${fmtHz(state.hz)} Hz`;
    if (sp !== spotText) { Lb.spot.textContent = sp; spotText = sp; }
    show(Lb.spot, true, W(cochPt(tPlace, u)), -16);
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

  const tmpC = new Color(), WAVE = new Color(0x9fd8ff);
  function step(dt) {
    if (!state.ready) return null;
    state.t += dt;
    const t = state.t;
    // 聲波：音高 → 畫面上的波長，音量 → 振幅（示意）
    const lf = Math.log10(state.hz / HZ_MIN) / 3;
    const lam = 34 - 27 * lf, c = 26, k = (Math.PI * 2) / lam, fv = c / lam;
    const A = 0.15 + 2.4 * (state.db / 130);
    const pos = pg.attributes.position, col = pg.attributes.color;
    air.visible = state.waves;
    if (state.waves) {
      for (let i = 0; i < NP; i++) {
        const x = base[i * 3], ph = k * (x - c * t);
        pos.array[i * 3] = Math.min(-0.5, x + A * Math.sin(ph));
        const b = 0.45 + 0.55 * MathUtils.clamp(0.5 - Math.cos(ph) * A * k * 1.5, 0, 1);
        tmpC.copy(WAVE).multiplyScalar(b);
        col.array[i * 3] = tmpC.r; col.array[i * 3 + 1] = tmpC.g; col.array[i * 3 + 2] = tmpC.b;
      }
      pos.needsUpdate = true; col.needsUpdate = true;
    }
    // 鼓膜與聽小骨：跟著到達鼓膜（x = 0）的波
    const th = (0.012 + 0.05 * (state.db / 130)) * Math.sin(k * (0 - c * t));
    pivot.rotation.z = th;
    stapes.position.x = th * (PIV.y - 0.2);
    drum.scale.x = 1 + (th * (PIV.y + 1.3)) / 1.5;
    // 耳蝸拉直、亮點與往亮點跑的波
    state.unc += (state.uncT - state.unc) * Math.min(1, dt * 2.5);
    if (Math.abs(state.uncT - state.unc) < 1e-3) state.unc = state.uncT;
    buildCochlea(state.unc);
    const tp = placeOf(state.hz);
    const loud = state.db >= 85;
    spot.position.copy(cochPt(tp, state.unc)).add(V(0, 0, 1.0));
    const sz = 2.2 + 3.2 * (state.db / 130) * (0.85 + 0.15 * Math.sin(t * fv * Math.PI * 2));
    spot.scale.set(sz, sz, 1);
    spot.material.color.set(loud ? 0xff6b5e : 0xfff3c8);
    runners.forEach((s, i) => {
      const f = ((t * 0.9 + i / runners.length) % 1);
      s.position.copy(cochPt(tp * f, state.unc)).add(V(0, 0, 0.9));
      s.material.opacity = 0.9 * (1 - f * 0.6) * (state.db > 5 ? 1 : 0);
    });
    // 平衡：水平半規管裡的液體（相對於頭的流動）
    if (state.spin) {
      state.spinT += dt;
      let v;
      if (state.spin === 'spin') { v = -2.6 * Math.exp(-state.spinT / 1.1); if (state.spinT > 3.2) { state.spin = 'stop'; state.spinT = 0; } }
      else { v = 2.6 * Math.exp(-state.spinT / 2.4); if (state.spinT > 6) { state.spin = null; R.spin.setAttribute('aria-pressed', 'false'); } }
      state.fluid += v * dt;
    }
    const cn = canals[0];
    fluidDots.forEach((d, i) => {
      d.visible = !!state.spin;
      if (!d.visible) return;
      const a = state.fluid + (i / fluidDots.length) * Math.PI * 2;
      d.position.set(cn.c.x + 2.7 * Math.cos(a), cn.c.y, cn.c.z + 2.7 * Math.sin(a));
    });
    // 聽神經上的訊號、聽覺區發亮
    const sk = state.skullOn;
    const active = state.db > 5;
    pulses.forEach((p, i) => {
      const branch = P.ups[i % 2];
      const f = ((t / 1.3 + i / pulses.length) % 1);
      p.visible = sk && active && !!branch;
      if (!p.visible) return;
      if (f < 0.5) P.toStem.getPointAt(f * 2, p.position); else branch.getPointAt((f - 0.5) * 2, p.position);
    });
    for (const h of hearAreas) h.material.emissiveIntensity = active ? 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(t * 5)) : 0.15;
    M_.set(state.hz, state.db);
    setStatus(tp);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const kk = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, kk);
      controls.target.lerpVectors(fly.t0, fly.t1, kk);
    }
    return tp;
  }
  let visible = false, raf = 0, last = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (tm - (last || tm)) / 1000);
    last = tm;
    const tp = step(dt);
    controls.update();
    if (tp != null) updateLabels(tp);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (!visible) setPlaying(false);
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-ears-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, choosePre, setHz: (f) => setHz(f), setDb, setUncoil, startSpin,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { const tp = step(0); controls.update(); if (tp != null) updateLabels(tp); renderer.render(scene, camera); },
  };
  lab3d = { setHz: (f) => { if (state.ready) { setHz(f); setDb(40); setUncoil(true); } } };
  return { ready: () => state.ready, test: () => test && test.scrollTo() };
}

lazyBoot('[data-ears-lab]', initLab, { test: (lab) => lab.test() });
