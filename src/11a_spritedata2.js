/* ================= role parts (V3.3 follow-up): warrior armor, hero cape, sage beard, priest halo, smith build, elder hump, women's dress/bow ================= */
Object.assign(SD, {
  helm: {
    F: { oy: 3, rows: [".....mmm", "...mmmmm", "..mmmmmm", "..mmmmmm", "..mmgggg", "..mmm...", "..mm....", "..mm...."] },
    B: { oy: 3, rows: [".....mmm", "...mmmmm", "..mmmmmm", "..mmmmmm", "..mmmmmm", "..mmmmmm", "..mmmmmm", "...mmmmm"] },
    S: { oy: 3, rows: [Rw(6, "mmmm"), Rw(4, "mmmmmmm"), Rw(4, "mmmmmmmm"), Rw(4, "mmmmmmmm"), Rw(4, "mmgggggg"), Rw(4, "mmm"), Rw(4, "mm"), Rw(4, "mm")] },
    plumeF: { oy: 1, rows: ["......QQ", ".....QQQ"] }, plumeS: { oy: 1, rows: [Rw(4, "QQ"), Rw(3, "QQQ")] },
  },
  shieldF: { oy: 15, rows: ["mmmmm...", "mwwwm...", "mwgwm...", "mwwwm...", ".mwwm...", "..mm...."] },
  shieldS: { oy: 15, rows: [Rw(3, "mmm"), Rw(3, "mwm"), Rw(3, "mgm"), Rw(3, "mwm"), Rw(4, "mm")] },
  armorF: { oy: 12, rows: ["..mmmmmm", "..mmmmmm", "...mmmmm", "...mmmmm", "....mmmm", "....mmmm", "....mmmm"] },
  armorS: { oy: 12, rows: [Rw(5, "mmmmmm"), Rw(5, "mmmmmm"), Rw(5, "mmmmmm"), Rw(5, "mmmmmm"), Rw(5, "mmmmmm"), Rw(5, "mmmmmm"), Rw(5, "mmmmmm")] },
  /* hero */
  capeBackF: { oy: 13, rows: [".aaaaaaa", ".aaaaaaa", ".aaaaaaa", "aaaaaaaa", "aaaaaaaa", "aaaaaaaa", "aaaaaaaa", "aaaaaaaa", "aaaaaaaa"] },
  capeB: { oy: 12, rows: ["....gggg", "...aaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..gggggg"] },
  capeS: { oy: 12, rows: [Rw(3, "aaa"), Rw(2, "aaaa"), Rw(2, "aaaa"), Rw(2, "aaaa"), Rw(1, "aaaaa"), Rw(1, "aaaaa"), Rw(1, "aaaaa"), Rw(1, "aaaaa"), Rw(1, "aaaa")] },
  circletF: { oy: 5, rows: ["....gggL"] }, circletS: { oy: 5, rows: [Rw(4, "ggggggg")] },
  heroOverF: { oy: 12, rows: ["..ggg...", "..ggg...", "........", ".......g", "........", "....tttg"] },
  /* priest halo */
  haloF: { oy: 1, rows: [".....ggg", "....g..."] }, haloS: { oy: 1, rows: [Rw(5, "gggg"), Rw(4, "g"), Rw(9, "g")] },
  /* sage beard (long) */
  beardLongF: { oy: 10, rows: ["....hhhh", "....hhhh", "....hhhh", ".....hhh", "......hh", "......hh"] },
  beardLongS: { oy: 10, rows: [Rw(8, "hhh"), Rw(8, "hhhh"), Rw(8, "hhh"), Rw(9, "hh"), Rw(9, "hh"), Rw(9, "h")] },
  /* smith: broad body, bare arms */
  broadF: { oy: 13, rows: ["...ccccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc"] },
  armBareF: ["..uu....", ".sss....", ".sss....", ".sss....", ".sss...."],
  /* elder: shoulder hump */
  humpF: { oy: 12, rows: ["...ccccc", "..cccccc"] },
  /* women */
  dressF: { oy: 17, rows: ["...ccccc", "..cccccc", "..cccccc", "..tttttt"] },
  dressS: { oy: 17, rows: [Rw(4, "cccccccc"), Rw(3, "cccccccccc"), Rw(3, "cccccccccc"), Rw(3, "tttttttttt")] },
  bowF: [[6, 2], [7, 3], [8, 3], [9, 2]], bowS: [[7, 2], [8, 3], [9, 3], [10, 2]],
  shieldItem: { F: [Rw(12, "mmmm"), Rw(12, "mggm"), Rw(12, "mggm"), Rw(12, "mmmm"), Rw(13, "mm")], oy: 14, S: [Rw(10, "mmm"), Rw(10, "mgm"), Rw(10, "mmm")], soy: 15, B: [], boy: 15 },
  caneCrook: { F: [Rw(13, "ww")], oy: 11 },
});
SD.item.shieldItem = SD.shieldItem;
