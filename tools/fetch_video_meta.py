#!/usr/bin/env python3
"""Fetch YouTube metadata (title, duration, upload date) for every video used
on the site, caching into data/video_meta.json. Idempotent: already-cached IDs
are skipped, so re-runs only fill gaps. Dead/private videos are marked so the
build can hide them instead of rendering broken thumbnails.

Usage:
  python3 tools/fetch_video_meta.py            # all site videos
  python3 tools/fetch_video_meta.py PATH ...   # only IDs under given crawl paths
"""
import json, os, subprocess, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CRAWL = json.load(open(os.path.join(ROOT, "data", "crawl.json"), encoding="utf-8"))
BY_PATH = {p["path"]: p for p in CRAWL}
META_PATH = os.path.join(ROOT, "data", "video_meta.json")

def load_cache():
    if os.path.exists(META_PATH):
        return json.load(open(META_PATH, encoding="utf-8"))
    return {}

def save_cache(cache):
    json.dump(cache, open(META_PATH, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1, sort_keys=True)

def collect_ids(paths=None):
    ids = []
    seen = set()
    src = (BY_PATH.get(p, {}) for p in paths) if paths else CRAWL
    for rec in src:
        for v in rec.get("youtube", []):
            if v not in seen:
                seen.add(v); ids.append(v)
    return ids

def fetch_one(vid):
    """Return dict via yt-dlp; on failure mark as dead."""
    url = f"https://www.youtube.com/watch?v={vid}"
    try:
        out = subprocess.run(
            ["yt-dlp", "--skip-download", "--no-warnings", "--socket-timeout", "20",
             "--print", "%(title)s\t%(duration)s\t%(upload_date)s", url],
            capture_output=True, text=True, timeout=60)
    except subprocess.TimeoutExpired:
        return {"dead": True, "reason": "timeout"}
    if out.returncode != 0:
        err = (out.stderr or "").strip().splitlines()
        reason = err[-1][:200] if err else "error"
        return {"dead": True, "reason": reason}
    line = out.stdout.strip().splitlines()
    if not line:
        return {"dead": True, "reason": "empty"}
    parts = line[0].split("\t")
    title = parts[0].strip()
    dur = parts[1].strip() if len(parts) > 1 else ""
    date = parts[2].strip() if len(parts) > 2 else ""
    rec = {"title": title}
    try:
        rec["duration"] = int(float(dur))
    except (ValueError, TypeError):
        pass
    if date and date != "NA" and len(date) == 8:
        rec["date"] = date  # YYYYMMDD
    return rec

def main():
    paths = sys.argv[1:] or None
    ids = collect_ids(paths)
    cache = load_cache()
    todo = [v for v in ids if v not in cache]
    print(f"{len(ids)} ids in scope, {len(todo)} to fetch, {len(ids)-len(todo)} cached", flush=True)
    for i, vid in enumerate(todo, 1):
        cache[vid] = fetch_one(vid)
        tag = "DEAD" if cache[vid].get("dead") else cache[vid].get("title", "")[:50]
        print(f"[{i}/{len(todo)}] {vid}  {tag}", flush=True)
        if i % 10 == 0:
            save_cache(cache)
        time.sleep(0.3)
    save_cache(cache)
    live = sum(1 for v in cache.values() if not v.get("dead"))
    print(f"done. cache={len(cache)} live={live} dead={len(cache)-live}", flush=True)

if __name__ == "__main__":
    main()
