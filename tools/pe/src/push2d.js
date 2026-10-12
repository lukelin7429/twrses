/*
 * 體育 Sports and Movement · 「推推看」（不需要 WebGL）。
 *
 *   initPush(el)  [data-pe-push]：選一個站姿、選力道，再從前、後、左、右推它。左邊是人偶的剪影（從旁邊推看正面、
 *                 從前後推看側面），右邊是從正上方看的腳印、支撐底面與重心的投影。結果記在表格裡。
 *                 這裡的「推」只是把人偶的重心歪一個固定的角度（輕 3°、中 7°、重 11°），不是真的力學模擬。
 *   除錯：el.__push（.setStance(k)、.setStrength(i)、.push('front'|'back'|'left'|'right')、.sim、.run(秒)、.table）
 */
import { analyze, pose } from './body.js';
import { drawFigure, drawGround, drawTop, fitCanvas } from './figure2d.js';
import { PUSH, createSim, swayFor } from './sim.js';

const STANCES = ['together', 'apart', 'stride', 'horse'];
const FROM = { front: ['the front', '前面'], back: ['the back', '後面'], left: ['its left', '它的左邊'], right: ['its right', '它的右邊'] };
const NAME = ['gentle', 'medium', 'firm'], NAME_ZH = ['輕輕', '中等', '用力'];

