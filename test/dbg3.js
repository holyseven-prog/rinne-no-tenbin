const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||"{}");
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const seed=+process.argv[2]||12; RT.newGame({seed:seed*7919,god:'mercy',lang:'ja'}); RT.policy(process.argv[3]||'basic'); const G=RT.G();
let casts=0; G.onCast=r=>{casts++; if(G.bossFight) console.log('   cast',r.pid,r.outcome,'on',r.name&&r.name[0],'faith',Math.round(G.faith));};
while(!G.bossFight && !G.ending) RT.step(1);
console.log('expedition at',G.tick,'faith',Math.round(G.faith),'party',G.parties.filter(p=>p.boss).map(p=>p.members.length));
const bp=G.parties.find(p=>p.boss);
let t=0; while(!G.ending && t<400 && bp.state!=='done'){ RT.step(2); t+=2; const mem=bp.members.map(i=>G.idx[i]).filter(h=>h&&h.alive); if(t%8===0) console.log('t+'+t,'boss',Math.round(G.boss.hp),'state',bp.state,'members',mem.map(h=>Math.round(h.hp/h.maxHp*100)).join(','),'dist',mem.length?Math.round(Math.hypot(mem[0].x-G.boss.x,mem[0].y-G.boss.y)):'-'); }
console.log('result',G.ending&&G.ending.kind,'casts',casts);
