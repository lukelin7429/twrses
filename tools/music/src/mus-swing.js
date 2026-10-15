/*
 * 音樂 Music · 第十四課「爵士樂為什麼聽起來像爵士？」的互動（2D＋聲音；沒有 3D，因為只有時間、沒有空間結構）。
 *
 * 一個機制：把每一拍裡的兩個八分音符從「平均」切成「長—短」，就是搖擺。畫面是「鋼琴卷」：旋律音（金）、低音（青綠）、
 * 反拍的小點（hi-hat），滑桿改變比例時，反拍的音往後移，其他都不動；速度不變。
 *   .mu-sw-ratio 比例滑桿  [data-sw-preset] 平均／2:1／3:1  .mu-sw-bpm 速度  .mu-sw-play 播放
 * 2D（不需要 WebGL）：「平均還是搖擺？」（[data-mu-swingq]，六題）、「即興：點音，貼到搖擺的格子上」（[data-mu-improv]）。
 * 旋律、低音、和弦都是我們自己寫的，不是任何現成的爵士曲。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-swing.js
 * 除錯：document.querySelector('[data-musswing-lab]').__lab
 *   state（ratio、bpm、hat、playing）、play()、stop()、setRatio(r)、setBpm(b)、events()、hz()、nowPlaying()、render()
 *   [data-mu-swingq].__swingq：round()、answer('straight'|'swung')、score()
 *   [data-mu-improv].__improv：tap(midi)、taps()、setRatio(r)、back()、clear()、start()、stop()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BASS, BEATS, MELODY, PENTA, RATIO_MAX, RATIO_MIN, beatSeconds, clampBpm, clampRatio, eighthBeat, makeSwingRounds, nearestEighth, noteName, offbeatPos, quantizeTaps, renderSwing, split, totalSeconds } from './swing.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const pct = (x) => Math.round(x * 100);
const MELODY_AMPS = [1, 0.45, 0.2, 0.1], BASS_AMPS = [1, 0.5, 0.15];

export function scheduleSwing(synth, base, { bpm, ratio, hat = true, loops = 1, melody = true } = {}) {
  const per = totalSeconds(bpm);
  for (let L = 0; L < loops; L++) {
    renderSwing({ bpm, ratio, hat }).forEach((e) => {
      const at = base + L * per + e.time;
      if (e.part === 'melody' && melody) synth.toneComplex(midiToFreq(e.midi), MELODY_AMPS, { at, env: { attack: 0.01, decay: 0.4, sustain: 0 }, dur: Math.max(0.1, Math.min(0.9, e.dur * 1.05)), gain: 0.5 });
      else if (e.part === 'bass') synth.toneComplex(midiToFreq(e.midi), BASS_AMPS, { at, env: { attack: 0.01, decay: 0.45, sustain: 0 }, dur: 0.45, gain: 0.5 });
      else if (e.part === 'hat') synth.noiseBurst({ freq: 7000, q: 0.8, dur: 0.05, gain: e.eighth % 2 ? 0.1 : 0.18, type: 'highpass', at });
    });
  }
}

function drawRoll(cv, { ratio, bpm, hat }, playheadSec = -1, tapsAt = []) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 700, h = cv.clientHeight || 230;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  const T = totalSeconds(bpm), bs = beatSeconds(bpm), top = 18, lo = 34, hi = 77, rollH = h - top - 34;
  const X = (t) => 10 + (t / T) * (w - 20), Y = (m) => top + (1 - (m - lo) / (hi - lo)) * rollH;
  c.font = '600 10px "PingFang TC", sans-serif';
  for (let b = 0; b <= BEATS; b++) {
    const x = X(b * bs), bar = b % 4 === 0;
    c.strokeStyle = bar ? '#cfc8ae' : '#e8e3d0'; c.lineWidth = bar ? 1.5 : 1;
    c.beginPath(); c.moveTo(x, top - 4); c.lineTo(x, top + rollH + 6); c.stroke();
    if (b < BEATS) { c.fillStyle = '#9a927a'; c.fillText(bar ? String(b / 4 + 1) : '', x + 3, top - 6); }
    // 這一拍的「中點」：平均的反拍應該在這裡
    if (b < BEATS) { const xm = X((b + 0.5) * bs); c.strokeStyle = '#e8e3d0'; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(xm, top); c.lineTo(xm, top + rollH); c.stroke(); c.setLineDash([]); }
  }
  const ev = renderSwing({ bpm, ratio, hat });
  ev.forEach((e) => {
    if (e.part === 'hat') {
      c.fillStyle = e.eighth % 2 ? '#d6573a' : 'rgba(107,100,80,.55)';
      c.beginPath(); c.arc(X(e.time), top + rollH + 14, e.eighth % 2 ? 3.5 : 2.5, 0, 7); c.fill();
      return;
    }
    const x = X(e.time), wd = Math.max(2, X(e.time + e.dur) - x - 1);
    c.fillStyle = e.part === 'melody' ? (e.eighth % 2 ? '#e0831c' : '#d89b1d') : 'rgba(13,157,140,.55)';
    c.fillRect(x, Y(e.midi) - 3.5, wd, e.part === 'melody' ? 7 : 5);
  });
  tapsAt.forEach((t) => { c.fillStyle = '#7a3fb3'; c.beginPath(); c.arc(X(t.time), Y(t.midi), 4.5, 0, 7); c.fill(); });
  c.fillStyle = '#6b6450'; c.fillText('off-beat · 反拍', 12, top + rollH + 30);
  if (playheadSec >= 0) { c.strokeStyle = '#0d9d8c'; c.lineWidth = 2; c.beginPath(); c.moveTo(X(playheadSec), top - 4); c.lineTo(X(playheadSec), top + rollH + 8); c.stroke(); }
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-sw-cv'), msg = $('.mu-msg');
  const state = { ratio: 1, bpm: 120, hat: true, playing: false };
  let raf = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const info = () => {
    const s = split(state.ratio), r = state.ratio;
    const label = r === 1 ? 'straight · 平均' : `${(+r.toFixed(1)).toString()} : 1`;
    $('.mu-sw-info').innerHTML = `<b>${label}</b> <small>first eighth note ${pct(s.first)}% of the beat, second ${pct(s.second)}% · 前面的八分音符佔一拍的 ${pct(s.first)}%，後面的佔 ${pct(s.second)}%；反拍的音開始在一拍的 ${pct(offbeatPos(r))}%（平均是 50%）</small>`;
  };
  function show() {
    $('.mu-sw-ratio').value = String(state.ratio); $('.mu-sw-bpm').value = String(state.bpm);
    $('.mu-sw-val').textContent = state.ratio === 1 ? '1 : 1' : `${(+state.ratio.toFixed(1))} : 1`;
    $('.mu-sw-bpmv').textContent = `${state.bpm}`;
    $$('[data-sw-preset]').forEach((b) => b.setAttribute('aria-pressed', Math.abs(+b.getAttribute('data-sw-preset') - state.ratio) < 0.001 ? 'true' : 'false'));
    const ht = $('.mu-sw-hat'); if (ht) ht.setAttribute('aria-pressed', state.hat ? 'true' : 'false');
    info(); drawRoll(cv, state, -1);
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-sw-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state, -1);
  }
  function play() {
    stop(); show();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) scheduleSwing(synth, base, { bpm: state.bpm, ratio: state.ratio, hat: state.hat, loops: 1 });
    state.playing = true; $('.mu-sw-play').innerHTML = 'Stop · 停止';
    const t0p = performance.now() + LEAD * 1000, total = totalSeconds(state.bpm) + 0.5;
    const loop = () => { const t = (performance.now() - t0p) / 1000; drawRoll(cv, state, Math.max(0, t)); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; $('.mu-sw-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state, -1); }, (total + LEAD) * 1000 + 100);
    if (state.ratio === 1) say('Straight: each beat is split into two equal halves. The tempo and the notes are the same as in any version.', '平均：每一拍切成兩個一樣長的一半。速度和音高跟其他版本都一樣。');
    else say('Swung: the first eighth note is longer and the second is shorter, so the off-beat notes (orange) arrive later. The beat itself did not move.', '搖擺：前面的八分音符變長、後面的變短，所以反拍的音（橘色）來得比較晚。拍子本身沒有動。');
  }
  const setRatio = (r) => { state.ratio = clampRatio(Math.round(r * 10) / 10); show(); };
  const setBpm = (b) => { state.bpm = clampBpm(b); show(); };
  const rg = $('.mu-sw-ratio'); rg.min = String(RATIO_MIN); rg.max = String(RATIO_MAX); rg.step = '0.1';
  rg.addEventListener('input', () => setRatio(+rg.value));
  rg.addEventListener('change', () => { if (state.playing) play(); });
  const bg = $('.mu-sw-bpm'); bg.addEventListener('input', () => setBpm(+bg.value)); bg.addEventListener('change', () => { if (state.playing) play(); });
  $$('[data-sw-preset]').forEach((b) => b.addEventListener('click', () => { setRatio(+b.getAttribute('data-sw-preset')); play(); }));
  $('.mu-sw-play').addEventListener('click', () => (state.playing ? stop() : play()));
  const ht = $('.mu-sw-hat'); if (ht) ht.addEventListener('click', () => { state.hat = !state.hat; show(); });
  window.addEventListener('resize', show);
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Press play, then drag the slider. Only the off-beat notes (orange) move later. Try “2 : 1”.', '按播放，再拖動滑桿。只有反拍的音（橘色）會往後移。試試「2 : 1」。');
  root.classList.add('al-ready');
  root.__lab = { state, play, stop, setRatio, setBpm, events: () => renderSwing({ bpm: state.bpm, ratio: state.ratio, hat: state.hat }), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { setRatio(+v || 1); play(); } };
}

function initSwingQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-sq-k'), score: root.querySelector('.mu-sq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-sq-next'), listen: root.querySelector('.mu-sq-listen'), show: root.querySelector('.mu-sq-show'), hint: root.querySelector('.mu-sq-hint') };
  let qs = makeSwingRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  function listen() {
    synth.unlock(); synth.stopAll();
    if (audioOn(synth)) scheduleSwing(synth, synth.clock() + LEAD, { bpm: qs[q].bpm, ratio: qs[q].ratio, hat: true, loops: 1 });
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “What is in the music”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「音樂裡有什麼」。</span>';
  }
  function showHint() {
    const r = qs[q], p = offbeatPos(r.ratio);
    R.hint.hidden = false;
    R.hint.innerHTML = '<span class="mu-st-k">What is in the music · 音樂裡有什麼</span><ul>' +
      `<li>The second eighth note of each beat starts ${pct(p)}% of the way through the beat. (Straight is 50%.)<span class="zh">每一拍的第二個八分音符，開始在這一拍的 ${pct(p)}%。（平均是 50%。）</span></li>` +
      `<li>${r.swung ? 'The first eighth note is longer than the second.' : 'The two eighth notes are the same length.'}<span class="zh">${r.swung ? '前面的八分音符比後面的長。' : '兩個八分音符一樣長。'}</span></li></ul>`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-eq-opt'; b.disabled = false; });
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'The tune and the tempo are the same. Is it straight or swung?<span class="zh">旋律和速度都一樣。是平均的，還是搖擺的？</span>';
  }
  function answer(key) {
    if (done) return;
    const btn = R.opts.find((x) => x.getAttribute('data-pick') === key), truth = qs[q].swung ? 'swung' : 'straight';
    if (key === truth) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      R.msg.innerHTML = qs[q].swung ? 'Yes: swung. The off-beat notes come later than the middle of the beat.<span class="zh">答對了：搖擺。反拍的音比一拍的中點晚。</span>' : 'Yes: straight. The off-beat notes are exactly in the middle of the beat.<span class="zh">答對了：平均。反拍的音剛好在一拍的中間。</span>';
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “What is in the music”.<span class="zh">不是這個。再聽一次，或按「音樂裡有什麼」。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listen.addEventListener('click', listen);
  R.show.addEventListener('click', showHint);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeSwingRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  watchOffscreen(root);
  ask();
  root.__swingq = { round: () => qs[q], answer, score: () => ({ first, q }), listen };
}

function initImprov(root) {
  const synth = getSynth();
  const $ = (s) => root.querySelector(s);
  const cv = $('.mu-im-cv'), msg = $('.mu-msg'), log = $('.mu-im-log');
  const S = { ratio: 2, bpm: 110, running: false, t0: 0, taps: [], loops: 4 };
  let raf = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const draw = (ph = -1) => {
    const q = quantizeTaps(S.taps, S.ratio, S.bpm).filter((x) => x.time <= totalSeconds(S.bpm) * 1.0);
    drawRoll(cv, { ratio: S.ratio, bpm: S.bpm, hat: true }, ph, q.map((x) => ({ time: x.time, midi: x.midi })));
  };
  function showLog() {
    const q = quantizeTaps(S.taps, S.ratio, S.bpm);
    log.innerHTML = q.length ? q.map((x) => `<span class="mu-im-chip">${noteName(x.midi)} · beat ${Math.floor(x.eighth / 2) % 16 + 1}${x.eighth % 2 ? ' (off-beat 反拍)' : ''}</span>`).join(' ') : '<span class="mu-im-empty">Your notes will show up here. · 你點的音會出現在這裡。</span>';
  }
  function setRatio(r) {
    S.ratio = r;
    root.querySelectorAll('[data-im-ratio]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-im-ratio') === r ? 'true' : 'false'));
    draw(); showLog();
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (S.running) synth.stopAll();
    S.running = false; $('.mu-im-go').innerHTML = '&#9654; Start the band · 開始伴奏'; draw();
  }
  function start() {
    stop(); S.taps = []; showLog();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) scheduleSwing(synth, base, { bpm: S.bpm, ratio: S.ratio, hat: true, loops: S.loops, melody: false });
    S.running = true; S.t0 = performance.now() + LEAD * 1000; $('.mu-im-go').innerHTML = 'Stop · 停止';
    const total = totalSeconds(S.bpm) * S.loops;
    const loop = () => { const t = (performance.now() - S.t0) / 1000; draw(Math.max(0, t % totalSeconds(S.bpm))); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => stop(), (total + LEAD) * 1000 + 100);
    say('The band plays only bass and hi-hat. Tap notes of the five-note scale. They are placed on the grid of the swing you chose.', '樂隊只有低音和 hi-hat。點五聲音階的音；它們會貼到你選的搖擺格子上。');
  }
  function tap(midi) {
    synth.unlock();
    if (audioOn(synth)) synth.toneComplex(midiToFreq(midi), MELODY_AMPS, { env: { attack: 0.01, decay: 0.5, sustain: 0 }, dur: 0.5, gain: 0.5 });
    const beatPos = S.running ? ((performance.now() - S.t0) / 1000 / beatSeconds(S.bpm)) % BEATS : S.taps.length * 0.5;
    S.taps.push({ beat: Math.max(0, beatPos), midi });
    if (S.taps.length > 24) S.taps.shift();
    draw(); showLog();
  }
  function back() {
    stop();
    const q = quantizeTaps(S.taps, S.ratio, S.bpm);
    if (!q.length) { say('Tap some notes first.', '先點幾個音。'); return; }
    synth.unlock();
    if (audioOn(synth)) {
      const base = synth.clock() + LEAD;
      scheduleSwing(synth, base, { bpm: S.bpm, ratio: S.ratio, hat: true, loops: 1, melody: false });
      q.forEach((x) => synth.toneComplex(midiToFreq(x.midi), MELODY_AMPS, { at: base + x.time, env: { attack: 0.01, decay: 0.45, sustain: 0 }, dur: 0.45, gain: 0.5 }));
    }
    say(`Your phrase, snapped to the ${S.ratio === 1 ? 'straight' : 'swung'} grid.`, `你的樂句，貼到${S.ratio === 1 ? '平均' : '搖擺'}的格子上。`);
  }
  root.querySelectorAll('[data-note]').forEach((b) => b.addEventListener('click', () => tap(+b.getAttribute('data-note'))));
  root.querySelectorAll('[data-im-ratio]').forEach((b) => b.addEventListener('click', () => setRatio(+b.getAttribute('data-im-ratio'))));
  $('.mu-im-go').addEventListener('click', () => (S.running ? stop() : start()));
  $('.mu-im-back').addEventListener('click', back);
  $('.mu-im-clear').addEventListener('click', () => { S.taps = []; draw(); showLog(); });
  window.addEventListener('resize', () => draw());
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && S.running) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  setRatio(2);
  say('Start the band, then tap the notes. Press “Play it back” to hear your notes placed on the grid.', '開始伴奏，再點音。按「播放我的樂句」，聽你的音被貼到格子上。');
  root.__improv = { tap, taps: () => S.taps.slice(), setRatio, back, clear: () => { S.taps = []; draw(); showLog(); }, start, stop, state: S };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-swingq]'); if (q) initSwingQ(q);
  const im = document.querySelector('[data-mu-improv]'); if (im) initImprov(im);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musswing-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void BASS; void MELODY; void PENTA; void eighthBeat; void nearestEighth;
