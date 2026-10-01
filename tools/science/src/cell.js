/*
 * 萬物原理 · 第一課「電池怎麼儲存電？」的電池狀態計算（純函式，test/battery.test.mjs 會跑）。
 *
 * 模型是示意：兩邊電極各有 SITES 個「停車格」，鋰的總數也是 SITES。
 *   電量（state of charge）＝停在石墨（負極）裡、還能移動的鋰 ÷ 還能移動的鋰總數。
 *   老化：每充放電一輪，就有一點鋰被困在石墨表面那層薄殼（SEI）裡，永遠不能再動，
 *   所以「充滿」能裝的鋰變少。手機上顯示的 100% 是「今天的滿」，不是新電池的滿。
 *
 * 數字的出處（頁面上的 sources 也列了）：
 *   電壓：鋰鈷氧／石墨電池充滿約 4.2 V、標稱 3.6–3.7 V、用到底約 3.0 V（Battery University BU-204）。
 *   容量：Apple 說 iPhone 14 以前的機型，在理想條件下 500 次完整充電循環後仍保有原始容量的 80%。
 *   這裡把它畫成一條直線（每循環 0.04%），只是示意；真實電池的老化曲線依用法、溫度而不同。
 */

export const SITES = 70;            // 每一邊電極的停車格（5 層 × 7 格 × 前後 2 排）
export const LAYERS = 5, ROW = 7, DEPTH = 2;

// 開路電壓（伏特）對電量的近似曲線：兩端陡、中間平
const OCV = [[0, 3.0], [0.03, 3.3], [0.08, 3.5], [0.15, 3.6], [0.3, 3.68], [0.5, 3.76], [0.7, 3.88], [0.85, 4.0], [0.95, 4.12], [1, 4.2]];
export function voltage(soc) {
  const s = Math.min(1, Math.max(0, soc));
  for (let i = 1; i < OCV.length; i++) {
    const [s1, v1] = OCV[i], [s0, v0] = OCV[i - 1];
    if (s <= s1) return v0 + (v1 - v0) * (s - s0) / (s1 - s0);
  }
  return OCV[OCV.length - 1][1];
}

// 剩下的容量（0–1）：0 循環 100%，500 循環 80%，之後同樣的斜率
export const FADE_PER_CYCLE = 0.2 / 500;
export function capacity(cycles) {
  return Math.max(0.5, 1 - FADE_PER_CYCLE * Math.max(0, cycles));
}

// 還能移動的鋰有幾顆（其餘被困住）
export function movable(cycles) {
  return Math.round(SITES * capacity(cycles));
}

// 依電量把鋰分到兩邊：回傳 { anode, cathode, trapped }
export function split(soc, cycles) {
  const m = movable(cycles);
  const anode = Math.round(m * Math.min(1, Math.max(0, soc)));
  return { anode, cathode: m - anode, trapped: SITES - m };
}

// 手機電量顯示的百分比：還在石墨裡的 ÷ 能動的總數
export function percent(anode, cycles) {
  const m = movable(cycles);
  return m ? Math.round(100 * anode / m) : 0;
}

/*
 * 一個極簡的「放電／充電」模擬，給測試確認兩件事：
 *   1. 每有一顆鋰離子從電池裡面跨過去，外面的電線就剛好推過一個電子（電荷守恆）。
 *   2. 用到 0% 再充到 100%，困住的鋰不會變。
 * 3D 模型（battery.js）用的是同一套規則，只是多了動畫。
 */
export function makeCell(soc = 1, cycles = 0) {
  const st = { cycles, ...split(soc, cycles), ions: 0, electrons: 0 };
  return {
    st,
    // dir = +1 放電（石墨 → 金屬氧化物）、-1 充電
    step(dir) {
      if (dir > 0 && st.anode > 0) { st.anode -= 1; st.cathode += 1; }
      else if (dir < 0 && st.cathode > 0) { st.cathode -= 1; st.anode += 1; }
      else return false;
      st.ions += 1;          // 裡面：一顆離子穿過電解液
      st.electrons += 1;     // 外面：一個電子繞過電線
      return true;
    },
    percent: () => percent(st.anode, st.cycles),
  };
}
