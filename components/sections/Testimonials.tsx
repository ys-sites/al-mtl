'use client';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/content';
import { Quote } from 'lucide-react';
import ShinyText from '@/components/ui/ShinyText';
import { useLanguage } from '@/lib/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-brand-offwhite relative z-10 border-y border-brand-navy/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl mb-6">
            <ShinyText
              text={t('stories.title')}
              color="#0F172A"
              shineColor="#C9A84C"
              speed={3}
            />
          </h2>
        </div>

        <div className="relative overflow-hidden w-full flex">
          {/* Fading Edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-offwhite to-transparent z-10"></div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-offwhite to-transparent z-10"></div>
          
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="bg-white/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] p-10 rounded-sm relative border border-brand-gold/30 hover:bg-white/90 transition-all duration-500 w-[350px] md:w-[450px] shrink-0 whitespace-normal flex flex-col"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-gold/20" aria-hidden="true" />
                <div className="flex gap-1 mb-6" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-8 text-brand-navy/90">
                  &quot;{t.quote}&quot;
                </p>
                <div className="mt-auto border-t border-brand-navy/10 pt-6">
                  <h4 className="font-sans font-medium text-brand-navy text-lg">{t.name}</h4>
                  <p className="font-mono text-brand-gold text-xs tracking-widest mt-1 uppercase">
                    {t.location} • {t.projectType}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
