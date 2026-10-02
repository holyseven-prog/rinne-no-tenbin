/* ================= story engine v2: arcs, memory, foreshadowing, director (R3) ================= */
const SCN = {};
function normBeat(b) { if (Array.isArray(b)) return { p: [b[0], b[1]], th: b[2] || null }; return b; }
function defScene(id, spec) {
  const s = SCN[id] || (SCN[id] = { open: [], dev: [], inner: [], close: [], t: [], sum: [], talk: [], mood: 'calm' });
  for (const k in spec) {
    if (k === 'open' || k === 'dev' || k === 'inner' || k === 'close') s[k] = s[k].concat(spec[k].map(normBeat));
    else if (k === 't' || k === 'sum') s[k] = s[k].concat(spec[k]);
    else s[k] = spec[k];
  }
}
/* meta: kind of arc, number of protagonists, ending flags */
const SMETA = {
  depart: { kind: 'growth', prot: 1 }, firstbattle: { kind: 'growth', prot: 1 }, defeat: { kind: 'growth', prot: 1 }, return: { kind: 'growth', prot: 1 }, promotion: { kind: 'growth', prot: 1, end: 1 },
  g_wish: { kind: 'growth', prot: 1 }, g_train: { kind: 'growth', prot: 1 }, g_scar: { kind: 'growth', prot: 1 }, g_gear: { kind: 'growth', prot: 1 },
  mentor_parting: { kind: 'mentor', prot: 2, end: 1 }, mentor_train: { kind: 'mentor', prot: 2 },
  love_notice: { kind: 'love', prot: 2 }, confess: { kind: 'love', prot: 2 }, drift: { kind: 'love', prot: 2 }, quarrel: { kind: 'love', prot: 2 }, reconcile: { kind: 'love', prot: 2 }, wedding: { kind: 'love', prot: 2, end: 1 }, birth: { kind: 'love', prot: 1 }, family_day: { kind: 'love', prot: 2 },
  betrayal: { kind: 'sin', prot: 2 }, guilt: { kind: 'sin', prot: 2 }, forgive: { kind: 'sin', prot: 2, end: 1 },
  oracle_dream: { kind: 'faith', prot: 1 }, miracle: { kind: 'faith', prot: 1 }, doubt: { kind: 'faith', prot: 1 }, trial: { kind: 'faith', prot: 1 }, answered: { kind: 'faith', prot: 1 }, unanswered: { kind: 'faith', prot: 1 },
  funeral: { kind: 'loss', prot: 1, dead: 1 }, grief: { kind: 'loss', prot: 1 }, comfort: { kind: 'loss', prot: 2 }, revenge: { kind: 'loss', prot: 1 },
  awakening: { kind: 'rebirth', prot: 1 }, reunion: { kind: 'rebirth', prot: 2, end: 1 }, echo_dream: { kind: 'rebirth', prot: 1 },
  raid: { kind: 'war', prot: 1 }, siege: { kind: 'war', prot: 1 }, omen: { kind: 'war', prot: 1 }, eve: { kind: 'war', prot: 1 }, battle: { kind: 'war', prot: 1 }, trial_g: { kind: 'faith', prot: 1 },
  supplement: { kind: 'none', prot: 1 }, master_farewell: { kind: 'mentor', prot: 2 },
};
const INTERLUDE = { growth: ['g_train', 'g_wish', 'g_scar'], mentor: ['mentor_train'], love: ['family_day', 'love_notice'], sin: ['guilt'], faith: ['doubt', 'answered'], loss: ['grief', 'comfort', 'revenge'], rebirth: ['echo_dream'] };
const PLANT = { depart: ['promise'], eve: ['promise'], mentor_parting: ['promise'], mentor_train: ['wish'], oracle_dream: ['dream'], echo_dream: ['echo'], awakening: ['echo'], betrayal: ['secret'], g_wish: ['wish'], omen: ['omen'], love_notice: ['wish'], confess: ['promise'], g_train: ['wish'] };
const RESOLVE = { return: ['promise', 'wish'], promotion: ['wish', 'dream', 'promise'], wedding: ['wish', 'promise'], reunion: ['promise', 'echo'], funeral: ['promise', 'dream', 'secret', 'wish'], forgive: ['secret'], battle: ['omen', 'promise', 'dream'], miracle: ['dream'], firstbattle: ['dream'], eve: ['omen'], g_scar: ['dream'], defeat: ['promise'], birth: ['wish'], comfort: ['promise'], answered: ['dream'], echo_dream: ['echo'] };
const ARC_MAX = 3, ARC_PARTS = 4;

/* ---------- memory ---------- */
function memOf(h) { if (!h.mem) h.mem = { inj: 0, promise: null, god: null, rival: 0, loss: null, glory: 0, guilt: 0, cb: {} }; return h.mem; }
function partnerOf(h) {
  if (!h) return 0; const m = memOf(h); const ok = i => i && G.idx[i] && G.idx[i].alive && G.idx[i].age >= 10 && i !== h.id;
  if (ok(h.spouse)) return h.spouse; if (ok(h.love)) return h.love; if (ok(m.rival)) return m.rival; if (ok(h.master)) return h.master;
  const ap = G.humans.find(o => o.alive && o.master === h.id && o.age >= 10); if (ap) return ap.id;
  if (h.party && G.pidx[h.party]) { const mm = G.pidx[h.party].members.find(i => ok(i)); if (mm) return mm; }
  if (m.promise && ok(m.promise.who)) return m.promise.who;
  let b = 0, bv = 38; for (const k in h.rel) { const o = G.idx[k]; if (o && o.alive && o.age >= 10 && h.rel[k] > bv) { bv = h.rel[k]; b = +k; } } return b;
}
function relatedList(h) {
  const out = []; const add = i => { if (i && G.idx[i] && G.idx[i].alive && G.idx[i].age >= 10 && i !== h.id && out.indexOf(i) < 0) out.push(i); };
  add(h.spouse); add(h.love); add(h.master); G.humans.forEach(o => { if (o.alive && o.master === h.id) add(o.id); });
  if (h.party && G.pidx[h.party]) G.pidx[h.party].members.forEach(add);
  Object.keys(h.rel).map(Number).filter(k => h.rel[k] > 30).sort((a, b) => h.rel[b] - h.rel[a]).forEach(add); return out;
}
const EV_REL = { betrayal: ['裏切りに関わった人', '背叛事件的相關人'], quarrel: ['言い争った相手', '吵架的對象'], reconcile: ['仲直りした相手', '和好的對象'], death: ['親しかった人', '親近的人'], quest_clear: ['同じ依頼の仲間', '同一委託的夥伴'], quest_fail: ['同じ依頼の仲間', '同一委託的夥伴'], party_formed: ['同じ隊の仲間', '同隊夥伴'], boss_expedition: ['同じ隊の仲間', '同隊夥伴'] };
const TRANS_R = { mate: ['パーティの仲間', '隊友'], guild: ['ギルド仲間', '公會同伴'] };
const SWORD_RX = /剣|刃|鞘|素振|刀/, MAGE_RX = /魔法|魔力|呪文|杖|魔導/, GENERIC_M = ['魔物', '魔物'];

