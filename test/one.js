const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||'{}');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; const s=+process.argv[2]||1, pol=process.argv[3]||'basic';
RT.newGame({seed:s*7919,god:'mercy',lang:'ja'}); RT.policy(pol); const G=RT.G(); const t0=Date.now();
for(let i=0;i<600 && !G.ending;i++){ RT.step(50); if(Date.now()-t0>40000){ console.log('SLOW at tick',G.tick); break; } }
console.log(s,pol,G.ending&&G.ending.kind,'tick',G.tick,'ms',Date.now()-t0,'pop',G.stats.alive,'mons',G.monsters.length,'events',G.events.length,'prayers',G.prayers.length);
