const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||"{}");
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const seed=+process.argv[2]||1; RT.newGame({seed:seed*7919,god:'mercy',lang:'ja'}); RT.policy('basic'); const G=RT.G();
G.onCast=r=>{ if(G.awakened) console.log('t',G.tick-G.awakenAt,'cast',r.pid,r.outcome,'cost',r.cost,'->faith',Math.round(G.faith), 'raidAlive',G.raidAlive); };
while(!G.awakened) RT.step(1);
console.log('awaken faith',Math.round(G.faith));
while(!G.bossFight && !G.ending) RT.step(1);
console.log('expedition t+',G.tick-G.awakenAt,'faith',Math.round(G.faith));
