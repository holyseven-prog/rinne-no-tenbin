/* ================= faith / divine powers / counsel / policy ================= */
const FATIGUE_WIN = 30 * TICK_DAY;
function godOf() { return GODS.find(g => g.id === G.god) || GODS[0]; }
function fatigueStage(pid) {
  G.hist = G.hist.filter(x => G.tick - x.t < FATIGUE_WIN);
  const n = G.hist.filter(x => x.p === pid).length;
  return Math.floor(n / 3);
}
function powerCost(pid) {
  const base = POWER_BY_ID[pid].cost; const gm = godOf().cost[pid] || 1;
  return Math.max(1, Math.round(base * gm * (1 + 0.2 * fatigueStage(pid))));
}
const BASE_P = { oracle: 0.66, grace: 0.72, trial: 0.6, soul: 0.55, force: 0.62 };
function successProb(pid, h) {
  let p = BASE_P[pid] + (godOf().bonus[pid] || 0) - 0.05 * fatigueStage(pid);
  if (h) {
    p += (50 - h.needs.faith) / 260 - (h.disappoint || 0) * 0.03;
    const s = soulOf(h); if (s && s.fav) p += 0.1;
    const pray = G.prayers.find(x => x.state === 'open' && x.hid === h.id); if (pray) p += 0.04 * pray.urg + 0.04;
  }
  return clamp(p, 0.15, 0.93);
}
function rollOutcome(p) {
  const wild = godOf().wild || 0;
  const crit = p * (0.2 + wild), tw = (1 - p) * (0.55 + wild * 2);
  const u = rnd();
  if (u < crit) return 'crit'; if (u < p) return 'success'; if (u < p + tw) return 'twist'; return 'fail';
}
function resolvePrayer(pr, outcome, pid, h) {
  if (!pr || pr.state !== 'open') return;
  pr.state = outcome === 'twist' ? 'twisted' : 'answered'; pr.by = pid; pr.out = outcome;
  const gain = outcome === 'crit' ? 10 : outcome === 'success' ? 6 : 2.5;
  G.faith = Math.min(G.faithMax, G.faith + gain); G.lastAnswer = G.tick; G.stats.answered++; G._gain = gain; G._pk = pr.kind;
  h.needs.faith = Math.max(0, h.needs.faith - 40); h.disappoint = Math.max(0, (h.disappoint || 0) - 1);
  if (G.onPrayerEnd) G.onPrayerEnd(pr);
  if (!G.tut.prayer) G.tut.prayer = true;
}
function prayerOf(h) { return G.prayers.find(p => p.state === 'open' && p.hid === h.id); }

