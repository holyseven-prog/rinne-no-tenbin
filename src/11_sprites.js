/* ================= sprites & renderer (all drawn by code) ================= */
const CV = typeof document !== 'undefined';
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; return c; }
const fr = (c, col, x, y, w, h) => { c.fillStyle = col; c.fillRect(x, y, w, h); };

const PAL = {
  hair: ['#1c1c24', '#5a3a22', '#8a5a2a', '#d8b050', '#b03a2a', '#9a9aa4', '#e8e8f0', '#1e2850'],
  skin: ['#f4cfa8', '#d8a070', '#a87048'],
  cloth: ['#b84040', '#3c5ac0', '#e0e0e8', '#2a5a3a', '#8a6a3a', '#7a4a9a', '#c07a2a', '#2a8a8a'],
  roof: ['#b84a3a', '#3a6ab0', '#5a8a3a', '#8a5a3a', '#7a4a9a', '#c09a30', '#5a5a68', '#a05a30', '#40304f'],
};
const SEASON_COL = {
  grass: ['#58a840', '#3f9a38', '#a69b3c', '#d6e2e6'], grassD: ['#488a34', '#2f8030', '#8a8030', '#b8c8d0'],
  leaf: ['#2f8a3a', '#1f7030', '#c8742a', '#8aa090'], leafD: ['#1f6a2a', '#145a24', '#a8541a', '#6a8070'],
  crop: ['#7ad050', '#e0c040', '#b87830', '#eef4f8'],
};

