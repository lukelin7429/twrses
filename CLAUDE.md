# twrses.org — 彰化縣人師教育協會 中文官網

人師教育協會**中文**官網（≠ 英文 Wix 站 mycultureconnect.org）。靜態站：`build.py` 讀 `data/*.json` → 產生 HTML 到 repo 根目錄。GitHub Pages，`BASE="/twrses"`，custom domain www.twrses.org。

---

## 🔴 鐵律（ALWAYS ON — 違反就是設計失敗）

### 1. 影片一律「當頁播放」，絕對禁止彈出 YouTube
- 點影片縮圖 = **在當頁開燈箱（lightbox）內嵌播放**，背景 dim、ESC／點背景／× 關閉、關閉時移除 iframe 停止播放。
- **嚴禁 `target="_blank"` 把人彈去 youtube.com 看影片。** 這是 Luke 最痛恨、講過很多次的事。
- 實作位置（不要拆掉）：
  - `assets/js/main.js` → `yt-lightbox`（攔截 `[data-yt]` 的 click，`preventDefault`，embed `https://www.youtube.com/embed/{id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`）
  - `assets/css/style.css` → `.yt-lightbox / .yt-backdrop / .yt-stage / .yt-frame / .yt-close`
  - `build.py` → `video_grid()` 與 `_mike_card()` 產生的卡片是 `<a href data-yt>`（href 只當 no-JS fallback，**不可加 target=_blank**）
- 唯一例外：頁面明確標示「前往 YouTube 頻道 →」的**頻道**連結（不是看單支影片），可外開。

### 2. 影片牆一定要有真實標題與基本資訊
- 不可只放縮圖＋「觀看影片」。每張卡片要有**真標題＋影片長度＋上傳日期**。
- 標題來源：`tools/fetch_video_meta.py`（yt-dlp 抓 title/duration/upload_date，冪等快取 `data/video_meta.json`，dead 影片標記後自動隱藏）。新增影片後跑一次再 build。
- 麥克爺爺頁 `/media/grandpa-mike/`（`build_grandpa_mike`）：解析「第 N 集 學校名」→ 集數徽章＋乾淨地點標題，按集數排序，特別篇另分組。

### 3. 中文用系統字、設計要有動感、白底
- 字型：`'PingFang TC','Apple LiGothic Medium','Microsoft JhengHei',sans-serif`。禁 Google Fonts 中文顯示字體。
- 捲動揭示 `.rvl`、hero orbs 等動效保留（`main.js` / `motion.css`）。

---

## Dom Jones 簡報庫（reusable slide-deck viewer）— 未來新增校訪簡報照這套走

`/media/dom-jones/slides/` 是可滑動瀏覽的 PPTX 簡報庫（swipe/方向鍵/點兩側切換），由 `assets/js/deck.js` + `assets/css/style.css` 的 `.deck-*` 系列驅動，`build.py` 的 `build_dom_jones_slides()` 產生頁面。

**新增一場學校訪問的簡報，流程：**
1. 用 LibreOffice + poppler 把 pptx 轉成編號 JPEG：`soffice --headless --convert-to pdf` → `pdftoppm -jpeg -jpegopt quality=82 -r 120`，輸出成 `media/dom-jones/slides/<slug>/01.jpg ... NN.jpg`。
2. 在 `data/dom-jones-slides.json` 的 `"schools"` 陣列加一筆 `{"slug", "group", "school", "date", "title", "count"}`（`group` 是給同一場訪問多份簡報分組、給影片牆 `#deck-<group>` 錨點用的 token）。
3. 重跑 `python3 build.py`，會自動產生該簡報的獨立頁＋更新簡報庫首頁的分組卡片。
4. 若某張投影片用到有浮水印／未授權的圖庫預覽圖（曾發生過 Vecteezy 浮水印），直接不收錄那份簡報，不要留在站上。

英文站 mycultureconnect.org 的 `dom-school-tour.html` / `dom-jones.html` 只放「查看簡報庫」的外連按鈕（連到 twrses.org），不重複存一份圖檔。

---

## 天文教育系列（/resources/classes/astronomy/）— 每課一個 3D 模型

- 內容：`data/astronomy.json`（`lessons[]` 一課一筆；`planned[]` 是系列首頁的「製作中」卡）。頁面由 `build.py` 的 `build_astro_hub()` / `build_astro_lesson()` 產生，reading／生字／小測驗沿用 `render_basic_unit()`。
- 3D 模型：three.js，**原始碼在 `tools/astro/src/`**，每課一個入口，打包成 `assets/js/<入口>.js`（產物，不要手改）：
  - `moon-phases.js`（第一課）、`eclipses.js`（第二課）、`seasons.js`（第三課）、`tides.js`（第四課）、`constellations.js`（第五課）、`north-star.js`（第六課）、`planets-lab.js`（第七課）、`sundial.js`（第八課）、`solar.js`（第九課）、`star-distance.js`（第十課）、`meteors-lab.js`（第十一課）、`star-colors.js`（第十二課）、`moon-face.js`（第十三課）；共用貼圖／著色在 `common.js`
  - 四課的地球都用**真實大陸**（`earthmap.js`）：Natural Earth 1:110m 陸地（公有領域，`world-atlas` 套件），打包時編進 JS。第二、三、四課的地軸傾斜與自轉照真實時間（第二課日食時月影落在正確地區，對照 2024/4/8、2027/8/2 食甚點誤差約 1–2°）；第一課仍是裝飾性自轉、不畫地軸
  - 第四課畫的是「平衡潮」（`ephem.js` 的 `equilibriumTide`），**不是潮汐表**：頁面一律提醒去中央氣象署查官方潮汐預報（潮間帶安全），不要加上「下一次滿潮幾點」這種讀數
  - `ephem.js`：Meeus 低精度星曆＋日月食預測（純函式）。改它之後一定要跑 `npm test`，對照 NASA 表確認 2019–2032 年日月食仍全數吻合
  ```
  cd tools/astro && npm install && npm run build && npm test   # three 與 esbuild 版本鎖在 package.json
  ```
