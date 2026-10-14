// node tools/npc_view.js job sex [scale] -> tools/out/view_<job>_<sex>.png (F B L R, built art)
const fs = require('fs'), vm = require('vm'); const { savePng } = require('./imgdata');
const src = fs.readFileSync('src/11a_npcart.js', 'utf8'); const ctx = {}; vm.runInNewContext(src + ';this.NPCART=NPCART;', ctx); const A = ctx.NPCART;
const [job, sex, sc0] = process.argv.slice(2); const sc = +sc0 || 8; const W = 4 * 18 * sc, H = 26 * sc; const img = new Uint8Array(W * H * 4); for (let i = 0; i < img.length; i += 4) img.set([106, 138, 74, 255], i);
['F', 'B', 'L', 'R'].forEach((v, vi) => { const b = A[job][sex][v]; b.r.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '.') return; const hx = b.p['0123456789abcdefghij'.indexOf(ch)]; const col = [1, 3, 5].map(k => parseInt(hx.slice(k, k + 2), 16)); for (let yy = 0; yy < sc; yy++) for (let xx = 0; xx < sc; xx++) img.set([col[0], col[1], col[2], 255], (((y + 1) * sc + yy) * W + (vi * 18 + 1 + x) * sc + xx) * 4); })); });
savePng('tools/out/view_' + job + '_' + sex + '.png', W, H, img);
