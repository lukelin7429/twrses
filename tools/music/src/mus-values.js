/*
 * 音樂 Music · 第六課「一個音要多長？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：音符的長短一路對半分（全音符＝2 個二分＝4 個四分＝8 個八分），拍號說每小節有幾拍；一小節要剛好填滿。
 * 音符積木：選拍號（2/4、3/4、4/4），把音符（或休止符、附點）一塊一塊放進一小節；放不下就說還差多少；
 * 填滿時畫在五線譜上並播放（每個音符用 synth.tone 排在 AudioContext 時間軸上，每一拍加一聲輕的點擊）。
 *   [data-ts]  拍號      [data-val]  時值      [data-mod="dot"|"rest"]  附點／休止符      .mu-vl-undo  .mu-vl-clear  .mu-vl-play
 * 2D（不需要 WebGL）：「這個音符幾拍？」（8 題）、「對半分」（聽 1、2、4、8、16 個音填滿 4 拍）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-values.js
 * 除錯：document.querySelector('[data-musvalues-lab]').__lab
 *   state（ts、items、dot、rest）、plan()（排成時間）、full()、add(key)、undo()、clear()、play()、hz()、nowPlaying()
 *   [data-mu-beatq].__beatq：round()、answer(beats)、score()；[data-mu-split].__split：play(n)
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { drawMeasure } from './staff2d.js';
import { BEAT_OPTIONS, SPLIT_ROWS, VALUES, barBeats, beatsLabel, canAdd, equalSplit, isFull, itemBeats, makeBeatQuestions, nameOf, remaining, scheduleBar, splitValueKey, sumBeats, valueOf } from './values.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const BPM = 100, LEAD = 0.12;
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-vl-cv'), track = $('.mu-vl-track'), msg = $('.mu-msg');
  const state = { ts: '4/4', items: [], dot: false, rest: false, playing: false };
  let raf = 0, perfStart = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function drawAll(ph = -1) { drawMeasure(cv, { items: state.items, ts: state.ts, playhead: ph }); }
  function show() {
    const cap = barBeats(state.ts), used = sumBeats(state.items), left = remaining(state.items, state.ts);
    $$('[data-ts]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-ts') === state.ts ? 'true' : 'false'));
    $$('[data-mod]').forEach((b) => b.setAttribute('aria-pressed', state[b.getAttribute('data-mod')] ? 'true' : 'false'));
    // 軌道：每一拍一格，已放的音符依長度畫成塊
    track.style.setProperty('--cap', String(cap));
    track.innerHTML = state.items.map((it) => `<span class="mu-vl-blk${it.rest ? ' is-rest' : ''}" style="--w:${itemBeats(it)}">${nameOf(it).en.replace(' note', '')}</span>`).join('') +
      (left > 1e-9 ? `<span class="mu-vl-empty" style="--w:${left}"></span>` : '');
    $('.mu-vl-count').innerHTML = `${beatsLabelFull(used)} <small>of ${cap} beats · ${cap} 拍裡的 ${beatsLabelFull(used)}</small>`;
    $$('[data-val]').forEach((b) => {
      const it = { v: b.getAttribute('data-val'), dot: state.dot, rest: state.rest };
      b.classList.toggle('is-nofit', !canAdd(state.items, it, state.ts));
      const n = nameOf(it);
      b.querySelector('small').textContent = `${itemBeats(it)} ${itemBeats(it) === 1 ? 'beat' : 'beats'} · ${n.zh}`;
    });
    $('.mu-vl-play').disabled = state.items.length === 0;
    root.classList.toggle('is-full', isFull(state.items, state.ts));
    drawAll(-1);
  }
  const beatsLabelFull = (b) => (Number.isInteger(b) ? String(b) : String(b));

  function add(key) {
    const it = { v: key, dot: state.dot, rest: state.rest };
    if (state.playing) stop();
    if (!canAdd(state.items, it, state.ts)) {
      const n = nameOf(it);
      say(`A ${n.en} needs ${itemBeats(it)} beats, but only ${remaining(state.items, state.ts)} ${remaining(state.items, state.ts) === 1 ? 'beat is' : 'beats are'} left in this bar. Try a shorter one.`,
          `${n.zh}要 ${itemBeats(it)} 拍，但這小節只剩 ${remaining(state.items, state.ts)} 拍。換一個短一點的。`);
      root.classList.add('is-shake'); setTimeout(() => root.classList.remove('is-shake'), 350);
      return false;
    }
    state.items.push(it);
    if (!it.rest && synth.state.unlocked && synth.running && synth.running()) { synth.tone(midiToFreq(60 + 2 * (state.items.length % 4)), { type: 'triangle', dur: 0.35, gain: 0.7 }); }
    show();
    if (isFull(state.items, state.ts)) { say(`The bar is full: ${state.ts}, ${barBeats(state.ts)} beats. Press play to hear it.`, `這一小節填滿了：${state.ts}、${barBeats(state.ts)} 拍。按播放聽聽看。`); }
    else say(`${nameOf(it).en}: ${itemBeats(it)} ${itemBeats(it) === 1 ? 'beat' : 'beats'}. ${remaining(state.items, state.ts)} left.`, `${nameOf(it).zh}：${itemBeats(it)} 拍。還剩 ${remaining(state.items, state.ts)} 拍。`);
    return true;
  }
  const plan = () => scheduleBar(state.items, BPM);
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer); synth.stopAll();
    state.playing = false; $('.mu-vl-play').innerHTML = '&#9654; Play the bar · 播放這一小節'; drawAll(-1);
  }
  function play() {
    stop();
    if (!state.items.length) return;
    synth.unlock();
    const ev = plan(), cap = barBeats(state.ts), spb = 60 / BPM;
    const total = Math.max(sumBeats(state.items), cap) * spb;
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) {
      ev.forEach((e) => { if (!e.rest) synth.tone(midiToFreq(e.midi), { type: 'triangle', at: base + e.time, dur: Math.max(0.1, e.dur * 0.95), gain: 0.9 }); });
      for (let b = 0; b < Math.round(sumBeats(state.items) > cap ? sumBeats(state.items) : cap); b++) synth.click(base + b * spb, { freq: b === 0 ? 1200 : 800, gain: 0.35 });
    }
    perfStart = performance.now() + LEAD * 1000;
    state.playing = true; $('.mu-vl-play').innerHTML = 'Stop · 停止';
    const loop = () => { const t = (performance.now() - perfStart) / 1000; drawAll(t < 0 ? -1 : t / spb); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; $('.mu-vl-play').innerHTML = '&#9654; Play the bar · 播放這一小節'; drawAll(-1); }, (total + LEAD) * 1000 + 80);
  }
  function setTs(ts) { stop(); state.ts = ts; state.items = []; show(); say(`${ts}: ${barBeats(ts)} quarter notes make one bar. Fill it exactly.`, `${ts}：一小節是 ${barBeats(ts)} 個四分音符的長度。剛好填滿它。`); }

  $$('[data-val]').forEach((b) => b.addEventListener('click', () => add(b.getAttribute('data-val'))));
  $$('[data-ts]').forEach((b) => b.addEventListener('click', () => setTs(b.getAttribute('data-ts'))));
  $$('[data-mod]').forEach((b) => b.addEventListener('click', () => { const k = b.getAttribute('data-mod'); state[k] = !state[k]; show(); }));
  $('.mu-vl-undo').addEventListener('click', () => { stop(); state.items.pop(); show(); });
  $('.mu-vl-clear').addEventListener('click', () => { stop(); state.items = []; show(); });
  $('.mu-vl-play').addEventListener('click', () => (state.playing ? stop() : play()));
  window.addEventListener('resize', () => drawAll(-1));
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);

  const DEMO = {
    fill() { stop(); state.ts = '4/4'; state.dot = false; state.rest = false; state.items = [{ v: 'half' }, { v: 'quarter' }, { v: 'eighth' }, { v: 'eighth' }]; show(); play(); },
    dotted() { stop(); state.ts = '4/4'; state.items = [{ v: 'half', dot: true }, { v: 'quarter' }]; show(); play(); say('A dotted half note is 3 beats: 2 plus half of 2. With one quarter note it fills 4/4.', '附點二分音符是 3 拍：2 拍加上它的一半。再加一個四分音符，就填滿 4/4。'); },
    rest() { stop(); state.ts = '4/4'; state.items = [{ v: 'quarter' }, { v: 'quarter', rest: true }, { v: 'half' }]; show(); play(); say('The rest is silent but it still takes one beat. Listen for the gap.', '休止符沒有聲音，但仍然占一拍。聽那個空隙。'); },
    split() { stop(); state.ts = '3/4'; state.items = [{ v: 'quarter' }, { v: 'quarter' }, { v: 'quarter' }]; show(); play(); say('Three quarter notes fill a 3/4 bar. Now try eighth notes: six of them fill the same bar.', '三個四分音符填滿一個 3/4 小節。再試試八分音符：六個填滿同一小節。'); },
  };
  show();
  say('Pick a time signature, then add notes one at a time until the bar is exactly full.', '選一個拍號，再一個一個加音符，直到剛好填滿一小節。');
  root.classList.add('al-ready');
  root.__lab = { state, plan, full: () => isFull(state.items, state.ts), add, undo: () => { state.items.pop(); show(); }, clear: () => { state.items = []; show(); }, play, stop,
    hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), demo: (v) => DEMO[v] && DEMO[v](), render: () => drawAll(-1), setTs };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function initBeatQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-bq-k'), score: root.querySelector('.mu-bq-score'), msg: root.querySelector('.mu-bq-msg'), cv: root.querySelector('.mu-bq-cv'),
    opts: [...root.querySelectorAll('[data-pick]')], next: root.querySelector('.mu-bq-next'), name: root.querySelector('.mu-bq-name') };
  let qs = makeBeatQuestions(mulberry32(seed()), 8), q = 0, first = 0, tried = false, done = false;
  const draw = () => drawMeasure(R.cv, { items: [qs[q].it], single: true });
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.name.innerHTML = 'In 4/4, how many beats does this get? <span class="zh">在 4/4 裡，這個符號占幾拍？</span>';
    R.opts.forEach((b) => { b.className = 'mu-bq-opt'; b.disabled = false; });
    R.next.hidden = true;
    R.msg.innerHTML = 'One quarter note is one beat. Is this longer or shorter than that?<span class="zh">一個四分音符是一拍。這個比它長還是比它短？</span>';
    draw();
  }
  function answer(b) {
    if (done) return;
    const btn = R.opts.find((x) => Number(x.getAttribute('data-pick')) === b);
    const it = qs[q].it, n = nameOf(it);
    if (b === qs[q].beats) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Yes: a ${n.en} is ${beatsLabel(b)} ${b === 1 ? 'beat' : 'beats'} in 4/4.<span class="zh">答對了：${n.zh}在 4/4 裡是 ${beatsLabel(b)} 拍。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Remember that each note is half as long as the one before it, and a dot adds half.<span class="zh">不是這個。記得每個音符的長度是前一個的一半，附點會再加上它的一半。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(Number(b.getAttribute('data-pick')))));
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeBeatQuestions(mulberry32(seed()), 8); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  window.addEventListener('resize', draw);
  void synth;
  ask();
  root.__beatq = { round: () => ({ ...qs[q].it, beats: qs[q].beats }), answer, score: () => ({ first, q }) };
}

function initSplit(root) {
  const synth = getSynth();
  const rows = [...root.querySelectorAll('[data-n]')];
  let timer = 0, raf = 0;
  function play(n) {
    synth.unlock(); synth.stopAll();
    clearTimeout(timer); cancelAnimationFrame(raf);
    rows.forEach((r) => r.classList.toggle('is-on', Number(r.getAttribute('data-n')) === n));
    const ev = equalSplit(n, 60), base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) { ev.forEach((e) => synth.tone(midiToFreq(60 + (e.i % 2) * 7), { type: 'triangle', at: base + e.time, dur: Math.max(0.08, e.dur * 0.8), gain: 0.8 })); }
    const row = rows.find((r) => Number(r.getAttribute('data-n')) === n), t0 = performance.now() + LEAD * 1000;
    const bar = row && row.querySelector('.mu-sp-head');
    const loop = () => { const t = (performance.now() - t0) / 1000; if (bar) bar.style.width = `${Math.max(0, Math.min(1, t / 4)) * 100}%`; if (t < 4) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    timer = setTimeout(() => { rows.forEach((r) => r.classList.remove('is-on')); if (bar) bar.style.width = '0%'; }, 4000 + LEAD * 1000);
  }
  rows.forEach((r) => r.addEventListener('click', () => play(Number(r.getAttribute('data-n')))));
  watchOffscreen(root);
  root.__split = { play };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const b = document.querySelector('[data-mu-beatq]'); if (b) initBeatQ(b);
  const s = document.querySelector('[data-mu-split]'); if (s) initSplit(s);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musvalues-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void VALUES; void SPLIT_ROWS; void splitValueKey; void valueOf; void BEAT_OPTIONS;
