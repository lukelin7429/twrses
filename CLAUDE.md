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
  - `moon-phases.js`（第一課）、`eclipses.js`（第二課）、`seasons.js`（第三課）、`tides.js`（第四課）、`constellations.js`（第五課）、`north-star.js`（第六課）、`planets-lab.js`（第七課）、`sundial.js`（第八課）、`solar.js`（第九課）、`star-distance.js`（第十課）、`meteors-lab.js`（第十一課）、`star-colors.js`（第十二課）、`moon-face.js`（第十三課）、`milky-way.js`（第十四課）、`moon-illusion.js`（第十五課）、`sunrise-lab.js`（第十六課）；共用貼圖／著色在 `common.js`
  - 四課的地球都用**真實大陸**（`earthmap.js`）：Natural Earth 1:110m 陸地（公有領域，`world-atlas` 套件），打包時編進 JS。第二、三、四課的地軸傾斜與自轉照真實時間（第二課日食時月影落在正確地區，對照 2024/4/8、2027/8/2 食甚點誤差約 1–2°）；第一課仍是裝飾性自轉、不畫地軸
  - 第四課畫的是「平衡潮」（`ephem.js` 的 `equilibriumTide`），**不是潮汐表**：頁面一律提醒去中央氣象署查官方潮汐預報（潮間帶安全），不要加上「下一次滿潮幾點」這種讀數
  - `ephem.js`：Meeus 低精度星曆＋日月食預測（純函式）。改它之後一定要跑 `npm test`，對照 NASA 表確認 2019–2032 年日月食仍全數吻合
  ```
  cd tools/astro && npm install && npm run build && npm test   # three 與 esbuild 版本鎖在 package.json
  ```
- 課程資料的 `lab.kind` 決定用哪個模型（`phases`／`eclipses`／`seasons`／`tides`／`stars`／`northstar`／`planets`／`sundial`／`solar`／`distance`／`meteors`／`colors`／`moonface`／`milkyway`／`illusion`／`sunrise`）；第十六課多的欄位：`points`（四個日出點卡，`off`＝東偏北幾度、按鈕 `data-lab-day`）、`culture_cards.eyebrow`（文化段的小標，沒有就用「東西方的星空」）；第十五課多的欄位：`views`（四種看法卡）；第十四課多的欄位：`galaxy`（我們的星系卡）；第十三課多的欄位：`facts`（正面與背面卡）；第十二課多的欄位：`palette`（由紅到藍卡）；第十一課多的欄位：`showers`（八大流星雨卡）；第十課多的欄位：`neighbors`（由近到遠卡，`key` 對應 near-stars.js 的星）、`birthday`；第九課多的欄位：`bodies`（八大行星卡）、`scalecalc`；第八課多的欄位：`sd_keys`（四個關鍵日 chip）、`instruments`（太陽的時鐘卡，`mode` 可跳進模型）；第七課多的欄位：`wanderers`（五星卡）；第六課多的欄位：`dipper`（斗柄四季卡）、`places`（各地北極星高度表，`place` 可跳進模型）、`tonight.attr`；第五課多的欄位：`skies`（四季星空卡）、`tonight`、`culture_cards`（參商、七夕、四象、三垣＋同星兩名表）；`phases`、`keys`、`terms`、`moontides`、`words`、`types`、`upcoming`、`activities[]` 有就畫、沒有就略過。
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
- 第十四課（`milky-way.js`，`lab.kind = "milkyway"`）：一個機制——我們住在扁平星系盤「裡面」，順著盤面看出去就是一條光帶。
  - 銀道座標在 `src/galaxy.js`（純函式，IAU J2000 定義：銀河北極 RA 192.85948°、Dec +27.12825°，天北極銀經 122.93192°）；`milkyWayAt(date, site)` 回傳銀心高度、光帶經過的星座（`PLANE_CONS` 依銀經粗分）。`test/galaxy.test.mjs`（assert）：銀心 RA 266.405°／Dec −28.936°、織女／牛郎／天津四／參宿四的銀經銀緯、來回換算、牛郎織女分在銀河兩岸、彰化 2026/10/1 21:00 的銀河、晚上九點看得到銀心的月份＝6–9 月。
  - 3D：程序生成的棒旋星系（**示意圖，不是星圖**，固定亂數種子）：1 單位＝1,000 光年，太陽在 (26.7, 0, 0)，Y＝銀河北極；從太陽看銀經 l、銀緯 b 的方向＝(−cos b cos l, sin b, cos b sin l)（右手系，從北極看順時針轉，旋臂拖曳）。三個視角：從外面看、側面看、從太陽看（相機在太陽上，外圈疊真實 BSC 亮星與方向標籤：人馬座、天鵝座、牛郎織女…）。
  - 右側：彰化全天星圖，銀河光帶用 9,000 個依銀道座標取樣的點畫（往銀心較亮、銀緯較厚，天鵝到天鷹有大裂縫），可切換今晚九點／現在／七月。頁面下方「今晚彰化的銀河」與 12 個月晚上九點銀心高度長條圖（`data-milkyway`）；卡片 `galaxy`（按鈕 `data-lab-view`）。
  - 除錯：`document.querySelector('[data-milkyway-lab]').__lab`（`setView('outside'|'edge'|'inside', true)`、`render()`、`drawSky()`）。
