// 第十四課：化石是怎麼形成的？
// 一條時間軸 t：0–6，共六個階段（每一段的長短只是示意；真的過程要幾萬年到幾百萬年以上）
export const STAGES = ['die', 'bury', 'press', 'stone', 'rise', 'find'];
export const T_MAX = STAGES.length;
export const stageOf = (t) => STAGES[Math.min(STAGES.length - 1, Math.max(0, Math.floor(t)))];
const clamp = (x) => Math.min(1, Math.max(0, x));
// 生物沉到海底（0–1）
export const sink = (t) => clamp(t / 0.8);
// 軟的部分爛掉（1–1.8）
export const soft = (t) => 1 - clamp((t - 0.9) / 0.9);
// 蓋在上面的地層：共五層，第一層在「掩埋」階段鋪上，其餘在「壓實」階段一層層疊上去；回傳每一層的厚度比例（0–1）
export const N_LAYERS = 5;
export function layers(t) {
  const out = [];
  for (let i = 0; i < N_LAYERS; i++) out.push(i === 0 ? clamp((t - 1) / 0.8) : clamp((t - 2 - (i - 1) * 0.24) / 0.24));
  return out;
}
// 骨頭被礦物質取代的比例（3–4）
export const mineral = (t) => clamp((t - 3) / 0.9);
// 地層被抬升的比例（4–5）
export const uplift = (t) => clamp((t - 4) / 0.9);
// 上面的岩層被侵蝕掉的比例（5–6）；到 1 的時候化石露出來
export const eroded = (t) => clamp((t - 5) / 0.85);
export const exposed = (t) => eroded(t) >= 1;
// 還蓋在化石上面的地層數
export const layersAbove = (t) => { const e = eroded(t), l = layers(t).filter((x) => x > 0.5).length; return Math.max(0, Math.round(l * (1 - e))); };
