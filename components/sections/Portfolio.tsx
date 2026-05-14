'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ShinyText from '@/components/ui/ShinyText';
import BlurText from '@/components/ui/BlurText';

const PORTFOLIO_IMAGES = [
  { id: 1, src: "/1.jpg", title: "Modern Minimalist", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/2.jpg", title: "Classic Brass", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "/3.jpg", title: "Quartz Excellence", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "/4.jpeg", title: "Navy Accents", span: "md:col-span-2 md:row-span-1" },
];

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/50 text-brand-gold backdrop-blur-md font-mono text-sm mb-6 border border-brand-gold/20 tracking-widest uppercase"
          >
            <ImageIcon size={16} /> {t('portfolio.badge')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-4 tracking-tight block"
          >
            <ShinyText
              text={t('portfolio.title')}
              color="#ffffff"
              shineColor="#C9A84C"
              speed={3}
            />
          </motion.h2>
          <div className="flex justify-center">
            <BlurText
              text={t('portfolio.subtitle')}
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-brand-white/60 max-w-2xl mx-auto text-lg font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {PORTFOLIO_IMAGES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group border border-white/10 ${item.span}`}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-px bg-brand-gold mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="text-xl font-serif text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