- 第十五課（`moon-illusion.js`，`lab.kind = "illusion"`）：一個機制——月亮錯覺在大腦，不在天上：月亮永遠約 0.5°，剛升起時離你還多了將近一個地球半徑、反而小約 1.5%。真正會變的是地月距離（超級／微型月亮差 14%）。
  - 計算在 `src/moonsize.js`（純函式）：觀測者到月亮的距離 √(d²+R²−2dR sin alt)、角直徑、`moonNight`（月出用地心高度 0.125°、最高點、月落）、`fullMoons`＋`rankFullMoons`（最大三次＝超級月亮、最小＝微型月亮）。`test/moonsize.test.mjs`（assert）：2026 超級月亮 1/3、11/24、12/24 與公開距離差 < 200 km、微型月亮 5/31、最大最小差 14%、彰化 10/1 月出 21:01、升到最高變大 1.8%。
  - 3D 三個視角：「眼睛」（站在彰化地面：+Y 天頂、−Z 北、+X 東，水平視角 66°，月亮照真實角大小放在 800 單位外；房子、遠山、2 公里外的塔（放在月出方位）是布景；拖曳轉頭、↺ 回到月亮）、「長鏡頭」（水平 2.5°，會自動跳到月亮剛升起約 0.8° 的時刻，月亮正好在塔後面）、「從太空看」（赤道座標、地球照恆星時轉、距離壓縮 5 倍，彰化的你從地球側邊轉向月亮）。量月環是 HTML 圓圈，大小固定為月出時的角直徑。夜晚三選一：今晚／下次滿月／最大的滿月。
  - 右側 2D 錯覺圖（同樣大的兩個月亮，屋頂 vs 空曠），「顯示量尺」「拿掉屋頂」。頁面下方「今晚的月出與今年的滿月」（`data-moonsize`，13 次滿月照比例畫）。卡片 `views`（按鈕 `data-lab-view`）。
  - 面板外的段落不能用 `var(--al-sun)`（只在 `.astro-lab` 裡有定義），要寫死 `#ffd36e`。
  - 除錯：`document.querySelector('[data-illusion-lab]').__lab`（`setNight('tonight'|'full'|'super')`、`setView('eye'|'tele'|'space')`、`setT(ms)`、`render()`）。
- 第十六課（`sunrise-lab.js`，`lab.kind = "sunrise"`）：一個機制——地軸傾斜，太陽每天走的路（和天赤道平行的圓）一年之中南北移動，它和地平線的交點（日出點）在冬至點與夏至點之間擺盪（彰化東偏南 25.4° 到東偏北 26.2°）。
  - 計算在 `src/sunrise.js`（純函式）：`sunDay`（日出日落時刻與方位、正午高度；太陽中心 −0.833°，和氣象署同一個定義）、`sunYear`、`sunriseExtremes`（最北、最南、正東的日子）、`hengeDays`（懸日：太陽方位等於街道方位時高度在 2.7°–4.7° 之間）、`taosiPillars`（陶寺示意：13 根柱、12 道縫，第 2 道對冬至、第 12 道對夏至、中間平均分）。**用 ephem.js 的 `sunAltAz`，不要 import sky.js**：那會把整份 BSC 星表打包進來。
  - `test/sunrise.test.mjs`（assert）：**中央氣象署〈日出日沒時刻〉A-B0062-001**（政府資料開放授權條款第 1 版；`https://opendata.cwa.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=rdec-key-123-45678-011121314&CountyName=彰化縣&timeFrom=2026-01-01&timeTo=2026-06-29`，一次最多 180 天）2026 年彰化 360 天逐日對照：日出日落時刻差 ≤ 1 分、方位差 < 1°。懸日：從氣象署 2026 預報忠孝東西路 5/1 時段中點反推街道方位 285.0°，預測出 4/30–5/2、8/10–8/12，峨眉街（286.0°）5/3–5/5、8/7–8/9，全部吻合。另有：擺盪 51.7°、正東 3/20 與 9/24、春秋分每天移 0.43°／至日 < 0.01°、赤道／陶寺／巨石陣的擺幅、陶寺春分在第 7 道縫。
  - 3D 兩個視角共用一個 renderer：「面向東方」（地面座標同第十五課；水平視角 86°（手機 80°）；**相機保持水平、用 `setViewOffset` 移軸把地平線推到下方**——仰角看柱子會三點透視、像歪掉的木板；一天一格，太陽停在日出點（畫成 3 倍大），足跡點、冬至／春秋分／夏至標竿、冬夏至春秋分與今天的太陽軌跡）與「天空圓頂」（從外面看透明圓頂、指向北極星的軸、四條軌跡）。地點：彰化／陶寺（13 根夯土柱圍在 10.5 m 外）／新加坡（東邊是海）。右側一年的日出方位曲線（三地對照）。
  - 頁面下方「今天的日出與你家街道的懸日」（`data-sunrise`）：今天彰化日出日落、正往哪邊移、今年的擺盪、懸日查詢（忠孝東西路／峨眉街用台北座標；「你家的街」用彰化座標，街道兩端各算日落、日出懸日）。卡片 `points`（按鈕 `data-lab-day`）。
  - 除錯：`document.querySelector('[data-sunrise-lab]').__lab`（`setPlace('changhua'|'taosi'|'singapore')`、`setView('east'|'dome')`、`jumpKey('ws'|'ve'|'ss'|'ae'|'today')`、`setIdx(一年中的第幾天)`、`render()`）。shot.mjs 捲動要用 `scrollTo({ behavior: 'instant' })`：站上有 smooth scroll，`scrollIntoView` 後馬上 `scrollBy` 會把捲動取消、lab 不會啟動。zsh 的變數不會自動拆字，`$sz` 傳「1280 900」要用陣列。
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
- 第五課網路（`internet-packets.js`，`lab.kind = "internet"`，`data-internet-lab`；單元二第一課）：一個機制——訊息切成有編號的封包，路由器一站一站傳、各走各的路，收件端照編號排回，缺號就請伺服器重送。**示意地圖**（不是真實形狀）：彰化手機 → Wi-Fi → 網路業者 → 通訊軟體伺服器 → 登陸站 → 海纜 A（直達）或 B（經日本）→ 美國西岸 → 兩條陸路 → 波士頓。「弄丟一個封包」在美西路由器丟掉第 ⌈60%⌉ 號；「剪斷海纜 A」全部改走 B。`src/netcalc.js`（MTU 1,500 位元組、3 MB 約 2,000 封包、光纖約 20.4 萬 km/s、彰化—波士頓直線 12,532 km、`reassemble`）；`test/internet.test.mjs`。通訊軟體伺服器的位置是簡化的，課文沒寫它在哪裡（查不到可靠來源）。
  - 卡片 `parts` 可用 `demo`（`text`／`photo`／`lose`／`cut`）直接示範。
  - 除錯：`document.querySelector('[data-internet-lab]').__lab`（`send('text'|'photo')`、`setLose(bool)`、`setCut(bool)`、`state.auto = false`、`run(秒)`、`render()`）。
