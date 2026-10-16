/* hook the delivered sprites into the renderer (people, monsters, battle screen) and fix the overhang layer for the 1280 canvas */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISS', f, a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/11_sprites.js', [
  ["        c.drawImage(spr, Math.round(sx - 8 + ox), Math.round(sy - 22 + oy));", "        if (!drawHumanSpr(c, e, fm, sx + ox, sy + 2 + oy)) c.drawImage(spr, Math.round(sx - 8 + ox), Math.round(sy - 22 + oy)); // sheet sprites (11t), old drawing as fallback"],
  ["spr = monsterSprite(e, atk ? 2 : ((this.time >> 3) + e.id) % 3); const bw = spr.width, bh = spr.height;", "const mfr = atk ? 2 : ((this.time >> 3) + e.id) % 3; spr = monsterSprite(e, mfr); const bw = spr.width; let bh = spr.height;"],
  ["} else c.drawImage(spr, Math.round(sx - bw / 2), Math.round(sy - bh + 2 + bob)); c.filter = 'none';", "} else { const dh = drawMonSpr(c, e, mfr, sx, sy + 2 + bob); if (dh) bh = Math.round(dh); else c.drawImage(spr, Math.round(sx - bw / 2), Math.round(sy - bh + 2 + bob)); } c.filter = 'none';"],
  ["    c.drawImage(getWorldOverlay(sea), cx, cy, 640, 360, 0, 0, 640, 360);", "    c.drawImage(getWorldOverlay(sea), cx, cy, this.VW, this.VH, 0, 0, this.VW, this.VH);"],
]);
P('src/14e_war_ui.js', [
  ["  advs.forEach((hh, i) => { const s = humanSprite(hh, 3, (B.phase + i) % 2 ? 5 : 0); c.drawImage(s, 80 + i * 34 + (win ? 60 : lost ? -20 : adv), 76 + (i % 2) * 10, 32, 48); });",
   "  advs.forEach((hh, i) => { const x = 80 + i * 34 + (win ? 60 : lost ? -20 : adv), y = 76 + (i % 2) * 10; const sp = SPR_READY && (SPR[humanSprBase(hh) + '_right_0_hd'] || SPR[humanSprBase(hh) + '_right_0']); if (sp) { c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high'; c.drawImage(sp, x + 16 - 24 * sp.width / sp.height, y, 48 * sp.width / sp.height, 48); c.imageSmoothingEnabled = false; } else { const s = humanSprite(hh, 3, (B.phase + i) % 2 ? 5 : 0); c.drawImage(s, x, y, 32, 48); } });"],
]);
P('src/11f_monsters.js', [["function enemyBattleSprite(k, frame) {", "function enemyBattleSprite(k, frame) { { const nm = { mush: 'mushroom', skel: 'skeleton', verna: 'cadre_mist', garum: 'cadre_bone', serene: 'cadre_shadow' }[k] || k; const s = typeof battleSprCanvas === 'function' && battleSprCanvas(nm, frame || 0); if (s) return s; }"]]);
console.log('ok');
