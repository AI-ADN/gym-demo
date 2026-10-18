#!/usr/bin/env bash
# Joins the facility tour clips into the hero loop.
# Usage: scripts/build-hero-tour.sh clip0.mp4 clip1.mp4 ... (in tour order)
# Each clip crossfades into the next; the last one crossfades back into the start of the first,
# so the loop restarts without a hard cut.
set -euo pipefail

FADE=0.5
OUT=public/media/hero
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

clips=("$@")
n=${#clips[@]}
if (( n < 2 )); then
  echo "Need at least two clips" >&2
  exit 1
fi

# Normalize: 1280x720, 24 fps, no audio. The first clip's opening is duplicated at the end
# so the final crossfade lands on exactly what the loop starts with.
for i in "${!clips[@]}"; do
  ffmpeg -y -v error -i "${clips[$i]}" -an -vf "scale=1280:720:flags=lanczos,fps=24,format=yuv420p,setsar=1" "$TMP/c$i.mp4"
done
ffmpeg -y -v error -i "$TMP/c0.mp4" -t "$FADE" -c:v libx264 -crf 12 "$TMP/head.mp4"
ffmpeg -y -v error -i "$TMP/c0.mp4" -ss "$FADE" -c:v libx264 -crf 12 "$TMP/c0trim.mp4"
cp "$TMP/c0trim.mp4" "$TMP/c0.mp4"
cp "$TMP/head.mp4" "$TMP/c$n.mp4"

inputs=()
for (( i = 0; i <= n; i++ )); do inputs+=(-i "$TMP/c$i.mp4"); done

filter=""
prev="[0:v]"
offset=0
for (( i = 1; i <= n; i++ )); do
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/c$((i - 1)).mp4")
  if (( i == 1 )); then
    offset=$(echo "$dur - $FADE" | bc -l)
  else
    offset=$(echo "$offset + $dur - $FADE" | bc -l)
  fi
  label="[x$i]"
  filter+="${prev}[$i:v]xfade=transition=fade:duration=$FADE:offset=$offset${label};"
  prev=$label
done
filter=${filter%;}

ffmpeg -y -v error "${inputs[@]}" -filter_complex "$filter" -map "$prev" -c:v libx264 -crf 12 -preset medium "$TMP/master.mp4"

ffmpeg -y -v error -i "$TMP/master.mp4" -an -c:v libx264 -preset slow -crf 28 -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/loop-720.mp4"
ffmpeg -y -v error -i "$TMP/master.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good -cpu-used 2 "$OUT/loop-720.webm"
ffmpeg -y -v error -i "$TMP/master.mp4" -frames:v 1 -q:v 3 "$OUT/poster.jpg"

ls -la "$OUT"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/loop-720.mp4"
