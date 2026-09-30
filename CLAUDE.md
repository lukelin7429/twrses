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
  - `moon-phases.js`（第一課）、`eclipses.js`（第二課）、`seasons.js`（第三課）、`tides.js`（第四課）、`constellations.js`（第五課）；共用貼圖／著色在 `common.js`
  - 四課的地球都用**真實大陸**（`earthmap.js`）：Natural Earth 1:110m 陸地（公有領域，`world-atlas` 套件），打包時編進 JS。第二、三、四課的地軸傾斜與自轉照真實時間（第二課日食時月影落在正確地區，對照 2024/4/8、2027/8/2 食甚點誤差約 1–2°）；第一課仍是裝飾性自轉、不畫地軸
  - 第四課畫的是「平衡潮」（`ephem.js` 的 `equilibriumTide`），**不是潮汐表**：頁面一律提醒去中央氣象署查官方潮汐預報（潮間帶安全），不要加上「下一次滿潮幾點」這種讀數
  - `ephem.js`：Meeus 低精度星曆＋日月食預測（純函式）。改它之後一定要跑 `npm test`，對照 NASA 表確認 2019–2032 年日月食仍全數吻合
  ```
  cd tools/astro && npm install && npm run build && npm test   # three 與 esbuild 版本鎖在 package.json
  ```
- 課程資料的 `lab.kind` 決定用哪個模型（`phases`／`eclipses`／`seasons`／`tides`／`stars`）；第五課多的欄位：`skies`（四季星空卡）、`tonight`、`culture_cards`（參商、七夕、四象、三垣＋同星兩名表）；`phases`、`keys`、`terms`、`moontides`、`words`、`types`、`upcoming`、`activities[]` 有就畫、沒有就略過。
- 第三課的日出日落、晝長、節氣在 `ephem.js`（`dayInfo`、`solarTermsOfYear`），`npm test` 也會跑 `test/seasons.test.mjs`（對照台北、雪梨的已知日出日落）。
- 第五課（`constellations.js`，`lab.kind = "stars"`）：外圈是**真實天球**——耶魯亮星星表 BSC5（公有領域，CDS V/50），亮於 5 等的 1,634 顆星，精簡成 `src/stars-data.js`（產物，`npm run stars` 重做；原始星表 1.6 MB 不進 repo，放 `~/Documents/twrses-bsc5/`，下載方法寫在 `scripts/build-stars.mjs` 檔頭）。
  - 星座連線、星名、中國星官、季節大三角是**本站自繪**，寫在 `src/figures.js`（用 BSC 名稱如 `'Alp Ori'`、`'Del1 Tau'` 指定星星，找不到會報錯）。**不要改用 Stellarium 的連線檔**：那是 CC BY-SA，會牽動整份資料的授權。頁面模型下方的出處行是 `lab.credit_html`，必須保留。
  - 星空計算在 `src/sky.js`（純函式）：J2000 → 黃道＋歲差；太陽在哪個星座用 IAU 邊界的黃經（`ZODIAC_BOUNDS`），所以 10/1 顯示室女座而不是運勢的天秤座——這是課文迷思段刻意教的。`test/stars.test.mjs` 有 assert：參宿四位置、太陽所在星座、參商一整年不同時高於 6°、每月早升約 2 小時。
  - 兩個視角的相機都跟著日地連線轉（夜側箭頭永遠指進畫面）；右側「今晚彰化的星空」是立體投影全天圖（北上東左），白天星星淡到 14% 並說明「星星還在」。頁面下方「今晚」清單當場算晚上九點的亮星、月亮、參商升落。不畫行星（第七課）。
  - 除錯：`document.querySelector('[data-star-lab]').__lab`（`setT(ms)`、`jumpSeason(0–3)`、`setView('orbit'|'night')`、`update()`）。
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
- 網站 `html` 有 smooth scroll：在背景的瀏覽器面板裡捲動會慢好幾秒，截圖前先設 `document.documentElement.style.scrollBehavior='auto'`。
- 第二課起的共用工具在 `tools/body/src/common.js`（`loadBones`、`labeler`、`lazyBoot`）；卡片上的「在模型中看」按鈕用 `data-lab-<動作>="值"`。
  - 除錯：`document.querySelector('[data-skeleton-lab]').__lab`（`goJob`、`goRegion`、`setApart`、`startCount`、`stepCount(i)`、`render()`）。背景分頁 rAF 會降到每秒一兩格，截圖前用 `stepCount` 直接跳步。
- 🔊 錄音：`python3 tools/gen_audio.py --page resources/classes/human-body/<slug>` → `./tools/upload_audio.sh`，manifest 命名 `human-body-<slug>`。
- 課程規劃在 Obsidian：`第二大腦/創作庫/人體探索課程規劃（twrses）.md`（第二～四課：肌肉、血液、呼吸，用示意模型）。

---

## Build / Deploy
```
python3 build.py        # BASE=/twrses → 服務於 lukelin7429.github.io/twrses/ 或 www.twrses.org
```
- 本機預覽：因 `BASE=/twrses`，需在 repo 內建 self-symlink `ln -sfn . twrses`，再開 http server 連 `/twrses/...`。**這個 symlink 不要 commit**（git 應忽略）。
- 音檔／PDF 走 GitHub Release（各級別 `<level>-audio` / `<level>-pdf`）。

詳細專案脈絡見使用者 memory：`mcc-chinese-twrses-migration`、`feedback_video_inline_never_popout`、`grandpa-mike-memorial`。
