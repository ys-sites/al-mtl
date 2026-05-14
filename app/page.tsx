import dynamic from 'next/dynamic';
import HeroScroll from '@/components/sections/HeroScroll';
import ConsultationForm from '@/components/sections/ConsultationForm';

// Lazy load heavy animation components for better initial load performance
const About = dynamic(() => import('@/components/sections/About'), { ssr: true });
const ProcessSteps = dynamic(() => import('@/components/sections/ProcessSteps'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-bg relative flex flex-col">
      <HeroScroll />
      <div id="about"><About /></div>
      <div id="process"><ProcessSteps /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="contact"><ConsultationForm /></div>
    </main>
  );
}
