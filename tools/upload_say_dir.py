#!/usr/bin/env python3
"""把一份錄音清單（assets/data/say/<slug>.json）引用的 mp3，從指定資料夾上傳到 R2。

用途：~/Documents 讀不到時（macOS 收回權限），audio/say 這個指向 ~/Documents/twrses/audio/say 的連結不能用，
就讓 gen_audio.py 輸出到本機資料夾，再用這支上傳。上傳邏輯與 upload_audio_r2.py 相同，也會寫進 .r2_uploaded_cache.txt。

    python3 tools/gen_audio.py --page resources/classes/astronomy/<slug> --out audio/say-<slug>
    python3 tools/upload_say_dir.py assets/data/say/astronomy-<slug>.json audio/say-<slug>
"""
import concurrent.futures, json, pathlib, subprocess, sys

REPO = pathlib.Path(__file__).resolve().parent.parent
WRANGLER = "/Users/hayashikisshou/Documents/Claude/repos/changhua-bilingual/worker/node_modules/.bin/wrangler"
CACHE = REPO / "tools" / ".r2_uploaded_cache.txt"
PUBLIC = "https://pub-53f20fadeae54598a39a22eb35326575.r2.dev/"

def main():
    manifest, folder = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    hashes = sorted(set(json.loads(manifest.read_text(encoding="utf-8")).values()))
    done = set(CACHE.read_text().split()) if CACHE.exists() else set()
    todo = [h for h in hashes if h not in done]
    print(f"{len(hashes)} clips, {len(todo)} to upload")

    def up(h):
        r = subprocess.run([WRANGLER, "r2", "object", "put", f"twrses-say-audio/{h}.mp3", "--file", str(folder / f"{h}.mp3"),
                            "--content-type", "audio/mpeg", "--cache-control", "public, max-age=31536000, immutable", "--remote"],
                           capture_output=True, text=True)
        return h, r.returncode == 0, (r.stderr.strip().splitlines() or [""])[-1]

    ok = []
    with concurrent.futures.ThreadPoolExecutor(8) as ex:
        for h, good, err in ex.map(up, todo):
            (ok.append(h) if good else print("FAIL", h, err))
    with CACHE.open("a") as f:
        for h in ok:
            f.write(h + "\n")
    print(f"uploaded {len(ok)}; check online with curl: {PUBLIC}<hash>.mp3 (urllib gets 403 from R2)")

if __name__ == "__main__":
    main()
