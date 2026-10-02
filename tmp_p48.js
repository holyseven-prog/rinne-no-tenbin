const fs = require('fs'); let s = fs.readFileSync('test/lang.js', 'utf8');
function rep(a, b, all) { if (!s.includes(a)) { console.log('MISSING ' + a.slice(0, 60)); return; } s = all ? s.split(a).join(b) : s.replace(a, () => b); }
rep("{ S, SC, FIXED,", "{ S, SCN, CB, FRES, HIST_TRAIT, FIXED,");
rep("for (const k of ['S', 'SC', 'FIXED',", "for (const k of ['S', 'SCN', 'CB', 'FRES', 'HIST_TRAIT', 'FIXED',");
rep("  else if (k === 'SC') { for (const sc in v) { walk('SC.' + sc + '.t', v[sc].t); ['intro', 'act', 'inner', 'close'].forEach(kk => walk('SC.' + sc + '.' + kk, v[sc][kk])); } }",
  "  else if (k === 'SCN') { for (const sc in v) { walk('SCN.' + sc + '.t', v[sc].t); walk('SCN.' + sc + '.sum', v[sc].sum); ['open', 'dev', 'inner', 'close'].forEach(kk => walk('SCN.' + sc + '.' + kk, v[sc][kk].map(b => b.p))); } }");
rep("let beats = 0; for (const sc in X.SC) ['intro', 'act', 'inner', 'close'].forEach(k => beats += X.SC[sc][k].length);",
  "let beats = 0, thin = 0; for (const sc in X.SCN) { ['open', 'dev', 'inner', 'close'].forEach(k => { beats += X.SCN[sc][k].length; if (X.SCN[sc][k].length < 5) { thin++; console.log('THIN', sc, k, X.SCN[sc][k].length); } }); if (X.SCN[sc].t.length < 4 || X.SCN[sc].sum.length < 2) { thin++; console.log('THIN-T/S', sc); } } bad += thin;");
rep("Object.keys(X.SC).length", "Object.keys(X.SCN).length", true);
rep("Object.keys(X.SC)", "Object.keys(X.SCN)", true);
rep("Object.keys(X.SC).indexOf(scene)", "Object.keys(X.SCN).indexOf(scene)");
fs.writeFileSync('test/lang.js', s);
