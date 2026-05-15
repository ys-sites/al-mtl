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
      'nav.about': 'About',
      'nav.process': 'Our Process',
      'nav.portfolio': 'Portfolio',
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
      'process.title': 'The Process',
      'process.desc': 'From initial sketch to final polish, we handle every detail with uncompromising standards.',
      'step.01.title': 'Initial Consultation',
      'step.01.sub': 'Tell us about your project',
      'step.01.desc': 'Our kitchen designers will meet you in our showroom or at your home. We take the necessary time to understand your custom needs, style, and wishes from the very first sketch.',
      'step.02.title': 'Custom Design & Planning',
      'step.02.sub': 'See your ideas in high definition',
      'step.02.desc': 'We outline the project and guide you towards a functional and one-of-a-kind concept. We ensure you can visualize your colors and finishes before we begin.',
      'step.03.title': 'Material Selection',
      'step.03.sub': 'A huge selection of brands & materials',
      'step.03.desc': 'Classic, contemporary, or modern. We show you a world of materials and textures—from marble, granite, and quartz countertops to custom sliding doors and cabinets.',
      'step.04.title': 'Professional Installation',
      'step.04.sub': 'Impeccable service & coordination',
      'step.04.desc': 'Our expertise in project management guarantees support from A to Z. Our team of professional installers takes the utmost care while respecting the budget and the established timeframe.',
      'step.05.title': 'After-Sales Support',
      'step.05.sub': 'Dedicated to your standard',
      'step.05.desc': 'Looking to refine some details? Our renowned after-sales service ensures a project entirely dedicated to your image and your standard, without compromise.',
      'about.title': 'About Renovare Kitchen Co.',
      'about.sub': 'The Most Recommended Kitchen Renovators',
      'about.desc1': 'The kitchen space is an art in itself. The materials, constraints, aesthetics, every detail must be carefully selected and given thought. The end result is a masterpiece that offers both a space of culinary creativity and tranquility.',
      'about.desc2': 'For more than 20 years, we have approached each of our projects with the same spirit. Our design and management skills have delivered turnkey projects while ensuring a reliable execution every time. Our team of kitchen designers will ensure that your dream of a custom-made kitchen space becomes a reality.',
      'about.feat1': 'Personalized Service',
      'about.feat2': 'Custom Design & Planning',
      'about.feat3': 'Professional Installation',
      'about.feat4': 'Renowned After-Sales Support',
      'gallery.badge': 'Follow our journey',
      'gallery.title': 'Behind The Scenes',
      'gallery.subtitle': 'Watch how our master craftsmen bring these stunning custom kitchens to life.',
      'portfolio.badge': 'Our Masterpieces',
      'portfolio.title': 'Featured Kitchens',
      'portfolio.subtitle': 'Explore our curated selection of bespoke kitchen renovations.',
      'contact.title': 'Get A Quote',
      'contact.subtitle': 'Upgrade Your Kitchen with Our Experts – Schedule a Free Consultation Now!',
      'contact.fullname': 'Full name *',
      'contact.city': 'City *',
      'contact.email': 'E-mail *',
      'contact.phone': 'Phone *',
      'contact.interest': 'I am interested in *',
      'contact.select': 'Select an option',
      'contact.submit': 'Contact Us',
      'contact.sending': 'Sending...',
      'contact.secure': 'Your information is secure',
      'contact.thanks': 'Thank you!',
      'contact.response': 'We will get back to you shortly.',
      'contact.another': 'Submit Another Request',
      'contact.error': 'Something went wrong. Please try again.',
      'opt.complete': 'Complete Kitchen Renovation',
      'opt.cabinets': 'Custom Kitchen Cabinets',
      'opt.countertops': 'Kitchen Countertops',
      'opt.island': 'Kitchen Island Installation',
      'opt.custom': 'Custom Project',
      'stories.title': 'Client Stories'
    },
    fr: {
      'nav.about': 'À Propos',
      'nav.process': 'Notre Processus',
      'nav.portfolio': 'Portfolio',
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
      'process.title': 'Le Processus',
      'process.desc': 'Du croquis initial à la finition, nous gérons chaque détail avec des normes sans compromis.',
      'step.01.title': 'Consultation Initiale',
      'step.01.sub': 'Parlez-nous de votre projet',
      'step.01.desc': 'Nos designers de cuisine vous rencontreront dans notre salle de montre ou à votre domicile. Nous prenons le temps nécessaire pour comprendre vos besoins sur mesure, votre style et vos souhaits dès le premier croquis.',
      'step.02.title': 'Conception et Planification',
      'step.02.sub': 'Voyez vos idées en haute définition',
      'step.02.desc': 'Nous esquissons le projet et vous guidons vers un concept fonctionnel et unique. Nous nous assurons que vous puissiez visualiser vos couleurs et finitions avant que nous commencions.',
      'step.03.title': 'Sélection des Matériaux',
      'step.03.sub': 'Un vaste choix de marques et de matériaux',
      'step.03.desc': 'Classique, contemporain ou moderne. Nous vous montrons un monde de matériaux et de textures—des comptoirs en marbre, granit et quartz aux portes coulissantes et armoires sur mesure.',
      'step.04.title': 'Installation Professionnelle',
      'step.04.sub': 'Service et coordination impeccables',
      'step.04.desc': 'Notre expertise en gestion de projet garantit un soutien de A à Z. Notre équipe d\'installateurs professionnels prend le plus grand soin tout en respectant le budget et l\'échéancier établi.',
      'step.05.title': 'Service Après-Vente',
      'step.05.sub': 'Dédié à vos standards',
      'step.05.desc': 'Vous cherchez à peaufiner certains détails? Notre service après-vente réputé assure un projet entièrement dédié à votre image et à vos standards, sans compromis.',
      'about.title': 'À Propos de Renovare Kitchen Co.',
      'about.sub': 'Les Rénovateurs de Cuisine Les Plus Recommandés',
      'about.desc1': 'L\'espace cuisine est un art en soi. Les matériaux, les contraintes, l\'esthétique, chaque détail doit être soigneusement sélectionné et réfléchi. Le résultat final est un chef-d\'œuvre qui offre à la fois un espace de créativité culinaire et de tranquillité.',
      'about.desc2': 'Depuis plus de 20 ans, nous abordons chacun de nos projets avec le même esprit. Nos compétences en conception et en gestion ont livré des projets clés en main tout en assurant une exécution fiable à chaque fois. Notre équipe de designers s\'assurera que votre rêve devienne réalité.',
      'about.feat1': 'Service Personnalisé',
      'about.feat2': 'Conception et Planification',
      'about.feat3': 'Installation Professionnelle',
      'about.feat4': 'Service Après-Vente Réputé',
      'gallery.badge': 'Suivez notre parcours',
      'gallery.title': 'Dans les Coulisses',
      'gallery.subtitle': 'Regardez comment nos maîtres artisans donnent vie à ces superbes cuisines sur mesure.',
      'portfolio.badge': 'Nos Chefs-d\'œuvre',
      'portfolio.title': 'Cuisines en Vedette',
      'portfolio.subtitle': 'Explorez notre sélection de rénovations de cuisines sur mesure.',
      'contact.title': 'Obtenir un Devis',
      'contact.subtitle': 'Améliorez votre cuisine avec nos experts – Planifiez une consultation gratuite dès maintenant!',
      'contact.fullname': 'Nom complet *',
      'contact.city': 'Ville *',
      'contact.email': 'Courriel *',
      'contact.phone': 'Téléphone *',
      'contact.interest': 'Je suis intéressé(e) par *',
      'contact.select': 'Sélectionnez une option',
      'contact.submit': 'Contactez-nous',
      'contact.sending': 'Envoi...',
      'contact.secure': 'Vos informations sont sécurisées',
      'contact.thanks': 'Merci!',
      'contact.response': 'Nous vous répondrons sous peu.',
      'contact.another': 'Soumettre une autre demande',
      'contact.error': 'Une erreur est survenue. Veuillez réessayer.',
      'opt.complete': 'Rénovation Complète de Cuisine',
      'opt.cabinets': 'Armoires de Cuisine sur Mesure',
      'opt.countertops': 'Comptoirs de Cuisine',
      'opt.island': 'Installation d\'Îlot de Cuisine',
      'opt.custom': 'Projet Personnalisé',
      'stories.title': 'Témoignages de Clients'
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
