/*
 * 電腦概論 · 第六課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initProg(el)   [data-cp-prog]   自己排四條指令，讓第 7 格變成 3 + 4；按執行，一條一條列出發生了什麼
 *   initPred(el)   [data-cp-pred]   猜下一步：八題，記第一次就答對的題數
 */
import { mulberry32 } from './bits.js';
import { CARDS, cellText, checkAdd, makePrediction } from './cpu.js';
import { describe } from './cputext.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;

const WHY = {
  ok: { en: 'It works. Cell 7 holds 7, and the processor stopped.', zh: '成功了。第 7 格是 7，處理器也停下來了。' },
  forever: { en: 'It never stops. A JUMP sends the counter back, so the same instructions run again and again. End with STOP.', zh: '它永遠停不下來。JUMP 把計數器送回去，同樣幾條指令就一直重複。最後要放 STOP。' },
  notinstruction: { en: 'The counter ran into a cell with no instruction in it. Fill every slot, and end with STOP.', zh: '計數器走到一格沒有指令的地方。每一格都要放指令，最後要放 STOP。' },
  range: { en: 'The counter ran off the end of memory.', zh: '計數器跑到記憶體外面去了。' },
  wrong: { en: 'The processor stopped, but cell 7 does not hold 7. Follow A through each step below.', zh: '處理器停了，可是第 7 格不是 7。照下面的每一步，看 A 是怎麼變的。' },
  spoiled: { en: 'One of the two starting numbers was overwritten. STORE should put the answer in cell 7.', zh: '原來的兩個數有一個被蓋掉了。STORE 應該把答案放進第 7 格。' },
};

export function initProg(root) {
  const $ = (s) => root.querySelector(s);
  const sels = [...root.querySelectorAll('.cp-pg-slot select')], out = $('.cp-pg-trace'), msg = $('.cp-pg-msg'), cells = [...root.querySelectorAll('[data-pgcell]')];
  for (const s of sels) {
    s.innerHTML = '<option value="">— choose · 選一條 —</option>' + CARDS.map((c, i) => `<option value="${i}">${cellText(c)}</option>`).join('');
    s.addEventListener('change', () => { out.innerHTML = ''; msg.innerHTML = 'Press Run to try it.<span class="zh">按「執行」試試看。</span>'; root.classList.remove('is-solved', 'is-failed'); show(null); });
  }
  const slots = () => sels.map((s) => (s.value === '' ? null : { ...CARDS[Number(s.value)] }));
  function show(state) { const v = state ? state.mem.slice(5).map((c) => c.num) : [3, 4, 0]; cells.forEach((c, i) => { c.textContent = String(v[i]); c.classList.toggle('is-new', !!state && v[i] !== [3, 4, 0][i]); }); }
  function runIt() {
    const r = checkAdd(slots());
    out.innerHTML = r.trace.map((t, k) => { const d = t.phase === 'error' ? describe(t, r.state) : describe({ ...t }, r.state); return `<li class="${t.phase === 'error' ? 'bad' : ''}"><b>${k + 1}</b><span>${d.en.replace(/^Execute\. /, '')}<small>${d.zh.replace(/^照做。/, '')}</small></span><i>A = ${t.a}</i></li>`; }).join('') + (r.reason === 'forever' ? '<li class="bad"><b>…</b><span>and so on, without end<small>……就這樣一直下去</small></span><i></i></li>' : '');
    msg.innerHTML = `${WHY[r.reason].en}<span class="zh">${WHY[r.reason].zh}</span>`;
    root.classList.toggle('is-solved', r.ok); root.classList.toggle('is-failed', !r.ok);
    show(r.state);
    return r;
  }
  $('.cp-pg-run').addEventListener('click', runIt);
  $('.cp-pg-clear').addEventListener('click', () => { sels.forEach((s) => { s.value = ''; }); out.innerHTML = ''; msg.innerHTML = 'Choose four instructions, in order.<span class="zh">照順序選四條指令。</span>'; root.classList.remove('is-solved', 'is-failed'); show(null); });
  msg.innerHTML = 'Choose four instructions, in order.<span class="zh">照順序選四條指令。</span>';
  show(null);
  root.__prog = { set: (idx) => { sels.forEach((s, i) => { s.value = idx[i] === null || idx[i] === undefined ? '' : String(idx[i]); }); return runIt(); } };
}

const N = 8;

export function initPred(root) {
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-gs-k'), score: $('.cp-gs-score'), q: $('.cp-pd-q'), opts: $('.cp-gs-opts'), msg: $('.cp-gs-msg'), next: $('.cp-gs-next') };
  let rng, i, q, first, tried, done;
  const ASK = { a: { en: 'What is in A after this instruction?', zh: '執行完這一條，A 是多少？' }, cell: { en: (n) => `What is in cell ${n} after this instruction?`, zh: (n) => `執行完這一條，第 ${n} 格是多少？` }, pc: { en: 'What is the counter after this instruction?', zh: '執行完這一條，計數器是多少？' } };
  function ask() {
    q = makePrediction(rng); tried = false; done = false;
    R.k.innerHTML = `Question ${i + 1} of ${N} · 第 ${i + 1} 題（共 ${N} 題）`;
    const en = q.ask === 'cell' ? ASK.cell.en(q.arg) : ASK[q.ask].en, zh = q.ask === 'cell' ? ASK.cell.zh(q.arg) : ASK[q.ask].zh;
    R.q.innerHTML = `<span class="cp-pd-st">A = ${q.a}　counter 計數器 = ${q.pc}${q.op === 'JUMP' ? '' : `　cell 第 ${q.arg} 格 = ${q.m}`}</span><span class="cp-pd-in">${q.op} ${q.arg}</span><span class="cp-pd-ask">${en}<small>${zh}</small></span>`;
    R.opts.innerHTML = '';
    q.options.forEach((v, k) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-gs-opt'; b.textContent = String(v); b.addEventListener('click', () => pick(b, k)); R.opts.appendChild(b); });
    R.msg.innerHTML = 'LOAD copies in, ADD adds, STORE copies out, JUMP sets the counter.<span class="zh">LOAD 抄進來，ADD 加上去，STORE 抄出去，JUMP 改計數器。</span>';
    R.next.hidden = true;
  }
  function pick(b, k) {
    if (done) return;
    if (k === q.correct) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Correct: ${q.answer}.<span class="zh">答對了：${q.answer}。</span>`;
      R.score.textContent = `${first} / ${i + 1}`;
      R.next.hidden = false; R.next.textContent = i + 1 < N ? 'Next · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not quite. Read the instruction as a sentence, then do exactly what it says and nothing more.<span class="zh">再想想。把指令當成一句話唸出來，然後一字不差地照做，不多做別的。</span>';
    }
  }
  function finish() {
    R.q.innerHTML = ''; R.opts.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${N} right on the first try.${first === N ? ' You could be a processor!' : ' Play again for new questions.'}<span class="zh">你第一次就答對 ${first} 題（共 ${N} 題）。${first === N ? '你可以去當處理器了！' : '再玩一次，題目會換新的。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { rng = mulberry32(s ?? seed()); i = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => { if (i >= N) { start(); return; } i++; if (i >= N) finish(); else ask(); });
  start();
  root.__pred = { start, answer: () => R.opts.querySelectorAll('button')[q.correct].click(), next: () => R.next.click(), state: () => ({ i, first }) };
}
