/* ================= events / day update / souls / endings / main tick ================= */
function placeKey(pos) {
  if (!pos) return 'town';
  const x = pos.x, y = pos.y;
  for (const b of W.blds) { if (x >= b.x - 1 && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) { if (b.kind === 'house' || b.kind === 'hut') return 'house'; return b.kind; } }
  const z = zoneOf(x);
  if (z === 'town' && x >= 24 && x <= 32 && y >= 16 && y <= 23) return 'plaza';
  if (z === 'field') { if (x >= 44 && x <= 54 && y >= 24 && y <= 36) return 'lake'; return 'field'; }
  return z;
}
function logEvent(type, actors, payload, tags, tension, emotion, where) {
  const pos = where && isNum(where.x) ? { x: Math.round(where.x), y: Math.round(where.y) } : null;
  const ev = { id: G.nid++, t: G.tick, type, actors: (actors || []).slice(), payload: payload || {}, tags: tags || [], tension: tension || 0, emotion: emotion || 0, place: placeKey(pos), pos, used: false, names: {} };
  (actors || []).forEach(i => { const e = G.idx[i]; if (e && e.name) ev.names[i] = e.name; });
  G.events.push(ev); if (typeof memUpdate === 'function') memUpdate(ev);
  if (G.events.length > 480) { let k = 0; G.events = G.events.filter(e => { if (k < 120 && e.used) { k++; return false; } return true; }); if (G.events.length > 480) G.events.splice(0, G.events.length - 400); }
  G.log.push({ t: G.tick, type, a: ev.actors.slice(0, 3) }); if (G.log.length > 80) G.log.shift();
  if (pos) G.lastEvPos = pos;
  if (tension >= 0.5) G.lastNotable = G.tick;
  if (G.onEvent) G.onEvent(ev);
  if (type.startsWith('ending_') || type === 'boss_slain') chronForce(ev);
  return ev;
}

/* ---------- souls ---------- */
function reincarnate(s) {
  const homes = W.homes.filter(hi => G.humans.filter(o => o.alive && o.home === hi).length < 5);
  const home = homes.length ? rpick(homes) : rpick(W.homes);
  const prev = s.lives[s.lives.length - 1];
  const sex = rchance(0.5) ? 'M' : 'F';
  const k = s.k;
  const tr = []; if (k.good >= 4) tr.push('kind'); if (k.evil >= 4) tr.push('greedy'); if (k.deed >= 6) tr.push('brave'); if (k.attach >= 3) tr.push('stubborn');
  if (!tr.length) tr.push(rpick(TRAIT_KEYS)); if (tr.length > 2) tr.length = 2;
  const h = mkHuman({ job: 'farmer', age: 0.2, sex, home, soul: s.id, traits: tr });
  const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.child = true;
  if (prev && rchance(0.4)) h.echo = { name: prev.name, job: prev.job };
  s.k = { good: k.good * 0.6, evil: k.evil * 0.6, deed: k.deed * 0.6, attach: k.attach * 0.6 };
  G.humans.push(h); G.idx[h.id] = h; G.stats.births++;
  logEvent('reincarnation', [h.id], { echo: !!h.echo, prev: prev ? prev.name : null, job: prev ? prev.job : null }, ['soul'], 0.55, 0.8, h);
  if (G.onReincarnate) G.onReincarnate(h, s);
  return h;
}
function birthNatural(mother) {
  const ready = G.souls.filter(s => s.state === 'river' && s.wait <= G.tick + TICK_YEAR * 0.6);
  let s = null; if (ready.length) s = rpick(ready);
  if (s) { const h = reincarnate(s); h.home = mother.home; const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.parent = mother.id; logEvent('birth', [mother.id, h.id], {}, ['family'], 0.6, 0.9, mother); return h; }
  const h = mkHuman({ job: 'farmer', age: 0.2, home: mother.home }); const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.child = true; h.parent = mother.id;
  G.humans.push(h); G.idx[h.id] = h; G.stats.births++;
  logEvent('birth', [mother.id, h.id], {}, ['family'], 0.6, 0.9, mother);
  return h;
}

