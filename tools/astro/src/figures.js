/*
 * 第五課的星座連線、星名與中國星官（本站自繪，不沿用任何現成連線檔）。
 *
 * 星星以耶魯亮星星表（BSC5）的名稱指定：希臘字母縮寫＋上標＋星座，例如 'Alp Ori'、'Del1 Tau'；
 * 沒有拜耳字母的用佛氏編號，例如 '41 Ari'。scripts/build-stars.mjs 會把名稱換成星表裡的星，
 * 找不到就報錯——改連線之後一定要重跑 `npm run stars`。
 *
 * 連線是教學用的簡化畫法（照常見的傳統圖形），不是 IAU 官方圖形——IAU 只定星座的邊界，不定連線。
 * 星座中文名用台灣的正式譯名（室女、人馬、寶瓶、白羊），星座運勢的叫法（處女、射手、水瓶、牡羊）寫在課文裡對照。
 */

// zodiac：太陽會經過的十三個星座（含蛇夫座）；lab：3D 與星空圖上要不要標名稱
export const FIGURES = [
  // ---- 黃道星座（太陽一年經過的路線）----
  { abbr: 'Ari', en: 'Aries', zh: '白羊座', zodiac: true, lines: [['Gam1 Ari', 'Bet Ari', 'Alp Ari', '41 Ari']] },
  { abbr: 'Tau', en: 'Taurus', zh: '金牛座', zodiac: true, lines: [['Bet Tau', 'Eps Tau', 'Del1 Tau', 'Gam Tau', 'Lam Tau'], ['Gam Tau', 'Alp Tau', 'Zet Tau']] },
  { abbr: 'Gem', en: 'Gemini', zh: '雙子座', zodiac: true, lines: [['Alp Gem', 'Tau Gem', 'Eps Gem', 'Mu Gem', 'Eta Gem'], ['Bet Gem', 'Ups Gem', 'Del Gem', 'Zet Gem', 'Gam Gem'], ['Tau Gem', 'Iot Gem', 'Ups Gem']] },
  { abbr: 'Cnc', en: 'Cancer', zh: '巨蟹座', zodiac: true, lines: [['Iot Cnc', 'Gam Cnc', 'Del Cnc', 'Bet Cnc'], ['Del Cnc', 'Alp Cnc']] },
  { abbr: 'Leo', en: 'Leo', zh: '獅子座', zodiac: true, lines: [['Eps Leo', 'Mu Leo', 'Zet Leo', 'Gam1 Leo', 'Eta Leo', 'Alp Leo', 'The Leo', 'Bet Leo', 'Del Leo', 'Gam1 Leo']] },
  { abbr: 'Vir', en: 'Virgo', zh: '室女座', zodiac: true, lines: [['Eps Vir', 'Del Vir', 'Gam Vir', 'Eta Vir', 'Bet Vir'], ['Gam Vir', 'The Vir', 'Alp Vir'], ['Del Vir', 'Zet Vir']] },
  { abbr: 'Lib', en: 'Libra', zh: '天秤座', zodiac: true, lines: [['Sig Lib', 'Alp2 Lib', 'Bet Lib', 'Gam Lib', 'Ups Lib']] },
  { abbr: 'Sco', en: 'Scorpius', zh: '天蠍座', zodiac: true, lines: [['Bet1 Sco', 'Del Sco', 'Pi Sco'], ['Del Sco', 'Sig Sco', 'Alp Sco', 'Tau Sco', 'Eps Sco', 'Mu1 Sco', 'Zet2 Sco', 'Eta Sco', 'The Sco', 'Iot1 Sco', 'Kap Sco', 'Lam Sco', 'Ups Sco']] },
  { abbr: 'Oph', en: 'Ophiuchus', zh: '蛇夫座', zodiac: true, lines: [['Alp Oph', 'Kap Oph', 'Del Oph', 'Eps Oph', 'Zet Oph', 'Eta Oph', 'Bet Oph', 'Alp Oph']] },
  { abbr: 'Sgr', en: 'Sagittarius', zh: '人馬座', zodiac: true, lines: [['Gam2 Sgr', 'Del Sgr', 'Eps Sgr', 'Gam2 Sgr'], ['Del Sgr', 'Lam Sgr', 'Phi Sgr', 'Del Sgr'], ['Phi Sgr', 'Sig Sgr', 'Tau Sgr', 'Zet Sgr', 'Phi Sgr'], ['Zet Sgr', 'Eps Sgr']] },
  { abbr: 'Cap', en: 'Capricornus', zh: '摩羯座', zodiac: true, lines: [['Alp2 Cap', 'Bet Cap', 'Psi Cap', 'Ome Cap', 'Zet Cap', 'Del Cap', 'Gam Cap', 'Iot Cap', 'The Cap', 'Bet Cap']] },
  { abbr: 'Aqr', en: 'Aquarius', zh: '寶瓶座', zodiac: true, lines: [['Eps Aqr', 'Bet Aqr', 'Alp Aqr', 'Gam Aqr', 'Zet1 Aqr', 'Eta Aqr'], ['Alp Aqr', 'The Aqr', 'Lam Aqr', 'Del Aqr']] },
  { abbr: 'Psc', en: 'Pisces', zh: '雙魚座', zodiac: true, lines: [['Gam Psc', 'Kap Psc', 'Lam Psc', 'Iot Psc', 'The Psc', 'Gam Psc'], ['Iot Psc', 'Ome Psc', 'Del Psc', 'Eps Psc', 'Zet Psc', 'Mu Psc', 'Nu Psc', 'Alp Psc', 'Omi Psc', 'Eta Psc']] },
  // ---- 其他亮星座 ----
  { abbr: 'Ori', en: 'Orion', zh: '獵戶座', lines: [['Lam Ori', 'Alp Ori', 'Zet Ori', 'Kap Ori'], ['Lam Ori', 'Gam Ori', 'Del Ori', 'Bet Ori'], ['Del Ori', 'Eps Ori', 'Zet Ori'], ['Alp Ori', 'Gam Ori']] },
  { abbr: 'CMa', en: 'Canis Major', zh: '大犬座', lines: [['Bet CMa', 'Alp CMa', 'Del CMa', 'Eta CMa'], ['Del CMa', 'Eps CMa']] },
  { abbr: 'CMi', en: 'Canis Minor', zh: '小犬座', lines: [['Alp CMi', 'Bet CMi']] },
  { abbr: 'Aur', en: 'Auriga', zh: '御夫座', lines: [['Alp Aur', 'Bet Aur', 'The Aur', 'Bet Tau', 'Iot Aur', 'Alp Aur']] },
  { abbr: 'Per', en: 'Perseus', zh: '英仙座', lines: [['Gam Per', 'Alp Per', 'Del Per', 'Eps Per', 'Xi Per', 'Zet Per'], ['Alp Per', 'Kap Per', 'Bet Per']] },
  { abbr: 'UMa', en: 'Big Dipper', zh: '北斗七星', lines: [['Eta UMa', 'Zet UMa', 'Eps UMa', 'Del UMa', 'Alp UMa', 'Bet UMa', 'Gam UMa', 'Del UMa']] },
  { abbr: 'UMi', en: 'Ursa Minor', zh: '小熊座', lines: [['Alp UMi', 'Del UMi', 'Eps UMi', 'Zet UMi', 'Bet UMi', 'Gam UMi', 'Eta UMi', 'Zet UMi']] },
  { abbr: 'Cas', en: 'Cassiopeia', zh: '仙后座', lines: [['Eps Cas', 'Del Cas', 'Gam Cas', 'Alp Cas', 'Bet Cas']] },
  { abbr: 'Boo', en: 'Boötes', zh: '牧夫座', lines: [['Alp Boo', 'Eps Boo', 'Del Boo', 'Bet Boo', 'Gam Boo', 'Rho Boo', 'Alp Boo'], ['Alp Boo', 'Eta Boo'], ['Alp Boo', 'Zet Boo']] },
  { abbr: 'CrB', en: 'Corona Borealis', zh: '北冕座', lines: [['The CrB', 'Bet CrB', 'Alp CrB', 'Gam CrB', 'Del CrB', 'Eps CrB', 'Iot CrB']] },
  { abbr: 'Her', en: 'Hercules', zh: '武仙座', lines: [['Eps Her', 'Zet Her', 'Eta Her', 'Pi Her', 'Eps Her'], ['Zet Her', 'Bet Her']] },
  { abbr: 'Lyr', en: 'Lyra', zh: '天琴座', lines: [['Alp Lyr', 'Zet1 Lyr', 'Bet Lyr', 'Gam Lyr', 'Del2 Lyr', 'Zet1 Lyr']] },
  { abbr: 'Cyg', en: 'Cygnus', zh: '天鵝座', lines: [['Alp Cyg', 'Gam Cyg', 'Eta Cyg', 'Bet1 Cyg'], ['Del Cyg', 'Gam Cyg', 'Eps Cyg']] },
  { abbr: 'Aql', en: 'Aquila', zh: '天鷹座', lines: [['Gam Aql', 'Alp Aql', 'Bet Aql', 'The Aql'], ['Alp Aql', 'Del Aql', 'Lam Aql'], ['Zet Aql', 'Del Aql']] },
  { abbr: 'Peg', en: 'Pegasus', zh: '飛馬座', lines: [['Alp Peg', 'Bet Peg', 'Alp And', 'Gam Peg', 'Alp Peg'], ['Alp Peg', 'Zet Peg', 'The Peg', 'Eps Peg'], ['Bet Peg', 'Eta Peg'], ['Bet Peg', 'Mu Peg', 'Lam Peg']] },
  { abbr: 'And', en: 'Andromeda', zh: '仙女座', lines: [['Alp And', 'Del And', 'Bet And', 'Gam1 And'], ['Bet And', 'Mu And', 'Nu And']] },
  { abbr: 'Crv', en: 'Corvus', zh: '烏鴉座', lines: [['Gam Crv', 'Del Crv', 'Bet Crv', 'Eps Crv', 'Gam Crv']] },
  { abbr: 'Cru', en: 'Southern Cross', zh: '南十字座', lines: [['Alp1 Cru', 'Gam Cru'], ['Bet Cru', 'Del Cru']] },
  { abbr: 'Cen', en: 'Centaurus', zh: '半人馬座', lines: [['Alp1 Cen', 'Bet Cen']] },
];

