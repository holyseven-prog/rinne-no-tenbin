const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:3*7919,god:'mercy',lang:'ja'}); RT.policy('none'); const G=RT.G();
const T0=+process.argv[2]||5800, T1=+process.argv[3]||6500;
RT.step(T0-G.tick);
let tracked=null;
while(G.tick<T1){ RT.step(1);
 for(const p of G.parties){ if(p.state!=='done' && (!p.logged)){ p.logged=1; const q=G.qidx[p.q]; console.log('PARTY t',G.tick,'q',q.type,'T'+q.tier,'need',q.need,'@',q.tx,q.ty,'members',p.members.map(i=>{const h=G.idx[i];return h.job[0]+h.lvl+'g'+h.gear+'p'+h.pots}).join(' ')); } 
 if(p.state!=='done'&&p.logged&&G.tick%10===0&&p.q){ const q=G.qidx[p.q]; if(q&&q.tier>=2){ const mem=p.members.map(i=>G.idx[i]).filter(h=>h&&h.alive); const lead=mem[0]; if(lead) console.log('  t',G.tick,p.state,'kills',p.kills,'/',q.need,'mem',mem.map(h=>Math.round(h.hp/h.maxHp*100)).join(','),'near',G.monsters.filter(m=>m.alive&&!m.dormant&&Math.hypot(m.x-lead.x,m.y-lead.y)<9).map(m=>m.type+Math.round(m.hp)).join(' ')); } } }
}
