#! /usr/bin/env bash
set -euo pipefail

if [ $# -gt 0 ]; then
  echo "usage: ./bin/up-to-date.sh"
  exit 1
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

useNpm() {
  npm --prefix="$HERE/.." "$@"
}

useNpm ci

if [ -z "$(useNpm outdated)" ]; then
  echo 'All up to date'
  exit 0
fi

useNpm update --save
useNpm run ship
git add package{,-lock}.json
git commit --message 'Apply in-range dependency updates'
git push
