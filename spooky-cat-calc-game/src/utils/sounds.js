// Sound system using online URLs - NO downloads needed!

const soundUrls = {
  // Correct answer sounds
  correct: 'https://www.soundjay.com/buttons/sounds/button-09.mp3',
  
  // Wrong answer sounds
  wrong: 'https://www.soundjay.com/misc/sounds/fail-buzzer-01.mp3',
  jumpscare: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.mp3',
  
  // Timer sounds
  tick: 'https://www.soundjay.com/clock/sounds/clock-1.mp3',
  timerWarning: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  
  // Game sounds
  gameStart: 'https://www.soundjay.com/misc/sounds/magic-chime-01.mp3',
  victory: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
  
  // Background music (optional - can be muted)
  bgMusic: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
};

class SoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.bgMusic = null;
    this.bgMusicPlaying = false;
  }

  // Preload sounds for better performance
  preload() {
    Object.entries(soundUrls).forEach(([name, url]) => {
      if (name !== 'bgMusic') {
        const audio = new Audio(url);
        audio.preload = 'auto';
        this.sounds[name] = audio;
      }
    });
  }

  // Play a sound effect
  playSound(soundName, volume = 1.0) {
    if (this.isMuted) return;
    
    try {
      let audio;
      
      // Use preloaded sound or create new one
      if (this.sounds[soundName]) {
        audio = this.sounds[soundName];
        audio.currentTime = 0; // Reset to start
      } else {
        audio = new Audio(soundUrls[soundName]);
      }
      
      audio.volume = volume;
      audio.play().catch(err => {
        console.log('Audio play prevented:', err.message);
      });
    } catch (err) {
      console.log('Audio error:', err.message);
    }
  }

  // Play background music
  playBackgroundMusic(volume = 0.2) {
    if (this.isMuted || this.bgMusicPlaying) return;
    
    try {
      this.bgMusic = new Audio(soundUrls.bgMusic);
      this.bgMusic.volume = volume;
      this.bgMusic.loop = true;
      this.bgMusic.play().catch(err => {
        console.log('Background music play prevented:', err.message);
      });
      this.bgMusicPlaying = true;
    } catch (err) {
      console.log('Background music error:', err.message);
    }
  }

  // Stop background music
  stopBackgroundMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
      this.bgMusicPlaying = false;
    }
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted && this.bgMusic) {
      this.bgMusic.volume = 0;
    } else if (this.bgMusic) {
      this.bgMusic.volume = 0.2;
    }
    
    return this.isMuted;
  }

  // Set mute state
  setMuted(muted) {
    this.isMuted = muted;
    
    if (this.bgMusic) {
      this.bgMusic.volume = muted ? 0 : 0.2;
    }
  }

  // Check if muted
  getMuted() {
    return this.isMuted;
  }
}

// Create singleton instance
const soundManager = new SoundManager();

// Export convenience functions
export const preloadSounds = () => soundManager.preload();
export const playSound = (name, volume) => soundManager.playSound(name, volume);
export const playBackgroundMusic = (volume) => soundManager.playBackgroundMusic(volume);
export const stopBackgroundMusic = () => soundManager.stopBackgroundMusic();
export const toggleMute = () => soundManager.toggleMute();
export const setMuted = (muted) => soundManager.setMuted(muted);
export const isMuted = () => soundManager.getMuted();

export default soundManager;
