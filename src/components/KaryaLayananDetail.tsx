import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Sparkles, Star, Layers, CheckCircle2 } from "lucide-react";
import { CATEGORIES_DATA, ShowcaseCategory, ProjectItem } from "../data/projects";

interface KaryaLayananDetailProps {
  categoryId: string;
  onBack: () => void;
}

export default function KaryaLayananDetail({ categoryId, onBack }: KaryaLayananDetailProps) {
  const [category, setCategory] = useState<ShowcaseCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find category info
    const found = CATEGORIES_DATA.find((c) => c.id === categoryId);
    if (found) {
      setCategory(found);
    }
    // Simple smooth loading effect to match luxury animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [categoryId]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!category) {
    return (
      <div className="py-24 px-6 text-center">
        <p className="font-serif italic text-slate-500">Kategori tidak ditemukan.</p>
        <button 
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-fuchsia-brand text-cream font-bold"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/20 pt-28 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-soft-pink/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-brand/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Back Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="interactive-cursor inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-silver-brand/35 text-[10px] md:text-xs font-sans font-bold tracking-widest text-slate-700 uppercase hover:border-fuchsia-brand/50 hover:bg-white transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-fuchsia-brand" />
            Kembali ke Beranda
          </button>
        </motion.div>

        {/* Editorial Title Header Section */}
        <div className="mb-14 border-b border-silver-brand/20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3.5 mb-3"
          >
            <span className="text-2xl md:text-3xl">{category.icon}</span>
            <span className="font-sans text-xs md:text-sm tracking-[0.35em] text-fuchsia-brand uppercase font-bold">
              GALERI KARYA PREMIUM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900 tracking-wide mb-4"
          >
            {category.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs md:text-base text-slate-600 max-w-3xl leading-relaxed"
          >
            {category.desc} Dirancang secara presisi menggunakan kombinasi estetika tingkat tinggi dan teknologi responsif terbaik demi menonjolkan kekuatan identitas brand Anda.
          </motion.p>
        </div>

        {/* Skeleton Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white/80 border border-silver-brand/25 rounded-2xl h-80 animate-pulse p-8">
                <div className="h-6 bg-slate-200 w-1/2 mb-4 rounded" />
                <div className="h-4 bg-slate-200 w-3/4 mb-2 rounded" />
                <div className="h-4 bg-slate-200 w-2/3 mb-8 rounded" />
                <div className="h-10 bg-slate-200 w-full rounded mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          /* Premium Showcase Grid */
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch"
          >
            {category.allProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white/75 backdrop-blur-sm border border-silver-brand/30 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-fuchsia-brand/45 hover:bg-soft-pink/5 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden"
              >
                {/* Thin side color indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-silver-brand/20 group-hover:bg-fuchsia-brand transition-colors duration-500" />
                
                {/* Corner ornament sparkles */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-4 h-4 text-fuchsia-brand/40 animate-pulse" />
                </div>

                <div>
                  {/* Category mini label & Active demo state */}
                  <div className="flex items-center justify-between gap-2 mb-4.5">
                    <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold">
                      {category.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-100 rounded-full text-[8px] font-mono font-bold text-green-600 uppercase">
                      <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                      Live Demo
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 tracking-wide mb-3 group-hover:text-fuchsia-brand transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                {/* Footer Link Button (Hidden URL, pure action link) */}
                <div className="mt-auto pt-6 border-t border-silver-brand/10">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-cursor w-full group/btn inline-flex items-center justify-center gap-2 px-5 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-fuchsia-brand text-cream hover:bg-fuchsia-hover transition-all duration-300 shadow-md luxury-shimmer-btn border border-fuchsia-brand"
                  >
                    {project.buttonText}
                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer Guarantee Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 p-8 border border-silver-brand/30 bg-white/40 backdrop-blur-md rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-fuchsia-50 flex items-center justify-center text-fuchsia-brand shrink-0">
              <Star className="w-5 h-5 fill-fuchsia-brand" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-slate-950">
                Pengerjaan Eksklusif, Kualitas Terbaik
              </h4>
              <p className="font-sans text-xs text-slate-500 mt-0.5 leading-relaxed">
                Kami berkomitmen mewujudkan hasil rancangan berkelas premium dengan performa optimal.
              </p>
            </div>
          </div>
          
          <button
            onClick={onBack}
            className="interactive-cursor shrink-0 py-3 px-6 bg-transparent text-fuchsia-brand border border-fuchsia-brand/40 hover:border-fuchsia-brand hover:bg-fuchsia-brand hover:text-cream font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 rounded-none"
          >
            KEMBALI KE BERANDA
          </button>
        </motion.div>

      </div>
    </div>
  );
}
