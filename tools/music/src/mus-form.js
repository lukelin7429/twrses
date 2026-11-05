/*
 * 音樂 Music · 第十七課「一首歌是怎麼組成的？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：一首歌由「重複」與「變化」搭起來。三個我們自己寫的段落 A、B、C 是三種色塊，排成不同的順序就是不同的結構；
 * 同一個色塊回來時，聽起來完全一樣（重複），換一個色塊就是變化。
 *   [data-fm-add] 加一個段落  [data-fm-hear] 單聽一個段落  [data-fm-preset] 現成的結構  .mu-fm-back 退一格  .mu-fm-clear 清空  .mu-fm-play 播放
 * 2D（不需要 WebGL）：「這首的結構是什麼？」（[data-mu-formq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-form.js
 * 除錯：document.querySelector('[data-musform-lab]').__lab
 *   state（slots、playing）、add(k)、back()、clear()、setForm('ABAB')、play()、stop()、events()、hz()、nowPlaying()、render()
 *   [data-mu-formq].__formq：round()、answer('AABA')、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BPM, FORMS, KEYS, MAX_SLOTS, SECTIONS, SECTION_BEATS, beatSeconds, distinctCount, formOf, makeFormRounds, positions, renderForm, repeatCount, totalSeconds } from './form.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const MELODY_AMPS = [1, 0.45, 0.2, 0.1], BASS_AMPS = [1, 0.5, 0.15];

export function scheduleForm(synth, base, form) {
  renderForm(form).forEach((e) => {
    const at = Math.max(base, base + e.time);
    if (e.part === 'melody') synth.toneComplex(midiToFreq(e.midi), MELODY_AMPS, { at, env: { attack: 0.01, decay: 0.5, sustain: 0 }, dur: Math.max(0.12, e.dur), gain: 0.5 });
    else synth.toneComplex(midiToFreq(e.midi), BASS_AMPS, { at, env: { attack: 0.01, decay: 0.6, sustain: 0 }, dur: Math.max(0.2, e.dur), gain: 0.45 });
  });
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const slotsEl = $('.mu-fm-slots'), msg = $('.mu-msg');
  const state = { slots: 'ABAB', playing: false };
  let timers = [], endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show(active = -1) {
    slotsEl.innerHTML = [...state.slots].map((k, i) => `<span class="mu-fm-blk mu-fm-${k}${i === active ? ' is-now' : ''}" aria-label="Slot ${i + 1}: section ${k}"><b>${k}</b><small>${i + 1}</small></span>`).join('') || '<span class="mu-fm-empty">Add a section with the buttons above. · 用上面的按鈕加一個段落。</span>';
    const f = state.slots, pos = positions(f), n = f.length;
    $('.mu-fm-info').innerHTML = n ? `<b>${[...f].join(' ')}</b> <small>${n} section${n > 1 ? 's' : ''}, ${distinctCount(f)} different, ${repeatCount(f)} repeated · ${n} 個段落，${distinctCount(f)} 種不同，${repeatCount(f)} 次回來（重複）；${totalSeconds(f).toFixed(0)} s</small>` : '<b>—</b>';
    $$('[data-fm-preset]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-fm-preset') === f ? 'true' : 'false'));
    $('.mu-fm-play').disabled = !n;
    void pos;
  }
  function stop() {
    timers.forEach(clearTimeout); timers = []; clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-fm-play').innerHTML = '&#9654; Play · 播放'; show(-1);
  }
  function playForm(form, label) {
    stop();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD, bs = beatSeconds();
    if (audioOn(synth)) scheduleForm(synth, base, form);
    state.playing = true; $('.mu-fm-play').innerHTML = 'Stop · 停止';
    [...form].forEach((k, i) => timers.push(setTimeout(() => show(label ? i : i), (LEAD + i * SECTION_BEATS * bs) * 1000)));
    endTimer = setTimeout(() => { state.playing = false; $('.mu-fm-play').innerHTML = '&#9654; Play · 播放'; show(-1); }, (totalSeconds(form) + LEAD) * 1000 + 100);
  }
  function play() { if (!state.slots) return; playForm(state.slots, true); say('Playing your song. Each time a color comes back, the music comes back exactly the same.', '播放你的歌。每次同一種顏色回來，音樂就原封不動地回來。'); }
  function hear(k) { stop(); synth.unlock(); const base = (audioOn(synth) ? synth.clock() : 0) + LEAD; if (audioOn(synth)) scheduleForm(synth, base, k); state.playing = true; $('.mu-fm-play').innerHTML = 'Stop · 停止'; endTimer = setTimeout(() => { state.playing = false; $('.mu-fm-play').innerHTML = '&#9654; Play · 播放'; }, (totalSeconds(k) + LEAD) * 1000 + 100); say(`Section ${k} by itself. Compare it with the others.`, `${k} 段單獨聽。和其他的比較看看。`); }
  const add = (k) => { if (state.slots.length < MAX_SLOTS && KEYS.includes(k)) { state.slots += k; show(); } };
  const back = () => { state.slots = state.slots.slice(0, -1); show(); };
  const clear = () => { stop(); state.slots = ''; show(); };
  const setForm = (f) => { stop(); state.slots = f.slice(0, MAX_SLOTS); show(); };
  $$('[data-fm-add]').forEach((b) => b.addEventListener('click', () => add(b.getAttribute('data-fm-add'))));
  $$('[data-fm-hear]').forEach((b) => b.addEventListener('click', () => hear(b.getAttribute('data-fm-hear'))));
  $$('[data-fm-preset]').forEach((b) => b.addEventListener('click', () => { setForm(b.getAttribute('data-fm-preset')); play(); }));
  $('.mu-fm-back').addEventListener('click', back);
  $('.mu-fm-clear').addEventListener('click', clear);
  $('.mu-fm-play').addEventListener('click', () => (state.playing ? stop() : play()));
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Add colored sections in any order, then press play. A, B, and C are our own short tunes, not any real song.', '用任何順序加上彩色的段落，再按播放。A、B、C 是我們自己寫的短旋律，不是任何真的歌。');
  root.classList.add('al-ready');
  root.__lab = { state, add, back, clear, setForm, play, stop, events: () => renderForm(state.slots), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { setForm(String(v)); play(); } };
}

function initFormQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-fq-k'), score: root.querySelector('.mu-fq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-fq-next'), listen: root.querySelector('.mu-fq-listen'), show: root.querySelector('.mu-fq-show'), hint: root.querySelector('.mu-fq-hint') };
  let qs = makeFormRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  function listen() {
    synth.unlock(); synth.stopAll();
    if (audioOn(synth)) scheduleForm(synth, synth.clock() + LEAD, qs[q]);
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “What is in the music”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「音樂裡有什麼」。</span>';
  }
  function showHint() {
    const f = qs[q], pos = positions(f);
    R.hint.hidden = false;
    R.hint.innerHTML = '<span class="mu-st-k">What is in the music · 音樂裡有什麼</span><ul>' +
      `<li>The song has ${f.length} sections, and ${distinctCount(f)} of them are different.<span class="zh">這首歌有 ${f.length} 個段落，其中 ${distinctCount(f)} 種不同。</span></li>` +
      `<li>The first section comes back ${pos[f[0]].length - 1} time${pos[f[0]].length - 1 === 1 ? '' : 's'}.<span class="zh">第一個段落回來了 ${pos[f[0]].length - 1} 次。</span></li>` +
      `<li>The last section is ${f[f.length - 1] === f[0] ? 'the same as the first one' : 'different from the first one'}.<span class="zh">最後一個段落${f[f.length - 1] === f[0] ? '和第一個一樣' : '和第一個不同'}。</span></li></ul>`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-eq-opt'; b.disabled = false; });
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'Each section is one color. Which order did you hear?<span class="zh">每個段落是一種顏色。你聽到的是哪一個順序？</span>';
  }
  function answer(key) {
    if (done) return;
    const btn = R.opts.find((x) => x.getAttribute('data-pick') === key);
    if (key === qs[q]) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      R.msg.innerHTML = `Yes: ${[...key].join(' ')}. The same letter always sounds the same.<span class="zh">答對了：${[...key].join(' ')}。同一個字母，聽起來永遠一樣。</span>`;
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
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeFormRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  root.__formq = { round: () => qs[q], answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-formq]'); if (q) initFormQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musform-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void BPM; void FORMS; void SECTIONS; void formOf;
