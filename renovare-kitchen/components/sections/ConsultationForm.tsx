'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const consultSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  kitchenSize: z.string().optional(),
  projectType: z.enum([
    'Full Renovation',
    'Cabinets Only',
    'Countertops Only',
    'Custom Island'
  ]),
  timeline: z.enum([
    'As soon as possible',
    'Within 1 month',
    'Within 3 months',
    'Just exploring options'
  ]),
  message: z.string().optional(),
});

export default function ConsultationForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(consultSchema)
  });

  const onSubmit = async (data: any) => {
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    console.log("Form Data Submitted:", data);
    alert('Thank you! We will contact you within 24 hours.');
  };

  return (
    <section className="py-24 px-4 bg-brand-dark">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-serif text-5xl mb-12 text-brand-gold text-center">Request Consultation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-lg mx-auto">
          <input {...register("name")}
            className="w-full border-b border-brand-gold/30 py-3 bg-transparent
              font-sans text-brand-white placeholder-white/30 
              focus:border-brand-gold outline-none transition-colors"
            placeholder="Full Name" />

          <input {...register("email")}
            className="w-full border-b border-brand-gold/30 py-3 bg-transparent
              font-sans text-brand-white placeholder-white/30 
              focus:border-brand-gold outline-none transition-colors"
            placeholder="Email Address" />

          <input {...register("phone")}
            className="w-full border-b border-brand-gold/30 py-3 bg-transparent
              font-sans text-brand-white placeholder-white/30 
              focus:border-brand-gold outline-none transition-colors"
            placeholder="Phone Number" />

          <select {...register("projectType")}
            className="w-full border-b border-brand-gold/30 py-3 bg-transparent
              font-sans text-brand-white focus:border-brand-gold outline-none [&>option]:text-black">
            <option value="">Project Type</option>
            <option>Full Renovation</option>
            <option>Cabinets Only</option>
            <option>Countertops Only</option>
            <option>Custom Island</option>
          </select>

          <select {...register("timeline")}
            className="w-full border-b border-brand-gold/30 py-3 bg-transparent
              font-sans text-brand-white focus:border-brand-gold outline-none [&>option]:text-black">
            <option value="">Desired Timeline</option>
            <option>As soon as possible</option>
            <option>Within 1 month</option>
            <option>Within 3 months</option>
            <option>Just exploring options</option>
          </select>

          <textarea {...register("message")}
            className="w-full border-b border-brand-gold/30 py-3 bg-transparent
              font-sans text-brand-white placeholder-white/30 
              focus:border-brand-gold outline-none transition-colors resize-none"
            rows={3}
            placeholder="Tell us about your kitchen (optional)" />

          <button type="submit"
            className="w-full bg-brand-navy border border-brand-gold
              text-brand-gold font-mono tracking-widest-lux py-4
              hover:bg-brand-gold hover:text-brand-navy transition-all duration-500">
            REQUEST FREE CONSULTATION
          </button>
        </form>
      </div>
    </section>
  );
}