- 第六課手機訊號（`cell-signal.js`，`lab.kind = "signal"`，`data-cellsignal-lab`）：一個機制——手機用無線電波只連到最近的基地台，越遠越弱、被山擋住更弱。地形是函式 `ground(x, z)`（x 約 1 單位＝1 公里，高度誇大），山脊在 x = 3；視線檢查在基地台頂端到手機的線上取 40 點。地面頂點顏色＝訊號覆蓋圖（每個頂點用同一套 `src/radio.js` 算格數）。**Float32BufferAttribute 會複製陣列**：之後要寫 `geo.attributes.color.array`。`radio.js`：100 m 內自由空間、之後路徑損耗指數 3.5，山擋住時低頻 +18 dB、高頻 +28 dB，格數門檻 −85／−95／−105／−115 dBm（示意）；`test/signal.test.mjs`。卡片 `demo`：town／behind／tower／high。
  - 除錯：`document.querySelector('[data-cellsignal-lab]').__lab`（`setX(公里)`、`setBand('low'|'high')`、`setTowerB(bool)`、`setCoverage(bool)`、`measure()`、`run(秒)`、`render()`）。
- 第七課 GPS（`gps-satellites.js`，`lab.kind = "gps"`，`data-gps-lab`，CSS 前綴 `gp-`）：一個機制——衛星廣播「我是誰、我在哪、幾點送出」，手機用「訊號走的時間 × 光速」算距離；每段距離在地表上是一個圓，一圈→兩點→一點；手機時鐘不準時每段距離多算 c·e、三個圓交不在一點，第四顆衛星把時鐘誤差當第四個未知數解掉。**地球與軌道照真實比例**（1 單位＝地球半徑 6,371 km、軌道 4.17）；24 顆衛星照 GPS 基本設計（6 面 × 4、傾角 55°、半恆星日），相位示意；地球不轉。座標跟天文 earthmap 一樣（經度 0° 在 +X、東經 90° 在 −Z、y 指北）。
  - `src/gpscalc.js`（純函式，公里）：`constellation(t)`、`elevationDeg`、`measuredRange`（含時鐘誤差）、`groundCircle`（距離球 ∩ 地表＝{|p|=R, p·n=d}）、`twoPoints`（兩圓交點，解析解）、`solveFix`（高斯－牛頓；四顆以上連時鐘誤差一起解，不到四顆加「在地面上」的條件）、`pickSats`（最高的先挑，再挑最分散的）。`test/gps.test.mjs`：67.4 ms、1 µs≈300 m、38 µs≈11.4 km、彰化全天至少 4 顆、時鐘快 1 ms 三顆偏好幾百公里／四顆解回 1 公尺內。
  - 地球貼圖 `src/earthtex.js` 是從 `tools/astro/src/earthmap.js` **抄**來的（science 自己裝 `topojson-client`、`world-atlas`）：**不要直接 import tools/astro 的檔案**，esbuild 會從 tools/astro/node_modules 解析 three，打包進第二份 three.js。順手修了 `MathUtils.smoothstep` 參數順序（three 是 `smoothstep(x, min, max)`，min > max 會永遠回 0）。
  - 圓用「帶子」網格畫（角半徑 ±w），1px 的線在手機上太細。標籤在地球背面要藏（`hidden()` 做射線與單位球的交點檢查）。近看時訊號光點縮小（不然飛過鏡頭會變成一大團白）。
  - 數字卡六張時，桌機用 `:has()` 排成 3 × 2（science.css 最後一條）。卡片 `demo`：one／three／clock／four（都會飛到「近看台灣」）。
  - 除錯：`document.querySelector('[data-gps-lab]').__lab`（`setSats(1–4)`、`setErr(0–4)`＝0／1 µs／10 µs／0.1 ms／1 ms、`setClose(bool)`、`compute()`、`state.t`（小時）、`run(秒)`、`render()`）。
- 第八課記憶體（`memory-bits.js`，`lab.kind = "memory"`，`data-memory-lab`，CSS 前綴 `mb-`；單元二最後一課）：一個機制——每格是一個「杯子」（電容），滿＝1、空＝0，過黃線（一半）讀成 1；8 格一排＝1 個位元組，16 排＝位址 0–15。輸入框文字用 UTF-8 變位元組（英文 1、大部分中文 3、emoji 4；超過 16 個位元組在字與字之間截斷）。**RAM（DRAM）**：每格 tau 4–9 秒指數漏電，每 2.5 秒一次刷新掃描（真實約 64 毫秒）把過線的補滿、沒過線的歸零；關電源或關刷新就漏光。**快閃記憶體**：灰色半透明蓋子、不漏。
  - `src/memcalc.js`（`encode`、`decode`、`toBits`、`charSpans`、`leak`、`readBit`、`photoBits`），`test/memory.test.mjs`：A＝65＝01000001、彰化 6 位元組、往返一致、截斷不切中文字、tau 4 的格子 2.5 秒內不會忘、12MP 照片 2.88 億位元＝36 MB。
  - 卡片 `demo`：letter／chinese／ramoff／flashoff。ramoff、flashoff 用「劇本」（`state.script`，照模擬時間 `state.clock` 執行，所以暫停時劇本也停）：寫入 → 3.2 秒關電 → 11 秒（flash 7.5 秒）開電並讀出。
  - 查證教訓：英特爾 1103（1970，1,024 位元）用的是**三電晶體**格子，不是一電晶體＋電容；後者是丹納德 1966 的設計，現代 DRAM 才用。課文只說 1103 開始取代磁芯記憶體。
  - 窄螢幕：字的標籤只顯示字本身（不顯示「3 bytes」與「…」，否則蓋住最右一行杯子）；「一格＝1 位元」等說明標籤隱藏。全部 0 讀回來時顯示「All 0s · 全部是 0」（不要顯示一排 NUL）。
  - 除錯：`document.querySelector('[data-memory-lab]').__lab`（`write(文字)`、`read()`、`setKind('dram'|'flash')`、`setPower(bool)`、`setRefresh(bool)`、`demo(名稱)`、`cells[排][格].q`、`run(秒)`、`render()`）。
