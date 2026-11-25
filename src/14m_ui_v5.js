/* ================= UI v5 (docs/ui_v5/implementation.md, art delivery assets/design/ui_v5, 2026-11-25).
   One top bar, a battle summary, the village news side panel (祈り｜事件｜眷顧｜神旨), five power buttons, a hint line and a map button.
   No per-panel folding: three zones (top / map / bottom) switched from the 表示設定 menu, plus a view mode (U) that remembers the zones.
   The old windows stay alive for their data code (prayer cards, feed, favoured, goals, war bar are moved into the new frames);
   the rest of the old HUD is hidden. Frames are the delivered PNGs at native 1:1 as CSS border-image; text is DOM text. ================= */
Object.assign(S, {
  v5_faith: ['信仰力', '信仰力'], v5_bal: ['光と闇', '光與闇'], v5_lead_l: ['光が優勢 +{n}', '光方優勢 +{n}'], v5_lead_d: ['闇が優勢 +{n}', '闇方優勢 +{n}'], v5_even: ['均衡', '均衡'],
  v5_date1: ['第{g}世・{y}年目・{s}', '第 {g} 世・第 {y} 年・{s}'], v5_date2: ['{d}日目　{h}:00', '第 {d} 日　{h}:00'],
  v5_display: ['表示設定', '介面顯示'], v5_menu: ['メニュー', '選單'], v5_pause: ['一時停止／再開（Space）', '暫停／繼續（Space）'], v5_paused: ['停止中', '暫停中'],
  v5_speed: ['時間の速さ（Q／E）', '時間速度（Q／E）'],
  v5_disp_t: ['表示設定', '介面顯示'], v5_disp_d: ['領域ごとにまとめて切り替えます。', '整區切換，保留您習慣的畫面。'],
  v5_z_top: ['上部情報', '上方資訊'], v5_z_map: ['地図情報', '地圖資訊'], v5_z_bottom: ['下部操作', '下方操作'],
  v5_all: ['すべて表示', '全部顯示'], v5_view: ['景色を見る', '觀景模式'], v5_disp_k: ['U：観覧と操作を切替・Esc：閉じる', 'U：切換觀景／操作・Esc：關閉'], v5_back: ['操作に戻る U', '返回操作 U'],
  v5_news: ['村の便り', '村莊消息'], v5_unread: ['未読 {n}', '未讀 {n}'], v5_tab_pray: ['祈り', '祈禱'], v5_tab_feed: ['事件', '事件'], v5_tab_fav: ['眷顧', '眷顧'], v5_tab_dec: ['神旨', '神旨'],
  v5_ft_pray: ['祈りを選ぶと、対象を確認できます。', '選擇祈禱，即可確認對象與需求。'], v5_ft_feed: ['村で起きたことの記録です。', '村莊裡發生的事情。'],
  v5_ft_fav: ['寵愛する相手は住人の詳細から選べます。', '可從居民資料選擇眷顧對象。'], v5_ft_dec: ['評定会で決めた目標と、いまの目標です。', '評定會決定的目標與目前目標。'],
  v5_map: ['地図', '地圖'], v5_prep: ['備える', '備戰'], v5_no_faith: ['信仰不足', '信仰不足'], v5_na: ['不適用', '不適用'], v5_cost: ['信仰 {n}', '信仰 {n}'],
  v5_hint: ['力を選び、地図の対象を指定してください。', '先選擇力量，再點選地圖上的對象。'],
  v5_dec_none: ['まだ神旨はありません。', '目前還沒有神旨。'], v5_dec_open: ['評定会を開く', '開啟評定會'], v5_goal: ['いまの目標', '目前目標'],
  v5_g1: ['村と記録', '村莊與紀錄'], v5_g2: ['ゲーム', '遊戲'], v5_res: ['住人', '居民'], v5_souls: ['魂', '靈魂'], v5_chron: ['史官', '史官'], v5_eye: ['神眼', '神眼'], v5_counsel: ['助言者', '顧問'],
  v5_menu_foot: ['よく使う操作は画面に、その他の機能はここに。', '常用操作留在畫面，其他功能集中於此。'], v5_resume: ['ゲームへ戻る', '返回遊戲'],
  v5_sub: ['輪廻の天秤・神域の記録', '輪迴之天秤・神域紀錄'], v5_close: ['閉じる', '關閉'], v5_return: ['戻る', '返回'],
  v5_worldmap: ['世界地図', '世界地圖'], v5_map_d: ['クリックした場所へカメラを移動します。', '點擊地圖即可移動鏡頭。'],
  v5_faith_t: ['信仰力の詳細', '信仰力明細'], v5_eye_n: ['神眼 {n}／3', '神眼 {n}／3'], v5_awe_n: ['畏怖 {n}／{m}', '畏怖 {n}／{m}'], v5_fat: ['干渉疲労 {s}', '干涉疲勞 {s}'], v5_fat_none: ['干渉疲労なし', '無干涉疲勞'],
  v5_new: ['新しい知らせがあります', '有新消息'],
});
const V5_ZONES = ['top', 'map', 'bottom'];
const V5 = { viewing: false, before: null, dispOpen: false, speedOpen: false, focusBack: null };
function v5img(k) { return typeof UI_V5_ASSETS !== 'undefined' && UI_V5_ASSETS[k] ? UI_V5_ASSETS[k] : ''; }
function v5url(k) { return 'url("' + v5img(k) + '")'; }
function v5Font() { return LANG === 'ja' ? "'Noto Sans JP','Yu Gothic','Meiryo',sans-serif" : "'Noto Sans TC','Microsoft JhengHei','PingFang TC',sans-serif"; }
function v5Serif() { return LANG === 'ja' ? "'Noto Serif JP','Yu Mincho',serif" : "'Noto Serif TC','PMingLiU',serif"; }
/* zone preference: Game.settings.uiV5 = { version: 1, top, map, bottom } — only three booleans, checked on read; the first v5 run is all on */
function v5Zones() { const st = Game.settings; const z = st.uiV5; const ok = z && typeof z === 'object' && z.version === 1;
  const out = { version: 1, top: !(ok && z.top === false), map: !(ok && z.map === false), bottom: !(ok && z.bottom === false) }; st.uiV5 = out; return out; }
