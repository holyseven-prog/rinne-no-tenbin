/* ================= state / entities ================= */
const AGING = 4; // human years per game year
const ADULT_AGE = 14, ELDER_AGE = 55;
const POP_MAX = 80;
const HAIR_N = 8, CLOTH_N = 8;

function emptyKarma() { return { good: 0, evil: 0, deed: 0, attach: 0 }; }
function mkSoul(h) {
  const s = { id: G.nid++, k: emptyKarma(), lives: [], state: 'alive', hid: h ? h.id : 0, wait: 0, fav: false, bonds: [], echo: null, lastJob: h ? h.job : null, name: h ? h.name : null };
  G.souls.push(s); if (G.sidx) G.sidx[s.id] = s; return s;
}
function soulOf(h) { return G.sidx[h.soul]; }
function hById(id) { return G.idx[id]; }

function newGame(o) {
  o = o || {};
  if (o.lang) LANG = o.lang;
  const seed = (o.seed === undefined ? (Date.now() & 0xffffff) : o.seed) >>> 0;
  const god = GODS.find(g => g.id === (o.god || 'mercy')) || GODS[0];
  G = {
    ver: 1, seed, god: god.id, gen: o.gen || 1, tick: START_TICK, rng: new RNG(seed), nid: 1,
    humans: [], monsters: [], souls: [], quests: [], parties: [], prayers: [], events: [], chapters: [], log: [],
    faith: god.faith0, faithMax: 150, balance: 20, balAcc: 0, balYear: [], hist: [],
    eye: 3, eyeT: 0, town: { food: 140, gold: 200, hp: 100, potions: 8, gearStock: 4 },
    boss: null, cadres: [], awakenTick: BOSS_BASE_TICK, awakened: false, bossFight: false, lastBossTry: -99999,
    ending: null, stats: { kills: 0, deaths: 0, births: 0, prayers: 0, answered: 0, casts: 0, quests: 0, raids: 0 },
    flags: {}, tut: { prayer: false, oracle: false, chron: false, counsel: false, skipped: false }, favored: [], policy: 'none',
    stag: 0, faithZero: 0, raidDay: 0, dayKills: 0, dayGood: 0, dayEvil: 0, lastNotable: 0, spot: [], track: [],
    idx: {}, sidx: {}, qidx: {}, pidx: {}, killBal: 0, oracleNext: 0, nextQuestDay: 0, bossTries: 0, townAlert: 0, wave: 0, chapNo: 0, lastChapTick: 0, arcs: [], fores: [], notes: [], used: {}, bigActs: [], lostFores: 0, lastScene: {}, recapDone: false, reunions: {}, nameUse: {}, userScheduled: {},
  };
  initWorldState();
  rebuildIdx();
  G.main = G.flags.kyle || 0; G.mainLocked = false;
  chronPrologue();
  return G;
}
function rebuildIdx() {
  G.idx = {}; G.sidx = {};
  G.humans.forEach(h => G.idx[h.id] = h);
  G.monsters.forEach(m => G.idx[m.id] = m);
  G.souls.forEach(s => G.sidx[s.id] = s);
  G.qidx = {}; G.quests.forEach(q => G.qidx[q.id] = q);
  G.pidx = {}; G.parties.forEach(p => G.pidx[p.id] = p);
}

