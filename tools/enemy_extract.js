/* Extract enemy sprites from SEVEN's enemy design sheet by connected components -> tools/enemy_crops.json + contact sheet.
   node tools/enemy_extract.js */
const { load, savePng } = require('./imgdata'); const fs = require('fs'); fs.mkdirSync('tools/out', { recursive: true });
// [key, x0, y0, x1, y1] sprite areas (labels / headers excluded)
const AREAS = [['mush', 40, 178, 232, 448], ['bat', 262, 178, 456, 448], ['turtle', 494, 178, 708, 448], ['goblin', 744, 178, 955, 448], ['skel', 994, 178, 1238, 448], ['wolf', 1274, 178, 1530, 448],
  ['dragon', 10, 570, 292, 842], ['verna', 298, 572, 608, 842], ['garum', 614, 572, 905, 842], ['serene', 910, 572, 1200, 842], ['king', 1208, 562, 1530, 842]];
(async () => {
  const f = 'docs/figures/enemy/enemy_design_sheet.png'; const im = (await load([f]))[f]; const W = im.w;
  const px = (x, y) => { const i = (y * W + x) * 4; return [im.data[i], im.data[i + 1], im.data[i + 2]]; };
  const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const out = {}; const sheet = []; let sx = 0, maxH = 0;
  for (const [key, x0, y0, x1, y1] of AREAS) {
    const cnt = {}; for (let x = x0; x < x1; x++) for (const y of [y0, y1 - 1]) { const c = px(x, y).map(v => v >> 3 << 3).join(','); cnt[c] = (cnt[c] || 0) + 1; }
    const bg = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number); const AW = x1 - x0, AH = y1 - y0; const outside = new Uint8Array(AW * AH); { const st = []; const bgl = (x, y) => dist(px(x0 + x, y0 + y), bg) <= 70; for (let x = 0; x < AW; x++) for (const y of [0, AH - 1]) if (bgl(x, y)) { outside[y * AW + x] = 1; st.push([x, y]); } for (let y = 0; y < AH; y++) for (const x of [0, AW - 1]) if (bgl(x, y) && !outside[y * AW + x]) { outside[y * AW + x] = 1; st.push([x, y]); } while (st.length) { const [x, y] = st.pop(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= AW || ny >= AH || outside[ny * AW + nx] || !bgl(nx, ny)) continue; outside[ny * AW + nx] = 1; st.push([nx, ny]); } } }
    const isFg = (x, y) => !outside[(y - y0) * AW + (x - x0)];
    const CW = x1 - x0, CH = y1 - y0; const lab = new Int32Array(CW * CH).fill(-1); const comps = [];
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) { if (lab[y * CW + x] >= 0 || !isFg(x0 + x, y0 + y)) continue; const id = comps.length; const st = [[x, y]]; lab[y * CW + x] = id; let n = 0, a = x, b = x, c = y, d = y;
      while (st.length) { const [cx, cy] = st.pop(); n++; a = Math.min(a, cx); b = Math.max(b, cx); c = Math.min(c, cy); d = Math.max(d, cy); for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= CW || ny >= CH || lab[ny * CW + nx] >= 0 || !isFg(x0 + nx, y0 + ny)) continue; lab[ny * CW + nx] = id; st.push([nx, ny]); } }
      comps.push({ id, n, a, b, c, d }); }
    const med = comps.filter(c => c.n > 300).map(c => c.n).sort((a, b) => a - b); const mid = med[Math.floor(med.length / 2)] || 300; let big = comps.filter(c => c.n > Math.max(300, mid * 0.3)); // sprites
    // attach small pieces (sword tips, orbs, flames) to the nearest big sprite box
    const owner = {}; comps.forEach(c => { if (big.includes(c) || c.n < 4) return; let best = null, bd = 1e9; big.forEach(B => { const dx = Math.max(0, B.a - c.b, c.a - B.b), dy = Math.max(0, B.c - c.d, c.c - B.d); const dd = dx + dy; if (dd < bd) { bd = dd; best = B; } }); if (best && bd <= 14) { owner[c.id] = best.id; best.a = Math.min(best.a, c.a); best.b = Math.max(best.b, c.b); best.c = Math.min(best.c, c.c); best.d = Math.max(best.d, c.d); } });
    // order: rows by y centre, then x
    const EXP = { dragon: [3, 2], verna: [4, 4], garum: [4, 4], serene: [4, 4], king: [3, 3] }[key] || [3, 3, 3, 3]; const tot = EXP.reduce((p, q) => p + q, 0); big.sort((p, q) => q.n - p.n); big = big.slice(0, tot); big.sort((p, q) => (p.c + p.d) - (q.c + q.d)); const rows = []; let k0 = 0; EXP.forEach(n => { rows.push({ items: big.slice(k0, k0 + n) }); k0 += n; }); rows.forEach(r => r.items.sort((p, q) => p.a - q.a));
    if (y0 > 500) rows.forEach((r, ri) => r.items.forEach(B => { const lo = (ri === 0 ? 0 : 706 - y0), hi = (ri === 0 ? 706 - y0 : CH) - 1; if (B.d - B.c > 140) { B.c = Math.max(B.c, lo); B.d = Math.min(B.d, hi); } }));
    out[key] = rows.map(r => r.items.map(B => { const w = B.b - B.a + 1, h = B.d - B.c + 1; const rgba = new Uint8Array(w * h * 4);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const l = lab[(B.c + y) * CW + B.a + x]; const mine = l === B.id || owner[l] === B.id; const c = px(x0 + B.a + x, y0 + B.c + y); const i = (y * w + x) * 4; rgba.set([c[0], c[1], c[2], mine ? 255 : 0], i); }
      sheet.push({ w, h, rgba, x: sx }); sx += w + 4; maxH = Math.max(maxH, h); return { w, h, rgba: Buffer.from(rgba).toString('base64') }; }));
    console.log(key, 'rows', rows.map(r => r.items.length).join('/'), 'size', out[key][0][0].w + 'x' + out[key][0][0].h);
  }
  fs.writeFileSync('tools/enemy_crops.json', JSON.stringify(out));
  const img = new Uint8Array(sx * maxH * 4); sheet.forEach(s => { for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const i = (y * s.w + x) * 4; if (!s.rgba[i + 3]) continue; img.set(s.rgba.subarray(i, i + 4), (y * sx + s.x + x) * 4); } });
  await savePng('tools/out/enemy_crops.png', sx, maxH, img);
})();