- 課程資料的 `lab.kind` 決定用哪個模型（`phases`／`eclipses`／`seasons`／`tides`／`stars`／`northstar`／`planets`／`sundial`／`solar`／`distance`／`meteors`／`colors`／`moonface`）；第十三課多的欄位：`facts`（正面與背面卡）；第十二課多的欄位：`palette`（由紅到藍卡）；第十一課多的欄位：`showers`（八大流星雨卡）；第十課多的欄位：`neighbors`（由近到遠卡，`key` 對應 near-stars.js 的星）、`birthday`；第九課多的欄位：`bodies`（八大行星卡）、`scalecalc`；第八課多的欄位：`sd_keys`（四個關鍵日 chip）、`instruments`（太陽的時鐘卡，`mode` 可跳進模型）；第七課多的欄位：`wanderers`（五星卡）；第六課多的欄位：`dipper`（斗柄四季卡）、`places`（各地北極星高度表，`place` 可跳進模型）、`tonight.attr`；第五課多的欄位：`skies`（四季星空卡）、`tonight`、`culture_cards`（參商、七夕、四象、三垣＋同星兩名表）；`phases`、`keys`、`terms`、`moontides`、`words`、`types`、`upcoming`、`activities[]` 有就畫、沒有就略過。
- 第三課的日出日落、晝長、節氣在 `ephem.js`（`dayInfo`、`solarTermsOfYear`），`npm test` 也會跑 `test/seasons.test.mjs`（對照台北、雪梨的已知日出日落）。
- 第五課（`constellations.js`，`lab.kind = "stars"`）：外圈是**真實天球**——耶魯亮星星表 BSC5（公有領域，CDS V/50），亮於 5 等的 1,634 顆星，精簡成 `src/stars-data.js`（產物，`npm run stars` 重做；原始星表 1.6 MB 不進 repo，放 `~/Documents/twrses-bsc5/`，下載方法寫在 `scripts/build-stars.mjs` 檔頭）。
  - 星座連線、星名、中國星官、季節大三角是**本站自繪**，寫在 `src/figures.js`（用 BSC 名稱如 `'Alp Ori'`、`'Del1 Tau'` 指定星星，找不到會報錯）。**不要改用 Stellarium 的連線檔**：那是 CC BY-SA，會牽動整份資料的授權。頁面模型下方的出處行是 `lab.credit_html`，必須保留。
  - 星空計算在 `src/sky.js`（純函式）：J2000 → 黃道＋歲差；太陽在哪個星座用 IAU 邊界的黃經（`ZODIAC_BOUNDS`），所以 10/1 顯示室女座而不是運勢的天秤座——這是課文迷思段刻意教的。`test/stars.test.mjs` 有 assert：參宿四位置、太陽所在星座、參商一整年不同時高於 6°、每月早升約 2 小時。
  - 兩個視角的相機都跟著日地連線轉（夜側箭頭永遠指進畫面）；右側「今晚彰化的星空」是立體投影全天圖（北上東左），白天星星淡到 14% 並說明「星星還在」。頁面下方「今晚」清單當場算晚上九點的亮星、月亮、參商升落。不畫行星（第七課）。
  - 除錯：`document.querySelector('[data-star-lab]').__lab`（`setT(ms)`、`jumpSeason(0–3)`、`setView('orbit'|'night')`、`update()`）。
- 第六課（`north-star.js`，`lab.kind = "northstar"`）：一個機制——地軸指向北極星，**北極星高度＝緯度**。沿用第五課的星表、`figures.js`、`sky.js`（`handleDir` 斗柄方向、`starsUp` 幾顆星在地平線上）。
  - 兩個場景共用一個 renderer：「從太空看」是赤道座標（+Y＝地軸），相機固定在地球上跟著自轉，從地點的東邊正面看子午面，地點上的高度角與地心的緯度角並排（管狀線條、depthTest 關掉，永遠畫在地球上面）；「你的天空」是觀測者天球（+Y 天頂、-Z 北、+X 東），`tiltG` 用 makeBasis 依緯度傾斜、`spinSky.rotation.y = -地方恆星時`，相機從東邊側看。
  - 右側星圖面向北方（南半球自動改面向南方、標南十字），星軌是過去三小時、每 5 分鐘一點；拳頭量角尺從地平線量到天極。地點用**當地標準時間**（換地點保留當地鐘點）；「我的位置」只在瀏覽器裡算，不送出。
  - 「斗柄指四季」是中緯度黃昏的說法：北斗沒有七顆都在天上、或在北極圈內，就不顯示季節。測試（`stars.test.mjs`）：北極星高度≈緯度（四個緯度、每 3 小時）、彰化晚上八點 4/7/10/1 月斗柄東南西北、孔子時代北極星離天極約 14.5°、2100 年約 0.47°。
  - 除錯：`document.querySelector('[data-north-lab]').__lab`（`setPlace('changhua'|'singapore'|'tromso'|'pole'|'sydney')`、`setView('space'|'sphere')`、`jumpSeason(0–3)`）。
