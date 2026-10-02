const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:5,god:'mercy',lang:'ja'}); const G=RT.G();
for(let k=0;k<6;k++){ RT.step(144); const hs=G.humans.filter(h=>h.alive).map(h=>Math.round(h.needs.hunger)); const hi=G.humans.filter(h=>h.alive&&h.needs.hunger>=85); console.log('day',k+1,'food',Math.round(G.town.food),'hungry>=85:',hi.length, hi.map(h=>h.job[0]+':'+(h.act?h.act.k+h.act.st:'-')+'@'+Math.round(h.x)+','+Math.round(h.y)).join(' '), 'prayers',G.stats.prayers); }
