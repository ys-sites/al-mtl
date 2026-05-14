'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { cormorant, inter, spaceMono } from './fonts';
import './globals.css';

import { LanguageProvider } from '@/lib/LanguageContext';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import FloatingPhone from '@/components/ui/FloatingPhone';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Force remove Vercel toolbar
    const removeVercel = () => {
      document.querySelectorAll('vercel-toolbar, vercel-live, #vercel-toolbar, [data-vercel-toolbar]').forEach(el => el.remove());
    };
    removeVercel();
    const observer = new MutationObserver(removeVercel);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="bg-brand-bg text-brand-white overflow-x-hidden">
        <LanguageProvider>
          <Navigation />
          {children}
          <Footer />
          <FloatingPhone />
        </LanguageProvider>
      </body>
    </html>
  );
}