function v5On(k) { return !V5.viewing && v5Zones()[k]; }

/* ---------- styles (scoped to #ui.v5 and the v5 modals; the title screen's .btn / .win are untouched) ---------- */
function v5Css() { if (typeof document === 'undefined' || document.getElementById('v5css')) return; const fr = (k, n) => `border:${n}px solid transparent;border-image:${v5url(k)} ${n} fill stretch;image-rendering:pixelated;background:none`;
  const P = ['oracle', 'grace', 'trial', 'soul', 'force'].map(id => `.v5pow[data-id=${id}]{${fr('power_' + id + '_normal', 12)}}.v5pow[data-id=${id}]:hover,.v5pow[data-id=${id}].rec{border-image-source:${v5url('power_' + id + '_hover')}}.v5pow[data-id=${id}][aria-pressed=true]{border-image-source:${v5url('power_' + id + '_selected')}}.v5pow[data-id=${id}][aria-disabled=true]{border-image-source:${v5url('power_' + id + '_disabled')}}`).join('');
  const css = `
#ui.v5 .v5,.v5m{position:absolute;color:#f6f2e8;font-size:18px;line-height:1.5;pointer-events:auto;box-sizing:border-box}
#ui.v5 .v5 *,.v5m *{box-sizing:border-box}
#ui.v5 .v5old{display:none!important}
#ui.v5 .v5hide{display:none!important}
.v5f{${fr('ui_side_panel', 16)}}
.v5top{${fr('ui_topbar', 16)}}
.v5bat{${fr('ui_battle_normal', 16)}} .v5bat.danger{border-image-source:${v5url('ui_battle_danger')}}
.v5dm{${fr('ui_display_menu', 16)}} .v5mod{${fr('ui_modal', 16)}} .v5note{${fr('ui_notification', 16)}} .v5tip{${fr('ui_tooltip', 16)}}
.v5b{${fr('ui_button_normal', 12)};min-height:44px;min-width:44px;padding:0 8px;color:#f6f2e8;font:inherit;font-size:18px;line-height:20px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap}
.v5b:hover{border-image-source:${v5url('ui_button_hover')}} .v5b:active{border-image-source:${v5url('ui_button_pressed')}}
.v5b[aria-pressed=true]{border-image-source:${v5url('ui_button_selected')};color:#f3dfaa} .v5b[aria-disabled=true],.v5b:disabled{border-image-source:${v5url('ui_button_disabled')};color:#bac3ce;cursor:not-allowed}
.v5 button:focus-visible,.v5m button:focus-visible,.v5m [tabindex]:focus-visible,.v5 [tabindex]:focus-visible{outline:3px solid #9ed7e4;outline-offset:3px}
.v5 .v5ic,.v5m .v5ic{width:32px;height:32px;image-rendering:pixelated;flex:none}
.v5 .muted,.v5m .muted{color:#b6c5d4} .v5 .cream,.v5m .cream{color:#f3dfaa} .v5 .small,.v5m .small{font-size:16px;line-height:24px;color:#b6c5d4}
.v5 kbd,.v5m kbd{font:14px/18px inherit;color:#b6c5d4;border:1px solid #64758b;padding:0 4px;border-radius:2px}
.v5meter{height:5px;background:#080f20;margin-top:4px;position:relative;overflow:hidden} .v5meter>i{position:absolute;left:0;top:0;bottom:0;display:block}
/* top bar */
#v5top{left:8px;top:8px;width:1264px;height:72px;display:flex;align-items:center;gap:20px;padding:0 4px}
#v5top .blk{display:flex;flex-direction:column;justify-content:center;cursor:default}
#v5faith{width:188px;cursor:pointer!important} #v5bal{width:204px} #v5date{width:196px;line-height:22px}
#v5top .val{font-size:27px;line-height:30px;font-variant-numeric:tabular-nums;font-weight:bold} #v5top .val small{font-size:16px;font-weight:normal;color:#b6c5d4}
#v5top .row{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
#v5top .tools{margin-left:auto;display:flex;gap:8px}
#v5speedwrap{position:relative;display:flex;gap:6px}
#v5speedmenu{position:absolute;left:0;top:52px;width:200px;padding:4px;display:flex;flex-direction:column;gap:4px;z-index:40}
#v5speedmenu .v5b{justify-content:flex-start;width:100%}
/* battle summary (the old war bar, re-skinned) */
#ui.v5 #v5war{left:280px;top:92px;width:664px;height:56px;display:flex;align-items:center;gap:10px;padding:0 4px;font-size:18px;cursor:pointer;outline:none!important;box-shadow:none}
#ui.v5 #v5war>span:first-of-type{flex:1;font-weight:bold;color:#f3dfaa} #ui.v5 #v5war b{font-size:18px} #ui.v5 #v5war .v5b{min-height:40px}
#ui.v5 #v5boss{left:280px;top:152px;width:664px;padding:4px 14px;border-color:#ffb19b;background:#101e35}
/* side panel */
#v5side{left:968px;top:96px;width:296px;height:440px;display:flex;flex-direction:column;padding:2px 4px}
#v5side header{display:flex;justify-content:space-between;align-items:center;margin:0 0 10px} #v5side h2{font-size:22px;line-height:33px;margin:0;font-weight:bold}
#v5tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:0 -4px 10px}
.v5tab{${fr('ui_tab_normal', 8)};height:44px;min-height:44px;padding:0;font:inherit;font-size:18px;color:#f6f2e8;cursor:pointer;white-space:nowrap;position:relative}
.v5tab[aria-selected=true]{border-image-source:${v5url('ui_tab_selected')};color:#f3dfaa;text-decoration:underline;text-underline-offset:5px}
.v5tab.unread{border-image-source:${v5url('ui_tab_unread')}} .v5tab[aria-selected=true].unread{border-image-source:${v5url('ui_tab_selected')}}
.v5tab i{position:absolute;right:-6px;top:-10px;font-style:normal;font-size:14px;line-height:18px;min-width:18px;padding:0 3px;border-radius:9px;background:#ffb19b;color:#080f20;font-weight:bold}
#ui #v5list .card>.btn{float:right!important;margin:0 0 2px 6px!important}
#v5list{flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#bea271 #080f20;padding-right:2px}
#v5side footer{border-top:1px solid #536078;padding-top:6px;margin-top:6px;font-size:16px;line-height:24px;color:#b6c5d4}
#ui #v5list .card{${fr('ui_card_normal', 12)}!important;display:block;margin:0 0 8px!important;padding:0 2px!important;font-size:18px!important;line-height:1.45;color:#f6f2e8;box-shadow:none!important;border-radius:0!important;outline:none!important}
#ui #ui #v5list .card:hover{border-image-source:${v5url('ui_card_hover')}!important} #ui #v5list .card.u2{border-image-source:${v5url('ui_card_urgent')}!important}
#ui #v5list .card.sel,#v5list .card.psel{border-image-source:${v5url('ui_card_selected')}!important}
#ui #v5list .card div,#v5list .card span{font-size:16px!important;line-height:1.45!important} #ui #v5list .card b{font-size:18px!important} #ui #v5list .card .gauge{height:5px!important}
#ui #v5list .card div[style*="height: 32px"]{height:auto!important}
#ui #v5list .btn{${fr('ui_button_normal', 12)}!important;min-height:44px;display:inline-flex!important;align-items:center;justify-content:center;font-size:16px!important;padding:0 6px!important;color:#f6f2e8;box-shadow:none!important;border-radius:0!important;margin-top:0!important}
#ui #v5list .btn:hover{border-image-source:${v5url('ui_button_hover')}!important} #ui #v5list .btn.dis{border-image-source:${v5url('ui_button_disabled')}!important;color:#bac3ce}
#ui #v5list .btn.on{border-image-source:${v5url('ui_button_selected')}!important}
#ui #v5list .sm,#v5list .dim{font-size:16px!important;line-height:24px} #ui #v5list h3{font-size:18px!important;margin:4px 0!important;color:#f3dfaa}
#ui #v5list .v5page>*{position:static!important;left:auto!important;top:auto!important;width:auto!important;height:auto!important;max-height:none!important;border:none!important;background:none!important;box-shadow:none!important;padding:0!important;margin-left:0!important;margin-right:0!important;backdrop-filter:none!important;overflow:visible!important}
#ui #v5list .ecard{${fr('ui_card_urgent', 12)}!important;padding:0 2px!important;margin-bottom:8px!important}
#ui #v5list .ecard>div:first-child{white-space:normal!important;font-size:18px!important} #v5list .ecard>div.sm{display:block!important}
#ui #v5list .ecard>div:last-child{display:flex;flex-wrap:wrap!important;gap:6px!important}
#ui #v5list .gauge{border-width:1px}
.v5dec{margin-bottom:8px} .v5dec .side{font-size:16px;color:#b6c5d4}
/* powers, hint, map button */
#v5pow{left:160px;top:596px;width:784px;height:112px;display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.v5pow{position:relative;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;color:#f6f2e8;font:inherit;cursor:pointer}
.v5pow .nm{font-size:20px;line-height:28px;white-space:nowrap} .v5pow .cs{font-size:18px;line-height:24px;color:#b6c5d4} .v5pow[aria-disabled=true] .cs{color:#ffb19b}
.v5pow kbd{position:absolute;right:0;top:0}
${P}
#v5hint{left:160px;top:564px;width:784px;height:24px;text-align:center;color:#fff4d8;text-shadow:1px 1px #000,-1px -1px #000,1px -1px #000,-1px 1px #000;font-size:16px;line-height:24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none!important}
#v5mapb{left:16px;top:644px;width:128px;height:64px}
/* display menu, view mode */
#v5disp{right:16px;top:92px;width:320px;padding:4px;z-index:30} #v5disp h2{font-size:22px;line-height:33px;margin:0 0 4px} #v5disp .v5b{width:100%;margin:4px 0;justify-content:flex-start}
#v5disp .pair{display:flex;gap:8px} #v5disp .pair .v5b{justify-content:center}
#v5compact{left:16px;top:16px;width:560px;height:48px;display:flex;align-items:center;gap:24px;padding:0 4px;font-size:18px;z-index:25}
#v5restore{right:16px;top:16px;min-width:160px;height:48px;z-index:31}
#ui.v5 #v5toast{left:320px;top:156px;width:640px;padding:0 6px;font-size:18px;line-height:28px;z-index:35;pointer-events:none!important;text-align:center}
#ui.v5 .v5sel{border:16px solid transparent!important;border-image:${v5url('ui_side_panel')} 16 fill stretch!important;background:none!important;font-size:16px!important;box-shadow:none!important}
#ui.v5 .v5ban{left:320px!important;top:168px!important;width:640px!important;pointer-events:none!important;border:16px solid transparent!important;border-image:${v5url('ui_notification')} 16 fill stretch!important;background:none!important;box-shadow:none!important}
/* modal */
.v5m{left:112px;top:60px;width:1056px;height:600px;display:flex;flex-direction:column;padding:12px 20px}
.v5m>header{display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;border-bottom:1px solid #64758b}
.v5m h1{font-size:28px;line-height:42px;margin:0;letter-spacing:2px;font-weight:bold} .v5m h2{font-size:22px;line-height:33px;margin:0} .v5m h3{font-size:20px;line-height:30px;margin:0}
.v5m>.body{flex:1;overflow:auto;padding:20px 0;scrollbar-width:thin;scrollbar-color:#bea271 #080f20}
.v5m>footer{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid #64758b;padding-top:12px}
.v5grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px} .v5grid h2{grid-column:1/-1;margin-top:4px} .v5grid .v5b{height:60px;font-size:20px}
`;
  const st = document.createElement('style'); st.id = 'v5css'; st.textContent = css; document.head.appendChild(st); }

