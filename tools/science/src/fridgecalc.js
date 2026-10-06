/*
 * 萬物原理 · 第十六課「冰箱怎麼讓食物變冷？」的計算（純函式，示意用的簡化模型，不是任何一台真冰箱的規格）。
 *
 * 冰箱裡的溫度 T（°C）：熱從廚房漏進來（門關著漏得慢、門開著漏得快），壓縮機運轉時冷媒把熱搬出去。
 *   dT/dt = LEAK·(門開 ? DOOR_X : 1)·(廚房 − T) − (壓縮機運轉 ? PUMP : 0)      時間單位：分鐘
 * 溫控：高於 ON_ABOVE 啟動、低於 OFF_BELOW 停止（所以冰箱會嗡嗡響一陣、安靜一陣）。
 * 熱的帳：送到廚房的熱 ＝ 從裡面搬出來的熱 ＋ 用掉的電（能量守恆）。
 */
export const LEAK = 0.008, DOOR_X = 12, PUMP = 0.4;      // 每分鐘
export const ON_ABOVE = 5.5, OFF_BELOW = 2.5;            // °C
export const MOVED_PER_ELECTRIC = 2;                     // 示意：用 1 份電搬 2 份熱

export function compressorWanted(T, running, plugged = true) {
  if (!plugged) return false;
  if (T > ON_ABOVE) return true;
  if (T < OFF_BELOW) return false;
  return running;
}
// 走一步（dtMin 分鐘）；回傳新的 { T, running }
export function step(s, { room = 28, door = false, plugged = true }, dtMin) {
  const running = compressorWanted(s.T, s.running, plugged);
  const dT = LEAK * (door ? DOOR_X : 1) * (room - s.T) - (running ? PUMP : 0);
  return { T: Math.min(room, s.T + dT * dtMin), running };
}
export function simulate(T0, opts, minutes, dt = 0.25) {
  let s = { T: T0, running: false }, on = 0, lo = Infinity, hi = -Infinity;
  for (let t = 0; t < minutes; t += dt) {
    s = step(s, opts, dt);
    if (s.running) on += dt;
    if (t > minutes / 2) { lo = Math.min(lo, s.T); hi = Math.max(hi, s.T); }
  }
  return { T: s.T, duty: on / minutes, lo, hi };
}
// 熱的帳（以「用掉的電＝1 份」為單位）
export function heatFlows(running) {
  if (!running) return { inside: 0, electric: 0, kitchen: 0 };
  return { inside: MOVED_PER_ELECTRIC, electric: 1, kitchen: MOVED_PER_ELECTRIC + 1 };
}
// 門一直開著時，廚房淨得到的熱 ＝ 送出去的 − 搬走的 ＝ 用掉的電（> 0，所以廚房只會變熱）
export const roomNetHeat = () => { const h = heatFlows(true); return h.kitchen - h.inside; };

/*
 * 冷媒繞一圈：u ∈ [0,1)。四段：壓縮機 → 散熱管（冷凝）→ 毛細管 → 蒸發器 → 回壓縮機。
 *   hot：0（很冷）～1（很熱）；liquid：0（氣體）～1（液體）；high：高壓或低壓
 */
export const STAGES = [
  { key: 'compressor', from: 0.00, to: 0.08 },
  { key: 'condenser', from: 0.08, to: 0.50 },
  { key: 'capillary', from: 0.50, to: 0.60 },
  { key: 'evaporator', from: 0.60, to: 1.00 },
];
const lerp = (a, b, k) => a + (b - a) * Math.min(1, Math.max(0, k));
export function refrigerantAt(u) {
  u = ((u % 1) + 1) % 1;
  const st = STAGES.find((s) => u >= s.from && u < s.to) || STAGES[0];
  const k = (u - st.from) / (st.to - st.from);
  if (st.key === 'compressor') return { stage: st.key, hot: lerp(0.3, 1, k), liquid: 0, high: k > 0.5 };
  if (st.key === 'condenser') return { stage: st.key, hot: lerp(1, 0.6, k), liquid: lerp(0, 1, (k - 0.15) / 0.7), high: true };
  if (st.key === 'capillary') return { stage: st.key, hot: lerp(0.6, 0, k), liquid: lerp(1, 0.6, k), high: k < 0.5 };
  return { stage: st.key, hot: lerp(0, 0.3, k), liquid: lerp(0.6, 0, k / 0.8), high: false };
}
// 氣體比液體稀疏：同樣多的冷媒，氣體佔的管子比較長、跑得比較快
export const spacing = (u) => lerp(2.6, 1, refrigerantAt(u).liquid);
