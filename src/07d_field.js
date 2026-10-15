/* ================= V4.2 W1/W2: field zones, monster ecology, zone lords, drops, storehouse, magic stones, named gear ================= */
/* 20 monster kinds (12 base forms + colour variants). zone / star / stats / exp / gold / drops */
Object.assign(MONS, {
  slime: { n: ['スライム', '史萊姆'], hp: 18, atk: 4, def: 1, spd: 0.8, tier: 1, exp: 5, gold: 2, range: 1.5, star: 1, zone: 'plains', drop: [['meat', 0.3], ['stoneS', 0.15]] },
  hornrab: { n: ['角うさぎ', '角兔'], hp: 22, atk: 6, def: 1, spd: 1.4, tier: 1, exp: 7, gold: 2, range: 1.5, star: 1, zone: 'plains', drop: [['meat', 0.5], ['hide', 0.3]] },
  flower: { n: ['毒花', '毒花'], hp: 34, atk: 9, def: 2, spd: 0.4, tier: 2, exp: 11, gold: 3, range: 2.5, star: 2, zone: 'forest', drop: [['herb', 0.6]] },
  mush2: { n: ['毒ぷくぷく茸', '毒噗噗菇'], hp: 30, atk: 8, def: 2, spd: 0.8, tier: 2, exp: 10, gold: 3, range: 1.5, star: 2, zone: 'forest', drop: [['mushroom', 0.5], ['herb', 0.2]] },
  slimeK: { n: ['スライム王', '史萊姆王'], hp: 70, atk: 12, def: 4, spd: 0.7, tier: 3, exp: 22, gold: 8, range: 1.5, star: 3, zone: 'swamp', drop: [['stoneM', 0.35], ['ore', 0.2]] },
  bat2: { n: ['沼こうもり', '沼蝠'], hp: 34, atk: 11, def: 2, spd: 1.4, tier: 3, exp: 16, gold: 5, range: 1.5, star: 3, zone: 'swamp', drop: [['bone', 0.3]] },
  gargoyle: { n: ['ガーゴイル', '石像鬼'], hp: 95, atk: 17, def: 9, spd: 0.9, tier: 4, exp: 32, gold: 12, range: 1.5, star: 4, zone: 'mountain', drop: [['ore', 0.4], ['stoneM', 0.3], ['mithril', 0.08]] },
  griffin: { n: ['グリフォン', '獅鷲'], hp: 110, atk: 20, def: 6, spd: 1.5, tier: 4, exp: 36, gold: 14, range: 1.5, star: 4, zone: 'mountain', drop: [['feather', 0.6], ['stoneL', 0.08]] },
  snowwolf: { n: ['雪狼', '雪狼'], hp: 90, atk: 19, def: 5, spd: 1.5, tier: 4, exp: 30, gold: 10, range: 1.5, star: 4, zone: 'mountain', drop: [['hide', 0.5], ['fang', 0.4]] },
  goblin2: { n: ['小鬼の戦士', '小鬼戰士'], hp: 80, atk: 18, def: 6, spd: 1.0, tier: 4, exp: 28, gold: 12, range: 1.5, star: 4, zone: 'mountain', drop: [['ore', 0.3], ['stoneM', 0.2]] },
  wyrm: { n: ['幼竜', '幼龍'], hp: 180, atk: 28, def: 12, spd: 1.0, tier: 5, exp: 70, gold: 30, range: 1.8, star: 5, zone: 'nest', drop: [['scale', 0.5], ['dfang', 0.25], ['stoneL', 0.3]] },
  skel2: { n: ['骸骨騎士', '骷髏騎士'], hp: 150, atk: 25, def: 12, spd: 1.0, tier: 5, exp: 55, gold: 20, range: 1.5, star: 5, zone: 'nest', drop: [['bone', 0.6], ['stoneL', 0.15]] },
});
Object.assign(MONS.mush, { star: 1, zone: 'plains', drop: [['mushroom', 0.4], ['stoneS', 0.1]] }); Object.assign(MONS.bat, { star: 1, zone: 'plains', drop: [['hide', 0.2], ['stoneS', 0.1]] });
Object.assign(MONS.goblin, { star: 2, zone: 'forest', drop: [['fang', 0.3], ['wood', 0.4], ['stoneS', 0.15]] }); Object.assign(MONS.wolf, { star: 2, zone: 'forest', drop: [['fang', 0.5], ['hide', 0.4]] });
Object.assign(MONS.turtle, { star: 3, zone: 'swamp', drop: [['ore', 0.4], ['stoneM', 0.2]] }); Object.assign(MONS.skel, { star: 3, zone: 'swamp', drop: [['bone', 0.6], ['stoneM', 0.15]] });
const ZONE_MONS = {}; for (const k in MONS) { const z = MONS[k].zone; if (z) (ZONE_MONS[z] = ZONE_MONS[z] || []).push(k); }
const ITEMS = { // W2: storehouse items
  meat: { n: ['肉', '肉'], cat: 'food' }, mushroom: { n: ['きのこ', '蘑菇'], cat: 'food' }, herb: { n: ['薬草', '藥草'], cat: 'food' }, wood: { n: ['木材', '木材'], cat: 'mat' }, hide: { n: ['皮', '皮革'], cat: 'mat' }, fang: { n: ['獣の牙', '獸牙'], cat: 'mat' },
  bone: { n: ['骨', '骨'], cat: 'mat' }, ore: { n: ['鉱石', '礦石'], cat: 'mat' }, mithril: { n: ['ミスリル', '秘銀'], cat: 'mat' }, feather: { n: ['羽根', '羽毛'], cat: 'mat' }, scale: { n: ['竜の鱗', '龍鱗'], cat: 'mat' }, dfang: { n: ['竜の牙', '龍牙'], cat: 'mat' },
  stoneS: { n: ['魔石（小）', '魔石（小）'], cat: 'stone', faith: 4, gold: 12 }, stoneM: { n: ['魔石（中）', '魔石（中）'], cat: 'stone', faith: 10, gold: 30 }, stoneL: { n: ['魔石（大）', '魔石（大）'], cat: 'stone', faith: 25, gold: 80 },
};
const RARES = { fangClaw: { n: ['灰牙の爪', '灰牙之爪'], pow: 1.25, d: ['狼系に強い', '對狼系強'] }, holySword: { n: ['聖剣', '聖劍'], pow: 1.4, d: ['攻撃+40%', '攻擊 +40%'] }, sageStone: { n: ['賢者の石', '賢者之石'], pow: 1.1, guard: 1, d: ['一度だけ死を防ぐ', '免死 1 次'] }, dragonLance: { n: ['竜殺しの槍', '屠龍之槍'], pow: 1.3, d: ['竜に強い', '對龍強'] }, kingCrown: { n: ['魔王の冠', '魔王之冠'], pow: 1.3, d: ['全能力+30%・決戦+10pt', '全能力 +30%、決勝 +10pt'] } };
const LORDS = { plains: { type: 'hornrab', names: [['大角のロッポ', '大角洛波'], ['跳ね王ピピン', '跳躍王皮平'], ['白耳のミル', '白耳米爾']], rare: 'fangClaw' }, forest: { type: 'wolf', names: [['灰牙', '灰牙'], ['黒爪', '黑爪'], ['月吠え', '月吠']], rare: 'fangClaw' },
  swamp: { type: 'slimeK', names: [['沼の主ドロン', '沼之主多隆'], ['泡王ブクブク', '泡王咕嘟'], ['毒沼のヌル', '毒沼努魯']], rare: 'sageStone' }, mountain: { type: 'griffin', names: [['嵐翼', '嵐翼'], ['雪冠', '雪冠'], ['鉄嘴', '鐵喙']], rare: 'holySword' }, nest: { type: 'wyrm', names: [['紅鱗', '紅鱗'], ['熾牙', '熾牙'], ['煤の子', '煤之子']], rare: 'dragonLance' } };
