/* ================= audio: WebAudio synthesis (orchestral-style, all original) ================= */
const SCALES = { maj: [0, 2, 4, 5, 7, 9, 11], min: [0, 2, 3, 5, 7, 8, 10], dor: [0, 2, 3, 5, 7, 9, 10], harm: [0, 2, 3, 5, 7, 8, 11], lyd: [0, 2, 4, 6, 7, 9, 11] };
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const RHY = {
  stately: [[1.5, .5, 1, 1], [2, 1, 1], [1, 1, 1, 1], [1.5, .5, 2], [3, 1]],
  lilt: [[1, .5, .5, 1, 1], [.5, .5, .5, .5, 1, 1], [1.5, .5, 1, 1], [1, 1, 2]],
  march: [[1, .5, .5, 1, 1], [.75, .25, 1, 1, 1], [1, 1, 1, 1], [1.5, .5, 1, 1]],
  fast: [[.5, .5, .5, .5, .5, .5, .5, .5], [.5, .5, 1, .5, .5, 1], [.75, .25, .5, .5, .5, .5, 1]],
  slow: [[2, 2], [3, 1], [1, 1, 2], [4]],
  sad: [[2, 1, 1], [3, 1], [1.5, .5, 2], [4]],
};
function composeSong(sp) {
  const rg = new RNG(sp.seed), sc = SCALES[sp.mode], ev = [];
  const midiOf = (deg, oct) => { const d = deg - 1, o = Math.floor(d / 7), i = ((d % 7) + 7) % 7; return sp.root + sc[i] + 12 * (o + (oct || 0)); };
  const bars = sp.bars;
  const ch = bar => sp.prog[bar % sp.prog.length];
  for (let bar = 0; bar < bars; bar++) {
    const c = ch(bar), b0 = bar * 4;
    if (sp.pad) [0, 2, 4].forEach((k, j) => ev.push({ b: b0, d: 4, n: midiOf(c + k, -1) + (j === 2 && sp.padHigh ? 12 : 0), i: sp.pad, v: sp.padV || 0.3 }));
    // bass
    const r = midiOf(c, -2), f5 = midiOf(c + 4, -2);
    if (sp.bass === 'root') ev.push({ b: b0, d: 4, n: r, i: 'bass', v: .5 });
    else if (sp.bass === 'pulse') for (let k = 0; k < 4; k++) ev.push({ b: b0 + k, d: .9, n: k % 2 ? f5 : r, i: 'bass', v: .5 });
    else if (sp.bass === 'walk') for (let k = 0; k < 8; k++) ev.push({ b: b0 + k * .5, d: .45, n: [r, f5, r + 12, f5][k % 4], i: 'bass', v: .42 });
    else if (sp.bass === 'pizz') [[0, r], [1, f5], [2, r], [3, f5]].forEach(a => ev.push({ b: b0 + a[0], d: .3, n: a[1] + 12, i: 'pizz', v: .55 }));
    else if (sp.bass === 'ostinato') for (let k = 0; k < 8; k++) ev.push({ b: b0 + k * .5, d: .4, n: r + (k % 4 === 3 ? 1 : k % 2 ? 7 : 0), i: sp.ostI || 'cello', v: .45 });
    // percussion
    if (sp.perc === 'march') { ev.push({ b: b0, d: 1, n: 43, i: 'timp', v: .8 }); ev.push({ b: b0 + 2, d: 1, n: 43, i: 'timp', v: .6 }); ev.push({ b: b0 + 1, d: .2, n: 0, i: 'snare', v: .4 }); ev.push({ b: b0 + 3, d: .2, n: 0, i: 'snare', v: .4 }); ev.push({ b: b0 + 3.5, d: .2, n: 0, i: 'snare', v: .3 }); }
    else if (sp.perc === 'fast') { for (let k = 0; k < 8; k++) ev.push({ b: b0 + k * .5, d: .3, n: 40, i: 'timp', v: k % 2 ? .35 : .65 }); ev.push({ b: b0 + 3.5, d: .3, n: 0, i: 'snare', v: .5 }); if (bar % 4 === 3) ev.push({ b: b0, d: 2, n: 0, i: 'cym', v: .4 }); }
    else if (sp.perc === 'slow') { ev.push({ b: b0, d: 2, n: 36, i: 'timp', v: .8 }); if (bar % 2) ev.push({ b: b0 + 2, d: 2, n: 36, i: 'timp', v: .5 }); }
    else if (sp.perc === 'stab') { ev.push({ b: b0, d: 2, n: 38, i: 'timp', v: .9 }); }
    // arpeggio
    if (sp.arp) { const ct = [c, c + 2, c + 4, c + 7]; for (let k = 0; k < 8; k++) { const dgr = ct[(sp.arpDir === 'down' ? 3 - (k % 4) : k % 4)]; ev.push({ b: b0 + k * .5, d: .5, n: midiOf(dgr, 0) + (k >= 4 ? 0 : 0), i: sp.arp, v: .3 }); } }
    if (sp.bell && bar % 2 === 0) ev.push({ b: b0, d: 4, n: midiOf(c, 1), i: 'bell', v: .35 });
    if (sp.stab && (bar % 4 === 3 || bar % 4 === 0)) { [0, 2, 4].forEach(k => ev.push({ b: b0 + (bar % 4 === 3 ? 2 : 0), d: 1.6, n: midiOf(c + k, -1), i: 'brass', v: .45 })); }
  }
  // counter line
  if (sp.cm) { for (let bar = 0; bar < bars; bar++) { const c = ch(bar); ev.push({ b: bar * 4, d: 2, n: midiOf(c + 2, 0), i: sp.cm, v: .3 }); ev.push({ b: bar * 4 + 2, d: 2, n: midiOf(c + 4, 0), i: sp.cm, v: .28 }); } }
  // melody
  const cells = RHY[sp.style];
  const motif = () => ({ r: [rg.pick(cells), rg.pick(cells)], tend: rg.pick([1, -1, 0]) });
  let M0 = motif(), M1 = motif(), cur = sp.start || 5;
  for (let p = 0; p * 2 < bars; p++) {
    const form = p % 4, M = form === 2 ? M1 : M0;
    if (form === 0 && p > 0) { M0 = motif(); }
    for (let k = 0; k < 2; k++) {
      const bar = p * 2 + k; if (bar >= bars) break; const cell = M.r[k]; let pos = 0; const c = ch(bar); const tones = [c, c + 2, c + 4];
      cell.forEach((d, ni) => {
        const strong = pos % 2 === 0; const last = (k === 1 && ni === cell.length - 1);
        if (last) { const tgt = form === 3 ? 1 + 7 : form === 1 ? c + 4 : tones[rg.int(0, 2)]; cur = nearestDeg(tgt, cur); }
        else if (strong || ni === 0) { let best = cur, bd = 99; tones.forEach(t => { for (let o = -1; o <= 2; o++) { const dg = t + 7 * o; const dd = Math.abs(dg - cur) + rg.next() * 1.2; if (dg >= 3 && dg <= 13 && dd < bd) { bd = dd; best = dg; } } }); cur = best; }
        else { const stp = rg.pick([-2, -1, -1, 0, 1, 1, 2]) + (M.tend * (rg.chance(.4) ? 1 : 0)); cur = clamp(cur + stp, 3, 13); }
        ev.push({ b: bar * 4 + pos, d: d * (sp.legato || .92), n: midiOf(cur, 0) + (sp.melOct || 0) * 12, i: sp.mel, v: .62 });
        pos += d;
      });
    }
  }
  function nearestDeg(tgt, cur) { let best = tgt, bd = 99; for (let o = -2; o <= 2; o++) { const dg = tgt + 7 * o; if (Math.abs(dg - cur) < bd && dg >= 3 && dg <= 13) { bd = Math.abs(dg - cur); best = dg; } } return best; }
  // intro fanfare
  (sp.intro || []).forEach(e => ev.push(e));
  ev.sort((a, b) => a.b - b.b);
  return { ev, beats: bars * 4, bpm: sp.bpm, loop: sp.loop !== false };
}
const SONGS = {
  title: { seed: 11, root: 60, mode: 'maj', bpm: 92, bars: 16, prog: [1, 5, 6, 3, 4, 1, 4, 5, 1, 5, 6, 3, 4, 5, 1, 1], pad: 'strings', padV: .32, bass: 'pulse', perc: 'slow', arp: 'harp', mel: 'brass', style: 'stately', cm: 'flute', start: 5, bell: 1,
    intro: [{ b: 0, d: .5, n: 72, i: 'brass', v: .8 }, { b: .5, d: .5, n: 79, i: 'brass', v: .8 }, { b: 1, d: 1.5, n: 84, i: 'brass', v: .9 }, { b: 2.5, d: .5, n: 81, i: 'brass', v: .7 }, { b: 3, d: 1, n: 79, i: 'brass', v: .8 }, { b: 0, d: 3, n: 36, i: 'timp', v: .9 }] },
  opening: { seed: 23, root: 57, mode: 'min', bpm: 64, bars: 12, prog: [1, 6, 4, 5, 1, 3, 6, 5], pad: 'strings', bass: 'root', perc: 'none', mel: 'flute', style: 'sad', bell: 1, start: 6, padV: .3 },
  town_day: { seed: 31, root: 67, mode: 'maj', bpm: 108, bars: 16, prog: [1, 4, 5, 1, 6, 4, 5, 1], pad: 'strings', padV: .22, bass: 'pizz', perc: 'none', arp: 'harp', mel: 'flute', style: 'lilt', start: 6, melOct: 0 },
  town_night: { seed: 41, root: 62, mode: 'dor', bpm: 70, bars: 16, prog: [1, 7, 6, 7, 1, 4, 5, 1], pad: 'strings', padV: .34, bass: 'root', perc: 'none', arp: 'harp', arpDir: 'down', mel: 'flute', style: 'slow', start: 5, bell: 1 },
  battle: { seed: 53, root: 57, mode: 'min', bpm: 140, bars: 24, prog: [1, 1, 6, 7, 1, 4, 5, 5], pad: 'strings', padV: .25, bass: 'walk', perc: 'march', mel: 'brass', style: 'march', start: 7, stab: 1 },
  divine: { seed: 61, root: 65, mode: 'lyd', bpm: 58, bars: 8, prog: [1, 5, 6, 4], pad: 'choir', padHigh: 1, padV: .4, bass: 'root', perc: 'none', mel: 'choir', style: 'slow', bell: 1, start: 8, legato: 1 },
  boss_awake: { seed: 71, root: 52, mode: 'harm', bpm: 84, bars: 16, prog: [1, 1, 6, 5, 1, 4, 5, 1], pad: 'strings', padV: .28, bass: 'ostinato', ostI: 'cello', perc: 'stab', mel: 'brass', style: 'sad', start: 4, stab: 1, bell: 1 },
  decisive: { seed: 83, root: 62, mode: 'min', bpm: 164, bars: 24, prog: [1, 6, 7, 5, 1, 4, 5, 5], pad: 'strings', padV: .26, bass: 'walk', perc: 'fast', mel: 'brass', style: 'fast', cm: 'strings', start: 8, stab: 1 },
  victory: { seed: 97, root: 60, mode: 'maj', bpm: 126, bars: 8, prog: [1, 4, 5, 1, 6, 4, 5, 1], pad: 'strings', padV: .3, bass: 'pulse', perc: 'slow', arp: 'harp', mel: 'brass', style: 'stately', cm: 'flute', start: 8, loop: false, bell: 1,
    intro: [{ b: 0, d: .5, n: 72, i: 'brass', v: .9 }, { b: .5, d: .5, n: 76, i: 'brass', v: .9 }, { b: 1, d: .5, n: 79, i: 'brass', v: .9 }, { b: 1.5, d: 2.5, n: 84, i: 'brass', v: 1 }] },
  revelation: { seed: 103, root: 55, mode: 'min', bpm: 56, bars: 12, prog: [1, 6, 3, 7, 1, 4, 5, 1], pad: 'choir', padV: .34, bass: 'root', perc: 'none', arp: 'harp', mel: 'flute', style: 'sad', bell: 1, start: 6, loop: false },
  doom: { seed: 113, root: 48, mode: 'min', bpm: 50, bars: 8, prog: [1, 1, 6, 5], pad: 'strings', padV: .35, bass: 'root', perc: 'slow', mel: 'brass', style: 'slow', bell: 1, start: 4, loop: false },
};
const SONG_CACHE = {};

