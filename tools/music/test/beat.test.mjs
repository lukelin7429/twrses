import assert from 'node:assert/strict';
import { createSynth } from '../src/synth.js';
import { createMetronome } from '../src/metro.js';
import { BPM_MAX, BPM_MIN, METERS, accentOf, barBeat, beatSeconds, beatsPerSecond, bpmFromSeconds, clampBpm, clickFor, dueBeats, makeMeterRounds, nearestBeat, pendulumAngle, tapStats } from '../src/beat.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);

// BPM ↔ 秒
near(beatSeconds(60), 1, 1e-12); near(beatSeconds(120), 0.5, 1e-12); near(beatSeconds(40), 1.5, 1e-12); near(beatSeconds(180), 1 / 3, 1e-12);
near(bpmFromSeconds(beatSeconds(97)), 97, 1e-9);
assert.equal(beatsPerSecond(180), 3, 'the top of the range is exactly three beats per second');
assert.equal(clampBpm(10), BPM_MIN); assert.equal(clampBpm(999), BPM_MAX); assert.equal(clampBpm(100.4), 100);
assert.equal(BPM_MIN, 40); assert.equal(BPM_MAX, 180);

// 強弱圖樣
assert.deepEqual(METERS[2].pattern, [2, 0]); assert.deepEqual(METERS[3].pattern, [2, 0, 0]); assert.deepEqual(METERS[4].pattern, [2, 0, 1, 0]);
for (const m of [2, 3, 4]) { assert.equal(METERS[m].pattern.length, m); assert.equal(accentOf(m, 0), 2); assert.equal(accentOf(m, m), 2, 'accent repeats every bar'); assert.equal(accentOf(m, 2 * m + 1), METERS[m].pattern[1]); }
assert.deepEqual(barBeat(3, 0), { bar: 1, beat: 1 }); assert.deepEqual(barBeat(3, 4), { bar: 2, beat: 2 }); assert.deepEqual(barBeat(4, 11), { bar: 3, beat: 4 });
assert.ok(clickFor(2).freq > clickFor(1).freq && clickFor(1).freq > clickFor(0).freq);
assert.ok(clickFor(2).gain > clickFor(1).gain && clickFor(1).gain > clickFor(0).gain);

// 排程視窗
{
  const iv = beatSeconds(120);                       // 0.5 s
  let r = dueBeats(1.0, 0.95, 0.1, iv);              // 1.0 在視窗 [0.95, 1.05) 內
  assert.deepEqual(r.times, [1.0]); near(r.next, 1.5, 1e-12);
  r = dueBeats(1.5, 0.95, 0.1, iv); assert.deepEqual(r.times, []); assert.equal(r.next, 1.5);
  // 一路排下去：每 25 ms 一次，30 秒，拍的間隔必須恆為 0.5 s、沒有重複或漏掉
  let next = 0.12, all = [];
  for (let now = 0; now < 30; now += 0.025) { const d = dueBeats(next, now, 0.1, iv); all.push(...d.times); next = d.next; }
  assert.equal(all.length, 60);
  for (let i = 1; i < all.length; i++) near(all[i] - all[i - 1], 0.5, 1e-9, 'steady interval');
  // 分頁凍結後回來：不補排一大堆，從現在重新開始
  const late = dueBeats(1.0, 20, 0.1, iv); assert.ok(late.times.length <= 1 && late.times[0] >= 20);
  // 速度中途改變：新的間隔從下一拍起生效
  let n2 = 0.12, t2 = [], bpm = 60;
  for (let now = 0; now < 8; now += 0.025) { if (now >= 4 && bpm === 60) bpm = 120; const d = dueBeats(n2, now, 0.1, beatSeconds(bpm)); t2.push(...d.times); n2 = d.next; }
  const gaps = t2.slice(1).map((v, i) => +(v - t2[i]).toFixed(3));
  assert.ok(gaps.includes(1) && gaps.includes(0.5) && gaps.every((g) => g === 1 || g === 0.5));
}