function pickName(sex) {
  const pool = sex === 'M' ? NAMES_M : NAMES_F;
  for (let i = 0; i < 12; i++) { const n = rpick(pool); if (!G.humans.some(h => h.alive && h.name[0] === n[0])) return n; }
  return rpick(pool);
}
function lvlMul(l) { return 1 + 0.14 * (l - 1); }
function mkHuman(o) {
  const J = JOBS[o.job];
  const sex = o.sex || (rchance(0.5) ? 'M' : 'F');
  const age = o.age === undefined ? rint(18, 40) : o.age;
  const lvl = o.lvl || 1;
  const tr = []; const t1 = rpick(TRAIT_KEYS); tr.push(t1); if (rchance(0.5)) { const t2 = rpick(TRAIT_KEYS); if (t2 !== t1) tr.push(t2); }
  const h = {
    id: G.nid++, name: o.name || pickName(sex), sex, age, job: o.job, lvl, exp: 0, hp: 1, maxHp: 1, gold: o.gold !== undefined ? o.gold : rint(10, 60),
    needs: { hunger: rrange(5, 40), energy: rrange(0, 30), safety: 5, wealth: rrange(10, 50), belong: rrange(10, 60), honor: rrange(0, 50), faith: rrange(10, 50) },
    traits: o.traits || tr, home: o.home === undefined ? -1 : o.home, rel: {}, soul: 0, alive: true,
    x: 0, y: 0, px: 0, py: 0, path: [], act: null, state: 'idle', tgt: 0, cd: 0, inside: 0, gear: o.gear || 0, pots: 0, buffs: {}, bias: null,
    spouse: 0, master: 0, party: 0, kills: 0, thinkCd: rint(0, 2), prayCd: rint(30, 120), fame: 0, adv: o.adv !== undefined ? o.adv : !!J.adv, retired: !!o.retired,
    look: o.look || { hair: rint(0, HAIR_N - 1), style: rint(0, 3), skin: rint(0, 2), cloth: rint(0, CLOTH_N - 1), acc: rint(0, 2) },
    motive: [], drama: { desire: '', fear: '', secret: '', lie: '' }, born: G.tick, lastEat: 0, echo: o.echo || null, child: age < ADULT_AGE, hideT: 0, healCd: 0, cause: '', lastPrayKind: '', grief: 0, ageAcc: 0,
  };
  const st = hStats(h); h.maxHp = st.hp; h.hp = o.hpFrac ? st.hp * o.hpFrac : st.hp;
  const s = o.soul ? G.sidx[o.soul] : null;
  if (s) { h.soul = s.id; s.hid = h.id; s.state = 'alive'; } else { const ns = mkSoul(h); h.soul = ns.id; }
  return h;
}
function hStats(h) {
  if (h._st && h._sT === G.tick && h._sL === h.lvl && h._sG === h.gear && h._sJ === h.job) return h._st;
  const J = JOBS[h.job]; const m = lvlMul(h.lvl) * (1 + 0.07 * h.gear);
  let ageM = 1; if (h.age < ADULT_AGE) ageM = 0.35 + 0.65 * (h.age / ADULT_AGE); else if (h.age > 58) ageM = Math.max(0.6, 1 - (h.age - 58) * 0.02);
  const b = h.buffs; const bm = (b.grace && b.grace > G.tick ? 1.2 : 1) * (b.bless && b.bless > G.tick ? 1.2 : 1);
  const bd = G.balance >= 50 ? 1.04 : 1;
  const out = { hp: J.hp * lvlMul(h.lvl) * (1 + 0.04 * h.gear) * ageM, atk: J.atk * m * ageM * bm * bd, def: J.def * m * ageM * (b.grace && b.grace > G.tick ? 1.2 : 1) * (b.bless && b.bless > G.tick ? 1.1 : 1), spd: J.spd * (b.haste && b.haste > G.tick ? 1.2 : 1), range: J.range };
  h._st = out; h._sT = G.tick; h._sL = h.lvl; h._sG = h.gear; h._sJ = h.job; return out;
}
function placeAt(e, x, y) { e.x = x; e.y = y; e.px = x; e.py = y; e.path = []; }
function homeDoor(h) { const b = W.blds[h.home]; return b ? b.appr : PLAZA; }

