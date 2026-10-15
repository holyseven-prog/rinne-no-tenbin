/* ================= V4.2 W3: demon castle (4 floors), expeditions, the army's anger, new king succession, captives, divine training ================= */
const CFLOORS = [
  { id: 1, n: ['1F 城門', '1F 城門'], base: 56, mons: ['skel2', 'gargoyle'], anger: 10 },
  { id: 2, n: ['2F 大広間', '2F 大廳'], base: 63, mons: ['goblin2', 'wyrm', 'skel2'], anger: 15 },
  { id: 3, n: ['3F 回廊（幹部の間）', '3F 迴廊（幹部房間）'], base: 68, mons: ['cad'], anger: 20 },
  { id: 4, n: ['4F 玉座', '4F 王座'], base: 88, mons: ['boss'], anger: 30 },
];
const KING_NAMES = [['黒冠の王ノクタール', '黑冠之王 諾克塔爾'], ['紅蓮の王ヴァザル', '紅蓮之王 瓦札爾'], ['氷結の王イシュラ', '冰結之王 伊修拉'], ['深淵の王ゾルグ', '深淵之王 佐爾格'], ['災厄の王メギドラ', '災厄之王 梅吉德拉']];
function initCastle() { G.castle = { anger: 0, kingGen: 0, kingPow: 1, kingName: KING_NAMES[0], captives: [], cool: 0, exp: null, log: [], angerSteps: {} }; G.moralePerm = 0; }
/* anger: every assault gets stronger; thresholds bring the next assault forward and trigger a retaliation */
function angerMul() { return 1 + (G.castle ? G.castle.anger : 0) * 0.003; }
function addAnger(n, why) {
  const C = G.castle; if (!C) return; const a0 = C.anger; C.anger = clamp(C.anger + n, 0, 100);
  if (a0 < 50 && C.anger >= 50) { const a = nextAssault(); if (a && a.t - G.tick > SEASON_T * 2) { a.t -= SEASON_T; logEvent('anger_forward', [], { a: a.id }, ['assault'], 0.7, 0.6, BOSS.home); } }
  if (a0 < 80 && C.anger >= 80) { for (let i = 0; i < 5; i++) { const m = spawnMonster(3, { x: VIL_X1 + 3, y: 23 }, 'wander'); if (m) m.tgt = 0; } G.chain.cadres = Math.min(3, (G.chain.cadres || 2) + 1); logEvent('retaliation', [], {}, ['raid'], 0.85, 0.8, { x: VIL_X1 + 3, y: 23 }); }
  logEvent('anger_up', [], { n, why, v: C.anger }, ['assault'], 0.4, 0.4, BOSS.home);
}
/* ---------- expedition party / prediction ---------- */
function expParty() { const hero = G.heroId && G.idx[G.heroId]; if (!hero || !hero.alive) return null; const mates = G.humans.filter(h => h.alive && isAdv(h) && h.id !== hero.id && h.lvl >= 6 && !h.away && !h.captive).sort((a, b) => advPower(b) - advPower(a)).slice(0, 3); return mates.length >= 3 ? [hero].concat(mates) : null; }
function expMissing() { const out = []; if (!heroAlive()) out.push('hero'); else { const n = G.humans.filter(h => h.alive && isAdv(h) && h.id !== G.heroId && h.lvl >= 6 && !h.away).length; if (n < 3) out.push('mates:' + (3 - n)); } if (G.castle && G.tick < G.castle.cool) out.push('cool'); if (G.castle && G.castle.exp || G.heroId && G.idx[G.heroId] && G.idx[G.heroId].away) out.push('busy'); return out; }
function partyPower(P) { return P.reduce((s, h) => s + advPower(h), 0); }
function floorThreat(f) { const F = CFLOORS[f - 1]; let t = F.base * (f === 4 ? G.castle.kingPow : 1) * angerMul(); if (f === 3) t += ((G.chain && G.chain.cadres) || 2) * 3; if (!G.awakened && f === 4) t *= 0.85; return t; } // a sleeping king is weaker
function floorD(P) { return 18 + Math.sqrt(partyPower(P)) * 2.4 + P.reduce((s, h) => s + ((h.skills || []).indexOf('heroStrike') >= 0 ? 2 : 0), 0); }
function floorWin(P, f, help) { return sigm((floorD(P) - floorThreat(f) + 3 + (help || 0)) / WIN_K); }
function earlyMul() { const y = (G.tick - START_TICK) / TICK_YEAR; return y <= 3 ? 1.5 : y <= 5 ? 1.5 - (y - 3) * 0.1 : y <= 7 ? 1.3 - (y - 5) * 0.075 : y <= 9 ? 1.15 - (y - 7) * 0.075 : 1; }
function expCourage(P) { let c = 0.5 + (G.moraleMod || 0) / 100 + (G.moralePerm || 0) / 100; P.forEach(h => { if ((h.traits || []).indexOf('brave') >= 0) c += 0.06; if ((h.traits || []).indexOf('timid') >= 0) c -= 0.06; if (h.buffs && h.buffs.grace > G.tick) c += 0.05; if (h.courageUntil > G.tick) c += 0.12; }); return c; }
/* ---------- start / step / finish ---------- */
function startExpedition(cost) {
  const P = expParty(); if (!P || expMissing().length) return { ok: false, why: expMissing() }; cost = cost === undefined ? 30 : cost; if (G.faith < cost) return { ok: false, why: ['faith'] };
  if (expCourage(P) < 0.55) { logEvent('exp_refuse', P.map(h => h.id), {}, ['exp'], 0.5, 0.5, PLAZA); return { ok: false, why: ['courage'] }; }
  G.faith -= cost; P.forEach(h => { h.away = 1; h.inside = 1; h.party = 0; h.act = null; h.path = []; });
  G.castle.exp = { ids: P.map(h => h.id), floor: 1, t0: G.tick, back: G.tick + SEASON_T, cleared: 0, phase: 0, bonus: 0, results: [], done: false };
  G.stats.expeditions = (G.stats.expeditions || 0) + 1; logEvent('exp_depart', P.map(h => h.id), {}, ['exp'], 0.8, 0.8, BOSS.home); return { ok: true };
}
function expBattleStep(choice) { // one floor = 2 phases with one intervention each; returns the expedition
  const E = G.castle.exp; if (!E || E.done) return E; const P = E.ids.map(i => G.idx[i]).filter(h => h && h.alive);
  const opt = (INTERVENE[E.phase] || []).find(o => o.id === choice); let b = 0; if (opt && (G.godLv || 1) >= opt.lv && canIntervene(opt)) { if (opt.cost) G.faith -= opt.cost; if (opt.awe) G.awe -= opt.awe; b = opt.b; } else if (choice === 'monsters') { b = -6; G.awe = clamp(G.awe + 15, 0, G.aweMax); }
  E.bonus += b; E.phase++;
  if (E.phase >= 2) { const f = E.floor; const L = WIN_K * Math.log(1 / Math.max(1e-6, rnd()) - 1) * -1; const m = floorD(P) - floorThreat(f) + E.bonus + L; const win = m >= -3; E.results.push({ f, win, m: Math.round(m) }); E.phase = 0; E.bonus = 0;
    if (win) floorWon(E, f, P); else floorLost(E, f, P); }
  return E;
}
function floorWon(E, f, P) {
  const em = earlyMul(); E.cleared = f; addAnger(CFLOORS[f - 1].anger, 'floor' + f); const R = { f, levels: 0, items: [], title: null };
  const lv = n => P.forEach(h => { for (let i = 0; i < n; i++) addExp(h, 30 * h.lvl); }); G.store = G.store || {};
  if (f === 1) { lv(1); G.store.stoneM = (G.store.stoneM || 0) + Math.round(5 * em); G.store.mithril = (G.store.mithril || 0) + 1; R.levels = 1; }
  if (f === 2) { lv(2); G.store.scale = (G.store.scale || 0) + Math.round(2 * em); G.store.dfang = (G.store.dfang || 0) + 1; G.moralePerm += Math.round(7 * em); R.levels = 2; rescueCaptives(); }
  if (f === 3) { const best = P[0]; best.cadreWpn = 1; best.named = best.named || {}; best.named.w = { n: ['幹部の魔剣', '幹部魔劍'], trait: 'atk', v: 0.25 * em }; godXp(Math.round(60 * em)); }
  if (f === 4) kingSlain(E, P, em);
  logEvent('exp_floor', P.map(h => h.id), { f, win: 1 }, ['exp'], 0.85, 0.85, BOSS.home); E.results[E.results.length - 1].R = R;
  if (f >= 4) finishExpedition(E, 'throne');
}
function floorLost(E, f, P) {
  addAnger(10, 'fail'); G.moraleMod -= 10; G.awe = clamp(G.awe + 15, 0, G.aweMax); G.castle.cool = G.tick + TICK_YEAR;
  const out = []; P.forEach(h => { const r = rnd(); if (r < 0.15 + f * 0.05) { killHuman(h, 'battle', null); out.push(['dead', h.id]); } else if (r < 0.4 + f * 0.05 && !G.castle.captives.some(c => c.id === h.id)) { h.captive = 1; h.away = 1; h.inside = 1; G.castle.captives.push({ id: h.id, until: G.tick + TICK_YEAR, f }); out.push(['captive', h.id]); } else { h.hp = Math.max(1, h.maxHp * 0.2); out.push(['hurt', h.id]); } });
  E.results[E.results.length - 1].out = out; logEvent('exp_floor', P.map(h => h.id), { f, win: 0 }, ['exp'], 0.9, 0.9, BOSS.home); finishExpedition(E, 'lost');
}
function retreatExpedition() { const E = G.castle.exp; if (!E || E.done) return; finishExpedition(E, 'retreat'); }
function finishExpedition(E, how) {
  E.done = true; E.how = how; E.ids.forEach(i => { const h = G.idx[i]; if (h && h.alive && !h.captive) { h.away = 1; h.inside = 1; h.returnAt = Math.max(G.tick + TICK_DAY, E.back); } }); // the march home takes the rest of the season
  G.castle.log.push({ t: G.tick, how, cleared: E.cleared }); logEvent('exp_end', E.ids.filter(i => G.idx[i] && G.idx[i].alive), { how, cleared: E.cleared }, ['exp'], 0.8, 0.8, PLAZA);
  if (G.onExpEnd) G.onExpEnd(E); if (!G.uiAttached) G.castle.exp = null;
}
function kingSlain(E, P, em) {
  const hero = G.idx[G.heroId]; const C = G.castle; const old = C.kingName;
  if (hero) { hero.crown = 1; G.titles[hero.id] = ['弑王者', '弒王者']; } G.moralePerm += 15; G.devPts = (G.devPts || 0) + 5; G.town.gold = (G.town.gold || 0) + Math.round(800 * em);
  G.faithMax += 50; G.faith = G.faithMax; godXp(Math.max(0, (GOD_LV_XP[Math.min(9, (G.godLv || 1))] || 0) - (G.godXp || 0)) + 1); P.forEach(h => { for (let i = 0; i < 3; i++) addExp(h, 30 * h.lvl); });
  // a new king is crowned at once: stronger, angrier; the era goes on
  C.kingGen++; C.kingPow *= 1.25; C.kingName = KING_NAMES[C.kingGen % KING_NAMES.length]; C.anger = Math.max(0, C.anger - 40); /* the leaderless army is in disarray */
  if (!G.awakened) awaken(); G.stats.kingsSlain = (G.stats.kingsSlain || 0) + 1;
  logEvent('king_slain_exp', hero ? [hero.id] : [], { old }, ['boss'], 1, 1, BOSS.home); logEvent('new_king', [], { n: C.kingName, gen: C.kingGen }, ['boss'], 1, 0.9, BOSS.home);
}
function rescueCaptives() { const C = G.castle; C.captives.forEach(c => { const h = G.idx[c.id]; if (h && h.alive) { h.captive = 0; h.away = 0; h.inside = 0; G.titles[h.id] = ['生還者', '生還者']; const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); logEvent('captive_saved', [h.id], {}, ['exp'], 0.85, 0.9, h); } }); C.captives = []; }
function castleDaily() {
  const C = G.castle; if (!C) return;
  C.captives = C.captives.filter(c => { const h = G.idx[c.id]; if (!h || !h.alive) return false; if (G.tick >= c.until) { h.captive = 0; killHuman(h, 'execute', null); logEvent('captive_lost', [h.id], {}, ['exp'], 0.9, 0.9, BOSS.home); G.humans.forEach(o => { if (o.alive && (o.parent === h.id || o.spouse === h.id)) o.vengeful = 1; }); return false; } return true; });
  if (C.exp && !C.exp.done && !G.uiAttached) autoExpedition();
  G.humans.forEach(h => { if (h.returnAt && G.tick >= h.returnAt && h.alive && !h.captive) { h.returnAt = 0; h.away = 0; h.inside = 0; const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); } });
  G.humans.forEach(h => { if (h.temple && G.tick >= h.temple) { h.temple = 0; h.away = 0; h.inside = 0; for (let i = 0; i < 2; i++) addExp(h, 30 * h.lvl); if (rchance(0.1)) h.hp = Math.max(1, h.maxHp * 0.4); } });
}
/* auto-play (no UI / tests): help each phase if affordable; continue while the next floor looks winnable */
function autoExpedition(target) {
  const E = G.castle.exp; if (!E) return; target = target || G.expTarget || 4;
  while (!E.done) { const opts = battleOptions(E.phase).filter(canIntervene).sort((x, y) => y.b - x.b); expBattleStep(opts.length && G.policy !== 'none' ? opts[0].id : 'none');
    if (!E.done && E.phase === 0 && E.cleared >= 1) { const P = E.ids.map(i => G.idx[i]).filter(h => h && h.alive); if (E.cleared >= target || floorWin(P, E.cleared + 1, 4) < (G.expRisk || 0.45)) { retreatExpedition(); break; } E.floor = E.cleared + 1; } }
  G.castle.exp = null;
}
/* ---------- divine training (W3-4) ---------- */
const TRAIN = {
  mark: { n: ['祝福の刻印', '祝福刻印'], d: ['1人に永久の加護（攻・防・速・魔のどれか+15%）', '為 1 人刻上永久加護（攻防速魔其一 +15%）'], cost: 30, lv: 1 },
  temple: { n: ['神殿修行', '神殿修行'], d: ['最大4人が1季のあいだ試練の間で修行。全員Lv+2（1割でけが）', '最多 4 人在試煉之間修行 1 季，每人保證 +2 Lv（1 成受傷）'], cost: 40, stones: ['stoneS', 3], lv: 2 },
  growth: { n: ['成長の恩寵', '成長的恩寵'], d: ['1隊の狩りの経験値が1年間1.5倍', '1 隊 1 年內狩獵經驗 ×1.5'], cost: 25, lv: 2 },
  skill: { n: ['神技の伝授', '傳授神技'], d: ['勇者の一撃（決戦+8pt）・聖盾（被害-20%）・癒しの祈り（戦後のけが人半分）', '勇者之一擊（決勝 +8pt）、聖盾（傷害 -20%）、癒之祈禱（戰後傷者減半）'], cost: 50, stones: ['stoneM', 2], lv: 3 },
  artifact: { n: ['神器の授与', '授與神器'], d: ['勇者に神器：銅+10%→銀+20%→金+30%', '授與勇者神器：銅 +10% → 銀 +20% → 金 +30%'], cost: 60, stones: ['stoneL', 1], lv: 4 },
};
const SKILLS = ['heroStrike', 'holyShield', 'healPrayer'];
function trainTarget(id) { const hero = G.heroId && G.idx[G.heroId]; const advs = G.humans.filter(h => h.alive && isAdv(h) && !h.away).sort((a, b) => (b.id === G.heroId) - (a.id === G.heroId) || advPower(b) - advPower(a));
  if (id === 'mark') return advs.find(h => (h.marks || []).length < (h.id === G.heroId ? 3 : 1)); if (id === 'skill') return advs.find(h => (h.skills || []).length < 2); if (id === 'artifact') return hero && hero.alive && (hero.artifact || 0) < 3 && (G.godLv || 1) >= [4, 6, 8][hero.artifact || 0] ? hero : null;
  if (id === 'temple') return advs.filter(h => !h.templeYear || yearOf(G.tick) > h.templeYear).slice(0, 4); if (id === 'growth') return advs.filter(h => !(h.growthUntil > G.tick)).slice(0, 4); return null; }
