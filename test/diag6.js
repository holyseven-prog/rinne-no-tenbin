const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:(+process.argv[4]||3)*7919,god:"mercy",lang:"ja"}); RT.policy(process.argv[5]||"none"); const G=RT.G();
const T0=+process.argv[2], T1=+process.argv[3];
RT.step(T0-G.tick);
while(G.tick<T1){ RT.step(8);
 const rm=G.monsters.filter(m=>m.alive&&!m.dormant&&m.mode==='raid');
 const adv=G.humans.filter(h=>h.alive&&canFight(h));
 console.log(G.tick,'raid',rm.map(m=>m.type[0]+Math.round(m.hp)+'@'+Math.round(m.x)+','+Math.round(m.y)).join(' '),'| adv',adv.map(h=>h.name[0].slice(0,2)+Math.round(h.hp/h.maxHp*100)+'@'+Math.round(h.x)+','+Math.round(h.y)+':'+(h.tgt?'T':(h.act?h.act.k:'-'))).join(' '));
}
