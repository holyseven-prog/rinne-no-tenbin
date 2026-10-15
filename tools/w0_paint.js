/* one-shot patch: V4.2 W0 painters (field terrain, bridges) + the 7 new village buildings */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING', f, a.slice(0, 80)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/11d_world.js', [
  ["function groundKind(tp) { switch (tp) {", "function groundKind(tp) { switch (tp) { case T.SWAMP: return 'swamp'; case T.POISON: return 'poison'; case T.SNOW: return 'snow'; case T.ICE: return 'ice'; case T.LAVA: return 'lava'; case T.VOLC: return 'volc'; case T.CAVE: return 'cave'; case T.CHASM: return 'chasm'; case T.WILD: return 'wild';"],
  ["const RANK = { water: 0, grass: 1,", "const RANK = { swamp: 1, poison: 1, snow: 1, ice: 1, lava: 0, volc: 1, cave: 2, chasm: 0, wild: 1, water: 0, grass: 1,"],
  ["    } else if (kind === 'cliff') paintCliffPx(P, tx, ty, sea, Cl, G);", "    } else if (kind === 'cliff') paintCliffPx(P, tx, ty, sea, Cl, G);\n    else paintWildPx(P, kind, tx, ty, x0, y0, sea, G);"],
  ["    if (tp === T.BRIDGE) { fr(c, '#784c2c', tx * TS, ty * TS, 16, 16); for (let i = 0; i < 4; i++) fr(c, '#523420', tx * TS, ty * TS + i * 4 + 3, 16, 1); }", "    if (tp === T.BRIDGE) drawBridge(c, tx, ty, sea);"],
  ["  if (k === 'mill') { drawMillTower(c, px, py, w, h, sea); SPINNERS.push({ x: px + w / 2, y: py + 10, r: 22 }); return; }", "  if (k === 'mill') { drawMillTower(c, px, py, w, h, sea); SPINNERS.push({ x: px + w / 2, y: py + 10, r: 22 }); return; }\n  if (k === 'cemetery' || k === 'watchtower' || k === 'market' || k === 'manor' || k === 'library' || k === 'itemshop' || k === 'barracks') { drawNewBuilding(c, b, sea, px, py, w, h); return; }"],
]);
fs.appendFileSync('src/11d_world.js', fs.readFileSync('tools/w0_paint_add.js', 'utf8'));
console.log('ok');
