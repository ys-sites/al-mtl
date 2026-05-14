'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { steps } from '@/lib/content';
import { useLanguage } from '@/lib/LanguageContext';
import ShinyText from '@/components/ui/ShinyText';

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const { t } = useLanguage();

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-brand-navy relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-5xl md:text-7xl mb-6 block">
            <ShinyText
              text={t('process.title')}
              color="#ffffff"
              shineColor="#C9A84C"
              speed={3}
            />
          </h2>
          <p className="font-sans text-brand-white/80 max-w-xl mx-auto text-lg">
            {t('process.desc')}
          </p>
        </motion.div>

        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-64 bottom-0 w-px bg-brand-white/10 hidden md:block">
          <motion.div 
            className="w-full bg-brand-gold origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            // Get translation keys based on step number, e.g. "step.01.title"
            const stepKeyPrefix = `step.${step.number}`;
            return (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Number node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-navy border border-brand-gold rounded-full flex items-center justify-center z-10 hidden md:flex shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                  <span className="font-mono text-brand-gold">{step.number}</span>
                </div>

                <div className={`md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <span className="md:hidden font-mono text-brand-gold block mb-2">{step.number}</span>
                  <h3 className="font-serif text-3xl md:text-4xl mb-2">{t(`${stepKeyPrefix}.title`)}</h3>
                  <h4 className="font-sans text-brand-gold mb-4 uppercase tracking-widest text-sm">{t(`${stepKeyPrefix}.sub`)}</h4>
                  <p className="font-sans text-brand-white/70 leading-relaxed">
                    {t(`${stepKeyPrefix}.desc`)}
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
