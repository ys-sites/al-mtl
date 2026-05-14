import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, pathPrefix: string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    const loadBatch = async (startIndex: number, batchSize: number) => {
      const promises: Promise<void>[] = [];
      
      for (let i = startIndex; i < Math.min(startIndex + batchSize, frameCount); i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          const paddedIndex = (i + 1).toString().padStart(3, '0');
          
          img.onload = () => {
            if (!isCancelled) {
              loadedImages[i] = img;
              loadedCount++;
              setLoaded(Math.round((loadedCount / frameCount) * 100));
            }
            resolve();
          };
          
          img.onerror = () => {
            if (!isCancelled) {
              loadedCount++;
              setLoaded(Math.round((loadedCount / frameCount) * 100));
            }
            resolve();
          };
          
          img.src = `${pathPrefix}${paddedIndex}.jpg`;
        });
        promises.push(promise);
      }
      
      await Promise.all(promises);
    };

    const loadAllImages = async () => {
      // Load first 5 images quickly so we can show the site faster
      await loadBatch(0, 5);
      
      if (!isCancelled) {
        // We can pass a partially filled array but we'll wait to ensure no black frames
        // actually we can setImages immediately and let them update
        setImages([...loadedImages]);
      }
      
      // Load the rest in larger batches
      for (let i = 5; i < frameCount; i += 10) {
        if (isCancelled) break;
        await loadBatch(i, 10);
        if (!isCancelled) {
          setImages([...loadedImages]);
        }
      }
    };

    loadAllImages();

    return () => {
      isCancelled = true;
    };
  }, [frameCount, pathPrefix]);

  return { images, progress: loaded };
}