function initField() {
  G.eco = {}; ZONES.forEach(z => G.eco[z.id] = 31); G.store = {}; G.lords = {}; G.ecoKill = {}; G.rares = {};
  ZONES.forEach(z => spawnLord(z.id, 0));
}
/* ---------- ecology ---------- */
function ecoTotal() { let s = 0; for (const k in G.eco || {}) s += G.eco[k]; return s; }
function ecoMod() { const base = 32 * ZONES.length; return clamp((ecoTotal() - base) / base * 0.5, -0.15, 0.12); } // high -> threat +12%, low -> -15%
function ecoLevel() { const m = ecoMod(); return m > 0.06 ? 'many' : m < -0.06 ? 'few' : 'normal'; }
function fieldDaily() {
  if (!G.eco) return; { const n = G.humans.filter(h => h.alive && isAdv(h) && !h.away && (h.party || h.x >= VIL_X1)).length; G.balance = clamp(G.balance + Math.min(0.45, n * 0.07), -100, 100); } // hunters keep the wild in check (V4.1 got this from kills next to the village)
  const dark = Math.max(0, -G.balance) / 100, awe = (G.awe || 0) / 150;
  ZONES.forEach((z, i) => { const E = G.eco[z.id]; G.eco[z.id] = clamp(E + 0.9 * (1 - E / 48) * (1 + dark * 0.8 + awe * 0.5), 0, 60); }); // logistic growth toward ~48
  // overflow: long without hunting -> monsters drift to the village edge (minor harassment)
  if (G.eco.plains > 42 && rchance(0.35)) { for (let i = 0; i < 2; i++) { const m = spawnMonster(1, { x: VIL_X1 + 2, y: 23 }, 'wander'); if (m) m.tgt = 0; } G.eco.plains -= 4; logEvent('overflow', [], {}, ['raid'], 0.35, 0.3, { x: VIL_X1 + 2, y: 23 }); }
  // zone lords respawn every year with a new name
  ZONES.forEach(z => { const L = G.lords[z.id]; if (L && !L.alive && G.tick - L.died >= TICK_YEAR) spawnLord(z.id, (L.gen || 0) + 1); });
  // storehouse upkeep: food items feed the village, herbs become potions, the treasury upgrades the village
  storeDaily();
}
function zoneMonsterType(zid) { const L = ZONE_MONS[zid] || ['mush']; return rpick(L); }
function spawnInZone(zid) { const z = ZONES.find(q => q.id === zid); if (!z) return null; const p = randWalkableIn(z.x0 + 1, 6, z.x1 - 1, MH - 6); const m = mkMonster(zoneMonsterType(zid), p.x, p.y); m.zone = zid; G.monsters.push(m); G.idx[m.id] = m; return m; }
function fieldSpawnTick() { // keep the visible population in step with the ecology number
  if (!G.eco || G.tick % 12 !== 0) return; const live = {}; for (const m of G.monsters) if (m.alive && m.zone && !m.lord) live[m.zone] = (live[m.zone] || 0) + 1;
  for (const z of ZONES) { const want = Math.min(7, Math.round(G.eco[z.id] / 5)); if ((live[z.id] || 0) < want) spawnInZone(z.id); }
}
function spawnLord(zid, gen) { const D = LORDS[zid]; const z = ZONES.find(q => q.id === zid); const p = randWalkableIn(z.x0 + 3, 8, z.x1 - 3, MH - 10); const m = mkMonster(D.type, p.x, p.y); m.lord = zid; m.zone = zid; m.hp = m.maxHp = Math.round(m.maxHp * 3); m.atk *= 1.5; m.def *= 1.3; m.mode = 'guard';
  G.monsters.push(m); G.idx[m.id] = m; const nm = D.names[(gen || 0) % D.names.length]; m.lordName = nm; G.lords[zid] = { id: m.id, alive: true, gen: gen || 0, name: nm, died: 0 }; return m; }
