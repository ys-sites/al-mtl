'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  // Load language preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('pref_lang') as Language;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('pref_lang', newLang);
  };

  const translations: Record<Language, Record<string, string>> = {
    en: {
      'nav.portfolio': 'Portfolio',
      'nav.process': 'Our Process',
      'nav.testimonials': 'Testimonials',
      'nav.contact': 'Contact',
      'hero.loading': 'LOADING YOUR TRANSFORMATION',
      'hero.transform': 'TRANSFORM YOUR',
      'hero.kitchen': 'KITCHEN',
      'hero.luxury': 'Luxury craftsmanship, built to last',
      'hero.navy': 'Navy. Brass. Perfection.',
      'hero.deserve': 'YOU DESERVE IT',
      'hero.ready': 'Ready to start your transformation?',
      'hero.quote': 'GET A FREE QUOTE',
    },
    fr: {
      'nav.portfolio': 'Portefeuille',
      'nav.process': 'Notre Processus',
      'nav.testimonials': 'Témoignages',
      'nav.contact': 'Contact',
      'hero.loading': 'CHARGEMENT DE VOTRE TRANSFORMATION',
      'hero.transform': 'TRANSFORMEZ VOTRE',
      'hero.kitchen': 'CUISINE',
      'hero.luxury': 'Savoir-faire de luxe, conçu pour durer',
      'hero.navy': 'Bleu Marine. Laiton. Perfection.',
      'hero.deserve': 'VOUS LE MÉRITEZ',
      'hero.ready': 'Prêt à commencer votre transformation?',
      'hero.quote': 'OBTENEZ UN DEVIS GRATUIT',
    }
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
