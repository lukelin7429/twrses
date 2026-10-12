/*
 * 體育 Sports and Movement · 「哪一個姿勢最穩？」（不需要 WebGL）。
 *
 *   initStable(el)  [data-pe-stable]：每題兩到三個姿勢的剪影，選最不容易被推倒的。八題，記「第一次就答對」的題數。
 *                   答對後每個剪影下面出現支撐底面的寬度（綠色粗線）、重心（金色圓點）與「歪幾度才倒」。
 *   除錯：el.__stable（.q 第幾題、.best()、.pick(key)、.next()、.score()）
 */
import { POSES, analyze, pose } from './body.js';
import { drawFigure, drawGround, fitCanvas } from './figure2d.js';
import { QUESTIONS, answer } from './stable.js';

const ASK = {
  side: ['A gentle push comes from the side. Which pose is the hardest to tip over?', '從旁邊輕輕一推，哪一個姿勢最不容易倒？'],
  front: ['A gentle push comes from the front or the back. Which pose is the hardest to tip over?', '從前面或後面輕輕一推，哪一個姿勢最不容易倒？'],
  any: ['A gentle push could come from any side. Which pose is the hardest to tip over?', '不知道會從哪一邊被輕輕推一下。哪一個姿勢最不容易倒？'],
};
const VIEW = { front: ['Seen from the front', '從正面看'], side: ['Seen from the side', '從側面看'] };

export function initStable(root) {
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.pe-g-k'), score: $('.pe-g-score'), steps: $('.pe-g-steps'), ask: $('.pe-g-ask'), opts: $('.pe-g-opts'), msg: $('.pe-g-msg'), next: $('.pe-g-next'), again: $('.pe-g-again') };
  let q = 0, first = 0, tried = false, done = false, ans = null;

  function draw(btn, key, view, reveal, dir) {
    const cv = btn.querySelector('canvas');
    const { g, w, h } = fitCanvas(cv);
    g.clearRect(0, 0, w, h);
    const A = analyze(pose(key));
    const scale = Math.min((h - 40) / 1.5, w / 1.62);
    const o = { view, ox: w / 2, oy: h - 22, scale };
    drawGround(g, { ...o, base: A.base, com: A.com, show: reveal, w: w * 0.9 });
    drawFigure(g, A.J, o);
    if (reveal) drawGround(g, { ...o, base: A.base, com: A.com, show: true, w: 0, line: 'rgba(0,0,0,0)' });
    if (dir !== 'any' && !reveal) {     // 推的方向：一支箭頭指向胸口
      const y = o.oy - 1.02 * scale, x1 = w * 0.06, x2 = w * 0.24;
      g.strokeStyle = g.fillStyle = '#ff9d6b'; g.lineWidth = 3; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x1, y); g.lineTo(x2, y); g.stroke();
      g.beginPath(); g.moveTo(x2 + 7, y); g.lineTo(x2 - 3, y - 6); g.lineTo(x2 - 3, y + 6); g.closePath(); g.fill();
    }
  }
  function paint(reveal) {
    const Q = QUESTIONS[q];
    R.opts.querySelectorAll('.pe-g-opt').forEach((b) => draw(b, b.dataset.k, Q.view, reveal, Q.dir));
  }
  function steps() {
    R.steps.innerHTML = QUESTIONS.map((_, i) => `<i class="${i < q ? 'is-past' : i === q ? 'is-now' : ''}"></i>`).join('');
  }
  function ask() {
    const Q = QUESTIONS[q];
    ans = answer(Q); tried = false; done = false;
    R.k.textContent = `Question ${q + 1} of ${QUESTIONS.length} · 第 ${q + 1} 題（共 ${QUESTIONS.length} 題）`;
    R.ask.innerHTML = `${ASK[Q.dir][0]}<span class="zh">${ASK[Q.dir][1]}</span><small>${VIEW[Q.view][0]} · ${VIEW[Q.view][1]}</small>`;
    R.opts.className = `pe-g-opts pe-g-n${Q.poses.length}`;
    R.opts.innerHTML = Q.poses.map((k) => `<button type="button" class="pe-g-opt" data-k="${k}"><canvas aria-hidden="true"></canvas>`
      + `<span class="pe-g-lab">${POSES[k].en}<span class="zh">${POSES[k].zh}</span></span><span class="pe-g-num"></span></button>`).join('');
    R.opts.querySelectorAll('.pe-g-opt').forEach((b) => b.addEventListener('click', () => pick(b.dataset.k)));
    R.msg.innerHTML = 'Look at the feet and at how low the body is.<span class="zh">看腳怎麼站，也看身體蹲得多低。</span>';
    R.next.hidden = true; R.again.hidden = true;
    steps(); paint(false);
  }
  function pick(k) {
    if (done) return;
    const Q = QUESTIONS[q], b = R.opts.querySelector(`[data-k="${k}"]`);
    if (k !== ans.best) {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not that one. Compare how wide the feet are and how high the body is, then try again.<span class="zh">不是這一個。比一比腳張得多開、身體有多高，再選一次。</span>';
      return;
    }
    done = true;
    if (!tried) first++;
    R.score.textContent = `${first} / ${QUESTIONS.length}`;
    R.opts.querySelectorAll('.pe-g-opt').forEach((o) => {
      o.disabled = true;
      if (o.dataset.k === ans.best) o.classList.add('is-right');
      const A = analyze(pose(o.dataset.k));
      o.querySelector('.pe-g-num').innerHTML = `tips at <b>${ans.scores[o.dataset.k].toFixed(0)}°</b> · 歪 ${ans.scores[o.dataset.k].toFixed(0)}° 才倒`
        + `<small>center of gravity ${Math.round(A.com[1] * 100)} cm high · 重心高 ${Math.round(A.com[1] * 100)} 公分</small>`;
    });
    paint(true);
    R.msg.innerHTML = `${tried ? 'Yes, that is the one.' : 'Right the first time!'} ${Q.why_en}<span class="zh">${tried ? '對，就是這一個。' : '第一次就答對！'}${Q.why_zh}</span>`;
    if (q < QUESTIONS.length - 1) { R.next.hidden = false; }
    else {
      R.again.hidden = false;
      R.msg.innerHTML += `<span class="pe-g-end">You got ${first} of ${QUESTIONS.length} right on the first try. The numbers come from this page's simple model, not from a real person.<span class="zh">你第一次就答對 ${first} 題（共 ${QUESTIONS.length} 題）。這些數字來自本頁的簡化模型，不是真人量到的。</span></span>`;
    }
  }
  R.next.addEventListener('click', () => { q++; ask(); });
  R.again.addEventListener('click', () => { q = 0; first = 0; R.score.textContent = `0 / ${QUESTIONS.length}`; ask(); });
  R.score.textContent = `0 / ${QUESTIONS.length}`;
  ask();
  if (window.ResizeObserver) new ResizeObserver(() => paint(done)).observe(R.opts);
  root.__stable = { get q() { return q; }, best: () => ans.best, pick, next: () => R.next.click(), score: () => first };
}
