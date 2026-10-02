const fs = require('fs');
const alts = ['{A}はそう感じた。', '{A}は静かにそう考えた。', '{A}は、心の中でそうつぶやいた。', '{A}はそう思い直した。', '{A}は、そんな気がした。', '{A}は、ふとそう思った。', '{A}はそう信じた。', '{A}は、そう言い聞かせた。', '{A}は、ゆっくりとそう思った。', '{A}は、あらためてそう思った。', '{A}は、胸の中でそう思った。', '{A}は、なぜかそう思った。', '{A}は、そうだと思った。', '{A}は、そう思うことにした。', '{A}は、そう確信した。', '{A}は、そっとそう思った。'];
let k = 0;
for (const f of ['src/09t_growth.js', 'src/09t_loss_war.js', 'src/09t_love.js', 'src/09t_sinfaith.js']) {
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace(/\{A\}は、?そう思った。/g, m => alts[k++ % alts.length]);
  fs.writeFileSync(f, s);
}
console.log('replaced', k);
let st = fs.readFileSync('src/09_story.js', 'utf8');
function rep(a, b) { if (!st.includes(a)) { console.log('MISSING ' + a.slice(0, 60)); return; } st = st.replace(a, () => b); }
rep("  if (ids.length < need && ids.length) { const b = partnerOf(G.idx[ids[0]]); if (b && ids.indexOf(b) < 0) ids.push(b); }", "  if (ids.length < need && ids.length) { const b = partnerOf(G.idx[ids[0]]); if (b && ids.indexOf(b) < 0) ids.push(b); }\n  const fin = () => { if (sc === 'funeral' && ids.length >= 2) { const dd = ids[0]; ids.splice(0, 1); ids.push(dd); } return ids; };");
rep("  while (ids.length < need && pool.length) { const i = rg.int(0, pool.length - 1); ids.push(pool[i].id); pool.splice(i, 1); }\n  return ids;", "  while (ids.length < need && pool.length) { const i = rg.int(0, pool.length - 1); ids.push(pool[i].id); pool.splice(i, 1); }\n  return fin();");
rep("due = arcLive().filter(a => a.parts >= 1 && a.parts < ARC_PARTS && G.tick - a.last >= TUNE_STORY.interlude", "due = arcLive().filter(a => a.parts >= 1 && a.parts < ARC_PARTS && G.tick - a.last >= (a.parts === 1 ? TUNE_STORY.interlude * 0.55 : TUNE_STORY.interlude)");
st = st.replace('gap: 150, slow: 340, interlude: 480', 'gap: 165, slow: 380, interlude: 480');
fs.writeFileSync('src/09_story.js', st);
