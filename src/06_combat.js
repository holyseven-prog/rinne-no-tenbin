/* ================= combat / monsters / quests / parties ================= */
function fxAdd(o) { if (G.fxOn) { if (G.fx.length > 200) G.fx.shift(); G.fx.push(o); } }
const canFight = h => h.alive && h.age >= 16 && (isAdv(h) || (h.retired && h.hp > h.maxHp * 0.5));

function nearestMon(e, r, raidOnly, allowBoss) {
  let best = null, bd = r;
  for (const m of G.monsters) {
    if (!m.alive || m.dormant) continue;
    if (m.boss && m.mode !== 'raid' && !allowBoss) continue;
    if (raidOnly && m.mode !== 'raid') continue;
    const d = Math.hypot(m.x - e.x, m.y - e.y);
    if (d < bd) { bd = d; best = m; }
  }
  return best;
}
function leaveParty(h) {
  const p = G.pidx[h.party]; h.party = 0;
  if (p) p.members = p.members.filter(i => i !== h.id);
  if (h.act && h.act.k === 'quest') { h.act = null; h.path = []; }
}
function combatStep(h) {
  const st = hStats(h);
  // priest heal
  if (h.job === 'priest' && h.age >= 14 && h.healCd <= 0 && !h.inside) {
    let best = null, bf = 0.7;
    for (const o of G.humans) { if (!o.alive || o.inside) continue; if (Math.abs(o.x - h.x) > 5 || Math.abs(o.y - h.y) > 5) continue; const f = o.hp / o.maxHp; if (f < bf) { bf = f; best = o; } }
    if (best) {
      const amt = st.atk * 1.7 + best.maxHp * 0.1; best.hp = Math.min(best.maxHp, best.hp + amt); h.healCd = 3;
      fxAdd({ t: 'heal', x: best.x, y: best.y, v: Math.round(amt) });
      if (best !== h) { h.needs.honor = Math.min(100, h.needs.honor + 0.3); soulOf(h).k.good += 0.04; }
    }
  }
  const hpf = h.hp / h.maxHp, fighter = canFight(h);
  let tg = h.tgt ? G.idx[h.tgt] : null;
  if (tg && (!tg.alive || tg.dormant)) { tg = null; h.tgt = 0; }
  const fleeing = h.flee > G.tick;
  // potion
  if (hpf < 0.5 && h.pots > 0 && h.healCd <= 0 && (tg || threatNear(h, 5))) { h.pots--; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.5); h.healCd = 4; fxAdd({ t: 'heal', x: h.x, y: h.y, v: Math.round(h.maxHp * 0.5) }); return false; }
  if (!tg && !fleeing) {
    if (fighter) {
      const inQuest = h.party && G.pidx[h.party];
      let R = inQuest ? 8 : 6; if (h.act && h.act.k === 'hunt') R = 9;
      const bq = inQuest && G.pidx[h.party].boss; let m = nearestMon(h, R, false, bq);
      if (!m && G.townAlert > 0 && !inQuest && h.act && h.act.k === 'muster') m = nearestMon(h, 11, true);
      if (!m && inQuest && G.pidx[h.party].boss) { m = G.boss && G.boss.alive && !G.boss.dormant && Math.hypot(G.boss.x - h.x, G.boss.y - h.y) < 14 ? G.boss : null; }
      if (m && (hpf > 0.3 || h.pots > 0)) { tg = m; h.tgt = m.id; if (h.act && h.act.k !== 'quest') { h.act = null; h.path = []; h.inside = 0; } }
    } else {
      if (threatNear(h, 4.5) && !(h.act && (h.act.k === 'hide' || h.act.k === 'hide_home'))) { cancelAct(h); h.needs.safety = 100; hideNearest(h); return false; }
    }
  }
  if (tg && fighter && hpf < 0.36 && h.pots <= 0 && !(G.pidx[h.party] && G.pidx[h.party].boss && hpf > 0.15)) {
    h.tgt = 0; tg = null; h.flee = G.tick + 25; if (h.party) leaveParty(h);
    cancelAct(h); h.needs.safety = 100; startAct(h, 'rest'); return false;
  }
  if (tg) {
    const d = Math.hypot(tg.x - h.x, tg.y - h.y);
    if (d <= st.range + 0.3) {
      h.path = []; h.cd -= 1;
      if (h.cd <= 0) { humanAttack(h, tg, st); h.cd += 2 / st.spd; }
    } else {
      h.cd = Math.max(0, h.cd - 1);
      if (!h.path.length || (G.tick + h.id) % 3 === 0) { const p = findPath(h.x, h.y, tg.x, tg.y, Math.max(1, st.range - 0.5), 500); if (p) h.path = p; else { h.tgt = 0; return false; } }
      moveAlong(h, WALK * st.spd);
    }
    return true;
  }
  return false;
}
function hideNearest(h) {
  let best = null, bd = 99;
  for (const b of W.blds) { if (b.kind === 'castle' || b.kind === 'mill') continue; const d = Math.hypot(b.door.x - h.x, b.door.y - h.y); if (d < bd) { bd = d; best = b; } }
  if (!best) return;
  const p = findPath(h.x, h.y, best.door.x, best.door.y, 0, 600); if (!p) return;
  h.path = p; h.act = { k: 'hide', tx: best.door.x, ty: best.door.y, range: 0, bld: best.id, st: 0, n: 0, dur: 8, t0: G.tick };
}
function humanAttack(h, tg, st) {
  let atk = st.atk * rrange(0.85, 1.15);
  let crit = h.job === 'thief' ? 0.2 : 0.05; let cm = 1;
  if (rchance(crit)) cm = 1.7;
  if (h.mist && h.mist > G.tick) atk *= 0.75;
  const dmg = Math.max(1, Math.round(atk * cm - tg.def * 0.5));
  fxAdd({ t: 'atk', x: h.x, y: h.y, tx: tg.x, ty: tg.y, mage: h.job === 'mage' });
  damage(tg, dmg, h, cm > 1);
}
function monsterAttack(m, tg, mul) {
  let atk = m.atk * rrange(0.85, 1.15) * (mul || 1);
  const st = hStats(tg);
  const dmg = Math.max(1, Math.round(atk - st.def * 0.5));
  fxAdd({ t: 'atk', x: m.x, y: m.y, tx: tg.x, ty: tg.y });
  damage(tg, dmg, m);
}
function damage(b, dmg, a, crit) {
  if (!b.alive) return;
  b.hp -= dmg; b.hurt = 4;
  fxAdd({ t: 'dmg', x: b.x, y: b.y, v: dmg, crit: !!crit, human: !!b.job });
  if (b.job) { b.needs.safety = 100; if (!b.tgt && a && !a.job && canFight(b)) { b.tgt = a.id; } }
  else if (a && !b.tgt) { b.tgt = a.id; }
  if (b.hp <= 0) { if (b.job) killHuman(b, 'battle', a); else killMonster(b, a); }
}
function killMonster(m, by) {
  if (!m.alive) return; m.alive = false; m.hp = 0; G.stats.kills++; G.dayKills++;
  const tier = m.tier;
  if (!m.boss && G.killBal < 0.45) { const g = 0.02 * Math.min(tier, 4); G.balance = clamp(G.balance + g, -100, 100); G.killBal += g; }
  fxAdd({ t: 'poof', x: m.x, y: m.y });
  const base = m.boss ? BOSS : m.cad >= 0 ? CADRES[m.cad] : MONS[m.type];
  const exp = (base.exp || (m.boss ? 400 : 80)) * (1 + 0.06 * (yearOf(G.tick) - 1)), gold = (base.gold || (m.boss ? 500 : 60));
  const near = G.humans.filter(o => o.alive && !o.inside && Math.hypot(o.x - m.x, o.y - m.y) <= 8 && canFight(o));
  near.forEach(o => { addExp(o, exp * (o === by ? 1 : 0.45) / Math.max(1, near.length * 0.45 + 0.55)); o.needs.honor = Math.max(0, o.needs.honor - 10); });
  if (by && by.job) {
    by.kills++; by.gold += gold; by.fame += tier; soulOf(by).k.deed += 0.25 * tier;
    const p = G.pidx[by.party]; if (p) p.kills++;
    if (!by.fk && by.lvl <= 3) { by.fk = 1; logEvent('first_battle', [by.id], { m: m.type }, ['growth'], 0.5, 0.6, by); }
  }
  if (m.cad >= 0 || m.boss) {
    logEvent(m.boss ? 'boss_slain' : 'cadre_slain', by && by.job ? [by.id] : [], { cad: m.cad }, ['boss'], 0.95, 0.9, m);
    G.balance = clamp(G.balance + (m.boss ? 10 : 6), -100, 100);
    if (m.boss) endGame('victory');
  }
  if (m.mode === 'raid') G.stats.raidKills = (G.stats.raidKills || 0) + 1;
}
function killHuman(h, cause, by) {
  if (!h.alive) return; h.alive = false; h.hp = 0; h.cause = cause; h.diedAt = G.tick; G.stats.deaths++;
  if (h.party) leaveParty(h);
  h.act = null; h.path = []; h.tgt = 0; h.inside = 0;
  const s = soulOf(h); if (s) {
    s.state = 'river'; s.lastJob = h.job; s.hid = 0; s.wait = G.tick + rint(1, 3) * TICK_YEAR * 0.9 + rint(0, 300);
    s.lives.push({ name: h.name, job: h.job, age: Math.round(h.age), cause, died: G.tick, lvl: h.lvl });
    if (cause === 'battle') s.k.deed += 1.5; if (cause === 'old') s.k.good += 1;
    if (h.spouse) { const sp = hById(h.spouse); if (sp && sp.alive) { const ss = soulOf(sp); s.bonds.push({ sid: ss.id, kind: 'love' }); ss.bonds.push({ sid: s.id, kind: 'love' }); sp.spouse = 0; sp.grief = 1; sp.needs.faith += 20; } }
    if (h.master) { const ms = hById(h.master); if (ms && ms.alive) { s.bonds.push({ sid: soulOf(ms).id, kind: 'master' }); soulOf(ms).bonds.push({ sid: s.id, kind: 'master' }); } }
    G.humans.forEach(o => { if (o.alive && o.master === h.id) { const os = soulOf(o); s.bonds.push({ sid: os.id, kind: 'master' }); os.bonds.push({ sid: s.id, kind: 'master' }); } });
    if (s.bonds.length > 6) s.bonds = s.bonds.slice(-6);
  }
  if (cause === 'battle' || cause === 'starve') G.humans.forEach(o => { if (o.alive && (o.rel[h.id] || 0) > 55) { o.grief = 1; o.needs.safety = 100; } });
  G.balance = clamp(G.balance - (cause === 'battle' ? 0.4 : 0.1), -100, 100);
  fxAdd({ t: 'soul', x: h.x, y: h.y });
  const spot = G.spot.indexOf(h.id); if (spot >= 0) G.spot.splice(spot, 1);
  logEvent('death', [h.id], { cause, by: by && by.type ? by.type : '' }, ['death'], cause === 'old' ? 0.55 : 0.8, 0.9, h);
  G.prayers.forEach(p => { if (p.hid === h.id && p.state === 'open') p.state = 'void'; });
  if (G.onDeath) G.onDeath(h);
}