// 有名字的亮星（星空圖與 3D 上標名稱）
export const NAMED = [
  ['Alp CMa', 'Sirius', '天狼星'], ['Alp Car', 'Canopus', '老人星'], ['Alp1 Cen', 'Alpha Centauri', '南門二'],
  ['Alp Boo', 'Arcturus', '大角星'], ['Alp Lyr', 'Vega', '織女星'], ['Alp Aur', 'Capella', '五車二'],
  ['Bet Ori', 'Rigel', '參宿七'], ['Alp CMi', 'Procyon', '南河三'], ['Alp Ori', 'Betelgeuse', '參宿四'],
  ['Alp Aql', 'Altair', '牛郎星'], ['Alp Tau', 'Aldebaran', '畢宿五'], ['Alp Sco', 'Antares', '心宿二'],
  ['Alp Vir', 'Spica', '角宿一'], ['Bet Gem', 'Pollux', '北河三'], ['Alp PsA', 'Fomalhaut', '北落師門'],
  ['Alp Cyg', 'Deneb', '天津四'], ['Alp Leo', 'Regulus', '軒轅十四'], ['Alp UMi', 'Polaris', '北極星'],
  ['Alp Gem', 'Castor', '北河二'], ['Bet Leo', 'Denebola', '五帝座一'], ['Alp Hya', 'Alphard', '星宿一'],
  ['Eta Tau', 'Pleiades', '昴宿'],
];

