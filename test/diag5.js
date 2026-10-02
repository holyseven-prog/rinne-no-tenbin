const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:(+process.argv[2]||1)*7919,god:'mercy',lang:'ja'}); RT.policy(process.argv[3]||'none'); const G=RT.G();
G.onDeath=h=>{ if(h.adv&&h.age>=16){ const near=G.monsters.filter(m=>m.alive&&Math.hypot(m.x-h.x,m.y-h.y)<7).map(m=>m.type+(m.mode==='raid'?'R':'')+Math.round(m.hp)); const al=G.humans.filter(o=>o.alive&&canFight(o)&&Math.hypot(o.x-h.x,o.y-h.y)<7).length; console.log('DEATH y',yearOf(G.tick),'t',G.tick,h.name[0],h.job,'lv',h.lvl,'g',h.gear,'party',h.party?'Y':'N','pots',h.pots,'allies',al,'enemies',near.join(' ')); } };
RT.step(+process.argv[4]||12000);
