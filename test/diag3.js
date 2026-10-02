const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const R2=globalThis.__RT; R2.newGame({seed:1}); const G=R2.G(); const k=hById0('kyle');
console.log(walkable(19,13),walkable(19,14),walkable(19,12), W.tiles[13*MW+19], findPath(19,13,50,23,1));
console.log('quest',G.quests.map(q=>[q.type,q.tier,q.tx,q.ty,walkable(q.tx,q.ty)]));
const gp=G.parties[0]; console.log('party',gp&&JSON.stringify({s:gp.state,goal:gp.goal,m:gp.members}));
R2.step(170); const p=G.parties[0]; console.log('party',JSON.stringify({s:p.state,goal:p.goal,m:p.members,lead:p.leader}), 'kyle',k.x,k.y,k.path.length,k.pfail);
console.log('astar kyle->goal',findPath(k.x,k.y,p.goal.x,p.goal.y,1,1800));
