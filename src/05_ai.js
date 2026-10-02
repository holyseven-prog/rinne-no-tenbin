/* ================= human AI ================= */
const isAdv = h => h.adv && !h.retired && h.age >= 16 && h.alive;
const SEASON_YIELD = [1.0, 1.25, 1.4, 0.45];
const WALK = 0.55;

function moveAlong(e, sp) {
  let left = sp;
  while (left > 1e-6 && e.path.length) {
    const idx = e.path[0]; const tx = idx % MW, ty = (idx / MW) | 0;
    const dx = tx - e.x, dy = ty - e.y; const d = Math.hypot(dx, dy);
    if (Math.abs(dx) > Math.abs(dy)) e.dir = dx > 0 ? 3 : 2; else if (d > 0.01) e.dir = dy > 0 ? 0 : 1;
    if (d <= left) { e.x = tx; e.y = ty; e.path.shift(); left -= d; }
    else { e.x += dx / d * left; e.y += dy / d * left; left = 0; }
  }
}
function pathTo(e, tx, ty, range) {
  const p = findPath(e.x, e.y, tx, ty, range || 0);
  if (!p) return false; e.path = p; return true;
}

function updateHuman(h) {
  const n = h.needs;
  h.age += AGING / TICK_YEAR;
  const sleeping = h.act && h.act.k === 'sleep' && h.act.st === 1;
  n.hunger = Math.min(100, n.hunger + (sleeping ? 0.18 : 0.38));
  n.energy = clamp(n.energy + (sleeping ? -1.1 : 0.2), 0, 100);
  n.belong = Math.min(100, n.belong + 0.1);
  n.faith = Math.min(100, n.faith + 0.07);
  n.wealth = clamp(75 - h.gold * 0.5, 0, 100);
  n.safety = Math.max(0, n.safety - 0.5);
  if (h.child && h.age >= ADULT_AGE) becomeAdult(h);
  // starvation
  if (h.party && n.hunger >= 80 && G.town.food >= 1) { G.town.food -= 1; n.hunger = Math.max(0, n.hunger - 60); }
  if (n.hunger >= 100) { h.hp -= h.maxHp * 0.004; if (h.hp <= 0) { killHuman(h, 'starve', null); return; } }
  if (h.hp < h.maxHp && !h.tgt) h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (sleeping ? 0.01 : 0.0015));
  if (h.hp <= 0) { killHuman(h, 'battle', null); return; }
  if (h.inside && !(h.act && (h.act.k === 'sleep' || h.act.k === 'hide' || h.act.k === 'rest' || h.act.k === 'eat' || h.act.k === 'shop' || h.act.k === 'work' && h.act.st === 1 && h.act.hid))) h.inside = 0;
  h.prayCd--; h.healCd--;
  // combat / threat handling
  if (!h.inside) { if (combatStep(h)) return; }
  if (G.townAlert > 0 && (G.tick + h.id) % 3 === 0 && !h.party && !(h.flee > G.tick) && canFight(h) && h.needs.hunger < 85 && h.needs.energy < 90 && h.hp > h.maxHp * 0.5 && !h.tgt && !(h.act && ['muster', 'hide', 'rest'].indexOf(h.act.k) >= 0)) { cancelAct(h); startAct(h, 'muster'); }
  // act
  if (h.act) { if (h.act.k === 'quest') partyStep(h); else stepAct(h); return; }
  if (h.path.length) { moveAlong(h, WALK * hStats(h).spd); return; }
  if (--h.thinkCd <= 0) { think(h); h.thinkCd = 2; }
}

function becomeAdult(h) {
  h.child = false; const s = soulOf(h);
  const job = pickJobForSoul(s);
  h.job = job; h.adv = !!JOBS[job].adv && !(job === 'priest' && rchance(0.35)); h.lvl = Math.max(1, h.lvl);
  const st = hStats(h); h.maxHp = st.hp; h.hp = st.hp; h.look.cloth = JOB_CLOTH[job];
  logEvent('coming_of_age', [h.id], { job }, [], 0.3, 0.5);
  if (h.echo) logEvent('soul_echo', [h.id], { prev: h.echo.name, job: h.echo.job }, ['soul'], 0.7, 0.9, h);
}
function pickJobForSoul(s) {
  const k = s ? s.k : emptyKarma(); const advN = G.humans.filter(x => x.alive && isAdv(x)).length;
  const w = {
    swordsman: 1 + k.deed * 0.12 + (advN < 12 ? 2.4 : 0), mage: 0.7 + k.deed * 0.08 + (advN < 12 ? 1.4 : 0), priest: 0.7 + k.good * 0.14, thief: 0.4 + k.evil * 0.16,
    farmer: 2.2, merchant: 1.1, smith: 0.9, herbalist: 0.9,
  };
  if (s && s.lastJob && s.lastJob !== 'historian' && k.attach >= 3) w[s.lastJob] = (w[s.lastJob] || 1) * (1 + k.attach * 0.25);
  const tot = Object.values(w).reduce((a, b) => a + b, 0); let r = rnd() * tot;
  for (const j in w) { r -= w[j]; if (r <= 0) return j; }
  return 'farmer';
}

