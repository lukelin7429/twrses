/*
 * 音樂 Music · 節拍器（lookahead 排程）。聲音由 synth.click 在 AudioContext 的時間軸上排好；
 * 沒有 Web Audio 時退回 performance.now()，只有畫面會動。
 *
 *   const m = createMetronome(synth, { onBeat });
 *   m.start({ bpm, meter, startAt? })  m.stop()  m.setBpm(b)  m.setMeter(n)  m.now()  m.pump()（測試用：手動檢查一次）
 *   onBeat({ index, time, level, bar, beat })  每一拍「排進去的時候」呼叫，time 是它會響的時間（m.now() 的時間軸）
 *   m.beats()  到目前排進去的所有拍的時間（給「跟著拍」算誤差）
 */
import { LOOKAHEAD, PUMP_MS, accentOf, barBeat, beatSeconds, clampBpm, clickFor, dueBeats } from './beat.js';

export function createMetronome(synth, { onBeat = () => {}, setTimer = setTimeout, clearTimer = clearTimeout, perf = () => performance.now() / 1000 } = {}) {
  const st = { running: false, bpm: 100, meter: 4, next: 0, index: 0, t0: 0, timer: 0, times: [] };
  // 只有 AudioContext 真的在跑（state === 'running'）才用它的時間軸；被瀏覽器擋住（suspended）時退回 performance.now()，畫面照樣動
  const audio = () => !!(synth && synth.state.supported && synth.state.unlocked && typeof synth.clock === 'function' && (typeof synth.running !== 'function' || synth.running()));
  const now = () => (audio() ? synth.clock() : perf());

  function pump() {
    if (!st.running) return;
    const kind = audio() ? 'audio' : 'perf';
    if (kind !== st.kind) {           // 時間軸換了（例如 AudioContext 剛剛被使用者喚醒）：從現在重新起算
      const first = st.kind === undefined;
      st.kind = kind;
      if (!first) { st.next = now() + 0.05; st.t0 = st.next; st.index = 0; st.times = []; }
    }
    const { times, next } = dueBeats(st.next, now(), LOOKAHEAD, beatSeconds(st.bpm));
    for (const t of times) {
      const level = accentOf(st.meter, st.index);
      if (audio() && !synth.state.muted) { const c = clickFor(level); synth.click(t, { freq: c.freq, gain: c.gain }); }
      const bb = barBeat(st.meter, st.index);
      st.times.push(t);
      onBeat({ index: st.index, time: t, level, bar: bb.bar, beat: bb.beat });
      st.index++;
    }
    st.next = next;
    st.timer = setTimer(pump, PUMP_MS);
  }
  return {
    state: st,
    now,
    pump,
    beats: () => st.times.slice(),
    start({ bpm = st.bpm, meter = st.meter, startAt = null } = {}) {
      clearTimer(st.timer);
      st.bpm = clampBpm(bpm); st.meter = meter; st.index = 0; st.times = [];
      st.t0 = startAt ?? now() + 0.12; st.next = st.t0;
      st.running = true;
      pump();
      return st.t0;
    },
    stop() { st.running = false; clearTimer(st.timer); if (synth && synth.cancelClicks) synth.cancelClicks(); },
    setBpm(b) { st.bpm = clampBpm(b); },
    setMeter(n) { st.meter = n; },
  };
}
