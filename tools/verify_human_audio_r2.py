#!/usr/bin/env python3
"""Verify the R2 backup of the human booklet recordings.

HEAD every human/<tag>/<file> key on the public r2.dev URL and compare
Content-Length to the GitHub release asset size (the source of truth, fetched
live via `gh api`). Note: r2.dev returns 403 to the default Python-urllib
User-Agent, hence the explicit UA below."""
import concurrent.futures, sys, urllib.parse, urllib.request
BASE = "https://pub-53f20fadeae54598a39a22eb35326575.r2.dev/"
TAGS = ["audio-everyday","basic-audio","intermediate-audio","advanced-audio","conversation-audio","description-audio"]
expected = {}
for tag in TAGS:
    import json, subprocess
    assets = json.loads(subprocess.run(["gh","api",f"repos/lukelin7429/twrses/releases/tags/{tag}","--jq",".assets"],capture_output=True,text=True,check=True).stdout)
    for a in assets:
        expected[f"human/{tag}/{a['name']}"] = int(a["size"])

def head(key):
    url = BASE + urllib.parse.quote(key)
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0 (twrses-verify)"})
        with urllib.request.urlopen(req, timeout=30) as r:
            return key, r.status, int(r.headers.get("Content-Length") or -1)
    except urllib.error.HTTPError as e:
        return key, e.code, -1
    except Exception as e:
        return key, -1, -1

bad = []
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
    for key, status, length in ex.map(head, sorted(expected)):
        if status != 200 or length != expected[key]:
            bad.append((key, status, length, expected[key]))
print(f"checked {len(expected)} keys on R2; mismatches/missing: {len(bad)}")
for b in bad[:20]: print("  ", b)
sys.exit(1 if bad else 0)
