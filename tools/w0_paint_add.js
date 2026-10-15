
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