function trainCost(id) { const T = TRAIN[id]; if (id === 'artifact') { const h = G.idx[G.heroId]; return [60, 90, 120][(h && h.artifact) || 0]; } return T.cost; }
function trainAvailable(id) { const T = TRAIN[id]; if (!T || (G.godLv || 1) < T.lv || G.faith < trainCost(id)) return false; if (T.stones && ((G.store || {})[T.stones[0]] || 0) < T.stones[1]) return false; const tg = trainTarget(id); return Array.isArray(tg) ? tg.length > 0 : !!tg; }
function doTrain(id, who) {
  if (!trainAvailable(id)) return false; const T = TRAIN[id]; G.faith -= trainCost(id); faithLog('train', -trainCost(id)); if (T.stones) G.store[T.stones[0]] -= T.stones[1];
  let tg = who ? G.idx[who] : trainTarget(id); const L = li0();
  if (who && (!tg || !tg.alive || (id === 'mark' && (tg.marks || []).length >= (tg.id === G.heroId ? 3 : 1)) || (id === 'skill' && (tg.skills || []).length >= 2))) tg = trainTarget(id);
  if (id === 'mark') { tg.marks = tg.marks || []; tg.marks.push(['atk', 'def', 'spd', 'mag'][tg.marks.length % 4]); }
  else if (id === 'temple') { tg = trainTarget(id); tg.forEach(h => { h.temple = G.tick + SEASON_T; h.templeYear = yearOf(G.tick); h.away = 1; h.inside = 1; h.party = 0; h.act = null; }); }
  else if (id === 'growth') { tg = trainTarget(id); tg.forEach(h => h.growthUntil = G.tick + TICK_YEAR); }
  else if (id === 'skill') { tg.skills = tg.skills || []; tg.skills.push(SKILLS.find(s => tg.skills.indexOf(s) < 0)); }
  else if (id === 'artifact') tg.artifact = (tg.artifact || 0) + 1;
  G.stats.trains = (G.stats.trains || 0) + 1; const ids = Array.isArray(tg) ? tg.map(h => h.id) : [tg.id]; logEvent('divine_train', ids, { id }, ['growth'], 0.55, 0.6, Array.isArray(tg) ? tg[0] : tg); return true;
}
function li0() { return typeof LANG !== 'undefined' && LANG === 'zh' ? 1 : 0; }
/* throne win chance after a training step (for the "+x%" on each button) */
function trainDelta(id) { const P = expParty() || G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => advPower(b) - advPower(a)).slice(0, 4); if (!P.length) return 0; const p0 = floorWin(P, 4, 4);
  const save = P.map(h => [h.lvl, (h.marks || []).slice(), h.artifact || 0, (h.skills || []).slice()]);
  if (id === 'mark') { const h = trainTarget('mark'); if (h) (h.marks = h.marks || []).push('atk'); } if (id === 'temple' || id === 'growth') P.forEach(h => h.lvl += id === 'temple' ? 2 : 1); if (id === 'artifact') { const h = G.idx[G.heroId]; if (h) h.artifact = (h.artifact || 0) + 1; } if (id === 'skill') { const h = trainTarget('skill'); if (h) (h.skills = h.skills || []).push('heroStrike'); }
  const p1 = floorWin(P, 4, 4); P.forEach((h, i) => { h.lvl = save[i][0]; h.marks = save[i][1]; h.artifact = save[i][2]; h.skills = save[i][3]; delete h._st; }); return p1 - p0; }
