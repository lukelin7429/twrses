/*
 * 音樂 Music · 第十九課「貝多芬聽不見了，怎麼還能作曲？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：樂譜是把聲音寫下來的符號，看譜可以在腦子裡「聽」。旋律是我們自己寫的，不是貝多芬或任何人的曲子。
 *   [data-sc-bar] 把某一小節設成「在腦子裡聽」（譜在、音不響）  .mu-sc-play 播放  .mu-sc-reveal 揭曉（全部播出來）
 * 2D（不需要 WebGL）：「看譜猜旋律的樣子」（[data-mu-contourq]，六題；先看譜選，再按「聽聽看」對答案；沒有聲音也能玩）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-score.js
 * 除錯：document.querySelector('[data-musscore-lab]').__lab
 *   state（silent、playing）、toggle(bar)、play()、reveal()、stop()、events()、hz()、nowPlaying()、render()
 *   [data-mu-contourq].__contourq：round()、answer(輪廓)、score()、listen()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BARS, BAR_BEATS, BPM, CONTOURS, MELODY, beatSeconds, contourOf, makeContourRounds, posOf, renderScore } from './score.js';
import { drawScale } from './staff2d.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const AMPS = [1, 0.45, 0.2, 0.1];
const INK = '#1b1405', GREY = '#b4ad98';

function playNote(synth, midi, at, dur = 0.55) { synth.toneComplex(midiToFreq(midi), AMPS, { at, env: { attack: 0.01, decay: 0.5, sustain: 0 }, dur, gain: 0.5 }); }

function icon(key) {
  const P = { up: '4,26 14,19 24,12 34,5', down: '4,5 14,12 24,19 34,26', peak: '4,24 14,12 24,6 34,22', valley: '4,6 14,20 24,26 34,10', zigzag: '4,22 14,8 24,24 34,6' }[key];
  return `<svg viewBox="0 0 38 32" width="38" height="32" aria-hidden="true"><polyline points="${P}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cvs = [$('.mu-sc-cv0'), $('.mu-sc-cv1')], msg = $('.mu-msg');
  const state = { silent: [1, 3], playing: false };
  let timers = [], endTimer = 0, active = -1;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function draw(act = -1, revealed = false) {
    cvs.forEach((cv, row) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 640, h = cv.clientHeight || 130;
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
      const notes = MELODY.slice(row * 8, row * 8 + 8).map((m, i) => ({ pos: posOf(m), color: !revealed && state.silent.includes(Math.floor((row * 8 + i) / BAR_BEATS)) ? GREY : INK }));
      drawScale(cv, { notes, clef: 'treble', active: act >= row * 8 && act < row * 8 + 8 ? act - row * 8 : -1, ink: INK, maxS: 16 });
    });
  }
  function show() {
    $$('[data-sc-bar]').forEach((b) => { const on = state.silent.includes(+b.getAttribute('data-sc-bar')); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    const n = state.silent.length;
    $('.mu-sc-info').innerHTML = n ? `<b>${n} bar${n > 1 ? 's' : ''} to hear in your head · ${n} 個小節要在腦子裡聽</b> <small>gray notes make no sound; try to imagine them · 灰色的音不會響，試著在腦子裡想像</small>` : '<b>All bars will sound · 每個小節都會響</b>';
    draw(-1, false);
  }
  function stop() {
    timers.forEach(clearTimeout); timers = []; clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-sc-play').innerHTML = '&#9654; Play · 播放'; draw(-1, false);
  }
  function run(silent, revealed) {
    stop();
    synth.unlock();
    const r = renderScore(silent), bs = beatSeconds(), base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    state.playing = true; $('.mu-sc-play').innerHTML = 'Stop · 停止';
    r.notes.forEach((n, i) => {
      if (n.sound && audioOn(synth)) playNote(synth, n.midi, base + n.time, bs * 1.2);
      timers.push(setTimeout(() => {
        draw(i, revealed);
        if (!n.sound && n.beat % BAR_BEATS === 0) say(`Bar ${n.bar + 1}: your turn! Hear it in your head.`, `第 ${n.bar + 1} 小節：換你了！在腦子裡聽。`);
        else if (n.sound && n.beat % BAR_BEATS === 0 && !revealed) say(`Bar ${n.bar + 1}: listen.`, `第 ${n.bar + 1} 小節：聽。`);
      }, (LEAD + n.time) * 1000));
    });
    endTimer = setTimeout(() => { state.playing = false; $('.mu-sc-play').innerHTML = '&#9654; Play · 播放'; draw(-1, revealed); if (!revealed && silent.length) say('Now press “Reveal” to hear the bars you imagined, and check.', '現在按「揭曉」，聽聽你剛剛想像的小節，對答案。'); }, (r.total + LEAD) * 1000 + 150);
  }
  const play = () => run(state.silent, false);
  const reveal = () => { say('Here is the whole tune, with every note sounding. Did your head hear the same thing?', '這是完整的旋律，每個音都響。你腦子裡聽到的一樣嗎？'); run([], true); };
  const toggle = (bar) => { stop(); const i = state.silent.indexOf(bar); if (i >= 0) state.silent.splice(i, 1); else state.silent.push(bar); state.silent.sort(); show(); };
  $$('[data-sc-bar]').forEach((b) => b.addEventListener('click', () => toggle(+b.getAttribute('data-sc-bar'))));
  $('.mu-sc-play').addEventListener('click', () => (state.playing ? stop() : play()));
  $('.mu-sc-reveal').addEventListener('click', reveal);
  window.addEventListener('resize', show);
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Bars 2 and 4 are set to silent. Read the gray notes, press play, and hear them in your head. Then press “Reveal”.', '第 2 和第 4 小節設成無聲。讀一讀灰色的音，按播放，在腦子裡聽。再按「揭曉」。');
  root.classList.add('al-ready');
  root.__lab = { state, toggle, play, reveal, stop, events: () => renderScore(state.silent), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { state.silent = String(v).split(',').filter((x) => x !== '').map(Number); show(); if (String(v) === 'all') { state.silent = []; reveal(); } else play(); } };
}

function initContourQ(root) {
  const synth = getSynth();
  const cv = root.querySelector('.mu-ct-cv');
  const R = { k: root.querySelector('.mu-ct-k'), score: root.querySelector('.mu-ct-score'), msg: root.querySelector('.mu-q-msg'), optsBox: root.querySelector('.mu-ct-opts'),
    next: root.querySelector('.mu-ct-next'), listen: root.querySelector('.mu-ct-listen'), hint: root.querySelector('.mu-ct-hint') };
  let qs = makeContourRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false, opts = [];
  function draw(act = -1) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 560, h = cv.clientHeight || 130;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    drawScale(cv, { notes: qs[q].pitches.map((m) => ({ pos: posOf(m) })), clef: 'treble', active: act, ink: INK, maxS: 17 });
  }
  function listen() {
    synth.unlock(); synth.stopAll();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD, bs = beatSeconds();
    qs[q].pitches.forEach((m, i) => { if (audioOn(synth)) playNote(synth, m, base + i * bs, bs * 1.1); setTimeout(() => draw(i), (LEAD + i * bs) * 1000); });
    setTimeout(() => draw(-1), (LEAD + 4 * bs) * 1000);
    if (!audioOn(synth)) R.hint.innerHTML = 'No sound yet, but the notes still moved. Turn the sound on in the bar above to hear them.<span class="zh">還沒有聲音，但音符還是動了。請在上方的聲音列開啟聲音來聽。</span>';
    R.hint.hidden = false;
  }
  function ask() {
    tried = false; done = false; draw(-1);
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.optsBox.innerHTML = qs[q].options.map((k) => { const c = contourOf(k); return `<button type="button" class="mu-eq-opt mu-ct-opt" data-pick="${k}">${icon(k)}<b>${c.en}</b><small>${c.zh}</small></button>`; }).join('');
    opts = [...R.optsBox.querySelectorAll('[data-pick]')];
    opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'Read the four notes. Does the tune climb, fall, make a hill, a valley, or a zigzag? Choose first, then press “Listen” to check.<span class="zh">讀這四個音。旋律是往上、往下、山峰、山谷，還是鋸齒？先選，再按「聽聽看」對答案。</span>';
  }
  function answer(key) {
    if (done) return;
    const btn = opts.find((x) => x.getAttribute('data-pick') === key), c = contourOf(qs[q].answer);
    if (key === qs[q].answer) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); opts.forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Yes: ${c.en.toLowerCase()}, because ${c.hint_en}. You read it from the page.<span class="zh">答對了：${c.zh}，因為${c.hint_zh}。你是從譜上讀出來的。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Look at whether each note is higher or lower than the one before.<span class="zh">不是這個。看看每個音比前一個高還是低。</span>';
    }
  }
  R.listen.addEventListener('click', listen);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeContourRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  window.addEventListener('resize', () => draw(-1));
  watchOffscreen(root);
  ask();
  root.__contourq = { round: () => qs[q], answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-contourq]'); if (q) initContourQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musscore-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void BARS; void BPM; void CONTOURS;