/* ---------- kills: ecology, drops, lords ---------- */
function onFieldKill(m, by) {
  if (!G.eco) return; if (m.zone) { G.eco[m.zone] = Math.max(0, G.eco[m.zone] - 1); G.ecoKill[m.zone] = (G.ecoKill[m.zone] || 0) + 1; }
  if (!by || !by.job) return; const base = MONS[m.type] || {}; by.bag = by.bag || [];
  (base.drop || []).forEach(([it, p]) => { if (rchance(p * (m.lord ? 3 : 1)) && by.bag.length < 10) by.bag.push(it); });
  if (m.lord) { const L = G.lords[m.lord]; L.alive = false; L.died = G.tick; const D = LORDS[m.lord]; G.titles = G.titles || {}; G.titles[by.id] = [L.name[0] + '殺し', '討伐' + L.name[1] + '者']; by.rare = by.rare || D.rare; G.rares[D.rare] = by.id; by.bag.push('stoneL');
    logEvent('lord_slain', [by.id], { zone: m.lord, name: L.name, rare: D.rare }, ['growth'], 0.85, 0.85, by); }
}
/* ---------- storehouse (deposit when back in the village) ---------- */
function depositBag(h) {
  if (!h.bag || !h.bag.length) return; G.store = G.store || {};
  for (const it of h.bag) {
    const I = ITEMS[it]; if (!I) continue;
    if (I.cat === 'stone') { // offer to the church (faith) or sell (treasury): devout people offer
      const devout = clamp(0.25 + (100 - h.needs.faith) / 160 + (soulOf(h).k.good || 0) / 40 + (h.job === 'priest' ? 0.3 : 0), 0.05, 0.95);
      if (rchance(devout)) { G.faith = Math.min(G.faithMax, G.faith + I.faith * 0.7); faithLog('stone', I.faith * 0.7); G.store[it] = (G.store[it] || 0) + 1; /* the church keeps the stone for divine training */ G.stats.offered = (G.stats.offered || 0) + 1; logEvent('offering', [h.id], { it }, ['faith'], 0.3, 0.5, h); }
      else { G.town.gold = (G.town.gold || 0) + I.gold; G.stats.sold = (G.stats.sold || 0) + 1; }
    } else G.store[it] = (G.store[it] || 0) + 1;
  }
  h.bag = [];
}
function storeDaily() {
  const S = G.store || {}; for (const h of G.humans) if (h.alive && h.bag && h.bag.length && h.x <= VIL_X1) depositBag(h);
  const eat = k => { if (S[k] > 0) { S[k]--; return true; } return false; };
  for (let i = 0; i < 3; i++) { if (eat('meat')) G.town.food = Math.min(400, G.town.food + 6); if (eat('mushroom')) G.town.food = Math.min(400, G.town.food + 3); }
  if ((S.herb || 0) >= 2 && G.town.potions < 30) { S.herb -= 2; G.town.potions++; }
  if ((G.town.gold || 0) >= 600 && G.assaults) { G.town.gold -= 600; G.devPts = (G.devPts || 0) + 1; logEvent('village_upgrade', [], { lv: devLevel() }, ['assault'], 0.4, 0.5, PLAZA); }
  smithCraft();
}
/* ---------- named gear from the smith ---------- */
const NAMED = { w: [['fang', 3, ['牙の剣', '獸牙劍'], 'wolf', 0.15], ['ore', 4, ['鋼の剣', '精鋼劍'], 'atk', 0.15], ['mithril', 1, ['ミスリルの剣', '秘銀劍'], 'atk', 0.3], ['dfang', 1, ['竜牙の剣', '龍牙劍'], 'dragon', 0.35]],
  a: [['hide', 3, ['獣皮の鎧', '獸皮鎧'], 'def', 0.12], ['bone', 4, ['骨の鎧', '骨鎧'], 'def', 0.15], ['feather', 3, ['羽根のマント', '羽毛斗篷'], 'spd', 0.15], ['scale', 2, ['竜鱗の鎧', '龍鱗鎧'], 'fire', 0.35]] };
