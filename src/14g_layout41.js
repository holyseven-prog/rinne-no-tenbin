/* ================= V4.1 fix B4: less UI over the map — one tabbed right panel (祈り｜出来事｜眷顧), every panel collapsible (remembered),
   U hides everything but the top row, the era card lives in the right panel instead of the middle of the map ================= */
Object.assign(S, {
  tab_pray: ['祈り', '祈禱'], tab_feed: ['出来事', '事件'], tab_fav: ['眷顧', '眷顧'], ui_hidden: ['UIを隠しています（Uで戻す）', 'UI 已隱藏（按 U 恢復）'],
  tip_col: ['たたむ／ひらく', '收合／展開'], tip_col_d: ['クリックでこの欄をたたみます。もう一度で元に戻ります。Uキーで全部の欄を隠せます。', '點一下收合這一欄，再點一次恢復。按 U 可以隱藏全部欄位。'],
});
UI.colKeys = ['mini', 'goal', 'right', 'pow', 'info', 'util', 'bal'];
const _ubL = UI.build; UI.build = function () { _ubL.apply(this, arguments); try { UI.layout41(); } catch (e) { ERRS.push('layout41:' + e.message); } };
UI.layout41 = function () {
  const E = this.el, root = $('ui'); if (!root || !E.prayWin) return; const st = Game.settings; st.collapsed = st.collapsed || { info: true };
  const flat = el => { el.style.position = 'static'; el.style.left = el.style.top = ''; el.style.width = 'auto'; el.style.height = 'auto'; el.style.padding = '0'; el.style.border = 'none'; el.style.background = 'none'; el.style.boxShadow = 'none'; el.style.backdropFilter = 'none'; el.classList.remove('win'); };
  const colBtn = key => { const b = h('span', { class: 'btn colbtn', style: 'font-size:11px;padding:0 5px;line-height:16px', onclick: ev => { ev.stopPropagation(); UI.toggleCol(key); } }, '▾'); Tip.attach(b, () => [t('tip_col'), t('tip_col_d')]); return b; };
  // --- top row a little narrower / lower
  E.faithWin.style.height = E.balWin.style.height = E.timeWin.style.height = '48px';
  // --- right tabbed panel
  E.rightWin = h('div', { class: 'win glass', style: 'left:1032px;top:62px;width:240px;padding:3px 6px;max-height:578px;display:flex;flex-direction:column' }); // V4.1b 2-1: up to the action bar
  const tabs = h('div', { style: 'display:flex;gap:3px;align-items:center;margin-bottom:3px' }); E.rTabs = {};
  ['pray', 'feed', 'fav'].forEach(k => { const b = h('span', { class: 'btn', style: 'font-size:12px;padding:0 7px;position:relative;line-height:18px', onclick: () => UI.rTab(k) }, t('tab_' + k)); b._dot = h('i', { style: 'position:absolute;right:-3px;top:-4px;width:8px;height:8px;border-radius:4px;background:#ff3a3a;display:none' }); b.appendChild(b._dot); E.rTabs[k] = b; tabs.appendChild(b); });
  E.rCol = colBtn('right'); E.rCol.style.marginLeft = 'auto'; tabs.appendChild(E.rCol); E.rTabsRow = tabs;
  E.rBody = h('div', { class: 'rscroll', style: 'flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;padding-right:2px' }); E.rPages = {};
  [E.cardWin, E.prayWin, E.feedWin, E.favWin].forEach(flat);
  E.cardWin.style.cssText += ';display:none;margin:0 0 4px;padding:2px 4px;border:1px solid #ffd86088;border-radius:3px;background:rgba(40,30,10,.35)';
  const ph = E.prayWin.querySelector('h3'); if (ph) ph.style.display = 'none'; const fh = E.favWin.querySelector('h3'); if (fh) fh.style.display = 'none';
  const fhd = E.feedWin.querySelector('h3'); if (fhd) { fhd.style.cssText = 'margin:0 0 2px;font-size:12px;display:flex;justify-content:flex-end'; fhd.firstChild.textContent = ''; }
  E.rPages = { pray: E.prayWin, feed: E.feedWin, fav: E.favWin };
  E.rBody.append(E.prayWin, E.feedWin, E.favWin); E.rightWin.append(E.cardWin, tabs, E.rBody); root.appendChild(E.rightWin); // the era card sits above the tabs, outside the scrolling list
  // --- bottom: smaller power bar and tool buttons
  E.powWin.style.cssText += ';top:664px;height:50px;padding:3px 5px;left:244px;width:740px'; E.powBtns.forEach(b => { b.style.width = '140px'; b.style.height = '42px'; b.style.lineHeight = '1.15'; });
  E.utilWin.style.cssText += ';left:1032px;top:676px;width:240px;height:38px;padding:3px 4px'; Array.from(E.utilWin.children).forEach(b => { b.style.fontSize = '11px'; b.style.lineHeight = '1.1'; b.style.padding = '1px 2px'; });
  E.infoWin.style.cssText += ';top:664px;height:50px;width:226px'; E.miniWin.style.height = '140px';
  // collapse buttons on each panel
  const addCol = (win, key, css) => { const b = colBtn(key); b.style.cssText += ';position:absolute;' + (css || 'right:3px;top:2px'); win.appendChild(b); win._colBtn = b; };
  addCol(E.miniWin, 'mini'); addCol(E.balWin, 'bal', 'right:3px;top:3px'); E.balWin.style.overflow = 'hidden'; E.balWin.style.paddingRight = '24px'; addCol(E.powWin, 'pow', 'right:2px;top:-18px'); addCol(E.infoWin, 'info'); addCol(E.utilWin, 'util', 'right:2px;top:-18px');
  if (this.goalR && this.goalR.head) { const b = colBtn('goal'); this.goalR.head.insertBefore(b, this.goalR.head.lastChild); }
  this.rTab(st.rTab || 'pray', true); this.applyCol();
};
UI.rTab = function (k, silent) { const E = this.el; if (!E.rPages) return; Game.settings.rTab = k; for (const p in E.rPages) E.rPages[p].style.display = p === k ? 'block' : 'none'; for (const p in E.rTabs) E.rTabs[p].classList.toggle('on', p === k);
  if (k === 'pray') this.seenPray = openPrayers().map(p => p.id); if (k === 'feed') this.seenFeed = this.feed.length; if (Game.settings.collapsed.right) { Game.settings.collapsed.right = false; this.applyCol(); } if (!silent) { Snd.se('cursor'); Game.saveSettings(); } this.rDots(); };
