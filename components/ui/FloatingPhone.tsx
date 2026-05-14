'use client';
import { Phone } from 'lucide-react';
import { companyDetails } from '@/lib/content';

export default function FloatingPhone() {
  return (
    <a 
      href={`tel:${companyDetails.phone}`}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-brand-gold text-brand-navy rounded-full shadow-lg shadow-brand-navy/20 hover:scale-110 hover:shadow-brand-gold/40 transition-all duration-300 group"
      aria-label="Call us directly"
    >
      <Phone size={24} className="group-hover:rotate-12 transition-transform" />
      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-full border-2 border-brand-gold animate-ping opacity-75"></div>
    </a>
  );
}