const SJOB = { g_train: ['swordsman'], mentor_train: ['swordsman'], mentor_parting: ['swordsman'], depart: ADV_JOBS, firstbattle: ADV_JOBS, defeat: ADV_JOBS, return: ADV_JOBS, promotion: ADV_JOBS, g_gear: ADV_JOBS };
function povJobOK(sc, job) { const l = SJOB[sc]; return !l || !job || l.indexOf(job) >= 0; }
function jobBad(ja, job) { return (job !== 'swordsman' && SWORD_RX.test(ja)) || (job !== 'mage' && MAGE_RX.test(ja)); }
const NEED_CACHE = {};
function singleOK(sc) { if (sc in NEED_CACHE) return NEED_CACHE[sc]; const s = SCN[sc]; if (!s) return (NEED_CACHE[sc] = true); const n = k => s[k].filter(b => !/\{[BC]\}/.test(b.p[0])).length; return (NEED_CACHE[sc] = n('open') >= 1 && n('dev') >= 2 && n('inner') >= 1 && n('close') >= 1); }
function memUpdate(ev) {
  const A = ev.actors.map(i => G.idx[i]).filter(Boolean); const p = ev.payload || {};
  switch (ev.type) {
    case 'quest_fail': A.forEach(h => { if (h.alive) { const m = memOf(h); m.inj = G.tick; m.bp = BODY_POOL[(ev.id + h.id) % BODY_POOL.length]; } }); break;
    case 'love_start': case 'marriage': break;
    case 'quarrel': if (A[0] && A[1]) { memOf(A[0]).rival = A[1].id; memOf(A[1]).rival = A[0].id; } break;
    case 'reconcile': A.forEach(h => { memOf(h).rival = 0; }); break;
    case 'betrayal': if (A[0] && A[1]) { memOf(A[0]).guilt = G.tick; memOf(A[0]).guiltWho = A[1].id; memOf(A[1]).rival = A[0].id; } break;
    case 'divine_act': case 'miracle': if (A[0]) memOf(A[0]).god = { pid: p.pid, out: p.out, kind: p.kind || '', dir: p.dir || '', t: G.tick, used: false }; break;
    case 'promotion': case 'quest_clear': A.forEach(h => { memOf(h).glory++; }); break;
    case 'death': { const d = A[0]; if (d) G.humans.forEach(o => { if (o.alive && ((o.rel[d.id] || 0) > 45 || o.spouse === d.id || o.master === d.id || d.master === o.id)) memOf(o).loss = { name: d.name, t: G.tick, id: d.id, cause: p.cause, job: d.job }; }); } break;
  }
}

/* ---------- arcs ---------- */
function activeArc(hid) { return G.arcs.find(a => !a.done && a.hid === hid); }
function arcLive() { return G.arcs.filter(a => !a.done && a.kind !== 'war'); }
function newArc(hid, kind, partner) {
  const h = G.idx[hid]; const a = { id: G.nid++, hid, sid: h ? h.soul : 0, kind, parts: 0, last: G.tick, born: G.tick, partner: partner || 0, done: false, lastSum: null, sums: [], first: null };
  G.arcs.push(a); if (G.arcs.length > 120) G.arcs = G.arcs.filter(x => !x.done || G.tick - x.last < TICK_YEAR * 2); return a;
}
function closeArc(a) { a.done = true; }
function updateSpot() {
  const live = arcLive().filter(a => G.idx[a.hid] && G.idx[a.hid].alive).sort((x, y) => (G.track.indexOf(y.hid) >= 0) - (G.track.indexOf(x.hid) >= 0) || y.last - x.last);
  G.spot = live.map(a => a.hid).filter(i => G.track.indexOf(i) < 0).slice(0, Math.max(0, 3 - G.track.length));
}
function chronTrackToggle(hid) { const i = G.track.indexOf(hid); if (i >= 0) { G.track.splice(i, 1); return true; } if (G.track.length >= 3) return false; G.track.push(hid); return true; }

/* ---------- scene mapping ---------- */
function sceneFor(ev) {
  const p = ev.payload || {};
  switch (ev.type) {
    case 'master_farewell': return p.fixed ? 'master_farewell' : 'mentor_parting';
    case 'mentor_parting': return 'mentor_parting';
    case 'party_formed': return p.tier >= 2 ? 'depart' : null;
    case 'boss_expedition': return 'eve';
    case 'first_battle': return 'firstbattle';
    case 'quest_clear': return p.tier >= 2 ? 'return' : null;
    case 'quest_fail': return p.q === 'boss' ? 'battle' : (p.wipe || p.retreat || ev.id % 100 < 40) ? 'defeat' : null;
    case 'love_start': return 'confess'; case 'marriage': return 'wedding'; case 'love_notice': return 'love_notice';
    case 'quarrel': return ev.id % 3 === 0 ? 'drift' : 'quarrel'; case 'reconcile': return 'reconcile';
    case 'death': return 'funeral'; case 'birth': return 'birth'; case 'promotion': return 'promotion'; case 'betrayal': return 'betrayal'; case 'gear': return 'g_gear'; case 'coming_of_age': return 'g_wish';
    case 'divine_act':
      if (p.pid === 'oracle' && p.out !== 'fail') { if (p.kind === 'forgive' && p.out !== 'twist') return 'forgive'; return p.resolved ? 'answered' : 'oracle_dream'; }
      if (p.pid === 'grace' && p.out !== 'fail') return p.resolved ? 'answered' : null;
      if (p.pid === 'trial' && p.out !== 'fail') return 'trial'; if (p.out === 'fail' || p.out === 'twist') return 'doubt'; return null;
    case 'miracle': return 'miracle'; case 'prayer_expired': return 'unanswered';
    case 'monster_raid': return 'raid'; case 'siege': return 'siege';
    case 'destined_reunion': return 'reunion'; case 'soul_echo': return 'awakening'; case 'reincarnation': return p.echo ? 'echo_dream' : null;
    case 'boss_awaken': case 'boss_sortie': return 'omen';
    case 'cadre_slain': return 'battle'; case 'boss_slain': return 'revelation';
    case 'ending_doom': return 'finale_doom'; case 'ending_godleft': return 'finale_godleft'; case 'ending_stagnant': return 'finale_stagnant';
  }
  return null;
}
const FORCE_EV = { master_farewell: 1, boss_awaken: 1, boss_slain: 1, boss_sortie: 1, ending_doom: 1, ending_godleft: 1, ending_stagnant: 1, boss_expedition: 1, cadre_slain: 1 };
const TURNING = { death: 0.9, boss_awaken: 1, boss_slain: 1, cadre_slain: 0.9, boss_expedition: 0.95, marriage: 0.7, love_start: 0.65, betrayal: 0.7, reconcile: 0.6, destined_reunion: 0.9, soul_echo: 0.8, miracle: 0.8, monster_raid: 0.55, siege: 0.8, birth: 0.6, promotion: 0.5, quest_fail: 0.5, first_battle: 0.55, divine_act: 0.5, love_notice: 0.5, reincarnation: 0.7, prayer_expired: 0.4 };
function protOf(ev) { return ev.actors[0] || 0; }
function dramaScore(ev) {
  const sc = sceneFor(ev); const meta = SMETA[sc] || {};
  const fresh = 1 - G.chapters.slice(-6).filter(c => c.ev === ev.type).length / 6;
  let rel = ev.actors.length >= 2 ? 0.8 : ev.actors.length === 1 ? 0.55 : 0.3;
  const pid = protOf(ev); const arc = pid ? activeArc(pid) : null;
  if (ev.actors.some(i => G.track.indexOf(i) >= 0)) rel += 0.3; else if (arc) rel += 0.25; else if (ev.actors.some(i => G.spot.indexOf(i) >= 0)) rel += 0.15;
  let sc0 = clamp(ev.tension * 0.35 + ev.emotion * 0.25 + Math.min(1, rel) * 0.2 + (TURNING[ev.type] || 0.3) * 0.1 + fresh * 0.1, 0, 1);
  if (G.chapNo < 10 && G.main) { const mh = G.idx[G.main]; const grp = mh ? [G.main].concat(relatedList(mh)) : [G.main]; if (!ev.actors.some(i => grp.indexOf(i) >= 0)) sc0 -= 0.4; }
  if (arc && arc.parts < ARC_PARTS && G.tick - arc.last < 5 * TICK_DAY) sc0 += 0.22;     // continuity bonus
  const lastC = G.chapters[G.chapters.length - 1]; if (lastC && lastC.who && lastC.who[0] && lastC.who[0] !== pid && lastC.arc) { const la = G.arcs.find(a => a.id === lastC.arc); if (la && !la.done && la.parts < 3 && G.tick - la.last < 3 * TICK_DAY) sc0 -= 0.12; } // stay on one story
  return sc0;
}

