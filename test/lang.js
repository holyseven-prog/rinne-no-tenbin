const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '../src');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
vm.runInThisContext(files.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n') + '\n;globalThis.__X = { S, SC, FIXED, TIME_BEATS, WEATHER_BEATS, SPEECH_TAGS, INTENT, HIST_BANK, DRAMA_POOL, NAMES_M, NAMES_F, JOBS, MONS, CADRES, BOSS, TRAITS, PLACES, POWERS, GODS, EVL, PRAYER_KINDS, makeChapter, renderChapter, chronSupplement, newGame, G: () => G, setLang: l => { LANG = l; }, SONGS };', { filename: 'all' });
const X = globalThis.__X; const RT = globalThis.__RT;
const KANA = /[぀-ゟ゠-ヺー-ヿ]/;
const TRAD = /[這們麼裡嗎說讓對來應點擊單讀檔歲與從戰鬥體驗變轉會當關]/;
const JPN = /[気剣覚転続戦験変関応読聴体会当対単歳点撃説譲来与従]/;
let bad = 0, pairs = 0;
function chk(where, p) {
  if (!Array.isArray(p) || p.length !== 2 || typeof p[0] !== 'string' || typeof p[1] !== 'string') { console.log('NOT-PAIR', where, JSON.stringify(p).slice(0, 80)); bad++; return; }
  pairs++;
  if (!p[0].length || !p[1].length) { console.log('EMPTY', where); bad++; }
  if (KANA.test(p[1])) { console.log('KANA-IN-ZH', where, p[1].slice(0, 40)); bad++; }
  if (TRAD.test(p[0])) { console.log('TRAD-IN-JA', where, p[0].slice(0, 40)); bad++; }
  if (JPN.test(p[1])) { console.log('JPNCHAR-IN-ZH', where, p[1].match(JPN)[0], p[1].slice(0, 40)); bad++; }
  if (/\?\?/.test(p[0] + p[1])) { console.log('QQ', where); bad++; }
}
function walk(where, v) { if (Array.isArray(v) && v.length === 2 && typeof v[0] === 'string') chk(where, v); else if (Array.isArray(v)) v.forEach((x, i) => walk(where + '[' + i + ']', x)); else if (v && typeof v === 'object') for (const k in v) walk(where + '.' + k, v[k]); }
for (const k of ['S', 'SC', 'FIXED', 'TIME_BEATS', 'WEATHER_BEATS', 'SPEECH_TAGS', 'INTENT', 'HIST_BANK', 'DRAMA_POOL', 'JOBS', 'MONS', 'CADRES', 'BOSS', 'TRAITS', 'PLACES', 'POWERS', 'GODS', 'EVL']) {
  const v = X[k];
  if (k === 'JOBS' || k === 'MONS' || k === 'CADRES') { for (const kk in v) walk(k + '.' + kk + '.n', v[kk].n); }
  else if (k === 'BOSS') walk('BOSS.n', v.n);
  else if (k === 'POWERS') v.forEach(p => { walk('POWERS.' + p.id + '.n', p.n); walk('POWERS.' + p.id + '.d', p.d); });
  else if (k === 'GODS') v.forEach(p => { walk('GODS.' + p.id + '.n', p.n); walk('GODS.' + p.id + '.d', p.d); });
  else if (k === 'SC') { for (const sc in v) { walk('SC.' + sc + '.t', v[sc].t); ['intro', 'act', 'inner', 'close'].forEach(kk => walk('SC.' + sc + '.' + kk, v[sc][kk])); } }
  else if (k === 'FIXED') { for (const sc in v) { walk('FIXED.' + sc + '.t', v[sc].t); walk('FIXED.' + sc + '.paras', v[sc].paras); } }
  else if (k === 'EVL') { for (const kk in v) if (v[kk]) walk('EVL.' + kk, v[kk]); }
  else walk(k, v);
}
X.NAMES_M.forEach((n, i) => walk('NAMES_M' + i, n)); X.NAMES_F.forEach((n, i) => walk('NAMES_F' + i, n));
// S season / vol / help_body
walk('S.help_body', X.S.help_body);
console.log('static pairs checked:', pairs, 'bad:', bad);
// beats count
let beats = 0; for (const sc in X.SC) ['intro', 'act', 'inner', 'close'].forEach(k => beats += X.SC[sc][k].length);
const talkLines = Object.values(X.INTENT).reduce((a, o) => a + Object.keys(o).length, 0);
console.log('scene beats:', beats, 'dialogue lines:', talkLines, 'scenes:', Object.keys(X.SC).length, 'hist bank:', Object.values(X.HIST_BANK).reduce((a, b) => a + b.length, 0), 'S keys:', Object.keys(X.S).length);
// render all scenes in both languages with several seeds
let rbad = 0, total = 0; const uniq = new Set();
for (const lang of ['ja', 'zh']) {
  X.newGame({ seed: 77, god: 'mercy', lang }); const G = X.G();
  for (let s = 0; s < 6; s++) {
    for (const scene of Object.keys(X.SC)) {
      const hs = G.humans.filter(h => h.alive); const a = hs[(s * 3) % hs.length], b = hs[(s * 3 + 7) % hs.length], c = hs[(s * 3 + 11) % hs.length];
      const ev = { id: 1000 + s * 50 + Object.keys(X.SC).indexOf(scene), t: G.tick, type: 'x', actors: [a.id, b.id], payload: { mon: 'goblin', n: 12, reward: 30, prev: ['ミレイ', '米蕾'], tier: 2 }, tags: [], tension: 0.5, emotion: 0.5, place: ['town', 'field', 'guild', 'church', 'plaza', 'house'][s % 6], pos: { x: a.x, y: a.y }, used: false, names: { [a.id]: a.name, [b.id]: b.name } };
      const ch = scene === 'supplement' ? X.chronSupplement(a.id) : X.makeChapter(scene, ev);
      for (const lg of ['ja', 'zh']) {
        X.setLang(lg); const r = X.renderChapter(ch); const txt = r.paras.map(p => p.text).join('') + r.hist + r.title; total++;
        if (/\{[A-Za-z]+\}/.test(txt) || /\?\?/.test(txt) || /undefined|NaN|\[object/.test(txt)) { rbad++; console.log('PLACEHOLDER', lg, scene, txt.slice(0, 120)); }
        if (lg === 'zh' && KANA.test(txt.replace(/・/g, ''))) { rbad++; console.log('KANA in zh render', scene, (txt.match(KANA) || [''])[0]); }
        if (lg === 'ja' && TRAD.test(txt)) { rbad++; console.log('TRAD in ja render', scene, txt.match(TRAD)[0]); }
        if (lg === 'zh' && JPN.test(txt)) { rbad++; console.log('JPN char in zh render', scene, txt.match(JPN)[0]); }
        uniq.add(lg + txt);
      }
    }
  }
}
console.log('rendered chapters:', total, 'unique:', uniq.size, 'render problems:', rbad);
for (const f of ['prologue', 'master_farewell', 'revelation', 'finale_doom', 'finale_godleft', 'finale_stagnant']) { const G = X.G(); }
process.exit(bad + rbad ? 1 : 0);
