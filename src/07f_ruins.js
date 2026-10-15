/* ================= V4.1 fix C: defeat damage that matters — ruins by grade, repair time 2/4/6 days (food + wood), lost functions,
   graves for the fallen, villagers clearing rubble, "重建の祝福" (grace, faith 15) finishes one building at once ================= */
const REPAIR_DAYS = { pyrrhic: 2, loss: 4, rout: 6 };
const REPAIR_COST = { food: 3, wood: 4 }; // per building per day
function ruinBuilding(b, grade) {
  G.ruins[b.id] = 100; G.ruinInfo = G.ruinInfo || {}; G.ruinInfo[b.id] = { t0: G.tick, grade: grade, days: REPAIR_DAYS[grade] || 4, burn: G.tick + TICK_DAY };
  G.humans.forEach(h => { if (h.alive && (h.inside === b.id + 1 || (h.act && h.act.bld === b.id))) { h.inside = 0; h.act = null; h.path = []; h.thinkCd = 0; } }); /* nobody stays inside a ruin */ G.ruinWorkUntil = G.tick + TICK_DAY; G.scorchUntil = Math.max(G.scorchUntil || 0, G.tick + (REPAIR_DAYS[grade] || 4) * TICK_DAY);
}
function isRuined(kind) { const b = W.blds.find(x => x.kind === kind); return !!(b && G.ruins && G.ruins[b.id]); }
function bldRuined(b) { return !!(b && G.ruins && G.ruins[b.id]); }
function repairPct(id) { return Math.round(100 - (G.ruins[id] || 0)); }
function repairDaily() { // once a day: pay food + wood for every ruin; a ruin that cannot be paid for slips by a day
  G.town.wood = Math.min(240, (G.town.wood === undefined ? 80 : G.town.wood) + 4 + G.humans.filter(h => h.alive && h.age >= ADULT_AGE).length * 0.2);
  let stalled = false;
  for (const id in G.ruins) { const I = (G.ruinInfo = G.ruinInfo || {})[id] || (G.ruinInfo[id] = { days: 4, t0: G.tick, burn: 0 }); I.stall = I.stall || 0;
    if (G.town.food < REPAIR_COST.food && (G.town.gold || 0) >= REPAIR_COST.food * 8) { G.town.gold -= REPAIR_COST.food * 8; G.town.food += REPAIR_COST.food; } /* short of food: the crew buys it */
    if (G.town.food >= REPAIR_COST.food && G.town.wood >= REPAIR_COST.wood) { G.town.food -= REPAIR_COST.food; G.town.wood -= REPAIR_COST.wood; }
    else { stalled = true; I.stall += TICK_DAY; } }
  G.repairStalled = stalled ? G.tick : 0;
}
function repairTick() { // every tick: progress for the label, finish exactly after 2 / 4 / 6 days of work
  for (const id in G.ruins) { const I = (G.ruinInfo || {})[id]; if (!I) continue; const span = I.days * TICK_DAY; const done = clamp((G.tick - I.t0 - (I.stall || 0)) / span, 0, 1); G.ruins[id] = Math.max(0.01, 100 * (1 - done)); if (done >= 1) finishRepair(+id, false); } }
const _assaultTickR = assaultTick; assaultTick = function () { _assaultTickR.apply(this, arguments); if (G.assaults && G.ruins) repairTick(); };
function finishRepair(id, blessed) { const I = (G.ruinInfo || {})[id]; delete G.ruins[id]; if (I) { (G.repairLog = G.repairLog || []).push({ grade: I.grade, days: (G.tick - I.t0) / TICK_DAY, blessed: !!blessed }); delete G.ruinInfo[id]; } logEvent('rebuilt', [], { b: id, blessed: !!blessed }, ['assault'], 0.3, 0.4, PLAZA); }
function rebuildBless(id) { if (!G.ruins || !G.ruins[id] || G.faith < 15) return false; G.faith -= 15; faithLog('rebuild', -15); finishRepair(+id, true); G.stats.casts = (G.stats.casts || 0) + 1; return true; }
/* the fallen get a grave in the churchyard (west of the church) */
const GRAVE_SLOTS = []; for (let y = 8; y <= 12; y += 2) for (let x = 19; x <= 23; x += 2) GRAVE_SLOTS.push([x, y]);
function addGrave(h) { G.graves = G.graves || []; const used = G.graves.length; const s = GRAVE_SLOTS[used % GRAVE_SLOTS.length]; G.graves.push({ x: s[0] + (used >= GRAVE_SLOTS.length ? 1 : 0), y: s[1], id: h.id, name: h.name, t: G.tick }); if (G.graves.length > 24) G.graves.shift(); }
/* AI: homeless sleep at the church (or inn), the ruined inn / church / shop do not serve; for a day after a defeat people clear rubble */
const _actTarget0 = actTarget; actTarget = function (h, k) {
  const alt = kind => { const b = pickBld(kind); return b && !bldRuined(b) ? b : null; };
  if ((k === 'sleep' || k === 'hide_home') && G.ruins && W.blds[h.home] && bldRuined(W.blds[h.home])) { const b = alt('church') || alt('inn'); if (b) return bldDoor(b); const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
  if (k === 'rest' && isRuined('inn')) { const b = W.blds[h.home]; return bldDoor(b && !bldRuined(b) ? b : (alt('church') || pickBld('house'))); }
  if (k === 'shopG' && isRuined(h.gear % 2 ? 'armor' : 'shop')) return null;
  if (k === 'repair') { const ids = Object.keys(G.ruins || {}); if (!ids.length) return null; const b = W.blds[ids[(h.id + G.tick) % ids.length]]; const p = randWalkableIn(b.x - 1, b.y + b.h, b.x + b.w, b.y + b.h + 1); return { tx: p.x, ty: p.y, range: 0 }; }
  return _actTarget0(h, k);
};
ACT_DUR.repair = 14;
const _updRuin = updateHuman; updateHuman = function (h) {
  if (G.ruinWorkUntil > G.tick && !h.act && !h.party && h.alive && h.age >= ADULT_AGE && !isAdv(h) && h.needs.energy < 75 && h.needs.hunger < 70 && (G.tick + h.id) % 5 === 0 && hourOf(G.tick) >= 6 && hourOf(G.tick) < 20 && rchance(0.5)) startAct(h, 'repair');
  return _updRuin(h);
};
