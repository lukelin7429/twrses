/*
 * 世界歷史 第二課〈Why Did People Start Farming? 人為什麼開始種田？〉
 * 「同一條河，兩種過日子的方法」：河的左岸是採集狩獵的一群人，右岸是早期的農村，一起過同一年。
 * 拉季節滑桿：營地跟著食物搬家、田從播種長到收割、穀倉裝滿又慢慢吃空；可以切換「歉收的一年」。
 *
 * **通用的示意，不是任何真實遺址**：地景、房屋、作物與四季（春播、夏長、秋收、冬藏）都是簡化的；
 * 存糧的長條只表示「多或少」，不是量出來的數字。頁面的說明（lab.scale_*）有寫明。
 * 同一支 bundle 帶這一頁不需要 WebGL 的小互動（平行時間軸、哪裡開始種田、分類遊戲）。
 *
 * 資料在 data/world_history.json 的 lab（seasons[4]：forager_*／farmer_* 這一季在做什麼）。
 * 除錯：document.querySelector('[data-wh-farm-lab]').__lab
 *   state、setMonth(0–12)、play(bool)、bad(bool)、demo('camp'|'field'|'granary'|'bad')、look(方位角度, 俯角, 距離, 立即?)、info()、render()
 */
import {
  AmbientLight, BoxGeometry, CapsuleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, DodecahedronGeometry, Group, HemisphereLight,
  InstancedMesh, MathUtils, Matrix4, Mesh, MeshLambertMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, bi, readJson } from './common.js';
import { season, field, granary, larder, blend, camp, part, MONTHS } from './farm.js';
import './timeline2d.js';
import './centers2d.js';
import './sort2d.js';

