const fs = require('fs'); let st = fs.readFileSync('src/09_story.js', 'utf8');
function rep(a, b) { if (!st.includes(a)) { console.log('MISSING ' + a.slice(0, 60)); return; } st = st.replace(a, () => b); }
rep(" guilt: ['secret'],", "");
rep("  if (arc.kind === 'faith' && m.god) return", "  if (arc.kind === 'sin' && arc.parts >= 2) return 'forgive';\n  if (arc.kind === 'faith' && G.fores.some(f => f.state === 'open' && f.hid === arc.hid && f.type === 'dream' && G.tick - f.planted > 36)) return 'answered';\n  if (arc.kind === 'faith' && m.god) return");
rep("betrayal: ['secret'],", "betrayal: ['secret'],");
rep("const SC_CD = { depart: 700,", "const SC_CD = { betrayal: 500, depart: 700,");
st = st.replace('gap: 165, slow: 380', 'gap: 180, slow: 400');
fs.writeFileSync('src/09_story.js', st);
