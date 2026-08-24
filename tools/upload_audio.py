#!/usr/bin/env python3
"""Publish generated 🔊 clips to per-page GitHub releases.

audio/ is gitignored — the mp3s are NOT deployed by pushing to main. Each
resources/booklets/.../ page's manifest (assets/data/say/<slug>.json) gets its
own release tagged `say-<slug>`: a release caps out at 1000 assets, and a
single page never comes close, so this never needs a rollover.

Run this after every `python3 tools/gen_audio.py`.

    ./tools/upload_audio.sh              # upload anything missing, then verify
    ./tools/upload_audio.sh --dry-run    # list what would be uploaded

Requires: gh (authenticated).
"""
import json
import pathlib
import subprocess
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO_DIR = REPO_ROOT / "audio" / "say"
MANIFEST_DIR = REPO_ROOT / "assets" / "data" / "say"
DRY_RUN = "--dry-run" in sys.argv[1:]
BATCH = 50


def gh(*args, check=True):
    return subprocess.run(["gh", *args], cwd=REPO_ROOT, capture_output=True, text=True, check=check)


def release_exists(tag):
    return gh("release", "view", tag, check=False).returncode == 0


def release_assets(tag):
    r = gh("release", "view", tag, "--json", "assets", "--jq", ".assets[].name", check=False)
    if r.returncode != 0:
        return set()
    return {line.strip() for line in r.stdout.splitlines() if line.strip()}


def upload_manifest(man):
    slug = man.stem
    tag = f"say-{slug}"
    data = json.loads(man.read_text(encoding="utf-8"))
    hashes = sorted(set(data.values()))
    print(f"== {slug} -> {tag} ({len(hashes)} clips) ==")

    exists = release_exists(tag)
    if not exists:
        if DRY_RUN:
            print("  (release does not exist yet — would create it)")
        else:
            print(f"  creating release {tag} ...")
            gh("release", "create", tag, "--title", f"Booklet 🔊 audio — {slug}",
               "--notes", f"Generated pronunciation clips for {slug} (edge-tts). "
                          f"Produced by tools/gen_audio.py.")
            exists = True

    have = release_assets(tag) if exists else set()
    missing = []
    for h in hashes:
        f = AUDIO_DIR / f"{h}.mp3"
        if not f.exists():
            print(f"  WARNING: {f} not found locally — run gen_audio.py first")
            continue
        if f"{h}.mp3" not in have:
            missing.append(f)

    print(f"  to upload: {len(missing)}")
    if DRY_RUN:
        for f in missing[:20]:
            print(f"    {f.name}")
        if len(missing) > 20:
            print(f"    … and {len(missing) - 20} more")
        return

    for i in range(0, len(missing), BATCH):
        chunk = missing[i:i + BATCH]
        print(f"  uploading {i + 1}-{min(i + BATCH, len(missing))} of {len(missing)} ...")
        gh("release", "upload", tag, *[str(f) for f in chunk], "--clobber")


def verify():
    print()
    print("verifying every manifest entry is published in its own release ...")
    any_missing = False
    for man in sorted(MANIFEST_DIR.glob("*.json")):
        slug = man.stem
        tag = f"say-{slug}"
        data = json.loads(man.read_text(encoding="utf-8"))
        have = {n[:-4] for n in release_assets(tag) if n.endswith(".mp3")}
        gone = sorted({h for h in data.values() if h not in have})
        print(f"  {slug}: {len(data) - len(gone)}/{len(data)} published")
        for h in gone[:5]:
            text = next((k for k, v in data.items() if v == h), "?")
            print(f"      MISSING {h}  {text[:60]}")
        if gone:
            any_missing = True
    if any_missing:
        print("\n  *** some clips missing — those phrases will fall back to the browser voice.")
        sys.exit(1)
    print("\n  all clips live. Commit assets/data/say/*.json if it changed.")


def main():
    if not AUDIO_DIR.is_dir():
        sys.exit(f"{AUDIO_DIR} missing — run tools/gen_audio.py first")
    manifests = sorted(MANIFEST_DIR.glob("*.json"))
    if not manifests:
        sys.exit(f"no manifests in {MANIFEST_DIR}")

    for man in manifests:
        upload_manifest(man)

    if not DRY_RUN:
        verify()


if __name__ == "__main__":
    main()
