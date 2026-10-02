/* reader_check (F0): simulate a reader who only knows what earlier pages said. node test/reader_check.js [seeds=30] */
const fs = require('fs'), vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT; const N = +process.argv[2] || 30, POL = process.argv[3] || 'basic';
let games = 0, chaps = 0, nameBad = 0, refBad = 0, elemBad = 0, ex = [];
for (const lang of ['ja', 'zh']) {
  const L = lang === 'ja' ? 0 : 1;
  for (let sd = 1; sd <= N; sd++) {
    RT.newGame({ seed: sd * 11 + 5, god: 'mercy', lang }); RT.policy(POL); const G = RT.G();
    for (let i = 0; i < 40000 && !G.ending; i++) RT.step(1);
    games++;
    const names = new Set(); G.humans.forEach(h => names.add(h.name[L])); G.chapters.forEach(c => Object.values(c.an || {}).forEach(n => names.add(n[L])));
    const known = new Set();
    G.chapters.forEach(c => {
      if (c.fixedKey || c.scene === 'prologue' || c.scene === 'recap') { const r0 = renderChapter(c); const t0 = r0.title + r0.head + r0.paras.map(p => p.text).join(''); names.forEach(n => { if (t0.includes(n)) known.add(n); }); return; }
      chaps++;
      const r = renderChapter(c); const body = r.paras.map(p => p.text).join('\n'); const all = r.title + '\n' + r.head + '\n' + (r.recap || '') + '\n' + body;
      names.forEach(n => {
        if (n.length < 2 || !all.includes(n) || known.has(n)) return; if (c.V && c.V[L] === n && c.scene.indexOf('echo') >= 0 || c.scene === 'awakening' || c.scene === 'reunion') return; if (c.M && c.M[L].includes(n)) return; if (n === 'ベン' && !/ベン[^チ]/.test(all)) return;
        // first mention anywhere on this page must be introduced: "名前（職・関係）" or listed in the header with job
        const hdrIntro = r.head.includes(n + '（') || r.head.includes(n + (L ? '(' : '('));
        const k = body.indexOf(n); const bodyIntro = k >= 0 && body.slice(k + n.length, k + n.length + 1) === '（';
        const recapIntro = r.recap && r.recap.includes(n);
        if (!(bodyIntro || (hdrIntro && k < 0) || hdrIntro)) { if (!recapIntro) { nameBad++; if (ex.length < 6) ex.push(lang + ' seed' + (sd * 11 + 5) + ' ch' + c.no + ' ' + c.scene + ' name ' + n); } }
      });
      names.forEach(n => { if (all.includes(n)) known.add(n); });
      (c.cbs || []).forEach(cb => { if (cb.ty === 'promise') { const ref = G.chapters.find(z => z.id === cb.v.ref); if (!ref || ref.id >= c.id || !ref.promised) { refBad++; ex.push('promise ref ' + c.no); } } });
      const hasWho = c.who && c.who.length && r.head.includes((c.an[c.who[0]] || [''])[L]); const hasPlace = /｜/.test(r.head); const enough = r.paras.length >= 4;
      if (!(hasWho && hasPlace && enough)) { elemBad++; if (ex.length < 12) ex.push('  detail who=' + hasWho + ' place=' + hasPlace + ' paras=' + r.paras.length + ' seed' + (sd * 11 + 5) + ' ' + lang); if (ex.length < 6) ex.push(lang + ' ch' + c.no + ' ' + c.scene + ' elements'); }
    });
  }
}
console.log('games', games, 'chapters', chaps, '| unintroduced names', nameBad, '| bad refs', refBad, '| chapters missing basic elements', elemBad, '(' + (100 * elemBad / chaps).toFixed(1) + '%)');
ex.forEach(e => console.log('  ', e));
const ok = nameBad === 0 && refBad === 0 && elemBad / chaps <= 0.05; console.log(ok ? 'PASS' : 'FAIL'); process.exit(ok ? 0 : 1);
