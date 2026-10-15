/*
 * 美術 Art · 第九課〈顏料的顏色從哪裡來？〉的純函式與資料（不碰 DOM，test/pigment.test.mjs 測）。
 *
 * 一個機制：顏料＝色粉（有顏色、不溶於水的細粉）＋黏著劑（把粉黏在紙、布、牆上）。
 * 同一種色粉配不同的黏著劑，就成了不同的顏料。
 *
 * 畫面上的色塊是示意：每種色粉一個近似的螢幕顏色（rgb，0–1），每種黏著劑一個「蓋住底下的程度」（cover，0–1）。
 * 色塊＝紙色和色粉色依 cover 混合（sRGB 直接內插）；底下畫一條黑線，cover 越低，黑線越透出來。
 * 真實的遮蓋力也和色粉本身、塗得多厚有關；頁面的模型說明講明了。
 */

export const PAPER = [0.97, 0.95, 0.9];
export const INK = [0.07, 0.07, 0.08];

export const ORIGINS = {
  earth: { en: 'From the earth', zh: '來自土和礦石', mark: '▲' },
  living: { en: 'From living things', zh: '來自生物', mark: '●' },
  made: { en: 'Made in a lab or factory', zh: '在實驗室或工廠裡做出來', mark: '■' },
};

// 色粉卡（rgb 是螢幕上的近似色）。src＝來源與故事、clue＝小遊戲的線索；出處列在頁面的資料出處。
// 歷史上有毒的色粉（鉛白、朱砂、雌黃、巴黎綠、藤黃）只在課文裡介紹，不做成卡片，也不在活動裡用。
export const PIGMENTS = [
  { key: 'ochre', en: 'Yellow ochre', zh: '土黃（赭黃）', origin: 'earth', rgb: [0.8, 0.6, 0.25],
    src_en: 'A natural earth pigment: clay colored by iron oxide. At Blombos Cave in South Africa, people mixed an ochre-rich paste about 100,000 years ago.',
    src_zh: '天然的土色料：含有氧化鐵的黏土。在南非的布隆伯斯洞穴，大約十萬年前就有人調製富含赭土的糊狀物。',
    clue_en: 'Dug out of the ground: yellow clay colored by iron.', clue_zh: '從地裡挖出來：被鐵染黃的黏土。' },
  { key: 'ultramarine', en: 'Ultramarine', zh: '群青', origin: 'earth', rgb: [0.16, 0.25, 0.65],
    src_en: 'Ground from lapis lazuli, a blue stone mined in Afghanistan. The best grades could be worth more than gold. A factory-made version has existed since 1826.',
    src_zh: '用阿富汗開採的藍色寶石青金石磨成。最好的等級可能比黃金還貴。1826 年以後，工廠也能做出合成的群青。',
    clue_en: 'Ground from a blue stone mined in the mountains of Afghanistan.', clue_zh: '用阿富汗山區開採的一種藍色石頭磨成。' },
  { key: 'azurite', en: 'Azurite', zh: '石青', origin: 'earth', rgb: [0.15, 0.38, 0.62],
    src_en: 'A blue mineral that contains copper. Chinese painters call it 石青, and the Ministry of Education dictionary notes that its color lasts and that painters use it often.',
    src_zh: '一種含銅的藍色礦物（藍銅礦）。中國畫叫它石青；教育部辭典說它「顏色經久不變，畫家多用之」。',
    clue_en: 'Ground from a blue mineral that contains copper.', clue_zh: '用一種含銅的藍色礦物磨成。' },
  { key: 'cochineal', en: 'Carmine', zh: '胭脂紅', origin: 'living', rgb: [0.72, 0.1, 0.25],
    src_en: 'Made from cochineal, small insects that live on cactus plants in Mexico and South America. Spain began bringing it to Europe in the 1520s.',
    src_zh: '用胭脂蟲做成：一種住在墨西哥和南美洲仙人掌上的小昆蟲。西班牙在 1520 年代開始把它運到歐洲。',
    clue_en: 'Made from tiny insects that live on cactus plants.', clue_zh: '用住在仙人掌上的小昆蟲做成。' },
  { key: 'indigo', en: 'Indigo', zh: '靛藍（花青）', origin: 'living', rgb: [0.15, 0.2, 0.38],
    src_en: 'Made from the leaves of indigo plants. It starts out as a dye that dissolves, and turns into a blue that does not dissolve when it reacts with oxygen. Chinese painters call it 花青.',
    src_zh: '用藍草的葉子做成。它一開始是會溶解的染料，和氧起反應後，變成不會溶解的藍色。中國畫叫它花青。',
    clue_en: 'Made from the leaves of a plant.', clue_zh: '用一種植物的葉子做成。' },
  { key: 'shell', en: 'Shell white', zh: '蛤粉', origin: 'living', rgb: [0.95, 0.94, 0.9],
    src_en: 'Ground from clam shells, which are made of calcium carbonate. The Ministry of Education dictionary lists it as a painting color.',
    src_zh: '用文蛤的殼磨成，成分是碳酸鈣。教育部辭典說它是繪畫顏料。',
    clue_en: 'Ground from the shells of clams.', clue_zh: '用文蛤的殼磨成。' },
  { key: 'prussian', en: 'Prussian blue', zh: '普魯士藍', origin: 'made', rgb: [0.06, 0.2, 0.33],
    src_en: 'Made by accident in Berlin around 1706. It was the first fully modern synthetic pigment, made by a chemical reaction.',
    src_zh: '大約 1706 年在柏林意外做出來的。它是第一種完全現代的合成色料，靠化學反應做成。',
    clue_en: 'Made by accident in a Berlin workshop about 300 years ago.', clue_zh: '大約三百年前，在柏林的工作坊裡意外做出來。' },
  { key: 'titanium', en: 'Titanium white', zh: '鈦白', origin: 'made', rgb: [0.98, 0.98, 0.97],
    src_en: 'Titanium dioxide, first mass-produced in 1916. Over time it took the place of lead white, which is poisonous.',
    src_zh: '二氧化鈦，1916 年開始大量生產。後來它漸漸取代了有毒的鉛白。',
    clue_en: 'Made in factories since 1916 to take the place of a poisonous white.', clue_zh: '1916 年起在工廠裡生產，用來取代一種有毒的白。' },
];

