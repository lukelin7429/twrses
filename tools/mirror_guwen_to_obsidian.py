#!/usr/bin/env python3
"""把站上的古文選讀鏡射成 Obsidian 的一則索引筆記。

成品住在 repo（data/guwen.json → resources/classes/guwen/），但 Obsidian 是總
資料庫，不能只住 repo。這支腳本不複製內容，只產生一份**可點進站上**的索引：
篇名、作者、字數、程度、出處，依《古文觀止》卷次分段，另附依時代、依作者兩張
表，以及全書 222 篇的進度。

    python3 tools/mirror_guwen_to_obsidian.py

每次新增篇目之後跑一次即可，輸出會整份覆蓋（它是產物，不要手改）。
"""
import json, os, re, datetime, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VAULT = os.path.expanduser(
    "~/Library/Mobile Documents/iCloud~md~obsidian/Documents/第二大腦")
OUT = os.path.join(VAULT, "英文學習", "古文選讀（twrses.org）.md")
SITE = "https://twrses.org/resources/classes/guwen/"

GUANZHI_TOTAL = 222          # 《古文觀止》全書篇數，十二卷
JUAN_LABEL = {
    1: "卷一　周文（《左傳》）", 2: "卷二　周文（《左傳》）",
    3: "卷三　周文（《國語》《公羊》《穀梁》）", 4: "卷四　周文（《國策》《楚辭》）",
    5: "卷五　漢文（《史記》）", 6: "卷六　漢文",
    7: "卷七　六朝　唐文", 8: "卷八　唐文（韓愈）",
    9: "卷九　唐文（柳宗元等）", 10: "卷十　宋文（歐陽修等）",
    11: "卷十一　宋文（三蘇等）", 12: "卷十二　明文",
}

# 以作者卒年（或成書年代）粗分時代，用於「依時代」一節。
ERAS = [
    (-9999, -220, "先秦"),
    (-220, 280, "兩漢三國"),
    (280, 590, "魏晉六朝"),
    (590, 907, "唐"),
    (907, 1280, "宋"),
    (1280, 9999, "元明以後"),
]


def han_count(essay):
    """正文漢字數（去標點），與站上頁面的計法一致。"""
    n = 0
    for sec in essay["sections"]:
        for line in sec["lines"]:
            n += len(re.sub(r"[^一-鿿]", "", line[0]))
    return n


def juan(essay):
    """從 source 欄抓《古文觀止》卷次；未收者回傳 None。"""
    m = re.search(r"《古文觀止》卷([一二三四五六七八九十]+)", essay.get("source", ""))
    if not m:
        return None
    zh = m.group(1)
    table = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6,
             "七": 7, "八": 8, "九": 9, "十": 10, "十一": 11, "十二": 12}
    return table.get(zh)


def era_year(essay):
    """回傳用來分期的年份；先看 life 的卒年，再退回生年，最後看 year 欄。"""
    life = essay.get("life", "")
    m = re.search(r"[–\-—](\d{3,4})", life)          # 生–卒，取卒年
    if m:
        return int(m.group(1))
    m = re.search(r"前\s*(\d{2,4})", life + essay.get("year", ""))
    if m:
        return -int(m.group(1))
    m = re.search(r"(\d{3,4})", life)
    if m:
        return int(m.group(1))
    m = re.search(r"(\d{3,4})\s*年", essay.get("year", ""))
    if m:
        return int(m.group(1))
    return 0


def era(essay):
    y = era_year(essay)
    for lo, hi, name in ERAS:
        if lo <= y < hi:
            return name
    return "未分期"


