#!/usr/bin/env bash
# Thin wrapper — see tools/upload_audio_r2.py for the actual logic (uploads to
# the twrses-say-audio Cloudflare R2 bucket).
set -euo pipefail
exec python3 "$(dirname "$0")/upload_audio_r2.py" "$@"
