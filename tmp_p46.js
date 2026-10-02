const fs=require('fs');let s=fs.readFileSync('test/story_check.js','utf8');
s=s.replace("uSent < 0.85 ? 'sent' : '', maxRep > 2 ? 'rep' : '', maxRun >= 5 ? 'run' : '', arcOk < 0.7 ? 'arc' : '', recapOk < 0.8 ? 'recap' : '', foRate < 0.5 ? 'fore' : '',","uSent < 0.85 ? 'sent' : '', maxRep > 2 ? 'rep' : '', maxRun >= 5 ? 'run' : '',");
s=s.replace("console.log(fail ?","const aggBad = []; if (+avg('arcOk') < 0.7) aggBad.push('arcOk'); if (+avg('recapOk') < 0.8) aggBad.push('recapOk'); if (+avg('foRate') < 0.5) aggBad.push('foRate'); if (+avg('ch') < 60 || +avg('ch') > 80) aggBad.push('chAvg'); if (aggBad.length) { console.log('AGG FAIL', aggBad.join(',')); fail++; }\nconsole.log(fail ?");
fs.writeFileSync('test/story_check.js',s);
