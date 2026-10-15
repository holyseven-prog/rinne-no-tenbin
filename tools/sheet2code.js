/* 視覺總指示書 part 1: SEVEN's sheets -> pixel data in code (no PNGs in the game, no colour reduction, no outline added, no redraw).
   node tools/sheet2code.js npc [--detect]
   --detect: find every sprite (connected components per panel row) and write the boxes to tools/crops.json (hand-editable).
   Without --detect the boxes in crops.json are used. Steps per sprite: crop -> remove the background from the outside inwards
   (colour distance to the panel colour + flood fill, so white robes inside stay) -> drop light fringe pixels on the outer edge (1-2 px)
   -> keep every colour -> SPR.<key> = { w, h, pal, px } (px = base64 of 1-byte indices, 2 bytes if > 256 colours).
   Two resolutions for characters: <key> (sheet size, camera x2) and <key>_s (area-averaged to 48 px high, camera x1).
   Check pictures on black / green / dark-red: tools/out/spr_<sheet>_check.png */
const fs = require('fs'), path = require('path'); const { load, savePng } = require('./imgdata');
const CROPS = path.join(__dirname, 'crops.json');
const SHEETS = { npc: 'docs/figures/npc/npc_design_sheet.png', enemy: 'docs/figures/enemy/enemy_design_sheet.png', village: 'docs/figures/village/village_design_sheet.png', field: 'docs/figures/field/field_castle_design_sheet.png' };
const JOBS = ['hero', 'swordsman', 'thief', 'mage', 'priest', 'farmer', 'merchant', 'smith', 'herbalist', 'weaponer', 'armorer'];
const DIRS = ['F', 'B', 'L', 'R'];
// NPC sheet panels: [x0, x1, row bands [[y0, y1] male, [y0, y1] female]] — sprites sit right of the 男/女 label column
const NPC_PANELS = [[8, 266], [272, 526], [533, 775], [781, 1028], [1034, 1284], [1290, 1530], [8, 289], [296, 579], [586, 870], [877, 1190], [1197, 1530]];
const NPC_ROWS = i => i < 6 ? [[152, 300], [314, 460]] : [[548, 700], [712, 862]];
const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
const lum = c => c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
function px(im, x, y) { const i = (y * im.w + x) * 4; return [im.data[i], im.data[i + 1], im.data[i + 2]]; }
function bandBg(im, x0, x1, y0, y1) { const cnt = {}; for (let x = x0; x < x1; x++) for (const y of [y0, y0 + 1, y1 - 2, y1 - 1]) { const k = px(im, x, y).map(v => v >> 3).join(','); cnt[k] = (cnt[k] || 0) + 1; } const k = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0]; return k.split(',').map(v => (+v << 3) + 4); }
/* ---------- detection: connected components of "not background" per band ---------- */
function components(im, x0, x1, y0, y1, bg, T) { const W = x1 - x0, H = y1 - y0; const fg = new Uint8Array(W * H); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const c = px(im, x0 + x, y0 + y); fg[y * W + x] = dist(c, bg) > T ? 1 : 0; }
  const lab = new Int32Array(W * H).fill(-1); const comps = []; for (let i = 0; i < W * H; i++) { if (!fg[i] || lab[i] >= 0) continue; const st = [i]; lab[i] = comps.length; let mnx = 1e9, mny = 1e9, mxx = -1, mxy = -1, n = 0;
    while (st.length) { const j = st.pop(); const x = j % W, y = (j / W) | 0; n++; if (x < mnx) mnx = x; if (x > mxx) mxx = x; if (y < mny) mny = y; if (y > mxy) mxy = y; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const k = yy * W + xx; if (fg[k] && lab[k] < 0) { lab[k] = comps.length; st.push(k); } } }
    comps.push({ x0: x0 + mnx, y0: y0 + mny, x1: x0 + mxx, y1: y0 + mxy, n }); } return comps; }
