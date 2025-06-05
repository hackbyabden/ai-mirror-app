import { useState, useCallback } from 'react';
import { detectFaces, analyzeEmotions, type FaceDetection, type EmotionResults } from '@/lib/face-api';

export function useFaceDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [faces, setFaces] = useState<FaceDetection[]>([]);
  const [emotions, setEmotions] = useState<EmotionResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detectFacesInImage = useCallback(async (imageElement: HTMLImageElement) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const detectedFaces = await detectFaces(imageElement);
      setFaces(detectedFaces);
      
      if (detectedFaces.length > 0) {
        const emotionResults = await analyzeEmotions(imageElement);
        setEmotions(emotionResults);
      }
    } catch (err) {
      setError('Failed to detect faces in image');
      console.error('Face detection error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setFaces([]);
    setEmotions(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    faces,
    emotions,
    isLoading,
    error,
    detectFacesInImage,
    reset
  };
}
