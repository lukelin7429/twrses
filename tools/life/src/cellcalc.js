// 第一課：細胞是什麼？
// 兩種細胞各有哪些部分（順序＝側欄按鈕的順序）
export const PARTS = {
  animal: ['membrane', 'nucleus', 'mito', 'cytoplasm'],
  plant: ['wall', 'membrane', 'nucleus', 'mito', 'chloroplast', 'vacuole', 'cytoplasm'],
};
// 植物細胞多出來的三樣
export const PLANT_ONLY = ['wall', 'chloroplast', 'vacuole'];
export const has = (kind, part) => PARTS[kind].includes(part);
// 頁面小工具：有沒有細胞壁、葉綠體、大液泡 → 這是哪一種細胞
export function kindOf({ wall, chloroplast, vacuole }) {
  if (!wall && !chloroplast && !vacuole) return 'animal';
  if (wall && chloroplast && vacuole) return 'green';        // 葉子裡的細胞
  if (wall && !chloroplast && vacuole) return 'root';        // 根、洋蔥：不見光的植物細胞
  return 'odd';                                              // 動植物裡不常見的組合
}
