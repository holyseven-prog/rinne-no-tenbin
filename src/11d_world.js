/* ================= world painting (V3.3 S3/S4): variants, autotile edges, water frames, trees, props, buildings ================= */
const hsh = (x, y, s) => { let n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul((s || 0) | 0, 1442695041)) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const SEASON_BASE = { grass: ['#5cb44a', '#46a03c', '#a49e42', '#dfe9f1'], path: ['#cdb07e', '#d0b07a', '#b8975c', '#b9ae9c'], sand: ['#e8d49c', '#ecd898', '#d8c08a', '#e8e4dc'], field: ['#8c6238', '#86602e', '#7a5430', '#a89c94'], water: ['#3274cc', '#2c6cc8', '#3a6cae', '#b8dcf0'], plaza: ['#adadb8', '#adadb8', '#a8a8b2', '#c4c8d4'], leaf: ['#3f9c46', '#2f8a3a', '#d4782e', '#8fa6a0'], pine: ['#2c7a42', '#236a38', '#2c6a40', '#7a9a92'], dark: ['#3d3650', '#3d3650', '#3d3650', '#3d3650'] };
const SEA_R = {}; function seaRamp(kind, sea) { const k = kind + sea; return SEA_R[k] || (SEA_R[k] = mkRamp(SEASON_BASE[kind][sea])); }
function ell(c, col, cx, cy, rx, ry) { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry + 0.0001)))); fr(c, col, cx - w, cy + y, w * 2 + 1, 1); } }
function stampPx(c, rows, x, y, map) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const ch = r[i]; if (ch !== '.' && map[ch]) fr(c, map[ch], x + i, y + j, 1, 1); } }); }
function boxPx(c, R, x, y, w, h) { fr(c, R.o, x - 1, y - 1, w + 2, h + 2); fr(c, R.b, x, y, w, h); fr(c, R.l, x, y, w, 1); fr(c, R.l, x, y, 1, h); fr(c, R.d, x, y + h - 1, w, 1); fr(c, R.d, x + w - 1, y, 1, h); }
function shadowPx(c, cx, cy, rx, ry, a) { c.globalAlpha = a || 0.34; ell(c, '#1c2250', cx, cy, rx, ry); c.globalAlpha = 1; }