- 第九課藍天（`sky-scatter.js`，`lab.kind = "sky"`，`data-skyblue-lab`，CSS 前綴 `bs-`；**單元三第一課，資料在 `units[2]`**）：一個機制——空氣分子把短波長的藍光散射得比紅光多（∝ λ⁻⁴），被散射的藍光從天空四面八方射向你；太陽越低、穿過的空氣越多（地平線約 38 倍），藍光在路上散光，剩下紅橙。場景側面看地球弧（半徑 14）與誇大的大氣（厚 2.2、尺度高度 0.7），太陽在 10.5 單位處（要在畫面裡，光子從太陽射出才看得懂）；光子五色，散射機率＝β₀(530/λ)⁴·密度·路徑，散射後轉隨機方向並在 1.4 秒內淡出（不然滿天彩色碎紙）。右側「你看到的天空」是 2D canvas，顏色由 `skycalc.js` 算。
  - `src/skycalc.js`：`airMass`（Kasten & Young 1989）、`tauAt`（0.145×(500/λ)^4.05，綠光約 0.1）、`transmit`、`skyRadiance`（平行平面、單次散射的解析式）、`sunSpectrum`（5,778 K 黑體）、`toRGB`（**保留色相**：先算比例、再用最亮通道決定亮度；直接逐通道 1−e^(−x) 會全部洗成白色）。`test/sky.test.mjs`：(700/450)⁴≈5.86、空氣質量 1／2／38、日落藍光 <1%、紅光 >10%、中午天空藍>綠>紅、沒大氣全黑、日落太陽紅>綠>藍。
  - 卡片 `demo`：noon／afternoon／sunset／moon（關大氣）。窄螢幕隱藏「穿過幾倍空氣」標籤（會蓋到「彰化的你」），數字看右側面板。
  - 除錯：`document.querySelector('[data-skyblue-lab]').__lab`（`setElev(0–90)`、`setAir(bool)`、`state.photons`、`photons`（陣列）、`run(秒)`、`render()`）。
- 第十課彩虹（`rainbow-drops.js`，`lab.kind = "rainbow"`，`data-rainbow-lab`，CSS 前綴 `rb-`）：一個機制——光進雨滴轉彎、背面反射、出來再轉彎；水對各色折射率不同，各色回頭角度不同、都擠在約 42°（主虹 θ＝4r−2i 的最大值；副虹 180°+2i−6r 的最小值約 50–52°、顏色相反）。**兩個視角**（`data-view`）：「你和雨」（你在原點面向 +z、太陽在背後、20 公尺外 36,000 顆落雨，每顆依「與太陽正對面的夾角」上色）與「一顆雨滴」（放大的 2D 剖面放在 `DROP_AT`＝(300,0,0)，免得和雨幕疊在一起）。滑桿依視角切換（`.rb-v-sky`／`.rb-v-drop` 隱藏另一條）。
  - `src/rainbowcalc.js`：`nWater`（Cauchy 兩點擬合 Wikipedia 的 750 nm 1.330／350 nm 1.343）、`primaryAngle`、`rainbowAngle`、`secondaryRainbowAngle`、`primaryPath`（Snell 向量式的 2D 光路）。`test/rainbow.test.mjs`：綠光約 42°、b≈0.86、750 nm 42.5°／350 nm 40.6°（對上 Wikipedia）、副虹 50–53°、光路出射角等於公式。
  - 坑：**Line 的點數要一開始就給對**（`setFromPoints` 只更新、不加大緩衝區，4 點的光路用 2 點建會狂噴 “Buffer size too small” 警告）；雨幕要「暗雨、亮虹」：PointsMaterial 的頂點色是線性值，0.045 在畫面上已經是灰色，未照到的雨滴要 0.01 左右，否則彩虹被淹沒；`$('.rb-k2')` 撞到兩個元素（標題和 dt）——同一個 class 不要給兩種元素。
  - 卡片 `demo`：drop／rays／bow／high（另有 double，供除錯）。
  - 除錯：`document.querySelector('[data-rainbow-lab]').__lab`（`setView('sky'|'drop')`、`setSun(0–60)`、`setB(0–0.99)`、`setRays(bool)`、`setSecond(bool)`、`BOW`、`BOW2`、`run(秒)`、`render()`）。
- 第十一課聲音（`sound-waves.js`，`lab.kind = "sound"`，`data-soundwave-lab`，CSS 前綴 `sn-`）：一個機制——振動推擠空氣分子，一疏一密的壓力波往外傳，每顆分子只在原地晃（黃色那顆＋下方的振幅線）；傳到耳朵推動鼓膜、聽小骨、耳蝸（只輕帶，人體探索目前沒有耳朵課）。鼓在 x＝−9，64×9×7 顆分子用 **InstancedMesh**（每格 `setMatrixAt`＋`setColorAt`，擠＝橘、散＝深藍），耳朵在 x≈8.6。畫面波長 λ＝6·(100/f)^0.75、速度 2.6（示意）；音調滑桿是 log10(f/100)，100–1000 Hz；改音調會讓波從鼓重新出發。側欄另有「閃光到雷聲幾秒」→ 公里。
  - `src/soundcalc.js`：`speedOfSound`（331.3＋0.606T）、`wavelength`、`thunderKm`、`secondsPerKm`、`displacement`（含波前）、`squeeze`。`test/sound.test.mjs`：20 °C 343.4、343 Hz 波長 1 m、2.92 秒／公里、水 4.3 倍、鐵 14.9 倍、分子平均位移為 0、波前前方不動、有疏有密。
  - 版面：場景又長又扁，桌機 `.al-space` 降到 540px、鏡頭拉遠（係數 1.22），否則鼓或耳朵會被切掉。
  - 卡片 `demo`：low／high／noair／thunder。
  - 除錯：`document.querySelector('[data-soundwave-lab]').__lab`（`setF(100–1000)`、`setAmp(0–1)`、`setAir(bool)`、`setSec(0–20)`、`params()`、`state.t`、`run(秒)`、`render()`）。