// 中國星官（「中國星官」開關）：只畫幾個大家叫得出名字的，對照同一群星在西方屬於哪個星座
export const ASTERISMS = [
  { zh: '參宿', en: 'Shen (Orion)', lines: [['Alp Ori', 'Gam Ori', 'Bet Ori', 'Kap Ori', 'Alp Ori'], ['Del Ori', 'Eps Ori', 'Zet Ori']] },
  { zh: '心宿', en: 'Heart (Scorpius)', lines: [['Sig Sco', 'Alp Sco', 'Tau Sco']] },
  { zh: '北斗', en: 'Northern Dipper', lines: [['Eta UMa', 'Zet UMa', 'Eps UMa', 'Del UMa', 'Alp UMa', 'Bet UMa', 'Gam UMa', 'Del UMa']] },
  { zh: '南斗', en: 'Southern Dipper', lines: [['Zet Sgr', 'Tau Sgr', 'Sig Sgr', 'Phi Sgr', 'Lam Sgr', 'Mu Sgr']] },
  { zh: '織女', en: 'Weaver Girl', lines: [['Alp Lyr', 'Eps1 Lyr', 'Zet1 Lyr', 'Alp Lyr']] },
  { zh: '河鼓（牛郎）', en: 'Cowherd', lines: [['Bet Aql', 'Alp Aql', 'Gam Aql']] },
];

// 季節大三角（星空圖上的虛線）
export const TRIANGLES = [
  { en: 'Winter Triangle', zh: '冬季大三角', stars: ['Alp Ori', 'Alp CMa', 'Alp CMi'] },
  { en: 'Spring Triangle', zh: '春季大三角', stars: ['Alp Boo', 'Alp Vir', 'Bet Leo'] },
  { en: 'Summer Triangle', zh: '夏季大三角', stars: ['Alp Lyr', 'Alp Aql', 'Alp Cyg'] },
  { en: 'Great Square of Pegasus', zh: '秋季四邊形', stars: ['Alp Peg', 'Bet Peg', 'Alp And', 'Gam Peg'] },
];

/*
 * 太陽沿黃道經過各星座的邊界（J2000 黃經，度），由 IAU 1930 年星座邊界算出。
 * 例如黃經 173.85°–217.81° 是室女座：太陽約 9 月 16 日進室女、10 月 31 日才進天秤。
 */
export const ZODIAC_BOUNDS = [
  [28.687, 'Ari'], [53.417, 'Tau'], [90.140, 'Gem'], [118.256, 'Cnc'], [138.179, 'Leo'], [173.851, 'Vir'],
  [217.810, 'Lib'], [241.047, 'Sco'], [247.638, 'Oph'], [266.238, 'Sgr'], [299.656, 'Cap'], [327.488, 'Aqr'],
  [351.650, 'Psc'],
];