/* ---------- cast / info ---------- */
const OBJ_POOL = [['古い剣', '舊劍'], ['革の手袋', '皮手套'], ['木彫りのお守り', '木雕護身符'], ['色あせたスカーフ', '褪色的圍巾'], ['小さな鈴', '小鈴鐺'], ['すり切れた手帳', '磨破的手札'], ['銀の指輪', '銀戒指'], ['母の形見のブローチ', '母親留下的胸針'], ['使いこんだ杖', '用慣了的法杖'], ['折りたたんだ手紙', '摺好的信']];
const BODY_POOL = [['左手', '左手'], ['右肩', '右肩'], ['背中', '背部'], ['左足', '左腳'], ['わき腹', '側腹'], ['右うで', '右臂']];
const REL_LABEL = { spouseM: ['夫', '丈夫'], spouseF: ['妻', '妻子'], lover: ['恋人', '戀人'], master: ['師匠', '師父'], apprentice: ['弟子', '徒弟'], rival: ['ケンカ中の相手', '正在鬧不合的對象'], friend: ['なかま', '夥伴'], mate: ['同じ隊', '同隊'], guild: ['ギルド仲間', '公會同伴'] };
function relKey(a, b) {
  if (!a || !b) return null; if (a.spouse === b.id) return b.sex === 'F' ? 'spouseF' : 'spouseM'; if (a.love === b.id) return 'lover'; if (a.master === b.id) return 'master'; if (b.master === a.id) return 'apprentice';
  if (a.mem && a.mem.rival === b.id) return 'rival'; if (a.party && a.party === b.party) return 'mate'; if ((a.rel[b.id] || 0) > 30) return 'friend'; if (isAdv(a) && isAdv(b)) return 'guild'; return null;
}
function infoOf(id, otherId) { const h = G.idx[id]; if (!h) return null; const o = otherId ? G.idx[otherId] : null; const rk = relKey(o, h); return { job: h.job, look: h.look, age: Math.floor(h.age), sid: h.soul, sex: h.sex, rel: rk ? REL_LABEL[rk] : null }; }
function castOf(ev, sc, seed) {
  const rg = new RNG(seed); const meta = SMETA[sc] || {}; let ids = ev.actors.filter(i => G.idx[i] && G.idx[i].alive !== false || (ev.names && ev.names[i])).slice(0, 3);
  ids = ids.filter((i, k) => ids.indexOf(i) === k);
  const hero = () => { const a = G.humans.filter(h => h.alive && isAdv(h)).sort((x, y) => advPower(y) - advPower(x)); return a[0] ? a[0].id : 0; };
  if (meta.kind === 'war' && (!ids.length || sc === 'omen' || sc === 'siege' || sc === 'raid')) { const hid = hero(); if (hid) ids = [hid].concat(ids.filter(i => i !== hid)); }
  if (!ids.length && !(sc === 'prologue')) { const a = G.humans.filter(h => h.alive && h.age >= 16); if (a.length) ids = [rg.pick(a).id]; }
  if (sc === 'funeral' && ids.length) { const d = G.idx[ids[0]]; let b = 0; if (d) { const rl = relatedList(d); b = rl[0] || 0; } if (b && ids.indexOf(b) < 0) ids.push(b); }
  else if (ids.length < 2 && ids.length) { const b = partnerOf(G.idx[ids[0]]); if (b && ids.indexOf(b) < 0) ids.push(b); }
  if (ids.length < 2 && ids.length && (meta.kind === 'war' || FORCE_EV[ev.type])) { const h0 = G.idx[ids[0]]; const o = G.humans.filter(h => h.alive && isAdv(h) && h.id !== ids[0]).sort((x, y) => ((h0 && h0.rel[y.id]) || 0) - ((h0 && h0.rel[x.id]) || 0) || advPower(y) - advPower(x))[0]; if (o) ids.push(o.id); }
  if (ids.length === 2 && ids[0] && G.idx[ids[0]]) { const rl = relatedList(G.idx[ids[0]]).filter(i => ids.indexOf(i) < 0); if (rl.length) ids.push(rl[0]); }
  if (sc === 'funeral' && ids.length >= 2) { const dd = ids[0]; ids.splice(0, 1); ids.push(dd); }
  return ids;
}
function trustFor(ev) {
  const hs = G.humans.find(h => h.alive && h.job === 'historian'); if (!hs) return 'hearsay';
  if (ev.actors.indexOf(hs.id) >= 0) return 'witness'; if (ev.pos && Math.hypot(hs.x - ev.pos.x, hs.y - ev.pos.y) < 10) return 'witness'; return 'hearsay';
}
function volumeNow() { if (G.ending) return 4; if (G.bossFight || G.sortie || (G.awakened && G.cadres.filter(i => G.idx[i] && !G.idx[i].alive).length >= 2)) return 3; return G.awakened ? 2 : 1; }
function voiceOf(h) { if (!h) return 'plain'; if (h.age >= 50 || h.traits.indexOf('stubborn') >= 0) return 'elder'; if (h.age < 27 || h.traits.indexOf('brave') >= 0 || h.traits.indexOf('curious') >= 0) return 'young'; return 'plain'; }

/* ---------- picking text with de-duplication ---------- */
function usedN(key) { return G.used[key] || 0; }
const CAP = 2;
function pickUniq(rg, key, n, avoid, cap) {
  let best = [], bu = 1e9;
  for (let i = 0; i < n; i++) { if (avoid && avoid.indexOf(i) >= 0) continue; const u = usedN(key + '.' + i); if (u < bu) { bu = u; best = [i]; } else if (u === bu) best.push(i); }
  if (cap && bu >= cap) return -1;
  if (!best.length) best = [0]; const i = best[rg.int(0, best.length - 1)]; G.used[key + '.' + i] = usedN(key + '.' + i) + 1; return i;
}
function traitKey(h) { if (!h) return 'kind'; const order = ['brave', 'timid', 'greedy', 'loyal', 'curious', 'stubborn', 'kind', 'ambitious']; for (const k of order) if (h.traits.indexOf(k) >= 0) return k; return 'kind'; }

