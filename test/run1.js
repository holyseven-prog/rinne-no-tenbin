const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;
const seed=+process.argv[2]||1, pol=process.argv[3]||'none';
RT.newGame({seed,god:'mercy',lang:'ja'}); RT.policy(pol);
let t0=Date.now();
for(let i=0;i<40000 && !RT.G().ending;i++){ RT.step(1); if(i%1728==0){const s=RT.state();console.log(s.year,'pop',s.pop,'adv',s.adv,'faith',s.faith,'bal',s.balance,'mon',s.monsters,'townHp',s.townHp,'food',s.food,'pray',s.prayers,JSON.stringify({k:s.stats.kills,d:s.stats.deaths,a:s.stats.answered,p:s.stats.prayers}))} }
console.log(JSON.stringify(RT.state()),Date.now()-t0,'ms');
