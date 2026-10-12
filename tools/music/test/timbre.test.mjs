import assert from 'node:assert/strict';
import { createSynth } from '../src/synth.js';
import { ENVELOPES, K, RECIPES, envelopeAt, harmonicFreq, makeWhichRounds, nodePositions, normalizePeak, peakOf, pluckAmps, rms, waveAt, waveSamples } from '../src/timbre.js';
import { mulberry32, midiToFreq } from '../src/pitch.js';

const near = (a, b, eps, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);

// 諧波頻率是基頻的整數倍
const C4 = midiToFreq(60);
for (let n = 1; n <= K; n++) near(harmonicFreq(C4, n), n * C4, 1e-9);
near(harmonicFreq(C4, 2), midiToFreq(72), 1e-9, '2nd harmonic = one octave up');
near(harmonicFreq(C4, 4), midiToFreq(84), 1e-9, '4th harmonic = two octaves up');
assert.equal(K, 8);
for (const r of Object.values(RECIPES)) assert.equal(r.amps.length, K);

// 配方：奇數諧波的位置
assert.deepEqual(RECIPES.odd.amps.map((a, i) => (a ? i + 1 : 0)).filter(Boolean), [1, 3, 5, 7]);
assert.deepEqual(RECIPES.pure.amps.filter((a) => a).length, 1);

// 波形：基音就是正弦；週期是 1；奇數諧波組成的波形左右反對稱（半週期後反號）
near(waveAt(RECIPES.pure.amps, 0.25), 1, 1e-12);
near(waveAt(RECIPES.pure.amps, 0), 0, 1e-12);
for (const ph of [0.05, 0.17, 0.31]) {
  near(waveAt(RECIPES.all.amps, ph), waveAt(RECIPES.all.amps, ph + 1), 1e-9, 'periodic');
  near(waveAt(RECIPES.odd.amps, ph + 0.5), -waveAt(RECIPES.odd.amps, ph), 1e-9, 'odd harmonics only: half-wave antisymmetry');
}
// 有偶數諧波就不會反對稱
assert.ok(Math.abs(waveAt(RECIPES.all.amps, 0.17 + 0.5) + waveAt(RECIPES.all.amps, 0.17)) > 0.05);
assert.equal(waveSamples(RECIPES.all.amps, 64).length, 64);

// 正規化：尖峰剛好是 1，比例不變
for (const r of Object.values(RECIPES)) {
  const n = normalizePeak(r.amps);
  near(peakOf(n), 1, 1e-9, 'peak 1');
  const i = r.amps.findIndex((a) => a), j = r.amps.findLastIndex((a) => a);
  if (i !== j) near(n[i] / n[j], r.amps[i] / r.amps[j], 1e-9, 'ratios kept');
}
assert.deepEqual(normalizePeak([0, 0, 0]), [0, 0, 0]);
assert.ok(rms(normalizePeak(RECIPES.all.amps)) < rms(normalizePeak(RECIPES.pure.amps)), 'a rich spectrum is quieter at the same peak');

// 撥弦位置：在正中間撥，偶數諧波是 0；在 1/5 處撥，第 5、10 諧波是 0；高諧波隨 1/n² 變弱
const mid = pluckAmps(0.5);
for (let n = 2; n <= K; n += 2) near(mid[n - 1], 0, 1e-9, `mid pluck kills harmonic ${n}`);
assert.ok(mid[0] === 1 && mid[2] > 0);
near(mid[2], 1 / 9, 1e-9, 'third harmonic is 1/9 of the first');
const fifth = pluckAmps(0.2);
near(fifth[4], 0, 1e-9, 'plucked at 1/5: no 5th harmonic');
const edge = pluckAmps(0.1);
assert.ok(edge[3] > mid[3], 'near the end: more high harmonics');
assert.equal(Math.max(...edge), 1);
assert.deepEqual(nodePositions(1), []);
assert.deepEqual(nodePositions(3).map((x) => +x.toFixed(4)), [0.3333, 0.6667]);
assert.equal(nodePositions(4).length, 3);

