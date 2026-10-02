const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:11,god:'mercy',lang:'ja'}); RT.policy('none'); const G=RT.G();
RT.step(1500);
while(G.humans.filter(h=>h.alive).length<80){ const h=mkHuman({job:['farmer','swordsman','merchant','mage','thief','priest','smith','herbalist'][G.nid%8],age:25,lvl:3,home:W.homes[G.nid%W.homes.length]}); const d=homeDoor(h); const p=nearestWalkable(d.x,d.y); placeAt(h,p.x,p.y); G.humans.push(h); G.idx[h.id]=h; }
for(let i=0;i<60;i++){ spawnMonster(1); }
const t0=process.hrtime.bigint(); const N=1500; RT.step(N); const ms=Number(process.hrtime.bigint()-t0)/1e6;
console.log('pop',G.humans.filter(h=>h.alive).length,'monsters',G.monsters.filter(m=>m.alive).length,'ms/tick',(ms/N).toFixed(3),'=> at x64 (153 ticks/s):',(ms/N*153).toFixed(1),'ms per second of wall time');
