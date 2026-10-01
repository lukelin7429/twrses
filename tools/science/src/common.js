/*
 * 萬物原理 · 各課 3D 模型共用的小工具（從 tools/body/src/common.js 抄來的兩個，免得把骨架資料一起打包進來）。
 *
 *   labeler(container, canvas, camera) → { add(cls, html), place(el, v, dy) }  畫面上的雙語 HTML 標籤
 *   lazyBoot(selector, init, hooks)  模型快捲進畫面才初始化；頁面卡片上的 data-lab-<動作>="值" 按鈕
 *                                    會叫 hooks.<動作>(api, 值)
 */
import { Vector3 } from 'three';

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