// 包絡
const st = ENVELOPES.struck, bw = ENVELOPES.bowed;
near(envelopeAt(0, st), 0, 1e-12);
near(envelopeAt(st.attack, st), 1, 1e-9);
assert.ok(envelopeAt(1, st) < 0.5 && envelopeAt(3, st) < 0.1);
near(envelopeAt(0.075, bw), 0.5, 1e-9, 'linear attack');
assert.ok(envelopeAt(5, bw) > 0.84 && envelopeAt(5, bw) < 0.86, 'bowed keeps going at sustain level');
assert.ok(bw.attack > 10 * st.attack);

// 題目
const rr = makeWhichRounds(mulberry32(5), 6);
assert.equal(rr.length, 6);
for (let i = 1; i < rr.length; i++) assert.notEqual(rr[i], rr[i - 1]);
assert.ok(rr.every((k) => k in RECIPES));
assert.deepEqual(makeWhichRounds(mulberry32(5), 6), rr);

// 合成器：toneComplex 的基頻、各諧波比例、尖峰、包絡
function fakeWin() {
  const log = [];
  const param = (n) => ({ setValueAtTime(v, t) { log.push([n, 'set', v, t]); }, linearRampToValueAtTime(v, t) { log.push([n, 'ramp', v, t]); },
    setTargetAtTime(v, t, tau) { log.push([n, 'target', v, t, tau]); }, cancelScheduledValues() {} });
  class Ctx {
    constructor() { this.state = 'running'; this.destination = {}; this.currentTime = 0; }
    resume() {} suspend() {}
    createGain() { return { gain: param('gain'), connect() {}, disconnect() {} }; }
    createDynamicsCompressor() { return { connect() {} }; }
    createBuffer() { return {}; }
    createBufferSource() { return { connect() {}, start() {} }; }
    createPeriodicWave(real, imag, opt) { const w = { real, imag, opt }; log.push(['wave', w]); return w; }
    createOscillator() { const o = { frequency: param('freq'), connect() {}, disconnect() {}, start() {}, stop() {}, setPeriodicWave(w) { o.wave = w; log.push(['setwave', w]); } }; return o; }
  }
  return { win: { AudioContext: Ctx, document: { hidden: false, addEventListener() {} }, addEventListener() {} }, log };
}
{
  const { win, log } = fakeWin();
  const s = createSynth({ win }); s.unlock();
  const amps = normalizePeak(RECIPES.odd.amps);
  const v = s.toneComplex(C4, amps, { env: ENVELOPES.bowed, dur: 1 });
  assert.ok(v);
  assert.equal(s.hz(), C4);
  const np = s.nowPlaying()[0];
  assert.equal(np.partials.length, K);
  const w = log.find((e) => e[0] === 'wave')[1];
  assert.equal(w.opt.disableNormalization, true);
  near(w.imag[1], amps[0], 1e-6); near(w.imag[3] / w.imag[1], 1 / 3, 1e-6); assert.equal(w.imag[2], 0);
  assert.equal(w.real.every((x) => x === 0), true);
  const ramp = log.find((e) => e[0] === 'gain' && e[1] === 'ramp');
  near(ramp[3], ENVELOPES.bowed.attack, 1e-9, 'attack time is the envelope attack');
  // 包絡衰減到 sustain 水準（> 0）
  const tg = log.filter((e) => e[0] === 'gain' && e[1] === 'target')[0];
  assert.ok(tg[2] > 0.1, 'sustain level above zero for bowed');
  s.stopAll(); assert.equal(s.hz(), 0);
  // 高頻成分：基頻很高時，最高成分要被壓低
  const lo = s.toneComplex(500, normalizePeak(RECIPES.all.amps));
  const hi = s.toneComplex(2500, normalizePeak(RECIPES.all.amps));
  const rs = log.filter((e) => e[0] === 'gain' && e[1] === 'ramp').map((e) => e[2]);
  assert.ok(rs[rs.length - 1] < rs[rs.length - 2] * 0.6, 'a high fundamental with harmonics is turned down');
  void lo; void hi;
}
// 沒有 Web Audio 或沒點之前：什麼都不做
{ const s = createSynth({ win: {} }); assert.equal(s.toneComplex(440, [1]), null); }
{ const { win } = fakeWin(); const s = createSynth({ win }); assert.equal(s.toneComplex(440, [1]), null); }
console.log('timbre.test.mjs ok');
