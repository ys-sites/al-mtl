import HeroScroll from '@/components/sections/HeroScroll';
import ConsultationForm from '@/components/sections/ConsultationForm';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-bg relative">
      <HeroScroll />
      <ConsultationForm />
    </main>
  );
}
