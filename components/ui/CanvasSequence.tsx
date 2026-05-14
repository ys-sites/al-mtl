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

  const resizeCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Disable smoothing to improve performance and avoid blur on some devices
    ctx.imageSmoothingEnabled = true;

    // Trigger a re-render of the current frame
    const currentFrame = lastRendered.current > -1 ? lastRendered.current : 0;
    if (images.length > 0) {
      renderFrame(currentFrame);
    }
  };

  const renderFrame = (index: number) => {
    if (!canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const img = images[index];
    const hRatio = window.innerWidth / img.width;
    const vRatio = window.innerHeight / img.height;
    const ratio = Math.max(hRatio, vRatio);
    
    // Shift image slightly on mobile to align properly (reveal more of the left side where the hood is)
    let centerShift_x = (window.innerWidth - img.width * ratio) / 2;
    if (window.innerWidth < 768) {
      centerShift_x = (window.innerWidth - img.width * ratio) * 0.3; // 30% offset moves image right, revealing left side
    }

    const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

    // Use dpr in drawing instead of scaling context to avoid repeating state changes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img, 0, 0, img.width, img.height,
      centerShift_x * dpr, centerShift_y * dpr,
      img.width * ratio * dpr, img.height * ratio * dpr
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
    if (images.length > 0) {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block contrast-[1.05] saturate-[1.1]" />
        <div className="absolute inset-0 bg-gradient-to-t 
          from-black/70 to-transparent" />
      </div>
    </div>
  );
}
