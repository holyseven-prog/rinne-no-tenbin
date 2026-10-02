const fs=require('fs'),vm=require('vm'),path=require('path');
for(const f of fs.readdirSync('src').filter(f=>f.endsWith('.js')).sort()){
  try{ new vm.Script(fs.readFileSync('src/'+f,'utf8'),{filename:f}); console.log('ok',f);}catch(e){ console.log('ERR',f,e.message, (e.stack||'').split('\n').slice(0,3).join(' | ')); }
}
