const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:(+process.argv[2]||1)*7919,god:'mercy',lang:'ja'}); RT.policy(process.argv[3]||'basic'); const G=RT.G();
while(!G.awakened) RT.step(1);
for(let i=0;i<8;i++){ const pool=freeAdvs(); const g=topAdvs(8); const e=g.length?bossEstimate(g):null; console.log('t',G.tick,'adv',G.humans.filter(h=>h.alive&&isAdv(h)).length,'free',pool.length,'est',e&&JSON.stringify(e),'raid',G.raidAlive,'townHp',Math.round(G.town.hp)); RT.step(144); }
