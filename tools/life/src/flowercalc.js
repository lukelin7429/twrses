/*
 * 第六課「花為什麼要開？」的規則（life-flower.js 與 test/flower.test.mjs 共用）。
 * 花是植物生小孩的器官：花粉要從一朵花的花藥送到另一朵花的柱頭，再長一條花粉管到胚珠，胚珠才變成種子、子房變成果實。
 * 送貨的有兩種：動物（付花蜜當報酬，送得準）和風（不用付錢，但要撒非常多）。數字都是示意。
 */
const sm = (x) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
export const STAGES = [['carry', 0], ['land', 30], ['tube', 42], ['seed', 78]];
export const stage = (s) => { let k = 'carry'; for (const [name, from] of STAGES) if (s >= from) k = name; return k; };
export const tubeLen = (s) => sm((s - 42) / 36);
export const fruit = (s) => sm((s - 78) / 22);
export const SENT = { bee: 12, wind: 40 };            // 模型裡送出去的花粉粒數（示意）
export const HIT = { bee: 9, wind: 1 };               // 到得了柱頭的（示意）：蜜蜂送到大部分，風只到一粒
export const landed = (mode, s) => (s < 30 ? 0 : HIT[mode]);
export const holding = (mode, s) => { const k = stage(s); return k === 'carry' || k === 'land' ? `${mode === 'wind' ? 'w' : 'b'}_${k}` : k; };
// 頁面小工具：看花的樣子猜誰送花粉
export const carrier = ({ petals, nectar, dust }) => {
  const animal = petals || nectar;
  return animal && dust ? 'mixed' : animal ? 'animal' : dust ? 'wind' : 'none';
};