/* ---------- chapter creation ---------- */
function makeChapter(scene, ev, over) {
  const seed = (ev ? ev.id * 2654435761 : G.chapNo * 977 + 13) >>> 0; const rg = new RNG(seed);
  const meta = SMETA[scene] || {}; const fx = over && over.fixedKey;
  let ids = ev ? (fx ? ev.actors.slice(0, 2).filter(i => G.idx[i]) : castOf(ev, scene, seed)) : [];
  if (fx && fx !== 'master_farewell' && fx !== 'prologue' && !ids.length) ids = [];
  const forced = !!(ev && FORCE_EV[ev.type]);
  if (ev && !fx && SCN[scene] && ids.length) { const h0 = G.idx[ids[0]]; if (h0 && !povJobOK(scene, h0.job)) { ev.used = true; return null; } if (ids.length < 2 && !forced) { if (meta.prot === 2 || scene === 'funeral' || !singleOK(scene)) { ev.used = true; return null; } } }
  const an = {}, info = {}; ids.forEach((i, k) => { const e = G.idx[i]; an[i] = (ev && ev.names && ev.names[i]) || (e && e.name) || ['？', '？']; info[i] = infoOf(i, k === 0 ? (ids[1] || 0) : ids[0]) || {}; });
  const p = ev ? ev.payload : {};
  if (ids.length >= 2 && info[ids[1]] && !info[ids[1]].rel) info[ids[1]].rel = EV_REL[ev && ev.type] || ['関わりのある人', '有關係的人'];
  let who = fx && fx !== 'master_farewell' ? [] : (meta.prot === 2 ? ids.slice(0, 2) : ids.slice(0, 1)); if (scene === 'master_farewell') who = ids.slice(0, 2);
  const mainH = G.main ? G.idx[G.main] : null;
  const ch = {
    mainId: G.main || 0, mainNm: mainH ? mainH.name : null, mainJob: mainH ? mainH.job : null,
    id: G.nid++, no: ++G.chapNo, t: ev ? ev.t : G.tick, now: G.tick, scene, ev: ev ? ev.type : '', vol: volumeNow(), seed, a: ids, an, info, who, pl: ev ? ev.place : 'town', tod: timeWord(ev ? ev.t : G.tick), sea: seasonOf(ev ? ev.t : G.tick),
    trust: ev ? trustFor(ev) : 'witness', N: p.n || p.reward || p.amt || p.n0 || 5, M: null, V: null, O: null, year: yearOf(ev ? ev.t : G.tick), arc: 0, k: 0, cbs: [], res: [], recap: null, th: null, sumP: null,
  };
  const mk0 = p.mon || p.m; if (mk0 && MONS[mk0]) ch.M = MONS[mk0].n; else if (mk0 === 'boss') ch.M = BOSS.n; else if (p.cad >= 0 && CADRES[p.cad]) ch.M = CADRES[p.cad].n; else if (scene === 'battle') ch.M = BOSS.n; else ch.M = GENERIC_M;
  const A = ids[0] ? G.idx[ids[0]] : null;
  if (p.prev) ch.V = p.prev; else ch.V = A && A.echo ? A.echo.name : ['古い友', '舊友'];
  { const jb = A ? A.job : ''; const pool = OBJ_POOL.filter(o => !(jb !== 'swordsman' && SWORD_RX.test(o[0])) && !(jb !== 'mage' && MAGE_RX.test(o[0]))); ch.O = rg.pick(pool); ch.BP = A && A.mem && A.mem.bp ? A.mem.bp : rg.pick(BODY_POOL); }
  ch.vo = {}; ids.forEach(i => { ch.vo[i] = voiceOf(G.idx[i]); });
  if (over) Object.assign(ch, over);
  // ----- arc handling -----
  const prot = who[0] || 0;
  if (!fx && SCN[scene] && meta.kind && meta.kind !== 'none' && prot) {
    let arc = meta.kind === 'war' ? (G.arcs.find(a => !a.done && a.kind === 'war' && a.hid === prot) || null) : activeArc(prot);
    if (!arc) {
      if (meta.kind === 'war') arc = newArc(prot, 'war', ids[1] || 0);
      else if (arcLive().length < ARC_MAX || (over && over.forceArc)) arc = newArc(prot, meta.kind, ids[1] || 0);
      else { const idle = arcLive().sort((x, y) => x.last - y.last)[0]; if (idle && G.tick - idle.last > 3 * TICK_DAY) { closeArc(idle); arc = newArc(prot, meta.kind, ids[1] || 0); } }
    }
    if (arc) {
      arc.parts++; arc.last = G.tick; ch.arc = arc.id; ch.k = arc.parts; if (!arc.partner && ids[1]) arc.partner = ids[1];
      if (arc.lastSum && arc.parts >= 2) ch.recap = arc.lastSum;
      if (meta.end || (arc.kind !== 'war' && arc.parts >= ARC_PARTS)) arc.endNext = true;
    }
  }
  // ----- continuity: callbacks from memory -----
  if (A && !fx && SCN[scene]) {
    const m = memOf(A); const cbs = [];
    if (m.god && !m.god.used && G.tick - m.god.t < 8 * TICK_DAY && ['oracle_dream', 'miracle', 'answered', 'doubt', 'trial'].indexOf(scene) < 0) { cbs.push({ ty: 'god_' + m.god.out, v: { pid: m.god.pid } }); m.god.used = true; }
    const tryCb = (ty, cond, vars) => { if (cbs.length >= 2 || !cond) return; if (G.tick - (m.cb[ty] || -99999) < 2 * TICK_DAY) return; m.cb[ty] = G.tick; cbs.push({ ty, v: vars || {} }); };
    tryCb('inj', m.inj && G.tick - m.inj < 10 * TICK_DAY && ['g_scar', 'defeat'].indexOf(scene) < 0);
    tryCb('promise', m.promise && G.idx[m.promise.who] && G.chapters.some(c => c.id === m.promise.ref) && ['depart', 'return', 'eve', 'mentor_parting', 'defeat'].indexOf(scene) < 0, { who: m.promise && m.promise.who });
    tryCb('loss', m.loss && G.tick - m.loss.t < 14 * TICK_DAY && ['funeral', 'grief', 'comfort', 'revenge'].indexOf(scene) < 0, m.loss && { who: m.loss.id, nm: m.loss.name });
    tryCb('lover', (A.spouse || A.love) && ['wedding', 'confess', 'birth', 'family_day', 'love_notice'].indexOf(scene) < 0, { who: A.spouse || A.love });
    tryCb('guilt', m.guilt && m.guiltWho && G.idx[m.guiltWho] && G.tick - m.guilt < 10 * TICK_DAY && ['guilt', 'forgive', 'betrayal'].indexOf(scene) < 0, { who: m.guiltWho });
    tryCb('echo', A.echo && A.age < 30 && ['awakening', 'echo_dream', 'reunion'].indexOf(scene) < 0);
    if (ids.length < 2) { for (let q = cbs.length - 1; q >= 0; q--) if (['promise', 'lover', 'guilt', 'loss'].indexOf(cbs[q].ty) >= 0 && false) cbs.splice(q, 1); }
    cbs.forEach(c => { if (c.ty === 'promise' && m.promise) c.v.ref = m.promise.ref; });
    cbs.forEach(c => { const wid = c.v && c.v.who; if (wid && ids.indexOf(wid) < 0) { const inf = infoOf(wid, ids[0]); const lab = inf && inf.rel ? inf.rel : (inf && inf.job && JOBS[inf.job] ? JOBS[inf.job].n : (c.v.nm ? ['故人', '故人'] : null)); c.v.lab = lab; if (!c.v.nm && G.idx[wid]) c.v.nm = G.idx[wid].name; } });
    if (ch.arc || cbs.length) ch.cbs = cbs.slice(0, 2);
  }
  // ----- foreshadow: resolve / plant -----
  if (!fx && SCN[scene] && ids.length) {
    const rs = RESOLVE[scene] || [];
    G.fores.forEach(f => { if (f.state === 'open' && rs.indexOf(f.type) >= 0 && ids.indexOf(f.hid) >= 0 && G.tick - f.planted > 36 && G.tick - f.planted < 3 * TICK_YEAR) { f.state = 'done'; f.doneAt = G.tick; { const pin = f.partner && ids.indexOf(f.partner) < 0 ? infoOf(f.partner, ids[0]) : null; const lab = pin ? (pin.rel || (pin.job && JOBS[pin.job] ? JOBS[pin.job].n : null)) : null; ch.res.push({ ty: f.type, kept: scene !== 'funeral' && scene !== 'defeat', v: Object.assign({}, f.v, { lab }) }); } } });
    (PLANT[scene] || []).filter(ty => ty !== 'promise').forEach(ty => { if (ids[0] && !G.fores.some(f => f.hid === ids[0] && f.type === ty && (f.state === 'open' || G.tick - f.planted < TICK_YEAR))) { G.fores.push({ id: G.nid++, type: ty, hid: ids[0], partner: ids[1] || 0, planted: G.tick, state: 'open', v: { pn: an[ids[1]] || null } }); } });
    if (G.fores.length > 150) G.fores = G.fores.filter(f => f.state === 'open' || G.tick - f.planted < 2 * TICK_YEAR);
  }
  ch.pk = computePicks(ch, rg);
  if (mainH && ids[0] && ids[0] !== G.main && G.idx[ids[0]]) ch.relMain = relKey(mainH, G.idx[ids[0]]);
  { const pc = G.chapters[G.chapters.length - 1]; ch.cont = !!(pc && pc.who && who[0] && pc.who[0] === who[0]); const kk = ch.cont ? 'c' : (ch.relMain ? 'r' : 'p'); ch.trI = pickUniq(rg, 'TR.' + kk + '.' + (ids[0] || 0), kk === 'c' ? 6 : 8); }
  if ((scene === 'depart' || scene === 'eve') && ids.length >= 2 && SCN[scene]) { const k = SCN[scene].talk.indexOf('promise'); if (k >= 0 && ch.pk['l' + k] >= 0) { ch.promised = true; memOf(G.idx[ids[0]]).promise = { who: ids[1], ref: ch.id, t: G.tick }; if (G.idx[ids[1]]) memOf(G.idx[ids[1]]).promise = { who: ids[0], ref: ch.id, t: G.tick }; G.fores.push({ id: G.nid++, type: 'promise', hid: ids[0], partner: ids[1], planted: G.tick, state: 'open', v: { pn: an[ids[1]] || null } }); } }
  G.chapters.push(ch); if (G.chapters.length > 400) G.chapters.splice(0, 40);
  if (ev) { ev.used = true; ev.ch = ch.id; }
  // summary for recap / final review
  if (ch.arc && SCN[scene] && SCN[scene].sum.length) { const arc = G.arcs.find(a => a.id === ch.arc); if (arc) { const sp = SCN[scene].sum[ch.pk.sum % SCN[scene].sum.length]; const pair = [0, 1].map(L => fmt(sp[L], chapVars(ch, L))); arc.lastSum = pair; arc.sums.push({ sc: scene, p: pair, t: G.tick }); if (!arc.first) arc.first = pair; } }
  if (ch.arc) { const arc = G.arcs.find(a => a.id === ch.arc); if (arc && arc.endNext && arc.kind !== 'war') closeArc(arc); }
  if (G.onChapter) G.onChapter(ch);
  return ch;
}
function chapVars(ch, L) {
  const nameOf = i => (ch.an[i] || ['？', '？'])[L]; const A = ch.a[0] ? nameOf(ch.a[0]) : (L ? '某人' : '誰か'); const B = ch.a[1] ? nameOf(ch.a[1]) : A;
  const season = S.season[L][ch.sea]; const place = PLACES[ch.pl] ? PLACES[ch.pl][L] : PLACES.town[L];
  return { A, B, C: ch.a[2] ? nameOf(ch.a[2]) : B, P: place, M: ch.M ? ch.M[L] : '', N: ch.N, V: ch.V ? ch.V[L] : '', O: ch.O ? ch.O[L] : '', BP: ch.BP ? ch.BP[L] : '', T: season, D: '', F: '', S: '', L: '' };
}
function computePicks(ch, rg) {
  rg = rg || new RNG(ch.seed); const sc = SCN[ch.scene]; const fx = FIXED[ch.fixedKey];
  const mood = fx ? fx.mood : sc ? sc.mood : 'calm'; const pk = { hm: mood };
  const first = ch.a[0] ? G.idx[ch.a[0]] : null; pk.tr = traitKey(first);
  pk.hist = pickUniq(rg, 'H.' + pk.tr + '.' + mood, (HIST_TRAIT[pk.tr] && HIST_TRAIT[pk.tr][mood] || []).length || 1);
  pk.hgen = rg.chance(0.28) ? pickUniq(rg, 'HG.' + mood, HIST_BANK[mood].length) : -1;
  pk.set = rg.int(0, 1); pk.sp0 = pickUniq(rg, 'SP', SPEECH_TAGS.length, null, CAP); pk.sp1 = pickUniq(rg, 'SP', SPEECH_TAGS.length, null, CAP);
  pk.tb = pickUniq(rg, 'TB.' + ch.tod, TIME_BEATS[ch.tod].length, null, CAP); pk.wx = pickUniq(rg, 'WX.' + ch.sea, WEATHER_BEATS[ch.sea].length, null, CAP);
  if (sc) {
    pk.ti = pickUniq(rg, 'T.' + ch.scene, Math.max(1, sc.t.length), sc.t.map((tt, i) => jobBad(tt[0], first ? first.job : '') ? i : -1).filter(i => i >= 0));
    const pj = first ? first.job : ''; const solo = ch.a.length < 2; const bad = b => (solo && /\{[BC]\}/.test(b.p[0])) || jobBad(b.p[0], pj); const av = arr => arr.map((b, i) => bad(b) ? i : -1).filter(i => i >= 0);
    pk.open = pickUniq(rg, 'O.' + ch.scene, sc.open.length, av(sc.open), CAP); { const dav = av(sc.dev); pk.d1 = pickUniq(rg, 'D.' + ch.scene, sc.dev.length, dav, CAP); pk.d2 = pickUniq(rg, 'D.' + ch.scene, sc.dev.length, pk.d1 >= 0 ? dav.concat([pk.d1]) : dav, CAP); }
    pk.inner = pickUniq(rg, 'I.' + ch.scene, sc.inner.length, av(sc.inner), CAP); pk.close = pickUniq(rg, 'C.' + ch.scene, sc.close.length, av(sc.close), CAP); pk.sum = pickUniq(rg, 'S.' + ch.scene, Math.max(1, sc.sum.length));
    pk.l0 = []; pk.l1 = [];
    (sc.talk || []).forEach((it, k) => { const arr = INTENT[it]; const sp = ch.a[k % 2], voice = (ch.vo && ch.vo[sp]) || 'plain'; const n = arr[voice].length; pk['l' + k] = solo ? -1 : pickUniq(rg, 'L.' + it + '.' + voice, n, null, CAP); });
    ch.th = pk.close >= 0 && sc.close[pk.close] ? sc.close[pk.close].th : null;
  }
  pk.cb = (ch.cbs || []).map(c => pickUniq(rg, 'CB.' + c.ty, (CB[c.ty] || [[0, 0]]).length, null, CAP));
  pk.rs = (ch.res || []).map(r => pickUniq(rg, 'RS.' + r.ty + (r.kept ? 'k' : 'b'), (FRES[r.ty] ? FRES[r.ty][r.kept ? 'k' : 'b'].length : 1)));
  return pk;
}
function chronPrologue() { if (G.chapters.length) return; makeChapter('prologue', null, { fixedKey: 'prologue', a: [], an: {}, vol: 0, trust: 'infer' }); }
function chronForce(ev) {
  const sc = sceneFor(ev); if (!sc) { ev.used = true; return; }
  if (sc.startsWith('finale') || sc === 'revelation') {
    const killer = ev.actors[0] ? ev.actors : (G.parties.find(q => q.boss) || { members: [] }).members.slice(0, 1);
    ev.actors = killer.length ? killer : ev.actors; makeChapter(sc, ev, { fixedKey: sc, vol: 4, trust: 'witness' });
    if (sc.startsWith('finale') || sc === 'revelation') chronRecap(); return;
  }
  makeChapter(sc, ev, ev.type === 'master_farewell' && ev.payload.fixed ? { fixedKey: 'master_farewell', forceArc: true } : { forceArc: true });
}