// 黏著劑 → 顏料（cover：示意的遮蓋程度）
export const BINDERS = [
  { key: 'gum', en: 'Gum arabic', zh: '阿拉伯膠', icon: '💧', paint: { en: 'Watercolor', zh: '水彩' }, cover: 0.55, gloss: 0,
    note_en: 'Gum arabic is a gum from acacia trees, and it is the traditional binder of watercolor.', note_zh: '阿拉伯膠是金合歡樹的樹膠，是水彩傳統的黏著劑。' },
  { key: 'egg', en: 'Egg yolk', zh: '蛋黃', icon: '🥚', paint: { en: 'Egg tempera', zh: '蛋彩' }, cover: 0.78, gloss: 0.15,
    note_en: 'Egg tempera uses egg yolk. Most early Italian paintings were made with it.', note_zh: '蛋彩用的是蛋黃。早期的義大利繪畫大多用它畫成。' },
  { key: 'oil', en: 'Linseed oil', zh: '亞麻仁油', icon: '🌱', paint: { en: 'Oil paint', zh: '油畫顏料' }, cover: 0.88, gloss: 0.45,
    note_en: 'Oil paint mixes pigment with a drying oil, such as linseed, walnut, or poppy oil.', note_zh: '油畫顏料把色粉和會乾的油調在一起，例如亞麻仁油、核桃油或罌粟油。' },
  { key: 'acrylic', en: 'Acrylic polymer', zh: '壓克力樹脂', icon: '🧪', paint: { en: 'Acrylic paint', zh: '壓克力顏料' }, cover: 0.92, gloss: 0.25,
    note_en: 'Acrylic paint holds the pigment in an emulsion of acrylic polymer in water.', note_zh: '壓克力顏料用壓克力樹脂在水中的乳液把色粉黏住。' },
  { key: 'glue', en: 'Animal glue', zh: '動物膠', icon: '🍯', paint: { en: 'Glue painting', zh: '膠彩' }, cover: 0.82, gloss: 0.05,
    note_en: 'Glue painting mixes the pigment with glue. Taiwan\'s glue painting came from Japan, where the binder is a hide glue.', note_zh: '膠彩是把顏料和膠調在一起；台灣的膠彩畫是從日本傳來的，用的是動物皮做的膠。' },
];

export const pigmentOf = (k) => PIGMENTS.find((p) => p.key === k);
export const binderOf = (k) => BINDERS.find((b) => b.key === k);
const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

/** 塗在紙上的色塊顏色（overInk：塗在黑線上面那一段）。 */
export function swatch(pKey, bKey, overInk = false) {
  const p = pigmentOf(pKey), b = binderOf(bKey);
  return lerp(overInk ? INK : PAPER, p.rgb, b.cover);
}
/** 黑線透出來的程度（0＝完全蓋住，1＝完全看得到）。 */
export const showThrough = (bKey) => 1 - binderOf(bKey).cover;
/** 配出來的是哪一種顏料。 */
export const paintName = (bKey) => binderOf(bKey).paint;

// ── 小互動一：這是從哪裡來的？ ───────────────────────────────────
export const ORIGIN_ROUNDS = PIGMENTS.map((p) => p.key);

// ── 小互動二：要做哪一種顏料，該用哪一種黏著劑？ ──────────────────────
export const BINDER_ROUNDS = [
  { want: 'gum', options: ['gum', 'oil', 'egg'] },
  { want: 'oil', options: ['egg', 'acrylic', 'oil'] },
  { want: 'egg', options: ['egg', 'glue', 'oil'] },
  { want: 'acrylic', options: ['oil', 'acrylic', 'gum'] },
  { want: 'glue', options: ['gum', 'egg', 'glue'] },
];
