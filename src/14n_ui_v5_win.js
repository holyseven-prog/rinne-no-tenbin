/* ================= UI v5 windows (implementation.md §5, §8-4): council (3 choose 2 + at most one edict), battle report
   (outcome first, then losses / damage / divine help / next steps; a defeat is shown as a defeat), and the v5 skin for the other
   in-game windows. Only while playing: the title screen's .win / .btn keep their own look. Rules and data are unchanged. ================= */
Object.assign(S, {
  v5_co_pick: ['次の期間の神旨を2つ選ぶ', '為下一期選擇兩個神旨'], v5_co_toggle: ['選択／解除', '選擇／取消'], v5_co_full: ['2つ選び済み（替えるには1つ外す）', '已選 2 個（要換請先取消一個）'],
  v5_co_edict: ['神勅・任意、1つまで', '神敕・可選，最多一個'], v5_co_edict_d: ['神勅を1つ追加することも、信仰を残すこともできます。', '可以追加一個神敕，也可以保留信仰。'], v5_co_none: ['神勅なし', '不使用神敕'],
  v5_co_foot: ['決定するまで信仰は消費しません', '決定前不扣除信仰'], v5_co_foot2: ['決定すると信仰 {n} を消費します', '決定後將消耗信仰 {n}'], v5_co_ok: ['2つの神旨を決定', '確定兩個神旨'], v5_co_more: ['報告と戦力', '報告與戰力'],
  v5_rp_title: ['防衛戦の報告', '防衛戰報'], v5_rp_win: ['村を守り抜いた', '守住了村莊'], v5_rp_lose: ['戦敗', '戰敗'], v5_rp_win_d: ['戦いは終わりました。被害と再建の必要を確認してください。', '戰鬥已結束，請確認損失與重建需求。'],
  v5_rp_lose_d: ['村は守り切れませんでした。被害を確かめ、次の襲撃に備えてください。', '村莊沒能守住。請確認損失，為下一次來襲做準備。'],
  v5_rp_dead: ['住人の犠牲', '傷亡居民'], v5_rp_bld: ['損壊した建物', '損毀建築'], v5_rp_god: ['神の介入', '神力介入'], v5_rp_none: ['なし', '無'], v5_rp_names: ['名簿', '名單'],
  v5_rp_next: ['次にできること', '接下來可以做什麼'], v5_rp_next_r: ['壊れた建物は住人が直します。防衛画面（B）の「再建の祝福」で早められます。', '損毀的建築會由居民修復，可在防衛畫面（B）用「重建的祝福」加快。'],
  v5_rp_next_p: ['防衛画面（B）で次の襲撃への備えを整えましょう。', '在防衛畫面（B）為下一次來襲做好準備。'], v5_rp_hist: ['戦いの経過は史官の記録で確認できます。', '完整戰鬥經過可於史官紀錄中查看。'],
  v5_rp_foot: ['閉じると元の表示設定に戻ります', '關閉戰報後回到原本的介面顯示設定'], v5_rp_close: ['村へ戻る', '返回村莊'], v5_rp_more: ['詳しい結果', '詳細結果'], v5_chron: ['史官', '史官'],
});
/* ---------- skin for the other in-game windows (only while playing; minimum text 16 px, 44 px buttons) ---------- */
function v5WinCss() { if (typeof document === 'undefined' || document.getElementById('v5wcss')) return; const fr = (k, n) => `border:${n}px solid transparent;border-image:${v5url(k)} ${n} fill stretch;image-rendering:pixelated;background:none`;
  const small = [9, 10, 11, 12, 13, 14, 15].map(n => `#modal.v5play .win [style*="font-size: ${n}px"]`).join(',');
  const css = `
#modal.v5play>.win{${fr('ui_modal', 16)};box-shadow:none;border-radius:0;color:#f6f2e8;font-size:18px;line-height:1.5;padding:6px 14px}
#modal.v5play .win h3{font-size:22px;line-height:33px;color:#f3dfaa;margin:2px 0 6px}
#modal.v5play .win .sm,#modal.v5play .win .dim{font-size:16px} #modal.v5play .win .gold{color:#f3dfaa}
${small}{font-size:16px!important}
#modal.v5play .win .tag,#modal.v5play .win .ink,#modal.v5play .win .kbd,#modal.v5play .win table.tb{font-size:16px}
body.v5on #tip{${fr('ui_tooltip', 16)};font-size:16px;line-height:24px;padding:0 4px;color:#f6f2e8;box-shadow:none;border-radius:0}
#modal.v5play .win .btn{${fr('ui_button_normal', 12)};min-height:44px;padding:0 8px;display:inline-flex;align-items:center;justify-content:center;font-size:18px;color:#f6f2e8;box-shadow:none;border-radius:0;text-shadow:none}
#modal.v5play .win .btn:hover{border-image-source:${v5url('ui_button_hover')}} #modal.v5play .win .btn.on{border-image-source:${v5url('ui_button_selected')};color:#f3dfaa}
#modal.v5play .win .btn.dis{border-image-source:${v5url('ui_button_disabled')};color:#bac3ce}
#modal.v5play .win .menu .btn{display:flex;width:100%;margin:4px 0}
#modal.v5play .win .card{${fr('ui_card_normal', 12)};box-shadow:none;border-radius:0;padding:0 4px;color:#f6f2e8}
#modal.v5play .win .card:hover{border-image-source:${v5url('ui_card_hover')}} #modal.v5play .win .card.sel{border-image-source:${v5url('ui_card_selected')}}
#modal.v5play .win .par{background:#192d40;color:#f6f2e8;border:none;box-shadow:none}
#modal.v5play .win .par *{color:inherit}
.v5choices{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:12px 0 16px}
.v5choice{${fr('ui_card_normal', 12)};min-height:200px;display:flex;flex-direction:column;text-align:left;gap:8px;padding:6px;color:#f6f2e8;font:inherit;cursor:pointer}
.v5choice:hover{border-image-source:${v5url('ui_card_hover')}} .v5choice[aria-pressed=true]{border-image-source:${v5url('ui_card_selected')}}
.v5choice[aria-disabled=true]{opacity:.6;cursor:not-allowed}
.v5choice .seal{display:flex;align-items:center;gap:8px} .v5choice .seal img{width:64px;height:64px;image-rendering:pixelated}
.v5choice[aria-pressed=true] .seal:before{content:'✓';color:#f3dfaa;font-size:22px}
.v5choice[aria-pressed=true] h2{text-decoration:underline;text-underline-offset:5px}
.v5outcome{padding:12px 20px;border-left:4px solid #7ecfcb;background:#192d40} .v5outcome.lose{border-left-color:#ffb19b;background:#3a1d22} .v5outcome.lose h2{color:#ffb19b}
.v5stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:16px 0} .v5stat{padding:12px 16px;background:#192d40} .v5stat strong{font-size:28px;line-height:36px;display:block}
.v5info{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px;font-size:16px;line-height:24px;color:#b6c5d4} .v5info b{color:#f3dfaa;font-size:18px}
`; const st = document.createElement('style'); st.id = 'v5wcss'; st.textContent = css; document.head.appendChild(st); }
const _srV5 = Screens.render; Screens.render = function () { _srV5.apply(this, arguments); const m = $('modal'); if (!m) return; const on = typeof Game !== 'undefined' && Game.scene === 'play' && !!(UI.el && UI.el.v5disp);
  if (on) v5WinCss(); m.classList.toggle('v5play', on); m.style.fontFamily = on ? v5Font() : ''; document.body.classList.toggle('v5on', on); };