/* ---------- director ---------- */
function noteEvent(ev) { if (ev.tension < 0.3 && ev.type !== 'death') return; G.notes.push({ t: ev.t, ty: ev.type, a: ev.actors.slice(0, 2), an: ev.names, pos: ev.pos, pl: ev.place, pay: ev.payload && ev.payload.lvl ? { lvl: ev.payload.lvl } : {} }); if (G.notes.length > 500) G.notes.splice(0, 100); ev.used = true; }
function chronTick() {
  if (G.tick % 6 !== 3) return;
  if (G.tick % TICK_DAY === 3) { mainTick(); updateSpot(); G.arcs.forEach(a => { if (!a.done && a.kind !== 'war' && (!G.idx[a.hid] || !G.idx[a.hid].alive) && G.tick - a.last > TICK_DAY) closeArc(a); }); }
  let best = null, bs = 0; const lastT = G.chapters.reduce((m, c) => Math.max(m, c.t || 0), 0);
  for (let i = G.events.length - 1; i >= 0; i--) {
    const ev = G.events[i]; if (ev.used) continue; const age = G.tick - ev.t;
    if (ev.t < lastT && !FORCE_EV[ev.type]) { ev.used = true; continue; }
    if (age > 3 * TICK_DAY) { const sc0 = sceneFor(ev); if (!sc0 || !FORCE_EV[ev.type]) noteEvent(ev); ev.used = true; continue; }
    if (age < 6) continue;
    const sc = sceneFor(ev); if (!sc) { noteEvent(ev); continue; }
    { const h0 = G.idx[ev.actors[0]]; if (h0 && !povJobOK(sc, h0.job)) { ev.used = true; continue; } }
    if (FORCE_EV[ev.type]) { chronForce(ev); continue; }
    if (SMETA[sc] && SMETA[sc].kind !== 'war' && SMETA[sc].kind !== 'none') { const pid = protOf(ev); if (pid && !activeArc(pid) && arcLive().length >= ARC_MAX && dramaScore(ev) < 0.75) { noteEvent(ev); continue; } }
    if (G.tick - ((G.lastScene || {})[sc] || -999) < (SC_CD[sc] || 150)) continue;
    const s = dramaScore(ev); if (s > bs) { bs = s; best = ev; }
  }
  const since = (G.tick - (G.lastChapTick || 0)) / (1 + Math.max(0, G.chapNo - 55) / 40) * (G.tick < START_TICK + 3 * TICK_YEAR ? 0.14 : 1);
  if (G.tick < START_TICK + 3 * TICK_YEAR && G.chapNo > 7) return;
  if (best && ((bs >= 0.5 && since >= TUNE_STORY.gap) || (bs >= 0.3 && since >= TUNE_STORY.slow) || (bs >= 0.78 && since >= 36))) {
    const sc = sceneFor(best); const ch0 = makeChapter(sc, best); if (!ch0) return; G.lastChapTick = G.tick; G.lastScene = G.lastScene || {}; G.lastScene[sc] = G.tick;
    G.events.forEach(e => { if (!e.used && ((e.type === best.type && Math.abs(e.t - best.t) < 12) || (e.t < best.t && !FORCE_EV[e.type]))) { noteEvent(e); } });
    return;
  }
  // interlude: keep a story going when nothing new happens
  if (since >= TUNE_STORY.gap) {
    const due = arcLive().filter(a => a.parts >= 1 && a.parts < ARC_PARTS && G.tick - a.last >= (a.parts === 1 ? TUNE_STORY.interlude * 0.55 : TUNE_STORY.interlude) && G.idx[a.hid] && G.idx[a.hid].alive && !a.endNext).sort((x, y) => ((y.hid === G.main) - (x.hid === G.main)) || (G.track.indexOf(y.hid) >= 0) - (G.track.indexOf(x.hid) >= 0) || x.last - y.last)[0];
    if (due) { const sc = interludeFor(due); if (sc && SCN[sc] && SCN[sc].open.length) { writeInterlude(due, sc); } }
  }
}
function mainTick() {
  let m = G.main ? G.idx[G.main] : null;
  if (!m || !m.alive) { const cand = m ? relatedList(m)[0] : 0; const nxt = cand || ((G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => advPower(b) - advPower(a))[0]) || {}).id || 0; G.main = nxt; m = nxt ? G.idx[nxt] : null; if (!m) return; }
  if (G.chapNo < 9 && G.tick > START_TICK + 40 && !G.chapters.some(c => c.who && c.who[0] === G.main) && G.tick - (G.lastChapTick || 0) > 60) {
    let a = activeArc(G.main); if (!a && arcLive().length < ARC_MAX) a = newArc(G.main, isAdv(m) ? 'growth' : 'faith', partnerOf(m));
    if (a) { const sc = interludeFor(a); if (sc && SCN[sc] && SCN[sc].open.length) writeInterlude(a, sc); }
  }
}
function interludeFor(arc) {
  const h = G.idx[arc.hid]; if (!h) return null; const m = memOf(h); const list = INTERLUDE[arc.kind] || []; if (!list.length) return null;
  const rg = new RNG((arc.id * 7919 + arc.parts * 31) >>> 0);
  if (arc.kind === 'growth' && m.inj && G.tick - m.inj < 12 * TICK_DAY) return 'g_scar';
  if (arc.kind === 'sin' && arc.parts >= 2) return 'forgive';
  if (arc.kind === 'faith' && G.fores.some(f => f.state === 'open' && f.hid === arc.hid && f.type === 'dream' && G.tick - f.planted > 36)) return 'answered';
  if (arc.kind === 'faith' && m.god) return m.god.out === 'fail' || m.god.out === 'twist' ? 'doubt' : 'answered';
  if (arc.kind === 'loss') { let sc = ['grief', 'comfort', 'revenge'][arc.parts % 3]; if (sc === 'revenge' && !(m.loss && m.loss.cause === 'battle')) sc = 'grief'; if (sc === 'grief' && !(arc.partner && G.idx[arc.partner])) sc = 'comfort'; if (sc === 'comfort' && !partnerOf(h)) return null; return sc; }
  const c = list.filter(sc => SCN[sc] && SCN[sc].open.length && povJobOK(sc, h.job) && ((SMETA[sc] || {}).prot !== 2 || partnerOf(h))); return c.length ? rg.pick(c) : null;
}
function writeInterlude(arc, sc) {
  const h = G.idx[arc.hid]; const pt = sc === 'comfort' ? partnerOf(h) : (arc.partner && G.idx[arc.partner] && (G.idx[arc.partner].alive || sc === 'grief' || sc === 'revenge') ? arc.partner : 0); const ev = { id: G.nid++, t: G.tick, type: 'interlude', actors: [arc.hid].concat(pt ? [pt] : []), payload: {}, tags: [], tension: 0, emotion: 0, place: placeKey(h), pos: { x: h.x, y: h.y }, used: true, names: { [arc.hid]: h.name } };
  if (pt) ev.names[pt] = G.idx[pt].name;
  const ch = makeChapter(sc, ev); if (!ch) { if (arc.parts === 0) closeArc(arc); else arc.last = G.tick - TUNE_STORY.interlude * 0.4; return; } G.lastChapTick = G.tick;
}
function chronSupplement(hid) {
  const h = hById(hid); if (!h) return null;
  const hs = (k, n) => (strHash(k + h.id) % n); const sup = { d: hs('d', 6), f: hs('f', 6), s: hs('s', 6), l: hs('l', 6) };
  const ev = { id: G.nid++, t: G.tick, type: 'supplement', actors: [h.id], payload: {}, tags: [], tension: 0, emotion: 0, place: placeKey(h), pos: { x: h.x, y: h.y }, used: true, names: { [h.id]: h.name } };
  const ch = makeChapter('supplement', ev, { sup, supName: h.name }); if (!ch) return null; ch.trust = 'infer'; return ch;
}
/* year end: unresolved foreshadows -> note */
function yearEndFores() {
  const open = G.fores.filter(f => f.state === 'open' && G.tick - f.planted > TICK_YEAR);
  open.forEach(f => { f.state = 'lost'; });
  G.lostFores = (G.lostFores || 0) + open.length;
}

