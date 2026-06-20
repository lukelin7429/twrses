# twrses — 彰化縣人師教育協會 中文官網

My Culture Connect（人師教育協會）中文官網，重建自舊版 Google Sites（`www.twrses.org`），改以 GitHub Pages 託管。

## 架構

靜態網站，由 `build.py` 從資料產生 HTML（資料夾即乾淨網址）。

```
build.py            # 產生器：共用版型 / 導覽 / 頁尾 + 各頁
data/crawl.json     # 舊 Google Sites 全站爬取快照（影片 ID、內文來源）
assets/css/style.css   # 設計系統（深松綠＋暖琥珀金；中文走系統字 PingFang TC）
assets/css/motion.css  # 捲動揭示＋光暈動效（尊重 reduced-motion）
assets/js/main.js      # 行動選單、IntersectionObserver 揭示
```

## 建置

```bash
python3 build.py     # 產生全部頁面到 repo 根目錄
```

本機預覽：

```bash
python3 -m http.server 4137
```

## 內容狀態

- ✅ 身份頁（首頁／認識人師／偏鄉英語教育×4）為手寫精修內容。
- ✅ 影片頁、課程頁、資源頁由 `data/crawl.json` 自動產生。
- ⏳ 影片區目前用舊爬取的 YouTube ID，部分已失效；**待接上現行 YouTube 播放清單**以取得有效影片與標題。
- ⏳ 期刊／閱讀教材的 Google Drive 原檔連結待逐一接上。

## 部署

GitHub Pages（main 分支根目錄）。自訂網域 `www.twrses.org`（見 `CNAME`）；DNS 由站方設定。

設計原則：傾力做最高品質、有動感不死板；中文一律系統字，禁用 Google Fonts 中文字體；英文用美式拼法。
