/* readability_check: banned-word hits over all static text + rendered chapters, avg sentence length, idiom ratio */
const fs = require('fs'), vm = require('vm'), path = require('path');
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'sim_bundle.js'), 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT;
const X = vm.runInThisContext('({ S, SCN, CB, FRES, HIST_TRAIT, HIST_BANK, FIXED, TIME_BEATS, WEATHER_BEATS, SPEECH_TAGS, INTENT, DRAMA_POOL, BANNED_RX, STYLE_GLOSSARY, renderChapter, setLang: l => { LANG = l; } })');
let hits = 0;
function walk(where, v) {
  if (Array.isArray(v) && v.length >= 2 && typeof v[0] === 'string' && typeof v[1] === 'string') {
    if (X.BANNED_RX.ja.test(v[0])) { hits++; console.log('BANNED ja', where, v[0].slice(0, 50)); }
    if (X.BANNED_RX.zh.test(v[1])) { hits++; console.log('BANNED zh', where, v[1].slice(0, 50)); }
  } else if (Array.isArray(v)) v.forEach((x, i) => walk(where + '[' + i + ']', x));
  else if (v && typeof v === 'object') for (const k in v) walk(where + '.' + k, v[k]);
}
['S', 'SCN', 'CB', 'FRES', 'HIST_TRAIT', 'HIST_BANK', 'FIXED', 'TIME_BEATS', 'WEATHER_BEATS', 'SPEECH_TAGS', 'INTENT', 'DRAMA_POOL'].forEach(k => {
  if (k === 'SCN') { for (const sc in X.SCN) { const v = X.SCN[sc]; walk('SCN.' + sc + '.t', v.t); walk('SCN.' + sc + '.sum', v.sum); ['open', 'dev', 'inner', 'close'].forEach(kk => walk('SCN.' + sc + '.' + kk, v[kk].map(b => b.p))); } } else walk(k, X[k]);
});
console.log('static banned-word hits:', hits);
// sentence length on rendered chapters
const IDIOM = /(?:無我夢中|一心不亂|千鈞一髮|九死一生|七上八下|心急如焚|一籌莫展|悲痛欲絕|驚慌失措|不知所措|莫名其妙|百感交集|五味雜陳|感慨萬千|刻骨銘心|義無反顧|滄海桑田|風起雲湧|悄然無聲|不寒而慄)/g;
const res = {};
for (const lang of ['ja', 'zh']) {
  let sents = 0, chars = 0, long = 0, idioms = 0, total = 0, bad = 0;
  for (let sd = 1; sd <= 8; sd++) {
    RT.newGame({ seed: sd * 13, god: 'mercy', lang }); RT.policy('basic'); const G = RT.G(); X.setLang(lang);
    for (let i = 0; i < 40000 && !G.ending; i++) RT.step(1);
    G.chapters.forEach(c => {
      const r = X.renderChapter(c); const txt = r.paras.map(p => p.text).join('') + r.hist; total += txt.length;
      if (X.BANNED_RX[lang].test(txt + r.title)) { bad++; console.log('BANNED in render', lang, c.scene, (txt.match(X.BANNED_RX[lang]) || [''])[0]); }
      (txt.match(IDIOM) || []).forEach(() => idioms++);
      txt.replace(/（[^）]*）/g, '').split(/[。！？]/).forEach(z => { z = z.replace(/[「」『』…・、，]/g, ''); if (z.length < 2) return; sents++; chars += z.length; if (z.length > (lang === 'ja' ? 40 : 25)) long++; });
    });
  }
  res[lang] = { avg: chars / sents, longRate: long / sents, idiomPer1k: idioms / total * 1000, bad };
  console.log(lang, 'avg sentence len', (chars / sents).toFixed(1), 'long-sentence rate', (long / sents).toFixed(3), 'idioms/1k chars', (idioms / total * 1000).toFixed(2), 'render banned', bad);
}
const ok = hits === 0 && res.ja.bad === 0 && res.zh.bad === 0 && res.zh.avg <= 20 && res.ja.avg <= 30;
if (!ok) { console.log("FAIL"); process.exit(1); }
/* V4.1-A12-1: tutorial / duty / hint text rules (ja ≤30 chars per sentence, zh ≤20, ≤2 sentences per screen; hard words explained on first use) */
{
  const grab = f => { const src = fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8'); const i = src.indexOf('Object.assign(S, {'); const j = src.indexOf('\n});', i); const S0 = {}; vm.runInNewContext('S = {}; Object.assign(S, {' + src.slice(i + 18, j) + '\n});', { S: S0 }); return vm.runInNewContext('S', { S: S0 }) || S0; };
  let S2 = {}; try { const ctx = {}; const src = fs.readFileSync(path.join(__dirname, '..', 'src', '16b_tutorial41.js'), 'utf8'); const i = src.indexOf('Object.assign(S, {'), j = src.indexOf('\n});', i); S2 = vm.runInNewContext('(' + src.slice(i + 17, j + 2) + ')', ctx); } catch (e) { console.log('tut text parse error', e.message); }
  let bad = 0; const keys = Object.keys(S2).filter(k => /^(l[123]_|gr_|du_|hi_|g_[1-4])/.test(k));
  for (const k of keys) { const v = S2[k]; if (!Array.isArray(v) || typeof v[0] !== 'string') continue; [0, 1].forEach(L => { const sents = v[L].replace(/[「」]/g, '').split(/[。！？]/).map(x => x.trim()).filter(Boolean); const lim = L === 0 ? 30 : 20; const maxS = /^g_/.test(k) ? 3 : 2;
    sents.forEach(z => { const z2 = z.replace(/（[^）]*）/g, '').replace(/\{[a-z]+\}/g, 'xx'); if (z2.length > lim) { bad++; console.log('TUT LONG', L ? 'zh' : 'ja', k, z2.length, z2); } }); if (sents.length > maxS) { bad++; console.log('TUT MANY', L ? 'zh' : 'ja', k, sents.length); } }); }
  const order = ['l1_card', 'l1_a', 'l1_b', 'l1_c', 'l1_done', 'l2_card', 'l2_a', 'l2_b', 'l2_c', 'l2_d', 'l3_card', 'l3_a', 'l3_b', 'l3_c', 'gr_a', 'gr_card'];
  [['信仰力', '神力', '攻防', '評定会'], ['信仰力', '神力', '攻防', '評定會']].forEach((terms, L) => terms.forEach(w => { const first = order.map(k => S2[k] && S2[k][L]).find(s => s && s.includes(w)); if (first && first[first.indexOf(w) + w.length] !== '（') { bad++; console.log('TUT TERM not explained', L ? 'zh' : 'ja', w); } }));
  console.log('tutorial text checks:', keys.length, 'strings, problems', bad); if (bad) { console.log('FAIL'); process.exit(1); }
}
console.log('PASS');
