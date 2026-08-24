#!/usr/bin/env python3
"""Generate English audio for the 🔊 buttons in the reading booklets.

The passages themselves are read by a human (see the "課文朗讀（真人）" players)
and are NOT touched by this script. What this replaces is everything else — the
vocabulary words, example sentences and comprehension questions — which until
now were spoken by the browser's own voice. That voice is whatever the visitor's
operating system happens to ship: acceptable on a Mac, poor on Windows, often
missing entirely on Android.

Pipeline: edge-tts (Azure en-US neural voice) -> ffmpeg (trim silence, normalise
loudness, mono 48kbps). Filenames are a hash of the phrase, so an unchanged
phrase keeps its file and a reworded one gets a new name.

    python3 tools/gen_audio.py --page resources/booklets/description/book1
    python3 tools/gen_audio.py --page ... --sample     # a spread, for review

Then publish them:  ./tools/upload_audio.sh
Requires: edge-tts (pipx install edge-tts), ffmpeg.
"""
import argparse, hashlib, html, json, pathlib, re, shutil, subprocess, sys

VOICE = "en-US-AvaMultilingualNeural"   # chosen 2026-08 after an A/B test.
                                        # Alternatives heard at the same time:
                                        # AndrewMultilingual (m), Jenny, Aria.
RATE = "-8%"                            # a touch slower than natural, for learners
# A 🔊 inside an .audio-row is the passage button, and main.js plays the human
# recording sitting beside it — so that text needs no clip of its own. Every
# other phrase does, however long: the paragraph-level buttons on multi-picture
# units have no human alternative and were silently falling back to the device
# voice.
SAY_RX = re.compile(r'data-say="([^"]*)"')
AUDIO_ROW_RX = re.compile(r'<div class="audio-row".*?</div>', re.S)


def phrase_hash(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:12]


def phrases_in(page: pathlib.Path):
    """Every data-say phrase needing a clip, de-duplicated, in document order.

    Excludes the passage buttons that sit next to a human recording — main.js
    plays that recording instead.
    """
    src = (page / "index.html").read_text(encoding="utf-8")

    human = set()
    for row in AUDIO_ROW_RX.findall(src):
        if "<audio" not in row:
            continue
        for raw in SAY_RX.findall(row):
            human.add(html.unescape(raw).strip())

    seen, out = set(), []
    for raw in SAY_RX.findall(src):
        text = html.unescape(raw).strip()
        if not text or text in seen or text in human:
            continue
        seen.add(text)
        out.append(text)
    return out


def post(raw: pathlib.Path, out: pathlib.Path) -> None:
    """Trim silence at both ends, normalise loudness, encode mono 48k."""
    trim = ("silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB,"
            "areverse,"
            "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB,"
            "areverse")
    af = f"{trim},loudnorm=I=-16:TP=-1.5:LRA=11,apad=pad_dur=0.15"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(raw),
                    "-af", af, "-ac", "1", "-ar", "44100", "-b:a", "48k", str(out)],
                   check=True)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--page", required=True,
                    help="booklet directory, e.g. resources/booklets/description/book1")
    ap.add_argument("--out", default="audio/say", help="where the mp3s are written")
    ap.add_argument("--voice", default=VOICE)
    ap.add_argument("--sample", action="store_true", help="only the first 12, for review")
    args = ap.parse_args()

    for tool in ("edge-tts", "ffmpeg"):
        if not shutil.which(tool):
            sys.exit(f"{tool} not found (pipx install edge-tts / brew install ffmpeg)")

    page = pathlib.Path(args.page)
    if not (page / "index.html").exists():
        sys.exit(f"{page}/index.html not found")

    slug = "-".join(page.parts[-2:])          # description-book1
    out_dir = pathlib.Path(args.out); out_dir.mkdir(parents=True, exist_ok=True)
    tmp = out_dir / ".raw"; tmp.mkdir(exist_ok=True)
    man_path = pathlib.Path("assets/data/say") / f"{slug}.json"
    man_path.parent.mkdir(parents=True, exist_ok=True)

    texts = phrases_in(page)
    if args.sample:
        texts = texts[:12]
    print(f"{slug}: {len(texts)} phrases · voice {args.voice} · rate {RATE}")

    manifest, failed, made, reused = {}, [], 0, 0
    for i, text in enumerate(texts, 1):
        h = phrase_hash(text)
        manifest[text] = h
        dest = out_dir / f"{h}.mp3"
        if dest.exists():
            reused += 1
            continue
        raw = tmp / f"{h}.raw.mp3"
        try:
            subprocess.run(["edge-tts", "--voice", args.voice, "--rate", RATE,
                            "--text", text, "--write-media", str(raw)],
                           check=True, capture_output=True)
            post(raw, dest)
            raw.unlink()
            made += 1
            print(f"  [{i:>3}/{len(texts)}] {h}  {dest.stat().st_size:>6,}B  {text[:52]}")
        except subprocess.CalledProcessError as e:
            failed.append((text, (e.stderr or b"")[:80]))

    man_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=0,
                                   sort_keys=True) + "\n", encoding="utf-8")
    shutil.rmtree(tmp, ignore_errors=True)

    total = sum(f.stat().st_size for f in out_dir.glob("*.mp3"))
    print(f"\n{made} new · {reused} already there · {len(manifest)} in the manifest")
    print(f"{out_dir}: {total/1024/1024:.1f} MB total")
    print(f"\nwrote {man_path} — COMMIT IT. The page looks phrases up here;")
    print("without it every 🔊 falls back to the browser's own voice.")
    print("\n*** The mp3s are NOT deployed by pushing. Publish them: ./tools/upload_audio.sh ***")

    if failed:
        print(f"\n{len(failed)} FAILED:")
        for t, err in failed[:10]:
            print(f"  {t[:60]}  {err}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
