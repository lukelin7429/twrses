#!/usr/bin/env python3
"""把站上的唐詩選讀鏡射成 Obsidian 的一則索引筆記。

成品住在 repo（data/tangshi.json → resources/classes/tang-poetry/），但 Obsidian
是總資料庫，不能只住 repo。這支腳本不複製內容，只產生一份**可點進站上**的索引：
詩題、詩人、體裁、句數、站上網址，依初盛中晚唐分段，另附依詩人與依體裁兩張表。

    python3 tools/mirror_tangshi_to_obsidian.py

每次新增詩之後跑一次即可，輸出會整份覆蓋（它是產物，不要手改）。
"""
import json, os, re, datetime, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VAULT = os.path.expanduser(
    "~/Library/Mobile Documents/iCloud~md~obsidian/Documents/第二大腦")
OUT = os.path.join(VAULT, "英文學習", "唐詩選讀（twrses.org）.md")
SITE = "https://twrses.org/resources/classes/tang-poetry/"

# 以詩人生年分期；生卒不詳者回頭看 year 欄的「初唐／盛唐／中唐／晚唐」字樣。
PERIODS = [
    (0,   680, "初唐（—680 年生）"),
    (680, 730, "盛唐（680–730 年生）"),
    (730, 790, "中唐（730–790 年生）"),
    (790, 3000, "晚唐（790 年後生）"),
]
KEYWORD = {"初唐": 650, "盛唐": 700, "中唐": 760, "晚唐": 810}


def birth_year(p):
    """回傳用來分期的生年；查不到就從 year 欄的分期字樣推一個代表值。"""
    m = re.search(r"(\d{3,4})\s*[–\-—]", p.get("life", ""))
    if m:
        return int(m.group(1))
    m = re.search(r"約?(\d{3,4})", p.get("life", ""))
    if m:
        return int(m.group(1))
    for kw, y in KEYWORD.items():
        if kw in p.get("life", "") or kw in p.get("year", ""):
            return y
    return 700


def line_count(p):
    n = 0
    for st in p["stanzas"]:
        n += len(st["lines"]) if isinstance(st, dict) else len(st)
    return n


def short_form(f):
    return re.sub(r"（.*?）", "", f).strip()


def main():
    poems = json.load(open(os.path.join(ROOT, "data", "tangshi.json"),
                           encoding="utf-8"))["poems"]
    today = datetime.date.today().isoformat()
    poets = sorted({p["poet"] for p in poems})
    total_lines = sum(line_count(p) for p in poems)

    L = []
    L.append("---")
    L.append("title: 唐詩選讀（twrses.org）")
    L.append("type: 索引")
    L.append(f"date: {today}")
    L.append("tags:\n  - 英文學習\n  - 唐詩\n  - twrses")
    L.append("related:\n  - \"[[名詩導讀（twrses.org）]]\"\n"
             "  - \"[[古文選讀（twrses.org）]]\"")
    L.append("---\n")
    L.append("# 唐詩選讀（twrses.org）\n")
    L.append("> [!info] 這是索引，內容住在站上")
    L.append(f"> 全部頁面在 [{SITE}]({SITE})。每一頁都有中英對照、逐行 🔊（只唸英譯）、"
             "逐段導讀、你可能讀反的地方、英文譯不出來的地方、生字表、形式筆記、"
             "Witter Bynner《The Jade Mountain》(1929) 譯本對照與教學建議。")
    L.append("> 譯本對照逐首以原書頁面圖檔（Wikimedia Commons 的 "
             "`The Jade Mountain.djvu`）核對過，不是憑記憶或 OCR。")
    L.append(f"> 本頁由 `tools/mirror_tangshi_to_obsidian.py` 產生，**不要手改**；"
             f"新增詩之後重跑一次。最後更新 {today}。\n")
    L.append(f"**共 {len(poems)} 首、{len(poets)} 位詩人、{total_lines} 行中英對照。**\n")

    for lo, hi, name in PERIODS:
        group = sorted((p for p in poems if lo <= birth_year(p) < hi),
                       key=lambda p: (p["poet"], p["title"]))
        if not group:
            continue
        L.append(f"## {name}\n")
        L.append("| 詩 | 詩人 | 體裁 | 句 | 程度 |")
        L.append("|---|---|---|---|---|")
        for p in group:
            L.append(f"| [{p['title']}]({SITE}{p['slug']}/) | {p['poet']} "
                     f"| {short_form(p['form'])} | {line_count(p)} | {p['level']} |")
        L.append("")

    L.append("## 依詩人\n")
    by_poet = collections.defaultdict(list)
    for p in poems:
        by_poet[p["poet"]].append(p)
    for poet in sorted(by_poet, key=lambda k: (-len(by_poet[k]), k)):
        items = " · ".join(f"[{p['title']}]({SITE}{p['slug']}/)"
                           for p in sorted(by_poet[poet], key=lambda x: x["title"]))
        L.append(f"- **{poet}**（{len(by_poet[poet])}）　{items}")
    L.append("")

    L.append("## 依體裁\n")
    by_form = collections.defaultdict(list)
    for p in poems:
        by_form[short_form(p["form"])].append(p)
    L.append("| 體裁 | 首數 |")
    L.append("|---|---|")
    for form in sorted(by_form, key=lambda k: -len(by_form[k])):
        L.append(f"| {form} | {len(by_form[form])} |")
    L.append("")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w", encoding="utf-8").write("\n".join(L) + "\n")
    print(f"寫入 {OUT}")
    print(f"  {len(poems)} 首 · {len(poets)} 位詩人 · {total_lines} 行")


if __name__ == "__main__":
    main()
