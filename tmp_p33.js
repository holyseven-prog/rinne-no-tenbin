const fs = require('fs');
process.chdir(__dirname + '/src');
function rep(file, from, to) { let s = fs.readFileSync(file, 'utf8'); if (!s.includes(from)) { console.log('MISSING in', file, ':', from.slice(0, 80)); return; } s = s.replace(from, () => to); fs.writeFileSync(file, s); }
// remove wrapper in 14b
let s = fs.readFileSync('14b_screens2.js', 'utf8'); const k = s.indexOf('/* ending summary */'); s = s.slice(0, k); fs.writeFileSync('14b_screens2.js', s);
// real ending with summary
rep('14_screens.js', "      this.push('ending', () => this.win(250, 90, 780, 520, [", "      this.push('ending', () => this.win(230, 30, 820, 650, [");
rep('14_screens.js', "        h('div', { class: 'sm', style: 'text-align:center;margin:10px 0;font-size:14px' }, fmt(t('r_stats'), { y: e.year, d: G.stats.deaths, b: G.stats.births, q: G.stats.quests, a: G.stats.answered })),", "        h('div', { style: 'margin:8px 14px;font-size:14px;line-height:1.5;text-align:left' }, h('div', { class: 'gold' }, t('end_sum')), h('div', null, '・' + t('es_' + kind)), h('div', null, '・' + fmt(t('es_acts'), { c: G.stats.casts, a: G.stats.answered })), h('div', null, '・' + fmt(t('es_world'), { d: G.stats.deaths, b: G.stats.births, q: G.stats.quests })), h('div', { class: 'blu', style: 'margin-top:3px' }, t('end_try') + '：' + t('et_' + kind))),");
rep('14_screens.js', "height:190px;margin:0 10px' }, (renderChapter(", "height:170px;margin:0 10px' }, (renderChapter(");
// res.dir defaults
rep('08_faith.js', "  res.gain = G._gain || 0;", "  if (pid === 'soul') res.dir = dir || 'good'; if (pid === 'force') res.dir = dir || 'light';\n  res.gain = G._gain || 0;");
// clear labels on non-play scenes
rep('15_main.js', "    if (sc === 'boot') { c.fillStyle = '#000'; c.fillRect(0, 0, 640, 360); return; }", "    if (sc !== 'play' && sc !== 'ending' && !this.labelsCleared) { this.labelsCleared = true; const lc = $('labels'); if (lc) lc.getContext('2d').clearRect(0, 0, 1280, 720); } else if (sc === 'play') this.labelsCleared = false;\n    if (sc === 'boot') { c.fillStyle = '#000'; c.fillRect(0, 0, 640, 360); return; }");
// resident window tips
rep('13_ui.js', "    ['hunger', 'safety', 'wealth', 'belong', 'honor', 'faith'].forEach(k => { const b = h('i'); R.needs[k] = b; grid.appendChild(h('div', { style: 'display:flex;align-items:center;gap:4px' },", "    ['hunger', 'safety', 'wealth', 'belong', 'honor', 'faith'].forEach(k => { const b = h('i'); R.needs[k] = b; const row = h('div', { style: 'display:flex;align-items:center;gap:4px' },");
rep('13_ui.js', "h('div', { class: 'gauge need', style: 'flex:1;height:7px;border-width:1px' }, b))); });\n    E.selWin.appendChild(grid);", "h('div', { class: 'gauge need', style: 'flex:1;height:7px;border-width:1px' }, b)); Tip.attach(row, () => [t('n_' + k), t('tip_need_' + k)]); grid.appendChild(row); });\n    E.selWin.appendChild(grid);");
rep('13_ui.js', "E.selWin.appendChild(R.motive = h('div', { class: 'sm', style: 'line-height:1.25;color:#a8e0ff' })); E.selWin.appendChild(R.karma = h('div', { class: 'sm' }));", "E.selWin.appendChild(R.motive = h('div', { class: 'sm', style: 'line-height:1.25;color:#a8e0ff' })); E.selWin.appendChild(R.karma = h('div', { class: 'sm' })); Tip.attach(R.motive, () => [t('motive'), t('tip_motive')]); Tip.attach(R.karma, () => [t('karma'), t('tip_karma')]);");
