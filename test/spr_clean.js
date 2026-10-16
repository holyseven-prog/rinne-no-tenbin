/* §1-8-2 automatic checks for a delivered sprite batch (visual re-delivery master instruction).
   node test/spr_clean.js <folder> [npc|enemy|...]
   1 size (npc 48 / hd 96 high) and feet on the bottom row  2 alpha only 0/255  3 colours <= 256 (list > 32)
   4 no fake upscale (2x2 same-colour blocks)  5 no light fringe (outer pixel lighter than the one inside)
   6 walk frames: top 80 % identical to the standing frame  7 hd is not the 48 px version enlarged  8 manifest <-> files */
const fs = require('fs'), path = require('path'); const { load } = require('../tools/imgdata');
const dir = process.argv[2]; const kind = process.argv[3] || 'npc';
(async () => {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort(); const im = await load(files.map(f => path.join(dir, f)));
  const get = f => im[path.join(dir, f)]; const out = []; const bad = {}; const note = (f, k, x) => { (bad[k] = bad[k] || []).push(f + (x !== undefined ? ' ' + x : '')); };
  const lum = (d, i) => d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
  for (const f of files) { const s = get(f); const { w, h, data: d } = s; const hd = /_hd\.png$/.test(f);
    if (kind === 'npc' && h !== (hd ? 96 : 48)) note(f, 'size', w + 'x' + h);
    let feet = false; for (let x = 0; x < w; x++) if (d[((h - 1) * w + x) * 4 + 3]) feet = true; if (!feet) note(f, 'feet');
    let semi = 0; const cols = new Set(); for (let i = 0; i < w * h; i++) { const a = d[i * 4 + 3]; if (a && a !== 255) semi++; if (a) cols.add(d[i * 4] << 16 | d[i * 4 + 1] << 8 | d[i * 4 + 2]); } if (semi) note(f, 'alpha', semi + ' px');
    if (cols.size > 256) note(f, 'colours>256', cols.size); else if (cols.size > 32) note(f, 'colours>32', cols.size);
    let blk = 0, tot = 0; for (let y = 0; y + 1 < h; y += 2) for (let x = 0; x + 1 < w; x += 2) { const i = (y * w + x) * 4; if (!d[i + 3]) continue; tot++; let same = true; for (const [dx, dy] of [[1, 0], [0, 1], [1, 1]]) { const j = ((y + dy) * w + x + dx) * 4; if (d[i] !== d[j] || d[i + 1] !== d[j + 1] || d[i + 2] !== d[j + 2] || d[i + 3] !== d[j + 3]) { same = false; break; } } if (same) blk++; } if (tot && blk / tot > 0.85) note(f, 'fake-upscale', Math.round(blk / tot * 100) + '%');
    let fr = 0; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; if (!d[i + 3]) continue; const out4 = [[1, 0], [-1, 0], [0, 1], [0, -1]]; let edge = null; for (const [dx, dy] of out4) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h || !d[(yy * w + xx) * 4 + 3]) { edge = [-dx, -dy]; break; } } if (!edge) continue; const xi = x + edge[0], yi = y + edge[1]; if (xi < 0 || yi < 0 || xi >= w || yi >= h) continue; const j = (yi * w + xi) * 4; if (d[j + 3] && lum(d, i) > lum(d, j) + 24 && lum(d, i) > 140) fr++; } if (fr) note(f, 'light-fringe', fr + ' px');
    const m = f.match(/^(.*)_([12])(_hd)?\.png$/); if (m) { const base = get(m[1] + '_0' + (m[3] || '') + '.png'); if (!base) note(f, 'no-standing'); else if (base.w !== w || base.h !== h) note(f, 'walk-size'); else { const top = Math.floor(h * 0.8); let diff = 0; for (let i = 0; i < w * top * 4; i++) if (d[i] !== base.data[i]) diff++; if (diff) note(f, 'walk-top80-changed', diff); } }
    if (hd) { const sm = get(f.replace('_hd.png', '.png')); if (sm) { let same = 0, n = 0; for (let y = 0; y < Math.min(sm.h * 2, h); y++) for (let x = 0; x < Math.min(sm.w * 2, w); x++) { const i = (y * w + x) * 4, j = ((y >> 1) * sm.w + (x >> 1)) * 4; if (!d[i + 3] && !sm.data[j + 3]) continue; n++; if (d[i] === sm.data[j] && d[i + 1] === sm.data[j + 1] && d[i + 2] === sm.data[j + 2]) same++; } if (n && same / n > 0.9) note(f, 'hd-is-48-enlarged', Math.round(same / n * 100) + '%'); } }
  }
  const man = fs.existsSync(path.join(dir, 'manifest.md')) ? fs.readFileSync(path.join(dir, 'manifest.md'), 'utf8') : ''; const listed = new Set((man.match(/[a-z0-9_]+\.png/g) || []));
  files.forEach(f => { if (!listed.has(f)) note(f, 'not-in-manifest'); }); listed.forEach(f => { if (!files.includes(f) && !f.startsWith('palette') && !/compare/.test(f)) note(f, 'missing-file'); });
  console.log('files', files.length); const keys = ['size', 'feet', 'alpha', 'colours>256', 'colours>32', 'fake-upscale', 'light-fringe', 'no-standing', 'walk-size', 'walk-top80-changed', 'hd-is-48-enlarged', 'not-in-manifest', 'missing-file'];
  keys.forEach(k => console.log((bad[k] ? (k === 'colours>32' ? 'NOTE ' : 'FAIL ') : 'PASS ') + k + (bad[k] ? ' ' + bad[k].length + ': ' + bad[k].slice(0, 6).join(', ') : '')));
  fs.writeFileSync(path.join(__dirname, 'out', 'spr_clean_' + kind + '.json'), JSON.stringify(bad, null, 1));
})();