/* ---------- small DOM helpers ---------- */
function v5btn(label, onclick, opt) { const b = h('button', Object.assign({ class: 'v5b', type: 'button', onclick: ev => { ev.stopPropagation(); onclick(ev); } }, opt || {}), label); return b; }
function v5icon(k) { return h('img', { class: 'v5ic', src: v5img(k), alt: '' }); }
function v5date() { const tk = G.tick, L = li(); return [fmt(t('v5_date1'), { g: G.gen || 1, y: yearOf(tk), s: S.season[L][seasonOf(tk)] }), fmt(t('v5_date2'), { d: (dayIdx(tk) % DAYS_YEAR) % 3 + 1, h: hourOf(tk) })]; }
function v5setText(el, s) { if (el && el.textContent !== s) el.textContent = s; }

/* ---------- build: runs after every other UI.build wrapper ---------- */
const _ubV5 = UI.build; UI.build = function () { _ubV5.apply(this, arguments); try { UI.buildV5(); } catch (e) { ERRS.push('ui v5:' + e.message); } };
UI.buildV5 = function () {
  const E = this.el, root = $('ui'); if (!root || !E.prayWin) return; v5Css(); v5Zones(); root.classList.add('v5'); root.classList.remove('hideui'); Game.hideUI = false; root.style.fontFamily = v5Font();
  /* old HUD: hidden (data code keeps writing into it) */
  [E.faithWin, E.balWin, E.timeWin, E.miniWin, E.rightWin, E.powWin, E.infoWin, E.utilWin, E.targetBar].forEach(w => w && w.classList.add('v5old'));
  /* --- top bar --- */
  const top = h('section', { id: 'v5top', class: 'v5 v5top', 'data-zone': 'top' });
  E.v5faith = h('div', { id: 'v5faith', class: 'blk', tabindex: 0, role: 'button', onclick: () => v5FaithModal(), onkeydown: ev => { if (ev.key === 'Enter') v5FaithModal(); } },
    h('div', { class: 'row' }, h('span', null, t('v5_faith')), E.v5fv = h('span', { class: 'val' })), h('div', { class: 'v5meter' }, E.v5fm = h('i', { style: 'background:#7ecfcb' })));
  Tip.attach(E.v5faith, () => faithTip());
  E.v5bal = h('div', { id: 'v5bal', class: 'blk' }, h('div', { class: 'row' }, h('span', null, t('v5_bal')), E.v5bl = h('span', { class: 'small' })), h('div', { class: 'v5meter', style: 'background:#a59bde' }, E.v5bm = h('i', { style: 'background:#e2c77e' })));
  Tip.attach(E.v5bal, () => [t('tip_bal'), t('tip_bal_d')]);
  E.v5date = h('div', { id: 'v5date', class: 'blk' }, E.v5d1 = h('div'), E.v5d2 = h('div', { class: 'small' }));
  E.v5pause = v5btn(v5icon('icon_pause_32'), () => { Snd.se('ok'); Game.paused = !Game.paused; UI.refresh(true); }, { 'aria-label': t('v5_pause'), title: t('v5_pause') });
  E.v5speed = v5btn('×1', () => v5Speed(!V5.speedOpen), { 'aria-label': t('v5_speed'), 'aria-haspopup': 'true', 'aria-expanded': 'false', style: 'min-width:64px' });
  E.v5speedMenu = h('div', { id: 'v5speedmenu', class: 'v5dm v5hide', role: 'menu' }, SPEEDS.map((n, i) => v5btn('×' + n, () => { Game.speedIdx = i; Game.paused = false; v5Speed(false); UI.refresh(true); E.v5speed.focus(); }, { role: 'menuitemradio', 'data-i': i })));
  if (E.skipBtn) { E.skipBtn.className = 'v5b'; E.skipBtn.style.cssText = ''; E.skipBtn.setAttribute('role', 'button'); E.skipBtn.tabIndex = 0; }
  const spd = h('div', { id: 'v5speedwrap' }, E.v5pause, E.v5speed, E.skipBtn || null, E.v5speedMenu);
  E.v5dispBtn = v5btn(t('v5_display'), () => v5Display(!V5.dispOpen), { 'aria-expanded': 'false' }); E.v5menuBtn = v5btn(t('v5_menu'), () => Screens.pause());
  top.append(E.v5faith, E.v5bal, E.v5date, spd, h('div', { class: 'tools' }, E.v5dispBtn, E.v5menuBtn));
  /* --- battle summary: the old war bar in the new frame --- */
  if (E.warBar) { const wb = E.warBar; wb.className = 'v5 v5bat'; wb.id = 'v5war'; wb.setAttribute('data-zone', 'top'); wb.style.cssText = ''; const old = wb.querySelector('span.btn'); if (old) old.remove(); const ic = wb.querySelector('img,canvas,svg'); if (ic && ic.parentNode === wb) ic.remove();
    wb.appendChild(E.v5prep = v5btn(t('v5_prep'), () => Screens.defense())); }
  if (E.bossWin) { E.bossWin.id = 'v5boss'; E.bossWin.classList.add('v5'); E.bossWin.setAttribute('data-zone', 'top'); }
  /* --- side panel --- */
  const side = h('aside', { id: 'v5side', class: 'v5 v5f', 'data-zone': 'map' });
  E.v5unread = h('span', { class: 'small' }); E.v5tabs = {}; E.v5pages = {};
  const tabs = h('nav', { id: 'v5tabs', role: 'tablist' }); const keys = ['pray', 'feed', 'fav', 'dec'];
  keys.forEach((k, i) => { const b = h('button', { class: 'v5tab', type: 'button', role: 'tab', 'aria-selected': 'false', onclick: () => UI.rTab(k),
    onkeydown: ev => { if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { ev.preventDefault(); ev.stopPropagation(); const n = keys[(i + (ev.key === 'ArrowRight' ? 1 : 3)) % 4]; UI.rTab(n); E.v5tabs[n].focus(); } } }, t('v5_tab_' + k)); b._badge = h('i', { style: 'display:none' }); b.appendChild(b._badge); E.v5tabs[k] = b; tabs.appendChild(b); });
  E.v5list = h('div', { id: 'v5list', role: 'tabpanel', tabindex: 0 }); E.v5foot = h('footer');
  const page = (k, ...kids) => { const p = h('div', { class: 'v5page', 'data-page': k }, ...kids); E.v5pages[k] = p; E.v5list.appendChild(p); return p; };
  [E.prayWin, E.feedWin, E.favWin, E.goalWin, E.cardWin].forEach(w => { if (!w) return; w.classList.remove('win', 'glass', 'pcol', 'colgoal'); w.style.display = ''; });
  if (E.cardWin) { E.cardWin.classList.add('card'); const dsp = E.cardWin.style.display; E.cardWin.style.cssText = ''; E.cardWin.style.display = dsp; }
  page('pray', E.cardWin, E.prayWin); page('feed', E.feedWin); page('fav', E.favWin);
  E.v5dec = h('div'); E.v5council = v5btn(t('v5_dec_open'), () => Screens.council(), { style: 'width:100%;margin-bottom:8px' });
  if (this.goalR) { this.goalR.head.style.display = 'none'; Game.goalOpen = true; }
  page('dec', E.v5council, E.v5dec, h('h3', null, t('v5_goal')), E.goalWin);
  side.append(h('header', null, h('h2', null, t('v5_news')), E.v5unread), tabs, E.v5list, E.v5foot);
  /* --- hint, powers, map --- */
  E.v5hint = h('div', { id: 'v5hint', class: 'v5', 'data-zone': 'bottom', role: 'status' });
  E.v5pow = h('nav', { id: 'v5pow', class: 'v5', 'data-zone': 'bottom', 'aria-label': 'powers' }); E.v5powBtns = POWERS.map((p, i) => {
    const b = h('button', { class: 'v5pow', type: 'button', 'data-id': p.id, 'aria-pressed': 'false', onclick: () => selectPower(i), onmouseenter: () => { Game.hover = i; UI.refresh(true); }, onmouseleave: () => { Game.hover = null; UI.refresh(true); }, onfocus: () => { Game.hover = i; UI.refresh(true); }, onblur: () => { Game.hover = null; UI.refresh(true); } },
      h('kbd', null, String(i + 1)), v5icon('icon_power_' + p.id + '_32'), h('span', { class: 'nm' }, p.n[li()]), h('span', { class: 'cs' }));
    b._cs = b.lastChild; Tip.attach(b, () => { const c = powerCost(p.id); const r = v5PowState(i); return [p.n[li()], p.d[li()], fmt(t('v5_cost'), { n: c }) + (r.why ? '　' + r.why : '')]; }); E.v5pow.appendChild(b); return b; });
  E.v5mapb = h('button', { id: 'v5mapb', class: 'v5 v5b', type: 'button', 'data-zone': 'map', onclick: () => v5MapModal() }, v5icon('icon_map_32'), t('v5_map'));
  /* --- view mode bar, restore, display menu, toast --- */
  E.v5compact = h('div', { id: 'v5compact', class: 'v5 v5top v5hide' }, E.v5cf = h('span'), E.v5cd = h('span'), E.v5cs = h('span'));
  E.v5restore = v5btn(t('v5_back'), () => { if (V5.viewing) v5View(); else v5Display(!V5.dispOpen); }); E.v5restore.id = 'v5restore'; E.v5restore.classList.add('v5', 'v5hide');
  E.v5disp = h('section', { id: 'v5disp', class: 'v5 v5dm v5hide', role: 'dialog', 'aria-label': t('v5_disp_t') }, h('h2', null, t('v5_disp_t')), h('p', { class: 'small', style: 'margin:0 0 4px' }, t('v5_disp_d')));
  E.v5zoneBtns = {}; V5_ZONES.forEach(k => { const b = v5btn('', () => { const z = v5Zones(); z[k] = !z[k]; Game.saveSettings(); v5Apply(); }, { 'aria-pressed': 'true' }); E.v5zoneBtns[k] = b; E.v5disp.appendChild(b); });
  E.v5disp.append(h('div', { class: 'pair' }, v5btn(t('v5_all'), () => { const z = v5Zones(); V5_ZONES.forEach(k => z[k] = true); V5.viewing = false; V5.before = null; Game.saveSettings(); v5Display(false); v5Apply(); }), v5btn(t('v5_view'), () => v5View())), h('p', { class: 'small', style: 'margin:4px 0 0' }, t('v5_disp_k')));
  E.v5toast = h('div', { id: 'v5toast', class: 'v5 v5note v5hide', role: 'status', 'aria-live': 'polite' });
  root.append(top, side, E.v5hint, E.v5pow, E.v5mapb, E.v5compact, E.v5restore, E.v5disp, E.v5toast);
  if (E.selWin) { E.selWin.classList.add('v5sel'); E.selWin.setAttribute('data-zone', 'map'); }
  if (E.banner) E.banner.classList.add('v5ban');
  /* tutorial / hint targets that pointed at the old windows */
  Object.assign(E, { faithWin: E.v5faith, balWin: E.v5bal, timeWin: E.v5date, miniWin: E.v5mapb, utilWin: E.v5menuBtn, counselBtn: E.v5menuBtn, chronBtn: E.v5menuBtn, powWinOld: E.powWin, powWin: E.v5pow, miniCv: null });
  this.rTab(Game.settings.rTab && keys.indexOf(Game.settings.rTab) >= 0 ? Game.settings.rTab : 'pray', true); v5Apply(); this.refreshV5(true);
};

