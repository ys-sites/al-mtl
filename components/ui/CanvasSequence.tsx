'use client';
import { useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface CanvasSequenceProps {
  images: HTMLImageElement[];
  frameCount: number;
}

export default function CanvasSequence({ images, frameCount }: CanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true      // Reduces latency/stuttering
    });
    if (!ctx) return;

    // High-DPI Retina support, cap at 2 for performance/memory on mobile
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // Maximize rendering quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // object-fit: cover math
    const img = images[index];
    const hRatio = window.innerWidth / img.width;
    const vRatio = window.innerHeight / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
    const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

    // Warm kitchen tone filter
    ctx.filter = 'contrast(1.05) saturate(1.1)';
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(
      img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y,
      img.width * ratio, img.height * ratio
    );
  };

  const lastRendered = useRef(-1);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const nextFrame = Math.floor(latest);
    if (nextFrame !== lastRendered.current) {
      lastRendered.current = nextFrame;
      requestAnimationFrame(() => renderFrame(nextFrame));
    }
  });

  useEffect(() => {
    if (images.length > 0) renderFrame(0);
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-t 
          from-black/70 to-transparent" />
      </div>
    </div>
  );
}
