import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Check, Quote } from "lucide-react";

export default function TentangZea() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // State to support graceful fallback to original portrait if custom RAW GitHub URL fails to load
  const [imgSrc, setImgSrc] = useState("https://raw.githubusercontent.com/username/repository/main/images/logo.png");

  // Smooth spring configuration for the parallax movement
  const springConfig = { stiffness: 100, damping: 25 };
  
  // Transform mouse values into rotation & translations for 3D depth effect
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Outer ornament translations
  const ornamentX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const ornamentY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  
  const ornamentX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const ornamentY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = (e.clientX - rect.left) / width - 0.5; // [-0.5, 0.5]
    const mouseYRel = (e.clientY - rect.top) / height - 0.5; // [-0.5, 0.5]
    mouseX.set(mouseXRel);
    mouseY.set(mouseYRel);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="tentang" 
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-white via-[#FFF9F6] to-white border-y border-silver-brand/15 relative z-10 overflow-hidden scroll-mt-[132px] lg:scroll-mt-[152px]"
    >
      {/* Dynamic luxury background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      
      {/* Floating abstract pastel blur backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-gradient-to-tr from-fuchsia-brand/5 via-pink-400/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/5 via-rose-300/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-xs md:text-sm tracking-[0.35em] text-fuchsia-brand uppercase font-bold block mb-2">
            MEET THE FOUNDER
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-wide mb-3">
            About Zea
          </h2>
          <p className="font-sans text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Mengenal lebih dekat sosok kreatif di balik mahakarya visual dan solusi digital premium Zeas Creative Corner.
          </p>
          <div className="w-12 h-[2px] bg-gradient-to-r from-fuchsia-brand via-pink-400 to-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Premium Portrait Photo Frame with Interactive Parallax */}
          <div 
            className="lg:col-span-5 flex justify-center items-center relative select-none"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Ornaments with relative motion */}
            <motion.div 
              style={{ x: ornamentX1, y: ornamentY1 }}
              className="absolute w-72 h-72 xs:w-80 xs:h-80 lg:w-[400px] lg:h-[400px] rounded-full border border-fuchsia-brand/10 pointer-events-none z-0"
            />
            <motion.div 
              style={{ x: ornamentX2, y: ornamentY2 }}
              className="absolute w-64 h-64 xs:w-72 xs:h-72 lg:w-[350px] lg:h-[350px] rounded-full border border-amber-500/10 pointer-events-none z-0 rotate-45"
            />
            
            {/* Decorative Gold luxury rings */}
            <div className="absolute top-[5%] left-[5%] w-10 h-10 border-t border-l border-[#D4AF37]/35 rounded-tl-xl pointer-events-none hidden lg:block" />
            <div className="absolute bottom-[5%] right-[5%] w-10 h-10 border-b border-r border-[#D4AF37]/35 rounded-br-xl pointer-events-none hidden lg:block" />
            <div className="absolute w-full h-full inset-0 pointer-events-none flex items-center justify-center">
              {/* Soft Gradient glow */}
              <div className="w-[80%] h-[80%] rounded-[50px] bg-gradient-to-tr from-fuchsia-brand/10 via-[#FFF4F2]/50 to-[#D4AF37]/10 blur-xl opacity-70" />
            </div>

            {/* Main Interactive Interactive 3D Card */}
            <motion.div
              style={{ 
                rotateX: rotateX, 
                rotateY: rotateY,
                transformStyle: "preserve-3d" 
              }}
              className="relative z-10 w-full max-w-[290px] xs:max-w-[340px] aspect-[2/3] p-1 bg-gradient-to-tr from-[#D4AF37]/30 via-pink-400/20 to-fuchsia-brand/40 rounded-[40px_100px_40px_100px] shadow-2xl transition-shadow duration-500 hover:shadow-fuchsia-brand/10 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Glassmorphic Backing Layer */}
              <div className="absolute inset-[3px] bg-white/70 backdrop-blur-md rounded-[38px_98px_38px_98px] overflow-hidden flex items-center justify-center">
                
                {/* Embedded luxury artistic background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F2]/90 via-[#FCF2F6]/95 to-[#FBF6ED]/95 pointer-events-none" />
                
                {/* Thin Rose Gold grid & abstract curves in bg */}
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C2185B 1px, transparent 0)`, backgroundSize: '16px 16px' }} />
                
                {/* Abstract gold and pink circles in card background */}
                <div className="absolute -top-[10%] -left-[10%] w-[150px] h-[150px] bg-fuchsia-brand/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[150px] h-[150px] bg-amber-500/20 rounded-full blur-2xl" />

                {/* Portrait Image Container */}
                <div 
                  className="w-[93%] h-[95%] rounded-[34px_94px_34px_94px] overflow-hidden relative shadow-inner flex items-center justify-center group"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <img
                    src={imgSrc}
                    onError={() => setImgSrc("/src/assets/images/zea_portrait_1783142222866.jpg")}
                    alt="Zea Portrait - Founder of Zeas Creative Corner"
                    className="w-full h-full object-cover transform scale-[1.03] transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:rotate-[0.5deg] contrast-[1.03] saturate-[1.04]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Color grading overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-brand/15 via-transparent to-amber-500/5 mix-blend-color pointer-events-none" />
                  
                  {/* Subtle shine / glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: High End Editorial Biography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Title & Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Meet Zea
              </h3>
              <div className="flex items-center gap-2.5 mt-2">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-fuchsia-brand uppercase">
                  Founder of Zeas Creative Corner
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="font-mono text-[10px] text-slate-400">EST. 2026</span>
              </div>
            </motion.div>

            {/* Editorial Bio Paragraphs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-medium"
            >
              <p>
                Halo, aku <span className="font-semibold text-fuchsia-brand">Zea</span>.
              </p>
              <p>
                Pendiri Zeas Creative Corner, sebuah studio kreatif digital yang berfokus pada <span className="text-slate-950 font-semibold">Website</span>, <span className="text-slate-950 font-semibold">Landing Page</span>, <span className="text-slate-950 font-semibold">Undangan Digital</span>, <span className="text-slate-950 font-semibold">Desain Lynk.id</span>, <span className="text-slate-950 font-semibold">Video Promosi AI</span>, dan <span className="text-slate-950 font-semibold">Produk Digital</span>.
              </p>
              <p>
                Aku percaya bahwa setiap bisnis layak memiliki tampilan digital yang elegan, profesional, dan mampu meninggalkan kesan pertama yang kuat pada audiensnya. Tampilan visual yang menawan bukan hanya sekadar ornamen estetika, melainkan pondasi dari nilai kepercayaan brand.
              </p>
              <p>
                Setiap project dikerjakan dengan perhatian penuh pada detail, kepekaan estetika klasik, dan optimasi pengalaman pengguna agar tidak hanya terlihat indah secara visual, tetapi juga mampu memberikan dampak serta nilai nyata bagi pertumbuhan bisnis klien kami.
              </p>
            </motion.div>

            {/* Luxury Quote Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="my-7 p-5 bg-[#FFFBF9] border border-[#D4AF37]/25 rounded-2xl relative shadow-sm"
            >
              <Quote className="absolute -top-3.5 -left-1.5 w-7 h-7 text-fuchsia-brand/15 transform -rotate-12" />
              <p className="font-serif italic text-sm md:text-base text-slate-800 leading-relaxed font-medium">
                "Every Brand Has A Story. Let Me Help You Tell It Beautifully."
              </p>
            </motion.div>

            {/* Expert Skill Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
            >
              {[
                "Website Designer",
                "Landing Page Creator",
                "AI Content Creator",
                "Digital Product Designer"
              ].map((badge, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-white border border-silver-brand/35 rounded-xl hover:border-fuchsia-brand/30 hover:bg-cream/15 transition-all duration-300 group shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-fuchsia-brand/5 group-hover:bg-fuchsia-brand/10 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Check className="w-3.5 h-3.5 text-fuchsia-brand" strokeWidth={3} />
                  </div>
                  <span className="font-sans text-xs text-slate-800 font-bold tracking-wide">
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