export function initPush(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const fig = $('.pe-p-fig'), map = $('.pe-p-map'), msg = $('.pe-p-msg'), viewLab = $('.pe-p-view');
  const S = createSim('together');
  let stance = 'together', strength = 1, view = 'front', busy = null, arrow = null, raf = 0, last = 0, timers = [];
  const table = {};
  STANCES.forEach((s) => { table[s] = {}; Object.keys(PUSH.from).forEach((f) => { table[s][f] = [null, null, null]; }); });

  function draw() {
    let c = fitCanvas(fig), g = c.g;
    g.clearRect(0, 0, c.w, c.h);
    const scale = Math.min((c.h - 44) / 1.5, c.w / 3.5);
    const o = { view, ox: c.w / 2, oy: c.h - 26, scale };
    drawGround(g, { ...o, base: S.A.base, com: S.com, show: true, w: c.w * 0.92 });
    drawFigure(g, S.J, o);
    drawGround(g, { ...o, base: S.A.base, com: S.com, show: true, w: 0, line: 'rgba(0,0,0,0)' });
    if (arrow) {         // 推的箭頭：畫在胸口的高度
      const side = view === 'side' ? (arrow === 'front' ? 1 : -1) : (arrow === 'left' ? 1 : -1);
      const y = o.oy - 1.0 * scale, x2 = o.ox + side * 0.2 * scale, x1 = o.ox + side * 0.52 * scale;
      g.strokeStyle = g.fillStyle = '#ff9d6b'; g.lineWidth = 4; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x1, y); g.lineTo(x2, y); g.stroke();
      g.beginPath(); g.moveTo(x2 - side * 8, y); g.lineTo(x2 + side * 3, y - 7); g.lineTo(x2 + side * 3, y + 7); g.closePath(); g.fill();
    }
    c = fitCanvas(map); g = c.g;
    g.clearRect(0, 0, c.w, c.h);
    const A = S.fall ? { ...S.A, com: S.com, inside: false } : S.A;
    drawTop(g, S.A.J, A, { ox: c.w / 2, oy: c.h / 2 - 0.03 * (c.h / 0.9), scale: Math.min(c.w, c.h) / 0.9 });
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    S.step(dt); draw();
    if (busy || S.fall || S.moving || Math.abs(S.sway.x) + Math.abs(S.sway.z) > 0.01) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
  const clear = () => { timers.forEach(clearTimeout); timers = []; };

  function cells() {
    $$('[data-cell]').forEach((td) => {
      const [f, i] = td.dataset.cell.split(':');
      const v = table[stance][f][+i];
      td.className = v === null ? '' : v ? 'is-up' : 'is-down';
      td.innerHTML = v === null ? '<span aria-label="not tried yet · 還沒試">·</span>' : v ? '<span aria-label="stayed up · 沒倒">&#10003;</span>' : '<span aria-label="tipped over · 倒了">&#10007;</span>';
    });
  }
  function setStance(k) {
    clear(); busy = null; arrow = null;
    stance = k; S.setPose(k, true);
    $$('[data-stance]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.stance === k ? 'true' : 'false'));
    const t = analyze(pose(k)).tips;
    msg.innerHTML = `This pose tips at about ${Math.min(t.left, t.right).toFixed(0)}° to the side and ${Math.min(t.front, t.back).toFixed(0)}° front to back. Guess first: from which side is it easiest to push over?`
      + `<span class="zh">這個姿勢往旁邊大約歪 ${Math.min(t.left, t.right).toFixed(0)}° 會倒，往前後大約 ${Math.min(t.front, t.back).toFixed(0)}°。先猜猜看：從哪一邊推最容易倒？</span>`;
    cells(); draw();
  }
  function setStrength(i) {
    strength = i;
    $$('[data-strength]').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.strength === i ? 'true' : 'false'));
  }
  function finish(from, i, fell) {
    table[stance][from][i] = !fell; cells();
    const deg = PUSH.strengths[i], tip = analyze(pose(stance)).tips[PUSH.from[from].tips];
    msg.innerHTML = fell
      ? `A ${NAME[i]} push from ${FROM[from][0]} tilts it ${deg}°. In that direction this pose tips at about ${tip.toFixed(0)}°, so the center of gravity passed the edge of the base and it tipped over.`
        + `<span class="zh">從${FROM[from][1]}${NAME_ZH[i]}推，讓它歪 ${deg}°。這個姿勢往那個方向大約歪 ${tip.toFixed(0)}° 就會倒，所以重心越過支撐底面的邊緣，倒了。</span>`
      : `A ${NAME[i]} push from ${FROM[from][0]} tilts it ${deg}°. In that direction this pose can lean about ${tip.toFixed(0)}° before it tips, so the center of gravity stayed over the base and it swung back.`
        + `<span class="zh">從${FROM[from][1]}${NAME_ZH[i]}推，讓它歪 ${deg}°。這個姿勢往那個方向大約可以歪 ${tip.toFixed(0)}°，所以重心還在支撐底面上方，又站回來了。</span>`;
  }
  function push(from) {
    if (busy) return;
    clear();
    if (S.fall) { S.setPose(stance, true); }
    const i = strength, o = PUSH.from[from];
    view = from === 'front' || from === 'back' ? 'side' : 'front';
    viewLab.innerHTML = view === 'side' ? 'Seen from its right side · 從它的右側看' : 'Seen from the front · 從正面看';
    busy = from; arrow = from;
    const sw = swayFor(pose(stance), o.dir, PUSH.strengths[i]);
    S.lean(sw.x, sw.z);
    kick();
    timers.push(setTimeout(() => {
      const fell = !!S.fall;
      finish(from, i, fell);
      arrow = null;
      if (!fell) { S.lean(0, 0); busy = null; kick(); }
      else timers.push(setTimeout(() => { S.standUp(); busy = null; kick(); }, 1500));
    }, 1100));
  }
  $$('[data-stance]').forEach((b) => b.addEventListener('click', () => setStance(b.dataset.stance)));
  $$('[data-strength]').forEach((b) => b.addEventListener('click', () => setStrength(+b.dataset.strength)));
  $$('[data-push]').forEach((b) => b.addEventListener('click', () => push(b.dataset.push)));
  if (window.ResizeObserver) new ResizeObserver(draw).observe(fig);
  setStrength(1); setStance('together');
  root.__push = { sim: S, table, setStance, setStrength, push, run: (sec) => { for (let t = 0; t < sec; t += 1 / 60) S.step(1 / 60); draw(); }, draw };
}
