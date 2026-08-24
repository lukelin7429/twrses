#!/usr/bin/env python3
"""Publish generated 🔊 clips to the twrses-say-audio R2 bucket.

audio/ is gitignored — the mp3s are NOT deployed by pushing to main. Every
manifest in assets/data/say/*.json is scanned and every hash it references
that isn't already recorded in the local upload cache (.r2_uploaded_cache.txt,
gitignored — a pure optimization, safe to delete: worst case is a slower
re-upload of everything, not a correctness issue) gets pushed to R2. Served
publicly from the bucket's r2.dev URL — see PUBLIC_BASE in assets/js/main.js.

Run this after every `python3 tools/gen_audio.py`.

    ./tools/upload_audio.sh              # upload anything missing, then verify
    ./tools/upload_audio.sh --dry-run    # list what would be uploaded

Requires: wrangler logged in (npx wrangler whoami) — this repo doesn't vendor
its own copy, so it shells out to the node_modules/.bin/wrangler installed in
the changhua-bilingual/worker project, which shares the same Cloudflare
account. Point WRANGLER at a local install instead if that ever moves.
"""
import concurrent.futures
import json
import pathlib
import subprocess
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO_DIR = REPO_ROOT / "audio" / "say"
MANIFEST_DIR = REPO_ROOT / "assets" / "data" / "say"
CACHE_FILE = REPO_ROOT / "tools" / ".r2_uploaded_cache.txt"
BUCKET = "twrses-say-audio"
PUBLIC_BASE = "https://pub-53f20fadeae54598a39a22eb35326575.r2.dev/"
WRANGLER = pathlib.Path(
    "/Users/hayashikisshou/Documents/Claude/repos/changhua-bilingual/worker/node_modules/.bin/wrangler"
)
DRY_RUN = "--dry-run" in sys.argv[1:]
CONCURRENCY = 12


def upload_one(h):
    f = AUDIO_DIR / f"{h}.mp3"
    if not f.exists():
        return h, False, f"WARNING: {f} not found locally — run gen_audio.py first"
    r = subprocess.run(
        [
            str(WRANGLER), "r2", "object", "put", f"{BUCKET}/{h}.mp3",
            "--file", str(f),
            "--content-type", "audio/mpeg",
            "--cache-control", "public, max-age=31536000, immutable",
            "--remote",
        ],
        capture_output=True, text=True,
    )
    if r.returncode != 0:
        return h, False, r.stderr.strip().splitlines()[-1] if r.stderr.strip() else "unknown error"
    return h, True, None


def main():
    if not AUDIO_DIR.is_dir():
        sys.exit(f"{AUDIO_DIR} missing — run tools/gen_audio.py first")
    manifests = sorted(MANIFEST_DIR.glob("*.json"))
    if not manifests:
        sys.exit(f"no manifests in {MANIFEST_DIR}")

    all_hashes = set()
    for man in manifests:
        data = json.loads(man.read_text(encoding="utf-8"))
        all_hashes |= set(data.values())

    cached = set(CACHE_FILE.read_text().split()) if CACHE_FILE.exists() else set()
    todo = sorted(all_hashes - cached)

    print(f"{len(manifests)} manifests, {len(all_hashes)} unique clips referenced, "
          f"{len(cached)} already uploaded, {len(todo)} to upload")

    if DRY_RUN:
        for h in todo[:20]:
            print(f"  {h}.mp3")
        if len(todo) > 20:
            print(f"  … and {len(todo) - 20} more")
        return

    if not todo:
        print("\nnothing to upload.")
        return

    ok, failed = 0, []
    with CACHE_FILE.open("a") as cache_out, \
         concurrent.futures.ThreadPoolExecutor(max_workers=CONCURRENCY) as ex:
        futures = {ex.submit(upload_one, h): h for h in todo}
        for i, fut in enumerate(concurrent.futures.as_completed(futures), 1):
            h, success, err = fut.result()
            if success:
                ok += 1
                cache_out.write(h + "\n")
                cache_out.flush()
            else:
                failed.append((h, err))
            if i % 50 == 0 or i == len(todo):
                print(f"  {i}/{len(todo)} uploaded ({len(failed)} failed)")

    if failed:
        print(f"\n*** {len(failed)} uploads failed:")
        for h, err in failed[:10]:
            print(f"    {h}: {err}")
        sys.exit(1)

    print(f"\nall {ok} new clips uploaded. Commit assets/data/say/*.json if it changed.")


if __name__ == "__main__":
    main()
