/* ================= contact sheets for visual review (test/sprite_sheet.js) ================= */
function __fakeHuman(job, hair, style, skin, cloth, age, sex) { return { job, look: { hair, style, skin, cloth, acc: 0 }, age: age === undefined ? 28 : age, sex: sex || 'M' }; }
if (typeof window !== 'undefined') {
  window.__sheetChars = function () {
    const jobs = ['swordsman', 'mage', 'priest', 'thief', 'farmer', 'merchant', 'smith', 'herbalist', 'historian']; const SC = 4, cw = 18 * SC, ch = 26 * SC;
    const cv = document.createElement('canvas'); cv.width = 16 * cw + 10; cv.height = jobs.length * ch * 1 + 10; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.fillStyle = '#58a840'; c.fillRect(0, 0, cv.width, cv.height);
    jobs.forEach((j, r) => { let col = 0; [0, 1, 2, 3].forEach(d => { [0, 1, 2, 3].forEach(f => { const h = __fakeHuman(j, r % 8, r % 4, r % 3, r % 8, 28, r % 2 ? 'F' : 'M'); const s = humanSprite(h, d, f); c.drawImage(s, 5 + col * cw + 8, 5 + r * ch, 16 * SC, 24 * SC); col++; }); }); });
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