- 第十二課相機（`camera-lens.js`，`lab.kind = "camera"`，`data-cameralens-lab`，CSS 前綴 `cm-`；單元三最後一課）：一個機制——鏡頭把每一點的光聚到感光元件一點（倒立），感光元件是一格格像素、每格只透過紅／綠／藍其中一種濾色片（拜耳 RGGB，綠是兩倍），光變數字。和人體探索第八課〈眼睛〉重疊的「鏡頭、對焦、倒立」只輕帶，重點放在像素與濾色片。側面看：x＝−8 景物板（canvas 自繪房子和樹）、x＝0 鏡頭與光圈環、x＝s 感光元件（對焦滑桿移動它，像距 DI≈4.08 由薄透鏡公式算）。紅屋頂、綠草地各三道光線＋流動光點。
  - 影像計算（同一份給感光元件貼圖與右側照片）：景物經鏡頭中心縮放 s/物距、上下顛倒 → 盒狀模糊三次（模糊圈 ＝ 光圈 × |s − DI| ÷ DI；針孔 ＝ 孔徑 × (物距＋s) ÷ 物距）→ 亮度 ∝ 光圈²（針孔另乘 250 當「長曝光」，面板照實顯示 0.002×）→ 取樣 N × 3N/4。**方向**：從鏡頭側看感光元件只有上下顛倒（左右和拍照者看到的一樣），所以照片只需上下翻回來；從相機背面看才是「上下左右都顛倒」。
  - 坑：**CanvasTexture 換尺寸要換一張新的貼圖**（`dispose()` 舊的；WebGL 上傳後不能改大小，否則畫面停在舊的、模糊）。窄畫面把鏡頭中心往右移，否則感光元件被切掉。
  - `src/cameracalc.js`：`imageDistance`、`magnification`、`blurDiameter`、`imageHeight`、`pinholeBlur`、`bayer`、`bayerCounts`、`megapixels`、`exposure`；`test/camera.test.mjs`：薄透鏡公式、遠物在焦點、近物像距變長、倒立、對準焦模糊 0、光圈加倍模糊加倍、針孔越小越清楚、RGGB、綠是紅藍兩倍、100×100＝0.01 MP、光圈加倍進光四倍。
  - 卡片 `demo`：sharp／blurry／pixels（12×9＋濾色片）／pinhole（孔徑 0.05）。
  - 除錯：`document.querySelector('[data-cameralens-lab]').__lab`（`setS(3.2–5.4)`、`setAp(0.04–2.4)`、`setN(8–96)`、`setRaw(bool)`、`setPinhole(bool)`、`DI`、`run(秒)`、`render()`）。
- 第十三課飛機（`airplane-wing.js`，`lab.kind = "wing"`，`data-airwing-lab`，CSS 前綴 `aw-`；**單元四第一課，資料在 `units[3]`**）：一個機制——機翼以小迎角把流過的空氣往下轉，空氣把機翼往上推＝升力；升力 ∝ 速度²；迎角太大（本模型設 15° 以上）失速。風洞視角：機翼不動、風從左吹右，1,500 顆粒子＋56 顆「一排煙」＋10 條流線。
  - **氣流是真的算出來的**：`src/liftcalc.js` 用茹科夫斯基翼型位勢流（ζ 平面圓心 (−0.09, 0.09)、通過 ζ＝1；z＝ζ＋1/ζ；庫塔條件 Γ＝4πUa·sin(α＋β)；速度＝(dW/dζ)/(dz/dζ)，尾緣附近夾在 3U 以內；z→ζ 取圓外的根）。世界座標＝機翼座標轉 −α（機頭抬起）。位勢流算不出失速，所以 `stallFactor` 另外把 CL 降低、畫面上讓上方粒子亂飄、上方流線變紅變淡。
  - `test/lift.test.mjs`：弦長約 4、有彎度（零升力角為負）、升力斜率約 2π／弧度、速度加倍升力四倍、遠方均勻流、上方快下方慢、機翼後方下洗，以及**「上下同時到達」是錯的**——從上游同時出發，上方的空氣先到（8.14 對 8.38）。
  - 流線：從上游 10 個高度用 RK2、等距 0.05 描 400 點，迎角變了才重描（`traceStreams`）。粒子顏色要「深底＋高增益」（中間色 #3a5a8c、差值 ×3.5），不然加法混色下全部看起來是白的。
  - 模型飛機的重量＝`liftRel(8°, 250 km/h)`：抬 8°、時速 250 公里剛好離地（純示意，不是任何真實機型）。
  - 卡片 `demo`：slow／takeoff／stall／smoke。
  - 除錯：`document.querySelector('[data-airwing-lab]').__lab`（`setAlpha(−4–22)`、`setSpeed(0–320)`、`releaseSmoke()`、`smoke`、`state.streams`、`run(秒)`、`render()`）。
