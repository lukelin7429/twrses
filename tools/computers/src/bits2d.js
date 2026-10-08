/*
 * 電腦概論 · 位元引擎裡不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initFingers(el)   [data-cp-fingers]  用五根手指數到 31：點手指，看數字與算式；還有「比出某個數」的小挑戰
 *   initGuess(el)     [data-cp-guess]    猜猜這是多少：八題（4 位 ×3、5 位 ×3、8 位 ×2），記第一次就答對的題數
 *   initLevels(el)    [data-cp-levels]   為什麼不用十種亮度：同樣的雜訊，十階常讀錯、開和關不會（示意）
 *   drawMinis()       canvas.cp-mini[data-bits="00001101"]  卡片上的一排小燈
 */
import { countMisreads, fromBits, levelValues, makeRound, margin, maxValue, mulberry32, placeValue, sumText, toBits } from './bits.js';

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;

export function initFingers(root) {
  const btns = [...root.querySelectorAll('[data-finger]')];
  const bits = btns.map(() => 0);
  const out = { num: root.querySelector('.cp-fg-num'), eq: root.querySelector('.cp-fg-eq'), bin: root.querySelector('.cp-fg-bin'), goal: root.querySelector('.cp-fg-goal'), msg: root.querySelector('.cp-fg-msg') };
  const rng = mulberry32(seed());
  let goal = 19, solved = false;
  function show() {
    btns.forEach((b) => { const i = Number(b.getAttribute('data-finger')); b.setAttribute('aria-pressed', bits[i] ? 'true' : 'false'); });
    const v = fromBits(bits);
    out.num.textContent = String(v);
    out.eq.textContent = sumText(bits);
    out.bin.textContent = bits.slice().reverse().join('');
    const hit = v === goal;
    root.classList.toggle('cp-fg-hit', hit);
    if (hit && !solved) { solved = true; out.msg.innerHTML = `Yes! That is ${goal}.<span class="zh">答對了！這就是 ${goal}。</span>`; }
    else if (!hit) { solved = false; out.msg.innerHTML = v > goal ? `Too many: you have ${v}.<span class="zh">太多了：現在是 ${v}。</span>` : `Keep going: you have ${v}.<span class="zh">還不夠：現在是 ${v}。</span>`; }
  }
  function newGoal() {
    let g = goal;
    while (g === goal || g === fromBits(bits)) g = 1 + Math.floor(rng() * maxValue(bits.length));
    goal = g; solved = false; out.goal.textContent = String(goal); show();
  }
  btns.forEach((b) => b.addEventListener('click', () => { const i = Number(b.getAttribute('data-finger')); bits[i] = bits[i] ? 0 : 1; show(); }));
  root.querySelector('.cp-fg-new').addEventListener('click', newGoal);
  root.querySelector('.cp-fg-clear').addEventListener('click', () => { bits.fill(0); show(); });
  out.goal.textContent = String(goal);
  show();
  root.__fingers = { bits, set: (n) => { toBits(n, bits.length).forEach((b, i) => { bits[i] = b; }); show(); }, goal: () => goal };
}

const WIDTHS = [4, 4, 4, 5, 5, 5, 8, 8];

export function initGuess(root) {
  const R = { lights: root.querySelector('.cp-gs-lights'), opts: root.querySelector('.cp-gs-opts'), k: root.querySelector('.cp-gs-k'), msg: root.querySelector('.cp-gs-msg'), score: root.querySelector('.cp-gs-score'), next: root.querySelector('.cp-gs-next'), hint: root.querySelector('[data-t="values"]') };
  let rng, q, round, first, tried, done;
  function lights() {
    R.lights.innerHTML = '';
    R.lights.style.setProperty('--n', String(round.bits.length));
    for (let i = round.bits.length - 1; i >= 0; i--) {
      const d = el('span', `cp-lamp${round.bits[i] ? ' is-on' : ''}`, `<i></i><small>${placeValue(i)}</small>`);
      R.lights.appendChild(d);
    }
    R.lights.setAttribute('aria-label', `${round.bits.slice().reverse().map((b) => (b ? 'on' : 'off')).join(', ')} · ${round.bits.slice().reverse().map((b) => (b ? '亮' : '暗')).join('、')}`);
  }
  function ask() {
    round = makeRound(rng, WIDTHS[q]); tried = false; done = false;
    lights();
    R.k.innerHTML = `Question ${q + 1} of ${WIDTHS.length} · 第 ${q + 1} 題（共 ${WIDTHS.length} 題）　<span>${round.bits.length} lights · ${round.bits.length} 盞燈</span>`;
    R.opts.innerHTML = '';
    round.options.forEach((v, k) => {
      const b = el('button', 'cp-gs-opt', String(v)); b.type = 'button';
      b.addEventListener('click', () => pick(b, k));
      R.opts.appendChild(b);
    });
    R.msg.innerHTML = 'Add up the lights that are on.<span class="zh">把亮著的燈加起來。</span>';
    R.next.hidden = true;
  }
  function pick(b, k) {
    if (done) return;
    if (k === round.correct) {
      done = true; if (!tried) first++;
      b.classList.add('is-right');
      R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Correct: ${sumText(round.bits)}.<span class="zh">答對了：${sumText(round.bits, '＋')}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false;
      R.next.textContent = q + 1 < WIDTHS.length ? 'Next · 下一題' : 'See my score · 看成績';
      R.next.focus({ preventScroll: true });
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not quite. The light on the far right is worth 1, and each one to the left is worth double.<span class="zh">再想想：最右邊那盞是 1，往左每一盞加倍。</span>';
    }
  }
  function finish() {
    R.lights.innerHTML = ''; R.opts.innerHTML = '';
    R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${WIDTHS.length} right on the first try.${first === WIDTHS.length ? ' You read binary like a computer!' : ' Play again for a new set of numbers.'}<span class="zh">你第一次就答對 ${first} 題（共 ${WIDTHS.length} 題）。${first === WIDTHS.length ? '你讀二進位跟電腦一樣準！' : '再玩一次，題目會換新的。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { rng = mulberry32(s ?? seed()); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => {
    if (q >= WIDTHS.length) { start(); return; }
    q++;
    if (q >= WIDTHS.length) finish(); else ask();
  });
  if (R.hint) R.hint.addEventListener('change', () => root.classList.toggle('cp-gs-values', R.hint.checked));
  start();
  root.__guess = { start, round: () => round, answer: () => { R.opts.querySelectorAll('button')[round.correct].click(); }, next: () => R.next.click(), state: () => ({ q, first }) };
}

