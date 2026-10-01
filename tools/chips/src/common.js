/*
 * 晶片與半導體 · 各課 3D 模型共用的小工具（從 tools/science/src/common.js 抄來；不要 import 別的系列的檔案，esbuild 會打包進第二份 three.js）。
 *
 *   labeler(container, canvas, camera) → { add(cls, html), place(el, v, dy) }  畫面上的雙語 HTML 標籤
 *   canvasTex(draw, w, h)、glowTex(rgba)  畫在 canvas 上的貼圖（光暈、符號）
 *   polyline(points)  封閉折線，at(s, out) 依弧長取點（電線裡的電子沿著走）
 *   tube(a, b, r, mat)  兩點之間的圓柱（電線、柱子）
 *   lazyBoot(selector, init, hooks)  模型快捲進畫面才初始化；頁面卡片上的 data-lab-<動作>="值" 按鈕
 *                                    會叫 hooks.<動作>(api, 值)
 */
import { CanvasTexture, CylinderGeometry, Mesh, SRGBColorSpace, Vector3 } from 'three';

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

export function canvasTex(draw, w = 64, h = 64) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}
export const glowTex = (mid = 'rgba(255,90,70,.9)', edge = 'rgba(255,40,30,0)') => canvasTex((g) => {
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, mid); gr.addColorStop(1, edge);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
});

export function polyline(pts) {
  const segs = []; let L = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], l = a.distanceTo(b);
    segs.push({ a, b, l, s0: L }); L += l;
  }
  return {
    L, segs,
    at(s, out) {
      s = ((s % L) + L) % L;
      let k = 0; while (k < segs.length - 1 && s > segs[k].s0 + segs[k].l) k++;
      const g = segs[k];
      return out.lerpVectors(g.a, g.b, g.l ? (s - g.s0) / g.l : 0);
    },
  };
}

export function tube(a, b, r, mat) {
  const m = new Mesh(new CylinderGeometry(r, r, a.distanceTo(b), 8), mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), b.clone().sub(a).normalize());
  return m;
}
