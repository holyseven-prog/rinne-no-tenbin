const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:(+process.argv[2]||1)*7919,god:'mercy',lang:'ja'}); RT.policy(process.argv[3]||'none'); const G=RT.G();
G.onEvent=ev=>{ if(['boss_awaken','monster_raid','cadre_slain','boss_expedition','boss_slain','quest_fail','boss_sortie'].includes(ev.type)) console.log('EV t',G.tick,'y',yearOf(G.tick),ev.type,JSON.stringify(ev.payload),ev.actors.length); };
G.onDeath=h=>{ if(h.adv||h.job==='priest') console.log('  DEATH',h.name[0],h.job,h.lvl,'y',yearOf(G.tick),'at',Math.round(h.x),Math.round(h.y)) };
for(let i=0;i<30000&&!G.ending;i++){ RT.step(1); if(G.tick%1728===0){ const a=G.humans.filter(h=>h.alive&&isAdv(h)); console.log('YEAR',yearOf(G.tick),'adv',a.length,'lv',a.map(h=>h.lvl+'g'+h.gear).join(','),'pop',G.stats.alive,'bal',Math.round(G.balance),'townHp',Math.round(G.town.hp));} }
console.log(JSON.stringify(G.ending),'tries',G.bossTries,'cad alive',G.cadres.filter(i=>G.idx[i].alive).length);