- 上傳錄音時若出現大量「not found locally」：多半是天文 session 在 ~/Developer 那份 clone 產生、已上傳的句子（worktree 的快取沒有它們）。算出「manifest 裡有、快取裡沒有」的雜湊，逐一 curl 確認線上 200 即可。
- 多個 session 同時改 build.py 時，本系列改在 scratchpad 的 git worktree（從 origin/main 開分支）做，`audio` 用 symlink 指到 `~/Documents/twrses/audio`（symlink 不會被 .gitignore 的 `audio/` 擋，**不要 add**），做完 rebase 再 `git push origin HEAD:main`。
- 瀏覽器面板在背景時 `visibilityState` 是 hidden，IntersectionObserver 不觸發、截圖是空白：點一下頁面上的「在模型中看」按鈕就會直接初始化，截圖改用無頭 Chrome（playwright-core＋本機 Chrome，`--use-angle=swiftshader`）。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/how-things-work/<slug>` → `./tools/upload_audio.sh`，manifest 命名 `how-things-work-<slug>`。檢查線上 200 要帶瀏覽器 UA（Python 預設 UA 會被 r2.dev 擋成 403）。
- 課程規劃在 Obsidian：`第二大腦/創作庫/萬物原理科普課程規劃（twrses）.md`。

---

## 晶片與半導體 Chips and Semiconductors（/resources/classes/semiconductors/）— 架構照萬物原理，資料、程式、CSS 自己一套

- 內容：`data/semiconductors.json`：`units[]`（三個單元：半導體是什麼／晶片怎麼做出來／AI 時代的晶片）底下 `lessons[]` 與 `planned[]`（「製作中」卡，做一課就從 planned 移到 lessons）；課次 `n` 全系列連號（1–8）。每課欄位同萬物原理，多的：`home`（「你家有幾顆晶片？」勾選清單）、`links`（延伸閱讀卡，連到萬物原理，不重講）、`culture_cards`（四張文化／產業卡，用 astro.css 的 `.cc-card`）、`facts`、`safety`、`sources`（**數字一定要先查證再寫**，附來源與年份）。
- 頁面：`build.py` 的 `build_chip_hub()`（單元導覽＋`.lc-row` 橫向課程卡；系列小圖示 `chipsilicon_svg()`）/ `build_chip_lesson()`；reading、迷思、口訣、活動沿用 `render_basic_unit()`、`_sci_myths()`、`_sci_tricks()`、`_astro_activity()`。「閱讀與經典」頁有入口卡（💿）。
- 樣式：共用 `assets/css/astro.css`，本系列專屬的在 `assets/css/chips.css`（**class 前綴一律 `cp-`**，不要用 science.css 的 `bt-`／`hw-`：那支 CSS 不載在本系列）；`_chip_head()` 只在本系列頁面載入。
- 3D：**原始碼在 `tools/chips/src/`**（自己的 package.json，three 0.186.1、esbuild 0.25.10），bundle 一律 `chip-*`，打包到 `assets/js/<入口>.js`（產物，不要手改）；`lab.kind` → bundle 對照在 `build.py` 的 `_CHIP_JS`。`labeler`、`lazyBoot` 在 `tools/chips/src/common.js`（從 tools/science 抄來）。**不要 import tools/science 或 tools/astro 的檔案**（esbuild 會打包進第二份 three.js）。
  ```
  cd tools/chips && npm ci && npm run build && npm test
  ```
- 第一課半導體（`chip-doping.js`，`lab.kind = "doping"`，`data-chipdoping-lab`）：一個機制——導不導電看有沒有自由移動的電荷；純矽的電子都在牽手（共價鍵），換掉極少數原子成磷（多一個電子，N 型）或硼（少一個＝電洞，P 型）就導電。
  - 兩個視角共用一個 renderer（切 group 的 visible）：「三種材料」地上三排測試器（後到前：銅、玻璃、矽；電池在左、LED 在右，電子從負極出發由左往右穿過材料），電線裡電子速度 ∝ LED 電流；材料裡畫自由電荷（銅 60 顆、玻璃 0、純矽 0、摻雜矽依摻雜量對數 3–40 顆；電子往＋、電洞往−漂）。「矽的原子」XY 平面 7 × 5 原子的**平面示意**（每根鍵兩個電子），兩個原子換成磷或硼；電洞跳躍：**左邊（−側）鍵上的電子往＋跳進電洞，電洞往左移**，到左緣被負極填掉、右緣再生一個（第一版方向寫反過，改的時候注意）。
  - 相機距離用 `fit(w, h)` 依畫面比例算（手機 1:1 也放得下整個場景）。
  - `src/chipcalc.js`（純函式）：σ = q(nμn + pμp)，電中性解 n、p（ni = 10¹⁰），遷移率用 Caughey–Thomas；導電測試器 3 V＋紅 LED 1.9 V＋100 Ω、樣品 2 cm × 1 cm²（`ledLevel`，以銅為 1）；滑桿 0–70 → 每 10¹¹…10⁴ 個原子換 1 個（`oneInFromSlider`）；`fmtBig`（million／billion／trillion、萬／億／兆；先 toPrecision(3) 修整，否則 10⁹ 會寫成「1000 million」）；`homeChips`。
  - `test/doping.test.mjs`（assert）：純矽 3.2 × 10⁵ Ω·cm（Ioffe）、N 型 10¹⁶ ≈ 0.5、P 型 ≈ 1.4 Ω·cm、n·p = ni²、百萬分之一的磷 > 100 萬倍（課文的說法）、銅／純矽 > 10¹¹、導電順序與刻度、LED 亮暗、滑桿與格式、**讀 data/semiconductors.json 檢查 `home` 清單**（每項要有 `est`：source／guess／min；手機 30、汽車 1,000；範例家庭 20–200 顆）。
  - 頁面下方「你家有幾顆晶片？」（`data-chip-home`，`initHome()` 在同一支 bundle，不需要 WebGL）：只有兩個數字有出處——iFixit 2025 iPhone 17 Pro 認出 38 顆（取 30）、美國商務部 2021 電動車約 2,000 顆＝一般車兩倍（取 1,000）；有按鍵的家電只算 1 顆微控制器；電腦、平板、電視等標「本站估計」。
  - 卡片 `demo`：compare／pure／phosphorus／boron（另有 lit）。
  - 除錯：`document.querySelector('[data-chipdoping-lab]').__lab`（`setView('cmp'|'atoms', 立即?)`、`setDope('pure'|'n'|'p')`、`setAmt(0–70)`、`setPower(bool)`、`demo(名稱)`、`goCam()`、`run(秒)`、`render()`）。截圖後讀 aria-pressed／顏色要等 0.2 秒的 CSS transition，否則看起來兩個按鈕都亮。
  - 查證過的數字（2026-10）：矽占地殼 27.7%（RSC）；晶格常數 0.5431 nm、5 × 10²² 原子/cm³、本質電阻率 3.2 × 10⁵ Ω·cm（Ioffe）；電阻率表銅 1.68 × 10⁻⁸、矽 2.3 × 10³、玻璃 10¹¹–10¹⁵ Ω·m（Wikipedia）；輕摻雜約一億分之一、重摻雜約萬分之一；電子級多晶矽雜質 < 十億分之一；「semiconducting」伏打 1782（據 Busch）、Halbleiter 魏斯 1910；竹科 1980/12/15 成立、我國第一個科學園區、核准廠商逾 600 家、就業逾 16 萬人、2021 年積體電路是廠商家數最多的產業；基爾比 1958/9/12（鍺）、快捷 1960 第一批矽 IC、2000 諾貝爾物理獎；健保 IC 卡 2004/1/1 全面使用。**查不到的不寫**：竹科產值比重、各家電的晶片數、新生兒自動發卡。
- 第二課電晶體（`chip-transistor.js`，`lab.kind = "transistor"`，`data-chiptransistor-lab`）：一個機制——閘極加正電壓、隔著絕緣層把電子吸成通道，源極到汲極就通（開＝1）；兩個開關串聯＝AND、並聯＝OR。
  - 兩個視角：「一顆電晶體」剖面（P 型基底紫＋電洞、N 型源極汲極藍＋自由電子、白色絕緣層、金色閘極與「＋」；上方電線有電池與 LED，電子由源極經通道到汲極再從上面繞回；閘極越正，閘極下的電洞往下推＝空乏）；「會算數的開關」板子上 AND 串聯（後排）、OR 並聯（前排）兩個小電路，右側輸入 A、B、真值表（目前那一列亮）與 1 位元加法（carry＝AND、sum＝XOR）。右側欄用 `.cp-tr-one`／`.cp-tr-two` 依視角切換（root 的 `cp-tr-logic` class）。
  - `src/transcalc.js`：`channel`、`current`（平方律，VTH 0.4 V、VDD 1.0 V 是**示意值**——「現代晶片低於 1 伏特」查不到可靠來源，不要寫）、`series`/`parallel`/`XOR`/`halfAdd`/`fullAdd`/`addBits`、`fmtDuration`（年／天／小時／分鐘／秒，不到 1 秒寫「不到 1 秒」）。`test/transistor.test.mjs`：臨界以下沒電流、單調、真值表、0–15 全部相加、**讀 data 的 `count` 檢查晶片數與出處**、M4 一秒一顆 887 年、全台灣（23,224,721 人）20 分鐘、Blackwell 2.5 小時、4004 不到 1 秒。
  - 頁面下方「一顆一顆數，要數多久？」（`count`，`data-chip-count`，`initCount()` 在同一支 bundle）：只用廠商公布的數字——英特爾 4004 2,300（1971）、蘋果 M4 280 億（Apple Newsroom 2024）、輝達 Blackwell 2,080 億（NVIDIA 2024，兩片矽當一顆用）。**蘋果手機晶片（A17 Pro 的 190 億等）不是新聞稿數字，不要用**；A18／A19／A20、M5 都沒公布。台灣人口用內政部 2026 年 8 月底 23,224,721（今周刊轉述，官方表打不開）。
  - 卡片 `demo`：off／on／and／or。`links_head` 可自訂延伸閱讀的標題（第二課連本系列第一課＋萬物原理第八課 computer-memory）。
  - 查證過（2026-10）：1947/12/16 第一顆電晶體、12/23 展示、蕭克利「聖誕禮物」、皮爾斯命名（transresistance＋varistor/thermistor 的結尾）、1948/6/30 公布、1956 諾貝爾；MOS 電晶體 1959–1960（CHM 標題寫 1960 示範），超過 99% 晶片用 MOS；摩爾 1965 每年→1975 每兩年；約 1.3 × 10²² 顆（分析師估計，CHM 2018）；1952 助聽器、1954 Regency TR-1；時脈 3 GHz＝每秒 30 億次（A17 Pro 最高 3.78 GHz，Wikipedia）。
  - 除錯：`document.querySelector('[data-chiptransistor-lab]').__lab`（`setView('one'|'logic', 立即?)`、`setGate(0–1 V, 立即?)`、`setInput('a'|'b', 0|1)`、`demo(名稱)`、`goCam()`、`run(秒)`、`render()`）。
- 第三課沙子變晶片（`chip-wafer.js`，`lab.kind = "wafer"`，`data-chipwafer-lab`；**單元二第一課，資料在 `units[1]`**）：一個機制——石英煉成矽、提純、從熔湯拉出單晶、切成晶圓，一片晶圓同時做幾百顆晶片。
  - 場景是六站生產線，**排成兩排像兩行字**（後排 1 石英砂、2 電爐、3 提純鐘罩；前排 4 拉晶、5 切片、6 晶片），位置在 `P`、每一步的鏡頭在 `CAM`（看的高度、要放得下的寬高）。每站有進度 `state.prog[i]`，選到那步從 0 播到 1（`STEP_T` 5.5 秒），「播放全程」做完停 `HOLD_T` 再走下一站。步驟文字、數字在 `lab.steps`（右側欄的面板由 build.py 畫，`data-steps` 只傳短名給 3D 標籤）。用了 `RoomEnvironment`（PMREM）讓金屬、鏡面晶圓有反光，`scene.environmentIntensity` 0.55。
  - 第六站晶圓上的晶片用 `wafercalc.js` 的 `countDies` 排（InstancedMesh，2 mm 時一萬五千顆也跑得動），頁面計算器改大小時發 `chipwafer:die` 事件並記在 `window.__chipDie`，3D 跟著重排。
  - `src/wafercalc.js`：`countDies(w, h)`（300 mm、邊緣 3 mm 不用、切割道 0.1 mm 都是示例值；方格平移 8 × 8 種取最多）、`approxDies`（Wikipedia 的 πd²/4S − πd/√(2S)）。`test/wafer.test.mjs`：公式 10×10 約 640、5–20 mm 排出來和公式差不到一成、越大越少且浪費比例越高（從 5 mm 比，2 mm 時切割道本身就吃掉一成）、26×33 約 64 顆、2 mm 超過一萬五千、讀 data 的 `dies.presets`。
  - 頁面下方「一片晶圓切得出幾顆晶片？」（`dies`，`data-chip-dies`，2D canvas，`initCalc()` 在同一支 bundle）：滑桿 2–30 mm、四個例子（2×2、5×5、10×10、26×33＝EUV 一次曝光最大範圍）。
  - 查證過（2026-10）：電弧爐超過 2,000 °C（NTNU）、冶金級矽 96–99%（寫約 98–99%）、原料通常是高純度石英岩不是一般沙灘沙；西門子法矽棒約 1,150 °C、電子級 **10N–11N**（不是 9N）、1950 年代西門子與瓦克；柴可拉斯基 1916 發明、1918 發表，**沾錯墨水是「相傳」**；矽熔點 1,414 °C；晶棒「長約 2 公尺、數百公斤」是一般說法、沒有限定 12 吋；300 mm（11.8 吋，俗稱 12 吋）1999 推出、厚 775 µm、缺口定位；450 mm 聯盟 2017 開始解散；EUV 一次曝光 26 × 33 mm（Wikipedia）；環球晶圓總部竹科（12 吋與 8 吋）、合晶、台塑勝高科技（台勝科，Taipei Times）。
  - 除錯：`document.querySelector('[data-chipwafer-lab]').__lab`（`setStep(-1 全景 | 0–5, 立即?)`、`setTour(bool)`、`buildDies(w, h)`、`finish()`、`goCam()`、`run(秒)`、`render()`）；`root.__dies` 是目前的排法結果。
- 第四課微影（`chip-litho.js`，`lab.kind = "litho"`，`data-chiplitho-lab`；單元二第二課）：一個機制——光穿過光罩、縮小 4 倍印在光阻上，照到光的光阻洗掉、薄膜蝕刻出圖案；波長越短線越細。
  - 兩個視角：「曝光機」DUV（雷射 → 透光光罩 → 一疊鏡頭 → 晶圓）／EUV（雷射打錫滴、反射鏡、反射式光罩、真空罩），晶圓上一格一格曝光（格子＝26 × 33 mm，`countDies(26, 33)` 的 64 格，貼圖 canvas 重畫）；「晶圓上的步驟」剖面 1 塗光阻 2 曝光 3 顯影 4 蝕刻 5 去光阻，用連續的 s＝步驟＋進度算每塊高度與顏色。**高度 0 的方塊要 `visible = false`**：只把 scale.y 壓成 0.001，頂面顏色還是會蓋在薄膜上（第一版就是這樣，看起來光阻沒去掉）。
  - `src/lithocalc.js`：DUV 193 nm／NA 1.35（浸潤式）、EUV 13.5 nm／NA 0.33；`cd()`＝k1·λ/NA（ASML 的瑞利公式，k1 0.4，物理極限 0.25）→ DUV ≈ 57 nm、EUV ≈ 16 nm（波長短 14 倍，線只細 3.5 倍）；剖面條數 `segments()`：DUV 6、EUV 21。藍曬：`tone(分鐘, 透光)`＝1 − e^(−光量/12)、`blurRadius(距離)`、`blur1D`、`edgeWidth`。`test/litho.test.mjs`：57／16／10 nm、都比流感病毒細、12 分鐘約 63%、光罩越遠邊緣越寬、線太近又太糊就分不開。
  - 頁面下方「在螢幕上曬一張藍曬圖」（`sunprint`，`data-chip-sun`，2D canvas 160×160，`initSun()`）：三種光罩（葉子、電路、你的字——字用 measureText 縮到放得進紙）、曬多久（0–40 分鐘）、光罩離紙多遠（模糊），按「用水沖洗」才變藍白。
  - 查證過（2026-10）：ArF 193、KrF 248（ASML）；EUV 13.5 nm、錫滴直徑約 25 µm、**每秒 5 萬滴、每滴兩道雷射脈衝**（先壓扁再打成電漿）、什麼都吸收 EUV 連空氣也是 → 真空＋多層膜反射鏡；光罩圖案是晶片的 4 倍；CD＝k1·λ/NA、NA 0.33／0.55；正型光阻最常見；ASML 說現代晶片**最多約 100 次**圖案步驟（ASML 各頁說法不一，課文寫「up to about 100」）；ASML 是到 2025 年唯一的 EUV 製造商、總部費爾德霍溫；EUV 機台「校車大小、約 150 tons、約 40 個貨櫃」是路透社 2026 的說法（ASML 官網沒寫）；無塵室 ISO 1＝每 m³ 0.1 µm 以上 10 顆、一般室內約 ISO 9；黃光（< 500 nm 要擋，MicroChemicals）；流感病毒 80–120 nm；拉斯羅普與納爾 1957 專利、1958 第一次印出 photolithography；藍曬 1842 赫歇爾、1843 阿特金斯（「常被稱為」第一本照片書）、曝光 10–40 分鐘（倫敦自然史博物館）。**沒寫**：家中灰塵粒徑（查不到可靠來源）、光罩 6 吋尺寸（只有小廠規格書）。英文用 tons，不用 tonnes。
  - 除錯：`document.querySelector('[data-chiplitho-lab]').__lab`（`setView('machine'|'wafer', 立即?)`、`setLight('duv'|'euv')`、`setWStep(0–4, 立即?)`、`setAuto(bool)`、`segs`、`run(秒)`、`render()`）。
- 共用工具 `tools/chips/src/common.js`：`labeler`、`lazyBoot`、`canvasTex`、`glowTex`、`polyline`（電線裡的電子沿弧長走）、`tube`。第一課的 chip-doping.js 還是自己寫一份（沒改動），新課用 common.js 的。新入口要加進 `package.json` 的 build 與 test。
- 和萬物原理互相連結：第一課的 `links` 連第三課太陽能板（電子與電洞）；第二課連萬物原理第八課（computer-memory，0 與 1、DRAM），不重講。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/semiconductors/<slug> --out audio/say-<slug>` → `python3 tools/upload_say_dir.py assets/data/say/semiconductors-<slug>.json audio/say-<slug>`（manifest 命名 `semiconductors-<slug>`；`gen_audio.py` 的 SHORT_PAGES 已加本系列）。worktree 裡先把 `~/Developer/repos/twrses/tools/.r2_uploaded_cache.txt` 複製過來，做完 `sort -u` 合併回去。
- 課程規劃在 Obsidian：`第二大腦/創作庫/半導體科普課程規劃（twrses）.md`（三單元八課、待查證清單、交接指令）；系列索引 `第二大腦/英文學習/晶片與半導體（twrses.org）.md`。

---

## Build / Deploy
```
python3 build.py        # BASE=/twrses → 服務於 lukelin7429.github.io/twrses/ 或 www.twrses.org
```
- 本機預覽：因 `BASE=/twrses`，需在 repo 內建 self-symlink `ln -sfn . twrses`，再開 http server 連 `/twrses/...`。**這個 symlink 不要 commit**（git 應忽略）。
- 音檔／PDF 走 GitHub Release（各級別 `<level>-audio` / `<level>-pdf`）。

詳細專案脈絡見使用者 memory：`mcc-chinese-twrses-migration`、`feedback_video_inline_never_popout`、`grandpa-mike-memorial`。