/* ---------- decision ---------- */
function openQuests() { return G.quests.filter(q => q.state === 'open'); }
function think(h) {
  if (h.job === 'historian' && h.age >= ADULT_AGE) { thinkHistorian(h); return; }
  const n = h.needs, hr = hourOf(G.tick), night = hr >= 22 || hr < 5, day = hr >= 6 && hr < 18;
  const hpf = h.hp / h.maxHp; const has = x => h.traits.includes(x);
  const b = h.bias && h.bias.until > G.tick ? h.bias.kind : null;
  const C = [];
  const add = (k, s, why) => { if (s > 0.03) C.push({ k, s: s + rnd() * 0.05, why }); };
  add('sleep', n.energy / 100 * (night ? 1.9 : 0.3) + (n.energy > 85 ? 0.5 : 0), [['sleep', n.energy / 100]]);
  if (G.town.food > 0 || h.job === 'farmer') add('eat', n.hunger >= 30 ? n.hunger / 100 * 1.4 + (n.hunger > 65 ? 0.5 : 0) : 0, [['hunger', n.hunger / 100]]);
  const adult = h.age >= ADULT_AGE;
  const adv = isAdv(h);
  if (!adult) add('learn', day ? 0.55 : 0.05, [['learn', 0.5]]);
  else if (adv) {
    if (hpf > 0.65 && !night) {
      const qs = openQuests().length;
      const bossQ = openQuests().some(q => q.type === 'boss');
      if (qs > 0) add('quest', (0.6 + n.honor / 220 + n.wealth / 280 + (has('brave') ? 0.2 : 0) + (has('ambitious') ? 0.12 : 0) - (has('timid') ? 0.25 : 0) + (b === 'brave' ? 0.4 : 0) - (b === 'careful' ? 0.45 : 0) + (bossQ ? 0.3 : 0)), [['honor', n.honor / 100], ['wealth', n.wealth / 100], ['brave', has('brave') ? 0.3 : 0]]);
      
    }
    add('train', day ? 0.3 : 0.05, [['honor', n.honor / 100]]);
    if (h.gold >= 12 && h.pots < 2 && G.town.potions >= 1) add('shopP', h.pots < 1 ? 1.35 : 0.5 + (hpf < 0.7 ? 0.2 : 0), [['wealth', 0.3]]);
    if (h.gear < 6 && h.gold >= gearCost(h) && G.town.gearStock >= 1) add('shopG', 0.55, [['honor', 0.4]]);
  } else add('work', (day ? 0.62 + n.wealth / 400 : 0.04) + (b === 'careful' ? 0.1 : 0), [['wealth', n.wealth / 100]]);
  add('pray', n.faith / 100 * 0.6 + (h.job === 'priest' ? 0.25 : 0) + ((hr === 7 || hr === 18) ? 0.25 : 0) + (b === 'kind' ? 0.3 : 0), [['faith', n.faith / 100]]);
  add('social', (n.belong / 100) * (hr >= 17 && hr < 23 ? 1.25 : 0.55) + (b === 'kind' ? 0.3 : 0), [['belong', n.belong / 100]]);
  add('rest', hpf < 0.75 ? (1 - hpf) * 1.6 + (b === 'careful' ? 0.3 : 0) : 0, [['hp', 1 - hpf]]);
  if (!C.length) { h.thinkCd = 3; return; }
  C.sort((a, c) => c.s - a.s);
  h.motive = C.slice(0, 3).map(c => [c.k, +c.s.toFixed(2)].concat([c.why[0][0], +c.why[0][1].toFixed(2)]));
  const k = C[0].k;
  if (k === 'quest') { if (!tryFormParty(h)) { startAct(h, 'train'); } return; }
  startAct(h, k);
  maybePray(h);
}
function gearCost(h) { return Math.round(30 * Math.pow(1.7, h.gear)); }

