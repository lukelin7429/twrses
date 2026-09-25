#!/usr/bin/env python3
"""把站上的名詩導讀鏡射成 Obsidian 的一則索引筆記。

成品住在 repo（data/poems.json → resources/classes/poetry/），但 Obsidian 是
總資料庫，不能只住 repo。這支腳本不複製內容，只產生一份**可點進站上**的索引：
詩人、年代、形式、行數、站上網址，依年代分段。

    python3 tools/mirror_poems_to_obsidian.py

每次新增詩之後跑一次即可，輸出會整份覆蓋（它是產物，不要手改）。
"""
import json, os, re, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VAULT = os.path.expanduser(
    "~/Library/Mobile Documents/iCloud~md~obsidian/Documents/第二大腦")
OUT = os.path.join(VAULT, "英文學習", "名詩導讀（twrses.org）.md")
SITE = "https://twrses.org/resources/classes/poetry/"

ERAS = [
    (0,    1600, "都鐸與伊莉莎白（—1600）"),
    (1600, 1660, "十七世紀前期（1600–1660）"),
    (1660, 1750, "王政復辟與新古典（1660–1750）"),
    (1750, 1800, "十八世紀後期（1750–1800）"),
    (1800, 1840, "浪漫主義（1800–1840）"),
    (1840, 1900, "維多利亞與美國十九世紀（1840–1900）"),
    (1900, 3000, "二十世紀（1900—）"),
]


def year_of(p):
    m = re.findall(r"(1[0-9]{3}|20[0-9]{2})", p["year"])
    return int(m[0]) if m else 0


def main():
    poems = json.load(open(os.path.join(ROOT, "data", "poems.json"),
                           encoding="utf-8"))["poems"]
    poems = sorted(poems, key=year_of)
    today = datetime.date.today().isoformat()
    poets = sorted({p["poet_zh"] for p in poems})

    L = []
    L.append("---")
    L.append("title: 名詩導讀（twrses.org）")
    L.append("type: 索引")
    L.append(f"date: {today}")
    L.append("tags:\n  - 英文學習\n  - 英詩\n  - twrses")
    L.append("related:\n  - \"[[英詩精讀]]\"\n  - \"[[典故速查表]]\"")
    L.append("---\n")
    L.append("# 名詩導讀（twrses.org）\n")
    L.append("> [!info] 這是索引，內容住在站上")
    L.append(f"> 全部頁面在 [{SITE}]({SITE})，"
             "每一頁都有中英對照、逐行 🔊、導讀、生字表、容易誤讀的地方、形式筆記、文化背景與教學建議。")
    L.append(f"> 本頁由 `tools/mirror_poems_to_obsidian.py` 產生，**不要手改**；"
             f"新增詩之後重跑一次。最後更新 {today}。\n")
    L.append(f"**共 {len(poems)} 首，{len(poets)} 位詩人。**\n")

    for lo, hi, name in ERAS:
        group = [p for p in poems if lo <= year_of(p) < hi]
        if not group:
            continue
        L.append(f"## {name}\n")
        L.append("| 詩 | 詩人 | 年 | 形式 | 行 |")
        L.append("|---|---|---|---|---|")
        for p in group:
            lines = sum(len(s) for s in p["stanzas"])
            form = p["form"].split("·")[0].strip()
            L.append(f"| [{p['title_zh']}（{p['title']}）]({SITE}{p['slug']}/) "
                     f"| {p['poet_zh']} | {p['year']} | {form} | {lines} |")
        L.append("")

    L.append("## 依詩人\n")
    by_poet = {}
    for p in poems:
        by_poet.setdefault(p["poet_zh"], []).append(p)
    for poet in sorted(by_poet, key=lambda k: -len(by_poet[k])):
        items = " · ".join(f"[{p['title_zh']}]({SITE}{p['slug']}/)"
                           for p in sorted(by_poet[poet], key=year_of))
        L.append(f"- **{poet}**（{len(by_poet[poet])}）　{items}")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w", encoding="utf-8").write("\n".join(L) + "\n")
    print(f"寫入 {OUT}")
    print(f"  {len(poems)} 首 · {len(poets)} 位詩人")


if __name__ == "__main__":
    main()
