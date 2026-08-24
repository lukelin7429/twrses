#!/usr/bin/env bash
# Thin wrapper — see tools/upload_audio.py for the actual logic (per-page
# GitHub releases; a release caps out at 1000 assets).
set -euo pipefail
exec python3 "$(dirname "$0")/upload_audio.py" "$@"
