const fs=require('fs');
let n=0;const alts=['{A}は、小さくそう感じた。','{A}は、じんわりとそう感じた。','{A}は、確かにそう感じとった。'];
for(const f of ['src/09t_growth.js','src/09t_loss_war.js','src/09t_love.js','src/09t_sinfaith.js']){let s=fs.readFileSync(f,'utf8');s=s.replace(/\{A\}は、?そう感じた。/g,m=>{n++;return n===1?m:alts[(n-2)%alts.length];});fs.writeFileSync(f,s);}
let st=fs.readFileSync('src/09_story.js','utf8');
function rep(a,b){if(!st.includes(a)){console.log('MISSING '+a.slice(0,60));return;}st=st.replace(a,()=>b);}
rep("  const since = G.tick - (G.lastChapTick || 0);","  const since = (G.tick - (G.lastChapTick || 0)) / (1 + Math.max(0, G.chapNo - 55) / 40);");
fs.writeFileSync('src/09_story.js',st);console.log(n);
