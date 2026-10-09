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
- 第九課耳朵（`ears.js`，`lab.kind = "ears"`）：頭骨定位，右耳**放大 4 倍、剖開前半**（剖面 z = 0，鏡頭從前方看），原點＝鼓膜中心、耳朵座標 1 單位＝1 mm。BodyParts3D **沒有聽小骨**，鎚骨、砧骨、鐙骨自繪：鎚骨＋砧骨繞同一支點擺、鐙骨前後推。空氣粒子是 `Points`（`PointsMaterial.size` 不吃父物件縮放，要乘 S）。耳蝸音高位置用 **Greenwood 公式**（`placeOf`），可拉直；平衡模式是水平半規管裡的液體點。音高 20 Hz–20 kHz 對數滑桿、音量 0–130 dB（≥85 警示）；預設音色在 `lab.presets`（data-pre）。**聽力測驗是 2D＋WebAudio（`initHearingTest`）**：先播 1 kHz 試聽調音量，再 8→20 kHz 一階一階問；增益寫死 0.05、每個音 1.4 秒，「小聲播放」也固定 0.035。除錯 `__lab.choosePre('bird'|'talk'|'drum'|'fire')`、`setHz(f)`、`setDb(d)`、`setUncoil(true)`、`startSpin()`、`run(秒)`、`render()`。
- 第十課皮膚（`skin.js`，`lab.kind = "skin"`）：整副骨架淡淡、右臂比較清楚；從右前臂外側「取樣」（黃色小方框＋四條引線），皮膚塊放大 25 倍浮在手臂外側。皮膚座標 1 單位＝1 mm，表面 y = 0，表皮 0～−0.35（畫厚了）、真皮到 −2.15、脂肪到 −3.8；三層是半透明盒子，裡面的構造不透明。四個情境（`lab.scenarios`，data-scen）：hot 汗水沿汗管上來、毛孔冒汗珠、水氣、微血管變粗（重建 TubeGeometry）；cold 豎毛肌收縮、毛豎起、雞皮疙瘩；touch 橡皮擦先輕碰（觸覺小體亮）再用力按（環層小體亮）；sun 10 秒＝1 小時，UVB 停在表皮、UVA 到真皮、黑色素上升、最後表皮變紅。**「今天彰化的太陽」是 2D（`initSun`）**：NOAA 太陽位置公式＋晴天 UVI ≈ 12.5·cos(天頂角)^2.42·(280/300)^−1.23，分級照 WHO／中央氣象署（低量 0–2…危險 11+）；10/1 中午約 10、夏至約 13.6、冬至約 5.3。除錯 `__lab.choose('hot'|'cold'|'touch'|'sun')`、`run(秒)`、`render()`。
- 第十一課牙齒（`teeth.js`，`lab.kind = "teeth"`）：頭骨與上下頷骨是真的（BodyParts3D **沒有牙齒**），52 顆牙自繪、約真實大小：牙冠是「方一點」的超橢球＋臼齒牙尖、牙根是圓錐。齒弓是橢圓弧長表；前端位置與每顆牙的牙槽骨高度從真實頷骨頂點算（`crest`，下頷排除 y > 1.535 的下頷枝）。下頷骨＋下排牙掛在顳顎關節 pivot，可張嘴。年齡 3–20 歲驅動一切，萌發／脫落平均年齡在檔頭的 `ADULT`、`BABY` 表（ADA／Queensland Health）；智齒 10 歲後才出現在骨頭裡。點牙看名稱（Raycaster）。**牙齒圖（`initChart`）與蛀牙剖面（`initCavity`）是 2D**：牙齒圖照鏡子方向排（左邊＝你的左邊），1–5 可標乳牙／恆牙／空位、6–7 只有恆牙／空位，牙齒年齡＝3–20 歲間與標記最吻合的年齡。台灣口腔保健查證過（衛福部）：國小一、二年級（72–108 個月）第一大臼齒窩溝封填、國小學童每週一次含氟漱口水。除錯 `__lab.setAge(歲)`、`pickTooth(teeth[i])`、`run(秒)`、`render()`。
- 第十二課病菌（`germs.js`，`lab.kind = "germs"`）：右手骨頭較清楚、食指指尖的紙割傷（黃點＋引線），組織放大約 2,000 倍（微米座標，細菌畫大一點）：表皮割開一道縫、真皮、微血管與紅血球、白血球、細菌、抗體 Y。**全部由時間決定、沒有累積狀態**（`bact`、`wbc`、`abs`、`red` 都是 h 的函數，位置用固定亂數），所以來回拖曳都一樣；時間軸非線性（`hOf`／`uOf`：0–3 小時、3–24 小時、1–10 天）。第一次 vs 第二次的細菌數曲線畫在右欄（典型初次／二次免疫反應，示意）。**病菌計算機與洗手計時器是 2D（`initStrip`）**：每 20 分鐘加倍、和全班／彰化縣／台灣人口比；洗手照疾管署「濕、搓（20 秒）、沖、捧、擦」。除錯 `__lab.setMode(true)`、`setHours(h)`、`run(秒)`、`render()`。
- **放大組（eyeG、earG、skinG、gG、第十四課的 head／budG／smG）在模型載入、放好位置之前要隱藏**：不然載入中的畫面鏡頭會在放大組裡面，滿畫面一顆大球（2026-10-01 修）。
- **真實器官模型 `assets/models/organs.glb`**（27 KB，第十三課起）：BodyParts3D 裡「單一檔案、形狀完整」的器官——`r-kidney`、`l-kidney`、`r-ureter`、`l-ureter`、`bladder`、`tongue`（肝、心、腦是幾十個碎片，不用）。`cd tools/body && npm run model:organs`（`scripts/build-organs.mjs`）：座標與 skeleton.glb 對齊，y 位移是拿 skeleton.glb 裡幾塊大骨頭和原始資料比出來的（約 70.4 mm）。載入用 `common.js` 的 `loadOrgans(url)`；`build.py` 的 `_organs_url()`、`data-organs`；`npm test` 會檢查六個節點與授權字樣。頁面出處行要寫骨骼**與器官**。**第六批（2026-10-09）起共 33 個節點、207 KB**：新增 `esophagus`、`stomach`、`duodenum`、`gallbladder` 與 22 片椎間盤 `disc-01`（樞椎下）…`disc-22`（L5 下；原始資料叫 intervertebral **disk**，搜 disc 找不到）。原始資料的 spinal cord 只有頸部 3.6 公分一小段，沒有收，脊髓要自繪。**每一課都要用白名單隱藏自己不用的器官**（`for (const [n, part] of parts) if (!USE.includes(n)) part.mesh.visible = false`），不然以後新增的器官會出現在舊課裡。worktree 裡重建要帶 `BP3D=~/Documents/twrses-bp3d npm run model:organs`。
- 第十三課腎臟（`kidneys.js`，`lab.kind = "kidneys"`，CSS 前綴 `kd2-`，因為 `kd-` 已被種類卡用掉）：真實腎臟、輸尿管、膀胱；自繪主動脈／下腔靜脈／腎動靜脈（鮮紅進、暗紅出，不用藍色）、血球、尿滴（沿真實輸尿管頂點切片算出的中心線）、膀胱掛在底部 pivot 上隨尿量變大。模擬以 30 公斤孩子估算：1 秒＝20 分鐘、過濾 4.4 L/h、尿量 15–110 mL/h（隨「喝了多少水」）、膀胱 350 mL，滿 8 秒沒人按就自己去上廁所。放大的腎元浮在身體左邊：粒子位置是進度的函數（過濾 → 回收 → 排出，水的回收比例隨喝水量變）。**喝水紀錄與顏色卡是 2D（`initTracker`）**：目標＝max(1,500, 體重×30)。查證：NIDDK（每分鐘半杯血、每天約 150 夸脫≈140 公升、尿 1–2 夸脫、每顆腎約一百萬個腎元）、國健署（國小學童至少 1,500 毫升）。除錯 `__lab.setWater(0–1)`、`setZoom(true)`、`run(秒)`、`render()`。
- 第十四課味覺與嗅覺（`taste.js`，`lab.kind = "taste"`，`data-taste-lab`，CSS 前綴 `ts-`）：**頭骨從正中剖開**——`renderer.localClippingEnabled = true`，每塊頭骨的材質加 `clippingPlanes: [Plane((-1,0,0), -0.003)]`（只留身體右半、x < −3 mm）＋`DoubleSide`，正中的犁骨（vomer）直接隱藏；鏡頭在 +X（從身體左邊看，臉朝畫面左邊）。**真實舌頭**（organs.glb 的 `tongue`，整顆不剖）；味蕾是從上往下打 Raycaster 找舌面、遍布整個舌頭的小點（固定亂數 86 顆）。自繪：臉的輪廓與咽後壁（x = 0 平面上的細管，BodyParts3D 沒有皮膚和牙齒）、軟顎（接在 `r-palatine` 後緣）、鼻腔頂端的嗅覺區與嗅球（位置由 `ethmoid` 的 box 算）、味覺／痛覺神經、淡淡的大腦與「風味」亮點、捏鼻子的兩根手指。兩個放大圖浮在臉前方：味蕾（九顆細胞排成洋蔥形，五顆各管一種味道，旁邊另有一條痛覺神經末梢）、嗅覺區（六種顏色的嗅覺細胞穿過有洞的骨頭接到嗅球；每種食物點亮一組「和弦」`CHORD`）。
  - 一口食物的時間軸 `state.tb`：味道分子的位置是 tb 的函數（溶進口水、漂到整個舌頭的味蕾，所以五種味道到處都亮＝沒有舌頭地圖）；氣味分子**有狀態**（`o.u` 沿 `retro` 曲線：舌根 → 懸雍垂下方 → 軟顎後面 → 鼻咽 → 嗅覺區），捏住鼻子時卡在 `P.gate`（喉嚨），放開就繼續走，並把 tb 倒回 5 秒讓氣味來得及上去。11 秒吞下、14 秒自動再吃一口（`state.auto`）。
  - 六種食物在 `lab.foods`（data-foods）：`taste` 是甜酸鹹苦鮮五個 0–1 的**示意值**、`pain`（辣椒 0.95，走紅色的痛覺神經，不是味覺）、`open_*`／`pinch_*` 是大腦在放開／捏住鼻子時說的話。
  - **捏鼻子試吃計分卡是 2D（`initScore`）**，不需要 WebGL：兩列（捏住／放開）各有猜對、猜錯，可復原、重新開始，存在 localStorage（`twrses-taste-score`，包 try/catch）；兩列都滿 5 次才下結論。
  - 查證：NIDCD（五種基本味道；出生時約 10,000 個味蕾；嗅覺細胞在鼻腔高處一小片、氣味有鼻孔與喉嚨頂端兩條路；辣椒的灼熱屬於 common chemical sense）、Wikipedia（味蕾 2,000–8,000、味覺細胞壽命約 10 天；舌頭地圖＝Hänig 1901 被 Boring 1942 重畫後誤讀；鮮味＝池田菊苗 1908 昆布高湯；人類約 400 種嗅覺受體）。課文只寫「好幾千個味蕾」「幾千種氣味」，**沒有寫「風味 80% 來自嗅覺」和「一兆種氣味」**（查不到可靠出處）。
  - 除錯 `__lab.setFood('gummy'|'lemon'|'chips'|'choco'|'broth'|'chili')`、`setPinch(bool)`、`setZoom('bud'|'smell'|null)`、`bite()`、`state.auto = false`、`state.hold = true`（rAF 不再推進時間，截圖才不會慢一拍就吞下去了）、`run(秒)`、`render()`。側欄長條有 CSS transition，背景面板截圖常停在舊值，以 `style.width` 為準。
- 第十五課睡眠（`sleep.js`，`lab.kind = "sleep"`，`data-sleep-lab`，CSS 前綴 `zz-`——`sl-` 已被萬物原理的太陽能課用掉）：**整副真實骨架躺下**——骨架和所有自繪的東西（大腦、眼球、心臟、腦下垂體、松果體）都用「站著」的座標放進 `bodyG`，再把 `bodyG.rotation.x = −π/2`（頭在 −Z、臉朝上）、y 位移＝−(所有骨頭的 min z)；標籤位置用 `bodyG.localToWorld`（`W()`）。大腦沿用第七課的功能區頂點色，但改 `MeshBasicMaterial`、每格重算顏色。房間（床、牆、窗、床頭燈）在 `room`；窗外的天空、星星、月亮、太陽只是牆上的平面。
  - 時間軸 `state.min`：0＝晚上 9:00 關燈，−30（20:30）～630（07:30），播放時 1 秒＝15 分鐘。`SEG` 是**典型的一晚（示意，不是量測）**：W 醒／L 淺睡（N1＋N2）／D 深睡（N3）／R 快速動眼期；深睡集中在前三輪、REM 越到早上越長。每個階段決定 `ACT`（大腦各區亮度；深睡整顆腦同步起伏、REM 視覺區最亮思考區最暗）、`TONE`（REM＝0，手腳骨頭變藍）、`HEART`、生長激素（只在深睡，綠點從腦下垂體沿脊柱流到腿骨）、記憶火花；褪黑激素 `melAt()` 只看時鐘。
  - 右欄腦波與下方的睡眠階段圖都是 2D canvas（**外層 position: relative＋固定高度、canvas 絕對定位**，否則會撐寬手機版）；階段圖可點、可拖（pointer capture，`touch-action: pan-y`）。拖時間軸、點階段圖、按四個跳轉鈕都會暫停。
  - **睡眠計算機是 2D（`initCalc`）**：睡著與起床時間 → 時數（跨午夜），對照 6–12 歲 9–12 小時；點星期幾存進一週長條（再點一次清除），存 localStorage（`twrses-sleep-week`）。
  - 查證：CDC／美國睡眠醫學會（6–12 歲 9–12 小時、13–17 歲 8–10 小時；睡前至少 30 分鐘關螢幕、固定作息）、NHLBI（生理時鐘靠光對時；褪黑激素傍晚上升、凌晨最高；深夜強光會讓大腦不分泌褪黑激素；睡眠幫助形成長期記憶；睡不夠比較容易感冒）、Wikipedia（REM：1953 年 Kleitman 與 Aserinsky，肌肉幾乎完全麻痺、大腦活動接近清醒、第一次約在入睡後 70 分鐘、越到早上越長；深睡集中在前兩輪、生長激素在深睡分泌；睡眠週期成人 70–110 分鐘）。課文**沒有寫**「睡覺時大腦排毒」（主要是小鼠研究）和「週末補眠沒用」。
  - 除錯 `__lab.setMin(分鐘)`（會暫停）、`setHead(bool)`、`setPlaying(bool)`、`stageAt(m)`、`totals(m)`、`state.hold = true`、`run(秒)`、`render()`。
- 第十六課長高（`growth.js`，`lab.kind = "growth"`，`data-growth-lab`，CSS 前綴 `gw-`；第四批最後一課）：左邊整副真實骨架站在尺旁邊（`bodyG.scale` ＝身高／171.5），右邊是**放大 2.1 倍的右腿骨**——股骨、髕骨、脛骨、腓骨用 `mesh.clone()` 各配新材質放進 `legIn`（位移到腳底在原點），`legG.scale = (MAG·k^0.82, MAG·k, MAG·k^0.82)`（長度照身高、粗細縮得少一點）。標籤位置用 `legIn.localToWorld`（它的 matrixWorld 已經包含 legG，**不要再套一次 legG**），再加世界座標的左右位移。
  - 四片生長板是比骨頭寬 7% 的發亮圓盤（`CylinderGeometry` 高 1、用 scale.y 當厚度）：位置與半徑用 `worldVerts` 在該高度切片算（股骨遠端 min.y＋4.5 cm、脛骨近端 max.y−3 cm、脛骨遠端 min.y＋3 cm）；股骨頭那片取最上面、最靠中線的頂點平均，沿股骨頸方向 (−0.78, −0.62, 0) 傾斜。`openAt(age)`＝1−smoothstep(14, 17)：厚度 11 mm → 1.6 mm（**畫厚了**）、顏色青綠 → 骨色細線。小火花往「骨幹那一側」移動，數量跟著 `speedAt(age)`。
  - **X 光畫面**（`setXray`）：背景全黑、骨頭 0xe6f1ff 半透明＋自發光、`depthWrite = false`，生長板變成暗色縫隙（軟骨照不出來），閉合後變亮；右欄 2D「生長板裡面」也跟著換色。
  - 身高表 `HT`（2–18 歲每年一個數字）是**一個舉例的孩子**，頁面與 scale 說明都寫明不是標準、不是預測；右欄主要數字是股骨長（身高 × 0.2735，模型的比例）。**Luke 的決定：只講骨頭怎麼長高，不談青春期其他變化、不做「你會長多高」的預測**，健康提醒寫每個人長高的時間不一樣。
  - **早晚身高與臂展是 2D（`initMeasure`）**：早上減晚上的差（> 3 cm 或負值請學生重量）、臂展是身高的百分之幾；不存檔。
  - 查證：NIAMS（生長板在長骨兩端附近、每根長骨至少兩片、是骨頭最後變硬也最脆弱的部分、青春期某個時候閉合成實心骨頭）、Wikipedia〈Epiphyseal plate〉（軟骨細胞分裂堆疊、老的細胞被骨頭取代、閉合後留下骨骺線）、〈Human height〉（100 個孩子從早上起床到下午 4–5 點平均矮 1.54 公分；身高差異 60–80% 來自遺傳）、MedlinePlus（2–10 歲穩定成長、最後一次快速成長在 9–15 歲之間開始）。課文**沒有寫每年長幾公分的數字**（查不到適合直接引用的來源），也沒寫男女閉合年齡。
  - 除錯 `__lab.setAge(歲)`（會暫停）、`setXray(bool)`、`setKnee(bool)`、`setPlaying(bool)`、`heightAt(a)`、`speedAt(a)`、`openAt(a)`、`plates`、`state.hold = true`、`run(秒)`、`render()`。
- 第十七課說話（`voice.js`，`lab.kind = "voice"`，`data-voice-lab`，CSS 前綴 `vc-`；第五批第一課）：沿用第十四課的**剖開頭骨**（頸椎到 T1 也顯示）＋真實舌頭，加上**真實氣管**（organs.glb 新增第七個節點 `trachea`，檔案 37 KB；第十三課腎臟頁要把它隱藏）。下頷骨掛在顳顎關節 pivot（`rotation.x` 正值＝張嘴），舌頭的 pivot 再掛在下巴上（位移＋傾斜，**舌頭不會變形，只是粗略示意**，頁面有註明）；臉的輪廓每次嘴型改變都重建 TubeGeometry（下半部跟著下巴轉、嘴唇嘟起或咬住）。喉頭、會厭、側面的聲帶是自繪（BodyParts3D 沒有喉部軟骨）；脖子前方浮著「從上面看聲帶」的放大圖（兩片在前端相連，無聲時張開、有聲時合起來慢動作振動、音高越高拉得越長）。空氣粒子沿 `path`（氣管中心線是真實氣管頂點切片的平均）走，`P.uG` 是聲帶在路徑上的位置：以上在有聲時變黃並擠成一口一口的；s、f 在牙齒／嘴唇處變成白色亂跳的嘶嘶聲。
  - 五個嘴型 `SHAPES`（ah／ee／oo、s、f）與「聲音」開關：s ↔ z、f ↔ v 只差開關；母音關掉＝氣音。文字在 `lab.shapes`（data-shapes，`on`／`off` 是右欄顯示的音）。音高滑桿 `hzOf(p)`＝90–400 Hz。
  - **「聽聽看」是 WebAudio 合成**（`makeSynth`）：鋸齒波 → 三個並聯帶通（共振峰取 Catford 2001 男聲平均：i 240/2400、u 250/595、ɑ 750/940）；s、f 用帶通雜訊，氣音用雜訊走共振峰。主增益寫死 0.05、按一次最多 5 秒、模型捲出畫面就靜音。
  - **嗡嗡聲檢查與一口氣碼表是 2D（`initBuzz`）**：sss／zzz／fff／vvv 各選有沒有震動；碼表留最近三次。
  - 查證：Wikipedia〈Vocal cords〉（在喉頭、氣管頂端；呼吸時張開、說話時振動；基頻男約 125 Hz、女約 210 Hz、兒童 300 Hz 以上；長度、大小、張力決定音高；把氣流切成一口一口）、〈Voice (phonetics)〉（s/z、f/v 有聲無聲配對、手指放喉頭可摸到 z 的震動、母音通常有聲）。NIDCD 的頁面只有影片與圖，抓不到文字。課文**沒有寫**「用氣音說話反而傷嗓子」（沒查到可引用的來源）。
  - 除錯 `__lab.setShape('ah'|'ee'|'oo'|'s'|'f')`、`setVoiced(bool)`、`setPitch(0–1)`、`setLoud(0–1)`、`setZoom(bool)`、`synth.on`、`state.hold = true`、`run(秒)`、`render()`。
- 第十八課手（`hands.js`，`lab.kind = "hands"`，`data-hands-lab`，CSS 前綴 `hd-`）：真實的右前臂（橈骨、尺骨）與右手 27 塊骨頭，其餘骨頭隱藏。骨頭先照原座標放進 `armG` 做關節，再放進 `flip`：`flip.quaternion` 把手的三軸 A（往拇指側）／L（往指尖）／N（手掌朝向）轉到 +X／+Y／+Z、手腕在原點——**三軸是從骨頭算的**（L＝頭狀骨→中指末節、A＝第五掌骨→第二掌骨對 L 正交化、N＝A×L；原始姿勢手是斜垂的，直接繞 Z 轉 180° 手指會朝鏡頭傾 27°）。關節中心＝相鄰兩骨端點（沿骨頭方向最末 15% 頂點平均）的中點；四指三個巢狀 pivot 繞 A 轉正角＝彎曲，大拇指腕掌關節＝繞 −L（對掌）× 繞 N（彎曲）、掌指與指間繞 N。
  - 肌腱（屈肌橘、伸肌藍）是「掛在各節骨頭／各個 pivot 上的錨點（空的 Object3D）」連成的 CatmullRom 管子，手指一動就重建十條（`rebuildTendons`）；肌肉（前臂掌側、背側、拇指根部）是橢球，`fAct`／`eAct` 讓它變亮變粗（握著＝持續用力，張開的瞬間伸肌亮一下）。
  - 手勢 `POSES`（open／fist／pinch／point／thumb）與「拉一條肌腱」（`state.pulled`，五根手指各自切換，會把手勢重設為張開）。**捏的角度是在瀏覽器裡用格點搜尋讓拇指尖和食指尖距離最小調出來的**（3 mm）：拇指 [0.97, −0.2, 0, 0.5]、食指 [0.75, 0.65, 0.35]。「數骨頭」三個按鈕把腕骨 8／掌骨 5／指骨 14 上色；「把手翻過來」鏡頭繞著手轉到背面（不直直穿過去）。骨頭數的標籤只在手張開時顯示。
  - **拇指挑戰計時卡是 2D（`initThumb`）**：三件事 × 用拇指／貼住拇指，點格子開始、再點停止，算出慢幾倍；不存檔。
  - 查證：Wikipedia〈Hand〉（27 塊＝腕骨 8＋掌骨 5＋指骨 14、拇指兩節；外在肌的肌腹在前臂、手指本身沒有肌肉；對掌的定義；指尖是全身神經末梢最密的地方之一；power grip／precision grip；食指比較能獨立活動）、〈Handedness〉（全球約 90% 右撇子）。scale 說明寫明：真正的前臂約二十條肌肉、多數手指有兩條屈肌腱、關節軸沒這麼單純。
  - 除錯 `__lab.setPose(名稱)`、`pull('f1'…'f5', bool)`、`setGroup('wrist'|'palm'|'fingers')`、`setBack(bool)`、`F[fk].tgt`（直接寫角度後 `render()`）、`F[fk].tip.getWorldPosition()`、`AX`、`state.hold = true`、`run(秒)`、`render()`。
- 第十九課修復（`healing.js`，`lab.kind = "healing"`，`data-healing-lab`，CSS 前綴 `hl-`）：真實的右前臂與右手骨頭（照原座標、手臂垂著）。**骨折用 clippingPlanes 做**：橈骨原本的 mesh 只留斷面以上（`up`），複製一份只留斷面以下（`down`），遠端和手骨掛在 `fragG`（一開始歪 0.14 rad、錯開 6 mm，「對齊」後回正）；兩個 Plane 的 `constant` 隨進度改，斷面縫隙最後合起來。**簡化過的骨幹頂點很稀疏**——估斷面中心與粗細要取上下 3.5 公分內的頂點平均（只取 ±8 mm 會得到 0.6 mm 的半徑，骨痂就小到看不見）。自繪：血塊、白血球、骨痂（有起伏的橢球：粉紅變象牙色、長大再被修小）、石膏（半透明圓筒）、左邊浮著的放大皮膚塊（割縫、血塊、痂、白血球、從底下長上來的新組織、合起來的表皮、淡掉的疤）。
  - 進度 `state.u`（0–4，四個步驟各佔 1：止血／清理／搭補丁／重建），**一切都是 u 的函數**（`apply()`），可來回拖；骨頭和皮膚共用 u、各有時鐘（`boneClock`：小時→天→週→月／年；`skinClock`：分鐘→小時／天→天→週／月）。四個步驟的文字在 `lab.stages`（data-stages，各有 `bone_*`／`skin_*`）。石膏在對齊後出現、硬骨痂長好後消失，可用開關關掉。
  - **癒合日記是 2D（`initDiary`）**：14 格瘀青顏色（點一下換一種：紅紫→藍紫→綠→黃褐→消失，各有一句成因），存 localStorage（`twrses-bruise-diary`）；指甲生長＝兩次距離與天數換算成每月公釐，對照 3.5。
  - 查證：Wikipedia〈Bone healing〉（幾小時內形成血腫、發炎約七天、骨痂、重塑三到四週起可長達三到五年、年輕的骨頭癒合較快）、〈Wound healing〉（幾分鐘內血小板與纖維蛋白、嗜中性球一小時內到、增生期、重塑一年以上、疤最多恢復到 80% 強度）、〈Bruise〉（紅藍＝血紅素、綠＝膽綠素、黃＝膽紅素，約兩週）、〈Nail〉（手指甲每月約 3.5 mm、整片長回來三到六個月、死後指甲不會繼續長）。課文**沒有寫**「癒合的骨頭和原來一樣結實」（沒查到可引用的來源）。用語照科學名詞、畫面用示意色塊，不畫真實傷口（Luke 2026-10-09 同意）。
  - 除錯 `__lab.setU(0–4)`（會暫停）、`setPlaying(bool)`、`boneClock(u)`、`skinClock(u)`、`state.callus`／`castOn`、`state.hold = true`、`run(秒)`、`render()`。