/* cast: returns {ok,outcome,cost,...} */
function castPower(pid, tid, dir) {
  const P = POWER_BY_ID[pid]; if (!P) return { ok: false, err: 'bad' };
  const cost = powerCost(pid);
  if (G.faith < cost) return { ok: false, err: 'faith', cost };
  let h = null, s = null;
  if (pid !== 'force') {
    const e = G.idx[tid]; if (e && e.job) h = e; else if (G.sidx[tid]) s = G.sidx[tid];
    if (!h && !s) return { ok: false, err: 'target' };
    if (h && !h.alive) return { ok: false, err: 'target' };
    if (s && pid !== 'soul') return { ok: false, err: 'target' };
    if (pid === 'trial' && h && (h.child && h.age < 8)) return { ok: false, err: 'child' };
  }
  const tgtH = h || (s && s.state === 'alive' ? hById(s.hid) : null);
  const p = successProb(pid, h || tgtH);
  const outcome = rollOutcome(p);
  const pk0 = h ? ((prayerOf(h) || {}).kind || '') : '';
  G.faith -= cost; G.hist.push({ p: pid, t: G.tick }); G.stats.casts++;
  const res = { ok: true, outcome, cost, pid, p, tid, name: h ? h.name : s ? s.name : null, dir }; const bal0 = G.balance; G._gain = 0; G._pk = '';
  if (pid === 'oracle') doOracle(h, outcome, dir || 'kind', res);
  else if (pid === 'grace') doGrace(h, outcome, res);
  else if (pid === 'trial') doTrial(h, outcome, res);
  else if (pid === 'soul') doSoul(h, s, outcome, dir || 'good', res);
  else doForce(outcome, dir || 'light', res);
  if (pid === 'oracle') G.tut.oracle = true;
  if (pid === 'soul') res.dir = dir || 'good'; if (pid === 'force') res.dir = dir || 'light';
  res.gain = G._gain || 0; res.pk = G._pk || ''; res.bal = G.balance - bal0; G._gain = 0; G._pk = '';
  G.stats.lastCast = res;
  if (G.fxOn) { G.fx.push({ t: 'divine', x: h ? h.x : tgtH ? tgtH.x : PLAZA.x, y: h ? h.y : tgtH ? tgtH.y : PLAZA.y, pid, out: outcome }); }
  const rsv = h ? G.fores.some(f => f.state === 'open' && f.hid === h.id && (f.type === 'dream' || f.type === 'wish')) : false;
  if (h && (outcome === 'crit' || outcome === 'success') && pid !== 'force') { G.bigActs.push({ pid, out: outcome, name: h.name, t: G.tick }); G.bigActs.sort((a, b) => (b.out === 'crit') - (a.out === 'crit')); if (G.bigActs.length > 6) G.bigActs.length = 6; }
  logEvent(outcome === 'crit' && pid !== 'force' ? 'miracle' : 'divine_act', h ? [h.id] : tgtH ? [tgtH.id] : [], { pid, out: outcome, dir: dir || '', kind: pk0, resolved: rsv }, ['divine'], outcome === 'crit' ? 0.85 : outcome === 'fail' ? 0.3 : 0.5, outcome === 'crit' ? 1 : 0.6, h || tgtH || PLAZA);
  if (G.onCast) G.onCast(res);
  return res;
}
const OPP = { brave: 'careful', careful: 'brave', kind: 'brave' };
function doOracle(h, out, dir, res) {
  const pr = prayerOf(h);
  if (out === 'fail') { return; }
  const kind = out === 'twist' ? OPP[dir] : dir;
  h.bias = { kind, until: G.tick + (out === 'crit' ? 5 : 3) * TICK_DAY };
  res.biasKind = kind;
  if (pr && PRAYER_ANS[pr.kind].indexOf('oracle') >= 0) {
    if (out !== 'twist') applyPrayerBoon(pr, h, 'oracle', out === 'crit');
    resolvePrayer(pr, out, 'oracle', h);
  }
  if (out === 'crit') { h.needs.honor = Math.min(100, h.needs.honor + 15); soulOf(h).k.good += 0.5; }
  if (out === 'twist') { h.needs.safety = 100; if (rchance(0.4)) { h.gold = Math.max(0, h.gold - 10); res.side = 'lostgold'; } }
}
function applyPrayerBoon(pr, h, pid, strong) {
  const s = soulOf(h);
  switch (pr.kind) {
    case 'hunger': h.needs.hunger = Math.max(0, h.needs.hunger - 70); G.town.food += 3; break;
    case 'sick': case 'fear': h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (strong ? 0.8 : 0.5)); if (pr.kind === 'fear') s.k.attach = Math.max(0, s.k.attach - 1); break;
    case 'love': { let best = null, bv = 0; for (const k in h.rel) { const o = hById(+k); if (o && o.alive && o.sex !== h.sex && !o.spouse && h.rel[k] > bv) { bv = h.rel[k]; best = o; } } if (best) { h.rel[best.id] = Math.min(100, h.rel[best.id] + 25); best.rel[h.id] = Math.min(100, (best.rel[h.id] || 0) + 20); } break; }
    case 'battle': h.buffs.bless = G.tick + 2 * TICK_DAY; break;
    case 'revenge': h.grief = 0; s.k.attach = Math.max(0, s.k.attach - 1); break;
    case 'forgive': h.guilt = 0; h.quarrel = null; s.k.evil = Math.max(0, s.k.evil - 1.5); break;
    case 'birth': if (h.preg) h.preg = Math.min(h.preg, G.tick + 12); break;
  }
}
function doGrace(h, out, res) {
  const pr = prayerOf(h);
  if (out === 'fail') return;
  if (out === 'twist') { h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.15); h.gold += 15; h.bias = { kind: 'brave', until: G.tick + 2 * TICK_DAY }; res.side = 'hubris'; }
  else {
    const f = out === 'crit' ? 1 : 0.55; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * f);
    h.buffs.grace = G.tick + (out === 'crit' ? 4 : 2) * TICK_DAY;
    if (out === 'crit') { addExp(h, h.lvl * 22 * 0.35); }
    if (h.alive) { const st = hStats(h); h.maxHp = st.hp; }
  }
  if (pr && PRAYER_ANS[pr.kind].indexOf('grace') >= 0) { if (out !== 'twist') applyPrayerBoon(pr, h, 'grace', out === 'crit'); resolvePrayer(pr, out, 'grace', h); }
}
function doTrial(h, out, res) {
  if (out === 'fail') return;
  const tier = clamp(1 + (yearOf(G.tick) >> 1), 1, 3);
  if (out === 'twist') { G.famine = G.tick + 3 * TICK_DAY; G.balance = clamp(G.balance - 3, -100, 100); res.side = 'famine'; return; }
  const n = out === 'crit' ? 1 : rint(1, 2) + (tier > 1 ? 1 : 0);
  for (let i = 0; i < n; i++) { const m = spawnMonster(out === 'crit' ? Math.min(3, tier + 1) : tier, h, 'wander'); if (m) m.tgt = h.id; }
  G.balance = clamp(G.balance - 2.5, -100, 100); G.dayEvil += 0.2;
  h.buffs.trial = G.tick + 2 * TICK_DAY; soulOf(h).k.deed += 2;
  if (out === 'crit') { h.lvl = Math.min(25, h.lvl + 1); const st = hStats(h); h.maxHp = st.hp; h.hp = h.maxHp; res.side = 'levelup'; }
  h.needs.safety = 100;
}
function doSoul(h, s, out, dir, res) {
  const soul = s || soulOf(h);
  if (out === 'fail') return;
  const f = (soul.fav ? 1.5 : 1);
  if (out === 'twist') { const keys = ['good', 'evil', 'deed', 'attach']; soul.k[rpick(keys)] += 2; res.side = 'random'; return; }
  soul.k[dir] += (out === 'crit' ? 8 : 4) * f; res.kamt = (out === 'crit' ? 8 : 4) * f;
  if (h) { h.guilt = 0; if (dir === 'good') { h.needs.faith = Math.max(0, h.needs.faith - 20); } const pr = prayerOf(h); if (pr && PRAYER_ANS[pr.kind].indexOf('soul') >= 0) { applyPrayerBoon(pr, h, 'soul', out === 'crit'); resolvePrayer(pr, out, 'soul', h); } }
}
function doForce(out, dir, res) {
  if (out === 'fail') return;
  const sg = dir === 'light' ? 1 : -1;
  if (out === 'twist') { G.balance = clamp(G.balance - sg * 6, -100, 100); res.side = 'reverse'; return; }
  const amt = out === 'crit' ? 26 : 16;
  G.balance = clamp(G.balance + sg * amt, -100, 100);
  if (dir === 'light') {
    let n = 0; for (const m of G.monsters) { if (m.alive && !m.boss && m.cad < 0 && m.mode !== 'raid' && n < (out === 'crit' ? 6 : 3) && rchance(0.6)) { m.alive = false; n++; fxAdd({ t: 'poof', x: m.x, y: m.y }); } }
    G.humans.forEach(h => { if (h.alive && canFight(h)) { h.buffs.bless = G.tick + 3 * TICK_DAY; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (out === 'crit' ? 0.5 : 0.25)); } });
    const sc = out === 'crit' ? TUNE.scorch * 1.6 : TUNE.scorch; G.monsters.forEach(m => { if (m.alive && !m.dormant && (m.mode === 'raid' || m.boss)) { m.hp = Math.max(1, m.hp - m.maxHp * sc); fxAdd({ t: 'ring', x: m.x, y: m.y }); } });
    G.stag = Math.max(0, G.stag - 6);
  } else { for (let i = 0; i < 3; i++) spawnMonster(tierForSpawn()); }
}
function toggleFav(sid) {
  const s = G.sidx[sid]; if (!s) return false;
  if (s.fav) { s.fav = false; G.favored = G.favored.filter(i => i !== sid); return true; }
  if (G.favored.length >= 5) return false;
  s.fav = true; G.favored.push(sid); return true;
}
function useEye(h) {
  if (G.eye < 1) return null; G.eye--;
  const s = soulOf(h); const hz = h.age >= 60 ? ((h.age - 60) * 0.002 + 0.0006) * 100 : 0.06;
  return { id: h.id, deathPct: +(hz * 12).toFixed(1), karma: s.k, act: h.act ? h.act.k : 'idle', prayerSoon: h.prayCd <= 30, echo: h.echo, bonds: s.bonds.length, lives: s.lives.length, hint: h.hp < h.maxHp * 0.4 ? 'hurt' : h.grief ? 'grief' : h.love ? 'love' : 'calm' };
}

