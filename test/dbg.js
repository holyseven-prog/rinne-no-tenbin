const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:131,god:'mercy',lang:'ja'}); RT.policy('none'); const G=RT.G();
G.lastBossTry=1e9; while(!G.awakened) RT.step(1);
console.log('aw',G.awakened,'boss',G.boss.alive,'bf',G.bossFight,'end',G.ending, 'tick',G.tick);
G.lastBossTry=-1e9; tryBossExpedition(true); console.log(G.parties.length, G.bossFight);
