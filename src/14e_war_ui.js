/* ================= V4 UI: next-assault bar, defense screen, battle (3 phases), war report, council, era cards ================= */
Object.assign(S, {
  war_next: ['次の攻防', '下一場攻防'], war_in: ['あと', '還有'], war_now: ['まもなく', '即將'], war_pred: ['予測勝率', '預測勝率'], war_open: ['備え（B）', '備戰（B）'], war_none: ['すべての攻防が終わった', '所有攻防都結束了'],
  war_y: ['{n}年', '{n}年'], war_s: ['{n}季', '{n}季'], war_d: ['{n}日', '{n}天'],
  def_title: ['村の守り', '村莊防衛'], def_parts: ['防衛力（0〜100）', '防衛力（0～100）'], def_threat: ['敵の脅威', '敵方威脅'], def_actions: ['備えの行動', '備戰行動'], def_timeline: ['この世の攻防（10年）', '這一世的攻防（10 年）'], def_adv: ['顧問のおすすめ', '顧問建議'],
  dp_combat: ['戦力', '戰力'], dp_works: ['守備', '守備'], dp_morale: ['士気', '士氣'], dp_supply: ['補給', '補給'], dp_divine: ['神の備え', '神的備戰'],
  dpd_combat: ['冒険者の人数・レベル・装備（35%）', '冒險者人數、等級、裝備（35%）'], dpd_works: ['防壁の段階と傷み（20%）', '防壁等級與損傷（20%）'], dpd_morale: ['信仰・最近の勝ち負け・勇者・天秤（20%）', '信仰、近期勝敗、勇者、天秤（20%）'], dpd_supply: ['糧食・薬・装備の在庫（15%）', '糧食、藥、裝備庫存（15%）'], dpd_divine: ['戦いの直前にした加護（10%）', '開戰前施加的加護（10%）'],
  th_base: ['基本', '基本'], th_bal: ['天秤の闇', '天秤偏暗'], th_terr: ['魔物の領地', '魔物領地'], th_chain: ['前の戦いの結果', '前幾場的結果'], th_prov: ['挑発', '挑釁'],
  act_do: ['行う', '執行'], act_lock_lv: ['神格Lv{n}で解放', '神格 Lv{n} 解鎖'], act_lock: ['いまは使えない', '目前不可用'], act_cost: ['信仰{n}', '信仰 {n}'], act_awe: ['畏怖{n}', '畏怖 {n}'],
  god_lv: ['神格 Lv{n}', '神格 Lv{n}'], god_next: ['次のLvまで {n}', '距離下一級 {n}'], god_skills: ['神技', '神技'], decrees_now: ['いまの神旨', '目前的神旨'],
  dev_lv: ['村の発展：{n}', '村莊發展：{n}'], walls_lv: ['防壁：{n}段', '防壁：{n} 級'], ruins_n: ['壊れた建物：{n}', '損毀建築：{n}'],
  st_wait: ['予定', '預定'], st_done: ['済', '已結束'],
  dragon_type: { expedition: ['竜の巣へ遠征', '遠征龍巢'], field: ['村の外で決戦', '村外決戰'], village: ['竜が村を直撃', '巨龍直擊村莊'] },
  dragon_out: { slain: ['討伐', '討伐'], repelled: ['撃退', '擊退'], pact: ['契約', '締約'], lost: ['敗北（北山を占拠）', '敗北（佔據北山）'] },
  bt_title: ['攻防', '攻防'], bt_phase: ['第{n}段階：{p}', '第 {n} 階段：{p}'], bt_watch: ['見守る', '旁觀'], bt_help: ['魔物に味方する（畏怖+）', '幫魔物一把（畏怖+）'], bt_next: ['進める', '繼續'],
  bt_good: ['こちらが押している。', '我方佔上風。'], bt_even: ['互角のせめぎ合い。', '雙方勢均力敵。'], bt_bad: ['押されている……', '我方被壓制……'],
  bt_intro: { wave: ['魔物の大群が村へ押し寄せる。', '魔物大軍湧向村莊。'], dragon: ['空が暗くなり、巨竜が姿を見せた。', '天色變暗，巨龍現身了。'], king: ['魔王と幹部、魔物の大軍が進軍してくる。', '魔王與幹部率領魔物大軍進軍而來。'] },
  bt_pact: ['巨竜は神の言葉に耳を傾け、村と契約を結んだ。戦いは起きなかった。', '巨龍傾聽了神的話語，與村莊締結契約，戰鬥沒有發生。'],
  rp_title: ['戦後報告', '戰後報告'], rp_deaths: ['戦死：{n}人', '戰死：{n} 人'], rp_ruins: ['壊れた建物', '損毀建築'], rp_levels: ['成長', '成長'], rp_loot: ['戦利品', '戰利品'], rp_titles: ['称号', '稱號'], rp_mig: ['移住者：{n}人', '移居者：{n} 人'], rp_dev: ['村は「{n}」になった', '村莊變成「{n}」'], rp_close: ['閉じる', '關閉'], rp_next: ['次：{n}（予測 {p}%）', '下一場：{n}（預測 {p}%）'], rp_chain: ['この結果で変わること', '這個結果帶來的變化'],
  ch_dragon: { expedition: ['巨竜戦は「竜の巣への遠征」になる（有利）', '巨龍戰變成「遠征龍巢」（有利）'], field: ['巨竜戦は「村の外での決戦」になる', '巨龍戰在「村外決戰」'], village: ['巨竜が村を直撃する（建物の被害大）', '巨龍會直擊村莊（建築損害大）'] },
  ch_cad: ['魔王軍の幹部：{n}人', '魔王軍幹部：{n} 人'], ch_king: { slain: ['魔王軍の大将が1人減る', '魔王軍少一員大將'], repelled: ['竜が魔王軍の先鋒になる', '巨龍成為魔王軍先鋒'], pact: ['竜は村の味方として戦う', '巨龍將站在村莊這邊'], lost: ['竜が魔王と一緒に来る', '巨龍會與魔王一起來'] },
  co_title: ['神々の評定会', '眾神評定會'], co_report: ['これまでの報告', '至今的報告'], co_pick: ['次の期間の神旨を2つ選ぶ', '選擇下一期的 2 個神旨'], co_edict: ['神勅（任意・1つまで）', '神敕（可選，最多 1 個）'], co_ok: ['決定する', '決定'], co_settled: ['神旨の結果', '神旨結果'], co_side: { h: ['人の側', '人類側'], m: ['魔の側', '魔族側'], b: ['采配', '采配'] }, co_none: ['なし', '無'],
  co_era: ['{y}年目・人口{p}人・{d}', '第{y}年・人口 {p} 人・{d}'],
  card_push: ['推し進める', '推動'], card_stop: ['止める', '阻止'], card_leave: ['放っておく', '放置'], card_title: ['時代の兆し', '時代的徵兆'],
  awe: ['畏怖', '畏怖'], tip_awe: ['畏怖', '畏怖'], tip_awe_d: ['魔物たちが神に向ける「恐れ」。魔物が勝つ、闇に傾く、魔物に味方すると増える。迷い・挑発などに使う。', '魔物對神的「恐懼」。魔物獲勝、天秤偏暗、幫魔物一把時增加。用於迷惘、挑釁等。'],
  tip_war: ['次の攻防', '下一場攻防'], tip_war_d: ['この世（10年）は5回の攻防で進みます。数字は今の予測勝率。備え（Bキー）で上げられます。', '這一世（10 年）由 5 場攻防構成。數字是目前的預測勝率，可用備戰（B 鍵）提高。'],
  gb_def: ['防衛力', '防衛力'], gb_thr: ['敵の脅威', '敵方威脅'], goal_v4: ['10年後の魔王進攻まで、村を守りぬこう。次は「{n}」。', '守住村莊，直到 10 年後的魔王進攻。下一場是「{n}」。'],
  tip_def: ['防衛力', '防衛力'], tip_def_d: ['村の守りの総合値。戦力・守備・士気・補給・神の備えから計算します。', '村莊防衛的綜合值，由戰力、守備、士氣、補給、神的備戰計算。'], tip_thr: ['敵の脅威', '敵方威脅'], tip_thr_d: ['次に来る敵の強さ。前の戦いの結果や天秤で変わります。防衛力が脅威と同じなら勝率は約60%。', '下一波敵人的強度，會隨前幾場結果與天秤改變。防衛力等於威脅時勝率約 60%。'],
  rt_sum: ['日々のこと：{s}', '日常：{s}'],
  ev_omen1: ['{n}の兆し：野の魔物が増えてきた', '{n}的徵兆：原野的魔物變多了'], ev_omen2: ['斥候の報告：{n}が近づいている（予測勝率{p}%）', '斥候報告：{n}正在逼近（預測勝率 {p}%）'], ev_omen3: ['{n}がすぐそこまで来ている！', '{n}已近在眼前！'],
  ev_start: ['{n}が始まった！', '{n}開始了！'], ev_end: ['{n}：{g}', '{n}：{g}'], ev_pact_ok: ['巨竜が契約に応じた', '巨龍答應締約了'], ev_pact_ng: ['巨竜は怒って去った', '巨龍憤怒地離開了'],
  ev_hero: ['{A}が勇者として目覚めた！', '{A}覺醒為勇者！'], ev_god: ['神格がLv{n}に上がった', '神格提升到 Lv{n}'], ev_dev: ['村の発展：{n}', '村莊發展：{n}'], ev_fest: ['凱旋祭が開かれた', '舉辦了凱旋祭'], ev_walls: ['防壁が{n}段になった', '防壁升到 {n} 級'], ev_reb: ['壊れた建物が直った', '損毀的建築修好了'], ev_mig: ['{A}が村に移り住んだ', '{A}移居到村裡'], ev_prep: ['備え：{n}', '備戰：{n}'], ev_council: ['神々の評定会が開かれた', '眾神評定會召開了'], ev_dec: ['神旨の結果：{n}件中{k}件達成', '神旨結果：{n} 件中達成 {k} 件'],
  help_war: ['攻防', '攻防'], help_war_body: ['この世は10年。2〜3年ごとに魔物の大群、5年目に巨竜、10年目に魔王が攻めてきます。\n上の「次の攻防」欄で、いつ・誰が来るか・予測勝率が見えます。\nBキーで「村の守り」を開き、防壁・武器・修行・補給・加護などの備えをしましょう。\n攻防は3段階。段階ごとに一度だけ神の力で干渉できます（見守るのも、魔物に味方するのも自由）。\n勝てば村が育ち、英雄が生まれます。負けると建物が壊れ、人が減り、次の敵が強くなります。', '這一世共 10 年：每 2～3 年一次魔物大軍，第 5 年巨龍，第 10 年魔王進攻。\n上方「下一場攻防」欄會顯示何時、誰會來、預測勝率。\n按 B 開啟「村莊防衛」，用防壁、武器、修行、補給、加護等方式備戰。\n攻防分 3 階段，每階段可用神力干涉一次（也可以旁觀，或幫魔物一把）。\n贏了村莊會發展、英雄會誕生；輸了建築損毀、人口減少，下一個敵人會更強。'],
});
const fmtLeft = dt => { const L = li(); if (dt <= 0) return t('war_now'); const y = Math.floor(dt / TICK_YEAR), s = Math.floor((dt % TICK_YEAR) / SEASON_T), d = Math.ceil((dt % SEASON_T) / TICK_DAY); return t('war_in') + ' ' + (y ? fmt(t('war_y'), { n: y }) : '') + (s ? fmt(t('war_s'), { n: s }) : '') + (!y && !s ? fmt(t('war_d'), { n: Math.max(1, d) }) : ''); };
const pct = v => Math.round(v * 100);
/* ---------- HUD: next assault bar + era card panel ---------- */
UI.buildWar = function () {
  const E = this.el, root = $('ui'); if (!root) return;
  E.warBar = h('div', { class: 'win glass', style: 'left:440px;top:62px;width:400px;height:34px;padding:2px 8px;display:flex;align-items:center;gap:6px;cursor:pointer;font-size:14px', onclick: () => Screens.defense() });
  E.warTxt = h('span', { style: 'flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis' }); E.warP = h('b', { style: 'font-size:15px' });
  E.warBar.append(Ico('battle', 16), E.warTxt, E.warP, h('span', { class: 'btn', style: 'font-size:11px;padding:0 6px' }, t('war_open')));
  Tip.attach(E.warBar, () => [t('tip_war'), t('tip_war_d')]);
  E.cardWin = h('div', { class: 'win glass', style: 'left:440px;top:100px;width:400px;padding:3px 8px;display:none' });
  root.append(E.warBar, E.cardWin); this.warHist = [];
};
UI.refreshWar = function () {
  const E = this.el; if (!E.warBar || !G || !G.assaults) return; const L = li(); const a = nextAssault();
  if (!a) { E.warTxt.textContent = t('war_none'); E.warP.textContent = ''; }
  else {
    const p = winProb(a); const dayKey = Math.floor(G.tick / TICK_DAY); if (this.warDay !== dayKey) { this.warDay = dayKey; this.warHist.push(p); if (this.warHist.length > 3) this.warHist.shift(); }
    const prev = this.warHist.length > 1 ? this.warHist[0] : p; const arr = p > prev + 0.01 ? ' ▲' : p < prev - 0.01 ? ' ▼' : '';
    E.warTxt.textContent = ASSAULT_DEF[a.id].short[L] + '｜' + fmtLeft(a.t - G.tick); E.warP.textContent = t('war_pred') + ' ' + pct(p) + '%' + arr; E.warP.style.color = p >= 0.6 ? '#9affb0' : p >= 0.4 ? '#ffe9a0' : '#ff9a9a';
    E.warBar.style.borderImage = ''; E.warBar.style.outline = a.t - G.tick <= SEASON_T ? '2px solid #ff7050' : 'none';
  }
  // era card
  const c = (G.cards || [])[0]; const sig = c ? c.n + LANG + ['push', 'stop'].map(k => { const o = CARDS[c.id].opts[k]; return o && o.cost && G.faith < o.cost ? 0 : 1; }).join('') : ''; // re-draw when affordability changes
  if (sig !== this.cardSig) { this.cardSig = sig; E.cardWin.innerHTML = ''; E.cardWin.style.display = c ? 'block' : 'none';
    if (c) { const C = CARDS[c.id]; E.cardWin.append(h('div', { class: 'gold', style: 'font-weight:bold;font-size:14px' }, '◆ ' + t('card_title') + '：' + C.n[L]), h('div', { class: 'sm', style: 'margin:2px 0' }, C.d[L]));
      const row = h('div', { style: 'display:flex;gap:6px;flex-wrap:wrap' }); ['push', 'stop'].forEach(k => { const o = C.opts[k]; if (!o) return; const dis = o.cost && G.faith < o.cost; const b = h('span', { class: 'btn' + (dis ? ' dis' : ''), style: 'font-size:12px', title: dis ? fmt(t('card_short'), { n: Math.ceil(o.cost - G.faith) }) : '' }, o.n[L]); cardPress(b, () => { if (o.cost && G.faith < o.cost) { UI.toast(fmt(t('card_short'), { n: Math.ceil(o.cost - G.faith) }), '#ff8a8a'); Snd.se('fail'); return; } decideCard(c.n, k); Snd.se('ok'); UI.cardSig = ''; UI.refreshWar(); }); row.append(b); });
      const lv = h('span', { class: 'btn', style: 'font-size:12px' }, t('card_leave')); cardPress(lv, () => { decideCard(c.n, 'leave'); UI.cardSig = ''; UI.refreshWar(); }); row.append(lv); E.cardWin.append(row); }
  }
  // awe + goal panel
  if (E.aweNum) UI.pxSet(E.aweNum, Math.floor(G.awe) + '/' + G.aweMax, '#e0b0ff', 3);
};
const _uiBuild0 = UI.build; UI.build = function () { _uiBuild0.apply(this, arguments); try { this.buildWar(); this.buildAwe(); } catch (e) { ERRS.push('war ui:' + e.message); } };
const _uiRefresh0 = UI.refresh; UI.refresh = function (f) { _uiRefresh0.apply(this, arguments); try { this.refreshWar(); } catch (e) { } };
UI.buildAwe = function () { const E = this.el; if (!E.faithWin) return; const row = h('div', { style: 'display:flex;align-items:center;gap:6px;font-size:12px;color:#e0b0ff;margin-left:auto' }, h('span', null, t('awe')), E.aweNum = h('span')); E.faithWin.style.position = 'absolute'; const line = E.faithWin.children[1]; line.style.gap = '10px'; line.style.justifyContent = 'flex-start'; line.appendChild(row); /* A suggestion 2: in the flow, no overlap with the fatigue text */ Tip.attach(row, () => [t('tip_awe'), t('tip_awe_d')]); };
/* goal panel: defense vs threat */
const _goal0 = UI.refreshGoal; UI.refreshGoal = function () {
  _goal0.apply(this, arguments); const R = this.goalR; if (!R || !G || !G.assaults) return; const a = nextAssault();
  if (!R.v4) { R.v4 = 1; R.b2.row.firstChild.textContent = t('gb_def'); R.b3.row.firstChild.textContent = t('gb_thr'); R.b2.b.style.background = 'linear-gradient(#80ff90,#20b040)'; R.b3.b.style.background = 'linear-gradient(#ff9a9a,#c03030)'; Tip.attach(R.b2.row, () => [t('tip_def'), t('tip_def_d'), Math.round(defenseScore()) + ' / 100']); Tip.attach(R.b3.row, () => { const a2 = nextAssault(); return [t('tip_thr'), t('tip_thr_d'), a2 ? Math.round(threatOf(a2)) + '' : '-']; }); }
  R.text.textContent = a ? fmt(t('goal_v4'), { n: ASSAULT_DEF[a.id].short[li()] }) : t('war_none');
  R.b2.b.style.width = clamp(defenseScore(), 0, 100).toFixed(0) + '%'; R.b3.b.style.width = a ? clamp(threatOf(a), 0, 100).toFixed(0) + '%' : '0%';
};
/* ---------- defense screen (D) ---------- */
Screens.defense = function () {
  if (!G || !G.assaults) return; const L = li();
  this.push('defense', () => {
    const a = nextAssault(); const parts = defenseParts(); const D = defenseScore(parts);
    const bar = (lab, v, col, tip) => { const r = h('div', { style: 'display:flex;align-items:center;gap:6px;margin:2px 0' }, h('span', { style: 'width:78px' }, lab), h('div', { class: 'gauge', style: 'flex:1;height:10px;border-width:1px' }, h('i', { style: `width:${clamp(v, 0, 100)}%;background:${col}` })), h('span', { style: 'width:30px;text-align:right' }, Math.round(v))); if (tip) Tip.attach(r, () => tip); return r; };
    const head = a ? h('div', { style: 'display:flex;justify-content:space-between;align-items:center' }, h('div', null, h('div', { class: 'gold', style: 'font-size:20px;font-weight:bold' }, assaultName(a, L)), h('div', null, fmtLeft(a.t - G.tick))), (() => { const f = winForecast(a); const col = v => v >= 0.6 ? '#9affb0' : v >= 0.3 ? '#ffe9a0' : '#ff9a9a'; return h('div', { style: 'text-align:right' }, h('div', { class: 'sm' }, t('war_pred')), h('div', { style: 'font-size:26px;font-weight:bold' }, h('span', { style: 'color:' + col(f.now) }, t('fc_now') + ' ' + pct(f.now) + '%'), h('span', { style: 'font-size:16px' }, ' → '), h('span', { style: 'font-size:20px;color:' + col(f.then) }, t('fc_then') + ' ' + pct(f.then) + '%'))); })()) : h('div', null, t('war_none'));
    // timeline
    const tl = h('div', { style: 'display:flex;gap:6px;margin:6px 0' }, G.assaults.map(x => { const done = x.state === 'done'; const gn = x.grade ? (x.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[x.grade][L]) : ''; const col = !done ? '#cfcfe6' : ['crush', 'win', 'pyrrhic', 'pact'].indexOf(x.grade) >= 0 ? '#9affb0' : '#ff9a9a';
      return h('div', { class: 'card', style: 'flex:1;cursor:default;' + (x === a ? 'border-color:#ffe060' : '') }, h('div', { style: 'font-size:12px;font-weight:bold' }, ASSAULT_DEF[x.id].short[L]), h('div', { class: 'sm' }, fmt(t('war_y'), { n: ((x.t - START_TICK) / TICK_YEAR).toFixed(1) })), h('div', { style: 'font-size:12px;color:' + col }, done ? gn : t('st_wait'))); }));
    const chain = []; if (G.chain.dragonType) chain.push(S.dragon_type[G.chain.dragonType][L]); if (G.chain.dragonOutcome) chain.push(S.ch_king[G.chain.dragonOutcome][L]); if (G.assaults[3].state === 'done') chain.push(fmt(t('ch_cad'), { n: G.chain.cadres }));
    const left = h('div', { style: 'width:420px' }, head, h('h3', null, t('def_timeline')), tl, chain.length ? h('div', { class: 'sm' }, '▸ ' + chain.join('／')) : null,
      h('h3', { style: 'margin-top:6px' }, t('def_parts') + '　' + Math.round(D)),
      ...['combat', 'works', 'morale', 'supply', 'divine'].map(k => bar(t('dp_' + k), parts[k], 'linear-gradient(#80ff90,#20b040)', [t('dp_' + k), t('dpd_' + k)])),
      a ? h('h3', { style: 'margin-top:6px' }, t('def_threat') + '　' + Math.round(threatOf(a))) : null,
      a ? bar(t('def_threat'), threatOf(a), 'linear-gradient(#ff9a9a,#c03030)', [t('tip_thr'), t('tip_thr_d')]) : null,
      h('div', { class: 'sm', style: 'margin-top:4px' }, fmt(t('dev_lv'), { n: DEV_N[devLevel()][L] }) + '　' + fmt(t('walls_lv'), { n: G.walls }) + '　' + fmt(t('ruins_n'), { n: Object.keys(G.ruins).length })));
    const adv = advisorPreps(3).map(x => x.id);
    const acts = h('div', { class: 'scroll', style: 'height:430px' }, PREP_ORDER.map(id => { const P = PREP[id]; const lvOk = (G.godLv || 1) >= P.lv; const av = prepAvailable(id); const d = av ? prepDelta(id) : 0;
      return h('div', { class: 'card', style: 'cursor:default;' + (adv.indexOf(id) >= 0 && av ? 'border-color:#ffe060' : '') + (av ? '' : ';opacity:.55') }, h('div', { style: 'display:flex;justify-content:space-between;gap:6px' }, h('b', { style: 'font-size:13px' }, (adv.indexOf(id) >= 0 && av ? '★ ' : '') + P.n[L]), h('span', { class: 'sm' }, P.cost ? fmt(t('act_cost'), { n: P.cost }) : P.awe ? fmt(t('act_awe'), { n: P.awe }) : '')),
        h('div', { class: 'sm' }, P.d[L]), h('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-top:2px' }, h('span', { style: 'font-size:12px;color:' + (d > 0 ? '#9affb0' : '#cfcfe6') }, av ? (d >= 0 ? '+' : '') + Math.round(d * 100) + '%' : (lvOk ? t('act_lock') : fmt(t('act_lock_lv'), { n: P.lv }))), av ? h('span', { class: 'btn', style: 'font-size:12px', onclick: () => { if (doPrep(id)) { Snd.se('divine'); UI.refresh(true); Screens.rerender(); } } }, t('act_do')) : null)); }));
    const lv = G.godLv || 1; const nx = GOD_LV_XP[lv] !== undefined ? GOD_LV_XP[lv] - (G.godXp || 0) : 0;
    const dec = (G.decrees || []).filter(d => d.state === 'active').map(d => h('div', { class: 'sm' }, '◇ ' + DECREES[d.id].n[L]));
    const right = h('div', { style: 'flex:1' }, h('h3', null, t('def_actions') + '　' + t('faith') + ' ' + Math.floor(G.faith) + '／' + t('awe') + ' ' + Math.floor(G.awe)), acts,
      h('div', { style: 'margin-top:6px' }, h('b', { class: 'gold' }, fmt(t('god_lv'), { n: lv })), h('span', { class: 'sm' }, '　' + (nx > 0 ? fmt(t('god_next'), { n: nx }) : '')), h('div', { class: 'sm' }, t('god_skills') + '：' + Object.keys(GOD_SKILL).filter(k => +k <= lv).map(k => GOD_SKILL[k][L]).join('・')), dec.length ? h('div', { class: 'sm gold', style: 'margin-top:3px' }, t('decrees_now')) : null, ...dec));
    return this.win(80, 30, 1120, 660, [h('h3', null, t('def_title')), h('div', { style: 'display:flex;gap:18px' }, left, right), h('div', { style: 'text-align:center;margin-top:6px' }, h('span', { class: 'btn', onclick: () => this.pop() }, t('close')))]);
  }, e => { if (e.key === 'b' || e.key === 'B') { this.pop(); return true; } });
};
/* ---------- battle ---------- */
function battleSceneCanvas(B) {
  const cv = document.createElement('canvas'); cv.width = 600; cv.height = 150; cv.style.cssText = 'width:1000px;height:250px;image-rendering:pixelated;display:block;margin:0 auto;border:2px solid #f2f4ff'; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false;
  const kind = ASSAULT_DEF[B.a].kind; const gr = c.createLinearGradient(0, 0, 0, 150); const sky = kind === 'king' ? ['#1a0830', '#5a1a4a'] : kind === 'dragon' ? ['#2a1a2a', '#8a3a2a'] : ['#1a2a4a', '#4a6a8a']; gr.addColorStop(0, sky[0]); gr.addColorStop(1, sky[1]); c.fillStyle = gr; c.fillRect(0, 0, 600, 150);
  c.fillStyle = '#3a5a2a'; c.fillRect(0, 112, 600, 38); c.fillStyle = '#2a4a1e'; for (let x = 0; x < 600; x += 7) c.fillRect(x, 112 + (x % 3), 3, 1);
  // village side: palisade + defenders
  for (let x = 6; x < 70; x += 6) { c.fillStyle = '#5a3a22'; c.fillRect(x, 86 - (G.walls >= 3 ? 6 : 0), 4, 28 + (G.walls >= 3 ? 6 : 0)); c.fillStyle = '#8a5a30'; c.fillRect(x, 84 - (G.walls >= 3 ? 6 : 0), 4, 3); }
  const win = B.done && isWin(B.grade), lost = B.done && !win; const adv = Math.min(B.phase, 2) * 22;
  const advs = G.humans.filter(isAdv).sort((x, y) => advPower(y) - advPower(x)).slice(0, 5);
  advs.forEach((hh, i) => { const x = 80 + i * 34 + (win ? 60 : lost ? -20 : adv), y = 76 + (i % 2) * 10; const sp = SPR_READY && (SPR[humanSprBase(hh) + '_right_0_hd'] || SPR[humanSprBase(hh) + '_right_0']); if (sp) { c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high'; c.drawImage(sp, x + 16 - 24 * sp.width / sp.height, y, 48 * sp.width / sp.height, 48); c.imageSmoothingEnabled = false; } else { const s = humanSprite(hh, 3, (B.phase + i) % 2 ? 5 : 0); c.drawImage(s, x, y, 32, 48); } });
  if (lost) { for (let i = 0; i < 4; i++) { const fx = 20 + i * 15, fy = 80; c.fillStyle = '#ff8a2a'; c.fillRect(fx, fy - (i % 2) * 6, 6, 10); c.fillStyle = '#ffd24a'; c.fillRect(fx + 1, fy + 3 - (i % 2) * 6, 3, 5); } c.fillStyle = 'rgba(60,50,50,0.45)'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(24 + i * 9, 70 - i * 7, 7 + i * 1.5, 0, 7); c.fill(); } }
  // enemy side
  const mon = ASSAULT_DEF[B.a].mon;
  if (mon === 'dragon') { const s = enemyBattleSprite('dragon', B.phase % 2) || dragonSprite(B.phase % 2); c.drawImage(s, 420 + (win ? 30 : 0) - (B.done ? 0 : adv), 22, 96, 96); }
  else if (mon === 'boss') { for (let i = 0; i < Math.min(3, G.chain.cadres || 2); i++) { const s = enemyBattleSprite(['verna', 'garum', 'serene'][i], B.phase % 2); if (s) c.drawImage(s, 330 + i * 46, 112 - s.height * 0.75, s.width * 0.75, s.height * 0.75); } const ks = enemyBattleSprite('king', B.phase % 2); if (ks) c.drawImage(ks, 486, 112 - ks.height, ks.width, ks.height); }
  else { const n = win ? 2 : 7; for (let i = 0; i < n; i++) { const tk = [mon, mon, 'goblin', 'wolf', 'skel', mon, 'bat'][i]; const s = enemyBattleSprite(ENEMY_KEY[tk] || tk, B.phase + i); if (!s) continue; const x = 600 - 70 - i * 38 + (win ? 40 : lost ? -150 : -adv); if (win) { c.save(); c.translate(x + s.width, 0); c.scale(-1, 1); c.drawImage(s, 0, 112 - s.height + (i % 3) * 4); c.restore(); } else c.drawImage(s, x, 112 - s.height + (i % 3) * 4); } }
  // clash flash
  if (B.phase > 0 && !B.done) { c.fillStyle = 'rgba(255,240,180,0.35)'; c.beginPath(); c.arc(300, 95, 24 + B.phase * 6, 0, 7); c.fill(); }
  return cv;
}
Screens.battle = function () {
  const L = li();
  this.push('battle', () => {
    const B = G.battle; if (!B) return h('div');
    const a = G.assaults.find(x => x.id === B.a); const kind = ASSAULT_DEF[B.a].kind;
    const kids = [h('h3', null, t('bt_title') + '：' + assaultName(a, L)), battleSceneCanvas(B)];
    if (!B.done) {
      const live = sigm((B.D - B.T + B.bonus + 3 + B.partial.reduce((s, v) => s, 0)) / WIN_K);
      kids.push(h('div', { style: 'display:flex;gap:16px;align-items:center;margin:8px 0' }, h('div', { style: 'flex:1' }, h('div', { class: 'sm' }, t('gb_def') + ' ' + Math.round(B.D)), h('div', { class: 'gauge', style: 'height:12px' }, h('i', { style: `width:${clamp(B.D, 0, 100)}%;background:linear-gradient(#80ff90,#20b040)` }))), h('div', { style: 'flex:1' }, h('div', { class: 'sm' }, t('gb_thr') + ' ' + Math.round(B.T)), h('div', { class: 'gauge', style: 'height:12px' }, h('i', { style: `width:${clamp(B.T, 0, 100)}%;background:linear-gradient(#ff9a9a,#c03030)` }))), h('div', { style: 'width:150px;text-align:right' }, h('div', { class: 'sm' }, t('war_pred')), h('b', { style: 'font-size:24px' }, pct(live) + '%'))));
      const lines = [B.phase === 0 ? S.bt_intro[kind][L] : '']; B.partial.forEach((p, i) => lines.push(fmt(t('bt_phase'), { n: i + 1, p: PHASE_N[i][L] }) + '　' + (p > 3 ? t('bt_good') : p > -3 ? t('bt_even') : t('bt_bad'))));
      kids.push(h('div', { class: 'par', style: 'padding:8px 14px;min-height:90px;font-size:15px' }, lines.filter(Boolean).map(l => h('p', null, l))));
      if (B.pact) kids.push(h('div', { style: 'text-align:center;margin-top:8px' }, h('p', { class: 'gold' }, t('bt_pact')), h('span', { class: 'btn big', onclick: () => { battleStep('none'); Screens.rerender(); } }, t('bt_next'))));
      else {
        const opts = battleOptions(B.phase); const row = h('div', { style: 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px' }, h('div', { style: 'width:100%;text-align:center', class: 'gold' }, fmt(t('bt_phase'), { n: B.phase + 1, p: PHASE_N[B.phase][L] })));
        opts.forEach(o => { const ok = canIntervene(o); row.append(h('span', { class: 'btn big' + (ok ? '' : ' dis'), style: 'color:#c8ffd0', onclick: () => { if (!ok) { UI.toast(o.cost ? fmt(t('card_short'), { n: Math.ceil(o.cost - G.faith) }) : fmt(t('awe_short'), { n: Math.ceil((o.awe || 0) - G.awe) }), '#ff8a8a'); Snd.se('fail'); return; } battleStep(o.id); Snd.se('divine'); Render.flash = 0.4; Screens.rerender(); } }, o.n[L] + '（' + (o.free ? t('free_once') : o.cost ? fmt(t('act_cost'), { n: o.cost }) : fmt(t('act_awe'), { n: o.awe })) + '）　' + t('war_pred') + ' +' + Math.max(1, Math.round(optEffect(o) * 100)) + '%')); });
        (INTERVENE[B.phase] || []).filter(o => (G.godLv || 1) < o.lv).forEach(o => row.append(h('span', { class: 'btn big dis' }, o.n[L] + '（' + fmt(t('act_lock_lv'), { n: o.lv }) + '）')));
        row.append(h('span', { class: 'btn big', onclick: () => { battleStep('none'); Snd.se('ok'); Screens.rerender(); } }, t('bt_watch')), h('span', { class: 'btn big', style: 'border-color:#c080ff', onclick: () => { battleStep('monsters'); Snd.se('fail'); Screens.rerender(); } }, t('bt_help')));
        kids.push(row);
      }
    } else kids.push(warReport(B, a));
    return this.win(120, 20, 1040, 680, kids);
  }, null, { noEsc: true });
};
function warReport(B, a) {
  const L = li(); const r = B.res || {}; const win = isWin(B.grade); const nm = id => { const e = G.idx[id]; return e ? e.name[L] : '?'; };
  const g = B.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[B.grade][L];
  const lines = [];
  if (r.deaths && r.deaths.length) lines.push(fmt(t('rp_deaths'), { n: r.deaths.length }) + '（' + r.deaths.slice(0, 6).map(nm).join('、') + (r.deaths.length > 6 ? '…' : '') + '）');
  if (r.ruined && r.ruined.length) lines.push(t('rp_ruins') + '：' + r.ruined.map(id => PLACES[W.blds[id].kind][L]).join('、'));
  if (r.levels && r.levels.length) lines.push(t('rp_levels') + '：' + r.levels.slice(0, 5).map(x => nm(x[0]) + ' +' + x[1]).join('、'));
  if (r.titles && r.titles.length) lines.push(t('rp_titles') + '：' + r.titles.map(x => nm(x[0]) + '「' + x[1][L] + '」').join('、'));
  if (r.loot && r.loot.length) lines.push(t('rp_loot') + '：' + r.loot.map(x => x[L]).join('、'));
  if (r.migrants) lines.push(fmt(t('rp_mig'), { n: r.migrants }));
  if (r.dev) lines.push(fmt(t('rp_dev'), { n: DEV_N[devLevel()][L] }));
  const ch = []; if (a.id === 'wave2' && G.chain.dragonType) ch.push(S.ch_dragon[G.chain.dragonType][L]); if (a.id === 'dragon' && G.chain.dragonOutcome) ch.push(S.ch_king[G.chain.dragonOutcome][L]); if (a.id === 'wave3') ch.push(fmt(t('ch_cad'), { n: G.chain.cadres }));
  const nx = nextAssault();
  return h('div', null, h('div', { style: 'text-align:center;font-size:38px;font-weight:bold;color:' + (win ? '#ffe060' : '#ff8080') }, t('rp_title') + '：' + g),
    h('div', { class: 'par', style: 'padding:8px 16px;font-size:15px;line-height:1.6;max-height:230px;overflow-y:auto' }, (B.pact ? [t('bt_pact')] : lines).map(l => h('p', null, '・' + l)), h('p', { style: 'color:#7a4a00;font-weight:bold;margin-top:4px' }, '◆ ' + t('rp_god')), ...godDidLines(B, a).map(l => h('p', { style: 'color:#4a3000' }, '　' + l)), ch.length ? h('p', null, '▸ ' + t('rp_chain') + '：' + ch.join('／')) : null, nx && !G.ending ? h('p', null, '▸ ' + fmt(t('rp_next'), { n: ASSAULT_DEF[nx.id].short[L], p: pct(winProb(nx)) })) : null),
    h('div', { style: 'text-align:center;margin-top:10px' }, h('span', { class: 'btn big', onclick: () => { G.battle = null; Screens.closeAll(); UI.refresh(true); if (G.ending && G.onEnd) G.onEnd(G.ending); } }, t('rp_close'))));
}
/* ---------- council ---------- */
Screens.council = function () {
  const L = li(); let picked = [], edict = null;
  this.push('council', () => {
    const C = G.council; if (!C) return h('div');
    const a = nextAssault(); const yr = Math.floor((G.tick - START_TICK) / TICK_YEAR);
    const rep = h('div', { class: 'sm', style: 'line-height:1.6' }, h('div', null, fmt(t('co_era'), { y: yr, p: G.humans.filter(x => x.alive).length, d: DEV_N[devLevel()][L] })), ...G.assaults.filter(x => x.state === 'done').map(x => h('div', null, '・' + ASSAULT_DEF[x.id].short[L] + '：' + (x.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[x.grade][L]))), a ? h('div', { class: 'gold' }, '▸ ' + assaultName(a, L) + '　' + fmtLeft(a.t - G.tick) + '　' + t('war_pred') + ' ' + pct(winProb(a)) + '%') : null, h('div', null, t('faith') + ' ' + Math.floor(G.faith) + '／' + t('awe') + ' ' + Math.floor(G.awe) + '／' + fmt(t('god_lv'), { n: G.godLv || 1 })));
    const settled = (C.settled || []).length ? h('div', null, h('b', { class: 'gold' }, t('co_settled')), ...C.settled.map(s => h('div', { class: 'sm', style: 'color:' + (s.ok ? '#9affb0' : '#ff9a9a') }, (s.ok ? '○ ' : '× ') + DECREES[s.id].n[L]))) : null;
    const cards = h('div', { style: 'display:flex;gap:10px' }, C.offer.map(id => { const D = DECREES[id]; const on = picked.indexOf(id) >= 0; return h('div', { class: 'card' + (on ? ' sel' : ''), style: 'flex:1;min-height:90px;' + (on ? 'border-color:#ffe060' : ''), onclick: () => { if (on) picked = picked.filter(x => x !== id); else if (picked.length < 2) picked.push(id); else { picked.shift(); picked.push(id); } Snd.se('cursor'); Screens.rerender(); } }, h('div', { class: 'sm gold' }, S.co_side[D.side][L]), h('div', { style: 'font-size:15px;margin-top:4px' }, D.n[L])); }));
    const ed = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' }, h('span', { class: 'btn' + (!edict ? ' on' : ''), onclick: () => { edict = null; Screens.rerender(); } }, t('co_none')), ...Object.keys(EDICTS).map(k => { const E2 = EDICTS[k]; const dis = E2.cost > G.faith; return h('span', { class: 'btn' + (edict === k ? ' on' : '') + (dis ? ' dis' : ''), onclick: () => { if (dis) return; edict = k; Screens.rerender(); } }, E2.n[L] + '：' + E2.d[L]); }));
    return this.win(170, 40, 940, 640, [h('h3', null, t('co_title')), h('div', { style: 'display:flex;gap:20px' }, h('div', { style: 'flex:1' }, h('b', { class: 'gold' }, t('co_report')), rep), h('div', { style: 'flex:1' }, settled)),
      h('h3', { style: 'margin-top:10px' }, t('co_pick') + '（' + picked.length + '/2）'), cards, h('h3', { style: 'margin-top:10px' }, t('co_edict')), ed,
      h('div', { style: 'text-align:center;margin-top:14px' }, h('span', { class: 'btn big' + (picked.length === 2 ? '' : ' dis'), onclick: () => { if (picked.length !== 2) return; closeCouncil(picked, edict); Snd.se('ok'); Screens.closeAll(); UI.refresh(true); } }, t('co_ok')))]);
  }, null, { noEsc: true });
};
/* ---------- event lines for the feed ---------- */
/* B1: card buttons act on pointerdown (a re-render between press and release can no longer swallow the click); the what's-this mode keeps its own handling */
function cardPress(el, f) { let done = 0; el.addEventListener('pointerdown', e => { if (e.button !== 0 || Game.whatMode) return; e.preventDefault(); e.stopPropagation(); done = performance.now(); f(); }); el.addEventListener('click', e => { if (Game.whatMode) return; if (performance.now() - done < 600) return; f(); }); }
function evLineV4(ev) {
  const L = li(); const p = ev.payload || {}; const an = p.a && ASSAULT_DEF[p.a] ? ASSAULT_DEF[p.a].short[L] : '';
  switch (ev.type) {
    case 'assault_omen': return fmt(t('ev_omen' + p.step), { n: an, p: p.p });
    case 'assault_start': return fmt(t('ev_start'), { n: ASSAULT_DEF[p.a].n[L] });
    case 'assault_end': return fmt(t('ev_end'), { n: ASSAULT_DEF[p.a].n[L], g: p.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[p.grade][L] });
    case 'dragon_pact': return t(p.ok ? 'ev_pact_ok' : 'ev_pact_ng');
    case 'hero_born': { const e = G.idx[ev.actors[0]]; return fmt(t('ev_hero'), { A: e ? e.name[L] : '?' }); }
    case 'god_lv': return fmt(t('ev_god'), { n: p.lv });
    case 'dev_change': return fmt(t('ev_dev'), { n: DEV_N[p.lv][L] });
    case 'festival': return t('ev_fest');
    case 'walls_up': return fmt(t('ev_walls'), { n: p.lv });
    case 'rebuilt': return t('ev_reb');
    case 'migrant': { const e = G.idx[ev.actors[0]]; return fmt(t('ev_mig'), { A: e ? e.name[L] : '?' }); }
    case 'prep': return fmt(t('ev_prep'), { n: PREP[p.id] ? PREP[p.id].n[L] : '' });
    case 'council': return t('ev_council');
    case 'decree_settle': return fmt(t('ev_dec'), { n: p.n, k: p.ok });
  }
  return null;
}
/* routine summary every 2 days */
UI.routine = {}; UI.routineDay = -1;
UI.pushRoutine = function (ev) { const k = ev.type; UI.routine[k] = (UI.routine[k] || 0) + 1; };
UI.flushRoutine = function () {
  const d = Math.floor(G.tick / (2 * TICK_DAY)); if (d === UI.routineDay) return; UI.routineDay = d; const L = li(); const ks = Object.keys(UI.routine); if (!ks.length) return;
  const nmOf = k => { const f = EVL[k]; const short = { party_formed: ['依頼に出発', '出發委託'], quest_clear: ['依頼達成', '完成委託'], quest_fail: ['依頼失敗', '委託失敗'], first_battle: ['初陣', '初陣'], prep: ['備え', '備戰'], walls_up: ['防壁', '防壁'], rebuilt: ['修理', '修繕'], coming_of_age: ['成人', '成年'], migrant: ['移住', '移居'], gear: ['装備', '裝備'], quarrel: ['けんか', '吵架'], reconcile: ['仲直り', '和好'], love_notice: ['恋の芽', '情愫'], divine_act: ['神の行い', '神的作為'], prayer_expired: ['届かない祈り', '未回應的祈禱'], monster_raid: ['魔物', '魔物'] }[k]; return short ? short[L] : k; };
  UI.pushFeed(fmt(t('rt_sum'), { s: ks.map(k => nmOf(k) + '×' + UI.routine[k]).join('、') }), '#a8a8c8', null, false); UI.routine = {};
};
/* hooks */
function attachWarHooks() {
  G.uiAttached = true;
  G.onBattle = B => { Game.speedIdx = Math.min(Game.speedIdx, 1); Snd.se('hit'); Render.shake = 4; setTimeout(() => Screens.battle(), 50); };
  G.onBattleEnd = B => { Screens.rerender(); };
  G.onCouncil = C => { setTimeout(() => { if (Game.tut && Game.tut.on) return; Screens.council(); }, 50); }; // during the tutorial the council waits (opened when it ends)
  G.onCard = id => { UI.cardSig = ''; Snd.se('pray'); };
  if (typeof attachV41Hooks === 'function') setTimeout(attachV41Hooks, 0);
}
/* ---------- dragon sprite (48x40) ---------- */
function dragonGrid(f) {
  const g = emptyGrid(48, 40);
  rbox(g, 'c', 14, 18, 22, 14); rbox(g, 't', 18, 26, 14, 6); gline(g, 'c', 34, 22, 44, 14, 4); rbox(g, 'c', 38, 8, 9, 8); rbox(g, 't', 42, 13, 6, 3); gpx(g, 'Y', 41, 10); gpx(g, 'Y', 42, 10); gline(g, 'm', 39, 8, 36, 3, 1); gline(g, 'm', 42, 8, 41, 2, 1);
  gline(g, 'c', 14, 24, 2, 32, 3); gline(g, 'c', 2, 32, 0, 36, 2);
  const wy = f ? 0 : 4; for (let i = 0; i < 4; i++) { gline(g, 'u', 22 + i * 3, 18, 8 + i * 5, wy + i * 2, 1); } rbox(g, 'u', 8, wy + 2, 18, 6); gline(g, 'u', 8, wy + 8, 22, 18, 2);
  rbox(g, 'c', 16, 31, 5, 7); rbox(g, 'c', 28, 31, 5, 7); rbox(g, 'm', 15, 37, 7, 2, true); rbox(g, 'm', 27, 37, 7, 2, true); for (let x = 16; x < 34; x += 4) gpx(g, 'h', x, 18);
  if (f) { gline(g, 'O', 47, 14, 47, 18, 1); gpx(g, 'Y', 46, 15); }
  return g;
}
function dragonSprite(f) { const key = 'dragon.' + f; if (spriteCache[key]) return spriteCache[key]; const R = { c: mkRamp('#c04034'), u: mkRamp('#7a2a3a'), t: mkRamp('#e8b070'), m: mkRamp('#e8e0d0'), h: mkRamp('#f0c040') }; const cv = bakeGrid(dragonGrid(f & 1), 48, 40, R); spriteCache[key] = cv; return cv; }
