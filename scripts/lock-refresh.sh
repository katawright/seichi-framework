#!/usr/bin/env bash
# Regenerate package-lock.json in a Linux container for cross-platform
# compatibility. npm on Windows strips optional Linux-only packages
# (e.g. @emnapi/core, native bindings) from the lockfile, which causes
# npm ci to fail on Linux (CI).
#
# Usage: bash scripts/lock-refresh.sh
#   Run after any manual npm install that modifies package.json.
#   Dependabot PRs don't need this — they generate lockfiles on Linux.

set -euo pipefail

if command -v podman &>/dev/null; then
  RUNTIME=podman
elif command -v docker &>/dev/null; then
  RUNTIME=docker
else
  echo "Error: podman or docker required" >&2
  exit 1
fi

echo "Regenerating package-lock.json in Linux container..."
MSYS_NO_PATHCONV=1 $RUNTIME run --rm -v "$(pwd):/app" -w /app node:24 \
  bash -c "rm -f package-lock.json && npm install --package-lock-only"

echo "Done. Commit the updated package-lock.json."
