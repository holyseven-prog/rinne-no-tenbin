const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:(+process.argv[2]||1)*7919,god:'mercy',lang:'ja'}); RT.policy(process.argv[3]||'basic'); const G=RT.G();
const casts={}; G.onCast=r=>{const k=r.pid+':'+r.outcome; casts[k]=(casts[k]||0)+1;};
while(!G.ending && G.tick<30000){ RT.step(144*6); const s=RT.state(); console.log('y'+yearOf(G.tick),'d'+(dayIdx(G.tick)%12),'faith',s.faith,'bal',s.balance,'pop',s.pop,'adv',s.adv,'prayers',s.prayers,'ans',G.stats.answered+'/'+G.stats.prayers,'casts',G.stats.casts); }
console.log(casts, G.ending);