/* ---------- counsel (顧問) ---------- */
function topAdvs(n) { return G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => advPower(b) - advPower(a)).slice(0, n); }
function counselStatus() {
  const adv = G.humans.filter(h => h.alive && isAdv(h));
  const yrsToAwaken = Math.max(0, (G.awakenTick - G.tick) / TICK_YEAR);
  const o = { balance: Math.round(G.balance), faith: Math.round(G.faith), pop: G.stats.alive || 0, adv: adv.length, avgLv: adv.length ? +(adv.reduce((a, h) => a + h.lvl, 0) / adv.length).toFixed(1) : 0, awakened: G.awakened, toAwaken: +yrsToAwaken.toFixed(1), townHp: Math.round(G.town.hp), food: Math.round(G.town.food), prayers: openPrayers().length, cad: G.cadres.filter(i => G.idx[i] && G.idx[i].alive).length };
  if (G.awakened && G.boss.alive) { const g = topAdvs(8); if (g.length >= 2) o.bossRatio = +bossEstimate(g).ratio.toFixed(2); }
  return o;
}
function counselActions(goal) {
  const out = []; const adv = topAdvs(6);
  const add = (pid, tid, dir, key, extra) => { const h = tid && G.idx[tid] && G.idx[tid].job ? G.idx[tid] : null; out.push(Object.assign({ pid, tid, dir, key, p: +successProb(pid, h).toFixed(2), cost: powerCost(pid) }, extra || {})); };
  if (goal === 'boss') {
    if (G.balance < 25) add('force', 0, 'light', 'c_force_light');
    const w = adv.find(h => h.hp < h.maxHp * 0.8) || adv[0]; if (w) add('grace', w.id, '', 'c_grace_hero', { who: w.name });
    if (adv[1]) add('oracle', adv[1].id, 'brave', 'c_oracle_brave', { who: adv[1].name });
  } else if (goal === 'nurture') {
    const young = G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => a.lvl - b.lvl)[0]; const fav = G.favored.map(i => G.sidx[i]).filter(s => s && s.state === 'alive').map(s => hById(s.hid))[0];
    const t = fav || young; if (t) { add('oracle', t.id, 'brave', 'c_oracle_brave', { who: t.name }); add('trial', t.id, '', 'c_trial', { who: t.name, risk: true }); add('grace', t.id, '', 'c_grace_hero', { who: t.name }); }
  } else if (goal === 'avoid') {
    const hurt = G.humans.filter(h => h.alive && h.hp < h.maxHp * 0.5).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0]; if (hurt) add('grace', hurt.id, '', 'c_grace_heal', { who: hurt.name });
    const pr = openPrayers().sort((a, b) => b.urg - a.urg)[0]; if (pr) { const h = hById(pr.hid); if (h) add(PRAYER_ANS[pr.kind][0], h.id, 'kind', 'c_answer', { who: h.name, pk: pr.kind }); }
    if (G.balance < 0) add('force', 0, 'light', 'c_force_light');
  } else {
    const t = adv[0]; if (t) add('trial', t.id, '', 'c_trial', { who: t.name, risk: true });
    const lovers = G.humans.filter(h => h.alive && h.love)[0]; if (lovers) add('oracle', lovers.id, 'kind', 'c_oracle_love', { who: lovers.name });
    add('force', 0, 'dark', 'c_force_dark');
  }
  return out.slice(0, 3);
}