- 第七課（`planets-lab.js`，`lab.kind = "planets"`）：一個機制——地球從內圈超車較慢的行星，行星看起來在星空中倒退（逆行）。
  - 行星位置在 `src/planets.js`（純函式）：NASA/JPL〈Approximate Positions of the Planets〉表一軌道根數（Standish，1800–2050 年適用），亮度用 Meeus 第 41 章。`test/planets.test.mjs` 對照公開星曆的六段逆行起訖（2024–2027 年水金火木土，全部吻合到同一天）、火星衝的距離與亮度。**2050 年以後要換表二**。
  - 場景是真實比例（1 AU＝10 單位），星空當無限遠（行星在天上的位置＝從地球看的方向 × 天球半徑），所以路徑相對星星是對的。
  - 「編號視線」的 1–9 標在地球與行星的位置上、路徑圖上也標同樣 1–9；**不要標在視線遠端**：畫面裡的「牆」不夠遠，視差會把倒退的順序吃掉（實測：縮到 1.2 倍時木星看不出倒退）。
  - 右側路徑圖東在左（面向南方），時間窗依行星而定（`SPAN`：火星 ±110 天、土星 ±140 天…），太寬逆行圈會被壓扁。一打開時若有外行星正在逆行就選它。頁面下方「今晚的行星」與五星卡上的下一次逆行日期都在瀏覽器裡現算。
  - 除錯：`document.querySelector('[data-planet-lab]').__lab`（`setPlanet('mars', 跳到下次逆行?)`、`setT(ms)`、`setView('above'|'ride')`、`jumpRetro(±1)`）。
- 第八課（`sundial.js`，`lab.kind = "sundial"`）：一個機制——影子跟著太陽轉；晷針斜到指向北極星（彰化 24°），影子就一年到頭每小時 15°。日晷減時鐘＝均時差（`ephem.js` 的 `sunEquatorial().eotMin`）＋經度修正 `LON_MIN`（彰化 120.54°E → +2.16 分）。
  - `test/sundial.test.mjs`（assert）：均時差極值 11/3 +16.43、2/11 −14.21（對照公認值）、5/14、7/26；太陽正午時太陽方位剛好 180°；夏至正午高 89.4°、冬至影長 1.09 倍竿高。
  - 場景：彰化地面（+X 東、+Y 天頂、+Z 南），影子**解析計算**（不用陰影貼圖）。兩種儀器：立竿見影（竿影＋整點刻度＋冬夏至影端曲線＋「每天 12:00 的太陽」8 字形）與赤道式日晷（晷面垂直天軸；太陽在天赤道北邊看上面、南邊看下面，相機自動對準亮面；晷面由北側最低緣支撐，從南方看下面時不擋）。春秋分前後陽光擦過晷面，提示文字會說明。
  - 頁面下方「今天彰化的日晷」：日晷每個整點對應的時鐘時刻與一公尺竿影，瀏覽器現算。
  - 除錯：`document.querySelector('[data-sundial-lab]').__lab`（`setT(ms)`、`setMode('stick'|'dial')`、`jumpKey(0–3)`、`solarNoon()`）。背景面板 rAF 很慢時，相機轉場要很久才完成，直接設 `camera.position` 看最終構圖。
- 第九課（`solar.js`，`lab.kind = "solar"`）：一個機制——大小與距離不能同時照比例。軌道永遠真實比例（1 AU＝10 單位、今天的真實位置）；行星大小滑桿 10^0–10^3 倍，太陽最多 ×20（`SUN_MAX`，否則吞掉水星軌道，讀數照實寫）；真實大小時靠固定像素的「位置圓點」標出行星。「發出一道光」照真實光速（×60／600／6000）擴散，記錄到每顆行星（用今天的日心距離）的時間。
  - `planets.js` 補了天王星、海王星（JPL 表一）、`ALL_PLANETS`、`RADIUS_KM`、`AU_KM`、`LIGHT_S_PER_AU`；測試加了兩顆的衝（2025/11/21、9/23）、1 AU＝499.0 光秒、籃球比例（地球 2.2 mm、26 m；海王星 776 m）。
  - 頁面下方比例模型計算器（`data-scale-calc`，選太陽大小 → 每顆行星的大小、日常物品對照、距離與步行時間），以及航海家一號一光日倒數（NASA：2026/11/18 06:16 UTC，`VOYAGER_LIGHT_DAY`；過了之後文字自動改成「已到達」）。
  - 除錯：`document.querySelector('[data-solar-lab]').__lab`（`setView('inner'|'jupiter'|'all')`、`setLight(AU)`、`setPlaying(true)`）。