/* ---------- ground ---------- */
function groundKind(tp) { switch (tp) { case T.PATH: case T.DOOR: case T.BRIDGE: return 'path'; case T.PLAZA: return 'plaza'; case T.WATER: return 'water'; case T.SAND: return 'sand'; case T.FIELD: return 'field'; case T.DARK: case T.ROCK: return tp === T.ROCK ? null : 'dark'; default: return 'grass'; } }
const RANK = { water: 0, grass: 1, field: 1, dark: 1, sand: 2, path: 3, plaza: 4 };
function paintGrass(c, x, y, tx, ty, sea) {
  const G = seaRamp('grass', sea); const v = Math.floor(hsh(tx, ty, 1) * 4);
  fr(c, G.b, x, y, 16, 16);
  const R = k => hsh(tx, ty, 10 + k);
  // soft mottling (dither patches)
  for (let k = 0; k < 3; k++) { const px = Math.floor(R(k) * 12) + 1, py = Math.floor(R(k + 3) * 12) + 1; const col = k % 2 ? G.l : G.d; fr(c, col, px + x, py + y, 3, 1); fr(c, col, px + x + 1, py + y + 1, 1, 1); fr(c, col, px + x + 2, py + y - 1, 1, 1); }
  const n = sea === 3 ? 1 : 3;
  for (let k = 0; k < n; k++) { const px = Math.floor(R(20 + k) * 13) + x + 1, py = Math.floor(R(30 + k) * 12) + y + 2; const dk = R(40 + k) < 0.6;
    if (sea === 3) { fr(c, dk ? '#9a9a6a' : '#fff', px, py, 1, 1); if (dk) fr(c, '#9a9a6a', px + 1, py - 1, 1, 1); }
    else { fr(c, dk ? G.d : G.l, px, py, 1, 2); fr(c, dk ? G.d : G.l, px + 2, py - 1, 1, 2); fr(c, dk ? G.o : G.d, px + 1, py + 1, 1, 1); } }
  if (sea === 0 && R(50) < 0.16) { fr(c, R(51) < 0.5 ? '#fff' : '#ffc4d8', x + 3 + Math.floor(R(52) * 9), y + 3 + Math.floor(R(53) * 9), 1, 1); }
  if (sea === 2 && R(54) < 0.4) { const cols = ['#d86a2a', '#b84a2a', '#e8a838']; fr(c, cols[Math.floor(R(55) * 3)], x + 2 + Math.floor(R(56) * 11), y + 2 + Math.floor(R(57) * 11), 2, 1); }
  if (sea === 3) { if (R(58) < 0.35) { fr(c, '#c4d6e6', x + Math.floor(R(59) * 10), y + Math.floor(R(60) * 12), 4, 1); } if (R(61) < 0.07) { fr(c, '#fff', x + 5, y + 5, 1, 1); fr(c, '#fff', x + 4, y + 6, 3, 1); fr(c, '#fff', x + 5, y + 7, 1, 1); } }
}
function paintFlower(c, x, y, tx, ty, sea) {
  const cols = [['#fff', '#f0e050', '#f08aa0', '#a0b8ff'], ['#f8f0a0', '#ffd040', '#ff7a98', '#98aaff'], ['#d86a2a', '#e8a838', '#c04a2a', '#a07040'], ['#fff', '#cfe4f5', '#fff', '#cfe4f5']][sea];
  const v = Math.floor(hsh(tx, ty, 70) * 4);
  for (let k = 0; k < 3; k++) { const px = x + 2 + Math.floor(hsh(tx, ty, 71 + k) * 11), py = y + 3 + Math.floor(hsh(tx, ty, 74 + k) * 10); const col = cols[(v + k) % 4]; if (sea === 3) { fr(c, '#8a8a6a', px, py, 1, 2); fr(c, col, px - 1, py - 1, 3, 1); } else { fr(c, '#2f7a30', px, py + 1, 1, 2); fr(c, col, px - 1, py, 3, 1); fr(c, col, px, py - 1, 1, 3); fr(c, '#ffe060', px, py, 1, 1); } }
}
function paintPath(c, x, y, tx, ty, sea) {
  const P = seaRamp('path', sea); fr(c, P.b, x, y, 16, 16);
  for (let k = 0; k < 5; k++) { const px = x + Math.floor(hsh(tx, ty, 80 + k) * 14) + 1, py = y + Math.floor(hsh(tx, ty, 85 + k) * 14) + 1; const m = k % 3; if (m === 0) { fr(c, P.d, px, py, 2, 1); fr(c, P.l, px, py - 1, 1, 1); } else if (m === 1) { fr(c, P.l, px, py, 1, 1); fr(c, P.h, px + 1, py, 1, 1); } else { fr(c, P.d, px, py, 1, 1); fr(c, P.d, px + 2, py + 1, 1, 1); } }
  if (hsh(tx, ty, 90) < 0.2) { fr(c, P.d, x, y + 5 + Math.floor(hsh(tx, ty, 91) * 6), 16, 1); fr(c, P.l, x, y + 6 + Math.floor(hsh(tx, ty, 91) * 6), 16, 1); } // cart rut
  if (sea === 3 && hsh(tx, ty, 92) < 0.45) { fr(c, '#f4f8fc', x + Math.floor(hsh(tx, ty, 93) * 9), y + Math.floor(hsh(tx, ty, 94) * 12), 4 + Math.floor(hsh(tx, ty, 95) * 4), 2); }
}
function paintPlaza(c, x, y, tx, ty, sea) {
  const S = seaRamp('plaza', sea); fr(c, S.b, x, y, 16, 16);
  // stone blocks 8x8 staggered
  fr(c, S.d, x, y + 7, 16, 1); fr(c, S.d, x, y + 15, 16, 1); const off = (ty % 2) * 4; fr(c, S.d, x + 7 + off, y, 1, 7); fr(c, S.d, x + 3 + off, y + 8, 1, 7); fr(c, S.d, x + 11 + off, y + 8, 1, 7);
  fr(c, S.l, x + 1, y + 1, 5, 1); fr(c, S.l, x + 9 + off - (off ? 8 : 0), y + 9, 3, 1); fr(c, S.h, x + 2, y + 1, 2, 1);
  if (hsh(tx, ty, 100) < 0.3) { fr(c, S.o, x + 2 + Math.floor(hsh(tx, ty, 101) * 10), y + 2 + Math.floor(hsh(tx, ty, 102) * 10), 2, 1); }
  if (sea === 3 && hsh(tx, ty, 103) < 0.3) fr(c, '#fafcff', x + Math.floor(hsh(tx, ty, 104) * 9) + 1, y + 1 + Math.floor(hsh(tx, ty, 105) * 12), 4, 2);
}
function paintSand(c, x, y, tx, ty, sea) { const S = seaRamp('sand', sea); fr(c, S.b, x, y, 16, 16); for (let k = 0; k < 4; k++) { const px = x + Math.floor(hsh(tx, ty, 110 + k) * 14), py = y + Math.floor(hsh(tx, ty, 115 + k) * 14); fr(c, k % 2 ? S.d : S.l, px, py, 2, 1); } if (hsh(tx, ty, 120) < 0.15) { fr(c, '#c8b8a0', x + 6, y + 8, 2, 2); fr(c, '#f4ecd8', x + 6, y + 8, 1, 1); } }
function paintField(c, x, y, tx, ty, sea) {
  const F = seaRamp('field', sea); fr(c, F.b, x, y, 16, 16); const crop = [['#82d256', '#a4e070'], ['#e8c848', '#f4dc70'], ['#c08038', '#9a5a22'], ['#f4f8fc', '#cfe0ee']][sea];
  for (let r = 0; r < 4; r++) { fr(c, F.d, x, y + 3 + r * 4, 16, 1); fr(c, F.l, x, y + 2 + r * 4, 16, 1); for (let k = 0; k < 4; k++) { const px = x + 1 + k * 4 + (r % 2) * 2; if (sea === 3) { fr(c, crop[0], px, y + 1 + r * 4, 2, 1); } else { fr(c, crop[0], px, y + r * 4, 2, 2); fr(c, crop[1], px, y + r * 4, 1, 1); fr(c, F.o, px, y + r * 4 + 2, 2, 1); } } }
}
function paintDark(c, x, y, tx, ty) {
  fr(c, '#3d3650', x, y, 16, 16); for (let k = 0; k < 4; k++) { const px = x + Math.floor(hsh(tx, ty, 130 + k) * 13), py = y + Math.floor(hsh(tx, ty, 135 + k) * 13); fr(c, '#2a2438', px, py, 3, 1); fr(c, '#4e4666', px + 1, py - 1, 2, 1); }
  if (hsh(tx, ty, 140) < 0.22) { const px = x + 3 + Math.floor(hsh(tx, ty, 141) * 9), py = y + 3 + Math.floor(hsh(tx, ty, 142) * 9); fr(c, '#6a3a9a', px, py, 3, 1); fr(c, '#9a58d0', px + 1, py, 1, 1); fr(c, '#6a3a9a', px + 2, py + 1, 1, 2); }
}
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
/* ---------- autotile edges ---------- */
function edgeFringe(c, x, y, tx, ty, kind, sea) {
  const at = (dx, dy) => { const xx = tx + dx, yy = ty + dy; if (xx < 0 || yy < 0 || xx >= MW || yy >= MH) return kind; let tp = W.tiles[yy * MW + xx]; if (tp === T.BLD || tp === T.TREE || tp === T.FENCE || tp === T.FLOWER || tp === T.ROCK) tp = T.GRASS; return groundKind(tp) || 'grass'; };
  const me = RANK[kind]; const sides = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const nbs = sides.map(d => at(d[0], d[1]));
  const own = seaRamp(kind, sea);
  sides.forEach((d, si) => {
    const nk = nbs[si]; if (nk === kind || nk === 'water' && kind !== 'sand' && kind !== 'grass') return; const nr = RANK[nk];
    if (nk === 'water') { fr(c, own.d, d[0] ? (d[0] > 0 ? x + 15 : x) : x, d[1] ? (d[1] > 0 ? y + 15 : y) : y, d[0] ? 1 : 16, d[1] ? 1 : 16); return; }
    if (nr === undefined) return;
    if (me > nr && (kind === 'path' || kind === 'sand')) { // bite: neighbour (lower) material overgrows into this tile
      const NG = seaRamp(nk === 'field' || nk === 'dark' ? 'grass' : nk, sea); for (let i = 0; i < 16; i++) { const dep = 1 + Math.floor(hsh(tx * 16 + i, ty * 7 + si, 150) * 2.4); for (let k = 0; k < dep; k++) { const px = d[0] === 0 ? x + i : (d[0] > 0 ? x + 15 - k : x + k), py = d[1] === 0 ? y + i : (d[1] > 0 ? y + 15 - k : y + k); fr(c, k === dep - 1 ? NG.d : NG.b, px, py, 1, 1); } }
      const ln = d[0] === 0 ? [x, d[1] > 0 ? y + 13 : y + 2, 16, 1] : [d[0] > 0 ? x + 13 : x + 2, y, 1, 16]; c.globalAlpha = 0.5; fr(c, own.d, ln[0], ln[1], ln[2], ln[3]); c.globalAlpha = 1;
    } else if (me > nr && kind === 'plaza') { const S = own; if (d[0] === 0) { fr(c, S.o, x, d[1] > 0 ? y + 14 : y, 16, 2); fr(c, S.l, x, d[1] > 0 ? y + 14 : y + 1, 16, 1); } else { fr(c, S.o, d[0] > 0 ? x + 14 : x, y, 2, 16); fr(c, S.l, d[0] > 0 ? x + 14 : x + 1, y, 1, 16); } }
  });
  // rounded outer corners for path/sand/plaza where two perpendicular neighbours are lower
  if (kind === 'path' || kind === 'sand' || kind === 'plaza') {
    const low = i => RANK[nbs[i]] < me; const NG = seaRamp('grass', sea);
    if (low(0) && low(3)) { fr(c, NG.b, x, y, 2, 1); fr(c, NG.b, x, y + 1, 1, 1); } if (low(0) && low(1)) { fr(c, NG.b, x + 14, y, 2, 1); fr(c, NG.b, x + 15, y + 1, 1, 1); }
    if (low(2) && low(3)) { fr(c, NG.b, x, y + 15, 2, 1); fr(c, NG.b, x, y + 14, 1, 1); } if (low(2) && low(1)) { fr(c, NG.b, x + 14, y + 15, 2, 1); fr(c, NG.b, x + 15, y + 14, 1, 1); }
  }
}
function paintTile(c, tx, ty, type, sea) {
  const x = tx * TS, y = ty * TS;
  const base = (type === T.BLD || type === T.TREE || type === T.FENCE || type === T.FLOWER || type === T.ROCK) ? T.GRASS : type; const kind = groundKind(base) || 'grass';
  switch (kind) {
    case 'grass': paintGrass(c, x, y, tx, ty, sea); if (type === T.FLOWER) paintFlower(c, x, y, tx, ty, sea); break;
    case 'path': paintPath(c, x, y, tx, ty, sea); if (type === T.BRIDGE) { fr(c, '#8a5a30', x, y, 16, 16); for (let i = 0; i < 4; i++) fr(c, '#6a4020', x, y + i * 4, 16, 1); } break;
    case 'plaza': paintPlaza(c, x, y, tx, ty, sea); break;
    case 'sand': paintSand(c, x, y, tx, ty, sea); break;
    case 'field': paintField(c, x, y, tx, ty, sea); break;
    case 'dark': paintDark(c, x, y, tx, ty); break;
    case 'water': c.drawImage(waterTile(sea, 0, waterMask(tx, ty), tx, ty), x, y); break;
  }
  if (kind !== 'water' && kind !== 'grass' && kind !== 'field' && kind !== 'dark') edgeFringe(c, x, y, tx, ty, kind, sea);
  if (kind === 'grass' || kind === 'field') { // bank shading next to water
    [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(d => { const xx = tx + d[0], yy = ty + d[1]; if (xx >= 0 && yy >= 0 && xx < MW && yy < MH && W.tiles[yy * MW + xx] === T.WATER) { const G = seaRamp('grass', sea); fr(c, '#6a5030', d[0] ? (d[0] > 0 ? x + 14 : x) : x, d[1] ? (d[1] > 0 ? y + 14 : y) : y, d[0] ? 2 : 16, d[1] ? 2 : 16); } });
  }
}
/* ---------- trees / rocks / fences ---------- */
function drawTree(c, tx, ty, sea) {
  const x = tx * TS, y = ty * TS; const v = hsh(tx, ty, 200); const kind = v < 0.6 ? 0 : v < 0.93 ? 1 : 2; const leaf = seaRamp('leaf', sea); const trunk = mkRamp('#6a4426');
  shadowPx(c, x + 9, y + 15, 6, 2, 0.3);
  if (kind === 2) { // dead / bare tree
    fr(c, trunk.o, x + 6, y + 2, 5, 14); fr(c, trunk.b, x + 7, y + 3, 3, 12); fr(c, trunk.l, x + 7, y + 3, 1, 12); fr(c, trunk.d, x + 9, y + 4, 1, 11);
    [[3, 4, 4], [11, 3, 3], [4, 8, 3], [11, 8, 3]].forEach(b => { fr(c, trunk.o, x + b[0] - 1, y + b[1] - 1, b[2] + 2, 3); fr(c, trunk.b, x + b[0], y + b[1], b[2], 1); });
    fr(c, trunk.b, x + 7, y - 2, 3, 5); fr(c, trunk.o, x + 6, y - 3, 5, 1);
    if (sea === 3) { fr(c, '#f4f8fc', x + 6, y + 1, 5, 1); fr(c, '#f4f8fc', x + 3, y + 3, 4, 1); }
    return;
  }
  fr(c, trunk.o, x + 6, y + 9, 5, 7); fr(c, trunk.b, x + 7, y + 9, 3, 6); fr(c, trunk.l, x + 7, y + 9, 1, 6); fr(c, trunk.d, x + 9, y + 10, 1, 5); fr(c, trunk.d, x + 7, y + 14, 3, 1);
  if (kind === 0) { // round crown, 3 layers
    const cx = x + 8, cy = y + 3; ell(c, leaf.o, cx, cy + 1, 8, 7); ell(c, leaf.d, cx + 1, cy + 2, 7, 6); ell(c, leaf.b, cx, cy, 6, 5); ell(c, leaf.l, cx - 2, cy - 2, 3, 2);
    fr(c, leaf.h, cx - 3, cy - 3, 2, 1); fr(c, leaf.d, cx + 2, cy + 3, 3, 1); fr(c, leaf.d, cx - 4, cy + 2, 2, 1); fr(c, leaf.l, cx + 2, cy - 1, 2, 1);
    for (let k = 0; k < 4; k++) fr(c, leaf.o, cx - 5 + Math.floor(hsh(tx, ty, 210 + k) * 10), cy + 4 + Math.floor(hsh(tx, ty, 215 + k) * 3), 1, 1);
    if (sea === 0 && v < 0.2) { fr(c, '#ffd8e8', cx - 3, cy - 1, 1, 1); fr(c, '#ffd8e8', cx + 2, cy + 1, 1, 1); fr(c, '#fff', cx, cy - 3, 1, 1); }
    if (sea === 3) { ell(c, '#f4f8fc', cx - 1, cy - 3, 5, 2); fr(c, '#cfe0ee', cx + 2, cy - 2, 3, 1); fr(c, '#f4f8fc', cx - 5, cy + 1, 3, 1); fr(c, '#cfe0ee', cx + 3, cy + 4, 3, 1); }
  } else { // pine: stacked triangles
    const leaf = seaRamp('pine', sea); const cx = x + 8; for (let t = 0; t < 3; t++) { const top = y - 6 + t * 5, wd = 3 + t * 2; for (let r = 0; r < 6; r++) { const w = Math.min(wd + r, wd + 5); fr(c, leaf.o, cx - w - 1, top + r, w * 2 + 3, 1); } }
    for (let t = 0; t < 3; t++) { const top = y - 6 + t * 5, wd = 3 + t * 2; for (let r = 0; r < 6; r++) { const w = Math.min(wd + r, wd + 5); fr(c, leaf.b, cx - w, top + r, w * 2 + 1, 1); fr(c, leaf.l, cx - w, top + r, Math.max(1, w - 1), 1); fr(c, leaf.d, cx + Math.max(0, w - 2), top + r, 2, 1); } }
    if (sea === 3) for (let t = 0; t < 3; t++) { const top = y - 6 + t * 5; fr(c, '#f4f8fc', cx - 2 - t, top + 1, 5 + t * 2, 1); fr(c, '#f4f8fc', cx - 3 - t, top + 3, 3, 1); }
  }
}
function drawRock(c, tx, ty, sea) {
  const x = tx * TS, y = ty * TS; const R = mkRamp(hsh(tx, ty, 220) < 0.5 ? '#868694' : '#7a8088'); shadowPx(c, x + 9, y + 14, 6, 2, 0.3);
  ell(c, R.o, x + 8, y + 9, 7, 5); ell(c, R.b, x + 8, y + 9, 6, 4); ell(c, R.l, x + 6, y + 7, 3, 2); fr(c, R.h, x + 5, y + 6, 2, 1); fr(c, R.d, x + 9, y + 11, 4, 1); fr(c, R.d, x + 11, y + 9, 1, 2);
  if (hsh(tx, ty, 221) < 0.4 && sea !== 3) { fr(c, '#4a8a3a', x + 4, y + 10, 3, 1); fr(c, '#5aa048', x + 5, y + 9, 2, 1); }
  if (sea === 3) { ell(c, '#f4f8fc', x + 8, y + 6, 5, 1); }
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
const PROP_KEYS = Object.keys(PROPS);
let LAMPS = [], FLAGS = [], CHIMS = [], WIN_RECTS_ = [], SPINNERS = [];
/* ---------- buildings ---------- */
function drawBuilding(c, b, sea) {
  const px = b.x * TS, py = b.y * TS, w = b.w * TS, h = b.h * TS; const k = b.kind;
  const roofHex = PAL.roof[b.roof % PAL.roof.length]; const RR = mkRamp(sea === 3 ? roofHex : roofHex);
  const stone = k === 'church' || k === 'smithy' || k === 'castle' || k === 'guild' && false;
  const wallHex = { church: '#e6e6f0', guild: '#c29a62', tavern: '#cfa878', castle: '#4e465e', smithy: '#a2a2b0', mill: '#eadfc6', inn: '#e0cfa2', shop: '#e8d6aa', apothecary: '#dcd2b0', house: '#e6d4a8', hut: '#cdb88a' }[k] || '#e6d4a8';
  const WR = mkRamp(wallHex); const door = mkRamp(k === 'church' ? '#5a4030' : k === 'castle' ? '#2a1a34' : '#7a4a24');
  const wallH = k === 'castle' ? 26 : Math.min(h - 8, Math.round(h * 0.45)); const roofH = h - wallH; const wy0 = py + roofH;
  shadowPx(c, px + w / 2 + 3, py + h, w / 2 + 3, 3, 0.32);
  if (k === 'castle') { drawCastle(c, b, sea, px, py, w, h); return; }
  // ----- wall -----
  fr(c, WR.o, px + 1, wy0 - 1, w - 2, wallH + 1); fr(c, WR.b, px + 2, wy0, w - 4, wallH - 1);
  const brick = k === 'smithy' || k === 'church' || k === 'mill';
  if (brick) { for (let r = 0; r < wallH - 2; r += 4) { fr(c, WR.d, px + 2, wy0 + 3 + r, w - 4, 1); for (let xx = 0; xx < w - 4; xx += 8) fr(c, WR.d, px + 2 + ((r / 4) % 2 ? 4 : 0) + xx, wy0 + r, 1, 4); } }
  else { for (let r = 3; r < wallH - 2; r += 4) { fr(c, WR.d, px + 2, wy0 + r, w - 4, 1); fr(c, WR.l, px + 2, wy0 + r + 1, w - 4, 1); } if (k === 'guild' || k === 'tavern' || k === 'inn') for (let xx = 8; xx < w - 4; xx += 16) fr(c, WR.d, px + 2 + xx, wy0, 1, wallH - 1); }
  fr(c, WR.l, px + 2, wy0, 2, wallH - 1); fr(c, WR.d, px + w - 4, wy0, 2, wallH - 1);
  // foundation
  const FD = mkRamp('#7a7a88'); fr(c, FD.b, px + 2, py + h - 4, w - 4, 3); fr(c, FD.l, px + 2, py + h - 4, w - 4, 1); fr(c, FD.d, px + 2, py + h - 2, w - 4, 1); for (let xx = 0; xx < w - 4; xx += 6) fr(c, FD.d, px + 4 + xx, py + h - 3, 1, 1);
  // ----- roof -----
  const ov = 3; const rt = py + 3, rb = py + roofH + 1; const rh = rb - rt;
  const inset = k === 'church' ? 12 : 8;
  for (let r = 0; r < rh; r++) { const t = r / rh; const ins = Math.round(inset * (1 - Math.min(1, t * 1.4))); const x0 = px - ov + ins, x1 = px + w + ov - ins; fr(c, RR.o, x0 - 1, rt + r, x1 - x0 + 2, 1); }
  for (let r = 0; r < rh; r++) { const t = r / rh; const ins = Math.round(inset * (1 - Math.min(1, t * 1.4))); const x0 = px - ov + ins, x1 = px + w + ov - ins; const rowC = (r % 4 === 0) ? RR.l : (r % 4 === 3 ? RR.d : RR.b); fr(c, rowC, x0, rt + r, x1 - x0, 1);
    for (let xx = x0 + ((Math.floor(r / 4) % 2) ? 3 : 0); xx < x1; xx += 6) fr(c, RR.d, xx, rt + r, 1, r % 4 === 3 ? 0 : 1); fr(c, RR.l, x0, rt + r, 2, 1); fr(c, RR.d, x1 - 2, rt + r, 2, 1); }
  fr(c, RR.h, px - ov + inset, rt, w + ov * 2 - inset * 2, 1); fr(c, RR.o, px - ov + 1, rb, w + ov * 2 - 2, 1);
  fr(c, '#2a2438', px + 2, wy0 + 1, w - 4, 2); c.globalAlpha = 0.45; fr(c, '#1c2250', px + 2, wy0 + 3, w - 4, 2); c.globalAlpha = 1; // eaves shadow
  // chimney
  if (k === 'house' || k === 'hut' || k === 'smithy' || k === 'inn' || k === 'tavern' || k === 'shop') { const cx0 = px + w - 14 - (k === 'smithy' ? 4 : 0), cy0 = py - (k === 'smithy' ? 5 : 2); const BR = mkRamp('#a05a44'); fr(c, BR.o, cx0 - 1, cy0 - 1, 8, 12); fr(c, BR.b, cx0, cy0, 6, 10); fr(c, BR.l, cx0, cy0, 2, 10); fr(c, BR.d, cx0 + 4, cy0 + 1, 2, 9); fr(c, '#2a2438', cx0 - 1, cy0 - 1, 8, 2); fr(c, '#46485a', cx0 + 1, cy0 - 1, 4, 1); CHIMS.push({ x: cx0 + 3, y: cy0 - 2, big: k === 'smithy' }); }
  // door
  const dx = b.door.x * TS, dy = b.door.y * TS;
  fr(c, door.o, dx + 2, dy + 2, 12, 14); fr(c, door.b, dx + 3, dy + 3, 10, 13); fr(c, door.l, dx + 3, dy + 3, 3, 13); fr(c, door.d, dx + 10, dy + 3, 3, 13); fr(c, door.d, dx + 8, dy + 3, 1, 13); fr(c, door.l, dx + 3, dy + 3, 10, 1);
  fr(c, '#e8c860', dx + 11, dy + 10, 2, 2); fr(c, '#fff0a0', dx + 11, dy + 10, 1, 1); fr(c, '#9a9aa8', dx + 2, dy + 15, 12, 1);
  if (k === 'church' || k === 'guild') { fr(c, door.o, dx + 3, dy + 1, 10, 1); fr(c, door.o, dx + 4, dy, 8, 1); }
  // windows
  const wy = wy0 + 5; const wins = []; const dxm = dx + 8;
  const nW = k === 'church' ? 0 : Math.max(1, Math.floor((w - 8) / 24));
  if (k !== 'church') for (let i = 0; i < b.w; i++) { const wx = px + 6 + i * 16 + (b.w >= 5 ? 4 : 0); if (Math.abs(wx + 4 - dxm) < 12 || wx + 9 > px + w - 3) continue; if (b.w === 3 && i === 1) continue; wins.push([wx, wy, 8, 8]); }
  if (b.w === 3 && !wins.length) wins.push([px + 5, wy, 8, 8]);
  if (b.w === 3 && b.kind !== 'castle') { wins.length = 0; wins.push([px + 4, wy, 8, 8]); wins.push([px + 36, wy, 8, 8]); }
  wins.forEach(r => { const FRM = mkRamp('#5a3a22'); fr(c, FRM.o, r[0] - 2, r[1] - 2, r[2] + 4, r[3] + 4); fr(c, FRM.b, r[0] - 1, r[1] - 1, r[2] + 2, r[3] + 2); fr(c, '#7ab8f0', r[0], r[1], r[2], r[3]); fr(c, '#a8d8ff', r[0], r[1], r[2], 3); fr(c, '#ffffff90', r[0] + 1, r[1] + 1, 2, 2); fr(c, FRM.o, r[0] + (r[2] >> 1) - 0, r[1], 1, r[3]); fr(c, FRM.o, r[0], r[1] + (r[3] >> 1), r[2], 1); fr(c, FRM.l, r[0] - 2, r[1] + r[3] + 1, r[2] + 4, 1); if (hsh(r[0], r[1], 7) < 0.4) { fr(c, '#3e8a48', r[0] - 2, r[1] + 1, 2, r[3] - 2); fr(c, '#3e8a48', r[0] + r[2], r[1] + 1, 2, r[3] - 2); } WIN_RECTS.push({ x: r[0], y: r[1], w: r[2], h: r[3] }); });
  // kind details
  const sx = dx + 8, sy = dy - 5;
  if (k === 'guild') { fr(c, '#3a2a1a', sx - 9, sy - 6, 18, 12); fr(c, '#f0e0a0', sx - 8, sy - 5, 16, 10); fr(c, '#2a2a3a', sx - 1, sy - 4, 2, 8); fr(c, '#2a2a3a', sx - 5, sy - 3, 10, 1); fr(c, '#d8b030', sx - 5, sy - 2, 3, 3); fr(c, '#d8b030', sx + 2, sy - 2, 3, 3); fr(c, '#5a3a22', px + w - 6, py - 14, 2, 22); FLAGS.push({ x: px + w - 4, y: py - 13, col: '#c04040' }); }
  else if (k === 'tavern') { fr(c, '#2a1c14', sx + 8, sy - 3, 8, 2); fr(c, '#3a2a1a', sx + 10, sy - 2, 2, 5); const R = mkRamp('#e0a030'); fr(c, R.o, sx + 8, sy + 3, 7, 8); fr(c, R.b, sx + 9, sy + 4, 5, 6); fr(c, '#fff', sx + 9, sy + 4, 5, 2); fr(c, R.d, sx + 15, sy + 5, 2, 4); }
  else if (k === 'church') { const cx0 = px + w / 2; const CR = mkRamp('#d8d8e6'); fr(c, CR.o, cx0 - 8, py - 22, 16, 22); fr(c, CR.b, cx0 - 7, py - 21, 14, 21); fr(c, CR.l, cx0 - 7, py - 21, 3, 21); fr(c, CR.d, cx0 + 4, py - 21, 3, 21); for (let r = 0; r < 20; r += 4) fr(c, CR.d, cx0 - 7, py - 21 + r, 14, 1);
    const RR2 = mkRamp('#7a4a38'); for (let r = 0; r < 8; r++) { fr(c, RR2.o, cx0 - 9 + r, py - 30 + r, 18 - r * 2, 1); fr(c, r % 3 === 0 ? RR2.l : RR2.b, cx0 - 8 + r, py - 30 + r, 16 - r * 2, 1); }
    fr(c, '#e8c030', cx0 - 1, py - 40, 2, 11); fr(c, '#e8c030', cx0 - 4, py - 37, 8, 2); fr(c, '#fff2a0', cx0 - 1, py - 40, 1, 3); fr(c, '#2a2a3c', cx0 - 3, py - 17, 6, 8); fr(c, '#ffd870', cx0 - 2, py - 16, 4, 6); WIN_RECTS.push({ x: cx0 - 2, y: py - 16, w: 4, h: 6 });
    // rose window + stained glass
    ell(c, '#2a2a3c', cx0, wy0 + 12, 6, 6); ell(c, '#6a8ae0', cx0, wy0 + 12, 5, 5); fr(c, '#e86a6a', cx0 - 1, wy0 + 8, 2, 8); fr(c, '#e8c860', cx0 - 5, wy0 + 11, 10, 2); fr(c, '#ffffff80', cx0 - 3, wy0 + 9, 2, 2);
    [px + 12, px + w - 20].forEach(x0 => { fr(c, '#2a2a3c', x0 - 1, wy0 + 8, 10, 16); fr(c, '#7a9ae8', x0, wy0 + 9, 8, 14); fr(c, '#e86a6a', x0 + 3, wy0 + 9, 2, 14); fr(c, '#e8c860', x0, wy0 + 15, 8, 2); WIN_RECTS.push({ x: x0, y: wy0 + 9, w: 8, h: 14 }); }); }
  else if (k === 'smithy') { fr(c, '#3a2a1a', sx - 8, sy - 6, 16, 12); fr(c, '#f0e0a0', sx - 7, sy - 5, 14, 10); fr(c, '#2a2a3a', sx - 5, sy - 3, 10, 3); fr(c, '#2a2a3a', sx - 2, sy, 4, 4); fr(c, '#8a8a9a', sx - 5, sy - 3, 6, 1); }
  else if (k === 'shop') { fr(c, '#3a2a1a', sx - 8, sy - 6, 16, 12); fr(c, '#f0e0a0', sx - 7, sy - 5, 14, 10); fr(c, '#8a5a30', sx - 4, sy - 2, 8, 6); fr(c, '#e8c030', sx - 1, sy - 4, 3, 3); fr(c, '#6a4020', sx - 3, sy - 2, 6, 1); }
  else if (k === 'apothecary') { fr(c, '#3a2a1a', sx - 8, sy - 6, 16, 12); fr(c, '#f0e0a0', sx - 7, sy - 5, 14, 10); fr(c, '#40c060', sx - 2, sy - 1, 5, 5); fr(c, '#40c060', sx - 1, sy - 4, 3, 4); fr(c, '#fff', sx - 1, sy, 1, 1); }
  else if (k === 'inn') { fr(c, '#3a2a1a', sx - 8, sy - 6, 16, 12); fr(c, '#f0e0a0', sx - 7, sy - 5, 14, 10); fr(c, '#c04040', sx - 5, sy - 1, 10, 4); fr(c, '#fff', sx - 5, sy - 3, 4, 3); fr(c, '#4a5ac0', sx + 2, sy - 4, 3, 3); }
  else if (k === 'mill') { fr(c, '#5a3a22', px + w / 2 - 1, py + 6, 2, 2); SPINNERS.push({ x: px + w / 2, y: py + 8, r: 18 }); }
  else if (k === 'house' || k === 'hut') { fr(c, '#2a1c14', dx - 1, dy + 6, 2, 8); if (hsh(b.x, b.y, 9) < 0.5) PROPS.flowerpot(c, dx + 11, dy + 1); }
  // winter snow cap on roof
  if (sea === 3 && k !== 'mill') { const t = rt; fr(c, '#f4f8fc', px - ov + inset, t - 1, w + ov * 2 - inset * 2, 3); for (let r = 0; r < rh; r += 4) { const tt = r / rh; const ins = Math.round(inset * (1 - Math.min(1, tt * 1.4))); fr(c, '#f4f8fc', px - ov + ins, t + r, 5 + ((r * 3) % 7), 2); fr(c, '#cfe0ee', px - ov + ins, t + r + 2, 4, 1); fr(c, '#f4f8fc', px + w + ov - ins - 6 - ((r * 5) % 5), t + r, 6 + ((r * 5) % 5), 2); } fr(c, '#f4f8fc', px - ov + 1, rb - 1, w + ov * 2 - 2, 2); for (let xx = 0; xx < w + ov * 2; xx += 7) { fr(c, '#cfe8ff', px - ov + xx, rb + 1, 1, 2 + (xx % 3)); } }
}
function drawCastle(c, b, sea, px, py, w, h) {
  const S = mkRamp('#4e465e'); const D = mkRamp('#2a2438');
  fr(c, S.o, px - 1, py + 7, w + 2, h - 6); fr(c, S.b, px, py + 8, w, h - 8);
  for (let r = 0; r < h - 10; r += 6) { fr(c, S.d, px, py + 14 + r, w, 1); for (let xx = 0; xx < w; xx += 10) fr(c, S.d, px + xx + ((r / 6) % 2 ? 5 : 0), py + 9 + r, 1, 6); }
  fr(c, S.l, px, py + 8, 3, h - 8); fr(c, S.d, px + w - 3, py + 8, 3, h - 8);
  for (let i = 0; i < 5; i++) { fr(c, S.o, px + i * 16 + 1, py + 1, 10, 9); fr(c, S.b, px + i * 16 + 2, py + 2, 8, 8); fr(c, S.l, px + i * 16 + 2, py + 2, 8, 1); }
  fr(c, D.o, px + 2, py + 12, w - 4, 3); // dark band
  [px + 6, px + w - 14].forEach((x0, i) => { fr(c, '#2a1a3a', x0 - 1, py + 18, 10, 12); fr(c, '#4a2a6a', x0, py + 19, 8, 10); fr(c, '#c040e0', x0 + 2, py + 21, 4, 7); WIN_RECTS.push({ x: x0 + 2, y: py + 21, w: 4, h: 7, purple: true }); });
  for (let i = 0; i < 4; i++) { fr(c, '#c040e0', px + 12 + i * 18, py + 38, 4, 7); WIN_RECTS.push({ x: px + 12 + i * 18, y: py + 38, w: 4, h: 7, purple: true }); }
  const dx = b.door.x * TS, dy = b.door.y * TS; fr(c, '#14081c', dx - 1, dy - 10, 18, 26); fr(c, '#2a1a34', dx, dy - 9, 16, 25); fr(c, '#3a2448', dx + 1, dy - 8, 6, 24); fr(c, '#8a60b0', dx + 12, dy + 3, 2, 2); fr(c, '#14081c', dx + 7, dy - 9, 2, 25);
  fr(c, '#6a3a8a', px + 4, py - 6, 8, 14); fr(c, '#8a4aaa', px + 5, py - 8, 6, 4); fr(c, '#6a3a8a', px + w - 12, py + 2, 8, 14);
  fr(c, '#d060ff', px + w / 2 - 3, py + 14, 6, 6); fr(c, '#fff', px + w / 2 - 1, py + 16, 2, 2); fr(c, '#2a1a3a', px + w / 2 - 6, py + 20, 12, 1);
  for (let i = 0; i < 3; i++) { fr(c, '#14101e', px + 8 + i * 30, py - 8, 2, 10); fr(c, '#7a30a0', px + 8 + i * 30 - 1, py - 10, 4, 3); }
  FLAGS.push({ x: px + 10, y: py - 8, col: '#7a30a0' });
  if (sea === 3) { fr(c, '#f4f8fc', px, py + 8, w, 2); for (let i = 0; i < 5; i++) fr(c, '#f4f8fc', px + i * 16 + 2, py + 1, 8, 2); }
}
/* ---------- fountain / well ---------- */
function drawFountain(c, tx, ty, sea) { const x = tx * TS, y = ty * TS; shadowPx(c, x + 9, y + 15, 8, 3, 0.3); const S = mkRamp('#9a9aa8'); fr(c, S.o, x, y + 4, 16, 12); fr(c, S.b, x + 1, y + 5, 14, 10); fr(c, S.l, x + 1, y + 5, 14, 1); fr(c, S.d, x + 1, y + 14, 14, 1); fr(c, '#2f78dc', x + 2, y + 7, 12, 6); fr(c, '#7ab4ff', x + 3, y + 8, 4, 1); fr(c, '#7ab4ff', x + 9, y + 10, 3, 1); fr(c, S.b, x + 6, y + 3, 4, 8); fr(c, S.l, x + 6, y + 3, 1, 8); fr(c, '#cfe6ff', x + 7, y - 1, 2, 5); fr(c, '#fff', x + 6, y - 2, 4, 2); fr(c, S.o, x + 5, y + 1, 6, 1); }
function drawWell(c, tx, ty) { const x = tx * TS, y = ty * TS; PROPS.well2(c, x, y); }
/* ---------- world canvas ---------- */
const worldCache = {};
function getWorldCanvas(sea) {
  if (worldCache[sea]) return worldCache[sea];
  LAMPS = []; FLAGS = []; CHIMS = []; WIN_RECTS.length = 0; SPINNERS = [];
  const cv = mkCanvas(MW * TS, MH * TS), c = cv.getContext('2d');
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) paintTile(c, x, y, W.tiles[y * MW + x], sea);
  // props (decorative; placed on grass next to paths and buildings)
  const place = [];
  const g = (x, y) => (x < 0 || y < 0 || x >= MW || y >= MH) ? T.ROCK : W.tiles[y * MW + x];
  const near = (x, y, f) => [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].some(d => f(g(x + d[0], y + d[1])));
  for (let y = 5; y < MH - 3; y++) for (let x = 1; x < PLATEAU_X0 - 1; x++) {
    if (g(x, y) !== T.GRASS) continue; const r = hsh(x, y, 300); if (r > 0.1) continue;
    const nearPath = near(x, y, t => t === T.PATH), nearBld = near(x, y, t => t === T.BLD || t === T.DOOR);
    if (!(nearPath || nearBld) && r > 0.018) continue;
    if (x >= FIELD_X0 - 1 && Math.abs(y - 23) < 3) continue; if (nearPath && near(x, y, t => t === T.DOOR)) continue; if (Math.abs(x - 28) < 2 && y < 24 && y > 5) continue;
    let pick; const u = hsh(x, y, 301);
    if (x < TOWN_X0) pick = u < 0.35 ? 'haystack' : u < 0.55 ? 'scarecrow' : u < 0.7 ? 'sack' : u < 0.8 ? 'woodpile' : u < 0.9 ? 'beehive' : 'bush';
    else if (x >= FIELD_X0) pick = u < 0.4 ? 'bush' : u < 0.6 ? 'stump' : u < 0.8 ? 'mushrooms' : 'berryBush';
    else pick = ['barrel', 'crate', 'sack', 'bench', 'flowerpot', 'bush', 'cart', 'signpost', 'berryBush', 'woodpile', 'puddle'][Math.floor(u * 11)];
    place.push([x, y, pick]);
  }
  // fixed accents
  place.push([27, 8, 'cross'], [26, 7, 'grave'], [29, 7, 'grave'], [30, 8, 'cross'], [24, 7, 'stoneLantern'], [31, 7, 'stoneLantern'], [26, 24, 'lamp'], [30, 24, 'lamp'], [20, 24, 'lamp'], [36, 24, 'lamp'], [27, 18, 'bench'], [30, 18, 'bench'], [25, 16, 'flag'], [31, 16, 'flag'], [40, 24, 'signpost'], [16, 22, 'signpost'], [21, 15, 'clothesline'], [35, 15, 'clothesline'], [20, 26, 'anvil'], [29, 14, 'lamp'], [13, 16, 'scarecrow'], [8, 17, 'scarecrow']);
  place.sort((a, b) => a[1] - b[1]);
  place.forEach(p => { if (g(p[0], p[1]) !== T.GRASS && g(p[0], p[1]) !== T.FLOWER && g(p[0], p[1]) !== T.PATH && g(p[0], p[1]) !== T.FIELD) return; PROPS[p[2]](c, p[0] * TS, p[1] * TS, sea); });
  // trees / rocks / fences in row order so crowns overlap correctly
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const tp = W.tiles[y * MW + x]; if (tp === T.TREE) drawTree(c, x, y, sea); else if (tp === T.ROCK) drawRock(c, x, y, sea); else if (tp === T.FENCE) drawFence(c, x, y, sea); }
  drawFountain(c, 28, 19, sea); drawWell(c, 25, 21); drawWell(c, 31, 21);
  W.blds.forEach(b => drawBuilding(c, b, sea));
  worldCache[sea] = cv; return cv;
}
const WIN_RECTS = [];