/* ---------- auto policy ('basic') ---------- */
function policyBasic() {
  if (G.tick % 6 !== 0) return;
  const yr = yearOf(G.tick);
  const bank = G.awakened ? 120 : yr >= 5 ? 100 : 26;
  let n = 0;
  const can = (pid, res) => G.faith >= powerCost(pid) + (res === undefined ? bank : res);
  const bp = G.parties.find(p => p.boss && p.state !== 'done');
  if (bp) {
    const mem = bp.members.map(i => hById(i)).filter(h => h && h.alive).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp);
    const lead = mem[0]; const near = lead && G.boss.alive && mem.some(m => Math.hypot(m.x - G.boss.x, m.y - G.boss.y) < 14);
    if (!near) return;
    if (G.faith >= powerCost('force') && G.tick - (G.lastForceB || 0) >= 12 && (G.forceBCount || 0) < 3 && G.balance < 90) { castPower('force', 0, 'light'); G.lastForceB = G.tick; G.forceBCount = (G.forceBCount || 0) + 1; return; }
    const keep = (G.forceBCount || 0) < 3 ? powerCost('force') : 0;
    for (const m of mem) { if (n >= 2) break; if (G.faith < powerCost('grace') + keep * (m.hp < m.maxHp * 0.35 ? 0 : 1)) continue; if (m.hp < m.maxHp * 0.45 || (!(m.buffs.grace > G.tick) && G.faith >= powerCost('grace') + keep + 10)) { castPower('grace', m.id); n++; } }
    return;
  }
  const bigRaid = G.awakened && G.raidAlive >= 3;
  if (bigRaid && G.tick - (G.lastForce || 0) > 2 * TICK_DAY && G.faith >= powerCost('force') + TUNE.polRes) { castPower('force', 0, 'light'); G.lastForce = G.tick; n++; }
  else if (!G.awakened && G.balance < -5 && can('force', 30) && G.tick - (G.lastForce || 0) > TICK_DAY) { castPower('force', 0, 'light'); G.lastForce = G.tick; n++; }
  else if (G.balance > 60 && can('force', 30) && G.stag > 10) { castPower('force', 0, 'dark'); n++; }
  if (G.awakened && G.raidAlive > 0 && n < 2) { const hurt = G.humans.filter(h => h.alive && canFight(h) && h.hp < h.maxHp * 0.45 && !(h.buffs.grace > G.tick))[0]; if (hurt && G.faith >= powerCost('grace') + TUNE.polRes) { castPower('grace', hurt.id); n++; } }
  const prs = openPrayers().sort((a, b) => b.urg - a.urg);
  for (const pr of prs) {
    if (n >= 2) break; const h = hById(pr.hid); if (!h || !h.alive) continue;
    const opts = PRAYER_ANS[pr.kind].filter(x => can(x) && (x !== 'soul' || G.faith > 80)).sort((a, b) => powerCost(a) - powerCost(b));
    if (!opts.length) continue;
    castPower(opts[0], h.id, pr.kind === 'battle' ? 'brave' : 'kind'); n++;
  }
  if (!G.awakened && n < 1 && G.faith > 70 + 15) { const hurt = G.humans.filter(h => h.alive && isAdv(h) && h.hp < h.maxHp * 0.5 && !h.inside)[0]; if (hurt && rchance(0.3)) { castPower('grace', hurt.id); n++; } }
  if (!G.awakened && yr <= 4 && G.faith > 90 && n < 1 && rchance(0.08)) { const y = G.humans.filter(h => h.alive && isAdv(h) && h.hp > h.maxHp * 0.9).sort((a, b) => a.lvl - b.lvl)[0]; if (y) castPower('trial', y.id); }
}