/* ---------- monsters ---------- */
function updateMonster(m) {
  if (!m.alive || m.dormant) return;
  const spd = m.spd;
  let tg = m.tgt ? G.idx[m.tgt] : null;
  if (tg && (!tg.alive || tg.inside)) { tg = null; m.tgt = 0; }
  const aggro = m.boss ? (m.mode === 'raid' ? 11 : 4.5) : m.cad >= 0 ? 8 : m.mode === 'raid' ? 8 : 5.5;
  if (!tg || (G.tick + m.id) % 4 === 0) {
    let best = tg, bd = tg ? Math.hypot(tg.x - m.x, tg.y - m.y) : aggro;
    for (const o of G.humans) { if (!o.alive || o.inside) continue; const d = Math.hypot(o.x - m.x, o.y - m.y); if (d < bd) { bd = d; best = o; } }
    if (best) { tg = best; m.tgt = best.id; }
  }
  // leash for guards
  if (tg && (m.boss || m.cad >= 0) && m.mode !== 'raid' && Math.hypot(tg.x - m.home.x, tg.y - m.home.y) > (m.boss ? 10 : 15)) { tg = null; m.tgt = 0; }
  if (tg) {
    const d = Math.hypot(tg.x - m.x, tg.y - m.y);
    cadreSkill(m, tg, d);
    if (d <= m.range + 0.3) {
      m.path = []; m.cd -= 1;
      if (m.cd <= 0) { let mul = 1; if (m.cad === 1 && m.sk % 6 === 0) mul = 1.8; monsterAttack(m, tg, mul); m.cd += 2 / spd; }
    } else {
      m.cd = Math.max(0, m.cd - 1);
      if (!m.path.length || (G.tick + m.id) % 3 === 0) { const p = findPath(m.x, m.y, tg.x, tg.y, Math.max(1, m.range - 0.5), 500); if (p) m.path = p; }
      moveAlong(m, WALK * spd * (m.boss ? 0.9 : 1.05));
    }
    return;
  }
  if (m.mode === 'raid') {
    if (!m.path.length && Math.hypot(m.x - PLAZA.x, m.y - PLAZA.y) > 4) { const p = findPath(m.x, m.y, PLAZA.x + rint(-3, 3), PLAZA.y + rint(-2, 2), 1, 1500); if (p) m.path = p; }
    moveAlong(m, WALK * spd); return;
  }
  // wander / return home
  if (m.path.length) { moveAlong(m, WALK * spd * 0.6); return; }
  if (--m.wt <= 0) {
    m.wt = rint(4, 10);
    const hx = m.home.x, hy = m.home.y; const r = (m.boss || m.cad >= 0) ? 2 : 4;
    const p = nearestWalkable(hx + rint(-r, r), hy + rint(-r, r)); const pp = findPath(m.x, m.y, p.x, p.y, 0, 300); if (pp) m.path = pp;
  }
}
function cadreSkill(m, tg, d) {
  m.sk++;
  if (m.boss && m.sk % 7 === 0 && d < 4) { // heavy sweep
    G.humans.forEach(o => { if (o.alive && !o.inside && Math.hypot(o.x - m.x, o.y - m.y) <= 3) { const dmg = Math.max(1, Math.round(m.atk * 0.55 - hStats(o).def * 0.4)); damage(o, dmg, m); } });
    fxAdd({ t: 'ring', x: m.x, y: m.y });
  } else if (m.cad === 0 && m.sk % 8 === 0) { G.humans.forEach(o => { if (o.alive && Math.hypot(o.x - m.x, o.y - m.y) <= 4) o.mist = G.tick + 6; }); fxAdd({ t: 'ring', x: m.x, y: m.y }); }
  else if (m.cad === 2 && m.sk % 10 === 0 && d > 2) { // shadow dash
    let best = null, bh = 1e9; G.humans.forEach(o => { if (o.alive && !o.inside && Math.hypot(o.x - m.x, o.y - m.y) <= 8 && o.hp < bh) { bh = o.hp; best = o; } });
    if (best) { const p = nearestWalkable(best.x + 1, best.y); m.x = p.x; m.y = p.y; m.px = p.x; m.py = p.y; m.path = []; m.tgt = best.id; monsterAttack(m, best, 1.4); }
  }
}
function monsterCap() {
  const dark = clamp(0.5 - G.balance / 200, 0.05, 0.95); const yr = yearOf(G.tick);
  let cap = 2 + Math.round(dark * 6) + Math.min(4, yr - 1);
  if (G.balance >= 70) cap = Math.round(cap * 0.5);
  if (G.awakened) cap += 1; return cap;
}
function tierForSpawn() {
  const yr = yearOf(G.tick); const r = rnd();
  if (G.awakened) return r < 0.2 ? 2 : 3;
  if (yr <= 3) return 1; if (yr <= 5) return r < 0.7 ? 1 : 2; return r < 0.4 ? 1 : r < 0.85 ? 2 : 3;
}
function wildCount() { let c = 0; for (const m of G.monsters) if (m.alive && !m.boss && m.cad < 0 && m.mode !== 'raid') c++; return c; }
function spawnTick() {
  if (G.tick % 8 === 0 && wildCount() < monsterCap() && (G.forceMonsters || true)) { spawnMonster(tierForSpawn()); }
  // cleanup the dead + old wild
  if (G.tick % 144 === 0) {
    G.monsters = G.monsters.filter(m => m.alive || m.boss || m.cad >= 0);
    rebuildIdx();
  }
}
function townPressure() {
  let p = 0; G.raidAlive = 0;
  for (const m of G.monsters) { if (!m.alive || m.dormant) continue; if (m.mode === 'raid') G.raidAlive++; if (m.x >= TOWN_X0 && m.x <= TOWN_X1 && m.mode === 'raid') p += m.boss ? 0.5 : m.cad >= 0 ? 0.22 : 0.05; }
  return p;
}
function spawnRaid(n, tier, withCad) {
  const mons = [];
  for (let i = 0; i < n; i++) { const m = spawnMonster(tier, { x: FIELD_X0 + 2, y: 23 }, 'raid'); if (m) mons.push(m); }
  let cad = null;
  if (withCad) { const cs = G.cadres.map(i => G.idx[i]).filter(c => c && c.alive && c.mode !== 'raid'); if (cs.length) { cad = rpick(cs); cad.dormant = false; cad.mode = 'raid'; const p = nearestWalkable(FIELD_X0 + 4, 23); cad.x = cad.px = p.x; cad.y = cad.py = p.y; cad.path = []; cad.hp = Math.max(cad.hp, cad.maxHp * 0.7); } }
  G.stats.raids++; G.townAlert = TICK_DAY * 2;
  logEvent('monster_raid', [], { n: mons.length, cad: cad ? cad.cad : -1 }, ['raid'], withCad ? 0.85 : 0.6, 0.8, { x: FIELD_X0 + 2, y: 23 });
  return mons;
}