/* ---------- zones / view mode / display menu ---------- */
function v5Apply() { const E = UI.el; if (!E || !E.v5disp) return; const z = v5Zones(); const root = $('ui');
  root.querySelectorAll('[data-zone]').forEach(el => { const k = el.getAttribute('data-zone'); el.classList.toggle('v5hide', !(V5.viewing ? false : z[k])); });
  E.v5compact.classList.toggle('v5hide', !V5.viewing); const showRestore = V5.viewing || !z.top; E.v5restore.classList.toggle('v5hide', !showRestore);
  E.v5restore.textContent = V5.viewing ? t('v5_back') : t('v5_display');
  V5_ZONES.forEach(k => { const b = E.v5zoneBtns[k]; b.setAttribute('aria-pressed', z[k] ? 'true' : 'false'); b.textContent = (z[k] ? '✓ ' : '— ') + t('v5_z_' + k); });
  if (!v5On('bottom') && Game.power) { Game.power = null; } /* hiding the powers cancels aiming; nothing is cast automatically */
  if (V5.viewing) v5Display(false);
  UI.rDots(); UI.refreshV5(true); }
function v5Display(open) { const E = UI.el; if (!E || !E.v5disp) return; V5.dispOpen = !!open; E.v5disp.classList.toggle('v5hide', !open); E.v5dispBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) { V5.focusBack = document.activeElement; v5Speed(false); const f = E.v5disp.querySelector('button'); if (f) f.focus(); Snd.se('cursor'); }
  else if (V5.focusBack && V5.focusBack.isConnected && V5.focusBack.offsetParent) { V5.focusBack.focus(); V5.focusBack = null; } }
