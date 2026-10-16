/* Claude/Codex side-by-side for a delivered NPC batch: per job, every sex x direction as
   [sheet crop] [96 px delivery x2] [48 px delivery x4] [50 % overlay of sheet crop and 96 px x2], all 192 px high, on mid grey.
   node test/npc_batch_compare.js <folder> -> test/out/npc_batch1/check_<job>.png */
const fs = require('fs'), path = require('path'); const { load, savePng } = require('../tools/imgdata');
const dir = process.argv[2]; const SHEET = path.join(__dirname, '..', 'docs/figures/npc/npc_design_sheet.png'); const OUT = path.join(__dirname, 'out', 'npc_batch1'); fs.mkdirSync(OUT, { recursive: true });
const JOBS = ['hero', 'swordsman', 'thief', 'mage', 'priest', 'farmer', 'merchant', 'smith', 'herbalist', 'weaponer', 'armorer'], DIRS = ['front', 'back', 'left', 'right'];
(async () => {
  const man = fs.readFileSync(path.join(dir, 'manifest.md'), 'utf8'); const box = {}; man.split('\n').forEach(l => { const m = l.match(/\|\s*(npc_[a-z]+_[mf]_[a-z]+)_0_hd\.png\s*\|\s*(\d+),(\d+),(\d+),(\d+)/); if (m) box[m[1]] = [+m[2], +m[3], +m[4], +m[5]]; });
  const files = [SHEET]; for (const j of JOBS) for (const s of 'mf') for (const d of DIRS) { const k = 'npc_' + j + '_' + s + '_' + d; files.push(path.join(dir, k + '_0_hd.png'), path.join(dir, k + '_0.png')); }
  const im = await load(files); const sh = im[SHEET]; const H = 192, gap = 6;
  const scaleTo = (src, sx, sy, sw, shh, Ht) => { const k = Ht / shh; const W = Math.round(sw * k); const o = new Uint8Array(W * Ht * 4); for (let y = 0; y < Ht; y++) for (let x = 0; x < W; x++) { const xx = sx + Math.min(sw - 1, Math.floor(x / k)), yy = sy + Math.min(shh - 1, Math.floor(y / k)); const i = (yy * src.w + xx) * 4; o.set([src.data[i], src.data[i + 1], src.data[i + 2], src.data[i + 3]], (y * W + x) * 4); } return { w: W, h: Ht, d: o }; };
  for (const j of JOBS) { const cells = [];
    for (const s of 'mf') for (const d of DIRS) { const k = 'npc_' + j + '_' + s + '_' + d; const b = box[k]; const hd = im[path.join(dir, k + '_0_hd.png')], sm = im[path.join(dir, k + '_0.png')]; if (!b || !hd || !sm) continue;
      const a = scaleTo(sh, b[0], b[1], b[2], b[3], H); const c = scaleTo(hd, 0, 0, hd.w, hd.h, H); const e = scaleTo(sm, 0, 0, sm.w, sm.h, H);
      // overlay: sheet crop under the 96 px version (both 192 high), 50 %
      const W = Math.max(a.w, c.w); const ov = { w: W, h: H, d: new Uint8Array(W * H * 4) }; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const o = (y * W + x) * 4; let r = 0, g = 0, bb = 0, n = 0; for (const z of [a, c]) { const xo = x - Math.floor((W - z.w) / 2); if (xo < 0 || xo >= z.w) continue; const i = (y * z.w + xo) * 4; if (!z.d[i + 3] && z === c) continue; r += z.d[i]; g += z.d[i + 1]; bb += z.d[i + 2]; n++; } if (n) ov.d.set([r / n, g / n, bb / n, 255], o); }
      cells.push([a, c, e, ov]); }
    const rowW = Math.max(...cells.map(cs => cs.reduce((t, z) => t + z.w + gap, 0))); const Wt = rowW * 4 + gap * 5, Ht = (H + gap) * 2 + gap; const img = new Uint8Array(Wt * Ht * 4); for (let i = 0; i < img.length; i += 4) img.set([96, 96, 104, 255], i);
    cells.forEach((cs, n) => { let x0 = gap + (n % 4) * (rowW + gap); const y0 = gap + Math.floor(n / 4) * (H + gap); cs.forEach(z => { for (let y = 0; y < z.h; y++) for (let x = 0; x < z.w; x++) { const i = (y * z.w + x) * 4; if (z.d[i + 3]) img.set(z.d.slice(i, i + 4), ((y0 + y) * Wt + x0 + x) * 4); } x0 += z.w + gap; }); });
    await savePng(path.join(OUT, 'check_' + j + '.png'), Wt, Ht, img); console.log('check_' + j); }
})();
