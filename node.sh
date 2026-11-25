#!/usr/bin/env bash
# node is not on PATH on this machine: use the first runtime that exists
for n in "/c/Users/ytachibana/AppData/Local/Programs/Kimi/resources/resources/runtime/node.exe" "/c/Users/ytachibana/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe" "/c/Program Files/nodejs/node.exe"; do
  [ -x "$n" ] && exec "$n" "$@"
done
echo "node.sh: no node runtime found" >&2; exit 127
