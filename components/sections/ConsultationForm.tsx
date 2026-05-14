'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import ShinyText from '@/components/ui/ShinyText';
import BlurText from '@/components/ui/BlurText';
import BorderGlow from '@/components/ui/BorderGlow';
import { CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const consultSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  city: z.string().min(2, "City is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  interestedIn: z.string().min(2, "Please select an option")
});

export default function ConsultationForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(consultSchema)
  });

  const onSubmit = async (data: z.infer<typeof consultSchema>) => {
    setStatus('loading');
    try {
      const response = await fetch("https://formsubmit.co/ajax/sharafath2001@hotmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: "New Consultation Request - Renovare Kitchen Co."
        })
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-brand-offwhite border-y border-brand-navy/10 relative overflow-hidden group/main">
      {/* Background Images with Fade (Like KA-Peinture) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <div className="grid grid-cols-3 md:grid-cols-4 grid-rows-4 md:grid-rows-3 h-full transform scale-110">
          {Array.from({ length: 12 }).map((_, i) => {
            const images = ["/frames/ezgif-frame-030.jpg", "/frames/ezgif-frame-120.jpg", "/frames/ezgif-frame-240.jpg"];
            const img = images[i % 3];
            return (
              <div key={i} className="relative group/item">
                <img loading="lazy" decoding="async" src={img} alt="" className="w-full h-full object-cover transition-opacity duration-500 opacity-20 group-hover/main:opacity-10" />
                <img loading="lazy" decoding="async" src={img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 block">
            <ShinyText
              text={t('contact.title')}
              color="#0F172A"
              shineColor="#C9A84C"
              speed={3}
            />
          </h2>
          <div className="flex justify-center">
            <BlurText
              text={t('contact.subtitle')}
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-brand-navy/70 text-lg font-sans"
            />
          </div>
        </div>
        
        <BorderGlow
          edgeSensitivity={30}
          glowColor="44 54 54"
          backgroundColor="rgba(255, 255, 255, 0.9)"
          borderRadius={40}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={25}
          animated={true}
          colors={['#C9A84C', '#0F172A', '#E5C87A']}
          className="w-full relative group/form shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] z-10"
        >
          <div className="p-8 md:p-12 backdrop-blur-xl relative overflow-hidden w-full h-full rounded-[40px]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl opacity-50 group-hover/form:scale-110 transition-transform duration-1000"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-navy/5 rounded-full blur-3xl opacity-50 group-hover/form:scale-110 transition-transform duration-1000"></div>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 relative z-10"
            >
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-serif text-brand-navy mb-2">{t('contact.thanks')}</h3>
              <p className="text-brand-navy/70 mb-8 font-sans">{t('contact.response')}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-brand-gold font-bold hover:underline font-mono uppercase tracking-widest text-sm"
              >
                {t('contact.another')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10 font-sans">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-navy">{t('contact.fname')}</label>
                  <input 
                    {...register("firstName")}
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all bg-white text-brand-navy placeholder:text-brand-navy/30" 
                    placeholder={t('contact.fname').replace(' *', '')} 
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-navy">{t('contact.lname')}</label>
                  <input 
                    {...register("lastName")}
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all bg-white text-brand-navy placeholder:text-brand-navy/30" 
                    placeholder={t('contact.lname').replace(' *', '')} 
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message as string}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-navy">{t('contact.city')}</label>
                <input
                  {...register("city")}
                  className="w-full px-4 py-3 rounded-xl border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all bg-white text-brand-navy placeholder:text-brand-navy/30"
                  placeholder="Montreal"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-navy">{t('contact.email')}</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all bg-white text-brand-navy placeholder:text-brand-navy/30" 
                    placeholder="example@email.com" 
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-navy">{t('contact.phone')}</label>
                  <input 
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all bg-white text-brand-navy placeholder:text-brand-navy/30" 
                    placeholder="(514) 123-4567" 
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-navy">{t('contact.interest')}</label>
                <select 
                  {...register("interestedIn")}
                  className="w-full px-4 py-3 rounded-xl border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all bg-white appearance-none text-brand-navy" 
                >
                  <option value="" disabled>{t('contact.select')}</option>
                  <option>{t('opt.complete')}</option>
                  <option>{t('opt.cabinets')}</option>
                  <option>{t('opt.countertops')}</option>
                  <option>{t('opt.island')}</option>
                </select>
                {errors.interestedIn && <p className="text-red-500 text-xs mt-1">{errors.interestedIn.message as string}</p>}
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium text-center">{t('contact.error')}</p>
              )}

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-navy text-brand-white font-mono uppercase tracking-widest text-sm py-4 md:py-5 rounded-xl hover:bg-brand-gold hover:text-brand-navy transition-all mt-6 flex justify-center items-center gap-3 shadow-lg shadow-brand-navy/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-brand-gold/20 hover:border-brand-navy"
              >
                {status === 'loading' ? t('contact.sending') : t('contact.submit')} <ArrowRight size={18} />
              </button>
              
              <p className="text-center text-xs text-brand-navy/50 mt-4 flex items-center justify-center gap-1.5 font-sans">
                <ShieldCheck size={14} /> {t('contact.secure')}
              </p>
            </form>
          )}
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
