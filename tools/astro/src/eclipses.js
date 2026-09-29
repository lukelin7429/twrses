/*
 * 天文教育 · 第二課「為什麼不是每個月都有日食月食？」的 3D 模型。
 *
 * 跟第一課最大的不同：這裡的日、地、月是照「真實日期」算出來的（ephem.js，Meeus 星曆），
 * 所以模型裡發生的每一次日食、月食，都是真的會（或曾經）發生的那一次。
 *
 * 畫面必須誇大才看得見，但誇大的方式要讓「會不會發生食」跟真實一致：
 *   所有「小角度」一律乘上 G（白道傾角 5.145° → 25°、天體視大小、影子張角同倍放大），
 *   距離不動。於是月影掃過地球、月亮擦過地影的「差多少」都跟真實成比例；
 *   而地球、月球表面上的明暗（日面被遮幾成）則在 shader 裡換回真實角度算，
 *   跟右側「從地球看」的兩個小畫面是同一套數字。
 *
 * 座標：同第一課。地心為原點，太陽固定在 +X，+Y 是黃道北極，月亮沿逆時針（由上往下看）繞行。
 * 產物：cd tools/astro && npm run build → assets/js/eclipses.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, CircleGeometry, Color,
  CylinderGeometry, DirectionalLight, DoubleSide, Float32BufferAttribute, Group, Line,
  LineBasicMaterial, LineDashedMaterial, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  OctahedronGeometry, PerspectiveCamera, PointLight, Scene, ShaderMaterial, SphereGeometry,
  SRGBColorSpace, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  DEG, TAU, ZH_DAY, atmosphereMaterial, glowTexture, makeEarthTextures, makeMoonTexture,
  phaseIndex, skyMoonMaterial, starField,
} from './common.js';
import * as E from './ephem.js';

const G = 25 / 5.145;                         // 小角度誇大倍數（白道傾角 5.145° → 25°）
const D0 = 10;                                // 平均地月距離（畫面單位）
const KM_D0 = 384400;
const RE_KM = 6378.14, RM_KM = 1737.4;
const RE = D0 * (RE_KM / KM_D0) * G;          // 畫面上的地球半徑 ≈ 0.81
const RM = RE * (RM_KM / RE_KM);              // 畫面上的月球半徑 ≈ 0.22
const KM_PER_T = KM_D0 / (D0 * G);            // 橫向（垂直太陽方向）1 畫面單位 = 幾公里
const DAY = 86400000, HOUR = 3600000;
const SPAN = 400 * DAY;                       // 時間軸一次顯示 400 天

const PHASES = [['New Moon', '新月（朔）'], ['Waxing Crescent', '眉月'], ['First Quarter', '上弦月'],
  ['Waxing Gibbous', '盈凸月'], ['Full Moon', '滿月（望）'], ['Waning Gibbous', '虧凸月'],
  ['Last Quarter', '下弦月'], ['Waning Crescent', '殘月']];
export const TYPE_NAMES = {
  'solar:total': ['Total solar eclipse', '日全食'],
  'solar:annular': ['Annular solar eclipse', '日環食'],
  'solar:partial': ['Partial solar eclipse', '日偏食'],
  'lunar:total': ['Total lunar eclipse', '月全食'],
  'lunar:partial': ['Partial lunar eclipse', '月偏食'],
  'lunar:penumbral': ['Penumbral lunar eclipse', '半影月食'],
};
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const WD_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function tw(d) {
  const x = new Date(d.getTime() + 8 * HOUR);
  const p = (n) => String(n).padStart(2, '0');
  return {
    y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), wd: x.getUTCDay(),
    hm: `${p(x.getUTCHours())}:${p(x.getUTCMinutes())}`,
    ymd: `${x.getUTCFullYear()}/${x.getUTCMonth() + 1}/${x.getUTCDate()}`,
    en: `${MON[x.getUTCMonth()]} ${x.getUTCDate()}, ${x.getUTCFullYear()}`,
  };
}
const kmFmt = (km) => Math.round(km / 100) * 100 >= 1000
  ? (Math.round(km / 100) * 100).toLocaleString('en-US') : String(Math.round(km / 10) * 10);

// ---------------------------------------------------------------------------
// 太空視角裡的地球與月球著色：Lambert 光照 × 「從這一點看，太陽還剩幾成」。
// 幾何在畫面空間量，換回真實角度才算遮蔽，所以日環食、日全食、半影都跟真實一致。
const OVERLAP_GLSL = `
  float overlapFrac(float a, float b, float d){
    if (d >= a + b) return 0.0;
    if (d <= abs(a - b)) return b >= a ? 1.0 : (b * b) / (a * a);
    float x = clamp((d*d + a*a - b*b) / (2.0*d*a), -1.0, 1.0);
    float y = clamp((d*d + b*b - a*a) / (2.0*d*b), -1.0, 1.0);
    float k = max(0.0, (-d + a + b) * (d + a - b) * (d - a + b) * (d + a + b));
    return (a*a*acos(x) + b*b*acos(y) - 0.5*sqrt(k)) / (3.14159265 * a*a);
  }`;
function bodyMaterial(map, kind, U, transparent = false) {
  return new ShaderMaterial({
    uniforms: { map: { value: map }, ...U },
    transparent, depthWrite: !transparent,
    vertexShader: `
      varying vec3 vW; varying vec3 vN; varying vec2 vUv;
      void main(){
        vUv = uv;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec3 moonPos; uniform float moonXkm; uniform float rS;
      uniform float kmPerT; uniform float reVis; uniform float moonDistVis; uniform float moonDistKm;
      uniform float shadowsOn;
      varying vec3 vW; varying vec3 vN; varying vec2 vUv;
      ${OVERLAP_GLSL}
      void main(){
        vec4 tex = texture2D(map, vUv);
        vec3 n = normalize(vN);
        float lam = max(dot(n, vec3(1.0, 0.0, 0.0)), 0.0);
        float cover = 0.0; float umbra = 0.0; float dRel = 0.0; float coreHit = 0.0; float coreTotal = 0.0;
        ${kind === 'earth' ? `
        // 月影落在地球上：從這一點看，月亮擋住太陽幾成
        vec3 v = vW - moonPos;
        float along = -v.x;
        if (along > 0.0) {
          float perpKm = length(v.yz) * kmPerT;
          float alongKm = moonXkm - (vW.x / reVis) * ${RE_KM.toFixed(2)};
          float rM = ${RM_KM.toFixed(1)} / alongKm;
          cover = overlapFrac(rS, rM, perpKm / alongKm);
          float core = max(abs(rS - rM) * alongKm, 260.0);
          coreHit = (1.0 - smoothstep(core * 0.8, core, perpKm)) * step(0.0, dot(n, vec3(1.0, 0.0, 0.0)));
          coreTotal = rM >= rS ? 1.0 : 0.0;
        }` : `
        // 地影落在月亮上：從這一點看，地球擋住太陽幾成
        float x = -vW.x;
        if (x > 0.0) {
          float xKm = x / moonDistVis * moonDistKm;
          float perpKm = length(vW.yz) * kmPerT;
          float rE = 1.02 * asin(${RE_KM.toFixed(2)} / xKm);
          float sep = perpKm / xKm;
          cover = overlapFrac(rS, rE, sep);
          umbra = smoothstep(0.985, 1.0, cover);
          dRel = clamp(sep / max(rE - rS, 1e-4), 0.0, 1.0);
        }`}
        cover *= shadowsOn;
        umbra *= shadowsOn;
        vec3 col = tex.rgb * (0.10 + 1.05 * lam * (1.0 - cover));
        ${kind === 'moon' ? 'col += tex.rgb * vec3(0.62, 0.2, 0.07) * (0.12 + 0.25 * dRel) * umbra * (0.35 + lam);' : ''}
        ${kind === 'earth' ? 'col = mix(col, coreTotal > 0.5 ? vec3(0.0) : vec3(1.0, 0.62, 0.18), coreHit * shadowsOn * 0.85);' : ''}
        gl_FragColor = vec4(col, tex.a);
        #include <colorspace_fragment>
      }`,
  });
}

function lineCircle(radius, a0, a1, mat, seg = 160) {
  const pts = [];
  for (let i = 0; i <= seg; i++) { const t = a0 + (a1 - a0) * (i / seg); pts.push(radius * Math.cos(t), 0, -radius * Math.sin(t)); }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pts, 3));
  const l = new Line(g, mat);
  if (mat.isLineDashedMaterial) l.computeLineDistances();
  return l;
}

// 影錐：沿 -X 方向（背對太陽）。rStart 在錐底，rEnd 在 len 處。
function shadowCone(color, opacity, rStart, rEnd, len, x0 = 0) {
  // CylinderGeometry 的 radiusTop 在 +Y；轉 90° 後 +Y 朝 -X，所以 top = 錐的遠端。
  // 從星體背面（x0）開始畫，才不會把星體本身罩在半透明錐裡。
  const m = new Mesh(new CylinderGeometry(Math.max(rEnd, 0.0001), rStart, len, 48, 1, true),
    new MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, side: DoubleSide }));
  m.rotation.z = Math.PI / 2;
  m.position.set(x0 - len / 2, 0, 0);
  m.renderOrder = 2;
  return m;
}
const K_SUN = Math.tan(0.2666 * DEG * G);     // 影錐張角（平均日面視半徑 × G）

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels');
  const moonCv = $('.ec-moon-cv'), sunCv = $('.ec-sun-cv');

  let renderer, skyRenderer;
  try {
    renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true });
    skyRenderer = new WebGLRenderer({ canvas: moonCv, antialias: true });
  } catch (e) { root.classList.add('al-nogl'); return null; }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr); skyRenderer.setPixelRatio(dpr);

  const moonTex = makeMoonTexture();
  const [earthTex, cloudTex] = makeEarthTextures();

  // 兩個 shader 共用同一組 uniform 物件：每格更新一次，地球、雲、月亮同步
  const U = {
    moonPos: { value: new Vector3(D0, 0, 0) }, moonXkm: { value: KM_D0 }, rS: { value: 0.00465 },
    kmPerT: { value: KM_PER_T }, reVis: { value: RE }, moonDistVis: { value: D0 }, moonDistKm: { value: KM_D0 },
    shadowsOn: { value: 1 },
  };

  // ================= 近看（地心、太陽固定在 +X） =================
  const scene = new Scene();
  scene.background = new Color(0x050814);
  scene.add(starField(1800, 2500, 99, 1.6));
  const camera = new PerspectiveCamera(40, 1.6, 0.05, 6000);
  const HOME = new Vector3(2.5, 13.5, 15.5);
  camera.position.copy(HOME);
  const controls = new OrbitControls(camera, spaceCv);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.minDistance = 2; controls.maxDistance = 70;

  const close = new Group();
  scene.add(close);
  const earth = new Mesh(new SphereGeometry(RE, 64, 48), bodyMaterial(earthTex, 'earth', U));
  close.add(earth);
  const clouds = new Mesh(new SphereGeometry(RE * 1.012, 48, 32), bodyMaterial(cloudTex, 'earth', U, true));
  close.add(clouds);
  const atmo = new Mesh(new SphereGeometry(RE * 1.1, 48, 32), atmosphereMaterial());
  close.add(atmo);

  // 黃道面（地球公轉的平面）
  const plane = new Mesh(new CircleGeometry(D0 * 1.45, 96),
    new MeshBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.07, side: DoubleSide, depthWrite: false }));
  plane.rotation.x = -Math.PI / 2;
  plane.renderOrder = 1;
  close.add(plane);
  close.add(lineCircle(D0 * 1.45, 0, TAU, new LineBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.35 })));

  // 月球軌道：升交點方向 = 本地 +X；繞 X 軸傾斜 25°（真實 5.1° 的 G 倍）
  const nodePivot = new Group();
  close.add(nodePivot);
  const orbitTilt = new Group();
  orbitTilt.rotation.x = 5.145 * G * DEG;
  nodePivot.add(orbitTilt);
  orbitTilt.add(lineCircle(D0, 0, Math.PI, new LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.85 })));
  orbitTilt.add(lineCircle(D0, Math.PI, TAU, new LineDashedMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.45, dashSize: 0.35, gapSize: 0.25 })));
  const nodeMat = new MeshBasicMaterial({ color: 0xffd36e });
  const nodeA = new Mesh(new OctahedronGeometry(0.2), nodeMat); nodeA.position.set(D0, 0, 0); orbitTilt.add(nodeA);
  const nodeD = new Mesh(new OctahedronGeometry(0.2), nodeMat); nodeD.position.set(-D0, 0, 0); orbitTilt.add(nodeD);
  const nodeLine = lineCircle(D0, 0, 0, new LineDashedMaterial({ color: 0xffd36e, transparent: true, opacity: 0.5, dashSize: 0.3, gapSize: 0.25 }));
  {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute([-D0, 0, 0, D0, 0, 0], 3));
    nodeLine.geometry = g; nodeLine.computeLineDistances();
  }
  nodePivot.add(nodeLine);

  const moon = new Mesh(new SphereGeometry(RM, 48, 32), bodyMaterial(moonTex, 'moon', U));
  close.add(moon);
  // 月亮到黃道面的垂線：一眼看出月亮在上方還是下方
  const dropGeo = new BufferGeometry();
  dropGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
  const drop = new Line(dropGeo, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));
  close.add(drop);

  // 影子：地球本影、半影；月球本影、半影
  const shadows = new Group();
  close.add(shadows);
  const EL = D0 * 1.35, ML = D0 * 1.08;
  const eU = shadowCone(0x000000, 0.34, RE * 1.02, RE * 1.02 - K_SUN * EL, EL, -RE * 0.98);
  const eP = shadowCone(0x000000, 0.09, RE * 1.02, RE * 1.02 + K_SUN * EL, EL, -RE * 0.98);
  const mU = shadowCone(0x000000, 0.3, RM, RM - K_SUN * ML, ML, -RM * 0.98);
  const mP = shadowCone(0x000000, 0.08, RM, RM + K_SUN * ML, ML, -RM * 0.98);
  shadows.add(eU, eP);
  const moonShadow = new Group();
  moonShadow.add(mU, mP);
  shadows.add(moonShadow);

  close.add(new AmbientLight(0xffffff, 0.1));
  const sun = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.24, 'rgba(255,190,80,.55)'], [0.5, 'rgba(255,150,40,.14)'], [1, 'rgba(255,120,20,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  sun.position.set(D0 * 2.4, 0, 0); sun.scale.setScalar(D0 * 0.95);
  close.add(sun);

  // ================= 全年俯瞰（日心） =================
  const year = new Group();
  year.visible = false;
  scene.add(year);
  const RY = 22, RR = 4.2;
  const ySun = new Mesh(new SphereGeometry(2.2, 48, 32), new MeshBasicMaterial({ color: 0xffe9a8 }));
  year.add(ySun);
  const ySunGlow = new Sprite(new SpriteMaterial({ map: sun.material.map, blending: AdditiveBlending, depthWrite: false, transparent: true }));
  ySunGlow.scale.setScalar(16); year.add(ySunGlow);
  year.add(new PointLight(0xfff4e0, 3.5, 0, 0));
  year.add(new AmbientLight(0xffffff, 0.12));
  year.add(lineCircle(RY, 0, TAU, new LineBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.4 })));
  const yPlane = new Mesh(new CircleGeometry(RY + 6, 96), plane.material);
  yPlane.rotation.x = -Math.PI / 2; year.add(yPlane);

  function makeSystem(opacity, gold) {
    const g = new Group();
    const e = new Mesh(new SphereGeometry(0.9, 32, 24),
      new MeshLambertMaterial({ map: earthTex, transparent: opacity < 1, opacity }));
    g.add(e);
    const piv = new Group(); g.add(piv);
    const tilt = new Group(); tilt.rotation.x = 5.145 * G * DEG; piv.add(tilt);
    const col = gold ? 0xffd36e : 0x4fd1c5;
    tilt.add(lineCircle(RR, 0, Math.PI, new LineBasicMaterial({ color: col, transparent: true, opacity: 0.9 * opacity })));
    tilt.add(lineCircle(RR, Math.PI, TAU, new LineDashedMaterial({ color: col, transparent: true, opacity: 0.45 * opacity, dashSize: 0.25, gapSize: 0.2 })));
    const nl = new Line(new BufferGeometry(), new LineDashedMaterial({ color: 0xffd36e, transparent: true, opacity: 0.6 * opacity, dashSize: 0.25, gapSize: 0.2 }));
    nl.geometry.setAttribute('position', new Float32BufferAttribute([-RR * 1.25, 0, 0, RR * 1.25, 0, 0], 3));
    nl.computeLineDistances();
    piv.add(nl);
    g.userData = { piv, earth: e };
    return g;
  }
  const ghosts = [0, 90, 180, 270].map((k) => { const s = makeSystem(0.55, k % 180 === 0); year.add(s); s.userData.k = k; return s; });
  const ySys = makeSystem(1, false);
  year.add(ySys);
  const yMoon = new Mesh(new SphereGeometry(0.35, 24, 16), new MeshBasicMaterial({ color: 0xe8e4da }));
  year.add(yMoon);
  const ySunLine = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.5 }));
  ySunLine.geometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
  year.add(ySunLine);
  const YEAR_CAM = new Vector3(0, 40, 34);

  // ================= 從地球看：月亮（WebGL）＋太陽（2D canvas） =================
  const sky = new Scene();
  const skyCam = new PerspectiveCamera(30, 1, 0.1, 100);
  skyCam.position.set(0, 0, 5.1);
  sky.background = new Color(0x03060f);
  const skyStars = starField(200, 40, 5, 1.2);
  sky.add(skyStars);
  const skyMoonMat = skyMoonMaterial(moonTex);
  skyMoonMat.uniforms.shadowOn.value = 1;
  const skyMoon = new Mesh(new SphereGeometry(1, 64, 48), skyMoonMat);
  skyMoon.rotation.set(0, -Math.PI / 2, 0);
  sky.add(skyMoon);
  const halo = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,250,235,.55)'], [0.35, 'rgba(255,245,225,.35)'], [0.55, 'rgba(210,220,255,.08)'], [1, 'rgba(200,210,255,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  halo.scale.set(3.6, 3.6, 1); halo.position.z = -0.5; sky.add(halo);
  const sctx = sunCv.getContext('2d');

  // ================= 狀態 =================
  const now = Date.now();
  const state = {
    t: now, w0: now - 40 * DAY, playing: false, speed: 2, view: 'close', where: 'best',
    stopAt: null, shadows: true, plane: true, events: [], seasons: [],
  };

  // ---------------- 時間軸 ----------------
  const slider = $('.ec-time'), track = $('.ec-track');
  function buildTrack() {
    track.innerHTML = '';
    const w0 = state.w0, w1 = w0 + SPAN;
    // 食季：太陽離交點 17° 以內
    let inS = false, s0 = 0;
    for (let t = w0; t <= w1 + DAY; t += DAY) {
      const on = E.nodeDistance(new Date(t)) < 17;
      if (on && !inS) { inS = true; s0 = t; }
      if ((!on || t > w1) && inS) {
        inS = false;
        const b = document.createElement('span');
        b.className = 'ec-band';
        b.style.left = `${((s0 - w0) / SPAN) * 100}%`;
        b.style.width = `${((Math.min(t, w1) - s0) / SPAN) * 100}%`;
        b.title = 'Eclipse season · 食季';
        track.appendChild(b);
      }
    }
    state.events = E.findEclipses(new Date(w0), 14).filter((e) => e.max.getTime() <= w1);
    for (const ev of state.events) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `ec-mark ec-${ev.kind}`;
      b.style.left = `${((ev.max.getTime() - w0) / SPAN) * 100}%`;
      const [en, zh] = TYPE_NAMES[`${ev.kind}:${ev.type}`];
      b.title = `${en} · ${zh} · ${tw(ev.max).ymd}`;
      b.setAttribute('aria-label', b.title);
      b.addEventListener('click', () => jumpTo(ev));
      track.appendChild(b);
    }
    // 月份刻度
    const d = new Date(w0 + 8 * HOUR);
    let m = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1) - 8 * HOUR);
    for (; m.getTime() < w1; m = new Date(Date.UTC(new Date(m.getTime() + 8 * HOUR).getUTCFullYear(), new Date(m.getTime() + 8 * HOUR).getUTCMonth() + 1, 1) - 8 * HOUR)) {
      const x = tw(m);
      const s = document.createElement('span');
      s.className = 'ec-tick' + (x.m === 1 ? ' ec-tick-y' : '');
      s.style.left = `${((m.getTime() - w0) / SPAN) * 100}%`;
      s.textContent = x.m === 1 ? String(x.y) : `${x.m}月`;
      track.appendChild(s);
    }
    slider.max = String(SPAN / HOUR);
  }
  function ensureWindow(t) {
    if (t < state.w0 || t > state.w0 + SPAN) {
      state.w0 = t - 60 * DAY;
      buildTrack();
    }
  }

  // ---------------- 更新 ----------------
  const R = {
    date: $('.ec-date'), phase: $('.ec-phase'), lunar: $('.ec-lunar'), lat: $('.ec-lat'),
    node: $('.ec-node'), season: $('.ec-season'), status: $('.ec-status'), sub: $('.ec-sub'),
    sunCap: $('.ec-sun-cap'), moonCap: $('.ec-moon-cap'),
  };
  const f = new Vector3(), right = new Vector3(), up = new Vector3(0, 1, 0), rgt = new Vector3(), uu = new Vector3();
  let cur = null;

  function update() {
    const date = new Date(state.t);
    const c = E.circumstances(date);
    cur = c;
    const e = ((c.m.lon - c.s.lon) % 360 + 360) % 360;          // 距角
    const dist = D0 * c.m.dist / KM_D0;
    const bv = c.m.lat * G * DEG;
    const er = e * DEG;
    moon.position.set(dist * Math.cos(bv) * Math.cos(er), dist * Math.sin(bv), -dist * Math.cos(bv) * Math.sin(er));
    moon.rotation.y = er + Math.PI;
    const pa = drop.geometry.attributes.position;
    pa.setXYZ(0, moon.position.x, moon.position.y, moon.position.z);
    pa.setXYZ(1, moon.position.x, 0, moon.position.z);
    pa.needsUpdate = true;
    nodePivot.rotation.y = (c.m.node - c.s.lon) * DEG;

    moonShadow.position.set(moon.position.x, moon.position.y, moon.position.z);
    moonShadow.visible = e < 90 || e > 270;                     // 月影只在月亮位於太陽這一側時畫
    shadows.visible = state.shadows;
    plane.visible = state.plane;

    U.moonPos.value.copy(moon.position);
    U.moonXkm.value = c.m.dist * Math.cos(c.beta) * Math.cos(c.dl);
    U.rS.value = c.rS;
    U.moonDistVis.value = dist;
    U.moonDistKm.value = c.m.dist;
    U.shadowsOn.value = state.shadows ? 1 : 0;

    // 全年俯瞰
    const Le = (c.s.lon + 180) * DEG;
    const ePos = new Vector3(RY * Math.cos(Le), 0, -RY * Math.sin(Le));
    ySys.position.copy(ePos);
    ySys.userData.piv.rotation.y = c.m.node * DEG;
    const ml = c.m.lon * DEG;
    yMoon.position.set(ePos.x + RR * Math.cos(bv) * Math.cos(ml), RR * Math.sin(bv), ePos.z - RR * Math.cos(bv) * Math.sin(ml));
    const sl = ySunLine.geometry.attributes.position;
    sl.setXYZ(1, ePos.x, 0, ePos.z); sl.needsUpdate = true;
    for (const g of ghosts) {
      const a = (c.m.node + g.userData.k) * DEG;
      g.position.set(RY * Math.cos(a), 0, -RY * Math.sin(a));
      g.userData.piv.rotation.y = c.m.node * DEG;
    }

    // ---- 從地球看：月亮 ----
    f.set(Math.cos(c.beta) * Math.cos(er), Math.sin(c.beta), -Math.cos(c.beta) * Math.sin(er));
    rgt.crossVectors(f, up).normalize();
    uu.crossVectors(rgt, f).normalize();
    const S = new Vector3(1, 0, 0), A = new Vector3(-1, 0, 0);
    skyMoonMat.uniforms.sunDir.value.set(S.dot(rgt), S.dot(uu), -S.dot(f));
    const illum = (1 - Math.cos(c.sepSun)) / 2;
    skyMoonMat.uniforms.earthshine.value = 0.012 + 0.05 * (1 + Math.cos(er)) / 2;
    if (A.dot(f) > 0.5) {
      skyMoonMat.uniforms.shadowCenter.value.set(A.dot(rgt) / c.rM, A.dot(uu) / c.rM);
    } else skyMoonMat.uniforms.shadowCenter.value.set(1000, 0);
    skyMoonMat.uniforms.earthR.value = (1.02 * (c.par + Math.asin(RE_KM / c.s.dist))) / c.rM;
    skyMoonMat.uniforms.sunR.value = c.rS / c.rM;
    const lunarCover = E.overlapFraction(c.rS, 1.02 * (c.par + Math.asin(RE_KM / c.s.dist)), c.sepAnti);
    halo.material.opacity = (0.12 + 0.88 * Math.pow(illum, 1.4)) * (1 - lunarCover);

    const topo = state.where === 'tw' ? E.topocentric(date) : null;
    drawSun(c, topo);
    readout(date, c, e, lunarCover, topo);
    slider.value = String((state.t - state.w0) / HOUR);
    slider.style.setProperty('--p', `${((state.t - state.w0) / SPAN) * 100}%`);
  }

  // ---- 從地球看：太陽（2D） ----
  function drawSun(c, topo) {
    const W = sunCv.width, H = sunCv.height, cx = W / 2, cy = H / 2;
    let sep, rM, rS, cover, below = false;
    if (topo) { sep = topo.sep; rM = topo.rM; rS = topo.rS; cover = topo.cover; below = topo.sunAlt < 0; }
    else { const b = E.bestSolarView(c); sep = b.sep; rM = b.rM; rS = b.rS; cover = b.cover; }
    // 月亮相對太陽的方向（北上、西在右，跟月亮畫面一致）
    const dx = -c.dl * Math.cos(c.beta), dy = c.beta;
    const len = Math.hypot(dx, dy) || 1;
    const sc = (W * 0.27) / rS;
    const mx = cx + (dx / len) * sep * sc, my = cy - (dy / len) * sep * sc;
    const total = cover > 0.999 && rM >= rS;
    const dark = below ? 1 : Math.pow(cover, 3);
    // 天空：白天藍、越遮越暗，全食時接近夜空
    const g = sctx.createLinearGradient(0, 0, 0, H);
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const top = mix([88, 146, 214], [6, 10, 26], dark), bot = mix([150, 196, 238], [14, 22, 48], dark);
    g.addColorStop(0, `rgb(${top})`); g.addColorStop(1, `rgb(${bot})`);
    sctx.fillStyle = g; sctx.fillRect(0, 0, W, H);
    if (below) {
      sctx.fillStyle = 'rgba(210,220,240,.85)';
      sctx.font = `700 ${Math.round(W * 0.052)}px Manrope, system-ui, sans-serif`;
      sctx.textAlign = 'center';
      sctx.fillText('Sun below the horizon', cx, cy - W * 0.03);
      sctx.font = `600 ${Math.round(W * 0.052)}px 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
      sctx.fillText('太陽在地平線下', cx, cy + W * 0.06);
      return;
    }
    if (total) {                                   // 日冕
      const cg = sctx.createRadialGradient(cx, cy, W * 0.25, cx, cy, W * 0.62);
      cg.addColorStop(0, 'rgba(240,244,255,.9)'); cg.addColorStop(0.25, 'rgba(210,222,255,.35)'); cg.addColorStop(1, 'rgba(200,210,255,0)');
      sctx.fillStyle = cg; sctx.fillRect(0, 0, W, H);
      sctx.strokeStyle = 'rgba(235,240,255,.22)';
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * TAU + (i % 3) * 0.07, r0 = W * 0.28, r1 = W * (0.4 + (i * 37 % 11) / 40);
        sctx.lineWidth = 1 + (i % 4);
        sctx.beginPath(); sctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); sctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); sctx.stroke();
      }
    } else {
      const glow = sctx.createRadialGradient(cx, cy, W * 0.27, cx, cy, W * 0.5);
      glow.addColorStop(0, `rgba(255,250,220,${0.55 * (1 - cover)})`); glow.addColorStop(1, 'rgba(255,250,220,0)');
      sctx.fillStyle = glow; sctx.fillRect(0, 0, W, H);
    }
    const sg = sctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.27);
    sg.addColorStop(0, '#fffdf4'); sg.addColorStop(0.75, '#fff3c4'); sg.addColorStop(1, '#ffd98a');
    sctx.fillStyle = sg;
    sctx.beginPath(); sctx.arc(cx, cy, W * 0.27, 0, TAU); sctx.fill();
    if (sep < rS + rM + rS * 0.05) {
      sctx.fillStyle = '#0b0d12';
      sctx.beginPath(); sctx.arc(mx, my, rM * sc, 0, TAU); sctx.fill();
    }
    R.sunCap.textContent = total ? 'Totality! · 全食'
      : cover > 0.001 ? `Sun covered · 日面被遮 ${Math.round(cover * 100)}%` : 'Sun · 太陽';
  }

  function readout(date, c, e, lunarCover, topo) {
    const x = tw(date);
    R.date.innerHTML = `${x.en}, ${WD_EN[x.wd]} · ${x.hm}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）${x.hm} 台灣時間</span>`;
    const [pe, pz] = PHASES[phaseIndex(e)];
    R.phase.textContent = `${pe} · ${pz}`;
    const nm = E.lastNewMoon(date);
    R.lunar.textContent = `農曆${ZH_DAY[Math.max(0, Math.min(29, E.taiwanDayNumber(date) - E.taiwanDayNumber(nm)))]}`;
    const b = c.m.lat;
    R.lat.innerHTML = Math.abs(b) < 0.05 ? 'On Earth\'s orbit plane<span>剛好在黃道面上</span>'
      : `${Math.abs(b).toFixed(1)}° ${b > 0 ? 'above' : 'below'} Earth's orbit plane<span>在黃道面${b > 0 ? '上方' : '下方'} ${Math.abs(b).toFixed(1)}°</span>`;
    const nd = E.nodeDistance(date);
    R.node.textContent = `${nd.toFixed(0)}°`;
    R.season.hidden = nd >= 17;

    // 現在有沒有食？沒有的話，差多少？
    const best = E.bestSolarView(c);
    let st = '', sub = '', cls = '';
    const nearNew = e < 25 || e > 335, nearFull = Math.abs(e - 180) < 25;
    if (nearNew && best.cover > 0.0005) {
      const type = best.axis < RE_KM ? (best.rM >= c.rS ? 'total' : 'annular') : 'partial';
      const [en, zh] = TYPE_NAMES[`solar:${type}`];
      st = `${en} · ${zh}`; cls = 'on-solar';
      sub = `The Moon's shadow is on Earth. Best view: ${Math.round(best.cover * 100)}% of the Sun covered.<span>月影正落在地球上；看得最清楚的地方，日面被遮 ${Math.round(best.cover * 100)}%。</span>`;
    } else if (nearFull && lunarCover > 0.0005) {
      const u = (c.umbra + c.rM - c.sepAnti) / (2 * c.rM);
      const type = u >= 1 ? 'total' : u > 0 ? 'partial' : 'penumbral';
      const [en, zh] = TYPE_NAMES[`lunar:${type}`];
      st = `${en} · ${zh}`; cls = 'on-lunar';
      sub = type === 'penumbral'
        ? 'The Moon is in Earth\'s faint outer shadow, the penumbra.<span>月亮只進入地球外圍的淡影（半影），肉眼不太看得出來。</span>'
        : `The Moon is inside Earth's shadow${type === 'total' ? ' and glows red' : ''}.<span>月亮正在地影裡${type === 'total' ? '，泛著紅光' : ''}。</span>`;
    } else if (nearNew) {
      const miss = best.axis - RE_KM - (RM_KM + c.m.dist * c.rS);
      st = 'No eclipse · 沒有日食';
      sub = `New moon, but its shadow misses Earth by about ${kmFmt(Math.max(0, miss))} km ${c.beta > 0 ? 'to the north' : 'to the south'}.<span>是新月，但月影從地球${c.beta > 0 ? '北方' : '南方'}約 ${kmFmt(Math.max(0, miss))} 公里處掠過。</span>`;
    } else if (nearFull) {
      const missKm = (c.sepAnti - c.penumbra - c.rM) * c.m.dist;
      st = 'No eclipse · 沒有月食';
      sub = `Full moon, but it passes ${c.beta > 0 ? 'above' : 'below'} Earth's shadow, about ${kmFmt(Math.max(0, missKm))} km clear of it.<span>是滿月，但月亮從地影${c.beta > 0 ? '上方' : '下方'}通過，離影子約 ${kmFmt(Math.max(0, missKm))} 公里。</span>`;
    } else {
      const next = e < 180 ? (180 - e) : (360 - e);
      st = 'No eclipse · 沒有日月食';
      sub = `Next ${e < 180 ? 'full' : 'new'} moon in about ${(next / 12.19).toFixed(0)} days.<span>約 ${(next / 12.19).toFixed(0)} 天後${e < 180 ? '滿月' : '新月'}。</span>`;
    }
    R.status.textContent = st;
    R.status.className = `ec-status ${cls}`;
    R.sub.innerHTML = sub;
    if (topo) {
      R.moonCap.textContent = topo.moonAlt < 0 ? 'Moon below the horizon in Taiwan · 台灣看不到（月亮在地平線下）' : 'Moon from Taiwan · 從台灣看月亮';
    } else if (e < 20 || e > 340) {
      R.moonCap.textContent = 'New moon: lost in the glare · 新月，被陽光淹沒';
    } else {
      R.moonCap.textContent = lunarCover > 0.0005 ? `Moon in Earth's shadow · 月亮進入地影` : 'Moon · 月亮';
    }
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, html) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = html; labels.appendChild(s); return s; };
  const L = {
    sun: lab('sun', '&#9728; Sun · 太陽<b>&rarr;</b>'), earth: lab('earth', 'Earth · 地球'),
    moon: lab('moon', 'Moon · 月亮'), node: lab('node', '&#9674; Node · 交點'),
    plane: lab('plane', "Earth's orbit plane · 黃道面"),
    ySeason1: lab('ysea', ''), ySeason2: lab('ysea', ''),
  };
  const proj = new Vector3();
  function place(el, v, dy = 6, show = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > 1.1 || Math.abs(proj.y) > 1.1;
    el.style.opacity = off ? 0 : 1;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  function placeSun(pos) {
    proj.copy(pos).project(camera);
    let x = proj.x, y = proj.y;
    if (proj.z > 1) { x = -x; y = -y; }
    const out = Math.abs(x) > 0.92 || Math.abs(y) > 0.9 || proj.z > 1;
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight, el = L.sun;
    el.classList.toggle('edge', out);
    let px = x, py = y;
    if (out) {
      const k = 1 / Math.max(Math.abs(x) / 0.8, Math.abs(y) / 0.84, 1e-6);
      px = x * k; py = y * k;
      el.style.setProperty('--ang', `${Math.atan2(-y, x)}rad`);
    }
    el.style.opacity = 1;
    const hw = el.offsetWidth / 2 + 8, hh = el.offsetHeight / 2 + 8;
    const sx = Math.min(w - hw, Math.max(hw, (px * 0.5 + 0.5) * w));
    const sy = Math.min(h - hh, Math.max(hh, (-py * 0.5 + 0.5) * h));
    el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, ${out ? '-50%' : '0'})`;
  }
  const tmp = new Vector3();
  function updateLabels() {
    const yr = state.view === 'year';
    if (!yr) {
      placeSun(sun.position);
      place(L.earth, tmp.set(0, -RE - 0.35, 0));
      place(L.moon, tmp.copy(moon.position).add(new Vector3(0, -RM - 0.4, 0)));
      nodeA.getWorldPosition(tmp); place(L.node, tmp.add(new Vector3(0, 0.3, 0)), -28);
      place(L.plane, tmp.set(-D0 * 1.1, 0, D0 * 0.95), 0, state.plane);
      L.ySeason1.style.opacity = L.ySeason2.style.opacity = 0;
    } else {
      placeSun(new Vector3(0, -3.2, 0));
      L.sun.classList.remove('edge');
      place(L.earth, tmp.copy(ySys.position).add(new Vector3(0, -1.4, 0)));
      L.moon.style.opacity = L.node.style.opacity = L.plane.style.opacity = 0;
      const [g1, , g3] = ghosts;
      place(L.ySeason1, tmp.copy(g1.position).add(new Vector3(0, -RR - 0.8, 0)));
      place(L.ySeason2, tmp.copy(g3.position).add(new Vector3(0, -RR - 0.8, 0)));
    }
  }
  // 全年俯瞰的食季標籤：太陽走到交點的那兩個時段
  function seasonLabels() {
    const out = [];
    const y0 = state.t - 200 * DAY;
    for (let t = y0; t < y0 + 400 * DAY && out.length < 4; t += DAY) {
      const a = E.nodeDistance(new Date(t)), b = E.nodeDistance(new Date(t + DAY)), p = E.nodeDistance(new Date(t - DAY));
      if (a <= b && a < p && a < 2) out.push(new Date(t));
    }
    // 哪一個 ghost 對應哪個日期：地球在 Ω 方向 = 太陽黃經 Ω+180
    const node = E.moonPos(new Date(state.t)).node;
    for (const [el, k] of [[L.ySeason1, 0], [L.ySeason2, 180]]) {
      const hit = out.find((d) => Math.abs(((E.sunPos(d).lon - (node + k + 180)) % 360 + 540) % 360 - 180) < 20);
      el.innerHTML = hit ? `Eclipse season · 食季<br><b>${MON[tw(hit).m - 1]} ${tw(hit).y} · ${tw(hit).y} 年 ${tw(hit).m} 月</b>` : 'Eclipse season · 食季';
    }
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const hMin = (camera.aspect < 1.1 ? 70 : 60) * DEG;
      camera.fov = Math.max(40, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    const s = moonCv.parentElement.clientWidth;
    if (s) {
      skyRenderer.setSize(s, s, false);
      sunCv.width = sunCv.height = Math.round(s * dpr);
      update();
    }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(moonCv.parentElement);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(p) {
    state.playing = p;
    root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
    if (!p) state.stopAt = null;
  }
  function setSpeed(v) {
    state.speed = v;
    $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', Math.abs(parseFloat(b.dataset.speed) - v) < 1e-6 ? 'true' : 'false'));
  }
  function setT(t) { state.t = t; ensureWindow(t); update(); }
  const camFrom = new Vector3(), camTo = new Vector3();
  let camT = 1;
  function flyTo(v) { camFrom.copy(camera.position); camTo.copy(v); camT = 0; }
  function setView(v) {
    state.view = v;
    close.visible = v === 'close'; year.visible = v === 'year';
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    controls.maxDistance = v === 'year' ? 120 : 70;
    flyTo(v === 'year' ? YEAR_CAM : HOME);
    if (v === 'year') { seasonLabels(); if (state.speed < 1) setSpeed(10); }
    root.classList.toggle('ec-yearview', v === 'year');
  }
  function jumpTo(ev, watch = false) {
    setView('close');
    const lead = 9 * HOUR;
    setT(watch ? ev.max.getTime() - lead : ev.max.getTime());
    // 日食：從月亮外側回頭看地球的白天面；月食：從月亮外側看月亮走進地影
    if (ev.kind === 'solar') flyTo(new Vector3(3.0, 1.9, 2.6));
    else flyTo(new Vector3(-16, 7, 10));
    if (watch) { setSpeed(1 / 12); state.stopAt = ev.max.getTime() + lead; setPlaying(true); }
    else setPlaying(false);
  }

  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  slider.addEventListener('input', () => { setPlaying(false); setT(state.w0 + parseFloat(slider.value) * HOUR); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.ec-where button').forEach((b) => b.addEventListener('click', () => {
    state.where = b.dataset.where;
    $$('.ec-where button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    update();
  }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="shadows"]', (v) => { state.shadows = v; });
  bind('[data-t="plane"]', (v) => { state.plane = v; });
  const step = (dirn) => {
    const from = new Date(state.t + dirn * 6 * HOUR);
    const ev = E.findEclipses(from, 1, dirn)[0];
    if (ev) jumpTo(ev);
  };
  $('.ec-next').addEventListener('click', () => step(1));
  $('.ec-prev').addEventListener('click', () => step(-1));
  $('.ec-now').addEventListener('click', () => { setPlaying(false); state.w0 = Date.now() - 40 * DAY; buildTrack(); setT(Date.now()); flyTo(state.view === 'year' ? YEAR_CAM : HOME); });
  $('.al-home').addEventListener('click', () => flyTo(state.view === 'year' ? YEAR_CAM : HOME));

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) {
      let nt = state.t + dt * state.speed * DAY;
      if (state.stopAt && nt >= state.stopAt) { nt = state.stopAt; setPlaying(false); }
      setT(nt);
      if (state.view === 'year' && Math.floor(nt / (20 * DAY)) !== Math.floor((nt - dt * state.speed * DAY) / (20 * DAY))) seasonLabels();
    }
    earth.rotation.y += dt * 0.05; clouds.rotation.y += dt * 0.06;
    if (camT < 1) {
      camT = Math.min(1, camT + dt / 0.9);
      camera.position.lerpVectors(camFrom, camTo, MathUtils.smootherstep(camT, 0, 1));
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    skyRenderer.render(sky, skyCam);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  buildTrack();
  resize();
  setT(state.t);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying, setView };   // 除錯用：$('[data-eclipse-lab]').__lab

  return { jumpTo, watch: (ev) => jumpTo(ev, true) };
}

// ---------------------------------------------------------------------------
// 即將到來的日月食（頁面下方的清單）：打開頁面的那一刻現算，永遠不會過期。
function eclipseIcon(ev) {
  const r = 20, c = 24;
  if (ev.kind === 'solar') {
    const off = ev.type === 'partial' ? 13 : 0, rm = ev.type === 'annular' ? 16 : ev.type === 'total' ? 21 : 20;
    const corona = ev.type === 'total' ? `<circle cx="${c}" cy="${c}" r="23" fill="url(#ecg${ev.max.getTime()})" opacity=".9"/>` : '';
    const gid = `ecg${ev.max.getTime()}`;
    return `<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true"><defs><radialGradient id="${gid}"><stop offset=".75" stop-color="#e8eeff"/><stop offset="1" stop-color="#e8eeff" stop-opacity="0"/></radialGradient></defs>${corona}<circle cx="${c}" cy="${c}" r="${r}" fill="#ffd98a"/><circle cx="${c + off}" cy="${c - off * 0.4}" r="${rm}" fill="#0b0d12"/></svg>`;
  }
  const fill = ev.type === 'total' ? '#a8401c' : '#e9e2cf';
  const sh = ev.type === 'partial' ? `<circle cx="${c + 16}" cy="${c - 8}" r="22" fill="#5a2310" opacity=".85"/>`
    : ev.type === 'penumbral' ? `<circle cx="${c + 14}" cy="${c}" r="24" fill="#000" opacity=".25"/>` : '';
  return `<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true"><clipPath id="ecm${ev.max.getTime()}"><circle cx="${c}" cy="${c}" r="${r}"/></clipPath><circle cx="${c}" cy="${c}" r="${r}" fill="${fill}"/><g clip-path="url(#ecm${ev.max.getTime()})">${sh}</g></svg>`;
}

function renderList(box, api) {
  const evs = E.findEclipses(new Date(), 10);
  box.innerHTML = '';
  for (const ev of evs) {
    const v = E.localVisibility(ev);
    const [en, zh] = TYPE_NAMES[`${ev.kind}:${ev.type}`];
    const x = tw(ev.max);
    let visEn, visZh, ok = v.visible;
    if (ev.kind === 'lunar') {
      const win = ev.total || ev.partial || ev.penumbral;
      const range = `${tw(win[0]).hm}–${tw(win[1]).hm}`;
      if (!v.visible) { visEn = 'Not visible from Taiwan'; visZh = '台灣看不到'; }
      else if (v.whole) { visEn = `Visible from Taiwan · ${ev.total ? 'totality' : ev.partial ? 'partial phase' : 'penumbral'} ${range}`; visZh = `台灣全程可見（${ev.total ? '全食' : ev.partial ? '偏食' : '半影食'} ${range}）`; }
      else { visEn = `Partly visible from Taiwan (${v.atMax ? 'Moon sets' : 'Moon rises'} during the eclipse)`; visZh = `台灣可見一部分（月${v.atMax ? '落' : '出'}時正在食中）`; }
    } else if (v.visible) {
      visEn = `Partial from Taiwan · up to ${Math.max(1, Math.round(v.cover * 100))}% covered at ${tw(v.max).hm}`;
      visZh = `台灣看得到偏食，${tw(v.max).hm} 最多遮住 ${Math.max(1, Math.round(v.cover * 100))}%`;
    } else { visEn = 'Not visible from Taiwan'; visZh = '台灣看不到'; }
    const card = document.createElement('article');
    card.className = `ecl-card ecl-${ev.kind}${ok ? ' ecl-tw' : ''}`;
    card.innerHTML = `<div class="ecl-ico">${eclipseIcon(ev)}</div>
      <div class="ecl-body"><p class="ecl-date">${x.en} · ${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）</p>
      <h3>${en}<span class="zh">${zh}</span></h3>
      <p class="ecl-vis"><b>${ok ? '✓' : '✗'}</b>${visEn}<span class="zh">${visZh}</span></p>
      <p class="ecl-max">Maximum ${x.hm} Taiwan time · 食甚 ${x.hm}（台灣時間）</p>
      <button type="button" class="ph-go">Watch it in 3D · 在模型中看 <i>&uarr;</i></button></div>`;
    card.querySelector('button').addEventListener('click', () => { if (api()) { api().watch(ev); document.querySelector('[data-eclipse-lab]').scrollIntoView({ behavior: 'smooth', block: 'center' }); } });
    box.appendChild(card);
  }
}

function boot() {
  const root = document.querySelector('[data-eclipse-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const list = document.querySelector('[data-eclipse-list]');
  if (list) renderList(list, start);
  // 「日月食的種類」卡片：找下一次這一種
  document.querySelectorAll('[data-next-type]').forEach((b) => b.addEventListener('click', () => {
    const [kind, type] = b.getAttribute('data-next-type').split(':');
    const ev = E.findEclipses(new Date(), 60).find((x) => x.kind === kind && x.type === type);
    const lab = start();
    if (!ev || !lab) return;
    lab.watch(ev);
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
