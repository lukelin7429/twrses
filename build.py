#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
人師教育協會 twrses.org — static site builder
Renders shared layout/nav/footer + identity pages (hand-authored) +
content/video pages (auto-generated from data/crawl.json snapshot of the old Google Sites).
Output: HTML written into the repo root (folder-per-page → clean URLs).
"""
import json, os, html, re, shutil, urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
CRAWL = json.load(open(os.path.join(ROOT, "data", "crawl.json"), encoding="utf-8"))
BY_PATH = {p["path"]: p for p in CRAWL}
_vm = os.path.join(ROOT, "data", "video_meta.json")
VIDEO_META = json.load(open(_vm, encoding="utf-8")) if os.path.exists(_vm) else {}
_ed = os.path.join(ROOT, "data", "everyday.json")
EVERYDAY = json.load(open(_ed, encoding="utf-8")) if os.path.exists(_ed) else {}
_bd = os.path.join(ROOT, "data", "basic.json")
BASIC = json.load(open(_bd, encoding="utf-8")) if os.path.exists(_bd) else {}
_id = os.path.join(ROOT, "data", "intermediate.json")
INTERMEDIATE = json.load(open(_id, encoding="utf-8")) if os.path.exists(_id) else {}
_ad = os.path.join(ROOT, "data", "advanced.json")
ADVANCED = json.load(open(_ad, encoding="utf-8")) if os.path.exists(_ad) else {}
_cd = os.path.join(ROOT, "data", "conversation.json")
CONVERSATION = json.load(open(_cd, encoding="utf-8")) if os.path.exists(_cd) else {}
_dd = os.path.join(ROOT, "data", "description.json")
DESCRIPTION = json.load(open(_dd, encoding="utf-8")) if os.path.exists(_dd) else {}

# ----------------------------------------------------------------------
# BASE: URL prefix for internal links.
#   ""         → custom domain (twrses.org), absolute paths from root
#   "/twrses"  → GitHub project page lukelin7429.github.io/twrses/
# Switch to "" and rebuild when DNS points twrses.org at GitHub Pages.
# ----------------------------------------------------------------------
BASE = ""
ROOT_URL = f"https://lukelin7429.github.io{BASE}" if BASE else "https://twrses.org"

import hashlib
def _asset_ver():
    h = hashlib.md5()
    for rel in ("assets/css/style.css", "assets/css/motion.css", "assets/js/main.js", "assets/js/deck.js"):
        p = os.path.join(ROOT, rel)
        if os.path.exists(p): h.update(open(p, "rb").read())
    return h.hexdigest()[:8]
ASSET_V = _asset_ver()

SITE = {
    "name": "彰化縣人師教育協會",
    "name_en": "My Culture Connect",
    "domain": "twrses.org",
    "founded": "民國 98 年（2009）",
    "slogan_en": "Learn from yesterday, live for today, and hope for tomorrow.",
    "email": "luke@mycultureconnect.org",
    "email2": "luke@mycultureconnect.org",
    "line": "luke7429",
    # 理事長（Practicum／實習媒合窗口）
    "chair": "游人仰",
    "chair_email": "kevin@mycultureconnect.org",
    "addr": "彰化縣北斗鎮文苑路一段 136 號",
    "fb": "https://www.facebook.com/renshiacademy/",
    "yt": "https://www.youtube.com/channel/UC04mOhuUodVHGVX6xMSg0MQ/playlists",
    "mcc": "https://www.mycultureconnect.org/",
    "hub": "https://changhua-bilingual.org",
    "taiwan_hub": "https://taiwan-bilingual.org",
    "bank_name": "彰化縣人師教育協會",
    "bank_acct": "第一銀行北斗分行 464-10-011163",
}

# -------------------- navigation tree (clean URLs) --------------------
NAV = [
    {"label": "首頁", "href": "/", "key": "home"},
    {"label": "認識人師", "href": "/about/", "key": "about", "children": [
        {"label": "協會介紹", "href": "/about/"},
        {"label": "創辦人林吉祥", "href": "/about/founder/"},
        {"label": "國際夥伴", "href": "/partners/"},
    ]},
    {"label": "偏鄉英語教育", "href": "/rural-schools/", "key": "rural", "children": [
        {"label": "人師英語學院", "href": "/rural-schools/academy/"},
        {"label": "報名上課", "href": "/rural-schools/register/"},
        {"label": "Practicum 線上課程", "href": "/rural-schools/practicum/"},
        {"label": "上課須知", "href": "/rural-schools/guidelines/"},
    ]},
    {"label": "英語學習資源", "href": "/resources/", "key": "resources", "children": [
        {"label": "閱讀與經典", "href": "/resources/reading/"},
        {"label": "打好基礎", "href": "/resources/basics/"},
        {"label": "聽說與會話", "href": "/resources/speaking/"},
        {"label": "生活英語", "href": "/resources/life/"},
    ]},
    {"label": "人師影音專區", "href": "/media/", "key": "media", "children": [
        {"label": "國際交流", "href": "/media/exchange/"},
        {"label": "人師英語新聞", "href": "/media/news-videos/"},
        {"label": "Enactus 英語課程", "href": "/media/enactus/"},
        {"label": "人師教育廣場", "href": "/media/talks/"},
        {"label": "人物專訪", "href": "/media/interviews/"},
    ]},
]

def nav_html(active):
    out = ['<ul class="menu">']
    for item in NAV:
        cls = ' class="has-sub"' if item.get("children") else ''
        if item.get("key") == active:
            cls = cls.replace('class="', 'class="active ') if cls else ' class="active"'
        out.append(f'<li{cls}><a href="{item["href"]}">{item["label"]}</a>')
        if item.get("children"):
            out.append('<ul class="submenu">')
            for c in item["children"]:
                out.append(f'<li><a href="{c["href"]}">{c["label"]}</a></li>')
            out.append('</ul>')
        out.append('</li>')
    out.append('</ul>')
    return "\n".join(out)

def header(active):
    return f'''<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="/">
      <img class="mark-logo" src="/assets/img/logo-badge.svg" alt="人師教育協會標誌" width="36" height="38">
      <span>{SITE["name"]}<small>My Culture Connect</small></span>
    </a>
    <button class="nav-toggle" aria-label="選單" aria-expanded="false"><span></span><span></span><span></span></button>
    {nav_html(active)}
  </div>
</header>'''

def footer():
    return f'''<footer class="site-footer">
  <div class="wrap foot-grid">
    <div>
      <div class="foot-brand">{SITE["name"]}</div>
      <p style="max-width:42ch;color:#9fb6af;font-size:.95rem">自{SITE["founded"]}成立，依法設立、非以營利為目的之社會團體，長年推廣偏鄉英語教育、製作免費學習資源。</p>
      <p style="font-size:.92rem;color:#9fb6af">{SITE["addr"]}</p>
    </div>
    <div>
      <h4>探索</h4>
      <ul class="foot-list">
        <li><a href="/about/">認識人師</a></li>
        <li><a href="/rural-schools/">偏鄉英語教育</a></li>
        <li><a href="/resources/">英語學習資源</a></li>
        <li><a href="/media/">人師影音專區</a></li>
      </ul>
    </div>
    <div>
      <h4>連結</h4>
      <ul class="foot-list">
        <li><a href="{SITE["fb"]}" target="_blank" rel="noopener">人師粉絲專頁</a></li>
        <li><a href="{SITE["taiwan_hub"]}" target="_blank" rel="noopener">台灣雙語資源網</a></li>
        <li><a href="{SITE["mcc"]}" target="_blank" rel="noopener">My Culture Connect</a></li>
        <li><a href="{SITE["hub"]}" target="_blank" rel="noopener">彰化雙語資源網</a></li>
        <li><a href="mailto:{SITE["email"]}">{SITE["email"]}</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <span>© 2009–2026 {SITE["name"]}　·　{SITE["slogan_en"]}</span>
    <span>Rebuilt with care · GitHub Pages</span>
  </div>
</footer>'''

def layout(path, title, desc, body, active, noindex=False, say_manifest=None, extra_head=""):
    full_title = f"{title}｜{SITE['name']}" if title else SITE["name"]
    robots_tag = '<meta name="robots" content="noindex, nofollow">\n' if noindex else ''
    # Pages whose 🔊 buttons have generated clips name their manifest here;
    # assets/js/main.js loads it and plays a recording instead of the device voice.
    say_attr = f' data-say-manifest="{say_manifest}"' if say_manifest else ""
    return f'''<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{full_title}</title>
<meta name="description" content="{html.escape(desc)}">
{robots_tag}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css?v={ASSET_V}">
<link rel="stylesheet" href="/assets/css/motion.css?v={ASSET_V}">
<link rel="stylesheet" href="/assets/css/search.css?v={ASSET_V}">
<link rel="icon" href="/assets/img/logo-badge.svg" type="image/svg+xml">
{extra_head}<meta property="og:title" content="{html.escape(full_title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:type" content="website">
</head>
<body{say_attr}>
{header(active)}
<main>
{body}
</main>
{footer()}
<script src="/assets/js/main.js?v={ASSET_V}"></script>
<script defer src="/assets/js/search.js?v={ASSET_V}"></script>
</body>
</html>'''

def write(path, content):
    """path like '/about/' -> about/index.html ; '/' -> index.html"""
    rel = path.strip("/")
    out = os.path.join(ROOT, rel, "index.html") if rel else os.path.join(ROOT, "index.html")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    if BASE:
        # prefix every internal absolute link/asset (external http/mailto/# untouched)
        content = content.replace('href="/', f'href="{BASE}/').replace('src="/', f'src="{BASE}/')
    open(out, "w", encoding="utf-8").write(content)
    return out

# -------------------- reusable blocks --------------------
# Teachers who arrive from the English site's library land deep inside these
# pages and have no way back — every menu here is in Chinese. A back link in the
# hero gives them one. Bilingual, so a Chinese visitor who never came from there
# can see what it is and ignore it.
MCC_LIBRARY = ("https://mycultureconnect.org/library/",
               "MCC Teaching Library · 英文教材庫")


def page_hero(eyebrow, title, lead, brand=False, back=None):
    cls = "hero band-brand" if brand else "hero"
    orbs = '<div class="hero-bg"><span class="orb a"></span><span class="orb b"></span><span class="orb c"></span></div>'
    lead_html = f'<p class="lead rvl d2">{lead}</p>' if lead else ""
    eb = f'<p class="eyebrow rvl">{eyebrow}</p>' if eyebrow else ""
    back_html = ""
    if back:
        href, label = back
        # Carries its own leading newline so a page without a back link does not
        # get a blank line where this would have been.
        back_html = f'\n    <p class="hero-back rvl"><a href="{href}">&larr; {label}</a></p>'
    return f'''<section class="{cls}">
  {orbs}
  <div class="wrap">{back_html}
    {eb}
    <h1 class="rvl d1">{title}</h1>
    {lead_html}
  </div>
</section>'''

_CN_WEEKDAY = None
def _fmt_dur(sec):
    """seconds -> M:SS or H:MM:SS"""
    try:
        sec = int(sec)
    except (ValueError, TypeError):
        return ""
    if sec <= 0:
        return ""
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"

def _fmt_date(d):
    """YYYYMMDD -> YYYY · MM/DD"""
    if d and len(d) == 8 and d.isdigit():
        return f"{d[0:4]} · {int(d[4:6])}/{int(d[6:8])}"
    return ""

# 「Mandarin for Everyday Use」教中文的影片——英語學習站不收，全站過濾。
EXCLUDE_VIDEO_IDS = frozenset({
    "3OWJxwFjeU8", "4MJAWqGEVU4", "7uYlesFDIwk", "BU9mjzQirOg",
    "ISjvaoVxr-8", "NDoHnfSQX4k", "P3B71arFNtA", "ZU0DiSf3mVg",
})

def live_ids(ids):
    """Drop videos that yt-dlp could not reach (private/deleted) or are excluded."""
    return [v for v in ids if v not in EXCLUDE_VIDEO_IDS and not VIDEO_META.get(v, {}).get("dead")]

def video_grid(ids, limit=None):
    ids = live_ids(ids)
    if limit:
        ids = ids[:limit]
    cards = []
    for v in ids:
        meta = VIDEO_META.get(v, {})
        thumb = f"https://i.ytimg.com/vi/{v}/hqdefault.jpg"
        url = f"https://www.youtube.com/watch?v={v}"
        title = html.escape(meta.get("title") or "觀看影片")
        dur = _fmt_dur(meta.get("duration"))
        date = _fmt_date(meta.get("date"))
        dur_badge = f'<span class="vdur">{dur}</span>' if dur else ""
        date_html = f'<span class="vdate">{date}</span>' if date else ""
        cards.append(f'''<a class="vcard" href="{url}" data-yt="{v}" title="{title}">
  <span class="vthumb"><img loading="lazy" src="{thumb}" alt="{title}">{dur_badge}</span>
  <span class="vmeta"><span class="vt">{title}</span>{date_html}</span>
</a>''')
    return '<div class="video-grid stagger">\n' + "\n".join(cards) + "\n</div>"

def donate_block():
    return f'''<div class="donate rvl">
  <p class="eyebrow">支持偏鄉英語教育</p>
  <p class="muted" style="margin-bottom:1rem">誠摯邀請您透過不定額捐款，或每年 1,200 元，提升偏鄉學生的英語能力，讓孩子也能在線上跟外師一起快樂學習。</p>
  <p class="acct">戶名：{SITE["bank_name"]}<br>帳號：{SITE["bank_acct"]}</p>
  <p class="muted" style="font-size:.9rem;margin-top:.8rem">收到匯款後將儘速寄發收據，煩請提供匯款日期、姓名與地址至 <a href="mailto:{SITE['email']}">{SITE['email']}</a>。</p>
</div>'''

# ==================================================================
#  IDENTITY PAGES (hand-authored)
# ==================================================================
def build_home():
    timeline = [
        ("tl-origin.jpg", "民國 91 年 · 2002", "從竹塘明航寺起步",
         "在竹塘的明航寺，為偏鄉的孩子開辦免費英語課程——非常感謝師父慈悲借用場地，讓孩子有了學習的角落。", False),
        ("tl-contest.jpg", "近 20 年", "全縣英文單字比賽",
         "在當地舉辦全縣性的英文單字比賽，年年舉行，直到 2020 年因疫情才停辦，前後將近二十年。", False),
        ("cert.jpg", "民國 98 年 · 2009", "正式成立協會",
         "在義務教學逾六年之後，為了服務更多孩子，我們正式立案成立「彰化縣人師教育協會」。", True),
        ("tl-media.jpg", "持續至今", "數位教材與教學影片",
         "投入大量心力製作免費學習教材與教學影片：設計網站、剪輯影片，並邀請外師參與錄音，讓資源能傳得更遠。", False),
        ("tl-intl.jpg", "2010 年起", "國際合作與志工交流",
         "2010、2012 年接待國際組織 Up with People；民國 100 年（2011）起在全縣各校提供國外英語視訊教學；麥克爺爺、Dom Jones 等國際友人也到校與學生互動。", False),
        ("tl-online.jpg", "線上轉型", "線上課程與師資實習",
         "邀請外國老師線上授課，學費由協會全額負擔；並與美國的學院合作引進實習老師，造就許多一對一與外師上課的機會。", False),
        ("tl-pd.jpg", "持續推廣", "推廣與教育合作",
         "持續推廣「人師英語學院」，並與彰化縣教育處合作辦理教師增能研習，把學習的機會帶給更多師生。", False),
    ]
    tl_html = ""
    for i, (img, year, h, desc, cert) in enumerate(timeline):
        media = (f'<div class="tl-media tl-cert"><img loading="lazy" src="/assets/img/home/{img}" alt="{html.escape(h)}"></div>'
                 if cert else f'<div class="tl-media"><img loading="lazy" src="/assets/img/home/{img}" alt="{html.escape(h)}"></div>')
        tl_html += f'''<div class="tl-item rvl">{media}<div class="tl-text"><span class="tl-year">{year}</span><h3>{h}</h3><p>{desc}</p></div></div>'''

    slides = [
        ("slide-1.jpg","與外師面對面交流"), ("slide-2.jpg","國外英語視訊教學"),
        ("slide-3.jpg","Enactus 英語課程"), ("slide-4.jpg","教師增能研習"),
        ("slide-5.jpg","推廣人師英語學院"), ("slide-6.jpg","教學影片製作"),
        ("slide-7.jpg","國際夥伴交流"), ("slide-8.jpg","外師到校互動"),
        ("slide-9.jpg","各界的肯定"),
    ]
    slides_html = "".join(
        f'<figure class="car-slide"><img loading="lazy" src="/assets/img/home/{s}" alt="{html.escape(c)}"><figcaption>{c}</figcaption></figure>'
        for s, c in slides)
    dots_html = "".join(f'<button class="car-dot{" on" if i==0 else ""}" data-i="{i}" aria-label="第 {i+1} 張"></button>' for i in range(len(slides)))

    body = f'''
<section class="hero hero-home">
  <div class="hero-bg"><span class="orb a"></span><span class="orb b"></span><span class="orb c"></span></div>
  <div class="wrap">
    <p class="eyebrow rvl">彰化縣人師教育協會 · My Culture Connect</p>
    <h1 class="rvl d1">讓偏鄉的孩子，<br>也能與世界一起學習。</h1>
    <p class="lead rvl d2">自民國 91 年起義務深耕、民國 98 年正式成立——我們製作免費學習教材與教學影片，並引進國外資源與彰化的孩子交流。</p>
    <p class="slogan-en rvl d3" style="margin-top:1rem;color:#ffe9c7">{SITE["slogan_en"]}</p>
    <div class="hero-cta rvl d3">
      <a class="btn btn-gold" href="/rural-schools/academy/">免費線上英語課程</a>
      <a class="btn btn-ghost" style="border-color:#fff;color:#fff" href="/about/">認識人師</a>
    </div>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    {fcard_grid([
      ("/rural-schools/", "🌱", "偏鄉英語教育", "邀請各國英語老師透過線上教學，為偏鄉學生免費授課。"),
      ("/resources/", "📚", "免費學習資源", "閱讀與經典、打好基礎、聽說與會話、生活英語——免費開放自學。"),
      ("/media/", "🎬", "人師影音專區", "國際交流、英語新聞、教育廣場與人物專訪，從生活看見英語。"),
    ])}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="eyebrow rvl">我們的故事</p>
    <h2 class="rvl d1 sweep">從一間教室，到與世界連線</h2>
    <p class="lead rvl d2" style="max-width:60ch">人師教育協會正式成立於民國 98 年（2009 年）。在成立之前，我們已經持續多年免費教偏鄉的孩子英文；為了服務更多人，才決定成立這個非營利組織。以下是我們一路走來的足跡。</p>
    <div class="timeline-v" style="margin-top:2.5rem">{tl_html}</div>
  </div>
</section>

<section class="section band">
  <div class="wrap split">
    <div class="split-media rvl"><figure class="figure"><img loading="lazy" src="/assets/img/home/free-class.jpg" alt="免費線上英語課程"></figure></div>
    <div class="rvl d2">
      <p class="eyebrow">免費線上英語課程</p>
      <h2 class="sweep">和外師面對面，<br>免費學英文</h2>
      <p class="muted">我們邀請英美外師線上授課，<strong>學費由人師教育協會全額負擔</strong>，各級學校學生都能報名。讓偏鄉的孩子，也能與世界對話。</p>
      <div class="pills" style="margin-top:1.1rem">
        <span class="pill"><b>免費</b> 一對一 / 小班</span>
        <span class="pill">英美<b>母語</b>外師</span>
      </div>
      <p style="margin-top:1.5rem"><a class="btn btn-primary" href="/rural-schools/register/">免費報名上課 →</a></p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap grid cols-2" style="align-items:center;gap:3rem">
    <div class="rvl">
      <p class="eyebrow">我們在做的事</p>
      <h2 class="sweep">與美國 ITA 合作，<br>外師線上一對一</h2>
      <p class="muted">從民國 109 年 4 月起，我們與美國芝加哥的國際英語教師認證機構（International TEFL Academy）合作，邀請各國英語老師透過線上教學為學生授課，讓無數學生受惠；同時也開放台灣及全世界的英語老師線上觀課，提升教學技巧。</p>
      <p style="margin-top:1.4rem"><a class="btn btn-gold" href="/rural-schools/register/">如何報名上課 →</a></p>
    </div>
    <div class="rvl d2">{donate_block()}</div>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">影像紀錄</p>
    <h2 class="rvl d1">人師的足跡</h2>
    <div class="carousel rvl d2" data-carousel style="margin-top:1.6rem">
      <div class="car-viewport"><div class="car-track">{slides_html}</div></div>
      <button class="car-arrow car-prev" aria-label="上一張">‹</button>
      <button class="car-arrow car-next" aria-label="下一張">›</button>
      <div class="car-dots">{dots_html}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="eyebrow rvl">人師建置的雙語平台</p>
    <h2 class="rvl d1 sweep">我們為彰化與全臺灣，<br>打造雙語學習資源網</h2>
    <p class="lead rvl d2" style="max-width:62ch">除了線上外師課程，人師教育協會也親手規劃並建置雙語學習資源平台，把單字、影片、課程與教學資源免費公開給師生使用。點選下方卡片，前往我們建置的網站。</p>
    <div class="grid cols-2 stagger hub-grid" style="margin-top:2.2rem">
      <a class="hubcard rvl" href="{SITE['taiwan_hub']}" target="_blank" rel="noopener">
        <span class="hubcard-cover hc-taiwan"><span class="hubcard-emoji">🇹🇼</span><span class="hubcard-region">全臺灣</span></span>
        <span class="hubcard-body">
          <h3>臺灣雙語資源網</h3>
          <p>面向全臺師生的雙語學習資源平台——看、說、學、教、玩五大分類，影片、單字與互動遊戲一應俱全。</p>
          <span class="hubcard-cta">前往網站 →</span>
        </span>
      </a>
      <a class="hubcard rvl d1" href="{SITE['hub']}" target="_blank" rel="noopener">
        <span class="hubcard-cover hc-changhua"><span class="hubcard-emoji">🏫</span><span class="hubcard-region">彰化縣</span></span>
        <span class="hubcard-body">
          <h3>彰化雙語資源網</h3>
          <p>彰化縣各校的雙語學習中心——每日單字、課室英語、各校特色課程與最新消息，與在地校園緊密連結。</p>
          <span class="hubcard-cta">前往網站 →</span>
        </span>
      </a>
    </div>
  </div>
</section>

<section class="section band-brand">
  <div class="wrap center">
    <p class="eyebrow rvl">加入我們</p>
    <h2 class="rvl d1">竭誠歡迎關懷教育的有心人士<br>加入人師的行列</h2>
    <p class="lead rvl d2" style="margin:1rem auto 0;max-width:48ch">一起共創教育活力，把英語帶來的新視野、新世界，分享給每一個孩子。</p>
    <p class="rvl d3" style="margin:1.6rem auto 0;font-size:1.1rem">歡迎來信詢問、交流或加入我們：<br><a href="mailto:{SITE['email']}" style="color:#ffe6ad;font-weight:700;text-decoration:underline;text-underline-offset:4px">{SITE['email']}</a></p>
  </div>
</section>
'''
    write("/", layout("/", "", "彰化縣人師教育協會（My Culture Connect）— 自民國91年義務深耕、98年成立，推廣偏鄉英語教育，提供免費線上外師課程與英語學習資源。", body, "home"))

def build_about():
    partners = [
        ("Chinese Culture Connection", "麻州華夏文化協會 · Massachusetts"),
        ("Truman State University", "密蘇里州杜魯門大學 · Missouri"),
        ("CIEE", "緬因州國際教育交流協會 · Maine"),
        ("International TEFL Academy", "伊利諾州國際英語教學認證學院 · Illinois"),
        ("Books for Taiwan", "紐澤西州送書到台灣 · New Jersey"),
        ("Xperita", "明尼蘇達州 · Minnesota"),
        ("Northern Michigan University", "北密西根州立大學 · Michigan"),
        ("CCC Chinese School", "紐約州首府中文學校 · New York"),
        ("UNA-OC", "聯合國協會橘郡分會 · California"),
        ("De La Salle University–Dasmariñas HS", "菲律賓德拉薩大學附設高中 · Philippines"),
    ]
    pcards = "\n".join(
        f'<div class="card"><h3 style="font-size:1.15rem">{html.escape(n)}</h3><p>{html.escape(d)}</p></div>'
        for n, d in partners)
    tasks = [
        "培訓種子教師，輔助資源不足地區之教學。",
        "製作網路教學資源，免費提供多元學習模式。",
        "推廣讀書會，倡導終身學習理念。",
        "舉辦藝文比賽、座談會等活動，提昇彰化地區文化水準。",
        "加強英語教育，提昇國際觀。",
    ]
    tlist = "\n".join(f"<li>{t}</li>" for t in tasks)
    body = f'''
{page_hero("認識人師", "以教育，連結世界的善意", "本會成立於民國 98 年 1 月 1 日，為依法設立、非以營利為目的之社會團體，以培養學識與品德兼具之志工老師，以及提昇彰化地區教育與文化水準為宗旨。")}

<section class="section tight">
  <div class="wrap rvl">
    <figure class="figure" style="margin:0"><img src="/assets/img/about-banner.jpg" alt="人師夢想為偉人，我為夢想而努力；利用有限的資源，創造無限的機會"></figure>
  </div>
</section>

<section class="section">
  <div class="wrap grid cols-2" style="gap:3rem;align-items:start">
    <div class="rvl prose">
      <p class="eyebrow">宗旨</p>
      <h2 class="sweep">培養志工老師，<br>提昇教育文化</h2>
      <p class="muted">人師教育協會的組成份子有校長、老師、家長和關心教育的熱心人士。為了提供更多教育資源給下一代，大家有錢出錢、有力出力，製作免費學習教材與教學影片，近期更協助多所學校製作雙語資源網站，積極引進國外資源與彰化縣的學校交流。</p>
    </div>
    <div class="rvl d2">
      <p class="eyebrow">五大任務</p>
      <ol class="prose" style="margin-top:.5rem">{tlist}</ol>
    </div>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">合作單位</p>
    <h2 class="rvl d1">與國內外逾百所學校及組織同行</h2>
    <p class="lead rvl d2" style="max-width:60ch">除了與彰化、台中、南投等縣市的一百多所學校合作之外，也與下列國外大學及非營利組織攜手：</p>
    <div class="grid cols-3 stagger" style="margin-top:2rem">{pcards}</div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="rvl">
      <p class="eyebrow">創辦人</p>
      <h2 class="sweep">林吉祥老師</h2>
      <p class="muted">自民國 91 年起，林吉祥老師在竹塘鄉利用明航寺的場地開辦免費的英語課程，嘉惠南彰化的孩子；並於民國 98 年正式成立人師教育協會。長年義務奉獻，2014 年榮獲教育部<strong>教育奉獻獎</strong>，獲總統與教育部長親自表揚。</p>
      <p class="pullquote">「我的夢想，就是讓偏鄉孩子不用花大錢，也能學好英文。」<small>—— 創辦人 林吉祥</small></p>
      <a class="btn btn-primary" href="/about/founder/">閱讀創辦人完整事蹟 →</a>
    </div>
    <div class="split-media rvl d2">
      <figure class="figure"><img src="/assets/img/founder/portrait.jpg" alt="創辦人林吉祥老師" loading="lazy"></figure>
    </div>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">歷屆理事長</p>
    <h2 class="rvl d1">一棒接一棒的傳承</h2>
    <figure class="figure rvl d2" style="margin:1.5rem auto 0">
      <img src="/assets/img/chairmen.jpg" alt="人師教育協會歷屆理事長：林吉祥、游人仰、蔡國裕">
      <figcaption>歷屆理事長：林吉祥（第 1–2 屆）、游人仰（第 3、6 屆）、蔡國裕（第 4–5 屆）</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="wrap grid cols-2" style="gap:3rem;align-items:center">
    <div class="rvl">
      <p class="eyebrow">聯絡我們</p>
      <h2 class="sweep">歡迎與人師聯絡</h2>
      <p class="muted">若您有任何問題，歡迎聯絡協會總幹事林吉祥老師。</p>
      <div class="pills" style="margin-top:1rem">
        <span class="pill">📧 <a href="mailto:{SITE['email']}">{SITE['email']}</a></span>
        <span class="pill">💬 Line：{SITE['line']}</span>
      </div>
      <p class="muted" style="margin-top:1rem;font-size:.95rem">📍 {SITE['addr']}</p>
    </div>
    <div class="rvl d2">{donate_block()}</div>
  </div>
</section>
'''
    write("/about/", layout("/about/", "認識人師", "人師教育協會成立於民國98年，宗旨、五大任務、國內外合作單位與創辦人林吉祥介紹。", body, "about"))

def build_founder():
    def vcard(vid, title):
        return f'''<a class="vcard" href="https://www.youtube.com/watch?v={vid}" data-yt="{vid}" title="{html.escape(title)}">
  <span class="vthumb"><img loading="lazy" src="https://i.ytimg.com/vi/{vid}/hqdefault.jpg" alt="{html.escape(title)}"></span>
  <span class="vmeta"><span class="vt">{html.escape(title)}</span></span>
</a>'''
    videos = "\n".join([
        vcard("phk3Atsq1rU", "教育奉獻獎 表揚紀錄"),
        vcard("vS22rkgGnRU", "至內政部受獎"),
        vcard("BC1hJTjvcag", "創辦人介紹人師教育協會"),
    ])
    media = [
        ("教育部教育奉獻獎 · 得獎名錄", "https://excellentteacher.moe.edu.tw/2014/teacher1_11.htm", "教育部"),
        ("辭鐵飯碗，義教偏鄉童英文", "https://news.ltn.com.tw/news/local/paper/512930", "自由時報"),
        ("林吉祥獲全國教育奉獻獎", "https://tw.news.yahoo.com/%E6%9E%97%E5%90%89%E7%A5%A5%E7%8D%B2%E5%85%A8%E5%9C%8B%E6%95%99%E8%82%B2%E5%A5%89%E7%8D%BB%E7%8D%8E-220124748.html", "中國時報"),
        ("助偏鄉學童學英文 義教十二年", "https://www.merit-times.com.tw/NewsPage2.aspx?unid=336535", "人間福報"),
    ]
    mcards = "\n".join(
        f'''<a class="card card-link" href="{url}" target="_blank" rel="noopener">
  <span class="tag">{src}</span>
  <h3 style="margin-top:.6rem;font-size:1.12rem">{html.escape(title)}</h3>
  <p>閱讀報導 ↗</p>
</a>''' for title, url, src in media)
    timeline = [
        ("民國 91 年（2002）", "自竹塘鄉起步——利用明航寺的場地，開辦免費的英語課程，嘉惠南彰化的孩子。"),
        ("民國 98 年（2009）", "正式立案成立彰化縣人師教育協會，匯聚校長、老師、家長與熱心人士的力量。"),
        ("民國 103 年（2014）", "榮獲教育部「教育奉獻獎」，於師鐸獎暨資深優良教師表揚大會受獎，獲馬英九總統與吳思華部長親自表揚。"),
        ("持續至今", "拍攝數百支生活英語影片免費供自學，並引進國外資源、視訊教學，與彰化縣逾百所學校交流。"),
    ]
    tl = "\n".join(f'<li><span class="yr">{html.escape(y)}</span><br><span class="tx">{html.escape(t)}</span></li>' for y, t in timeline)
    body = f'''
<section class="hero">
  <div class="hero-bg"><span class="orb a"></span><span class="orb b"></span></div>
  <div class="wrap split">
    <div>
      <p class="eyebrow rvl"><a href="/about/" style="color:inherit">認識人師</a> · 創辦人</p>
      <h1 class="rvl d1">林吉祥老師</h1>
      <p class="lead rvl d2">人師教育協會創辦人、總幹事。2014 年教育部教育奉獻獎得主。自民國 91 年起義務推廣偏鄉英語教育，嘉惠彰化的孩子至今。</p>
      <div class="pills rvl d3" style="margin-top:1.2rem">
        <span class="pill">🏆 教育奉獻獎</span>
        <span class="pill">📚 義教偏鄉英語</span>
        <span class="pill">🌏 引進國際資源</span>
      </div>
    </div>
    <div class="split-media rvl d2">
      <div class="portrait"><img src="/assets/img/founder/portrait.jpg" alt="創辦人林吉祥老師"></div>
    </div>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <div class="split">
      <div class="rvl">
        <p class="eyebrow">里程碑</p>
        <h2>一條義無反顧的路</h2>
        <ul class="timeline">{tl}</ul>
      </div>
      <div class="rvl d2">
        <p class="eyebrow">2014 教育奉獻獎</p>
        <div class="award-photos">
          <figure class="figure"><img src="/assets/img/founder/award-ma.jpg" alt="林吉祥獲教育奉獻獎與馬英九總統合影"><figcaption>與馬英九總統合影</figcaption></figure>
          <figure class="figure"><img src="/assets/img/founder/award-wu.jpg" alt="林吉祥自教育部長吳思華手中接受教育奉獻獎"><figcaption>教育部長吳思華頒獎</figcaption></figure>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="eyebrow rvl">媒體報導</p>
    <h2 class="rvl d1">各界的報導與肯定</h2>
    <div class="grid cols-4 stagger" style="margin-top:1.8rem">{mcards}</div>
  </div>
</section>

<section class="section band-brand">
  <div class="wrap">
    <p class="eyebrow rvl">影音紀錄</p>
    <h2 class="rvl d1" style="margin-bottom:1.8rem">得獎紀錄與創辦人分享</h2>
    <div class="grid cols-3 stagger">{videos}</div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="split-media rvl">
      <figure class="figure"><img loading="lazy" src="/assets/img/founder/blackboard.jpg" alt="愛在英語蔓延時，許一個吉祥的夢">
      <figcaption>黑板上的心願：「愛在英語蔓延時，許一個吉祥的夢」</figcaption></figure>
    </div>
    <div class="rvl d2 prose">
      <p class="eyebrow">他的故事</p>
      <h2 class="sweep">為偏鄉，點一盞英語的燈</h2>
      <p>自民國 91 年起，林吉祥老師在竹塘鄉利用明航寺的場地，開辦免費的英語課程，嘉惠南彰化的孩子。他常說：「能以一己之力服務他人，我比以前更快樂。」</p>
      <p>他組織志工團隊、自拍教學短片、架設網站、購置器材，推廣偏鄉學校的英語教育；更引進國外資源，讓學生透過視訊和外國老師面對面練習口說。</p>
      <p class="pullquote">「我的夢想，就是讓偏鄉孩子不用花大錢，也能學好英文。」</p>
    </div>
  </div>
</section>

<section class="section tight center">
  <div class="wrap rvl">
    <a class="btn btn-ghost" href="/about/">← 回認識人師</a>
  </div>
</section>
'''
    write("/about/founder/", layout("/about/founder/", "創辦人林吉祥",
        "人師教育協會創辦人林吉祥老師：自民國91年起義教偏鄉英語、嘉惠南彰化孩子，2014 年教育部教育奉獻獎得主，完整事蹟、媒體報導與影音。", body, "about"))

MCC_FORMS = "/forms"
def build_register():
    classes = [
        ("Teacher Shannon · A 班", "週日 09:00–09:50", "高一至高三 · Grade 10–12", "shannon-a/"),
        ("Teacher Shannon · B 班", "週日 10:15–11:05", "國一至國三 · Grade 7–9", "shannon-b/"),
        ("Teacher Bridget 小班", "週三 20:00–20:45", "國小一至四年級 · Grade 1–4", "bridget/"),
        ("Teacher Dom 小班", "週六 10:00–11:00", "國小六年級至高三 · Grade 6–12", "dom/"),
    ]
    def card(title, sched, grade, folder):
        return f'''<a class="card card-link" href="{MCC_FORMS}/{folder}">
  <h3 style="font-size:1.2rem">{html.escape(title)}</h3>
  <div class="pills" style="margin:.2rem 0 .7rem"><span class="pill">🗓 {html.escape(sched)}</span></div>
  <p>{html.escape(grade)}</p>
  <p style="margin-top:1rem;color:var(--brand-dk)"><strong>前往報名 →</strong></p>
</a>'''
    cls_html = "".join(card(*c) for c in classes)
    body = f'''
{page_hero("報名上課", "選一個適合你的課程", "人師英語學院的線上課程全部免費，學費由協會負擔。挑選下方適合的班別，點進去填寫報名表即可。")}
<section class="section">
  <div class="wrap">
    <p class="eyebrow rvl">小班課程</p>
    <h2 class="rvl d1">固定時段的外師小班</h2>
    <div class="grid cols-2 stagger" style="margin-top:1.6rem">{cls_html}</div>
    <p class="muted rvl" style="margin-top:1.6rem;font-size:.92rem">＊報名後會再透過 Line 或 email 通知上課方式。有任何問題歡迎聯絡{SITE['chair']}理事長：<a href="mailto:{SITE['chair_email']}">{SITE['chair_email']}</a>。</p>
  </div>
</section>
'''
    write("/rural-schools/register/", layout("/rural-schools/register/", "報名上課",
        "人師英語學院免費線上課程報名：外師小班（Shannon／Bridget／Dom）。", body, "rural"))

def build_rural_index():
    body = f'''
{page_hero("偏鄉英語教育", "讓資源，跨越城鄉的距離", "遠在偏鄉的孩子們因為學習資源不足，缺乏外語學習環境。本協會自民國 98 年創立以來，長期致力於推廣偏鄉英語教育，擴展學生的國際視野。")}
<section class="section">
  <div class="wrap">
    <div class="rvl" style="text-align:center;max-width:680px;margin:0 auto 2.8rem">
      <p class="eyebrow">三個入口</p>
      <h2 style="font-size:clamp(1.7rem,3.2vw,2.3rem)">從這裡開始，認識我們的免費課程</h2>
      <p class="muted" style="font-size:1.08rem">無論是線上學院、實習老師的一對一課程，或是上課前的準備，點進下方任一張卡片，就能深入了解。</p>
    </div>
    <div class="feature-grid stagger">
      <a class="fcard" style="--accent:var(--brand)" href="/rural-schools/academy/">
        <span class="fcard-ico">🎓</span>
        <span class="fcard-kicker">免費線上課程</span>
        <h3>人師英語學院</h3>
        <p>ITA 認證的英美母語外師線上授課，免費開放各級學校學生報名。</p>
        <span class="fcard-go">了解更多 <i>→</i></span>
      </a>
      <a class="fcard" style="--accent:var(--sunset)" href="/rural-schools/practicum/">
        <span class="fcard-ico">💻</span>
        <span class="fcard-kicker">一對一 · 小班</span>
        <h3>Practicum 線上課程</h3>
        <p>與 ITA、CIEE 合作的一對一與小班英語課程，常見問答與報名方式一次說明。</p>
        <span class="fcard-go">了解更多 <i>→</i></span>
      </a>
      <a class="fcard" style="--accent:var(--gold-dk)" href="/rural-schools/guidelines/">
        <span class="fcard-ico">📋</span>
        <span class="fcard-kicker">課堂守則</span>
        <h3>上課須知</h3>
        <p>中英對照的課堂守則，幫助學生做好準備、尊重老師、把握每一堂課。</p>
        <span class="fcard-go">了解更多 <i>→</i></span>
      </a>
    </div>
    <div style="margin-top:3rem">{donate_block()}</div>
  </div>
</section>
'''
    write("/rural-schools/", layout("/rural-schools/", "偏鄉英語教育", "人師教育協會推廣偏鄉英語教育：人師英語學院、Practicum 線上課程與上課須知。", body, "rural"))

def build_academy():
    teachers = [
        ("bridget", "Bridget Hoarty", "Boston, MA"),
        ("shannon", "Shannon Braden", "Los Angeles, CA"),
        ("jessica", "Jessica Hartkopf", "Minneapolis, MN"),
        ("douglas", "Douglas Benner", "Albuquerque, NM"),
        ("dom", "Dom Jones", "Orange County, CA"),
        ("lily", "Lily Chen", "Boston, MA"),
        ("melissa", "Melissa Pini", "Detroit, MI"),
        ("melanie", "Melanie Rohena", "Denver, CO"),
        ("jennafer", "Jennafer Duerden", "Savona, Italy"),
        ("emily", "Emily Hogle", "United States"),
        ("quentin", "Quentin Gooch", "United States"),
        ("xiahna", "Xiahna Evans", "United States"),
        ("lisa", "Lisa Dinning", "United States"),
        ("eric", "Eric Berman", "United States"),
        ("angela", "Angela Miley", "United States"),
    ]
    tcards = "\n".join(
        f'''<div class="person"><div class="ph"><img loading="lazy" src="/assets/img/teachers/{slug}.jpg" alt="{html.escape(name)}"></div><b>{html.escape(name)}</b><small>{html.escape(loc)}</small></div>'''
        for slug, name, loc in teachers)
    body = f'''
{page_hero("人師英語學院", "和外師一起，快樂學英文", "人師教育協會長年投入偏鄉免費英語教育，「人師英語學院」延續這份初心，由認證外師線上授課，為孩子打造優質的英語學習環境，歡迎大家報名上課。")}
<section class="section">
  <div class="wrap grid cols-2" style="gap:3rem;align-items:start">
    <div class="rvl prose">
      <h2 class="sweep">課程資訊</h2>
      <ul>
        <li><strong>師資來源</strong>：認證過的英語老師。</li>
        <li><strong>費用</strong>：免費。</li>
        <li><strong>報名資格</strong>：各級學校學生。</li>
        <li><strong>上課平台</strong>：Google Meet。</li>
      </ul>
      <p><a class="btn btn-primary" href="/rural-schools/register/">前往線上報名 →</a></p>
    </div>
    <div class="rvl d2">{donate_block()}</div>
  </div>
</section>
<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">師資群</p>
    <h2 class="rvl d1">我們的外師團隊</h2>
    <div class="team-grid stagger" style="margin-top:2rem">{tcards}</div>
  </div>
</section>
'''
    write("/rural-schools/academy/", layout("/rural-schools/academy/", "人師英語學院", "人師英語學院提供免費線上英語課程，認證過的英語老師授課，各級學校學生可報名。", body, "rural"))

def build_practicum():
    faqs_ita = [
        ("請問如何申請上課？", f"請填寫上課報名表，完成後寫信給{SITE['chair']}理事長告知 email：{SITE['chair_email']}。"),
        ("上一對一英語課程需要繳費嗎？", "跟實習老師上課是完全免費。"),
        ("可以上幾堂課？", "跟 ITA 學院的實習老師上課至少是六節課。"),
        ("一次上課時間多久？", "師生雙方協調好即可，通常一次一小時。"),
        ("實習老師完成實習後可以繼續申請嗎？", f"可以。老師通知課程結束後，可再通知{SITE['chair']}理事長安排下一位實習老師。"),
        ("聯絡窗口是哪位老師？", f"聯絡窗口是{SITE['chair']}理事長，請來信 {SITE['chair_email']} 聯絡。"),
        ("如果有事如何調課？", "請於上課群組中事先請假並協調調課時間。實習老師有實習截止日期壓力，請盡量不要隨意請假。"),
        ("上課要打開鏡頭嗎？", "是的。使用桌機請安裝 webcam，盡量不要用平板與手機，因為上課中有時需要鍵盤打字。"),
    ]
    faqs_ciee = [
        ("上英語小班課程需要繳費嗎？", "完全免費。"),
        ("上小班的條件為何？", "至少要有兩個人一起上課。"),
        ("可以上幾堂課？", "與學院的實習老師上課通常為數節課（依老師實習時程）。"),
        ("一次上課時間多久？", "師生雙方協調好即可，通常一次一小時。"),
        ("實習老師完成實習後可以繼續申請嗎？", "可以，方式同 ITA 一對一。"),
        ("上課要打開鏡頭嗎？", "是的，使用桌機請安裝 webcam，盡量不要用平板與手機上課。"),
    ]
    def faq_block(items):
        return '<div class="faq">' + "\n".join(
            f'<details><summary>{html.escape(q)}</summary><div class="a">{html.escape(a)}</div></details>'
            for q, a in items) + '</div>'
    body = f'''
{page_hero("Practicum · 免費一對一 / 小班英語課程", "兩種管道，都免費", "我們與美國的 International TEFL Academy（芝加哥）與 CIEE（緬因州 Portland）合作，由完成認證的實習老師為學生線上授課。以下為常見問答。")}
<section class="section">
  <div class="wrap">
    <p class="eyebrow rvl">ITA · 一對一</p>
    <h2 class="rvl d1" style="margin-bottom:.3rem">International TEFL Academy（Chicago）</h2>
    <p class="muted rvl d2" style="margin-bottom:1.4rem">一對一線上課程，至少六節課。</p>
    <div class="rvl d2">{faq_block(faqs_ita)}</div>
  </div>
</section>
<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">CIEE · 小班</p>
    <h2 class="rvl d1" style="margin-bottom:.3rem">Council on International Educational Exchange（Maine）</h2>
    <p class="muted rvl d2" style="margin-bottom:1.4rem">小班線上課程，至少兩人一起上課。</p>
    <div class="rvl d2">{faq_block(faqs_ciee)}</div>
  </div>
</section>
<section class="section">
  <div class="wrap" style="max-width:640px;text-align:center">
    <p class="eyebrow rvl">還有問題？</p>
    <h2 class="rvl d1" style="margin-bottom:.5rem">找不到你的答案？</h2>
    <p class="muted rvl d2" style="margin-bottom:1.5rem">歡迎直接聯絡{SITE['chair']}理事長，我們很樂意為你說明上課方式。</p>
    <div class="pills rvl d2" style="justify-content:center">
      <span class="pill">📧 <a href="mailto:{SITE['chair_email']}">{SITE['chair_email']}</a></span>
    </div>
  </div>
</section>
'''
    write("/rural-schools/practicum/", layout("/rural-schools/practicum/", "Practicum 線上課程", "免費一對一（ITA）與小班（CIEE）英語課程的常見問答與報名方式。", body, "rural"))

def build_guidelines():
    rules = [
        ("提早五分鐘上線", "請務必在課程開始前至少五分鐘上線，避免延誤，確保課程順利開始。", "Log in 5 minutes early"),
        ("必須打開鏡頭", "為了表達對老師的尊重並保持良好的溝通，上課時請務必開啟鏡頭。", "Keep your camera on"),
        ("如無法上課，請提前通知老師", "若無法參加，請儘早與老師協調調課。上一對一課程時尤其重要，因為實習老師需在截止日期前完成任務。", "Let your teacher know if you can't make it"),
        ("上課盡量使用筆電", "老師有時會需要你打字回答問題，使用手機或平板不太容易操作。", "Use a laptop whenever possible"),
        ("心存感恩", "請對老師的時間與指導心存感激；積極的態度與感恩的心能營造良好的學習環境。", "Be grateful"),
        ("減少干擾", "請在安靜且光線良好的環境中上課，避免任何分散注意力的因素。", "Minimize distractions"),
        ("做好準備", "課前準備好筆記本、筆與作業等學習用品；如有需要可預習前一堂課內容。", "Come prepared"),
        ("尊重並配合老師", "禮貌的溝通是關鍵。請遵循老師的指導並積極參與，以提高學習效果。", "Respect and participate"),
    ]
    cards = "\n".join(
        f'<div class="card"><span class="tag">{i+1}</span><h3 style="margin-top:.6rem;font-size:1.2rem">{html.escape(zh)}</h3><p>{html.escape(d)}</p><p style="font-size:.82rem;color:#9aa8a3;margin-top:.6rem;font-style:italic">{html.escape(en)}</p></div>'
        for i, (zh, d, en) in enumerate(rules))
    body = f'''
{page_hero("上課須知", "把每一堂課，準備到最好", "Class Guidelines for Students — 以下八項守則，幫助你尊重老師、專注學習，讓每一堂免費的外師課都不浪費。")}
<section class="section">
  <div class="wrap">
    <div class="grid cols-2 stagger">{cards}</div>
  </div>
</section>
'''
    write("/rural-schools/guidelines/", layout("/rural-schools/guidelines/", "上課須知", "英語課上課須知（中英對照）：八項課堂守則。", body, "rural"))

# ==================================================================
#  RESOURCES + MEDIA hubs and leaves
# ==================================================================
FCARD_ACCENTS = ["var(--brand)", "var(--sunset)", "var(--gold-dk)"]

def fcard(href, ico, title, blurb, accent, cta="了解更多", soon=False):
    """單張立體 feature 卡；soon=True 或無 href 時渲染為灰階「製作中」卡。"""
    inner = f'<span class="fcard-ico">{ico}</span><h3>{html.escape(title)}</h3><p>{html.escape(blurb)}</p>'
    if soon or not href:
        return f'<div class="fcard fcard-soon" style="--accent:{accent}">{inner}</div>'
    return (f'<a class="fcard" style="--accent:{accent}" href="{href}">{inner}'
            f'<span class="fcard-go">{cta} <i>→</i></span></a>')

def fcard_grid(items, cta="了解更多"):
    """items：(href, ico, title, blurb[, soon]) 的序列。卡片少時用 2×2 避免落單。"""
    cells = []
    for i, it in enumerate(items):
        href, ico, title, blurb = it[0], it[1], it[2], it[3]
        soon = it[4] if len(it) > 4 else False
        cells.append(fcard(href, ico, title, blurb, FCARD_ACCENTS[i % len(FCARD_ACCENTS)], cta, soon))
    colcls = "fg-2" if len(items) in (2, 4) else ""
    return f'<div class="feature-grid {colcls} stagger">{"".join(cells)}</div>'

def hub_page(path, key, eyebrow, title, lead, children, cta="了解更多", desc=None):
    """lead 不經跳脫，可傳雙語 HTML（英文 + <span class='muted'>中文</span>）。
    desc 供 <meta description> 用；lead 帶 HTML 時要另外給純文字。"""
    body = f'''
{page_hero(eyebrow, title, lead)}
<section class="section"><div class="wrap">{fcard_grid(children, cta)}</div></section>
'''
    write(path, layout(path, title, desc or lead, body, key))

def leaf_videos(path, key, eyebrow, title, lead, crawl_path, extra_intro=""):
    ids = live_ids(BY_PATH.get(crawl_path, {}).get("youtube", []))
    grid = video_grid(ids) if ids else '<p class="muted">影片整理中，敬請期待。</p>'
    count = f'<span class="pill"><b>{len(ids)}</b> 部影片</span>' if ids else ""
    body = f'''
{page_hero(eyebrow, title, lead)}
<section class="section">
  <div class="wrap">
    <div class="flex rvl" style="justify-content:space-between;margin-bottom:1.6rem">
      <div class="pills">{count}</div>
    </div>
    {extra_intro}
    {grid}
  </div>
</section>
'''
    write(path, layout(path, title, lead or title, body, key))

def leaf_prose(path, key, eyebrow, title, lead, paragraphs):
    phtml = "\n".join(f"<p>{html.escape(p)}</p>" for p in paragraphs)
    body = f'''
{page_hero(eyebrow, title, lead)}
<section class="section"><div class="wrap prose wide rvl">{phtml}</div></section>
'''
    write(path, layout(path, title, lead or title, body, key))

AUDIO_REL = "https://github.com/lukelin7429/twrses/releases/download/audio-everyday"
PDF_REL = "https://github.com/lukelin7429/twrses/releases/download/everyday-pdf"

def _zh_tidy(s):
    return re.sub(r'(?<=[一-鿿])\s+(?=[一-鿿])', '', s).strip()

def _bold_kw(passage, vocab):
    out = passage
    for v in vocab:
        out = re.sub(r'\b(' + re.escape(v["w"]) + r'\w*)\b',
                     r'<span class="kw">\1</span>', out, flags=re.I)
    return out

QUIZ_FALLBACK = ["apple","water","school","friend","study","teacher","pencil","window"]
def render_quiz(book, u):
    pool=[]; seen=set()
    for v in u.get("vocab",[]) + u.get("advanced",[]):
        w=v["w"]
        if w.lower() in seen: continue
        seen.add(w.lower()); pool.append((w, v.get("zh","")))
    for w in QUIZ_FALLBACK:
        if len(pool)>=4: break
        if w.lower() not in seen: pool.append((w,"")); seen.add(w.lower())
    n=len(pool)
    tgt=sorted(set([0, n//2, n-1]))[:3]
    L="ABCD"; qs=[]
    for qi, ti in enumerate(tgt):
        cw, czh = pool[ti]
        distr=[]; j=ti+1
        while len(distr)<3 and j<ti+1+n:
            w=pool[j % n][0]
            if w.lower()!=cw.lower() and w not in distr: distr.append(w)
            j+=1
        pos=(u["unit"]+qi) % 4
        opts=[None]*4; opts[pos]=(cw,True); di=0
        for k in range(4):
            if opts[k] is None: opts[k]=(distr[di],False); di+=1
        btn_parts = []
        for k, (w, c) in enumerate(opts):
            correct_attr = ' data-correct="1"' if c else ""
            btn_parts.append(f'<button class="quiz-opt"{correct_attr}><span class="ql">{L[k]}</span>{html.escape(w)}</button>')
        btns = "".join(btn_parts)
        prompt = f'「{html.escape(czh)}」是哪一個英文字？' if czh else f'Which one is “{html.escape(cw)}”?'
        qs.append(f'<div class="quiz"><p class="q">{qi+1}. {prompt}</p><div class="quiz-opts">{btns}</div></div>')
    return '<p class="sub-head">Quick Check · 小測驗</p>' + "".join(qs)

def render_comprehension_quiz(u):
    """English reading-comprehension MCQs from u['quiz'] = [{q, options[4], correct}].
    Correct answer is rebalanced across A/B/C/D by global question index."""
    L = "ABCD"; qs = []
    for qi, item in enumerate(u.get("quiz", [])):
        g = (u["unit"] - 1) * 3 + qi
        target = (g * 3) % 4                 # balanced, non-sequential ABCD spread
        opts = list(item["options"]); c = item["correct"]
        opts.insert(target, opts.pop(c))     # move correct option into target slot
        btns = ""
        for k, o in enumerate(opts):
            dc = ' data-correct="1"' if k == target else ''
            btns += f'<button class="quiz-opt"{dc}><span class="ql">{L[k]}</span>{html.escape(o)}</button>'
        qs.append(f'<div class="quiz"><p class="q">{qi+1}. {html.escape(item["q"])}</p><div class="quiz-opts">{btns}</div></div>')
    return '<p class="sub-head">Quick Check · 小測驗</p>' + "".join(qs)

def render_unit(book, u, photo, audio):
    """u: dict(unit,title,passage,vocab,translation,advanced). audio: dict(read,teach,eng)."""
    uid = f"b{book:02d}u{u['unit']:02d}"
    quiz_html = render_quiz(book, u)
    passage_html = _bold_kw(u["passage"], u["vocab"])
    vocab_html = "".join(
        f'<span class="vchip"><b>{html.escape(v["w"])}</b><span class="pos">({v["pos"]})</span><span class="zh">{html.escape(v["zh"])}</span>'
        f'<button class="spk" data-say="{html.escape(v["w"])}" aria-label="唸 {html.escape(v["w"])}">🔊</button></span>'
        for v in u["vocab"])
    adv_html = "".join(
        f'''<div class="adv-item"><div class="top"><b>{html.escape(a["w"])}</b><span class="pos">({a["pos"]})</span><span class="zh">{html.escape(a["zh"])}</span>
        <button class="spk" data-say="{html.escape(a["w"])}" aria-label="Say this word · 唸單字">🔊</button></div>
        <p class="eg"><button class="spk" data-say="{html.escape(a["eg"])}" aria-label="Say this example · 唸例句">🔊</button><span>{html.escape(a["eg"])}</span></p>
        <p class="eg-zh">{html.escape(_zh_tidy(a["eg_zh"]))}</p></div>''' for a in u["advanced"])
    tr = html.escape(_zh_tidy(u["translation"]))
    photo_html = f'<div class="unit-photo"><img loading="lazy" src="{photo}" alt="{html.escape(u["title"])}"></div>' if photo else ""
    teach_html = ""
    if audio.get("teach") or audio.get("eng"):
        rows = ""
        if audio.get("teach"):
            rows += f'<div class="ta">📖 Lesson walkthrough in Chinese · 課文教學（中文講解）<audio controls preload="none" src="{AUDIO_REL}/{audio["teach"]}"></audio></div>'
        if audio.get("eng"):
            rows += f'<div class="ta">🗣️ All-English walkthrough · 全英教學<audio controls preload="none" src="{AUDIO_REL}/{audio["eng"]}"></audio></div>'
        teach_html = f'<p class="sub-head">Full teaching audio · 完整教學音檔</p><div class="teach-audio">{rows}</div>'
    read_audio = f'<audio controls preload="none" src="{AUDIO_REL}/{audio["read"]}"></audio>' if audio.get("read") else ""
    pdf_link = f'<a class="unit-dl" href="{PDF_REL}/{u["pdf"]}" target="_blank" rel="noopener">⬇ PDF</a>' if u.get("pdf") else ""
    return f'''<div class="unit" id="{uid}">
  <div class="unit-head"><span class="no">{u['unit']}</span><h3>Unit {u['unit']}: {html.escape(u['title'])}</h3>{pdf_link}</div>
  <div class="unit-body">
    <div class="unit-grid">
      {photo_html}
      <div>
        <p class="passage">{passage_html}</p>
        <div class="audio-row">
          <button class="spk lg" data-say="{html.escape(u['passage'])}" aria-label="Read the passage · 朗讀課文">🔊</button>
          <span class="muted" style="font-size:.9rem">Human recording · 課文朗讀（真人）</span>{read_audio}
        </div>
        <button class="tr-toggle" data-target="{uid}-tr">Show Chinese · 顯示中文翻譯</button>
        <div class="tr-box" id="{uid}-tr">{tr}</div>
      </div>
    </div>
    <p class="sub-head">Key Words · 生字</p>
    <div class="vocab-row">{vocab_html}</div>
    <p class="sub-head">Go Further · 進階學習</p>
    <div class="adv-list">{adv_html}</div>
    {teach_html}
    {quiz_html}
  </div>
</div>'''

BASIC_AUDIO_REL = "https://github.com/lukelin7429/twrses/releases/download/basic-audio"
BASIC_PDF_REL = "https://github.com/lukelin7429/twrses/releases/download/basic-pdf"
INTER_AUDIO_REL = "https://github.com/lukelin7429/twrses/releases/download/intermediate-audio"
INTER_PDF_REL = "https://github.com/lukelin7429/twrses/releases/download/intermediate-pdf"
ADV_AUDIO_REL = "https://github.com/lukelin7429/twrses/releases/download/advanced-audio"
ADV_PDF_REL = "https://github.com/lukelin7429/twrses/releases/download/advanced-pdf"
CONV_AUDIO_REL = "https://github.com/lukelin7429/twrses/releases/download/conversation-audio"
CONV_PDF_REL = "https://github.com/lukelin7429/twrses/releases/download/conversation-pdf"
DESC_AUDIO_REL = "https://github.com/lukelin7429/twrses/releases/download/description-audio"
DESC_PDF_REL = "https://github.com/lukelin7429/twrses/releases/download/description-pdf"

def render_conv_unit(book, u):
    """Conversation unit: render dialogue turns as speaker bubbles, each with an
    optional per-line translation toggle (paras_zh mirrors dialogue 1:1)."""
    turns = u.get("dialogue", [])
    paras_zh = u.get("paras_zh")
    uid = f"conv-b{book:02d}u{u['unit']:02d}"
    speakers = []
    for t in turns:
        if t["speaker"] not in speakers: speakers.append(t["speaker"])
    rows = ""
    for i, t in enumerate(turns):
        side = "A" if (speakers.index(t["speaker"]) % 2 == 0) else "B"
        tr_html = ""
        if paras_zh and i < len(paras_zh):
            tid = f"{uid}-tr{i+1}"
            tr_html = (f'<div class="turn-trwrap"><button class="tr-toggle" data-target="{tid}" '
                       f'data-show="Show Chinese · 看中文翻譯" data-hide="Hide · 隱藏翻譯">Show Chinese · 看中文翻譯</button>'
                       f'<div class="tr-box" id="{tid}">{html.escape(paras_zh[i])}</div></div>')
        rows += (f'<div class="turn turn-{side}"><span class="who">{html.escape(t["speaker"])}</span>'
                 f'<p class="said"><button class="spk" data-say="{html.escape(t["line"])}" aria-label="Say this line · 唸這句">🔊</button>'
                 f'<span>{html.escape(t["line"])}</span></p>{tr_html}</div>')
    dialogue_html = f'<div class="dialogue">{rows}</div>'
    return render_basic_unit(book, u, level="conv", audio_rel=CONV_AUDIO_REL, pdf_rel=CONV_PDF_REL, body_html=dialogue_html)

def render_basic_unit(book, u, level="basic", audio_rel=BASIC_AUDIO_REL, pdf_rel=BASIC_PDF_REL, body_html=None):
    uid = f"{level}-b{book:02d}u{u['unit']:02d}"
    audio = u.get("audio") or {}
    title = html.escape(u["title"])
    photos = u.get("photos") or []
    photos_html = ('<div class="rd-photos">' + "".join(
        f'<img loading="lazy" src="{p}" alt="{title}">' for p in photos) + '</div>') if photos else ""
    _paras_zh = u.get("paras_zh")
    _tidy = lambda s: re.sub(r'(?<=[一-鿿])\s+(?=[一-鿿])', '', s)
    _para_parts = []
    for _i, p in enumerate(u.get("paras", [])):
        _para_parts.append(
            f'<p class="rd-para"><button class="spk" data-say="{html.escape(p)}" aria-label="Read this paragraph · 朗讀">🔊</button><span>{html.escape(p)}</span></p>')
        if _paras_zh and _i < len(_paras_zh):
            _tid = f"{uid}-tr{_i+1}"
            _para_parts.append(
                f'<div class="rd-trwrap"><button class="tr-toggle" data-target="{_tid}" data-show="Show Chinese · 看中文翻譯" data-hide="Hide · 隱藏翻譯">Show Chinese · 看中文翻譯</button>'
                f'<div class="tr-box" id="{_tid}">{html.escape(_tidy(_paras_zh[_i]))}</div></div>')
    paras_html = "".join(_para_parts)
    read_audio = f'<audio controls preload="none" src="{audio_rel}/{audio["read"]}"></audio>' if audio.get("read") else ""
    full_say = " ".join(u.get("paras", []))
    _has_ex = any(v.get("ex") for v in u.get("vocab", []))
    if _has_ex:
        def _pos(p): return p if p.startswith("(") else f"({p})"
        def _plain(s): return re.sub(r"<[^>]+>", "", s)
        vocab_html = "".join(
            f'<span class="vchip ex"><span class="vtop"><b>{html.escape(v["w"])}</b>'
            f'<span class="pos">{html.escape(_pos(v["pos"]))}</span><span class="zh">{html.escape(v["zh"])}</span>'
            f'<button class="spk" data-say="{html.escape(v["w"])}" aria-label="Say this word · 唸單字">🔊</button></span>'
            f'<span class="veg"><button class="spk" data-say="{html.escape(_plain(v["ex"]))}" aria-label="Say this example · 唸例句">🔊</button>'
            f'<span class="egtext"><span class="en">{v["ex"]}</span><span class="egzh">{html.escape(v["exzh"])}</span></span></span></span>'
            for v in u.get("vocab", []) if v.get("zh"))
        vgrid_class = "vocab-grid ex"
    else:
        vocab_html = "".join(
            f'<span class="vchip"><b>{html.escape(v["w"])}</b><span class="pos">({v["pos"]})</span><span class="zh">{html.escape(v["zh"])}</span>'
            f'<button class="spk" data-say="{html.escape(v["w"])}" aria-label="Say this word · 唸">🔊</button></span>'
            for v in u.get("vocab", []) if v.get("zh"))
        vgrid_class = "vocab-grid"
    qs = u.get("questions", []); ans = u.get("answers", [])
    qa_html = ""
    for i, q in enumerate(qs):
        a = ans[i] if i < len(ans) else ""
        aid = f"{uid}-a{i}"
        ans_block = (f'<button class="tr-toggle" data-target="{aid}" data-show="Show answer · 看參考答案" data-hide="Hide · 隱藏參考答案">Show answer · 看參考答案</button><div class="tr-box" id="{aid}">{html.escape(a)}</div>') if a else ""
        qa_html += f'''<div class="qa"><p class="q"><button class="spk" data-say="{html.escape(q)}" aria-label="Say this question · 唸題目">🔊</button><span>{html.escape(q)}</span></p>{ans_block}</div>'''
    tr = html.escape(re.sub(r'(?<=[一-鿿])\s+(?=[一-鿿])','', u.get("translation","")))
    teach_html = ""
    if audio.get("teach") or audio.get("eng"):
        rows=""
        if audio.get("teach"): rows+=f'<div class="ta">📖 Lesson walkthrough in Chinese · 課文教學（中文講解）<audio controls preload="none" src="{audio_rel}/{audio["teach"]}"></audio></div>'
        if audio.get("eng"): rows+=f'<div class="ta">🗣️ All-English walkthrough · 全英教學<audio controls preload="none" src="{audio_rel}/{audio["eng"]}"></audio></div>'
        teach_html=f'<p class="sub-head">Full teaching audio · 完整教學音檔</p><div class="teach-audio">{rows}</div>'
    pdf_link = f'<a class="unit-dl" href="{pdf_rel}/{u["pdf"]}" target="_blank" rel="noopener">⬇ PDF</a>' if u.get("pdf") else ""
    tr_block = (f'<button class="tr-toggle" data-target="{uid}-tr">Show Chinese · 顯示中文翻譯</button><div class="tr-box" id="{uid}-tr">{tr}</div>') if (tr and not _paras_zh) else ""
    qa_section = (f'<p class="sub-head">Questions · 閱讀理解</p><div class="qa-list">{qa_html}</div>') if qa_html else ""
    vocab_section = (f'<p class="sub-head">Words &amp; Phrases · 生字及片語</p><div class="{vgrid_class}">{vocab_html}</div>') if vocab_html else ""
    if u.get("quiz"):
        quiz_html = render_comprehension_quiz(u)
    else:
        quiz_html = render_quiz(book, u) if len([v for v in u.get("vocab", []) if v.get("zh")]) >= 4 else ""
    audio_label = "Human recording · 課文朗讀（真人）" if audio.get("read") else "Read aloud · 課文朗讀"
    return f'''<div class="unit" id="{uid}">
  <div class="unit-head"><span class="no">{u['unit']}</span><h3>Unit {u['unit']}: {title}</h3>{pdf_link}</div>
  <div class="unit-body">
    {photos_html}
    {body_html if body_html is not None else f'<div class="passage-block">{paras_html}</div>'}
    <div class="audio-row"><button class="spk lg" data-say="{html.escape(full_say)}" aria-label="Read the whole text · 朗讀全文">🔊</button><span class="muted" style="font-size:.9rem">{audio_label}</span>{read_audio}</div>
    {tr_block}
    {qa_section}
    {vocab_section}
    {teach_html}
    {quiz_html}
  </div>
</div>'''

def build_basic_hub():
    items=[]
    done = sorted(int(k) for k in BASIC)
    for b in done:
        units=BASIC.get(str(b))
        if units:
            items.append((f"/resources/booklets/basic/book{b}/", "📘", f"Book {b}", f"{len(units)} lessons · 共 {len(units)} 課"))
        else:
            items.append((None, "📘", f"Book {b}", "Coming soon · 製作中", True))
    body = f'''
{page_hero("Basic Reading · 初級閱讀", "讀懂一篇文章", "Read a passage, hear it read by a real voice, answer comprehension questions, study the words, then take a quick quiz.<br><span class='muted'>進階的閱讀練習：讀文章、聽真人朗讀、想想閱讀理解問題、學生字片語，再做個小測驗。</span>", back=MCC_LIBRARY)}
<section class="section"><div class="wrap">{fcard_grid(items, cta="Start reading · 開始閱讀")}
</div></section>
'''
    write("/resources/booklets/basic/", layout("/resources/booklets/basic/", "初級閱讀",
        "人師閱讀教材·初級閱讀（Basic Reading）：長文閱讀、真人朗讀、閱讀理解問答、生字片語、小測驗。", body, "resources"))

def _unit_nav(units, level="basic", book=0):
    """Sticky jump-nav: one chip per unit, links to that unit's anchor.
    level="" targets everyday's unprefixed anchor ids (b01u01, not everyday-b01u01)."""
    if len(units) < 2:
        return ""
    prefix = f"{level}-" if level else ""
    chips = "".join(
        f'<a class="unit-nav-link" href="#{prefix}b{book:02d}u{u["unit"]:02d}">'
        f'<b>{u["unit"]}</b><span>{html.escape(u["title"])}</span></a>'
        for u in units)
    return (f'<nav class="unit-nav" aria-label="Jump to unit · 單元導覽"><div class="wrap">'
            f'<span class="unit-nav-label">Jump to unit · 跳到單元</span>'
            f'<div class="unit-nav-track">{chips}</div></div></nav>')

def build_basic_book(b):
    units = sorted(BASIC.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u) for u in units)
    reading_step = "讀文章（真人朗讀）" if any((u.get("audio") or {}).get("read") for u in units) else "讀文章"
    body = f'''
{page_hero(f"Basic Reading · Book {b} · 初級閱讀", f"Basic Reading — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", f"Each lesson: picture → read the text (human recording) → comprehension → words &amp; phrases → quick quiz.<br><span class='muted'>每課：看圖 → {reading_step} → 閱讀理解 → 生字片語 → 小測驗。</span>", back=MCC_LIBRARY)}
{_unit_nav(units, "basic", b)}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊{len(units)} lessons in this booklet · 本冊共 {len(units)} 課。</p>
</div></section>
'''
    # Only books whose clips have actually been generated get the attribute —
    # naming a manifest that does not exist would just 404 on every page load.
    say_slug = f"basic-book{b}"
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(f"/resources/booklets/basic/book{b}/", layout(f"/resources/booklets/basic/book{b}/",
        f"初級閱讀 Book {b}", f"人師閱讀教材·初級閱讀第{b}冊，{len(units)} 課互動閱讀。", body, "resources",
        say_manifest=say_slug if has_clips else None))

def build_inter_hub():
    done = sorted(int(k) for k in INTERMEDIATE)
    items=[(f"/resources/booklets/intermediate/book{b}/", "📗", f"Book {b}", f"{len(INTERMEDIATE[str(b)])} lessons · 共 {len(INTERMEDIATE[str(b)])} 課")
           for b in done]
    body = f'''
{page_hero("Intermediate Reading · 中級閱讀", "讀進一步的文章", "Longer passages that widen vocabulary and sentence patterns, with a human recording and a Chinese translation beside every paragraph.<br><span class='muted'>更深入的閱讀練習：讀文章、聽真人朗讀、想想閱讀理解問題、學生字片語，再做個小測驗。</span>", back=MCC_LIBRARY)}
<section class="section"><div class="wrap">{fcard_grid(items, cta="Start reading · 開始閱讀")}
</div></section>
'''
    write("/resources/booklets/intermediate/", layout("/resources/booklets/intermediate/", "中級閱讀",
        "人師閱讀教材·中級閱讀（Intermediate Reading）：長文閱讀、真人朗讀、閱讀理解問答、生字片語、小測驗。", body, "resources"))

def build_inter_book(b):
    units = sorted(INTERMEDIATE.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u, level="inter", audio_rel=INTER_AUDIO_REL, pdf_rel=INTER_PDF_REL) for u in units)
    body = f'''
{page_hero(f"Intermediate Reading · Book {b} · 中級閱讀", f"Intermediate Reading — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "Each lesson: picture → read the text (human recording) → comprehension → words &amp; phrases → quick quiz.<br><span class='muted'>每課：看圖 → 讀文章（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。</span>", back=MCC_LIBRARY)}
{_unit_nav(units, "inter", b)}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊{len(units)} lessons in this booklet · 本冊共 {len(units)} 課。</p>
</div></section>
'''
    # Only books whose clips have actually been generated get the attribute —
    # naming a manifest that does not exist would just 404 on every page load.
    say_slug = f"intermediate-book{b}"
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(f"/resources/booklets/intermediate/book{b}/", layout(f"/resources/booklets/intermediate/book{b}/",
        f"中級閱讀 Book {b}", f"人師閱讀教材·中級閱讀第{b}冊，{len(units)} 課互動閱讀。", body, "resources",
        say_manifest=say_slug if has_clips else None))

def build_adv_hub():
    items=[(f"/resources/booklets/advanced/book{b}/", "📕", f"Book {b}", f"{len(ADVANCED[str(b)])} lessons · 共 {len(ADVANCED[str(b)])} 課")
           for b in sorted(int(k) for k in ADVANCED)]
    body = f'''
{page_hero("Advanced Reading · 高級閱讀", "挑戰更長的文章", "Full-length articles for readers ready to be challenged — the last step before reading in the wild.<br><span class='muted'>進階讀者的閱讀練習：讀較長的文章、聽真人朗讀、學進階生字片語，再做個小測驗。</span>", back=MCC_LIBRARY)}
<section class="section"><div class="wrap">{fcard_grid(items, cta="Start reading · 開始閱讀")}
</div></section>
'''
    write("/resources/booklets/advanced/", layout("/resources/booklets/advanced/", "高級閱讀",
        "人師閱讀教材·高級閱讀（Advanced Reading）：長文閱讀、真人朗讀、生字片語、小測驗。", body, "resources"))

def build_adv_book(b):
    units = sorted(ADVANCED.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u, level="adv", audio_rel=ADV_AUDIO_REL, pdf_rel=ADV_PDF_REL) for u in units)
    body = f'''
{page_hero(f"Advanced Reading · Book {b} · 高級閱讀", f"Advanced Reading — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "Each lesson: picture → read the text (human recording) → words &amp; phrases → quick quiz.<br><span class='muted'>每課：看圖 → 讀文章（真人朗讀）→ 生字片語 → 小測驗。</span>", back=MCC_LIBRARY)}
{_unit_nav(units, "adv", b)}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊{len(units)} lessons in this booklet · 本冊共 {len(units)} 課。</p>
</div></section>
'''
    # Only books whose clips have actually been generated get the attribute —
    # naming a manifest that does not exist would just 404 on every page load.
    say_slug = f"advanced-book{b}"
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(f"/resources/booklets/advanced/book{b}/", layout(f"/resources/booklets/advanced/book{b}/",
        f"高級閱讀 Book {b}", f"人師閱讀教材·高級閱讀第{b}冊，{len(units)} 課互動閱讀。", body, "resources",
        say_manifest=say_slug if has_clips else None))

def build_conv_hub():
    items=[(f"/resources/booklets/conversation/book{b}/", "💬", f"Book {b}", f"{len(CONVERSATION[str(b)])} lessons · 共 {len(CONVERSATION[str(b)])} 課")
           for b in sorted(int(k) for k in CONVERSATION)]
    body = f'''
{page_hero("Practical Conversation · 實用英語會話", "開口說，最實用", "Everyday dialogues recorded line by line, so students can shadow a native speaker one turn at a time.<br><span class='muted'>貼近生活的英語對話：聽真人朗讀、跟著逐句練習、學生字片語，再做個小測驗。</span>", back=MCC_LIBRARY)}
<section class="section"><div class="wrap">{fcard_grid(items, cta="Start practising · 開始練習")}
<p class="muted rvl" style="margin-top:1.5rem">＊Book 5 以後內容整理中。</p></div></section>
'''
    write("/resources/booklets/conversation/", layout("/resources/booklets/conversation/", "實用英語會話",
        "人師閱讀教材·實用英語會話（Practical Conversation）：生活對話、真人朗讀、生字片語、小測驗。", body, "resources"))

def build_conv_book(b):
    units = sorted(CONVERSATION.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_conv_unit(b, u) for u in units)
    body = f'''
{page_hero(f"Practical Conversation · Book {b} · 實用英語會話", f"Practical Conversation — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "Each lesson: picture → read the dialogue (human recording) → comprehension → words &amp; phrases → quick quiz.<br><span class='muted'>每課：看圖 → 讀對話（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。</span>", back=MCC_LIBRARY)}
{_unit_nav(units, "conv", b)}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊{len(units)} lessons in this booklet · 本冊共 {len(units)} 課。</p>
</div></section>
'''
    # Only books whose clips have actually been generated get the attribute —
    # naming a manifest that does not exist would just 404 on every page load.
    say_slug = f"conversation-book{b}"
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(f"/resources/booklets/conversation/book{b}/", layout(f"/resources/booklets/conversation/book{b}/",
        f"實用英語會話 Book {b}", f"人師閱讀教材·實用英語會話第{b}冊，{len(units)} 課互動對話。", body, "resources",
        say_manifest=say_slug if has_clips else None))

def build_desc_hub():
    items=[(f"/resources/booklets/description/book{b}/", "🖼️", f"Book {b}", f"{len(DESCRIPTION[str(b)])} lessons · 共 {len(DESCRIPTION[str(b)])} 課")
           for b in sorted(int(k) for k in DESCRIPTION)]
    body = f'''
{page_hero("Picture Description · 看圖描述", "看著圖，說出來", "Look at the picture, say what you see — the speaking and writing muscle that exams and real life both ask for.<br><span class='muted'>看圖學描述：看圖片、讀描述短文、聽真人朗讀、學生字片語，再做個小測驗。</span>", back=MCC_LIBRARY)}
<section class="section"><div class="wrap">{fcard_grid(items, cta="Start learning · 開始學習")}
<p class="muted rvl" style="margin-top:1.5rem">＊Book 5 以後內容整理中。</p></div></section>
'''
    write("/resources/booklets/description/", layout("/resources/booklets/description/", "看圖描述",
        "人師閱讀教材·看圖描述（Picture Description）：看圖學描述、真人朗讀、生字片語、小測驗。", body, "resources"))

def build_desc_book(b):
    units = sorted(DESCRIPTION.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u, level="desc", audio_rel=DESC_AUDIO_REL, pdf_rel=DESC_PDF_REL) for u in units)
    body = f'''
{page_hero(f"Picture Description · Book {b} · 看圖描述", f"Picture Description — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "Each lesson: picture → read the description (human recording) → comprehension → words &amp; phrases → quick quiz.<br><span class='muted'>每課：看圖 → 讀描述（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。</span>", back=MCC_LIBRARY)}
{_unit_nav(units, "desc", b)}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊{len(units)} lessons in this booklet · 本冊共 {len(units)} 課。</p>
</div></section>
'''
    # Only books whose clips have actually been generated get the attribute —
    # naming a manifest that does not exist would just 404 on every page load.
    say_slug = f"description-book{b}"
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(f"/resources/booklets/description/book{b}/", layout(f"/resources/booklets/description/book{b}/",
        f"看圖描述 Book {b}", f"人師閱讀教材·看圖描述第{b}冊，{len(units)} 課互動學習。", body, "resources",
        say_manifest=say_slug if has_clips else None))

EVERYDAY_META = {
    "1":("Book 1","校園與日常生活","🦷"), "2":("Book 2","生活情境","🏠"),
    "3":("Book 3","社區與外出","🏙️"), "4":("Book 4","自然與健康","🌿"),
    "5":("Book 5","興趣與活動","🎨"), "6":("Book 6","世界與未來","🌏"),
}
_CN_NUM = "零一二三四五六"

def build_everyday_hub():
    items=[]
    for b in ["1","2","3","4","5","6"]:
        title, sub, ico = EVERYDAY_META[b]
        units = EVERYDAY.get(b)
        if units:
            items.append((f"/resources/booklets/everyday/book{b}/", ico, title, f"{sub}　·　{len(units)} lessons · 共 {len(units)} 課"))
        else:
            items.append((None, ico, title, f"{sub}　·　Coming soon · 製作中", True))
    body = f'''
{page_hero("Everyday Topics · 基礎英語", "從生活，開始學英語", "Six thematic booklets covering the most basic everyday topics — where a beginner starts.<br><span class='muted'>六冊主題式英語教材：看圖、讀短文、聽真人朗讀、學生字與進階用法，再做個小測驗。</span>", back=MCC_LIBRARY)}
<section class="section"><div class="wrap">{fcard_grid(items, cta="Start reading · 開始閱讀")}</div></section>
'''
    write("/resources/booklets/everyday/", layout("/resources/booklets/everyday/", "基礎英語",
        "人師閱讀教材·基礎英語（Everyday Topics）六冊主題式英語自學：短文、真人朗讀、生字與進階學習、小測驗。", body, "resources"))

def build_everyday_book(b):
    units = sorted(EVERYDAY.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_unit(b, u, u.get("photo"), u.get("audio") or {}) for u in units)
    cn = _CN_NUM[b] if b < len(_CN_NUM) else str(b)
    body = f'''
{page_hero(f"Everyday Topics · Book {b} · 基礎英語", f"Everyday Topics — 第{cn}冊", "Each lesson: picture → read the short text (human recording) → words &amp; Go Further → quick quiz.<br><span class='muted'>每課：看圖 → 讀短文（真人朗讀）→ 生字與進階學習 → 小測驗。</span>", back=MCC_LIBRARY)}
{_unit_nav(units, "", b)}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊{len(units)} lessons in this booklet · 本冊共 {len(units)} 課。</p>
</div></section>
'''
    # Only books whose clips have actually been generated get the attribute —
    # naming a manifest that does not exist would just 404 on every page load.
    say_slug = f"everyday-book{b}"
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(f"/resources/booklets/everyday/book{b}/", layout(f"/resources/booklets/everyday/book{b}/",
        f"基礎英語 Book {b}", f"人師閱讀教材·基礎英語第{cn}冊，{len(units)} 課互動閱讀（短文／真人朗讀／生字／進階學習／小測驗）。", body, "resources",
        say_manifest=say_slug if has_clips else None))

def build_resources_hub():
    hub_page("/resources/", "resources", "Learning Resources · 英語學習資源",
        "免費自學，永不停止",
        "Never stop learning, because life never stops teaching. Sorted by what you want to work on \u2014 "
        "reading, foundations, speaking, and everyday English. All free."
        "<br><span class='muted'>依學習目的分類：閱讀、基礎、聽說、生活英語，全部免費開放。</span>",
        [
            ("/resources/reading/", "📖", "Reading & Classics · 閱讀與經典",
             "Graded readers, Animal Farm, Chinese classics and periodicals. 閱讀教材、經典名著、中文經典選讀與英語期刊。"),
            ("/resources/basics/", "📐", "Foundations · 打好基礎",
             "Phonics, sentence building, grammar and sentence analysis. 自然發音、造句、文法與句型分析。"),
            ("/resources/speaking/", "🗣️", "Listening & Speaking · 聽說與會話",
             "GEPT speaking practice, one-minute English and campus dialogues. GEPT 口說、一分鐘英語與校園情境會話。"),
            ("/resources/life/", "🌱", "Everyday English · 生活英語",
             "Slang, current events, local programs and short lessons. 俚語、時事、在地英語節目與學習短片。"),
        ],
        cta="Open · 前往",
        desc="Never stop learning. Free English resources sorted by purpose. 依學習目的分類的免費英語學習資源。")

def redirect(from_path, to_path, title="頁面已搬移"):
    """寫一個 meta-refresh 轉址頁，避免舊網址 404。"""
    body = f'''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta http-equiv="refresh" content="0; url={BASE}{to_path}">
<link rel="canonical" href="{BASE}{to_path}">
<meta name="robots" content="noindex">
<title>{title}</title></head>
<body style="font-family:system-ui;padding:3rem;text-align:center">
<p>此頁已搬移，若未自動跳轉請點 <a href="{BASE}{to_path}">這裡</a>。</p>
</body></html>'''
    fp = os.path.join(ROOT, from_path.strip("/"), "index.html")
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(fp, "w", encoding="utf-8") as f:
        f.write(body)

# 依「學習目的」分類的四個資源 hub（各頁仍沿用既有 leaf 網址）
def build_reading_hub():
    # 這一頁要給外籍老師用，所以標題、導言與每一張卡片都是雙語，
    # 格式與各分冊頁的 hero 一致（英文在前、中文在後）。
    hub_page("/resources/reading/", "resources", "Reading &amp; Classics · 閱讀與經典",
        "讀進去，世界就打開了",
        "From first words to the classics \u2014 graded reading with English and Chinese side by side."
        "<br><span class='muted'>從基礎讀物到經典名著——循序漸進的中英對照閱讀。</span>",
        [
            ("/resources/booklets/everyday/", "☀️", "Everyday Topics · 基礎英語",
             "The most basic everyday themes, in six booklets. 最基礎的日常英語主題，共六冊。"),
            ("/resources/booklets/basic/", "🌱", "Basic Reading · 初級閱讀",
             "Short passages for readers just starting out. 適合剛起步的讀者。"),
            ("/resources/booklets/intermediate/", "🌿", "Intermediate Reading · 中級閱讀",
             "Longer passages that widen vocabulary and sentence patterns. 進一步擴充字彙與句型。"),
            ("/resources/booklets/advanced/", "🌳", "Advanced Reading · 高級閱讀",
             "Full-length articles for readers ready to be challenged. 挑戰較長篇的英語文章。"),
            ("/resources/booklets/conversation/", "💬", "Practical Conversation · 實用英語會話",
             "Everyday dialogues, recorded line by line. 日常生活的實用對話，逐句真人朗讀。"),
            ("/resources/booklets/description/", "🖼️", "Picture Description · 看圖描述",
             "Look at the picture and say what you see. 看圖學描述，練口說與寫作。"),
            ("/resources/classes/animal-farm/", "🐖", "Animal Farm · 動物農莊",
             "A guided reading of Orwell's novel. 經典名著《Animal Farm》導讀。"),
            ("/resources/classes/poetry/", "📜", "English Poetry · 名詩導讀",
             "English and American poems with Chinese and stanza-by-stanza notes. 英美經典詩作中英對照與逐節導讀。"),
            ("/resources/classes/tang-poetry/", "🏮", "Tang Poetry · 唐詩選讀",
             "Tang poems line by line in English, with notes. 唐詩中英對照與逐句導讀。"),
            ("/resources/classes/lunyu/", "📖", "The Analects · 論語選讀",
             "Confucius chapter by chapter, with two public-domain translations beside ours. 論語中英對照，每章附兩家公版英譯。"),
            ("/resources/classes/guwen/", "📜", "Classical Chinese Prose · 古文選讀",
             "Complete essays in English and Chinese, with English vocabulary and a reading check. 古文名篇全文中英對照，附英文生字與理解測驗。"),
            ("/resources/classes/zhongyi/", "☯️", "TCM Wellness · 中醫養生",
             "Read Chinese medicine in English: vocabulary and a quiz in every lesson. 用英文讀懂中醫養生，每課附生字與小測驗。"),
            ("/resources/classes/astronomy/", "🌙", "Astronomy · 天文教育",
             "Read about the sky in English, with 3D models you can turn. 用英文讀懂天文，每課附可以親手旋轉的 3D 模型。"),
            ("/resources/classes/human-body/", "🦴", "The Human Body · 人體探索",
             "Read how your body works in English, with 3D models and measurements you take on yourself. 用英文讀懂身體，每課附 3D 模型與親身測量。"),
            ("/resources/classes/how-things-work/", "🔋", "How Things Work · 萬物原理",
             "Everyday questions with surprising answers, explained in English with 3D models. 生活裡的科學問題，用英文讀懂，再用 3D 模型看它怎麼運作。"),
            ("/resources/classes/semiconductors/", "💿", "Chips and Semiconductors · 晶片與半導體",
             "What is inside a chip? From sand to silicon to the chips behind AI, in English with 3D models. 晶片裡有什麼？從沙子、矽到 AI 晶片，用英文讀懂，再用 3D 模型看清楚。"),
            ("/resources/grandfather/", "🌅", "Grandfather · 落日餘暉",
             "Thirty chapters of life wisdom by Leon La Couvée, in English and Chinese. 三十章人生智慧，中英對照。"),
            ("/resources/periodicals/", "📰", "Periodicals · 英語期刊",
             "Archives of MCC's bilingual magazines and the GEPT periodical. 明航心鄉土情、明航雙語學園與全民英語期刊典藏。"),
        ],
        cta="Open · 前往",
        desc="From first words to the classics — graded bilingual reading. 從基礎讀物到經典名著的中英對照閱讀。")

def build_basics_hub():
    hub_page("/resources/basics/", "resources", "Foundations · 打好基礎",
        "地基穩了，才走得遠",
        "Phonics, sentence building, grammar and sentence analysis \u2014 the groundwork English is built on."
        "<br><span class='muted'>自然發音、造句、文法與句型分析——把英語的地基打穩。</span>",
        [
            ("/resources/videos/phonics/", "🔤", "Phonics · 自然發音",
             "Build English from the sounds up. 從發音規則打好英語基礎。"),
            ("/resources/videos/sentences/", "✍️", "Sentence Building · 基礎英語造句篇",
             "Learn to build a sentence from nothing. 從零開始學會造句。"),
            ("/resources/classes/grammar/", "📐", "Grammar · 基礎文法",
             "From parts of speech to tenses. 從詞性到時態，打好文法地基。"),
            ("/resources/videos/analysis/", "🧩", "Sentence Analysis · 英語句型分析",
             "Take a sentence apart and see how the long ones work (classic version included). 拆解句子結構，看懂長難句（含經典版）。"),
        ],
        cta="Open · 前往",
        desc="Phonics, sentence building, grammar and sentence analysis. 自然發音、造句、文法與句型分析。")

def build_speaking_hub():
    hub_page("/resources/speaking/", "resources", "Listening &amp; Speaking · 聽說與會話",
        "開口，是學會的開始",
        "GEPT speaking practice, one-minute English and campus dialogues \u2014 train the ear, then dare to speak."
        "<br><span class='muted'>GEPT 口說、一分鐘英語與校園情境會話——練聽力、敢開口。</span>",
        [
            ("/resources/videos/gept-basic/", "🗣️", "GEPT Elementary Speaking · 初級口說訓練",
             "Practice for the GEPT elementary speaking test. GEPT 初級口說題型練習。"),
            ("/resources/videos/gept-intermediate/", "🎙️", "GEPT Intermediate Speaking · 中級口說訓練",
             "Practice for the GEPT intermediate speaking test. GEPT 中級口說題型練習。"),
            ("/resources/videos/one-min/", "⏱️", "One-Minute English · 一分鐘英語教室",
             "One minute a day, one topic at a time. 每天一分鐘，輕鬆學英語。"),
            ("/resources/videos/travel/", "🗽", "One-Minute English: USA · 一分鐘英語-美國篇",
             "Tour the United States and learn a topic a minute. 跟著鏡頭遊覽美國，一分鐘學一個英語主題。"),
            ("/resources/videos/cien-school/", "🏫", "CIEN Campus English · CIEN 校園英語",
             "English conversation in campus situations. 校園情境的英語會話。"),
        ],
        cta="Open · 前往",
        desc="GEPT speaking practice, one-minute English and campus dialogues. GEPT 口說、一分鐘英語與校園情境會話。")

def build_life_hub():
    hub_page("/resources/life/", "resources", "Everyday English · 生活英語",
        "英語，就在生活裡",
        "Slang, current events, local programs and short lessons \u2014 English worked into daily life."
        "<br><span class='muted'>俚語、時事、在地英語節目與學習短片——把英語融進日常。</span>",
        [
            ("/resources/videos/slang/", "💬", "One-Minute Slang · 一分鐘俚語",
             "Native English slang, one minute at a time. 道地英語俚語輕鬆學。"),
            ("/resources/videos/current-events/", "🗞️", "English Through the News · 看時事學英文",
             "Practical English drawn from current events. 從新聞時事學習實用英語。"),
            ("/resources/videos/e-vision/", "📺", "Changhua E-Vision English · 彰化 E 視界英語教室",
             "A locally produced English teaching program. 在地製作的英語教學節目。"),
            ("/resources/videos/short/", "🎬", "Short Lessons · 英語學習短片",
             "A selection of short English learning videos. 精選英語學習短片。"),
        ],
        cta="Open · 前往",
        desc="Slang, current events, local programs and short lessons. 俚語、時事、在地英語節目與學習短片。")

VIDEO_LEAVES = [
    ("/resources/videos/travel/", "一分鐘英語-美國篇", "跟著鏡頭遊覽美國，一分鐘學一個英語主題。", "/E-resources/E-videos/travel"),
    ("/resources/videos/gept-basic/", "初級口說訓練", "GEPT 初級口說題型練習。", "/E-resources/E-videos/GEPT-Basic"),
    ("/resources/videos/gept-intermediate/", "中級口說訓練", "GEPT 中級口說題型練習。", "/E-resources/E-videos/GEPT-Intermediate"),
    ("/resources/videos/phonics/", "自然發音", "從發音規則打好英語基礎。", "/E-resources/E-videos/phonics"),
    ("/resources/videos/sentences/", "基礎英語造句篇", "從零開始學會造句。", "/E-resources/E-videos/B-sentences"),
    ("/resources/videos/one-min/", "一分鐘英語教室", "每天一分鐘，輕鬆學英語。", "/E-resources/E-videos/One-Min-class"),
    ("/resources/videos/analysis/", "英語句型分析（新）", "拆解句子結構，看懂長難句。", "/E-resources/E-videos/analysis"),
    ("/resources/videos/current-events/", "看時事學英文", "從新聞時事學習實用英語。", "/E-resources/E-videos/E-news"),
    ("/resources/videos/e-vision/", "彰化 E 視界英語教室", "在地製作的英語教學節目。", "/E-resources/E-videos/E-vision"),
    ("/resources/videos/cien-school/", "CIEN 校園英語", "校園情境的英語會話。", "/E-resources/E-videos/CIEN-school"),
    ("/resources/videos/slang/", "一分鐘俚語", "道地英語俚語輕鬆學。", "/E-resources/E-videos/slang"),
    ("/resources/videos/short/", "英語學習短片", "精選英語學習短片。", "/E-resources/E-videos/short-videos"),
]

# ---- 真影片分集系列頁（資料驅動，data/<series>.json）----
def _load_series(name):
    p = os.path.join(ROOT, "data", f"{name}.json")
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else None

VIDEO_SERIES = {}
for _s in ("evision", "sentences", "analysis", "gept-basic", "gept-intermediate", "onemin", "enactus-ps", "enactus-business", "news-oneminute", "news-changhua", "news-special", "grandfather", "phonics", "interviews"):
    _d = _load_series(_s)
    if _d:
        VIDEO_SERIES[_d["path"]] = _d

def _ep_card(data, e, badge):
    """One ordered episode card (thumbnail + EP badge + topic + zh + date)."""
    v = e["id"]
    thumb = f"https://i.ytimg.com/vi/{v}/hqdefault.jpg"
    url = f"https://www.youtube.com/watch?v={v}"
    dur = e.get("dur") or _fmt_dur(VIDEO_META.get(v, {}).get("duration"))
    date = _fmt_date(e.get("date") or VIDEO_META.get(v, {}).get("date"))
    title = html.escape(f'{data["title"]}：{e["topic"]}')
    dur_badge = f'<span class="vdur">{dur}</span>' if dur else ""
    date_html = f'<span class="vdate">{date}</span>' if date else ""
    zh_html = f'<span class="ep-zh">{html.escape(e["zh"])}</span>' if e.get("zh") else ""
    return f'''<a class="vcard ep-card" href="{url}" data-yt="{v}" title="{title}">
  <span class="vthumb"><img loading="lazy" src="{thumb}" alt="{html.escape(e["topic"])}">{dur_badge}<span class="vep">{badge}{e["ep"]}</span></span>
  <span class="vmeta"><span class="ep-topic">{html.escape(e["topic"])}</span>{zh_html}{date_html}</span>
</a>'''

def _ep_grid(data):
    """Episode grid rendered in episode order (sorted by ep number)."""
    badge = data.get("badge", "EP")
    eps = sorted(data["episodes"], key=lambda e: e.get("ep", 0))
    cards = [_ep_card(data, e, badge) for e in eps]
    return '<div class="video-grid stagger ep-grid">\n' + "\n".join(cards) + "\n</div>"

def build_series(data):
    pills = "".join(f'<span class="pill">{p}</span>' for p in data.get("pills", []))
    grid = _ep_grid(data)
    body = f'''
{page_hero(data.get("eyebrow", "英語學習影片"), data["title"], data.get("lead", ""))}
<section class="section"><div class="wrap">
  <div class="flex rvl" style="justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.4rem">
    <div class="pills">{pills}</div>
  </div>
  <p class="lead rvl" style="max-width:68ch;margin-bottom:2rem">{data["intro"]}</p>
  {grid}
</div></section>
'''
    write(data["path"], layout(data["path"], data["title"], data.get("meta_desc", data["intro"][:120]), body, data.get("active", "resources")))

def build_classes_hub():
    """⚠ 目前沒有任何地方呼叫這個函式——/resources/classes/ 是轉址殘根。
    內容留著備查，但改它不會影響線上任何一頁。"""
    children = [
        ("/resources/classes/grammar/", "📐", "基礎文法", "從詞性到時態，打好文法地基。"),
        ("/resources/classes/sentence-analysis/", "🔍", "英語句型分析（舊）", "經典句型逐句拆解。"),
        ("/resources/classes/animal-farm/", "🐖", "動物農莊", "經典名著《Animal Farm》導讀。"),
        ("/resources/classes/poetry/", "📜", "名詩導讀", "英美經典詩作中英對照與逐節導讀。"),
        ("/resources/classes/tang-poetry/", "🏮", "唐詩選讀", "唐詩中英對照與逐句導讀：讀懂唐詩，順便學英文。"),
        ("/resources/classes/lunyu/", "📖", "論語選讀", "論語中英對照與逐句導讀，每章附兩家公版英譯。"),
        ("/resources/classes/guwen/", "📜", "古文選讀", "古文名篇全文中英對照與逐段導讀，附章法分析。"),
    ]
    hub_page("/resources/classes/", "resources", "人師英語課程",
        "有系統地，把英語學起來", "文法、字根、文章結構與經典名著——循序漸進的英語課程。", children)

CLASS_LEAVES = [
    ("/resources/classes/grammar/", "基礎文法", "從詞性到時態，打好文法地基。", "/E-resources/E-classes/grammar"),
    ("/resources/classes/sentence-analysis/", "英語句型分析（經典版）", "經典句型逐句拆解，與新版句型分析互補。", "/E-resources/E-classes/sentence-analysis2"),
    ("/resources/classes/animal-farm/", "動物農莊", "經典名著《Animal Farm》導讀。", "/E-resources/E-classes/animal-farm"),
]

# ---- 基礎文法（資料驅動精修頁，data/grammar.json）----
_gj = os.path.join(ROOT, "data", "grammar.json")
GRAMMAR = json.load(open(_gj, encoding="utf-8")) if os.path.exists(_gj) else None
_afj = os.path.join(ROOT, "data", "animal-farm.json")
ANIMAL_FARM = json.load(open(_afj, encoding="utf-8")) if os.path.exists(_afj) else None
_pmj = os.path.join(ROOT, "data", "poems.json")
POEMS = json.load(open(_pmj, encoding="utf-8")) if os.path.exists(_pmj) else None
_tsj = os.path.join(ROOT, "data", "tangshi.json")
TANGSHI = json.load(open(_tsj, encoding="utf-8")) if os.path.exists(_tsj) else None
_lyj = os.path.join(ROOT, "data", "lunyu.json")
LUNYU = json.load(open(_lyj, encoding="utf-8")) if os.path.exists(_lyj) else None
_gwj = os.path.join(ROOT, "data", "guwen.json")
GUWEN = json.load(open(_gwj, encoding="utf-8")) if os.path.exists(_gwj) else None
_zyj = os.path.join(ROOT, "data", "zhongyi.json")
ZHONGYI = json.load(open(_zyj, encoding="utf-8")) if os.path.exists(_zyj) else None
_asj = os.path.join(ROOT, "data", "astronomy.json")
ASTRO = json.load(open(_asj, encoding="utf-8")) if os.path.exists(_asj) else None
_hbj = os.path.join(ROOT, "data", "human-body.json")
BODY = json.load(open(_hbj, encoding="utf-8")) if os.path.exists(_hbj) else None
_htwj = os.path.join(ROOT, "data", "how-things-work.json")
HTW = json.load(open(_htwj, encoding="utf-8")) if os.path.exists(_htwj) else None

_EN_SPAN = re.compile(r"[A-Za-z][A-Za-z0-9 ,.'’?!():;/+\-]*")
def _say_en(line):
    """從課文行抽出可朗讀的英文句子；無則回傳空字串。"""
    spans = [m.strip(" /") for m in _EN_SPAN.findall(line)]
    good = [s for s in spans if re.search(r"[a-z]", s) and " " in s.strip() and len(s) >= 8]
    txt = " ".join(good).strip()
    return txt if len(txt) >= 8 else ""

def _gnote(line):
    s = line.strip()
    is_sub = bool(re.match(r"^[一二三四五六七八九十]、", s)) or (len(s) <= 24 and (s.endswith("：") or s.endswith(":")))
    say = _say_en(line)
    btn = f'<button class="spk" data-say="{html.escape(say)}" aria-label="Say this line · 唸這句">🔊</button>' if say else ""
    cls = "gl gsub" if is_sub else "gl"
    return f'<p class="{cls}">{btn}<span>{html.escape(line)}</span></p>'

def grammar_player(ids):
    """就地語音講解播放器（非燈箱）——這些講解影片只有聲音，點了在原地展開小播放器，講義不被遮住。"""
    items = []
    for v in live_ids(ids):
        meta = VIDEO_META.get(v, {})
        title = html.escape(meta.get("title") or "語音講解")
        dur = _fmt_dur(meta.get("duration"))
        sub = "🎧 語音講解" + (f" · {dur}" if dur else "")
        items.append(f'''<div class="lecture">
  <button class="lec-btn" data-ytin="{v}" aria-label="播放講解：{title}">
    <span class="lec-play" aria-hidden="true">▶</span>
    <span class="lec-meta"><span class="lec-t">{title}</span><span class="lec-sub">{sub}</span></span>
  </button>
  <div class="lec-stage"></div>
</div>''')
    return '<div class="lectures">' + "\n".join(items) + '</div>'

def build_grammar():
    secs = GRAMMAR["sections"]
    nav = "".join(f'<a href="#g{i+1}">{i+1}. {html.escape(s["title"])}</a>' for i, s in enumerate(secs))
    nvids = sum(len(s["videos"]) for s in secs)
    blocks = []
    for i, s in enumerate(secs):
        band = " band" if i % 2 else ""
        notes = "\n".join(_gnote(l) for l in s["notes"])
        blocks.append(f'''<section class="section{band}" id="g{i+1}">
  <div class="wrap">
    <div class="lesson rvl">
      <div class="lesson-head"><span class="lesson-no">{i+1}</span><h2>{html.escape(s["title"])}</h2></div>
      <div class="lesson-videos">{grammar_player(s["videos"])}</div>
      <div class="gnotes">{notes}</div>
    </div>
  </div>
</section>''')
    body = f'''
{page_hero("人師英語課程", "基礎文法", "從句子的形成到感嘆句——15 段影音講解，搭配完整文法講義。點影片即可在本頁播放。")}
<section class="section"><div class="wrap">
  <div class="flex rvl" style="justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
    <div class="pills"><span class="pill"><b>{len(secs)}</b> 單元</span><span class="pill"><b>{nvids}</b> 段講解影片</span></div>
  </div>
  <nav class="lesson-jump rvl">{nav}</nav>
</div></section>
{"".join(blocks)}
'''
    write("/resources/classes/grammar/", layout("/resources/classes/grammar/", "基礎文法",
          "人師英語課程·基礎文法：句子的形成、詞類、常用句型、時態與各類句型的影音講解與完整講義。", body, "resources"))

def build_animalfarm():
    d = ANIMAL_FARM
    m = d["meta"]
    info = f'''<div class="af-book rvl">
  <div class="af-meta">
    <div><span class="af-k">作者</span><span class="af-v">{html.escape(m["author"])}</span></div>
    <div><span class="af-k">出版</span><span class="af-v">{m["pub"]}</span></div>
    <div><span class="af-k">文類</span><span class="af-v">{html.escape(m["type"])}</span></div>
    <div><span class="af-k">文體</span><span class="af-v">{html.escape(m["genre"])}</span></div>
  </div>
  <p class="af-bg">{html.escape(m["background"])}</p>
</div>'''
    quotes = "".join(
        f'<figure class="af-quote rvl"><blockquote>“{html.escape(q[0])}”</blockquote><figcaption>{html.escape(q[1])}</figcaption></figure>'
        for q in d["quotes"])
    plot = "".join(f"<p>{html.escape(p)}</p>" for p in m["plot"])
    chs = []
    for c in d["chapters"]:
        n = c["n"]
        summ = "".join(f"<li>{html.escape(s)}</li>" for s in c["summary"])
        # 朗讀錄音 → 就地小播放器（不用全幅燈箱）
        players = []
        for i, v in enumerate(c["videos"], 1):
            players.append(f'''<div class="lecture">
  <button class="lec-btn" data-ytin="{v}" aria-label="播放 第{n}章 第{i}段朗讀">
    <span class="lec-play" aria-hidden="true">▶</span>
    <span class="lec-meta"><span class="lec-t">第 {i} 段</span><span class="lec-sub">🎧 語音朗讀</span></span>
  </button>
  <div class="lec-stage"></div>
</div>''')
        grid = '<div class="lectures af-lectures">' + "".join(players) + '</div>'
        chs.append(f'''<section class="af-ch rvl">
  <div class="af-ch-head"><span class="af-ch-n">{n}</span><div><h3>第 {n} 章</h3><ul class="af-sum">{summ}</ul></div></div>
  {grid}
</section>''')

    def char_block(label, items):
        rows = "".join(
            f'<div class="af-char rvl"><span class="af-char-n">{html.escape(nm)}</span><span class="af-char-d">{html.escape(desc)}</span></div>'
            for nm, desc in items)
        return f'<p class="eyebrow rvl" style="margin-top:2rem">{label}角色</p><div class="af-chars">{rows}</div>'
    chars = char_block("動物", d["characters"]["動物"]) + char_block("人類", d["characters"]["人類"])

    body = f'''
{page_hero("人師英語課程", d["title"], "George Orwell 經典政治寓言的英語逐章朗讀與研讀——含書籍背景、章節摘要與角色寓意對照。")}
<section class="section"><div class="wrap">
  {info}
  <div class="af-quotes">{quotes}</div>
  <p class="eyebrow rvl" style="margin-top:2.4rem">故事概要</p>
  <div class="prose wide rvl">{plot}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">逐章朗讀 · 65 段影片</p>
  <h2 class="rvl d1 sweep">十章，跟著朗讀讀完整本書</h2>
  <p class="lead rvl d2" style="max-width:60ch;margin-bottom:1.5rem">每章分成數段短片，點影片即可在本頁觀看。</p>
  {''.join(chs)}
</div></section>
<section class="section"><div class="wrap">
  <p class="eyebrow rvl">Characters 角色寓意</p>
  <h2 class="rvl d1 sweep">每個角色，都是一段歷史</h2>
  <p class="lead rvl d2" style="max-width:62ch;margin-bottom:.5rem">《動物農莊》是一則政治諷喻——書中角色一一對應蘇聯歷史中的人物或群體。</p>
  {chars}
</div></section>
'''
    write("/resources/classes/animal-farm/", layout("/resources/classes/animal-farm/", "動物農莊 Animal Farm",
          "George Orwell《動物農莊》英語逐章朗讀與研讀：書籍背景、十章摘要、65 段影片與角色寓意對照。", body, "resources"))

# ---- 名詩導讀（資料驅動，data/poems.json）----
POETRY_BASE = "/resources/classes/poetry/"

def _pmd(t):
    """導讀文字的輕量標記：先 escape，再把 **粗體** 與 `程式碼` 還原成標籤。"""
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    return t

def _pm_line(en, zh, say_as=None):
    """一行詩：🔊 唸這句 + 英文原文 + 中文對照。

    say_as 是「發音改寫」：畫面仍顯示 en，但餵給 TTS 的換成 say_as。
    合成語音會把同形異音字讀錯——Sonnet 18 的 "So long lives this" 是倒裝，
    lives 是動詞唸 /lɪvz/，Azure 卻讀成名詞 /laɪvz/（實測：原拼法 3.504s，
    而必定短音的 livz 與 livs 都是 3.480s／同樣大小）。改寫拼法是目前唯一
    可行的辦法——這個端點會拒收 SSML <phoneme>。
    """
    # say_as 設為空字串＝這一行不掛 🔊（例如夾在英詩裡的外語行，
    # 用英語語音唸出來只會是錯的）。
    if say_as == "":
        return ('<div class="pm-line pm-line-nosay">'
                f'<span class="pm-en">{html.escape(en)}</span>'
                f'<span class="pm-zh">{_pmd(zh)}</span></div>')
    say = html.escape(re.sub(r"\s+", " ", re.sub(r"[“”]", "", say_as or en)).strip())
    # 名詩導讀的英文是原作、本來就在上且較大，這裡只把 🔊 從「橫跨兩行」收成
    # 只對齊英文那一行，讓它明確屬於英文而不是底下的中文翻譯。
    return ('<div class="pm-line">'
            f'<button class="spk pm-spk" data-say="{say}" '
            f'aria-label="Say this line in English · 唸這句英文" '
            f'style="grid-row:auto">🔊</button>'
            f'<span class="pm-en">{html.escape(en)}</span>'
            f'<span class="pm-zh">{_pmd(zh)}</span></div>')

def _pm_blocks(items):
    return "".join(
        f'<div class="pm-blk rvl"><h3>{_pmd(it["h"])}</h3>'
        + "".join(f"<p>{_pmd(x)}</p>" for x in it["p"]) + "</div>"
        for it in items)

def _pm_paras(items):
    return "".join(f"<p>{_pmd(x)}</p>" for x in items)

def _pm_nav(pm):
    """頁尾導覽。詩頁很長，只有 hero 的返回連結得捲到最頂才點得到。"""
    lst = POEMS["poems"]
    i = next(n for n, x in enumerate(lst) if x["slug"] == pm["slug"])
    prev = lst[i-1] if i > 0 else None
    nxt = lst[i+1] if i < len(lst)-1 else None
    def side(p, dirn, label):
        if not p:
            return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{POETRY_BASE}{p["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(p["title"])}</span></a>')
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一首")}'
            f'<a class="pm-nav-hub" href="{POETRY_BASE}">&#9776; 回名詩導讀</a>'
            f'{side(nxt, "next", "下一首")}</nav>')

def build_poem(pm):
    path = f'{POETRY_BASE}{pm["slug"]}/'
    stanzas = "".join(
        '<div class="pm-stanza">' + "".join(_pm_line(l[0], l[1], l[2] if len(l) > 2 else None) for l in st) + "</div>"
        for st in pm["stanzas"])
    words = "".join(
        f'<tr><td class="pm-w">{html.escape(w[0])}</td><td>{_pmd(w[1])}</td>'
        f'<td class="pm-wn">{_pmd(w[2])}</td></tr>' for w in pm["words"])
    residue = "".join(
        f'<tr><td class="pm-w">{html.escape(r[0])}</td><td>{_pmd(r[1])}</td></tr>'
        for r in pm["residue"])
    teach = "".join(f'<li>{_pmd(x)}</li>' for x in pm["teaching"])
    meta_rows = (
        f'<div><span class="af-k">詩人</span><span class="af-v">{html.escape(pm["poet"])} {html.escape(pm["poet_zh"])}'
        f'（{html.escape(pm["life"])}）</span></div>'
        f'<div><span class="af-k">年代</span><span class="af-v">{html.escape(pm["year"])}</span></div>'
        f'<div><span class="af-k">詩體</span><span class="af-v">{html.escape(pm["form"])}</span></div>'
        f'<div><span class="af-k">主題</span><span class="af-v">{html.escape(pm["theme"])}</span></div>')

    body = f'''
{page_hero("名詩導讀", pm["title"], html.escape(pm["blurb"]), back=(POETRY_BASE, "回名詩導讀"))}
<section class="section"><div class="wrap">
  <div class="pm-meta rvl">{meta_rows}</div>
</div></section>

<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">全詩 · 中英對照</p>
  <h2 class="rvl d1 sweep">先讀原文，再看對照</h2>
  <p class="lead rvl d2" style="max-width:62ch">點任一行的 🔊 可以聽發音。中文是逐行白話對照，不求詩體，只求看懂。</p>
  <div class="pm-poem rvl">{stanzas}</div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">逐節導讀</p>
  <h2 class="rvl d1 sweep">這首詩在做什麼</h2>
  <div class="pm-guide">{_pm_blocks(pm["guide"])}</div>
</div></section>

<section class="section"><div class="wrap">
  <div class="pm-alert rvl">
    <p class="pm-alert-k">⚠️ 你可能讀反的地方</p>
    <p class="pm-alert-lead">文化背景的缺口不會讓你覺得「我看不懂」——它讓你覺得「我看懂了，但好像沒什麼」。以下放的不是詮釋，是<strong>詩裡明明寫了、但多數人沒注意到的字句</strong>。</p>
    <div class="pm-guide">{_pm_blocks(pm["misread"])}</div>
  </div>
</div></section>

<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">關鍵字詞</p>
  <h2 class="rvl d1 sweep">認得、但意思不是你以為的那個</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>字詞</th><th>這裡的意思</th><th>註</th></tr></thead>
    <tbody>{words}</tbody>
  </table></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="pm-two">
    <div class="pm-col rvl">
      <p class="eyebrow">形式與格律</p>
      <h3>為什麼寫成這個樣子</h3>
      <div class="prose">{_pm_paras(pm["formnote"])}</div>
    </div>
    <div class="pm-col rvl d1">
      <p class="eyebrow">文化背景</p>
      <h3>它預設你已經知道的事</h3>
      <div class="prose">{_pm_paras(pm["culture"])}</div>
    </div>
  </div>
</div></section>

<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">活在現代英文裡</p>
  <h2 class="rvl d1 sweep">這首詩留下來的話</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table pm-table-2">
    <thead><tr><th>片語</th><th>現在怎麼用</th></tr></thead>
    <tbody>{residue}</tbody>
  </table></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="pm-teach rvl">
    <p class="pm-alert-k">🍎 給老師的教學提示</p>
    <ul class="pm-teach-list">{teach}</ul>
  </div>
  {_pm_nav(pm)}
</div></section>
'''
    # 🔊 用 Azure 合成語音（tools/gen_audio.py → R2），不是裝置內建語音。
    # 只有實際產過 clip 的詩才掛 manifest——指向不存在的檔案只會每次載入 404。
    say_slug = f'poetry-{pm["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{pm["title"]} {pm["title_zh"]}',
          f'{pm["poet_zh"]}〈{pm["title"]}〉中英對照與逐節導讀：{pm["blurb"]}', body, "resources",
          say_manifest=say_slug if has_clips else None))
    return path


# ---- 唐詩選讀（資料驅動，data/tangshi.json）----
# 跟名詩導讀共用 _pmd／_pm_blocks／_pm_paras 與 .pm-* 版型，但方向相反：主行是中文，
# 🔊 只唸英譯（tools/gen_audio.py 另支援 data-say-lang="zh"，此處刻意不用）。
TANG_BASE = "/resources/classes/tang-poetry/"

def _tp_line(zh, en):
    say_en = html.escape(re.sub(r"\s+", " ", re.sub(r"[“”]", "", en)).strip())
    # 🔊 只唸英譯——中文讀者不需要機器唸中文，站上的喇叭一律是英文發音（2026-09-24 定案）。
    # 🔊 掛在英文左邊而不是整行最前面，免得讀者以為它唸的是中文；英文字級拉到與
    # 中文視覺等重（CJK 約需 1.25 倍於拉丁字母才等高）。樣式寫成行內：.tp-* 是
    # 三個系列共用的，改 style.css 會動到全站 CSS 版本雜湊。
    return ('<div class="tp-line" style="grid-template-columns:minmax(0,1fr);gap:.35rem 0">'
            f'<span class="tp-zh">{html.escape(zh)}</span>'
            '<span style="display:flex;align-items:flex-start;gap:.7rem">'
            f'<button class="spk pm-spk" data-say="{say_en}" '
            f'aria-label="Say this line in English · 唸這句英文" '
            f'style="grid-row:auto;margin-top:.25rem">🔊</button>'
            f'<span class="tp-en" style="font-size:clamp(1.18rem,3.6vw,1.45rem);line-height:1.6;'
            f'color:var(--ink);padding-left:0;text-indent:0">{html.escape(en)}</span>'
            '</span></div>')

def _tp_nav(pm):
    lst = TANGSHI["poems"]
    i = next(n for n, x in enumerate(lst) if x["slug"] == pm["slug"])
    prev = lst[i-1] if i > 0 else None
    nxt = lst[i+1] if i < len(lst)-1 else None
    def side(p, dirn, label):
        if not p:
            return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{TANG_BASE}{p["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(p["title"])}</span></a>')
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一首")}'
            f'<a class="pm-nav-hub" href="{TANG_BASE}">&#9776; 回唐詩選讀</a>'
            f'{side(nxt, "next", "下一首")}</nav>')

def _tp_stanzas(sts):
    """詩行分節。短詩的 stanza 是 [[zh,en],...]；長篇（長恨歌、琵琶行）的 stanza 可寫成
    {"h": "節名", "lines": [[zh,en],...]}，會加上可錨定的節標題與回目錄連結。"""
    out = []
    for i, st in enumerate(sts, 1):
        if isinstance(st, dict):
            aid = f"sec{i}"
            out.append(
                f'<div class="pm-stanza tp-sec" id="{aid}">'
                f'<p class="tp-sec-h"><span class="tp-sec-n">{i}</span>{html.escape(st["h"])}'
                f'<a class="tp-sec-top" href="#tp-toc">目錄 &uarr;</a></p>'
                + "".join(_tp_line(l[0], l[1]) for l in st["lines"]) + "</div>")
        else:
            out.append('<div class="pm-stanza">'
                       + "".join(_tp_line(l[0], l[1]) for l in st) + "</div>")
    return "".join(out)

def _tp_toc(sts):
    """長篇才有的分節目錄；短詩回空字串。"""
    secs = [(i, st["h"]) for i, st in enumerate(sts, 1) if isinstance(st, dict)]
    if len(secs) < 2:
        return ""
    items = "".join(f'<a class="tp-toc-i" href="#sec{i}">'
                    f'<span class="tp-toc-n">{i}</span>{html.escape(h)}</a>' for i, h in secs)
    n = sum(len(st["lines"]) if isinstance(st, dict) else len(st) for st in sts)
    return (f'<div class="tp-toc rvl" id="tp-toc"><p class="tp-toc-k">全詩 {n} 句 · 分 {len(secs)} 節</p>'
            f'<div class="tp-toc-g">{items}</div></div>')

def build_tang_poem(pm):
    path = f'{TANG_BASE}{pm["slug"]}/'
    stanzas = _tp_stanzas(pm["stanzas"])
    words = "".join(
        f'<tr><td class="pm-w tp-w">{html.escape(w[0])}</td><td>{_pmd(w[1])}</td>'
        f'<td class="pm-wn">{_pmd(w[2])}</td></tr>' for w in pm["words"])
    residue = "".join(
        f'<tr><td class="pm-w tp-w">{html.escape(r[0])}</td><td>{_pmd(r[1])}</td><td class="pm-wn">{_pmd(r[2])}</td></tr>'
        for r in pm["residue"])
    teach = "".join(f'<li>{_pmd(x)}</li>' for x in pm["teaching"])
    rc = pm["reception"]
    rc_lines = "".join(f'<span class="tp-rc-line">{html.escape(x)}</span>' for x in rc["lines"])
    meta_rows = (
        f'<div><span class="af-k">詩人</span><span class="af-v">{html.escape(pm["poet"])} {html.escape(pm["poet_en"])}'
        f'（{html.escape(pm["life"])}）</span></div>'
        f'<div><span class="af-k">年代</span><span class="af-v">{html.escape(pm["year"])}</span></div>'
        f'<div><span class="af-k">詩體</span><span class="af-v">{html.escape(pm["form"])}</span></div>'
        f'<div><span class="af-k">主題</span><span class="af-v">{html.escape(pm["theme"])}</span></div>')

    body = f'''
{page_hero("唐詩選讀", pm["title"], html.escape(pm["blurb"]), back=(TANG_BASE, "回唐詩選讀"))}
<section class="section"><div class="wrap">
  <div class="pm-meta rvl">{meta_rows}</div>
</div></section>

<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">全詩 · 中英對照</p>
  <h2 class="rvl d1 sweep">{html.escape(pm["title"])} <span class="tp-h2-en">{html.escape(pm["title_en"])}</span></h2>
  <p class="lead rvl d2" style="max-width:62ch">點任一行的 🔊 可以聽英譯的發音。英譯是逐句白話直譯，不押韻、不湊字數，只求把中文的意思說清楚。</p>
  {_tp_toc(pm["stanzas"])}
  <div class="pm-poem tp-poem rvl">{stanzas}</div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">逐句導讀</p>
  <h2 class="rvl d1 sweep">這首詩在做什麼</h2>
  <div class="pm-guide">{_pm_blocks(pm["guide"])}</div>
</div></section>

<section class="section"><div class="wrap">
  <div class="pm-alert rvl">
    <p class="pm-alert-k">⚠️ 你可能讀反的地方</p>
    <p class="pm-alert-lead">背得太熟的詩，最容易讀反——因為你從來沒有停下來看。以下放的不是詮釋，是<strong>詩裡明明寫了、但多數人沒注意到的字句</strong>。</p>
    <div class="pm-guide">{_pm_blocks(pm["misread"])}</div>
  </div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-alert tp-lost rvl">
    <p class="pm-alert-k">🔍 英文譯不出來的地方</p>
    <p class="pm-alert-lead">翻譯是最嚴格的閱讀。中文可以含糊帶過的地方，英文非得做決定——主語是誰、時態是什麼、那個字到底是哪個意思。以下是譯這首詩時<strong>被迫做的取捨</strong>，也是中文最值得停下來看的地方。</p>
    <div class="pm-guide">{_pm_blocks(pm["lost"])}</div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">關鍵字詞</p>
  <h2 class="rvl d1 sweep">這個字為什麼選這個英文</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>字詞</th><th>這裡的意思</th><th>英譯與選擇</th></tr></thead>
    <tbody>{words}</tbody>
  </table></div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-two">
    <div class="pm-col rvl">
      <p class="eyebrow">格律</p>
      <h3>為什麼寫成這個樣子</h3>
      <div class="prose">{_pm_paras(pm["formnote"])}</div>
    </div>
    <div class="pm-col rvl d1">
      <p class="eyebrow">英語世界怎麼讀它</p>
      <h3>{html.escape(rc["title_en"])}</h3>
      <div class="prose">{_pm_paras(rc["intro"])}</div>
      <div class="tp-rc">{rc_lines}<span class="tp-rc-by">— {html.escape(rc["translator"])}</span></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">活在現代中文裡</p>
  <h2 class="rvl d1 sweep">這首詩留下來的話</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>句子</th><th>現在怎麼用</th><th>英文可對應</th></tr></thead>
    <tbody>{residue}</tbody>
  </table></div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-teach rvl">
    <p class="pm-alert-k">🍎 給雙語課老師的教學提示</p>
    <ul class="pm-teach-list">{teach}</ul>
  </div>
  {_tp_nav(pm)}
</div></section>
'''
    say_slug = f'tang-poetry-{pm["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{pm["title"]} {pm["title_en"]}',
          f'{pm["poet"]}〈{pm["title"]}〉中英對照與逐句導讀：{pm["blurb"]}', body, "resources",
          say_manifest=say_slug if has_clips else None))
    return path

def build_tang_hub():
    cards = []
    for pm in TANGSHI["poems"]:
        cards.append(
            f'<a class="pm-card rvl" href="{TANG_BASE}{pm["slug"]}/">'
            f'<span class="pm-card-lv">{html.escape(pm["level"])}</span>'
            f'<h3 class="tp-card-h">{html.escape(pm["title"])}</h3>'
            f'<p class="pm-card-zh">{html.escape(pm["title_en"])}</p>'
            f'<p class="pm-card-by">{html.escape(pm["poet"])} {html.escape(pm["poet_en"])} · {html.escape(pm["form"])}</p>'
            f'<p class="pm-card-bl">{html.escape(pm["blurb"])}</p>'
            f'<span class="fcard-go">讀這首 <i>&rarr;</i></span></a>')
    body = f'''
{page_hero(TANGSHI["eyebrow"], TANGSHI["title"], html.escape(TANGSHI["lead"]), back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{_pm_paras(TANGSHI["intro"])}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">詩單</p>
  <h2 class="rvl d1 sweep">{len(TANGSHI["poems"])} 首，持續增加中</h2>
  <div class="pm-cards stagger">{"".join(cards)}</div>
</div></section>
'''
    write(TANG_BASE, layout(TANG_BASE, "唐詩選讀 · Tang Poetry",
          "唐詩中英對照與逐句導讀：讀懂唐詩，順便學英文。每首附「你可能讀反的地方」與「英文譯不出來的地方」。", body, "resources"))
    return TANG_BASE

# ---- 論語選讀（資料驅動，data/lunyu.json）----
# 沿用唐詩選讀的 .tp-* 版型與 _pmd／_pm_blocks／_pm_paras。與唐詩的差別：
# 單位是「章」不是「首」，「格律」一節換成「章法」，且對照譯本有兩家（理雅各／萊爾），
# 兩家常在同一個字上選相反的路——那是這個系列的主要教學價值。
LUNYU_BASE = "/resources/classes/lunyu/"

def _ly_line(zh, en):
    say_en = html.escape(re.sub(r"\s+", " ", re.sub(r"[“”]", "", en)).strip())
    # 🔊 掛在英文左邊而不是整行最前面，免得讀者以為它唸的是中文；英文字級拉到與
    # 中文視覺等重（CJK 約需 1.25 倍於拉丁字母才等高）。樣式寫成行內：.tp-* 是
    # 三個系列共用的，改 style.css 會動到全站 CSS 版本雜湊。
    return ('<div class="tp-line" style="grid-template-columns:minmax(0,1fr);gap:.35rem 0">'
            f'<span class="tp-zh">{html.escape(zh)}</span>'
            '<span style="display:flex;align-items:flex-start;gap:.7rem">'
            f'<button class="spk pm-spk" data-say="{say_en}" '
            f'aria-label="Say this line in English · 唸這句英文" '
            f'style="grid-row:auto;margin-top:.25rem">🔊</button>'
            f'<span class="tp-en" style="font-size:clamp(1.18rem,3.6vw,1.45rem);line-height:1.6;'
            f'color:var(--ink);padding-left:0;text-indent:0">{html.escape(en)}</span>'
            '</span></div>')

def _ly_nav(ch):
    lst = LUNYU["chapters"]
    i = next(n for n, x in enumerate(lst) if x["slug"] == ch["slug"])
    prev = lst[i-1] if i > 0 else None
    nxt = lst[i+1] if i < len(lst)-1 else None
    def side(c, dirn, label):
        if not c:
            return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{LUNYU_BASE}{c["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(c["title"])}</span></a>')
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一章")}'
            f'<a class="pm-nav-hub" href="{LUNYU_BASE}">&#9776; 回論語選讀</a>'
            f'{side(nxt, "next", "下一章")}</nav>')

def _ly_receptions(rcs):
    out = []
    for rc in rcs:
        lines = "".join(f'<span class="tp-rc-line">{html.escape(x)}</span>' for x in rc["lines"])
        out.append(f'<div class="tp-rc">{lines}'
                   f'<span class="tp-rc-by">— {html.escape(rc["translator"])}</span></div>')
    return "".join(out)

def build_lunyu_chapter(ch):
    path = f'{LUNYU_BASE}{ch["slug"]}/'
    lines = "".join(_ly_line(l[0], l[1]) for l in ch["lines"])
    words = "".join(
        f'<tr><td class="pm-w tp-w">{html.escape(w[0])}</td><td>{_pmd(w[1])}</td>'
        f'<td class="pm-wn">{_pmd(w[2])}</td></tr>' for w in ch["words"])
    residue = "".join(
        f'<tr><td class="pm-w tp-w">{html.escape(r[0])}</td><td>{_pmd(r[1])}</td>'
        f'<td class="pm-wn">{_pmd(r[2])}</td></tr>' for r in ch["residue"])
    teach = "".join(f'<li>{_pmd(x)}</li>' for x in ch["teaching"])
    meta_rows = (
        f'<div><span class="af-k">出處</span><span class="af-v">{html.escape(ch["ref"])}</span></div>'
        f'<div><span class="af-k">說話者</span><span class="af-v">{html.escape(ch["speaker"])} '
        f'{html.escape(ch["speaker_en"])}（{html.escape(ch["life"])}）</span></div>'
        f'<div><span class="af-k">主題</span><span class="af-v">{html.escape(ch["theme"])}</span></div>'
        f'<div><span class="af-k">體例</span><span class="af-v">{html.escape(ch["form"])}</span></div>')

    body = f'''
{page_hero("論語選讀", ch["title"], html.escape(ch["blurb"]), back=(LUNYU_BASE, "回論語選讀"))}
<section class="section"><div class="wrap">
  <div class="pm-meta rvl">{meta_rows}</div>
</div></section>

<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">原文 · 中英對照</p>
  <h2 class="rvl d1 sweep">{html.escape(ch["title"])}</h2>
  <p class="lead rvl d2" style="max-width:62ch">點任一行的 🔊 可以聽英譯的發音。英譯是逐句白話直譯，不修辭、不湊工整，只求把中文的意思說清楚。</p>
  <div class="pm-poem tp-poem rvl">{lines}</div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">逐句導讀</p>
  <h2 class="rvl d1 sweep">這一章在說什麼</h2>
  <div class="pm-guide">{_pm_blocks(ch["guide"])}</div>
</div></section>

<section class="section"><div class="wrap">
  <div class="pm-alert rvl">
    <p class="pm-alert-k">⚠️ 你可能讀反的地方</p>
    <p class="pm-alert-lead">聽了幾十年的句子，最容易讀反——因為你從來沒有停下來看。以下放的不是詮釋，是<strong>原文明明寫了、但多數人沒注意到的字句</strong>。</p>
    <div class="pm-guide">{_pm_blocks(ch["misread"])}</div>
  </div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-alert tp-lost rvl">
    <p class="pm-alert-k">🔍 英文譯不出來的地方</p>
    <p class="pm-alert-lead">翻譯是最嚴格的閱讀。中文可以含糊帶過的地方，英文非得做決定——那個字是哪個意思、主語是誰、語氣有多重。以下是譯這一章時<strong>被迫做的取捨</strong>，也是中文最值得停下來看的地方。</p>
    <div class="pm-guide">{_pm_blocks(ch["lost"])}</div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">關鍵字詞</p>
  <h2 class="rvl d1 sweep">這個字為什麼選這個英文</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>字詞</th><th>這裡的意思</th><th>英譯與選擇</th></tr></thead>
    <tbody>{words}</tbody>
  </table></div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-two">
    <div class="pm-col rvl">
      <p class="eyebrow">章法</p>
      <h3>為什麼寫成這個樣子</h3>
      <div class="prose">{_pm_paras(ch["structure"])}</div>
    </div>
    <div class="pm-col rvl d1">
      <p class="eyebrow">英語世界怎麼讀它</p>
      <h3>兩家公版英譯</h3>
      <div class="prose"><p>理雅各（1893）是英語世界第一個論語全譯本，用詞莊重、常在譯文裡補出解釋；萊爾（1909）反過來，短到幾乎不留餘地。<strong>兩家常在同一個字上選了相反的路——那個岔路口，就是這一章真正難的地方。</strong></p></div>
      {_ly_receptions(ch["receptions"])}
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">活在現代中文裡</p>
  <h2 class="rvl d1 sweep">這一章留下來的話</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>句子</th><th>現在怎麼用</th><th>英文可對應</th></tr></thead>
    <tbody>{residue}</tbody>
  </table></div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-teach rvl">
    <p class="pm-alert-k">🍎 給雙語課老師的教學提示</p>
    <ul class="pm-teach-list">{teach}</ul>
  </div>
  {_ly_nav(ch)}
</div></section>
'''
    say_slug = f'lunyu-{ch["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{ch["title"]} · 論語{ch["ref"]}',
          f'論語{ch["ref"]}中英對照與逐句導讀：{ch["blurb"]}', body, "resources",
          say_manifest=say_slug if has_clips else None))
    return path

def build_lunyu_hub():
    cards = []
    for ch in LUNYU["chapters"]:
        cards.append(
            f'<a class="pm-card rvl" href="{LUNYU_BASE}{ch["slug"]}/">'
            f'<span class="pm-card-lv">{html.escape(ch["level"])}</span>'
            f'<h3 class="tp-card-h">{html.escape(ch["title"])}</h3>'
            f'<p class="pm-card-zh">{html.escape(ch["ref"])}</p>'
            f'<p class="pm-card-by">{html.escape(ch["speaker"])} · {html.escape(ch["theme"])}</p>'
            f'<p class="pm-card-bl">{html.escape(ch["blurb"])}</p>'
            f'<span class="fcard-go">讀這章 <i>&rarr;</i></span></a>')
    body = f'''
{page_hero(LUNYU["eyebrow"], LUNYU["title"], html.escape(LUNYU["lead"]), back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{_pm_paras(LUNYU["intro"])}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">章單</p>
  <h2 class="rvl d1 sweep">{len(LUNYU["chapters"])} 章，持續增加中</h2>
  <div class="pm-cards stagger">{"".join(cards)}</div>
</div></section>
'''
    write(LUNYU_BASE, layout(LUNYU_BASE, "論語選讀 · The Analects",
          "論語中英對照與逐句導讀，每章附兩家公版英譯對照、你可能讀反的地方與教學提示。", body, "resources"))
    return LUNYU_BASE


# ---- 古文選讀（資料驅動，data/guwen.json）----
# 與唐詩／論語共用 .tp-* 版型，但單位是「篇」：每篇分段，每段有段題與段旨，
# 段內仍逐句對照（.tp-line），並自動生成分段目錄（.tp-toc）。
# 與論語最大的差別：古文多半沒有公版英譯，主譯文是本站自譯，
# 「英語世界怎麼讀」那一節放的是同一作者其他篇章的公版譯本當旁證。
GUWEN_BASE = "/resources/classes/guwen/"

def _gw_line(zh, en):
    """一行中英對照。

    英文是本系列的重點，所以 (1) 🔊 掛在英文左邊而不是整行最前面，免得讀者
    以為它唸的是中文；(2) 英文字級拉到與中文視覺等重（CJK 約需 1.25 倍於拉丁
    字母才等高，故 1.85rem ↔ 1.45rem）。
    樣式一律寫成行內：改 style.css 會讓全站 CSS 版本雜湊變動，而 .tp-* 是
    名詩導讀／唐詩選讀／論語選讀共用的，動它會波及平行工作階段的頁面。
    """
    say_en = html.escape(re.sub(r"\s+", " ", re.sub(r"[“”]", "", en)).strip())
    return ('<div class="tp-line" style="grid-template-columns:minmax(0,1fr);gap:.35rem 0">'
            f'<span class="tp-zh">{html.escape(zh)}</span>'
            '<span style="display:flex;align-items:flex-start;gap:.7rem">'
            f'<button class="spk pm-spk" data-say="{say_en}" '
            f'aria-label="Say this line in English · 唸這句英文" '
            f'style="grid-row:auto;margin-top:.25rem">🔊</button>'
            f'<span class="tp-en" style="font-size:clamp(1.18rem,3.6vw,1.45rem);line-height:1.6;'
            f'color:var(--ink);padding-left:0;text-indent:0">{html.escape(en)}</span>'
            '</span></div>')

def _gw_sections(secs):
    out = []
    for i, s in enumerate(secs, 1):
        # 段旨的樣式寫成行內：改 style.css 會讓全站 CSS 版本雜湊變動，
        # 而 repo 常有平行工作階段在改唐詩，會被迫連他人未完成的頁面一起提交。
        gist = (f'<p class="gw-gist" style="margin:.1rem 0 .9rem;padding:.55rem .85rem;'
                f'border-left:3px solid var(--gold);background:var(--cream);'
                f'border-radius:0 8px 8px 0;font-family:var(--sans);font-size:1.02rem;'
                f'line-height:1.6;color:var(--ink-soft)">{_pmd(s["gist"])}</p>'
                ) if s.get("gist") else ""
        out.append(
            f'<div class="pm-stanza tp-sec" id="sec{i}">'
            f'<p class="tp-sec-h"><span class="tp-sec-n">{i}</span>{html.escape(s["h"])}'
            f'<a class="tp-sec-top" href="#gw-toc">目錄 &uarr;</a></p>'
            + gist + "".join(_gw_line(l[0], l[1]) for l in s["lines"]) + "</div>")
    return "".join(out)

def _gw_kicker(es):
    """目錄那一行的開頭：是全文就寫「全文」，是節選就寫「節選」，讓人一眼看得出。"""
    ex = es.get("extent", "")
    return "節選 " if ex.startswith("節選") else "全文 "


def _gw_envocab(es):
    """英文生字表。本系列的重點是英文，所以生字取自**英譯本身**（不是古文字義），
    每個字都附它在本篇出現的那一句，點 🔊 可以聽單字與整句。
    沿用站上既有的 .adv-item 元件，不必動 style.css。"""
    items = es.get("envocab") or []
    if not items:
        return ""
    rows = "".join(
        f'<div class="adv-item">'
        f'<div class="top"><b>{html.escape(a["w"])}</b>'
        f'<span class="pos">({html.escape(a["pos"])})</span>'
        f'<span class="zh">{html.escape(a["zh"])}</span>'
        f'<button class="spk" data-say="{html.escape(a["w"])}" aria-label="Say this word · 唸單字">🔊</button></div>'
        f'<p class="eg"><button class="spk" data-say="{html.escape(a["eg"])}" '
        f'aria-label="Say this sentence · 唸例句">🔊</button><span>{html.escape(a["eg"])}</span></p>'
        f'<p class="eg-zh">{html.escape(a["eg_zh"])}</p></div>' for a in items)
    return f'''
<section class="section"><div class="wrap">
  <p class="eyebrow rvl">English Vocabulary</p>
  <h2 class="rvl d1 sweep">英譯裡值得帶走的字 <span class="tp-h2-en">{len(items)} words</span></h2>
  <p class="lead rvl d2" style="max-width:62ch">這一欄的字全部取自上面的<strong>英譯</strong>，不是古文字義。
  每個字都附它在本篇出現的那一句——<strong>單字和例句各有一個 🔊，點了都唸英文。</strong></p>
  <div class="adv-list rvl">{rows}</div>
</div></section>
'''


def _gw_quiz(es):
    """英文閱讀理解測驗（點選即揭曉，不必送出、不收資料）。
    正解位置以篇名雜湊決定起點再逐題錯開，避免整組答案落在同一個字母。"""
    items = es.get("quiz") or []
    if not items:
        return ""
    L = "ABCD"
    base = sum(ord(c) for c in es["slug"]) % 4
    qs = []
    for qi, item in enumerate(items):
        target = (base + qi * 3) % 4          # 起點隨篇而異，每題再錯開三格
        opts = list(item["options"])
        opts.insert(target, opts.pop(item["correct"]))
        btns = ""
        for k, o in enumerate(opts):
            dc = ' data-correct="1"' if k == target else ""
            btns += (f'<button class="quiz-opt"{dc}><span class="ql">{L[k]}</span>'
                     f'{html.escape(o)}</button>')
        qs.append(f'<div class="quiz"><p class="q" style="font-family:var(--serif);'
                  f'font-size:1.12rem;font-weight:600">{qi+1}. {html.escape(item["q"])}</p>'
                  f'<div class="quiz-opts">{btns}</div></div>')
    return f'''
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">Reading Check</p>
  <h2 class="rvl d1 sweep">讀懂了嗎 <span class="tp-h2-en">{len(qs)} questions</span></h2>
  <p class="lead rvl d2" style="max-width:62ch">全部根據上面的<strong>英譯</strong>出題，不考古文字義。
  <strong>點一下選項就揭曉答案</strong>，不必送出，也不會記錄任何資料。</p>
  <div class="rvl">{"".join(qs)}</div>
</div></section>
'''


def _gw_toc(secs, nchars, kicker="全文 "):
    items = "".join(f'<a class="tp-toc-i" href="#sec{i}">'
                    f'<span class="tp-toc-n">{i}</span>{html.escape(s["h"])}</a>'
                    for i, s in enumerate(secs, 1))
    return (f'<div class="tp-toc rvl" id="gw-toc"><p class="tp-toc-k">{kicker}{nchars} 字 · 分 {len(secs)} 段</p>'
            f'<div class="tp-toc-g">{items}</div></div>')

def _gw_nav(es):
    lst = GUWEN["essays"]
    i = next(n for n, x in enumerate(lst) if x["slug"] == es["slug"])
    prev = lst[i-1] if i > 0 else None
    nxt = lst[i+1] if i < len(lst)-1 else None
    def side(e, dirn, label):
        if not e:
            return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{GUWEN_BASE}{e["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(e["title"])}</span></a>')
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一篇")}'
            f'<a class="pm-nav-hub" href="{GUWEN_BASE}">&#9776; 回古文選讀</a>'
            f'{side(nxt, "next", "下一篇")}</nav>')

def build_guwen_essay(es):
    path = f'{GUWEN_BASE}{es["slug"]}/'
    nchars = sum(len(re.sub(r"[^一-鿿]", "", l[0]))
                 for s in es["sections"] for l in s["lines"])
    words = "".join(
        f'<tr><td class="pm-w tp-w">{html.escape(w[0])}</td><td>{_pmd(w[1])}</td>'
        f'<td class="pm-wn">{_pmd(w[2])}</td></tr>' for w in es["words"])
    residue = "".join(
        f'<tr><td class="pm-w tp-w">{html.escape(r[0])}</td><td>{_pmd(r[1])}</td>'
        f'<td class="pm-wn">{_pmd(r[2])}</td></tr>' for r in es["residue"])
    teach = "".join(f'<li>{_pmd(x)}</li>' for x in es["teaching"])
    rc = es["reception"]
    rc_lines = "".join(f'<span class="tp-rc-line">{html.escape(x)}</span>' for x in rc["lines"])
    meta_rows = (
        f'<div><span class="af-k">作者</span><span class="af-v">{html.escape(es["author"])} '
        f'{html.escape(es["author_en"])}（{html.escape(es["life"])}）</span></div>'
        f'<div><span class="af-k">年代</span><span class="af-v">{html.escape(es["year"])}</span></div>'
        f'<div><span class="af-k">出處</span><span class="af-v">{html.escape(es["source"])}</span></div>'
        f'<div><span class="af-k">文體</span><span class="af-v">{html.escape(es["genre"])}</span></div>'
        + (f'<div><span class="af-k">篇幅</span><span class="af-v">{_pmd(es["extent"])}</span></div>'
           if es.get("extent") else ""))

    body = f'''
{page_hero("古文選讀", es["title"], html.escape(es["blurb"]), back=(GUWEN_BASE, "回古文選讀"))}
<section class="section"><div class="wrap">
  <div class="pm-meta rvl">{meta_rows}</div>
</div></section>

<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">全文 · 中英對照</p>
  <h2 class="rvl d1 sweep">{html.escape(es["title"])} <span class="tp-h2-en">{html.escape(es["title_en"])}</span></h2>
  <p class="lead rvl d2" style="max-width:62ch">點任一行的 🔊 可以聽英譯的發音。{_pmd(es["trans_note"])}</p>
  {_gw_toc(es["sections"], nchars, _gw_kicker(es))}
  <div class="pm-poem tp-poem rvl">{_gw_sections(es["sections"])}</div>
</div></section>
{_gw_envocab(es)}
{_gw_quiz(es)}

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">逐段導讀</p>
  <h2 class="rvl d1 sweep">這篇文章在做什麼</h2>
  <div class="pm-guide">{_pm_blocks(es["guide"])}</div>
</div></section>

<section class="section"><div class="wrap">
  <div class="pm-alert rvl">
    <p class="pm-alert-k">⚠️ 你可能讀反的地方</p>
    <p class="pm-alert-lead">課本選過的文章最容易讀反——因為你背的是課本的解釋，不是文章本身。以下放的是<strong>原文明明寫了、但多數人沒注意到的字句</strong>。</p>
    <div class="pm-guide">{_pm_blocks(es["misread"])}</div>
  </div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-alert tp-lost rvl">
    <p class="pm-alert-k">🔍 英文譯不出來的地方</p>
    <p class="pm-alert-lead">翻譯是最嚴格的閱讀。中文可以含糊帶過的地方，英文非得做決定。以下是譯這篇文章時<strong>被迫做的取捨</strong>，也是中文最值得停下來看的地方。</p>
    <div class="pm-guide">{_pm_blocks(es["lost"])}</div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">關鍵字詞</p>
  <h2 class="rvl d1 sweep">這個字為什麼選這個英文</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>字詞</th><th>這裡的意思</th><th>英譯與選擇</th></tr></thead>
    <tbody>{words}</tbody>
  </table></div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-two">
    <div class="pm-col rvl">
      <p class="eyebrow">章法</p>
      <h3>這篇文章是怎麼蓋起來的</h3>
      <div class="prose">{_pm_paras(es["structure"])}</div>
    </div>
    <div class="pm-col rvl d1">
      <p class="eyebrow">英語世界怎麼讀他</p>
      <h3>{html.escape(rc["title_en"])}</h3>
      <div class="prose">{_pm_paras(rc["intro"])}</div>
      <div class="tp-rc">{rc_lines}<span class="tp-rc-by">— {html.escape(rc["translator"])}</span></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <p class="eyebrow rvl">活在現代中文裡</p>
  <h2 class="rvl d1 sweep">這篇文章留下來的話</h2>
  <div class="pm-table-wrap rvl"><table class="pm-table">
    <thead><tr><th>句子</th><th>現在怎麼用</th><th>英文可對應</th></tr></thead>
    <tbody>{residue}</tbody>
  </table></div>
</div></section>

<section class="section band"><div class="wrap">
  <div class="pm-teach rvl">
    <p class="pm-alert-k">🍎 給雙語課老師的教學提示</p>
    <ul class="pm-teach-list">{teach}</ul>
  </div>
  {_gw_nav(es)}
</div></section>
'''
    say_slug = f'guwen-{es["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{es["title"]} {es["title_en"]}',
          f'{es["author"]}〈{es["title"]}〉全文中英對照與逐段導讀：{es["blurb"]}', body, "resources",
          say_manifest=say_slug if has_clips else None))
    return path

def build_guwen_hub():
    cards = []
    for es in GUWEN["essays"]:
        n = sum(len(re.sub(r"[^一-鿿]", "", l[0]))
                for s in es["sections"] for l in s["lines"])
        cards.append(
            f'<a class="pm-card rvl" href="{GUWEN_BASE}{es["slug"]}/">'
            f'<span class="pm-card-lv">{html.escape(es["level"])}</span>'
            f'<h3 class="tp-card-h">{html.escape(es["title"])}</h3>'
            f'<p class="pm-card-zh">{html.escape(es["title_en"])}</p>'
            f'<p class="pm-card-by">{html.escape(es["author"])} {html.escape(es["author_en"])} · '
            f'{html.escape(es["genre"])} · {n} 字</p>'
            f'<p class="pm-card-bl">{html.escape(es["blurb"])}</p>'
            f'<span class="fcard-go">讀這篇 <i>&rarr;</i></span></a>')
    body = f'''
{page_hero(GUWEN["eyebrow"], GUWEN["title"], html.escape(GUWEN["lead"]), back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{_pm_paras(GUWEN["intro"])}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">篇目</p>
  <h2 class="rvl d1 sweep">{len(GUWEN["essays"])} 篇，持續增加中</h2>
  <div class="pm-cards stagger">{"".join(cards)}</div>
</div></section>
'''
    write(GUWEN_BASE, layout(GUWEN_BASE, "古文選讀 · Classical Chinese Prose",
          "古文名篇全文中英對照與逐段導讀，附章法分析、你可能讀反的地方與教學提示。", body, "resources"))
    return GUWEN_BASE


# ---- 中醫養生（資料驅動，data/zhongyi.json）----
# 人師的課程是英文為主、中文為輔，教英文才是本業——這個系列跟 lunyu/guwen 那套
# 「中文原典逐句導讀」完全不同定位，改成套用 basic/intermediate 閱讀教材那套
# render_basic_unit()：英文 reading 為主文，中文翻譯預設隱藏、點按鈕才顯示，
# 生字直接從這篇文章裡挑，帶例句；沿用同一顆星星（vocab-grid ex／qa-list／tr-toggle）。
ZHONGYI_BASE = "/resources/classes/zhongyi/"
ZHONGYI_UNIT_LABELS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]

def _zy_flat_lessons():
    out = []
    for u in ZHONGYI["units"]:
        for l in u["lessons"]:
            out.append((u, l))
    return out

def _zy_nav(slug):
    flat = _zy_flat_lessons()
    i = next(n for n, (u, l) in enumerate(flat) if l["slug"] == slug)
    prev = flat[i - 1] if i > 0 else None
    nxt = flat[i + 1] if i < len(flat) - 1 else None
    def side(item, dirn, label):
        if not item:
            return '<span class="pm-nav-x"></span>'
        _, l = item
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{ZHONGYI_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{ZHONGYI_BASE}">&#9776; 回中醫養生 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def _zy_boundary(lesson):
    return (f'<p class="muted rvl" style="margin-top:1.4rem;padding:.9rem 1.1rem;'
            f'border-left:3px solid var(--gold);background:var(--cream);border-radius:0 10px 10px 0;'
            f'font-size:.98rem;line-height:1.7">{html.escape(lesson["boundary_en"])}'
            f'<br><span style="font-family:var(--zh)">{html.escape(lesson["boundary_zh"])}</span></p>')

def build_zhongyi_lesson(unit, lesson, unit_label):
    path = f'{ZHONGYI_BASE}{lesson["slug"]}/'
    unit_dict = {
        "unit": lesson["unit"],
        "title": lesson["title"],
        "paras": lesson["paras"],
        "paras_zh": lesson["paras_zh"],
        "questions": lesson["questions"],
        "answers": lesson["answers"],
        "vocab": lesson["vocab"],
        "quiz": lesson.get("quiz"),
    }
    reading_html = render_basic_unit(1, unit_dict, level="zhongyi", audio_rel="", pdf_rel="")
    eyebrow = f'TCM Wellness · {unit["title_en"]} · 中醫養生 {unit_label}'
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, lesson["title"], lead, back=(ZHONGYI_BASE, "回中醫養生 · All Lessons"))}
<section class="section"><div class="wrap" style="max-width:940px">
{reading_html}
{_zy_boundary(lesson)}
</div></section>
<section class="section"><div class="wrap">
{_zy_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'zhongyi-{lesson["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · TCM Wellness 中醫養生',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None))
    return path

def _lc_head():
    """課程首頁橫向卡片（assets/css/lesson-cards.css）；天文教育、中醫養生首頁共用。"""
    fp = os.path.join(ROOT, "assets/css/lesson-cards.css")
    v = hashlib.md5(open(fp, "rb").read()).hexdigest()[:8] if os.path.exists(fp) else "0"
    return f'<link rel="stylesheet" href="/assets/css/lesson-cards.css?v={v}">\n'

_ZY_LEVEL_EN = {"入門": "Beginner", "進階": "Advanced"}

def build_zhongyi_hub():
    # 橫向卡片：左邊課次數字、右邊雙語標題與簡介；上方一條單元導覽（捲動時自動標出目前單元）。
    # 不再用 pm-cards 四欄窄卡——英文長標題會被切成好幾行（2026-09-30 Luke 嫌難讀）。
    unit_sections, nav = [], []
    for idx, u in enumerate(ZHONGYI["units"]):
        label = ZHONGYI_UNIT_LABELS[idx] if idx < len(ZHONGYI_UNIT_LABELS) else str(idx + 1)
        cards = []
        for n, l in enumerate(u["lessons"], 1):
            lv = l["level"]
            cards.append(
                f'<a class="lc-row lc-compact rvl" href="{ZHONGYI_BASE}{l["slug"]}/">'
                f'<span class="lc-num" aria-hidden="true"><b>{n}</b><small>Lesson</small></span>'
                f'<span class="lc-body">'
                f'<span class="lc-meta"><b>Unit {idx + 1} · Lesson {n}</b><i>{html.escape(_ZY_LEVEL_EN.get(lv, lv))} · {html.escape(lv)}</i></span>'
                f'<h3 class="lc-title">{html.escape(l["title"])}</h3>'
                f'<span class="lc-zh">{html.escape(l["title_zh"])}</span>'
                f'<span class="lc-bl">{html.escape(l["blurb_en"])}</span>'
                f'<span class="lc-bl zh">{html.escape(l["blurb_zh"])}</span>'
                f'<span class="lc-go">Start reading · 開始閱讀 <i>&rarr;</i></span>'
                f'</span></a>')
        band = " band" if idx % 2 == 0 else ""
        uid = f"unit-{idx + 1}"
        short_zh = u["title_zh"].split("：", 1)[-1]
        nav.append(f'<a class="unit-nav-link" href="#{uid}"><b>{idx + 1}</b><span>{html.escape(short_zh)}</span></a>')
        unit_sections.append(
            f'<section class="section lc-unit{band}" id="{uid}"><div class="wrap">'
            f'<p class="eyebrow rvl">Unit {idx + 1} · 單元{html.escape(label)}</p>'
            f'<h2 class="rvl d1 sweep">{html.escape(u["title_en"])} <span class="tp-h2-en">{html.escape(u["title_zh"])}</span></h2>'
            f'<p class="lead rvl d2" style="max-width:62ch">{html.escape(u["blurb_en"])}<br>'
            f'<span class="muted">{html.escape(u["blurb_zh"])}</span></p>'
            f'<div class="lc-list">{"".join(cards)}</div>'
            f'</div></section>')
    unit_nav = (f'<nav class="unit-nav" aria-label="Jump to unit · 單元導覽"><div class="wrap">'
                f'<span class="unit-nav-label">Jump to unit · 跳到單元</span>'
                f'<div class="unit-nav-track">{"".join(nav)}</div></div></nav>')
    intro_html = "".join(
        f'<p>{html.escape(p["en"])}<br><span class="muted">{html.escape(p["zh"])}</span></p>'
        for p in ZHONGYI["intro"])
    lead = f'{html.escape(ZHONGYI["lead_en"])}<br><span class="muted">{html.escape(ZHONGYI["lead_zh"])}</span>'
    body = f'''
{page_hero(ZHONGYI["eyebrow"], ZHONGYI["title_en"], lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{intro_html}</div>
</div></section>
{unit_nav}
{"".join(unit_sections)}
'''
    write(ZHONGYI_BASE, layout(ZHONGYI_BASE, f'{ZHONGYI["title_en"]} · {ZHONGYI["title_zh"]}',
          f'{ZHONGYI["lead_en"]} {ZHONGYI["lead_zh"]}', body, "resources", extra_head=_lc_head()))
    return ZHONGYI_BASE


# ---- 天文教育（資料驅動，data/astronomy.json）----
# 跟中醫養生同一套：英文 reading 為主、中文預設收起，生字／閱讀理解／小測驗沿用
# render_basic_unit()。多出來的是每課一個 3D 模型（three.js，原始碼在
# tools/astro/src/，`cd tools/astro && npm run build` 打包成 assets/js/moon-phases.js），
# 以及月相卡、迷思、口訣、課堂實驗幾個科學延伸段落。
# 3D 模型的 CSS/JS 只載在天文頁，版本號另算，改它們不會讓全站每一頁都跟著變。
ASTRO_BASE = "/resources/classes/astronomy/"

def _astro_cn(n):
    return ZHONGYI_UNIT_LABELS[n - 1] if 1 <= n <= len(ZHONGYI_UNIT_LABELS) else str(n)

def _astro_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/js/moon-phases.js", "assets/js/eclipses.js", "assets/js/seasons.js", "assets/js/tides.js",
                "assets/js/constellations.js", "assets/js/north-star.js", "assets/js/planets-lab.js",
                "assets/js/sundial.js", "assets/js/solar.js", "assets/js/star-distance.js", "assets/js/meteors-lab.js", "assets/js/star-colors.js", "assets/js/moon-face.js", "assets/js/milky-way.js", "assets/js/moon-illusion.js", "assets/js/sunrise-lab.js"):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _astro_head(js=None):
    """js：這一課的 3D 模型 bundle 名稱（tools/astro 打包出來的 assets/js/<js>.js）；系列首頁不載。"""
    v = _astro_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n{tag}'

_MOON_SVG_N = [0]
def moon_svg(elong, size=52, south=False):
    """月相小圖（北半球視角：漸盈右邊亮）。elong = 距角（度），0 新月、180 滿月。"""
    import math
    _MOON_SVG_N[0] += 1
    gid = f"mg{_MOON_SVG_N[0]}"
    r, c = 23, 26
    e = elong % 360
    parts = [f'<circle cx="{c}" cy="{c}" r="{r}" fill="#1c2436" stroke="rgba(255,255,255,.22)" stroke-width="1"/>']
    if abs(e - 180) < 0.5:
        parts.append(f'<circle cx="{c}" cy="{c}" r="{r}" fill="url(#{gid})"/>')
    elif 0.5 < e < 359.5:
        waxing = e < 180
        a = e if waxing else 360 - e
        rx = round(r * abs(math.cos(math.radians(a))), 2)
        sweep = 0 if a < 90 else 1
        flip = "" if waxing != south else f' transform="translate({2 * c},0) scale(-1,1)"'
        parts.append(f'<path d="M{c},{c - r} A{r},{r} 0 0 1 {c},{c + r} A{rx},{r} 0 0 {sweep} {c},{c - r}Z" fill="url(#{gid})"{flip}/>')
    defs = (f'<defs><radialGradient id="{gid}" cx="42%" cy="38%" r="75%">'
            '<stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#efe6cf"/>'
            '<stop offset="1" stop-color="#d9ceb2"/></radialGradient></defs>')
    return (f'<svg class="moon-svg" viewBox="0 0 52 52" width="{size}" height="{size}" aria-hidden="true">'
            f'{defs}{"".join(parts)}</svg>')

def eclipse_svg(key, size=56):
    """日月食小圖：key = 'solar:total' 之類（見 data/astronomy.json 的 types）。"""
    _MOON_SVG_N[0] += 1
    n = _MOON_SVG_N[0]
    kind, typ = key.split(":")
    c = 26
    if kind == "solar":
        corona = (f'<circle cx="{c}" cy="{c}" r="25" fill="url(#ec{n})"/>' if typ == "total" else "")
        moon = {"total": (c, c, 21.5), "annular": (c, c, 17), "partial": (c + 12, c - 5, 20)}[typ]
        return (f'<svg class="ecl-svg" viewBox="0 0 52 52" width="{size}" height="{size}" aria-hidden="true">'
                f'<defs><radialGradient id="ec{n}"><stop offset=".78" stop-color="#eef2ff"/>'
                f'<stop offset="1" stop-color="#eef2ff" stop-opacity="0"/></radialGradient></defs>{corona}'
                f'<circle cx="{c}" cy="{c}" r="20.5" fill="#ffd98a"/>'
                f'<circle cx="{moon[0]}" cy="{moon[1]}" r="{moon[2]}" fill="#0b0d12"/></svg>')
    fill = "#a8401c" if typ == "total" else "#ece5d2"
    shade = {"total": "", "partial": f'<circle cx="{c + 15}" cy="{c - 7}" r="21" fill="#4a1c0c" opacity=".9"/>',
             "penumbral": f'<circle cx="{c + 13}" cy="{c}" r="26" fill="#000" opacity=".28"/>'}[typ]
    return (f'<svg class="ecl-svg" viewBox="0 0 52 52" width="{size}" height="{size}" aria-hidden="true">'
            f'<clipPath id="ec{n}"><circle cx="{c}" cy="{c}" r="21"/></clipPath>'
            f'<circle cx="{c}" cy="{c}" r="21" fill="{fill}"/><g clip-path="url(#ec{n})">{shade}</g></svg>')

def season_svg(key, size=56):
    """四季小圖：陽光從左邊來，地軸依節氣傾向／背向太陽；左緣的亮點就是太陽直射的地方。
    key：0 春分、1 夏至、2 秋分、3 冬至。"""
    import math
    _MOON_SVG_N[0] += 1
    n = _MOON_SVG_N[0]
    th = {0: 0.0, 1: -23.4, 2: 0.0, 3: 23.4}[key]
    c, r = 30, 18
    t = math.radians(th)
    ax, ay = math.sin(t), -math.cos(t)          # 地軸（往北）
    ex, ey = math.cos(t), math.sin(t)           # 赤道方向
    def seg(lat, col, dash=""):
        off = r * math.sin(math.radians(lat)); half = r * math.cos(math.radians(lat))
        px, py = c + ax * off, c + ay * off
        return (f'<line x1="{px - ex * half:.1f}" y1="{py - ey * half:.1f}" x2="{px + ex * half:.1f}" y2="{py + ey * half:.1f}" '
                f'stroke="{col}" stroke-width="1.2"{dash}/>')
    rays = "".join(f'<line x1="2" y1="{y}" x2="9" y2="{y}" stroke="#ffd36e" stroke-width="1.4" stroke-linecap="round"/>' for y in (20, 30, 40))
    return (f'<svg class="season-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<defs><clipPath id="sc{n}"><circle cx="{c}" cy="{c}" r="{r}"/></clipPath></defs>{rays}'
            f'<circle cx="{c}" cy="{c}" r="{r}" fill="#3f86d6"/>'
            f'<rect x="{c}" y="{c - r}" width="{r}" height="{2 * r}" fill="#0f1f3c" opacity=".78" clip-path="url(#sc{n})"/>'
            f'<g clip-path="url(#sc{n})">{seg(0, "rgba(255,255,255,.75)")}{seg(23.4, "#ffd36e", ' stroke-dasharray="2 2"')}{seg(-23.4, "#ffd36e", ' stroke-dasharray="2 2"')}</g>'
            f'<line x1="{c - ax * (r + 7):.1f}" y1="{c - ay * (r + 7):.1f}" x2="{c + ax * (r + 7):.1f}" y2="{c + ay * (r + 7):.1f}" stroke="#fff" stroke-width="1.3"/>'
            f'<circle cx="{c - r}" cy="{c}" r="2.6" fill="#fff6c8"/></svg>')

def tide_svg(size=56):
    """潮汐小圖：地球外面一圈被拉長的海水，右邊是月亮。"""
    _MOON_SVG_N[0] += 1
    n = _MOON_SVG_N[0]
    return (f'<svg class="tide-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<defs><radialGradient id="td{n}"><stop offset=".6" stop-color="#6fc0ff" stop-opacity=".75"/>'
            f'<stop offset="1" stop-color="#3a8ee6" stop-opacity=".35"/></radialGradient></defs>'
            f'<ellipse cx="25" cy="30" rx="21" ry="14.5" fill="url(#td{n})"/>'
            f'<circle cx="25" cy="30" r="12" fill="#2d6fbf"/><path d="M19 25c3-2 7-1 8 2s-2 5-5 4-5-3-3-6z" fill="#5ea35a"/>'
            f'<circle cx="54" cy="30" r="4.2" fill="#e9e4d6"/></svg>')

def star_svg(size=56):
    """星座小圖（系列首頁的課程卡）：獵戶座的七顆主星。"""
    pts = [(18, 12), (42, 15), (27, 30), (31, 31), (35, 32), (20, 49), (44, 47)]
    segs = [(0, 2), (1, 4), (2, 3), (3, 4), (2, 5), (4, 6), (0, 1)]
    lines = "".join(f'<line x1="{pts[a][0]}" y1="{pts[a][1]}" x2="{pts[b][0]}" y2="{pts[b][1]}"/>' for a, b in segs)
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>' for (x, y), r, c in zip(
        pts, (3.2, 2.4, 2, 2, 2, 2, 3), ("#ffb27a", "#dfe8ff", "#e8eeff", "#e8eeff", "#e8eeff", "#dfe8ff", "#bcd0ff")))
    return (f'<svg class="star-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<g stroke="rgba(160,190,255,.55)" stroke-width="1.2">{lines}</g>{dots}</svg>')

def polaris_svg(size=56):
    """北極星小圖（系列首頁的課程卡）：北極星在中心，周圍一圈圈星軌。"""
    arcs = "".join(
        f'<circle cx="30" cy="30" r="{r}" fill="none" stroke="rgba(160,190,255,{o})" stroke-width="1.3" '
        f'stroke-dasharray="{d} 200" transform="rotate({a} 30 30)"/>'
        for r, o, d, a in ((8, .6, 18, 20), (14, .5, 30, 150), (20, .45, 44, 250), (26, .35, 58, 60)))
    return (f'<svg class="polaris-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">{arcs}'
            '<path d="M30 25.5l1.3 3.2 3.2 1.3-3.2 1.3-1.3 3.2-1.3-3.2-3.2-1.3 3.2-1.3z" fill="#ffe3a3"/></svg>')

def planet_svg(size=56, color="#f0dca0", ring=True):
    """行星小圖（系列首頁的課程卡、行星卡）：帶光環的土星，或單色圓球。"""
    _MOON_SVG_N[0] += 1
    n = _MOON_SVG_N[0]
    rings = (f'<ellipse cx="30" cy="30" rx="25" ry="7.5" fill="none" stroke="rgba(232,214,160,.85)" stroke-width="2.6" transform="rotate(-18 30 30)"/>'
             if ring else "")
    front = (f'<path d="M7 36.5 A25 7.5 -18 0 0 53 23.5" fill="none" stroke="rgba(232,214,160,.95)" stroke-width="2.6" transform="rotate(0 30 30)"/>'
             if ring else "")
    return (f'<svg class="planet-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<defs><radialGradient id="pg{n}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff"/>'
            f'<stop offset=".35" stop-color="{color}"/><stop offset="1" stop-color="#3a2a14"/></radialGradient></defs>'
            f'{rings}<circle cx="30" cy="30" r="{13 if ring else 17}" fill="url(#pg{n})"/>{front}</svg>')

def sundial_svg(size=56):
    """日晷小圖（系列首頁的課程卡）：圓形晷面、時刻線與一道影子。"""
    import math
    ticks = "".join(
        f'<line x1="{30 + 13 * math.cos(math.radians(a)):.1f}" y1="{32 + 13 * math.sin(math.radians(a)) * .55:.1f}" '
        f'x2="{30 + 20 * math.cos(math.radians(a)):.1f}" y2="{32 + 20 * math.sin(math.radians(a)) * .55:.1f}"/>'
        for a in range(180, 361, 15))
    return (f'<svg class="sundial-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="47" cy="11" r="5" fill="#ffd36e"/>'
            '<ellipse cx="30" cy="32" rx="22" ry="12.5" fill="#d8d0bc"/>'
            f'<g stroke="#5a4320" stroke-width="1">{ticks}</g>'
            '<path d="M30 32 L17 39" stroke="#1a1208" stroke-width="2.4" stroke-linecap="round"/>'
            '<path d="M30 32 L38 14" stroke="#8a6a3a" stroke-width="2" stroke-linecap="round"/>'
            '<rect x="27" y="44" width="6" height="10" fill="#9a9a9a"/></svg>')

def solar_svg(size=56):
    """太陽系小圖（系列首頁的課程卡）：太陽與幾圈軌道上的行星。"""
    rings = "".join(f'<ellipse cx="30" cy="30" rx="{r}" ry="{r * .42:.1f}" fill="none" stroke="rgba(160,190,255,.45)" stroke-width="1"/>' for r in (11, 17, 23, 28))
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="{rr}" fill="{c}"/>' for x, y, rr, c in
                   ((41, 30, 1.6, "#4f9cff"), (14, 35, 1.4, "#ff7a4a"), (49, 37, 2.6, "#e8c9a0"), (5, 27, 2, "#9fe3ea")))
    return (f'<svg class="solar-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">{rings}'
            f'<circle cx="30" cy="30" r="5" fill="#ffd36e"/>{dots}</svg>')

def distance_svg(size=56):
    """視差小圖（系列首頁的課程卡）：地球軌道兩端看向一顆近星，視線延伸到遠方。"""
    return (f'<svg class="distance-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<ellipse cx="30" cy="47" rx="17" ry="5.5" fill="none" stroke="rgba(79,209,197,.6)" stroke-width="1"/>'
            '<circle cx="30" cy="47" r="2.6" fill="#ffd36e"/>'
            '<path d="M13 47 L36 18 L41 4" stroke="#4fd1c5" stroke-width="1.3" fill="none"/>'
            '<path d="M47 47 L36 18 L33 4" stroke="#ff9a4a" stroke-width="1.3" fill="none"/>'
            '<circle cx="13" cy="47" r="2.2" fill="#4f9cff"/><circle cx="47" cy="47" r="2.2" fill="#ff9a4a"/>'
            '<circle cx="36" cy="18" r="2.6" fill="#fff"/><circle cx="36" cy="18" r="5" fill="rgba(255,255,255,.18)"/>'
            '<circle cx="41" cy="4" r="1.2" fill="#9fe8de"/><circle cx="33" cy="4" r="1.2" fill="#ffc796"/>'
            '<circle cx="8" cy="10" r=".9" fill="#c8d4ff"/><circle cx="52" cy="14" r=".9" fill="#c8d4ff"/><circle cx="20" cy="24" r=".7" fill="#c8d4ff"/></svg>')

def meteor_svg(size=56):
    """流星小圖（系列首頁的課程卡、流星雨卡）：幾道從同一點散開的流星。"""
    streaks = "".join(
        f'<path d="M{x1} {y1} L{x2} {y2}" stroke="url(#mtg)" stroke-width="{w}" stroke-linecap="round"/>'
        for x1, y1, x2, y2, w in ((22, 14, 50, 44, 2.2), (18, 20, 30, 52, 1.6), (27, 12, 56, 24, 1.4), (14, 16, 8, 40, 1.2)))
    return (f'<svg class="meteor-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<defs><linearGradient id="mtg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/>'
            '<stop offset="1" stop-color="#fff6d0"/></linearGradient></defs>'
            '<circle cx="18" cy="14" r="5" fill="none" stroke="#ffd36e" stroke-width="1.4"/>'
            f'{streaks}<circle cx="44" cy="8" r=".9" fill="#c8d4ff"/><circle cx="8" cy="52" r=".8" fill="#c8d4ff"/><circle cx="52" cy="50" r=".7" fill="#c8d4ff"/></svg>')

def colors_svg(size=56):
    """星色小圖（系列首頁的課程卡）：由紅到藍的幾顆星。"""
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/><circle cx="{x}" cy="{y}" r="{r * 2.2:.1f}" fill="{c}" opacity=".18"/>'
                   for x, y, r, c in ((12, 40, 4.2, "#ffb46b"), (24, 22, 3.2, "#ffd1a3"), (34, 42, 3.6, "#fff1ea"), (44, 20, 3.4, "#e3e7ff"), (50, 40, 4.4, "#b5cdff")))
    return f'<svg class="colors-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">{dots}</svg>'

def milkyway_svg(size=56):
    """銀河小圖（系列首頁的課程卡）：一個斜看的旋渦星系，太陽是金色小點。"""
    arms = "".join(f'<path d="M30 30 Q{x1} {y1} {x2} {y2}" stroke="rgba(190,205,255,.75)" stroke-width="{w}" fill="none" stroke-linecap="round"/>'
                   for x1, y1, x2, y2, w in ((44, 22, 52, 34, 2.2), (16, 38, 8, 26, 2.2), (38, 40, 26, 44, 1.6), (22, 20, 34, 16, 1.6)))
    return (f'<svg class="milkyway-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<g transform="rotate(-18 30 30) scale(1 .62) translate(0 18)">'
            '<circle cx="30" cy="30" r="25" fill="rgba(120,140,220,.12)"/>'
            f'{arms}<circle cx="30" cy="30" r="6" fill="#ffe2a8"/><circle cx="30" cy="30" r="10" fill="rgba(255,226,168,.25)"/>'
            '<circle cx="44" cy="35" r="1.8" fill="#ffd36e"/></g></svg>')

def illusion_svg(size=56):
    """月亮錯覺小圖（系列首頁的課程卡）：屋頂後面一輪大月亮。"""
    return (f'<svg class="illusion-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="30" cy="34" r="17" fill="#f4d48a"/><circle cx="30" cy="34" r="23" fill="rgba(244,212,138,.18)"/>'
            '<circle cx="24" cy="30" r="3.5" fill="rgba(150,120,70,.35)"/><circle cx="35" cy="38" r="4.5" fill="rgba(150,120,70,.3)"/>'
            '<path d="M0 60 L0 46 L8 40 L16 46 L16 42 L24 42 L24 48 L32 41 L40 48 L40 44 L48 44 L48 50 L54 45 L60 49 L60 60 Z" fill="#0a0e1a"/></svg>')

def sunrise_svg(size=56, off=None):
    """日出小圖（系列首頁的課程卡、四個日出點卡）：地平線上的半個太陽，上方一道弧標出冬至到夏至的日出範圍。
    off：東偏北幾度（負＝偏南），畫成指針；None 時畫三個點（夏至、春秋分、冬至）。"""
    import math
    def pt(o, r=22):
        a = math.radians(o * 1.4)          # 角度放大 1.4 倍，小圖比較看得出來
        return 30 - r * math.sin(a), 44 - r * math.cos(a)
    arc = " ".join(f"{'M' if k == 0 else 'L'}{pt(o)[0]:.1f} {pt(o)[1]:.1f}" for k, o in enumerate(range(26, -27, -2)))
    if off is None:
        dots = "".join(f'<circle cx="{pt(o)[0]:.1f}" cy="{pt(o)[1]:.1f}" r="2.6" fill="{c}"/>' for o, c in ((26, "#ffa25a"), (0, "#e8eefc"), (-25, "#7fb4ff")))
    else:
        x, y = pt(off)
        dots = f'<line x1="30" y1="44" x2="{x:.1f}" y2="{y:.1f}" stroke="#ffd36e" stroke-width="2" stroke-linecap="round"/><circle cx="{x:.1f}" cy="{y:.1f}" r="3.2" fill="#ffd36e"/>'
    return (f'<svg class="sunrise-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="30" cy="44" r="15" fill="rgba(255,190,90,.22)"/><circle cx="30" cy="44" r="10" fill="#ffc861"/>'
            f'<path d="{arc}" stroke="rgba(255,211,110,.55)" stroke-width="1.6" fill="none" stroke-dasharray="2 2.4"/>{dots}'
            '<rect x="0" y="44" width="60" height="16" fill="#0a0e1a"/><line x1="4" y1="44" x2="56" y2="44" stroke="#9fb0cf" stroke-width="1"/></svg>')

def _bi(en, zh, tag="p", cls=""):
    """英文在前、中文在後的雙語段落。"""
    c = f' class="{cls}"' if cls else ""
    return f'<{tag}{c}>{html.escape(en)}<br><span class="muted zh">{html.escape(zh)}</span></{tag}>'

def render_moon_lab(lesson):
    lab = lesson["lab"]
    ph = lesson["phases"]
    phases_json = html.escape(json.dumps(
        [{k: p[k] for k in ("en", "zh", "when_en", "when_zh")} for p in ph], ensure_ascii=False))
    chips = "".join(
        f'<button type="button" class="al-chip" data-i="{i}" aria-label="{html.escape(p["en"])} · {html.escape(p["short_zh"])}">'
        f'{moon_svg(p["elong"], 30)}<span class="al-chip-en">{html.escape(p["en"])}</span>'
        f'<span class="al-chip-zh">{html.escape(p["short_zh"])}</span></button>'
        for i, p in enumerate(ph))
    toggles = [
        ("rings", "Two halves", "兩個半面", True),
        ("ghosts", "Eight positions", "八個位置", True),
        ("shadow", "Earth's shadow", "地球的影子", False),
        ("scale", "True scale", "真實比例", False),
        ("south", "Southern Hemisphere", "南半球", False),
    ]
    tg = _lab_toggles(toggles)
    return f'''<div class="astro-lab rvl" data-moon-lab data-phases="{phases_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the Sun, Earth and Moon · 日地月 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The phase cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的月相卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky">
      <p class="al-sky-k">View from Earth · 從地球看</p>
      <div class="al-sky-view">
        <canvas class="al-sky-cv" aria-label="The Moon as seen from Earth · 從地球看到的月亮"></canvas>
        <span class="al-sun-dir"><i>&#9728;</i><em></em></span>
        <p class="al-badge" hidden>Today · 今天 <b></b></p>
      </div>
      <p class="al-hemi-note">Northern Hemisphere view (Taiwan) · 北半球視角（台灣）</p>
      <div class="al-readout" aria-live="polite">
        <p class="al-phase-en"></p>
        <p class="al-phase-zh"></p>
        <dl>
          <div><dt>Moon age · 月齡</dt><dd data-r="age"></dd></div>
          <div><dt>Lunar date · 農曆</dt><dd data-r="lunar"></dd></div>
          <div><dt>Lit · 亮面</dt><dd data-r="lit"></dd></div>
          <div><dt>Rises · 月出（約）</dt><dd data-r="rise"></dd></div>
          <div><dt>Sets · 月落（約）</dt><dd data-r="set"></dd></div>
        </dl>
        <p class="al-when"></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.6" aria-pressed="false">Slow 慢</button>
        <button type="button" data-speed="1.5" aria-pressed="true">Normal 中</button>
        <button type="button" data-speed="4" aria-pressed="false">Fast 快</button>
      </div>
      <button type="button" class="al-today">&#127765; Today's Moon · 今天的月亮</button>
    </div>
    <label class="al-slider"><span>Days since new moon · 新月後第幾天</span>
      <input type="range" class="al-age" min="0" max="29.53" step="0.05" value="0"></label>
    <div class="al-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
</div>'''

def _lab_toggles(toggles):
    return "".join(
        f'<label class="al-tg"><input type="checkbox" data-t="{k}"{" checked" if on else ""}>'
        f'<span class="al-sw" aria-hidden="true"></span><span>{en}<small>{zh}</small></span></label>'
        for k, en, zh, on in toggles)

def _lab_foot(lab):
    legend = "".join(
        f'<li class="al-lg-{html.escape(l["cls"])}"><i></i><span>{html.escape(l["en"])}'
        f'<br><span class="zh">{html.escape(l["zh"])}</span></span></li>' for l in lab["legend"])
    return (f'<div class="al-foot"><ul class="al-legend">{legend}</ul>'
            f'<p class="al-scale">{html.escape(lab["scale_en"])}<br><span class="zh">{html.escape(lab["scale_zh"])}</span></p></div>')

def render_eclipse_lab(lesson):
    """第二課：照真實日期運轉的日地月模型（assets/js/eclipses.js 綁這裡的 class）。"""
    tg = _lab_toggles([("shadows", "Shadows", "影子", True), ("plane", "Earth's orbit plane", "黃道面", True)])
    return f'''<div class="astro-lab ecl-lab rvl" data-eclipse-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the Sun, Earth and Moon on real dates · 照真實日期運轉的日地月 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="close" aria-pressed="true">Close-up · 近看</button>
        <button type="button" data-view="year" aria-pressed="false">Whole year · 全年</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards and the eclipse list below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片與日月食清單一樣能用。</span></p>
    </div>
    <aside class="al-sky ec-aside">
      <p class="al-sky-k">View from Earth · 從地球看</p>
      <div class="ec-where" role="group" aria-label="Where · 從哪裡看">
        <button type="button" data-where="best" aria-pressed="true">Best spot on Earth · 最佳地點</button>
        <button type="button" data-where="tw" aria-pressed="false">Taiwan · 台灣</button>
      </div>
      <div class="ec-views">
        <figure class="ec-fig"><div class="ec-box"><canvas class="ec-sun-cv" aria-label="The Sun as seen from Earth · 從地球看太陽"></canvas></div><figcaption class="ec-sun-cap">Sun · 太陽</figcaption></figure>
        <figure class="ec-fig"><div class="ec-box"><canvas class="ec-moon-cv" aria-label="The Moon as seen from Earth · 從地球看月亮"></canvas></div><figcaption class="ec-moon-cap">Moon · 月亮</figcaption></figure>
      </div>
      <div class="al-readout ec-readout" aria-live="polite">
        <p class="ec-date"></p>
        <p class="ec-status"></p>
        <p class="ec-sub"></p>
        <dl>
          <div><dt>Moon phase · 月相</dt><dd class="ec-phase"></dd></div>
          <div><dt>Lunar date · 農曆</dt><dd class="ec-lunar"></dd></div>
          <div class="ec-wide"><dt>Moon's height · 月亮的高低</dt><dd class="ec-lat"></dd></div>
          <div class="ec-wide"><dt>Sun's distance from a node · 太陽離交點</dt><dd><span class="ec-node"></span> <span class="ec-season" hidden>Eclipse season · 食季中</span></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.0833333" aria-pressed="false">2 hours/s · 慢</button>
        <button type="button" data-speed="2" aria-pressed="true">2 days/s · 中</button>
        <button type="button" data-speed="10" aria-pressed="false">10 days/s · 快</button>
      </div>
      <div class="ec-jump" role="group" aria-label="Jump · 跳到">
        <button type="button" class="ec-prev">&#9664; Previous eclipse · 上一次</button>
        <button type="button" class="ec-now">Now · 現在</button>
        <button type="button" class="ec-next">Next eclipse &#9654; · 下一次</button>
      </div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Timeline · 時間軸 <em><i class="ec-dot ec-solar"></i>solar eclipse 日食　<i class="ec-dot ec-lunar"></i>lunar eclipse 月食　<i class="ec-dot ec-season-dot"></i>eclipse season 食季</em></span>
      <input type="range" class="ec-time" min="0" max="9600" step="1" value="0" aria-label="Date · 日期">
      <div class="ec-track"></div>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
</div>'''

def render_season_lab(lesson):
    """第三課：照真實日期繞太陽的地球（assets/js/seasons.js 綁這裡的 class）。"""
    tg = _lab_toggles([("tilt", "Axis tilt", "地軸傾斜", True), ("lines", "Latitude lines", "緯線", True),
                       ("ghosts", "Four key dates", "四個轉折點", True)])
    keys = "".join(
        f'<button type="button" class="al-chip se-key" data-key="{k["key"]}">{season_svg(k["key"], 30)}'
        f'<span class="al-chip-en">{html.escape(k["en"])}</span><span class="al-chip-zh">{html.escape(k["zh"])}</span></button>'
        for k in lesson["keys"])
    places = [("changhua", "Changhua", "彰化", True), ("sydney", "Sydney", "雪梨", False),
              ("singapore", "Singapore", "新加坡", False), ("tromso", "Tromsø", "特羅姆瑟", False)]
    pl = "".join(f'<button type="button" data-place="{k}" aria-pressed="{"true" if on else "false"}">{en} · {zh}</button>'
                 for k, en, zh, on in places)
    return f'''<div class="astro-lab se-lab rvl" data-season-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of Earth going around the Sun on real dates · 照真實日期繞太陽的地球 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="orbit" aria-pressed="true">Around the Sun · 繞太陽</button>
        <button type="button" data-view="close" aria-pressed="false">Close-up · 近看地球</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky se-aside">
      <p class="al-sky-k">From the ground · 從地面看</p>
      <div class="se-where" role="group" aria-label="Place · 地點">{pl}</div>
      <figure class="se-fig"><div class="se-box"><canvas class="se-path-cv" aria-label="The Sun's path across the sky · 太陽在天空中的軌跡"></canvas></div><figcaption class="se-path-cap"></figcaption></figure>
      <figure class="se-fig"><div class="se-box"><canvas class="se-beam-cv" aria-label="How spread out the noon sunlight is · 正午陽光攤開的程度"></canvas></div><figcaption class="se-beam-cap"></figcaption></figure>
    </aside>
  </div>
  <div class="se-strip" aria-live="polite">
    <div class="se-cell"><p class="ec-date se-date-t"></p><p class="se-whatif" hidden>What if Earth had no tilt? · 假設地軸沒有傾斜</p>
      <dl><div><dt>Solar term · 節氣</dt><dd class="se-term"></dd></div></dl></div>
    <div class="se-cell"><dl><div><dt>Season · 季節</dt><dd class="se-season"></dd></div>
      <div><dt>Noon Sun straight overhead at · 太陽直射</dt><dd class="se-dec"></dd></div></dl></div>
    <div class="se-cell"><p class="se-place"></p>
      <dl class="se-2col"><div><dt>Sunrise · 日出</dt><dd data-r="rise"></dd></div><div><dt>Sunset · 日落</dt><dd data-r="set"></dd></div>
      <div><dt>Daylight · 晝長</dt><dd data-r="len"></dd></div><div><dt>Noon Sun · 正午高度</dt><dd data-r="noon"></dd></div></dl></div>
    <div class="se-cell"><dl><div><dt>Earth–Sun distance · 地日距離</dt><dd class="se-dist"></dd></div></dl></div>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.0416667" aria-pressed="false">1 hour/s · 看自轉</button>
        <button type="button" data-speed="5" aria-pressed="true">5 days/s · 中</button>
        <button type="button" data-speed="20" aria-pressed="false">20 days/s · 快</button>
      </div>
      <div class="ec-jump"><button type="button" class="ec-now se-now">Today · 今天</button></div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Date · 日期</span>
      <input type="range" class="ec-time se-date" min="0" max="8760" step="1" value="0" aria-label="Date · 日期">
      <div class="ec-track se-track"></div>
    </div>
    <label class="ec-slider se-time-row"><span class="ec-slider-k">Time of day, Taiwan time · 一天中的時刻（台灣時間）</span>
      <input type="range" class="ec-time se-time" min="0" max="1439" step="1" value="720"></label>
    <div class="al-chips se-chips">{keys}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
</div>'''

def render_tide_lab(lesson):
    """第四課：被月亮與太陽拉長的海洋（assets/js/tides.js 綁這裡的 class）。"""
    tg = _lab_toggles([("sun", "Sun's tide", "太陽的潮汐", True), ("arrows", "Tidal force arrows", "潮汐力箭頭", True),
                       ("labels", "Labels", "標示", True)])
    chips = "".join(
        f'<button type="button" class="al-chip td-phase-go" data-target="{m["target"]}">{moon_svg(m["elong"], 30)}'
        f'<span class="al-chip-en">{html.escape(m["en"])}</span><span class="al-chip-zh">{html.escape(m["tide_zh"])}</span></button>'
        for m in lesson["moontides"])
    return f'''<div class="astro-lab td-lab rvl" data-tide-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of Earth's oceans stretched by the Moon and Sun · 被月亮與太陽拉長的海洋 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky se-aside td-aside">
      <p class="al-sky-k">Why two bulges? · 為什麼有兩個鼓起？</p>
      <div class="se-where td-why" role="group" aria-label="Why two bulges · 為什麼有兩個鼓起">
        <button type="button" data-why="pull" aria-pressed="true">1. Pull · 引力</button>
        <button type="button" data-why="stretch" aria-pressed="false">2. Stretch · 拉伸</button>
      </div>
      <figure class="se-fig"><div class="se-box"><canvas class="td-why-cv" aria-label="Why there are two tidal bulges · 為什麼有兩個潮汐鼓起"></canvas></div><figcaption class="td-why-cap"></figcaption></figure>
      <p class="al-sky-k td-k2">Idealized tide at Changhua · 彰化的理想化潮汐</p>
      <div class="se-where td-span" role="group" aria-label="Time span · 時間範圍">
        <button type="button" data-span="2" aria-pressed="true">2 days · 2 天</button>
        <button type="button" data-span="30" aria-pressed="false">1 month · 1 個月</button>
      </div>
      <figure class="se-fig"><div class="se-box"><canvas class="td-curve-cv" aria-label="Idealized tide curve · 理想化潮汐曲線"></canvas></div>
        <figcaption>Moon and Sun only. Real tides on the coast come hours later and are shaped by the sea floor, so this is not a tide table. · 只算月亮與太陽；真實海岸的潮汐會晚好幾小時、受海底地形影響，這不是潮汐表。</figcaption></figure>
    </aside>
  </div>
  <div class="se-strip" aria-live="polite">
    <div class="se-cell"><p class="ec-date td-date"></p>
      <dl><div><dt>Moon phase · 月相</dt><dd><span class="td-phase"></span> <span class="td-lunar"></span></dd></div></dl></div>
    <div class="se-cell"><dl><div><dt>Today's tide · 今天的潮</dt><dd><b class="td-kind"></b><span class="td-kind-sub"></span></dd></div>
      <div><dt>Sun–Moon angle · 日月夾角</dt><dd class="td-angle"></dd></div></dl></div>
    <div class="se-cell"><dl><div><dt>Tide size · 潮汐大小</dt><dd class="td-size"></dd></div>
      <div><dt>Moon's distance · 月地距離</dt><dd class="td-dist"></dd></div></dl></div>
    <div class="se-cell td-safe"><p><b>&#9888; Going to the tidal flats? · 要去潮間帶？</b>Check the official tide forecast from the <a href="https://www.cwa.gov.tw/" target="_blank" rel="noopener">Central Weather Administration</a> first, and leave well before high tide.<span>出發前先查<a href="https://www.cwa.gov.tw/" target="_blank" rel="noopener">中央氣象署</a>的潮汐預報，滿潮前提早離開。</span></p></div>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.0416667" aria-pressed="false">1 hour/s · 看自轉</button>
        <button type="button" data-speed="0.25" aria-pressed="true">6 hours/s · 中</button>
        <button type="button" data-speed="2" aria-pressed="false">2 days/s · 看月相</button>
      </div>
      <div class="ec-jump"><button type="button" class="ec-now td-now">Now · 現在</button></div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Date · 日期</span>
      <input type="range" class="ec-time td-time" min="0" max="1080" step="1" value="0" aria-label="Date · 日期">
      <div class="ec-track se-track td-track"></div>
    </div>
    <label class="ec-slider se-time-row"><span class="ec-slider-k">Time of day, Taiwan time · 一天中的時刻（台灣時間）</span>
      <input type="range" class="ec-time td-tod" min="0" max="1439" step="1" value="720"></label>
    <div class="al-chips se-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
</div>'''

def render_star_lab(lesson):
    """第五課：真實亮星的天球＋今晚彰化的星空（assets/js/constellations.js 綁這裡的 class）。"""
    tg = _lab_toggles([("lines", "Constellation lines", "星座連線", True), ("names", "Names", "名稱", True),
                       ("tri", "Seasonal triangles", "季節大三角", True), ("chinese", "Chinese star groups", "中國星官", False)])
    chips = "".join(
        f'<button type="button" class="al-chip cn-season" data-season="{i}">{star_svg(26)}'
        f'<span class="al-chip-en">{html.escape(k["chip_en"])}</span><span class="al-chip-zh">{html.escape(k["chip_zh"])}</span></button>'
        for i, k in enumerate(lesson["skies"]))
    return f'''<div class="astro-lab cn-lab rvl" data-star-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of Earth going around the Sun inside a sphere of real stars · 地球在真實星空裡繞太陽的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="orbit" aria-pressed="true">Around the Sun · 繞太陽</button>
        <button type="button" data-view="night" aria-pressed="false">Night side · 看夜側</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sky chart and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；星空圖與下方的卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky cn-aside">
      <p class="al-sky-k">Tonight over Changhua · 今晚彰化的星空</p>
      <div class="cn-dome-box"><canvas class="cn-dome-cv" aria-label="All-sky chart over Changhua at the chosen time · 所選時刻彰化上空的全天星圖"></canvas></div>
      <p class="al-hemi-note">Lie on your back, head to the north: east is on your left. · 躺下、頭朝北：東邊在你的左手邊。</p>
      <div class="al-readout ec-readout cn-readout" aria-live="polite">
        <p class="cn-badge" hidden><b></b></p>
        <p class="ec-date cn-date"></p>
        <p class="ec-sub cn-skystate"></p>
        <dl>
          <div><dt>Sun is in front of · 太陽在</dt><dd class="cn-sun"></dd></div>
          <div><dt>Up all night · 整夜可見</dt><dd class="cn-opp"></dd></div>
          <div class="ec-wide"><dt>Due south now · 現在正南方</dt><dd class="cn-south"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.0416667" aria-pressed="false">1 hour/s · 看一夜</button>
        <button type="button" data-speed="5" aria-pressed="true">5 days/s · 中</button>
        <button type="button" data-speed="20" aria-pressed="false">20 days/s · 快</button>
      </div>
      <div class="ec-jump"><button type="button" class="cn-tonight">Tonight 9 p.m. · 今晚 9 點</button><button type="button" class="ec-now cn-now">Now · 現在</button></div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Date · 日期</span>
      <input type="range" class="ec-time cn-date-sl" min="0" max="8760" step="1" value="0" aria-label="Date · 日期">
      <div class="ec-track se-track cn-track"></div>
    </div>
    <label class="ec-slider se-time-row"><span class="ec-slider-k">Time of day, Taiwan time · 一天中的時刻（台灣時間）</span>
      <input type="range" class="ec-time cn-time" min="0" max="1439" step="1" value="1260"></label>
    <div class="al-chips se-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_north_lab(lesson):
    """第六課：地軸、北極星與緯度（assets/js/north-star.js 綁這裡的 class）。"""
    tg = _lab_toggles([("trails", "Star trails", "星軌", True), ("lines", "Constellation lines", "星座連線", True),
                       ("ruler", "Fist ruler", "拳頭量角尺", True)])
    chips = "".join(
        f'<button type="button" class="al-chip ns-season" data-season="{i}">{polaris_svg(26)}'
        f'<span class="al-chip-en">{html.escape(k["chip_en"])}</span><span class="al-chip-zh">{html.escape(k["chip_zh"])}</span></button>'
        for i, k in enumerate(lesson["dipper"]))
    places = [("changhua", "Changhua", "彰化"), ("singapore", "Singapore", "新加坡"), ("tromso", "Tromsø", "特羅姆瑟"),
              ("pole", "North Pole", "北極點"), ("sydney", "Sydney", "雪梨"), ("mine", "My location", "我的位置")]
    pl = "".join(f'<button type="button" data-place="{k}" aria-pressed="{"true" if k == "changhua" else "false"}">{en} · {zh}</button>'
                 for k, en, zh in places)
    return f'''<div class="astro-lab ns-lab rvl" data-north-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of Earth's axis pointing at the North Star · 地軸指向北極星的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="space" aria-pressed="true">From space · 從太空看</button>
        <button type="button" data-view="sphere" aria-pressed="false">Your sky · 你的天空</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sky chart and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；星空圖與下方的卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky ns-aside">
      <p class="al-sky-k">Where is north? · 北方在哪裡？</p>
      <div class="se-where ns-where" role="group" aria-label="Place · 地點">{pl}</div>
      <p class="ns-geo-msg" hidden></p>
      <figure class="se-fig"><div class="se-box"><canvas class="ns-chart-cv" aria-label="The northern sky from the chosen place · 所選地點面向北方的星空"></canvas></div>
        <figcaption class="ns-chart-cap"></figcaption></figure>
      <div class="al-readout ec-readout ns-readout" aria-live="polite">
        <p class="cn-badge ns-badge" hidden><b></b></p>
        <p class="ec-date ns-date"></p>
        <p class="se-place ns-place"></p>
        <dl>
          <div class="ec-wide"><dt>North Star height · 北極星高度</dt><dd class="ns-polaris"></dd></div>
          <div class="ec-wide"><dt>Never set here · 在這裡永不落下</dt><dd class="ns-never-t"></dd></div>
          <div class="ec-wide"><dt>Big Dipper now · 北斗七星</dt><dd class="ns-dipper"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.0416667" aria-pressed="true">1 hour/s · 看一夜</button>
        <button type="button" data-speed="0.25" aria-pressed="false">6 hours/s · 快</button>
        <button type="button" data-speed="5" aria-pressed="false">5 days/s · 看四季</button>
      </div>
      <div class="ec-jump"><button type="button" class="ns-tonight">Tonight 8 p.m. · 今晚 8 點</button><button type="button" class="ec-now ns-now">Now · 現在</button></div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Date · 日期</span>
      <input type="range" class="ec-time ns-date-sl" min="0" max="8760" step="1" value="0" aria-label="Date · 日期">
      <div class="ec-track se-track ns-track"></div>
    </div>
    <label class="ec-slider se-time-row"><span class="ec-slider-k">Time of day, local time · 一天中的時刻（當地時間）</span>
      <input type="range" class="ec-time ns-time" min="0" max="1439" step="1" value="1200"></label>
    <div class="al-chips se-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

_PLANET_CSS = {"mercury": "#b9b2a6", "venus": "#fff1c4", "mars": "#ff7a4a", "jupiter": "#e8c9a0", "saturn": "#f0dca0"}

def render_planet_lab(lesson):
    """第七課：行星與逆行（assets/js/planets-lab.js 綁這裡的 class）。"""
    tg = _lab_toggles([("sight", "Numbered sight lines", "編號視線", True), ("trail", "Path in the sky", "天上的路徑", True),
                       ("lines", "Constellation lines", "星座連線", True)])
    chips = "".join(
        f'<button type="button" class="al-chip pl-chip" data-planet="{p["key"]}">{planet_svg(26, _PLANET_CSS[p["key"]], p["key"] == "saturn")}'
        f'<span class="al-chip-en">{html.escape(p["en"])}</span><span class="al-chip-zh">{html.escape(p["zh"])}</span></button>'
        for p in lesson["wanderers"])
    return f'''<div class="astro-lab pl-lab rvl" data-planet-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the planets going around the Sun on real dates · 照真實日期繞太陽的行星 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="above" aria-pressed="true">Above the orbits · 俯瞰軌道</button>
        <button type="button" data-view="ride" aria-pressed="false">Ride with Earth · 跟著地球</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The path chart and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；路徑圖與下方的卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky pl-aside">
      <p class="al-sky-k">Its path among the stars · 在星空中的路徑</p>
      <figure class="se-fig"><div class="se-box"><canvas class="pl-path-cv" aria-label="The planet's path among the stars · 行星在星空中的路徑"></canvas></div>
        <figcaption>East is on the left, as when you face south. Teal: moving east as usual. Orange: moving backward (west). Dots mark the 1st of each month. · 東在左邊（像面向南方看天空）。青色：照常往東走；橘色：往西倒退。圓點是每月 1 日。</figcaption></figure>
      <div class="al-readout ec-readout pl-readout" aria-live="polite">
        <p class="ec-date pl-date"></p>
        <p class="se-place pl-name"></p>
        <dl>
          <div class="ec-wide"><dt>Moving · 移動方向</dt><dd class="pl-move"></dd></div>
          <div><dt>In front of · 在哪個星座</dt><dd class="pl-con"></dd></div>
          <div><dt>Brightness · 亮度</dt><dd class="pl-mag"></dd></div>
          <div class="ec-wide"><dt>Distance from Earth · 與地球距離</dt><dd class="pl-dist"></dd></div>
          <div class="ec-wide"><dt>When to look · 什麼時候看</dt><dd class="pl-vis"></dd></div>
          <div class="ec-wide"><dt>Retrograde · 逆行</dt><dd class="pl-next"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="2" aria-pressed="false">2 days/s · 慢</button>
        <button type="button" data-speed="10" aria-pressed="true">10 days/s · 中</button>
        <button type="button" data-speed="30" aria-pressed="false">30 days/s · 快</button>
      </div>
      <div class="ec-jump">
        <button type="button" class="pl-prev">&#9664; Previous · 上一次逆行</button>
        <button type="button" class="ec-now pl-now">Now · 現在</button>
        <button type="button" class="pl-nextbtn">Next retrograde &#9654; · 下一次</button>
      </div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Timeline · 時間軸 <em><i class="ec-dot ec-season-dot pl-band-dot"></i>retrograde 逆行期間</em></span>
      <input type="range" class="ec-time pl-time" min="0" max="1460" step="1" value="365" aria-label="Date · 日期">
      <div class="ec-track pl-track"></div>
    </div>
    <div class="al-chips se-chips pl-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_sundial_lab(lesson):
    """第八課：竿影與日晷（assets/js/sundial.js 綁這裡的 class）。"""
    tg = _lab_toggles([("marks", "Hour marks", "時刻刻度", True), ("path", "Sun's path", "太陽軌跡", True),
                       ("solst", "Solstice shadows", "冬夏至的影子", True), ("fig8", "Clock noon every day", "每天 12:00 的太陽", False)])
    chips = "".join(
        f'<button type="button" class="al-chip sd-key" data-key="{i}">{sundial_svg(26)}'
        f'<span class="al-chip-en">{html.escape(k["en"])}</span><span class="al-chip-zh">{html.escape(k["zh"])} <b class="sd-key-d"></b></span></button>'
        for i, k in enumerate(lesson["sd_keys"]))
    return f'''<div class="astro-lab sd-lab rvl" data-sundial-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a shadow stick and a sundial in Changhua · 彰化的竿影與日晷 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="Instrument · 儀器">
        <button type="button" data-mode="stick" aria-pressed="true">Shadow stick · 立竿見影</button>
        <button type="button" data-mode="dial" aria-pressed="false">Sundial · 赤道式日晷</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The clock comparison and the table below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；時鐘對照與下方的表格一樣能用。</span></p>
    </div>
    <aside class="al-sky sd-aside">
      <p class="al-sky-k">Sundial or clock? · 日晷還是時鐘？</p>
      <p class="cn-badge sd-badge" hidden><b></b></p>
      <p class="ec-date sd-date-t"></p>
      <div class="sd-clocks"><div><span>Clock · 時鐘</span><b class="sd-clock"></b></div><div><span>Sundial · 日晷</span><b class="sd-dialtime"></b></div></div>
      <p class="sd-diff"></p>
      <p class="sd-why"></p>
      <figure class="se-fig"><div class="se-box"><canvas class="sd-eot-cv" aria-label="How far a Changhua sundial is from the clock through the year · 一年中彰化日晷和時鐘差多少"></canvas></div>
        <figcaption>Above zero: the sundial is ahead of the clock. Below: behind. · 零以上：日晷比時鐘快；以下：比時鐘慢。</figcaption></figure>
      <div class="al-readout ec-readout sd-readout" aria-live="polite"><dl>
        <div class="ec-wide"><dt>Solar noon · 太陽正午</dt><dd class="sd-noon"></dd></div>
        <div class="ec-wide"><dt>Noon shadow · 正午影長</dt><dd class="sd-shadow"></dd></div>
        <div class="ec-wide"><dt>Sun now · 現在的太陽</dt><dd class="sd-sun"></dd></div>
      </dl></div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.0069444" aria-pressed="false">10 min/s · 慢</button>
        <button type="button" data-speed="0.0416667" aria-pressed="true">1 hour/s · 看一天</button>
        <button type="button" data-speed="3" aria-pressed="false">3 days/s · 同一時刻</button>
      </div>
      <div class="ec-jump"><button type="button" class="sd-noonbtn">Solar noon · 太陽正午</button><button type="button" class="ec-now sd-now">Now · 現在</button></div>
    </div>
    <div class="ec-slider">
      <span class="ec-slider-k">Date · 日期</span>
      <input type="range" class="ec-time sd-date" min="0" max="8760" step="1" value="0" aria-label="Date · 日期">
      <div class="ec-track se-track sd-track"></div>
    </div>
    <label class="ec-slider se-time-row"><span class="ec-slider-k">Clock time, Taiwan · 時鐘時間（台灣）</span>
      <input type="range" class="ec-time sd-time" min="300" max="1200" step="1" value="720"></label>
    <div class="al-chips se-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_solar_lab(lesson):
    """第九課：太陽系的大小與距離（assets/js/solar.js 綁這裡的 class）。"""
    tg = _lab_toggles([("dots", "Position dots", "位置圓點", True), ("orbits", "Orbits", "軌道", True)])
    presets = "".join(
        f'<button type="button" class="al-chip ss-preset" data-log="{v}">{solar_svg(26)}'
        f'<span class="al-chip-en">{en}</span><span class="al-chip-zh">{zh}</span></button>'
        for v, en, zh in ((0, "True size", "真實大小"), (1, "× 10", "放大 10 倍"), (2, "× 100", "放大 100 倍"), (3, "× 1,000", "放大 1000 倍")))
    return f'''<div class="astro-lab ss-lab rvl" data-solar-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the solar system with true distances · 真實距離的太陽系 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="Zoom · 範圍">
        <button type="button" data-view="inner" aria-pressed="true">Inner · 內行星</button>
        <button type="button" data-view="jupiter" aria-pressed="false">To Jupiter · 到木星</button>
        <button type="button" data-view="all" aria-pressed="false">All · 到海王星</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The distance table and the scale-model calculator below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；距離表與下方的比例模型計算器一樣能用。</span></p>
    </div>
    <aside class="al-sky ss-aside">
      <p class="al-sky-k">Size and light · 大小與光</p>
      <p class="sd-diff ss-factor"></p>
      <p class="sd-why ss-size-note"></p>
      <p class="al-sky-k ss-k2">A flash of light from the Sun · 太陽發出的一道光</p>
      <p class="sd-why ss-timer"></p>
      <ol class="ss-log"></ol>
      <p class="al-sky-k ss-k2">Today's distances · 今天的距離</p>
      <div class="ss-today-wrap"><table class="ss-today"><thead><tr><th>Planet · 行星</th><th>From Sun (AU) · 離太陽</th><th>From Earth (million km) · 離地球（百萬公里）</th><th>Light from there · 光要走多久</th></tr></thead><tbody></tbody></table></div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Light speed · 光速">
        <button type="button" data-speed="60" aria-pressed="true">Light ×60 · 光速 60 倍</button>
        <button type="button" data-speed="600" aria-pressed="false">×600</button>
        <button type="button" data-speed="6000" aria-pressed="false">×6,000</button>
      </div>
      <div class="ec-jump"><button type="button" class="ec-now ss-reset">Clear the light · 清除光環</button></div>
    </div>
    <label class="ec-slider"><span class="ec-slider-k">Planet size · 行星大小 <em>true size 真實大小 ← → ×1,000</em></span>
      <input type="range" class="ec-time ss-size" min="0" max="3" step="0.01" value="3"></label>
    <div class="al-chips se-chips">{presets}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_distance_lab(lesson):
    """第十課：視差與恆星距離（assets/js/star-distance.js 綁這裡的 class）。"""
    tg = _lab_toggles([("sight", "Sight lines", "視線", True), ("faint", "Stars too faint to see", "肉眼看不到的星", True),
                       ("err", "Error bars", "誤差範圍", True)])
    chips = "".join(
        f'<button type="button" class="al-chip dl-chip" data-star="{n["key"]}">{star_svg(26)}'
        f'<span class="al-chip-en">{html.escape(n["en"])}</span><span class="al-chip-zh">{html.escape(n["zh"])}</span></button>'
        for n in lesson["neighbors"])
    return f'''<div class="astro-lab dl-lab rvl" data-distance-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of parallax and the real positions of nearby stars · 視差與附近恆星真實位置的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 範圍">
        <button type="button" data-view="parallax" aria-pressed="true">Parallax · 視差</button>
        <button type="button" data-view="20" aria-pressed="false">20 ly · 光年</button>
        <button type="button" data-view="100" aria-pressed="false">100 ly</button>
        <button type="button" data-view="2000" aria-pressed="false">2,000 ly</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The telescope view, the star cards, and tonight's list still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；望遠鏡畫面、星星卡片與今晚的清單一樣能用。</span></p>
    </div>
    <aside class="al-sky dl-aside">
      <p class="al-sky-k">Through a telescope · 望遠鏡裡看到的</p>
      <figure class="se-fig"><div class="se-box"><canvas class="dl-scope-cv" aria-label="The star's yearly parallax loop against distant stars · 恆星一年的視差小圈"></canvas></div>
        <figcaption>One year of the star's real shift, north up and east left, at the same zoom for every star. Blue circle: today. Orange: half a year later. · 這顆星一年的真實位移（北上東左），每顆星放大倍率相同。藍圈：今天；橘圈：半年後。</figcaption></figure>
      <div class="al-readout ec-readout dl-readout" aria-live="polite">
        <p class="ec-date dl-date"></p>
        <p class="se-place dl-name"></p>
        <dl>
          <div class="ec-wide"><dt>Parallax · 視差</dt><dd class="dl-plx"></dd></div>
          <div class="ec-wide"><dt>Distance · 距離</dt><dd class="dl-dist"></dd></div>
          <div class="ec-wide"><dt>The light you see left in · 光出發於</dt><dd class="dl-left"></dd></div>
          <div class="ec-wide"><dt>As small as · 有多小</dt><dd class="dl-coin"></dd></div>
          <div class="ec-wide"><dt>Shift compared with Proxima · 和比鄰星比</dt><dd class="dl-cmp"></dd></div>
        </dl>
        <p class="sd-why dl-count"></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="ec-jump">
        <button type="button" class="dl-half">Half a year later &#9654; · 半年後</button>
        <button type="button" class="ec-now dl-now">Today · 今天</button>
      </div>
    </div>
    <label class="ec-slider"><span class="ec-slider-k">Earth in its orbit · 地球在軌道上 <em>today 今天 → one year later 一年後</em></span>
      <input type="range" class="ec-time dl-time" min="0" max="365" step="1" value="0" aria-label="Days from today · 從今天起的天數"></label>
    <div class="al-chips se-chips dl-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_meteor_lab(lesson):
    """第十一課：流星雨（assets/js/meteors-lab.js 綁這裡的 class）。"""
    tg = _lab_toggles([("dust", "Dust trail", "碎屑帶", True)])
    chips = "".join(
        f'<button type="button" class="al-chip mt-chip" data-shower="{s["key"]}">{meteor_svg(26)}'
        f'<span class="al-chip-en">{html.escape(s["en"])}</span><span class="al-chip-zh">{html.escape(s["zh"].replace("流星雨", ""))}</span></button>'
        for s in lesson["showers"])
    return f'''<div class="astro-lab mt-lab rvl" data-meteor-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of Earth passing through a comet's dust trail · 地球穿過彗星碎屑帶的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="whole" aria-pressed="true">Orbits · 軌道</button>
        <button type="button" data-view="earth" aria-pressed="false">Near Earth · 靠近地球</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sky chart and the list of upcoming showers still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；星圖與接下來的流星雨清單一樣能用。</span></p>
    </div>
    <aside class="al-sky mt-aside">
      <p class="al-sky-k">The peak night over Changhua · 極大夜的彰化天空</p>
      <figure class="se-fig"><div class="se-box"><canvas class="mt-sky-cv" aria-label="All-sky chart over Changhua with meteors flying out of the radiant · 彰化全天星圖，流星從輻射點射出"></canvas></div>
        <figcaption class="mt-sky-k"></figcaption></figure>
      <div class="ec-where mt-hour" role="group" aria-label="Time · 時刻">
        <button type="button" data-hour="best" aria-pressed="true">Best · 最佳</button>
        <button type="button" data-hour="eve" aria-pressed="false">9 p.m.</button>
        <button type="button" data-hour="mid" aria-pressed="false">Midnight · 午夜</button>
        <button type="button" data-hour="pre" aria-pressed="false">4 a.m.</button>
      </div>
      <div class="al-readout ec-readout mt-readout" aria-live="polite">
        <p class="se-place mt-name"></p>
        <dl>
          <div class="ec-wide"><dt>Peak · 極大</dt><dd class="mt-peak"></dd></div>
          <div class="ec-wide"><dt>Parent · 母天體</dt><dd class="mt-parentr"></dd></div>
          <div class="ec-wide"><dt>Radiant · 輻射點</dt><dd class="mt-rad"></dd></div>
          <div class="ec-wide"><dt>How many · 能看到幾顆</dt><dd class="mt-rate"></dd></div>
          <div class="ec-wide"><dt>Moon · 月光</dt><dd class="mt-moon"></dd></div>
          <div class="ec-wide"><dt>Speed · 速度</dt><dd class="mt-speed"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="2" aria-pressed="false">2 days/s · 慢</button>
        <button type="button" data-speed="10" aria-pressed="true">10 days/s · 中</button>
        <button type="button" data-speed="30" aria-pressed="false">30 days/s · 快</button>
      </div>
      <div class="ec-jump">
        <button type="button" class="mt-topeak">Jump to the peak &#9654; · 跳到極大</button>
        <button type="button" class="ec-now mt-now">Today · 今天</button>
      </div>
    </div>
    <label class="ec-slider"><span class="ec-slider-k">Earth's date · 地球的日期 <em>a month ago 一個月前 → a year from now 一年後</em></span>
      <input type="range" class="ec-time mt-time" min="-30" max="365" step="1" value="0" aria-label="Days from today · 從今天起的天數"></label>
    <p class="mt-note sd-why"></p>
    <p class="ec-date mt-date"></p>
    <div class="al-chips se-chips mt-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_color_lab(lesson):
    """第十二課：星星的顏色（assets/js/star-colors.js 綁這裡的 class）。"""
    chips = "".join(
        f'<button type="button" class="al-chip cl-chip" data-star="{p["key"]}"><span class="cl-sw" data-swatch="{p["T"]}" aria-hidden="true"></span>'
        f'<span class="al-chip-en">{html.escape(p["en"])}</span><span class="al-chip-zh">{html.escape(p["zh"])}</span></button>'
        for p in lesson["palette"])
    return f'''<div class="astro-lab cl-lab rvl" data-color-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a star changing color with temperature, and real stars sorted by color · 星星隨溫度變色、真實恆星依顏色排排站的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="heat" aria-pressed="true">Heat a star · 加熱一顆星</button>
        <button type="button" data-view="sort" aria-pressed="false">Sort the stars · 星星排排站</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The spectrum, the star cards, and tonight's list still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；光譜圖、星星卡片與今晚的清單一樣能用。</span></p>
    </div>
    <aside class="al-sky cl-aside">
      <p class="al-sky-k">Its light, color by color · 它的光，一個顏色一個顏色看</p>
      <figure class="se-fig"><div class="se-box"><canvas class="cl-spec-cv" aria-label="The star's spectrum compared with the Sun's · 這顆星與太陽的光譜"></canvas></div>
        <figcaption>How much light the star gives off at each wavelength, scaled to its own peak. Dashed: the Sun. · 這顆星在每個波長發出多少光（以它自己的最高點為準）；虛線是太陽。</figcaption></figure>
      <div class="al-readout ec-readout cl-readout" aria-live="polite">
        <p class="se-place cl-name"></p>
        <dl>
          <div class="ec-wide"><dt>Surface temperature · 表面溫度</dt><dd class="cl-temp"></dd></div>
          <div><dt>Color · 顏色</dt><dd class="cl-color"></dd></div>
          <div><dt>Class · 光譜型</dt><dd class="cl-class"></dd></div>
          <div class="ec-wide"><dt>Brightest light · 最強的光</dt><dd class="cl-peak"></dd></div>
          <div class="ec-wide"><dt>Light from each square meter · 每平方公尺的光</dt><dd class="cl-flux"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play cl-sort" aria-pressed="false">Sort them by color · 依顏色排排站</button>
    </div>
    <label class="ec-slider cl-slider"><span class="ec-slider-k">Surface temperature · 表面溫度 <em>2,000 K → 30,000 K</em></span>
      <input type="range" class="ec-time cl-temp-sl" min="0" max="1" step="0.001" value="0.2" aria-label="Surface temperature · 表面溫度"></label>
    <div class="al-chips se-chips cl-chips">{chips}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_moonface_lab(lesson):
    """第十三課：月亮同一面（assets/js/moon-face.js 綁這裡的 class）。"""
    tg = _lab_toggles([("arrow", "Near-side arrow", "正面箭頭", True), ("boost", "Exaggerate rocking ×3", "放大搖晃 3 倍", False)])
    return f'''<div class="astro-lab mf-lab rvl" data-moonface-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the Moon spinning once for every trip around Earth · 月亮繞地球一圈、自轉一圈的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view mf-mode" role="group" aria-label="The Moon's spin · 月亮的自轉">
        <button type="button" data-mode="locked" aria-pressed="true">Real Moon · 真實</button>
        <button type="button" data-mode="nospin" aria-pressed="false">No spin · 不自轉</button>
        <button type="button" data-mode="fast" aria-pressed="false">Too fast · 轉太快</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. Today's Moon and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方「今天的月亮」與卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky mf-aside">
      <p class="al-sky-k">From Earth · 從地球看</p>
      <div class="al-sky-view"><canvas class="mf-sky-cv al-sky-cv" aria-label="The Moon as seen from Earth in the model · 模型裡從地球看到的月亮"></canvas></div>
      <div class="al-readout ec-readout mf-readout" aria-live="polite">
        <dl>
          <div><dt>Model time · 模型時間</dt><dd class="mf-day"></dd></div>
          <div><dt>Face we see · 看到的面</dt><dd class="mf-face"></dd></div>
          <div class="ec-wide"><dt>Orbits and spins · 公轉與自轉</dt><dd class="mf-spin"></dd></div>
          <div class="ec-wide"><dt>Arrow off the Earth line · 箭頭偏離地月連線</dt><dd class="mf-off"></dd></div>
        </dl>
        <p class="sd-why mf-note"></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="1" aria-pressed="false">1 day/s · 慢</button>
        <button type="button" data-speed="2" aria-pressed="true">2 days/s · 中</button>
        <button type="button" data-speed="6" aria-pressed="false">6 days/s · 快</button>
      </div>
    </div>
    <label class="ec-slider"><span class="ec-slider-k">Days · 天數 <em>two trips around Earth 繞地球兩圈（54.6 天）</em></span>
      <input type="range" class="ec-time mf-time" min="0" max="54.64" step="0.05" value="0" aria-label="Days · 天數"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_milkyway_lab(lesson):
    """第十四課：銀河（assets/js/milky-way.js 綁這裡的 class）。"""
    tg = _lab_toggles([("real", "Real bright stars (From the Sun)", "真實亮星（從太陽看）", True)])
    return f'''<div class="astro-lab mw-lab rvl" data-milkyway-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the Milky Way galaxy with the Sun's position · 銀河系與太陽位置的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="outside" aria-pressed="true">Outside · 從外面看</button>
        <button type="button" data-view="edge" aria-pressed="false">Edge-on · 側面看</button>
        <button type="button" data-view="inside" aria-pressed="false">From the Sun · 從太陽看</button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sky chart and tonight's guide still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；星圖與今晚的指南一樣能用。</span></p>
    </div>
    <aside class="al-sky mw-aside">
      <p class="al-sky-k">The Milky Way over Changhua · 彰化天上的銀河</p>
      <figure class="se-fig"><div class="se-box"><canvas class="mw-sky-cv" aria-label="All-sky chart over Changhua with the Milky Way band · 彰化全天星圖與銀河光帶"></canvas></div>
        <figcaption>North up, east left, like looking straight up. · 北上東左，像躺著往上看。</figcaption></figure>
      <div class="ec-where mw-whenb" role="group" aria-label="Time · 時刻">
        <button type="button" data-when="tonight" aria-pressed="true">Tonight 9 p.m. · 今晚九點</button>
        <button type="button" data-when="now" aria-pressed="false">Now · 現在</button>
        <button type="button" data-when="july" aria-pressed="false">July 15, 9 p.m. · 七月</button>
      </div>
      <div class="al-readout ec-readout mw-readout" aria-live="polite">
        <p class="ec-date mw-when"></p>
        <dl>
          <div class="ec-wide"><dt>Galactic center · 銀河中心</dt><dd class="mw-gcr"></dd></div>
          <div class="ec-wide"><dt>The band passes through · 光帶經過</dt><dd class="mw-band"></dd></div>
          <div class="ec-wide"><dt>Moon · 月亮</dt><dd class="mw-moon"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_illusion_lab(lesson):
    """第十五課：月亮錯覺（assets/js/moon-illusion.js 綁這裡的 class）。"""
    tg = _lab_toggles([("ring", "Measuring ring", "量月環", True), ("scenery", "Houses, hills, and tower", "房子、山與塔", True)])
    return f'''<div class="astro-lab mi-lab rvl" data-illusion-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the Moon rising over Changhua at its true size · 照真實大小、從彰化升起的月亮 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="mi-ring" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="eye" aria-pressed="true">Your eyes · 眼睛</button>
        <button type="button" data-view="tele" aria-pressed="false">Telephoto lens · 長鏡頭</button>
        <button type="button" data-view="space" aria-pressed="false">From space · 從太空看</button>
      </div>
      <p class="al-hint">Drag to look around · 拖曳轉頭看四周</p>
      <button type="button" class="al-home" title="Look at the Moon · 回到月亮" aria-label="Look at the Moon · 回到月亮">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The two-Moon picture and tonight's moonrise still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；兩個月亮的圖與今晚的月出一樣能用。</span></p>
    </div>
    <aside class="al-sky mi-aside">
      <p class="al-sky-k">Which Moon looks bigger? · 哪個月亮看起來比較大？</p>
      <figure class="se-fig"><div class="se-box"><canvas class="mi-ill-cv" aria-label="Two Moons of the same size, one low behind rooftops and one high in an empty sky · 一樣大的兩個月亮，一個在屋頂後、一個在空曠的高空"></canvas></div></figure>
      <div class="ec-where mi-ill" role="group" aria-label="Picture · 圖">
        <button type="button" data-ill="showRuler" aria-pressed="false">Show the ruler · 顯示量尺</button>
        <button type="button" data-ill="hideScene" aria-pressed="false">Hide the rooftops · 拿掉屋頂</button>
      </div>
      <div class="al-readout ec-readout mi-readout" aria-live="polite">
        <p class="ec-date mi-when"></p>
        <dl>
          <div class="ec-wide"><dt>Moon · 月亮</dt><dd class="mi-alt"></dd></div>
          <div class="ec-wide"><dt>Distance from you · 離你多遠</dt><dd class="mi-dist"></dd></div>
          <div class="ec-wide"><dt>Size in the sky · 在天上多大</dt><dd class="mi-size"></dd></div>
          <div class="ec-wide"><dt>Since moonrise · 和月出時比</dt><dd class="mi-grow"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="ec-jump mi-night" role="group" aria-label="Which night · 哪一夜">
        <button type="button" data-night="tonight" aria-pressed="true">Tonight · 今晚</button>
        <button type="button" data-night="full" aria-pressed="false">Next full Moon · 下次滿月</button>
        <button type="button" data-night="super" aria-pressed="false">Biggest full Moon · 最大的滿月</button>
      </div>
    </div>
    <label class="ec-slider"><span class="ec-slider-k">Time · 時間 <em>from moonrise to moonset 從月出到月落（播放：1 秒 20 分鐘）</em></span>
      <input type="range" class="ec-time mi-time" min="0" max="720" step="1" value="0" aria-label="Minutes after moonrise · 月出後幾分鐘"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def render_sunrise_lab(lesson):
    """第十六課：日出的方位（assets/js/sunrise-lab.js 綁這裡的 class）。"""
    tg = _lab_toggles([("trail", "Trail of sunrises", "日出足跡", True), ("paths", "The Sun's daily paths", "太陽每天走的路", True),
                       ("scenery", "Scenery", "景物", True)])
    return f'''<div class="astro-lab sr-lab rvl" data-sunrise-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of where the Sun rises on the horizon through the year · 一年之中太陽在地平線上從哪裡升起的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="ec-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="east" aria-pressed="true">Face east · 面向東方</button>
        <button type="button" data-view="dome" aria-pressed="false">Sky dome · 天空圓頂</button>
      </div>
      <p class="al-hint">Drag to look around · 拖曳轉動視角</p>
      <button type="button" class="al-home" title="Face east again · 回到原本的視角" aria-label="Face east again · 回到原本的視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sunrise chart and today's sunrise still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；一年的日出方位圖與今天的日出一樣能用。</span></p>
    </div>
    <aside class="al-sky sr-aside">
      <p class="al-sky-k">Where the Sun rises, all year · 一年的日出方位</p>
      <figure class="se-fig"><div class="se-box"><canvas class="sr-year-cv" aria-label="Chart of the sunrise direction through the year for Changhua, Taosi, and Singapore · 彰化、陶寺、新加坡一年的日出方位圖"></canvas></div></figure>
      <div class="ec-where sr-place" role="group" aria-label="Place · 地點">
        <button type="button" data-place="changhua" aria-pressed="true">Changhua · 彰化</button>
        <button type="button" data-place="taosi" aria-pressed="false">Taosi · 陶寺</button>
        <button type="button" data-place="singapore" aria-pressed="false">Singapore · 新加坡</button>
      </div>
      <div class="al-readout ec-readout sr-readout" aria-live="polite">
        <p class="ec-date sr-when"></p>
        <dl>
          <div class="ec-wide"><dt>Sunrise · 日出</dt><dd class="sr-rise"></dd></div>
          <div class="ec-wide"><dt>Sunset · 日落</dt><dd class="sr-set"></dd></div>
          <div class="ec-wide"><dt>Since yesterday · 和昨天比</dt><dd class="sr-shift"></dd></div>
          <div class="ec-wide sr-slot-row" hidden><dt>Taosi slot · 陶寺的縫</dt><dd class="sr-slotv"></dd></div>
        </dl>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="ec-jump sr-key" role="group" aria-label="Key days · 關鍵日">
        <button type="button" data-key="ws" aria-pressed="false">Winter solstice · 冬至</button>
        <button type="button" data-key="ve" aria-pressed="false">Spring equinox · 春分</button>
        <button type="button" data-key="ss" aria-pressed="false">Summer solstice · 夏至</button>
        <button type="button" data-key="ae" aria-pressed="false">Fall equinox · 秋分</button>
        <button type="button" data-key="today" aria-pressed="true">Today · 今天</button>
      </div>
    </div>
    <label class="ec-slider"><span class="ec-slider-k">Day of the year · 一年中的哪一天 <em>January 1 to December 31 · 1 月 1 日到 12 月 31 日（播放：1 秒 12 天）</em></span>
      <input type="range" class="ec-time sr-time" min="0" max="364" step="1" value="0" aria-label="Day of the year · 一年中的第幾天"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lesson["lab"])}
  <p class="cn-credit">{lesson["lab"]["credit_html"]}</p>
</div>'''

def _astro_nav(slug):
    ls = ASTRO["lessons"]
    i = next(n for n, l in enumerate(ls) if l["slug"] == slug)
    def side(l, dirn, label):
        if not l:
            return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{ASTRO_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = ls[i - 1] if i > 0 else None
    nxt = ls[i + 1] if i < len(ls) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{ASTRO_BASE}">&#9776; 回天文教育 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def _astro_sec(sid, band, eyebrow, h_en, h_zh, inner, lead=""):
    b = " band" if band else ""
    return (f'<section class="section{b}" id="{sid}"><div class="wrap">\n'
            f'  <p class="eyebrow rvl">{eyebrow}</p>\n'
            f'  <h2 class="rvl d1 sweep">{html.escape(h_en)} <span class="tp-h2-en">{html.escape(h_zh)}</span></h2>\n'
            f'  {lead}{inner}\n</div></section>')

def _astro_activity(act):
    mats = "".join(f'<li>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></li>' for m in act["materials"])
    steps = "".join(f'<li>{html.escape(st["en"])}<span class="zh">{html.escape(st["zh"])}</span></li>' for st in act["steps"])
    return (f'<div class="act rvl">'
            f'<div class="act-mats"><p class="sub-head">You need · 準備材料</p><ul>{mats}</ul></div>'
            f'<div class="act-steps"><p class="sub-head">Steps · 步驟</p><ol>{steps}</ol></div></div>'
            f'<p class="act-tip rvl">{html.escape(act["tip_en"])}<br><span class="zh">{html.escape(act["tip_zh"])}</span></p>')

def _sci_myths(lesson):
    """迷思 vs. 事實（天文教育、人體探索共用）。"""
    return '<div class="myth-grid">' + "".join(
        f'<div class="myth rvl"><p class="myth-x"><b>&#10007; Myth · 迷思</b>{html.escape(m["myth_en"])}'
        f'<span class="zh">{html.escape(m["myth_zh"])}</span></p>'
        f'<p class="myth-v"><b>&#10003; Fact · 事實</b>{html.escape(m["fact_en"])}'
        f'<span class="zh">{html.escape(m["fact_zh"])}</span></p></div>'
        for m in lesson["myths"]) + '</div>'

def _sci_tricks(lesson):
    """記憶口訣（天文教育、人體探索共用）。"""
    return '<div class="trick-grid">' + "".join(
        f'<div class="trick rvl"><h3>{html.escape(t["title_en"])}<span class="zh">{html.escape(t["title_zh"])}</span></h3>'
        f'{_bi(t["body_en"], t["body_zh"])}</div>'
        for t in lesson["tricks"]) + '</div>'

def build_astro_lesson(lesson):
    path = f'{ASTRO_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="astro", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab.get("kind", "phases")
    lab_html = {"eclipses": render_eclipse_lab, "seasons": render_season_lab, "tides": render_tide_lab,
                "stars": render_star_lab, "northstar": render_north_lab, "planets": render_planet_lab,
                "sundial": render_sundial_lab, "solar": render_solar_lab, "distance": render_distance_lab,
                "meteors": render_meteor_lab, "colors": render_color_lab, "moonface": render_moonface_lab,
                "milkyway": render_milkyway_lab, "illusion": render_illusion_lab, "sunrise": render_sunrise_lab}.get(kind, render_moon_lab)(lesson)
    js = {"eclipses": "eclipses", "seasons": "seasons", "tides": "tides", "stars": "constellations",
          "northstar": "north-star", "planets": "planets-lab", "sundial": "sundial", "solar": "solar",
          "distance": "star-distance", "meteors": "meteors-lab", "colors": "star-colors", "moonface": "moon-face", "milkyway": "milky-way",
          "illusion": "moon-illusion", "sunrise": "sunrise-lab"}.get(kind, "moon-phases")

    # 依資料裡有什麼就排什麼段落；band（米色底）交替
    secs = []
    if lesson.get("phases"):
        phase_cards = "".join(
            f'<article class="ph-card rvl">'
            f'<div class="ph-ico">{moon_svg(p["elong"], 64)}</div>'
            f'<h3>{html.escape(p["en"])}<span class="zh">{html.escape(p["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(p["age_en"])} · 農曆{html.escape(p["lunar"])}</span>'
            f'<span>{html.escape(p["rise_en"])} · {html.escape(p["rise_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(p["when_en"])}<br><span class="zh">{html.escape(p["when_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-phase="{i}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for i, p in enumerate(lesson["phases"]))
        secs.append(("phases", "The Eight Phases · 月相八態", "One cycle, about 29.5 days", "一個循環，約 29.5 天",
                     f'<div class="ph-grid stagger">{phase_cards}</div>',
                     _bi(lesson["phases_note_en"], lesson["phases_note_zh"], cls="lead rvl d2")))
    if lesson.get("keys"):
        key_cards = "".join(
            f'<article class="ph-card ky-card rvl">'
            f'<div class="ph-ico">{season_svg(k["key"], 64)}</div>'
            f'<h3>{html.escape(k["en"])}<span class="zh">{html.escape(k["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(k["date_en"])} · {html.escape(k["date_zh"])}</span>'
            f'<span>{html.escape(k["over_en"])} · {html.escape(k["over_zh"])}</span></p>'
            f'<p class="ky-nums"><span><b>{html.escape(k["day"])}</b>Daylight · 晝長</span><span><b>{html.escape(k["noon"])}</b>Noon Sun · 正午高度</span></p>'
            f'<p class="ph-when">{html.escape(k["note_en"])}<br><span class="zh">{html.escape(k["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-key="{k["key"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for k in lesson["keys"])
        secs.append(("keys", "Four Turning Points · 四個轉折點", "Solstices and equinoxes", "二至二分",
                     f'<div class="ph-grid stagger">{key_cards}</div>',
                     _bi(lesson["keys_note_en"], lesson["keys_note_zh"], cls="lead rvl d2")))
    if lesson.get("terms"):
        tm = lesson["terms"]
        def _season_of(lon):
            return ("spring" if lon in (315, 330, 345, 0, 15, 30) else "summer" if 45 <= lon <= 120
                    else "autumn" if 135 <= lon <= 210 else "winter")
        chips = "".join(
            f'<button type="button" class="st-chip st-{_season_of(lon)}{" st-key" if lon % 90 == 0 else ""}" data-term="{lon}">'
            f'<span class="st-zh">{html.escape(zh)}</span><span class="st-en">{html.escape(en)}</span>'
            f'<span class="st-date">—</span></button>'
            for lon, zh, en in tm["list"])
        secs.append(("terms", html.escape(tm["eyebrow"]), tm["title_en"], tm["title_zh"],
                     f'<div class="st-grid rvl" data-terms>{chips}</div>'
                     f'<p class="muted st-cap">Dates from Start of Spring to Major Cold, <span class="st-year"></span>, Taiwan time. The solstices and equinoxes are outlined. · 日期從立春排到大寒（<span class="st-year"></span>，台灣時間）；外框加粗的是二至二分。</p>',
                     _bi(tm["lead_en"], tm["lead_zh"], cls="lead rvl d2")))
    if lesson.get("moontides"):
        mt_cards = "".join(
            f'<article class="ph-card mt-card {"mt-spring" if m["spring"] else "mt-neap"} rvl">'
            f'<div class="ph-ico">{moon_svg(m["elong"], 64)}</div>'
            f'<h3>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></h3>'
            f'<p class="mt-tide"><b>{html.escape(m["tide_en"])}</b>{html.escape(m["tide_zh"])}</p>'
            f'<p class="ph-when">{html.escape(m["why_en"])}<br><span class="zh">{html.escape(m["why_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-target="{m["target"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for m in lesson["moontides"])
        secs.append(("moontides", "Moon Phase and Tide · 月相與潮汐", "Spring tides and neap tides", "大潮與小潮",
                     f'<div class="ph-grid stagger">{mt_cards}</div>',
                     _bi(lesson["moontides_note_en"], lesson["moontides_note_zh"], cls="lead rvl d2")))
    if lesson.get("words"):
        w_cards = "".join(
            f'<div class="tw-card rvl"><h3>{html.escape(w["en"])}<span class="zh">{html.escape(w["zh"])}</span></h3>'
            f'{_bi(w["def_en"], w["def_zh"])}</div>'
            for w in lesson["words"])
        secs.append(("words", "Tide Words · 潮汐用語", "Read a tide table in English", "用英文看懂潮汐表",
                     f'<div class="tw-grid">{w_cards}</div>', ""))
    if lesson.get("types"):
        def _row(k_en, k_zh, en, zh):
            return f'<li><b>{k_en} · {k_zh}</b>{html.escape(en)}<span class="zh">{html.escape(zh)}</span></li>'
        type_cards = "".join(
            f'<article class="ph-card ty-card ty-{t["key"].split(":")[0]} rvl">'
            f'<div class="ph-ico">{eclipse_svg(t["key"], 64)}</div>'
            f'<h3>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></h3>'
            f'<ul class="ty-facts">{_row("When", "時機", t["when_en"], t["when_zh"])}'
            f'{_row("Where", "哪裡看得到", t["where_en"], t["where_zh"])}'
            f'{_row("How long", "多久", t["long_en"], t["long_zh"])}</ul>'
            f'<p class="ty-safe {"ok" if t["safe"] else "no"}"><b>{"&#10003;" if t["safe"] else "&#9888;"}</b>'
            f'{html.escape(t["safe_en"])}<span class="zh">{html.escape(t["safe_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-next-type="{t["key"]}">Watch the next one · 看下一次 <i>&uarr;</i></button>'
            f'</article>'
            for t in lesson["types"])
        secs.append(("types", "Six Kinds of Eclipse · 六種日月食", "Solar or lunar, total or not", "日食或月食，全食或不全",
                     f'<div class="ph-grid ty-grid stagger">{type_cards}</div>', ""))
    if lesson.get("skies"):
        sky_cards = "".join(
            f'<article class="ph-card sk-card sk-{k["key"]} rvl">'
            f'<div class="ph-ico">{star_svg(60)}</div>'
            f'<h3>{html.escape(k["en"])}<span class="zh">{html.escape(k["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(k["when_en"])} · {html.escape(k["when_zh"])}</span></p>'
            f'<ul class="sk-list">' + "".join(
                f'<li><b>{html.escape(c["en"])}</b> {html.escape(c["zh"])}'
                f'{(" · " + html.escape(c["star_en"]) + " " + html.escape(c["star_zh"])) if c.get("star_en") else ""}</li>'
                for c in k["cons"]) + '</ul>'
            f'<p class="ph-when">{html.escape(k["note_en"])}<br><span class="zh">{html.escape(k["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-sky="{i}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for i, k in enumerate(lesson["skies"]))
        secs.append(("skies", "Four Seasons of Stars · 四季星空", "What's up on a 9 p.m. evening", "晚上九點抬頭看得到什麼",
                     f'<div class="ph-grid stagger">{sky_cards}</div>',
                     _bi(lesson["skies_note_en"], lesson["skies_note_zh"], cls="lead rvl d2")))
    if lesson.get("bodies"):
        b_cards = "".join(
            f'<article class="ph-card ss-card rvl">'
            f'<div class="ph-ico">{planet_svg(64, b["css"], b["key"] == "saturn")}</div>'
            f'<h3>{html.escape(b["en"])}<span class="zh">{html.escape(b["zh"])}</span></h3>'
            f'<p class="ky-nums"><span><b>{html.escape(b["across"])}</b>Earths across · 幾個地球寬</span><span><b>{html.escape(b["au"])}</b>AU from the Sun · 離太陽</span></p>'
            f'<p class="ph-meta"><span>Sunlight takes {html.escape(b["light_en"])} · 陽光走 {html.escape(b["light_zh"])}</span>'
            f'<span>Basketball Sun: {html.escape(b["model_en"])} · 籃球太陽：{html.escape(b["model_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(b["note_en"])}<br><span class="zh">{html.escape(b["note_zh"])}</span></p>'
            f'</article>'
            for b in lesson["bodies"])
        secs.append(("bodies", "Eight Planets · 八大行星", "Sizes and distances, side by side", "大小與距離，並排比一比",
                     f'<div class="ph-grid ss-grid stagger">{b_cards}</div>',
                     _bi(lesson["bodies_note_en"], lesson["bodies_note_zh"], cls="lead rvl d2")))
    if lesson.get("neighbors"):
        n_cards = "".join(
            f'<article class="ph-card ss-card dl-card rvl">'
            f'<div class="ph-ico">{star_svg(60)}</div>'
            f'<h3>{html.escape(n["en"])}<span class="zh">{html.escape(n["zh"])}</span></h3>'
            f'<p class="ky-nums"><span><b>{html.escape(n["ly"])}</b>Light-years · 光年</span><span><b>{html.escape(n["plx"])}</b>Parallax · 視差</span></p>'
            f'<p class="dl-depart" data-depart="{n["key"]}"></p>'
            f'<p class="ph-when">{html.escape(n["note_en"])}<br><span class="zh">{html.escape(n["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-star="{n["key"]}">See its parallax · 看它的視差 <i>&uarr;</i></button>'
            f'</article>'
            for n in lesson["neighbors"])
        secs.append(("neighbors", "Near and Far · 由近到遠", "Eight stars, nearest first", "八顆星，由近到遠",
                     f'<div class="ph-grid ss-grid stagger">{n_cards}</div>',
                     _bi(lesson["neighbors_note_en"], lesson["neighbors_note_zh"], cls="lead rvl d2")))
    if lesson.get("showers"):
        sh_cards = "".join(
            f'<article class="ph-card ss-card mt-card rvl">'
            f'<div class="ph-ico">{meteor_svg(60)}</div>'
            f'<h3>{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></h3>'
            f'<p class="ky-nums"><span><b>{html.escape(s["zhr"])}</b>ZHR · 每時數</span><span><b>{html.escape(s["v"])}</b>km/s · 公里／秒</span></p>'
            f'<p class="ph-meta"><span>From {html.escape(s["parent_en"])} · 來自{html.escape(s["parent_zh"])}</span></p>'
            f'<p class="dl-depart" data-next-peak="{s["key"]}"></p>'
            f'<p class="ph-when">{html.escape(s["note_en"])}<br><span class="zh">{html.escape(s["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-shower="{s["key"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for s in lesson["showers"])
        secs.append(("showers", "Eight Showers · 八大流星雨", "A year of meteor showers", "一年的流星雨",
                     f'<div class="ph-grid ss-grid stagger">{sh_cards}</div>',
                     _bi(lesson["showers_note_en"], lesson["showers_note_zh"], cls="lead rvl d2")))
    if lesson.get("palette"):
        pal = "".join(
            f'<article class="ph-card ss-card cl-card rvl">'
            f'<div class="ph-ico"><span class="cl-sw cl-sw-big" data-swatch="{p["T"]}" aria-hidden="true"></span></div>'
            f'<h3>{html.escape(p["en"])}<span class="zh">{html.escape(p["zh"])}</span></h3>'
            f'<p class="ky-nums"><span><b>{p["T"]:,}</b>K · 表面溫度</span><span><b>{html.escape(p["cls"])}</b>Class · 光譜型</span></p>'
            f'<p class="ph-meta"><span>About {round((p["T"] - 273) / 100) * 100:,} °C · 約攝氏 {round((p["T"] - 273) / 100) * 100:,} 度</span></p>'
            f'<p class="ph-when">{html.escape(p["note_en"])}<br><span class="zh">{html.escape(p["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-color="{p["key"]}">See its color · 看它的顏色 <i>&uarr;</i></button>'
            f'</article>'
            for p in lesson["palette"])
        secs.append(("palette", "From Red to Blue · 由紅到藍", "Eight stars, coolest first", "八顆星，由冷到熱",
                     f'<div class="ph-grid ss-grid stagger">{pal}</div>',
                     _bi(lesson["palette_note_en"], lesson["palette_note_zh"], cls="lead rvl d2")))
    if lesson.get("facts"):
        f_cards = "".join(
            f'<article class="ph-card mf-card rvl">'
            f'<div class="ph-ico">{moon_svg(f["elong"], 64)}</div>'
            f'<h3>{html.escape(f["en"])}<span class="zh">{html.escape(f["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(f["meta_en"])} · {html.escape(f["meta_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(f["note_en"])}<br><span class="zh">{html.escape(f["note_zh"])}</span></p>'
            + (f'<button type="button" class="ph-go" data-lab-mode="{f["mode"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if f.get("mode") else "")
            + '</article>'
            for f in lesson["facts"])
        secs.append(("facts", "Near Side, Far Side · 正面與背面", "Four ways to think about the Moon's face", "從四個角度看月亮的臉",
                     f'<div class="ph-grid stagger">{f_cards}</div>',
                     _bi(lesson["facts_note_en"], lesson["facts_note_zh"], cls="lead rvl d2")))
    if lesson.get("galaxy"):
        g_cards = "".join(
            f'<article class="ph-card ss-card mw-card rvl">'
            f'<div class="ph-ico">{milkyway_svg(64)}</div>'
            f'<h3>{html.escape(g["en"])}<span class="zh">{html.escape(g["zh"])}</span></h3>'
            f'<p class="mw-num"><b>{html.escape(g["num"])}</b>{html.escape(g["num_en"])} · {html.escape(g["num_zh"])}</p>'
            f'<p class="ph-when">{html.escape(g["note_en"])}<br><span class="zh">{html.escape(g["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-view="{g["view"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for g in lesson["galaxy"])
        secs.append(("galaxy", "Our Galaxy · 我們的星系", "Four numbers to remember", "記住四個數字",
                     f'<div class="ph-grid ss-grid stagger">{g_cards}</div>',
                     _bi(lesson["galaxy_note_en"], lesson["galaxy_note_zh"], cls="lead rvl d2")))
    if lesson.get("views"):
        v_cards = "".join(
            f'<article class="ph-card ss-card mw-card rvl">'
            f'<div class="ph-ico">{moon_svg(v["elong"], 64)}</div>'
            f'<h3>{html.escape(v["en"])}<span class="zh">{html.escape(v["zh"])}</span></h3>'
            f'<p class="mw-num"><b>{html.escape(v["num"])}</b>{html.escape(v["num_en"])} · {html.escape(v["num_zh"])}</p>'
            f'<p class="ph-when">{html.escape(v["note_en"])}<br><span class="zh">{html.escape(v["note_zh"])}</span></p>'
            + (f'<button type="button" class="ph-go" data-lab-view="{v["view"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if v.get("view") else "")
            + '</article>'
            for v in lesson["views"])
        secs.append(("views", "Four Ways to Look · 四種看法", "Is the Moon really bigger?", "月亮真的變大了嗎？",
                     f'<div class="ph-grid ss-grid stagger">{v_cards}</div>',
                     _bi(lesson["views_note_en"], lesson["views_note_zh"], cls="lead rvl d2")))
    if lesson.get("points"):
        p_cards = "".join(
            f'<article class="ph-card ss-card sr-card sr-{p["key"]} rvl">'
            f'<div class="ph-ico">{sunrise_svg(64, p["off"])}</div>'
            f'<h3>{html.escape(p["en"])}<span class="zh">{html.escape(p["zh"])}</span></h3>'
            f'<p class="mw-num"><b>{html.escape(p["num"])}</b>{html.escape(p["num_en"])} · {html.escape(p["num_zh"])}</p>'
            f'<p class="ph-meta"><span>{html.escape(p["when_en"])} · {html.escape(p["when_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(p["note_en"])}<br><span class="zh">{html.escape(p["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-day="{p["key"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for p in lesson["points"])
        secs.append(("points", "Four Sunrise Points · 四個日出點", "Where the Sun rises in Changhua", "彰化的太陽從哪裡升起",
                     f'<div class="ph-grid ss-grid stagger">{p_cards}</div>',
                     _bi(lesson["points_note_en"], lesson["points_note_zh"], cls="lead rvl d2")))
    if lesson.get("scalecalc"):
        sc = lesson["scalecalc"]
        btns = "".join(f'<button type="button" data-sun-cm="{cm}" aria-pressed="{"true" if cm == 24 else "false"}">{html.escape(en)} · {html.escape(zh)}</button>'
                       for cm, en, zh in ((1.5, "Marble", "彈珠"), (24, "Basketball", "籃球"), (65, "Exercise ball", "健身球"), (140, "As tall as you", "跟你一樣高")))
        secs.append(("model", "Build It at School · 在學校做模型", sc["title_en"], sc["title_zh"],
                     f'<div class="ss-calc rvl" data-scale-calc>'
                     f'<p class="ss-voyager" data-voyager></p>'
                     f'<div class="ss-pick"><span>Make the Sun · 把太陽做成</span><div class="ss-btns">{btns}</div>'
                     f'<label>or type its width · 或輸入直徑 <input type="number" class="ss-sun-cm" value="24" min="0.1" step="0.1" inputmode="decimal"> cm</label></div>'
                     f'<div class="cc-tbl-wrap" data-scale-out></div></div>',
                     _bi(sc["lead_en"], sc["lead_zh"], cls="lead rvl d2")))
    if lesson.get("instruments"):
        i_cards = "".join(
            f'<article class="ph-card sk-card rvl">'
            f'<div class="ph-ico">{sundial_svg(60)}</div>'
            f'<h3>{html.escape(k["en"])}<span class="zh">{html.escape(k["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(k["meta_en"])} · {html.escape(k["meta_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(k["note_en"])}<br><span class="zh">{html.escape(k["note_zh"])}</span></p>'
            + (f'<button type="button" class="ph-go" data-lab-mode="{k["mode"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if k.get("mode") else "")
            + '</article>'
            for k in lesson["instruments"])
        secs.append(("instruments", "Sun Clocks · 太陽的時鐘", "From a stick to a sundial", "從一根竿子到日晷",
                     f'<div class="ph-grid stagger">{i_cards}</div>',
                     _bi(lesson["instruments_note_en"], lesson["instruments_note_zh"], cls="lead rvl d2")))
    if lesson.get("wanderers"):
        w_cards = "".join(
            f'<article class="ph-card pl-card rvl">'
            f'<div class="ph-ico">{planet_svg(64, _PLANET_CSS[p["key"]], p["key"] == "saturn")}</div>'
            f'<h3>{html.escape(p["en"])}<span class="zh">{html.escape(p["zh"])}・{html.escape(p["old_zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(p["orbit_en"])} · {html.escape(p["orbit_zh"])}</span>'
            f'<span>{html.escape(p["retro_en"])} · {html.escape(p["retro_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(p["note_en"])}<br><span class="zh">{html.escape(p["note_zh"])}</span></p>'
            f'<p class="pl-retro" data-retro="{p["key"]}"></p>'
            f'<button type="button" class="ph-go" data-lab-planet="{p["key"]}">See it go backward · 看它逆行 <i>&uarr;</i></button>'
            f'</article>'
            for p in lesson["wanderers"])
        secs.append(("wanderers", "The Five Wanderers · 五星", "Five planets you can see without a telescope", "肉眼看得到的五顆行星",
                     f'<div class="ph-grid pl-grid stagger">{w_cards}</div>',
                     _bi(lesson["wanderers_note_en"], lesson["wanderers_note_zh"], cls="lead rvl d2")))
    if lesson.get("dipper"):
        d_cards = "".join(
            f'<article class="ph-card sk-card sk-{k["key"]} rvl">'
            f'<div class="ph-ico">{polaris_svg(60)}</div>'
            f'<h3>{html.escape(k["en"])}<span class="zh">{html.escape(k["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(k["when_en"])} · {html.escape(k["when_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(k["note_en"])}<br><span class="zh">{html.escape(k["note_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-season="{i}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for i, k in enumerate(lesson["dipper"]))
        secs.append(("dipper", "The Dipper's Handle · 斗柄指向", "A clock and a calendar in the north", "北方天空的時鐘與日曆",
                     f'<div class="ph-grid stagger">{d_cards}</div>',
                     _bi(lesson["dipper_note_en"], lesson["dipper_note_zh"], cls="lead rvl d2")))
    if lesson.get("places"):
        pc = lesson["places"]
        rows = "".join(
            f'<tr><td><b>{html.escape(r["en"])}</b><span class="zh">{html.escape(r["zh"])}</span></td>'
            f'<td class="num">{html.escape(r["lat"])}</td><td class="num"><b>{html.escape(r["pol_en"])}</b><span class="zh">{html.escape(r["pol_zh"])}</span></td>'
            f'<td>{html.escape(r["note_en"])}<span class="zh">{html.escape(r["note_zh"])}</span>'
            + (f'<button type="button" class="ph-go ns-go" data-lab-place="{r["place"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if r.get("place") else "")
            + '</td></tr>'
            for r in pc["rows"])
        table = (f'<div class="cc-tbl-wrap rvl"><table class="cc-tbl ns-tbl"><caption>{html.escape(pc["table_en"])} · {html.escape(pc["table_zh"])}</caption>'
                 f'<thead><tr><th>Place · 地點</th><th>Latitude · 緯度</th><th>North Star · 北極星</th><th>What you see · 看到什麼</th></tr></thead>'
                 f'<tbody>{rows}</tbody></table></div>')
        secs.append(("places", "Around the World · 世界各地", pc["title_en"], pc["title_zh"], table,
                     _bi(pc["lead_en"], pc["lead_zh"], cls="lead rvl d2")))
    if lesson.get("tonight"):
        tn = lesson["tonight"]
        secs.append(("tonight", html.escape(tn["eyebrow"]), tn["title_en"], tn["title_zh"],
                     f'<div class="tn-box rvl" {tn.get("attr", "data-tonight")} aria-live="polite" aria-busy="true">'
                     '<p class="muted">Calculating… · 計算中…</p></div>'
                     '<noscript><p class="muted">This list is calculated in your browser and needs JavaScript. · 這份清單在瀏覽器裡現算，需要開啟 JavaScript。</p></noscript>',
                     _bi(tn["lead_en"], tn["lead_zh"], cls="lead rvl d2")))
    if lesson.get("birthday"):
        bd = lesson["birthday"]
        secs.append(("birthday", "Your Birthday Star · 生日星", bd["title_en"], bd["title_zh"],
                     '<div class="dl-bd-box rvl" data-birthday>'
                     '<label class="dl-bd-in">Year you were born · 出生年份 <input type="number" class="dl-born" value="2015" min="1926" step="1" inputmode="numeric"></label>'
                     '<div data-birthday-out aria-live="polite"></div></div>'
                     '<noscript><p class="muted">The finder works in your browser and needs JavaScript. · 查詢在瀏覽器裡計算，需要開啟 JavaScript。</p></noscript>',
                     _bi(bd["lead_en"], bd["lead_zh"], cls="lead rvl d2")))
    if lesson.get("culture_cards"):
        cu = lesson["culture_cards"]
        cc = "".join(
            f'<article class="cc-card rvl"><p class="cc-k">{html.escape(c["k"])}</p>'
            f'<h3>{html.escape(c["en"])}<span class="zh">{html.escape(c["zh"])}</span></h3>'
            + (f'<blockquote class="cc-q"><span class="zh">{html.escape(c["quote_zh"])}</span>{html.escape(c["quote_en"])}</blockquote>' if c.get("quote_zh") else "")
            + f'{_bi(c["body_en"], c["body_zh"])}</article>'
            for c in cu["cards"])
        rows = "".join(
            f'<tr><td><b>{html.escape(r["west_en"])}</b><span class="zh">{html.escape(r["west_zh"])}</span></td>'
            f'<td><b class="zh">{html.escape(r["cn_zh"])}</b><span>{html.escape(r["cn_en"])}</span></td>'
            f'<td>{html.escape(r["note_en"])}<span class="zh">{html.escape(r["note_zh"])}</span></td></tr>'
            for r in cu.get("names", []))
        table = '' if not cu.get("names") else (f'<div class="cc-tbl-wrap rvl"><table class="cc-tbl"><caption>{html.escape(cu["table_en"])} · {html.escape(cu["table_zh"])}</caption>'
                 f'<thead><tr><th>Western name · 西方名稱</th><th>Chinese name · 中國星名</th><th>Why it matters · 小故事</th></tr></thead>'
                 f'<tbody>{rows}</tbody></table></div>')
        secs.append(("culture", cu.get("eyebrow", "East and West · 東西方的星空"), cu["title_en"], cu["title_zh"],
                     f'<div class="cc-grid">{cc}</div>{table}',
                     _bi(cu["lead_en"], cu["lead_zh"], cls="lead rvl d2")))
    if lesson.get("upcoming"):
        up = lesson["upcoming"]
        secs.append(("upcoming", html.escape(up["eyebrow"]), up["title_en"], up["title_zh"],
                     '<div class="ecl-list" data-eclipse-list aria-live="polite">'
                     '<p class="muted">Calculating… · 計算中…</p></div>'
                     '<noscript><p class="muted">This list is calculated in your browser and needs JavaScript. · 這份清單在瀏覽器裡現算，需要開啟 JavaScript。</p></noscript>',
                     _bi(up["lead_en"], up["lead_zh"], cls="lead rvl d2")))
    secs.append(("myths", "Myth vs. Fact · 常見迷思", "Four things people get wrong", "四個常見的誤會",
                 _sci_myths(lesson), ""))
    tricks_h = {"phases": ("Read the Moon at a glance", "一眼看懂月亮"),
                "eclipses": ("Keep eclipses straight", "日月食不搞混"),
                "seasons": ("Seasons in a sentence", "一句話記住四季"),
                "tides": ("Tides in a sentence", "一句話記住潮汐"),
                "stars": ("Find your way around the seasons", "一句話記住四季星空"),
                "northstar": ("Never lose north", "一句話找到北方"),
                "planets": ("Spot a wanderer", "一句話認出行星"),
                "sundial": ("Read the Sun", "一句話讀懂日晷"),
                "solar": ("Feel the size", "一句話感受太陽系有多大"),
                "distance": ("Measure the stars", "一句話量星星"),
                "meteors": ("Catch a shooting star", "一句話看懂流星雨"),
                "colors": ("Read a star's color", "一句話讀懂星星的顏色"),
                "moonface": ("Face the Earth", "一句話記住月亮的臉"),
                "milkyway": ("Find your place in the galaxy", "一句話找到我們在銀河的位置"),
                "illusion": ("Don't be fooled", "一句話破解月亮錯覺"),
                "sunrise": ("Read the horizon", "一句話讀懂日出點")}[kind]
    secs.append(("tricks", "Remember It · 記憶口訣", tricks_h[0], tricks_h[1], _sci_tricks(lesson), ""))
    acts = lesson.get("activities") or [lesson["activity"]]
    for n, act in enumerate(acts, 1):
        eb = "Classroom Activity · 課堂活動" if len(acts) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))

    eyebrow = f'Astronomy · Lesson {lesson["n"]} · 天文教育 第{_astro_cn(lesson["n"])}課'
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(ASTRO_BASE, "回天文教育 · All Lessons"))}
<section class="section astro-lab-sec" id="model"><div class="wrap">
  <div class="big-idea rvl"><span class="big-idea-k">Big idea · 一句話看懂</span>{_bi(lesson["big_idea_en"], lesson["big_idea_zh"])}</div>
  <p class="eyebrow rvl">{html.escape(lab["eyebrow"])}</p>
  <h2 class="rvl d1 sweep">{html.escape(lab["title_en"])} <span class="tp-h2-en">{html.escape(lab["title_zh"])}</span></h2>
  {_bi(lab["how_en"], lab["how_zh"], cls="lead rvl d2 al-how")}
  {lab_html}
</div></section>
<section class="section band" id="reading"><div class="wrap" style="max-width:940px">
  <p class="eyebrow rvl">Reading · 英文閱讀</p>
  {reading_html}
</div></section>
{sec_html}
<section class="section"><div class="wrap">
{_astro_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'astronomy-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_astro_head(js)))
    return path

def build_astro_hub():
    # 橫向卡片（左圖示、右文字），桌機兩欄、手機一欄；英文標題用襯線字、正常字距，
    # 不再沿用 pm-card 那套四欄窄卡（標題會被切成四、五行，等級標籤還會蓋住圖示）。
    def icon(l):
        c = l.get("card")
        return (eclipse_svg("solar:total", 60) if c == "eclipse" else season_svg(1, 60) if c == "season"
                else tide_svg(60) if c == "tide" else star_svg(60) if c == "stars" else polaris_svg(60) if c == "north" else planet_svg(60) if c == "planets" else sundial_svg(60) if c == "sundial" else solar_svg(60) if c == "solar" else distance_svg(60) if c == "distance" else meteor_svg(60) if c == "meteors" else colors_svg(60) if c == "colors" else moon_svg(180, 60) if c == "moonface" else milkyway_svg(60) if c == "milkyway" else illusion_svg(60) if c == "illusion" else sunrise_svg(60) if c == "sunrise" else moon_svg(120, 60))
    cards = []
    for l in ASTRO["lessons"]:
        cards.append(
            f'<a class="lc-row rvl" href="{ASTRO_BASE}{l["slug"]}/">'
            f'<span class="lc-ico" aria-hidden="true">{icon(l)}</span>'
            f'<span class="lc-body">'
            f'<span class="lc-meta"><b>Lesson {l["n"]} · 第{_astro_cn(l["n"])}課</b><i>{html.escape(l["level"])}</i></span>'
            f'<h3 class="lc-title">{html.escape(l["title"])}</h3>'
            f'<span class="lc-zh">{html.escape(l["title_zh"])}</span>'
            f'<span class="lc-bl">{html.escape(l["blurb_en"])}</span>'
            f'<span class="lc-bl zh">{html.escape(l["blurb_zh"])}</span>'
            f'<span class="lc-go">Start the lesson · 開始上課 <i>&rarr;</i></span>'
            f'</span></a>')
    for p in ASTRO.get("planned", []):
        cards.append(
            f'<div class="lc-row lc-soon rvl">'
            f'<span class="lc-ico" aria-hidden="true">{p["icon"]}</span>'
            f'<span class="lc-body"><span class="lc-meta"><b>Coming soon · 製作中</b></span>'
            f'<h3 class="lc-title">{html.escape(p["en"])}</h3><span class="lc-zh">{html.escape(p["zh"])}</span></span></div>')
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in ASTRO["intro"])
    lead = f'{html.escape(ASTRO["lead_en"])}<br><span class="muted">{html.escape(ASTRO["lead_zh"])}</span>'
    body = f'''
{page_hero(ASTRO["eyebrow"], f'{ASTRO["title_en"]} <span class="h1-zh">{ASTRO["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{intro_html}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">Lessons · 課程</p>
  <h2 class="rvl d1 sweep">{len(ASTRO["lessons"])} lesson{"s" if len(ASTRO["lessons"]) > 1 else ""} so far <span class="tp-h2-en">目前 {len(ASTRO["lessons"])} 課，持續增加中</span></h2>
  <div class="lc-list">{"".join(cards)}</div>
</div></section>
'''
    write(ASTRO_BASE, layout(ASTRO_BASE, f'{ASTRO["title_en"]} · {ASTRO["title_zh"]}',
          f'{ASTRO["lead_en"]} {ASTRO["lead_zh"]}', body, "resources", extra_head=_astro_head() + _lc_head()))
    return ASTRO_BASE


# ---- 人體探索（資料驅動，data/human-body.json）----
# 完全照天文教育的架構：英文 reading（render_basic_unit）＋每課一個 3D 模型＋科學延伸段落。
# 3D 原始碼在 tools/body/src/（three.js、esbuild，每課一個入口），打包成 assets/js/<入口>.js；
# 第一課的骨架是真實解剖資料（BodyParts3D，CC BY 4.0），`npm run model` 產生 assets/models/skeleton.glb。
# 面板與段落樣式沿用 astro.css，人體專屬的在 body.css；兩者都只載在本系列頁面。
BODY_BASE = "/resources/classes/human-body/"
_BODY_JS = {"skeleton": "skeleton", "arm": "arm", "heart": "heart", "lungs": "lungs", "joints": "joints",
            "digestion": "digestion", "nerves": "nerves", "eyes": "eyes"}   # lab.kind → assets/js/<bundle>.js

def _body_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/body.css", "assets/models/skeleton.glb",
                *(f"assets/js/{j}.js" for j in _BODY_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _model_url():
    """骨架模型的網址：版本號只看 glb 本身，改 CSS/JS 不會讓學生重新下載 1 MB 的模型。"""
    fp = os.path.join(ROOT, "assets/models/skeleton.glb")
    v = hashlib.md5(open(fp, "rb").read()).hexdigest()[:8] if os.path.exists(fp) else "0"
    return f"/assets/models/skeleton.glb?v={v}"

def _body_head(js=None):
    v = _body_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return (f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/body.css?v={v}">\n{tag}')

def bone_svg(size=56):
    """骨頭小圖（系列首頁的課程卡）。"""
    return (f'<svg class="bone-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<g transform="rotate(-40 30 30)" fill="#f3ead6">'
            '<rect x="15" y="26.5" width="30" height="7" rx="2"/>'
            '<circle cx="14" cy="25.5" r="5.5"/><circle cx="14" cy="34.5" r="5.5"/>'
            '<circle cx="46" cy="25.5" r="5.5"/><circle cx="46" cy="34.5" r="5.5"/>'
            '</g></svg>')

def render_skeleton_lab(lesson):
    """第一課：真實骨架（assets/js/skeleton.js 綁這裡的 class）。"""
    lab = lesson["lab"]
    counts = {}
    for c in lesson["counts"]:
        if c["region"]: counts[c["region"]] = counts.get(c["region"], 0) + c["n"]
    regions = [("skull", "Skull", "頭顱骨"), ("spine", "Spine", "脊柱"), ("chest", "Rib cage", "胸廓"),
               ("shoulder", "Shoulders", "肩帶"), ("arm", "Arms", "手臂"), ("hand", "Hands", "手"),
               ("pelvis", "Pelvis", "骨盆"), ("leg", "Legs", "腿"), ("foot", "Feet", "腳")]
    chips = "".join(
        f'<button type="button" class="al-chip sk-chip" data-region="{k}">'
        f'<span class="sk-chip-n">{counts.get(k, "")}</span><span class="al-chip-en">{en}</span>'
        f'<span class="al-chip-zh">{zh}</span></button>' for k, en, zh in regions)
    jobs = "".join(
        f'<button type="button" data-job="{j["key"]}" aria-pressed="false"><i aria-hidden="true">{j["icon"]}</i>'
        f'{html.escape(j["en"])}<small>{html.escape(j["zh"])}</small></button>' for j in lesson["jobs"])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("spin", "Slow spin", "慢慢轉", False)])
    return f'''<div class="astro-lab sk-lab rvl" data-skeleton-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a human skeleton · 人體骨架 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading the skeleton… · 骨架載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放　Tap a bone · 點一塊骨頭</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside">
      <div class="sk-card" aria-live="polite">
        <p class="al-sky-k">Tap a bone · 點一塊骨頭</p>
        <div class="sk-empty"><p>Tap any bone in the model to see its name in English and Chinese.</p><p class="zh">點模型裡任何一塊骨頭，看它的英文和中文名稱。</p></div>
        <div class="sk-info">
          <p class="sk-name-en"></p><p class="sk-nick"></p><p class="sk-name-zh"></p>
          <p class="sk-region"></p><p class="sk-rjob"></p>
          <button type="button" class="sk-clear">Clear · 取消選取</button>
        </div>
      </div>
      <p class="al-sky-k">Five jobs · 五大功能</p>
      <div class="sk-jobs" role="group" aria-label="Five jobs of the skeleton · 骨骼的五大功能">{jobs}</div>
      <p class="sk-job-text" aria-live="polite">Tap a job to light up the bones that do it.<span class="zh">點一項功能，亮起負責它的骨頭。</span></p>
      <div class="sk-count-box">
        <button type="button" class="sk-count" aria-pressed="false"><i aria-hidden="true">&#9995;</i><span>Count the bones in one hand<small>數一數一隻手的骨頭</small></span></button>
        <p class="sk-count-n"><b>0</b> / 27</p>
        <p class="sk-count-t" aria-live="polite">The right hand lights up one bone at a time. Follow along on your own hand.<span class="zh">右手的骨頭會一塊一塊亮起，跟著在自己手上摸一摸。</span></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <label class="ec-slider sk-apart-row"><span class="ec-slider-k">Take it apart · 把骨架拆開</span>
      <input type="range" class="ec-time sk-apart" min="0" max="1" step="0.01" value="0"></label>
    <div class="al-chips sk-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_arm_lab(lesson):
    """第二課：真實骨頭＋示意肌肉的右手臂（assets/js/arm.js 綁這裡的 class）。"""
    lab = lesson["lab"]
    loads = [("0", "Nothing", "空手", "&#9995;"), ("0.2", "Apple", "蘋果", "&#127822;"),
             ("0.6", "Water", "一瓶水", "&#129380;"), ("3", "Dumbbell", "啞鈴 3 kg", "&#127947;")]
    load_btns = "".join(
        f'<button type="button" data-load="{v}" aria-pressed="{"true" if v == "0" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>'
        for v, en, zh, ic in loads)
    def row(cls, en, zh):
        return (f'<div class="am-m {cls}"><span class="am-dot" aria-hidden="true"></span>'
                f'<b>{en}<small>{zh}</small></b><em class="am-state"></em>'
                f'<span class="am-len" aria-hidden="true"><s></s></span><span class="am-len-t"></span></div>')
    acts = [("lift", "Lift", "舉起", "二頭肌拉"), ("lower", "Lower slowly", "慢慢放下", "二頭肌煞車"), ("push", "Push", "推出", "三頭肌拉")]
    act_btns = "".join(
        f'<button type="button" class="am-act am-act-{k}" data-act="{k}"><b>{en}</b><small>{zh} · {sub}</small></button>'
        for k, en, zh, sub in acts)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("arrows", "Pull arrows", "拉力箭頭", True),
                       ("lever", "Lever", "槓桿", False), ("whole", "Whole skeleton", "整副骨架", True)])
    return f'''<div class="astro-lab sk-lab am-lab rvl" data-arm-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the right arm with the biceps and triceps · 右手臂與二頭肌、三頭肌 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading the arm… · 手臂載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside am-aside">
      <div class="am-col">
      <p class="al-sky-k">Elbow · 手肘</p>
      <p class="am-angle"><b class="am-deg">—</b><span>bend<small>彎曲角度</small></span></p>
      <div class="am-muscles" aria-live="polite">{row("am-bi", "Biceps", "肱二頭肌")}{row("am-tri", "Triceps", "肱三頭肌")}</div>
      <p class="am-len-k">Bars show muscle length; 100% is the arm hanging loose. · 長條是肌肉長度，手臂自然下垂時＝100%</p>
      <p class="am-say" aria-live="polite"></p>
      </div>
      <div class="am-col">
      <p class="al-sky-k">In your hand · 手上拿著</p>
      <div class="am-loads" role="group" aria-label="What the hand holds · 手上拿著什麼">{load_btns}</div>
      <div class="am-force"><p class="am-kg-k">Biceps pull · 二頭肌的拉力</p><p class="am-kg">—</p><p class="am-kg-t"></p></div>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <div class="am-acts" role="group" aria-label="Moves · 動作">{act_btns}</div>
    </div>
    <label class="ec-slider am-bend-row"><span class="ec-slider-k">Elbow bend · 手肘彎曲（拖曳試試）</span>
      <input type="range" class="ec-time am-bend" min="10" max="138" step="1" value="10"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_heart_lab(lesson):
    """第三課：兩個幫浦的心臟與兩個循環（assets/js/heart.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    rates = [("sleep", "&#128164;", "Asleep", "睡覺", 55), ("rest", "&#129681;", "At rest", "安靜", 72),
             ("child", "&#129490;", "Child", "孩子", 90), ("run", "&#127939;", "Running", "跑步", 150)]
    rate_btns = "".join(
        f'<button type="button" data-rate="{k}" aria-pressed="{"true" if k == "rest" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh} {n}</small></button>'
        for k, ic, en, zh, n in rates)
    stops = "".join(f'<li><b>{html.escape(st["en"])}</b><span>{html.escape(st["zh"])}</span></li>' for st in lab["stops"])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("follow", "Follow one drop", "跟著一滴血", True),
                       ("wall", "Heart wall", "心壁", True), ("sound", "Heartbeat sound", "心跳聲", False)])
    return f'''<div class="astro-lab sk-lab hr-lab rvl" data-heart-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the heart and the two loops of blood · 心臟與兩個血液循環 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="hr-facing">Drawn as if you are facing the person: their right side is on your left. · 像面對著一個人：他的右邊在你的左邊</p>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside hr-aside">
      <div class="hr-col">
      <p class="al-sky-k">Heart rate · 心跳</p>
      <p class="hr-rate"><b class="hr-bpm">72</b><span>beats a minute<small>每分鐘心跳</small></span><em class="hr-src"></em></p>
      <div class="hr-rates" role="group" aria-label="Heart rate · 心跳速度">{rate_btns}</div>
      <div class="hr-mbox">
        <button type="button" class="hr-measure"><i aria-hidden="true">&#129782;</i><span>Measure my pulse<small>量我的脈搏（15 秒）</small></span></button>
        <div class="hr-tapbox">
          <button type="button" class="hr-tap" aria-label="Tap with each beat · 每跳一下按一次">Tap<small>按</small></button>
          <p class="hr-tap-count"><b class="hr-tap-n">0</b> taps · 下<br><b class="hr-tap-s">15</b> s left · 秒</p>
        </div>
        <p class="hr-tap-msg" aria-live="polite">Two fingers on the thumb side of your wrist, press gently, then start.<span class="zh">兩根手指輕按手腕拇指那一側，找到脈搏再開始。</span></p>
      </div>
      <dl class="hr-nums">
        <div><dt>Beats a day · 每天心跳</dt><dd class="hr-day"></dd></div>
        <div><dt>Blood a minute · 每分鐘打出</dt><dd><span class="hr-lmin"></span> L</dd></div>
        <div><dt>Blood a day · 每天打出</dt><dd><span class="hr-lday"></span> L</dd></div>
        <div><dt>Bathtubs a day · 每天幾缸</dt><dd class="hr-tubs"></dd></div>
      </dl>
      <p class="hr-nums-note">Adult-size heart, about 70 mL per beat at rest; a bathtub holds about 150 L. · 以成人安靜時每跳約 70 毫升計算；一缸約 150 公升。</p>
      </div>
    </aside>
  </div>
  <div class="hr-follow">
    <p class="al-sky-k">Follow one drop · 跟著一滴血</p>
    <ol class="hr-stops">{stops}</ol>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.3" aria-pressed="false">Slow motion 慢動作</button>
        <button type="button" data-speed="1" aria-pressed="true">Real time 真實速度</button>
      </div>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
</div>'''

def render_lungs_lab(lesson):
    """第四課：真實胸廓＋自繪的肺、橫膈膜、支氣管樹（assets/js/lungs.js 綁這裡的 class）。"""
    lab = lesson["lab"]
    rates = [("sleep", "&#128164;", "Asleep", "睡覺", 12), ("rest", "&#129681;", "At rest", "安靜", 16),
             ("child", "&#129490;", "Child", "孩子", 20), ("run", "&#127939;", "Running", "跑步", 40)]
    rate_btns = "".join(
        f'<button type="button" data-rate="{k}" aria-pressed="{"true" if k == "rest" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh} {n}</small></button>'
        for k, ic, en, zh, n in rates)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("ribs", "Rib cage", "胸廓", True),
                       ("airways", "Airways", "氣管樹", True), ("heart", "Heart", "心臟", True)])
    return f'''<div class="astro-lab sk-lab lu-lab rvl" data-lungs-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the chest: lungs, airways, diaphragm, and ribs · 胸腔 3D 模型：肺、氣管、橫膈膜與肋骨"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading the chest… · 胸腔載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside hr-aside lu-aside">
      <div class="hr-col">
      <p class="al-sky-k">Breathing · 呼吸</p>
      <p class="hr-rate"><b class="lu-bpm hr-bpm">16</b><span>breaths a minute<small>每分鐘呼吸</small></span><em class="lu-src hr-src"></em></p>
      <div class="hr-rates" role="group" aria-label="Breathing rate · 呼吸速度">{rate_btns}</div>
      <p class="lu-phase" data-k=""></p>
      <p class="lu-phase-t" aria-live="polite"></p>
      <button type="button" class="lu-hold"><i aria-hidden="true">&#127788;</i><span>Hold to breathe in<small>按住吸氣，放開吐氣</small></span></button>
      <div class="hr-mbox">
        <button type="button" class="hr-measure lu-measure"><i aria-hidden="true">&#9201;</i><span>Count my breaths<small>數我的呼吸（30 秒）</small></span></button>
        <div class="hr-tapbox">
          <button type="button" class="hr-tap lu-tap" aria-label="Tap each time you breathe in · 每吸一口氣按一次">Tap<small>按</small></button>
          <p class="hr-tap-count"><b class="hr-tap-n">0</b> breaths · 次<br><b class="hr-tap-s">30</b> s left · 秒</p>
        </div>
        <p class="hr-tap-msg" aria-live="polite">Sit still with a hand on your belly. Tap once each time you breathe in.<span class="zh">安靜坐好，一手放在肚子上；每吸一口氣就按一次。</span></p>
      </div>
      </div>
    </aside>
  </div>
  <div class="lu-strip">
    <div class="lu-strip-alv">
      <p class="al-sky-k">Inside one air sac · 一個肺泡裡</p>
      <div class="lu-alv-box"><canvas class="lu-alv" aria-label="Oxygen moving from an air sac into the blood, and carbon dioxide moving out · 氧氣從肺泡進入血液、二氧化碳從血液出來"></canvas></div>
      <p class="lu-alv-cap"><span class="lu-dot lu-o2"></span>Oxygen into the blood · 氧氣進入血液<br><span class="lu-dot lu-co2"></span>Carbon dioxide out · 二氧化碳出來</p>
    </div>
    <div class="lu-strip-nums">
      <dl class="hr-nums">
        <div><dt>Breaths a day · 每天呼吸</dt><dd class="lu-day"></dd></div>
        <div><dt>Air a minute · 每分鐘換氣</dt><dd><span class="lu-lmin"></span> L</dd></div>
        <div><dt>Air a day · 每天換氣</dt><dd><span class="lu-lday"></span> L</dd></div>
        <div><dt>Oxygen in → out · 氧氣吸進→吐出</dt><dd>21% → 16%</dd></div>
      </dl>
      <p class="hr-nums-note">About 0.5 L per quiet breath for an adult; deeper when you exercise. · 以成人安靜時每口約 0.5 公升計算；運動時會更深。</p>
    </div>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_joints_lab(lesson):
    """第五課：真實骨架上的六個關節（assets/js/joints.js 綁這裡的 class）。"""
    lab = lesson["lab"]
    joints = [("knee", "Knee", "膝", "Hinge · 鉸鏈"), ("hip", "Hip", "髖", "Ball · 球窩"), ("elbow", "Elbow", "肘", "Hinge · 鉸鏈"),
              ("shoulder", "Shoulder", "肩", "Ball · 球窩"), ("neck", "Neck", "頸", "Pivot · 樞軸"), ("thumb", "Thumb", "拇指", "Saddle · 鞍狀")]
    chips = "".join(
        f'<button type="button" class="al-chip jt-chip" data-joint="{k}"><span class="al-chip-en">{en}</span>'
        f'<span class="al-chip-zh">{zh}</span><small>{ty}</small></button>' for k, en, zh, ty in joints)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("range", "Range of motion", "活動範圍", True), ("trace", "Path", "軌跡", True)])
    return f'''<div class="astro-lab sk-lab jt-lab rvl" data-joints-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a real skeleton with six moving joints · 真實骨架上六個會動的關節 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading the skeleton… · 骨架載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside jt-aside">
      <p class="al-sky-k">Joint · 關節</p>
      <p class="jt-name"></p><p class="jt-zh"></p>
      <p class="jt-type"></p>
      <p class="jt-ways"></p>
      <p class="jt-like"></p>
      <div class="jt-sliders"></div>
      <div class="jt-btns"><button type="button" class="jt-circle"></button><button type="button" class="jt-reset">&#8634; Back to start<small>回到原位</small></button></div>
      <p class="jt-say" aria-live="polite"></p>
      <p class="jt-ex"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-chips jt-chips">{chips}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_digestion_lab(lesson):
    """第六課：跟著一口飯走完消化道（assets/js/digestion.js 綁這裡的 class）。"""
    lab = lesson["lab"]
    stops_json = html.escape(json.dumps(lab["stops"], ensure_ascii=False))
    stops = "".join(f'<li role="button" tabindex="0"><b>{html.escape(st["en"])}</b><span>{html.escape(st["zh"])}</span></li>' for st in lab["stops"])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("organs", "Liver and pancreas", "肝與胰臟", True), ("skel", "Skeleton", "骨架", True)])
    return f'''<div class="astro-lab sk-lab dg-lab rvl" data-digestion-lab data-model="{_model_url()}" data-stops="{stops_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the digestive system with one bite of lunch moving through it · 消化道 3D 模型，一口午餐正在裡面移動"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside dg-aside">
      <p class="al-sky-k">Lunch clock · 午餐時鐘</p>
      <div class="dg-clockrow">
        <label class="dg-lunch-l"><span>I ate lunch at<small>我吃午餐的時間</small></span><input type="time" class="dg-lunch" value="12:00"></label>
        <button type="button" class="dg-now"><i aria-hidden="true">&#128339;</i><span>Where is my lunch now?<small>我的午餐現在在哪？</small></span></button>
      </div>
      <dl class="hr-nums dg-nums">
        <div><dt>Time since lunch · 吃完多久</dt><dd class="dg-elapsed">0 s</dd></div>
        <div><dt>Clock · 時間</dt><dd class="dg-clock">12:00</dd></div>
      </dl>
      <p class="al-sky-k">Right now · 現在在</p>
      <p class="dg-stop-en"></p><p class="dg-stop-zh"></p>
      <p class="dg-stop-time"></p>
      <p class="dg-what" aria-live="polite"></p>
    </aside>
  </div>
  <div class="hr-follow dg-follow">
    <p class="al-sky-k">The journey · 一口飯的旅程（點一站跳過去）</p>
    <ol class="hr-stops">{stops}</ol>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <label class="ec-slider dg-slider"><span class="ec-slider-k">Time since lunch · 吃完午餐後的時間<em>(not to scale: each stop gets its own stretch · 刻度不等比，每站各占一段)</em></span>
        <input type="range" class="ec-time dg-time" min="0" max="1000" step="1" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_nerves_lab(lesson):
    """第七課：大腦、脊髓與神經（assets/js/nerves.js 綁這裡的 class）。"""
    lab = lesson["lab"]
    scen_json = html.escape(json.dumps(lab["scenarios"], ensure_ascii=False))
    btns = "".join(
        f'<button type="button" class="nv-sc" data-scen-go="{k}" aria-pressed="false"><i aria-hidden="true">{v["icon"]}</i>'
        f'<span>{html.escape(v["en"])}<small>{html.escape(v["zh"])}</small></span></button>'
        for k, v in lab["scenarios"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("map", "Brain map", "大腦分區", False), ("skel", "Skeleton", "骨架", True)])
    return f'''<div class="astro-lab sk-lab nv-lab rvl" data-nerves-lab data-model="{_model_url()}" data-scen="{scen_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the brain, spinal cord, and nerves with signals traveling along them · 大腦、脊髓與神經 3D 模型，訊號沿著神經傳遞"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="nv-slow">Slow motion: 1 second here = 25 milliseconds · 慢動作：這裡 1 秒＝真實 25 毫秒</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky sk-aside nv-aside">
      <p class="al-sky-k">Pick a moment · 選一個情境</p>
      <div class="nv-scs" role="group" aria-label="Scenarios · 情境">{btns}</div>
      <p class="nv-title"></p><p class="nv-zh"></p>
      <div class="nv-clock"><b class="nv-ms">0 ms</b><span>Signal path · 訊號走了<b class="nv-dist"></b></span>
        <button type="button" class="nv-replay">&#8634; Replay<small>再看一次</small></button></div>
      <ol class="nv-steps" aria-live="polite"></ol>
      <p class="nv-note"></p>
    </aside>
  </div>
  <div class="nv-strip">
    <div class="nv-rt-box" role="button" tabindex="0" aria-label="Reaction test: tap to start, then tap when the ruler starts to fall · 反應測驗：點一下開始，尺開始掉就按"><canvas class="nv-rt-cv"></canvas></div>
    <div class="nv-rt-text">
      <p class="al-sky-k">Reaction test · 反應測驗</p>
      <p class="nv-rt-msg">Tap the ruler box to start. When the ruler starts to fall, tap as fast as you can. Try five times.<span class="zh">點一下尺的方框開始。尺一開始往下掉，就用最快的速度按下去。試五次。</span></p>
      <p class="nv-rt-list"></p>
      <button type="button" class="nv-rt-use" hidden>&#129504; Play “catch the ruler” at my speed<small>用我的反應時間播放「接住尺」</small></button>
    </div>
  </div>
  <div class="al-controls">
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_eyes_lab(lesson):
    """第八課：放大剖開的眼睛＋光線（assets/js/eyes.js 綁這裡的 class）；盲點測驗卡是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    objs = [("far", "&#127795;", "Far tree", "遠方的樹 · 6 m"), ("near", "&#129716;", "Plant on the desk", "桌上的盆栽 · 30 cm"),
            ("close", "&#129295;", "Too close", "太近了 · 10 cm")]
    obj_btns = "".join(
        f'<button type="button" data-obj="{k}" aria-pressed="{"true" if k == "far" else "false"}"><i aria-hidden="true">{ic}</i>'
        f'<span>{en}<small>{zh}</small></span></button>' for k, ic, en, zh in objs)
    eyes = [("normal", "Normal", "正常"), ("near", "Nearsighted", "近視"), ("far", "Farsighted", "遠視")]
    eye_btns = "".join(
        f'<button type="button" data-eye="{k}" aria-pressed="{"true" if k == "normal" else "false"}">{en}<small>{zh}</small></button>'
        for k, en, zh in eyes)
    tg = _lab_toggles([("auto", "Auto-focus", "自動對焦", True), ("labels", "Labels", "標示", True),
                       ("rays", "Light rays", "光線", True), ("skull", "Skull and brain", "頭骨與大腦", True)])
    return f'''<div class="astro-lab sk-lab ey-lab rvl" data-eyes-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of an eye cut in half, with light from a tree crossing inside it and landing upside down on the retina · 剖開一半的眼睛 3D 模型，樹的光在眼睛裡交叉，上下顛倒地落在視網膜上"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Eye shown 5&times; life size, cut in half · 眼球放大 5 倍、剖開一半</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The blind spot card and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的盲點測驗卡和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside ey-aside">
      <p class="al-sky-k">Look at · 看什麼</p>
      <div class="ey-objs" role="group" aria-label="What the eye looks at · 眼睛看什麼">{obj_btns}</div>
      <div class="ey-views">
        <figure><canvas class="ey-cv ey-cv-ret" width="320" height="240"></canvas>
          <figcaption>On the retina<small>視網膜上：上下顛倒</small></figcaption></figure>
        <figure><canvas class="ey-cv ey-cv-see" width="320" height="240"></canvas>
          <figcaption>What you see<small>你看到的：大腦轉正</small></figcaption></figure>
      </div>
      <p class="ey-status" aria-live="polite"></p>
      <dl class="ey-nums">
        <div><dt>Distance · 距離</dt><dd class="ey-dist">6 m</dd></div>
        <div><dt>Pupil · 瞳孔</dt><dd class="ey-pupil">—</dd></div>
        <div><dt>Lens · 水晶體</dt><dd class="ey-lensd">—</dd></div>
      </dl>
      <p class="al-sky-k">Eye · 眼睛</p>
      <div class="ey-types" role="group" aria-label="Kind of eye · 眼睛的類型">{eye_btns}</div>
      <div class="ey-more">
        <button type="button" class="ey-glasses" aria-pressed="false" disabled><i aria-hidden="true">&#128083;</i><span>Put on glasses<small>戴上眼鏡</small></span></button>
        <button type="button" class="ey-blind" aria-pressed="false"><i aria-hidden="true">&#9899;</i><span>Blind spot<small>盲點</small></span></button>
      </div>
    </aside>
  </div>
  <div class="ey-strip">
    <div class="ey-card" data-side="left" data-mode="dot" role="img" aria-label="Blind spot test card: a cross and a dot · 盲點測驗卡：一個十字和一個圓點">
      <i class="ey-line" aria-hidden="true"></i><b class="ey-cross" aria-hidden="true">+</b><b class="ey-dot" aria-hidden="true"></b>
    </div>
    <div class="ey-bs-text">
      <p class="al-sky-k">Blind spot test · 盲點測驗</p>
      <p class="ey-bs-msg"></p>
      <div class="ey-bs-btns">
        <button type="button" class="ey-bs-eye">&#8644; Test my other eye<small>換測另一隻眼睛</small></button>
        <button type="button" class="ey-bs-mode">&#10135; Try a broken line<small>改成斷掉的線</small></button>
        <button type="button" class="ey-bs-3d">&#128065;&#65039; Where does the dot land?<small>在 3D 眼睛裡看圓點落在哪</small></button>
      </div>
      <div class="ey-calc">
        <label>Gap between + and dot<small>十字到圓點</small><span><input type="number" class="ey-gap" min="1" max="40" step="0.1" inputmode="decimal"> cm</span></label>
        <label>Your eye to the screen<small>眼睛到螢幕</small><span><input type="number" class="ey-far" min="5" max="100" step="1" inputmode="decimal"> cm</span></label>
        <p class="ey-angle" aria-live="polite">Measure both with a ruler when the dot disappears.<span class="zh">圓點消失時，用尺量出這兩個距離。</span></p>
      </div>
    </div>
  </div>
  <div class="al-controls">
    <label class="ec-slider ey-light-row"><span class="ec-slider-k">Light · 光線<em>dim · 暗 &harr; bright sunlight · 大太陽</em></span>
      <input type="range" class="ec-time ey-light" min="0" max="100" step="1" value="55"></label>
    <label class="ec-slider ey-lens-row"><span class="ec-slider-k">Lens shape · 水晶體形狀<em>flat, for far · 扁：看遠 &harr; round, for near · 圓：看近</em></span>
      <input type="range" class="ec-time ey-lens" min="0" max="100" step="1" value="0"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def _body_nav(slug):
    ls = BODY["lessons"]
    i = next(n for n, l in enumerate(ls) if l["slug"] == slug)
    def side(l, dirn, label):
        if not l:
            return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{BODY_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = ls[i - 1] if i > 0 else None
    nxt = ls[i + 1] if i < len(ls) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{BODY_BASE}">&#9776; 回人體探索 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def build_body_lesson(lesson):
    path = f'{BODY_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="body", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab["kind"]
    lab_html = {"skeleton": render_skeleton_lab, "arm": render_arm_lab, "heart": render_heart_lab, "lungs": render_lungs_lab,
                "joints": render_joints_lab, "digestion": render_digestion_lab, "nerves": render_nerves_lab,
                "eyes": render_eyes_lab}[kind](lesson)

    secs = []
    if lesson.get("jobs"):
        cards = "".join(
            f'<article class="ph-card jb-card jb-{j["key"]} rvl">'
            f'<div class="ph-ico jb-ico" aria-hidden="true">{j["icon"]}</div>'
            f'<h3>{html.escape(j["en"])}<span class="zh">{html.escape(j["zh"])}</span></h3>'
            f'<p class="ph-when">{html.escape(j["text_en"])}<br><span class="zh">{html.escape(j["text_zh"])}</span></p>'
            f'<p class="jb-try"><b>Try it · 試試看</b>{html.escape(j["try_en"])}<span class="zh">{html.escape(j["try_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-job="{j["key"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for j in lesson["jobs"])
        secs.append(("jobs", "Five Jobs · 五大功能", "What your skeleton does all day", "骨骼整天在做的五件事",
                     f'<div class="ph-grid jb-grid stagger">{cards}</div>',
                     _bi(lesson["jobs_note_en"], lesson["jobs_note_zh"], cls="lead rvl d2")))
    if lesson.get("types"):
        th = lesson["types_head"]
        def _type_card(t):
            go = (f'<button type="button" class="ph-go" data-lab-joint="{t["joint"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
                  if t.get("joint") else '<p class="ty-none">Not in the 3D model · 模型中沒有示範</p>')
            return (f'<article class="ph-card jb-card tp-card rvl">'
                    f'<div class="ph-ico jb-ico" aria-hidden="true">{t["icon"]}</div>'
                    f'<h3>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></h3>'
                    f'<p class="ph-meta"><span>{html.escape(t["where_en"])} · {html.escape(t["where_zh"])}</span>'
                    f'<span class="kd-ctl">{html.escape(t["moves_en"])} · {html.escape(t["moves_zh"])}</span></p>'
                    f'<p class="ph-when">{html.escape(t["text_en"])}<br><span class="zh">{html.escape(t["text_zh"])}</span></p>'
                    f'<p class="jb-try"><b>Try it · 試試看</b>{html.escape(t["try_en"])}<span class="zh">{html.escape(t["try_zh"])}</span></p>'
                    f'{go}</article>')
        secs.append(("types", th["eyebrow"], th["en"], th["zh"],
                     f'<div class="ph-grid kd-grid stagger">{"".join(_type_card(t) for t in lesson["types"])}</div>',
                     _bi(lesson["types_note_en"], lesson["types_note_zh"], cls="lead rvl d2")))
    if lesson.get("chambers"):
        cards = "".join(
            f'<article class="ph-card jb-card ck-card ck-{c["side"]} rvl">'
            f'<div class="ph-ico ck-ico" aria-hidden="true"><i></i></div>'
            f'<h3>{html.escape(c["en"])}<span class="zh">{html.escape(c["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(c["from_en"])} · {html.escape(c["from_zh"])}</span>'
            f'<span>{html.escape(c["to_en"])} · {html.escape(c["to_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(c["text_en"])}<br><span class="zh">{html.escape(c["text_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-focus="{c["key"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
            f'</article>'
            for c in lesson["chambers"])
        secs.append(("chambers", "Four Chambers · 四個腔室", "Two pumps, four rooms", "兩個幫浦、四個房間",
                     f'<div class="ph-grid ck-grid stagger">{cards}</div>',
                     _bi(lesson["chambers_note_en"], lesson["chambers_note_zh"], cls="lead rvl d2")))
    if lesson.get("pairs"):
        cards = "".join(
            f'<article class="ph-card jb-card pr-card rvl">'
            f'<div class="ph-ico jb-ico" aria-hidden="true">{p["icon"]}</div>'
            f'<h3>{html.escape(p["a_en"])} + {html.escape(p["b_en"])}<span class="zh">{html.escape(p["a_zh"])}＋{html.escape(p["b_zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(p["joint_en"])} · {html.escape(p["joint_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(p["text_en"])}<br><span class="zh">{html.escape(p["text_zh"])}</span></p>'
            f'<p class="jb-try"><b>Try it · 試試看</b>{html.escape(p["try_en"])}<span class="zh">{html.escape(p["try_zh"])}</span></p>'
            + (f'<button type="button" class="ph-go" data-lab-demo="{p["demo"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if p.get("demo") else "")
            + '</article>'
            for p in lesson["pairs"])
        secs.append(("pairs", "Muscle Pairs · 成對的肌肉", "One pulls, the other lets go", "一條拉、一條放",
                     f'<div class="ph-grid pr-grid stagger">{cards}</div>',
                     _bi(lesson["pairs_note_en"], lesson["pairs_note_zh"], cls="lead rvl d2")))
    if lesson.get("kinds"):
        cards = "".join(
            f'<article class="ph-card kd-card rvl">'
            f'<div class="ph-ico jb-ico" aria-hidden="true">{k["icon"]}</div>'
            f'<h3>{html.escape(k["en"])}<span class="zh">{html.escape(k["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(k["where_en"])} · {html.escape(k["where_zh"])}</span>'
            f'<span class="kd-ctl">{html.escape(k["control_en"])} · {html.escape(k["control_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(k["text_en"])}<br><span class="zh">{html.escape(k["text_zh"])}</span></p>'
            f'</article>'
            for k in lesson["kinds"])
        kh = lesson.get("kinds_head") or {"eyebrow": "Three Kinds of Muscle · 三種肌肉", "en": "Not every muscle moves a bone", "zh": "不是每一種肌肉都拉骨頭"}
        secs.append(("kinds", kh["eyebrow"], kh["en"], kh["zh"],
                     f'<div class="ph-grid kd-grid stagger">{cards}</div>',
                     _bi(lesson["kinds_note_en"], lesson["kinds_note_zh"], cls="lead rvl d2")))
    if lesson.get("counts"):
        total = sum(c["n"] for c in lesson["counts"])
        def _bc_row(c):
            inner = (f'<b class="bc-n">{c["n"]}</b><span class="bc-t">{html.escape(c["en"])}<span class="zh">{html.escape(c["zh"])}</span></span>'
                     f'<span class="bc-note">{html.escape(c["note_en"])}<span class="zh">{html.escape(c["note_zh"])}</span></span>')
            if not c["region"]:          # 聽小骨：模型裡沒有，不給按鈕
                return f'<div class="bc-row rvl">{inner}</div>'
            return (f'<button type="button" class="bc-row rvl" data-lab-region="{c["region"]}" title="See it in 3D · 在模型中看">'
                    f'{inner}<i class="bc-go" aria-hidden="true">&uarr;</i></button>')
        rows = "".join(_bc_row(c) for c in lesson["counts"])
        secs.append(("counts", f"Bone Count · 骨頭數一數", f"Where are your {total} bones?", f"{total} 塊骨頭在哪裡？",
                     f'<div class="bc-list">{rows}<div class="bc-row bc-total rvl"><b class="bc-n">{total}</b>'
                     f'<span class="bc-t">In all<span class="zh">合計</span></span></div></div>',
                     _bi(lesson["counts_note_en"], lesson["counts_note_zh"], cls="lead rvl d2")))
    if lesson.get("measure"):
        ms = lesson["measure"]
        steps = "".join(
            f'<li class="rvl"><b class="ms-n">{html.escape(st["n"])}</b><span><b>{html.escape(st["en"])} · {html.escape(st["zh"])}</b>'
            f'{html.escape(st["text_en"])}<span class="zh">{html.escape(st["text_zh"])}</span></span></li>'
            for st in ms["steps"])
        secs.append(("measure", "Measure Yourself · 親身測量", ms["title_en"], ms["title_zh"],
                     f'<ol class="ms-steps">{steps}</ol>'
                     f'<p class="rvl"><button type="button" class="ph-go ms-go" data-lab-{ms.get("action", "count")}="{ms.get("action_value", "")}">{ms.get("button_icon", "&#9995;")} {html.escape(ms["button_en"])} · {html.escape(ms["button_zh"])} <i>&uarr;</i></button></p>',
                     _bi(ms["lead_en"], ms["lead_zh"], cls="lead rvl d2")))
    secs.append(("myths", "Myth vs. Fact · 常見迷思", "Four things people get wrong", "四個常見的誤會", _sci_myths(lesson), ""))
    tricks_h = {"skeleton": ("Bones in a sentence", "一句話記住骨頭"), "arm": ("Muscles in a sentence", "一句話記住肌肉"),
                "heart": ("The heart in a sentence", "一句話記住心臟"), "lungs": ("Breathing in a sentence", "一句話記住呼吸"),
                "joints": ("Joints in a sentence", "一句話記住關節"), "digestion": ("Digestion in a sentence", "一句話記住消化"),
                "nerves": ("Your nervous system in a sentence", "一句話記住神經系統"),
                "eyes": ("Your eyes in a sentence", "一句話記住眼睛")}[kind]
    secs.append(("tricks", "Remember It · 記憶口訣", tricks_h[0], tricks_h[1], _sci_tricks(lesson), ""))
    if lesson.get("culture"):
        cu = lesson["culture"]
        secs.append(("culture", "In Chinese · 中文怎麼說", cu["title_en"], cu["title_zh"],
                     f'<div class="cu-box rvl">{_bi(cu["body_en"], cu["body_zh"])}'
                     f'<a class="cu-link" href="{ZHONGYI_BASE}">{html.escape(cu["link_en"])} · {html.escape(cu["link_zh"])} &rarr;</a></div>', ""))
    acts = lesson.get("activities") or [lesson["activity"]]
    for n, act in enumerate(acts, 1):
        eb = "Classroom Activity · 課堂活動" if len(acts) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))

    eyebrow = f'The Human Body · Lesson {lesson["n"]} · 人體探索 第{_astro_cn(lesson["n"])}課'
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(BODY_BASE, "回人體探索 · All Lessons"))}
<section class="section astro-lab-sec" id="model"><div class="wrap">
  <div class="big-idea rvl"><span class="big-idea-k">Big idea · 一句話看懂</span>{_bi(lesson["big_idea_en"], lesson["big_idea_zh"])}</div>
  <p class="eyebrow rvl">{html.escape(lab["eyebrow"])}</p>
  <h2 class="rvl d1 sweep">{html.escape(lab["title_en"])} <span class="tp-h2-en">{html.escape(lab["title_zh"])}</span></h2>
  {_bi(lab["how_en"], lab["how_zh"], cls="lead rvl d2 al-how")}
  {lab_html}
</div></section>
<section class="section band" id="reading"><div class="wrap" style="max-width:940px">
  <p class="eyebrow rvl">Reading · 英文閱讀</p>
  {reading_html}
</div></section>
{sec_html}
<section class="section"><div class="wrap">
<p class="hb-health rvl"><b>&#9877; Health note · 健康提醒</b>{html.escape(lesson["health_en"])}<span class="zh">{html.escape(lesson["health_zh"])}</span></p>
{_body_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'human-body-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_body_head(_BODY_JS[kind])))
    return path

def build_body_hub():
    # 與天文教育首頁同一套橫向課程卡（lesson-cards.css）
    def icon(l):
        return bone_svg(60) if l.get("card") == "skeleton" else l["icon"]
    cards = []
    for l in BODY["lessons"]:
        cards.append(
            f'<a class="lc-row rvl" href="{BODY_BASE}{l["slug"]}/">'
            f'<span class="lc-ico hb-ico" aria-hidden="true">{icon(l)}</span>'
            f'<span class="lc-body">'
            f'<span class="lc-meta"><b>Lesson {l["n"]} · 第{_astro_cn(l["n"])}課</b><i>{html.escape(l["level"])}</i></span>'
            f'<h3 class="lc-title">{html.escape(l["title"])}</h3>'
            f'<span class="lc-zh">{html.escape(l["title_zh"])}</span>'
            f'<span class="lc-bl">{html.escape(l["blurb_en"])}</span>'
            f'<span class="lc-bl zh">{html.escape(l["blurb_zh"])}</span>'
            f'<span class="lc-go">Start the lesson · 開始上課 <i>&rarr;</i></span>'
            f'</span></a>')
    for p in BODY.get("planned", []):
        cards.append(
            f'<div class="lc-row lc-soon rvl">'
            f'<span class="lc-ico hb-ico" aria-hidden="true">{p["icon"]}</span>'
            f'<span class="lc-body"><span class="lc-meta"><b>Coming soon · 製作中</b></span>'
            f'<h3 class="lc-title">{html.escape(p["en"])}</h3><span class="lc-zh">{html.escape(p["zh"])}</span></span></div>')
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in BODY["intro"])
    lead = f'{html.escape(BODY["lead_en"])}<br><span class="muted">{html.escape(BODY["lead_zh"])}</span>'
    n = len(BODY["lessons"])
    body = f'''
{page_hero(BODY["eyebrow"], f'{BODY["title_en"]} <span class="h1-zh">{BODY["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{intro_html}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">Lessons · 課程</p>
  <h2 class="rvl d1 sweep">{n} lesson{"s" if n > 1 else ""} so far <span class="tp-h2-en">目前 {n} 課，持續增加中</span></h2>
  <div class="lc-list">{"".join(cards)}</div>
</div></section>
'''
    write(BODY_BASE, layout(BODY_BASE, f'{BODY["title_en"]} · {BODY["title_zh"]}',
          f'{BODY["lead_en"]} {BODY["lead_zh"]}', body, "resources", extra_head=_body_head() + _lc_head()))
    return BODY_BASE


# ---- 萬物原理 How Things Work（資料驅動，data/how-things-work.json）----
# 課程頁照天文教育（英文 reading＋每課一個 3D 模型＋科學延伸段落），系列首頁照中醫養生分單元
# （單元導覽＋.lc-row 橫向課程卡）。課次是全系列連號，units[].lessons 是做好的課、units[].planned 是製作中。
# 3D 原始碼在 tools/science/src/（three.js、esbuild，每課一個入口），打包成 assets/js/<入口>.js；
# 面板、迷思、口訣、活動沿用 astro.css，本系列多出來的在 science.css；兩者都只載在本系列頁面。
HTW_BASE = "/resources/classes/how-things-work/"
_HTW_JS = {"battery": "battery", "generator": "generator", "solar": "solar-cell", "wind": "wind-turbine", "internet": "internet-packets", "signal": "cell-signal", "gps": "gps-satellites", "memory": "memory-bits", "sky": "sky-scatter", "rainbow": "rainbow-drops", "sound": "sound-waves"}   # lab.kind → assets/js/<bundle>.js

def _htw_cn(n):
    """課次的中文數字（一～九十九）：第十一課、第二十課。"""
    d = "零一二三四五六七八九"
    if n < 10: return d[n]
    t, o = divmod(n, 10)
    return f'{"" if t == 1 else d[t]}十{d[o] if o else ""}'

def _htw_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/science.css", *(f"assets/js/{j}.js" for j in _HTW_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _htw_head(js=None):
    v = _htw_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return (f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/science.css?v={v}">\n{tag}')

def battery_svg(size=56):
    """電池小圖（系列首頁的課程卡）：一顆直立的電池，電量條與閃電。"""
    return (f'<svg class="battery-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="24" y="6" width="12" height="5" rx="1.5" fill="#cfd4dc"/>'
            '<rect x="16" y="10" width="28" height="44" rx="5" fill="none" stroke="#cfd4dc" stroke-width="3"/>'
            '<rect x="21" y="27" width="18" height="22" rx="2" fill="#4fd1a5"/>'
            '<path d="M32 15l-7 12h5l-2 9 8-13h-5z" fill="#ffd36e"/></svg>')

def render_battery_lab(lesson):
    """第一課：鋰離子電池剖面（assets/js/battery.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    modes = [("use", "&#128161;", "Use it", "用電"), ("charge", "&#128268;", "Charge it", "充電"), ("off", "&#9211;", "Switch off", "關掉")]
    mode_btns = "".join(
        f'<button type="button" data-mode="{k}" aria-pressed="{"true" if k == "use" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>'
        for k, ic, en, zh in modes)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("electrons", "Electrons in the wire", "電線裡的電子", True),
                       ("arrows", "Flow arrows", "流向箭頭", True)])
    return f'''<div class="astro-lab bt-lab rvl" data-battery-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of a lithium-ion battery wired to a light bulb · 鋰離子電池接上燈泡的 3D 剖面"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Front cut away to show the inside · 正面剖開，看得到裡面</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside">
      <div class="bt-top">
        <p class="al-sky-k">Your phone says · 手機顯示</p>
        <div class="bt-phone"><span class="bt-cell"><i class="bt-fill"></i><b class="bt-bolt" aria-hidden="true">&#9889;</b></span><b class="bt-pct">85%</b></div>
        <p class="bt-state"></p>
      </div>
      <div class="bt-modes" role="group" aria-label="What is the battery doing? · 電池在做什麼？">{mode_btns}</div>
      <dl class="bt-nums">
        <div><dt>Voltage · 電壓</dt><dd class="bt-v"></dd></div>
        <div><dt>Lithium in graphite · 石墨裡的鋰</dt><dd class="bt-li"></dd></div>
        <div><dt>Capacity vs. new · 跟新電池比</dt><dd class="bt-cap"></dd></div>
      </dl>
      <p class="bt-count"><b class="bt-ions">0</b> ions crossed inside = <b class="bt-els">0</b> electrons went around outside<span class="zh">裡面跨過的離子＝外面繞過的電子</span></p>
      <p class="bt-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.4" aria-pressed="false">Slow 慢</button>
        <button type="button" data-speed="1" aria-pressed="true">Normal 中</button>
        <button type="button" data-speed="3" aria-pressed="false">Fast 快</button>
      </div>
    </div>
    <div class="bt-sliders">
      <label class="al-slider"><span>Charge · 電量 <output class="bt-soc-out"></output></span>
        <input type="range" class="al-age bt-soc" min="0" max="100" step="1" value="85"></label>
      <label class="al-slider"><span>Full charge cycles → capacity left · 充放電循環次數 → 剩下容量 <output class="bt-cyc-out"></output></span>
        <input type="range" class="al-age bt-cyc" min="0" max="750" step="10" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def outlet_svg(size=56):
    """插座小圖（系列首頁的課程卡）：台灣的兩孔插座＋一道閃電。"""
    return (f'<svg class="outlet-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="12" y="10" width="36" height="40" rx="8" fill="#f3ead6"/>'
            '<rect x="21" y="21" width="4" height="12" rx="1.5" fill="#3a3326"/>'
            '<rect x="35" y="21" width="4" height="12" rx="1.5" fill="#3a3326"/>'
            '<path d="M30 36l-4 8h3l-1 6 5-9h-3l1-5z" fill="#ffb02e"/></svg>')

def render_generator_lab(lesson):
    """第二課：轉動的磁鐵發電（assets/js/generator.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    drives = [("crank", "&#9995;", "Your hand", "你的手"), ("steam", "&#9832;&#65039;", "Steam / gas", "蒸汽／燃氣"),
              ("water", "&#128167;", "Water", "水力"), ("wind", "&#127788;&#65039;", "Wind", "風力")]
    drive_btns = "".join(
        f'<button type="button" data-drive="{k}" aria-pressed="{"true" if k == "steam" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>'
        for k, ic, en, zh in drives)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("field", "Magnetic field", "磁力線", True),
                       ("electrons", "Electrons in the wire", "電線裡的電子", True)])
    return f'''<div class="astro-lab bt-lab gn-lab rvl" data-generator-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a magnet spinning between two coils, wired to a light bulb in a house · 磁鐵在兩組線圈之間轉動、接到房子裡燈泡的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Slow motion: a real generator in Taiwan turns 60 times a second · 慢動作：台灣真正的發電機每秒轉 60 圈</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside gn-aside">
      <div class="gn-top">
        <p class="al-sky-k">What turns the magnet? · 是什麼在轉磁鐵？</p>
        <div class="bt-modes gn-drives" role="group" aria-label="What turns the magnet? · 是什麼在轉磁鐵？">{drive_btns}</div>
        <button type="button" class="gn-crank" hidden>&#128260; Hold to crank<small>按住不放來搖</small></button>
        <p class="bt-msg gn-drive-msg" aria-live="polite"></p>
      </div>
      <div class="gn-scope-box">
        <p class="al-sky-k">Voltage over time · 電壓隨時間變化</p>
        <div class="gn-scope"><canvas class="gn-scope-cv" aria-label="Graph of the voltage swinging between plus and minus · 電壓在正負之間擺動的圖"></canvas></div>
        <dl class="bt-nums gn-nums">
          <div><dt>Turns a second · 每秒轉幾圈</dt><dd class="gn-f"></dd></div>
          <div><dt>Direction flips a second · 每秒換方向</dt><dd class="gn-flip"></dd></div>
          <div><dt>Bulb · 燈泡</dt><dd class="gn-bright"></dd></div>
        </dl>
        <p class="bt-count gn-real">In Taiwan's power plants: <b class="gn-real-hz">60</b> cycles a second; a two-pole generator turns <b class="gn-real-rpm">3,600</b> times a minute, and the current flips 120 times a second.<span class="zh">台灣的電廠：每秒 60 個週期；兩極發電機每分鐘轉 3,600 圈，電流每秒換方向 120 次。</span></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider gn-speed-row"><span>Spin speed · 轉速 <output class="gn-speed-out"></output></span>
        <input type="range" class="al-age gn-speed" min="0" max="2" step="0.05" value="0.5"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def solarpanel_svg(size=56):
    """太陽能板小圖（萬物原理首頁的課程卡）：太陽＋斜放的格子板。不要叫 solar_svg：天文的太陽系圖示已經用了。"""
    cells = "".join(f'<path d="M{14 + c * 9 + r * 3:.1f} {30 + r * 7} l9 0 l-3 7 l-9 0z" fill="#2f5fc4" stroke="#9fc0ff" stroke-width=".8"/>'
                    for r in range(3) for c in range(4))
    return (f'<svg class="solar-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="46" cy="13" r="6" fill="#ffd36e"/>'
            '<g stroke="#ffd36e" stroke-width="1.6" stroke-linecap="round"><path d="M46 3v2.5M46 20.5v2.5M36 13h2.5M53.5 13H56M39 6l1.8 1.8M51.2 18.2L53 20M39 20l1.8-1.8M51.2 7.8L53 6"/></g>'
            f'{cells}<path d="M30 52v-6M24 54h12" stroke="#cfd4dc" stroke-width="2"/></svg>')

def render_solarcell_lab(lesson):
    """第三課：矽太陽能電池剖面（assets/js/solar-cell.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    weather = [("sunny", "&#9728;&#65039;", "Sunny", "晴天"), ("cloudy", "&#9729;&#65039;", "Cloudy", "陰天"), ("night", "&#127769;", "Night", "夜晚")]
    lights = [("sun", "&#127752;", "Sunlight", "陽光"), ("red", "&#128308;", "Red", "紅光"), ("blue", "&#128309;", "Blue", "藍光"), ("ir", "&#11093;", "Infrared", "紅外線")]
    wb = "".join(f'<button type="button" data-weather="{k}" aria-pressed="{"true" if k == "sunny" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>' for k, ic, en, zh in weather)
    lb = "".join(f'<button type="button" data-light="{k}" aria-pressed="{"true" if k == "sun" else "false"}" class="sl-c-{k}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>' for k, ic, en, zh in lights)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("field", "Electric field", "內建電場", True), ("holes", "Holes", "電洞", True)])
    seg = lambda k, en, zh: (f'<span class="sl-seg sl-b-{k}" style="flex-grow:0"></span>', f'<li><i class="sl-k-{k}"></i>{en}<span class="zh">{zh}</span><b class="sl-p-{k}">—</b></li>')
    segs = [seg("elec", "Electricity", "變成電"), seg("heat", "Heat", "變成熱"), seg("thru", "Passed through", "穿過去"), seg("refl", "Bounced off", "反射掉")]
    return f'''<div class="astro-lab bt-lab sl-lab rvl" data-solarcell-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of a silicon solar cell with sunlight, freed electrons, and a light bulb · 矽太陽能電池的 3D 剖面：陽光、被敲出的電子和燈泡"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Front cut away; layers drawn much thicker than real · 正面剖開，各層畫得比真的厚很多</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside sl-aside">
      <div class="sl-top">
        <p class="al-sky-k">Weather · 天氣</p>
        <div class="bt-modes sl-weather" role="group" aria-label="Weather · 天氣">{wb}</div>
        <p class="al-sky-k sl-k2">Light · 光的顏色</p>
        <div class="bt-modes sl-lights" role="group" aria-label="Light · 光的顏色">{lb}</div>
        <p class="bt-msg sl-msg" aria-live="polite"></p>
      </div>
      <div class="sl-energy">
        <p class="al-sky-k">Where the energy went · 能量去了哪裡</p>
        <div class="sl-bar" aria-hidden="true">{"".join(a for a, _ in segs)}</div>
        <ul class="sl-keys">{"".join(b for _, b in segs)}</ul>
        <dl class="bt-nums sl-nums">
          <div><dt>Photons · 光子</dt><dd class="sl-ph">0</dd></div>
          <div><dt>Electrons around the wire · 繞過電線的電子</dt><dd class="sl-el">0</dd></div>
        </dl>
        <button type="button" class="sl-reset">&#8634; Count again · 重新計算</button>
        <p class="bt-count sl-fact">One silicon cell gives less than 1 volt (about 0.69 V with nothing connected). A panel joins many cells in a row, and most panels turn about one-fifth of sunlight into electricity.<span class="zh">一顆矽電池不到 1 伏特（不接東西時約 0.69 伏特）；一片太陽能板把許多顆串在一起，大多能把約五分之一的陽光變成電。</span></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-speed" role="group" aria-label="Speed · 速度">
        <button type="button" data-speed="0.35" aria-pressed="false">Slow motion 慢動作</button>
        <button type="button" data-speed="1" aria-pressed="true">Normal 中</button>
        <button type="button" data-speed="2.5" aria-pressed="false">Fast 快</button>
      </div>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def windturbine_svg(size=56):
    """風機小圖（萬物原理首頁的課程卡）：海上的三葉風機。"""
    blades = "".join(f'<path d="M30 21 l-1.6 -15 q1.6 -2 3.2 0z" fill="#eef1f5" transform="rotate({a} 30 21)"/>' for a in (15, 135, 255))
    return (f'<svg class="windturbine-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M4 52q6-3 13 0t13 0 13 0 13 0" stroke="#6fb6ff" stroke-width="2" fill="none"/>'
            '<path d="M28.8 22h2.4l1.2 30h-4.8z" fill="#dfe4ec"/>'
            f'{blades}<circle cx="30" cy="21" r="2.4" fill="#fff"/></svg>')

def render_windturbine_lab(lesson):
    """第四課：離岸風機（assets/js/wind-turbine.js 綁這裡的 class；比例照 SG 8.0-167 DD 縮小的示意）。"""
    lab = lesson["lab"]
    winds = [("ne", "&#8601;", "Northeast monsoon", "東北季風"), ("sw", "&#8599;", "Southwest monsoon", "西南季風")]
    wb = "".join(f'<button type="button" data-wind="{k}" aria-pressed="{"true" if k == "ne" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>' for k, ic, en, zh in winds)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("inside", "Look inside", "看機艙裡面", False), ("wake", "Slower air behind", "後方變慢的風", True)])
    return f'''<div class="astro-lab bt-lab wt-lab rvl" data-windturbine-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of an offshore wind turbine turning in the wind · 離岸風機在風中轉動的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">The rotor turns at its real speed; the wind is drawn slower than real · 轉子用真實轉速；風畫得比真的慢</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside wt-aside">
      <div class="wt-top">
        <p class="al-sky-k">Turbine · 風機</p>
        <p class="wt-big"><b class="wt-p">0 MW</b><span class="wt-state"></span></p>
        <dl class="bt-nums wt-nums">
          <div><dt>Rotor · 轉速</dt><dd><span class="wt-rpm"></span> rpm</dd></div>
          <div><dt>Blade tips · 葉尖速度</dt><dd class="wt-tip"></dd></div>
          <div><dt>Blade angle · 葉片角度</dt><dd class="wt-pitch"></dd></div>
        </dl>
        <p class="bt-msg wt-msg" aria-live="polite"></p>
      </div>
      <div class="wt-curve-box">
        <p class="al-sky-k">Power curve · 功率曲線</p>
        <div class="wt-curve"><canvas class="wt-curve-cv" aria-label="Power curve: electricity made at each wind speed · 功率曲線：各種風速下發的電"></canvas></div>
        <p class="wt-curve-note">Teal: what this turbine makes. Dashed: the most any turbine could take from this wind (59%). · 青線：這台風機發的電；虛線：任何風機最多能從這陣風拿到的（59%）。</p>
        <p class="bt-count wt-x8"></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="bt-modes wt-winds" role="group" aria-label="Wind direction · 風向">{wb}</div>
      <button type="button" class="al-today wt-inside-go">&#128269; Look inside · 看發電機</button>
    </div>
    <label class="al-slider wt-ws-row"><span>Wind speed · 風速 <output class="wt-ws-out"></output></span>
      <input type="range" class="al-age wt-ws" min="0" max="40" step="0.5" value="8"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def internet_svg(size=56):
    """網路小圖（萬物原理首頁的課程卡）：兩塊陸地之間的海纜，上面跑著有編號的封包。"""
    pk = "".join(f'<rect x="{x - 4}" y="{y - 4}" width="8" height="8" rx="1.5" fill="{c}"/>' for x, y, c in ((20, 36, "#58e1ff"), (31, 41, "#ffd36e"), (42, 37, "#7cf29a")))
    return (f'<svg class="internet-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="4" y="18" width="10" height="20" rx="4" fill="#3e6b4f"/><rect x="46" y="16" width="10" height="24" rx="4" fill="#3e6b4f"/>'
            '<path d="M14 30 Q30 52 46 30" stroke="#2a6fb0" stroke-width="2.4" fill="none"/>'
            f'{pk}<path d="M6 46h48" stroke="#1f5c9a" stroke-width="1.2" opacity=".6"/></svg>')

def render_internet_lab(lesson):
    """第五課：封包從彰化到波士頓（assets/js/internet-packets.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("lose", "Lose a packet", "弄丟一個封包", False), ("cut", "Cut cable A", "剪斷海纜 A", False)])
    return f'''<div class="astro-lab bt-lab ip-lab rvl" data-internet-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D map of packets traveling from Changhua to Boston through routers and undersea cables · 封包從彰化經路由器與海底電纜到波士頓的 3D 地圖"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A simplified map, slowed down enormously: the real trip takes a fraction of a second · 簡化的地圖、大幅放慢：真實的旅程不到一秒</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside ip-aside">
      <div class="ip-top">
        <p class="al-sky-k">Send · 傳送</p>
        <div class="bt-modes ip-send" role="group" aria-label="Send · 傳送">
          <button type="button" data-send="text"><i aria-hidden="true">&#128172;</i>Send a text<small>傳文字</small></button>
          <button type="button" data-send="photo"><i aria-hidden="true">&#128247;</i>Send a photo<small>傳照片</small></button>
        </div>
        <p class="ip-status">Waiting to send<small>等待傳送</small></p>
        <p class="al-sky-k ip-k2">Arrived, by number · 依編號到達</p>
        <div class="ip-slots" aria-live="polite"></div>
        <dl class="bt-nums ip-nums">
          <div><dt>Sent · 送出</dt><dd class="ip-sent">0</dd></div>
          <div><dt>Arrived · 抵達</dt><dd class="ip-arr">0</dd></div>
          <div><dt>Resent · 重送</dt><dd class="ip-resent">0</dd></div>
          <div><dt>Out of order? · 順序亂了？</dt><dd class="ip-order">—</dd></div>
        </dl>
      </div>
      <p class="bt-msg ip-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles ip-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def cellsignal_svg(size=56):
    """手機訊號小圖（萬物原理首頁的課程卡）：山、基地台與一圈圈電波。"""
    return (f'<svg class="cellsignal-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M2 52 L22 24 L34 40 L42 30 L58 52 Z" fill="#3e6b4f"/>'
            '<path d="M14 52 L16 26 L18 52" stroke="#dfe4ec" stroke-width="1.6" fill="none"/>'
            '<g fill="none" stroke="#4fd1c5" stroke-width="1.6" stroke-linecap="round">'
            '<path d="M11 21a7 7 0 0 1 10 0"/><path d="M7.5 17a12 12 0 0 1 17 0"/><path d="M4 13a17 17 0 0 1 24 0"/></g>'
            '<g fill="#3ad17a"><rect x="44" y="12" width="3" height="5"/><rect x="48" y="9" width="3" height="8"/><rect x="52" y="6" width="3" height="11" opacity=".35"/></g></svg>')

def render_cellsignal_lab(lesson):
    """第六課：山區的手機訊號（assets/js/cell-signal.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    bands = [("low", "&#128225;", "Low band", "低頻 700 MHz"), ("high", "&#9889;", "High band (5G)", "高頻 3.5 GHz")]
    bb = "".join(f'<button type="button" data-band="{k}" aria-pressed="{"true" if k == "low" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>' for k, ic, en, zh in bands)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("coverage", "Coverage map", "覆蓋圖", True), ("towerB", "Tower in the valley", "山谷基地台", False)])
    return f'''<div class="astro-lab bt-lab cs-lab rvl" data-cellsignal-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a hiker walking over a mountain while the phone signal changes · 登山客走過山區、手機訊號跟著變化的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Mountains and towers drawn much taller than real · 山和基地台畫得比真的高很多</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside cs-aside">
      <div class="cs-top">
        <p class="al-sky-k">Your phone · 你的手機</p>
        <div class="cs-phone"><span class="cs-bars" data-b="4" aria-hidden="true"><i></i><i></i><i></i><i></i></span><b class="cs-bars-t"></b></div>
        <dl class="bt-nums cs-nums">
          <div><dt>Using tower · 連到</dt><dd class="cs-srv"></dd></div>
          <div><dt>Distance · 距離</dt><dd class="cs-km"></dd></div>
          <div><dt>Line of sight · 視線</dt><dd class="cs-los"></dd></div>
          <div><dt>Strength (model) · 強度</dt><dd class="cs-dbm"></dd></div>
          <div><dt>Wave travel time · 電波走多久</dt><dd class="cs-us"></dd></div>
          <div><dt>Wavelength · 波長</dt><dd class="cs-wl"></dd></div>
        </dl>
        <p class="al-sky-k cs-k2">Frequency band · 頻段</p>
        <div class="bt-modes cs-bands" role="group" aria-label="Frequency band · 頻段">{bb}</div>
      </div>
      <p class="bt-msg cs-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider cs-pos-row"><span>Where are you? · 你走到哪裡？ <output class="cs-pos-out"></output></span>
        <input type="range" class="al-age cs-pos" min="-4.5" max="9" step="0.05" value="-2"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def gps_svg(size=56):
    """GPS 小圖（萬物原理首頁的課程卡）：地球、一顆衛星與交在一點的三個圓。"""
    return (f'<svg class="gps-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="26" cy="36" r="20" fill="#1f5c9a"/><path d="M14 26q6-6 12-2t8 8-4 10-10 2z" fill="#3e8a5a"/>'
            '<g fill="none" stroke-width="1.8"><circle cx="21" cy="33" r="9" stroke="#4fd1ff"/><circle cx="33" cy="36" r="9" stroke="#ff7ad9"/><circle cx="27" cy="44" r="8" stroke="#9cf25a"/></g>'
            '<circle cx="27.5" cy="36.5" r="2.6" fill="#3d8bff" stroke="#fff" stroke-width="1"/>'
            '<g transform="translate(47 13) rotate(-30)"><rect x="-3" y="-3" width="6" height="6" rx="1" fill="#ffd36e"/>'
            '<rect x="-12" y="-1.5" width="7" height="3" fill="#7fb0ff"/><rect x="5" y="-1.5" width="7" height="3" fill="#7fb0ff"/></g></svg>')

def render_gps_lab(lesson):
    """第七課：地球與 GPS 衛星（assets/js/gps-satellites.js 綁這裡的 class；地球與軌道照真實比例）。"""
    lab = lesson["lab"]
    nb = "".join(f'<button type="button" data-sats="{n}" aria-pressed="{"true" if n == 3 else "false"}"><i aria-hidden="true">{n}</i>{en}<small>{zh}</small></button>'
                 for n, en, zh in ((1, "One", "一顆"), (2, "Two", "兩顆"), (3, "Three", "三顆"), (4, "Four", "四顆")))
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("orbits", "Orbits", "軌道", True), ("close", "Close-up on Taiwan", "近看台灣", False)])
    return f'''<div class="astro-lab bt-lab gp-lab rvl" data-gps-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of Earth and the GPS satellites, with circles showing how far a phone in Changhua is from each satellite · 地球與 GPS 衛星的 3D 模型，彩色圓表示彰化的手機離每顆衛星多遠"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Earth and orbits to scale; satellites drawn much bigger, sped up, and signals slowed down · 地球與軌道照比例；衛星畫大、加快，訊號放慢</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside gp-aside">
      <div class="gp-top">
        <p class="al-sky-k">Satellites used · 用幾顆衛星</p>
        <div class="bt-modes gp-sats" role="group" aria-label="Satellites used · 用幾顆衛星">{nb}</div>
        <p class="gp-where" aria-live="polite"></p>
        <ul class="gp-list"></ul>
        <dl class="bt-nums gp-nums">
          <div><dt>In view · 看得到</dt><dd class="gp-vis"></dd></div>
          <div><dt>Phone clock off · 時鐘誤差</dt><dd class="gp-clk"></dd></div>
          <div><dt>Each distance off · 每段距離多算</dt><dd class="gp-each"></dd></div>
          <div><dt>Blue dot off · 藍點偏了</dt><dd class="gp-off"></dd></div>
        </dl>
      </div>
      <p class="bt-msg gp-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider gp-err-row"><span>Phone clock off by · 手機時鐘誤差 <output class="gp-err-out"></output></span>
        <input type="range" class="al-age gp-err" min="0" max="4" step="1" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def memory_svg(size=56):
    """記憶體小圖（萬物原理首頁的課程卡）：一顆晶片，上面一排 0 與 1。"""
    bits = "01000001"
    cells = "".join(f'<rect x="{13 + i * 4.5}" y="24" width="3.4" height="12" rx="1" fill="{"#58e1ff" if b == "1" else "#2f4a6a"}"/>' for i, b in enumerate(bits))
    pins = "".join(f'<rect x="{14 + i * 6}" y="4" width="2.4" height="6" fill="#cfd4dc"/><rect x="{14 + i * 6}" y="50" width="2.4" height="6" fill="#cfd4dc"/>' for i in range(6))
    return (f'<svg class="memory-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{pins}<rect x="8" y="10" width="44" height="40" rx="4" fill="#1d2b3f" stroke="#5f7fa8" stroke-width="1.6"/>{cells}'
            '<text x="30" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#ffd36e" font-family="sans-serif">A</text></svg>')

def render_memory_lab(lesson):
    """第八課：記憶體格子（assets/js/memory-bits.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    kinds = [("dram", "&#9889;", "RAM (DRAM)", "記憶體"), ("flash", "&#128190;", "Flash storage", "快閃記憶體")]
    kb = "".join(f'<button type="button" data-mem="{k}" aria-pressed="{"true" if k == "dram" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>' for k, ic, en, zh in kinds)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("power", "Power", "電源", True), ("refresh", "Refresh (RAM)", "刷新（RAM）", True)])
    return f'''<div class="astro-lab bt-lab mb-lab rvl" data-memory-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of memory cells storing a word as 0s and 1s · 記憶體格子用 0 和 1 存下一個字的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Hugely enlarged and slowed down; a real chip has billions of cells · 大幅放大、放慢；真的晶片有幾十億格</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside mb-aside">
      <div class="mb-top">
        <p class="al-sky-k">Kind of memory · 記憶體種類</p>
        <div class="bt-modes mb-kinds" role="group" aria-label="Kind of memory · 記憶體種類">{kb}</div>
        <label class="al-sky-k mb-k2" for="mb-text">Type up to 16 bytes · 最多 16 個位元組</label>
        <div class="mb-form">
          <input id="mb-text" class="mb-text" type="text" value="HELLO" maxlength="16" autocomplete="off" spellcheck="false">
          <button type="button" class="mb-save">Save<small>存進去</small></button>
          <button type="button" class="mb-read">Read<small>讀出來</small></button>
        </div>
        <ul class="mb-bytes" aria-live="polite"></ul>
        <p class="mb-backrow"><span>Read back · 讀回來</span><b class="mb-back">—</b></p>
        <dl class="bt-nums mb-nums">
          <div><dt>Bytes · 位元組</dt><dd class="mb-nb"></dd></div>
          <div><dt>Bits · 位元</dt><dd class="mb-nbits"></dd></div>
          <div><dt>Power · 電源</dt><dd class="mb-pow"></dd></div>
          <div><dt>Refresh · 刷新</dt><dd class="mb-ref"></dd></div>
        </dl>
      </div>
      <p class="bt-msg mb-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles mb-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def skyblue_svg(size=56):
    """藍天小圖（萬物原理首頁的課程卡）：上藍下橙的天空、地平線上的太陽與散開的藍光點。"""
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="1.6" fill="#7fb6ff"/>' for x, y in ((14, 14), (24, 9), (37, 15), (46, 8), (30, 21), (18, 25)))
    return (f'<svg class="skyblue-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<defs><linearGradient id="skyb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f78d6"/><stop offset=".62" stop-color="#8cc4ff"/><stop offset=".86" stop-color="#ffb05a"/></linearGradient></defs>'
            f'<rect x="4" y="4" width="52" height="44" rx="8" fill="url(#skyb)"/>{dots}'
            '<circle cx="40" cy="45" r="7" fill="#ff7a3c"/><rect x="4" y="45" width="52" height="11" rx="3" fill="#2f5b3c"/></svg>')

def render_skyblue_lab(lesson):
    """第九課：陽光在大氣裡散射（assets/js/sky-scatter.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("air", "Air", "大氣", True), ("photons", "Light particles", "光子", True)])
    return f'''<div class="astro-lab bt-lab bs-lab rvl" data-skyblue-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of sunlight crossing the air, with blue light scattered in every direction · 陽光穿過大氣、藍光被散射到四面八方的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">The air is drawn far thicker than real, and the light is slowed down · 大氣畫得比真的厚很多，光也放慢了</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside bs-aside">
      <div class="bs-top">
        <p class="al-sky-k">What you see · 你看到的天空</p>
        <div class="bs-viewbox"><canvas class="bs-view" aria-label="The sky and the Sun as seen from Changhua · 從彰化看到的天空和太陽"></canvas><span class="bs-when"></span></div>
        <dl class="bt-nums bs-nums">
          <div><dt>Air crossed · 穿過的空氣</dt><dd class="bs-am"></dd></div>
          <div><dt>Blue that gets through · 藍光直達</dt><dd class="bs-blue"></dd></div>
          <div><dt>Red that gets through · 紅光直達</dt><dd class="bs-red"></dd></div>
        </dl>
        <p class="al-sky-k bs-k2">Sunlight reaching you directly · 直接到達的陽光</p>
        <ul class="bs-bars"></ul>
      </div>
      <p class="bt-msg bs-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider bs-elev-row"><span>Sun height · 太陽高度 <output class="bs-elev-out"></output></span>
        <input type="range" class="al-age bs-elev" min="0" max="90" step="0.5" value="60"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def rainbow_svg(size=56):
    """彩虹小圖（萬物原理首頁的課程卡）：一道彩虹弧與幾顆雨滴。"""
    cols = ("#ff3b2e", "#ff9a2e", "#ffe03a", "#3ad17a", "#3d7bff", "#9b5cff")
    arcs = "".join(f'<path d="M{8 + i * 2.6} 46 A{22 - i * 2.6} {22 - i * 2.6} 0 0 1 {52 - i * 2.6} 46" fill="none" stroke="{c}" stroke-width="2.6"/>' for i, c in enumerate(cols))
    drops = "".join(f'<path d="M{x} {y}c-1.6 2.4-2.4 3.6-2.4 4.6a2.4 2.4 0 0 0 4.8 0c0-1-.8-2.2-2.4-4.6z" fill="#9fd4ff"/>' for x, y in ((14, 6), (30, 2), (46, 8)))
    return (f'<svg class="rainbow-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{drops}{arcs}<rect x="4" y="46" width="52" height="8" rx="3" fill="#3e6b47"/></svg>')

def render_rainbow_lab(lesson):
    """第十課：雨滴裡的光路與彩虹（assets/js/rainbow-drops.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    views = [("sky", "&#127752;", "You and the rain", "你和雨"), ("drop", "&#128167;", "One raindrop", "一顆雨滴")]
    vb = "".join(f'<button type="button" data-view="{k}" aria-pressed="{"true" if k == "sky" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>' for k, ic, en, zh in views)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("second", "Second rainbow", "第二道彩虹", False), ("rays", "Many rays (raindrop)", "很多道光（雨滴）", False)])
    return f'''<div class="astro-lab bt-lab rb-lab rb-v-sky rvl" data-rainbow-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of sunlight bending inside raindrops to make a rainbow · 陽光在雨滴裡轉彎、形成彩虹的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Raindrops drawn much bigger than real; the angles are calculated · 雨滴畫得比真的大很多；角度是算出來的</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside rb-aside">
      <div class="rb-top">
        <p class="al-sky-k">View · 視角</p>
        <div class="bt-modes rb-views" role="group" aria-label="View · 視角">{vb}</div>
        <p class="al-sky-k rb-k0 rb-tk"></p>
        <ul class="rb-angles"></ul>
        <dl class="bt-nums rb-nums">
          <div><dt class="rb-k1"></dt><dd class="rb-v1"></dd></div>
          <div><dt class="rb-k2"></dt><dd class="rb-v2"></dd></div>
        </dl>
      </div>
      <p class="bt-msg rb-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider rb-sun-row"><span>Sun height · 太陽高度 <output class="rb-sun-out"></output></span>
        <input type="range" class="al-age rb-sun" min="0" max="60" step="0.5" value="20"></label>
      <label class="al-slider rb-b-row"><span>Where the light enters · 光射入的位置 <output class="rb-b-out"></output></span>
        <input type="range" class="al-age rb-b" min="0" max="0.99" step="0.005" value="0.86"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def soundwave_svg(size=56):
    """聲音小圖（萬物原理首頁的課程卡）：喇叭與一圈圈往外傳的聲波，最後到耳朵。"""
    return (f'<svg class="soundwave-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M6 24h7l9-8v28l-9-8H6z" fill="#cfd4dc"/>'
            '<g fill="none" stroke="#ff9a4a" stroke-width="2.4" stroke-linecap="round">'
            '<path d="M27 23a9 9 0 0 1 0 14"/><path d="M32 18a16 16 0 0 1 0 24"/><path d="M37 13a23 23 0 0 1 0 34"/></g>'
            '<path d="M48 22c4 0 6 3 6 7 0 5-4 5-4 9 0 3-2 4-4 4" fill="none" stroke="#f1c7a6" stroke-width="3" stroke-linecap="round"/></svg>')

def render_soundwave_lab(lesson):
    """第十一課：聲波從鼓傳到耳朵（assets/js/sound-waves.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("air", "Air", "空氣", True)])
    return f'''<div class="astro-lab bt-lab sn-lab rvl" data-soundwave-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a drum pushing waves of air molecules toward an ear · 鼓推動一波波空氣分子傳到耳朵的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Slowed down hundreds of times; molecules drawn huge and far apart · 放慢好幾百倍；分子畫得很大、很稀</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside sn-aside">
      <div class="sn-top">
        <p class="al-sky-k">What you hear · 你聽到的</p>
        <p class="sn-big"><b class="sn-hz"></b><span>Hz</span><em class="sn-pitch"></em></p>
        <dl class="bt-nums sn-nums">
          <div><dt>Wavelength in air · 波長</dt><dd class="sn-wl"></dd></div>
          <div><dt>Speed in air · 聲速</dt><dd>343 m/s</dd></div>
          <div><dt>At the ear · 到耳朵了嗎</dt><dd class="sn-arrive"></dd></div>
        </dl>
        <p class="al-sky-k sn-k2">How far is the lightning? · 閃電有多遠？</p>
        <label class="al-slider sn-sec-row"><span>Seconds from flash to thunder · 閃光到雷聲幾秒 <output class="sn-sec-out"></output></span>
          <input type="range" class="al-age sn-sec" min="0" max="20" step="0.5" value="6"></label>
        <p class="sn-thunder"><b class="sn-km"></b><span>away · 遠<small>Light arrives almost at once; sound takes about 3 seconds per kilometer. · 光幾乎瞬間就到，聲音約 3 秒走 1 公里。</small></span></p>
      </div>
      <p class="bt-msg sn-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider sn-f-row"><span>Pitch · 音調 <output class="sn-f-out"></output></span>
        <input type="range" class="al-age sn-f" min="0" max="1" step="0.005" value="0.42"></label>
      <label class="al-slider sn-a-row"><span>Loudness · 音量 <output class="sn-a-out"></output></span>
        <input type="range" class="al-age sn-a" min="0" max="1" step="0.01" value="0.55"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def _htw_flat():
    return [(ui, u, l) for ui, u in enumerate(HTW["units"]) for l in u["lessons"]]

def _htw_nav(slug):
    flat = _htw_flat()
    i = next(n for n, (_, _, l) in enumerate(flat) if l["slug"] == slug)
    def side(item, dirn, label):
        if not item:
            return '<span class="pm-nav-x"></span>'
        l = item[2]
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{HTW_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = flat[i - 1] if i > 0 else None
    nxt = flat[i + 1] if i < len(flat) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{HTW_BASE}">&#9776; 回萬物原理 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def build_htw_lesson(ui, unit, lesson):
    path = f'{HTW_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="htw", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab["kind"]
    lab_html = {"battery": render_battery_lab, "generator": render_generator_lab, "solar": render_solarcell_lab, "wind": render_windturbine_lab, "internet": render_internet_lab, "signal": render_cellsignal_lab, "gps": render_gps_lab, "memory": render_memory_lab, "sky": render_skyblue_lab, "rainbow": render_rainbow_lab, "sound": render_soundwave_lab}[kind](lesson)

    secs = []
    if lesson.get("mix"):
        mx = lesson["mix"]
        segs = "".join(
            f'<span class="hw-mix-seg hw-mix-{p["key"]}" style="flex:{p["pct"]}" title="{html.escape(p["en"])} · {html.escape(p["zh"])} {p["pct"]}%">'
            f'{p["pct"]:.0f}%</span>' for p in mx["parts"])
        keys = "".join(
            f'<li><i class="hw-mix-{p["key"]}" aria-hidden="true"></i><b>{p["pct"]}%</b>{html.escape(p["en"])}<span class="zh">{html.escape(p["zh"])}</span></li>'
            for p in mx["parts"])
        secs.append(("mix", "Taiwan's Power · 台灣的電", mx["title_en"], mx["title_zh"],
                     f'<div class="hw-mix rvl"><div class="hw-mix-bar" role="img" aria-label="{html.escape(mx["title_en"])}">{segs}</div>'
                     f'<ul class="hw-mix-key">{keys}</ul>'
                     f'<p class="hw-mix-note">{html.escape(mx["note_en"])}<span class="zh">{html.escape(mx["note_zh"])}</span></p></div>',
                     _bi(mx["lead_en"], mx["lead_zh"], cls="lead rvl d2")))
    if lesson.get("plants"):
        def _plant(pl):
            go = (f'<button type="button" class="ph-go" data-lab-drive="{pl["drive"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>'
                  if pl.get("drive") else '<p class="ty-none hw-nospin">No generator to spin · 沒有發電機要轉</p>')
            return (f'<article class="ph-card hw-part rvl">'
                    f'<div class="ph-ico hw-ico" aria-hidden="true">{pl["icon"]}</div>'
                    f'<h3>{html.escape(pl["en"])}<span class="zh">{html.escape(pl["zh"])}</span></h3>'
                    f'<p class="ph-meta"><span>{html.escape(pl["share_en"])} · {html.escape(pl["share_zh"])}</span>'
                    f'<span><b>&#10227;</b> {html.escape(pl["spin_en"])} · {html.escape(pl["spin_zh"])}</span></p>'
                    f'<p class="ph-when">{html.escape(pl["text_en"])}<br><span class="zh">{html.escape(pl["text_zh"])}</span></p>'
                    f'{go}</article>')
        secs.append(("plants", "Six Ways to Make Power · 六種發電方式", "What turns the generator?", "是什麼在轉發電機？",
                     f'<div class="ph-grid hw-plant-grid stagger">{"".join(_plant(p) for p in lesson["plants"])}</div>',
                     _bi(lesson["plants_note_en"], lesson["plants_note_zh"], cls="lead rvl d2")))
    if lesson.get("parts"):
        cards = "".join(
            f'<article class="ph-card hw-part rvl">'
            f'<div class="ph-ico hw-ico" aria-hidden="true">{pt["icon"]}</div>'
            f'<h3>{html.escape(pt["en"])}<span class="zh">{html.escape(pt["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(pt["meta_en"])} · {html.escape(pt["meta_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(pt["text_en"])}<br><span class="zh">{html.escape(pt["text_zh"])}</span></p>'
            + (f'<button type="button" class="ph-go" data-lab-demo="{pt["demo"]}">Try it in 3D · 在模型中試 <i>&uarr;</i></button>' if pt.get("demo")
               else f'<button type="button" class="ph-go" data-lab-speed="{pt["speed"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if pt.get("speed") is not None
               else f'<button type="button" class="ph-go" data-lab-light="{pt["light"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>' if pt.get("light")
               else f'<button type="button" class="ph-go" data-lab-part="{pt["key"]}">See it in 3D · 在模型中看 <i>&uarr;</i></button>')
            + '</article>'
            for pt in lesson["parts"])
        ph = lesson.get("parts_head") or {"eyebrow": "Four Parts · 四個部分", "en": "What is inside a battery", "zh": "電池裡面有什麼"}
        secs.append(("parts", ph["eyebrow"], ph["en"], ph["zh"],
                     f'<div class="ph-grid stagger">{cards}</div>',
                     _bi(lesson["parts_note_en"], lesson["parts_note_zh"], cls="lead rvl d2")))
    if lesson.get("facts"):
        fx = lesson["facts"]
        tiles = "".join(
            f'<div class="hw-fact rvl"><b class="hw-fact-n">{html.escape(it["big"])}</b>'
            f'<span class="hw-fact-u">{html.escape(it["unit_en"])} · {html.escape(it["unit_zh"])}</span>'
            f'<p>{html.escape(it["en"])}<span class="zh">{html.escape(it["zh"])}</span></p></div>'
            for it in fx["items"])
        secs.append(("facts", fx["eyebrow"], fx["en"], fx["zh"], f'<div class="hw-facts">{tiles}</div>',
                     _bi(fx["lead_en"], fx["lead_zh"], cls="lead rvl d2")))
    secs.append(("myths", "Myth vs. Fact · 常見迷思", "Four things people get wrong", "四個常見的誤會", _sci_myths(lesson), ""))
    tricks_h = {"battery": ("Batteries in a sentence", "一句話記住電池"),
                "generator": ("Power plants in a sentence", "一句話記住發電"),
                "solar": ("Solar power in a sentence", "一句話記住太陽能"),
                "wind": ("Wind power in a sentence", "一句話記住風力發電"),
                "internet": ("The internet in a sentence", "一句話記住網際網路"),
                "signal": ("Phone signals in a sentence", "一句話記住手機訊號"),
                "gps": ("GPS in a sentence", "一句話記住 GPS"),
                "memory": ("Memory in a sentence", "一句話記住記憶體"),
                "sky": ("The blue sky in a sentence", "一句話記住藍天"),
                "rainbow": ("Rainbows in a sentence", "一句話記住彩虹"),
                "sound": ("Sound in a sentence", "一句話記住聲音")}[kind]
    secs.append(("tricks", "Remember It · 記憶口訣", tricks_h[0], tricks_h[1], _sci_tricks(lesson), ""))
    if lesson.get("safety"):
        items = "".join(f'<li class="rvl">{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></li>' for s in lesson["safety"])
        secs.append(("safety", "Safety First · 安全提醒", "Before you try anything", "動手之前先讀",
                     f'<ul class="hw-safety">{items}</ul>', ""))
    acts = lesson.get("activities") or [lesson["activity"]]
    for n, act in enumerate(acts, 1):
        eb = "Classroom Activity · 課堂活動" if len(acts) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))
    src_html = ""
    if lesson.get("sources"):
        rows = "".join(
            f'<li><span>{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></span>'
            f'<a href="{html.escape(s["url"])}" target="_blank" rel="noopener">{html.escape(s["src"])} &#8599;</a></li>'
            for s in lesson["sources"])
        src_html = (f'<div class="hw-sources rvl"><p class="sub-head">Sources · 資料出處</p>'
                    f'<p class="muted">Facts and numbers on this page were checked against these sources (October 2026). · 本頁的事實與數字依下列資料查證（2026 年 10 月）。</p>'
                    f'<ol>{rows}</ol></div>')

    eyebrow = (f'How Things Work · Unit {ui + 1} · Lesson {lesson["n"]} · '
               f'萬物原理 單元{_htw_cn(ui + 1)} 第{_htw_cn(lesson["n"])}課')
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(HTW_BASE, "回萬物原理 · All Lessons"))}
<section class="section astro-lab-sec" id="model"><div class="wrap">
  <div class="big-idea rvl"><span class="big-idea-k">Big idea · 一句話看懂</span>{_bi(lesson["big_idea_en"], lesson["big_idea_zh"])}</div>
  <p class="eyebrow rvl">{html.escape(lab["eyebrow"])}</p>
  <h2 class="rvl d1 sweep">{html.escape(lab["title_en"])} <span class="tp-h2-en">{html.escape(lab["title_zh"])}</span></h2>
  {_bi(lab["how_en"], lab["how_zh"], cls="lead rvl d2 al-how")}
  {lab_html}
</div></section>
<section class="section band" id="reading"><div class="wrap" style="max-width:940px">
  <p class="eyebrow rvl">Reading · 英文閱讀</p>
  {reading_html}
</div></section>
{sec_html}
<section class="section"><div class="wrap">
{src_html}
{_htw_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'how-things-work-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_htw_head(_HTW_JS[kind])))
    return path

def build_htw_hub():
    # 照中醫養生：單元導覽＋每個單元一段橫向課程卡；做好的課可點，planned 是「製作中」卡。
    def icon(l):
        return battery_svg(60) if l.get("card") == "battery" else outlet_svg(60) if l.get("card") == "outlet" else solarpanel_svg(60) if l.get("card") == "solar" else windturbine_svg(60) if l.get("card") == "wind" else internet_svg(60) if l.get("card") == "internet" else cellsignal_svg(60) if l.get("card") == "signal" else gps_svg(60) if l.get("card") == "gps" else memory_svg(60) if l.get("card") == "memory" else skyblue_svg(60) if l.get("card") == "sky" else rainbow_svg(60) if l.get("card") == "rainbow" else soundwave_svg(60) if l.get("card") == "sound" else l["icon"]
    unit_sections, nav = [], []
    done = sum(len(u["lessons"]) for u in HTW["units"])
    total = done + sum(len(u.get("planned", [])) for u in HTW["units"])
    for idx, u in enumerate(HTW["units"]):
        rows = []
        for l in u["lessons"]:
            rows.append((l["n"],
                f'<a class="lc-row rvl" href="{HTW_BASE}{l["slug"]}/">'
                f'<span class="lc-ico" aria-hidden="true">{icon(l)}</span>'
                f'<span class="lc-body">'
                f'<span class="lc-meta"><b>Lesson {l["n"]} · 第{_htw_cn(l["n"])}課</b><i>{html.escape(l["level"])}</i></span>'
                f'<h3 class="lc-title">{html.escape(l["title"])}</h3>'
                f'<span class="lc-zh">{html.escape(l["title_zh"])}</span>'
                f'<span class="lc-bl">{html.escape(l["blurb_en"])}</span>'
                f'<span class="lc-bl zh">{html.escape(l["blurb_zh"])}</span>'
                f'<span class="lc-go">Start the lesson · 開始上課 <i>&rarr;</i></span>'
                f'</span></a>'))
        for p in u.get("planned", []):
            rows.append((p["n"],
                f'<div class="lc-row lc-soon rvl">'
                f'<span class="lc-ico" aria-hidden="true">{p["icon"]}</span>'
                f'<span class="lc-body"><span class="lc-meta"><b>Lesson {p["n"]} · 第{_htw_cn(p["n"])}課 · Coming soon 製作中</b></span>'
                f'<h3 class="lc-title">{html.escape(p["en"])}</h3><span class="lc-zh">{html.escape(p["zh"])}</span></span></div>'))
        rows.sort(key=lambda r: r[0])
        band = " band" if idx % 2 == 0 else ""
        uid = f"unit-{idx + 1}"
        nav.append(f'<a class="unit-nav-link" href="#{uid}"><b>{idx + 1}</b><span>{html.escape(u["title_zh"])}</span></a>')
        unit_sections.append(
            f'<section class="section lc-unit{band}" id="{uid}"><div class="wrap">'
            f'<p class="eyebrow rvl">Unit {idx + 1} · 單元{_htw_cn(idx + 1)}</p>'
            f'<h2 class="rvl d1 sweep">{html.escape(u["title_en"])} <span class="tp-h2-en">{html.escape(u["title_zh"])}</span></h2>'
            f'<p class="lead rvl d2" style="max-width:62ch">{html.escape(u["blurb_en"])}<br>'
            f'<span class="muted">{html.escape(u["blurb_zh"])}</span></p>'
            f'<div class="lc-list">{"".join(r[1] for r in rows)}</div>'
            f'</div></section>')
    unit_nav = (f'<nav class="unit-nav" aria-label="Jump to unit · 單元導覽"><div class="wrap">'
                f'<span class="unit-nav-label">Jump to unit · 跳到單元</span>'
                f'<div class="unit-nav-track">{"".join(nav)}</div></div></nav>')
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in HTW["intro"])
    intro_html += _bi(f"{done} of {total} lessons are ready so far; more are on the way.",
                      f"目前完成 {done} 課（共規劃 {total} 課），持續增加中。", cls="hw-progress")
    lead = f'{html.escape(HTW["lead_en"])}<br><span class="muted">{html.escape(HTW["lead_zh"])}</span>'
    body = f'''
{page_hero(HTW["eyebrow"], f'{HTW["title_en"]} <span class="h1-zh">{HTW["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{intro_html}</div>
</div></section>
{unit_nav}
{"".join(unit_sections)}
'''
    write(HTW_BASE, layout(HTW_BASE, f'{HTW["title_en"]} · {HTW["title_zh"]}',
          f'{HTW["lead_en"]} {HTW["lead_zh"]}', body, "resources", extra_head=_htw_head() + _lc_head()))
    return HTW_BASE


# ---- 晶片與半導體 Chips and Semiconductors（資料驅動，data/semiconductors.json）----
# 架構照萬物原理：系列首頁分單元（單元導覽＋.lc-row 橫向課程卡），課程頁照天文教育
# （英文 reading＋每課一個 3D 模型＋延伸段落）。units[].lessons 是做好的課、units[].planned 是製作中。
# 3D 原始碼在 tools/chips/src/（three.js、esbuild，每課一個入口），打包成 assets/js/chip-*.js；
# 面板、迷思、口訣、活動沿用 astro.css，本系列多出來的在 chips.css（class 前綴 cp-）；兩者都只載在本系列頁面。
_chipj = os.path.join(ROOT, "data", "semiconductors.json")
CHIP = json.load(open(_chipj, encoding="utf-8")) if os.path.exists(_chipj) else None
CHIP_BASE = "/resources/classes/semiconductors/"
_CHIP_JS = {"doping": "chip-doping", "transistor": "chip-transistor", "wafer": "chip-wafer"}   # lab.kind → assets/js/<bundle>.js

def _chip_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/chips.css", *(f"assets/js/{j}.js" for j in _CHIP_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _chip_head(js=None):
    v = _chip_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return (f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/chips.css?v={v}">\n{tag}')

def chipsilicon_svg(size=56):
    """晶片與半導體的系列小圖示：一顆有腳的晶片，裡面是矽原子格子（藍灰），中間一顆換成磷（橘）。"""
    pins = "".join(
        f'<rect x="{15 + i * 8}" y="3" width="3" height="7" rx="1" fill="#cfd4dc"/><rect x="{15 + i * 8}" y="50" width="3" height="7" rx="1" fill="#cfd4dc"/>'
        f'<rect x="3" y="{15 + i * 8}" width="7" height="3" rx="1" fill="#cfd4dc"/><rect x="50" y="{15 + i * 8}" width="7" height="3" rx="1" fill="#cfd4dc"/>'
        for i in range(4))
    pts = [(20 + c * 10, 20 + r * 10) for r in range(3) for c in range(3)]
    bonds = "".join(f'<line x1="{x}" y1="{y}" x2="{x + 10}" y2="{y}" stroke="#5f7290" stroke-width="1.6"/>' for x, y in pts if x < 40)
    bonds += "".join(f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y + 10}" stroke="#5f7290" stroke-width="1.6"/>' for x, y in pts if y < 40)
    atoms = "".join(f'<circle cx="{x}" cy="{y}" r="3.6" fill="{"#ff9a3c" if (x, y) == (30, 30) else "#9fb3d1"}"/>' for x, y in pts)
    return (f'<svg class="chipsilicon-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{pins}<rect x="9" y="9" width="42" height="42" rx="5" fill="#1d2b3f" stroke="#5f7fa8" stroke-width="1.6"/>'
            f'{bonds}{atoms}<circle cx="36.5" cy="25" r="1.8" fill="#58e1ff"/></svg>')

def render_chipdoping_lab(lesson):
    """第一課：銅、玻璃、矽與摻雜（assets/js/chip-doping.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    dopes = [("pure", "&#9898;", "Pure silicon", "純矽"), ("n", "&#128992;", "Phosphorus (N)", "加磷（N 型）"),
             ("p", "&#128995;", "Boron (P)", "加硼（P 型）")]
    db = "".join(f'<button type="button" data-dope="{k}" aria-pressed="{"true" if k == "pure" else "false"}"><i aria-hidden="true">{ic}</i>{en}<small>{zh}</small></button>'
                 for k, ic, en, zh in dopes)
    marks = [("glass", "Glass", "玻璃"), ("pure", "Pure silicon", "純矽"), ("copper", "Copper", "銅")]
    mk = "".join(f'<i class="cp-mk cp-mk-{k}" data-mk="{k}"><b>{en}</b><small>{zh}</small></i>' for k, en, zh in marks)
    tg = _lab_toggles([("power", "Power", "電源", True), ("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab rvl" data-chipdoping-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model comparing copper, glass and silicon, and a close-up of silicon atoms with phosphorus or boron added · 比較銅、玻璃與矽，並放大看矽原子摻進磷或硼的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="cmp" aria-pressed="true">Three materials<small>三種材料</small></button>
        <button type="button" data-view="atoms" aria-pressed="false">Inside silicon<small>矽的原子</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <div class="cp-top">
        <p class="al-sky-k">What is in the silicon? · 矽裡加了什麼？</p>
        <div class="cp-dope" role="group" aria-label="What is in the silicon? · 矽裡加了什麼？">{db}</div>
        <label class="al-slider cp-amt-row"><span>How much? · 加多少？</span>
          <output class="cp-amt-out"></output>
          <input type="range" class="al-age cp-amt" min="0" max="70" step="1" value="50" aria-label="How much is added · 加多少"></label>
      </div>
      <div class="cp-ladder">
        <p class="al-sky-k">How well it conducts · 導電能力</p>
        <div class="cp-track">{mk}<i class="cp-mk cp-mk-you" aria-hidden="true"><b>Your silicon</b><small>你的矽</small></i></div>
        <p class="cp-ladder-note">Each tick is 10 times more · 每一格差 10 倍</p>
      </div>
      <dl class="cp-nums">
        <div><dt>Free to move · 自由的電荷</dt><dd class="cp-free"></dd></div>
        <div><dt>Vs. pure silicon · 跟純矽比</dt><dd class="cp-times"></dd></div>
        <div><dt>Silicon's LED · 矽那一排的 LED</dt><dd class="cp-led"></dd></div>
      </dl>
      <p class="cp-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def chiptransistor_svg(size=56):
    """第二課的課程卡小圖示：電晶體剖面（紫色 P 型、兩塊藍色 N 型、金色閘極），中間一條亮起的電子通道。"""
    dots = "".join(f'<circle cx="{x}" cy="35.5" r="1.4" fill="#58e1ff"/>' for x in range(23, 39, 3))
    return (f'<svg class="chiptransistor-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="6" y="30" width="48" height="22" rx="3" fill="#6a4aa0" opacity=".85"/>'
            '<rect x="6" y="30" width="15" height="10" rx="2" fill="#2f6fd6"/><rect x="39" y="30" width="15" height="10" rx="2" fill="#2f6fd6"/>'
            '<rect x="20" y="27" width="20" height="3" fill="#e8f0ff"/><rect x="20" y="17" width="20" height="10" rx="1.5" fill="#c9a14a"/>'
            '<rect x="28.5" y="7" width="3" height="10" fill="#cfd4dc"/><rect x="12" y="20" width="3" height="10" fill="#cfd4dc"/><rect x="45" y="20" width="3" height="10" fill="#cfd4dc"/>'
            f'{dots}<text x="30" y="25" text-anchor="middle" font-size="7" font-weight="800" fill="#1b1405" font-family="sans-serif">1</text></svg>')

def render_chiptransistor_lab(lesson):
    """第二課：電晶體剖面＋串聯／並聯開關（assets/js/chip-transistor.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    rows = "".join(f'<tr data-ab="{a}{b}"><td>{a}</td><td>{b}</td><td>{a & b}</td><td>{a | b}</td></tr>' for a in (0, 1) for b in (0, 1))
    return f'''<div class="astro-lab cp-lab cp-tr-lab rvl" data-chiptransistor-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of a transistor whose gate opens a channel of electrons, and two transistors wired as AND and OR · 電晶體剖面：閘極打開電子通道；以及兩顆電晶體接成「且」與「或」的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="one" aria-pressed="true">One transistor<small>一顆電晶體</small></button>
        <button type="button" data-view="logic" aria-pressed="false">Switches that add<small>會算數的開關</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <div class="cp-tr-one">
        <p class="al-sky-k">Gate voltage · 閘極電壓</p>
        <div class="cp-dope cp-tr-quick" role="group" aria-label="Gate · 閘極">
          <button type="button" data-gate="0" aria-pressed="true"><i aria-hidden="true">&#11093;</i>Off · 0<small>關</small></button>
          <button type="button" data-gate="1" aria-pressed="false"><i aria-hidden="true">&#128994;</i>On · 1<small>開</small></button>
        </div>
        <label class="al-slider cp-amt-row"><span>Slide it slowly · 慢慢拉</span>
          <output class="cp-amt-out cp-vg-out"></output>
          <input type="range" class="al-age cp-vg" min="0" max="100" step="1" value="0" aria-label="Gate voltage · 閘極電壓"></label>
        <p class="cp-tr-mk"><span>Current · 電流</span><span class="cp-tr-meter"><i></i></span></p>
        <dl class="cp-nums cp-nums3">
          <div><dt>Channel · 通道</dt><dd class="cp-chan"></dd></div>
          <div><dt>Current · 電流</dt><dd class="cp-cur"></dd></div>
          <div><dt>Switch · 開關</dt><dd class="cp-bit cp-led"></dd></div>
        </dl>
      </div>
      <div class="cp-tr-two">
        <p class="al-sky-k">Inputs · 輸入</p>
        <div class="cp-dope cp-tr-ins" role="group" aria-label="Inputs · 輸入">
          <button type="button" data-in="a" aria-pressed="true">A = <b>1</b><small>按一下切換</small></button>
          <button type="button" data-in="b" aria-pressed="false">B = <b>0</b><small>按一下切換</small></button>
        </div>
        <table class="cp-tr-truth"><thead><tr><th>A</th><th>B</th><th>AND<small>且</small></th><th>OR<small>或</small></th></tr></thead><tbody>{rows}</tbody></table>
        <p class="cp-tr-sum" aria-live="polite"></p>
      </div>
      <p class="cp-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def chipwafer_svg(size=56):
    """第三課的課程卡小圖示：一片晶圓（銀色圓、底部缺口），上面排滿藍色晶片方格。"""
    cells = "".join(f'<rect x="{x}" y="{y}" width="6.4" height="6.4" rx=".8" fill="#2f6fd6"/>'
                    for x in range(9, 50, 7) for y in range(9, 50, 7)
                    if (x + 3.2 - 30) ** 2 + (y + 3.2 - 30) ** 2 <= 18 ** 2)
    return (f'<svg class="chipwafer-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="30" cy="30" r="25" fill="#c9d2de"/><circle cx="30" cy="30" r="25" fill="none" stroke="#5f7290" stroke-width="1.4"/>'
            f'{cells}<circle cx="30" cy="55" r="1.8" fill="#0b1326"/></svg>')

def render_chipwafer_lab(lesson):
    """第三課：從沙子到晶片的生產線（assets/js/chip-wafer.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    st = lab["steps"]
    btns = "".join(f'<button type="button" data-step="{i}" aria-pressed="false"><b>{i + 1}</b>{html.escape(s["short_en"])}<small>{html.escape(s["short_zh"])}</small></button>'
                   for i, s in enumerate(st))
    panels = "".join(
        f'<div class="cp-wf-panel" data-panel="{i}" hidden><p class="cp-wf-k">Step {i + 1} · 第 {i + 1} 步</p>'
        f'<h3>{html.escape(s["title_en"])}<span class="zh">{html.escape(s["title_zh"])}</span></h3>'
        f'<p class="cp-msg">{html.escape(s["text_en"])}<span class="zh">{html.escape(s["text_zh"])}</span></p>'
        + ('<dl class="cp-nums">' + "".join(f'<div><dt>{html.escape(n["k_en"])} · {html.escape(n["k_zh"])}</dt><dd>{html.escape(n["v_en"])}<small>{html.escape(n["v_zh"])}</small></dd></div>' for n in s.get("nums", [])) + '</dl>' if s.get("nums") else '')
        + '</div>' for i, s in enumerate(st))
    data_steps = html.escape(json.dumps([{"short_en": s["short_en"], "short_zh": s["short_zh"]} for s in st], ensure_ascii=False))
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-wf-lab rvl" data-chipwafer-lab data-steps="{data_steps}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D production line from quartz sand to a packaged chip · 從石英砂到封裝晶片的 3D 生產線"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="line" aria-pressed="true">Whole line<small>整條生產線</small></button>
        <button type="button" data-view="step" aria-pressed="false">Close-up<small>近看這一步</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">Six steps · 六個步驟</p>
      <div class="cp-wf-steps" role="group" aria-label="Steps · 步驟">{btns}</div>
      <button type="button" class="cp-wf-tour" aria-pressed="false"><span aria-hidden="true">&#9654;</span> <span class="t">Play the whole journey · 播放全程</span></button>
      <p class="cp-msg">{html.escape(lab["overview_en"])}<span class="zh">{html.escape(lab["overview_zh"])}</span></p>
      {panels}
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _chip_dies(dz):
    """「一片晶圓切得出幾顆晶片？」（chip-wafer.js 的 initCalc 計算與畫圖；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-die="{p["w"]}x{p["h"]}" aria-pressed="false">{p["w"]} × {p["h"]} mm<small>{html.escape(p["zh"])}</small></button>'
                  for p in dz["presets"])
    return (f'<div class="cp-dpw rvl" data-chip-dies>'
            f'<div class="cp-dpw-pic"><canvas class="cp-dpw-cv" aria-label="A 300 mm wafer covered with chips · 排滿晶片的 300 mm 晶圓"></canvas>'
            f'<p class="cp-dpw-key"><i class="ok"></i>Whole chips · 完整晶片　<i class="no"></i>Wasted at the edge · 邊緣浪費</p></div>'
            f'<div class="cp-dpw-side">'
            f'<div class="cp-cnt-in"><label class="cp-cnt-l"><span>Chip size · 晶片大小 <output class="cp-dpw-size-out"></output></span>'
            f'<input type="range" class="al-age cp-dpw-size" min="2" max="30" step="1" value="10" aria-label="Chip size in millimeters · 晶片邊長（公釐）"></label>'
            f'<div class="cp-dpw-pre" role="group" aria-label="Presets · 範例">{pre}</div>'
            f'<p class="cp-cnt-note">{html.escape(dz["note_en"])}<span class="zh">{html.escape(dz["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">One 300 mm wafer · 一片 12 吋晶圓</p>'
            f'<p class="cp-home-big"><b class="cp-dpw-full">0</b> whole chips</p>'
            f'<p class="cp-home-zh"><b class="cp-dpw-full">0</b> 顆完整的晶片</p>'
            f'<p class="cp-home-sub"><b class="cp-dpw-part">0</b> pieces wasted at the edge · 邊緣浪費 <b class="cp-dpw-part">0</b> 塊</p>'
            f'<p class="cp-home-sub">Wafer area used by whole chips · 完整晶片占晶圓面積 <b class="cp-dpw-used">0%</b></p>'
            f'<p class="cp-home-note">The common shortcut formula says about <b class="cp-dpw-approx">0</b>.<span class="zh">常用的近似公式算出約 <b class="cp-dpw-approx">0</b> 顆。</span></p>'
            f'</div></div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def _chip_count(ct):
    """「一顆一顆數，要數多久？」（chip-transistor.js 的 initCount 計算；不需要 WebGL）。"""
    opts = "".join(f'<option value="{i}"{" selected" if i == ct.get("default", 0) else ""}>{html.escape(c["en"])} · {html.escape(c["zh"])}</option>'
                   for i, c in enumerate(ct["chips"]))
    chips = html.escape(json.dumps([{"n": c["n"]} for c in ct["chips"]]))
    return (f'<div class="cp-cnt rvl" data-chip-count data-chips="{chips}" data-people="{ct["people"]}">'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>Chip · 晶片</span><select class="cp-cnt-chip">{opts}</select></label>'
            f'<div class="cp-cnt-who" role="group" aria-label="Who counts · 誰來數">'
            f'<button type="button" data-who="me" aria-pressed="true">Just me, 1 per second<small>我自己，一秒一顆</small></button>'
            f'<button type="button" data-who="taiwan" aria-pressed="false">Everyone in Taiwan<small>全台灣一起數</small></button></div>'
            f'<p class="cp-cnt-note">{html.escape(ct["people_en"])}<span class="zh">{html.escape(ct["people_zh"])}</span></p>'
            f'<p class="cp-cnt-note">{html.escape(ct["note_en"])}<span class="zh">{html.escape(ct["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Time to count · 要數多久</p>'
            f'<p class="cp-home-sub"><b class="cp-cnt-n">0</b> transistors · 顆電晶體</p>'
            f'<p class="cp-home-big"><b class="cp-cnt-en">—</b></p>'
            f'<p class="cp-home-zh"><b class="cp-cnt-zh">—</b></p>'
            f'<p class="cp-home-note">Since you opened this page, you could have counted <b class="cp-cnt-live">0</b> transistors.'
            f'<span class="zh">從你打開這一頁到現在，你可以數 <b class="cp-cnt-live">0</b> 顆。</span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The counter works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def _chip_home(hm):
    """「你家有幾顆晶片？」勾選清單（chip-doping.js 的 initHome 計算；不需要 WebGL）。"""
    est = {"source": ("source", "有出處"), "guess": ("our guess", "本站估計"), "min": ("at least", "至少")}
    rows = []
    for it in hm["items"]:
        q = it.get("qty", 0)
        e = est[it["est"]]
        rows.append(
            f'<li class="cp-hi{" on" if q else ""}" data-k="{it["key"]}">'
            f'<label class="cp-hi-l"><input type="checkbox"{" checked" if q else ""}>'
            f'<span class="cp-hi-ic" aria-hidden="true">{it["icon"]}</span>'
            f'<span class="cp-hi-t">{html.escape(it["en"])}<small>{html.escape(it["zh"])}</small></span></label>'
            f'<span class="cp-hi-n"><b>{it["n"]:,}</b> each · 每個<em class="cp-est-{it["est"]}">{e[0]} · {e[1]}</em></span>'
            f'<input class="cp-qty" type="number" min="1" max="20" value="{max(1, q)}" aria-label="How many · 幾個"></li>')
    items = html.escape(json.dumps([{"key": it["key"], "n": it["n"]} for it in hm["items"]]))
    return (f'<div class="cp-home rvl" data-chip-home data-items="{items}">'
            f'<ul class="cp-home-list">{"".join(rows)}</ul>'
            f'<div class="cp-home-out" aria-live="polite">'
            f'<p class="cp-home-k">Your home · 你家</p>'
            f'<p class="cp-home-big">at least <b class="cp-home-total">0</b> chips</p>'
            f'<p class="cp-home-zh">至少 <b class="cp-home-total">0</b> 顆晶片</p>'
            f'<p class="cp-home-sub">in <b class="cp-home-things">0</b> things · 分布在 <b class="cp-home-things">0</b> 樣東西裡</p>'
            f'<div class="cp-home-bar" aria-hidden="true"><i></i></div>'
            f'<p class="cp-home-note">{html.escape(hm["note_en"])}<span class="zh">{html.escape(hm["note_zh"])}</span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The counter works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def _chip_flat():
    return [(ui, u, l) for ui, u in enumerate(CHIP["units"]) for l in u["lessons"]]

def _chip_nav(slug):
    flat = _chip_flat()
    i = next(n for n, (_, _, l) in enumerate(flat) if l["slug"] == slug)
    def side(item, dirn, label):
        if not item:
            return '<span class="pm-nav-x"></span>'
        l = item[2]
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{CHIP_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = flat[i - 1] if i > 0 else None
    nxt = flat[i + 1] if i < len(flat) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{CHIP_BASE}">&#9776; 回晶片與半導體 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def build_chip_lesson(ui, unit, lesson):
    path = f'{CHIP_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="chips", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab["kind"]
    lab_html = {"doping": render_chipdoping_lab, "transistor": render_chiptransistor_lab, "wafer": render_chipwafer_lab}[kind](lesson)

    secs = []
    if lesson.get("home"):
        hm = lesson["home"]
        secs.append(("home", hm["eyebrow"], hm["en"], hm["zh"], _chip_home(hm), _bi(hm["lead_en"], hm["lead_zh"], cls="lead rvl d2")))
    if lesson.get("dies"):
        dz = lesson["dies"]
        secs.append(("dies", dz["eyebrow"], dz["en"], dz["zh"], _chip_dies(dz), _bi(dz["lead_en"], dz["lead_zh"], cls="lead rvl d2")))
    if lesson.get("count"):
        ct = lesson["count"]
        secs.append(("count", ct["eyebrow"], ct["en"], ct["zh"], _chip_count(ct), _bi(ct["lead_en"], ct["lead_zh"], cls="lead rvl d2")))
    if lesson.get("parts"):
        cards = "".join(
            f'<article class="ph-card cp-part rvl">'
            f'<div class="ph-ico cp-ico" aria-hidden="true">{pt["icon"]}</div>'
            f'<h3>{html.escape(pt["en"])}<span class="zh">{html.escape(pt["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(pt["meta_en"])} · {html.escape(pt["meta_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(pt["text_en"])}<br><span class="zh">{html.escape(pt["text_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-demo="{pt["demo"]}">Try it in 3D · 在模型中試 <i>&uarr;</i></button>'
            f'</article>' for pt in lesson["parts"])
        ph = lesson["parts_head"]
        secs.append(("parts", ph["eyebrow"], ph["en"], ph["zh"], f'<div class="ph-grid stagger">{cards}</div>',
                     _bi(lesson["parts_note_en"], lesson["parts_note_zh"], cls="lead rvl d2")))
    if lesson.get("links"):
        lk = "".join(
            f'<a class="cp-link rvl" href="{html.escape(x["href"])}">'
            f'<span class="cp-link-ic" aria-hidden="true">{x["icon"]}</span>'
            f'<span class="cp-link-b"><span class="cp-link-k">{html.escape(x["k_en"])} · {html.escape(x["k_zh"])}</span>'
            f'<b>{html.escape(x["en"])}</b><span class="zh cp-link-zh">{html.escape(x["zh"])}</span>'
            f'<span class="cp-link-n">{html.escape(x["note_en"])}<span class="zh">{html.escape(x["note_zh"])}</span></span>'
            f'<span class="cp-link-go">Go to the lesson · 前往這一課 <i>&rarr;</i></span></span></a>'
            for x in lesson["links"])
        lh = lesson.get("links_head") or {"eyebrow": "Go Further · 延伸閱讀", "en": "Electrons and holes at work", "zh": "電子和電洞在工作"}
        secs.append(("more", lh["eyebrow"], lh["en"], lh["zh"], f'<div class="cp-links">{lk}</div>', ""))
    if lesson.get("facts"):
        fx = lesson["facts"]
        tiles = "".join(
            f'<div class="cp-fact rvl"><b class="cp-fact-n">{html.escape(it["big"])}</b>'
            f'<span class="cp-fact-u">{html.escape(it["unit_en"])} · {html.escape(it["unit_zh"])}</span>'
            f'<p>{html.escape(it["en"])}<span class="zh">{html.escape(it["zh"])}</span></p></div>'
            for it in fx["items"])
        secs.append(("facts", fx["eyebrow"], fx["en"], fx["zh"], f'<div class="cp-facts">{tiles}</div>',
                     _bi(fx["lead_en"], fx["lead_zh"], cls="lead rvl d2")))
    if lesson.get("culture_cards"):
        cu = lesson["culture_cards"]
        cc = "".join(
            f'<article class="cc-card rvl"><p class="cc-k">{html.escape(c["k"])}</p>'
            f'<h3>{html.escape(c["en"])}<span class="zh">{html.escape(c["zh"])}</span></h3>'
            f'{_bi(c["body_en"], c["body_zh"])}</article>'
            for c in cu["cards"])
        secs.append(("stories", cu["eyebrow"], cu["title_en"], cu["title_zh"], f'<div class="cc-grid">{cc}</div>',
                     _bi(cu["lead_en"], cu["lead_zh"], cls="lead rvl d2")))
    secs.append(("myths", "Myth vs. Fact · 常見迷思", "Four things people get wrong", "四個常見的誤會", _sci_myths(lesson), ""))
    tricks_h = {"doping": ("Semiconductors in a sentence", "一句話記住半導體"),
                "transistor": ("Transistors in a sentence", "一句話記住電晶體"),
                "wafer": ("From sand to chip in a sentence", "一句話記住沙子變晶片")}[kind]
    secs.append(("tricks", "Remember It · 記憶口訣", tricks_h[0], tricks_h[1], _sci_tricks(lesson), ""))
    if lesson.get("safety"):
        items = "".join(f'<li class="rvl">{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></li>' for s in lesson["safety"])
        secs.append(("safety", "Safety First · 安全提醒", "Before you try anything", "動手之前先讀",
                     f'<ul class="cp-safety">{items}</ul>', ""))
    acts = lesson.get("activities") or [lesson["activity"]]
    for n, act in enumerate(acts, 1):
        eb = "Classroom Activity · 課堂活動" if len(acts) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))
    src_html = ""
    if lesson.get("sources"):
        rows = "".join(
            f'<li><span>{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></span>'
            f'<a href="{html.escape(s["url"])}" target="_blank" rel="noopener">{html.escape(s["src"])} &#8599;</a></li>'
            for s in lesson["sources"])
        src_html = (f'<div class="cp-sources rvl"><p class="sub-head">Sources · 資料出處</p>'
                    f'<p class="muted">Facts and numbers on this page were checked against these sources (October 2026). · 本頁的事實與數字依下列資料查證（2026 年 10 月）。</p>'
                    f'<ol>{rows}</ol></div>')

    eyebrow = (f'Chips and Semiconductors · Unit {ui + 1} · Lesson {lesson["n"]} · '
               f'晶片與半導體 單元{_htw_cn(ui + 1)} 第{_htw_cn(lesson["n"])}課')
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(CHIP_BASE, "回晶片與半導體 · All Lessons"))}
<section class="section astro-lab-sec" id="model"><div class="wrap">
  <div class="big-idea rvl"><span class="big-idea-k">Big idea · 一句話看懂</span>{_bi(lesson["big_idea_en"], lesson["big_idea_zh"])}</div>
  <p class="eyebrow rvl">{html.escape(lab["eyebrow"])}</p>
  <h2 class="rvl d1 sweep">{html.escape(lab["title_en"])} <span class="tp-h2-en">{html.escape(lab["title_zh"])}</span></h2>
  {_bi(lab["how_en"], lab["how_zh"], cls="lead rvl d2 al-how")}
  {lab_html}
</div></section>
<section class="section band" id="reading"><div class="wrap" style="max-width:940px">
  <p class="eyebrow rvl">Reading · 英文閱讀</p>
  {reading_html}
</div></section>
{sec_html}
<section class="section"><div class="wrap">
{src_html}
{_chip_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'semiconductors-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_chip_head(_CHIP_JS[kind])))
    return path

def build_chip_hub():
    # 照萬物原理：單元導覽＋每個單元一段橫向課程卡；做好的課可點，planned 是「製作中」卡。
    def icon(l):
        return chipsilicon_svg(60) if l.get("card") == "silicon" else chiptransistor_svg(60) if l.get("card") == "transistor" else chipwafer_svg(60) if l.get("card") == "wafer" else l["icon"]
    unit_sections, nav = [], []
    done = sum(len(u["lessons"]) for u in CHIP["units"])
    total = done + sum(len(u.get("planned", [])) for u in CHIP["units"])
    for idx, u in enumerate(CHIP["units"]):
        rows = []
        for l in u["lessons"]:
            rows.append((l["n"],
                f'<a class="lc-row rvl" href="{CHIP_BASE}{l["slug"]}/">'
                f'<span class="lc-ico" aria-hidden="true">{icon(l)}</span>'
                f'<span class="lc-body">'
                f'<span class="lc-meta"><b>Lesson {l["n"]} · 第{_htw_cn(l["n"])}課</b><i>{html.escape(l["level"])}</i></span>'
                f'<h3 class="lc-title">{html.escape(l["title"])}</h3>'
                f'<span class="lc-zh">{html.escape(l["title_zh"])}</span>'
                f'<span class="lc-bl">{html.escape(l["blurb_en"])}</span>'
                f'<span class="lc-bl zh">{html.escape(l["blurb_zh"])}</span>'
                f'<span class="lc-go">Start the lesson · 開始上課 <i>&rarr;</i></span>'
                f'</span></a>'))
        for p in u.get("planned", []):
            rows.append((p["n"],
                f'<div class="lc-row lc-soon rvl">'
                f'<span class="lc-ico" aria-hidden="true">{p["icon"]}</span>'
                f'<span class="lc-body"><span class="lc-meta"><b>Lesson {p["n"]} · 第{_htw_cn(p["n"])}課 · Coming soon 製作中</b></span>'
                f'<h3 class="lc-title">{html.escape(p["en"])}</h3><span class="lc-zh">{html.escape(p["zh"])}</span></span></div>'))
        rows.sort(key=lambda r: r[0])
        band = " band" if idx % 2 == 0 else ""
        uid = f"unit-{idx + 1}"
        nav.append(f'<a class="unit-nav-link" href="#{uid}"><b>{idx + 1}</b><span>{html.escape(u["title_zh"])}</span></a>')
        unit_sections.append(
            f'<section class="section lc-unit{band}" id="{uid}"><div class="wrap">'
            f'<p class="eyebrow rvl">Unit {idx + 1} · 單元{_htw_cn(idx + 1)}</p>'
            f'<h2 class="rvl d1 sweep">{html.escape(u["title_en"])} <span class="tp-h2-en">{html.escape(u["title_zh"])}</span></h2>'
            f'<p class="lead rvl d2" style="max-width:62ch">{html.escape(u["blurb_en"])}<br>'
            f'<span class="muted">{html.escape(u["blurb_zh"])}</span></p>'
            f'<div class="lc-list">{"".join(r[1] for r in rows)}</div>'
            f'</div></section>')
    unit_nav = (f'<nav class="unit-nav" aria-label="Jump to unit · 單元導覽"><div class="wrap">'
                f'<span class="unit-nav-label">Jump to unit · 跳到單元</span>'
                f'<div class="unit-nav-track">{"".join(nav)}</div></div></nav>')
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in CHIP["intro"])
    intro_html += _bi(f"{done} of {total} lessons are ready so far; more are on the way.",
                      f"目前完成 {done} 課（共規劃 {total} 課），持續增加中。", cls="cp-progress")
    lead = f'{html.escape(CHIP["lead_en"])}<br><span class="muted">{html.escape(CHIP["lead_zh"])}</span>'
    body = f'''
{page_hero(CHIP["eyebrow"], f'{CHIP["title_en"]} <span class="h1-zh">{CHIP["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl cp-intro"><span class="cp-intro-ic" aria-hidden="true">{chipsilicon_svg(76)}</span>{intro_html}</div>
</div></section>
{unit_nav}
{"".join(unit_sections)}
'''
    write(CHIP_BASE, layout(CHIP_BASE, f'{CHIP["title_en"]} · {CHIP["title_zh"]}',
          f'{CHIP["lead_en"]} {CHIP["lead_zh"]}', body, "resources", extra_head=_chip_head() + _lc_head()))
    return CHIP_BASE


def build_poetry_hub():
    cards = []
    for pm in POEMS["poems"]:
        cards.append(
            f'<a class="pm-card rvl" href="{POETRY_BASE}{pm["slug"]}/">'
            f'<span class="pm-card-lv">{html.escape(pm["level"])}</span>'
            f'<h3>{html.escape(pm["title"])}</h3>'
            f'<p class="pm-card-zh">{html.escape(pm["title_zh"])}</p>'
            f'<p class="pm-card-by">{html.escape(pm["poet"])} {html.escape(pm["poet_zh"])} · {html.escape(pm["year"])}</p>'
            f'<p class="pm-card-bl">{html.escape(pm["blurb"])}</p>'
            f'<span class="fcard-go">讀這首 <i>&rarr;</i></span></a>')
    body = f'''
{page_hero(POEMS["eyebrow"], POEMS["title"], html.escape(POEMS["lead"]), back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl">{_pm_paras(POEMS["intro"])}</div>
</div></section>
<section class="section band"><div class="wrap">
  <p class="eyebrow rvl">詩單</p>
  <h2 class="rvl d1 sweep">{len(POEMS["poems"])} 首，持續增加中</h2>
  <div class="pm-cards stagger">{"".join(cards)}</div>
</div></section>
'''
    write(POETRY_BASE, layout(POETRY_BASE, "名詩導讀",
          "英美名詩中英對照與逐節導讀：全詩對照、關鍵字詞、格律說明、文化背景與教學提示，並指出每首詩最容易被讀反的地方。",
          body, "resources"))
    return POETRY_BASE

def build_booklets():
    # ⚠ /resources/booklets/ 目前是轉址到 /resources/reading/ 的殘根（見檔末 redirect()），
    # 這裡的內容不會出現在線上；保持雙語只是為了將來若恢復此頁不必再改一次。
    hub_page("/resources/booklets/", "resources", "MCC Reading Booklets · 人師閱讀教材",
        "從一個字，讀到一篇文章",
        "Graded reading and conversation booklets, for self-study or the classroom."
        "<br><span class='muted'>依程度分級的閱讀與會話教材，適合自學與課堂使用。</span>",
        [
            ("/resources/booklets/basic/", "🌱", "Basic Reading · 初級閱讀",
             "Short passages for readers just starting out. 適合剛起步的讀者。"),
            ("/resources/booklets/intermediate/", "🌿", "Intermediate Reading · 中級閱讀",
             "Longer passages that widen vocabulary and sentence patterns. 進一步擴充字彙與句型。"),
            ("/resources/booklets/advanced/", "🌳", "Advanced Reading · 高級閱讀",
             "Full-length articles for readers ready to be challenged. 挑戰較長篇的英語文章。"),
            ("/resources/booklets/conversation/", "💬", "Practical Conversation · 實用英語會話",
             "Everyday dialogues, recorded line by line. 日常生活的實用對話，逐句真人朗讀。"),
            ("/resources/booklets/description/", "🖼️", "Picture Description · 看圖描述",
             "Look at the picture and say what you see. 看圖學描述，練口說與寫作。"),
            ("/resources/booklets/everyday/", "☀️", "Everyday Topics · 基礎英語",
             "The most basic everyday themes, in six booklets. 最基礎的日常英語主題，共六冊。"),
        ],
        cta="Open · 前往",
        desc="Graded reading and conversation booklets. 依程度分級的閱讀與會話教材。")

BOOKLET_LEAVES = [
    ("/resources/booklets/basic/", "初級閱讀", "適合剛起步的讀者。", "/E-resources/booklets/basic-reading"),
    ("/resources/booklets/intermediate/", "中級閱讀", "進一步擴充字彙與句型。", "/E-resources/booklets/intermediate-reading"),
    ("/resources/booklets/advanced/", "高級閱讀", "挑戰較長篇的英語文章。", "/E-resources/booklets/advanced-reading"),
    ("/resources/booklets/conversation/", "實用英語會話", "日常生活的實用對話。", "/E-resources/booklets/conversation-booklet"),
    ("/resources/booklets/description/", "看圖描述", "看圖學描述，練口說與寫作。", "/E-resources/booklets/description-booklet"),
    ("/resources/booklets/everyday/", "基礎英語", "最基礎的日常英語主題。", "/E-resources/booklets/everyday-topics"),
]

NAV_LABELS = set()  # collect to strip from prose
def _clean_paras(crawl_path):
    p = BY_PATH.get(crawl_path, {})
    txt = p.get("text", [])
    skip = {p.get("title", ""), SITE["name"]}
    # strip the repeated nav menu items
    menu = {it["label"] for it in NAV}
    for it in NAV:
        for c in it.get("children", []):
            menu.add(c["label"])
    menu |= {"首頁","認識人師","偏鄉英語教育","人師英語學院","Practicum","上課須知","英語學習資源",
             "人師閱讀教材","基礎英語","初級閱讀","中級閱讀","高級閱讀","實用英語會話","看圖描述",
             "英語學習影片","一分鐘英語-美國篇","初級口說訓練","中級口說訓練","自然發音","基礎英語造句篇",
             "一分鐘英語教室","英語句型分析-新","看時事學英文","彰化E視界英語教室","CIEN 校園英語",
             "一分鐘俚語","英語學習短片","人師英語課程","基礎文法","英語句型分析-舊","字根研究",
             "文章結構分析","VOA美國之音課程","伊索寓言","智慧話語","動物農莊","Grandfather落日餘暉",
             "英語期刊","人師影音專區","麥克爺爺放眼看台灣","國際交流影片","人師英語新聞","Enactus英語課程",
             "人師教育廣場","人物專訪影片","人師粉絲專頁","人師英語網站","人師影音頻道",
             "Trip-One Minute English: Halibut Point State Park-3"}
    out = []
    for t in txt:
        if t in skip or t in menu: continue
        t = t.replace("lukelin7429@gmail.com", SITE["email"])  # unify contact email
        out.append(t)
    return out

def build_grandfather():
    # 只呈現影片（30 章英語朗讀），不複製內文
    build_series(VIDEO_SERIES["/resources/grandfather/"])

_pj = os.path.join(ROOT, "data", "periodicals.json")
PERIODICALS = json.load(open(_pj, encoding="utf-8")) if os.path.exists(_pj) else None
PERI_REL = "https://github.com/lukelin7429/twrses/releases/download/periodicals-pdf"
PERI_PAGES = "https://github.com/lukelin7429/twrses/releases/download/periodicals-pages"

def peri_readings(ids):
    """每期文章朗讀（音檔）→ 就地小播放器，不用全幅燈箱。標籤去掉期號前綴。"""
    items = []
    for v in ids:
        raw = VIDEO_META.get(v, {}).get("title") or "文章朗讀"
        lab = re.sub(r"^[\wＨ]*\d{4}-[A-Za-z]{3}\s*", "", raw) or raw
        items.append(f'''<div class="lecture">
  <button class="lec-btn" data-ytin="{v}" aria-label="播放 {html.escape(lab)}">
    <span class="lec-play" aria-hidden="true">▶</span>
    <span class="lec-meta"><span class="lec-t">{html.escape(lab)}</span><span class="lec-sub">🔊 語音朗讀</span></span>
  </button>
  <div class="lec-stage"></div>
</div>''')
    return '<div class="lectures">' + "".join(items) + '</div>'

def build_periodicals():
    secs = []
    for s in PERIODICALS["series"]:
        cards = []
        for it in s["issues"]:
            a = it["asset"]; pdf = f"{PERI_REL}/{a}.pdf"; cover = f"/assets/img/periodicals/{a}.jpg"
            pages = it["pages"]
            vids = live_ids(it.get("videos", []))
            vid_html = (f'<details class="peri-vids"><summary>🔊 {len(vids)} 段文章朗讀</summary>'
                        f'{peri_readings(vids)}</details>') if vids else ""
            title = html.escape(f'{s["title"]}　{it["date"]}')
            cards.append(f'''<div class="peri-card rvl">
  <a class="peri-cover" href="{pdf}" data-read="{PERI_PAGES}/{a}-" data-pages="{pages}" data-title="{title}" data-pdf="{pdf}"><img loading="lazy" src="{cover}" alt="{it["date"]}">
    <span class="peri-pdf-badge">{pages} 頁</span><span class="peri-read-hint">📖 翻閱</span></a>
  <div class="peri-body">
    <h4>{it["date"]}</h4>
    <a class="peri-dl" href="{pdf}" target="_blank" rel="noopener">下載 PDF</a>
    {vid_html}
  </div>
</div>''')
        # 共用閱讀器（每系列一個，就地全寬展開）
        secs.append(f'''<div class="peri-series">
  <p class="eyebrow rvl">{html.escape(s["title"])} · {s["count"]} 期</p>
  <p class="muted rvl" style="margin:.2rem 0 1.2rem">{html.escape(s["blurb"])}</p>
  <div class="peri-grid stagger">{''.join(cards)}</div>
</div>''')
    reader = '''<div class="peri-reader" id="periReader" hidden>
  <div class="pr-bar"><span class="pr-title"></span>
    <span class="pr-actions"><a class="pr-dl" target="_blank" rel="noopener">下載 PDF</a>
    <button class="pr-close" aria-label="關閉閱讀">×</button></span></div>
  <div class="pr-stage">
    <button class="pr-prev" aria-label="上一頁">‹</button>
    <img class="pr-img" alt="期刊內頁">
    <button class="pr-next" aria-label="下一頁">›</button>
  </div>
  <div class="pr-foot">第 <span class="pr-cur">1</span> / <span class="pr-total">1</span> 頁　·　← → 翻頁</div>
</div>'''
    body = f'''
{page_hero("英語期刊", "翻閱，協會多年的耕耘", "明航心・鄉土情、明航雙語學園與全民英語期刊（2006–2009）典藏——點封面可線上翻頁閱讀，也可下載 PDF，並附當期文章朗讀。")}
<section class="section"><div class="wrap">{''.join(secs)}{reader}</div></section>
'''
    write("/resources/periodicals/", layout("/resources/periodicals/", "英語期刊", "明航心鄉土情、明航雙語學園、全民英語期刊典藏（2006–2009），每期可下載 PDF。", body, "resources"))

# media hub + leaves
def build_media_hub():
    hub_page("/media/", "media", "人師影音專區",
        "從生活，看見英語", "國際交流、英語新聞、教育廣場與人物專訪——協會的節目與紀實，從真實生活看見英語。",
        [
            ("/media/exchange/", "🌏", "國際交流", "學校訪問——麥克爺爺與 Dom Jones 把世界帶進彰化的教室。"),
            ("/media/news-videos/", "📰", "人師英語新聞", "一分鐘新聞、彰化英語新聞與特別報導。"),
            ("/media/enactus/", "🤝", "Enactus 英語課程", "與杜魯門大學 Enactus 合作的英語課程。"),
            ("/media/talks/", "🎤", "人師教育廣場", "教育講座與分享。"),
            ("/media/interviews/", "🎙️", "人物專訪", "教育者與貴賓的人物專訪。"),
        ])

MEDIA_LEAVES = [
    ("/media/exchange/", "media", "國際交流", "與各國師生的交流剪影。", "/RS-videos/exchange-videos"),
    ("/media/talks/", "media", "人師教育廣場", "教育講座與分享。", "/RS-videos/speeches"),
    ("/media/interviews/", "media", "人物專訪", "教育者與貴賓的人物專訪。", "/RS-videos/interviews"),
]

def build_enactus_hub():
    """/media/enactus/ — 兩大類分開、各自依集數排序，而非把 20 部影片混在一起亂排。"""
    cats = [
        ("/media/enactus/public-speaking/", "🎤", "公眾演說 Public Speaking",
         "從演說入門、肢體語言到克服怯場——用英語上台演說的技巧。"),
        ("/media/enactus/business/", "💼", "商業英文 Business English",
         "從台美商業習慣、定價品牌到創業提案——用英語談生意的核心概念。"),
    ]
    secs = []
    for i, (cpath, ico, cname, cblurb) in enumerate(cats):
        data = VIDEO_SERIES.get(cpath)
        if not data:
            continue
        band = " band" if i % 2 else ""
        grid = _ep_grid(data)
        count = len(data["episodes"])
        secs.append(f'''<section class="section{band}" id="cat{i+1}">
  <div class="wrap">
    <div class="flex rvl" style="justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;margin-bottom:1.4rem">
      <div>
        <h2 style="margin:0 0 .35rem"><span aria-hidden="true">{ico}</span> {html.escape(cname)}</h2>
        <p class="muted" style="margin:0;max-width:60ch">{html.escape(cblurb)}</p>
      </div>
      <div class="pills"><span class="pill"><b>{count}</b> 課</span><a class="pill" href="{cpath}">完整介紹 →</a></div>
    </div>
    {grid}
  </div>
</section>''')
    body = f'''
{page_hero("人師影音專區", "Enactus 英語課程",
  "與美國杜魯門大學（Truman State University）Enactus 團隊合作的「ConnectTaiwan」英語課程——分為「公眾演說」與「商業英文」兩大系列，各 10 課，依集數循序排列。點影片即可在本頁觀看。")}
{''.join(secs)}
'''
    write("/media/enactus/", layout("/media/enactus/", "Enactus 英語課程",
        "杜魯門大學 Enactus 團隊製作的英語課程：公眾演說與商業英文各 10 課，依集數排列，免費線上觀看。",
        body, "media"))

def _mike_card(v, ep=None):
    """One Grandpa Mike video card: episode chip + clean location title."""
    meta = VIDEO_META.get(v, {})
    raw = meta.get("title") or "觀看影片"
    # strip the recurring English series prefix to surface the location
    loc = re.sub(r"^\s*Through the Eyes of Grandpa Mike\s*", "", raw)
    loc = re.sub(r"^第\s*\d+\s*集\s*", "", loc).strip() or raw
    loc = html.escape(loc)
    thumb = f"https://i.ytimg.com/vi/{v}/hqdefault.jpg"
    url = f"https://www.youtube.com/watch?v={v}"
    dur = _fmt_dur(meta.get("duration"))
    date = _fmt_date(meta.get("date"))
    dur_badge = f'<span class="vdur">{dur}</span>' if dur else ""
    ep_chip = f'<span class="vep">第 {ep} 集</span>' if ep else '<span class="vep vep-sp">特別篇</span>'
    sub = '<span class="vsub">Through the Eyes of Grandpa Mike</span>'
    date_html = f'<span class="vdate">{date}</span>' if date else ""
    return f'''<a class="vcard mikecard" href="{url}" data-yt="{v}" title="{html.escape(raw)}">
  <span class="vthumb">{ep_chip}<img loading="lazy" src="{thumb}" alt="{loc}">{dur_badge}</span>
  <span class="vmeta"><span class="vt">{loc}</span>{sub}{date_html}</span>
</a>'''

def _mike_card_2019(item):
    """One 2019-tour card: clean Chinese location title + duration, inline-play (data-yt)."""
    v = item["id"]
    zh = html.escape(item.get("zh", "觀看影片"))
    dur = item.get("dur", "")
    kind = item.get("kind", "school")
    thumb = f"https://i.ytimg.com/vi/{v}/hqdefault.jpg"
    url = f"https://www.youtube.com/watch?v={v}"
    dur_badge = f'<span class="vdur">{dur}</span>' if dur else ""
    chip = {
        "travel": '<span class="vep vep-sp">在地走訪</span>',
        "thanks": '<span class="vep vep-sp">特別篇</span>',
    }.get(kind, '<span class="vep">2019</span>')
    sub = '<span class="vsub">2019 全縣校園巡迴</span>'
    return f'''<a class="vcard mikecard" href="{url}" data-yt="{v}" title="{zh}">
  <span class="vthumb">{chip}<img loading="lazy" src="{thumb}" alt="{zh}">{dur_badge}</span>
  <span class="vmeta"><span class="vt">{zh}</span>{sub}<span class="vdate">2019</span></span>
</a>'''

def _mike_tour_2019_block():
    """The 2019 county-wide tour section (data/grandpa-mike-2019.json), or '' if absent."""
    p = os.path.join(ROOT, "data", "grandpa-mike-2019.json")
    if not os.path.exists(p):
        return ""
    d = json.load(open(p, encoding="utf-8"))
    thanks = d.get("thanks", [])
    schools = d.get("schools", [])
    travels = d.get("travels", [])
    if not (schools or travels or thanks):
        return ""
    thanks_cards = "\n".join(_mike_card_2019(x) for x in thanks)
    school_cards = "\n".join(_mike_card_2019(x) for x in schools)
    travel_cards = "\n".join(_mike_card_2019(x) for x in travels)
    thanks_html = (f'''<p class="eyebrow rvl" style="margin-top:1.8rem">他親口的感謝 · A Thank-You</p>
    <div class="video-grid stagger">{thanks_cards}</div>''' if thanks else "")
    travel_html = (f'''<p class="eyebrow rvl" style="margin-top:2.4rem">在地走訪 · {len(travels)} 部</p>
    <div class="video-grid stagger">{travel_cards}</div>''' if travels else "")
    return f'''<div class="mike-tour-2019">
    <p class="eyebrow rvl" style="margin-top:3rem">2019 全縣校園巡迴 · The 2019 Tour</p>
    <h2 class="rvl d1">走遍彰化，一所接著一所</h2>
    <p class="lead rvl d2">2019 年，麥克爺爺走遍彰化大小校園，一所接著一所地走訪。以下是那趟巡迴的 {len(schools) + len(travels)} 支短片，以及他對人師教育協會夥伴最後一段親口的感謝。</p>
    {thanks_html}
    <p class="eyebrow rvl" style="margin-top:2.4rem">校園巡迴 · {len(schools)} 所學校</p>
    <div class="video-grid stagger">{school_cards}</div>
    {travel_html}
  </div>'''

def build_grandpa_mike():
    path = "/media/grandpa-mike/"
    ids = live_ids(BY_PATH.get("/RS-videos/eyes", {}).get("youtube", []))
    episodes, specials = [], []
    for v in ids:
        title = VIDEO_META.get(v, {}).get("title") or ""
        m = re.search(r"第\s*(\d+)\s*集", title)
        if m:
            episodes.append((int(m.group(1)), v))
        else:
            specials.append(v)
    episodes.sort(key=lambda t: t[0])
    ep_cards = "\n".join(_mike_card(v, ep) for ep, v in episodes)
    sp_cards = "\n".join(_mike_card(v) for v in specials)
    total = len(episodes) + len(specials)

    intro = '''<div class="mike-intro rvl">
      <p>麥克爺爺（Grandpa Mike）是一位來自美國的退休教育工作者，曾任學校輔導老師與校長。
      他學中文、愛台灣，疫情前多次自費飛來，走進彰化與各地的校園，用最溫暖的英語陪孩子認識自己的家鄉。</p>
      <p>《Through the Eyes of Grandpa Mike》是他一集一集走訪台灣學校與景點的紀錄——
      從東溪、彰興到澎湖、佛光山，用外國爺爺的眼睛，帶孩子重新看見台灣的人情與風土，也順道練出真實的英語語感。</p>
      <p>年紀大了，他在美國仍聽著 CD 學中文、寫國字、練書法——雖然中文常常講得我們聽不太懂，卻一筆一畫把對台灣的愛寫進書法、寫上天燈。協會把他的「放眼看台灣」影片編輯後製、附上文字稿，留作大家從頭學英語的教材。「麥克爺爺年紀一大把還努力學新的語言，我們要學他的精神——開口說英語，不要怕。」</p>
      <p class="mike-honor">謹以這個系列，懷念並感謝麥克爺爺。<span>He taught English, but more importantly, he taught love, respect, and the power of doing good.</span></p>
    </div>'''

    sp_block = (f'''<p class="eyebrow rvl" style="margin-top:2.6rem">特別篇 · {len(specials)} 部</p>
    <div class="video-grid stagger">{sp_cards}</div>''' if specials else "")

    tour_block = _mike_tour_2019_block()

    # PeoPo 媒體報導：王惠美縣長為麥克爺爺慶生（彰興國中五年情緣）。寫進原始碼，rebuild 不再被蓋掉。
    report = '''<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">媒體報導 · In the News</p>
    <h2 class="rvl d1">國際志工麥克爺爺與彰化有約</h2>
    <p class="lead rvl d2">深耕學子英語教育——記麥克爺爺與彰化的五年情緣。</p>
    <article class="news-report rvl d2">
      <div class="news-meta">
        <span class="tag">PeoPo 公民新聞</span>
        <span class="muted">2019.11.07　·　記者林明佑 報導</span>
      </div>
      <div class="prose wide">
        <p>由<strong>彰化縣英語資源中心</strong>與<strong>彰化縣人師教育協會</strong>合作推動的「國際視訊英語教學實施計畫」，邀請連續參與五年、人稱「麥克爺爺」的 Michael Dishnow 來台。11 月 7 日下午，彰化縣長王惠美與麥克爺爺一同走訪<strong>彰興國中</strong>，與學生暢談中西飲食文化，並透過線上票選找出學生最愛的彰化美食。</p>
        <p>當天適逢麥克爺爺 76 歲生日，學校特別準備了中西式蛋糕與傳統壽桃，邀請 11 月份的壽星一同慶生，現場洋溢著溫馨歡樂的氣氛。</p>
      </div>
      <blockquote class="news-quote">
        「麥克爺爺長期關心我們的孩子，每次來台灣都造訪許多學校；五年來透過彰化縣國際視訊英語教學實施計畫，不僅給孩子很多的體會，也讓孩子在英文方面有很大的進步。」
        <cite>— 彰化縣長 王惠美</cite>
      </blockquote>
      <div class="prose wide">
        <p>麥克爺爺累計走訪超過 150 所學校、服務 750 位以上的學生，透過視訊互動給予孩子溫暖與鼓勵，也為孩子打開英語溝通能力、國際視野與跨文化素養的一扇窗。</p>
      </div>
      <div class="news-photos stagger">
        <figure class="figure"><img loading="lazy" src="peopo-1.jpg" alt="麥克爺爺與彰興國中師生大合照" width="1024" height="579"><figcaption>麥克爺爺與彰興國中師生大合影</figcaption></figure>
        <figure class="figure"><img loading="lazy" src="peopo-2.jpg" alt="師生為麥克爺爺準備生日蛋糕與壽桃" width="1024" height="579"><figcaption>76 歲生日，中西式蛋糕與傳統壽桃同慶</figcaption></figure>
        <figure class="figure"><img loading="lazy" src="peopo-3.jpg" alt="彰化縣長王惠美與麥克爺爺和學生座談" width="1024" height="579"><figcaption>縣長媽媽、彰化囝仔與美國阿公 Grandpa Mike 同席</figcaption></figure>
        <figure class="figure"><img loading="lazy" src="peopo-4.jpg" alt="麥克爺爺品嚐彰化在地美食" width="1024" height="579"><figcaption>麥克爺爺品嚐學生票選的彰化在地美食</figcaption></figure>
      </div>
      <a class="report-link" href="https://www.peopo.org/news/430163" target="_blank" rel="noopener">閱讀 PeoPo 原始報導 →</a>
    </article>
  </div>
</section>'''

    body = f'''
{page_hero("人師影音專區", "麥克爺爺放眼看台灣", "用一位外國爺爺的眼睛，一集一集走訪台灣的校園與風土。")}
<section class="section">
  <div class="wrap">
    {intro}
    <div class="flex rvl" style="justify-content:space-between;align-items:center;margin:1.8rem 0 1.4rem">
      <div class="pills"><span class="pill"><b>{total}</b> 部影片</span><span class="pill">{len(episodes)} 集正篇</span></div>
    </div>
    <div class="video-grid stagger">{ep_cards}</div>
    {sp_block}
    {tour_block}
  </div>
</section>
{report}
'''
    write(path, layout(path, "麥克爺爺放眼看台灣",
        "麥克爺爺用英語帶你一集一集走訪台灣的校園與風土，認識家鄉、練出真實語感。", body, "media"))

def _mike_first_id():
    ids = live_ids(BY_PATH.get("/RS-videos/eyes", {}).get("youtube", []))
    best = None
    for v in ids:
        m = re.search(r"第\s*(\d+)\s*集", VIDEO_META.get(v, {}).get("title") or "")
        if m and (best is None or int(m.group(1)) < best[0]):
            best = (int(m.group(1)), v)
    return best[1] if best else (ids[0] if ids else "")

DOM = json.load(open(os.path.join(ROOT, "data", "dom-jones.json"), encoding="utf-8"))
DOM_SLIDES = json.load(open(os.path.join(ROOT, "data", "dom-jones-slides.json"), encoding="utf-8"))
DOM_SLIDE_GROUPS = {}  # school name (zh) -> set of group tokens, for cross-linking from the video grid
for _d in DOM_SLIDES["schools"]:
    DOM_SLIDE_GROUPS.setdefault(_d["school"], set()).add(_d["group"])

def build_exchange_hub():
    """國際交流＝學校訪問：兩個人物卡（麥克爺爺＋Dom Jones），仿英文站 school-tour 模式。"""
    mike_cnt = len(live_ids(BY_PATH.get("/RS-videos/eyes", {}).get("youtube", [])))
    dom_cnt = len(DOM["videos"])
    mike_thumb = f"https://i.ytimg.com/vi/{_mike_first_id()}/hqdefault.jpg"
    dom_thumb = f"https://i.ytimg.com/vi/{DOM['videos'][0]['id']}/hqdefault.jpg"
    body = f'''
{page_hero("學校訪問 · School Tour", "把世界帶進彰化的教室",
           "十多年來，一位又一位難得的訪客把活的英語、國際連結與善意帶進彰化的校園——先是麥克爺爺，如今是 Dom Jones。")}
<section class="section"><div class="wrap">
  <div class="tour-tl rvl">
    <span class="tnode"><small>起點</small><b>麥克爺爺</b></span>
    <span class="tarrow">→</span>
    <span class="tnode"><small>現今</small><b>Dom Jones</b></span>
  </div>
  <div class="section-head rvl" style="margin-top:2.4rem">
    <p class="eyebrow">兩個篇章，一個使命</p>
    <h2>走進這段故事</h2>
    <p class="muted">英語、國際連結與善的力量——先由麥克爺爺承載，如今交棒給 Dom Jones。</p>
  </div>
  <div class="pcards">
    <a class="pcard rvl" href="/media/grandpa-mike/">
      <span class="pc-img" style="background-image:url('{mike_thumb}')"></span>
      <span class="pc-body">
        <span class="pc-tag">起點 · 永遠懷念</span>
        <h3>麥克爺爺 Grandpa Mike</h3>
        <p>來自美國的退休校長，五度自費來台、十年的愛。他的紀念、現場照片與完整「放眼看台灣」影片系列，還有縣長為他慶生的媒體報導。</p>
        <span class="pc-go">進入 · 共 {mike_cnt} 部影片 →</span>
      </span>
    </a>
    <a class="pcard rvl d1" href="/media/dom-jones/">
      <span class="pc-img" style="background-image:url('{dom_thumb}')"></span>
      <span class="pc-body">
        <span class="pc-tag">現今</span>
        <h3>Dom Jones</h3>
        <p>聯合國永續發展目標（SDG）大使、人師倡議委員會主席，正進行全國校園巡迴演講——每一站都留下校園新聞影片。</p>
        <span class="pc-go">進入 · 共 {dom_cnt} 所學校 →</span>
      </span>
    </a>
  </div>
</div></section>
'''
    write("/media/exchange/", layout("/media/exchange/", "國際交流 · 學校訪問",
        "麥克爺爺與 Dom Jones 把活的英語、國際連結與善意帶進彰化的校園。", body, "media"))

DOM_STYLE = '''
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  .d-page{ --indigo:#0a1f5c; --indigo-2:#15307f; --indigo-soft:#eaedf6; --amber:#d4791a; --gold:#d4a017; }
  /* hero */
  .d-hero{background:linear-gradient(135deg,var(--indigo) 0%,#15307f 58%,#1c3f9c 100%);color:#fff;position:relative;overflow:hidden;padding:54px 0 56px;}
  .d-hero::before{content:"";position:absolute;top:-120px;right:-100px;width:440px;height:440px;background:radial-gradient(circle,rgba(255,210,120,.18) 0%,transparent 70%);animation:dheroOrb1 17s ease-in-out infinite;}
  .d-hero::after{content:"";position:absolute;bottom:-150px;left:-70px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.09) 0%,transparent 70%);pointer-events:none;z-index:0;animation:dheroOrb2 21s ease-in-out infinite;}
  @keyframes dheroOrb1{0%,100%{transform:translate(0,0);}50%{transform:translate(-28px,24px);}}
  @keyframes dheroOrb2{0%,100%{transform:translate(0,0);}50%{transform:translate(34px,-20px);}}
  .d-hero-grid{display:grid;grid-template-columns:1fr;gap:34px;align-items:center;position:relative;z-index:1;}
  @media(min-width:860px){.d-hero-grid{grid-template-columns:1.2fr 320px;gap:48px;}}
  .d-badge,.d-hero h1,.d-hero .zh,.d-hero .role-en,.d-hero .role-zh{opacity:0;transform:translateY(16px);animation:dheroUp .7s cubic-bezier(.2,.7,.2,1) forwards;}
  .d-badge{animation-delay:.05s;}
  .d-hero h1{animation-delay:.18s;}
  .d-hero .zh{animation-delay:.26s;}
  .d-hero .role-en{animation-delay:.36s;}
  .d-hero .role-zh{animation-delay:.44s;}
  @keyframes dheroUp{to{opacity:1;transform:none;}}
  .d-vslides{display:inline-block;margin-top:8px;font-size:13px;font-weight:700;color:var(--gold-dk);}
  .d-vslides:hover{color:var(--sunset);}
  .d-slides-cta{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:var(--cream);border-radius:16px;padding:20px 26px;margin-bottom:22px;}
  .d-slides-cta p{margin:0;color:var(--ink-soft);font-size:15px;}
  .d-slides-cta a.btn-gold{white-space:nowrap;}
  @media(prefers-reduced-motion:reduce){.d-hero::before,.d-hero::after{animation:none;}.d-badge,.d-hero h1,.d-hero .zh,.d-hero .role-en,.d-hero .role-zh{opacity:1;transform:none;animation:none;}}
  .d-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,210,120,.16);color:#ffd27a;padding:7px 15px;border-radius:999px;font-size:13.5px;font-weight:700;letter-spacing:.03em;margin-bottom:16px;}
  .d-hero h1{font-family:'Playfair Display','PingFang TC','Apple LiGothic Medium',serif;font-size:clamp(40px,6vw,60px);font-weight:700;line-height:1.02;color:#fff;margin:0;}
  .d-hero .zh{font-size:24px;font-weight:500;color:#dfe4f3;margin-top:6px;}
  .d-hero .role-en{margin-top:18px;font-size:18px;color:#cdd6ef;}
  .d-hero .role-zh{margin-top:4px;font-size:16.5px;color:#aebadf;line-height:1.7;}
  .d-portrait{position:relative;border-radius:18px;overflow:hidden;box-shadow:0 28px 70px -22px rgba(0,0,0,.55);background:var(--indigo);margin:0;}
  .d-portrait img{width:100%;display:block;object-fit:cover;object-position:top;aspect-ratio:4/5;}
  .d-portrait .ring{position:absolute;right:14px;bottom:14px;width:46px;height:46px;border-radius:50%;background:rgba(10,31,92,.85);display:flex;align-items:center;justify-content:center;font-size:22px;border:1px solid rgba(255,255,255,.25);}

  .d-wrap{max-width:1080px;margin:0 auto;padding:0 22px;}
  .d-sec{padding:58px 0;}
  .d-sec.alt{background:#fafbfd;border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
  .d-label{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--amber);margin-bottom:8px;}
  .d-h2{font-family:'Playfair Display','PingFang TC','Apple LiGothic Medium',serif;font-size:clamp(26px,3.6vw,34px);font-weight:700;color:var(--indigo);line-height:1.18;margin:0;}
  .d-h2-en{font-size:17px;color:var(--ink-soft);font-weight:500;margin-top:4px;}

  .d-bi{display:grid;grid-template-columns:1fr;gap:22px;margin-top:26px;}
  @media(min-width:820px){.d-bi{grid-template-columns:1fr 1fr;}}
  .d-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px 30px;box-shadow:var(--shadow-sm);}
  .d-card .tag{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.05em;color:var(--indigo);background:var(--indigo-soft);padding:4px 12px;border-radius:999px;margin-bottom:14px;}
  .d-card p{font-size:17px;line-height:1.85;color:#33424f;margin-bottom:12px;}
  .d-card p:last-child{margin-bottom:0;}
  .d-card strong{color:var(--indigo);font-weight:700;}
  .d-quote{margin-top:14px;padding:16px 20px;border-left:4px solid var(--amber);background:#fdf5ec;border-radius:0 10px 10px 0;font-style:italic;color:#5a4527;line-height:1.75;font-size:16px;}

  .d-sdgs{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;margin-top:24px;}
  .d-sdg{border-radius:14px;padding:18px 16px;color:#fff;text-align:center;}
  .d-sdg .n{font-family:'Playfair Display',serif;font-size:26px;font-weight:800;line-height:1;}
  .d-sdg .en{font-size:14.5px;font-weight:700;margin-top:6px;}
  .d-sdg .zh{font-size:13.5px;opacity:.92;margin-top:2px;}
  .sdg-1{background:#e5243b;} .sdg-3{background:#4c9f38;} .sdg-4{background:#c5192d;}
  .sdg-5{background:#ff3a21;} .sdg-10{background:#dd1367;} .sdg-16{background:#00689d;} .sdg-17{background:#19486a;}

  .d-roles{display:grid;grid-template-columns:1fr;gap:14px;margin-top:24px;}
  @media(min-width:620px){.d-roles{grid-template-columns:1fr 1fr;}}
  @media(min-width:960px){.d-roles{grid-template-columns:1fr 1fr 1fr;}}
  .d-role{display:flex;gap:14px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px 20px;transition:border-color .15s,box-shadow .15s;}
  .d-role:hover{border-color:var(--amber);box-shadow:var(--shadow-sm);}
  .d-role .ic{font-size:26px;flex:0 0 auto;}
  .d-role h4{font-size:16px;color:var(--ink);font-weight:700;line-height:1.3;margin:0;}
  .d-role p{font-size:14px;color:var(--ink-soft);line-height:1.55;margin-top:4px;}

  .d-awards{display:grid;grid-template-columns:1fr;gap:16px;margin-top:24px;}
  @media(min-width:680px){.d-awards{grid-template-columns:1fr 1fr 1fr;}}
  .d-award{background:#fff;border:1px solid var(--line);border-top:5px solid var(--gold);border-radius:14px;padding:24px;text-align:center;}
  .d-award .t{font-size:34px;}
  .d-award h4{font-size:17px;color:var(--indigo);margin:8px 0 6px;line-height:1.3;}
  .d-award p{font-size:14.5px;color:var(--ink-soft);line-height:1.6;}

  .d-feature{position:relative;margin:24px 0 6px;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px -18px rgba(10,31,92,.3);background:var(--indigo);}
  .d-feature img{width:100%;display:block;aspect-ratio:16/9;object-fit:cover;}
  .d-feature figcaption{position:absolute;left:0;right:0;bottom:0;padding:18px 22px;background:linear-gradient(to top,rgba(10,31,92,.92),rgba(10,31,92,.4) 60%,transparent);color:#fff;font-size:16px;}
  .d-feature figcaption strong{display:block;font-size:18px;font-weight:700;margin-bottom:3px;}
  .d-vcount{margin-top:20px;font-size:15px;color:var(--ink-soft);}
  .d-vcount b{color:var(--indigo);}

  /* 影片庫分頁（校園新聞 / 教育之聲）— sticky 切換 */
  .d-tabs{position:sticky;top:0;z-index:30;display:flex;gap:10px;flex-wrap:nowrap;overflow-x:auto;
    margin:22px 0 6px;padding:12px 0;background:var(--bg-soft,#f7f8fb);
    box-shadow:0 1px 0 var(--line);scrollbar-width:none;}
  .d-tabs::-webkit-scrollbar{display:none;}
  .d-tab{flex:0 0 auto;display:flex;align-items:center;gap:9px;cursor:pointer;background:#fff;
    border:1px solid var(--line);border-radius:999px;padding:10px 20px;font:inherit;line-height:1.25;}
  .d-tab .en{font-size:16px;font-weight:700;color:var(--ink);}
  .d-tab .zh{font-size:14px;color:var(--ink-soft);}
  .d-tab .n{font-size:13px;font-weight:700;color:var(--ink-soft);background:var(--bg-soft,#f0f2f7);
    border-radius:999px;padding:2px 9px;min-width:28px;text-align:center;}
  .d-tab:hover{border-color:var(--amber);}
  .d-tab.on{background:var(--indigo);border-color:var(--indigo);}
  .d-tab.on .en,.d-tab.on .zh{color:#fff;}
  .d-tab.on .n{background:rgba(255,255,255,.24);color:#fff;}
  .d-panel{display:none;}
  .d-panel.on{display:block;}
  .d-vmore{margin-top:26px;text-align:center;font-size:15px;}
  .d-vmore a{color:var(--gold-dk);font-weight:700;text-decoration:none;}
  @media(max-width:560px){.d-tab{padding:9px 15px;} .d-tab .zh{display:none;}}
  .d-vgrid{display:grid;grid-template-columns:1fr;gap:18px;margin-top:12px;}
  @media(min-width:560px){.d-vgrid{grid-template-columns:1fr 1fr;}}
  @media(min-width:920px){.d-vgrid{grid-template-columns:1fr 1fr 1fr;}}
  .d-vcard{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm);transition:transform .18s,box-shadow .18s;}
  .d-vcard:hover{transform:translateY(-3px);box-shadow:var(--shadow);}
  .d-vthumb{position:relative;aspect-ratio:16/9;background:#0a1f5c;cursor:pointer;overflow:hidden;}
  .d-vthumb img{width:100%;height:100%;object-fit:cover;display:block;}
  .d-vthumb .pl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:30px;color:#fff;background:rgba(10,31,92,.30);transition:background .18s;}
  .d-vthumb:hover .pl{background:rgba(10,31,92,.14);}
  .d-vmeta{padding:14px 16px 16px;}
  .d-vmeta h4{font-size:16.5px;font-weight:700;color:var(--ink);margin:0;}
  .d-vmeta .sub{font-size:13.5px;color:var(--ink-soft);margin-top:3px;}

  .d-contact{background:var(--indigo);color:#fff;border-radius:18px;padding:34px 36px;text-align:center;}
  .d-contact h3{font-family:'Playfair Display','PingFang TC','Apple LiGothic Medium',serif;font-size:25px;margin:0 0 8px;color:#fff;}
  .d-contact p{font-size:16.5px;color:#cdd6ef;line-height:1.75;max-width:620px;margin:0 auto 20px;}
  .d-contact .links{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}
  .d-contact .links a{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;font-weight:600;font-size:15px;padding:11px 20px;border-radius:999px;}
  .d-contact .links a.gold{background:var(--gold);border-color:var(--gold);color:var(--indigo);}
  .d-contact .links a:hover{background:rgba(255,255,255,.22);}
  .d-contact .links a.gold:hover{filter:brightness(.95);}
  .d-padlet{max-width:920px;margin:26px auto 0;border-radius:18px;overflow:hidden;background:#fff;border:1px solid var(--line);box-shadow:0 14px 40px -18px rgba(10,31,92,.28);}
  .d-padlet iframe{width:100%;height:680px;display:block;border:0;}
  @media(max-width:680px){.d-padlet iframe{height:560px;}}
  .d-padlet-credit{text-align:center;margin-top:12px;font-size:13px;color:var(--ink-soft);}
  .d-padlet-credit a{color:var(--amber);font-weight:600;text-decoration:none;}
</style>'''

def build_dom_jones():
    # 校園巡迴影片牆（伺服器端產生；點縮圖＝twrses 站內當頁播放，data-yt，絕不彈出 YouTube）
    cards = []
    for v in DOM["videos"]:
        vid = v["id"]; school = html.escape(v["school"])
        extra = v.get("date") or v.get("topic") or ""
        sub = "校園新聞 · School news" + (f" · {html.escape(extra)}" if extra else "")
        thumb = f"https://i.ytimg.com/vi/{vid}/mqdefault.jpg"
        groups = sorted(DOM_SLIDE_GROUPS.get(v["school"], []))
        slides_link = (f'<a class="d-vslides" href="/media/dom-jones/slides/#deck-{groups[0]}">📑 看該場簡報</a>'
                        if groups else "")
        cards.append(f'''<article class="d-vcard">
  <div class="d-vthumb" data-yt="{vid}" title="{school}"><img loading="lazy" src="{thumb}" alt="{school}"><span class="pl">▶</span></div>
  <div class="d-vmeta"><h4>{school}</h4><div class="sub">{sub}</div>{slides_link}</div>
</article>''')
    vgrid = "\n".join(cards)
    n = len(DOM["videos"])

    # 教育之聲 — Dom 在每場晨會之後訪問該校校長（一校一支，不是一整包播放清單）
    icards = []
    for v in DOM.get("interviews", []):
        vid = v["id"]; school = html.escape(v["school"])
        sub = f'教育之聲 · Ep{v["ep"]}' + (f' · {html.escape(v["date"])}' if v.get("date") else "")
        icards.append(f'''<article class="d-vcard">
  <div class="d-vthumb" data-yt="{vid}" title="{school}校長專訪"><img loading="lazy" src="https://i.ytimg.com/vi/{vid}/mqdefault.jpg" alt="{school}校長專訪"><span class="pl">▶</span></div>
  <div class="d-vmeta"><h4>{school}</h4><div class="sub">{sub}</div></div>
</article>''')
    igrid = "\n".join(icards)
    ni = len(DOM.get("interviews", []))
    ipl = DOM.get("interviews_playlist", "")

    body = f'''{DOM_STYLE}
<div class="d-page">

<header class="d-hero">
  <div class="d-wrap d-hero-grid">
    <div>
      <span class="d-badge">🌏 人師教育協會 × 全台校園巡迴</span>
      <h1>Dom Jones</h1>
      <div class="zh">多姆・瓊斯</div>
      <p class="role-en">Chairwoman of the Advocacy Board, My Culture Connect · UN SDG Ambassador</p>
      <p class="role-zh">人師教育協會 倡議委員會主席 · 聯合國永續發展目標(SDGs)推廣大使</p>
    </div>
    <figure class="d-portrait">
      <img src="{TB}/dom-jones/images/dom-jones.png" alt="Dom Jones 多姆・瓊斯">
      <div class="ring">🌐</div>
    </figure>
  </div>
</header>

<section class="d-sec">
  <div class="d-wrap">
    <p class="d-label">Mission · 使命</p>
    <h2 class="d-h2">Why is Dom in Taiwan?</h2>
    <p class="d-h2-en">為什麼 Dom 在台灣?</p>
    <div class="d-bi">
      <div class="d-card">
        <span class="tag">English</span>
        <p>Dom Jones is an internationally recognized social advocate, educator and media personality from California. She has chosen to become a <strong>full-time resident of Taiwan</strong>, committed to serving youth, schools and communities through cultural exchange and global education.</p>
        <p>Since <strong>December 2025</strong>, Dom has partnered with My Culture Connect to launch a <strong>nationwide school assembly tour</strong> across Taiwan — sharing global citizenship, empathy, English motivation and the UN Sustainable Development Goals.</p>
        <div class="d-quote">"Growing up without the love every child deserves, Dom made a vow to become the love she did not receive. Her life mission is to give kindness, unity and hope — especially to young people who need to know their voice and dreams matter."<br>— Dom Jones</div>
      </div>
      <div class="d-card">
        <span class="tag">中文</span>
        <p>Dom Jones 是美國加州國際知名的社會運動者、教育家與媒體人。目前她選擇<strong>長期定居台灣</strong>,全職投入服務台灣的青少年、學校與社區。</p>
        <p>自 <strong>2025 年 12 月</strong>起,Dom 與人師教育協會合作,展開<strong>全台灣巡迴學校集會計畫</strong>,走進各中小學,以英語分享全球公民精神、同理心教育與聯合國永續發展目標(SDGs)。</p>
        <div class="d-quote">「我立誓要成為自己未曾獲得的那份愛。我的使命,是將善意、團結與希望帶給每一位年輕人——讓他們知道,自己的聲音和夢想同樣重要。」<br>— Dom Jones</div>
      </div>
    </div>
  </div>
</section>

<section class="d-sec alt">
  <div class="d-wrap">
    <p class="d-label">Her Story · 她的故事</p>
    <h2 class="d-h2">From Compton to the World Stage</h2>
    <p class="d-h2-en">從康普頓到全世界</p>
    <div class="d-bi">
      <div class="d-card">
        <span class="tag">English</span>
        <p>Dom Jones was born in the challenging streets of Compton, California, raised by a mother of thirteen children. Growing up in poverty and homelessness, she refused to be defined by her circumstances — pursuing higher education in the humanities, communication studies and women's studies.</p>
        <p>With nearly <strong>20 years</strong> in fitness, yoga and wellness advocacy, she understands the deep link between physical and emotional health. She even learned <strong>Vietnamese and Tagalog</strong> to amplify diverse American communities.</p>
        <p>In 2022, Dom appeared on CBS's <strong>The Amazing Race (Season 34)</strong>, bringing empathy and cross-cultural understanding to a global audience. During the 2024 U.S. elections, over <strong>100,000 citizens</strong> voted to have her represent them.</p>
        <p>Today, she has chosen Taiwan as her home — turning an extraordinary life journey into a gift for every student she meets.</p>
      </div>
      <div class="d-card">
        <span class="tag">中文</span>
        <p>Dom Jones 出生於美國加州康普頓(Compton)貧困的街頭,是十三個孩子的母親撫養長大的孩子。她在貧困與無家可歸的困境中成長,卻憑藉對教育的堅定信念,修讀了人文學、傳播學與女性研究。</p>
        <p>近 <strong>20 年</strong>的健身、瑜伽與身心靈倡導經驗,讓她深刻理解健康對每個人的意義。她更學習了<strong>越南語與塔加洛語</strong>,以傳遞美國多元族群的聲音。</p>
        <p>2022 年,她登上 CBS《<strong>The Amazing Race</strong>》第 34 季,向全球觀眾展現跨文化的理解與同理心。在 2024 年美國大選期間,逾 <strong>10 萬名</strong>公民投票支持她出任民意代表。</p>
        <p>如今,她選擇在台灣紮根,將這段不凡的生命旅程,化為給每一位台灣孩子的禮物。</p>
      </div>
    </div>
  </div>
</section>

<section class="d-sec">
  <div class="d-wrap">
    <p class="d-label">United Nations SDGs · 聯合國永續發展目標</p>
    <h2 class="d-h2">The SDGs Dom brings to every classroom</h2>
    <p class="d-h2-en">Dom 帶來的 SDGs 訊息 — 全球目標,從在地行動與個人選擇開始。</p>
    <div class="d-sdgs">
      <div class="d-sdg sdg-1"><div class="n">1</div><div class="en">No Poverty</div><div class="zh">消除貧窮</div></div>
      <div class="d-sdg sdg-3"><div class="n">3</div><div class="en">Good Health</div><div class="zh">健康與福祉</div></div>
      <div class="d-sdg sdg-4"><div class="n">4</div><div class="en">Quality Education</div><div class="zh">優質教育</div></div>
      <div class="d-sdg sdg-5"><div class="n">5</div><div class="en">Gender Equality</div><div class="zh">性別平等</div></div>
      <div class="d-sdg sdg-10"><div class="n">10</div><div class="en">Reduced Inequalities</div><div class="zh">減少不平等</div></div>
      <div class="d-sdg sdg-16"><div class="n">16</div><div class="en">Peace &amp; Justice</div><div class="zh">和平正義</div></div>
      <div class="d-sdg sdg-17"><div class="n">17</div><div class="en">Partnerships</div><div class="zh">全球夥伴</div></div>
    </div>
  </div>
</section>

<section class="d-sec alt">
  <div class="d-wrap">
    <p class="d-label">Roles &amp; Achievements · 身份與成就</p>
    <h2 class="d-h2">Who is Dom Jones?</h2>
    <p class="d-h2-en">Dom 的多元身份</p>
    <div class="d-roles">
      <div class="d-role"><span class="ic">🌏</span><div><h4>Chairwoman, MCC Advocacy Board</h4><p>人師教育協會 倡議委員會主席 · 全台巡迴學校集會計畫</p></div></div>
      <div class="d-role"><span class="ic">🇺🇳</span><div><h4>UN Government Affairs Ambassador</h4><p>聯合國協會 政府事務大使 · Orange County Chapter</p></div></div>
      <div class="d-role"><span class="ic">📺</span><div><h4>Host · The Dom Jones Show</h4><p>Pho Bolsa TV(PBTV)主持人 · 跨國傳播至越南,數百萬觀眾</p></div></div>
      <div class="d-role"><span class="ic">🏆</span><div><h4>CBS The Amazing Race S34</h4><p>第 34 季參賽者 · 推廣同理心與跨文化理解</p></div></div>
      <div class="d-role"><span class="ic">💪</span><div><h4>CEO · Propel Cycle</h4><p>南加州頂級室內單車工作室 · 近 20 年健身資歷</p></div></div>
      <div class="d-role"><span class="ic">👧</span><div><h4>Co-Founder · DemocraShe</h4><p>501(c)(3) 非營利 · 賦能女孩相信自身潛能</p></div></div>
      <div class="d-role"><span class="ic">💚</span><div><h4>Co-Founder · You Matter</h4><p>青少年社交情感學習(SEL)計畫</p></div></div>
      <div class="d-role"><span class="ic">🎓</span><div><h4>Special Needs Educator</h4><p>特殊教育教師 · 社區倡議者 · 公眾人物</p></div></div>
      <div class="d-role"><span class="ic">✈️</span><div><h4>Travel Vlogger · Storyteller</h4><p>旅遊部落客 · 文化說故事者 · 用影像連結世界</p></div></div>
    </div>
  </div>
</section>

<section class="d-sec">
  <div class="d-wrap">
    <p class="d-label">Awards · 榮譽</p>
    <h2 class="d-h2">Recognition &amp; Awards</h2>
    <p class="d-h2-en">榮譽與肯定</p>
    <div class="d-awards">
      <div class="d-award"><div class="t">🌟</div><h4>2024 Young Leader of America</h4><p>美國聯合國國家執行委員會頒發<br>UN National Executive Council of the USA</p></div>
      <div class="d-award"><div class="t">🏅</div><h4>2023 Woman of the Year — Entrepreneurship</h4><p>希望之城與爾灣商會頒發<br>City of Hope &amp; Irvine Chamber of Commerce</p></div>
      <div class="d-award"><div class="t">🕊️</div><h4>Government Affairs Ambassador</h4><p>橙縣政府事務大使<br>Orange County, California</p></div>
    </div>
  </div>
</section>

<section class="d-sec alt">
  <div class="d-wrap">
    <p class="d-label">School Assembly Tour · 校園巡迴</p>
    <h2 class="d-h2">Dom's school visits, school by school</h2>
    <p class="d-h2-en">每一場巡迴都是全校英語集會,由各校學生記者拍成校園新聞;集會之後,Dom 再與該校校長對談。點縮圖原地播放。</p>

    <figure class="d-feature">
      <img src="{TB}/dom-jones/images/yushin-group.jpg" alt="Dom Jones with students of Yuxin Elementary">
      <figcaption><strong>With the students of Yuxin Elementary 育新國小</strong>One of the many campuses on Dom's Taiwan tour</figcaption>
    </figure>

    <div class="d-tabs" role="tablist" aria-label="影片分類">
      <button class="d-tab on" role="tab" aria-selected="true" data-panel="interviews">
        <span class="en">Voices in Education</span><span class="zh">教育之聲 · 校長專訪</span><span class="n">{ni}</span>
      </button>
      <button class="d-tab" role="tab" aria-selected="false" data-panel="news">
        <span class="en">Campus News</span><span class="zh">校園新聞 · 學生製作</span><span class="n">{n}</span>
      </button>
    </div>

    <div class="d-panel on" id="dpanel-interviews">
      <p class="d-vcount">每一場晨會之後,Dom 與該校校長對談,問的都是同樣兩個問題:您為什麼走上校長這條路?英語教育與國際教育,對您的孩子又意味著什麼?共 <b>{ni}</b> 位校長。</p>
      <div class="d-vgrid">
{igrid}
      </div>
      <p class="d-vmore"><a href="https://www.youtube.com/playlist?list={ipl}" target="_blank" rel="noopener">在 YouTube 看完整 {ni} 集 ↗</a></p>
    </div>

    <div class="d-panel" id="dpanel-news">
      <div class="d-slides-cta">
        <p>每場集會實際使用的雙語簡報，也整理成可滑動瀏覽的簡報庫——歡迎老師下載教學重點、未來訪校也直接沿用格式。</p>
        <a class="btn btn-gold" href="/media/dom-jones/slides/">📑 查看簡報庫 View Slide Library →</a>
      </div>
      <p class="d-vcount"><b>{n}</b> school visits filmed by students · 由學生記者拍攝的 {n} 場校園巡迴新聞</p>
      <div class="d-vgrid">
{vgrid}
      </div>
    </div>
  </div>
</section>

<script>
(function(){{
  var bar=document.querySelector('.d-tabs'); if(!bar) return;
  bar.addEventListener('click',function(e){{
    var t=e.target.closest('.d-tab'); if(!t) return;
    bar.querySelectorAll('.d-tab').forEach(function(b){{
      var on=b===t; b.classList.toggle('on',on); b.setAttribute('aria-selected',on);
    }});
    document.querySelectorAll('.d-panel').forEach(function(p){{
      p.classList.toggle('on', p.id==='dpanel-'+t.dataset.panel);
    }});
  }});
}})();
</script>

<section class="d-sec">
  <div class="d-wrap">
    <p class="d-label">Our English Journey Map · 英語旅程地圖</p>
    <h2 class="d-h2">A living wall of feedback from every school</h2>
    <p class="d-h2-en">每一所 Dom 拜訪過的學校,都在這面牆上留下他們的英語故事、照片與心得。歡迎師生持續貼上回饋與鼓勵的話。</p>
    <div class="d-padlet">
      <iframe src="https://padlet.com/embed/owp5252c3wtbylnt"
              allow="camera;clipboard-write;encrypted-media;geolocation;microphone"
              title="Teacher Dom's School Tour — Our English Journey Map"
              loading="lazy"></iframe>
    </div>
    <p class="d-padlet-credit">made with <a href="https://padlet.com/bdes11308/teacher-dom-s-school-tour-our-english-journey-map-owp5252c3wtbylnt" target="_blank" rel="noopener">Padlet ↗</a></p>
  </div>
</section>

<section class="d-sec alt">
  <div class="d-wrap">
    <div class="d-contact">
      <h3>Invite Dom to your school · 邀請 Dom 到您的學校</h3>
      <p>Schools are warmly welcome to contact My Culture Connect to schedule a school assembly visit with Dom Jones. ｜歡迎各校與人師教育協會聯繫,安排 Dom Jones 的校園集會。</p>
      <div class="links">
        <a class="gold" href="mailto:luke@mycultureconnect.org">✉️ luke@mycultureconnect.org</a>
        <a href="https://www.mycultureconnect.org" target="_blank" rel="noopener">🌐 mycultureconnect.org</a>
        <span style="background:#06C755;border-color:#06C755;color:#fff;font-weight:700;font-size:15px;padding:11px 20px;border-radius:999px;">💬 LINE: luke7429</span>
      </div>
    </div>
  </div>
</section>

</div>'''
    write("/media/dom-jones/", layout("/media/dom-jones/", "Dom Jones 多姆・瓊斯 · 聯合國 SDG 大使",
        "Dom Jones 多姆・瓊斯——國際知名社會運動者、教育家與媒體人,人師教育協會倡議委員會主席,聯合國永續發展目標推廣大使,以及她走進全台校園的雙語巡迴。", body, "media"))

# ---------------- Dom Jones · 簡報庫（reusable slide-deck viewer） ----------------
def _deck_cover(slug):
    return f"/media/dom-jones/slides/{slug}/01.jpg"

def _deck_viewer_body(slug, title, count, subtitle, back_href):
    imgs = "\n".join(
        f'<div class="deck-slide"><img src="/media/dom-jones/slides/{slug}/{i:02d}.jpg" '
        f'alt="{html.escape(title)} — 第 {i} 頁" loading="{"eager" if i == 1 else "lazy"}"></div>'
        for i in range(1, count + 1)
    )
    sub_html = f'<div class="sub">{html.escape(subtitle)}</div>' if subtitle else ""
    return f'''
<div class="deck-page">
  <div class="deck">
    <div class="deck-top">
      <a class="deck-back" href="{back_href}">← 簡報庫 Slide Library</a>
      <div class="deck-heading"><h1>{html.escape(title)}</h1>{sub_html}</div>
      <div class="deck-pos-wrap"><b class="deck-pos">1</b> / {count}</div>
    </div>
    <div class="deck-stage">
      <div class="deck-track">
{imgs}
      </div>
      <button class="deck-arrow prev" aria-label="上一頁 Previous">‹</button>
      <button class="deck-arrow next" aria-label="下一頁 Next">›</button>
    </div>
    <div class="deck-progress"><div class="bar"></div></div>
    <p class="deck-hint">👉 向右滑動看下一頁 · 方向鍵 ← → 也可切換 · Swipe or use arrow keys to navigate</p>
  </div>
</div>
<script src="/assets/js/deck.js?v={ASSET_V}"></script>'''

# 簡報庫已整批搬到 mycultureconnect.org/slides/（Dom 看不懂中文，簡報是給她用的）。
# 舊網址留手寫轉址頁並保留 #deck-xxx 錨點，先前發給學校的連結不會斷。
def series_cover_cards(subs):
    """封面式大卡：用該系列代表影片縮圖當封面（subs = [(path, title, blurb)]）。"""
    cards = []
    for path, title, blurb in subs:
        d = VIDEO_SERIES.get(path, {})
        eps = d.get("episodes", [])
        cover = eps[0]["id"] if eps else ""
        thumb = f"https://i.ytimg.com/vi/{cover}/hqdefault.jpg"
        cards.append(f'''<a class="hubseries rvl" href="{path}">
  <span class="hubseries-cover"><img loading="lazy" src="{thumb}" alt="{html.escape(title)}"></span>
  <span class="hubseries-body"><h3>{html.escape(title)}</h3><p>{html.escape(blurb)}</p><span class="hubseries-meta"><b>{len(eps)}</b> 集 · 觀看 →</span></span>
</a>''')
    return '<div class="grid cols-3 stagger hubseries-grid">' + "\n".join(cards) + '</div>'

def build_news_videos():
    # 索引（hub）：三個子系列各自獨立成頁，封面式大卡
    subs = [
        ("/media/news-videos/one-minute/", "一分鐘英語新聞", "一分鐘掌握一則英語新聞，由學生與外師合作播報。"),
        ("/media/news-videos/changhua/", "彰化英語新聞", "彰化在地的英語新聞播報，用熟悉的題材練語感。"),
        ("/media/news-videos/special-report/", "英語特別報導", "深入主題的英語特別報導，篇幅更完整。"),
    ]
    body = f'''
{page_hero("人師英語新聞", "用新聞，練出真實語感", "由學生與外師合作製作的英語新聞影片，分為三個系列——點選下方系列即可觀看。")}
<section class="section"><div class="wrap">{series_cover_cards(subs)}</div></section>
'''
    write("/media/news-videos/", layout("/media/news-videos/", "人師英語新聞", "一分鐘英語新聞、彰化英語新聞與特別報導影片。", body, "media"))

# ==================================================================
#  STAFF-TRAINING (internal, hidden) — not in NAV, not in sitemap.txt,
#  noindex. Entry is a card grid; each card is one skill's knowledge +
#  quiz. Link is only ever shared directly, never linked from the site.
# ==================================================================
STAFF_SKILLS = [
    ("/staff-training/git-github/", "🔧", "Git 與 GitHub 運作知識",
     "commit、push、branch、PR 是什麼？看得懂 AI 助手在問什麼。24 題小考。"),
    ("/staff-training/claude-agent/", "🤖", "認識 Claude 代理人",
     "Agent、agentic loop、human-in-the-loop 是什麼？為什麼它會停下來問你。20 題小考。"),
    ("/staff-training/chatgpt-agent/", "💬", "認識 ChatGPT 代理人（Codex）",
     "Codex 改名了嗎？2026/7 跟 ChatGPT 桌面版怎麼整合的？安全機制、Atlas 停用。兩回合共 32 題小考。"),
]

def build_staff_training_hub():
    body = f'''
{page_hero("內部訓練 · 非公開", "內部訓練專區",
    "給協會工作夥伴與志工使用的技能整理，非公開頁面，請勿轉發連結。")}
<section class="section"><div class="wrap">{fcard_grid(STAFF_SKILLS, cta="開始學習")}</div></section>
'''
    write("/staff-training/", layout("/staff-training/", "內部訓練專區",
        "人師教育協會內部工作夥伴訓練資源，非公開頁面。", body, "staff-training", noindex=True))

GIT_TERMS = [
    ("Git", "AI 工具底層的存檔與版本歷史系統。"),
    ("GitHub", "把 Git 的歷史紀錄放上線、隨處可存取的網站——你的網站就住在這。"),
    ("Commit", "一個檢查點——把剛改的東西存成快照，附一句說明。"),
    ("Push", "把 commit 的內容上傳到 GitHub，讓網站跟著更新。"),
    ("Clone", "把一個 GitHub repository 完整複製一份到自己這邊，連歷史都在。"),
    ("Pull", "把 GitHub 上最新的變更抓下來，更新你手上的版本。"),
    ("Branch", "一個獨立的草稿版本，可以放心實驗、不影響上線版本。"),
    ("Worktree", "讓兩個 AI agent 同時在不同資料夾，分別處理不同 branch。"),
    ("Pull Request（PR）", "請求把某個 branch 的變更合併回上線版本，中間有檢查步驟。"),
    ("Revert", "退回到之前一個能正常運作的檢查點。"),
]

# (question, [option_A, option_B, option_C, option_D], correct_letter, category)
GIT_QUIZ = [
    ("影片一開始提到，很多沒有寫程式背景、卻迷上用 AI 寫程式的人，最常卡關的地方是？",
     ["電腦效能不夠", "網路速度太慢", "聽不懂 Claude、Cursor 問的 commit、branch、PR 這些詞", "找不到好用的編輯器"], "C", "暖身"),
    ("為什麼 AI 寫程式工具的對話裡，常常會冒出 Git 的詞彙？",
     ["因為這些工具背後都是建立在 Git 這套版本控制系統之上", "因為 Git 是這些公司自己開發的", "純屬巧合，跟工具本身無關", "因為使用者設定錯誤"], "A", "暖身"),
    ("學會這些 Git 術語之後，最直接的好處是？",
     ["網站流量會變多", "網域費用會變便宜", "電腦速度會變快", "能更放心讓 AI 幫忙開發，聽得懂它在問什麼"], "D", "暖身"),
    ("下列哪一個「不是」常見的 AI 寫程式工具？",
     ["Claude Code", "Photoshop", "Cursor", "Codex"], "B", "暖身"),
    ("關於 Git，下列描述最正確的是？",
     ["一套幫你保留每個版本歷史紀錄的存檔系統", "一種社群媒體平台", "一種程式語言", "一種防毒軟體"], "A", "Git 與 GitHub 的差別"),
    ("關於 GitHub，下列描述最正確的是？",
     ["Git 的舊版本", "買網域專用的公司", "用來寫程式的編輯器", "把 Git 的歷史紀錄放上線、隨處都能存取的網站"], "D", "Git 與 GitHub 的差別"),
    ("哪一組比喻最能說明 Git 與 GitHub 的關係？",
     ["Git 是紅綠燈，GitHub 是馬路", "Git 像「保留版本歷史」的概念，GitHub 像放這些版本的 Google Drive", "Git 是老師，GitHub 是學生", "Git 是硬體，GitHub 是電源線"], "B", "Git 與 GitHub 的差別"),
    ("下列何者「也」是類似 GitHub 的服務？",
     ["Instagram", "Netflix", "GitLab", "Notion"], "C", "Git 與 GitHub 的差別"),
    ("「commit」最準確的意思是？",
     ["把整個網站砍掉重練", "申請一個新的 GitHub 帳號", "把網站關閉、下架", "把剛剛改的東西存成一個附說明的檢查點"], "D", "Commit 與 Push"),
    ("「push」的作用是？",
     ["把網站的顏色改掉", "把 commit 的內容上傳到 GitHub，讓網站跟著更新", "建立一個全新的專案", "把舊的檢查點刪除"], "B", "Commit 與 Push"),
    ("commit 完、還沒 push 之前，這個檢查點會存放在哪裡？",
     ["已經在 GitHub 上了", "存在對方的信箱裡", "只存在你自己的電腦，或 AI 的工作空間裡", "根本不會被存下來"], "C", "Commit 與 Push"),
    ("為什麼常被建議「commit 要勤快一點」？",
     ["每一個 commit 都是一個能回頭的檢查點，存越勤快越安全", "這樣網站會比較好看", "GitHub 規定每天至少要 commit 一次", "這樣可以省網路流量"], "A", "Commit 與 Push"),
    ("「clone」的意思是？",
     ["把網站關掉重開", "把一個 GitHub repository 完整複製一份到自己這邊，連歷史紀錄都在", "幫網站取一個分身網域", "把舊版本刪除"], "B", "Clone、Pull 與 Branch"),
    ("「pull」的作用是？",
     ["把你自己的變更整個刪掉", "建立一個新的 GitHub 帳號", "把 GitHub 上最新的變更抓下來，更新你手上的版本", "把網站設成私人"], "C", "Clone、Pull 與 Branch"),
    ("「branch」最好的理解方式是？",
     ["一個獨立的草稿版本，可以放心實驗、不影響上線版本", "GitHub 的付費方案名稱", "正式上線、大家都看得到的版本", "一種電腦病毒"], "A", "Clone、Pull 與 Branch"),
    ("通常正式上線、對外公開的那個版本，習慣叫做？",
     ["draft", "clone", "push", "main"], "D", "Clone、Pull 與 Branch"),
    ("「worktree」主要適合用在什麼情境？",
     ["一個人、單一任務的簡單小專案", "買網域的時候", "讓兩個 AI agent 同時在不同資料夾，分別處理不同 branch，不互相干擾", "關閉網站的時候"], "C", "Worktree 與 Pull Request"),
    ("Pull Request（PR）的意思最接近？",
     ["請求把某個 branch 的變更合併回上線版本，中間會先檢查一次", "請求刪除一個 branch", "請求重設 GitHub 密碼", "請求複製別人的 repository"], "A", "Worktree 與 Pull Request"),
    ("一個人獨立作業時，PR 通常怎麼處理比較實際？",
     ["一定要請律師先審過", "GitHub 會自動拒絕，無法自己合併", "一定要等三個工作天才能合併", "自己看過確認沒問題，就可以自行合併"], "D", "Worktree 與 Pull Request"),
    ("「worktree」和單純的「branch」，主要差在哪裡？",
     ["兩者其實完全一樣，沒有差別", "worktree 能讓你「同時」在不同資料夾操作多個 branch，而不只是切換身分", "worktree 是用來刪除 branch 的功能", "worktree 只是理論概念，實際上用不到"], "B", "Worktree 與 Pull Request"),
    ("如果 AI 把你的網站或程式改壞了，第一件該想到的事是？",
     ["commit 歷史還在，可以請 AI 退回到之前能正常運作的版本", "立刻刪除整個 GitHub 帳號重新開始", "沒救了，只能整個重寫", "馬上買一個新網域換掉舊的"], "A", "改壞怎麼救"),
    ("「revert」最貼切的意思是？",
     ["上傳一個全新的變更", "建立一個新帳號", "把網站直接關閉", "退回到之前一個能正常運作的檢查點"], "D", "改壞怎麼救"),
    ("真正有風險、可能會不見的變更，其實是指？",
     ["已經 commit 過的變更", "還沒 commit 的變更", "已經 push 過的變更", "已經合併完成的 PR"], "B", "改壞怎麼救"),
    ("在請 AI 嘗試風險較高的操作（例如大改版）之前，比較保險的做法是？",
     ["先把網路關掉，隔離電腦", "先把舊的 branch 全部刪掉", "先請 AI commit 一次，留下一個可以回頭的檢查點", "什麼都不用做，直接讓它試"], "C", "改壞怎麼救"),
]

def _gqz_render(terms, quiz):
    """terms: [(name, desc)];
    quiz: [(question, [4 options], correct_letter, category)] or
          [(question, [4 options], correct_letter, category, explanation)]."""
    L = "ABCD"
    terms_html = "".join(f'<li><strong>{html.escape(t)}</strong> — {html.escape(d)}</li>' for t, d in terms)
    cats, blocks = [], []
    for qi, item in enumerate(quiz, 1):
        q, opts, correct, cat = item[0], item[1], item[2], item[3]
        explain = item[4] if len(item) > 4 else ""
        if cat not in cats:
            cats.append(cat)
            blocks.append(f'<p class="gqz-cat">{html.escape(cat)}</p>')
        opt_html = "".join(
            f'<label class="gqz-opt"><input type="radio" name="gq{qi}" value="{L[k]}">'
            f'<span class="gqz-l">{L[k]}</span><span>{html.escape(o)}</span></label>'
            for k, o in enumerate(opts))
        explain_html = f'<div class="gqz-explain" hidden>{html.escape(explain)}</div>' if explain else ""
        blocks.append(f'''<div class="gqz-q" data-correct="{correct}">
  <p class="gqz-n">第 {qi} 題</p>
  <p class="gqz-t">{html.escape(q)}</p>
  <div class="gqz-opts">{opt_html}</div>
  {explain_html}
</div>''')
    quiz_html = "".join(blocks)
    return terms_html, quiz_html

def gqz_quiz_section(n_questions, quiz_html, suffix="", heading=None, intro=""):
    """Batch-submit quiz UI: form + actions + scoring script. `suffix` namespaces the
    element ids so more than one quiz can live on the same page (e.g. Round 1 / Round 2).
    Wrong answers reveal a `.gqz-explain` box under that question, if one was supplied."""
    fid, sid, bid, mid, rid = (f"gqzForm{suffix}", f"gqzScore{suffix}",
        f"gqzBadge{suffix}", f"gqzMsg{suffix}", f"gqzReset{suffix}")
    h2 = heading or f"{n_questions} 題，檢查自己懂了沒"
    intro_html = f'<p class="muted rvl" style="margin:-.6rem 0 1.4rem">{html.escape(intro)}</p>' if intro else ""
    return f'''<section class="section tight"><div class="wrap">
<p class="eyebrow rvl">小考 · Quick Check</p>
<h2 class="rvl" style="margin-bottom:{".4rem" if intro else "1.6rem"}">{h2}</h2>
{intro_html}
<form id="{fid}">
{quiz_html}
<div class="gqz-actions">
  <button type="submit" class="btn btn-primary">檢查我的答案</button>
  <button type="button" id="{rid}" class="btn btn-ghost">重新作答</button>
  <span id="{sid}" class="gqz-score"><span class="badge" id="{bid}"></span><span id="{mid}"></span></span>
</div>
</form>
<p style="margin-top:2rem"><a class="btn btn-ghost" href="/staff-training/">← 回內部訓練專區</a></p>
</div></section>
<script>
(function () {{
  var form = document.getElementById('{fid}');
  if (!form) return;
  var questions = [].slice.call(form.querySelectorAll('.gqz-q'));
  var scoreWrap = document.getElementById('{sid}');
  var badge = document.getElementById('{bid}');
  var msg = document.getElementById('{mid}');
  var total = questions.length;
  var MESSAGES = [
    {{ min: Math.ceil(total * 0.92), text: '滿分等級——你已經聽得懂 AI 在講什麼了！' }},
    {{ min: Math.ceil(total * 0.7),  text: '很不錯，只剩幾題再看一次上面的說明就好。' }},
    {{ min: Math.ceil(total * 0.5),  text: '一半以上答對，建議把錯的地方再讀一遍。' }},
    {{ min: 0,  text: '沒關係，這些詞第一次看本來就會亂——建議整份再讀一次。' }}
  ];
  form.addEventListener('submit', function (e) {{
    e.preventDefault();
    var score = 0, allAnswered = true;
    questions.forEach(function (q) {{
      var correct = q.getAttribute('data-correct');
      var checked = q.querySelector('input:checked');
      if (!checked) {{ allAnswered = false; return; }}
      q.classList.add('answered');
      var wasWrong = checked.value !== correct;
      [].slice.call(q.querySelectorAll('.gqz-opt')).forEach(function (opt) {{
        var input = opt.querySelector('input');
        opt.classList.remove('is-correct', 'is-wrong');
        if (input.value === correct) opt.classList.add('is-correct');
        else if (input === checked) opt.classList.add('is-wrong');
      }});
      var explain = q.querySelector('.gqz-explain');
      if (explain) explain.hidden = !wasWrong;
      if (!wasWrong) score++;
    }});
    if (!allAnswered) {{ alert('請先回答完所有題目再檢查喔。'); return; }}
    badge.textContent = score + ' / ' + total;
    var m = MESSAGES.find(function (x) {{ return score >= x.min; }});
    msg.textContent = m.text;
    scoreWrap.classList.add('show');
    scoreWrap.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
  }});
  document.getElementById('{rid}').addEventListener('click', function () {{
    form.reset();
    questions.forEach(function (q) {{
      q.classList.remove('answered');
      [].slice.call(q.querySelectorAll('.gqz-opt')).forEach(function (opt) {{
        opt.classList.remove('is-correct', 'is-wrong');
      }});
      var explain = q.querySelector('.gqz-explain');
      if (explain) explain.hidden = true;
    }});
    scoreWrap.classList.remove('show');
    window.scrollTo({{ top: 0, behavior: 'smooth' }});
  }});
}})();
</script>'''

def build_staff_git_github():
    terms_html, quiz_html = _gqz_render(GIT_TERMS, GIT_QUIZ)
    body = f'''
{page_hero("內部訓練 · Git 與 GitHub", "Git 與 GitHub 運作知識",
    "給協會工作夥伴的入門說明：當 Claude Code 或 AI 助手問你要不要 commit、開 branch 時，這裡告訴你那是什麼意思。")}
<section class="section tight" style="padding-bottom:0"><div class="wrap">
<a class="btn btn-ghost" href="/staff-training/">← 回內部訓練專區</a>
</div></section>
<section class="section"><div class="wrap prose wide rvl">
<p>每一個 AI 寫程式工具背後都建立在 Git 這套版本控制系統之上，詞彙自然會出現在對話裡。看懂下面這幾個詞，AI 在問什麼你就聽得懂。</p>
<ul>{terms_html}</ul>
</div></section>
<section class="section tight"><div class="wrap">
<p class="eyebrow rvl">原始出處</p>
<h2 class="rvl" style="margin-bottom:1.2rem">這份整理參考的教學影片</h2>
<div style="max-width:420px">
<a class="vcard rvl" href="https://www.youtube.com/watch?v=atqcAb7MFAM" data-yt="atqcAb7MFAM" title="給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能">
  <span class="vthumb"><img loading="lazy" src="https://i.ytimg.com/vi/atqcAb7MFAM/hqdefault.jpg" alt="給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能"></span>
  <span class="vmeta"><span class="vt">給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能</span><span class="vdate">Gary Chen（@garytalksstuff）</span></span>
</a>
</div>
</div></section>
{gqz_quiz_section(len(GIT_QUIZ), quiz_html)}
'''
    write("/staff-training/git-github/", layout("/staff-training/git-github/", "Git 與 GitHub 運作知識",
        "Git、GitHub、commit、push、branch、PR 術語說明，附 24 題小考。", body, "staff-training", noindex=True))

CLAUDE_TERMS = [
    ("Agent（代理人）", "不只回答問題，還能實際執行動作的 AI——讀寫檔案、跑指令、上網查資料。"),
    ("Claude Code", "在你的電腦裡運作的 AI 代理人，能幫你讀寫程式、操作 Git、完成多步驟任務。"),
    ("Tool use（工具使用）", "代理人透過「工具」去做具體的事，而不是憑空生成一段文字答案。"),
    ("Agentic loop（代理人迴圈）", "規劃 → 執行 → 觀察結果 → 修正 → 再繼續，直到任務完成。"),
    ("Human-in-the-loop（人在迴圈中）", "風險較高或不可逆的步驟，代理人會先問過你才做。"),
    ("Context window（上下文窗口）", "代理人一次能記得、參考的對話與資料量是有限的。"),
    ("Prompt（指令）", "你給代理人的任務描述，說得越清楚，結果越接近你要的。"),
    ("Subagent（子代理人）", "把大任務拆成幾個小任務，派不同代理人平行處理。"),
    ("Permission（權限確認）", "代理人執行有風險的動作前，會停下來讓你確認。"),
    ("Checkpoint（檢查點）", "靠 Git commit 留下的存檔點，讓代理人放手嘗試也還是安全——見另一張技能卡。"),
]

# (question, [option_A, option_B, option_C, option_D], correct_letter, category)
CLAUDE_QUIZ = [
    ("AI「代理人」（agent）和一般聊天機器人最大的不同是？",
     ["代理人的回答比較短", "只能用英文", "代理人不只能回答問題，還能實際去執行動作，例如讀寫檔案、執行指令", "不用網路就能運作"], "C", "什麼是 AI 代理人"),
    ("Claude Code 屬於哪一種工具？",
     ["能實際讀寫檔案、執行指令、幫你完成任務的 AI 代理人", "純粹的翻譯軟體", "只能看、不能動手做事的搜尋引擎", "一種防毒軟體"], "A", "什麼是 AI 代理人"),
    ("為什麼代理人需要「工具」（tools）才能做事？",
     ["因為工具比較好看", "因為工具是免費的", "純粹是行銷術語，沒有實際作用", "因為代理人本身只會產生文字，要透過工具才能真的去讀檔案、跑指令、上網查資料"], "D", "什麼是 AI 代理人"),
    ("下列何者「不是」Claude Code 這類代理人常見的工具？",
     ["讀取／編輯檔案", "讀心術，猜你心裡想的需求", "執行終端機指令", "瀏覽網頁蒐集資料"], "B", "什麼是 AI 代理人"),
    ("代理人完成一個任務時，最常見的運作方式是？",
     ["規劃 → 執行 → 觀察結果 → 視情況修正 → 再繼續，直到完成", "一次就把整個答案生出來，不會再檢查", "完全隨機亂猜", "每次都要重新開機才能動作"], "A", "Claude Code 怎麼運作"),
    ("「agentic loop」（代理人迴圈）中，「觀察結果」這一步在做什麼？",
     ["忽略剛剛做的事，直接繼續下一步", "把電腦關機", "換一台電腦重做", "看看剛剛執行的動作有沒有成功、結果對不對，再決定下一步"], "D", "Claude Code 怎麼運作"),
    ("如果代理人執行一個指令後發現錯誤（例如程式跑不動），它通常會？",
     ["直接放棄，什麼都不做", "根據錯誤訊息調整做法，再試一次", "假裝沒發生過", "立刻刪除整個專案"], "B", "Claude Code 怎麼運作"),
    ("為什麼代理人可以處理「多步驟」的複雜任務，而不只是回答單一問題？",
     ["因為它背的答案比較多", "因為它打字速度比較快", "因為它會把任務拆成一步一步，邊做邊檢查，直到完成", "因為它有特別的網路頻寬"], "C", "Claude Code 怎麼運作"),
    ("為什麼 Claude Code 有時候會停下來問你「要不要繼續」？",
     ["它當機了", "它想聊天", "網路太慢", "遇到比較有風險或不可逆的動作（例如 commit、刪除檔案），會先確認過你才做"], "D", "為什麼它會問你"),
    ("「human-in-the-loop」（人在迴圈中）的意思最接近？",
     ["完全不用人參與，代理人自己決定一切", "重要或有風險的步驟，會先讓人確認，而不是代理人自己默默做主", "人要一直盯著螢幕打字", "每個步驟都要重開機"], "B", "為什麼它會問你"),
    ("下列哪一種操作，代理人比較可能會先問你再做？",
     ["讀取一個檔案的內容", "顯示目前的檔案清單", "把變更 push 到 GitHub、公開上線", "檢查拼字錯誤"], "C", "為什麼它會問你"),
    ("代理人會主動請你確認風險較高的動作，這對非技術背景的使用者來說代表？",
     ["代表就算不懂技術細節，重要決定還是掌握在你手上", "代表這個工具很難用", "代表你一定要先學會寫程式", "代表這個功能是收費限定"], "A", "為什麼它會問你"),
    ("給代理人的指令（prompt）越清楚，通常代表？",
     ["代理人的回答速度會變慢", "代理人做出來的結果越接近你要的", "完全沒有影響", "代理人會拒絕執行"], "B", "指令與情境"),
    ("「context window」（上下文窗口）大致是指？",
     ["電腦螢幕的大小", "網路頻寬速度", "代理人一次能記得、參考的對話與資料量是有限的", "檔案總數量"], "C", "指令與情境"),
    ("當任務很大、很複雜時，為什麼有時候會用「多個代理人平行處理」？",
     ["把大任務拆成幾個獨立的小任務，讓不同代理人同時進行，比較有效率", "純粹好玩", "這樣比較浪費資源，沒有實際好處", "因為單一代理人不能開兩次"], "A", "指令與情境"),
    ("如果代理人一直誤解你的需求，比較有效的做法是？",
     ["直接放棄，不用了", "罵它", "換一台電腦重新開始", "把指令說得更具體、補充目標和限制條件"], "D", "指令與情境"),
    ("為什麼讓代理人自己嘗試、修正錯誤是相對安全的？",
     ["因為代理人不會犯錯", "因為代理人做的事都不會被記錄", "因為有 commit 檢查點，出錯了可以退回到前一個能用的版本", "因為網路會自動備份一切"], "C", "安全使用代理人"),
    ("在請代理人做風險較高的大改動之前，比較保險的做法是？",
     ["先請它 commit 一次，留下可以回頭的檢查點", "先把電腦關機", "先刪除舊的檔案", "什麼都不用準備"], "A", "安全使用代理人"),
    ("身為非技術背景的使用者，善用代理人的關鍵心態是？",
     ["完全不用管它在做什麼，全部交給它", "一定要先學會寫程式才能用", "代理人的建議永遠不用檢查", "給清楚的目標與限制、對風險較高的步驟保持確認，其餘交給代理人處理細節"], "D", "安全使用代理人"),
    ("「代理人」（agent）和「Git／GitHub」這兩堂課的關聯是？",
     ["完全無關，兩者是獨立主題", "代理人在幫你做事時，背後常常就是透過 Git 在存檔、上傳，這就是為什麼它會問 commit、push", "Git 是代理人的品牌名稱", "GitHub 是用來訓練代理人的網站"], "B", "安全使用代理人"),
]

CLAUDE_TERMS_R2 = [
    ("Claude 5 家族", "目前的模型陣容：Fable 5、Opus 4.8、Sonnet 5、Haiku 4.5，各自有對應的模型 ID（如 claude-sonnet-5）。"),
    ("Fast mode", "把模型換成 Opus、並用更快速的輸出方式，不是換成比較小的模型。"),
    ("Project（專案）", "把相關對話、參考檔案、自訂指令收在同一個空間，讓 Claude 每次都沿用一致的背景脈絡。"),
    ("Routines", "可以照排程（例如每天早上）自動執行的雲端代理人任務。"),
    ("Cowork", "給組織／團隊使用的協作模式，可依角色安裝外掛、串接常用工具一起完成工作。"),
    ("Artifacts", "把程式碼、網頁、圖表等內容渲染成可互動的獨立畫面，跟聊天文字分開顯示。"),
    ("MCP（Model Context Protocol）", "讓 Claude 能連接外部工具與資料來源（例如信箱、雲端硬碟、資料庫）的標準協定。"),
    ("Hooks", "在代理人執行的特定時機（例如每次工具呼叫前後）自動跑一段指令，用來客製化或把關它的行為。"),
    ("Slash commands", "用「/」開頭、快速觸發特定功能或流程的捷徑指令，例如 /help。"),
    ("Skill", "一包預先寫好的指示與流程，代理人遇到符合的任務時載入、照裡面的步驟做事。"),
    ("Subagent（子代理人）", "由主代理人派出去處理子任務的獨立代理人，做完把結果交回來，藉此平行工作、也不塞滿主對話的上下文。"),
    ("Worktree isolation", "讓平行執行的多個代理人各自在獨立的 git worktree 裡工作，避免互相覆寫同一批檔案。"),
    ("Extended thinking", "讓 Claude 在給出最終答案前，先花更多步驟做內部推理，適合複雜任務。"),
    ("Prompt caching", "把常重複的長內容（如系統指令、大段參考資料）快取起來，之後請求能更快、更省成本。"),
]

# (question, [option_A, option_B, option_C, option_D], correct_letter, category, explanation)
CLAUDE_QUIZ_R2 = [
    ("目前 Claude 5 家族包含哪些模型？",
     ["GPT-5、Claude 4、Gemini 5", "Sonnet 5、Sonnet 6、Sonnet 7", "Fable 5、Opus 4.8、Sonnet 5、Haiku 4.5", "Claude Code、Claude Desktop、Claude Web"],
     "C", "Claude 5 模型家族",
     "目前的 Claude 5 家族是 Fable 5、Opus 4.8、Sonnet 5、Haiku 4.5，各自對應不同的模型 ID（例如 claude-sonnet-5）。"),
    ("Claude Code 裡的「Fast mode」實際上是怎麼加速的？",
     ["換成 Opus，並用更快速的輸出方式，而不是降級成較小的模型", "換成 Haiku 4.5，犧牲品質換速度", "關閉所有工具，只回答文字", "切斷網路連線加快回應"],
     "A", "Claude 5 模型家族",
     "Fast mode 用的是 Opus 搭配更快速的輸出方式，並不是換成比較小、比較弱的模型。"),
    ("下列哪一個「不是」目前 Claude 5 家族的模型？",
     ["Fable 5", "Opus 4.8", "Haiku 4.5", "Nova 5"],
     "D", "Claude 5 模型家族",
     "Nova 是別家產品的名稱，不屬於 Claude 5 家族；Claude 5 家族目前是 Fable 5、Opus 4.8、Sonnet 5、Haiku 4.5。"),
    ("Sonnet 5 的模型 ID 是？",
     ["sonnet-v5-claude", "claude-sonnet-5", "claude-5-sonnet-pro", "anthropic-sonnet-5"],
     "B", "Claude 5 模型家族",
     "Anthropic 的模型 ID 慣例是「claude-名稱-版本」，例如 claude-sonnet-5、claude-opus-4-8。"),
    ("「Project」（專案）這個功能主要用途是？",
     ["把相關的對話、參考檔案、自訂指令整理在同一個空間裡，讓 Claude 有一致的背景脈絡", "專門用來寫程式的編輯器", "付費升級方案的名稱", "用來管理團隊成員權限的頁面"],
     "A", "Claude.ai 產品功能",
     "Project 把相關對話、知識檔案、自訂指令收在一起，之後在這個 Project 裡的每次對話都能沿用同樣的背景設定，不用每次重講一次。"),
    ("「Routines」最貼切的說明是？",
     ["每天固定要做的運動菜單", "Claude Code 裡的鍵盤快捷鍵", "檢查程式碼風格的工具", "可以照排程（例如每天早上）自動執行的雲端代理人任務"],
     "D", "Claude.ai 產品功能",
     "Routines 是排定時間、自動重複執行的雲端代理人任務，例如「每天早上幫我整理信箱摘要」。"),
    ("「Cowork」這個模式主要是設計給誰用、做什麼？",
     ["給單一使用者寫個人日記用", "給組織／團隊使用，可以安裝符合角色的外掛（plugin）、串接工具，一起用 Claude 完成工作", "專門拿來玩遊戲的模式", "只能用來翻譯文件"],
     "B", "Claude.ai 產品功能",
     "Cowork 是給組織與團隊使用的協作模式，可以依角色安裝合適的外掛、連接常用工具，讓團隊一起用 Claude 處理實際工作。"),
    ("Artifacts（成品／產出面板）這個功能是做什麼用的？",
     ["用來儲存密碼", "是 Claude 的錯誤紀錄檔", "讓 Claude 把程式碼、網頁、圖表等內容渲染成可互動的獨立畫面，跟對話文字分開顯示", "一種付費方案"],
     "C", "Claude.ai 產品功能",
     "Artifacts 把 Claude 產出的程式碼、網頁、圖表等內容獨立渲染成一個可互動的畫面，方便查看與使用，跟聊天訊息分開呈現。"),
    ("「MCP」（Model Context Protocol）的作用是？",
     ["一種加密演算法", "是 GitHub 的分支保護規則", "專門用來壓縮圖片的格式", "讓 Claude 能連接外部工具與資料來源（例如 Gmail、Google Drive、資料庫）的標準協定"],
     "D", "Claude Code 核心機制",
     "MCP 是一套標準協定，讓 Claude 可以連接並使用外部工具與資料來源，例如信箱、雲端硬碟、資料庫等。"),
    ("Claude Code 裡的「Hooks」是什麼？",
     ["釣魚用的道具", "在特定事件發生時（例如每次工具呼叫前後）自動執行的指令，讓你客製化代理人的行為", "一種網站導覽選單", "Claude 用來記住密碼的地方"],
     "B", "Claude Code 核心機制",
     "Hooks 讓你在代理人執行的特定時機（例如呼叫工具前後）自動跑一段自訂指令，用來客製化或把關代理人的行為。"),
    ("Claude Code 的「Slash commands」（例如 /help）是？",
     ["只能用來罵髒話的指令", "用來刪除檔案的指令", "用「/」開頭、快速觸發特定功能或流程的捷徑指令", "只有付費版才能用的隱藏功能"],
     "C", "Claude Code 核心機制",
     "Slash commands 是用「/」開頭的捷徑指令，可以快速觸發特定功能，例如 /help、/fast，或使用者自訂的工作流程。"),
    ("「Skill」在 Claude 的脈絡裡最準確的說法是？",
     ["一包預先包裝好的指示，讓 Claude 在特定任務類型上照固定流程執行", "使用者的個人能力測驗結果", "只有工程師才能用的程式語言", "Claude 訂閱方案的名稱"],
     "A", "Claude Code 核心機制",
     "Skill 是一包預先寫好的指示與流程，Claude 遇到符合的任務時會載入它、照裡面的步驟做事，而不是每次臨場現想。"),
    ("「Subagent」（子代理人）跟主要對話的代理人關係是？",
     ["完全獨立、互不相關的兩個產品", "由主代理人視需要派出的獨立任務執行者，處理完把結果交回來，藉此保護主對話的上下文空間", "Subagent 是用來取代使用者的", "只是行銷用詞，沒有實際功能"],
     "B", "進階代理人概念",
     "Subagent 是主代理人派出去處理特定子任務的獨立代理人，做完之後把結果交回來，這樣可以平行處理工作、也不會把主對話的上下文塞滿。"),
    ("Claude Code 的 Workflow 工具裡，讓多個代理人各自在獨立 git worktree 工作的選項，主要目的是？",
     ["刪除整個 git 歷史", "把程式碼上傳到公開網路", "讓平行執行的多個代理人各自在獨立的 git worktree 裡工作，避免互相覆寫同一批檔案", "停用所有工具權限"],
     "C", "進階代理人概念",
     "當多個代理人需要同時修改檔案又怕互相衝突時，worktree isolation 會讓每個代理人在自己獨立的 git worktree 裡工作，彼此不會互相干擾——跟上一堂課學的 worktree 概念是同一個東西。"),
    ("「Extended thinking」（延伸思考／推理強度）大致在做什麼？",
     ["讓 Claude 在回答前花更多內部推理步驟，通常用在比較複雜、需要深度思考的任務", "讓 Claude 打字速度變快", "只是介面上的裝飾動畫", "用來翻譯多國語言"],
     "A", "進階代理人概念",
     "Extended thinking／推理強度是讓 Claude 在給出最終答案前，先花更多步驟做內部推理，適合處理比較複雜、需要仔細思考的任務。"),
    ("「Prompt caching」（提示詞快取）的主要好處是？",
     ["讓對話紀錄自動被刪除", "防止別人偷看你的對話", "把使用者密碼加密儲存", "把重複用到的長內容（例如系統指令、大段參考資料）快取起來，之後對話能更快、更省成本地重複使用"],
     "D", "進階代理人概念",
     "Prompt caching 把常重複出現的長內容（像是系統指令或大段參考資料）快取起來，之後的請求可以重複利用，讓回應更快、成本更低。"),
]

CLAUDE_TERMS_R3 = [
    ("pipeline()", "讓每個項目各自往下一階段走，不用等其他項目做完同一階段，通常比逐階段等待更快。"),
    ("parallel() / barrier", "同時執行多個任務，並等它們「全部做完」才繼續下一步——適合先彙整、去重所有結果再做下一步。"),
    ("Phase（階段）", "把一連串代理人呼叫依進度分組顯示的標籤，方便使用者看懂目前跑到哪。"),
    ("Routines", "排定時間自動執行的雲端代理人任務，概念上類似工程師熟悉的 Cron 排程。"),
    ("背景任務（background task）", "讓耗時的動作在背景執行，使用者可以先做別的事，等它完成再回來查看結果。"),
    ("記憶系統（Memory）", "讓 Claude 記住使用者的偏好、專案脈絡、溝通上該注意的地方，下次對話自動帶入。"),
    ("Plan mode（規畫模式）", "先把要執行的步驟列出來給使用者確認過，才真的動手做，適合複雜或有風險的任務。"),
]

# (question, [option_A, option_B, option_C, option_D], correct_letter, category, explanation)
CLAUDE_QUIZ_R3 = [
    ("「pipeline()」和「parallel()」這兩種工作流程編排方式，最大的差別是？",
     ["兩者完全一樣，只是名字不同", "pipeline 只能處理一個項目，parallel 可以處理很多個",
      "pipeline 讓每個項目各自走過所有階段、不用互相等待；parallel 是同時執行多個任務，並等全部做完才繼續",
      "parallel 比較慢，pipeline 比較快，永遠是這樣"],
     "C", "工作流程編排",
     "pipeline 讓每個項目各自往下一階段走、不用等其他項目做完同一階段，通常比每個階段都設等待點更快；parallel／barrier 則是同時執行、並等全部完成才繼續下一步。"),
    ("在工作流程裡，什麼情況比較適合用「barrier」（等待所有結果到齊再繼續）？",
     ["例如要先把所有分頭找到的結果去重、彙整完，才能進行下一步耗費資源的動作", "每次都要用，沒有例外", "從來不需要用", "只有代理人數量少於 2 個時才用"],
     "A", "工作流程編排",
     "barrier（等待所有結果到齊）適合在需要先彙整、去重全部結果再進行下一步昂貴動作的情境，其餘時候用 pipeline 通常更有效率。"),
    ("「phase（階段）」在工作流程畫面上的作用是？",
     ["是用來加密資料的機制", "決定要花多少錢", "跟畫面顯示完全無關，只是內部變數名稱", "把一連串代理人呼叫依進度分組顯示，方便使用者看懂目前做到哪"],
     "D", "工作流程編排",
     "phase 只是畫面上的進度分組標籤，方便使用者看懂目前跑到哪個階段，不影響底層邏輯。"),
    ("為什麼工作流程通常「預設用 pipeline，而不是每次都用 barrier（parallel）」？",
     ["Barrier 比較便宜", "因為 barrier 會讓所有項目卡在同一個階段等待，即使有些項目其實不需要等，浪費等待時間", "Pipeline 才有畫面顯示", "兩者其實沒有效能差異"],
     "B", "工作流程編排",
     "如果每個階段都設等待點（barrier），跑得快的項目也要陪跑得慢的項目一起等，浪費了原本可以提早進行下一步的時間，所以預設用 pipeline。"),
    ("「Routines」和一般工程師講的「Cron」排程，關係最接近的說法是？",
     ["Routines 是排定時間自動執行的雲端代理人任務，概念上類似 Cron（依時間表排程執行）", "兩者完全無關",
      "Cron 只能設定一次性任務，Routines 可以永久執行不會停", "Routines 是 Cron 的競爭對手，功能完全相反"],
     "A", "排程與背景任務",
     "Routines 概念上就是「排定時間自動執行的代理人任務」，跟工程師熟悉的 Cron 排程邏輯類似，只是換成給一般使用者用的介面。"),
    ("「背景任務」（background task）的好處主要是？",
     ["讓程式自動消失，不留任何紀錄", "純粹是為了省電", "讓所有工作都變成免費", "讓耗時的動作在背景執行，你可以先處理別的事，等它完成後再回來查看結果"],
     "D", "排程與背景任務",
     "背景任務讓耗時的動作不卡住你，你可以先做別的事，等它做完再回來查看結果，是它最主要的價值。"),
    ("如果你啟動一個背景任務後又想查看它目前執行到哪，比較適合的作法是？",
     ["什麼都不用做，結果自動用簡訊通知你", "查詢該任務目前的輸出或狀態，而不是每隔幾秒鐘就重複催促", "一定要一直盯著螢幕，否則任務會消失", "只能等它完全結束後才能查看任何資訊"],
     "B", "排程與背景任務",
     "查詢任務目前的狀態或輸出，是了解進度的正確做法；不斷催促或干擾反而沒有幫助。"),
    ("排程一個 Routine 之前，比較重要的考量是？",
     ["排程時間要精準到毫秒等級才有意義", "Routine 只能設定在半夜執行", "想清楚多久跑一次、每次要做什麼，避免排太頻繁造成不必要的重複工作", "完全不需要考慮頻率，愈頻繁愈好"],
     "C", "排程與背景任務",
     "排程太頻繁會造成不必要的重複工作與資源浪費，先想清楚合理的執行頻率比較重要。"),
    ("Claude 的「記憶系統」主要用途是？",
     ["儲存使用者的密碼", "只是用來記錄對話字數", "跟使用體驗完全無關", "讓 Claude 記住使用者的偏好、專案脈絡、溝通上該注意的地方，下次對話自動帶入"],
     "D", "記憶系統",
     "記憶系統的核心價值就是讓 Claude 記住使用者的偏好、專案脈絡與溝通上該注意的地方，減少重複解釋。"),
    ("如果使用者明確糾正 Claude 的某個做法（例如「小考選項一律要有 A/B/C/D」），比較好的處理方式是？",
     ["忽略這個回饋，繼續原本的做法", "把這個回饋記下來，之後同類型任務自動套用，不用使用者每次重講", "立刻結束對話", "要求使用者用書面正式提出申請"],
     "B", "記憶系統",
     "明確的使用者回饋（尤其是糾正）應該被記下來，讓同類型任務未來自動套用，這樣使用者不用每次重講一次——這一頁的小考格式就是這樣來的。"),
    ("記憶系統裡的「參考型（reference）」記憶，通常記錄的是？",
     ["使用者的心情", "純粹的天氣資訊", "外部系統的位置或用途，例如「某類問題可以到哪個工具／文件找答案」", "跟這個系統完全無關的內容"],
     "C", "記憶系統",
     "參考型記憶記的是外部系統在哪裡、做什麼用，方便日後遇到類似問題時知道去哪裡查。"),
    ("為什麼記憶系統不會把「使用者這次要求的具體任務內容」也存成長期記憶？",
     ["因為這類細節通常只跟當下的任務有關，不是能廣泛套用在未來對話的通用資訊", "因為技術上做不到", "因為使用者付費才能用", "因為系統會自動刪除所有資料"],
     "A", "記憶系統",
     "只跟當下任務有關的細節（例如這次要改的檔案名稱）通常不會被存成長期記憶，因為它對未來的對話沒有廣泛的參考價值。"),
    ("「Plan mode（規畫模式）」的用途最接近？",
     ["讓 Claude 自動關閉，不再回應", "先把要執行的步驟列出來給使用者確認過，才真的動手做，適合複雜或有風險的任務", "只能用來查字典", "跟任務執行完全無關的裝飾功能"],
     "B", "Plan mode 與風險控管",
     "Plan mode 讓 Claude 先把步驟列出來給你確認，你同意之後才真的動手，適合複雜或有風險的任務。"),
    ("什麼樣的任務，比較適合先用 plan mode 過一遍，再讓代理人動手？",
     ["簡單到一步就能完成的小事", "完全不需要 plan mode，任何任務都應該直接動手", "涉及多個步驟、有一定風險或不容易回頭的任務", "只有免費使用者才需要用 plan mode"],
     "C", "Plan mode 與風險控管",
     "越是多步驟、有風險或不容易回頭的任務，越適合先過一次 plan mode，讓你有機會在動手前調整方向。"),
    ("Worktree（在平行代理人情境下）用完之後，比較典型的情況是？",
     ["如果沒有留下變更，通常會自動被清理掉，不需要手動整理", "永遠留在硬碟裡，佔用越來越多空間，沒有清理機制", "一定要手動刪除，否則整個電腦會當機", "worktree 建立後就無法刪除"],
     "A", "Plan mode 與風險控管",
     "worktree 如果沒有留下實際的變更，通常會在用完後自動被清理，不需要額外手動整理。"),
    ("這一回合（工作流程與工具）跟前兩回合最主要的連結是？",
     ["完全無關，是全新獨立主題", "只是換個名字重講一樣的內容", "這回合的內容跟 Git／GitHub 完全沒有任何關聯",
      "Workflow、Routines、Memory、Plan mode 這些工具，背後運作的基礎概念（agent、subagent、checkpoint、human-in-the-loop）都是前兩回合學過的東西的延伸應用"],
     "D", "Plan mode 與風險控管",
     "這一回合講的 Workflow、Routines、Memory、Plan mode，其實都是建立在前兩回合學過的 agent、subagent、checkpoint、human-in-the-loop 這些基礎概念之上的實際應用。"),
]

CLAUDE_ROUNDS = [
    {"id": "round1", "label": "第一回合", "title": "基礎", "terms": CLAUDE_TERMS, "quiz": CLAUDE_QUIZ,
     "eyebrow": "第一回合 · 基礎",
     "lead": "「代理人」（agent）跟一般聊天機器人不一樣：它不只回答問題，還會實際去讀檔案、寫程式、執行指令，一步一步把任務做完。看懂下面這幾個詞，你就懂代理人在做什麼、為什麼它會停下來問你。",
     "intro": ""},
    {"id": "round2", "label": "第二回合", "title": "產品與代理人術語", "terms": CLAUDE_TERMS_R2, "quiz": CLAUDE_QUIZ_R2,
     "eyebrow": "第二回合 · 進階",
     "lead": "第一回合是入門，這裡開始才是真正在用 Claude 的人會遇到的詞——模型家族、Project、Routines、Cowork、MCP、Hooks、Subagent 這些。答錯會直接告訴你為什麼。",
     "intro": "答錯的題目送出後會直接顯示說明，幫你搞懂差在哪。"},
    {"id": "round3", "label": "第三回合", "title": "工作流程與工具", "terms": CLAUDE_TERMS_R3, "quiz": CLAUDE_QUIZ_R3,
     "eyebrow": "第三回合 · 更進階",
     "lead": "這一回合講實際運作機制：任務怎麼平行處理、怎麼排程重複執行、Claude 怎麼記住你的偏好、遇到有風險的任務又是怎麼先讓你確認過再動手。",
     "intro": "答錯的題目送出後會直接顯示說明，幫你搞懂差在哪。"},
]

def build_rounds_page(path, page_title, hero_eyebrow, hero_lead, rounds, meta_desc):
    """Renders a staff-training page made of N rounds (prose + quiz each). Adds the
    sticky '跳到回合' jump-nav automatically once there's more than one round —
    reuses the site's existing .unit-nav component and scroll-spy JS as-is."""
    round_blocks = []
    for i, r in enumerate(rounds, 1):
        terms_html, quiz_html = _gqz_render(r["terms"], r["quiz"])
        n = len(r["quiz"])
        round_blocks.append(f'''
<section class="section" id="{r["id"]}" style="scroll-margin-top:140px"><div class="wrap prose wide rvl">
<p class="eyebrow">{r["eyebrow"]}</p>
<p>{r["lead"]}</p>
<ul>{terms_html}</ul>
{r.get("extra", "")}
</div></section>
{gqz_quiz_section(n, quiz_html, suffix=str(i), heading=f"{r['label']}：{n} 題", intro=r["intro"])}''')

    nav_html_ = ""
    if len(rounds) > 1:
        nav_chips = "".join(
            f'<a class="unit-nav-link" href="#{r["id"]}"><b>{i+1}</b><span>{html.escape(r["title"])}</span></a>'
            for i, r in enumerate(rounds))
        nav_html_ = (f'<nav class="unit-nav" aria-label="回合導覽"><div class="wrap">'
                     f'<span class="unit-nav-label">跳到回合</span>'
                     f'<div class="unit-nav-track">{nav_chips}</div></div></nav>')

    body = f'''
{page_hero(hero_eyebrow, page_title, hero_lead)}
<section class="section tight" style="padding-bottom:0"><div class="wrap">
<a class="btn btn-ghost" href="/staff-training/">← 回內部訓練專區</a>
</div></section>
{nav_html_}
{"".join(round_blocks)}
'''
    write(path, layout(path, page_title, meta_desc, body, "staff-training", noindex=True))

def build_staff_claude_agent():
    build_rounds_page(
        "/staff-training/claude-agent/", "認識 Claude 代理人",
        "內部訓練 · 認識 Claude 代理人",
        "給協會工作夥伴的入門說明：Claude Code 不只是聊天機器人，而是會實際動手做事的「代理人」——這裡說明它怎麼運作、為什麼要停下來問你。",
        CLAUDE_ROUNDS,
        "Agent、Claude 5 模型家族、Project、Routines、Cowork、MCP、Workflow 等術語說明，附三回合共 52 題小考。")

CHATGPT_TERMS = [
    ("Codex", "OpenAI 的寫程式代理人。名字沒有消失，2026 年 7 月只是產品結構做了調整。"),
    ("2026/7/9 整合", "原本獨立的 Codex App，併入新版 ChatGPT 桌面應用程式，變成裡面三個分區之一。"),
    ("ChatGPT Classic", "原本獨立的 ChatGPT 桌面版，整合後被改名成這個名字，讓位給新版整合 App。"),
    ("Chat（分區）", "新版桌面 App 的分區之一：一般的 ChatGPT 對話、問答、寫作、日常協助。"),
    ("Work（分區）", "新版桌面 App 的分區之一：面向企業、跨檔案／應用程式／連接服務的代理人工作流程。"),
    ("Codex（分區）", "新版桌面 App 的分區之一：開發者導向的任務，例如管理程式庫、審查程式碼、操作終端機。"),
    ("其他使用管道", "除了桌面 App，Codex 也能透過 CLI（命令列）、IDE 擴充套件、雲端平台、網頁版使用。"),
    ("跟 Claude Code 的關係", "概念上很接近：都是能實際讀寫程式碼、操作終端機、完成多步驟任務的 AI 代理人，只是分屬 OpenAI 與 Anthropic 兩家公司。"),
]

# (question, [option_A, option_B, option_C, option_D], correct_letter, category, explanation)
CHATGPT_QUIZ = [
    ("「聽說 ChatGPT 的寫程式代理人已經不叫 Codex 了」，這句話正確嗎？",
     ["正確，已經完全改名，Codex 這個名字已經消失", "這個工具從來沒有叫過 Codex",
      "不正確，Codex 這個名字沒有變，只是產品結構在 2026 年 7 月有調整", "正確，改名成「ChatGPT Classic」"],
     "C", "Codex 是什麼",
     "Codex 這個名字沒有消失，2026 年 7 月只是把它從獨立 App 整合進新版 ChatGPT 桌面應用程式裡，變成其中一個分區。"),
    ("Codex 最初的定位是？",
     ["OpenAI 的寫程式代理人，能讀寫程式碼、操作終端機、完成多步驟任務", "OpenAI 的圖片生成工具", "OpenAI 的翻譯工具", "OpenAI 的語音助理"],
     "A", "Codex 是什麼",
     "Codex 是 OpenAI 開發、能實際讀寫程式碼、操作終端機、完成多步驟開發任務的 AI 代理人，概念上類似 Claude Code。"),
    ("2026 年 7 月 9 日那次整合，實際上發生的事是？",
     ["Codex 被關閉停用", "ChatGPT 被 Codex 取代，改名叫 Codex", "兩個產品完全沒有任何關係上的變化",
      "Codex 從獨立 App 併入新版 ChatGPT 桌面應用程式，成為裡面的一個分區"],
     "D", "Codex 是什麼",
     "2026 年 7 月 9 日，OpenAI 把原本獨立的 Codex App 併入新版 ChatGPT 桌面應用程式，Codex 變成裡面三個分區之一，不再是單獨的 App。"),
    ("原本獨立的 ChatGPT 桌面版，在這次整合後被改名成？",
     ["ChatGPT Pro", "ChatGPT Classic", "ChatGPT Lite", "ChatGPT Legacy"],
     "B", "Codex 是什麼",
     "原本獨立的 ChatGPT 桌面版被改名成「ChatGPT Classic」，讓位給新的整合版應用程式。"),
    ("新版 ChatGPT 桌面應用程式裡，分成哪三個分區？",
     ["Chat、Work、Codex", "Home、Search、Settings", "Free、Plus、Pro", "Draft、Review、Publish"],
     "A", "2026/7 整合改了什麼",
     "新版 ChatGPT 桌面應用程式分成 Chat、Work、Codex 三個分區，各自對應不同的使用情境。"),
    ("三個分區裡，「Work」主要是設計給誰、做什麼用？",
     ["給開發者寫程式用", "給一般使用者聊天用", "只能用來畫圖", "面向企業、跨檔案／應用程式／連接服務的代理人工作流程"],
     "D", "2026/7 整合改了什麼",
     "Work 分區是面向企業使用者，處理跨檔案、跨應用程式、跨連接服務的代理人工作流程。"),
    ("三個分區裡，「Codex」主要負責哪一類任務？",
     ["一般日常聊天", "開發者導向的任務，例如管理程式庫、審查程式碼、操作終端機", "訂餐廳", "畫插畫"],
     "B", "2026/7 整合改了什麼",
     "Codex 分區專門處理開發者導向的任務，例如管理程式庫、審查程式碼、操作終端機。"),
    ("「Chat」這個分區對應到的是？",
     ["專門給企業用的付費功能", "只有開發者才能使用", "一般的 ChatGPT 對話、問答、寫作、日常協助", "專門審查程式碼用的功能"],
     "C", "2026/7 整合改了什麼",
     "Chat 分區對應的是一般的 ChatGPT 對話體驗——問答、寫作、日常協助，跟開發無關。"),
    ("除了新版 ChatGPT 桌面應用程式，Codex 還能透過哪些管道使用？",
     ["只能透過桌面版，沒有其他管道", "只能透過電話語音使用", "只有企業內部系統才能使用", "CLI（命令列）、IDE 擴充套件、雲端平台、網頁版等多種管道"],
     "D", "現在怎麼用 Codex",
     "除了桌面版，Codex 也能透過 CLI（命令列）、IDE 擴充套件、雲端平台、網頁版等多種管道使用，不是只能用桌面 App。"),
    ("使用者可以怎麼客製化新版 ChatGPT 桌面應用程式？",
     ["完全無法客製化，介面永遠固定", "可以把 Codex 設成打開 App 時預設看到的畫面，並自訂圖示", "只能修改字體大小", "只能選擇深色或淺色主題，其他都不能改"],
     "B", "現在怎麼用 Codex",
     "使用者可以把 Codex 設成打開新版桌面 App 時的預設畫面，也能自訂圖示，讓開發者一開啟就直接進到 Codex。"),
    ("這次整合的付費限制是？",
     ["只有企業付費方案才能使用新版", "免費方案完全用不到", "各訂閱方案（包含免費方案）都能使用新版 App", "只有先付費升級才能看到 Codex 分區"],
     "C", "現在怎麼用 Codex",
     "這次整合的新版桌面 App，各訂閱方案（包含免費方案）都能使用，不是企業或付費限定功能。"),
    ("業界普遍怎麼解讀 OpenAI 這次把 Codex 整合進 ChatGPT 桌面版的動作？",
     ["被普遍認為是針對 Anthropic 的 Claude Code 做出的競爭回應", "純粹是介面美化，沒有策略意義", "跟任何競爭對手都無關", "是因為使用者要求要拿掉 Codex"],
     "A", "現在怎麼用 Codex",
     "業界普遍把這次整合解讀為 OpenAI 針對 Anthropic 的 Claude Code 做出的競爭回應。"),
    ("Codex 跟 Claude Code 在概念上最接近的共同點是？",
     ["兩者都只能回答問題，不能真的動手做事", "兩者都是能實際讀寫程式碼、操作終端機、完成多步驟任務的 AI 代理人，只是分屬不同公司",
      "兩者是同一家公司做的兩個品牌", "兩者完全沒有任何相似之處"],
     "B", "跟 Claude Code 的對應",
     "Codex 和 Claude Code 概念上很接近——都是能實際讀寫程式碼、操作終端機、完成多步驟任務的 AI 代理人，只是分屬 OpenAI 與 Anthropic 兩家不同公司。"),
    ("如果同事跟你說「Codex 這個名字已經走入歷史了」，比較正確的回應是？",
     ["附和對方，說 Codex 真的消失了", "說這個問題跟自己無關",
      "說明 Codex 這個名字還在，只是現在是新版 ChatGPT 桌面 App 裡的一個分區，不再是完全獨立的 App", "說 Codex 從來沒有存在過"],
     "C", "跟 Claude Code 的對應",
     "正確的說法是：Codex 這個名字還在，只是現在是新版 ChatGPT 桌面 App 裡的一個分區，不再是完全獨立的 App——不是被取消或改名。"),
    ("為什麼在學過 Claude Code 之後，再認識一下 Codex 是有意義的？",
     ["因為同事在工作中可能會同時聽到「Claude Code」跟「Codex」這兩個名字，搞懂差在哪、又有什麼共通點，比較不會混淆",
      "因為兩者完全無關，學了也沒用", "因為公司規定一定要用 Codex", "因為 Codex 已經停止服務，只是紀念用"],
     "A", "跟 Claude Code 的對應",
     "工作中同事可能會交替提到「Claude Code」和「Codex」這兩個名字，先搞懂兩者的異同，可以避免溝通時搞混。"),
    ("關於「AI 代理人可以實際動手做事，不只是回答問題」這個概念，Codex 和 Claude Code 的關係是？",
     ["只有 Claude Code 符合這個定義，Codex 不算", "只有 Codex 符合，Claude Code 不算",
      "這個概念跟兩者都無關", "兩者都符合這個定義——都是「代理人」，只是背後的公司與細節不同"],
     "D", "跟 Claude Code 的對應",
     "「代理人」是指能實際動手做事、不只是回答問題的 AI，Codex 和 Claude Code 都符合這個定義，只是背後公司與產品細節不同。"),
]

CHATGPT_TERMS_R2 = [
    ("Sandbox mode（沙盒模式）", "決定代理人技術上能做什麼——由嚴格到寬鬆是 read-only → workspace-write（預設）→ danger-full-access。"),
    ("Approval policy（核准政策）", "決定什麼時候要先問過你才能執行，跟 sandbox mode 是互補的兩層安全設計。"),
    ("read-only", "只能檢查、閱讀檔案，不能編輯或執行指令，除非另外取得核准——適合先討論、不想動到檔案的情境。"),
    ("workspace-write", "預設模式：能讀取、在工作目錄內編輯與執行例行指令，但碰到目錄外的檔案或需要連網的動作還是會先問過你。"),
    ("danger-full-access", "把檔案系統與網路限制都拿掉，等於完全不受限制，通常只在環境已隔離的情況下才考慮開啟。"),
    ("ChatGPT Atlas", "OpenAI 2025 年 10 月推出、內建 ChatGPT 的獨立瀏覽器；已宣布 2026/8/9 停用，功能併入 ChatGPT 桌面版與一個 Chrome 擴充套件。"),
]

# (question, [option_A, option_B, option_C, option_D], correct_letter, category, explanation)
CHATGPT_QUIZ_R2 = [
    ("Codex 的三種 sandbox 模式，由嚴格到寬鬆排列，正確的是？",
     ["workspace-write → read-only → danger-full-access", "danger-full-access → workspace-write → read-only",
      "read-only → workspace-write → danger-full-access", "三種模式沒有嚴格程度之分"],
     "C", "Codex 的安全機制",
     "三種模式由嚴格到寬鬆依序是 read-only（唯讀）→ workspace-write（工作目錄內可寫，預設模式）→ danger-full-access（完全不受限）。"),
    ("read-only 模式下，Codex 可以做什麼？",
     ["可以檢查／閱讀檔案，但不能編輯檔案或執行指令，除非另外取得核准", "可以自由編輯任何檔案", "可以連上網路做任何事", "完全不能讀取任何東西"],
     "A", "Codex 的安全機制",
     "read-only 模式下，Codex 可以檢查、閱讀檔案，但不能編輯檔案或執行指令，除非另外取得核准——適合先討論、不想動到檔案的情境。"),
    ("「workspace-write」是 Codex 的預設模式，它的行為是？",
     ["完全不受任何限制", "只能讀取，不能寫入任何東西", "每一個動作都要先問過你，包含最基本的讀檔",
      "可以讀取檔案、在工作目錄內編輯與執行例行指令，但碰到工作目錄外的檔案或需要連網的指令，還是會先問過你"],
     "D", "Codex 的安全機制",
     "workspace-write 是預設模式：可以讀取檔案、在工作目錄內編輯與執行例行指令，但碰到工作目錄外的檔案或需要連網的指令，還是會先問過你。"),
    ("「danger-full-access」這個模式代表？",
     ["只是介面上的裝飾用詞，沒有實際差異", "把檔案系統與網路的限制都拿掉，等於完全不受限制", "是最安全的模式", "只能在唯讀狀態下使用"],
     "B", "Codex 的安全機制",
     "danger-full-access 把檔案系統與網路的限制都拿掉，等於完全不受限制，是三種模式裡最寬鬆、風險也最高的一種。"),
    ("ChatGPT Atlas 原本是什麼？",
     ["一套內建 ChatGPT 的獨立瀏覽器，2025 年 10 月推出", "Codex 的舊名字", "ChatGPT 桌面版裡的其中一個分區", "一種程式語言"],
     "A", "ChatGPT Atlas 走入歷史",
     "ChatGPT Atlas 是一套內建 ChatGPT 的獨立瀏覽器，2025 年 10 月推出，以 Chromium 為基礎。"),
    ("ChatGPT Atlas 現在的狀況是？",
     ["持續正常運作，沒有任何變化", "被改名叫 Codex", "從來沒有真的推出過", "已經被 OpenAI 宣布停止服務（2026 年 8 月 9 日停用），功能移到別的地方"],
     "D", "ChatGPT Atlas 走入歷史",
     "OpenAI 已經宣布 Atlas 將於 2026 年 8 月 9 日停用，功能會被整合進 ChatGPT 桌面應用程式和一個 Chrome 擴充套件。"),
    ("Atlas 停用後，原本的「網頁代理」相關功能被移到哪裡？",
     ["完全消失，不會保留", "ChatGPT 桌面應用程式，以及一個 Chrome 瀏覽器擴充套件", "只保留在企業付費方案裡", "移到一個全新、獨立的產品，跟 ChatGPT 完全無關"],
     "B", "ChatGPT Atlas 走入歷史",
     "Atlas 停用後，原本的網頁代理相關功能會移到 ChatGPT 桌面應用程式，以及一個 Chrome 瀏覽器擴充套件。"),
    ("如果有人說「Atlas 就是 ChatGPT 桌面版裡的 Work 分區」，這個說法正確嗎？",
     ["正確，兩者是同一個東西", "正確，因為 Atlas 從來沒有存在過",
      "不正確，Atlas 原本是獨立的瀏覽器產品，跟桌面版裡的 Work 分區是不同的東西，只是 Atlas 停用後部分功能會移進 ChatGPT", "不正確，因為 Work 分區才是被停用的那個"],
     "C", "ChatGPT Atlas 走入歷史",
     "Atlas 原本是獨立的瀏覽器產品，跟桌面版裡的 Work 分區是不同的東西，兩者不能畫等號，只是 Atlas 停用後部分功能會移進 ChatGPT 生態系。"),
    ("Codex 的「approval policy（核准政策）」和「sandbox mode（沙盒模式）」的差別是？",
     ["兩者完全一樣", "approval policy 只是行銷用詞，沒有實際功能", "sandbox mode 只在企業版才有",
      "sandbox mode 決定代理人技術上能做什麼（例如能不能連網、能寫到哪裡）；approval policy 決定什麼時候要先問過你"],
     "D", "Codex vs Claude Code 安全模式對照",
     "sandbox mode 決定代理人技術上能做什麼（例如能不能連網、能寫到哪裡）；approval policy 決定什麼時候要先問過你，兩者是互補的兩層設計。"),
    ("Claude Code 跟 Codex 在安全機制的設計理念上，最接近的共同點是？",
     ["兩者完全沒有安全機制的概念", "兩者都採用「預設保守、風險較高的動作才需要額外核准或明確開啟」的分層設計",
      "兩者都要求使用者每個動作都手動確認，沒有例外", "兩者的安全機制設計理念完全相反"],
     "B", "Codex vs Claude Code 安全模式對照",
     "Claude Code 和 Codex 在安全機制設計理念上都採用「預設保守、風險較高的動作才需要額外核准或明確開啟」的分層做法，概念上很接近。"),
    ("為什麼「read-only」／保守模式很適合拿來「先討論、再決定」？",
     ["因為這個模式速度比較快", "因為這個模式完全不能用", "因為在這個模式下，代理人只能看不能動手改，你可以放心討論方向，不用擔心檔案被意外改動", "因為這個模式只能給付費使用者用"],
     "C", "Codex vs Claude Code 安全模式對照",
     "read-only 模式下代理人只能看不能動手改，適合先討論方向、不用擔心檔案被意外改動的情境。"),
    ("「danger-full-access」這類完全不受限的模式，比較適合什麼情境？",
     ["通常是在你很清楚要做什麼、且環境本身已經隔離（例如一次性的沙盒環境）的情況下才會考慮開啟", "任何情況都應該優先使用，越自由越好", "給第一次使用代理人的新手用最安全", "這個模式其實根本不存在"],
     "A", "Codex vs Claude Code 安全模式對照",
     "danger-full-access 這類完全不受限的模式，通常是在你很清楚要做什麼、且環境本身已經隔離（例如一次性的沙盒環境）的情況下才會考慮開啟，不是預設建議。"),
    ("同事跟你說「ChatGPT 現在什麼都能自己做，完全不用你確認」，這個說法正確嗎？",
     ["完全正確，Codex 沒有任何安全機制", "不正確，Codex 預設模式（workspace-write）碰到工作目錄外的檔案或需要連網的動作，還是會先問過你",
      "正確，因為 danger-full-access 是唯一的模式", "這個問題跟 Codex 完全無關"],
     "B", "綜合應用",
     "Codex 的預設模式（workspace-write）碰到工作目錄外的檔案或需要連網的動作，還是會先問過你，並不是什麼都自己做主。"),
    ("學過 Codex 的 sandbox／approval 機制後，再回頭看 Claude Code「先問過你才做風險較高的動作」，你會發現？",
     ["兩者的做法完全找不到任何相似之處", "只有 Claude Code 有這種設計，Codex 完全沒有",
      "這其實是同一類設計理念在不同產品上的實作——先確認、再放手做風險較高的事", "只有 Codex 有這種設計，Claude Code 完全沒有"],
     "C", "綜合應用",
     "Codex 的 sandbox／approval 機制，跟 Claude Code「先問過你才做風險較高的動作」其實是同一類設計理念在不同產品上的實作。"),
    ("「Atlas 停用」這件事跟這堂課學的「代理人」概念有什麼關聯？",
     ["代理人相關功能（例如網頁瀏覽代理）在不同產品間整合、搬移是很常見的事，代理人生態系持續在演變", "完全無關，只是單純的產品新聞", "代表所有 AI 代理人產品都會被停用", "代表 OpenAI 已經放棄開發代理人技術"],
     "A", "綜合應用",
     "代理人相關功能在不同產品間整合、搬移（例如 Atlas 併入 ChatGPT）是很常見的事，說明這整個代理人生態系還在持續演變。"),
    ("這一回合（Codex 安全機制與產品演變）最重要的收穫是？",
     ["記住每一個功能的確切停用日期，其他都不重要", "Codex 已經被淘汰，不用再學了", "這堂課的內容以後都不會再變，可以完全不用再更新",
      "理解 AI 代理人工具背後都有分層的安全設計，且產品名稱與結構會隨時間調整——重點是抓住背後的概念，而不是死背當下的名字"],
     "D", "綜合應用",
     "這一回合最重要的收穫，是理解 AI 代理人工具背後都有分層的安全設計，且產品名稱與結構會隨時間調整——重點是抓住背後的概念，而不是死背當下的名字。"),
]

CHATGPT_ROUNDS = [
    {"id": "round1", "label": "第一回合", "title": "Codex 是什麼", "terms": CHATGPT_TERMS, "quiz": CHATGPT_QUIZ,
     "eyebrow": "第一回合 · 基礎",
     "lead": "常聽到的說法「Codex 已經改名了」不完全正確：Codex 這個名字還在，只是 2026 年 7 月 9 日起，原本獨立的 Codex App 併入新版 ChatGPT 桌面應用程式，變成 Chat、Work、Codex 三個分區之一，原本的 ChatGPT 桌面版則改名叫「ChatGPT Classic」。看懂下面這幾個詞，下次同事討論到就不會搞混。",
     "intro": "答錯的題目送出後會直接顯示說明，幫你搞懂差在哪。",
     "extra": '<p class="muted" style="font-size:.92rem">內容整理自 2026 年 7 月的公開報導，之後產品結構如有再調整，這裡會跟著更新——參考來源：'
              '<a href="https://en.wikipedia.org/wiki/Codex_(AI_agent)" target="_blank" rel="noopener">Wikipedia: Codex (AI agent)</a>、'
              '<a href="https://coursiv.io/blog/codex-merged-with-chatgpt-app" target="_blank" rel="noopener">Coursiv: Codex merged with ChatGPT app</a>。</p>'},
    {"id": "round2", "label": "第二回合", "title": "安全機制與 Atlas", "terms": CHATGPT_TERMS_R2, "quiz": CHATGPT_QUIZ_R2,
     "eyebrow": "第二回合 · 進階",
     "lead": "第一回合是「Codex 現在叫什麼」，這裡開始講「Codex 實際上怎麼運作」：它的分層安全機制跟 Claude Code 概念上很接近，還有另一個相關的大新聞——ChatGPT Atlas 瀏覽器即將停用。",
     "intro": "答錯的題目送出後會直接顯示說明，幫你搞懂差在哪。",
     "extra": '<p class="muted" style="font-size:.92rem">內容整理自 OpenAI 官方文件與 2026 年 7 月的公開報導——參考來源：'
              '<a href="https://developers.openai.com/codex/agent-approvals-security" target="_blank" rel="noopener">OpenAI: Agent approvals &amp; security</a>、'
              '<a href="https://developers.openai.com/codex/concepts/sandboxing" target="_blank" rel="noopener">OpenAI: Sandboxing</a>、'
              '<a href="https://techcrunch.com/2026/07/09/openai-is-shutting-down-atlas-but-its-ai-browser-ambitions-are-still-growing/" target="_blank" rel="noopener">TechCrunch: OpenAI is shutting down Atlas</a>。</p>'},
]

def build_staff_chatgpt_agent():
    build_rounds_page(
        "/staff-training/chatgpt-agent/", "認識 ChatGPT 代理人（Codex）",
        "內部訓練 · 認識 ChatGPT 代理人",
        "給協會工作夥伴的入門說明：OpenAI 的寫程式代理人還是叫 Codex，只是 2026 年 7 月把它整合進新版 ChatGPT 桌面應用程式了——這裡說明現在的樣子，跟 Claude Code 怎麼對應。",
        CHATGPT_ROUNDS,
        "Codex 是什麼、安全機制、ChatGPT Atlas 停用、跟 Claude Code 怎麼對應，附兩回合共 32 題小考。")

def build_staff_training():
    build_staff_training_hub()
    build_staff_git_github()
    build_staff_claude_agent()
    build_staff_chatgpt_agent()

# ==================================================================
def build_static():
    # CNAME (only for custom-domain build), favicon, .nojekyll, robots
    cname_path = os.path.join(ROOT, "CNAME")
    if BASE:
        if os.path.exists(cname_path): os.remove(cname_path)
    else:
        open(cname_path, "w").write("twrses.org\n")
    open(os.path.join(ROOT, ".nojekyll"), "w").write("")
    open(os.path.join(ROOT, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\nSitemap: {ROOT_URL}/sitemap.txt\n")

def build_sitemap(paths):
    lines = [f"{ROOT_URL}{p}" for p in paths]
    open(os.path.join(ROOT, "sitemap.txt"), "w").write("\n".join(lines) + "\n")

TB = "https://taiwan-bilingual.org"   # 圖片與夥伴詳介沿用台灣雙語資源網（同為人師建置）

PARTNERS = [
    {"accent": ("#0e6b60", "#d8ece8", "#0a4f47"),
     "img": TB + "/edward-huang/photos/edward-portrait.jpg", "alt": "Edward Huang 黃雋翔",
     "tag": "聯合國青年氣候", "name": "Edward Huang 黃雋翔",
     "role": "LCOY Taiwan 國際大使 · UNFCCC YOUNGO",
     "zh": "UCLA 碩士、UNFCCC 官方青年組織 YOUNGO 成員。Edward 為臺灣學生（小學到大學）開啟聯合國氣候峰會、SDGs 教學與跨國專題學習；其 Youth Network 取得 2026 LCOY Taiwan 主辦權。",
     "meta": ["🇺🇳 UNFCCC YOUNGO", "🌍 LCOY Taiwan", "🎓 UCLA"],
     "go": ("/partners/edward-huang/", "查看完整介紹 →", False)},
    {"accent": ("#b97e16", "#f6e6c4", "#7a5310"),
     "img": TB + "/dom-jones/images/dom-jones.png", "alt": "Dom Jones 多姆・瓊斯",
     "tag": "倡議 · 善意", "name": "Dom Jones 多姆・瓊斯",
     "role": "聯合國 SDG 大使 · 人師倡議委員會",
     "zh": "來自加州的社會運動者、教育家與媒體人，主持《The Dom Jones Show》、曾登上 CBS《The Amazing Race》。Dom 帶來以「英語教育、全球連結、善意與愛」為三大主軸的校園巡迴集會。",
     "meta": ["🌏 UN SDG", "📺 PBTV", "🏆 Amazing Race S34"],
     "go": ("/media/dom-jones/", "看 Dom 的校園巡訪 →", False)},
    {"accent": ("#d2643c", "#f7e0d4", "#9e3f22"),
     "img": TB + "/partners/leon-la-couvee/photos/leon-portrait.jpg", "alt": "Leon E. La Couvée",
     "tag": "作家 · 講者", "name": "Leon E. La Couvée",
     "role": "作家 · TEDxYouth 講者 · 雙語教師",
     "zh": "加拿大出生、選擇定居臺灣的作家、講者與教師，畢生關注人的自由與圓滿。著有《Grandfather Is Dead／落日餘暉》與《Grandfather Is Going to Die》，並有每週專欄、播客與 TEDxYouth 演講；人師將其第一本書製作成三十集雙語影片。",
     "meta": ["📚 兩本著作", "🎙️ 播客", "🎤 TEDxYouth"],
     "go": ("/resources/grandfather/", "看《落日餘暉》影片 →", False)},
]

PARTNER_ORGS = [
    {"img": "https://i.ytimg.com/vi/M8_UUKhYuJ0/hqdefault.jpg",
     "name": "Up with People 人人至上",
     "zh": "1965 年創立於美國丹佛的國際青年組織。每年兩團、來自約 20 國的青年以半年走讀世界；2010、2012 兩度造訪彰化，住進南彰化的寄宿家庭，並在明道大學與二林圖書館成功演出，收錄於 3 支影片。",
     "go": "/partners/up-with-people/"},
    {"img": TB + "/partners/una-oc/img/una-oc-sdg.jpg",
     "name": "美國聯合國協會橙縣分會 UNA-OC",
     "zh": "美國聯合國協會橙縣分會，推動 SDGs 與全球公民意識；透過擔任其政府事務大使的夥伴 Dom Jones 與本協會結緣。",
     "go": "/partners/una-oc/"},
    {"img": "https://i.ytimg.com/vi/nHXZsvoPG7c/hqdefault.jpg",
     "name": "DLSU-D 與崇實高工締結姊妹校",
     "zh": "人師在菲律賓的拉薩爾夥伴與彰化員林崇實高工締結姊妹校：簽約儀式、書法交流與在地報導，收錄於 5 支影片。",
     "go": "/partners/dlsu-d/"},
    {"img": TB + "/partners/chinese-culture-connection/img/gala.png",
     "name": "華夏文化協會（波士頓）",
     "zh": "大波士頓四十年的非營利組織、人師的姊妹組織，理念相通、董事相連，推動雙語雙文化教育與跨文化理解。",
     "go": "/partners/chinese-culture-connection/"},
    {"img": "https://i.ytimg.com/vi/Y45jz0N6Zk0/hqdefault.jpg",
     "name": "Books for Taiwan：把英文書帶回家",
     "zh": "自 2012 年起，Amy Lin 的志工收集美國圖書館的英文書，捐贈臺灣的學校、圖書館與監獄，收錄於 14 支影片。",
     "go": "/partners/books-for-taiwan/"},
    {"img": "https://i.ytimg.com/vi/Q7E2vrl2uRQ/hqdefault.jpg",
     "name": "紐約 CCC 中文學校來到彰化",
     "zh": "自 2022 年起的長期夥伴，紐約 Albany 的學生輔導臺灣孩子英文並來彰化教學交流。2024、2025 連續來訪，2026 年 8 月再度來到彰化服務五天。",
     "go": "/partners/ccc-chinese-school/"},
    {"img": TB + "/partners/nmu/img/nmu-principal-group.jpg",
     "name": "NMU 師資生來到彰化",
     "zh": "2026 年 5 月，David Boe 教授帶領 NMU 師資生來彰化進行 TESOL 實習，於溪州與陽明國中協同教學，收錄於師資生親錄的見證短片。",
     "go": "/partners/nmu/"},
    {"img": "https://i.ytimg.com/vi/qn33x2o0Vr4/hqdefault.jpg",
     "name": "UTRGV 來到臺灣",
     "zh": "本計畫最早的國際合作之一，21 位 UTRGV 師資生在彰化教學的歷程，收錄於 22 支見證短片。",
     "go": "/partners/utrgv/"},
]

def build_partners():
    pcards = []
    for p in PARTNERS:
        a, soft, deep = p["accent"]
        href, label, ext = p["go"]
        tgt = ' target="_blank" rel="noopener"' if ext else ''
        meta = "".join(f"<span>{html.escape(m)}</span>" for m in p["meta"])
        pcards.append(f'''<article class="partner rvl" style="--pc:{a};--pc-soft:{soft};--pc-deep:{deep}">
  <div class="partner-photo"><img loading="lazy" src="{p['img']}" alt="{html.escape(p['alt'])}"></div>
  <div class="partner-body">
    <span class="partner-tag">{html.escape(p['tag'])}</span>
    <h2>{html.escape(p['name'])}</h2>
    <p class="role">{html.escape(p['role'])}</p>
    <p class="zh">{html.escape(p['zh'])}</p>
    <div class="partner-meta">{meta}</div>
    <a class="partner-go" href="{href}"{tgt}>{html.escape(label)}</a>
  </div>
</article>''')
    # 懷念：麥克爺爺
    mike = f'''<article class="partner memoriam rvl">
  <div class="partner-photo"><img loading="lazy" src="{TB}/partners/grandpa-mike/photos/mike-portrait.jpg" alt="Grandpa Mike"></div>
  <div class="partner-body">
    <span class="partner-tag mem">🕯️ 懷念 In Loving Memory</span>
    <h2>Grandpa Mike 麥克爺爺</h2>
    <p class="role">Michael Dishnow · 1943 – 2025 · 臺灣孩子的美國爺爺</p>
    <p class="zh">十多年來，他一次又一次飛來台灣，陪孩子學英語、也愛著他們。他留下 32 支造訪校園的影片，與一堂比語言更大的課。</p>
    <a class="partner-go" href="/media/grandpa-mike/">走進紀念頁 →</a>
  </div>
</article>'''
    orgs = []
    for o in PARTNER_ORGS:
        orgs.append(f'''<a class="progcard rvl" href="{o['go']}" target="_blank" rel="noopener">
  <div class="progcard-thumb"><img loading="lazy" src="{o['img']}" alt="{html.escape(o['name'])}"></div>
  <div class="progcard-body">
    <h3>{html.escape(o['name'])}</h3>
    <p>{html.escape(o['zh'])}</p>
    <span class="go">了解這個夥伴 →</span>
  </div>
</a>''')
    more = '''<div class="progcard progcard-more rvl">
  <div class="progcard-body">
    <h3>更多夥伴持續加入</h3>
    <p>本協會持續邀請能為臺灣學生帶來真實國際舞台的國際教育者與倡議者加入。</p>
  </div>
</div>'''
    body = f'''
{page_hero("國際夥伴", "把世界帶進教室的人", "國際級的夥伴，為臺灣學生帶來真實的世界舞台，以及來自每天都在使用英語的人的「活的英文」。")}
<section class="section"><div class="wrap">
  {"".join(pcards)}
  {mike}
</div></section>
<section class="section band"><div class="wrap">
  <div class="section-head rvl"><p class="eyebrow">合作的學校與組織</p><h2>並肩同行的夥伴</h2></div>
  <div class="progcard-grid">
    {"".join(orgs)}
    {more}
  </div>
</div></section>
'''
    write("/partners/", layout("/partners/", "國際夥伴",
        "把世界帶進臺灣教室的國際夥伴——Edward Huang、Dom Jones、Leon La Couvée、麥克爺爺，以及並肩同行的學校與組織。", body, "about"))

PARTNER_DETAILS = {}
_pdir = os.path.join(ROOT, "data", "partners")
if os.path.isdir(_pdir):
    for _fn in sorted(os.listdir(_pdir)):
        if _fn.endswith(".json"):
            _d = json.load(open(os.path.join(_pdir, _fn), encoding="utf-8"))
            PARTNER_DETAILS[_d["slug"]] = _d

def build_partner_detail(d):
    slug = d["slug"]
    stats = "".join(f'<span class="pstat">{html.escape(s)}</span>' for s in d.get("stats", []))
    stats_html = f'<div class="pstats rvl">{stats}</div>' if stats else ""
    intro_ps = "".join(f'<p>{html.escape(p)}</p>' for p in d.get("intro", []) if p.strip())
    intro_html = f'<div class="prose wide rvl">{intro_ps}</div>' if intro_ps else ""
    website = d.get("website")
    website_html = (f'<p class="rvl" style="margin:.4rem 0 2rem">'
                    f'<a class="btn btn-primary" href="{website}" target="_blank" rel="noopener">造訪官方網站 →</a></p>') if website else ""
    # 專文：首段先露出，其餘由讀者展開（不替作者添加小標）
    # 心得引言：英文原文照錄，下附中譯（明確標示為翻譯）
    tqs = d.get("testimonials", [])
    tq_html = ""
    if tqs:
        def _tq(t):
            cls = "tq" + (" tq-parent" if t.get("parent") else "") + (" tq-lead" if t.get("lead") else "")
            return (f'<figure class="{cls}"><span class="tq-tag">{html.escape(t["tag"])}</span>'
                    f'<blockquote lang="en">{html.escape(t["en"])}</blockquote>'
                    f'<p class="tq-zh">{html.escape(t["zh"])}</p>'
                    f'<figcaption><b>{html.escape(t["name"])}</b>{html.escape(t.get("role",""))}</figcaption></figure>')
        kids = "".join(_tq(t) for t in tqs if not t.get("parent"))
        pars = "".join(_tq(t) for t in tqs if t.get("parent"))
        note = html.escape(d.get("testimonials_note", ""))
        tq_html = (f'<div class="psection rvl"><h2>他們怎麼說</h2>'
                   + (f'<p class="tq-note">{note}</p>' if note else "")
                   + f'<div class="tq-grid">{kids}</div>'
                   + (f'<div class="tq-parents">{pars}</div>' if pars else "")
                   + '</div>')
    es = d.get("essay")
    essay_html = ""
    if es:
        rest = "".join(f"<p>{html.escape(p)}</p>" for p in es.get("rest", []))
        byline = f'<p class="essay-by">{html.escape(es["byline"])}</p>' if es.get("byline") else ""
        essay_html = f'''<div class="psection rvl essay-wrap">
  <h2>{html.escape(es["title"])}</h2>
  {byline}
  <div class="prose wide essay">
    <p class="essay-lead">{html.escape(es["lead"])}</p>
    <div class="essay-rest" id="essayRest" hidden>{rest}</div>
    <button class="essay-toggle" type="button" id="essayBtn"
            aria-expanded="false" aria-controls="essayRest">閱讀全文 ↓</button>
  </div>
</div>'''
    # 重點活動橫幅：連往同系列的獨立紀實頁（例如 2026 來臺）
    ft = d.get("feature")
    feature_html = ""
    if ft:
        badge = (f'<span class="pf-badge">{html.escape(ft["badge"])}</span>'
                 if ft.get("badge") else "")
        tag = f'<p class="pf-tag">{html.escape(ft["tag"])}</p>' if ft.get("tag") else ""
        meta = f'<p class="pf-meta">{html.escape(ft["meta"])}</p>' if ft.get("meta") else ""
        feature_html = f'''<a class="pfeature rvl" href="{ft["href"]}">
  <div class="pf-img" style="background-image:url({ft["img"]})"></div>
  <div class="pf-body">
    {badge}{tag}
    <h2>{html.escape(ft["title"])}</h2>
    <p class="pf-lead">{html.escape(ft.get("lead",""))}</p>
    {meta}
    <span class="pf-go">{html.escape(ft.get("cta","看完整紀實 →"))}</span>
  </div>
</a>'''
    photos = d.get("photos", [])
    photo_html = ""
    if photos:
        def _full(p):   # 縮圖 → 原圖（thumb/NN.jpg → NN.jpg）
            return p.replace("/thumb/", "/") if "/thumb/" in p else p
        figs = "".join(
            f'<a class="figure" href="{_full(ph)}" data-lb aria-label="放大第 {i} 張">'
            f'<img loading="lazy" src="{ph}" alt="{html.escape(d["name"])}"></a>'
            for i, ph in enumerate(photos, 1))
        photo_html = (f'<div class="pgallery stagger">{figs}</div>'
                      '<div class="lb" id="lb" hidden>'
                      '<button class="lb-x" type="button" aria-label="關閉">&times;</button>'
                      '<button class="lb-p" type="button" aria-label="上一張">&lsaquo;</button>'
                      '<img class="lb-img" alt="">'
                      '<button class="lb-n" type="button" aria-label="下一張">&rsaquo;</button>'
                      '<p class="lb-c"></p></div>')
    # 活動海報（直式，並排）
    posters = d.get("posters", [])
    poster_html = ""
    if posters:
        figs = "".join(
            f'<figure class="poster"><img loading="lazy" src="{p["img"]}" alt="{html.escape(p.get("caption",""))}">'
            f'<figcaption>{html.escape(p.get("caption",""))}</figcaption></figure>'
            for p in posters)
        poster_html = f'<div class="psection rvl"><h2>活動海報</h2><div class="poster-pair stagger">{figs}</div></div>'
    # 照片輪播（沿用全站 [data-carousel] 元件）
    carousel = d.get("carousel", [])
    carousel_html = ""
    if carousel:
        slides = "".join(
            f'<figure class="car-slide"><img loading="lazy" src="{c["img"]}" alt="{html.escape(c.get("caption",""))}">'
            + (f'<figcaption>{html.escape(c["caption"])}</figcaption>' if c.get("caption") else "")
            + '</figure>'
            for c in carousel)
        dots = "".join(
            f'<button class="car-dot{" on" if i==0 else ""}" data-i="{i}" aria-label="第 {i+1} 張"></button>'
            for i in range(len(carousel)))
        carousel_html = f'''<div class="psection rvl"><h2>影像紀錄</h2>
  <div class="carousel" data-carousel>
    <div class="car-viewport"><div class="car-track">{slides}</div></div>
    <button class="car-arrow car-prev" aria-label="上一張">‹</button>
    <button class="car-arrow car-next" aria-label="下一張">›</button>
    <div class="car-dots">{dots}</div>
  </div></div>'''
    sec_html = ""
    for s in d.get("sections", []):
        ps = "".join(f'<p>{html.escape(x)}</p>' for x in s.get("paras", []) if x.strip())
        head = html.escape(s.get("heading", ""))
        lk = s.get("link") or {}
        link_html = ""
        if lk.get("href"):
            tgt = ' target="_blank" rel="noopener"' if str(lk["href"]).startswith("http") else ""
            link_html = (f'<p style="margin:.3rem 0 .2rem">'
                         f'<a class="btn btn-primary" href="{lk["href"]}"{tgt}>'
                         f'{html.escape(lk.get("label", "閱讀完整報導 →"))}</a></p>')
        if head or ps or link_html:
            sec_html += f'<div class="psection rvl"><h2>{head}</h2><div class="prose wide">{ps}{link_html}</div></div>'
    vids = d.get("videos", [])
    vid_html = ""
    if vids:
        cards = []
        for v in vids:
            vid = v["id"]
            nm = html.escape(v.get("name") or "") or "觀看影片"
            role = html.escape(v.get("role") or "")
            sub = f'<span class="vdate">{role}</span>' if role else ""
            cards.append(f'''<a class="vcard" href="https://www.youtube.com/watch?v={vid}" data-yt="{vid}" title="{nm}">
  <span class="vthumb"><img loading="lazy" src="https://i.ytimg.com/vi/{vid}/hqdefault.jpg" alt="{nm}"></span>
  <span class="vmeta"><span class="vt">{nm}</span>{sub}</span>
</a>''')
        vid_html = (f'<div class="psection rvl"><h2>相關影片 · 共 {len(vids)} 支</h2>'
                    f'<div class="video-grid stagger">{"".join(cards)}</div></div>')
    body = f'''
{page_hero(d.get("eyebrow", "國際夥伴"), d["name"], d.get("subtitle", ""))}
<section class="section"><div class="wrap">
  {stats_html}
  {intro_html}
  {website_html}
  {feature_html}
  {poster_html}
  {vid_html if essay_html else ""}
  {photo_html}
  {tq_html}
  {essay_html}
  {sec_html}
  {carousel_html}
  {"" if essay_html else vid_html}
  <p style="margin-top:2.6rem"><a class="btn btn-ghost" href="/partners/">← 回國際夥伴</a></p>
</div></section>
'''
    meta = (d.get("subtitle") or (d.get("intro") or [""])[0])[:120]
    write(f"/partners/{slug}/", layout(f"/partners/{slug}/", d["name"], meta, body, "about"))

def main():
    paths = []
    build_static()
    build_home(); paths.append("/")
    build_about(); paths.append("/about/")
    build_founder(); paths.append("/about/founder/")
    build_partners(); paths.append("/partners/")
    for _slug, _spec in PARTNER_DETAILS.items():
        build_partner_detail(_spec); paths.append(f"/partners/{_slug}/")
    # Edward Huang 為手寫的旗艦合作頁（自包 index + 4 子頁，非 json 產生），手動列入 sitemap
    paths += ["/partners/edward-huang/", "/partners/edward-huang/lcoy-taiwan/",
              "/partners/edward-huang/program/", "/partners/edward-huang/esg/",
              "/partners/edward-huang/youth-network/"]
    build_rural_index(); build_academy(); build_register(); build_practicum(); build_guidelines()
    paths += ["/rural-schools/","/rural-schools/academy/","/rural-schools/register/","/rural-schools/practicum/","/rural-schools/guidelines/"]
    build_resources_hub(); paths.append("/resources/")
    build_reading_hub(); paths.append("/resources/reading/")
    build_basics_hub(); paths.append("/resources/basics/")
    build_speaking_hub(); paths.append("/resources/speaking/")
    build_life_hub(); paths.append("/resources/life/")
    redirect("/resources/booklets/", "/resources/reading/"); paths.append("/resources/booklets/")
    _interactive = {"/resources/booklets/everyday/", "/resources/booklets/basic/", "/resources/booklets/intermediate/", "/resources/booklets/advanced/", "/resources/booklets/conversation/", "/resources/booklets/description/"}
    for path, title, lead, cp in BOOKLET_LEAVES:
        if path in _interactive: continue  # built as interactive hubs below
        leaf_prose(path, "resources", "人師閱讀教材", title, lead, _clean_paras(cp) or ["內容整理中。"]); paths.append(path)
    build_everyday_hub(); paths.append("/resources/booklets/everyday/")
    for b in sorted(int(k) for k in EVERYDAY):
        build_everyday_book(b); paths.append(f"/resources/booklets/everyday/book{b}/")
    if BASIC:
        build_basic_hub(); paths.append("/resources/booklets/basic/")
        for b in sorted(int(k) for k in BASIC):
            build_basic_book(b); paths.append(f"/resources/booklets/basic/book{b}/")
    if INTERMEDIATE:
        build_inter_hub(); paths.append("/resources/booklets/intermediate/")
        for b in sorted(int(k) for k in INTERMEDIATE):
            build_inter_book(b); paths.append(f"/resources/booklets/intermediate/book{b}/")
    if ADVANCED:
        build_adv_hub(); paths.append("/resources/booklets/advanced/")
        for b in sorted(int(k) for k in ADVANCED):
            build_adv_book(b); paths.append(f"/resources/booklets/advanced/book{b}/")
    if CONVERSATION:
        build_conv_hub(); paths.append("/resources/booklets/conversation/")
        for b in sorted(int(k) for k in CONVERSATION):
            build_conv_book(b); paths.append(f"/resources/booklets/conversation/book{b}/")
    if DESCRIPTION:
        build_desc_hub(); paths.append("/resources/booklets/description/")
        for b in sorted(int(k) for k in DESCRIPTION):
            build_desc_book(b); paths.append(f"/resources/booklets/description/book{b}/")
    redirect("/resources/videos/", "/resources/"); paths.append("/resources/videos/")
    for path, title, lead, cp in VIDEO_LEAVES:
        if path in VIDEO_SERIES:
            build_series(VIDEO_SERIES[path]); paths.append(path); continue
        leaf_videos(path, "resources", "英語學習影片", title, lead, cp); paths.append(path)
    redirect("/resources/classes/", "/resources/"); paths.append("/resources/classes/")
    for path, title, lead, cp in CLASS_LEAVES:
        if path == "/resources/classes/grammar/" and GRAMMAR:
            build_grammar(); paths.append(path); continue
        if path == "/resources/classes/animal-farm/" and ANIMAL_FARM:
            build_animalfarm(); paths.append(path); continue
        ids = BY_PATH.get(cp, {}).get("youtube", [])
        if ids:
            leaf_videos(path, "resources", "人師英語課程", title, lead, cp)
        else:
            leaf_prose(path, "resources", "人師英語課程", title, lead, _clean_paras(cp) or ["內容整理中。"])
        paths.append(path)
    if POEMS:
        paths.append(build_poetry_hub())
        for _pm in POEMS["poems"]: paths.append(build_poem(_pm))
    if TANGSHI:
        paths.append(build_tang_hub())
        for _pm in TANGSHI["poems"]: paths.append(build_tang_poem(_pm))
    if LUNYU:
        paths.append(build_lunyu_hub())
        for _ch in LUNYU["chapters"]: paths.append(build_lunyu_chapter(_ch))
    if GUWEN:
        paths.append(build_guwen_hub())
        for _es in GUWEN["essays"]: paths.append(build_guwen_essay(_es))
    if ZHONGYI:
        paths.append(build_zhongyi_hub())
        for _idx, _u in enumerate(ZHONGYI["units"]):
            _label = ZHONGYI_UNIT_LABELS[_idx] if _idx < len(ZHONGYI_UNIT_LABELS) else str(_idx + 1)
            for _l in _u["lessons"]:
                paths.append(build_zhongyi_lesson(_u, _l, _label))
    if ASTRO:
        paths.append(build_astro_hub())
        for _l in ASTRO["lessons"]: paths.append(build_astro_lesson(_l))
    if BODY:
        paths.append(build_body_hub())
        for _l in BODY["lessons"]: paths.append(build_body_lesson(_l))
    if HTW:
        paths.append(build_htw_hub())
        for _ui, _u in enumerate(HTW["units"]):
            for _l in _u["lessons"]: paths.append(build_htw_lesson(_ui, _u, _l))
    if CHIP:
        paths.append(build_chip_hub())
        for _ui, _u in enumerate(CHIP["units"]):
            for _l in _u["lessons"]: paths.append(build_chip_lesson(_ui, _u, _l))
    build_grandfather(); paths.append("/resources/grandfather/")
    build_periodicals(); paths.append("/resources/periodicals/")
    build_media_hub(); paths.append("/media/")
    build_enactus_hub(); paths.append("/media/enactus/")
    build_grandpa_mike(); paths.append("/media/grandpa-mike/")
    build_exchange_hub(); paths.append("/media/exchange/")
    build_dom_jones(); paths.append("/media/dom-jones/")
    # 簡報庫已搬到 mycultureconnect.org/slides/（Dom 看不懂中文）。
    # 這裡的舊網址改為手寫的轉址頁，不再由 build.py 產生，以免蓋掉轉址。
    paths.append(f"/media/dom-jones/slides/{DOM_SLIDES['life_story']['slug']}/")
    for _d in DOM_SLIDES["schools"]: paths.append(f"/media/dom-jones/slides/{_d['slug']}/")
    for _d in DOM_SLIDES["templates"]: paths.append(f"/media/dom-jones/slides/{_d['slug']}/")
    for path, key, title, lead, cp in MEDIA_LEAVES:
        if path == "/media/exchange/": continue  # 改為學校訪問雙人物 hub，見 build_exchange_hub
        if path in VIDEO_SERIES:
            build_series(VIDEO_SERIES[path]); paths.append(path); continue
        leaf_videos(path, key, "人師影音專區", title, lead, cp); paths.append(path)
    build_news_videos(); paths.append("/media/news-videos/")
    # 任何已註冊但尚未由各 leaves 迴圈建出的影片系列頁（如 Enactus 子頁）
    for _sp, _sd in VIDEO_SERIES.items():
        if _sp not in paths:
            build_series(_sd); paths.append(_sp)
    # 內部訓練專區：刻意不 append 進 paths，不進 sitemap.txt、不進選單。
    build_staff_training()
    build_sitemap(paths)
    print(f"✅ 建置完成，共 {len(paths)} 頁")
    for p in paths: print("  ", p)

if __name__ == "__main__":
    main()
