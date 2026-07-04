import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  Sparkles,
  Heart,
  Video,
  Package,
  RotateCcw,
  Award,
  Users,
  Layers,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Link,
  Globe,
  Palette,
  BookOpen,
  Briefcase
} from "lucide-react";

import OpeningScreen from "./components/OpeningScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import RunningText from "./components/RunningText";
import KaryaLayanan from "./components/KaryaLayanan";
import KaryaLayananDetail from "./components/KaryaLayananDetail";
import TestimonialSlider from "./components/TestimonialSlider";
import ContactForm from "./components/ContactForm";
import TopInfoBar from "./components/TopInfoBar";
import ScrollIndicator from "./components/ScrollIndicator";
import TentangZea from "./components/TentangZea";

// Helper hook for animating counters on viewport entry
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = target;
          const totalSteps = 60;
          const stepTime = duration / totalSteps;
          const increment = (end - start) / totalSteps;

          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            start += increment;
            if (currentStep >= totalSteps) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="font-serif text-3xl md:text-5xl font-bold text-fuchsia-brand">
      {count}
      {suffix}
    </div>
  );
}

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [activeSection, setActiveSection] = useState("beranda");
  const [randomQuote, setRandomQuote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const quotes = [
      "Website yang baik bukan hanya terlihat indah, tetapi juga membangun kepercayaan.",
      "Setiap brand memiliki cerita. Kami membantu menceritakannya melalui desain.",
      "Desain yang elegan adalah investasi untuk masa depan bisnis.",
      "Kesan pertama dimulai dari tampilan digital.",
      "Karya terbaik lahir dari perhatian pada detail."
    ];
    const selected = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(selected);
  }, [showOpening]);

  // Track active section on scroll for navbar highlights
  useEffect(() => {
    if (showOpening || selectedCategory) return;

    const sections = ["beranda", "karya-layanan", "tentang", "testimoni", "kontak"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOpening, selectedCategory]);

  const handleNavigate = (sectionId: string) => {
    setSelectedCategory(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }, 80);
  };

  return (
    <>
      {/* Custom luxury cursor */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {showOpening ? (
          <OpeningScreen key="opening-screen" onEnter={() => setShowOpening(false)} />
        ) : (
          <motion.div
            key="main-studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-cream text-slate-800 flex flex-col marble-bg relative select-none selection:bg-fuchsia-brand selection:text-cream"
          >
            
            {/* Ambient Background Glow Lines / Parallax-like Accent Lines */}
            <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none z-0 opacity-40 overflow-hidden">
              <div className="absolute left-[-10%] top-[10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-silver-brand/40 to-transparent rotate-3" />
              <div className="absolute left-[-10%] top-[30%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-fuchsia-brand/10 to-transparent -rotate-2" />
              <div className="absolute right-[-10%] top-[60%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-silver-brand/30 to-transparent rotate-1" />
            </div>

            {/* Top Info Bar */}
            <TopInfoBar />

            {/* Floating Luxury Navbar */}
            <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

            {/* HERO SECTION */}
            <section
              id="beranda"
              className="px-6 md:px-12 max-w-7xl mx-auto w-full h-auto min-h-[85vh] flex flex-col justify-start items-center relative z-10 pt-[130px] pb-12 lg:pb-20 overflow-hidden"
            >
              {/* Satin Fuchsia Wave Backdrop */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-20">
                <svg className="absolute top-[20%] left-[-10%] w-[120%] h-[60%] blur-sm" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="satinFuchsia" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C2185B" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="#FAD7E8" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#A01048" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>
                  <path d="M0,200 C300,100 600,400 900,150 C1200,-100 1300,300 1440,250 L1440,600 L0,600 Z" fill="url(#satinFuchsia)" />
                </svg>
              </div>

              {/* Floating Ornaments (Slow movement, no sparkles, soft-pink, thin silver lines) */}
              <motion.div
                animate={{ 
                  y: [0, -18, 0],
                  x: [0, 8, 0]
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-[20%] left-[5%] w-28 h-28 rounded-full bg-soft-pink/15 blur-2xl pointer-events-none z-0"
              />
              <motion.div
                animate={{ 
                  y: [0, 22, 0],
                  x: [0, -12, 0]
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-[25%] right-[2%] w-36 h-36 rounded-full bg-fuchsia-brand/5 blur-3xl pointer-events-none z-0"
              />
              {/* Thin silver line ornament 1 */}
              <motion.div
                animate={{ 
                  rotate: [0, 2, 0],
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-[15%] right-[20%] w-52 h-[1px] bg-gradient-to-r from-transparent via-silver-brand/30 to-transparent pointer-events-none z-0"
              />
              {/* Thin silver line ornament 2 */}
              <motion.div
                animate={{ 
                  rotate: [0, -2, 0],
                  y: [0, 8, 0]
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-[20%] left-[10%] w-72 h-[1px] bg-gradient-to-r from-transparent via-silver-brand/20 to-transparent pointer-events-none z-0"
              />

              {/* Minimalist soft pink floral ornament in top right corner */}
              <div className="absolute top-10 right-10 w-36 h-36 opacity-15 pointer-events-none hidden md:block select-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-fuchsia-brand">
                  <path d="M 0,0 C 30,10 50,40 50,80" strokeWidth="0.5" />
                  <path d="M 50,80 C 45,70 30,65 15,70 C 25,60 40,65 50,80 Z" strokeWidth="0.5" fill="#FAD7E8" />
                  <path d="M 50,80 C 55,70 70,65 85,70 C 75,60 60,65 50,80 Z" strokeWidth="0.5" fill="#FAD7E8" />
                  <circle cx="50" cy="80" r="1.5" className="fill-fuchsia-brand" />
                </svg>
              </div>

              {/* Minimalist soft pink floral ornament in bottom left corner */}
              <div className="absolute bottom-10 left-10 w-36 h-36 opacity-15 pointer-events-none hidden md:block select-none rotate-180">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-fuchsia-brand">
                  <path d="M 0,0 C 30,10 50,40 50,80" strokeWidth="0.5" />
                  <path d="M 50,80 C 45,70 30,65 15,70 C 25,60 40,65 50,80 Z" strokeWidth="0.5" fill="#FAD7E8" />
                  <path d="M 50,80 C 55,70 70,65 85,70 C 75,60 60,65 50,80 Z" strokeWidth="0.5" fill="#FAD7E8" />
                  <circle cx="50" cy="80" r="1.5" className="fill-fuchsia-brand" />
                </svg>
              </div>

              {/* Gold line ornaments */}
              <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-amber-500/20 pointer-events-none hidden lg:block" />
              <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-amber-500/20 pointer-events-none hidden lg:block" />
              <div className="absolute top-[20%] right-[15%] w-[1px] h-[25%] bg-gradient-to-b from-transparent via-amber-500/10 to-transparent pointer-events-none" />

              <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto z-10 pt-2">
                
                {/* 1. Badge (Micro Animation Sequence: Mini Badges) */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-6 z-10">
                  {[
                    "Luxury Digital Studio",
                    "Responsive Design",
                    "Premium UI/UX",
                    "Fast Response",
                    "Modern Design"
                  ].map((badgeText, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="interactive-cursor inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-silver-brand/35 text-[8px] font-mono tracking-wider text-slate-700 font-bold uppercase hover:border-fuchsia-brand/40 shadow-sm transition-all duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-fuchsia-brand animate-pulse" />
                      {badgeText}
                    </motion.span>
                  ))}
                </div>

                {/* 2. Headline (Micro Animation Sequence 3: Headline with Shimmer) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="mb-4"
                >
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase font-bold block mb-2 shimmer-text-fuchsia">
                    ZEAS CREATIVE CORNER
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.2] text-slate-900 tracking-wide max-w-3xl mx-auto">
                    Bangun Kehadiran Digital yang <span className="shimmer-text-fuchsia italic font-normal">Elegan</span> dan <span className="shimmer-text-dark font-medium">Profesional</span>.
                  </h1>
                </motion.div>

                {/* 3. Subheadline (Micro Animation Sequence 4: Sub Heading) */}
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  className="font-sans text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mb-4"
                >
                  Kami membantu bisnis dan personal brand melalui Website, Landing Page, Produk Digital, Desain Link, Undangan Website Digital, dan Video Promosi.
                </motion.p>

                {/* Random Quote Banner */}
                {randomQuote && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.8 }}
                    className="border-l-2 border-fuchsia-brand/45 px-4 py-1 text-center max-w-xl mb-6"
                  >
                    <p className="font-serif italic text-xs text-slate-500 leading-relaxed">
                      "{randomQuote}"
                    </p>
                  </motion.div>
                )}

                {/* 4. CTA Button (Micro Animation Sequence 5: Buttons with Shimmer) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                  className="flex flex-col sm:flex-row justify-center gap-4 mb-8 w-full sm:w-auto"
                >
                  <button
                    onClick={() => handleNavigate("portofolio")}
                    className="interactive-cursor px-6 py-2.5 lg:px-8 lg:py-3.5 bg-fuchsia-brand text-cream font-sans text-[10px] lg:text-xs tracking-widest font-bold uppercase hover:opacity-90 transition-all duration-300 rounded-none shadow-md flex items-center justify-center gap-2 luxury-shimmer-btn border border-fuchsia-brand"
                  >
                    LIHAT PORTOFOLIO
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button
                    onClick={() => handleNavigate("kontak")}
                    className="interactive-cursor px-6 py-2.5 lg:px-8 lg:py-3.5 bg-transparent text-fuchsia-brand border border-fuchsia-brand hover:bg-fuchsia-brand/5 transition-all duration-300 font-sans text-[10px] lg:text-xs tracking-widest font-bold uppercase rounded-none flex items-center justify-center"
                  >
                    KONSULTASI SEKARANG
                  </button>
                </motion.div>

                {/* Trust Targets */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.95 }}
                  className="mb-14 pb-3 border-b border-silver-brand/20 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[9px] lg:text-xs font-mono tracking-wider text-slate-500 uppercase w-full"
                >
                  <span>✦ WEBSITE DESIGN</span>
                  <span>✦ LANDING PAGES</span>
                  <span>✦ DIGITAL PRODUCTS</span>
                  <span>✦ PREMIUM BRANDING</span>
                </motion.div>

                {/* 5. Mockup (Beautiful Centered Live Mockup Devices) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-col items-center justify-center relative min-h-[220px] lg:min-h-[440px] w-full max-w-4xl mx-auto select-none mt-4"
                >
                  
                  {/* Outer silver ring decorative backdrop */}
                  <div className="absolute w-56 h-56 xs:w-72 xs:h-72 lg:w-[480px] lg:h-[480px] rounded-full border border-silver-brand/10 z-0 animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute w-44 h-44 xs:w-56 xs:h-56 lg:w-[320px] lg:h-[320px] rounded-full border border-fuchsia-brand/5 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                  {/* Floating Devices Stack with Framer Motion Parallax-effect */}
                  <div className="relative w-full max-w-[340px] xs:max-w-[420px] md:max-w-[500px] lg:max-w-[620px] aspect-[16/10] flex items-center justify-center z-10 scale-[0.8] xs:scale-[0.9] sm:scale-100 lg:scale-[1.1] origin-center my-6">
                    
                    {/* 1. LAPTOP MOCKUP (Website Zeas Creative Corner Example) */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="w-full h-full bg-[#121212] rounded-xl p-3 shadow-2xl border border-silver-brand/40 relative z-20 shadow-fuchsia-brand/5"
                    >
                      {/* Laptop Screen */}
                      <div className="w-full h-full bg-cream overflow-hidden rounded-md flex flex-col relative select-none">
                        {/* Header */}
                        <div className="h-6 bg-cream border-b border-silver-brand/20 px-3 flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>
                          <span className="font-mono text-[6px] tracking-widest text-slate-400 uppercase">zeascreative.com</span>
                          <span className="w-4 h-1 bg-silver-brand rounded-full" />
                        </div>
                        {/* Mock Image */}
                        <div className="w-full h-full bg-cream overflow-hidden relative">
                          <img
                            src="/src/assets/images/agency_website_mockup_1783132862805.jpg"
                            alt="Zeas Creative Corner Agency Website on Laptop"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      {/* Laptop hinge notch */}
                      <div className="absolute bottom-[-10px] left-1/2 translate-x-[-50%] w-20 h-2.5 bg-slate-800 rounded-b-md border-t border-slate-700 shadow-inner" />
                    </motion.div>

                    {/* 2. TABLET MOCKUP (Landing Page Analytics Example) */}
                    <motion.div
                      whileHover={{ x: 10, y: -5, scale: 1.03 }}
                      className="absolute right-[-15px] md:right-[-35px] bottom-[20px] w-[130px] xs:w-[170px] md:w-[220px] aspect-[3/4] bg-[#111111] rounded-lg p-2 shadow-2xl border border-silver-brand/50 z-30 block shadow-fuchsia-brand/5"
                    >
                      {/* Tablet Screen */}
                      <div className="w-full h-full bg-white overflow-hidden rounded-md flex flex-col relative">
                        {/* App header bar */}
                        <div className="h-4 bg-white border-b border-slate-100 flex items-center justify-between px-2">
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="font-mono text-[4px] text-slate-400">dashboard.zeascreative.com</span>
                          <span className="w-2 h-0.5 bg-slate-200 rounded-full" />
                        </div>
                        {/* Mock Image */}
                        <div className="w-full h-full bg-white overflow-hidden relative">
                          <img
                            src="/src/assets/images/saas_landing_page_mockup_1783132876954.jpg"
                            alt="Zeas Creative Corner Landing Page on Tablet"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* 3. SMARTPHONE MOCKUP (Lynk.id Bio Link Showcase) */}
                    <motion.div
                      whileHover={{ x: -10, y: -10, scale: 1.05 }}
                      className="absolute left-[-25px] md:left-[-50px] bottom-[-15px] w-[80px] xs:w-[105px] md:w-[135px] aspect-[9/19] bg-[#0c0c0c] rounded-[24px] p-1.5 shadow-2xl border border-silver-brand/50 z-40 block shadow-fuchsia-brand/10"
                    >
                      {/* Notch camera */}
                      <div className="absolute top-2.5 left-1/2 translate-x-[-50%] w-8 h-3.5 bg-black rounded-full z-50 flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                      </div>
                      
                      {/* Mobile Screen */}
                      <div className="w-full h-full bg-cream overflow-hidden rounded-[16px] flex flex-col relative select-none">
                        {/* Mock Image */}
                        <div className="w-full h-full bg-cream overflow-hidden relative">
                          <img
                            src="/src/assets/images/mobile_link_design_mockup_1783132970153.jpg"
                            alt="Zeas Creative Corner Mobile Link Design on Smartphone"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </motion.div>

                  </div>

                </motion.div>

              </div>

              {/* Scroll Indicator at the bottom of the Hero Section */}
              <ScrollIndicator />
            </section>

            {/* HORIZONTAL MARQUEE RUNNING TEXT */}
            <RunningText />

            {/* DIVIDER QUOTE SECTION 1 */}
            <section className="py-10 bg-gradient-to-r from-cream via-white to-cream border-y border-silver-brand/15 relative overflow-hidden select-none">
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-3">
                <div className="w-10 h-[1px] bg-amber-500/25" />
                <h4 className="font-serif italic text-sm md:text-lg text-slate-800 tracking-wide font-medium">
                  "Every Brand Deserves an Elegant Digital Presence."
                </h4>
                <div className="w-10 h-[1px] bg-amber-500/25" />
              </div>
            </section>

            {/* KARYA & LAYANAN SECTION */}
            <section id="karya-layanan" className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10 scroll-mt-[132px] lg:scroll-mt-[152px]">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="font-sans text-xs md:text-sm tracking-[0.35em] text-fuchsia-brand uppercase font-bold block mb-2">
                  ✨ PORTFOLIO & SOLUSI
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-wide mb-4">
                  Karya & Layanan
                </h2>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
                  Setiap karya dirancang dengan memadukan estetika kelas dunia dan teknologi interaktif. Jelajahi galeri mahakarya unggulan kami di bawah ini.
                </p>
                <div className="w-16 h-[2px] bg-fuchsia-brand mx-auto mt-4" />
              </div>

              <KaryaLayanan onSelectCategory={setSelectedCategory} />
            </section>

            {/* STATISTIK COUNTER SECTION */}
            <section className="bg-white/60 py-12 px-6 md:px-12 border-y border-silver-brand/20 relative z-10 select-none">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-fuchsia-brand flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <AnimatedCounter target={150} suffix="+" />
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase mt-2">PROJECTS COMPLETED</span>
                  <p className="font-sans text-xs text-slate-500 mt-1">Karya digital berkelas tinggi</p>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center justify-center p-4 border-l border-silver-brand/20">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-fuchsia-brand flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <AnimatedCounter target={85} suffix="+" />
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase mt-2">HAPPY CLIENTS</span>
                  <p className="font-sans text-xs text-slate-500 mt-1">UMKM premium & korporasi</p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center justify-center p-4 border-l border-silver-brand/20">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-fuchsia-brand flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <AnimatedCounter target={12} suffix="k" />
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase mt-2">DESIGN ASSETS</span>
                  <p className="font-sans text-xs text-slate-500 mt-1">Template, preset, & ornamen</p>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center justify-center p-4 border-l border-silver-brand/20">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-fuchsia-brand flex items-center justify-center mb-3">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <AnimatedCounter target={100} suffix="%" />
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase mt-2">SATISFACTION RATE</span>
                  <p className="font-sans text-xs text-slate-500 mt-1">Komitmen layanan terbaik</p>
                </div>

              </div>
            </section>

            {/* DIVIDER QUOTE */}
            <section className="py-10 bg-gradient-to-r from-cream via-white to-cream border-y border-silver-brand/15 relative overflow-hidden select-none">
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-3">
                <div className="w-10 h-[1px] bg-amber-500/25" />
                <h4 className="font-serif italic text-sm md:text-lg text-slate-800 tracking-wide font-medium">
                  "Excellence Is In Every Single Pixel and Motion We Deliver."
                </h4>
                <div className="w-10 h-[1px] bg-amber-500/25" />
              </div>
            </section>



            {/* TENTANG KAMI (ABOUT US) SECTION */}
            <TentangZea />

            {/* TESTIMONI SECTION */}
            <section id="testimoni" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10 scroll-mt-[132px] lg:scroll-mt-[152px]">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="font-sans text-xs md:text-sm tracking-[0.35em] text-fuchsia-brand uppercase font-semibold block mb-2">
                  CLIENT TESTIMONIALS
                </span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-wide mb-3">
                  Apa Kata Klien Kami
                </h3>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
                  Kepercayaan dari berbagai bisnis, korporasi, personal brand, dan UMKM premium adalah kehormatan tertinggi bagi Zeas Creative Corner.
                </p>
                <div className="w-16 h-[2px] bg-fuchsia-brand mx-auto mt-4" />
              </div>

              {/* Autoplay Testimonials Slider Component */}
              <TestimonialSlider />
            </section>

            {/* KONTAK SECTION */}
            <section id="kontak" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10 scroll-mt-[132px] lg:scroll-mt-[152px]">
              {/* Core Contact Form & Direct channels */}
              <ContactForm />
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 px-6 md:px-12 border-t border-silver-brand/20 relative z-10 select-none">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
                
                {/* Footer Brand Info */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 flex items-center justify-center bg-cream/5 rounded-full">
                      <span className="font-serif text-sm font-bold text-cream">Z</span>
                    </div>
                    <div>
                      <span className="font-serif text-base tracking-widest text-cream font-semibold block">
                        ZEAS
                      </span>
                      <span className="font-sans text-[8px] tracking-[0.2em] text-fuchsia-brand uppercase block -mt-1">
                        CREATIVE CORNER
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-md mt-2">
                    Studio kreatif digital yang menghadirkan solusi desain elegan, modern, dan profesional untuk bisnis modern, personal brand, korporat, dan UMKM premium.
                  </p>
                </div>

                {/* Footer Navigation */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                  <h5 className="font-serif text-sm text-cream tracking-wider font-semibold">STUDIO NAVIGATION</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                    <button onClick={() => handleNavigate("beranda")} className="interactive-cursor text-left hover:text-fuchsia-brand transition-colors">Beranda</button>
                    <button onClick={() => handleNavigate("karya-layanan")} className="interactive-cursor text-left hover:text-fuchsia-brand transition-colors">Karya & Layanan</button>
                    <button onClick={() => handleNavigate("tentang")} className="interactive-cursor text-left hover:text-fuchsia-brand transition-colors">Tentang Kami</button>
                    <button onClick={() => handleNavigate("testimoni")} className="interactive-cursor text-left hover:text-fuchsia-brand transition-colors">Testimoni</button>
                    <button onClick={() => handleNavigate("kontak")} className="interactive-cursor text-left hover:text-fuchsia-brand transition-colors">Kontak</button>
                  </div>
                </div>
                {/* Footer Services list */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <h5 className="font-serif text-sm text-cream tracking-wider font-semibold">LAYANAN UTAMA</h5>
                  <ul className="text-xs font-sans flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-fuchsia-brand rounded-full" />
                      <span>Premium Website Design</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-fuchsia-brand rounded-full" />
                      <span>High-Converting Landing Pages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-fuchsia-brand rounded-full" />
                      <span>Exclusive Digital Website Invitation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-fuchsia-brand rounded-full" />
                      <span>Cinematic Social Promotional Videos</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Sub-footer copyright */}
              <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                <div>
                  © 2026 ZEAS CREATIVE CORNER. ALL RIGHTS RESERVED.
                </div>
                <div className="flex gap-4">
                  <span>DESIGNED BY EXPERT DESIGNERS</span>
                  <span>•</span>
                  <span>PREMIUM LUXURY STANDARD</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto bg-cream"
          >
            <KaryaLayananDetail categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
