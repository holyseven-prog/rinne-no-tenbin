const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const tally={};
for(let s=1;s<=6;s++){ RT.newGame({seed:s*7919,god:'mercy',lang:'ja'}); RT.policy('none'); const G=RT.G();
 G.onDeath=h=>{ const k=(G.awakened?'A':'P')+':'+h.cause+':'+(h.adv||h.retired?'adv':h.child?'child':'civ'); tally[k]=(tally[k]||0)+1; };
 RT.step(30000); console.log('seed',s,G.ending&&G.ending.kind,'year',yearOf(G.tick),'pop',G.stats.alive,'births',G.stats.births,'deaths',G.stats.deaths); }
console.log(tally);
