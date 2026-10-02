const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||'{}');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const pol=process.argv[2]||'basic';
for(let s=1;s<=30;s++){ RT.newGame({seed:s*7919,god:'mercy',lang:'ja'}); RT.policy(pol); const G=RT.G(); let aw=null, exp=[], cad=0;
 G.onEvent=e=>{ if(e.type==='boss_awaken') aw={t:G.tick,faith:Math.round(G.faith),adv:G.humans.filter(h=>h.alive&&isAdv(h)).length,lv:Math.round(G.humans.filter(h=>h.alive&&isAdv(h)).reduce((a,h)=>a+h.lvl,0)/Math.max(1,G.humans.filter(h=>h.alive&&isAdv(h)).length))};
   if(e.type==='boss_expedition') exp.push('E@'+(G.tick-(aw?aw.t:0))+'f'+Math.round(G.faith)); if(e.type==='cadre_slain') cad++; if(e.type==='quest_fail'&&e.payload.q==='boss') exp.push('wipe'); };
 RT.step(30000);
 console.log(s,G.ending.kind.padEnd(8),'aw',JSON.stringify(aw),'exp',exp.join(','),'cad',cad,'alive adv',G.humans.filter(h=>h.alive&&isAdv(h)).length,'tries',G.bossTries);
}
