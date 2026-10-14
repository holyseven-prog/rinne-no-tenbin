/* enemies (Part E): design-sheet crops -> src/11f2_enemyart.js (map scale: 4 directions x frames; battle scale: facing left x frames)
   node tools/enemy_build.js */
const fs = require('fs'); const { convert, mirror } = require('./sprite_conv'); const { savePng } = require('./imgdata');
const C = JSON.parse(fs.readFileSync('tools/enemy_crops.json', 'utf8'));
// key -> [map W, H, battle W, H]
const SZ = { mush: [16, 16, 32, 32], bat: [16, 16, 32, 32], turtle: [18, 18, 36, 36], goblin: [18, 20, 36, 40], skel: [20, 22, 40, 44], wolf: [26, 22, 52, 44], dragon: [48, 48, 96, 96], verna: [26, 40, 52, 80], garum: [30, 42, 60, 84], serene: [28, 40, 56, 80], king: [44, 52, 88, 104] };
const out = {}; const prev = [];
for (const k in C) {
  const rows = C[k]; const [mw, mh, bw, bh] = SZ[k]; const big = rows[0].length === 4 && rows.length === 2; // cadres: row0 = F B L R, row1 = action pose
  const E = { map: {}, bat: {} }; const K = big || k === 'dragon' || k === 'king' ? 16 : 12;
  if (rows.length === 4) { // small: rows F B L R, 3 walk frames each
    ['F', 'B', 'L', 'R'].forEach((v, ri) => { E.map[v] = rows[ri].map(cr => convert(cr, mw, mh, K)); });
    E.bat.L = rows[2].map(cr => convert(cr, bw, bh, 15));
  } else if (big) {
    ['F', 'B', 'L', 'R'].forEach((v, i) => { E.map[v] = [convert(rows[0][i], mw, mh, K), convert(rows[1][i], mw, mh, K)]; });
    E.bat.L = [convert(rows[0][2], bw, bh, 16), convert(rows[1][2], bw, bh, 16)];
  } else if (k === 'king') { // row0: F B side ; row1: action F B side
    const side0 = convert(rows[0][2], mw, mh, K), side1 = convert(rows[1][2], mw, mh, K);
    E.map.F = [convert(rows[0][0], mw, mh, K), convert(rows[1][0], mw, mh, K)]; E.map.B = [convert(rows[0][1], mw, mh, K), convert(rows[1][1], mw, mh, K)]; E.map.L = [side0, side1]; E.map.R = [mirror(side0), mirror(side1)];
    E.bat.L = [convert(rows[0][2], bw, bh, 16), convert(rows[1][2], bw, bh, 16)]; E.bat.F = [convert(rows[0][0], bw, bh, 16), convert(rows[1][0], bw, bh, 16)];
  } else { // dragon: row0 front / side / side, row1 3-4 view / flying
    const f0 = convert(rows[0][0], mw, mh, K), l0 = convert(rows[0][2], mw, mh, K), l1 = convert(rows[1][1], mw, mh, K), b0 = convert(rows[0][1], mw, mh, K);
    E.map.F = [f0, convert(rows[1][0], mw, mh, K)]; E.map.B = [b0, b0]; E.map.L = [l0, l1]; E.map.R = [mirror(l0), mirror(l1)];
    E.bat.L = [convert(rows[0][2], bw, bh, 16), convert(rows[1][1], bw, bh, 16)];
  }
  out[k] = E; prev.push([k, E]);
}
let js = '/* ================= enemy art (Part E), auto-built from SEVEN\'s enemy design sheet by tools/enemy_build.js — edit the tool, not this file =================\n   ENEMYART[key].map[F|B|L|R] = frames (walk / action), ENEMYART[key].bat.L = battle frames facing left. Each: { w, h, p: palette, r: rows (0-f = palette index) } */\nconst ENEMYART = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync('src/11f2_enemyart.js', js); console.log('bytes', js.length);
// preview: map frames x4 and battle frames x2
(async () => { const cell = 230; const Wt = 6 * cell, rows = Math.ceil(prev.length / 6), H = 240; const img = new Uint8Array(Wt * rows * H * 4); for (let i = 0; i < img.length; i += 4) img.set([120, 150, 100, 255], i);
  const blitS = (s, bx, by, sc) => s.r.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '.') return; const hx = s.p['0123456789abcdefghij'.indexOf(ch)]; const col = [1, 3, 5].map(q => parseInt(hx.slice(q, q + 2), 16)); for (let yy = 0; yy < sc; yy++) for (let xx = 0; xx < sc; xx++) { const X = bx + x * sc + xx, Y = by + y * sc + yy; if (X < Wt && Y < rows * H) img.set([col[0], col[1], col[2], 255], (Y * Wt + X) * 4); } }));
  prev.forEach(([k, E], n) => { const bx = (n % 6) * cell, by = Math.floor(n / 6) * H; let x = bx + 2; ['F', 'B', 'L', 'R'].forEach(v => { const s = E.map[v][0]; blitS(s, x, by + 2, s.w > 30 ? 1 : 2); x += (s.w > 30 ? 1 : 2) * s.w + 2; }); const b = E.bat.L[0]; blitS(b, bx + 2, by + 110, b.w > 60 ? 1 : 2); });
  await savePng('tools/out/enemy_built.png', Wt, rows * H, img); })();
