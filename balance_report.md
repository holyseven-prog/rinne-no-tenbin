# Balance report (after improvement v0.1)
Policy "none" (player does nothing), 60 seeds: victory 31 (52%) / doom 29 (48%).
Policy "basic" (simple auto-play), 60 seeds: victory 53 (88%) / doom 7 (12%).
Changes: bossHp 2300 -> 2000; faith above 100 now overflows (30%/day of the excess) into town food/HP, with a feed message,
so faith no longer sits at the 150 cap (none: avg ~113, cap share 0%; basic: avg ~60).
Balance scale: -100..+100, drifts toward dark by ~1.2/day; good deeds, kills of monsters and prayers answered push toward light.
Reproduce: `node test/batch3.js none 1 60` / `node test/batch3.js basic 1 60`, `node test/faith_dbg.js none 10`.
