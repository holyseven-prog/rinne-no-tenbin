const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:1*7919,god:'mercy',lang:'ja'}); RT.policy('none'); const G=RT.G();
while(!G.awakened) RT.step(1);
console.log('awaken at',G.tick, 'boss hp',G.boss.hp,'dormant',G.boss.dormant, 'mode',G.boss.mode);
let last=G.boss.hp; for(let i=0;i<1500&&!G.ending;i++){ RT.step(1); if(G.boss.hp<last-1){ const near=G.humans.filter(h=>h.alive&&Math.hypot(h.x-G.boss.x,h.y-G.boss.y)<6); console.log('t',G.tick,'boss hp',Math.round(G.boss.hp),'near',near.map(h=>h.name[0]+(h.party?'P':'')+h.lvl).join(','),'bossFight',G.bossFight,'parties',G.parties.filter(p=>p.state!=='done').map(p=>p.state+(p.boss?'B':'')).join('|')); } last=G.boss.hp; }
console.log(JSON.stringify(G.ending), G.bossTries);
