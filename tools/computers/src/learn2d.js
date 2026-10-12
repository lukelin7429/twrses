/*
 * 電腦概論 · 第十五課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initTeach(el)  [data-cp-teach]  自己當老師：在平面上點一下加一顆水果（先選蘋果或橘子），按「學」讓那條線自己調；
 *                                   可以故意放幾顆在「錯的那一邊」，看線被帶到哪裡去。點都用 SVG 元素建，不用 innerHTML。
 *   「人寫的規則，還是從例子學的？」八題用 key2d.js 的 initChoice（通用選項題）。
 */
import { errors, init, segment, stepOnce } from './learn.js';

const NS = 'http://www.w3.org/2000/svg', S = 30;      // 0–10 的刻度畫成 300×300
const el = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k of Object.keys(at)) e.setAttribute(k, at[k]); return e; };

export function initTeach(root) {
  const $ = (s) => root.querySelector(s);
  const R = { svg: $('.cp-tc-svg'), kinds: [...root.querySelectorAll('[data-kind]')], n: $('.cp-tc-n'), wrong: $('.cp-tc-wrong'), seen: $('.cp-tc-seen'), msg: $('.cp-tc-msg') };
  let pts = [], kind = 1, m = init(), learned = false;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function draw() {
    R.svg.textContent = '';
    R.svg.appendChild(el('rect', { x: 0, y: 0, width: 300, height: 300, class: 'cp-tc-bg' }));
    if (learned) {
      const s = segment(m);
      if (s) R.svg.appendChild(el('line', { x1: s[0][0] * S, y1: 300 - s[0][1] * S, x2: s[1][0] * S, y2: 300 - s[1][1] * S, class: 'cp-tc-line' }));
    }
    pts.forEach((p) => { const bad = learned && (m.a * (p.x - 5) + m.b * (p.y - 5) + m.c >= 0 ? 1 : -1) !== p.label; R.svg.appendChild(el('circle', { cx: p.x * S, cy: 300 - p.y * S, r: 9, class: `cp-tc-pt ${p.label > 0 ? 'is-a' : 'is-o'}${bad ? ' is-bad' : ''}` })); });
    R.kinds.forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-kind')) === kind ? 'true' : 'false'));
    R.n.textContent = String(pts.length); R.wrong.textContent = learned ? String(errors(m, pts)) : '—'; R.seen.textContent = learned ? String(m.seen) : '—';
  }
  function add(x, y, label = kind) { if (pts.length >= 40) return; pts.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, label }); learned = false; draw(); say('Added. Put down a few of each kind, then press Learn.', '加好了。兩種各放幾顆，再按「學」。'); }
  function learn() {
    const a = pts.filter((p) => p.label > 0).length, o = pts.length - a;
    if (!a || !o) { say('The computer needs examples of both kinds. With only one kind, there is nothing to tell apart.', '電腦需要兩種都有例子。只有一種的話，沒有東西可以分。'); return null; }
    m = init(); let clean = 0;
    while (m.seen < 400 && clean < pts.length) { const r = stepOnce(m, pts); m = r.model; clean = r.wrong ? 0 : clean + 1; }
    learned = true; draw();
    const w = errors(m, pts);
    if (w === 0) say(`After looking at ${m.seen} examples, the line separates every fruit you put down. Now add one on the “wrong” side and press Learn again.`, `看了 ${m.seen} 個例子之後，這條線把你放的每一顆水果都分對了。現在在「錯的那一邊」加一顆，再按一次「學」。`);
    else say(`The computer looked at 400 examples and still has ${w} wrong. Most likely no straight line can separate what you put down, so the line never settles. (If your two groups almost touch, it may simply need more than 400 examples.) It did not get tired: the examples do not fit any one line.`, `電腦看了 400 個例子，還是有 ${w} 顆分錯。你放的這些，很可能沒有任何一條直線分得開，所以線一直定不下來。（如果你的兩堆幾乎碰在一起，也可能只是 400 個例子還不夠。）它不是累了，是這些例子湊不成同一條線。`);
    return { seen: m.seen, wrong: w };
  }
  R.svg.addEventListener('click', (e) => { const r = R.svg.getBoundingClientRect(); add(((e.clientX - r.left) / r.width) * 10, 10 - ((e.clientY - r.top) / r.height) * 10); });
  R.kinds.forEach((b) => b.addEventListener('click', () => { kind = Number(b.getAttribute('data-kind')); draw(); }));
  $('.cp-tc-learn').addEventListener('click', () => learn());
  $('.cp-tc-clear').addEventListener('click', () => { pts = []; learned = false; draw(); say('The table is empty. Choose a fruit, then tap the square to put one down.', '桌面是空的。選一種水果，再點方框把它放下去。'); });
  draw(); say('Choose a fruit, then tap the square to put one down. Across is weight; up is how red it is.', '選一種水果，再點方框把它放下去。橫的是重量，直的是有多紅。');
  root.__teach = { add, learn, clear: () => $('.cp-tc-clear').click(), state: () => ({ n: pts.length, learned, wrong: learned ? errors(m, pts) : null, seen: m.seen, circles: R.svg.querySelectorAll('circle').length, lines: R.svg.querySelectorAll('line').length }) };
}