const _urV5w = UI.refreshV5; UI.refreshV5 = function () { _urV5w.apply(this, arguments); const on = Game.scene === 'play'; if (document.body.classList.contains('v5on') !== on) { if (on) v5WinCss(); document.body.classList.toggle('v5on', on); } };

/* ---------- council: 3 choose 2 (full = take one out first), at most one edict (default none), nothing is paid before the decision ---------- */
Screens.council = function () { const L = li(); let picked = [], edict = null; const SEAL = ['oracle', 'grace', 'trial'];
  v5Modal('council', t('co_title'), () => { const C = G.council; if (!C) return h('div');
    const cards = h('div', { class: 'v5choices' }, C.offer.map((id, i) => { const D = DECREES[id], M = DEC_META[id] || { d: 2, j: ['', ''] }; const on = picked.indexOf(id) >= 0; const full = !on && picked.length >= 2;
      return h('button', { type: 'button', class: 'v5choice', 'aria-pressed': on ? 'true' : 'false', 'aria-disabled': full ? 'true' : 'false', title: full ? t('v5_co_full') : '', onclick: () => { if (on) picked = picked.filter(x => x !== id); else if (picked.length < 2) picked.push(id); else { Snd.se('fail'); return; } /* the card itself says why */ Snd.se('cursor'); Screens.rerender(); } },
        h('div', { class: 'seal' }, h('img', { src: v5img('icon_power_' + SEAL[i % 3] + '_64'), alt: '' }), h('h2', { style: 'font-size:20px' }, S.co_side[D.side][L])),
        h('p', { style: 'margin:0;font-size:18px' }, D.n[L]),
        h('span', { class: 'small' }, t('co_diff') + ' ' + '★'.repeat(M.d) + '☆'.repeat(3 - M.d) + '　' + fmt(t('co_xp'), { n: 30 })), M.j[L] ? h('span', { class: 'small' }, t('co_judge') + '：' + M.j[L]) : null, M.p ? h('span', { class: 'small', style: 'color:#9ed7e4' }, t('co_prog') + '：' + M.p()) : null,
        h('span', { class: 'small', style: 'margin-top:auto' }, full ? t('v5_co_full') : t('v5_co_toggle'))); }));
    const eds = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 4px' }, v5btn(t('v5_co_none'), () => { edict = null; Screens.rerender(); }, { 'aria-pressed': edict ? 'false' : 'true' }),
      ...Object.keys(EDICTS).map(k => { const E2 = EDICTS[k]; const short = E2.cost > G.faith; return v5btn(E2.n[L] + '：' + E2.d[L] + (short ? '（' + t('v5_no_faith') + '）' : ''), () => { if (short) { Snd.se('fail'); return; } edict = edict === k ? null : k; Screens.rerender(); }, { 'aria-pressed': edict === k ? 'true' : 'false', 'aria-disabled': short ? 'true' : 'false' }); }));
    /* the old report / last period / forces, below the choice */
    const a = nextAssault(); const fc = a ? winForecast(a) : null; const yr = Math.floor((G.tick - START_TICK) / TICK_YEAR);
    const from = G.period ? G.period.from : START_TICK; const big = G.events.filter(e => e.t >= from && (feedClass(e) === 'S' || feedClass(e) === 'A') && e.type !== 'council').slice(-3).map(e => evLineV4(e) || evLine(e)).filter(Boolean);
    const info = h('div', { class: 'v5info' },
      h('div', null, h('b', null, t('co_report')), h('div', null, fmt(t('co_era'), { y: yr, p: G.humans.filter(x => x.alive).length, d: DEV_N[devLevel()][L] })), ...G.assaults.filter(x => x.state === 'done').map(x => h('div', null, '・' + ASSAULT_DEF[x.id].short[L] + '：' + (x.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[x.grade][L]))),
        ...(C.settled || []).map(s => h('div', { style: 'color:' + (s.ok ? '#9ed7e4' : '#ffb19b') }, (s.ok ? '○ ' : '× ') + DECREES[s.id].n[L]))),
      h('div', null, h('b', null, t('co_last')), ...(big.length ? big : ['—']).map(l => h('div', null, '・' + l))),
      h('div', null, h('b', null, t('co_force')), h('div', null, t('gb_def') + ' ' + Math.round(defenseScore()) + '／' + (a ? t('gb_thr') + ' ' + Math.round(threatOf(a)) : '')), a ? h('div', null, assaultName(a, L) + '　' + fmtLeft(a.t - G.tick)) : null, fc ? h('div', { style: 'color:#f6f2e8' }, t('fc_now') + ' ' + pct(fc.now) + '% → ' + t('fc_then') + ' ' + pct(fc.then) + '%') : null));
    return h('div', null, h('div', { style: 'display:flex;justify-content:space-between;align-items:center' }, h('h2', null, t('v5_co_pick')), h('span', { class: 'cream', style: 'font-size:20px' }, picked.length + ' / 2')), cards,
      h('h3', null, t('v5_co_edict')), h('p', { class: 'small', style: 'margin:0' }, t('v5_co_edict_d')), eds, h('h3', { style: 'margin-top:16px' }, t('v5_co_more')), info); },
  () => { const cost = edict ? EDICTS[edict].cost : 0; return [h('span', { class: 'small' }, cost ? fmt(t('v5_co_foot2'), { n: cost }) : t('v5_co_foot')),
    v5btn(t('v5_co_ok'), () => { if (picked.length !== 2) { Snd.se('fail'); return; } closeCouncil(picked, edict); Snd.se('ok'); Screens.closeAll(); UI.refresh(true); }, picked.length === 2 ? {} : { 'aria-disabled': 'true', disabled: 'disabled' })]; },
  { noEsc: true, noClose: true }); };

