/*
 * 家政 Life Skills at Home · 3D 流理台（每一堂廚房課共用的舞台；全部自繪，沒有品牌與包裝）。
 *
 *   createCounter({ canvas, wrap, labels, home })  → null（沒有 WebGL）或
 *     { scene, camera, controls, renderer, lab, top, render(), goHome(instant), onBand(fn), tick(dt) }
 *   makeTweens() → { add(秒, k => …, 做完), clear(), tick(dt), busy() }  一個接一個排隊的補間動畫（不靠 WebGL）
 *
 * 座標：檯面是 y = 0 的平面，x 由左到右 −6…6，z 由牆（−2.2）到前緣（+2.2）。道具都從 props.js 來，
 * 放在檯面上就是 group.position.set(x, 0, z)。課程自己的邏輯（倒、秤、讀數）寫在各課的 home-*.js，
 * 這裡只管舞台：燈、檯面、牆、鏡頭、縮放、補間動畫。
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight, Mesh, MeshStandardMaterial,
  PCFShadowMap, PerspectiveCamera, PlaneGeometry, RepeatWrapping, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler } from './common.js';

export const COUNTER = { w: 12.2, d: 4.4, h: 0.36 };
export const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
export const lerp = (a, b, k) => a + (b - a) * k;

/** 補間動畫佇列：add(秒, k => …, 做完) 一個接一個；沒有 WebGL 時照樣能跑（只是沒有畫面） */
export function makeTweens() {
  const q = [];
  return {
    add(dur, upd, done) { q.push({ dur, upd, done, t: 0 }); },
    clear() { q.length = 0; },
    busy: () => q.length > 0,
    tick(dt) {
      let left = dt;
      while (q.length && left > 0) {
        const tw = q[0];
        const use = Math.min(left, tw.dur - tw.t);
        tw.t += use; left -= use;
        if (tw.upd) tw.upd(tw.dur ? Math.min(1, tw.t / tw.dur) : 1);
        if (tw.t >= tw.dur - 1e-9) { q.shift(); if (tw.done) tw.done(); } else break;
      }
    },
  };
}

