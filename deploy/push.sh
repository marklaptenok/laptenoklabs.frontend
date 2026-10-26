#!/bin/sh
set -eu

repo=$(cd "$(dirname "$0")/.." && pwd)
branch=${DEPLOY_BRANCH:-deploy}
ctx=$(mktemp -d)
index="$ctx.index"
rm -f "$index"
trap 'rm -rf "$ctx" "$index"' EXIT

sh "$repo/deploy/make.sh" "$ctx" >/dev/null

GIT_INDEX_FILE=$index
export GIT_INDEX_FILE
git --git-dir="$repo/.git" --work-tree="$ctx" add -A
tree=$(git --git-dir="$repo/.git" write-tree)
source_commit=$(git --git-dir="$repo/.git" rev-parse --short HEAD)
commit=$(git --git-dir="$repo/.git" commit-tree "$tree" \
  -m "Site built from $source_commit on $(date -u '+%Y-%m-%d %H:%M UTC')")
git --git-dir="$repo/.git" update-ref "refs/heads/$branch" "$commit"

files=$(git --git-dir="$repo/.git" ls-tree -r --name-only "$commit" | wc -l | tr -d ' ')
echo "branch '$branch' now holds $files files, one commit, no history"
git --git-dir="$repo/.git" ls-tree --name-only "$commit" | sed 's/^/  /'
echo
if [ "${1:-}" = "--push" ]; then
  git --git-dir="$repo/.git" push -f origin "$branch"
  echo "pushed; Railway deploys it if the service watches '$branch'"
else
  echo "to publish it:"
  echo "  git push -f origin $branch"
fi
