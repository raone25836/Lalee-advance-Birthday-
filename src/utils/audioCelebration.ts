/**
 * Web Audio API based birthday chime & melody synthesizer
 * Completely standalone, no external MP3 dependencies
 */

export function playSurpriseMelody() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Notes for "Happy Birthday":
    // G4, G4, A4, G4, C5, B4
    const notes = [
      { freq: 392.00, dur: 0.25, time: 0 },    // G4
      { freq: 392.00, dur: 0.25, time: 0.28 }, // G4
      { freq: 440.00, dur: 0.45, time: 0.56 }, // A4
      { freq: 392.00, dur: 0.45, time: 1.05 }, // G4
      { freq: 523.25, dur: 0.50, time: 1.55 }, // C5
      { freq: 493.88, dur: 0.80, time: 2.10 }, // B4
    ];

    notes.forEach(({ freq, dur, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // sweet, bell-like tone
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      // Chime envelope
      gain.gain.setValueAtTime(0, ctx.currentTime + time);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur);
    });

    // Magical chime sparkles
    const sparkles = [784.0, 987.77, 1174.66, 1567.98];
    sparkles.forEach((freq, idx) => {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();
      sOsc.type = 'sine';
      sOsc.frequency.setValueAtTime(freq, ctx.currentTime + 2.4 + idx * 0.1);

      sGain.gain.setValueAtTime(0, ctx.currentTime + 2.4 + idx * 0.1);
      sGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2.4 + idx * 0.1 + 0.02);
      sGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4 + idx * 0.1 + 0.4);

      sOsc.connect(sGain);
      sGain.connect(ctx.destination);

      sOsc.start(ctx.currentTime + 2.4 + idx * 0.1);
      sOsc.stop(ctx.currentTime + 2.4 + idx * 0.1 + 0.45);
    });
  } catch {
    // Graceful fallback if audio is blocked by user policy
  }
}

export function playCandleBlowSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // Ignore
  }
}