/* ---------- day update ---------- */
function aliveHumans() { return G.humans.filter(h => h.alive); }
function awaken() {
  G.awakened = true; G.boss.dormant = false; G.raidDay = dayIdx(G.tick) + 5; G.awakenAt = G.tick;
  logEvent('boss_awaken', [], {}, ['boss'], 1, 1, BOSS.home);
  G.balance = clamp(G.balance - 12, -100, 100);
  G.pendingCutscene = 'awaken';
  if (G.onAwaken) G.onAwaken();
}
function dayUpdate() {
  const d = dayIdx(G.tick), yr = yearOf(G.tick);
  const alive = aliveHumans();
  // old age / accidents
  for (const h of alive) { if (h.age >= 60 && rchance((h.age - 60) * 0.002 + 0.0006)) killHuman(h, 'old', null); }
  // pregnancies / births
  const pop = aliveHumans().length;
  for (const h of aliveHumans()) {
    if (h.preg && G.tick >= h.preg) { h.preg = 0; birthNatural(h); }
    else if (!h.preg && h.sex === 'F' && h.spouse && h.age >= 18 && h.age < 42 && pop < POP_MAX && rchance(0.02)) { h.preg = G.tick + 3 * TICK_DAY; }
  }
  // forced reincarnation
  for (const s of G.souls) { if (s.state === 'river' && s.wait <= G.tick && G.humans.filter(x => x.alive).length < POP_MAX) { if (rchance(0.2) || G.tick - s.wait > TICK_YEAR * 0.5) reincarnate(s); } }
  // balance
  let b = G.balance - TUNE.drift - (G.awakened ? 0.6 : 0) + G.dayGood * 0.5 - G.dayEvil * 0.9;
  if (b > 60) b -= (b - 60) * 0.03;
  G.balance = clamp(b, -100, 100); G.balAcc += G.balance;
  if (G.balance >= 65 && G.dayKills === 0 && G.tick - G.lastNotable > TICK_DAY) G.stag++; else if (G.balance < 55) G.stag = 0;
  G.dayGood = 0; G.dayEvil = 0; G.dayKills = 0; G.killBal = 0;
  // faith
  let dis = 0; for (const h of aliveHumans()) { dis += h.disappoint || 0; if (h.disappoint > 0) h.disappoint = Math.max(0, h.disappoint - 0.012); } dis /= Math.max(1, pop);
  G.faith = Math.min(G.faithMax, G.faith + pop * 0.16 * clamp(1 - dis * TUNE.disMul, 0.1, 1));
  if (G.faith > 100) { const ex = (G.faith - 100) * 0.3; G.faith -= ex; G.town.food += ex * 0.8; G.town.hp = Math.min(100, G.town.hp + ex * 0.15); G.stats.overflow = (G.stats.overflow || 0) + ex; if (G.onOverflow && ex > 1.2) G.onOverflow(ex); }
  G.eye = Math.min(3, G.eye + 1);
  // town economy
  G.town.food = Math.max(0, Math.min(400, G.town.food)); G.town.potions = Math.min(30, G.town.potions); G.town.gearStock = Math.min(10, G.town.gearStock);
  // thieves steal
  if (rchance(0.12)) { const th = alive.filter(h => h.job === 'thief' && h.alive && h.age >= 16); if (th.length) { const t = rpick(th), v = rpick(alive.filter(h => h !== t && h.gold > 10 && h.age >= 14) || [t]); if (v && v !== t) { const amt = Math.min(v.gold, rint(8, 25)); v.gold -= amt; t.gold += amt; soulOf(t).k.evil += 1.5; t.guilt = 1; v.rel[t.id] = (v.rel[t.id] || 0) - 40; G.dayEvil += 0.5; logEvent('betrayal', [t.id, v.id], { amt }, ['crime'], 0.65, 0.8, t); } } }
  dailyQuests();
  if (d % 6 === 0 && G.humans.some(x => !x.alive && G.tick - (x.diedAt || 0) > TICK_YEAR)) { G.humans = G.humans.filter(x => x.alive || G.tick - (x.diedAt || 0) <= TICK_YEAR); rebuildIdx(); }
  // monster raids
  if (!G.awakened) {
    if (yr >= 4 && d >= G.raidDay && rchance(0.5 + (0.5 - G.balance / 200) * 0.5)) { spawnRaid(2 + (yr >> 2), yr <= 5 ? 1 : 2, false); G.raidDay = d + rint(9, 15); }
    else if (d >= G.raidDay) G.raidDay = d + 3;
  } else {
    const since = (G.tick - G.awakenAt) / TICK_YEAR;
    if (d >= G.raidDay) { spawnRaid(Math.round(TUNE.waveBase + since * TUNE.waveGrow + (G.balance < -20 ? 1 : 0)), 3, true); G.raidDay = d + Math.max(3, Math.round(TUNE.waveInt - since * TUNE.waveDec)); }
    if (!G.sortie && G.tick > G.awakenAt + 4.5 * TICK_YEAR && G.boss.alive) { G.sortie = true; G.boss.mode = 'raid'; G.boss.dormant = false; logEvent('boss_sortie', [], {}, ['boss'], 1, 1, G.boss); }
  }
  if (G.awakened && G.boss.alive && !G.bossFight) G.boss.hp = Math.min(G.boss.maxHp, G.boss.hp + G.boss.maxHp * 0.005);
  if (d % 12 === 0) { G.balYear.push(G.balAcc / 12); G.balAcc = 0; yearlyUpdate(); }
  // stats sample
  G.stats.faithSum = (G.stats.faithSum || 0) + G.faith; G.stats.faithN = (G.stats.faithN || 0) + 1;
}
function yearlyUpdate() {
  const yr = yearOf(G.tick); yearEndFores();
  if (!G.awakened) {
    const avg = G.balYear[G.balYear.length - 1] || 0;
    G.awakenOff = clamp((G.awakenOff || 0) + (avg - 10) / 100 * 0.6, -2, 2);
    G.awakenTick = BOSS_BASE_TICK + Math.round(G.awakenOff * TICK_YEAR);
  } else if (G.boss.alive) {
    G.boss.maxHp = Math.round(G.boss.maxHp * TUNE.bossGrow); G.boss.hp = Math.min(G.boss.maxHp, G.boss.hp * TUNE.bossGrow + 1); G.boss.atk *= 1.08; G.boss.def *= 1.07;
    G.cadres.forEach(i => { const c = G.idx[i]; if (c && c.alive) { c.maxHp = Math.round(c.maxHp * 1.08); c.atk *= 1.08; c.def *= 1.05; } });
  }
}

