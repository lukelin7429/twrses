/*
 * 世界歷史 第十二課〈What Was Life Like in a Castle? 住在城堡裡是什麼樣子？〉的純函式（node test/castle.test.mjs）。
 * 「一座城堡怎麼長大」：四個階段，每一個部分（part）寫它在哪幾個階段出現。幾何是示意，不是任何一座真實的城堡。
 *   STAGES                    motte（土丘城寨）→ keep（石造主塔）→ curtain（石造城牆與塔）→ concentric（同心圓城堡）
 *   stageIndex(key)           階段的順序（0–3）；不認得回傳 -1
 *   partsAt(parts, stage)     這個階段看得到的部分
 *   newAt(parts, stage)       這個階段新加上的部分（上一個階段沒有的）
 *   ringPoints(n, r, phase)   圓周上平均的 n 個點 [x, z]（從 +z 方向開始，phase 是弧度）
 *   segments(points)          把相鄰的點連成一段一段牆：{ cx, cz, len, angle }（angle 是繞 y 軸的弧度）
 *   checkParts(parts)         每一個部分的階段合法、連續（出現以後要嘛一直在，要嘛被取代後不再出現）；錯了回傳字串
 */
export const STAGES = ['motte', 'keep', 'curtain', 'concentric'];

export const stageIndex = (key) => STAGES.indexOf(key);

export const partsAt = (parts, stage) => parts.filter((p) => p.stages.includes(stage));

export function newAt(parts, stage) {
  const i = stageIndex(stage);
  if (i <= 0) return partsAt(parts, stage);
  const prev = STAGES[i - 1];
  return parts.filter((p) => p.stages.includes(stage) && !p.stages.includes(prev));
}

export function ringPoints(n, r, phase = 0) {
  const out = [];
  for (let i = 0; i < n; i++) { const a = phase + (i / n) * Math.PI * 2; out.push([r * Math.sin(a), r * Math.cos(a)]); }
  return out;
}

export function segments(points) {
  const out = [];
  for (let i = 0; i < points.length; i++) {
    const [x0, z0] = points[i], [x1, z1] = points[(i + 1) % points.length];
    out.push({ cx: (x0 + x1) / 2, cz: (z0 + z1) / 2, len: Math.hypot(x1 - x0, z1 - z0), angle: Math.atan2(x1 - x0, z1 - z0) });
  }
  return out;
}

export function checkParts(parts) {
  const keys = new Set();
  for (const p of parts) {
    if (keys.has(p.key)) return `${p.key}: repeated key`;
    keys.add(p.key);
    if (!Array.isArray(p.stages) || !p.stages.length) return `${p.key}: needs stages`;
    if (p.stages.some((s) => stageIndex(s) < 0)) return `${p.key}: unknown stage`;
    const idx = p.stages.map(stageIndex);
    for (let i = 1; i < idx.length; i++) if (idx[i] !== idx[i - 1] + 1) return `${p.key}: stages must be consecutive and in order`;
  }
  return null;
}
