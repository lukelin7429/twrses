/*
 * 萬物原理 · 第十二課「相機怎麼拍下照片？」的 3D 相機剖面（自繪示意）。
 *
 * 一個機制：鏡頭把景物上每一點射來的光聚到感光元件上的一點，排成一個上下顛倒的小影像；
 *   感光元件是一格一格的像素，每格上有紅、綠或藍的濾色片（拜耳陣列），只數得到那一種顏色的光，
 *   數完變成數字——照片就是一大堆數字（接第八課）。
 *
 * 場景（側面看，光從左往右）：x = −8 是一塊畫著房子和樹的板子（景物），x = 0 是鏡頭與光圈，
 *   x = s 是感光元件（對焦滑桿就是前後移動它）。兩個景物點（紅屋頂、綠草地）各畫三道光線：
 *   經過鏡頭中心與光圈上下緣，照薄透鏡公式在像距 di 交會；感光元件不在 di 上就成了模糊的小圓。
 *   感光元件的貼圖、右側的「拍到的照片」都是同一套計算：把景物倒過來 → 依模糊圈大小模糊 → 依光圈調亮度 → 取樣成 N 格。
 *   「沒有鏡頭（針孔）」：光直直穿過小孔，孔越小越清楚、越暗。
 *
 * 產物：cd tools/science && npm run build → assets/js/camera-lens.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CanvasTexture, Color, DirectionalLight, DoubleSide, EdgesGeometry,
  Group, HemisphereLight, Line, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, NearestFilter, PerspectiveCamera, PlaneGeometry, RingGeometry, Scene, SphereGeometry,
  SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { imageDistance, blurDiameter, pinholeBlur, bayer, bayerCounts, exposure } from './cameracalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const OBJ_X = -8, OBJ_W = 4, OBJ_H = 3, F = 2.7, SEN_W = 2.4, SEN_H = 1.8;
const DO = -OBJ_X;                       // 物距 8
const DI = imageDistance(F, DO);         // 像距約 4.08
const PTS = [{ y: 0.78, c: 0xff5a4a }, { y: -1.15, c: 0x5ed36a }];   // 紅屋頂、綠草地
const WORK_W = 128, WORK_H = 96;

// 景物：一幅畫（天空、太陽、房子、樹、草地）
function drawScene() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 192;
  const g = c.getContext('2d');
  const sky = g.createLinearGradient(0, 0, 0, 130); sky.addColorStop(0, '#5aa8ff'); sky.addColorStop(1, '#bfe2ff');
  g.fillStyle = sky; g.fillRect(0, 0, 256, 192);
  g.fillStyle = '#ffd84a'; g.beginPath(); g.arc(206, 38, 20, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#4caf50'; g.fillRect(0, 128, 256, 64);
  g.fillStyle = '#6d4c2f'; g.fillRect(44, 92, 12, 44);
  g.fillStyle = '#2e8b3e'; g.beginPath(); g.arc(50, 82, 28, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#f5efe2'; g.fillRect(104, 82, 84, 52);
  g.fillStyle = '#d8382e'; g.beginPath(); g.moveTo(96, 84); g.lineTo(146, 46); g.lineTo(196, 84); g.closePath(); g.fill();
  g.fillStyle = '#7a4b2a'; g.fillRect(138, 104, 18, 30);
  g.fillStyle = '#7fc4ff'; g.fillRect(114, 94, 18, 16); g.fillRect(162, 94, 18, 16);
  return c;
}

// 盒狀模糊（三次 ≈ 高斯），在 RGBA 陣列上原地做
function boxBlur(d, w, h, r) {
  if (r < 0.5) return;
  const R = Math.round(r), tmp = new Float32Array(d.length);
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let s0 = 0, s1 = 0, s2 = 0, n = 0;
      for (let k = -R; k <= R; k++) { const xx = Math.min(w - 1, Math.max(0, x + k)), o = (y * w + xx) * 4; s0 += d[o]; s1 += d[o + 1]; s2 += d[o + 2]; n++; }
      const o = (y * w + x) * 4; tmp[o] = s0 / n; tmp[o + 1] = s1 / n; tmp[o + 2] = s2 / n;
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let s0 = 0, s1 = 0, s2 = 0, n = 0;
      for (let k = -R; k <= R; k++) { const yy = Math.min(h - 1, Math.max(0, y + k)), o = (yy * w + x) * 4; s0 += tmp[o]; s1 += tmp[o + 1]; s2 += tmp[o + 2]; n++; }
      const o = (y * w + x) * 4; d[o] = s0 / n; d[o + 1] = s1 / n; d[o + 2] = s2 / n;
    }
  }
}

const MSG = {
  sharp: ['In focus: light from each point of the scene comes together at one point on the sensor. The picture on the sensor is upside down, and the camera flips it back for you.',
    '對準焦了：景物上每一點的光，都聚到感光元件上的一點。感光元件上的影像是上下顛倒的，相機會幫你轉回來。'],
  blurry: ['Out of focus: the sensor is not where the light comes together, so each point spreads into a little circle and the photo looks blurry. Slide the focus to move the sensor.',
    '失焦了：感光元件不在光聚集的地方，每一點都散成一個小圓，照片就糊了。拉動對焦滑桿，把感光元件前後移動。'],
  bright: ['A wider opening lets in more light: twice as wide means four times the light. But anything out of focus gets blurrier too.',
    '光圈開得越大，進來的光越多：直徑加倍，光變四倍。但沒對準焦的地方也會更糊。'],
  dark: ['A small opening lets in only a little light, so the photo is dark. Real cameras then keep the shutter open longer, or make the signal stronger.',
    '光圈很小，進來的光很少，照片就暗。真正的相機會讓快門開久一點，或把訊號放大。'],
  raw: ['Each pixel on the sensor has a red, green, or blue filter, so it only measures that one color. There are twice as many green ones, because our eyes are most sensitive to green. The camera then works out the full color of every pixel.',
    '感光元件上每一格都蓋著紅、綠或藍的濾色片，只量得到那一種顏色。綠色的格子是紅、藍的兩倍，因為人眼對綠色最敏感。相機再算出每一格完整的顏色。'],
  few: ['With only a few pixels, the photo turns into big squares. More pixels means more detail: a modern phone camera has tens of millions.',
    '像素太少，照片就變成一格一格的大方塊。像素越多，細節越多：現在的手機相機有好幾千萬個。'],
  pinhole: ['No lens at all: a tiny hole also makes an upside-down picture, because light travels in straight lines. The smaller the hole, the sharper the picture, but so little light gets in that the shutter must stay open for a long time. Make the hole bigger and the picture turns blurry.',
    '完全沒有鏡頭：一個小孔也能做出上下顛倒的影像，因為光走直線。孔越小越清楚，但進來的光少到快門得開很久；孔開大一點，影像就糊了。'],
};

function initLab(root) {
  const $ = (s) => root.querySelector(s);
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
  scene.background = new Color(0x111a2e);
  const camera = new PerspectiveCamera(36, 1, 0.1, 200);
  // 窄畫面把中心往右移一點（不然感光元件被切掉），並拉遠
  const TARGET = V(-2.4, -0.1, 0);
  const homeTarget = () => (camera.aspect < 1.2 ? V(-1.3, -0.1, 0) : TARGET.clone());
  const homePos = () => homeTarget().add(V(-3.2, 4.2, 17.5).multiplyScalar(camera.aspect < 0.9 ? 1.85 : camera.aspect < 1.2 ? 1.5 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 60;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6efff, 0x223044, 0.9));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.1); sun.position.set(-6, 8, 10); scene.add(sun);

  const SRC = drawScene();
  const srcData = SRC.getContext('2d').getImageData(0, 0, SRC.width, SRC.height).data;

  // ---------------- 景物板 ----------------
  const srcTex = new CanvasTexture(SRC); srcTex.colorSpace = SRGBColorSpace;
  const board = new Mesh(new PlaneGeometry(OBJ_W, OBJ_H), new MeshBasicMaterial({ map: srcTex, side: DoubleSide }));
  board.rotation.y = Math.PI / 2; at(board, OBJ_X, 0, 0); scene.add(board);
  scene.add(at(new Mesh(new BoxGeometry(0.12, OBJ_H + 0.2, OBJ_W + 0.2), new MeshStandardMaterial({ color: 0x5a4632 })), OBJ_X - 0.08, 0, 0));

  // ---------------- 相機（剖開） ----------------
  const body = new Mesh(new BoxGeometry(6.4, 3.2, 3.4), new MeshStandardMaterial({ color: 0x8aa0c8, transparent: true, opacity: 0.08, depthWrite: false }));
  at(body, 2.9, 0, 0); scene.add(body);
  scene.add(at(new LineSegments(new EdgesGeometry(new BoxGeometry(6.4, 3.2, 3.4)), new LineBasicMaterial({ color: 0x6f86c0, transparent: true, opacity: 0.55 })), 2.9, 0, 0));
  const lensG = new Group(); scene.add(lensG);
  const lens = new Mesh(new SphereGeometry(1.3, 40, 24), new MeshStandardMaterial({ color: 0x9fd4ff, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.1, depthWrite: false }));
  lens.scale.set(0.16, 1, 1); lensG.add(lens);
  // 光圈：一片中間開孔的板子（孔徑可調）
  const stopMat = new MeshStandardMaterial({ color: 0x1b2333, side: DoubleSide, roughness: 0.8 });
  let stop = new Mesh(new RingGeometry(0.6, 1.55, 48), stopMat);
  stop.rotation.y = Math.PI / 2; at(stop, -0.28, 0, 0); scene.add(stop);

  // ---------------- 感光元件 ----------------
  // 像素數一變，就換一張新的貼圖（WebGL 上傳過的貼圖不能改大小）
  let senCanvas = null, senTex = null;
  const sensor = new Mesh(new PlaneGeometry(SEN_W, SEN_H), new MeshBasicMaterial({ side: DoubleSide }));
  function senTexture(N, M) {
    if (senCanvas && senCanvas.width === N && senCanvas.height === M) return;
    if (senTex) senTex.dispose();
    senCanvas = document.createElement('canvas'); senCanvas.width = N; senCanvas.height = M;
    senTex = new CanvasTexture(senCanvas); senTex.colorSpace = SRGBColorSpace; senTex.magFilter = NearestFilter; senTex.minFilter = NearestFilter; senTex.generateMipmaps = false;
    sensor.material.map = senTex; sensor.material.needsUpdate = true;
  }
  sensor.rotation.y = -Math.PI / 2;   // 面向鏡頭（−x）
  scene.add(sensor);
  const senFrame = new Mesh(new BoxGeometry(0.08, SEN_H + 0.16, SEN_W + 0.16), new MeshStandardMaterial({ color: 0x2b3446 }));
  scene.add(senFrame);

  // ---------------- 光線與光點 ----------------
  const rays = [];
  for (const P of PTS) for (let k = 0; k < 3; k++) {
    const l = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 0, 0), V(2, 0, 0), V(3, 0, 0)]), new LineBasicMaterial({ color: P.c, transparent: true, opacity: 0.9 }));
    l.frustumCulled = false; scene.add(l);
    const dots = [0, 1, 2].map(() => { const m = new Mesh(new SphereGeometry(0.06, 10, 8), new MeshBasicMaterial({ color: P.c })); scene.add(m); return m; });
    rays.push({ l, P, k, dots, pts: [] });
  }

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    scene: lab.add('bt-lb bt-lb-b', 'What you photograph<small>你要拍的景物</small>'),
    lens: lab.add('bt-lb bt-lb-e', 'Lens<small>鏡頭</small>'),
    hole: lab.add('bt-lb bt-lb-e', 'Tiny hole<small>小孔</small>'),
    stop: lab.add('bt-lb ip-region', 'Opening (aperture)<small>光圈</small>'),
    sensor: lab.add('bt-lb bt-lb-b', 'Sensor (upside-down picture)<small>感光元件（顛倒的影像）</small>'),
    body: lab.add('bt-lb ip-region', 'Camera, cut open<small>相機（剖開）</small>'),
    cross: lab.add('bt-lb cm-lb-x', 'Light crosses here<small>光在這裡交叉</small>'),
  };

  const R = {
    photo: $('.cm-photo'), pix: $('.cm-pix'), pixOut: $('.cm-pix-out'), count: $('.cm-count'), focus: $('.cm-focus'), light: $('.cm-light'),
    flip: $('.cm-flip'), msg: $('.cm-msg'), play: $('.al-play'), s: $('.cm-s'), sOut: $('.cm-s-out'), ap: $('.cm-ap'), apOut: $('.cm-ap-out'),
  };
  const state = { s: DI, ap: 1.2, n: 64, raw: false, pinhole: false, labels: true, playing: true, t: 0, msgKey: 'sharp', lastMsg: '', dirty: true };

  // ---------------- 影像計算 ----------------
  const work = new Uint8ClampedArray(WORK_W * WORK_H * 4);
  const workF = new Float32Array(WORK_W * WORK_H * 4);
  const photoCv = document.createElement('canvas');
  function blurWorld() { return state.pinhole ? pinholeBlur(state.ap, DO, state.s) : blurDiameter(state.ap, state.s, DI); }
  // 進光量（和光圈 1.2 的鏡頭比）；針孔進光極少，相機得把快門開很久（長曝光），這裡直接幫它乘上去
  const lightIn = () => exposure(state.ap, 1.2);
  function bright() { return state.pinhole ? Math.min(1.1, lightIn() * 250) : Math.min(1.6, lightIn()); }
  function computeImage() {
    // 1. 景物投影到感光元件：影像大小 ＝ 物體大小 × s ÷ 物距（經過鏡頭中心的光線），上下左右都顛倒
    const scale = state.s / DO;                       // 影像上 1 單位對應景物 1/scale 單位
    for (let y = 0; y < WORK_H; y++) for (let x = 0; x < WORK_W; x++) {
      const sy = ((y + 0.5) / WORK_H - 0.5) * SEN_H, sx = ((x + 0.5) / WORK_W - 0.5) * SEN_W;   // 感光元件上的座標（y 往下、x 往右）
      // 經過鏡頭中心的光線：景物 (y, z) → 感光元件 (−y, −z) × scale。從鏡頭這一側看感光元件，
      // 右邊是 +z、景物板從拍照者這一側看右邊是 −z，所以兩邊左右剛好一致，只有上下顛倒。
      const oy = sy / scale, ox = sx / scale;
      const u = 0.5 + ox / OBJ_W, v = 0.5 + oy / OBJ_H;
      const o = (y * WORK_W + x) * 4;
      if (u < 0 || u > 1 || v < 0 || v > 1) { workF[o] = 18; workF[o + 1] = 22; workF[o + 2] = 32; continue; }
      const px = Math.min(SRC.width - 1, Math.floor((1 - v) * SRC.height)) * SRC.width + Math.min(SRC.width - 1, Math.floor(u * SRC.width));
      workF[o] = srcData[px * 4]; workF[o + 1] = srcData[px * 4 + 1]; workF[o + 2] = srcData[px * 4 + 2];
    }
    // 2. 模糊：模糊圈直徑（世界單位）換成工作影像的像素
    boxBlur(workF, WORK_W, WORK_H, (blurWorld() / SEN_H) * WORK_H * 0.5);
    // 3. 亮度
    const b = bright();
    for (let i = 0; i < work.length; i += 4) { work[i] = workF[i] * b; work[i + 1] = workF[i + 1] * b; work[i + 2] = workF[i + 2] * b; work[i + 3] = 255; }
  }
  function sample(N, M, x, y) {      // 取第 (x, y) 格的平均顏色（簡化：取中心點）
    const wx = Math.min(WORK_W - 1, Math.floor((x + 0.5) / N * WORK_W)), wy = Math.min(WORK_H - 1, Math.floor((y + 0.5) / M * WORK_H));
    const o = (wy * WORK_W + wx) * 4;
    return [work[o], work[o + 1], work[o + 2]];
  }
  function renderTextures() {
    computeImage();
    const N = state.n, M = Math.round(N * 3 / 4);
    // 感光元件：倒著的影像；開「濾色片」時每格只留自己那一色
    senTexture(N, M);
    const sg = senCanvas.getContext('2d'), sd = sg.createImageData(N, M);
    for (let y = 0; y < M; y++) for (let x = 0; x < N; x++) {
      const c = sample(N, M, x, y), o = (y * N + x) * 4;
      if (state.raw) { const ch = bayer(y, x); sd.data[o] = ch === 0 ? c[0] : 0; sd.data[o + 1] = ch === 1 ? c[1] : 0; sd.data[o + 2] = ch === 2 ? c[2] : 0; }
      else { sd.data[o] = c[0]; sd.data[o + 1] = c[1]; sd.data[o + 2] = c[2]; }
      sd.data[o + 3] = 255;
    }
    sg.putImageData(sd, 0, 0);
    senTex.needsUpdate = true;
    // 右側照片：相機把影像轉正（從鏡頭側看只需上下翻回來），像素畫成方塊
    photoCv.width = N; photoCv.height = M;
    const pg = photoCv.getContext('2d'), pd = pg.createImageData(N, M);
    for (let y = 0; y < M; y++) for (let x = 0; x < N; x++) {
      const c = sample(N, M, x, M - 1 - y), o = (y * N + x) * 4;
      pd.data[o] = c[0]; pd.data[o + 1] = c[1]; pd.data[o + 2] = c[2]; pd.data[o + 3] = 255;
    }
    pg.putImageData(pd, 0, 0);
    const w = R.photo.clientWidth, h = R.photo.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w && h) {
      R.photo.width = Math.round(w * dpr); R.photo.height = Math.round(h * dpr);
      const ctx = R.photo.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(photoCv, 0, 0, R.photo.width, R.photo.height);
      if (N <= 24) {    // 像素少的時候，畫出格線
        ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1;
        for (let x = 1; x < N; x++) { const X = Math.round(x / N * R.photo.width) + 0.5; ctx.beginPath(); ctx.moveTo(X, 0); ctx.lineTo(X, R.photo.height); ctx.stroke(); }
        for (let y = 1; y < M; y++) { const Y = Math.round(y / M * R.photo.height) + 0.5; ctx.beginPath(); ctx.moveTo(0, Y); ctx.lineTo(R.photo.width, Y); ctx.stroke(); }
      }
    }
    state.dirty = false;
  }

  // ---------------- 光路 ----------------
  function updateGeometry() {
    sensor.position.set(state.s, 0, 0); senFrame.position.set(state.s + 0.07, 0, 0);
    lensG.visible = !state.pinhole;
    // 光圈板：孔徑＝光圈；針孔模式就是一片只有小孔的板子
    const inner = Math.max(0.04, state.ap / 2);
    stop.geometry.dispose(); stop.geometry = new RingGeometry(inner, 1.55, 48);
    for (const r of rays) {
      const yo = r.P.y, A = V(OBJ_X, yo, 0);
      const yl = [0, state.ap / 2 * 0.98, -state.ap / 2 * 0.98][r.k];    // 經過鏡頭（或小孔）的高度
      const B = V(0, yl, 0);
      let dir;
      if (state.pinhole) dir = B.clone().sub(A).normalize();
      else { const I = V(DI, -yo * DI / DO, 0); dir = I.clone().sub(B).normalize(); }
      const tS = (state.s - B.x) / dir.x;
      const C = B.clone().addScaledVector(dir, tS);
      const mid = B.clone().addScaledVector(dir, tS * 0.5);
      r.pts = [A, B, mid, C];
      r.l.geometry.setFromPoints(r.pts);
    }
  }
  const segLen = (pts) => { let s = 0; for (let i = 1; i < pts.length; i++) s += pts[i].distanceTo(pts[i - 1]); return s; };
  function pointAt(pts, f) {
    let d = segLen(pts) * f;
    for (let i = 1; i < pts.length; i++) {
      const l = pts[i].distanceTo(pts[i - 1]);
      if (d <= l) return pts[i - 1].clone().lerp(pts[i], d / l);
      d -= l;
    }
    return pts[pts.length - 1].clone();
  }

  function step(dt) {
    if (state.playing) state.t += dt;
    if (state.dirty) { updateGeometry(); renderTextures(); }
    for (const r of rays) r.dots.forEach((m, k) => { m.position.copy(pointAt(r.pts, ((state.t * 0.25) + k / 3) % 1)); });
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.scene, on, V(OBJ_X, OBJ_H / 2 + 0.2, 0), -16);
    show(L.lens, on && !state.pinhole && !narrow, V(0, 1.45, 0), -14);
    show(L.hole, on && state.pinhole, V(-0.28, -1.65, 0), 14);
    show(L.stop, on && !narrow && !state.pinhole, V(-0.28, -1.65, 0), 14);
    show(L.sensor, on, V(state.s, SEN_H / 2 + 0.2, 0), -16);
    show(L.body, on && !narrow, V(5.6, -1.75, 1.7), 14);
    const cross = state.pinhole ? V(-0.28, 0, 0) : V(DI, 0, 0);
    show(L.cross, on && !narrow && (state.pinhole || Math.abs(state.s - DI) > 0.25), cross.clone().add(V(0, -0.9, 0)), 0);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    const N = state.n, M = Math.round(N * 3 / 4);
    R.pixOut.textContent = `${N} × ${M}`;
    R.pix.style.setProperty('--p', `${(N - 8) / (96 - 8) * 100}%`);
    const cnt = bayerCounts(N, M);
    R.count.innerHTML = `${(N * M).toLocaleString('en-US')}<small>pixels · 像素</small> <em>R ${cnt[0].toLocaleString('en-US')} · G ${cnt[1].toLocaleString('en-US')} · B ${cnt[2].toLocaleString('en-US')}</em>`;
    const blur = blurWorld();
    R.focus.innerHTML = blur < 0.06 ? 'Sharp<small>清楚</small>' : blur < 0.2 ? 'A bit soft<small>有點糊</small>' : 'Blurry<small>模糊</small>';
    R.focus.className = `cm-focus ${blur < 0.06 ? 'ok' : blur >= 0.2 ? 'bad' : ''}`;
    const li = lightIn(); R.light.innerHTML = `${li < 0.1 ? li.toFixed(3) : li.toFixed(2)}×${state.pinhole ? '<small>long exposure 長曝光</small>' : ''}`;
    R.flip.innerHTML = 'Upside down<small>上下顛倒</small>';
    R.sOut.textContent = state.pinhole ? 'any · 都清楚' : Math.abs(state.s - DI) < 0.04 ? 'in focus · 對準' : state.s < DI ? 'too close · 太前' : 'too far · 太後';
    R.s.style.setProperty('--p', `${(state.s - 3.2) / (5.4 - 3.2) * 100}%`);
    R.apOut.textContent = state.ap < 0.15 ? 'tiny · 極小' : state.ap < 0.6 ? 'small · 小' : state.ap < 1.6 ? 'medium · 中' : 'wide · 大';
    R.ap.style.setProperty('--p', `${(state.ap - 0.04) / (2.4 - 0.04) * 100}%`);
    let key = state.msgKey;
    if (state.pinhole) key = 'pinhole';
    else if (state.raw) key = 'raw';
    else if (state.n <= 16) key = 'few';
    else if (blur >= 0.2) key = 'blurry';
    else if (lightIn() < 0.45) key = 'dark';
    else if (state.ap >= 1.8) key = 'bright';
    else key = 'sharp';
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  const dirty = () => { state.dirty = true; };
  function setS(v) { state.s = MathUtils.clamp(+v, 3.2, 5.4); R.s.value = String(state.s); dirty(); }
  function setAp(v) { state.ap = MathUtils.clamp(+v, 0.04, 2.4); R.ap.value = String(state.ap); dirty(); }
  function setN(v) { state.n = MathUtils.clamp(Math.round(+v / 4) * 4, 8, 96); R.pix.value = String(state.n); dirty(); }
  function setRaw(v) { state.raw = v; const t = $('[data-t="raw"]'); if (t) t.checked = v; dirty(); }
  function setPinhole(v) { state.pinhole = v; const t = $('[data-t="pinhole"]'); if (t) t.checked = v; dirty(); }
  R.s.addEventListener('input', () => setS(R.s.value));
  R.ap.addEventListener('input', () => setAp(R.ap.value));
  R.pix.addEventListener('input', () => setN(R.pix.value));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="raw"]', setRaw);
  bind('[data-t="pinhole"]', setPinhole);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(homePos(), homeTarget()));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 46 : 36;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(dirty).observe(R.photo);
  resize();
  camera.position.copy(homePos()); controls.target.copy(homeTarget());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setS(DI); setAp(1.2); setN(64);
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    sharp: () => { setPinhole(false); setRaw(false); setN(64); setAp(1.2); setS(DI); },
    blurry: () => { setPinhole(false); setRaw(false); setN(64); setAp(1.6); setS(5.1); },
    pixels: () => { setPinhole(false); setRaw(true); setN(12); setAp(1.2); setS(DI); },
    pinhole: () => { setRaw(false); setN(64); setPinhole(true); setAp(0.05); setS(4.2); },
  };
  // 除錯：document.querySelector('[data-cameralens-lab]').__lab
  root.__lab = {
    camera, controls, state, setS, setAp, setN, setRaw, setPinhole, DI,
    run: (sec) => { for (let t = 0; t < sec; t += 0.025) step(0.025); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-cameralens-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
