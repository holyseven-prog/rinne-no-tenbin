/* ================= world painting (V3.4): 5-step material ramps, clustered grass, irregular roads, stone plaza,
   2-tier cliffs, conifer / broadleaf / shrub trees, large textured buildings, multiply shadows (x0.6), overhang layer ================= */
const hsh = (x, y, s) => { let n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul((s || 0) | 0, 1442695041)) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
/* material ramps: [outline/darkest, dark, mid, light, highlight] per season (spring, summer, autumn, winter). Dark = cooler, light = warmer. */
const PAL5 = {
  grass: [['#1d4a20', '#2f6e2a', '#46923a', '#5eae44', '#86c858'], ['#1a4420', '#2c6828', '#408a34', '#56a43e', '#7cbe4e'], ['#3a3418', '#5c5524', '#7a6e30', '#9a8a3c', '#c0a850'], ['#5a6a7c', '#9eb0c2', '#c4d0de', '#e0e8f2', '#f8fbff']],
  path: [['#6a4626', '#a0703c', '#c89a5c', '#dcb478', '#ecd29c'], ['#6a4626', '#a0703c', '#c89a5c', '#dcb478', '#ecd29c'], ['#4a321e', '#6c4a2a', '#8c683a', '#ac8852', '#ccac74'], ['#5a5048', '#8a8078', '#aaa29a', '#c6c0b8', '#e4e0dc']],
  stone: [['#3a3230', '#6a5e52', '#8c7e6e', '#ad9f8b', '#d0c4ae'], ['#3a3230', '#6a5e52', '#8c7e6e', '#ad9f8b', '#d0c4ae'], ['#3a3230', '#665a4e', '#887a6a', '#a89a86', '#ccc0aa'], ['#4a4650', '#7a7884', '#9e9ca8', '#c4c4cc', '#eef0f4']],
  field: [['#2e1c10', '#4e3018', '#6c4424', '#8a5c32', '#a87a48'], ['#2e1c10', '#4e3018', '#6c4424', '#8a5c32', '#a87a48'], ['#2e1c10', '#4a2e18', '#664020', '#82562e', '#a07444'], ['#5a5a66', '#8c8c98', '#b4b4c0', '#d8dce4', '#f4f6fa']],
  sand: [['#6a5434', '#a88c5a', '#c8ac74', '#dcc490', '#f0dcb0'], ['#6a5434', '#a88c5a', '#c8ac74', '#dcc490', '#f0dcb0'], ['#64502e', '#a08454', '#c0a46c', '#d4bc88', '#e8d4a8'], ['#6a6a74', '#a8a8b4', '#cccdd6', '#e4e6ee', '#fafbff']],
  cliff: [['#2a2618', '#4a4226', '#6c6034', '#8e8046', '#b0a060'], ['#2a2618', '#4a4226', '#6c6034', '#8e8046', '#b0a060'], ['#2a2416', '#483e24', '#685a32', '#8a7a44', '#ac9a5c'], ['#3a3a44', '#5e5c66', '#7e7c86', '#a8a8b2', '#e8ecf2']],
  leaf: [['#123018', '#1e4a22', '#2c6a2c', '#44883a', '#6aa84a'], ['#10301a', '#1c4622', '#28622c', '#3e7e38', '#5e9e46'], ['#3a1a0c', '#6a2e14', '#a04a1c', '#c8702a', '#e8a040'], ['#2a3020', '#3e4632', '#5a5e48', '#7a7c66', '#a0a08a']],
  pine: [['#0e2416', '#163a22', '#20502c', '#2e6a36', '#4a8a44'], ['#0e2416', '#163a22', '#20502c', '#2e6a36', '#4a8a44'], ['#10261a', '#1a3c24', '#26522e', '#34683a', '#4e8248'], ['#0e2416', '#163a22', '#20502c', '#2e6a36', '#4a8a44']],
  wood: [['#2a1a0e', '#523420', '#784c2c', '#a06c3e', '#c8945c']],
  dark: [['#16121e', '#2a2438', '#3a3250', '#4e4466', '#6a5a86']],
  water: [['#123a6a', '#1e5aa0', '#2c72c0', '#4a92d8', '#8ac4f0'], ['#103668', '#1c569c', '#2a6cbc', '#4890d6', '#88c2ee'], ['#16365e', '#24548e', '#3466a8', '#5084c4', '#8ab4e0'], ['#5a7088', '#90aac4', '#b8d0e6', '#d6e8f6', '#f4fbff']],
};
const R5_CACHE = {}; function R5(a) { const k = a.join(); return R5_CACHE[k] || (R5_CACHE[k] = { o: a[0], d: a[1], b: a[2], l: a[3], h: a[4] }); }
function seaRamp(kind, sea) { const p = PAL5[kind === 'plaza' ? 'stone' : kind]; if (p) return R5(p[Math.min(sea | 0, p.length - 1)]); return mkRamp('#808080'); }
function ell(c, col, cx, cy, rx, ry) { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry + 0.0001)))); fr(c, col, cx - w, cy + y, w * 2 + 1, 1); } }
function stampPx(c, rows, x, y, map) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const ch = r[i]; if (ch !== '.' && map[ch]) fr(c, map[ch], x + i, y + j, 1, 1); } }); }
function boxPx(c, R, x, y, w, h) { fr(c, R.o, x - 1, y - 1, w + 2, h + 2); fr(c, R.b, x, y, w, h); fr(c, R.l, x, y, w, 1); fr(c, R.l, x, y, 1, h); fr(c, R.d, x, y + h - 1, w, 1); fr(c, R.d, x + w - 1, y, 1, h); }
/* shadows multiply the ground by 0.6 (never a translucent black) */
const SHADOW_MUL = '#999999';
function mulDo(c, f) { const op = c.globalCompositeOperation; c.globalCompositeOperation = 'multiply'; f(); c.globalCompositeOperation = op; }
function shadowPx(c, cx, cy, rx, ry) { mulDo(c, () => ell(c, SHADOW_MUL, Math.round(cx), Math.round(cy), Math.round(rx), Math.round(ry))); }
function shadowRect(c, x, y, w, h) { mulDo(c, () => fr(c, SHADOW_MUL, x, y, w, h)); }

