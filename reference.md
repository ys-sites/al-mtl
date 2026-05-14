# Implementation Plan: Luxuriant Kitchens (Renovation & Design)

## 1. Project Setup & Architecture

**Initialize the Next.js 14 Project:**
```bash
npx create-next-app@latest luxury-kitchen-reno --typescript --tailwind --eslint --app
cd luxury-kitchen-reno
npm install framer-motion @studio-freight/lenis react-hook-form @hookform/resolvers zod razorpay
npm install -D @types/razorpay
```

Directory Structure:

```plaintext
/
├── app/
│   ├── api/
│   │   └── razorpay/
│   │       └── route.ts        # Deposit for design consultation
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Portfolio, Services, Process, Contact
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── ApproachScroll.tsx  # sequence-1: Drone exterior fly-in to window
│   │   ├── RevealTransition.tsx# sequence-2: Wood to Navy/Copper transformation
│   │   ├── MaterialShowcase.tsx# Looping video of finishes/textures
│   │   ├── ServicesGrid.tsx
│   │   └── ConsultationForm.tsx
│   └── ui/
│       └── CanvasSequence.tsx  # Reusable canvas core (unchanged from previous)
├── hooks/
│   └── useImagePreloader.ts    # Frame loading logic
├── lib/
│   └── content.ts              # Renovation Copywriting & Services Data
├── public/
│   ├── sequence-1/             # Exterior to window frames (0001.jpg - 0xxx.jpg)
│   ├── sequence-2/             # Before/After transformation frames
│   └── craftsmanship-loop.mp4  # Replaces globe loop
└── tailwind.config.ts
```

## 2. Global Styles & Typography
We will adjust the brand accent to match the striking copper range hood from your transformation video, paired with the deep navy blue of the new cabinets.

`tailwind.config.ts` Extension:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAFA',       // Warm white
          dark: '#1A202C',     // Slate/Navy black
          accent: '#B87333',   // Copper accent
          navy: '#1B263B',     // Deep cabinet navy
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        'widest-lux': '0.2em',
      }
    }
  }
}
```

## 3. Core Component Logic Adapations
The CanvasSequence and useImagePreloader remain exactly the same technically, but how they are implemented in the sections changes.

### A. Sequence 1: The Approach (Drone Fly-In)
This sequence plays the Al-mtl.mp4 drone shot converted to frames.

`components/sections/ApproachScroll.tsx`

```typescript
import CanvasSequence from '../ui/CanvasSequence';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function ApproachScroll() {
  // Assuming 120 frames for the drone fly-in
  const { images, progress } = useImagePreloader(120, '/sequence-1/');

  if (progress < 100) {
    return <div className="h-screen flex items-center justify-center text-brand-dark font-serif">Loading Vision {progress}%</div>;
  }

  return (
    <section className="relative">
      <CanvasSequence images={images} frameCount={120} />
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-white z-10">
        <h1 className="font-serif text-6xl md:text-8xl tracking-widest-lux text-center drop-shadow-lg">
          THE HEART<br />OF YOUR HOME
        </h1>
        <p className="mt-6 font-sans text-lg md:text-xl font-light tracking-widest uppercase">
          Masterpiece Kitchens & Cabinetry
        </p>
      </div>
    </section>
  );
}
```

### B. Sequence 2: The Reveal (Wood to Navy Transformation)
This utilizes the Kitchen_transformation...mp4 frames.

`components/sections/RevealTransition.tsx`

```typescript
import CanvasSequence from '../ui/CanvasSequence';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function RevealTransition() {
  // Assuming 90 frames for the transformation animation
  const { images } = useImagePreloader(90, '/sequence-2/');

  return (
    <section className="relative">
      <CanvasSequence images={images} frameCount={90} />
      <div className="absolute bottom-20 left-10 pointer-events-none z-10">
        <h2 className="font-serif text-4xl md:text-6xl text-white drop-shadow-md">
          Vision to Reality.
        </h2>
        <p className="mt-4 font-sans text-white/80 max-w-md">
          Watch as we strip away the outdated and sculpt a modern culinary sanctuary. Every detail, from the copper hood to the custom navy millwork, is engineered for perfection.
        </p>
      </div>
    </section>
  );
}
```

## 4. Forms & Consultation Booking
Instead of a travel booking, the form captures leads for high-end renovations and charges a nominal commitment fee (or holds a card) for the initial architectural design consultation using Razorpay.

`components/sections/ConsultationForm.tsx`

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  timeline: z.string(),
  budget: z.string(),
});

export default function ConsultationForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(consultationSchema)
  });

  const handlePayment = async (data: any) => {
    // 1. Call API route to create Razorpay order for a $250 Design Consultation
    const res = await fetch('/api/razorpay', { method: 'POST' });
    const order = await res.json();

    // 2. Initialize Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "USD",
      name: "Luxuriant Kitchens",
      description: `Initial Design Consultation Deposit`,
      order_id: order.id,
      handler: function (response: any) {
        alert(`Consultation Confirmed! We will contact you shortly. ID: ${response.razorpay_payment_id}`);
      },
      theme: { color: "#B87333" } // Copper brand color
    };
    
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bg-brand-navy py-24 px-6">
      <div className="max-w-xl mx-auto text-center text-brand-bg">
        <h2 className="font-serif text-5xl mb-12 text-brand-accent">Begin Your Transformation</h2>
        <form onSubmit={handleSubmit(handlePayment)} className="space-y-8 text-left">
          <input {...register("name")} className="w-full border-b border-brand-bg/30 py-3 bg-transparent font-sans text-brand-bg placeholder:text-brand-bg/50 focus:outline-none focus:border-brand-accent transition-colors" placeholder="Full Name" />
          <input {...register("email")} className="w-full border-b border-brand-bg/30 py-3 bg-transparent font-sans text-brand-bg placeholder:text-brand-bg/50 focus:outline-none focus:border-brand-accent transition-colors" placeholder="Email Address" />
          
          <select {...register("budget")} className="w-full border-b border-brand-bg/30 py-3 bg-transparent font-sans text-brand-bg/50 focus:outline-none focus:border-brand-accent appearance-none">
            <option value="" disabled selected>Select Project Budget</option>
            <option value="50k-100k">$50k - $100k</option>
            <option value="100k-200k">$100k - $200k</option>
            <option value="200k+">$200k+</option>
          </select>

          <button type="submit" className="bg-brand-accent text-white w-full py-5 tracking-widest-lux font-serif hover:bg-brand-bg hover:text-brand-navy transition-colors duration-300">
            RESERVE CONSULTATION
          </button>
        </form>
      </div>
    </div>
  );
}
```

## 5. Premium Content (lib/content.ts)

```typescript
export const services = [
  {
    id: 1,
    title: "Bespoke Cabinetry",
    description: "Custom millwork designed and crafted specifically for your home's unique footprint. Available in premium hardwoods and cutting-edge matte finishes.",
  },
  {
    id: 2,
    title: "Architectural Remodeling",
    description: "Full-scale layout transformations. We remove walls, re-route utilities, and optimize the flow of your culinary space.",
  },
  {
    id: 3,
    title: "Luxury Surface Curation",
    description: "Sourcing rare natural stones, hand-poured concrete, and premium quartz for countertops and seamless backsplashes.",
  },
  {
    id: 4,
    title: "Integrated Appliances",
    description: "Flawless integration of professional-grade appliances from Sub-Zero, Wolf, and La Cornue, hidden seamlessly within your cabinetry.",
  }
];
```