/* ---------- terrain ---------- */
function paintTile(c, tx, ty, type, sea) {
  const x = tx * TS, y = ty * TS, v = (tx * 7 + ty * 13 + tx * ty) % 8;
  const grass = () => { fr(c, SEASON_COL.grass[sea], x, y, TS, TS); fr(c, SEASON_COL.grassD[sea], x + (v * 3) % 12 + 1, y + (v * 5) % 11 + 2, 1, 2); fr(c, SEASON_COL.grassD[sea], x + (v * 7) % 13 + 1, y + (v * 3) % 9 + 4, 2, 1); };
  switch (type) {
    case T.GRASS: grass(); break;
    case T.FLOWER: grass(); { const cols = ['#f0e050', '#f08aa0', '#fff', '#a0b8ff']; fr(c, cols[v % 4], x + 4 + v % 5, y + 5 + v % 4, 2, 2); fr(c, cols[(v + 1) % 4], x + 10, y + 11, 2, 2); } break;
    case T.PATH: case T.DOOR: fr(c, '#c8aa78', x, y, TS, TS); fr(c, '#b08c5c', x + (v * 3) % 12, y + (v * 5) % 12, 2, 1); fr(c, '#dcc090', x + (v * 5) % 12, y + (v * 7) % 12 + 1, 1, 1); fr(c, '#b8985c', x + 8, y + (v * 2) % 14, 3, 1); break;
    case T.PLAZA: fr(c, '#a8a8b0', x, y, TS, TS); fr(c, '#8a8a96', x, y + 7, TS, 1); fr(c, '#8a8a96', x + 7 + (ty % 2) * 4, y, 1, 8); fr(c, '#8a8a96', x + 3 + (ty % 2) * 4, y + 8, 1, 8); fr(c, '#c4c4cc', x + 2, y + 2, 2, 1); break;
    case T.WATER: fr(c, '#2f6ec8', x, y, TS, TS); fr(c, '#5a96e0', x + (v * 3) % 10 + 1, y + (v * 5) % 12 + 2, 5, 1); fr(c, '#2058a8', x + (v * 7) % 9, y + 12, 6, 1); break;
    case T.SAND: fr(c, '#e0cc90', x, y, TS, TS); fr(c, '#c8b078', x + (v * 3) % 12, y + (v * 5) % 12, 2, 1); break;
    case T.FIELD: fr(c, '#8a6038', x, y, TS, TS); for (let r = 0; r < 4; r++) { fr(c, '#6a4628', x, y + 2 + r * 4, TS, 1); for (let k = 0; k < 4; k++) fr(c, SEASON_COL.crop[sea], x + 1 + k * 4 + (r % 2) * 2, y + 0 + r * 4, 2, sea === 3 ? 1 : 2); } break;
    case T.DARK: fr(c, '#3a3446', x, y, TS, TS); fr(c, '#2a2436', x + (v * 3) % 12, y + (v * 5) % 12, 3, 1); fr(c, '#4a4258', x + (v * 5) % 12, y + (v * 7) % 12, 1, 3); if (v === 3) fr(c, '#6a3a8a', x + 6, y + 6, 2, 1); break;
    case T.TREE: grass(); fr(c, '#5a3a22', x + 7, y + 10, 3, 6); fr(c, '#000a', x + 3, y + 14, 10, 2);
      { const L = SEASON_COL.leaf[sea], D = SEASON_COL.leafD[sea]; fr(c, D, x + 3, y + 2, 10, 9); fr(c, L, x + 4, y + 1, 8, 9); fr(c, L, x + 2, y + 4, 12, 5); fr(c, D, x + 3, y + 8, 10, 2); fr(c, '#ffffff30', x + 5, y + 3, 3, 2); if (sea === 3) { fr(c, '#f4f8fa', x + 4, y + 1, 8, 2); fr(c, '#f4f8fa', x + 2, y + 4, 3, 1); } }
      break;
    case T.ROCK: grass(); fr(c, '#7a7a86', x + 2, y + 5, 12, 9); fr(c, '#9a9aa6', x + 3, y + 4, 8, 4); fr(c, '#5a5a66', x + 3, y + 11, 11, 3); fr(c, '#b4b4c0', x + 4, y + 5, 3, 1); break;
    case T.FENCE: grass(); fr(c, '#8a6a3a', x, y + 6, TS, 2); fr(c, '#8a6a3a', x + 2, y + 3, 2, 9); fr(c, '#8a6a3a', x + 11, y + 3, 2, 9); break;
    default: grass();
  }
}
const worldCache = {};
function getWorldCanvas(sea) {
  if (worldCache[sea]) return worldCache[sea];
  const cv = mkCanvas(MW * TS, MH * TS), c = cv.getContext('2d');
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { let tp = W.tiles[y * MW + x]; if (tp === T.BLD) tp = T.GRASS; paintTile(c, x, y, tp, sea); }
  // fountain & well
  drawFountain(c, 28, 19); drawWell(c, 25, 21); drawWell(c, 31, 21);
  W.blds.forEach(b => drawBuilding(c, b, sea));
  worldCache[sea] = cv; return cv;
}
function drawFountain(c, tx, ty) { const x = tx * TS, y = ty * TS; fr(c, '#8a8a96', x + 1, y + 3, 14, 12); fr(c, '#3a7ae0', x + 3, y + 5, 10, 8); fr(c, '#a8d0ff', x + 7, y + 2, 2, 6); fr(c, '#fff', x + 6, y + 1, 4, 2); fr(c, '#c8c8d4', x + 1, y + 3, 14, 1); }
function drawWell(c, tx, ty) { const x = tx * TS, y = ty * TS; fr(c, '#7a5a3a', x + 2, y + 2, 12, 3); fr(c, '#9a9aa6', x + 3, y + 6, 10, 9); fr(c, '#1a2a4a', x + 5, y + 8, 6, 5); fr(c, '#5a3a22', x + 3, y + 3, 1, 5); fr(c, '#5a3a22', x + 12, y + 3, 1, 5); }
const WIN_RECTS = [];
function drawBuilding(c, b, sea) {
  const px = b.x * TS, py = b.y * TS, w = b.w * TS, h = b.h * TS;
  const roof = PAL.roof[b.roof % PAL.roof.length];
  let wall = '#e4d2a4', wallD = '#c4b080', door = '#6a4220';
  if (b.kind === 'church') { wall = '#ececf4'; wallD = '#c0c0d0'; door = '#4a3a2a'; }
  else if (b.kind === 'guild') { wall = '#b8905a'; wallD = '#8a6a3a'; }
  else if (b.kind === 'tavern') { wall = '#c8a070'; wallD = '#9a7848'; }
  else if (b.kind === 'castle') { wall = '#4a4258'; wallD = '#2e2a3c'; door = '#1a1020'; }
  else if (b.kind === 'smithy') { wall = '#9a9aa6'; wallD = '#70707c'; }
  else if (b.kind === 'mill') { wall = '#e8e0cc'; wallD = '#c0b498'; }
  const wallH = b.kind === 'castle' ? 26 : Math.min(h - 8, Math.round(h * 0.45));
  const roofH = h - wallH;
  fr(c, '#0000002a', px + 1, py + h - 2, w, 4); // shadow
  fr(c, wall, px + 2, py + roofH, w - 4, wallH);
  fr(c, wallD, px + 2, py + roofH + wallH - 3, w - 4, 3);
  fr(c, '#00000030', px + 2, py + roofH, w - 4, 2);
  // roof
  if (b.kind === 'castle') {
    fr(c, wall, px, py + 8, w, h - 8); fr(c, wallD, px, py + 8, w, 3);
    for (let i = 0; i < 5; i++) fr(c, wall, px + i * 16 + 2, py + 2, 8, 8); // crenellations
    fr(c, '#6a3a8a', px + 4, py - 6 + 8, 8, 12); fr(c, '#8a4aaa', px + 5, py - 8 + 8, 6, 4); fr(c, '#6a3a8a', px + w - 12, py + 2, 8, 14);
    fr(c, '#2a1a3a', px + 2, py + 14, w - 4, 4);
    for (let i = 0; i < 4; i++) { fr(c, '#c040e0', px + 8 + i * 18, py + 26, 4, 6); }
    fr(c, '#d060ff', px + w / 2 - 3, py + 10, 6, 6); fr(c, '#fff', px + w / 2 - 1, py + 12, 2, 2);
  } else if (b.kind === 'mill') {
    fr(c, roof, px + 3, py + 2, w - 6, 10); fr(c, '#00000030', px + 3, py + 10, w - 6, 2);
    fr(c, '#5a3a22', px + w / 2 - 1, py + 6, 2, 2); fr(c, '#f4f4f4', px + w / 2 - 16, py + 5, 32, 2); fr(c, '#f4f4f4', px + w / 2 - 1, py - 10, 2, 32);
  } else {
    const ov = 3;
    fr(c, roof, px - ov + 2, py + 4, w + ov * 2 - 4, roofH - 4);
    fr(c, '#ffffff22', px - ov + 2, py + 4, w + ov * 2 - 4, 3);
    fr(c, '#00000030', px - ov + 2, py + roofH - 3, w + ov * 2 - 4, 3);
    for (let i = 0; i < roofH - 6; i += 4) fr(c, '#00000018', px - ov + 2, py + 8 + i, w + ov * 2 - 4, 1);
    fr(c, roof, px + 6, py + 1, w - 12, 4);
    if (b.kind === 'house' || b.kind === 'hut') { fr(c, '#8a8a96', px + w - 12, py - 3, 4, 8); fr(c, '#5a5a66', px + w - 12, py - 3, 4, 2); }
  }
  // door
  const dx = b.door.x * TS, dy = b.door.y * TS;
  fr(c, door, dx + 3, dy + 3, 10, 13); fr(c, '#00000040', dx + 3, dy + 3, 10, 1); fr(c, '#e8c860', dx + 10, dy + 10, 2, 2);
  if (b.kind === 'church' || b.kind === 'castle') { fr(c, '#0000004a', dx + 3, dy + 3, 10, 3); }
  // windows
  const wy = py + roofH + 3;
  const wins = []; const nW = Math.max(1, Math.floor((w - 8) / 24));
  for (let i = 0; i < b.w - 1; i++) { const wx = px + 6 + i * TS * (b.w >= 5 ? 1 : 1) + (b.w >= 5 ? 6 : 0); if (Math.abs(wx + 4 - (dx + 8)) < 10 || wx + 9 > px + w - 4) continue; wins.push([wx, wy, 8, 7]); }
  if (b.w === 3 && !wins.length) wins.push([px + 4, wy, 7, 7]);
  if (b.kind === 'castle') wins.length = 0;
  wins.forEach(r => { fr(c, '#3a2a1a', r[0] - 1, r[1] - 1, r[2] + 2, r[3] + 2); fr(c, '#7ab0e8', r[0], r[1], r[2], r[3]); fr(c, '#ffffff60', r[0], r[1], 3, 2); fr(c, '#3a2a1a', r[0] + (r[2] >> 1), r[1], 1, r[3]); WIN_RECTS.push({ x: r[0], y: r[1], w: r[2], h: r[3] }); });
  if (b.kind === 'castle') for (let i = 0; i < 4; i++) WIN_RECTS.push({ x: px + 8 + i * 18, y: py + 26, w: 4, h: 6, purple: true });
  // sign
  const sx = dx + 8, sy = dy - 6;
  if (b.kind === 'guild') { fr(c, '#3a2a1a', sx - 8, sy - 5, 16, 10); fr(c, '#f0e0a0', sx - 7, sy - 4, 14, 8); fr(c, '#2a2a3a', sx - 1, sy - 3, 2, 6); fr(c, '#2a2a3a', sx - 5, sy - 3, 10, 1); fr(c, '#d8b030', sx - 5, sy - 2, 3, 2); fr(c, '#d8b030', sx + 2, sy - 2, 3, 2); }
  else if (b.kind === 'tavern') { fr(c, '#3a2a1a', sx - 7, sy - 5, 14, 10); fr(c, '#f0e0a0', sx - 6, sy - 4, 12, 8); fr(c, '#d89020', sx - 3, sy - 3, 5, 6); fr(c, '#fff', sx - 3, sy - 3, 5, 1); fr(c, '#d89020', sx + 2, sy - 2, 2, 3); }
  else if (b.kind === 'church') { fr(c, '#d8d8e4', px + w / 2 - 6, py - 12, 12, 14); fr(c, '#8a4a30', px + w / 2 - 6, py - 14, 12, 3); fr(c, '#e8c030', px + w / 2 - 1, py - 22, 2, 8); fr(c, '#e8c030', px + w / 2 - 3, py - 19, 6, 2); fr(c, '#3a3a50', px + w / 2 - 2, py - 8, 4, 6); }
  else if (b.kind === 'smithy') { fr(c, '#3a2a1a', sx - 7, sy - 5, 14, 10); fr(c, '#f0e0a0', sx - 6, sy - 4, 12, 8); fr(c, '#2a2a3a', sx - 4, sy - 2, 8, 3); fr(c, '#2a2a3a', sx - 2, sy, 4, 3); }
  else if (b.kind === 'shop') { fr(c, '#3a2a1a', sx - 7, sy - 5, 14, 10); fr(c, '#f0e0a0', sx - 6, sy - 4, 12, 8); fr(c, '#8a5a30', sx - 3, sy - 2, 6, 5); fr(c, '#e8c030', sx - 1, sy - 3, 2, 2); }
  else if (b.kind === 'apothecary') { fr(c, '#3a2a1a', sx - 7, sy - 5, 14, 10); fr(c, '#f0e0a0', sx - 6, sy - 4, 12, 8); fr(c, '#40c060', sx - 2, sy - 1, 4, 4); fr(c, '#40c060', sx - 1, sy - 3, 2, 3); }
  else if (b.kind === 'inn') { fr(c, '#3a2a1a', sx - 7, sy - 5, 14, 10); fr(c, '#f0e0a0', sx - 6, sy - 4, 12, 8); fr(c, '#c04040', sx - 4, sy - 1, 8, 3); fr(c, '#fff', sx - 4, sy - 2, 3, 2); }
  if (sea === 3 && b.kind !== 'castle' && b.kind !== 'mill') { fr(c, '#f4f8fa', px - 2, py + 3, w + 4, 3); }
}

