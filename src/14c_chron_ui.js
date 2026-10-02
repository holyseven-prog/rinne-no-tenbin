/* ================= chronicle UI v2: titles with protagonist, per-person view, portrait (R2) ================= */
Object.assign(S, {
  h_view_time: ['時間順', '依時間'], h_view_person: ['人物ごと', '依人物'], h_prot: ['主角', '主角'], h_part: ['第{k}話', '第{k}話'], h_place: ['場所', '地點'],
  st_ok: ['健在', '健在'], st_dead: ['すでに亡くなった', '已逝'], st_reborn: ['{n}として転生', '轉生為{n}'], st_none: ['—', '—'],
  h_groups: ['人物', '人物'], h_chapters_n: ['{n}話', '{n}話'], h_other: ['その他', '其他'],
});
function chapStatus(ch, id) {
  const e = G.idx[id]; if (e && e.alive) return t('st_ok');
  const info = (ch.info || {})[id]; const s = info ? G.sidx[info.sid] : null;
  if (s && s.state === 'alive' && s.hid && G.idx[s.hid] && G.idx[s.hid].alive) { const n = G.idx[s.hid]; return fmt(t('st_reborn'), { n: n.name[li()] + '（' + JOBS[n.job].n[li()] + '）' }); }
  return t('st_dead');
}
function portrait(info, size) {
  const cv = h('canvas', { width: 16, height: 24, style: `width:${size * 2 / 3}px;height:${size}px;image-rendering:pixelated;background:#d8c490;border:2px solid #6a4a1c` });
  const stub = { job: info.job, look: info.look, age: info.age };
  const spr = humanSprite(stub, 0, 0); const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.drawImage(spr, 0, 0); return cv;
}
Screens.chronView = 'time'; Screens.chronOpen = {};
Screens.chronicle = function (chId) {
  G.tut.chron = true;
  let sel = chId || (G.chapters.length ? G.chapters[G.chapters.length - 1].id : 0);
  const build = () => {
    const chs = G.chapters; const cur = chs.find(c => c.id === sel) || chs[chs.length - 1]; const L = li();
    const titleOf = c => renderChapter(c).title;
    // ---- left ----
    const left = h('div', { style: 'width:262px' });
    left.appendChild(h('div', { style: 'display:flex;gap:6px;margin-bottom:4px' }, ['time', 'person'].map(v => h('span', { class: 'btn' + (Screens.chronView === v ? ' on' : ''), style: 'flex:1;text-align:center;font-size:13px', onclick: () => { Screens.chronView = v; Screens.rerender(); } }, t('h_view_' + v)))));
    const list = h('div', { class: 'scroll', style: 'height:424px;padding-right:4px' });
    const item = c => h('div', { class: 'card' + (cur && c.id === cur.id ? ' sel' : ''), style: 'font-size:14px;padding:1px 6px;margin-bottom:2px', onclick: () => { sel = c.id; Screens.rerender(); } }, fmt(t('h_ch'), { n: c.no }) + ' ' + titleOf(c));
    if (Screens.chronView === 'time') {
      [0, 1, 2, 3, 4].forEach(v => { const ls = chs.filter(c => c.vol === v); if (!ls.length) return; list.appendChild(h('div', { class: 'gold', style: 'margin:6px 0 2px;font-weight:bold;font-size:14px' }, S.vol[v][L])); ls.forEach(c => list.appendChild(item(c))); });
    } else {
      const groups = {}, order = []; chs.forEach(c => { const k = c.who && c.who[0] ? c.who[0] : 0; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(c); });
      order.sort((a, b) => (a === 0) - (b === 0) || groups[b].length - groups[a].length);
      order.forEach(k => {
        const g = groups[k]; const first = g[0]; const nm = k ? (first.an[k] || ['？', '？'])[L] : t('h_other'); const open = Screens.chronOpen[k] !== false && (Screens.chronOpen[k] || g.some(c => cur && c.id === cur.id) || order.length <= 6);
        const st = k ? chapStatus(first, k) : '';
        list.appendChild(h('div', { style: 'margin-top:5px;font-weight:bold;font-size:14px;cursor:pointer;display:flex;justify-content:space-between', onclick: () => { Screens.chronOpen[k] = !open; Screens.rerender(); } }, h('span', { class: 'gold' }, (open ? '▾ ' : '▸ ') + (G.track.indexOf(k) >= 0 ? '◆' : '') + nm), h('span', { class: 'sm' }, fmt(t('h_chapters_n'), { n: g.length }) + (st ? '・' + st : ''))));
        if (open) g.forEach(c => list.appendChild(h('div', { class: 'card' + (cur && c.id === cur.id ? ' sel' : ''), style: 'font-size:13px;padding:1px 6px;margin:0 0 2px 10px', onclick: () => { sel = c.id; Screens.rerender(); } }, (c.k ? fmt(t('h_part'), { k: c.k }) + ' ' : '') + renderChapter(c).bare)));
      });
    }
    left.appendChild(list);
    const people = []; G.spot.forEach(i => people.push(i)); G.track.forEach(i => { if (people.indexOf(i) < 0) people.push(i); });
    const sp = h('div', { style: 'margin-top:4px;border-top:1px solid var(--edge2);padding-top:3px' }, h('div', { class: 'gold', style: 'font-weight:bold;font-size:13px' }, t('h_spot')));
    people.forEach(i => { const hh = hById(i); if (!hh || !hh.alive) return; const tr = G.track.indexOf(i) >= 0; sp.appendChild(h('div', { style: 'font-size:13px;display:flex;justify-content:space-between;margin-bottom:1px' }, h('span', { style: 'cursor:pointer', onclick: () => { Screens.closeAll(); Screens.focusHuman(i); } }, (tr ? '◆ ' : '◇ ') + hh.name[L]), h('span', { class: 'btn' + (tr ? ' on' : ''), style: 'font-size:11px;padding:0 4px', onclick: () => { chronTrackToggle(i); Screens.rerender(); } }, tr ? t('h_tracked') : t('h_track')))); });
    if (!people.some(i => { const hh = hById(i); return hh && hh.alive; })) sp.appendChild(h('div', { class: 'sm dim', style: 'margin-top:3px' }, t('h_spot_none')));
    left.appendChild(sp);
    // ---- center ----
    let center;
    if (!cur) center = h('div', { class: 'par', style: 'width:610px;height:500px;padding:20px' }, t('h_none'));
    else {
      const r = renderChapter(cur); const ink = inkOf(cur); const a0 = cur.who && cur.who[0] ? cur.who[0] : 0; const info = a0 ? (cur.info || {})[a0] : null;
      const head = h('div', { style: 'display:flex;gap:10px;align-items:center;border-bottom:2px solid #6a4a1c;margin-bottom:6px;padding-bottom:4px' },
        info ? portrait(info, 60) : null,
        h('div', { style: 'flex:1' }, h('b', { style: 'font-size:21px;line-height:1.25;display:block' }, fmt(t('h_ch'), { n: cur.no }) + '　' + r.title),
          h('div', { style: 'font-size:13px;color:#4a2a0a' }, r.head)),
        h('div', { style: 'text-align:right' }, h('span', { class: 'ink ' + ink }, t('ink_' + ink)), ' ', h('span', { class: 'tag ' + cur.trust }, t('tr_' + cur.trust)), a0 ? h('div', { style: 'font-size:12px;color:#4a2a0a;margin-top:2px' }, chapStatus(cur, a0)) : null));
      center = h('div', { class: 'par scroll', style: 'width:610px;height:466px;padding:10px 22px;font-size:17px;line-height:1.8' }, head,
        r.recap ? h('p', { style: 'background:#00000012;padding:3px 8px;text-indent:0;font-size:15px' }, h('b', null, t('h_recap') + '　'), r.recap) : null,
        r.paras.map(p => h('p', null, h('span', { class: 'tag ' + p.tag }, t('tr_' + p.tag)), p.text)),
        h('p', { style: 'text-align:right;font-style:italic;color:#5a2a0a;margin-top:12px' }, t('hist') + '：' + r.hist));
    }
    const idx = cur ? chs.indexOf(cur) : -1; const a0 = cur && cur.who && cur.who[0] ? cur.who[0] : 0;
    const prevSame = () => { if (!cur || !a0) return null; const arr = chs.filter(c => c.who && c.who[0] === a0); const i = arr.indexOf(cur); return i > 0 ? arr[i - 1] : null; };
    const nextSame = () => { if (!cur || !a0) return null; const arr = chs.filter(c => c.who && c.who[0] === a0); const i = arr.indexOf(cur); return i >= 0 && i < arr.length - 1 ? arr[i + 1] : null; };
    const person = Screens.chronView === 'person'; const pv = person ? prevSame() : (idx > 0 ? chs[idx - 1] : null), nx = person ? nextSame() : (idx < chs.length - 1 ? chs[idx + 1] : null);
    const nav = h('div', { style: 'display:flex;gap:8px;margin-top:6px;justify-content:center;width:610px;flex-wrap:wrap' },
      h('span', { class: 'btn' + (pv ? '' : ' dis'), onclick: () => { if (pv) { sel = pv.id; Snd.se('page'); Screens.rerender(); } } }, t('h_prev')), h('span', { class: 'btn' + (nx ? '' : ' dis'), onclick: () => { if (nx) { sel = nx.id; Snd.se('page'); Screens.rerender(); } } }, t('h_next')),
      cur && a0 && G.idx[a0] && G.idx[a0].alive ? h('span', { class: 'btn' + (G.track.indexOf(a0) >= 0 ? ' on' : ''), onclick: () => { chronTrackToggle(a0); Screens.rerender(); } }, G.track.indexOf(a0) >= 0 ? t('h_untrack') : t('h_track')) : null,
      cur && a0 && G.idx[a0] && G.idx[a0].alive ? h('span', { class: 'btn', onclick: () => { const c = chronSupplement(a0); if (c) { sel = c.id; Snd.se('page'); Screens.rerender(); } } }, t('h_supp')) : null);
    // ---- right ----
    const st = counselStatus(); const acts = counselActions(Game.goal || 'boss'); const fore = foreshadows();
    const right = h('div', { class: 'scroll', style: 'width:290px;height:540px;font-size:14px;line-height:1.5' }, h('div', { class: 'gold', style: 'font-weight:bold' }, t('g_title')),
      h('div', null, fmt(t('st_balance'), { n: (st.balance > 0 ? '+' : '') + st.balance }) + '　' + fmt(t('st_faith'), { n: st.faith })), h('div', null, st.awakened ? fmt(t('st_boss_post'), { n: st.cad }) : fmt(t('st_boss_pre'), { n: st.toAwaken })),
      h('div', { class: 'gold', style: 'font-weight:bold;margin-top:8px' }, t('g_actions')),
      acts.map(a => h('div', { class: 'card', style: 'cursor:default;font-size:13px' }, fmt(t(a.key), { who: a.who ? a.who[li()] : '', pk: a.pk ? t('pk_' + a.pk) : '' }), h('div', { class: 'gold' }, t('succ') + Math.round(a.p * 100) + '%  ' + t('cost') + a.cost, '  ', h('span', { class: 'btn' + (G.faith < a.cost ? ' dis' : ''), style: 'font-size:12px;padding:0 5px', onclick: () => { if (G.faith < a.cost) return; Screens.closeAll(); doCast(a.pid, a.tid, a.dir); } }, t('g_exec'))))),
      h('div', { class: 'gold', style: 'font-weight:bold;margin-top:8px' }, t('h_foresh')), fore.map(f => h('div', { style: 'color:#d8c8ff;margin-bottom:2px' }, '◇ ' + f)));
    return this.win(40, 30, 1200, 650, [h('h3', null, t('h_title')), h('div', { style: 'display:flex;gap:10px' }, left, h('div', null, center, nav), right), h('div', { style: 'text-align:center;margin-top:4px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
  };
  this.push('chron', build, e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const chs = G.chapters; const i = chs.findIndex(c => c.id === sel); const j = clamp(i + (e.key === 'ArrowRight' ? 1 : -1), 0, chs.length - 1); if (chs[j]) { sel = chs[j].id; Snd.se('page'); Screens.rerender(); } return true; } return e.key === 'h' || e.key === 'H' ? (Screens.pop(), true) : false; });
  Snd.se('page');
};
S.h_recap = ['前回', '前情'];
