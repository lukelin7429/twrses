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
            ("/resources/classes/earth/", "🌏", "Earth and Weather · 地球與天氣",
             "Why does the ground shake, and where does the rain come from? Earthquakes, typhoons, and the land under your feet, in English with 3D models. 地為什麼會搖？雨從哪裡來？用英文讀懂地震、颱風和腳下的土地，再用 3D 模型看清楚。"),
            ("/resources/classes/calligraphy/", "🖌️", "Chinese Calligraphy · 書法",
             "Brush, ink, paper, and inkstone: watch a 3D brush write in slow motion, then write it yourself on the practice pad. 文房四寶與毛筆字：先看 3D 毛筆慢動作寫字，再到練字板上自己寫。"),
            ("/resources/classes/computers/", "💻", "How Computers Work · 電腦概論",
             "From one switch to programs, the internet, and AI: how 0s and 1s stack up into everything on your screen, in English with 3D models. 從一個開關講到程式、網路和 AI：0 和 1 怎麼一層一層疊成你看到的畫面，用英文讀懂，再用 3D 模型看清楚。"),
            ("/resources/classes/philosophy/", "🦉", "Philosophy · 哲學",
             "Advanced reading: the big questions, the people who asked them, and where the Dharma meets Western thought. 高級閱讀：哲學的大問題、問這些問題的人，以及佛法與西方哲學的對照。"),
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
            "digestion": "digestion", "nerves": "nerves", "eyes": "eyes", "ears": "ears", "skin": "skin", "teeth": "teeth", "germs": "germs", "kidneys": "kidneys", "taste": "taste", "sleep": "sleep", "growth": "growth", "voice": "voice", "hands": "hands", "healing": "healing", "exercise": "exercise", "energy": "energy"}   # lab.kind → assets/js/<bundle>.js

def _body_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/body.css", "assets/models/skeleton.glb", "assets/models/organs.glb",
                *(f"assets/js/{j}.js" for j in _BODY_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _model_url():
    """骨架模型的網址：版本號只看 glb 本身，改 CSS/JS 不會讓學生重新下載 1 MB 的模型。"""
    fp = os.path.join(ROOT, "assets/models/skeleton.glb")
    v = hashlib.md5(open(fp, "rb").read()).hexdigest()[:8] if os.path.exists(fp) else "0"
    return f"/assets/models/skeleton.glb?v={v}"

def _organs_url():
    """真實器官模型（腎臟、輸尿管、膀胱、舌頭）的網址：版本號只看 glb 本身。"""
    fp = os.path.join(ROOT, "assets/models/organs.glb")
    v = hashlib.md5(open(fp, "rb").read()).hexdigest()[:8] if os.path.exists(fp) else "0"
    return f"/assets/models/organs.glb?v={v}"

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

def render_ears_lab(lesson):
    """第九課：放大剖開的耳朵＋聲波（assets/js/ears.js 綁這裡的 class）；聽力測驗是 2D＋WebAudio，不需要 WebGL。"""
    lab = lesson["lab"]
    pre_json = html.escape(json.dumps(lab["presets"], ensure_ascii=False))
    pre_btns = "".join(
        f'<button type="button" data-pre="{k}" aria-pressed="{"true" if k == "bird" else "false"}"><i aria-hidden="true">{v["icon"]}</i>'
        f'<span>{html.escape(v["en"])}<small>{html.escape(v["zh"])} · {v["hz"]:,} Hz</small></span></button>'
        for k, v in lab["presets"].items())
    steps = [8000, 10000, 12000, 14000, 15000, 16000, 17000, 18000, 19000, 20000]
    ladder = "".join(f'<li data-hz="{f}"><b>{f // 1000}</b><span>kHz</span></li>' for f in reversed(steps))
    hz_ticks = "".join(f'<i style="left:{p}%"><span>{t}</span></i>' for p, t in
                       [(0, "20"), (23.3, "100"), (56.7, "1k"), (90, "10k"), (100, "20k")])
    db_ticks = "".join(f'<i style="left:{round(v / 130 * 100, 1)}%"><span>{t}</span></i>' for v, t in
                       [(30, "&#129323; 30"), (60, "&#128483;&#65039; 60"), (85, "&#128663; 85"), (120, "&#129512; 120")])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("waves", "Air waves", "空氣振動", True),
                       ("skull", "Skull and brain", "頭骨與大腦", True)])
    return f'''<div class="astro-lab sk-lab ea-lab rvl" data-ears-lab data-model="{_model_url()}" data-pre="{pre_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the ear cut open, with sound waves moving the eardrum, the three tiny bones, and the cochlea · 剖開的耳朵 3D 模型，聲波推動鼓膜、三塊聽小骨與耳蝸"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Ear shown 4&times; life size, cut open · 耳朵放大 4 倍、剖開來看</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The hearing test and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的聽力測驗和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside ea-aside">
      <p class="al-sky-k">Pick a sound · 選一個聲音</p>
      <div class="ea-pres" role="group" aria-label="Sounds · 聲音">{pre_btns}</div>
      <div class="ea-meter">
        <p class="ea-meter-k">Pitch · 音高 <b class="ea-hz">4,000 Hz</b> <em class="ea-hz-w"></em></p>
        <div class="ea-bar ea-hzbar"><s></s>{hz_ticks}<u class="ea-heard" hidden></u><b class="ea-mark"></b></div>
        <p class="ea-meter-k">Loudness · 音量 <b class="ea-db">50 dB</b> <em class="ea-db-w"></em></p>
        <div class="ea-bar ea-dbbar"><s></s>{db_ticks}<b class="ea-mark"></b></div>
      </div>
      <p class="ey-status ea-status" aria-live="polite"></p>
      <div class="ey-more ea-more">
        <button type="button" class="ea-uncoil" aria-pressed="false"><i aria-hidden="true">&#128012;</i><span>Uncoil the cochlea<small>把耳蝸拉直</small></span></button>
        <button type="button" class="ea-spin" aria-pressed="false"><i aria-hidden="true">&#127744;</i><span>Spin around<small>轉圈圈：平衡</small></span></button>
        <button type="button" class="ea-play" aria-pressed="false"><i aria-hidden="true">&#128264;</i><span>Play it quietly<small>小聲播放這個音</small></span></button>
      </div>
    </aside>
  </div>
  <div class="ea-strip">
    <ol class="ea-ladder" aria-label="Notes in the hearing test · 聽力測驗的音">{ladder}</ol>
    <div class="ea-ht-text">
      <p class="al-sky-k">Hearing test · 聽力測驗</p>
      <p class="ea-ht-msg"></p>
      <div class="ey-bs-btns ea-ht-btns">
        <button type="button" class="ea-ht-cal">&#9654; Test note: 1,000 Hz<small>試聽 1,000 赫茲，先調好音量</small></button>
        <button type="button" class="ea-ht-start ey-bs-3d">&#128066; Start the test<small>開始測驗</small></button>
        <button type="button" class="ea-ht-yes ey-bs-3d" hidden>&#10003; I hear it<small>聽得到</small></button>
        <button type="button" class="ea-ht-no" hidden>&#10007; I can&#8217;t<small>聽不到</small></button>
        <button type="button" class="ea-ht-again" hidden>&#8634; Play it again<small>再聽一次</small></button>
        <button type="button" class="ea-ht-3d" hidden>&#128066; Show my top note in 3D<small>在 3D 耳朵裡看我的最高音</small></button>
      </div>
      <p class="ea-ht-safe">&#128265; Quiet room, speakers only, no earphones. Every note is short and quiet. Stop if anything feels uncomfortable.<span class="zh">請在安靜的房間用喇叭，不要戴耳機。每個音都短短的、小小聲；只要覺得不舒服就停下來。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <label class="ec-slider ea-hz-row"><span class="ec-slider-k">Pitch · 音高<em>low · 低 &harr; high · 高</em></span>
      <input type="range" class="ec-time ea-hz-in" min="0" max="1000" step="1" value="756"></label>
    <label class="ec-slider ea-db-row"><span class="ec-slider-k">Loudness · 音量<em>quiet · 小聲 &harr; very loud · 非常大聲</em></span>
      <input type="range" class="ec-time ea-db-in" min="0" max="130" step="1" value="50"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_skin_lab(lesson):
    """第十課：放大剖開的皮膚（assets/js/skin.js 綁這裡的 class）；「今天彰化的太陽」是 2D 小工具，不需要 WebGL。"""
    lab = lesson["lab"]
    scen_json = html.escape(json.dumps(lab["scenarios"], ensure_ascii=False))
    btns = "".join(
        f'<button type="button" data-scen-go="{k}" aria-pressed="{"true" if k == "hot" else "false"}"><i aria-hidden="true">{v["icon"]}</i>'
        f'<span>{html.escape(v["en"])}<small>{html.escape(v["zh"])}</small></span></button>'
        for k, v in lab["scenarios"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("bones", "Arm bones", "手臂骨頭", True)])
    return f'''<div class="astro-lab sk-lab sn-lab rvl" data-skin-lab data-model="{_model_url()}" data-scen="{scen_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a magnified, cut-open square of skin with hairs, sweat glands, blood vessels, and touch sensors · 放大剖開的一小塊皮膚 3D 模型，有毛髮、汗腺、血管與觸覺感受器"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Skin shown 25&times; life size, cut open · 皮膚放大 25 倍、剖開來看</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sun tool and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的太陽小工具和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside sn-aside">
      <p class="al-sky-k">Pick a moment · 選一個情境</p>
      <div class="ea-pres sn-scs" role="group" aria-label="Moments · 情境">{btns}</div>
      <p class="nv-title sn-title"></p><p class="nv-zh sn-zh"></p>
      <p class="ey-status sn-status" aria-live="polite"></p>
      <div class="sn-clock" hidden><b class="sn-min">0</b><span>minutes in the sun<small>曬太陽的分鐘數（10 秒＝1 小時）</small></span></div>
      <button type="button" class="nv-replay sn-replay">&#8634; Replay<small>再看一次</small></button>
    </aside>
  </div>
  <div class="sn-strip">
    <div class="sn-chart"><canvas class="sn-cv" width="640" height="280" aria-label="Clear-sky UV index over today in Changhua · 今天彰化晴天的紫外線指數"></canvas></div>
    <div class="sn-text">
      <p class="al-sky-k">Today&#8217;s sun in Changhua · 今天彰化的太陽</p>
      <div class="sn-when">
        <label>Date · 日期<input type="date" class="sn-date"></label>
        <label class="sn-tl">Time · 時間 <b class="sn-time">12:00</b><input type="range" class="ec-time sn-t" min="300" max="1140" step="5" value="720"></label>
      </div>
      <dl class="ey-nums sn-nums">
        <div><dt>Sun height · 太陽高度</dt><dd class="sn-alt">—</dd></div>
        <div><dt>Your shadow · 你的影子</dt><dd class="sn-shadow">—</dd></div>
        <div><dt>UV index · 紫外線指數</dt><dd class="sn-uvi">—</dd></div>
      </dl>
      <p class="sn-advice" aria-live="polite"></p>
      <p class="sn-note">Clear-sky estimate for Changhua (24.08&deg;N, 120.54&deg;E); clouds, haze, and shade lower it. For the real forecast, see the <a href="https://www.cwa.gov.tw/" target="_blank" rel="noopener">Central Weather Administration</a>.<span class="zh">彰化（北緯 24.08 度、東經 120.54 度）晴天的估算值；有雲、霾或遮蔽時會比較低。實際預報請看中央氣象署。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_teeth_lab(lesson):
    """第十一課：真實頷骨＋自繪牙齒，年齡滑桿看換牙（assets/js/teeth.js 綁這裡的 class）；牙齒圖與蛀牙剖面是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    age_btns = "".join(f'<button type="button" data-age="{a}">{a}<small>歲</small></button>' for a in lab["ages"])
    def row(jaw):
        cells = []
        for side, order in (("l", range(7, 0, -1)), ("r", range(1, 8))):
            for n in order:
                cells.append(f'<button type="button" class="th-c" data-jaw="{jaw}" data-side="{side}" data-pos="{n}" data-st="0" '
                             f'aria-label="{"Upper" if jaw == "u" else "Lower"} {"left" if side == "l" else "right"} {n}"><i></i><b>{n}</b></button>')
            if side == "l":
                cells.append('<span class="th-mid" aria-hidden="true"></span>')
        return "".join(cells)
    steps = [("Healthy", "健康的牙"), ("Plaque", "牙菌斑"), ("Acid", "細菌產酸"), ("A hole", "蛀出洞"), ("Ouch!", "痛到牙髓")]
    cav_btns = "".join(f'<button type="button" data-cav="{i}" aria-pressed="{"true" if i == 0 else "false"}">{en}<small>{zh}</small></button>' for i, (en, zh) in enumerate(steps))
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("open", "Open mouth", "張開嘴巴", True), ("skull", "Skull", "頭骨", True)])
    return f'''<div class="astro-lab sk-lab th-lab rvl" data-teeth-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the jaws with baby teeth falling out and adult teeth growing in · 上下頷骨的 3D 模型，乳牙掉落、恆牙長出"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Tap a tooth · 點一顆牙　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The tooth chart and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的牙齒圖和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside th-aside">
      <p class="al-sky-k">Age · 年齡</p>
      <p class="th-age"><b class="th-age-n">8</b><span>years old<small>歲</small></span></p>
      <div class="th-ages" role="group" aria-label="Jump to an age · 跳到某個年齡">{age_btns}</div>
      <dl class="ey-nums th-nums">
        <div><dt>Baby teeth · 乳牙</dt><dd class="th-n-baby">—</dd></div>
        <div><dt>Adult teeth · 恆牙</dt><dd class="th-n-adult">—</dd></div>
        <div><dt>Waiting · 等待中</dt><dd class="th-n-wait">—</dd></div>
      </dl>
      <p class="ey-status th-status" aria-live="polite"></p>
      <div class="sk-card th-card">
        <div class="sk-empty"><p>Tap any tooth in the model to see its name.</p><p class="zh">點模型裡任何一顆牙，看它的名字。</p></div>
        <div class="sk-info"><p class="sk-name-en th-name-en"></p><p class="sk-name-zh th-name-zh"></p><p class="sk-region th-set"></p><p class="sk-rjob th-when"></p></div>
      </div>
    </aside>
  </div>
  <div class="th-strip">
    <div class="th-chart">
      <p class="al-sky-k">My tooth chart · 我的牙齒圖</p>
      <p class="th-mirror"><span>Your left · 你的左邊</span><em>as you see it in a mirror · 照鏡子看到的樣子</em><span>Your right · 你的右邊</span></p>
      <div class="th-row th-up" aria-label="Upper teeth · 上排">{row("u")}</div>
      <div class="th-row th-lo" aria-label="Lower teeth · 下排">{row("l")}</div>
      <p class="th-key"><span><i class="k1"></i>Baby · 乳牙</span><span><i class="k2"></i>Adult · 恆牙</span><span><i class="k3"></i>Gap · 空位</span><span>1–2 incisors · 門牙　3 canine · 犬齒　4–5 premolars or baby molars · 小臼齒或乳臼齒　6–7 molars · 大臼齒</span></p>
      <p class="th-result" aria-live="polite"></p>
      <div class="ey-bs-btns"><button type="button" class="th-to3d ey-bs-3d" hidden>&#129463; Show my tooth age in 3D<small>在 3D 模型看我的牙齒年齡</small></button>
        <button type="button" class="th-clear">&#8634; Start over<small>重新標記</small></button></div>
    </div>
    <div class="th-cav">
      <p class="al-sky-k">How a cavity forms · 蛀牙怎麼形成</p>
      <canvas class="th-cav-cv" width="360" height="300" aria-label="Cross-section of a molar · 臼齒剖面"></canvas>
      <div class="th-cav-btns" role="group" aria-label="Steps · 步驟">{cav_btns}</div>
      <p class="th-cav-msg" aria-live="polite"></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <label class="ec-slider th-age-row"><span class="ec-slider-k">Age · 年齡<em>3 &rarr; 20 years old · 歲</em></span>
        <input type="range" class="ec-time th-age-in" min="3" max="20" step="0.1" value="8"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_germs_lab(lesson):
    """第十二課：指尖小傷口裡的免疫戰（assets/js/germs.js 綁這裡的 class）；病菌計算機與洗手計時器是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    wash = [("濕", "Wet", "把手淋濕"), ("搓", "Scrub 20 s", "抹肥皂搓 20 秒"), ("沖", "Rinse", "沖乾淨"),
            ("捧", "Scoop", "捧水洗水龍頭"), ("擦", "Dry", "用擦手紙擦乾")]
    wash_li = "".join(f'<li data-w="{i}"><b>{zh}</b><span>{en}<small>{d}</small></span></li>' for i, (zh, en, d) in enumerate(wash))
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("bones", "Hand bones", "手部骨頭", True)])
    return f'''<div class="astro-lab sk-lab gm-lab rvl" data-germs-lab data-model="{_model_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a tiny cut where white blood cells chase bacteria · 小傷口裡白血球追捕細菌的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Shown about 2,000&times; life size · 放大約 2,000 倍</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The calculator, the timer, and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的計算機、計時器和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside gm-aside">
      <div class="ea-pres gm-modes" role="group" aria-label="Which fight · 哪一場仗">
        <button type="button" data-mode="first" aria-pressed="true"><i aria-hidden="true">&#10067;</i><span>First time<small>第一次遇到這種病菌</small></span></button>
        <button type="button" data-mode="second" aria-pressed="false"><i aria-hidden="true">&#129504;</i><span>Second time<small>第二次：身體記得它</small></span></button>
      </div>
      <p class="gm-time"><b class="gm-t">0 min</b><span>after the cut<small class="gm-t-zh">割傷之後</small></span></p>
      <dl class="ey-nums gm-nums">
        <div><dt>Bacteria · 細菌</dt><dd class="gm-nb">—</dd></div>
        <div><dt>White blood cells · 白血球</dt><dd class="gm-nw">—</dd></div>
        <div><dt>Antibodies · 抗體</dt><dd class="gm-na">—</dd></div>
      </dl>
      <p class="ey-status gm-status" aria-live="polite"></p>
      <p class="al-sky-k">Bacteria in the cut · 傷口裡的細菌</p>
      <canvas class="gm-chart" width="340" height="170" aria-label="Number of bacteria over time in the first and second fight · 第一次和第二次交手時細菌數量的變化"></canvas>
    </aside>
  </div>
  <div class="gm-strip">
    <div class="gm-calc">
      <p class="al-sky-k">Germ math · 病菌數學</p>
      <p class="gm-calc-q">One bacterium doubles every 20 minutes. After <b class="gm-h">4 hours</b>:<span class="zh">一隻細菌每 20 分鐘多一倍，經過 <b class="gm-h-zh">4 小時</b>：</span></p>
      <p class="gm-count">4,096</p>
      <input type="range" class="ec-time gm-h-in" min="0" max="30" step="1" value="12" aria-label="Hours · 小時">
      <p class="gm-compare"></p>
    </div>
    <div class="gm-wash">
      <p class="al-sky-k">Handwashing timer · 洗手計時器</p>
      <ol class="gm-wash-steps">{wash_li}</ol>
      <div class="gm-wash-row"><div class="gm-ring" aria-hidden="true"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19"/><circle class="gm-ring-p" cx="22" cy="22" r="19"/></svg><b class="gm-sec">20</b></div>
        <div class="ey-bs-btns"><button type="button" class="gm-wash-go ey-bs-3d">&#129532; Start washing<small>開始洗手</small></button>
        <button type="button" class="gm-wash-next" hidden>Next step &rarr;<small>下一步</small></button></div></div>
      <p class="gm-wash-msg" aria-live="polite">Scrub everywhere: palms, backs, between fingers, fingertips, thumbs, and wrists. Singing “Happy Birthday” twice takes about 20 seconds.<span class="zh">每個地方都要搓到：內、外、夾、弓、大、立、完（手心、手背、指縫、指背、大拇指、指尖、手腕）。唱兩次〈生日快樂〉大約就是 20 秒。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <label class="ec-slider gm-time-row"><span class="ec-slider-k">Time after the cut · 割傷之後的時間<em>hours at first, then days · 前面以小時計、後面以天計</em></span>
        <input type="range" class="ec-time gm-time-in" min="0" max="1000" step="1" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_kidneys_lab(lesson):
    """第十三課：真實腎臟、輸尿管、膀胱＋自繪血管與腎元（assets/js/kidneys.js 綁這裡的 class）；喝水紀錄是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    cups = "".join(f'<button type="button" class="kd2-cup" data-i="{i}" aria-pressed="false" aria-label="Cup {i + 1} · 第 {i + 1} 杯"><i></i></button>' for i in range(12))
    colors = [("#f7f3c4", "Almost clear", "幾乎透明"), ("#f3e27a", "Pale yellow", "淡黃色"), ("#e8c53a", "Yellow", "黃色"), ("#c98f1c", "Dark yellow", "深黃色")]
    sw = "".join(f'<button type="button" class="kd2-sw" data-c="{i}" aria-pressed="false" style="--c:{c}"><i></i><span>{en}<small>{zh}</small></span></button>' for i, (c, en, zh) in enumerate(colors))
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("blood", "Blood flow", "血流", True), ("skel", "Skeleton", "骨架", True)])
    return f'''<div class="astro-lab sk-lab kd2-lab rvl" data-kidneys-lab data-model="{_model_url()}" data-organs="{_organs_url()}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the real kidneys, ureters, and bladder, with blood flowing in and urine flowing out · 真實腎臟、輸尿管與膀胱的 3D 模型，血流進去、尿液流出來"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">1 second = 20 minutes · 1 秒＝20 分鐘</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The water tracker and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的喝水紀錄和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside kd2-aside">
      <p class="al-sky-k">Today so far · 今天到現在</p>
      <p class="gm-time kd2-clock"><b class="kd2-t">7:00</b><span>on the model&#8217;s clock<small>模型裡的時間</small></span></p>
      <dl class="ey-nums kd2-nums">
        <div><dt>Blood filtered · 過濾的血</dt><dd class="kd2-filt">0 L</dd></div>
        <div><dt>Urine made · 尿液</dt><dd class="kd2-urine">0 mL</dd></div>
        <div><dt>Bladder · 膀胱</dt><dd class="kd2-blad">0%</dd></div>
      </dl>
      <div class="kd2-bladder" aria-hidden="true"><i class="kd2-fill"></i><span class="kd2-bl-t"></span></div>
      <p class="ey-status kd2-status" aria-live="polite"></p>
      <div class="ey-more kd2-more">
        <button type="button" class="kd2-zoom" aria-pressed="false"><i aria-hidden="true">&#128300;</i><span>Zoom into a nephron<small>放大一顆腎元</small></span></button>
        <button type="button" class="kd2-go" disabled><i aria-hidden="true">&#128701;</i><span>Go to the restroom<small>去上廁所</small></span></button>
      </div>
    </aside>
  </div>
  <div class="kd2-strip">
    <div class="kd2-track">
      <p class="al-sky-k">My water today · 我今天喝的水</p>
      <div class="kd2-set">
        <label>My weight<small>我的體重</small><span><input type="number" class="kd2-kg" min="10" max="120" step="1" inputmode="numeric" placeholder="30"> kg</span></label>
        <label>My cup or bottle holds<small>我的杯子或水壺裝</small><span><input type="number" class="kd2-ml" min="50" max="1500" step="10" value="250" inputmode="numeric"> mL</span></label>
      </div>
      <div class="kd2-cups" role="group" aria-label="Cups I drank · 我喝了幾杯">{cups}</div>
      <div class="kd2-bar" aria-hidden="true"><i></i><b></b></div>
      <p class="kd2-total" aria-live="polite"></p>
    </div>
    <div class="kd2-color">
      <p class="al-sky-k">Color card · 尿液顏色卡</p>
      <div class="kd2-sws" role="group" aria-label="Urine color · 尿液顏色">{sw}</div>
      <p class="kd2-color-msg" aria-live="polite">Next time you go to the restroom, tap the color closest to what you see.<span class="zh">下次上廁所時，點最接近的顏色。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <label class="ec-slider kd2-water-row"><span class="ec-slider-k">Water you drank · 喝了多少水<em>very little · 很少 &harr; plenty · 很多</em></span>
      <input type="range" class="ec-time kd2-water" min="0" max="100" step="1" value="55"></label>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_taste_lab(lesson):
    """第十四課：剖開的真實頭骨＋真實舌頭，自繪味蕾、嗅覺區與兩條路（assets/js/taste.js 綁這裡的 class）；捏鼻子計分卡是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    foods_json = html.escape(json.dumps(lab["foods"], ensure_ascii=False))
    foods = "".join(
        f'<button type="button" data-food="{f["key"]}" aria-pressed="{"true" if n == 0 else "false"}"><i aria-hidden="true">{f["icon"]}</i>'
        f'<span>{html.escape(f["en"])}<small>{html.escape(f["zh"])}</small></span></button>'
        for n, f in enumerate(lab["foods"]))
    tastes = [("sweet", "Sweet", "甜"), ("sour", "Sour", "酸"), ("salty", "Salty", "鹹"), ("bitter", "Bitter", "苦"), ("umami", "Umami", "鮮")]
    bars = "".join(f'<div class="ts-bar ts-{k}"><span>{en}<small>{zh}</small></span><b><i></i></b></div>' for k, en, zh in tastes)
    def row(k, en, zh):
        return (f'<div class="ts-row" data-row="{k}"><p class="ts-row-k">{en}<small>{zh}</small></p>'
                f'<div class="ts-btns"><button type="button" class="ts-yes" data-add="1">&#10003; Right<small>猜對</small></button>'
                f'<button type="button" class="ts-no" data-add="0">&#10007; Wrong<small>猜錯</small></button></div>'
                f'<div class="ts-meter" aria-hidden="true"><i></i></div><p class="ts-score" aria-live="polite">0 / 0</p></div>')
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("skull", "Skull", "頭骨", True), ("face", "Face outline", "臉的輪廓", True)])
    return f'''<div class="astro-lab sk-lab ts-lab rvl" data-taste-lab data-model="{_model_url()}" data-organs="{_organs_url()}" data-foods="{foods_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a head cut down the middle, with the real tongue, taste buds, and the smell patch at the top of the nose · 從正中剖開的頭部 3D 模型，有真實的舌頭、味蕾與鼻腔頂端的嗅覺區"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Head cut down the middle, seen from the left · 頭從正中剖開，從左邊看</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The score card and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的計分卡和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside ts-aside">
      <p class="al-sky-k">The tongue says · 舌頭說</p>
      <div class="ts-bars">{bars}</div>
      <div class="ts-bar ts-painrow"><span>Pain and heat<small>痛和熱（不是味覺）</small></span><b><i></i></b></div>
      <p class="al-sky-k">The nose says · 鼻子說</p>
      <p class="ts-nose" aria-live="polite"></p>
      <p class="al-sky-k">The brain says · 大腦說</p>
      <p class="ey-status ts-status" aria-live="polite"></p>
      <div class="ey-more ts-more">
        <button type="button" class="ts-pinch" aria-pressed="false"><i aria-hidden="true">&#129295;</i><span>Pinch the nose<small>捏住鼻子</small></span></button>
        <button type="button" class="ts-bite"><i aria-hidden="true">&#128523;</i><span>Take another bite<small>再吃一口</small></span></button>
        <button type="button" class="ts-zb" aria-pressed="false"><i aria-hidden="true">&#128300;</i><span>Zoom: a taste bud<small>放大一個味蕾</small></span></button>
        <button type="button" class="ts-zs" aria-pressed="false"><i aria-hidden="true">&#128067;</i><span>Zoom: the smell patch<small>放大嗅覺區</small></span></button>
      </div>
    </aside>
  </div>
  <div class="ts-strip">
    <div class="ts-card">
      <p class="al-sky-k">Pinch-test score card · 捏鼻子試吃計分卡</p>
      {row("pinch", "1 &#129295; Nose pinched", "捏住鼻子")}
      {row("open", "2 &#128067; Nose open", "放開鼻子")}
      <div class="ts-tools"><button type="button" class="ts-undo" disabled>&#8630; Undo<small>復原上一筆</small></button><button type="button" class="ts-reset">Start over<small>重新開始</small></button></div>
    </div>
    <div class="ts-result">
      <p class="al-sky-k">What we found · 我們的發現</p>
      <p class="ts-big"><b class="ts-diff">—</b><span>right answers: nose pinched &rarr; nose open<small>猜對率：捏住鼻子 → 放開鼻子</small></span></p>
      <p class="ts-msg" aria-live="polite"></p>
      <p class="ts-note">Sit down, take small pieces, and chew well. Check for food allergies first.<span class="zh">坐好、小口吃、慢慢嚼；先確認有沒有人對食物過敏。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="ea-pres ts-foods" role="group" aria-label="Foods · 食物">{foods}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_sleep_lab(lesson):
    """第十五課：躺下的真實骨架＋自繪大腦，一整晚的睡眠階段（assets/js/sleep.js 綁這裡的 class）；睡眠計算機是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    stages_json = html.escape(json.dumps(lab["stages"], ensure_ascii=False))
    jumps = "".join(
        f'<button type="button" data-jump="{j["min"]}" aria-pressed="false"><i aria-hidden="true">{j["icon"]}</i>'
        f'<span>{html.escape(j["en"])}<small>{html.escape(j["zh"])}</small></span></button>' for j in lab["jumps"])
    meters = "".join(f'<div class="zz-m zz-m-{k}"><span>{en}<small>{zh}</small></span><b><i></i></b></div>'
                     for k, en, zh in [("tone", "Muscle tone", "肌肉張力"), ("gh", "Growth hormone", "生長激素"), ("mel", "Melatonin", "褪黑激素")])
    days = "".join(f'<button type="button" class="zz-day" aria-pressed="false" aria-label="{en} · 星期{zh}"><span class="zz-col"><i></i></span><b>+</b><small>{en[:3]}<br>{zh}</small></button>'
                   for en, zh in [("Monday", "一"), ("Tuesday", "二"), ("Wednesday", "三"), ("Thursday", "四"), ("Friday", "五"), ("Saturday", "六"), ("Sunday", "日")])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("skel", "Skeleton", "骨架", True), ("room", "Bedroom", "房間", True)])
    return f'''<div class="astro-lab sk-lab zz-lab rvl" data-sleep-lab data-model="{_model_url()}" data-stages="{stages_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a skeleton asleep in bed, with the brain, eyes, heart, and hormones changing through the night · 躺在床上睡覺的骨架 3D 模型，大腦、眼睛、心臟與激素隨著夜晚變化"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">1 second = 15 minutes · 1 秒＝15 分鐘</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The sleep calculator and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的睡眠計算機和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside zz-aside">
      <p class="gm-time zz-clock"><b class="zz-t">8:30 PM</b><span class="zz-stage"></span></p>
      <p class="al-sky-k">Brain waves · 腦波</p>
      <div class="zz-eegbox"><canvas class="zz-eeg" aria-hidden="true"></canvas></div>
      <p class="ey-status zz-status" aria-live="polite"></p>
      <div class="zz-meters">{meters}</div>
      <p class="al-sky-k">Sleep so far (h:mm) · 到現在睡了多久</p>
      <dl class="ey-nums zz-nums">
        <div><dt>Light · 淺睡</dt><dd class="zz-tl">0:00</dd></div>
        <div><dt>Deep · 深睡</dt><dd class="zz-td">0:00</dd></div>
        <div><dt>REM · 快速動眼</dt><dd class="zz-tr">0:00</dd></div>
      </dl>
      <div class="ey-more zz-more">{jumps}</div>
      <button type="button" class="zz-head" aria-pressed="false"><i aria-hidden="true">&#129504;</i><span>Look at the brain<small>靠近看大腦</small></span></button>
    </aside>
  </div>
  <div class="zz-strip">
    <div class="zz-calc">
      <p class="al-sky-k">Sleep calculator · 睡眠計算機</p>
      <div class="zz-set">
        <label>I fell asleep at<small>昨晚幾點睡著</small><input type="time" class="zz-bed" value="21:30"></label>
        <label>I woke up at<small>今天幾點起床</small><input type="time" class="zz-wake" value="06:30"></label>
        <p class="zz-out"><b class="zz-hours">—</b><span>of sleep<small>睡眠時間</small></span></p>
      </div>
      <p class="zz-msg" aria-live="polite"></p>
      <p class="zz-note">The 9 to 12 hours is the advice of the American Academy of Sleep Medicine for ages 6 to 12; teenagers need 8 to 10.<span class="zh">9 到 12 小時是美國睡眠醫學會對 6 到 12 歲孩子的建議；青少年需要 8 到 10 小時。</span></p>
    </div>
    <div class="zz-week">
      <p class="al-sky-k">My week · 我的一週</p>
      <div class="zz-days" role="group" aria-label="Days of the week · 一週七天">{days}<span class="zz-line" aria-hidden="true"><em>9 h</em></span></div>
      <p class="zz-avg" aria-live="polite"></p>
      <button type="button" class="zz-clear">Clear the week<small>清除這一週</small></button>
    </div>
  </div>
  <div class="al-controls">
    <div class="zz-hyp"><canvas aria-label="Sleep stages through the night; tap or drag to move in time · 一整晚的睡眠階段圖，點或拖曳可以移動時間"></canvas></div>
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="ec-slider zz-time-row"><span class="ec-slider-k">Time of night · 夜裡的時間<em>8:30 PM &rarr; 7:30 AM</em></span>
        <input type="range" class="ec-time zz-time" min="-30" max="630" step="1" value="-30"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_growth_lab(lesson):
    """第十六課：真實腿骨依年齡長大＋自繪生長板（assets/js/growth.js 綁這裡的 class）；早晚身高與臂展工具是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    notes_json = html.escape(json.dumps(lab["notes"], ensure_ascii=False))
    jumps = "".join(f'<button type="button" data-age="{a}" aria-pressed="{"true" if a == 2 else "false"}">{a}<small>歲</small></button>' for a in lab["jumps"])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("skel", "Skeleton and ruler", "骨架和尺", True)])
    return f'''<div class="astro-lab sk-lab gw-lab rvl" data-growth-lab data-model="{_model_url()}" data-notes="{notes_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a skeleton growing beside a ruler, and magnified leg bones with glowing growth plates · 站在尺旁邊長大的骨架，以及放大的腿骨與發亮的生長板"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Leg bones shown about 2&times; life size · 腿骨大約放大 2 倍</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The measuring tool and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的測量工具和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside gw-aside">
      <p class="gm-time gw-clock"><b class="gw-age">2</b><span>years old<small>歲（舉例的孩子）</small></span></p>
      <div class="gw-ages" role="group" aria-label="Jump to an age · 跳到某個年齡">{jumps}</div>
      <dl class="ey-nums gw-nums">
        <div><dt>Height · 身高</dt><dd class="gw-h">—</dd></div>
        <div><dt>Thighbone · 股骨</dt><dd class="gw-femur">—</dd></div>
        <div><dt>Growing per year · 一年長</dt><dd class="gw-speed">—</dd></div>
      </dl>
      <p class="al-sky-k">Inside a growth plate · 生長板裡面</p>
      <div class="gw-cellbox"><canvas class="gw-cells" aria-hidden="true"></canvas></div>
      <p class="ey-status gw-status" aria-live="polite"></p>
      <div class="ey-more gw-more">
        <button type="button" class="gw-xray" aria-pressed="false"><i aria-hidden="true">&#129460;</i><span>X-ray view<small>X 光畫面</small></span></button>
        <button type="button" class="gw-knee" aria-pressed="false"><i aria-hidden="true">&#128269;</i><span>Zoom to the knee<small>靠近看膝蓋</small></span></button>
      </div>
    </aside>
  </div>
  <div class="gw-strip">
    <div class="gw-tall">
      <p class="al-sky-k">Morning and evening · 早上和晚上</p>
      <div class="gw-set">
        <label>Morning height<small>早上的身高</small><span><input type="number" class="gw-am" min="50" max="230" step="0.1" inputmode="decimal" placeholder="132.4"> cm</span></label>
        <label>Evening height<small>晚上的身高</small><span><input type="number" class="gw-pm" min="50" max="230" step="0.1" inputmode="decimal" placeholder="131.2"> cm</span></label>
      </div>
      <div class="gw-compare" aria-hidden="true">
        <div class="gw-bar gw-bar-am"><i></i><span>&#9728;&#65039;</span></div>
        <div class="gw-bar gw-bar-pm"><i></i><span>&#127769;</span></div>
        <p class="gw-big"><b class="gw-diff">—</b><span>morning minus evening<small>早上減晚上</small></span></p>
      </div>
      <p class="gw-msg" aria-live="polite"></p>
    </div>
    <div class="gw-arm">
      <p class="al-sky-k">Arm span · 臂展</p>
      <div class="gw-set gw-set1">
        <label>Fingertip to fingertip<small>指尖到指尖</small><span><input type="number" class="gw-span" min="50" max="230" step="0.1" inputmode="decimal" placeholder="131"> cm</span></label>
        <p class="gw-big"><b class="gw-ratio">—</b><span>of your height<small>是身高的百分之幾</small></span></p>
      </div>
      <div class="gw-fig" aria-hidden="true"><i class="gw-fig-h"></i><i class="gw-fig-w"></i></div>
      <p class="gw-smsg" aria-live="polite"></p>
      <p class="gw-note">In one study of 100 children, the average child was about 1.5 cm shorter in the late afternoon than first thing in the morning.<span class="zh">有一項研究量了 100 個孩子：到了傍晚，平均比早上剛起床時矮大約 1.5 公分。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <label class="ec-slider gw-age-row"><span class="ec-slider-k">Age · 年齡<em>2 &rarr; 18 years · 2 歲到 18 歲</em></span>
        <input type="range" class="ec-time gw-slider" min="2" max="18" step="0.05" value="2"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_voice_lab(lesson):
    """第十七課：剖開的頭＋真實舌頭與氣管，自繪喉頭與聲帶（assets/js/voice.js 綁這裡的 class）；嗡嗡聲檢查與碼表是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    shapes_json = html.escape(json.dumps(lab["shapes"], ensure_ascii=False))
    shapes = "".join(
        f'<button type="button" data-shape="{s["key"]}" aria-pressed="{"true" if n == 0 else "false"}"><i aria-hidden="true">{s["icon"]}</i>'
        f'<span>{html.escape(s["en"])}<small>{html.escape(s["zh"])}</small></span></button>'
        for n, s in enumerate(lab["shapes"]))
    def row(k, voiced, label):
        return (f'<div class="vc-row" data-sound="{k}" data-voiced="{1 if voiced else 0}"><p class="vc-snd">{label}</p>'
                f'<div class="vc-btns"><button type="button" data-a="1" aria-pressed="false">&#128029; Buzz<small>有震動</small></button>'
                f'<button type="button" data-a="0" aria-pressed="false">&#128168; No buzz<small>沒有震動</small></button></div>'
                f'<p class="vc-fb" aria-live="polite"></p></div>')
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("skull", "Skull", "頭骨", True), ("face", "Face outline", "臉的輪廓", True)])
    return f'''<div class="astro-lab sk-lab vc-lab rvl" data-voice-lab data-model="{_model_url()}" data-organs="{_organs_url()}" data-shapes="{shapes_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a head and neck cut down the middle, with the real tongue and windpipe, the vocal folds, and air moving out through the mouth · 從正中剖開的頭頸 3D 模型，有真實的舌頭與氣管、聲帶，以及從嘴巴流出去的空氣"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Head cut down the middle, seen from the left · 頭從正中剖開，從左邊看</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The buzz check and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的嗡嗡聲檢查和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside vc-aside">
      <p class="al-sky-k">The model is saying · 模型正在說</p>
      <p class="vc-say" aria-live="polite">ah</p>
      <div class="vc-step vc-s1"><b>1</b><label class="ec-slider"><span class="ec-slider-k">Air · 空氣<em>soft &harr; loud · 小聲 &harr; 大聲</em></span>
        <input type="range" class="ec-time vc-loud" min="0" max="100" step="1" value="60"></label></div>
      <div class="vc-step vc-s2"><b>2</b><div class="vc-s2in">
        <button type="button" class="vc-voice" aria-pressed="true"><i aria-hidden="true">&#128029;</i><span>Voice: ON<small>聲音：開</small></span></button>
        <label class="ec-slider"><span class="ec-slider-k">Pitch · 音高 <strong class="vc-hz">—</strong><em>low &harr; high · 低 &harr; 高</em></span>
        <input type="range" class="ec-time vc-pitch" min="0" max="100" step="1" value="55"></label></div></div>
      <div class="vc-step vc-s3"><b>3</b><p class="vc-s3t">Shape: pick a mouth shape under the model<small>形狀：在模型下方選一個嘴型</small></p></div>
      <p class="ey-status vc-status" aria-live="polite"></p>
      <div class="ey-more vc-more">
        <button type="button" class="vc-listen" aria-pressed="false"><i aria-hidden="true">&#128266;</i><span>Listen (quiet)<small>聽聽看（小聲）</small></span></button>
        <button type="button" class="vc-zoom" aria-pressed="false"><i aria-hidden="true">&#128269;</i><span>Zoom: vocal folds<small>靠近看聲帶</small></span></button>
      </div>
    </aside>
  </div>
  <div class="vc-strip">
    <div class="vc-check">
      <p class="al-sky-k">Buzz check · 嗡嗡聲檢查</p>
      <p class="vc-how">Two fingers gently on your throat. Say each sound for three seconds.<span class="zh">兩根手指輕輕放在喉嚨上，每個音拉長三秒。</span></p>
      {row("s", False, "sss")}{row("z", True, "zzz")}{row("f", False, "fff")}{row("v", True, "vvv")}
      <p class="vc-score" aria-live="polite"><b>0 / 4</b><span class="zh">答對 0 個</span></p>
    </div>
    <div class="vc-breath">
      <p class="al-sky-k">One breath · 一口氣</p>
      <p class="vc-big"><b class="vc-sec">0.0 s</b><span>of “ahh”<small>說「啊——」的時間</small></span></p>
      <div class="vc-tools"><button type="button" class="vc-go" aria-pressed="false"><i aria-hidden="true">&#9201;</i><span>Start<small>開始</small></span></button>
        <button type="button" class="vc-clear">Clear<small>清除</small></button></div>
      <ol class="vc-tries"></ol>
      <p class="vc-best" aria-live="polite"></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="ea-pres vc-shapes" role="group" aria-label="Mouth shapes · 嘴型">{shapes}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_hands_lab(lesson):
    """第十八課：真實的右前臂與右手骨頭＋自繪肌腱與肌肉（assets/js/hands.js 綁這裡的 class）；拇指挑戰計時卡是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    poses_json = html.escape(json.dumps(lab["poses"], ensure_ascii=False))
    poses = "".join(
        f'<button type="button" data-pose="{p["key"]}" aria-pressed="{"true" if n == 0 else "false"}"><i aria-hidden="true">{p["icon"]}</i>'
        f'<span>{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></span></button>' for n, p in enumerate(lab["poses"]))
    fingers = "".join(
        f'<button type="button" data-finger="{f["key"]}" data-en="{html.escape(f["en"])}" data-zh="{html.escape(f["zh"])}" aria-pressed="false">{html.escape(f["en"])}<small>{html.escape(f["zh"])}</small></button>'
        for f in lab["fingers"])
    groups = "".join(f'<button type="button" data-group="{k}" aria-pressed="false"><b>{n}</b>{en}<small>{zh}</small></button>'
                     for k, n, en, zh in [("wrist", 8, "wrist", "手腕"), ("palm", 5, "palm", "手掌"), ("fingers", 14, "fingers", "手指")])
    def task(k, icon, en, zh):
        cell = lambda c, a, b: (f'<button type="button" class="hd-cell" data-task="{k}" data-cond="{c}" aria-pressed="false" aria-label="{en}: {a} · {zh}：{b}"><b>—</b></button>')
        return (f'<div class="hd-task" data-task="{k}" data-name="{en}" data-zh="{zh}"><p class="hd-name"><i aria-hidden="true">{icon}</i><span>{en}<small>{zh}</small></span></p>'
                f'{cell("with", "with thumb", "用大拇指")}{cell("without", "thumb taped", "貼住大拇指")}<p class="hd-x">—</p></div>')
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("tendons", "Tendons", "肌腱", True), ("muscles", "Muscles", "肌肉", True)])
    return f'''<div class="astro-lab sk-lab hd-lab rvl" data-hands-lab data-model="{_model_url()}" data-poses="{poses_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the real bones of a right hand and forearm, with tendons running from forearm muscles to the fingertips · 真實右手與前臂骨頭的 3D 模型，肌腱從前臂的肌肉一路連到指尖"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">A right hand, palm toward you · 右手，手掌朝著你</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The timer card and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的計時卡和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside hd-aside">
      <p class="al-sky-k">Count the bones · 數骨頭</p>
      <div class="hd-groups" role="group" aria-label="Bone groups · 骨頭分組">{groups}</div>
      <p class="hd-sum">8 + 5 + 14 = <b>27</b> bones in one hand<small>一隻手 27 塊骨頭；點上面的數字，看是哪幾塊</small></p>
      <p class="al-sky-k">Muscles at work · 正在用力的肌肉</p>
      <div class="hd-meters">
        <div class="hd-m hd-m-flex"><span>Bending<small>彎曲（掌側）</small></span><b><i></i></b></div>
        <div class="hd-m hd-m-ext"><span>Straightening<small>伸直（背側）</small></span><b><i></i></b></div>
      </div>
      <p class="ey-status hd-status" aria-live="polite"></p>
      <button type="button" class="hd-turn" aria-pressed="false"><i aria-hidden="true">&#128260;</i><span>Turn the hand over<small>把手翻過來</small></span></button>
    </aside>
  </div>
  <div class="hd-strip">
    <div class="hd-card">
      <p class="al-sky-k">Thumb challenge · 拇指挑戰</p>
      <div class="hd-head" aria-hidden="true"><span></span><span>&#128077; With thumb<small>用大拇指</small></span><span>&#129657; Thumb taped<small>貼住大拇指</small></span><span>Slower<small>慢幾倍</small></span></div>
      {task("write", "&#9999;&#65039;", "Write your name", "寫名字")}{task("coins", "&#129689;", "Pick up 5 coins", "撿 5 個硬幣")}{task("button", "&#128085;", "Button one button", "扣一顆鈕扣")}
      <button type="button" class="hd-clear">Clear<small>清除</small></button>
    </div>
    <div class="hd-result">
      <p class="al-sky-k">What we found · 我們的發現</p>
      <p class="hd-msg" aria-live="polite"></p>
      <p class="hd-note">Use paper tape, keep it loose, and take it off if anything hurts or tingles.<span class="zh">請用紙膠帶，貼鬆一點；會痛或覺得麻就馬上撕掉。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="ea-pres hd-poses" role="group" aria-label="Hand shapes · 手勢">{poses}</div>
    <div class="hd-pullrow"><p class="hd-pull-k">Pull one tendon · 拉一條肌腱</p><div class="hd-fingers" role="group" aria-label="Pull one tendon · 拉一條肌腱">{fingers}</div></div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_healing_lab(lesson):
    """第十九課：真實前臂的骨折癒合＋放大的皮膚割傷，同一條進度（assets/js/healing.js 綁這裡的 class）；癒合日記是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    stages_json = html.escape(json.dumps(lab["stages"], ensure_ascii=False))
    jumps = "".join(
        f'<button type="button" data-stage="{n}" aria-pressed="{"true" if n == 0 else "false"}"><i aria-hidden="true">{s["icon"]}</i>'
        f'<span>{n + 1} {html.escape(s["en"])}<small>{html.escape(s["zh"])}</small></span></button>' for n, s in enumerate(lab["stages"]))
    days = "".join(f'<button type="button" class="hl-day"><i></i><b>{n}</b></button>' for n in range(1, 15))
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("cast", "Cast", "石膏", True), ("hand", "Hand bones", "手的骨頭", True)])
    return f'''<div class="astro-lab sk-lab hl-lab rvl" data-healing-lab data-model="{_model_url()}" data-stages="{stages_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a real forearm with a healing break in one bone, beside a magnified block of skin with a healing cut · 真實前臂的 3D 模型，其中一根骨頭的骨折正在癒合，旁邊是一小塊放大的皮膚和正在癒合的割傷"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">Same four steps, two different clocks · 同樣四個步驟，兩個不同的時鐘</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The healing diary and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的癒合日記和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside hl-aside">
      <p class="hl-stage"><b class="hl-step">1</b><span class="hl-name"></span></p>
      <div class="hl-two">
        <div class="hl-col hl-col-s"><p class="hl-k">&#129656; Skin · 皮膚</p><p class="hl-clock hl-sc"></p><p class="hl-txt hl-st" aria-live="polite"></p></div>
        <div class="hl-col hl-col-b"><p class="hl-k">&#129460; Bone · 骨頭</p><p class="hl-clock hl-bc"></p><p class="hl-txt hl-bt" aria-live="polite"></p></div>
      </div>
    </aside>
  </div>
  <div class="hl-strip">
    <div class="hl-bruise">
      <p class="al-sky-k">Bruise diary · 瘀青日記</p>
      <div class="hl-days" role="group" aria-label="Bruise color day by day · 每天的瘀青顏色">{days}</div>
      <p class="hl-bmsg" aria-live="polite"></p>
      <button type="button" class="hl-bclear">Clear the diary<small>清除日記</small></button>
    </div>
    <div class="hl-nail">
      <p class="al-sky-k">How fast is my nail? · 我的指甲長多快？</p>
      <div class="hl-set">
        <label>First time<small>第一次量</small><span><input type="number" class="hl-n1" min="0" max="20" step="0.5" inputmode="decimal" placeholder="0"> mm</span></label>
        <label>Second time<small>第二次量</small><span><input type="number" class="hl-n2" min="0" max="25" step="0.5" inputmode="decimal" placeholder="2.5"> mm</span></label>
        <label>Days between<small>隔了幾天</small><span><input type="number" class="hl-nd" min="1" max="120" step="1" inputmode="numeric" placeholder="21"></span></label>
      </div>
      <p class="hl-big"><b class="hl-nout">—</b><span>a month<small>每個月</small></span></p>
      <p class="hl-nmsg" aria-live="polite"></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="ea-pres hl-jumps" role="group" aria-label="The four steps · 四個步驟">{jumps}</div>
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <label class="ec-slider hl-row"><span class="ec-slider-k">Healing · 癒合的進度<em>stop the leak &rarr; rebuild · 止血 &rarr; 重建</em></span>
        <input type="range" class="ec-time hl-slider" min="0" max="400" step="1" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_exercise_lab(lesson):
    """第二十課：會跑步的真實骨架＋自繪心肺、腿部肌肉與血流（assets/js/exercise.js 綁這裡的 class）；脈搏卡是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    paces_json = html.escape(json.dumps(lab["paces"], ensure_ascii=False))
    paces = "".join(
        f'<button type="button" data-pace="{p["key"]}" aria-pressed="{"true" if n == 0 else "false"}"><i aria-hidden="true">{p["icon"]}</i>'
        f'<span>{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></span></button>' for n, p in enumerate(lab["paces"]))
    def cell(icon, en, zh):
        return (f'<div class="ex-cell"><p class="ex-k"><i aria-hidden="true">{icon}</i>{en}<small>{zh}</small></p>'
                f'<label><input type="number" class="ex-in" min="5" max="60" step="1" inputmode="numeric" placeholder="—"><span>beats in 15 s<small>15 秒跳幾下</small></span></label>'
                f'<div class="ex-bar" aria-hidden="true"><i></i></div><p class="ex-out"><b class="ex-bpm">—</b><span>a minute<small>每分鐘</small></span></p></div>')
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("muscles", "Leg muscles", "腿部肌肉", True), ("blood", "Blood", "血流", True)])
    return f'''<div class="astro-lab sk-lab ex-lab rvl" data-exercise-lab data-model="{_model_url()}" data-paces="{paces_json}" data-rec-en="{html.escape(lab["recover_en"])}" data-rec-zh="{html.escape(lab["recover_zh"])}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a real skeleton running in place, with a beating heart, breathing lungs, leg muscles, and blood flowing to the legs · 真實骨架原地跑步的 3D 模型，有跳動的心臟、呼吸的肺、腿部肌肉，以及流向腿部的血液"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">An example child of about ten · 以大約十歲的孩子舉例</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The pulse card and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的脈搏卡和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside ex-aside">
      <div class="ex-two">
        <p class="ex-big ex-big-h"><b class="ex-hr">82</b><span>&#10084;&#65039; beats a minute<small>心跳（每分鐘）</small></span></p>
        <p class="ex-big ex-big-b"><b class="ex-br">18</b><span>&#129729; breaths a minute<small>呼吸（每分鐘）</small></span></p>
      </div>
      <p class="al-sky-k">The last minute · 最近一分鐘</p>
      <div class="ex-tracebox"><canvas class="ex-trace" aria-hidden="true"></canvas></div>
      <p class="ex-key"><i class="ex-key-h"></i>Heartbeat · 心跳　<i class="ex-key-b"></i>Breathing · 呼吸</p>
      <div class="ex-heat"><span>Body heat and sweat<small>體溫與流汗</small></span><b><i></i></b></div>
      <p class="ey-status ex-status" aria-live="polite"></p>
    </aside>
  </div>
  <div class="ex-strip">
    <div class="ex-card">
      <p class="al-sky-k">My pulse · 我的脈搏</p>
      <div class="ex-cells">{cell("&#129485;", "At rest", "休息時")}{cell("&#129336;", "Right after", "剛運動完")}{cell("&#9201;", "2 minutes later", "兩分鐘後")}</div>
    </div>
    <div class="ex-side">
      <p class="al-sky-k">15-second timer · 15 秒計時</p>
      <button type="button" class="ex-timer" aria-pressed="false"><b class="ex-count">15</b><span>Start 15 seconds<small>開始計時 15 秒</small></span></button>
      <p class="ex-msg" aria-live="polite"></p>
      <button type="button" class="ex-clear">Clear<small>清除</small></button>
    </div>
  </div>
  <div class="al-controls">
    <div class="ea-pres ex-paces" role="group" aria-label="Pace · 速度">{paces}</div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="sk-credit">{lab["credit_html"]}</p>
</div>'''

def render_energy_lab(lesson):
    """第二十一課：真實的食道、胃、十二指腸＋自繪肝臟、胰臟、小腸與血流，跟著糖走（assets/js/energy.js 綁這裡的 class）；餐盤工具是 2D，不需要 WebGL。"""
    lab = lesson["lab"]
    meals_json = html.escape(json.dumps(lab["meals"], ensure_ascii=False))
    notes_json = html.escape(json.dumps(lab["notes"], ensure_ascii=False))
    groups_json = html.escape(json.dumps(lab["groups"], ensure_ascii=False))
    meals = "".join(
        f'<button type="button" data-meal="{m["key"]}" aria-pressed="{"true" if n == 0 else "false"}"><i aria-hidden="true">{m["icon"]}</i>'
        f'<span>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></span></button>' for n, m in enumerate(lab["meals"]))
    def bar(cls, en, zh):
        return f'<div class="fu-bar fu-bar-{cls}"><span>{en}<small>{zh}</small></span><b><i></i></b></div>'
    head = "".join(f'<span class="fu-th">{en}<small>{zh}</small></span>' for en, zh in [("Breakfast", "早餐"), ("Lunch", "午餐"), ("Dinner", "晚餐")])
    rows = "".join(
        f'<div class="fu-g" data-g="{g["key"]}"><p class="fu-gk"><i aria-hidden="true">{g["icon"]}</i><span>{html.escape(g["en"])}<small>{html.escape(g["zh"])}</small></span>'
        f'<em>{html.escape(g["eg_en"])}<small>{html.escape(g["eg_zh"])}</small></em></p>'
        + "".join(f'<button type="button" class="fu-tick" data-m="{m}" aria-pressed="false" aria-label="{html.escape(g["en"])}, {mn} · {html.escape(g["zh"])}，{mz}"></button>'
                  for m, mn, mz in [(0, "breakfast", "早餐"), (1, "lunch", "午餐"), (2, "dinner", "晚餐")])
        + '</div>' for g in lab["groups"])
    chips = "".join(f'<span class="fu-chip" data-g="{g["key"]}"><i aria-hidden="true">{g["icon"]}</i>{html.escape(g["zh"])}</span>' for g in lab["groups"])
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("skel", "Bones", "骨頭", True), ("compare", "Compare the lines", "比較三條曲線", True)])
    return f'''<div class="astro-lab sk-lab fu-lab rvl" data-energy-lab data-model="{_model_url()}" data-organs="{_organs_url()}" data-meals="{meals_json}" data-notes="{notes_json}" data-groups="{groups_json}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a real stomach and esophagus inside a faint skeleton, with a drawn liver, pancreas, and small intestine, and dots of sugar traveling in the blood to the brain and a leg muscle · 淡淡的骨架裡有真實的胃和食道，加上自繪的肝臟、胰臟和小腸，一顆顆的糖隨著血液送到大腦和腿部肌肉的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="sk-loading">Loading… · 載入中…<span class="sk-bar"><i></i></span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <p class="ey-mag">A drawing of the usual pattern, not a measurement · 畫的是常見的樣子，不是實際測量</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The plate tool and the cards below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的餐盤工具和卡片一樣能用。</span></p>
    </div>
    <aside class="al-sky sk-aside fu-aside">
      <p class="fu-clock"><b class="fu-t">7:00</b><span class="fu-since">Breakfast time<small>早餐時間</small></span></p>
      <p class="al-sky-k">Sugar in the blood · 血液裡的糖</p>
      <div class="fu-chartbox"><canvas class="fu-chart" aria-hidden="true"></canvas></div>
      <p class="fu-key"><i></i>Usual level · 平常的高度</p>
      {bar("ins", "Insulin", "胰島素")}{bar("store", "Sugar stored in the liver", "肝臟裡存的糖")}{bar("stom", "Food left in the stomach", "胃裡還剩的食物")}
      <p class="ey-status fu-status" aria-live="polite"></p>
    </aside>
  </div>
  <div class="fu-strip">
    <div class="fu-plate">
      <p class="al-sky-k">My plate today · 今天我的餐盤</p>
      <div class="fu-grid"><div class="fu-g fu-head"><span></span>{head}</div>{rows}</div>
    </div>
    <div class="fu-side">
      <p class="al-sky-k">Six food groups · 六大類食物</p>
      <div class="fu-chips">{chips}</div>
      <p class="fu-big"><b class="fu-n">0</b><span>of 6 groups so far<small>目前吃到的類別（共 6 類）</small></span></p>
      <p class="fu-msg" aria-live="polite"></p>
      <button type="button" class="fu-clear">Start a new day<small>重新開始一天</small></button>
      <p class="fu-note">Some people do not eat every group, because of an allergy or their family's way of eating. Other foods can fill the gap: ask an adult.<span class="zh">有些人因為過敏或家裡的飲食習慣，不是每一類都吃；可以用別的食物補上，請問問大人。</span></p>
    </div>
  </div>
  <div class="al-controls">
    <div class="ea-pres fu-meals" role="group" aria-label="Breakfast · 早餐">{meals}</div>
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Play · 播放</span></button>
      <label class="ec-slider fu-row"><span class="ec-slider-k">Time since breakfast · 早餐後過了多久<em>0 &rarr; 5 hours · 0 &rarr; 5 小時</em></span>
        <input type="range" class="ec-time fu-slider" min="0" max="500" step="1" value="0"></label>
    </div>
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
                "eyes": render_eyes_lab, "ears": render_ears_lab, "skin": render_skin_lab,
                "teeth": render_teeth_lab, "germs": render_germs_lab, "kidneys": render_kidneys_lab,
                "taste": render_taste_lab, "sleep": render_sleep_lab, "growth": render_growth_lab, "voice": render_voice_lab, "hands": render_hands_lab, "healing": render_healing_lab, "exercise": render_exercise_lab, "energy": render_energy_lab}[kind](lesson)

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
                "eyes": ("Your eyes in a sentence", "一句話記住眼睛"), "ears": ("Your ears in a sentence", "一句話記住耳朵"),
                "skin": ("Your skin in a sentence", "一句話記住皮膚"), "teeth": ("Your teeth in a sentence", "一句話記住牙齒"),
                "germs": ("Fighting germs in a sentence", "一句話記住免疫"),
                "kidneys": ("Your kidneys in a sentence", "一句話記住腎臟"),
                "taste": ("Taste and smell in a sentence", "一句話記住味覺和嗅覺"),
                "sleep": ("Sleep in a sentence", "一句話記住睡眠"),
                "growth": ("Growing taller in a sentence", "一句話記住長高"),
                "voice": ("Your voice in a sentence", "一句話記住聲音"),
                "hands": ("Your hands in a sentence", "一句話記住手"),
                "healing": ("Healing in a sentence", "一句話記住癒合"),
                "exercise": ("Exercise in a sentence", "一句話記住運動"),
                "energy": ("Energy in a sentence", "一句話記住能量")}[kind]
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
_HTW_JS = {"battery": "battery", "generator": "generator", "solar": "solar-cell", "wind": "wind-turbine", "internet": "internet-packets", "signal": "cell-signal", "gps": "gps-satellites", "memory": "memory-bits", "sky": "sky-scatter", "rainbow": "rainbow-drops", "sound": "sound-waves", "camera": "camera-lens", "wing": "airplane-wing", "bike": "bicycle-balance", "elevator": "elevator-lift", "fridge": "fridge-cycle", "soap": "soap-micelle", "bread": "bread-rise", "rust": "iron-rust", "microwave": "microwave-oven"}   # lab.kind → assets/js/<bundle>.js

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

def cameralens_svg(size=56):
    """相機小圖（萬物原理首頁的課程卡）：相機機身、鏡頭，與一小塊紅綠藍像素格。"""
    cells = "".join(f'<rect x="{38 + (i % 3) * 5}" y="{8 + (i // 3) * 5}" width="4.4" height="4.4" fill="{c}"/>' for i, c in enumerate(("#ff5a4a", "#5ed36a", "#ff5a4a", "#5ed36a", "#4a8bff", "#5ed36a", "#ff5a4a", "#5ed36a", "#ff5a4a")))
    return (f'<svg class="cameralens-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="6" y="22" width="44" height="28" rx="5" fill="#2b3446" stroke="#8aa0c8" stroke-width="1.6"/>'
            '<rect x="14" y="17" width="12" height="7" rx="2" fill="#2b3446" stroke="#8aa0c8" stroke-width="1.6"/>'
            '<circle cx="28" cy="36" r="10" fill="#9fd4ff" stroke="#cfd4dc" stroke-width="2.4"/><circle cx="28" cy="36" r="4" fill="#1b2333"/>'
            f'{cells}</svg>')

def render_cameralens_lab(lesson):
    """第十二課：相機剖面與像素（assets/js/camera-lens.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("raw", "Color filters", "濾色片", False), ("pinhole", "No lens (pinhole)", "沒有鏡頭（針孔）", False)])
    return f'''<div class="astro-lab bt-lab cm-lab rvl" data-cameralens-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a camera cut open, with light rays from a scene crossing to make an upside-down picture on the sensor · 剖開的相機 3D 模型：景物的光線交叉，在感光元件上形成顛倒的影像"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A diagram: the camera is cut open, and the pixels are drawn huge · 示意圖：相機剖開，像素畫得很大</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside cm-aside">
      <div class="cm-top">
        <p class="al-sky-k">The photo · 拍到的照片</p>
        <div class="cm-photobox"><canvas class="cm-photo" aria-label="The photo the camera makes · 相機拍出的照片"></canvas></div>
        <label class="al-slider cm-pix-row"><span>Pixels · 像素 <output class="cm-pix-out"></output></span>
          <input type="range" class="al-age cm-pix" min="8" max="96" step="4" value="64"></label>
        <p class="cm-count"></p>
        <dl class="bt-nums cm-nums">
          <div><dt>Focus · 對焦</dt><dd class="cm-focus"></dd></div>
          <div><dt>Light let in · 進光量</dt><dd class="cm-light"></dd></div>
          <div><dt>On the sensor · 感光元件上</dt><dd class="cm-flip"></dd></div>
        </dl>
      </div>
      <p class="bt-msg cm-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider cm-s-row"><span>Focus · 對焦 <output class="cm-s-out"></output></span>
        <input type="range" class="al-age cm-s" min="3.2" max="5.4" step="0.01" value="4.08"></label>
      <label class="al-slider cm-ap-row"><span>Opening · 光圈 <output class="cm-ap-out"></output></span>
        <input type="range" class="al-age cm-ap" min="0.04" max="2.4" step="0.01" value="1.2"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def airwing_svg(size=56):
    """飛機小圖（萬物原理首頁的課程卡）：機翼剖面、上方較快的氣流與往下轉的氣流、向上的升力箭頭。"""
    return (f'<svg class="airwing-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<g fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 22 C20 14 36 16 56 30" stroke="#ff9a3c"/><path d="M4 40 C22 38 38 40 56 48" stroke="#2f6bff"/></g>'
            '<path d="M12 32 C18 22 34 22 50 34 C36 33 22 34 12 32z" fill="#d8dee8"/>'
            '<path d="M30 26 V8" stroke="#3ad17a" stroke-width="3"/><path d="M24 13 L30 5 L36 13z" fill="#3ad17a"/></svg>')

def render_airwing_lab(lesson):
    """第十三課：風洞裡的機翼（assets/js/airplane-wing.js 綁這裡的 class；氣流用位勢流計算）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("forces", "Force arrows", "力的箭頭", True), ("streams", "Flow lines", "流線", True)])
    return f'''<div class="astro-lab bt-lab aw-lab rvl" data-airwing-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D wind tunnel with air flowing over a wing and being turned downward · 3D 風洞：空氣流過機翼、被往下轉"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A wind tunnel view: the wing stays still and the air moves; air slowed down for viewing · 風洞視角：機翼不動、空氣在動；氣流放慢了</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside aw-aside">
      <div class="aw-top">
        <p class="al-sky-k">The model plane · 模型飛機</p>
        <p class="aw-status" aria-live="polite"></p>
        <div class="aw-meter"><span class="aw-meter-k">Lift vs. weight · 升力和重量比</span><div class="aw-bar"><i></i><b aria-hidden="true"></b></div><span class="aw-meter-s"><em>0</em><em>= weight · 等於重量</em><em>2×</em></span></div>
        <dl class="bt-nums aw-nums">
          <div><dt>Lift ÷ weight · 升力÷重量</dt><dd class="aw-ratio"></dd></div>
          <div><dt>Lift coefficient · 升力係數</dt><dd class="aw-cl"></dd></div>
        </dl>
        <button type="button" class="aw-smoke">&#128168; Release a line of smoke<small>放一排煙</small></button>
      </div>
      <p class="bt-msg aw-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider aw-a-row"><span>Wing angle · 機翼角度 <output class="aw-a-out"></output></span>
        <input type="range" class="al-age aw-a" min="-4" max="22" step="0.5" value="8"></label>
      <label class="al-slider aw-v-row"><span>Speed · 速度 <output class="aw-v-out"></output></span>
        <input type="range" class="al-age aw-v" min="0" max="320" step="5" value="250"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def bicycle_svg(size=56):
    """腳踏車小圖（萬物原理首頁的課程卡）：一台微微傾斜的腳踏車，前輪轉向、地上有彎彎的輪胎痕跡。"""
    return (f'<svg class="bicycle-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M6 54 C20 50 34 56 54 50" fill="none" stroke="#ffd36e" stroke-width="1.6" stroke-dasharray="3 3"/>'
            '<g transform="rotate(-6 30 46)" fill="none" stroke-linecap="round">'
            '<circle cx="15" cy="38" r="10" stroke="#cfd4dc" stroke-width="2.4"/><circle cx="45" cy="38" r="10" stroke="#cfd4dc" stroke-width="2.4"/>'
            '<path d="M15 38 L26 22 L40 22 L45 38 M26 22 L30 38 L15 38 M30 38 L40 22" stroke="#e04a3a" stroke-width="2.6" stroke-linejoin="round"/>'
            '<path d="M38 16 h7 M22 18 h8" stroke="#1b1f28" stroke-width="2.6"/></g></svg>')

def render_bicycle_lab(lesson):
    """第十四課：沒有人騎的腳踏車（assets/js/bicycle-balance.js 綁這裡的 class；簡化的平衡模型）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("tracks", "Tire tracks", "輪胎痕跡", True), ("lock", "Lock the front wheel", "鎖住前輪", False)])
    return f'''<div class="astro-lab bt-lab bk-lab rvl" data-bicycle-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a riderless bicycle rolling, leaning, and steering itself upright · 沒有人騎的腳踏車往前滾、傾斜、自己轉向站直的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A riderless bike, pushed and let go; a simplified model of how it balances · 沒有人騎、推出去放手的腳踏車；簡化的平衡模型</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside bk-aside">
      <div class="bk-top">
        <p class="al-sky-k">The bike · 這台腳踏車</p>
        <p class="bk-status" aria-live="polite"></p>
        <div class="bk-btns">
          <button type="button" class="bk-push">&#128400; Push it sideways<small>從旁邊推一下</small></button>
          <button type="button" class="bk-up">Stand it up<small>扶起來</small></button>
        </div>
        <dl class="bt-nums bk-nums">
          <div><dt>Lean · 傾斜</dt><dd class="bk-lean"></dd></div>
          <div><dt>Front wheel turned · 前輪轉了</dt><dd class="bk-steer"></dd></div>
          <div><dt>Needs at least (model) · 至少要多快</dt><dd class="bk-need"></dd></div>
        </dl>
      </div>
      <p class="bt-msg bk-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider bk-v-row"><span>Speed · 速度 <output class="bk-v-out"></output></span>
        <input type="range" class="al-age bk-v" min="0" max="30" step="1" value="18"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def elevator_svg(size=56):
    """電梯小圖（萬物原理首頁的課程卡）：頂樓的曳引輪，鋼索一頭掛車廂、一頭掛平衡錘。"""
    return (f'<svg class="elevator-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="8" y="4" width="44" height="54" rx="3" fill="#1b2740" stroke="#6f86c0" stroke-width="1.5"/>'
            '<circle cx="32" cy="12" r="6" fill="none" stroke="#d8c27a" stroke-width="2.4"/>'
            '<path d="M26 12 V30 M38 12 V20" stroke="#e8ecf4" stroke-width="1.6"/>'
            '<rect x="14" y="30" width="24" height="20" rx="2" fill="#cfd8ea" stroke="#fff" stroke-width="1.4"/>'
            '<path d="M26 30 V50" stroke="#8a96ad" stroke-width="1.2"/>'
            '<rect x="42" y="20" width="6" height="16" rx="1" fill="#70798c" stroke="#cfd8ea" stroke-width="1"/></svg>')

def render_elevator_lab(lesson):
    """第十五課：電梯井裡的車廂與平衡錘（assets/js/elevator-lift.js 綁這裡的 class；重量是示意）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("cw", "Counterweight", "平衡錘", True)])
    return f'''<div class="astro-lab bt-lab ev-lab rvl" data-elevator-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of an elevator shaft: the car on one end of the cables, a counterweight on the other, and the drive wheel on top · 電梯井的 3D 模型：鋼索一頭是車廂、一頭是平衡錘，頂樓是曳引輪"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">Elevator shaft with the front wall removed; floors drawn shorter than real · 拿掉前牆的電梯井；樓層畫得比真的矮</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside ev-aside">
      <div class="ev-top">
        <p class="al-sky-k">What the motor must hold · 馬達要撐住多少</p>
        <p class="ev-status" aria-live="polite"></p>
        <dl class="bt-nums ev-nums">
          <div><dt>Car + riders · 車廂＋乘客</dt><dd class="ev-carkg"></dd></div>
          <div><dt>Counterweight · 平衡錘</dt><dd class="ev-cwkg"></dd></div>
          <div><dt>Motor holds · 馬達撐住</dt><dd class="ev-hold"></dd></div>
        </dl>
        <div class="ev-bars">
          <p class="ev-bar ev-bar-a"><span>With counterweight · 有平衡錘</span><i></i><b class="ev-val-a"></b></p>
          <p class="ev-bar ev-bar-b"><span>Without · 沒有平衡錘</span><i></i><b class="ev-val-b"></b></p>
        </div>
        <div class="ev-btns">
          <button type="button" class="ev-cut">&#9986; Cut all the cables<small>把鋼索全部剪斷</small></button>
          <button type="button" class="ev-fix">Repair<small>修好</small></button>
        </div>
      </div>
      <p class="bt-msg ev-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider ev-row"><span>Riders · 乘客 <output class="ev-people-out"></output></span>
        <input type="range" class="al-age ev-people" min="0" max="12" step="1" value="6"></label>
      <label class="al-slider ev-row"><span>Go to floor · 到幾樓 <output class="ev-floor-out"></output></span>
        <input type="range" class="al-age ev-floor" min="1" max="8" step="1" value="1"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def fridge_svg(size=56):
    """冰箱小圖（萬物原理首頁的課程卡）：冰箱裡是藍色的冷、背後的散熱管是紅色的熱。"""
    return (f'<svg class="fridge-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="12" y="5" width="28" height="50" rx="4" fill="#e8edf5" stroke="#8a96ad" stroke-width="1.6"/>'
            '<rect x="15" y="8" width="22" height="14" rx="2" fill="#9fd4ff"/><rect x="15" y="25" width="22" height="27" rx="2" fill="#cfe9ff"/>'
            '<path d="M12 23.5 H40" stroke="#8a96ad" stroke-width="1.4"/><path d="M34 12 v6 M34 30 v9" stroke="#6b7385" stroke-width="2" stroke-linecap="round"/>'
            '<path d="M44 12 h6 v6 h-6 v6 h6 v6 h-6 v6 h6 v6 h-6" fill="none" stroke="#ff5a2a" stroke-width="2" stroke-linejoin="round"/>'
            '<path d="M53 10 q3 -3 0 -6 M56 20 q3 -3 0 -6" fill="none" stroke="#ffb347" stroke-width="1.4" stroke-linecap="round"/></svg>')

def render_fridge_lab(lesson):
    """第十六課：透明冰箱與冷媒的一圈（assets/js/fridge-cycle.js 綁這裡的 class；溫度是簡化模型）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("heat", "Heat", "熱", True), ("plug", "Plugged in", "插著電", True)])
    return f'''<div class="astro-lab bt-lab fr-lab rvl" data-fridge-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a see-through refrigerator: refrigerant circles from the compressor to the coil on the back, through a thin tube, into the cold coil inside, and back · 透明冰箱的 3D 模型：冷媒從壓縮機到背後的散熱管，經過細管進到裡面的蒸發器，再回到壓縮機"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A see-through refrigerator, seen from behind; tubes drawn thicker and fewer than real · 從後面看的透明冰箱；管子畫得比真的粗、比真的少</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside fr-aside">
      <div class="fr-top">
        <p class="al-sky-k">Where the heat goes · 熱往哪裡去</p>
        <p class="fr-status" aria-live="polite"></p>
        <dl class="bt-nums fr-nums">
          <div><dt>Inside · 冰箱裡</dt><dd class="fr-tin"></dd></div>
          <div><dt>Kitchen · 廚房</dt><dd class="fr-tout"></dd></div>
          <div><dt>Compressor · 壓縮機</dt><dd class="fr-comp"></dd></div>
        </dl>
        <div class="fr-bars">
          <p class="fr-bar fr-bar-in"><span>Heat taken from inside · 從裡面搬走的熱</span><i></i><b></b></p>
          <p class="fr-bar fr-bar-el"><span>+ Electricity used · ＋用掉的電</span><i></i><b></b></p>
          <p class="fr-bar fr-bar-out"><span>= Heat sent to the kitchen · ＝送到廚房的熱</span><i></i><b></b></p>
        </div>
        <div class="fr-btns">
          <button type="button" class="fr-door"></button>
        </div>
      </div>
      <p class="bt-msg fr-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider fr-row"><span>Kitchen temperature · 廚房的溫度 <output class="fr-room-out"></output></span>
        <input type="range" class="al-age fr-room" min="18" max="36" step="1" value="28"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def soap_svg(size=56):
    """肥皂小圖（萬物原理首頁的課程卡）：一顆被肥皂分子包住的油滴——藍色的頭朝外、黃色的尾巴朝裡。"""
    import math
    mol = "".join(
        f'<path d="M{30 + 9 * math.cos(a):.1f} {30 + 9 * math.sin(a):.1f} L{30 + 19 * math.cos(a):.1f} {30 + 19 * math.sin(a):.1f}" stroke="#ffd84a" stroke-width="2.2" stroke-linecap="round"/>'
        f'<circle cx="{30 + 22 * math.cos(a):.1f}" cy="{30 + 22 * math.sin(a):.1f}" r="4" fill="#3f9bff"/>'
        for a in [i * math.pi / 5 for i in range(10)])
    return (f'<svg class="soap-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<circle cx="30" cy="30" r="9" fill="#d9a514"/>{mol}</svg>')

def render_soap_lab(lesson):
    """第十七課：放大的油污與肥皂分子（assets/js/soap-micelle.js 綁這裡的 class；數字是示意模型）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab bt-lab sp-lab rvl" data-soap-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D close-up of a patch of grease on skin: soap molecules push their tails into the grease, rubbing breaks it into drops, and water carries the wrapped drops away · 皮膚上一塊油污的 3D 放大圖：肥皂分子把尾巴插進油污，搓洗把它拆成小油滴，水把包好的油滴帶走"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A greatly magnified view; the molecules are drawn far bigger and far fewer than real · 放大很多倍的示意圖；分子畫得比真的大非常多、也少非常多</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside sp-aside">
      <div class="sp-top">
        <p class="al-sky-k">How are you washing? · 你怎麼洗？</p>
        <div class="sp-modes">
          <button type="button" class="sp-mode" data-mode="water" aria-pressed="false">Water only<small>只用水</small></button>
          <button type="button" class="sp-mode" data-mode="soap" aria-pressed="false">Soap, no rubbing<small>加肥皂、不搓</small></button>
          <button type="button" class="sp-mode" data-mode="scrub" aria-pressed="true">Soap + rubbing<small>加肥皂又搓洗</small></button>
        </div>
        <p class="sp-status" aria-live="polite"></p>
        <dl class="bt-nums sp-nums">
          <div><dt>Grease left · 還剩的油污</dt><dd class="sp-left"></dd></div>
          <div><dt>Oil drops carried away · 被帶走的油滴</dt><dd class="sp-away"></dd></div>
        </dl>
        <div class="sp-bars">
          <p class="sp-bars-k">Grease left at this moment · 這個時候還剩多少</p>
          <p class="sp-bar sp-bar-water"><span>Water only · 只用水</span><i></i><b></b></p>
          <p class="sp-bar sp-bar-soap"><span>Soap, no rubbing · 加肥皂、不搓</span><i></i><b></b></p>
          <p class="sp-bar sp-bar-scrub"><span>Soap + rubbing · 加肥皂又搓洗</span><i></i><b></b></p>
        </div>
      </div>
      <p class="bt-msg sp-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider sp-row"><span>Washing time · 洗了多久 <output class="sp-time-out"></output></span>
        <input type="range" class="al-age sp-time" min="0" max="30" step="0.5" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def bread_svg(size=56):
    """麵包小圖（萬物原理首頁的課程卡）：切開的麵糰，裡面是一個個氣泡。"""
    holes = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#a98a5c"/>' for x, y, r in
                    [(18, 40, 4), (28, 30, 5.5), (40, 38, 4.5), (33, 43, 3), (22, 29, 3), (44, 28, 3.5), (36, 21, 3.5), (13, 34, 2.5)])
    return (f'<svg class="bread-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M5 50 C5 22 18 10 30 10 C42 10 55 22 55 50 Z" fill="#f4e4bf" stroke="#b4722a" stroke-width="3" stroke-linejoin="round"/>'
            f'{holes}<path d="M3 51 H57" stroke="#9c6b3f" stroke-width="3" stroke-linecap="round"/></svg>')

def render_bread_lab(lesson):
    """第十八課：剖開的麵糰（assets/js/bread-rise.js 綁這裡的 class；數字是示意模型）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("yeast", "Yeast in the dough", "麵糰裡有酵母", True)])
    return f'''<div class="astro-lab bt-lab br-lab rvl" data-bread-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a ball of dough cut in half: yeast gives off gas, bubbles grow, and the dough rises · 切開一半的麵糰 3D 模型：酵母吐出氣體，氣泡變大，麵糰長高"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A ball of dough cut in half; yeast and bubbles drawn far bigger and far fewer than real · 切開一半的麵糰；酵母和氣泡畫得比真的大非常多、也少非常多</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside br-aside">
      <div class="br-top">
        <p class="al-sky-k">The dough · 這塊麵糰</p>
        <p class="br-status" aria-live="polite"></p>
        <dl class="bt-nums br-nums">
          <div><dt>Size · 大小</dt><dd class="br-size"></dd></div>
          <div><dt>Gas being made · 產生氣體</dt><dd class="br-speed"></dd></div>
        </dl>
        <div class="br-bars">
          <p class="br-bars-k">How much bigger by now? · 到現在長大了多少？</p>
          <p class="br-bar br-bar-warm"><span>Warm place (35°C) · 溫暖的地方</span><i></i><b></b></p>
          <p class="br-bar br-bar-cold"><span>Refrigerator (5°C) · 冰箱裡</span><i></i><b></b></p>
          <p class="br-bar br-bar-none"><span>No yeast · 沒有酵母</span><i></i><b></b></p>
        </div>
        <div class="br-btns">
          <button type="button" class="br-bake">&#128293; Bake it<small>送去烤</small></button>
          <button type="button" class="br-reset">Start over<small>重來</small></button>
        </div>
      </div>
      <p class="bt-msg br-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider br-row"><span>Waiting time · 等了多久 <output class="br-time-out"></output></span>
        <input type="range" class="al-age br-time" min="0" max="90" step="1" value="0"></label>
      <label class="al-slider br-row"><span>Temperature · 溫度 <output class="br-temp-out"></output></span>
        <input type="range" class="al-age br-temp" min="5" max="40" step="1" value="30"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def rust_svg(size=56):
    """生鏽小圖（萬物原理首頁的課程卡）：一根鐵釘，一半已經變成紅褐色的鏽，上面有一滴水。"""
    return (f'<svg class="rust-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<g transform="rotate(-35 30 30)"><rect x="8" y="26" width="26" height="8" rx="2" fill="#9aa4b2"/>'
            '<rect x="30" y="26" width="18" height="8" fill="#b5521e"/><path d="M48 26 L56 30 L48 34 Z" fill="#8f3d16"/>'
            '<rect x="4" y="22" width="5" height="16" rx="2" fill="#7c8794"/>'
            '<circle cx="36" cy="28" r="1.6" fill="#e08a4a"/><circle cx="42" cy="32" r="1.8" fill="#e08a4a"/><circle cx="33" cy="32" r="1.2" fill="#7a3210"/></g>'
            '<path d="M44 8 C40 14 38 17 38 20 a6 6 0 0 0 12 0 C50 17 48 14 44 8 Z" fill="#58b4ff"/></svg>')

def render_rust_lab(lesson):
    """第十九課：放大的鐵表面（assets/js/iron-rust.js 綁這裡的 class；數字是示意模型）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("water", "Water", "水", True), ("air", "Air (oxygen)", "空氣（氧）", True), ("salt", "Salt", "鹽", False)])
    return f'''<div class="astro-lab bt-lab rt-lab rvl" data-rust-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D close-up of a piece of iron under a drop of water: with oxygen and water the iron atoms turn into flaky brown rust · 一滴水底下的鐵表面 3D 放大圖：有氧和水，鐵原子就變成會剝落的紅褐色鐵鏽"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A greatly magnified view; the atoms are drawn far bigger and far fewer than real · 放大很多倍的示意圖；原子畫得比真的大非常多、也少非常多</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside rt-aside">
      <div class="rt-top">
        <p class="al-sky-k">Rust needs all three · 生鏽要三樣到齊</p>
        <ul class="rt-needs">
          <li class="rt-need-iron"><b></b>Iron<small>鐵</small></li>
          <li class="rt-need-air"><b></b>Oxygen<small>氧</small></li>
          <li class="rt-need-water"><b></b>Water<small>水</small></li>
        </ul>
        <p class="rt-status" aria-live="polite"></p>
        <dl class="bt-nums rt-nums">
          <div><dt>Surface rusted · 表面鏽了</dt><dd class="rt-pct"></dd></div>
          <div><dt>Rusting speed · 生鏽速度</dt><dd class="rt-speed"></dd></div>
        </dl>
        <div class="rt-bars">
          <p class="rt-bars-k">Bare iron by now · 沒有保護的鐵，到現在</p>
          <p class="rt-bar rt-bar-dry"><span>Dry · 乾的</span><i></i><b></b></p>
          <p class="rt-bar rt-bar-wet"><span>Wet · 有水</span><i></i><b></b></p>
          <p class="rt-bar rt-bar-salt"><span>Salt water · 鹽水</span><i></i><b></b></p>
        </div>
        <p class="rt-coats-k">Surface · 表面</p>
        <div class="rt-coats">
          <button type="button" class="rt-coat" data-coat="none" aria-pressed="true">Bare iron<small>沒有保護</small></button>
          <button type="button" class="rt-coat" data-coat="paint" aria-pressed="false">Painted<small>上了漆</small></button>
          <button type="button" class="rt-coat" data-coat="scratch" aria-pressed="false">Scratched paint<small>油漆刮傷</small></button>
          <button type="button" class="rt-coat" data-coat="zinc" aria-pressed="false">Scratched zinc<small>鍍鋅刮傷</small></button>
        </div>
      </div>
      <p class="bt-msg rt-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider rt-row"><span>Time in the model · 模型裡的時間 <output class="rt-time-out"></output></span>
        <input type="range" class="al-age rt-time" min="0" max="60" step="1" value="0"></label>
    </div>
    <div class="al-row al-toggles">{tg}</div>
  </div>
  {_lab_foot(lab)}
  <p class="bt-credit">{lab["credit_html"]}</p>
</div>'''

def microwave_svg(size=56):
    """微波爐小圖（萬物原理首頁的課程卡）：一台微波爐，裡面有黃色的波和一盤熱食。"""
    return (f'<svg class="microwave-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="4" y="13" width="52" height="34" rx="4" fill="#2a3140" stroke="#8a96ad" stroke-width="1.5"/>'
            '<rect x="8" y="17" width="34" height="26" rx="2" fill="#121c30" stroke="#c7ced9" stroke-width="1.2"/>'
            '<path d="M11 24 q3.5 -5 7 0 t7 0 t7 0 t7 0" fill="none" stroke="#ffe066" stroke-width="1.8" stroke-linecap="round"/>'
            '<ellipse cx="25" cy="38" rx="10" ry="2.2" fill="#fff"/><circle cx="21" cy="35" r="3" fill="#ff8a2a"/><circle cx="27" cy="34.5" r="3.2" fill="#e0261a"/><circle cx="31" cy="36" r="2.4" fill="#ffd84a"/>'
            '<circle cx="49" cy="22" r="2.4" fill="#c8743a"/><rect x="46" y="29" width="6" height="2.4" rx="1" fill="#8a96ad"/><rect x="46" y="34" width="6" height="2.4" rx="1" fill="#8a96ad"/>'
            '<path d="M10 50 h8 M42 50 h8" stroke="#8a96ad" stroke-width="3" stroke-linecap="round"/></svg>')

def render_microwave_lab(lesson):
    """第二十課：剖開的微波爐（assets/js/microwave-oven.js 綁這裡的 class；溫度是示意模型）。"""
    lab = lesson["lab"]
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("turn", "Turntable", "轉盤", True), ("waves", "Show the waves", "顯示微波", True)])
    return f'''<div class="astro-lab bt-lab mcw-lab rvl" data-microwave-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a microwave oven with the top removed: waves bounce inside the metal box, water molecules in the food flip back and forth, and the food heats up · 拿掉頂蓋的微波爐 3D 模型：微波在金屬箱子裡反射，食物裡的水分子來回轉動，食物變熱"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="bt-cut">A microwave oven you can see into; waves and molecules drawn far bigger than real · 看得進去的微波爐；波和分子都畫得比真的大非常多</p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky bt-aside mcw-aside">
      <div class="mcw-top">
        <p class="al-sky-k">What is on the plate? · 盤子上放什麼？</p>
        <div class="mcw-items">
          <button type="button" class="mcw-item" data-item="food" aria-pressed="true">Food<small>含水的食物</small></button>
          <button type="button" class="mcw-item" data-item="ice" aria-pressed="false">Ice cubes<small>冰塊</small></button>
          <button type="button" class="mcw-item" data-item="plate" aria-pressed="false">Empty plate<small>空盤子</small></button>
          <button type="button" class="mcw-item mcw-item-bad" data-item="fork" aria-pressed="false">Food + metal fork<small>食物＋金屬叉子</small></button>
        </div>
        <p class="mcw-status" aria-live="polite"></p>
        <dl class="bt-nums mcw-nums">
          <div><dt>Hottest spot · 最熱的地方</dt><dd class="mcw-hot"></dd></div>
          <div><dt>Coldest spot · 最冷的地方</dt><dd class="mcw-cold"></dd></div>
        </dl>
        <div class="mcw-bars">
          <p class="mcw-bar mcw-bar-hot"><span>Hottest · 最熱</span><i></i></p>
          <p class="mcw-bar mcw-bar-cold"><span>Coldest · 最冷</span><i></i></p>
        </div>
      </div>
      <p class="bt-msg mcw-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Stop · 停止</span></button>
      <label class="al-slider mcw-row"><span>Cooking time · 加熱時間 <output class="mcw-time-out"></output></span>
        <input type="range" class="al-age mcw-time" min="0" max="120" step="1" value="0"></label>
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
    lab_html = {"battery": render_battery_lab, "generator": render_generator_lab, "solar": render_solarcell_lab, "wind": render_windturbine_lab, "internet": render_internet_lab, "signal": render_cellsignal_lab, "gps": render_gps_lab, "memory": render_memory_lab, "sky": render_skyblue_lab, "rainbow": render_rainbow_lab, "sound": render_soundwave_lab, "camera": render_cameralens_lab, "wing": render_airwing_lab, "bike": render_bicycle_lab, "elevator": render_elevator_lab, "fridge": render_fridge_lab, "soap": render_soap_lab, "bread": render_bread_lab, "rust": render_rust_lab, "microwave": render_microwave_lab}[kind](lesson)

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
                "sound": ("Sound in a sentence", "一句話記住聲音"),
                "camera": ("Cameras in a sentence", "一句話記住相機"),
                "wing": ("Flight in a sentence", "一句話記住飛行"),
                "bike": ("Bicycles in a sentence", "一句話記住腳踏車"),
                "elevator": ("Elevators in a sentence", "一句話記住電梯"),
                "fridge": ("Refrigerators in a sentence", "一句話記住冰箱"),
                "soap": ("Soap in a sentence", "一句話記住肥皂"),
                "bread": ("Bread in a sentence", "一句話記住麵包"),
                "rust": ("Rust in a sentence", "一句話記住生鏽"),
                "microwave": ("Microwave ovens in a sentence", "一句話記住微波爐")}[kind]
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
        return battery_svg(60) if l.get("card") == "battery" else outlet_svg(60) if l.get("card") == "outlet" else solarpanel_svg(60) if l.get("card") == "solar" else windturbine_svg(60) if l.get("card") == "wind" else internet_svg(60) if l.get("card") == "internet" else cellsignal_svg(60) if l.get("card") == "signal" else gps_svg(60) if l.get("card") == "gps" else memory_svg(60) if l.get("card") == "memory" else skyblue_svg(60) if l.get("card") == "sky" else rainbow_svg(60) if l.get("card") == "rainbow" else soundwave_svg(60) if l.get("card") == "sound" else cameralens_svg(60) if l.get("card") == "camera" else airwing_svg(60) if l.get("card") == "wing" else bicycle_svg(60) if l.get("card") == "bike" else elevator_svg(60) if l.get("card") == "elevator" else fridge_svg(60) if l.get("card") == "fridge" else soap_svg(60) if l.get("card") == "soap" else bread_svg(60) if l.get("card") == "bread" else rust_svg(60) if l.get("card") == "rust" else microwave_svg(60) if l.get("card") == "microwave" else l["icon"]
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


# ---- 哲學 Philosophy（資料驅動，data/philosophy.json）----
# 五個書架：A 大哉問（分支）、B 哲學史、C 哲學家、D 佛法與西方哲學、E 原典精讀。
# shelves[].units[].items 是整份課表（系列首頁用）；做好的課在 lessons[]、人物在 philosophers[]，
# 以 item.slug 掛回課表，沒有 slug 的就是「製作中」。
# 定位與其他系列不同：這個系列是高級程度（成人讀者），英文長文為主、中譯可開關。
# 樣式在 assets/css/philosophy.css（class 前綴 ph-）、互動在 assets/js/philosophy.js，兩者只載在本系列頁面。
_phj = os.path.join(ROOT, "data", "philosophy.json")
PHIL = json.load(open(_phj, encoding="utf-8")) if os.path.exists(_phj) else None
PHIL_BASE = "/resources/classes/philosophy/"

_PH_3D = {"cave": "ph-cave", "ship": "ph-ship"}   # lab.kind → assets/js/<bundle>.js（three.js，原始碼在 tools/philosophy/src/）

def _ph_head(lab_kind=None):
    files = ["assets/css/philosophy.css", "assets/js/philosophy.js"]
    js3d = _PH_3D.get(lab_kind)
    if js3d: files.append(f"assets/js/{js3d}.js")
    h = hashlib.md5()
    for rel in files:
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    v = h.hexdigest()[:8]
    return (f'<link rel="stylesheet" href="/assets/css/philosophy.css?v={v}">\n'
            f'<script defer src="/assets/js/philosophy.js?v={v}"></script>\n'
            + (f'<script defer src="/assets/js/{js3d}.js?v={v}"></script>\n' if js3d else ""))

def _ph_e(s): return html.escape(s, quote=True)

def _ph_say(text, label="Listen · 聽這段"):
    t = _ph_e(re.sub(r"\s+", " ", re.sub(r"[“”‘’…]", "", text)).strip())
    return f'<button class="spk ph-spk" data-say="{t}" aria-label="{label}">🔊</button>'

def _ph_bi(p, cls="", say=True):
    """一段英文＋可開關的中譯。"""
    spk = _ph_say(p["en"]) if say else ""
    return (f'<div class="ph-p {cls}"><p class="ph-en">{spk}<span>{_ph_e(p["en"])}</span></p>'
            f'<p class="ph-zh" lang="zh-Hant">{_ph_e(p["zh"])}</p></div>')

def _ph_owl(size=120):
    """系列的標誌：雅典娜的貓頭鷹（自繪）。"""
    return (f'<svg class="ph-owl" viewBox="0 0 120 120" width="{size}" height="{size}" aria-hidden="true">'
            '<path class="ph-owl-body" d="M60 14c-22 0-36 15-36 40v18c0 20 14 34 36 34s36-14 36-34V54c0-25-14-40-36-40z"/>'
            '<path class="ph-owl-ear" d="M27 40 22 14l22 12M93 40l5-26-22 12"/>'
            '<circle class="ph-owl-eye" cx="43" cy="52" r="15"/><circle class="ph-owl-eye" cx="77" cy="52" r="15"/>'
            '<circle class="ph-owl-pupil" cx="43" cy="52" r="6"/><circle class="ph-owl-pupil" cx="77" cy="52" r="6"/>'
            '<path class="ph-owl-beak" d="M60 60l-6 10h12z"/>'
            '<path class="ph-owl-wing" d="M40 82q20 12 40 0M44 92q16 9 32 0"/></svg>')

def _ph_toolbar():
    return ('<div class="ph-tools" data-ph-tools><div class="wrap ph-tools-in">'
            '<nav class="ph-toc" aria-label="On this page · 本頁目錄" data-ph-toc></nav>'
            '<button type="button" class="ph-zh-btn" data-ph-zh aria-pressed="false">'
            '<span class="on">Hide Chinese · 隱藏中譯</span><span class="off">Show Chinese · 顯示中譯</span></button>'
            '</div><div class="ph-progress" aria-hidden="true"><i data-ph-bar></i></div></div>')

def _ph_sec(sid, toc, eyebrow, h_en, h_zh, inner, band=False, lead=None):
    lead_html = (f'<div class="ph-lead rvl d2">{_ph_bi(lead, say=False)}</div>' if lead else "")
    return (f'<section class="section ph-sec{" band" if band else ""}" id="{sid}" data-ph-toc-label="{_ph_e(toc)}"><div class="wrap">'
            f'<p class="eyebrow rvl">{eyebrow}</p>'
            f'<h2 class="rvl d1 sweep">{_ph_e(h_en)} <span class="ph-h2-zh">{_ph_e(h_zh)}</span></h2>'
            f'{lead_html}{inner}</div></section>')

def _ph_terms(items):
    rows = "".join(
        f'<div class="ph-term rvl"><div class="ph-term-h"><b>{_ph_e(t["t"])}</b>{_ph_say(t["t"], "Say this term · 唸這個術語")}'
        f'<span class="ph-term-zh">{_ph_e(t["zh"])}</span></div>'
        + (f'<p class="ph-term-o">{_ph_e(t["o"])}</p>' if t.get("o") else "")
        + f'<p class="ph-term-d">{_ph_e(t["d_en"])}</p><p class="ph-zh" lang="zh-Hant">{_ph_e(t["d_zh"])}</p></div>'
        for t in items)
    return f'<div class="ph-terms">{rows}</div>'

def _ph_vocab(items):
    rows = "".join(
        f'<div class="adv-item">'
        f'<div class="top"><b>{_ph_e(a["w"])}</b><span class="pos">({_ph_e(a["pos"])})</span>'
        f'<span class="zh">{_ph_e(a["zh"])}</span>{_ph_say(a["w"], "Say this word · 唸單字")}</div>'
        f'<p class="eg">{_ph_say(a["eg"], "Say this sentence · 唸例句")}<span>{_ph_e(a["eg"])}</span></p>'
        f'<p class="eg-zh">{_ph_e(a["eg_zh"])}</p></div>' for a in items)
    return f'<div class="adv-list rvl">{rows}</div>'

def _ph_quiz(items, seed):
    L = "ABCD"
    base = sum(ord(c) for c in seed) % 4
    qs = []
    for qi, item in enumerate(items):
        target = (base + qi * 3) % 4
        opts = list(item["options"]); opts.insert(target, opts.pop(item["correct"]))
        dc = ' data-correct="1"'
        btns = "".join(f'<button class="quiz-opt"{dc if k == target else ""}>'
                       f'<span class="ql">{L[k]}</span>{_ph_e(o)}</button>' for k, o in enumerate(opts))
        qs.append(f'<div class="quiz"><p class="q ph-q">{qi+1}. {_ph_e(item["q"])}</p><div class="quiz-opts">{btns}</div></div>')
    return f'<div class="rvl">{"".join(qs)}</div>'

def _ph_said(s):
    return (f'<aside class="ph-said rvl"><p class="ph-said-k">Did he really say that? · 這句話真的是他說的嗎？</p>'
            f'<p class="ph-said-claim">{_ph_e(s["claim"])}<span lang="zh-Hant">{_ph_e(s["claim_zh"])}</span></p>'
            f'<p class="ph-said-v"><b>{_ph_e(s["verdict_en"])}</b> · {_ph_e(s["verdict_zh"])}</p>'
            f'{_ph_bi(s, say=False)}</aside>')

def _ph_further(items):
    def one(f):
        t = (f'<a href="{_ph_e(f["url"])}" target="_blank" rel="noopener">{_ph_e(f["t"])} &#8599;</a>' if f.get("url") else _ph_e(f["t"]))
        n = (f'<span class="ph-fur-n">{_ph_e(f["n_en"])}<span class="ph-zh ph-inline" lang="zh-Hant"> {_ph_e(f["n_zh"])}</span></span>' if f.get("n_en") else "")
        return f'<li>{t}{n}</li>'
    return f'<ul class="ph-further rvl">{"".join(one(f) for f in items)}</ul>'

def _ph_dharma(d):
    terms = ""
    if d.get("terms"):
        terms = ('<div class="ph-tri rvl">' + "".join(
            f'<div><b lang="zh-Hant">{_ph_e(z)}</b><i>{_ph_e(p)}</i><span>{_ph_e(e)}</span></div>' for z, p, e in d["terms"]) + '</div>')
    link = ""
    if d.get("link"):
        k = d["link"]
        link = (f'<a class="ph-start ph-dlink rvl" href="{PHIL_BASE}{k["href"]}"><span>Dharma and the West · 佛法與西方哲學</span>'
                f'<b>{_ph_e(k["en"])} <i lang="zh-Hant">{_ph_e(k["zh"])}</i></b><em>&rarr;</em></a>')
    return (f'<div class="ph-dharma"><div class="ph-wheel" aria-hidden="true">☸</div>'
            f'<div class="ph-essay">{"".join(_ph_bi(p) for p in d["paras"])}</div>{terms}{link}</div>')

def _ph_person(slug): return next(p for p in PHIL["philosophers"] if p["slug"] == slug)
def _ph_lesson(slug): return next(l for l in PHIL["lessons"] if l["slug"] == slug)

def _ph_people_cards(slugs):
    out = []
    for s in slugs:
        p = _ph_person(s)
        out.append(f'<a class="ph-pcard rvl" href="{PHIL_BASE}philosophers/{p["slug"]}/">'
                   f'<span class="ph-pcard-mono" aria-hidden="true">{_ph_e(p["name"][0])}</span>'
                   f'<span class="ph-pcard-b"><b>{_ph_e(p["name"])} <span lang="zh-Hant">{_ph_e(p["name_zh"])}</span></b>'
                   f'<i>{_ph_e(p["dates"])} · {_ph_e(p["place_en"])}</i><span>{_ph_e(p["tag_en"])}</span></span>'
                   f'<span class="ph-go">Read the profile · 讀小傳 &rarr;</span></a>')
    return f'<div class="ph-pcards">{"".join(out)}</div>'

def _ph_lab_validity(lab):
    """A2：六個論證，先判有效、再判前提真假；資料塞進 JSON，由 philosophy.js 接手。"""
    payload = html.escape(json.dumps(lab["items"], ensure_ascii=False), quote=False)
    rows = "".join(f'<tr><th>{_ph_e(a)}<span lang="zh-Hant">{_ph_e(az)}</span></th><td>{_ph_e(b)}<span lang="zh-Hant">{_ph_e(bz)}</span></td></tr>'
                   for a, az, b, bz in lab["table"])
    return f'''<div class="ph-el ph-vl rvl" data-ph-validity>
  <script type="application/json" data-vl-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-vl-dots aria-hidden="true"></div><span class="ph-el-count" data-vl-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-vl-arg" data-vl-arg></div>
    <div class="ph-vl-ask" data-vl-ask aria-live="polite"></div>
    <div class="ph-vl-out" data-vl-out aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-vl-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-vl-next hidden>Next argument · 下一個 &rarr;</button></div>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">The four possibilities <span class="ph-h2-zh">四種可能</span></h3>
  <div class="ph-vl-table rvl"><table><tbody>{rows}</tbody></table></div>
</div>'''

def _ph_lab_fallacy(lab):
    """A3：八段日常言論，四選一指出謬誤；下方附三個家族的速查表。"""
    items = []
    for i, it in enumerate(lab["items"]):
        opts = list(it["opts"]); k = (i * 3 + 1) % 4; opts.insert(k, it["a"])
        items.append({**it, "opts": opts, "k": k})
    payload = html.escape(json.dumps(items, ensure_ascii=False), quote=False)
    fams = "".join(
        f'<div class="ph-fg rvl"><h4>{_ph_e(f["fam"])} <span lang="zh-Hant">{_ph_e(f["fam_zh"])}</span></h4><ul>'
        + "".join(f'<li><b>{_ph_e(n)}</b><i lang="zh-Hant">{_ph_e(z)}</i><span>{_ph_e(d)}</span></li>' for n, z, d in f["items"])
        + '</ul></div>' for f in lab["guide"])
    return f'''<div class="ph-el ph-vl rvl" data-ph-fallacy>
  <script type="application/json" data-fl-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-fl-dots aria-hidden="true"></div><span class="ph-el-count" data-fl-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-fl-card" data-fl-card></div>
    <div class="ph-vl-ask" data-fl-ask aria-live="polite"></div>
    <div class="ph-vl-out" data-fl-out aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-fl-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-fl-next hidden>Next · 下一段 &rarr;</button></div>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">A field guide <span class="ph-h2-zh">謬誤速查</span></h3>
  <div class="ph-fgs">{fams}</div>
</div>'''

def _ph_lab_zeno(lab):
    """A4：阿基里斯與烏龜。芝諾的走法（一次一個階段）與時鐘的走法並排；數字全部在 philosophy.js 裡現算。"""
    return f'''<div class="ph-el ph-zn rvl" data-ph-zeno>
  <div class="ph-vl-top"><div class="ph-zn-ratio" role="group" aria-label="How much faster is Achilles? · 阿基里斯快幾倍？">
      <span>Achilles is · 阿基里斯快</span>
      <button type="button" data-zn-r="2" aria-pressed="false">2×</button>
      <button type="button" data-zn-r="10" aria-pressed="true">10×</button>
      <button type="button" data-zn-r="100" aria-pressed="false">100×</button></div>
    <span class="ph-el-count">{_ph_e(lab["note_en"])}</span></div>
  <div class="ph-el-stage">
    <svg class="ph-zn-track" viewBox="0 0 1000 170" role="img" aria-label="A race track with Achilles and the tortoise · 跑道上的阿基里斯與烏龜">
      <line class="ph-zn-ground" x1="20" y1="120" x2="980" y2="120"/>
      <g data-zn-marks></g>
      <g data-zn-limit><line class="ph-zn-lim" x1="0" y1="34" x2="0" y2="132"/><text class="ph-zn-limt" y="26" text-anchor="middle"></text></g>
      <g data-zn-t><circle class="ph-zn-tort" r="13" cy="104"/><text class="ph-zn-lbl" y="80" text-anchor="middle">tortoise 龜</text></g>
      <g data-zn-a><circle class="ph-zn-ach" r="13" cy="104"/><text class="ph-zn-lbl" y="152" text-anchor="middle">Achilles</text></g>
    </svg>
    <div class="ph-zn-read">
      <div><small>Stage · 階段</small><b data-zn-n>0</b></div>
      <div><small>Clock · 時間</small><b data-zn-time>0 s</b></div>
      <div><small>Gap · 差距</small><b data-zn-gap>100 m</b></div>
      <div><small>Limit · 極限</small><b data-zn-lim></b></div>
    </div>
    <div class="ph-zn-btns">
      <button type="button" class="ph-vl-next" data-zn-step>Zeno’s next stage · 芝諾的下一階段</button>
      <button type="button" class="ph-zn-run" data-zn-run>Let the clock run · 讓時鐘自己走</button>
      <button type="button" class="ph-el-reset" data-zn-reset>Start again · 重來</button>
    </div>
    <p class="ph-zn-msg" data-zn-msg aria-live="polite"></p>
    <div class="ph-zn-tablewrap"><table class="ph-zn-table"><thead><tr><th>Stage<span lang="zh-Hant">階段</span></th><th>Achilles runs<span lang="zh-Hant">阿基里斯跑</span></th><th>It takes<span lang="zh-Hant">花費</span></th><th>Gap left<span lang="zh-Hant">剩下差距</span></th><th>Clock so far<span lang="zh-Hant">累計時間</span></th></tr></thead><tbody data-zn-rows></tbody></table></div>
  </div>
</div>'''

def _ph_lab_doubt(lab):
    """A5：懷疑的階梯。十個信念、三波懷疑；每一波先讓讀者預測哪些會倒，再揭曉。"""
    payload = html.escape(json.dumps({"beliefs": lab["beliefs"], "waves": lab["waves"], "end": lab["end"]}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-db rvl" data-ph-doubt>
  <script type="application/json" data-db-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-db-waves" data-db-waves></div><span class="ph-el-count" data-db-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-db-q" data-db-q aria-live="polite"></div>
    <div class="ph-db-grid" data-db-grid></div>
    <div class="ph-vl-out" data-db-out aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-db-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-db-go>Apply the doubt · 施加懷疑</button></div>
  </div>
</div>'''

def _ph_lab_cave(lab):
    """A6：柏拉圖的洞穴（3D，assets/js/ph-cave.js 綁 data-ph-cave）。階段按鈕與說明文字在這裡產生，場景在 JS 裡。"""
    st = lab["stages"]
    btns = "".join(f'<button type="button" data-cave-stage="{i}" aria-pressed="{"true" if i == 0 else "false"}">'
                   f'<b>{i if i else "◎"}</b><span>{_ph_e(s["name"]["en"])}<i lang="zh-Hant">{_ph_e(s["name"]["zh"])}</i></span></button>' for i, s in enumerate(st))
    caps = "".join(
        f'<div class="ph-cave-cap" data-cave-cap="{i}"{"" if i == 0 else " hidden"}>'
        f'<p class="ph-cave-ref">{_ph_e(s["ref"])}</p><h4>{_ph_e(s["name"]["en"])} <span lang="zh-Hant">{_ph_e(s["name"]["zh"])}</span></h4>'
        f'{_ph_bi(s["text"], say=False)}<div class="ph-cave-line">{_ph_bi(s["line"], say=False)}</div></div>' for i, s in enumerate(st))
    return f'''<div class="ph-el ph-cave rvl" data-ph-cave data-stage="0">
  <div class="ph-cave-view">
    <canvas aria-label="3D model of Plato\'s cave · 柏拉圖洞穴的 3D 模型"></canvas>
    <div class="ph-cave-labels" data-cave-labels aria-hidden="true"></div>
    <div class="ph-cave-veil" data-cave-veil aria-hidden="true"></div>
    <p class="ph-cave-hint">Drag to look around · 拖曳環顧　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
    <div class="ph-cave-tools">
      <button type="button" data-cave-toggle-labels aria-pressed="true" title="Labels · 標示">Aa</button>
      <button type="button" data-cave-home title="Reset this view · 回到這個視角">&#8634;</button>
    </div>
    <p class="ph-cave-nogl-msg">This 3D model needs WebGL, which this browser does not support. The stages below still tell the story.<br><span lang="zh-Hant">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方各階段的文字仍然完整。</span></p>
  </div>
  <div class="ph-cave-stages" role="group" aria-label="Stages of the story · 故事的階段">{btns}</div>
  <div class="ph-el-stage ph-cave-caps">{caps}
    <div class="ph-el-foot"><span class="ph-el-count">Republic VII · 《理想國》卷七</span>
      <button type="button" class="ph-vl-next" data-cave-next>Next stage · 下一階段 &rarr;</button></div>
  </div>
</div>'''

def _ph_lab_meno(lab):
    """A7：《美諾篇》把正方形加倍（SVG，四格大正方形；狀態由 philosophy.js 切換 data-state），外加莫利紐茲問題。"""
    payload = html.escape(json.dumps({"steps": lab["steps"], "molyneux": lab["molyneux"]}, ensure_ascii=False), quote=False)
    m = lab["molyneux"]
    return f'''<div class="ph-el ph-mn rvl" data-ph-meno data-state="start">
  <script type="application/json" data-mn-data>{payload}</script>
  <div class="ph-el-stage ph-mn-grid">
    <div class="ph-mn-fig">
      <svg viewBox="-10 -10 420 444" role="img" aria-label="A square and the squares built on it · 正方形與在它上面作出的正方形">
        <rect class="ph-mn-big" x="0" y="0" width="400" height="400"/>
        <rect class="ph-mn-three" x="0" y="100" width="300" height="300"/>
        <polygon class="ph-mn-tilt" points="200,0 400,200 200,400 0,200"/>
        <g class="ph-mn-lines"><line x1="200" y1="0" x2="200" y2="400"/><line x1="0" y1="200" x2="400" y2="200"/></g>
        <g class="ph-mn-diags"><line x1="0" y1="200" x2="200" y2="0"/><line x1="200" y1="0" x2="400" y2="200"/><line x1="400" y1="200" x2="200" y2="400"/><line x1="200" y1="400" x2="0" y2="200"/></g>
        <rect class="ph-mn-orig" x="0" y="200" width="200" height="200"/>
        <text class="ph-mn-t ph-mn-t-orig" x="100" y="306" text-anchor="middle">4</text>
        <text class="ph-mn-t ph-mn-t-four" x="300" y="106" text-anchor="middle">16</text>
        <text class="ph-mn-t ph-mn-t-three" x="150" y="256" text-anchor="middle">9</text>
        <text class="ph-mn-t ph-mn-t-tilt" x="262" y="158" text-anchor="middle">8</text>
        <text class="ph-mn-side" x="100" y="425" text-anchor="middle">2 ft · 尺</text>
      </svg>
      <p class="ph-mn-area" data-mn-area></p>
    </div>
    <div class="ph-mn-talk">
      <div class="ph-el-ask"><span class="ph-el-av" aria-hidden="true">Σ</span><div class="ph-mn-say" data-mn-say aria-live="polite"></div></div>
      <div class="ph-mn-note" data-mn-note hidden></div>
      <div class="ph-mn-opts" data-mn-opts></div>
      <div class="ph-el-foot"><span class="ph-el-count">Plato, Meno 82b–85b</span><button type="button" class="ph-el-reset" data-mn-reset>Start again · 重來</button></div>
    </div>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">A second experiment <span class="ph-h2-zh">第二個實驗</span></h3>
  <div class="ph-own ph-ml rvl" data-ph-molyneux>
    {_ph_bi(m["q"], say=False)}
    <div class="ph-ml-opts"><button type="button" data-ml="yes">Yes, he can · 能</button><button type="button" data-ml="no">No, he cannot · 不能</button></div>
    <div class="ph-ml-out" data-ml-out hidden>
      <div class="ph-ml-side" data-ml-yes><b>Yes · 能</b>{_ph_bi(m["yes"], say=False)}</div>
      <div class="ph-ml-side" data-ml-no><b>No · 不能</b>{_ph_bi(m["no"], say=False)}</div>
      <div class="ph-ml-res"><b>What happened · 結果</b>{_ph_bi(m["result"], say=False)}</div>
    </div>
  </div>
</div>'''

def _ph_lab_chicken(lab):
    """A8：羅素的雞。每天早上按一次，信心（拉普拉斯接續律）上升，直到某一天；接著讓讀者替歸納法找理由。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("last", "fed", "end", "justify")}, ensure_ascii=False), quote=False)
    j = lab["justify"]
    opts = "".join(f'<button type="button" class="ph-ck-opt" data-ck-j="{i}"><b>{_ph_e(o["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(o["t"]["zh"])}</span></button>' for i, o in enumerate(j["opts"]))
    return f'''<div class="ph-el ph-ck rvl" data-ph-chicken>
  <script type="application/json" data-ck-data>{payload}</script>
  <div class="ph-vl-top"><span class="ph-el-count" data-ck-day>Day 0 · 第 0 天</span><span class="ph-el-count" data-ck-conf></span></div>
  <div class="ph-el-stage">
    <div class="ph-ck-yard" aria-hidden="true"><div class="ph-ck-days" data-ck-days></div></div>
    <div class="ph-ck-meter"><div class="ph-ck-bar"><i data-ck-bar></i></div><span data-ck-pct>50%</span></div>
    <p class="ph-zn-msg" data-ck-msg aria-live="polite"></p>
    <div class="ph-zn-btns">
      <button type="button" class="ph-vl-next" data-ck-next>Next morning · 下一個早晨</button>
      <button type="button" class="ph-el-reset" data-ck-reset>Start again · 重來</button>
    </div>
    <div class="ph-ck-rule">{_ph_bi(lab["rule"], say=False)}</div>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">Now justify the method <span class="ph-h2-zh">現在替這個方法找理由</span></h3>
  <div class="ph-own ph-ckj rvl" data-ph-ckj>
    {_ph_bi(j["q"], say=False)}
    <div class="ph-ck-opts">{opts}</div>
    <div class="ph-ck-reply" data-ck-reply hidden></div>
    <p class="ph-ck-tried" data-ck-tried></p>
  </div>
</div>'''

def _ph_pick(pick, attr=""):
    """通用的「先選邊、再看回應」小元件（philosophy.js 的 data-ph-pick）：每個選項各有一段回應，選了才顯示。"""
    opts = "".join(f'<button type="button" class="ph-ck-opt" data-pick="{i}"><b>{_ph_e(o["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(o["t"]["zh"])}</span></button>' for i, o in enumerate(pick["opts"]))
    reps = "".join(f'<div class="ph-ck-reply" data-pick-reply="{i}" hidden><b>{_ph_e(o["tag"])}</b>{_ph_bi(o["r"], say=False)}</div>' for i, o in enumerate(pick["opts"]))
    return (f'<div class="ph-own ph-pick rvl" data-ph-pick {attr}>{_ph_bi(pick["q"], say=False)}'
            f'<div class="ph-ck-opts">{opts}</div>{reps}<p class="ph-ck-tried" data-pick-tried></p></div>')

def _ph_lab_ship(lab):
    """A9：特修斯之船（3D，assets/js/ph-ship.js 綁 data-ph-ship）。拉桿與按鈕在這裡，場景在 JS 裡。"""
    return f'''<div class="ph-el ph-cave ph-ship rvl" data-ph-ship>
  <div class="ph-cave-view">
    <canvas aria-label="3D model of the Ship of Theseus · 特修斯之船的 3D 模型"></canvas>
    <div class="ph-cave-labels" data-ship-labels aria-hidden="true"></div>
    <p class="ph-cave-hint ph-ship-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
    <p class="ph-cave-nogl-msg">This 3D model needs WebGL, which this browser does not support. The questions below can still be answered.<br><span lang="zh-Hant">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的問題仍然可以作答。</span></p>
  </div>
  <div class="ph-el-stage">
    <div class="ph-ship-read">
      <div><small>Parts replaced · 已更換</small><b data-ship-count>0</b></div>
      <div><small>Original material left · 原件剩餘</small><b data-ship-orig>100%</b></div>
    </div>
    <label class="ph-ship-slider"><span>Original · 原樣</span><input type="range" min="0" max="70" value="0" step="1" data-ship-range aria-label="Parts replaced · 已更換的零件數"><span>All new · 全新</span></label>
    <div class="ph-zn-btns">
      <button type="button" class="ph-vl-next" data-ship-one>Replace one part · 換一個零件</button>
      <button type="button" class="ph-zn-run" data-ship-years>Let the years pass · 讓歲月過去</button>
      <button type="button" class="ph-zn-run ph-ship-mark" data-ship-mark>It is no longer his ship · 它不再是他的船了</button>
      <button type="button" class="ph-zn-run" data-ship-build disabled>Rebuild from the old planks · 用舊木板重組</button>
      <button type="button" class="ph-el-reset" data-ship-reset>Start again · 重來</button>
    </div>
    <p class="ph-zn-msg" data-ship-note aria-live="polite"></p>
    <p class="ph-ship-markout" data-ship-markout hidden></p>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">Which one is his? <span class="ph-h2-zh">哪一艘是他的？</span></h3>
  {_ph_pick(lab["pick"])}
</div>'''

def _ph_lab_river(lab):
    """A10：踏進這條河（2D canvas，philosophy.js 的 data-ph-river）。水滴流過石頭；踏進去會標記碰到腳的水。"""
    payload = html.escape(json.dumps(lab["notes"], ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-rv rvl" data-ph-river>
  <script type="application/json" data-rv-data>{payload}</script>
  <div class="ph-rv-view"><canvas width="1000" height="420" aria-label="A river flowing past a rock, seen from above · 從上方看，流過一塊石頭的河"></canvas></div>
  <div class="ph-el-stage">
    <div class="ph-zn-read ph-rv-read">
      <div><small>Steps · 踏進幾次</small><b data-rv-steps>0</b></div>
      <div><small>First water still here · 第一次的水還在</small><b data-rv-left>—</b></div>
      <div><small>Drops gone by · 已流過的水滴</small><b data-rv-passed>0</b></div>
      <div><small>The river · 這條河</small><b data-rv-state>flowing</b></div>
    </div>
    <div class="ph-zn-btns">
      <button type="button" class="ph-vl-next" data-rv-step>Step in · 踏進去</button>
      <button type="button" class="ph-zn-run" data-rv-freeze aria-pressed="false">Stop the river · 把河停住</button>
      <button type="button" class="ph-zn-run" data-rv-pattern aria-pressed="false">Show the pattern · 顯示樣式</button>
      <button type="button" class="ph-el-reset" data-rv-reset>Start again · 重來</button>
    </div>
    <p class="ph-zn-msg" data-rv-msg aria-live="polite"></p>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">Was it the same river? <span class="ph-h2-zh">那是同一條河嗎？</span></h3>
  {_ph_pick(lab["pick"])}
</div>'''

def _ph_lab_demon(lab):
    """A11：拉普拉斯的球桌（2D canvas，決定性的彈性碰撞；重播完全相同、微調 0.01° 結果就不同），以及作弊的信封。"""
    payload = html.escape(json.dumps({"notes": lab["notes"], "envelope": lab["envelope"]}, ensure_ascii=False), quote=False)
    e = lab["envelope"]
    return f'''<div class="ph-el ph-dm rvl" data-ph-demon>
  <script type="application/json" data-dm-data>{payload}</script>
  <div class="ph-dm-view"><canvas width="1000" height="440" aria-label="Six balls on a table · 球桌上的六顆球"></canvas></div>
  <div class="ph-el-stage">
    <div class="ph-zn-read">
      <div><small>Runs · 運行次數</small><b data-dm-runs>0</b></div>
      <div><small>Time · 時間</small><b data-dm-t>0.0 s</b></div>
      <div><small>Red ball ends at · 紅球終點</small><b data-dm-end>—</b></div>
      <div><small>Start angle · 起始角度</small><b data-dm-ang>30.00°</b></div>
    </div>
    <div class="ph-zn-btns">
      <button type="button" class="ph-vl-next" data-dm-run>Run the universe · 讓宇宙運行</button>
      <button type="button" class="ph-zn-run" data-dm-nudge>Nudge the red ball 0.01° · 把紅球轉 0.01°</button>
      <button type="button" class="ph-el-reset" data-dm-reset>Start again · 重來</button>
    </div>
    <p class="ph-zn-msg" data-dm-msg aria-live="polite"></p>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">The demon predicts you <span class="ph-h2-zh">惡魔預測你</span></h3>
  <div class="ph-own ph-env rvl" data-ph-envelope>
    {_ph_bi(e["q"], say=False)}
    <div class="ph-env-row"><div class="ph-env-card" data-env-card aria-hidden="true">✉</div>
      <div class="ph-ml-opts"><button type="button" data-env="left">{_ph_e(e["left"]["en"])} · {_ph_e(e["left"]["zh"])}</button><button type="button" data-env="right">{_ph_e(e["right"]["en"])} · {_ph_e(e["right"]["zh"])}</button></div></div>
    <div class="ph-ck-reply" data-env-out hidden></div>
  </div>
  <h3 class="rvl" style="margin-top:2.4rem">Where do you stand? <span class="ph-h2-zh">你站在哪一邊？</span></h3>
  {_ph_pick(lab["pick"])}
</div>'''

def _ph_lab_now(lab):
    """A12：「現在」有多長？（逐層放大的時間條）＋量一段時間＋A 系列／B 系列的切換。全部在 philosophy.js。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("levels", "end", "measure", "series")}, ensure_ascii=False), quote=False)
    m, sr = lab["measure"], lab["series"]
    return f'''<div class="ph-el ph-nw rvl" data-ph-now>
  <script type="application/json" data-nw-data>{payload}</script>
  <div class="ph-vl-top"><span class="ph-el-count" data-nw-level></span><span class="ph-el-count" data-nw-frac></span></div>
  <div class="ph-el-stage">
    <div class="ph-nw-bar" data-nw-bar aria-hidden="true"></div>
    <div class="ph-nw-legend"><span><i class="p"></i>past · 過去</span><span><i class="n"></i>called “present” · 被稱為「現在」</span><span><i class="f"></i>future · 未來</span></div>
    <p class="ph-zn-msg" data-nw-msg aria-live="polite"></p>
    <div class="ph-zn-btns">
      <button type="button" class="ph-vl-next" data-nw-zoom>Look closer · 再看近一點</button>
      <button type="button" class="ph-el-reset" data-nw-reset>Start again · 重來</button>
    </div>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">Measure a time <span class="ph-h2-zh">量一段時間</span></h3>
  <div class="ph-own ph-ms rvl" data-ph-measure>
    {_ph_bi(m["q"], say=False)}
    <div class="ph-ms-row"><span class="ph-ms-lamp" data-ms-lamp aria-hidden="true"></span>
      <button type="button" class="ph-ms-start" data-ms-start>Start · 開始</button>
      <label class="ph-ms-guess" data-ms-guessbox hidden><input type="range" min="1" max="9" step="0.5" value="4" data-ms-range aria-label="Your estimate in seconds · 你估計的秒數"><b data-ms-val>4.0 s</b>
        <button type="button" data-ms-ok>That long · 就這麼久</button></label></div>
    <div class="ph-ck-reply" data-ms-out hidden></div>
  </div>
  <h3 class="rvl" style="margin-top:2.4rem">Two orderings of the same events <span class="ph-h2-zh">同一串事件的兩種排法</span></h3>
  <div class="ph-own ph-sr rvl" data-ph-series data-mode="a">
    {_ph_bi(sr["q"], say=False)}
    <div class="ph-ml-opts"><button type="button" data-sr="a" aria-pressed="true">Past · present · future　過去・現在・未來</button><button type="button" data-sr="b" aria-pressed="false">Earlier · later　早於・晚於</button></div>
    <ol class="ph-sr-list" data-sr-list></ol>
    <div class="ph-sr-note" data-sr-note></div>
  </div>
  <h3 class="rvl" style="margin-top:2.4rem">Which picture? <span class="ph-h2-zh">哪一幅圖像？</span></h3>
  {_ph_pick(lab["pick"])}
</div>'''

def _ph_lab_teleport(lab):
    """A13：去火星三趟（帕菲特的傳送機）。三題依序作答，最後依前兩題的組合給判讀。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("stages", "verdicts", "q3")}, ensure_ascii=False), quote=False)
    fig = ('<svg viewBox="0 0 60 110" aria-hidden="true"><circle cx="30" cy="20" r="14"/><path d="M12 104V62c0-12 8-22 18-22s18 10 18 22v42z"/></svg>')
    return f'''<div class="ph-el ph-tp rvl" data-ph-teleport data-scene="idle">
  <script type="application/json" data-tp-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-tp-dots aria-hidden="true"></div><span class="ph-el-count" data-tp-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-tp-scene" aria-hidden="true">
      <div class="ph-tp-pod ph-tp-earth"><span class="ph-tp-fig">{fig}</span><small>Earth · 地球</small></div>
      <div class="ph-tp-beam"><i></i><i></i><i></i></div>
      <div class="ph-tp-pod ph-tp-mars"><span class="ph-tp-fig">{fig}</span><small>Mars · 火星</small></div>
    </div>
    <div class="ph-tp-text" data-tp-text aria-live="polite"></div>
    <div class="ph-vl-opts ph-tp-opts" data-tp-opts></div>
    <div class="ph-vl-out" data-tp-out aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-tp-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-tp-next hidden>Next trip · 下一趟 &rarr;</button></div>
  </div>
</div>'''

def _ph_lab_minds(lab):
    """A14：瑪麗的房間（讀完四份檔案 → 開門看見紅色 → 四種回應），再加心靈的階梯（九條滑桿 → 判讀你用的標準）。"""
    M, S = lab["mary"], lab["scale"]
    def bi(o, cls=""): return f'<p class="{cls}">{_ph_e(o["en"])}</p><p class="ph-zh" lang="zh-Hant">{_ph_e(o["zh"])}</p>'
    facts = "".join(
        f'<button type="button" class="ph-md-fact" data-md-fact><small>{_ph_e(f["k"]["en"])} · <span lang="zh-Hant">{_ph_e(f["k"]["zh"])}</span></small>'
        f'<b>{_ph_e(f["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(f["t"]["zh"])}</span><i aria-hidden="true">✓</i></button>' for f in M["facts"])
    mopts = "".join(
        f'<button type="button" class="ph-vl-opt" data-md-opt="{o["k"]}" aria-pressed="false"><b>{_ph_e(o["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(o["t"]["zh"])}</span></button>' for o in M["opts"])
    mv = "".join(
        f'<div class="ph-vl-card is-valid" data-md-v="{o["k"]}" hidden><small class="ph-tp-k">{_ph_e(o["who"])}</small>{bi(o["v"])}</div>' for o in M["opts"])
    rows = "".join(
        f'<label class="ph-md-row"><span class="ph-md-name"><b>{_ph_e(it["n"]["en"])}</b><i lang="zh-Hant">{_ph_e(it["n"]["zh"])}</i></span>'
        f'<input type="range" min="0" max="100" step="1" value="50" data-md-range="{it["k"]}" aria-label="{_ph_e(it["n"]["en"])} · {_ph_e(it["n"]["zh"])}">'
        f'<output data-md-val="{it["k"]}">?</output></label>' for it in S["items"])
    voices = "".join(
        f'<div class="ph-vl-card"><small class="ph-tp-k">{_ph_e(v["who"]["en"])} · <span lang="zh-Hant">{_ph_e(v["who"]["zh"])}</span></small>{bi(v["t"])}</div>' for v in S["voices"])
    payload = html.escape(json.dumps({"reads": S["reads"], "items": [{"k": it["k"], "en": it["n"]["en"], "zh": it["n"]["zh"]} for it in S["items"]]}, ensure_ascii=False), quote=False)
    tomato = ('<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="70" rx="44" ry="38" fill="#d92b1f"/><ellipse cx="44" cy="58" rx="12" ry="8" fill="#f06a55" opacity=".7"/>'
              '<path d="M60 36c-8-10-20-8-26-2 9 0 14 3 18 8-8 0-14 4-16 10 8-5 16-5 24-2 8-3 16-3 24 2-2-6-8-10-16-10 4-5 9-8 18-8-6-6-18-8-26 2z" fill="#2f8f4e"/><path d="M60 38V24" stroke="#2f6f3e" stroke-width="5" stroke-linecap="round"/></svg>')
    return f'''<div class="ph-el ph-md rvl" data-ph-minds>
  <script type="application/json" data-md-data>{payload}</script>
  <div class="ph-el-stage">
    <div class="ph-md-part" data-md-mary>
      <p class="ph-el-src">Part 1 · Mary’s room <span lang="zh-Hant">第一部分：瑪麗的房間</span></p>
      <div class="ph-tp-text">{bi(M["intro"])}</div>
      <div class="ph-md-room" data-md-room data-open="0">
        <div class="ph-md-screen">{facts}</div>
        <div class="ph-md-win"><div class="ph-md-out">{tomato}</div><div class="ph-md-door" aria-hidden="true"><span></span></div></div>
      </div>
      <div class="ph-md-act"><button type="button" class="ph-vl-next" data-md-door disabled>{_ph_e(M["door"]["en"])} · <span lang="zh-Hant">{_ph_e(M["door"]["zh"])}</span> &rarr;</button>
        <span class="ph-el-count" data-md-count></span></div>
      <div data-md-after hidden>
        <div class="ph-tp-text"><h4>{_ph_e(M["after"]["en"])}<span lang="zh-Hant">{_ph_e(M["after"]["zh"])}</span></h4>
          <p class="ph-vl-q"><b>{_ph_e(M["q"]["en"])}</b><span lang="zh-Hant">{_ph_e(M["q"]["zh"])}</span></p></div>
        <div class="ph-vl-opts ph-tp-opts">{mopts}</div>
        <div class="ph-vl-out" aria-live="polite">{mv}</div>
      </div>
    </div>
    <div class="ph-md-part" data-md-scale>
      <p class="ph-el-src">Part 2 · The ladder of minds <span lang="zh-Hant">第二部分：心靈的階梯</span></p>
      <div class="ph-tp-text">{bi(S["intro"])}</div>
      <div class="ph-md-ends" aria-hidden="true"><span>0 · {_ph_e(S["lo"]["en"])} <i lang="zh-Hant">{_ph_e(S["lo"]["zh"])}</i></span><span>{_ph_e(S["hi"]["en"])} <i lang="zh-Hant">{_ph_e(S["hi"]["zh"])}</i> · 100</span></div>
      <div class="ph-md-rows">{rows}</div>
      <div class="ph-md-act"><button type="button" class="ph-vl-next" data-md-go disabled>{_ph_e(S["go"]["en"])} · <span lang="zh-Hant">{_ph_e(S["go"]["zh"])}</span></button>
        <span class="ph-el-count" data-md-left></span></div>
      <div class="ph-vl-out" data-md-out aria-live="polite"></div>
      <div data-md-voices hidden><p class="ph-el-src ph-md-vh">What four philosophers would say <span lang="zh-Hant">四位哲學家會怎麼說</span></p><div class="ph-md-vgrid">{voices}</div></div>
    </div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-md-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_room(lab):
    """A15：坐進房間（瑟爾的中文房間，改用喬治亞文）。照規則書比對形狀遞卡片，三回合後揭曉對話內容，再問兩題、看四種回應。"""
    R = lab["rules"]
    def bi(o, cls=""): return f'<p class="{cls}">{_ph_e(o["en"])}</p><p class="ph-zh" lang="zh-Hant">{_ph_e(o["zh"])}</p>'
    def ka(t): return f'<span class="ph-ka" lang="ka">{_ph_e(t)}</span>'
    book = "".join(f'<div class="ph-rm-rule" data-rm-rule="{i}">{ka(r["i"])}<i aria-hidden="true">&rarr;</i>{ka(r["o"])}</div>' for i, r in enumerate(R))
    tray = "".join(f'<button type="button" class="ph-rm-card" data-rm-card="{i}">{ka(R[i]["o"])}</button>' for i in lab["tray"])
    talk = "".join(
        f'<div class="ph-rm-line"><small>They wrote · 對方寫的</small>{ka(R[i]["i"])}<b>{_ph_e(R[i]["i_en"])}</b><span lang="zh-Hant">{_ph_e(R[i]["i_zh"])}</span></div>'
        f'<div class="ph-rm-line is-you"><small>You answered · 你回的</small>{ka(R[i]["o"])}<b>{_ph_e(R[i]["o_en"])}</b><span lang="zh-Hant">{_ph_e(R[i]["o_zh"])}</span></div>' for i in lab["rounds"])
    def ask(key, q, hidden=""):
        opts = "".join(f'<button type="button" class="ph-vl-opt" data-rm-opt="{key}:{o["k"]}"><b>{_ph_e(o["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(o["t"]["zh"])}</span></button>' for o in q["opts"])
        vs = "".join(f'<div class="ph-vl-card is-valid" data-rm-v="{key}:{k}" hidden>{bi(v)}</div>' for k, v in q["v"].items())
        return (f'<div class="ph-rm-ask" data-rm-ask="{key}" {hidden}><div class="ph-tp-text"><p class="ph-vl-q"><b>{_ph_e(q["q"]["en"])}</b><span lang="zh-Hant">{_ph_e(q["q"]["zh"])}</span></p></div>'
                f'<div class="ph-vl-opts ph-tp-opts">{opts}</div><div class="ph-vl-out" aria-live="polite">{vs}</div></div>')
    replies = "".join(
        f'<div class="ph-vl-card"><small class="ph-tp-k">{_ph_e(r["n"]["en"])} · <span lang="zh-Hant">{_ph_e(r["n"]["zh"])}</span></small>{bi(r["t"])}'
        f'<button type="button" class="ph-rm-more" data-rm-more aria-expanded="false">Searle’s answer · 瑟爾怎麼回 ▾</button>'
        f'<div class="ph-rm-searle" hidden>{bi(r["s"])}</div></div>' for r in lab["replies"])
    payload = html.escape(json.dumps({"rules": [{"i": r["i"]} for r in R], "rounds": lab["rounds"], "wrong": lab["wrong"]}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-rm rvl" data-ph-room>
  <script type="application/json" data-rm-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-rm-dots aria-hidden="true"></div><span class="ph-el-count" data-rm-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-rm-desk" data-rm-desk>
      <div class="ph-rm-slot"><small>Through the slot · 門縫送進來的</small><div class="ph-rm-slip" data-rm-in aria-live="polite"></div>
        <p class="ph-rm-hint">Find these shapes in the rule book. <span lang="zh-Hant">在規則書裡找出這些形狀。</span></p></div>
      <div class="ph-rm-book"><small>Rule book · 規則書</small><p class="ph-rm-hint">If the slip shows the shapes on the left, pass out the card on the right. <span lang="zh-Hant">紙條上是左邊的形狀，就遞出右邊那張卡片。</span></p>{book}</div>
      <div class="ph-rm-tray"><small>Your cards · 你手上的卡片</small><div class="ph-rm-cards">{tray}</div></div>
    </div>
    <p class="ph-rm-msg" data-rm-msg aria-live="polite"></p>
    <div data-rm-end hidden>
      <div class="ph-tp-text ph-rm-outside">{bi(lab["outside"], "ph-rm-voice")}</div>
      <div class="ph-tp-text">{bi(lab["reveal"])}</div>
      <div class="ph-rm-talk">{talk}</div>
      {ask("q1", lab["q1"])}
      {ask("q2", lab["q2"], "hidden")}
      <div data-rm-replies hidden><p class="ph-el-src ph-md-vh">Four replies to Searle <span lang="zh-Hant">對瑟爾的四種回應</span></p><div class="ph-md-vgrid">{replies}</div></div>
    </div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-rm-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_selfhunt(lab):
    """A16：把車拆開（《彌蘭王問經》車喻，讀者當彌蘭王），再做休謨的內觀三十秒、勾出找到了什麼。"""
    C, K = lab["chariot"], lab["look"]
    def bi(o, cls=""): return f'<p class="{cls}">{_ph_e(o["en"])}</p><p class="ph-zh" lang="zh-Hant">{_ph_e(o["zh"])}</p>'
    shapes = {
        "ropes": '<path d="M286 74C220 70 150 104 98 138M286 96C226 96 160 120 102 150" fill="none" stroke-width="3" stroke-dasharray="7 5"/>',
        "pole": '<path d="M280 128 96 152" fill="none" stroke-width="9" stroke-linecap="round"/>',
        "yoke": '<path d="M70 132q26-16 26 20t26 20" fill="none" stroke-width="10" stroke-linecap="round"/><path d="M64 150h64" fill="none" stroke-width="7" stroke-linecap="round"/>',
        "frame": '<path d="M272 58h134v74H272z" stroke-width="5" fill-opacity=".22"/><path d="M272 82h134M306 58v74M340 58v74M374 58v74" fill="none" stroke-width="3"/>',
        "wheel": '<circle cx="338" cy="162" r="58" fill="none" stroke-width="9"/><path d="M338 104v116M280 162h116M297 121l82 82M379 121l-82 82" fill="none" stroke-width="4"/>',
        "axle": '<circle cx="338" cy="162" r="13" stroke-width="4"/><path d="M308 162h60" fill="none" stroke-width="7" stroke-linecap="round"/>'}
    order = ["ropes", "pole", "yoke", "frame", "wheel", "axle"]
    names = {p["k"]: p["n"] for p in C["parts"]}
    svg = "".join(f'<g class="ph-sh-part" data-sh-part="{k}" tabindex="0" role="button" aria-label="{_ph_e(names[k]["en"])} · {_ph_e(names[k]["zh"])}">{shapes[k]}</g>' for k in order)
    chips = "".join(f'<span class="ph-sh-chip" data-sh-chip="{p["k"]}">{_ph_e(p["n"]["en"])} <i lang="zh-Hant">{_ph_e(p["n"]["zh"])}</i></span>' for p in C["parts"])
    copts = "".join(f'<button type="button" class="ph-vl-opt" data-sh-opt="{o["k"]}" aria-pressed="false"><b>{_ph_e(o["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(o["t"]["zh"])}</span></button>' for o in C["opts"])
    cvs = "".join(f'<div class="ph-vl-card is-valid" data-sh-v="{o["k"]}" hidden>{bi(o["v"])}</div>' for o in C["opts"])
    items = "".join(f'<button type="button" class="ph-sh-item" data-sh-item="{it["k"]}" aria-pressed="false"><b>{_ph_e(it["n"]["en"])}</b><span lang="zh-Hant">{_ph_e(it["n"]["zh"])}</span></button>' for it in K["items"])
    payload = html.escape(json.dumps({"tpl": C["tpl"], "parts": C["parts"], "reads": K["reads"]}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-sh rvl" data-ph-selfhunt>
  <script type="application/json" data-sh-data>{payload}</script>
  <div class="ph-el-stage">
    <div class="ph-md-part">
      <p class="ph-el-src">Part 1 · The chariot <span lang="zh-Hant">第一部分：車</span></p>
      <div class="ph-tp-text">{bi(C["ask"], "ph-rm-voice")}<p class="ph-rm-hint" data-sh-hint>{_ph_e(C["hint"]["en"])} <span lang="zh-Hant">{_ph_e(C["hint"]["zh"])}</span></p></div>
      <div class="ph-sh-scene"><svg viewBox="0 0 480 240" role="group" aria-label="A chariot · 一輛車"><path class="ph-sh-ground" d="M20 224h440"/>{svg}</svg></div>
      <div class="ph-sh-aside"><small>Set aside · 放到一邊的</small><div class="ph-sh-chips">{chips}</div></div>
      <p class="ph-sh-msg" data-sh-msg aria-live="polite"></p>
      <div data-sh-end hidden>
        <div class="ph-tp-text">{bi(C["empty"])}<p class="ph-vl-q"><b>{_ph_e(C["q"]["en"])}</b><span lang="zh-Hant">{_ph_e(C["q"]["zh"])}</span></p></div>
        <div class="ph-vl-opts ph-tp-opts ph-sh-opts">{copts}</div>
        <div class="ph-vl-out" aria-live="polite">{cvs}</div>
      </div>
    </div>
    <div class="ph-md-part">
      <p class="ph-el-src">Part 2 · Hume’s experiment <span lang="zh-Hant">第二部分：休謨的實驗</span></p>
      <div class="ph-tp-text">{bi(K["intro"])}</div>
      <div class="ph-md-act ph-sh-act"><button type="button" class="ph-vl-next" data-sh-start>{_ph_e(K["start"]["en"])} · <span lang="zh-Hant">{_ph_e(K["start"]["zh"])}</span></button>
        <button type="button" class="ph-el-reset" data-sh-skip>{_ph_e(K["skip"]["en"])} · <span lang="zh-Hant">{_ph_e(K["skip"]["zh"])}</span></button></div>
      <div class="ph-sh-clock" data-sh-clock hidden aria-live="off"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="ph-sh-ring" cx="60" cy="60" r="52" data-sh-ring/></svg><b data-sh-secs>30</b></div>
      <div data-sh-list hidden>
        <div class="ph-sh-items">{items}</div>
        <div class="ph-md-act"><button type="button" class="ph-vl-next" data-sh-go>{_ph_e(K["go"]["en"])} · <span lang="zh-Hant">{_ph_e(K["go"]["zh"])}</span></button></div>
        <div class="ph-vl-out" data-sh-out aria-live="polite"></div>
      </div>
    </div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-sh-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_trolley(lab):
    """A17：電車難題五個版本（轉轍器、天橋、環狀軌道、外科醫師、第三條軌道），依序作答，最後判讀答案的樣式。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("cases", "patterns", "third")}, ensure_ascii=False), quote=False)
    def fig(x, y, cls=""): return f'<g class="ph-ty-fig {cls}" transform="translate({x} {y})"><circle cy="-17" r="6.5"/><path d="M-7 12V-4a7 7 0 0 1 14 0v16z"/></g>'
    five = "".join(fig(x, 190) for x in (486, 506, 526, 546, 566))
    beds = "".join(f'<g transform="translate({x} 120)"><rect x="-26" y="-14" width="52" height="30" rx="6" class="ph-ty-bed"/><circle cx="-13" cy="1" r="7" class="ph-ty-head"/><path d="M-3 -6h24v14h-24z" class="ph-ty-sheet"/></g>' for x in (130, 200, 270, 340, 410))
    return f'''<div class="ph-el ph-ty rvl" data-ph-trolley data-scene="switch">
  <script type="application/json" data-tr-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-tr-dots aria-hidden="true"></div><span class="ph-el-count" data-tr-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-ty-scene" aria-hidden="true"><svg viewBox="0 0 640 300">
      <g class="ph-ty-tracks">
        <path class="ph-ty-rail" data-tr-path="main" d="M30 190H610"/>
        <path class="ph-ty-rail s-switch s-three" data-tr-path="side" d="M250 190C305 190 330 100 400 100H610"/>
        <path class="ph-ty-rail s-loop" data-tr-path="loop" d="M250 190C305 190 330 96 400 96H560C628 96 628 190 590 190"/>
        <path class="ph-ty-rail s-three" data-tr-path="right" d="M250 190C305 190 330 276 400 276H610"/>
        <g class="s-switch s-loop s-three"><circle cx="236" cy="222" r="7" class="ph-ty-knob"/><path d="M236 222l16-26" class="ph-ty-lever"/></g>
        <g class="s-bridge"><rect x="306" y="120" width="44" height="140" rx="4" class="ph-ty-bridge"/><path d="M306 150h44M306 230h44" class="ph-ty-bline"/></g>
        <g data-tr-fig="five">{five}</g>
        <g data-tr-fig="one" class="s-switch s-three">{fig(520, 100)}</g>
        <g data-tr-fig="lone" class="s-loop">{fig(470, 96, "is-big")}</g>
        <g data-tr-fig="you" class="s-three">{fig(520, 276, "is-you")}<text x="536" y="258" class="ph-ty-lbl">you · 你</text></g>
        <g data-tr-fig="big" class="s-bridge">{fig(328, 150, "is-big")}</g>
        <g class="s-bridge">{fig(328, 232, "is-you")}<text x="356" y="238" class="ph-ty-lbl">you · 你</text></g>
        <g class="ph-ty-car" data-tr-car><rect x="-26" y="-13" width="52" height="26" rx="6"/><path d="M-14 -13v26M0 -13v26M14 -13v26"/></g>
      </g>
      <g class="ph-ty-ward s-ward" transform="translate(0 30)">{beds}{fig(520, 124, "is-you")}<text x="495" y="160" class="ph-ty-lbl">visitor · 訪客</text><text x="270" y="170" text-anchor="middle" class="ph-ty-lbl">five patients · 五位病人</text></g>
    </svg></div>
    <div class="ph-tp-text" data-tr-text aria-live="polite"></div>
    <div class="ph-vl-opts ph-tp-opts ph-ty-opts" data-tr-opts></div>
    <div class="ph-vl-out" data-tr-out aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-tr-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-tr-next hidden>Next case · 下一個案例 &rarr;</button></div>
  </div>
</div>'''

def _ph_lab_advisers(lab):
    """A18：三個兩難、四位顧問（彌爾、康德、亞里斯多德、孔子）。先自己選，再看四人的建議與理由，最後統計最常跟誰一致。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("who", "cases", "end")}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-av rvl" data-ph-advisers>
  <script type="application/json" data-av-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-av-dots aria-hidden="true"></div><span class="ph-el-count" data-av-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-tp-text" data-av-text aria-live="polite"></div>
    <div class="ph-vl-opts ph-tp-opts" data-av-opts></div>
    <div class="ph-av-grid" data-av-out aria-live="polite"></div>
    <div data-av-end></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-av-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-av-next hidden>Next case · 下一個案例 &rarr;</button></div>
  </div>
</div>'''

def _ph_lab_ring(lab):
    """A19：戴上戒指（蓋吉斯的戒指）。四個沒人看見的情境，選做或不做；不做就選最主要的理由；最後看是哪一種理由在起作用。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("do", "dont", "why", "reasons", "scenes", "ends")}, ensure_ascii=False), quote=False)
    def bi(o, cls=""): return f'<p class="{cls}">{_ph_e(o["en"])}</p><p class="ph-zh" lang="zh-Hant">{_ph_e(o["zh"])}</p>'
    return f'''<div class="ph-el ph-rg rvl" data-ph-ring data-on="0">
  <script type="application/json" data-rg-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-rg-dots aria-hidden="true"></div><span class="ph-el-count" data-rg-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-rg-top">
      <svg class="ph-rg-art" viewBox="0 0 220 150" aria-hidden="true">
        <g class="ph-rg-fig"><circle cx="70" cy="42" r="20"/><path d="M36 140V96c0-20 15-34 34-34s34 14 34 34v44z"/></g>
        <g class="ph-rg-ring"><ellipse cx="164" cy="92" rx="30" ry="34"/><ellipse cx="164" cy="92" rx="20" ry="24" class="ph-rg-hole"/><path class="ph-rg-gem" d="M164 44l12 12-12 12-12-12z"/></g>
      </svg>
      <div class="ph-tp-text"><button type="button" class="ph-vl-next" data-rg-turn>{_ph_e(lab["turn"]["en"])} · <span lang="zh-Hant">{_ph_e(lab["turn"]["zh"])}</span></button>
        <div data-rg-turned hidden>{bi(lab["turned"], "ph-rm-voice")}</div></div>
    </div>
    <div data-rg-body hidden>
      <div class="ph-tp-text" data-rg-text aria-live="polite"></div>
      <div class="ph-vl-opts ph-tp-opts" data-rg-opts></div>
      <div data-rg-why hidden><div class="ph-tp-text"><p class="ph-vl-q"><b>{_ph_e(lab["why"]["en"])}</b><span lang="zh-Hant">{_ph_e(lab["why"]["zh"])}</span></p></div><div class="ph-vl-opts ph-rg-reasons" data-rg-reasons></div></div>
      <div data-rg-end aria-live="polite"></div>
    </div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-rg-reset>Start again · 重來</button>
      <button type="button" class="ph-vl-next" data-rg-next hidden>Next · 下一個情境 &rarr;</button></div>
  </div>
</div>'''

def _ph_lab_evidence(lab):
    """A20：六份證據。先用滑桿表態（性惡↔性善），每讀一份證據就可以調整並記下；最後畫出立場的軌跡，指出哪一份最推得動你。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("start", "cards", "ends", "lo", "hi")}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-ev rvl" data-ph-evidence>
  <script type="application/json" data-ev-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-ev-dots aria-hidden="true"></div><span class="ph-el-count" data-ev-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-tp-text" data-ev-text aria-live="polite"></div>
    <div class="ph-ev-reads" data-ev-reads></div>
    <div class="ph-ev-slide" data-ev-slide>
      <div class="ph-md-ends" aria-hidden="true"><span>0 · {_ph_e(lab["lo"]["en"])} <i lang="zh-Hant">{_ph_e(lab["lo"]["zh"])}</i></span><span>{_ph_e(lab["hi"]["en"])} <i lang="zh-Hant">{_ph_e(lab["hi"]["zh"])}</i> · 100</span></div>
      <div class="ph-md-row ph-ev-row"><input type="range" min="0" max="100" step="1" value="50" data-ev-range aria-label="Human nature: born bad to born good · 人性：性惡到性善"><output data-ev-val>50</output></div>
      <div class="ph-md-act"><button type="button" class="ph-vl-next" data-ev-rec>{_ph_e(lab["record"]["en"])} · <span lang="zh-Hant">{_ph_e(lab["record"]["zh"])}</span> &rarr;</button></div>
    </div>
    <div data-ev-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-ev-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_machine(lab):
    """A21：體驗機。先選機器裡的人生（最多五項），再回答四題（一輩子、兩年、反過來、你的孩子），最後判讀你除了感覺好之外還在乎什麼。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("qs", "ends")}, ensure_ascii=False), quote=False)
    menu = "".join(f'<button type="button" class="ph-sh-item" data-mc-item="{i}" aria-pressed="false"><b>{_ph_e(m["en"])}</b><span lang="zh-Hant">{_ph_e(m["zh"])}</span></button>' for i, m in enumerate(lab["menu"]))
    return f'''<div class="ph-el ph-mc ph-sh rvl" data-ph-machine data-in="0">
  <script type="application/json" data-mc-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-mc-dots aria-hidden="true"></div><span class="ph-el-count" data-mc-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-mc-tank" aria-hidden="true"><svg viewBox="0 0 320 120"><rect class="ph-mc-glass" x="40" y="14" width="240" height="92" rx="46"/><path class="ph-mc-water" d="M52 60q30-10 60 0t60 0 60 0 36 0v20a34 34 0 0 1-34 34H86a34 34 0 0 1-34-34z"/>
      <g class="ph-mc-body"><circle cx="110" cy="62" r="13"/><rect x="124" y="54" width="92" height="16" rx="8"/></g><path class="ph-mc-wire" d="M110 49C110 20 150 6 180 6h90"/><circle class="ph-mc-lamp" cx="276" cy="6" r="5"/></svg></div>
    <div data-mc-pick>
      <div class="ph-tp-text"><p class="ph-vl-q"><b>{_ph_e(lab["pick"]["en"])}</b><span lang="zh-Hant">{_ph_e(lab["pick"]["zh"])}</span></p></div>
      <div class="ph-sh-items">{menu}</div>
      <div class="ph-md-act"><button type="button" class="ph-vl-next" data-mc-ready disabled>{_ph_e(lab["ready"]["en"])} · <span lang="zh-Hant">{_ph_e(lab["ready"]["zh"])}</span> &rarr;</button><span class="ph-el-count" data-mc-n></span></div>
    </div>
    <div data-mc-ask hidden>
      <div class="ph-tp-text" data-mc-text aria-live="polite"></div>
      <div class="ph-vl-opts ph-tp-opts" data-mc-opts></div>
    </div>
    <div data-mc-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-mc-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_sort(lab):
    """A22：十二件事、三個籃子（在我／部分在我／不在我）。分完之後跟愛比克泰德（兩個籃子）與厄文（三個）對照。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("bins", "cards", "who", "ends")}, ensure_ascii=False), quote=False)
    bins = "".join(f'<button type="button" class="ph-so-bin is-{b["k"]}" data-so-bin="{b["k"]}"><b>{_ph_e(b["t"]["en"])}</b><span lang="zh-Hant">{_ph_e(b["t"]["zh"])}</span><i data-so-n="{b["k"]}">0</i></button>' for b in lab["bins"])
    return f'''<div class="ph-el ph-so rvl" data-ph-sort>
  <script type="application/json" data-so-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots ph-so-dots" data-so-dots aria-hidden="true"></div><span class="ph-el-count" data-so-count></span></div>
  <div class="ph-el-stage">
    <div data-so-play>
      <div class="ph-so-card" data-so-card aria-live="polite"></div>
      <div class="ph-so-bins">{bins}</div>
    </div>
    <div data-so-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-so-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_friends(lab):
    """A23：三位朋友。對每一位回答六題，依亞里斯多德歸成有用／快樂／品格（或還在路上），並標出《論語》益者三友的標記；最後比較。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("names", "qs", "yes", "no", "kinds", "marks", "again", "done", "end")}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-fr rvl" data-ph-friends>
  <script type="application/json" data-fr-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots" data-fr-dots aria-hidden="true"></div><span class="ph-el-count" data-fr-count></span></div>
  <div class="ph-el-stage">
    <div data-fr-ask>
      <div class="ph-tp-text" data-fr-text aria-live="polite"></div>
      <div class="ph-vl-opts ph-tp-opts" data-fr-opts></div>
    </div>
    <div class="ph-vl-out" data-fr-out aria-live="polite"></div>
    <div class="ph-md-act" data-fr-act hidden><button type="button" class="ph-vl-next" data-fr-again></button><button type="button" class="ph-el-reset" data-fr-done></button></div>
    <div data-fr-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-fr-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_pond(lab):
    """A24：六個池塘。每一步只加一項真實世界的特徵（距離、旁人、規模、不確定、重複），答到第一個「沒有義務」為止，指出是哪一項特徵讓你停下來。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("yes", "no", "steps", "ends")}, ensure_ascii=False), quote=False)
    def bi(o, cls=""): return f'<p class="{cls}">{_ph_e(o["en"])}</p><p class="ph-zh" lang="zh-Hant">{_ph_e(o["zh"])}</p>'
    chips = "".join(f'<span class="ph-pd-chip" data-pd-chip="{i}"><b>{i + 1}</b>{_ph_e(st["f"]["en"])} <i lang="zh-Hant">{_ph_e(st["f"]["zh"])}</i></span>' for i, st in enumerate(lab["steps"]))
    voices = "".join(f'<div class="ph-vl-card"><small class="ph-tp-k">{_ph_e(v["who"]["en"])} · <span lang="zh-Hant">{_ph_e(v["who"]["zh"])}</span></small>{bi(v["t"])}</div>' for v in lab["voices"])
    return f'''<div class="ph-el ph-pd rvl" data-ph-pond>
  <script type="application/json" data-pd-data>{payload}</script>
  <div class="ph-el-stage">
    <div class="ph-pd-ladder" aria-hidden="true">{chips}</div>
    <div data-pd-ask>
      <div class="ph-tp-text" data-pd-text aria-live="polite"></div>
      <div class="ph-vl-opts ph-tp-opts" data-pd-opts></div>
    </div>
    <div class="ph-vl-out" data-pd-out aria-live="polite"></div>
    <div data-pd-voices hidden><p class="ph-el-src ph-md-vh">Where four philosophers draw the line <span lang="zh-Hant">四位哲學家把線劃在哪裡</span></p><div class="ph-md-vgrid">{voices}</div></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-pd-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_commons(lab):
    """A25：公共的鍋（公共財遊戲）。你與三位電腦玩家，前五輪沒有規則、後五輪可以彼此罰款；畫出十輪的平均投入，再問要不要把懲罰交給第五個人。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("names", "phase", "ask", "put", "next", "fine", "fineNote", "mid", "ends", "q", "qopts")}, ensure_ascii=False), quote=False)
    return f'''<div class="ph-el ph-cm rvl" data-ph-commons>
  <script type="application/json" data-cm-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots ph-so-dots" data-cm-dots aria-hidden="true"></div><span class="ph-el-count" data-cm-count></span></div>
  <div class="ph-el-stage">
    <div class="ph-cm-chart" data-cm-chart aria-hidden="true"></div>
    <div class="ph-cm-table" data-cm-table></div>
    <div data-cm-play>
      <div class="ph-tp-text" data-cm-text aria-live="polite"></div>
      <div class="ph-ev-slide" data-cm-in>
        <div class="ph-md-row ph-ev-row ph-cm-row"><input type="range" min="0" max="10" step="1" value="5" data-cm-range aria-label="Tokens to contribute · 要投入的代幣數"><output data-cm-val>5</output></div>
        <div class="ph-md-act"><button type="button" class="ph-vl-next" data-cm-put></button></div>
      </div>
      <div class="ph-md-act" data-cm-after hidden><button type="button" class="ph-vl-next" data-cm-next></button><span class="ph-el-count" data-cm-note></span></div>
    </div>
    <div data-cm-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-cm-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab_veil(lab):
    """A26：在知道之前先選（無知之幕）。四種分配方案、五個位置；知道自己在頂層選一次、在底層選一次、在幕後選一次，再抽籤揭曉位置。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("unit", "pos", "plans", "avg", "steps", "draw", "heads", "rowlab", "moved", "same", "verdicts", "lift", "nozick")}, ensure_ascii=False), quote=False)
    return f"""<div class="ph-el ph-vi rvl" data-ph-veil>
  <script type="application/json" data-vi-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots ph-so-dots" data-vi-dots aria-hidden="true"></div><span class="ph-el-count" data-vi-count></span></div>
  <div class="ph-el-stage">
    <div data-vi-play>
      <div class="ph-tp-text" data-vi-text aria-live="polite"></div>
      <div class="ph-vi-plans" data-vi-plans></div>
      <div class="ph-md-act" data-vi-act hidden><button type="button" class="ph-vl-next" data-vi-draw></button></div>
    </div>
    <div data-vi-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-vi-reset>Start again · 重來</button></div>
  </div>
</div>"""

def _ph_lab_liberty(lab):
    """A27：你來立法。九個案例，各選「禁止／不去管」，每題之後看彌爾怎麼判；結尾指出你實際在用的原則（家長主義、冒犯、道德主義、比彌爾更放任）。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("ban", "allow", "next", "finish", "mill", "you", "cases", "score", "flags", "close")}, ensure_ascii=False), quote=False)
    return f"""<div class="ph-el ph-lb rvl" data-ph-liberty>
  <script type="application/json" data-lb-data>{payload}</script>
  <div class="ph-vl-top"><div class="ph-vl-dots ph-so-dots" data-lb-dots aria-hidden="true"></div><span class="ph-el-count" data-lb-count></span></div>
  <div class="ph-el-stage">
    <div data-lb-play>
      <div class="ph-tp-text" data-lb-text aria-live="polite"></div>
      <div class="ph-lb-btns" data-lb-btns></div>
      <div class="ph-vl-out" data-lb-out aria-live="polite"></div>
      <div class="ph-md-act" data-lb-act hidden><button type="button" class="ph-vl-next" data-lb-next></button></div>
    </div>
    <div data-lb-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-lb-reset>Start again · 重來</button></div>
  </div>
</div>"""

def _ph_lab_jury(lab):
    """A28：孔多塞的陪審團。調每人答對的機率、人數、跟風的比例，看多數決答對的機率；找出三件事之後回答最後一題。"""
    payload = html.escape(json.dumps({k: lab[k] for k in ("lp", "ln", "lc", "one", "maj", "vote", "res_ok", "res_no", "todo", "finds", "q", "qopts")}, ensure_ascii=False), quote=False)
    def row(key, attrs, lab_):
        return f'''<label class="ph-jy-ctl"><span><b>{html.escape(lab_["en"])}</b><i lang="zh-Hant">{html.escape(lab_["zh"])}</i></span><input type="range" {attrs} data-jy-{key}><output data-jy-{key}-out></output></label>'''
    return f'''<div class="ph-el ph-jy rvl" data-ph-jury>
  <script type="application/json" data-jy-data>{payload}</script>
  <div class="ph-el-stage">
    <div class="ph-jy-top">
      <div class="ph-jy-ctls">
        {row("p", 'min="30" max="90" step="1" value="50"', lab["lp"])}
        {row("n", 'min="0" max="6" step="1" value="2"', lab["ln"])}
        {row("c", 'min="0" max="100" step="10" value="0"', lab["lc"])}
      </div>
      <div class="ph-jy-bars" aria-live="polite">
        <div class="ph-jy-bar"><span><b>{html.escape(lab["one"]["en"])}</b><i lang="zh-Hant">{html.escape(lab["one"]["zh"])}</i></span><div><u data-jy-b1></u></div><em data-jy-v1></em></div>
        <div class="ph-jy-bar is-maj"><span><b>{html.escape(lab["maj"]["en"])}</b><i lang="zh-Hant">{html.escape(lab["maj"]["zh"])}</i></span><div><u data-jy-b2></u></div><em data-jy-v2></em></div>
      </div>
    </div>
    <div class="ph-md-act"><button type="button" class="ph-vl-next" data-jy-vote></button><span class="ph-el-count" data-jy-res aria-live="polite"></span></div>
    <div class="ph-jy-dots" data-jy-dots aria-hidden="true"></div>
    <div class="ph-jy-finds" data-jy-finds></div>
    <div data-jy-end aria-live="polite"></div>
    <div class="ph-el-foot"><button type="button" class="ph-el-reset" data-jy-reset>Start again · 重來</button></div>
  </div>
</div>'''

def _ph_lab(lab):
    if lab.get("kind") == "jury": return _ph_lab_jury(lab)
    if lab.get("kind") == "liberty": return _ph_lab_liberty(lab)
    if lab.get("kind") == "veil": return _ph_lab_veil(lab)
    if lab.get("kind") == "commons": return _ph_lab_commons(lab)
    if lab.get("kind") == "pond": return _ph_lab_pond(lab)
    if lab.get("kind") == "friends": return _ph_lab_friends(lab)
    if lab.get("kind") == "sort": return _ph_lab_sort(lab)
    if lab.get("kind") == "machine": return _ph_lab_machine(lab)
    if lab.get("kind") == "evidence": return _ph_lab_evidence(lab)
    if lab.get("kind") == "ring": return _ph_lab_ring(lab)
    if lab.get("kind") == "advisers": return _ph_lab_advisers(lab)
    if lab.get("kind") == "trolley": return _ph_lab_trolley(lab)
    if lab.get("kind") == "selfhunt": return _ph_lab_selfhunt(lab)
    if lab.get("kind") == "room": return _ph_lab_room(lab)
    if lab.get("kind") == "minds": return _ph_lab_minds(lab)
    if lab.get("kind") == "teleport": return _ph_lab_teleport(lab)
    if lab.get("kind") == "now": return _ph_lab_now(lab)
    if lab.get("kind") == "demon": return _ph_lab_demon(lab)
    if lab.get("kind") == "river": return _ph_lab_river(lab)
    if lab.get("kind") == "ship": return _ph_lab_ship(lab)
    if lab.get("kind") == "chicken": return _ph_lab_chicken(lab)
    if lab.get("kind") == "meno": return _ph_lab_meno(lab)
    if lab.get("kind") == "cave": return _ph_lab_cave(lab)
    if lab.get("kind") == "doubt": return _ph_lab_doubt(lab)
    if lab.get("kind") == "zeno": return _ph_lab_zeno(lab)
    if lab.get("kind") == "validity": return _ph_lab_validity(lab)
    if lab.get("kind") == "fallacy": return _ph_lab_fallacy(lab)
    """蘇格拉底式詰問：三個對話錄、每個三個定義；資料塞進 JSON，由 philosophy.js 接手。"""
    payload = html.escape(json.dumps(lab["dialogues"], ensure_ascii=False), quote=False)
    tabs = "".join(f'<button type="button" role="tab" class="ph-el-tab" data-el-tab="{d["key"]}" aria-selected="{"true" if i == 0 else "false"}">'
                   f'<b>{_ph_e(d["en"])}</b><span lang="zh-Hant">{_ph_e(d["zh"])}</span><i>{_ph_e(d["greek"])}</i></button>'
                   for i, d in enumerate(lab["dialogues"]))
    tests = "".join(f'<li class="rvl"><span class="ph-test-n">{i+1}</span><div>{_ph_bi(t, say=False)}</div></li>' for i, t in enumerate(lab["tests"]))
    return f'''<div class="ph-el rvl" data-ph-elenchus>
  <script type="application/json" data-el-data>{payload}</script>
  <div class="ph-el-tabs" role="tablist" aria-label="Choose a question · 選一個問題">{tabs}</div>
  <div class="ph-el-stage">
    <div class="ph-el-scene"><p class="ph-el-src" data-el-src></p><p class="ph-el-who" data-el-who></p></div>
    <div class="ph-el-ask"><span class="ph-el-av" aria-hidden="true">Σ</span>
      <p class="ph-el-q"><b data-el-q></b><span lang="zh-Hant" data-el-qzh></span></p></div>
    <p class="ph-el-hint" data-el-hint>Choose the answer you find most convincing. · 選一個你覺得最有說服力的答案。</p>
    <div class="ph-el-defs" data-el-defs></div>
    <div class="ph-el-log" data-el-log aria-live="polite"></div>
    <div class="ph-el-end" data-el-end hidden></div>
    <div class="ph-el-foot"><span class="ph-el-count" data-el-count></span>
      <button type="button" class="ph-el-reset" data-el-reset>Start again · 重來</button></div>
  </div>
</div>
<div class="ph-tests">
  <h3 class="rvl">Five tests for any definition <span class="ph-h2-zh">檢驗任何定義的五個問題</span></h3>
  <ol class="ph-test-list">{tests}</ol>
  <div class="ph-own rvl">
    {_ph_bi({"en": lab["own_en"], "zh": lab["own_zh"]}, say=False)}
    <textarea data-ph-own rows="3" placeholder="Friendship is …" aria-label="Your definition · 你的定義"></textarea>
    <div class="ph-own-checks" data-ph-own-checks></div>
  </div>
</div>'''

def _ph_argument(a):
    steps = "".join(
        f'<button type="button" class="ph-arg-step{" is-c" if s["k"] == "C" else ""}{" is-weak" if s.get("weak") else ""}" aria-expanded="false">'
        f'<span class="ph-arg-k">{"∴" if s["k"] == "C" else s["k"]}</span>'
        f'<span class="ph-arg-b"><span class="ph-arg-en">{_ph_e(s["en"])}</span><span class="ph-zh" lang="zh-Hant">{_ph_e(s["zh"])}</span>'
        f'<span class="ph-arg-ob"><b>{"The step most often attacked" if s.get("weak") else "What can be said against it"} · {"最常被攻擊的一步" if s.get("weak") else "可以怎麼反對"}</b>'
        f'{_ph_e(s["ob_en"])}<span class="ph-zh" lang="zh-Hant">{_ph_e(s["ob_zh"])}</span></span></span>'
        f'<span class="ph-arg-plus" aria-hidden="true">+</span></button>' for s in a["steps"])
    return f'<div class="ph-arg rvl" data-ph-arg>{steps}</div>'

def _ph_source(s):
    ps = "".join(
        f'<figure class="ph-src rvl"><blockquote><p>{_ph_say(p["en"])}{_ph_e(p["en"])}</p></blockquote>'
        f'<figcaption>{_ph_e(p["ref"])}</figcaption>'
        f'<p class="ph-zh ph-src-zh" lang="zh-Hant">{_ph_e(p["zh"])}</p>'
        f'<div class="ph-src-note"><b>Close reading · 精讀</b>{_ph_bi({"en": p["note_en"], "zh": p["note_zh"]}, say=False)}</div></figure>'
        for p in s["passages"])
    return f'<p class="ph-src-work rvl"><b>{_ph_e(s["work"])}</b> <span lang="zh-Hant">{_ph_e(s["work_zh"])}</span> · {_ph_e(s["tr"])}</p>{ps}'

def _ph_objections(o):
    return '<div class="ph-objs">' + "".join(
        f'<div class="ph-obj rvl"><div class="ph-obj-o"><span class="ph-obj-k">Objection {i+1} · 反駁</span>'
        f'{_ph_bi({"en": x["o_en"], "zh": x["o_zh"]}, say=False)}</div>'
        f'<div class="ph-obj-r"><span class="ph-obj-k">Reply · 回應</span>{_ph_bi({"en": x["r_en"], "zh": x["r_zh"]}, say=False)}</div></div>'
        for i, x in enumerate(o["items"])) + '</div>'

def _ph_essay(secs, numbered=True):
    out = []
    for i, s in enumerate(secs):
        num = f'<span class="ph-es-n">{i+1:02d}</span>' if numbered else ""
        out.append(f'<div class="ph-es-sec rvl"><h3>{num}{_ph_e(s["h_en"])} <span class="ph-h2-zh">{_ph_e(s["h_zh"])}</span></h3>'
                   + "".join(_ph_bi(p, cls="ph-first" if (i == 0 and j == 0) else "") for j, p in enumerate(s["paras"])) + '</div>')
    return f'<div class="ph-essay">{"".join(out)}</div>'

def _ph_nav(prev=None, nxt=None):
    def side(x, dirn, label):
        if not x: return '<span class="pm-nav-x"></span>'
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{x[0]}"><span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{_ph_e(x[1])}</span></a>')
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "Previous · 上一篇")}'
            f'<a class="pm-nav-hub" href="{PHIL_BASE}">&#9776; All of Philosophy · 回哲學</a>{side(nxt, "next", "Next · 下一篇")}</nav>')

def _ph_adjacent(L):
    ls = PHIL["lessons"]; i = ls.index(L)
    link = lambda x: (f'{PHIL_BASE}{x["slug"]}/', f'{x["n"]} · {x["title"]}')
    return (link(ls[i - 1]) if i > 0 else None, link(ls[i + 1]) if i < len(ls) - 1 else None)

def build_phil_lesson(L):
    path = f'{PHIL_BASE}{L["slug"]}/'
    words = sum(len(p["en"].split()) for s in L["essay"] for p in s["paras"])
    hero_lead = (f'{_ph_e(L["blurb_en"])}<br><span class="muted" lang="zh-Hant">{_ph_e(L["blurb_zh"])}</span>')
    meta = (f'<div class="ph-meta rvl"><span><b>{_ph_e(L["n"])}</b> Big Questions · 大哉問</span><span>{_ph_e(L["unit_en"])} · {_ph_e(L["unit_zh"])}</span>'
            f'<span>{_ph_e(L["level"])}</span><span>{words:,} words · about {L["minutes"]} min</span></div>')
    write_list = "".join(f'<li class="rvl">{_ph_bi(w, say=False)}</li>' for w in L["write"])
    body = f'''
{page_hero(f'{L["n"]} · {_ph_e(L["unit_en"])} {_ph_e(L["unit_zh"])}', f'{_ph_e(L["title"])} <span class="ph-h1-zh">{_ph_e(L["title_zh"])}</span>', hero_lead, back=(PHIL_BASE, "Philosophy · 回哲學"))}
{_ph_toolbar()}
<section class="section tight ph-top"><div class="wrap">
  {meta}
  <div class="ph-big rvl d1"><span class="ph-big-k">The big idea · 大觀念</span>
    <p class="ph-big-en">{_ph_e(L["big_en"])}</p><p class="ph-big-zh" lang="zh-Hant">{_ph_e(L["big_zh"])}</p></div>
  <p class="ph-trnote rvl d2"><b>中文翻譯</b><span>Every paragraph has a Chinese translation. Tap <span class="ph-tr"><span>中譯</span><i>▾</i></span> under a paragraph to open that one, or use <strong>Show Chinese · 顯示中譯</strong> at the top to open them all.</span>
    <span lang="zh-Hant">每一段都有中譯：點段落下方的「中譯」只開那一段，或按上方的「顯示中譯」一次全部打開。</span></p>
</div></section>
{_ph_sec("essay", "Essay", "The essay · 課文", L["title"], L["title_zh"], _ph_essay(L["essay"]))}
{_ph_sec("try", "Try it", "Thought experiment · 思想實驗", L["lab"]["title_en"], L["lab"]["title_zh"], _ph_lab(L["lab"]), band=True, lead={"en": L["lab"]["lead_en"], "zh": L["lab"]["lead_zh"]})}
{_ph_sec("argument", "Argument", "Standard form · 標準形式", L["argument"]["title_en"], L["argument"]["title_zh"], _ph_argument(L["argument"]), lead={"en": L["argument"]["lead_en"], "zh": L["argument"]["lead_zh"]})}
{_ph_sec("source", "Source", "Primary text · 原典", L["source"]["title_en"], L["source"]["title_zh"], _ph_source(L["source"]) + _ph_said(L["said"]), band=True, lead={"en": L["source"]["lead_en"], "zh": L["source"]["lead_zh"]})}
{_ph_sec("objections", "Objections", "Both sides · 正反兩面", L["objections"]["title_en"], L["objections"]["title_zh"], _ph_objections(L["objections"]))}
{_ph_sec("terms", "Terms", "Terms of art · 哲學術語", "The vocabulary of the subject", "這門學問的用語", _ph_terms(L["terms"]), band=True)}
{_ph_sec("vocab", "English", "Advanced English · 高級英文", "Words and phrases worth keeping", "值得帶走的字與片語", _ph_vocab(L["vocab"]))}
{_ph_sec("quiz", "Check", "Reading check · 理解測驗", "Did it land?", "讀懂了嗎", _ph_quiz(L["quiz"], L["slug"]) + f'<h3 class="ph-write-h rvl">Write · 你怎麼想？</h3><ol class="ph-write">{write_list}</ol>', band=True)}
{_ph_sec("dharma", "Dharma", "Dharma and the West · 佛法與西方哲學", L["dharma"]["title_en"], L["dharma"]["title_zh"], _ph_dharma(L["dharma"]))}
<section class="section band ph-sec" id="more" data-ph-toc-label="More"><div class="wrap">
  <p class="eyebrow rvl">Go further · 延伸</p>
  <h2 class="rvl d1 sweep">People and reading <span class="ph-h2-zh">人物與延伸閱讀</span></h2>
  {_ph_people_cards(L["people"])}
  {_ph_further(L["further"])}
  {_ph_nav(*_ph_adjacent(L))}
</div></section>
'''
    say_slug = f'philosophy-{L["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{L["title"]} {L["title_zh"]}', f'{L["blurb_en"]} {L["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_ph_head(L["lab"].get("kind"))))
    return path

def build_phil_dharma(D):
    """書架 D：佛法與西方哲學對照。固定六段：佛法怎麼說、標準形式、西方最接近的說法、判定、佛法多走的一步、對西方人怎麼講。"""
    path = f'{PHIL_BASE}dharma/{D["slug"]}/'
    t = D["term"]
    out = []
    for i, sec in enumerate(D["sections"]):
        inner = ""
        if sec.get("paras"): inner += f'<div class="ph-essay">{"".join(_ph_bi(p, cls="ph-first" if (i == 0 and j == 0) else "") for j, p in enumerate(sec["paras"]))}</div>'
        if sec.get("steps"): inner += _ph_argument({"steps": sec["steps"]})
        if sec.get("cards"):
            cards = ""
            for c in sec["cards"]:
                nm = (f'<a href="{PHIL_BASE}philosophers/{c["slug"]}/">{_ph_e(c["name"])}</a>' if c.get("slug") else _ph_e(c["name"]))
                cards += (f'<article class="ph-dw-card rvl"><p class="ph-dw-role">{_ph_e(c["role"]["en"])} · <span lang="zh-Hant">{_ph_e(c["role"]["zh"])}</span></p>'
                          f'<h3>{nm} <span class="ph-h2-zh">{_ph_e(c["name_zh"])}</span><i>{_ph_e(c["date"])}</i></h3>{_ph_bi(c["text"])}</article>')
            inner += f'<div class="ph-dw-cards">{cards}</div>'
        if sec.get("table"):
            tb = sec["table"]
            head = "".join(f'<th>{_ph_e(en)}<span lang="zh-Hant">{_ph_e(zh)}</span></th>' for en, zh in tb["cols"])
            rows = "".join(
                f'<tr><th>{_ph_e(q["en"])}<span lang="zh-Hant">{_ph_e(q["zh"])}</span></th>'
                + "".join(f'<td>{_ph_e(c["en"])}<span lang="zh-Hant">{_ph_e(c["zh"])}</span></td>' for c in cells) + '</tr>' for q, cells in tb["rows"])
            inner += f'<div class="ph-dw-tablewrap rvl"><table class="ph-dw-table"><thead><tr><th></th>{head}</tr></thead><tbody>{rows}</tbody></table></div>'
        if sec.get("lines"):
            inner += ('<h3 class="ph-dw-sub rvl">Sentences you can use <span class="ph-h2-zh">可以直接用的句子</span></h3><ol class="ph-dw-lines">'
                      + "".join(f'<li class="rvl">{_ph_bi(l)}</li>' for l in sec["lines"]) + '</ol>')
        if sec.get("avoid"):
            inner += ('<h3 class="ph-dw-sub rvl">Phrases to avoid <span class="ph-h2-zh">要避開的說法</span></h3><div class="ph-dw-avoid">'
                      + "".join(f'<div class="rvl"><p class="ph-dw-x">{_ph_e(a["en"])} <span lang="zh-Hant">{_ph_e(a["zh"])}</span></p>{_ph_bi(b, say=False)}</div>' for a, b in sec["avoid"]) + '</div>')
        out.append(_ph_sec(sec["id"], sec["toc"], sec["eyebrow"], sec["h"]["en"], sec["h"]["zh"], inner, band=(i % 2 == 1)))
    terms = "".join(f'<tr><td lang="zh-Hant">{_ph_e(zh)}</td><td><i>{_ph_e(pa)}</i></td><td><i>{_ph_e(sk)}</i></td><td>{_ph_e(en)}</td></tr>' for zh, pa, sk, en in D["terms"])
    rel = D["related"]
    rel_lessons = "".join(
        f'<a class="ph-pcard rvl" href="{PHIL_BASE}{l["slug"]}/"><span class="ph-pcard-mono" aria-hidden="true">?</span>'
        f'<span class="ph-pcard-b"><b>{_ph_e(l["title"])} <span lang="zh-Hant">{_ph_e(l["title_zh"])}</span></b><i>{_ph_e(l["n"])} · Big Questions 大哉問</i>'
        f'<span>{_ph_e(l["blurb_en"])}</span></span><span class="ph-go">Read the lesson · 讀這一課 &rarr;</span></a>' for l in map(_ph_lesson, rel["lessons"]))
    write_list = "".join(f'<li class="rvl">{_ph_bi(w, say=False)}</li>' for w in D["write"])
    hero_lead = f'{_ph_e(D["blurb_en"])}<br><span class="muted" lang="zh-Hant">{_ph_e(D["blurb_zh"])}</span>'
    body = f'''
{page_hero(f'{D["n"]} · Dharma and the West 佛法與西方哲學', f'{_ph_e(D["title"])} <span class="ph-h1-zh">{_ph_e(D["title_zh"])}</span>', hero_lead, back=(PHIL_BASE + "#shelf-dharma", "Dharma and the West · 回佛法與西方哲學"))}
{_ph_toolbar()}
<section class="section tight ph-top"><div class="wrap">
  <div class="ph-meta rvl"><span><b>{_ph_e(D["n"])}</b> Dharma and the West · 佛法與西方哲學</span><span>{_ph_e(D["group_en"])} · {_ph_e(D["group_zh"])}</span><span>{_ph_e(D["level"])}</span><span>about {D["minutes"]} min</span></div>
  <div class="ph-dw-term rvl d1"><span lang="zh-Hant">{_ph_e(t["zh"])}</span><div><i>{_ph_e(t["pali"])}</i> <small>Pāli</small>　<i>{_ph_e(t["skt"])}</i> <small>Sanskrit</small><b>{_ph_e(t["en"])}</b></div></div>
  <div class="ph-big rvl d1"><span class="ph-big-k">The verdict · 判定</span>
    <p class="ph-big-en">{_ph_e(D["verdict_en"])}</p><p class="ph-big-zh" lang="zh-Hant">{_ph_e(D["verdict_zh"])}</p></div>
  <p class="ph-trnote rvl d2"><b>中文翻譯</b><span>Every paragraph has a Chinese translation. Tap <span class="ph-tr"><span>中譯</span><i>▾</i></span> under a paragraph to open that one, or use <strong>Show Chinese · 顯示中譯</strong> at the top to open them all.</span>
    <span lang="zh-Hant">每一段都有中譯：點段落下方的「中譯」只開那一段，或按上方的「顯示中譯」一次全部打開。</span></p>
</div></section>
{"".join(out)}
{_ph_sec("terms", "Terms", "Three languages · 三語對照", "The vocabulary, in Chinese, Pāli, Sanskrit, and English", "術語：中文、巴利文、梵文、英文",
         f'<div class="ph-dw-tablewrap rvl"><table class="ph-dw-table ph-dw-terms"><thead><tr><th>中文</th><th>Pāli</th><th>Sanskrit</th><th>English</th></tr></thead><tbody>{terms}</tbody></table></div>', band=True)}
{_ph_sec("quiz", "Check", "Reading check · 理解測驗", "Did it land?", "讀懂了嗎", _ph_quiz(D["quiz"], D["slug"]) + f'<h3 class="ph-write-h rvl">Write · 你怎麼講？</h3><ol class="ph-write">{write_list}</ol>')}
<section class="section band ph-sec" id="more" data-ph-toc-label="More"><div class="wrap">
  <p class="eyebrow rvl">Go further · 延伸</p>
  <h2 class="rvl d1 sweep">Related lessons and reading <span class="ph-h2-zh">相關課程與延伸閱讀</span></h2>
  <div class="ph-pcards">{rel_lessons}</div>
  {_ph_people_cards(rel["people"])}
  {_ph_further(D["further"])}
  {_ph_nav()}
</div></section>
'''
    say_slug = f'dharma-{D["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{D["title"]} {D["title_zh"]}', f'{D["blurb_en"]} {D["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_ph_head()))
    return path

def build_phil_person(P):
    path = f'{PHIL_BASE}philosophers/{P["slug"]}/'
    facts = "".join(f'<div><dt>{_ph_e(en)} <span lang="zh-Hant">{_ph_e(zh)}</span></dt><dd>{_ph_e(v)}</dd></div>' for en, zh, v in P["facts"])
    tl = "".join(f'<li class="rvl"><b>{_ph_e(y)}</b><span>{_ph_e(en)}<i lang="zh-Hant">{_ph_e(zh)}</i></span></li>' for y, en, zh in P["timeline"])
    q = P["quote"]
    lessons = "".join(
        f'<a class="ph-pcard rvl" href="{PHIL_BASE}{l["slug"]}/"><span class="ph-pcard-mono" aria-hidden="true">?</span>'
        f'<span class="ph-pcard-b"><b>{_ph_e(l["title"])} <span lang="zh-Hant">{_ph_e(l["title_zh"])}</span></b>'
        f'<i>{_ph_e(l["n"])} · Big Questions 大哉問</i><span>{_ph_e(l["blurb_en"])}</span></span>'
        f'<span class="ph-go">Read the lesson · 讀這一課 &rarr;</span></a>' for l in map(_ph_lesson, P["lessons"]))
    hero_lead = f'{_ph_e(P["tag_en"])}<br><span class="muted" lang="zh-Hant">{_ph_e(P["tag_zh"])}</span>'
    body = f'''
{page_hero(f'Philosophers · 哲學家 · {_ph_e(P["era_en"])}', f'{_ph_e(P["name"])} <span class="ph-h1-zh">{_ph_e(P["name_zh"])} · {_ph_e(P["greek"])}</span>', hero_lead, back=(PHIL_BASE + "#shelf-philosophers", "Philosophers · 回哲學家"))}
{_ph_toolbar()}
<section class="section tight ph-top"><div class="wrap ph-person-top">
  <div class="ph-mono rvl" aria-hidden="true"><span>{_ph_e(P.get("mono") or P["greek"][0])}</span><i>{_ph_e(P["dates"])}</i></div>
  <dl class="ph-facts rvl d1">{facts}</dl>
  <p class="ph-trnote rvl d2" style="grid-column:1/-1"><b>中文翻譯</b><span>Every paragraph has a Chinese translation. Tap <span class="ph-tr"><span>中譯</span><i>▾</i></span> under a paragraph to open that one, or use <strong>Show Chinese · 顯示中譯</strong> at the top to open them all.</span>
    <span lang="zh-Hant">每一段都有中譯：點段落下方的「中譯」只開那一段，或按上方的「顯示中譯」一次全部打開。</span></p>
</div></section>
{_ph_sec("life", "Life", "Life · 生平", "A life in three scenes", "三幕人生", _ph_essay(P["life"], numbered=False) + f'<ol class="ph-tl">{tl}</ol>')}
{_ph_sec("idea", "Idea", "The central idea · 核心觀念", P["idea"]["title_en"].split(": ", 1)[-1].capitalize(), P["idea"]["title_zh"].split("：", 1)[-1],
         f'<div class="ph-essay">{"".join(_ph_bi(p) for p in P["idea"]["paras"])}</div>'
         f'<figure class="ph-quote rvl"><blockquote>{_ph_e(q["en"])}<span lang="zh-Hant">{_ph_e(q["zh"])}</span></blockquote>'
         f'<figcaption>{_ph_e(q["ref"])}<br>{_ph_e(q["note_en"])} <span class="ph-zh ph-inline" lang="zh-Hant">{_ph_e(q["note_zh"])}</span></figcaption></figure>', band=True)}
{_ph_sec("objection", "Objection", "The strongest objection · 最強的反駁", P["objection"]["title_en"].split(": ", 1)[-1].capitalize(), P["objection"]["title_zh"].split("：", 1)[-1],
         f'<div class="ph-essay">{"".join(_ph_bi(p) for p in P["objection"]["paras"])}</div>')}
{_ph_sec("sources", "Sources", "How we know · 史料", P["problem"]["title_en"], P["problem"]["title_zh"],
         f'<div class="ph-essay">{"".join(_ph_bi(p) for p in P["problem"]["paras"])}</div>' + _ph_said(P["said"]), band=True)}
{_ph_sec("dharma", "Dharma", "Dharma and the West · 佛法與西方哲學", P["dharma"]["title_en"], P["dharma"]["title_zh"], _ph_dharma(P["dharma"]))}
{_ph_sec("terms", "Terms", "Terms of art · 哲學術語", "Words that come with him", "跟著他一起來的詞", _ph_terms(P["terms"]), band=True)}
{_ph_sec("quiz", "Check", "Reading check · 理解測驗", "Did it land?", "讀懂了嗎", _ph_quiz(P["quiz"], P["slug"]))}
<section class="section band ph-sec" id="more" data-ph-toc-label="More"><div class="wrap">
  <p class="eyebrow rvl">Go further · 延伸</p>
  <h2 class="rvl d1 sweep">Where he appears <span class="ph-h2-zh">他出現在哪幾課</span></h2>
  <div class="ph-pcards">{lessons}</div>
  {_ph_further(P["further"])}
  {_ph_nav()}
</div></section>
'''
    say_slug = f'philosophers-{P["slug"]}'
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{P["name"]} {P["name_zh"]}', f'{P["tag_en"]} {P["tag_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_ph_head()))
    return path

def build_phil_hub():
    total = sum(len(u["items"]) for sh in PHIL["shelves"] for u in sh["units"])
    done = len(PHIL["lessons"]) + len(PHIL["philosophers"]) + len(PHIL.get("dharma", []))
    tabs, secs = [], []
    for si, sh in enumerate(PHIL["shelves"]):
        n = sum(len(u["items"]) for u in sh["units"])
        ready = sum(1 for u in sh["units"] for it in u["items"] if it.get("slug"))
        tabs.append(f'<a class="ph-shelf-tab" href="#shelf-{sh["key"]}"><b>{sh["letter"]}</b>'
                    f'<span>{_ph_e(sh["en"])}<i lang="zh-Hant">{_ph_e(sh["zh"])}</i></span><em>{n}</em></a>')
        units = []
        for ui, u in enumerate(sh["units"]):
            rows = []
            for it in u["items"]:
                inner = (f'<span class="ph-it-n">{_ph_e(it["n"])}</span>' if it["n"] else "") + \
                        (f'<span class="ph-it-b"><b>{_ph_e(it["en"])}</b><span lang="zh-Hant">{_ph_e(it["zh"])}</span>'
                         + (f'<i>{_ph_e(it["note"])}</i>' if it.get("note") else "") + '</span>')
                if it.get("slug"):
                    rows.append(f'<li><a class="ph-it is-ready" href="{PHIL_BASE}{it["slug"]}/">{inner}<span class="ph-it-go">Read · 開始讀 &rarr;</span></a></li>')
                else:
                    rows.append(f'<li><div class="ph-it">{inner}</div></li>')
            uw = sh["unit_word"]
            kicker = (f'{uw[0]} {ui + 1}' if uw[0] else "") + (f' · {_ph_e(u["tag"])}' if u["tag"] and uw[0] else (_ph_e(u["tag"]) if u["tag"] and sh["key"] != "philosophers" else ""))
            units.append(f'<div class="ph-unit rvl"><p class="ph-unit-k">{kicker}</p>'
                         f'<h3>{_ph_e(u["en"])} <span class="ph-h2-zh">{_ph_e(u["zh"])}</span></h3><ul class="ph-items">{"".join(rows)}</ul></div>')
        secs.append(
            f'<section class="section ph-shelf{" band" if si % 2 == 0 else ""}" id="shelf-{sh["key"]}"><div class="wrap">'
            f'<div class="ph-shelf-h"><span class="ph-shelf-letter rvl" aria-hidden="true">{sh["letter"]}</span><div>'
            f'<p class="eyebrow rvl">Shelf {sh["letter"]} · {n} {"profiles" if sh["key"] == "philosophers" else "texts" if sh["key"] == "sources" else "lessons"}'
            f'{f" · {ready} ready" if ready else " · in preparation 製作中"}</p>'
            f'<h2 class="rvl d1 sweep">{_ph_e(sh["en"])} <span class="ph-h2-zh">{_ph_e(sh["zh"])}</span></h2>'
            f'<p class="lead rvl d2">{_ph_e(sh["blurb_en"])}<br><span class="muted" lang="zh-Hant">{_ph_e(sh["blurb_zh"])}</span></p></div></div>'
            f'<div class="ph-units ph-units-{sh["key"]}">{"".join(units)}</div></div></section>')
    first = PHIL["lessons"][0]
    lead = f'{_ph_e(PHIL["lead_en"])}<br><span class="muted" lang="zh-Hant">{_ph_e(PHIL["lead_zh"])}</span>'
    intro = "".join(f'<p>{_ph_e(p["en"])}</p><p class="ph-intro-zh" lang="zh-Hant">{_ph_e(p["zh"])}</p>' for p in PHIL["intro"])
    stats = "".join(f'<div class="rvl"><b data-ph-count="{v}">{v}</b><span>{en}<i lang="zh-Hant">{zh}</i></span></div>' for v, en, zh in
                    [(len(PHIL["shelves"]), "shelves", "個書架"), (total, "lessons planned", "課規劃中"), (26, "centuries", "個世紀"), (3, "traditions", "個傳統")])
    body = f'''
{page_hero(PHIL["eyebrow"] + f' · {_ph_e(PHIL["level_en"])} {_ph_e(PHIL["level_zh"])}', f'{PHIL["title_en"]} <span class="ph-h1-zh">{PHIL["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section ph-hub-intro"><div class="wrap ph-hub-grid">
  <div class="ph-hub-text rvl">{intro}
    <a class="ph-start" href="{PHIL_BASE}{first["slug"]}/"><span>Start with lesson {first["n"]} · 從第一課開始</span><b>{_ph_e(first["title"])} <i lang="zh-Hant">{_ph_e(first["title_zh"])}</i></b><em>&rarr;</em></a>
    <p class="ph-hub-prog">{done} of {total} are ready so far; the rest are in preparation. <span lang="zh-Hant">目前完成 {done} 篇（共規劃 {total} 篇），其餘製作中。</span></p>
  </div>
  <div class="ph-hub-art rvl d1">{_ph_owl(170)}<div class="ph-stats">{stats}</div></div>
</div></section>
<nav class="ph-shelf-nav" aria-label="Shelves · 書架"><div class="wrap"><div class="ph-shelf-tabs">{"".join(tabs)}</div></div></nav>
{"".join(secs)}
'''
    write(PHIL_BASE, layout(PHIL_BASE, f'{PHIL["title_en"]} · {PHIL["title_zh"]}', f'{PHIL["lead_en"]} {PHIL["lead_zh"]}', body, "resources", extra_head=_ph_head()))
    return PHIL_BASE


# ---- 晶片與半導體 Chips and Semiconductors（資料驅動，data/semiconductors.json）----
# 架構照萬物原理：系列首頁分單元（單元導覽＋.lc-row 橫向課程卡），課程頁照天文教育
# （英文 reading＋每課一個 3D 模型＋延伸段落）。units[].lessons 是做好的課、units[].planned 是製作中。
# 3D 原始碼在 tools/chips/src/（three.js、esbuild，每課一個入口），打包成 assets/js/chip-*.js；
# 面板、迷思、口訣、活動沿用 astro.css，本系列多出來的在 chips.css（class 前綴 cp-）；兩者都只載在本系列頁面。
_chipj = os.path.join(ROOT, "data", "semiconductors.json")
CHIP = json.load(open(_chipj, encoding="utf-8")) if os.path.exists(_chipj) else None
CHIP_BASE = "/resources/classes/semiconductors/"
_CHIP_JS = {"doping": "chip-doping", "transistor": "chip-transistor", "wafer": "chip-wafer", "litho": "chip-litho", "scale": "chip-scale", "package": "chip-package", "hbm": "chip-hbm", "island": "chip-island", "heat": "chip-heat", "aichip": "chip-ai", "fab": "chip-fab", "led": "chip-led"}   # lab.kind → assets/js/<bundle>.js

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

def chiplitho_svg(size=56):
    """第四課的課程卡小圖示：一道紫色的光從上往下穿過光罩（有縫的板子）、收窄打在晶圓上。"""
    return (f'<svg class="chiplitho-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M18 6h24l-6 22H24z" fill="#9b7bff" opacity=".45"/><path d="M24 30h12l-4 18h-4z" fill="#9b7bff" opacity=".75"/>'
            '<rect x="10" y="26" width="40" height="4" rx="1" fill="#cfd4dc"/>'
            '<rect x="14" y="26" width="5" height="4" fill="#3a4a66"/><rect x="24" y="26" width="4" height="4" fill="#3a4a66"/><rect x="33" y="26" width="4" height="4" fill="#3a4a66"/><rect x="42" y="26" width="5" height="4" fill="#3a4a66"/>'
            '<ellipse cx="30" cy="51" rx="20" ry="4.5" fill="#c9d2de"/><rect x="27" y="48.5" width="6" height="3" fill="#f3e6ff"/></svg>')

def render_chiplitho_lab(lesson):
    """第四課：曝光機與晶圓上的五個步驟（assets/js/chip-litho.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    st = lab["steps"]
    lights = [("duv", "DUV · 193 nm", "深紫外光"), ("euv", "EUV · 13.5 nm", "極紫外光")]
    lb = "".join(f'<button type="button" data-light="{k}" aria-pressed="{"true" if k == "duv" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in lights)
    sb = "".join(f'<button type="button" data-wstep="{i}" aria-pressed="false"><b>{i + 1}</b>{html.escape(s["short_en"])}<small>{html.escape(s["short_zh"])}</small></button>' for i, s in enumerate(st))
    panels = "".join(
        f'<div class="cp-wf-panel" data-panel="{i}" hidden><p class="cp-wf-k">Step {i + 1} · 第 {i + 1} 步</p>'
        f'<h3>{html.escape(s["title_en"])}<span class="zh">{html.escape(s["title_zh"])}</span></h3>'
        f'<p class="cp-msg">{html.escape(s["text_en"])}<span class="zh">{html.escape(s["text_zh"])}</span></p></div>' for i, s in enumerate(st))
    msgs = "".join(f'<p class="cp-msg cp-lt-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-lt-lab rvl" data-chiplitho-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a lithography machine printing a circuit pattern onto a wafer, and the five steps on the wafer · 曝光機把電路圖案印到晶圓上、以及晶圓上五個步驟的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="machine" aria-pressed="true">The machine<small>曝光機</small></button>
        <button type="button" data-view="wafer" aria-pressed="false">On the wafer<small>晶圓上的步驟</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">Which light? · 用哪一種光？</p>
      <div class="cp-dope cp-tr-quick" role="group" aria-label="Which light? · 用哪一種光？">{lb}</div>
      <dl class="cp-nums cp-lt-nums">
        <div><dt>Wavelength · 波長</dt><dd class="cp-lt-nm"></dd></div>
        <div><dt>Finest line · 最細的線</dt><dd class="cp-lt-cd"></dd></div>
        <div><dt>Focus with · 聚光</dt><dd class="cp-lt-opt"></dd></div>
        <div><dt>Light travels in · 光走在</dt><dd class="cp-lt-air"></dd></div>
      </dl>
      {msgs}
      <div class="cp-lt-wsteps">
        <p class="al-sky-k">Five steps on the wafer · 晶圓上的五步</p>
        <div class="cp-wf-steps cp-lt-steps" role="group" aria-label="Steps · 步驟">{sb}</div>
        <button type="button" class="cp-wf-tour cp-lt-auto" aria-pressed="false"><span aria-hidden="true">&#9654;</span> <span class="t">Play all five steps · 五步連續播放</span></button>
        {panels}
      </div>
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

def chipscale_svg(size=56):
    """第五課的課程卡小圖示：一把尺，刻度越來越密，最後是一顆原子。"""
    ticks = "".join(f'<path d="M{x} 30 v{h}" stroke="#3a4a66" stroke-width="{w}"/>' for x, h, w in
                    [(8, 12, 2), (17, 8, 1.6), (25, 12, 1.6), (31, 6, 1.2), (36, 10, 1.2), (40, 5, 1), (43, 8, 1), (45.5, 4, .8), (47.5, 6, .8)])
    return (f'<svg class="chipscale-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<rect x="4" y="30" width="46" height="16" rx="2" fill="#ffd36e"/>{ticks}'
            '<circle cx="52" cy="20" r="5" fill="#b9c0cc" stroke="#6b7385" stroke-width="1.2"/>'
            '<path d="M10 20 H40" stroke="#58b4ff" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 5"/>'
            '<path d="M38 15 l7 5 l-7 5" fill="none" stroke="#58b4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')

def render_chipscale_lab(lesson):
    """第五課：十的次方縮放，從指甲到矽原子（assets/js/chip-scale.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    st = lab["stops"]
    sb = "".join(f'<button type="button" data-stop="{html.escape(s["key"])}" aria-pressed="false"><b>{i + 1}</b>{html.escape(s["short_en"])}<small>{html.escape(s["short_zh"])}</small></button>' for i, s in enumerate(st))
    panels = "".join(
        f'<div class="cp-wf-panel cp-sc-panel" data-panel="{i}" hidden><p class="cp-wf-k">Stop {i + 1} of {len(st)} · 第 {i + 1} 站</p>'
        f'<h3>{html.escape(s["title_en"])}<span class="zh">{html.escape(s["title_zh"])}</span></h3>'
        f'<p class="cp-msg">{html.escape(s["text_en"])}<span class="zh">{html.escape(s["text_zh"])}</span></p></div>' for i, s in enumerate(st))
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-sc-lab rvl" data-chipscale-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D zoom from a fingernail down to silicon atoms, one power of ten at a time · 從指甲一路放大到矽原子的 3D 模型，一次放大十倍"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-sc-rule" aria-hidden="true"><i class="cp-sc-bar"></i><span class="cp-sc-bar-t"></span></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Use the slider to zoom · 用滑桿放大縮小</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">How wide is the picture? · 畫面有多寬？</p>
      <dl class="cp-nums cp-sc-nums">
        <div><dt>The picture is · 畫面寬</dt><dd class="cp-sc-view"></dd></div>
        <div><dt>Magnified · 放大了</dt><dd class="cp-sc-mag"></dd></div>
      </dl>
      <ul class="cp-sc-units" aria-label="Units · 單位">
        <li><b>1 cm</b> = 10 mm<small>公分、公釐</small></li>
        <li><b>1 mm</b> = 1,000 µm<small>微米</small></li>
        <li><b>1 µm</b> = 1,000 nm<small>奈米</small></li>
        <li><b>1 nm</b> = 10 Å<small>埃米</small></li>
      </ul>
      <div class="cp-sc-x10" role="group" aria-label="Zoom · 縮放">
        <button type="button" class="cp-sc-out">&divide; 10<small>縮小十倍</small></button>
        <button type="button" class="cp-sc-in">&times; 10<small>放大十倍</small></button>
      </div>
      <p class="al-sky-k">Eight stops · 八站</p>
      <div class="cp-wf-steps cp-sc-stops" role="group" aria-label="Stops · 每一站">{sb}</div>
      {panels}
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider cp-sc-zrow"><span>Zoom · 縮放</span>
        <input type="range" class="al-age cp-sc-zoom" min="0" max="1" step="0.001" value="0"></label>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _chip_nail(nl):
    """「你的指甲長了多少？」（chip-scale.js 的 initNail；不需要 WebGL）。"""
    spans = "".join(f'<button type="button" data-span="{k}" aria-pressed="{"true" if k == "min" else "false"}">{en}<small>{zh}</small></button>'
                    for k, en, zh in [("s", "1 second", "1 秒"), ("min", "1 minute", "1 分鐘"), ("h", "1 hour", "1 小時"), ("d", "1 day", "1 天"), ("y", "1 year", "1 年")])
    return (f'<div class="cp-cnt cp-nl rvl" data-chip-nail data-rate="{nl["mm_per_month"]}">'
            f'<div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>How much does a fingernail grow in… · 指甲在這段時間長多少</span></p>'
            f'<div class="cp-dpw-pre cp-nl-spans" role="group" aria-label="Time · 時間">{spans}</div>'
            f'<p class="cp-nl-ans"><b class="cp-nl-en">—</b><span class="zh cp-nl-zh">—</span></p>'
            f'<p class="cp-cnt-note"><span class="cp-nl-cmp"></span><span class="zh cp-nl-cmp-zh"></span></p>'
            f'<label class="cp-cnt-l cp-nl-cutl"><span>Cut a strip of A4 paper in half, again and again · 把一條 A4 紙一次剪一半：<output class="cp-nl-cut-out">0</output> cuts · 次</span>'
            f'<input type="range" class="al-age cp-nl-cut" min="0" max="30" step="1" value="0"></label>'
            f'<p class="cp-nl-ans cp-nl-cutans"><b class="cp-nl-cut-len">—</b></p>'
            f'<p class="cp-cnt-note cp-nl-cut-cmp"></p>'
            f'<p class="cp-cnt-note">{html.escape(nl["note_en"])}<span class="zh">{html.escape(nl["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="off">'
            f'<p class="cp-home-k">Since you opened this page · 從你打開這一頁到現在</p>'
            f'<p class="cp-home-big"><b class="cp-nl-nm">0</b> nanometers · 奈米</p>'
            f'<p class="cp-home-zh">Your fingernails have grown this much in <b class="cp-nl-sec">0</b> seconds.<span class="zh">你的指甲在 <b class="cp-nl-sec">0</b> 秒裡長了這麼多。</span></p>'
            f'<p class="cp-home-note">That is about <b class="cp-nl-atoms">0</b> silicon atoms in a row.'
            f'<span class="zh">大約是 <b class="cp-nl-atoms">0</b> 顆矽原子排成一排。</span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The counter works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def chippackage_svg(size=56):
    """第六課的課程卡小圖示：基板上一塊中介層，上面一顆運算晶片和一疊記憶體。"""
    stack = "".join(f'<rect x="36" y="{30 - i * 4}" width="14" height="3.2" rx=".6" fill="{"#8a5ad6" if i % 2 == 0 else "#9a6ae6"}"/>' for i in range(5))
    return (f'<svg class="chippackage-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="4" y="42" width="52" height="7" rx="1.5" fill="#2f9a60"/><rect x="9" y="35" width="42" height="4" rx="1" fill="#8fa6c8"/>'
            '<rect x="11" y="24" width="20" height="9.5" rx="1" fill="#3d6fd8"/>'
            f'{stack}<g fill="#cfd6e0"><circle cx="11" cy="52.5" r="2"/><circle cx="20.5" cy="52.5" r="2"/><circle cx="30" cy="52.5" r="2"/><circle cx="39.5" cy="52.5" r="2"/><circle cx="49" cy="52.5" r="2"/></g></svg>')

def render_chippackage_lab(lesson):
    """第六課：三種放法——分開放、並排（2.5D）、疊起來（3D）（assets/js/chip-package.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg cp-pk-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-pk-lab rvl" data-chippackage-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of three ways to place chips: apart on a circuit board, side by side on an interposer, and stacked · 三種放晶片的方法的 3D 模型：分開焊在電路板上、並排放在中介層上、疊起來"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="Layout · 放法">
        <button type="button" data-view="board" aria-pressed="true">Apart<small>分開放</small></button>
        <button type="button" data-view="side" aria-pressed="false">Side by side<small>並排（2.5D）</small></button>
        <button type="button" data-view="stack" aria-pressed="false">Stacked<small>疊起來（3D）</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">How far does the data travel? · 資料要走多遠？</p>
      <dl class="cp-nums cp-pk-nums">
        <div><dt>Logic chip to memory (example) · 運算晶片到記憶體（示例）</dt><dd class="cp-pk-path"></dd></div>
        <div><dt>Compared with apart · 和分開放比</dt><dd class="cp-pk-ratio"></dd></div>
        <div><dt>Chips in one package · 一個封裝裡</dt><dd class="cp-pk-chips"></dd></div>
      </dl>
      <div class="cp-pk-bars">
        <p class="cp-pk-bar cp-pk-bar-board"><span>Apart · 分開放</span><i></i><b></b></p>
        <p class="cp-pk-bar cp-pk-bar-side"><span>Side by side · 並排</span><i></i><b></b></p>
        <p class="cp-pk-bar cp-pk-bar-stack"><span>Stacked · 疊起來</span><i></i><b></b></p>
        <p class="cp-pk-bars-n">Bars are on a compressed scale · 長條是壓縮過的刻度</p>
      </div>
      {msgs}
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <label class="al-slider cp-sc-zrow"><span>Take it apart · 拆開來看</span>
        <input type="range" class="al-age cp-pk-explode" min="0" max="1" step="0.01" value="0"></label>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _chip_pack(pk):
    """「一個封裝裡有幾顆晶片？」（chip-package.js 的 initPack；2D canvas，不需要 WebGL）。"""
    layers = "".join(f'<button type="button" data-layers="{n}" aria-pressed="{"true" if n == 8 else "false"}">{n}<small>{n} 層</small></button>' for n in pk["layer_choices"])
    return (f'<div class="cp-dpw cp-pkw rvl" data-chip-pack>'
            f'<div class="cp-dpw-pic"><canvas class="cp-dpw-cv cp-pkw-cv" aria-label="Top view of the package you built · 你組出來的封裝的俯視圖"></canvas>'
            f'<p class="cp-dpw-key">Top view: green is the substrate, gray-blue is the interposer · 俯視圖：綠色是基板，灰藍色是中介層</p></div>'
            f'<div class="cp-dpw-side"><div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>1 · Logic chips · 運算晶片</span></p>'
            f'<div class="cp-dpw-pre cp-pkw-logic" role="group" aria-label="Logic chips · 運算晶片"><button type="button" data-logic="1" aria-pressed="true">1<small>1 顆</small></button><button type="button" data-logic="2" aria-pressed="false">2<small>2 顆</small></button></div>'
            f'<label class="cp-cnt-l cp-sun-l"><span>2 · Stacks of memory · 幾疊記憶體 <output class="cp-pkw-stacks-out">4</output></span>'
            f'<input type="range" class="al-age cp-pkw-stacks" min="0" max="8" step="1" value="4"></label>'
            f'<p class="cp-cnt-l cp-sun-l"><span>3 · Chips in each stack · 每一疊幾層</span></p>'
            f'<div class="cp-dpw-pre cp-pkw-layers" role="group" aria-label="Layers · 層數">{layers}</div>'
            f'<p class="cp-nl-ans"><b><span class="cp-pkw-n">0</span> chips in one package</b><span class="zh">一個封裝裡的晶片數</span></p>'
            f'<p class="cp-cnt-note"><span class="cp-pkw-en"></span><span class="zh cp-pkw-zh"></span></p>'
            f'<p class="cp-cnt-note">{html.escape(pk["note_en"])}<span class="zh">{html.escape(pk["note_zh"])}</span></p>'
            f'</div></div></div>'
            '<noscript><p class="muted">The builder works in your browser and needs JavaScript. · 這個小工具在瀏覽器裡執行，需要開啟 JavaScript。</p></noscript>')

def chiphbm_svg(size=56):
    """第七課的課程卡小圖示：一疊記憶體和一顆運算晶片，中間是一條很多車道的路。"""
    stack = "".join(f'<rect x="38" y="{40 - i * 5}" width="17" height="4" rx=".8" fill="{"#8a5ad6" if i % 2 == 0 else "#9a6ae6"}"/>' for i in range(7))
    lanes = "".join(f'<path d="M21 {26 + i * 3.4} H37" stroke="#ffd36e" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 2"/>' for i in range(6))
    return (f'<svg class="chiphbm-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="3" y="46" width="54" height="5" rx="1.5" fill="#8fa6c8"/><rect x="5" y="22" width="16" height="22" rx="1.5" fill="#3d6fd8"/>'
            f'{stack}{lanes}</svg>')

def render_chiphbm_lab(lesson):
    """第七課：一般記憶體（路遠、車道少）對 HBM（疊在旁邊、上千車道）（assets/js/chip-hbm.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    gb = "".join(f'<button type="button" data-gen="{html.escape(g["key"])}" aria-pressed="false">{html.escape(g["name"])}<small>{g["year"]}</small></button>' for g in lab["gens"])
    msgs = "".join(f'<p class="cp-msg cp-hb-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-hb-lab rvl" data-chiphbm-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model comparing ordinary memory far across a board with HBM, a stack of memory chips beside the logic chip joined by a very wide road · 比較一般記憶體（在板子另一頭）和 HBM（疊在運算晶片旁邊、用很寬的路相連）的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="Memory · 記憶體">
        <button type="button" data-view="far" aria-pressed="false">Ordinary memory<small>一般記憶體</small></button>
        <button type="button" data-view="hbm" aria-pressed="true">HBM<small>高頻寬記憶體</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">Which HBM? · 哪一代 HBM？</p>
      <div class="cp-dope cp-tr-quick cp-hb-gens" role="group" aria-label="Generation · 世代">{gb}</div>
      <dl class="cp-nums cp-lt-nums">
        <div><dt>Data lines · 資料線（車道）</dt><dd class="cp-hb-lanes"></dd></div>
        <div><dt>Floors · 樓層</dt><dd class="cp-hb-floors"></dd></div>
        <div><dt>Data each second · 每秒送的資料</dt><dd class="cp-hb-bw"></dd></div>
        <div><dt>Movies each second · 每秒幾部電影</dt><dd class="cp-hb-mov"></dd></div>
      </dl>
      {msgs}
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

def _chip_band(bd):
    """「一秒搬幾部電影？」（chip-hbm.js 的 initBand；不需要 WebGL）。"""
    gens = "".join(f'<button type="button" data-gen="{html.escape(g["key"])}" aria-pressed="false">{html.escape(g["name"])}<small>{g["year"]}</small></button>' for g in bd["gens"])
    nets = "".join(f'<button type="button" data-net="{n["mbps"]}" aria-pressed="false">{html.escape(n["en"])}<small>{html.escape(n["zh"])}</small></button>' for n in bd["nets"])
    return (f'<div class="cp-cnt cp-bd rvl" data-chip-band data-movie="{bd["movie_gb"]}">'
            f'<div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>1 · Which HBM? · 哪一代 HBM</span></p>'
            f'<div class="cp-dpw-pre cp-bd-gens" role="group" aria-label="Generation · 世代">{gens}</div>'
            f'<label class="cp-cnt-l cp-sun-l"><span>2 · Stacks beside the logic chip · 運算晶片旁邊放幾疊 <output class="cp-bd-stacks-out">6</output></span>'
            f'<input type="range" class="al-age cp-bd-stacks" min="1" max="8" step="1" value="6"></label>'
            f'<p class="cp-cnt-l cp-sun-l"><span>3 · Compare with a home internet line · 和家裡的網路比一比</span></p>'
            f'<div class="cp-dpw-pre cp-bd-net" role="group" aria-label="Internet speed · 網路速度">{nets}</div>'
            f'<p class="cp-cnt-note">{html.escape(bd["note_en"])}<span class="zh">{html.escape(bd["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Movies moved every second · 每秒搬幾部電影</p>'
            f'<p class="cp-home-big"><b class="cp-bd-n">0</b> movies · 部</p>'
            f'<p class="cp-home-sub"><b class="cp-bd-gb">0</b> GB every second · 每秒這麼多 GB</p>'
            f'<p class="cp-home-note">Your home line would need <b class="cp-bd-en">—</b> to send what this memory sends in one second.'
            f'<span class="zh">這些記憶體一秒送出的資料，家裡的網路要傳 <b class="cp-bd-zh">—</b>。</span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def chipisland_svg(size=56):
    """第八課的課程卡小圖示：台灣的輪廓，上面三個亮點和一條黃色的路線。"""
    return (f'<svg class="chipisland-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M35 5 L41 9 L39 18 L36 30 L32 42 L27 54 L24 53 L22 44 L17 36 L19 26 L25 15 L30 8 Z" fill="#2f8f5b" stroke="#7fd0a3" stroke-width="1.2" stroke-linejoin="round"/>'
            '<path d="M29 14 Q14 28 21 37 Q18 41 22 44" fill="none" stroke="#ffd36e" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="1 3.4"/>'
            '<circle cx="29" cy="14" r="3" fill="#58b4ff"/><circle cx="21" cy="37" r="3" fill="#ffb347"/><circle cx="22" cy="44" r="3" fill="#ff7ad9"/></svg>')

def render_chipisland_lab(lesson):
    """第八課：台灣地圖上一顆晶片的旅程與時間軸（assets/js/chip-island.js 綁這裡的 class；輪廓與位置是示意）。"""
    lab = lesson["lab"]
    st, ev = lab["steps"], lab["events"]
    sb = "".join(f'<button type="button" data-step="{i}" aria-pressed="false"><b>{i + 1}</b>{html.escape(s["short_en"])}<small>{html.escape(s["short_zh"])}</small></button>' for i, s in enumerate(st))
    panels = "".join(
        f'<div class="cp-wf-panel cp-is-panel" data-panel="{i}" hidden><p class="cp-wf-k">Step {i + 1} · 第 {i + 1} 步 · {html.escape(s["where_en"])} {html.escape(s["where_zh"])}</p>'
        f'<h3>{html.escape(s["title_en"])}<span class="zh">{html.escape(s["title_zh"])}</span></h3>'
        f'<p class="cp-msg">{html.escape(s["text_en"])}<span class="zh">{html.escape(s["text_zh"])}</span></p></div>' for i, s in enumerate(st))
    evs = "".join(
        f'<li class="cp-is-ev" data-ev="{html.escape(e["key"])}" tabindex="0"><b>{e["year"]}</b><span>{html.escape(e["en"])}<span class="zh">{html.escape(e["zh"])}</span></span></li>' for e in ev)
    names = html.escape(json.dumps([{"en": s["short_en"], "zh": s["short_zh"]} for s in st], ensure_ascii=False))
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-is-lab rvl" data-chipisland-lab data-steps="{names}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D map of Taiwan showing one chip's journey from design to manufacturing to packaging, and a timeline of the chip industry · 台灣的 3D 地圖：一顆晶片從設計、製造到封裝測試的旅程，以及晶片產業的時間軸"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="journey" aria-pressed="true">A chip's journey<small>晶片的旅程</small></button>
        <button type="button" data-view="time" aria-pressed="false">Timeline<small>時間軸</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <div class="cp-is-jbox">
        <p class="al-sky-k">Three jobs, then the world · 三段工作，再到全世界</p>
        <div class="cp-wf-steps cp-is-steps" role="group" aria-label="Steps · 步驟">{sb}</div>
        <button type="button" class="cp-wf-tour cp-is-tour" aria-pressed="true"><span aria-hidden="true">&#9654;</span> <span class="t">Stop · 停止</span></button>
        {panels}
        <p class="cp-msg cp-is-kmrow">This example trip, in straight lines: <b class="cp-is-km"></b><span class="zh">這趟示例旅程的直線距離：新竹到台南，再到高雄</span></p>
      </div>
      <div class="cp-is-tbox" hidden>
        <p class="al-sky-k">Drag the year · 拉動年份</p>
        <label class="al-slider cp-is-yrow"><span>Year · 年份 <output class="cp-is-year-out"></output></span>
          <input type="range" class="al-age cp-is-year" min="1970" max="2005" step="1" value="1970"></label>
        <ol class="cp-is-evs">{evs}</ol>
      </div>
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

def _chip_who(wh):
    """「誰做哪一段？」（chip-island.js 的 initWho；不需要 WebGL）。"""
    roles = [("design", "Designs", "設計"), ("make", "Makes", "製造"), ("pack", "Packages & tests", "封裝測試")]
    rows = "".join(
        f'<div class="cp-who-row" data-name="{html.escape(c["name"])}"><p class="cp-who-n"><b>{html.escape(c["name"])}</b><small>{html.escape(c["zh"])}</small></p>'
        f'<div class="cp-who-b" role="group" aria-label="{html.escape(c["name"])}">'
        + "".join(f'<button type="button" data-role="{k}" aria-pressed="false">{en}<small>{zh}</small></button>' for k, en, zh in roles)
        + '</div></div>' for c in wh["companies"])
    return (f'<div class="cp-cnt cp-who rvl" data-chip-who>'
            f'<div class="cp-cnt-in cp-who-list">{rows}'
            f'<p class="cp-cnt-note">{html.escape(wh["note_en"])}<span class="zh">{html.escape(wh["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Your score · 你的分數</p>'
            f'<p class="cp-home-big"><b class="cp-who-score">0 / 7</b></p>'
            f'<p class="cp-home-note cp-who-msg" hidden>{html.escape(wh["done_en"])}<span class="zh">{html.escape(wh["done_zh"])}</span></p>'
            f'<button type="button" class="cp-who-reset" hidden>Start again · 重來</button>'
            f'</div></div>'
            '<noscript><p class="muted">The game works in your browser and needs JavaScript. · 這個小遊戲在瀏覽器裡執行，需要開啟 JavaScript。</p></noscript>')

def chipheat_svg(size=56):
    """第九課的課程卡小圖示：一顆發燙的晶片，上面是散熱片，熱往上冒。"""
    fins = "".join(f'<rect x="{14 + i * 5.6}" y="18" width="2.6" height="16" rx=".8" fill="#b9c2d0"/>' for i in range(6))
    waves = "".join(f'<path d="M{18 + i * 12} 14 q-3 -3 0 -6 q3 -3 0 -6" fill="none" stroke="#ff8a2a" stroke-width="1.8" stroke-linecap="round"/>' for i in range(3))
    return (f'<svg class="chipheat-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="4" y="48" width="52" height="6" rx="1.5" fill="#1f7a4a"/><rect x="18" y="40" width="24" height="8" rx="1.5" fill="#e0461a"/>'
            f'<rect x="11" y="34" width="38" height="5" rx="1.2" fill="#b9c2d0"/>{fins}{waves}</svg>')

def render_chipheat_lab(lesson):
    """第九課：一顆晶片配三種散熱、三種工作量，看溫度與降速（assets/js/chip-heat.js 綁這裡的 class；溫度是簡化模型的示例）。"""
    lab = lesson["lab"]
    loads = [("idle", "Idle", "待機"), ("video", "Video", "看影片"), ("game", "Game", "玩遊戲")]
    coolers = [("none", "Bare chip", "沒有散熱"), ("sink", "Heat sink", "散熱片"), ("fan", "Sink + fan", "散熱片＋風扇")]
    lb = "".join(f'<button type="button" data-load="{k}" aria-pressed="false">{en}<small>{zh}</small></button>' for k, en, zh in loads)
    cb = "".join(f'<button type="button" data-cooler="{k}" aria-pressed="false">{en}<small>{zh}</small></button>' for k, en, zh in coolers)
    msgs = "".join(f'<p class="cp-msg cp-ht-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-ht-lab rvl" data-chipheat-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a chip on a circuit board that changes color as it heats up, with a heat sink and a fan that can be added · 電路板上一顆晶片的 3D 模型：晶片越熱顏色越紅，可以加上散熱片和風扇"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · How hard is the chip working? · 晶片有多忙？</p>
      <div class="cp-dope cp-ht-loads" role="group" aria-label="Workload · 工作量">{lb}</div>
      <p class="al-sky-k">2 · How is it cooled? · 怎麼散熱？</p>
      <div class="cp-dope cp-ht-coolers" role="group" aria-label="Cooling · 散熱">{cb}</div>
      <div class="cp-ht-meter"><p class="cp-ht-temp" aria-live="off"></p><div class="cp-ht-bar"><i></i><span title="Limit · 上限"></span></div><p class="cp-ht-status"></p></div>
      <dl class="cp-nums cp-lt-nums">
        <div><dt>Power (heat made) · 功率（發的熱）</dt><dd class="cp-ht-pw"></dd></div>
        <div><dt>Speed · 速度</dt><dd class="cp-ht-sp"></dd></div>
      </dl>
      {msgs}
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

def _chip_vf(vf):
    """「電壓和速度怎麼影響耗電？」（chip-heat.js 的 initVf；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-v="{p["v"]}" data-f="{p["f"]}">{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></button>' for p in vf["presets"])
    return (f'<div class="cp-cnt cp-vf rvl" data-chip-vf>'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>1 · Voltage · 電壓 <output class="cp-vf-v-out">100%</output></span>'
            f'<input type="range" class="al-age cp-vf-v" min="50" max="130" step="5" value="100"></label>'
            f'<label class="cp-cnt-l cp-sun-l"><span>2 · Speed (switches each second) · 速度（每秒開關幾次） <output class="cp-vf-f-out">100%</output></span>'
            f'<input type="range" class="al-age cp-vf-f" min="50" max="150" step="5" value="100"></label>'
            f'<p class="cp-cnt-l cp-sun-l"><span>Or try one of these · 或試試這幾種</span></p>'
            f'<div class="cp-dpw-pre cp-vf-pre" role="group" aria-label="Examples · 例子">{pre}</div>'
            f'<p class="cp-cnt-note">{html.escape(vf["note_en"])}<span class="zh">{html.escape(vf["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Switching power · 開關所用的功率</p>'
            f'<p class="cp-home-big"><b class="cp-vf-n">100%</b> of the starting power · 原來的百分之幾</p>'
            f'<div class="cp-vf-track"><i class="cp-vf-bar"></i><span></span></div>'
            f'<p class="cp-home-note"><span class="cp-vf-en"></span><span class="zh cp-vf-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def chipai_svg(size=56):
    """第十課的課程卡小圖示：左邊四個大核心（CPU），右邊一大片小格子（GPU）。"""
    big = "".join(f'<rect x="{5 + (i % 2) * 11}" y="{19 + (i // 2) * 11}" width="9.5" height="9.5" rx="1.5" fill="#3d6fd8"/>' for i in range(4))
    small = "".join(f'<rect x="{33 + (i % 6) * 3.7}" y="{19 + (i // 6) * 3.7}" width="2.7" height="2.7" rx=".5" fill="{"#ffb347" if (i * 7) % 5 else "#ffd36e"}"/>' for i in range(36))
    return (f'<svg class="chipai-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="2" y="16" width="26" height="26" rx="3" fill="#1c2740"/><rect x="31" y="16" width="26" height="26" rx="3" fill="#1c2740"/>'
            f'{big}{small}<path d="M8 48 H24 M35 48 H53" stroke="#8fa6c8" stroke-width="2" stroke-linecap="round"/></svg>')

def render_chipai_lab(lesson):
    """第十課：CPU（4 個大核心）對 GPU（576 個小單元）做兩種工作（assets/js/chip-ai.js 綁這裡的 class；數字全是示例）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg cp-ai-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-ai-lab rvl" data-chipai-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a chip working on a board of tiles: a CPU with four big cores or a GPU with hundreds of small units, on a job that can be shared or a job that must be done in order · 一顆晶片處理一面格子板的 3D 模型：CPU 有四個大核心，GPU 有幾百個小單元；工作有可以分工的，也有只能照順序做的"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · Which chip? · 哪一種晶片？</p>
      <div class="cp-dope cp-tr-quick cp-ai-chips" role="group" aria-label="Chip · 晶片">
        <button type="button" data-chip="cpu" aria-pressed="true">CPU<small>4 個大核心</small></button>
        <button type="button" data-chip="gpu" aria-pressed="false">GPU<small>576 個小單元</small></button>
      </div>
      <p class="al-sky-k">2 · Which job? · 哪一種工作？</p>
      <div class="cp-dope cp-tr-quick cp-ai-jobs" role="group" aria-label="Job · 工作">
        <button type="button" data-job="paint" aria-pressed="true">Paint a picture<small>畫一張圖（可以分工）</small></button>
        <button type="button" data-job="chain" aria-pressed="false">A chain of steps<small>一串步驟（要照順序）</small></button>
      </div>
      <div class="cp-ht-meter"><div class="cp-ht-bar cp-ai-bar"><i></i></div></div>
      <dl class="cp-nums cp-lt-nums">
        <div><dt>Done · 做完</dt><dd class="cp-ai-n"></dd></div>
        <div><dt>Time · 時間</dt><dd class="cp-ai-t"></dd></div>
        <div><dt>Working now · 正在工作</dt><dd class="cp-ai-busy"></dd></div>
        <div><dt>Needs · 總共需要</dt><dd class="cp-ai-fin"></dd></div>
      </dl>
      {msgs}
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

def _chip_amd(am):
    """「幫手越多就越快嗎？」（chip-ai.js 的 initAmd；阿姆達爾定律；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-p="{p["p"]}" data-e="{p["e"]}">{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></button>' for p in am["presets"])
    return (f'<div class="cp-cnt cp-amd rvl" data-chip-amd>'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>1 · How much of the job can be shared? · 工作有多少可以分工 <output class="cp-amd-p-out">95%</output></span>'
            f'<input type="range" class="al-age cp-amd-p" min="0" max="100" step="5" value="95"></label>'
            f'<label class="cp-cnt-l cp-sun-l"><span>2 · How many workers? · 有幾個幫手 <output class="cp-amd-e-out">64</output></span>'
            f'<input type="range" class="al-age cp-amd-e" min="0" max="10" step="1" value="6"></label>'
            f'<p class="cp-cnt-l cp-sun-l"><span>Or try one of these · 或試試這幾種</span></p>'
            f'<div class="cp-dpw-pre cp-vf-pre cp-amd-pre" role="group" aria-label="Examples · 例子">{pre}</div>'
            f'<p class="cp-cnt-note">{html.escape(am["note_en"])}<span class="zh">{html.escape(am["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">The whole job gets · 整件工作變成</p>'
            f'<p class="cp-home-big"><b class="cp-amd-n">1×</b> as fast · 倍快</p>'
            f'<div class="cp-vf-track cp-amd-track"><i class="cp-vf-bar cp-amd-bar"></i></div>'
            f'<p class="cp-home-note"><span class="cp-amd-en"></span><span class="zh cp-amd-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def chipfab_svg(size=56):
    """第十一課的課程卡小圖示：一座工廠，左邊一滴水，右邊一道閃電。"""
    return (f'<svg class="chipfab-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M14 50 V28 L26 34 V28 L38 34 V22 H46 V50 Z" fill="#8fa6c8"/><rect x="19" y="40" width="5" height="5" fill="#16223f"/><rect x="28" y="40" width="5" height="5" fill="#16223f"/><rect x="37" y="40" width="5" height="5" fill="#16223f"/>'
            '<path d="M9 8 Q3 17 9 21 Q15 17 9 8 Z" fill="#58b4ff"/><path d="M52 5 L45 16 H50 L47 25 L56 12 H51 Z" fill="#ffd36e"/>'
            '<rect x="6" y="50" width="48" height="4" rx="1.5" fill="#2f8f5b"/></svg>')

def render_chipfab_lab(lesson):
    """第十一課：剖開的小晶圓廠，水的迴路（回收率滑桿）與三個用電大戶（assets/js/chip-fab.js 綁這裡的 class；配置是示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg cp-fb-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-fb-lab rvl" data-chipfab-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of a small chip factory showing the water loop from city water to ultrapure water to rinsing and back, and the fans, cooling, and machines that use power · 剖開的小晶圓廠 3D 模型：水從自來水、超純水、沖洗晶圓再回收的迴路，以及用電的風扇、空調和機台"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="water" aria-pressed="true">Water<small>水</small></button>
        <button type="button" data-view="power" aria-pressed="false">Power<small>電</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <div class="cp-is-jbox cp-fb-wbox">
        <p class="al-sky-k">How much water is recycled? · 回收多少水？</p>
        <label class="al-slider cp-is-yrow"><span>Recycled · 回收率 <output class="cp-fb-rec-out">85%</output></span>
          <input type="range" class="al-age cp-fb-rec" min="0" max="90" step="5" value="85"></label>
        <dl class="cp-nums cp-lt-nums cp-fb-nums">
          <div><dt>New water needed · 要補的新水</dt><dd class="cp-fb-fresh"></dd></div>
          <div><dt>Each drop works · 每滴水</dt><dd class="cp-fb-times"></dd></div>
        </dl>
      </div>
      <div class="cp-is-jbox cp-fb-pbox" hidden>
        <p class="al-sky-k">Three big users of power · 三個用電大戶</p>
        <div class="cp-dope cp-fb-users" role="group" aria-label="Power users · 用電大戶">
          <button type="button" data-user="air" aria-pressed="true">Clean air<small>乾淨的空氣</small></button>
          <button type="button" data-user="cool" aria-pressed="false">Cooling<small>冷卻與空調</small></button>
          <button type="button" data-user="tools" aria-pressed="false">Machines<small>機台</small></button>
        </div>
        <div class="cp-fb-mw"><p>One lithography machine, measured in 2020 · 一部曝光機（2020 年量測）</p>
          <div><span>DUV</span><i style="--w:9.9%"></i><b>0.13 MW</b></div>
          <div><span>EUV</span><i style="--w:100%" class="euv"></i><b>1.31 MW</b></div></div>
      </div>
      {msgs}
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

def _chip_clean(cl):
    """「無塵室有多乾淨？」（chip-fab.js 的 initClean；不需要 WebGL）。"""
    rooms = "".join(f'<button type="button" data-iso="{r["iso"]}" aria-pressed="false">{html.escape(r["en"])}<small>{html.escape(r["zh"])}</small></button>' for r in cl["rooms"])
    return (f'<div class="cp-cnt cp-cl rvl" data-chip-clean>'
            f'<div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>Choose a room · 選一個房間</span></p>'
            f'<div class="cp-dpw-pre cp-cl-rooms" role="group" aria-label="Rooms · 房間">{rooms}</div>'
            f'<canvas class="cp-cl-cv" width="560" height="300" aria-hidden="true"></canvas>'
            f'<p class="cp-cnt-note">{html.escape(cl["note_en"])}<span class="zh">{html.escape(cl["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Particles in one cubic meter of air · 一立方公尺空氣裡的微粒</p>'
            f'<p class="cp-home-big"><b class="cp-cl-n">0</b> at most · 最多幾顆</p>'
            f'<p class="cp-home-sub">0.5 micrometers or larger · 0.5 微米以上</p>'
            f'<p class="cp-home-note"><span class="cp-cl-en"></span><span class="zh cp-cl-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The picture works in your browser and needs JavaScript. · 這張圖在瀏覽器裡畫，需要開啟 JavaScript。</p></noscript>')

def chipled_svg(size=56):
    """第十二課的課程卡小圖示：一顆發光的 LED（圓頂、兩隻腳、幾道光）。"""
    rays = "".join(f'<path d="M{30 + 17 * c:.1f} {24 - 17 * s_:.1f} L{30 + 24 * c:.1f} {24 - 24 * s_:.1f}" stroke="#ffd36e" stroke-width="2.2" stroke-linecap="round"/>' for c, s_ in [(-0.94, 0.34), (-0.64, 0.77), (0, 1), (0.64, 0.77), (0.94, 0.34)])
    return (f'<svg class="chipled-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M19 38 V24 a11 11 0 0 1 22 0 V38 Z" fill="#2f7bff"/><rect x="16" y="38" width="28" height="4" rx="1.5" fill="#1f5ad0"/>'
            '<path d="M25 42 V56 M35 42 V52" stroke="#b9c2d0" stroke-width="2.4" stroke-linecap="round"/><circle cx="26" cy="24" r="3" fill="#bfe0ff"/>'
            f'{rays}</svg>')

def render_chipled_lab(lesson):
    """第十二課：放大的 LED 晶粒，p 型、n 型與接面；四種顏色、順向／反向／關（assets/js/chip-led.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg cp-ld-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-ld-lab rvl" data-chipled-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a magnified LED: an n-type layer of electrons below, a p-type layer of holes above, and the junction between them where light comes out · 放大的 LED 3D 模型：下層是有電子的 n 型、上層是有電洞的 p 型，中間的接面是發光的地方"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · Which LED? · 哪一種 LED？</p>
      <div class="cp-dope cp-ld-colors" role="group" aria-label="Color · 顏色">
        <button type="button" data-color="red" aria-pressed="true"><i style="color:#ff3b30">&#9679;</i>Red<small>紅</small></button>
        <button type="button" data-color="green" aria-pressed="false"><i style="color:#34d058">&#9679;</i>Green<small>綠</small></button>
        <button type="button" data-color="blue" aria-pressed="false"><i style="color:#2f7bff">&#9679;</i>Blue<small>藍</small></button>
        <button type="button" data-color="white" aria-pressed="false"><i style="color:#fff">&#9679;</i>White<small>白</small></button>
      </div>
      <p class="al-sky-k">2 · How is the battery connected? · 電池怎麼接？</p>
      <div class="cp-dope cp-ld-modes" role="group" aria-label="Battery · 電池">
        <button type="button" data-mode="on" aria-pressed="true">Forward<small>順向</small></button>
        <button type="button" data-mode="reverse" aria-pressed="false">Backward<small>反過來接</small></button>
        <button type="button" data-mode="off" aria-pressed="false">Off<small>不接</small></button>
      </div>
      <div class="cp-ld-lampbox"><span class="cp-ld-lamp"></span></div>
      <dl class="cp-nums cp-lt-nums cp-ld-nums">
        <div><dt>Light · 光</dt><dd class="cp-ld-nm"></dd></div>
        <div><dt>Energy · 能量</dt><dd class="cp-ld-ev"></dd></div>
        <div><dt>Made of · 材料</dt><dd class="cp-ld-mat"></dd></div>
      </dl>
      {msgs}
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

def _chip_rgb(rg):
    """「三顆 LED 混出一個像素」（chip-led.js 的 initRgb；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-r="{p["r"]}" data-g="{p["g"]}" data-b="{p["b"]}">{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></button>' for p in rg["presets"])
    names = html.escape(json.dumps(rg["names"], ensure_ascii=False))
    rows = "".join(
        f'<label class="cp-cnt-l{" cp-sun-l" if i else ""}"><span>{en} LED · {zh} <output class="cp-rgb-{k}-out">0%</output></span>'
        f'<input type="range" class="al-age cp-rgb-{k}" min="0" max="100" step="5" value="{v}"></label>'
        for i, (k, en, zh, v) in enumerate([("r", "Red", "紅光", 100), ("g", "Green", "綠光", 100), ("b", "Blue", "藍光", 0)]))
    return (f'<div class="cp-cnt cp-rgb rvl" data-chip-rgb data-names="{names}">'
            f'<div class="cp-cnt-in">{rows}'
            f'<p class="cp-cnt-l cp-sun-l"><span>Or try one of these · 或試試這幾種</span></p>'
            f'<div class="cp-dpw-pre cp-rgb-pre" role="group" aria-label="Examples · 例子">{pre}</div>'
            f'<p class="cp-cnt-note">{html.escape(rg["note_en"])}<span class="zh">{html.escape(rg["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">One pixel, seen up close and from far away · 一個像素：近看與遠看</p>'
            f'<div class="cp-rgb-view"><div class="cp-rgb-dots"><i class="cp-rgb-dot-r"></i><i class="cp-rgb-dot-g"></i><i class="cp-rgb-dot-b"></i></div>'
            f'<span class="cp-rgb-arrow" aria-hidden="true">&#8594;</span><div class="cp-rgb-px"></div></div>'
            f'<p class="cp-home-note"><span class="cp-rgb-en"></span><span class="zh cp-rgb-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The mixer works in your browser and needs JavaScript. · 混色在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def _chip_sun(sp):
    """「在螢幕上曬一張藍曬圖」（chip-litho.js 的 initSun；2D canvas，不需要 WebGL）。"""
    masks = "".join(f'<button type="button" data-mask="{m["key"]}" aria-pressed="false">{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>' for m in sp["masks"])
    return (f'<div class="cp-dpw cp-sun rvl" data-chip-sun>'
            f'<div class="cp-dpw-pic cp-sun-pic"><canvas class="cp-dpw-cv cp-sun-cv" aria-label="A simulated sun print · 模擬的藍曬圖"></canvas>'
            f'<p class="cp-sun-status" aria-live="polite"></p></div>'
            f'<div class="cp-dpw-side"><div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>1 · Choose a mask · 選一張光罩</span></p>'
            f'<div class="cp-dpw-pre cp-sun-masks" role="group" aria-label="Mask · 光罩">{masks}</div>'
            f'<input class="cp-sun-text" type="text" maxlength="8" value="CHIP" aria-label="Your word · 你的字" hidden>'
            f'<label class="cp-cnt-l cp-sun-l"><span>2 · Time in the sun · 曬多久 <output class="cp-sun-time-out"></output></span>'
            f'<input type="range" class="al-age cp-sun-time" min="0" max="40" step="1" value="15"></label>'
            f'<label class="cp-cnt-l cp-sun-l"><span>3 · Gap between mask and paper · 光罩離紙多遠 <output class="cp-sun-gap-out"></output></span>'
            f'<input type="range" class="al-age cp-sun-gap" min="0" max="6" step="0.5" value="0"></label>'
            f'<button type="button" class="cp-sun-wash">Wash it · 用水沖洗</button>'
            f'<p class="cp-cnt-note">{html.escape(sp["note_en"])}<span class="zh">{html.escape(sp["note_zh"])}</span></p>'
            f'</div></div></div>'
            '<noscript><p class="muted">The simulator works in your browser and needs JavaScript. · 模擬在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

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
    lab_html = {"doping": render_chipdoping_lab, "transistor": render_chiptransistor_lab, "wafer": render_chipwafer_lab, "litho": render_chiplitho_lab, "scale": render_chipscale_lab, "package": render_chippackage_lab, "hbm": render_chiphbm_lab, "island": render_chipisland_lab, "heat": render_chipheat_lab, "aichip": render_chipai_lab, "fab": render_chipfab_lab, "led": render_chipled_lab}[kind](lesson)

    secs = []
    if lesson.get("home"):
        hm = lesson["home"]
        secs.append(("home", hm["eyebrow"], hm["en"], hm["zh"], _chip_home(hm), _bi(hm["lead_en"], hm["lead_zh"], cls="lead rvl d2")))
    if lesson.get("sunprint"):
        sp = lesson["sunprint"]
        secs.append(("sunprint", sp["eyebrow"], sp["en"], sp["zh"], _chip_sun(sp), _bi(sp["lead_en"], sp["lead_zh"], cls="lead rvl d2")))
    if lesson.get("dies"):
        dz = lesson["dies"]
        secs.append(("dies", dz["eyebrow"], dz["en"], dz["zh"], _chip_dies(dz), _bi(dz["lead_en"], dz["lead_zh"], cls="lead rvl d2")))
    if lesson.get("rgb"):
        rg = lesson["rgb"]
        secs.append(("rgb", rg["eyebrow"], rg["en"], rg["zh"], _chip_rgb(rg), _bi(rg["lead_en"], rg["lead_zh"], cls="lead rvl d2")))
    if lesson.get("clean"):
        cl = lesson["clean"]
        secs.append(("clean", cl["eyebrow"], cl["en"], cl["zh"], _chip_clean(cl), _bi(cl["lead_en"], cl["lead_zh"], cls="lead rvl d2")))
    if lesson.get("amd"):
        am = lesson["amd"]
        secs.append(("amd", am["eyebrow"], am["en"], am["zh"], _chip_amd(am), _bi(am["lead_en"], am["lead_zh"], cls="lead rvl d2")))
    if lesson.get("vf"):
        vf = lesson["vf"]
        secs.append(("vf", vf["eyebrow"], vf["en"], vf["zh"], _chip_vf(vf), _bi(vf["lead_en"], vf["lead_zh"], cls="lead rvl d2")))
    if lesson.get("who"):
        wh = lesson["who"]
        secs.append(("who", wh["eyebrow"], wh["en"], wh["zh"], _chip_who(wh), _bi(wh["lead_en"], wh["lead_zh"], cls="lead rvl d2")))
    if lesson.get("band"):
        bd = lesson["band"]
        secs.append(("band", bd["eyebrow"], bd["en"], bd["zh"], _chip_band(bd), _bi(bd["lead_en"], bd["lead_zh"], cls="lead rvl d2")))
    if lesson.get("pack"):
        pk = lesson["pack"]
        secs.append(("pack", pk["eyebrow"], pk["en"], pk["zh"], _chip_pack(pk), _bi(pk["lead_en"], pk["lead_zh"], cls="lead rvl d2")))
    if lesson.get("nail"):
        nl = lesson["nail"]
        secs.append(("nail", nl["eyebrow"], nl["en"], nl["zh"], _chip_nail(nl), _bi(nl["lead_en"], nl["lead_zh"], cls="lead rvl d2")))
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
            f'<button type="button" class="ph-go" data-lab-demo="{pt["demo"]}">{"Watch it in 3D · 在模型中看" if pt.get("mini") else "Try it in 3D · 在模型中試"} <i>&uarr;</i></button>'
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
                "wafer": ("From sand to chip in a sentence", "一句話記住沙子變晶片"),
                "litho": ("Drawing with light in a sentence", "一句話記住用光畫電路"),
                "scale": ("Nanometers in a sentence", "一句話記住奈米"),
                "package": ("Packaging in a sentence", "一句話記住封裝"),
                "hbm": ("HBM in a sentence", "一句話記住 HBM"),
                "island": ("The chip island in a sentence", "一句話記住晶片島"),
                "heat": ("Chip heat in a sentence", "一句話記住晶片的熱"),
                "aichip": ("AI chips in a sentence", "一句話記住 AI 晶片"),
                "fab": ("Water and power in a sentence", "一句話記住晶圓廠的水和電"),
                "led": ("LEDs in a sentence", "一句話記住 LED")}[kind]
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
        return chipsilicon_svg(60) if l.get("card") == "silicon" else chiptransistor_svg(60) if l.get("card") == "transistor" else chipwafer_svg(60) if l.get("card") == "wafer" else chiplitho_svg(60) if l.get("card") == "litho" else chipscale_svg(60) if l.get("card") == "scale" else chippackage_svg(60) if l.get("card") == "package" else chiphbm_svg(60) if l.get("card") == "hbm" else chipisland_svg(60) if l.get("card") == "island" else chipheat_svg(60) if l.get("card") == "heat" else chipai_svg(60) if l.get("card") == "aichip" else chipfab_svg(60) if l.get("card") == "fab" else chipled_svg(60) if l.get("card") == "led" else l["icon"]
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


# ---- 地球與天氣 Earth and Weather（資料驅動，data/earth.json）----
# 架構照晶片與半導體：系列首頁分單元（單元導覽＋.lc-row 橫向課程卡），課程頁照天文教育。
# units[].lessons 是做好的課、units[].planned 是製作中。3D 原始碼在 tools/earth/src/（three.js、esbuild，每課一個入口），
# 打包成 assets/js/earth-*.js。面板沿用 astro.css，卡片、數字、小工具外框沿用 chips.css 的 cp- 類別（所以本系列頁面也載 chips.css），
# 本系列多出來的在 earth.css（class 前綴 ew-；ea- 已被人體探索的耳朵用掉）。
# 和晶片系列不同的地方：每課的 3D 面板、小工具、小圖示都用下面三個表登記，口訣標題、安全提醒標題寫在 JSON，加課不用改 build_earth_lesson。
_earthj = os.path.join(ROOT, "data", "earth.json")
EARTH = json.load(open(_earthj, encoding="utf-8")) if os.path.exists(_earthj) else None
EARTH_BASE = "/resources/classes/earth/"
_EARTH_JS = {"quake": "earth-quake", "inside": "earth-inside", "shake": "earth-shake", "mountain": "earth-mountain", "volcano": "earth-volcano", "rain": "earth-rain", "wind": "earth-wind", "typhoon": "earth-typhoon", "lightning": "earth-lightning", "forecast": "earth-forecast", "river": "earth-river"}   # lab.kind → assets/js/<bundle>.js

def _earth_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/chips.css", "assets/css/earth.css", *(f"assets/js/{j}.js" for j in _EARTH_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _earth_head(js=None):
    v = _earth_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return (f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/chips.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/earth.css?v={v}">\n{tag}')

def earthglobe_svg(size=56):
    """地球與天氣的系列小圖示：切開一角的地球（看得到裡面一層一層），右上角一朵雲。"""
    return (f'<svg class="earthglobe-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="28" cy="33" r="22" fill="#2f7bd6"/>'
            '<path d="M14 24c4-5 10-4 12 0s-2 8-6 9-9-4-6-9zM30 44c3-3 8-2 9 2s-4 7-8 5-3-5-1-7z" fill="#4fb873"/>'
            '<path d="M28 33 L28 11 A22 22 0 0 1 50 33 Z" fill="#7a4a2a"/>'
            '<path d="M28 33 L28 16 A17 17 0 0 1 45 33 Z" fill="#e0662a"/>'
            '<path d="M28 33 L28 22.5 A10.5 10.5 0 0 1 38.5 33 Z" fill="#ffb347"/>'
            '<path d="M28 33 L28 28 A5 5 0 0 1 33 33 Z" fill="#fff1b8"/>'
            '<path d="M41 14a5 5 0 0 1 9.6-1.6A4.2 4.2 0 0 1 54 20.5H42.5A3.6 3.6 0 0 1 41 14z" fill="#f4f7fb"/></svg>')

def earthquake_svg(size=56):
    """第二課的課程卡小圖示：兩塊地殼沿一條斜的斷層錯開，上面是地震儀畫出的波形。"""
    return (f'<svg class="earthquake-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M3 34 H28 L38 54 H3 Z" fill="#8a7358"/><path d="M3 34 H28 L30 38 H3 Z" fill="#4f9a5a"/>'
            '<path d="M31 28 H57 V54 H44 Z" fill="#a58a63"/><path d="M31 28 H57 V32 H33 Z" fill="#4f9a5a"/>'
            '<path d="M27 32 L41 56" stroke="#ffd36e" stroke-width="2.4" stroke-linecap="round"/>'
            '<path d="M4 15 H16 L19 9 L23 22 L27 4 L31 24 L35 10 L38 17 H56" fill="none" stroke="#ff5a46" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>')

def render_earthquake_lab(lesson):
    """第二課：斷層卡住、累積、滑動（彈性回彈）與 P 波、S 波（assets/js/earth-quake.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-qk-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-qk-lab rvl" data-earthquake-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of the Earth's crust: one side is pushed against the other along a sloping fault, the rock bends and stores force, and then it slips and sends out earthquake waves · 剖開的地殼 3D 模型：一側被推向另一側，岩層沿著斜的斷層被壓彎、把力存起來，然後突然滑動、送出地震波"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">How tightly is the fault stuck? · 斷層卡得多緊？</p>
      <div class="cp-dope cp-tr-quick ew-qk-modes" role="group" aria-label="Fault · 斷層">
        <button type="button" data-mode="easy" aria-pressed="true">Slips easily<small>容易滑動</small></button>
        <button type="button" data-mode="hard" aria-pressed="false">Stuck hard<small>卡得很緊</small></button>
      </div>
      <div class="cp-ht-meter"><p class="ew-qk-k">Force stored in the rock · 岩層裡存的力</p><div class="cp-ht-bar ew-qk-bar"><i></i></div><p class="cp-ht-status ew-qk-status"></p></div>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Since the last earthquake · 距離上次地震</dt><dd class="ew-qk-years"></dd></div>
        <div><dt>Plate movement stored · 累積的板塊移動</dt><dd class="ew-qk-stored"></dd></div>
        <div><dt>Earthquakes so far · 已經發生幾次</dt><dd class="ew-qk-count"></dd></div>
        <div><dt>The fault slips · 斷層滑動</dt><dd class="ew-qk-slip"></dd></div>
      </dl>
      {msgs}
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

def _earth_warn(wn):
    """「警報響了以後，還有幾秒？」（earth-quake.js 的 initWarn；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-km="{p["km"]}" aria-pressed="false">{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></button>' for p in wn["places"])
    return (f'<div class="cp-cnt ew-wn rvl" data-earth-warn>'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>How far are you from the earthquake? · 你離地震多遠 <output class="ew-wn-km-out">100 km</output></span>'
            f'<input type="range" class="al-age ew-wn-km" min="10" max="300" step="10" value="100"></label>'
            f'<div class="cp-dpw-pre ew-wn-pre" role="group" aria-label="Distance · 距離">{pre}</div>'
            f'<div class="ew-wn-tl" aria-hidden="true"><i class="ew-wn-gap"></i>'
            f'<b class="ew-wn-p" data-k="P"></b><b class="ew-wn-a" data-k="&#128241;"></b><b class="ew-wn-s" data-k="S"></b></div>'
            f'<p class="ew-wn-key"><span><i class="p"></i>P wave arrives · P 波到</span><span><i class="a"></i>Alert sent · 警報發出</span><span><i class="s"></i>S wave arrives · S 波到</span></p>'
            f'<p class="cp-cnt-note">{html.escape(wn["note_en"])}<span class="zh">{html.escape(wn["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Warning time · 預警時間</p>'
            f'<p class="cp-home-big"><b class="ew-wn-n">0</b> seconds · 秒</p>'
            f'<p class="cp-home-note"><span class="ew-wn-en"></span><span class="zh ew-wn-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def render_earthinside_lab(lesson):
    """第一課：切開的地球四層（深度滑桿）與地震波怎麼穿過地球（assets/js/earth-inside.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-in-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    stops = "".join(f'<button type="button" data-layer="{k}" data-km="{km}" aria-pressed="false">{en}<small>{zh}</small></button>'
                    for k, km, en, zh in [("crust", 10, "Crust", "地殼"), ("mantle", 1500, "Mantle", "地函"), ("outer", 4000, "Outer core", "外核"), ("inner", 6000, "Inner core", "內核")])
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-in-lab rvl" data-earthinside-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of the Earth cut in half, showing the crust, the mantle, the liquid outer core, and the solid inner core, and how earthquake waves pass through them · 切成一半的地球 3D 模型：地殼、地函、液態的外核、固態的內核，以及地震波怎麼穿過它們"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="layers" aria-pressed="true">Layers<small>四層</small></button>
        <button type="button" data-view="waves" aria-pressed="false">Earthquake waves<small>地震波</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <div class="cp-is-jbox ew-in-lbox">
        <p class="al-sky-k">How deep do you want to go? · 你想下去多深？</p>
        <label class="al-slider cp-is-yrow"><span>Depth · 深度</span>
          <input type="range" class="al-age ew-in-depth" min="0" max="1000" step="1" value="0" aria-label="Depth · 深度"></label>
        <div class="cp-dope ew-in-stops" role="group" aria-label="Layers · 四層">{stops}</div>
        <dl class="cp-nums cp-lt-nums ew-nums">
          <div><dt>Depth · 深度</dt><dd class="ew-in-d"></dd></div>
          <div><dt>Layer · 哪一層</dt><dd class="ew-in-layer"></dd></div>
          <div><dt>How far · 走了多遠</dt><dd class="ew-in-pct"></dd></div>
          <div><dt>This layer is · 這一層</dt><dd class="ew-in-vol"></dd></div>
        </dl>
        {msgs}
      </div>
      <div class="cp-is-jbox ew-in-wbox" hidden>
        <p class="al-sky-k">Listening to the Earth · 聽地球的聲音</p>
        <p class="cp-msg">{html.escape(lab["waves_en"])}<span class="zh">{html.escape(lab["waves_zh"])}</span></p>
        <ul class="ew-in-key">
          <li><i style="background:#ffe27a"></i>P waves · P 波</li><li><i style="background:#ff5a46"></i>S waves · S 波</li>
          <li><i style="background:#7cf29a"></i>0° to 103°: both arrive · 兩種都收得到</li>
          <li><i style="background:#5a6478"></i>103° to 143°: shadow zone · 陰影帶</li>
          <li><i style="background:#ffe27a"></i>Beyond 143°: P waves only · 只有 P 波</li>
        </ul>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Go down · 往下走</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _earth_dig(dg):
    """「一路往下，要走多久？」（earth-inside.js 的 initDig；不需要 WebGL）。"""
    rides = "".join(f'<button type="button" data-kmh="{r["kmh"]}" aria-pressed="false">{html.escape(r["en"])}<small>{html.escape(r["zh"])}</small></button>' for r in dg["rides"])
    rows = "".join(f'<div class="ew-dg-row"><span>{en}<small class="zh">{zh}</small></span><span class="ew-dg-bar"><i style="background:{c}"></i></span><span class="ew-dg-t"><b></b><small></small></span></div>'
                   for en, zh, c in [("Crust", "地殼", "#8a6a4a"), ("Mantle", "地函", "#d9572b"), ("Outer core", "外核", "#ffa62b"), ("Inner core", "內核", "#e8c75a")])
    return (f'<div class="cp-cnt ew-dg rvl" data-earth-dig>'
            f'<div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>Choose your ride · 選一種交通工具</span></p>'
            f'<div class="cp-dpw-pre ew-dg-rides" role="group" aria-label="Rides · 交通工具">{rides}</div>'
            f'<div class="ew-dg-rows">{rows}</div>'
            f'<p class="cp-cnt-note">{html.escape(dg["note_en"])}<span class="zh">{html.escape(dg["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Time to reach the center · 到地心要花</p>'
            f'<p class="cp-home-big"><b class="ew-dg-n">0</b> <span class="ew-dg-u"></span></p>'
            f'<p class="cp-home-note"><span class="ew-dg-en"></span><span class="zh ew-dg-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def earthshake_svg(size=56):
    """第三課的課程卡小圖示：一個震央往外一圈一圈，越外面顏色越淡；旁邊一個「M」。"""
    rings = "".join(f'<circle cx="24" cy="34" r="{r}" fill="none" stroke="{c}" stroke-width="3.2"/>' for r, c in [(20, "#9fe0c0"), (14, "#ffe27a"), (8, "#ff8a2a")])
    return (f'<svg class="earthshake-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{rings}<circle cx="24" cy="34" r="3.4" fill="#d8251a"/>'
            '<rect x="38" y="4" width="19" height="17" rx="4" fill="#1c2740"/><path d="M42 17 V8 L47.5 14 L53 8 V17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>')

def render_earthshake_lab(lesson):
    """第三課：台灣地圖上一個示例地震，調規模與深度看十個城市的震度（assets/js/earth-shake.js 綁這裡的 class；衰減公式是示例）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-sk-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-sk-lab rvl" data-earthshake-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D map of Taiwan with one example earthquake: columns on ten cities show how strongly each one shakes, and rings show the shaking fading with distance · 台灣的 3D 地圖與一個示例地震：十個城市上的柱子顯示各地搖得多厲害，一圈一圈的線顯示搖晃隨距離減弱"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · Where is the earthquake? · 地震在哪裡？</p>
      <div class="cp-dope ew-sk-epis" role="group" aria-label="Epicenter · 震央">
        <button type="button" data-epi="east" aria-pressed="true">Off the east coast<small>東部外海</small></button>
        <button type="button" data-epi="central" aria-pressed="false">Central Taiwan<small>中部</small></button>
        <button type="button" data-epi="southwest" aria-pressed="false">The southwest<small>西南部</small></button>
      </div>
      <label class="al-slider cp-is-yrow"><span>2 · Magnitude · 規模 <output class="ew-sk-mag-out">6.5</output></span>
        <input type="range" class="al-age ew-sk-mag" min="4" max="7.5" step="0.1" value="6.5"></label>
      <label class="al-slider cp-is-yrow"><span>3 · Depth · 深度 <output class="ew-sk-dep-out">15 km</output></span>
        <input type="range" class="al-age ew-sk-dep" min="5" max="100" step="5" value="15"></label>
      <dl class="cp-nums cp-lt-nums ew-nums ew-sk-nums">
        <div><dt>Magnitude · 規模</dt><dd class="ew-sk-m"></dd></div>
        <div><dt>Strongest · 最大震度</dt><dd class="ew-sk-max"></dd></div>
        <div><dt>Energy · 能量</dt><dd class="ew-sk-en"></dd></div>
      </dl>
      <ul class="ew-sk-list" aria-label="Intensity in ten cities · 十個城市的震度"></ul>
      {msgs}
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

def _earth_scale10(sc):
    """「震度分級表」（earth-shake.js 的 initScale；十個級別照中央氣象署的表，英文是本站翻譯）。"""
    btns = "".join(f'<button type="button" aria-pressed="false">{html.escape(lv["short"])}</button>' for lv in sc["levels"])
    levels = html.escape(json.dumps(sc["levels"], ensure_ascii=False))
    row = lambda k, en, zh: (f'<div class="ew-sc-row"><p class="ew-sc-k">{en} · {zh}</p>'
                             f'<p class="ew-sc-t"><span class="ew-sc-{k}-en"></span><span class="zh ew-sc-{k}-zh"></span></p></div>')
    return (f'<div class="cp-cnt ew-sc rvl" data-earth-scale10 data-levels="{levels}">'
            f'<div class="cp-cnt-in">'
            f'<p class="cp-cnt-l"><span>Choose a level · 選一個級別</span></p>'
            f'<div class="ew-sc-lv" role="group" aria-label="Intensity levels · 震度級別">{btns}</div>'
            f'{row("feel", "What people feel", "人的感受")}{row("in", "Indoors", "屋內情形")}{row("out", "Outdoors", "屋外情形")}'
            f'<p class="cp-cnt-note">{html.escape(sc["note_en"])}<span class="zh">{html.escape(sc["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out" aria-live="polite">'
            f'<p class="cp-home-k">Intensity · 震度</p>'
            f'<p class="cp-home-big"><b class="ew-sc-n"></b><span class="ew-sc-zh"></span></p>'
            f'<p class="cp-home-note">{html.escape(sc["tip_en"])}<span class="zh">{html.escape(sc["tip_zh"])}</span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The table works in your browser and needs JavaScript. · 這張表在瀏覽器裡執行，需要開啟 JavaScript。</p></noscript>')

def earthmountain_svg(size=56):
    """第四課的課程卡小圖示：被兩邊擠起來的山（看得到彎曲的地層），兩邊各一個往中間推的箭頭。"""
    return (f'<svg class="earthmountain-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M4 46 L20 22 L27 30 L36 12 L56 46 Z" fill="#8a7358"/><path d="M36 12 L41 21 L36 19 L31 22 Z" fill="#f4f7fb"/>'
            '<path d="M10 42 Q22 30 28 36 T46 40" fill="none" stroke="#c9b08a" stroke-width="1.8"/><path d="M14 46 Q24 38 30 42 T50 46" fill="none" stroke="#c9b08a" stroke-width="1.8"/>'
            '<rect x="2" y="46" width="56" height="5" rx="1.5" fill="#4f9a5a"/>'
            '<path d="M3 56 H13 M10 53 L13 56 L10 59 M57 56 H47 M50 53 L47 56 L50 59" fill="none" stroke="#ffb347" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>')

def render_earthmountain_lab(lesson):
    """第四課：擠壓造山與侵蝕的拉鋸（assets/js/earth-mountain.js 綁這裡的 class；高度模型是示例，垂直誇大）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-mt-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-mt-lab rvl" data-earthmountain-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of the crust and the sea: mud and sand on the seabed are squeezed and pushed up into mountains while rain and rivers wear them down and carry the sand to a plain · 剖開的地殼與海的 3D 模型：海底的泥沙被擠壓、往上推成山，雨水和河流又把山削下來，把泥沙帶到平原"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · How fast is the land pushed up? · 往上推得多快？</p>
      <div class="cp-dope ew-mt-push" role="group" aria-label="Uplift · 抬升">
        <button type="button" data-push="off" aria-pressed="false">Stopped<small>停了</small></button>
        <button type="button" data-push="slow" aria-pressed="false">2.5 mm<small>慢</small></button>
        <button type="button" data-push="now" aria-pressed="true">5 mm<small>台灣</small></button>
        <button type="button" data-push="fast" aria-pressed="false">7.5 mm<small>快</small></button>
      </div>
      <p class="al-sky-k">2 · How hard do rain and rivers wear it down? · 雨水和河流削得多兇？</p>
      <div class="cp-dope ew-mt-rain" role="group" aria-label="Erosion · 侵蝕">
        <button type="button" data-rain="weak" aria-pressed="false">Gently<small>輕</small></button>
        <button type="button" data-rain="medium" aria-pressed="true">Steadily<small>中</small></button>
        <button type="button" data-rain="strong" aria-pressed="false">Fiercely<small>兇</small></button>
      </div>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Time · 時間</dt><dd class="ew-mt-t"></dd></div>
        <div><dt>Highest peak · 最高的山</dt><dd class="ew-mt-h"></dd></div>
        <div><dt>Pushed up · 推高</dt><dd class="ew-mt-up"></dd></div>
        <div><dt>Worn away · 削掉</dt><dd class="ew-mt-off"></dd></div>
      </dl>
      {msgs}
      <button type="button" class="cp-wf-tour ew-mt-reset"><span aria-hidden="true">&#8634;</span> <span class="t">Start over · 從頭來</span></button>
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

def _earth_peak(pk):
    """「如果沒有侵蝕，山會有多高？」（earth-mountain.js 的 initPeak；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-y="{m["y"]}" aria-pressed="false">{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>' for m in pk["marks"])
    return (f'<div class="cp-cnt ew-pk rvl" data-earth-peak>'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>How long has the land been rising? · 往上升了多久 <output class="ew-pk-yr-out"></output></span>'
            f'<input type="range" class="al-age ew-pk-yr" min="0" max="5000000" step="10000" value="790000"></label>'
            f'<div class="cp-dpw-pre ew-pk-pre" role="group" aria-label="Examples · 例子">{pre}</div>'
            f'<p class="cp-cnt-note">{html.escape(pk["note_en"])}<span class="zh">{html.escape(pk["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-pk-out" aria-live="polite">'
            f'<div class="ew-pk-col" aria-hidden="true"><i class="ew-pk-bar"></i><span class="ew-pk-mark"><b>Yushan · 玉山</b></span></div>'
            f'<div><p class="cp-home-k">Height with no erosion · 沒有侵蝕的高度</p>'
            f'<p class="cp-home-big"><b class="ew-pk-n">0</b> meters · 公尺</p>'
            f'<p class="cp-home-note"><span class="ew-pk-en"></span><span class="zh ew-pk-zh"></span></p></div>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def earthvolcano_svg(size=56):
    """第五課的課程卡小圖示：切開的火山，底下是岩漿庫，一條通道通到山頂，山頂冒出熔岩和煙。"""
    return (f'<svg class="earthvolcano-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M4 46 L24 20 H36 L56 46 Z" fill="#857466"/><rect x="2" y="46" width="56" height="12" rx="2" fill="#6b5a4a"/>'
            '<ellipse cx="30" cy="52" rx="13" ry="4.2" fill="#ff7a1a"/><rect x="28.3" y="20" width="3.4" height="30" fill="#ff7a1a"/>'
            '<path d="M24 20 Q30 14 36 20 Z" fill="#ffd23c"/><circle cx="24" cy="10" r="4.5" fill="#8b8f99"/><circle cx="32" cy="7" r="5.5" fill="#a3a7b1"/><circle cx="40" cy="11" r="4" fill="#8b8f99"/></svg>')

def render_earthvolcano_lab(lesson):
    """第五課：切開的火山，岩漿稀或黏、氣體少或多，四種噴發（assets/js/earth-volcano.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-vc-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-vc-lab rvl" data-earthvolcano-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of a volcano: a magma chamber below, a channel up to the crater, gas bubbles that grow as they rise, and four kinds of eruption · 切開的火山 3D 模型：底下的岩漿庫、通到火山口的通道、越往上越大的氣泡，以及四種噴發"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · What is the magma like? · 岩漿是什麼樣子？</p>
      <div class="cp-dope cp-tr-quick ew-vc-magma" role="group" aria-label="Magma · 岩漿">
        <button type="button" data-magma="runny" aria-pressed="true">Runny<small>稀，像糖漿</small></button>
        <button type="button" data-magma="sticky" aria-pressed="false">Sticky<small>黏，像麥芽糖</small></button>
      </div>
      <p class="al-sky-k">2 · How much gas is in it? · 裡面有多少氣體？</p>
      <div class="cp-dope cp-tr-quick ew-vc-gas" role="group" aria-label="Gas · 氣體">
        <button type="button" data-gas="low" aria-pressed="true">A little gas<small>氣體少</small></button>
        <button type="button" data-gas="high" aria-pressed="false">A lot of gas<small>氣體多</small></button>
      </div>
      <div class="cp-ht-meter"><p class="ew-qk-k">Pressure under the volcano · 火山底下的壓力</p><div class="cp-ht-bar ew-qk-bar ew-vc-bar"><i></i></div><p class="cp-ht-status ew-vc-status"></p></div>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>This eruption · 這種噴發</dt><dd class="ew-vc-style"></dd></div>
        <div><dt>Count · 次數</dt><dd class="ew-vc-count"></dd></div>
      </dl>
      {msgs}
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

def _earth_bubble(bb):
    """「氣泡往上升會變多大？」（earth-volcano.js 的 initBubble；波以耳定律；不需要 WebGL）。"""
    pre = "".join(f'<button type="button" data-km="{d["km10"]}" aria-pressed="false">{html.escape(d["en"])}<small>{html.escape(d["zh"])}</small></button>' for d in bb["depths"])
    return (f'<div class="cp-cnt ew-bb rvl" data-earth-bubble>'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>How deep does the bubble start? · 氣泡從多深出發 <output class="ew-bb-km-out">3.0 km</output></span>'
            f'<input type="range" class="al-age ew-bb-km" min="0" max="50" step="1" value="30"></label>'
            f'<div class="cp-dpw-pre ew-bb-pre" role="group" aria-label="Depth · 深度">{pre}</div>'
            f'<p class="cp-cnt-note">{html.escape(bb["note_en"])}<span class="zh">{html.escape(bb["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-bb-out" aria-live="polite">'
            f'<div class="ew-bb-pic" aria-hidden="true"><span class="ew-bb-top"></span><span class="ew-bb-marker"><i class="ew-bb-deep"></i></span></div>'
            f'<div><p class="cp-home-k">The gas grows to · 氣體膨脹成</p>'
            f'<p class="cp-home-big"><b class="ew-bb-n">1</b> times the volume · 倍的體積</p>'
            f'<p class="cp-home-sub">Pressure where it starts: <b class="ew-bb-atm">1</b> atmospheres · 出發地的壓力（大氣壓）</p>'
            f'<p class="cp-home-note"><span class="ew-bb-en"></span><span class="zh ew-bb-zh"></span></p></div>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def earthrain_svg(size=56):
    """第六課的課程卡小圖示：一朵雲靠在山的一側下雨，山的另一側是晴天。"""
    drops = "".join(f'<path d="M{12 + i * 5} {30 + (i % 2) * 3} l-2 6" stroke="#58b4ff" stroke-width="2.2" stroke-linecap="round"/>' for i in range(4))
    return (f'<svg class="earthrain-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M6 54 L34 20 L56 54 Z" fill="#4f8a55"/><path d="M34 20 L56 54 H40 Z" fill="#c9a95a"/>'
            '<circle cx="14" cy="18" r="7" fill="#f4f7fb"/><circle cx="23" cy="14" r="8.5" fill="#f4f7fb"/><circle cx="31" cy="19" r="6" fill="#f4f7fb"/><rect x="10" y="19" width="24" height="7" rx="3.5" fill="#f4f7fb"/>'
            f'{drops}<circle cx="50" cy="12" r="5" fill="#ffd36e"/></svg>')

def render_earthrain_lab(lesson):
    """第六課：一座島（海、山、海）的剖面，潮溼的空氣被山抬升成雲降雨、背風面乾熱（assets/js/earth-rain.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-rn-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-rn-lab rvl" data-earthrain-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of an island with a mountain between two seas: moist air from the sea is pushed up the mountain, cools, and turns into cloud and rain, then sinks dry and warm on the far side · 一座島的 3D 剖面，山的兩邊都是海：海上來的潮溼空氣被山抬高、變冷，成雲降雨，翻過山之後又乾又熱地下沉"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · Where does the wind come from? · 風從哪裡來？</p>
      <div class="cp-dope cp-tr-quick ew-rn-wind" role="group" aria-label="Wind · 風向">
        <button type="button" data-wind="west" aria-pressed="true">From the west<small>從西邊的海上來</small></button>
        <button type="button" data-wind="east" aria-pressed="false">From the east<small>從東邊的海上來</small></button>
      </div>
      <p class="al-sky-k">2 · How high is the mountain? · 山有多高？</p>
      <div class="cp-dope cp-tr-quick ew-rn-hill" role="group" aria-label="Mountain · 山">
        <button type="button" data-hill="low" aria-pressed="false">A low hill<small>矮丘 600 公尺</small></button>
        <button type="button" data-hill="high" aria-pressed="true">A high mountain<small>高山 2,500 公尺</small></button>
      </div>
      <label class="al-slider cp-is-yrow"><span>3 · Temperature by the sea · 海邊的氣溫 <output class="ew-rn-temp-out">28°C</output></span>
        <input type="range" class="al-age ew-rn-temp" min="15" max="34" step="1" value="28"></label>
      <label class="al-slider cp-is-yrow"><span>4 · Humidity of the sea air · 海上空氣的溼度 <output class="ew-rn-hum-out">80%</output></span>
        <input type="range" class="al-age ew-rn-hum" min="50" max="100" step="5" value="80"></label>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Dew point · 露點</dt><dd class="ew-rn-dew"></dd></div>
        <div><dt>Cloud base · 雲底</dt><dd class="ew-rn-base"></dd></div>
        <div><dt>Mountain top · 山頂</dt><dd class="ew-rn-top"></dd></div>
        <div><dt>Far side · 山的另一邊</dt><dd class="ew-rn-lee"></dd></div>
      </dl>
      {msgs}
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

def _earth_gauge(gg):
    """「這場雨有多少水？」（earth-rain.js 的 initGauge；雨量 × 面積，附中央氣象署的雨量分級；不需要 WebGL）。"""
    areas = "".join(f'<button type="button" data-m2="{a["m2"]}" aria-pressed="false">{html.escape(a["en"])}<small>{html.escape(a["zh"])}</small></button>' for a in gg["areas"])
    pre = "".join(f'<button type="button" data-mm="{mm}">{mm} mm</button>' for mm in (10, 80, 200, 350, 500))
    classes = html.escape(json.dumps(gg["classes"], ensure_ascii=False))
    return (f'<div class="cp-cnt ew-gg rvl" data-earth-gauge data-classes="{classes}">'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>1 · Rain in 24 hours · 24 小時的雨量 <output class="ew-gg-mm-out">80 mm</output></span>'
            f'<input type="range" class="al-age ew-gg-mm" min="0" max="600" step="5" value="80"></label>'
            f'<div class="cp-dpw-pre ew-gg-pre" role="group" aria-label="Rainfall · 雨量">{pre}</div>'
            f'<p class="cp-cnt-l cp-sun-l"><span>2 · Falling on · 下在哪裡</span></p>'
            f'<div class="cp-dpw-pre ew-gg-areas" role="group" aria-label="Area · 面積">{areas}</div>'
            f'<p class="cp-cnt-note">{html.escape(gg["note_en"])}<span class="zh">{html.escape(gg["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-gg-out" aria-live="polite">'
            f'<div class="ew-gg-tube" aria-hidden="true"><i class="ew-gg-fill"></i></div>'
            f'<div><p class="cp-home-k">That is · 這麼多水</p>'
            f'<p class="cp-home-big"><b class="ew-gg-n">0</b> liters · 公升</p>'
            f'<p class="cp-home-sub">About <b class="ew-gg-b">0</b> large bottles of 1.5 liters · 大約這麼多瓶 1.5 公升的寶特瓶</p>'
            f'<p class="cp-home-note">The Central Weather Administration calls this: <b class="ew-gg-cls"></b><span class="zh">中央氣象署的分級：<b class="ew-gg-cls-zh"></b></span></p></div>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def earthwind_svg(size=56):
    """第七課的課程卡小圖示：海和陸地，一支從海上吹向陸地的風的箭頭。"""
    return (f'<svg class="earthwind-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="4" y="42" width="26" height="12" rx="2" fill="#2a6fc9"/><rect x="30" y="38" width="26" height="16" rx="2" fill="#4f8a55"/>'
            '<circle cx="46" cy="12" r="6" fill="#ffd36e"/>'
            '<path d="M8 30 H40" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M36 23 L46 30 L36 37 Z" fill="#fff"/>'
            '<path d="M10 20 H26 M14 12 H24" stroke="#9fd8ff" stroke-width="3" stroke-linecap="round"/></svg>')

def render_earthwind_lab(lesson):
    """第七課：海岸的剖面，一天的海風陸風、一年的季風（assets/js/earth-wind.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-wd-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-wd-lab rvl" data-earthwind-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D cutaway of a coast, with the sea on the left and the land on the right: air rises over the warmer side, and cooler air moves in along the ground to replace it · 海岸的 3D 剖面，左邊是海、右邊是陸地：比較熱的那一邊空氣上升，比較涼的空氣貼著地面補過來"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="day" aria-pressed="true">One day<small>一天</small></button>
        <button type="button" data-view="year" aria-pressed="false">One year<small>一年</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">Which side is warmer? · 哪一邊比較熱？</p>
      <label class="al-slider cp-is-yrow"><span><span class="ew-wd-x-lab">Time of day · 幾點</span> <output class="ew-wd-x-out">15:00</output></span>
        <input type="range" class="al-age ew-wd-x" min="0" max="23.5" step="0.5" value="15"></label>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Land · 陸地</dt><dd class="ew-wd-land"></dd></div>
        <div><dt>Sea · 海</dt><dd class="ew-wd-sea"></dd></div>
        <div><dt>Wind · 風向</dt><dd class="ew-wd-wind"></dd></div>
        <div><dt>Strength · 風力</dt><dd class="ew-wd-speed"></dd></div>
      </dl>
      {msgs}
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

def _earth_beaufort(bf):
    """「這是幾級風？」（earth-wind.js 的 initBeaufort；中央氣象署陸上應用之蒲福風級表 0–12 級；不需要 WebGL）。"""
    levels = html.escape(json.dumps(bf["levels"], ensure_ascii=False))
    return (f'<div class="cp-cnt ew-bf rvl" data-earth-beaufort data-levels="{levels}">'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>Wind force · 風力</span>'
            f'<input type="range" class="al-age ew-bf-f" min="0" max="12" step="1" value="3" aria-label="Beaufort force · 蒲福風級"></label>'
            f'<div class="ew-bf-pic" aria-hidden="true"><i class="ew-bf-pole"></i><i class="ew-bf-flag"></i></div>'
            f'<p class="cp-cnt-note">{html.escape(bf["note_en"])}<span class="zh">{html.escape(bf["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-bf-out" aria-live="polite">'
            f'<p class="cp-home-k">Beaufort force · 蒲福風級</p>'
            f'<p class="cp-home-big"><b class="ew-bf-n">3</b> <span class="ew-bf-name"></span> · <span class="ew-bf-name-zh"></span></p>'
            f'<p class="cp-home-sub"><b class="ew-bf-ms"></b> meters a second · 公尺／秒　<b class="ew-bf-kmh"></b> km/h · 公里／時</p>'
            f'<p class="cp-home-note"><span class="ew-bf-en"></span><span class="zh ew-bf-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The wind scale works in your browser and needs JavaScript. · 風級表在瀏覽器裡運作，需要開啟 JavaScript。</p></noscript>')

def earthtyphoon_svg(size=56):
    """第八課的課程卡小圖示：從上面看的颱風（兩條螺旋雲帶，中間一個眼）。"""
    return (f'<svg class="earthtyphoon-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="30" cy="30" r="27" fill="#1f5fae"/>'
            '<path d="M30 30 m0 -9 a9 9 0 1 0 9 9 c0 -12 -10 -20 -24 -18 c8 -8 26 -6 30 10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>'
            '<path d="M30 39 c-12 0 -20 10 -14 16 c10 6 26 0 30 -12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".9"/>'
            '<circle cx="30" cy="30" r="4.5" fill="#1f5fae"/></svg>')

def render_earthtyphoon_lab(lesson):
    """第八課：一團雲從散亂長成有螺旋、有眼的颱風，登陸後減弱（assets/js/earth-typhoon.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-ty-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-ty-lab rvl" data-earthtyphoon-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a typhoon over the sea: bands of cloud spiral counterclockwise around a clear eye, and the model can be cut open to show air rising around the eye and sinking inside it · 海面上的颱風 3D 模型：雲帶以逆時針方向繞著無雲的颱風眼旋轉，剖開可以看到空氣在眼的四周上升、在眼裡下沉"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="View · 視角">
        <button type="button" data-view="top" aria-pressed="true">From above<small>從上面看</small></button>
        <button type="button" data-view="cut" aria-pressed="false">Cut open<small>剖開看</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · Where is the storm? · 風暴在哪裡？</p>
      <div class="cp-dope cp-tr-quick ew-ty-place" role="group" aria-label="Place · 位置">
        <button type="button" data-place="sea" aria-pressed="true">Over warm sea<small>在溫暖的海面上</small></button>
        <button type="button" data-place="land" aria-pressed="false">Over land<small>登陸了</small></button>
      </div>
      <label class="al-slider cp-is-yrow"><span>2 · Wind near the center · 近中心最大風速 <output class="ew-ty-v-out">22 m/s</output></span>
        <input type="range" class="al-age ew-ty-v" min="10" max="60" step="1" value="22"></label>
      <div class="cp-ht-meter"><p class="ew-qk-k">Strength · 強度</p><div class="cp-ht-bar"><i class="ew-ty-bar"></i></div><p class="cp-ht-status ew-ty-cat"></p></div>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Wind · 風速</dt><dd class="ew-ty-kmh"></dd></div>
        <div><dt>Wind scale · 風級</dt><dd class="ew-ty-bf"></dd></div>
        <div><dt>The eye · 颱風眼</dt><dd class="ew-ty-eye"></dd></div>
      </dl>
      {msgs}
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

def _earth_eyepass(ep):
    """「颱風眼經過你家」（earth-typhoon.js 的 initEyepass；五個階段，依中央氣象署颱風百問；不需要 WebGL）。"""
    steps = html.escape(json.dumps(ep["steps"], ensure_ascii=False))
    btns = "".join(f'<button type="button" aria-pressed="false">{i + 1}<small>{html.escape(st["k_zh"])}</small></button>' for i, st in enumerate(ep["steps"]))
    return (f'<div class="cp-cnt ew-ep rvl" data-earth-eyepass data-steps="{steps}">'
            f'<div class="cp-cnt-in">'
            f'<div class="ew-ep-map" aria-hidden="true"><i class="ew-ep-storm"></i><i class="ew-ep-town"></i></div>'
            f'<p class="ew-ep-cap">The red dot is your town. · 紅點是你住的地方。</p>'
            f'<div class="cp-dpw-pre ew-ep-steps" role="group" aria-label="Stage · 階段">{btns}</div>'
            f'<p class="cp-cnt-note">{html.escape(ep["note_en"])}<span class="zh">{html.escape(ep["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-ep-out" aria-live="polite">'
            f'<p class="cp-home-k">Stage <span class="ew-ep-k"></span> · 階段</p>'
            f'<p class="cp-home-big"><span class="ew-ep-t"></span> · <span class="ew-ep-t-zh"></span></p>'
            f'<div class="ew-ep-meter"><span>Wind · 風</span><div class="ew-ep-track"><i class="ew-ep-wind"></i></div><b class="ew-ep-dir"></b></div>'
            f'<p class="cp-home-note"><span class="ew-ep-en"></span><span class="zh ew-ep-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">This walk-through works in your browser and needs JavaScript. · 這段說明在瀏覽器裡運作，需要開啟 JavaScript。</p></noscript>')

def earthlightning_svg(size=56):
    """第九課的課程卡小圖示：一朵深色的雲和一道閃電。"""
    return (f'<svg class="earthlightning-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="20" cy="22" r="10" fill="#5b6785"/><circle cx="33" cy="17" r="12" fill="#6c7896"/><circle cx="44" cy="24" r="8" fill="#5b6785"/><rect x="12" y="22" width="40" height="10" rx="5" fill="#5b6785"/>'
            '<path d="M33 30 L24 44 H31 L27 56 L41 39 H33 L38 30 Z" fill="#ffd84a"/></svg>')

def render_earthlightning_lab(lesson):
    """第九課：雷雨雲充電、放電，聲音的圈照真實速度傳到房子（assets/js/earth-lightning.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-lt-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-lt-lab rvl" data-earthlightning-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a thundercloud, a tree, and a house: electric charge builds up in the cloud, lightning jumps, and a ring of sound spreads out and reaches the house a few seconds later · 雷雨雲、一棵樹和一間房子的 3D 模型：雲裡的電越積越多，閃電放電，聲音的圈往外擴，幾秒之後才傳到房子"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · Where does it jump? · 閃電打在哪裡？</p>
      <div class="cp-dope cp-tr-quick ew-lt-kind" role="group" aria-label="Kind of lightning · 閃電的種類">
        <button type="button" data-kind="ground" aria-pressed="true">Cloud to ground<small>從雲打到地面</small></button>
        <button type="button" data-kind="cloud" aria-pressed="false">Inside the cloud<small>在雲裡面</small></button>
      </div>
      <label class="al-slider cp-is-yrow"><span>2 · How far away are you? · 你離閃電多遠？ <output class="ew-lt-d-out">2 km</output></span>
        <input type="range" class="al-age ew-lt-d" min="1" max="5" step="0.5" value="2"></label>
      <div class="cp-ht-meter"><p class="ew-qk-k">Charge in the cloud · 雲裡累積的電</p><div class="cp-ht-bar"><i class="ew-lt-bar"></i></div><p class="cp-ht-status ew-lt-status"></p></div>
      <button type="button" class="cp-btn ew-lt-strike">⚡ Strike now · 現在就放電</button>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Light · 光</dt><dd class="ew-lt-light"></dd></div>
        <div><dt>Thunder · 雷聲</dt><dd class="ew-lt-delay"></dd></div>
        <div><dt>Timer · 計時</dt><dd class="ew-lt-timer"></dd></div>
      </dl>
      {msgs}
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

def _earth_count(ct):
    """「這道閃電離我多遠？」（earth-lightning.js 的 initCount；秒數 × 每秒 340 公尺；不需要 WebGL）。"""
    return (f'<div class="cp-cnt ew-th rvl" data-earth-count>'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>Seconds between the flash and the thunder · 閃電和雷聲隔了幾秒 <output class="ew-th-s-out">3 s</output></span>'
            f'<input type="range" class="al-age ew-th-s" min="0" max="30" step="1" value="3"></label>'
            f'<div class="ew-th-sky" data-state="idle"><p class="ew-th-say">Press the button, then count. · 按下按鈕，然後開始數。</p></div>'
            f'<button type="button" class="cp-btn ew-th-go">⚡ Test me · 考考我</button>'
            f'<p class="ew-th-ans" hidden></p>'
            f'<p class="cp-cnt-note">{html.escape(ct["note_en"])}<span class="zh">{html.escape(ct["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-th-out" aria-live="polite">'
            f'<p class="cp-home-k">The lightning was about · 這道閃電大約在</p>'
            f'<p class="cp-home-big"><b class="ew-th-m">1,020</b> meters away · 公尺外</p>'
            f'<p class="cp-home-sub">That is about <b class="ew-th-km">1.0</b> kilometers. · 大約是這麼多公里。</p>'
            f'<p class="cp-home-note">{html.escape(ct["rule_en"])}<span class="zh">{html.escape(ct["rule_zh"])}</span></p>'
            f'</div></div>'
            '<noscript><p class="muted">The calculator works in your browser and needs JavaScript. · 計算在瀏覽器裡進行，需要開啟 JavaScript。</p></noscript>')

def earthforecast_svg(size=56):
    """第十課的課程卡小圖示：太陽半遮在雲後面，旁邊寫著 70%。"""
    return (f'<svg class="earthforecast-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<circle cx="40" cy="18" r="9" fill="#ffd36e"/>'
            '<circle cx="18" cy="26" r="8" fill="#f4f7fb"/><circle cx="28" cy="21" r="10" fill="#f4f7fb"/><circle cx="38" cy="27" r="7" fill="#f4f7fb"/><rect x="12" y="26" width="32" height="9" rx="4.5" fill="#f4f7fb"/>'
            '<text x="30" y="52" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="14" fill="#2a6fc9">70%</text></svg>')

def render_earthforecast_lab(lesson):
    """第十課：一條雨帶移向小鎮，同樣的計算跑一次或十次（assets/js/earth-forecast.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-fc-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    cells = "".join(f'<button type="button" class="ew-fc-cell"><span>+{i * 12}–{(i + 1) * 12} h</span><b></b></button>' for i in range(6))
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-fc-lab rvl" data-earthforecast-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a band of rain moving across the sea toward a small island town: the same forecast is run once or ten times, and the ten answers spread apart as time goes on · 一條雨帶越過海面移向小島上的小鎮的 3D 模型：同樣的預報計算跑一次或十次，時間越久，十次的答案分得越開"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-view" role="group" aria-label="Runs · 計算次數">
        <button type="button" data-view="one" aria-pressed="true">One run<small>算一次</small></button>
        <button type="button" data-view="ten" aria-pressed="false">Ten runs<small>算十次</small></button>
      </div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">1 · How far away is the rain? · 雨帶還有多遠？</p>
      <div class="cp-dope cp-tr-quick ew-fc-lead" role="group" aria-label="Distance · 距離">
        <button type="button" data-lead="near" aria-pressed="false">Half a day away<small>大約半天後到</small></button>
        <button type="button" data-lead="far" aria-pressed="true">Two days away<small>大約兩天後到</small></button>
      </div>
      <label class="al-slider cp-is-yrow"><span>2 · Hours from now · 幾小時後 <output class="ew-fc-h-out">+0 h</output></span>
        <input type="range" class="al-age ew-fc-h" min="0" max="72" step="1" value="0"></label>
      <p class="al-sky-k ew-fc-k2">The forecast for the town · 小鎮的預報</p>
      <div class="ew-fc-table" role="group" aria-label="Forecast periods · 預報時段">{cells}</div>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>This period · 這個時段</dt><dd class="ew-fc-period"></dd></div>
        <div><dt>Runs with rain · 下雨的次數</dt><dd class="ew-fc-runs"></dd></div>
        <div><dt>Forecast · 預報</dt><dd class="ew-fc-pop"></dd></div>
      </dl>
      {msgs}
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

def _earth_skyword(sw):
    """「晴、多雲還是陰？」（earth-forecast.js 的 initSky；中央氣象署的天空狀況用詞，雲量十分位；不需要 WebGL）。"""
    words = html.escape(json.dumps(sw["words"], ensure_ascii=False))
    grid = "".join("<i></i>" for _ in range(10))
    return (f'<div class="cp-cnt ew-sw rvl" data-earth-skyword data-words="{words}">'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>How much of the sky is covered by cloud? · 天空有多少被雲遮住？</span>'
            f'<input type="range" class="al-age ew-sw-f" min="0" max="10" step="1" value="6" aria-label="Cloud cover in tenths · 雲量（十分位）"></label>'
            f'<div class="ew-sw-grid" aria-hidden="true">{grid}</div>'
            f'<p class="cp-cnt-note">{html.escape(sw["note_en"])}<span class="zh">{html.escape(sw["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-sw-out" aria-live="polite">'
            f'<p class="cp-home-k">Cloud cover · 雲量 <span class="ew-sw-n"></span></p>'
            f'<p class="cp-home-big"><b class="ew-sw-en"></b> <span class="ew-sw-zh"></span></p>'
            f'<p class="cp-home-note"><span class="ew-sw-rule"></span><span class="zh ew-sw-rule-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">This tool works in your browser and needs JavaScript. · 這個小工具在瀏覽器裡運作，需要開啟 JavaScript。</p></noscript>')

def earthriver_svg(size=56):
    """第十一課的課程卡小圖示：一條河從山上彎彎地流到海。"""
    return (f'<svg class="earthriver-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M4 40 L18 14 L30 34 L38 22 L56 40 V56 H4 Z" fill="#6fa35c"/><path d="M4 40 L18 14 L24 24 L14 40 Z" fill="#7d8a70"/>'
            '<path d="M19 18 C22 30 12 34 20 42 C28 50 40 44 56 52" fill="none" stroke="#3f8fe0" stroke-width="5" stroke-linecap="round"/>'
            '<circle cx="24" cy="45" r="2" fill="#e2c275"/><circle cx="34" cy="49" r="1.6" fill="#e2c275"/></svg>')

def render_earthriver_lab(lesson):
    """第十一課：一條從山到海的河，侵蝕、搬運、堆積（assets/js/earth-river.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    msgs = "".join(f'<p class="cp-msg ew-rv-msg" data-msg="{k}" hidden>{html.escape(m["en"])}<span class="zh">{html.escape(m["zh"])}</span></p>' for k, m in lab["msgs"].items())
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab ew-lab ew-rv-lab rvl" data-earthriver-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a river running from steep mountains across a plain to the sea: fast water cuts into the mountains, gravel stops at the foot of the mountains, sand settles on the plain, and mud reaches the sea · 一條河從陡峭的山區流過平原到海的 3D 模型：快的水切進山裡，礫石停在山腳，沙沉在平原上，泥一路到海"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading and the cards below still explain everything.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文與卡片一樣能看懂。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">How much water is in the river? · 河裡有多少水？</p>
      <div class="cp-dope ew-rv-water" role="group" aria-label="Water · 水量">
        <button type="button" data-water="dry" aria-pressed="false">Dry season<small>枯水期</small></button>
        <button type="button" data-water="normal" aria-pressed="true">Normal<small>平常</small></button>
        <button type="button" data-water="flood" aria-pressed="false">Typhoon flood<small>颱風大水</small></button>
      </div>
      <div class="cp-ht-meter"><p class="ew-qk-k">Time passing · 經過的時間</p><div class="cp-ht-bar"><i class="ew-rv-bar"></i></div><p class="cp-ht-status ew-rv-status"></p></div>
      <button type="button" class="ew-lt-strike ew-rv-reset">↺ Start over · 重新開始</button>
      <dl class="cp-nums cp-lt-nums ew-nums">
        <div><dt>Gravel stops · 礫石停在</dt><dd class="ew-rv-gravel"></dd></div>
        <div><dt>Sand stops · 沙停在</dt><dd class="ew-rv-sand"></dd></div>
        <div><dt>Mud stops · 泥停在</dt><dd class="ew-rv-mud"></dd></div>
      </dl>
      {msgs}
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

def _earth_carry(cy):
    """「這樣的水帶得動什麼？」（earth-river.js 的 initCarry；水越快帶得動越大的顆粒，只講順序不講數字；不需要 WebGL）。"""
    levels = html.escape(json.dumps(cy["levels"], ensure_ascii=False))
    items = "".join(f'<div class="ew-cy-item ew-cy-{it["key"]}"><i></i><b>{html.escape(it["en"])}</b><span class="zh">{html.escape(it["zh"])}</span></div>' for it in cy["items"])
    return (f'<div class="cp-cnt ew-cy rvl" data-earth-carry data-levels="{levels}">'
            f'<div class="cp-cnt-in">'
            f'<label class="cp-cnt-l"><span>How fast is the water? · 水流有多快？</span>'
            f'<input type="range" class="al-age ew-cy-f" min="0" max="4" step="1" value="2" aria-label="Speed of the water · 水流的快慢"></label>'
            f'<div class="ew-cy-items" aria-hidden="true">{items}</div>'
            f'<p class="cp-cnt-note">{html.escape(cy["note_en"])}<span class="zh">{html.escape(cy["note_zh"])}</span></p></div>'
            f'<div class="cp-home-out cp-cnt-out ew-cy-out" aria-live="polite">'
            f'<p class="cp-home-k">The water is · 現在的水</p>'
            f'<p class="cp-home-big"><span class="ew-cy-en"></span> · <span class="ew-cy-zh"></span></p>'
            f'<p class="cp-home-note"><span class="ew-cy-t"></span><span class="zh ew-cy-t-zh"></span></p>'
            f'</div></div>'
            '<noscript><p class="muted">This tool works in your browser and needs JavaScript. · 這個小工具在瀏覽器裡運作，需要開啟 JavaScript。</p></noscript>')

_EARTH_LAB = {"quake": render_earthquake_lab, "inside": render_earthinside_lab, "shake": render_earthshake_lab, "mountain": render_earthmountain_lab, "volcano": render_earthvolcano_lab, "rain": render_earthrain_lab, "wind": render_earthwind_lab, "typhoon": render_earthtyphoon_lab, "lightning": render_earthlightning_lab, "forecast": render_earthforecast_lab, "river": render_earthriver_lab}          # lab.kind → 3D 面板
_EARTH_ICON = {"quake": earthquake_svg, "inside": earthglobe_svg, "shake": earthshake_svg, "mountain": earthmountain_svg, "volcano": earthvolcano_svg, "rain": earthrain_svg, "wind": earthwind_svg, "typhoon": earthtyphoon_svg, "lightning": earthlightning_svg, "forecast": earthforecast_svg, "river": earthriver_svg}                 # lesson.card → 課程卡小圖示
_EARTH_WIDGETS = [("warn", _earth_warn), ("dig", _earth_dig), ("scale10", _earth_scale10), ("peak", _earth_peak), ("bubble", _earth_bubble), ("gauge", _earth_gauge), ("beaufort", _earth_beaufort), ("eyepass", _earth_eyepass), ("count", _earth_count), ("skyword", _earth_skyword), ("carry", _earth_carry)]               # lesson 裡有這個 key 就多一段（照這裡的順序）

def _earth_flat():
    return [(ui, u, l) for ui, u in enumerate(EARTH["units"]) for l in u["lessons"]]

def _earth_nav(slug):
    flat = sorted(_earth_flat(), key=lambda x: x[2]["n"])
    i = next(n for n, (_, _, l) in enumerate(flat) if l["slug"] == slug)
    def side(item, dirn, label):
        if not item:
            return '<span class="pm-nav-x"></span>'
        l = item[2]
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{EARTH_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = flat[i - 1] if i > 0 else None
    nxt = flat[i + 1] if i < len(flat) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{EARTH_BASE}">&#9776; 回地球與天氣 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def build_earth_lesson(ui, unit, lesson):
    path = f'{EARTH_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="earth", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab["kind"]
    lab_html = _EARTH_LAB[kind](lesson)

    secs = []
    for key, fn in _EARTH_WIDGETS:
        if lesson.get(key):
            w = lesson[key]
            secs.append((key, w["eyebrow"], w["en"], w["zh"], fn(w), _bi(w["lead_en"], w["lead_zh"], cls="lead rvl d2")))
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
        def link(x):
            inner = (f'<span class="cp-link-ic" aria-hidden="true">{x["icon"]}</span>'
                     f'<span class="cp-link-b"><span class="cp-link-k">{html.escape(x["k_en"])} · {html.escape(x["k_zh"])}</span>'
                     f'<b>{html.escape(x["en"])}</b><span class="zh cp-link-zh">{html.escape(x["zh"])}</span>'
                     f'<span class="cp-link-n">{html.escape(x["note_en"])}<span class="zh">{html.escape(x["note_zh"])}</span></span>')
            if x.get("soon"):     # 還沒做的課：預告卡，不是連結
                return f'<div class="cp-link ew-link-soon rvl">{inner}<span class="cp-link-go">Coming soon · 製作中</span></span></div>'
            return f'<a class="cp-link rvl" href="{html.escape(x["href"])}">{inner}<span class="cp-link-go">Go to the lesson · 前往這一課 <i>&rarr;</i></span></span></a>'
        lh = lesson["links_head"]
        secs.append(("more", lh["eyebrow"], lh["en"], lh["zh"], f'<div class="cp-links">{"".join(link(x) for x in lesson["links"])}</div>', ""))
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
    th = lesson["tricks_head"]
    secs.append(("tricks", "Remember It · 記憶口訣", th["en"], th["zh"], _sci_tricks(lesson), ""))
    if lesson.get("safety"):
        sh = lesson.get("safety_head") or {"eyebrow": "Safety First · 安全提醒", "en": "Before you try anything", "zh": "動手之前先讀"}
        items = "".join(f'<li class="rvl">{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></li>' for s in lesson["safety"])
        src = ""
        if sh.get("src"):      # 防災要點要寫明照哪個官方單位
            src = (f'<p class="ew-safety-src rvl">{html.escape(sh["src_en"])} <a href="{html.escape(sh["url"])}" target="_blank" rel="noopener">{html.escape(sh["src"])} &#8599;</a>'
                   f'<span class="zh">{html.escape(sh["src_zh"])}</span></p>')
        secs.append(("safety", sh["eyebrow"], sh["en"], sh["zh"], f'<ul class="cp-safety">{items}</ul>{src}', ""))
    for n, act in enumerate(lesson["activities"], 1):
        eb = "Classroom Activity · 課堂活動" if len(lesson["activities"]) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))
    rows = "".join(
        f'<li><span>{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></span>'
        f'<a href="{html.escape(s["url"])}" target="_blank" rel="noopener">{html.escape(s["src"])} &#8599;</a></li>'
        for s in lesson["sources"])
    ck = lesson["checked"]
    src_html = (f'<div class="cp-sources rvl"><p class="sub-head">Sources · 資料出處</p>'
                f'<p class="muted">Facts and numbers on this page were checked against these sources ({html.escape(ck["en"])}). · 本頁的事實與數字依下列資料查證（{html.escape(ck["zh"])}）。</p>'
                f'<ol>{rows}</ol></div>')

    eyebrow = (f'Earth and Weather · Unit {ui + 1} · Lesson {lesson["n"]} · '
               f'地球與天氣 單元{_htw_cn(ui + 1)} 第{_htw_cn(lesson["n"])}課')
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(EARTH_BASE, "回地球與天氣 · All Lessons"))}
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
{_earth_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'earth-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_earth_head(_EARTH_JS[kind])))
    return path

def build_earth_hub():
    # 照晶片與半導體：單元導覽＋每個單元一段橫向課程卡；做好的課可點，planned 是「製作中」卡。
    unit_sections, nav = [], []
    done = sum(len(u["lessons"]) for u in EARTH["units"])
    total = done + sum(len(u.get("planned", [])) for u in EARTH["units"])
    for idx, u in enumerate(EARTH["units"]):
        rows = []
        for l in u["lessons"]:
            ic = _EARTH_ICON[l["card"]](60) if l.get("card") in _EARTH_ICON else l["icon"]
            rows.append((l["n"],
                f'<a class="lc-row rvl" href="{EARTH_BASE}{l["slug"]}/">'
                f'<span class="lc-ico" aria-hidden="true">{ic}</span>'
                f'<span class="lc-body">'
                f'<span class="lc-meta"><b>Lesson {l["n"]} · 第{_htw_cn(l["n"])}課</b><i>{html.escape(l["level"])}</i></span>'
                f'<h3 class="lc-title">{html.escape(l["title"])}</h3>'
                f'<span class="lc-zh">{html.escape(l["title_zh"])}</span>'
                f'<span class="lc-bl">{html.escape(l["blurb_en"])}</span>'
                f'<span class="lc-bl zh">{html.escape(l["blurb_zh"])}</span>'
                f'<span class="lc-go">Start the lesson · 開始上課 <i>&rarr;</i></span>'
                f'</span></a>'))
        for pl in u.get("planned", []):
            rows.append((pl["n"],
                f'<div class="lc-row lc-soon rvl">'
                f'<span class="lc-ico" aria-hidden="true">{pl["icon"]}</span>'
                f'<span class="lc-body"><span class="lc-meta"><b>Lesson {pl["n"]} · 第{_htw_cn(pl["n"])}課 · Coming soon 製作中</b></span>'
                f'<h3 class="lc-title">{html.escape(pl["en"])}</h3><span class="lc-zh">{html.escape(pl["zh"])}</span></span></div>'))
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
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in EARTH["intro"])
    intro_html += _bi(f"{done} of {total} lessons {'is' if done == 1 else 'are'} ready so far; more are on the way.",
                      f"目前完成 {done} 課（共規劃 {total} 課），持續增加中。", cls="cp-progress")
    lead = f'{html.escape(EARTH["lead_en"])}<br><span class="muted">{html.escape(EARTH["lead_zh"])}</span>'
    body = f'''
{page_hero(EARTH["eyebrow"], f'{EARTH["title_en"]} <span class="h1-zh">{EARTH["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl cp-intro"><span class="cp-intro-ic" aria-hidden="true">{earthglobe_svg(76)}</span>{intro_html}</div>
</div></section>
{unit_nav}
{"".join(unit_sections)}
'''
    write(EARTH_BASE, layout(EARTH_BASE, f'{EARTH["title_en"]} · {EARTH["title_zh"]}',
          f'{EARTH["lead_en"]} {EARTH["lead_zh"]}', body, "resources", extra_head=_earth_head() + _lc_head()))
    return EARTH_BASE


# ---- 書法 Chinese Calligraphy（資料驅動，data/calligraphy.json）----
# 架構照晶片與半導體：系列首頁分單元（單元導覽＋.lc-row 橫向課程卡），課程頁照天文教育
# （英文 reading＋每課一個 3D 毛筆示範＋延伸段落）。units[].lessons 是做好的課、units[].planned 是製作中。
# 本系列的特色是共用的「寫字引擎」：tools/callig/src/brush.js（純函式）、brush3d.js（three.js 的筆與紙）、
# pad.js（2D 練字板），每課只換筆畫資料（tools/callig/src/strokes/*.json）。打包成 assets/js/cal-*.js；
# 面板、迷思、口訣、活動沿用 astro.css，本系列多出來的在 calligraphy.css（class 前綴 cg-）；兩者都只載在本系列頁面。
_calj = os.path.join(ROOT, "data", "calligraphy.json")
CAL = json.load(open(_calj, encoding="utf-8")) if os.path.exists(_calj) else None
CAL_BASE = "/resources/classes/calligraphy/"
_CAL_JS = {"four": "cal-four", "press": "cal-press", "yong": "cal-yong", "order": "cal-order", "oracle": "cal-oracle", "clerical": "cal-clerical", "speed": "cal-speed", "lanting": "cal-lanting", "styles": "cal-styles", "gallery": "cal-gallery", "couplets": "cal-couplets", "seal": "cal-seal", "sutra": "cal-sutra", "pens": "cal-pens", "pencil": "cal-pencil"}   # lab.kind → assets/js/<bundle>.js

def _cal_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/calligraphy.css", *(f"assets/js/{j}.js" for j in _CAL_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _cal_head(js=None):
    v = _cal_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return (f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/calligraphy.css?v={v}">\n{tag}')

def calbrush_svg(size=56):
    """書法的系列小圖示：一張宣紙上一筆墨（「一」），一枝毛筆斜斜地剛寫完。"""
    return (f'<svg class="calbrush-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="5" y="13" width="44" height="40" rx="3" fill="#f6f0e1"/>'
            '<path d="M10.5 36.2c1-3.6 3.6-3.4 6.4-3.1l18.5-1.5c3.8-.4 7 .2 7.3 3 .3 3.1-2.9 4.2-5.9 3.4l-1.5-.5-18.6 1.7c-3 .3-6.8.6-6.2-3z" fill="#151311"/>'
            '<path d="M55.5 3.5 43.2 24.8" stroke="#c9a466" stroke-width="4.2" stroke-linecap="round"/>'
            '<path d="M44.2 23.1 42.2 26.6" stroke="#3a2216" stroke-width="5.2" stroke-linecap="round"/>'
            '<path d="M42.6 25.4c1.9 1.3 1.6 4.4-.4 6.9l-2.6 3.1c-.3-3.1-.8-5.6.6-8.4.6-1.1 1.4-1.7 2.4-1.6z" fill="#efe6d0"/>'
            '<path d="M41.7 30c.4 1.6-.5 3.4-2.3 5.4-.3-1.8-.5-3.4.2-5 .6-.9 1.5-1.1 2.1-.4z" fill="#151311"/></svg>')

def _cg_brush(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="-2.2" y="0" width="4.4" height="26" rx="2" fill="#c9a466"/><rect x="-2.6" y="24" width="5.2" height="4" rx="1" fill="#3a2216"/>'
            '<path d="M-2.6 28c0 4 1 8 2.6 12 1.6-4 2.6-8 2.6-12z" fill="#efe6d0"/><path d="M-1.4 34c.5 2.2 .8 4 1.4 6 .6-2 .9-3.8 1.4-6z" fill="#151311"/></g>')

def _cg_ink(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="-5" y="0" width="10" height="30" rx="1.5" fill="#141318"/><rect x="-3.4" y="2" width="6.8" height="26" rx="1" fill="none" stroke="#c9a14a" stroke-width=".9"/>'
            '<path d="M-1.6 10a2 2 0 1 1 2 2 2.4 2.4 0 1 0 2 3" fill="none" stroke="#c9a14a" stroke-width=".9"/></g>')

def _cg_paper(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="0" y="0" width="26" height="26" rx="1.5" fill="#f6f0e1"/>'
            '<g stroke="#d6564a" stroke-width=".8" fill="none"><rect x="3" y="3" width="20" height="20"/>'
            '<path d="M13 3v20M3 13h20M3 3l20 20M23 3 3 23" stroke-dasharray="1.6 1.4"/></g>'
            '<path d="M6.5 13.4c.6-1.4 1.6-1.2 2.6-1.1l7.4-.5c1.6-.1 2.8.1 2.9 1.2.1 1.2-1.1 1.6-2.3 1.3l-8.2.6c-1.2.1-2.7.2-2.4-1.5z" fill="#151311"/></g>')

def _cg_stone(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="0" y="0" width="22" height="30" rx="4" fill="#3b2f3a"/><rect x="2.6" y="2.6" width="16.8" height="24.8" rx="2.6" fill="#4d3f4b"/>'
            '<rect x="2.6" y="2.6" width="16.8" height="7.5" rx="2.6" fill="#1a1820"/><ellipse cx="11" cy="19" rx="5" ry="3.6" fill="#22202a" opacity=".85"/></g>')

def calfour_svg(size=56):
    """第一課的課程卡小圖示：文房四寶（筆、墨、紙、硯）排在一起。"""
    return (f'<svg class="calfour-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{_cg_paper(4, 17, 1.05)}{_cg_stone(34, 24, 0.82)}{_cg_ink(47, 4, 0.62)}{_cg_brush(10, 2, 0.5)}</svg>')

_CG_LINES = {   # 第二課卡片的小圖示：宣紙上一筆墨（提按的樣子），只用 SVG 路徑
    "swell": '<path d="M9 31c6-2.2 12-6 21-6.4 9 .4 15 4.2 21 6.4-6 2.2-12 6-21 6.4-9-.4-15-4.2-21-6.4z" fill="#151311"/>',
    "wave": '<path d="M9 31c3-3.5 6-5.5 9-5.5s5 4 7 4 4-6 8-6 5 6 8 6 5-4 7-4 2 3.5 3 5.5c-1 2-1 5.5-3 5.5s-4-4-7-4-4 6-8 6-6-6-8-6-4 4-7 4-6-2-9-5.5z" fill="#151311"/>',
    "side": '<path d="M10 22c2-3 6-3 10-3h20c4 0 8 0 10 3-2 3-6 3-10 3H20c-4 0-8 0-10-3z" fill="#151311"/>'
            '<path d="M10 39l3-3h34l3 3-3 1H13z" fill="#151311"/><path d="M13 41.4h34M14 42.6h31M16 43.6h26" stroke="#151311" stroke-width=".8" stroke-dasharray="3 1.6"/>',
    "needle": '<path d="M27.6 9c3.6-1.6 6.4.6 6 3.4l-.6 3.2-.3 22c-.2 5-1 9.5-2.7 13.6-1.6-4-2.4-8.6-2.6-13.6l-.5-22C26.2 13.2 25.6 10 27.6 9z" fill="#151311"/>',
}

def _cg_icon(kind, size=66):
    if kind in _CG_LINES:
        return (f'<svg viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
                f'<rect x="4" y="4" width="52" height="52" rx="3" fill="#f6f0e1"/>{_CG_LINES[kind]}</svg>')
    inner = {"brush": _cg_brush(30, 4, 1.24), "ink": _cg_ink(30, 6, 1.6), "paper": _cg_paper(6.5, 6.5, 1.8), "stone": _cg_stone(13, 6.75, 1.55)}[kind]
    return f'<svg viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">{inner}</svg>'

def calpress_svg(size=56):
    """第二課的課程卡小圖示：宣紙上一筆由細變粗再變細的墨，旁邊一枝毛筆。"""
    return (f'<svg class="calpress-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="5" y="13" width="44" height="40" rx="3" fill="#f6f0e1"/>'
            '<path d="M9 35c5-1.8 10-5 17-5.4 7 .4 12 3.6 17 5.4-5 1.8-10 5-17 5.4-7-.4-12-3.6-17-5.4z" fill="#151311"/>'
            '<path d="M55.5 3.5 45.2 22.8" stroke="#c9a466" stroke-width="4.2" stroke-linecap="round"/>'
            '<path d="M46.2 21.1 44.2 24.6" stroke="#3a2216" stroke-width="5.2" stroke-linecap="round"/>'
            '<path d="M44.6 23.4c1.9 1.3 1.6 4.4-.4 6.9l-2.6 3.1c-.3-3.1-.8-5.6.6-8.4.6-1.1 1.4-1.7 2.4-1.6z" fill="#efe6d0"/>'
            '<path d="M43.7 28c.4 1.6-.5 3.4-2.3 5.4-.3-1.8-.5-3.4.2-5 .6-.9 1.5-1.1 2.1-.4z" fill="#151311"/></svg>')

def render_calfour_lab(lesson):
    """第一課：書桌上的文房四寶＋寫字引擎示範（assets/js/cal-four.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    F = {f["key"]: f for f in lab["focus"]}
    fb = "".join(
        f'<button type="button" data-focus="{f["key"]}" aria-pressed="{"true" if f["key"] == "desk" else "false"}">'
        f'<i aria-hidden="true">{html.escape(f["icon"])}</i>{html.escape(f["en"])}<small>{html.escape(f["zh"])}</small></button>'
        for f in lab["focus"])
    def head(k):
        f = F[k]
        return (f'<h3 class="cg-panel-h">{html.escape(f["title_en"])}<span class="zh">{html.escape(f["title_zh"])}</span></h3>'
                f'<p class="cg-panel-t">{html.escape(f["text_en"])}<span class="zh">{html.escape(f["text_zh"])}</span></p>')
    hairs = [("goat", "Goat", "羊毫"), ("mixed", "Mixed", "兼毫"), ("weasel", "Weasel", "狼毫")]
    hb = "".join(f'<button type="button" data-hair="{k}" aria-pressed="{"true" if k == "goat" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in hairs)
    vb = "".join(
        f'<button type="button" class="cg-virtue" data-virtue="{v["key"]}" aria-pressed="false" data-en="{html.escape(v["text_en"])}" data-zh="{html.escape(v["text_zh"])}">'
        f'<b>{html.escape(v["zh"])}</b><span>{html.escape(v["en"])}</span></button>'
        for v in lab["virtues"])
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    sb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("side", "Side", "側面"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    cb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "side" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("grid", "Grid", "格線", True)])
    phases = html.escape(json.dumps(lab["phases"], ensure_ascii=False))
    return f'''<div class="astro-lab cg-lab rvl" data-calfour-lab data-phases="{phases}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a calligraphy desk with a brush, an ink stick, paper, and an inkstone, and a brush that writes the character one · 書桌上的筆、墨、紙、硯，以及會寫「一」的毛筆 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{cb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放　Tap a treasure · 點一下近看</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Look closer · 近看</p>
      <div class="cg-focus" role="group" aria-label="Look closer · 近看">{fb}</div>
      <div class="cg-panel" data-panel="desk">{head("desk")}</div>
      <div class="cg-panel" data-panel="brush" hidden>{head("brush")}
        <div class="cg-seg cg-hairs" role="group" aria-label="Brush hair · 筆毛">{hb}</div>
        <dl class="cg-nums"><div><dt>Hair · 筆毛</dt><dd class="cg-hair-out"></dd></div><div><dt>Same push, it bends · 同樣力道彎了</dt><dd class="cg-bend-out">—</dd></div></dl>
        <p class="al-sky-k cg-k2">Four virtues of a good brush · 好筆四德</p>
        <div class="cg-virtues">{vb}</div>
        <p class="cg-virtue-t" aria-live="polite">Tap a virtue to see it on the brush. · 點一個字，看毛筆示範。</p>
        <button type="button" class="cg-btn-d" data-virtue="press">Press again · 再壓一下</button>
      </div>
      <div class="cg-panel" data-panel="ink" hidden>{head("ink")}
        <div class="cg-grind-out"><b class="cg-circles">0</b><span>circles · 圈</span></div>
        <div class="cg-dark-row"><span>Clear · 清水</span><span class="cg-dark-bar"><i></i></span><span>Black · 黑</span><b class="cg-dark">0%</b></div>
        <div class="cg-btns"><button type="button" class="cg-btn-d cg-grind" aria-pressed="false"><span class="t">Grind · 磨墨</span></button>
          <button type="button" class="cg-btn-d cg-fresh-water">Fresh water · 換清水</button></div>
        <p class="cg-note-d">Illustration: real grinding takes many more circles. · 示意：真的磨墨要磨更多圈。</p>
      </div>
      <div class="cg-panel" data-panel="paper" hidden>{head("paper")}
        <dl class="cg-nums"><div><dt>Raw Xuan paper · 生宣紙</dt><dd class="cg-spread-xuan"></dd></div><div><dt>Copy paper · 影印紙</dt><dd class="cg-spread-copy"></dd></div></dl>
        <p class="cg-note-d">How many times wider the spot grows than the drop (illustration). · 墨跡比剛落下時寬幾倍（示意）。</p>
        <button type="button" class="cg-btn-d cg-redrop">Drop again · 再滴一次</button>
      </div>
      <div class="cg-panel" data-panel="stone" hidden>{head("stone")}
        <button type="button" class="cg-btn-d cg-add-water">Add water · 加水</button>
        <p class="cg-note-d">Adding water makes the ink lighter, so grind a little more. · 加了水墨就變淡，要再多磨一會兒。</p>
      </div>
      <div class="cg-panel" data-panel="write" hidden>{head("write")}
        <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{sb}</div>
        <p class="al-sky-k cg-k2">Force curve · 力道曲線 <b class="cg-press-out">—</b></p>
        <canvas class="cg-force" aria-label="Force curve of the stroke · 這一筆的力道曲線"></canvas>
        <p class="cg-phase-k" aria-live="polite"></p>
        <p class="cg-phase-t"></p>
        <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def render_calpress_lab(lesson):
    """第二課：提按、中鋒與側鋒、寫「十」（assets/js/cal-press.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    M = {m["key"]: m for m in lab["modes"]}
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "press" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    def head(k):
        m = M[k]
        return (f'<h3 class="cg-panel-h">{html.escape(m["title_en"])}<span class="zh">{html.escape(m["title_zh"])}</span></h3>'
                f'<p class="cg-panel-t">{html.escape(m["text_en"])}<span class="zh">{html.escape(m["text_zh"])}</span></p>')
    pb = "".join(f'<button type="button" data-pattern="{x["key"]}" aria-pressed="{"true" if x["key"] == "swell" else "false"}">{html.escape(x["en"])}<small>{html.escape(x["zh"])}</small></button>'
                 for x in lab["patterns"])
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    sb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("side", "Side", "側面"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    cb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "side" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("grid", "Grid", "格線", True)])
    phases = html.escape(json.dumps(lab["phases"], ensure_ascii=False))
    return f'''<div class="astro-lab cg-lab cg-press-lab rvl" data-calpress-lab data-phases="{phases}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a brush writing on paper: pressing and lifting, the center tip and the side tip, and the character ten · 毛筆在紙上寫字的 3D 模型：提按、中鋒與側鋒、寫「十」"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{cb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Try it · 試試看</p>
      <div class="cg-focus cg-modes" role="group" aria-label="Try it · 試試看">{mb}</div>
      <div class="cg-panel" data-panel="press">{head("press")}
        <div class="cg-seg cg-patterns" role="group" aria-label="Pattern · 力道的節奏">{pb}</div>
        <label class="al-slider cg-hand-row"><span>Lift 提 ← · → Press 按</span>
          <input type="range" class="al-age cg-hand" min="0" max="100" step="1" value="50" style="--p:50%" aria-label="How hard the brush presses · 壓多重"></label>
        <dl class="cg-nums"><div><dt>Pressure · 力道</dt><dd class="cg-p-out">—</dd></div><div><dt>Line width · 線寬</dt><dd class="cg-w-out">—</dd></div></dl>
        <div class="cg-dark-row cg-spread-row"><span>Hairs gather · 收攏</span><span class="cg-dark-bar cg-spread"><i></i></span><span>Spread · 散開</span></div>
        <button type="button" class="cg-btn-d cg-again">Start over · 重新寫</button>
      </div>
      <div class="cg-panel" data-panel="tip" hidden>{head("tip")}
        <div class="cg-seg cg-seg2" role="group" aria-label="Which tip · 哪一種筆鋒"><button type="button" data-tip="center" aria-pressed="true">Center tip<small>中鋒</small></button><button type="button" data-tip="side" aria-pressed="false">Side tip<small>側鋒</small></button></div>
        <dl class="cg-nums"><div><dt>Handle · 筆桿</dt><dd class="cg-tip-handle"></dd></div><div><dt>Tip · 筆尖</dt><dd class="cg-tip-where"></dd></div></dl>
        <p class="cg-note-d">Use the Top view to compare the two edges. · 用「正上方」比較兩條線的邊緣。</p>
      </div>
      <div class="cg-panel" data-panel="shi" hidden>{head("shi")}
        <div class="cg-seg cg-seg2" role="group" aria-label="Stroke · 第幾筆"><button type="button" data-stroke="0" aria-pressed="true">1 Horizontal<small>橫</small></button><button type="button" data-stroke="1" aria-pressed="false">2 Vertical<small>豎</small></button></div>
        <div class="cg-seg cg-seg4" role="group" aria-label="Replay a part · 重播一段"><button type="button" data-phase="0">Start<small>起筆</small></button><button type="button" data-phase="1">Middle<small>行筆</small></button><button type="button" data-phase="2">Finish<small>收筆</small></button><button type="button" data-phase="all">Whole<small>整個字</small></button></div>
        <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{sb}</div>
        <p class="al-sky-k cg-k2">Force curve · 力道曲線 <b class="cg-press-out">—</b></p>
        <canvas class="cg-force" aria-label="Force curve of the stroke · 這一筆的力道曲線"></canvas>
        <p class="cg-phase-k" aria-live="polite"></p>
        <p class="cg-phase-t"></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def calyong_svg(size=56):
    """第三課的課程卡小圖示：宣紙上一個「永」，用筆畫資料（tools/callig/src/strokes/yong.json）的中心線畫成圓頭粗線，不用字型。"""
    fp = os.path.join(ROOT, "tools/callig/src/strokes/yong.json")
    lines = ""
    if os.path.exists(fp):
        yong = json.load(open(fp, encoding="utf-8"))
        for st in yong["strokes"]:
            pts = " ".join(f'{8 + x * 0.044:.1f},{8 + y * 0.044:.1f}' for x, y, p, v in st["pts"] if p > 0.08)
            lines += f'<polyline points="{pts}" fill="none" stroke="#151311" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>'
    return (f'<svg class="calyong-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<rect x="5" y="5" width="50" height="50" rx="3" fill="#f6f0e1"/>{lines}</svg>')

def render_calyong_lab(lesson):
    """第三課：永字八法（assets/js/cal-yong.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-method="{m["key"]}" aria-pressed="false" title="{html.escape(m["en"])} · {html.escape(m["zh"])}">'
        f'<b>{html.escape(m["ch"])}</b><span>{html.escape(m["en"])}</span><small>{html.escape(m["zh"])}</small></button>'
        for m in lab["methods"])
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    sb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("side", "Side", "側面"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    cb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "side" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True), ("eight", "Eight names", "八法標示", True), ("grid", "Grid", "格線", True)])
    methods = html.escape(json.dumps(lab["methods"], ensure_ascii=False))
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-yong-lab rvl" data-calyong-lab data-methods="{methods}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a brush writing the character yong, forever, stroke by stroke, with the eight principles labeled · 毛筆一筆一筆寫出「永」、標出八法的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{cb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the eight cards, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、八法卡片和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Replay one principle · 重播一法</p>
      <div class="cg-methods" role="group" aria-label="Eight principles · 八法">{mb}</div>
      <button type="button" class="cg-btn-d cg-whole" data-method="all" aria-pressed="true">Whole character · 整個字</button>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{sb}</div>
      <dl class="cg-nums"><div><dt>Stroke · 第幾畫</dt><dd class="cg-stroke-out">—</dd></div><div><dt>Principle · 哪一法</dt><dd class="cg-method-out">—</dd></div></dl>
      <p class="al-sky-k cg-k2">Force curve · 力道曲線 <b class="cg-press-out">—</b></p>
      <canvas class="cg-force" aria-label="Force curve of the current stroke, with a band for each principle · 這一畫的力道曲線，每一法一個色帶"></canvas>
      <p class="cg-phase-k" aria-live="polite"></p>
      <p class="cg-phase-t"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

_CG_RULE_CHAR = {"lr": "chuan", "tb": "san", "hv": "shi", "pn": "ren", "mid": "xiao", "box": "ri"}   # 同 cal-order.js 的 RULE_CHAR

def _cg_char_svg(key, size=66, nums=True, grid=False):
    """用筆畫資料（tools/callig/src/strokes/<key>.json）的中心線畫一個字，不用字型；nums＝在每一筆起點前標藍色筆順數字（同 cal-order.js 的 numPos）。"""
    fp = os.path.join(ROOT, f"tools/callig/src/strokes/{key}.json")
    if not os.path.exists(fp):
        return ""
    ch = json.load(open(fp, encoding="utf-8"))
    k, o = (0.046, 7) if grid else (0.052, 4)
    lines, marks = "", ""
    if grid:
        lines += ('<g stroke="#d6564a" stroke-width=".6" fill="none" opacity=".75"><rect x="7" y="7" width="46" height="46"/>'
                  '<path d="M22.33 7v46M37.67 7v46M7 22.33h46M7 37.67h46" stroke-dasharray="1.4 1.2"/></g>')
    for i, st in enumerate(ch["strokes"]):
        pts = " ".join(f'{o + x * k:.1f},{o + y * k:.1f}' for x, y, p, v in st["pts"] if p > 0.08)
        lines += f'<polyline points="{pts}" fill="none" stroke="#151311" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>'
        if nums:
            P = st["pts"]; a = P[0]; b = P[min(len(P) - 1, 3)]
            L = ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5 or 1
            x, y = st.get("num") or (a[0] - (b[0] - a[0]) / L * 78, a[1] - (b[1] - a[1]) / L * 78)
            r = 5 if grid else 5.6
            x, y = min(max(o + x * k, 3 + r), 57 - r), min(max(o + y * k, 3 + r), 57 - r)
            marks += (f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="#1f6f8b"/>'
                      f'<text x="{x:.1f}" y="{y + r * .46:.1f}" text-anchor="middle" font-size="{r * 1.32:.1f}" font-weight="800" fill="#fff" font-family="system-ui, sans-serif">{i + 1}</text>')
    return (f'<svg viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>{lines}{marks}</svg>')

def calorder_svg(size=56):
    """第四課的課程卡小圖示：九宮格上的「日」，四筆都標藍色筆順數字。"""
    return _cg_char_svg("ri", size, grid=True).replace("<svg ", '<svg class="calorder-svg" ', 1)

def render_calorder_lab(lesson):
    """第四課：筆順六條法則（assets/js/cal-order.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    rb = "".join(
        f'<button type="button" data-rule="{r["key"]}" aria-pressed="{"true" if r["key"] == "hv" else "false"}" title="{html.escape(r["en"])} · {html.escape(r["zh"])}">'
        f'<b>{html.escape(r["glyph"])}</b><span>{html.escape(r["en"])}</span><small>{html.escape(r["zh"])}</small></button>'
        for r in lab["rules"])
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    sb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    grids = [("jiu", "Nine squares", "九宮格"), ("mi", "米 grid", "米字格"), ("none", "No grid", "不要格線")]
    gb = "".join(f'<button type="button" data-grid="{k}" aria-pressed="{"true" if k == "jiu" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in grids)
    cams = [("side", "Side", "側面"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    cb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "side" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Numbers", "筆順數字", True)])
    rules = html.escape(json.dumps(lab["rules"], ensure_ascii=False))
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-order-lab rvl" data-calorder-lab data-rules="{rules}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a brush writing six example characters in stroke order, with numbered strokes and a grid · 毛筆照筆順寫六個例字、標出筆順數字與格線的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{cb}</div>
      <p class="cg-back-badge">Backward: not the standard order<span class="zh">倒過來寫：不是標準筆順</span></p>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the rule cards, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、法則卡片、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Choose a rule · 選一條法則</p>
      <div class="cg-methods cg-rules" role="group" aria-label="Six rules · 六條法則">{rb}</div>
      <div class="cg-seg cg-seg2 cg-backseg" role="group" aria-label="Order · 順序"><button type="button" data-back="0" aria-pressed="true">Standard<small>標準筆順</small></button><button type="button" data-back="1" aria-pressed="false">Backward<small>倒過來寫</small></button></div>
      <div class="cg-rule" aria-live="polite">
        <p class="cg-rule-k"></p>
        <p class="cg-rule-t"></p>
        <p class="cg-rule-why"></p>
      </div>
      <dl class="cg-nums"><div><dt>Character · 例字</dt><dd class="cg-char-out">—</dd></div><div><dt>Stroke · 第幾筆</dt><dd class="cg-stroke-out">—</dd></div></dl>
      <p class="al-sky-k cg-k2">Grid · 格線</p>
      <div class="cg-seg cg-grids" role="group" aria-label="Grid · 格線">{gb}</div>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{sb}</div>
      <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_guess(gs):
    """第四課：「猜下一筆」小遊戲（guess.js 綁這裡的 class）。"""
    hints = html.escape(json.dumps(gs["hints"], ensure_ascii=False))
    return f'''<div class="cg-guess rvl" data-cal-guess data-hints="{hints}">
  <div class="cg-guess-paper"><canvas class="cg-guess-cv" aria-label="Game: tap the gray strokes of the character in the standard order · 小遊戲：照標準筆順點字的灰色筆畫"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-guess-char"></p>
    <p class="cg-guess-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try / tries<span class="zh">一次就點對／點的次數</span></span><b class="cg-guess-score">0 / 0</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-guess="next">Next character · 下一個字 &rarr;</button>
      <button type="button" class="cg-btn" data-guess="again">&#8630; Start over · 這個字重來</button>
    </div>
    <p class="cg-guess-note">Six characters, one for each rule in the model above.<span class="zh">六個字，對應上面模型的六條法則。</span></p>
  </div>
</div>'''

def _cg_oracle_svg(key, size=66, cls=""):
    """甲骨文的小圖：骨頭色的底、刻的線（tools/callig/src/strokes/ancient.json 的中心線，直線），不用字型。"""
    fp = os.path.join(ROOT, "tools/callig/src/strokes/ancient.json")
    lines = ""
    if os.path.exists(fp):
        A = json.load(open(fp, encoding="utf-8"))
        for st in A["chars"][key]["oracle"]:
            pts = " ".join(f'{6 + x * 0.048:.1f},{6 + y * 0.048:.1f}' for x, y, *_ in st["pts"])
            lines += f'<polyline points="{pts}" fill="none" stroke="#4b2f18" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/>'
    c = f' class="{cls}"' if cls else ""
    return (f'<svg{c} viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<rect x="3" y="3" width="54" height="54" rx="10" fill="#e6d8b8"/>{lines}</svg>')

def caloracle_svg(size=56):
    """第五課的課程卡小圖示：甲骨上刻的「馬」（直立的馬）。"""
    return _cg_oracle_svg("ma", size, "caloracle-svg")

_CG_GLYPH = {"ri": "日", "yue": "月", "shan": "山", "shui": "水", "ren": "人", "ma": "馬"}

def render_caloracle_lab(lesson):
    """第五課：甲骨、金文、小篆三個地方（assets/js/cal-oracle.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "shell" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    cb = "".join(f'<button type="button" data-char="{k}" aria-pressed="{"true" if k == "ri" else "false"}" title="{html.escape(lab["chars"][k])}">{g}</button>' for k, g in _CG_GLYPH.items())
    M = {m["key"]: m for m in lab["modes"]}
    def head(k):
        m = M[k]
        return (f'<h3 class="cg-panel-h">{html.escape(m["title_en"])}<span class="zh">{html.escape(m["title_zh"])}</span></h3>'
                f'<p class="cg-panel-t">{html.escape(m["text_en"])}<span class="zh">{html.escape(m["text_zh"])}</span></p>')
    steps = M["shell"]["steps"]
    sb = "".join(f'<button type="button" data-step="{i}" aria-pressed="false">{i + 1} {html.escape(s["en"])}<small>{html.escape(s["zh"])}</small></button>' for i, s in enumerate(steps))
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("wide", "Whole desk", "整張桌子")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    modes = html.escape(json.dumps(lab["modes"], ensure_ascii=False))
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-oracle-lab rvl" data-caloracle-lab data-modes="{modes}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a desk with a tortoise shell for oracle bone divination, a bronze ding with an inscription and a rubbing, and a brush writing small seal script · 書桌上的龜甲（占卜與刻字）、有銘文的青銅鼎與拓片、毛筆寫小篆的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the slider, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、滑桿、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Where writing was made · 字寫在哪裡</p>
      <div class="cg-focus cg-modes" role="group" aria-label="Three kinds of writing · 三種字">{mb}</div>
      <p class="al-sky-k cg-k2">Character · 哪一個字</p>
      <div class="cg-chars6" role="group" aria-label="Character · 哪一個字">{cb}</div>
      <div class="cg-panel" data-panel="shell">{head("shell")}
        <div class="cg-seg cg-steps" role="group" aria-label="Steps · 步驟">{sb}</div>
        <button type="button" class="cg-btn-d cg-whole" data-step="all" aria-pressed="true">Watch the whole story · 從頭看</button>
        <p class="cg-step-t" aria-live="polite"></p>
      </div>
      <div class="cg-panel" data-panel="bronze" hidden>{head("bronze")}
        <button type="button" class="cg-btn-d cg-again">Make the rubbing again · 再拓一次</button>
      </div>
      <div class="cg-panel" data-panel="seal" hidden>{head("seal")}
        <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
      </div>
      <dl class="cg-nums cg-nums3"><div><dt>Script · 字體</dt><dd class="cg-mode-k">—</dd></div><div><dt>When · 年代</dt><dd class="cg-when-out">—</dd></div><div><dt>Made with · 怎麼做</dt><dd class="cg-tool-out">—</dd></div><div class="cg-step-row"><dt>Step · 步驟</dt><dd class="cg-step-out">—</dd></div></dl>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_time(tm):
    """第五課：三千年滑桿（time2d.js 的 initTimeline）。"""
    stages = html.escape(json.dumps(tm["stages"], ensure_ascii=False))
    cb = "".join(f'<button type="button" data-tchar="{k}" aria-pressed="{"true" if k == "ri" else "false"}">{g}</button>' for k, g in _CG_GLYPH.items())
    ticks = "".join(f'<li><button type="button" data-stage="{i}" aria-pressed="{"true" if i == 1 else "false"}"><b>{html.escape(s["zh"])}</b><span>{html.escape(s["en"])}</span><small>{html.escape(s["when_zh"])}</small></button></li>' for i, s in enumerate(tm["stages"]))
    minis = "".join(f'<canvas class="cg-time-mini" title="{html.escape(s["en"])} · {html.escape(s["zh"])}" aria-label="{html.escape(s["en"])} · {html.escape(s["zh"])}"></canvas>' for s in tm["stages"])
    return f'''<div class="cg-time rvl" data-cal-time data-stages="{stages}">
  <div class="cg-time-main">
    <div class="cg-time-paper"><canvas class="cg-time-cv" aria-label="The same character in different times · 同一個字在不同時代的樣子"></canvas></div>
    <div class="cg-time-side">
      <div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 字</span>{cb}</div>
      <p class="cg-time-cap" aria-live="polite"></p>
      <p class="cg-time-note"></p>
      <button type="button" class="cg-btn cg-btn-gold" data-time="play" aria-pressed="false">&#9654; <span class="t">Play 3,000 years · 播放三千年</span></button>
    </div>
  </div>
  <div class="cg-time-slider"><input type="range" class="cg-time-range" min="0" max="5" step="0.01" value="1" style="--p:20%" aria-label="Move through time, from picture to regular script · 拉動時間：從圖畫到楷書"></div>
  <ol class="cg-time-ticks">{ticks}</ol>
  <div class="cg-time-strip" aria-hidden="true">{minis}</div>
</div>'''

def _cal_which(wh):
    """第五課：「這是哪個字？」（time2d.js 的 initWhich）。"""
    hints = html.escape(json.dumps(wh["hints"], ensure_ascii=False))
    return f'''<div class="cg-guess cg-which rvl" data-cal-which data-hints="{hints}">
  <div class="cg-guess-paper"><canvas class="cg-which-cv" aria-label="An ancient character to identify · 要猜的古文字"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-which-q"></p>
    <div class="cg-which-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-which-msg" aria-live="polite"></p>
    <div class="cg-which-strip" hidden></div>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-which-score">0 / 0</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-which="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-which="script"><span class="t">Try the bronze script · 改看金文</span></button>
      <button type="button" class="cg-btn" data-which="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cg_cler_svg(key, size=66, cls=""):
    """隸書的小圖：宣紙色的底、照筆畫資料（tools/callig/src/strokes/clerical.json）的壓力畫一串圓（有粗細、有燕尾），燕尾那一筆朱紅色；不用字型。"""
    fp = os.path.join(ROOT, "tools/callig/src/strokes/clerical.json")
    dots = ""
    if os.path.exists(fp):
        C = json.load(open(fp, encoding="utf-8"))["chars"][key]
        for st in C["strokes"]:
            col = "#c4321f" if st.get("tail") else "#151311"
            P = st["pts"]
            for a, b in zip(P, P[1:]):
                n = max(2, int(((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5 / 9))
                for i in range(n):
                    u = i / n
                    p = a[2] + (b[2] - a[2]) * u
                    if p < 0.03: continue
                    r = (6 + 112 * p ** 1.12) / 2 * 0.05
                    dots += f'<circle cx="{5 + (a[0] + (b[0] - a[0]) * u) * 0.05:.1f}" cy="{5 + (a[1] + (b[1] - a[1]) * u) * 0.05:.1f}" r="{r:.2f}" fill="{col}"/>'
    c = f' class="{cls}"' if cls else ""
    return (f'<svg{c} viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>{dots}</svg>')

def calclerical_svg(size=56):
    """第六課的課程卡小圖示：隸書的「三」，最下面那一橫有燕尾（朱紅色）。"""
    return _cg_cler_svg("san", size, "calclerical-svg")

_CG_CLER = {"yi": "一", "san": "三", "tu": "土", "shan": "山", "ren": "人", "shui": "水"}

def render_calclerical_lab(lesson):
    """第六課：一筆長橫、隸變、竹簡（assets/js/cal-clerical.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "heng" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    cb = "".join(f'<button type="button" data-char="{k}" aria-pressed="{"true" if k == "san" else "false"}" title="{html.escape(lab["chars"][k])}">{g}</button>' for k, g in _CG_CLER.items())
    M = {m["key"]: m for m in lab["modes"]}
    def head(k):
        m = M[k]
        return (f'<h3 class="cg-panel-h">{html.escape(m["title_en"])}<span class="zh">{html.escape(m["title_zh"])}</span></h3>'
                f'<p class="cg-panel-t">{html.escape(m["text_en"])}<span class="zh">{html.escape(m["text_zh"])}</span></p>')
    pb = "".join(f'<button type="button" data-part="{i}" aria-pressed="false">{html.escape(p["en"])}<small>{html.escape(p["zh"])}</small></button>' for i, p in enumerate(lab["parts"]))
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖"), ("wide", "Desk", "整張桌子")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    modes = html.escape(json.dumps(lab["modes"], ensure_ascii=False))
    parts = html.escape(json.dumps(lab["parts"], ensure_ascii=False))
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-clerical-lab rvl" data-calclerical-lab data-modes="{modes}" data-parts="{parts}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a brush writing a clerical-script horizontal stroke with a silkworm head and a swallow tail, seal script changing into clerical script, and a scroll of bamboo slips · 毛筆寫隸書長橫（蠶頭燕尾）、小篆變成隸書、一卷竹簡的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the before-and-after slider, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、前後對照、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Three things to watch · 三個看法</p>
      <div class="cg-focus cg-modes" role="group" aria-label="Three things to watch · 三個看法">{mb}</div>
      <div class="cg-panel" data-panel="heng">{head("heng")}
        <div class="cg-seg cg-seg3" role="group" aria-label="Replay a part · 重播一段">{pb}</div>
        <div class="cg-btns"><button type="button" class="cg-btn-d cg-whole" data-part="all" aria-pressed="true">Whole stroke · 整筆</button>
          <button type="button" class="cg-btn-d" data-part="cmp" aria-pressed="false">Compare with regular script · 和楷書比</button></div>
        <dl class="cg-nums"><div><dt>Part · 哪一段</dt><dd class="cg-part-out">—</dd></div><div><dt>Pressure · 力道</dt><dd class="cg-press-out">—</dd></div></dl>
        <canvas class="cg-force" aria-label="Force curve of the stroke in three parts: silkworm head, middle, swallow tail · 這一筆的力道曲線，分成蠶頭、行筆、燕尾三段"></canvas>
        <p class="cg-step-t cg-part-t" aria-live="polite"></p>
      </div>
      <div class="cg-panel" data-panel="change" hidden>{head("change")}
        <p class="al-sky-k cg-k2">Character · 哪一個字</p>
        <div class="cg-chars6" role="group" aria-label="Character · 哪一個字">{cb}</div>
        <dl class="cg-nums"><div><dt>Character · 字</dt><dd class="cg-char-out">—</dd></div><div><dt>Stroke · 第幾筆</dt><dd class="cg-stroke-out">—</dd></div><div><dt>Shape · 字形</dt><dd class="cg-ratio-out">—</dd></div></dl>
        <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
      </div>
      <div class="cg-panel" data-panel="slips" hidden>{head("slips")}
        <p class="al-sky-k cg-k2">First character · 第一個字</p>
        <div class="cg-chars6" role="group" aria-label="First character · 第一個字">{cb}</div>
        <div class="cg-seg cg-seg2" role="group" aria-label="Scroll · 竹簡"><button type="button" data-roll="1" aria-pressed="false">Roll up<small>捲起來</small></button><button type="button" data-roll="0" aria-pressed="false">Unroll and write<small>攤開來寫</small></button></div>
        <dl class="cg-nums"><div><dt>Writing · 寫到哪裡</dt><dd class="cg-slip-out">—</dd></div></dl>
      </div>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_wipe(wp):
    """第六課：隸變前後（cler2d.js 的 initWipe）。"""
    notes = html.escape(json.dumps(wp["notes"], ensure_ascii=False))
    cb = "".join(f'<button type="button" data-wchar="{k}" aria-pressed="{"true" if k == "san" else "false"}">{g}</button>' for k, g in _CG_CLER.items())
    return f'''<div class="cg-time cg-wipe rvl" data-cal-wipe data-notes="{notes}">
  <div class="cg-time-main">
    <div class="cg-time-paper"><canvas class="cg-wipe-cv" aria-label="The same character in seal script on the left and clerical script on the right; drag the divider · 同一個字：左邊小篆、右邊隸書，拖動分隔線"></canvas>
      <div class="cg-time-slider"><input type="range" class="cg-time-range cg-wipe-range" min="0" max="100" step="1" value="50" style="--p:50%" aria-label="Move the divider between seal script and clerical script · 移動小篆和隸書之間的分隔線"></div></div>
    <div class="cg-time-side">
      <div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 字</span>{cb}</div>
      <p class="cg-time-note cg-wipe-note" aria-live="polite"></p>
      <p class="cg-wipe-ratio" hidden></p>
      <p class="cg-guess-note">The ratio compares height with width in our own drawings. · 這個比例是用我們畫的字算的（高 ÷ 寬）。</p>
    </div>
  </div>
</div>'''

def _cal_tail(tl):
    """第六課：找燕尾（cler2d.js 的 initTail）。"""
    return '''<div class="cg-guess cg-tail rvl" data-cal-tail>
  <div class="cg-guess-paper"><canvas class="cg-guess-cv cg-tail-cv" aria-label="Game: tap the stroke that ends with a swallow tail · 小遊戲：點有燕尾的那一筆"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-tail-q"></p>
    <p class="cg-guess-msg cg-tail-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就點對</span></span><b class="cg-tail-score">0 / 6</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-tail="next">Next character · 下一個字 &rarr;</button>
      <button type="button" class="cg-btn" data-tail="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cg_form_svg(strokes, size=66, cls=""):
    """行書、草書的小圖：照筆畫資料的壓力畫一串圓（有粗細），不用字型。"""
    dots = ""
    for st in strokes:
        P = st["pts"]
        for a, b in zip(P, P[1:]):
            n = max(2, int(((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5 / 9))
            for i in range(n):
                u = i / n
                p = a[2] + (b[2] - a[2]) * u
                if p < 0.03: continue
                r = (6 + 112 * p ** 1.12) / 2 * 0.05
                dots += f'<circle cx="{5 + (a[0] + (b[0] - a[0]) * u) * 0.05:.1f}" cy="{5 + (a[1] + (b[1] - a[1]) * u) * 0.05:.1f}" r="{r:.2f}" fill="#151311"/>'
    c = f' class="{cls}"' if cls else ""
    return (f'<svg{c} viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>{dots}</svg>')

def calspeed_svg(size=56):
    """第七課的課程卡小圖示：草書的「永」（tools/callig/src/strokes/cursive.json）。"""
    fp = os.path.join(ROOT, "tools/callig/src/strokes/cursive.json")
    strokes = json.load(open(fp, encoding="utf-8"))["chars"]["yong"]["strokes"] if os.path.exists(fp) else []
    return _cg_form_svg(strokes, size, "calspeed-svg")

_CG_SPEED = {"yong": "永", "zhi": "之", "shui": "水"}
_CG_SCRIPT3 = [("kai", "Regular", "楷書"), ("xing", "Running", "行書"), ("cao", "Cursive", "草書")]

def render_calspeed_lab(lesson):
    """第七課：三枝筆同時寫楷書、行書、草書（assets/js/cal-speed.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "race" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    cb = "".join(f'<button type="button" data-char="{k}" aria-pressed="{"true" if k == "yong" else "false"}" title="{html.escape(lab["chars"][k])}">{g}</button>' for k, g in _CG_SPEED.items())
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    head = "".join(f'<th scope="col"><b>{zh}</b>{en}</th>' for k, en, zh in _CG_SCRIPT3)
    def row(key, en, zh):
        return (f'<tr class="cg-race-{key}"><th scope="row">{en}<small>{zh}</small></th>'
                + "".join(f'<td data-cell="{key}-{k}">—</td>' for k, _, _ in _CG_SCRIPT3) + '</tr>')
    rows = row("n", "Strokes", "筆數") + row("lift", "Lifts", "提筆") + row("len", "Ink line", "墨線長") + row("time", "Time", "時間")
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-speed-lab rvl" data-calspeed-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of three brushes writing the same character at the same time in regular, running, and cursive script · 三枝毛筆同時用楷書、行書、草書寫同一個字的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Race or look closer · 比賽，或一種一種看</p>
      <div class="cg-focus cg-modes cg-modes4" role="group" aria-label="Race or one script · 比賽或單一字體">{mb}</div>
      <p class="al-sky-k cg-k2">Character · 哪一個字</p>
      <div class="cg-chars6 cg-chars3" role="group" aria-label="Character · 哪一個字">{cb}</div>
      <table class="cg-race"><thead><tr><td></td>{head}</tr></thead><tbody>{rows}</tbody></table>
      <p class="cg-step-t cg-race-msg" aria-live="polite"></p>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
      <button type="button" class="cg-btn-d cg-again">Start again · 再來一次</button>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_scripts(sc):
    """第七課：「這是哪一種字體？」（speed2d.js 的 initScripts；單元二五種字體的複習）。"""
    hints = html.escape(json.dumps(sc["hints"], ensure_ascii=False))
    return f'''<div class="cg-guess cg-which cg-scripts rvl" data-cal-scripts data-hints="{hints}">
  <div class="cg-guess-paper"><canvas class="cg-which-cv cg-scripts-cv" aria-label="A character written in one of five scripts · 用五種字體之一寫的字"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-scripts-q"></p>
    <div class="cg-which-opts cg-scripts-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-scripts-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-scripts-score">0 / 10</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-scripts="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-scripts="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cal_sheets(sh):
    """第七課：法帖裡的字（真的拓本、摹本的局部影像；assets/img/calligraphy/）。"""
    figs = "".join(
        f'<figure class="cg-sheet{" cg-sheet-tall" if it.get("tall") else ""}{" cg-sheet-whole" if it.get("whole") else ""} rvl"><img src="{html.escape(it["img"])}" alt="{html.escape(it["alt_en"])} · {html.escape(it["alt_zh"])}" loading="lazy" width="{it["w"]}" height="{it["h"]}">'
        f'<figcaption><b>{html.escape(it["en"])}</b><span class="zh">{html.escape(it["zh"])}</span>'
        f'{_bi(it["text_en"], it["text_zh"])}<span class="cg-sheet-credit">{it["credit_html"]}</span></figcaption></figure>'
        for it in sh["items"])
    return f'<div class="cg-sheets">{figs}</div>'

def _cal_lanting(key=None):
    fp = os.path.join(ROOT, "tools/callig/src/strokes/lanting.json")
    D = json.load(open(fp, encoding="utf-8"))["chars"] if os.path.exists(fp) else {}
    return D.get(key) if key else D

def callanting_svg(size=56):
    """第八課的課程卡小圖示：〈蘭亭序〉裡的一個「之」（宇宙之大）。"""
    c = _cal_lanting("z4")
    return _cg_form_svg(c["strokes"] if c else [], size, "callanting-svg")

_CG_ZHI = [("z1", "①"), ("z4", "④"), ("z6", "⑥"), ("z12", "⑫")]

def render_callanting_lab(lesson):
    """第八課：曲水流觴與四個「之」（assets/js/cal-lanting.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "stream" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    M = {m["key"]: m for m in lab["modes"]}
    def head(k):
        m = M[k]
        return (f'<h3 class="cg-panel-h">{html.escape(m["title_en"])}<span class="zh">{html.escape(m["title_zh"])}</span></h3>'
                f'<p class="cg-panel-t">{html.escape(m["text_en"])}<span class="zh">{html.escape(m["text_zh"])}</span></p>')
    zb = "".join(f'<button type="button" data-zhi="{k}" aria-pressed="false">{g}</button>' for k, g in _CG_ZHI)
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-lanting-lab rvl" data-callanting-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a gathering beside a winding stream with floating wine cups, a pavilion, and bamboo, and a brush writing four different forms of the character zhi · 曲水流觴的聚會（小溪、酒杯、亭子、竹林）與毛筆寫四個不同的「之」的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the twenty characters, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、二十個「之」、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Two things to watch · 兩個看法</p>
      <div class="cg-focus cg-modes cg-modes2" role="group" aria-label="Two things to watch · 兩個看法">{mb}</div>
      <div class="cg-panel" data-panel="stream">{head("stream")}
        <button type="button" class="cg-btn-d cg-float" data-float="1">Float a cup · 放一只酒杯</button>
        <dl class="cg-nums"><div><dt>Cups · 放了幾杯</dt><dd class="cg-cups-out">0</dd></div><div><dt>Poems · 幾首詩</dt><dd class="cg-poems-out">0</dd></div></dl>
        <p class="cg-step-t cg-lanting-msg" aria-live="polite"></p>
      </div>
      <div class="cg-panel" data-panel="write" hidden>{head("write")}
        <div class="cg-chars6 cg-chars4" role="group" aria-label="Which zhi · 哪一個之">{zb}</div>
        <button type="button" class="cg-btn-d cg-whole" data-zhi="all" aria-pressed="true">All four · 四個一起寫</button>
        <dl class="cg-nums"><div><dt>Which one · 第幾個</dt><dd class="cg-zhi-out">—</dd></div><div><dt>From · 出自</dt><dd class="cg-from-out">—</dd></div></dl>
        <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
        <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_zhi20(z):
    """第八課：神龍本裡的二十個「之」（真的摹本局部；一張 5×4 的拼圖用 background-position 切）。"""
    tiles = "".join(
        f'<figure class="cg-z20{" cg-z20-x" if it.get("note_en") else ""}"><span class="cg-z20-im" role="img" aria-label="之 {i + 1}: {html.escape(it["zh"])}" '
        f'style="background-image:url({html.escape(z["img"])});background-position:{(i % 5) * 25}% {(i // 5) * 100 / 3:.3f}%"></span>'
        f'<figcaption><b>{i + 1}</b>{html.escape(it["zh"])}</figcaption></figure>'
        for i, it in enumerate(z["items"]))
    return (f'<div class="cg-z20s rvl">{tiles}</div>'
            f'<p class="cg-sheet-credit cg-z20-credit rvl">{z["credit_html"]}</p>')

def _cal_same(sm):
    """第八課：「找出一樣的之」（lanting2d.js 的 initSame）。"""
    names = html.escape(json.dumps(sm["names"], ensure_ascii=False))
    return f'''<div class="cg-guess cg-same rvl" data-cal-same data-img="{html.escape(sm["img"])}" data-names="{names}">
  <div class="cg-guess-paper"><span class="cg-same-target" role="img" aria-label="The character to match · 要找的字"></span></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-same-q"></p>
    <div class="cg-same-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-same-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就找到</span></span><b class="cg-same-score">0 / 8</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-same="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-same="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cal_styles():
    fp = os.path.join(ROOT, "tools/callig/src/strokes/styles.json")
    return json.load(open(fp, encoding="utf-8"))["chars"] if os.path.exists(fp) else {}

def calstyles_svg(size=56):
    """第九課的課程卡小圖示：顏體的第一個範字（tools/callig/src/strokes/styles.json）。"""
    D = _cal_styles()
    c = next(iter(D.values()), None)
    return _cg_form_svg(c["yan"]["strokes"] if c else [], size, "calstyles-svg")

_CG_MASTER2 = [("yan", "Yan Zhenqing", "顏真卿"), ("liu", "Liu Gongquan", "柳公權")]

def render_calstyles_lab(lesson):
    """第九課：兩枝筆同時用顏體、柳體寫同一個字（assets/js/cal-styles.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    D = _cal_styles()
    first = next(iter(D), "")
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "both" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    cb = "".join(f'<button type="button" data-char="{k}" aria-pressed="{"true" if k == first else "false"}" title="{html.escape(c["en"])}">{html.escape(c["char"])}</button>' for k, c in D.items())
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    head = "".join(f'<th scope="col"><b>{zh}</b>{en.split()[0]}</th>' for k, en, zh in _CG_MASTER2)
    def row(key, en, zh):
        return (f'<tr class="cg-race-{key}"><th scope="row">{en}<small>{zh}</small></th>'
                + "".join(f'<td data-cell="{key}-{k}">—</td>' for k, _, _ in _CG_MASTER2) + '</tr>')
    rows = row("avg", "Average line", "平均線寬") + row("max", "Thickest", "最粗") + row("min", "Thinnest", "最細")
    frm = "".join(f'<span><b>{zh}</b><i data-sty-from="{k}"></i></span>' for k, _, zh in _CG_MASTER2)
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-speed-lab cg-styles-lab rvl" data-calstyles-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of two brushes writing the same character at the same time, one in the style of Yan Zhenqing and one in the style of Liu Gongquan · 兩枝毛筆同時用顏真卿和柳公權的寫法寫同一個字的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Side by side, or one at a time · 一起看，或一個一個看</p>
      <div class="cg-focus cg-modes cg-modes3" role="group" aria-label="Both or one master · 一起看或單看一位">{mb}</div>
      <p class="al-sky-k cg-k2">Character · 哪一個字</p>
      <div class="cg-chars6 cg-chars3" role="group" aria-label="Character · 哪一個字">{cb}</div>
      <p class="al-sky-k cg-k2">Stroke · 哪一筆</p>
      <div class="cg-seg cg-sty-strokes" role="group" aria-label="Stroke · 哪一筆"></div>
      <div class="cg-sty-curve-w">
        <p class="cg-sty-curve-k"></p>
        <canvas class="cg-sty-curve" aria-label="Press-and-lift curves of this stroke for the two masters · 這一筆兩位書法家的提按曲線"></canvas>
        <p class="cg-pad-key cg-sty-key"><i class="cg-key-m"></i>Yan · 顏　<i class="cg-key-u"></i>Liu · 柳　<span>high = pressed hard · 越高＝按得越重</span></p>
      </div>
      <table class="cg-race cg-sty-table"><thead><tr><td></td>{head}</tr></thead><tbody>{rows}</tbody></table>
      <p class="cg-sty-from">{frm}</p>
      <p class="cg-step-t cg-race-msg cg-sty-msg" aria-live="polite"></p>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
      <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_who(wh):
    """第九課：「這是誰的字？」（styles2d.js 的 initWho；碑帖上真的字，一張拼圖用 background-position 切）。"""
    items = html.escape(json.dumps(wh["items"], ensure_ascii=False))
    names = html.escape(json.dumps(wh["names"], ensure_ascii=False))
    return f'''<div class="cg-guess cg-same cg-who rvl" data-cal-who data-img="{html.escape(wh["img"])}" data-cols="{wh["cols"]}" data-rows="{wh["rows"]}" data-items="{items}" data-names="{names}">
  <div class="cg-guess-paper"><span class="cg-same-target cg-who-target" role="img" aria-label="A character from a stone inscription · 碑上的一個字"></span></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-who-q"></p>
    <div class="cg-which-opts cg-who-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-who-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-who-score">0 / 8</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-who="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-who="again">&#8630; Play again · 再玩一次</button>
    </div>
    <p class="cg-sheet-credit">{wh["credit_html"]}</p>
  </div>
</div>'''

def _cal_pairs(pr):
    """第九課：同一個字，不同的人寫（碑帖上真的字並排；每列一個字）。"""
    cols = pr["cols"]
    head = "".join(f'<th scope="col"><b>{html.escape(c["zh"])}</b>{html.escape(c["en"])}<small>{html.escape(c["from_zh"])}</small></th>' for c in cols)
    rows = ""
    for r in pr["rows"]:
        tds = "".join(
            (f'<td><img src="{html.escape(r["imgs"][c["key"]])}" alt="{html.escape(r["zh"])} written by {html.escape(c["en"])} · {html.escape(c["zh"])}寫的「{html.escape(r["zh"])}」" loading="lazy" width="240" height="240"></td>'
             if r["imgs"].get(c["key"]) else '<td class="cg-pair-x">—</td>') for c in cols)
        rows += f'<tr><th scope="row"><b>{html.escape(r["zh"])}</b>{html.escape(r["en"])}</th>{tds}</tr>'
    return (f'<div class="cg-pairs-w rvl"><table class="cg-pairs cg-pairs-{len(cols)}"><thead><tr><td></td>{head}</tr></thead><tbody>{rows}</tbody></table></div>'
            f'<p class="cg-sheet-credit cg-z20-credit rvl">{pr["credit_html"]}</p>')

def calgallery_svg(size=56):
    """第十課的課程卡小圖示：展櫃裡攤開的一卷字（純 SVG）。"""
    lines = "".join(f'<path d="M{16 + i * 7} 21 q2 5 -1 9 q-3 4 1 9" fill="none" stroke="#151311" stroke-width="{1.6 if i % 2 else 2.2}" stroke-linecap="round"/>' for i in range(5))
    return (f'<svg class="calgallery-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="3" y="3" width="54" height="54" rx="3" fill="#27384a"/><rect x="9" y="15" width="42" height="30" rx="2" fill="#f6f0e1"/>'
            f'{lines}<rect x="6" y="14" width="4" height="32" rx="2" fill="#8a5a2b"/><rect x="50" y="14" width="4" height="32" rx="2" fill="#8a5a2b"/>'
            '<rect x="24" y="49" width="12" height="3" rx="1.5" fill="#b9c2cc"/></svg>')

def render_calgallery_lab(lesson):
    """第十課：示意展廳與燈光實驗（assets/js/cal-gallery.js 綁這裡的 class；展廳自繪，作品是有授權的影像）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "tour" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    M = {m["key"]: m for m in lab["modes"]}
    wb = "".join(f'<button type="button" data-work="{i}" aria-pressed="false" title="{html.escape(w["en"])}">{i + 1}<small>{html.escape(w["short_zh"])}</small></button>' for i, w in enumerate(lab["works"]))
    lx = "".join(f'<button type="button" data-lux="{v}" aria-pressed="{"true" if v == 50 else "false"}">{en}<small>{zh}</small></button>' for v, en, zh in lab["lux_presets"])
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    works = html.escape(json.dumps(lab["works"], ensure_ascii=False))
    lt = M["light"]
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-gallery-lab rvl" data-calgallery-lab data-works="{works}" data-e0="{lab["e0"]}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a museum gallery with five works of calligraphy on the wall, and a light experiment with a strip of dyed paper · 博物館展廳的 3D 模型：牆上有五件書法作品，中間有一個用染色試紙做的燈光實驗"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to look around · 拖曳環顧　Scroll or pinch to zoom · 滾輪／雙指縮放　Tap a work · 點作品走近</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the five works, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、五件作品、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Two things to do · 兩件事</p>
      <div class="cg-focus cg-modes cg-modes2" role="group" aria-label="Two things to do · 兩件事">{mb}</div>
      <div class="cg-panel" data-panel="tour">
        <div class="cg-seg cg-gal-works" role="group" aria-label="Works · 作品">{wb}</div>
        <h3 class="cg-panel-h cg-work-h"></h3>
        <dl class="cg-nums cg-gal-nums"><div><dt>By · 作者</dt><dd class="cg-work-who">—</dd></div><div><dt>When · 年代</dt><dd class="cg-work-when">—</dd></div><div><dt>Script · 字體</dt><dd class="cg-work-script">—</dd></div><div><dt>Size · 大小</dt><dd class="cg-work-size">—</dd></div></dl>
        <p class="cg-panel-t cg-work-t"></p>
        <div class="cg-gal-nav"><button type="button" class="cg-btn-d" data-step="-1">&larr; Previous · 上一件</button><button type="button" class="cg-btn-d" data-step="1">Next · 下一件 &rarr;</button><button type="button" class="cg-btn-d cg-all">All five · 看全部</button></div>
      </div>
      <div class="cg-panel" data-panel="light" hidden>
        <h3 class="cg-panel-h">{html.escape(lt["title_en"])}<span class="zh">{html.escape(lt["title_zh"])}</span></h3>
        <p class="cg-panel-t">{html.escape(lt["text_en"])}<span class="zh">{html.escape(lt["text_zh"])}</span></p>
        <div class="cg-seg cg-gal-lux" role="group" aria-label="Light level · 亮度">{lx}</div>
        <label class="cg-lux-w"><span>Light · 照度 <b class="cg-lux-out">50 lux</b></span><input type="range" class="cg-lux" min="0" max="100" step="1" value="0" aria-label="Light level in lux · 照度（勒克斯）"></label>
        <dl class="cg-nums cg-gal-nums"><div class="cg-wide"><dt>Yearly limit (16,000 lux·hours) used up in · 一年的額度（16,000 lux·小時）幾天用完</dt><dd class="cg-limit-out">40</dd></div></dl>
        <p class="cg-step-t cg-eq-out"></p>
        <div class="cg-gal-nav"><button type="button" class="cg-btn-d cg-float" data-days="40">Show for 40 days · 展 40 天</button><button type="button" class="cg-btn-d" data-days="365">A whole year · 展一整年</button><button type="button" class="cg-btn-d cg-reset">New strip · 換新試紙</button></div>
        <dl class="cg-nums cg-gal-nums"><div><dt>Days on show · 展出天數</dt><dd class="cg-days-out">0</dd></div><div><dt>Yearly limit used · 用掉幾倍額度</dt><dd class="cg-used-out">0 ×</dd></div><div><dt>Light received · 累積照到的光</dt><dd class="cg-exp-out">0</dd></div><div><dt>Faded (model) · 褪色（示意）</dt><dd class="cg-fade-out">0%</dd></div></dl>
        <p class="cg-fade-bar" aria-hidden="true"><i></i></p>
        <p class="cg-step-t cg-gal-msg" aria-live="polite"></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_match(mt):
    """第十課：「這是哪一件？」（gallery2d.js 的 initMatch；每題一張作品局部）。"""
    items = html.escape(json.dumps(mt["items"], ensure_ascii=False))
    works = html.escape(json.dumps(mt["works"], ensure_ascii=False))
    return f'''<div class="cg-guess cg-same cg-match rvl" data-cal-match data-items="{items}" data-works="{works}">
  <div class="cg-guess-paper"><span class="cg-same-target cg-match-target" role="img" aria-label="A detail of one of the five works · 五件作品之一的局部"></span></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-match-q"></p>
    <div class="cg-match-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-match-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-match-score">0 / {len(mt["items"])}</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-match="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-match="again">&#8630; Play again · 再玩一次</button>
    </div>
    <p class="cg-sheet-credit">{mt["credit_html"]}</p>
  </div>
</div>'''

def _cal_tline(tl):
    """第十課：五件作品排年代（橫的時間軸，手機上直排）。"""
    lis = "".join(
        f'<li class="rvl"><b>{html.escape(it["year"])}</b><span class="cg-tl-dy">{html.escape(it["dy_en"])}<span class="zh">{html.escape(it["dy_zh"])}</span></span>'
        f'<strong>{html.escape(it["en"])}<span class="zh">{html.escape(it["zh"])}</span></strong>'
        f'<em>{html.escape(it["note_en"])}<span class="zh">{html.escape(it["note_zh"])}</span></em></li>' for it in tl["items"])
    return f'<ol class="cg-tline">{lis}</ol>'

def _cal_recap(rc):
    """第十課：十堂課回顧（每課一句話＋連結；課名、小圖示直接讀 CAL）。"""
    flat = {l["n"]: l for _, _, l in _cal_flat()}
    lis = ""
    for it in rc["items"]:
        l = flat.get(it["n"])
        if not l: continue
        lis += (f'<li class="rvl"><a href="{CAL_BASE}{l["slug"]}/"><span class="cg-rc-n">{l["n"]}</span>'
                f'<span class="cg-rc-b"><b>{html.escape(l["title"])}</b><span class="zh">{html.escape(l["title_zh"])}</span>'
                f'<em>{html.escape(it["en"])}<span class="zh">{html.escape(it["zh"])}</span></em></span></a></li>')
    return f'<ol class="cg-recap">{lis}</ol>'

def _cal_couplet_char(key):
    fp = os.path.join(ROOT, f"tools/callig/src/strokes/{key}.json")
    return json.load(open(fp, encoding="utf-8")) if os.path.exists(fp) else {"strokes": []}

def _cg_fang_svg(key, size=96, flip=False, cls=""):
    """斗方的小圖：紅色菱形紙＋筆畫資料畫的字（不用字型）。"""
    dots = ""
    for st in _cal_couplet_char(key)["strokes"]:
        P = st["pts"]
        for a, b in zip(P, P[1:]):
            n = max(2, int(((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5 / 9))
            for i in range(n):
                u = i / n
                p = a[2] + (b[2] - a[2]) * u
                if p < 0.03: continue
                r = (6 + 112 * p ** 1.12) / 2 * 0.03
                dots += f'<circle cx="{15 + (a[0] + (b[0] - a[0]) * u) * 0.03:.1f}" cy="{15 + (a[1] + (b[1] - a[1]) * u) * 0.03:.1f}" r="{r:.2f}" fill="#17120e"/>'
    c = f' class="{cls}"' if cls else ""
    g = f'<g transform="rotate(180 30 30)">{dots}</g>' if flip else dots
    return (f'<svg{c} viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'<path d="M30 2 58 30 30 58 2 30Z" fill="#c8281e"/><path d="M30 6 54 30 30 54 6 30Z" fill="none" stroke="#f0c44c" stroke-width=".8" opacity=".8"/>{g}</svg>')

def _cg_strip_svg(kind, size=96):
    """直的春聯（v）或橫批（h）的小圖。"""
    if kind == "h":
        body = '<rect x="6" y="22" width="48" height="16" rx="1.5" fill="#c8281e"/><rect x="8" y="24" width="44" height="12" fill="none" stroke="#f0c44c" stroke-width=".7"/>' + "".join(f'<rect x="{12 + i * 10}" y="27" width="6" height="6" rx="1" fill="#17120e"/>' for i in range(4))
    else:
        body = '<rect x="22" y="4" width="16" height="52" rx="1.5" fill="#c8281e"/><rect x="24" y="6" width="12" height="48" fill="none" stroke="#f0c44c" stroke-width=".7"/>' + "".join(f'<rect x="27" y="{9 + i * 6.4:.1f}" width="6" height="4.6" rx="1" fill="#17120e"/>' for i in range(7))
    return f'<svg viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">{body}</svg>'

def calcouplets_svg(size=56):
    """第十一課的課程卡小圖示：斗方上的「春」。"""
    return _cg_fang_svg("chun", size, cls="calcouplets-svg")

def render_calcouplets_lab(lesson):
    """第十一課：寫斗方、貼春聯（assets/js/cal-couplets.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "write" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    M = {m["key"]: m for m in lab["modes"]}
    def head(k):
        m = M[k]
        return (f'<h3 class="cg-panel-h">{html.escape(m["title_en"])}<span class="zh">{html.escape(m["title_zh"])}</span></h3>'
                f'<p class="cg-panel-t">{html.escape(m["text_en"])}<span class="zh">{html.escape(m["text_zh"])}</span></p>')
    cb = "".join(f'<button type="button" data-char="{k}" aria-pressed="{"true" if k == "chun" else "false"}" title="{en}">{g}</button>' for k, g, en in (("chun", "春", "spring"), ("fu", "福", "good fortune")))
    kb = "".join(f'<button type="button" data-couplet="{i}" aria-pressed="{"true" if i == 0 else "false"}">{i + 1}<small>{html.escape(c["short_zh"])}</small></button>' for i, c in enumerate(lab["couplets"]))
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    cps = html.escape(json.dumps(lab["couplets"], ensure_ascii=False))
    fl = lab["flip"]
    bi = lambda en, zh: html.escape(f'{en}<span class="zh">{zh}</span>')
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-couplets-lab rvl" data-calcouplets-lab data-couplets="{cps}" data-flip-on="{bi(fl["on_en"], fl["on_zh"])}" data-flip-off="{bi(fl["off_en"], fl["off_zh"])}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model: a brush writes a character on a red diamond-shaped paper, and a front door with a pair of spring couplets, a horizontal scroll, and two diamond papers · 毛筆在紅色斗方上寫字，以及貼著一副春聯、橫批和兩張斗方的大門的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Two steps · 兩個步驟</p>
      <div class="cg-focus cg-modes cg-modes2" role="group" aria-label="Two steps · 兩個步驟">{mb}</div>
      <div class="cg-panel" data-panel="write">{head("write")}
        <div class="cg-chars6 cg-chars2" role="group" aria-label="Character · 哪一個字">{cb}</div>
        <dl class="cg-nums cg-nums3x"><div><dt>Stroke · 第幾筆</dt><dd><span class="cg-cp-n">—</span> / <span class="cg-cp-total">9</span></dd></div><div><dt>Name · 筆畫</dt><dd class="cg-cp-name">—</dd></div></dl>
        <p class="cg-step-t cg-cp-wmsg" aria-live="polite"></p>
        <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
        <div class="cg-gal-nav"><button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button><button type="button" class="cg-btn-d cg-float cg-hang">Hang it on the door · 貼到門上 &rarr;</button></div>
      </div>
      <div class="cg-panel" data-panel="door" hidden>{head("door")}
        <div class="cg-seg cg-cp-sets" role="group" aria-label="Couplet · 哪一副對聯">{kb}</div>
        <dl class="cg-nums cg-cp-lines"><div><dt>Upper line · 上聯</dt><dd class="cg-cp-up">—</dd></div><div><dt>Lower line · 下聯</dt><dd class="cg-cp-dn">—</dd></div></dl>
        <div class="cg-gal-nav"><button type="button" class="cg-btn-d cg-swap">&#8644; Swap sides · 左右對調</button><button type="button" class="cg-btn-d cg-float cg-check">Check · 檢查</button></div>
        <p class="cg-step-t cg-cp-msg" aria-live="polite"></p>
        <div class="cg-gal-nav"><button type="button" class="cg-btn-d cg-flip" aria-pressed="false">&#8645; Turn 福 over · 把「福」倒過來</button></div>
        <p class="cg-step-t cg-cp-fmsg" aria-live="polite">{fl["off_en"]}<span class="zh">{fl["off_zh"]}</span></p>
      </div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_sides(sd):
    """第十一課：「哪一句是上聯？」（couplet2d.js 的 initSides）。"""
    cps = html.escape(json.dumps(sd["couplets"], ensure_ascii=False))
    return f'''<div class="cg-guess cg-sides rvl" data-cal-sides data-couplets="{cps}">
  <div class="cg-sides-strips" aria-hidden="true"><canvas class="cg-sides-a"></canvas><canvas class="cg-sides-b"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-sides-q"></p>
    <div class="cg-sides-opts" role="group" aria-label="Choices · 選項"><button type="button" data-side="0"></button><button type="button" data-side="1"></button></div>
    <p class="cg-guess-msg cg-sides-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-sides-score">0 / 8</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-sides="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-sides="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def calseal_svg(size=56):
    """第十二課的課程卡小圖示：一方朱文印（純 SVG，示意）。"""
    return (f'<svg class="calseal-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>'
            '<rect x="11" y="11" width="38" height="38" rx="2.5" fill="none" stroke="#c62a1f" stroke-width="3"/>'
            '<path d="M30 17v26M19 30v12h22V30M19 24v6M41 24v6" fill="none" stroke="#c62a1f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>')

_CG_SEALKEYS = [("ri", "日", "sun"), ("yue", "月", "moon"), ("shan", "山", "mountain"), ("shui", "水", "water"), ("ren", "人", "person"), ("ma", "馬", "horse")]

def render_calseal_lab(lesson):
    """第十二課：印章——印面是反的，蓋出來才是正的（assets/js/cal-seal.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    cb = "".join(f'<button type="button" data-char="{k}" aria-pressed="{"true" if k == "ma" else "false"}" title="{en}">{g}</button>' for k, g, en in _CG_SEALKEYS)
    sb = "".join(f'<button type="button" data-style="{k}" aria-pressed="{"true" if k == "zhu" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in (("zhu", "Red characters", "朱文"), ("bai", "White characters", "白文")))
    vb = "".join(f'<button type="button" data-carve="{k}" aria-pressed="{"true" if k == "mirror" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in (("mirror", "Mirror image", "反著刻"), ("straight", "The way you read it", "照正的刻")))
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-seal-lab rvl" data-calseal-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a seal, a dish of red seal paste, and a sheet of paper: the seal shows its face, is pressed into the paste, and is stamped on the paper · 印章、印泥和紙的 3D 模型：把印面翻給你看、蘸印泥、蓋在紙上"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the game, the seal designer, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、小遊戲、設計印章和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">The face and the print · 印面和蓋出來的印</p>
      <div class="cg-seal-pair"><figure><canvas class="cg-seal-face" aria-label="The face of the seal · 印面"></canvas><figcaption class="cg-seal-face-k"></figcaption></figure><span class="cg-seal-arrow" aria-hidden="true">&#8644;</span><figure><canvas class="cg-seal-print" aria-label="The print on paper · 蓋出來的印"></canvas><figcaption class="cg-seal-print-k"></figcaption></figure></div>
      <div class="cg-gal-nav"><button type="button" class="cg-btn-d cg-float cg-stamp">Stamp it · 蓋印</button><button type="button" class="cg-btn-d cg-look" aria-pressed="false">Look at the face · 看印面</button><button type="button" class="cg-btn-d cg-clear">New paper · 換一張紙</button></div>
      <p class="cg-step-t cg-seal-msg" aria-live="polite"></p>
      <p class="al-sky-k cg-k2">Character · 刻哪一個字</p>
      <div class="cg-chars6" role="group" aria-label="Character · 刻哪一個字">{cb}</div>
      <p class="al-sky-k cg-k2">Red or white · 朱文或白文</p>
      <div class="cg-seg cg-seg2" role="group" aria-label="Red or white characters · 朱文或白文">{sb}</div>
      <p class="al-sky-k cg-k2">How it is carved · 怎麼刻</p>
      <div class="cg-seg cg-seg2" role="group" aria-label="How it is carved · 怎麼刻">{vb}</div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_sealkind(sk):
    """第十二課：「朱文還是白文？」（seal2d.js 的 initKind）。"""
    return '''<div class="cg-guess cg-which cg-sealkind rvl" data-cal-sealkind>
  <div class="cg-guess-paper"><canvas class="cg-which-cv cg-kind-cv" aria-label="A seal print · 一個蓋出來的印"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-kind-q"></p>
    <div class="cg-which-opts cg-who-opts cg-kind-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-kind-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-kind-score">0 / 8</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-kind="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-kind="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cal_sealdesign(sd):
    """第十二課：「設計自己的印」（seal2d.js 的 initDesign）。"""
    kb = "".join(f'<button type="button" data-design-key="{k}" aria-pressed="{"true" if k == "ma" else "false"}" title="{en}">{g}</button>' for k, g, en in _CG_SEALKEYS)
    return f'''<div class="cg-design rvl" data-cal-sealdesign>
  <div class="cg-design-views">
    <figure><canvas class="cg-design-face" aria-label="The face of your seal · 你的印面"></canvas><figcaption>Carve this · 照這樣刻<small>the face is a mirror image · 印面是反的</small></figcaption></figure>
    <figure><canvas class="cg-design-print" aria-label="The print of your seal · 蓋出來的樣子"></canvas><figcaption>It prints this · 蓋出來是這樣<small>red seal paste on paper · 紙上的印泥</small></figcaption></figure>
  </div>
  <div class="cg-design-side">
    <div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 字</span>{kb}</div>
    <div class="cg-pad-chars cg-pad-scripts" role="group" aria-label="Red or white characters · 朱文或白文"><span>Kind · 種類</span><button type="button" data-design-style="zhu" aria-pressed="true">朱文<small>Red characters</small></button><button type="button" data-design-style="bai" aria-pressed="false">白文<small>White characters</small></button></div>
    <div class="cg-pad-chars cg-pad-scripts" role="group" aria-label="Shape · 形狀"><span>Shape · 形狀</span><button type="button" data-design-shape="square" aria-pressed="true">方<small>Square</small></button><button type="button" data-design-shape="round" aria-pressed="false">圓<small>Round</small></button></div>
    <p class="cg-guess-msg cg-design-msg" aria-live="polite"></p>
    <div class="cg-pad-btns"><button type="button" class="cg-btn cg-btn-gold" data-design="save">&#11015; Save the print as a picture · 把印存成圖片</button></div>
    <ol class="cg-pad-tips">{"".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in sd["tips"])}</ol>
  </div>
</div>'''

def calsutra_svg(size=56):
    """第十三課的課程卡小圖示：直行界線的紙上一個「心」（筆畫資料畫的，不用字型）。"""
    fp = os.path.join(ROOT, "tools/callig/src/strokes/xin.json")
    strokes = json.load(open(fp, encoding="utf-8"))["strokes"] if os.path.exists(fp) else []
    dots = ""
    for st in strokes:
        P = st["pts"]
        for a, b in zip(P, P[1:]):
            n = max(2, int(((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5 / 9))
            for i in range(n):
                u = i / n
                p = a[2] + (b[2] - a[2]) * u
                if p < 0.03: continue
                r = (6 + 112 * p ** 1.12) / 2 * 0.034
                dots += f'<circle cx="{13 + (a[0] + (b[0] - a[0]) * u) * 0.034:.1f}" cy="{11 + (a[1] + (b[1] - a[1]) * u) * 0.034:.1f}" r="{r:.2f}" fill="#151311"/>'
    return (f'<svg class="calsutra-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>'
            '<path d="M12 6v48M48 6v48" stroke="#2a251e" stroke-width="1.1"/><path d="M12 6h36M12 54h36" stroke="#2a251e" stroke-width="1.8"/>'
            f'{dots}</svg>')

_CG_SUTRA = [("xin", "心"), ("se", "色"), ("ji", "即"), ("shi4", "是"), ("kong", "空")]

def render_calsutra_lab(lesson):
    """第十三課：一格一個字抄〈心經〉的一句（assets/js/cal-sutra.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "steady" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    speeds = [("1", "1×", "原速"), ("2", "2×", "兩倍"), ("4", "4×", "四倍")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方"), ("tip", "Tip", "貼近筆尖")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-sutra-lab rvl" data-calsutra-lab data-total="{lab["total"]}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a brush copying one line of the Heart Sutra onto ruled paper, one character in each square, from top to bottom and from right to left · 毛筆在畫了直行界線的紙上抄〈心經〉的一句，一格一個字，由上到下、由右到左的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Two ways to write · 兩種寫法</p>
      <div class="cg-focus cg-modes cg-modes2" role="group" aria-label="Two ways to write · 兩種寫法">{mb}</div>
      <div class="cg-breath" aria-hidden="true"><span class="cg-breath-o"></span><span class="cg-breath-t"></span></div>
      <p class="cg-breath-k">{html.escape(lab["breath_en"])}<span class="zh">{html.escape(lab["breath_zh"])}</span></p>
      <dl class="cg-nums cg-su-nums"><div><dt>Character · 第幾個字</dt><dd><span class="cg-su-n">0</span> / 8 <span class="cg-su-ch">—</span></dd></div><div><dt>Time · 時間</dt><dd class="cg-su-sec">0 s</dd></div><div><dt>Whole sutra at this pace · 照這個速度抄完整部</dt><dd class="cg-su-whole">—</dd></div><div><dt>Evenness (model) · 整齊度（示意）</dt><dd class="cg-su-even">—</dd></div></dl>
      <p class="cg-step-t cg-su-msg" aria-live="polite"></p>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
      <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_order(od):
    """第十三課：「下一個字寫在哪一格？」（sutra2d.js 的 initOrder）。"""
    return f'''<div class="cg-guess cg-order rvl" data-cal-order data-cols="{od["cols"]}" data-rows="{od["rows"]}">
  <div class="cg-guess-paper cg-order-paper"><div class="cg-order-grid" role="group" aria-label="A sheet of ruled paper · 一張有格子的紙"></div></div>
  <div class="cg-guess-side">
    <p class="cg-guess-msg cg-order-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Squares filled<span class="zh">寫了幾格</span></span><b class="cg-order-n">0 / {od["cols"] * od["rows"]}</b></p>
    <div class="cg-pad-btns"><button type="button" class="cg-btn" data-order="reset">&#8630; Start again · 重新開始</button></div>
    <ol class="cg-pad-tips">{"".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in od["tips"])}</ol>
  </div>
</div>'''

def calpens_svg(size=56):
    """第十四課的課程卡小圖示：一筆毛筆的線（有粗細）和一個平頭筆的 o（純 SVG，示意）。"""
    return (f'<svg class="calpens-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>'
            '<path d="M9 22c6-5 12-4 17 1 3 3 2 8-3 12-4 3-9 7-13 9 6-2 13-1 19 4" fill="none" stroke="#151311" stroke-width="3.4" stroke-linecap="round"/>'
            '<path d="M44 18c-6 0-9 6-9 12s3 12 9 12 9-6 9-12-3-12-9-12zm0 3c3 1 4 5 4 9s-1 8-4 9c-3-1-4-5-4-9s1-8 4-9z" fill="#1f6f8b" fill-rule="evenodd"/></svg>')

def render_calpens_lab(lesson):
    """第十四課：毛筆和平頭筆並排寫（assets/js/cal-pens.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "both" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    wb = "".join(f'<button type="button" data-what="{k}" aria-pressed="{"true" if k == "word" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in (("word", "n o a", "寫字母"), ("yong", "永", "寫「永」")))
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    def row(key, en, zh):
        return (f'<tr class="cg-race-{key}"><th scope="row">{en}<small>{zh}</small></th><td data-cell="{key}-brush">—</td><td data-cell="{key}-pen">—</td></tr>')
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-speed-lab cg-styles-lab cg-pens-lab rvl" data-calpens-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a soft brush writing a Chinese character and a broad-edge pen writing Latin letters, side by side · 毛筆寫中文字、平頭筆寫拉丁字母，並排的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the game, and the two practice pads below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、小遊戲和兩個練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Side by side, or one at a time · 一起看，或一個一個看</p>
      <div class="cg-focus cg-modes cg-modes3" role="group" aria-label="Both or one tool · 一起看或單看一種">{mb}</div>
      <div class="cg-pens-live">
        <dl class="cg-nums cg-pens-b"><div><dt>Brush pressure · 毛筆按多重</dt><dd class="cg-pens-bp">0%</dd></div><div><dt>Brush line · 線寬</dt><dd class="cg-pens-bw">—</dd></div></dl>
        <dl class="cg-nums cg-pens-p"><div><dt>Pen direction · 平頭筆的方向</dt><dd class="cg-pens-pd">—</dd></div><div><dt>Pen line · 線寬</dt><dd class="cg-pens-pw">—</dd></div></dl>
      </div>
      <div class="cg-pens-rose-w"><canvas class="cg-pens-rose" aria-label="How thick the pen line is in each direction · 平頭筆往每個方向走會多粗"></canvas>
        <p class="cg-pens-rose-k">{html.escape(lab["rose_en"])}<span class="zh">{html.escape(lab["rose_zh"])}</span></p></div>
      <label class="cg-lux-w">Nib angle · 筆嘴角度 <b class="cg-nib-deg-out">30°</b><input type="range" class="cg-nib-deg" min="0" max="90" step="5" value="30" aria-label="Nib angle in degrees · 筆嘴角度"></label>
      <p class="al-sky-k cg-k2">What the pen writes · 平頭筆寫什麼</p>
      <div class="cg-seg cg-seg2" role="group" aria-label="What the pen writes · 平頭筆寫什麼">{wb}</div>
      <table class="cg-race cg-sty-table"><thead><tr><td></td><th scope="col"><b>毛筆</b>Brush</th><th scope="col"><b>平頭筆</b>Pen</th></tr></thead><tbody>{row("max", "Thickest", "最粗")}{row("min", "Thinnest", "最細")}</tbody></table>
      <p class="cg-step-t cg-race-msg cg-pens-msg" aria-live="polite"></p>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
      <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_tool(tl):
    """第十四課：「這一筆是哪一種筆寫的？」（pens2d.js 的 initTool）。"""
    return '''<div class="cg-guess cg-which cg-tool rvl" data-cal-tool>
  <div class="cg-guess-paper"><canvas class="cg-which-cv cg-tool-cv" aria-label="One stroke, written with a brush or with a broad-edge pen · 一筆：毛筆或平頭筆寫的"></canvas></div>
  <div class="cg-guess-side">
    <p class="cg-which-q cg-tool-q"></p>
    <div class="cg-which-opts cg-who-opts cg-tool-opts" role="group" aria-label="Choices · 選項"></div>
    <p class="cg-guess-msg cg-tool-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Right on the first try<span class="zh">一次就答對</span></span><b class="cg-tool-score">0 / 8</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-tool="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-tool="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cal_nibpad(np_):
    """第十四課：平頭筆練字板（pens2d.js 的 initNibPad）。"""
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in np_["tips"])
    return f'''<div class="cg-pad cg-nibpad rvl" data-cal-nibpad>
  <div class="cg-pad-paper"><canvas class="cg-pad-cv cg-nibpad-cv" aria-label="Broad-edge pen pad: draw with a mouse, a finger, or a stylus · 平頭筆練字板：用滑鼠、手指或觸控筆寫"></canvas></div>
  <div class="cg-pad-side">
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn" data-nibpad="undo">&#8630; Undo · 復原</button>
      <button type="button" class="cg-btn" data-nibpad="clear">Clear · 清除</button>
    </div>
    <div class="cg-pad-tg"><label><input type="checkbox" data-nibpad-t="guide" checked> Model · 範字</label></div>
    <label class="cg-nibpad-deg-w">Nib angle · 筆嘴角度 <b class="cg-nibpad-deg-out">30°</b><input type="range" class="cg-nibpad-deg" min="0" max="90" step="5" value="30" aria-label="Nib angle in degrees · 筆嘴角度"></label>
    <div class="cg-nibpad-live"><canvas class="cg-nibpad-rose" aria-hidden="true"></canvas><p class="cg-nibpad-out" aria-live="polite"></p></div>
    <ol class="cg-pad-tips">{tips}</ol>
  </div>
</div>'''

def calpencil_svg(size=56):
    """第十五課的課程卡小圖示：田字格裡一個鉛筆線的「十」，旁邊一枝鉛筆（純 SVG，示意）。"""
    return (f'<svg class="calpencil-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="3" y="3" width="54" height="54" rx="3" fill="#f6f0e1"/>'
            '<rect x="8" y="12" width="30" height="30" fill="none" stroke="#cd3e32" stroke-width="1.2"/>'
            '<path d="M23 12v30M8 27h30" stroke="#cd3e32" stroke-width=".8" stroke-dasharray="2 2"/>'
            '<path d="M13 25h20M23 16v22" fill="none" stroke="#3d4048" stroke-width="2.2" stroke-linecap="round"/>'
            '<g transform="rotate(32 46 30)"><rect x="43" y="10" width="6" height="30" fill="#e8b923"/><rect x="43" y="6" width="6" height="4" fill="#e58a8a"/>'
            '<path d="M43 40h6l-3 8z" fill="#d9b384"/><path d="M45 45h2l-1 3z" fill="#2c2e33"/></g></svg>')

def render_calpencil_lab(lesson):
    """第十五課：毛筆和鉛筆並排寫同一個字（assets/js/cal-pencil.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    mb = "".join(
        f'<button type="button" data-mode="{m["key"]}" aria-pressed="{"true" if m["key"] == "both" else "false"}">'
        f'<i aria-hidden="true">{html.escape(m["icon"])}</i>{html.escape(m["en"])}<small>{html.escape(m["zh"])}</small></button>'
        for m in lab["modes"])
    cb = "".join(f'<button type="button" data-ch="{c["key"]}" aria-pressed="{"true" if i == 0 else "false"}">{html.escape(c["glyph"])}<small>{html.escape(c["en"])}</small></button>' for i, c in enumerate(lab["chars"]))
    speeds = [("1", "1×", "原速"), ("0.5", "½×", "慢"), ("0.25", "¼×", "很慢")]
    spb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    cams = [("near", "Close", "近看"), ("top", "Top", "正上方")]
    camb = "".join(f'<button type="button" data-cam="{k}" aria-pressed="{"true" if k == "near" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in cams)
    tg = _lab_toggles([("shadow", "Brush shadow", "毛筆的影子", False), ("labels", "Labels", "標示", True)])
    def row(key, en, zh):
        return (f'<tr class="cg-race-{key}"><th scope="row">{en}<small>{zh}</small></th><td data-cell="{key}-brush">—</td><td data-cell="{key}-pencil">—</td></tr>')
    return f'''<div class="astro-lab cg-lab cg-press-lab cg-speed-lab cg-styles-lab cg-pens-lab cg-pencil-lab rvl" data-calpencil-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a brush and a pencil writing the same Chinese character side by side · 毛筆和鉛筆並排寫同一個中文字的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cg-cams" role="group" aria-label="View · 角度">{camb}</div>
      <p class="al-hint">Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The reading, the cards, the slider, the game, and the practice pad below still work.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下方的課文、卡片、滑桿、小遊戲和練字板一樣能用。</span></p>
    </div>
    <aside class="al-sky cg-aside">
      <p class="al-sky-k">Side by side, or one at a time · 一起看，或一個一個看</p>
      <div class="cg-focus cg-modes cg-modes3" role="group" aria-label="Both or one tool · 一起看或單看一種">{mb}</div>
      <p class="al-sky-k cg-k2">Character · 寫哪個字</p>
      <div class="cg-seg cg-pencil-chs" role="group" aria-label="Character · 寫哪個字">{cb}</div>
      <dl class="cg-nums cg-pencil-now"><div><dt>Stroke · 第幾筆</dt><dd class="cg-pencil-n">0 / 5</dd></div><div><dt>Its name · 筆畫名</dt><dd class="cg-pencil-nm">—</dd></div></dl>
      <div class="cg-pens-live">
        <dl class="cg-nums cg-pens-b"><div><dt>Brush pressure · 毛筆按多重</dt><dd class="cg-pencil-bp">0%</dd></div><div><dt>Brush line · 線寬</dt><dd class="cg-pencil-bw">—</dd></div></dl>
        <dl class="cg-nums cg-pens-p"><div><dt>Pencil · 鉛筆</dt><dd>same path<small>同一條路線</small></dd></div><div><dt>Pencil line · 線寬</dt><dd class="cg-pencil-pw">—</dd></div></dl>
      </div>
      <table class="cg-race cg-sty-table"><thead><tr><td></td><th scope="col"><b>毛筆</b>Brush</th><th scope="col"><b>鉛筆</b>Pencil</th></tr></thead><tbody>{row("n", "Strokes", "筆畫數")}{row("len", "Path", "路線長度")}{row("max", "Thickest", "最粗")}{row("min", "Thinnest", "最細")}</tbody></table>
      <p class="cg-step-t cg-race-msg cg-pens-msg cg-pencil-msg" aria-live="polite"></p>
      <div class="cg-seg cg-speeds" role="group" aria-label="Speed · 速度">{spb}</div>
      <button type="button" class="cg-btn-d cg-again">Write again · 再寫一次</button>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="true"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Pause · 暫停</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cg-credit">{lab["credit_html"]}</p>
</div>'''

def _cal_slim(sl):
    """第十五課：「把粗細拿掉」滑桿（pencil2d.js 的 initSlim）。"""
    cb = "".join(f'<button type="button" data-slim-ch="{c["key"]}" aria-pressed="{"true" if i == 0 else "false"}">{html.escape(c["glyph"])}</button>' for i, c in enumerate(sl["chars"]))
    return f'''<div class="cg-pad cg-slim rvl" data-cal-slim>
  <div class="cg-pad-paper"><canvas class="cg-slim-cv" aria-label="One character whose brush lines shrink into pencil lines as you move the slider · 一個字：拉動滑桿，毛筆的線慢慢變成鉛筆的線"></canvas></div>
  <div class="cg-pad-side">
    <div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 範字</span>{cb}</div>
    <label class="cg-nibpad-deg-w cg-slim-w">Thickness · 粗細 <b class="cg-slim-out">100%</b><input type="range" class="cg-slim-f" min="0" max="100" step="1" value="100" aria-label="How much of the brush's thickness to keep · 留下多少毛筆的粗細"><span class="cg-slim-ends"><span>&larr; Pencil · 鉛筆</span><span>Brush · 毛筆 &rarr;</span></span></label>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-slim-go="pencil">Take the thickness away · 把粗細拿掉</button>
      <button type="button" class="cg-btn" data-slim-go="brush">&#8630; Back to the brush · 回到毛筆</button>
    </div>
    <div class="cg-pad-tg"><label><input type="checkbox" data-slim-t="line"> Center line · 中心線</label><label><input type="checkbox" data-slim-t="order"> Order · 筆順</label></div>
    <dl class="cg-slim-nums"><div><dt>Thickest ÷ thinnest<span class="zh">最粗 ÷ 最細</span></dt><dd class="cg-slim-ratio">—</dd></div><div><dt>Strokes<span class="zh">筆畫數</span></dt><dd class="cg-slim-n">—</dd></div><div><dt>Path length<span class="zh">路線長度</span></dt><dd class="cg-slim-len">—</dd></div></dl>
    <p class="cg-guess-msg cg-slim-msg" aria-live="polite"></p>
  </div>
</div>'''

def _cal_spot(sp):
    """第十五課：「哪一筆寫歪了？」（pencil2d.js 的 initSpot）。"""
    return '''<div class="cg-spot rvl" data-cal-spot>
  <div class="cg-guess-paper"><canvas class="cg-spot-cv" aria-label="Left: a model character written with a brush. Right: a pencil copy with one stroke off. Tap that stroke. · 左邊是毛筆範字，右邊是鉛筆照著寫的字，有一筆寫歪了，把它點出來"></canvas></div>
  <div class="cg-spot-side">
    <p class="cg-which-q cg-spot-q"></p>
    <p class="cg-guess-msg cg-spot-msg" aria-live="polite"></p>
    <p class="cg-guess-sc"><span>Found on the first try<span class="zh">一次就找到</span></span><b class="cg-spot-score">0 / 8</b></p>
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-spot="next">Next · 下一題 &rarr;</button>
      <button type="button" class="cg-btn" data-spot="again">&#8630; Play again · 再玩一次</button>
    </div>
  </div>
</div>'''

def _cg_evo(key):
    """第五課卡片：甲骨文 → 金文 → 小篆 → 楷書四張小圖（cal-oracle.js 用 scripts2d.js 畫）。"""
    names = [("oracle", "甲骨文"), ("bronze", "金文"), ("seal", "小篆"), ("regular", "楷書")]
    return ('<div class="cg-evo" data-cg-evo="' + key + '">' + "".join(f'<figure><canvas data-stage="{k}"></canvas><figcaption>{zh}</figcaption></figure>' for k, zh in names) + '</div>')

def _cal_hold(hd):
    cards = "".join(
        f'<article class="cg-finger rvl"><b class="cg-finger-ch" aria-hidden="true">{html.escape(f["ch"])}</b>'
        f'<span class="cg-finger-py">{html.escape(f["ch"])} {html.escape(f["py"])}</span>'
        f'<h3>{html.escape(f["en"])}<span class="zh">{html.escape(f["zh"])}</span></h3>'
        f'<p>{html.escape(f["text_en"])}<span class="zh">{html.escape(f["text_zh"])}</span></p></article>'
        for f in hd["fingers"])
    checks = "".join(f'<li>{html.escape(c["en"])}<span class="zh">{html.escape(c["zh"])}</span></li>' for c in hd["checks"])
    return (f'<div class="cg-fingers stagger">{cards}</div>'
            f'<div class="cg-checks rvl"><p class="sub-head">Check your grip · 檢查你的執筆</p><ul>{checks}</ul></div>')

def _cal_drops(dp):
    inks = "".join(f'<button type="button" data-ink="{k["key"]}" aria-pressed="{"true" if k["key"] == "mid" else "false"}">{html.escape(k["en"])}<small>{html.escape(k["zh"])}</small></button>' for k in dp["inks"])
    cards = "".join(
        f'<figure class="cg-drop" data-paper="{p["key"]}"><canvas class="cg-drop-cv" aria-label="{html.escape(p["en"])} · {html.escape(p["zh"])}"></canvas>'
        f'<figcaption><span class="cg-drop-n"><b>{html.escape(p["en"])}</b><span class="zh">{html.escape(p["zh"])}</span></span><b class="cg-drop-x">—</b>'
        f'<span class="cg-drop-t">{html.escape(p["text_en"])}<span class="zh">{html.escape(p["text_zh"])}</span></span></figcaption></figure>'
        for p in dp["papers"])
    return (f'<div class="cg-drops rvl" data-cal-drops>'
            f'<div class="cg-drop-ctl"><div class="cg-seg cg-seg-l" role="group" aria-label="Ink · 墨的濃淡">{inks}</div>'
            f'<button type="button" class="cg-btn" data-drop>Drop again · 再滴一次</button></div>'
            f'<div class="cg-drop-grid">{cards}</div>'
            f'<p class="cg-drop-note">Illustration, not a measurement. The number is how many times wider the spot is than the drop. · 示意，不是量測；數字是墨跡比剛落下時寬幾倍。</p></div>')

def _cg_mini(pt):
    """八法卡片的小「永」：整個字淡淡的、那一法塗黑（cal-yong.js 的 initMinis 畫）。"""
    return f'<canvas class="cg-mini" data-cg-mini="{html.escape(pt["mini"])}"></canvas>'

def _cal_pad(pd):
    order = ' <label><input type="checkbox" data-pt="order" checked> Order · 筆順</label>' if pd.get("order") else ""
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in pd["tips"])
    curve = ('<div class="cg-pad-cmp"><p class="sub-head">Your press-and-lift curve · 你的提按曲線</p>'
             '<canvas class="cg-pad-curve" aria-label="Your press-and-lift curve compared with the demo · 你的提按曲線和示範比較"></canvas>'
             '<p class="cg-pad-key"><i class="cg-key-m"></i>Demo · 示範　<i class="cg-key-u"></i>You · 你</p>'
             '<p class="cg-pad-score" aria-live="polite"></p></div>') if pd.get("curve") else ""
    chars = ""
    if pd.get("scripts"):
        sb = "".join(f'<button type="button" data-pad-script="{k}" aria-pressed="{"true" if k == "kai" else "false"}">{zh}<small>{en}</small></button>' for k, en, zh in _CG_SCRIPT3)
        cb = "".join(f'<button type="button" data-pad-ch="{k}" aria-pressed="{"true" if k == "yong" else "false"}">{g}</button>' for k, g in _CG_SPEED.items())
        chars = (f'<div class="cg-pad-chars cg-pad-scripts" role="group" aria-label="Choose a script · 選一種字體"><span>Script · 字體</span>{sb}</div>'
                 f'<div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 範字</span>{cb}</div>')
    timer = ('<div class="cg-pad-timer"><p class="sub-head">Stopwatch · 碼表</p><p class="cg-pad-time" aria-live="polite"></p>'
             '<p class="cg-pad-key">From your first touch to your last lift. · 從第一筆下筆算到最後一筆提筆。</p></div>') if pd.get("timer") else ""
    if pd.get("masters"):
        D9 = _cal_styles()
        wb = "".join(f'<button type="button" data-pad-who="{k}" aria-pressed="{"true" if k == "yan" else "false"}">{zh}<small>{en}</small></button>' for k, en, zh in _CG_MASTER2)
        cb = "".join(f'<button type="button" data-pad-ch="{k}" aria-pressed="{"true" if i == 0 else "false"}">{html.escape(c["char"])}</button>' for i, (k, c) in enumerate(D9.items()))
        chars = (f'<div class="cg-pad-chars cg-pad-scripts" role="group" aria-label="Choose a master · 選一位書法家"><span>Model · 範本</span>{wb}</div>'
                 f'<div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 範字</span>{cb}</div>')
        timer = ('<div class="cg-pad-timer cg-pad-like" aria-live="polite"><p class="sub-head">Whose lines are yours closer to? · 你的線條比較像誰？</p>'
                 '<p class="cg-like-ends"><span>Liu · 柳<small>thin · 細</small></span><span>Yan · 顏<small>thick · 粗</small></span></p>'
                 '<p class="cg-like-bar"><i></i></p><p class="cg-like-t"></p>'
                 '<p class="cg-pad-key">This compares only how thick your lines are, not their shape. · 這裡只比線條的粗細，不比字形。</p></div>')
    if pd.get("chars"):
        cb = "".join(f'<button type="button" data-pad-char="{html.escape(c["key"])}" aria-pressed="{"true" if c["key"] == pd["char"] else "false"}">{html.escape(c["glyph"])}</button>' for c in pd["chars"])
        chars = f'<div class="cg-pad-chars" role="group" aria-label="Choose a character · 選一個字"><span>Character · 範字</span>{cb}</div>'
    tools, attrs, grid_lbl = "", "", "Grid · 米字格"
    if pd.get("tools"):
        tb = "".join(f'<button type="button" data-pad-tool="{k}" aria-pressed="{"true" if k == pd["tools"] else "false"}">{zh}<small>{en}</small></button>' for k, en, zh in (("brush", "Brush", "毛筆"), ("pencil", "Pencil", "鉛筆")))
        gb = "".join(f'<button type="button" data-pad-grid="{k}" aria-pressed="{"true" if k == pd.get("grid", "mi") else "false"}">{zh}<small>{en}</small></button>' for k, en, zh in (("tian", "田 grid", "田字格"), ("jiu", "Nine-square", "九宮格"), ("mi", "米 grid", "米字格")))
        tools = (f'<div class="cg-pad-chars cg-pad-scripts" role="group" aria-label="Choose a tool · 選一種筆"><span>Tool · 筆</span>{tb}</div>'
                 f'<div class="cg-pad-chars cg-pad-scripts cg-pad-grids" role="group" aria-label="Choose a grid · 選一種格子"><span>Grid · 格子</span>{gb}</div>'
                 '<p class="cg-pad-tool-out" aria-live="polite"></p>')
        attrs = f' data-tool="{pd["tools"]}" data-grid="{pd.get("grid", "mi")}"'
        grid_lbl = "Grid · 格線"
    return f'''<div class="cg-pad rvl" data-cal-pad data-char="{html.escape(pd["char"])}"{attrs}>
  <div class="cg-pad-paper"><canvas class="cg-pad-cv" aria-label="Practice pad: trace the model character with a mouse, a finger, or a stylus · 練字板：用滑鼠、手指或觸控筆描寫範字"></canvas></div>
  <div class="cg-pad-side">
    {chars}{tools}
    <div class="cg-pad-btns">
      <button type="button" class="cg-btn cg-btn-gold" data-pad="demo">&#9654; Watch the demo · 看示範</button>
      <button type="button" class="cg-btn" data-pad="undo">&#8630; Undo · 復原</button>
      <button type="button" class="cg-btn" data-pad="clear">Clear · 清除</button>
      <button type="button" class="cg-btn" data-pad="save">&#11015; Save as a picture · 存成圖片</button>
    </div>
    <div class="cg-pad-tg">
      <label><input type="checkbox" data-pt="grid" checked> {grid_lbl}</label>
      <label><input type="checkbox" data-pt="model" checked> Model · 範字</label>{order}
    </div>
    <div class="cg-pad-meter-w" aria-hidden="true"><span>Thin · 細</span><span class="cg-pad-meter"><i></i></span><span>Thick · 粗</span></div>
    <p class="cg-pad-mode" hidden><span class="cg-m-mouse">Mouse or finger: slow = thick, fast = thin<span class="zh">滑鼠或手指：寫得慢＝粗、寫得快＝細</span></span><span class="cg-m-pen">Stylus: press harder for a thicker line<span class="zh">觸控筆：越用力線越粗</span></span></p>
    <ol class="cg-pad-tips">{tips}</ol>
    {timer}
    {curve}
    <p class="cg-pad-msg" aria-live="polite"></p>
  </div>
</div>'''

def _cal_flat():
    return [(ui, u, l) for ui, u in enumerate(CAL["units"]) for l in u["lessons"]]

def _cal_nav(slug):
    flat = _cal_flat()
    i = next(n for n, (_, _, l) in enumerate(flat) if l["slug"] == slug)
    def side(item, dirn, label):
        if not item:
            return '<span class="pm-nav-x"></span>'
        l = item[2]
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{CAL_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = flat[i - 1] if i > 0 else None
    nxt = flat[i + 1] if i < len(flat) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{CAL_BASE}">&#9776; 回書法 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def build_cal_lesson(ui, unit, lesson):
    path = f'{CAL_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="callig", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab["kind"]
    lab_html = {"four": render_calfour_lab, "press": render_calpress_lab, "yong": render_calyong_lab, "order": render_calorder_lab, "oracle": render_caloracle_lab, "clerical": render_calclerical_lab, "speed": render_calspeed_lab, "lanting": render_callanting_lab, "styles": render_calstyles_lab, "gallery": render_calgallery_lab, "couplets": render_calcouplets_lab, "seal": render_calseal_lab, "sutra": render_calsutra_lab, "pens": render_calpens_lab, "pencil": render_calpencil_lab}[kind](lesson)

    secs = []
    if lesson.get("parts"):
        cards = "".join(
            f'<article class="ph-card cg-part rvl">'
            f'<div class="ph-ico cg-ico" aria-hidden="true">{_cg_mini(pt) if pt.get("mini") else _cg_oracle_svg(pt["evo"], 72) if pt.get("evo") else f'<canvas class="cg-mini" data-cg-cler="{pt["cler"]}"></canvas>' if pt.get("cler") else f'<canvas class="cg-mini" data-cg-script="{pt["script"]}" data-key="yong"></canvas>' if pt.get("script") else _cg_form_svg(_cal_lanting(pt["zhi"])["strokes"], 96) if pt.get("zhi") else f'<canvas class="cg-mini" data-cg-style="{pt["style"]}" data-key="{pt.get("ch", "")}"></canvas>' if pt.get("style") else _cg_fang_svg(pt["fang"], 96, bool(pt.get("flip"))) if pt.get("fang") else _cg_strip_svg(pt["strip"], 96) if pt.get("strip") else f'<canvas class="cg-mini" data-cg-pc="{pt["pc"]}"></canvas>' if pt.get("pc") else f'<canvas class="cg-mini" data-cg-pen="{pt["pen"]}"></canvas>' if pt.get("pen") else f'<canvas class="cg-mini" data-cg-seal="{pt["seal"]}" data-key="{pt.get("ch", "ma")}" data-view="{pt.get("view", "print")}" data-inked="{1 if pt.get("inked") else 0}" data-carve="{pt.get("carve", "mirror")}"></canvas>' if pt.get("seal") else _cg_char_svg(_CG_RULE_CHAR[pt["key"]], 72) if pt.get("glyph") else _cg_icon(pt["icon"])}</div>'
            f'<h3>{html.escape(pt["en"])}<span class="zh">{html.escape(pt["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(pt["meta_en"])} · {html.escape(pt["meta_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(pt["text_en"])}<br><span class="zh">{html.escape(pt["text_zh"])}</span></p>'
            f'{_cg_evo(pt["evo"]) if pt.get("evo") else ""}'
            f'<button type="button" class="ph-go" data-lab-demo="{pt["demo"]}">{"Watch it in 3D · 在模型中看" if pt.get("mini") or pt.get("glyph") or pt.get("evo") or pt.get("cler") or pt.get("script") or pt.get("zhi") or pt.get("style") or pt.get("fang") or pt.get("strip") or pt.get("seal") or pt.get("pen") or pt.get("pc") else "Try it in 3D · 在模型中試"} <i>&uarr;</i></button>'
            f'</article>' for pt in lesson["parts"])
        ph = lesson["parts_head"]
        secs.append(("parts", ph["eyebrow"], ph["en"], ph["zh"], f'<div class="ph-grid stagger">{cards}</div>',
                     _bi(lesson["parts_note_en"], lesson["parts_note_zh"], cls="lead rvl d2")))
    if lesson.get("drops"):
        dp = lesson["drops"]
        secs.append(("drops", dp["eyebrow"], dp["en"], dp["zh"], _cal_drops(dp), _bi(dp["lead_en"], dp["lead_zh"], cls="lead rvl d2")))
    if lesson.get("hold"):
        hd = lesson["hold"]
        secs.append(("hold", hd["eyebrow"], hd["en"], hd["zh"], _cal_hold(hd), _bi(hd["lead_en"], hd["lead_zh"], cls="lead rvl d2")))
    if lesson.get("time"):
        tm = lesson["time"]
        secs.append(("time", tm["eyebrow"], tm["en"], tm["zh"], _cal_time(tm), _bi(tm["lead_en"], tm["lead_zh"], cls="lead rvl d2")))
    if lesson.get("which"):
        wh = lesson["which"]
        secs.append(("which", wh["eyebrow"], wh["en"], wh["zh"], _cal_which(wh), _bi(wh["lead_en"], wh["lead_zh"], cls="lead rvl d2")))
    if lesson.get("tool"):
        tl = lesson["tool"]
        secs.append(("tool", tl["eyebrow"], tl["en"], tl["zh"], _cal_tool(tl), _bi(tl["lead_en"], tl["lead_zh"], cls="lead rvl d2")))
    if lesson.get("nibpad"):
        nb = lesson["nibpad"]
        secs.append(("nibpad", nb["eyebrow"], nb["en"], nb["zh"], _cal_nibpad(nb), _bi(nb["lead_en"], nb["lead_zh"], cls="lead rvl d2")))
    if lesson.get("slim"):
        sl = lesson["slim"]
        secs.append(("slim", sl["eyebrow"], sl["en"], sl["zh"], _cal_slim(sl), _bi(sl["lead_en"], sl["lead_zh"], cls="lead rvl d2")))
    if lesson.get("spot"):
        sp = lesson["spot"]
        secs.append(("spot", sp["eyebrow"], sp["en"], sp["zh"], _cal_spot(sp), _bi(sp["lead_en"], sp["lead_zh"], cls="lead rvl d2")))
    if lesson.get("order"):
        od = lesson["order"]
        secs.append(("order", od["eyebrow"], od["en"], od["zh"], _cal_order(od), _bi(od["lead_en"], od["lead_zh"], cls="lead rvl d2")))
    if lesson.get("sealkind"):
        sk = lesson["sealkind"]
        secs.append(("sealkind", sk["eyebrow"], sk["en"], sk["zh"], _cal_sealkind(sk), _bi(sk["lead_en"], sk["lead_zh"], cls="lead rvl d2")))
    if lesson.get("sealdesign"):
        sg = lesson["sealdesign"]
        secs.append(("sealdesign", sg["eyebrow"], sg["en"], sg["zh"], _cal_sealdesign(sg), _bi(sg["lead_en"], sg["lead_zh"], cls="lead rvl d2")))
    if lesson.get("sides"):
        sd = lesson["sides"]
        secs.append(("sides", sd["eyebrow"], sd["en"], sd["zh"], _cal_sides(sd), _bi(sd["lead_en"], sd["lead_zh"], cls="lead rvl d2")))
    if lesson.get("tline"):
        tl = lesson["tline"]
        secs.append(("tline", tl["eyebrow"], tl["en"], tl["zh"], _cal_tline(tl), _bi(tl["lead_en"], tl["lead_zh"], cls="lead rvl d2")))
    if lesson.get("match"):
        mt = lesson["match"]
        secs.append(("match", mt["eyebrow"], mt["en"], mt["zh"], _cal_match(mt), _bi(mt["lead_en"], mt["lead_zh"], cls="lead rvl d2")))
    if lesson.get("pairs"):
        pr = lesson["pairs"]
        secs.append(("pairs", pr["eyebrow"], pr["en"], pr["zh"], _cal_pairs(pr), _bi(pr["lead_en"], pr["lead_zh"], cls="lead rvl d2")))
    if lesson.get("who"):
        wh = lesson["who"]
        secs.append(("who", wh["eyebrow"], wh["en"], wh["zh"], _cal_who(wh), _bi(wh["lead_en"], wh["lead_zh"], cls="lead rvl d2")))
    if lesson.get("zhi20"):
        z = lesson["zhi20"]
        secs.append(("zhi20", z["eyebrow"], z["en"], z["zh"], _cal_zhi20(z), _bi(z["lead_en"], z["lead_zh"], cls="lead rvl d2")))
    if lesson.get("same"):
        sm = lesson["same"]
        secs.append(("same", sm["eyebrow"], sm["en"], sm["zh"], _cal_same(sm), _bi(sm["lead_en"], sm["lead_zh"], cls="lead rvl d2")))
    if lesson.get("sheets"):
        sh = lesson["sheets"]
        secs.append(("sheets", sh["eyebrow"], sh["en"], sh["zh"], _cal_sheets(sh), _bi(sh["lead_en"], sh["lead_zh"], cls="lead rvl d2")))
    if lesson.get("scripts"):
        sc = lesson["scripts"]
        secs.append(("scripts", sc["eyebrow"], sc["en"], sc["zh"], _cal_scripts(sc), _bi(sc["lead_en"], sc["lead_zh"], cls="lead rvl d2")))
    if lesson.get("wipe"):
        wp = lesson["wipe"]
        secs.append(("wipe", wp["eyebrow"], wp["en"], wp["zh"], _cal_wipe(wp), _bi(wp["lead_en"], wp["lead_zh"], cls="lead rvl d2")))
    if lesson.get("tail"):
        tl = lesson["tail"]
        secs.append(("tail", tl["eyebrow"], tl["en"], tl["zh"], _cal_tail(tl), _bi(tl["lead_en"], tl["lead_zh"], cls="lead rvl d2")))
    if lesson.get("guess"):
        gs = lesson["guess"]
        secs.append(("guess", gs["eyebrow"], gs["en"], gs["zh"], _cal_guess(gs), _bi(gs["lead_en"], gs["lead_zh"], cls="lead rvl d2")))
    if lesson.get("pad"):
        pd = lesson["pad"]
        secs.append(("pad", pd["eyebrow"], pd["en"], pd["zh"], _cal_pad(pd), _bi(pd["lead_en"], pd["lead_zh"], cls="lead rvl d2")))
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
    tricks_h = {"four": ("The Four Treasures in a sentence", "一句話記住文房四寶"),
                "press": ("Press and lift in a sentence", "一句話記住提按"),
                "yong": ("The Eight Principles in a sentence", "一句話記住永字八法"),
                "order": ("Stroke order in a sentence", "一句話記住筆順"),
                "oracle": ("Three thousand years in a sentence", "一句話記住三千年"),
                "clerical": ("Clerical script in a sentence", "一句話記住隸書"),
                "speed": ("Three scripts in a sentence", "一句話記住楷行草"),
                "lanting": ("The Lanting Xu in a sentence", "一句話記住蘭亭序"),
                "styles": ("Yan and Liu in a sentence", "一句話記住顏筋柳骨"),
                "gallery": ("The treasures in a sentence", "一句話記住故宮國寶"),
                "couplets": ("Spring couplets in a sentence", "一句話記住春聯"),
                "seal": ("Seals in a sentence", "一句話記住印章"),
                "sutra": ("Copying sutras in a sentence", "一句話記住抄經"),
                "pens": ("Two tools in a sentence", "一句話記住兩種筆"),
                "pencil": ("Brush and pencil in a sentence", "一句話記住毛筆和鉛筆")}[kind]
    secs.append(("tricks", "Remember It · 記憶口訣", tricks_h[0], tricks_h[1], _sci_tricks(lesson), ""))
    if lesson.get("safety"):
        items = "".join(f'<li class="rvl">{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></li>' for s in lesson["safety"])
        secs.append(("safety", "In the Classroom · 教室提醒", "Before you pick up a brush", "拿起毛筆之前",
                     f'<ul class="cg-safety">{items}</ul>', ""))
    acts = lesson.get("activities") or [lesson["activity"]]
    for n, act in enumerate(acts, 1):
        eb = "Classroom Activity · 課堂活動" if len(acts) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    if lesson.get("recap"):
        rc = lesson["recap"]
        secs.append(("recap", rc["eyebrow"], rc["en"], rc["zh"], _cal_recap(rc), _bi(rc["lead_en"], rc["lead_zh"], cls="lead rvl d2")))
    if lesson.get("links"):
        def link(x):
            body = (f'<span class="cg-link-ic" aria-hidden="true">{x["icon"]}</span>'
                    f'<span class="cg-link-b"><span class="cg-link-k">{html.escape(x["k_en"])} · {html.escape(x["k_zh"])}</span>'
                    f'<b>{html.escape(x["en"])}</b><span class="zh cg-link-zh">{html.escape(x["zh"])}</span>'
                    f'<span class="cg-link-n">{html.escape(x["note_en"])}<span class="zh">{html.escape(x["note_zh"])}</span></span>')
            if x.get("soon"):
                return f'<div class="cg-link cg-link-soon rvl">{body}<span class="cg-link-go">Coming soon · 製作中</span></span></div>'
            return f'<a class="cg-link rvl" href="{html.escape(x["href"])}">{body}<span class="cg-link-go">Go to the lesson · 前往這一課 <i>&rarr;</i></span></span></a>'
        lh = lesson.get("links_head") or {"eyebrow": "Go Further · 延伸閱讀", "en": "Read more", "zh": "延伸閱讀"}
        secs.append(("more", lh["eyebrow"], lh["en"], lh["zh"], f'<div class="cg-links">{"".join(link(x) for x in lesson["links"])}</div>', ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))
    src_html = ""
    if lesson.get("sources"):
        rows = "".join(
            f'<li><span>{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></span>'
            f'<a href="{html.escape(s["url"])}" target="_blank" rel="noopener">{html.escape(s["src"])} &#8599;</a></li>'
            for s in lesson["sources"])
        src_html = (f'<div class="cg-sources rvl"><p class="sub-head">Sources · 資料出處</p>'
                    f'<p class="muted">Dates, names, places, and facts on this page were checked against these sources (October 2026). · 本頁的年代、人名、地名與事實依下列資料查證（2026 年 10 月）。</p>'
                    f'<ol>{rows}</ol></div>')

    eyebrow = (f'Chinese Calligraphy · Unit {ui + 1} · Lesson {lesson["n"]} · '
               f'書法 單元{_htw_cn(ui + 1)} 第{_htw_cn(lesson["n"])}課')
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(CAL_BASE, "回書法 · All Lessons"))}
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
{_cal_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'calligraphy-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_cal_head(_CAL_JS[kind])))
    return path

def build_cal_hub():
    # 照晶片與半導體：單元導覽＋每個單元一段橫向課程卡；做好的課可點，planned 是「製作中」卡。
    def icon(l):
        return calfour_svg(60) if l.get("card") == "four" else calpress_svg(60) if l.get("card") == "press" else calyong_svg(60) if l.get("card") == "yong" else calorder_svg(60) if l.get("card") == "order" else caloracle_svg(60) if l.get("card") == "oracle" else calclerical_svg(60) if l.get("card") == "clerical" else calspeed_svg(60) if l.get("card") == "speed" else callanting_svg(60) if l.get("card") == "lanting" else calstyles_svg(60) if l.get("card") == "styles" else calgallery_svg(60) if l.get("card") == "gallery" else calcouplets_svg(60) if l.get("card") == "couplets" else calseal_svg(60) if l.get("card") == "seal" else calsutra_svg(60) if l.get("card") == "sutra" else calpens_svg(60) if l.get("card") == "pens" else calpencil_svg(60) if l.get("card") == "pencil" else l["icon"]
    unit_sections, nav = [], []
    done = sum(len(u["lessons"]) for u in CAL["units"])
    total = done + sum(len(u.get("planned", [])) for u in CAL["units"])
    for idx, u in enumerate(CAL["units"]):
        rows = []
        for l in u["lessons"]:
            rows.append((l["n"],
                f'<a class="lc-row rvl" href="{CAL_BASE}{l["slug"]}/">'
                f'<span class="lc-ico cg-lc-ico" aria-hidden="true">{icon(l)}</span>'
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
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in CAL["intro"])
    intro_html += _bi(f"{done} of {total} lessons are ready so far; more are on the way.",
                      f"目前完成 {done} 課（共規劃 {total} 課），持續增加中。", cls="cg-progress")
    lead = f'{html.escape(CAL["lead_en"])}<br><span class="muted">{html.escape(CAL["lead_zh"])}</span>'
    body = f'''
{page_hero(CAL["eyebrow"], f'{CAL["title_en"]} <span class="h1-zh">{CAL["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl cg-intro"><span class="cg-intro-ic" aria-hidden="true">{calbrush_svg(76)}</span>{intro_html}</div>
</div></section>
{unit_nav}
{"".join(unit_sections)}
'''
    write(CAL_BASE, layout(CAL_BASE, f'{CAL["title_en"]} · {CAL["title_zh"]}',
          f'{CAL["lead_en"]} {CAL["lead_zh"]}', body, "resources", extra_head=_cal_head() + _lc_head()))
    return CAL_BASE


# ─────────────────────────────────────────────────────────────────────────────
# 電腦概論 How Computers Work（/resources/classes/computers/）
# 架構照書法：data/computers.json 的 units[].lessons 是做好的課、units[].planned 是「製作中」卡。
# 樣式 assets/css/computers.css（class 前綴 cp-，只載在本系列）；3D 原始碼 tools/computers/src/，bundle 一律 comp-*。
# ─────────────────────────────────────────────────────────────────────────────
_compj = os.path.join(ROOT, "data", "computers.json")
COMP = json.load(open(_compj, encoding="utf-8")) if os.path.exists(_compj) else None
COMP_BASE = "/resources/classes/computers/"
_COMP_JS = {"bits": "comp-bits", "pixels": "comp-pixels", "logic": "comp-logic", "adder": "comp-adder", "pc": "comp-pc"}   # lab.kind → assets/js/<bundle>.js

def _comp_ver():
    h = hashlib.md5()
    for rel in ("assets/css/astro.css", "assets/css/computers.css", *(f"assets/js/{j}.js" for j in _COMP_JS.values())):
        fp = os.path.join(ROOT, rel)
        if os.path.exists(fp): h.update(open(fp, "rb").read())
    return h.hexdigest()[:8]

def _comp_head(js=None):
    v = _comp_ver()
    tag = f'<script defer src="/assets/js/{js}.js?v={v}"></script>\n' if js else ""
    return (f'<link rel="stylesheet" href="/assets/css/astro.css?v={v}">\n'
            f'<link rel="stylesheet" href="/assets/css/computers.css?v={v}">\n{tag}')

def _comp_lamps(bits, x0, y, gap, r):
    """一排小燈（'01101'：最左邊的字元畫在最左邊）。"""
    out = []
    for k, b in enumerate(bits):
        cx = x0 + k * gap
        if b == "1":
            out.append(f'<circle cx="{cx:.1f}" cy="{y}" r="{r * 1.9:.1f}" fill="#ffd36e" opacity=".28"/>'
                       f'<circle cx="{cx:.1f}" cy="{y}" r="{r}" fill="#ffd36e" stroke="#fff3c9" stroke-width="1"/>')
        else:
            out.append(f'<circle cx="{cx:.1f}" cy="{y}" r="{r}" fill="#2b3550" stroke="#5b6b90" stroke-width="1"/>')
    return "".join(out)

def comphub_svg(size=56):
    """電腦概論的系列小圖示：一台螢幕，畫面上兩排小燈（開與關）。"""
    return (f'<svg class="comphub-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="6" y="9" width="48" height="33" rx="4" fill="#0e1830" stroke="#9fb0cf" stroke-width="2"/>'
            f'{_comp_lamps("1011", 16.5, 20, 9, 3)}{_comp_lamps("0110", 16.5, 31, 9, 3)}'
            '<path d="M25 42h10l2 8H23z" fill="#9fb0cf"/><rect x="17" y="50" width="26" height="3.4" rx="1.7" fill="#c9d3e8"/></svg>')

def compbits_svg(size=56):
    """第一課的課程卡小圖示：一個撥桿開關，上面一排四盞燈（1101）。"""
    return (f'<svg class="compbits-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{_comp_lamps("1101", 12, 15, 12, 4.2)}'
            '<rect x="14" y="36" width="32" height="15" rx="4" fill="#dfe3ea"/>'
            '<path d="M30 42 39.5 27.5" stroke="#8a93a6" stroke-width="4.2" stroke-linecap="round"/>'
            '<circle cx="40" cy="26.5" r="4.4" fill="#38c778"/></svg>')

_COMP_CARD = {"bits": compbits_svg}

def render_compbits_lab(lesson):
    """第一課：八個開關與燈泡（assets/js/comp-bits.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    strip = "".join(
        f'<button type="button" data-bit="{i}" aria-pressed="false" aria-label="Switch worth {2 ** i} · 代表 {2 ** i} 的開關">'
        f'<small>{2 ** i}</small><b>0</b></button>' for i in range(7, -1, -1))
    speeds = [("0.5", "½×", "慢"), ("1", "1×", "原速"), ("4", "4×", "快")]
    sb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    tg = _lab_toggles([("values", "Place values", "位值", True), ("labels", "0 and 1", "0 和 1", True)])
    return f'''<div class="astro-lab cp-lab rvl" data-compbits-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a row of eight switches, each with a light bulb, that count in binary · 一排八個開關各接一盞燈泡、用二進位數數的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Tap a switch · 點一下開關　Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The row of switch buttons below still works, and so do the reading, the cards, and the games.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下面那一排開關按鈕照樣能用，課文、卡片和小遊戲也都能用。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">This row shows · 這一排是</p>
      <p class="cp-num" aria-live="polite">0</p>
      <p class="cp-eq">0</p>
      <p class="cp-binw"><span>In binary · 二進位寫法</span><b class="cp-bin">0000 0000</b></p>
      <div class="cp-strip" role="group" aria-label="Eight switches; the rightmost is worth 1 · 八個開關，最右邊代表 1">{strip}</div>
      <div class="cp-btns">
        <button type="button" class="cp-btn-d cp-add">+1 <span>Add one · 加一</span></button>
        <button type="button" class="cp-btn-d cp-reset">Reset · 歸零</button>
      </div>
      <p class="cp-msg" aria-live="polite"></p>
      <p class="al-sky-k cp-k2">Speed · 速度</p>
      <div class="cp-seg" role="group" aria-label="Speed · 速度">{sb}</div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Count up · 往上數</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _comp_fingers(fg):
    fingers = [(4, "pinky", "Little", "小指"), (3, "ring", "Ring", "無名指"), (2, "middle", "Middle", "中指"), (1, "index", "Index", "食指"), (0, "thumb", "Thumb", "拇指")]
    fb = "".join(
        f'<button type="button" class="cp-finger cp-f-{key}" data-finger="{i}" aria-pressed="false" aria-label="{en} finger, worth {2 ** i} · {zh}，代表 {2 ** i}">'
        f'<b>{2 ** i}</b><small>{en}<br>{zh}</small></button>' for i, key, en, zh in fingers)
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in fg["tips"])
    return f'''<div class="cp-fingers rvl" data-cp-fingers>
  <div class="cp-hand-w">
    <div class="cp-hand" role="group" aria-label="Five fingers; tap a finger to raise or lower it · 五根手指，點一下舉起或放下">{fb}<span class="cp-palm" aria-hidden="true"></span></div>
    <p class="cp-hand-c">{html.escape(fg["hand_en"])}<span class="zh">{html.escape(fg["hand_zh"])}</span></p>
  </div>
  <div class="cp-fg-side">
    <p class="cp-k">Your hand shows · 你的手比的是</p>
    <p class="cp-fg-num" aria-live="polite">0</p>
    <p class="cp-fg-eq">0</p>
    <p class="cp-fg-binw">In binary · 二進位寫法 <b class="cp-fg-bin">00000</b></p>
    <div class="cp-fg-task">
      <p class="cp-k">Challenge · 挑戰</p>
      <p class="cp-fg-q">Show the number <b class="cp-fg-goal">19</b> · 比出這個數</p>
      <p class="cp-fg-msg" aria-live="polite"></p>
      <div class="cp-btns"><button type="button" class="cp-btn cp-btn-gold cp-fg-new">New number · 換一題</button><button type="button" class="cp-btn cp-fg-clear">All down · 全部放下</button></div>
    </div>
  </div>
</div>
<ul class="cp-tips rvl">{tips}</ul>'''

def _comp_guess(gs):
    return f'''<div class="cp-guess rvl" data-cp-guess>
  <div class="cp-gs-top"><p class="cp-gs-k"></p><p class="cp-gs-sc">Right on the first try · 第一次就答對 <b class="cp-gs-score">0 / 0</b></p></div>
  <div class="cp-gs-lights" role="img"></div>
  <div class="cp-gs-opts" role="group" aria-label="Choose the number · 選出這個數"></div>
  <p class="cp-gs-msg" aria-live="polite"></p>
  <div class="cp-gs-foot">
    <label class="cp-check"><input type="checkbox" data-t="values"><span>Show what each light is worth · 顯示每盞燈代表多少</span></label>
    <button type="button" class="cp-btn cp-btn-gold cp-gs-next" hidden>Next · 下一題</button>
  </div>
</div>'''

def _comp_levels(lv):
    def track(n, en, zh):
        return (f'<div class="cp-lv-track" data-levels="{n}"><p class="cp-lv-h">{en}<span class="zh">{zh}</span></p>'
                f'<div class="cp-lv-line"></div><p class="cp-lv-res" aria-live="polite"></p></div>')
    return f'''<div class="cp-levels rvl" data-cp-levels>
  <label class="cp-lv-ctl"><span>Noise · 雜訊 <b class="cp-lv-out">±8%</b></span>
    <input type="range" class="cp-lv-noise" min="0" max="60" step="1" value="8" aria-label="Noise as a percentage of the full range · 雜訊（占全幅的百分比）"></label>
  {track(10, "Ten levels of brightness, for the digits 0 to 9", "十段亮度，代表 0 到 9")}
  {track(2, "Two levels: off and on", "兩段：關和開")}
  <ul class="cp-lv-key"><li><i class="k-tick"></i>A level the sender means · 送出的那一段</li><li><i class="k-cut"></i>Border between two levels · 兩段之間的界線</li><li><i class="k-ok"></i>Read correctly · 讀對了</li><li><i class="k-bad"></i>Read wrong · 讀錯了</li></ul>
  <p class="cp-lv-msg" aria-live="polite"></p>
  <button type="button" class="cp-btn cp-lv-again">Send 60 more signals · 再送 60 個訊號</button>
  <p class="cp-lv-note">{html.escape(lv["note_en"])}<span class="zh">{html.escape(lv["note_zh"])}</span></p>
</div>'''

def comppixels_svg(size=56):
    """第二課的課程卡小圖示：一格一格的像素（蘋果的一角），右下角一個字母 A。"""
    cells = ["..gg.", ".rrg.", "rhrrr", "rrrrR", ".rrR."]
    colr = {"r": "#d62828", "R": "#961820", "h": "#ff8c82", "g": "#38a048"}
    out = []
    for y, row in enumerate(cells):
        for x, c in enumerate(row):
            if c != ".":
                out.append(f'<rect x="{6 + x * 8}" y="{6 + y * 8}" width="7" height="7" rx="1" fill="{colr[c]}"/>')
    return (f'<svg class="comppixels-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">{"".join(out)}'
            '<rect x="34" y="34" width="22" height="22" rx="5" fill="#f4ecd8"/>'
            '<path d="M39.5 51 45 39l5.5 12M41.6 47h6.8" fill="none" stroke="#1b2440" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>')

_COMP_CARD["pixels"] = comppixels_svg

def render_comppixels_lab(lesson):
    """第二課：像素牆、三根柱子與八個開關（assets/js/comp-pixels.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    strip = "".join(
        f'<button type="button" data-bit="{i}" aria-pressed="false" aria-label="Switch worth {2 ** i} · 代表 {2 ** i} 的開關">'
        f'<small>{2 ** i}</small><b>0</b></button>' for i in range(7, -1, -1))
    chans = [("0", "R", "Red", "紅"), ("1", "G", "Green", "綠"), ("2", "B", "Blue", "藍")]
    rows = "".join(
        f'<div class="cp-chrow cp-chrow-{k.lower()}"><button type="button" data-chan="{i}" aria-pressed="{"true" if i == "0" else "false"}" '
        f'aria-label="Show the switches for {en.lower()} · 開關顯示{zh}色">{k}<small>{zh}</small></button>'
        f'<input type="range" min="0" max="255" step="1" value="0" data-rgb="{i}" aria-label="{en}, 0 to 255 · {zh}，0 到 255">'
        f'<b class="cp-ch-v">0</b></div>' for i, k, en, zh in chans)
    views = [("far", "Far", "遠看"), ("all", "All", "全景"), ("wall", "Close", "近看")]
    vb = "".join(f'<button type="button" data-view="{k}" aria-pressed="{"true" if k == "all" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in views)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-px-lab rvl" data-comppixels-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a wall of 256 colored squares that make a picture of an apple, three bars for the red, green, and blue of one square, and eight switches · 256 個彩色方塊拼成一顆蘋果的像素牆、代表其中一格紅綠藍的三根柱子，以及八個開關的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <div class="cp-cams" role="group" aria-label="View · 角度">{vb}</div>
      <p class="al-hint">Tap a square, a bar, or a switch · 點方塊、柱子或開關　Drag to turn · 拖曳旋轉</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The small picture, the sliders, and the switch buttons below still work, and so do the reading and the activities.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下面的小圖、滑桿和開關按鈕照樣能用，課文和活動也都能用。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">Pick a pixel · 選一個像素</p>
      <div class="cp-px-top">
        <canvas class="cp-px-map" width="192" height="192" tabindex="0" aria-label="The picture, 16 by 16 pixels. Click a square or use the arrow keys to pick a pixel · 16 × 16 像素的圖，點一格或用方向鍵選一個像素"></canvas>
        <div class="cp-px-info"><span class="cp-px-sw" aria-hidden="true"></span><p class="cp-px-pos"></p><p class="cp-px-hex"></p></div>
      </div>
      <div class="cp-chrows">{rows}</div>
      <p class="al-sky-k cp-k2">Eight switches for <span class="cp-chan-name">red</span> · <span class="cp-chan-name zh">紅</span>色的八個開關</p>
      <div class="cp-strip" role="group" aria-label="Eight switches; the rightmost is worth 1 · 八個開關，最右邊代表 1">{strip}</div>
      <p class="cp-binw"><span>The same eight bits · 同樣八個位元</span><b class="cp-bin">0000 0000</b></p>
      <dl class="cp-three">
        <div><dt>As a number · 當成數</dt><dd class="cp-as-num">0</dd></div>
        <div><dt>As a letter (ASCII) · 當成字</dt><dd class="cp-as-char"></dd></div>
        <div><dt>As a color · 當成顏色</dt><dd class="cp-as-amt"></dd></div>
      </dl>
      <p class="cp-msg" aria-live="polite"></p>
      <div class="cp-btns"><button type="button" class="cp-btn-d cp-reset">Reset the picture · 還原整張圖</button></div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <p class="cp-total">{html.escape(lab["total_en"])}<span class="zh">{html.escape(lab["total_zh"])}</span></p>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _comp_chars(ch):
    quick = "".join(f'<button type="button" class="cp-btn" data-text="{html.escape(t)}">{html.escape(t)}</button>' for t in ch["quick"])
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in ch["tips"])
    return f'''<div class="cp-chars rvl" data-cp-chars>
  <label class="cp-ch-in"><span>Type up to eight characters · 打幾個字（最多八個）</span>
    <input type="text" class="cp-ch-input" value="{html.escape(ch["start"])}" maxlength="24" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></label>
  <div class="cp-btns cp-ch-quick"><span class="cp-k">Try · 試試</span>{quick}</div>
  <div class="cp-ch-list" aria-live="polite"></div>
  <p class="cp-ch-msg"></p>
</div>
<ul class="cp-tips rvl">{tips}</ul>'''

def _comp_draw(dr):
    arts = [("heart", "Heart", "愛心"), ("smile", "Smile", "笑臉"), ("letterA", "Letter A", "字母 A")]
    ab = "".join(f'<button type="button" class="cp-btn" data-art="{k}">{en} · {zh}</button>' for k, en, zh in arts)
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in dr["tips"])
    return f'''<div class="cp-draw rvl" data-cp-draw>
  <div class="cp-dr-left">
    <div class="cp-dr-grid" role="group" aria-label="An 8 by 8 grid; tap or drag to turn squares on and off · 8 × 8 的格子，點或拖曳來塗黑或擦掉"></div>
    <div class="cp-btns">{ab}<button type="button" class="cp-btn cp-dr-inv">Invert · 反白</button><button type="button" class="cp-btn cp-dr-clear">Clear · 清空</button></div>
  </div>
  <div class="cp-dr-right">
    <p class="cp-k">Each row is one byte · 每一列是一個位元組</p>
    <ol class="cp-dr-rows"></ol>
    <p class="cp-dr-msg" aria-live="polite"></p>
  </div>
</div>
<ul class="cp-tips rvl">{tips}</ul>'''

def _comp_sound(sd):
    bits = [("1", "1 bit", "2 種高度"), ("2", "2 bits", "4 種"), ("3", "3 bits", "8 種"), ("4", "4 bits", "16 種"), ("8", "8 bits", "256 種")]
    bb = "".join(f'<button type="button" data-sbits="{k}" aria-pressed="{"true" if k == "3" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in bits)
    return f'''<div class="cp-sound rvl" data-cp-sound>
  <svg class="cp-sd-svg" viewBox="0 0 640 240" role="img" aria-label="A smooth sound wave with the measured samples drawn as steps · 一條平滑的聲波，上面疊著量到的階梯"></svg>
  <ul class="cp-lv-key"><li><i class="k-wave"></i>The real wave · 真正的波</li><li><i class="k-step"></i>What the computer keeps · 電腦記下來的</li></ul>
  <div class="cp-sd-ctl">
    <label class="cp-lv-ctl"><span>Measurements in this wave · 這個波量幾次 <b class="cp-sd-nout">16</b></span>
      <input type="range" class="cp-sd-n cp-lv-noise" min="4" max="64" step="1" value="16" aria-label="How many times to measure this wave · 這個波量幾次"></label>
    <div><p class="cp-k">Bits for each measurement · 每次用幾個位元記</p><div class="cp-seg-l" role="group" aria-label="Bits for each measurement · 每次用幾個位元記">{bb}</div></div>
  </div>
  <p class="cp-sd-list"><span>The numbers that are saved · 存下來的數</span><code class="cp-sd-nums"></code></p>
  <p class="cp-lv-msg cp-sd-msg" aria-live="polite"></p>
  <p class="cp-lv-note">{html.escape(sd["note_en"])}<span class="zh">{html.escape(sd["note_zh"])}</span></p>
</div>'''

def complogic_svg(size=56):
    """第三課的課程卡小圖示：兩個開關排成一排，接到一盞亮著的燈。"""
    return (f'<svg class="complogic-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<path d="M5 38h9M24 38h8M42 38h6" stroke="#c98a4b" stroke-width="3" stroke-linecap="round"/>'
            '<path d="M14 38 23.5 37.5M32 38 41.5 37.5" stroke="#f0c48a" stroke-width="3" stroke-linecap="round"/>'
            '<circle cx="14" cy="38" r="3" fill="#b9bec8"/><circle cx="24" cy="38" r="3" fill="#b9bec8"/><circle cx="32" cy="38" r="3" fill="#b9bec8"/><circle cx="42" cy="38" r="3" fill="#b9bec8"/>'
            '<circle cx="50" cy="24" r="12" fill="#ffd36e" opacity=".28"/><circle cx="50" cy="24" r="7" fill="#ffd36e" stroke="#fff3c9" stroke-width="1.2"/>'
            '<rect x="46.5" y="30" width="7" height="9" rx="1.5" fill="#b9bec8"/>'
            '<text x="19" y="26" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="800" fill="#7ef0e3">A</text>'
            '<text x="37" y="26" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="800" fill="#7ef0e3">B</text></svg>')

_COMP_CARD["logic"] = complogic_svg

def render_complogic_lab(lesson):
    """第三課：電池、開關與燈泡的三種接法（assets/js/comp-logic.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    gb = "".join(
        f'<button type="button" data-gate="{g["key"]}" aria-pressed="{"true" if g["key"] == "and" else "false"}">'
        f'{html.escape(g["en"])}<small>{html.escape(g["zh"])}</small></button>' for g in lab["gates"])
    rules = html.escape(json.dumps({g["key"]: {"en": g["rule_en"], "zh": g["rule_zh"]} for g in lab["gates"]}, ensure_ascii=False))
    tg = _lab_toggles([("flow", "Moving dots", "光點", True), ("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-lg-lab rvl" data-complogic-lab data-rules="{rules}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a battery, switches, and a light bulb wired three different ways: in a row, side by side, and with a seesaw switch · 電池、開關和燈泡的三種接法（排成一排、一上一下、蹺蹺板開關）的 3D 模型"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Tap a switch · 點一下開關　Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The A and B buttons and the truth table below still work, and so do the reading and the games.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下面的 A、B 按鈕和真值表照樣能用，課文和小遊戲也都能用。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">How are the switches wired? · 開關怎麼接</p>
      <div class="cp-seg cp-lg-gates" role="group" aria-label="Wiring · 接法">{gb}</div>
      <p class="cp-lg-rule"></p>
      <p class="al-sky-k cp-k2">Inputs and output · 輸入與輸出</p>
      <div class="cp-lg-io">
        <button type="button" class="cp-lg-in" data-in="a" aria-pressed="false" aria-label="Input A · 輸入 A"><small>A</small><b>0</b></button>
        <button type="button" class="cp-lg-in" data-in="b" aria-pressed="false" aria-label="Input B · 輸入 B"><small>B</small><b>0</b></button>
        <span class="cp-lg-arrow" aria-hidden="true">&rarr;</span>
        <p class="cp-lg-out" aria-live="polite"></p>
      </div>
      <p class="al-sky-k cp-k2">Truth table · 真值表</p>
      <table class="cp-lg-table"><thead></thead><tbody></tbody></table>
      <p class="cp-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Try every row · 每一列都試一次</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _comp_wire(wr):
    data = html.escape(json.dumps({p["key"]: {k: p[k] for k in ("en", "zh", "a_en", "a_zh", "b_en", "b_zh", "out_en", "out_zh")} for p in wr["puzzles"]}, ensure_ascii=False))
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in wr["tips"])
    return f'''<div class="cp-wire rvl" data-cp-wire data-puzzles="{data}">
  <div class="cp-gs-top"><p class="cp-gs-k cp-wr-k"></p><p class="cp-gs-sc">Solved · 已完成 <b class="cp-gs-score cp-wr-score">0 / 6</b></p></div>
  <p class="cp-wr-q"></p>
  <div class="cp-wr-build">
    <div class="cp-wr-ins">
      <div class="cp-wr-in"><span class="cp-wr-lab cp-wr-a"></span><button type="button" class="cp-wr-not" data-not="a" aria-pressed="false" aria-label="Put NOT in front of A · 在 A 前面加 NOT">NOT<small>不是</small></button></div>
      <div class="cp-wr-in"><span class="cp-wr-lab cp-wr-b"></span><button type="button" class="cp-wr-not" data-not="b" aria-pressed="false" aria-label="Put NOT in front of B · 在 B 前面加 NOT">NOT<small>不是</small></button></div>
    </div>
    <div class="cp-wr-gate" role="group" aria-label="Choose a gate · 選一種閘"><button type="button" data-wgate="and" aria-pressed="true">AND<small>而且</small></button><button type="button" data-wgate="or" aria-pressed="false">OR<small>或者</small></button></div>
    <div class="cp-wr-outw"><span class="cp-wr-bulb" aria-hidden="true"></span><span class="cp-wr-out"></span></div>
  </div>
  <p class="cp-wr-exprw">Your circuit · 你接的電路 <code class="cp-wr-expr"></code></p>
  <table class="cp-wr-table"><thead><tr><th>A</th><th>B</th><th>Wanted<small>要的</small></th><th>Yours<small>你接的</small></th><th></th></tr></thead><tbody></tbody></table>
  <p class="cp-wr-msg" aria-live="polite"></p>
  <button type="button" class="cp-btn cp-btn-gold cp-wr-next" hidden>Next puzzle · 下一題</button>
</div>
<ul class="cp-tips rvl">{tips}</ul>'''

def _comp_lquiz(lq):
    return f'''<div class="cp-guess cp-lquiz rvl" data-cp-lquiz>
  <div class="cp-gs-top"><p class="cp-gs-k"></p><p class="cp-gs-sc">Right on the first try · 第一次就答對 <b class="cp-gs-score">0 / 0</b></p></div>
  <p class="cp-lq-q"></p>
  <div class="cp-gs-opts cp-lq-opts" role="group" aria-label="Choose 0 or 1 · 選 0 或 1"></div>
  <p class="cp-gs-msg" aria-live="polite"></p>
  <div class="cp-gs-foot"><span></span><button type="button" class="cp-btn cp-btn-gold cp-gs-next" hidden>Next · 下一題</button></div>
</div>'''

def compadder_svg(size=56):
    """第四課的課程卡小圖示：兩排小燈相加，下面一排是答案（0101 + 0011 = 1000）。"""
    return (f'<svg class="compadder-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            f'{_comp_lamps("0101", 20, 11, 10.5, 3.6)}{_comp_lamps("0011", 20, 25, 10.5, 3.6)}'
            '<path d="M7 25h7M10.5 21.5v7" stroke="#7ef0e3" stroke-width="2.6" stroke-linecap="round"/>'
            '<path d="M6 35.5h49" stroke="#c9d3e8" stroke-width="2" stroke-linecap="round"/>'
            f'{_comp_lamps("1000", 20, 47, 10.5, 3.6)}</svg>')

_COMP_CARD["adder"] = compadder_svg

def render_compadder_lab(lesson):
    """第四課：兩排開關、四個全加器方塊、一排答案（assets/js/comp-adder.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    def strip(row, en, zh):
        bs = "".join(
            f'<button type="button" data-bit="{i}" aria-pressed="false" aria-label="{en}, switch worth {2 ** i} · {zh}，代表 {2 ** i} 的開關">'
            f'<small>{2 ** i}</small><b>0</b></button>' for i in range(3, -1, -1))
        return f'<div class="cp-strip cp-strip4" data-row="{row}" role="group" aria-label="{en} · {zh}">{bs}</div>'
    speeds = [("0.5", "½×", "慢"), ("1", "1×", "原速"), ("3", "3×", "快")]
    sb = "".join(f'<button type="button" data-speed="{k}" aria-pressed="{"true" if k == "1" else "false"}">{en}<small>{zh}</small></button>' for k, en, zh in speeds)
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-ad-lab rvl" data-compadder-lab>
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a four-bit adder: two rows of four switches with lights for the numbers A and B, four adder blocks, and a row of five lights for the answer · 四位元加法器的 3D 模型：兩排各四個開關與燈（A 和 B）、四個加法方塊，以及一排五盞燈的答案"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Tap a switch in the two back rows · 點後面兩排的開關　Drag to turn · 拖曳旋轉</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The switch buttons and the step-by-step sum below still work, and so do the reading and the games.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下面的開關按鈕和一位一位的直式照樣能用，課文和小遊戲也都能用。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">The sum · 直式</p>
      <table class="cp-ad-sumt" aria-live="polite"><tbody>
        <tr><th scope="row">A</th><td class="cp-ad-a"></td><td class="cp-ad-ad"></td></tr>
        <tr><th scope="row">+ B</th><td class="cp-ad-b"></td><td class="cp-ad-bd"></td></tr>
        <tr class="cp-ad-line"><th scope="row">=</th><td class="cp-ad-s"></td><td class="cp-ad-sd"></td></tr>
      </tbody></table>
      <p class="al-sky-k cp-k2">A · 上面的數</p>
      {strip("a", "Number A", "A")}
      <p class="al-sky-k cp-k2">B · 下面的數</p>
      {strip("b", "Number B", "B")}
      <p class="cp-ad-col"></p>
      <div class="cp-btns">
        <button type="button" class="cp-btn-d cp-step">One column · 算一位</button>
        <button type="button" class="cp-btn-d cp-reset">Reset · 歸零</button>
      </div>
      <p class="cp-msg" aria-live="polite"></p>
      <p class="al-sky-k cp-k2">Speed · 速度</p>
      <div class="cp-seg" role="group" aria-label="Speed · 速度">{sb}</div>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Watch it add · 看它怎麼加</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _comp_half(hf):
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in hf["tips"])
    return f'''<div class="cp-half rvl" data-cp-half>
  <div class="cp-hf-left">
    <div class="cp-seg-l cp-hf-modes" role="group" aria-label="Half adder or full adder · 半加器或全加器">
      <button type="button" data-hmode="half" aria-pressed="true">Half adder<small>半加器：兩個輸入</small></button>
      <button type="button" data-hmode="full" aria-pressed="false">Full adder<small>全加器：三個輸入</small></button>
    </div>
    <div class="cp-hf-ins">
      <button type="button" class="cp-hf-in" data-hin="a" aria-pressed="true" aria-label="Input A · 輸入 A"><small>A</small><b>1</b></button>
      <button type="button" class="cp-hf-in" data-hin="b" aria-pressed="true" aria-label="Input B · 輸入 B"><small>B</small><b>1</b></button>
      <button type="button" class="cp-hf-in cp-hf-cin" data-hin="c" aria-pressed="false" aria-label="Carry in · 進來的進位" hidden><small>Carry in<br>進來的進位</small><b>0</b></button>
    </div>
    <p class="cp-hf-eq" aria-live="polite"></p>
    <div class="cp-hf-outs">
      <p><span>Carry · 進位</span><b class="cp-hf-carry">0</b><code class="cp-hf-gc"></code></p>
      <p><span>Sum · 和</span><b class="cp-hf-sum">0</b><code class="cp-hf-gs"></code></p>
    </div>
  </div>
  <div class="cp-hf-right">
    <table class="cp-hf-table"><thead></thead><tbody></tbody></table>
    <p class="cp-hf-note"></p>
  </div>
</div>
<ul class="cp-tips rvl">{tips}</ul>'''

def _comp_addq(aq):
    return f'''<div class="cp-guess cp-addq rvl" data-cp-addq>
  <div class="cp-gs-top"><p class="cp-gs-k"></p><p class="cp-gs-sc">Right on the first try · 第一次就答對 <b class="cp-gs-score">0 / 0</b></p></div>
  <div class="cp-aq-grid" aria-hidden="true"></div>
  <p class="cp-aq-q" aria-live="polite"></p>
  <div class="cp-gs-opts" role="group" aria-label="Choose what to write and what to carry · 選要寫什麼、進什麼"></div>
  <p class="cp-gs-msg" aria-live="polite"></p>
  <div class="cp-gs-foot"><span></span><button type="button" class="cp-btn cp-btn-gold cp-gs-next" hidden>Next problem · 下一題</button></div>
</div>'''

def comppc_svg(size=56):
    """第五課的課程卡小圖示：一台打開的主機，裡面一塊板子、一顆晶片、兩條記憶體、一張卡。"""
    return (f'<svg class="comppc-svg" viewBox="0 0 60 60" width="{size}" height="{size}" aria-hidden="true">'
            '<rect x="9" y="5" width="42" height="50" rx="4" fill="#1b2440" stroke="#9fb0cf" stroke-width="2"/>'
            '<rect x="15" y="11" width="30" height="27" rx="2" fill="#14503f"/>'
            '<rect x="19" y="15" width="10" height="10" rx="1.5" fill="#c9ced8"/><rect x="21.5" y="17.5" width="5" height="5" fill="#ffd36e"/>'
            '<rect x="33" y="14" width="2.6" height="13" fill="#7ee0aa"/><rect x="38" y="14" width="2.6" height="13" fill="#7ee0aa"/>'
            '<rect x="17" y="30" width="24" height="5" rx="1" fill="#c7a6ff"/>'
            '<rect x="15" y="42" width="16" height="9" rx="1.5" fill="#ff8a8a"/><circle cx="23" cy="46.5" r="2.6" fill="#1b2440"/></svg>')

_COMP_CARD["pc"] = comppc_svg

def render_comppc_lab(lesson):
    """第五課：可以拆開的主機（assets/js/comp-pc.js 綁這裡的 class；全部自繪示意）。"""
    lab = lesson["lab"]
    pb = "".join(
        f'<button type="button" data-part="{p["key"]}" aria-pressed="false">{html.escape(p["short_en"])}<small>{html.escape(p["short_zh"])}</small></button>'
        for p in lab["parts"])
    parts = html.escape(json.dumps({p["key"]: {k: p[k] for k in ("short_en", "short_zh", "en", "zh", "job_en", "job_zh", "note_en", "note_zh")} for p in lab["parts"]}, ensure_ascii=False))
    boot = html.escape(json.dumps([{"en": b["en"], "zh": b["zh"]} for b in lab["boot"]], ensure_ascii=False))
    steps = "".join(f'<li tabindex="0" role="button">{html.escape(b["short_en"])}<small>{html.escape(b["short_zh"])}</small></li>' for b in lab["boot"])
    tg = _lab_toggles([("labels", "Labels", "標示", True)])
    return f'''<div class="astro-lab cp-lab cp-pc-lab rvl" data-comppc-lab data-parts="{parts}" data-boot="{boot}">
  <div class="al-stage">
    <div class="al-space">
      <canvas class="al-space-cv" aria-label="3D model of a desktop computer with its side panel off: a motherboard, a processor under its cooler, memory, a solid-state drive, a graphics card, and a power supply, next to a screen · 拿掉側板的桌上型電腦 3D 模型：主機板、散熱器底下的處理器、記憶體、固態硬碟、顯示卡和電源供應器，旁邊有一台螢幕"></canvas>
      <div class="al-labels" aria-hidden="true"></div>
      <p class="al-hint">Tap a part · 點一個零件　Drag to turn · 拖曳旋轉　Scroll or pinch to zoom · 滾輪／雙指縮放</p>
      <button type="button" class="al-home" title="Reset view · 重設視角" aria-label="Reset view · 重設視角">&#8634;</button>
      <p class="al-nogl-msg">This 3D model needs WebGL, which this browser does not support. The list of parts and the four power-on steps below still work, and so do the reading and the games.<br><span class="zh">這個瀏覽器不支援 WebGL，無法顯示 3D 模型；下面的零件清單和開機四步驟照樣能用，課文和小遊戲也都能用。</span></p>
    </div>
    <aside class="al-sky cp-aside">
      <p class="al-sky-k">Parts · 零件</p>
      <div class="cp-pc-parts" role="group" aria-label="Parts · 零件">{pb}</div>
      <div class="cp-pc-card" aria-live="polite">
        <h3 class="cp-pc-name"></h3>
        <p class="cp-pc-job"></p>
        <p class="cp-pc-note"></p>
      </div>
      <label class="cp-pc-sl"><span>Pull the parts out · 把零件拉出來</span>
        <input type="range" class="cp-pc-explode" min="0" max="100" step="1" value="0" aria-label="Pull the parts out, from assembled to taken apart · 把零件拉出來（從裝好到拆開）"></label>
      <p class="al-sky-k cp-k2">After you press the power button · 按下電源之後</p>
      <ol class="cp-pc-steps">{steps}</ol>
      <p class="cp-msg" aria-live="polite"></p>
    </aside>
  </div>
  <div class="al-controls">
    <div class="al-row al-row-main">
      <button type="button" class="al-play" aria-pressed="false"><span class="al-play-i" aria-hidden="true"></span><span class="al-play-t">Press the power button · 按下電源</span></button>
      <div class="al-row al-toggles">{tg}</div>
    </div>
  </div>
  {_lab_foot(lab)}
  <p class="cp-credit">{lab["credit_html"]}</p>
</div>'''

def _comp_jobs(jb, lesson):
    names = {p["key"]: {"en": p["short_en"], "zh": p["short_zh"]} for p in lesson["lab"]["parts"]}
    tasks = html.escape(json.dumps(jb["tasks"], ensure_ascii=False))
    return f'''<div class="cp-guess cp-jobs rvl" data-cp-jobs data-tasks="{tasks}" data-names="{html.escape(json.dumps(names, ensure_ascii=False))}">
  <div class="cp-gs-top"><p class="cp-gs-k"></p><p class="cp-gs-sc">Right on the first try · 第一次就答對 <b class="cp-gs-score">0 / 0</b></p></div>
  <p class="cp-jb-q" aria-live="polite"></p>
  <div class="cp-gs-opts cp-jb-opts" role="group" aria-label="Choose a part · 選一個零件"></div>
  <p class="cp-gs-msg" aria-live="polite"></p>
  <div class="cp-gs-foot"><span></span><button type="button" class="cp-btn cp-btn-gold cp-gs-next" hidden>Next · 下一題</button></div>
</div>'''

def _comp_fits(ft):
    drives = [("256", "256 GB"), ("512", "512 GB"), ("1000", "1 TB"), ("2000", "2 TB")]
    db = "".join(f'<button type="button" data-drive="{k}" aria-pressed="{"true" if k == "512" else "false"}">{t}</button>' for k, t in drives)
    ib = "".join(f'<button type="button" data-item="{i["key"]}" aria-pressed="{"true" if i["key"] == "photo" else "false"}">{html.escape(i["btn_en"])}<small>{html.escape(i["btn_zh"])}</small></button>' for i in ft["items"])
    items = html.escape(json.dumps({i["key"]: {k: i[k] for k in ("en", "zh", "size_en", "size_zh")} for i in ft["items"]}, ensure_ascii=False))
    tips = "".join(f'<li>{html.escape(t["en"])}<span class="zh">{html.escape(t["zh"])}</span></li>' for t in ft["tips"])
    return f'''<div class="cp-fits rvl" data-cp-fits data-items="{items}">
  <div class="cp-ft-ctl">
    <div><p class="cp-k">Size of the drive · 固態硬碟的大小</p><div class="cp-seg-l cp-ft-drives" role="group" aria-label="Size of the drive · 固態硬碟的大小">{db}</div></div>
    <div><p class="cp-k">What to store · 要放什麼</p><div class="cp-seg-l cp-ft-items" role="group" aria-label="What to store · 要放什麼">{ib}</div></div>
  </div>
  <dl class="cp-ft-nums">
    <div><dt>Bytes · 位元組</dt><dd class="cp-ft-bytes"></dd></div>
    <div><dt>Bits (the switches of Lesson 1) · 位元（第一課的開關）</dt><dd class="cp-ft-bits"></dd></div>
  </dl>
  <p class="cp-ft-big" aria-live="polite"><span>It holds · 裝得下</span><b class="cp-ft-count"></b><span class="cp-ft-what"></span></p>
  <p class="cp-lv-msg cp-ft-msg"></p>
  <p class="cp-lv-note">{html.escape(ft["note_en"])} <b class="cp-ft-gib"></b> {html.escape(ft["note2_en"])}<span class="zh">{html.escape(ft["note_zh"])} <b class="cp-ft-gib"></b> {html.escape(ft["note2_zh"])}</span></p>
</div>
<ul class="cp-tips rvl">{tips}</ul>'''

def _comp_flat():
    return [(ui, u, l) for ui, u in enumerate(COMP["units"]) for l in u["lessons"]]

def _comp_nav(slug):
    flat = _comp_flat()
    i = next(n for n, (_, _, l) in enumerate(flat) if l["slug"] == slug)
    def side(item, dirn, label):
        if not item:
            return '<span class="pm-nav-x"></span>'
        l = item[2]
        arrow = "&larr;" if dirn == "prev" else "&rarr;"
        return (f'<a class="pm-nav-s pm-nav-{dirn}" href="{COMP_BASE}{l["slug"]}/">'
                f'<span class="pm-nav-k">{arrow} {label}</span>'
                f'<span class="pm-nav-t">{html.escape(l["title"])}</span></a>')
    prev = flat[i - 1] if i > 0 else None
    nxt = flat[i + 1] if i < len(flat) - 1 else None
    return (f'<nav class="pm-nav rvl">{side(prev, "prev", "上一課 · Previous")}'
            f'<a class="pm-nav-hub" href="{COMP_BASE}">&#9776; 回電腦概論 · All Lessons</a>'
            f'{side(nxt, "next", "下一課 · Next")}</nav>')

def build_comp_lesson(ui, unit, lesson):
    path = f'{COMP_BASE}{lesson["slug"]}/'
    unit_dict = {k: lesson[k] for k in ("title", "paras", "paras_zh", "questions", "answers", "vocab", "quiz")}
    unit_dict["unit"] = lesson["n"]
    reading_html = render_basic_unit(1, unit_dict, level="comp", audio_rel="", pdf_rel="")
    lab = lesson["lab"]
    kind = lab["kind"]
    lab_html = {"bits": render_compbits_lab, "pixels": render_comppixels_lab, "logic": render_complogic_lab, "adder": render_compadder_lab, "pc": render_comppc_lab}[kind](lesson)

    def sec(key, fn):
        d = lesson[key]
        return (key, d["eyebrow"], d["en"], d["zh"], fn(d), _bi(d["lead_en"], d["lead_zh"], cls="lead rvl d2"))
    secs = []
    if lesson.get("parts"):
        cards = "".join(
            f'<article class="ph-card cp-part rvl">'
            f'<div class="ph-ico cp-ico" aria-hidden="true">{f'<canvas class="cp-mini" data-bits="{pt["bits"]}"></canvas>' if pt.get("bits") else pt["icon"]}</div>'
            f'<h3>{html.escape(pt["en"])}<span class="zh">{html.escape(pt["zh"])}</span></h3>'
            f'<p class="ph-meta"><span>{html.escape(pt["meta_en"])} · {html.escape(pt["meta_zh"])}</span></p>'
            f'<p class="ph-when">{html.escape(pt["text_en"])}<br><span class="zh">{html.escape(pt["text_zh"])}</span></p>'
            f'<button type="button" class="ph-go" data-lab-demo="{pt["demo"]}">Watch it in the model · 在模型中看 <i>&uarr;</i></button>'
            f'</article>' for pt in lesson["parts"])
        ph = lesson["parts_head"]
        secs.append(("parts", ph["eyebrow"], ph["en"], ph["zh"], f'<div class="ph-grid stagger">{cards}</div>',
                     _bi(lesson["parts_note_en"], lesson["parts_note_zh"], cls="lead rvl d2")))
    if lesson.get("fingers"): secs.append(sec("fingers", _comp_fingers))
    if lesson.get("guess"): secs.append(sec("guess", _comp_guess))
    if lesson.get("levels"): secs.append(sec("levels", _comp_levels))
    if lesson.get("chars"): secs.append(sec("chars", _comp_chars))
    if lesson.get("draw"): secs.append(sec("draw", _comp_draw))
    if lesson.get("sound"): secs.append(sec("sound", _comp_sound))
    if lesson.get("wire"): secs.append(sec("wire", _comp_wire))
    if lesson.get("lquiz"): secs.append(sec("lquiz", _comp_lquiz))
    if lesson.get("half"): secs.append(sec("half", _comp_half))
    if lesson.get("addq"): secs.append(sec("addq", _comp_addq))
    if lesson.get("jobs"): secs.append(sec("jobs", lambda d: _comp_jobs(d, lesson)))
    if lesson.get("fits"): secs.append(sec("fits", _comp_fits))
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
    th = lesson["tricks_head"]
    secs.append(("tricks", "Remember It · 記憶口訣", th["en"], th["zh"], _sci_tricks(lesson), ""))
    if lesson.get("safety"):
        sh = lesson["safety_head"]
        items = "".join(f'<li class="rvl">{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></li>' for s in lesson["safety"])
        secs.append(("safety", sh["eyebrow"], sh["en"], sh["zh"], f'<ul class="cp-safety">{items}</ul>', ""))
    acts = lesson.get("activities") or ([lesson["activity"]] if lesson.get("activity") else [])
    for n, act in enumerate(acts, 1):
        eb = "Classroom Activity · 課堂活動" if len(acts) == 1 else f"Classroom Activity {n} · 課堂活動{_astro_cn(n)}"
        secs.append((f"activity{'' if n == 1 else n}", eb, act["title_en"], act["title_zh"], _astro_activity(act), ""))
    if lesson.get("links"):
        def link(x):
            body = (f'<span class="cp-link-ic" aria-hidden="true">{x["icon"]}</span>'
                    f'<span class="cp-link-b"><span class="cp-link-k">{html.escape(x["k_en"])} · {html.escape(x["k_zh"])}</span>'
                    f'<b>{html.escape(x["en"])}</b><span class="zh cp-link-zh">{html.escape(x["zh"])}</span>'
                    f'<span class="cp-link-n">{html.escape(x["note_en"])}<span class="zh">{html.escape(x["note_zh"])}</span></span>')
            if x.get("soon"):
                return f'<div class="cp-link cp-link-soon rvl">{body}<span class="cp-link-go">Coming soon · 製作中</span></span></div>'
            return f'<a class="cp-link rvl" href="{html.escape(x["href"])}">{body}<span class="cp-link-go">Go to the lesson · 前往這一課 <i>&rarr;</i></span></span></a>'
        lh = lesson.get("links_head") or {"eyebrow": "Go Further · 延伸閱讀", "en": "Read more", "zh": "延伸閱讀"}
        secs.append(("more", lh["eyebrow"], lh["en"], lh["zh"], f'<div class="cp-links">{"".join(link(x) for x in lesson["links"])}</div>', ""))
    sec_html = "\n".join(_astro_sec(sid, k % 2 == 1, eb, en, zh, inner, lead)
                         for k, (sid, eb, en, zh, inner, lead) in enumerate(secs))
    src_html = ""
    if lesson.get("sources"):
        rows = "".join(
            f'<li><span>{html.escape(s["en"])}<span class="zh">{html.escape(s["zh"])}</span></span>'
            f'<a href="{html.escape(s["url"])}" target="_blank" rel="noopener">{html.escape(s["src"])} &#8599;</a></li>'
            for s in lesson["sources"])
        src_html = (f'<div class="cp-sources rvl"><p class="sub-head">Sources · 資料出處</p>'
                    f'<p class="muted">{html.escape(lesson["sources_note_en"])} · {html.escape(lesson["sources_note_zh"])}</p>'
                    f'<ol>{rows}</ol></div>')

    eyebrow = (f'How Computers Work · Unit {ui + 1} · Lesson {lesson["n"]} · '
               f'電腦概論 單元{_htw_cn(ui + 1)} 第{_htw_cn(lesson["n"])}課')
    lead = f'{html.escape(lesson["blurb_en"])}<br><span class="muted">{html.escape(lesson["blurb_zh"])}</span>'
    body = f'''
{page_hero(eyebrow, f'{html.escape(lesson["title"])}<span class="h1-zh">{html.escape(lesson["title_zh"])}</span>', lead, back=(COMP_BASE, "回電腦概論 · All Lessons"))}
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
{_comp_nav(lesson["slug"])}
</div></section>
'''
    say_slug = f'computers-{lesson["slug"]}'   # tools/gen_audio.py 以路徑末兩段命名
    has_clips = os.path.exists(os.path.join(ROOT, "assets/data/say", say_slug + ".json"))
    write(path, layout(path, f'{lesson["title"]} · {lesson["title_zh"]}',
          f'{lesson["blurb_en"]} {lesson["blurb_zh"]}', body, "resources",
          say_manifest=say_slug if has_clips else None, extra_head=_comp_head(_COMP_JS[kind])))
    return path

def build_comp_hub():
    # 照書法：單元導覽＋每個單元一段橫向課程卡；做好的課可點，planned 是「製作中」卡。
    def icon(l):
        return _COMP_CARD[l["card"]](60) if l.get("card") in _COMP_CARD else l["icon"]
    unit_sections, nav = [], []
    done = sum(len(u["lessons"]) for u in COMP["units"])
    total = done + sum(len(u.get("planned", [])) for u in COMP["units"])
    for idx, u in enumerate(COMP["units"]):
        rows = []
        for l in u["lessons"]:
            rows.append((l["n"],
                f'<a class="lc-row rvl" href="{COMP_BASE}{l["slug"]}/">'
                f'<span class="lc-ico cp-lc-ico" aria-hidden="true">{icon(l)}</span>'
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
    intro_html = "".join(_bi(p["en"], p["zh"]) for p in COMP["intro"])
    intro_html += _bi(f"{done} of {total} lessons {"is" if done == 1 else "are"} ready so far; more are on the way.",
                      f"目前完成 {done} 課（共規劃 {total} 課），持續增加中。", cls="cp-progress")
    lead = f'{html.escape(COMP["lead_en"])}<br><span class="muted">{html.escape(COMP["lead_zh"])}</span>'
    body = f'''
{page_hero(COMP["eyebrow"], f'{COMP["title_en"]} <span class="h1-zh">{COMP["title_zh"]}</span>', lead, back=("/resources/reading/", "回閱讀與經典"))}
<section class="section"><div class="wrap">
  <div class="prose wide rvl cp-intro"><span class="cp-intro-ic" aria-hidden="true">{comphub_svg(76)}</span>{intro_html}</div>
</div></section>
{unit_nav}
{"".join(unit_sections)}
'''
    write(COMP_BASE, layout(COMP_BASE, f'{COMP["title_en"]} · {COMP["title_zh"]}',
          f'{COMP["lead_en"]} {COMP["lead_zh"]}', body, "resources", extra_head=_comp_head() + _lc_head()))
    return COMP_BASE


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
    if EARTH:
        paths.append(build_earth_hub())
        for _ui, _u in enumerate(EARTH["units"]):
            for _l in _u["lessons"]: paths.append(build_earth_lesson(_ui, _u, _l))
    if CAL:
        paths.append(build_cal_hub())
        for _ui, _u in enumerate(CAL["units"]):
            for _l in _u["lessons"]: paths.append(build_cal_lesson(_ui, _u, _l))
    if COMP:
        paths.append(build_comp_hub())
        for _ui, _u in enumerate(COMP["units"]):
            for _l in _u["lessons"]: paths.append(build_comp_lesson(_ui, _u, _l))
    if PHIL:
        paths.append(build_phil_hub())
        for _l in PHIL["lessons"]: paths.append(build_phil_lesson(_l))
        for _p in PHIL["philosophers"]: paths.append(build_phil_person(_p))
        for _d in PHIL.get("dharma", []): paths.append(build_phil_dharma(_d))
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