/* ---------- quests ---------- */
const QTYPES = ['hunt', 'hunt', 'gather', 'escort', 'search'];
function mkQuest(type, tier) {
  const yr = yearOf(G.tick);
  const lo = tier === 1 ? 44 : tier === 2 ? 46 : 48, hi = tier === 1 ? 47 : tier === 2 ? 50 : 52;
  let p = randWalkableIn(lo, 5, hi, 38);
  const q = { id: G.nid++, type, tier, day: dayIdx(G.tick), state: 'open', need: type === 'hunt' ? rint(3, 4) + tier : 0, got: 0, tx: p.x, ty: p.y, reward: 0, exp: 0, party: 0, t: G.tick, mon: rpick(MON_BY_TIER[Math.min(3, tier)]) };
  q.reward = Math.round((18 + 10 * tier * tier + (q.need || 4) * 4) * (1 + 0.04 * (yr - 1)));
  q.exp = 8 + tier * 8;
  G.quests.push(q); G.qidx[q.id] = q; return q;
}
function dailyQuests() {
  const open = G.quests.filter(q => q.state === 'open' && q.type !== 'boss').length;
  const want = G.awakened ? TUNE.warQuests : 2 + (yearOf(G.tick) >= 3 ? 1 : 0);
  for (let i = open; i < want; i++) {
    const yr = yearOf(G.tick); let tier = 1 + (yr >= 4 ? 1 : 0) + (yr >= 6 ? 1 : 0); if (G.awakened) tier = 3; if (rchance(0.3) && tier > 1) tier--;
    mkQuest(rpick(QTYPES), tier);
  }
  // expire old open quests
  G.quests = G.quests.filter(q => !(q.state === 'open' && G.tick - q.t > 6 * TICK_DAY) && !((q.state === 'done' || q.state === 'fail') && G.tick - q.t > 4 * TICK_DAY));
  G.qidx = {}; G.quests.forEach(q => G.qidx[q.id] = q);
}
function advPower(h) { const st = hStats(h); const J = JOBS[h.job]; return Math.sqrt(st.hp * st.atk) * (h.hp / h.maxHp + 0.2); }
function freeAdvs() { return G.humans.filter(o => o.alive && isAdv(o) && !o.party && o.hp >= o.maxHp * 0.62 && !(o.act && o.act.k === 'sleep' && hourOf(G.tick) < 5) && !o.flee); }
function partyOk(tier, group) {
  const avg = group.reduce((a, o) => a + o.lvl + o.gear * 0.7, 0) / group.length;
  if (tier === 1) return avg >= 1.5 || group.length >= 2;
  if (tier === 2) return group.length >= 2 && avg >= 4;
  return group.length >= 3 && avg >= 7;
}
function tryFormParty(h) {
  const qs = openQuests().filter(q => q.type !== 'boss'); if (!qs.length) return false;
  const pool = freeAdvs().filter(o => o !== h && (o.pots >= 1 || o.gold < 12) && Math.hypot(o.x - h.x, o.y - h.y) < 25);
  pool.sort((a, b) => (b.lvl + b.gear) - (a.lvl + a.gear));
  qs.sort((a, b) => b.tier - a.tier);
  for (const q of qs) {
    const size = q.tier === 1 ? 2 : q.tier === 2 ? 3 : 4;
    const group = [h]; const pr = pool.find(o => o.job === 'priest' && !group.includes(o)); if (pr && size >= 3) group.push(pr);
    for (const o of pool) { if (group.length >= size) break; if (!group.includes(o)) group.push(o); }
    if (!partyOk(q.tier, group)) continue;
    makeParty(group, q); return true;
  }
  return false;
}
function makeParty(group, q) {
  const p = { id: G.nid++, members: group.map(o => o.id), q: q.id, state: 'go', t0: G.tick, kills: 0, wt: 0, boss: q.type === 'boss', goal: { x: q.tx, y: q.ty }, leader: group[0].id, n0: group.length };
  G.parties.push(p); G.pidx[p.id] = p; q.state = 'taken'; q.party = p.id; q.t = G.tick;
  group.forEach(o => { cancelAct(o); o.party = p.id; o.act = { k: 'quest', st: 1, n: 0, dur: 1e9, t0: G.tick }; o.state = 'quest'; o.flee = 0; if (rchance(0.35)) addPrayer(o, 'battle', 0.5); });
  G.stats.quests++;
  logEvent(q.type === 'boss' ? 'boss_expedition' : 'party_formed', group.map(o => o.id), { q: q.type, tier: q.tier, mon: q.mon }, ['quest'], q.type === 'boss' ? 0.95 : 0.35 + 0.1 * q.tier, 0.6, { x: W.bk.guild[0].appr.x, y: W.bk.guild[0].appr.y });
}
function partyStep(h) {
  const p = G.pidx[h.party];
  if (!p) { h.act = null; h.party = 0; return; }
  if (h.path.length) { moveAlong(h, WALK * hStats(h).spd); return; }
  const g = p.state === 'return' ? { x: W.bk.guild[0].appr.x, y: W.bk.guild[0].appr.y, r: 0 } : { x: p.goal.x, y: p.goal.y, r: p.state === 'work' ? 3 : 1 };
  const d = Math.hypot(h.x - g.x, h.y - g.y);
  if (d > g.r + 0.8) { const pp = findPath(h.x, h.y, g.x + (p.state === "return" ? 0 : rint(-1, 1)), g.y + (p.state === "return" ? 0 : rint(-1, 1)), g.r, 1800); if (pp) { h.path = pp; h.pfail = 0; } else if (++h.pfail > 4) leaveParty(h); }
  else if (p.state === 'return') {
    // arrived: payout
    const q = G.qidx[p.q]; const share = q ? q.reward / Math.max(1, p.n0) : 10;
    h.gold += share; h.needs.honor = Math.max(0, h.needs.honor - 25); h.fame += 1; addExp(h, q ? q.exp : 5); h.needs.wealth = Math.max(0, h.needs.wealth - 20);
    soulOf(h).k.good += 0.6; G.dayGood += 0.1;
    leaveParty(h);
  }
}
function updateParties() {
  for (const p of G.parties) {
    if (p.state === 'done') continue;
    const q = G.qidx[p.q];
    const mem = p.members.map(i => G.idx[i]).filter(o => o && o.alive);
    p.members = mem.map(o => o.id);
    if (!mem.length) { if (p.state === 'return') { p.state = 'done'; if (q && q.state !== 'done') q.state = 'done'; } else { p.state = 'done'; if (q) { q.state = 'fail'; q.t = G.tick; } logEvent('quest_fail', [], { q: q ? q.type : '', wipe: true, names: p.n0 }, ['quest', 'death'], 0.85, 0.9, { x: p.goal.x, y: p.goal.y }); } continue; }
    if (p.state !== 'return' && (G.tick - p.t0 > (p.boss ? 2.2 : 3) * TICK_DAY)) { p.state = 'return'; if (q) { q.state = 'fail'; q.t = G.tick; } logEvent('quest_fail', mem.map(o => o.id), { q: q ? q.type : '', wipe: false }, ['quest'], 0.5, 0.5, { x: p.goal.x, y: p.goal.y }); continue; }
    const lead = mem[0];
    const avgHp = mem.reduce((a, o) => a + o.hp / o.maxHp, 0) / mem.length;
    if ((p.state === 'go' || p.state === 'work') && avgHp < 0.5 && !p.boss) { p.state = 'return'; if (q) { q.state = 'fail'; q.t = G.tick; } logEvent('quest_fail', mem.map(o => o.id), { q: q ? q.type : '', wipe: false, retreat: true }, ['quest'], 0.5, 0.5, { x: lead.x, y: lead.y }); continue; }
    if (p.state === 'go') {
      if (Math.hypot(lead.x - p.goal.x, lead.y - p.goal.y) <= 3.2) { p.state = 'work'; p.wt = 0; }
    } else if (p.state === 'work') {
      p.wt++;
      if (p.boss) { if (!G.boss.alive) { p.state = 'return'; } continue; }
      const near = nearestMon(lead, 9);
      if (q.type === 'hunt') {
        if (p.kills >= q.need) { clearQuest(p, q, mem); continue; }
        if (!near && p.wt % 3 === 0 && avgHp > 0.6) { const m = spawnMonster(q.tier, { x: lead.x + 2, y: lead.y }, 'wander'); if (m) { m.tgt = lead.id; } }
      } else {
        if (p.wt === 2 && rchance(0.75)) { const n = rint(1, 2); for (let i = 0; i < n; i++) { const m = spawnMonster(q.tier, { x: lead.x + 2, y: lead.y }, 'wander'); if (m) m.tgt = lead.id; } }
        if (p.wt >= 8 && !near) { clearQuest(p, q, mem); continue; }
      }
    }
  }
  if (G.tick % 72 === 0) { G.parties = G.parties.filter(p => p.state !== 'done'); G.pidx = {}; G.parties.forEach(p => G.pidx[p.id] = p); }
}
function clearQuest(p, q, mem) {
  p.state = 'return'; q.state = 'done'; q.t = G.tick; G.balance = clamp(G.balance + 0.1 + 0.05 * q.tier, -100, 100); G.dayGood += 0.15;
  logEvent('quest_clear', mem.map(o => o.id), { q: q.type, tier: q.tier, mon: q.mon, reward: q.reward }, ['quest'], 0.4 + 0.1 * q.tier, 0.7, { x: W.bk.guild[0].appr.x, y: W.bk.guild[0].appr.y });
}