function detectNpc(im) { const out = {};
  NPC_PANELS.forEach(([px0, px1], j) => NPC_ROWS(j).forEach(([y0, y1], s) => { const x0 = px0 + 40, x1 = px1 - 4; const bg = bandBg(im, x0, x1, y0, y1); const fgc = (x, y) => dist(px(im, x, y), bg) > 60;
    // sprites stand above the 前/後/左/右 labels: use the upper 80 % of the band; column projection, cut at the 3 deepest valleys
    const yb = y0 + Math.round((y1 - y0) * 0.8); const col = []; for (let x = x0; x < x1; x++) { let n = 0; for (let y = y0; y < yb; y++) if (fgc(x, y)) n++; col.push(n); }
    const W = x1 - x0, seg = W / 4; const cuts = [1, 2, 3].map(k => { let best = -1, bv = 1e9; for (let x = Math.round(seg * k - seg * 0.35); x <= Math.round(seg * k + seg * 0.35); x++) { const v = (col[x - 1] || 0) + col[x] + (col[x + 1] || 0); if (v < bv) { bv = v; best = x; } } return best; });
    const edges = [0].concat(cuts, [W]); for (let d = 0; d < 4; d++) { const a = edges[d], b2 = edges[d + 1]; let mnx = 1e9, mny = 1e9, mxx = -1, mxy = -1; for (let x = a; x < b2; x++) for (let y = y0; y < yb; y++) if (fgc(x0 + x, y)) { if (x < mnx) mnx = x; if (x > mxx) mxx = x; if (y < mny) mny = y; if (y > mxy) mxy = y; }
      out['npc_' + JOBS[j] + '_' + 'MF'[s] + '_' + DIRS[d]] = [x0 + mnx - 2, mny - 2, x0 + mxx + 3, mxy + 3]; } })); return out; }
/* ---------- extraction ---------- */
function extract(im, box) { const [x0, y0, x1, y1] = box; const w = x1 - x0, h = y1 - y0; const bg = bandBg(im, x0, x1, y0, y1); const T = 54;
  const rgb = []; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) rgb.push(px(im, x0 + x, y0 + y));
  const isBg = i => dist(rgb[i], bg) <= T; const out = new Uint8Array(w * h); // 1 = background reached from outside
  const st = []; for (let x = 0; x < w; x++) { st.push(x, (h - 1) * w + x); } for (let y = 0; y < h; y++) { st.push(y * w, y * w + w - 1); }
  while (st.length) { const i = st.pop(); if (out[i] || !isBg(i)) continue; out[i] = 1; const x = i % w, y = (i / w) | 0; if (x > 0) st.push(i - 1); if (x < w - 1) st.push(i + 1); if (y > 0) st.push(i - w); if (y < h - 1) st.push(i + w); }
  // fringe: outermost pixels that are close to the background or lighter than the pixel inside them go (2 passes)
  const keep = i => !out[i]; const nbIn = (i, f) => { const x = i % w, y = (i / w) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; const k = yy * w + xx; if (f(k)) return k; } return -1; };
  for (let pass = 0; pass < 2; pass++) { const drop = []; for (let i = 0; i < w * h; i++) { if (!keep(i)) continue; const edge = nbIn(i, k => !keep(k)) >= 0 || i % w === 0 || i % w === w - 1 || i < w || i >= w * (h - 1); if (!edge) continue;
      const inner = nbIn(i, k => keep(k) && nbIn(k, kk => !keep(kk)) < 0); const c = rgb[i]; if (dist(c, bg) <= T * 2 || (inner >= 0 && lum(c) > lum(rgb[inner]) + 40 && lum(c) > 150)) drop.push(i); } drop.forEach(i => out[i] = 1); }
  // crop to content
  let mnx = w, mny = h, mxx = -1, mxy = -1; for (let i = 0; i < w * h; i++) if (keep(i)) { const x = i % w, y = (i / w) | 0; if (x < mnx) mnx = x; if (x > mxx) mxx = x; if (y < mny) mny = y; if (y > mxy) mxy = y; }
  const W = mxx - mnx + 1, H = mxy - mny + 1; const rgba = new Uint8Array(W * H * 4); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (mny + y) * w + mnx + x; if (!keep(i)) continue; const c = rgb[i]; rgba.set([c[0], c[1], c[2], 255], (y * W + x) * 4); }
  return { w: W, h: H, rgba };
}
/* area-averaged reduction (high quality, never nearest) to height th; alpha kept binary (>= 50 % coverage) */
function shrink(s, th) { const k = s.h / th; const W = Math.max(1, Math.round(s.w / k)), H = th; const o = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const sx0 = x * k, sx1 = (x + 1) * k, sy0 = y * k, sy1 = (y + 1) * k; let r = 0, g = 0, b = 0, a = 0, tw = 0;
    for (let yy = Math.floor(sy0); yy < Math.ceil(sy1); yy++) for (let xx = Math.floor(sx0); xx < Math.ceil(sx1); xx++) { if (xx >= s.w || yy >= s.h) continue; const wx = Math.min(xx + 1, sx1) - Math.max(xx, sx0), wy = Math.min(yy + 1, sy1) - Math.max(yy, sy0), wgt = wx * wy; tw += wgt; const i = (yy * s.w + xx) * 4; if (s.rgba[i + 3]) { r += s.rgba[i] * wgt; g += s.rgba[i + 1] * wgt; b += s.rgba[i + 2] * wgt; a += wgt; } }
    if (a >= tw * 0.5) o.set([Math.round(r / a), Math.round(g / a), Math.round(b / a), 255], (y * W + x) * 4); }
  return { w: W, h: H, rgba: o }; }
