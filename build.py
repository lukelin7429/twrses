#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
人師教育協會 twrses.org — static site builder
Renders shared layout/nav/footer + identity pages (hand-authored) +
content/video pages (auto-generated from data/crawl.json snapshot of the old Google Sites).
Output: HTML written into the repo root (folder-per-page → clean URLs).
"""
import json, os, html, re, shutil

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
#   ""         → custom domain (www.twrses.org), absolute paths from root
#   "/twrses"  → GitHub project page lukelin7429.github.io/twrses/
# Switch to "" and rebuild when DNS points twrses.org at GitHub Pages.
# ----------------------------------------------------------------------
BASE = "/twrses"
ROOT_URL = f"https://lukelin7429.github.io{BASE}" if BASE else "https://www.twrses.org"

import hashlib
def _asset_ver():
    h = hashlib.md5()
    for rel in ("assets/css/style.css", "assets/css/motion.css", "assets/js/main.js"):
        p = os.path.join(ROOT, rel)
        if os.path.exists(p): h.update(open(p, "rb").read())
    return h.hexdigest()[:8]
ASSET_V = _asset_ver()

SITE = {
    "name": "彰化縣人師教育協會",
    "name_en": "My Culture Connect",
    "domain": "www.twrses.org",
    "founded": "民國 98 年（2009）",
    "slogan_en": "Learn from yesterday, live for today, and hope for tomorrow.",
    "email": "luke@mycultureconnect.org",
    "email2": "luke@mycultureconnect.org",
    "line": "luke7429",
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

def layout(path, title, desc, body, active):
    full_title = f"{title}｜{SITE['name']}" if title else SITE["name"]
    return f'''<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{full_title}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css?v={ASSET_V}">
<link rel="stylesheet" href="/assets/css/motion.css?v={ASSET_V}">
<link rel="icon" href="/assets/img/logo-badge.svg" type="image/svg+xml">
<meta property="og:title" content="{html.escape(full_title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:type" content="website">
</head>
<body>
{header(active)}
<main>
{body}
</main>
{footer()}
<script src="/assets/js/main.js?v={ASSET_V}"></script>
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
def page_hero(eyebrow, title, lead, brand=False):
    cls = "hero band-brand" if brand else "hero"
    orbs = '<div class="hero-bg"><span class="orb a"></span><span class="orb b"></span><span class="orb c"></span></div>'
    lead_html = f'<p class="lead rvl d2">{lead}</p>' if lead else ""
    eb = f'<p class="eyebrow rvl">{eyebrow}</p>' if eyebrow else ""
    return f'''<section class="{cls}">
  {orbs}
  <div class="wrap">
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
    <div class="grid cols-3 stagger">
      <a class="card card-link" href="/rural-schools/"><span class="ico">🌱</span><h3>偏鄉英語教育</h3><p>邀請各國英語老師透過線上教學，為偏鄉學生免費授課。</p></a>
      <a class="card card-link" href="/resources/"><span class="ico">📚</span><h3>免費學習資源</h3><p>閱讀與經典、打好基礎、聽說與會話、生活英語——免費開放自學。</p></a>
      <a class="card card-link" href="/media/"><span class="ico">🎬</span><h3>人師影音專區</h3><p>國際交流、英語新聞、教育廣場與人物專訪，從生活看見英語。</p></a>
    </div>
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
      <img src="/assets/img/chairmen.jpg" alt="人師教育協會歷屆理事長：林吉祥、游人印、蔡國裕">
      <figcaption>歷屆理事長：林吉祥（第 1–2 屆）、游人印（第 3、6 屆）、蔡國裕（第 4–5 屆）</figcaption>
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
        return f'''<a class="vcard" href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener">
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

MCC_FORMS = "https://lukelin7429.github.io/mcc-forms"
def build_register():
    classes = [
        ("Teacher Shannon · A 班", "週日 09:00–09:50", "國一至高三 · Grade 7–12", "shannon-a/"),
        ("Teacher Shannon · B 班", "週日 10:15–11:05", "國小五年級至國三 · Grade 5–9", "shannon-b/"),
        ("Teacher Bridget 小班", "週三 20:00–20:45", "國小一至四年級 · Grade 1–4", "bridget/"),
        ("Teacher Dom 小班", "週六 10:00–11:00", "國小六年級至高三 · Grade 6–12", "dom/"),
    ]
    tutoring = [
        ("一對一英語上課 1-on-1", "彈性時間", "學生與成人自學者皆可報名", "tutoring/"),
        ("紐約中文學校 學生報名", "免費家教媒合", "一至九年級", "ny-chinese-school/"),
    ]
    def card(title, sched, grade, folder):
        return f'''<a class="card card-link" href="{MCC_FORMS}/{folder}" target="_blank" rel="noopener">
  <h3 style="font-size:1.2rem">{html.escape(title)}</h3>
  <div class="pills" style="margin:.2rem 0 .7rem"><span class="pill">🗓 {html.escape(sched)}</span></div>
  <p>{html.escape(grade)}</p>
  <p style="margin-top:1rem;color:var(--brand-dk)"><strong>前往報名 →</strong></p>
</a>'''
    cls_html = "".join(card(*c) for c in classes)
    tut_html = "".join(card(*t) for t in tutoring)
    body = f'''
{page_hero("報名上課", "選一個適合你的課程", "人師英語學院的線上課程全部免費，學費由協會負擔。挑選下方適合的班別或一對一媒合，點進去填寫報名表即可。")}
<section class="section">
  <div class="wrap">
    <p class="eyebrow rvl">小班課程</p>
    <h2 class="rvl d1">固定時段的外師小班</h2>
    <div class="grid cols-2 stagger" style="margin-top:1.6rem">{cls_html}</div>
  </div>
</section>
<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">一對一 · 家教媒合</p>
    <h2 class="rvl d1">彈性時間的一對一</h2>
    <div class="grid cols-2 stagger" style="margin-top:1.6rem">{tut_html}</div>
    <p class="muted rvl" style="margin-top:1.6rem;font-size:.92rem">＊報名後若有媒合上，會再透過 Line 或 email 通知上課方式。有任何問題歡迎聯絡林吉祥老師：<a href="mailto:{SITE['email']}">{SITE['email']}</a>。</p>
  </div>
</section>
'''
    write("/rural-schools/register/", layout("/rural-schools/register/", "報名上課",
        "人師英語學院免費線上課程報名：外師小班（Shannon／Bridget／Dom）與一對一英語媒合。", body, "rural"))

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
        ("請問如何申請上課？", "請填寫上課報名表，完成後寫信給林吉祥老師告知 email：luke@mycultureconnect.org。"),
        ("上一對一英語課程需要繳費嗎？", "跟實習老師上課是完全免費。"),
        ("可以上幾堂課？", "跟 ITA 學院的實習老師上課至少是六節課。"),
        ("一次上課時間多久？", "師生雙方協調好即可，通常一次一小時。"),
        ("實習老師完成實習後可以繼續申請嗎？", "可以。老師通知課程結束後，可再通知 Luke 老師安排下一位實習老師。"),
        ("聯絡窗口是哪位老師？", "聯絡窗口是林吉祥老師，可用 Line（ID：luke7429）或 email 聯絡。"),
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
    <p class="rvl" style="margin-top:2rem"><a class="btn btn-primary" href="mailto:{SITE['email2']}">寫信報名上課</a></p>
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
def hub_page(path, key, eyebrow, title, lead, children):
    cards = "\n".join(
        f'<a class="card card-link" href="{href}"><span class="ico">{ico}</span><h3>{html.escape(lbl)}</h3><p>{html.escape(blurb)}</p></a>'
        for href, ico, lbl, blurb in children)
    body = f'''
{page_hero(eyebrow, title, lead)}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{cards}</div></div></section>
'''
    write(path, layout(path, title, lead, body, key))

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
        btns="".join(
            f'<button class="quiz-opt"{" data-correct=\"1\"" if c else ""}><span class="ql">{L[k]}</span>{html.escape(w)}</button>'
            for k,(w,c) in enumerate(opts))
        prompt = f'「{html.escape(czh)}」是哪一個英文字？' if czh else f'Which one is “{html.escape(cw)}”?'
        qs.append(f'<div class="quiz"><p class="q">{qi+1}. {prompt}</p><div class="quiz-opts">{btns}</div></div>')
    return '<p class="sub-head">小測驗 Quick Check</p>' + "".join(qs)

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
        <button class="spk" data-say="{html.escape(a["w"])}" aria-label="唸單字">🔊</button></div>
        <p class="eg"><button class="spk" data-say="{html.escape(a["eg"])}" aria-label="唸例句">🔊</button><span>{html.escape(a["eg"])}</span></p>
        <p class="eg-zh">{html.escape(_zh_tidy(a["eg_zh"]))}</p></div>''' for a in u["advanced"])
    tr = html.escape(_zh_tidy(u["translation"]))
    photo_html = f'<div class="unit-photo"><img loading="lazy" src="{photo}" alt="{html.escape(u["title"])}"></div>' if photo else ""
    teach_html = ""
    if audio.get("teach") or audio.get("eng"):
        rows = ""
        if audio.get("teach"):
            rows += f'<div class="ta">📖 課文教學（中文講解）<audio controls preload="none" src="{AUDIO_REL}/{audio["teach"]}"></audio></div>'
        if audio.get("eng"):
            rows += f'<div class="ta">🗣️ 全英教學<audio controls preload="none" src="{AUDIO_REL}/{audio["eng"]}"></audio></div>'
        teach_html = f'<p class="sub-head">完整教學音檔</p><div class="teach-audio">{rows}</div>'
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
          <button class="spk lg" data-say="{html.escape(u['passage'])}" aria-label="朗讀課文">🔊</button>
          <span class="muted" style="font-size:.9rem">課文朗讀（真人）</span>{read_audio}
        </div>
        <button class="tr-toggle" data-target="{uid}-tr">顯示中文翻譯</button>
        <div class="tr-box" id="{uid}-tr">{tr}</div>
      </div>
    </div>
    <p class="sub-head">生字 Key Words</p>
    <div class="vocab-row">{vocab_html}</div>
    <p class="sub-head">進階學習 Go Further</p>
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
    """Conversation unit: render dialogue turns as speaker bubbles, reuse the rest."""
    turns = u.get("dialogue", [])
    speakers = []
    for t in turns:
        if t["speaker"] not in speakers: speakers.append(t["speaker"])
    rows = ""
    for t in turns:
        side = "A" if (speakers.index(t["speaker"]) % 2 == 0) else "B"
        rows += (f'<div class="turn turn-{side}"><span class="who">{html.escape(t["speaker"])}</span>'
                 f'<p class="said"><button class="spk" data-say="{html.escape(t["line"])}" aria-label="唸這句">🔊</button>'
                 f'<span>{html.escape(t["line"])}</span></p></div>')
    dialogue_html = f'<div class="dialogue">{rows}</div>'
    return render_basic_unit(book, u, level="conv", audio_rel=CONV_AUDIO_REL, pdf_rel=CONV_PDF_REL, body_html=dialogue_html)

def render_basic_unit(book, u, level="basic", audio_rel=BASIC_AUDIO_REL, pdf_rel=BASIC_PDF_REL, body_html=None):
    uid = f"{level}-b{book:02d}u{u['unit']:02d}"
    audio = u.get("audio") or {}
    title = html.escape(u["title"])
    photos = u.get("photos") or []
    photos_html = ('<div class="rd-photos">' + "".join(
        f'<img loading="lazy" src="{p}" alt="{title}">' for p in photos) + '</div>') if photos else ""
    paras_html = "".join(
        f'<p class="rd-para"><button class="spk" data-say="{html.escape(p)}" aria-label="朗讀">🔊</button><span>{html.escape(p)}</span></p>'
        for p in u.get("paras", []))
    read_audio = f'<audio controls preload="none" src="{audio_rel}/{audio["read"]}"></audio>' if audio.get("read") else ""
    full_say = " ".join(u.get("paras", []))
    vocab_html = "".join(
        f'<span class="vchip"><b>{html.escape(v["w"])}</b><span class="pos">({v["pos"]})</span><span class="zh">{html.escape(v["zh"])}</span>'
        f'<button class="spk" data-say="{html.escape(v["w"])}" aria-label="唸">🔊</button></span>'
        for v in u.get("vocab", []) if v.get("zh"))
    qs = u.get("questions", []); ans = u.get("answers", [])
    qa_html = ""
    for i, q in enumerate(qs):
        a = ans[i] if i < len(ans) else ""
        aid = f"{uid}-a{i}"
        ans_block = (f'<button class="tr-toggle" data-target="{aid}" data-show="看參考答案" data-hide="隱藏參考答案">看參考答案</button><div class="tr-box" id="{aid}">{html.escape(a)}</div>') if a else ""
        qa_html += f'''<div class="qa"><p class="q"><button class="spk" data-say="{html.escape(q)}" aria-label="唸題目">🔊</button><span>{html.escape(q)}</span></p>{ans_block}</div>'''
    tr = html.escape(re.sub(r'(?<=[一-鿿])\s+(?=[一-鿿])','', u.get("translation","")))
    teach_html = ""
    if audio.get("teach") or audio.get("eng"):
        rows=""
        if audio.get("teach"): rows+=f'<div class="ta">📖 課文教學（中文講解）<audio controls preload="none" src="{audio_rel}/{audio["teach"]}"></audio></div>'
        if audio.get("eng"): rows+=f'<div class="ta">🗣️ 全英教學<audio controls preload="none" src="{audio_rel}/{audio["eng"]}"></audio></div>'
        teach_html=f'<p class="sub-head">完整教學音檔</p><div class="teach-audio">{rows}</div>'
    pdf_link = f'<a class="unit-dl" href="{pdf_rel}/{u["pdf"]}" target="_blank" rel="noopener">⬇ PDF</a>' if u.get("pdf") else ""
    tr_block = (f'<button class="tr-toggle" data-target="{uid}-tr">顯示中文翻譯</button><div class="tr-box" id="{uid}-tr">{tr}</div>') if tr else ""
    qa_section = (f'<p class="sub-head">閱讀理解 Questions</p><div class="qa-list">{qa_html}</div>') if qa_html else ""
    vocab_section = (f'<p class="sub-head">生字及片語 Words &amp; Phrases</p><div class="vocab-grid">{vocab_html}</div>') if vocab_html else ""
    quiz_html = render_quiz(book, u) if len([v for v in u.get("vocab", []) if v.get("zh")]) >= 4 else ""
    return f'''<div class="unit" id="{uid}">
  <div class="unit-head"><span class="no">{u['unit']}</span><h3>Unit {u['unit']}: {title}</h3>{pdf_link}</div>
  <div class="unit-body">
    {photos_html}
    {body_html if body_html is not None else f'<div class="passage-block">{paras_html}</div>'}
    <div class="audio-row"><button class="spk lg" data-say="{html.escape(full_say)}" aria-label="朗讀全文">🔊</button><span class="muted" style="font-size:.9rem">課文朗讀（真人）</span>{read_audio}</div>
    {tr_block}
    {qa_section}
    {vocab_section}
    {teach_html}
    {quiz_html}
  </div>
</div>'''

def build_basic_hub():
    cards=[]
    for b in range(1,7):
        units=BASIC.get(str(b))
        if units:
            cards.append(f'<a class="card card-link" href="/resources/booklets/basic/book{b}/"><span class="ico">📘</span><h3>Book {b}</h3><p>共 {len(units)} 課</p></a>')
        else:
            cards.append(f'<div class="card" style="opacity:.5"><span class="ico">📘</span><h3>Book {b}</h3><p>製作中</p></div>')
    body = f'''
{page_hero("初級閱讀 · Basic Reading", "讀懂一篇文章", "進階的閱讀練習：讀文章、聽真人朗讀、想想閱讀理解問題、學生字片語，再做個小測驗。")}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{''.join(cards)}</div>
<p class="muted rvl" style="margin-top:1.5rem">＊Book 7–14 內容整理中。</p></div></section>
'''
    write("/resources/booklets/basic/", layout("/resources/booklets/basic/", "初級閱讀",
        "人師閱讀教材·初級閱讀（Basic Reading）：長文閱讀、真人朗讀、閱讀理解問答、生字片語、小測驗。", body, "resources"))

def build_basic_book(b):
    units = sorted(BASIC.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u) for u in units)
    body = f'''
{page_hero(f"初級閱讀 · Book {b}", f"Basic Reading — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "每課：看圖 → 讀文章（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。")}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊本冊共 {len(units)} 課。</p>
</div></section>
'''
    write(f"/resources/booklets/basic/book{b}/", layout(f"/resources/booklets/basic/book{b}/",
        f"初級閱讀 Book {b}", f"人師閱讀教材·初級閱讀第{b}冊，{len(units)} 課互動閱讀。", body, "resources"))

def build_inter_hub():
    done = sorted(int(k) for k in INTERMEDIATE)
    cards=[]
    for b in done:
        units=INTERMEDIATE[str(b)]
        cards.append(f'<a class="card card-link" href="/resources/booklets/intermediate/book{b}/"><span class="ico">📗</span><h3>Book {b}</h3><p>共 {len(units)} 課</p></a>')
    body = f'''
{page_hero("中級閱讀 · Intermediate Reading", "讀進一步的文章", "更深入的閱讀練習：讀文章、聽真人朗讀、想想閱讀理解問題、學生字片語，再做個小測驗。")}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{''.join(cards)}</div>
<p class="muted rvl" style="margin-top:1.5rem">＊Book 5 以後內容整理中。</p></div></section>
'''
    write("/resources/booklets/intermediate/", layout("/resources/booklets/intermediate/", "中級閱讀",
        "人師閱讀教材·中級閱讀（Intermediate Reading）：長文閱讀、真人朗讀、閱讀理解問答、生字片語、小測驗。", body, "resources"))

def build_inter_book(b):
    units = sorted(INTERMEDIATE.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u, level="inter", audio_rel=INTER_AUDIO_REL, pdf_rel=INTER_PDF_REL) for u in units)
    body = f'''
{page_hero(f"中級閱讀 · Book {b}", f"Intermediate Reading — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "每課：看圖 → 讀文章（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。")}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊本冊共 {len(units)} 課。</p>
</div></section>
'''
    write(f"/resources/booklets/intermediate/book{b}/", layout(f"/resources/booklets/intermediate/book{b}/",
        f"中級閱讀 Book {b}", f"人師閱讀教材·中級閱讀第{b}冊，{len(units)} 課互動閱讀。", body, "resources"))

def build_adv_hub():
    cards=[f'<a class="card card-link" href="/resources/booklets/advanced/book{b}/"><span class="ico">📕</span><h3>Book {b}</h3><p>共 {len(ADVANCED[str(b)])} 課</p></a>'
           for b in sorted(int(k) for k in ADVANCED)]
    body = f'''
{page_hero("高級閱讀 · Advanced Reading", "挑戰更長的文章", "進階讀者的閱讀練習：讀較長的文章、聽真人朗讀、學進階生字片語，再做個小測驗。")}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{''.join(cards)}</div>
<p class="muted rvl" style="margin-top:1.5rem">＊Book 5 以後內容整理中。</p></div></section>
'''
    write("/resources/booklets/advanced/", layout("/resources/booklets/advanced/", "高級閱讀",
        "人師閱讀教材·高級閱讀（Advanced Reading）：長文閱讀、真人朗讀、生字片語、小測驗。", body, "resources"))

def build_adv_book(b):
    units = sorted(ADVANCED.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u, level="adv", audio_rel=ADV_AUDIO_REL, pdf_rel=ADV_PDF_REL) for u in units)
    body = f'''
{page_hero(f"高級閱讀 · Book {b}", f"Advanced Reading — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "每課：看圖 → 讀文章（真人朗讀）→ 生字片語 → 小測驗。")}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊本冊共 {len(units)} 課。</p>
</div></section>
'''
    write(f"/resources/booklets/advanced/book{b}/", layout(f"/resources/booklets/advanced/book{b}/",
        f"高級閱讀 Book {b}", f"人師閱讀教材·高級閱讀第{b}冊，{len(units)} 課互動閱讀。", body, "resources"))

def build_conv_hub():
    cards=[f'<a class="card card-link" href="/resources/booklets/conversation/book{b}/"><span class="ico">💬</span><h3>Book {b}</h3><p>共 {len(CONVERSATION[str(b)])} 課</p></a>'
           for b in sorted(int(k) for k in CONVERSATION)]
    body = f'''
{page_hero("實用英語會話 · Practical Conversation", "開口說，最實用", "貼近生活的英語對話：聽真人朗讀、跟著逐句練習、學生字片語，再做個小測驗。")}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{''.join(cards)}</div>
<p class="muted rvl" style="margin-top:1.5rem">＊Book 5 以後內容整理中。</p></div></section>
'''
    write("/resources/booklets/conversation/", layout("/resources/booklets/conversation/", "實用英語會話",
        "人師閱讀教材·實用英語會話（Practical Conversation）：生活對話、真人朗讀、生字片語、小測驗。", body, "resources"))

def build_conv_book(b):
    units = sorted(CONVERSATION.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_conv_unit(b, u) for u in units)
    body = f'''
{page_hero(f"實用英語會話 · Book {b}", f"Practical Conversation — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "每課：看圖 → 讀對話（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。")}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊本冊共 {len(units)} 課。</p>
</div></section>
'''
    write(f"/resources/booklets/conversation/book{b}/", layout(f"/resources/booklets/conversation/book{b}/",
        f"實用英語會話 Book {b}", f"人師閱讀教材·實用英語會話第{b}冊，{len(units)} 課互動對話。", body, "resources"))

def build_desc_hub():
    cards=[f'<a class="card card-link" href="/resources/booklets/description/book{b}/"><span class="ico">🖼️</span><h3>Book {b}</h3><p>共 {len(DESCRIPTION[str(b)])} 課</p></a>'
           for b in sorted(int(k) for k in DESCRIPTION)]
    body = f'''
{page_hero("看圖描述 · Picture Description", "看著圖，說出來", "看圖學描述：看圖片、讀描述短文、聽真人朗讀、學生字片語，再做個小測驗。")}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{''.join(cards)}</div>
<p class="muted rvl" style="margin-top:1.5rem">＊Book 5 以後內容整理中。</p></div></section>
'''
    write("/resources/booklets/description/", layout("/resources/booklets/description/", "看圖描述",
        "人師閱讀教材·看圖描述（Picture Description）：看圖學描述、真人朗讀、生字片語、小測驗。", body, "resources"))

def build_desc_book(b):
    units = sorted(DESCRIPTION.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_basic_unit(b, u, level="desc", audio_rel=DESC_AUDIO_REL, pdf_rel=DESC_PDF_REL) for u in units)
    body = f'''
{page_hero(f"看圖描述 · Book {b}", f"Picture Description — 第{_CN_NUM[b] if b < len(_CN_NUM) else b}冊", "每課：看圖 → 讀描述（真人朗讀）→ 閱讀理解 → 生字片語 → 小測驗。")}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊本冊共 {len(units)} 課。</p>
</div></section>
'''
    write(f"/resources/booklets/description/book{b}/", layout(f"/resources/booklets/description/book{b}/",
        f"看圖描述 Book {b}", f"人師閱讀教材·看圖描述第{b}冊，{len(units)} 課互動學習。", body, "resources"))

EVERYDAY_META = {
    "1":("Book 1","校園與日常生活","🦷"), "2":("Book 2","生活情境","🏠"),
    "3":("Book 3","社區與外出","🏙️"), "4":("Book 4","自然與健康","🌿"),
    "5":("Book 5","興趣與活動","🎨"), "6":("Book 6","世界與未來","🌏"),
}
_CN_NUM = "零一二三四五六"

def build_everyday_hub():
    cards=[]
    for b in ["1","2","3","4","5","6"]:
        title, sub, ico = EVERYDAY_META[b]
        units = EVERYDAY.get(b)
        if units:
            cards.append(f'<a class="card card-link" href="/resources/booklets/everyday/book{b}/"><span class="ico">{ico}</span><h3>{title}</h3><p>{sub}　·　共 {len(units)} 課</p></a>')
        else:
            cards.append(f'<div class="card" style="opacity:.5"><span class="ico">{ico}</span><h3>{title}</h3><p>{sub}　·　製作中</p></div>')
    body = f'''
{page_hero("基礎英語 · Everyday Topics", "從生活，開始學英語", "六冊主題式英語教材：看圖、讀短文、聽真人朗讀、學生字與進階用法，再做個小測驗。")}
<section class="section"><div class="wrap"><div class="grid cols-3 stagger">{''.join(cards)}</div></div></section>
'''
    write("/resources/booklets/everyday/", layout("/resources/booklets/everyday/", "基礎英語",
        "人師閱讀教材·基礎英語（Everyday Topics）六冊主題式英語自學：短文、真人朗讀、生字與進階學習、小測驗。", body, "resources"))

def build_everyday_book(b):
    units = sorted(EVERYDAY.get(str(b), []), key=lambda u: u["unit"])
    units_html = "".join(render_unit(b, u, u.get("photo"), u.get("audio") or {}) for u in units)
    cn = _CN_NUM[b] if b < len(_CN_NUM) else str(b)
    body = f'''
{page_hero(f"基礎英語 · Book {b}", f"Everyday Topics — 第{cn}冊", "每課：看圖 → 讀短文（真人朗讀）→ 生字與進階學習 → 小測驗。")}
<section class="section"><div class="wrap" style="max-width:940px">
{units_html}
<p class="muted rvl" style="margin-top:1rem">＊本冊共 {len(units)} 課。</p>
</div></section>
'''
    write(f"/resources/booklets/everyday/book{b}/", layout(f"/resources/booklets/everyday/book{b}/",
        f"基礎英語 Book {b}", f"人師閱讀教材·基礎英語第{cn}冊，{len(units)} 課互動閱讀（短文／真人朗讀／生字／進階學習／小測驗）。", body, "resources"))

def build_resources_hub():
    hub_page("/resources/", "resources", "英語學習資源",
        "免費自學，永不停止", "Never stop learning, because life never stops teaching. — 依學習目的分類，閱讀、基礎、聽說、生活英語，全部免費開放。",
        [
            ("/resources/reading/", "📖", "閱讀與經典", "閱讀教材、經典名著《動物農莊》、落日餘暉與英語期刊。"),
            ("/resources/basics/", "📐", "打好基礎", "自然發音、造句、文法與句型分析，把地基打穩。"),
            ("/resources/speaking/", "🗣️", "聽說與會話", "GEPT 口說、一分鐘英語與校園情境會話，開口說英語。"),
            ("/resources/life/", "🌱", "生活英語", "俚語、時事、在地英語節目與學習短片，輕鬆學。"),
        ])

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
    hub_page("/resources/reading/", "resources", "閱讀與經典",
        "讀進去，世界就打開了", "從基礎讀物到經典名著——循序漸進的中英對照閱讀。",
        [
            ("/resources/booklets/everyday/", "☀️", "基礎英語", "最基礎的日常英語主題。"),
            ("/resources/booklets/basic/", "🌱", "初級閱讀", "適合剛起步的讀者。"),
            ("/resources/booklets/intermediate/", "🌿", "中級閱讀", "進一步擴充字彙與句型。"),
            ("/resources/booklets/advanced/", "🌳", "高級閱讀", "挑戰較長篇的英語文章。"),
            ("/resources/booklets/conversation/", "💬", "實用英語會話", "日常生活的實用對話。"),
            ("/resources/booklets/description/", "🖼️", "看圖描述", "看圖學描述，練口說與寫作。"),
            ("/resources/classes/animal-farm/", "🐖", "動物農莊", "經典名著《Animal Farm》導讀。"),
            ("/resources/grandfather/", "🌅", "Grandfather 落日餘暉", "Leon La Couvée 三十章人生智慧，中英對照。"),
            ("/resources/periodicals/", "📰", "英語期刊", "明航心鄉土情、明航雙語學園與全民英語期刊典藏。"),
        ])

def build_basics_hub():
    hub_page("/resources/basics/", "resources", "打好基礎",
        "地基穩了，才走得遠", "自然發音、造句、文法與句型分析——把英語的地基打穩。",
        [
            ("/resources/videos/phonics/", "🔤", "自然發音", "從發音規則打好英語基礎。"),
            ("/resources/videos/sentences/", "✍️", "基礎英語造句篇", "從零開始學會造句。"),
            ("/resources/classes/grammar/", "📐", "基礎文法", "從詞性到時態，打好文法地基。"),
            ("/resources/videos/analysis/", "🧩", "英語句型分析", "拆解句子結構，看懂長難句（含經典版）。"),
        ])

def build_speaking_hub():
    hub_page("/resources/speaking/", "resources", "聽說與會話",
        "開口，是學會的開始", "GEPT 口說、一分鐘英語與校園情境會話——練聽力、敢開口。",
        [
            ("/resources/videos/gept-basic/", "🗣️", "初級口說訓練", "GEPT 初級口說題型練習。"),
            ("/resources/videos/gept-intermediate/", "🎙️", "中級口說訓練", "GEPT 中級口說題型練習。"),
            ("/resources/videos/one-min/", "⏱️", "一分鐘英語教室", "每天一分鐘，輕鬆學英語。"),
            ("/resources/videos/travel/", "🗽", "一分鐘英語-美國篇", "跟著鏡頭遊覽美國，一分鐘學一個英語主題。"),
            ("/resources/videos/cien-school/", "🏫", "CIEN 校園英語", "校園情境的英語會話。"),
        ])

def build_life_hub():
    hub_page("/resources/life/", "resources", "生活英語",
        "英語，就在生活裡", "俚語、時事、在地英語節目與學習短片——把英語融進日常。",
        [
            ("/resources/videos/slang/", "💬", "一分鐘俚語", "道地英語俚語輕鬆學。"),
            ("/resources/videos/current-events/", "🗞️", "看時事學英文", "從新聞時事學習實用英語。"),
            ("/resources/videos/e-vision/", "📺", "彰化 E 視界英語教室", "在地製作的英語教學節目。"),
            ("/resources/videos/short/", "🎬", "英語學習短片", "精選英語學習短片。"),
        ])

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

def build_series(data):
    badge = data.get("badge", "EP")
    cards = []
    for e in data["episodes"]:
        v = e["id"]
        thumb = f"https://i.ytimg.com/vi/{v}/hqdefault.jpg"
        url = f"https://www.youtube.com/watch?v={v}"
        dur = e.get("dur") or _fmt_dur(VIDEO_META.get(v, {}).get("duration"))
        date = _fmt_date(e.get("date") or VIDEO_META.get(v, {}).get("date"))
        title = html.escape(f'{data["title"]}：{e["topic"]}')
        dur_badge = f'<span class="vdur">{dur}</span>' if dur else ""
        date_html = f'<span class="vdate">{date}</span>' if date else ""
        zh_html = f'<span class="ep-zh">{html.escape(e["zh"])}</span>' if e.get("zh") else ""
        cards.append(f'''<a class="vcard ep-card" href="{url}" data-yt="{v}" title="{title}">
  <span class="vthumb"><img loading="lazy" src="{thumb}" alt="{html.escape(e["topic"])}">{dur_badge}<span class="vep">{badge}{e["ep"]}</span></span>
  <span class="vmeta"><span class="ep-topic">{html.escape(e["topic"])}</span>{zh_html}{date_html}</span>
</a>''')
    pills = "".join(f'<span class="pill">{p}</span>' for p in data.get("pills", []))
    grid = '<div class="video-grid stagger ep-grid">\n' + "\n".join(cards) + "\n</div>"
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
    children = [
        ("/resources/classes/grammar/", "📐", "基礎文法", "從詞性到時態，打好文法地基。"),
        ("/resources/classes/sentence-analysis/", "🔍", "英語句型分析（舊）", "經典句型逐句拆解。"),
        ("/resources/classes/animal-farm/", "🐖", "動物農莊", "經典名著《Animal Farm》導讀。"),
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
    btn = f'<button class="spk" data-say="{html.escape(say)}" aria-label="唸這句">🔊</button>' if say else ""
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

def build_booklets():
    hub_page("/resources/booklets/", "resources", "人師閱讀教材",
        "從一個字，讀到一篇文章", "依程度分級的閱讀與會話教材，適合自學與課堂使用。",
        [
            ("/resources/booklets/basic/", "🌱", "初級閱讀", "適合剛起步的讀者。"),
            ("/resources/booklets/intermediate/", "🌿", "中級閱讀", "進一步擴充字彙與句型。"),
            ("/resources/booklets/advanced/", "🌳", "高級閱讀", "挑戰較長篇的英語文章。"),
            ("/resources/booklets/conversation/", "💬", "實用英語會話", "日常生活的實用對話。"),
            ("/resources/booklets/description/", "🖼️", "看圖描述", "看圖學描述，練口說與寫作。"),
            ("/resources/booklets/everyday/", "☀️", "基礎英語", "最基礎的日常英語主題。"),
        ])

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
    ("/media/enactus/", "media", "Enactus 英語課程", "與杜魯門大學 Enactus 合作的英語課程。", "/RS-videos/Enactus-Truman"),
    ("/media/talks/", "media", "人師教育廣場", "教育講座與分享。", "/RS-videos/speeches"),
    ("/media/interviews/", "media", "人物專訪", "教育者與貴賓的人物專訪。", "/RS-videos/interviews"),
]

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

def build_dom_jones():
    pl = DOM["playlist"]
    cards = []
    for v in DOM["videos"]:
        vid = v["id"]; school = html.escape(v["school"])
        sub = html.escape(v.get("topic") or v.get("date") or "")
        thumb = f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg"
        url = f"https://www.youtube.com/watch?v={vid}"
        sub_html = f'<span class="vdate">{sub}</span>' if sub else ""
        cards.append(f'''<a class="vcard" href="{url}" data-yt="{vid}" title="{school}">
  <span class="vthumb"><img loading="lazy" src="{thumb}" alt="{school}"></span>
  <span class="vmeta"><span class="vt">{school}</span>{sub_html}</span>
</a>''')
    grid = '<div class="video-grid stagger">\n' + "\n".join(cards) + "\n</div>"
    pillars = '''<div class="dom-pillars stagger">
      <div class="dpill rvl"><span class="dp-ico">📚</span><h3>英語教育</h3><p>用真實、活潑的英語，讓孩子敢聽、敢說，把課本變成真的對話。</p></div>
      <div class="dpill rvl d1"><span class="dp-ico">🌏</span><h3>國際連結</h3><p>把世界帶進教室，分享各國故事與全球議題，打開孩子的視野。</p></div>
      <div class="dpill rvl d2"><span class="dp-ico">💛</span><h3>善的力量</h3><p>每一場演講都帶著一個訊息：善良與行動，每個孩子都能傳遞下去。</p></div>
    </div>'''
    body = f'''
{page_hero("學校訪問 · Dom Jones", "Dom Jones 走進彰化的教室",
           "真實的英語、全球的故事，以及一個每位學生都能帶著走的訊息。")}
<section class="section"><div class="wrap prose wide rvl">
  <p>Dom Jones 是聯合國永續發展目標（SDG）大使、人師教育協會倡議委員會主席。他走進一所又一所學校，用一場場校園演講，把活的英語、國際連結與善的力量帶給彰化的孩子。每一次到訪，都由學生協力產出一支校園新聞影片。</p>
</div></section>
<section class="section band"><div class="wrap">
  <div class="section-head rvl"><p class="eyebrow">他帶給每場集會的</p><h2>三件事</h2></div>
  {pillars}
</div></section>
<section class="section"><div class="wrap">
  <p class="eyebrow rvl">校園巡迴演講播放清單</p>
  <h2 class="rvl d1" style="margin-bottom:1.2rem">School Assembly Tour</h2>
  <div class="playlist-frame rvl d1"><iframe src="https://www.youtube.com/embed/videoseries?list={pl}" title="Dom Jones 校園巡迴演講播放清單" loading="lazy" allow="encrypted-media" allowfullscreen></iframe></div>
</div></section>
<section class="section"><div class="wrap">
  <div class="flex rvl" style="justify-content:space-between;align-items:center;margin-bottom:1.4rem">
    <div><p class="eyebrow">每一所學校，每一次到訪</p><h2 style="margin:.2rem 0 0">Every Campus, Every Visit</h2></div>
    <div class="pills"><span class="pill"><b>{len(DOM["videos"])}</b> 所學校</span></div>
  </div>
  {grid}
</div></section>
'''
    write("/media/dom-jones/", layout("/media/dom-jones/", "Dom Jones 走進彰化的教室",
        "聯合國 SDG 大使 Dom Jones 走訪彰化校園，留下一支支學生協作的校園新聞影片。", body, "media"))

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
def build_static():
    # CNAME (only for custom-domain build), favicon, .nojekyll, robots
    cname_path = os.path.join(ROOT, "CNAME")
    if BASE:
        if os.path.exists(cname_path): os.remove(cname_path)
    else:
        open(cname_path, "w").write("www.twrses.org\n")
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
     "zh": "自 2022 年起的長期夥伴，紐約 Albany 的學生輔導臺灣孩子英文並來彰化教學交流，收錄於 27 支影片。",
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
    photos = d.get("photos", [])
    photo_html = ""
    if photos:
        figs = "".join(
            f'<figure class="figure"><img loading="lazy" src="{ph}" alt="{html.escape(d["name"])}"></figure>'
            for ph in photos)
        photo_html = f'<div class="pgallery stagger">{figs}</div>'
    sec_html = ""
    for s in d.get("sections", []):
        ps = "".join(f'<p>{html.escape(x)}</p>' for x in s.get("paras", []) if x.strip())
        head = html.escape(s.get("heading", ""))
        if head or ps:
            sec_html += f'<div class="psection rvl"><h2>{head}</h2><div class="prose wide">{ps}</div></div>'
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
  {photo_html}
  {sec_html}
  {vid_html}
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
    build_grandfather(); paths.append("/resources/grandfather/")
    build_periodicals(); paths.append("/resources/periodicals/")
    build_media_hub(); paths.append("/media/")
    build_grandpa_mike(); paths.append("/media/grandpa-mike/")
    build_exchange_hub(); paths.append("/media/exchange/")
    build_dom_jones(); paths.append("/media/dom-jones/")
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
    build_sitemap(paths)
    print(f"✅ 建置完成，共 {len(paths)} 頁")
    for p in paths: print("  ", p)

if __name__ == "__main__":
    main()