function v5Speed(open) { const E = UI.el; if (!E || !E.v5speedMenu) return; V5.speedOpen = !!open; E.v5speedMenu.classList.toggle('v5hide', !open); E.v5speed.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) { const b = E.v5speedMenu.querySelector('[data-i="' + Game.speedIdx + '"]'); if (b) b.focus(); } }
/* U: view mode keeps the zone set it found and gives it back; it never writes the zone preference */
function v5View() { if (V5.viewing) { V5.viewing = false; V5.before = null; } else { V5.before = Object.assign({}, v5Zones()); V5.viewing = true; Game.power = null; } v5Display(false); v5Apply(); Snd.se('cursor');
  const E = UI.el; const f = V5.viewing ? E.v5restore : (v5Zones().top ? E.v5dispBtn : E.v5restore); if (f) f.focus(); }
UI.toggleHide = function () { v5View(); };
/* the old per-panel folding is gone (UI v5 §4): these keep their names for old callers but do nothing besides the unread dots */
UI.toggleCol = function () { }; UI.collapseAll = function () { }; UI.applyCol = function () { if (this.el && this.el.v5tabs) this.rDots(); };
const _selectPowerV5 = selectPower; selectPower = function (i) { if (Game.scene === 'play' && UI.el && UI.el.v5pow && !v5On('bottom')) return; return _selectPowerV5(i); };

