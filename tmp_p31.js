const fs = require('fs');
process.chdir(__dirname + '/src');
function rep(file, from, to) { let s = fs.readFileSync(file, 'utf8'); if (!s.includes(from)) { console.log('MISSING in', file, ':', from.slice(0, 80)); return; } s = s.replace(from, () => to); fs.writeFileSync(file, s); }
rep('08_faith.js', "  G.faith = Math.min(G.faithMax, G.faith + gain); G.lastAnswer = G.tick; G.stats.answered++;", "  G.faith = Math.min(G.faithMax, G.faith + gain); G.lastAnswer = G.tick; G.stats.answered++; G._gain = gain; G._pk = pr.kind;");
rep('08_faith.js', "  const res = { ok: true, outcome, cost, pid, p, tid, name: h ? h.name : s ? s.name : null, dir };", "  const res = { ok: true, outcome, cost, pid, p, tid, name: h ? h.name : s ? s.name : null, dir }; const bal0 = G.balance; G._gain = 0; G._pk = '';");
rep('08_faith.js', "  if (pid === 'oracle') G.tut.oracle = true;", "  if (pid === 'oracle') G.tut.oracle = true;\n  res.gain = G._gain || 0; res.pk = G._pk || ''; res.bal = G.balance - bal0; G._gain = 0; G._pk = '';");
rep('08_faith.js', "  soul.k[dir] += (out === 'crit' ? 8 : 4) * f;", "  soul.k[dir] += (out === 'crit' ? 8 : 4) * f; res.kamt = (out === 'crit' ? 8 : 4) * f;");
