/*
 * 電腦概論 · 第四課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initHalf(el)   [data-cp-half]   半加器／全加器：撥 A、B（和進位進來），看和與進位，真值表跟著亮
 *   initAddQ(el)   [data-cp-addq]   自己當加法器：兩題 × 四位＝八格，一位一位由右往左，記第一次就答對幾格
 */
import { columnText, fullAdder, halfAdder, makeProblem } from './adder.js';
import { mulberry32 } from './bits.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const NAMES = ['zero', 'one', 'two', 'three'], ZH = ['零', '一', '二', '三'];

export function initHalf(root) {
  const $ = (s) => root.querySelector(s);
  const R = { eq: $('.cp-hf-eq'), sum: $('.cp-hf-sum'), carry: $('.cp-hf-carry'), gs: $('.cp-hf-gs'), gc: $('.cp-hf-gc'), head: $('.cp-hf-table thead'), body: $('.cp-hf-table tbody'), note: $('.cp-hf-note') };
  const ins = { a: $('[data-hin="a"]'), b: $('[data-hin="b"]'), c: $('[data-hin="c"]') };
  const st = { mode: 'half', a: 1, b: 1, c: 0 };
  function show() {
    const full = st.mode === 'full', c = full ? st.c : 0;
    const r = full ? fullAdder(st.a, st.b, c) : halfAdder(st.a, st.b), n = st.a + st.b + c;
    root.querySelectorAll('[data-hmode]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-hmode') === st.mode ? 'true' : 'false'));
    for (const k of ['a', 'b', 'c']) { ins[k].setAttribute('aria-pressed', st[k] ? 'true' : 'false'); ins[k].querySelector('b').textContent = String(st[k]); }
    ins.c.hidden = !full;
    R.eq.innerHTML = `${st.a} + ${st.b}${full ? ` + ${c}` : ''} = <b>${r.carry ? `${r.carry}${r.sum}` : r.sum}</b><small>${NAMES[n]} · ${ZH[n]}</small>`;
    R.sum.textContent = String(r.sum); R.carry.textContent = String(r.carry);
    R.sum.parentElement.classList.toggle('is-on', !!r.sum); R.carry.parentElement.classList.toggle('is-on', !!r.carry);
    R.gs.textContent = full ? 'A XOR B XOR carry in' : 'A XOR B';
    R.gc.textContent = full ? '1 if two or more inputs are 1' : 'A AND B';
    R.head.innerHTML = `<tr><th>A</th><th>B</th>${full ? '<th>In<small>進來</small></th>' : ''}<th>Carry<small>進位</small></th><th>Sum<small>和</small></th></tr>`;
    const rows = [];
    for (const a of [0, 1]) for (const b of [0, 1]) for (const cc of full ? [0, 1] : [0]) {
      const x = full ? fullAdder(a, b, cc) : halfAdder(a, b), cur = a === st.a && b === st.b && cc === c;
      rows.push(`<tr class="${cur ? 'is-cur' : ''}"><td>${a}</td><td>${b}</td>${full ? `<td>${cc}</td>` : ''}<td><b>${x.carry}</b></td><td><b>${x.sum}</b></td></tr>`);
    }
    R.body.innerHTML = rows.join('');
    R.note.innerHTML = full
      ? 'A full adder has three inputs: A, B, and the carry coming in from the column on the right. It is two half adders and one OR gate: five gates.<span class="zh">全加器有三個輸入：A、B，還有右邊那一位進過來的進位。它是兩個半加器加一個 OR 閘，一共五個閘。</span>'
      : 'A half adder has two gates. The Sum column is the XOR table from Lesson 3, and the Carry column is the AND table.<span class="zh">半加器只有兩個閘。「和」那一欄就是第三課的 XOR 真值表，「進位」那一欄就是 AND 真值表。</span>';
  }
  for (const k of ['a', 'b', 'c']) ins[k].addEventListener('click', () => { st[k] = st[k] ? 0 : 1; show(); });
  root.querySelectorAll('[data-hmode]').forEach((b) => b.addEventListener('click', () => { st.mode = b.getAttribute('data-hmode'); show(); }));
  show();
  root.__half = { set: (mode, a, b, c = 0) => { Object.assign(st, { mode, a, b, c }); show(); } };
}

const PROBLEMS = 2, W = 4;

