// Audio processing utilities for voice analysis

export interface VoiceCharacteristics {
  pitch: number;
  energy: number;
  tempo: number;
  clarity: number;
}

export interface PersonalityTraits {
  confidence: number;
  creativity: number;
  empathy: number;
  leadership: number;
  introversion: number;
}

export async function analyzeVoiceCharacteristics(audioBlob: Blob): Promise<VoiceCharacteristics> {
  // Mock voice analysis - in production this would use Web Audio API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pitch: Math.random() * 200 + 100, // 100-300 Hz
        energy: Math.random() * 0.8 + 0.2, // 0.2-1.0
        tempo: Math.random() * 200 + 100,  // 100-300 WPM
        clarity: Math.random() * 0.3 + 0.7 // 0.7-1.0
      });
    }, 2000);
  });
}

export function generatePersonalityFromVoice(characteristics: VoiceCharacteristics): PersonalityTraits {
  const { pitch, energy, tempo, clarity } = characteristics;
  
  return {
    confidence: Math.min(100, Math.max(0, (energy * 50) + (clarity * 30) + 20)),
    creativity: Math.min(100, Math.max(0, (pitch / 300 * 40) + (tempo / 300 * 40) + 20)),
    empathy: Math.min(100, Math.max(0, (clarity * 40) + ((200 - Math.abs(pitch - 200)) / 200 * 40) + 20)),
    leadership: Math.min(100, Math.max(0, (energy * 40) + (tempo / 300 * 30) + 30)),
    introversion: Math.min(100, Math.max(0, 100 - (energy * 60) - (tempo / 300 * 40)))
  };
}

export function createAudioVisualizer(canvas: HTMLCanvasElement, audioData: Uint8Array): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const barWidth = width / audioData.length;
  let x = 0;

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#00F5FF');
  gradient.addColorStop(0.5, '#8A2BE2');
  gradient.addColorStop(1, '#FF00FF');

  ctx.fillStyle = gradient;

  for (let i = 0; i < audioData.length; i++) {
    const barHeight = (audioData[i] / 255) * height;
    ctx.fillRect(x, height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}

export async function startVoiceRecording(): Promise<MediaRecorder | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      }
    });
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    });
    
    return mediaRecorder;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    return null;
  }
}
