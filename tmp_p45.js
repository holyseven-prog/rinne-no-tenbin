const fs=require('fs');let st=fs.readFileSync('src/09_story.js','utf8');
function rep(a,b){if(!st.includes(a)){console.log('MISSING '+a.slice(0,60));return;}st=st.replace(a,()=>b);}
rep("pk.open = pickUniq(rg, 'O.' + ch.scene, sc.open.length);","pk.open = pickUniq(rg, 'O.' + ch.scene, sc.open.length, null, CAP);");
rep("pk.close = pickUniq(rg, 'C.' + ch.scene, sc.close.length);","pk.close = pickUniq(rg, 'C.' + ch.scene, sc.close.length, null, CAP);");
rep("ch.th = sc.close[pk.close] ? sc.close[pk.close].th : null;","ch.th = pk.close >= 0 && sc.close[pk.close] ? sc.close[pk.close].th : null;");
rep("paras.push(mk(filler + f(sc.open[pk.open].p), tag));","paras.push(mk(filler + (pk.open >= 0 ? f(sc.open[pk.open].p) : ''), tag));");
rep("paras.push(mk(f(sc.close[pk.close].p), tag));","if (pk.close >= 0) paras.push(mk(f(sc.close[pk.close].p), tag));");
rep("const SC_CD = { betrayal: 500,","const SC_CD = { funeral: 420, betrayal: 500,");
fs.writeFileSync('src/09_story.js',st);
for(const f of ['test/story_check.js','test/rep_dbg.js']){let s=fs.readFileSync(f,'utf8');s=s.replace("p.text.split(","p.text.replace(/「[^」]*」/g,q=>q.replace(/[。！？]/g,'・')).split(");fs.writeFileSync(f,s);}