- 第二十課運動（`exercise.js`，`lab.kind = "exercise"`，`data-exercise-lab`，CSS 前綴 `ex-`；第五批最後一課）：**整副真實骨架原地跑步**——兩臂、兩腿掛在巢狀 pivot（肩 ⊃ 肘、髖 ⊃ 膝；繞 X 負角＝往前、膝屈曲為正，同第五課），關節中心用骨頭端點算（股骨頭取最上面 5 公分、靠中線那一半的頂點）；手骨跟著肘、腳骨跟著膝。跑步是簡單的示意：同側手腳相反、膝在擺動期彎得多、手肘越跑越彎、身體微微前傾與上下起伏。自繪：心臟（照顯示的心跳縮放）、兩片肺（照顯示的呼吸起伏）、大腿與小腿的肌肉（掛在髖／膝 pivot 上，越需要氧氣越亮）、心臟到兩腿的血點（畫在身體座標，不跟腿擺）。
  - 模擬：四種速度 `PACE`（rest／walk／jog／sprint）各有心跳、呼吸的目標值（**以約十歲的孩子舉例**：82／108／152／192 與 18／26／40／56）；實際值用一階延遲追上去（上升 3.5 秒、下降 9 秒）——腿馬上變、心肺慢慢跟上、停下來還會喘一陣子（`recover_en/zh` 的文字在心跳還高於 95 時顯示）。右欄折線是最近 60 秒（每 0.25 秒取樣一次，2D canvas）。頁面寫明時間縮短了、數字只是舉例、**不判斷使用者的脈搏正不正常**。
  - **脈搏卡是 2D（`initPulse`）**：15 秒倒數計時＋三個輸入（休息時／剛運動完／兩分鐘後的 15 秒跳數，×4），算出上升多少、兩分鐘後降回百分之幾；訊息固定提醒「只和自己改天的結果比」。
  - 查證：Wikipedia〈Heart rate〉（10 歲以上與成人休息時 60–100、7–9 歲 70–110；頂尖耐力選手 33–50）、〈Exercise physiology〉（工作中的肌肉耗能是休息時的很多倍、流汗散熱）、〈Delayed onset muscle soreness〉（24–72 小時最痠，是離心收縮的微小損傷；乳酸一小時內回到正常，不是原因）、WHO（5–17 歲平均每天至少 60 分鐘中等到激烈的活動；81% 的青少年活動量不足）、國民體育法第 6 條（體育課之外每週在校運動至少 150 分鐘＝SH150）。課文**沒有寫心輸出量的公升數**（這次沒查到可直接引用的數字）。
  - 除錯 `__lab.setPace('rest'|'walk'|'jog'|'sprint')`、`state.hr`／`br`／`need`／`heat`、`J.r.hip` 等 pivot、`state.hold = true`、`run(秒)`、`render()`。
- 第二十一課能量（`energy.js`，`lab.kind = "energy"`，`data-energy-lab`，CSS 前綴 `fu-`；第六批第一課）：淡淡的骨架＋**真實的食道、胃、十二指腸、膽囊**（organs.glb 第六批新增），自繪肝臟（變形的球，往身體左邊變薄；裡面最多 36 顆金色小點＝存糖）、胰臟、盤起來的小腸（半透明，糖的小點在管子裡走）、門靜脈、心臟、往大腦與左大腿肌肉的血管。**L1 椎體前緣在 z ≈ 0.11**，胰臟、門靜脈、小腸都要畫在它前面（z 0.12–0.18），不然會埋進脊椎。
  - 模擬全部是 `model(meal, t)` 的函數（meal＝`meal`／`drink`／`none`，t＝早餐後 0–5 小時）：血糖 `g`（平常＝1，**沒有單位**）、胰島素、肝臟存糖、吸收量、胃裡剩多少。小點的流動用真實時間，和 t 無關，所以暫停看到的是「那個時刻的流量」。右欄的血糖曲線是 2D canvas，三種早餐一起畫（選中的粗、其餘淡，可關）。吞嚥（食團沿真實食道的中心線往下）用真實時間 1.6 秒，選早餐或從頭播放時觸發。
  - **內容界線（Luke 2026-10-09 定案）**：只講「食物 → 能量」和均衡，**不算熱量、不談體重與節食**；含糖飲料只用血糖曲線說明。「含糖飲料之後血糖掉到平常以下」只寫成「有些人會」（依據：Wyatt 2021 的餐後血糖下降研究），沒有寫任何血糖數值。大腦用掉約五分之一能量寫明是**大人休息時**。
  - **餐盤工具是 2D（`initPlate`）**：國健署「我的餐盤」六大類 × 三餐的勾選格，顯示今天吃到幾類、還缺哪幾類和對應的口訣；不打分數。localStorage 鍵 `twrses-body-plate`（只留當天，try/catch）。旁邊固定一行：有人因過敏或家裡的飲食習慣不是每類都吃。
- **多個 session 同時改這個 repo 時，一律在自己的 git worktree 裡做**（2026-10-09 起）：`git worktree add -b <分支> <scratchpad>/wt origin/main`，把 `tools/<系列>/node_modules`、`audio` 用 symlink 接過來、複製 `tools/.r2_uploaded_cache.txt`；預覽在 vault 的 `.claude/launch.json` 加一筆 `python3 -m http.server <port> --directory <worktree>`；做完 `git fetch && git rebase origin/main && git push origin HEAD:main`。原因：未提交的 `data/*.json` 會讓別的 session 的 `python3 build.py` 直接失敗，共用的 `build.py` 也曾被另一個 session 的腳本誤清空。改檔案的腳本要**先讀完、算好、最後才 `open(p, 'w')`**，不要寫成 `open(p,'w').write(f(open(p).read()))`。
- 第四批（第 13–16 課：腎臟、味覺與嗅覺、睡眠、長高）規劃在 Obsidian 課程規劃第九節，四課已全部完成（2026-10-05）。第五批（第 17–20 課：說話、手、修復、運動）規劃在第十節，**四課已全部完成（2026-10-09），人體探索共 20 課，`planned[]` 目前是空的**；要再加課，先在課程規劃定題。
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
- 第十四課腳踏車（`bicycle-balance.js`，`lab.kind = "bike"`，`data-bicycle-lab`，CSS 前綴 `bk-`）：一個機制——車子往一邊倒，前輪就往那邊轉，把車輪帶回車身底下；夠快才接得住，太慢、停著、前輪鎖死都會倒。**沒有人騎**（像真的實驗：推出去、放手、再側推）。車沿 +x 前進、右手邊 +z：車頭方向 ψ 往右為正（`rotation.y = −ψ`）、傾斜 φ 往右為正（`rotation.x = +φ`）、轉向 δ 往右為正（繞後傾的轉向軸轉 −δ）。鏡頭跟車、地面格線以 2 公尺為單位跟著平移、前後輪痕跡各 500 點。
  - `src/bikecalc.js`（**簡化教學模型，不是 Whipple 方程**）：h·φ″ ＝ g·sin φ − (v²/w)·tan δ·cos φ − (b·v/w)·δ′·cos φ；轉向規則 τ·δ′ ＝ K·φ − δ。線性化的穩定條件：v² > g·w/K（約時速 10 公里）且 v < b/τ。**τ 一開始設 0.14 秒，穩定範圍只剩 10–10.8 km/h**（Routh 判據算出上限 b/τ），改成 0.03 秒才涵蓋滑桿的 0–30 km/h。`test/bike.test.mjs`：時速 20 推一下會站直、時速 5 與靜止會倒、前輪鎖死再快也倒、往右倒時 δ 也往右、越快歪得越少。
  - 模擬每格切 10 小步（dt 太大高增益會發散）；3D 的側推比測試大（1.15 rad/s）才看得出來。
  - 卡片 `demo`：fast／slow／locked／still（都會自動側推一下）。
  - 除錯：`document.querySelector('[data-bicycle-lab]').__lab`（`setSpeed(0–30)`、`setLocked(bool)`、`push()`、`standUp()`、`sim`（phi、delta、psi、x、z）、`VC`、`run(秒)`——`state.playing` 要是 true 才會前進、`render()`）。
- 第十五課電梯（`elevator-lift.js`，`lab.kind = "elevator"`，`data-elevator-lab`，CSS 前綴 `ev-`）：一個機制——鋼索繞過頂樓的曳引輪，一頭掛車廂、一頭掛差不多重的平衡錘，馬達只搬「兩邊的重量差」。8 層樓（每層 1.5 單位）、車廂在左、平衡錘在右反向移動；沒人操作時車廂自己隨機跑樓層。
  - `src/elevcalc.js`（示意數字）：車廂 1,000 kg、載重 1,000 kg、每人 70 kg（最多 12 人）、平衡錘＝車廂＋45% 載重＝1,450 kg；6 人時差 30 kg、坐滿差 390 kg、沒有平衡錘 1,840 kg。鋼索全斷：自由落下到 2 m/s 觸發調速機，再以 0.6 g 煞停，模型裡共掉約 0.5–0.6 公尺（只是模型的數字，課文有註明）。
  - 用詞照《建築技術規則建築設備編》：**平衡錘**（不是配重，課文只在第一次出現時加註「也叫配重」）、**鋼索**（不是鋼纜）、安全裝置、調速機。
  - 手機版 `.al-space` 是 `aspect-ratio` 決定大小：**不要在手機斷點設 `min-height`**（會連寬度一起撐大、超出畫面被裁掉，標籤的 narrow 判斷也會失效）；直的場景改 `aspect-ratio: 3 / 4; min-height: 0`。
  - 卡片 `demo`：balanced／full／nocw／cut。除錯：`document.querySelector('[data-elevator-lab]').__lab`（`setPeople(0–12)`、`setFloor(1–8)`、`setCw(bool)`、`cut()`、`fix()`、`run(sec)`、`render()`）。
- 第十六課冰箱（`fridge-cycle.js`，`lab.kind = "fridge"`，`data-fridge-lab`，CSS 前綴 `fr-`）：一個機制——冰箱不製造冷，是把熱搬出去；冷媒繞一圈：1 壓縮機 → 2 背後的散熱管（放熱、變液體）→ 3 毛細管（降壓變冷）→ 4 裡面的蒸發器（蒸發吸熱）。**單元四到此完成。**
  - 透明冰箱，門朝 +z、背面朝 −z，鏡頭在右後方偏側面（太偏後面時散熱管會整片蓋住內部）。冷媒是 170 顆 InstancedMesh：顏色＝冷熱、大小與間距＝氣體或液體（`uOfM()` 用查表把「冷媒量座標」換成路徑位置，所以氣體段自然比較稀、跑得快）。橘色光點＝熱（食物→蒸發器、散熱管→廚房、門開時門外→裡面）。
  - `src/fridgecalc.js`（**簡化模型，不是真冰箱的規格**）：dT/dt = LEAK·(門開×12)·(廚房−T) − (運轉 ? PUMP : 0)，溫控 5.5°C 啟動、2.5°C 停止；1 秒＝模型 4 分鐘。熱的帳用舉例數字「搬 2 份＋電 1 份＝送出 3 份」。門開著時穩定在 23–24°C、壓縮機不停。
  - 卡片 `demo`：normal／door／unplug／hot。除錯：`document.querySelector('[data-fridge-lab]').__lab`（`setRoom(18–36)`、`setDoor(bool)`、`setPlugged(bool)`、`setTemp(°C)`、`run(sec)`、`render()`）。
  - 出處的坑：食藥好文網（article-consumer.fda.gov.tw）連不上，改用 fda.gov.tw 的《藥物食品安全週報》同一篇；能源效率分級的說明用標準檢驗局的 PDF（`curl -k`＋`pdftotext`）。
- 第十七課肥皂（`soap-micelle.js`，`lab.kind = "soap"`，`data-soap-lab`，CSS 前綴 `sp-`，資料在 **`units[4]`「生活化學」**）：一個機制——肥皂分子一頭親水（藍色的頭）、一頭親油（黃色的尾巴）；尾巴插進油污，搓洗把油污拆成小油滴，肥皂把每一滴包成微胞（尾巴朝裡、頭朝外），水帶走。
  - **整個畫面只由（洗法 mode、時間 t）決定**（`draw()` 沒有累積狀態），所以時間滑桿可以來回拉；分子的游動用另一個一直走的 `clock`。分子三個階段用 smoothstep 接起來：在水裡游 → 貼到油污表面（`join` 秒）→ 跟著第 j 顆油滴離開（`releaseTime(mode, j)`）。
  - `src/soapcalc.js`（**示意模型，不是實驗數字**，比例說明有寫）：`cleaned(mode, t) = cap·(1 − e^(−t/τ))`，water 0.03／soap 0.42／scrub 1；搓 5 秒約剩一半、20 秒剩 5%。
  - 卡片 `demo`：water／soap／scrub5／scrub20（後兩個跳到那個時間並暫停）。除錯：`document.querySelector('[data-soap-lab]').__lab`（`setMode('water'|'soap'|'scrub')`、`setTime(0–30)`、`setPlaying(bool)`、`run(sec)`、`render()`）。
  - 查證的坑：水溫要不要熱，美國 CDC 與 WHO 說法不同 → 不寫；洗手步驟與秒數用疾管署自己的頁面（五步驟、七字訣、搓 20 秒、全程 40–60 秒、酒精對腸病毒效果有限）。
- 第十八課麵包（`bread-rise.js`，`lab.kind = "bread"`，`data-bread-lab`，CSS 前綴 `br-`，`units[4]`）：一個機制——酵母（活的真菌）吃糖吐出二氧化碳，有彈性的麵筋把氣體包成氣泡、把麵糰撐大；溫暖快、冷慢、沒有酵母不會發；烤或蒸時氣體再脹一次、麵糰定型，小洞留下。
  - 切開一半的麵糰：後半顆圓頂（SphereGeometry 的 phi 半圈）＋朝鏡頭的半圓切面（CircleGeometry），氣泡、酵母、二氧化碳都是貼在切面上的 InstancedMesh 圓片（z 稍微往前錯開）；`controls` 限制方位角 ±1.2，免得轉到背後看到空的。畫面只由（t、T、yeast、bakeK）決定，時間滑桿可來回拉。
  - `src/breadcalc.js`（**示意模型，不是食譜**）：`rate(T)` 每高 10°C 快一倍（只算 5–40°C）、`size()` 1→最多 2 倍、送去烤再乘 1.15；1 秒＝6 分鐘。
  - **酵母幾度會死沒有可靠出處，所以課文與模型都不寫那個數字**（滑桿只到 40°C）；課文只用「溫水約 40–45°C 叫醒乾酵母」（Wikipedia Proofing）。蘇打餅乾常含酵母，對照物改用水餃皮。
  - 卡片 `demo`：warm／fridge／noyeast／bake。除錯：`document.querySelector('[data-bread-lab]').__lab`（`setTime(0–90)`、`setTemp(5–40)`、`setYeast(bool)`、`bake()`、`reset()`、`run(sec)`、`render()`）。
- 第十九課生鏽（`iron-rust.js`，`lab.kind = "rust"`，`data-rust-lab`，CSS 前綴 `rt-`（`ru-`／`rs-` 已被 search.css 用掉），`units[4]`）：一個機制——鐵＋氧＋水三樣到齊才生鏽；鹽讓它變快；鐵鏽又鬆又會剝落，底下的鐵接著鏽；油漆擋住水和氧，鍍鋅刮傷了鋅還是會保護鐵。
  - 兩層鐵原子（16×9 的 InstancedMesh，`setColorAt` 逐顆由灰變紅褐、脹大、剝落）、一滴水、鹽粒、空氣裡的氧分子（成對紅球，有水又有露出的鐵時一半會鑽進水滴）、旁邊堆起來的鏽屑、油漆／鍍鋅層（中間留一道刮痕）。畫面只由（t、water、air、salt、coat）決定，時間滑桿可來回拉。
  - `src/rustcalc.js`（**示意模型**）：`speed()` 沒水或沒空氣＝0、鹽水＝3 倍；`exposed(coat)` none 1／paint 0／scratch 0.2／zinc 0；「天」只是模型裡的時間，比例說明有寫。
  - 右上角三格清單（鐵／氧／水）顯示哪幾樣「碰得到鐵」——上了漆時氧和水都算碰不到。
  - 卡片 `demo`：wet／salt／dry／scratch。除錯：`document.querySelector('[data-rust-lab]').__lab`（`set({water, air, salt, coat})`、`setTime(0–60)`、`setCoat('none'|'paint'|'scratch'|'zinc')`、`setFlag('water'|'air'|'salt', bool)`、`run(sec)`、`render()`）。
- 第二十課微波爐（`microwave-oven.js`，`lab.kind = "microwave"`，`data-microwave-lab`，CSS 前綴 `mcw-`（`mw-` 是天文銀河、`mo-` 是 astro.css 的），slug `microwave-oven`，`units[4]`）：一個機制——微波在金屬箱子裡反射，讓食物裡的水分子來回轉動而生熱；箱子裡有熱點和冷點所以要轉盤；冰吸收得少、乾盤子幾乎不吸收、金屬尖端冒火花。**全系列 20 課到此完成。**
  - 1 單位＝10 公分；爐腔門朝 +z、磁控管在右邊、頂蓋半透明。黃色三條線是駐波（振幅＝圖樣×cos ωt，節點不動）、底板的橘色光點是強度圖、左後方的泡泡是放大的水分子（冰的時候幾乎不動）。食物 19 顆，顏色＝溫度（藍→綠→黃→橘→紅）。
  - `src/microcalc.js`（**示意模型**）：`intensity(x, z) = 4·sin²(kx+φ)·sin²(kz+φ)`（公分；熱點相隔半波長 6.1 公分，測試順便檢查 12.2 cm × 2.45 GHz ≈ 光速）；`tempAt()` 對轉盤上的點沿圓周積分；food／ice／plate 的吸收比 1／0.12／0.03。溫度只由（item、t、turn）決定，時間滑桿可來回拉。轉盤角度：`table.rotation.y = −角度`，才會和 microcalc 的座標一致。
  - 卡片 `demo`：food／noturn／ice／fork。除錯：`document.querySelector('[data-microwave-lab]').__lab`（`setItem('food'|'ice'|'plate'|'fork')`、`setFlag('turn'|'waves', bool)`、`setTime(0–120)`、`restart()`、`run(sec)`、`render()`）。
  - 台灣出處：食藥署「食藥闢謠專區」（2.45 GHz、每秒約 25 億次、不殘留放射性、帶殼蛋／密封／尖銳金屬）、國健署（不會使食物具有放射性）。
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
- 第五課奈米與埃米（`chip-scale.js`，`lab.kind = "scale"`，`data-chipscale-lab`，CSS `cp-sc-`／小工具 `cp-nl-`；單元二第三課，slug `nanometer`）：一個機制——十的次方縮放，從指甲（約 1 cm）放大四千多萬倍到矽原子（約 0.24 nm＝2.4 Å）；「3 奈米」是世代的名字，不是量出來的長度。
  - **鏡頭不動，改每一站那組物件的 scale**（＝真實大小 ÷ 畫面寬度 × 10 單位），所以沒有浮點精度問題；畫面只由縮放值 z（0–1，對數）決定。八站：指甲、頭髮、紅血球、細菌、流感病毒、晶片上的線（1 單位＝24 nm 線距，另有一條 3 nm 的黃色小橫槓）、DNA、矽原子（另有 1 Å 橫槓）。物件長到塞滿畫面就往下沉（頂面變地板、地板換成它的顏色）、再淡出；比它小的下一站先站在旁邊，等它沉下去才移到中間（`TOP`、`SIDE`、`offX／offZ`）。OrbitControls 關掉縮放與平移（這一課的「放大」是換尺度）。
  - 「目前在哪一站」＝各站佔畫面比例最接近自己目標比例（`FRAC`）的那一個；不要用「大於某個比例的最小那個」（第一版紅血球站會顯示成細菌）。
  - `src/scalecalc.js`：`STOPS`、`viewWidth(z)`／`zoomOf`／`zoomForStop`、`fmtLen`（cm／mm／µm／nm，1 nm 以下加註 Å；中文用「埃米」）、`scaleBar`（1、2、5 × 10ⁿ）、指甲 3.5 mm／月 ≈ 1.33 nm／秒、`cutsToReach`（A4 長邊 297 mm 對半剪 29 次才不到 1 nm）、`NODES`（IRDS 2021：3 nm→閘極間距 48／金屬間距 24；2 nm→45／20）。`test/scale.test.mjs` 會讀 data 檢查 `nail.mm_per_month` 與 `lab.stops` 的順序。
  - 頁面下方「你的指甲長了多少？」（`nail`，`data-chip-nail`，`initNail()` 在同一支 bundle）：打開頁面起算的奈米數與相當於幾顆矽原子、1 秒／分／時／天／年各長多少（自動找大小相近的一站來比）、A4 紙對半剪 0–30 次的滑桿。
  - 查證過（2026-10）：埃米 10⁻¹⁰ m、得名於埃格斯特朗（1814–1874）、1868 太陽光譜圖、不屬於 SI；nano 源自希臘文「矮人」、1960 成為字首；頭髮 17–181 µm（常取 75）；紅血球 6.2–8.2 µm；大腸桿菌長約 2.0 µm；流感病毒 80–120 nm；DNA 寬 22–26 Å；矽共價半徑 117.6 pm；指甲每月約 3.5 mm（Yaemsiri 2010）；光學顯微鏡極限約 200 nm；Intel 20A／18A（2021，A＝angstrom）、台積電 A16（2024/4/24 新聞稿，預計 2026 生產）——以上除台積電新聞稿外皆經 Wikipedia。**沒寫**：A4 紙的厚度（查不到可靠來源，所以活動改成剪「長度」）、指甲寬度（「約 1 公分」標明是取整數）。
  - 卡片 `demo`：hair／virus／line／atom（任何一站的 key 都可以）。除錯：`document.querySelector('[data-chipscale-lab]').__lab`（`goStop(0–7, 立即?)`、`setZoom(0–1, 立即?)`、`times10(±1)`、`setPlaying(bool)`、`stops`、`STOP_Z`、`run(秒)`、`render()`）；小工具 `document.querySelector('[data-chip-nail]').__nail`（`setSpan('s'|'min'|'h'|'d'|'y')`、`setCut(n)`）。
- 第六課先進封裝（`chip-package.js`，`lab.kind = "package"`，`data-chippackage-lab`，CSS `cp-pk-`／小工具 `cp-pkw-`；**單元三第一課，資料在 `units[2]`**，slug `chip-stacking`）：一個機制——晶片之間的路越短越快越省電；三種放法：分開焊在板子上、並排放在中介層上（2.5D）、疊起來用矽穿孔連（3D）。
  - 三個視角共用電路板：`gBoard`（三個各自封裝的晶片＋板上的金線）與 `gPack`（錫球、基板、凸塊、中介層、微凸塊、運算晶片、記憶體）；並排和疊起來用 `state.k`（0→1）過渡（攤平的 4 顆縮掉、兩疊各 8 層長出來、TSV 柱跟著高度伸長）。「拆開來看」滑桿＝爆炸圖（每層的 y 加上 `g × 層次`）。資料小點沿折線走（`along()`）。
  - `src/packcalc.js`：三種放法的路程 **3 cm／3 mm／0.4 mm 是示例值**（面板與比例說明都標明 example）；長條用對數刻度（`barFrac`）；`dieCount`；`FIELD_MM2` = 26 × 33 = 858。`test/package.test.mjs` 會讀 data 的 `pack.max_layers` 與 `lab.msgs`。
  - 頁面下方「一個封裝裡有幾顆晶片？」（`pack`，`data-chip-pack`，2D canvas，`initPack()`）：運算晶片 1–2 顆、記憶體 0–8 疊、每疊 1／4／8／12／16 層 → 總顆數與俯視圖。
  - 查證過（2026-10，皆 Wikipedia）：封裝是製造的最後階段（保護＋連接），之後測試；2.5D＝晶粒並排在矽中介層上、並排可減少積熱、chiplet 像樂高、CoWoS＝台積電的 Chip-on-Wafer-on-Substrate；3D＝疊到 16 顆以上、TSV、線短省電；覆晶 1960 年代 IBM；日月光 1984 年在高雄設第一座廠、總部高雄、依 Gartner 是最大的 OSAT。**沒寫**：市占百分比（年份不明）、任何 AI 產品的實際晶片數與尺寸。
  - 卡片 `demo`：board／side／stack／explode。除錯：`document.querySelector('[data-chippackage-lab]').__lab`（`setMode('board'|'side'|'stack')`、`setExplode(0–1)`、`setPlaying(bool)`、`run(秒)`、`render()`）；小工具 `document.querySelector('[data-chip-pack]').__pack`。
