/*
 * 世界歷史 World History · 3D 與小互動共用的小工具（自己一份；不要 import 別的系列的檔案，esbuild 會打包進第二份 three.js）。
 *
 *   labeler(container, canvas, camera) → { add(cls, html), place(el, v, show) }  畫面上的雙語 HTML 標籤
 *   lazyBoot(selector, init, hooks)  模型快捲進畫面才初始化；頁面卡片上的 data-lab-<動作>="值" 按鈕會叫 hooks.<動作>(api, 值)
 *   each(selector, fn)               不需要 WebGL 的小互動：DOM 準備好就對每個符合的元素跑一次
 *   bi(en, zh)                       「English<span class="zh">中文</span>」
 */
import { Vector3 } from 'three';

export function labeler(container, canvas, camera) {
  const v3 = new Vector3();
  return {
    add(cls, html) {
      const s = document.createElement('span');
      s.className = `al-lab ${cls}`;
      s.innerHTML = html;
      container.appendChild(s);
      return s;
    },
    /** v：世界座標；show＝false 就藏起來（例如轉到地球背面）。 */
    place(el, v, show = true, dy = 0) {
      v3.copy(v).project(camera);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const off = !show || v3.z > 1 || Math.abs(v3.x) > 1.05 || Math.abs(v3.y) > 1.05;
      el.style.opacity = off ? 0 : 1;
      el.style.pointerEvents = off ? 'none' : '';
      if (off) return;
      const hw = el.offsetWidth / 2 + 4;
      const x = Math.min(w - hw, Math.max(hw, (v3.x * 0.5 + 0.5) * w));
      el.style.transform = `translate(${x}px, ${(-v3.y * 0.5 + 0.5) * h + dy}px) translate(-50%, -50%)`;
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
    for (const [attr, fn] of Object.entries(hooks)) {
      document.querySelectorAll(`[data-lab-${attr}]`).forEach((b) => b.addEventListener('click', (e) => {
        const lab = start();
        if (!lab) return;
        e.preventDefault();
        root.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fn(lab, b.getAttribute(`data-lab-${attr}`));
      }));
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}

export function each(selector, fn) {
  const run = () => document.querySelectorAll(selector).forEach((el) => { if (!el.__done) { el.__done = true; fn(el); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
}

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
export const readJson = (root) => JSON.parse(root.querySelector('script[type="application/json"]').textContent);