function smithCraft() {
  const S = G.store || {}; if (!G.humans.some(h => h.alive && h.job === 'smith' && h.age >= 16)) return;
  const best = G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => (G.heroId === b.id) - (G.heroId === a.id) || advPower(b) - advPower(a));
  for (const slot of ['w', 'a']) { const target = (G.smithFor && G.idx[G.smithFor] && G.idx[G.smithFor].alive ? [G.idx[G.smithFor]] : []).concat(best).find(h => !h.named || !h.named[slot] || h.named[slot].v < 0.3); if (!target) continue;
    const opts = NAMED[slot].filter(r => (S[r[0]] || 0) >= r[1] && (!target.named || !target.named[slot] || target.named[slot].v < r[4])).sort((x, y) => y[4] - x[4]); const r = opts[0]; if (!r) continue;
    S[r[0]] -= r[1]; target.named = target.named || {}; target.named[slot] = { n: r[2], trait: r[3], v: r[4] }; if (G.smithFor === target.id) G.smithFor = 0;
    logEvent('named_gear', [target.id], { slot, n: r[2], trait: r[3] }, ['growth'], 0.5, 0.6, target); }
}
/* named gear / rare item: power multiplier used by combat and the defense score */
function gearMul(h) { let m = 1; if (h.named) { if (h.named.w) m *= 1 + h.named.w.v * (h.named.w.trait === 'atk' ? 1 : 0.6); if (h.named.a) m *= 1 + h.named.a.v * 0.6; } if (h.rare && RARES[h.rare]) m *= RARES[h.rare].pow; if (h.crown) m *= RARES.kingCrown.pow; if (h.marks) m *= 1 + h.marks.length * 0.15 * 0.6; if (h.artifact) m *= 1 + h.artifact * 0.1; return m; }
/* inheritance: apprentice -> family -> guild */
function inheritGear(h) {
  if (!h.named && !h.rare) return; const heir = G.humans.find(o => o.alive && o.master === h.id && isAdv(o)) || G.humans.find(o => o.alive && isAdv(o) && (o.id === h.spouse || o.parent === h.id || h.parent === o.id)) || G.humans.filter(o => o.alive && isAdv(o) && !o.rare).sort((a, b) => advPower(b) - advPower(a))[0];
  if (!heir) return; if (h.named) { heir.named = heir.named || {}; for (const k in h.named) if (!heir.named[k] || heir.named[k].v < h.named[k].v) heir.named[k] = h.named[k]; } if (h.rare && !heir.rare) { heir.rare = h.rare; G.rares[h.rare] = heir.id; }
  logEvent('inherit_gear', [heir.id, h.id], {}, ['growth'], 0.55, 0.7, heir); h.named = null; h.rare = null;
}
/* deep-zone monsters a little softer so that "deeper = riskier" without wiping parties out */
['gargoyle', 'griffin', 'snowwolf', 'goblin2', 'wyrm', 'skel2'].forEach(k => { MONS[k].atk = Math.round(MONS[k].atk * 0.8); });