- 第七課 HBM（`chip-hbm.js`，`lab.kind = "hbm"`，`data-chiphbm-lab`，CSS `cp-hb-`／小工具 `cp-bd-`；單元三第二課，slug `hbm`）：一個機制——運算晶片常在等資料；HBM 把記憶體疊成塔（矽穿孔當電梯）、緊貼運算晶片、用上千條資料線相連，像又寬又短的高速公路。頻寬＝車道數 × 車速。
  - 兩個視角用 `state.k` 過渡：`far` 一般記憶體（四顆封裝在板子另一頭，路長、畫 1 個車道）、`hbm`（堆疊在旁邊，**每 64 條資料線畫 1 個車道**：1,024 → 16、2,048 → 32）。世代按鈕 HBM／HBM2／HBM3／HBM4 改層數、車道數、車速（`g.gbps / 2.4`）。車子是 InstancedMesh（單雙車道方向相反＝讀與寫），堆疊裡另有沿矽穿孔上下的小方塊。
  - `src/hbmcalc.js`：`GENS`（bits／gbps／dies／year，數字來自 Wikipedia “High Bandwidth Memory” 的規格表）、`bandwidth` = bits × gbps ÷ 8 → 128／307／819／2,048 GB/s、`GDDR_BITS` = 32、`moviesPerSecond`（每部 5 GB 是示例）、`homeSeconds`（家用網路 100 Mb/s 或 1 Gb/s 是示例）、`fmtDuration`。`test/hbm.test.mjs` 會讀 data 的 `band.movie_gb` 與 `lab.gens`。
  - 頁面下方「一秒搬幾部電影？」（`band`，`data-chip-band`，`initBand()`）：世代、幾疊（1–8）、家用網路速度 → 每秒幾部、每秒幾 GB、家裡的網路要傳多久。
  - 查證過（2026-10，皆 Wikipedia “High Bandwidth Memory”）：最早由三星、AMD、SK 海力士開發；JEDEC 2013/10 訂為標準、HBM2 2016/1、HBM3 2022/1、HBM4 2025/4；一疊 1,024 位元（HBM4 2,048）；層數 4／8／12／16；GDDR 每顆 32 位元；高效能 GPU 通常用四到六疊；2025 年最大製造商 SK 海力士、三星、美光。**沒寫**：市占、價格、哪一款 AI 晶片用了幾疊、台積電做 base die（來源是 Substack）、「幾公釐長」這類沒有出處的距離。
  - 卡片 `demo`：far／hbm1／hbm3／hbm4。除錯：`document.querySelector('[data-chiphbm-lab]').__lab`（`setView('far'|'hbm')`、`setGen('hbm1'…'hbm4')`、`setPlaying(bool)`、`run(秒)`、`render()`）；小工具 `document.querySelector('[data-chip-band]').__band`。
- 第八課晶片島（`chip-island.js`，`lab.kind = "island"`，`data-chipisland-lab`，CSS `cp-is-`／小遊戲 `cp-who-`；單元三第三課，slug `chip-island`）：一個機制——做晶片分三段（設計、製造、封裝測試），由不同公司各做一段（晶圓代工模式，1987）；台灣三段都有、又集中在幾個科學園區。**全系列 8 課到此完成。**
  - 台灣地圖是 `islandcalc.js` 的 `OUTLINE`（22 個經緯度點的**簡化輪廓**，不是測量資料）用 `Shape`＋`ExtrudeGeometry` 擠出來，`rotation.x = −π/2`（Shape 的 y＝−場景 z，所以北在畫面上方）；`project(lon, lat)` 是等距圓柱投影。圖釘：新竹、台中、台南、高雄＋小小的彰化（給彰化的學生找自己）。
  - 兩個視角：`journey`（發亮的晶片沿弧線走：1 設計在新竹 → 2 製造到台南 → 3 封裝測試到高雄 → 4 飛向畫面右上角「全世界」；可播放全程）與 `time`（年份滑桿 1970–2005，那一年以前有事件的地點才出現圖釘，右側事件清單逐一亮起，點事件會跳到那一年）。步驟與事件的文字在 `lab.steps`、`lab.events`，由 build.py 畫成面板；`data-steps` 只傳短名給 3D 標籤。
  - `src/islandcalc.js`：`km()` 大圓距離（新竹—台南 201、台南—高雄 42，測試鎖住）、`EVENTS`（1973 工研院、1976 RCA、1980 聯電與竹科、1984 日月光、1987 台積電、1995 南科計畫核定、2003 中科啟用）、`ROLES` 與 `score`。`test/island.test.mjs` 會讀 data 檢查事件年份與小遊戲的公司名單。
  - 頁面下方「誰做哪一段？」（`who`，`data-chip-who`，`initWho()`）：七家公司選設計／製造／封裝測試（台積電、聯電＝製造；聯發科、輝達、高通、超微＝設計；日月光＝封測），全對顯示說明。
  - 查證過（2026-10，皆 Wikipedia）：工研院 1973；1974 年孫運璿、潘文淵等人的會議；1976 RCA 技轉、四組工程師受訓、示範工廠良率高於 RCA；聯電 1980/5/22、台灣第一家半導體公司；竹科 1980/12/15、1976 年仿矽谷的構想、2024/12 有 584 家；台積電 1987、政府＋工研院＋民間合資、第一家專業晶圓代工；張忠謀在德儀 25 年；聯發科 1997 新竹、fabless；南科計畫 1995/5 核定（進駐廠商有台積電、聯電）；中科 2003 啟用。**沒寫**：任何市占百分比、產值、股價、地緣政治；「那批工程師後來當了老闆」「很多人不看好」「不和客戶競爭」這類沒有在出處裡的說法；車程時間。
  - 卡片 `demo`：design／make／pack／time。除錯：`document.querySelector('[data-chipisland-lab]').__lab`（`setView('journey'|'time')`、`setStep(0–3, 立即?)`、`setTour(bool)`、`setYear(1970–2005)`、`run(秒)`、`render()`）；小遊戲 `document.querySelector('[data-chip-who]').__who`。
- 第九課晶片發熱（`chip-heat.js`，`lab.kind = "heat"`，`data-chipheat-lab`，CSS `cp-ht-`／小工具 `cp-vf-`；**單元四「真實世界裡的晶片」（`key: "world"`，第二批 9–12 課）第一課**，slug `chip-heat`）：一個機制——電晶體每開關一次都花一點能量，電能全變成熱；越忙越熱，熱要靠散熱片（鰭片＝大表面）和風扇（把熱空氣吹走）帶走，帶不走晶片就自己降速。
  - 模型：電路板上一顆晶片，顏色＝溫度（`RAMP` 藍→紅），橘色小點＝熱（InstancedMesh，數量跟功率走；有散熱片時走在鰭片之間，有風扇時在頂端被吹散）。右欄選工作量（idle／video／game）與散熱（none／sink／fan）。溫度與降速用 `heatcalc.js` 的一階模型：`steadyTemp = 25 + 功率 × COOLERS`、時間常數 `TAU`、超過 `LIMIT`（95°C）速度往下掉（−0.7/s）、涼了慢慢回升（+0.06/s）。**全部是示例數字**（比例說明寫明），不是任何真實晶片。模型時間走 3 倍快。測試用 `__lab.run(秒)` 快轉。
  - 頁面下方「電壓與速度」（`vf`、`_chip_vf`、`initVf`，不需要 WebGL）：兩條滑桿＋三個例子，`relPower = V² × f`（維基 Processor power dissipation 的 P = C·V²·f；漏電沒算，註記寫明）。
  - 查證過（2026-10，全部維基英文）：Processor power dissipation（電能變熱、P=CV²f、三種耗電、降頻與自動關機）；Heat sink（表面積、鋁或銅）；Thermal paste（填空氣縫隙）；Computer cooling（風扇排熱空氣、手機幾乎沒有主動散熱而用降頻、Cray-1 115 kW、Cray-2 泡 Fluorinert）；Dennard scaling（1974 論文、約 2005 功耗牆、轉向多核心）；Voltage and frequency scaling（省電、延長電池）；Junction temperature（上限寫在規格書）。**沒寫的**：任何實際晶片的溫度上限或瓦數、時脈 GHz 數字（沒有要用就不查）。
- 第十課 AI 晶片（`chip-ai.js`，`lab.kind = "aichip"`，`data-chipai-lab`，CSS `cp-ai-`／小工具 `cp-amd-`；單元四第二課，slug `ai-chip`）：一個機制——CPU 是少數幾個又快又全能的核心、一步接一步；GPU／AI 晶片是幾百幾千個簡單小單元同時做一樣的小事。工作能分工（畫圖、AI 的大量乘加）→ 人多的贏；一定要照順序 → 快的核心贏。
  - 模型：後面一面 24×24 的板子（工作），前面一顆晶片（CPU 4 個大核心／GPU 576 個小單元，InstancedMesh）。兩種工作：`paint`（576 格互不相干，像素畫由 `picture(c, r)` 算）與 `chain`（48 步蛇形、一次只能一個單元做）。進度只由 `(job, chip, t)` 決定（`aicalc.js` 的 `done`）：CPU 四核心各管六列（`order = idx*4 + band`），GPU 用固定的亂數排名 `RANK`。**速度全是示例**（CPU 核心 12 格／秒、GPU 單元 1 格／秒 → 畫圖 12 s 對 1 s、一串 4 s 對 48 s），比例說明寫明。做完自動停，播放鈕變「再跑一次」。測試用 `__lab.seek(t)`。
  - 頁面下方「幫手越多就越快嗎？」（`amd`、`_chip_amd`、`initAmd`）：阿姆達爾定律 `1/((1−p)+p/n)`，n＝2 的 0–10 次方；測試鎖住維基的兩個例子（50% → 2 倍、95% → 20 倍）。
  - 查證過（2026-10，維基英文）：Central processing unit、Multi-core processor、Graphics processing unit（幾百到幾千個運算單元、1990 年代出現）、GeForce 256（1999-10-11，「world's first GPU」是行銷用語，課文寫「sold as」）、AlexNet（2012；兩張 GTX 580、五到六天、120 萬張圖、6,000 萬參數、top-5 15.3%）、Neural processing unit（手機晶片裡有、加法乘法）、Tensor Processing Unit（Google 2015 內部使用）、Amdahl's law（1967）。**沒寫的**：任何現役產品的核心數、算力、價格、市占；「GPU 成為 AI 的主力」改成「被廣泛使用」。
- 第十一課晶圓廠的水和電（`chip-fab.js`，`lab.kind = "fab"`，`data-chipfab-lab`，CSS `cp-fb-`／小工具 `cp-cl-`；單元四第三課，slug `fab-water-power`）：一個機制——線路比灰塵小得多，所以一切要乾淨到極點，而乾淨靠水（超純水一遍遍沖洗晶圓，用過的回收）和電（風扇濾網不停換氣、溫濕度控制、機台本身）。
  - 模型：剖開的小晶圓廠。`PATHS` 五條水路（intake／pure／used／back／drain），每條最多 `PER` 滴，顯示幾滴由 `frac(r)` 決定（intake 與 drain ∝ 1−r，back ∝ r）；回收率滑桿 0–90%（預設 85%，出自維基 TSMC 條目的「可回收 85% 以上」，比例說明寫明是一家公司的說法）。「電」視角：空氣微粒由天花板落到地板（層流示意），三個按鈕（air／cool／tools）讓對應的零件發亮；右欄 DUV 0.13 MW 對 EUV 1.31 MW 的長條。
  - 頁面下方「多乾淨才算乾淨？」（`clean`、`_chip_clean`、`initClean`）：ISO 14644-1 的 0.5 微米上限表（`fabcalc.js` 的 `ISO`，9 級到 3 級），canvas 畫點（一點＝10,000 顆，ISO 9 畫 3,520 點）。
  - 查證過（2026-10，維基英文）：Ultrapure water（半導體要求最嚴、沖洗晶圓、三階段、電阻率 18.18 MΩ·cm、先進廠每天數百萬加侖、再生水當原料）；Semiconductor device fabrication（微粒只要線寬 1/5 就是致命缺陷）；Cleanroom（都市空氣 3,500 萬顆／m³＝ISO 9、ISO 表、半導體常用 7 或 5 級、HEPA／ULPA 循環、Whitfield 1960）；Semiconductor fabrication plant（屋頂空調、FFU）；EUV lithography（1.31 MW 對 0.13 MW，2020 量測）；TSMC（回收 85% 以上）；RCA clean（Werner Kern 1965）。**沒寫的**：任何一座廠或一家公司的總用水量、總用電量、占全台比例（數字會變、也容易變成爭議）；「足球場大」「幾百部機台」「24 小時運轉」（沒查到出處，寫了又刪）；缺水、限電等時事。
- 第十二課 LED（`chip-led.js`，`lab.kind = "led"`，`data-chipled-lab`，CSS `cp-ld-`／小工具 `cp-rgb-`；單元四第四課，slug `led`）：一個機制——LED 是會發光的 p–n 接面：順向接電，n 型的電子和 p 型的電洞被推到接面相遇，電子掉進電洞、多出來的能量變成光子；能量落差（能隙）越大光越藍。反過來接不亮（二極體）。白光＝藍光 LED＋黃色螢光粉。**第二批 9–12 課到此完成，全系列 12 課。**
  - 模型：放大的晶粒（下 n 型、上 p 型、中間接面）＋電池與兩條線。電子／電洞／光子都是 InstancedMesh，位置只由 `clock` 與 `mode`（on／reverse／off）決定；亮度 `state.k` 緩變。白光模式多一個半球螢光粉罩，一半的光子飛出罩外變黃。右欄：四個顏色、三種接法、小燈（CSS 發光）、波長／光子能量（`ledcalc.js` 的 `eV = 1239.84/nm`）／材料。波長 630／525／465 nm 是落在維基範圍內的**示例**（測試鎖住範圍）。窄螢幕上 p、n 標籤改放晶粒正面上下，接面標籤不顯示。
  - 頁面下方「三顆 LED，一個像素」（`rgb`、`_chip_rgb`、`initRgb`）：三條滑桿加法混色，`mixName` 以 50% 為界給八種說明（文字在 JSON 的 `rgb.names`，測試檢查 presets 的 key 與 mixName 一致）。
  - 查證過（2026-10，維基英文）：Light-emitting diode（原理、能隙決定顏色、各色波長範圍與材料、Losev 1927、早期只有紅光當指示燈、藍光 LED 與 2014 諾貝爾獎、白光兩種做法、比白熾燈省電）；Nick Holonyak（1962，GE）；Shuji Nakamura；Diode；RGB color model；LED lamp。**沒寫的**：為什麼矽不適合做 LED（沒查到適合引用的句子）、LED 的發光效率數字與壽命小時數、任何廠商與市占；H. J. Round 1907 只在資訊框出現，沒寫進課文；「比沙粒小」「每秒幾十億顆光子」寫了又刪。
- 共用工具 `tools/chips/src/common.js`：`labeler`、`lazyBoot`、`canvasTex`、`glowTex`、`polyline`（電線裡的電子沿弧長走）、`tube`。第一課的 chip-doping.js 還是自己寫一份（沒改動），新課用 common.js 的。新入口要加進 `package.json` 的 build 與 test。
- 和萬物原理互相連結：第一課的 `links` 連第三課太陽能板（電子與電洞）；第二課連萬物原理第八課（computer-memory，0 與 1、DRAM），不重講。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/semiconductors/<slug> --out audio/say-<slug>` → `python3 tools/upload_say_dir.py assets/data/say/semiconductors-<slug>.json audio/say-<slug>`（manifest 命名 `semiconductors-<slug>`；`gen_audio.py` 的 SHORT_PAGES 已加本系列）。worktree 裡先把 `~/Developer/repos/twrses/tools/.r2_uploaded_cache.txt` 複製過來，做完 `sort -u` 合併回去。
- 課程規劃在 Obsidian：`第二大腦/創作庫/半導體科普課程規劃（twrses）.md`（四單元十二課：第一批 1–8、第二批單元四 9–12，2026-10-08 全部完成；待查證清單、交接指令）；系列索引 `第二大腦/英文學習/晶片與半導體（twrses.org）.md`。

---

## 地球與天氣 Earth and Weather（/resources/classes/earth/）— 架構照晶片與半導體，加課不用改 build 函式

- 內容：`data/earth.json`：`units[]`（四個單元：腳下的地／頭上的天／水與海／變動中的地球）底下 `lessons[]` 與 `planned[]`（「製作中」卡，做一課就從 planned 移到 lessons）；課次 `n` 全系列連號（1–16），**不是照製作順序**（試作課是第 2 課，課程卡與上下課導覽都照 `n` 排）。課程規劃（每課的 Big idea、3D、鉤子、待查證清單、寫法原則）在 Obsidian：`第二大腦/創作庫/地球與天氣科普課程規劃（twrses）.md`；系列索引 `第二大腦/英文學習/地球與天氣（twrses.org）.md`。
- 頁面：`build.py` 的 `build_earth_hub()`／`build_earth_lesson()`／`_earth_head()`／`_earth_nav()`。樣式載三個檔：`astro.css`（面板）、`chips.css`（卡片、數字、小工具外框的 `cp-*` 類別，直接沿用）、`earth.css`（本系列多出來的，**前綴 `ew-`**；`ea-` 已被人體探索的耳朵用掉）。
- **和晶片系列不同：加課只要登記三個表**——`_EARTH_JS`（`lab.kind` → bundle）、`_EARTH_LAB`（`lab.kind` → 3D 面板的 render 函式）、`_EARTH_ICON`（`lesson.card` → 課程卡小圖示）；頁面小工具登記在 `_EARTH_WIDGETS`（`[(JSON 的 key, render 函式)]`）。口訣標題（`tricks_head`）、安全提醒標題（`safety_head`，可帶 `src`／`url`／`src_en`／`src_zh` 註明照哪個官方單位）、查證年月（`checked`）都寫在 JSON。`links` 可放 `soon: true` 的預告卡（沒有 href，虛線框「製作中」）。
- 3D：原始碼在 `tools/earth/src/`（自己的 `package.json`，three 0.186.1＋esbuild；`common.js` 從 chips 抄來，不要 import 別的 tools 資料夾）。`cd tools/earth && npm ci && npm run build && npm test`。新入口要加進 `package.json` 的 build 與 test。bundle 名 `earth-*`。
- 錄音：`python3 tools/gen_audio.py --page resources/classes/earth/<slug> --out audio/say-<slug>` → `python3 tools/upload_say_dir.py assets/data/say/earth-<slug>.json audio/say-<slug>`（`gen_audio.py` 的 `SHORT_PAGES` 已加 `resources/classes/earth`）。
- **寫法原則**：數字首選中央氣象署（地震百問是靜態頁，`https://scweb.cwa.gov.tw/zh-TW/Guidance/FAQdetail/<id>`，id 和題號不完全一樣，出處連結用 id）、消防署消防防災館（`tfdp.com.tw`）；查不到或兩個官方說法不同就不寫。防災要點只照官方。不寫傷亡數字。示例數字在比例說明標明。
- 第一課地球內部（`earth-inside.js`，`lab.kind = "inside"`，`data-earthinside-lab`，CSS `ew-in-`／小工具 `ew-dg-`；單元一，slug `inside-the-earth`；課程卡小圖示沿用系列的 `earthglobe_svg`）：一個機制——地球四層（地殼／地函／液態外核／固態內核）；沒人下去過，是靠地震波聽出來的（S 波穿不過液體、P 波被地核折彎留下陰影帶）。
  - 模型：切成一半的地球，切面上四個同心圓。**地函、外核、內核照真實比例**（`insidecalc.js` 的 `LAYERS`：17／2900／5120／6371 公里，全是氣象署地震百問 2 的數字），**地殼畫厚約十倍**（`CRUST_DRAW`；`drawR()` 把 0–17 公里對到那一圈）。兩個視角：`layers`（深度滑桿是非線性的 `depthOf(u) = R·(u/1000)^2.2`，靠近地表比較細；四個站按鈕；播放＝自動往下走）、`waves`（切面上的 P、S 射線與外圈三段色帶 0–103°／103–143° 陰影帶／143° 以上）。**射線是簡化的**：直達波用二次貝茲曲線（控制點拉到弦中點的 0.75，剛好讓掠過地核的那條落在 103°），穿過地核的 P 波是三段折線，都是示意，比例說明寫明。窄螢幕把 `TARGET.y` 往上移讓出視角按鈕。
  - 頁面下方「要走多久？」（`dig`、`_earth_dig`、`initDig`）：四種示例速度（5／100／300／900 km/h）走過每一層的時間；重點是地殼只要幾分鐘。
  - 查證過（2026-10）：地震百問 2（各層深度、厚度、成分、地函占體積 83%）、3（質量體積表）、7（每 30 公尺約 1°C、地函 2,000–3,000°C）、24（陰影帶 103°–143°）；維基英文 Shadow zone（S 波停在液態外核）、Kola Superdeep Borehole（1979 起最深、1989 年 12,262 m、180°C 停鑽）、Mohorovičić discontinuity（1909）、Earth's inner core（Lehmann 1936、紐西蘭地震、因高壓而固態）、Earth's magnetic field（外核流動產生磁場）。**沒寫的**：地心溫度的數字（氣象署寫約 7,000°C，維基寫內核表面約 5,400°C，兩邊不同，只寫「好幾千度」）；地殼分海洋與大陸的成分細節。
- 第三課規模與震度（`earth-shake.js`，`lab.kind = "shake"`，`data-earthshake-lab`，CSS `ew-sk-`／小工具 `ew-sc-`；單元一，slug `magnitude-and-intensity`）：一個機制——規模＝一個地震放出多少能量（只有一個數字、不加「級」）；震度＝某個地方搖得多厲害（每個地方不同，離得越遠越小；同規模越淺越強）。
  - 模型：簡化的台灣地圖（`shakecalc.js` 的 `OUTLINE`／`project`／`km` 從 chips 的 islandcalc 抄來）、十個城市的柱子（高度與顏色＝震度）、三個**虛構的示例震央**（east／central／southwest）、規模滑桿 4.0–7.5、深度滑桿 5–100 公里；地表的等震度圈（`ringKm()`）、半透明海面底下的震源球。右欄列出十個城市的震度。
  - **震度是用示例公式算的**：`accel(M, r) = 10^(0.5M − 1.6·log10(r+10) + K0)`（`K0 = 1.6`，自己訂的衰減式，不是氣象署的），再用氣象署的關係式 `I = 2(log α + 0.6)`（地震百問 36）換成震度；5、6 級各從中間分弱、強（示例）。比例說明寫明「示例、不是預測；真的震度是儀器量的，不是整齊的圓」。`LV_COLORS` 是自己配的，不是氣象署色票。
  - 頁面下方「每一級震度是什麼感覺？」（`scale10`、`_earth_scale10`、`initScale`）：十個級別的官方描述。**中文是氣象署「地震震度分級表」原文（地震百問 35），英文是本站翻譯**（註記寫明）。
  - 查證過（2026-10）：地震百問 13、14（同規模越淺破壞力越大）、25（規模只有一個值、無單位不加「級」、+1 振幅 10 倍能量約 32 倍）、26（芮氏 1935）、27（集集 ML 7.3／Mw 7.7、「1.78 公尺與 178 公分」）、29、30、31（2.5 可察覺、7.0 全球測站收得到）、33（微小／小／中／大）、35（震度定義與分級表）、36、37（等震度線不規則）、39（迅速遞減＝淺）。**沒寫的**：分級表改成十級的年份（沒抓到官方公告原文）；各級對應的加速度／速度門檻。
- 第四課造山（`earth-mountain.js`，`lab.kind = "mountain"`，`data-earthmountain-lab`，CSS `ew-mt-`／小工具 `ew-pk-`；單元一，slug `taiwan-mountains`）：一個機制——板塊把海底的泥沙擠成一堆、往上推（抬升），雨水和河流同時把山削下來（侵蝕），削下來的泥沙鋪成平原；山多高是兩邊拉鋸的結果。
  - 模型：剖開的地殼（和第二課一樣用格點面：正面地層＋頂面照高度上色）、薄薄一層海面（**不要用整個半透明的方塊當海**，會和地層正面重疊出現摩爾紋）、雨（InstancedMesh）、順坡往左流的泥沙、玉山高度的黃線。時間用百萬年走（`MYR_PER_S`）。右欄：抬升速度四檔（`PUSH`：0／2.5／5／7.5 公釐／年）、侵蝕三檔（`mtcalc.js` 的 `EROSION`）、「從頭來」按鈕（會把兩個設定也恢復預設）。
  - **高度模型是示例**：`dH/dt = U − k·H`（山越高削得越快），解析解 `heightAt()`；中等侵蝕 `k = 1.25` 時穩定在 4 公里，海底原本在海面下 0.1 公里（`SEA_KM`），所以山頂約 3,900 公尺，接近玉山。**只有「每年 5 公釐」有出處**，其餘是示例（比例說明寫明）。垂直方向誇大約十倍（`VS`）。測試用 `__lab.run(秒)`、`restart()`、`set({ push, rain })`。
  - 頁面下方「如果沒有東西把山削掉？」（`peak`、`_earth_peak`、`initPeak`）：年數 × 每年 5 公釐；約 79 萬年就到玉山的高度。
  - 查證過（2026-10，維基英文除非另註）：Geology of Taiwan（約 400–500 萬年前形成、每年 7 公分聚合、400 萬年壓縮約 200 公里、每年抬升 5 公釐）；Orogeny（島弧與大陸碰撞）；Geography of Taiwan（東側三分之二是五條山脈、玉山 3,952 m）；Yushan (mountain)；List of mountains in Taiwan（268 座超過 3,000 m）；Taroko National Park（立霧溪切穿大理岩）；Age of Earth（45.4 億年）；地震百問 51、59（集集垂直位移最大 4 m）。**沒寫的**：侵蝕速率的數字（沒有好出處）；山上的貝殼化石（留給第 14 課查證後再寫）；玉山是不是東亞或東北亞最高（說法不一）；「山越高削得越快」在課文裡改成「坡越陡水流越快」。