- 第十課（`star-distance.js`，`lab.kind = "distance"`）：一個機制——視差。地球半年後到軌道另一邊，近星在遠方星空前換了位置，越遠換得越少。
  - **距離資料：Hipparcos 新版歸算**（van Leeuwen 2007，CDS I/311）。ESA 的 Hipparcos 與 Gaia 現在都是 **CC BY-NC 3.0 IGO**（不是 BY-SA），必須標「Credit: ESA」——頁面出處行 `lab.credit_html` 要保留。選 Hipparcos 不選 Gaia：Gaia 對天狼星、織女星這類極亮星會飽和。南門二 A／B 在 Hipparcos 裡互相矛盾（4.32 與 4.09 光年），改用 Kervella et al. 2016 的 747.17 ± 0.61 mas、畫成一顆。
  - `src/near-stars.js` 是產物（`npm run near`，`scripts/build-near.mjs`）：原始星表 hip2.dat 不進 repo，放 `~/Documents/twrses-hip2/`（下載方法寫在腳本檔頭）；同時比對 BSC5 補上拜耳名。收錄：20 光年內全部、100 光年內亮於 6 等、更遠但亮於 3 等，共 582 顆。俗名與中文名在腳本的 `NAMES`（以 HIP 編號為鍵，key 給 `data-lab-star` 用）。
  - 計算在 `src/distance.js`（純函式）：視差→光年、誤差範圍、視差橢圓（`parallaxShift`，用 planets.js 的地球位置）、光出發年份與中國朝代（`eraOf`，天文年號，沒有西元 0 年；1912 起寫民國）、生日星。`test/distance.test.mjs`（assert）：比鄰星 4.24、南門二 4.37、天狼星 8.6、織女星 25.0、牛郎星 16.7、天鵝座 61 約 11.4 光年；牛郎織女相距 14.6 光年；比鄰星視差＝5.3 公里外的一元硬幣；參宿四的光（含誤差範圍）出發於明朝；黃道極的星畫圓、黃道上的星畫線。
  - 兩個場景共用一個 renderer：「視差」（1 AU＝10 單位，恆星距離一律縮小 67,000 倍，`SHRINK`）與「鄰居」20／100／2,000 光年（1 單位＝1 光年，著色器 `uMax` 只畫範圍內的星，橘線是距離誤差）。右側望遠鏡畫面用真實視差、每顆星同一個放大倍率。誤差大於 4% 的星，距離與出發年份都寫範圍。
  - 標籤每一格只改「這一格顯示」與「上一格顯示、這一格不顯示」的（`beginLabels`／`endLabels`）：先全部設 0 再設 1 的話，讀 clientWidth 會強制重算樣式，透明度過場每格從 0 重來，標籤就看不見。class 前綴用 `dl-`（`sd-` 是第八課日晷的）。視線要延伸到很遠的背景星空：切成多段（`SIGHT_N`），相機也退到星的反方向——否則延伸端跑到相機背後時，配上對數深度緩衝整條線會消失（第一次上線時天鵝座 61 就這樣）。
  - 頁面下方：由近到遠八顆星卡（`neighbors`，光出發年份 `data-depart` 現算）、「星光時光機」今晚九點彰化亮星由近到遠（`data-starlight`）、生日星（`birthday`，`data-birthday`，只列彰化看得到、赤緯 > −50° 的星）。
  - 除錯：`document.querySelector('[data-distance-lab]').__lab`（`setStar('proxima'|'acen'|'sirius'|'61cyg'|'altair'|'vega'|'betelgeuse'|'deneb')`、`setView('parallax'|'20'|'100'|'2000')`、`setT(ms)`、`goCam(true)` 直接到最終構圖、`render()`）。瀏覽器面板隱藏時 IntersectionObserver 不觸發：點頁面上的「看它的視差」按鈕會直接啟動模型；或用無頭 Chrome 截圖（WebGL 正常）。
- 第十一課（`meteors-lab.js`，`lab.kind = "meteors"`）：一個機制——彗星沿軌道留下碎屑帶，地球每年在軌道同一點穿過，碎屑燒掉就是流星雨（同一天回來）。右側 2D 星圖講輻射點（透視）。
  - 資料：IMO〈Working List of Visual Meteor Showers〉（`https://www.imo.net/ShCal27s.pdf`，2027 行事曆、2026 年 6 月資料；IMO 網站整修中，其他網址被擋）的極大期 λ☉（J2000）、輻射點、速度、ZHR；母天體軌道根數：JPL SBDB（`sbdb.api?sstr=…&full-prec=1`）。都寫在 `src/meteors.js` 的 `SHOWERS`、`PARENTS`（八個主要流星雨）。
  - 極大時刻＝太陽 J2000 黃經到達 λ☉（`solarLonTime`，用 ephem.js 的 sunPos 減 sky.js 的歲差）。`test/meteors.test.mjs`（assert）：對照 IMO 2027 文中寫的極大時刻（象限儀座、天琴座、英仙座、獅子座、雙子座、小熊座，差 1.5 小時內；寶瓶座η 表列 λ 只到 0.5°，不比）、2026 英仙座新月／2027 雙子座滿月、母天體軌道離極大時的地球都在 0.2 AU 內、英仙／獅子／小熊座的交點對到地球位置。
  - 3D：1 AU＝10 單位，母天體軌道外段截在 6 AU（`nuRange`）；碎屑帶寬度依「母天體軌道離極大時地球多遠」放大（哈雷彗星的碎屑帶已經偏離現在的軌道約 0.07–0.16 AU），沿軌道照 1/r² 流動（逆行彗星流向和地球相反＝迎面撞來、速度快）。極大前後（高斯，σ 1.6 天）地球旁畫從輻射點方向打進來的短線。
  - 右側全天星圖（北上東左，立體投影）：極大夜彰化的星、星座連線（輻射點所在星座加亮）、月亮、從輻射點沿大圓射出的流星；時刻可選最佳（`nightOf`：太陽低於 −12° 時輻射點最高）、9 p.m.、午夜、4 a.m.。月光判斷（`verdict`）同時看最佳時刻與兩小時前的月亮。
  - 頁面下方：八大流星雨卡（`showers`，下一次極大 `data-next-peak` 現算）、「接下來彰化的流星雨」表（`data-meteor-list`）。
  - 除錯：`document.querySelector('[data-meteor-lab]').__lab`（`setShower('qua'|'lyr'|'eta'|'per'|'ori'|'leo'|'gem'|'urs')`、`setT(ms)`、`setView('whole'|'earth')`、`goCam()`、`render()`）。
