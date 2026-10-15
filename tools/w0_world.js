/* one-shot patch: V4.2 W0 — continuous 160x64 map (village west, 5 field zones, demon castle at the east end) */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING', f, a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/01_util.js', [['MW = 64, MH = 40,', 'MW = 160, MH = 64,']]);
P('src/03_world.js', [
  ["const T = { GRASS: 0, PATH: 1, WATER: 2, TREE: 3, ROCK: 4, FENCE: 5, FLOWER: 6, BRIDGE: 7, FIELD: 8, DARK: 9, BLD: 10, PLAZA: 11, DOOR: 12, SAND: 13, CLIFF: 14, LEDGE: 15 };\nconst BLOCK = new Uint8Array(16);",
   "const T = { GRASS: 0, PATH: 1, WATER: 2, TREE: 3, ROCK: 4, FENCE: 5, FLOWER: 6, BRIDGE: 7, FIELD: 8, DARK: 9, BLD: 10, PLAZA: 11, DOOR: 12, SAND: 13, CLIFF: 14, LEDGE: 15, SWAMP: 16, POISON: 17, SNOW: 18, LAVA: 19, VOLC: 20, CAVE: 21, CHASM: 22, ICE: 23, WILD: 24 };\nconst BLOCK = new Uint8Array(32); BLOCK[T.LAVA] = 1; BLOCK[T.CHASM] = 1;"],
  ["const TOWN_X0 = 16, TOWN_X1 = 42, FIELD_X0 = 43, PLATEAU_X0 = 56;", "const TOWN_X0 = 16, TOWN_X1 = 42, FIELD_X0 = 43, VIL_X1 = 55, PLATEAU_X0 = 146;\n/* V4.2 W0: field zones east of the village (x ranges), each with a suggested level */\nconst ZONES = [{ id: 'plains', x0: 56, x1: 79, lv: [1, 3], star: 1 }, { id: 'forest', x0: 80, x1: 99, lv: [3, 5], star: 2 }, { id: 'swamp', x0: 100, x1: 117, lv: [5, 7], star: 3 }, { id: 'mountain', x0: 118, x1: 135, lv: [7, 10], star: 4 }, { id: 'nest', x0: 136, x1: 145, lv: [10, 99], star: 5 }];\nfunction zoneAt(x) { return ZONES.find(z => x >= z.x0 && x <= z.x1) || null; }"],
  ["function zoneOf(x) { return x < TOWN_X0 ? 'farm' : x <= TOWN_X1 ? 'town' : x < PLATEAU_X0 ? 'field' : 'plateau'; }", "function zoneOf(x) { if (x < TOWN_X0) return 'farm'; if (x <= TOWN_X1) return 'town'; if (x <= VIL_X1) return 'field'; const z = zoneAt(x); return z ? z.id : 'plateau'; }"],
]);
// --- replace the body of buildWorld between "// trees: borders and field" and "// fountain & well" with the expanded map
let s = fs.readFileSync('src/03_world.js', 'utf8');
const a = s.indexOf('  // trees: borders and field'), b = s.indexOf('  // fountain & well (1x1 blocked deco)');
s = s.slice(0, a) + `  // ---- village edges (original coordinates kept) ----
  for (let x = 14; x <= 44; x++) { if (rg.chance(0.5)) set(x, 4, T.TREE); }
  for (let x = FIELD_X0; x <= VIL_X1; x++) for (let y = 0; y < 37; y++) { if (get(x, y) === T.GRASS || get(x, y) === T.FLOWER) { if (y >= 21 && y <= 25) continue; if (rg.chance(0.09)) set(x, y, T.TREE); else if (rg.chance(0.02)) set(x, y, T.ROCK); } }
  for (let x = 0; x < 15; x++) for (let y = 33; y < 37; y++) if (rg.chance(0.5)) set(x, y, T.TREE);
  for (let x = 0; x <= VIL_X1; x++) for (let y = 57; y < MH; y++) if (rg.chance(0.8)) set(x, y, T.TREE); // southern tree belt
  // ---- field zones (west -> east) ----
  const rect = (x0, y0, x1, y1, v, p) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (!p || rg.chance(p)) set(x, y, v); };
  // plains: open grass, flowers, a few trees/rocks, farm plots, a river with a bridge
  for (let y = 0; y < MH; y++) for (let x = 56; x <= 79; x++) { const r = rg.next(); set(x, y, r < 0.1 ? T.FLOWER : r < 0.15 ? T.WILD : T.GRASS); if (rg.chance(0.04)) set(x, y, T.TREE); else if (rg.chance(0.015)) set(x, y, T.ROCK); }
  rect(60, 30, 66, 33, T.FIELD); rect(60, 36, 66, 39, T.FIELD);
  for (let y = 0; y < MH; y++) { const rx = 76 + Math.round(Math.sin(y / 6) * 1.5); set(rx, y, T.WATER); set(rx + 1, y, T.WATER); if (rg.chance(0.4)) set(rx - 1, y, T.SAND); }
  // forest: dense trees with paths and clearings
  for (let y = 0; y < MH; y++) for (let x = 80; x <= 99; x++) { set(x, y, rg.chance(0.62) ? T.TREE : T.GRASS); }
  [[86, 14, 4], [92, 34, 5], [84, 46, 4], [95, 10, 3]].forEach(([cx, cy, r]) => { for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) set(x, y, T.GRASS); });
  // swamp & caves: wetland, poison bog, a cave mouth with rock walls and cave floor
  for (let y = 0; y < MH; y++) for (let x = 100; x <= 117; x++) { const n = Math.sin(x / 3.1) + Math.cos(y / 2.7); set(x, y, n > 0.8 ? T.SWAMP : n < -1.2 ? T.POISON : T.GRASS); if (rg.chance(0.08)) set(x, y, T.TREE); }
  for (let y = 36; y <= 52; y++) for (let x = 104; x <= 116; x++) { const edge = x === 104 || x === 116 || y === 36 || y === 52; set(x, y, edge ? T.ROCK : T.CAVE); if (!edge && rg.chance(0.07)) set(x, y, T.ROCK); }
  for (let y = 23; y <= 36; y++) set(110, y, T.CAVE); set(110, 36, T.CAVE);
  // mountains: rock fields, snow, cliffs, a chasm crossed by a rope bridge
  for (let y = 0; y < MH; y++) for (let x = 118; x <= 135; x++) { const hgt = (x - 118) / 17 + Math.sin(y / 5) * 0.2; set(x, y, hgt > 0.55 && (y < 18 || y > 30) ? T.SNOW : T.WILD); if (rg.chance(0.12)) set(x, y, T.ROCK); }
  for (let y = 0; y < MH; y++) { if (y >= 21 && y <= 25) continue; if ((y % 11) < 2) { for (let x = 120; x <= 133; x++) if (rg.chance(0.85)) set(x, y, T.CLIFF); } }
  for (let y = 0; y < MH; y++) { set(127, y, T.CHASM); set(128, y, T.CHASM); }
  // dragon nest: volcanic ground, lava pools
  for (let y = 0; y < MH; y++) for (let x = 136; x <= 145; x++) { set(x, y, T.VOLC); if (rg.chance(0.08)) set(x, y, T.ROCK); }
  [[139, 12, 2], [141, 36, 3], [138, 48, 2]].forEach(([cx, cy, r]) => { for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) set(x, y, T.LAVA); });
  // demon castle land
  for (let y = 0; y < MH; y++) for (let x = PLATEAU_X0; x < MW; x++) { set(x, y, T.DARK); if (rg.chance(0.1) && !(y >= 14 && y <= 30 && x >= 148)) set(x, y, T.ROCK); }
  for (let x = 0; x < 15; x++) for (let y = 29; y < 33; y++) if (rg.chance(0.55)) set(x, y, T.TREE);
  // roads
  const road = (x0, y0, x1, y1) => { for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) { const tp = get(x, y); if (tp === T.WATER || tp === T.CHASM) set(x, y, T.BRIDGE); else if (tp !== T.LAVA) set(x, y, T.PATH); } };
  road(0, 23, 152, 23); road(14, 14, 42, 14); road(14, 31, 42, 31); road(15, 36, 42, 36); road(28, 13, 28, 37); road(14, 14, 14, 31);
  road(2, 44, 54, 44); road(28, 44, 28, 56); road(14, 50, 42, 50); road(14, 44, 14, 50); road(42, 44, 42, 50); road(43, 36, 43, 44); road(14, 36, 14, 44);
  road(86, 14, 86, 23); road(92, 23, 92, 34); road(110, 23, 110, 36); road(152, 23, 152, 26);
  // plaza
  for (let y = 17; y <= 22; y++) for (let x = 25; x <= 31; x++) if (get(x, y) !== T.PATH || (x !== 28 && y !== 23)) set(x, y, T.PLAZA);
  // buildings
  const blds = [];
  const mk = (kind, x, y, w, h, roof) => {
    const b = { id: blds.length, kind, x, y, w, h, roof: roof || 0, door: { x: x + (w >> 1), y: y + h - 1 }, appr: { x: x + (w >> 1), y: y + h } };
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) set(xx, yy, T.BLD);
    set(b.door.x, b.door.y, T.DOOR); if (get(b.appr.x, b.appr.y) !== T.PATH && get(b.appr.x, b.appr.y) !== T.PLAZA) set(b.appr.x, b.appr.y, T.PATH);
    blds.push(b); return b;
  };
  // original town (unchanged positions)
  mk('church', 25, 7, 7, 6, 6);
  mk('house', 16, 9, 5, 4, 0); mk('shop', 32, 9, 6, 4, 1); mk('house', 38, 9, 5, 4, 2);
  mk('guild', 16, 18, 7, 5, 2); mk('tavern', 33, 18, 7, 5, 3);
  mk('smithy', 16, 27, 6, 4, 4); mk('apothecary', 22, 27, 6, 4, 5); mk('inn', 29, 26, 7, 5, 0); mk('armor', 37, 27, 6, 4, 5);
  [[16, 32], [22, 32], [30, 32], [36, 32]].forEach((p, i) => mk('house', p[0], p[1], 5, 4, (i + 1) % 4));
  // farm: thatched huts 5x4, windmill 5x7 (Part B sizes)
  mk('hut', 0, 19, 5, 4, 1); mk('hut', 8, 19, 5, 4, 2); mk('mill', 5, 25, 5, 7, 7); road(7, 32, 14, 32); road(14, 31, 14, 32);
  // southern district (V4.2): manor, market, library, item shop, barracks, two watchtowers, cemetery, more houses
  mk('manor', 24, 38, 8, 6, 0); mk('market', 15, 39, 7, 5, 0); mk('library', 34, 39, 7, 5, 0); mk('itemshop', 6, 40, 6, 4, 0);
  mk('barracks', 44, 39, 7, 5, 0); mk('watchtower', 0, 37, 5, 7, 0); mk('watchtower', 51, 37, 5, 7, 1);
  mk('cemetery', 33, 51, 6, 5, 0); [[16, 46], [22, 46], [16, 52], [22, 52]].forEach((p, i) => mk('house', p[0], p[1], 5, 4, i));
  mk('castle', 149, 18, 7, 8, 8);
  // cliffs: north band (2 tiers) for the whole map and the wall of the demon land with a stair gate
  for (let x = 0; x < PLATEAU_X0; x++) { const top = 1; const bot = x < 14 ? 2 : 3 + (hsh01(x, 7) < 0.3 ? 1 : 0); for (let y = 0; y < top; y++) set(x, y, T.LEDGE); for (let y = top; y <= bot; y++) if (get(x, y) !== T.PATH && get(x, y) !== T.BRIDGE) set(x, y, T.CLIFF); }
  for (let y = 0; y < MH; y++) { if (Math.abs(y - 23) <= 1) { set(PLATEAU_X0 - 1, y, T.PATH); continue; } set(PLATEAU_X0 - 1, y, T.CLIFF); }
` + s.slice(b);
// homes include the new houses; zone signposts recorded for the renderer
s = s.replace("  const homes = blds.filter(b => b.kind === 'house' || b.kind === 'hut').map(b => b.id);\n  return { tiles, blds, bk, fields, homes, get, set };", "  const homes = blds.filter(b => b.kind === 'house' || b.kind === 'hut').map(b => b.id);\n  const signs = ZONES.map(z => ({ x: z.x0, y: 21, zone: z.id })); // zone entrance signposts (north side of the main road)\n  return { tiles, blds, bk, fields, homes, signs, get, set };");
fs.writeFileSync('src/03_world.js', s);
// old road/plaza/building block removed? (the original code after "trees" included roads, plaza and mk calls)
console.log('ok');
