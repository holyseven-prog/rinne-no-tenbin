/* Build Sprite-DSL data (src/11a_npcart.js) from the extracted design-sheet crops.
   Each crop -> 14x22 interior by dominant-colour blocks -> <=14 colours (k-means) -> 1px #181020 outline -> 16x24 grid.
   node tools/npc_build.js   (also writes tools/out/npc_built.png: crop | built, x4) */
const fs = require('fs'); const { savePng } = require('./imgdata');
const crops = JSON.parse(fs.readFileSync('tools/npc_crops.json', 'utf8'));
const OUTLINE = [24, 16, 32];
const SCALE0 = 4.5; // design sprites are ~100px tall -> 22 rows; taller/wider ones (big hats, weapon racks) shrink to fit
const lum = c => (0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]) / 255;
function build(c, view) {
  const src = Buffer.from(c.rgba, "base64"); const SC = Math.max(SCALE0, c.h / 22, c.w / 14); const ow = Math.min(14, Math.round(c.w / SC)), oh = Math.min(22, Math.round(c.h / SC)); const g = [];
  for (let oy = 0; oy < oh; oy++) { const row = []; for (let ox = 0; ox < ow; ox++) {
    const sx0 = Math.floor(ox * c.w / ow), sx1 = Math.max(sx0 + 1, Math.floor((ox + 1) * c.w / ow)), sy0 = Math.floor(oy * c.h / oh), sy1 = Math.max(sy0 + 1, Math.floor((oy + 1) * c.h / oh));
    const bins = {}; let fg = 0, tot = 0;
    for (let y = sy0; y < sy1; y++) for (let x = sx0; x < sx1; x++) { tot++; const i = (y * c.w + x) * 4; if (!src[i + 3]) continue; fg++; const r = src[i], gg = src[i + 1], b = src[i + 2]; const k = (r >> 5) + ',' + (gg >> 5) + ',' + (b >> 5); const B = bins[k] || (bins[k] = { n: 0, s: [0, 0, 0] }); B.n++; B.s[0] += r; B.s[1] += gg; B.s[2] += b; }
    if (fg / tot < 0.42) { row.push(null); continue; }
    const wt = B => B.n * (lum(B.s.map(v => v / B.n)) < 0.16 ? 0.3 : 1); const top = Object.values(bins).sort((a, b) => wt(b) - wt(a))[0]; row.push(top.s.map(v => Math.round(v / top.n)));
  } g.push(row); }
  // k-means palette (<=14 colours)
  const pts = []; g.forEach(r => r.forEach(p => { if (p) pts.push(p); }));
  let K = Math.min(11, pts.length); let cent = []; const seen = new Set(); for (const p of pts.slice().sort((a, b) => lum(a) - lum(b))) { const k = p.map(v => v >> 4).join(); if (!seen.has(k)) { seen.add(k); cent.push(p.slice()); } } // distinct seeds
  if (cent.length > K) { const step = cent.length / K; cent = Array.from({ length: K }, (_, i) => cent[Math.floor(i * step)]); }
  const d2 = (a, b) => (a[0] - b[0]) ** 2 * 0.3 + (a[1] - b[1]) ** 2 * 0.59 + (a[2] - b[2]) ** 2 * 0.11;
  for (let it = 0; it < 12; it++) { const acc = cent.map(() => [0, 0, 0, 0]); pts.forEach(p => { let bi = 0, bd = 1e9; cent.forEach((q, i) => { const dd = d2(p, q); if (dd < bd) { bd = dd; bi = i; } }); acc[bi][0] += p[0]; acc[bi][1] += p[1]; acc[bi][2] += p[2]; acc[bi][3]++; }); cent = cent.map((q, i) => acc[i][3] ? [acc[i][0] / acc[i][3], acc[i][1] / acc[i][3], acc[i][2] / acc[i][3]].map(Math.round) : q); }
  // grid -> palette indices; place bottom-centred in 16x24 with a 1px outline
  const W = 16, H = 24, ox0 = Math.floor((W - ow) / 2), oy0 = H - 1 - oh; const idx = []; for (let y = 0; y < H; y++) idx.push(new Array(W).fill(-1));
  g.forEach((r, y) => r.forEach((p, x) => { if (!p) return; let bi = 0, bd = 1e9; cent.forEach((q, i) => { const dd = d2(p, q); if (dd < bd) { bd = dd; bi = i; } }); idx[oy0 + y][ox0 + x] = bi; }));
  const pal = cent.map(c2 => '#' + c2.map(v => ('0' + v.toString(16)).slice(-2)).join('')); const OI = pal.length; pal.push('#181020');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if (idx[y][x] >= 0 && idx[y][x] !== OI) continue; if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const v = (idx[y + dy] || [])[x + dx]; return v !== undefined && v >= 0 && v !== OI; })) idx[y][x] = OI; }
  // very dark interior colours become the outline colour too (keeps the palette small and the line weight even)
  pal.forEach((h, i) => { if (i !== OI && lum(cent[i]) < 0.07) { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (idx[y][x] === i) idx[y][x] = OI; } });
  // majority denoise: a lone pixel surrounded (>=3 of 4) by one other colour takes that colour (outline untouched)
  for (let pass = 0; pass < 2; pass++) { const c2 = idx.map(r => r.slice()); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const v = idx[y][x]; if (v < 0 || v === OI) continue; const nb = [idx[y - 1][x], idx[y + 1][x], idx[y][x - 1], idx[y][x + 1]]; if (nb.includes(v)) continue; const cnt = {}; nb.forEach(q => { if (q >= 0 && q !== OI) cnt[q] = (cnt[q] || 0) + 1; }); const best = Object.entries(cnt).sort((p, q) => q[1] - p[1])[0]; if (best && best[1] >= 3) c2[y][x] = +best[0]; } for (let y = 0; y < H; y++) idx[y] = c2[y]; }
  // clear eyes on the skin area
  const rgbOf = i => cent[i]; const isSkin = i => { if (i < 0 || i === OI) return false; const [r, gg, b] = rgbOf(i); const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b); return r > 150 && r > gg && gg > b && (r - b) > 30 && lum([r, gg, b]) > 0.5 && (mx - mn) / mx < 0.55; };
  if (view !== 'B') { let best = null; for (let y = 4; y <= 12; y++) { const xs = []; for (let x = 0; x < W; x++) if (isSkin(idx[y][x])) xs.push(x); if (xs.length >= 2 && (!best || xs.length > best.xs.length)) best = { y, xs }; }
    if (best) { const ey = Math.max(4, best.y - 1); const x0 = Math.min(...best.xs), x1 = Math.max(...best.xs); const span = x1 - x0;
      const put = x => { for (const yy of [ey, ey + 1]) if (idx[yy] && isSkin(idx[yy][x])) idx[yy][x] = OI; };
      if (view === 'F') { if (span >= 3) { put(x0 + Math.max(1, Math.round(span * 0.25))); put(x1 - Math.max(1, Math.round(span * 0.25))); } }
      else if (view === 'R') put(x1 - (span >= 2 ? 1 : 0)); else put(x0 + (span >= 2 ? 1 : 0)); } }
  const used = [...new Set(idx.flat().filter(v => v >= 0))]; const map = {}; used.forEach((v, i) => map[v] = i); const P2 = used.map(v => pal[v]);
  const CH = '0123456789abcdefghij';
  return { p: P2, r: idx.map(r => r.map(v => v < 0 ? '.' : CH[map[v]]).join('')) };
}
const out = {}; const prev = [];
for (const k in crops) { const [job, sex, view] = k.split('.'); const b = build(crops[k], view); ((out[job] = out[job] || {})[sex] = out[job][sex] || {})[view] = b; prev.push([crops[k], b]); }
let js = '/* ================= NPC art data (auto-built from SEVEN\'s design sheet by tools/npc_build.js; edit the tool, not this file) =================\n   NPCART[job][sex][view] = { p: palette (#rrggbb, last = outline #181020), r: 24 rows x 16 chars (0-9a-j = palette index, . = empty) }; views F front, B back, L faces left, R faces right */\nconst NPCART = {\n';
for (const job in out) { js += '  ' + job + ': {\n'; for (const sex in out[job]) { js += '    ' + sex + ': {\n'; for (const v of ['F', 'B', 'L', 'R']) { const b = out[job][sex][v]; js += '      ' + v + ': { p: ' + JSON.stringify(b.p) + ',\n        r: ' + JSON.stringify(b.r) + ' },\n'; } js += '    },\n'; } js += '  },\n'; }
js += '};\n'; fs.writeFileSync('src/11a_npcart.js', js);
// preview: crop (scaled to 96 tall) | built x4
(async () => { const cellW = 64 + 70, H = 100; const Wt = prev.length / 4 * 0 + 8 * cellW; const rows = Math.ceil(prev.length / 8); const img = new Uint8Array(Wt * rows * H * 4);
  prev.forEach(([c, b], n) => { const bx = (n % 8) * cellW, by = Math.floor(n / 8) * H; const src = Buffer.from(c.rgba, 'base64'); const sc = Math.min(1, 96 / c.h);
    for (let y = 0; y < c.h * sc; y++) for (let x = 0; x < c.w * sc; x++) { const i = (Math.floor(y / sc) * c.w + Math.floor(x / sc)) * 4; if (!src[i + 3]) continue; const o = ((by + y) * Wt + bx + x) * 4; img.set([src[i], src[i + 1], src[i + 2], 255], o); }
    b.r.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '.') return; const hx = b.p['0123456789abcdefghij'.indexOf(ch)]; const col = [1, 3, 5].map(k => parseInt(hx.slice(k, k + 2), 16)); for (let yy = 0; yy < 4; yy++) for (let xx = 0; xx < 4; xx++) { const o = ((by + y * 4 + yy) * Wt + bx + 66 + x * 4 + xx) * 4; img.set([col[0], col[1], col[2], 255], o); } })); });
  await savePng('tools/out/npc_built.png', Wt, rows * H, img); console.log('built', prev.length, "scale", SCALE0, 'max colours', Math.max(...prev.map(x => x[1].p.length))); })();
