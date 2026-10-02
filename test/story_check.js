/* story_check: node test/story_check.js [nSeeds=30] [policy=basic]  — R3 metrics over seeds x {ja,zh} */
const fs = require('fs'), vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT;
const X = vm.runInThisContext('({ SWORD_RX, MAGE_RX })');
const ZH_SWORD = /劍|刀|鞘/, ZH_MAGE = /魔法|魔力|咒文|法杖|魔導/;
const strip = t => t.replace(/（[^）]*）/g, '');
const N = +process.argv[2] || 30, POL = process.argv[3] || 'basic', VERB = process.argv[4] === 'v';
const gods = ['mercy', 'mercy', 'mercy'];
const rows = []; let fail = 0;
for (const lang of ['ja', 'zh']) {
  for (let s = 1; s <= N; s++) {
    RT.newGame({ seed: s * 7 + 3, god: gods[s % gods.length], lang }); RT.policy(POL); const G = RT.G();
    for (let i = 0; i < 40000 && !G.ending; i++) RT.step(1);
    const chs = G.chapters.filter(c => c.scene !== 'prologue' && c.scene !== 'recap');
    const R = chs.map(c => ({ c, r: renderChapter(c) }));
    const titles = R.map(x => x.r.bare); const uTitle = new Set(titles).size / Math.max(1, titles.length);
    const sents = []; R.forEach(x => x.r.paras.forEach(p => p.text.replace(/「[^」]*」/g,q=>q.replace(/[。！？]/g,'・')).split(/(?<=[。！？])|(?<=」)(?![とっ、。に])/).forEach(z => { z = z.trim(); if (z.length > 4) sents.push(z); })));
    const cnt = {}; sents.forEach(z => cnt[z] = (cnt[z] || 0) + 1); const uSent = Object.keys(cnt).length / Math.max(1, sents.length); const maxRep = Math.max(0, ...Object.values(cnt));
    let run = 1, maxRun = 1; for (let i = 1; i < titles.length; i++) { run = titles[i] === titles[i - 1] ? run + 1 : 1; maxRun = Math.max(maxRun, run); }
    const arcs = G.arcs.filter(a => a.kind !== 'war' && a.parts >= 1); const arcOk = arcs.filter(a => a.parts >= 2).length / Math.max(1, arcs.length);
    const p2 = chs.filter(c => c.k >= 2); const recapOk = p2.length ? p2.filter(c => c.recap).length / p2.length : 1;
    const endT = G.tick, fo = G.fores.filter(f => f.planted < endT - 3 * 1728); const resolved = fo.filter(f => f.state === 'done').length; const foRate = fo.length ? resolved / fo.length : 1;
    const hdrOk = R.filter(x => x.c.who && x.c.who.length).every(x => x.r.head.indexOf(x.c.an[x.c.who[0]][lang === 'ja' ? 0 : 1]) >= 0);
    const noProt = R.filter(x => !x.c.fixedKey && !(x.c.who && x.c.who.length)).length;
    const leak = R.some(x => /\{[A-Za-z]+\}/.test(x.r.title + x.r.paras.map(p => p.text).join('')));
    const scenes = new Set(chs.map(c => c.scene)).size;
    const nonFix = R.filter(x => !x.c.fixedKey);
    let jobBad = 0; nonFix.forEach(x => { const job = x.c.info && x.c.a[0] && x.c.info[x.c.a[0]] ? x.c.info[x.c.a[0]].job : ''; let txt = strip(x.r.title + x.r.paras.map(p => p.text).join('')); if (x.c.M) txt = txt.split(x.c.M[lang === 'ja' ? 0 : 1]).join(''); const sw = lang === 'ja' ? X.SWORD_RX : ZH_SWORD, mg = lang === 'ja' ? X.MAGE_RX : ZH_MAGE; if ((job !== 'swordsman' && sw.test(txt)) || (job !== 'mage' && mg.test(txt))) { jobBad++; if (VERB) console.log('JOBNOUN', lang, x.c.scene, job, strip(txt).match(sw.test(txt) ? sw : mg)); } });
    const noRel = nonFix.filter(x => x.c.a.length >= 2 && x.c.who.length === 2 && !(x.c.info[x.c.a[1]] || {}).rel).length;
    let badProm = 0; chs.forEach(c => (c.cbs || []).forEach(cb => { if (cb.ty === 'promise') { const ref = G.chapters.find(z => z.id === cb.v.ref); if (!ref || !ref.promised || ref.id >= c.id) badProm++; } }));
    const first8 = chs.slice(0, 8); const mainShare = first8.length ? first8.filter(c => c.who && c.who.indexOf(c.mainId) >= 0).length / first8.length : 1;
    const nonMain = nonFix.filter(x => x.c.mainId && x.c.who.length && x.c.who.indexOf(x.c.mainId) < 0); const transOk = nonMain.every(x => x.c.mainNm && x.r.paras[0].text.indexOf(x.c.mainNm[lang === 'ja' ? 0 : 1]) >= 0);
    const early = chs.filter(c => c.t < 36 + 3 * 1728).length;
    const row = { lang, seed: s * 7 + 3, ch: chs.length, uTitle, uSent, maxRep, maxRun, arcOk, recapOk, foRate, hdrOk, noProt, leak, scenes, jobBad, noRel, badProm, mainShare, transOk, early, end: G.ending && G.ending.kind };
    rows.push(row);
    const bad = [chs.length < 50 || chs.length > 95 ? 'count' : '', uTitle < 0.6 ? 'title' : '', uSent < 0.85 ? 'sent' : '', maxRep > 2 ? 'rep' : '', maxRun >= 5 ? 'run' : '', !hdrOk || noProt ? 'hdr' : '', leak ? 'leak' : '', jobBad ? 'jobnoun' : '', noRel ? 'norel' : '', badProm ? 'promise' : '', mainShare < 0.6 ? 'main' : '', !transOk ? 'trans' : '', early > 8 ? 'early' : ''].filter(Boolean);
    if (bad.length) fail++;
    if (VERB || bad.length) console.log(lang, row.seed, 'ch', row.ch, 'T', uTitle.toFixed(2), 'S', uSent.toFixed(2), 'rep', maxRep, 'run', maxRun, 'arc', arcOk.toFixed(2), 'rc', recapOk.toFixed(2), 'fo', foRate.toFixed(2), 'sc', scenes, row.end, bad.join(','));
  }
}
const avg = k => (rows.reduce((a, r) => a + (+r[k] || 0), 0) / rows.length).toFixed(2);
console.log('AVG ch', avg('ch'), 'uTitle', avg('uTitle'), 'uSent', avg('uSent'), 'maxRep', avg('maxRep'), 'arcOk', avg('arcOk'), 'recapOk', avg('recapOk'), 'foRate', avg('foRate'), 'scenes', avg('scenes'), 'mainShare', avg('mainShare'), 'early', avg('early'));
const aggBad = []; if (+avg('arcOk') < 0.7) aggBad.push('arcOk'); if (+avg('recapOk') < 0.8) aggBad.push('recapOk'); if (+avg('foRate') < 0.5) aggBad.push('foRate'); if (+avg('ch') < 60 || +avg('ch') > 80) aggBad.push('chAvg'); if (aggBad.length) { console.log('AGG FAIL', aggBad.join(',')); fail++; }
console.log(fail ? 'FAIL ' + fail + '/' + rows.length : 'PASS all ' + rows.length);
process.exit(fail ? 1 : 0);
