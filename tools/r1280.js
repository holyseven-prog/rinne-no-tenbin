/* 視覺總指示書 §2-2 / 2-3: the world is drawn on a real 1280x720 canvas. World logic stays in 16 px tiles; the renderer applies
   k = 2 * Z (camera zoom Z = 1 / 1.5 / 2) as a transform, so 1 tile = 32 screen px at Z = 1. One-shot patch of every 640x360 / "x 2" assumption. */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISS', f, a.slice(0, 80)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/head.html', [['<canvas id="game" width="640" height="360"></canvas>', '<canvas id="game" width="1280" height="720"></canvas>']]);
P('src/11_sprites.js', [
  ["  cam: { x: 0, y: 0 }, cv: null, c: null,", "  cam: { x: 0, y: 0 }, Z: 1, get k() { return 2 * this.Z; }, get VW() { return 640 / this.Z; }, get VH() { return 360 / this.Z; }, cv: null, c: null,"],
  ["  clampCam() { this.cam.x = clamp(this.cam.x, 0, MW * TS - 640); this.cam.y = clamp(this.cam.y, 0, MH * TS - 360); },", "  clampCam() { this.cam.x = clamp(this.cam.x, 0, MW * TS - this.VW); this.cam.y = clamp(this.cam.y, 0, MH * TS - this.VH); },"],
  ["  centerOn(tx, ty) { this.cam.x = tx * TS + 8 - 320; this.cam.y = ty * TS - 180; this.clampCam(); },", "  centerOn(tx, ty) { this.cam.x = tx * TS + 8 - this.VW / 2; this.cam.y = ty * TS - this.VH / 2; this.clampCam(); },\n  setZoom(z, sx, sy) { z = clamp(z, 1, 2); if (z === this.Z) return; sx = sx === undefined ? 640 : sx; sy = sy === undefined ? 360 : sy; const wx = this.cam.x + sx / this.k, wy = this.cam.y + sy / this.k; this.Z = z; this.cam.x = wx - sx / this.k; this.cam.y = wy - sy / this.k; this.clampCam(); },"],
  ["    c.setTransform(1, 0, 0, 1, 0, 0);\n    c.drawImage(getWorldCanvas(sea), cx, cy, 640, 360, 0, 0, 640, 360);", "    c.setTransform(this.k, 0, 0, this.k, 0, 0); c.imageSmoothingEnabled = false; // 1280x720 canvas, world units x k\n    c.drawImage(getWorldCanvas(sea), cx, cy, this.VW, this.VH, 0, 0, this.VW, this.VH);"],
  ["const sx = (x * TS + 8 - cx) * 2, top = (y * TS - 8 - cy) * 2;", "const sx = (x * TS + 8 - cx) * Render.k, top = (y * TS - 8 - cy) * Render.k;"],
  ["const mxw = Game.mouseCanvas ? Game.mouse.x / 2 + cam.x : -999, myw = Game.mouseCanvas ? Game.mouse.y / 2 + cam.y : -999;", "const mxw = Game.mouseCanvas ? Game.mouse.x / Render.k + cam.x : -999, myw = Game.mouseCanvas ? Game.mouse.y / Render.k + cam.y : -999;"],
  ["const lab = (txt, wx, wy, col) => { const sx = (wx - cx) * 2, sy = (wy - cy) * 2;", "const lab = (txt, wx, wy, col) => { const sx = (wx - cx) * Render.k, sy = (wy - cy) * Render.k;"],
]);
P('src/15_main.js', [
  ["if (sc === 'boot') { c.fillStyle = '#000'; c.fillRect(0, 0, 640, 360); return; }", "if (sc === 'boot') { c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#000'; c.fillRect(0, 0, 1280, 720); return; }"],
  ["Render.cam.x += (e.x * TS + 8 - 320 - Render.cam.x) * Math.min(1, dt * 5); Render.cam.y += (e.y * TS - 180 - Render.ca", "Render.cam.x += (e.x * TS + 8 - Render.VW / 2 - Render.cam.x) * Math.min(1, dt * 5); Render.cam.y += (e.y * TS - Render.VH / 2 - Render.ca"],
  ["const wx = Render.cam.x + this.mouse.x / 2, wy = Render.cam.y + this.mouse.y / 2;", "const wx = Render.cam.x + this.mouse.x / Render.k, wy = Render.cam.y + this.mouse.y / Render.k;"],
  ["const wx = Render.cam.x + p.x / 2, wy = Render.cam.y + p.y / 2;", "const wx = Render.cam.x + p.x / Render.k, wy = Render.cam.y + p.y / Render.k;"],
  ["Render.cam.x = d.cx - dx / 2; Render.cam.y = d.cy - dy / 2;", "Render.cam.x = d.cx - dx / Render.k; Render.cam.y = d.cy - dy / Render.k;"],
  // wheel: mouse notches zoom (x1 / x1.5 / x2, at the cursor), small trackpad deltas keep panning
  ["e.preventDefault(); Render.cam.x += e.deltaX / 2; Render.cam.y += e.deltaY / 2;", "e.preventDefault(); if (Math.abs(e.deltaY) >= 40 && Math.abs(e.deltaX) < 4) { const p = Scale.toStage(e); const zs = [1, 1.5, 2]; const i = zs.indexOf(Render.Z); Render.setZoom(zs[clamp((i < 0 ? 0 : i) + (e.deltaY < 0 ? 1 : -1), 0, 2)], p.x, p.y); return; } Render.cam.x += e.deltaX / Render.k; Render.cam.y += e.deltaY / Render.k;"],
]);
P('src/16b_tutorial41.js', [["const wx = (ev.clientX - sr.left) / s / 2 + Render.cam.x, w", "const wx = (ev.clientX - sr.left) / s / Render.k + Render.cam.x, w"]]);
let t = fs.readFileSync('src/16b_tutorial41.js', 'utf8'); t = t.replace(/(ev\.clientY - sr\.top\) \/ s) \/ 2 \+ Render\.cam\.y/, '$1 / Render.k + Render.cam.y'); fs.writeFileSync('src/16b_tutorial41.js', t);
P('src/11e3_ruins.js', [["c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.font = 'bold 9px sans-serif';", "c.save(); c.setTransform(Render.k, 0, 0, Render.k, 0, 0); c.font = 'bold 9px sans-serif';"], ["c.save(); c.setTransform(1, 0, 0, 1, 0, 0);\n  for (const h of G.humans)", "c.save(); c.setTransform(Render.k, 0, 0, Render.k, 0, 0);\n  for (const h of G.humans)"]]);
P('src/14_screens.js', [["const T0 = o.t++; c.setTransform(1, 0, 0, 1, 0, 0);", "const T0 = o.t++; c.setTransform(2, 0, 0, 2, 0, 0);"]]);
P('src/14d_title_art.js', [["c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(PARA.L.sky, 0, 0);", "c.setTransform(2, 0, 0, 2, 0, 0); c.drawImage(PARA.L.sky, 0, 0);"]]);
console.log('ok');
