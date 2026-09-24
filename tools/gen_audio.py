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
# The Multilingual voices auto-detect the language of the text, and on archaic or
# unusual English they guess wrong: "Dare frame thy fearful symmetry?" came out
# with a non-English pronunciation (3.05s, against 2.59s for the same line with
# "your" in place of "thy", and 2.47s from the English-only voice). Pages whose
# text is not modern English therefore use the English-only Ava, same speaker,
# no language switching. Add a prefix here if another such page ever appears.
VOICE_EN_ONLY = "en-US-AvaNeural"
EN_ONLY_PAGES = ("resources/classes/poetry",)
# A button marked data-say-lang="zh" (唐詩選讀的中文原文) is read by the Taiwan
# Mandarin voice instead, a touch slower again — it is verse.
VOICE_ZH = "zh-TW-HsiaoChenNeural"
RATE_ZH = "-15%"
TAG_RX = re.compile(r'<[^>]*\bdata-say="[^"]*"[^>]*>')
LANG_RX = re.compile(r'data-say-lang="([^"]*)"')
RATE = "-8%"                            # a touch slower than natural, for learners
# A 🔊 inside an .audio-row is the passage button, and main.js plays the human
# recording sitting beside it — so that text needs no clip of its own. Every
# other phrase does, however long: the paragraph-level buttons on multi-picture
# units have no human alternative and were silently falling back to the device
# voice.
SAY_RX = re.compile(r'data-say="([^"]*)"')
AUDIO_ROW_RX = re.compile(r'<div class="audio-row".*?</div>', re.S)


def phrase_hash(text: str, voice: str = VOICE) -> str:
    """Clip filename. The voice is part of the identity, not just the text.

    R2 serves these with `Cache-Control: immutable, max-age=1y`, so a file that
    keeps its name after its audio changes is stuck in every visitor's browser
    forever — which is exactly what happened when the poetry pages moved off the
    Multilingual voice: the server had the new clip, listeners kept the old one.

    The default voice hashes text alone, so the ~14k clips generated before this
    change keep their names and do not need regenerating.
    """
    key = text if voice == VOICE else f"{voice}\n{text}"
    return hashlib.sha1(key.encode("utf-8")).hexdigest()[:12]


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
    for tag in TAG_RX.findall(src):
        raw = SAY_RX.search(tag).group(1)
        text = html.unescape(raw).strip()
        if not text or text in seen or text in human:
            continue
        seen.add(text)
        m = LANG_RX.search(tag)
        out.append((text, m.group(1) if m else "en"))
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
    ap.add_argument("--voice", default=None,
                    help="override the voice; otherwise chosen from the page path")
    ap.add_argument("--sample", action="store_true", help="only the first 12, for review")
    args = ap.parse_args()

    for tool in ("edge-tts", "ffmpeg"):
        if not shutil.which(tool):
            sys.exit(f"{tool} not found (pipx install edge-tts / brew install ffmpeg)")

    page = pathlib.Path(args.page)
    if not (page / "index.html").exists():
        sys.exit(f"{page}/index.html not found")

    if args.voice is None:
        posix = page.as_posix()
        args.voice = (VOICE_EN_ONLY if any(posix.startswith(p) for p in EN_ONLY_PAGES)
                      else VOICE)

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
    for i, (text, lang) in enumerate(texts, 1):
        voice, rate = (VOICE_ZH, RATE_ZH) if lang == "zh" else (args.voice, RATE)
        h = phrase_hash(text, voice)
        manifest[text] = h
        dest = out_dir / f"{h}.mp3"
        if dest.exists():
            reused += 1
            continue
        raw = tmp / f"{h}.raw.mp3"
        try:
            subprocess.run(["edge-tts", "--voice", voice, "--rate", rate,
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
