/*
 * 地理 Geography · 立體的台灣（第九課起的台灣各課共用）：真實的台灣本島地形（taiwan.js）＋相機、轉動、地名標籤、點地形。
 *
 *   const tw = makeTaiwan3D({ cv, wrap, labelsEl, T, labels, onPick })
 *   tw.scene / camera / controls / terrain / renderer
 *   tw.toW(e, n, z)            TM2 公里＋海拔公尺 → 世界座標（一單位＝10 公里，高度放大 VEX 倍）
 *   tw.surface(e, n, lift)     地表上那一點的世界座標（海就用 0 公尺），lift＝再浮起來多少世界單位
 *   tw.look(k)                 視角：'south' 'west' 'east' 'top'，或 tw.addView(k, [位置, 目標])
 *   tw.render()                畫一格（含標籤）；tw.resize()
 *   tw.showLabels(on)
 * labels：[[places 的 key 或 'yushan', en, zh], …]，順序＝優先順序（重疊時先留前面的，CSS 要 transition: none）
 */
import { AmbientLight, DirectionalLight, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler } from './common.js';
import { makeTerrain } from './terrain3d.js';
import { heightAt } from './taiwan.js';
import { twColor } from './twmap2d.js';

export const VEX = 5;                 // 高度放大倍數（頁面上要寫）
export const U = 10;                  // 一個世界單位＝10 公里

export function makeTaiwan3D({ cv, wrap, labelsEl, T, labels = [], labelClass = 'gg-tw3-lab', onPick = null }) {
  const renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x07101f, 1);
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 400);
  scene.add(new AmbientLight(0xbfcbe6, 0.85));
  const sun = new DirectionalLight(0xffffff, 1.6); sun.position.set(-20, 30, -14); scene.add(sun);
  const eC = T.e0 + T.nx / 2, nC = T.n0 + T.ny / 2;
  const M = { box: [-T.nx / 2 / U, -T.ny / 2 / U, T.nx / 2 / U, T.ny / 2 / U], h: (x, y) => { const z = heightAt(T, eC + x * U, nC + y * U); return Number.isNaN(z) ? -60 : z; } };
  const terrain = makeTerrain({ M, n: T.nx, ny: T.ny, exag: VEX / U, color: twColor, sea: -60 });
  terrain.show('lines', false);
  scene.add(terrain.group);
  const toW = (e, n, z) => terrain.toWorld((e - eC) / U, (n - nC) / U, z);
  const surface = (e, n, lift = 0) => { const z = heightAt(T, e, n), v = toW(e, n, Number.isNaN(z) ? 0 : z); v.y += lift; return v; };

  const controls = new OrbitControls(camera, cv);
  controls.enablePan = true; controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 6; controls.maxDistance = 80;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  const labs = labeler(labelsEl, cv, camera);
  const tags = labels.map(([k, en, zh]) => ({ k, el: labs.add(`gg-lab ${labelClass}${k === 'yushan' ? ' is-peak' : ''}`, k === 'yushan' ? `${en} <i>${zh}</i> <b>3,952 m</b>` : `${en} <i>${zh}</i>`) }));
  let labelsOn = true;
  const P = new Vector3();
  function placeLabels() {
    const boxes = [];
    for (const t of tags) {
      const p = t.k === 'yushan' ? T.peak : T.places[t.k];
      P.copy(surface(p.e, p.n, 0.15));
      labs.place(t.el, P, -10);
      if (!labelsOn) { t.el.style.opacity = 0; continue; }
      if (t.el.style.opacity === '0') continue;
      const r = t.el.getBoundingClientRect();
      if (boxes.some((b) => r.left < b.right + 4 && r.right > b.left - 4 && r.top < b.bottom + 2 && r.bottom > b.top - 2)) t.el.style.opacity = 0;
      else boxes.push(r);
    }
  }
  function resize() { const w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  function render() { renderer.render(scene, camera); placeLabels(); }
  const VIEWS = {
    south: [new Vector3(6, 24, 42), new Vector3(0, 0, 0)],
    west: [new Vector3(-24, 10, 8), new Vector3(0, 0, -1)],
    east: [new Vector3(24, 9, 8), new Vector3(0, 0, -1)],
    top: [new Vector3(0, 52, 0.5), new Vector3(0, 0, 0)],
  };
  function look(k) {
    const [p, t] = VIEWS[k]; camera.position.copy(p); controls.target.copy(t);
    const w = wrap.clientWidth, h = wrap.clientHeight; if (w / h < 1) camera.position.sub(t).multiplyScalar(1.35).add(t);
    camera.lookAt(t); controls.update();
  }
  // 點地形
  const ray = new Raycaster(), ndc = new Vector2();
  let down = null;
  cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
  cv.addEventListener('pointerup', (e) => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
    down = null;
    if (!onPick) return;
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(terrain.mesh)[0];
    if (hit) { const [x, y] = terrain.fromWorld(hit.point); onPick(eC + x * U, nC + y * U); }
  });
  look('south'); resize();
  return {
    scene, camera, controls, terrain, renderer, toW, surface, look, render, resize, eC, nC,
    addView(k, v) { VIEWS[k] = v; },
    worldOf: (e, n) => new Vector3((e - eC) / U, 0, -(n - nC) / U),
    showLabels(on) { labelsOn = on; },
  };
}
