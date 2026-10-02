const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||"{}");
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const seed=+process.argv[2]||3; RT.newGame({seed:seed*7919,god:'mercy',lang:'ja'}); RT.policy(process.argv[3]||'basic'); const G=RT.G();
while(!G.awakened) RT.step(1);
while(!G.ending && G.tick-G.awakenAt<3200){ RT.step(72); const adv=G.humans.filter(h=>h.alive&&isAdv(h)); const pool=G.humans.filter(o=>o.alive&&isAdv(o)&&!o.party&&o.hp>=o.maxHp*0.5&&o.lvl>=5); const grp=topAdvs(8); const est=grp.length?bossEstimate(grp):null;
 console.log('t+'+(G.tick-G.awakenAt),'adv',adv.length,'inParty',adv.filter(h=>h.party).length,'pool',pool.length,'avgHp',Math.round(adv.reduce((a,h)=>a+h.hp/h.maxHp,0)/Math.max(1,adv.length)*100),'ratio',est?est.ratio.toFixed(2):'-','townHp',Math.round(G.town.hp),'raidAlive',G.raidAlive,'cadAlive',G.cadres.filter(i=>G.idx[i].alive).length,'faith',Math.round(G.faith),'pop',G.stats.alive); }
console.log(G.ending&&G.ending.kind);