/* ---------- battle report: outcome, then losses, damage, divine help, next steps (everything the old report listed stays) ---------- */
warReport = function (B, a) { const L = li(); const r = B.res || {}; const win = isWin(B.grade); const nm = id => { const e = G.idx[id]; return e ? e.name[L] : '?'; };
  const g = B.grade === 'pact' ? S.dragon_out.pact[L] : GRADE_N[B.grade][L]; const ruined = r.ruined || [], deaths = r.deaths || [];
  const helps = (B.choices || []).filter(c => c !== 'none' && c !== 'monsters').length;
  const more = []; if (r.levels && r.levels.length) more.push(t('rp_levels') + '：' + r.levels.slice(0, 5).map(x => nm(x[0]) + ' +' + x[1]).join('、'));
  if (r.titles && r.titles.length) more.push(t('rp_titles') + '：' + r.titles.map(x => nm(x[0]) + '「' + x[1][L] + '」').join('、')); if (r.loot && r.loot.length) more.push(t('rp_loot') + '：' + r.loot.map(x => x[L]).join('、'));
  if (r.migrants) more.push(fmt(t('rp_mig'), { n: r.migrants })); if (r.dev) more.push(fmt(t('rp_dev'), { n: DEV_N[devLevel()][L] }));
  const ch = []; if (a.id === 'wave2' && G.chain.dragonType) ch.push(S.ch_dragon[G.chain.dragonType][L]); if (a.id === 'dragon' && G.chain.dragonOutcome) ch.push(S.ch_king[G.chain.dragonOutcome][L]); if (a.id === 'wave3') ch.push(fmt(t('ch_cad'), { n: G.chain.cadres }));
  if (ch.length) more.push(t('rp_chain') + '：' + ch.join('／')); const nx = nextAssault(); if (nx && !G.ending) more.push(fmt(t('rp_next'), { n: ASSAULT_DEF[nx.id].short[L], p: pct(winProb(nx)) }));
  if (ruined.length || deaths.length || r.wallDown) UI.pendingTour = { ids: ruined.slice(), sum: damageSummary(r) }; /* the damage tour after closing, as before */
  const close = () => { G.battle = null; Screens.closeAll(); UI.refresh(true); if (G.ending && G.onEnd) G.onEnd(G.ending); };
  const stat = (lab, n, sub) => h('div', { class: 'v5stat' }, h('div', null, lab), h('strong', null, String(n)), sub ? h('div', { class: 'small' }, sub) : null);
  const el = h('div', { class: 'v5rep', style: 'font-size:18px;line-height:1.5;color:#f6f2e8' },
    h('div', { class: 'v5outcome' + (win ? '' : ' lose') }, h('h2', null, (win ? t('v5_rp_win') : t('v5_rp_lose')) + '　' + g), h('div', { class: 'muted' }, B.pact ? t('bt_pact') : win ? t('v5_rp_win_d') : t('v5_rp_lose_d'))),
    h('div', { class: 'v5stats' }, stat(t('v5_rp_dead'), deaths.length, deaths.length ? deaths.slice(0, 6).map(nm).join('、') + (deaths.length > 6 ? '…' : '') : t('v5_rp_none')),
      stat(t('v5_rp_bld'), ruined.length + (r.wallDown ? '＋' : ''), ruined.length || r.wallDown ? damageSummary(r) : t('v5_rp_none')), stat(t('v5_rp_god'), helps, godDidLines(B, a)[0] || '')),
    ruined.length ? h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px' }, ...ruined.map(id => h('div', { class: 'small', style: 'text-align:center' }, ruinThumb(id, 52), h('div', null, PLACES[W.blds[id].kind][L])))) : null,
    h('h3', null, t('rp_god')), ...godDidLines(B, a).map(l => h('div', { class: 'small', style: 'color:#f6f2e8' }, '・' + l)),
    more.length ? h('h3', { style: 'margin-top:10px' }, t('v5_rp_more')) : null, ...more.map(l => h('div', { class: 'small', style: 'color:#f6f2e8' }, '・' + l)),
    h('h3', { style: 'margin-top:10px' }, t('v5_rp_next')), h('div', null, ruined.length || r.wallDown ? t('v5_rp_next_r') : t('v5_rp_next_p')), h('div', { class: 'small' }, t('v5_rp_hist')),
    null); el._foot = [h('span', { class: 'small' }, t('v5_rp_foot')), h('div', { style: 'display:flex;gap:8px' }, v5btn(t('v5_chron'), () => Screens.chronicle()), v5btn(t('v5_rp_close'), close))]; el._close = close; return el; };
