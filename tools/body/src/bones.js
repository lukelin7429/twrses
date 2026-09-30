/*
 * 人體探索 · 骨骼清單（build-skeleton.mjs 與 skeleton.js 共用，唯一的真實來源）。
 *
 * 每塊骨頭：
 *   id    模型裡的節點名稱（r-femur、l-rib-3、c1…）
 *   src   BodyParts3D 的 concept 名稱（partof_element_parts.txt 第二欄），打包時用它找 OBJ
 *   en/zh 顯示名稱；nick 是英文俗名（thighbone 之類），孩子比較記得住
 *   region 所屬區域（REGIONS 的 key）
 *
 * 一般說成人有 206 塊骨頭；BodyParts3D 沒有尾骨與六塊聽小骨，所以模型是 199 塊。
 * 胸骨在資料裡是三塊（胸骨柄、胸骨體、劍突），這裡照一般算法合成一塊。
 */

export const REGIONS = [
  { key: 'skull',    en: 'Skull',          zh: '頭顱骨',   job_en: 'A helmet for your brain. Your jaw is the only skull bone that moves.', job_zh: '保護大腦的安全帽；下頷骨是頭顱骨中唯一會動的一塊。' },
  { key: 'spine',    en: 'Spine',          zh: '脊柱',     job_en: 'A stack of 24 vertebrae on the sacrum. It holds you upright and guards your spinal cord.', job_zh: '24 塊椎骨疊在薦骨上，撐起身體，也保護裡面的脊髓。' },
  { key: 'chest',    en: 'Rib cage',       zh: '胸廓',     job_en: 'Twelve pairs of ribs and the breastbone form a cage around your heart and lungs.', job_zh: '十二對肋骨加上胸骨，圍成保護心臟和肺的籠子。' },
  { key: 'shoulder', en: 'Shoulders',      zh: '肩帶',     job_en: 'The collarbones and shoulder blades hang your arms on your body.', job_zh: '鎖骨和肩胛骨把兩隻手臂掛在身體上。' },
  { key: 'arm',      en: 'Arms',           zh: '手臂',     job_en: 'Long bones that act as levers, so your muscles can lift and throw.', job_zh: '長長的骨頭像槓桿，讓肌肉可以舉起、丟出東西。' },
  { key: 'hand',     en: 'Hands',          zh: '手',       job_en: '27 small bones in each hand let you write, button a shirt, and play the piano.', job_zh: '每隻手 27 塊小骨頭，讓你能寫字、扣扣子、彈鋼琴。' },
  { key: 'pelvis',   en: 'Pelvis',         zh: '骨盆',     job_en: 'The hip bones pass your body weight to your legs and cradle the organs of your lower belly.', job_zh: '髖骨把上半身的重量傳到兩腿，也托住下腹部的器官。' },
  { key: 'leg',      en: 'Legs',           zh: '腿',       job_en: 'The strongest bones in your body. The thighbone can carry many times your weight.', job_zh: '全身最強壯的骨頭；股骨可以承受好幾倍的體重。' },
  { key: 'foot',     en: 'Feet',           zh: '腳',       job_en: '26 bones in each foot make an arch that works like a spring when you walk and jump.', job_zh: '每隻腳 26 塊骨頭，搭成一個拱，走路、跳躍時像彈簧一樣。' },
];

// 五大功能：按鈕 → 亮起哪些區域（blood 另有紅骨髓的處理，見 skeleton.js）
export const JOBS = [
  { key: 'support', en: 'Support', zh: '支撐', regions: ['spine', 'pelvis', 'leg', 'foot'],
    text_en: 'Your spine, pelvis, and legs carry your weight all the way down to your feet.', text_zh: '脊柱、骨盆和雙腿把全身的重量一路傳到腳底。' },
  { key: 'protect', en: 'Protect', zh: '保護', regions: ['skull', 'chest', 'spine', 'pelvis'],
    text_en: 'The skull guards the brain, the ribs guard the heart and lungs, and the spine guards the spinal cord.', text_zh: '頭顱骨保護大腦，肋骨保護心臟和肺，脊柱保護脊髓。' },
  { key: 'move', en: 'Move', zh: '運動', regions: ['shoulder', 'arm', 'hand', 'leg', 'foot'],
    text_en: 'Muscles pull on bones like ropes on levers. Joints are the places where bones meet and bend.', text_zh: '肌肉拉動骨頭，就像用繩子拉槓桿；關節是骨頭相接、可以彎曲的地方。' },
  { key: 'blood', en: 'Make blood', zh: '造血', regions: ['skull', 'spine', 'chest', 'pelvis', 'shoulder'],
    text_en: 'In adults, red marrow inside the flat bones and the top ends of the thighbone and upper arm bone makes billions of new blood cells every day.', text_zh: '成人的紅骨髓在扁平的骨頭裡，以及股骨、肱骨的上端，每天製造幾千億個新的血球。' },
  { key: 'store', en: 'Store minerals', zh: '儲存礦物質', regions: ['skull', 'spine', 'chest', 'shoulder', 'arm', 'hand', 'pelvis', 'leg', 'foot'],
    text_en: 'Every bone is a bank for calcium. When your blood needs calcium, your bones lend some.', text_zh: '每一塊骨頭都是鈣的銀行；血液缺鈣時，骨頭會借一些出來。' },
];

