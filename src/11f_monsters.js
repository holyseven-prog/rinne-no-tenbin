/* ================= monsters, cadres and the demon lord as pixel maps (V3.3 S2) ================= */
Object.assign(FIXED_COL, { V: '#d860ff', Z: '#8a34c8', I: '#e8e4d4', H: '#ffe8a0' });
const MON_RAMPS = {
  mush: { c: '#d84848', u: '#a02c3c', t: '#f2e8d0', h: '#e8c060' },
  bat: { c: '#6a46a0', u: '#3e2a66', t: '#8a64c0', h: '#e8c060' },
  turtle: { c: '#5e8450', u: '#3e5c3c', t: '#b4bc84', h: '#d8c070' },
  goblin: { c: '#5ea43c', u: '#7a4a2a', t: '#9a6a3a', h: '#e8c060', m: '#b8bcc8', w: '#8a5a30' },
  skel: { c: '#e4e0d0', u: '#a8a490', t: '#8a5a30', h: '#6a6a7a', m: '#e4e0d0' },
  wolf: { c: '#7e7e90', u: '#56566a', t: '#aeaec0', h: '#e8e0d0' },
  cad0: { c: '#5a3a90', u: '#33205c', t: '#9a70e0', h: '#d8c0ff', w: '#6a4a2a' },
  cad1: { c: '#dcd8c8', u: '#9a9684', t: '#6a6a7e', h: '#d0a840', m: '#c4c8d4', w: '#5a3a22' },
  cad2: { c: '#2e2540', u: '#16101e', t: '#5a2a6a', h: '#ff60c0' },
  boss: { c: '#3e3860', u: '#241e40', t: '#6a5a9c', h: '#e8c030', m: '#e0dcee', w: '#5a3a22', g: '#e8c030', a: '#8a30c0' },
};
function monRamps(k) { const o = MON_RAMPS[k]; const R = {}; for (const ch in o) R[ch] = mkRamp(o[ch]); return R; }
function rbox(g, ch, x, y, w, h, sq) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const corner = (i === 0 || i === w - 1) && (j === 0 || j === h - 1); if (corner && !sq && w > 2 && h > 2) continue; const xx = x + i, yy = y + j; if (yy >= 0 && yy < g.length && xx >= 0 && xx < g[0].length) g[yy][xx] = ch; } }
function gpx(g, ch, x, y) { if (y >= 0 && y < g.length && x >= 0 && x < g[0].length) g[y][x] = ch; }
function gline(g, ch, x0, y0, x1, y1, th) { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); for (let a = 0; a < (th || 1); a++) gpx(g, ch, x + a, y); } }
function mirrorLR(g) { const W_ = g[0].length; for (let y = 0; y < g.length; y++) for (let x = 0; x < W_ >> 1; x++) { const m = W_ - 1 - x; if (g[y][x] !== '.' && g[y][m] === '.') g[y][m] = g[y][x]; } }
function monsterGrid(type, f) {
  const g = emptyGrid(16, 16);
  switch (type) {
    case 'mush': {
      rbox(g, 'c', 2, 2, 12, 6); rbox(g, 'u', 3, 7, 10, 2, true); rbox(g, 't', 5, 8, 6, 6);
      [[4, 3], [9, 4], [7, 2], [11, 5]].forEach(p => gpx(g, 'W', p[0], p[1])); gpx(g, 'e', 6, 10); gpx(g, 'e', 9, 10);
      if (f === 2) { rbox(g, 'Q', 6, 12, 4, 1, true); }
      rbox(g, 't', f ? 4 : 3, 13, 3, 2); rbox(g, 't', f ? 9 : 10, 13, 3, 2); break; }
    case 'bat': {
      rbox(g, 'c', 6, 6, 4, 5); gpx(g, 'c', 6, 5); gpx(g, 'c', 9, 5); gpx(g, 'Q', 6, 7); gpx(g, 'Q', 9, 7); gpx(g, 'W', 7, 10); gpx(g, 'W', 8, 10);
      if (f === 0) { gline(g, 'c', 5, 7, 0, 3, 2); gline(g, 'c', 10, 7, 15, 3, 2); gline(g, 'u', 5, 8, 1, 6, 1); gline(g, 'u', 10, 8, 14, 6, 1); rbox(g, 'c', 1, 4, 4, 4); rbox(g, 'c', 11, 4, 4, 4); }
      else { rbox(g, 'c', 0, 8, 6, 4); rbox(g, 'c', 10, 8, 6, 4); gline(g, 'u', 5, 8, 1, 12, 1); gline(g, 'u', 10, 8, 14, 12, 1); }
      if (f === 2) { rbox(g, 'Q', 7, 9, 2, 2, true); }
      break; }
    case 'goblin': {
      rbox(g, 'c', 4, 2, 8, 7); rbox(g, 'c', 1, 4, 3, 2); rbox(g, 'c', 12, 4, 3, 2); gpx(g, 'Y', 5, 5); gpx(g, 'Y', 9, 5); gpx(g, 'e', 6, 5); gpx(g, 'e', 10, 5); rbox(g, 'W', 6, 8, 4, 1, true);
      rbox(g, 'u', 4, 9, 8, 4); rbox(g, 'h', 4, 11, 8, 1, true); rbox(g, 'c', f ? 5 : 4, 13, 3, 2); rbox(g, 'c', f ? 9 : 10, 13, 3, 2);
      const sy = f === 2 ? 1 : 4; rbox(g, 'w', 14, sy + 2, 1, 8, true); rbox(g, 'm', 13, sy, 3, 3); break; }
    case 'skel': {
      rbox(g, 'm', 4, 1, 8, 7); rbox(g, 'e', 5, 3, 2, 2, true); rbox(g, 'e', 9, 3, 2, 2, true); gpx(g, 'e', 7, 5); gpx(g, 'e', 8, 5); [6, 8, 10].forEach(x => gpx(g, 'e', x, 7)); gpx(g, 'e', 7, 6);
      rbox(g, 'm', 7, 8, 2, 1, true); rbox(g, 'm', 4, 9, 8, 1, true); [10, 12].forEach(y => { rbox(g, 'm', 4, y, 8, 1, true); }); rbox(g, 'm', 7, 9, 2, 5, true); gpx(g, 'e', 6, 10); gpx(g, 'e', 9, 10); gpx(g, 'e', 6, 12); gpx(g, 'e', 9, 12);
      rbox(g, 'm', 2, 9, 1, 5, true); rbox(g, 'm', 13, 9, 1, 4, true); rbox(g, 'm', f ? 5 : 4, 14, 2, 2, true); rbox(g, 'm', f ? 9 : 10, 14, 2, 2, true);
      const sy = f === 2 ? 0 : 3; rbox(g, 'm', 14, sy, 1, 9, true); rbox(g, 't', 13, sy + 9, 3, 1, true); rbox(g, 't', 14, sy + 10, 1, 2, true); break; }
    case 'turtle': {
      rbox(g, 'u', 2, 4, 11, 8); rbox(g, 'c', 3, 4, 9, 6); [[5, 5], [8, 6], [10, 5], [4, 8]].forEach(p => rbox(g, 'u', p[0], p[1], 2, 1, true)); rbox(g, 'h', 4, 5, 2, 1, true);
      rbox(g, 't', 12, 6, 4, 4); gpx(g, 'e', 14, 7); if (f === 2) rbox(g, 'Q', 13, 9, 3, 1, true);
      rbox(g, 't', f ? 3 : 2, 12, 3, 3); rbox(g, 't', f ? 9 : 10, 12, 3, 3); rbox(g, 't', 0, 8, 2, 2); break; }
    case 'wolf': {
      rbox(g, 'c', 2, 6, 10, 6); rbox(g, 'c', 10, 3, 5, 5); rbox(g, 't', 13, 5, 3, 3); gpx(g, 'Q', 12, 4); gpx(g, 'e', 15, 5); rbox(g, 'u', 10, 1, 2, 3, true); rbox(g, 'u', 13, 2, 2, 2, true);
      rbox(g, 't', 3, 10, 7, 2, true); rbox(g, 'u', 0, 4, 3, 3); gpx(g, 'u', 0, 3);
      const lx = f ? [3, 5, 8, 10] : [2, 6, 7, 11]; lx.forEach((x, i) => rbox(g, 'u', x, 11, 2, 4, true)); if (f === 2) { rbox(g, 'W', 13, 8, 3, 1, true); }
      break; }
  }
  return g;
}
function bossGrid(f) {
  const W_ = 40, H_ = 48; const g = emptyGrid(W_, H_);
  rbox(g, 'u', 2, 14, 18, 32); gline(g, 'u', 1, 26, 3, 44, 2); [3, 7, 11, 15].forEach((x, i) => { gpx(g, '.', x, 45 - (i % 2)); gpx(g, '.', x, 46); });
  rbox(g, 'c', 11, 37, 8, 8); rbox(g, 'g', 9, 44, 11, 3); rbox(g, 'c', 7, 19, 13, 17); rbox(g, 't', 9, 21, 11, 7); rbox(g, 'V', 15, 22, 5, 5); gpx(g, 'W', 17, 23); rbox(g, 'g', 7, 33, 13, 2, true); rbox(g, 't', 9, 29, 10, 3);
  rbox(g, 'g', 0, 16, 10, 8); gline(g, 'g', 2, 14, 1, 9, 1); gline(g, 'g', 3, 14, 3, 10, 1); rbox(g, 'c', 1, 24, 6, 11); rbox(g, 't', 1, 35, 6, 5);
  rbox(g, 'm', 10, 5, 10, 11); rbox(g, 'X', 11, 9, 4, 3, true); rbox(g, 'V', 12, 9, 2, 2, true); rbox(g, 'X', 17, 12, 3, 3, true); rbox(g, 'm', 11, 15, 9, 3); [12, 14, 16, 18].forEach(x => gpx(g, 'X', x, 16));
  gline(g, 't', 9, 7, 5, 3, 2); gline(g, 't', 5, 3, 3, -1, 2); gline(g, 't', 8, 10, 4, 8, 2);
  rbox(g, 'g', 9, 2, 11, 4); gpx(g, 'g', 10, 0); gpx(g, 'g', 10, 1); gpx(g, 'g', 14, 0); gpx(g, 'g', 14, 1); gpx(g, 'g', 18, 0); gpx(g, 'g', 18, 1); gpx(g, 'V', 14, 3);
  if (f) { gpx(g, 'W', 12, 9); }
  mirrorLR(g);
  for (let y = 5; y < 37; y++) { gpx(g, 'I', 36, y); gpx(g, 'm', 35, y); gpx(g, 'm', 37, y); } gpx(g, 'W', 36, 4); gpx(g, 'W', 36, 3);
  rbox(g, 'g', 33, 37, 7, 2, true); rbox(g, 'w', 35, 39, 3, 5, true); gpx(g, 'V', 36, 38);
  return { g, W_, H_ };
}
function cadreGrid(k, f) {
  const W_ = 28, H_ = 36; const g = emptyGrid(W_, H_);
  if (k === 0) { // wraith mage
    rbox(g, 'c', 4, 12, 10, 18); rbox(g, 'c', 5, 2, 9, 11); rbox(g, 'u', 7, 5, 7, 6); gpx(g, 'V', 8, 7); gpx(g, 'V', 9, 7); gpx(g, 'V', 8, 8); gpx(g, 'W', 8, 7);
    rbox(g, 'u', 2, 16, 3, 8); rbox(g, 't', 6, 14, 8, 2, true); for (let x = 2; x < 14; x++) { const l = 30 + ((x + f) % 3); rbox(g, x % 2 ? 'c' : 'u', x, 29, 1, l - 29 + 1, true); }
    rbox(g, 'c', 3, 24, 11, 6); mirrorLR(g);
    rbox(g, 'w', 24, 6, 1, 28, true); rbox(g, 'V', 22, 2, 5, 5); gpx(g, 'W', 24, 3); gpx(g, 'V', 20, 8 + f); gpx(g, 'V', 27, 12 - f);
  } else if (k === 1) { // bone knight
    rbox(g, 't', 6, 1, 8, 9); rbox(g, 'X', 8, 5, 6, 2, true); gpx(g, 'V', 9, 5); rbox(g, 'h', 10, 0, 4, 2);
    rbox(g, 'c', 7, 10, 7, 2); rbox(g, 't', 3, 12, 11, 11); rbox(g, 'c', 6, 14, 8, 5); [15, 17].forEach(y => rbox(g, 'X', 7, y, 6, 1, true)); rbox(g, 'h', 1, 12, 5, 4); rbox(g, 'c', 1, 16, 3, 9); rbox(g, 'c', 2, 25, 3, 2);
    rbox(g, 'c', 6, 23, 3, 10); rbox(g, 'c', f ? 5 : 6, 33, 4, 2); rbox(g, 'h', 4, 22, 10, 2, true); mirrorLR(g);
    const sy = f ? 1 : 3; for (let y = sy; y < sy + 27; y++) { gpx(g, 'I', 25, y); gpx(g, 'm', 24, y); } rbox(g, 'h', 22, sy + 27, 6, 2, true); rbox(g, 'w', 24, sy + 29, 2, 5, true);
  } else { // shadow beast
    rbox(g, 'c', 2, 12, 12, 16); rbox(g, 'c', 4, 4, 10, 10); gpx(g, 'c', 3, 2); gpx(g, 'c', 4, 2); gpx(g, 'c', 3, 1); gpx(g, 'c', 3, 0); rbox(g, 't', 3, 18, 4, 6); rbox(g, 'h', 6, 7, 3, 3); gpx(g, 'W', 6, 7);
    rbox(g, 'h', 5, 11, 9, 2, true); [6, 8, 10, 12].forEach(x => gpx(g, 'W', x, 11)); rbox(g, 't', 0, 14, 3, 8); rbox(g, 'u', 2, 28, 4, 6); rbox(g, 'u', f ? 8 : 9, 28, 4, 6); [3, 7, 11].forEach(x => { gpx(g, 'W', x, 34); gpx(g, 'W', x + 1, 34); });
    mirrorLR(g); for (let i = 0; i < 4; i++) gpx(g, 't', 6 + i * 4, 1 + ((i + f) % 2) * 2);
  }
  return { g, W_, H_ };
}
function monsterSprite(m, frame) {
  const key = 'm.' + (m.boss ? 'boss' : m.cad >= 0 ? 'cad' + m.cad : m.type) + '.' + frame; if (spriteCache[key]) return spriteCache[key];
  let cv;
  if (m.boss) { const o = bossGrid(frame & 1); cv = bakeGrid(o.g, o.W_, o.H_, monRamps('boss')); }
  else if (m.cad >= 0) { const o = cadreGrid(m.cad, frame & 1); cv = bakeGrid(o.g, o.W_, o.H_, monRamps('cad' + m.cad)); }
  else { cv = bakeGrid(monsterGrid(m.type, frame), 16, 16, monRamps(MON_RAMPS[m.type] ? m.type : 'mush')); }
  spriteCache[key] = cv; return cv;
}