/* ---------- humans ---------- */
const spriteCache = {};
function humanSprite(h, dir, frame) {
  const L = h.look, child = h.age < ADULT_AGE, elder = h.age >= 56;
  const key = [h.job, L.hair, L.style, L.skin, L.cloth, L.acc, child ? 1 : 0, elder ? 1 : 0, dir, frame].join('.');
  if (spriteCache[key]) return spriteCache[key];
  const cv = mkCanvas(16, 24), c = cv.getContext('2d');
  const side = dir >= 2;
  const hairC = elder ? PAL.hair[5] : PAL.hair[L.hair], skin = PAL.skin[L.skin];
  let cloth = PAL.cloth[L.cloth], cloth2 = '#00000040';
  const jobCol = { swordsman: '#b84040', mage: '#6a4ac0', priest: '#ececf4', thief: '#2e3a30', farmer: '#a88850', merchant: '#c88a30', smith: '#7a7a86', herbalist: '#3a8a4a', historian: '#2a3a6a' };
  if (jobCol[h.job] && !child) cloth = jobCol[h.job]; if (child) cloth = PAL.cloth[L.cloth];
  const pants = '#3a3248', boots = '#4a3020';
  const scale = child ? 0.78 : 1;
  const c2 = child ? mkCanvas(16, 24).getContext('2d') : c;
  const g = c2;
  const sw = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  // legs
  if (!side) {
    fr(g, pants, 5, 17, 3, 5 - (sw > 0 ? 1 : 0)); fr(g, pants, 8, 17, 3, 5 - (sw < 0 ? 1 : 0));
    fr(g, boots, 5, 21 - (sw > 0 ? 1 : 0), 3, 2); fr(g, boots, 8, 21 - (sw < 0 ? 1 : 0), 3, 2);
  } else {
    fr(g, pants, 6 + sw, 17, 3, 5); fr(g, pants, 7 - sw, 17, 3, 5); fr(g, boots, 5 + sw, 21, 4, 2); fr(g, boots, 7 - sw, 21, 4, 2);
  }
  // torso
  const tx = side ? 5 : 4, tw = side ? 6 : 8;
  fr(g, cloth, tx, 10, tw, 8); fr(g, cloth2, tx, 15, tw, 1); fr(g, '#ffffff22', tx + 1, 10, 2, 2);
  if (h.job === 'priest' && !child) { fr(g, '#ececf4', tx, 10, tw, 11); fr(g, '#d0d0e0', tx, 19, tw, 2); if (!side && dir === 0) { fr(g, '#e8c030', 7, 11, 2, 5); fr(g, '#e8c030', 6, 12, 4, 1); } }
  if (h.job === 'smith' && !child && dir === 0) fr(g, '#5a3a22', 5, 12, 6, 6);
  if (h.job === 'mage' && !child) { fr(g, cloth, tx - 1, 17, tw + 2, 4); fr(g, '#e8c030', tx, 15, tw, 1); }
  if (h.job === 'historian') { fr(g, '#e8e0c0', tx + 1, 10, 1, 7); }
  // arms
  if (!side) { fr(g, cloth, 3, 11, 1, 5); fr(g, cloth, 12, 11, 1, 5); fr(g, skin, 3, 16, 1, 2); fr(g, skin, 12, 16, 1, 2); if (sw) { fr(g, cloth, 3, 11 + sw, 1, 1); } }
  else { fr(g, cloth, 7 - sw, 11, 2, 5); fr(g, skin, 7 - sw, 16, 2, 2); }
  // head
  if (!side) {
    fr(g, skin, 4, 3, 8, 7); fr(g, skin, 5, 2, 6, 1); fr(g, skin, 5, 10, 6, 1);
    if (dir === 0) { fr(g, '#1a1a24', 6, 6, 1, 2); fr(g, '#1a1a24', 9, 6, 1, 2); fr(g, '#00000030', 7, 8, 2, 1); if (L.acc === 1) fr(g, '#e8908070', 4, 8, 2, 1); }
  } else {
    fr(g, skin, 5, 3, 7, 7); fr(g, skin, 6, 2, 5, 1); fr(g, skin, 6, 10, 4, 1); fr(g, '#1a1a24', 6, 6, 1, 2); fr(g, skin, 4, 7, 1, 2);
  }
  // hair
  const hs = L.style;
  if (!side) {
    fr(g, hairC, 4, 2, 8, 3); fr(g, hairC, 5, 1, 6, 1);
    if (dir === 1) { fr(g, hairC, 4, 2, 8, 8); fr(g, hairC, 5, 10, 6, 1); }
    else { fr(g, hairC, 4, 4, 1, 3); fr(g, hairC, 11, 4, 1, 3); }
    if (hs === 1) { fr(g, hairC, 3, 3, 1, 8); fr(g, hairC, 12, 3, 1, 8); if (dir === 1) fr(g, hairC, 4, 9, 8, 3); }
    else if (hs === 2) { fr(g, hairC, 4, 0, 2, 2); fr(g, hairC, 7, 0, 2, 1); fr(g, hairC, 10, 0, 2, 2); }
    else if (hs === 3) { fr(g, hairC, 7, -1 + 1, 2, 1); fr(g, hairC, 6, 0, 4, 2); }
  } else {
    fr(g, hairC, 5, 2, 7, 3); fr(g, hairC, 6, 1, 5, 1); fr(g, hairC, 9, 3, 3, 6);
    if (hs === 1) fr(g, hairC, 9, 3, 3, 9); else if (hs === 2) { fr(g, hairC, 6, 0, 2, 2); fr(g, hairC, 9, 0, 2, 2); }
  }
  // job headgear / items
  const J = h.job;
  if (J === 'mage' && !child) { fr(g, '#5a3aa0', 3, 3, 10, 2); fr(g, '#5a3aa0', 5, 0, 6, 3); fr(g, '#5a3aa0', 7, -2 + 1, 2, 2); fr(g, '#e8c030', 5, 3, 6, 1); }
  else if (J === 'farmer') { fr(g, '#d8b860', 2, 2, 12, 2); fr(g, '#d8b860', 4, 0, 8, 3); fr(g, '#a88840', 4, 3, 8, 1); }
  else if (J === 'merchant') { fr(g, '#b86a2a', 3, 2, 10, 2); fr(g, '#b86a2a', 5, 0, 6, 3); fr(g, '#e8c030', 5, 3, 6, 1); }
  else if (J === 'thief' && !child) { fr(g, '#2e3a30', 4, 2, 8, 4); fr(g, '#1a2a20', 4, 6, 8, 2); if (dir === 0) { fr(g, '#e8e8e8', 6, 6, 1, 1); fr(g, '#e8e8e8', 9, 6, 1, 1); } }
  else if (J === 'historian') { fr(g, '#2a3a6a', 3, 2, 10, 2); fr(g, '#2a3a6a', 5, 0, 6, 3); }
  else if (J === 'priest' && !child) { fr(g, '#ececf4', 3, 1, 10, 3); fr(g, '#d0d0e0', 3, 3, 10, 1); }
  else if (J === 'herbalist') { fr(g, '#3a8a4a', 4, 9, 8, 2); }
  else if (J === 'smith') { fr(g, '#c04030', 4, 2, 8, 1); }
  // weapon / tool
  const hx = side ? 3 : 13;
  if (J === 'swordsman' && !child) { fr(g, '#d8d8e4', hx, 6 - sw, 1, 8); fr(g, '#8a6a3a', hx - 1, 14 - sw, 3, 1); fr(g, '#5a3a22', hx, 15 - sw, 1, 2); }
  else if (J === 'mage' && !child) { fr(g, '#8a5a30', hx, 5, 1, 14); fr(g, '#60c0ff', hx - 1, 3, 3, 3); fr(g, '#c0f0ff', hx, 4, 1, 1); }
  else if (J === 'thief' && !child) { fr(g, '#c8c8d8', hx, 12, 1, 4); fr(g, '#5a3a22', hx, 16, 1, 2); }
  else if (J === 'farmer') { fr(g, '#8a5a30', hx, 7, 1, 11); fr(g, '#aaa', hx - 1, 6, 3, 1); }
  else if (J === 'smith') { fr(g, '#8a5a30', hx, 10, 1, 7); fr(g, '#6a6a76', hx - 1, 8, 3, 3); }
  else if (J === 'historian') { fr(g, '#e8e0c0', hx - 1, 13, 3, 4); fr(g, '#8a3a2a', hx - 1, 13, 1, 4); }
  else if (J === 'merchant') { fr(g, '#8a5a30', hx - 1, 13, 4, 4); fr(g, '#e8c030', hx, 12, 2, 1); }
  else if (J === 'priest' && !child) { fr(g, '#e8c030', hx, 5, 1, 12); fr(g, '#e8c030', hx - 1, 6, 3, 1); }
  else if (J === 'herbalist') { fr(g, '#5a8a3a', hx - 1, 13, 4, 4); fr(g, '#e8708a', hx, 12, 1, 1); }
  if (side && dir === 3) { /* flip */ }
  if (child) { c.drawImage(c2.canvas, 0, 0, 16, 24, 2, 24 - 24 * scale, 16 * scale, 24 * scale); }
  let out = cv;
  if (dir === 3) { const f = mkCanvas(16, 24), fc = f.getContext('2d'); fc.translate(16, 0); fc.scale(-1, 1); fc.drawImage(cv, 0, 0); out = f; }
  spriteCache[key] = out; return out;
}
function monsterSprite(m, frame) {
  const key = 'm.' + m.type + '.' + frame; if (spriteCache[key]) return spriteCache[key];
  const big = m.boss ? [40, 48] : m.cad >= 0 ? [28, 36] : [16, 16];
  const cv = mkCanvas(big[0], big[1]), g = cv.getContext('2d'); const f = frame;
  if (m.boss) {
    fr(g, '#14101e', 6, 12, 28, 32); fr(g, '#24203a', 8, 14, 24, 28); fr(g, '#3a3252', 4, 10, 6, 14); fr(g, '#3a3252', 30, 10, 6, 14);
    fr(g, '#14101e', 10, 6, 20, 12); fr(g, '#d8c8f0', 14, 11, 12, 6); fr(g, '#c040ff', 15, 12, 3, 3); fr(g, '#c040ff', 22, 12, 3, 3);
    fr(g, '#e8c030', 10, 2, 20, 4); fr(g, '#e8c030', 10, 0, 3, 4); fr(g, '#e8c030', 18, -1 + 1, 4, 4); fr(g, '#e8c030', 27, 0, 3, 4); fr(g, '#000', 10, 5, 20, 1);
    fr(g, '#14101e', 8 + f, 40, 10, 8); fr(g, '#14101e', 22 - f, 40, 10, 8); fr(g, '#9a40c0', 18, 22, 4, 10); fr(g, '#5a2a8a', 6, 20, 2, 18); fr(g, '#d8d8ec', 34, 4, 2, 26);
  } else if (m.cad >= 0) {
    const cols = [['#5a3a90', '#9a70e0', '#d8c0ff'], ['#d8d4c4', '#9a9684', '#e84030'], ['#14101e', '#5a2a6a', '#ff60c0']][m.cad];
    fr(g, cols[0], 6, 12, 16, 20); fr(g, cols[1], 8, 14, 12, 14); fr(g, cols[0], 8, 4, 12, 10); fr(g, '#d8c8e8', 10, 7, 8, 5);
    fr(g, cols[2], 11, 8, 2, 2); fr(g, cols[2], 15, 8, 2, 2); fr(g, cols[2], 9, 1, 10, 3);
    if (m.cad === 0) { fr(g, '#c8b0f0aa', 2, 22 + f, 24, 8); fr(g, '#c8b0f088', 0, 28, 28, 6); }
    if (m.cad === 1) { fr(g, '#d8d4c4', 3, 10, 5, 8); fr(g, '#d8d4c4', 20, 10, 5, 8); fr(g, '#8a8674', 24, 2, 3, 24); fr(g, '#d8d4c4', 8 + f, 32, 5, 4); fr(g, '#d8d4c4', 15 - f, 32, 5, 4); }
    if (m.cad === 2) { fr(g, '#14101e', 4, 14, 20, 20); fr(g, '#ff60c0', 12, 20, 4, 2); fr(g, '#2a1a3a', 6 + f, 32, 6, 4); fr(g, '#2a1a3a', 16 - f, 32, 6, 4); }
  } else {
    switch (m.type) {
      case 'mush': fr(g, '#f4ecd8', 6, 8, 4, 6); fr(g, '#d83a3a', 2, 3, 12, 6); fr(g, '#ffffff', 4, 4, 2, 2); fr(g, '#ffffff', 9, 5, 3, 2); fr(g, '#1a1a24', 6, 10, 1, 2); fr(g, '#1a1a24', 9, 10, 1, 2); fr(g, '#f4ecd8', 5 + f, 14, 2, 2); fr(g, '#f4ecd8', 9 - f, 14, 2, 2); break;
      case 'bat': fr(g, '#3a2a5a', 6, 6, 4, 5); fr(g, '#5a3a8a', f ? 0 : 1, f ? 3 : 6, 6, f ? 3 : 5); fr(g, '#5a3a8a', f ? 10 : 9, f ? 3 : 6, 6, f ? 3 : 5); fr(g, '#ff4060', 6, 7, 1, 1); fr(g, '#ff4060', 9, 7, 1, 1); fr(g, '#3a2a5a', 6, 5, 1, 2); fr(g, '#3a2a5a', 9, 5, 1, 2); break;
      case 'turtle': fr(g, '#5a7a4a', 2, 5, 12, 8); fr(g, '#7a9a5a', 4, 4, 8, 3); fr(g, '#3a5a3a', 5, 7, 2, 2); fr(g, '#3a5a3a', 9, 7, 2, 2); fr(g, '#a8b080', 12, 8, 3, 3); fr(g, '#1a1a24', 14, 8, 1, 1); fr(g, '#a8b080', 3 + f, 13, 3, 2); fr(g, '#a8b080', 10 - f, 13, 3, 2); break;
      case 'goblin': fr(g, '#5a9a3a', 4, 3, 8, 7); fr(g, '#5a9a3a', 1, 4, 3, 2); fr(g, '#5a9a3a', 12, 4, 3, 2); fr(g, '#ffe040', 5, 5, 2, 2); fr(g, '#ffe040', 9, 5, 2, 2); fr(g, '#1a1a24', 6, 6, 1, 1); fr(g, '#1a1a24', 10, 6, 1, 1); fr(g, '#7a4a2a', 4, 10, 8, 4); fr(g, '#5a9a3a', 5 + f, 14, 2, 2); fr(g, '#5a9a3a', 9 - f, 14, 2, 2); fr(g, '#8a5a30', 13, 6, 2, 8); break;
      case 'skel': fr(g, '#e8e4d4', 5, 2, 6, 6); fr(g, '#1a1a24', 6, 4, 2, 2); fr(g, '#1a1a24', 9, 4, 2, 2); fr(g, '#e8e4d4', 7, 9, 2, 5); fr(g, '#e8e4d4', 4, 9, 8, 1); fr(g, '#e8e4d4', 4, 11, 8, 1); fr(g, '#e8e4d4', 5 + f, 14, 2, 2); fr(g, '#e8e4d4', 9 - f, 14, 2, 2); fr(g, '#b8b8c8', 13, 4, 1, 9); fr(g, '#6a4a2a', 12, 12, 3, 1); break;
      case 'wolf': fr(g, '#7a7a8a', 2, 6, 11, 6); fr(g, '#9a9aaa', 10, 3, 5, 5); fr(g, '#ff3030', 13, 4, 1, 1); fr(g, '#7a7a8a', 10, 2, 2, 2); fr(g, '#5a5a6a', 0, 5, 3, 2); fr(g, '#5a5a6a', 3 + f, 12, 2, 3); fr(g, '#5a5a6a', 6 - f, 12, 2, 3); fr(g, '#5a5a6a', 9 + f, 12, 2, 3); fr(g, '#fff', 14, 7, 1, 1); break;
      default: fr(g, '#a04040', 3, 3, 10, 10);
    }
  }
  spriteCache[key] = cv; return cv;
}

