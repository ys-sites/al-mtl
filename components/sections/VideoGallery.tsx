'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const BACKGROUND_IMAGES = [
  "/frames/frame_0020.jpg", "/frames/frame_0030.jpg", "/frames/frame_0040.jpg", "/frames/frame_0050.jpg", 
  "/frames/frame_0060.jpg", "/frames/frame_0070.jpg", "/frames/frame_0080.jpg", "/frames/frame_0090.jpg"
];

const VIDEOS = [
  {
    id: 1,
    title: "Navy Cabinet Installation",
    videoUrl: "", // Add video URLs later
    poster: "/frames/frame_0030.jpg",
    igLink: "#",
  },
  {
    id: 2,
    title: "Brass Hardware Details",
    videoUrl: "",
    poster: "/frames/frame_0050.jpg",
    igLink: "#",
  },
  {
    id: 3,
    title: "Quartz Countertop Finish",
    videoUrl: "",
    poster: "/frames/frame_0070.jpg",
    igLink: "#",
  },
  {
    id: 4,
    title: "Final Kitchen Reveal",
    videoUrl: "",
    poster: "/frames/frame_0090.jpg",
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/50 text-brand-gold backdrop-blur-md font-mono text-sm mb-6 border border-brand-gold/20 tracking-widest uppercase"
          >
            <Instagram size={16} /> {t('gallery.badge')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-brand-white mb-4 tracking-tight"
          >
            {t('gallery.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-white/60 max-w-2xl mx-auto text-lg font-sans"
          >
            {t('gallery.subtitle')}
          </motion.p>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-brand-navy/50 backdrop-blur-md rounded-2xl overflow-hidden border border-brand-white/10 group hover:border-brand-gold/50 transition-colors shadow-2xl"
    >
      {/* Header - Clickable to IG */}
      <a 
        href={video.igLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 border-b border-brand-white/10 hover:bg-brand-white/5 transition-colors cursor-pointer gap-2"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-gold to-brand-lightgold p-[2px] shrink-0">
            <div className="w-full h-full bg-brand-navy rounded-full flex items-center justify-center">
              <Instagram size={14} className="text-brand-white" />
            </div>
          </div>
          <span className="text-brand-white font-serif text-sm truncate">{video.title}</span>
        </div>
      </a>

      {/* Video Container */}
      <div 
        className="relative aspect-[9/16] bg-brand-dark cursor-pointer overflow-hidden"
        onClick={togglePlay}
      >
        {video.videoUrl ? (
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.poster}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
            loop
            playsInline
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <img 
            src={video.poster}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
            alt={video.title}
          />
        )}
        
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/30 group-hover:bg-brand-dark/10 transition-colors">
            <div className="w-16 h-16 rounded-full bg-brand-gold/80 backdrop-blur-md flex items-center justify-center border border-brand-lightgold transform group-hover:scale-110 transition-transform">
              <Play size={24} className="text-brand-navy ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
