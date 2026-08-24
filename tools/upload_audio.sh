#!/usr/bin/env bash
# Publish the generated 🔊 clips to the GitHub release that serves them.
# -----------------------------------------------------------------------------
# audio/ is gitignored — the mp3s are NOT deployed by pushing to main. The pages
# fetch them from a release asset URL, so a clip that is not uploaded 404s and
# that phrase silently falls back to the browser's own voice.
#
# Run this after every `python3 tools/gen_audio.py`.
#
#   ./tools/upload_audio.sh              # upload anything missing, then verify
#   ./tools/upload_audio.sh --dry-run    # list what would be uploaded
#
# Requires: gh (authenticated).
set -euo pipefail

TAG="booklet-say-audio"
TITLE="Booklet 🔊 audio (generated)"
DIR="audio/say"

cd "$(dirname "$0")/.."
command -v gh >/dev/null || { echo "gh not installed — brew install gh"; exit 1; }
[ -d "$DIR" ] || { echo "$DIR missing — run tools/gen_audio.py first"; exit 1; }

if ! gh release view "$TAG" >/dev/null 2>&1; then
  echo "creating release $TAG ..."
  [ "${1:-}" = "--dry-run" ] || gh release create "$TAG" --title "$TITLE" \
    --notes "Generated pronunciation clips for the vocabulary, example sentences and comprehension questions in the reading booklets. Produced by tools/gen_audio.py (edge-tts, ${TAG}). The passage recordings by a human reader live in the description-audio release and are not affected."
fi

# macOS ships bash 3.2, which has no mapfile.
local_files=()
while IFS= read -r f; do local_files+=("$f"); done < <(find "$DIR" -name '*.mp3' | sort)
echo "local : ${#local_files[@]} mp3"

if gh release view "$TAG" >/dev/null 2>&1; then
  gh release view "$TAG" --json assets --jq '.assets[].name' 2>/dev/null | sort > /tmp/_rel_assets.txt || : > /tmp/_rel_assets.txt
else
  : > /tmp/_rel_assets.txt
fi
echo "remote: $(wc -l < /tmp/_rel_assets.txt | tr -d ' ') assets already published"

missing=()
for f in "${local_files[@]}"; do
  grep -qxF "$(basename "$f")" /tmp/_rel_assets.txt || missing+=("$f")
done
echo "to upload: ${#missing[@]}"

if [ "${1:-}" = "--dry-run" ]; then
  printf '  %s\n' "${missing[@]:0:20}"
  [ "${#missing[@]}" -gt 20 ] && echo "  … and $(( ${#missing[@]} - 20 )) more"
  exit 0
fi

if [ "${#missing[@]}" -gt 0 ]; then
  # gh takes many files per call; batch to keep each request a sane size.
  batch=50
  for ((i=0; i<${#missing[@]}; i+=batch)); do
    echo "uploading $((i+1))–$(( i+batch > ${#missing[@]} ? ${#missing[@]} : i+batch )) of ${#missing[@]} ..."
    gh release upload "$TAG" "${missing[@]:i:batch}" --clobber
  done
fi

# ---- verify: every hash the pages will ask for must be published --------------
echo
echo "verifying every manifest entry is published ..."
gh release view "$TAG" --json assets --jq '.assets[].name' | sed 's/\.mp3$//' | sort > /tmp/_rel_hashes.txt
python3 - <<'PY'
import json, pathlib, sys
have = set(pathlib.Path("/tmp/_rel_hashes.txt").read_text().split())
missing_total = 0
for man in sorted(pathlib.Path("assets/data/say").glob("*.json")):
    m = json.loads(man.read_text(encoding="utf-8"))
    gone = sorted({h for h in m.values() if h not in have})
    print(f"  {man.stem}: {len(m) - len(gone)}/{len(m)} published")
    for h in gone[:5]:
        zh = next((k for k, v in m.items() if v == h), "?")
        print(f"      MISSING {h}  {zh[:60]}")
    missing_total += len(gone)
if missing_total:
    print(f"\n  *** {missing_total} clips missing — those phrases will fall back to the browser voice.")
    sys.exit(1)
print("\n  all clips live. Commit assets/data/say/*.json if it changed.")
PY
