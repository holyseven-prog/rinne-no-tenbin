const fs = require('fs'); let s = fs.readFileSync('build.js', 'utf8');
s = s.replace("if(sub==='title'&&/^title_logo_(ja|zh)\\.png$/.test(f)) continue; ", "if(sub==='text'&&/^txt_title_/.test(f)) continue; /* same picture as logo/ */ ");
fs.writeFileSync('build.js', s); console.log(s.includes("txt_title_"));