const TRIALS = 60;

export function initLevels(root) {
  const slider = root.querySelector('.cp-lv-noise'), out = root.querySelector('.cp-lv-out'), msg = root.querySelector('.cp-lv-msg');
  const tracks = [...root.querySelectorAll('[data-levels]')].map((t) => ({ t, levels: Number(t.getAttribute('data-levels')), line: t.querySelector('.cp-lv-line'), res: t.querySelector('.cp-lv-res') }));
  let s = 7;
  for (const tr of tracks) {
    levelValues(tr.levels).forEach((v, k) => {
      const tick = el('i', 'cp-lv-tick'); tick.style.left = `${v * 100}%`;
      if (tr.levels === 2) tick.setAttribute('data-k', k ? 'ON 開' : 'OFF 關'); else tick.setAttribute('data-k', String(k));
      tr.line.appendChild(tick);
      if (k) { const cut = el('i', 'cp-lv-cut'); cut.style.left = `${(v - margin(tr.levels)) * 100}%`; tr.line.appendChild(cut); }
    });
    tr.dots = el('div', 'cp-lv-dots'); tr.line.appendChild(tr.dots);
  }
  function run() {
    const noise = Number(slider.value) / 100;
    out.textContent = `±${slider.value}%`;
    const res = tracks.map((tr) => {
      const r = countMisreads(tr.levels, noise, TRIALS, mulberry32(s));   // 兩條線用同一串亂數：同樣的雜訊
      tr.dots.innerHTML = '';
      r.samples.forEach((p, k) => {
        const d = el('b', p.ok ? 'ok' : 'bad');
        d.style.left = `${Math.min(1.04, Math.max(-0.04, p.v)) * 100}%`; d.style.top = `${18 + (k % 6) * 11}%`;
        tr.dots.appendChild(d);
      });
      tr.res.innerHTML = `<b>${r.wrong}</b> of ${TRIALS} read wrong<span class="zh">${TRIALS} 個裡讀錯 <b>${r.wrong}</b> 個</span>`;
      tr.t.classList.toggle('is-bad', r.wrong > 0);
      return r.wrong;
    });
    const [ten, two] = res;
    msg.innerHTML = noise === 0
      ? 'No noise: both ways are read perfectly. Now slide the noise up.<span class="zh">沒有雜訊時，兩種方法都讀得對。把雜訊往上拉看看。</span>'
      : ten > 0 && two === 0
        ? `With the same noise, ten levels got ${ten} wrong and on/off got none. Each of the ten levels sits only about 5.6% of the range from its border; on and off each sit 50% away.<span class="zh">同樣的雜訊，十段亮度讀錯 ${ten} 個，開和關一個都沒錯。十段的每一段離界線只有全幅的 5.6% 左右；開和關離界線有 50%。</span>`
        : ten === 0
          ? 'This noise is still smaller than the gap between ten levels, so nothing is misread yet. Keep sliding.<span class="zh">這點雜訊還比十段之間的間隔小，所以還沒有讀錯。再往上拉。</span>'
          : `Now even on/off got ${two} wrong.<span class="zh">現在連開和關也讀錯了 ${two} 個。</span>`;
  }
  slider.addEventListener('input', run);
  root.querySelector('.cp-lv-again').addEventListener('click', () => { s = seed(); run(); });
  run();
  root.__levels = { run, set: (v) => { slider.value = String(v); run(); } };
}

export function drawMinis() {
  document.querySelectorAll('canvas.cp-mini[data-bits]').forEach((cv) => {
    const str = cv.getAttribute('data-bits'), n = str.length, dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = 84, H = 84; cv.width = W * dpr; cv.height = H * dpr;
    const g = cv.getContext('2d'); g.scale(dpr, dpr);
    const cols = n > 4 ? 4 : n, rows = Math.ceil(n / cols), gap = W / (cols + 0.4), r = Math.min(8.5, gap * 0.34);
    for (let k = 0; k < n; k++) {
      const cx = (W - gap * (cols - 1)) / 2 + (k % cols) * gap, cy = H / 2 + (Math.floor(k / cols) - (rows - 1) / 2) * gap;
      const on = str[k] === '1';
      if (on) { const gl = g.createRadialGradient(cx, cy, 0, cx, cy, r * 2.3); gl.addColorStop(0, 'rgba(255,211,110,.75)'); gl.addColorStop(1, 'rgba(255,211,110,0)'); g.fillStyle = gl; g.beginPath(); g.arc(cx, cy, r * 2.3, 0, 7); g.fill(); }
      g.fillStyle = on ? '#ffd36e' : '#2b3550'; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
      g.strokeStyle = on ? '#fff3c9' : '#4a5878'; g.lineWidth = 1.2; g.stroke();
    }
  });
}