/* ---------- ground: painted into a pixel buffer (fast), then decorated with canvas ops ---------- */
function groundKind(tp) { switch (tp) { case T.SWAMP: return 'swamp'; case T.POISON: return 'poison'; case T.SNOW: return 'snow'; case T.ICE: return 'ice'; case T.LAVA: return 'lava'; case T.VOLC: return 'volc'; case T.CAVE: return 'cave'; case T.CHASM: return 'chasm'; case T.WILD: return 'wild'; case T.PATH: case T.DOOR: case T.BRIDGE: return 'path'; case T.PLAZA: return 'plaza'; case T.WATER: return 'water'; case T.SAND: return 'sand'; case T.FIELD: return 'field'; case T.DARK: return 'dark'; case T.ROCK: return null; case T.CLIFF: return 'cliff'; case T.LEDGE: return 'ledge'; default: return 'grass'; } }
const RANK = { swamp: 1, poison: 1, snow: 1, ice: 1, lava: 0, volc: 1, cave: 2, chasm: 0, wild: 1, water: 0, grass: 1, ledge: 1, field: 1, dark: 1, cliff: 1, sand: 2, path: 3, plaza: 4 };
const U32 = {}; function u32(hex) { if (U32[hex]) return U32[hex]; const [r, g, b] = hexRgb(hex); return (U32[hex] = ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0); }
function tileAt(x, y) { return (x < 0 || y < 0 || x >= MW || y >= MH) ? -1 : W.tiles[y * MW + x]; }
const DECO_T = t => t === T.BLD || t === T.TREE || t === T.FENCE || t === T.FLOWER || t === T.ROCK || t === T.DOOR;
function baseKindAt(x, y) { let tp = tileAt(x, y); if (tp < 0) return null; if (tp === T.BLD || tp === T.TREE || tp === T.FENCE || tp === T.FLOWER || tp === T.ROCK) { tp = x >= PLATEAU_X0 ? T.DARK : T.GRASS; if (x > VIL_X1) for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1]]) { const n = tileAt(x + dx, y + dy); if (n >= 0 && !DECO_T(n) && n !== T.PATH && n !== T.BRIDGE && n !== T.CLIFF && n !== T.LAVA && n !== T.CHASM && n !== T.WATER) { tp = n; break; } } } return groundKind(tp); } // V4.2: rocks / trees sit on the surrounding ground
function snoise(x, y, sc, seed) { const gx = Math.floor(x / sc), gy = Math.floor(y / sc), fx = x / sc - gx, fy = y / sc - gy; const sm = t => t * t * (3 - 2 * t); const a = hsh(gx, gy, seed), b = hsh(gx + 1, gy, seed), c = hsh(gx, gy + 1, seed), d = hsh(gx + 1, gy + 1, seed); const u = sm(fx), v = sm(fy); return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v; }
function paintGround(c, sea) {
  const WD = MW * TS, HD = MH * TS; const img = c.createImageData(WD, HD); const buf = new Uint32Array(img.data.buffer);
  const P = (x, y, hex) => { if (x >= 0 && y >= 0 && x < WD && y < HD) buf[y * WD + x] = u32(hex); };
  const G = seaRamp('grass', sea), Pa = seaRamp('path', sea), St = seaRamp('stone', sea), Fd = seaRamp('field', sea), Sd = seaRamp('sand', sea), Cl = seaRamp('cliff', sea), Dk = seaRamp('dark', 0);
  const grassLv = (gx, gy) => snoise(gx, gy, 5, 3) * 0.5 + snoise(gx, gy, 13, 4) * 0.35 + hsh(gx, gy, 5) * 0.15;
  const grassCol = (gx, gy) => { const n = grassLv(gx, gy); return n < 0.3 ? G.d : n < 0.37 ? (((gx + gy) & 1) ? G.d : G.b) : n < 0.62 ? G.b : n < 0.68 ? (((gx + gy) & 1) ? G.l : G.b) : n < 0.8 ? G.l : (sea !== 3 && hsh(gx, gy, 2) < 0.3 ? G.h : G.l); };
  for (let ty = 0; ty < MH; ty++) for (let tx = 0; tx < MW; tx++) {
    const kind = baseKindAt(tx, ty); const x0 = tx * TS, y0 = ty * TS; if (!kind || kind === 'water') continue;
    if (kind === 'grass' || kind === 'ledge') {
      for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const gx = tx * 8 + i, gy = ty * 8 + j; const col = grassCol(gx, gy); P(x0 + i * 2, y0 + j * 2, col); P(x0 + i * 2 + 1, y0 + j * 2, col); P(x0 + i * 2, y0 + j * 2 + 1, col); P(x0 + i * 2 + 1, y0 + j * 2 + 1, col); }
      // V-shaped tufts: 1-2 per tile
      const nt = 1 + (hsh(tx, ty, 6) < 0.55 ? 1 : 0);
      for (let k = 0; k < nt; k++) { const px = x0 + 1 + Math.floor(hsh(tx, ty, 7 + k) * 12), py = y0 + 3 + Math.floor(hsh(tx, ty, 9 + k) * 11);
        if (sea === 3) { if (hsh(tx, ty, 11 + k) < 0.4) { P(px, py, '#8a9a6a'); P(px + 2, py, '#8a9a6a'); P(px + 1, py + 1, '#6a7a5a'); } continue; }
        P(px, py, G.o); P(px + 2, py, G.o); P(px + 1, py + 1, G.o); P(px, py - 1, G.d); P(px + 2, py - 1, G.d); P(px - 1, py - 2, G.l); P(px + 3, py - 2, G.l); P(px + 1, py, G.d); }
      if (sea === 0 && hsh(tx, ty, 12) < 0.1) { const px = x0 + 3 + Math.floor(hsh(tx, ty, 13) * 10), py = y0 + 3 + Math.floor(hsh(tx, ty, 14) * 10); P(px, py, hsh(tx, ty, 15) < 0.5 ? '#ffffff' : '#ffd0e0'); P(px + 1, py + 1, G.d); }
      if (sea === 2 && hsh(tx, ty, 16) < 0.35) { const px = x0 + 2 + Math.floor(hsh(tx, ty, 17) * 11), py = y0 + 2 + Math.floor(hsh(tx, ty, 18) * 11); P(px, py, '#c8602a'); P(px + 1, py, '#e09a3a'); P(px, py + 1, '#7a3a1a'); }
      if (kind === 'ledge') { for (let i = 0; i < 16; i++) if (hsh(tx * 16 + i, ty, 19) < 0.25) P(x0 + i, y0 + Math.floor(hsh(tx * 16 + i, ty, 20) * 16), G.o); }
    } else if (kind === 'path') {
      for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const gx = tx * 8 + i, gy = ty * 8 + j; const n = hsh(gx >> 1, gy >> 1, 30) * 0.6 + hsh(gx, gy, 31) * 0.4; const col = n < 0.22 ? Pa.d : n < 0.78 ? Pa.b : Pa.l; for (let q = 0; q < 4; q++) P(x0 + i * 2 + (q & 1), y0 + j * 2 + (q >> 1), col); }
      // pebbles + ruts along the road direction
      for (let k = 0; k < 4; k++) { const px = x0 + 1 + Math.floor(hsh(tx, ty, 32 + k) * 13), py = y0 + 1 + Math.floor(hsh(tx, ty, 36 + k) * 13); P(px, py, Pa.h); P(px + 1, py, Pa.l); P(px, py + 1, Pa.o); P(px + 1, py + 1, Pa.d); }
      const horiz = baseKindAt(tx - 1, ty) === 'path' || baseKindAt(tx + 1, ty) === 'path'; const vert = baseKindAt(tx, ty - 1) === 'path' || baseKindAt(tx, ty + 1) === 'path';
      if (tileAt(tx, ty) !== T.DOOR) { if (horiz && !vert) { for (let i = 0; i < 16; i++) { if (hsh(tx * 16 + i, ty, 40) < 0.8) { P(x0 + i, y0 + 5, Pa.d); P(x0 + i, y0 + 11, Pa.d); } if (hsh(tx * 16 + i, ty, 41) < 0.5) { P(x0 + i, y0 + 6, Pa.l); P(x0 + i, y0 + 12, Pa.l); } } }
        else if (vert && !horiz) { for (let j = 0; j < 16; j++) { if (hsh(tx, ty * 16 + j, 42) < 0.8) { P(x0 + 5, y0 + j, Pa.d); P(x0 + 11, y0 + j, Pa.d); } if (hsh(tx, ty * 16 + j, 43) < 0.5) { P(x0 + 6, y0 + j, Pa.l); P(x0 + 12, y0 + j, Pa.l); } } } }
      if (sea === 3) for (let k = 0; k < 3; k++) { const px = x0 + Math.floor(hsh(tx, ty, 44 + k) * 12), py = y0 + Math.floor(hsh(tx, ty, 47 + k) * 14); for (let i = 0; i < 4; i++) P(px + i, py, '#f4f8fc'); }
    } else if (kind === 'plaza') {
      // irregular stone blocks continuing across tiles: rows of 6/5 px, widths 5..10, light top-left / dark bottom-right, mortar
      for (let j = 0; j < 16; j++) { const gy = y0 + j; const row = Math.floor(gy / 11) * 2 + ((gy % 11) >= 6 ? 1 : 0); const ry0 = Math.floor(gy / 11) * 11 + ((gy % 11) >= 6 ? 6 : 0), rh = (gy % 11) >= 6 ? 5 : 6; const ly = gy - ry0;
        for (let i = 0; i < 16; i++) { const gx = x0 + i; let bx = -((row * 7) % 9), w = 0, id = 0; while (true) { w = 5 + Math.floor(hsh(id, row, 50) * 6); if (bx + w > gx) break; bx += w; id++; } const lx = gx - bx; const tone = hsh(id, row, 51);
          let col = tone < 0.25 ? St.d : tone < 0.85 ? St.b : St.l; if (lx === 0 || ly === 0) col = lx === 0 && ly === 0 ? St.o : (tone < 0.5 ? St.d : St.o); else if (ly === 1 || lx === 1) col = St.l; else if (ly === rh - 1 || lx === w - 1) col = St.d; if (ly === 1 && lx === 1) col = St.h;
          P(gx, gy, col); } }
      if (sea === 3 && hsh(tx, ty, 52) < 0.35) for (let i = 0; i < 5; i++) P(x0 + 4 + i, y0 + 7, '#fafcff');
    } else if (kind === 'field') {
      const crop = [['#5aa83a', '#86cc54', '#2e6a24'], ['#c8a038', '#e8cc5c', '#8a6a22'], ['#9a6a2a', '#c08a3a', '#5a3a1a'], ['#e8eef4', '#ffffff', '#b0bcc8']][sea];
      for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) { const r = j % 4; P(x0 + i, y0 + j, r === 0 ? Fd.l : r === 3 ? Fd.d : Fd.b); if (r === 3 && hsh(x0 + i, y0 + j, 53) < 0.3) P(x0 + i, y0 + j, Fd.o); }
      for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { const px = x0 + 1 + k * 4 + (r % 2) * 2, py = y0 + r * 4; if (sea === 3) { P(px, py + 1, crop[2]); continue; } P(px, py + 2, crop[2]); P(px + 1, py + 2, crop[2]); P(px, py + 1, crop[0]); P(px + 1, py + 1, crop[0]); P(px, py, crop[1]); P(px + 1, py, crop[0]); if (sea !== 2) P(px + 1, py - 1 + 4 * 0, crop[0]); }
    } else if (kind === 'sand') {
      for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const n = hsh(tx * 8 + i, ty * 8 + j, 60); const col = n < 0.2 ? Sd.d : n < 0.85 ? Sd.b : Sd.l; for (let q = 0; q < 4; q++) P(x0 + i * 2 + (q & 1), y0 + j * 2 + (q >> 1), col); }
      if (hsh(tx, ty, 61) < 0.2) { P(x0 + 6, y0 + 8, Sd.h); P(x0 + 7, y0 + 8, Sd.l); P(x0 + 7, y0 + 9, Sd.o); }
    } else if (kind === 'dark') {
      for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const n = hsh(tx * 8 + i, ty * 8 + j, 70) * 0.5 + hsh((tx * 8 + i) >> 2, (ty * 8 + j) >> 2, 71) * 0.5; const col = n < 0.3 ? Dk.d : n < 0.75 ? Dk.b : Dk.l; for (let q = 0; q < 4; q++) P(x0 + i * 2 + (q & 1), y0 + j * 2 + (q >> 1), col); }
      if (hsh(tx, ty, 72) < 0.2) { const px = x0 + 3 + Math.floor(hsh(tx, ty, 73) * 9), py = y0 + 3 + Math.floor(hsh(tx, ty, 74) * 9); P(px, py, '#6a3a9a'); P(px + 1, py, '#9a58d0'); P(px + 2, py + 1, '#6a3a9a'); P(px + 1, py + 1, '#2a1a3a'); }
    } else if (kind === 'cliff') paintCliffPx(P, tx, ty, sea, Cl, G);
    else paintWildPx(P, kind, tx, ty, x0, y0, sea, G);
  }
  // irregular road / plaza / sand edges (autotile bites + rounded corners), and soft multiply shadows at the foot of cliffs
  for (let ty = 0; ty < MH; ty++) for (let tx = 0; tx < MW; tx++) {
    const kind = baseKindAt(tx, ty); if (kind !== 'path' && kind !== 'sand' && kind !== 'plaza') continue; const me = RANK[kind]; const x0 = tx * TS, y0 = ty * TS;
    const sides = [[0, -1], [1, 0], [0, 1], [-1, 0]]; const own = kind === 'plaza' ? St : kind === 'sand' ? Sd : Pa;
    sides.forEach((d, si) => { const nk = baseKindAt(tx + d[0], ty + d[1]) || kind; if (nk === kind || RANK[nk] === undefined || RANK[nk] >= me || nk === 'water' || nk === 'cliff') return;
      const NG = nk === 'dark' ? Dk : nk === 'path' ? Pa : nk === 'sand' ? Sd : G;
      for (let i = 0; i < 16; i += 2) { const dep = kind === 'plaza' ? 0 : 1 + Math.floor(hsh(tx * 16 + i, ty * 7 + si, 150) * 2.6); for (let k = 0; k < dep; k++) for (let q = 0; q < 2; q++) { const ii = i + q; const px = d[0] === 0 ? x0 + ii : (d[0] > 0 ? x0 + 15 - k : x0 + k), py = d[1] === 0 ? y0 + ii : (d[1] > 0 ? y0 + 15 - k : y0 + k); P(px, py, k === dep - 1 ? NG.d : NG.b); }
        const k = dep; const px = d[0] === 0 ? x0 + i : (d[0] > 0 ? x0 + 15 - k : x0 + k), py = d[1] === 0 ? y0 + i : (d[1] > 0 ? y0 + 15 - k : y0 + k); P(px, py, own.d); P(d[0] === 0 ? px + 1 : px, d[0] === 0 ? py : py + 1, own.d);
        if (kind === 'plaza') { const px2 = d[0] === 0 ? x0 + i : (d[0] > 0 ? x0 + 15 : x0), py2 = d[1] === 0 ? y0 + i : (d[1] > 0 ? y0 + 15 : y0); P(px2, py2, St.o); P(d[0] === 0 ? px2 + 1 : px2, d[0] === 0 ? py2 : py2 + 1, St.o); } }
    });
  }
  c.putImageData(img, 0, 0);
  // cliff foot shadows (multiply) and water
  for (let ty = 0; ty < MH; ty++) for (let tx = 0; tx < MW; tx++) { const tp = tileAt(tx, ty);
    if (tp === T.WATER) c.drawImage(waterTile(sea, 0, waterMask(tx, ty), tx, ty), tx * TS, ty * TS);
    else if (tp !== T.CLIFF && tp !== T.LEDGE && tileAt(tx, ty - 1) === T.CLIFF) shadowRect(c, tx * TS, ty * TS, 16, 2 + (hsh(tx, ty, 160) < 0.5 ? 1 : 0));
    else if (tp !== T.CLIFF && tp !== T.LEDGE && tileAt(tx - 1, ty) === T.CLIFF && tx === PLATEAU_X0) shadowRect(c, tx * TS, ty * TS, 4, 16);
    if (tp === T.BRIDGE) drawBridge(c, tx, ty, sea);
    if (tp === T.PATH && tx === PLATEAU_X0 - 1) drawStairs(c, tx, ty, sea);
  }
}
/* 2-tier rock face: irregular blocks, light top-left, dark bottom-right, grass lip on top, mid-ledge between tiers */
function paintCliffPx(P, tx, ty, sea, Cl, G) {
  const x0 = tx * TS, y0 = ty * TS; const up = tileAt(tx, ty - 1), left = tileAt(tx - 1, ty);
  const eastWall = tx === PLATEAU_X0 - 1;
  for (let i = 0; i < 16; i++) { const gx = x0 + i; const col0 = Math.floor(gx / 7); const cx0 = col0 * 7, cw = 7; const off = Math.floor(hsh(col0, 0, 80) * 9);
    for (let j = 0; j < 16; j++) { const gy = y0 + j; let by = -off, bh = 0, id = 0; while (true) { bh = 5 + Math.floor(hsh(col0, id, 81) * 6); if (by + bh > gy) break; by += bh; id++; }
      const lx = gx - cx0 - (hsh(col0, id, 86) < 0.5 ? 0 : 0), ly = gy - by; const tone = hsh(col0, id, 82); const t = (lx / cw) * 0.5 + (ly / bh) * 0.5;
      let col = t < 0.25 ? Cl.l : t < 0.62 ? Cl.b : t < 0.85 ? Cl.d : Cl.o; if (tone < 0.25 && col === Cl.l) col = Cl.b; if (tone > 0.8 && col === Cl.d) col = Cl.b;
      if (ly === 0 || lx === 0) col = Cl.o; if (ly === 1 && lx === 1) col = Cl.h; if (ly === 0 && hsh(gx, gy, 87) < 0.3) col = Cl.d;
      if (tone > 0.6 && ly === bh - 1 && hsh(gx, id, 88) < 0.5) col = G.d; // moss in the seams
      P(gx, gy, col); } }
  for (let k = 0; k < 2; k++) { const cxk = x0 + 2 + Math.floor(hsh(tx, ty, 89 + k) * 12); let yy = y0 + Math.floor(hsh(tx, ty, 91 + k) * 6); for (let n = 0; n < 7; n++) { P(cxk + (n % 3 === 2 ? 1 : 0), yy + n, Cl.o); } }
  // depth: the lower part of the lowest face row is darker
  if (tileAt(tx, ty + 1) !== T.CLIFF && !eastWall) for (let j = 12; j < 16; j++) for (let i = 0; i < 16; i++) if ((i + j) % 2 === 0 || j >= 14) P(x0 + i, y0 + j, j === 15 ? Cl.o : Cl.d);
  // grass lip hanging over the top edge (from the ledge above or as the mid-tier ledge)
  const lip = up === T.LEDGE || (up === T.CLIFF && hsh(tx, ty, 83) < 0.75 && !eastWall);
  if (lip) for (let i = 0; i < 16; i++) { const dep = 2 + Math.floor(hsh(x0 + i, ty, 84) * 3) + (up === T.CLIFF ? 0 : 1); for (let k = 0; k < dep; k++) P(x0 + i, y0 + k, k === dep - 1 ? G.o : k === 0 ? G.l : G.b); if (hsh(x0 + i, ty, 85) < 0.15) P(x0 + i, y0 + dep, G.d); }
  if (eastWall) { for (let j = 0; j < 16; j++) { P(x0 + 11, y0 + j, Cl.o); for (let i = 12; i < 16; i++) P(x0 + i, y0 + j, (i + j) % 3 === 0 ? '#2a2438' : '#3a3250'); P(x0, y0 + j, Cl.l); } }
  if (sea === 3 && lip) for (let i = 0; i < 16; i++) P(x0 + i, y0, '#f4f8fc');
}
function drawStairs(c, tx, ty, sea) { const x = tx * TS, y = ty * TS; const S = seaRamp('stone', sea); for (let i = 0; i < 16; i += 3) { fr(c, S.o, x + i, y, 1, 16); fr(c, S.l, x + i + 1, y, 1, 16); fr(c, S.b, x + i + 2, y, 1, 16); } fr(c, S.o, x, y, 16, 1); fr(c, S.o, x, y + 15, 16, 1); }
/* ---------- water tiles with 4 frames, foam edges, ice in winter ---------- */
const WATER_TILE = {};
function waterTile(sea, frame, mask, tx, ty) {
  const key = sea + '.' + (sea === 3 ? 0 : frame) + '.' + mask + '.' + ((tx * 3 + ty) & 3); if (WATER_TILE[key]) return WATER_TILE[key];
  const cv = mkCanvas(16, 16), c = cv.getContext('2d'); const W_ = seaRamp('water', sea); fr(c, W_.b, 0, 0, 16, 16);
  if (sea === 3) { fr(c, W_.l, 0, 0, 16, 16); for (let k = 0; k < 4; k++) { fr(c, '#ffffff', 2 + ((tx * 5 + ty * 3 + k * 5) % 11), 2 + k * 4, 4, 1); } fr(c, W_.d, 3 + (tx % 5), 4, 1, 3); fr(c, W_.d, 4 + (tx % 5), 7, 3, 1); fr(c, W_.d, 9, 9 + (ty % 3), 1, 4); }
  else {
    for (let r = 0; r < 4; r++) { const yy = r * 4 + 1; const sh = (frame * 3 + r * 5 + ((tx * 7 + ty * 3) & 7)) % 16; fr(c, W_.l, sh, yy, 5, 1); fr(c, W_.h, (sh + 1) % 16, yy, 2, 1); fr(c, W_.d, (sh + 8) % 16, yy + 2, 4, 1); }
    if ((((tx * 3 + ty * 5) + frame) & 3) === 0) { fr(c, '#ffffff', 3 + ((tx * 5 + frame * 4) & 7), 5 + (ty & 3) * 2, 2, 1); }
  }
  // land neighbours: N=1 E=2 S=4 W=8 -> foam + dark bank
  const foamPh = sea === 3 ? 0 : (frame >> 1) & 1;
  if (mask & 1) { fr(c, W_.d, 0, 0, 16, 1); for (let i = 0; i < 16; i++) if ((i + foamPh * 2) % 4 < 3) fr(c, '#f4fbff', i, 1, 1, 1); }
  if (mask & 4) { fr(c, W_.d, 0, 15, 16, 1); for (let i = 0; i < 16; i++) if ((i + foamPh * 2) % 4 < 3) fr(c, '#f4fbff', i, 14, 1, 1); }
  if (mask & 8) { fr(c, W_.d, 0, 0, 1, 16); for (let i = 0; i < 16; i++) if ((i + foamPh * 2) % 4 < 3) fr(c, '#f4fbff', 1, i, 1, 1); }
  if (mask & 2) { fr(c, W_.d, 15, 0, 1, 16); for (let i = 0; i < 16; i++) if ((i + foamPh * 2) % 4 < 3) fr(c, '#f4fbff', 14, i, 1, 1); }
  return (WATER_TILE[key] = cv);
}
function waterMask(tx, ty) { const w = (x, y) => (x < 0 || y < 0 || x >= MW || y >= MH) ? true : W.tiles[y * MW + x] === T.WATER; return (w(tx, ty - 1) ? 0 : 1) | (w(tx + 1, ty) ? 0 : 2) | (w(tx, ty + 1) ? 0 : 4) | (w(tx - 1, ty) ? 0 : 8); }
/* ---------- trees: conifer 16x32, broadleaf 32x32 (3-layer crown), shrub 16x16 — all with multiply shadows, snow in winter ---------- */
function treeKind(tx, ty) { const v = hsh(tx, ty, 200); if (tx >= PLATEAU_X0) return v < 0.7 ? 'dead' : 'conifer'; if (tileAt(tx, ty) === T.LEDGE) return 'conifer'; return v < 0.42 ? 'conifer' : v < 0.85 ? 'broad' : v < 0.97 ? 'shrub' : 'dead'; }
function drawConifer(c, x, y, sea, v) {
  const L = seaRamp('pine', sea); const tr = R5(PAL5.wood[0]); const cx = x + 8;
  shadowPx(c, cx + 3, y + 14, 8, 3);
  fr(c, tr.o, cx - 2, y + 7, 4, 9); fr(c, tr.d, cx - 1, y + 8, 2, 7); fr(c, tr.b, cx - 1, y + 8, 1, 6);
  const tiers = [[-16, 4], [-10, 6], [-3, 7], [4, 8]]; // [top, half width at base]
  tiers.forEach(([top, hw], t) => { const hgt = 9 + (t === 3 ? 1 : 0); for (let r = 0; r < hgt; r++) { const w = Math.max(1, Math.round(hw * (r + 1) / hgt)); const yy = y + top + r; fr(c, L.o, cx - w - 1, yy, w * 2 + 2, 1); } });
  tiers.forEach(([top, hw], t) => { const hgt = 9 + (t === 3 ? 1 : 0); for (let r = 0; r < hgt; r++) { const w = Math.max(1, Math.round(hw * (r + 1) / hgt)); const yy = y + top + r; const last = r === hgt - 1;
    fr(c, last ? L.o : L.b, cx - w, yy, w * 2, 1); if (!last) { fr(c, L.l, cx - w, yy, Math.max(1, w - 1), 1); fr(c, L.d, cx + Math.max(0, Math.floor(w / 3)), yy, Math.ceil(w * 2 / 3), 1); if (r === hgt - 2) fr(c, L.d, cx - w, yy, w * 2, 1); if (r % 3 === 1 && w > 2) fr(c, L.h, cx - w + 1, yy, 1, 1); } } });
  fr(c, L.o, cx + 7, y + 4, 1, 6); // right rim
  if (sea === 3) tiers.forEach(([top, hw], t) => { fr(c, '#f4f8fc', cx - 1, y + top, 2, 2); fr(c, '#f4f8fc', cx - Math.round(hw * 0.7), y + top + 6, Math.round(hw * 0.9), 1); fr(c, '#cfe0ee', cx - Math.round(hw * 0.5), y + top + 7, Math.round(hw * 0.5), 1); });
}
function clump(c, L, cx, cy, r) { ell(c, L.o, cx, cy, r + 1, r + 1); }
function drawBroad(c, x, y, sea, v) {
  const L = seaRamp('leaf', sea); const tr = R5(PAL5.wood[0]); const cx = x + 8, cy = y - 4;
  shadowPx(c, cx + 5, y + 14, 13, 4);
  fr(c, tr.o, cx - 3, y + 2, 6, 14); fr(c, tr.b, cx - 2, y + 3, 4, 12); fr(c, tr.l, cx - 2, y + 3, 1, 12); fr(c, tr.d, cx + 1, y + 4, 1, 11); fr(c, tr.o, cx - 4, y + 14, 2, 2); fr(c, tr.o, cx + 2, y + 14, 3, 2);
  if (sea === 3 && v < 0.5) { // bare branches with snow
    [[-9, -4, 9, 1], [1, -8, 8, 1], [-6, -12, 7, 1], [3, -2, 7, 1]].forEach(b => { fr(c, tr.o, cx + b[0], cy + b[1] - 1, b[2] + 1, 3); fr(c, tr.b, cx + b[0], cy + b[1], b[2], 1); fr(c, '#f4f8fc', cx + b[0], cy + b[1] - 1, b[2], 1); });
    fr(c, tr.o, cx - 2, cy - 12, 4, 18); fr(c, tr.b, cx - 1, cy - 11, 2, 16); return;
  }
  const cl = [[-8, 2, 7], [7, 2, 7], [0, -6, 9], [-5, -10, 6], [6, -9, 6], [0, 4, 8]].map(p => [cx + p[0], cy + p[1], p[2]]);
  cl.forEach(p => ell(c, L.o, p[0], p[1], p[2] + 1, p[2]));
  cl.forEach(p => ell(c, L.d, p[0], p[1], p[2], p[2] - 1));
  cl.forEach(p => ell(c, L.b, p[0] - 1, p[1] - 2, p[2] - 2, p[2] - 3));
  cl.forEach(p => ell(c, L.l, p[0] - 3, p[1] - 4, Math.max(1, p[2] - 5), Math.max(1, p[2] - 6)));
  cl.forEach(p => fr(c, L.h, p[0] - 4, p[1] - 5, 2, 1));
  for (let k = 0; k < 8; k++) { const px = cx - 11 + Math.floor(hsh(x, y, 210 + k) * 22), py = cy - 12 + Math.floor(hsh(x, y, 220 + k) * 18); fr(c, L.d, px, py, 2, 1); fr(c, L.o, px, py + 1, 1, 1); }
  if (sea === 0 && v < 0.2) for (let k = 0; k < 5; k++) fr(c, k % 2 ? '#ffd8e8' : '#ffffff', cx - 8 + Math.floor(hsh(x, y, 230 + k) * 16), cy - 10 + Math.floor(hsh(x, y, 235 + k) * 14), 1, 1);
  if (sea === 1 && v > 0.75) for (let k = 0; k < 4; k++) { fr(c, '#d83a3a', cx - 7 + Math.floor(hsh(x, y, 240 + k) * 14), cy - 6 + Math.floor(hsh(x, y, 245 + k) * 12), 2, 2); }
  if (sea === 3) { cl.forEach(p => { fr(c, '#f4f8fc', p[0] - p[2] + 2, p[1] - p[2] + 1, p[2] * 2 - 4, 2); fr(c, '#cfe0ee', p[0] - p[2] + 3, p[1] - p[2] + 3, p[2], 1); }); }
}
function drawShrub(c, x, y, sea) { const L = seaRamp('leaf', sea); shadowPx(c, x + 10, y + 14, 7, 2); ell(c, L.o, x + 8, y + 9, 8, 6); ell(c, L.d, x + 8, y + 9, 7, 5); ell(c, L.b, x + 7, y + 8, 5, 4); ell(c, L.l, x + 5, y + 6, 2, 2); fr(c, L.h, x + 4, y + 5, 2, 1); fr(c, L.d, x + 9, y + 11, 3, 1); if (sea === 3) { fr(c, '#f4f8fc', x + 3, y + 3, 9, 2); fr(c, '#cfe0ee', x + 4, y + 5, 6, 1); } }
function drawDeadTree(c, x, y, sea) { const tr = mkRamp('#5a4a40'); shadowPx(c, x + 11, y + 14, 7, 2); fr(c, tr.o, x + 6, y - 2, 5, 18); fr(c, tr.b, x + 7, y - 1, 3, 16); fr(c, tr.l, x + 7, y - 1, 1, 16); [[2, 1, 5], [10, -1, 4], [3, 5, 4], [10, 4, 4]].forEach(b => { fr(c, tr.o, x + b[0] - 1, y + b[1] - 1, b[2] + 2, 3); fr(c, tr.b, x + b[0], y + b[1], b[2], 1); }); if (sea === 3) { fr(c, '#f4f8fc', x + 6, y - 3, 5, 1); fr(c, '#f4f8fc', x + 2, y, 5, 1); } }
function drawTree(c, tx, ty, sea) { const x = tx * TS, y = ty * TS; const k = treeKind(tx, ty); const v = hsh(tx, ty, 201); if (k === 'conifer') drawConifer(c, x, y, sea, v); else if (k === 'broad') drawBroad(c, x, y, sea, v); else if (k === 'shrub') drawShrub(c, x, y, sea); else drawDeadTree(c, x, y, sea); }
function drawRock(c, tx, ty, sea) {
  const x = tx * TS, y = ty * TS; const R = seaRamp('cliff', sea); shadowPx(c, x + 10, y + 13, 7, 2);
  ell(c, R.o, x + 8, y + 9, 7, 5); ell(c, R.d, x + 8, y + 9, 6, 4); ell(c, R.b, x + 7, y + 8, 5, 3); ell(c, R.l, x + 5, y + 7, 2, 1); fr(c, R.h, x + 4, y + 6, 2, 1); fr(c, R.o, x + 9, y + 7, 1, 3); fr(c, R.d, x + 10, y + 11, 3, 1);
  if (hsh(tx, ty, 221) < 0.4 && sea !== 3) { const G = seaRamp('grass', sea); fr(c, G.d, x + 3, y + 12, 3, 1); fr(c, G.b, x + 4, y + 11, 2, 1); }
  if (sea === 3) ell(c, '#f4f8fc', x + 7, y + 5, 5, 1);
}
function drawFence(c, tx, ty, sea) {
  const x = tx * TS, y = ty * TS; const f = (dx, dy) => { const xx = tx + dx, yy = ty + dy; return xx >= 0 && yy >= 0 && xx < MW && yy < MH && W.tiles[yy * MW + xx] === T.FENCE; }; const Wd = mkRamp('#8a6a3a');
  const post = (px, py) => { fr(c, Wd.o, px - 1, py - 1, 4, 11); fr(c, Wd.b, px, py, 2, 9); fr(c, Wd.l, px, py, 1, 9); fr(c, Wd.d, px + 1, py + 3, 1, 6); if (sea === 3) fr(c, '#f4f8fc', px - 1, py - 1, 4, 2); };
  if (f(1, 0) || f(-1, 0) || (!f(0, 1) && !f(0, -1))) { const x0 = f(-1, 0) ? x : x + 2, x1 = f(1, 0) ? x + 16 : x + 14; fr(c, Wd.o, x0, y + 4, x1 - x0, 4); fr(c, Wd.b, x0, y + 5, x1 - x0, 2); fr(c, Wd.l, x0, y + 5, x1 - x0, 1); fr(c, Wd.o, x0, y + 9, x1 - x0, 3); fr(c, Wd.b, x0, y + 10, x1 - x0, 1); }
  if (f(0, 1) || f(0, -1)) { const y0 = f(0, -1) ? y : y + 3, y1 = f(0, 1) ? y + 16 : y + 12; fr(c, Wd.o, x + 6, y0, 4, y1 - y0); fr(c, Wd.b, x + 7, y0, 2, y1 - y0); fr(c, Wd.l, x + 7, y0, 1, y1 - y0); }
  post(x + 2, y + 3); post(x + 12, y + 3);
}
/* ---------- props ---------- */
const PROPS = {
  barrel: (c, x, y) => { shadowPx(c, x + 8, y + 14, 5, 2); const R = mkRamp('#8a5a2c'); fr(c, R.o, x + 4, y + 4, 9, 11); fr(c, R.b, x + 5, y + 5, 7, 9); fr(c, R.l, x + 5, y + 5, 2, 9); fr(c, R.d, x + 10, y + 5, 2, 9); fr(c, '#3a3a48', x + 4, y + 7, 9, 1); fr(c, '#3a3a48', x + 4, y + 11, 9, 1); fr(c, R.l, x + 5, y + 4, 7, 1); },
  crate: (c, x, y) => { shadowPx(c, x + 8, y + 14, 6, 2); boxPx(c, mkRamp('#a8783c'), x + 3, y + 5, 10, 9); fr(c, '#6a4a22', x + 3, y + 5, 10, 1); fr(c, '#6a4a22', x + 7, y + 5, 1, 9); fr(c, '#7a5a2c', x + 3, y + 9, 10, 1); },
  sack: (c, x, y) => { shadowPx(c, x + 8, y + 14, 5, 2); const R = mkRamp('#d6c08a'); ell(c, R.o, x + 8, y + 10, 5, 5); ell(c, R.b, x + 8, y + 10, 4, 4); fr(c, R.l, x + 6, y + 8, 2, 2); fr(c, R.d, x + 10, y + 11, 2, 2); fr(c, R.o, x + 6, y + 4, 4, 2); fr(c, '#8a5a30', x + 6, y + 6, 4, 1); },
  haystack: (c, x, y) => { shadowPx(c, x + 8, y + 14, 7, 2); const R = mkRamp('#d8b44c'); ell(c, R.o, x + 8, y + 9, 7, 6); ell(c, R.b, x + 8, y + 9, 6, 5); ell(c, R.l, x + 6, y + 7, 3, 2); fr(c, R.d, x + 3, y + 12, 10, 1); for (let i = 0; i < 4; i++) fr(c, R.d, x + 4 + i * 3, y + 7 + (i % 2) * 2, 1, 2); fr(c, R.h, x + 5, y + 6, 2, 1); },
  lamp: (c, x, y) => { shadowPx(c, x + 8, y + 15, 3, 1); fr(c, '#1c1c2a', x + 7, y + 4, 3, 12); fr(c, '#4a4a5a', x + 8, y + 5, 1, 10); fr(c, '#1c1c2a', x + 5, y + 1, 7, 5); fr(c, '#ffe8a0', x + 6, y + 2, 5, 3); fr(c, '#fff8d8', x + 7, y + 2, 2, 2); fr(c, '#1c1c2a', x + 6, y, 5, 1); LAMPS.push({ x: x + 8, y: y + 3 }); },
  signpost: (c, x, y) => { shadowPx(c, x + 8, y + 15, 4, 1); const R = mkRamp('#8a5a30'); fr(c, R.o, x + 7, y + 5, 3, 11); fr(c, R.b, x + 8, y + 5, 1, 10); fr(c, R.o, x + 2, y + 2, 12, 6); fr(c, '#d8c088', x + 3, y + 3, 10, 4); fr(c, '#8a5a30', x + 4, y + 5, 6, 1); fr(c, '#3a2a1a', x + 11, y + 4, 1, 2); },
  bench: (c, x, y) => { shadowPx(c, x + 8, y + 14, 7, 2); const R = mkRamp('#9a6a38'); fr(c, R.o, x + 1, y + 6, 14, 4); fr(c, R.b, x + 2, y + 7, 12, 2); fr(c, R.l, x + 2, y + 7, 12, 1); fr(c, R.o, x + 2, y + 10, 3, 4); fr(c, R.o, x + 11, y + 10, 3, 4); fr(c, R.d, x + 3, y + 10, 1, 3); fr(c, R.d, x + 12, y + 10, 1, 3); fr(c, R.b, x + 2, y + 3, 12, 2); fr(c, R.o, x + 2, y + 2, 12, 1); },
  grave: (c, x, y) => { shadowPx(c, x + 9, y + 14, 5, 2); const R = mkRamp('#a0a0ae'); fr(c, R.o, x + 4, y + 4, 8, 11); fr(c, R.b, x + 5, y + 5, 6, 10); fr(c, R.l, x + 5, y + 5, 2, 9); fr(c, R.d, x + 10, y + 6, 1, 8); fr(c, R.o, x + 5, y + 3, 6, 1); fr(c, R.d, x + 7, y + 7, 2, 1); fr(c, R.d, x + 8, y + 6, 1, 3); fr(c, '#4a7a3a', x + 3, y + 14, 3, 1); },
  cross: (c, x, y) => { shadowPx(c, x + 9, y + 14, 4, 1); const R = mkRamp('#a0a0ae'); fr(c, R.o, x + 6, y + 2, 4, 13); fr(c, R.b, x + 7, y + 3, 2, 11); fr(c, R.o, x + 3, y + 5, 10, 4); fr(c, R.b, x + 4, y + 6, 8, 2); fr(c, R.l, x + 7, y + 3, 1, 11); },
  stoneLantern: (c, x, y) => { shadowPx(c, x + 8, y + 15, 4, 1); const R = mkRamp('#9a9aa8'); fr(c, R.o, x + 5, y + 12, 7, 4); fr(c, R.b, x + 6, y + 12, 5, 3); fr(c, R.o, x + 7, y + 7, 3, 6); fr(c, R.b, x + 8, y + 7, 1, 5); fr(c, R.o, x + 5, y + 3, 7, 5); fr(c, '#ffd870', x + 7, y + 4, 3, 3); fr(c, R.b, x + 4, y + 2, 9, 2); fr(c, R.l, x + 5, y + 2, 5, 1); LAMPS.push({ x: x + 8, y: y + 5 }); },
  flag: (c, x, y) => { shadowPx(c, x + 8, y + 15, 3, 1); fr(c, '#5a3a22', x + 7, y - 6, 2, 21); fr(c, '#e8c860', x + 7, y - 7, 2, 1); FLAGS.push({ x: x + 9, y: y - 5, col: '#c04040' }); },
  flowerpot: (c, x, y) => { shadowPx(c, x + 8, y + 15, 4, 1); const R = mkRamp('#c0643a'); fr(c, R.o, x + 5, y + 9, 7, 6); fr(c, R.b, x + 6, y + 10, 5, 4); fr(c, R.l, x + 6, y + 10, 1, 4); fr(c, '#3a8a3a', x + 5, y + 6, 7, 4); fr(c, '#ff6a8a', x + 6, y + 5, 2, 2); fr(c, '#ffd040', x + 10, y + 6, 2, 2); fr(c, '#fff', x + 8, y + 4, 2, 2); },
  clothesline: (c, x, y) => { fr(c, '#5a3a22', x, y + 4, 2, 11); fr(c, '#5a3a22', x + 14, y + 4, 2, 11); fr(c, '#c8c8d0', x + 2, y + 5, 12, 1); const cols = ['#f0f0f0', '#e07070', '#7090e0']; for (let i = 0; i < 3; i++) { fr(c, '#1c1626', x + 3 + i * 4 - 0, y + 6, 4, 6); fr(c, cols[i], x + 4 + i * 4, y + 6, 2, 5); } },
  cart: (c, x, y) => { shadowPx(c, x + 8, y + 15, 7, 2); const R = mkRamp('#a07040'); fr(c, R.o, x + 1, y + 6, 14, 6); fr(c, R.b, x + 2, y + 7, 12, 4); fr(c, R.l, x + 2, y + 7, 12, 1); fr(c, '#d8b44c', x + 3, y + 5, 8, 2); ell(c, '#1c1626', x + 4, y + 13, 3, 3); ell(c, '#6a4a2a', x + 4, y + 13, 2, 2); ell(c, '#1c1626', x + 12, y + 13, 3, 3); ell(c, '#6a4a2a', x + 12, y + 13, 2, 2); },
  bush: (c, x, y, sea) => { shadowPx(c, x + 8, y + 14, 6, 2); const L = seaRamp('leaf', sea || 0); ell(c, L.o, x + 8, y + 10, 7, 5); ell(c, L.d, x + 8, y + 10, 6, 4); ell(c, L.b, x + 7, y + 9, 5, 3); fr(c, L.l, x + 4, y + 7, 3, 1); fr(c, L.h, x + 5, y + 7, 1, 1); },
  berryBush: (c, x, y, sea) => { PROPS.bush(c, x, y, sea); fr(c, '#e84a5a', x + 5, y + 9, 1, 1); fr(c, '#e84a5a', x + 9, y + 8, 1, 1); fr(c, '#e84a5a', x + 10, y + 11, 1, 1); fr(c, '#e84a5a', x + 7, y + 11, 1, 1); },
  stump: (c, x, y) => { shadowPx(c, x + 8, y + 14, 5, 2); const R = mkRamp('#7a5230'); ell(c, R.o, x + 8, y + 11, 5, 4); ell(c, R.b, x + 8, y + 11, 4, 3); ell(c, '#c8a060', x + 8, y + 9, 4, 2); fr(c, '#9a7a40', x + 6, y + 9, 4, 1); },
  mushrooms: (c, x, y) => { fr(c, '#f4ecd8', x + 5, y + 11, 2, 3); fr(c, '#d84040', x + 3, y + 9, 6, 3); fr(c, '#fff', x + 4, y + 10, 1, 1); fr(c, '#f4ecd8', x + 10, y + 12, 2, 2); fr(c, '#e0a040', x + 9, y + 10, 4, 2); },
  woodpile: (c, x, y) => { shadowPx(c, x + 8, y + 14, 7, 2); const R = mkRamp('#8a5a30'); for (let r = 0; r < 3; r++) for (let k = 0; k < 4 - (r === 2 ? 1 : 0); k++) { const px = x + 2 + k * 3 + (r === 2 ? 2 : 0), py = y + 6 + r * 3; ell(c, R.o, px + 1, py + 1, 2, 2); fr(c, '#d8b070', px, py, 2, 2); } },
  scarecrow: (c, x, y) => { fr(c, '#5a3a22', x + 7, y + 4, 2, 11); fr(c, '#5a3a22', x + 2, y + 6, 12, 2); fr(c, '#c8a050', x + 5, y + 7, 6, 5); fr(c, '#e8d0a0', x + 6, y + 1, 4, 4); fr(c, '#8a5a30', x + 4, y + 1, 8, 1); fr(c, '#8a5a30', x + 6, y - 1, 4, 2); fr(c, '#1c1626', x + 7, y + 3, 1, 1); fr(c, '#1c1626', x + 9, y + 3, 1, 1); },
  beehive: (c, x, y) => { shadowPx(c, x + 8, y + 14, 4, 2); const R = mkRamp('#e0b040'); ell(c, R.o, x + 8, y + 10, 4, 5); ell(c, R.b, x + 8, y + 10, 3, 4); fr(c, R.d, x + 5, y + 9, 6, 1); fr(c, R.d, x + 5, y + 12, 6, 1); fr(c, '#1c1626', x + 7, y + 11, 2, 2); },
  well2: (c, x, y) => { shadowPx(c, x + 8, y + 14, 6, 2); const R = mkRamp('#9a9aa6'); fr(c, R.o, x + 3, y + 7, 11, 8); fr(c, R.b, x + 4, y + 8, 9, 6); fr(c, R.l, x + 4, y + 8, 9, 1); fr(c, '#1a2a4a', x + 5, y + 9, 7, 3); fr(c, '#5a3a22', x + 3, y + 2, 2, 7); fr(c, '#5a3a22', x + 12, y + 2, 2, 7); fr(c, '#8a5a30', x + 2, y + 1, 13, 2); },
  puddle: (c, x, y) => { c.globalAlpha = 0.8; ell(c, '#4a86d0', x + 8, y + 11, 5, 2); c.globalAlpha = 1; fr(c, '#a8d0ff', x + 6, y + 10, 3, 1); },
  anvil: (c, x, y) => { shadowPx(c, x + 8, y + 14, 5, 2); fr(c, '#1c1c2a', x + 3, y + 6, 11, 3); fr(c, '#5a5a6a', x + 4, y + 6, 9, 2); fr(c, '#1c1c2a', x + 6, y + 9, 5, 5); fr(c, '#4a4a5a', x + 7, y + 9, 3, 4); fr(c, '#8a8a9a', x + 4, y + 6, 6, 1); },
};
Object.assign(PROPS, {
  flowerbed: (c, x, y, sea) => { const S = seaRamp('stone', sea), F = seaRamp('field', sea); fr(c, S.o, x + 1, y + 6, 14, 9); fr(c, S.l, x + 2, y + 7, 12, 7); fr(c, F.b, x + 3, y + 8, 10, 5); fr(c, F.d, x + 3, y + 12, 10, 1); if (sea === 3) { fr(c, '#f4f8fc', x + 3, y + 8, 10, 2); return; } const cols = sea === 2 ? ['#d86a2a', '#e8a838', '#b84a2a'] : ['#ff6a8a', '#ffd040', '#ffffff', '#a07aff']; for (let i = 0; i < 5; i++) { const px = x + 3 + i * 2, py = y + 8 + (i % 2); fr(c, '#2e6a24', px, py + 1, 1, 3); fr(c, cols[i % cols.length], px, py, 2, 2); fr(c, '#ffffffa0', px, py, 1, 1); } },
  garden: (c, x, y, sea) => { const F = seaRamp('field', sea); fr(c, F.o, x, y + 3, 16, 12); fr(c, F.b, x + 1, y + 4, 14, 10); for (let r = 0; r < 3; r++) { fr(c, F.d, x + 1, y + 7 + r * 3, 14, 1); for (let k = 0; k < 4; k++) { const px = x + 2 + k * 4, py = y + 4 + r * 3; if (sea === 3) { fr(c, '#f4f8fc', px, py + 1, 3, 1); continue; } fr(c, '#2e6a24', px, py + 1, 3, 2); fr(c, '#5aa83a', px, py, 2, 2); fr(c, r === 1 ? '#e04a2a' : r === 2 ? '#e8d050' : '#86cc54', px + 1, py + 1, 1, 1); } } const Wd = R5(PAL5.wood[0]); fr(c, Wd.o, x, y + 2, 1, 13); fr(c, Wd.o, x + 15, y + 2, 1, 13); fr(c, Wd.l, x, y + 2, 16, 1); },
  pebbles: (c, x, y, sea) => { const R = seaRamp('cliff', sea); [[4, 10, 3, 2], [9, 12, 2, 1], [11, 8, 2, 2]].forEach(p => { shadowPx(c, x + p[0] + 2, y + p[1] + 2, p[2], 1); fr(c, R.o, x + p[0] - 1, y + p[1] - 1, p[2] + 2, p[3] + 2); fr(c, R.b, x + p[0], y + p[1], p[2], p[3]); fr(c, R.l, x + p[0], y + p[1], 1, 1); }); },
  pot: (c, x, y) => { shadowPx(c, x + 9, y + 14, 4, 1); const R = mkRamp('#b0603a'); fr(c, R.o, x + 4, y + 7, 8, 8); fr(c, R.b, x + 5, y + 8, 6, 6); fr(c, R.l, x + 5, y + 8, 2, 5); fr(c, R.d, x + 9, y + 9, 2, 5); fr(c, R.o, x + 5, y + 6, 6, 1); fr(c, R.l, x + 5, y + 6, 6, 1); fr(c, '#2a1a1a', x + 6, y + 7, 4, 1); },
  logs: (c, x, y, sea) => { shadowPx(c, x + 9, y + 14, 7, 2); const R = R5(PAL5.wood[0]); for (let i = 0; i < 3; i++) { const yy = y + 7 + i * 2 - (i === 2 ? 4 : 0), xx = x + 1 + (i === 2 ? 3 : 0); fr(c, R.o, xx, yy, 14 - (i === 2 ? 6 : 0), 4); fr(c, R.b, xx + 1, yy + 1, 12 - (i === 2 ? 6 : 0), 2); fr(c, R.l, xx + 1, yy + 1, 12 - (i === 2 ? 6 : 0), 1); fr(c, '#d8b070', xx + 12 - (i === 2 ? 6 : 0), yy + 1, 2, 2); } if (sea === 3) fr(c, '#f4f8fc', x + 4, y + 3, 8, 1); },
  trough: (c, x, y) => { shadowPx(c, x + 9, y + 14, 7, 2); const R = R5(PAL5.wood[0]); fr(c, R.o, x + 1, y + 7, 14, 7); fr(c, R.b, x + 2, y + 8, 12, 5); fr(c, '#2c72c0', x + 3, y + 8, 10, 2); fr(c, '#8ac4f0', x + 4, y + 8, 3, 1); fr(c, R.d, x + 2, y + 12, 12, 1); },
  wheelbarrow: (c, x, y) => { shadowPx(c, x + 9, y + 14, 6, 2); const R = R5(PAL5.wood[0]); fr(c, R.o, x + 2, y + 6, 10, 6); fr(c, R.b, x + 3, y + 7, 8, 4); fr(c, R.l, x + 3, y + 7, 8, 1); fr(c, '#5a3a1a', x + 11, y + 8, 4, 1); ell(c, '#1c1626', x + 6, y + 13, 2, 2); fr(c, '#8a8a9a', x + 6, y + 13, 1, 1); fr(c, '#5aa83a', x + 4, y + 5, 5, 2); },
  crates2: (c, x, y) => { shadowPx(c, x + 9, y + 14, 7, 2); const R = mkRamp('#a8783c'); boxPx(c, R, x + 1, y + 8, 8, 6); boxPx(c, R, x + 8, y + 9, 7, 5); boxPx(c, R, x + 4, y + 3, 7, 5); fr(c, R.d, x + 1, y + 10, 8, 1); fr(c, R.d, x + 8, y + 11, 7, 1); },
  stoneSmall: (c, x, y, sea) => { const R = seaRamp('cliff', sea); shadowPx(c, x + 10, y + 13, 5, 2); ell(c, R.o, x + 8, y + 10, 5, 3); ell(c, R.b, x + 7, y + 9, 4, 2); fr(c, R.l, x + 5, y + 8, 3, 1); fr(c, R.h, x + 5, y + 8, 1, 1); },
  fenceH: (c, x, y, sea) => { const Wd = R5(PAL5.wood[0]); shadowRect(c, x, y + 12, 16, 2); fr(c, Wd.o, x, y + 5, 16, 3); fr(c, Wd.l, x, y + 5, 16, 1); fr(c, Wd.o, x, y + 9, 16, 3); fr(c, Wd.b, x, y + 10, 16, 1); [2, 13].forEach(p => { fr(c, Wd.o, x + p - 1, y + 2, 3, 11); fr(c, Wd.b, x + p, y + 3, 1, 9); }); if (sea === 3) fr(c, '#f4f8fc', x, y + 4, 16, 1); },
  bones: (c, x, y) => { shadowPx(c, x + 9, y + 14, 5, 1); const W2 = '#ece4d0', D2 = '#a89c84'; fr(c, '#181020', x + 4, y + 8, 9, 6); fr(c, W2, x + 5, y + 9, 7, 4); fr(c, '#181020', x + 6, y + 10, 2, 2); fr(c, '#181020', x + 9, y + 10, 2, 2); fr(c, D2, x + 6, y + 12, 5, 1); fr(c, W2, x + 1, y + 13, 5, 1); fr(c, W2, x + 11, y + 12, 4, 1); fr(c, D2, x + 1, y + 14, 5, 1); },
  signboard: (c, x, y) => { shadowPx(c, x + 9, y + 15, 5, 1); const R = R5(PAL5.wood[0]); fr(c, R.o, x + 3, y + 8, 2, 8); fr(c, R.o, x + 11, y + 8, 2, 8); fr(c, R.o, x + 1, y + 2, 14, 8); fr(c, R.l, x + 2, y + 3, 12, 6); for (let i = 0; i < 3; i++) fr(c, '#f0e8d0', x + 3 + i * 4, y + 4 + (i % 2), 3, 2); },
});
const PROP_KEYS = Object.keys(PROPS);
let LAMPS = [], FLAGS = [], CHIMS = [], WIN_RECTS_ = [], SPINNERS = [], SPRAYS = [];
/* ---------- buildings (V3.4): tiled roofs, stone / plank / half-timber walls, framed windows, 2nd floor, right-side multiply shadow ---------- */
const KIND_ROOF = { church: '#2a5ab1', guild: '#2a5ab1', tavern: '#ca3b3b', smithy: '#5a6a8a', shop: '#ca3b3b', armor: '#2a5ab1', apothecary: '#3e8a40', inn: '#3e8a40', mill: '#a05a30', itemshop: '#ca3b3b', market: '#ca3b3b', library: '#2a5ab1', manor: '#2a5ab1', barracks: '#4e5676', watchtower: '#2a5ab1' };
const HOUSE_ROOF = ['#ca3b3b', '#2a5ab1', '#3e8a40', '#e0a828', '#8a5a34']; // red, blue, green, yellow, brown (5 colours, houses rotate)
const PLAQUE = { guild: 'battle', shop: 'weaponer', armor: 'armorer', smithy: 'smith', tavern: 'mug', inn: 'bed', apothecary: 'potion' };
const WALL_KIND = { church: 'stone', smithy: 'stone', guild: 'timber', tavern: 'timber', inn: 'timber', castle: 'stone', shop: 'plank', armor: 'plank', apothecary: 'plank', house: 'plank', hut: 'plank', mill: 'plank' };
const WALL_HEX = { church: '#d8d4dc', smithy: '#8c8478', guild: '#e6d6b0', tavern: '#e0caa0', inn: '#ecdcb8', shop: '#c09060', armor: '#a8a8b8', apothecary: '#b89a6a', house: '#b88a58', hut: '#a07a50', mill: '#c8a878' };
function roofGeom(b) { const k = b.kind; const h = b.h * TS; const roofH = k === 'church' ? 40 : b.h >= 5 ? 44 : b.h >= 4 ? 38 : 28; return { roofH, wallH: h - roofH }; } // the village sheet: steep roofs ~60% of the facade
function drawRoof(c, px, py, w, roofH, RR, inset, sea) {
  const ov = 4, rt = py + 1, rb = py + roofH; const rows = rb - rt;
  const edge = r => { const t = r / rows; const ins = Math.round(inset * (1 - Math.min(1, t * 1.25))); return [px - ov + ins, px + w + ov - ins]; };
  for (let r = 0; r < rows; r++) { const [x0, x1] = edge(r); fr(c, RR.o, x0 - 1, rt + r, x1 - x0 + 2, 1); }
  for (let r = 0; r < rows; r++) { const [x0, x1] = edge(r); const k = r % 5, band = Math.floor(r / 5);
    const col = k === 0 ? RR.l : k === 1 ? RR.b : k === 4 ? RR.o : RR.d; fr(c, col, x0, rt + r, x1 - x0, 1);
    if (k >= 1 && k <= 3) for (let xx = x0 + ((band % 2) ? 3 : 0); xx < x1; xx += 6) fr(c, k === 1 ? RR.d : RR.o, xx, rt + r, 1, 1);
    if (k === 0) for (let xx = x0 + ((band % 2) ? 3 : 0) + 1; xx < x1 - 1; xx += 6) fr(c, RR.h, xx, rt + r, 2, 1);
    fr(c, RR.l, x0, rt + r, 2, 1); fr(c, RR.o, x1 - 1, rt + r, 1, 1); fr(c, RR.d, x1 - 3, rt + r, 2, 1); }
  const [t0, t1] = edge(0); fr(c, RR.o, t0 - 1, rt - 1, t1 - t0 + 2, 2); fr(c, RR.h, t0, rt, t1 - t0, 1); // ridge
  fr(c, RR.o, px - ov - 1, rb, w + ov * 2 + 2, 1); // eave line
  if (sea === 3) { fr(c, '#f4f8fc', t0, rt - 1, t1 - t0, 3); for (let r = 0; r < rows; r += 5) { const [x0, x1] = edge(r); fr(c, '#f4f8fc', x0, rt + r, x1 - x0, 2); fr(c, '#cfe0ee', x0 + 2, rt + r + 2, x1 - x0 - 4, 1); } for (let xx = 0; xx < w + ov * 2; xx += 5) fr(c, '#cfe8ff', px - ov + xx, rb + 1, 1, 2 + (xx % 3)); }
  return { rt, rb, ov };
}
function drawWall(c, k, x, y, w, h, WR, Wd) {
  const kind = WALL_KIND[k] || 'plank';
  fr(c, WR.o, x - 1, y, w + 2, h); fr(c, WR.b, x, y, w, h);
  if (kind === 'stone') { // bricks 9x4 + 1px mortar, staggered, lit top-left
    for (let r = 0, yy = y; yy < y + h; r++, yy += 5) { const off = (r % 2) ? 5 : 0; for (let xx = x - off; xx < x + w; xx += 10) { const bx = Math.max(x, xx), bw = Math.min(xx + 9, x + w) - bx; if (bw <= 0) continue; const bh = Math.min(4, y + h - yy); const tone = hsh(xx, yy, 9); fr(c, tone < 0.3 ? WR.d : tone > 0.85 ? WR.l : WR.b, bx, yy, bw, bh); fr(c, WR.l, bx, yy, bw, 1); fr(c, WR.l, bx, yy, 1, bh); fr(c, WR.d, bx, yy + bh - 1, bw, 1); if (xx + 9 <= x + w) fr(c, WR.d, bx + bw - 1, yy, 1, bh); if (bh === 4) fr(c, WR.o, bx, yy + 4, bw + 1, 1); if (xx + 9 < x + w) fr(c, WR.o, xx + 9, yy, 1, 5); } }
  } else if (kind === 'plank') { // horizontal boards 4px with joints
    for (let r = 0, yy = y; yy < y + h; r++, yy += 4) { fr(c, WR.l, x, yy, w, 1); fr(c, WR.d, x, yy + 3, w, 1); let xx = x + Math.floor(hsh(r, k.length, 7) * 20); while (xx < x + w) { fr(c, WR.o, xx, yy, 1, 4); fr(c, WR.l, xx + 1, yy + 1, 1, 2); xx += 18 + Math.floor(hsh(xx, r, 8) * 14); } for (let i = 0; i < 3; i++) fr(c, WR.d, x + Math.floor(hsh(r, i, 10) * (w - 2)), yy + 1 + (i % 2), 2, 1); }
  } else { // half timber: plaster + dark beams (posts, floor beam, braces)
    for (let i = 0; i < 40; i++) fr(c, hsh(i, w, 11) < 0.5 ? WR.l : WR.d, x + Math.floor(hsh(i, h, 12) * w), y + Math.floor(hsh(i, x, 13) * h), 2, 1);
    const beam = (bx, by, bw, bh) => { fr(c, Wd.o, bx, by, bw, bh); if (bw > 2 && bh > 2) fr(c, Wd.b, bx + 1, by + 1, bw - 2, bh - 2); if (bw > 2) fr(c, Wd.l, bx + 1, by + 1, bw - 2, 1); };
    for (let xx = x; xx <= x + w - 4; xx += 24) beam(xx, y, 4, h); beam(x + w - 4, y, 4, h); beam(x, y, w, 4);
    const mid = y + Math.floor(h * 0.48); beam(x, mid, w, 4);
    for (let xx = x + 4; xx + 20 <= x + w - 4; xx += 24) { for (let i = 0; i < 18; i += 1) { fr(c, Wd.o, xx + 1 + i, mid - 2 - Math.floor(i * (mid - y - 6) / 18), 2, 2); } }
  }
  fr(c, WR.l, x, y, 1, h); fr(c, WR.o, x + w - 1, y, 1, h); fr(c, WR.d, x + w - 2, y, 1, h);
}
function drawWindow(c, x, y, w, h, Wd, shutters, shutCol) {
  fr(c, Wd.o, x - 2, y - 2, w + 4, h + 4); fr(c, Wd.l, x - 1, y - 1, w + 2, 1); fr(c, Wd.b, x - 1, y, 1, h); fr(c, Wd.d, x + w, y, 1, h);
  fr(c, '#2a4a7a', x, y, w, h); fr(c, '#4a7ab8', x, y, w, Math.ceil(h / 2)); fr(c, '#8ab8e8', x + 1, y + 1, 1, 2); fr(c, '#c8e0f8', x + 1, y + 1, 1, 1); fr(c, '#8ab8e8', x + (w >> 1) + 1, y + (h >> 1) + 1, 1, 1);
  fr(c, Wd.o, x + (w >> 1), y, 1, h); fr(c, Wd.o, x, y + (h >> 1), w, 1);
  fr(c, Wd.l, x - 2, y + h + 1, w + 4, 1); fr(c, Wd.o, x - 2, y + h + 2, w + 4, 1); // sill
  if (shutters) { const S = mkRamp(shutCol); [x - 5, x + w + 2].forEach(sx => { fr(c, S.o, sx, y - 1, 3, h + 2); fr(c, S.b, sx + 1, y, 1, h); fr(c, S.l, sx, y, 1, h); }); }
  WIN_RECTS.push({ x, y, w, h });
}
function drawDoor(c, dx, dy, k, Wd, arch) {
  const D = mkRamp(k === 'church' ? '#6a4630' : k === 'castle' ? '#2a1a34' : '#7a4a24'); const x = dx + 3, y = dy + 1, w = 10, h = 15;
  fr(c, '#3a3230', x - 2, y - 2, w + 4, h + 2); fr(c, '#8c7e6e', x - 1, y - 1, w + 2, 1); // frame
  if (arch) { fr(c, '#3a3230', x - 1, y - 4, w + 2, 2); fr(c, '#8c7e6e', x, y - 3, w, 1); }
  fr(c, D.b, x, y, w, h); fr(c, D.l, x, y, 2, h); fr(c, D.d, x + w - 2, y, 2, h); for (let i = 3; i < w; i += 3) fr(c, D.o, x + i, y + 1, 1, h - 1); fr(c, D.o, x, y + 4, w, 1); fr(c, D.o, x, y + 11, w, 1);
  fr(c, '#e8c040', x + w - 3, y + 8, 2, 2); fr(c, '#fff0a0', x + w - 3, y + 8, 1, 1); // handle
  fr(c, '#ad9f8b', x - 2, dy + 15, w + 4, 1); fr(c, '#6a5e52', x - 2, dy + 16, w + 4, 1); // step
}
function drawChimney(c, cx0, cy0, h, big) { const BR = mkRamp('#9a5040'); fr(c, BR.o, cx0 - 1, cy0 - 1, 8, h + 1); fr(c, BR.b, cx0, cy0, 6, h); for (let r = 0; r < h; r += 3) { fr(c, BR.d, cx0, cy0 + r + 2, 6, 1); fr(c, BR.d, cx0 + ((r / 3) % 2 ? 2 : 4), cy0 + r, 1, 2); } fr(c, BR.l, cx0, cy0, 1, h); fr(c, '#2a2438', cx0 - 1, cy0 - 2, 8, 2); fr(c, '#5a5a6a', cx0, cy0 - 2, 6, 1); CHIMS.push({ x: cx0 + 3, y: cy0 - 3, big }); }
function drawBuilding(c, b, sea) {
  const px = b.x * TS, py = b.y * TS, w = b.w * TS, h = b.h * TS; const k = b.kind;
  if (k === 'castle') { shadowRect(c, px + w, py + 14, 6, h - 10); drawCastle(c, b, sea, px, py, w, h); return; }
  const RR = mkRamp(KIND_ROOF[k] || HOUSE_ROOF[(b.id + b.roof) % 5]); const WR = mkRamp(WALL_HEX[k] || '#b88a58'); const Wd = R5(PAL5.wood[0]);
  const { roofH, wallH } = roofGeom(b); const wy0 = py + roofH;
  // right-side shadow (6px, multiply) and ground contact shadow
  mulDo(c, () => { for (let r = 0; r < h - 4; r++) fr(c, SHADOW_MUL, px + w + 4, py + 6 + r, Math.min(6, Math.floor(r / 1.5) + 1), 1); fr(c, SHADOW_MUL, px + 2, py + h, w + 4, 2); });
  if (k === 'church') { drawChurch(c, b, sea, px, py, w, h, RR, WR, Wd); return; }
  if (k === 'mill') { drawMillTower(c, px, py, w, h, sea); SPINNERS.push({ x: px + w / 2, y: py + 10, r: 22 }); return; }
  if (k === 'cemetery' || k === 'watchtower' || k === 'market' || k === 'manor' || k === 'library' || k === 'itemshop' || k === 'barracks') { drawNewBuilding(c, b, sea, px, py, w, h); return; }
  drawWall(c, k, px + 1, wy0, w - 2, wallH - 4, WR, Wd);
  const FD = seaRamp('stone', 0); fr(c, FD.o, px, py + h - 4, w, 4); fr(c, FD.b, px + 1, py + h - 4, w - 2, 3); fr(c, FD.l, px + 1, py + h - 4, w - 2, 1); for (let xx = 4; xx < w - 2; xx += 7) fr(c, FD.d, px + xx, py + h - 3, 1, 2);
  mulDo(c, () => fr(c, SHADOW_MUL, px + 1, wy0, w - 2, 3)); // eave shadow on the wall
  // chimney (behind roof top) then roof
  if (k === 'hut') drawThatch(c, px, py, w, roofH, sea, b.id % 2 ? '#d8b048' : '#a07844'); else if (k === 'mill') drawMillTower(c, px, py, w, h, sea); else drawRoof(c, px, py, w, roofH, RR, b.w >= 7 ? 12 : 9, sea);
  if (k === 'house' || k === 'hut' || k === 'smithy' || k === 'inn' || k === 'tavern' || k === 'shop' || k === 'apothecary') drawChimney(c, px + w - 24 - (k === 'smithy' ? 4 : 0), py - (k === 'smithy' ? 6 : 3), 15 + (k === 'smithy' ? 3 : 0), k === 'smithy');
  if (k === 'mill') { fr(c, '#5a3a22', px + w / 2 - 1, py + 6, 2, 2); SPINNERS.push({ x: px + w / 2, y: py + 8, r: 18 }); }
  // door + windows
  const dx = b.door.x * TS, dy = b.door.y * TS; drawDoor(c, dx, dy, k, Wd, k === 'guild' || k === 'inn');
  const shut = k === 'house' || k === 'hut'; const shutCol = HOUSE_ROOF[(b.id + b.roof + 1) % 5];
  const twoFloor = b.h >= 5; const lowY = twoFloor ? wy0 + Math.floor((wallH - 4) * 0.48) + 8 : wy0 + 8; const upY = wy0 + 6;
  const slots = []; for (let xx = px + 10; xx + 10 < px + w - 6; xx += 22) slots.push(xx);
  slots.forEach(xx => { if (Math.abs(xx + 5 - (dx + 8)) < 14) return; drawWindow(c, xx, lowY, 10, 9, Wd, shut, shutCol); });
  if (twoFloor) slots.forEach(xx => drawWindow(c, xx, upY, 10, 8, Wd, false));
  // hanging sign board with the shop icon next to the door + plaque on the roof
  if (PLAQUE[k]) { const ic = iconCanvas(PLAQUE[k]); const bx = Math.round(px + w / 2 - 13), by = py + Math.max(4, roofH - 30); fr(c, '#1c1626', bx - 1, by - 1, 28, 26); fr(c, '#f4e8c0', bx, by, 26, 24); fr(c, '#c8b078', bx, by + 21, 26, 3); fr(c, KIND_ROOF[k] || '#888', bx + 1, by + 1, 24, 2); if (k === 'inn') drawPixText(c, 'INN', bx + 2, by + 7, '#2a3a20'); else if (ic) c.drawImage(ic, bx + 5, by + 4, 16, 16); fr(c, '#5a3a22', bx + 3, by - 4, 2, 3); fr(c, '#5a3a22', bx + 21, by - 4, 2, 3);
    const sx = dx + 16, sy = dy - 6; fr(c, Wd.o, sx - 1, sy - 2, 8, 2); fr(c, Wd.o, sx, sy, 1, 3); fr(c, Wd.o, sx + 5, sy, 1, 3); fr(c, Wd.o, sx - 2, sy + 3, 10, 8); fr(c, '#f0e0a8', sx - 1, sy + 4, 8, 6); if (ic) c.drawImage(ic, sx - 1, sy + 4, 8, 6); }
  if (k === 'guild') { fr(c, '#5a3a22', px + w - 8, py - 16, 2, 26); FLAGS.push({ x: px + w - 6, y: py - 15, col: '#c04040' }); }
  if (k === 'tavern') { const R = mkRamp('#e0a030'); fr(c, R.o, dx - 10, dy - 4, 7, 8); fr(c, R.b, dx - 9, dy - 3, 5, 6); fr(c, '#fff', dx - 9, dy - 3, 5, 2); }
  if (k === 'smithy') PROPS.anvil(c, px + w - 16, py + h - 2);
  if ((k === 'house' || k === 'hut') && hsh(b.x, b.y, 9) < 0.6) PROPS.flowerpot(c, dx + 14, dy + 1);
}
function drawChurch(c, b, sea, px, py, w, h, RR, WR, Wd) {
  const roofH = 40, wy0 = py + roofH; const cx0 = px + w / 2;
  drawWall(c, 'church', px + 1, wy0, w - 2, h - roofH - 4, WR, Wd);
  const FD = seaRamp('stone', 0); fr(c, FD.o, px, py + h - 4, w, 4); fr(c, FD.b, px + 1, py + h - 4, w - 2, 3); fr(c, FD.l, px + 1, py + h - 4, w - 2, 1);
  drawRoof(c, px, py + 6, w, roofH - 6, RR, 14, sea);
  // nave stained-glass windows (tall, arched)
  [px + 10, px + 26, px + w - 36, px + w - 20].forEach(x0 => { fr(c, '#2a2a3c', x0 - 1, wy0 + 6, 10, 26); fr(c, '#2a2a3c', x0, wy0 + 4, 8, 2); fr(c, '#3a5ac8', x0, wy0 + 7, 8, 24); fr(c, '#e86a6a', x0 + 3, wy0 + 7, 2, 24); fr(c, '#e8c860', x0, wy0 + 15, 8, 2); fr(c, '#7a9ae8', x0 + 1, wy0 + 8, 2, 6); fr(c, '#ffffff90', x0 + 1, wy0 + 8, 1, 2); WIN_RECTS.push({ x: x0, y: wy0 + 7, w: 8, h: 24 }); });
  // central bell tower (32 wide) rising above the roof, with a 1x2-tile spire
  const tw = 32, tx0 = cx0 - tw / 2, ty0 = py - 14; const TR = mkRamp('#c8c4cc');
  drawWall(c, 'church', tx0, ty0, tw, py + h - 4 - ty0, TR, Wd);
  fr(c, TR.o, tx0 - 2, ty0 - 2, tw + 4, 3); fr(c, TR.l, tx0 - 1, ty0 - 1, tw + 2, 1);
  const SR = mkRamp('#5a6688'); for (let r = 0; r < 32; r++) { const half = Math.max(1, Math.round(12 * r / 32)); fr(c, SR.o, cx0 - half - 1, ty0 - 34 + r, half * 2 + 2, 1); fr(c, r % 5 === 0 ? SR.l : SR.b, cx0 - half, ty0 - 34 + r, half * 2, 1); fr(c, SR.l, cx0 - half, ty0 - 34 + r, Math.max(1, half - 2), 1); fr(c, SR.d, cx0 + 1, ty0 - 34 + r, Math.max(0, half - 1), 1); }
  fr(c, '#e8c030', cx0 - 1, ty0 - 46, 2, 12); fr(c, '#e8c030', cx0 - 4, ty0 - 42, 8, 2); fr(c, '#fff2a0', cx0 - 1, ty0 - 46, 1, 3);
  // belfry + rose window
  fr(c, '#2a2438', cx0 - 6, ty0 + 4, 12, 12); fr(c, '#2a2438', cx0 - 4, ty0 + 2, 8, 2); fr(c, '#e8c040', cx0 - 3, ty0 + 6, 6, 6); fr(c, '#8a6a20', cx0 - 1, ty0 + 12, 2, 2); WIN_RECTS.push({ x: cx0 - 3, y: ty0 + 6, w: 6, h: 6 });
  ell(c, '#2a2a3c', cx0, wy0 + 6, 8, 8); ell(c, '#4a6ae0', cx0, wy0 + 6, 7, 7); fr(c, '#e86a6a', cx0 - 1, wy0, 2, 13); fr(c, '#e8c860', cx0 - 7, wy0 + 5, 14, 2); fr(c, '#ffffff90', cx0 - 4, wy0 + 2, 2, 2); WIN_RECTS.push({ x: cx0 - 4, y: wy0 + 2, w: 8, h: 8 });
  drawDoor(c, b.door.x * TS, b.door.y * TS, 'church', Wd, true);
  if (sea === 3) fr(c, '#f4f8fc', tx0 - 2, ty0 - 3, tw + 4, 2);
}
function drawCastle(c, b, sea, px, py, w, h) {
  const S = mkRamp('#4e465e'); const Wd = R5(PAL5.wood[0]);
  drawWall(c, 'castle', px + 2, py + 18, w - 4, h - 18, S, Wd);
  // battlements + corner towers
  for (let i = 0; i < w - 4; i += 8) { fr(c, S.o, px + 2 + i, py + 12, 6, 7); fr(c, S.b, px + 3 + i, py + 13, 4, 6); fr(c, S.l, px + 3 + i, py + 13, 4, 1); }
  [px - 2, px + w - 22].forEach((x0, i) => { drawWall(c, 'castle', x0, py - 6, 24, h + 2, mkRamp('#5a5070'), Wd); for (let j = 0; j < 24; j += 6) { fr(c, S.o, x0 + j, py - 12, 5, 7); fr(c, S.l, x0 + j + 1, py - 11, 3, 1); } fr(c, '#14081c', x0 + 8, py + 4, 8, 14); fr(c, '#c040e0', x0 + 10, py + 6, 4, 10); WIN_RECTS.push({ x: x0 + 10, y: py + 6, w: 4, h: 10, purple: true }); const R2 = mkRamp('#6a3a8a'); for (let r = 0; r < 18; r++) { const half = Math.max(1, Math.round(14 * r / 18)); fr(c, R2.o, x0 + 12 - half - 1, py - 30 + r, half * 2 + 2, 1); fr(c, R2.b, x0 + 12 - half, py - 30 + r, half * 2, 1); fr(c, R2.l, x0 + 12 - half, py - 30 + r, Math.max(1, half - 3), 1); } FLAGS.push({ x: x0 + 13, y: py - 38, col: '#ca3b3b' }); fr(c, '#14101e', x0 + 11, py - 40, 2, 10); });
  for (let i = 0; i < 3; i++) { fr(c, '#14081c', px + 34 + i * 14, py + 30, 6, 12); fr(c, '#c040e0', px + 35 + i * 14, py + 31, 4, 10); WIN_RECTS.push({ x: px + 35 + i * 14, y: py + 31, w: 4, h: 10, purple: true }); }
  const dx = b.door.x * TS, dy = b.door.y * TS; fr(c, '#14081c', dx - 6, dy - 20, 28, 36); fr(c, '#14081c', dx - 2, dy - 24, 20, 4); fr(c, '#2a1a34', dx - 4, dy - 18, 24, 34); for (let i = 0; i < 24; i += 4) fr(c, '#3a2448', dx - 4 + i, dy - 18, 2, 34); fr(c, '#8a60b0', dx + 14, dy, 2, 2);
  fr(c, '#d060ff', px + w / 2 - 4, py + 20, 8, 8); fr(c, '#fff', px + w / 2 - 1, py + 23, 2, 2);
  if (sea === 3) { fr(c, '#f4f8fc', px + 2, py + 12, w - 4, 1); }
}
/* ---------- fountain / well ---------- */
function drawFountain(c, tx, ty, sea) {
  const x = tx * TS, y = ty * TS; shadowPx(c, x + 9, y + 18, 17, 5, 0.32); const S = mkRamp('#9a9aa8'), Wt = mkRamp('#3a86e8');
  ell(c, S.o, x + 8, y + 9, 17, 11); ell(c, S.b, x + 8, y + 9, 16, 10); ell(c, S.l, x + 8, y + 7, 15, 8); ell(c, S.d, x + 8, y + 11, 13, 7); ell(c, Wt.b, x + 8, y + 9, 13, 7); ell(c, Wt.l, x + 6, y + 8, 8, 4); fr(c, '#cfe6ff', x + 1, y + 10, 4, 1); fr(c, '#cfe6ff', x + 12, y + 12, 5, 1);
  fr(c, S.o, x + 5, y - 2, 6, 14); fr(c, S.b, x + 6, y - 1, 4, 12); fr(c, S.l, x + 6, y - 1, 1, 12); fr(c, S.d, x + 9, y, 1, 11); ell(c, S.o, x + 8, y - 4, 6, 3); ell(c, S.l, x + 8, y - 4, 5, 2);
  SPRAYS.push({ x: x + 8, y: y - 6 });
}
function drawWell(c, tx, ty) { const x = tx * TS, y = ty * TS; PROPS.well2(c, x, y); }
/* ---------- world canvas + overhang layer (parts of trees / buildings above their own top row, drawn over characters) ---------- */
const worldCache = {}, overlayCache = {}, groundCache = {};
function getGroundCanvas(sea) { if (groundCache[sea]) return groundCache[sea]; const cv = mkCanvas(MW * TS, MH * TS); paintGround(cv.getContext('2d'), sea); return (groundCache[sea] = cv); }
/* compatibility for the asset sheets: copy a representative tile of that type */
function paintTile(c, tx, ty, type, sea) { const g = getGroundCanvas(sea || 0); let k = -1; for (let i = 0; i < W.tiles.length; i++) if (W.tiles[i] === type) { k = i; break; } if (k < 0) k = 0; c.drawImage(g, (k % MW) * TS, Math.floor(k / MW) * TS, 16, 16, tx * TS, ty * TS, 16, 16); }
function townProps() {
  const place = []; const used = {};
  const g = (x, y) => tileAt(x, y);
  const near = (x, y, f, r) => { r = r || 1; for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if ((dx || dy) && f(g(x + dx, y + dy))) return true; return false; };
  const ok = (x, y) => { const tp = g(x, y); if (tp !== T.GRASS && tp !== T.FLOWER) return false; if (used[x + ',' + y]) return false; if (near(x, y, t => t === T.DOOR, 1)) return false; if (g(x, y - 1) === T.DOOR || W.blds.some(b => b.appr.x === x && b.appr.y === y)) return false; if (g(x, y - 1) === T.CLIFF) return false; return true; };
  const add = (x, y, p) => { used[x + ',' + y] = 1; place.push([x, y, p]); };
  const fixed = [[22, 7, 'grave'], [23, 9, 'cross'], [22, 11, 'grave'], [24, 8, 'stoneLantern'], [32, 7, 'stoneLantern'], [26, 24, 'lamp'], [30, 24, 'lamp'], [20, 24, 'lamp'], [37, 24, 'lamp'], [29, 15, 'lamp'], [26, 17, 'bench'], [30, 17, 'bench'], [25, 16, 'flag'], [31, 16, 'flag'], [41, 24, 'signpost'], [15, 22, 'signpost'], [21, 15, 'clothesline'], [36, 16, 'clothesline'], [13, 16, 'scarecrow'], [8, 17, 'scarecrow'], [22, 12, 'garden'], [21, 33, 'garden'], [41, 33, 'garden'], [35, 34, 'garden'], [24, 17, 'flowerbed'], [32, 17, 'flowerbed'], [24, 20, 'flowerbed'], [32, 20, 'flowerbed'], [41, 18, 'crates2'], [41, 20, 'barrel'], [42, 20, 'barrel'], [15, 26, 'logs'], [22, 26, 'pot'], [36, 26, 'wheelbarrow'], [43, 29, 'trough'], [27, 34, 'pot'], [42, 12, 'woodpile'], [21, 10, 'pot'], [38, 7, 'signboard']];
  fixed.forEach(p => { const tp = g(p[0], p[1]); if (tp === T.GRASS || tp === T.FLOWER || tp === T.FIELD || tp === T.PLAZA) add(p[0], p[1], p[2]); });
  const townPick = ['barrel', 'crate', 'sack', 'flowerpot', 'bush', 'cart', 'berryBush', 'woodpile', 'pebbles', 'stoneSmall', 'pot', 'logs', 'crates2', 'flowerbed', 'haystack', 'fenceH'];
  for (let y = 5; y < MH - 3; y++) for (let x = 1; x < PLATEAU_X0 - 1; x++) {
    if (!ok(x, y)) continue; const r = hsh(x, y, 300); const town = x >= TOWN_X0 && x <= TOWN_X1 + 1;
    const nearPath = near(x, y, t => t === T.PATH), nearBld = near(x, y, t => t === T.BLD);
    if (r > (town ? 0.16 : 0.06)) continue; if (!(nearPath || nearBld) && r > (town ? 0.08 : 0.025)) continue;
    if (x >= FIELD_X0 - 1 && Math.abs(y - 23) < 3) continue;
    const u = hsh(x, y, 301); let pick;
    if (x < TOWN_X0) pick = ['haystack', 'scarecrow', 'sack', 'woodpile', 'beehive', 'bush', 'fenceH', 'wheelbarrow', 'garden'][Math.floor(u * 9)];
    else if (x > TOWN_X1 + 1) pick = ['bush', 'stump', 'mushrooms', 'berryBush', 'stoneSmall', 'pebbles'][Math.floor(u * 6)];
    else pick = townPick[Math.floor(u * townPick.length)];
    add(x, y, pick);
  }
  // density: every 8x8 block of the town gets at least 4 objects (props or trees)
  for (let by = 5; by < 37; by += 8) for (let bx = TOWN_X0; bx <= TOWN_X1; bx += 8) {
    let n = place.filter(p => p[0] >= bx && p[0] < bx + 8 && p[1] >= by && p[1] < by + 8).length; for (let y = by; y < by + 8; y++) for (let x = bx; x < bx + 8; x++) if (g(x, y) === T.TREE) n++; n += W.blds.filter(b => b.x < bx + 8 && b.x + b.w > bx && b.y < by + 8 && b.y + b.h > by).length;
    for (let tries = 0; n < 4 && tries < 60; tries++) { const x = bx + Math.floor(hsh(bx, by, 400 + tries) * 8), y = by + Math.floor(hsh(by, bx, 500 + tries) * 8); if (!ok(x, y)) continue; add(x, y, townPick[Math.floor(hsh(x, y, 302) * townPick.length)]); n++; }
  }
  return place;
}
function getWorldCanvas(sea) {
  if (worldCache[sea]) return worldCache[sea];
  for (const k in worldCache) { delete worldCache[k]; delete overlayCache[k]; delete groundCache[k]; } // V4.2: only the current season stays cached
  LAMPS = []; FLAGS = []; CHIMS = []; SPRAYS = []; WIN_RECTS.length = 0; SPINNERS = [];
  const cv = mkCanvas(MW * TS, MH * TS), c = cv.getContext('2d'); const ov = mkCanvas(MW * TS, MH * TS), oc = ov.getContext('2d');
  c.drawImage(getGroundCanvas(sea), 0, 0);
  const place = townProps(); const byRow = {}; place.forEach(p => (byRow[p[1]] = byRow[p[1]] || []).push(p));
  const bByRow = {}; W.blds.forEach(b => { const r = b.y + b.h - 1; (bByRow[r] = bByRow[r] || []).push(b); });
  const overhang = (topY, f) => { const n = [LAMPS.length, FLAGS.length, CHIMS.length, WIN_RECTS.length, SPINNERS.length, SPRAYS.length]; oc.save(); oc.beginPath(); oc.rect(0, 0, MW * TS, topY); oc.clip(); f(oc); oc.restore(); LAMPS.length = n[0]; FLAGS.length = n[1]; CHIMS.length = n[2]; WIN_RECTS.length = n[3]; SPINNERS.length = n[4]; SPRAYS.length = n[5]; };
  // ledge conifers (unreachable decoration on top of the north cliff)
  for (let y = 0; y < 2; y++) for (let x = 0; x < PLATEAU_X0 - 1; x++) if (tileAt(x, y) === T.LEDGE && hsh(x, y, 600) < (y === 0 ? 0.55 : 0.35)) drawConifer(c, x * TS + (hsh(x, y, 601) < 0.5 ? -3 : 3), y * TS + 2, sea, 0);
  for (let y = 0; y < MH; y++) {
    (byRow[y] || []).forEach(p => PROPS[p[2]](c, p[0] * TS, p[1] * TS, sea));
    for (let x = 0; x < MW; x++) { const tp = W.tiles[y * MW + x];
      if (tp === T.TREE) { drawTree(c, x, y, sea); overhang(y * TS, o => drawTree(o, x, y, sea)); }
      else if (tp === T.ROCK) drawRock(c, x, y, sea); else if (tp === T.FENCE) drawFence(c, x, y, sea); }
    if (y === 19) { drawFountain(c, 28, 19, sea); overhang(19 * TS, o => drawFountain(o, 28, 19, sea)); }
    if (y === 21) { drawWell(c, 25, 21); drawWell(c, 31, 21); }
    (bByRow[y] || []).forEach(b => { drawBuilding(c, b, sea); overhang(b.y * TS, o => drawBuilding(o, b, sea)); });
  }
  overlayCache[sea] = ov; worldCache[sea] = cv; return cv;
}
function getWorldOverlay(sea) { if (!overlayCache[sea]) getWorldCanvas(sea); return overlayCache[sea]; }
const WIN_RECTS = [];

