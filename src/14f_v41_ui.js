/* ================= V4.1 UI: forecast pair, faith ledger, listen / answer-all, skip to next event, auto-slow restore,
   hero title (card + map markers + events), council details (A8), "what the god did" in the war report (A9) ================= */
Object.assign(S, {
  fc_now: ['いま', '現在'], fc_then: ['その時', '屆時'], tip_fc: ['予測勝率', '預測勝率'],
  tip_fc_d: ['「いま」＝今すぐ戦ったら。「その時」＝このまま育てば、攻防の日にこのくらい。どちらも神が手助けした場合です。', '「現在」＝如果現在開戰；「屆時」＝照目前的成長，攻防那天大約是這樣。兩者都假設神會出手幫忙。'],
  fl_title: ['信仰力の出入り（今日）', '信仰力收支（今天）'], fl_inc: ['信徒の祈り（{n}人）', '信徒的祈禱（{n} 人）'], fl_ans: ['祈りにこたえた', '回應祈禱'], fl_cast: ['神の力を使った', '使用神力'], fl_sab: ['安息日の礼拝', '安息日禮拜'], fl_war: ['攻防の勝利', '攻防勝利'], fl_exp: ['急ぎの祈りを放置', '放置緊急祈禱'], fl_over: ['あふれた分は糧食に', '溢出的部分變成糧食'], fl_next: ['次の日の収入まで {n}時間', '距離下次日結 {n} 小時'], fl_yday: ['きのうの合計 {n}', '昨天合計 {n}'],
  pray_more: ['ほかに {n} 件の祈り', '還有 {n} 件祈禱'], pray_all: ['おすすめで全部に応える（信仰{n}）', '依建議全部回應（信仰 {n}）'], pray_listen: ['傾聴', '傾聽'], pray_listen_d: ['期限を1日のばす。がっかりさせない。信仰は使わない（1日3回）', '期限延長 1 天，不讓祈禱者失望；不花信仰（每天 3 次）'], pray_listen_left: ['のこり{n}回', '剩 {n} 次'],
  skip_btn: ['⏭', '⏭'], tip_skip: ['次の大事件まで早送り', '快轉到下一個重要事件'], tip_skip_d: ['×64で進み、重要な出来事や予兆が起きたら止まります。', '以 ×64 前進，發生重要事件或預兆時停下。'], skip_stop: ['早送りを止めた：{s}', '停止快轉：{s}'], auto_back: ['速度を元にもどした', '速度已恢復'],
  hero_t: ['勇者', '勇者'], hero_none: ['勇者 まだいない（候補{n}）', '勇者 尚未誕生（候補 {n}）'], hero_cands: ['勇者の候補', '勇者候補'], tip_hero: ['勇者', '勇者'],
  tip_hero_d: ['この世に勇者は1人だけ。剣士がLv8以上になり、攻防で生き残って称号を得るか、恩寵を3回受けると選ばれます。勇者は最後の決戦で敵の大将と戦います。勇者が強いほど決戦に勝ちやすくなります。', '這一世只有 1 位勇者。劍士 Lv8 以上，並在攻防中活下來得到稱號，或受過 3 次恩寵，就會被選上。勇者會在最後的決勝階段對抗敵方首領；勇者越強，決勝越容易贏。'],
  ev_hero_fall: ['勇者{A}が倒れた……', '勇者{A}倒下了……'], ev_hero_inh: ['{A}が勇者の名を受け継いだ', '{A}繼承了勇者之名'], ev_sabbath: ['安息日：礼拝で信仰+{g}', '安息日：禮拜帶來信仰 +{g}'],
  bn_hero: ['勇者誕生', '勇者誕生'], bn_hero_d: ['{A}が勇者に選ばれた。最後の決戦で敵の大将と戦う。', '{A}被選為勇者，將在最後的決勝對抗敵方首領。'], bn_hero_fall: ['勇者が倒れた', '勇者倒下了'], bn_inh: ['勇者の継承', '勇者的繼承'],
  co_xp: ['神格+{n}', '神格 +{n}'], co_diff: ['難しさ', '難度'], co_judge: ['判定', '判定'], co_prog: ['いま', '目前'], co_last: ['前の期間のできごと', '上一期的大事'], co_force: ['味方と敵', '雙方戰力'], co_fc: ['次の攻防', '下一場攻防'],
  rp_god: ['神がしたこと', '神做了什麼'], rp_prep: ['あなたの備えで勝率 +{n}%', '你的備戰讓勝率 +{n}%'], rp_help: ['戦いの手助けで勝率 +{n}%', '戰鬥中的幫忙讓勝率 +{n}%'], rp_xp: ['神格経験 +{n}（Lv{l}・次まで {r}）', '神格經驗 +{n}（Lv{l}・還差 {r}）'], rp_dec: ['神旨：{n} {m}', '神旨：{n} {m}'], rp_nohelp: ['神は見守っていた', '神在一旁觀看'],
});
/* decree details for the council cards */
const DEC_META = {
  noDeath: { d: 3, j: ['次の攻防の戦死者が0人', '下一場攻防戰死 0 人'] }, slayer: { d: 3, j: ['巨竜の戦いで「討伐」', '巨龍戰結果為「討伐」'] },
  hero: { d: 2, j: ['勇者がいる', '有勇者在世'], p: () => heroAlive() ? '1/1' : '0/1' }, town: { d: 2, j: ['村の発展が「町」以上', '村莊發展到「町」以上'], p: () => DEV_N[devLevel()][li()] },
  walls3: { d: 1, j: ['防壁が3段以上', '防壁 3 級以上'], p: () => G.walls + '/3' }, letLose: { d: 1, j: ['この期間に1回負ける', '這一期輸一場'], p: () => (G.period ? G.period.losses : 0) + '/1' },
  dragonNorth: { d: 2, j: ['巨竜の戦いで「敗北」', '巨龍戰結果為「敗北」'] }, awe100: { d: 2, j: ['畏怖が100以上', '畏怖 100 以上'], p: () => Math.floor(G.awe) + '/100' },
  balance25: { d: 2, j: ['期間の8割、天秤が±25の内', '期間 8 成天秤在 ±25 內'], p: () => G.period && G.period.balDays ? Math.round(G.period.balIn / G.period.balDays * 100) + '%' : '-' },
  pact: { d: 3, j: ['巨竜と契約する（竜語）', '與巨龍締約（龍語）'] }, orphan: { d: 2, j: ['遺された子が冒険者になる', '遺孤成為冒險者'], p: () => (G.period ? G.period.orphanAdv : 0) + '/1' },
};
DECREES.hero.n = ['勇者を誕生させる', '讓勇者誕生'];
/* ---------- next-assault bar: two forecasts + colour + trend ---------- */
const _rw41 = UI.refreshWar; UI.refreshWar = function () {
  _rw41.apply(this, arguments); const E = this.el; if (!E.warBar || !G || !G.assaults) return; const a = nextAssault(); if (!a) return;
  const f = winForecast(a); if (!f) return; const col = v => v >= 0.6 ? '#9affb0' : v >= 0.3 ? '#ffe9a0' : '#ff9a9a';
  const arr = (this.warHist.length > 1 ? (f.now > this.warHist[0] + 0.01 ? '▲' : f.now < this.warHist[0] - 0.01 ? '▼' : '') : '');
  E.warP.innerHTML = ''; E.warP.append(h('span', { style: 'color:' + col(f.now) }, t('fc_now') + ' ' + pct(f.now) + '%' + arr), h('span', { style: 'color:#cfcfe6' }, ' → '), h('span', { style: 'color:' + col(f.then) }, t('fc_then') + ' ' + pct(f.then) + '%'));
  this.warHist[this.warHist.length - 1] = f.now;
  // skip / auto-slow restore
  if (Game.skip) { if (Game.modals.length) Game.stopSkip('');
    else { const ev = G.events.slice(-12).find(e => e.t > Game.skip.t && (e.type === 'assault_omen' || feedClass(e) === 'S' || feedClass(e) === 'A')); if (ev) Game.stopSkip(evLineV4(ev) || evLine(ev) || ''); else Game.speedIdx = 3; } }
  if (Game.slowUntil && performance.now() > Game.slowUntil) { const back = Game.slowPrev; Game.slowUntil = 0; if (Game.speedIdx === 0 && !Game.paused && !Game.modals.length && back > 0) { Game.speedIdx = back; UI.pushFeed(t('auto_back'), '#c8c8e0', null, false); } }
  this.refreshHero();
};
Game.stopSkip = function (why) { if (!this.skip) return; this.speedIdx = this.skip.prev; this.skip = null; if (why) UI.pushFeed(fmt(t('skip_stop'), { s: why }), '#ffd070', null, false); UI.refresh(true); };
const _autoSlow41 = Game.autoSlow; Game.autoSlow = function () { const prev = this.speedIdx; if (this.skip) { this.stopSkip(''); return; } _autoSlow41.apply(this, arguments); if (this.speedIdx === 0 && prev > 0) { this.slowPrev = prev; this.slowUntil = performance.now() + 5000; } };
/* ---------- build additions ---------- */
const _ub41 = UI.build; UI.build = function () {
  _ub41.apply(this, arguments); const E = this.el;
  try {
    Tip.attach(E.warP, () => [t('tip_fc'), t('tip_fc_d')]);
    // skip button next to the speed buttons
    const row = E.spBtns[E.spBtns.length - 1].parentNode; E.skipBtn = h('span', { class: 'btn', style: 'padding:0 7px;font-size:13px', onclick: () => { Snd.se('ok'); if (Game.skip) { Game.stopSkip(''); return; } Game.skip = { t: G.tick, prev: Game.speedIdx || 1 }; Game.speedIdx = 3; Game.paused = false; UI.refresh(true); } }, t('skip_btn'));
    row.insertBefore(E.skipBtn, E.spBtns[E.spBtns.length - 1].nextSibling); Tip.attach(E.skipBtn, () => [t('tip_skip'), t('tip_skip_d')]);
    // faith ledger tooltip (replaces the plain one)
    Tip.attach(E.faithWin, () => faithTip());
    // hero card inside the goal panel
    const R = this.goalR; if (R) { E.heroCard = h('div', { class: 'card', style: 'display:flex;align-items:center;gap:6px;padding:2px 4px;margin-top:4px;cursor:pointer', onclick: () => heroCardClick() }); R.body.appendChild(E.heroCard); Tip.attach(E.heroCard, () => [t('tip_hero'), t('tip_hero_d')]); this.heroSig = ''; }
  } catch (e) { ERRS.push('v41 ui:' + e.message); }
};
function faithTip() {
  const L = G.fLed || {}, Y = G.fLedY || {}; const pop = aliveHumans ? aliveHumans().length : 0; const f1 = v => (v >= 0 ? '+' : '') + (Math.round(v * 10) / 10);
  const lines = [t('fl_title')];
  const add = (k, lab) => { if (L[k]) lines.push(lab + '　' + f1(L[k])); };
  lines.push(fmt(t('fl_inc'), { n: pop }) + '　' + f1(G.faithDayInc || 0) + '/' + t('war_d').replace('{n}', '1'));
  add('ans', t('fl_ans')); add('cast', t('fl_cast')); add('sab', t('fl_sab')); add('war', t('fl_war')); add('exp', t('fl_exp')); add('over', t('fl_over'));
  const hrs = Math.ceil((TICK_DAY - (G.tick % TICK_DAY)) / 6); lines.push(fmt(t('fl_next'), { n: hrs }));
  const ys = Object.values(Y).reduce((a, b) => a + b, 0); if (Object.keys(Y).length) lines.push(fmt(t('fl_yday'), { n: f1(ys) }));
  return lines;
}
/* ---------- prayers: "n more", answer all (advised), listen ---------- */
const _rp41 = UI.refreshPrayers; UI.refreshPrayers = function () {
  const before = this.lastPray; _rp41.apply(this, arguments); const E = this.el; if (!E.prayList || this.lastPray === before && this._p41) return; this._p41 = 1;
  Array.from(E.prayList.children).forEach(card => { const p = card._p; if (!p) return; const can = (G.listenLeft || 0) > 0 && !p.listened; const b = h('span', { class: 'btn' + (can ? '' : ' dis'), style: 'font-size:11px;padding:0 5px;float:right;margin-top:-2px', onclick: ev => { ev.stopPropagation(); if (listenPrayer(p.id)) { Snd.se('ok'); UI.lastPray = ''; UI.refresh(true); } } }, (p.listened ? '✓' : '') + t('pray_listen')); Tip.attach(b, () => [t('pray_listen'), t('pray_listen_d'), fmt(t('pray_listen_left'), { n: G.listenLeft || 0 })]); card.insertBefore(b, card.firstChild); });
  const all = openPrayers(); if (this.prayMore > 0) E.prayList.appendChild(h('div', { class: 'sm', style: 'text-align:center;margin-top:2px' }, fmt(t('pray_more'), { n: this.prayMore })));
  if (all.length >= 2) { const cost = all.reduce((s, p) => s + powerCost(recommendFor(p).pid), 0); const ok = G.faith >= Math.min(cost, powerCost(recommendFor(all[0]).pid)); E.prayList.appendChild(h('div', { class: 'btn' + (ok ? '' : ' dis'), style: 'display:block;text-align:center;font-size:12px;margin-top:3px', onclick: () => answerAllAdvised() }, fmt(t('pray_all'), { n: cost }))); }
};
function answerAllAdvised() {
  const prs = openPrayers().sort((a, b) => b.urg - a.urg); let n = 0;
  for (const p of prs) { const hh = hById(p.hid); if (!hh || !hh.alive) continue; const rc = recommendFor(p); if (G.faith < powerCost(rc.pid)) break; const r = castPower(rc.pid, hh.id, p.kind === 'battle' ? 'brave' : 'kind'); if (r.ok) n++; }
  if (n) { Snd.se('divine'); UI.lastPray = ''; UI.refresh(true); }
}
/* ---------- hero card + map markers ---------- */
UI.refreshHero = function () {
  const E = this.el; if (!E.heroCard || !G) return; const hh = G.heroId && G.idx[G.heroId]; const cands = heroCands(); const L = li();
  const sig = (hh ? hh.id + ':' + hh.lvl + (G.titles[hh.id] || [''])[0] : 'n' + cands.length) + LANG; if (sig === this.heroSig) return; this.heroSig = sig; E.heroCard.innerHTML = '';
  if (hh && hh.alive) { const cv = humanSprite(hh, 0, 0); const im = h('canvas', { width: 16, height: 24, style: 'width:24px;height:36px;image-rendering:pixelated' }); im.getContext('2d').drawImage(cv, 0, 0); const tt = G.titles[hh.id]; E.heroCard.append(im, h('div', { style: 'line-height:1.25' }, h('div', { style: 'font-size:13px' }, h('span', { class: 'gold' }, '👑 ' + t('hero_t') + '　'), h('b', null, hh.name[L])), h('div', { class: 'sm' }, 'Lv' + hh.lvl + (tt && tt[L] !== t('hero_t') ? '　「' + tt[L] + '」' : '')))); }
  else E.heroCard.append(h('div', { class: 'sm', style: 'padding:3px 2px' }, '☆ ' + fmt(t('hero_none'), { n: cands.length })));
};
function heroCardClick() {
  const hh = G.heroId && G.idx[G.heroId]; if (hh && hh.alive) { Screens.focusHuman(hh.id); return; }
  const c = heroCands(); if (!c.length) return; UI.pushFeed(t('hero_cands') + '：' + c.map(x => x.name[li()] + ' Lv' + x.lvl).join('、'), '#e0e0ff', null, false); Screens.focusHuman(c[0].id);
}
const _rd41 = Render.draw; Render.draw = function (alpha, opts) {
  _rd41.apply(this, arguments); if (!G || !G.assaults || Game.scene !== 'play' && !(opts && opts.markers)) return;
  const c = this.c, cx = Math.round(this.cam.x), cy = Math.round(this.cam.y); const tm = this.time;
  const pos = hh => ({ x: Math.round(lerp(hh.px, hh.x, alpha || 0) * TS + 8 - cx), y: Math.round(lerp(hh.py, hh.y, alpha || 0) * TS + 14 - cy) });
  const hh = G.heroId && G.idx[G.heroId];
  if (hh && hh.alive && !hh.inside) { const p = pos(hh); if (p.x > -20 && p.x < 660 && p.y > -10 && p.y < 380) {
    c.strokeStyle = '#ffd860'; c.lineWidth = 1; for (let k = 0; k < 2; k++) { c.globalAlpha = 0.9 - k * 0.35; c.beginPath(); c.ellipse(p.x, p.y, 8 + k * 3, 3 + k * 1.2, 0, 0, 7); c.stroke(); } c.globalAlpha = 1;
    if ((tm >> 3) % 3 === 0) { fr(c, '#fff8c0', p.x + 9, p.y - 6 - (tm % 6), 1, 3); fr(c, '#fff8c0', p.x + 8, p.y - 5 - (tm % 6), 3, 1); }
    const y0 = p.y - 40; // crown + label
    fr(c, '#5a3a10', p.x - 6, y0 - 1, 13, 7); fr(c, '#ffd040', p.x - 5, y0 + 2, 11, 3); fr(c, '#ffd040', p.x - 5, y0, 1, 2); fr(c, '#ffd040', p.x, y0 - 1, 1, 3); fr(c, '#ffd040', p.x + 5, y0, 1, 2); fr(c, '#e83a3a', p.x, y0 + 3, 1, 1); fr(c, '#fff4b0', p.x - 4, y0 + 2, 2, 1);
    c.font = 'bold 8px sans-serif'; c.textAlign = 'center'; const lab = t('hero_t'); c.fillStyle = '#1a1020'; c.fillText(lab, p.x + 1, y0 - 3); c.fillStyle = '#ffe060'; c.fillText(lab, p.x, y0 - 4); } }
  for (const ch of heroCands()) { if (ch.inside) continue; const p = pos(ch); if (p.x < -20 || p.x > 660 || p.y < -10 || p.y > 380) continue; const y0 = p.y - 36; fr(c, '#3a3a50', p.x - 3, y0, 7, 5); fr(c, '#e8ecf8', p.x - 2, y0 + 1, 5, 3); fr(c, '#e8ecf8', p.x, y0 - 1, 1, 7); fr(c, '#ffffff', p.x, y0 + 2, 1, 1); }
};
/* ---------- hero events: pause, camera, banner ---------- */
function attachV41Hooks() {
  const prev = G.onEvent; G.onEvent = ev => {
    if (prev) prev(ev);
    if (ev.type === 'hero_born' || ev.type === 'hero_inherit' || ev.type === 'hero_fall') { const a = G.idx[ev.actors[0]]; const L = li(); const nm = a ? a.name[L] : '?';
      if (a) Render.centerOn(a.x, a.y); Game.paused = true; Snd.se(ev.type === 'hero_fall' ? 'fail' : 'level'); Render.flash = ev.type === 'hero_fall' ? 0 : 0.3;
      UI.banner(t(ev.type === 'hero_born' ? 'bn_hero' : ev.type === 'hero_fall' ? 'bn_hero_fall' : 'bn_inh'), ev.type === 'hero_fall' ? fmt(t('ev_hero_fall'), { A: nm }) : fmt(t('bn_hero_d'), { A: nm }), ev.type === 'hero_fall' ? 'fail' : 'crit'); UI.heroSig = ''; }
    if (ev.type === 'sabbath' && G.fxOn) { const b = W.bk.church && W.bk.church[0]; if (b) G.fx.push({ t: 'pray', x: b.appr.x, y: b.appr.y - 2 }); }
  };
}
Object.assign(FEED_S, { hero_fall: 1, hero_inherit: 1 });
const _ev41 = evLineV4; evLineV4 = function (ev) { const L = li(); const nm = () => { const e = G.idx[ev.actors[0]]; return e ? e.name[L] : '?'; };
  if (ev.type === 'hero_fall') return fmt(t('ev_hero_fall'), { A: nm() }); if (ev.type === 'hero_inherit') return fmt(t('ev_hero_inh'), { A: nm() }); if (ev.type === 'sabbath') return fmt(t('ev_sabbath'), { g: ev.payload.g }); return _ev41(ev); };