function encode(s) { const z = require('zlib').deflateRawSync(Buffer.from(s.rgba), { level: 9 }); return { w: s.w, h: s.h, z: z.toString('base64') }; } // option A: every pixel, lossless
(async () => {
  const sheet = process.argv[2] || 'npc'; const detect = process.argv.includes('--detect'); const f = SHEETS[sheet]; const im = (await load([f]))[f];
  let crops = fs.existsSync(CROPS) ? JSON.parse(fs.readFileSync(CROPS, 'utf8')) : {};
  if (detect || !crops[sheet]) { crops[sheet] = sheet === 'npc' ? detectNpc(im) : {}; fs.writeFileSync(CROPS, JSON.stringify(crops, null, 1)); console.log('crops', Object.keys(crops[sheet]).length); }
  const out = {}; const prev = []; let colours = 0;
  for (const [key, box] of Object.entries(crops[sheet])) { const s = extract(im, box); out[key] = encode(s); colours = Math.max(colours, out[key].pal.length); prev.push(s);
  }
  const file = 'src/11s_spr_' + sheet + '.js'; fs.writeFileSync(file, '/* ================= ' + sheet + ' sprites from SEVEN\'s sheet (' + f + '), generated by tools/sheet2code.js — do not edit by hand ================= */\nSPR_Z.push(' + JSON.stringify(out) + ');\n');
  console.log(file, Math.round(fs.statSync(file).size / 1024) + 'KB', Object.keys(out).length, 'sprites');
  // check picture: each sprite on black / green / dark red
  const cols = 22, cw = Math.max(...prev.map(s => s.w)) + 4, chh = Math.max(...prev.map(s => s.h)) + 4; const rows = Math.ceil(prev.length / cols) * 3; const W = cols * cw, H = rows * chh; const img = new Uint8Array(W * H * 4);
  [[0, 0, 0], [0, 160, 0], [90, 0, 20]].forEach((bgc, bi) => prev.forEach((s, n) => { const bx = (n % cols) * cw, by = (Math.floor(n / cols) + bi * Math.ceil(prev.length / cols)) * chh; for (let y = 0; y < chh; y++) for (let x = 0; x < cw; x++) img.set([...bgc, 255], ((by + y) * W + bx + x) * 4); for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const i = (y * s.w + x) * 4; if (s.rgba[i + 3]) img.set(s.rgba.slice(i, i + 4), ((by + 2 + y) * W + bx + 2 + x) * 4); } }));
  fs.mkdirSync('tools/out', { recursive: true }); await savePng('tools/out/spr_' + sheet + '_check.png', W, H, img); console.log('check picture tools/out/spr_' + sheet + '_check.png');
})();