/* ---------- renderer ---------- */
const Render = {
  cam: { x: 0, y: 0 }, cv: null, c: null, parts: [], nums: [], time: 0, flash: 0, dim: 0, sel: 0, shake: 0, rings: [],
  init(cv) { this.cv = cv; this.c = cv.getContext('2d'); this.c.imageSmoothingEnabled = false; this.cam.x = 18 * TS; this.cam.y = 10 * TS; },
  clampCam() { this.cam.x = clamp(this.cam.x, 0, MW * TS - 640); this.cam.y = clamp(this.cam.y, 0, MH * TS - 360); },
  centerOn(tx, ty) { this.cam.x = tx * TS + 8 - 320; this.cam.y = ty * TS - 180; this.clampCam(); },
  consumeFx() {
    if (!G || !G.fx) return;
    for (const f of G.fx) {
      const x = f.x * TS + 8, y = f.y * TS + 6;
      if (f.t === 'dmg') this.nums.push({ x, y: y - 8, v: f.v, col: f.crit ? '#ffd040' : f.human ? '#ff6060' : '#ffffff', life: 28, big: f.crit });
      else if (f.t === 'heal') this.nums.push({ x, y: y - 8, v: '+' + f.v, col: '#60ff80', life: 30 });
      else if (f.t === 'atk') { const tx = f.tx * TS + 8, ty = f.ty * TS + 4; for (let i = 0; i < 3; i++) this.parts.push({ x: tx, y: ty, vx: (Math.random() - .5) * 1.6, vy: (Math.random() - .5) * 1.6, life: 8, col: f.mage ? '#a0d0ff' : '#fff', s: 2 }); if (f.mage) this.rings.push({ x: tx, y: ty, r: 2, life: 8, col: '#80c0ff' }); }
      else if (f.t === 'poof') for (let i = 0; i < 10; i++) this.parts.push({ x, y, vx: (Math.random() - .5) * 2.4, vy: -Math.random() * 2, life: 18, col: i % 2 ? '#c0b0e0' : '#fff', s: 2 });
      else if (f.t === 'soul') { for (let i = 0; i < 8; i++) this.parts.push({ x, y, vx: (Math.random() - .5) * .5, vy: -0.5 - Math.random() * .8, life: 70, col: '#a8e0ff', s: 2, glow: 1 }); }
      else if (f.t === 'lvl') { for (let i = 0; i < 12; i++) this.parts.push({ x, y: y + 4, vx: (Math.random() - .5) * 1.2, vy: -1 - Math.random(), life: 26, col: '#ffe060', s: 2 }); }
      else if (f.t === 'ring') this.rings.push({ x, y, r: 3, life: 14, col: '#c070ff' });
      else if (f.t === 'divine') { this.beam = { x, y, life: 46, pid: f.pid, out: f.out }; this.dim = 0.5; for (let i = 0; i < 30; i++) this.parts.push({ x: x + (Math.random() - .5) * 16, y: y + 8, vx: (Math.random() - .5) * .6, vy: -1 - Math.random() * 2, life: 40 + Math.random() * 20, col: f.out === 'fail' ? '#8080a0' : f.out === 'twist' ? '#c080ff' : '#fff4a0', s: 2, glow: 1 }); }
      else if (f.t === 'pray') { for (let i = 0; i < 6; i++) this.parts.push({ x, y, vx: (Math.random() - .5) * .5, vy: -1 - Math.random(), life: 30, col: '#fff0a0', s: 1 }); }
    }
    G.fx.length = 0;
  },
  nightAlpha(hf) { if (hf < 5) return 0.58; if (hf < 7) return lerp(0.58, 0, (hf - 5) / 2); if (hf < 17) return 0; if (hf < 20) return lerp(0, 0.5, (hf - 17) / 3); return hf < 22 ? 0.5 : 0.58; },
  draw(alpha, opts) {
    opts = opts || {};
    const c = this.c; this.time++;
    this.consumeFx();
    const sea = seasonOf(G.tick);
    const cam = this.cam; const cx = Math.round(cam.x + (this.shake ? (Math.random() - .5) * this.shake : 0)), cy = Math.round(cam.y);
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(getWorldCanvas(sea), cx, cy, 640, 360, 0, 0, 640, 360);
    // animated water sparkle
    const tx0 = Math.floor(cx / TS), ty0 = Math.floor(cy / TS);
    for (let ty = ty0; ty <= ty0 + 23 && ty < MH; ty++) for (let tx = tx0; tx <= tx0 + 40 && tx < MW; tx++) if (W.tiles[ty * MW + tx] === T.WATER && ((tx * 3 + ty * 5 + (this.time >> 4)) & 3) === 0) fr(c, '#ffffff70', tx * TS - cx + ((tx * 7) & 7) + 2, ty * TS - cy + ((ty * 5) & 7) + 3, 3, 1);
    // plateau fog
    if (cx + 640 > PLATEAU_X0 * TS) { c.globalAlpha = 0.18 + (G.awakened ? 0.12 : 0) + Math.sin(this.time / 40) * 0.04; fr(c, '#9a50d0', PLATEAU_X0 * TS - cx, 0, 640, 360); c.globalAlpha = 1; }
    // entities
    const list = [];
    for (const h of G.humans) { if (!h.alive || h.inside) continue; const x = lerp(h.px, h.x, alpha), y = lerp(h.py, h.y, alpha); if (x * TS - cx < -20 || x * TS - cx > 660 || y * TS - cy < -20 || y * TS - cy > 380) continue; list.push({ e: h, x, y, k: 0 }); }
    for (const m of G.monsters) { if (!m.alive || m.dormant) continue; const x = lerp(m.px, m.x, alpha), y = lerp(m.py, m.y, alpha); if (x * TS - cx < -40 || x * TS - cx > 680 || y * TS - cy < -40 || y * TS - cy > 400) continue; list.push({ e: m, x, y, k: 1 }); }
    list.sort((a, b) => a.y - b.y);
    const prayers = {}; G.prayers.forEach(p => { if (p.state === 'open') prayers[p.hid] = p; });
    // prayer pillars (behind)
    for (const it of list) { if (it.k === 0 && prayers[it.e.id]) { const p = prayers[it.e.id]; const sx = it.x * TS + 8 - cx, sy = it.y * TS + 12 - cy; const pul = 0.55 + 0.25 * Math.sin(this.time / 8 + it.e.id); const col = p.urg > 0.75 ? '255,120,80' : p.urg > 0.5 ? '255,200,80' : '255,240,160'; const gr = c.createLinearGradient(0, sy - 52, 0, sy); gr.addColorStop(0, `rgba(${col},0)`); gr.addColorStop(1, `rgba(${col},${pul})`); c.fillStyle = gr; c.fillRect(sx - 3, sy - 52, 6, 52); c.fillStyle = `rgba(255,255,255,${pul * .6})`; c.fillRect(sx - 1, sy - 48, 2, 48); } }
    for (const it of list) {
      const e = it.e; const sx = Math.round(it.x * TS + 8 - cx), sy = Math.round(it.y * TS + 14 - cy);
      c.fillStyle = 'rgba(0,0,0,0.28)'; c.beginPath(); c.ellipse(sx, sy, it.k && (e.boss || e.cad >= 0) ? 11 : 6, 2.5, 0, 0, 7); c.fill();
      if (it.k === 0) { const sl = soulOf(e); if (sl && sl.fav) { c.strokeStyle = '#ffd860'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(sx, sy, 8, 3.4, 0, 0, 7); c.stroke(); } else if (G.track.indexOf(e.id) >= 0) { c.strokeStyle = '#60d8ff'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(sx, sy, 8, 3.4, 0, 0, 7); c.stroke(); } if (e.id === Game.flashId) { const k = 8 + Math.sin(this.time / 4) * 3; c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.ellipse(sx, sy - 6, k, k * 1.2, 0, 0, 7); c.stroke(); } }
      let spr, ox = 0, oy = 0;
      if (it.k === 0) {
        const moving = e.path && e.path.length > 0 || Math.abs(e.x - e.px) > 0.01 || Math.abs(e.y - e.py) > 0.01;
        const fm = moving ? 1 + ((this.time >> 3) & 1) : 0; spr = humanSprite(e, e.dir === undefined ? 0 : e.dir, fm);
        const sleeping = e.act && e.act.k === 'sleep';
        if (e.tgt && e.hurt === undefined) { }
        if (e.tgt && G.idx[e.tgt] && Math.hypot(G.idx[e.tgt].x - e.x, G.idx[e.tgt].y - e.y) < 2.2) { const t = G.idx[e.tgt]; const d = Math.hypot(t.x - e.x, t.y - e.y) || 1; const k = Math.max(0, Math.sin(this.time / 2.5 + e.id)) * 2.5; ox = (t.x - e.x) / d * k; oy = (t.y - e.y) / d * k; }
        if (e.hurt > 0) c.filter = 'brightness(2.6)';
        c.drawImage(spr, Math.round(sx - 8 + ox), Math.round(sy - 22 + oy));
        c.filter = 'none';
        // icons
        const iy = sy - 27;
        if (prayers[e.id]) { fr(c, '#ffe880', sx - 2, iy - 2 + Math.round(Math.sin(this.time / 6) * 1), 4, 4); fr(c, '#fff', sx - 1, iy - 1 + Math.round(Math.sin(this.time / 6) * 1), 2, 2); }
        else if (e.tgt) { fr(c, '#e8e8f0', sx - 1, iy - 3, 2, 6); fr(c, '#c8a040', sx - 3, iy + 1, 6, 1); }
        else if (e.love) { fr(c, '#ff6080', sx - 3, iy - 2, 2, 2); fr(c, '#ff6080', sx + 1, iy - 2, 2, 2); fr(c, '#ff6080', sx - 3, iy, 6, 2); fr(c, '#ff6080', sx - 2, iy + 2, 4, 1); }
        else if (sleeping) { fr(c, '#a0c0ff', sx + 3, iy - 1, 3, 1); fr(c, '#a0c0ff', sx + 4, iy, 1, 1); fr(c, '#a0c0ff', sx + 3, iy + 1, 3, 1); }
        else if (e.party) { fr(c, '#60a0ff', sx - 1, iy - 1, 3, 3); }
        if (e.id === this.sel || e.hp < e.maxHp * 0.99 && (e.tgt || e.hurt > 0 || e.id === this.sel)) { const w = 14; fr(c, '#000a', sx - 7, sy - 29, w + 2, 4); fr(c, '#3a3a3a', sx - 6, sy - 28, w, 2); fr(c, e.hp / e.maxHp > 0.5 ? '#40e060' : e.hp / e.maxHp > 0.25 ? '#e0c040' : '#e04040', sx - 6, sy - 28, Math.max(1, Math.round(w * e.hp / e.maxHp)), 2); }
        if (e.id === this.sel) { const bob = Math.round(Math.sin(this.time / 6) * 1.5); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(sx - 4, sy - 36 + bob); c.lineTo(sx + 4, sy - 36 + bob); c.lineTo(sx, sy - 31 + bob); c.fill(); }
      } else {
        spr = monsterSprite(e, (this.time >> 4) & 1); const bw = spr.width, bh = spr.height;
        const bob = e.type === 'bat' ? Math.round(Math.sin(this.time / 5 + e.id) * 2) - 6 : 0;
        if (e.hurt > 0) c.filter = 'brightness(2.6)';
        c.drawImage(spr, Math.round(sx - bw / 2), Math.round(sy - bh + 2 + bob)); c.filter = 'none';
        if (e.hp < e.maxHp || e.boss || e.cad >= 0) { const w = e.boss ? 40 : e.cad >= 0 ? 26 : 14; fr(c, '#000a', sx - w / 2 - 1, sy - bh - 3 + bob, w + 2, 4); fr(c, '#3a3a3a', sx - w / 2, sy - bh - 2 + bob, w, 2); fr(c, e.boss ? '#c040ff' : '#e04040', sx - w / 2, sy - bh - 2 + bob, Math.max(1, Math.round(w * e.hp / e.maxHp)), 2); }
      }
    }
    // soul orbs, particles
    for (let i = this.parts.length - 1; i >= 0; i--) { const p = this.parts[i]; p.x += p.vx; p.y += p.vy; p.life--; if (p.life <= 0) { this.parts.splice(i, 1); continue; } c.globalAlpha = Math.min(1, p.life / 14); c.fillStyle = p.col; const sx = p.x - cx, sy = p.y - cy; if (p.glow) { c.globalAlpha *= 0.4; c.fillRect(Math.round(sx) - 2, Math.round(sy) - 2, 5, 5); c.globalAlpha = Math.min(1, p.life / 14); } c.fillRect(Math.round(sx), Math.round(sy), p.s, p.s); }
    c.globalAlpha = 1;
    for (let i = this.rings.length - 1; i >= 0; i--) { const r = this.rings[i]; r.r += 1; r.life--; if (r.life <= 0) { this.rings.splice(i, 1); continue; } c.globalAlpha = r.life / 14; c.strokeStyle = r.col; c.beginPath(); c.arc(r.x - cx, r.y - cy, r.r, 0, 7); c.stroke(); } c.globalAlpha = 1;
    // overlays: day/night
    const hf = (G.tick % TICK_DAY) / 6; const na = opts.noNight ? 0 : this.nightAlpha(hf);
    if (na > 0) { c.fillStyle = `rgba(8,16,64,${na})`; c.fillRect(0, 0, 640, 360); }
    if (!opts.noNight && hf >= 17 && hf < 19.5) { c.fillStyle = `rgba(255,140,40,${0.1 * (1 - Math.abs(hf - 18.2) / 1.5)})`; c.fillRect(0, 0, 640, 360); }
    if (!opts.noNight && hf >= 5 && hf < 7.5) { c.fillStyle = `rgba(255,170,120,${0.08})`; c.fillRect(0, 0, 640, 360); }
    // window lights
    if (na > 0.15) { c.globalAlpha = Math.min(1, na * 1.6); for (const r of WIN_RECTS) { const sx = r.x - cx, sy = r.y - cy; if (sx < -10 || sx > 650 || sy < -10 || sy > 370) continue; fr(c, r.purple ? '#e060ff' : '#ffd860', sx, sy, r.w, r.h); } c.globalAlpha = 1; }
    // season tint
    if (sea === 3) { c.fillStyle = 'rgba(200,220,255,0.06)'; c.fillRect(0, 0, 640, 360); }
    // numbers
    c.font = 'bold 8px monospace'; c.textAlign = 'center';
    for (let i = this.nums.length - 1; i >= 0; i--) { const n = this.nums[i]; n.y -= 0.4; n.life--; if (n.life <= 0) { this.nums.splice(i, 1); continue; } const sx = Math.round(n.x - cx), sy = Math.round(n.y - cy); c.globalAlpha = Math.min(1, n.life / 10); c.fillStyle = '#000'; c.fillText(n.v, sx + 1, sy + 1); c.fillStyle = n.col; c.fillText(n.v, sx, sy); } c.globalAlpha = 1;
    // divine beam & dim
    if (this.beam) { const b = this.beam; b.life--; const k = b.life / 46; const sx = b.x - cx, sy = b.y - cy; const gr = c.createLinearGradient(0, 0, 0, sy + 10); const col = b.out === 'fail' ? '160,160,200' : b.out === 'twist' ? '200,140,255' : '255,244,170'; gr.addColorStop(0, `rgba(${col},0)`); gr.addColorStop(1, `rgba(${col},${0.8 * k})`); c.fillStyle = gr; const w = 3 + 9 * Math.sin(Math.min(1, (1 - k) * 3) * 1.57); c.fillRect(sx - w, 0, w * 2, sy + 10); c.fillStyle = `rgba(255,255,255,${k * 0.7})`; c.fillRect(sx - 2, 0, 4, sy + 10); if (b.life <= 0) this.beam = null; }
    if (this.dim > 0) { c.fillStyle = `rgba(0,0,20,${this.dim})`; c.fillRect(0, 0, 640, 360); this.dim = Math.max(0, this.dim - 0.012); }
    if (this.flash > 0) { c.fillStyle = `rgba(255,255,255,${this.flash})`; c.fillRect(0, 0, 640, 360); this.flash = Math.max(0, this.flash - 0.03); }
    if (G.awakened && !G.ending) { const gr = c.createRadialGradient(320, 180, 120, 320, 180, 380); gr.addColorStop(0, 'rgba(60,0,80,0)'); gr.addColorStop(1, 'rgba(60,0,80,0.28)'); c.fillStyle = gr; c.fillRect(0, 0, 640, 360); }
    if (this.shake > 0) this.shake = Math.max(0, this.shake - 0.3);
  },
};
function pickEntityAt(wx, wy) {
  let best = null, bd = 12;
  for (const h of G.humans) { if (!h.alive || h.inside) continue; const dx = wx - (h.x * TS + 8), dy = wy - (h.y * TS + 2); const d = Math.hypot(dx, dy * 0.8); if (d < bd) { bd = d; best = h; } }
  return best;
}
/* minimap */
const Mini = {
  base: null,
  build() {
    const cv = mkCanvas(MW, MH), c = cv.getContext('2d');
    const col = { [T.GRASS]: '#58a840', [T.FLOWER]: '#58a840', [T.PATH]: '#c8aa78', [T.DOOR]: '#c8aa78', [T.PLAZA]: '#a8a8b0', [T.WATER]: '#2f6ec8', [T.SAND]: '#e0cc90', [T.FIELD]: '#8a6038', [T.DARK]: '#3a3446', [T.TREE]: '#2f6a2a', [T.ROCK]: '#7a7a86', [T.BLD]: '#b84a3a', [T.FENCE]: '#8a6a3a' };
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) fr(c, col[W.tiles[y * MW + x]] || '#000', x, y, 1, 1);
    W.blds.forEach(b => { const k = b.kind === 'castle' ? '#7a30a0' : b.kind === 'guild' ? '#e8c030' : b.kind === 'church' ? '#fff' : '#b84a3a'; fr(c, k, b.x, b.y, b.w, b.h); });
    this.base = cv;
  },
  draw(cv, camx, camy) {
    if (!this.base) this.build();
    const c = cv.getContext('2d'); const sx = cv.width / MW, sy = cv.height / MH;
    c.imageSmoothingEnabled = false; c.drawImage(this.base, 0, 0, MW, MH, 0, 0, cv.width, cv.height);
    for (const h of G.humans) if (h.alive && !h.inside) { c.fillStyle = h.id === Render.sel ? '#fff' : isAdv(h) ? '#60a8ff' : '#e0e8ff'; c.fillRect(h.x * sx, h.y * sy, 2, 2); }
    for (const m of G.monsters) if (m.alive && !m.dormant) { c.fillStyle = m.boss ? '#d040ff' : m.cad >= 0 ? '#ff80c0' : '#ff4040'; const s = m.boss || m.cad >= 0 ? 4 : 2; c.fillRect(m.x * sx - s / 2 + 1, m.y * sy - s / 2 + 1, s, s); }
    G.prayers.forEach(p => { if (p.state === 'open') { const h = hById(p.hid); if (h) { c.fillStyle = '#ffe060'; c.fillRect(h.x * sx - 1, h.y * sy - 1, 4, 4); } } });
    c.strokeStyle = '#fff'; c.lineWidth = 1; c.strokeRect(camx / TS * sx + 0.5, camy / TS * sy + 0.5, 640 / TS * sx, 360 / TS * sy);
    if (!G.awakened) { c.fillStyle = '#7a30a0'; c.fillRect(60 * sx, 13 * sy, 3, 3); }
  },
};

