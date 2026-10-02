/* builds the whole visual acceptance pack into test/out/visual (node test/visual_pack.js) */
const { execFileSync } = require('child_process'); const path = require('path');
const run = (args) => { console.log('>', args.join(' ')); execFileSync(process.execPath, args.map(a => a), { cwd: path.join(__dirname, '..'), stdio: 'inherit', env: Object.assign({}, process.env, { PLAY: '1' }) }); };
run(['test/sprite_sheet.js', 'all']);
run(['test/sheetshot.js', '__sheetTerrain', 'terrain']); run(['test/sheetshot.js', '__sheetProps', 'props']); run(['test/sheetshot.js', '__sheetBuildings', 'buildings_day', '0']); run(['test/sheetshot.js', '__sheetBuildings', 'buildings_night', '1']); run(['test/sheetshot.js', '__sheetWater', 'water']);
for (const s of [0, 1, 2, 3]) run(['test/world_shot.js', String(s), '0', '0', '64', '40', '1', 'panorama_season_' + s]);
for (const L of ['ja', 'zh']) run(['test/shotjs.js', 'ui_' + L, L, '__uiSheet()', '600']);
run(['test/shotjs.js', 'title_ja', 'ja', '', '1200']); run(['test/shotjs.js', 'godselect_ja', 'ja', '__RT.ui.Screens.godSelect()', '1200']); run(['test/shotjs.js', 'godselect_zh', 'zh', '__RT.ui.Screens.godSelect()', '1200']);
run(['test/timelapse.js']); run(['test/compare.js']); run(['test/fx_montage.js']);
console.log('visual pack ready in test/out/visual');
