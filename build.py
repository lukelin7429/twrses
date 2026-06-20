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

# ----------------------------------------------------------------------
# BASE: URL prefix for internal links.
#   ""         → custom domain (www.twrses.org), absolute paths from root
#   "/twrses"  → GitHub project page lukelin7429.github.io/twrses/
# Switch to "" and rebuild when DNS points twrses.org at GitHub Pages.
# ----------------------------------------------------------------------
BASE = "/twrses"
ROOT_URL = f"https://lukelin7429.github.io{BASE}" if BASE else "https://www.twrses.org"

SITE = {
    "name": "彰化縣人師教育協會",
    "name_en": "My Culture Connect",
    "domain": "www.twrses.org",
    "founded": "民國 98 年（2009）",
    "slogan_en": "Learn from yesterday, live for today, and hope for tomorrow.",
    "email": "lukelin7429@gmail.com",
    "email2": "luke@mycultureconnect.org",
    "line": "luke7429",
    "addr": "彰化縣北斗鎮文苑路一段 136 號（人師北斗攝影棚）",
    "fb": "https://www.facebook.com/renshiacademy/",
    "yt": "https://www.youtube.com/channel/UC04mOhuUodVHGVX6xMSg0MQ/playlists",
    "mcc": "https://www.mycultureconnect.org/",
    "hub": "https://changhua-bilingual.org",
    "bank_name": "彰化縣人師教育協會",
    "bank_acct": "第一銀行北斗分行 464-10-011163",
}

