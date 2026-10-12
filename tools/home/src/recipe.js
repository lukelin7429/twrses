/*
 * 家政 Life Skills at Home · 食譜的計算（純函式；convert2d.js、scale2d.js 與 test/data.test.mjs 共用）。
 * 食譜資料在 data/home.json 的 lesson.recipe：items[] 每項 { amount: "1 1/2", unit: "cup"|"tbsp"|"tsp", to: "g"|"ml", g_cup? }，
 * 或 { pinch: true }（一小撮，沒有數字）。
 */
import { ML, TSP_PER, fToC, fnum, formatAmount, formatMixed, formatParts, frac, kitchenParts, parseAmount, scaleAmount } from './units.js';

const UNIT_ZH = { cup: '杯', tbsp: '湯匙', tsp: '茶匙' };
export const unitZh = (u) => UNIT_ZH[u] || u;
export const roundMl = (ml) => (ml < 10 ? Math.round(ml * 2) / 2 : Math.round(ml));
const trim = (x, d = 1) => String(Number(x.toFixed(d)));

/** 一項材料換成公制：{ value, unit: 'g'|'mL', text: "134 g", how_en, how_zh } */
export function toMetric(item) {
  if (item.pinch) return null;
  const a = parseAmount(item.amount), us = formatAmount(a, item.unit);
  if (item.to === 'g') {
    const cups = fnum(a) * TSP_PER[item.unit] / 48;
    const raw = cups * item.g_cup, value = Math.round(raw);
    const part = item.unit === 'cup' ? '' : ` (1 ${item.unit} = 1/${48 / TSP_PER[item.unit]} cup)`;
    const partZh = item.unit === 'cup' ? '' : `（1 ${unitZh(item.unit)} = 1/${48 / TSP_PER[item.unit]} 杯）`;
    return {
      value, unit: 'g', text: `${value} g`,
      how_en: `${us}${part} × about ${item.g_cup} g per cup = ${trim(raw)} g`,
      how_zh: `${formatMixed(a)} ${unitZh(item.unit)}${partZh} × 每杯大約 ${item.g_cup} 公克 = ${trim(raw)} 公克`,
    };
  }
  const raw = fnum(a) * ML[item.unit], value = roundMl(raw);
  return {
    value, unit: 'mL', text: `${value} mL`,
    how_en: `${us} × ${trim(ML[item.unit], 2)} mL = ${trim(raw)} mL`,
    how_zh: `${formatMixed(a)} ${unitZh(item.unit)} × ${trim(ML[item.unit], 2)} 毫升 = ${trim(raw)} 毫升`,
  };
}

export function ovenMetric(f) {
  const c = fToC(f);
  return { value: Math.round(c), text: `${Math.round(c)}°C`, how_en: `(${f} − 32) × 5 ÷ 9 = ${trim(c)}°C`, how_zh: `（${f} − 32）× 5 ÷ 9 = ${trim(c)}°C` };
}

/** 一項材料 × 倍數（分數）→ { text: "2 tbsp + 2 tsp", exact: "1/6 cup", changedUnit } */
export function scaleItem(item, factor) {
  if (item.pinch) {
    const k = fnum(factor);
    return k <= 1 ? { text: 'a pinch', zh: '一小撮', exact: '', pinch: true } : { text: `${k === 2 ? '2 pinches' : 'a big pinch'}`, zh: k === 2 ? '兩小撮' : '一大撮', exact: '', pinch: true };
  }
  const exact = scaleAmount(parseAmount(item.amount), factor);
  const parts = kitchenParts(exact, item.unit);
  const text = formatParts(parts), same = formatAmount(exact, item.unit);
  return {
    text, exact: same, changedUnit: text !== same, amount: exact, parts,
    zh: parts.map((p) => `${formatMixed(p.amount)} ${unitZh(p.unit)}`).join(' + '),
  };
}

export const servingFactor = (serves, base) => frac(serves, base);