- 第十二課（`star-colors.js`，`lab.kind = "colors"`）：一個機制——顏色＝表面溫度（紅冷藍熱，太陽在中間）。
  - 計算在 `src/starcolor.js`（純函式）：黑體顏色 `bbColor(T)`＝Planck 光譜 × CIE 1931 配色函數（Wyman 等 2013 的多段高斯公式）→ sRGB（最亮一色調到 255、超出色域往白拉）；B−V → 溫度用 Ballesteros 2012 公式；維恩峰值、光譜型 OBAFGKM、顏色名稱。名星溫度 `TEMPS` 是文獻常用值（取到百位），鍵和 near-stars.js 的 `NEAR_NAMED` 一樣。`test/starcolor.test.mjs`（assert）：對照 Charity 黑體色表（1000／3000／4000／10000 K）、太陽近白、紅冷藍熱單調、太陽峰值 502 nm（綠）、B−V 0.65 → 5,778 K、Hipparcos B−V 換算溫度與文獻差 12% 內（參宿四是變星，B−V 1.5–1.85）。
  - 兩個視角：「加熱一顆星」（溫度滑桿 2,000–30,000 K 對數刻度，滑桿底色就是各溫度的顏色；旁邊一顆太陽對照）與「星星排排站」（第十課的 582 顆 Hipparcos 星＋太陽，從天上的方向（距離取對數壓縮）用著色器 `mixv` 飛進赫羅圖：橫軸 B−V、縱軸絕對星等，熱的先動）。右側是 Planck 曲線（各自以峰值為準，太陽虛線對照）與可見光彩虹。
  - 頁面下方：由紅到藍八顆星卡（`palette`，色塊 `data-swatch` 用同一個 bbColor 上色）、今晚九點彰化亮星由冷到熱（`data-starcolors`）。
  - 除錯：`document.querySelector('[data-color-lab]').__lab`（`setStar(key)`、`setTemp(K)`、`setView('heat'|'sort')`、`setSorted(true)`、`finish()` 直接跳到動畫終點、`render()`）。
- 第十三課（`moon-face.js`，`lab.kind = "moonface"`）：一個機制——同步自轉（繞地球一圈＝自轉一圈＝27.32 天），潮汐把月亮的自轉煞到同步。
  - 天平動在 `src/libration.js`（純函式）：Meeus 第 53 章光學天平動（不含 < 0.04° 的物理天平動），`diskToSeleno` 是正射投影反算。`test/libration.test.mjs`（assert）：Meeus 例題 53.a（l −1.206°、b +4.194°）、2020–2029 範圍 ±8.0°／±6.8°、月面撒點算出十年內 58% 曾面向地球（課本 59% 另含周日天平動）、經度天平動週期＝近點月 27.55 天。
  - 3D：兩個 renderer（同第一課）。月亮 tiltG（自轉軸對軌道面斜 6.68°，空間中固定）⊃ spinG（自轉）⊃ 月球＋紅色正面箭頭；軌道照克卜勒方程式（偏心率 0.055）。自轉三種：真實 `M + π`（等速，所以箭頭在地月連線兩旁擺動＝天平動）、不自轉、轉太快（2M）；「放大搖晃 3 倍」把偏心率和傾角乘 3。月面貼圖 `makeMoonTexture`（近地面中心在 +X、東經在右）；從地球看用 `skyMoonMaterial`，地球照調到 0.1 才看得出同一張臉；第 0 天接近滿月。
  - 頁面下方「今天的月亮怎麼搖」：用同一張月面貼圖逐像素正射投影畫出今天真實的月相＋天平動，加一個月的天平動路徑（斜橢圓）與東西緣、南北極最佳日。卡片 `facts`（按鈕 `data-lab-mode`）。
  - 畫布尺寸要同時比對 width 與 height：預設是 300×150，寬度剛好算出 300 時只比 width 會跳過設定高度，圖被拉長（第十到十三課都修了）。
  - 除錯：`document.querySelector('[data-moonface-lab]').__lab`（`setMode('locked'|'nospin'|'fast')`、`setT(天)`、`render()`）。
