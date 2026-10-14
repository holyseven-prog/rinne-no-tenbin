/* ================= V4-A2: god level, council & decrees, edicts, era cards ================= */
const GOD_LV_XP = [0, 20, 50, 90, 140, 200, 270, 350, 440, 540];
function godLvOf(xp) { let lv = 1; for (let i = 0; i < GOD_LV_XP.length; i++) if (xp >= GOD_LV_XP[i]) lv = i + 1; return lv; }
function godXp(n) { G.godXp = (G.godXp || 0) + n; const lv = godLvOf(G.godXp); if (lv > (G.godLv || 1)) { G.godLv = lv; logEvent('god_lv', [], { lv }, ['god'], 0.6, 0.6, PLAZA); } }
const GOD_SKILL = { 2: ['預知夢・迷い', '預知夢・迷惘'], 3: ['結界・挑発・竜語', '結界・挑釁・龍語'], 5: ['奇跡', '奇蹟'], 6: ['（化身降臨：今後）', '（化身降臨：日後）'] };
/* decrees: check(when) returns true/false/null(not yet) */
const DECREES = {
  noDeath: { side: 'h', n: ['次の攻防で死者を出さない', '下一場攻防零死亡'], at: 'battle', check: r => r.deaths.length === 0 },
  slayer: { side: 'h', n: ['竜殺しを生む（巨竜を討つ）', '誕生屠龍者（討伐巨龍）'], at: 'dragon', check: () => G.chain.dragonOutcome === 'slain', phase: 0 },
  hero: { side: 'h', n: ['勇者を誕生させる（剣士Lv6）', '讓勇者誕生（劍士 Lv6）'], at: 'council', check: () => heroAlive() },
  town: { side: 'h', n: ['村を町に育てる', '把村莊發展成町'], at: 'council', check: () => devLevel() >= 2 },
  walls3: { side: 'h', n: ['防壁を3段以上にする', '防壁達到 3 級以上'], at: 'council', check: () => G.walls >= 3 },
  letLose: { side: 'm', n: ['魔物に一戦を取らせる', '讓魔物贏下一場'], at: 'council', check: per => per.losses > 0 },
  dragonNorth: { side: 'm', n: ['巨竜に北山を占拠させる', '讓巨龍佔據北山'], at: 'dragon', check: () => G.chain.dragonOutcome === 'lost', phase: 0 },
  awe100: { side: 'm', n: ['畏怖を100以上にする', '畏怖達到 100 以上'], at: 'council', check: () => G.awe >= 100 },
  balance25: { side: 'b', n: ['天秤を±25の内に保つ（期間の8割）', '天秤維持在 ±25 內（期間 8 成）'], at: 'council', check: per => per.balDays > 0 && per.balIn / per.balDays >= 0.8 },
  pact: { side: 'b', n: ['巨竜と契約する', '與巨龍締約'], at: 'dragon', check: () => G.chain.dragonOutcome === 'pact', phase: 0 },
  orphan: { side: 'b', n: ['遺された子を冒険者にする', '讓遺孤成為冒險者'], at: 'council', check: per => per.orphanAdv > 0 },
};
const EDICTS = {
  harvest: { n: ['豊穣の勅', '豐穰之敕'], d: ['糧食+120（信仰30）', '糧食 +120（信仰 30）'], cost: 30, run: () => { G.town.food = Math.min(400, G.town.food + 120); } },
  unity: { n: ['結束の勅', '團結之敕'], d: ['士気+15（信仰30）', '士氣 +15（信仰 30）'], cost: 30, run: () => { G.moraleMod += 15; } },
  dread: { n: ['畏れの勅', '畏懼之敕'], d: ['畏怖+40、士気-10', '畏怖 +40、士氣 -10'], cost: 0, run: () => { G.awe = clamp(G.awe + 40, 0, G.aweMax); G.moraleMod -= 10; } },
};
function councilOffer(idx) {
  const rg = new RNG((G.seed * 31 + idx * 977) >>> 0); const pick = arr => arr[rg.int(0, arr.length - 1)];
  const early = idx === 0; const h = early ? ['slayer', 'hero', 'noDeath', 'walls3'] : ['town', 'noDeath', 'walls3', 'hero'];
  const m = early ? ['dragonNorth', 'letLose', 'awe100'] : ['letLose', 'awe100']; const b = early ? ['pact', 'balance25', 'orphan'] : ['balance25', 'orphan'];
  return [pick(h), pick(m), pick(b)];
}
function startPeriod() { G.period = { from: G.tick, losses: 0, balDays: 0, balIn: 0, orphanAdv: 0 }; }
function openCouncil(idx) {
  // settle decrees that are checked at councils
  const settled = settleDecrees('council');
  G.council = { idx, offer: councilOffer(idx), settled, picked: [], edict: null, done: false, t: G.tick };
  logEvent('council', [], { idx }, ['god'], 0.7, 0.6, PLAZA);
  if (G.onCouncil) G.onCouncil(G.council);
}
function closeCouncil(picked, edict) {
  const C = G.council; if (!C || C.done) return; C.done = true; C.picked = (picked || []).slice(0, 2);
  G.decrees = (G.decrees || []).filter(d => d.state !== 'active' || DECREES[d.id].at !== 'council');
  C.picked.forEach(id => G.decrees.push({ id, from: C.idx, state: 'active', t: G.tick }));
  if (edict && EDICTS[edict] && G.faith >= EDICTS[edict].cost) { G.faith -= EDICTS[edict].cost; EDICTS[edict].run(); C.edict = edict; G.stats.edicts = (G.stats.edicts || 0) + 1; }
  startPeriod(); G.stats.decisions = (G.stats.decisions || 0) + 1;
}
function settleDecrees(at, ctx) {
  const out = []; (G.decrees || []).forEach(d => {
    if (d.state !== 'active') return; const D = DECREES[d.id]; if (!D) return;
    let ok = null;
    if (at === 'battle' && D.at === 'battle') ok = D.check(ctx);
    else if (at === 'dragon' && D.at === 'dragon') ok = D.check(ctx);
    else if (at === 'council' && D.at === 'council') ok = D.check(G.period || { losses: 0, balDays: 0, balIn: 0, orphanAdv: 0 });
    if (ok === null) return; d.state = ok ? 'done' : 'fail'; out.push({ id: d.id, ok });
    if (ok) { godXp(30); if (D.side === 'm') G.awe = clamp(G.awe + 25, 0, G.aweMax); else G.faith = Math.min(G.faithMax, G.faith + 20); }
  });
  if (out.length) logEvent('decree_settle', [], { n: out.length, ok: out.filter(o => o.ok).length }, ['god'], 0.5, 0.5, PLAZA);
  G.decreeLog = (G.decreeLog || []).concat(out.map(o => Object.assign({ t: G.tick }, o)));
  return out;
}
function councilTick() {
  if (G.tutMode) return; // practice world: the council is opened by the tutorial
  if (!G.assaults) return;
  if (!G.councilDone0 && G.tick >= START_TICK + 12 && !G.council) { G.councilDone0 = 1; openCouncil(0); }
  const dr = G.assaults.find(a => a.id === 'dragon'); if (dr && dr.state === 'done' && !G.councilDone1 && !G.battle) { G.councilDone1 = 1; G.council = null; openCouncil(1); }
  if (G.council && !G.council.done && !G.uiAttached || G.council && !G.council.done && G.forceAuto) autoCouncil();
}
function autoCouncil() { const C = G.council; const pol = G.policy || 'none'; const prefer = C.offer.filter(id => DECREES[id].side !== 'm'); const picked = (pol === 'basic' ? prefer.concat(C.offer) : C.offer).filter((v, i, a) => a.indexOf(v) === i).slice(0, 2); closeCouncil(picked, pol === 'basic' && G.faith > 90 ? 'unity' : null); }
function periodDaily() {
  if (!G.period) return; G.period.balDays++; if (Math.abs(G.balance) <= 25) G.period.balIn++;
}
/* ---------- era cards (時代の兆し) ---------- */
const CARDS = {
  caravan: { n: ['商隊がやって来た', '商隊來了'], d: ['迎え入れれば糧食と金が入る。', '迎接的話，會帶來糧食與金錢。'], opts: { push: { n: ['迎える（信仰5）', '迎接（信仰 5）'], cost: 5, run: () => { G.town.food = Math.min(400, G.town.food + 50); G.town.gold += 60; } }, stop: { n: ['追い返す', '趕走'], run: () => { G.moraleMod -= 2; } } }, rec: 'push' },
  recruit: { n: ['若者が冒険者を志した', '年輕人想當冒險者'], d: ['後押しすれば戦力が増える。畑の人手は減る。', '推一把會增加戰力，但田裡少了人手。'], opts: { push: { n: ['後押し（信仰8）', '推一把（信仰 8）'], cost: 8, run: () => { const c = G.humans.filter(h => h.alive && h.job === 'farmer' && h.age >= 16 && h.age < 30); if (c.length) { const h = rpick(c); h.job = 'swordsman'; h.adv = true; const st = hStats(h); h.maxHp = st.hp; h.hp = st.hp; logEvent('coming_of_age', [h.id], { job: 'swordsman' }, [], 0.4, 0.5, h); } } }, stop: { n: ['畑に残す', '留在田裡'], run: () => { G.town.food += 20; } } }, rec: 'push' },
  plague: { n: ['疫病の兆し', '疫病的徵兆'], d: ['止めないと死者が出るかもしれない。', '不阻止的話，可能會有人死去。'], opts: { stop: { n: ['清める（信仰15）', '淨化（信仰 15）'], cost: 15, run: () => { } } }, leave: () => { const c = G.humans.filter(h => h.alive && (h.age >= 56 || h.child)); for (let i = 0; i < Math.min(2, c.length); i++) if (rnd() < 0.5) killHuman(rpick(c), 'illness', null); G.moraleMod -= 5; }, rec: 'stop' },
  nest: { n: ['魔物の巣が見つかった', '發現魔物巢穴'], d: ['放っておくと魔物の領地が広がる。', '放著不管，魔物的領地會擴大。'], opts: { push: { n: ['冒険者に攻めさせる', '派冒險者進攻'], run: () => { G.humans.filter(isAdv).slice(0, 4).forEach(h => { addExp(h, 20 * h.lvl); if (rnd() < 0.12) h.hp = Math.max(1, h.hp * 0.4); }); } }, stop: { n: ['封じる（信仰20）', '封印（信仰 20）'], cost: 20, run: () => { G.territory = Math.max(0, (G.territory || 0) - 1); } } }, leave: () => { G.territory = (G.territory || 0) + 1; }, rec: 'push' },
  festival: { n: ['祭りをしたいと声が上がった', '有人提議辦祭典'], d: ['糧食を使うが、士気が上がる。', '會用掉糧食，但士氣會上升。'], opts: { push: { n: ['祭りを開く（糧食40）', '舉辦祭典（糧食 40）'], run: () => { G.town.food = Math.max(0, G.town.food - 40); G.moraleMod += 8; } }, stop: { n: ['見送る', '先不辦'], run: () => { } } }, rec: 'push', need: () => G.town.food > 120 },
  migrants: { n: ['移民の一団が来た', '一群移民到來'], d: ['受け入れると人が増える。糧食は減る。', '接納的話人口增加，糧食會減少。'], opts: { push: { n: ['受け入れる（糧食30）', '接納（糧食 30）'], run: () => { G.town.food = Math.max(0, G.town.food - 30); addMigrant(); addMigrant(); } }, stop: { n: ['断る', '拒絕'], run: () => { } } }, rec: 'push', need: () => G.humans.filter(h => h.alive).length < POP_MAX - 4 },
  rumor: { n: ['不穏なうわさが広がっている', '不安的謠言在擴散'], d: ['放っておくと士気が下がり、畏怖が増える。', '放著不管士氣會下降，畏怖會增加。'], opts: { stop: { n: ['お告げで鎮める（信仰10）', '以神諭平息（信仰 10）'], cost: 10, run: () => { } } }, leave: () => { G.moraleMod -= 6; G.awe = clamp(G.awe + 10, 0, G.aweMax); }, rec: 'stop' },
  smithIdea: { n: ['鍛冶が新しい技を思いついた', '鐵匠想到了新技術'], d: ['後押しすれば装備がよくなる。', '推一把的話裝備會變好。'], opts: { push: { n: ['後押し（信仰12）', '推一把（信仰 12）'], cost: 12, run: () => { G.town.gearStock = Math.min(10, G.town.gearStock + 3); G.humans.filter(isAdv).slice(0, 2).forEach(h => { h.gear = Math.min(8, h.gear + 1); }); } } }, rec: 'push', need: () => !G.ruins[bldIdOf('smithy')] },
  envoy: { n: ['魔王軍の密使が現れた', '魔王軍密使現身'], d: ['通せば畏怖が増えるが、魔王軍が強くなる。', '放行的話畏怖增加，但魔王軍變強。'], opts: { push: { n: ['通す（畏怖+20）', '放行（畏怖 +20）'], run: () => { G.awe = clamp(G.awe + 20, 0, G.aweMax); G.chain.cadres = (G.chain.cadres || 2) + 1; } }, stop: { n: ['追い払う（信仰10）', '驅逐（信仰 10）'], cost: 10, run: () => { } } }, rec: 'stop', need: () => yearOf(G.tick) >= 5 },
};
const CARD_KEYS = Object.keys(CARDS);
function cardTick() {
  if (G.tutMode) return;
  if (!G.assaults || G.ending) return;
  if (G.tick % TICK_DAY === 0) {
    G.cards = (G.cards || []).filter(c => { if (G.tick - c.t >= 2 * TICK_DAY) { resolveCard(c, 'leave'); return false; } return true; });
    if (dayIdx(G.tick) % 3 === 1 && (G.cards || []).length < 1 && rnd() < 0.7) {
      const n = 1; for (let i = 0; i < n; i++) { const pool = CARD_KEYS.filter(k => (!CARDS[k].need || CARDS[k].need()) && !(G.cards || []).some(c => c.id === k) && G.tick - ((G.cardSeen || {})[k] || -1e9) > 4 * SEASON_T); if (!pool.length) break; const id = rpick(pool); (G.cardSeen = G.cardSeen || {})[id] = G.tick; G.cards.push({ id, t: G.tick, n: G.nid++ }); if (G.onCard) G.onCard(id); }
    }
  }
  if ((G.cards || []).length && (!G.uiAttached || G.forceAuto)) { const pol = G.policy || 'none'; G.cards.slice().forEach(c => { if (pol === 'basic') { const C = CARDS[c.id]; const o = C.opts[C.rec]; decideCard(c.n, o && (!o.cost || G.faith >= o.cost + 30) ? C.rec : 'leave'); } else decideCard(c.n, 'leave'); }); }
}
function resolveCard(c, opt) {
  const C = CARDS[c.id]; if (!C) return; if (opt === 'leave') { if (C.leave) C.leave(); } else { const o = C.opts[opt]; if (!o) return; if (o.cost && G.faith < o.cost) { if (C.leave) C.leave(); return; } if (o.cost) G.faith -= o.cost; o.run(); }
  G.stats.decisions = (G.stats.decisions || 0) + (opt === 'leave' ? 0 : 1); G.cardLog = (G.cardLog || []).concat([{ id: c.id, opt, t: G.tick }]); G.stats.cards = (G.stats.cards || 0) + 1;
}
function decideCard(n, opt) { const i = (G.cards || []).findIndex(c => c.n === n); if (i < 0) return false; const c = G.cards.splice(i, 1)[0]; resolveCard(c, opt); return true; }
/* ---------- event tiers (S: stop & show, A: highlight, B: routine summary) ---------- */
const FEED_S = { assault_start: 1, assault_end: 1, hero_born: 1, boss_awaken: 1, dragon_pact: 1, council: 1, boss_slain: 1, ending_doom: 1, ending_victory: 1, ending_godleft: 1 };
const FEED_A = { death: 1, marriage: 1, betrayal: 1, birth: 1, love_start: 1, dev_change: 1, festival: 1, promotion: 1, god_lv: 1, decree_settle: 1, master_farewell: 1, destined_reunion: 1, miracle: 1, reincarnation: 1 };
const FEED_B = { party_formed: 1, quest_clear: 1, quest_fail: 1, first_battle: 1, prep: 1, walls_up: 1, rebuilt: 1, coming_of_age: 1, migrant: 1, gear: 1, quarrel: 1, reconcile: 1, love_notice: 1, divine_act: 1, prayer_expired: 1, monster_raid: 1 };
function feedClass(ev) { if (ev.type === 'assault_omen') return ev.payload && ev.payload.step === 3 ? 'S' : 'A'; if (FEED_S[ev.type]) return 'S'; if (FEED_A[ev.type]) return 'A'; if (FEED_B[ev.type]) return 'B'; return ev.tension >= 0.6 ? 'A' : null; }