- 第五課火山（`earth-volcano.js`，`lab.kind = "volcano"`，`data-earthvolcano-lab`，CSS `ew-vc-`／小工具 `ew-bb-`；單元一最後一課，slug `volcano`）：一個機制——岩漿比周圍岩石輕所以往上擠；裡面溶著氣體，越往上壓力越小、氣泡越大（搖過的汽水）；岩漿稀氣體逃得掉 → 熔岩流出，岩漿黏氣體被困 → 爆炸。**單元一（1–5 課）到此完成。**
  - 模型：切開一半的火山（後半個截頭圓錐＋畫在切面上的岩漿庫與通道）。兩組按鈕（岩漿 runny／sticky × 氣體 low／high）對到四種噴發（`volcalc.js` 的 `STYLES`：flow／fountain／dome／blast）。壓力條從 0 累積到 1（`CYCLE_S`，黏的撐比較久）就噴發 `ERUPT_S` 秒，再重來。氣泡（InstancedMesh 的圓）半徑照波以耳定律 `1 / radiusRatio(km)` 隨高度變大。噴出物用一個 InstancedMesh 依 style 擺成熔岩流、噴泉拋物線、熔岩丘旁的碎石或火山灰柱。**四種是示例的分類、週期是示例**（比例說明寫明：真的岩漿是連續變化，同一座火山可以有不同噴法）。測試用 `__lab.seek('erupt' | 'build', 0–1)`。
  - 頁面下方「氣泡往上升會變多大？」（`bubble`、`_earth_bubble`、`initBubble`）：深度滑桿 0–5 公里 → 體積膨脹倍數（`expand()`＝壓力比；每公里 265 大氣壓是用岩石密度 2.7 算的**示例**，註記寫明還有降溫與溶解沒算）。
  - 查證過（2026-10，維基英文除非另註）：Magma（密度低而上升、岩漿庫、壓力下降氣體冒出、大量析出則爆炸）；Lava（二氧化矽高則黏、黏的通常爆炸、800–1,200°C）；Volcanic eruption（爆炸式與溢流式）；Volcano（定義、多在板塊邊界、活／休／死、火山灰土壤肥沃）；Volcanic gas；Volcanic explosivity index（1982、0–8）；Volcanic ash；Prediction of volcanic activity；Tatun Volcanic Group（一千多年沒有大噴發、噴氣孔、岩漿庫很可能還在、可能是活火山、大屯火山觀測站監測、七星山 1,120 m）；Guishan Island (Yilan)（層狀火山、361 m）；Hot spring；地震百問 53（東北部地震帶伴隨地熱與淺層火山活動，如龜山島）。**沒寫的**：大屯火山群與龜山島「上一次噴發」的年份（來源之間說法不同）；「大屯火山是活火山」寫成「可能仍是活的、正在被監測」；岩漿庫的深度。
- 第六課下雨（`earth-rain.js`，`lab.kind = "rain"`，`data-earthrain-lab`，CSS `ew-rn-`／小工具 `ew-gg-`；**單元二「頭上的天」第一課**，slug `why-it-rains`）：一個機制——海水蒸發成看不見的水氣；空氣上升變冷，冷到露點水氣凝結成雲（雲底），水滴長大掉下來就是雨；被山抬升的迎風面下雨，翻過山的空氣乾熱下沉（焚風）。
  - 模型：一座島的側面剖面（兩邊是海、中間一座山）。空氣小點沿著被山抬高的流線走（`y = y0 + hill(x)·exp(−y0/3)`），雲、雨、水氣都是 InstancedMesh。控制：風向（west／east，兩邊都是海風、溼的那一側會互換）、山高（`HILLS`：0.6／2.5 公里，兩個地形 mesh 切換顯示，`HK` 是目前的高度）、海邊氣溫 15–34°C、溼度 50–100%。`raincalc.js`：`dewPoint`（溼度每少 5%、露點低 1°C）、`cloudBase`（每 1°C 約 125 m）、`tempAt`（每公里 −6.5°C）、`leeTemp`（下沉每公里 +10°C）、`rains(T, rh, H)`。**做過又拿掉的設計**：「從陸地來的乾風」——照這套簡化數字，溼度 40% 的空氣在 2.5 公里的山上還是會成雲，和說明矛盾，所以改成「兩邊都是海、換風向」加「矮丘」來呈現不下雨的情況。
  - 頁面下方「一場雨有多少水？」（`gauge`、`_earth_gauge`、`initGauge`）：雨量（毫米）× 面積 → 公升與 1.5 公升寶特瓶數，並顯示氣象署的雨量分級（`CLASSES`：80／200／350／500 毫米）。
  - **氣象署「氣象常識／颱風百問／氣候百問／海象百問」的抓法**：頁面是 JS 載入的，但每一題是一個純文字檔 `https://www.cwa.gov.tw/V8/C/K/Encyclopedia/<nous|typhoon|climate|sea>/<代號>.txt`（例如 `nous/overview-06.txt`、`typhoon/typhoon-02.txt`），curl 要帶瀏覽器 UA 與 Referer；題目清單在各分類的 `*_list.html`／`index.html` 的 `href="#代號"`。出處連結寫 `…/nous/overview_list.html#overview-06` 這種形式。其他氣象署頁面（例如豪大雨特報 `V8/C/P/Warning/W26.html`）用 WebFetch 讀得到。
  - 查證過（2026-10）：氣象常識「大氣中之水氣」（0.01%–4%、平均 1.1%、主要來自海洋、+11°C 容量加倍、露點）、「大氣之垂直溫度變化」（每公里 6.5°C）、「雲與天氣」（晴天積雲雲底約 1 公里、積雨雲十分鐘長到 6,000 公尺）、「焚風」；氣候百問「什麼是水循環？」；「豪（大）雨特報」的雨量分級；維基英文 Climate of Taiwan（年雨量約 2,600 mm、冬季東北部多雨、夏季季風占南部 90%）、Cloud base、Dew point、Rain（雨滴不是淚滴形）、Rain gauge。**沒寫的**：「一朵雲有多重」（沒有好出處）；各縣市的年雨量；雲滴與雨滴的大小數字。
- 第七課風（`earth-wind.js`，`lab.kind = "wind"`，`data-earthwind-lab`，CSS `ew-wd-`／小工具 `ew-bf-`；單元二第二課，slug `why-wind-blows`）：一個機制——太陽把陸地和海曬得不一樣熱，熱的那邊空氣上升、涼的那邊貼著地面補過來。場景是海岸剖面（左海右陸）＋一圈循環的空氣小點；兩個視角共用一支滑桿：`day`（幾點，海風／陸風）與 `year`（月份，季風）。數字在 `windcalc.js`（`breeze(mode, x)` 回傳兩邊溫度、方向 `onshore/offshore/calm`、風力）：**溫度是示意曲線**（比例說明寫明不是實測），「一天」的風力對齊氣象署「海陸風」（海風 3–4 級、陸風 1–2 級、上午十點前後轉向），改曲線要重跑 `test/wind.test.mjs`。頁面小工具 `beaufort`（`_earth_beaufort`）是氣象署「陸上應用之蒲福風級表」0–12 級，名稱／敘述／風速照表，不要自己補 13 級以上的名稱。本課沒有防災段落（颱風的放在第八課）。
- 第八課颱風（`earth-typhoon.js`，`lab.kind = "typhoon"`，`data-earthtyphoon-lab`，CSS `ew-ty-`／小工具 `ew-ep-`；單元二第三課，slug `how-typhoons-form`）：一個機制——暖溼空氣在溫暖海面上升、四周空氣流進來打轉，成雲放熱讓它越來越強，登陸後補給斷了就減弱。雲是 1,100 顆小白球，位置在「散亂」和「螺旋雲帶」之間依 `organized(v)` 內插，所以越強越有螺旋和眼；兩個視角 `top`／`cut`（剖開＝藏掉 z>0 的一半，後面的雲依深度變暗才看得出眼）。強度分級、相當蒲福風級在 `typhooncalc.js`（氣象署：17.2／32.7／51.0 公尺每秒），**增強減弱的速率、眼的大小、高度都是示意**（比例說明有寫）。頁面小工具 `eyepass`（`_earth_eyepass`）五個階段照氣象署颱風百問，風的長條只分強弱、不寫風速。防災段落只依消防署消防防災館「防颱準備」三篇。**氣象署出處網址**：颱風百問是 `…/Encyclopedia/typhoon/index.html#typhoon-NN`；氣象常識第一類「introduction」在 `nous/index.html#introduction-NN`（沒有 `introduction_list.html`），其餘是 `overview_list`／`weather_list`／`climate_list`。
- 第九課閃電（`earth-lightning.js`，`lab.kind = "lightning"`，`data-earthlightning-lab`，CSS `ew-lt-`／小工具 `ew-th-`；單元二第四課，slug `lightning-and-thunder`）：一個機制——雷雨雲裡的電被分開（雲頂正、雲底負、地面感應出正電），大到空氣擋不住就放電（閃電），熱空氣爆開就是雷；光立刻到、聲音每秒約 340 公尺。循環 `charge → flash → travel → heard`（`advance(dt)`），**聲音的圈照真實時間與比例走**（`U` = 1 公里幾個模型單位，房子位置＝滑桿公里數），所以畫面上數到的秒數是真的；雲的高度、充電時間、閃電持續時間是示意。數字在 `lightcalc.js`（`thunderDelay`、`boltPath` 用決定性亂數，同一編號畫同一道）。頁面小工具 `count`（`_earth_count`）：秒數 × 340 公尺，另有「考考我」隨機 2–10 秒；**說明文字明講數秒不能用來判斷安全**，不要加 30 秒之類沒有本地官方出處的規則。防災要點只依氣象署「雷雨」與消防署。
- 第十課天氣預報（`earth-forecast.js`，`lab.kind = "forecast"`，`data-earthforecast-lab`，CSS `ew-fc-`／小工具 `ew-sw-`；**單元二最後一課**，slug `weather-forecast`）：一個機制——預報＝量現在＋往後算；量不準的小誤差會隨時間變大，所以同樣的計算跑很多次，十次裡幾次下雨就是降雨機率。場景是一條雨帶移向小島上的小鎮；視角 `one`／`ten`（算一次／算十次）、雨帶距離 `near`／`far`（12／48 小時後到）、時間滑桿 0–72 小時、側欄六格 12 小時預報表（可點）。**所有數字都是示例**，在 `forecastcalc.js`（`EPS` 十個速度誤差、`pop(lead, p)`）；改 `EPS`／`BAND` 要重跑 `test/forecast.test.mjs`（近的要有一格 100%、遠的最高不到 100% 且分散在更多格）。五則訊息 `one/dry/maybe/likely/sure`。頁面小工具 `skyword`（`_earth_skyword`）是氣象署的天空狀況用詞（雲量 0–4／5–8／9–10 → 晴／多雲／陰）。降雨機率的定義只照氣象署（與下多久、下多大範圍無關）；系集預報與 14 天極限的出處是 Wikipedia，課文用「科學家認為」。本課沒有防災段落。
- 第十一課河流（`earth-river.js`，`lab.kind = "river"`，`data-earthriver-lab`，CSS `ew-rv-`／小工具 `ew-cy-`；**單元三「水與海」第一課，資料在 `units[2]`**，slug `rivers-shape-the-land`）：一個機制——水快就帶得動大顆粒，慢下來就放下，大的先放。場景是一條從山到海的河切成 70 格（`NB`），每格有兩岸、河床（`cut[]` 會被切深）、三層堆積（`pile.gravel/sand/mud`，顯示時用 `sm()` 和鄰格平均）和水；150 顆顆粒照 `flow(x, water)` 前進，流速低於自己的門檻就堆在那一格再回到上游。水量三段 `dry/normal/flood`。**數字全部是示例，只有順序是真的**（`rivercalc.js`：`GRAINS` 門檻、`settleX`、`zoneOf`）；改地形或門檻要重跑 `test/river.test.mjs`（平常：礫石在山腳、沙在平原、泥到海）。頁面小工具 `carry`（`_earth_carry`）只講順序、不寫流速。**濁水溪的長度不寫數字**（水利署 186.6 公里與英文維基 203 公里不一致），只寫「台灣最長」。本課順手把前面幾課已上線的「即將推出」連結改成真的連結。
- 第十二課海嘯（`earth-tsunami.js`，`lab.kind = "tsunami"`，`data-earthtsunami-lab`，CSS `ew-ts-`／小工具 `ew-tw-`；單元三第二課，slug `tsunami`）：一個機制——風浪只動表層，海嘯是海底升降推動整層海水；速度只看水深（`V = √(g h)`，氣象署地震百問 63），深海又快又矮，靠岸變慢、後浪堆上來變高。場景是海的側面剖面切成 96 格；視角 `wind`／`tsunami`；海水小點在動的時候變黃（風浪只有上層、海嘯整柱）。`tsunamicalc.js`：**速度是真的公式**，`depth(x)` 的海底地形、`grow()`（格林定律的四分之一次方）和畫面的垂直比例都是示意，比例說明分開交代。頁面小工具 `wavespeed`（`_earth_wavespeed`）：水深 → 速度與走 100 公里的分鐘數。防災段落只依氣象署地震百問 93；歷史海嘯不寫傷亡數字。**地震百問的網址**是 `https://scweb.cwa.gov.tw/zh-TW/Guidance/FAQdetail/<id>`，id 不等於題號（海嘯：62→63、63→64、65→66、66→67、67→68、68→69、93→107）。
- 第十三課海水的鹽（`earth-salt.js`，`lab.kind = "salt"`，`data-earthsalt-lab`，CSS `ew-sa-`／小工具 `ew-sp-`；**單元三最後一課**，slug `why-the-sea-is-salty`）：一個機制——水一直繞圈（雨 → 河 → 海 → 蒸發 → 雲），鹽只進不出，所以越積越多；有出口的湖鹽跟著水流走，所以是淡的。場景是山、河、一個水盆；模式 `sea`／`lake`（湖的右岸變低、鹽粒穿過湖從出口離開）；時間滑桿 0–1。藍點沿 `LOOP` 繞圈（蒸發段是灰藍小點、雲裡隱藏），白色小方塊是鹽，留在盆裡的顆數＝`saltDots()`。`saltcalc.js`：**3.5%（每公升約 35 公克）是真的**，變鹹的曲線只是示意，而且停在 3.5%——課文與 `today` 訊息都寫明海水現在不再變鹹（鹽也會慢慢離開，Wikipedia “Seawater”）。頁面小工具 `saltpan`（`_earth_saltpan`）：河水（0.01%，示例）／海水 3.5%／死海 34.2%（2011）× 公升 → 公克。主要出處是 NOAA「Why is the ocean salty?」；鹿港鹽場、七股鹽場出處是中文維基。
- 第二課地震（`earth-quake.js`，`lab.kind = "quake"`，`data-earthquake-lab`，CSS `ew-qk-`／小工具 `ew-wn-`；單元一，slug `taiwan-earthquakes`；**試作課**）：一個機制——板塊一直推、斷層卡住，岩層被壓彎存力；撐不住就突然滑動（彈性回彈），波往外傳（P 快先到、S 慢搖得大）。
  - 模型：剖開的地殼，斜的逆斷層（傾角 30°）。左邊（歐亞板塊側）不動；右邊是可變形的格點面（`slab()`：正面有地層顏色的 `PlaneGeometry`＋頂面），位移 `dispOf()`＝靠斷層那端沿斷層滑 `S`、最右端被推 `P`、中間隆起跟 `q = P − S` 成正比，地層顏色隨應變變紅。時間用「年」走（`YEARS_PER_S`），到 `MODES[mode].years` 就滑動並進入 `quake` 階段：慢動作 `QUAKE_S` 秒，P、S 兩個圈在地表擴散（`KM`＝1 單位當 10 公里、`WAVE_X` 倍慢動作），兩間房子在波到時晃動。跑完 `END_YEARS`（320 年）停住，播放鈕變「再跑一次」。相機方位角限制在 ±0.7（背面沒有畫）。
  - 數字：每年 7.5 公分是氣象署「7 至 8 公分」的中間值；**40／160 年的週期、3／12 公尺的滑動量是示例**（比例說明寫明：真的斷層不規律、板塊移動由很多斷層分擔、彎曲與滑動畫大了幾百倍）。`quakecalc.js` 的 `cycle()`、`stored()`、`warning()`、`blindKm()` 有測試；測試用氣象署的美濃地震例子（12 秒算出、台北 49 秒）核對示例波速的量級。測試用 `__lab.run(秒)`、`restart()`、`nearSlip()`。
  - 頁面下方「你有幾秒鐘？」（`warn`、`_earth_warn`、`initWarn`）：距離滑桿 → P 到、警報發出、S 到的時間軸與預警秒數；示例 P 7、S 4 km/s，警報 19 秒（氣象署：15–20 秒算出＋1–2 秒通報）；約 76 公里內是盲區。
  - 查證過（2026-10）：地震百問 10（彈性回彈、李德）、21（P、S 波）、29（規模差 1 能量約 32 倍）、51（板塊）、52（環太平洋地震帶）、54（年均約 40,000 次、有感約 1,000 次、1999 年 49,928 次）、55（與天氣無關、地震雲）、56（菲律賓海板塊每年 7–8 公分向西北、東部最多）、57（西部災害較重）、70（集集：1999-09-21 01:47、車籠埔斷層、破裂帶約 100 公里、水平最大 7 m、垂直最大 4 m）、78（常有小地震仍可能有大地震）、82（無法預測）、84（強震即時警報）、96（遠離河海堤與山崖、沿海往高處）；消防防災館（保護頭頸、趴下掩護穩住、握桌腳）；維基英文 Elastic-rebound theory（1906、50 年）、P wave／Earthquake（5–8 km/s、約 1.7：1）、Ring of Fire（約 90%）、1999 Jiji earthquake（國家防災日與演練訊息）。**沒寫的**：傷亡數字；地震百問 96 的「奔逃至室外」（和消防署「先趴下掩護穩住」的說法不一致，只寫兩邊都同意的）；「躲牆邊」（兩邊說法也不同）；任何一條斷層的再現週期。

## 書法 Chinese Calligraphy（/resources/classes/calligraphy/）— 架構照晶片與半導體，3D 改成「寫字引擎」

- 內容：`data/calligraphy.json`：`units[]`（三個單元：文房四寶與基本功／字體的演變／書法家與名作）底下 `lessons[]` 與 `planned[]`（「製作中」卡，做一課就從 planned 移到 lessons）；課次 `n` 全系列連號（1–10）。每課欄位同晶片與半導體，多的：`drops`（「一滴墨在不同的紙上」）、`pad`（練字板：`char` 是筆畫資料的 key、`tips`）、`links` 可放 `soon: true` 的預告卡（沒有 href，畫成虛線框「製作中」）。`lab.focus`（右側欄的看法按鈕與說明）、`lab.virtues`（尖齊圓健）、`lab.phases`（起筆／行筆／收筆的說明，3D 標籤與力道曲線共用）。
- 頁面：`build.py` 的 `build_cal_hub()`（單元導覽＋`.lc-row` 橫向課程卡；系列小圖示 `calbrush_svg()`＝宣紙上一筆墨＋毛筆，第一課卡 `calfour_svg()`）/ `build_cal_lesson()`；reading、迷思、口訣、活動沿用 `render_basic_unit()`、`_sci_myths()`、`_sci_tricks()`、`_astro_activity()`；卡片小圖示 `_cg_icon('brush'|'ink'|'paper'|'stone')`（純 SVG，不用字型）。「閱讀與經典」頁有入口卡（🖌️）。段落順序：3D → 英文閱讀 → 模型卡 → 一滴墨 → 執筆 → 三千年滑桿 → 這是哪個字 → 法帖裡的字 → 這是哪一種字體 → 隸變前後 → 找燕尾 → 猜下一筆 → 練字板 → 文化卡 → 迷思 → 口訣 → 教室提醒 → 活動 → 下一課預告 → 資料出處。
- 樣式：共用 `assets/css/astro.css`，本系列專屬的在 `assets/css/calligraphy.css`（**class 前綴一律 `cg-`**）；`_cal_head()` 只在本系列頁面載入。
- 3D：**原始碼在 `tools/callig/src/`**（自己的 package.json，three 0.186.1、esbuild 0.25.10），bundle 一律 `cal-*`；`lab.kind` → bundle 對照在 `build.py` 的 `_CAL_JS`（`four` → `cal-four`、`press` → `cal-press`、`yong` → `cal-yong`、`order` → `cal-order`、`oracle` → `cal-oracle`、`clerical` → `cal-clerical`、`speed` → `cal-speed`、`lanting` → `cal-lanting`、`styles` → `cal-styles`、`gallery` → `cal-gallery`、`couplets` → `cal-couplets`、`seal` → `cal-seal`、`sutra` → `cal-sutra`、`pens` → `cal-pens`、`pencil` → `cal-pencil`）。`labeler`、`lazyBoot`、`canvasTex` 在 `tools/callig/src/common.js`（從 tools/chips 抄來）。**不要 import tools/chips、tools/science、tools/astro 的檔案**（esbuild 會打包進第二份 three.js）。
  ```
  cd tools/callig && npm ci && npm run build && npm test
  ```
- **寫字引擎（每課共用，只換資料）**：
  - `brush.js`（純函式，`test/brush.test.mjs`）：`prepStroke`（向心 Catmull-Rom 取樣，弧長 s、時間 t＝∫ds/v、壓力 p、階段 phase）、`footprint`（壓力 → 筆毛貼紙的半寬 hw 與往後拖的長度 len；全壓 118 單位寬）、`tipTrail`（筆尖往哪拖：目標＝運動反方向，每走 ds 轉 1−e^(−ds/26) 的角度差；正好掉頭固定逆時針轉）、`stamps`／`teardrop`（每個取樣點一個蛋形印子：圓頭在筆的位置、尾巴往筆尖方向收窄，尾端是圓的——尖尾會在筆尖轉向時把邊緣弄成鋸齒）、`outline`、`sampleAt`、`forceCurve`、`speedToPressure`（慢＝粗：pMin 0.12 + 0.8/(1+(v/700)²)）、`penPressure`、`smoothTo`、`PAPERS`/`INKS`/`bleed`（暈開示意）、`grindDarkness`（1−e^(−圈/40)，示意）、`HAIR`/`bendFor`/`springBack`（羊毫 soft 1、兼毫 0.72、狼毫 0.48；彈回速率 2.2／4.2／7.5，示意）。
  - `ink2d.js`：畫在 canvas 上的墨（`paperBase` 紙色＋纖維、`drawGrid` 米字格／九宮格、`drawStamps`、`drawBlot`、`drawForce`）。**半透明（描紅）要先不透明畫在暫存畫布再整張淡淡貼上**：印子互相重疊，直接用 globalAlpha 畫會越疊越深（第一版的範字就變成大紅色）。
  - `brush3d.js`：`makeBrush`（筆毛 26 圈 × 20 段每格重算：中心線＝往下的直線 → 四分之一圓（半徑 rc＝min(1.2d, 0.9(L−d))）→ 貼紙的直線，總長固定；貼紙部分橫向攤開、上下壓扁；`fan` 壓扁攤開看「齊」；蘸墨從筆尖往上變黑）、`makePaper`（墨畫在 canvas 貼圖上，不是 3D 幾何；ink 層另存，切格線時重疊）、`makeWriter`（`poseAt(t)`、`drawTo(t)`；多筆字之間提筆 0.22 秒、空中移 0.4 秒、下筆 0.2 秒）、`placeBrush`。**筆桿走在前、筆毛拖在後**：placeBrush 把筆桿往筆尖反方向挪 `bendOffset`，筆肚才蓋在墨跡上（第一版筆桿在墨跡正上方，筆毛彎到旁邊，看起來墨是空中掉下來的）。
  - `pad.js`（2D 練字板，不需要 WebGL）：米字格＋淡紅範字（描紅），滑鼠／手指照速度、觸控筆（`pointerType 'pen'` 且有壓力）照 `PointerEvent.pressure`；`getCoalescedEvents` 補點、位置 0.65 平滑、每 2.5 單位一個印子；畫布 `touch-action: none`＋touchstart/touchmove `preventDefault`，寫字時頁面不捲動；看示範（照筆畫資料的真實時間）、復原、清除、存成圖片（`calligraphy-practice-<key>.png`）。
