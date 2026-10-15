/* ================= V4.1 fix C: visible defeat damage (placeholder effects until the visual team's ruin / scaffold / rubble art arrives):
   ruined buildings darkened with a broken roof, big fire on the first day then a tall smoke column, rubble, scaffolding + "🔨 修復中 n%",
   scorch marks on the invasion road (east gate -> plaza), fresh graves ================= */
Object.assign(S, { repairing: ['🔨 修復中 {n}%', '🔨 修復中 {n}%'] });
function drawRuins(c, cx, cy) {
  const tm = Render.time; const ws = getWorldCanvas(seasonOf(G.tick));
  // scorch & trampled flowers along the road from the east gate to the plaza
  if ((G.scorchUntil || 0) > G.tick) { for (let x = 29; x <= 44; x++) for (let k = 0; k < 2; k++) { const r = hsh(x, k, 77); const wx = x * TS + Math.floor(r * 12), wy = (21 + Math.floor(hsh(k, x, 78) * 3)) * TS + Math.floor(hsh(x, x, 79) * 10); const sx = wx - cx, sy = wy - cy; if (sx < -20 || sx > 660 || sy < -20 || sy > 380) continue;
    c.globalAlpha = 0.55; ell(c, '#1c140e', sx, sy, 6 + Math.floor(r * 5), 3); c.globalAlpha = 0.35; ell(c, '#2c2018', sx + 3, sy - 1, 3, 2); c.globalAlpha = 1; if (r > 0.6) { fr(c, '#7a5a3a', sx - 4, sy - 1, 2, 1); fr(c, '#a04a5a', sx + 5, sy, 1, 1); } } }
  for (const id in (G.ruins || {})) { const b = W.blds[id]; if (!b) continue; const I = (G.ruinInfo || {})[id] || { burn: 0 }; const px = b.x * TS - cx, py = b.y * TS - cy, w = b.w * TS, hgt = b.h * TS;
    if (px < -120 || px > 760 || py < -160 || py > 460) continue; const burning = I.burn > G.tick; const left = G.ruins[id];
    // 1) the building itself, darkened (charred), from the cached world picture
    c.save(); c.filter = 'brightness(0.42) sepia(0.35)'; c.drawImage(ws, b.x * TS, b.y * TS - 6, w, hgt + 6, px, py - 6, w, hgt + 6); c.restore();
    // 2) roof caved in: a jagged black hole with charred beams
    const rx = px + Math.round(w * 0.16), rw = Math.round(w * 0.68), ry = py + 1, rh = Math.round(hgt * 0.5);
    c.fillStyle = '#0c0808'; c.beginPath(); c.moveTo(rx, ry + rh * 0.55); for (let i = 0; i <= 8; i++) c.lineTo(rx + rw * i / 8, ry + ((i * 7 + +id) % 3) * 3); c.lineTo(rx + rw, ry + rh * 0.7); for (let i = 8; i >= 0; i--) c.lineTo(rx + rw * i / 8, ry + rh - ((i * 5 + +id) % 4) * 3); c.closePath(); c.fill();
    c.strokeStyle = burning ? '#ff8030' : '#8a3a18'; c.lineWidth = 1; c.stroke(); for (let i = 0; i < 3; i++) pxLine(c, '#3a2414', rx + 4 + i * rw / 3, ry + rh - 2, rx + 10 + i * rw / 3, ry + 4, 2);
    // 3) rubble around the base
    for (let i = 0; i < 9; i++) { const r = hsh(+id, i, 501); const ox = px - 6 + Math.floor(r * (w + 12)), oy = py + hgt - 4 + Math.floor(hsh(i, +id, 502) * 9); const s = 2 + Math.floor(hsh(+id, i, 503) * 3); fr(c, '#181020', ox - 1, oy - 1, s + 2, s + 1); fr(c, i % 3 ? '#6a6a72' : '#5a3c22', ox, oy, s, s - 1); fr(c, '#9a9aa2', ox, oy, Math.max(1, s - 2), 1); }
    // 4) fire on the first day (about a third of the width), then smoke
    if (burning) { const fw = Math.max(16, Math.round(w / 3)); for (let i = 0; i < fw; i += 3) { const fl = (tm >> 2) + i; const hh = 10 + ((i * 7 + fl) % 9) + Math.round(Math.sin((tm + i * 5) / 6) * 3); const fx0 = rx + Math.round((rw - fw) / 2) + i, fy = ry + rh * 0.7; fr(c, '#c03010', fx0, fy - hh, 3, hh); fr(c, '#ff8a30', fx0, fy - hh + 3, 3, hh - 4); fr(c, '#ffd060', fx0 + 1, fy - hh * 0.5, 1, hh * 0.4); }
      c.globalAlpha = 0.25 + 0.1 * Math.sin(tm / 7); ell(c, '#ff7030', rx + rw / 2, ry + rh * 0.5, rw * 0.7, rh * 0.8); c.globalAlpha = 1; }
    const n = burning ? 9 : 6; for (let i = 0; i < n; i++) { const p = ((tm + i * (160 / n) + +id * 13) % 160) / 160; c.globalAlpha = (1 - p) * (burning ? 0.75 : 0.5); const s = 4 + p * 14; fr(c, burning ? '#28222c' : '#4a4450', Math.round(rx + rw / 2 + Math.sin(p * 5 + i) * (4 + p * 10) - s / 2), Math.round(ry - p * 110), s, s); } c.globalAlpha = 1;
    // 5) scaffolding + progress once the repair has started
    if (left < 100 && !burning) { const sxs = [px + 3, px + w - 6]; sxs.forEach(sx => { fr(c, '#5a3a1c', sx, py + 4, 2, hgt - 6); }); for (let y = 8; y < hgt - 4; y += 8) { fr(c, '#8a6a3a', px + 2, py + y, w - 4, 2); fr(c, '#a07a40', px + 2, py + y, w - 4, 1); } pxLine(c, '#6a4a24', px + 3, py + hgt - 4, px + w - 5, py + 6, 1); }
  }
  // fresh graves for the fallen (flowers for 2 seasons)
  for (const gv of (G.graves || [])) { const sx = gv.x * TS - cx + 4, sy = gv.y * TS - cy + 2; if (sx < -16 || sx > 656 || sy < -20 || sy > 380) continue; fr(c, '#181020', sx - 1, sy - 1, 9, 12); fr(c, '#9a9aa8', sx, sy, 7, 10); fr(c, '#c8c8d4', sx, sy, 7, 2); fr(c, '#6a6a78', sx + 3, sy + 2, 1, 5); fr(c, '#5a3a22', sx - 2, sy + 10, 11, 3);
    if (G.tick - gv.t < 2 * SEASON_T) { fr(c, '#ff7090', sx - 2, sy + 9, 2, 2); fr(c, '#ffe060', sx + 7, sy + 9, 2, 2); fr(c, '#60c060', sx + 1, sy + 11, 4, 1); } }
}
/* windows of a ruin stay dark; repair labels are drawn after the night tint so they stay readable */
function winRuined(r) { if (!G || !G.ruins) return false; for (const id in G.ruins) { const b = W.blds[id]; if (b && r.x >= b.x * TS - 2 && r.x <= (b.x + b.w) * TS + 2 && r.y >= b.y * TS - 8 && r.y <= (b.y + b.h) * TS + 2) return true; } return false; }
const _rdRuin = Render.draw; Render.draw = function (alpha, opts) { _rdRuin.apply(this, arguments); if (!G || !G.ruins || Game.view === 'castle') return; const c = this.c; const cx = Math.round(this.cam.x), cy = Math.round(this.cam.y); c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.font = 'bold 9px sans-serif'; c.textAlign = 'center';
  for (const id in G.ruins) { const b = W.blds[id]; if (!b) continue; const px = b.x * TS - cx + b.w * TS / 2, py = b.y * TS - cy - 7; if (px < -60 || px > 700 || py < -20 || py > 380) continue; const lab = fmt(t('repairing'), { n: repairPct(id) }); const lw = c.measureText(lab).width + 6; c.fillStyle = 'rgba(16,10,24,.85)'; c.fillRect(Math.round(px - lw / 2), py - 9, lw, 11); c.fillStyle = G.repairStalled ? '#ff9a9a' : '#ffe9a0'; c.fillText(lab, px, py); }
  c.restore(); };
