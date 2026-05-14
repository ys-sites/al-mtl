'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import CanvasSequence from '@/components/ui/CanvasSequence';

const FRAME_COUNT = 253; // Updated to actual frame count
const FRAME_PATH = '/frames/ezgif-frame-';

import { useLanguage } from '@/lib/LanguageContext';

export default function HeroScroll() {
  const { images, progress } = useImagePreloader(FRAME_COUNT, FRAME_PATH);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15, 0.2], [0, 0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.4], [50, 0, 0, -50]);

  const text3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.6], [50, 0, 0, -50]);

  const text4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const text4Y = useTransform(scrollYProgress, [0.75, 0.85, 1], [50, 0, 0]);

  // Show the site quickly after the first few frames (approx 5%) load
  if (progress < 4) {
    return (
      <div className="h-[100dvh] bg-brand-bg flex flex-col 
        items-center justify-center gap-4">
        <p className="font-mono text-brand-gold tracking-widest-lux text-sm">
          {t('hero.loading')}
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
        <div className="sticky top-0 h-[100dvh] flex items-center justify-start">

          {/* Phase 1: 0-20% */}
          <motion.div style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute left-6 md:left-24 text-left max-w-3xl pr-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl text-brand-white
              tracking-widest-lux leading-tight">
              {t('hero.transform')}<br />
              <span className="text-gradient-gold">{t('hero.kitchen')}</span>
            </h1>
          </motion.div>

          {/* Phase 2: 20-40% */}
          <motion.div style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute left-6 md:left-24 text-left max-w-3xl pr-6">
            <p className="font-serif text-2xl sm:text-3xl md:text-5xl 
              text-brand-white/90 italic leading-snug">
              {t('hero.luxury')}
            </p>
          </motion.div>

          {/* Phase 3: 40-60% */}
          <motion.div style={{ opacity: text3Opacity, y: text3Y }}
            className="absolute left-6 md:left-24 text-left max-w-3xl pr-6">
            <p className="font-serif text-3xl sm:text-4xl md:text-6xl italic leading-snug">
              <span className="text-gradient-gold">
                {t('hero.navy')}
              </span>
            </p>
          </motion.div>

          {/* Phase 4: 75-100% Final CTA */}
          <motion.div style={{ opacity: text4Opacity, y: text4Y }}
            className="absolute left-6 md:left-24 text-left max-w-3xl pr-6 pointer-events-auto">
            <p className="font-serif text-4xl sm:text-5xl md:text-7xl text-brand-white mb-4 leading-tight">
              {t('hero.deserve')}
            </p>
            <p className="font-sans text-brand-white/60 tracking-widest-lux
              text-xs sm:text-sm mb-8 uppercase">
              {t('hero.ready')}
            </p>
            <button className="border border-brand-gold text-brand-gold
              font-mono tracking-widest-lux px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm
              hover:bg-brand-navy hover:text-brand-gold transition-all duration-500 pointer-events-auto"
              aria-label="Get a free quote for your kitchen renovation">
              {t('hero.quote')}
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
