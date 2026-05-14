'use client';
import { motion } from 'framer-motion';
import { aboutContent } from '@/lib/content';
import { useLanguage } from '@/lib/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-brand-bg relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col gap-6"
        >
          <span className="font-mono text-brand-gold tracking-widest-lux text-sm uppercase">
            {t('nav.about')}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-brand-white leading-tight">
            {aboutContent.title}
          </h2>
          <h3 className="font-sans text-brand-white/80 text-xl font-medium">
            {aboutContent.subtitle}
          </h3>
          <p className="font-sans text-brand-white/60 leading-relaxed text-lg">
            {aboutContent.description1}
          </p>
          <p className="font-sans text-brand-white/60 leading-relaxed text-lg">
            {aboutContent.description2}
          </p>
        </motion.div>

        {/* Right Side: Features Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {aboutContent.features.map((feature, index) => (
            <div 
              key={index}
              className="glass-panel p-8 rounded-sm border border-brand-gold/20 flex items-center justify-center text-center hover:bg-brand-navy/20 transition-colors duration-500"
            >
              <h4 className="font-serif text-2xl text-brand-gold">{feature}</h4>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
