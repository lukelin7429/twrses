/*
 * 音樂 Music · 第五課「五線譜怎麼看？」的互動（2D＋聲音；有空間結構才用 3D，這一課沒有）。
 *
 * 一個機制：五條線、四個間，位置越高音越高；譜號說明哪一條線是哪一個音；音符超出五線就加短橫線（加線）。
 * 點五線譜上的位置（或下面小鍵盤的白鍵）：音符出現在那裡、鍵盤對應的鍵亮起並發聲，顯示音名（C D E）、
 * 唱名（Do Re Mi）、頻率，以及「在第幾線／第幾間／第幾條加線」。
 *   [data-clef]   高音譜號／低音譜號（同一個位置，兩個譜號是不同的音）
 * 2D（不需要 WebGL）：「這是哪個音？」（staffq，八題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-staff.js
 * 除錯：document.querySelector('[data-musstaff-lab]').__lab
 *   state（clef、pos）、current()（目前音的資訊）、hz()、nowPlaying()、setClef(c)、pick(pos)、render()
 *   [data-mu-staffq].__staffq：round()（{ clef, pos, name }）、answer(letter)、score()
 */
import { drawStaff, posFromY, staffGeometry } from './staff2d.js';
import { CLEFS, LETTERS, SOLFEGE_WHITE, describePos, makeStaffRounds, midiToPos, posInfo, posToMidi, stepInfo, stepToMidi } from './staff.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { lazyBoot } from './common.js';
import { mulberry32 } from './pitch.js';