- **筆畫資料**：`tools/callig/src/strokes/<key>.json`（打包時編進 JS；`test/strokes.test.mjs` 檢查格式）：
  ```
  { "char": "一", "key": "yi", "box": 1000, "count": 1, "order_src": "教育部《國字標準字體筆順學習網》…", "drawn_by": "…",
    "strokes": [ { "n": 1, "en": "Horizontal", "zh": "橫", "pts": [[x, y, 壓力 0–1, 速度 單位/秒], …], "phases": [起筆結束的控制點, 行筆結束的控制點] } ] }
  ```
  字框 1000 × 1000、y 往下；第一點與最後一點壓力 < 0.1（下筆、提筆）；一筆 1–8 秒；`count` 要等於教育部的筆畫數。**全部自己手繪**（用 `node` 把印子輸出成 SVG、再用 shot.mjs 截圖檢查形狀）；筆順一律照教育部《國字標準字體筆順學習網》（https://stroke-order.learningweb.moe.edu.tw/，2025 版網站標題已改成「國字標準字體筆順學習網」）。要用開源筆畫資料前先確認授權、寫進 sources。篆隸行草的範字用 SVG 路徑或有授權的圖片，不要用網頁字型。
- 第一課文房四寶（`cal-four.js`，`lab.kind = "four"`，`data-calfour-lab`）：書桌（1 單位約 10 公分）：毛氈＋宣紙（米字格 26 公分、紙鎮）、筆架（山形 ExtrudeGeometry）上的毛筆、硯台（側面輪廓 Shape 擠出：硯池在遠端 −z、斜坡、硯堂；**ExtrudeGeometry 轉 rotation.y＝−π/2 才是輪廓 x → 世界 +z**，第一版轉成 +π/2，硯池跑到近端、水被硯堂蓋住）、墨床上的墨條（金色雲紋只用線條畫）、水盂（LatheGeometry）。六個看法 `data-focus`：desk／brush（換毛、尖齊圓健、壓一下在小紙片留印子）／ink（墨條立起來畫圈，積水與硯池照 grindDarkness 變黑）／paper（同一滴墨在生宣與影印紙上，影印紙上有反光的墨珠）／stone（加水＝圈數 ×0.55）／write（筆架 → 硯池上方 → 蘸墨 → 移到第一點 → 下筆 → 寫 → 提筆，`SEQ` 的秒數再乘放慢倍率）。點桌上的東西（raycast，`userData.focus`）也能切換。寫字時鏡頭 `data-cam`：side／top／tip（跟著筆尖，controls 關掉，**要自己 `camera.lookAt`**）；蘸墨期間用 `pre` 全景。
  - 頁面下方「一滴墨在不同的紙上」（`drops`，`data-cal-drops`，`initDrops()`）：生宣／熟宣／報紙／影印紙四格同時滴，濃淡三種；捲到才自動滴第一滴。
  - 除錯：`document.querySelector('[data-calfour-lab]').__lab`（`setMode('desk'|'brush'|'ink'|'paper'|'stone'|'write', 立即?)`、`setHair('goat'|'mixed'|'weasel')`、`act('press'|'tip'|'even'|'round'|'spring')`、`setSpeed(1|0.5|0.25)`、`setCam('side'|'top'|'tip')`、`drop()`、`addWater()`、`seek(seq 秒)`、`SEQ`、`writeEnd()`、`run(秒)`、`render()`、`goCam()`）；練字板 `document.querySelector('[data-cal-pad]').__pad`（`strokes`、`write([[x, y, 毫秒], …], pointerType, pressure)`、`demo()`、`setDemoTime(秒)`、`clear()`）；一滴墨 `document.querySelector('[data-cal-drops]').__drops`（`go()`、`setT(秒)`、`setInk(k)`）。用 shot.mjs 實測時，`run()` 之後要 `render()`；`tipWorld()` 自己會更新 matrixWorld。
  - 查證過（2026-10）：最早的完整毛筆 1954 年長沙左家公山戰國楚墓（Wikipedia“Ink brush”；所以寫「兩千兩百多年」），蒙恬造筆是傳說；羊毫軟、狼毫（多半是黃鼠狼毛）硬、兼毫；墨＝松煙或油煙加膠壓模（Smithsonian 國立亞洲藝術博物館）；硯面細滑又帶點粗、英文 hill／sea；湖筆善璉、徽墨歙縣、宣紙涇縣（青檀樹皮＋稻草；生宣吸水暈開、熟宣上明礬）、2009 年列入 UNESCO 人類非物質文化遺產；端硯肇慶、唐代端州；蘇易簡《文房四譜》北宋十世紀後半（筆二卷、硯墨紙各一卷）、葉夢得記「世言歙州有文房四寶」（平凡社《世界大百科事典》）；歙州 1121 年改名徽州；埔里手工紙：日治時代起引進日本與中國技術、二戰後至 1960–70 年代短暫外銷、1980 年代起沒落、九二一後更少（國立臺灣工藝研究發展中心《臺灣工藝》2018）；入木三分：教育部《成語典》說語出南朝宋羊欣《筆陣圖》，《太平廣記》卷二〇七也記載，課文寫「相傳」；國小三、四年級「硬筆字為主，毛筆為輔」（十二年國教國語文 4-Ⅱ-7）。**沒寫**：「文房四寶」一詞起源於哪個朝代（維基百科說南北朝、平凡社引宋代，說法不一）、王羲之生卒年、全國語文競賽寫字的規則（官網連不上，只查到單一學校的校內辦法）、「磨墨如病夫，執筆如壯士」的作者（只當「老話」寫）。
- 第二課提按（`cal-press.js`，`lab.kind = "press"`，`data-calpress-lab`）：一個機制——筆鋒是軟的，按下去筆毛散開線就粗、提起來收攏線就細。三個看法 `data-mode`：
  - `press` 提按：毛筆以固定速度（210 單位／秒）一行一行往右寫（四行 `ROWS`，寫滿清掉），壓力來自 `PATTERNS`（swell 輕重輕／wave 一按一提／steady）或滑桿（hand，`.cg-hand`）；印子是即時生成的（同 pad.js 的慣性筆尖），線寬讀數＝footprint 寬 × 0.26 mm。
  - `tip` 中鋒與側鋒：同一條線（`lineChar`）寫兩次。側鋒用 `makeWriter(paper, char, { side: π/2, tilt: 0.42, bristles })`：筆尖貼上緣、筆桿往反方向倒約 24°、墨用 `drawBristles` 一根根畫，筆肚那一緣乾出飛白。切換時先清紙，再補畫另一條（若寫過）。
  - `shi` 寫「十」（`strokes/shi.json`：橫＝藏鋒起筆、回鋒收筆；豎＝藏鋒起筆、懸針收筆）。分段重播：`phaseT[筆][0–3]` 是整條時間軸上的起筆／行筆／收筆分界，`playShi([t0, t1])` 先 `drawTo(t0)` 補畫再 ¼× 播到 t1 暫停。
  - 鏡頭 `data-cam` 三個看法都能用（CSS 用 `.cg-press-lab:not(.cg-writing) .cg-cams` 蓋過第一課「只有寫字時顯示」的規則——第一版選擇器權重不夠，按鈕被藏起來）；tip 模式的 side 鏡頭改從左前方看，才看得出筆桿斜。
  - 頁面多的段落：`hold`（執筆：五根手指的卡片＋檢查清單，`_cal_hold()`）；`pad.curve: true` 讓練字板多一張提按曲線比較圖（`.cg-pad-curve`、`.cg-pad-score`）。
  - 布景 `src/desk.js`（書桌、毛氈、紙鎮、簡化硯台）第二課起共用；第一課 cal-four.js 仍是自己一份，沒改。
  - 除錯：`document.querySelector('[data-calpress-lab]').__lab`（`setMode('press'|'tip'|'shi', 立即?)`、`setPattern('swell'|'wave'|'steady'|'hand')`、`state.hand`、`writeTip('center'|'side')`、`playShi([t0, t1])`、`phaseT`、`selStroke(0|1)`、`setSpeed`、`setCam`、`demo('press'|'wave'|'hand'|'center'|'side'|'shi'|'needle')`、`run(秒)`、`render()`、`goCam()`）；練字板 `__pad.score()` 回傳最後一筆和示範多像。
  - 引擎第二課加的：brush.js `tipTrail({ side })`、`bendGeom(L, d, tilt)`（筆桿直立時和第一課完全一樣，node 測試檢查總長與根部高度）、`bristles`、`curveFromStamps`、`curveMatch`；brush3d.js 的筆桿在 `handleG` 子群組（側鋒時斜）、`placeBrush` 讀 `pose.tilt`、`paper.stampMany(…, { bristles })`、`writer.spans()`；ink2d.js `drawBristles`、`drawCompare`。改完重看第一課（write 的 tip 鏡頭、brush 的 press）確認沒變。
  - 查證過（2026-10）：中鋒（也稱正鋒）、側鋒、藏鋒、回鋒的定義（教育部《重編國語辭典修訂本》；「懸針」「垂露」在辭典裡是書體名，筆畫的懸針豎／垂露豎改引宜蘭縣國小書法教學資料）；五字執筆法「擫押鉤格抵」相傳得自唐陸希聲（清楊賓語，鄭國瑞〈楊賓之書學觀〉，東海大學圖書館館訊新 89 期）、指實掌虛「形同握卵」；Lee & Lee 2021（IJERPH）五指握法與掌心像藏一顆蛋；心正筆正（《舊唐書》卷一六五，穆宗問柳公權，「上改容，知其筆諫也」）；鐵畫銀鉤（歐陽詢〈用筆論〉）、力透紙背（顏真卿〈張長史十二意筆法記〉）、**筆走龍蛇出自宋石孝友〈滿庭芳．上張紫微〉，不是李白**（教育部《成語典》）；「十」先橫後豎（筆順學習網 ID=21313）。**沒寫**：柳公權、歐陽詢、顏真卿的生卒年（留給第九課查）、「側鋒多用在行草」（找不到可靠的一句話出處）。
- 第三課永字八法（`cal-yong.js`，`lab.kind = "yong"`，`data-calyong-lab`）：一個機制——「永」只有 5 畫（教育部筆順 ID=27704：點、橫折鉤、橫撇、撇、捺），裡面有 8 法。筆畫資料 `strokes/yong.json` 多兩個欄位：`methods`（每一筆裡各法的控制點範圍，前一法的 to＝後一法的 from，`strokes.test.mjs` 檢查接得起來、全字法數＝`principles`）與 `num`（練字板筆順數字的位置）。brush.js 的 `methodSpans` 換成時間；ink2d.js 的 `drawForce({ bands })` 一筆裡每一法一個色帶。
  - 3D 用第二課的寫字流程：「整個字」照筆順寫，每一法寫過一半，紙上就出現古名標籤（`LABEL_OFF` 是各標籤離那一法中點的位移；窄螢幕與貼近筆尖時不顯示，會擠成一團）；八個按鈕 `data-method` 先 `drawTo(T0)` 補畫再 ¼× 播到 T1 暫停。
  - 卡片 `parts[].mini`：小「永」畫布（`data-cg-mini`，`initMinis()` 用同一份筆畫資料，整個字淡灰、那一法塗黑）；按鈕「在模型中看」＝ `data-lab-demo=<法的 key>`。練字板 `pad.order: true` 加「筆順」開關（藍底白字數字）。
  - 除錯：`document.querySelector('[data-calyong-lab]').__lab`（`play()`、`playMethod('ce'|'le'|'nu'|'ti'|'ce2'|'lue'|'zhuo'|'zhe')`、`METHODS`（各法在時間軸上的 T0／T1）、`setCam`、`setSpeed`、`run(秒)`、`render()`、`goCam()`）。
  - 查證過（2026-10）：永字八法定義與八法今名（教育部《重編國語辭典修訂本》ID 165970，啄是「右短撇」、策是「斜書向上」）；發明者說法不一（王羲之、崔子玉、鍾繇、智永、張旭，維基百科）；古名英文（bridle、jump、horsewhip、skim、peck、tear，英文維基）；智永是王羲之第七世孫、相傳書真草千字文八百本（教育部辭典）；《尚書故實》原文：「自臨八百本…江南諸寺，各留一本」「禿筆頭十甕」「鐵門限」「退筆冢」、鄭虔柿葉學書與「鄭虔三絕」；臨池學書（張芝，教育部《成語典》引《晉書．衛瓘傳》，相傳）。**沒寫**：智永住哪一座寺（教育部辭典寫永欣寺、《尚書故實》寫吳興永福寺，不一致）、永字八法「受衛夫人七勢影響」（只有英文維基一個說法）。
- 第四課筆順與結構（`cal-order.js`，`lab.kind = "order"`，`data-calorder-lab`）：一個機制——筆順是共同的標準；教育部《常用國字標準字體筆順手冊》歸納 17 條基本法則，3D 示範其中 6 條，例字都取自教育部列的例子：`lr` 自左至右「川」、`tb` 先上後下「三」、`hv` 先橫後豎「十」、`pn` 先撇後捺「人」（中文版例字是交入今長，**英文版 page.jsp?ID=46 列了「人」**）、`mid` 中間的豎先寫「小」、`box` 先外後內再封口「日」（`RULE_CHAR`，build.py 的 `_CG_RULE_CHAR` 同一份）。`lab.rules` 存教育部原文 `moe_zh`、例字 `examples` 與我們的說明 `why_en/zh`（面板的 `.cg-rule-k/t/why` 由 JS 填）。
  - `makeWriter(paper, char, { order })` 照指定順序寫（「倒過來寫」＝ order 反轉，數字變紅 `.cg-lb-num.back`、根元素加 `.cg-backward` 顯示紅色 `.cg-back-badge`「不是標準筆順」）；筆在空中從上一筆終點到下一筆起點畫成虛線（`LineDashedMaterial`，寫完上一筆才出現）。紙的格線 `paper.setGrid('jiu'|'mi'|false)`（九宮格是預設）。
  - **實測過空中路程：照標準筆順不一定比較短**（川：1352 vs 倒過來 1313；日：1472 vs 1348），所以課文**不說**「照筆順手移動最少」，虛線只是讓學生看見手怎麼移；為什麼要照筆順只寫教育部說過的：共同的標準（筆順學習網的練習會逐筆檢查）、筆勢（〈常見問題集〉Q4：「日」第二筆橫折鉤帶鉤是要接框裡的下一筆，「口」不帶鉤、往內斜接封口）、封口最後寫。倒過來寫只標「不是標準筆順」，不說它寫不出字或一定難看。
  - 筆畫資料 `chuan/san/ren/xiao/ri.json` 有 `rule` 欄位，五個字加上 `shi.json` 都有 `num`（筆順數字的位置；沒有 `num` 時放在起點後方 52 單位——但起點有藏鋒小回勾，方向不準，「日」的 1、2 會疊在一起，所以全部手動給）。課程卡小圖示 `_cg_char_svg(key)` 用中心線畫字＋藍色數字（hub 卡 `calorder_svg()`＝九宮格上的「日」）。
  - 「猜下一筆」（`guess`，`data-cal-guess`，`src/guess.js` 的 `initGuess`，2D 不需要 WebGL）：字的每一筆先淡灰，照順序點；判斷點到哪一筆用 brush.js 的 `hitStroke`（離中心線最近、90 單位以內，只算還沒寫的筆）；點錯閃紅並顯示 `guess.hints[key]`（這個字用的法則）；分數＝一次就點對的筆數／點的次數。除錯 `document.querySelector('[data-cal-guess]').__guess`（`tap(x, y)` 字框座標、`next()`、`start(i)`、`state`）。
  - 練字板 `pad.chars`：一排換字按鈕 `[data-pad-char]`，`__pad.setChar(key)` 換範字並清掉重寫。
  - 除錯：`document.querySelector('[data-calorder-lab]').__lab`（`setRule('lr'|'tb'|'hv'|'pn'|'mid'|'box', 倒過來?)`、`setGrid('jiu'|'mi'|'none')`、`setCam`、`setSpeed`、`demo(規則 key|'back')`、`run(秒)`、`render()`、`goCam()`）。
  - 查證過（2026-10）：17 條基本法則與例字（筆順學習網〈筆順基本原則〉page.jsp?ID=23、英文版 ID=46）；網站版次：2008（民國 97）年試用、4,808 個常用字，2020 年擴充為 6,057 字並把「常用」拿掉，2024 年 6,063 字（ID=11）；〈常見問題集〉ID=24（Q4 日／口的鉤）；筆順（辭典 17694）、九宮格（92062，井字形、另有田字格米字格「功用相當」）、上大人（131941，舊時學童描紅的習字簿、筆畫簡少）、描紅（31243）；六個字的筆順（川 24029、三 19977、十 21313、人 20154、小 23567、日 26085）；國小三、四年級「硬筆字為主，毛筆為輔」（4-Ⅱ-7）。**沒寫**：九宮格是誰發明的（沒查到可靠出處，只寫它是什麼、怎麼用）、台灣與中國大陸筆順不同的字（要兩邊都有可靠出處才寫，留給以後）。
- 第五課漢字從哪裡來（`cal-oracle.js`，`lab.kind = "oracle"`，`data-caloracle-lab`；單元二第一課）：一個機制——同一個字在不同時代的樣子。書桌上三個地方（`data-mode`）：
  - `shell` 甲骨：腹甲（`OUTLINE` 右半邊輪廓左右對稱、`ExtrudeGeometry` 側邊＋正反兩面各一張 `ShapeGeometry` 貼圖，**ShapeGeometry 的 UV 是形狀座標，貼圖要 `repeat 1/寬、offset 0.5`**；底色要鋪滿整張畫布再剪輪廓——只剪折線的話曲線邊緣會露出黑色）。四步 `data-step`：背面挖洞（鑽鑿）→ 燒紅的木條灼燒（`PointLight` 發光）→ 翻回正面出現像「卜」的裂紋 → 銅刀沿甲骨文中心線刻字（`drawCarved` 刻痕：暗溝＋亮邊）。翻面＝`flipper.rotation.z`，背面貼圖畫的時候先左右鏡射。
  - `bronze` 金文：青銅鼎（`LatheGeometry` 鼎腹＋三足＋立耳、銅綠與回紋帶的貼圖）；銘文畫在內底的圓盤（示意，真的毛公鼎在腹內）；旁邊的拓片：拓包沿蛇行路線一下一下拍，紙變黑、字留白（白紙上用圓形剪裁貼上整張拓片）。
  - `seal` 小篆：毛筆寫 `sealChar(key)`（中心線取樣後壓力固定 0.4、頭尾 0.34——小篆線頭是圓的，不收尖）。
- **古文字資料**：`strokes/ancient.json`（`test/ancient.test.mjs` 檢查；`strokes.test.mjs` 跳過這個檔）：六個字（日月山水人馬）的 `oracle`／`bronze`／`seal`（中心線 `[x, y]` 或 `[x, y, 寬度倍率]`、`smooth: false`＝刀刻的直線）與 `clerical`（隸書示意，寫字引擎格式；生成時橫向 ×1.12、縱向 ×0.74 壓扁）。**字形是自己描的**：對位參考 Wikimedia Commons「Ancient Chinese characters project」（`日-oracle.svg` 等，公有領域），描法＝把參考 SVG 畫在 1000 格的方格紙上、自己的中心線疊上去截圖比對。楷書的月山水馬是新的 `yue/shan/shui/ma.json`（筆順依教育部，ID＝字的 Unicode 十進位：月 26376、山 23665、水 27700、馬 39340；教育部頁面的 `xml[...]` 有每一筆的 Track，可以拿來確認筆順與起訖點）。
  - `scripts2d.js`：`STAGES`（圖畫、甲骨文、金文、小篆、隸書、楷書）、`drawStage(g, S, key, stage, { t })`（甲骨＝骨色底＋刻痕；金文＝黑底白字的拓片，白字上撒暗點；小篆＝一樣粗的圓滑線；隸書楷書＝寫字引擎的印子；圖畫＝canvas 畫的示意圖）。
  - `time2d.js`：`initTimeline`（`data-cal-time`，滑桿 0–5 交叉淡入；馬的圖畫在 0→1 之間轉 −90° 站起來；播放每階段 2.5 秒）、`initWhich`（`data-cal-which`，看甲骨文或金文選楷書，六題一輪、順序每次不同）。卡片 `parts[].evo` 畫四張演變小圖（`data-cg-evo`）。練字板用六個字的小篆（`initPad(pad, SEALS.ri, SEALS)`）。
  - 除錯：`document.querySelector('[data-caloracle-lab]').__lab`（`start({ mode, char, step, fly, instant })`、`STEPS`、`stepT0()`、`state`、`run(秒)`、`render()`、`goCam()`）；`[data-cal-time].__time`（`set(v)`、`setKey(k)`、`play()`）；`[data-cal-which].__which`（`answer(k)`、`next()`、`setStage('oracle'|'bronze')`）。
  - 查證過（2026-10）：甲骨文＝商代占卜刻於龜甲獸骨、中國有實物可證的最早文字、光緒二十五年（1899）陸續發現（教育部辭典 89660）；占卜流程：龜甲與獸骨（牛肩胛骨佔多數）、鑽鑿使變薄、燒紅的木條燋灼、「卜」聲與像「卜」的裂紋（陳夢家說）、刻下時間人物問題吉凶應驗、**怎麼判讀已不可考**（史語所陳列館〈殷商占卜的取材與過程〉）；**王懿榮從藥材發現甲骨是傳說**（「據說」1898 藥材版、1899 古董商帶十二片版；李宗焜 2008：陳夢家已證明不可信；王 1900 年去世，劉鶚 1903《鐵雲藏龜》第一本甲骨著錄）；史語所 1928–1937 殷墟十五次發掘、現藏兩萬五千多片（「精品最多」，**不要說世界最多**，大陸國家圖書館更多）；殷墟 2006 世界遺產、UNESCO 寫商代晚期都城 1300–1046 BC（其他來源年代不同）；世界記憶名錄 2017（申報書：約 15 萬片、約 4,400 字、約 1,400 字對得上今字；新華社另說 4,300／1,600）；《說文》「卜」灼剥龜也（四部叢刊本作「炙」）、〈敘〉六書「象形…日、月是也」「形聲…江、河是也」、540 部 9,353 文（約西元 100 年成書，121 年許沖上奏）、「馬」象馬頭髦尾四足之形；金文＝商周秦漢鑄刻在青銅器上的文字（辭典 94344）；毛公鼎：故宮說西周晚期、32 行約 500 字、迄今最長青銅銘文（教育部辭典算 497 字，所以寫「約 500」）；《史記．秦始皇本紀》「書同文字」（221 BCE；李斯當時是廷尉，課文只說「李斯等官員」）；小篆、象形、倉頡（相傳，文字不可能一人獨創）、隸書（創始於秦，通行於漢魏）、楷書（約起源於後漢，至魏完備，通行至今）、拓片的辭典定義。**沒寫**：甲骨文用什麼刀刻（青銅或玉石，沒查到可靠的一句話）、刀刻所以字形方（只寫觀察「刻出來幾乎是方的」）、哪個凹洞叫鑽哪個叫鑿（模型畫長的＋圓的一對，文字只說「鑽鑿」）、「seal script」英文名的由來。
