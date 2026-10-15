/* ================= V4.2 W3 UI: divine training, expedition (plan / floor battles / result), anger, captives, coronation, castle interior view ================= */
Object.assign(S, {
  tr_title: ['神の鍛錬', '神的鍛鍊'], tr_do: ['行う', '執行'], tr_throne: ['玉座の予測 {s}{n}%', '王座預測 {s}{n}%'], tr_target: ['対象：{n}', '對象：{n}'], tr_none: ['対象がいない', '沒有對象'], tr_stones: ['{n}×{k}', '{n}×{k}'],
  ex_title: ['魔王城への遠征', '遠征魔王城'], ex_party: ['遠征隊', '遠征隊'], ex_go: ['出発する（信仰30）', '出發（信仰 30）'], ex_need_hero: ['勇者がいない', '還沒有勇者'], ex_need_mates: ['Lv6以上の仲間があと{n}人必要', '還需要 {n} 名 Lv6 以上的同伴'], ex_need_cool: ['前の遠征から1年たっていない', '距離上次遠征未滿 1 年'], ex_busy: ['遠征中', '遠征中'],
  ex_floor_win: ['予測 {n}%', '預測 {n}%'], ex_help_win: ['神の助けで {n}%', '神助後 {n}%'], ex_anger: ['怒り +{a} → 以後の脅威 +{t}%', '憤怒 +{a} → 之後威脅 +{t}%'], ex_warn: ['※ 留守のあいだに「{n}」が来る！', '※ 離村期間會遇上「{n}」！'], ex_away: ['留守：約1季', '離村：約 1 季'], ex_refuse: ['仲間たち「まだ準備ができていない……」（恩寵や試煉で勇気づけよう）', '同伴們：「還沒準備好……」（用恩寵或試煉鼓勵他們）'],
  ex_rw: { 1: ['全員Lv+1・魔石（中）×5・ミスリル', '全員 Lv+1、魔石（中）×5、秘銀'], 2: ['全員Lv+2・竜の鱗・捕虜の救出・士気+7（この世ずっと）', '全員 Lv+2、龍鱗、救出俘虜、士氣 +7（整世）'], 3: ['幹部の魔剣（攻撃+25%）・神格の経験を大量に', '幹部魔劍（攻擊 +25%）、大量神格經驗'], 4: ['魔王の冠・弑王者・村の発展・信仰上限+50・神格+1・全員Lv+3・王を失った魔王軍は怒り−40（ただし新魔王が即位）', '魔王之冠、弒王者、村莊發展、信仰上限 +50、神格 +1、全員 Lv+3、失去王的魔王軍憤怒 −40（但新魔王會即位）'] },
  ex_continue: ['次の階へ進む', '前往下一層'], ex_retreat: ['撤退する', '撤退'], ex_won: ['{n} を突破！', '突破 {n}！'], ex_lost: ['{n} で敗れた……', '在 {n} 落敗……'], ex_done: ['遠征の結果', '遠征結果'], ex_close: ['閉じる', '關閉'],
  ex_out_dead: ['{A}は帰らなかった', '{A}沒有回來'], ex_out_captive: ['{A}は捕らえられた（1年以内に救え）', '{A}被俘虜了（1 年內救出）'], ex_out_hurt: ['{A}は重傷を負った', '{A}身受重傷'], ex_newking: ['魔王軍は新たな王「{n}」を推し立てた（125%）', '魔王軍推舉了新王「{n}」（125%）'],
  anger_t: ['魔王軍の怒り', '魔王軍的憤怒'], tip_anger: ['魔王軍の怒り', '魔王軍的憤怒'], tip_anger_d: ['遠征で城を攻めるほど上がり、この世では下がりません。すべての攻防の敵が強くなります（怒り×0.3%）。50で次の攻防が1季早まり、80で報復の襲撃が来ます。', '遠征攻城越深就越高，這一世不會下降。所有攻防的敵人都會變強（憤怒×0.3%）。50 時下一場提早 1 季，80 時會有報復襲擊。'],
  du_rescue: ['{n}を救出する（あと{d}日）', '救出 {n}（剩 {d} 天）'], bn_newking: ['新王の戴冠', '新王加冕'], ev_newking: ['魔王城で新たな王「{n}」が戴冠した', '魔王城加冕了新王「{n}」'], ev_kingslain: ['遠征隊が魔王を討ち取った！', '遠征隊討伐了魔王！'], ev_exp_dep: ['遠征隊が魔王城へ向かった', '遠征隊前往魔王城'], ev_exp_end: ['遠征隊が戻った（{n}階まで）', '遠征隊回來了（到第 {n} 層）'], ev_captive_lost: ['捕虜の{A}が処刑された……', '俘虜{A}被處決了……'], ev_captive_saved: ['{A}を救い出した！', '救出了{A}！'], ev_train: ['神が{A}を鍛えた（{n}）', '神鍛鍊了{A}（{n}）'], ev_retal: ['魔王軍の報復の襲撃！', '魔王軍的報復襲擊！'], ev_anger_fw: ['怒った魔王軍が攻防を早めた', '憤怒的魔王軍提早了攻防'],
  cv_in: ['城内へ', '進入城內'], cv_out: ['外へ', '回到外面'], cv_floor: ['{n}F', '{n}F'], tip_cv: ['魔王城の中', '魔王城內部'], tip_cv_d: ['魔物たちの暮らしをのぞけます。2Fの魔法陣で魔物が生まれ、3Fに幹部、4Fに魔王がいます。', '可以偷看魔物的生活。2F 的魔法陣會誕生魔物，3F 有幹部，4F 有魔王。'],
});
/* ---------- divine training ---------- */
Screens.training = function (who) {
  const L = li();
  this.push('training', () => {
    const rows = Object.keys(TRAIN).map(id => { const T = TRAIN[id]; const lvOk = (G.godLv || 1) >= T.lv; const av = trainAvailable(id); const tg = trainTarget(id); const d = av ? trainDelta(id) : 0;
      const tgn = Array.isArray(tg) ? tg.map(h => h.name[L]).join('・') : tg ? tg.name[L] : t('tr_none'); const stones = T.stones ? '＋' + fmt(t('tr_stones'), { n: ITEMS[T.stones[0]].n[L], k: T.stones[1] }) + '（' + ((G.store || {})[T.stones[0]] || 0) + '）' : '';
      return h('div', { class: 'card', style: 'cursor:default;' + (av ? '' : 'opacity:.55') }, h('div', { style: 'display:flex;justify-content:space-between' }, h('b', null, T.n[L]), h('span', { class: 'sm' }, fmt(t('act_cost'), { n: trainCost(id) }) + stones)), h('div', { class: 'sm' }, T.d[L]),
        h('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-top:2px' }, h('span', { class: 'sm' }, lvOk ? fmt(t('tr_target'), { n: tgn }) : fmt(t('act_lock_lv'), { n: T.lv })), h('span', { style: 'font-size:12px;color:#9affb0' }, av ? fmt(t('tr_throne'), { s: d >= 0 ? '+' : '', n: Math.round(d * 100) }) : ''), av ? h('span', { class: 'btn', style: 'font-size:12px', onclick: () => { if (doTrain(id, id === 'mark' || id === 'skill' ? who : undefined)) { Snd.se('divine'); Render.flash = 0.3; UI.refresh(true); Screens.rerender(); } } }, t('tr_do')) : null)); });
    return this.win(250, 60, 780, 0, [h('h3', null, t('tr_title') + '　' + t('faith') + ' ' + Math.floor(G.faith)), ...rows, h('div', { style: 'text-align:center;margin-top:8px' }, h('span', { class: 'btn', onclick: () => this.pop() }, t('close')))], 'glass');
  });
};
/* ---------- expedition planning ---------- */
Screens.expedition = function () {
  const L = li();
  this.push('expedition', () => {
    const miss = expMissing(); const P = expParty(); const E = G.castle.exp;
    if (E && !E.done) { setTimeout(() => { Screens.pop(); Screens.expBattle(); }, 0); return h('div'); }
    const why = miss.map(m => m === 'hero' ? t('ex_need_hero') : m === 'cool' ? t('ex_need_cool') : m === 'busy' ? t('ex_busy') : fmt(t('ex_need_mates'), { n: m.split(':')[1] }));
    const party = P ? h('div', { style: 'display:flex;gap:8px;margin:4px 0' }, P.map(hh => { const cv = humanSprite(hh, 0, 0); const im = h('canvas', { width: 16, height: 24, style: 'width:32px;height:48px;image-rendering:pixelated' }); im.getContext('2d').drawImage(cv, 0, 0); return h('div', { style: 'text-align:center;font-size:12px' }, im, h('div', null, hh.name[L]), h('div', { class: 'sm' }, 'Lv' + hh.lvl)); })) : null;
    const floors = CFLOORS.map(F => { const p0 = P ? floorWin(P, F.id, 0) : 0, p = P ? floorWin(P, F.id, 4) : 0; const col = p >= 0.6 ? '#9affb0' : p >= 0.3 ? '#ffe9a0' : '#ff9a9a';
      return h('div', { class: 'card', style: 'cursor:default' }, h('div', { style: 'display:flex;justify-content:space-between' }, h('b', null, F.n[L] + (F.id === 4 ? '　' + G.castle.kingName[L] : '')), h('b', { style: 'color:' + col }, fmt(t('ex_floor_win'), { n: pct(p0) }) + ' → ' + fmt(t('ex_help_win'), { n: pct(p) }))), h('div', { class: 'sm' }, S.ex_rw[F.id][L]), h('div', { class: 'sm', style: 'color:#ffb0a0' }, fmt(t('ex_anger'), { a: F.anger, t: Math.round((F.anger) * 0.3) }))); });
    const a = nextAssault(); const warn = a && a.t - G.tick <= SEASON_T ? h('div', { style: 'color:#ff6a5a;font-weight:bold' }, fmt(t('ex_warn'), { n: ASSAULT_DEF[a.id].short[L] })) : null;
    const go = h('span', { class: 'btn big' + (miss.length || G.faith < 30 ? ' dis' : ''), onclick: () => { if (miss.length) return; const r = startExpedition(30); if (!r.ok) { UI.toast(r.why && r.why[0] === 'courage' ? t('ex_refuse') : t('faith_short'), '#ffb060'); Screens.rerender(); return; } Snd.se('hit'); Screens.pop(); Screens.expBattle(); } }, t('ex_go'));
    return this.win(200, 30, 880, 0, [h('h3', null, t('ex_title')), h('div', { class: 'sm', style: 'color:#ffb0a0' }, t('anger_t') + ' ' + Math.round(G.castle.anger) + '/100'), why.length ? h('div', { style: 'color:#ff9a9a;margin:4px 0' }, why.join('・')) : null, party, ...floors, h('div', { class: 'sm' }, t('ex_away')), warn,
      h('div', { style: 'display:flex;gap:10px;justify-content:center;margin-top:8px' }, go, h('span', { class: 'btn big', onclick: () => this.pop() }, t('close')))], 'glass');
  });
};
/* ---------- expedition battle (2 phases per floor, continue / retreat) ---------- */
Screens.expBattle = function () {
  const L = li();
  this.push('expbattle', () => {
    const E = G.castle.exp; if (!E) return h('div'); const P = E.ids.map(i => G.idx[i]).filter(hh => hh && hh.alive); const F = CFLOORS[E.floor - 1];
    const kids = [h('h3', null, t('ex_title') + '：' + F.n[L])];
    const scene = h('canvas', { width: 600, height: 120, style: 'width:1000px;height:200px;image-rendering:pixelated;display:block;margin:0 auto;border:2px solid #f2f4ff' }); { const c = scene.getContext('2d'); c.imageSmoothingEnabled = false; const fl = FIELDART[['c_floor_black', 'c_floor_stone', 'c_floor_purple', 'c_floor_throne'][E.floor - 1]]; if (fl) { const tile = artCanvas(fl, 'fa.' + fl.p.join('')); for (let x = 0; x < 600; x += 16) for (let y = 40; y < 120; y += 16) c.drawImage(tile, x, y); } c.fillStyle = '#140c1c'; c.fillRect(0, 0, 600, 40);
      P.forEach((hh, i) => c.drawImage(humanSprite(hh, 3, (E.phase + i) % 2 ? 5 : 0), 60 + i * 40, 60, 32, 48)); const foes = E.floor === 4 ? ['king'] : E.floor === 3 ? ['verna', 'garum', 'serene'].slice(0, Math.min(3, (G.chain && G.chain.cadres) || 2)) : ['skel', 'wolf', 'goblin', 'skel'];
      foes.forEach((k, i) => { const s = enemyBattleSprite(k, E.phase); if (s) c.drawImage(s, 520 - i * 70 - s.width * 0.6, 112 - s.height * 0.6, s.width * 0.6, s.height * 0.6); }); }
    kids.push(scene);
    const last = E.results[E.results.length - 1];
    if (E.done) { // final report
      const lines = []; E.results.forEach(r => lines.push((r.win ? '◎ ' : '× ') + fmt(t(r.win ? 'ex_won' : 'ex_lost'), { n: CFLOORS[r.f - 1].n[L] })));
      if (last && last.out) last.out.forEach(([k, id]) => { const o = G.idx[id]; if (o) lines.push(fmt(t('ex_out_' + k), { A: o.name[L] })); });
      if (E.cleared >= 4) lines.push(fmt(t('ex_newking'), { n: G.castle.kingName[L] })); lines.push(t('anger_t') + ' ' + Math.round(G.castle.anger) + '/100');
      kids.push(h('div', { class: 'par', style: 'padding:8px 16px;font-size:15px;line-height:1.6' }, h('b', null, t('ex_done')), ...lines.map(l => h('p', null, l))), h('div', { style: 'text-align:center;margin-top:8px' }, h('span', { class: 'btn big', onclick: () => { G.castle.exp = null; Screens.closeAll(); UI.refresh(true); } }, t('ex_close'))));
      return this.win(120, 30, 1040, 0, kids);
    }
    if (E.phase === 0 && last && last.win && last.f === E.cleared && E.floor === E.cleared) { // between floors: continue or retreat
      const nx = E.cleared + 1; const p = floorWin(P, nx, 4); const Fn = CFLOORS[nx - 1];
      kids.push(h('div', { class: 'par', style: 'padding:8px 16px;font-size:15px' }, h('p', { class: 'gold' }, fmt(t('ex_won'), { n: CFLOORS[E.cleared - 1].n[L] })), h('p', null, Fn.n[L] + '：' + fmt(t('ex_floor_win'), { n: pct(p) })), h('p', { class: 'sm' }, S.ex_rw[nx][L]), h('p', { class: 'sm', style: 'color:#ffb0a0' }, fmt(t('ex_anger'), { a: Fn.anger, t: Math.round((Fn.anger) * 0.3) }))));
      kids.push(h('div', { style: 'display:flex;gap:10px;justify-content:center;margin-top:8px' }, h('span', { class: 'btn big', onclick: () => { E.floor = nx; Snd.se('hit'); Screens.rerender(); } }, t('ex_continue')), h('span', { class: 'btn big', onclick: () => { retreatExpedition(); Screens.rerender(); } }, t('ex_retreat'))));
      return this.win(120, 30, 1040, 0, kids);
    }
    const live = sigm((floorD(P) - floorThreat(E.floor) + 3 + E.bonus) / WIN_K);
    kids.push(h('div', { style: 'text-align:right;font-size:22px;font-weight:bold;margin:6px 20px' }, t('war_pred') + ' ' + pct(live) + '%'));
    const row = h('div', { style: 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap' }, h('div', { style: 'width:100%;text-align:center', class: 'gold' }, fmt(t('bt_phase'), { n: E.phase + 1, p: PHASE_N[E.phase][L] })));
    battleOptions(E.phase).forEach(o => { const ok = canIntervene(o); row.append(h('span', { class: 'btn big' + (ok ? '' : ' dis'), style: 'color:#c8ffd0', onclick: () => { if (!ok) return; expBattleStep(o.id); Snd.se('divine'); Render.flash = 0.3; Screens.rerender(); } }, o.n[L] + '（' + (o.cost ? fmt(t('act_cost'), { n: o.cost }) : fmt(t('act_awe'), { n: o.awe })) + '）')); });
    row.append(h('span', { class: 'btn big', onclick: () => { expBattleStep('none'); Screens.rerender(); } }, t('bt_watch')), h('span', { class: 'btn big', style: 'border-color:#c080ff', onclick: () => { expBattleStep('monsters'); Screens.rerender(); } }, t('bt_help')));
    kids.push(row); return this.win(120, 30, 1040, 0, kids);
  }, null, { noEsc: true });
};
/* defense screen: buttons for training and expedition, anger line */
const _def43 = Screens.defense; Screens.defense = function () { _def43.apply(this, arguments); const top = this.stack[this.stack.length - 1]; if (!top || top.name !== 'defense') return; const r0 = top.build; top.build = () => { const el = r0(); try { const close = Array.from(el.querySelectorAll('.btn')).find(b => b.textContent === t('close')); if (close) { close.parentNode.prepend(h('span', { class: 'btn', style: 'margin-right:8px', onclick: () => Screens.training() }, '✦ ' + t('tr_title')), h('span', { class: 'btn', style: 'margin-right:8px;border-color:#ff9a9a', onclick: () => Screens.expedition() }, '⚔ ' + t('ex_title'))); }
  const dev = Array.from(el.querySelectorAll('.sm')).find(x => x.textContent.indexOf(t('dev_lv').replace('{n}', '')) === 0); if (dev && G.castle && G.castle.anger > 0) { const a = h('div', { class: 'sm', style: 'color:#ff9a9a' }, '😡 ' + t('anger_t') + ' ' + Math.round(G.castle.anger) + ' → ' + fmt(t('eco_thr'), { s: '+', n: Math.round(G.castle.anger * 0.3) })); Tip.attach(a, () => [t('tip_anger'), t('tip_anger_d')]); dev.after(a); } } catch (e) { ERRS.push('def43:' + e.message); } return el; }; Screens.rerender(); };
const _wb43 = UI.refreshWar; UI.refreshWar = function () { _wb43.apply(this, arguments); const E = this.el; if (!E.warTxt || !G || !G.castle) return; if (G.castle.anger > 0) E.warTxt.textContent += ' 😡' + Math.round(G.castle.anger); };
/* person card: training button */
const _br43 = UI.buildRes; UI.buildRes = function (hh) { _br43.apply(this, arguments); const E = this.el; const row = E.selWin.lastChild; if (row && isAdv(hh)) row.appendChild(h('span', { class: 'btn', style: 'font-size:12px;padding:0 6px', onclick: () => Screens.training(hh.id) }, t('tr_title'))); };
/* duties: rescue captives first */
/* feed lines + coronation pause */
const _ev43 = evLineV4; evLineV4 = function (ev) { const L = li(); const p = ev.payload || {}; const nm = i => { const e = G.idx[ev.actors[i]]; return e ? e.name[L] : '?'; };
  switch (ev.type) { case 'new_king': return fmt(t('ev_newking'), { n: p.n ? p.n[L] : '' }); case 'king_slain_exp': return t('ev_kingslain'); case 'exp_depart': return t('ev_exp_dep'); case 'exp_end': return fmt(t('ev_exp_end'), { n: p.cleared || 0 }); case 'captive_lost': return fmt(t('ev_captive_lost'), { A: nm(0) }); case 'captive_saved': return fmt(t('ev_captive_saved'), { A: nm(0) }); case 'divine_train': return fmt(t('ev_train'), { A: nm(0), n: TRAIN[p.id] ? TRAIN[p.id].n[L] : '' }); case 'retaliation': return t('ev_retal'); case 'anger_forward': return t('ev_anger_fw'); }
  return _ev43(ev); };
Object.assign(FEED_A, { exp_depart: 1, captive_saved: 1, divine_train: 1, anger_forward: 1 }); Object.assign(FEED_B, { anger_up: 1, exp_refuse: 1 });
const _hook43 = attachV41Hooks; attachV41Hooks = function () { _hook43(); const prev = G.onEvent; G.onEvent = ev => { if (prev) prev(ev); if (ev.type === 'new_king') { Render.centerOn(BOSS.home.x, BOSS.home.y - 3); Game.paused = true; Snd.se('fail'); UI.banner(t('bn_newking'), fmt(t('ev_newking'), { n: ev.payload.n[li()] }), 'twist'); } }; };
/* ---------- castle interior (Part D): 4 floors, viewed instead of the world ---------- */
const CASTLE_MAPS = {};
function castleMap(f) {
  if (CASTLE_MAPS[f]) return CASTLE_MAPS[f]; const Wc = 32, Hc = 20; const floorK = ['c_floor_black', 'c_floor_stone', 'c_floor_purple', 'c_floor_throne'][f - 1]; const g = []; const obj = [];
  for (let y = 0; y < Hc; y++) { const r = []; for (let x = 0; x < Wc; x++) r.push(y < 3 ? 'wall' : floorK); g.push(r); }
  const put = (x, y, k) => obj.push([x, y, k]);
  if (f === 1) { for (let x = 2; x < 30; x += 6) put(x, 3, 'c_banner_l'); put(15, 2, 'c_gate'); put(4, 10, 'c_gargoyle'); put(27, 10, 'c_gargoyle'); put(10, 6, 'c_statue_m'); put(21, 6, 'c_statue_m'); for (let x = 3; x < 30; x += 8) put(x, 17, 'c_candle_s'); put(16, 18, 'c_stairs_up'); }
  if (f === 2) { for (let y = 9; y < 13; y++) for (let x = 14; x < 18; x++) g[y][x] = 'c_floor_magic'; put(15, 10, 'c_circle'); put(4, 6, 'c_altar'); put(27, 6, 'c_idol'); put(5, 15, 'c_coffin'); put(26, 15, 'c_coffin'); put(9, 17, 'c_blood'); put(22, 17, 'c_bones'); put(7, 4, 'c_pillar_l'); put(24, 4, 'c_pillar_l'); put(12, 4, 'c_pillar_m'); put(19, 4, 'c_pillar_m'); put(3, 18, 'c_book'); put(28, 4, 'c_candle_l'); put(30, 18, 'c_stairs_up'); }
  if (f === 3) { for (let y = 3; y < Hc; y++) for (let x = 0; x < Wc; x++) if (x > 13 && x < 18) g[y][x] = 'c_floor_carpet'; for (let x = 2; x < 30; x += 5) put(x, 3, x % 2 ? 'c_banner_s' : 'c_curtain'); put(5, 8, 'c_pillar_black'); put(26, 8, 'c_pillar_black'); put(4, 14, 'c_cage'); put(8, 14, 'c_cage'); put(24, 16, 'c_pit'); put(20, 12, 'c_pillar_broken'); put(16, 18, 'c_door'); }
  if (f === 4) { for (let y = 5; y < Hc; y++) for (let x = 12; x < 20; x++) g[y][x] = 'c_floor_grid'; put(16, 6, 'c_throne'); put(16, 3, 'c_crest'); put(10, 5, 'c_fire_purple'); put(22, 5, 'c_fire_blue'); put(6, 8, 'c_pillar_black'); put(26, 8, 'c_pillar_black'); put(6, 16, 'c_candle_l'); put(26, 16, 'c_candle_l'); put(24, 10, 'c_chest_gold'); put(16, 18, 'c_warp'); put(3, 3, 'c_curtain'); put(29, 3, 'c_curtain'); }
  return (CASTLE_MAPS[f] = { g, obj, W: Wc, H: Hc });
}
const castleFolk = {}; // cosmetic residents per floor
function castleResidents(f) { if (castleFolk[f]) return castleFolk[f]; const L = []; const add = (k, n) => { for (let i = 0; i < n; i++) L.push({ k, x: 3 + Math.random() * 26, y: 6 + Math.random() * 13, vx: 0, vy: 0, t: 0 }); };
  if (f === 1) add('skel', 4), add('goblin', 3); if (f === 2) add('wolf', 2), add('bat', 3), add('mush', 2); if (f === 3) ['verna', 'garum', 'serene'].slice(0, Math.min(3, (G.chain && G.chain.cadres) || 2)).forEach(k => L.push({ k, x: 10 + L.length * 6, y: 10, vx: 0, vy: 0, t: 0, big: 1 })); if (f === 4) L.push({ k: 'king', x: 16.5, y: 7.6, vx: 0, vy: 0, t: 0, big: 1, still: 1 });
  return (castleFolk[f] = L); }
Game.view = 'world'; Game.castleFloor = 1;
const _rd44 = Render.draw; Render.draw = function (alpha, opts) {
  if (Game.view !== 'castle' || !G) return _rd44.apply(this, arguments);
  const c = this.c; this.time++; c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#0a0610'; c.fillRect(0, 0, 640, 360); const M = castleMap(Game.castleFloor); const ox = Math.round((640 - M.W * 16) / 2), oy = 34;
  for (let y = 0; y < M.H; y++) for (let x = 0; x < M.W; x++) { const k = M.g[y][x]; const A = FIELDART[k === 'wall' ? (Game.castleFloor === 2 ? 'c_wall_evil' : 'c_wall') : k]; if (!A) continue; const cv = artCanvas(A, 'fa.' + k + (k === 'wall' ? Game.castleFloor : '')); if (k === 'wall') c.drawImage(cv, 0, 0, A.w, Math.min(A.h, 16), ox + x * 16, oy + y * 16, 16, 16); else c.drawImage(cv, ox + x * 16, oy + y * 16, 16, 16); }
  M.obj.slice().sort((a, b) => a[1] - b[1]).forEach(([x, y, k]) => { const A = FIELDART[k]; if (!A) return; const cv = artCanvas(A, 'fa.' + k); let yy = oy + y * 16 + 16 - A.h; if (k === 'c_circle' || k === 'c_warp' || k === 'c_pit' || k === 'c_blood' || k === 'c_stairs_up' || k === 'c_gate') yy = oy + y * 16; if (k === 'c_circle') { c.globalAlpha = 0.75 + Math.sin(this.time / 15) * 0.25; c.drawImage(cv, ox + x * 16, yy, 32, 32); c.globalAlpha = 1; } else c.drawImage(cv, ox + x * 16, yy); if ((k === 'c_fire_blue' || k === 'c_fire_purple' || k === 'c_candle_l') && (this.time >> 3) % 2) { c.globalAlpha = 0.25; c.fillStyle = k === 'c_fire_blue' ? '#60a0ff' : '#c060ff'; c.beginPath(); c.arc(ox + x * 16 + 8, yy + 4, 10, 0, 7); c.fill(); c.globalAlpha = 1; } });
  // captives in the cages (3F)
  if (Game.castleFloor === 3) (G.castle.captives || []).slice(0, 2).forEach((cp, i) => { const o = G.idx[cp.id]; if (!o) return; c.drawImage(humanSprite(o, 0, 6), ox + (4 + i * 4) * 16, oy + 14 * 16 - 20); c.font = '8px sans-serif'; c.fillStyle = '#ffd0d0'; c.textAlign = 'center'; c.fillText(o.name[li()], ox + (4 + i * 4) * 16 + 8, oy + 14 * 16 - 22); });
  // residents wander; 2F's magic circle spawns a monster now and then
  const R = castleResidents(Game.castleFloor); if (Game.castleFloor === 2 && this.time % 240 === 0 && R.length < 10) { R.push({ k: rpick(['mush', 'bat', 'wolf', 'goblin']), x: 16, y: 11, vx: 0, vy: 0, t: 0, born: this.time }); }
  R.forEach(e => { if (!e.still && --e.t <= 0) { e.t = 40 + Math.random() * 80; const a = Math.random() * 7; e.vx = Math.cos(a) * 0.03; e.vy = Math.sin(a) * 0.03; } if (!e.still) { e.x = clamp(e.x + e.vx, 2, M.W - 3); e.y = clamp(e.y + e.vy, 5, M.H - 2); } });
  R.slice().sort((a, b) => a.y - b.y).forEach(e => { let s; if (e.big) s = enemyBattleSprite(e.k, (this.time >> 5) & 1); else s = monsterSprite({ type: e.k, cad: -1, dir: Math.abs(e.vx) > Math.abs(e.vy) ? (e.vx > 0 ? 3 : 2) : (e.vy > 0 ? 0 : 1) }, (this.time >> 3) % 3); if (!s) return; const sc = e.big ? 0.5 : 1; const px = ox + e.x * 16 - s.width * sc / 2, py = oy + e.y * 16 - s.height * sc; c.drawImage(s, px, py, s.width * sc, s.height * sc);
    if (e.k === 'king' && !G.awakened) { c.globalAlpha = 0.5; c.fillStyle = '#100818'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(px + s.width * sc / 2 + Math.sin(this.time / 20 + i) * 12, py + 10 + i * 6, 10, 0, 7); c.fill(); } c.globalAlpha = 1; }
    if (e.born && this.time - e.born < 60) { c.globalAlpha = 1 - (this.time - e.born) / 60; c.strokeStyle = '#d070ff'; c.beginPath(); c.arc(px + 8, py + 8, 10 + (this.time - e.born) / 3, 0, 7); c.stroke(); c.globalAlpha = 1; } });
  if (G.awakened && Game.castleFloor === 4) { c.fillStyle = 'rgba(120,0,20,0.18)'; c.fillRect(0, 0, 640, 360); }
};
const _ub44 = UI.build; UI.build = function () { _ub44.apply(this, arguments); const E = this.el; const root = $('ui'); if (!root) return;
  E.castleBar = h('div', { class: 'win glass', style: 'left:400px;top:100px;width:480px;padding:3px 8px;display:none;text-align:center;white-space:nowrap' }); root.appendChild(E.castleBar); Tip.attach(E.castleBar, () => [t('tip_cv'), t('tip_cv_d')]);
  const rb = E.regBtns && E.regBtns.castle; if (rb) rb.addEventListener('click', () => { setTimeout(() => { Game.view = 'castle'; Game.castleFloor = 1; UI.refreshCastleBar(); }, 0); }); };
UI.refreshCastleBar = function () { const E = this.el; if (!E.castleBar) return; E.castleBar.style.display = Game.view === 'castle' ? 'block' : 'none'; if (Game.view !== 'castle') return; E.castleBar.innerHTML = ''; [1, 2, 3, 4].forEach(f => E.castleBar.append(h('span', { class: 'btn' + (Game.castleFloor === f ? ' on' : ''), style: 'margin:0 3px', onclick: () => { Game.castleFloor = f; UI.refreshCastleBar(); } }, CFLOORS[f - 1].n[li()].replace(/（.*）/, '')))); E.castleBar.append(h('span', { class: 'btn', style: 'margin-left:8px', onclick: () => { Game.view = 'world'; UI.refreshCastleBar(); } }, t('cv_out'))); };
