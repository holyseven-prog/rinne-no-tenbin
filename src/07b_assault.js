/* ================= V4-A1: assault timeline, village defense, 3-phase battles, consequences, chains ================= */
const SEASON_T = 3 * TICK_DAY; // 1 season = 3 days
const ASSAULT_DEF = {
  wave1: { n: ['第1次 魔物の大群', '第1次 魔物大軍'], short: ['魔物の大群', '魔物大軍'], base: 42, grow: 0, kind: 'wave', mon: 'goblin', scale: 0.8 },
  wave2: { n: ['第2次 魔物の大群', '第2次 魔物大軍'], short: ['魔物の大群', '魔物大軍'], base: 50, kind: 'wave', mon: 'skel', scale: 1 },
  dragon: { n: ['巨竜の来襲', '巨龍來襲'], short: ['巨竜', '巨龍'], base: 57, kind: 'dragon', mon: 'dragon', scale: 1.3 },
  wave3: { n: ['第3次 魔物の大群', '第3次 魔物大軍'], short: ['魔物の大群', '魔物大軍'], base: 41, kind: 'wave', mon: 'wolf', scale: 1.2 },
  king: { n: ['魔王の進攻', '魔王進攻'], short: ['魔王軍', '魔王軍'], base: 41.5, kind: 'king', mon: 'boss', scale: 1.6 },
};
const ASSAULT_ORDER = ['wave1', 'wave2', 'dragon', 'wave3', 'king'];
const GRADES = ['crush', 'win', 'pyrrhic', 'loss', 'rout']; // 大勝 勝利 慘勝 敗北 潰滅
const GRADE_N = { crush: ['大勝', '大勝'], win: ['勝利', '勝利'], pyrrhic: ['辛勝', '慘勝'], loss: ['敗北', '敗北'], rout: ['壊滅', '潰滅'] };
const WIN_K = 6;
const sigm = x => 1 / (1 + Math.exp(-x));
function initAssaults() {
  const Y = TICK_YEAR, S0 = START_TICK; const r = (a, b) => Math.round(rrange(a, b) * Y);
  G.assaults = [
    { id: 'wave1', t: S0 + r(1.6, 2.4) }, { id: 'wave2', t: S0 + r(4.0, 4.6) }, { id: 'dragon', t: S0 + Math.round(5.5 * Y) },
    { id: 'wave3', t: S0 + r(7.1, 7.9) }, { id: 'king', t: S0 + 10 * Y },
  ].map(a => Object.assign(a, { state: 'wait', omen: 0, grade: null, delayed: 0, provoked: 0, pred: null, res: null }));
  G.walls = 1; G.wallHp = 100; G.wallBuild = 0; G.prep = 0; G.moraleMod = 0; G.devPts = 0; G.territory = 0; G.awe = 20; G.aweMax = 150;
  G.ruins = {}; G.chain = { dragonType: null, dragonOutcome: null, cadres: 2, dragonAngry: 0 }; G.battle = null; G.loot = []; G.battleLog = [];
  G.flags.evac = 0; G.flags.aid = 0; G.dragonPact = false; G.titles = {};
  G.awakenTick = G.assaults[4].t - TICK_YEAR; // demon king revives one year before the march
}
function nextAssault() { return (G.assaults || []).find(a => a.state === 'wait'); }
function assaultName(a, L) { return ASSAULT_DEF[a.id].n[L]; }
function devLevel() { const p = G.devPts || 0; return p < -3 ? 0 : p < 4 ? 1 : p < 9 ? 2 : 3; }
const DEV_N = [['寒村', '寒村'], ['村', '村'], ['町', '町'], ['城塞都市', '城塞都市']];
function wallCap() { return 2 + devLevel(); }
function heroAlive() { const h = G.heroId && G.idx[G.heroId]; return !!(h && h.alive); }
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
}
/* ---------- defense (0..100, 5 parts) ---------- */
function defenseParts() {
  let pw = 0; for (const h of G.humans) { if (!isAdv(h) || h.away) continue; pw += lvlMul(h.lvl) * (1 + 0.07 * h.gear) * (0.55 + 0.45 * h.hp / Math.max(1, h.maxHp)); }
  if (G.flags.aid) pw += 6;
  const combat = clamp(pw / 40, 0, 1) * 100;
  const works = clamp(G.walls * 20 * (G.wallHp / 100) + (G.ruins && Object.keys(G.ruins).length ? -5 * Object.keys(G.ruins).length : 0), 0, 100);
  const ans = (G.stats.answered || 0) / ((G.stats.prayers || 0) + 6); const morale = clamp(44 + ans * 36 + (G.moraleMod || 0) + (G.moralePerm || 0) + (heroAlive() ? 10 : 0) + G.balance / 6 - (G.flags.evac ? 8 : 0), 0, 100);
  const supply = clamp(Math.min(40, G.town.food / 700 * 40) + Math.min(30, G.town.potions / 30 * 30) + Math.min(30, G.town.gearStock / 10 * 30), 0, 100);
  const divine = clamp(G.prep || 0, 0, 100);
  return { combat, works, morale, supply, divine };
}
const DEF_W = { combat: 0.35, works: 0.2, morale: 0.2, supply: 0.15, divine: 0.1 };
function defenseScore(p) { p = p || defenseParts(); let s = 0; for (const k in DEF_W) s += p[k] * DEF_W[k]; return s; }
function threatOf(a) {
  const d = ASSAULT_DEF[a.id]; let t = d.base;
  t += Math.max(0, -G.balance) / 12; t += (G.territory || 0) * 3; t -= a.provoked ? 8 : 0; if (G.easy) t -= 2.5; // V4.1-A12-6 easy mode: about +10pp
  if (a.id === 'dragon') { const ty = G.chain.dragonType; t += ty === 'village' ? 6 : ty === 'expedition' ? -4 : 0; t += G.chain.dragonAngry || 0; }
  if (a.id === 'king') { t += (G.chain.cadres || 2) * 4 - 8; const o = G.chain.dragonOutcome; t += o === 'slain' ? -8 : o === 'repelled' ? 6 : o === 'pact' ? -12 : o === 'lost' ? 12 : 0; }
  if (G.eco && !G.noEco) t *= 1 + ecoMod();
  if (G.castle) { t *= angerMul(); if (a.id === 'king') t *= 1 + (G.castle.kingPow - 1) * 0.3; } // the king is about half of his army's strength // W3: the army's anger; a new king is stronger // V4.2: more monsters in the field -> a stronger assault
  return t;
}
function adaptT(D, a) { if (a && a.adRef != null) return 0.8 * Math.max(0, a.adRef - 36) + 0.35 * Math.max(0, D - a.adRef); return 0.8 * Math.max(0, D - 36); } // V4.1-A3: the enemy answers a stronger village; it stops adapting at the half-year scout report, so late preparation counts fully
function winProb(a, extra) { if (!a) return 0; const D = defenseScore(); return sigm((D - threatOf(a) - adaptT(D, a) + 3 + (extra || 0)) / WIN_K); }
/* V4.1-A1: expected help from the god in the 3 phases (best affordable option per phase, sequential budget) */
function expHelp(faith) { let f = Math.max(60, faith === undefined ? G.faith : faith), aw = G.awe || 0, b = 0; for (let ph = 0; ph < 3; ph++) { const o = battleOptions(ph).filter(x => x.cost ? f >= x.cost : aw >= (x.awe || 0)).sort((x, y) => y.b - x.b)[0]; if (o) { b += o.b; if (o.cost) f -= o.cost; else aw -= o.awe; } } return b; }
/* defense trend -> projected defense when the assault arrives */
function defSample() { G.defHist = G.defHist || []; G.defHist.push([G.tick, defenseScore()]); if (G.defHist.length > 40) G.defHist.shift(); }
function defSlope() { const h = (G.defHist || []).filter(x => G.tick - x[0] <= TICK_YEAR * 1.5); if (h.length < 4) return 0.012; let sx = 0, sy = 0, sxx = 0, sxy = 0; for (const [x, y] of h) { sx += x; sy += y; sxx += x * x; sxy += x * y; } const n = h.length, den = n * sxx - sx * sx; return den ? (n * sxy - sx * sy) / den : 0; }
function winForecast(a) {
  a = a || nextAssault(); if (!a) return null; const D = defenseScore(), T = threatOf(a); const left = Math.max(0, a.t - G.tick);
  const now = sigm((D - T - adaptT(D, a) + 3 + expHelp()) / WIN_K);
  const Dp = clamp(D + clamp(defSlope(), -0.004, 0.03) * left * 0.8 + (left > SEASON_T ? 3 : 0), D - 5, D + 30);
  const faithThen = Math.min(G.faithMax, G.faith + left / TICK_DAY * 3);
  const then = sigm((Dp - T - adaptT(a.adRef != null ? D : Dp, a) + 3 + expHelp(faithThen)) / WIN_K);
  return { now, then, nowNoHelp: winProb(a), left };
}
/* ---------- timeline tick ---------- */
function assaultTick() {
  if (!G.assaults) return;
  const a = nextAssault(); if (!a) return;
  if (G.tick % 6 === 0) {
    const left = a.t - G.tick;
    if (a.omen < 1 && left <= TICK_YEAR) { a.omen = 1; logEvent('assault_omen', [], { a: a.id, step: 1 }, ['assault'], 0.55, 0.5, { x: FIELD_X0 + 4, y: 20 }); for (let i = 0; i < 3; i++) spawnMonster(Math.min(3, 1 + ASSAULT_ORDER.indexOf(a.id) % 3)); }
    if (a.omen < 2 && left <= TICK_YEAR / 2) { a.omen = 2; a.adRef = defenseScore(); logEvent('assault_omen', [], { a: a.id, step: 2, p: Math.round(winProb(a) * 100) }, ['assault'], 0.6, 0.5, PLAZA); }
    if (a.omen < 3 && left <= SEASON_T) { a.omen = 3; logEvent('assault_omen', [], { a: a.id, step: 3, mon: ASSAULT_DEF[a.id].mon }, ['assault'], 0.8, 0.7, a.id === 'king' ? BOSS.home : { x: FIELD_X0 + 4, y: 20 }); if (a.id === 'king' && !G.awakened) awaken(); }
  }
  if (!G.awakened && G.tick >= G.awakenTick) awaken();
  if (G.tick >= a.t && !G.battle) startBattle(a);
}
/* ---------- prep actions ---------- */
const PREP = {
  walls: { n: ['村長に神託：防壁を築く', '向村長降神諭：修築防壁'], d: ['守備↑（2日かけて1段階。糧食30）', '守備↑（花 2 天升 1 級，糧食 30）'], cost: 10, lv: 1, ok: () => G.walls + (G.wallBuild > 0 ? 1 : 0) < wallCap() && G.town.food >= 30 && !(G.wallBuild > 0), run: () => { G.town.food -= 30; G.wallBuild = 2 * TICK_DAY; } },
  weapons: { n: ['鍛冶に神託：武器を打つ', '向鐵匠降神諭：打造武器'], d: ['戦力↑（冒険者3人の装備+1）', '戰力↑（3 名冒險者裝備 +1）'], cost: 12, lv: 1, ok: () => !G.ruins[bldIdOf('smithy')] && G.humans.some(h => isAdv(h) && h.gear < 6), run: () => { G.humans.filter(h => isAdv(h) && h.gear < 6).sort((a, b) => b.lvl - a.lvl).slice(0, 3).forEach(h => { h.gear++; const st = hStats(h); h.maxHp = st.hp; }); } },
  train: { n: ['試煉：冒険者に修行させる', '試煉：讓冒險者修行'], d: ['戦力↑（多くがLv+1、けがの危険あり）', '戰力↑（多數 Lv+1，有受傷風險）'], cost: 25, lv: 1, ok: () => G.humans.some(isAdv), run: () => { G.humans.filter(isAdv).forEach(h => { const r = rnd(); if (r < 0.72) addExp(h, 30 * h.lvl); else if (r < 0.9) h.hp = Math.max(1, h.hp * 0.5); }); } },
  harvest: { n: ['豊穣の恩寵', '豐收恩寵'], d: ['補給↑（糧食+80）', '補給↑（糧食 +80）'], cost: 18, lv: 1, ok: () => G.town.food < 380, run: () => { G.town.food = Math.min(400, G.town.food + 80); } },
  potions: { n: ['薬師に神託：薬を作る', '向藥師降神諭：製藥'], d: ['補給↑（薬+6）', '補給↑（藥 +6）'], cost: 8, lv: 1, ok: () => G.town.potions < 28, run: () => { G.town.potions = Math.min(30, G.town.potions + 6); } },
  bless: { n: ['戦前の加護', '戰前加護'], d: ['神の備え↑（攻防の1季前から）', '神的備戰↑（攻防前 1 季內可用）'], cost: 15, lv: 1, ok: () => { const a = nextAssault(); return a && a.t - G.tick <= SEASON_T && (G.prep || 0) < 60; }, run: () => { G.prep = Math.min(60, (G.prep || 0) + 30); } },
  aid: { n: ['公会長に神託：隣国へ援軍', '向公會長降神諭：向鄰國求援'], d: ['戦力↑（次の攻防だけ）。戦後に糧食60を返礼', '戰力↑（僅下一場）；戰後回禮糧食 60'], cost: 20, lv: 1, ok: () => !G.flags.aid, run: () => { G.flags.aid = 1; } },
  evac: { n: ['子供と老人を避難させる', '疏散孩童與老人'], d: ['負けた時の犠牲↓、ただし士気↓', '戰敗時傷亡↓，但士氣↓'], cost: 5, lv: 1, ok: () => !G.flags.evac, run: () => { G.flags.evac = 1; } },
  barrier: { n: ['結界：攻防を1季遅らせる', '結界：攻防延後 1 季'], d: ['準備期間が増える（攻防ごとに1回）', '多 1 季準備（每場 1 次）'], cost: 55, lv: 3, ok: () => { const a = nextAssault(); return a && !a.delayed && a.t - G.tick > 6; }, run: () => { const a = nextAssault(); a.delayed = 1; shiftAssault(a, SEASON_T); } },
  provoke: { n: ['挑発の啓示：攻防を1季早める', '挑釁啟示：攻防提早 1 季'], d: ['敵の準備不足で脅威↓。畏怖↑・士気↓', '敵方準備不足，威脅↓；畏怖↑、士氣↓'], cost: 0, awe: -15, lv: 3, ok: () => { const a = nextAssault(); return a && !a.provoked && a.t - G.tick > SEASON_T + 6; }, run: () => { const a = nextAssault(); a.provoked = 1; a.t -= SEASON_T; G.moraleMod -= 8; } },
  dragonTalk: { n: ['竜語：巨竜と語らう', '龍語：與巨龍對話'], d: ['成功すれば巨竜と契約（戦わずに味方に）。失敗すると竜が怒る', '成功則與巨龍締約（不戰而成盟友）；失敗會激怒巨龍'], cost: 40, lv: 3, ok: () => { const a = nextAssault(); return a && a.id === 'dragon' && a.t - G.tick <= TICK_YEAR && !G.dragonPact && !G.flags.talked; }, run: () => { G.flags.talked = 1; const m = defenseParts().morale; const pr = clamp(0.3 + m / 250 + (G.god === 'mercy' ? 0.2 : 0) + (G.balance > 20 ? 0.1 : 0), 0, 0.9); if (rnd() < pr) { G.dragonPact = true; logEvent('dragon_pact', [], { ok: 1 }, ['assault'], 0.85, 0.9, PLAZA); } else { G.chain.dragonAngry = 6; logEvent('dragon_pact', [], { ok: 0 }, ['assault'], 0.6, 0.6, PLAZA); } } },
};
const PREP_ORDER = ['walls', 'weapons', 'train', 'harvest', 'potions', 'bless', 'aid', 'evac', 'barrier', 'provoke', 'dragonTalk'];
function bldIdOf(kind) { const b = W.blds.find(x => x.kind === kind); return b ? b.id : -1; }
function shiftAssault(a, dt) { a.t += dt; const i = G.assaults.indexOf(a); for (let k = i + 1; k < G.assaults.length; k++) { const p = G.assaults[k - 1], q = G.assaults[k]; if (q.t < p.t + TICK_YEAR / 2) q.t = p.t + TICK_YEAR / 2; } }
function prepAvailable(id) { const P = PREP[id]; if (!P || !G.assaults || !nextAssault()) return false; if ((G.godLv || 1) < P.lv) return false; if (P.cost > G.faith) return false; if (P.awe && G.awe + P.awe < 0) return false; return P.ok(); }
function doPrep(id) {
  if (!prepAvailable(id)) return false; const P = PREP[id]; G.faith -= P.cost; if (P.awe) G.awe = clamp(G.awe + P.awe, 0, G.aweMax); if (id === 'provoke') G.awe = clamp(G.awe + 20, 0, G.aweMax);
  { const a0 = nextAssault(); if (a0) { const d0 = prepDelta(id); G.prepGain = G.prepGain || {}; G.prepGain[a0.id] = (G.prepGain[a0.id] || 0) + Math.max(0, d0); } }
  P.run(); G.stats.preps = (G.stats.preps || 0) + 1; G.prepLog = G.prepLog || []; G.prepLog.push({ id, t: G.tick });
  logEvent('prep', [], { id }, ['assault'], 0.3, 0.3, PLAZA); return true;
}
function prepDelta(id) { // effect on the shown win chance ("now", with the god's help), for the advisor and the UI
  const a = nextAssault(); if (!a) return 0; const hp = expHelp(); const pAt = (Dv, dT) => sigm((Dv - threatOf(a) + (dT || 0) - adaptT(Dv, a) + 3 + hp) / WIN_K);
  const p0 = pAt(defenseScore()); const s = { food: G.town.food, potions: G.town.potions, prep: G.prep, walls: G.walls, wallHp: G.wallHp, aid: G.flags.aid, evac: G.flags.evac, mm: G.moraleMod };
  let p1;
  if (id === 'walls') { G.walls = Math.min(wallCap(), G.walls + 1); G.town.food -= 30; } else if (id === 'harvest') G.town.food += 80; else if (id === 'potions') G.town.potions += 6; else if (id === 'bless') G.prep = Math.min(60, G.prep + 30); else if (id === 'aid') G.flags.aid = 1; else if (id === 'evac') G.flags.evac = 1;
  if (id === 'weapons' || id === 'train') p1 = pAt(defenseScore() + 35 * (id === 'weapons' ? 0.06 * 0.8 : 0.09));
  else if (id === 'provoke') { G.moraleMod -= 8; p1 = pAt(defenseScore(), -8); }
  else if (id === 'barrier') p1 = p0 + 0.04; else p1 = pAt(defenseScore());
  G.town.food = s.food; G.town.potions = s.potions; G.prep = s.prep; G.walls = s.walls; G.wallHp = s.wallHp; G.flags.aid = s.aid; G.flags.evac = s.evac; G.moraleMod = s.mm;
  return p1 - p0;
}
function advisorPreps(n) { return PREP_ORDER.filter(prepAvailable).filter(id => id !== 'provoke' && id !== 'evac' && !(G.tutMode && id === 'walls')).map(id => ({ id, d: prepDelta(id), c: Math.max(5, PREP[id].cost) })).sort((x, y) => y.d / y.c - x.d / x.c).slice(0, n || 3); }
function dailyDefense() {
  if (!G.assaults) return;
  if (G.wallBuild > 0) { G.wallBuild -= TICK_DAY; if (G.wallBuild <= 0) { G.wallBuild = 0; G.walls = Math.min(wallCap(), G.walls + 1); G.wallHp = 100; logEvent('walls_up', [], { lv: G.walls }, ['assault'], 0.3, 0.4, PLAZA); } }
  if (G.wallHp < 100 && G.town.food >= 5) { G.wallHp = Math.min(100, G.wallHp + 6); G.town.food -= 1; }
  for (const id in G.ruins) { if (G.town.food >= 8) { G.ruins[id] -= 25; G.town.food -= 2; if (G.ruins[id] <= 0) { delete G.ruins[id]; logEvent('rebuilt', [], { b: +id }, ['assault'], 0.3, 0.4, PLAZA); } } }
  G.prep = Math.max(0, (G.prep || 0) - 4);
  G.moraleMod = (G.moraleMod || 0) * 0.97;
  G.awe = clamp(G.awe + Math.max(0, -G.balance) / 40 + 0.3 * (G.balance < 70 ? 1 : 0.3), 0, G.aweMax);
}
/* ---------- battle ---------- */
const INTERVENE = { // V4.1-A2: every phase has a Lv1 option that helps the humans; god-level skills are stronger versions
  0: [{ id: 'array', n: ['神託「陣を組め」', '神諭「布陣」'], b: 1, cost: 10, lv: 1 }, { id: 'foresight', n: ['預知夢：守りを先に固める', '預知夢：提前布陣'], b: 2, cost: 16, lv: 2 }],
  1: [{ id: 'guard', n: ['恩寵：冒険者1人に加護', '恩寵：加護 1 名冒險者'], b: 1, cost: 15, lv: 1 }, { id: 'confuse', n: ['迷い：敵の将を惑わす（畏怖）', '迷惘：迷惑敵將（畏怖）'], b: 2, awe: 18, lv: 2 }],
  2: [{ id: 'rally', n: ['試煉：英雄をふるい立たせる', '試煉：激勵英雄'], b: 2, cost: 20, lv: 1 }, { id: 'miracle', n: ['奇跡：英雄に力を', '奇蹟：賜英雄力量'], b: 5, cost: 40, lv: 5 }],
};
const PHASE_N = [['前哨戦', '前哨戰'], ['本戦', '主戰'], ['決戦', '決勝']];
function startBattle(a) {
  a.state = 'battle'; const D0 = defenseScore(); const D = D0 - adaptT(D0, a), T = threatOf(a); const L = WIN_K * Math.log(1 / Math.max(1e-6, rnd()) - 1) * -1; // logistic noise
  a.pred = Math.round(winProb(a) * 100); a.predHelp = Math.round(sigm((D - T + 3 + expHelp()) / WIN_K) * 100); const fc = G.forecasts && G.forecasts[a.id]; a.fcThen = fc ? fc.then : null;
  G.battle = { xp0: G.godXp || 0, prepGain: (G.prepGain || {})[a.id] || 0, a: a.id, D, T, L, phase: 0, bonus: 0, choices: [], parts: defenseParts(), done: false, startT: G.tick, partial: [], helpMon: 0 };
  if (a.id === 'dragon' && G.dragonPact) { G.battle.pact = true; }
  { const hero = G.heroId && G.idx[G.heroId]; if (hero && hero.alive && !hero.away) { if (hero.crown) G.battle.bonus += 2.4; if ((hero.skills || []).indexOf('heroStrike') >= 0) G.battle.bonus += 2; } } // crown +10pt, hero's strike +8pt in the decisive phase
  logEvent('assault_start', [], { a: a.id, p: a.pred, mon: ASSAULT_DEF[a.id].mon }, ['assault'], 1, 0.9, a.id === 'king' ? PLAZA : { x: FIELD_X0, y: 23 });
  if (G.onBattle) G.onBattle(G.battle);
}
function battleOptions(phase) { return (INTERVENE[phase] || []).filter(o => (G.godLv || 1) >= o.lv); }
function canIntervene(o) { return o.cost ? G.faith >= o.cost : G.awe >= (o.awe || 0); }
function battleStep(choice) { // choice: option id | 'none' | 'monsters'
  const B = G.battle; if (!B || B.done) return null;
  if (B.pact) { finishBattle(); return B; }
  let bonus = 0; const opt = (INTERVENE[B.phase] || []).find(o => o.id === choice);
  if (opt && (G.godLv || 1) >= opt.lv && canIntervene(opt)) { if (opt.cost) G.faith -= opt.cost; if (opt.awe) G.awe -= opt.awe; bonus = opt.b; G.stats.interventions = (G.stats.interventions || 0) + 1; }
  else if (choice === 'monsters') { bonus = -[6, 8, 10][B.phase]; G.awe = clamp(G.awe + [12, 18, 28][B.phase], 0, G.aweMax); B.helpMon++; }
  B.choices.push(opt || choice === 'monsters' ? (opt ? opt.id : 'monsters') : 'none'); B.bonus += bonus;
  const part = (B.D - B.T) / 3 + bonus + B.L / 3; B.partial.push(part); B.phase++;
  if (B.phase >= 3) finishBattle();
  return B;
}
function gradeOf(m) { return m >= 14 ? 'crush' : m >= 4 ? 'win' : m >= -3 ? 'pyrrhic' : m >= -14 ? 'loss' : 'rout'; }
function finishBattle() {
  const B = G.battle, a = G.assaults.find(x => x.id === B.a); B.done = true;
  let m = B.D - B.T + B.bonus + B.L; if (G.tutMode && B.a === 'wave1' && B.bonus > 0) m = Math.max(m, 5); // practice world: helping always wins
  let grade = B.pact ? 'pact' : gradeOf(m); B.m = m; B.grade = grade; a.predFinal = Math.round(sigm((B.D - B.T + B.bonus + 3) / WIN_K) * 100); a.grade = grade; a.state = 'done';
  const res = applyConsequences(a, grade); B.res = res; a.res = res; G.battleLog.push({ id: a.id, grade, pred: a.pred, m: Math.round(m), deaths: res.deaths.length, t: G.tick });
  G.flags.aid = 0; G.flags.evac = 0; G.prep = 0; G.flags.talked = 0; if (G.period && !isWin(grade)) G.period.losses++;
  B.decrees = settleDecrees('battle', res).concat(a.id === 'dragon' ? settleDecrees('dragon') : []); B.xp = (G.godXp || 0) - (B.xp0 || 0);
  logEvent('assault_end', res.heroes.slice(0, 2), { a: a.id, grade, win: isWin(grade), mon: ASSAULT_DEF[a.id].mon, deaths: res.deaths.length }, ['assault'], 1, 1, PLAZA);
  if (G.onBattleEnd) G.onBattleEnd(B);
  if (a.id === 'king') { if (isWin(grade)) { G.boss.alive = false; logEvent('boss_slain', res.heroes.slice(0, 1), {}, ['boss'], 1, 1, BOSS.home); endGame('victory'); } else endGame('doom'); }
}
function isWin(g) { return g === 'crush' || g === 'win' || g === 'pyrrhic' || g === 'pact'; }
function applyConsequences(a, grade) {
  const k = ASSAULT_DEF[a.id]; const win = isWin(grade); const res = { deaths: [], ruined: [], levels: [], loot: [], dev: 0, migrants: 0, titles: [], heroes: [] };
  const advs = G.humans.filter(isAdv).sort((x, y) => advPower(y) - advPower(x)); res.heroes = advs.slice(0, 3).map(h => h.id);
  if (grade === 'pact') { G.chain.dragonOutcome = 'pact'; G.moraleMod += 10; G.balance = clamp(G.balance + 6, -100, 100); res.note = 'pact'; godXp(15); return res; }
  // experience
  advs.forEach((h, i) => { const n = win ? (i < 3 ? rint(2, 4) : rint(1, 2)) : rint(0, 1); for (let j = 0; j < n; j++) addExp(h, 30 * h.lvl); if (n) res.levels.push([h.id, n]); });
  // casualties
  const nd = { crush: [0, 1], win: [1, 2], pyrrhic: [2, 4], loss: [4, 7], rout: [7, 11] }[grade]; let dn = Math.round(rint(nd[0], nd[1]) * (k.kind === 'wave' ? 1 : 1.25) * (G.humans.some(h => h.alive && (h.skills || []).indexOf('holyShield') >= 0) ? 0.8 : 1) * (G.humans.some(h => h.alive && (h.skills || []).indexOf('healPrayer') >= 0) ? 0.75 : 1));
  const pool = G.humans.filter(h => h.alive && h.age >= 6 && !h.away); const w = h => (isAdv(h) ? 4 : 1) * ((h.child || h.age >= 56) ? (G.flags.evac ? 0.15 : 1) : 1) * (h.job === 'historian' ? 0.2 : 1);
  for (let i = 0; i < dn && pool.length > 6; i++) { let tot = 0; pool.forEach(h => tot += w(h)); let r = rnd() * tot; let pick = pool[0]; for (const h of pool) { r -= w(h); if (r <= 0) { pick = h; break; } } pool.splice(pool.indexOf(pick), 1); killHuman(pick, 'battle', null); res.deaths.push(pick.id); G.humans.forEach(o => { if (o.alive && o.parent === pick.id && o.age < 16) o.vengeful = 1; }); }
  res.levels = res.levels.filter(l => !res.deaths.includes(l[0]));
  // buildings & walls
  const nr = { crush: 0, win: 0, pyrrhic: 1, loss: 2, rout: 4 }[grade] + (a.id === 'dragon' && G.chain.dragonType === 'village' && !win ? 2 : 0);
  const cand = W.blds.filter(b => b.kind !== 'castle' && b.kind !== 'mill' && !G.ruins[b.id]); for (let i = 0; i < nr && cand.length; i++) { const b = cand.splice(rint(0, cand.length - 1), 1)[0]; G.ruins[b.id] = 100; res.ruined.push(b.id); }
  G.wallHp = Math.max(0, G.wallHp - { crush: 5, win: 15, pyrrhic: 35, loss: 60, rout: 90 }[grade]); if (grade === 'rout' && G.walls > 0) G.walls--;
  // supplies, morale, balance, faith / awe
  G.town.food = Math.max(0, G.town.food * (win ? 0.85 : 0.6) - (G.flags.aid ? 60 : 0)); G.town.potions = Math.floor(G.town.potions * 0.5); G.town.gearStock = Math.max(0, G.town.gearStock - (win ? 0 : 2));
  G.moraleMod += { crush: 15, win: 10, pyrrhic: 0, loss: -12, rout: -20 }[grade];
  G.balance = clamp(G.balance + { crush: 10, win: 6, pyrrhic: 2, loss: -10, rout: -16 }[grade], -100, 100);
  if (win) { G.faith = Math.min(G.faithMax, G.faith + 20); faithLog('war', 20); } G.awe = clamp(G.awe + (win ? 5 : 25), 0, G.aweMax);
  const dd = { crush: 3, win: 2, pyrrhic: 1, loss: -2, rout: -4 }[grade]; const dv0 = devLevel(); G.devPts += dd; res.dev = devLevel() - dv0; if (res.dev) logEvent('dev_change', [], { lv: devLevel(), up: res.dev > 0 }, ['assault'], 0.6, 0.6, PLAZA);
  if (!win) G.territory = (G.territory || 0) + 1;
  // loot, titles, migrants
  if (win) {
    const best = advs[0]; if (best) { const tt = a.id === 'dragon' ? ['竜殺し', '屠龍者'] : a.id === 'king' ? ['勇者', '勇者'] : ['守護者', '守護者']; G.titles[best.id] = tt; res.titles.push([best.id, tt]); }
    const lt = a.id === 'dragon' ? [['竜殺しの剣', '屠龍劍'], ['竜鱗の鎧', '龍鱗鎧']] : [['魔物の核', '魔物核'], ['精霊銀', '精靈銀']]; res.loot = lt; G.loot.push(...lt); advs.slice(0, a.id === 'dragon' ? 2 : 1).forEach(h => { h.gear = Math.min(8, h.gear + (a.id === 'dragon' ? 2 : 1)); const st = hStats(h); h.maxHp = st.hp; });
    const mg = grade === 'crush' ? rint(2, 3) : grade === 'win' ? rint(1, 2) : 0; for (let i = 0; i < mg && G.humans.filter(x => x.alive).length < POP_MAX; i++) { addMigrant(); res.migrants++; }
    if (grade !== 'pyrrhic') logEvent('festival', advs.slice(0, 2).map(h => h.id), { a: a.id }, ['assault'], 0.55, 0.9, PLAZA);
  }
  // chains
  if (a.id === 'wave2') { const w1 = isWin(G.assaults[0].grade), w2 = win; G.chain.dragonType = w1 && w2 ? 'expedition' : (w1 || w2) ? 'field' : 'village'; }
  if (a.id === 'dragon') G.chain.dragonOutcome = grade === 'crush' || (grade === 'win' && rnd() < 0.6) ? 'slain' : grade === 'win' || grade === 'pyrrhic' ? 'repelled' : 'lost';
  if (a.id === 'wave3') G.chain.cadres = win ? 1 : 3;
  godXp(win ? 25 : 10);
  return res;
}
function addMigrant() {
  const jobs = ['farmer', 'farmer', 'swordsman', 'mage', 'priest', 'merchant', 'smith', 'herbalist']; const job = rpick(jobs);
  const homes = W.homes.filter(hi => G.humans.filter(o => o.alive && o.home === hi).length < 5); const home = homes.length ? rpick(homes) : rpick(W.homes);
  const h = mkHuman({ job, age: rint(18, 34), lvl: job === 'swordsman' || job === 'mage' || job === 'priest' ? rint(2, 4) : 1, home }); const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y);
  G.humans.push(h); G.idx[h.id] = h; logEvent('migrant', [h.id], { job }, [], 0.35, 0.5, h);
}
/* auto-resolve battles (no UI attached, or fast-forward) */
function autoBattle() {
  const B = G.battle; if (!B || B.done) return;
  if (B.pact) { finishBattle(); return; }
  const pol = G.policy || 'none';
  while (!B.done) {
    let ch = 'none';
    if (pol === 'basic' || pol === 'engaged') { const opts = battleOptions(B.phase).filter(canIntervene).sort((x, y) => y.b - x.b); if (opts.length) ch = opts[0].id; }
    battleStep(ch);
  }
}

/* V4.1-A14: faith ledger (today / yesterday) for the faith tooltip and tests */
function faithLog(k, v) { if (!G) return; G.fLed = G.fLed || {}; G.fLed[k] = (G.fLed[k] || 0) + v; }
function faithDay() { G.fLedY = G.fLed || {}; G.fLed = {}; G.faithHist = G.faithHist || []; G.faithHist.push(Math.round(G.faith / G.faithMax * 100)); if (G.faithHist.length > 200) G.faithHist.shift(); defSample(); const a = nextAssault(); if (a) { G.forecasts = G.forecasts || {}; if (!G.forecasts[a.id] || a.t - G.tick >= TICK_YEAR) G.forecasts[a.id] = winForecast(a); } }
