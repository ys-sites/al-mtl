'use client';
import { motion } from 'framer-motion';
import { projects } from '@/lib/content';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function ProjectsGrid() {
  return (
    <section className="py-32 px-6 bg-brand-bg relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="font-serif text-5xl md:text-7xl mb-6">Our Portfolio</h2>
          <p className="font-sans text-brand-white/60 max-w-2xl mx-auto text-lg">
            A curated selection of our finest kitchen transformations, blending timeless materials with modern precision.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              className={`group relative overflow-hidden bg-brand-dark/50 border border-brand-white/10 rounded-sm p-8
                hover:border-brand-gold/50 transition-colors duration-500 flex flex-col justify-between
                ${project.featured ? 'md:col-span-2 lg:col-span-2 bg-brand-navy/30' : ''}`}
            >
              <div>
                <span className="font-mono text-brand-gold text-xs tracking-widest-lux uppercase mb-4 block">
                  {project.style} • {project.timeline}
                </span>
                <h3 className="font-serif text-3xl mb-2 group-hover:text-brand-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <h4 className="font-sans text-brand-white/80 mb-6 font-medium">
                  {project.subtitle}
                </h4>
                <p className="font-sans text-brand-white/60 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-brand-white/10">
                <button className="text-brand-gold font-mono tracking-widest text-sm uppercase flex items-center gap-2 group-hover:gap-4 transition-all" aria-label={`View details for ${project.title}`}>
                  View Project <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
