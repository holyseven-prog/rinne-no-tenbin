/* ================= NPC art from SEVEN's design sheet (Part A): 11 jobs x M/F x front / back / side, 16x24, 2-head-tall =================
   Layers are written as LEFT HALF (8 chars, mirrored) for front/back and as FULL rows facing LEFT for the side view (right = mirror).
   Materials (auto-shaded): s skin h hair c cloth u sleeve t trim p pants b boots m metal w wood g gold k cape a hat/accent v vest n apron
   Fixed: e eye  r mouth  W white  Q red  Y yellow  L light blue  X dark  N green                                                     */
const NPC_VARIANTS = true; // individual hair (3) / skin (3) differences; set false for identical crowds
const NP = { // design palette (sheet bottom row)
  blue: '#2a5ab1', lblue: '#5c91df', red: '#ca3b3b', gold: '#efa92f', green: '#4e864c', brown: '#806039', gray: '#878e97', orange: '#d5733a', purple: '#9367b3',
  silver: '#bcc0c4', teal: '#457389', brown2: '#936049', tan: '#c3976b', navy: '#4e5676', gray2: '#787979', skin: '#f3d4b8', white: '#eceaf0', black: '#34303c', pink: '#e8889a', leather: '#8a5a34',
};
const R8 = (s) => s; // marker for 8-char half rows
const FS = (x, s) => '.'.repeat(x) + s + '.'.repeat(Math.max(0, 16 - x - s.length)); // full 16-char row
/* ---------- base body ---------- */
const NB = {
  faceF: { oy: 4, rows: ['....ssss', '...sssss', '...sssss', '...ssess', '...ssess', '...sssss', '....sssr', '.....sss'] },
  faceS: { oy: 4, rows: [FS(3, 'sssss'), FS(2, 'ssssss'), FS(2, 'ssssss'), FS(2, 'sesss'), FS(2, 'sesss'), FS(2, 'ssssss'), FS(3, 'rsss'), FS(4, 'sss')] },
  bodyF: { oy: 12, rows: ['....cccc', '...ccccc', '..uccccc', '..uccccc', '..uccccc', '..sttttt', '...ccccc', '...pppp.', '...pppp.', '...bbbb.', '..bbbbb.'] },
  bodyB: { oy: 12, rows: ['....cccc', '...ccccc', '..uccccc', '..uccccc', '..uccccc', '..uttttt', '...ccccc', '...pppp.', '...pppp.', '...bbbb.', '..bbbbb.'] },
  bodyS: { oy: 12, rows: [FS(4, 'cccc'), FS(3, 'cccccc'), FS(3, 'ccuccc'), FS(3, 'ccuccc'), FS(3, 'ccuccc'), FS(3, 'tsttt'), FS(3, 'cccccc'), FS(4, 'ppp'), FS(4, 'ppp'), FS(3, 'bbbb'), FS(2, 'bbbbb')] },
  robeF: { oy: 12, rows: ['....cccc', '...ccccc', '..uccccc', '..uccccc', '..uccccc', '..sccccc', '...ccccc', '...ccccc', '..cccccc', '..cccccc', '..tttttt'] },
  robeB: { oy: 12, rows: ['....cccc', '...ccccc', '..uccccc', '..uccccc', '..uccccc', '..uccccc', '...ccccc', '...ccccc', '..cccccc', '..cccccc', '..tttttt'] },
  robeS: { oy: 12, rows: [FS(4, 'cccc'), FS(3, 'cccccc'), FS(3, 'ccuccc'), FS(3, 'ccuccc'), FS(3, 'ccuccc'), FS(3, 'csccc'), FS(3, 'cccccc'), FS(3, 'cccccc'), FS(2, 'ccccccc'), FS(2, 'ccccccc'), FS(2, 'ttttttt')] },
  skirtF: { oy: 18, rows: ['...ccccc', '..cccccc', '..cccccc', '...bbbb.', '..bbbbb.'] },
  skirtS: { oy: 18, rows: [FS(3, 'cccccc'), FS(2, 'ccccccc'), FS(2, 'ccccccc'), FS(3, 'bbbb'), FS(2, 'bbbbb')] },
};
/* ---------- hair / headgear (F = front half, B = back half, S = side facing left) ---------- */
const NH = {
  spiky: { F: { oy: 0, rows: ['.....h.h', '...h.hhh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '..hhshhs', '..h.....', '..h.....'] }, B: { oy: 0, rows: ['.....h.h', '...h.hhh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '..hhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh', '....hhhh'] },
    S: { oy: 0, rows: [FS(5, 'h.h.h'), FS(3, 'hhhhhhh.h'), FS(2, 'hhhhhhhhhh'), FS(2, 'hhhhhhhhhhh'), FS(2, 'hhhhhhhhhhh'), FS(3, 'shhhhhhhh'), FS(6, 'hhhhh'), FS(6, 'hhhhh'), FS(7, 'hhhh'), FS(7, 'hhh')] } },
  longBlonde: { F: { oy: 1, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhsshs', '.hh.....', '.hh.....', '.hh.....', '.hh.....', '.hh.....', '..h.....'] }, B: { oy: 1, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh'] },
    S: { oy: 1, rows: [FS(4, 'hhhhh'), FS(3, 'hhhhhhh'), FS(2, 'hhhhhhhhh'), FS(2, 'hhhhhhhhhh'), FS(2, 'hhhhhhhhhh'), FS(3, 'shhhhhhhh'), FS(6, 'hhhhhh'), FS(6, 'hhhhhh'), FS(6, 'hhhhhh'), FS(7, 'hhhhh'), FS(7, 'hhhh'), FS(8, 'hhh')] } },
  ponytail: { F: { oy: 1, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '..hhshhs', '..h.....', '..h.....', '..h.....'] }, B: { oy: 0, rows: ['......hh', '....hhhh', '...hhhhh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '..hhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh', '.....hhh', '......hh', '......hh'] },
    S: { oy: 0, rows: [FS(9, 'hhh'), FS(4, 'hhhhh.hhhh'), FS(3, 'hhhhhhhhhhh'), FS(2, 'hhhhhhhhhhh'), FS(2, 'hhhhhhhhhh.hh'), FS(3, 'shhhhhh..hh'), FS(6, 'hhhh...hh'), FS(6, 'hhh.....h'), FS(7, 'hh')] } },
  hood: { F: { oy: 1, rows: ['.....aaa', '...aaaaa', '..aaaaaa', '.aaaaaaa', '.aaaddda', '.aaddddd', '.aadddd.', '.aa.....', '.aa.....', '.aa.....', '..aa....'] }, B: { oy: 1, rows: ['.....aaa', '...aaaaa', '..aaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '..aaaaaa', '..aaaaaa'] },
    S: { oy: 1, rows: [FS(4, 'aaaa'), FS(3, 'aaaaaa'), FS(2, 'aaaaaaaa'), FS(2, 'aaaaaaaaa'), FS(1, 'adddaaaaaa'), FS(1, 'addddaaaaa'), FS(2, 'ddddaaaa'), FS(5, 'aaaaaa'), FS(5, 'aaaaaa'), FS(5, 'aaaaa'), FS(6, 'aaaa')] } },
  wizard: { F: { oy: 0, rows: ['......aa', '.....aaa', '....aaaa', '....aaaa', '...agggg', '.aaaaaaa', 'aaaaaaaa', '..dddddd'] }, B: { oy: 0, rows: ['.....aa.', '.....aaa', '....aaaa', '....aaaa', '...agggg', '.aaaaaaa', 'aaaaaaaa', '..aaaaaa', '..aaaaaa'] },
    S: { oy: 0, rows: [FS(11, 'aa'), FS(9, 'aaaa'), FS(7, 'aaaaa'), FS(6, 'aaaaa'), FS(4, 'ggggggg'), FS(1, 'aaaaaaaaaaa'), FS(0, 'aaaaaaaaaaaaa'), FS(2, 'ddddaaaa'), FS(6, 'aaa')] } },
  mitre: { F: { oy: 0, rows: ['.....aaa', '....aaaa', '....aaLa', '....aLLL', '....aaLa', '...aaaaa', '...ggggg', '..h.....'] }, B: { oy: 0, rows: ['.....aaa', '....aaaa', '....aaaa', '....aaaa', '....aaaa', '...aaaaa', '...ggggg', '..hhhhhh', '..hhhhhh'] },
    S: { oy: 0, rows: [FS(5, 'aaa'), FS(4, 'aaaaa'), FS(4, 'aaLaa'), FS(4, 'aLLLa'), FS(4, 'aaLaa'), FS(3, 'aaaaaa'), FS(3, 'gggggg'), FS(6, 'hhhh'), FS(7, 'hh')] } },
  whiteHood: { F: { oy: 1, rows: ['.....aaa', '...aaaQa', '..aaaQQQ', '.aaaaaQa', '.aaahhhh', '.aahhshs', '.ahh....', '.ah.....', '.aa.....', '.aa.....', '..a.....'] }, B: { oy: 1, rows: ['.....aaa', '...aaaaa', '..aaaQaa', '.aaaQQQa', '.aaaaQaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '..aaaaaa', '..QQQQQQ'] },
    S: { oy: 1, rows: [FS(4, 'aaaa'), FS(3, 'aaaQaa'), FS(2, 'aaaQQQaa'), FS(2, 'aaaaQaaaa'), FS(2, 'hhhaaaaaa'), FS(2, 'shhaaaaaa'), FS(5, 'haaaaa'), FS(6, 'aaaaa'), FS(6, 'aaaaa'), FS(6, 'aaaa'), FS(7, 'QQQ')] } },
  straw: { F: { oy: 1, rows: ['.....aaa', '....aaaa', '...aaaaa', '...ttttt', 'aaaaaaaa', '.aaaaaaa', '..h.....'] }, B: { oy: 1, rows: ['.....aaa', '....aaaa', '...aaaaa', '...ttttt', 'aaaaaaaa', '.aaaaaaa', '..hhhhhh', '..hhhhhh'] },
    S: { oy: 1, rows: [FS(5, 'aaa'), FS(4, 'aaaaa'), FS(3, 'aaaaaaa'), FS(3, 'ttttttt'), FS(0, 'aaaaaaaaaaaaa'), FS(1, 'aaaaaaaaaaa'), FS(5, 'hhhh')] } },
  bandana: { F: { oy: 2, rows: ['....aaaa', '..aaaaaa', '.aaaaaaa', '.aaWaaWa', '.hhaaaaa', '..h.....'] }, B: { oy: 2, rows: ['....aaaa', '..aaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '..hhhhhh', '..hhhhhh', '...hhhhh', '......aa', '.....aa.'] },
    S: { oy: 2, rows: [FS(4, 'aaaaa'), FS(3, 'aaaaaaa'), FS(2, 'aaaaaaaaa'), FS(2, 'aaaaaaaaaa'), FS(3, 'saaaaaaaaa'), FS(6, 'hhhh.aa'), FS(6, 'hhhh..a')] } },
  kerchief: { F: { oy: 1, rows: ['....aaaa', '...aaaaa', '..aaWaWa', '.aaaaaaa', '.hhhhhhh', '.hhhsshs', '.hh.....', '.hh.....', '..h.....'] }, B: { oy: 1, rows: ['....aaaa', '...aaaaa', '..aaWaWa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '..aaaaaa', '..hhhhhh', '..hhhhhh', '...hhhhh'] },
    S: { oy: 1, rows: [FS(4, 'aaaa'), FS(3, 'aaaaaaa'), FS(2, 'aaWaWaaa'), FS(2, 'aaaaaaaaa'), FS(2, 'hhhhaaaaaa'), FS(2, 'shhhaaaaa'), FS(5, 'hhhhhh'), FS(6, 'hhhhh'), FS(7, 'hhh')] } },
  headband: { F: { oy: 1, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '.WWWWWWW', '.hWWWWWW', '..hhshhs', '..h.....'] }, B: { oy: 1, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '.WWWWWWW', '.hhhhhhh', '.hhhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh', '......WW'] },
    S: { oy: 1, rows: [FS(4, 'hhhh'), FS(3, 'hhhhhhh'), FS(2, 'hhhhhhhhh'), FS(2, 'WWWWWWWWW'), FS(2, 'hhhhhhhhhWW'), FS(3, 'shhhhhh.W'), FS(6, 'hhhhh'), FS(7, 'hhh')] } },
  greenLong: { F: { oy: 1, rows: ['....hhhh', '...hhhgh', '..hhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhsshs', '.hh.....', '.hh.....', '.hh.....', '.hh.....', '.hh.....', '..h.....'] }, B: { oy: 1, rows: ['....hhhh', '...hhhhh', '..hhhhgh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '.hhhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh'] },
    S: { oy: 1, rows: [FS(4, 'hhhhh'), FS(3, 'hhhhhgh'), FS(2, 'hhhhhhhhh'), FS(2, 'hhhhhhhhhh'), FS(2, 'hhhhhhhhhh'), FS(3, 'shhhhhhhh'), FS(6, 'hhhhhh'), FS(6, 'hhhhhh'), FS(6, 'hhhhhh'), FS(7, 'hhhhh'), FS(7, 'hhhh'), FS(8, 'hhh')] } },
  helmet: { F: { oy: 1, rows: ['.....mmm', '...mmmmm', '..mmmmmm', '.mmmmmmm', '.mmmXmmm', '.mmm.... ', '.mm.....', '.mm.....'] }, B: { oy: 1, rows: ['.....mmm', '...mmmmm', '..mmmmmm', '.mmmmmmm', '.mmmmmmm', '.mmmmmmm', '.mmmmmmm', '..mmmmmm', '..mmmmmm'] },
    S: { oy: 1, rows: [FS(5, 'mmmm'), FS(3, 'mmmmmmm'), FS(2, 'mmmmmmmmm'), FS(2, 'mmmmmmmmmm'), FS(1, 'mmmXmmmmmm'), FS(5, 'mmmmmm'), FS(6, 'mmmmm'), FS(7, 'mmmm')] } },
  scholar: { F: { oy: 1, rows: ['....aaaa', '..aaaaaa', '.aaaaaaa', '..gggggg', '..hhhhhh', '..h.....', '..XXXX.X', '...X..X.'] }, B: { oy: 1, rows: ['....aaaa', '..aaaaaa', '.aaaaaaa', '..gggggg', '..hhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh'] },
    S: { oy: 1, rows: [FS(4, 'aaaaa'), FS(3, 'aaaaaaaa'), FS(2, 'aaaaaaaaaa'), FS(3, 'gggggggg'), FS(4, 'hhhhhhh'), FS(6, 'hhhhh'), FS(1, 'XXX.hhhhh'), FS(2, 'X.Xhhhh')] } },
  bald: { F: { oy: 6, rows: ['..h.....', '..h.....', '..h.....'] }, B: { oy: 5, rows: ['...sssss', '..hhhhhh', '..hhhhhh', '..hhhhhh'] }, S: { oy: 6, rows: [FS(7, 'hhh'), FS(7, 'hhh'), FS(7, 'hh')] } },
  short: { F: { oy: 2, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '..hhhhhh', '..hhshss', '..h.....'] }, B: { oy: 2, rows: ['....hhhh', '...hhhhh', '..hhhhhh', '..hhhhhh', '..hhhhhh', '..hhhhhh', '...hhhhh', '....hhhh'] },
    S: { oy: 2, rows: [FS(4, 'hhhhh'), FS(3, 'hhhhhhh'), FS(2, 'hhhhhhhhh'), FS(2, 'hhhhhhhhh'), FS(3, 'shhhhhh'), FS(6, 'hhhh'), FS(7, 'hhh')] } },
};
/* ---------- body overlays ---------- */
const NO = {
  heroArmor: { F: { oy: 12, rows: ['..kgcccc', '.kcccgcc', '.kucccgc', '.kucgggg', '.kucccgc', '.kstttgt', '.kkccccc', '.kkpppp.', '..kpppp.', '...bbbb.', '..bbbbb.'] }, B: { oy: 12, rows: ['..kkkkkk', '.kkkkkkk', '.kkkkkkk', '.kkkkkkk', '.kkkkkkk', '.kkkkkkk', '.kkkkkkk', '.kkkkkkk', '..kkkkkk', '...bbbb.', '..bbbbb.'] },
    S: { oy: 12, rows: [FS(4, 'ggccc'), FS(3, 'ccccckk'), FS(3, 'ccuccckk'), FS(3, 'ccuccckkk'), FS(3, 'ccucckkkk'), FS(3, 'tsttkkkk'), FS(3, 'cccckkkk'), FS(4, 'ppp.kkk'), FS(4, 'ppp..kk'), FS(3, 'bbbb'), FS(2, 'bbbbb')] } },
  swordArmor: { F: { oy: 12, rows: ['..mmcccc', '.mmmmmmm', '.mucmmmm', '..ucmmmm', '..uccccc', '..sttgtt', '..kccccc', '...pppp.', '...pppp.', '...bbbb.', '..bbbbb.'] }, B: { oy: 12, rows: ['..mmcccc', '.mmmkkkk', '.mukkkkk', '..ukkkkk', '..ukkkkk', '..uttttt', '...ccccc', '...pppp.', '...pppp.', '...bbbb.', '..bbbbb.'] },
    S: { oy: 12, rows: [FS(3, 'mmmccc'), FS(2, 'mmmmmmk'), FS(3, 'mmuccckk'), FS(3, 'ccuccck'), FS(3, 'ccuccc'), FS(3, 'tsgttt'), FS(3, 'cccccc'), FS(4, 'ppp'), FS(4, 'ppp'), FS(3, 'bbbb'), FS(2, 'bbbbb')] } },
  cloak: { F: { oy: 12, rows: ['..aaaaaa', '.aaaccca', '.aauccca', '.aauccca', '.aagcccc', '.aasttta', '.aaccccc', '.aaccccc', '.aagggga', '...bbbb.', '..bbbbb.'] }, B: { oy: 12, rows: ['..aaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.aaaaaaa', '.agggggg', '...bbbb.', '..bbbbb.'] },
    S: { oy: 12, rows: [FS(3, 'aaaaaa'), FS(2, 'aaccaaaa'), FS(2, 'acucaaaaa'), FS(2, 'acucaaaaa'), FS(2, 'acuccaaaa'), FS(2, 'atstaaaaa'), FS(2, 'acccaaaaa'), FS(2, 'acccaaaa'), FS(2, 'gggggggg'), FS(3, 'bbbb'), FS(2, 'bbbbb')] } },
  robeTrim: { F: { oy: 12, rows: ['....gggg', '...ccgcc', '..ucccgc', '..ucccgc', '..ucccgc', '..scccgc', '...cccgc', '...cccgc', '..ccccgc', '..ccccgc', '..gggggg'] }, B: { oy: 12, rows: [], }, S: { oy: 12, rows: [FS(4, 'gggg'), FS(3, 'cgcccc'), FS(3, 'cgucccc'), FS(3, 'cgucccc'), FS(3, 'cgucccc'), FS(3, 'gscccc'), FS(3, 'gccccc'), FS(3, 'gccccc'), FS(2, 'cgccccc'), FS(2, 'cgccccc'), FS(2, 'ggggggg')] } },
  priestRobe: { F: { oy: 12, rows: ['....gggg', '...cLLcc', '..ucLccc', '..ucLccc', '..ucLLLL', '..scLccc', '...cLccc', '...cLccc', '..ccLccc', '..ccLccc', '..LLLLLL'] }, B: { oy: 12, rows: ['....gggg', '...ccccc', '..uccccc', '..uccccc', '..uccccc', '..uccccc', '...ccccc', '...ccccc', '..cccccc', '..cccccc', '..LLLLLL'] },
    S: { oy: 12, rows: [FS(4, 'gggg'), FS(3, 'cLcccc'), FS(3, 'cLucccc'), FS(3, 'cLucccc'), FS(3, 'LLucccc'), FS(3, 'Lscccc'), FS(3, 'Lccccc'), FS(3, 'Lccccc'), FS(2, 'cLccccc'), FS(2, 'cLccccc'), FS(2, 'LLLLLLL')] } },
  overalls: { F: { oy: 12, rows: ['....cccc', '...cvccc', '..ucvvvv', '..ucvvvv', '..ucvvvv', '..svvvvv', '...vvvvv', '...vvvv.', '...vvvv.', '...bbbb.', '..bbbbb.'] }, B: { oy: 12, rows: ['....cccc', '...cvccc', '..ucvccc', '..ucvvvv', '..ucvvvv', '..uvvvvv', '...vvvvv', '...vvvv.', '...vvvv.', '...bbbb.', '..bbbbb.'] }, S: { oy: 12, rows: [FS(4, 'cccc'), FS(3, 'cvcccc'), FS(3, 'vvuccv'), FS(3, 'vvuvvv'), FS(3, 'vvuvvv'), FS(3, 'vsvvv'), FS(3, 'vvvvvv'), FS(4, 'vvv'), FS(4, 'vvv'), FS(3, 'bbbb'), FS(2, 'bbbbb')] } },
  apron: { F: { oy: 14, rows: ['....nnnn', '....nnnn', '....nnnn', '....nnnn', '....nnnn', '....nnnn', '....nnn.'] }, B: { oy: 17, rows: ['..tttttt'] }, S: { oy: 14, rows: [FS(2, 'nn'), FS(2, 'nn'), FS(2, 'nn'), FS(2, 'nnn'), FS(2, 'nn'), FS(2, 'nn'), FS(3, 'n')] } },
  vest: { F: { oy: 12, rows: ['....vvcc', '...vvvcc', '..uvvvcc', '..uvvvcc', '..uvvvcc'] }, B: { oy: 12, rows: ['....vvvv', '...vvvvv', '..uvvvvv', '..uvvvvv', '..uvvvvv'] }, S: { oy: 12, rows: [FS(4, 'vvvv'), FS(3, 'vvvvvv'), FS(3, 'vvuvvv'), FS(3, 'vvuvvv'), FS(3, 'vvuvvv')] } },
  bareArms: { F: { oy: 12, rows: ['..s.....', '.ss.....', '.ss.....', '.ss.....', '.ss.....', '.ss.....'] }, B: { oy: 12, rows: ['..s.....', '.ss.....', '.ss.....', '.ss.....', '.ss.....', '.ss.....'] }, S: { oy: 13, rows: [FS(5, 's'), FS(5, 'ss'), FS(5, 'ss'), FS(5, 'ss'), FS(5, 'ss')] } },
  pack: { F: { oy: 12, rows: ['.ww.....', '.ww.....', 'www.....', 'www.....', 'www.....', '.ww.....'] }, B: { oy: 11, rows: ['..wwwwww', '.wwwwwww', '.wwgwwww', '.wwwwwww', '.wwtttww', '.wwwwwww', '.wwwwwww', '..wwwwww'] }, S: { oy: 11, rows: [FS(8, 'www'), FS(8, 'wwww'), FS(8, 'wwwww'), FS(8, 'wwwgw'), FS(8, 'wwwww'), FS(8, 'wttww'), FS(8, 'wwwww'), FS(8, 'wwww')] } },
  smallPack: { F: { oy: 13, rows: [] }, B: { oy: 13, rows: ['...wwwww', '...wwwww', '...wwwww', '....wwww'] }, S: { oy: 13, rows: [FS(8, 'ww'), FS(8, 'www'), FS(8, 'www'), FS(8, 'ww')] } },
  coat: { F: { oy: 12, rows: ['....cgcc', '...ccgcc', '..ucccgc', '..ucccgc', '..ucccgc', '..scccgc', '...cccgc', '...cccgc', '...cccgc', '...bbbb.', '..bbbbb.'] }, B: { oy: 12, rows: ['....cccc', '...ccccc', '..uccccc', '..uccccc', '..uccccc', '..uccccc', '...ccccc', '...ccccc', '...ccccc', '...bbbb.', '..bbbbb.'] }, S: { oy: 12, rows: [FS(4, 'gccc'), FS(3, 'gcccc'), FS(3, 'gcuccc'), FS(3, 'gcuccc'), FS(3, 'gcuccc'), FS(3, 'gsccc'), FS(3, 'gccccc'), FS(3, 'gccccc'), FS(3, 'gccccc'), FS(3, 'bbbb'), FS(2, 'bbbbb')] } },
};
/* ---------- held items (full rows; front = right hand on the sprite's left side) ---------- */
const NI = {
  sword: { F: { oy: 4, rows: [FS(0, 'm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'mm'), FS(0, 'gggg'), FS(1, 'ws'), FS(1, 'w')] }, S: { oy: 9, rows: [FS(1, 'm'), FS(1, 'm'), FS(1, 'm'), FS(1, 'm'), FS(1, 'm'), FS(1, 'm'), FS(0, 'ggg'), FS(1, 'w'), FS(1, 'w')] } },
  shield: { F: { oy: 14, rows: [FS(12, 'gggg'), FS(11, 'gLgLLg'), FS(11, 'gggggg'), FS(11, 'gLgLLg'), FS(12, 'gLLg'), FS(13, 'gg')] }, S: { oy: 14, rows: [FS(3, 'ggg'), FS(2, 'gLgLg'), FS(2, 'ggggg'), FS(2, 'gLgLg'), FS(3, 'gLg'), FS(4, 'g')] } },
  dagger: { F: { oy: 16, rows: [FS(1, 'm'), FS(1, 'm'), FS(0, 'gg'), FS(1, 'w')] }, S: { oy: 16, rows: [FS(1, 'm'), FS(1, 'm'), FS(1, 'g'), FS(2, 'w')] } },
  staff: { F: { oy: 6, rows: [FS(0, 'gLg'), FS(0, 'LLL'), FS(0, 'gLg'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] }, S: { oy: 6, rows: [FS(0, 'gLg'), FS(0, 'LLL'), FS(0, 'gLg'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] } },
  scepter: { F: { oy: 8, rows: [FS(0, 'ggg'), FS(0, 'gLg'), FS(0, 'ggg'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g')] }, S: { oy: 8, rows: [FS(0, 'ggg'), FS(0, 'gLg'), FS(0, 'ggg'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g'), FS(1, 'g')] } },
  fork: { F: { oy: 7, rows: [FS(0, 'm.m'), FS(0, 'm.m'), FS(0, 'mmm'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] }, S: { oy: 7, rows: [FS(0, 'm.m'), FS(0, 'm.m'), FS(0, 'mmm'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] } },
  hammer: { F: { oy: 12, rows: [FS(0, 'mmmm'), FS(0, 'mmmm'), FS(0, 'mmmm'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] }, S: { oy: 12, rows: [FS(0, 'mmm'), FS(0, 'mmm'), FS(0, 'mmm'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] } },
  bouquet: { F: { oy: 15, rows: [FS(12, 'QYQ'), FS(12, 'YNY'), FS(13, 'N'), FS(13, 'N')] }, S: { oy: 15, rows: [FS(1, 'QYQ'), FS(1, 'YNY'), FS(2, 'N'), FS(2, 'N')] } },
  pouch: { F: { oy: 17, rows: [FS(4, 'ww'), FS(4, 'ww')] }, S: { oy: 17, rows: [FS(6, 'ww'), FS(6, 'ww')] } },
  shieldShow: { F: { oy: 14, rows: [FS(0, 'mmmm'), FS(0, 'mLgm'), FS(0, 'mggm'), FS(0, 'mLLm'), FS(1, 'mm')] }, S: { oy: 14, rows: [] } },
  book: { F: { oy: 15, rows: [FS(5, 'aaaaaa'), FS(5, 'aWWWWa'), FS(5, 'aaaaaa'), FS(10, 'W')] }, S: { oy: 15, rows: [FS(2, 'aaaa'), FS(2, 'aWWa'), FS(2, 'aaaa')] } },
  cane: { F: { oy: 13, rows: [FS(1, 'ww'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w'), FS(1, 'w')] }, S: { oy: 13, rows: [FS(0, 'ww'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w'), FS(0, 'w')] } },
  weaponsBack: { B: { oy: 7, rows: [FS(4, 'm..g...m'), FS(4, 'm..m..mm'), FS(4, 'm..m..mm'), FS(4, 'w..m...w'), FS(4, 'w..w...w')] }, S: { oy: 7, rows: [FS(10, 'm.g'), FS(10, 'm.m'), FS(10, 'm.m'), FS(10, 'w.m')] } },
  armorBack: { B: { oy: 8, rows: [FS(5, 'mmmmmm'), FS(4, 'mmmmmmmm'), FS(4, 'mmXmmXmm')] }, S: { oy: 8, rows: [FS(10, 'mmmm'), FS(10, 'mmmmm'), FS(10, 'mXmmm')] } },
};
/* ---------- job designs (palette + parts) ---------- */
const NJ = {
  hero: { M: { hair: 'spiky', h: NP.blue, body: 'heroArmor', c: NP.blue, g: NP.gold, k: NP.red, p: NP.blue, b: NP.brown, items: ['sword', 'shield'], circ: 1 }, F: { hair: 'longBlonde', h: NP.gold, body: 'heroArmor', c: NP.blue, g: NP.gold, k: NP.red, p: NP.blue, b: NP.brown, items: ['sword', 'shield'], bow: NP.red } },
  warrior: { M: { hair: 'spiky', h: NP.brown, body: 'swordArmor', c: NP.red, m: NP.silver, k: NP.red, p: NP.brown2, b: NP.brown, items: ['sword'], hv: 1 }, F: { hair: 'ponytail', h: NP.red, body: 'swordArmor', c: NP.red, m: NP.silver, k: NP.red, p: NP.brown2, b: NP.brown, items: ['sword'], hv: 1 } },
  thief: { M: { hair: 'hood', a: NP.black, d: '#4a3a34', body: 'cloak', c: '#3a3644', g: NP.gold, b: NP.brown, items: ['dagger'], shade: 1 }, F: { hair: 'hood', a: '#5a3a6a', d: '#c89a70', body: 'cloak', c: '#4a3458', g: NP.gold, b: NP.brown, items: ['dagger'], blondeFringe: 1 } },
  mage: { M: { hair: 'wizard', a: NP.blue, d: '#3a3040', g: NP.gold, body: 'robe', over: 'robeTrim', c: NP.blue, b: NP.brown, items: ['staff'], shade: 1 }, F: { hair: 'wizard', a: NP.red, d: '#4a3030', g: NP.gold, body: 'robe', over: 'robeTrim', c: NP.red, b: NP.brown, items: ['staff'] } },
  priest: { M: { hair: 'mitre', a: NP.white, h: NP.silver, g: NP.gold, body: 'robe', over: 'priestRobe', c: NP.white, b: NP.brown, items: ['scepter'] }, F: { hair: 'whiteHood', a: NP.white, h: NP.gold, g: NP.gold, body: 'robe', over: 'priestRobe', c: NP.white, b: NP.brown, items: ['scepter'], cross: NP.red } },
  farmer: { M: { hair: 'straw', a: NP.tan, t: NP.brown, h: NP.brown, body: 'body', over: 'overalls', c: NP.green, v: '#3a6a3a', b: NP.brown, items: ['fork'], back: 'smallPack', w: NP.brown, hv: 1 }, F: { hair: 'straw', a: NP.tan, t: NP.brown, h: NP.brown, body: 'body', skirt: NP.pink, c: NP.green, b: NP.brown, items: ['fork'], back: 'smallPack', w: NP.brown, hv: 1 } },
  merchant: { M: { hair: 'bandana', a: NP.blue, h: NP.brown, body: 'body', c: NP.green, t: NP.brown, p: NP.brown2, b: NP.brown, back: 'pack', w: NP.brown, items: [] }, F: { hair: 'kerchief', a: NP.red, h: NP.gold, body: 'body', c: NP.blue, t: NP.brown, p: NP.brown2, b: NP.brown, back: 'pack', w: NP.brown, items: [] } },
  smith: { M: { hair: 'headband', h: NP.black, body: 'body', over: 'vest', v: NP.gray2, bare: 1, n: NP.leather, c: NP.gray2, p: NP.navy, b: NP.brown, items: ['hammer'], hv: 1 }, F: { hair: 'kerchief', a: NP.red, h: NP.brown, body: 'body', over: 'vest', v: NP.gray2, bare: 1, n: NP.leather, c: NP.gray2, p: NP.navy, b: NP.brown, items: ['hammer'], hv: 1 } },
  herbalist: { M: { hair: 'greenLong', h: '#3a9a78', g: NP.gold, body: 'robe', over: 'robeTrim', c: NP.white, gT: NP.green, b: NP.brown, items: ['bouquet', 'pouch'], w: NP.brown }, F: { hair: 'kerchief', a: NP.white, h: NP.gold, body: 'robe', c: NP.green, n: NP.white, apronF: 1, b: NP.brown, items: ['bouquet', 'pouch'], w: NP.brown } },
  weaponer: { M: { hair: 'bandana', a: NP.red, h: NP.brown, body: 'body', over: 'vest', v: NP.red, c: NP.blue, n: NP.white, p: NP.brown2, b: NP.brown, back: 'pack', w: NP.brown, items: ['weaponsBack'] }, F: { hair: 'bandana', a: NP.red, h: NP.gold, body: 'body', c: NP.blue, n: NP.white, p: NP.brown2, b: NP.brown, back: 'pack', w: NP.brown, items: ['weaponsBack'] } },
  armorer: { M: { hair: 'helmet', m: NP.gray, body: 'body', c: NP.blue, p: NP.brown2, b: NP.brown, back: 'pack', w: NP.brown, items: ['shieldShow', 'armorBack'] }, F: { hair: 'kerchief', a: NP.white, h: NP.gold, body: 'body', skirt: NP.blue, c: NP.blue, n: NP.white, b: NP.brown, back: 'pack', w: NP.brown, items: ['armorBack'] } },
  historian: { M: { hair: 'scholar', a: NP.navy, g: NP.gold, h: NP.brown, body: 'body', over: 'coat', c: NP.navy, b: NP.brown, items: ['book'] }, F: { hair: 'scholar', a: NP.navy, g: NP.gold, h: NP.brown, body: 'body', over: 'coat', c: NP.navy, b: NP.brown, items: ['book'] } },
};
NJ.swordsman = NJ.warrior;
const NHAIR_VAR = { warrior: [[NP.brown, NP.red], ['#3a2a20', '#e0b050'], ['#c8a060', '#5a3020']], smith: [[NP.black, NP.brown], ['#6a4a2a', '#3a2a20'], ['#a0a0a8', '#c85a30']], farmer: [[NP.brown, NP.brown], ['#3a2a20', '#e0b050'], ['#c8a060', '#6a4a2a']], herbalist: [['#3a9a78', NP.gold], ['#2a7a90', '#c87840'], ['#6aa848', '#f0d080']] };
const NSKIN = ['#f3d4b8', '#dca478', '#a8724a'];
/* ---------- compositor ---------- */
function npcGrid(role, sex, view, frame, opt) {
  const J = (NJ[role] || NJ.farmer)[sex === 'F' ? 'F' : 'M']; const g = emptyGrid(16, 24); opt = opt || {};
  const half = (o, mir) => o && o.rows && o.rows.length && blit(g, o.rows.map(r => r.slice(0, 8)), 0, o.oy + (opt.dy || 0), true);
  const full = (o) => o && o.rows && o.rows.length && blit(g, o.rows, 0, o.oy + (opt.dy || 0), false);
  const robe = J.body === 'robe'; const BO = NO[J.body] || null; // armour / cloak replace the plain body
  const body = view === 'S' ? (robe ? NB.robeS : NB.bodyS) : view === 'B' ? (robe ? NB.robeB : NB.bodyB) : (robe ? NB.robeF : NB.bodyF);
  if (view === 'S') { if (J.back) full(NO[J.back].S); full(body); if (J.skirt) full(NB.skirtS); if (BO) full(BO.S); if (J.over) full(NO[J.over].S); if (J.bare) full(NO.bareArms.S); if (J.n && !J.apronF) full(NO.apron.S); if (J.apronF) full(NO.apron.S); }
  else if (view === 'B') { half(body); if (J.skirt) half(NB.skirtF); if (BO) half(BO.B); if (J.over && NO[J.over].B.rows.length) half(NO[J.over].B); if (J.bare) half(NO.bareArms.B); if (J.back) half(NO[J.back].B); }
  else { if (J.back === 'pack') half(NO.pack.F); half(body); if (J.skirt) half(NB.skirtF); if (BO) half(BO.F); if (J.over) half(NO[J.over].F); if (J.bare) half(NO.bareArms.F); if (J.n || J.apronF) half(NO.apron.F); }
  // head
  if (view === 'S') full(NB.faceS); else if (view === 'F') half(NB.faceF); else blit(g, NB.faceF.rows.map(r => r.replace(/[er]/g, 's')), 0, NB.faceF.oy + (opt.dy || 0), true);
  const H = NH[opt.bald ? 'bald' : J.hair]; if (view === 'S') full(H.S); else half(H[view === 'B' ? 'B' : 'F']);
  if (view === 'F' && J.circ) blit(g, ['..gggggg'], 0, 4 + (opt.dy || 0), true);
  if (view === 'F' && J.bow) blit(g, ['.....QQQ', '......Q.'], 0, 0, true);
  if (J.shade && view !== 'B') { for (let y = 5; y < 12; y++) for (let x = 0; x < 16; x++) if (g[y][x] === 's') g[y][x] = 'd'; for (let y = 6; y < 10; y++) for (let x = 0; x < 16; x++) if (g[y][x] === 'e') g[y][x] = 'Y'; }
  if (opt.beard && view !== 'B') { if (view === 'S') blit(g, [FS(2, 'hhhh'), FS(3, 'hhh'), FS(3, 'hh')], 0, 10, false); else blit(g, ['...hhhhh', '....hhhh', '.....hhh'], 0, 10, true); }
  // items
  for (const it of (opt.noItems ? [] : J.items)) { const I = NI[it]; if (!I) continue; if (view === 'F' && I.F) full(I.F); else if (view === 'S' && I.S) full(I.S); else if (view === 'B' && I.B) full(I.B); }
  if (opt.cane) full(view === 'S' ? NI.cane.S : NI.cane.F);
  return g;
}
function npcRamps(h, role) {
  const J = (NJ[role] || NJ.farmer)[h.sex === 'F' ? 'F' : 'M']; const L = h.look || {}; const elder = h.age >= 56; const v = NPC_VARIANTS ? ((L.hair || 0) + (L.style || 0)) % 3 : 0;
  const sk = NSKIN[NPC_VARIANTS ? (L.skin || 0) % 3 : 0]; let hair = J.h || NP.brown; const hv = NHAIR_VAR[role]; if (hv && NPC_VARIANTS) hair = hv[v][h.sex === 'F' ? 1 : 0];
  const dim = hex => elder ? mixHex(hex, '#8f8a84', 0.35) : hex;
  if (elder) hair = h.sex === 'F' ? '#d8d4dc' : '#e8e6ee';
  const R = { s: { o: '#181020', d: mixHex(sk, '#9a5a44', 0.32), b: sk, l: mixHex(sk, '#fff6ea', 0.35), h: mixHex(sk, '#fff6ea', 0.35) }, h: mkRamp(hair), c: mkRamp(dim(J.c || NP.green)), t: mkRamp(J.t || NP.brown), p: mkRamp(J.p || NP.brown2), b: mkRamp(J.b || NP.brown), m: mkRamp(J.m || NP.silver), w: mkRamp(J.w || NP.brown), g: mkRamp(J.gT || J.g || NP.gold), k: mkRamp(J.k || NP.red), a: mkRamp(dim(J.a || NP.brown)), v: mkRamp(dim(J.v || J.c || NP.green)), n: mkRamp(J.n || NP.white), d: mkRamp(J.d || '#4a3a34') };
  R.u = { o: R.c.o, d: R.c.d, b: R.c.d, l: R.c.b, h: R.c.b }; if (J.skirt) { R.skirtC = mkRamp(J.skirt); }
  Object.keys(R).forEach(k => { const r = R[k]; if (k !== 's' && k !== 'h' && k !== 'c' && k !== 'm' && k !== 'a') R[k] = { o: r.o, d: r.d, b: r.b, l: r.b, h: r.b }; });
  return R;
}
/* walking: legs alternate (front/back) or stride (side); idle bob; attack lean */
function npcAnimate(g, view, frame, robe) {
  const wf = frame < 4 ? frame : 0; const out = g.map(r => r.slice());
  if ((wf === 1 || wf === 3) && !robe) {
    if (view === 'S') { for (let y = 19; y < 23; y++) { const r = out[y]; const legs = r.slice(); for (let x = 0; x < 16; x++) out[y][x] = '.'; legs.forEach((c, x) => { if (c === '.') return; const nx = x + ((x % 2) ? 1 : -1) * (wf === 1 ? 1 : -1); if (nx >= 0 && nx < 16) out[y][nx] = c; }); } }
    else { const side = wf === 1 ? [0, 8] : [8, 16]; for (let y = 19; y < 23; y++) for (let x = side[0]; x < side[1]; x++) { out[y - 1][x] = out[y][x] !== '.' ? out[y][x] : out[y - 1][x]; } for (let x = side[0]; x < side[1]; x++) out[22][x] = '.'; }
  }
  if (frame === 4 || ((wf === 1 || wf === 3) && robe)) { for (let y = 0; y < 21; y++) out[y] = out[y + 1].slice(); }
  return out;
}
function childGrid(g) { const out = emptyGrid(16, 24); for (let y = 0; y < 24; y++) { let sy; if (y < 3) continue; const ry = y - 3; sy = ry < 15 ? ry : ry + 3; if (sy < 24) out[y] = g[sy].slice(); } return out; } // drop 3 torso rows: head stays big (~1.8 heads)
function npcSprite(h, dir, frame) {
  const role = h.forceRole || roleOf(h); const child = role === 'child'; const elder = h.age >= 56; const L = h.look || {};
  const jobRole = child ? ((G && G.idx[h.parent] && G.idx[h.parent].job) || h.job || 'farmer') : role; const r2 = jobRole === 'swordsman' ? 'warrior' : jobRole;
  const key = ['n41', r2, h.sex, L.hair, L.style, L.skin, elder ? 1 : 0, child ? 1 : 0, dir, frame].join('.'); if (spriteCache[key]) return spriteCache[key];
  const view = dir === 0 ? 'F' : dir === 1 ? 'B' : 'S';
  const J = (NJ[r2] || NJ.farmer)[h.sex === 'F' ? 'F' : 'M'];
  let g = npcGrid(r2, h.sex, view, frame, { noItems: child || (elder && r2 !== 'priest'), cane: elder && !child, beard: elder && h.sex !== 'F', bald: elder && h.sex !== 'F' && (L.style || 0) % 2 === 0 && !/hood|wizard|mitre|helmet|straw|bandana|kerchief|scholar/.test(J.hair) });
  if (elder) { const o = emptyGrid(16, 24); for (let y = 0; y < 24; y++) for (let x = 0; x < 16; x++) { const sy = y < 12 ? y - 1 : y; const sx = y < 12 ? x + (view === 'S' ? -1 : 0) : x; if (sy >= 0 && sx >= 0 && sx < 16) o[y][x] = g[sy][sx]; } g = o; }
  g = npcAnimate(g, view, frame, J.body === 'robe');
  if (child) g = childGrid(g);
  if (frame === 5) { const o = emptyGrid(16, 24); for (let y = 0; y < 24; y++) for (let x = 0; x < 16; x++) { const sx = x + (view === 'S' ? 1 : 0); if (sx < 16) o[y][x] = g[y][sx]; } g = o; }
  const RM = npcRamps(h, r2); if (J.skirt && RM.skirtC) { for (let y = 18; y < 21; y++) for (let x = 0; x < 16; x++) if (g[y][x] === 'c') g[y][x] = 'p'; RM.p = RM.skirtC; }
  let cv = limitColors(bakeGrid(g, 16, 24, RM, { outlineCol: '#181020' }), 16, [RM.s.d, RM.s.b, RM.s.l, RM.h.d, RM.h.b, RM.h.l, '#181020', '#1c1626']);
  if (dir === 3) { const f = mkCanvas(16, 24), fc = f.getContext('2d'); fc.translate(16, 0); fc.scale(-1, 1); fc.drawImage(cv, 0, 0); cv = f; } // side art faces LEFT; dir 3 = moving right
  spriteCache[key] = cv; return cv;
}
humanSprite = function (h, dir, frame) { return npcSprite(h, dir, frame); };
