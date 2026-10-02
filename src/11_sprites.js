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
const spriteCache = {};
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
    const hf = (G.tick % TICK_DAY) / 6; this.drawWaterAnim(c, cx, cy, sea); this.drawAnimProps(c, cx, cy, sea, opts.noNight ? 0 : darkness(hf));
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
      c.fillStyle = 'rgba(24,28,70,0.36)'; c.beginPath(); c.ellipse(sx + 1, sy, it.k && (e.boss || e.cad >= 0) ? 11 : 6, 2.4, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(24,28,70,0.2)'; c.beginPath(); c.ellipse(sx + 1, sy, it.k && (e.boss || e.cad >= 0) ? 8 : 4, 1.5, 0, 0, 7); c.fill();
      if (it.k === 0) { const sl = soulOf(e); if (sl && sl.fav) { c.strokeStyle = '#ffd860'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(sx, sy, 8, 3.4, 0, 0, 7); c.stroke(); } else if (G.track.indexOf(e.id) >= 0) { c.strokeStyle = '#60d8ff'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(sx, sy, 8, 3.4, 0, 0, 7); c.stroke(); } if (e.id === Game.flashId) { const k = 8 + Math.sin(this.time / 4) * 3; c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.ellipse(sx, sy - 6, k, k * 1.2, 0, 0, 7); c.stroke(); } }
      let spr, ox = 0, oy = 0;
      if (it.k === 0) {
        const moving = e.path && e.path.length > 0 || Math.abs(e.x - e.px) > 0.01 || Math.abs(e.y - e.py) > 0.01;
        let fm = moving ? [1, 0, 3, 0][(this.time >> 3) & 3] : (((this.time + e.id * 13) >> 5) & 1) ? 4 : 0; const lunge = e.tgt && G.idx[e.tgt] && Math.hypot(G.idx[e.tgt].x - e.x, G.idx[e.tgt].y - e.y) < 2.2 && Math.sin(this.time / 2.5 + e.id) > 0.3; if (lunge && !moving) fm = 5; if (prayers[e.id] && !moving) fm = 6; spr = humanSprite(e, e.dir === undefined ? 0 : e.dir, fm);
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
    this.applyLight(c, hf, opts, cx, cy, sea); this.drawWeather(c, sea, hf);
    // numbers
    c.font = 'bold 8px monospace'; c.textAlign = 'center';
    for (let i = this.nums.length - 1; i >= 0; i--) { const n = this.nums[i]; n.y -= 0.4; n.life--; if (n.life <= 0) { this.nums.splice(i, 1); continue; } const sx = Math.round(n.x - cx), sy = Math.round(n.y - cy); c.globalAlpha = Math.min(1, n.life / 10); c.fillStyle = '#000'; c.fillText(n.v, sx + 1, sy + 1); c.fillStyle = n.col; c.fillText(n.v, sx, sy); } c.globalAlpha = 1;
    this.drawDivine(c, cx, cy);
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