/* ---------- endings ---------- */
function endGame(kind) {
  if (G.ending) return;
  G.ending = { kind, t: G.tick, year: yearOf(G.tick) };
  logEvent('ending_' + kind, [], {}, ['ending'], 1, 1, null);
  if (G.onEnd) G.onEnd(G.ending);
}
function checkEndings() {
  if (G.ending) return;
  const alive = G.stats.alive;
  if (G.awakened && (G.town.hp <= 0 || alive < 6)) return endGame('doom');
  if (G.faith <= 0.5) G.faithZero++; else G.faithZero = Math.max(0, G.faithZero - 3);
  if (G.faithZero > 18 * TICK_DAY && G.tick - (G.lastAnswer || 0) > 12 * TICK_DAY) return endGame('godleft');
  if (G.stag >= 36) return endGame('stagnant');
  if (G.tick > START_TICK + 22 * TICK_YEAR) return endGame(G.awakened ? 'doom' : 'stagnant');
}

/* ---------- main tick ---------- */
function tick() {
  if (G.ending) return;
  G.tick++;
  const tk = G.tick;
  for (const h of G.humans) { h.px = h.x; h.py = h.y; if (h.hurt > 0) h.hurt--; }
  for (const m of G.monsters) { m.px = m.x; m.py = m.y; if (m.hurt > 0) m.hurt--; }
  if (!G.awakened && tk >= G.awakenTick) awaken();
  updateParties();
  let alive = 0;
  for (let i = 0; i < G.humans.length; i++) { const h = G.humans[i]; if (h.alive) { alive++; updateHuman(h); } }
  G.stats.alive = alive;
  for (let i = 0; i < G.monsters.length; i++) updateMonster(G.monsters[i]);
  spawnTick();
  // town pressure
  const pr = townPressure();
  if (pr > 0) G.town.hp = Math.max(G.awakened ? -1 : 25, G.town.hp - pr * TUNE.townDrain); else G.town.hp = Math.min(100, G.town.hp + 0.012);
  if (G.town.hp < 70 && !G.sieged && G.awakened) { G.sieged = true; logEvent('siege', [], {}, ['raid'], 0.85, 0.8, PLAZA); } else if (G.town.hp > 95) G.sieged = false;
  if (G.raidAlive === 0) G.townAlert = 0; else G.townAlert = Math.max(G.townAlert, 12);
  if (tk % 6 === 0) { expirePrayers(); if (G.bossFight && !G.parties.some(p => p.boss && p.state !== 'done')) G.bossFight = false; if (G.awakened) tryBossExpedition(); scripted(); }
  if (tk % TICK_DAY === 0) dayUpdate();
  if (G.policy === 'basic') policyBasic();
  chronTick();
  checkEndings();
}
function scripted() {
  const rel = G.tick - START_TICK;
  if (!G.flags.firstPrayer && rel >= 520) {
    G.flags.firstPrayer = 1;
    const c = G.humans.filter(h => h.alive && h.job === 'farmer' && h.age >= 18); const h = c.length ? c[0] : G.humans.find(x => x.alive);
    if (h && !hasPrayer(h)) { h.hp = Math.min(h.hp, h.maxHp * 0.45); h.prayCd = 0; const p = addPrayer(h, 'sick', 0.8); if (p) G.flags.tutPrayer = p.id; }
  }
  if (!G.flags.farewell && rel >= 680) {
    G.flags.farewell = 1; const g = hById0('gald'), k = hById0('kyle');
    if (g && k && g.alive && k.alive) logEvent('master_farewell', [g.id, k.id], { fixed: true }, ['relation'], 0.9, 0.8, g);
  }
}
