import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../types";
import { Quote, Star, ChevronLeft, ChevronRight, X } from "lucide-react";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Farhan Syahputra",
    role: "Founder & CEO",
    company: "Aero Digital Venture",
    avatar: "FS",
    text: "Zeas Creative Corner melampaui seluruh ekspektasi kami. Desain landing page yang mereka kerjakan tidak hanya mewah secara estetika, tetapi langsung mendongkrak tingkat konversi pendaftaran sebesar 45% dalam satu bulan sejak diluncurkan. Sentuhan fuchsia dan silver yang elegan mencerminkan identitas korporat kami dengan sangat sempurna.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Christian Hadinata",
    role: "Marketing Director",
    company: "Sinergi Event Planner",
    avatar: "CH",
    text: "Kerja sama luar biasa! Video promosi dan undangan website digital terintegrasi yang dirancang oleh Zeas untuk acara konferensi tahunan kami menerima pujian luar biasa luas dari ribuan tamu VIP. Seluruh transisi visualnya terasa begitu halus, modern, mewah, dan berkelas dunia.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Aurelia Verenza",
    role: "Creative Director",
    company: "The Golden Era Studio",
    avatar: "AV",
    text: "Sebagai agensi kreatif premium, kami sangat pemilih tentang mitra digital. Zeas berhasil menerjemahkan ide-ide kami ke dalam website portofolio interaktif yang spektakuler. Detail pengerjaan mockups, tipografi, dan navigasinya luar biasa mulus dan profesional.",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-play interval - paused when modal is open
  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds auto scroll
    return () => clearInterval(timer);
  }, [index, isModalOpen]);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[index];

  return (
    <div className="w-full max-w-4xl mx-auto relative px-4 md:px-12 py-4">
      
      {/* Background elegant large quotation mark */}
      <div className="absolute top-0 left-6 text-[#C2185B]/5 pointer-events-none">
        <Quote className="w-24 h-24 md:w-36 md:h-36" />
      </div>

      {/* Main card box with strict height restrictions (180-220px) */}
      <div className="relative h-[210px] md:h-[220px] flex flex-col justify-between items-center text-center px-4 overflow-hidden bg-white/40 backdrop-blur-sm rounded-2xl border border-silver-brand/20 p-5 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center w-full h-full justify-between"
          >
            {/* Upper Content */}
            <div className="flex flex-col items-center">
              {/* Stars */}
              <div className="flex gap-0.5 mb-2 text-[#C2185B]/85">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C2185B]" />
                ))}
              </div>

              {/* Text limited to max 4-5 lines of text to maintain strict 180-220px height */}
              <blockquote className="font-serif text-[12.5px] md:text-[14.5px] text-slate-700 leading-relaxed italic max-w-xl line-clamp-4 font-medium px-2">
                "{active.text}"
              </blockquote>
            </div>

            {/* Read More button & Author Info */}
            <div className="w-full flex flex-col items-center gap-1.5 mt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="interactive-cursor text-[10.5px] font-sans font-extrabold tracking-widest text-[#C2185B] hover:text-[#A01048] hover:underline uppercase transition-all"
              >
                Baca Selengkapnya
              </button>

              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-full bg-[#C2185B] text-white flex items-center justify-center font-serif text-[10px] font-bold border border-silver-brand/35">
                  {active.avatar}
                </div>
                <div className="leading-tight">
                  <cite className="not-italic font-sans text-[11px] font-bold text-slate-900 tracking-wide block">
                    {active.name}
                  </cite>
                  <span className="font-sans text-[8.5px] text-[#C2185B] font-semibold tracking-wider uppercase block">
                    {active.role} • {active.company}
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="flex justify-center items-center gap-5 mt-4">
        <button
          onClick={handlePrev}
          className="interactive-cursor w-8 h-8 border border-silver-brand/40 hover:border-[#C2185B] hover:text-[#C2185B] transition-colors duration-300 flex items-center justify-center text-slate-600 rounded-full bg-white/70 shadow-sm"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Bullet indicators */}
        <div className="flex gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`interactive-cursor h-1.5 rounded-full transition-all duration-300 ${
                index === i ? "bg-[#C2185B] w-4" : "bg-silver-brand/40 hover:bg-[#C2185B]/40 w-1.5"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="interactive-cursor w-8 h-8 border border-silver-brand/40 hover:border-[#C2185B] hover:text-[#C2185B] transition-colors duration-300 flex items-center justify-center text-slate-600 rounded-full bg-white/70 shadow-sm"
          aria-label="Next review"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Testimonial Full Detail Popup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="bg-[#FFF8F2] border-2 border-[#D4AF37] p-6 rounded-[22px] shadow-[0_20px_50px_rgba(194,24,91,0.25)] max-w-lg w-full relative z-10 font-sans flex flex-col gap-4 text-center items-center"
            >
              {/* Header */}
              <div className="w-full flex justify-between items-center pb-2 border-b border-[#D4AF37]/20">
                <span className="font-serif text-[11px] tracking-[0.18em] font-extrabold text-[#C2185B] uppercase">
                  TESTIMONI LENGKAP
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="interactive-cursor p-1 hover:bg-black/5 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quote details */}
              <div className="text-center space-y-4">
                <div className="flex gap-1 justify-center text-[#C2185B]">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-[#C2185B]" />
                  ))}
                </div>

                <blockquote className="font-serif text-sm sm:text-base text-slate-800 leading-relaxed italic px-2 font-medium">
                  "{active.text}"
                </blockquote>
              </div>

              {/* Author profile banner */}
              <div className="flex items-center gap-3 text-left bg-white/60 p-3 rounded-2xl border border-silver-brand/30 w-full mt-2">
                <div className="w-10 h-10 rounded-full bg-[#C2185B] text-white flex items-center justify-center font-serif text-sm font-black border border-[#D4AF37]/35">
                  {active.avatar}
                </div>
                <div className="leading-tight">
                  <cite className="not-italic font-sans text-xs sm:text-sm font-bold text-slate-900 tracking-wide block">
                    {active.name}
                  </cite>
                  <span className="font-sans text-[10px] text-[#C2185B] font-semibold tracking-wider uppercase block mt-0.5">
                    {active.role} • {active.company}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="interactive-cursor w-full py-2.5 px-4 bg-[#C2185B] hover:bg-[#A01048] text-white font-sans text-xs tracking-widest font-extrabold uppercase transition-all duration-300 rounded-full text-center mt-2 border border-[#C2185B]"
              >
                TUTUP
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
