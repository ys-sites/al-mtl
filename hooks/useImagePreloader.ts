import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, pathPrefix: string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;
    
    // On mobile, load every 2nd frame to save RAM (iOS Safari limits)
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 1;
    const actualFrameCount = Math.floor(frameCount / step);

    for (let i = 1; i <= frameCount; i += step) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, '0');
      img.src = `${pathPrefix}${paddedIndex}.jpg`;
      
      img.decode().then(() => {
        loadCount++;
        setLoaded(Math.round((loadCount / actualFrameCount) * 100));
      }).catch((e) => {
        loadCount++;
        setLoaded(Math.round((loadCount / actualFrameCount) * 100));
      });
      
      // Pad missing frames with the same image to keep indices aligned
      for (let j = 0; j < step; j++) {
        if (i + j <= frameCount) {
          loadedImages[i + j - 1] = img;
        }
      }
    }
    setImages(loadedImages);
  }, [frameCount, pathPrefix]);

  return { images, progress: loaded };
}