/* ---------- ending recap (R3-15) ---------- */
function chronRecap() {
  if (G.recapDone) return; G.recapDone = true;
  const arcs = G.arcs.filter(a => a.parts >= 2 && a.kind !== 'war').sort((x, y) => (G.track.indexOf(y.hid) >= 0) - (G.track.indexOf(x.hid) >= 0) || y.parts - x.parts).slice(0, 4);
  const ev = { id: G.nid++, t: G.tick, type: 'recap', actors: arcs.map(a => a.hid), payload: {}, tags: [], tension: 0, emotion: 0, place: 'town', pos: null, used: true, names: {} };
  arcs.forEach(a => { const h = G.idx[a.hid]; ev.names[a.hid] = h ? h.name : (a.name || ['？', '？']); });
  const ch = makeChapter('recap', ev, { fixedKey: 'recap', vol: 4, trust: 'infer', arcsSnap: arcs.map(a => ({ hid: a.hid, kind: a.kind, parts: a.parts, first: a.first, last: a.lastSum, alive: !!(G.idx[a.hid] && G.idx[a.hid].alive), nm: (G.idx[a.hid] || {}).name || ['？', '？'], job: (G.idx[a.hid] || {}).job || 'farmer' })), casts: G.stats.casts, answered: G.stats.answered, bigs: (G.bigActs || []).slice(0, 3) });
  return ch;
}
const SC_CD = { funeral: 420, betrayal: 500, depart: 700, return: 700, unanswered: 900, doubt: 650, answered: 650, g_gear: 900, birth: 300 };
const TRANS_REL = [['ここで、{MN}の{R}にあたる{A}の話に移る。', '這裡先換成{MN}的{R}——{A}的故事。'], ['{A}は、{MN}の{R}だ。今度は{A}のほうを見てみよう。', '{A}是{MN}的{R}，這次來看看{A}這邊。'], ['{MN}のそばをはなれて、{R}の{A}のことを書く。', '先離開{MN}身邊，來寫{MN}的{R}{A}。'], ['{MN}と関わりの深い{A}にも、{A}だけの一日がある。', '和{MN}關係很深的{A}，也有自己的一天。'], ['{MN}の{R}である{A}は、このとき別の場所にいた。', '身為{MN}的{R}，{A}這時人在別處。'], ['{A}の話をしよう。{A}は{MN}の{R}にあたる人だ。', '來說說{A}的事，是{MN}的{R}。'], ['ここからしばらく、{MN}の{R}、{A}の目で町を見る。', '接下來一小段，用{MN}的{R}——{A}的眼睛來看這座城鎮。'], ['{MN}の話から少しはなれて、{R}の{A}を追う。', '暫時離開{MN}的故事，追著{R}{A}。']];
const TRANS_PLAIN = [['{MN}のそばを少しはなれて、{A}の一日を見てみよう。', '先暫時離開{MN}身邊，來看看{A}的一天。'], ['同じころ、{MN}のいる町の別の場所では、{A}が動いていた。', '同一時間，在{MN}所在城鎮的另一處，{A}正在行動。'], ['{MN}の話はひと休みして、{A}のことを書いておく。', '先把{MN}的故事放一邊，記下{A}的事。'], ['この町には、{MN}のほかにも、{A}という人がいる。', '這座城鎮裡，除了{MN}，還有一個叫{A}的人。'], ['{MN}とは別に、{A}にも語るべき一日があった。', '除了{MN}之外，{A}也有值得記下的一天。'], ['場面をかえて、{A}の話をしよう。{A}は、{MN}とは別の人だ。', '換個場景，來說{A}的事，這是和{MN}不同的人的故事。'], ['{MN}のいない場所で、{A}は自分の一日を生きていた。', '在沒有{MN}的地方，{A}過著自己的一天。'], ['少しだけ、{MN}から目をはなして、{A}のほうを見る。', '稍微把目光從{MN}移開，看向{A}。']];
const TRANS_CONT = [['{MN}の話からはなれたまま、{A}の話がつづく。', '離開{MN}的故事，{A}的故事繼續。'], ['まだ{MN}のそばにはもどらず、{A}の話がつづく。', '還不回到{MN}身邊，繼續{A}的故事。'], ['{A}の話は、まだ終わっていない。{A}のあとで、{MN}にもどる。', '{A}的故事還沒結束，{MN}的事稍後再說。'], ['引きつづき{A}を追いつつ、{MN}の話はあとにまわす。', '繼續追著{A}，{MN}的故事先請它等一等。'], ['{MN}ではなく、{A}のほうで話が進んでいた。', '這次是{A}這邊的故事在進展，不是{MN}。'], ['つづけて{A}の話をする（この章に{MN}は出てこない）。', '接著是{A}的故事，{MN}不在這一章出現。']];
const TUNE_STORY = { gap: 105, slow: 250, interlude: 480 };