/* ---------- boss expedition ---------- */
function bossEstimate(group) {
  const b = G.boss; const bossAtk = b.atk, bossDef = b.def;
  let dps = 0, ehp = 0, pri = 0;
  group.forEach(o => { const st = hStats(o); dps += Math.max(1, st.atk * 0.97 - bossDef * 0.5) / (2 / st.spd); ehp += st.hp * (o.hp / o.maxHp); if (o.job === 'priest') pri++; });
  const avgDef = group.reduce((a, o) => a + hStats(o).def, 0) / group.length;
  const bdps = Math.max(1, bossAtk * 1.0 - avgDef * 0.5) / (2 / b.spd) * 1.22 + 0.4 * (bossAtk * 0.55) / 7 * Math.min(4, group.length);
  const ttk = b.hp / Math.max(1, dps), sts = ehp * (1 + 0.45 * pri) / bdps + group.length * 0.8;
  return { ttk, sts, ratio: sts / ttk };
}
function tryBossExpedition(force) {
  if (!G.awakened || !G.boss.alive || G.bossFight || G.ending) return;
  if (G.tick - G.lastBossTry < TICK_DAY * 3 && !force) return;
  if (!force && G.tick - G.awakenAt < TUNE.expDelay * TICK_DAY && G.town.hp > 50) return;
  const pool = G.humans.filter(o => o.alive && isAdv(o) && !o.party && o.hp >= o.maxHp * 0.5 && o.lvl >= 5); if (pool.length < 3 && !force) return;
  pool.sort((a, b) => advPower(b) - advPower(a));
  const group = pool.slice(0, 8); if (group.length < 3) return;
  const est = bossEstimate(group);
  const desperate = G.town.hp < 55 || G.tick - G.awakenTick > 2.5 * TICK_YEAR;
  const need = desperate ? 0.8 : TUNE.expRatio;
  if (est.ratio < need && !force) return;
  G.lastBossTry = G.tick; G.bossTries++; G.bossFight = true; G.forceBCount = 0;
  const q = mkQuest('boss', 4); q.tx = BOSS.home.x; q.ty = BOSS.home.y + 2; q.reward = 600; q.exp = 150; q.mon = 'boss';
  makeParty(group, q);
  G.pidx[q.party].goal = { x: BOSS.home.x, y: BOSS.home.y + 2 };
  G.boss.dormant = false;
  group.forEach(o => { o.pots = Math.max(o.pots, 1); });
}
