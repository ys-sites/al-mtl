import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, pathPrefix: string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, '0');
      img.src = `${pathPrefix}${paddedIndex}.jpg`;
      
      img.decode().then(() => {
        loadCount++;
        setLoaded(Math.round((loadCount / frameCount) * 100));
      }).catch((e) => {
        // Fallback for decoding errors
        loadCount++;
        setLoaded(Math.round((loadCount / frameCount) * 100));
      });
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, pathPrefix]);

  return { images, progress: loaded };
}