/* ---------- side panel tabs and unread ---------- */
UI.rTab = function (k, silent) { const E = this.el; if (!E || !E.v5tabs) return; Game.settings.rTab = k; for (const p in E.v5pages) E.v5pages[p].style.display = p === k ? '' : 'none';
  for (const p in E.v5tabs) E.v5tabs[p].setAttribute('aria-selected', p === k ? 'true' : 'false'); v5setText(E.v5foot, t('v5_ft_' + k)); E.v5list.scrollTop = 0;
  if (!silent) { Snd.se('cursor'); Game.saveSettings(); } this.rDots(); };
/* read only when the content is really on screen (map zone shown, not viewing, that tab open) */
UI.rDots = function () { const E = this.el; if (!E || !E.v5tabs || !G) return; const tab = Game.settings.rTab || 'pray'; const vis = v5On('map');
  const prs = openPrayers(); const c = (G.cards || [])[0];
  if (vis && tab === 'pray') { this.seenPray = prs.map(p => p.id); this.seenCard = c ? c.n : this.seenCard; }
  if (vis && tab === 'feed') this.seenFeed = this.feed.length;
  const np = prs.filter(p => (this.seenPray || []).indexOf(p.id) < 0).length + (c && this.seenCard !== c.n ? 1 : 0);
  const nf = this.feed.slice(this.seenFeed || 0).filter(f => f.imp).length;
  const set = (k, n) => { const b = E.v5tabs[k]; b.classList.toggle('unread', n > 0); b._badge.style.display = n > 0 ? '' : 'none'; v5setText(b._badge, n > 9 ? '9+' : String(n)); b.setAttribute('aria-label', t('v5_tab_' + k) + (n ? ' ' + fmt(t('v5_unread'), { n }) : '')); };
  set('pray', np); set('feed', nf); set('fav', 0); set('dec', G.council && !G.council.done ? 1 : 0);
  const tot = np + nf + (G.council && !G.council.done ? 1 : 0); v5setText(E.v5unread, tot ? fmt(t('v5_unread'), { n: tot }) : ''); };

/* ---------- per refresh ---------- */
function v5PowState(i) { const p = POWERS[i]; const c = powerCost(p.id); const ok = G.faith >= c; const sp = selPrayerObj(); const na = !!sp && (PRAYER_ANS[sp.kind] || []).indexOf(p.id) < 0;
  return { c, ok, na, rec: !!sp && !na && ok, why: na ? t('v5_na') : !ok ? t('v5_no_faith') : '' }; }
