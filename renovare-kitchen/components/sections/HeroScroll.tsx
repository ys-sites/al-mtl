'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import CanvasSequence from '@/components/ui/CanvasSequence';

const FRAME_COUNT = 110; // Updated to actual frame count
const FRAME_PATH = '/frames/frame_';

export default function HeroScroll() {
  const { images, progress } = useImagePreloader(FRAME_COUNT, FRAME_PATH);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const text4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);

  if (progress < 100) {
    return (
      <div className="h-screen bg-brand-bg flex flex-col 
        items-center justify-center gap-4">
        <p className="font-mono text-brand-gold tracking-widest-lux text-sm">
          LOADING YOUR TRANSFORMATION
        </p>
        <div className="w-64 h-px bg-white/10">
          <div
            className="h-full bg-brand-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-white/40 text-xs">{progress}%</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <CanvasSequence images={images} frameCount={FRAME_COUNT} />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="sticky top-0 h-screen flex items-center justify-center">

          {/* Phase 1: 0-20% */}
          <motion.div style={{ opacity: text1Opacity }}
            className="absolute text-center px-8">
            <h1 className="font-serif text-6xl md:text-8xl text-brand-white
              tracking-widest-lux leading-tight">
              TRANSFORM YOUR<br />
              <span className="text-gradient-gold">KITCHEN</span>
            </h1>
          </motion.div>

          {/* Phase 2: 20-40% */}
          <motion.div style={{ opacity: text2Opacity }}
            className="absolute text-center px-8">
            <p className="font-serif text-3xl md:text-5xl 
              text-brand-white/90 italic">
              Luxury craftsmanship, built to last
            </p>
          </motion.div>

          {/* Phase 3: 40-60% */}
          <motion.div style={{ opacity: text3Opacity }}
            className="absolute text-center px-8">
            <p className="font-serif text-4xl md:text-6xl italic">
              <span className="text-gradient-gold">
                Navy. Brass. Perfection.
              </span>
            </p>
          </motion.div>

          {/* Phase 4: 75-100% Final CTA */}
          <motion.div style={{ opacity: text4Opacity }}
            className="absolute text-center px-8 pointer-events-auto">
            <p className="font-serif text-5xl md:text-7xl text-brand-white mb-4">
              YOU DESERVE IT
            </p>
            <p className="font-sans text-brand-white/60 tracking-widest-lux
              text-sm mb-8 uppercase">
              Ready to start your transformation?
            </p>
            <button className="border border-brand-gold text-brand-gold
              font-mono tracking-widest-lux px-12 py-4
              hover:bg-brand-navy hover:text-brand-gold transition-all duration-500 pointer-events-auto"
              aria-label="Get a free quote for your kitchen renovation">
              GET A FREE QUOTE
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