// 敲擊誤差
{
  const r = nearestBeat(2.037, 0.12, 0.5);      // 離第 4 拍（2.12）早了 83 ms？ 2.037 − 2.12
  assert.equal(r.index, 4); near(r.beatTime, 2.12, 1e-12); near(r.err, -0.083, 1e-9);
  const r2 = nearestBeat(0.7, 0.12, 0.5); assert.equal(r2.index, 1); near(r2.err, 0.08, 1e-9);
  const r3 = nearestBeat(0.37, 0.12, 0.5); assert.ok(Math.abs(r3.err) <= 0.25 + 1e-9, 'never more than half a beat away');
  const s = tapStats([-20, 10, 30, -40]);
  assert.equal(s.n, 4); near(s.mean, -5, 1e-9); near(s.mae, 25, 1e-9); near(s.sd, Math.sqrt(((-15) ** 2 + 15 ** 2 + 35 ** 2 + (-35) ** 2) / 4), 1e-9);
  assert.equal(s.within, 4); assert.equal(tapStats([-20, 80], 50).within, 1); assert.equal(tapStats([]).n, 0);
}

// 題目
{
  const r = makeMeterRounds(mulberry32(3), 6);
  assert.equal(r.length, 6);
  for (const m of [2, 3, 4]) assert.equal(r.filter((x) => x === m).length, 2);
  for (let i = 1; i < r.length; i++) assert.notEqual(r[i], r[i - 1]);
  assert.deepEqual(makeMeterRounds(mulberry32(3), 6), r);
}

// 擺錘：在 t0 + k·interval 擺到最遠（一拍）、在兩拍的正中間經過中央
{
  const iv = 0.5, A = 0.42;
  for (let k = 0; k < 6; k++) near(Math.abs(pendulumAngle(1 + k * iv, 1, iv, A)), A, 1e-12);
  near(pendulumAngle(1 + 0.25, 1, iv, A), 0, 1e-12);
  assert.ok(pendulumAngle(1, 1, iv, A) * pendulumAngle(1 + iv, 1, iv, A) < 0, 'swings to the other side every beat');
}

// 合成器：click 在指定的時間排進去；靜音、沒解鎖不排
function fakeWin() {
  const log = []; let t = 0;
  const param = (n) => ({ setValueAtTime(v, at) { log.push([n, 'set', v, at]); }, linearRampToValueAtTime(v, at) { log.push([n, 'ramp', v, at]); }, setTargetAtTime(v, at) { log.push([n, 'target', v, at]); }, cancelScheduledValues() {} });
  class Ctx { constructor() { this.state = 'running'; this.destination = {}; } get currentTime() { return t; } resume() {} suspend() {}
    createGain() { return { gain: param("gain"), connect() {}, disconnect() {} }; } createDynamicsCompressor() { return { connect() {} }; }
    createBuffer() { return {}; } createBufferSource() { return { connect() {}, start() {} }; }
    createOscillator() { const o = { frequency: param('freq'), connect() {}, disconnect() {}, start(at) { log.push(['osc', 'start', at]); }, stop(at) { log.push(['osc', 'stop', at]); } }; return o; } }
  return { win: { AudioContext: Ctx, document: { hidden: false, addEventListener() {} }, addEventListener() {} }, log, setT: (v) => { t = v; } };
}
{
  const { win, log, setT } = fakeWin();
  const s = createSynth({ win });
  assert.equal(s.click(1), null, 'no click before unlock');
  s.unlock();
  setT(0.5);
  const c = s.click(1.0, { freq: 1200, gain: 1 });
  assert.ok(c); assert.equal(c.when, 1.0);
  assert.ok(log.some((e) => e[0] === 'osc' && e[1] === 'start' && e[2] === 1.0), 'starts at the requested time');
  assert.ok(log.some((e) => e[0] === 'gain' && e[1] === 'set' && e[2] === 0 && e[3] === 1.0), 'envelope starts at zero at that time');
  assert.equal(s.hz(), 0, 'not sounding yet');
  setT(1.02); assert.equal(s.hz(), 1200); assert.equal(s.nowPlaying()[0].kind, 'click');
  setT(1.2); assert.equal(s.hz(), 0, 'ended');
  s.setMuted(true); assert.equal(s.click(2), null);
  assert.equal(typeof s.clock(), 'number');
}

