const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING', f, a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/07e_castle.js', [
  ["E.done = true; E.how = how; E.ids.forEach(i => { const h = G.idx[i]; if (h && h.alive && !h.captive) { h.away = 0; h.inside = 0; const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); } });",
   "E.done = true; E.how = how; E.ids.forEach(i => { const h = G.idx[i]; if (h && h.alive && !h.captive) { h.away = 1; h.inside = 1; h.returnAt = Math.max(G.tick + TICK_DAY, E.back); } }); // the march home takes the rest of the season"],
  ["  G.humans.forEach(h => { if (h.temple && G.tick >= h.temple) {",
   "  G.humans.forEach(h => { if (h.returnAt && G.tick >= h.returnAt && h.alive && !h.captive) { h.returnAt = 0; h.away = 0; h.inside = 0; const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); } });\n  G.humans.forEach(h => { if (h.temple && G.tick >= h.temple) {"],
]);
P('src/07b_assault.js', [["  let pw = 0; for (const h of G.humans) { if (!isAdv(h)) continue;", "  let pw = 0; for (const h of G.humans) { if (!isAdv(h) || h.away) continue;"]]);
P('src/06_combat.js', [["function freeAdvs() { return G.humans.filter(o => o.alive && isAdv(o) && !o.party &&", "function freeAdvs() { return G.humans.filter(o => o.alive && isAdv(o) && !o.party && !o.away &&"]]);
console.log('ok');
