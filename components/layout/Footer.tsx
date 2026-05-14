'use client';
import { Instagram, Facebook, Phone, Mail, MapPin, Hammer } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { companyDetails } from '@/lib/content';

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0b0f19] pt-20 pb-8 border-t border-white/5 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Socials */}
          <div className="col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <Hammer className="text-brand-gold" size={32} />
              <h3 className="font-serif text-2xl text-white font-bold tracking-wide">
                {companyDetails.name.replace(' Kitchen Co.', '')}
              </h3>
            </div>
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10">
                <Facebook size={18} className="text-white" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-1">
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Premium kitchen renovation services for residential properties. Quality craftsmanship, reliable service, and stunning results for all your interior needs in Montreal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => scrollTo('about')} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                  {t('nav.about') || 'About'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('process')} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                  {t('nav.process') || 'Process'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('portfolio')} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                  {t('nav.portfolio') || 'Portfolio'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('testimonials')} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                  {t('nav.testimonials') || 'Reviews'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-6 text-sm">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-gold" />
                <a href={`tel:${companyDetails.phone}`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {companyDetails.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-gold" />
                <a href={`mailto:${companyDetails.email}`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {companyDetails.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-gold mt-0.5" shrink-0 />
                <span className="text-white/60 text-sm">
                  {companyDetails.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {companyDetails.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