/* a gap in the palisade / wall: a broken stump and splinters (placeholder until the "broken fence / wall gap" art arrives) */
function brokenStake(c, sx, sy, stone) { if (sx < -16 || sx > 656 || sy < -20 || sy > 380) return; if (stone) { fr(c, '#2a2a38', sx - 1, sy - 5, 8, 7); fr(c, '#7a7a88', sx, sy - 4, 6, 5); fr(c, '#5a5a66', sx + 7, sy + 1, 3, 2); } else { fr(c, '#2a1a10', sx - 1, sy - 6, 5, 8); fr(c, '#6a4a28', sx, sy - 5, 3, 6); fr(c, '#2a1a10', sx + 0, sy - 7, 1, 1); fr(c, '#2a1a10', sx + 2, sy - 8, 1, 2); fr(c, '#8a6a3a', sx + 4, sy + 1, 4, 1); fr(c, '#8a6a3a', sx - 4, sy, 3, 1); } }
/* repair crews carry planks */
const _rdCarry = Render.draw; Render.draw = function (alpha, opts) { _rdCarry.apply(this, arguments); if (!G || Game.view === 'castle' || !(G.ruinWorkUntil > G.tick - TICK_DAY)) return; const c = this.c; const cx = Math.round(this.cam.x), cy = Math.round(this.cam.y); c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
  for (const h of G.humans) { if (!h.alive || h.inside || !h.act || h.act.k !== 'repair') continue; const x = lerp(h.px, h.x, alpha || 0) * TS - cx, y = lerp(h.py, h.y, alpha || 0) * TS - cy; if (x < -20 || x > 660 || y < -30 || y > 380) continue; fr(c, '#181020', x - 3, y - 18, 22, 4); fr(c, '#a07a40', x - 2, y - 17, 20, 2); fr(c, '#c89a58', x - 2, y - 17, 20, 1); }
  c.restore(); };
