/*
 * 音樂 Music · 第三課「拍子」的純函式：速度（BPM）與秒、強弱圖樣、排程視窗、敲擊誤差。沒有 DOM、沒有聲音，node 就能測：test/beat.test.mjs。
 *
 * 約定：
 *   - 速度用 BPM（beats per minute，每分鐘幾拍）：一拍的長度＝60 / BPM 秒。頁面的範圍 40–180（180＝每秒 3 拍）。
 *   - 強弱用「重音等級」：2＝強（downbeat）、1＝次強、0＝弱。二拍 [2,0]、三拍 [2,0,0]、四拍 [2,0,1,0]。
 *   - 排程用 lookahead：每 25 ms 看一次，把「接下來 100 ms 內」的拍用 AudioContext 的時間排進去，不用 setInterval 直接發聲（會抖）。
 *   - 誤差一律是「你敲的時間 − 最近那一拍的時間」，單位毫秒；負數＝敲早了。
 */

export const BPM_MIN = 40;
export const BPM_MAX = 180;
export const LOOKAHEAD = 0.1;    // 秒：一次排多遠
export const PUMP_MS = 25;       // 毫秒：多久檢查一次

export const clampBpm = (b) => Math.min(BPM_MAX, Math.max(BPM_MIN, Math.round(b)));
export const beatSeconds = (bpm) => 60 / bpm;
export const bpmFromSeconds = (s) => 60 / s;

/** 每分鐘幾拍 → 每秒幾拍（Hz）。這裡的 Hz 和音高的赫茲是同一個單位，只是慢得多。 */
export const beatsPerSecond = (bpm) => bpm / 60;

/** 拍號 → 強弱圖樣（重音等級） */
export const METERS = {
  2: { beats: 2, pattern: [2, 0], en: 'Two beats: strong, weak', zh: '二拍子：強、弱' },
  3: { beats: 3, pattern: [2, 0, 0], en: 'Three beats: strong, weak, weak', zh: '三拍子：強、弱、弱' },
  4: { beats: 4, pattern: [2, 0, 1, 0], en: 'Four beats: strong, weak, medium, weak', zh: '四拍子：強、弱、次強、弱' },
};

/** 第 i 拍（從 0 起算）在這個拍號裡的重音等級 */
export const accentOf = (meter, i) => METERS[meter].pattern[((i % meter) + meter) % meter];
/** 第 i 拍在第幾小節、第幾拍（都從 1 起算） */
export const barBeat = (meter, i) => ({ bar: Math.floor(i / meter) + 1, beat: (i % meter) + 1 });

/** 重音等級 → 點擊聲的頻率與音量（強的比較高、比較大聲） */
export function clickFor(level) {
  return level >= 2 ? { freq: 1200, gain: 1 } : level === 1 ? { freq: 900, gain: 0.7 } : { freq: 700, gain: 0.5 };
}

/**
 * 排程視窗：下一拍在 next 秒，現在是 now 秒，往前看 ahead 秒。
 * 回傳 { times: 這次要排進去的拍的時間, next: 排完以後下一拍的時間 }。
 */
export function dueBeats(next, now, ahead, interval) {
  const times = [];
  let t = next;
  if (t < now) t = now + 0.005;                  // 太晚了（分頁被凍結過）：不補排，從現在重新起算
  while (t < now + ahead) { times.push(t); t += interval; }
  return { times, next: t };
}

/** 一個時間 t 離「從 t0 起、每 interval 秒一拍」的最近一拍有多遠：{ index, beatTime, err }（err 單位秒，負＝早） */
export function nearestBeat(t, t0, interval) {
  const index = Math.round((t - t0) / interval);
  const beatTime = t0 + index * interval;
  return { index, beatTime, err: t - beatTime };
}

/** 一串誤差（毫秒）的統計：平均（帶正負）、平均絕對值、標準差、有幾個落在 ±window 毫秒內 */
export function tapStats(errsMs, window = 50) {
  const n = errsMs.length;
  if (!n) return { n: 0, mean: 0, mae: 0, sd: 0, within: 0 };
  const mean = errsMs.reduce((a, b) => a + b, 0) / n;
  const mae = errsMs.reduce((a, b) => a + Math.abs(b), 0) / n;
  const sd = Math.sqrt(errsMs.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  return { n, mean, mae, sd, within: errsMs.filter((e) => Math.abs(e) <= window).length };
}

/** 「這是幾拍子？」六題：二、三、四拍各兩次，順序打亂，相鄰不重複 */
export function makeMeterRounds(rng, n = 6) {
  const pool = [];
  while (pool.length < n) pool.push(...[2, 3, 4]);
  pool.length = n;
  for (let tries = 0; tries < 50; tries++) {
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    if (pool.every((v, i) => i === 0 || v !== pool[i - 1])) break;
  }
  return pool;
}

/** 擺錘節拍器的擺角（弧度）：每過一個 interval 擺到另一邊，在兩端（角度最大）發出一拍 */
export function pendulumAngle(t, t0, interval, amp = 0.42) {
  return amp * Math.cos((Math.PI * (t - t0)) / interval);
}
