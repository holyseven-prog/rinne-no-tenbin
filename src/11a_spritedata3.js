/* ================= V3.4 characters: 2.5-head-tall proportions (head + hair = rows 0..10), 10 hair silhouettes,
   clear 1x2 eyes, narrower female torso, per-job gear variants (3 per job) ================= */
/* face: 10 px wide (x3..12), rows y3..11; eyes 1x2 at x5 / x10 (front) */
SD.headF = ["....ssss", "...sssss", "...sssss", "...sssss", "...ssess", "...ssess", "...ssssr", "....ssss", ".....sss"];
SD.headS = [Rw(6, "sssss"), Rw(5, "sssssss"), Rw(5, "ssssssss"), Rw(5, "ssssssss"), Rw(5, "sssssess"), Rw(5, "sssssess"), Rw(5, "ssssssrs"), Rw(6, "ssssss"), Rw(7, "ssss")];
/* hair styles from a few parameters -> front (left half, mirrored), back and side (facing right) */
const HAIR_SPEC = [
  { top: 'round', vol: 0, len: 1, bang: 'split' },              // 0 short
  { top: 'round', vol: 0, len: 9, bang: 'full' },               // 1 long straight
  { top: 'round', vol: 0, len: 5, bang: 'full' },               // 2 bob
  { top: 'round', vol: 1, len: 3, bang: 'split', curl: 1 },     // 3 big curly
  { top: 'bald', vol: 0, len: 2, bang: 'none' },                // 4 bald (elder)
  { top: 'round', vol: 0, len: 3, bang: 'side' },               // 5 swept, ear-length
  { top: 'spiky', vol: 1, len: 2, bang: 'spiky' },              // 6 spiky (hero)
  { top: 'round', vol: 0, len: 2, bang: 'full', tails: 1 },     // 7 twin tails
  { top: 'bun', vol: 0, len: 1, bang: 'split' },                // 8 bun
  { top: 'flat', vol: 0, len: 0, bang: 'none' },                // 9 crew cut
];
function hairRowsFront(sp) {
  const rows = {}; const put = (y, x0, x1, ch) => { if (!rows[y]) rows[y] = '........'.split(''); for (let x = Math.max(0, x0); x <= Math.min(7, x1); x++) rows[y][x] = ch || 'h'; };
  if (sp.top === 'bald') { for (let y = 6; y < 6 + sp.len + 1; y++) put(y, 2, 2); }
  else {
    const v = sp.vol;
    if (sp.top === 'spiky') { put(0, 3, 3); put(0, 6, 6); put(1, 3, 4); put(1, 6, 7); put(1, 5, 5); }
    else if (sp.top === 'bun') { put(0, 6, 7); put(1, 5, 7); }
    else if (sp.top === 'flat') { put(1, 4, 7); }
    else put(1, 5 - v, 7);
    put(2, 3 - v, 7); put(3, 2 - v, 7); put(4, 2 - v, 7);
    if (sp.top === 'flat') { put(2, 3, 7); put(3, 3, 7); put(4, 3, 3); rows[4] = '...h....'.split(''); }
    // bangs (row 5 / 6)
    if (sp.bang === 'full') { put(5, 2 - v, 7); put(6, 2 - v, 3); }
    else if (sp.bang === 'split') { put(5, 2 - v, 6); put(6, 2 - v, 3); }
    else if (sp.bang === 'side') { put(5, 2, 5); put(6, 2, 3); put(7, 2, 2); }
    else if (sp.bang === 'spiky') { put(5, 2 - v, 7); rows[5][4] = '.'; rows[5][7] = '.'; put(6, 2 - v, 2); }
    // side locks
    for (let y = 6; y < 6 + sp.len; y++) put(y, 2 - (y > 10 ? 1 : 0) - v, 2 - v + (sp.len >= 5 && y > 8 ? 1 : 0));
    if (sp.curl) for (let y = 3; y < 9; y += 2) put(y, 1, 1);
    if (sp.tails) for (let y = 5; y < 12; y++) put(y, 0, y < 7 ? 2 : 1);
  }
  const ys = Object.keys(rows).map(Number); const oy = Math.min(...ys), oyMax = Math.max(...ys);
  const out = []; for (let y = oy; y <= oyMax; y++) out.push(rows[y] ? rows[y].join('') : '........');
  return { oy, rows: out };
}
function hairRowsBack(sp, fr0) {
  const rows = {}; fr0.rows.forEach((r, i) => rows[fr0.oy + i] = r.split(''));
  if (sp.top !== 'bald') for (let y = 2; y <= 11; y++) { const r = rows[y] || '........'.split(''); let x0 = r.indexOf('h'); if (x0 < 0 || x0 > 3) x0 = 3; for (let x = x0; x <= 7; x++) r[x] = 'h'; rows[y] = r; }
  if (sp.len >= 5) for (let y = 12; y < 6 + sp.len; y++) { const r = rows[y] || '........'.split(''); for (let x = 3; x <= 7; x++) r[x] = 'h'; rows[y] = r; }
  const ys = Object.keys(rows).map(Number); const oy = Math.min(...ys), oyMax = Math.max(...ys); const out = []; for (let y = oy; y <= oyMax; y++) out.push(rows[y] ? rows[y].join('') : '........');
  return { oy, rows: out };
}
function hairRowsSide(sp) {
  const rows = {}; const put = (y, x0, x1) => { if (!rows[y]) rows[y] = '.'.repeat(16).split(''); for (let x = Math.max(0, x0); x <= Math.min(15, x1); x++) rows[y][x] = 'h'; };
  const v = sp.vol;
  if (sp.top === 'bald') { for (let y = 6; y < 8 + sp.len; y++) put(y, 4, 5); }
  else {
    if (sp.top === 'spiky') { put(0, 5, 5); put(0, 8, 8); put(1, 4, 9); }
    else if (sp.top === 'bun') { put(0, 3, 5); put(1, 3, 9); }
    else if (sp.top === 'flat') put(1, 5, 10);
    else put(1, 6 - v, 10);
    put(2, 4 - v, 11); put(3, 3 - v, 12); put(4, 3 - v, 12);
    if (sp.bang === 'full' || sp.bang === 'spiky') put(5, 3 - v, 12); else if (sp.bang === 'side' || sp.bang === 'split') put(5, 3 - v, 11); else put(5, 3, 6);
    put(6, 3 - v, 7); put(7, 3 - v, 6);
    for (let y = 8; y < 6 + sp.len; y++) put(y, 3 - v - (y > 10 ? 1 : 0), 6 - (y > 11 ? 1 : 0));
    if (sp.curl) for (let y = 3; y < 9; y += 2) put(y, 2, 2);
    if (sp.tails) for (let y = 5; y < 12; y++) put(y, 1, 3);
    if (sp.top === 'flat') { rows[5] = '.'.repeat(16).split(''); put(5, 3, 6); }
  }
  const ys = Object.keys(rows).map(Number); const oy = Math.min(...ys), oyMax = Math.max(...ys); const out = []; for (let y = oy; y <= oyMax; y++) out.push(rows[y] ? rows[y].join('') : '.'.repeat(16));
  return { oy, rows: out };
}
SD.hairF = HAIR_SPEC.map(hairRowsFront); SD.hairB = HAIR_SPEC.map((sp, i) => hairRowsBack(sp, SD.hairF[i])); SD.hairS = HAIR_SPEC.map(hairRowsSide);
SD.beardF = ["...hhhhh", "....hhhh", ".....hhh"]; SD.beardS = [Rw(8, "hhhh"), Rw(8, "hhhh"), Rw(9, "hh")];
/* female torso: narrower shoulders and waist */
SD.torsoFemF = [".....css", "....cccc", "....cccc", ".....ccc", ".....ttt", "....cccc", "....cccc"];
/* head gear sits one row higher on the bigger head */
['mage', 'priest', 'thief', 'farmer', 'merchant', 'herbalist', 'historian'].forEach(k => { const hh = SD.hat[k]; ['F', 'B', 'S'].forEach(v => { if (hh[v]) hh[v] = { oy: hh[v].oy - 1, rows: hh[v].rows }; }); });
['F', 'B', 'S'].forEach(v => { SD.helm[v] = { oy: SD.helm[v].oy - 2, rows: SD.helm[v].rows }; });
SD.helm.plumeF = { oy: 0, rows: SD.helm.plumeF.rows }; SD.helm.plumeS = { oy: 0, rows: SD.helm.plumeS.rows };
SD.haloF = { oy: 0, rows: SD.haloF.rows }; SD.haloS = { oy: 0, rows: SD.haloS.rows };
SD.circletF = { oy: 4, rows: SD.circletF.rows }; SD.circletS = { oy: 4, rows: SD.circletS.rows };
/* extra head gear for job variants */
Object.assign(SD.hat, {
  bandana: { F: { oy: 3, rows: ["..aaaaaa", "..a....."] }, B: { oy: 3, rows: ["..aaaaaa", "...aa..."] }, S: { oy: 3, rows: [Rw(3, "aaaaaaaaa"), Rw(1, "aaa")] } },
  hood: { F: { oy: 1, rows: [".....aaa", "...aaaaa", "..aaaaaa", "..aaaaaa", "..aa....", "..aa....", "..aa....", "..aa....", "...a...."] }, B: { oy: 1, rows: [".....aaa", "...aaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "..aaaaaa", "...aaaaa", "....aaaa"] }, S: { oy: 1, rows: [Rw(5, "aaaa"), Rw(4, "aaaaaa"), Rw(3, "aaaaaaaa"), Rw(3, "aaaaaaaaa"), Rw(3, "aaaa"), Rw(3, "aaa"), Rw(3, "aaa"), Rw(3, "aaa"), Rw(4, "aa")] } },
  mitre: { F: { oy: 0, rows: ["......aa", ".....aaa", ".....gaa", "....aaaa", "...ggggg"] }, B: { oy: 0, rows: ["......aa", ".....aaa", ".....aaa", "....aaaa", "...ggggg"] }, S: { oy: 0, rows: [Rw(7, "aa"), Rw(6, "aaa"), Rw(6, "aga"), Rw(5, "aaaaa"), Rw(4, "gggggg")] } },
  headband: { F: { oy: 4, rows: ["..aaaaaa"] }, B: { oy: 4, rows: ["..aaaaaa"] }, S: { oy: 4, rows: [Rw(3, "aaaaaaaaa")] } },
  flowers: { F: { oy: 2, rows: ["...Q.Y.Q"] }, B: { oy: 2, rows: ["...Q.Y.Q"] }, S: { oy: 2, rows: [Rw(4, "Q.Y.Q.Y")] } },
  cap: { F: { oy: 1, rows: [".....aaa", "...aaaaa", "..aaaaaa", "..gggggg"] }, B: { oy: 1, rows: [".....aaa", "...aaaaa", "..aaaaaa", "..aaaaaa"] }, S: { oy: 1, rows: [Rw(5, "aaaa"), Rw(4, "aaaaaa"), Rw(3, "aaaaaaaa"), Rw(3, "ggggggggggg")] } },
});
/* variant table: per role, 3 looks -> head gear key (or null), body armour on/off, cloth colours */
const ROLE_VARIANT = {
  warrior: [{ hat: 'helm', armor: 1, cloth: '#7886ae' }, { hat: 'headband', armor: 1, cloth: '#5a6a8e', acc: '#c03030' }, { hat: null, armor: 0, cloth: '#8a5a32', acc: '#5a3a1a' }],
  hero: [{ cloth: '#f0f0fa' }, { cloth: '#e8e0c8' }, { cloth: '#d8e4f4' }],
  mage: [{ hat: 'mage', cloth: '#5a3ab8' }, { hat: 'hood', cloth: '#2e4a9a', acc: '#2e4a9a' }, { hat: null, cloth: '#7a2a8a' }],
  priest: [{ hat: 'priest', cloth: '#f4f4fc' }, { hat: 'mitre', cloth: '#f4f0e4', acc: '#f4f0e4' }, { hat: null, cloth: '#e8eef8' }],
  thief: [{ hat: 'thief', cloth: '#3a4a3c' }, { hat: 'bandana', cloth: '#4a3a4a', acc: '#a03030' }, { hat: null, cloth: '#2e3a4e' }],
  farmer: [{ hat: 'farmer', cloth: '#e6d6a4' }, { hat: 'bandana', cloth: '#c8a878', acc: '#c04a3a' }, { hat: null, cloth: '#9ab070' }],
  merchant: [{ hat: 'merchant', cloth: '#d09a38' }, { hat: 'cap', cloth: '#b86a3a', acc: '#6a3a8a' }, { hat: null, cloth: '#c8a050' }],
  weaponer: [{ hat: 'merchant', cloth: '#b0603a' }, { hat: 'bandana', cloth: '#9a4a3a', acc: '#2a2a3a' }, { hat: null, cloth: '#c07048' }],
  armorer: [{ hat: 'merchant', cloth: '#4a6ca4' }, { hat: 'cap', cloth: '#3a5a8a', acc: '#8a8a9a' }, { hat: null, cloth: '#5a7ab0' }],
  smith: [{ hat: 'smith', cloth: '#7c7c8a' }, { hat: 'headband', cloth: '#6a5a4a', acc: '#c04030' }, { hat: null, cloth: '#5a5a6a' }],
  herbalist: [{ hat: 'herbalist', cloth: '#3e9650' }, { hat: 'flowers', cloth: '#5aa060' }, { hat: null, cloth: '#2e7a5a' }],
  historian: [{ hat: 'historian', cloth: '#3a4c88' }, { hat: 'cap', cloth: '#5a3a6a', acc: '#2a2a3a' }, { hat: null, cloth: '#4a5a6a' }],
};
function lookVariant(h) { const L = h.look || {}; return (L.style || 0) % 3; }