def main():
    essays = json.load(open(os.path.join(ROOT, "data", "guwen.json"),
                            encoding="utf-8"))["essays"]
    today = datetime.date.today().isoformat()
    total = sum(han_count(e) for e in essays)
    in_gz = [e for e in essays if juan(e)]
    juans_done = sorted({juan(e) for e in in_gz})

    L = []
    L.append("---")
    L.append("title: 古文選讀（twrses.org）")
    L.append("type: 索引")
    L.append(f"date: {today}")
    L.append("tags:\n  - 英文學習\n  - 古文\n  - 古文觀止\n  - twrses")
    L.append("related:\n  - \"[[唐詩選讀（twrses.org）]]\"\n"
             "  - \"[[名詩導讀（twrses.org）]]\"")
    L.append("---\n")
    L.append("# 古文選讀（twrses.org）\n")
    L.append("> [!info] 這是索引，內容住在站上")
    L.append(f"> 全部頁面在 [{SITE}]({SITE})。每一頁都有中英對照、逐句 🔊"
             "（只唸英譯）、逐段段旨、逐段導讀、你可能讀反的地方、英文譯不出來的"
             "地方、生字表、章法分析、公版英譯對照與教學建議。")
    L.append("> **主譯文一律自譯**；對照欄多為翟理斯（Herbert A. Giles）"
             "《古文選珍》(Gems of Chinese Literature, 1922)，"
             "並逐處指出他改寫、節譯或譯錯的地方。")
    L.append("> **原文一律回維基文庫逐字校驗**（長度＋雜湊），異體字一律採現行標準字形。")
    L.append(f"> 本頁由 `tools/mirror_guwen_to_obsidian.py` 產生，**不要手改**；"
             f"新增篇目之後重跑一次。最後更新 {today}。\n")

    L.append(f"**共 {len(essays)} 篇、{total:,} 字中英對照。**")
    L.append(f"其中 **{len(in_gz)} 篇收在《古文觀止》**"
             f"（全書 {GUANZHI_TOTAL} 篇，進度 {len(in_gz)/GUANZHI_TOTAL:.1%}），"
             f"已觸及卷{'、卷'.join(str(j) for j in juans_done)}。\n")

    L.append("## 依《古文觀止》卷次\n")
    by_juan = collections.defaultdict(list)
    for e in essays:
        by_juan[juan(e)].append(e)
    for j in sorted(k for k in by_juan if k):
        group = sorted(by_juan[j], key=lambda e: -han_count(e))
        L.append(f"### {JUAN_LABEL.get(j, '卷' + str(j))}（{len(group)} 篇）\n")
        L.append("| 篇 | 作者 | 字 | 程度 | 主題 |")
        L.append("|---|---|---|---|---|")
        for e in group:
            L.append(f"| [{e['title']}]({SITE}{e['slug']}/) | {e['author']} "
                     f"| {han_count(e)} | {e['level']} | {e.get('theme','')} |")
        L.append("")
    if by_juan.get(None):
        L.append(f"### 《古文觀止》未收（{len(by_juan[None])} 篇）\n")
        L.append("| 篇 | 作者 | 字 | 出處 |")
        L.append("|---|---|---|---|")
        for e in sorted(by_juan[None], key=lambda e: -han_count(e)):
            L.append(f"| [{e['title']}]({SITE}{e['slug']}/) | {e['author']} "
                     f"| {han_count(e)} | {e.get('source','')} |")
        L.append("")

    L.append("## 依時代\n")
    by_era = collections.defaultdict(list)
    for e in essays:
        by_era[era(e)].append(e)
    order = [n for _, _, n in ERAS] + ["未分期"]
    L.append("| 時代 | 篇數 | 篇目 |")
    L.append("|---|---|---|")
    for name in order:
        if name not in by_era:
            continue
        items = " · ".join(f"[{e['title']}]({SITE}{e['slug']}/)"
                           for e in sorted(by_era[name], key=lambda x: era_year(x)))
        L.append(f"| {name} | {len(by_era[name])} | {items} |")
    L.append("")

    L.append("## 依作者\n")
    by_author = collections.defaultdict(list)
    for e in essays:
        by_author[e["author"]].append(e)
    for a in sorted(by_author, key=lambda k: (-len(by_author[k]), k)):
        items = " · ".join(f"[{e['title']}]({SITE}{e['slug']}/)"
                           for e in sorted(by_author[a], key=lambda x: x["title"]))
        L.append(f"- **{a}**（{len(by_author[a])}）　{items}")
    L.append("")

    L.append("## 最長與最短\n")
    ranked = sorted(essays, key=lambda e: -han_count(e))
    L.append("| | 篇 | 字 |")
    L.append("|---|---|---|")
    for e in ranked[:3]:
        L.append(f"| 最長 | [{e['title']}]({SITE}{e['slug']}/) | {han_count(e)} |")
    for e in ranked[-3:]:
        L.append(f"| 最短 | [{e['title']}]({SITE}{e['slug']}/) | {han_count(e)} |")
    L.append("")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w", encoding="utf-8").write("\n".join(L) + "\n")
    print(f"寫入 {OUT}")
    print(f"  {len(essays)} 篇 · {total:,} 字 · 古文觀止 {len(in_gz)}/{GUANZHI_TOTAL}")


if __name__ == "__main__":
    main()