- 第二課的「即將到來的日月食」清單是**瀏覽器當場算的**，永遠不會過期；台灣可見與否以彰化（24.08N, 120.54E）為準。
- 系列首頁用 `.lc-list`／`.lc-row` 橫向課程卡（`assets/css/lesson-cards.css`，`_lc_head()` 載入；天文教育與中醫養生首頁共用，桌機兩欄、手機一欄）。**不要改回 `.pm-cards`**：那套四欄窄卡配上 `.tp-card-h`（中文字型＋加寬字距）會把英文長標題切成四、五行，Luke 看過嫌難讀（2026-09-30）。
- `assets/css/astro.css` 與模型 JS 只載在天文頁（`_astro_head()`，版本號另算，不影響全站快取）。
- 模型座標約定寫在 `tools/astro/src/moon-phases.js` 檔頭——改之前先讀，北半球「漸盈右邊亮」就是靠它。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/astronomy/<slug>` → `./tools/upload_audio.sh`，manifest 命名 `astronomy-<slug>`。

---

## 人體探索系列（/resources/classes/human-body/）— 完全照天文教育的架構

- 內容：`data/human-body.json`（欄位同 astronomy.json：`lessons[]`、`lab.kind`、`paras/paras_zh`、`vocab`、`quiz`、`myths`、`tricks`、`activities[]`、`planned[]`）。人體多的欄位：`jobs`（五大功能卡）、`counts`（骨頭數一數）、`measure`（親身測量）、`culture`（中文怎麼說，只談用語與文化，**不做療效說法**）、`health_en/zh`（每課必備的健康免責聲明）。
- 頁面：`build.py` 的 `build_body_hub()` / `build_body_lesson()`；reading、迷思、口訣、活動沿用天文的 `render_basic_unit()`、`_sci_myths()`、`_sci_tricks()`、`_astro_activity()`。首頁同樣用 `.lc-row` 橫向課程卡（`_lc_head()`）。
- 樣式：共用 `assets/css/astro.css`（3D 面板、迷思、口訣、活動），人體專屬的在 `assets/css/body.css`；`_body_head()` 載入，只在本系列頁面。
- 3D：**原始碼在 `tools/body/src/`**，每課一個入口，打包到 `assets/js/<入口>.js`（產物，不要手改）；`lab.kind` → bundle 對照在 `build.py` 的 `_BODY_JS`。
  ```
  cd tools/body && npm install && npm run build && npm test
  ```
- 第一課骨架是**真實解剖資料**：BodyParts3D 4.0（日本 DBCLS），**CC BY 4.0**（2025-02-27 官網改的；OBJ 檔頭還寫舊的 CC BY-SA 2.1 JP，以官網授權頁為準）。頁面模型下方必須保留出處行（`lab.credit_html`），glb 的 `asset.copyright` 也寫了。
  - 骨頭清單的唯一來源是 `tools/body/src/bones.js`（id、BodyParts3D 名稱、英中名稱、俗名、區域）。BodyParts3D 沒有尾骨與六塊聽小骨，所以模型是 **199 塊**；頁面文字講 206 塊，並註明缺哪幾塊。
  - 重做模型：原始資料 62 MB 不進 repo，放 `~/Documents/twrses-bp3d/`（下載方法寫在 `tools/body/scripts/build-skeleton.mjs` 檔頭），`npm run model` → `assets/models/skeleton.glb`（meshopt 壓縮，約 1 MB）。
  - 「保護」模式的腦、心、肺、脊髓是程式畫的**示意形狀**（BodyParts3D 的器官資料是破碎的血管與腦回），圖例有註明。
- 第二課手臂（`arm.js`，`lab.kind = "arm"`）：**沿用 skeleton.glb**，只把右臂實心顯示；前臂＋右手掛在手肘 pivot 上旋轉。二頭肌、三頭肌是程式畫的示意管子（肌腹長度只算中段，肌腱不伸縮），拉力用前臂槓桿算（前臂約 1.6 kg）。三種動作：舉起（二頭肌縮短）、慢慢放下（二頭肌煞車、變長）、推出（三頭肌縮短）——「放下重物是二頭肌在煞車」是刻意教的觀念，不要改成三頭肌。除錯 `__lab.setBend(角度, 'lift'|'lower'|'push'|'hold')`、`setLoad(kg)`、`render()`。
- 第三課心臟（`heart.js`，`lab.kind = "heart"`）：**全部自繪示意**。畫法是「面對一個人」：病人的右邊在畫面左邊（頁面上有一行提示，不要翻）。缺氧的血用**暗紅紫**不用藍色（課文迷思段在教「血不是藍的」）。血球每段的流速依心跳週期分配、每跳前進量相同，所以不會堆積；一圈約 8 下心跳（真實約一分鐘，scale 說明有寫）。量脈搏＝15 秒點按 ×4；數字以成人每跳 70 mL 計。心跳聲用 WebAudio 合成、預設關閉。除錯 `__lab.run(秒)`、`render()`、`focusChamber('ra'|'rv'|'la'|'lv')`。
- 第四課肺（`lungs.js`，`lab.kind = "lungs"`）：**胸廓用 skeleton.glb 的真實肋骨、胸骨、胸椎**（肋骨繞後端轉＝提把動作），肺、橫膈膜、支氣管樹、心臟是自繪。一個呼吸量 b（0 吐完～1 吸滿）同時驅動肺大小（往下長 9%）、橫膈膜（頂端跟著肺底、壓平）、肋骨、氣流粒子。支氣管樹是「在肺裡撒末端點、從隆凸二分長過去」的填空樹（固定亂數種子，每次一樣）。「按住吸氣」讓模型跟著使用者即時呼吸；數呼吸＝30 秒 ×2。肺泡小窗是 2D canvas。除錯 `__lab.setB(0–1)`、`run(秒)`、`render()`、`state.holding = true`。
- 第五課關節（`joints.js`，`lab.kind = "joints"`）：**整副真實骨架**，右側肢體掛在巢狀 pivot 上（肩 ⊃ 肘 ⊃ 拇指、髖 ⊃ 膝、頸椎一節套一節 ⊃ 頭顱）；換關節時其他關節回原位。轉向約定：繞 X 負角＝往前（髖、肩、肘屈曲），膝屈曲為正；繞 Z 負角＝右側往外。轉頭 65% 在寰樞關節、其餘分給 C2–C7。活動範圍是成人教科書值（`INFO` 裡），扇形／圓錐在原位時預先算好。除錯 `__lab.set('hip', {flex: 70, abd: 20})`、`drawCircle()`、`run(秒)`、`render()`。
- 第六課消化（`digestion.js`，`lab.kind = "digestion"`）：骨架淡淡當定位，消化器官自繪、用骨頭定位（食道在脊椎前、胃在 T11 左下、小腸在 L1 到骨盆頂之間）。時間軸**非線性**：各站分到固定比例（`STAGES` 的 share），嘴 1 分鐘、食道 10 秒、胃 2–4 h、小腸 3–5 h、大腸約 1 天＋；「我的午餐現在在哪」用今天的午餐時間到現在的真實時間（還沒到就算昨天）。站名與說明在 `lab.stops`（以 data-stops 傳給 JS）。除錯 `__lab.setHours(h)`、`whereNow()`、`render()`。
- 第七課大腦（`nerves.js`，`lab.kind = "nerves"`）：骨架淡淡定位，大腦兩半球依功能區上色（頂點色，`REGIONS`），脊髓、四肢神經、視神經自繪。四個情境（接尺、燙鍋子反射、膝跳反射、動腳趾）的毫秒時程在 `build()`，步驟文字在 `lab.scenarios`（data-scen）；慢動作 SLOW=40（畫面 1 秒＝真實 25 ms）。**反應測驗是獨立的 2D（`initReaction`），不需要 WebGL**；用 MutationObserver 才測得到（背景面板計時器被節流）。除錯 `__lab.choose('hot')`、`runMs(ms)`、`render()`。
- 第八課眼睛（`eyes.js`，`lab.kind = "eyes"`）：頭骨淡淡定位（其他骨頭隱藏），左眼**放大 5 倍、剖開鼻側那一半**（剖面在 x = 0，鏡頭從左邊看進去），疊在左眼窩上；右眼是實際大小對照。眼睛座標 1 單位＝1 mm（`eyeG` 縮放 0.005）。光學是**示意、誇大**的薄透鏡：焦距公式與近視 −4／遠視 +4、眼鏡度數＝誤差（G = E，近視凹透鏡）寫在檔頭；近視／遠視只拉長或壓短眼球後半段（`deformZ`）。視神經盤＝盲點：外側 15.5° 紅點的主光線打到視網膜的位置（自動算，眼球變形也跟著動）。右欄兩個 2D 畫面：視網膜上（轉 180°）、你看到的；模糊用「縮小再放大」做（舊 Safari 沒有 ctx.filter）。**盲點測驗卡是 2D（`initBlindCard`），不需要 WebGL**；預設測左眼（遮右眼、圓點在左），可換眼睛、改成斷掉的線、量距離算角度。除錯 `__lab.setObj('far'|'near'|'close')`、`setEye('normal'|'near'|'far')`、`setGlasses(true)`、`setBlind(true)`、`setLight(0–1)`、`run(秒)`、`render()`。
- 第二批（第五～八課）已全部完成，`planned[]` 目前是空的；要加新課就在 `planned[]` 放一筆，系列首頁會顯示「製作中」。
- 網站 `html` 有 smooth scroll：在背景的瀏覽器面板裡捲動會慢好幾秒，截圖前先設 `document.documentElement.style.scrollBehavior='auto'`。
- 第二課起的共用工具在 `tools/body/src/common.js`（`loadBones`、`labeler`、`lazyBoot`）；卡片上的「在模型中看」按鈕用 `data-lab-<動作>="值"`。
  - 除錯：`document.querySelector('[data-skeleton-lab]').__lab`（`goJob`、`goRegion`、`setApart`、`startCount`、`stepCount(i)`、`render()`）。背景分頁 rAF 會降到每秒一兩格，截圖前用 `stepCount` 直接跳步。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/human-body/<slug>` → `./tools/upload_audio.sh`，manifest 命名 `human-body-<slug>`。