const fmt = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(2));
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const POS_MIN = -4, POS_MAX = 12;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-st-cv'), kb = $('.mu-st-kb'), msg = $('.mu-msg');
  const state = { clef: 'treble', pos: 2, hover: null, demoT: [] };
  let geo = null;

  const cur = () => ({ ...posInfo(state.pos, state.clef), where: describePos(state.pos) });
  function draw() { geo = drawStaff(cv, { clef: state.clef, notes: state.pos === null ? [] : [{ pos: state.pos }], hover: state.hover }); }
  function buildKeys() {
    // 小鍵盤：以目前音的八度為起點，15 個白鍵（兩個八度加一個 C）
    kb.innerHTML = '';
    const c = cur(), start = Math.floor(c.step / 7) * 7;
    for (let i = 0; i < 15; i++) {
      const info = stepInfo(start + i);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mu-st-key'; b.dataset.step = String(info.step);
      b.setAttribute('aria-label', `${info.name} ${info.solfege}, ${fmt(info.freq)} Hz`);
      b.innerHTML = `<span>${info.letter}${info.letter === 'C' ? `<small>${info.octave}</small>` : ''}</span>`;
      if (info.step === c.step) b.classList.add('is-on');
      kb.appendChild(b);
    }
  }
  function show(play) {
    const c = cur();
    $('.mu-st-name').innerHTML = `${c.name} <span>· ${c.solfege}</span>`;
    $('.mu-st-hz').innerHTML = `${fmt(c.freq)} <small>Hz</small>`;
    $('.mu-st-where').innerHTML = `${c.where.en.charAt(0).toUpperCase() + c.where.en.slice(1)}<span class="zh">${c.where.zh}</span>`;
    $$('[data-clef]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-clef') === state.clef ? 'true' : 'false'));
    const ledger = state.pos < 0 || state.pos > 8;
    msg.innerHTML = `${ledger ? 'A note outside the five lines gets short ledger lines. ' : ''}The ${state.clef === 'treble' ? 'treble clef (G clef)' : 'bass clef (F clef)'} says the ${state.clef === 'treble' ? 'second line is G4' : 'fourth line is F3'}.` +
      `<span class="zh">${ledger ? '超出五線的音要加短橫線（加線）。' : ''}${CLEFS[state.clef].zh}說明${state.clef === 'treble' ? '第二線是 G4' : '第四線是 F3'}。</span>`;
    draw(); buildKeys();
    if (play) { synth.unlock(); synth.stopAll(); synth.tone(c.freq, { type: 'triangle', dur: 1.2, gain: 0.9 }); }
  }
  function pick(pos, play = true) { state.pos = Math.max(POS_MIN, Math.min(POS_MAX, pos)); show(play); }
  function setClef(c) {
    // 換譜號時保持「同一個音」不變：位置跟著變（若超出範圍，就保持位置）
    const m = posToMidi(state.pos, state.clef), p = midiToPos(m, c);
    state.clef = c;
    state.pos = p >= POS_MIN && p <= POS_MAX ? p : state.pos;
    show(false);
  }

  const posAt = (e) => { const r = cv.getBoundingClientRect(); const g = staffGeometry(r.width, r.height); return Math.max(POS_MIN, Math.min(POS_MAX, posFromY(e.clientY - r.top, g))); };
  cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') { const p = posAt(e); if (p !== state.hover) { state.hover = p; draw(); } } });
  cv.addEventListener('pointerleave', () => { state.hover = null; draw(); });
  cv.addEventListener('pointerdown', (e) => { e.preventDefault(); state.hover = null; pick(posAt(e)); });
  cv.setAttribute('tabindex', '0');
  cv.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); pick(state.pos + 1); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); pick(state.pos - 1); }
  });
  kb.addEventListener('click', (e) => {
    const b = e.target.closest('.mu-st-key'); if (!b) return;
    const pos = Number(b.dataset.step) - CLEFS[state.clef].bottomStep;
    if (pos >= POS_MIN && pos <= POS_MAX) pick(pos);
    else { const info = stepInfo(Number(b.dataset.step)); synth.unlock(); synth.tone(info.freq, { type: 'triangle', dur: 1.2, gain: 0.9 }); msg.innerHTML = `${info.name} is too far from this staff to draw here. Try the other clef.<span class="zh">${info.name} 離這組五線太遠，畫不進來。試試另一個譜號。</span>`; }
  });
  $$('[data-clef]').forEach((b) => b.addEventListener('click', () => setClef(b.getAttribute('data-clef'))));
  window.addEventListener('resize', draw);
  watchOffscreen(root);

  const DEMO = {
    higher() { setClef('treble'); state.demoT.forEach(clearTimeout); state.demoT = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((p, i) => setTimeout(() => pick(p), 300 + i * 420)); },
    clef() { state.demoT.forEach(clearTimeout); state.clef = 'treble'; pick(0); state.demoT = [setTimeout(() => { state.clef = 'bass'; pick(0); }, 1700)]; },
    ledger() { state.demoT.forEach(clearTimeout); state.clef = 'treble'; pick(-2); state.demoT = [setTimeout(() => { state.clef = 'bass'; pick(10); }, 1700)]; },
    octave() { state.demoT.forEach(clearTimeout); state.clef = 'treble'; pick(0); state.demoT = [setTimeout(() => pick(7), 1400)]; },
  };
  show(false);
  root.classList.add('al-ready');
  root.__lab = { state, current: cur, hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), setClef, pick: (p) => pick(p), render: draw, demo: (v) => DEMO[v] && DEMO[v]() };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function initStaffQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-sq-k'), score: root.querySelector('.mu-sq-score'), msg: root.querySelector('.mu-sq-msg'), cv: root.querySelector('.mu-sq-cv'),
    opts: [...root.querySelectorAll('[data-pick]')], next: root.querySelector('.mu-sq-next'), clef: root.querySelector('.mu-sq-clef') };
  let rounds = makeStaffRounds(mulberry32(seed()), 8), q = 0, first = 0, tried = false, done = false;
  const cur = () => { const r = rounds[q]; return { ...r, ...posInfo(r.pos, r.clef) }; };
  function draw(color) { drawStaff(R.cv, { clef: cur().clef, notes: [{ pos: cur().pos, color }] }); }
  function ask() {
    tried = false; done = false;
    const c = cur();
    R.k.innerHTML = `Question ${q + 1} of ${rounds.length} · 第 ${q + 1} 題（共 ${rounds.length} 題）`;
    R.clef.innerHTML = `${CLEFS[c.clef].en} · ${CLEFS[c.clef].zh}`;
    R.opts.forEach((b) => { b.className = 'mu-sq-opt'; b.disabled = false; });
    R.next.hidden = true;
    R.msg.innerHTML = 'Which note is this? Find a line or space you know, such as the G on the treble clef\'s second line, and count from there.<span class="zh">這是哪個音？先找一條你認得的線，例如高音譜號第二線的 G，再從那裡往上或往下數。</span>';
    draw();
  }
  function answer(letter) {
    if (done) return;
    const c = cur();
    const b = R.opts.find((x) => x.getAttribute('data-pick') === letter);
    if (letter === c.letter) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Yes: ${c.name} (${c.solfege}), ${describePos(c.pos).en}.<span class="zh">答對了：${c.name}（${c.solfege}），${describePos(c.pos).zh}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < rounds.length ? 'Next question · 下一題' : 'See my score · 看成績';
      draw('#2f9e63');
      synth.unlock(); synth.tone(c.freq, { type: 'triangle', dur: 1, gain: 0.9 });
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not that one. Look at where the note sits compared with the lines you know.<span class="zh">不是這個。看看這個音和你認得的線比，位置在哪裡。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; rounds = makeStaffRounds(mulberry32(seed()), 8); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= rounds.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${rounds.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${rounds.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  window.addEventListener('resize', () => draw());
  watchOffscreen(root);
  ask();
  root.__staffq = { round: () => { const c = cur(); return { clef: c.clef, pos: c.pos, name: c.name, letter: c.letter }; }, answer, score: () => ({ first, q }) };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const s = document.querySelector('[data-mu-staffq]'); if (s) initStaffQ(s);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musstaff-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void LETTERS; void SOLFEGE_WHITE; void stepToMidi;