const ORD_EN = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'];
const ORD_ZH = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
const SIDES = [['r', 'right', '右'], ['l', 'left', '左']];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

export function buildBones() {
  const B = [];
  const add = (id, src, en, zh, region, nick = '') => B.push({ id, src: Array.isArray(src) ? src : [src], en, zh, region, nick });

  // ---- 頭顱骨 ----
  add('frontal', 'frontal bone', 'Frontal bone', '額骨', 'skull', 'forehead bone');
  add('occipital', 'occipital bone', 'Occipital bone', '枕骨', 'skull');
  add('sphenoid', 'sphenoid bone', 'Sphenoid bone', '蝶骨', 'skull');
  add('ethmoid', 'ethmoid', 'Ethmoid bone', '篩骨', 'skull');
  add('vomer', 'vomer', 'Vomer', '犁骨', 'skull');
  add('mandible', 'mandible', 'Mandible', '下頷骨', 'skull', 'jawbone');
  add('hyoid', 'hyoid bone', 'Hyoid bone', '舌骨', 'skull');
  for (const [s, se, sz] of SIDES) {
    add(`${s}-parietal`, `${se} parietal bone`, `${cap(se)} parietal bone`, `${sz}頂骨`, 'skull');
    add(`${s}-temporal`, `${se} temporal bone`, `${cap(se)} temporal bone`, `${sz}顳骨`, 'skull');
    add(`${s}-nasal`, `${se} nasal bone`, `${cap(se)} nasal bone`, `${sz}鼻骨`, 'skull');
    add(`${s}-maxilla`, `${se} maxilla`, `${cap(se)} maxilla`, `${sz}上頷骨`, 'skull', 'upper jawbone');
    add(`${s}-lacrimal`, `${se} lacrimal bone`, `${cap(se)} lacrimal bone`, `${sz}淚骨`, 'skull');
    add(`${s}-zygomatic`, `${se} zygomatic bone`, `${cap(se)} zygomatic bone`, `${sz}顴骨`, 'skull', 'cheekbone');
    add(`${s}-palatine`, `${se} palatine bone`, `${cap(se)} palatine bone`, `${sz}腭骨`, 'skull');
    add(`${s}-concha`, `${se} inferior nasal concha`, `${cap(se)} inferior nasal concha`, `${sz}下鼻甲`, 'skull');
  }

  // ---- 脊柱 ----
  add('c1', 'atlas', 'Atlas (1st neck vertebra)', '寰椎（第一頸椎）', 'spine');
  add('c2', 'axis', 'Axis (2nd neck vertebra)', '樞椎（第二頸椎）', 'spine');
  for (let i = 3; i <= 7; i++) add(`c${i}`, `${ORD_EN[i - 1]} cervical vertebra`, `Cervical vertebra ${i} (neck)`, `第${ORD_ZH[i - 1]}頸椎`, 'spine');
  for (let i = 1; i <= 12; i++) add(`t${i}`, `${ORD_EN[i - 1]} thoracic vertebra`, `Thoracic vertebra ${i} (chest)`, `第${ORD_ZH[i - 1]}胸椎`, 'spine');
  for (let i = 1; i <= 5; i++) add(`l${i}`, `${ORD_EN[i - 1]} lumbar vertebra`, `Lumbar vertebra ${i} (lower back)`, `第${ORD_ZH[i - 1]}腰椎`, 'spine');
  add('sacrum', 'sacrum', 'Sacrum', '薦骨', 'spine');

  // ---- 胸廓 ----
  add('sternum', 'sternum', 'Sternum', '胸骨', 'chest', 'breastbone');
  for (const [s, se, sz] of SIDES) {
    for (let i = 1; i <= 12; i++) add(`${s}-rib-${i}`, `${se} ${ORD_EN[i - 1]} rib`, `${cap(se)} rib ${i}`, `${sz}側第${ORD_ZH[i - 1]}肋骨`, 'chest');
  }

  // ---- 四肢 ----
  const FING = [['thumb', '拇指'], ['index finger', '食指'], ['middle finger', '中指'], ['ring finger', '無名指'], ['little finger', '小指']];
  const TOES = [['big toe', '大腳趾'], ['second toe', '第二趾'], ['third toe', '第三趾'], ['fourth toe', '第四趾'], ['little toe', '小趾']];
  const CARPALS = [['scaphoid', '舟狀骨'], ['lunate', '月狀骨'], ['triquetral', '三角骨'], ['pisiform', '豆狀骨'],
                   ['trapezium', '大多角骨'], ['trapezoid', '小多角骨'], ['capitate', '頭狀骨'], ['hamate', '鉤狀骨']];
  for (const [s, se, sz] of SIDES) {
    const S = cap(se);
    add(`${s}-clavicle`, `${se} clavicle`, `${S} clavicle`, `${sz}鎖骨`, 'shoulder', 'collarbone');
    add(`${s}-scapula`, `${se} scapula`, `${S} scapula`, `${sz}肩胛骨`, 'shoulder', 'shoulder blade');
    add(`${s}-humerus`, `${se} humerus`, `${S} humerus`, `${sz}肱骨`, 'arm', 'upper arm bone');
    add(`${s}-radius`, `${se} radius`, `${S} radius`, `${sz}橈骨`, 'arm', 'forearm bone, thumb side');
    add(`${s}-ulna`, `${se} ulna`, `${S} ulna`, `${sz}尺骨`, 'arm', 'forearm bone, little-finger side');
    for (const [c, cz] of CARPALS) add(`${s}-${c}`, `${se} ${c}`, `${S} ${c}`, `${sz}${cz}`, 'hand', 'wrist bone');
    for (let i = 1; i <= 5; i++) add(`${s}-mc${i}`, `${se} ${ORD_EN[i - 1]} metacarpal bone`, `${S} metacarpal ${i}`, `${sz}手第${ORD_ZH[i - 1]}掌骨`, 'hand', `palm bone of the ${FING[i - 1][0]}`);
    FING.forEach(([f, fz], k) => {
      for (const [p, pz] of [['proximal', '近節'], ['middle', '中節'], ['distal', '遠節']]) {
        if (k === 0 && p === 'middle') continue;           // 拇指只有兩節
        add(`${s}-f${k + 1}-${p[0]}`, `${p} phalanx of ${se} ${f}`, `${S} ${f}, ${p} phalanx`, `${sz}手${fz}${pz}指骨`, 'hand', 'finger bone');
      }
    });
    add(`${s}-hip`, `${se} hip bone`, `${S} hip bone`, `${sz}髖骨`, 'pelvis');
    add(`${s}-femur`, `${se} femur`, `${S} femur`, `${sz}股骨`, 'leg', 'thighbone');
    add(`${s}-patella`, `${se} patella`, `${S} patella`, `${sz}髕骨`, 'leg', 'kneecap');
    add(`${s}-tibia`, `${se} tibia`, `${S} tibia`, `${sz}脛骨`, 'leg', 'shinbone');
    add(`${s}-fibula`, `${se} fibula`, `${S} fibula`, `${sz}腓骨`, 'leg', 'calf bone');
    add(`${s}-talus`, `${se} talus`, `${S} talus`, `${sz}距骨`, 'foot', 'ankle bone');
    add(`${s}-calcaneus`, `${se} calcaneus`, `${S} calcaneus`, `${sz}跟骨`, 'foot', 'heel bone');
    add(`${s}-navicular`, `navicular bone of ${se} foot`, `${S} navicular`, `${sz}足舟骨`, 'foot');
    add(`${s}-cuboid`, `${se} cuboid bone`, `${S} cuboid`, `${sz}骰骨`, 'foot');
    for (const [c, cz] of [['medial', '內側'], ['intermediate', '中間'], ['lateral', '外側']]) {
      add(`${s}-cun-${c[0]}`, `${se} ${c} cuneiform bone`, `${S} ${c} cuneiform`, `${sz}${cz}楔骨`, 'foot');
    }
    for (let i = 1; i <= 5; i++) add(`${s}-mt${i}`, `${se} ${ORD_EN[i - 1]} metatarsal bone`, `${S} metatarsal ${i}`, `${sz}腳第${ORD_ZH[i - 1]}蹠骨`, 'foot');
    TOES.forEach(([t, tz], k) => {
      for (const [p, pz] of [['proximal', '近節'], ['middle', '中節'], ['distal', '遠節']]) {
        if (k === 0 && p === 'middle') continue;           // 大腳趾只有兩節
        add(`${s}-t${k + 1}-${p[0]}`, `${p} phalanx of ${se} ${t}`, `${S} ${t}, ${p} phalanx`, `${sz}腳${tz}${pz}趾骨`, 'foot', 'toe bone');
      }
    });
  }
  return B;
}

// 「數一數手上的骨頭」的順序：手腕 8 → 手掌 5 → 手指 14（一根指頭一根指頭數）
export function handOrder(side = 'r') {
  const ids = ['scaphoid', 'lunate', 'triquetral', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'].map((c) => `${side}-${c}`);
  for (let i = 1; i <= 5; i++) ids.push(`${side}-mc${i}`);
  for (let k = 1; k <= 5; k++) for (const p of (k === 1 ? ['p', 'd'] : ['p', 'm', 'd'])) ids.push(`${side}-f${k}-${p}`);
  return ids;
}
