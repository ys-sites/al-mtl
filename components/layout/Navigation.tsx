'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-brand-bg/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-serif text-2xl font-bold tracking-wider text-brand-white">
            RENOVARE<span className="text-brand-gold">.</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('about')} className="text-sm font-sans tracking-widest-lux text-brand-white/70 hover:text-brand-gold transition-colors uppercase">
            {t('nav.about')}
          </button>
          <button onClick={() => scrollTo('process')} className="text-sm font-sans tracking-widest-lux text-brand-white/70 hover:text-brand-gold transition-colors uppercase">
            {t('nav.process')}
          </button>
          <button onClick={() => scrollTo('testimonials')} className="text-sm font-sans tracking-widest-lux text-brand-white/70 hover:text-brand-gold transition-colors uppercase">
            {t('nav.testimonials')}
          </button>
          
          <div className="w-px h-4 bg-white/20 mx-2" />
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang('en')}
              className={`text-xs font-mono tracking-widest transition-colors ${lang === 'en' ? 'text-brand-gold' : 'text-white/40 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-white/20 text-xs">/</span>
            <button 
              onClick={() => setLang('fr')}
              className={`text-xs font-mono tracking-widest transition-colors ${lang === 'fr' ? 'text-brand-gold' : 'text-white/40 hover:text-white'}`}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