function initWorldState() {
  // souls & humans
  const homes = W.homes.slice();
  const bad = G.rng;
  const R0 = [
    ['swordsman', 58, 12, { nm: ['ガルド', '加爾德'], sex: 'M', adv: false, retired: true, traits: ['stubborn', 'loyal'], key: 'gald' }],
    ['swordsman', 19, 3, { nm: ['カイル', '凱爾'], sex: 'M', traits: ['brave', 'curious'], key: 'kyle' }],
    ['swordsman', 27, 4], ['swordsman', 31, 5], ['swordsman', 23, 2],
    ['mage', 27, 4], ['mage', 22, 2], ['priest', 29, 4], ['thief', 24, 3],
    ['historian', 41, 1, { nm: ['ソウジュ', '蒼壽'], sex: 'M', traits: ['curious', 'kind'], key: 'souju' }],
    ['priest', 45, 3, { adv: false }], ['priest', 33, 2, { adv: false }],
  ];
  for (let i = 0; i < 9; i++) R0.push(['farmer', rint(20, 46), 1 + rint(0, 2)]);
  for (let i = 0; i < 3; i++) R0.push([['merchant', 'weaponer', 'armorer'][i], rint(24, 48), 1 + rint(0, 2)]);
  for (let i = 0; i < 2; i++) R0.push(['smith', rint(26, 48), 2]);
  for (let i = 0; i < 2; i++) R0.push(['herbalist', rint(24, 44), 2]);
  for (let i = 0; i < 4; i++) R0.push([rpick(['farmer', 'merchant']), rint(4, 11), 1, { child: true }]);
  ['farmer', 'merchant', 'smith', 'herbalist'].forEach(j => R0.push([j, rint(56, 64), 2, { elder: true }]));
  const used = new Set();
  R0.forEach((r, i) => {
    const o = r[3] || {};
    let sex = o.sex || (rchance(0.5) ? 'M' : 'F');
    const nm = o.nm || null;
    const h = mkHuman({ job: r[0], age: r[1], lvl: r[2], name: nm || pickName(sex), sex, traits: o.traits, adv: o.adv, retired: o.retired, gold: r[0] === 'swordsman' ? rint(30, 90) : undefined, gear: r[0] === 'swordsman' && r[2] > 3 ? 1 : 0 });
    if (o.key) G.flags[o.key] = h.id;
    G.humans.push(h);
  });
  // families / homes (3 per household, 14 homes)
  let hi = 0;
  const adults = G.humans.filter(h => h.age >= ADULT_AGE); const kids = G.humans.filter(h => h.age < ADULT_AGE);
  adults.forEach((h, i) => { h.home = homes[i % homes.length]; });
  kids.forEach((k, i) => { const par = adults[(i * 5 + 3) % adults.length]; k.home = par.home; });
  // Gald's apprentice Kyle shares home; master relation
  const gald = hById0('gald'), kyle = hById0('kyle');
  kyle.home = gald.home; kyle.master = gald.id; kyle.rel[gald.id] = 80; gald.rel[kyle.id] = 80;
  G.humans.forEach(h => { const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.look.cloth = JOB_CLOTH[h.job] !== undefined ? (JOB_CLOTH[h.job] + (h.id % 2)) % CLOTH_N : h.look.cloth; });
  // couples
  const mf = adults.filter(h => !h.adv || h.job === 'swordsman');
  const cp = (a, b) => { if (!a || !b || a.spouse || b.spouse) return; a.spouse = b.id; b.spouse = a.id; a.rel[b.id] = 90; b.rel[a.id] = 90; b.home = a.home; };
  const farmers = G.humans.filter(h => h.job === 'farmer' && h.age >= 20 && h.age < 50);
  for (let i = 0; i + 1 < farmers.length; i += 2) { if (farmers[i].sex !== farmers[i + 1].sex) cp(farmers[i], farmers[i + 1]); }
  // random acquaintance seeds
  G.humans.forEach(h => { for (let i = 0; i < 3; i++) { const o = rpick(G.humans); if (o !== h) h.rel[o.id] = rint(10, 45); } });
  G.humans.forEach(h => { h.hp = hStats(h).hp; h.maxHp = h.hp; });
  // monsters boss/cadres (dormant)
  G.boss = mkMonster('boss', BOSS.home.x, BOSS.home.y); G.boss.dormant = true; G.monsters.push(G.boss);
  CADRES.forEach((c, i) => { const m = mkMonster('cad' + i, c.home.x, c.home.y); m.hp = m.maxHp = Math.round(m.hp * TUNE.cadMul); m.atk *= TUNE.cadMul; m.dormant = true; G.cadres.push(m.id); G.monsters.push(m); });
  // initial wildlife
  for (let i = 0; i < 4; i++) spawnMonster(1);
  // opening prologue chapter (written at tick 0)
  G.pendingProlog = true;
}
const JOB_CLOTH = { swordsman: 0, mage: 1, priest: 2, thief: 3, farmer: 4, merchant: 5, weaponer: 5, armorer: 1, smith: 6, herbalist: 7, historian: 2 };
function hById0(key) { return G.humans.find(h => h.id === G.flags[key]); }

/* ---- monsters ---- */
function mkMonster(type, x, y) {
  let base, key = type, boss = false, cad = -1;
  if (type === 'boss') { base = BOSS; boss = true; } else if (type.startsWith('cad')) { cad = +type.slice(3); base = CADRES[cad]; } else base = MONS[type];
  const m = {
    id: G.nid++, type, x, y, px: x, py: y, hp: base.hp, maxHp: base.hp, atk: base.atk, def: base.def, spd: base.spd, range: base.range, cd: 0, tgt: 0, path: [], alive: true,
    home: { x, y }, mode: 'wander', boss, cad, tier: base.tier || (boss ? 5 : 4), dormant: false, wt: rint(0, 6), sk: 0, born: G.tick, lvl: 1,
  };
  return m;
}
function monMul() { const yr = (G.tick - START_TICK) / TICK_YEAR; return 1 + 0.045 * yr; }
function spawnMonster(tier, near, mode) {
  if (G.monsters.filter(m => m.alive && !m.boss && m.cad < 0).length > 40) return null;
  const yr = yearOf(G.tick);
  const type = rpick(MON_BY_TIER[tier] || MON_BY_TIER[1]);
  let p;
  if (near) { p = nearestWalkable(near.x + rint(-3, 3), near.y + rint(-3, 3)); }
  else {
    const lo = tier === 1 ? 45 : tier === 2 ? 47 : 49;
    p = randWalkableIn(lo, 3, 55, 38);
  }
  const m = mkMonster(type, p.x, p.y);
  const mm = monMul();
  m.hp = m.maxHp = Math.round(m.hp * mm); m.atk *= mm; m.def *= (1 + 0.03 * (yr - 1));
  m.mode = mode || 'wander';
  G.monsters.push(m); G.idx[m.id] = m; return m;
}