UI.rDots = function () { const E = this.el; if (!E.rTabs || !G) return; const tab = Game.settings.rTab || 'pray'; const col = Game.settings.collapsed.right;
  const np = openPrayers().some(p => (this.seenPray || []).indexOf(p.id) < 0); if (tab === 'pray' && !col) this.seenPray = openPrayers().map(p => p.id);
  const nf = this.feed.slice(this.seenFeed || 0).some(f => f.imp); if (tab === 'feed' && !col) this.seenFeed = this.feed.length;
  E.rTabs.pray._dot.style.display = np && (tab !== 'pray' || col) ? 'block' : 'none'; E.rTabs.feed._dot.style.display = nf && (tab !== 'feed' || col) ? 'block' : 'none'; };
UI.toggleCol = function (key, v) { const c = Game.settings.collapsed; c[key] = v === undefined ? !c[key] : v; this.applyCol(); Game.saveSettings(); Snd.se('cursor'); };
UI.collapseAll = function (v) { this.colKeys.forEach(k => Game.settings.collapsed[k] = v); this.applyCol(); };
UI.applyCol = function () { const E = this.el, c = Game.settings.collapsed; if (!E.rightWin) return;
  const kids = (win, keep, on) => Array.from(win.children).forEach(ch => { if (keep.indexOf(ch) < 0) ch.style.display = on ? 'none' : ''; });
  // mini
  E.miniWin.style.height = c.mini ? '22px' : '140px'; E.miniWin.style.width = c.mini ? '96px' : '214px'; kids(E.miniWin, [E.miniWin._colBtn], c.mini); E.miniWin._colBtn.textContent = c.mini ? '▸ 🗺' : '▾';
  // goal
  const R = this.goalR; if (R) { E.goalWin.classList.toggle('colgoal', !!c.goal); E.goalWin.style.width = c.goal ? '112px' : '214px'; E.goalWin.style.whiteSpace = c.goal ? 'nowrap' : ''; E.goalWin.style.top = c.mini ? '92px' : '210px'; const cb = R.head.querySelector('.colbtn'); if (cb) cb.textContent = c.goal ? '▸' : '▾'; }
  // right
  E.rBody.style.display = c.right ? 'none' : ''; E.cardWin.style.visibility = c.right ? 'hidden' : ''; if (c.right) E.cardWin.style.position = 'absolute'; else E.cardWin.style.position = 'static'; E.rightWin.style.width = c.right ? '124px' : '240px'; E.rightWin.style.left = c.right ? '1148px' : '1032px'; E.rCol.textContent = c.right ? '◂' : '▾'; Array.from(E.rTabsRow.children).forEach(ch => { if (ch !== E.rCol && E.rTabs) ch.style.fontSize = c.right ? '10px' : '12px'; ch.style.padding = c.right ? '0 3px' : ''; });
  // power bar -> 5 small key buttons
  E.powBtns.forEach((b, i) => { b.style.width = c.pow ? '28px' : '140px'; b.style.height = c.pow ? '20px' : '42px'; Array.from(b.children).forEach((ch, j) => { if (j > 0) ch.style.display = c.pow ? 'none' : ''; }); const n = b.firstChild && b.firstChild.lastChild; if (n) n.style.display = c.pow ? 'none' : ''; });
  E.powWin.style.width = c.pow ? '168px' : '740px'; E.powWin.style.height = c.pow ? '26px' : '50px'; E.powWin.style.top = c.pow ? '688px' : '664px'; E.powWin.style.left = c.pow ? '556px' : '244px'; E.powWin._colBtn.textContent = c.pow ? '▴' : '▾';
  E.balWin.style.width = c.bal ? '170px' : '400px'; E.balWin.style.left = c.bal ? '555px' : '440px'; E.balWin.style.justifyContent = c.bal ? 'flex-start' : 'center'; E.balWin._colBtn.textContent = c.bal ? '▸' : '▾';
  // info / util
  kids(E.infoWin, [E.infoWin._colBtn], c.info); E.infoWin.style.width = c.info ? '30px' : '226px'; E.infoWin.style.height = c.info ? '22px' : '50px'; E.infoWin.style.top = c.info ? '692px' : '664px'; E.infoWin._colBtn.textContent = c.info ? '⌨' : '▾';
  kids(E.utilWin, [E.utilWin._colBtn], c.util); E.utilWin.style.width = c.util ? '30px' : '240px'; E.utilWin.style.height = c.util ? '22px' : '38px'; E.utilWin.style.left = c.util ? '1242px' : '1032px'; E.utilWin.style.top = c.util ? '692px' : '676px'; E.utilWin._colBtn.textContent = c.util ? '▴' : '▾'; E.utilWin._colBtn.style.top = c.util ? '2px' : '-18px';
  E.powWin._colBtn.style.top = c.pow ? '4px' : '-18px'; E.powWin._colBtn.style.right = c.pow ? '-26px' : '2px';
  this.rDots();
};
/* U: hide all but the top row */
UI.toggleHide = function () { Game.hideUI = !Game.hideUI; const root = $('ui'); if (root) root.classList.toggle('hideui', Game.hideUI); if (Game.hideUI) UI.pushFeed(t('ui_hidden'), '#a8e0ff'); };
if (typeof document !== 'undefined') document.addEventListener('keydown', e => { if (typeof Game === 'undefined' || Game.scene !== 'play' || Game.modals.length) return; if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return; if (e.key === 'u' || e.key === 'U') { e.preventDefault(); UI.toggleHide(); } });
if (typeof document !== 'undefined') (function () { const css = document.createElement('style'); css.textContent = '#ui.hideui .win:not(.keepui){display:none!important} .win.colgoal>*:not(h3){display:none!important} .win.colgoal h3>*:not(.colbtn){display:none!important} .win.colgoal h3{margin:0}'; document.head.appendChild(css); })();
const _ubL2 = UI.build; UI.build = function () { _ubL2.apply(this, arguments); const E = this.el; [E.faithWin, E.timeWin].forEach(w => w && w.classList.add('keepui')); if (Game.hideUI) $('ui').classList.add('hideui'); };
const _urL = UI.refreshWar; UI.refreshWar = function () { _urL.apply(this, arguments); if ((this._rdT = (this._rdT || 0) + 1) % 10 === 0) this.rDots(); };
/* toasts: the feed may sit in a closed tab now, so short messages also float above the power bar for 2.5 s */
UI.toast = function (text, col) { this.pushFeed(text, col || '#fff'); const root = $('ui'); if (!root) return; if (!this.toastEl || !this.toastEl.isConnected) { this.toastEl = h('div', { class: 'win glass keepui', style: 'left:340px;top:612px;width:600px;text-align:center;padding:4px 10px;font-size:15px;z-index:25;pointer-events:none;display:none' }); root.appendChild(this.toastEl); }
  const el = this.toastEl; el.textContent = text; el.style.color = col || '#fff'; el.style.display = 'block'; clearTimeout(this._toastT); this._toastT = setTimeout(() => { el.style.display = 'none'; }, 2500); };