- 課程規劃在 Obsidian：`第二大腦/創作庫/人體探索課程規劃（twrses）.md`（第二～四課：肌肉、血液、呼吸，用示意模型）。

---

## 萬物原理 How Things Work（/resources/classes/how-things-work/）— 課程頁照天文、首頁照中醫分單元

- 內容：`data/how-things-work.json`：`units[]`（五個單元）底下 `lessons[]`（做好的課）與 `planned[]`（「製作中」卡，做一課就從 planned 移到 lessons）。課次 `n` 全系列連號（1–20）。每課欄位同 astronomy.json，多的：`parts`（電池四個部分卡，`data-lab-part`）、`safety`（安全提醒，排在活動之前）、`sources`（資料出處，頁面最下方列出；**數字一定要先查證再寫**）。
- 頁面：`build.py` 的 `build_htw_hub()`（單元導覽＋`.lc-row` 橫向課程卡，`_lc_head()`）/ `build_htw_lesson()`；reading、迷思、口訣、活動沿用 `render_basic_unit()`、`_sci_myths()`、`_sci_tricks()`、`_astro_activity()`。
- 樣式：共用 `assets/css/astro.css`，本系列專屬的在 `assets/css/science.css`；`_htw_head()` 只在本系列頁面載入。
- 3D：**原始碼在 `tools/science/src/`**，每課一個入口，打包到 `assets/js/<入口>.js`（產物，不要手改）；`lab.kind` → bundle 對照在 `build.py` 的 `_HTW_JS`。共用的 `labeler`、`lazyBoot` 在 `tools/science/src/common.js`（從 tools/body 抄來，免得把骨架資料打包進來）。
  ```
  cd tools/science && npm install && npm run build && npm test
  ```
- 第一課電池（`battery.js`，`lab.kind = "battery"`）：鋰離子電池剖面，**全部自繪示意**。一個機制：電解液讓鋰離子過、擋住電子，電子只能繞外面的電線。兩邊電極各 70 格（5 層 × 7 × 2），鋰的總數 70；每顆離子穿過電解液的同時，電線裡（本來就塞滿的）電子剛好挪一格——所以「裡面跨過的離子＝外面繞過的電子」計數永遠相等。老化：`cycles` 越多，越多鋰困在石墨表面的 SEI（灰色），容量依 Apple「500 次完整循環後 80%」畫成直線。電量、電壓、容量的純函式在 `src/cell.js`，`npm test` 跑 `test/battery.test.mjs`（4.2 V／3.0 V、500 循環 80%、放電再充滿離子數＝電子數）。
  - CatmullRom 的 `getPointAt` 參數要夾在 0–1：`MathUtils.smootherstep` 在 t≈1 會算出 1.0000000000000002，曲線就當掉（`ease()`）。
  - 除錯：`document.querySelector('[data-battery-lab]').__lab`（`setMode('use'|'charge'|'off')`、`setSoc(0–100)`、`setCycles(0–750)`、`focus('anode'|'cathode'|'electrolyte'|'separator')`、`run(秒)`、`render()`）。
