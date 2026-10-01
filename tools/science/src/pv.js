/*
 * 萬物原理 · 第三課「太陽能板怎麼把光變成電？」的光電計算（純函式，test/solar.test.mjs 會跑）。
 *
 * 光子能量（電子伏特，eV）＝ 1240 ÷ 波長（奈米）。矽的能隙約 1.1 eV（約 1,100 nm）：
 *   比這個顏色更紅的紅外線光子能量不夠，直接穿過去；其他光子每顆最多放出一個電子，多出來的能量變成熱。
 * 每個電子繞電線一圈帶出去的能量 ≈ 電池的工作電壓 × 電子電荷 ≈ 0.6 eV（矽電池開路約 0.69 V，工作時略低）。
 * 所以一顆藍光光子（約 2.8 eV）只有約 0.6 eV 變成電，其餘變成熱——這是太陽能板效率只有約兩成的主因之一。
 * 高溫：矽電池每高於 25 °C 一度，輸出少約 0.4%（NREL 量到 −0.41 %/°C）。
 */
export const GAP_EV = 1.1;
export const CELL_V = 0.6;
export const TEMP_COEF = -0.004;        // 每 °C

export const evOf = (nm) => 1240 / nm;

// 模型用的四種光（代表波長）
export const LIGHTS = {
  ir: { nm: 1300, en: 'Infrared', zh: '紅外線' },
  red: { nm: 680, en: 'Red', zh: '紅光' },
  green: { nm: 540, en: 'Green', zh: '綠光' },
  blue: { nm: 450, en: 'Blue', zh: '藍光' },
};
// 「陽光」的組成（模型示意，照能量大致比例：紅外線約三分之一以上）
export const SUN_MIX = [['ir', 0.36], ['red', 0.24], ['green', 0.2], ['blue', 0.2]];

export function canFree(kind) {
  return evOf(LIGHTS[kind].nm) >= GAP_EV;
}

// 一顆被吸收的光子：變成電與變成熱各多少 eV
export function split(kind) {
  const e = evOf(LIGHTS[kind].nm);
  if (e < GAP_EV) return { e, elec: 0, heat: 0, through: e };
  return { e, elec: CELL_V, heat: e - CELL_V, through: 0 };
}

// 被吸收的深度（0 表面 … 1 最深）：藍光很淺、紅光很深（PVEducation：藍光幾微米內吸收，紅光幾百微米還吸不完）
export function depthRange(kind) {
  return { blue: [0.02, 0.12], green: [0.08, 0.4], red: [0.25, 0.95], ir: [1, 1] }[kind];
}

// 溫度修正：輸出倍率
export function tempFactor(celsius) {
  return Math.max(0, 1 + TEMP_COEF * (celsius - 25));
}

// 陽光組成下，平均每單位入射能量有多少變成電（反射比例 refl）
export function sunEfficiency(refl = 0.05) {
  let inE = 0, out = 0;
  for (const [k, w] of SUN_MIX) {
    const s = split(k);
    inE += w * s.e;
    out += w * (1 - refl) * s.elec;
  }
  return out / inE;
}