const Snd = {
  ctx: null, vol: { master: 0.8, bgm: 0.6, se: 0.7 }, muted: false, active: 0, MAXV: 32, bus: null, noiseBuf: null, songBus: null, name: '', timer: 0, song: null, startT: 0, idx: 0, loopOff: 0, paused: false, duck: 1,
  init(over) {
    if (this.ctx || typeof window === 'undefined') return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC && !over) return;
      const ctx = this.ctx = over || new AC();
      this.master = ctx.createGain(); this.comp = ctx.createDynamicsCompressor(); this.comp.threshold.value = -16; this.comp.ratio.value = 4;
      this.master.connect(this.comp); this.comp.connect(ctx.destination);
      this.bgmBus = ctx.createGain(); this.seBus = ctx.createGain();
      this.rev = ctx.createConvolver(); this.rev.buffer = this.makeIR(2.4); this.revIn = ctx.createGain(); this.revIn.gain.value = 0.5; this.revOut = ctx.createGain(); this.revOut.gain.value = 0.6;
      this.revIn.connect(this.rev); this.rev.connect(this.revOut); this.revOut.connect(this.master);
      this.bgmBus.connect(this.master); this.bgmBus.connect(this.revIn); this.seBus.connect(this.master); this.seBus.connect(this.revIn);
      const n = ctx.sampleRate * 1.5, nb = ctx.createBuffer(1, n, ctx.sampleRate), d = nb.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; this.noiseBuf = nb;
      this.applyVol();
    } catch (e) { this.ctx = null; }
  },
  makeIR(sec) { const ctx = this.ctx, len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate); for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); } return b; },
  applyVol() { if (!this.ctx) return; const t = this.ctx.currentTime; this.master.gain.setTargetAtTime(this.muted ? 0 : this.vol.master, t, 0.03); this.bgmBus.gain.setTargetAtTime(this.vol.bgm * 0.55 * (this.paused ? 0.25 : 1) * this.duck, t, 0.12); this.seBus.gain.setTargetAtTime(this.vol.se * 0.8, t, 0.03); },
  unlock() { this.init(); if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  setMuted(m) { this.muted = m; this.applyVol(); },
  setPaused(p) { this.paused = p; this.applyVol(); },
  /* --- voices --- */
  node(g, out, end, cnt) { /* register cleanup */ this.active++; let left = cnt; return () => { if (--left <= 0) { this.active--; try { g.disconnect(); } catch (e) { } } }; },
  osc(type, f, t, end, dest, detune) { const o = this.ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); if (detune) o.detune.value = detune; o.connect(dest); o.start(t); o.stop(end); return o; },
  play(inst, midi, t, dur, vel, bus) {
    if (!this.ctx || this.active > this.MAXV) return;
    const ctx = this.ctx, f = mtof(midi), v = (vel || 0.5);
    const g = ctx.createGain(); g.connect(bus || this.bgmBus);
    const done = (n, end) => this.node(g, bus, end, n);
    const adsr = (a, r, peak, sus) => { const e = t + dur; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.setTargetAtTime(peak * (sus === undefined ? 1 : sus), t + a, 0.15); g.gain.setTargetAtTime(0.0001, e, r / 3); return e + r * 1.4; };
    const lfoV = (oscs, depth) => { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5.2; lg.gain.value = depth; l.connect(lg); oscs.forEach(o => lg.connect(o.detune)); l.start(t); l.stop(t + dur + 1.5); return l; };
    switch (inst) {
      case 'strings': { const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = Math.min(5000, f * 4 + 700); flt.Q.value = .4; flt.connect(g); const end = adsr(0.22, 0.6, v * 0.16, 0.9); const os = [-9, 0, 9].map(d => this.osc('sawtooth', f, t, end, flt, d)); const l = lfoV(os, 5); const dn = done(os.length + 1, end); os.forEach(o => o.onended = dn); l.onended = dn; break; }
      case 'brass': { const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.Q.value = 1.2; flt.frequency.setValueAtTime(300, t); flt.frequency.linearRampToValueAtTime(Math.min(6000, f * 5 + 1200), t + 0.07); flt.frequency.setTargetAtTime(Math.min(4000, f * 3 + 700), t + 0.1, 0.2); flt.connect(g); const end = adsr(0.035, 0.2, v * 0.22, 0.75); const a = this.osc('sawtooth', f, t, end, flt, 0), b = this.osc('square', f, t, end, flt, 5); const dn = done(2, end); a.onended = dn; b.onended = dn; break; }
      case 'flute': { const end = adsr(0.07, 0.18, v * 0.2, 0.8); const a = this.osc('triangle', f, t, end, g, 0), b = this.osc('sine', f * 2, t, end, g, 0); const nz = ctx.createBufferSource(); nz.buffer = this.noiseBuf; const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 2; bp.Q.value = 2; const ng = ctx.createGain(); ng.gain.value = 0.05; nz.connect(bp); bp.connect(ng); ng.connect(g); nz.start(t); nz.stop(end); const l = lfoV([a], 6); const dn = done(4, end); a.onended = dn; b.onended = dn; nz.onended = dn; l.onended = dn; break; }
      case 'harp': { const end = t + Math.min(1.6, dur + 1.0); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v * 0.32, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, end); const a = this.osc('triangle', f, t, end, g, 0), b = this.osc('sine', f * 2, t, end, g, 0); const dn = done(2, end); a.onended = dn; b.onended = dn; break; }
      case 'pizz': { const end = t + 0.35; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v * 0.3, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, end); const a = this.osc('triangle', f, t, end, g, 0); a.onended = done(1, end); break; }
      case 'cello': case 'bass': { const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = inst === 'bass' ? 420 : 700; flt.connect(g); const end = adsr(0.03, 0.12, v * 0.34, 0.8); const a = this.osc('sawtooth', f, t, end, flt, 0), b = this.osc('sine', f, t, end, g, 0); const dn = done(2, end); a.onended = dn; b.onended = dn; break; }
      case 'timp': { const end = t + 1.0; g.gain.setValueAtTime(v * 0.9, t); g.gain.exponentialRampToValueAtTime(0.0001, end); const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(f * 1.9, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.09); o.connect(g); o.start(t); o.stop(end); const nz = ctx.createBufferSource(); nz.buffer = this.noiseBuf; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400; const ng = ctx.createGain(); ng.gain.setValueAtTime(v * 0.5, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.14); nz.connect(lp); lp.connect(ng); ng.connect(g); nz.start(t); nz.stop(t + 0.16); const dn = done(2, end); o.onended = dn; nz.onended = dn; break; }
      case 'snare': { const end = t + 0.2; const nz = ctx.createBufferSource(); nz.buffer = this.noiseBuf; const bp = ctx.createBiquadFilter(); bp.type = 'highpass'; bp.frequency.value = 1500; g.gain.setValueAtTime(v * 0.4, t); g.gain.exponentialRampToValueAtTime(0.0001, end); nz.connect(bp); bp.connect(g); nz.start(t); nz.stop(end); nz.onended = done(1, end); break; }
      case 'cym': { const end = t + 1.2; const nz = ctx.createBufferSource(); nz.buffer = this.noiseBuf; const bp = ctx.createBiquadFilter(); bp.type = 'highpass'; bp.frequency.value = 5000; g.gain.setValueAtTime(v * 0.25, t); g.gain.exponentialRampToValueAtTime(0.0001, end); nz.connect(bp); bp.connect(g); nz.start(t); nz.stop(end); nz.onended = done(1, end); break; }
      case 'bell': { const end = t + 3.2; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v * 0.3, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, end); const os = [[1, .5], [2.76, .3], [5.4, .14], [8.93, .08]].map(a => { const pg = ctx.createGain(); pg.gain.value = a[1]; pg.connect(g); return this.osc('sine', f * a[0], t, end, pg, 0); }); const dn = done(os.length, end); os.forEach(o => o.onended = dn); break; }
      case 'choir': { const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = 1500; flt.connect(g); const end = adsr(0.6, 0.9, v * 0.2, 0.95); const os = [[1, 0], [1, 6], [2, -4], [3, 3]].map(a => this.osc('sine', f * a[0], t, end, flt, a[1])); const l = lfoV(os, 4); const dn = done(os.length + 1, end); os.forEach(o => o.onended = dn); l.onended = dn; break; }
      default: { const end = adsr(0.01, 0.1, v * 0.2, 0.7); const a = this.osc('sine', f, t, end, g, 0); a.onended = done(1, end); }
    }
  },
  /* --- sequencer --- */
  playSong(name) {
    if (!this.ctx) { this.want = name; return; }
    if (this.name === name && this.timer) return;
    this.stopSong(0.7);
    const sp = SONGS[name]; if (!sp) return;
    if (!SONG_CACHE[name]) SONG_CACHE[name] = composeSong(sp);
    this.song = SONG_CACHE[name]; this.name = name; this.idx = 0; this.loopOff = 0; this.startT = this.ctx.currentTime + 0.12;
    this.songBus = this.ctx.createGain(); this.songBus.connect(this.bgmBus);
    this.songBus.gain.setValueAtTime(0.0001, this.ctx.currentTime); this.songBus.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.5);
    this.timer = setInterval(() => this.pump(), 50);
  },
  stopSong(fade) {
    if (this.timer) { clearInterval(this.timer); this.timer = 0; }
    if (this.songBus && this.ctx) { const sb = this.songBus, t = this.ctx.currentTime; sb.gain.cancelScheduledValues(t); sb.gain.setTargetAtTime(0.0001, t, (fade || 0.5) / 3); setTimeout(() => { try { sb.disconnect(); } catch (e) { } }, ((fade || 0.5) + 0.5) * 1000); }
    this.songBus = null; this.name = '';
  },
  pump() {
    if (!this.ctx || !this.song) return;
    const now = this.ctx.currentTime, S0 = this.song, spb = 60 / S0.bpm;
    for (let guard = 0; guard < 200; guard++) {
      const e = S0.ev[this.idx];
      if (!e) { if (S0.loop) { this.idx = 0; this.loopOff += S0.beats; continue; } else { if (now > this.startT + (S0.beats + this.loopOff) * spb + 2) { clearInterval(this.timer); this.timer = 0; this.name = ''; } break; } }
      const t = this.startT + (e.b + this.loopOff) * spb;
      if (t > now + 0.45) break;
      if (t >= now - 0.08) this.play(e.i, e.n || 60, Math.max(t, now), Math.max(0.08, e.d * spb), e.v, this.songBus);
      this.idx++;
    }
  },
  stinger(name) { /* choir swell over current bgm */
    if (!this.ctx) return; const t = this.ctx.currentTime + 0.02; const root = 53;
    [0, 4, 7, 12, 16].forEach((k, i) => this.play('choir', root + k, t + i * 0.02, 3.2, 0.7, this.seBus));
    this.play('bell', root + 12, t, 2, 0.6, this.seBus);
  },
  /* --- SE --- */
  se(name) {
    if (!this.ctx || this.muted) return; const t = this.ctx.currentTime + 0.005, B = this.seBus, p = (i, m, dt, d, v) => this.play(i, m, t + dt, d, v, B);
    switch (name) {
      case 'cursor': p('harp', 84, 0, .08, .35); break;
      case 'ok': p('harp', 76, 0, .1, .5); p('harp', 83, .06, .12, .5); break;
      case 'cancel': p('harp', 72, 0, .1, .4); p('harp', 65, .06, .14, .35); break;
      case 'pray': p('bell', 88, 0, .6, .5); p('bell', 95, .12, .5, .35); break;
      case 'power1': [72, 76, 79].forEach((m, i) => p('harp', m, i * .06, .2, .5)); break;
      case 'power2': [72, 79, 84, 88].forEach((m, i) => p('harp', m, i * .06, .25, .5)); p('choir', 60, 0, 1, .5); break;
      case 'power3': [67, 63, 60, 55].forEach((m, i) => p('brass', m, i * .08, .3, .55)); p('timp', 36, 0, 1, .7); break;
      case 'power4': [60, 67, 72, 79, 84].forEach((m, i) => p('harp', m, i * .07, .3, .45)); p('choir', 67, 0, 1.2, .5); break;
      case 'power5': [48, 55, 60, 64, 67].forEach((m, i) => p('brass', m, i * .05, .5, .6)); p('timp', 36, 0, 1, .8); p('bell', 79, .1, 1, .5); break;
      case 'success': [72, 76, 79, 84].forEach((m, i) => p('brass', m, i * .08, i === 3 ? .5 : .12, .6)); break;
      case 'crit': [72, 76, 79, 84, 88, 91].forEach((m, i) => p('brass', m, i * .07, i === 5 ? .9 : .12, .7)); p('bell', 96, .4, 1.5, .5); p('timp', 36, 0, 1, .7); break;
      case 'twist': [72, 70, 73, 68].forEach((m, i) => p('flute', m, i * .1, .2, .5)); break;
      case 'fail': [64, 60, 55].forEach((m, i) => p('bass', m - 12, i * .14, .3, .6)); break;
      case 'hit': p('snare', 60, 0, .08, 1.2); break;
      case 'level': [72, 76, 79, 84].forEach((m, i) => p('brass', m, i * .06, .1, .55)); break;
      case 'reincarnate': [60, 64, 67, 72, 76, 79].forEach((m, i) => p('harp', m, i * .1, .4, .5)); p('bell', 91, .5, 2, .5); break;
      case 'awaken': p('timp', 31, 0, 2, 1); p('timp', 31, .5, 2, 1); [40, 41, 46].forEach(m => p('strings', m, 0, 3.5, .9)); p('brass', 51, .3, 2.5, .8); p('bell', 55, 0, 3, .6); break;
      case 'page': p('snare', 60, 0, .05, .25); break;
      case 'victory': [60, 64, 67, 72, 67, 72, 76, 84].forEach((m, i) => p('brass', m, i * .12, i === 7 ? 1.4 : .12, .8)); p('timp', 36, 0, 1.5, .8); break;
      case 'defeat': [55, 52, 48, 43].forEach((m, i) => p('strings', m, i * .35, 1.2, .7)); p('timp', 31, 0, 2, .9); break;
    }
  },
};
