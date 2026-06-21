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

## Build / Deploy
```
python3 build.py        # BASE=/twrses → 服務於 lukelin7429.github.io/twrses/ 或 www.twrses.org
```
- 本機預覽：因 `BASE=/twrses`，需在 repo 內建 self-symlink `ln -sfn . twrses`，再開 http server 連 `/twrses/...`。**這個 symlink 不要 commit**（git 應忽略）。
- 音檔／PDF 走 GitHub Release（各級別 `<level>-audio` / `<level>-pdf`）。

詳細專案脈絡見使用者 memory：`mcc-chinese-twrses-migration`、`feedback_video_inline_never_popout`、`grandpa-mike-memorial`。