/* ---------- Part B details: pixel lettering, thatch, windmill tower ---------- */
const PIXFONT = { I: ['1', '1', '1', '1', '1'], N: ['1001', '1101', '1011', '1001', '1001'] };
function drawPixText(c, s, x, y, col) { let cx = x; for (const ch of s) { const g = PIXFONT[ch]; if (!g) { cx += 3; continue; } g.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] === '1') fr(c, col, cx + i * 2, y + j * 2, 2, 2); }); cx += g[0].length * 2 + 2; } }
function drawThatch(c, px, py, w, roofH, sea, hex) { const R = mkRamp(hex); const ov = 4, rt = py + 2, rb = py + roofH; const rows = rb - rt;
  for (let r = 0; r < rows; r++) { const ins = Math.round(10 * (1 - Math.min(1, r / rows * 1.3))); const x0 = px - ov + ins, x1 = px + w + ov - ins; fr(c, R.o, x0 - 1, rt + r, x1 - x0 + 2, 1); fr(c, r % 4 === 3 ? R.d : R.b, x0, rt + r, x1 - x0, 1); for (let x = x0 + (r % 3); x < x1; x += 3) fr(c, (x + r) % 2 ? R.l : R.d, x, rt + r, 1, 1); fr(c, R.l, x0, rt + r, 2, 1); fr(c, R.d, x1 - 2, rt + r, 2, 1); }
  for (let x = px - ov; x < px + w + ov; x += 2) fr(c, R.d, x, rb, 1, 2 + (x % 3)); fr(c, R.o, px - ov - 1, rb + 2, w + ov * 2 + 2, 1); if (sea === 3) fr(c, '#f4f8fc', px - ov + 8, rt, w + ov * 2 - 16, 3); }
