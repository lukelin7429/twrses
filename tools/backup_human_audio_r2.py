#!/usr/bin/env python3
"""Backup copy of the HUMAN-read booklet recordings (課文朗讀／課文教學) to R2.

Copy the human-read booklet recordings (GitHub Releases mirror) into the
twrses-say-audio R2 bucket under the prefix human/<release-tag>/<filename>,
preserving the exact GitHub layout so a later AUDIO_REL switch is a pure
base-URL change. Idempotent: a done-list skips files already uploaded.

Usage:
    mkdir -p /tmp/human-audio && cd /tmp/human-audio
    for t in audio-everyday basic-audio intermediate-audio advanced-audio conversation-audio description-audio; do
        mkdir -p $t && gh release download $t -D $t --clobber
    done
    python3 tools/backup_human_audio_r2.py /tmp/human-audio
    python3 tools/verify_human_audio_r2.py      # HEAD-checks all keys vs GitHub sizes

The website still SERVES these files from GitHub Releases (see *_AUDIO_REL in
build.py); the R2 copy is a second independent copy. First full copy: 2026-08-30,
559 files / 1.44 GB, all verified byte-identical on sampling and size-identical
per key."""
import concurrent.futures, os, pathlib, subprocess, sys
S = pathlib.Path(sys.argv[1])
BUCKET = "twrses-say-audio"
WRANGLER = "/Users/hayashikisshou/Documents/Claude/repos/changhua-bilingual/worker/node_modules/.bin/wrangler"
TAGS = ["audio-everyday","basic-audio","intermediate-audio","advanced-audio","conversation-audio","description-audio"]
DONE = S / ".uploaded.txt"
done = set(DONE.read_text().split("\n")) if DONE.exists() else set()

jobs = []
for tag in TAGS:
    for name in sorted(os.listdir(S / tag)):
        if name.startswith("."): continue
        key = f"human/{tag}/{name}"
        if key not in done: jobs.append((key, S / tag / name))
print(f"{len(jobs)} to upload ({len(done)} already done)", flush=True)

def put(job):
    key, path = job
    r = subprocess.run([WRANGLER, "r2", "object", "put", f"{BUCKET}/{key}",
                        "--file", str(path), "--content-type", "audio/mpeg",
                        "--cache-control", "public, max-age=31536000, immutable", "--remote"],
                       capture_output=True, text=True)
    err = (r.stderr.strip().splitlines() or ["?"])[-1] if r.returncode else None
    return key, r.returncode == 0, err

ok = 0; failed = []
with DONE.open("a") as out, concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    for i, (key, success, err) in enumerate(ex.map(put, jobs), 1):
        if success: ok += 1; out.write(key + "\n"); out.flush()
        else: failed.append((key, err))
        if i % 25 == 0 or i == len(jobs): print(f"  {i}/{len(jobs)} ({len(failed)} failed)", flush=True)
print(f"uploaded {ok}, failed {len(failed)}")
for k, e in failed[:15]: print("  FAIL", k, e)
sys.exit(1 if failed else 0)