export function initAddQ(root) {
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-gs-k'), score: $('.cp-gs-score'), grid: $('.cp-aq-grid'), q: $('.cp-aq-q'), opts: $('.cp-gs-opts'), msg: $('.cp-gs-msg'), next: $('.cp-gs-next') };
  let rng, pi, p, col, first, tried, total;
  function grid(done) {
    const cell = (v, cls = '') => `<span class="${cls}">${v}</span>`;
    const row = (label, f) => `<div class="cp-aq-row"><i>${label}</i>${[4, 3, 2, 1, 0].map(f).join('')}</div>`;
    R.grid.innerHTML =
      row('carry<small>進位</small>', (i) => (i === 0 ? cell('', 'cp-aq-c') : cell(i - 1 < col || done ? (p.steps[i - 1].cout ? '1' : '') : '', `cp-aq-c${i === col && !done ? ' is-cur' : ''}`)))
      + row('A', (i) => (i === 4 ? cell('') : cell(p.aBits[i], i === col && !done ? 'is-cur' : '')))
      + row('B', (i) => (i === 4 ? cell('+', 'cp-aq-plus') : cell(p.bBits[i], i === col && !done ? 'is-cur' : '')))
      + row('sum<small>和</small>', (i) => (i === 4 ? cell(done ? p.bits[4] : '', 'cp-aq-s') : cell(i < col || done ? p.bits[i] : '?', `cp-aq-s${i === col && !done ? ' is-cur' : ''}`)));
  }
  function ask() {
    const s = p.steps[col]; tried = false;
    R.k.innerHTML = `Problem ${pi + 1} of ${PROBLEMS}, column ${col + 1} of ${W} · 第 ${pi + 1} 題（共 ${PROBLEMS} 題），第 ${col + 1} 位`;
    grid(false);
    R.q.innerHTML = `${s.a} + ${s.b} + carry ${s.cin} = ?<small>${s.a}＋${s.b}＋進位 ${s.cin}＝？</small>`;
    R.opts.innerHTML = '';
    [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([c, m]) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-gs-opt cp-aq-opt';
      b.innerHTML = `${c ? `${c}${m}` : m}<small>write ${m}, carry ${c}<br>寫 ${m}，進 ${c}</small>`;
      b.addEventListener('click', () => pick(b, c, m)); R.opts.appendChild(b);
    });
    R.msg.innerHTML = 'Add the three small numbers in this column. Write the right digit below and carry the left one.<span class="zh">把這一位的三個小數字加起來：右邊那個數字寫在下面，左邊那個進到下一位。</span>';
    R.next.hidden = true;
  }
  function pick(b, c, m) {
    const s = p.steps[col];
    if (c === s.cout && m === s.sum) {
      if (!tried) first++;
      total++; R.score.textContent = `${first} / ${total}`;
      col++;
      if (col < W) { ask(); R.msg.innerHTML = `Right: ${columnText(s)}. Now the next column to the left.<span class="zh">對了：${columnText(s, '＋')}。接著做左邊那一位。</span>`; }
      else {
        grid(true); R.q.innerHTML = ''; R.opts.innerHTML = '';
        R.msg.innerHTML = `Done: ${p.a} + ${p.b} = ${p.value}. The last carry became the fifth digit.<span class="zh">完成：${p.a}＋${p.b}＝${p.value}。最後的進位就是第五位。</span>`;
        R.next.hidden = false; R.next.textContent = pi + 1 < PROBLEMS ? 'Next problem · 下一題' : 'See my score · 看成績';
      }
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not quite. Count how many 1s are in the column: none is 0, one is 1, two is 10, three is 11.<span class="zh">再想想。數數這一位有幾個 1：沒有是 0，一個是 1，兩個是 10，三個是 11。</span>';
    }
  }
  function problem() { p = makeProblem(rng, W); col = 0; ask(); }
  function finish() {
    R.grid.innerHTML = ''; R.q.innerHTML = ''; R.opts.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${total} columns right on the first try.${first === total ? ' You add like a chip!' : ' Play again for new numbers.'}<span class="zh">你第一次就答對 ${first} 格（共 ${total} 格）。${first === total ? '你加得跟晶片一樣準！' : '再玩一次，題目會換新的。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { rng = mulberry32(s ?? seed()); pi = 0; first = 0; total = 0; R.score.textContent = '0 / 0'; problem(); }
  R.next.addEventListener('click', () => { if (pi >= PROBLEMS) { start(); return; } pi++; if (pi >= PROBLEMS) finish(); else problem(); });
  start();
  root.__addq = { start, answer: () => { const s = p.steps[col]; R.opts.querySelectorAll('button')[s.cout * 2 + s.sum].click(); }, next: () => R.next.click(), state: () => ({ pi, col, first, total }) };
}