function drawMillTower(c, px, py, w, h, sea) { const S = mkRamp('#a8a4a0'), cx = px + w / 2; for (let y = py + 10; y < py + h - 4; y++) { const hw = Math.round(w / 2 - 6 + (y - py) / h * 6); fr(c, S.o, cx - hw - 1, y, hw * 2 + 2, 1); fr(c, S.b, cx - hw, y, hw * 2, 1); fr(c, S.l, cx - hw, y, 3, 1); fr(c, S.d, cx + hw - 3, y, 3, 1); if ((y - py) % 5 === 0) fr(c, S.d, cx - hw, y, hw * 2, 1); }
  const RR = mkRamp('#7a4a2a'); for (let r = 0; r < 14; r++) { const hw = Math.round(3 + r * 0.9); fr(c, RR.o, cx - hw - 1, py - 2 + r, hw * 2 + 2, 1); fr(c, r % 3 ? RR.b : RR.l, cx - hw, py - 2 + r, hw * 2, 1); }
  fr(c, '#3a2a1a', cx - 3, py + h - 16, 6, 12); fr(c, '#7a4a24', cx - 2, py + h - 15, 4, 11); fr(c, '#2a4a7a', cx - 2, py + 18, 4, 5); if (sea === 3) fr(c, '#f4f8fc', cx - 6, py - 2, 12, 3); }