/* ---------- name labels (R1) ---------- */
const JOB_BADGE = { swordsman: ['剣', '劍', '#c04040'], mage: ['魔', '魔', '#6a4ac0'], priest: ['僧', '僧', '#9a9ab8'], thief: ['盗', '盜', '#3a6a40'], farmer: ['農', '農', '#a88850'], merchant: ['商', '商', '#c88a30'], smith: ['鍛', '鐵', '#7a7a86'], herbalist: ['薬', '藥', '#3a8a4a'], historian: ['史', '史', '#3a4a9a'] };
Render.heroId = 0; Render.labelFrame = 0;
Render.nameMode = function () {
  if (G && G.gen === 1 && G.tick < START_TICK + 3 * TICK_DAY && !G.flags.noAllNames) return 'all';
  if (Game.keys && Game.keys.n) return 'all';
  return (Game.settings && Game.settings.names) || 'key';
};
Render.drawLabels = function () {
  const cv = document.getElementById('labels'); if (!cv) return; const c = cv.getContext('2d'); c.clearRect(0, 0, 1280, 720);
  if (!G || (Game.scene !== 'play' && Game.scene !== 'ending')) return;
  const mode = this.nameMode(); const L = LANG === 'ja' ? 0 : 1;
  if ((this.labelFrame++ % 45) === 0) { const a = G.humans.filter(h => h.alive && isAdv(h)).sort((x, y) => advPower(y) - advPower(x))[0]; this.heroId = a ? a.id : 0; }
  const cam = this.cam, cx = Math.round(cam.x), cy = Math.round(cam.y);
  const prayers = {}; G.prayers.forEach(p => { if (p.state === 'open') prayers[p.hid] = p; });
  const bp = G.parties.find(p => p.boss && p.state !== 'done'); const bset = {}; if (bp) bp.members.forEach(i => bset[i] = 1);
  const list = [];
  for (const h of G.humans) {
    if (!h.alive || h.inside) continue;
    const x = lerp(h.px, h.x, 0.5), y = lerp(h.py, h.y, 0.5); const sx = (x * TS + 8 - cx) * 2, top = (y * TS - 8 - cy) * 2;
    if (sx < -40 || sx > 1320 || top < -30 || top > 740) continue;
    const s = soulOf(h); const fav = !!(s && s.fav);
    let pri = 0;
    if (h.id === this.sel || h.id === Game.hoverId || h.id === Game.flashId) pri = 6;
    else if (fav) pri = 5; else if (prayers[h.id]) pri = 4; else if (G.track.indexOf(h.id) >= 0 || G.spot.indexOf(h.id) >= 0) pri = 3;
    else if (h.id === this.heroId || bset[h.id]) pri = 2;
    list.push({ h, sx, top, pri, fav, pray: !!prayers[h.id] });
  }
  list.sort((a, b) => b.pri - a.pri || a.top - b.top);
  const fam = getComputedStyle(document.body).fontFamily;
  const placed = [];
  const hit = r => placed.some(p => r.x < p.x + p.w && r.x + r.w > p.x && r.y < p.y + p.h && r.y + r.h > p.y);
  c.textBaseline = 'middle'; c.textAlign = 'left';
  for (const it of list) {
    const h = it.h; const showName = mode === 'all' ? true : mode === 'none' ? it.pri >= 5 : it.pri > 0;
    const nm = (it.fav ? '★' : it.pray ? '！' : (G.track.indexOf(h.id) >= 0 ? '◆' : (it.pri === 2 && h.id === this.heroId ? '⚔' : ''))) + h.name[L];
    const bd = JOB_BADGE[h.job] || JOB_BADGE.farmer;
    if (showName) {
      c.font = 'bold 13px ' + fam; const w = Math.ceil(c.measureText(nm).width) + 18; const x0 = Math.round(it.sx - w / 2), y0 = Math.round(it.top - (it.pray ? 34 : 24));
      const r = { x: x0, y: y0 - 8, w: w, h: 16 };
      if (it.pri < 4 && hit(r)) { /* too crowded: fall back to badge */ } else {
        placed.push(r);
        const s = soulOf(h); const k = s ? s.k : null; let col = '#ffffff';
        if (k) { if (k.good - k.evil > 2.5) col = '#cfe6ff'; else if (k.evil - k.good > 2.5) col = '#ffcfcf'; }
        if (it.fav) col = '#ffd860'; if (it.pray) col = '#fff0a0';
        c.fillStyle = bd[2]; c.fillRect(x0, y0 - 7, 14, 14); c.fillStyle = '#fff'; c.font = 'bold 11px ' + fam; c.textAlign = 'center'; c.fillText(bd[L], x0 + 7, y0 + 0.5);
        c.textAlign = 'left'; c.font = 'bold 13px ' + fam; c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,.95)'; c.strokeText(nm, x0 + 17, y0 + 0.5); c.fillStyle = col; c.fillText(nm, x0 + 17, y0 + 0.5);
        continue;
      }
    }
    if (mode !== 'none' || it.pri > 0) {
      const r = { x: Math.round(it.sx) - 20, y: Math.round(it.top) - 15, w: 14, h: 14 };
      if (hit(r) && it.pri < 2) continue; placed.push(r);
      c.fillStyle = 'rgba(0,0,0,.85)'; c.fillRect(r.x - 1, r.y - 1, 16, 16); c.fillStyle = bd[2]; c.fillRect(r.x, r.y, 14, 14); c.fillStyle = '#fff'; c.font = 'bold 11px ' + fam; c.textAlign = 'center'; c.fillText(bd[L], r.x + 7, r.y + 7.5); c.textAlign = 'left';
    }
  }
};
