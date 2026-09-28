// Procedural Web Audio API sound synthesizer
// Works 100% offline without external mp3 files

class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentSourceNodes: { [key: string]: { stop: () => void } } = {};
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMasterVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime, 0.05);
    }
  }

  // Play a rewarding bell chime when achieving a goal or finishing a ritual
  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const freqs = [528, 660, 792, 1056]; // Harmonious chord (528Hz based)

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2 / (idx + 1), now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 3.0);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 3.2);
    });
  }

  // Play / Stop ambient track
  public playAmbient(type: '528hz' | 'rain' | 'ocean' | 'fire' | 'drone432') {
    this.initContext();
    this.stopAllAmbient();

    if (!this.ctx || !this.masterGain) return;

    if (type === '528hz') {
      this.play528Hz();
    } else if (type === 'drone432') {
      this.play432HzDrone();
    } else if (type === 'rain') {
      this.playRain();
    } else if (type === 'ocean') {
      this.playOcean();
    } else if (type === 'fire') {
      this.playCampfire();
    }
  }

  public stopAllAmbient() {
    Object.keys(this.currentSourceNodes).forEach(key => {
      try {
        this.currentSourceNodes[key].stop();
      } catch (e) {
        console.error(e);
      }
    });
    this.currentSourceNodes = {};
  }

  private play528Hz() {
    if (!this.ctx || !this.masterGain) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(528, this.ctx.currentTime); // Transformation / Miracles

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(532, this.ctx.currentTime); // 4Hz Theta binaural beat

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(264, this.ctx.currentTime); // Harmonic lower octave

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2);

    osc1.connect(gain);
    osc2.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    subOsc.start();

    this.currentSourceNodes['528hz'] = {
      stop: () => {
        gain.gain.setTargetAtTime(0.0001, this.ctx!.currentTime, 0.5);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            subOsc.stop();
            osc1.disconnect();
            osc2.disconnect();
            subOsc.disconnect();
          } catch (e) {
            console.error(e);
          }
        }, 1000);
      }
    };
  }

  private play432HzDrone() {
    if (!this.ctx || !this.masterGain) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(432, this.ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(216, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();

    this.currentSourceNodes['drone432'] = {
      stop: () => {
        gain.gain.setTargetAtTime(0.0001, this.ctx!.currentTime, 0.5);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {
            console.error(e);
          }
        }, 1000);
      }
    };
  }

  private playRain() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02; // Pink/Brownish noise
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();

    this.currentSourceNodes['rain'] = {
      stop: () => {
        gain.gain.setTargetAtTime(0.0001, this.ctx!.currentTime, 0.5);
        setTimeout(() => {
          try {
            whiteNoise.stop();
          } catch (e) {
            console.error(e);
          }
        }, 1000);
      }
    };
  }

  private playOcean() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    // LFO to create swelling wave effect
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    noise.start();

    this.currentSourceNodes['ocean'] = {
      stop: () => {
        gain.gain.setTargetAtTime(0.0001, this.ctx!.currentTime, 0.5);
        setTimeout(() => {
          try {
            noise.stop();
            lfo.stop();
          } catch (e) {
            console.error(e);
          }
        }, 1000);
      }
    };
  }

  private playCampfire() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Crackle pops
      if (Math.random() < 0.005) {
        output[i] = (Math.random() * 2 - 1) * 0.9;
      } else {
        output[i] = (Math.random() * 2 - 1) * 0.05;
      }
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();

    this.currentSourceNodes['fire'] = {
      stop: () => {
        gain.gain.setTargetAtTime(0.0001, this.ctx!.currentTime, 0.5);
        setTimeout(() => {
          try {
            noise.stop();
          } catch (e) {
            console.error(e);
          }
        }, 1000);
      }
    };
  }
}

export const soundEngine = new SoundEngine();