/* ---------- rendering ---------- */
function renderChapter(ch) {
  const L = li(); if (!ch.pk) ch.pk = computePicks(ch); const pk = ch.pk;
  const v = chapVars(ch, L); const f = p => fmt(p[L], v);
  const mk = (text, tag) => ({ text, tag }); const tag = ch.trust === 'infer' ? 'infer' : ch.trust;
  const fx = FIXED[ch.fixedKey]; const sc = SCN[ch.scene];
  let title, bare, paras = [], mood, trans = null;
  const nameOf = i => (ch.an[i] || ['？', '？'])[L];
  const protNames = (ch.who || []).map(nameOf);
  const pre = protNames.length ? '〈' + protNames.join(L ? '與' : 'と') + '〉' : '';
  if (ch.fixedKey === 'recap') return renderRecap(ch);
  if (fx) {
    bare = fx.t[L]; mood = fx.mood; fx.paras.forEach(pp => paras.push(mk(pp.map(f).join(''), ch.fixedKey === 'prologue' ? 'infer' : tag)));
    title = pre + bare;
  } else if (sc) {
    mood = sc.mood; if (ch.scene === 'supplement' && ch.sup) { v.D = DRAMA_POOL.desire[ch.sup.d][L]; v.F = DRAMA_POOL.fear[ch.sup.f][L]; v.S = DRAMA_POOL.secret[ch.sup.s][L]; v.L = DRAMA_POOL.lie[ch.sup.l][L]; }
    const tp = sc.t[pk.ti % sc.t.length] || ['…', '…']; bare = fmt(tp[L], v); title = pre + bare;
    const useTime = pk.set === 0; const fi = useTime ? pk.tb : pk.wx; const filler = fi < 0 ? '' : useTime ? f(TIME_BEATS[ch.tod][pk.tb % TIME_BEATS[ch.tod].length]) : f(WEATHER_BEATS[ch.sea][pk.wx % WEATHER_BEATS[ch.sea].length]);
    if (ch.mainId && ch.who && ch.who.length && ch.who.indexOf(ch.mainId) < 0 && ch.mainNm) { const mn = ch.mainNm[L]; const rl = ch.relMain && (TRANS_R[ch.relMain] || REL_LABEL[ch.relMain]) ? (TRANS_R[ch.relMain] || REL_LABEL[ch.relMain])[L] : ''; trans = { mn, rl }; }
    paras.push(mk(filler + (pk.open >= 0 ? f(sc.open[pk.open].p) : ''), tag));
    // continuity: callbacks (memory), god influence
    (ch.cbs || []).forEach((c, i) => { const pool = CB[c.ty]; if (!pool || pk.cb[i] < 0) return; const vv = Object.assign({}, v); if (c.v && (c.v.who || c.v.nm)) { vv.B = c.v.nm ? c.v.nm[L] : (nameOf(c.v.who) !== '？' ? nameOf(c.v.who) : (G.idx[c.v.who] ? G.idx[c.v.who].name[L] : v.B)); } if (c.v && c.v.pid) vv.PW = POWER_BY_ID[c.v.pid] ? POWER_BY_ID[c.v.pid].n[L] : ''; let tx = fmt(pool[pk.cb[i] % pool.length][L], vv); if (c.v && c.v.lab && c.v.who && c.v.who !== ch.a[0] && c.v.who !== ch.a[1]) { const k = tx.indexOf(vv.B); if (k >= 0) tx = tx.slice(0, k + vv.B.length) + '（' + c.v.lab[L] + '）' + tx.slice(k + vv.B.length); } paras.push(mk(tx, 'infer')); });
    { const dv = (pk.d1 >= 0 ? f(sc.dev[pk.d1].p) : '') + (pk.d2 >= 0 ? f(sc.dev[pk.d2].p) : ''); if (dv) paras.push(mk(dv, tag)); }
    if (sc.talk && sc.talk.length && ch.a.length) {
      let dl = ''; const ids = [ch.a[0], ch.a[1] || ch.a[0]];
      sc.talk.forEach((it, k) => { const spk = ids[k % 2], lis = ids[(k + 1) % 2]; const voice = (ch.vo && ch.vo[spk]) || 'plain'; const arr = INTENT[it][voice]; if (pk['l' + k] < 0) return; const line = arr[pk['l' + k] % arr.length]; const vv = Object.assign({}, v, { B: nameOf(lis) }); const tgi = k === 0 ? pk.sp0 : pk.sp1; dl += fmt(line[L], vv) + (tgi >= 0 ? fmt(SPEECH_TAGS[tgi][L], { S: nameOf(spk) }) : ''); });
      if (dl) paras.push(mk(dl, tag));
    }
    if (pk.inner >= 0) paras.push(mk(f(sc.inner[pk.inner].p), 'infer'));
    (ch.res || []).forEach((r, i) => { const o = FRES[r.ty]; if (!o) return; const arr = o[r.kept ? 'k' : 'b']; const vv = Object.assign({}, v); if (r.v && r.v.pn) vv.B = r.v.pn[L]; let rt = fmt(arr[pk.rs[i] % arr.length][L], vv); if (r.v && r.v.lab && r.v.pn && /{B}/.test(arr[pk.rs[i] % arr.length][L])) { const k = rt.indexOf(vv.B); if (k >= 0) rt = rt.slice(0, k + vv.B.length) + '（' + r.v.lab[L] + '）' + rt.slice(k + vv.B.length); } paras.push({ text: '☆ ' + rt, tag: 'res' }); });
    if (pk.close >= 0) paras.push(mk(f(sc.close[pk.close].p), tag));
  } else { bare = '…'; title = pre + bare; mood = 'calm'; }
  // first-mention annotation (R2-4)
  const ann = (id, rel) => { const inf = (ch.info || {})[id]; if (!inf || !inf.job) return; const nm = nameOf(id); const lab = rel && inf.rel ? inf.rel[L] : JOBS[inf.job] ? JOBS[inf.job].n[L] : ''; if (!lab) return; for (const pp of paras) { const i = pp.text.indexOf(nm); if (i >= 0 && pp.tag !== 'res') { pp.text = pp.text.slice(0, i + nm.length) + '（' + lab + '）' + pp.text.slice(i + nm.length); break; } } };
  if (ch.a[0] && !fx || ch.fixedKey === 'master_farewell') { ann(ch.a[0], false); if (ch.a[1] && ch.a[1] !== ch.a[0]) ann(ch.a[1], true); if (ch.a[2] && ch.a[2] !== ch.a[0] && ch.a[2] !== ch.a[1]) ann(ch.a[2], true); }
  if (trans) { const arr = ch.cont ? TRANS_CONT : trans.rl ? TRANS_REL : TRANS_PLAIN; const seen = G.chapters.some(c => c.id < ch.id && c.a.indexOf(ch.mainId) >= 0); const mn = !seen && ch.mainJob && JOBS[ch.mainJob] ? trans.mn + '（' + JOBS[ch.mainJob].n[L] + '）' : trans.mn; paras.unshift(mk(fmt(arr[(ch.trI || 0) % arr.length][L], { MN: mn, R: trans.rl, A: v.A }), 'infer')); }
  // header
  const date = dateStr(ch.t, G.gen); const place = PLACES[ch.pl] ? PLACES[ch.pl][L] : PLACES.town[L];
  const protLine = protNames.length ? t('h_prot') + '：' + (ch.who || []).map((i, k) => nameOf(i) + (((ch.info || {})[i] || {}).job ? '（' + JOBS[ch.info[i].job].n[L] + (k > 0 && ch.info[i].rel ? '・' + ch.info[i].rel[L] : '') + '）' : '')).join(L ? '、' : '・') : t('h_prot') + '：—';
  const head = protLine + '｜' + place + '｜' + date + (ch.k ? '｜' + fmt(t('h_part'), { k: ch.k }) : '');
  // historian comment tied to protagonist's character (R3-14)
  let hist; const ht = HIST_TRAIT[pk.tr] && HIST_TRAIT[pk.tr][mood || 'calm']; const protA = protNames[0] || '';
  if (pk.hgen >= 0 || !ht || !ch.who || !ch.who.length) { const hb = HIST_BANK[mood || 'calm']; hist = hb[(pk.hgen >= 0 ? pk.hgen : 0) % hb.length][L]; } else hist = fmt(ht[pk.hist % ht.length][L], { A: protA });
  return { title, bare, head, recap: ch.recap ? ch.recap[L] : null, paras, hist, mood };
}
function renderRecap(ch) {
  const L = li(); const paras = []; const nm = a => a.nm[L];
  paras.push({ text: t('rc_intro'), tag: 'infer' });
  (ch.arcsSnap || []).forEach(a => { const kindTxt = t('rc_kind_' + a.kind); const trim = z => z.replace(/[。.]$/, ''); const first = a.first ? trim(a.first[L]) : ''; const last = a.last ? trim(a.last[L]) : ''; paras.push({ text: fmt(t('rc_arc'), { A: nm(a), J: JOBS[a.job] ? JOBS[a.job].n[L] : '', K: kindTxt, n: a.parts, f: first, l: last, s: a.alive ? t('st_ok') : t('st_dead') }), tag: 'infer' }); });
  paras.push({ text: fmt(t('rc_god'), { c: ch.casts || 0, a: ch.answered || 0 }), tag: 'infer' });
  (ch.bigs || []).forEach(b => paras.push({ text: fmt(t('rc_big_' + b.out), { A: (b.name || ['？', '？'])[L], P: POWER_BY_ID[b.pid] ? POWER_BY_ID[b.pid].n[L] : '' }), tag: 'infer' }));
  return { title: t('rc_title'), bare: t('rc_title'), head: t('h_prot') + '：—', recap: null, paras, hist: t('rc_hist'), mood: 'calm' };
}
function inkOf(ch) { const age = G.tick - ch.now; return age < TICK_DAY ? 'wet' : age < TICK_YEAR ? 'draft' : 'final'; }
function chronText(ch) { const r = renderChapter(ch); return `【${ch.no}】${r.title}\n${r.head}\n` + (r.recap ? t('h_recap') + '：' + r.recap + '\n' : '') + r.paras.map(p => p.text).join('\n') + `\n${t('hist')}：${r.hist}`; }
function chronAll() { return G.chapters.map(chronText).join('\n\n'); }
S.anon = ['誰か', '某人']; S.hist = ['史官曰', '史官曰'];
