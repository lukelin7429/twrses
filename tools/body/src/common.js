/*
 * 人體探索 · 各課 3D 模型共用的小工具（第二課起使用；第一課 skeleton.js 自己有一份較早的寫法）。
 *
 *   loadBones(url, onProgress) → Promise<{ model, bones }>
 *       載入 assets/models/skeleton.glb（BodyParts3D，座標：公尺、Y 朝上、臉朝 +Z、腳底 y = 0；
 *       身體的右邊在 -X）。bones: id → { mesh, mat, box, center, info }，每塊骨頭一個獨立材質。
 *   loadOrgans(url) → Promise<{ model, parts }>  真實器官（第十三課起），parts: name → { mesh, mat, box, center }
 *   worldVerts(mesh, filter) 取出一塊骨頭的世界座標頂點（找關節中心之類用）
 *   labeler(container, canvas, camera) → { add(cls, html), place(el, v, dy) }
 *   lazyBoot(selector, init) 模型快捲進畫面才初始化
 */
import { Box3, Color, MeshStandardMaterial, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { buildBones } from './bones.js';

export const IVORY = new Color(0xeee4cf);
const BY_ID = new Map(buildBones().map((b) => [b.id, b]));

export function loadBones(url, onProgress) {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  return new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      const model = gltf.scene;
      model.updateMatrixWorld(true);
      const bones = new Map();
      model.traverse((o) => {
        if (!o.isMesh) return;
        const info = BY_ID.get(o.name) || BY_ID.get(o.parent?.name);
        if (!info) return;
        o.geometry.computeVertexNormals();
        const mat = new MeshStandardMaterial({ color: IVORY.clone(), roughness: 0.62, metalness: 0, transparent: true });
        o.material = mat;
        o.userData.id = info.id;
        const box = new Box3().setFromObject(o);
        bones.set(info.id, { mesh: o, mat, box, center: box.getCenter(new Vector3()), info });
      });
      resolve({ model, bones });
    }, (e) => { if (e.total && onProgress) onProgress(e.loaded / e.total); }, reject);
  });
}

// 載入 assets/models/organs.glb（真實器官：r-kidney、l-kidney、r-ureter、l-ureter、bladder、tongue），座標與骨架對齊。
// 回傳 name → { mesh, mat, box, center }，每個器官一個獨立材質。
export function loadOrgans(url) {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  return new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      const model = gltf.scene;
      model.updateMatrixWorld(true);
      const parts = new Map();
      model.traverse((o) => {
        if (!o.isMesh) return;
        const name = o.name || o.parent?.name;
        o.geometry.computeVertexNormals();
        const mat = new MeshStandardMaterial({ color: 0xb4483c, roughness: 0.55, metalness: 0 });
        o.material = mat;
        const box = new Box3().setFromObject(o);
        parts.set(name, { mesh: o, mat, box, center: box.getCenter(new Vector3()) });
      });
      resolve({ model, parts });
    }, undefined, reject);
  });
}

export function worldVerts(mesh, filter = () => true) {
  const pos = mesh.geometry.attributes.position;
  const out = [];
  for (let k = 0; k < pos.count; k++) {
    const v = new Vector3().fromBufferAttribute(pos, k).applyMatrix4(mesh.matrixWorld);
    if (filter(v)) out.push(v);
  }
  return out;
}

export function average(vs) {
  const c = new Vector3();
  for (const v of vs) c.add(v);
  return c.multiplyScalar(1 / Math.max(1, vs.length));
}

export function labeler(container, canvas, camera) {
  const proj = new Vector3();
  return {
    add(cls, html) {
      const s = document.createElement('span');
      s.className = `al-lab ${cls}`;
      s.innerHTML = html;
      container.appendChild(s);
      return s;
    },
    place(el, v, dy = 0) {
      proj.copy(v).project(camera);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const off = proj.z > 1 || Math.abs(proj.x) > 1.1 || Math.abs(proj.y) > 1.1;
      el.style.opacity = off ? 0 : 1;
      const hw = el.offsetWidth / 2 + 6;
      const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
      el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, -50%)`;
    },
  };
}

export function lazyBoot(selector, init, hooks = {}) {
  const boot = () => {
    const root = document.querySelector(selector);
    if (!root) return;
    let api = null, started = false;
    const start = () => { if (!started) { started = true; api = init(root); } return api; };
    const io = new IntersectionObserver((ents) => {
      if (ents[0].isIntersecting) { io.disconnect(); start(); }
    }, { rootMargin: '600px' });
    io.observe(root);
    // 頁面下方卡片的「在模型中看」按鈕：data-lab-xxx="值" → hooks.xxx(api, 值)
    for (const [attr, fn] of Object.entries(hooks)) {
      document.querySelectorAll(`[data-lab-${attr}]`).forEach((b) => b.addEventListener('click', (e) => {
        const lab = start();
        if (!lab) return;
        e.preventDefault();
        root.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const v = b.getAttribute(`data-lab-${attr}`);
        const go = () => (lab.ready() ? fn(lab, v) : setTimeout(go, 150));
        go();
      }));
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
