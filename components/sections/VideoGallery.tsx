'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ShinyText from '@/components/ui/ShinyText';
import BlurText from '@/components/ui/BlurText';

const BACKGROUND_IMAGES = [
  "/frames/ezgif-frame-030.jpg", "/frames/ezgif-frame-060.jpg", "/frames/ezgif-frame-090.jpg", "/frames/ezgif-frame-120.jpg", 
  "/frames/ezgif-frame-150.jpg", "/frames/ezgif-frame-180.jpg", "/frames/ezgif-frame-210.jpg", "/frames/ezgif-frame-240.jpg"
];

const VIDEOS = [
  {
    id: 1,
    title: "Navy Cabinet Installation",
    videoUrl: "", // Add video URLs later
    poster: "/frames/ezgif-frame-060.jpg",
    igLink: "#",
  },
  {
    id: 2,
    title: "Brass Hardware Details",
    videoUrl: "",
    poster: "/frames/ezgif-frame-120.jpg",
    igLink: "#",
  },
  {
    id: 3,
    title: "Quartz Countertop Finish",
    videoUrl: "",
    poster: "/frames/ezgif-frame-180.jpg",
    igLink: "#",
  },
  {
    id: 4,
    title: "Final Kitchen Reveal",
    videoUrl: "",
    poster: "/frames/ezgif-frame-240.jpg",
    igLink: "#",
  }
];

export default function VideoGallery() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce background complexity drastically for mobile to prevent iOS Safari crash
  const rowsCount = isMobile ? 3 : 4;
  const imagesPerRow = isMobile ? 3 : BACKGROUND_IMAGES.length;
  const mobileImages = BACKGROUND_IMAGES.slice(0, imagesPerRow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  return (
    <div className="relative w-full min-h-[70vh] overflow-hidden flex items-center justify-center bg-brand-bg py-20">
      {/* Background Grid - Animated Rows */}
      <div className="absolute inset-0 z-0 flex flex-col gap-2 opacity-20 overflow-hidden">
        {/* Animated Rows */}
        {[...Array(rowsCount)].map((_, rowIndex) => (
          <motion.div 
            key={rowIndex}
            className="flex gap-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 60 + (rowIndex * 10), 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {[...(isMobile ? mobileImages : BACKGROUND_IMAGES), ...(isMobile ? mobileImages : BACKGROUND_IMAGES)].map((img, i) => (
              <div key={i} className="w-48 h-36 md:w-64 md:h-48 rounded-lg overflow-hidden shrink-0">
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-brand-bg/90 z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white backdrop-blur-md font-sans text-sm mb-6 border border-white/10 shadow-xl"
          >
            <Instagram size={16} /> {t('gallery.badge') || "Follow our journey"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-4 tracking-tight block"
          >
            <ShinyText
              text={t('gallery.title')}
              color="#ffffff"
              shineColor="#C9A84C"
              speed={3}
            />
          </motion.h2>
          <div className="flex justify-center">
            <BlurText
              text={t('gallery.subtitle')}
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-brand-white/60 max-w-2xl mx-auto text-lg font-sans"
            />
          </div>
        </div>

        {/* Video Display */}
        <div className="relative">
          {/* Mobile: Carousel with Arrows */}
          <div className="md:hidden relative flex items-center justify-center max-w-sm mx-auto">
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-30 w-10 h-16 flex items-center justify-center bg-brand-dark/80 backdrop-blur-md text-brand-white hover:text-brand-gold transition-all rounded-r-full border-y border-r border-white/10"
            >
              <ChevronLeft size={24} className="mr-1" />
            </button>
            
            <div className="w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoCard video={VIDEOS[currentIndex]} index={0} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              onClick={nextSlide}
              className="absolute right-0 z-30 w-10 h-16 flex items-center justify-center bg-brand-dark/80 backdrop-blur-md text-brand-white hover:text-brand-gold transition-all rounded-l-full border-y border-l border-white/10"
            >
              <ChevronRight size={24} className="ml-1" />
            </button>
          </div>

          {/* Laptop/Tablet: Grid without Arrows */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEOS.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, index }: { video: any, index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayPending, setIsPlayPending] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current || isPlayPending || !video.videoUrl) return;

    if (!videoRef.current.paused) {
      videoRef.current.pause();
    } else {
      setIsPlayPending(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayPending(false);
          })
          .catch(error => {
            console.log("Playback prevented:", error);
            setIsPlayPending(false);
          });
      } else {
        setIsPlayPending(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="relative rounded-[2rem] overflow-hidden border border-white/10 group hover:border-white/30 transition-colors shadow-2xl aspect-[9/16] bg-brand-dark cursor-pointer"
    >
      {/* Video / Poster */}
      <div 
        className="absolute inset-0 w-full h-full"
        onClick={togglePlay}
      >
        {video.videoUrl ? (
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.poster}
            className="w-full h-full object-cover transition-all duration-700"
            loop
            playsInline
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <img 
            src={video.poster}
            className="w-full h-full object-cover transition-all duration-700"
            alt={video.title}
          />
        )}
        
        {/* Dark gradient overlay for top and bottom readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Absolute Header Overlay */}
      <a 
        href={video.igLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 inset-x-4 z-20 flex items-center justify-between p-2 pl-3 pr-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] shrink-0">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Instagram size={10} className="text-white" />
            </div>
          </div>
          <span className="text-white font-sans font-medium text-xs truncate max-w-[80px]">
            {video.title.substring(0, 5)}...
          </span>
        </div>
        <div className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-[10px] font-sans text-white border border-white/5">
          View on Instagram
        </div>
      </a>
      
      {/* Play Button Overlay */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center group-hover:bg-black/10 transition-colors"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transform group-hover:scale-110 transition-transform">
            <Play size={24} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