- 第六課隸書（`cal-clerical.js`，`lab.kind = "clerical"`，`data-calclerical-lab`）：一個機制——隸書把小篆簡化（圓轉變方折、字形由長變扁），長橫起筆回鋒像蠶頭、收筆頓筆挑起像雁尾／燕尾。三個看法（`data-mode`）：
  - `heng` 一筆長橫：寫隸書「一」，三段（蠶頭／行筆／燕尾）用 `data-part` 各自 ¼× 重播（`PT` 是三段的時間分界、`PF` 是走了幾成；先 `drawTo(PT[p])` 補畫再播到 `PT[p+1]` 暫停）；力道曲線 `drawForce({ bounds: PF, labels })`。`data-part="cmp"`「和楷書比」：隸書的「一」（往上挪 120）寫完後，下面再寫楷書的「一」（`yi.json` 往下挪 210），標出「楷書收筆不往上挑」（教育部辭典「楷書」：與隸書的主要區別為省略尾部的挑筆）。
  - `change` 隸變：`paper.setUnder(fn)`（**brush3d.js 的 makePaper 新增：紙和墨之間多一層**）先畫淡藍色的小篆，毛筆在同一個字框裡寫隸書；讀數是兩種字體「高 ÷ 寬」（`cler2d.js` 的 `bbox`，用我們畫的字算）。半透明底圖要先不透明畫在暫存畫布再整張貼（線段重疊處才不會一顆一顆變深）。
  - `slips` 竹簡：13 片 `BoxGeometry`（每片頂面一張 canvas 貼圖、兩小段編繩），其他竹片預先寫好隸書（固定亂數），中間那片由縮小的毛筆寫三個字。**小毛筆放在 `scale 0.32` 的群組裡，給 `makeWriter`／`placeBrush` 的「紙」（`slipSurface`）回傳群組的區域座標（世界座標 ÷ 倍率）**。捲起來（`layoutSlips(u)`）：捲進去的部分走螺旋 φ(a)＝(Rout − √(Rout² − 2ca))/c、竹片轉 −φ（字朝裡面）、整卷往左挪一半讓捲好的那一捆停在中間；第一版繞成一個大圓圈像木桶，改成螺旋＋較窄的竹片才像一卷。
  - 隸書資料 `strokes/clerical.json`（`test/clerical.test.mjs`）：九個字（一三土山人水＋第五課滑桿用的日月馬），寫字引擎格式；**一個字最多一個燕尾**（`tail`＝有燕尾的那一筆的索引，那一筆 `tail: true`；測試檢查第六課六個字正好各一個）；一、三、土另有 `seal`（小篆中心線）。產生器的 `head()`＝逆鋒入紙兜一圈、`tail()`＝頓筆後往右上挑、`round_end()`＝護尾。第五課 `ancient.json` 的 clerical 搬到這裡（`scripts2d.js` 的 `glyphFor(key, 'clerical')`、`CLERICAL_KEYS`、`drawSeal`、`clericalStamps`）。
  - 2D（`cler2d.js`）：`initWipe`（`data-cal-wipe`，同一個字框左邊小篆、右邊隸書，拖分隔線；畫布 `touch-action: pan-y`，手機上下滑仍可捲頁）、`initTail`（`data-cal-tail`「找燕尾」，`hitStroke` 判斷點到哪一筆）。卡片小圖 `canvas[data-cg-cler]`（燕尾那一筆朱紅色）；hub 卡 `calclerical_svg()` 用一串圓照壓力畫出粗細。練字板六個隸書字。
  - 除錯：`document.querySelector('[data-calclerical-lab]').__lab`（`start({ mode, char, part, fly, instant, keepFlat })`、`state.rollTo`、`PT`、`PF`、`setCam('near'|'top'|'tip'|'wide')`、`run(秒)`、`render()`）；`[data-cal-wipe].__wipe`（`set(0–1)`、`setKey(k)`）；`[data-cal-tail].__tail`（`tap(x, y)`、`next()`）。
  - 查證過（2026-10）：隸書（教育部辭典 62752：篆書的簡化體，創始於秦，通行於漢、魏）；**教育部的詞條是「蠶頭雁尾」（141860）**，「燕尾」是通行的說法（宋米芾《海嶽名言》已有「蠶頭鷰尾」），課文兩個都交代；隸變（62746）；楷書「與隸書的主要區別為省略尾部的挑筆」（76915）；《說文．敘》「官獄職務繁，初有隸書，以趣約易」；《晉書．衛恆傳》「令隸人佐書，曰隸字」「隸書者，篆之捷也」，程邈的故事以「或曰」帶出（教育部辭典 124541 則當事實寫）→ 課文當傳說；睡虎地秦簡（辭典 134623：1975 年湖北雲夢出土、秦統一前後、秦隸；1,155 枚見中新社 2024）；居延漢簡：1930–1931 年貝格曼等人發掘、一萬多枚（史語所各頁寫 11,000 餘／一萬餘／1 萬 3 千餘，課文寫「一萬多」）、大量使用隸書、1937 後到香港 → 1940 美國國會圖書館 → 1965-11-23 抵台、陳列館展出 200 餘支、國寶永元器物簿 77 支簡（西元 93–95 年）、邊塞簡多是胡楊紅柳松木、少數竹；竹簡（118204，引《後漢書》「自古書契多編以竹簡」）；《說文》「冊」象其札一長一短中有二編；曹全碑（141469；史語所拓片頁：中平二年 185、現存西安碑林；台北故宮有墨拓本）。**口訣是「雁不雙飛，蠶不二設」**（後人的說法，維基文庫只在十九世紀朝鮮李裕元〈書家正派說〉找到；「蠶不雙設，燕不雙飛」查不到出處，不要用）。**沒寫**：簡冊是不是都捲起來存放（只說「編好的簡可以捲起來」）、熹平石經、八分、禮器碑／乙瑛碑／張遷碑（查到年代，留給以後）。
- 第七課楷行草（`cal-speed.js`，`lab.kind = "speed"`，`data-calspeed-lab`；單元二最後一課）：一個機制——同一個字三種寫法：楷書筆筆分開、行書牽絲相連、草書合併簡化，所以越寫越快。
  - 3D：並排三張紙、三枝筆、三個 `makeWriter`，同一個時鐘一起寫（`data-mode="race"`）；也可以一次只看一種（`kai|xing|cao`，其他兩張直接 `drawTo(dur + 1)` 顯示寫好的字）。每張紙上方的標籤即時顯示秒數，最先寫完的亮起來；右側表格 `[data-cell="n|lift|len|time-<sc>"]`。行書寫到牽絲時紙上標「牽絲」（`speed2d.js` 的 `threadRuns`：壓力 < 0.22、不在頭尾 4% 的一段；選最下面那一段，離字體標籤遠）。
  - **時間是模型算的，不是量真人**：`stats(char)`＝各筆 `strokeDuration` 的和＋提筆次數 × 0.82 秒（makeWriter 的 AIR）。永：楷 5 筆 21.0 秒／行 4 筆 12.4 秒／草 1 筆 8.5 秒；之 18.2／8.8／6.1；水 17.6／9.9／9.5。`test/speed.test.mjs` 檢查「筆數 草 ≤ 行 ≤ 楷、時間 草 < 行 < 楷」和行書「永」有牽絲。卡片上的數字由 `gen` 階段寫進 `parts[].meta_*`（改了筆畫資料要重算）。
  - 筆畫資料：`strokes/running.json`（行書）、`strokes/cursive.json`（草書），各三個字（永之水），寫字引擎格式；產生器裡每一點標 `in|go|turn|th|out` 五種，速度用同一張表（85／300／140／360／130）。楷書用 `yong.json`、`shui.json` 和新的 `zhi.json`（教育部「之」4 畫：點、橫、撇、捺，ID 20043）。
  - **行草的字形不能自己發明**：行書描自神龍本〈蘭亭序〉（Commons〈神龍蘭亭序全.JPG〉，公有領域）的「永」（永和九年）、「之」（暮春之初）、「水」（曲水）；草書描自故宮 Open Data〈墨拓智永書真草千文 冊〉（故帖000004，CC BY 4.0；Commons 有整冊 PDF，一行楷一行草並排）的「永」（永綏吉劭）、「之」（如松之盛）、「水」（金生麗水）。描法同第五課：參考圖放大加方格 → 讀座標 → 自己的印子半透明疊上去比對。草書「之」原字很小，描的時候放大 1.5 倍。
  - 頁面：`sheets`（「法帖裡的字」，`_cal_sheets`：真的拓本與摹本局部，圖在 `assets/img/calligraphy/`，**故宮圖要標 CC BY 4.0 的姓名標示**；直的圖用 `tall: true`）、`scripts`（「這是哪一種字體？」`initScripts`，五種字體各兩題、十題一輪——單元二的總複習）、`parts[].script`（卡片小圖 `canvas[data-cg-script]`，行書的牽絲塗紅）。
  - 練字板加**碼表**（pad.js，`.cg-pad-time`、`__pad.timing()`）：從第一筆下筆到最後一筆提筆的秒數、筆數、提筆次數，和示範比；`pad.scripts`＋`pad.timer` 讓 build.py 畫出字體、範字兩排按鈕（`[data-pad-script]`、`[data-pad-ch]`，cal-speed.js 組成 `yong-kai` 這種 key 呼叫 `setChar`）。
  - 除錯：`document.querySelector('[data-calspeed-lab]').__lab`（`start({ mode, char, fly, instant })`、`sheets`、`state.winner`、`setCam('near'|'top'|'tip')`、`run(秒)`、`render()`）；`[data-cal-scripts].__scripts`（`answer(script)`、`next()`、`state.items`）。
  - 查證過（2026-10）：行書（教育部辭典 110955：介於楷書與草書之間，近於楷書，但筆勢較流暢活潑）；草書（141624：為書寫方便、快速而產生，大約起於秦漢之際；章草「將隸書草率寫成…其字個個獨立」；今草相傳張芝）；狂草（78644：簡筆、連筆甚多，較不易於辨認）；牽絲（100597：筆勢往來之間所牽帶的纖細痕跡）；真草千字文（116500）、智永（114488：相傳書八百本）；故宮〈墨拓智永書真草千文〉說明（關中本，大觀三年 1109 刻；「草、楷並列的方式，無疑方便學習者識草認字」）；蘇軾〈書唐氏六家書後〉「真如立，行如行，草如走，未有未能行立而能走者也」（唐〈臨池訣〉已有「真如立行如行…草如走」）；蘭亭集序（60916：永和九年 353 三月三日、四十一人）、故宮「素有天下第一行書之稱」「原蹟已失傳」；自敘帖（大曆十二年 777，狂草）、書譜（垂拱三年 687）都在台北故宮，2012-03-26 指定國寶；課綱 4-Ⅱ-7、4-Ⅲ-5 楷書，4-Ⅳ-4「認識各種書體」（手冊：辨識篆、隸、草、楷、行）；「草」有草率、底稿的意思（9782）。**重要觀念**：草書不是楷書寫快變來的（草書起於秦漢、從隸書來；楷書約起源於後漢、至魏完備），課文明講三種是「寫法」不是先後。**沒寫**：神龍本是馮承素摹（北京故宮自己說不可信，只寫「古摹本（神龍本）」）、行書創始人劉德昇（傳說）、王羲之生卒年（說法不一，留給第八課）、快雪時晴帖（留給第八或第十課）。教育部辭典被大量 curl 之後會回 404，改用瀏覽器面板確認。
- 第八課王羲之（`cal-lanting.js`，`lab.kind = "lanting"`，`data-callanting-lab`；單元三第一課）：一個機制——曲水流觴（酒杯順著彎彎的小溪漂，停在誰面前誰喝酒作詩），和〈蘭亭序〉裡同一個「之」的四種寫法。
  - 3D：兩個看法（`data-mode="stream|write"`）。`stream`：地面、遠山、竹林、亭子、彎溪（`streamZ`）、十二位坐著的客人、一只紅色漆耳杯；「放一只酒杯」（`[data-float]`）讓杯子漂到隨機一位客人面前停下，計數 `.cg-cups-out`／`.cg-poems-out`。`write`：鏡頭移到溪邊矮几上的紙，毛筆寫 `[data-zhi="z1|z4|z6|z12"]`。**示意模型，不是實景**：實際到的人比十二位多，說明寫在 `lab.scale_*`。
  - 筆畫資料 `strokes/lanting.json`：四個「之」（`z1` 暮春之初、`z4` 宇宙之大、`z6` 視聽之娛、`z12` 係之矣；`index`＝全文第幾個之），都是 2 筆（一點＋一條長線），對著神龍本（Commons〈神龍蘭亭序全.JPG〉，公有領域）描的；`z1` 就是第七課 running.json 的「之」。`test/lanting.test.mjs` 檢查格式與「四個兩兩不同」。
  - 頁面：`zhi20`（「二十個之」，`_cal_zhi20`：`assets/img/calligraphy/lanting-zhi20.jpg` 是 5×4 的拼圖，每格 180 px，照全文順序；每格下面標所在的句子）、`same`（「找出一樣的之」，`lanting2d.js` 的 `initSame`：大格子一個之、下面四選一，八題一輪；跳過第 13 個——它是塗改過的字）、`parts[].zhi`（卡片小圖）。練字板可選四個之、有碼表。
  - 除錯：`document.querySelector('[data-callanting-lab]').__lab`（`setMode(m, { zhi, instant, float })`、`float(客人編號)`、`startWrite(key)`、`people`、`run(秒)`、`render()`）；`[data-cal-same].__same`。
  - 查證過（2026-10）：王羲之（教育部辭典 162632：東晉、右軍將軍、後人稱「書聖」；生卒年各說不一，課文只寫 353 年這場聚會）；修禊（107419）、流觴曲水（63440）、蘭亭（60913：浙江紹興西南）、耳杯（148375）；何延之〈蘭亭記〉（《法書要錄》卷三：二十八行、三百二十四字、「之字最多，乃有二十許個，變轉悉異，遂無同者」；辯才、蕭翼的故事也在這篇）；《世說新語．企羨》劉孝標注引〈臨河敘〉：二十六人賦詩、十五人不能賦詩罰酒各三斗（宋代名單則是 42 人，**人數各說不一，課文只寫「早期的記載說」**）；《晉書》卷八十（寫經換鵝、老婆婆的竹扇）；《世說新語．雅量》（東床坦腹）；台北故宮〈快雪時晴帖〉（故書000141：唐代精摹本、行書四行二十八字、乾隆「三希」；2012-03-26 指定國寶）。
  - **沒寫**：太宗把原蹟葬入昭陵（何延之只說「隨仙駕入玄宮」，劉餗另有說法，課文寫「唐朝的書上說…入葬了」）；神龍本是馮承素摹的（北京故宮自己說不可信；dpm.org.cn 從這裡連不上，沒有列為出處）；「書聖」是誰先叫的（查不到，寫「後人稱」）；墨池的故事（原本說的是張芝）；教育部〈蘭亭帖〉條印的「三百四十二字」（疑為誤植，不引）。
- 第九課顏筋柳骨（`cal-styles.js`，`lab.kind = "styles"`，`data-calstyles-lab`；slug `yan-and-liu`）：一個機制——同一個字、同樣的筆畫，兩位書法家的提按輕重和結構不同，所以風格不同（顏真卿粗而飽滿、柳公權瘦而挺）。
  - 3D：並排兩張紙、兩枝筆（左顏、右柳），**同一筆一起下筆**（每一筆等兩邊都寫完＋0.82 秒才換下一筆，`local(sheet, t)` 把全域時間換成各自寫字員的時間）。`data-mode="both|yan|liu"`、`data-char`（十人大）、`data-stroke="all|0|1|…"`（只重播一筆，其他筆用 `paper.setUnder` 淡淡畫在底下；按鈕依字的筆數由 JS 產生）。右側 `.cg-sty-curve` 用 `drawCompare` 畫這一筆兩人的提按曲線（金＝顏、藍＝柳）；表格 `[data-cell="avg|max|min-<who>"]` 是線寬（styles2d.js 的 `widths`：只算行筆 phase 1，min 取第 8 百分位），單位換成 25 公分字框的公分。寫完的訊息用**畫面上四捨五入後的兩個數字**算倍數（學生自己除才對得起來）。
  - 筆畫資料 `strokes/styles.json`：`chars.<shi|ren|da>.{yan,liu}.{from, xf, strokes}`。由 `tools/callig/gen/styles_chars.py <拓本單字圖資料夾> src/strokes/styles.json` 產生（疊圖檢查 `styles_check.py`、題庫拼圖 `who_sprite.py`；參考圖不進 repo）：**中心線手讀座標，壓力由拓本量線寬換算**（Otsu 二值化 → 距離轉換 ×2 → 乘上放大倍率 → `footprint` 反函數）；兩種寫法都放大到長邊 660 單位才能比粗細（`xf`＝原圖中心與倍率，疊圖檢查用）。`test/styles.test.mjs` 檢查格式、筆數（十 2、人 2、大 3）、長邊 660、「顏的平均線寬 > 柳 × 1.15」。目前：十 1.35 倍、人 1.19 倍、大 1.47 倍——課文寫「1.2 到 1.5 倍」，改資料要一起改課文。
  - 參考拓本（公有領域，Wikimedia Commons）：顏＝〈多寶塔碑〉北宋拓本（東京國立博物館 TB-1371）；柳＝〈玄秘塔碑〉整拓；歐＝〈九成宮醴泉銘〉（日本國會圖書館複製本）；趙＝〈帝師膽巴碑〉卷（北京故宮藏）。**〈多寶塔碑〉是顏真卿四十四歲的早期作品，比晚年的字瘦**（故宮說明）——頁面的迷思卡有講，不要寫成「顏體都這麼粗」。
  - 頁面：`pairs`（「同一個字，四位書法家」，`_cal_pairs`：大之無以 × 歐顏柳趙，圖 `assets/img/calligraphy/four-<who>-<字>.jpg`）、`who`（「這是誰的字？」，`_cal_who`＋styles2d.js 的 `initWho`：拼圖 `yanliu-who.jpg` 5×4，上兩列顏、下兩列柳；**底色處理成一樣**，不然看拓本底色就猜得出來——兩次 Otsu 分出字與石花，字形不改）、`parts[].style`＋`ch`（卡片小圖 `canvas[data-cg-style][data-key]`）、練字板 `pad.masters`（兩排按鈕 `[data-pad-who]`、`[data-pad-ch]`＋`.cg-pad-like`「你的線條比較像誰？」，`initLike` 只比平均線寬）。
  - 除錯：`document.querySelector('[data-calstyles-lab]').__lab`（`start({ mode, char, stroke, fly, instant })`、`state.plan/starts/total`、`setCam`、`run(秒)`、`render()`）；`[data-cal-who].__who`（`answer(who)`、`next()`）；`[data-cal-pad].__like()`。
  - 查證過（2026-10）：顏筋柳骨（教育部辭典 155363）；出處是范仲淹〈祭石學士文〉（慶曆三年 1043，祭石曼卿），**原句是「曼卿之筆，顏筋柳骨」**（蘇軾〈書石曼卿詩筆後〉所引；「延年之筆」是《宣和書譜》轉引的寫法；維基文庫《范文正公集》作「顔精栁骨」）；柳公權（63705：778–865）「用筆在心，心正則筆正」「碑板不得公權手筆者人以為不孝」「此購柳書」「初學王書」都在《舊唐書》卷 165（附在柳公綽傳）；顏真卿守平原、遇害（《舊唐書》卷 128）；顏季明（《新唐書》卷 192；《舊唐書》人名不同）；〈祭姪文稿〉（故宮 故書000060：乾元元年 758、234 字＋塗抹 34、鮮于樞跋「天下行書第二」；2012-03-26 國寶）；〈多寶塔碑〉天寶十一載（752）、〈玄秘塔碑〉會昌元年（841）裴休撰。
  - **沒寫或小心寫**：顏真卿生卒年（辭典 708–784、故宮 709–785，課文只寫「八世紀」「七十多歲」）；「楷書四大家」誰先說的查不到 → 寫「大家常合稱」；柳學顏是蘇軾的看法，不是史書說的；「字如其人」當作古人的看法；劉熙載《藝概》那句查不到原文，不引；三碑現藏西安碑林只有次級來源，不寫。
- 第十課故宮國寶（`cal-gallery.js`，`lab.kind = "gallery"`，`data-calgallery-lab`；slug `palace-treasures`；**全系列最後一課，`units[2].planned` 已清空**）：一個機制——光造成的傷害會累積（照度 × 時間），所以書畫展廳燈暗、展期短、展完要休息。
  - 3D：示意展廳（**不是故宮實景，作品不照比例**），牆上五件作品（`lab.works`：key／img／aspect／作者／年代／字體／尺寸／說明，寫在 root 的 `data-works`；貼圖用 TextureLoader 載 `assets/img/calligraphy/gal-<key>.jpg`，載入前是寫著作品名的米色紙）。`data-mode="tour"`：點作品（raycast，按下放開差 8 px 內才算）、`[data-work]`、`[data-step]` 鏡頭飛過去，右側資訊卡；`data-mode="light"`：中間展櫃一條染色試紙（左半蓋住），`.cg-lux` 滑桿（對數，50–5000 lux）＋`[data-lux]`、`[data-days="40|365"]` 展出、`.cg-reset` 換新試紙。試紙用 MeshBasicMaterial（調亮時才不會過曝成一片白）。
  - **真的數字只有故宮的規定**（`gallery2d.js`：`HOURS = 8`、`LIMIT = 16000`、`daysToLimit`）：〈國立故宮博物院文物展覽保存維護要點〉——書畫不高於 50 lux；限展書畫年累積照度不高於 16,000 lux·h（例如 50 lux、每天 8 小時，可展 40 天）。面板算「這個亮度幾天用完一年的額度」「用掉幾倍額度」。**試紙褪色（`fadeOf`＝1−e^(−E/E0)，`lab.e0`）只是示意**，頁面上明講不是任何文物的實測；牆上的作品在模型裡不會褪色。`test/gallery.test.mjs` 檢查這些。
  - 頁面：`sheets`（沿用第七課 `_cal_sheets`：五件作品的局部 `gal-<key>-d.jpg`）、`tline`（`_cal_tline`：五件排年代，手機直排）、`match`（「這是哪一件？」`_cal_match`＋`initMatch`：每件兩張局部 `gal-<key>-m1|m2.jpg`，十題）、`recap`（`_cal_recap`：十堂課回顧，課名直接讀 CAL，放在延伸閱讀前）、練字板沿用第七課三種字體的永之水（預設行書）。
  - 影像：五件都來自 Wikimedia Commons 上的故宮 Open Data 轉存 PDF（`NPM-故書000141…pdf` 等），**每張圖旁都標「〈品名〉。國立故宮博物院，台北，CC BY 4.0 @ www.npm.gov.tw（經裁切、拼接）」**；長卷是多張分段影像拼的。故宮典藏頁自己的下載要過驗證碼。
  - 除錯：`document.querySelector('[data-calgallery-lab]').__lab`（`setMode(m, { work, instant })`、`showWork(i)`、`setLux(v)`、`runDays(n)`、`resetLight()`、`works`、`run(秒)`、`render()`）；`[data-cal-match].__match`。
  - 查證過（2026-10）：五件的典藏頁——快雪時晴帖 Detail/19（故書000141，23×14.8，唐代精摹本）、書譜 14900（故書000058，26.5×900.8，垂拱三年 687，351 行約 3,700 字）、祭姪文稿 3（故書000060，28.2×77，758）、自敘帖 14901（故書000062，28.3×755，大曆十二年 777；**另一卷 14890 不是國寶，別引錯**）、寒食帖 14714（**購書001001**，34.2×199.5 含黃庭堅跋）；五件都是 2012-03-26 指定國寶。院史頁（1925 成立、1933 南遷 13,427 箱又 64 包、1948–49 運臺、1965-11-12 臺北新館）；法書 3,757 件；限展 70 件、展期上限 42 天、間隔三年以上（展覽頁）；一般書畫展三個月、歸庫至少十八個月；參觀須知（禁閃光燈、展廳 20–24°C）。CCI：累積曝光＝lux × 小時；碳墨屬最不怕光的材料（怕光的是紙絹與顏色）。
  - **沒寫或小心寫**：「天下第三行書」查不到古人出處（寫成迷思：董其昌「蘇書甲觀」有記錄，三大行書是後人的說法）；〈寒食帖〉不是 1949 隨故宮文物來台的，是 1987 年故宮購藏；它的燒痕成因有兩說，課文正文只寫「下緣有火燒過的痕跡」，故事卡註明是卷後題跋的說法；書寫年代館方說法不一 → 寫「詩作於 1082，這卷字寫於當時或稍後」；五件裡只有〈書譜〉〈快雪時晴帖〉查得到列在限展名單 → 不寫「五件都是限展品」；蘇軾生年（1036／1037）、懷素生卒不寫；教育部辭典「自敘帖」條年號有誤（廣德十二年）不引；教室、日光的照度沒查到可引的台灣來源 → 預設鈕只標「規定／十倍／一百倍」。
- **第二批（單元四〈生活裡的書法〉，`units[3]`，key `life`）**：第十一～十五課都已上線，**全系列 15 課完成**（`planned` 是空的；系列首頁「15 of 15」）。
- 第十一課春聯（`cal-couplets.js`，`lab.kind = "couplets"`，`data-calcouplets-lab`；slug `spring-couplets`）：一個機制——一副對聯有上下之分：上聯末字仄聲、下聯末字平聲，照習慣面對大門時上聯貼右邊。
  - 3D 兩個模式（兩個 Group 切換顯示）。`write`：書桌上一張**斗方**（`makePaper({ diamond: true, color: RED })`——**這一課給共用的 brush3d.js makePaper 加了 `diamond`、`gridColor` 兩個選項**：畫布是正方形、只畫內接的菱形、其餘透明，字框邊長要 ≤ 對角線的一半；預設值不變，前十課不受影響，但所有 bundle 都會重打包），毛筆寫 `[data-char="chun|fu"]`，右側顯示第幾筆與筆畫名。`door`：示意的大門，兩條直聯、橫批、兩張斗方都是 CanvasTexture（`couplet2d.js` 的 `drawStrip`／`drawTop`／`drawFang`）；`[data-couplet]` 換一副（換的時候左右隨機）、`.cg-swap` 對調、`.cg-check` 檢查（`state.upperRight` 為真才對）、`.cg-flip` 把「福」倒過來（說明文字在 root 的 `data-flip-on|off`）。
  - **長條春聯上的字是系統字型**（`FONT`：Kaiti TC／標楷體／PingFang TC…），只是標示，不是書法範本，頁面的 scale 說明有講；斗方上的「春」「福」才是寫字引擎的筆畫資料。字型載入後要重畫（`document.fonts.ready`）。直聯、橫批的貼圖放在 z＝0.055，要在牆腳飾帶（前緣 z＝0.04）前面。
  - 筆畫資料 `strokes/chun.json`（9 畫）、`fu.json`（13 畫）：`tools/callig/gen/couplet_chars.py` 產生（自己畫的中心線＋壓力；`heng`／`shu`／`dian` 小樣板，筆畫多所以壓力比前幾課小；太短的筆用 `slow()` 放慢到一筆至少 1 秒）。筆順、筆數照教育部筆順學習網（頁面原始碼的 xml 有每一筆的 Track，可確認順序；**只拿來確認筆順與位置，不直接用它的外框**）。
  - 對聯資料在 `data/calligraphy.json`：`lab.couplets`（大門用 4 副）與 `sides.couplets`（遊戲用 6 副），每句 `{ text, last: { zh, py, tone, ze } }`，a＝上聯、b＝下聯。`test/couplet.test.mjs` 檢查上仄下平、字數相等、**遊戲裡不放國語聲調和平仄不一致的陷阱字**（例如末字是「福」「節」這種古入聲字）。
  - 頁面：`parts[].strip`（`v|h`，`_cg_strip_svg`）、`parts[].fang`（`_cg_fang_svg`，純 SVG）、`sides`（「哪一句是上聯？」`_cal_sides`＋`initSides`）、練字板用既有的 `pad.chars`＋`order`。
  - 除錯：`document.querySelector('[data-calcouplets-lab]').__lab`（`setMode`、`startWrite(key)`、`setCouplet(i)`、`swap()`、`check()`、`flipFu()`、`run(秒)`、`render()`）；`[data-cal-sides].__sides`（`answer(0|1)`、`next()`）。
  - 查證過（2026-10）：春聯（教育部辭典 126155）、對聯 48134、桃符 50179（引《燕京歲時記》「春聯者，即桃符也」）、斗方 43311（「用以書寫吉祥文字，貼在門上的方形紙」）、平仄 25978、入聲 136666；《宋史》卷 479 孟昶「新年納餘慶，**喜**節號長春」（常見寫法「嘉節」；《楹聯叢話》卷一紀昀說這一聯「最古」，另有敦煌遺書更早之說）；上仄下平與上聯在右只找到學校與教師的說明（麗山高中〈閒話對聯〉、民族國小書法網），**沒有官方條文** → 課文寫「照習慣」；福倒貼的「福到」諧音有農業部兒童網；總統府 115 年賀詞「七喜春來」（余天賜書）；故宮、國父紀念館的新春揮毫。
  - **沒寫或小心寫**：明太祖下令貼春聯（清代筆記《簪雲樓雜說》的轉引，寫成傳說）；孟昶是不是「第一副春聯」（寫「清朝學者說最古，也有更早的例子」）；大門的福字該不該倒貼（只有媒體與宮廟說法 → 寫「每一家習慣不同」）；橫批由右往左只在 scale 說明裡說是「傳統的貼法」；「歲歲平安日」原句是「歲歲平安節」（節是入聲，不放進遊戲）；寫春聯的實務步驟（摺格子、平放晾乾）是教學經驗，沒有標出處。
