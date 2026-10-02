#!/usr/bin/env bash
# usage: sweep.sh <name> '<TUNE json>' <seeds-per-proc> ; spawns 4 procs per policy (seeds 1..4*n)
name=$1; tune=$2; n=${3:-5}
mkdir -p test/sw/$name; rm -f test/sw/$name/*.out
for pol in none basic; do
  for k in 0 1 2 3; do
    a=$((k*n+1)); b=$((k*n+n))
    (TUNE="$tune" ./node.sh test/batch3.js $pol $a $b > test/sw/$name/${pol}_$k.out 2>&1 &)
  done
done