const _urV5 = UI.refresh; UI.refresh = function (force) { _urV5.apply(this, arguments); try { this.refreshV5(force); } catch (e) { if (!this._v5err) { this._v5err = 1; ERRS.push('ui v5 refresh:' + e.message); } } };
UI.refreshV5 = function () { const E = this.el; if (!G || !E || !E.v5faith) return; const L = li();
  { const root = $('ui'); const ff = v5Font(); if (root && root._ff !== ff) { root._ff = ff; root.style.fontFamily = ff; } }
  /* top */
  const f = Math.floor(G.faith); const fsig = f + '/' + G.faithMax; if (E.v5fv._s !== fsig) { E.v5fv._s = fsig; E.v5fv.innerHTML = ''; E.v5fv.append(String(f), h('small', null, ' / ' + G.faithMax)); } E.v5fm.style.width = clamp(G.faith / G.faithMax * 100, 0, 100).toFixed(1) + '%';
  const b = Math.round(G.balance); v5setText(E.v5bl, b === 0 ? t('v5_even') : fmt(t(b > 0 ? 'v5_lead_l' : 'v5_lead_d'), { n: Math.abs(b) })); E.v5bm.style.width = clamp(50 + G.balance / 2, 0, 100).toFixed(1) + '%';
  const d = v5date(); v5setText(E.v5d1, d[0]); v5setText(E.v5d2, d[1]);
  E.v5pause.setAttribute('aria-pressed', Game.paused ? 'true' : 'false'); const pi = E.v5pause.firstChild; const want = v5img(Game.paused ? 'icon_speed_32' : 'icon_pause_32'); if (pi && pi.getAttribute('src') !== want) pi.setAttribute('src', want);
  v5setText(E.v5speed, Game.paused ? t('v5_paused') : '×' + SPEEDS[Game.speedIdx]); E.v5speedMenu.querySelectorAll('[data-i]').forEach(x => x.setAttribute('aria-pressed', !Game.paused && +x.getAttribute('data-i') === Game.speedIdx ? 'true' : 'false'));
  if (E.skipBtn) E.skipBtn.setAttribute('aria-pressed', Game.skip ? 'true' : 'false');
  /* battle summary: danger frame in the last season before an assault */
  if (E.warBar) { const a = G.assaults && nextAssault(); E.warBar.classList.toggle('danger', !!a && a.t - G.tick <= SEASON_T); E.warBar.style.outline = 'none'; E.warBar.style.borderImage = ''; }
  /* powers */
  const fs = POWERS.map(p => fatigueStage(p.id));
  E.v5powBtns.forEach((bt, i) => { const s = v5PowState(i); bt.setAttribute('aria-pressed', Game.power === POWERS[i].id ? 'true' : 'false'); bt.setAttribute('aria-disabled', !s.ok || s.na ? 'true' : 'false'); bt.classList.toggle('rec', s.rec && Game.power !== POWERS[i].id);
    v5setText(bt._cs, s.why ? s.why : fmt(t('v5_cost'), { n: s.c }) + (fs[i] ? ' ▼' + fs[i] : '')); bt.setAttribute('aria-label', POWERS[i].n[L] + ' ' + fmt(t('v5_cost'), { n: s.c }) + (s.why ? ' ' + s.why : '')); });
  /* hint line */
  let hint = t('v5_hint');
  if (Game.power) hint = fmt(t('pick_target'), { p: Game.power === 'eye' ? t('eye') : POWER_BY_ID[Game.power].n[L] });
  else if (Game.hover !== null && Game.hover !== undefined && POWERS[Game.hover]) { const p = POWERS[Game.hover]; hint = p.d[L]; const hh = Game.selId ? hById(Game.selId) : null; if (hh && hh.alive && p.id !== 'force') hint += '　' + t('succ') + ' ' + Math.round(successProb(p.id, hh) * 100) + '%'; }
  v5setText(E.v5hint, hint);
  /* view-mode bar */
  if (V5.viewing) { v5setText(E.v5cf, t('v5_faith') + ' ' + f + ' / ' + G.faithMax); v5setText(E.v5cd, S.season[L][seasonOf(G.tick)] + '・' + d[1]); v5setText(E.v5cs, Game.paused ? t('v5_paused') : '×' + SPEEDS[Game.speedIdx]); }
  /* decrees page */
  const sig = (G.decrees || []).map(x => x.id + x.state).join(',') + (G.council && !G.council.done ? 'C' : '') + LANG;
  if (sig !== this.v5decSig) { this.v5decSig = sig; E.v5dec.innerHTML = ''; const act = (G.decrees || []).filter(x => x.state === 'active' && DECREES[x.id]);
    if (!act.length) E.v5dec.appendChild(h('div', { class: 'card' }, h('div', null, t('v5_dec_none'))));
    act.forEach(x => { const D = DECREES[x.id]; E.v5dec.appendChild(h('div', { class: 'card v5dec' }, h('div', { class: 'side' }, (S.co_side && S.co_side[D.side] ? S.co_side[D.side][L] : '')), h('b', null, D.n[L]))); });
    E.v5council.classList.toggle('v5hide', !(G.council && !G.council.done)); }
  this.rDots(); };

/* ---------- notifications: 3 s, never open a hidden zone ---------- */
UI.toast = function (text, col) { this.pushFeed(text, col || '#fff'); const E = this.el; if (!E || !E.v5toast) return; const el = E.v5toast; el.textContent = text; el.style.color = col && col !== '#fff' ? col : '#f6f2e8'; el.classList.remove('v5hide');
  clearTimeout(this._toastT); this._toastT = setTimeout(() => el.classList.add('v5hide'), 3000); };

/* ---------- v5 modal shell (on the existing Screens stack: Esc closes, time stops as before, focus returns to the opener) ---------- */
function v5Modal(name, title, body, foot, opts) { const back = document.activeElement; opts = opts || {};
  Screens.push(name, () => { const close = v5btn(v5icon('icon_close_32'), () => Screens.pop(), { 'aria-label': t('v5_close'), title: t('v5_close'), class: 'v5b v5close' });
    const el = h('section', { class: 'v5m v5mod', role: 'dialog', 'aria-modal': 'true', style: 'position:absolute;font-family:' + v5Font() },
      h('header', null, h('div', null, h('div', { class: 'small cream' }, t('v5_sub')), h('h1', { style: 'font-family:' + v5Serif() }, title)), opts.noClose ? null : close),
      h('div', { class: 'body' }, typeof body === 'function' ? body() : body), h('footer', null, ...(typeof foot === 'function' ? foot() : foot || [])));
    setTimeout(() => { if (el.contains(document.activeElement)) return; const f = el.querySelector('.body button:not([aria-disabled=true])') || el.querySelector('footer button') || el.querySelector('.v5close'); if (f) f.focus(); }, 0); return el; }, opts.onKey || null,
    Object.assign({ onClose: () => { if (opts.onClose) opts.onClose(); setTimeout(() => { if (back && back.isConnected && back.offsetParent) back.focus(); }, 0); } }, opts.noEsc ? { noEsc: true } : {})); Snd.se('cursor'); }
/* game menu (Esc / メニュー): two groups, nothing removed from the old pause menu */
Screens.pause = function () { if (this.stack.length && this.stack[this.stack.length - 1].name === 'pause') return;
  const go = f => () => { Screens.pop(); f(); };
  v5Modal('pause', t('v5_menu'), () => h('div', { class: 'v5grid' }, h('h2', null, t('v5_g1')),
    v5btn(t('v5_res'), go(() => Screens.residents())), v5btn(t('v5_souls'), go(() => Screens.souls())), v5btn(t('v5_chron'), go(() => Screens.chronicle())),
    v5btn(t('v5_eye') + '（' + G.eye + '）', go(() => { if (G.eye > 0) { Game.power = 'eye'; UI.refresh(true); } }), G.eye > 0 ? {} : { 'aria-disabled': 'true' }), v5btn(t('v5_counsel'), go(() => Screens.counsel())), v5btn(t('help'), go(() => Screens.help())),
    v5btn(t('glossary'), go(() => Screens.glossary())), v5btn(t('ev_log'), go(() => Screens.eventLog())), v5btn(t('tut_replay'), () => { Screens.closeAll(); Tut.start(); }),
    h('h2', null, t('v5_g2')), v5btn(t('save'), () => Screens.saveMenu(true)), v5btn(t('load'), () => Screens.saveMenu(false)), v5btn(t('settings'), () => Screens.settings()),
    v5btn(t('to_title'), () => Screens.confirm(t('confirm_title'), () => { Screens.closeAll(); Game.toTitle(); }))),
    () => [h('span', { class: 'small' }, t('v5_menu_foot')), v5btn(t('v5_resume'), () => Screens.pop())]); };