- 第十二課印章與篆刻（`cal-seal.js`，`lab.kind = "seal"`，`data-calseal-lab`；slug `seals`）：一個機制——**印面上的字是反的，蓋出來才是正的**（蓋印會把左右翻過來）；朱文（陽刻、字凸）蓋出來字是紅的，白文（陰刻、字凹）蓋出來字是白的。
  - 3D：書桌、一張寫好「永」的紙、印泥盒、一顆印章（原點在印面中心、`rotation.order = 'YXZ'`）。`.cg-stamp` 跑時間軸 `keys()`（[秒, x, y, z, 傾斜, 轉向]）：拿起來把印面翻給你看 → 蘸印泥（`T_INK`，印面凸的地方變紅）→ 再翻給你看 → 轉 180° 蓋在紙上（`T_PRINT`）→ 放回桌上。**翻給人看之後要繞 Y 轉 180° 再蓋**，蓋出來的字才是頭朝外（實測過 3D 印面和 2D 對照圖方向一致）。`.cg-look` 只翻印面；`[data-char]`（日月山水人馬）、`[data-style="zhu|bai"]`、`[data-carve="mirror|straight"]`（照正的刻 → 蓋出來是反的）；紙上最多留三個印（`SLOTS`），`.cg-clear` 換紙。右側 `.cg-seal-face`／`.cg-seal-print` 兩張 2D 小圖隨時對照。
  - **預設字是「馬」，不能用左右對稱的字**：小篆的日、山、水幾乎對稱（`seal2d.js` 的 `SYMMETRIC`），反著刻和正著刻看不出差別（第一版預設「山」就踩到）；選到對稱字時蓋完會多一行提示。`test/seal.test.mjs` 檢查預設字不在 `SYMMETRIC` 裡。
  - `seal2d.js`：印面的字用第五課的小篆（`scripts2d.js` 的 `drawSeal`），先畫成遮罩再上色——`drawImpression`（朱文＝紅字＋紅框；白文＝紅底挖掉字；`speckle` 挖小白點示意印泥不均勻）、`drawFace`（凸的地方亮、凹的地方暗，`inked` 時凸的地方變紅；`carve === 'mirror'` 時左右翻）；`printReads(carve)`、`inkAt(style, onChar)` 兩個純函式；`initKind`（「朱文還是白文？」八題）、`initDesign`（「設計自己的印」：選字、朱白、方圓，可存 PNG）。
  - 頁面：`parts[].seal`（卡片小圖 `canvas[data-cg-seal][data-view="print|face"][data-carve]`）、`sheets` 的 `whole: true`（整張圖不裁切、圖左文右，`cg-sheet-whole`；這一課放第十課的 `gal-kuaixue.jpg` 看鑑藏印）、`sealkind`、`sealdesign`、練字板寫小篆（`sealChar(key)`）。這一課的 `safety` 是自己的（印泥含硃砂要洗手、不用刻刀改用泡棉）。
  - 除錯：`document.querySelector('[data-calseal-lab]').__lab`（`setOpt(k, v)`、`stamp()`、`look()`、`clearPaper()`、`prints`、`seal`、`run(秒)`、`render()`）；`[data-cal-sealkind].__kind`、`[data-cal-sealdesign].__design`。
  - 查證過（2026-10，教育部辭典）：篆刻 119430（「因印章多模仿秦漢古印，採用大小篆體，先寫後刻」）、朱文 117979（引楊慎「陽文曰朱文，陰文曰白文」）、白文 14089、印泥 157091（硃砂和油；簡編本多「艾絨」）、封泥 36827、璽 6856（秦以後專指帝王的印）、引首章 156880（右上）、壓角章 151963（右下）、閒章 108043、鑑藏印 93737、落款 66693、印鑑 157110；蔡邕《獨斷》「秦以來天子獨以印稱璽」；史語所「檢」；故宮「古稀天子之寶」玉璽（Detail/1846?dep=U，故玉006652，1780，碧玉，12.8 公分見方）；戶政司印鑑登記（一種為限、1–3 公分、不得用橡膠）；民法第 3 條。
  - **沒寫或小心寫**：王冕用花乳石、文彭用燈光凍（只有傳說與二手來源，而且有人質疑 → 不寫）；印章什麼時候改蓋在紙上（各說不一 → 只寫「印章比紙古老得多」）；印泥有蓖麻油（查不到官方來源 → 只寫硃砂、油、艾絨）；田黃三連章在北京故宮、不在台北 → 改用台北的「古稀天子之寶」；〈快雪時晴帖〉上的印數只寫「好幾十種」（典藏頁列 17＋37 個印項，有的重複蓋）；課綱沒有篆刻條目 → 出處裡明講；「印面要反著寫」找不到官方原文 → 用模型自己示範，不引文獻。美式拼字：backward（不是 backwards）。
- 第十三課抄經（`cal-sutra.js`，`lab.kind = "sutra"`，`data-calsutra-lab`；slug `copying-sutras`）：一個機制——**慢而勻**：一格一個字、每個字一樣大、由上到下、由右到左。是文化與書法課，不是宗教課：語氣中性，活動讓學生自己選要抄的文字。
  - 3D：書桌上一張畫了烏絲欄的紙（`paper.setUnder(drawRules)`），毛筆把〈心經〉的一句「色即是空，空即是色」寫進 2 行 × 4 格。`sutra2d.js` 的 `page(LINE, { mode })` 把八個字縮小排進格子、合成一個「字」給 makeWriter 一次寫完；`cellOf(i)` 決定第 i 個字在哪一格（第一行在最右邊）。`data-mode="steady|rushed"`：`rushed` 是示意（隨機的大小、位移、歪斜、線細、速度快，固定亂數種子；點會夾在字框內），`evenness` 只是量和 steady 差多少。右側顯示第幾個字、秒數、「照這個速度抄完整部（`lab.total`＝260 字）要幾分鐘」。速度鈕是 1×／2×／4×（抄經本來就慢）。手機上（`cg-narrow`）不顯示行的標籤。
  - 呼吸圈 `.cg-breath`：CSS 動畫 8 秒一圈＋每 4 秒換字（吸氣／吐氣），只是節奏提示，和寫字時間軸無關；`prefers-reduced-motion` 時不動。
  - 筆畫資料：`strokes/xin.json`（心 4 畫）、`se.json`（色 6）、`ji.json`（即 7）、**`shi4.json`（是 9）**、`kong.json`（空 8），`tools/callig/gen/sutra_chars.py` 產生。**「是」的 key 是 `shi4`：`shi.json` 已經是第四課的「十」**（第一版直接存成 shi.json，把「十」蓋掉，`git status` 看到 cal-order.js、cal-press.js 也變了才發現；`test/sutra.test.mjs` 現在會檢查 shi.json 還是「十」）。**新增筆畫資料前先 `ls src/strokes` 看有沒有同名的。**
  - 頁面：`sheets`（三件墨跡：趙孟頫〈心經〉、敦煌寫經、弘一 1939 年對聯，圖 `assets/img/calligraphy/sutra-*.jpg`）、`order`（「下一個字寫在哪一格？」`_cal_order`＋`initOrder`，3 行 × 4 格）、練字板（五個字、筆順數字、碼表——這一課是越慢越好）。這一課沒有 `parts` 卡片。
  - 影像授權：趙孟頫與弘一是 Wikimedia Commons 標公有領域的檔案（趙的那張翻拍自出版品，頁面有註明）；敦煌卷是大英圖書館 Or.8210/S.1609，國際敦煌項目影像 **CC BY 4.0，一定要署名並註明經裁切**。
  - 除錯：`document.querySelector('[data-calsutra-lab]').__lab`（`start({ mode })`、`PAGES`、`perChar()`、`wholeMin()`、`run(秒)`、`render()`）；`[data-cal-order].__order`（`tap(i)`、`order`、`reset()`）。
  - 查證過（2026-10）：〈心經〉玄奘譯（CBETA T08 No. 251），**正文自己數是 260 字**（從「觀自在菩薩」到咒語末字；用 `https://cbdata.dila.edu.tw/stable/juans?work=T0251&juan=1` 抓、去掉校註與行號再數）；教育部辭典：般若波羅蜜多心經 12954、烏絲欄 158753、小楷 106786、弘一 86771（1880–1942，1918 年杭州虎跑寺出家）、敦煌石室 48535（1900 年發現）；《金剛經》「何況書寫、受持、讀誦、為人解說」（T0235）；崔中慧〈佛教初期寫經坊設置蠡測〉（經生）；弘一大師紀念學會年表（寫經、結緣、「悲欣交集」）；《美育》183 期引弘一自述「平淡、恬靜、沖逸之致」；故宮〈唐人寫經 卷〉（Detail/17596，每行十七字）；國圖藏敦煌文獻 142 號；佛光山抄經堂；Getty／CJM／V&A（其他文化的手抄傳統）。
  - **沒寫或小心寫**：教育部辭典沒有「抄經」「寫經生」，辭典的「經生」是漢代五經博士（不引）；書法有助專注或放鬆的研究樣本都是成人、證據不足 → 不寫療效，只說「練習專注」；「色即是空」不解釋義理，只說「人們思考了一千多年，這一課只是把它寫下來」；〈心經〉是否玄奘所譯有學術爭議 → 寫「玄奘譯本」；敦煌寫本的件數、發現的月日各說不一 → 只寫 1900 年；故宮署歐陽詢的〈心經〉拓本年代有疑 → 不用；梵文術語這一課沒放（找不到可直接引的一手辭典來源）。CBETA 經文是 CC BY-NC-SA 4.0，只引一句並標明出處。
- 第十四課中西書法（`cal-pens.js`，`lab.kind = "pens"`，`data-calpens-lab`；slug `east-and-west`）：一個機制——**工具決定線條**：毛筆是軟的，粗細看「按多重」；平頭筆（broad-edge pen）是硬的扁嘴、筆嘴角度固定，粗細只看「往哪個方向走」。
  - `nib.js`（純函式，`test/nib.test.mjs`）：`nibWidth(W, dir, nib)`＝W·|sin(dir − nib)|（**沒有壓力這個參數**）、`edge(nib)`、`resample`、`smooth`、`sweep(pts, W, nib)`（筆嘴掃過路徑，每小段一個四邊形＋線寬、方向）、`widthStats`、`LETTERS`（**自己畫的** n、o、a 骨架：以圓形的 o 為基礎、每個字母兩筆、不往上推；不是任何歷史字體的複製）、`NIB_W = 90`、`NIB_DEG = 30`。方向用數學座標（0＝往右、逆時針為正），畫布 y 往下所以 dy 要反號。
  - 3D：並排兩張紙。左：毛筆寫「永」（makeWriter）。右：平頭筆（3D 模型：扁筆嘴＋筆桿，`pen.rotation.y`＝筆嘴角度）寫 n o a；**平頭筆的墨不是毛筆的印子，是四邊形**，用 `paperP.setUnder` 每次重畫到目前的進度（`drawPen(count)`）。`data-mode="both|brush|pen"`、`data-what="word|yong"`（讓平頭筆沿「永」的中心線走——看它做不出提按；這時筆嘴寬用 70）、`.cg-nib-deg` 滑桿（0–90°，改了就重來）。右側即時：毛筆壓力與線寬、平頭筆方向與線寬、`drawRose`（「方向 → 粗細」的 8 字形圖，金色短線＝筆嘴的邊）。線寬趨近 0 時顯示「hairline 極細」。
  - `pens2d.js`：`drawNib`、`drawPenChar`、`drawBrushChar`、`drawRose`、卡片小圖 `canvas[data-cg-pen="brush|nib|nib90|nibyong"]`（`parts[].pen`）、`initTool`（「這一筆是哪一種筆寫的？」毛筆 4 題＋平頭筆 4 題）、`initNibPad`（**平頭筆練字板**，獨立於 pad.js：粗細只看方向，可調筆嘴角度、淡紅範字、小的 rose 圖；`__nibpad.write(點)` 回傳平均線寬）。頁面上「練字板一」是平頭筆、「練字板二」是原本的毛筆練字板（永）。
  - 影像（`assets/img/calligraphy/pens-*.jpg`，都標公有領域）：勒特雷爾詩篇（大英圖書館 Add MS 42130 f.200r，哥德體）、Edward Johnston 1906 年書第 66 頁 Fig. 42（Internet Archive）、十四世紀古蘭經頁（大都會 57.141；**沒寫字體名稱**，子代理人沒能在館方頁面確認）。
  - 除錯：`document.querySelector('[data-calpens-lab]').__lab`（`start({ mode, what, deg, instant })`、`penTimeline()`、`run(秒)`、`render()`）；`[data-cal-tool].__tool`；`[data-cal-nibpad].__nibpad`。
  - 查證過（2026-10，Britannica 與 Met 用 curl 會 403／429，要用瀏覽器面板）：Britannica Kids「calligraphy」（硬的平頭筆 vs 有彈性的筆尖或毛筆靠壓力——最貼近這一課的一句）；Met〈Chinese Calligraphy〉（傳統中國最看重的視覺藝術、flexible hair brush、直行由右至左）；Merriam-Webster 字源（kallos＋-graphia）；Britannica：quill（六世紀到十九世紀中、鵝毛）、Edward Johnston（1872–1944，現代書法復興，1906 年的書）、black letter、round hand／copperplate（有彈性的尖頭筆）、qalam（斜切的蘆葦筆）；Getty（鵝或天鵝毛）；教育部辭典「書法」133149；教育部《中文書寫及排印方式統一規定》；英語文領綱 4-Ⅱ-1、3-Ⅳ-1。
  - **沒寫或小心寫**：「西洋書法都用硬筆」不對（copperplate 靠壓力）→ 課文一律說「平頭筆」並放一張迷思卡；「foundational hand」這個詞不在 Johnston 1906 年的書裡 → 不用；calligraphy 的字源兩家字典說法略有出入、首見年份不一 → 只寫「字典把它追溯到美與寫」；Met 那句只說傳統中國 → 卡片標題用 East Asia 但內文照原意寫中國；「筆嘴角度 30–45 度」找不到權威來源 → 模型預設 30° 但不說這是標準；2005 年公文橫式只是公文 → 引教育部的統一規定。
- 第十五課毛筆字和硬筆字（`cal-pencil.js`，`lab.kind = "pencil"`，`data-calpencil-lab`；slug `brush-and-pencil`；全系列最後一課）：一個機制——**把粗細拿掉，結構還在**：毛筆和鉛筆寫同一個字，走同一條中心線（同一份筆畫資料），筆畫數、筆順、位置都一樣，只有線寬不同。
  - `pencil.js`（純函式，`test/pencil.test.mjs`）：`PENCIL_W`（12，字框單位）、`centerline(st)`（就是 prepStroke 的取樣點）、`pathLength(char)`、`slimStamps(sts, f)`（f＝1 毛筆、f＝0 每個印子一樣大＝鉛筆）、`widthRange(sts)`（**整條線都算**、最細取第 5 百分位；只看行筆那段會把比值算成 2 倍，太小）、`alter(pts, kind, sign)`（`short|long|shift|tilt`）、`candidates(char)`（改完還在格子裡、至少偏 80 才出題）。
  - 3D：並排兩張紙，**同一個 makeWriter 的姿勢同時餵給毛筆和鉛筆**（鉛筆模型原點在筆尖、`pcIn.rotation` 往右後方倒）；鉛筆線用 `paperP.setUnder` 重畫（`writer.strokes[i].s` 的折線），`data-t="shadow"` 在鉛筆線底下墊淡灰的毛筆字。`data-mode="both|brush|pencil"`、`data-ch="yong|xin|chun"`；右側表格（筆畫數、路線長度、最粗、最細）以 25 公分方格換算。
  - `pencil2d.js`：卡片小圖 `canvas[data-cg-pc="brush|pencil|both|order"]`（`parts[].pc`）、`initSlim`（`[data-cal-slim]`，「把粗細拿掉」滑桿；**畫布 class 是 `cg-slim-cv`，不要加 `cg-pad-cv`**——那個 class 有 `touch-action: none`，手機上會擋住捲動）、`initSpot`（`[data-cal-spot]`，「哪一筆寫歪了？」：一張 2:1 畫布，左毛筆範字、右鉛筆照寫，點右邊；答對後綠色虛線畫出正確位置）。
  - `pad.js` 多了**鉛筆模式**（`[data-pad-tool]`，`pd["tools"] = "pencil"` 是預設；鉛筆的印子大小固定、顏色 `PENCIL_INK`，每一筆記住自己是哪種筆）和**格子種類**（`[data-pad-grid]`：`tian|jiu|mi`；`ink2d.js` 的 `drawGrid` 與 `makePaper.setGrid` 都多了 `'tian'` 田字格）。沒有這些按鈕的課完全不受影響。
  - `recap`：十五課回顧（第十課的回顧 lead 改成「前十課的最後一課」）。
  - 除錯：`[data-calpencil-lab].__lab`（`start({ mode, ch, shadow })`、`demo('brush|pencil|both|order')`、`run(秒)`、`render()`）；`[data-cal-slim].__slim`（`set(f)`、`setChar(key)`）；`[data-cal-spot].__spot`（`target()`、`kind()`、`pick(第幾筆)`、`next()`）；`[data-cal-pad].__pad.setTool('pencil')`、`setGrid('jiu')`。
  - 查證過（2026-10）：國語文領綱 4-Ⅰ-4、4-Ⅰ-5、4-Ⅱ-6、4-Ⅱ-7「習寫以硬筆字為主，毛筆為輔」、實施要點 p.26（第一階段硬筆、第二三階段兼習毛筆）、p.50（硬筆格子 1.5–2 公分、大楷 8–12 公分）、p.52（「以質為主要考量，避免過度練習」「形體端正、工整、美觀」的順序、「描紅、臨摹、自運與應用」）；教育部辭典「間架」92882、「九宮格」92062、「筆順」17694、「鉛筆」100662（**取第二義項**，第一義項是古代的鉛粉筆）、「臨摹」64697、「描紅」31243；115 年全國語文競賽實施要點（寫字一律傳統毛筆楷書、50 分鐘 50 字、學生組 7 公分見方、筆法 50%＋結構與章法 50%）；Britannica「pencil」（石墨，不含鉛）；Staedtler（H＝Hard、B＝Black）；行政院兒童網護眼 6 招（35–45 公分、用眼 30 分鐘休息 10 分鐘）。
  - **沒寫或小心寫**：**找不到實證說「練毛筆會讓硬筆字變好」**（只有經驗談和沒有對照組的行動研究）→ 課文明講「不這樣保證」，只講模型看得到的「兩種筆共用筆順和結構」；教育部辭典**沒收**「硬筆」「田字格」「米字格」「原子筆」，「結構」沒有書法義項（引「間架」）；「一拳一尺一寸」是中國大陸的說法、台灣官方沒找到，「頭正身直臂開足安」也沒有官方出處 → 都沒寫，只引行政院兒童網的數字；握筆手勢沒有可引的官方文字 → 沒做握筆示範；全國語文競賽**沒有硬筆寫字組**；Britannica 那句「HB, the softest」是製圖鉛筆的分級，沒照抄；手寫 vs 打字的研究（Mueller & Oppenheimer 2014 被 Urry 2021 重做沒有重現）→ 沒寫。
