const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||'{}');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const rows=[];
const adv=+process.argv[2]||40;
for(let s=1;s<=adv;s++){ RT.newGame({seed:s*131,god:'mercy',lang:'ja'}); RT.policy('none'); const G=RT.G();
  G.lastBossTry=1e9; while(!G.awakened) RT.step(1);
  // advance a random number of days to vary
  RT.step(rint(0,2)*144);
  const grp=topAdvs(8); if(grp.length<4) {continue;}
  grp.forEach(h=>{h.hp=h.maxHp;});
  const est=bossEstimate(grp); G.boss.dormant=false;
  G.lastBossTry=-1e9; tryBossExpedition(true);
  const bp=G.parties.find(p=>p.boss); if(!bp){console.log("nobp seed",s,G.bossFight,G.ending,G.boss.alive,grp.length); continue;}
  let t=0; while(!G.ending && t<1500){ RT.step(1); t++; if(bp.state==='done'||bp.state==='return') break; }
  rows.push({r:est.ratio, win:!G.boss.alive, n:grp.length, avgLv:grp.reduce((a,h)=>a+h.lvl,0)/grp.length, hpLeft:G.boss.hp/G.boss.maxHp});
}
rows.sort((a,b)=>a.r-b.r);
for(const r of rows) console.log(r.r.toFixed(2), r.win?'WIN ':'lose', 'n'+r.n,'lv'+r.avgLv.toFixed(1),'bossHp'+(r.hpLeft*100).toFixed(0)+'%');
