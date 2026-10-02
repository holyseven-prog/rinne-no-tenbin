/* ================= contact sheets for visual review (test/sprite_sheet.js) ================= */
function __fakeHuman(job, hair, style, skin, cloth, age, sex) { return { job, look: { hair, style, skin, cloth, acc: 0 }, age: age === undefined ? 28 : age, sex: sex || 'M' }; }
if (typeof window !== 'undefined') {
  window.__sheetChars = function () {
    const R = (job, sex, age, lvl, hair, style, skin, cloth) => Object.assign(__fakeHuman(job, hair, style, skin, cloth, age, sex), { lvl });
    const list = [['warrior M', R('swordsman', 'M', 28, 3, 1, 0, 0, 0)], ['hero M', R('swordsman', 'M', 22, 9, 3, 2, 0, 0)], ['hero F', R('swordsman', 'F', 22, 9, 4, 1, 0, 0)], ['priest M', R('priest', 'M', 35, 3, 0, 0, 1, 0)], ['priest F', R('priest', 'F', 30, 3, 1, 1, 0, 0)], ['sage M', R('mage', 'M', 40, 3, 0, 0, 0, 0)], ['mage F', R('mage', 'F', 24, 3, 2, 1, 0, 0)], ['smith M', R('smith', 'M', 36, 2, 0, 1, 1, 0)], ['farmer M', R('farmer', 'M', 30, 1, 2, 0, 0, 1)], ['farmer F', R('farmer', 'F', 28, 1, 3, 1, 0, 2)], ['merchant M', R('merchant', 'M', 33, 1, 1, 0, 1, 3)], ['herbalist F', R('herbalist', 'F', 27, 1, 5, 2, 0, 4)], ['thief', R('thief', 'M', 24, 2, 0, 0, 0, 0)], ['historian', R('historian', 'M', 41, 1, 1, 0, 0, 0)], ['elder M', R('farmer', 'M', 64, 1, 5, 0, 0, 1)], ['elder F', R('herbalist', 'F', 62, 1, 5, 1, 0, 2)], ['child M', R('farmer', 'M', 8, 1, 3, 0, 0, 5)], ['child F', R('merchant', 'F', 8, 1, 4, 1, 0, 6)]];
    const SC = 4, cw = 17 * SC, ch = 25 * SC; const cols = 7; const cv = document.createElement('canvas'); cv.width = cols * cw + 150; cv.height = list.length * ch + 10; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, cv.width, cv.height);
    list.forEach((e, r) => { c.fillStyle = '#fff'; c.font = '13px monospace'; c.fillText(e[0], 4, 5 + r * ch + 40); [[0, 0], [2, 0], [1, 0], [0, 1], [0, 3], [2, 1], [0, 5]].forEach((p, i) => c.drawImage(humanSprite(e[1], p[0], p[1]), 140 + i * cw, 5 + r * ch, 16 * SC, 24 * SC)); });
    return cv.toDataURL('image/png');
  };
  window.__sheetStates = function () {
    const SC = 5, cw = 18 * SC, ch = 26 * SC; const list = [];
    for (let i = 0; i < 8; i++) list.push(__fakeHuman('farmer', i, i % 4, i % 3, i, 30, i % 2 ? 'F' : 'M'));
    const kids = [], olds = []; for (let i = 0; i < 8; i++) { kids.push(__fakeHuman('farmer', i, i, i % 3, i, 8)); olds.push(__fakeHuman(['farmer', 'merchant', 'smith', 'herbalist'][i % 4], i, i, i % 3, i, 62, i % 2 ? 'F' : 'M')); }
    const rows = [list, kids, olds]; const cv = document.createElement('canvas'); cv.width = 8 * cw + 10; cv.height = rows.length * 2 * ch + 10; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, cv.width, cv.height);
    rows.forEach((row, r) => row.forEach((h, i) => { c.drawImage(humanSprite(h, 0, 0), 5 + i * cw + 8, 5 + r * 2 * ch, 16 * SC, 24 * SC); c.drawImage(humanSprite(h, 2, 1), 5 + i * cw + 8, 5 + r * 2 * ch + ch, 16 * SC, 24 * SC); }));
    return cv.toDataURL('image/png');
  };
}
if (typeof window !== 'undefined') {
  window.__sheetWorld = function (sea, x0, y0, w, h, sc) { const cv = document.createElement('canvas'); sc = sc || 2; cv.width = w * TS * sc; cv.height = h * TS * sc; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.drawImage(getWorldCanvas(sea), x0 * TS, y0 * TS, w * TS, h * TS, 0, 0, cv.width, cv.height); return cv.toDataURL('image/png'); };
}
if (typeof window !== 'undefined') {
  window.__sheetMonsters = function () {
    const SC = 6; const list = [['mush'], ['bat'], ['turtle'], ['goblin'], ['skel'], ['wolf']].map(a => ({ type: a[0], cad: -1, boss: false })); list.push({ type: 'cad0', cad: 0 }, { type: 'cad1', cad: 1 }, { type: 'cad2', cad: 2 }, { type: 'boss', boss: true, cad: -1 });
    const cv = document.createElement('canvas'); cv.width = 1500; cv.height = 620; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, cv.width, cv.height);
    let x = 10; list.forEach(m => { [0, 1].forEach(f => { const s = monsterSprite(m, f); const k = m.boss ? 3 : m.cad >= 0 ? 4 : SC; c.drawImage(s, x, 10 + (m.boss ? 0 : m.cad >= 0 ? 180 : 330), s.width * k, s.height * k); x += s.width * k + 6; }); if (m.cad === 2) x = 10; if (m.type === 'mush' && false) x = 10; if (['wolf'].indexOf(m.type) >= 0) x = 10; });
    return cv.toDataURL('image/png');
  };
}
if (typeof window !== 'undefined') {
  window.__sheetTerrain = function () {
    const SC = 3, cv = document.createElement('canvas'); cv.width = 1180; cv.height = 760; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#222'; c.fillRect(0, 0, cv.width, cv.height);
    const tile = (tp, sea, tx, ty) => { const t = mkCanvas(32, 32), g = t.getContext('2d'); [[0, 0], [16, 0], [0, 16], [16, 16]].forEach(o => { paintTile(g, 0, 0, T.GRASS, sea); }); return t; };
    let y = 8; const label = (s, x, yy) => { c.fillStyle = '#fff'; c.font = '14px monospace'; c.fillText(s, x, yy); };
    [0, 1, 2, 3].forEach(sea => {
      label('season ' + sea + ': grass x6 variants, flowers, path x4, plaza x3, sand, field, dark', 8, y + 12); let x = 8;
      const draw = (tp, tx, ty) => { const t = mkCanvas(16, 16), g = t.getContext('2d'); paintTile(g, tx, ty, tp, sea); c.drawImage(t, x, y + 18, 16 * 2, 16 * 2); x += 34; };
      for (let i = 0; i < 6; i++) draw(T.GRASS, 3 + i * 7, 5 + i * 3); draw(T.FLOWER, 4, 9); draw(T.FLOWER, 9, 3); for (let i = 0; i < 4; i++) draw(T.PATH, 10 + i * 5, 14 + i); for (let i = 0; i < 3; i++) draw(T.PLAZA, 25 + i, 19 + i); draw(T.SAND, 46, 30); draw(T.FIELD, 3, 4); draw(T.DARK, 60, 20);
      // trees, rocks, fence
      const t2 = mkCanvas(16 * 6, 40), g2 = t2.getContext('2d'); [3, 4, 9, 14, 23, 29].forEach((tx, i) => { paintTile(g2, i, 1, T.GRASS, sea); }); for (let i = 0; i < 6; i++) { const ty = 3; const saveV = hsh; }
      x += 6; [[3, 5], [4, 7], [7, 7], [9, 8], [11, 11], [13, 12]].forEach(p => { const t = mkCanvas(32, 40), g = t.getContext('2d'); paintTile(g, 1, 2, T.GRASS, sea); drawTree(g, p[0], p[1], sea); }); y += 80;
    });
    return cv.toDataURL('image/png');
  };
  window.__sheetProps = function () {
    const cv = document.createElement('canvas'); cv.width = 900; cv.height = 200; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, 900, 200);
    let x = 6, y = 6; PROP_KEYS.forEach((k, i) => { const t = mkCanvas(16, 24), g = t.getContext('2d'); g.translate(0, 4); try { PROPS[k](g, 0, 0, 0); } catch (e) { } c.drawImage(t, x, y, 48, 72); x += 56; if (x > 840) { x = 6; y += 80; } });
    return cv.toDataURL('image/png');
  };
  window.__sheetBuildings = function (night) {
    const kinds = ['house', 'church', 'guild', 'tavern', 'shop', 'smithy', 'apothecary', 'inn', 'hut', 'mill', 'castle']; const seen = {}; const bl = []; W.blds.forEach(b => { if (!seen[b.kind]) { seen[b.kind] = 1; bl.push(b); } });
    const SC = 2; let wTot = 20; bl.forEach(b => wTot += (b.w * TS + 20) * SC); const cv = document.createElement('canvas'); cv.width = Math.min(wTot, 2400); cv.height = 480; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, cv.width, cv.height);
    let x = 10, y = 10, rowH = 0; const world = getWorldCanvas(night ? 3 : 1);
    bl.forEach(b => { const w = b.w * TS + 12, h = b.h * TS + 56; if (x + w * SC > cv.width) { x = 10; y += rowH + 10; rowH = 0; } const t = mkCanvas(w, h), g = t.getContext('2d'); g.drawImage(world, b.x * TS - 6, b.y * TS - 44, w, h, 0, 0, w, h);
      if (night) { g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgb(92,102,164)'; g.fillRect(0, 0, w, h); g.globalCompositeOperation = 'source-over'; WIN_RECTS.forEach(r => { if (r.x >= b.x * TS - 6 && r.x < b.x * TS - 6 + w && r.y >= b.y * TS - 44 && r.y < b.y * TS - 44 + h) { g.fillStyle = r.purple ? '#e060ff' : '#ffd860'; g.fillRect(r.x - (b.x * TS - 6), r.y - (b.y * TS - 44), r.w, r.h); } }); }
      c.drawImage(t, x, y, w * SC, h * SC); c.fillStyle = '#fff'; c.font = '14px monospace'; c.fillText(b.kind, x, y + 12); x += w * SC + 10; rowH = Math.max(rowH, h * SC); });
    return cv.toDataURL('image/png');
  };
  window.__sheetWater = function () { const cv = document.createElement('canvas'); cv.width = 820; cv.height = 240; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, 820, 240); let x = 6; [0, 3].forEach((sea, r) => { for (let f = 0; f < 4; f++) { c.drawImage(waterTile(sea, f, 0, 5, 5), 6 + f * 70, 6 + r * 70, 64, 64); c.drawImage(waterTile(sea, f, 1 | 8, 5, 5), 300 + f * 70, 6 + r * 70, 64, 64); } }); c.drawImage(waterTile(1, 0, 15, 5, 5), 600, 6, 64, 64); return cv.toDataURL('image/png'); };
}
if (typeof window !== 'undefined') {
  window.__uiSheet = function () {
    const old = document.getElementById('uisheet'); if (old) old.remove(); const root = document.createElement('div'); root.id = 'uisheet'; root.style.cssText = 'position:absolute;left:0;top:0;width:1280px;height:720px;background:#10142e;z-index:99;padding:10px;overflow:hidden;color:#fff'; document.getElementById('stage').appendChild(root);
    const row = (title, ...kids) => { const d = document.createElement('div'); d.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap'; const t = document.createElement('div'); t.style.cssText = 'width:110px;font-size:12px;color:#ffe9a0'; t.textContent = title; d.appendChild(t); kids.forEach(k => d.appendChild(k)); root.appendChild(d); };
    const win = (txt, w, h, glass) => h_('div', { class: 'win' + (glass ? ' glass' : ''), style: `position:relative;width:${w}px;height:${h}px` }, h_('h3', null, txt), h_('div', { class: 'sm' }, txt + ' …'));
    function h_(tag, attrs, ...kids) { const e = document.createElement(tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); kids.forEach(k => { if (k == null) return; e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k); }); return e; }
    row('windows', win(t('faith'), 200, 70), win(t('feed'), 200, 70, true), h_('span', { class: 'btn' }, t('next')), h_('span', { class: 'btn on' }, t('skip')), h_('span', { class: 'btn dis' }, t('close')));
    const icons = ['oracle', 'grace', 'trial', 'soul', 'force', 'faith', 'scale']; row('powers', ...icons.map(n => Ico(n, 32)));
    row('jobs', ...['swordsman', 'mage', 'priest', 'thief', 'farmer', 'merchant', 'smith', 'herbalist', 'historian'].map(n => Ico(n, 32)));
    row('needs', ...['hunger', 'safety', 'wealth', 'belong', 'honor', 'faith'].map(n => Ico(n, 32)));
    row('prayers', ...PRAYER_KINDS.map(n => Ico(n, 32)));
    row('events', ...['death', 'birth', 'marriage', 'quest', 'boss', 'raid', 'divine', 'town'].map(n => Ico(n === 'birth' ? 'birth' : n, 32)));
    const js = ['swordsman', 'mage', 'priest', 'thief', 'farmer', 'merchant', 'smith', 'herbalist', 'historian']; row('portraits', ...js.map((j, i) => portraitEl({ job: j, look: { hair: i % 8, style: i % 4, skin: i % 3, cloth: i % 8, acc: 0 }, age: 28, sex: i % 2 ? 'F' : 'M' }, 72)), portraitEl({ job: 'farmer', look: { hair: 2, style: 2, skin: 1, cloth: 2, acc: 0 }, age: 8, sex: 'M' }, 72), portraitEl({ job: 'smith', look: { hair: 5, style: 1, skin: 0, cloth: 1, acc: 0 }, age: 64, sex: 'M' }, 72));
    const cvb = []; [-100, -40, 0, 40, 100].forEach(b => { const c = document.createElement('canvas'); c.width = 220; c.height = 54; const o = G ? G.balance : 0; if (G) { G.balance = b; UI.el.balCv = c; UI.drawBalance(); G.balance = o; } cvb.push(c); }); row('balance scale', ...cvb);
    const dg = ['0123456789', '70/150', '+45']; row('pixel digits', ...dg.map(s => { const im = new Image(); im.src = pxText(s, '#ffe9a0', 3); return im; }));
    const hand = [new Image(), new Image()]; hand[0].src = UISkin.hand[0]; hand[1].src = UISkin.hand[1]; hand.forEach(i => i.style.cssText = 'width:48px;height:48px;image-rendering:pixelated;background:#222'); row('cursor', ...hand);
    const emb = ['mercy', 'order', 'chaos'].map(id => { const c = document.createElement('canvas'); c.width = 66; c.height = 66; c.style.cssText = 'width:96px;height:96px;image-rendering:pixelated'; drawEmblem(c, id); return c; }); row('god emblems', ...emb);
    return true;
  };
}
