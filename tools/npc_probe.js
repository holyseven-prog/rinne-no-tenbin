const { load, savePng } = require('./imgdata'); const fs = require('fs');
(async () => { const f = 'docs/figures/npc/npc_design_sheet.png'; const im = (await load([f]))[f]; console.log(im.w, im.h);
  const px = (x, y) => { const i = (y * im.w + x) * 4; return [im.data[i], im.data[i + 1], im.data[i + 2]]; };
  // sample some background colors
  [[100, 200], [100, 380], [700, 200], [700, 380], [1200, 600], [400, 800]].forEach(([x, y]) => console.log(x, y, px(x, y).join(',')));
  fs.writeFileSync('tools/npc_sheet.json', JSON.stringify({ w: im.w, h: im.h }));
  require('fs').writeFileSync('tools/npc_sheet.bin', Buffer.from(im.data));
})();
