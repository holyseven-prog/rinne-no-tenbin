/* ================= animation, lighting, weather, divine effects (V3.3 S3/S4/S6) ================= */
function pxLine(c, col, x0, y0, x1, y1, th) { x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let err = dx + dy; c.fillStyle = col; for (let i = 0; i < 400; i++) { c.fillRect(x0, y0, th || 1, th || 1); if (x0 === x1 && y0 === y1) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } } }
Render.drawWaterAnim = function (c, cx, cy, sea) {
  const fm = (this.time >> 4) & 3; const tx0 = Math.floor(cx / TS), ty0 = Math.floor(cy / TS);
  for (let ty = ty0; ty <= ty0 + 23 && ty < MH; ty++) for (let tx = tx0; tx <= tx0 + 40 && tx < MW; tx++) if (W.tiles[ty * MW + tx] === T.WATER) c.drawImage(waterTile(sea, fm, waterMask(tx, ty), tx, ty), tx * TS - cx, ty * TS - cy);
};
Render.drawAnimProps = function (c, cx, cy, sea, dark) {
  const t = this.time;
  for (const ch of CHIMS) { const sx = ch.x - cx, sy = ch.y - cy; if (sx < -20 || sx > 660 || sy < -30 || sy > 380) continue; const n = ch.big ? 5 : 3; for (let i = 0; i < n; i++) { const p = ((t + i * 18 + ch.x * 3) % 72) / 72; const px = sx + Math.sin(p * 5 + i) * 1.5 + p * 5, py = sy - p * (ch.big ? 22 : 16); const s = Math.round(2 + p * 3); c.globalAlpha = (1 - p) * (ch.big ? 0.75 : 0.55); fr(c, sea === 3 ? '#fff' : (dark > 0.3 ? '#c8c8e0' : '#ececf4'), Math.round(px - s / 2), Math.round(py - s / 2), s, s); fr(c, '#b8b8d0', Math.round(px - s / 2), Math.round(py + s / 2 - 1), s, 1); } c.globalAlpha = 1; if (ch.big) { const fl = (t >> 2) & 1; fr(c, fl ? '#ffb040' : '#ff8a30', sx - 1, sy + 2, 3, 1); } }
  for (const f of FLAGS) { const sx = f.x - cx, sy = f.y - cy; if (sx < -20 || sx > 660 || sy < -20 || sy > 380) continue; const ph = (t >> 3) % 4; for (let i = 0; i < 7; i++) { const w = Math.round(Math.sin((i + ph * 1.6) * 0.9) * 1.2); fr(c, f.col, sx + i, sy + w, 1, 5 - (i > 4 ? 1 : 0)); fr(c, '#ffffff40', sx + i, sy + w, 1, 1); } fr(c, '#1c1626', sx, sy - 1, 7, 1); }
  for (const m of SPINNERS) { const sx = m.x - cx, sy = m.y - cy; if (sx < -30 || sx > 670 || sy < -30 || sy > 390) continue; const a = ((t >> 2) % 16) * (Math.PI / 8); for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; const ex = sx + Math.cos(an) * m.r, ey = sy + Math.sin(an) * m.r; pxLine(c, '#2a2438', sx, sy, ex, ey, 3); pxLine(c, '#f2eee4', sx, sy, ex, ey, 1); const ex2 = sx + Math.cos(an + 0.35) * m.r * 0.9, ey2 = sy + Math.sin(an + 0.35) * m.r * 0.9; pxLine(c, '#c8c0a8', ex, ey, ex2, ey2, 1); } fr(c, '#5a3a22', sx - 2, sy - 2, 4, 4); fr(c, '#8a5a30', sx - 1, sy - 1, 2, 2); }
};
/* ---- day / night: multi-stage colour grade (multiply) ---- */
const LIGHT_KF = [[0, [86, 96, 160]], [4.5, [92, 102, 164]], [5.6, [170, 150, 190]], [6.6, [255, 206, 182]], [8, [255, 244, 228]], [11, [255, 255, 255]], [16, [255, 250, 238]], [17.6, [255, 218, 160]], [18.8, [255, 168, 118]], [19.8, [150, 120, 176]], [21, [92, 100, 162]], [24, [86, 96, 160]]];
function lightAt(hf) { for (let i = 1; i < LIGHT_KF.length; i++) { if (hf <= LIGHT_KF[i][0]) { const a = LIGHT_KF[i - 1], b = LIGHT_KF[i]; const k = (hf - a[0]) / (b[0] - a[0] || 1); return [0, 1, 2].map(j => a[1][j] + (b[1][j] - a[1][j]) * k); } } return [255, 255, 255]; }
function darkness(hf) { const c = lightAt(hf); return clamp(1 - (c[0] + c[1] + c[2]) / 765, 0, 1) * 1.7; }
Render.applyLight = function (c, hf, opts, cx, cy, sea) {
  opts = opts || {}; const rain = this.rainNow && this.rainNow();
  let col = opts.noNight ? [255, 255, 255] : lightAt(hf);
  if (rain) col = col.map(v => v * 0.82);
  if (G && G.awakened && !G.ending) col = [col[0] * 0.9, col[1] * 0.8, col[2] * 0.95];
  if (G && G.awakened && !G.ending && G.boss && G.boss.alive) { /* purple world tint grows with time since awakening */ const k = clamp((G.tick - G.awakenAt) / (3 * TICK_YEAR), 0, 1); col = [col[0] * (1 - 0.1 * k), col[1] * (1 - 0.22 * k), col[2] * (1 - 0.04 * k)]; }
  if (col[0] < 254 || col[1] < 254 || col[2] < 254) { c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`; c.fillRect(0, 0, 640, 360); c.globalCompositeOperation = 'source-over'; }
  const dk = opts.noNight ? 0 : darkness(hf);
  // window / lamp glow after the grade so they stay bright
  if (dk > 0.12 || rain) {
    const a = clamp(Math.max(dk, rain ? 0.3 : 0) * 1.5, 0, 1);
    c.globalAlpha = a; for (const r of WIN_RECTS) { const sx = r.x - cx, sy = r.y - cy; if (sx < -10 || sx > 650 || sy < -10 || sy > 370) continue; fr(c, r.purple ? '#e060ff' : '#ffd860', sx, sy, r.w, r.h); fr(c, r.purple ? '#fff0ff' : '#fff4c0', sx, sy, r.w, 1); } c.globalAlpha = 1;
    c.globalCompositeOperation = 'lighter';
    for (const r of WIN_RECTS) { const sx = r.x - cx + r.w / 2, sy = r.y - cy + r.h / 2; if (sx < -20 || sx > 660 || sy < -20 || sy > 380) continue; const gr = c.createRadialGradient(sx, sy + 2, 1, sx, sy + 2, 12); gr.addColorStop(0, r.purple ? `rgba(180,60,220,${0.28 * a})` : `rgba(255,190,90,${0.3 * a})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gr; c.fillRect(sx - 12, sy - 10, 24, 26); }
    for (const l of LAMPS) { const sx = l.x - cx, sy = l.y - cy; if (sx < -30 || sx > 670 || sy < -30 || sy > 390) continue; const fl = 0.9 + Math.sin(this.time / 5 + l.x) * 0.1; const gr = c.createRadialGradient(sx, sy, 1, sx, sy, 34); gr.addColorStop(0, `rgba(255,200,110,${0.6 * a * fl})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gr; c.fillRect(sx - 34, sy - 34, 68, 68); }
    c.globalCompositeOperation = 'source-over';
  }
  return dk;
};
/* ---- weather ---- */
Render.weatherToday = function () { if (!G) return 0; const d = Math.floor(G.tick / TICK_DAY); const sea = seasonOf(G.tick); const r = hsh(d, G.seed, 55); if (sea === 3) return r < 0.5 ? 2 : 0; if (sea === 1) return r < 0.14 ? 1 : 0; return r < 0.24 ? 1 : 0; };
Render.rainNow = function () { return this.weatherOn() && this.weatherToday() === 1; };
Render.weatherOn = function () { return !(typeof Game !== 'undefined' && Game.settings && Game.settings.weather === false); };
Render.drawWeather = function (c, sea, hf) {
  if (!this.weatherOn()) return; const w = this.weatherToday(); const P = this.wp || (this.wp = []); const t = this.time;
  const want = w === 1 ? 70 : w === 2 ? 60 : sea === 2 ? 9 : sea === 0 ? 8 : 0;
  while (P.length < want) P.push({ x: Math.random() * 660 - 10, y: Math.random() * 380 - 10, v: Math.random(), p: Math.random() * 6.28 });
  while (P.length > want) P.pop();
  for (const p of P) {
    if (w === 1) { p.y += 6 + p.v * 3; p.x += 1.6; if (p.y > 370) { p.y = -8; p.x = Math.random() * 660 - 30; } c.fillStyle = 'rgba(190,210,255,0.7)'; c.fillRect(Math.round(p.x), Math.round(p.y), 1, 4); c.fillStyle = 'rgba(255,255,255,0.5)'; c.fillRect(Math.round(p.x), Math.round(p.y), 1, 1); }
    else if (w === 2) { p.y += 0.7 + p.v * 0.7; p.x += Math.sin(t / 30 + p.p) * 0.5; if (p.y > 370) { p.y = -4; p.x = Math.random() * 660; } c.fillStyle = p.v > 0.5 ? '#fff' : '#dbe8f6'; c.fillRect(Math.round(p.x), Math.round(p.y), p.v > 0.7 ? 2 : 1, p.v > 0.7 ? 2 : 1); }
    else if (sea === 2) { p.y += 0.7 + p.v * 0.5; p.x += Math.sin(t / 25 + p.p) * 0.9 + 0.3; if (p.y > 370 || p.x > 660) { p.y = -4; p.x = Math.random() * 660; } const lc = ['#d86a2a', '#c04a2a', '#e8a838'][Math.floor(p.v * 3) % 3]; c.fillStyle = lc; c.fillRect(Math.round(p.x), Math.round(p.y), 2, 1); c.fillRect(Math.round(p.x) + 1, Math.round(p.y) + 1, 1, 1); }
    else if (sea === 0) { p.y += 0.5 + p.v * 0.4; p.x += Math.sin(t / 22 + p.p) * 0.8 + 0.4; if (p.y > 370 || p.x > 660) { p.y = -4; p.x = Math.random() * 660; } c.fillStyle = p.v > 0.5 ? '#ffd0e0' : '#fff'; c.fillRect(Math.round(p.x), Math.round(p.y), 1, 1); c.fillRect(Math.round(p.x) + 1, Math.round(p.y), 1, 1); }
  }
  if (w === 1) { c.fillStyle = 'rgba(40,50,90,0.14)'; c.fillRect(0, 0, 640, 360); }
  if (w === 2) { c.fillStyle = 'rgba(220,230,255,0.06)'; c.fillRect(0, 0, 640, 360); }
};
/* ---- divine effects (<= 46 frames) ---- */
Render.drawDivine = function (c, cx, cy) {
  const b = this.beam; if (!b) return; b.life--; const k = b.life / 46, t = 1 - k; const sx = Math.round(b.x - cx), sy = Math.round(b.y - cy);
  const col = b.out === 'fail' ? [160, 160, 205] : b.out === 'twist' ? [200, 140, 255] : [255, 238, 166]; const rgb = a => `rgba(${col[0]},${col[1]},${col[2]},${a})`;
  const ringEll = (r, a, w) => { c.strokeStyle = rgb(a); c.lineWidth = w || 1; c.beginPath(); c.ellipse(sx, sy + 8, r, r * 0.4, 0, 0, 7); c.stroke(); };
  c.globalCompositeOperation = 'lighter'; { const gl = c.createRadialGradient(sx, sy + 8, 2, sx, sy + 8, 40); gl.addColorStop(0, rgb(0.55 * k)); gl.addColorStop(1, rgb(0)); c.fillStyle = gl; c.fillRect(sx - 40, sy - 32, 80, 80); }
  switch (b.pid) {
    case 'oracle': { for (let i = 0; i < 4; i++) { const r = ((t * 36 + i * 9) % 36) + 2; ringEll(r, 0.7 * k * (1 - r / 40), 1); } const gr = c.createLinearGradient(0, 0, 0, sy + 10); gr.addColorStop(0, rgb(0)); gr.addColorStop(1, rgb(0.9 * k)); c.fillStyle = gr; c.fillRect(sx - 3, 0, 6, sy + 10); for (let i = 0; i < 6; i++) { const a = t * 6 + i * 1.05, rr = 12 + 6 * Math.sin(t * 5 + i); fr(c, '#fff', Math.round(sx + Math.cos(a) * rr), Math.round(sy - 6 + Math.sin(a) * rr * 0.5), 2, 2); } break; }
    case 'trial': { if (b.life > 32) { let x = sx + (Math.random() - .5) * 4, y = 0; c.fillStyle = '#fff'; while (y < sy + 6) { const nx = x + (Math.random() - .5) * 10, ny = y + 8 + Math.random() * 6; pxLine(c, '#fff8c0', x, y, nx, ny, 2); pxLine(c, '#ffffff', x, y, nx, ny, 1); x = nx; y = ny; } c.fillStyle = `rgba(255,255,230,${0.22 * (b.life - 32) / 14})`; c.fillRect(0, 0, 640, 360); } ringEll(4 + t * 20, 0.8 * k, 2); for (let i = 0; i < 3; i++) fr(c, '#ffe880', Math.round(sx + (Math.random() - .5) * 18), Math.round(sy + 4 + (Math.random() - .5) * 8), 1, 2); break; }
    case 'soul': { for (let i = 0; i < 3; i++) { const r = ((t * 22 + i * 7) % 22) + 2; c.strokeStyle = `rgba(110,180,255,${0.8 * k * (1 - r / 26)})`; c.lineWidth = 1; c.beginPath(); c.ellipse(sx, sy + 4, r, r * 0.55, 0, 0, 7); c.stroke(); } for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.3; fr(c, '#bfe4ff', Math.round(sx + Math.cos(a) * 7), Math.round(sy - t * 24 - i * 4), 2, 2); } break; }
    case 'force': { const r = t * 340; c.strokeStyle = rgb(0.5 * k); c.lineWidth = 3; c.beginPath(); c.arc(320, 180, r, 0, 7); c.stroke(); c.strokeStyle = rgb(0.25 * k); c.lineWidth = 8; c.beginPath(); c.arc(320, 180, r * 0.85, 0, 7); c.stroke(); break; }
    default: { // grace: golden pillar, spiral sparkles, ground ring
      const gr = c.createLinearGradient(0, 0, 0, sy + 10); gr.addColorStop(0, rgb(0)); gr.addColorStop(1, rgb(1)); c.fillStyle = gr; const w = 4 + 10 * Math.sin(Math.min(1, t * 3) * 1.57); c.fillRect(sx - w, 0, w * 2, sy + 10); c.fillStyle = gr; c.fillRect(sx - w / 2, 0, w, sy + 10); c.fillStyle = `rgba(255,255,255,${k * 0.9})`; c.fillRect(sx - 2, 0, 4, sy + 10);
      ringEll(6 + t * 16, 0.8 * k, 2); for (let i = 0; i < 6; i++) { const a = t * 9 + i * 1.05; const yy = sy + 6 - (t * 40 + i * 7) % 40; fr(c, i % 2 ? '#fff' : '#ffe880', Math.round(sx + Math.cos(a) * 7), Math.round(yy), 2, 2); }
    }
  }
  c.globalCompositeOperation = 'source-over';
  if (b.life <= 0) this.beam = null;
};