const SEASON_NAMES = [['spring', '春'], ['summer', '夏'], ['autumn', '秋'], ['winter', '冬']];
const THIRDS = [['Early', '初'], ['Mid', '仲'], ['Late', '晚']];
// 採集狩獵那一群：四季的營地（跟著食物走）與每一季做事的地點
const CAMPS = [[-2.3, 2.6], [-4.3, -0.6], [-6.4, 1.9], [-5.6, -3.3]];
const F_SPOTS = [
  [[-1.0, 1.6], [-1.1, 2.6], [-0.9, 3.5], [-1.2, 0.6], [-2.6, 3.4], [-3.2, 2.2], [-2.2, 2.0], [-2.8, 2.9]],          // 春：河邊捕魚、採嫩葉
  [[-3.2, 0.8], [-4.8, 1.2], [-3.6, -2.2], [-5.2, -1.6], [-2.4, -1.4], [-4.6, 0.2], [-4.0, -1.0], [-3.4, -0.2]],      // 夏：草地採種子與莓果、打獵
  [[-7.4, 0.6], [-6.8, 3.2], [-7.6, 2.4], [-5.6, 3.4], [-7.0, -0.6], [-5.4, 0.6], [-6.2, 2.4], [-6.8, 1.4]],          // 秋：樹林撿堅果
  [[-5.0, -3.0], [-6.2, -2.8], [-5.8, -3.9], [-4.6, -3.8], [-6.6, -3.6], [-3.2, -2.6], [-5.4, -2.6], [-7.2, -1.8]],   // 冬：背風處的營地，修工具、設陷阱
];
// 農村：四季做事的地點
const V_SPOTS = [
  [[3.6, 1.2], [4.8, 2.0], [6.0, 2.8], [7.2, 3.6], [6.2, -3.2], [7.4, -2.2], [5.2, 3.6], [6.8, 1.2]],                  // 春：整地、播種
  [[3.8, 2.6], [5.4, 1.2], [6.8, 3.2], [7.6, 1.8], [6.4, -1.4], [7.6, -3.4], [1.1, 1.8], [2.2, 0.9]],                  // 夏：除草、趕鳥、提水、顧羊
  [[4.2, 1.4], [4.4, 2.6], [4.6, 3.8], [6.4, -2.0], [6.6, -3.2], [4.9, -0.6], [4.4, -0.9], [5.2, 0.2]],                // 秋：收割、搬進穀倉
  [[2.6, -2.2], [3.6, -1.4], [4.4, -2.6], [3.0, -3.2], [4.9, -1.9], [2.3, 0.4], [3.4, -2.4], [4.0, -3.4]],             // 冬：磨穀子、修房子、顧羊
];
const TREE = [new Color('#8fce6a'), new Color('#4f9a45'), new Color('#d9892b'), new Color('#8c7a5e')];
const GRASS = [new Color('#9ccf74'), new Color('#86bd5e'), new Color('#aebf68'), new Color('#b4c2a0')];
const mixSeason = (arr, t, out) => { const { i, k } = season(t); return out.copy(arr[i]).lerp(arr[(i + 1) % 4], MathUtils.smoothstep(k, 0.82, 1)); };
const rnd = (seed) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space');
  const slider = $('.wh-month'), playBtn = $('.al-play');
  const state = { m: 0.4, playing: false, bad: false, badT: 0, labels: true, spin: false };
  let raf = 0, last = 0, idle = 0, visible = true;
  const SPAN = 36;                                            // 一年播幾秒

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 100);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12;
    controls.minDistance = 7; controls.maxDistance = 30; controls.maxPolarAngle = Math.PI * 0.47; controls.minPolarAngle = 0.25;
    controls.target.set(0, 0.2, 0);
    const hemi = new HemisphereLight(0xffffff, 0x6b7a52, 1.15), sun = new DirectionalLight(0xffffff, 1.5), amb = new AmbientLight(0xffffff, 0.25);
    sun.position.set(6, 10, 5);
    scene.add(hemi, sun, amb);
    const flat = (color, opt = {}) => new MeshLambertMaterial({ color, flatShading: true, ...opt });
    const world = new Group(); scene.add(world);

    // 地面、河
    const groundMat = flat('#9ccf74');
    const ground = new Mesh(new BoxGeometry(18.6, 0.5, 11.4), groundMat); ground.position.y = -0.25; world.add(ground);
    const river = new Group();
    for (let k = 0; k < 12; k++) {
      const z = -5.7 + (k + 0.5) * 0.95, x = Math.sin(z * 0.55) * 0.42;
      const seg = new Mesh(new BoxGeometry(1.25, 0.06, 0.97), flat('#3f86c9')); seg.position.set(x, 0.01, z); river.add(seg);
      const bank = new Mesh(new BoxGeometry(1.75, 0.04, 0.97), flat('#d9c98f')); bank.position.set(x, 0.0, z); river.add(bank);
    }
    world.add(river);
    const hillMat = flat('#7fae62');
    const hill = new Mesh(new DodecahedronGeometry(1.9, 1), hillMat); hill.scale.set(1.5, 0.55, 1.1); hill.position.set(-6.6, 0, -4.6); world.add(hill);

    // 樹林（左岸）與幾棵村邊的樹
    const R = rnd(11), treePos = [];
    for (let k = 0; k < 46; k++) { const x = -8.9 + R() * 3.9, z = -1.6 + R() * 6.9; treePos.push([x, z, 0.75 + R() * 0.6]); }
    for (let k = 0; k < 9; k++) treePos.push([-4.6 + R() * 3.0, -5.2 + R() * 1.4, 0.6 + R() * 0.4]);
    for (const p of [[1.7, -4.6, 0.9], [2.4, -4.9, 0.7], [8.6, 4.9, 0.8], [1.5, 4.8, 0.8], [8.7, -5.0, 0.7]]) treePos.push(p);
    const leafMat = flat('#4f9a45');
    const leaves = new InstancedMesh(new ConeGeometry(0.5, 1.25, 6), leafMat, treePos.length);
    const trunks = new InstancedMesh(new CylinderGeometry(0.08, 0.11, 0.6, 5), flat('#6e4f33'), treePos.length);
    const dummy = new Object3D();
    treePos.forEach(([x, z, s], k) => {
      dummy.position.set(x, 0.3 * s, z); dummy.scale.setScalar(s); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); trunks.setMatrixAt(k, dummy.matrix);
    });
    world.add(leaves, trunks);
    // 草地上的莓果叢
    const bushMat = flat('#5fa55a'), berryMat = flat('#c8324b');
    const berries = [];
    for (let k = 0; k < 9; k++) {
      const x = -5.0 + R() * 2.6, z = -2.6 + R() * 3.4;
      const b = new Mesh(new DodecahedronGeometry(0.28, 0), bushMat); b.position.set(x, 0.2, z); world.add(b);
      const dot = new Mesh(new SphereGeometry(0.07, 6, 5), berryMat); dot.position.set(x + 0.12, 0.42, z + 0.1); world.add(dot); berries.push(dot);
    }

    // 營地：三個半圓的棚子和一堆火，整組跟著季節搬
    const campG = new Group();
    for (const [dx, dz] of [[0, 0], [0.75, 0.35], [-0.55, 0.6]]) {
      const hut = new Mesh(new SphereGeometry(0.34, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), flat('#b98d5a')); hut.position.set(dx, 0, dz); campG.add(hut);
    }
    const fire = new Mesh(new ConeGeometry(0.11, 0.26, 5), new MeshLambertMaterial({ color: '#ff8a2a', emissive: '#ff5a00', emissiveIntensity: 0.9 })); fire.position.set(0.15, 0.13, 0.95); campG.add(fire);
    const store = new Mesh(new CylinderGeometry(0.16, 0.2, 0.3, 7), flat('#8a6a43')); store.position.set(-0.3, 0.15, -0.5); campG.add(store);   // 存糧的籃子
    world.add(campG);

    // 農村：泥磚屋、穀倉、羊圈
    for (const [x, z, w, d, ry] of [[2.6, -2.9, 1.0, 0.8, 0.1], [3.9, -3.3, 0.9, 0.9, -0.2], [3.3, -1.9, 1.1, 0.8, 0.3], [4.6, -2.3, 0.8, 0.8, 0], [2.2, -1.5, 0.8, 0.7, -0.15]]) {
      const h = new Mesh(new BoxGeometry(w, 0.62, d), flat('#d7b98a')); h.position.set(x, 0.31, z); h.rotation.y = ry; world.add(h);
      const roof = new Mesh(new BoxGeometry(w + 0.12, 0.08, d + 0.12), flat('#a98455')); roof.position.set(x, 0.66, z); roof.rotation.y = ry; world.add(roof);
    }
    const GR = [5.0, -1.25];
    const bin = new Mesh(new CylinderGeometry(0.46, 0.5, 1.15, 14, 1, true), flat('#c9a877', { side: 2, transparent: true, opacity: 0.55 })); bin.position.set(GR[0], 0.58, GR[1]); world.add(bin);
    const grainMat = flat('#e7b93c');
    const grain = new Mesh(new CylinderGeometry(0.4, 0.44, 1, 14), grainMat); grain.position.set(GR[0], 0.5, GR[1]); world.add(grain);
    const pen = new Group();
    for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; const post = new Mesh(new BoxGeometry(0.06, 0.3, 0.06), flat('#7b5a3a')); post.position.set(2.2 + Math.cos(a) * 0.75, 0.15, 0.55 + Math.sin(a) * 0.6); pen.add(post); }
    for (const [dx, dz] of [[-0.3, 0], [0.2, 0.2], [0.1, -0.25], [-0.1, 0.3]]) {
      const g = new Mesh(new BoxGeometry(0.26, 0.17, 0.13), flat('#f1ead9')); g.position.set(2.2 + dx, 0.2, 0.55 + dz); pen.add(g);
      const hd = new Mesh(new BoxGeometry(0.1, 0.1, 0.1), flat('#5b4a3a')); hd.position.set(2.2 + dx + 0.17, 0.27, 0.55 + dz); pen.add(hd);
    }
    world.add(pen);

    // 兩塊田：土、一株一株的作物（InstancedMesh）
    const FIELDS = [{ x0: 3.2, x1: 8.3, z0: 0.8, z1: 4.6, nx: 26, nz: 17 }, { x0: 5.9, x1: 8.5, z0: -4.3, z1: -0.7, nx: 13, nz: 16 }];
    const soilMat = flat('#8a6844');
    const stalkMat = flat('#ffffff');
    const stalkGeo = new BoxGeometry(0.07, 1, 0.07); stalkGeo.translate(0, 0.5, 0);
    const crops = FIELDS.map((f) => {
      const soil = new Mesh(new BoxGeometry(f.x1 - f.x0 + 0.3, 0.05, f.z1 - f.z0 + 0.3), soilMat); soil.position.set((f.x0 + f.x1) / 2, 0.025, (f.z0 + f.z1) / 2); world.add(soil);
      const im = new InstancedMesh(stalkGeo, stalkMat, f.nx * f.nz); world.add(im);
      const cells = [];
      for (let i = 0; i < f.nx; i++) for (let j = 0; j < f.nz; j++) cells.push({ x: f.x0 + (i + 0.5) * (f.x1 - f.x0) / f.nx, z: f.z0 + (j + 0.5) * (f.z1 - f.z0) / f.nz, u: i / (f.nx - 1), r: 0.8 + R() * 0.4 });
      return { im, cells };
    });

    // 人：一邊 8 個
    const personGeo = new CapsuleGeometry(0.09, 0.2, 3, 8), headGeo = new SphereGeometry(0.085, 8, 6);
    const mkPeople = (color) => Array.from({ length: 8 }, () => {
      const g = new Group();
      const body = new Mesh(personGeo, flat(color)); body.position.y = 0.2; g.add(body);
      const head = new Mesh(headGeo, flat('#c98f62')); head.position.y = 0.46; g.add(head);
      world.add(g); return g;
    });
    const foragers = mkPeople('#1f9a8a'), farmers = mkPeople('#c9632e');

    const labs = labeler($('.al-labels'), cv, camera);
    const L = {
      camp: labs.add('wh-lab wh-lab-fa', 'Foragers’ camp<i>採集狩獵者的營地</i>'),
      village: labs.add('wh-lab wh-lab-fb', 'Farming village<i>農村</i>'),
      granary: labs.add('wh-lab wh-lab-fb', 'Granary<i>穀倉</i>'),
      field: labs.add('wh-lab wh-lab-fb', 'Field<i>田</i>'),
      river: labs.add('wh-lab', 'River<i>河</i>'),
    };
    const HOME = { az: 0, el: 46, dist: 24 };
    const sph = { ...HOME }, want = { ...HOME, tx: 0, tz: 0, on: false };
    const setCam = () => {
      const a = sph.az * Math.PI / 180, e = sph.el * Math.PI / 180;
      camera.position.set(controls.target.x + sph.dist * Math.cos(e) * Math.sin(a), controls.target.y + sph.dist * Math.sin(e), controls.target.z + sph.dist * Math.cos(e) * Math.cos(a));
      camera.lookAt(controls.target);
    };
    function resize() {
      const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 45 : 36; camera.updateProjectionMatrix();
    }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('start', () => { want.on = false; root.classList.remove('al-fresh'); });
    controls.addEventListener('change', () => kick());
    const col = new Color(), col2 = new Color(), m4 = new Matrix4(), v = new Vector3();
    view = { renderer, scene, camera, controls, labs, L, sph, want, setCam, resize, world, groundMat, hillMat, leafMat, leaves, treePos, dummy, berries, campG, store, grain, grainMat, crops, foragers, farmers, sun, hemi, col, col2, m4, v, GR, soilMat };
    resize(); setCam(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History farm model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  // ── 讀數（沒有 WebGL 也照樣能用）──
  function update() {
    const p = part(state.m), [sen, szh] = SEASON_NAMES[p.season], [ten, tzh] = THIRDS[p.third];
    $('.wh-when-en').textContent = `${ten} ${sen}`;
    $('.wh-when-zh').textContent = `${tzh}${szh}`;
    slider.setAttribute('aria-valuetext', `${ten} ${sen} · ${tzh}${szh}`);
    const s = data.seasons[p.season];
    $('.wh-fa-do').innerHTML = bi(state.bad && s.forager_bad_en ? s.forager_bad_en : s.forager_en, state.bad && s.forager_bad_zh ? s.forager_bad_zh : s.forager_zh);
    $('.wh-fb-do').innerHTML = bi(state.bad && s.farmer_bad_en ? s.farmer_bad_en : s.farmer_en, state.bad && s.farmer_bad_zh ? s.farmer_bad_zh : s.farmer_zh);
    const g = granary(state.m, state.bad), l = larder(state.m, state.bad);
    $('.wh-fa-bar i').style.width = `${Math.round(l * 100)}%`; $('.wh-fb-bar i').style.width = `${Math.round(g * 100)}%`;
    $('.wh-fb-bar').classList.toggle('is-empty', g < 0.03);
    root.querySelectorAll('[data-season]').forEach((b) => b.setAttribute('aria-pressed', Number(b.dataset.season) === p.season));
    if (!view) return;
    const { m } = state, bad = state.badT;                    // badT：0–1，切換時淡入
    const V = view;
    mixSeason(GRASS, m, V.col); if (bad > 0) V.col.lerp(V.col2.set('#c2b071'), bad * MathUtils.smoothstep(m, 2.5, 5) * (m < 9 ? 1 : 0.4));
    V.groundMat.color.copy(V.col); V.hillMat.color.copy(V.col).multiplyScalar(0.86);
    mixSeason(TREE, m, V.leafMat.color);
    const se = season(m), bare = se.i === 3 ? 0.62 : se.i === 2 ? 1 - 0.38 * MathUtils.smoothstep(se.k, 0.6, 1) : se.i === 0 ? 0.62 + 0.38 * MathUtils.smoothstep(se.k, 0, 0.5) : 1;
    V.treePos.forEach(([x, z, s], k) => { V.dummy.position.set(x, (0.6 + 0.62 * bare) * s, z); V.dummy.scale.set(s * (0.75 + 0.25 * bare), s * bare, s * (0.75 + 0.25 * bare)); V.dummy.rotation.set(0, k, 0); V.dummy.updateMatrix(); V.leaves.setMatrixAt(k, V.dummy.matrix); });
    V.leaves.instanceMatrix.needsUpdate = true;
    const berry = m > 3.5 && m < 7 ? 1 : 0; V.berries.forEach((b) => { b.visible = !!berry; });
    V.sun.intensity = [1.45, 1.7, 1.35, 1.05][se.i]; V.sun.color.set(['#fff6e0', '#ffffff', '#ffe2b8', '#dfe9ff'][se.i]);
    const c = camp(m, CAMPS); V.campG.position.set(c[0], 0, c[1]);
    V.store.scale.y = 0.3 + 2.2 * l; V.store.position.y = 0.15 * V.store.scale.y;
    V.grain.scale.y = Math.max(0.02, g * 1.05); V.grain.position.y = V.grain.scale.y / 2 + 0.02; V.grain.visible = g > 0.02;
    const f = field(m, state.bad && bad > 0.5);
    V.col.set('#5fae4a').lerp(V.col2.set('#e3bf45'), f.ripe); if (f.wilt) V.col.lerp(V.col2.set('#a98f55'), f.wilt);
    const stub = V.col2.set('#b99b5a').clone();
    V.soilMat.color.set(m < 1 || m >= 8 ? '#8a6844' : '#7d6040');
    for (const { im, cells } of V.crops) {
      cells.forEach((cc, k) => {
        const sown = cc.u <= f.sown + 0.02, cut = f.cut > 0 && cc.u <= f.cut;
        const h = cut ? 0.06 : sown ? Math.max(0.03, f.h * 0.55 * cc.r) : 0.0001;
        V.dummy.position.set(cc.x, 0.05, cc.z); V.dummy.rotation.set(0, 0, 0); V.dummy.scale.set(cut ? 0.9 : 1 + f.h * 0.8, h, cut ? 0.9 : 1 + f.h * 0.8); V.dummy.updateMatrix();
        im.setMatrixAt(k, V.dummy.matrix); im.setColorAt(k, cut ? stub : f.h < 0.05 ? V.col2.set('#6b4f33') : V.col);
      });
      im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
      im.visible = m < 11.2 || f.sown > 0;                    // 冬末把殘茬翻進土裡
    }
    const bl = blend(m);
    const place = (people, spots, t) => people.forEach((p, k) => {
      const a = spots[bl.a][k], b = spots[bl.b][k];
      const x = a[0] + (b[0] - a[0]) * bl.w, z = a[1] + (b[1] - a[1]) * bl.w;
      const walking = bl.w > 0.02 && bl.w < 0.98;
      p.position.set(x + (walking ? 0 : Math.sin(t * 1.3 + k * 2.1) * 0.12), walking ? Math.abs(Math.sin(t * 9 + k)) * 0.05 : 0, z + (walking ? 0 : Math.cos(t * 1.1 + k * 1.7) * 0.12));
      p.rotation.y = walking ? Math.atan2(b[0] - a[0], b[1] - a[1]) : Math.sin(t * 0.7 + k) * 1.2;
    });
    const tt = performance.now() / 1000;
    place(V.foragers, F_SPOTS, tt); place(V.farmers, V_SPOTS, tt);
  }
  function placeLabels() {
    if (!view) return;
    const { labs, L, v, campG, GR } = view, on = state.labels;
    labs.place(L.camp, v.set(campG.position.x, 0.9, campG.position.z), on);
    labs.place(L.village, v.set(3.4, 1.25, -2.6), on);
    labs.place(L.granary, v.set(GR[0], 1.55, GR[1]), on);
    labs.place(L.field, v.set(5.8, 0.75, 2.7), on);
    labs.place(L.river, v.set(0, 0.25, 4.6), on);
  }
  function render() { if (!view) return; placeLabels(); view.renderer.render(view.scene, view.camera); }

  function setMonth(m, fromSlider) {
    state.m = ((m % MONTHS) + MONTHS) % MONTHS;
    if (!fromSlider) slider.value = Math.round(state.m * 100);
    update(); kick();
  }
  function play(on) {
    state.playing = on; root.classList.toggle('is-playing', on); root.classList.remove('al-fresh');
    playBtn.setAttribute('aria-pressed', on); playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : 'Play the year · 播放一年';
    kick();
  }
  function bad(on) {
    state.bad = on; const tg = root.querySelector('[data-t="bad"]'); if (tg) tg.checked = on;
    $('.wh-bad-note').hidden = !on; root.classList.toggle('is-bad', on);
    if (!view) state.badT = on ? 1 : 0;
    update(); kick();
  }
  /** 鏡頭：方位角、俯角、距離，以及看向地面上的哪一點（tx, tz；不給就是河谷正中央）。 */
  function look(az, el, dist, now, tx = 0, tz = 0) {
    if (!view) return;
    Object.assign(view.want, { az, el, dist, tx, tz, on: true });
    if (now) { Object.assign(view.sph, { az, el, dist }); view.controls.target.set(tx, 0.2, tz); view.want.on = false; view.setCam(); view.controls.update(); }
    kick();
  }
  const DEMOS = {
    camp: () => { bad(false); setMonth(2.3); play(true); look(-10, 44, 15, false, -4.4, 0); },
    field: () => { bad(false); setMonth(0.2); play(true); look(14, 40, 13, false, 5.6, 1.6); },
    granary: () => { bad(false); play(false); setMonth(8.1); look(20, 30, 8.5, false, 4.6, -1.2); },
    bad: () => { play(false); bad(true); setMonth(1.6); look(16, 38, 13, false, 5.0, 0.4); },
  };

  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    let busy = false;
    if (state.playing) { state.m = (state.m + dt * MONTHS / SPAN) % MONTHS; slider.value = Math.round(state.m * 100); busy = true; }
    const target = state.bad ? 1 : 0;
    if (state.badT !== target) { state.badT = Math.abs(target - state.badT) < 0.02 ? target : state.badT + (target - state.badT) * (1 - Math.exp(-dt * 4)); busy = true; }
    if (view) {
      const { want, sph, camera, controls } = view;
      if (want.on) {
        const k = 1 - Math.exp(-dt * 3.5);
        sph.az += (want.az - sph.az) * k; sph.el += (want.el - sph.el) * k; sph.dist += (want.dist - sph.dist) * k;
        controls.target.x += (want.tx - controls.target.x) * k; controls.target.z += (want.tz - controls.target.z) * k;
        if (Math.abs(want.az - sph.az) < 0.1 && Math.abs(want.dist - sph.dist) < 0.02 && Math.abs(want.tx - controls.target.x) < 0.02) want.on = false;
        view.setCam(); busy = true;
      } else {
        // 使用者自己轉過：把目前的鏡頭位置記回來，之後的 look() 才會從這裡出發
        const d = camera.position.clone().sub(controls.target);
        sph.dist = d.length(); sph.el = Math.asin(d.y / sph.dist) * 180 / Math.PI; sph.az = Math.atan2(d.x, d.z) * 180 / Math.PI;
      }
      controls.update();
    }
    update(); render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 240) raf = requestAnimationFrame(frame);   // 人物原地會晃一下，多畫幾秒再停
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  slider.addEventListener('input', () => { if (state.playing) play(false); root.classList.remove('al-fresh'); setMonth(slider.value / 100, true); });
  playBtn.addEventListener('click', () => play(!state.playing));
  root.querySelectorAll('.al-tg input').forEach((inp) => inp.addEventListener('change', () => {
    if (inp.dataset.t === 'bad') bad(inp.checked); else state[inp.dataset.t] = inp.checked;
    update(); kick();
  }));
  root.addEventListener('click', (ev) => { const b = ev.target.closest('[data-season]'); if (b) { if (state.playing) play(false); setMonth(Number(b.dataset.season) * 3 + 1.2); } });
  if (view) $('.al-home').addEventListener('click', () => look(0, 46, 24));

  const api = {
    state, data, setMonth, play, bad, look,
    demo(name) { if (DEMOS[name]) DEMOS[name](); },
    info() { return { m: state.m, part: part(state.m), bad: state.bad, granary: granary(state.m, state.bad), larder: larder(state.m, state.bad), field: field(state.m, state.bad), webgl: !!view }; },
    render() { update(); render(); },
    ready: () => true,
  };
  root.classList.add('al-fresh');
  setMonth(state.m);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-farm-lab]', init, { demo: (lab, v) => lab.demo(v) });
