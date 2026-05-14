'use client';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/content';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-brand-dark relative z-10 border-y border-brand-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl text-brand-white"
          >
            Client <span className="text-gradient-gold">Stories</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="glass-panel p-10 rounded-sm relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-gold/10" aria-hidden="true" />
              <div className="flex gap-1 mb-6" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-8 text-brand-white/90">
                &quot;{t.quote}&quot;
              </p>
              <div className="mt-auto border-t border-brand-white/10 pt-6">
                <h4 className="font-sans font-medium text-brand-white text-lg">{t.name}</h4>
                <p className="font-mono text-brand-gold text-xs tracking-widest mt-1 uppercase">
                  {t.location} • {t.projectType}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
