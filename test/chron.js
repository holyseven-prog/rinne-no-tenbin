const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT; RT.newGame({seed:+process.argv[2]||5,god:'mercy',lang:process.argv[3]||'ja'}); RT.policy('basic'); const G=RT.G();
RT.step(30000);
console.log('chapters',G.chapters.length,'ending',G.ending&&G.ending.kind);
const cnt={}; G.chapters.forEach(c=>cnt[c.scene]=(cnt[c.scene]||0)+1); console.log(JSON.stringify(cnt));
const L=process.argv[3]||'ja'; LANG=L; // global LANG assignment
const txt=RT.chronicle();
console.log(txt.slice(0,2600));
console.log('LEAK', /\{[A-Za-z]\}|\?\?/.test(txt), (txt.match(/\{[A-Za-z]+\}/g)||[]).slice(0,5));