export function createCounter({ canvas, wrap, labels, home = {} }) {
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true }); } catch (e) { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  const scene = new Scene();
  scene.background = new Color(0x0b1326);
  const camera = new PerspectiveCamera(34, 1, 0.05, 200);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 4; controls.maxDistance = 30;
  controls.minPolarAngle = 0.3; controls.maxPolarAngle = Math.PI * 0.47;
  controls.minAzimuthAngle = -0.85; controls.maxAzimuthAngle = 0.85;

  scene.add(new HemisphereLight(0xe6edff, 0x231a12, 0.85));
  scene.add(new AmbientLight(0xffffff, 0.22));
  const sun = new DirectionalLight(0xfff3df, 1.35);
  sun.position.set(-4, 9, 7); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 6, bottom: -4, near: 1, far: 26 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // 檯面：木頭（淺色木紋），前緣略深；下面是深色櫃子
  const woodTex = canvasTex((g, w, h) => {
    g.fillStyle = '#d6ad74'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i++) {
      const y = Math.random() * h;
      g.strokeStyle = `rgba(${120 + Math.random() * 40 | 0}, ${82 + Math.random() * 30 | 0}, 40, ${0.08 + Math.random() * 0.14})`;
      g.lineWidth = 1 + Math.random() * 2.5;
      g.beginPath(); g.moveTo(0, y);
      g.bezierCurveTo(w * 0.3, y + (Math.random() - 0.5) * 10, w * 0.7, y + (Math.random() - 0.5) * 10, w, y + (Math.random() - 0.5) * 6);
      g.stroke();
    }
    for (let x = 0; x < w; x += w / 6) { g.fillStyle = 'rgba(90,58,24,.22)'; g.fillRect(x, 0, 2, h); }
  }, 1024, 512);
  woodTex.wrapS = woodTex.wrapT = RepeatWrapping;
  const top = new Mesh(new BoxGeometry(COUNTER.w, COUNTER.h, COUNTER.d), [
    new MeshStandardMaterial({ color: 0xa97c45, roughness: 0.7 }), new MeshStandardMaterial({ color: 0xa97c45, roughness: 0.7 }),
    new MeshStandardMaterial({ map: woodTex, roughness: 0.62 }), new MeshStandardMaterial({ color: 0x8a6233, roughness: 0.8 }),
    new MeshStandardMaterial({ color: 0xb98a50, roughness: 0.7 }), new MeshStandardMaterial({ color: 0xa97c45, roughness: 0.7 }),
  ]);
  top.position.y = -COUNTER.h / 2; top.receiveShadow = true; scene.add(top);
  const cab = new Mesh(new BoxGeometry(COUNTER.w - 0.5, 5, COUNTER.d - 0.4), new MeshStandardMaterial({ color: 0x2a3d6b, roughness: 0.85 }));
  cab.position.set(0, -COUNTER.h - 2.5, -0.1); cab.receiveShadow = true; scene.add(cab);
  const doorMat = new MeshStandardMaterial({ color: 0x35508a, roughness: 0.7 });
  const pullMat = new MeshStandardMaterial({ color: 0xd9c08a, roughness: 0.35, metalness: 0.6 });
  const zf = COUNTER.d / 2 - 0.3;                          // 櫃子的正面：四格抽屜、四片門
  for (let i = 0; i < 4; i++) {
    const x = (i - 1.5) * 2.95;
    const drawer = new Mesh(new BoxGeometry(2.7, 0.8, 0.06), doorMat); drawer.position.set(x, -COUNTER.h - 0.6, zf + 0.03); scene.add(drawer);
    const pull = new Mesh(new BoxGeometry(0.8, 0.07, 0.07), pullMat); pull.position.set(x, -COUNTER.h - 0.6, zf + 0.1); scene.add(pull);
    const door = new Mesh(new BoxGeometry(2.7, 3.3, 0.06), doorMat); door.position.set(x, -COUNTER.h - 2.85, zf + 0.03); scene.add(door);
    const knob = new Mesh(new BoxGeometry(0.07, 0.6, 0.07), pullMat); knob.position.set(x + (i % 2 ? -1.05 : 1.05), -COUNTER.h - 1.75, zf + 0.1); scene.add(knob);
  }
  const floor = new Mesh(new CircleGeometry(90, 48), new MeshStandardMaterial({ color: 0x0d1630, roughness: 1 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -COUNTER.h - 5; scene.add(floor);

  // 牆：一格一格的磁磚
  const tileTex = canvasTex((g, w, h) => {
    g.fillStyle = '#31456f'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#3d5484'; g.fillRect(5, 5, w - 10, h - 10);
    const gr = g.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, 'rgba(255,255,255,.10)'); gr.addColorStop(1, 'rgba(0,0,0,.10)');
    g.fillStyle = gr; g.fillRect(5, 5, w - 10, h - 10);
  }, 128, 128);
  tileTex.wrapS = tileTex.wrapT = RepeatWrapping; tileTex.repeat.set(21, 8);
  const wall = new Mesh(new PlaneGeometry(COUNTER.w + 12, 9.6), new MeshStandardMaterial({ map: tileTex, roughness: 0.55 }));
  wall.position.set(0, 4.8 - 0.01, -COUNTER.d / 2); wall.receiveShadow = true; scene.add(wall);

  const lab = labeler(labels, canvas, camera);
  // 鏡頭：依畫面寬高算出距離，讓整張檯面（寬 fitW）剛好放得進去；畫面越窄，看的角度越俯視
  const H = { target: [0, 0.45, 0.1], fitW: 12.1, ...home };
  let band = -1; const bandFns = [];
  let fly = null;
  function homePos() {
    const a = camera.aspect, el = (a < 1.25 ? 36 : a < 1.7 ? 30 : 25) * Math.PI / 180;
    const d = Math.min(24, Math.max(8.5, (H.fitW / 2) / (Math.tan(camera.fov * Math.PI / 360) * a)));
    return new Vector3(H.target[0], H.target[1] + Math.sin(el) * d, H.target[2] + Math.cos(el) * d);
  }
  function goHome(instant) {
    const to = homePos();
    const tg = new Vector3(...H.target);
    if (instant) { camera.position.copy(to); controls.target.copy(tg); controls.update(); return; }
    fly = { from: camera.position.clone(), to, t0: controls.target.clone(), t1: tg, k: 0 };
  }
  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1.1 ? 42 : 34;
    camera.updateProjectionMatrix();
    const b = Math.round(camera.aspect * 8);               // 寬高比變了就重新取景
    if (b !== band) { band = b; goHome(true); }
    bandFns.forEach((fn) => fn(b, w));
  }
  new ResizeObserver(resize).observe(wrap);

  function tick(dt) {
    if (fly) {
      fly.k = Math.min(1, fly.k + dt / 0.7);
      const k = ease(fly.k);
      camera.position.lerpVectors(fly.from, fly.to, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
      if (fly.k >= 1) fly = null;
    }
    controls.update();
  }
  const render = () => renderer.render(scene, camera);
  resize();
  return {
    scene, camera, controls, renderer, lab, top, render, goHome, tick, resize,
    onBand(fn) { bandFns.push(fn); if (band >= 0) fn(band, wrap.clientWidth); },
  };
}
