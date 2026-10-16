/* ================= sprite data runtime: SPR_Z (written by tools/png2code.js, lossless) -> SPR[key] = canvas, decoded once before the boot screen.
   NPC walk frames are made here from the standing frame: only the bottom 20 % (feet) shifts, left / right feet alternating. ================= */
const SPR = {}; const SPR_Z = [];
function sprB64(s) { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; }
async function inflateRaw(u8) { const ds = new DecompressionStream('deflate-raw'); const buf = await new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer(); return new Uint8ClampedArray(buf); }
function sprCanvas(w, h, rgba) { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; cv.getContext('2d').putImageData(new ImageData(rgba, w, h), 0, 0); return cv; }
/* walk frame: feet band (bottom 20 %) — left half shifted by -d, right half by +d (frame 1), the other way round (frame 2) */
function walkFrame(cv, f) { const w = cv.width, h = cv.height; const o = document.createElement('canvas'); o.width = w; o.height = h; const c = o.getContext('2d'); const band = Math.max(2, Math.round(h * 0.2)), top = h - band; const d = h >= 80 ? 2 : 1; const s = f === 1 ? 1 : -1;
  c.drawImage(cv, 0, 0, w, top, 0, 0, w, top); const half = Math.floor(w / 2); c.drawImage(cv, 0, top, half, band, -d * s, top, half, band); c.drawImage(cv, half, top, w - half, band, half + d * s, top, w - half, band); return o; }
let SPR_READY = false;
async function loadSprites() { if (typeof DecompressionStream === 'undefined' || typeof document === 'undefined') return; const jobs = [];
  for (const pack of SPR_Z) for (const k in pack) { const e = pack[k]; jobs.push(inflateRaw(sprB64(e.z)).then(px => { SPR[k] = sprCanvas(e.w, e.h, px); })); }
  await Promise.all(jobs);
  for (const k of Object.keys(SPR)) { const m = k.match(/^(npc_.+)_0(_hd)?$/); if (!m) continue; const hd = m[2] || ''; if (!SPR[m[1] + '_1' + hd]) SPR[m[1] + '_1' + hd] = walkFrame(SPR[k], 1); if (!SPR[m[1] + '_2' + hd]) SPR[m[1] + '_2' + hd] = walkFrame(SPR[k], 2); }
  SPR_READY = true; }
