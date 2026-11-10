/*
 * 世界歷史 第十四課 · 馬雅的數字（純函式，node 測試可以直接 import）。
 *
 * 依 Penn Museum（Simon Martin, Expedition 54:1, 2012）與 Britannica「Numerals and numeral systems」：
 *   一點 = 1、一橫 = 5，另有零的符號；0–19 用點和橫組合（最多四點、三橫），20 以上用由下往上的位值（二十進位），
 *   每一位由上往下寫：上面一位是「幾個二十」，下面一位是「幾個一」。20 = 上面一點、下面一個零。
 *   （曆法的第三位是 18 × 20，不是 20 × 20；這裡只用兩位，0–399，不碰到這個例外。）
 *
 *   digit(d)            0–19 → { zero, bars, dots }
 *   toMaya(n)           0–399 → 由上往下的位：[{ zero, bars, dots }…]（只有一位時就是一個）
 *   levelValue(lv)      一位的值；不合法（空的、點太多、橫太多）回 null
 *   fromMaya(levels)    由上往下的位 → 數字；有一位不合法回 null
 *   check(levels, n)    'ok' | 'empty' | 'need-zero' | 'too-many-dots' | 'too-many-bars' | 'wrong'
 *   readOptions(n)       「讀」的四個選項（正確、差 1、差 5、差 20…），順序固定
 *   mayaSvg(levels)     畫成 SVG 字串（點在上、橫在下；零畫成一個貝殼形的符號）
 */
export const MAX = 399;

export function digit(d) {
  if (!Number.isInteger(d) || d < 0 || d > 19) throw new Error(`digit out of range: ${d}`);
  return d === 0 ? { zero: true, bars: 0, dots: 0 } : { zero: false, bars: Math.floor(d / 5), dots: d % 5 };
}

export function toMaya(n) {
  if (!Number.isInteger(n) || n < 0 || n > MAX) throw new Error(`number out of range: ${n}`);
  return n < 20 ? [digit(n)] : [digit(Math.floor(n / 20)), digit(n % 20)];
}

export function levelValue(lv) {
  if (!lv) return null;
  if (lv.zero) return lv.bars || lv.dots ? null : 0;
  if (lv.dots > 4 || lv.bars > 3 || lv.dots < 0 || lv.bars < 0) return null;
  if (!lv.bars && !lv.dots) return null;
  return lv.bars * 5 + lv.dots;
}

export function fromMaya(levels) {
  let v = 0;
  for (const lv of levels) {
    const d = levelValue(lv);
    if (d == null) return null;
    v = v * 20 + d;
  }
  return v;
}

const blank = (lv) => !lv || (!lv.zero && !lv.bars && !lv.dots);

// 學生自己寫：top 可以空著（代表沒有二十的位），ones 一定要有東西（零也要寫出來）
export function check(levels, n) {
  const used = levels.filter((lv, i) => !(i === 0 && levels.length > 1 && blank(lv)));
  if (used.every(blank)) return 'empty';
  if (used.some((lv) => lv.dots > 4)) return 'too-many-dots';
  if (used.some((lv) => lv.bars > 3)) return 'too-many-bars';
  if (used.some(blank)) return 'need-zero';
  const v = fromMaya(used);
  return v === n ? 'ok' : 'wrong';
}

const W = 96, LH = 58, GAP = 14, DOT = 7, BAR_H = 11, ROW = 17;

function levelSvg(lv, y0, cls) {
  if (lv.zero) {
    const cx = W / 2, cy = y0 + LH / 2;
    // 貝殼形的零：一個扁的橢圓，上面有幾道弧線
    return `<g class="${cls} mn-zero"><ellipse cx="${cx}" cy="${cy}" rx="30" ry="15" class="mn-ink-fill"/>`
      + `<path d="M${cx - 20} ${cy - 7} Q${cx} ${cy - 15} ${cx + 20} ${cy - 7} M${cx - 24} ${cy} Q${cx} ${cy - 8} ${cx + 24} ${cy} M${cx - 20} ${cy + 7} Q${cx} ${cy} ${cx + 20} ${cy + 7}" class="mn-line"/></g>`;
  }
  const rows = (lv.dots ? 1 : 0) + lv.bars;
  const h = rows * ROW - (ROW - BAR_H);
  let y = y0 + (LH - h) / 2, out = '';
  if (lv.dots) {
    const step = 18, x0 = W / 2 - ((lv.dots - 1) * step) / 2;
    for (let i = 0; i < lv.dots; i++) out += `<circle cx="${x0 + i * step}" cy="${y + BAR_H / 2}" r="${DOT}" class="mn-ink"/>`;
    y += ROW;
  }
  for (let i = 0; i < lv.bars; i++) { out += `<rect x="${W / 2 - 34}" y="${y}" width="68" height="${BAR_H}" rx="4" class="mn-ink"/>`; y += ROW; }
  return `<g class="${cls}">${out}</g>`;
}

export function mayaSvg(levels, { label = '' } = {}) {
  const n = levels.length, H = n * LH + (n - 1) * GAP;
  const body = levels.map((lv, i) => {
    const y0 = i * (LH + GAP);
    const line = i < n - 1 ? `<line x1="8" x2="${W - 8}" y1="${y0 + LH + GAP / 2}" y2="${y0 + LH + GAP / 2}" class="mn-sep"/>` : '';
    return (blank(lv) ? `<rect x="10" y="${y0 + 4}" width="${W - 20}" height="${LH - 8}" rx="8" class="mn-empty"/>` : levelSvg(lv, y0, 'mn-lv')) + line;
  }).join('');
  return `<svg class="mn-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}">${body}</svg>`;
}

// 四個選項：正確答案、差 1、差 5、差 20（超出範圍就換別的），用 n 排序，順序固定
export function readOptions(n) {
  const out = [n];
  for (const d of [1, 5, 20, -1, -5, -20, 2, 10]) {
    const v = n + d;
    if (v >= 0 && v <= 399 && !out.includes(v)) out.push(v);
    if (out.length === 4) break;
  }
  return out.sort((a, b) => ((a * 7 + n) % 11) - ((b * 7 + n) % 11) || a - b);
}

