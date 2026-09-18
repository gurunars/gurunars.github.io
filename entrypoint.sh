#!/bin/sh
# Command dispatcher that runs INSIDE the toolchain container.
# The project is bind-mounted at /app, so all edits on the host are live.
set -eu

cmd="${1:?usage: entrypoint.sh <command> [args...]}"
shift || true

ensure_deps() {
  [ -x node_modules/.bin/vite ] || yarn install
}

case "$cmd" in
  install)
    exec yarn install
    ;;
  start)
    ensure_deps
    exec yarn start
    ;;
  storybook)
    ensure_deps
    exec yarn docs
    ;;
  admin)
    ensure_deps
    exec yarn admin
    ;;
  build)
    ensure_deps
    exec yarn build
    ;;
  build-docs)
    ensure_deps
    exec yarn build-docs
    ;;
  test)
    ensure_deps
    yarn typecheck
    exec yarn test
    ;;
  lint)
    ensure_deps
    exec yarn lint
    ;;
  fmt)
    ensure_deps
    exec yarn fmt
    ;;
  sh)
    exec sh "$@"
    ;;
  *)
    echo "entrypoint.sh: unknown command '$cmd'" >&2
    exit 64
    ;;
esac
