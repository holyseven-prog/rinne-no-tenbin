/* one-shot patch: V4.1 sim-side changes */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING in', f, ':', a.slice(0, 90)); process.exit(1); } s = s.replace(a, b); } fs.writeFileSync(f, s); };
// A7: start at 9:00
P('src/01_util.js', [['START_TICK = 36;', 'START_TICK = 54; // V4.1-A7: the world starts at 9:00 (bright)']]);
// A14: prayer refunds follow the cost; listen; urgent-only expiry penalty; fewer prayers
P('src/08_faith.js', [
  ["  const gain = outcome === 'crit' ? 10 : outcome === 'success' ? 6 : 2.5;", "  const c0 = G._castCost || 10; const gain = Math.round(c0 * (outcome === 'crit' ? 2 : outcome === 'success' ? 1.3 : 0.6) * 10) / 10; // V4.1-A14: a good god earns faith back"],
  ["  G.faith = Math.min(G.faithMax, G.faith + gain); G.lastAnswer = G.tick;", "  G.faith = Math.min(G.faithMax, G.faith + gain); faithLog('ans', gain); G.lastAnswer = G.tick;"],
  ["  G.faith -= cost; G.hist.push({ p: pid, t: G.tick }); G.stats.casts++;", "  G.faith -= cost; faithLog('cast', -cost); G._castCost = cost; G.hist.push({ p: pid, t: G.tick }); G.stats.casts++;"],
  ["    const f = out === 'crit' ? 1 : 0.55; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * f);", "    const f = out === 'crit' ? 1 : 0.55; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * f); h.graces = (h.graces || 0) + 1;"],
]);
P('src/05_ai.js', [
  ["  const p = { id: G.nid++, hid: h.id, kind, urg: clamp(urg, 0.1, 1), t: G.tick, exp: G.tick + 2 * TICK_DAY, state: 'open', v: rint(0, 1) };\n  G.prayers.push(p); h.prayCd = rint(300, 620);", "  const p = { id: G.nid++, hid: h.id, kind, urg: clamp(urg, 0.1, 1), t: G.tick, exp: G.tick + 2 * TICK_DAY, state: 'open', v: rint(0, 1) };\n  G.prayers.push(p); h.prayCd = rint(420, 880); // V4.1-A6: about 30% fewer prayers"],
  ["      G.faith = Math.max(0, G.faith - TUNE.pen * 0.6 * (0.5 + p.urg));\n      if (h && h.alive) { h.needs.faith = Math.min(100, h.needs.faith + 10); h.disappoint = (h.disappoint || 0) + 1; }",
   "      if (p.urg >= 0.75) { const pen = 2 + p.urg * 2; G.faith = Math.max(0, G.faith - pen); faithLog('exp', -pen); } // V4.1-A6: only urgent prayers cost faith when ignored\n      if (h && h.alive && !p.listened) { h.needs.faith = Math.min(100, h.needs.faith + 10); h.disappoint = (h.disappoint || 0) + (p.urg >= 0.75 ? 1 : 0.6); }"],
  ["    if (h.lvl === 6 && h.job === 'swordsman' && h.age < 56) logEvent('hero_born', [h.id], {}, ['growth'], 0.9, 0.9, h);\n", ""],
  ["function expirePrayers() {", "/* V4.1-A14: 'listen' — free, 3 per day: the prayer waits one more day and the person is not disappointed */\nfunction listenPrayer(pid) { const p = G.prayers.find(x => x.id === pid && x.state === 'open'); if (!p || (G.listenLeft || 0) <= 0 || p.listened) return false; G.listenLeft--; p.listened = 1; p.exp += TICK_DAY; const h = hById(p.hid); if (h) { h.needs.faith = Math.max(0, h.needs.faith - 10); } G.stats.listens = (G.stats.listens || 0) + 1; return true; }\nfunction expirePrayers() {"],
]);
// A14: income with devotion, church level, sabbath, ledger; A11 hero check
P('src/07_world.js', [
  ["  G.faith = Math.min(G.faithMax, G.faith + pop * 0.16 * clamp(1 - dis * TUNE.disMul, 0.1, 1));\n  if (G.faith > 100) {",
   "  const devo = clamp(1 - dis * TUNE.disMul, 0.1, 1); const church = G.assaults ? [0.9, 1, 1.2, 1.4][devLevel()] : 1; const inc = pop * 0.16 * devo * church; G.faith = Math.min(G.faithMax, G.faith + inc); faithLog('inc', inc); G.faithDayInc = inc; G.listenLeft = 3;\n  if (G.assaults && d % 3 === 0) { const att = aliveHumans().filter(h => h.age >= 10).length; const g = Math.round(att * 0.45 * devo * 10) / 10; if (g > 0) { G.faith = Math.min(G.faithMax, G.faith + g); faithLog('sab', g); logEvent('sabbath', [], { n: att, g }, ['faith'], 0.3, 0.6, (W.bk.church && W.bk.church[0]) ? W.bk.church[0].appr : PLAZA); } } // V4.1-A14: sabbath every 3 days\n  if (G.assaults) faithDay(); heroDaily();\n  if (G.faith > 100) {"],
]);
// A4 / A11 hero title + A1 forecast + A2 interventions + A3 adaptive threat
P('src/07b_assault.js', [
  ["function heroAlive() { return G.humans.some(h => h.alive && h.job === 'swordsman' && h.lvl >= 6 && h.age < 56); }",
   `function heroAlive() { const h = G.heroId && G.idx[G.heroId]; return !!(h && h.alive); }
/* V4.1-A4/A11: the hero is a single title (not a level). Lv8+ swordsman who survived an assault with a title or received 3+ graces. */
function heroCands() { return G.humans.filter(h => h.alive && h.job === 'swordsman' && h.age >= 16 && h.age < 56 && h.lvl >= 6 && h.id !== G.heroId).sort((a, b) => heroMerit(b) - heroMerit(a)).slice(0, 3); }
function heroMerit(h) { return h.lvl * 10 + (h.kills || 0) + (G.titles && G.titles[h.id] ? 25 : 0) + (h.graces || 0) * 6; }
function heroEligible(h) { return h.alive && h.job === 'swordsman' && h.age >= 16 && h.age < 56 && h.lvl >= 8 && ((G.titles && G.titles[h.id]) || (h.graces || 0) >= 3); }
function heroDaily() {
  if (!G.assaults) return;
  if (G.heroId) { const h = G.idx[G.heroId]; if (!h || !h.alive) { logEvent('hero_fall', h ? [h.id] : [], {}, ['growth'], 1, 1, h || PLAZA); G.heroPrev = G.heroId; G.heroId = 0; G.heroWait = G.tick + 2 * TICK_DAY; } else return; }
  if (G.tick < (G.heroWait || 0)) return;
  const c = G.humans.filter(heroEligible).sort((a, b) => heroMerit(b) - heroMerit(a))[0]; if (!c) return;
  G.heroId = c.id; G.heroYear = yearOf(G.tick); G.titles = G.titles || {}; if (!G.titles[c.id]) G.titles[c.id] = ['勇者', '勇者'];
  logEvent(G.heroPrev ? 'hero_inherit' : 'hero_born', [c.id].concat(G.heroPrev ? [G.heroPrev] : []), {}, ['growth'], 1, 1, c);
}`],
  ["function winProb(a, extra) { if (!a) return 0; return sigm((defenseScore() - threatOf(a) + 3 + (extra || 0)) / WIN_K); }",
   `function adaptT(D) { return 0.35 * Math.max(0, D - 48); } // V4.1-A3: the enemy answers a stronger village
function winProb(a, extra) { if (!a) return 0; const D = defenseScore(); return sigm((D - threatOf(a) - adaptT(D) + 3 + (extra || 0)) / WIN_K); }
/* V4.1-A1: expected help from the god in the 3 phases (best affordable option per phase, sequential budget) */
function expHelp(faith) { let f = faith === undefined ? G.faith : faith, aw = G.awe || 0, b = 0; for (let ph = 0; ph < 3; ph++) { const o = battleOptions(ph).filter(x => x.cost ? f >= x.cost : aw >= (x.awe || 0)).sort((x, y) => y.b - x.b)[0]; if (o) { b += o.b; if (o.cost) f -= o.cost; else aw -= o.awe; } } return b; }
/* defense trend -> projected defense when the assault arrives */
function defSample() { G.defHist = G.defHist || []; G.defHist.push([G.tick, defenseScore()]); if (G.defHist.length > 40) G.defHist.shift(); }
function defSlope() { const h = (G.defHist || []).filter(x => G.tick - x[0] <= TICK_YEAR * 1.5); if (h.length < 4) return 0.012; let sx = 0, sy = 0, sxx = 0, sxy = 0; for (const [x, y] of h) { sx += x; sy += y; sxx += x * x; sxy += x * y; } const n = h.length, den = n * sxx - sx * sx; return den ? (n * sxy - sx * sy) / den : 0; }
function winForecast(a) {
  a = a || nextAssault(); if (!a) return null; const D = defenseScore(), T = threatOf(a); const left = Math.max(0, a.t - G.tick);
  const now = sigm((D - T - adaptT(D) + 3 + expHelp()) / WIN_K);
  const Dp = clamp(D + clamp(defSlope(), -0.004, 0.03) * left * 0.8 + (left > SEASON_T ? 3 : 0), D - 5, D + 30);
  const faithThen = Math.min(G.faithMax, G.faith + left / TICK_DAY * 3);
  const then = sigm((Dp - T - adaptT(Dp) + 3 + expHelp(faithThen)) / WIN_K);
  return { now, then, nowNoHelp: winProb(a), left };
}`],
  ["const INTERVENE = {\n  0: [{ id: 'foresight', n: ['預知夢：守りを先に固める', '預知夢：提前布陣'], b: 3, cost: 12, lv: 2 }],\n  1: [{ id: 'guard', n: ['加護：主力を守る', '加護：守護主力'], b: 4, cost: 20, lv: 1 }, { id: 'confuse', n: ['迷い：敵の将を惑わす（畏怖）', '迷惘：迷惑敵將（畏怖）'], b: 4, awe: 18, lv: 2 }],\n  2: [{ id: 'miracle', n: ['奇跡：英雄に力を', '奇蹟：賜英雄力量'], b: 6, cost: 45, lv: 5 }],\n};",
   "const INTERVENE = { // V4.1-A2: every phase has a Lv1 option that helps the humans; god-level skills are stronger versions\n  0: [{ id: 'array', n: ['神託「陣を組め」', '神諭「布陣」'], b: 3, cost: 10, lv: 1 }, { id: 'foresight', n: ['預知夢：守りを先に固める', '預知夢：提前布陣'], b: 5, cost: 18, lv: 2 }],\n  1: [{ id: 'guard', n: ['恩寵：冒険者1人に加護', '恩寵：加護 1 名冒險者'], b: 4, cost: 15, lv: 1 }, { id: 'confuse', n: ['迷い：敵の将を惑わす（畏怖）', '迷惘：迷惑敵將（畏怖）'], b: 4, awe: 18, lv: 2 }],\n  2: [{ id: 'rally', n: ['試煉：英雄をふるい立たせる', '試煉：激勵英雄'], b: 4, cost: 20, lv: 1 }, { id: 'miracle', n: ['奇跡：英雄に力を', '奇蹟：賜英雄力量'], b: 8, cost: 45, lv: 5 }],\n};"],
  ["  a.state = 'battle'; const D = defenseScore(), T = threatOf(a);", "  a.state = 'battle'; const D0 = defenseScore(); const D = D0 - adaptT(D0), T = threatOf(a);"],
  ["  a.pred = Math.round(winProb(a) * 100);", "  a.pred = Math.round(winProb(a) * 100); a.predHelp = Math.round(sigm((D - T + 3 + expHelp()) / WIN_K) * 100); const fc = G.forecasts && G.forecasts[a.id]; a.fcThen = fc ? fc.then : null;"],
  ["  if (win) G.faith = Math.min(G.faithMax, G.faith + 20);", "  if (win) { G.faith = Math.min(G.faithMax, G.faith + 20); faithLog('war', 20); }"],
  ["    { id: 'wave1', t: S0 + r(2.0, 3.0) },", "    { id: 'wave1', t: S0 + r(1.6, 2.4) },"],
]);
fs.appendFileSync('src/07b_assault.js', `
/* V4.1-A14: faith ledger (today / yesterday) for the faith tooltip and tests */
function faithLog(k, v) { if (!G) return; G.fLed = G.fLed || {}; G.fLed[k] = (G.fLed[k] || 0) + v; }
function faithDay() { G.fLedY = G.fLed || {}; G.fLed = {}; G.faithHist = G.faithHist || []; G.faithHist.push(Math.round(G.faith / G.faithMax * 100)); if (G.faithHist.length > 200) G.faithHist.shift(); defSample(); const a = nextAssault(); if (a) { G.forecasts = G.forecasts || {}; if (!G.forecasts[a.id] || a.t - G.tick >= TICK_YEAR) G.forecasts[a.id] = winForecast(a); } }
`);
console.log('ok');
