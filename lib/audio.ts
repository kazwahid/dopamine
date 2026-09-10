'use client';

interface ReelSoundProfile {
  name: string;
  baseFreqs: number[];
  waveformTypes: OscillatorType[];
  filterFreq: number;
  filterQ: number;
  pulseBpm: number;
  pulseFreq: number;
}

const REEL_PROFILES: ReelSoundProfile[] = [
  // Reel 0 (Sequence Beta): Deep cinematic D-minor tension drone
  {
    name: 'Sequence Beta',
    baseFreqs: [36.71, 55.0, 73.42, 110.0, 146.83],
    waveformTypes: ['sine', 'triangle', 'sine', 'triangle', 'sine'],
    filterFreq: 280,
    filterQ: 2.8,
    pulseBpm: 46,
    pulseFreq: 45,
  },
  // Reel 1 (Sequence Gamma): Kinetic F#-minor driving rhythm and modular atmosphere
  {
    name: 'Sequence Gamma',
    baseFreqs: [92.5, 138.59, 185.0, 220.0, 277.18],
    waveformTypes: ['sawtooth', 'triangle', 'sawtooth', 'sine', 'triangle'],
    filterFreq: 520,
    filterQ: 4.2,
    pulseBpm: 120,
    pulseFreq: 68,
  },
  // Reel 2 (Sequence Delta): Luminous A-major ambient space & celestial resolution
  {
    name: 'Sequence Delta',
    baseFreqs: [110.0, 164.81, 220.0, 277.18, 329.63],
    waveformTypes: ['sine', 'sine', 'triangle', 'sine', 'sine'],
    filterFreq: 780,
    filterQ: 1.8,
    pulseBpm: 60,
    pulseFreq: 52,
  },
];

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentReelIndex = 0;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private oscGains: GainNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private pulseOsc: OscillatorNode | null = null;
  private pulseGain: GainNode | null = null;
  private pulseLfo: OscillatorNode | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public ensureStarted(): boolean {
    if (!this.isPlaying) {
      this.start();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stop();

      const now = this.ctx.currentTime;
      const profile = REEL_PROFILES[this.currentReelIndex] || REEL_PROFILES[0];

      // Master output stage
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.2);
      this.masterGain.connect(this.ctx.destination);

      // Resonant shaping filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(profile.filterFreq, now);
      this.filter.Q.setValueAtTime(profile.filterQ, now);
      this.filter.connect(this.masterGain);

      // Slow organic modulation LFO
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(140, now);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start(now);

      // Polyphonic chord oscillators
      this.oscillators = [];
      this.oscGains = [];

      profile.baseFreqs.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = profile.waveformTypes[i] || 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((i - 2) * 4, now);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.setValueAtTime(0.22 / profile.baseFreqs.length, now);

        osc.connect(oscGain);
        oscGain.connect(this.filter!);
        osc.start(now);

        this.oscillators.push(osc);
        this.oscGains.push(oscGain);
      });

      // Rhythmic sub-pulse generator
      this.pulseOsc = this.ctx.createOscillator();
      this.pulseOsc.type = 'sine';
      this.pulseOsc.frequency.setValueAtTime(profile.pulseFreq, now);

      this.pulseGain = this.ctx.createGain();
      this.pulseGain.gain.setValueAtTime(0.001, now);

      this.pulseLfo = this.ctx.createOscillator();
      this.pulseLfo.frequency.setValueAtTime(profile.pulseBpm / 60, now);
      const pulseLfoGain = this.ctx.createGain();
      pulseLfoGain.gain.setValueAtTime(0.09, now);
      this.pulseLfo.connect(pulseLfoGain);
      pulseLfoGain.connect(this.pulseGain.gain);

      this.pulseOsc.connect(this.pulseGain);
      this.pulseGain.connect(this.masterGain);

      this.pulseLfo.start(now);
      this.pulseOsc.start(now);

      this.isPlaying = true;
      this.notify();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.oscillators = [];
        this.oscGains = [];

        if (this.lfo) {
          try {
            this.lfo.stop();
            this.lfo.disconnect();
          } catch {}
          this.lfo = null;
        }

        if (this.pulseOsc) {
          try {
            this.pulseOsc.stop();
            this.pulseOsc.disconnect();
          } catch {}
          this.pulseOsc = null;
        }

        if (this.pulseLfo) {
          try {
            this.pulseLfo.stop();
            this.pulseLfo.disconnect();
          } catch {}
          this.pulseLfo = null;
        }
      }, 700);
    } catch {
      this.oscillators = [];
    }

    this.isPlaying = false;
    this.notify();
  }

  /**
   * Seamlessly morph audio synthesis to match the active reel's soundscape
   */
  public setReelTone(reelIndex: number) {
    this.currentReelIndex = Math.max(0, Math.min(reelIndex, REEL_PROFILES.length - 1));
    this.playReelGlideSound();

    if (!this.ctx || !this.isPlaying || !this.filter) return;

    try {
      const now = this.ctx.currentTime;
      const profile = REEL_PROFILES[this.currentReelIndex];

      // Smooth filter morph
      this.filter.frequency.exponentialRampToValueAtTime(profile.filterFreq, now + 0.5);
      this.filter.Q.exponentialRampToValueAtTime(profile.filterQ, now + 0.5);

      // Pitch glide oscillators to the reel's harmonic chord
      this.oscillators.forEach((osc, i) => {
        if (profile.baseFreqs[i]) {
          osc.frequency.exponentialRampToValueAtTime(profile.baseFreqs[i], now + 0.6);
          osc.type = profile.waveformTypes[i] || 'sine';
        }
      });

      // Update pulse rate and tone
      if (this.pulseOsc) {
        this.pulseOsc.frequency.exponentialRampToValueAtTime(profile.pulseFreq, now + 0.5);
      }
      if (this.pulseLfo) {
        this.pulseLfo.frequency.exponentialRampToValueAtTime(profile.pulseBpm / 60, now + 0.5);
      }
    } catch {}
  }

  /**
   * Tactile mechanical film-reel transition sound
   */
  public playReelGlideSound() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Filtered noise sweep
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(880, now);
      filter.frequency.exponentialRampToValueAtTime(220, now + 0.15);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.16);

      // Low frequency mechanical thud
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(120, now);
      thud.frequency.exponentialRampToValueAtTime(45, now + 0.1);
      thudGain.gain.setValueAtTime(0.14, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thud.start(now);
      thud.stop(now + 0.11);
    } catch {}
  }

  public playShutterClick() {
    this.playReelGlideSound();
  }
}

export const audioEngine = new AmbientAudioEngine();
