/* debug: which sentences repeat 3+ times in a chronicle (story_check 'rep'). node test/story_rep.js [seed=31] [lang=ja] */
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT; const seed = +process.argv[2] || 31, lang = process.argv[3] || 'ja';
RT.newGame({ seed, god: 'mercy', lang }); RT.policy('basic'); const G = RT.G(); for (let i = 0; i < 40000 && !G.ending; i++) RT.step(1);
const chs = G.chapters.filter(c => c.scene !== 'prologue' && c.scene !== 'recap'); const cnt = {};
chs.forEach(c => { const r = renderChapter(c); r.paras.forEach(p => p.text.replace(/「[^」]*」/g, q => q.replace(/[。！？]/g, '・')).split(/(?<=[。！？])|(?<=」)(?![とっ、。に])/).forEach(z => { z = z.trim(); if (z.length > 4) (cnt[z] = cnt[z] || []).push(c.scene + ':' + (c.evType || c.type || '')); })); });
Object.entries(cnt).filter(([k, v]) => v.length > 2).forEach(([k, v]) => console.log(v.length, k.slice(0, 80), JSON.stringify(v)));