- 和既有系列互相連結：第八課連古文選讀〈蘭亭集序〉（`data/guwen.json` 的 `lan-ting-ji-xu`），第十課連〈前赤壁賦〉（`qian-chi-bi-fu`）；每一課的 `links` 放上一課（真的連結）與下一課預告卡（`soon: true`）。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/calligraphy/<slug> --out audio/say-<slug>` → `python3 tools/upload_say_dir.py assets/data/say/calligraphy-<slug>.json audio/say-<slug>`（manifest 命名 `calligraphy-<slug>`；`gen_audio.py` 的 SHORT_PAGES 已加本系列）。worktree 裡先把 `~/Developer/repos/twrses/tools/.r2_uploaded_cache.txt` 複製過來，做完 `sort -u` 合併回去。
- 課程規劃在 Obsidian：`第二大腦/創作庫/書法課程規劃（twrses）.md`（三單元十課、待查證清單、交接指令）；系列索引 `第二大腦/英文學習/書法（twrses.org）.md`。

---

## 電腦概論 How Computers Work（/resources/classes/computers/）— 架構照書法，3D 是「位元引擎」

- 內容：`data/computers.json`：`units[]`（四個單元：電腦的語言 0 和 1／機器裡面／軟體／連線、安全與 AI）底下 `lessons[]` 與 `planned[]`（「製作中」卡，做一課就從 planned 移到 lessons）；課次 `n` 全系列連號（1–16），系列首頁自己算「x of 16」。每課欄位同書法，不同的：`parts[].bits`（卡片小圖的一排燈，例如 `"0111"`）、`fingers`／`guess`／`levels`（三個不需要 WebGL 的小互動，各有 `eyebrow/en/zh/lead_en/lead_zh`）、`tricks_head`、`safety_head`、`sources_note_en/zh`（標題文字放資料，不寫死在 build.py）。`links` 可放 `soon: true` 的預告卡。
- 頁面：`build.py`「電腦概論」區塊的 `build_comp_hub()`（單元導覽＋`.lc-row` 橫向課程卡；系列小圖示 `comphub_svg()`＝螢幕上兩排小燈，第一課卡 `compbits_svg()`；`_COMP_CARD` 把 `card` 對到圖示函式）/ `build_comp_lesson()`；reading、迷思、口訣、活動沿用 `render_basic_unit()`、`_sci_myths()`、`_sci_tricks()`、`_astro_activity()`。「閱讀與經典」頁有入口卡（💻）。段落順序：3D → 英文閱讀 → 模型卡 → 五根手指 → 猜猜這是多少 → 十種亮度 → 打字看編號 → 8 × 8 像素畫 → 聲音取樣 → 把閘接起來 → 換你當邏輯閘 → 半加器／全加器 → 自己當加法器 → 這個工作是誰做的 → 裝得下多少 → 自己排程式 → 猜下一步 → 文化卡 → 迷思 → 口訣 → 動手之前 → 活動 → 延伸閱讀 → 資料出處。
- 樣式：共用 `assets/css/astro.css`，本系列專屬的在 `assets/css/computers.css`（**class 前綴一律 `cp-`**；晶片的 chips.css 也用 `cp-`，兩支只各自載在自己的系列，不會同時出現——不要把其中一支載到另一個系列的頁面）；`_comp_head()` 只在本系列頁面載入。
- 3D：**原始碼在 `tools/computers/src/`**（自己的 package.json，three 0.186.1、esbuild 0.25.10），bundle 一律 `comp-*`；`lab.kind` → bundle 對照在 `build.py` 的 `_COMP_JS`（`bits` → `comp-bits`、`pixels` → `comp-pixels`、`logic` → `comp-logic`、`adder` → `comp-adder`、`pc` → `comp-pc`、`cpu` → `comp-cpu`）。`labeler`、`lazyBoot`、`canvasTex` 在 `tools/computers/src/common.js`（從 tools/callig 抄來）。**不要 import tools/callig、tools/chips、tools/science、tools/astro 的檔案**（esbuild 會打包進第二份 three.js）。新增一課＝`src/comp-<名>.js`＋package.json 的 build 加入口＋`_COMP_JS` 加一筆＋`build_comp_lesson()` 的 `lab_html` 對照加一筆。
  ```
  cd tools/computers && npm ci && npm run build && npm test
  ```
- **位元引擎（第一～四課共用，只換幾位、擺在哪裡）**：
  - `src/bits.js`（純函式，`test/bits.test.mjs`）：**位元陣列索引 0＝最右邊那一位**。`placeValue`、`toBits`／`fromBits`、`maxValue`（8 位＝255、5 位＝31、10 位＝1023）、`countStates`、`terms`／`sumText`（「8 + 4 + 1 = 13」，第二個參數換加號，中文用「＋」）、`bitString`（「0000 1101」）、`rippleSteps`／`increment`（加一：由右往左一位一位，是 1 就變 0 並進位、是 0 就變 1 結束；全 1 時 `overflow`）、`mulberry32`（可重現亂數）、`makeRound`（小測驗的一題：答案＋四個不重複選項，干擾項是「左右讀反」「只數亮幾盞」「差一位」）、`levelValues`／`margin`／`readLevel`／`countMisreads`（十段亮度 vs 開關的雜訊示意）。**課文裡的每個數字都寫進測試**（255、256、31、1023、65535、2³²、從 0 數到 255 各位翻幾次＝255/127/63/31/15/7/3/1）。
  - `src/bits3d.js`：`makeBitRow({ n, spacing, plates })` → 一塊木板上 n 組「燈泡（後）＋撥桿開關（前）＋位值牌（最前，canvas 貼圖）」。`set(i, on, instant)`、`get(i)`、`hit(raycaster)`（每一位有一個看不見的大方塊，手指點得到）、`hover(i)`、`carry(i, 秒)`（青色小球從第 i 位跳到 i+1；i＝n−1 時往左飛出去＝溢位）、`carryAt`（小球現在的位置，標籤用）、`setPlates(v)`、`update(dt)`。撥桿往後倒（朝燈泡）＝開、紅鈕變綠。
  - `src/bits2d.js`：`initFingers`（`[data-cp-fingers]`）、`initGuess`（`[data-cp-guess]`，八題：4 位 ×3、5 位 ×3、8 位 ×2，記第一次就答對的題數）、`initLevels`（`[data-cp-levels]`，兩條線用同一顆亂數種子＝同樣的雜訊）、`drawMinis`（`canvas.cp-mini[data-bits]`）。除錯：`el.__fingers.set(n)`、`el.__guess.start(seed)／answer()／next()`、`el.__levels.set(百分比)`。
- 第一課 0 和 1（`comp-bits.js`，`lab.kind = "bits"`，`data-compbits-lab`；slug `zeros-and-ones`）：一個機制——**開和關最不容易弄錯；一排開關就能數很大的數**。八組開關與燈泡，最右邊是 1，往左 2、4、8…128。
  - **控制器不靠 WebGL**：`state.bits`、進位的時間軸（`ripple`）、自動往上數、卡片劇本（`script`）都在 `step(dt)` 裡；3D（`make3D()`）只是其中一個畫面。瀏覽器沒有 WebGL 時 `view` 是 null、加 `al-nogl`，右邊的數字、位元列按鈕（`.cp-strip [data-bit]`）、+1、往上數照樣能用（computers.css 把 astro.css「al-nogl 時藏起側欄與控制列」的規則蓋回來）。
  - 加一時數字先不變（`.cp-carrying` 變淡）、等進位傳完（`settle()`）才更新並說明「動了幾個開關」；`HOP`＝1 倍速時傳一位 0.45 秒、`GAP`＝自動數時兩次加一之間 0.75 秒；速度 0.5／1／4。使用者一動手（點開關、+1、歸零）就取消自動數與卡片劇本。
  - 四張卡 `data-lab-demo`：`one`（最右邊開、關、開）、`places`（由右往左一次亮一盞）、`carry`（127 → 慢動作加一，八個開關全動）、`max`（255 → 加一溢位）。
  - 相機距離用 `fit(w, h)` 依畫面比例算；手機上 3D 區是 16:10。
  - 除錯：`document.querySelector('[data-compbits-lab]').__lab`（`set(n, 立刻?)`、`toggle(i)`、`addOne()`、`setPlaying(bool)`、`setSpeed(0.5|1|4)`、`demo('one'|'places'|'carry'|'max')`、`run(秒)` 直接把時間往前推、`goCam()`、`render()`、`value()`）。
  - 五根手指：拇指＝1 在右邊（右手、手心朝自己），和燈的方向一致。**二進位的 4 是只舉中指**，所以課文與「動手之前」都寫「手平放桌上、手指稍微翹起來」，畫面上的手也不是寫實的手勢。
- 第二課編碼（`comp-pixels.js`，`lab.kind = "pixels"`，`data-comppixels-lab`；slug `words-pictures-sound`）：一個機制——**大家約好一張對照表（編碼）**：同一排位元，照不同的表讀，就是數、字或顏色。
  - 場景：左後方像素牆（16 × 16 的 `InstancedMesh`，**MeshBasicMaterial**＝顏色不受燈光影響，`setRGB(…, 'srgb')`；圖是 `codes.js` 的 `PICTURE`＋`PALETTE`，自己畫的蘋果）、右後方三根柱子（高度＝0–255）＋一塊色塊（三個數混出來的顏色，白線連到被選的像素）、前面是第一課的 `makeBitRow`（顯示被選像素、被選那一色的八個位元；撥開關就改顏色）。
  - 右側欄：小地圖（2D canvas，點或方向鍵選像素——沒有 WebGL 也能用）、三條滑桿（`data-rgb`）、`data-chan` 選開關顯示哪一色、位元列、「同樣八個位元，三種讀法」（當成數／當成 ASCII 字／當成顏色的百分比）。`data-view="far|all|wall"`。
  - 四張卡 `data-lab-demo`：`far`（遠看 → 走近變成方塊）、`rgb`（蘋果的紅 214/40/40、葉子的綠 56/160/72）、`switch`（紅 0 → 255 → 214）、`same`（設成 65＝0100 0001＝A＝25% 紅）。卡片小圖用資料裡的 `icon`（emoji），第一課的卡用 `bits`。
  - `src/codes.js`（純函式，`test/codes.test.mjs`）：`charInfo`（**照碼位走，不是照 UTF-16 單位**；UTF-8 位元組用 TextEncoder）、`asciiChar`、`parsePicture`、`pictureBits`（16 × 16 × 3 × 8＝6,144）、`colorCount`（16,777,216）、`rgbHex`、`rowsToBytes`／`bytesToRows`（最左邊那格是 128）、`ART`（愛心、笑臉、字母 A）、`wave`／`sampleWave`（示意的聲波，不是錄音）、`audioBits`。課文裡的數字（A＝65、永＝27704＝U+6C38＝3 個位元組、#d62828＝214/40/40、4000 × 3000 ＝ 3,600 萬位元組、44,100 × 16＝705,600）都在測試裡。
  - `src/codes2d.js`：`initChars`（`[data-cp-chars]`，最多八個字）、`initDraw`（`[data-cp-draw]`，8 × 8、可拖曳塗）、`initSound`（`[data-cp-sound]`，SVG）。除錯：`el.__chars.set('永')`、`el.__draw.set([8 個數])`／`.bytes()`、`el.__sound.set(次數, 位元)`。
  - 除錯：`document.querySelector('[data-comppixels-lab]').__lab`（`select(i)`、`setChan(0|1|2)`、`setValue(n)`、`setRGB(k, v)`、`setView('far'|'all'|'wall', 立刻?)`、`reset()`、`demo(...)`、`run(秒)`、`goCam()`、`render()`）。
  - 查證時改掉的：CD「兩個聲道」沒有開得到的出處 → 只寫每秒 44,100 次 × 16 位元；「大部分中文字 3 個位元組」改成「像『永』這樣的常用中文字」（RFC 3629 的範圍表＋Unihan）；Unicode 字元數寫當時最新版（18.0，172,808，**之後出新版要改課文與文化卡**）；Big5（1984、資策會、13,053 字，「五大」是五套軟體不是五家公司）查到了但沒放進課文。
- 第三課邏輯閘（`comp-logic.js`，`lab.kind = "logic"`，`data-complogic-lab`；slug `logic-gates`）：一個機制——**幾個開關接起來，就能回答「而且、或者、不是」**。
  - 場景：木板上左邊電池、右邊燈泡，中間三種接法（`LAYOUT`：每種接法的銅線折線、開關位置、光點走的路徑與「哪些開關要通」）。`and`＝兩個閘刀開關串聯；`or`＝並聯（上下兩條支路）；`not`＝一個**蹺蹺板開關**（把手壓下去，另一頭的接點翹起來＝斷）。**輸入 1＝把手壓下去**（三種接法一致）。換接法時 `build()` 重建 `gateGroup`。路通了才有光點（一批共用的 Sprite）和燈亮；開關還在動的時候燈不亮。
  - **NOT 不用「開關並聯在燈泡兩端」來做**（那是短路，不能教）；也沒有用繼電器（太複雜）。蹺蹺板是純機械的反相，課文與模型說明都寫了「真的閘是電晶體做的」。
  - 右側欄：`data-gate` 三選一、這個閘的一句話（`lab.gates[].rule_en/zh`，經 `data-rules` 傳給 JS）、`data-in="a|b"` 兩個輸入按鈕（NOT 時 B 藏起來）、輸出、真值表（現在那一列亮起來；NOT 的表補兩列看不見的空列，免得切換時版面跳動）。`.al-play`＝「每一列都試一次」（`tour`）。
  - 四張卡 `data-lab-demo`：`and`、`or`、`not`（各自把每一列跑一遍）、`wiring`（A＝1、B＝0 不動，只把線從 AND 換成 OR 再換回來）。
  - `src/logic.js`（純函式，`test/logic.test.mjs`）：`AND/OR/NOT/XOR`、`truthTable`、`evalCircuit`／`circuitTable`（AND 或 OR＋每個輸入前可加 NOT，共八種電路、八張不同的真值表）、`PUZZLES`（六題，每題的 `answer` 有測試）、`makeQuestion`（八題：AND ×2、OR ×2、NOT ×1、兩個閘 ×3）。測試裡還驗了笛摩根定律與「只用 NAND 做得出三種基本閘」（課文沒寫 NAND，留給之後）。
  - `src/logic2d.js`：`initWire`（`[data-cp-wire]`，題目文字在資料的 `wire.puzzles`，以 `key` 對到 `PUZZLES`；一開始故意給錯的閘）、`initQuiz`（`[data-cp-lquiz]`，沿用 `.cp-guess` 的深色卡樣式）。除錯：`el.__wire.go(i)／set(spec)／solve()`、`el.__lquiz.start(seed)／answer()／next()`。
  - 除錯：`document.querySelector('[data-complogic-lab]').__lab`（`setGate('and'|'or'|'not', 保留輸入?)`、`setIn(a, b)`、`toggle('a'|'b')`、`setPlaying(bool)`、`demo(...)`、`run(秒)`、`goCam()`、`render()`、`out()`）。
  - 名詞：邏輯閘、及閘、或閘、反閘、真值表、布林代數、互斥或（樂詞網的高中以下資訊名詞／電子計算機名詞）；Britannica 的 “logic gate” 頁是 AI 摘要，**不拿來當出處**，改引 “Boolean algebra”、“truth table” 兩篇。課綱沒有直接列邏輯閘，寫的是「支援資 S-IV-2」。
- 第四課加法器（`comp-adder.js`，`lab.kind = "adder"`，`data-compadder-lab`；slug `binary-adder`；**單元一最後一課，`units[0].planned` 已清空**）：一個機制——**幾個邏輯閘接起來就是加法器**：一位的和是 XOR、進位是 AND（半加器）；每一位一個全加器，進位從右邊一位一位傳到左邊（漣波進位加法器）。
  - 場景（由後到前）：A 的四個開關與燈、B 的四個開關與燈（都是 `makeBitRow({ n: 4, spacing: 1.5 })`）、四個「＋」方塊（全加器）、答案的五盞燈（`makeBitRow({ n: 5, levers: false })`——**bits3d.js 新增 `levers` 參數**，false＝不畫撥桿；整排往左移半格，讓同一直行對齊同一位）。
  - **撥開關，答案立刻跟著變**（真的加法器沒有「按等號」）；`.al-play`「看它怎麼加」＝答案先清掉、`reveal()` 由右往左一位一位算，進位小球從這個方塊跳到左邊那個（最後一個進位跳到第五盞燈）；`.cp-step` 一次一位。`state.shown`＝已經算出幾位（N＋1＝全部顯示）。
  - 右側欄：直式（A、B、答案的二進位與十進位）、兩排位元按鈕（`[data-row="a|b"] [data-bit]`）、這一位的算式（`1 + 1 + 0 = 10`，寫幾、進幾）。
  - 四張卡 `data-lab-demo`：`simple`（5＋2，沒有進位）、`one`（1＋1）、`ripple`（7＋1，進位連傳三位）、`overflow`（15＋1，第五盞燈）。
  - `src/adder.js`（純函式，`test/adder.test.mjs`）：`halfAdder`、`fullAdder`（**只用 logic.js 的 AND／OR／XOR，不用加號**）、`addBits`（逐位步驟、答案多一位、`overflow`）、`columnText`、`carryRun`、`makeProblem`（一定至少進位一次）。測試把 0–15 的 256 種和 0–255 的 65,536 種全部對過真正的加法。
  - `src/adder2d.js`：`initHalf`（`[data-cp-half]`，半加器／全加器切換，真值表跟著亮）、`initAddQ`（`[data-cp-addq]`，兩題 × 四位＝八格，沿用 `.cp-guess` 深色卡）。除錯：`el.__half.set('full', 1, 1, 1)`、`el.__addq.start(seed)／answer()／next()`。
  - 除錯：`document.querySelector('[data-compadder-lab]').__lab`（`set(a, b)`、`toggle('a'|'b', i)`、`watch()`、`stepOnce()`、`setPlaying(bool)`、`setSpeed(0.5|1|3)`、`demo(...)`、`run(秒)`、`goCam()`、`render()`、`sum()`）。
  - 查證時改掉的：巴斯卡的機器不寫「齒輪」（Britannica 只說轉盤與輪子），年代寫 Britannica 的 1642–1644（電腦歷史博物館寫 1645）；史提比茲的 Model K 各家年份不一（1936／1937／1939），課文不寫年份、文化卡寫「多數說 1937，也有說 1936」；處理器「一次 64 位」沒有好出處，改引 Nand2Tetris 的「16、32、64」。
- **單元二「機器裡面」（第五～八課）共用一台 3D 主機**：`src/pc3d.js` 的 `makePC()`——側板打開的機殼、主機板（立在後面）、處理器、散熱器（鰭片＋風扇）、兩條記憶體、固態硬碟（貼在主機板上的一小條）、顯示卡、電源供應器，旁邊一台螢幕。**通用示意，不畫成任何品牌的產品**。`setExplode(0–1)`（每個零件沿 `SPEC[key].off` 飛出去）、`select(key|null)`（選到的亮、別的變半透明）、`light(keys)`（「按下電源」時亮的零件，`'screen'`＝螢幕）、`hit(raycaster)`（主機板最大、在最後面，前面有別的零件時優先選別的）、`anchor(key, out)`（標籤與資料光點用）、`update(dt)`。零件 key 與順序在 `src/parts.js` 的 `PARTS`（board／cpu／cooler／ram／ssd／gpu／psu）；名稱與說明在資料的 `lab.parts`，測試會核對兩邊一致。
- 第五課主機裡面（`comp-pc.js`，`lab.kind = "pc"`，`data-comppc-lab`；slug `inside-a-computer`；單元二第一課）：一個機制——**每個零件各做一件事，靠主機板連在一起**。
  - 點零件（或右側欄 `data-part` 按鈕）看它做什麼；`.cp-pc-explode` 滑桿把零件拉出來；`.al-play`「按下電源」＝ `parts.js` 的 `BOOT` 四步（供電 → 儲存裝置到記憶體 → 處理器工作 → 顯示卡到螢幕），每步 `STEP` 秒，光點從一個零件的 `anchor` 飛到另一個（金色＝電、青色＝資料）；也可以直接點右邊的四個步驟。零件說明與步驟文字由 build.py 放進 `data-parts`／`data-boot`。
  - 四張卡 `data-lab-demo`：`open`（拆開）、`cpu`（先看散熱器、再看底下的處理器）、`memory`（記憶體 → 儲存裝置）、`boot`（按下電源）。
  - `src/parts.js`（純函式，`test/parts.test.mjs`）：`PARTS`、`BOOT`、十進位與二進位的容量單位（`GB`＝10⁹、`GIB`＝2³⁰）、`ITEMS`（一個字母 1、沒壓縮的照片 36,000,000、一分鐘聲音 5,292,000 位元組——都是第二課算過的數）、`fits`、`asBinaryUnits`、`checkTasks`。**測試會讀 data/computers.json**，核對配對題的答案都是存在的零件。
  - `src/parts2d.js`：`initJobs`（`[data-cp-jobs]`，八題配七個零件，沿用 `.cp-guess` 深色卡；題目在資料的 `jobs.tasks`）、`initFits`（`[data-cp-fits]`，選硬碟大小與要放的東西）。除錯：`el.__jobs.start(false)／answer()／next()`、`el.__fits.set(1000, 'minute')`。
  - 除錯：`document.querySelector('[data-comppc-lab]').__lab`（`select(key|null)`、`setExplode(0–1)`、`power()`、`goStep(i)`、`setPlaying(bool)`、`demo(...)`、`run(秒)`、`goCam()`、`render()`）。
  - 查證時改掉的：主機板只寫「連接、傳資料」（Britannica 沒說它送電）；「記憶體斷電就清空」引 Britannica “computer memory”（SRAM、DRAM 會失去內容）；顯示卡寫「畫出畫面」不寫「送到螢幕」的細節；**電源供應器「裡面的電容會留著危險的電」找不到官方出處，沒寫**，只寫它直接接 100–240 V 的電、是封起來的盒子、不要拆；手機的零件沒有出處，改講筆電與系統單晶片（Apple M1 的新聞稿）。名詞：CPU 的正式譯名是「中央處理單元」（樂詞網），課文寫「處理器（CPU）」；「散熱器」不在資訊類名詞表（電子工程名詞是「散熱座」），用的是日常說法。
- 第六課處理器（`comp-cpu.js`，`lab.kind = "cpu"`，`data-compcpu-lab`；slug `processor`）：一個機制——**拿指令、看懂、照做，然後再拿下一條**。
  - **自己設計的教學用處理器，不是任何真實的指令集**（模型說明與 cpu.js 檔頭都寫明）。`src/cpu.js`（純函式，`test/cpu.test.mjs`）：記憶體 8 格（指令 `{ op, arg }` 或數 `{ num }`）、暫存器 `pc`／`ir`／`a`、五種指令 LOAD／ADD／STORE／JUMP／STOP；`tick(state)` 走一個小步驟（fetch → decode → execute，不改舊的 state，回傳 `event`）、`runInstruction`、`run`；**ADD 用第四課的 `addBits`（八位元，超過 255 繞回去）**；把數當指令（`notinstruction`）或計數器跑出去（`range`）會停。`PROGRAMS`：`add34`（四條指令、十二個小步驟）、`count`（JUMP 0，永遠不停）。`CARDS`／`checkAdd`（自己排程式：ok／forever／notinstruction／wrong／spoiled）、`makePrediction`（猜下一步）。
  - `src/cputext.js`：`describe(event, state)` 把一個小步驟說成一句英文和一句中文（3D 的說明和「自己排程式」的逐條紀錄共用）。
  - 場景：左邊一排記憶體（藍＝指令、深色＝數；計數器指到的那一格字變金色）、右邊處理器的裡面（計數器、指令暫存器、A、加法器）；**格子裡的字是 HTML 標籤**（`cp-lb-cell`／`cp-lb-reg`，透明底）；搬資料時青色小球從一格飛到另一格（ADD 是兩顆：記憶體 → 加法器、加法器 → A）。最左後方放一台縮小的 `makePC()`（`select('cpu')`），標「第五課的處理器」。
  - 右側欄：`data-prog` 選程式、三個階段的小牌（`data-ph`）、三個暫存器、記憶體清單（`is-pc`／`is-arg`）、`.cp-step`（一個小步驟）、`.al-play`（做完一步才做下一步，`DUR` 秒）、`data-speed` 0.5／1／4。
  - 四張卡 `data-lab-demo`：`fetch`、`add`（先快轉到「正要執行 ADD 6」）、`loop`（count 程式 4 倍速）、`stop`（整個 3＋4）。
  - `src/cpu2d.js`：`initProg`（`[data-cp-prog]`，四個 `<select>` 排程式，按執行列出每條指令後 A 是多少與錯在哪裡）、`initPred`（`[data-cp-pred]`，八題）。除錯：`el.__prog.set([0, 3, 4, 7])`（CARDS 的索引，回傳 checkAdd 的結果）、`el.__pred.start(seed)／answer()／next()`。
  - 除錯：`document.querySelector('[data-compcpu-lab]').__lab`（`load('add34'|'count')`、`stepOnce()`、`setPlaying(bool)`、`setSpeed(n)`、`demo(...)`、`run(秒)`、`goCam()`、`render()`、`sim()`）。
  - 查證：指令的「拿、解讀」引 Britannica 的 CPU 條目（控制單元那一句）；時脈引 Intel（GHz＝每秒幾十億個週期；**一個週期不等於一條指令**）；馮紐曼 1945 與曼徹斯特 Baby 1948/6/21（十七條指令）引 Computer History Museum 的年表。規劃檔寫「四種指令」，實作是五種（多了 JUMP，才有迴圈）。
- **預覽伺服器名額被別的 session 占滿時**（preview_start 回 Maximum 5 dev servers）：不要去停別人的，也不要用 Bash 跑伺服器。把 shot.mjs 的副本加一段 CDP `Fetch.enable`，攔截 `http://twrses.test/*` 直接從 worktree 讀檔回應（環境變數 `SHOT_ROOT`），不經過任何伺服器就能截圖、看 console 錯誤。
- 查證過的事（出處在每課 `sources`）與**沒寫的事**記在 Obsidian 的系列索引；名詞一律台灣用語（位元、位元組、二進位、處理器、記憶體、電晶體），不用「比特、字節、內存」。
- 和既有系列互相連結：第一課的 `links` 連晶片第二課 `/resources/classes/semiconductors/transistor/`（開關本身）與萬物原理第八課 `/resources/classes/how-things-work/computer-memory/`（0 和 1 存在哪裡），再放下一課的預告卡（`soon: true`）。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/computers/<slug> --out audio/say-<slug>` → `python3 tools/upload_say_dir.py assets/data/say/computers-<slug>.json audio/say-<slug>`（manifest 命名 `computers-<slug>`；`gen_audio.py` 的 SHORT_PAGES 已加本系列）。worktree 裡先把 `~/Developer/repos/twrses/tools/.r2_uploaded_cache.txt` 複製過來，做完 `sort -u` 合併回去。
- 截圖：`tools/astro/scripts/shot.mjs` 寫死啟動系統的 Google Chrome；Luke 的機器上要改用 `~/.local/bin/headless-chrome`（複製一份到 scratchpad、把路徑換掉再跑），不要直接啟動 `/Applications/Google Chrome.app`。
- 課程規劃在 Obsidian：`第二大腦/創作庫/電腦概論課程規劃（twrses）.md`（四單元十六課、待查證清單）；系列索引 `第二大腦/英文學習/電腦概論（twrses.org）.md`（課程清單、維護備忘、下一課的交接指令）。

---

## Build / Deploy
```
python3 build.py        # BASE=/twrses → 服務於 lukelin7429.github.io/twrses/ 或 www.twrses.org
```
- 本機預覽：因 `BASE=/twrses`，需在 repo 內建 self-symlink `ln -sfn . twrses`，再開 http server 連 `/twrses/...`。**這個 symlink 不要 commit**（git 應忽略）。
- 音檔／PDF 走 GitHub Release（各級別 `<level>-audio` / `<level>-pdf`）。

詳細專案脈絡見使用者 memory：`mcc-chinese-twrses-migration`、`feedback_video_inline_never_popout`、`grandpa-mike-memorial`。

---

## 哲學系列（/resources/classes/philosophy/）— 高級程度、五個書架

- 內容：`data/philosophy.json`（`shelves` 是整份課表；`lessons[]`、`philosophers[]` 是做好的頁面，以 `slug` 掛回課表）。頁面由 `build.py`「哲學 Philosophy」區塊的 `build_phil_hub()`／`build_phil_lesson()`／`build_phil_person()` 產生（函式一律 `_ph_` 前綴）。
- 樣式 `assets/css/philosophy.css`（class 前綴 `ph-`）、互動 `assets/js/philosophy.js`（手寫、不打包），兩者只載在本系列。
- 每課一個思想實驗，`lab.kind` 分流：（空）蘇格拉底式詰問、`validity`、`fallacy`、`zeno`、`doubt`、`cave`、`meno`、`chicken`、`ship`；另有通用的「先選邊再看回應」元件 `_ph_pick()`。新增一種＝`build.py` 加 `_ph_lab_<kind>()`＋`philosophy.js` 加一段。
- 3D（A6 洞穴 `ph-cave`、A9 特修斯之船 `ph-ship`）：原始碼 `tools/philosophy/src/ph-*.js`，`cd tools/philosophy && npm install && npm run build` 打包成 `assets/js/ph-*.js`（產物，不要手改）；`build.py` 的 `_PH_3D` 把 `lab.kind` 對到 bundle，只在那一課載入。網址加 `#cave=0…5`、`#ship=35`、`#ship=allb` 可直接跳到狀態（截圖用；無頭 Chrome 要加 `--use-angle=swiftshader --enable-unsafe-swiftshader`）。
- 中譯預設收起：每段下方有「中譯」鈕（`philosophy.js` 的 `addTr` 自動加在每個 `.ph-zh` 前），頁首另有全頁開關。資料照樣每段給 `en`＋`zh`。
- 錄音：`python3 tools/gen_audio.py --page resources/classes/philosophy/<slug>`（人物頁是 `…/philosophers/<slug>`）→ `./tools/upload_audio.sh` → 重跑 `build.py`。
- 引文一律對過公版原文才放；英文一律美式拼字，**直接引用的公版譯文保留原拼法**。
