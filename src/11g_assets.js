/* ================= 視覺總指示書 part 2: delivered title / UI images (ASSETS is written by build.js as data URLs, before all scripts).
   loadAssets() -> Promise (all decoded), asset(key) -> Image, nineSlice(key, w, h) -> canvas at 1280-space size w x h:
   cut at the manifest values (source pixels), corners kept, edges / centre stretched nearest-neighbour at native size, then exactly x2. ================= */
const ASSET_IMG = {};
function loadAssets() { if (typeof ASSETS === 'undefined' || typeof Image === 'undefined') return Promise.resolve(); return Promise.all(Object.keys(ASSETS).map(k => new Promise(res => { const im = new Image(); im.onload = () => { ASSET_IMG[k] = im; res(); }; im.onerror = () => res(); im.src = ASSETS[k]; }))); }
function asset(key) { return ASSET_IMG[key.indexOf('/') < 0 ? guessAssetKey(key) : key + (key.endsWith('.png') ? '' : '.png')] || null; }
function guessAssetKey(name) { const sub = name.split('_')[0]; return sub + '/' + name + '.png'; }
const NINE = { ui_btn_menu: [14, 14, 14, 14], ui_frame: [14, 14, 14, 14], title_frame_menu: [14, 14, 14, 14], save_slot: [14, 14, 14, 14], god_card: [14, 14, 14, 14], mode_card: [14, 14, 14, 14],
  ui_btn_small: [13, 14, 13, 14], ui_btn_back: [13, 14, 13, 14], settings_tab: [13, 14, 13, 14], mode_badge_recommended: [0, 14, 0, 14], settings_slider_track: [2, 6, 2, 6] };
function nineCut(key) { const n = key.split('/').pop().replace('.png', ''); for (const k in NINE) if (n.startsWith(k)) return NINE[k]; return [14, 14, 14, 14]; }
const NINE_CACHE = {};
function nineSlice(key, w, h) { // key like 'ui/ui_frame_window'; w, h even (1280 space)
  key = key.endsWith('.png') ? key : key + '.png'; const ck = key + ':' + w + 'x' + h; if (NINE_CACHE[ck]) return NINE_CACHE[ck]; const im = ASSET_IMG[key]; const out = document.createElement('canvas'); out.width = w; out.height = h; if (!im) return out;
  const [T, R, B, L] = nineCut(key); const sw = im.width, sh = im.height; const W = Math.max(L + R, Math.round(w / 2)), H = Math.max(T + B, Math.round(h / 2));
  const nat = document.createElement('canvas'); nat.width = W; nat.height = H; const c = nat.getContext('2d'); c.imageSmoothingEnabled = false;
  const mw = sw - L - R, mh = sh - T - B, dw = W - L - R, dh = H - T - B;
  const part = (sx, sy, sW, sH, dx, dy, dW, dH) => { if (sW > 0 && sH > 0 && dW > 0 && dH > 0) c.drawImage(im, sx, sy, sW, sH, dx, dy, dW, dH); };
  part(0, 0, L, T, 0, 0, L, T); part(sw - R, 0, R, T, W - R, 0, R, T); part(0, sh - B, L, B, 0, H - B, L, B); part(sw - R, sh - B, R, B, W - R, H - B, R, B);
  part(L, 0, mw, T, L, 0, dw, T); part(L, sh - B, mw, B, L, H - B, dw, B); part(0, T, L, mh, 0, T, L, dh); part(sw - R, T, R, mh, W - R, T, R, dh); part(L, T, mw, mh, L, T, dw, dh);
  const oc = out.getContext('2d'); oc.imageSmoothingEnabled = false; oc.drawImage(nat, 0, 0, W * 2, H * 2); return (NINE_CACHE[ck] = out); }
/* a DOM element showing an asset at exactly 2x (or 1:1 for the 128/64/32 emblems) */
function assetEl(key, x, y, scale, extra) { const im = asset(key); const s = scale || 2; const el = document.createElement('canvas'); if (!im) return el; el.width = im.width * s; el.height = im.height * s; const c = el.getContext('2d'); c.imageSmoothingEnabled = false; c.drawImage(im, 0, 0, el.width, el.height); el.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;image-rendering:pixelated;' + (extra || ''); return el; }
function nineEl(key, x, y, w, h, extra) { const cv = nineSlice(key, w, h); const el = document.createElement('canvas'); el.width = w; el.height = h; el.getContext('2d').drawImage(cv, 0, 0); el.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;image-rendering:pixelated;' + (extra || ''); return el; }