/* ---------- battle: show the effect of each option ---------- */
const _sb41 = Screens.battle; Screens.battle = function () { _sb41.apply(this, arguments); };
function optEffect(o) { const B = G.battle; if (!B) return 0; const base = sigm((B.D - B.T + B.bonus + 3) / WIN_K); return sigm((B.D - B.T + B.bonus + o.b + 3) / WIN_K) - base; }
/* ---------- war report: what the god did (A9) ---------- */
function godDidLines(B, a) {
  const L = li(); const out = []; const win = isWin(B.grade);
  if (B.prepGain > 0.005) out.push(fmt(t('rp_prep'), { n: Math.round(B.prepGain * 100) }));
  { const fv = B.favor || 0; if (B.bonus - fv > 0.05) out.push(fmt(t('rp_help'), { n: Math.round((sigm((B.D - B.T + B.bonus + 3) / WIN_K) - sigm((B.D - B.T + fv + 3) / WIN_K)) * 100) })); }
  if (!out.length || (out.length === 0)) out.push(t('rp_nohelp'));
  const lv = G.godLv || 1; const nx = GOD_LV_XP[lv] !== undefined ? GOD_LV_XP[lv] - (G.godXp || 0) : 0; if (B.xp) out.push(fmt(t('rp_xp'), { n: B.xp, l: lv, r: Math.max(0, nx) }));
  (B.decrees || []).forEach(d => out.push(fmt(t('rp_dec'), { n: DECREES[d.id].n[L], m: d.ok ? '✔' : '✘' })));
  return out;
}
/* ---------- council (A8): decree details, last period, forces, forecasts ---------- */
Screens.council = function () {
  const L = li(); let picked = [], edict = null;
  this.push('council', () => {
    const C = G.council; if (!C) return h('div');
    const a = nextAssault(); const yr = Math.floor((G.tick - START_TICK) / TICK_YEAR); const fc = a ? winForecast(a) : null;
    const col = v => v >= 0.6 ? '#9affb0' : v >= 0.3 ? '#ffe9a0' : '#ff9a9a';
    const rep = h('div', { class: 'sm', style: 'line-height:1.6' }, h('div', null, fmt(t('co_era'), { y: yr, p: G.humans.filter(x => x.alive).length, d: DEV_N[devLevel()][L] })),
      ...G.assaults.filter(x => x.state === 'done').map(x => h('div', null, '・' + ASSAULT_DEF[x.id].short[L] + '：' + (x.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[x.grade][L]))),
      h('div', null, t('faith') + ' ' + Math.floor(G.faith) + '／' + t('awe') + ' ' + Math.floor(G.awe) + '／' + fmt(t('god_lv'), { n: G.godLv || 1 })));
    const from = G.period ? G.period.from : START_TICK; const big = G.events.filter(e => e.t >= from && (feedClass(e) === 'S' || feedClass(e) === 'A') && e.type !== 'council').slice(-3).map(e => evLineV4(e) || evLine(e)).filter(Boolean);
    const last = h('div', { class: 'sm', style: 'line-height:1.5' }, ...(big.length ? big : ['—']).map(l => h('div', null, '・' + l)));
    const settled = (C.settled || []).length ? h('div', null, h('b', { class: 'gold' }, t('co_settled')), ...C.settled.map(s => h('div', { class: 'sm', style: 'color:' + (s.ok ? '#9affb0' : '#ff9a9a') }, (s.ok ? '○ ' : '× ') + DECREES[s.id].n[L]))) : null;
    const cards = h('div', { style: 'display:flex;gap:10px' }, C.offer.map(id => { const D = DECREES[id], M = DEC_META[id] || { d: 2, j: ['', ''] }; const on = picked.indexOf(id) >= 0;
      return h('div', { class: 'card' + (on ? ' sel' : ''), style: 'flex:1;min-height:118px;' + (on ? 'border-color:#ffe060' : ''), onclick: () => { if (on) picked = picked.filter(x => x !== id); else if (picked.length < 2) picked.push(id); else { picked.shift(); picked.push(id); } Snd.se('cursor'); Screens.rerender(); } },
        h('div', { style: 'display:flex;justify-content:space-between' }, h('span', { class: 'sm gold' }, S.co_side[D.side][L]), h('span', { class: 'sm', style: 'color:#9affb0' }, fmt(t('co_xp'), { n: 30 }) + (D.side === 'm' ? '・' + t('awe') + '+25' : '・' + t('faith') + '+20'))),
        h('div', { style: 'font-size:15px;margin:3px 0' }, D.n[L]),
        h('div', { class: 'sm' }, t('co_diff') + ' ' + '★'.repeat(M.d) + '☆'.repeat(3 - M.d)), h('div', { class: 'sm' }, t('co_judge') + '：' + M.j[L]), M.p ? h('div', { class: 'sm', style: 'color:#a8d8ff' }, t('co_prog') + '：' + M.p()) : null); }));
    const ed = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' }, h('span', { class: 'btn' + (!edict ? ' on' : ''), onclick: () => { edict = null; Screens.rerender(); } }, t('co_none')), ...Object.keys(EDICTS).map(k => { const E2 = EDICTS[k]; const dis = E2.cost > G.faith; return h('span', { class: 'btn' + (edict === k ? ' on' : '') + (dis ? ' dis' : ''), onclick: () => { if (dis) return; edict = k; Screens.rerender(); } }, E2.n[L] + '：' + E2.d[L]); }));
    const bar = (lab, v, c) => h('div', { style: 'display:flex;align-items:center;gap:6px;margin:2px 0' }, h('span', { class: 'sm', style: 'width:80px' }, lab), h('div', { class: 'gauge', style: 'flex:1;height:10px;border-width:1px' }, h('i', { style: `width:${clamp(v, 0, 100)}%;background:${c}` })), h('span', { class: 'sm', style: 'width:28px;text-align:right' }, Math.round(v)));
    const forces = a ? h('div', null, h('b', { class: 'gold' }, t('co_force')), bar(t('gb_def'), defenseScore(), 'linear-gradient(#80ff90,#20b040)'), bar(t('gb_thr'), threatOf(a), 'linear-gradient(#ff9a9a,#c03030)'),
      h('div', { style: 'margin-top:4px' }, h('span', { class: 'sm gold' }, t('co_fc') + '：' + assaultName(a, L) + '　' + fmtLeft(a.t - G.tick)), h('div', { style: 'font-size:18px;font-weight:bold' }, h('span', { style: 'color:' + col(fc.now) }, t('fc_now') + ' ' + pct(fc.now) + '%'), h('span', null, ' → '), h('span', { style: 'color:' + col(fc.then) }, t('fc_then') + ' ' + pct(fc.then) + '%')))) : null;
    return this.win(150, 80, 980, 540, [h('h3', null, t('co_title')),
      h('div', { style: 'display:flex;gap:16px' }, h('div', { style: 'flex:1' }, h('b', { class: 'gold' }, t('co_report')), rep, settled), h('div', { style: 'flex:1' }, h('b', { class: 'gold' }, t('co_last')), last), h('div', { style: 'flex:1.1' }, forces)),
      h('h3', { style: 'margin-top:8px' }, t('co_pick') + '（' + picked.length + '/2）'), cards, h('h3', { style: 'margin-top:8px' }, t('co_edict')), ed,
      h('div', { style: 'text-align:center;margin-top:12px' }, h('span', { class: 'btn big' + (picked.length === 2 ? '' : ' dis'), onclick: () => { if (picked.length !== 2) return; closeCouncil(picked, edict); Snd.se('ok'); Screens.closeAll(); UI.refresh(true); } }, t('co_ok')))]);
  }, null, { noEsc: true });
};