/* V4.1b 2-1: compact prayer cards (name, kind, urgency) — the selected one opens up with the words and the advice; the list scrolls */
(function () { if (typeof document === 'undefined') return; const css = document.createElement('style'); css.textContent = '#ui .prayc:not(.psel):not(.sel) .pc-x{display:none} #ui .prayc{cursor:pointer} .rscroll{pointer-events:auto;scrollbar-width:thin;scrollbar-color:#ffd86099 transparent} .rscroll::-webkit-scrollbar{width:7px} .rscroll::-webkit-scrollbar-thumb{background:#ffd86099;border-radius:3px}'; document.head.appendChild(css); })();
const _rpL = UI.refreshPrayers; UI.refreshPrayers = function () { _rpL.apply(this, arguments); const E = this.el; if (E.prayList) Array.from(E.prayList.querySelectorAll('.card')).forEach(c => { c.classList.add('prayc'); Array.from(c.children).forEach(d => { if (d.tagName === 'DIV' && (d.style.height === '32px' || d.textContent.indexOf(t('rec_label')) === 0)) d.classList.add('pc-x'); }); }); };
/* V4.1b 2-1 + B4: the era card stays compact above the tabs (one-line title, one row of buttons); the description opens on hover */
if (typeof document !== 'undefined') (function () { const css = document.createElement('style'); css.textContent = '#ui .ecard>div:first-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px!important} #ui .ecard>div.sm{display:none} #ui .ecard .btn{font-size:11px!important;padding:0 5px} #ui .ecard>div:last-child{flex-wrap:nowrap!important;gap:4px!important}'; document.head.appendChild(css); })();
const _ubE = UI.build; UI.build = function () { _ubE.apply(this, arguments); if (this.el.cardWin) this.el.cardWin.classList.add('ecard'); };
const _rwE = UI.refreshWar; UI.refreshWar = function () { _rwE.apply(this, arguments); const E = this.el; if (!E.cardWin || !G) return; const c = (G.cards || [])[0]; const want = c && CARDS[c.id] ? CARDS[c.id].n[li()] + '\n' + CARDS[c.id].d[li()] : ''; if (E.cardWin.title !== want) E.cardWin.title = want; };
