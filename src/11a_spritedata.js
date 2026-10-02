/* ================= sprite data: character parts as pixel maps (V3.3 S2) =================
   Front/back parts are written as the LEFT HALF (8 chars, x0..7) and mirrored. Side parts are full 16-char rows via Rw(x, str).
   Material chars: s skin, h hair, c cloth, u sleeve, t trim, p pants, b boots, m metal, w wood/leather, g gold, a job accent
   Fixed: e eye, r mouth, P blush, f white, L gem, Q red, N green, Y yellow, X dark, K cork/brown
   Layout (y): hat 1.., hair 3.., head 4..11, torso 12..18, legs 19..22  (outline adds 1px around)                          */
const Rw = (x, s) => '.'.repeat(x) + s + '.'.repeat(Math.max(0, 16 - x - s.length));
const HY = 4, TYY = 12, LYY = 19;

const SD = {
  /* ---------------- FRONT ---------------- */
  headF: ["......ss", ".....sss", "....ssss", "....ssss", "....sses", "....sses", "....sPsr", ".....sss"],
  torsoF: ["....ccss", "....cccs", "....cccc", "....cccc", "....tttt", "....cccc", "....cccc"],
  torsoB: ["....cccc", "....cccc", "....cccc", "....cccc", "....tttt", "....cccc", "....cccc"],
  armF: ["..uu....", "..uu....", "..uu....", "..uu....", "..ss...."],
  legF: ["....ppp.", "....ppp.", "....bbb.", "....bbb."],
  robeF: ["...ccccc", "..cccccc", "..cccccc", "..tttttt"], /* y17..20 */
  robeLegF: ["....bbb.", "....bbb."], /* y21..22 */
  /* hair: oy = first row y */
  hairF: [
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hh...", "...h...."] },
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "..hhh...", "..hhh...", "..hhh...", "..hh....", "..hh....", "..hh....", "..h....."] },
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hh...", "...h...."] },
    { oy: 2, rows: [".....hhh", "...hhhhh", "..hhhhhh", "..hhhhhh", "..hhhhhh", "..hhh...", "..hh...."] },
    { oy: 6, rows: ["...h....", "...h....", "...h...."] },
    { oy: 2, rows: ["......hh", ".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hh...", "...h...."] },
    { oy: 2, rows: ["....h.h.", "...hhhhh", "...hhhhh", "...hhhhh", "...hh.hh", "...h...."] },
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "..hh....", "..hh....", "..hh....", "...h...."] },
  ],
  hairB: [
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh"] },
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "..hhhhhh", "..hhhhhh", "..hhhhhh", "...hhhhh", "....hhhh"] },
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "......hh", "......hh", "......hh", ".......h"] },
    { oy: 2, rows: [".....hhh", "...hhhhh", "..hhhhhh", "..hhhhhh", "..hhhhhh", "..hhhhhh", "..hhhhhh", "..hhhhhh", "...hhhhh"] },
    { oy: 7, rows: ["...h....", "...h....", "...h...."] },
    { oy: 2, rows: ["......hh", ".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh"] },
    { oy: 2, rows: ["....h.h.", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh"] },
    { oy: 3, rows: [".....hhh", "....hhhh", "...hhhhh", "...hhhhh", "...hhhhh", "...hhhhh", "..hhhhhh", "..hh....", "..hh....", "..hh....", "...h...."] },
  ],
  beardF: ["....hhhh", "....hhhh", ".....hhh"], /* y10..12 */
  /* ---------------- SIDE (facing right) ---------------- */
  headS: [Rw(6, "ssss"), Rw(5, "sssss"), Rw(5, "ssssss"), Rw(5, "ssssss"), Rw(5, "sssses"), Rw(5, "sssses"), Rw(5, "sssssrs"), Rw(6, "ssss")],
  torsoS: [Rw(5, "ccccss"), Rw(5, "cccccc"), Rw(5, "cccccc"), Rw(5, "cccccc"), Rw(5, "tttttt"), Rw(5, "cccccc"), Rw(5, "cccccc")],
  armS: [Rw(7, "uu"), Rw(7, "uu"), Rw(7, "uu"), Rw(7, "uu"), Rw(7, "ss")],
  legS: [
    [Rw(6, "ppp"), Rw(6, "ppp"), Rw(6, "bbbb"), Rw(6, "bbbb")],
    [Rw(5, "pp..pp"), Rw(5, "pp..pp"), Rw(4, "bbb..bbb"), Rw(4, "bbb..bbb")],
    [Rw(6, "ppp"), Rw(6, "ppp"), Rw(6, "bbbb"), Rw(6, "bbbb")],
    [Rw(6, "pppp"), Rw(6, "ppp"), Rw(6, "bbb"), Rw(7, "bbb")],
  ],
  robeS: [Rw(4, "cccccccc"), Rw(4, "cccccccc"), Rw(4, "cccccccc"), Rw(4, "tttttttt")],
  hairS: [
    { oy: 3, rows: [Rw(6, "hhhh"), Rw(5, "hhhhhh"), Rw(4, "hhhhhhh"), Rw(4, "hhhhhh"), Rw(4, "hhhh"), Rw(4, "hhh"), Rw(4, "hh")] },
    { oy: 3, rows: [Rw(6, "hhhh"), Rw(5, "hhhhhh"), Rw(4, "hhhhhhh"), Rw(4, "hhhhhh"), Rw(4, "hhhh"), Rw(4, "hhh"), Rw(4, "hhh"), Rw(4, "hhh"), Rw(4, "hh"), Rw(4, "hh"), Rw(4, "h")] },
    { oy: 3, rows: [Rw(6, "hhhh"), Rw(5, "hhhhhh"), Rw(4, "hhhhhhh"), Rw(4, "hhhhhh"), Rw(4, "hhhh"), Rw(3, "hhh"), Rw(2, "hhh"), Rw(2, "hh"), Rw(3, "hh"), Rw(3, "h")] },
    { oy: 2, rows: [Rw(5, "hhhhh"), Rw(4, "hhhhhhh"), Rw(3, "hhhhhhhh"), Rw(3, "hhhhhhhh"), Rw(3, "hhhhhhh"), Rw(3, "hhhhh"), Rw(3, "hhh"), Rw(3, "hh")] },
    { oy: 7, rows: [Rw(4, "h"), Rw(4, "h"), Rw(4, "h")] },
    { oy: 2, rows: [Rw(6, "hh"), Rw(6, "hhhh"), Rw(5, "hhhhhh"), Rw(4, "hhhhhhh"), Rw(4, "hhhhhh"), Rw(4, "hhhh"), Rw(4, "hhh"), Rw(4, "hh")] },
    { oy: 2, rows: [Rw(5, "h.h.h"), Rw(5, "hhhhhh"), Rw(4, "hhhhhhh"), Rw(4, "hhhhhh"), Rw(4, "hhhh"), Rw(4, "hhh"), Rw(4, "hh")] },
    { oy: 3, rows: [Rw(6, "hhhh"), Rw(5, "hhhhhh"), Rw(4, "hhhhhhh"), Rw(4, "hhhhhh"), Rw(4, "hhhh"), Rw(3, "hhh"), Rw(3, "hh"), Rw(3, "hh"), Rw(3, "hh"), Rw(4, "h")] },
  ],
  beardS: [Rw(8, "hhh"), Rw(8, "hhhh"), Rw(9, "hh")], /* y10..12 */
  /* ---------------- JOB GEAR ---------------- */
  hat: {
    mage: { F: { oy: 1, rows: [".......c", "......cc", ".....ccc", "....gggg", "..cccccc"] }, B: { oy: 1, rows: [".......c", "......cc", ".....ccc", "....gggg", "..cccccc"] }, S: { oy: 1, rows: [Rw(5, "c"), Rw(5, "cc"), Rw(4, "ccc"), Rw(4, "gggggg"), Rw(3, "cccccccc")] } },
    priest: { F: { oy: 3, rows: [".....ccc", "....cccc", "...ccccc", "...cc...", "...cc...", "...cc...", "...cc...", "...cc..."] }, B: { oy: 3, rows: [".....ccc", "....cccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc", "....cccc"] }, S: { oy: 3, rows: [Rw(5, "cccc"), Rw(4, "ccccccc"), Rw(4, "ccccccc"), Rw(4, "ccccc"), Rw(4, "cccc"), Rw(4, "ccc"), Rw(4, "ccc"), Rw(4, "cc")] } },
    thief: { F: { oy: 3, rows: [".....ccc", "....cccc", "...ccccc", "...cc...", "...cc...", "...cc...", "...cc...", "...cc...", "....XXXX", ".....XXX"].map((r, i) => i === 8 ? "....XXXX" : r) }, B: { oy: 3, rows: [".....ccc", "....cccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc", "...ccccc", "....cccc"] }, S: { oy: 3, rows: [Rw(5, "cccc"), Rw(4, "ccccccc"), Rw(4, "ccccccc"), Rw(4, "ccccc"), Rw(4, "cccc"), Rw(4, "ccc"), Rw(4, "ccc"), Rw(4, "cc"), Rw(8, "XXX")] } },
    farmer: { F: { oy: 3, rows: [".....aaa", "....aaaa", "..aaaaaa"] }, B: { oy: 3, rows: [".....aaa", "....aaaa", "..aaaaaa"] }, S: { oy: 3, rows: [Rw(6, "aaaa"), Rw(5, "aaaaaa"), Rw(3, "aaaaaaaaa")] } },
    merchant: { F: { oy: 3, rows: [".....aaa", "...aaaaa", "..aaaaaa"] }, B: { oy: 3, rows: [".....aaa", "...aaaaa", "..aaaaaa"] }, S: { oy: 3, rows: [Rw(6, "aaaa"), Rw(4, "aaaaaaa"), Rw(3, "aaaaaaaa")] } },
    smith: { F: { oy: 6, rows: ["....aaaa"] }, B: { oy: 6, rows: ["....aaaa"] }, S: { oy: 6, rows: [Rw(4, "aaaaaaa")] } },
    herbalist: { F: { oy: 3, rows: [".....aaa", "....aaaa", "...aaaaa", "...aaaaa", "...aa..."] }, B: { oy: 3, rows: [".....aaa", "....aaaa", "...aaaaa", "...aaaaa", "...aaaaa", "...aaaaa", "....aaaa"] }, S: { oy: 3, rows: [Rw(6, "aaaa"), Rw(5, "aaaaaa"), Rw(4, "aaaaaaa"), Rw(4, "aaaaaa"), Rw(4, "aaaa"), Rw(3, "aa")] } },
    historian: { F: { oy: 3, rows: [".....aaa", "...aaaaa", "..aaaaaa"] }, B: { oy: 3, rows: [".....aaa", "...aaaaa", "..aaaaaa"] }, S: { oy: 3, rows: [Rw(6, "aaaa"), Rw(4, "aaaaaaa"), Rw(3, "aaaaaaaa")] } },
  },
  /* torso overlays (y12.. ) */
  over: {
    swordsman: { F: [{ oy: 12, rows: ["..mmm...", "..mmm...", "........", "........", "....tttg"] }], B: [{ oy: 12, rows: ["..mmm...", "..mmm..."] }], S: [{ oy: 12, rows: [Rw(6, "mm"), Rw(6, "mm")] }] },
    priest: { F: [{ oy: 13, rows: [".......g", "......gg", ".......g"] }], B: [], S: [] },
    smith: { F: [{ oy: 13, rows: [".....www", ".....www", ".....www", ".....www", ".....www", ".....www"] }], B: [], S: [{ oy: 13, rows: [Rw(9, "ww"), Rw(9, "ww"), Rw(9, "ww"), Rw(9, "ww"), Rw(9, "ww"), Rw(9, "ww")] }] },
    herbalist: { F: [{ oy: 13, rows: [".....ttt", ".....ttt", ".....ttt", ".....ttt", ".....ttt", ".....ttt"] }], B: [], S: [{ oy: 13, rows: [Rw(9, "tt"), Rw(9, "tt"), Rw(9, "tt"), Rw(9, "tt"), Rw(9, "tt"), Rw(9, "tt")] }] },
    farmer: { F: [{ oy: 13, rows: [".....t..", ".....t..", ".....t.."] }], B: [{ oy: 13, rows: [".....t..", ".....t..", ".....t.."] }], S: [] },
    merchant: { F: [{ oy: 13, rows: [".......g", "........", ".......g", "........", "...aa..."].map((r, i) => i === 4 ? "...aa..." : r) }], B: [{ oy: 12, rows: ["...aaaaa", "...aaaaa", "...aaaaa", "...aaaaa", "...aaaaa", "...aaaaa", "...aaaaa"] }], S: [{ oy: 13, rows: [Rw(3, "aaaa"), Rw(3, "aaaa"), Rw(3, "aaaa"), Rw(3, "aaaa"), Rw(3, "aaaa")] }] },
    thief: { F: [{ oy: 12, rows: ["....t..."] }], B: [], S: [] },
    mage: { F: [], B: [], S: [] }, historian: { F: [{ oy: 16, rows: ["....tttt"] }], B: [], S: [] },
  },
  /* held items: right hand */
  item: {
    sword: { F: [Rw(14, "W"), Rw(14, "m"), Rw(14, "m"), Rw(14, "m"), Rw(14, "m"), Rw(14, "m"), Rw(14, "m"), Rw(13, "ggg"), Rw(14, "w")], oy: 10, S: [Rw(11, "W"), Rw(11, "m"), Rw(11, "m"), Rw(11, "m"), Rw(11, "m"), Rw(11, "m"), Rw(11, "m"), Rw(10, "ggg"), Rw(11, "w")], soy: 9, B: [Rw(4, "g"), Rw(5, "w"), Rw(6, "w"), Rw(7, "w"), Rw(8, "w"), Rw(9, "w"), Rw(10, "w")], boy: 11 },
    mageStaff: { F: [Rw(13, "LLL"), Rw(13, "LLL"), Rw(13, "LLL"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], oy: 5, S: [Rw(10, "LLL"), Rw(10, "LLL"), Rw(10, "LLL"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w")], soy: 5, B: [Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], boy: 9 },
    holyStaff: { F: [Rw(14, "g"), Rw(13, "ggg"), Rw(14, "g"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], oy: 5, S: [Rw(11, "g"), Rw(10, "ggg"), Rw(11, "g"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w")], soy: 5, B: [Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], boy: 10 },
    fork: { F: [Rw(13, "m.m"), Rw(13, "m.m"), Rw(13, "mmm"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], oy: 7, S: [Rw(10, "m.m"), Rw(10, "m.m"), Rw(10, "mmm"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w")], soy: 8, B: [Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], boy: 11 },
    hammer: { F: [Rw(12, "mmmm"), Rw(12, "mmmm"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], oy: 11, S: [Rw(9, "mmmm"), Rw(9, "mmmm"), Rw(10, "w"), Rw(10, "w"), Rw(10, "w"), Rw(10, "w"), Rw(10, "w")], soy: 12, B: [Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], boy: 14 },
    dagger: { F: [Rw(14, "m"), Rw(14, "m"), Rw(14, "w")], oy: 16, S: [Rw(10, "mm"), Rw(10, "w")], soy: 17, B: [Rw(14, "m"), Rw(14, "w")], boy: 16 },
    book: { F: [Rw(11, "aaaa"), Rw(11, "afaa"), Rw(11, "aaaa")], oy: 15, S: [Rw(9, "aaa"), Rw(9, "afa"), Rw(9, "aaa")], soy: 15, B: [], boy: 15 },
    potion: { F: [Rw(13, "K"), Rw(13, "NN"), Rw(13, "NN")], oy: 15, S: [Rw(10, "K"), Rw(10, "NN"), Rw(10, "NN")], soy: 15, B: [], boy: 15 },
    cane: { F: [Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w"), Rw(14, "w")], oy: 12, S: [Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w"), Rw(11, "w")], soy: 12, B: [], boy: 12 },
  },
  jobItem: { swordsman: 'sword', mage: 'mageStaff', priest: 'holyStaff', farmer: 'fork', smith: 'hammer', thief: 'dagger', historian: 'book', herbalist: 'potion' },
  /* ---------------- CHILD (big head, short body) ---------------- */
  childTorsoF: ["....ccss", "....cccc", "....cccc"], childLegF: ["....ppp.", "....ppp.", "....bbb."],
  childArmF: ["..uu....", "..ss...."],
  childTorsoS: [Rw(5, "ccccss"), Rw(5, "cccccc"), Rw(5, "cccccc")], childLegS: [[Rw(6, "ppp"), Rw(6, "ppp"), Rw(6, "bbbb")], [Rw(5, "pp..pp"), Rw(5, "pp..pp"), Rw(4, "bbb..bbb")], [Rw(6, "ppp"), Rw(6, "ppp"), Rw(6, "bbbb")], [Rw(6, "pppp"), Rw(6, "ppp"), Rw(7, "bbb")]],
  childArmS: [Rw(7, "uu"), Rw(7, "ss")],
};