// 節拍器：把一段時間走完，檢查排進去的拍（音量與頻率隨強弱）
{
  const { win, log, setT } = fakeWin();
  const s = createSynth({ win }); s.unlock();
  const timers = []; let id = 0;
  const m = createMetronome(s, { setTimer: (fn) => { timers.push(fn); return ++id; }, clearTimer() {}, onBeat: (b) => events.push(b) });
  const events = [];
  setT(0);
  const t0 = m.start({ bpm: 120, meter: 3, startAt: 0.12 });
  assert.equal(t0, 0.12);
  for (let now = 0; now <= 3.02; now += 0.025) { setT(now); const f = timers.pop(); if (f) f(); }
  const bt = m.beats();
  assert.ok(bt.length >= 6, `scheduled ${bt.length}`);
  for (let i = 1; i < bt.length; i++) near(bt[i] - bt[i - 1], 0.5, 1e-9);
  assert.deepEqual(events.slice(0, 6).map((e) => e.level), [2, 0, 0, 2, 0, 0]);
  assert.deepEqual(events.slice(0, 4).map((e) => [e.bar, e.beat]), [[1, 1], [1, 2], [1, 3], [2, 1]]);
  const freqs = log.filter((e) => e[0] === 'freq' && e[1] === 'set').map((e) => e[2]);
  assert.deepEqual(freqs.slice(0, 4), [1200, 700, 700, 1200]);
  m.stop(); assert.equal(m.state.running, false);
}
// 沒有 Web Audio：節拍器照樣算、不丟錯
{
  const s = createSynth({ win: {} });
  const timers = []; const ev = []; let clock = 10;
  const m = createMetronome(s, { setTimer: (fn) => { timers.push(fn); return 1; }, clearTimer() {}, perf: () => clock, onBeat: (b) => ev.push(b) });
  m.start({ bpm: 60, meter: 2 });
  for (let i = 0; i < 160; i++) { clock += 0.025; const f = timers.pop(); if (f) f(); }
  assert.ok(ev.length >= 3 && ev[0].level === 2 && ev[1].level === 0);
}
console.log('beat.test.mjs ok');
// AudioContext 被擋住（suspended）時：退回 performance.now()，不排聲音、畫面的時間照走；醒來後從現在重新起算
{
  const { win, log, setT } = fakeWin();
  const s = createSynth({ win }); s.unlock();
  s.context.state = 'suspended';
  assert.equal(s.running(), false);
  const timers = []; let perf = 500; const ev = [];
  const m = createMetronome(s, { setTimer: (fn) => { timers.push(fn); return 1; }, clearTimer() {}, perf: () => perf, onBeat: (b) => ev.push(b) });
  m.start({ bpm: 120, meter: 4 });
  for (let i = 0; i < 80; i++) { perf += 0.025; const f = timers.pop(); if (f) f(); }
  assert.ok(ev.length >= 3, 'beats still counted on the performance clock');
  assert.ok(!log.some((e) => e[0] === 'osc' && e[1] === 'start'), 'nothing is scheduled while suspended');
  s.context.state = 'running'; setT(2);
  const n = ev.length;
  for (let i = 0; i < 40; i++) { perf += 0.025; setT(2 + (i + 1) * 0.025); const f = timers.pop(); if (f) f(); }
  assert.ok(ev.length > n, 'beats continue after the context wakes up');
  assert.ok(m.beats()[0] < 10, 'beat times are now on the audio clock, not 500 s');
}