function thinkHistorian(h) {
  const hr = hourOf(G.tick); const n = h.needs;
  if (n.energy > 60 && (hr >= 22 || hr < 5)) { startAct(h, 'sleep'); return; }
  if (n.hunger > 55 && G.town.food > 0) { startAct(h, 'eat'); return; }
  startAct(h, 'work');
}

/* ---------- acts ---------- */
function bldDoor(b) { return { tx: b.door.x, ty: b.door.y, range: 0, bld: b.id }; }
function pickBld(kind) { const l = bldOfKind(kind); return l.length ? l[0] : null; }
function actTarget(h, k) {
  const hr = hourOf(G.tick);
  switch (k) {
    case 'sleep': case 'hide_home': { const b = W.blds[h.home] || pickBld('house'); return bldDoor(b); }
    case 'eat': { if (h.gold >= 3 && h.needs.belong > 40 && !h.child && hr >= 11) return bldDoor(pickBld('tavern')); return bldDoor(W.blds[h.home] || pickBld('house')); }
    case 'rest': { if (h.gold >= 8 && h.hp < h.maxHp * 0.5 && !isHidden(h)) return bldDoor(pickBld('inn')); return bldDoor(W.blds[h.home] || pickBld('house')); }
    case 'pray': return bldDoor(pickBld('church'));
    case 'shopP': return bldDoor(pickBld('apothecary'));
    case 'shopG': return bldDoor(pickBld('smithy'));
    case 'social': { if (hr >= 17 && hr < 24 && h.gold >= 3) return bldDoor(pickBld('tavern')); const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'muster': { const p = randWalkableIn(34, 21, 38, 25); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'train': { const p = randWalkableIn(18, 24, 26, 25); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'learn': { if (rchance(0.5)) return bldDoor(pickBld('church')); const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'hunt': { const p = randWalkableIn(FIELD_X0 + 1, 8, FIELD_X0 + 3 + Math.min(3, yearOf(G.tick) >> 1), 36); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'work': return workTarget(h);
  }
  return null;
}
function isHidden(h) { return !!h.inside; }
function workTarget(h) {
  switch (h.job) {
    case 'farmer': { const f = rpick(W.fields); return { tx: f.x, ty: f.y, range: 0 }; }
    case 'merchant': return bldDoor(pickBld('shop'));
    case 'smith': return bldDoor(pickBld('smithy'));
    case 'herbalist': return bldDoor(pickBld('apothecary'));
    case 'priest': return bldDoor(pickBld('church'));
    case 'historian': { const p = G.lastEvPos || PLAZA; const q = nearestWalkable(clamp(p.x + rint(-2, 2), 17, 42), clamp(p.y + rint(-2, 2), 6, 36)); return { tx: q.x, ty: q.y, range: 0 }; }
    default: { const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
  }
}
const ACT_DUR = { muster: 40, sleep: 70, eat: 2, rest: 14, pray: 4, shopP: 2, shopG: 2, social: 6, train: 10, learn: 12, hunt: 22, work: 12, hide: 8, hide_home: 8 };
function startAct(h, k) {
  if (k === 'wander') { h.thinkCd = 3; return false; }
  const tg = actTarget(h, k);
  if (!tg) { h.thinkCd = 3; return false; }
  const a = { k, tx: tg.tx, ty: tg.ty, range: tg.range, bld: tg.bld === undefined ? -1 : tg.bld, st: 0, n: 0, dur: ACT_DUR[k] || 6, t0: G.tick, hid: false };
  if (k === 'sleep') a.dur = Math.max(18, Math.round(h.needs.energy * 0.75)) + rint(0, 8);
  if (k === 'rest') a.dur = clamp(Math.round((1 - h.hp / h.maxHp) * 30), 6, 28);
  if (k === 'work') a.dur = 8 + rint(0, 8);
  const p = findPath(h.x, h.y, a.tx, a.ty, a.range);
  if (!p) { h.thinkCd = 4; return false; }
  h.path = p; h.act = a; h.state = k; return true;
}
function cancelAct(h) { h.act = null; h.path = []; h.state = 'idle'; if (h.inside) h.inside = 0; }

function stepAct(h) {
  const a = h.act;
  if (a.st === 0) {
    if (h.path.length) { moveAlong(h, WALK * hStats(h).spd); if (a.k === 'work' || true) { if (G.tick - a.t0 > 150) cancelAct(h); } }
    if (!h.path.length) {
      if (Math.hypot(h.x - a.tx, h.y - a.ty) <= a.range + 0.6) { a.st = 1; a.n = 0; onActStart(h, a); }
      else { const p = findPath(h.x, h.y, a.tx, a.ty, a.range); if (p && p.length) h.path = p; else cancelAct(h); }
    }
    return;
  }
  onActTick(h, a);
  if (!h.act) return;
  a.n++;
  if (a.n >= a.dur) finishAct(h);
}
function onActStart(h, a) {
  if (a.bld >= 0 && W.blds[a.bld] && W.blds[a.bld].kind !== 'castle' && ['sleep', 'eat', 'rest', 'hide', 'hide_home', 'shopP', 'shopG', 'pray'].indexOf(a.k) >= 0) h.inside = a.bld + 1;
  if (a.k === 'eat') {
    if (G.town.food >= 1 || h.job === 'farmer') {
      if (G.town.food >= 1) G.town.food -= 1;
      h.needs.hunger = Math.max(0, h.needs.hunger - 70); h.lastEat = G.tick;
      if (a.bld >= 0 && W.blds[a.bld].kind === 'tavern') { h.gold -= 2; G.town.gold += 2; h.needs.belong = Math.max(0, h.needs.belong - 8); }
    }
  }
  if (a.k === 'shopP') { if (h.gold >= 12 && G.town.potions >= 1) { h.gold -= 12; G.town.gold += 12; G.town.potions -= 1; h.pots = Math.min(3, h.pots + 1); } }
  if (a.k === 'shopG') { const c = gearCost(h); if (h.gold >= c && G.town.gearStock >= 1 && h.gear < 6) { h.gold -= c; G.town.gold += c; G.town.gearStock -= 1; h.gear++; const st = hStats(h); h.maxHp = st.hp; if (h.gear === 3 || h.gear === 5) logEvent('gear', [h.id], { g: h.gear }, [], 0.35, 0.5, h); } }
  if (a.k === 'pray') { h.needs.faith = Math.max(0, h.needs.faith - 45); G.faith = Math.min(G.faithMax, G.faith + (h.job === 'priest' ? 0.45 : 0.18)); }
  if (a.k === 'social') socialInteract(h);
}
function onActTick(h, a) {
  const J = h.job;
  switch (a.k) {
    case 'sleep': if (h.needs.energy <= 3 && hourOf(G.tick) >= 5 && hourOf(G.tick) < 22) finishAct(h); break;
    case 'rest': { const heal = h.maxHp * (a.bld >= 0 && W.blds[a.bld].kind === 'inn' ? 0.07 : 0.045); h.hp = Math.min(h.maxHp, h.hp + heal); if (h.hp >= h.maxHp * 0.97) finishAct(h); if (a.n === 0 && a.bld >= 0 && W.blds[a.bld].kind === 'inn' && h.gold >= 6) { h.gold -= 6; G.town.gold += 6; } break; }
    case 'work': {
      h.gold += 0.06; if (h.age >= 60) h.gold -= 0.02;
      if (J === 'farmer') G.town.food += 0.42 * SEASON_YIELD[seasonOf(G.tick)] * (G.famine > G.tick ? 0.2 : 1) * (G.balance < -40 ? 0.85 : 1);
      else if (J === 'merchant') { h.gold += 0.1; G.town.gold += 0.02; }
      else if (J === 'smith') G.town.gearStock += 0.032;
      else if (J === 'herbalist') G.town.potions += 0.045;
      else if (J === 'priest') { G.faith = Math.min(G.faithMax, G.faith + 0.02); h.needs.faith = Math.max(0, h.needs.faith - 1); }
      else if (J === 'historian') { }
      break;
    }
    case 'train': addExp(h, 0.18 * (G.balance >= 70 ? 0.5 : 1)); h.needs.honor = Math.min(100, h.needs.honor + 0.3); break;
    case 'learn': { h.needs.belong = Math.max(0, h.needs.belong - 0.5); break; }
    case 'hide': case 'hide_home': { if (a.n >= a.dur - 1 && threatNear(h, 6)) a.dur += 3; break; }
    case 'hunt': { if (a.n >= a.dur - 1 && h.hp > h.maxHp * 0.6 && rchance(0.5)) a.dur += 3; break; }
  }
}
function finishAct(h) {
  const a = h.act; h.act = null; h.state = 'idle'; h.inside = 0;
  if (a && a.k === 'sleep') { h.needs.energy = Math.max(0, h.needs.energy - 20); }
  if (a && a.k === 'social') { h.needs.belong = Math.max(0, h.needs.belong - 40); }
  if (a && a.k === 'hunt') { h.needs.honor = Math.max(0, h.needs.honor - 5); }
}
function threatNear(h, r) { return G.monsters.some(m => m.alive && !m.dormant && Math.hypot(m.x - h.x, m.y - h.y) <= r); }

/* ---------- social ---------- */
function socialInteract(h) {
  let best = null, bd = 99;
  for (const o of G.humans) { if (o === h || !o.alive || o.inside) continue; const d = Math.hypot(o.x - h.x, o.y - h.y); if (d < bd && d <= 5) { bd = d; best = o; } }
  if (!best) { const c = G.humans.filter(o => o !== h && o.alive && !o.inside && o.age >= 10 && Math.abs(o.x - h.x) < 12); if (c.length) best = rpick(c); }
  if (!best) return;
  const comp = (h.traits.includes('kind') ? 1.3 : 1) * (best.traits.includes('kind') ? 1.2 : 1) * (h.traits.includes('stubborn') && best.traits.includes('stubborn') ? 0.5 : 1);
  const d = rrange(1.5, 5) * comp; const a0 = h.rel[best.id] || 15;
  h.rel[best.id] = clamp(a0 + d, -50, 100); best.rel[h.id] = clamp((best.rel[h.id] || 15) + d * 0.8, -50, 100);
  h.needs.belong = Math.max(0, h.needs.belong - 20); best.needs.belong = Math.max(0, best.needs.belong - 15);
  const aff = h.rel[best.id];
  const sameGen = Math.abs(h.age - best.age) <= 15 && h.age >= 16 && best.age >= 16;
  // quarrel
  if (a0 > 20 && rchance(0.012 + (h.traits.includes('stubborn') ? 0.01 : 0) + (best.traits.includes('stubborn') ? 0.01 : 0)) && !h.quarrel) {
    h.quarrel = { who: best.id, t: G.tick }; h.rel[best.id] -= 30; best.rel[h.id] -= 30;
    logEvent('quarrel', [h.id, best.id], {}, ['relation'], 0.45, 0.6, h);
    return;
  }
  if (h.quarrel && h.quarrel.who === best.id && G.tick - h.quarrel.t > TICK_DAY * 0.7) { h.quarrel = null; h.rel[best.id] += 35; best.rel[h.id] += 35; logEvent('reconcile', [h.id, best.id], {}, ['relation'], 0.5, 0.7, h); return; }
  if (!h.spouse && !best.spouse && sameGen && aff >= 52 && aff < 62 && !h.love && !best.love && h.sex !== best.sex && !h.noticed && rchance(0.25)) { h.noticed = G.tick; logEvent('love_notice', [h.id, best.id], {}, ['relation'], 0.5, 0.6, h); return; }
  if (!h.spouse && !best.spouse && sameGen && aff >= 62 && !h.love && !best.love && h.sex !== best.sex) {
    h.love = best.id; best.love = h.id; logEvent('love_start', [h.id, best.id], {}, ['relation'], 0.55, 0.8, h); G.dayGood += 0.5; return;
  }
  if (h.love === best.id && !h.spouse && !best.spouse && aff >= 85) {
    h.spouse = best.id; best.spouse = h.id; h.love = best.love = 0; if (best.home !== h.home) { const mv = h.sex === 'F' ? h : best, to = h.sex === 'F' ? best : h; mv.home = to.home; }
    logEvent('marriage', [h.id, best.id], {}, ['relation', 'joy'], 0.7, 0.9, h); G.dayGood += 1;
  }
  // destined reunion (soul bonds)
  const s1 = soulOf(h), s2 = soulOf(best);
  if (s1 && s2 && !h.child && !best.child) {
    const key = s1.id < s2.id ? s1.id + '_' + s2.id : s2.id + '_' + s1.id;
    if (!G.reunions[key] && (s1.bonds.some(b => b.sid === s2.id) || s2.bonds.some(b => b.sid === s1.id))) {
      G.reunions[key] = 1; h.rel[best.id] = Math.max(h.rel[best.id], 70); best.rel[h.id] = Math.max(best.rel[h.id], 70);
      logEvent('destined_reunion', [h.id, best.id], { kind: (s1.bonds.find(b => b.sid === s2.id) || s2.bonds.find(b => b.sid === s1.id) || {}).kind }, ['soul'], 0.9, 1.0, h);
    }
  }
}

/* ---------- exp ---------- */
function addExp(h, v) {
  if (!v || h.lvl >= 25) return;
  h.exp += v;
  let need = 30 * h.lvl;
  while (h.exp >= need && h.lvl < 25) {
    h.exp -= need; h.lvl++; need = 30 * h.lvl;
    const st = hStats(h); const frac = h.hp / h.maxHp; h.maxHp = st.hp; h.hp = Math.min(h.maxHp, h.maxHp * Math.max(frac, 0.7) + h.maxHp * 0.2);
    if (G.fxOn) G.fx.push({ t: 'lvl', x: h.x, y: h.y });
    if (h.master && h.lvl === 8) { const ms = hById(h.master); if (ms && ms.alive) logEvent('mentor_parting', [ms.id, h.id], {}, ['relation'], 0.6, 0.8, h); h.master = 0; }
    if (h.lvl === 5 || h.lvl === 10 || h.lvl === 15) logEvent('promotion', [h.id], { lvl: h.lvl }, ['growth'], 0.5, 0.7, h);
  }
}

/* ---------- prayers ---------- */
function openPrayers() { return G.prayers.filter(p => p.state === 'open'); }
function hasPrayer(h) { return G.prayers.some(p => p.state === 'open' && p.hid === h.id); }
function addPrayer(h, kind, urg) {
  if (h.prayCd > 0 || hasPrayer(h) || h.inside && false) return null;
  if (openPrayers().length >= 8) return null;
  const p = { id: G.nid++, hid: h.id, kind, urg: clamp(urg, 0.1, 1), t: G.tick, exp: G.tick + 2 * TICK_DAY, state: 'open', v: rint(0, 1) };
  G.prayers.push(p); h.prayCd = rint(300, 620); G.stats.prayers++;
  logEvent('prayer', [h.id], { kind }, ['prayer'], 0.3 + urg * 0.3, 0.5, h);
  if (G.fxOn) G.fx.push({ t: 'pray', x: h.x, y: h.y });
  if (G.onPrayer) G.onPrayer(p);
  return p;
}
function maybePray(h) {
  if (h.prayCd > 0 || h.child && h.age < 6) return;
  const n = h.needs, hpf = h.hp / h.maxHp;
  const fp = h.needs.faith < 60 ? 1 : 0.6;
  if (n.hunger >= 88 && rchance(0.5)) return addPrayer(h, 'hunger', 0.9);
  if (hpf < 0.4 && !h.tgt && rchance(0.35)) return addPrayer(h, 'sick', 0.8);
  if (h.grief > 0 && rchance(0.08)) { return addPrayer(h, 'revenge', 0.6); }
  if (h.quarrel && rchance(0.05)) return addPrayer(h, 'forgive', 0.5);
  if (h.guilt && rchance(0.1)) return addPrayer(h, 'forgive', 0.6);
  if (h.preg && rchance(0.08)) return addPrayer(h, 'birth', 0.7);
  if (h.age > 60 && rchance(0.012)) return addPrayer(h, 'fear', 0.6);
  if (h.love && rchance(0.01)) return addPrayer(h, 'love', 0.5);
  if (isAdv(h) && h.party && hpf < 0.7 && rchance(0.04)) return addPrayer(h, 'battle', 0.7);
  if (rchance(0.0022 * fp)) return addPrayer(h, rpick(['love', 'fear', 'forgive', 'battle']), 0.35);
}
function expirePrayers() {
  for (const p of G.prayers) {
    if (p.state !== 'open') continue;
    if (G.tick >= p.exp) {
      p.state = 'expired'; const h = hById(p.hid);
      G.faith = Math.max(0, G.faith - TUNE.pen * 0.6 * (0.5 + p.urg));
      if (h && h.alive) { h.needs.faith = Math.min(100, h.needs.faith + 10); h.disappoint = (h.disappoint || 0) + 1; }
      if (h && h.alive) logEvent('prayer_expired', [h.id], { kind: p.kind }, [], 0.4, 0.4, h);
      if (G.onPrayerEnd) G.onPrayerEnd(p);
    } else { const h = hById(p.hid); if (!h || !h.alive) { p.state = 'void'; } }
  }
  if (G.prayers.length > 120) G.prayers = G.prayers.filter(p => p.state === 'open' || G.tick - p.t < TICK_YEAR);
}
