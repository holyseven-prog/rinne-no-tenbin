/* ================= title / god-select art (V3.3 S5): multi-layer parallax sky + temple, god emblems with halos ================= */
function gell(g, ch, cx, cy, rx, ry) { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry + 0.0001)))); for (let x = -w; x <= w; x++) gpx(g, ch, cx + x, cy + y); } }
const PARA = { ready: false, L: {}, stars: [] };
function buildParallax() {
  if (PARA.ready) return; PARA.ready = true; const rg = new RNG(9001);
  // sky: banded gradient with dither
  const sky = mkCanvas(640, 360), s = sky.getContext('2d'); const kf = [[0, [5, 6, 26]], [0.35, [14, 10, 52]], [0.62, [44, 22, 86]], [0.78, [120, 56, 112]], [0.9, [200, 120, 130]], [1, [40, 24, 60]]];
  const col = k => { for (let i = 1; i < kf.length; i++) if (k <= kf[i][0]) { const a = kf[i - 1], b = kf[i], u = (k - a[0]) / (b[0] - a[0]); return a[1].map((v, j) => v + (b[1][j] - v) * u); } return kf[kf.length - 1][1]; };
  for (let y = 0; y < 360; y += 4) { const c0 = col(y / 300); const c1 = col((y + 4) / 300); s.fillStyle = rgbHex(...c0); s.fillRect(0, y, 640, 4); if (y % 8 === 0) { s.fillStyle = rgbHex(...c1); for (let x = (y / 4) % 2 * 2; x < 640; x += 4) s.fillRect(x, y + 3, 2, 1); } }
  PARA.L.sky = sky;
  for (let i = 0; i < 110; i++) PARA.stars.push({ x: rg.int(0, 639), y: rg.int(0, 230), p: rg.range(0, 6.28), s: rg.chance(0.15) ? 2 : 1, c: rg.pick(['#ffffff', '#cfd8ff', '#ffe8c0']) });
  // clouds
  const cloudLayer = (w, h, n, base, rim, shade, ymin, ymax, sc) => { const cv = mkCanvas(w, h), c = cv.getContext('2d'); for (let i = 0; i < n; i++) { const cx = rg.int(0, w - 1), cy = rg.int(ymin, ymax), parts = rg.int(3, 6); const blobs = []; for (let k = 0; k < parts; k++) blobs.push([cx + (k - parts / 2) * 14 * sc + rg.int(-4, 4), cy + rg.int(-4, 3), rg.int(10, 20) * sc, rg.int(5, 9) * sc]); [-w, 0, w].forEach(off => { blobs.forEach(b => { ell(c, shade, b[0] + off, b[1] + 3, b[2], b[3]); }); blobs.forEach(b => { ell(c, base, b[0] + off, b[1], b[2], b[3]); }); blobs.forEach(b => { ell(c, rim, b[0] + off - 2, b[1] - Math.round(b[3] * 0.45), Math.round(b[2] * 0.7), Math.max(1, Math.round(b[3] * 0.35))); }); }); } return cv; };
  PARA.L.far = cloudLayer(1280, 360, 8, '#2c2260', '#4a3c88', '#1c1648', 120, 180, 1);
  PARA.L.mid = cloudLayer(1280, 360, 7, '#3e3078', '#6a58b0', '#2a2058', 170, 225, 1.3);
  PARA.L.near = cloudLayer(1280, 360, 6, '#54448c', '#9a88d0', '#38306a', 230, 290, 1.7);
  // temple on a floating rock
  const tp = mkCanvas(220, 150), t = tp.getContext('2d'); const R0 = '#120e2c', R1 = '#2a2260', R2 = '#4a3e90';
  ell(t, R0, 110, 128, 100, 18); for (let i = 0; i < 30; i++) { const w = 96 - i * 3; if (w < 6) break; fr(t, R0, 110 - w, 116 + i, w * 2, 1); } fr(t, R1, 22, 116, 4, 2);
  fr(t, R0, 26, 104, 168, 14); fr(t, R1, 26, 104, 168, 1); fr(t, R0, 34, 96, 152, 8); fr(t, R1, 34, 96, 152, 1);
  for (let i = 0; i < 8; i++) { const x = 42 + i * 18; fr(t, R0, x, 50, 10, 46); fr(t, R1, x, 50, 2, 46); fr(t, R2, x, 50, 1, 46); fr(t, R0, x - 2, 46, 14, 5); fr(t, R0, x - 2, 94, 14, 4); }
  fr(t, R0, 34, 38, 152, 8); for (let r = 0; r < 28; r++) { const w = 76 - Math.round(r * 2.6); if (w <= 2) break; fr(t, R0, 110 - w, 38 - r, w * 2, 1); } fr(t, R1, 34, 38, 152, 1);
  ell(t, R0, 110, 10, 16, 14); fr(t, R0, 94, 10, 32, 12); fr(t, R1, 94, 2, 3, 8); fr(t, '#ffe8a0', 108, 56, 4, 40); fr(t, '#fff6d0', 109, 56, 2, 40); // glowing doorway
  PARA.L.temple = tp;
  // foreground hills + tree silhouettes
  const fg = mkCanvas(1280, 160), f = fg.getContext('2d');
  for (let x = 0; x < 1280; x++) { const h = 36 + Math.sin(x / 90) * 12 + Math.sin(x / 31) * 4; fr(f, '#0a081c', x, 160 - h, 1, h); } for (let x = 0; x < 1280; x++) { const h = 20 + Math.sin(x / 60 + 2) * 8 + Math.sin(x / 17) * 3; fr(f, '#06050f', x, 160 - h, 1, h); }
  for (let i = 0; i < 46; i++) { const x = rg.int(0, 1279), h = rg.int(16, 34); const y = 160 - 30 - Math.round(Math.sin(x / 90) * 12); for (let r = 0; r < h; r++) { const w = Math.round(r * 0.32) + 1; fr(f, '#06050f', x - w, y - h + r + 6, w * 2 + 1, 1); } fr(f, '#06050f', x - 1, y + 4, 2, 6); }
  PARA.L.fg = fg;
  PARA.fire = []; for (let i = 0; i < 26; i++) PARA.fire.push({ x: rg.range(0, 640), y: rg.range(230, 350), p: rg.range(0, 6.28), v: rg.range(0.2, 0.7) });
}
function drawParallax(c, ms) {
  buildParallax(); const t = ms / 1000; const mx = (typeof Game !== 'undefined' && Game.mouse ? (Game.mouse.x - 640) / 640 : 0), my = (typeof Game !== 'undefined' && Game.mouse ? (Game.mouse.y - 360) / 360 : 0);
  c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(PARA.L.sky, 0, 0);
  PARA.stars.forEach(s => { const a = 0.45 + 0.55 * Math.sin(t * 1.4 + s.p); c.globalAlpha = Math.max(0.1, a); fr(c, s.c, Math.round(s.x - mx * 2), Math.round(s.y - my), s.s, s.s); if (s.s === 2) { fr(c, s.c, Math.round(s.x - mx * 2) - 1, Math.round(s.y - my) + 0, 1, 1); } }); c.globalAlpha = 1;
  const sh = (t * 0.18) % 1; if (sh < 0.12) { const k = sh / 0.12; const sx = 520 - k * 160, sy = 40 + k * 70; c.globalAlpha = 1 - k; pxLine(c, '#ffffff', sx, sy, sx + 14, sy - 8, 1); pxLine(c, '#a8c0ff', sx + 14, sy - 8, sx + 28, sy - 16, 1); c.globalAlpha = 1; }
  // moon + halo
  const mxp = 470 - mx * 4, myp = 70 - my * 3; for (let r = 46; r > 26; r -= 4) { c.globalAlpha = 0.05; ell(c, '#a8b8ff', mxp, myp, r, r); } c.globalAlpha = 1; ell(c, '#c8d0f0', mxp, myp, 27, 27); ell(c, '#eef2ff', mxp - 1, myp - 1, 25, 25); ell(c, '#fff', mxp - 6, myp - 6, 12, 12); ell(c, '#d4daf4', mxp + 6, myp + 4, 5, 4); ell(c, '#d4daf4', mxp - 8, myp + 8, 4, 3); ell(c, '#d4daf4', mxp + 10, myp - 8, 3, 3);
  const cl = (img, spd, off, y) => { const x = -((t * spd - mx * off) % 1280 + 1280) % 1280; c.drawImage(img, Math.round(x), y); c.drawImage(img, Math.round(x) + 1280, y); };
  cl(PARA.L.far, 4, 2, -my * 2);
  // temple (floating, gentle bob) with god rays
  const bob = Math.round(Math.sin(t * 0.7) * 3); const tx = 210 - mx * 6, ty = 110 + bob - my * 4;
  c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { const a = 0.05 + 0.03 * Math.sin(t * 0.9 + i); c.fillStyle = `rgba(255,220,150,${a})`; c.beginPath(); c.moveTo(tx + 110 + (i - 2) * 6, ty + 60); c.lineTo(tx + 110 + (i - 2) * 70, 0); c.lineTo(tx + 110 + (i - 2) * 70 + 34, 0); c.lineTo(tx + 110 + (i - 2) * 6 + 6, ty + 60); c.closePath(); c.fill(); } c.globalCompositeOperation = 'source-over';
  c.drawImage(PARA.L.temple, Math.round(tx), Math.round(ty));
  cl(PARA.L.mid, 9, 5, -my * 4); cl(PARA.L.near, 16, 9, -my * 6);
  c.drawImage(PARA.L.fg, Math.round(-mx * 14 - 20), 230 - Math.round(my * 3), 1280, 160);
  PARA.fire.forEach(f => { f.y -= f.v * 0.25; f.x += Math.sin(t + f.p) * 0.25; if (f.y < 220) { f.y = 350; } c.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + f.p)); fr(c, '#ffe880', Math.round(f.x), Math.round(f.y), 1, 1); c.globalAlpha = 0.2; fr(c, '#ffe880', Math.round(f.x) - 1, Math.round(f.y) - 1, 3, 3); }); c.globalAlpha = 1;
}
/* ---------- god emblems (66x66, halo + 3-tone symbol) ---------- */
function drawEmblem(cv, id) {
  const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.clearRect(0, 0, 66, 66);
  const pal = { mercy: ['#2a1040', '#ff9ab8', '#ffe8f0'], order: ['#10204a', '#ffd860', '#fff4c0'], chaos: ['#1a0a30', '#b060ff', '#e8c0ff'] }[id] || ['#10204a', '#fff', '#fff'];
  const g0 = c.createRadialGradient(33, 33, 4, 33, 33, 34); g0.addColorStop(0, pal[0]); g0.addColorStop(1, '#05061a'); c.fillStyle = g0; c.fillRect(0, 0, 66, 66);
  for (let r = 30; r > 8; r -= 3) { c.globalAlpha = 0.07; ell(c, pal[1], 33, 33, r, r); } c.globalAlpha = 1;
  for (let i = 0; i < 18; i++) { const a = i * 0.349 + 0.2; const x = 33 + Math.cos(a) * 29, y = 33 + Math.sin(a) * 29; fr(c, i % 2 ? pal[2] : pal[1], Math.round(x), Math.round(y), 1, 1); }
  const g = emptyGrid(64, 64); let ramps;
  if (id === 'mercy') {
    ramps = { c: mkRamp('#f6f6ff'), t: mkRamp('#ff6a8e'), g: mkRamp('#ffd860'), u: mkRamp('#d8d8f0') };
    [[14, 30, 11, 5], [11, 37, 9, 4], [17, 23, 9, 4], [20, 17, 6, 3]].forEach(w => { gell(g, 'c', w[0], w[1], w[2], w[3]); }); [[16, 27], [13, 34], [18, 20]].forEach(p => gpx(g, 'u', p[0], p[1]));
    gell(g, 't', 26, 27, 6, 6); gell(g, 't', 38, 27, 6, 6); for (let r = 0; r < 14; r++) { const w = 12 - r; if (w <= 0) break; for (let x = -w; x <= w; x++) gpx(g, 't', 32 + x, 30 + r); }
    gell(g, 'g', 32, 11, 11, 3); gell(g, '.', 32, 11, 8, 1); mirrorLR(g);
  } else if (id === 'order') {
    ramps = { g: mkRamp('#ffd860'), c: mkRamp('#fff4c0'), t: mkRamp('#7ab0ff'), u: mkRamp('#c8941a'), m: mkRamp('#c8d0e8') };
    rbox(g, 'g', 30, 14, 4, 38); gell(g, 'g', 32, 55, 14, 3); rbox(g, 'u', 22, 52, 20, 2, true); gell(g, 'g', 32, 10, 4, 4); gpx(g, 'c', 31, 9); gpx(g, 'c', 32, 9);
    rbox(g, 'g', 8, 18, 48, 3); gell(g, 'g', 8, 19, 2, 2); gell(g, 'g', 55, 19, 2, 2);
    gline(g, 'm', 9, 21, 3, 38, 1); gline(g, 'm', 9, 21, 15, 38, 1); gline(g, 'm', 55, 21, 49, 38, 1); gline(g, 'm', 55, 21, 61, 38, 1);
    [[9, 40], [55, 40]].forEach(p => { gell(g, 'g', p[0], p[1], 8, 4); gell(g, '.', p[0], p[1] - 3, 8, 3); rbox(g, 'g', p[0] - 8, p[1] - 1, 17, 2, true); });
    gell(g, 'c', 9, 34, 4, 4); gell(g, 't', 55, 34, 4, 4); gell(g, '.', 57, 33, 3, 3); gell(g, 't', 57, 34, 3, 3);
  } else {
    ramps = { t: mkRamp('#a050ff'), g: mkRamp('#e0b0ff'), c: mkRamp('#fff'), u: mkRamp('#5a20a0'), m: mkRamp('#ffe060') };
    for (let a = 0; a < 6.28 * 2.2; a += 0.05) { const r = a * 2.3; gell(g, 't', Math.round(32 + Math.cos(a) * r * 0.9), Math.round(32 + Math.sin(a) * r * 0.9), 2, 2); }
    gell(g, 'g', 32, 32, 7, 7); gell(g, 'c', 32, 32, 5, 5); gell(g, 'u', 32, 32, 2, 3);
    [[44, 8], [47, 14], [41, 18], [45, 24], [38, 30]].forEach((p, i, a) => { if (i) gline(g, 'm', a[i - 1][0], a[i - 1][1], p[0], p[1], 2); });
  }
  const bk = bakeGrid(g, 64, 64, ramps); c.drawImage(bk, 1, 1);
}