/* a finished battle shows its report in the v5 window (112,60,1056,600): header, scrolling body, footer with the buttons */
const _btV5 = Screens.battle; Screens.battle = function () { _btV5.apply(this, arguments); const top = this.stack[this.stack.length - 1]; if (!top || top.name !== 'battle') return; const b0 = top.build;
  top.build = () => { const B = G.battle; if (!B || !B.done) return b0(); const a = G.assaults.find(x => x.id === B.a); const rep = warReport(B, a);
    const x = v5btn(v5icon('icon_close_32'), () => rep._close(), { 'aria-label': t('v5_close'), title: t('v5_close'), class: 'v5b v5close' });
    const el = h('section', { class: 'v5m v5mod', role: 'dialog', 'aria-modal': 'true', style: 'position:absolute;font-family:' + v5Font() },
      h('header', null, h('div', null, h('div', { class: 'small cream' }, t('v5_sub')), h('h1', { style: 'font-family:' + v5Serif() }, t('v5_rp_title') + '：' + assaultName(a, li()))), x),
      h('div', { class: 'body' }, rep), h('footer', null, ...rep._foot)); setTimeout(() => { if (!el.contains(document.activeElement)) x.focus(); }, 0); return el; };
  this.render(); };
/* while a window is open, notifications sit under it instead of over its title */
const _toastV5w = UI.toast; UI.toast = function (text, col) { _toastV5w.apply(this, arguments); const el = this.el && this.el.v5toast; if (el) el.style.top = Screens.stack.length ? '664px' : ''; };
