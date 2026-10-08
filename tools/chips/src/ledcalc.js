// 第十二課：LED。波長是落在維基百科 Light-emitting diode 各色範圍內的示例值。
export const LEDS = {
  red: { nm: 630, hex: 0xff3b30, mat: 'AlGaInP' },
  green: { nm: 525, hex: 0x34d058, mat: 'InGaN' },
  blue: { nm: 465, hex: 0x2f7bff, mat: 'InGaN' },
};
export const RANGE = { red: [610, 760], green: [500, 570], blue: [450, 500] };
// 光子的能量（電子伏特）＝ hc ÷ 波長；hc ≈ 1239.84 eV·nm
export const eV = (nm) => 1239.84 / nm;
// 三色光相加（每色 0–100）
export const css = (r, g, b) => `rgb(${[r, g, b].map((v) => Math.round(Math.min(100, Math.max(0, v)) * 2.55)).join(', ')})`;
const NAMES = { '000': 'black', '100': 'red', '010': 'green', '001': 'blue', '110': 'yellow', '011': 'cyan', '101': 'magenta', '111': 'white' };
export const mixName = (r, g, b) => NAMES[[r, g, b].map((v) => (v >= 50 ? 1 : 0)).join('')];
