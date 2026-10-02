/* ================= debug API / save serialization ================= */
const ERRS = [];
function serializeState() {
  const skip = { idx: 1, sidx: 1, qidx: 1, pidx: 1, fx: 1, fxOn: 1, rng: 1 };
  const o = {};
  for (const k in G) { if (skip[k] || typeof G[k] === 'function') continue; o[k] = G[k]; }
  o.rngS = G.rng.s; o.lang = LANG;
  return JSON.stringify(o);
}
function deserializeState(str) {
  const o = JSON.parse(str);
  if (!o || o.ver !== 1) throw new Error('version');
  const fxOn = G ? G.fxOn : false, cbs = {};
  if (G) for (const k in G) if (typeof G[k] === 'function') cbs[k] = G[k];
  G = Object.assign({}, o, cbs); G.rng = new RNG(1); G.rng.s = o.rngS; G.fx = []; G.fxOn = fxOn; delete G.rngS;
  rebuildIdx(); return G;
}
function phaseName() { return G.ending ? 'ended' : G.awakened ? 'awakened' : 'peace'; }
const RT = {
  state() {
    return { tick: G.tick, date: dateStr(G.tick, G.gen), year: yearOf(G.tick), pop: G.stats.alive || G.humans.filter(h => h.alive).length, faith: +G.faith.toFixed(1), balance: +G.balance.toFixed(1),
      boss: { awake: G.awakened, alive: G.boss.alive, hp: Math.round(G.boss.hp), maxHp: G.boss.maxHp }, phase: phaseName(), ending: G.ending ? G.ending.kind : null, townHp: +G.town.hp.toFixed(1), food: Math.round(G.town.food),
      adv: G.humans.filter(h => h.alive && isAdv(h)).length, monsters: G.monsters.filter(m => m.alive && !m.dormant).length, prayers: openPrayers().length, stats: G.stats };
  },
  setSpeed(n) { if (typeof Game !== 'undefined') Game.setSpeed(n); },
  step(n) { for (let i = 0; i < n && !G.ending; i++) tick(); return G.tick; },
  seed(n) { newGame({ seed: n, god: G.god, lang: LANG }); },
  newGame(o) { newGame(o); if (typeof Game !== 'undefined' && Game.afterNew) Game.afterNew(); return RT.state(); },
  policy(p) { G.policy = p; },
  log() { return G.log.slice(-40); },
  chronicle() { return typeof chronAll === 'function' ? chronAll() : ''; },
  errors() { return ERRS.slice(); },
  cast(pid, tid, dir) { return castPower(pid, tid, dir); },
  G() { return G; },
};
if (typeof window !== 'undefined') {
  window.__RT = RT;
  window.addEventListener('error', e => { ERRS.push(String(e.message) + ' @' + (e.lineno || '')); });
  window.addEventListener('unhandledrejection', e => { ERRS.push('rej:' + String(e.reason)); });
}
if (typeof globalThis !== 'undefined') globalThis.__RT = RT;