/* ---------- V4.2 field terrain (Part C): swamp, poison bog, snow, ice, lava, volcanic rock, cave floor, chasm, rocky grass ---------- */
const WILD_PAL = { swamp: ['#1e3a2a', '#2e5a3a', '#3e7448', '#5a8a58', '#7aa070'], poison: ['#2a1438', '#4a2a5a', '#6a3a8a', '#8a58b0', '#b080d8'], snow: ['#7a8ca0', '#b4c4d6', '#d4e0ec', '#eaf0f8', '#ffffff'], ice: ['#3a6a9a', '#6a9ac8', '#9ac4e8', '#c4e2f8', '#eaf8ff'],
  lava: ['#5a1008', '#a02010', '#e04818', '#f88a20', '#ffd860'], volc: ['#1e1414', '#3a2420', '#54342c', '#6e463a', '#8a5a48'], cave: ['#1a1620', '#2e2834', '#443c4a', '#5a5262', '#787080'], chasm: ['#000000', '#0a0810', '#141020', '#1e1830', '#2a2440'], wild: ['#2a4a1e', '#4a6a2a', '#6a8a3a', '#8aa04a', '#a8b85a'] };
function paintWildPx(P, kind, tx, ty, x0, y0, sea, G) {
  const pal = WILD_PAL[kind]; if (!pal) return; const R = R5(sea === 3 && (kind === 'wild' || kind === 'swamp') ? WILD_PAL.snow : pal);
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const gx = tx * 8 + i, gy = ty * 8 + j; const n = snoise(gx, gy, 4, 70 + kind.length) * 0.6 + hsh(gx, gy, 71) * 0.4; const col = n < 0.3 ? R.d : n < 0.7 ? R.b : n < 0.88 ? R.l : R.h; for (let q = 0; q < 4; q++) P(x0 + i * 2 + (q & 1), y0 + j * 2 + (q >> 1), col); }
  if (kind === 'swamp' || kind === 'poison') for (let k = 0; k < 3; k++) { const px = x0 + 2 + Math.floor(hsh(tx, ty, 72 + k) * 11), py = y0 + 2 + Math.floor(hsh(tx, ty, 75 + k) * 11); P(px, py, R.h); P(px + 1, py, R.l); P(px, py + 1, R.o); if (kind === 'swamp') { P(px + 3, py - 2, '#3a6a2a'); P(px + 3, py - 3, '#5a8a3a'); } }
  if (kind === 'wild') for (let k = 0; k < 2; k++) { const px = x0 + 2 + Math.floor(hsh(tx, ty, 78 + k) * 11), py = y0 + 3 + Math.floor(hsh(tx, ty, 80 + k) * 10); P(px, py, '#6a6458'); P(px + 1, py, '#8a8478'); P(px, py + 1, '#3a342c'); P(px + 1, py + 1, '#4a443c'); }
  if (kind === 'volc') for (let k = 0; k < 3; k++) { const px = x0 + 1 + Math.floor(hsh(tx, ty, 82 + k) * 13), py = y0 + 1 + Math.floor(hsh(tx, ty, 85 + k) * 13); P(px, py, '#e0481a'); P(px + 1, py, '#a02010'); }
  if (kind === 'cave') for (let k = 0; k < 2; k++) { const px = x0 + 2 + Math.floor(hsh(tx, ty, 88 + k) * 11), py = y0 + 2 + Math.floor(hsh(tx, ty, 90 + k) * 11); P(px, py, R.o); P(px + 1, py + 1, R.o); P(px + 2, py + 1, R.l); }
  if (kind === 'chasm') for (let j = 0; j < 16; j++) { if (tileAt(tx - 1, ty) !== T.CHASM) { P(x0, y0 + j, '#6c6034'); P(x0 + 1, y0 + j, '#4a4226'); } if (tileAt(tx + 1, ty) !== T.CHASM) { P(x0 + 15, y0 + j, '#4a4226'); P(x0 + 14, y0 + j, '#2a2618'); } }
  if (kind === 'lava') for (let k = 0; k < 4; k++) { const px = x0 + 1 + Math.floor(hsh(tx, ty, 92 + k) * 13), py = y0 + 1 + Math.floor(hsh(tx, ty, 96 + k) * 13); P(px, py, R.h); P(px + 1, py, R.l); P(px - 1, py, R.l); }
}
function drawBridge(c, tx, ty, sea) {
  const x = tx * TS, y = ty * TS; const rope = tx >= 118 && tx <= 135; const stone = tx < 56;
  if (rope) { fr(c, '#141020', x, y, 16, 16); for (let i = 0; i < 16; i += 3) { fr(c, '#8a6038', x + i, y + 4, 2, 9); fr(c, '#5a3a20', x + i + 1, y + 4, 1, 9); } fr(c, '#c8a060', x, y + 3, 16, 1); fr(c, '#c8a060', x, y + 13, 16, 1); fr(c, '#3a2a1a', x, y + 2, 16, 1); fr(c, '#3a2a1a', x, y + 14, 16, 1); return; }
  if (stone) { const S = seaRamp('stone', sea); fr(c, S.b, x, y, 16, 16); for (let i = 0; i < 16; i += 4) fr(c, S.d, x + i, y, 1, 16); fr(c, S.o, x, y, 16, 2); fr(c, S.o, x, y + 14, 16, 2); fr(c, S.l, x, y + 2, 16, 1); return; }
  const Wd = R5(PAL5.wood[0]); fr(c, Wd.b, x, y, 16, 16); for (let i = 0; i < 16; i += 3) { fr(c, Wd.d, x + i, y, 1, 16); fr(c, Wd.l, x + i + 1, y, 1, 16); } fr(c, Wd.o, x, y, 16, 2); fr(c, Wd.o, x, y + 14, 16, 2); fr(c, Wd.l, x, y + 2, 16, 1);
}
/* ---------- the 7 new village buildings (Part B, expanded sheet) ---------- */
function drawNewBuilding(c, b, sea, px, py, w, h) {
  const k = b.kind; const Wd = R5(PAL5.wood[0]);
  if (k === 'cemetery') { // fenced yard: statue headstone, small graves, dead tree, pink flowers
    const G0 = seaRamp('grass', sea); fr(c, G0.b, px, py, w, h); for (let x = px; x < px + w; x += 4) { fr(c, Wd.o, x, py + 2, 2, 8); fr(c, Wd.o, x, py + h - 9, 2, 8); } fr(c, Wd.b, px, py + 4, w, 2); fr(c, Wd.b, px, py + h - 6, w / 2 - 10, 2); fr(c, Wd.b, px + w / 2 + 10, py + h - 6, w / 2 - 10, 2); for (let y = py; y < py + h; y += 4) { fr(c, Wd.o, px, y, 2, 3); fr(c, Wd.o, px + w - 2, y, 2, 3); }
    const S = mkRamp('#a8a8b4'); const cx = px + w / 2; fr(c, S.o, cx - 6, py + 12, 12, 26); fr(c, S.b, cx - 5, py + 13, 10, 24); fr(c, S.l, cx - 5, py + 13, 2, 24); fr(c, S.o, cx - 3, py + 6, 6, 8); fr(c, S.l, cx - 2, py + 7, 4, 6); fr(c, S.o, cx - 1, py + 18, 2, 10); fr(c, S.o, cx - 4, py + 21, 8, 2);
    [[12, 26], [24, 44], [w - 22, 24], [w - 14, 44], [14, 52]].forEach(([gx, gy]) => PROPS.grave(c, px + gx - 8, py + gy - 12));
    drawDeadTree(c, px + w - 20, py + 46, sea); for (let i = 0; i < 6; i++) fr(c, '#ff9ab8', px + 6 + Math.floor(hsh(b.id, i, 3) * (w - 12)), py + 30 + Math.floor(hsh(i, b.id, 4) * 40), 2, 2); return; }
  if (k === 'watchtower') { const blue = b.roof === 0; const S = mkRamp('#c8b08a'); const tx0 = px + 8, tw = w - 16;
    drawWall(c, 'church', tx0, py + 30, tw, h - 34, S, Wd); fr(c, '#3a2a1a', px + w / 2 - 5, py + h - 18, 10, 14); fr(c, '#7a4a24', px + w / 2 - 4, py + h - 17, 8, 13);
    fr(c, '#181020', tx0 - 4, py + 24, tw + 8, 8); for (let i = 0; i < tw + 8; i += 6) { fr(c, S.b, tx0 - 3 + i, py + 25, 4, 6); fr(c, S.l, tx0 - 3 + i, py + 25, 4, 1); }
    fr(c, '#2a3a5a', px + w / 2 - 3, py + 40, 6, 8); WIN_RECTS.push({ x: px + w / 2 - 3, y: py + 40, w: 6, h: 8 });
    if (blue) { const R = mkRamp('#2a5ab1'); for (let r = 0; r < 26; r++) { const hw = Math.max(1, Math.round((tw / 2 + 4) * r / 26)); fr(c, R.o, px + w / 2 - hw - 1, py - 2 + r, hw * 2 + 2, 1); fr(c, r % 4 === 0 ? R.l : R.b, px + w / 2 - hw, py - 2 + r, hw * 2, 1); fr(c, R.d, px + w / 2 + 1, py - 2 + r, Math.max(0, hw - 1), 1); } fr(c, '#e8c030', px + w / 2 - 1, py - 8, 2, 7); }
    else { fr(c, '#5a3a22', px + w / 2, py - 16, 2, 40); FLAGS.push({ x: px + w / 2 + 2, y: py - 15, col: '#2a5ab1' }); }
    return; }
  if (k === 'market') { // striped awnings and stalls
    const WR = mkRamp('#c8a070'); drawWall(c, 'shop', px + 1, py + 26, w - 2, h - 30, WR, Wd); drawRoof(c, px, py, w, 24, mkRamp('#ca3b3b'), 12, sea);
    for (let i = 0; i < 3; i++) { const sx = Math.round(px + 6 + i * (w - 12) / 3), sw = Math.round((w - 12) / 3 - 4); for (let s2 = 0; s2 < sw; s2 += 4) fr(c, (s2 / 4) % 2 ? '#f0d040' : '#ca3b3b', sx + s2, py + 30, 4, 8); fr(c, '#181020', sx, py + 38, sw, 1); fr(c, Wd.b, sx, py + 46, sw, 6); fr(c, Wd.o, sx, py + 52, sw, 1); [['#e04a2a', 2], ['#f0c040', 6], ['#5aa83a', 10]].forEach(([col, ox]) => fr(c, col, sx + ox, py + 43, 3, 3)); }
    return; }
  const conf = { manor: { wall: '#e8e4ec', kind: 'stone', roof: '#2a5ab1', icon: 'scale' }, library: { wall: '#b89a6a', kind: 'timber', roof: '#2a5ab1', icon: 'historian' }, itemshop: { wall: '#c09060', kind: 'plank', roof: '#ca3b3b', icon: 'potion' }, barracks: { wall: '#c8a878', kind: 'stone', roof: '#4e5676', icon: 'battle' } }[k];
  if (!conf) return; const WR = mkRamp(conf.wall); const roofH = Math.round(h * 0.55); const wy0 = py + roofH;
  WALL_KIND[k] = conf.kind; drawWall(c, k, px + 1, wy0, w - 2, h - roofH - 4, WR, Wd); const FD = seaRamp('stone', 0); fr(c, FD.o, px, py + h - 4, w, 4); fr(c, FD.b, px + 1, py + h - 4, w - 2, 3); fr(c, FD.l, px + 1, py + h - 4, w - 2, 1);
  drawRoof(c, px, py, w, roofH, mkRamp(conf.roof), 12, sea);
  if (k === 'manor') { const tw = 28, tx0 = px + w / 2 - tw / 2; drawWall(c, 'church', tx0, py - 10, tw, roofH + 10, mkRamp('#dcd8e4'), Wd); const R = mkRamp('#2a5ab1'); for (let r = 0; r < 16; r++) { const hw = Math.round(16 * r / 16); fr(c, R.o, px + w / 2 - hw - 1, py - 26 + r, hw * 2 + 2, 1); fr(c, R.b, px + w / 2 - hw, py - 26 + r, hw * 2, 1); } fr(c, '#e8c030', px + w / 2 - 6, py + 4, 12, 14); fr(c, '#2a5ab1', px + w / 2 - 4, py + 6, 8, 10); fr(c, '#f4f0e0', px + w / 2 - 1, py + 7, 2, 8); }
  if (k === 'barracks') { fr(c, '#181020', px + w / 2 - 9, py + h - 26, 18, 22); fr(c, '#2a2034', px + w / 2 - 8, py + h - 25, 16, 21); fr(c, '#181020', px + w / 2 - 7, py + h - 28, 14, 3); }
  else drawDoor(c, b.door.x * TS, b.door.y * TS, k, Wd, k === 'manor' || k === 'library');
  for (let xx = px + 10; xx + 10 < px + w - 6; xx += 22) { if (Math.abs(xx + 5 - (b.door.x * TS + 8)) < 14) continue; drawWindow(c, xx, wy0 + 8, 10, 9, Wd, false); }
  if (k === 'itemshop' || k === 'library') { const ic = iconCanvas(conf.icon); const bx = Math.round(px + w / 2 - 13), by = py + Math.max(4, roofH - 30); fr(c, '#1c1626', bx - 1, by - 1, 28, 26); fr(c, '#f4e8c0', bx, by, 26, 24); fr(c, conf.roof, bx + 1, by + 1, 24, 2); if (ic) c.drawImage(ic, bx + 5, by + 4, 16, 16); }
}
