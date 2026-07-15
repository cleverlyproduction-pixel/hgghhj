// Web Audio API Sound Synthesizer for BOUNCY ASS VIDEOS
// Creates playful, cartoonish, and rubbery audio effects entirely on the fly.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playBounceSound(
  type: 'boing' | 'splat' | 'swoosh' | 'rubber' | 'pop',
  volume: number = 0.3
) {
  if (volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
  masterGain.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case 'pop': {
      // Crisp, cute bubble/jelly pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
      break;
    }

    case 'boing': {
      // Classic rubber spring cartoon sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      
      // Multi-step sweep simulating a vibrating spring coil
      osc.frequency.linearRampToValueAtTime(260, now + 0.1);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);
      osc.frequency.linearRampToValueAtTime(320, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);

      gain.gain.setValueAtTime(1, now);
      gain.gain.linearRampToValueAtTime(0.8, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      // Lowpass filter to make it softer and warmer
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.45);
      break;
    }

    case 'rubber': {
      // Slower, deeper rubber bands
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.3);

      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now); // heavy muffling

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }

    case 'splat': {
      // Squishy landing sound (noise mixed with sine sweep)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

      oscGain.gain.setValueAtTime(0.8, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.2);

      // Add a tiny noise crunch for texture
      try {
        const bufferSize = ctx.sampleRate * 0.15; // 150ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(300, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(100, now + 0.12);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.4, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);

        noiseNode.start(now);
        noiseNode.stop(now + 0.15);
      } catch (e) {
        // Fallback if buffer creation fails
      }
      break;
    }

    case 'swoosh': {
      // Clean wind drag/slide sound
      try {
        const bufferSize = ctx.sampleRate * 0.25; // 250ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(3, now);
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(1500, now + 0.12);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.25);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noiseNode.start(now);
        noiseNode.stop(now + 0.25);
      } catch (e) {
        // Fallback simple sine slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.2);
      }
      break;
    }
  }
}
