import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../types";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

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

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds auto scroll
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[index];

  return (
    <div className="w-full max-w-4xl mx-auto relative px-4 md:px-12 py-6">
      
      {/* Background elegant large quotation mark */}
      <div className="absolute top-0 left-4 text-fuchsia-brand/5 pointer-events-none">
        <Quote className="w-32 h-32 md:w-44 md:h-44" />
      </div>

      <div className="relative min-h-[300px] flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Elegant Stars */}
            <div className="flex gap-1 mb-6 text-fuchsia-brand/80">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-fuchsia-brand" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="font-serif text-lg md:text-2xl text-slate-800 leading-relaxed font-light italic max-w-2xl mb-8">
              "{active.text}"
            </blockquote>

            {/* Avatar & Author Info */}
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-fuchsia-brand text-cream flex items-center justify-center font-serif text-sm font-semibold tracking-wider border border-silver-brand/35">
                {active.avatar}
              </div>
              <div>
                <cite className="not-italic font-sans text-sm font-semibold text-slate-900 tracking-wide block">
                  {active.name}
                </cite>
                <span className="font-sans text-xs text-fuchsia-brand tracking-widest uppercase block mt-0.5">
                  {active.role} • {active.company}
                </span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={handlePrev}
          className="interactive-cursor w-10 h-10 border border-silver-brand/40 hover:border-fuchsia-brand hover:text-fuchsia-brand transition-colors duration-300 flex items-center justify-center text-slate-600 rounded-none bg-transparent"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Bullet indicators */}
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`interactive-cursor w-2.5 h-2.5 rounded-none transition-all duration-300 ${
                index === i ? "bg-fuchsia-brand w-6" : "bg-silver-brand/50 hover:bg-fuchsia-brand/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="interactive-cursor w-10 h-10 border border-silver-brand/40 hover:border-fuchsia-brand hover:text-fuchsia-brand transition-colors duration-300 flex items-center justify-center text-slate-600 rounded-none bg-transparent"
          aria-label="Next review"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