- 第二課發電機（`generator.js`，`lab.kind = "generator"`）：一個機制——磁鐵**轉動**經過線圈才推得動電子，N、S 極輪流經過所以是交流電。轉軸沿 X 軸：左邊是推動者（手搖、蒸汽／燃氣渦輪、水車、風機，`data-drive`），中間磁鐵＋上下線圈，右邊房子裡的燈泡；電壓 ∝ 轉速 × sin θ（純函式在 `src/grid.js`，`test/generator.test.mjs`：不轉＝0、60 Hz 每秒換向 120 次、兩極 3,600 rpm、轉速加倍功率四倍）。電線裡的電子**原地來回晃**（位移 ∝ −cos θ，振幅與轉速無關），不要改成繞圈跑。右側示波器是 2D canvas，**要絕對定位**（否則 canvas 的像素寬度會變成 grid 的最小寬度，把手機版撐爆）。「按住搖動」用 pointer capture，頁面捲動時不會被當成放手。
  - 頁面多的段落：`mix`（2025 台灣發電結構長條圖，能源署數字；換新年度時改這裡）、`plants`（六種發電方式卡，`drive` 可跳進模型；太陽能沒有 drive）。
  - 除錯：`document.querySelector('[data-generator-lab]').__lab`（`setDrive('crank'|'steam'|'water'|'wind')`、`setSpeed(0–2)`、`state.cranking = true`、`run(秒)`、`render()`）。
- 第三課太陽能電池（`solar-cell.js`，`lab.kind = "solar"`，`data-solarcell-lab`）：一個機制——光子把矽裡的電子敲出來，兩層矽交界的內建電場把電子往上、電洞往下推，電子只能繞電線回去。光子分紅外線／紅／綠／藍（`src/pv.js`：能隙 1.1 eV，紅外線穿過；每個電子只帶走約 0.6 eV，其餘變成熱；藍光吸收淺、紅光深），能量去向長條是**算出來的**，陽光下約 20%（`test/solar.test.mjs` 檢查落在 15–25%）。切換光色或「重新計算」會換 `gen`，還在路上的舊光子、舊電子不算進新統計。窄螢幕自動換短標籤。
  - **撞名教訓（2026-10-01）**：天文第九課已經有 `assets/js/solar.js`、`solar_svg()`、`render_solar_lab()`、`data-solar-lab`。本系列一律用 `solar-cell` / `solarpanel_svg` / `render_solarcell_lab` / `data-solarcell-lab`。新增 bundle、函式、`data-*-lab` 前先 `ls assets/js`、`grep -n "^def 名稱" build.py` 確認沒人用過；build 後 `git status` 若出現別的系列頁面被改，就是撞名了。
  - 除錯：`document.querySelector('[data-solarcell-lab]').__lab`（`setLight('sun'|'red'|'blue'|'ir')`、`setWeather('sunny'|'cloudy'|'night')`、`focus('n'|'p'|'junction'|'fingers'|'back')`、`run(秒)`、`render()`）。
- 第四課風機（`wind-turbine.js`，`lab.kind = "wind"`，`data-windturbine-lab`）：一個機制——葉片靠升力轉，直驅帶動一圈磁鐵經過線圈；功率跟風速三次方成正比。比例照大彰化 1、2a 的 SG 8.0-167 DD（8 MW、轉子 167 m、最快約 10.3 rpm）；`src/windcalc.js`：Cp 中低風速 0.45、接近滿載下降，約 12.7 m/s 滿載、25 m/s 以上順槳停機；`test/wind.test.mjs` 檢查掃風面積 21,904 m²、八倍、Cp 低於貝茲 59.3%、葉尖約 324 km/h。轉子用**真實轉速**，風的粒子是放慢的示意；穿過轉子的風會變慢（wake）。地圖北 +Z、東 −X；東北／西南季風會讓機艙偏航。風速滑桿 0–40 m/s（中央氣象署：17.2 輕颱、32.7 中颱、51.0 強颱）。
  - 頁面多的段落：`facts`（數字卡：台灣離岸風電 500 座、4.8 GW、2025 破 100 億度、4C Offshore 16/20、大彰化 111 座）；卡片 `parts` 可用 `speed` 跳到某個風速。
  - 除錯：`document.querySelector('[data-windturbine-lab]').__lab`（`setSpeed(m/s)`、`setWind('ne'|'sw')`、`lookInside()`、`run(秒)`、`render()`）。
- 多個 session 同時改 build.py 時，本系列改在 scratchpad 的 git worktree（從 origin/main 開分支）做，`audio` 用 symlink 指到 `~/Documents/twrses/audio`（symlink 不會被 .gitignore 的 `audio/` 擋，**不要 add**），做完 rebase 再 `git push origin HEAD:main`。
- 瀏覽器面板在背景時 `visibilityState` 是 hidden，IntersectionObserver 不觸發、截圖是空白：點一下頁面上的「在模型中看」按鈕就會直接初始化，截圖改用無頭 Chrome（playwright-core＋本機 Chrome，`--use-angle=swiftshader`）。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/how-things-work/<slug>` → `./tools/upload_audio.sh`，manifest 命名 `how-things-work-<slug>`。檢查線上 200 要帶瀏覽器 UA（Python 預設 UA 會被 r2.dev 擋成 403）。
- 課程規劃在 Obsidian：`第二大腦/創作庫/萬物原理科普課程規劃（twrses）.md`。

---

## Build / Deploy
```
python3 build.py        # BASE=/twrses → 服務於 lukelin7429.github.io/twrses/ 或 www.twrses.org
```
- 本機預覽：因 `BASE=/twrses`，需在 repo 內建 self-symlink `ln -sfn . twrses`，再開 http server 連 `/twrses/...`。**這個 symlink 不要 commit**（git 應忽略）。
- 音檔／PDF 走 GitHub Release（各級別 `<level>-audio` / `<level>-pdf`）。

詳細專案脈絡見使用者 memory：`mcc-chinese-twrses-migration`、`feedback_video_inline_never_popout`、`grandpa-mike-memorial`。