# -------------------- navigation tree (clean URLs) --------------------
NAV = [
    {"label": "首頁", "href": "/", "key": "home"},
    {"label": "認識人師", "href": "/about/", "key": "about"},
    {"label": "偏鄉英語教育", "href": "/rural-schools/", "key": "rural", "children": [
        {"label": "人師英語學院", "href": "/rural-schools/academy/"},
        {"label": "Practicum 線上課程", "href": "/rural-schools/practicum/"},
        {"label": "上課須知", "href": "/rural-schools/guidelines/"},
    ]},
    {"label": "英語學習資源", "href": "/resources/", "key": "resources", "children": [
        {"label": "人師閱讀教材", "href": "/resources/booklets/"},
        {"label": "英語學習影片", "href": "/resources/videos/"},
        {"label": "人師英語課程", "href": "/resources/classes/"},
        {"label": "Grandfather 落日餘暉", "href": "/resources/grandfather/"},
        {"label": "英語期刊", "href": "/resources/periodicals/"},
    ]},
    {"label": "人師影音專區", "href": "/media/", "key": "media", "children": [
        {"label": "麥克爺爺放眼看台灣", "href": "/media/grandpa-mike/"},
        {"label": "國際交流影片", "href": "/media/exchange/"},
        {"label": "人師英語新聞", "href": "/media/news-videos/"},
        {"label": "Enactus 英語課程", "href": "/media/enactus/"},
        {"label": "人師教育廣場", "href": "/media/talks/"},
        {"label": "人物專訪影片", "href": "/media/interviews/"},
    ]},
    {"label": "最新消息", "href": "/news/", "key": "news"},
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
      <span class="mark">師</span>
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
        <li><a href="/news/">最新消息</a></li>
      </ul>
    </div>
    <div>
      <h4>連結</h4>
      <ul class="foot-list">
        <li><a href="{SITE["fb"]}" target="_blank" rel="noopener">人師粉絲專頁</a></li>
        <li><a href="{SITE["yt"]}" target="_blank" rel="noopener">人師影音頻道</a></li>
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
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/motion.css">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
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
<script src="/assets/js/main.js"></script>
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

def video_grid(ids, limit=None):
    if limit:
        ids = ids[:limit]
    cards = []
    for v in ids:
        thumb = f"https://i.ytimg.com/vi/{v}/hqdefault.jpg"
        url = f"https://www.youtube.com/watch?v={v}"
        cards.append(f'''<a class="vcard" href="{url}" target="_blank" rel="noopener" data-yt="{v}">
  <span class="vthumb"><img loading="lazy" src="{thumb}" alt="影片縮圖"></span>
  <span class="vmeta"><span class="vt">▶ 觀看影片</span></span>
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
    body = f'''
<section class="hero">
  <div class="hero-bg"><span class="orb a"></span><span class="orb b"></span><span class="orb c"></span></div>
  <div class="wrap">
    <p class="eyebrow rvl">彰化縣人師教育協會 · My Culture Connect</p>
    <h1 class="rvl d1">讓偏鄉的孩子，<br>也能與世界一起學習。</h1>
    <p class="lead rvl d2">本協會由校長、老師、家長與關心教育的熱心人士組成。大家有錢出錢、有力出力，製作免費的學習教材與教學影片，並引進國外資源與彰化縣的學校交流，協助多所學校建立雙語資源網站。</p>
    <p class="slogan-en rvl d3" style="margin-top:1.2rem">{SITE["slogan_en"]}</p>
    <div class="hero-cta rvl d3">
      <a class="btn btn-primary" href="/rural-schools/academy/">免費線上英語課程</a>
      <a class="btn btn-ghost" href="/about/">認識人師</a>
    </div>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <div class="grid cols-3 stagger">
      <a class="card card-link" href="/rural-schools/">
        <span class="ico">🌱</span><h3>偏鄉英語教育</h3>
        <p>自民國 98 年起長期深耕，邀請各國英語老師透過線上教學為偏鄉學生授課。</p>
      </a>
      <a class="card card-link" href="/resources/">
        <span class="ico">📚</span><h3>免費學習資源</h3>
        <p>閱讀教材、影片教室、英語課程與期刊——數百部教學影片，免費開放自學。</p>
      </a>
      <a class="card card-link" href="/media/">
        <span class="ico">🎬</span><h3>人師影音專區</h3>
        <p>麥克爺爺放眼看台灣、國際交流、英語新聞與人物專訪，從生活學英文。</p>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap grid cols-2" style="align-items:center;gap:3rem">
    <div class="rvl">
      <p class="eyebrow">我們在做的事</p>
      <h2 class="sweep">與美國 ITA 合作，<br>外師線上一對一</h2>
      <p class="muted">從民國 109 年 4 月起，我們與美國芝加哥的國際英語教師認證機構（International TEFL Academy）合作，邀請各國英語老師透過線上教學為學生授課，讓無數學生受惠；同時也開放台灣及全世界的英語老師線上觀課，提升教學技巧。</p>
      <div class="pills" style="margin-top:1.2rem">
        <span class="pill"><b>免費</b> 一對一 / 小班</span>
        <span class="pill">英美<b>母語</b>外師</span>
        <span class="pill">各級學校<b>學生</b>適用</span>
      </div>
      <p style="margin-top:1.5rem"><a class="btn btn-gold" href="/rural-schools/practicum/">如何報名上課 →</a></p>
    </div>
    <div class="rvl d2">{donate_block()}</div>
  </div>
</section>

<section class="section band-brand">
  <div class="wrap center">
    <p class="eyebrow rvl">加入我們</p>
    <h2 class="rvl d1">竭誠歡迎關懷教育的有心人士<br>加入人師的行列</h2>
    <p class="lead rvl d2" style="margin:1rem auto 2rem;max-width:48ch">一起共創教育活力，把英語帶來的新視野、新世界，分享給每一個孩子。</p>
    <div class="hero-cta rvl d3" style="justify-content:center">
      <a class="btn btn-gold" href="mailto:{SITE['email']}">聯絡人師</a>
      <a class="btn btn-ghost" style="border-color:#fff;color:#fff" href="{SITE['hub']}" target="_blank" rel="noopener">彰化雙語資源網</a>
    </div>
  </div>
</section>
'''
    write("/", layout("/", "", "彰化縣人師教育協會（My Culture Connect）— 長期推廣偏鄉英語教育，提供免費線上外師課程與英語學習資源。", body, "home"))

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
  <div class="wrap grid cols-2" style="gap:3rem;align-items:center">
    <div class="rvl">
      <p class="eyebrow">創辦人</p>
      <h2 class="sweep">林吉祥老師</h2>
      <p class="muted">自民國 98 年協會草創至今，創辦人林吉祥老師長年義務投入偏鄉英語教育，曾獲<strong>教育部教育奉獻獎</strong>，並獲自由時報、中國時報、人間福報及美國地方報紙報導。相關專題包括 2014 萬合國小、圳寮國小網界博覽會專題，以及英文版《One Man's Dream: Luke Lin》。</p>
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

def build_rural_index():
    body = f'''
{page_hero("偏鄉英語教育", "讓資源，跨越城鄉的距離", "遠在偏鄉的孩子們因為學習資源不足，缺乏外語學習環境。本協會自民國 98 年創立以來，長期致力於推廣偏鄉英語教育，擴展學生的國際視野。")}
<section class="section">
  <div class="wrap">
    <div class="grid cols-3 stagger">
      <a class="card card-link" href="/rural-schools/academy/"><span class="ico">🎓</span><h3>人師英語學院</h3><p>2021 年起推出，ITA 認證的英美母語外師線上授課，免費開放各級學校學生報名。</p></a>
      <a class="card card-link" href="/rural-schools/practicum/"><span class="ico">💻</span><h3>Practicum 線上課程</h3><p>與 ITA、CIEE 合作的一對一與小班英語課程，常見問答與報名方式一次說明。</p></a>
      <a class="card card-link" href="/rural-schools/guidelines/"><span class="ico">📋</span><h3>上課須知</h3><p>中英對照的課堂守則，幫助學生做好準備、尊重老師、把握每一堂課。</p></a>
    </div>
    <div style="margin-top:3rem">{donate_block()}</div>
  </div>
</section>
'''
    write("/rural-schools/", layout("/rural-schools/", "偏鄉英語教育", "人師教育協會推廣偏鄉英語教育：人師英語學院、Practicum 線上課程與上課須知。", body, "rural"))

def build_academy():
    teachers = ["Michael Dishnow（共同創辦人暨資深教師）", "Shannon Braden", "Bridget Hoarty",
                "Quentin Gooch", "Xiahna Evans", "Lisa Dinning", "Angela Miley", "Eric Berman", "Emily Hogle"]
    tcards = "\n".join(f'<span class="pill">{html.escape(t)}</span>' for t in teachers)
    body = f'''
{page_hero("人師英語學院", "和外師一起，快樂學英文", "為了照顧偏鄉學習資源不足的孩子，本會於 2021 年起推出人師英語學院，提供優質的線上英語學習環境，歡迎大家報名上課。")}
<section class="section">
  <div class="wrap grid cols-2" style="gap:3rem;align-items:start">
    <div class="rvl prose">
      <h2 class="sweep">報名資訊</h2>
      <ul>
        <li><strong>師資來源</strong>：取得美國 International TEFL Academy 認證的英語老師，皆為來自英美等國家的母語人士。</li>
        <li><strong>費用</strong>：免費。</li>
        <li><strong>報名資格</strong>：各級學校學生。</li>
        <li><strong>報名方式</strong>：加入林吉祥老師 Skype ID <strong>lukelin7429</strong>，並註明學校、年級、中英文姓名。</li>
        <li><strong>上課平台</strong>：Skype / Google Meet。</li>
      </ul>
      <p><a class="btn btn-primary" href="/rural-schools/practicum/">查看常見問答 →</a></p>
    </div>
    <div class="rvl d2">{donate_block()}</div>
  </div>
</section>
<section class="section band">
  <div class="wrap">
    <p class="eyebrow rvl">師資群</p>
    <h2 class="rvl d1">來自英美的母語外師</h2>
    <div class="pills rvl d2" style="margin-top:1.2rem;gap:.7rem">{tcards}</div>
  </div>
</section>
'''
    write("/rural-schools/academy/", layout("/rural-schools/academy/", "人師英語學院", "人師英語學院 2021 年起提供免費線上英語課程，ITA 認證英美母語外師，各級學校學生可報名。", body, "rural"))

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
    ids = BY_PATH.get(crawl_path, {}).get("youtube", [])
    grid = video_grid(ids) if ids else '<p class="muted">影片整理中，敬請期待。</p>'
    count = f'<span class="pill"><b>{len(ids)}</b> 部影片</span>' if ids else ""
    body = f'''
{page_hero(eyebrow, title, lead)}
<section class="section">
  <div class="wrap">
    <div class="flex rvl" style="justify-content:space-between;margin-bottom:1.6rem">
      <div class="pills">{count}</div>
      <a class="muted" href="{SITE['yt']}" target="_blank" rel="noopener">前往 YouTube 頻道 →</a>
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

def build_resources_hub():
    hub_page("/resources/", "resources", "英語學習資源",
        "免費自學，永不停止", "Never stop learning, because life never stops teaching. — 閱讀教材、影片教室、英語課程與期刊，全部免費開放。",
        [
            ("/resources/booklets/", "📖", "人師閱讀教材", "基礎到高級閱讀、實用會話與看圖描述，循序漸進。"),
            ("/resources/videos/", "🎞️", "英語學習影片", "口說訓練、自然發音、句型分析、時事與俚語等主題影片。"),
            ("/resources/classes/", "🧑‍🏫", "人師英語課程", "文法、字根、文章結構、伊索寓言與經典名著導讀。"),
            ("/resources/grandfather/", "🌅", "Grandfather 落日餘暉", "Leon La Couvée 三十章人生智慧，中英對照。"),
            ("/resources/periodicals/", "📰", "英語期刊", "明航心鄉土情、明航雙語學園與全民英語期刊典藏。"),
            ("/media/", "🎬", "人師影音專區", "麥克爺爺、國際交流、英語新聞與人物專訪。"),
        ])

def build_videos_hub():
    children = [
        ("/resources/videos/travel/", "🗽", "一分鐘英語-美國篇", "跟著鏡頭遊覽美國，一分鐘學一個英語主題。"),
        ("/resources/videos/gept-basic/", "🗣️", "初級口說訓練", "GEPT 初級口說題型練習。"),
        ("/resources/videos/gept-intermediate/", "🎙️", "中級口說訓練", "GEPT 中級口說題型練習。"),
        ("/resources/videos/phonics/", "🔤", "自然發音", "從發音規則打好英語基礎。"),
        ("/resources/videos/sentences/", "✍️", "基礎英語造句篇", "從零開始學會造句。"),
        ("/resources/videos/one-min/", "⏱️", "一分鐘英語教室", "每天一分鐘，輕鬆學英語。"),
        ("/resources/videos/analysis/", "🧩", "英語句型分析（新）", "拆解句子結構，看懂長難句。"),
        ("/resources/videos/current-events/", "🗞️", "看時事學英文", "從新聞時事學習實用英語。"),
        ("/resources/videos/e-vision/", "📺", "彰化 E 視界英語教室", "在地製作的英語教學節目。"),
        ("/resources/videos/cien-school/", "🏫", "CIEN 校園英語", "校園情境的英語會話。"),
        ("/resources/videos/slang/", "💬", "一分鐘俚語", "道地英語俚語輕鬆學。"),
        ("/resources/videos/short/", "🎬", "英語學習短片", "精選英語學習短片。"),
    ]
    hub_page("/resources/videos/", "resources", "英語學習影片",
        "把教室，搬到螢幕上", "數百部教學影片，依主題分類，免費開放自學。", children)

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

def build_classes_hub():
    children = [
        ("/resources/classes/grammar/", "📐", "基礎文法", "從詞性到時態，打好文法地基。"),
        ("/resources/classes/sentence-analysis/", "🔍", "英語句型分析（舊）", "經典句型逐句拆解。"),
        ("/resources/classes/root/", "🌳", "字根研究", "用字根字首，記住成千上萬單字。"),
        ("/resources/classes/structure/", "🏗️", "文章結構分析", "看懂段落與文章的組織邏輯。"),
        ("/resources/classes/voa/", "📻", "VOA 美國之音課程", "用 VOA 慢速英語練聽力。"),
        ("/resources/classes/aesop/", "🦊", "伊索寓言", "從寓言故事學英語與智慧。"),
        ("/resources/classes/wisdom/", "💡", "智慧話語", "每日一句，累積英語與見識。"),
        ("/resources/classes/animal-farm/", "🐖", "動物農莊", "經典名著《Animal Farm》導讀。"),
        ("/resources/classes/stories/", "📕", "英文故事", "精選英文故事，輕鬆閱讀。"),
    ]
    hub_page("/resources/classes/", "resources", "人師英語課程",
        "有系統地，把英語學起來", "文法、字根、文章結構與經典名著——循序漸進的英語課程。", children)

CLASS_LEAVES = [
    ("/resources/classes/grammar/", "基礎文法", "從詞性到時態，打好文法地基。", "/E-resources/E-classes/grammar"),
    ("/resources/classes/sentence-analysis/", "英語句型分析（舊）", "經典句型逐句拆解。", "/E-resources/E-classes/sentence-analysis2"),
    ("/resources/classes/root/", "字根研究", "用字根字首，記住成千上萬單字。", "/E-resources/E-classes/root"),
    ("/resources/classes/structure/", "文章結構分析", "看懂段落與文章的組織邏輯。", "/E-resources/E-classes/structure"),
    ("/resources/classes/voa/", "VOA 美國之音課程", "用 VOA 慢速英語練聽力。", "/E-resources/E-classes/voa美國之音課程"),
    ("/resources/classes/aesop/", "伊索寓言", "從寓言故事學英語與智慧。", "/E-resources/E-classes/aesops-fable"),
    ("/resources/classes/wisdom/", "智慧話語", "每日一句，累積英語與見識。", "/E-resources/E-classes/words-of-wisdom"),
    ("/resources/classes/animal-farm/", "動物農莊", "經典名著《Animal Farm》導讀。", "/E-resources/E-classes/animal-farm"),
    ("/resources/classes/stories/", "英文故事", "精選英文故事，輕鬆閱讀。", "/E-resources/E-classes/stories"),
]

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
        out.append(t)
    return out

def build_grandfather():
    paras = _clean_paras("/E-resources/grandfather落日餘暉")
    # parse "第N章" + en + zh pattern
    chapters = []
    i = 0
    intro = []
    while i < len(paras):
        m = re.match(r"第(\d+)章", paras[i])
        if m:
            n = m.group(1); en = ""; zh = ""
            if i+1 < len(paras): en = paras[i+1]
            if i+2 < len(paras) and not re.match(r"第\d+章", paras[i+2]) and paras[i+2] not in ("更多英語學習資源",):
                zh = paras[i+2]; i += 3
            else:
                i += 2
            chapters.append((n, en, zh))
        else:
            if paras[i] not in ("更多英語學習資源",):
                intro.append(paras[i])
            i += 1
    rows = "\n".join(
        f'<div class="row rvl"><span class="n">{n}</span><span><span class="en">{html.escape(en)}</span>　<span class="zh">{html.escape(zh)}</span></span></div>'
        for n, en, zh in chapters)
    introhtml = "".join(f"<p>{html.escape(x)}</p>" for x in intro[:3])
    body = f'''
{page_hero("Grandfather · 落日餘暉", "三十章人生智慧", "作者 Leon E. La Couvée 的中英對照人生隨筆。欲了解更多，請參考作者網站《Don't Be A Wage Slave》。")}
<section class="section"><div class="wrap">
  <div class="prose wide rvl" style="margin-bottom:2rem">{introhtml}</div>
  <p class="eyebrow rvl">Contents 目錄</p>
  <div class="toc">{rows}</div>
</div></section>
'''
    write("/resources/grandfather/", layout("/resources/grandfather/", "Grandfather 落日餘暉", "Leon La Couvée《落日餘暉》三十章中英對照人生智慧。", body, "resources"))

def build_periodicals():
    items = [x for x in _clean_paras("/E-resources/periodicals") if x != "更多英語學習資源"]
    lis = "\n".join(f'<li><span>{html.escape(x)}</span></li>' for x in items)
    body = f'''
{page_hero("英語期刊", "翻閱，協會多年的耕耘", "明航心鄉土情、明航雙語學園與全民英語期刊（2006–2009）典藏。")}
<section class="section"><div class="wrap">
  <ul class="linklist rvl" style="--col:1">{lis}</ul>
  <p class="muted rvl" style="margin-top:1.5rem;font-size:.92rem">＊各期刊原檔以 Google Drive 保存，遷站後將逐期接上連結。</p>
</div></section>
'''
    # linklist expects <a>; convert li>span to plain list style
    body = body.replace('<ul class="linklist rvl" style="--col:1">',
                        '<ul class="linklist rvl">').replace("<li><span>", '<li><a href="#" onclick="return false">').replace("</span></li>", "</a></li>")
    write("/resources/periodicals/", layout("/resources/periodicals/", "英語期刊", "明航心鄉土情、明航雙語學園、全民英語期刊典藏（2006–2009）。", body, "resources"))

# media hub + leaves
def build_media_hub():
    hub_page("/media/", "media", "人師影音專區",
        "從生活，看見英語", "麥克爺爺放眼看台灣、國際交流、英語新聞與人物專訪——上百部影片，從真實生活學英文。",
        [
            ("/media/grandpa-mike/", "👴", "麥克爺爺放眼看台灣", "麥克爺爺用英語帶你看台灣的人情風土。"),
            ("/media/exchange/", "🌏", "國際交流影片", "與各國師生的交流剪影。"),
            ("/media/news-videos/", "📰", "人師英語新聞", "一分鐘新聞、彰化英語新聞與特別報導。"),
            ("/media/enactus/", "🤝", "Enactus 英語課程", "與杜魯門大學 Enactus 合作的英語課程。"),
            ("/media/talks/", "🎤", "人師教育廣場", "教育講座與分享。"),
            ("/media/interviews/", "🎙️", "人物專訪影片", "教育者與貴賓的人物專訪。"),
        ])

MEDIA_LEAVES = [
    ("/media/grandpa-mike/", "media", "麥克爺爺放眼看台灣", "麥克爺爺用英語帶你看台灣的人情風土。", "/RS-videos/eyes"),
    ("/media/exchange/", "media", "國際交流影片", "與各國師生的交流剪影。", "/RS-videos/exchange-videos"),
    ("/media/enactus/", "media", "Enactus 英語課程", "與杜魯門大學 Enactus 合作的英語課程。", "/RS-videos/Enactus-Truman"),
    ("/media/talks/", "media", "人師教育廣場", "教育講座與分享。", "/RS-videos/speeches"),
    ("/media/interviews/", "media", "人物專訪影片", "教育者與貴賓的人物專訪。", "/RS-videos/interviews"),
]

def build_news_videos():
    # combine 3 sub-series
    series = [
        ("一分鐘英語新聞影片", "/RS-videos/E-news/CIEN-One-Min"),
        ("彰化英語新聞影片", "/RS-videos/E-news/CIEN-news"),
        ("英語特別報導影片", "/RS-videos/E-news/CIEN-special"),
    ]
    secs = []
    for label, cp in series:
        ids = BY_PATH.get(cp, {}).get("youtube", [])
        secs.append(f'<p class="eyebrow rvl" style="margin-top:2rem">{label} · {len(ids)} 部</p>' + (video_grid(ids) if ids else ""))
    body = f'''
{page_hero("人師英語新聞", "用新聞，練出真實語感", "一分鐘英語新聞、彰化英語新聞與特別報導——學生與外師合作製作的英語新聞影片。")}
<section class="section"><div class="wrap">{''.join(secs)}</div></section>
'''
    write("/media/news-videos/", layout("/media/news-videos/", "人師英語新聞", "一分鐘英語新聞、彰化英語新聞與特別報導影片。", body, "media"))

def build_news():
    paras = _clean_paras("/news")
    # drop the repeated mission/donate boilerplate that also lives elsewhere
    boiler = {"捐款帳戶","匯款日期、姓名與地址","至 林吉祥",SITE["email"],
              "誠摯邀請您透過不定額捐款或每年1,200元，來提升偏鄉學生的英語能力，讓孩子也能在線上跟外師一起快樂學習。",
              "戶名：彰化縣人師教育協會","帳號：第一銀行北斗分行 464-10-011163",
              "我們收到匯款後會儘速寄收據給您，煩請提供",
              "遠在偏鄉的孩子們因為學習資源不足，缺乏外語學習環境。本協會自民國98年創立以來，長期致力於推廣偏鄉英語教育，擴展學生的國際視野。",
              "從109年4月起，我們與美國芝加哥的國際英語教師認證機構(International TEFL Academy)合作，邀請各國英語老師透過線上教學為學生授課，讓無數學生受惠。同時我們也開放給台灣及全世界的英語老師線上觀課，提升英語老師的教學技巧。"}
    paras = [p for p in paras if p not in boiler]
    ids = BY_PATH.get("/news", {}).get("youtube", [])
    phtml = "\n".join(f"<p>{html.escape(p)}</p>" for p in paras)
    vg = ('<p class="eyebrow rvl" style="margin-top:2rem">相關活動影片</p>' + video_grid(ids, limit=12)) if ids else ""
    body = f'''
{page_hero("最新消息", "協會的近況與活動", "")}
<section class="section"><div class="wrap prose wide rvl">{phtml}</div>
  <div class="wrap">{vg}</div>
</section>
'''
    write("/news/", layout("/news/", "最新消息", "人師教育協會最新消息、活動與得獎名單。", body, "news"))

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
    fav = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0e6b60"/><text x="32" y="44" font-size="38" text-anchor="middle" fill="#fff" font-family="PingFang TC, sans-serif" font-weight="700">師</text></svg>'''
    os.makedirs(os.path.join(ROOT, "assets", "img"), exist_ok=True)
    open(os.path.join(ROOT, "assets", "img", "favicon.svg"), "w").write(fav)

def build_sitemap(paths):
    lines = [f"{ROOT_URL}{p}" for p in paths]
    open(os.path.join(ROOT, "sitemap.txt"), "w").write("\n".join(lines) + "\n")

def main():
    paths = []
    build_static()
    build_home(); paths.append("/")
    build_about(); paths.append("/about/")
    build_rural_index(); build_academy(); build_practicum(); build_guidelines()
    paths += ["/rural-schools/","/rural-schools/academy/","/rural-schools/practicum/","/rural-schools/guidelines/"]
    build_resources_hub(); paths.append("/resources/")
    build_booklets(); paths.append("/resources/booklets/")
    for path, title, lead, cp in BOOKLET_LEAVES:
        leaf_prose(path, "resources", "人師閱讀教材", title, lead, _clean_paras(cp) or ["內容整理中。"]); paths.append(path)
    build_videos_hub(); paths.append("/resources/videos/")
    for path, title, lead, cp in VIDEO_LEAVES:
        leaf_videos(path, "resources", "英語學習影片", title, lead, cp); paths.append(path)
    build_classes_hub(); paths.append("/resources/classes/")
    for path, title, lead, cp in CLASS_LEAVES:
        ids = BY_PATH.get(cp, {}).get("youtube", [])
        if ids:
            leaf_videos(path, "resources", "人師英語課程", title, lead, cp)
        else:
            leaf_prose(path, "resources", "人師英語課程", title, lead, _clean_paras(cp) or ["內容整理中。"])
        paths.append(path)
    build_grandfather(); paths.append("/resources/grandfather/")
    build_periodicals(); paths.append("/resources/periodicals/")
    build_media_hub(); paths.append("/media/")
    for path, key, title, lead, cp in MEDIA_LEAVES:
        leaf_videos(path, key, "人師影音專區", title, lead, cp); paths.append(path)
    build_news_videos(); paths.append("/media/news-videos/")
    build_news(); paths.append("/news/")
    build_sitemap(paths)
    print(f"✅ 建置完成，共 {len(paths)} 頁")
    for p in paths: print("  ", p)

if __name__ == "__main__":
    main()
