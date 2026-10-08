/*
 * 電腦概論 · 第三課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initWire(el)   [data-cp-wire]   把閘接起來：六題。選 AND 或 OR、每個輸入前面要不要加 NOT，四列都對就過關
 *   initQuiz(el)   [data-cp-lquiz]  真值表測驗：八題，記第一次就答對的題數
 */
import { mulberry32 } from './bits.js';
import { PUZZLES, circuitTable, exprText, makeQuestion, solved } from './logic.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const ROWS = [[0, 0], [0, 1], [1, 0], [1, 1]];

export function initWire(root) {
  const TEXT = JSON.parse(root.getAttribute('data-puzzles'));
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-wr-k'), score: $('.cp-wr-score'), q: $('.cp-wr-q'), a: $('.cp-wr-a'), b: $('.cp-wr-b'), out: $('.cp-wr-out'), expr: $('.cp-wr-expr'), body: $('.cp-wr-table tbody'), msg: $('.cp-wr-msg'), next: $('.cp-wr-next') };
  const nots = { a: $('[data-not="a"]'), b: $('[data-not="b"]') };
  const gates = [...root.querySelectorAll('[data-wgate]')];
  const done = new Set();
  let i = 0, spec = { gate: 'and', notA: false, notB: false };
  function show() {
    const p = PUZZLES[i], t = TEXT[p.key], mine = circuitTable(spec), ok = solved(spec, p);
    R.k.innerHTML = `Puzzle ${i + 1} of ${PUZZLES.length} · 第 ${i + 1} 題（共 ${PUZZLES.length} 題）`;
    R.q.innerHTML = `${t.en}<span class="zh">${t.zh}</span>`;
    R.a.innerHTML = `<b>A</b> ${t.a_en}<small>${t.a_zh}</small>`; R.b.innerHTML = `<b>B</b> ${t.b_en}<small>${t.b_zh}</small>`;
    R.out.innerHTML = `${t.out_en}<small>${t.out_zh}</small>`;
    nots.a.setAttribute('aria-pressed', spec.notA ? 'true' : 'false'); nots.b.setAttribute('aria-pressed', spec.notB ? 'true' : 'false');
    gates.forEach((g) => g.setAttribute('aria-pressed', g.getAttribute('data-wgate') === spec.gate ? 'true' : 'false'));
    R.expr.textContent = exprText(spec);
    R.body.innerHTML = ROWS.map(([a, b], k) => `<tr class="${mine[k] === p.target[k] ? 'ok' : 'bad'}"><td>${a}</td><td>${b}</td><td>${p.target[k]}</td><td><b>${mine[k]}</b></td><td>${mine[k] === p.target[k] ? '✓' : '✗'}</td></tr>`).join('');
    root.classList.toggle('is-solved', ok);
    if (ok) {
      done.add(i);
      R.msg.innerHTML = `All four rows match: ${exprText(spec)}.<span class="zh">四列都對了：${exprText(spec)}。</span>`;
      R.next.hidden = false; R.next.textContent = done.size === PUZZLES.length ? 'Play again · 再玩一次' : 'Next puzzle · 下一題';
    } else {
      const wrong = mine.filter((v, k) => v !== p.target[k]).length;
      R.msg.innerHTML = `${wrong} row${wrong > 1 ? 's do' : ' does'} not match yet. Try the other gate, or put a NOT in front of an input.<span class="zh">還有 ${wrong} 列不對。換另一種閘，或在某個輸入前面加 NOT 試試。</span>`;
      R.next.hidden = true;
    }
    R.score.textContent = `${done.size} / ${PUZZLES.length}`;
  }
  function go(n) { i = n; spec = { gate: i % 2 ? 'and' : 'or', notA: false, notB: false }; show(); }   // 一開始故意給錯的閘
  nots.a.addEventListener('click', () => { spec.notA = !spec.notA; show(); });
  nots.b.addEventListener('click', () => { spec.notB = !spec.notB; show(); });
  gates.forEach((g) => g.addEventListener('click', () => { spec.gate = g.getAttribute('data-wgate'); show(); }));
  R.next.addEventListener('click', () => { if (done.size === PUZZLES.length) { done.clear(); go(0); return; } let n = (i + 1) % PUZZLES.length; while (done.has(n)) n = (n + 1) % PUZZLES.length; go(n); });
  go(0);
  root.__wire = { go, set: (s) => { spec = { gate: 'and', notA: false, notB: false, ...s }; show(); }, solve: () => { spec = { notA: false, notB: false, ...PUZZLES[i].answer }; show(); }, next: () => R.next.click(), state: () => ({ i, done: done.size }) };
}

const N = 8;

export function initQuiz(root) {
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-gs-k'), score: $('.cp-gs-score'), q: $('.cp-lq-q'), opts: $('.cp-gs-opts'), msg: $('.cp-gs-msg'), next: $('.cp-gs-next') };
  let rng, i, q, first, tried, done;
  function ask() {
    q = makeQuestion(rng, i); tried = false; done = false;
    R.k.innerHTML = `Question ${i + 1} of ${N} · 第 ${i + 1} 題（共 ${N} 題）`;
    R.q.innerHTML = `<span class="cp-lq-in">A = ${q.a}${q.b === null ? '' : `, B = ${q.b}`}</span><span class="cp-lq-ex">${q.text} = ?</span>`;
    R.opts.innerHTML = '';
    [0, 1].forEach((v) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-gs-opt'; b.textContent = String(v); b.addEventListener('click', () => pick(b, v)); R.opts.appendChild(b); });
    R.msg.innerHTML = 'Work from the inside of the parentheses out.<span class="zh">有括號就先算括號裡面。</span>';
    R.next.hidden = true;
  }
  function pick(b, v) {
    if (done) return;
    if (v === q.answer) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Correct: ${q.text} = ${q.answer}.<span class="zh">答對了：${q.text}＝${q.answer}。</span>`;
      R.score.textContent = `${first} / ${i + 1}`;
      R.next.hidden = false; R.next.textContent = i + 1 < N ? 'Next · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not quite. AND needs both to be 1. OR needs at least one 1. NOT flips 0 and 1.<span class="zh">再想想：AND 要兩個都是 1；OR 只要有一個 1；NOT 把 0 和 1 對調。</span>';
    }
  }
  function finish() {
    R.q.innerHTML = ''; R.opts.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${N} right on the first try.${first === N ? ' You think like a logic gate!' : ' Play again for a new set.'}<span class="zh">你第一次就答對 ${first} 題（共 ${N} 題）。${first === N ? '你的腦袋和邏輯閘一樣準！' : '再玩一次，題目會換新的。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { rng = mulberry32(s ?? seed()); i = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => { if (i >= N) { start(); return; } i++; if (i >= N) finish(); else ask(); });
  start();
  root.__lquiz = { start, answer: () => R.opts.querySelectorAll('button')[q.answer].click(), next: () => R.next.click(), state: () => ({ i, first }) };
}