/* faith detail (eye, awe, fatigue, god level moved out of the top bar) */
function v5FaithModal() { v5Modal('faith', t('v5_faith_t'), () => { const fs = POWERS.map(p => fatigueStage(p.id)); const fm = Math.max(...fs);
  return h('div', null, h('div', { style: 'font-size:27px;margin-bottom:12px' }, t('v5_faith') + ' ' + Math.floor(G.faith) + ' / ' + G.faithMax),
    ...faithTip().map((l, i) => h('div', { class: i ? '' : 'cream', style: 'font-size:18px;line-height:28px' }, l)),
    h('div', { style: 'margin-top:16px;display:flex;gap:32px;flex-wrap:wrap;font-size:18px' }, h('span', null, fmt(t('v5_eye_n'), { n: G.eye })), h('span', null, fmt(t('v5_awe_n'), { n: Math.floor(G.awe || 0), m: G.aweMax || 0 })),
      h('span', null, fm > 0 ? fmt(t('v5_fat'), { s: '▼'.repeat(fm) }) : t('v5_fat_none')), h('span', null, fmt(t('god_lv'), { n: G.godLv || 1 })))); },
  () => [h('span'), v5btn(t('v5_return'), () => Screens.pop())]); }
/* world map: drawn from the live world canvas, click moves the camera */
function v5MapModal() { v5Modal('worldmap', t('v5_worldmap'), () => { const sea = seasonOf(G.tick); const W0 = MW * TS, H0 = MH * TS; const sc = Math.min(1000 / W0, 400 / H0); const cv = h('canvas', { width: Math.round(W0 * sc), height: Math.round(H0 * sc), style: 'display:block;margin:0 auto;cursor:pointer;image-rendering:auto' });
    const c = cv.getContext('2d'); c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high'; c.drawImage(getWorldCanvas(sea), 0, 0, cv.width, cv.height);
    c.fillStyle = '#f3dfaa'; G.humans.forEach(x => { if (x.alive && !x.inside) c.fillRect(Math.round(x.x * TS * sc) - 1, Math.round(x.y * TS * sc) - 1, 3, 3); });
    c.fillStyle = '#ffb19b'; (G.monsters || []).forEach(m => { if (m.alive) c.fillRect(Math.round(m.x * TS * sc) - 1, Math.round(m.y * TS * sc) - 1, 3, 3); });
    c.strokeStyle = '#9ed7e4'; c.lineWidth = 2; c.strokeRect(Render.cam.x * sc, Render.cam.y * sc, Render.VW * sc, Render.VH * sc);
    cv.addEventListener('click', ev => { const r = cv.getBoundingClientRect(); const x = (ev.clientX - r.left) / r.width * W0 / TS, y = (ev.clientY - r.top) / r.height * H0 / TS; Render.centerOn(x, y); Game.follow = 0; Screens.pop(); });
    return h('div', null, cv, h('p', { class: 'small', style: 'text-align:center;margin:8px 0 0' }, t('v5_map_d'))); },
  () => [h('span'), v5btn(t('v5_return'), () => Screens.pop())]); }

/* ---------- keys: Esc order, U, Tab inside dialogs, no world shortcuts while typing ---------- */
if (typeof document !== 'undefined') document.addEventListener('keydown', e => {
  if (typeof Game === 'undefined' || Game.scene !== 'play' || !UI.el || !UI.el.v5disp) return; const tg = e.target;
  if (tg && /INPUT|TEXTAREA|SELECT/.test(tg.tagName) && e.key !== 'Escape') { e.stopImmediatePropagation(); return; }
  if (Screens.stack.length) { if (e.key === 'Tab') { const m = $('modal'); const f = Array.from(m.querySelectorAll('button:not([aria-disabled=true]),[tabindex="0"],.btn')).filter(x => x.offsetParent); if (!f.length) return; const i = f.indexOf(document.activeElement);
      e.preventDefault(); e.stopImmediatePropagation(); (e.shiftKey ? f[(i <= 0 ? f.length : i) - 1] : f[(i + 1) % f.length]).focus(); } return; }
  if (e.key === 'Escape') { if (V5.speedOpen) { v5Speed(false); UI.el.v5speed.focus(); e.stopImmediatePropagation(); e.preventDefault(); return; } if (V5.dispOpen) { v5Display(false); e.stopImmediatePropagation(); e.preventDefault(); return; } return; }
  if ((e.key === 'u' || e.key === 'U') && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); e.stopImmediatePropagation(); v5View(); return; }
  if (e.key === 'Tab') { e.stopImmediatePropagation(); return; } /* Tab = focus travel (not hiding the UI) */
  if ((e.key === 'Enter' || e.key === ' ') && tg && tg.tagName === 'BUTTON' && tg.closest && tg.closest('#ui')) { e.stopImmediatePropagation(); return; } /* a focused button gets its own Enter / Space */
}, true);
if (typeof document !== 'undefined') document.addEventListener('pointerdown', e => { if (!UI.el || !UI.el.v5disp) return; const t0 = e.target;
  if (V5.dispOpen && !UI.el.v5disp.contains(t0) && t0 !== UI.el.v5dispBtn && !UI.el.v5dispBtn.contains(t0) && !UI.el.v5restore.contains(t0)) v5Display(false);
  if (V5.speedOpen && !UI.el.v5speedMenu.contains(t0) && !UI.el.v5speed.contains(t0)) v5Speed(false); }, true);
/* "what's this?" mode (16b) answers on mousedown; the click that follows must not also press the v5 control under the cursor */
if (typeof document !== 'undefined') { document.addEventListener('pointerdown', () => { if (typeof Game !== 'undefined' && Game.whatMode) V5.whatT = performance.now(); }, true);
  document.addEventListener('click', e => { if (V5.whatT && performance.now() - V5.whatT < 800) { V5.whatT = 0; e.stopImmediatePropagation(); e.preventDefault(); } }, true); }
