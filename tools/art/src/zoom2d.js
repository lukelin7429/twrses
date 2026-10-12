/*
 * 美術 Art · 小互動「把螢幕放大看」（不需要 WebGL；畫在 2D canvas 上的示意圖）。
 * 一塊顏色放大以後，每個像素是並排的紅、綠、藍三個小燈（子像素），各自開到不同的亮度。
 * 這是畫出來的示意：真正的螢幕排法不只一種，而且你的螢幕上的點太小，肉眼看不到。
 * 除錯：document.querySelector('[data-ar-zoom]').__zoom（set([r, g, b] 0–1)、zoom(0–100)、state）
 */
import { LIGHTS, colorName, css, pct, to255 } from './color.js';

export function initZoom(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.ar-zm-cv'), ctx = cv.getContext('2d');
  const E = { x: $('.ar-zm-x'), slider: $('.ar-zm-slider'), name: $('.ar-zm-name'), bars: $$('.ar-zm-bar'), msg: $('.ar-zm-msg') };
  const state = { rgb: [1, 1, 1], z: 0 };
  const pxSize = () => 1.2 * Math.pow(175, state.z / 100);      // 一個像素畫成幾個 canvas 像素（1.2 → 210）

  function draw() {
    const W = cv.width, H = cv.height, p = pxSize(), c = state.rgb;
    ctx.fillStyle = css(c); ctx.fillRect(0, 0, W, H);
    const a = Math.min(1, Math.max(0, (p - 4) / 8));              // 放大到看得出格子才畫子像素
    if (a > 0) {
      ctx.globalAlpha = a;
      ctx.fillStyle = '#05070c'; ctx.fillRect(0, 0, W, H);
      const ox = (W / 2) % p - p, oy = (H / 2) % p - p, sw = p / 3;
      for (let y = oy; y < H; y += p) {
        for (let x = ox; x < W; x += p) {
          for (let k = 0; k < 3; k++) {
            ctx.fillStyle = css(LIGHTS[k].rgb.map((v) => v * c[k]));
            ctx.fillRect(x + k * sw + sw * 0.1, y + p * 0.06, sw * 0.8, p * 0.88);
          }
        }
      }
      ctx.globalAlpha = 1;
      if (p > 46) {
        // 把正中間那個像素框起來，三個小燈上寫 R、G、B 和亮度
        const x = W / 2 - ((W / 2 - ox) % p), y = H / 2 - ((H / 2 - oy) % p);
        ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.strokeRect(x + 1.5, y + 1.5, p - 3, p - 3);
        ctx.setLineDash([6, 5]); ctx.strokeStyle = '#000000'; ctx.strokeRect(x + 1.5, y + 1.5, p - 3, p - 3); ctx.setLineDash([]);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let k = 0; k < 3; k++) {
          const cx = x + k * sw + sw / 2;
          ctx.font = `800 ${Math.round(p * 0.17)}px system-ui, sans-serif`;
          ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.fillStyle = '#ffffff';
          ctx.strokeText(LIGHTS[k].letter, cx, y + p * 0.42); ctx.fillText(LIGHTS[k].letter, cx, y + p * 0.42);
          ctx.font = `700 ${Math.round(p * 0.1)}px system-ui, sans-serif`;
          ctx.strokeText(pct(c[k]), cx, y + p * 0.6); ctx.fillText(pct(c[k]), cx, y + p * 0.6);
        }
      }
    }
    const nm = colorName(c), [r, g, b] = to255(c);
    E.x.textContent = `${Math.max(1, Math.round(p / 1.2))}×`;
    E.name.innerHTML = `${nm.en} <span class="zh">${nm.zh}</span> <small>R ${r} · G ${g} · B ${b}</small>`;
    E.bars.forEach((el, k) => {
      el.querySelector('i').style.width = pct(c[k]);
      el.querySelector('b').textContent = pct(c[k]);
    });
    const en = p < 5 ? 'From far away you see one even color.' : p < 46 ? 'Closer up, the color breaks into columns of tiny lamps.' : 'Each pixel is three small lamps side by side: red, green, and blue. Nothing in it is ' + (nm.key === 'white' ? 'white' : nm.en.toLowerCase()) + '.';
    const zh = p < 5 ? '從遠處看，是一整片均勻的顏色。' : p < 46 ? '靠近一點，顏色變成一排一排的小燈。' : `每個像素是並排的三個小燈：紅、綠、藍。裡面沒有任何一個是${nm.zh}色的。`;
    E.msg.innerHTML = `${en}<span class="zh">${zh}</span>`;
    $$('[data-rgb]').forEach((bt) => bt.setAttribute('aria-pressed', String(bt.getAttribute('data-rgb') === to255(c).join(','))));
  }
  E.slider.addEventListener('input', () => { state.z = Number(E.slider.value); draw(); });
  $$('[data-rgb]').forEach((bt) => bt.addEventListener('click', () => {
    state.rgb = bt.getAttribute('data-rgb').split(',').map((v) => Number(v) / 255); draw();
  }));
  draw();
  root.__zoom = { state, set: (c) => { state.rgb = c.slice(); draw(); }, zoom: (z) => { state.z = z; E.slider.value = z; draw(); }, pxSize };
}
