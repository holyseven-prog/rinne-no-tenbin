const fs=require('fs');let s=fs.readFileSync('src/09_story.js','utf8');
const a="if (G.tick - ((G.lastScene || {})[sc] || -999) < 150) continue;";
const b="if (G.tick - ((G.lastScene || {})[sc] || -999) < (SC_CD[sc] || 150)) continue;";
if(!s.includes(a))console.log('miss1');s=s.replace(a,b);
const c="G.events.forEach(e => { if (!e.used && e.type === best.type && Math.abs(e.t - best.t) < 12) { noteEvent(e); } });";
const d="G.events.forEach(e => { if (!e.used && ((e.type === best.type && Math.abs(e.t - best.t) < 12) || (e.t < best.t && !FORCE_EV[e.type]))) { noteEvent(e); } });";
if(!s.includes(c))console.log('miss2');s=s.replace(c,d);
s=s.replace("const TUNE_STORY =","const SC_CD = { depart: 700, return: 700, unanswered: 900, doubt: 500, answered: 400, g_gear: 900, birth: 300 };\nconst TUNE_STORY =");
fs.writeFileSync('src/09_story.js',s);
