/**
 * Web Audio API procedural haunted ambience generator
 * 100% offline, zero network requests, lightweight and eerie.
 */
class HauntedSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private windGain: GainNode | null = null;
  private droneGain: GainNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // 1. Eerie low frequency drone (haunted atmosphere)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    this.droneGain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(57.5, this.ctx.currentTime); // Slight dissonance

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();

    // 2. Wind noise generator
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    // Subtle LFO modulation on wind frequency
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.windGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2);

    whiteNoise.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.ctx.destination);

    whiteNoise.start();
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.droneGain) {
      this.droneGain.gain.linearRampToValueAtTime(0, now + 0.8);
    }
    if (this.windGain) {
      this.windGain.gain.linearRampToValueAtTime(0, now + 0.8);
    }
    setTimeout(() => {
      this.isPlaying = false;
    }, 800);
  }

  // Play a brief supernatural ghostly chime or deal completion sound
  public playGhostChime() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.8);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const hauntedAudio = new HauntedSoundEngine();
