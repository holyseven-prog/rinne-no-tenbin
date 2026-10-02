const fs=require('fs');let s=fs.readFileSync('src/11d_world.js','utf8');
function rep(a,b){const k=s.indexOf(a);if(k<0){console.log('MISSING '+a.slice(0,70));return;}s=s.slice(0,k)+b+s.slice(k+a.length);}
rep("grass: ['#5cb44a', '#46a03c', '#b0a448', '#dfe9f1']","grass: ['#5cb44a', '#46a03c', '#a49e42', '#dfe9f1']");
rep("const n = sea === 3 ? 2 : 4;","const n = sea === 3 ? 1 : 3;");
rep("const kind = v < 0.55 ? 0 : v < 0.85 ? 1 : 2; const leaf = seaRamp('leaf', sea);","const kind = v < 0.6 ? 0 : v < 0.93 ? 1 : 2; const leaf = seaRamp('leaf', sea);");
rep("const cx = x + 8; for (let t = 0; t < 3; t++) { const top = y - 6 + t * 5, wd = 3 + t * 2; for (let r = 0; r < 6; r++) { const w = Math.min(wd + r, wd + 5); fr(c, leaf.o,","const leaf = seaRamp('pine', sea); const cx = x + 8; for (let t = 0; t < 3; t++) { const top = y - 6 + t * 5, wd = 3 + t * 2; for (let r = 0; r < 6; r++) { const w = Math.min(wd + r, wd + 5); fr(c, leaf.o,");
rep("leaf: ['#3f9c46', '#2f8a3a', '#d4782e', '#8fa6a0'],","leaf: ['#3f9c46', '#2f8a3a', '#d4782e', '#8fa6a0'], pine: ['#2c7a42', '#236a38', '#2c6a40', '#7a9a92'],");
rep("if (sea === 3 && hsh(tx, ty, 103) < 0.5) fr(c, '#fafcff'","if (sea === 3 && hsh(tx, ty, 103) < 0.3) fr(c, '#fafcff'");
rep("if (sea === 3) { if (R(58) < 0.5) {","if (sea === 3) { if (R(58) < 0.35) {");
rep("if (R(61) < 0.16) { fr(c, '#fff', x + 5, y + 5, 1, 1); fr(c, '#fff', x + 4, y + 6, 3, 1); fr(c, '#fff', x + 5, y + 7, 1, 1); }","if (R(61) < 0.07) { fr(c, '#fff', x + 5, y + 5, 1, 1); fr(c, '#fff', x + 4, y + 6, 3, 1); fr(c, '#fff', x + 5, y + 7, 1, 1); }");
fs.writeFileSync('src/11d_world.js',s);
