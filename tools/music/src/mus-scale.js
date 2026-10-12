/*
 * 音樂 Music · 第七課「音階是什麼？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：音階是一串由低到高排好的音；相鄰兩音差一個全音（兩個半音）或一個半音；排列的圖樣不同，聽起來的性格就不同。
 * 「建一個音階」：選主音（C D E F G A B）與音階種類，從主音開始，在小鍵盤上一個一個點出下一個音；
 * 點錯會說「從 X 往上一個全音是 Y，你點的是 Z」；建好了顯示在五線譜上（含升降記號）並可播放。
 *   [data-tonic]  主音    [data-scale]  音階種類（major｜minor｜majpent｜minpent）
 *   .mu-sc-reveal 直接顯示整個音階    .mu-sc-play 播放    .mu-sc-reset 重來
 * 2D（不需要 WebGL）：「同一段旋律換音階」（[data-mu-tune]）、「這是哪一種音階？」（[data-mu-scaleq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-scale.js
 * 除錯：document.querySelector('[data-musscale-lab]').__lab
 *   state（tonic、scale、built、custom）、notes()、press(midi)、reveal()、play()、setTonic(t)、setScale(k)、hz()、nowPlaying()、demo(name)
 *   [data-mu-tune].__tune：play(scaleKey)、notes(scaleKey)；[data-mu-scaleq].__scaleq：round()（{ tonic, scale, pattern }）、answer(key)、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { drawScale } from './staff2d.js';
import { BLACK_KEYS, SCALES, TONICS, gapName, gaps, makeScaleRounds, patternOf, scheduleNotes, spell, spellNames, tuneNotes } from './scale.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const BPM = 110, LEAD = 0.12;
const KB_LO = 60, KB_HI = 84;     // C4 到 C6
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const fmt = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(2));
const WHITE_PC = [0, 2, 4, 5, 7, 9, 11];
const isBlack = (m) => !WHITE_PC.includes(m % 12);
const pretty = (n) => `${n.letter}${n.accSym}`;

/** 排音階／旋律的聲音：回傳總秒數 */
function scheduleSound(synth, notes, bpm, { defaultBeats = 1, base }) {
  const ev = scheduleNotes(notes, bpm, defaultBeats);
  if (audioOn(synth)) ev.forEach((e) => synth.tone(midiToFreq(e.midi), { type: 'triangle', at: base + e.time, dur: Math.max(0.1, e.dur * 0.92), gain: 0.9 }));
  const last = ev[ev.length - 1];
  return { ev, total: last ? last.time + last.dur : 0 };
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-sc-cv'), kb = $('.mu-sc-kb'), strip = $('.mu-sc-steps'), msg = $('.mu-msg'), pat = $('.mu-sc-pat');
  const state = { tonic: 'C', scale: 'major', built: 1, custom: null, playing: false, active: -1 };
  let raf = 0, endTimer = 0, perfStart = 0, evs = [];
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const notes = () => state.custom || spell(state.tonic, state.scale);
  const sc = () => SCALES[state.scale];

  // 小鍵盤：C4–C6，白鍵等寬、黑鍵疊在上面
  const whites = []; for (let m = KB_LO; m <= KB_HI; m++) if (!isBlack(m)) whites.push(m);
  kb.innerHTML = '';
  const keyEl = {};
  for (let m = KB_LO; m <= KB_HI; m++) {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.midi = String(m);
    const black = isBlack(m);
    b.className = `mu-sc-key ${black ? 'is-black' : 'is-white'}`;
    const wi = black ? whites.filter((x) => x < m).length : whites.indexOf(m);
    const w = 100 / whites.length;
    if (black) { b.style.left = `${wi * w - w * 0.3}%`; b.style.width = `${w * 0.6}%`; } else { b.style.left = `${wi * w}%`; b.style.width = `${w}%`; }
    b.setAttribute('aria-label', `${midi2name(m)}, ${fmt(midiToFreq(m))} Hz`);
    kb.appendChild(b); keyEl[m] = b;
  }
  function midi2name(m) { const L = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']; return `${L[m % 12]}${Math.floor(m / 12) - 1}`; }

  function neededGap() { const n = notes(); return state.built < n.length ? n[state.built].midi - n[state.built - 1].midi : 0; }
  function show() {
    const n = notes(), shown = n.slice(0, state.built);
    $$('[data-tonic]').forEach((b) => b.setAttribute('aria-pressed', !state.custom && b.getAttribute('data-tonic') === state.tonic ? 'true' : 'false'));
    $$('[data-scale]').forEach((b) => b.setAttribute('aria-pressed', !state.custom && b.getAttribute('data-scale') === state.scale ? 'true' : 'false'));
    // 步階條：音名與其間的全音／半音
    let html = '';
    shown.forEach((nt, i) => {
      if (i > 0) { const g = nt.midi - shown[i - 1].midi, gn = gapName(g); html += `<span class="mu-sc-gap g${Math.min(g, 3)}" title="${gn.en} · ${gn.zh}"><b>${gn.short}</b></span>`; }
      html += `<span class="mu-sc-note${i === state.active ? ' is-play' : ''}${i === 0 || i === n.length - 1 ? ' is-root' : ''}"><b>${pretty(nt)}</b><small>${state.custom ? '' : i + 1}</small></span>`;
    });
    if (state.built < n.length) html += `<span class="mu-sc-gap g0"><b>?</b></span><span class="mu-sc-note is-next"><b>?</b></span>`;
    strip.innerHTML = html;
    // 圖樣
    const semis = state.custom ? n.map((x) => x.midi - n[0].midi) : sc().semis;
    const gs = gaps(semis);
    pat.innerHTML = '<span class="mu-st-k">Step pattern · 步階圖樣</span> ' + gs.map((g, i) => `<span class="mu-sc-pg g${Math.min(g, 3)}${i === state.built - 1 ? ' is-next' : ''}${i < state.built - 1 ? ' is-done' : ''}">${gapName(g).short}</span>`).join('');
    // 鍵盤
    Object.entries(keyEl).forEach(([m, el]) => {
      const midi = Number(m), idx = shown.findIndex((x) => x.midi === midi);
      el.classList.toggle('is-on', idx >= 0);
      el.classList.toggle('is-root', idx === 0 || (idx >= 0 && idx === n.length - 1));
      el.classList.toggle('is-play', idx >= 0 && idx === state.active);
    });
    $('.mu-sc-play').disabled = state.built < 2;
    drawScale(cv, { notes: shown.map((x) => ({ pos: x.pos, acc: x.acc })), active: state.active });
    root.classList.toggle('is-done', state.built >= n.length);
  }
  function sound(midi) {
    synth.unlock();
    if (synth.state.unlocked && !synth.state.muted) { synth.stopAll(); synth.tone(midiToFreq(midi), { type: 'triangle', dur: 0.9, gain: 0.9 }); }
  }
  function press(midi) {
    stop();
    sound(midi);
    if (state.custom) { say(`${midi2name(midi)}: ${fmt(midiToFreq(midi))} Hz.`, `${midi2name(midi)}：${fmt(midiToFreq(midi))} 赫茲。`); return; }
    const n = notes();
    if (state.built >= n.length) { say('This scale is complete. Press Play, or choose another tonic or scale.', '這個音階已經完成。按播放，或選另一個主音或音階。'); return; }
    const prev = n[state.built - 1], target = n[state.built], g = target.midi - prev.midi, gn = gapName(g);
    if (midi === target.midi) {
      state.built += 1; show();
      if (state.built >= n.length) say(`Done! ${spellNames(n).join(' ')}. The step pattern is ${patternOf(sc().semis)}.`, `完成了！${spellNames(n).join(' ')}。步階圖樣是 ${patternOf(sc().semis)}。`);
      else say(`${pretty(target)}: a ${gn.en} above ${pretty(prev)}. Next: ${gapName(gaps(sc().semis)[state.built - 1]).en}.`, `${pretty(target)}：比 ${pretty(prev)} 高一個${gn.zh}。下一個：${gapName(gaps(sc().semis)[state.built - 1]).zh}。`);
    } else {
      const d = midi - prev.midi;
      say(`From ${pretty(prev)}, the next step is a ${gn.en} up (${g === 1 ? '1 semitone' : `${g} semitones`}), which is ${pretty(target)}. You pressed a note ${Math.abs(d)} ${Math.abs(d) === 1 ? 'semitone' : 'semitones'} ${d >= 0 ? 'above' : 'below'}.`,
          `從 ${pretty(prev)} 往上，下一步是一個${gn.zh}（${g} 個半音），也就是 ${pretty(target)}。你按的音${d >= 0 ? '高' : '低'}了 ${Math.abs(d)} 個半音。`);
      root.classList.add('is-shake'); setTimeout(() => root.classList.remove('is-shake'), 350);
    }
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; state.active = -1; $('.mu-sc-play').innerHTML = '&#9654; Play · 播放';
    show();
  }
  function play() {
    stop();
    const n = notes().slice(0, state.built);
    if (n.length < 2) return;
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    const { ev, total } = scheduleSound(synth, n, BPM, { base });
    evs = ev; state.playing = true; $('.mu-sc-play').innerHTML = 'Stop · 停止';
    perfStart = performance.now() + LEAD * 1000;
    const loop = () => {
      const t = (performance.now() - perfStart) / 1000;
      const idx = ev.reduce((a, e, i) => (t >= e.time ? i : a), -1);
      if (idx !== state.active) { state.active = idx; show(); }
      if (t < total) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; state.active = -1; $('.mu-sc-play').innerHTML = '&#9654; Play · 播放'; show(); }, (total + LEAD) * 1000 + 80);
  }
  function setTonic(t) { stop(); state.tonic = t; state.custom = null; state.built = 1; show(); const n = notes(); say(`Start on ${t}. The ${sc().en.toLowerCase()} goes ${patternOf(sc().semis)}. Press the next key.`, `從 ${t} 開始。${sc().zh}的圖樣是 ${patternOf(sc().semis)}。按下一個鍵。`); void n; }
  function setScale(k) { stop(); state.scale = k; state.custom = null; state.built = 1; show(); say(`${SCALES[k].en}: ${patternOf(SCALES[k].semis)}. Build it from ${state.tonic}, one key at a time.`, `${SCALES[k].zh}：${patternOf(SCALES[k].semis)}。從 ${state.tonic} 開始，一個鍵一個鍵建起來。`); }
  function reveal() { stop(); state.built = notes().length; show(); say(`${spellNames(notes()).join(' ')}. Pattern: ${patternOf(state.custom ? notes().map((x) => x.midi - notes()[0].midi) : sc().semis)}.`, `${spellNames(notes()).join(' ')}。圖樣：${patternOf(state.custom ? notes().map((x) => x.midi - notes()[0].midi) : sc().semis)}。`); }

  $$('[data-tonic]').forEach((b) => b.addEventListener('click', () => setTonic(b.getAttribute('data-tonic'))));
  $$('[data-scale]').forEach((b) => b.addEventListener('click', () => setScale(b.getAttribute('data-scale'))));
  Object.entries(keyEl).forEach(([m, el]) => el.addEventListener('click', () => press(Number(m))));
  $('.mu-sc-reveal').addEventListener('click', reveal);
  $('.mu-sc-reset').addEventListener('click', () => { stop(); state.built = 1; state.custom = null; show(); say('Start again from the first note.', '從第一個音重新開始。'); });
  $('.mu-sc-play').addEventListener('click', () => (state.playing ? stop() : play()));
  window.addEventListener('resize', () => show());
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);

  const DEMO = {
    cmajor() { setTonic('C'); state.scale = 'major'; state.custom = null; reveal(); play(); },
    dmajor() { setTonic('D'); state.scale = 'major'; state.custom = null; reveal(); play(); say('Same pattern, new starting note: D major needs F♯ and C♯ to keep W W H W W W H.', '同樣的圖樣、換一個起點：D 大調需要 F♯ 和 C♯，才能維持 W W H W W W H。'); },
    cminor() { setTonic('C'); state.scale = 'minor'; state.custom = null; reveal(); play(); say('C minor: the third, sixth, and seventh notes are a half step lower than in C major (E♭, A♭, B♭).', 'C 小調：第三、第六、第七個音都比 C 大調低一個半音（E♭、A♭、B♭）。'); },
    black() { stop(); state.custom = spell('F', 'majpent', { acc: 1 }); state.built = state.custom.length; show(); play(); say('Only the black keys: F♯ G♯ A♯ C♯ D♯. These five notes form a pentatonic scale.', '只用黑鍵：F♯ G♯ A♯ C♯ D♯。這五個音組成一個五聲音階。'); },
  };
  setTonic('C');
  say('Choose a tonic and a scale, then press the keys one at a time to build it. Each step is a whole step (W) or a half step (H).', '選一個主音和一種音階，再一個一個按鍵把它建起來。每一步是一個全音（W）或一個半音（H）。');
  root.classList.add('al-ready');
  void BLACK_KEYS; void TONICS;
  root.__lab = { state, notes, press, reveal, play, stop, setTonic, setScale, hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), demo: (v) => DEMO[v] && DEMO[v](), render: show,
    needed: neededGap };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function initTune(root) {
  const synth = getSynth();
  const cv = root.querySelector('.mu-tn-cv'), msg = root.querySelector('.mu-tn-msg'), names = root.querySelector('.mu-tn-names');
  const btns = [...root.querySelectorAll('[data-tscale]')];
  let cur = 'major', raf = 0, timer = 0;
  const NOTE = { major: ['major scale', '大調'], minor: ['minor scale', '小調'], majpent: ['pentatonic scale', '五聲音階'] };
  const get = (k) => tuneNotes('C', k);
  function draw(active = -1) { drawScale(cv, { notes: get(cur).map((n) => ({ pos: n.pos, acc: n.acc })), active }); }
  function pick(k) {
    cur = k;
    btns.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-tscale') === k ? 'true' : 'false'));
    names.innerHTML = get(k).map((n) => pretty(n)).join(' · ');
    draw();
  }
  function play(k) {
    pick(k || cur);
    cancelAnimationFrame(raf); clearTimeout(timer); synth.unlock(); synth.stopAll();
    const notes = get(cur), base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    const { ev, total } = scheduleSound(synth, notes, 100, { base });
    const t0 = performance.now() + LEAD * 1000;
    const loop = () => { const t = (performance.now() - t0) / 1000; draw(ev.reduce((a, e, i) => (t >= e.time ? i : a), -1)); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    timer = setTimeout(() => draw(-1), (total + LEAD) * 1000 + 60);
    const [en, zh] = NOTE[cur];
    msg.innerHTML = `The same tune in a ${en}: the notes go up and down in the same shape, but the steps between them are different.<span class="zh">同一段旋律用${zh}：音高上去又下來的形狀一樣，只是音和音之間的步階不同。</span>`;
  }
  btns.forEach((b) => b.addEventListener('click', () => play(b.getAttribute('data-tscale'))));
  window.addEventListener('resize', () => draw());
  watchOffscreen(root);
  pick('major');
  root.__tune = { play, notes: (k) => get(k || cur), current: () => cur };
}

function initScaleQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-scq-k'), score: root.querySelector('.mu-scq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-scq-next'), listen: root.querySelector('.mu-sqz-listen'), show: root.querySelector('.mu-sqz-show'), pat: root.querySelector('.mu-sqz-pat') };
  let qs = makeScaleRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const names = { major: ['Major', '大調'], minor: ['Minor', '小調'], majpent: ['Pentatonic', '五聲音階'] };
  const cur = () => { const r = qs[q], notes = spell(r.tonic, r.scale); return { ...r, notes, pattern: patternOf(SCALES[r.scale].semis) }; };
  function listen() {
    synth.unlock(); synth.stopAll();
    const { notes } = cur(), base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    scheduleSound(synth, notes, 120, { base });
    if (!audioOn(synth)) { R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “Show the steps” instead.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「看步階」。</span>'; }
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-scq-opt'; b.disabled = false; });
    R.next.hidden = true; R.pat.hidden = true; R.pat.textContent = '';
    R.msg.innerHTML = 'Listen to the scale going up. Is it a major scale, a minor scale, or a pentatonic scale?<span class="zh">聽這個往上走的音階。它是大調、小調，還是五聲音階？</span>';
  }
  function showSteps() { const c = cur(); R.pat.hidden = false; R.pat.innerHTML = `<span class="mu-st-k">Steps · 步階</span> ${c.pattern.split(' ').map((s) => `<span class="mu-sc-pg g${s === 'H' ? 1 : s === 'W' ? 2 : 3}">${s}</span>`).join('')}`; }
  function answer(key) {
    if (done) return;
    const c = cur(), btn = R.opts.find((x) => x.getAttribute('data-pick') === key);
    if (key === c.scale) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showSteps();
      const nm = spellNames(c.notes).join(' ');
      R.msg.innerHTML = `Yes: ${c.tonic} ${names[c.scale][0].toLowerCase()}. ${nm}. The steps are ${c.pattern}.<span class="zh">答對了：${c.tonic} ${names[c.scale][1]}。${nm}。步階是 ${c.pattern}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “Show the steps”: a major scale has W W H W W W H, a minor scale W H W W H W W.<span class="zh">不是這個。再聽一次，或按「看步階」：大調是 W W H W W W H，小調是 W H W W H W W。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listen.addEventListener('click', listen);
  R.show.addEventListener('click', showSteps);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeScaleRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  root.__scaleq = { round: () => { const c = cur(); return { tonic: c.tonic, scale: c.scale, pattern: c.pattern }; }, answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const t = document.querySelector('[data-mu-tune]'); if (t) initTune(t);
  const s = document.querySelector('[data-mu-scaleq]'); if (s) initScaleQ(s);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musscale-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
