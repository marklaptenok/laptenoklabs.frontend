#!/bin/sh
set -eu

repo=$(cd "$(dirname "$0")/.." && pwd)
out=${1:-"$(cd "$repo/.." && pwd)/laptenoklabs.deploy"}

[ -d "$repo/dist" ] || { echo "no dist/ — build the site first" >&2; exit 1; }

stale=$(find "$repo/src" "$repo/astro.config.mjs" -type f -newer "$repo/dist/index.html" 2>/dev/null | head -1 || true)
[ -z "$stale" ] || { echo "dist/ is older than the sources — rebuild first (e.g. $stale)" >&2; exit 1; }

rm -rf "$out"
mkdir -p "$out/server"
cp "$repo/deploy/Dockerfile" "$out/Dockerfile"
cp "$repo/server/index.ts" "$out/server/index.ts"
cp -R "$repo/dist" "$out/site"

files=$(find "$out" -type f | wc -l | tr -d ' ')
bytes=$(find "$out" -type f -exec ls -l {} + | awk '{s += $5} END {printf "%.1f MB", s / 1048576}')

echo "context: $out"
echo "  $files files, $bytes"
echo "  Dockerfile, server/index.ts, site/ (the built pages)"
echo
echo "deploy from the deployer VM, which alone holds the Railway token:"
echo "  cd $out && railway up --ci --service <service-name>"
