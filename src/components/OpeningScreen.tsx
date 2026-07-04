import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

interface OpeningScreenProps {
  key?: string;
  onEnter: () => void;
}

export default function OpeningScreen({ onEnter }: OpeningScreenProps) {
  const [isEntering, setIsEntering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const taglines = [
    "Crafting Elegant Digital Experiences",
    "Websites That Build Trust",
    "Luxury Digital Studio",
    "Premium Branding",
    "Elegant Web Experience",
    "AI Creative Solutions"
  ];

  // 1. Tagline changer interval (every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 2. Parallax mouse tracker (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Get normal offset from center [-0.5, 0.5]
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. Audio Chime Synthesis using Web Audio API
  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Rich ambient Major chord (bell resonance feel)
      const freqs = [196.00, 261.63, 329.63, 392.00, 523.25, 659.25]; // G, C, E, G, C, E
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0, now);
        // Staggered attack for strum/harp chord feeling
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05 + idx * 0.02);
        // Long smooth natural decay
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + idx * 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.2);
      });

      // Low-to-high frequency sweep (Whoosh sound)
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 0.45);
      filter.frequency.exponentialRampToValueAtTime(80, now + 1.3);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.linearRampToValueAtTime(0.04, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 1.5);
    } catch (e) {
      console.warn("Web Audio Chime failed to play", e);
    }
  };

  // 4. Handle ENTER click with transition triggers
  const handleEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple calculation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Play luxurious chime sound
    playChime();

    // Trigger exit sequences
    setIsEntering(true);

    // Enter callback after 1.1s
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  // Clean ripples
  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  // Precalculated floating particles - Champagne & Rose Gold themed
  const particles = [
    { size: 6, x: "12%", y: "20%", duration: 25, delay: 0, color: "bg-[#D4AF37]" },
    { size: 10, x: "85%", y: "15%", duration: 32, delay: 2, color: "bg-[#B76E79]" },
    { size: 8, x: "78%", y: "75%", duration: 28, delay: 1, color: "bg-[#E0A96D]" },
    { size: 12, x: "15%", y: "82%", duration: 35, delay: 3, color: "bg-[#C2185B]" },
    { size: 9, x: "45%", y: "10%", duration: 30, delay: 4, color: "bg-[#D4AF37]" },
    { size: 5, x: "90%", y: "50%", duration: 22, delay: 1.5, color: "bg-[#B76E79]" },
    { size: 9, x: "5%", y: "55%", duration: 29, delay: 2.5, color: "bg-[#E0A96D]" },
  ];

  return (
    <motion.div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9F2] via-[#FAF3E6] to-[#F3E7CD] w-screen h-[100dvh] overflow-hidden select-none transition-colors duration-1000 ${
        isEntering ? "bg-gradient-to-br from-[#C2185B] via-[#A01048] to-[#880E4F]" : ""
      }`}
    >
      {/* 1. LUXURIOUS BOKEH LIGHTS & ROSE GOLD LIGHTING */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply z-0">
        {/* Soft Rose Gold lighting backdrop */}
        <motion.div
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: mousePosition.x * -15, y: mousePosition.y * -15 }}
          className="absolute -top-[15%] -left-[15%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#B76E79]/20 via-[#E0A96D]/15 to-transparent blur-[120px]"
        />
        {/* Soft Champagne lighting backdrop */}
        <motion.div
          animate={{
            x: [0, -50, 30, -10, 0],
            y: [0, 40, -40, 30, 0],
            scale: [1, 0.9, 1.15, 1, 1],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: mousePosition.x * -20, y: mousePosition.y * -20 }}
          className="absolute -bottom-[15%] -right-[15%] w-[90%] h-[90%] rounded-full bg-gradient-to-bl from-[#D4AF37]/15 via-[#FFF8F2]/25 to-transparent blur-[140px]"
        />
        {/* Gentle Rose Gold Light Orb */}
        <motion.div
          animate={{
            x: [0, 25, -25, 15, 0],
            y: [0, 25, 25, -25, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: mousePosition.x * -10, y: mousePosition.y * -10 }}
          className="absolute top-[30%] left-[25%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-[#FAD7E8]/25 via-[#FAF3E6]/30 to-[#B76E79]/10 blur-[100px]"
        />
      </div>

      {/* 2. PREMIUM SLOW-DRIFTING BOKEH LIGHT BULBS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Bokeh Light 1 */}
        <motion.div
          animate={{
            y: [0, -25, 20, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.15, 0.3, 0.2, 0.15]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[20%] w-[180px] h-[180px] rounded-full bg-[#E0A96D]/15 blur-[50px]"
        />
        {/* Bokeh Light 2 */}
        <motion.div
          animate={{
            y: [0, 30, -25, 0],
            x: [0, -20, 20, 0],
            scale: [0.9, 1.1, 0.95, 0.9],
            opacity: [0.1, 0.25, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[15%] w-[210px] h-[210px] rounded-full bg-[#B76E79]/15 blur-[65px]"
        />
        {/* Bokeh Light 3 */}
        <motion.div
          animate={{
            y: [0, -15, 25, 0],
            x: [0, -15, 15, 0],
            scale: [0.95, 1.05, 0.9, 0.95],
            opacity: [0.08, 0.2, 0.12, 0.08]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[45%] right-[25%] w-[140px] h-[140px] rounded-full bg-[#D4AF37]/10 blur-[45px]"
        />
      </div>

      {/* 3. SLOW FLOATING PARTICLES (7% opacity for luxury subtlety) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute rounded-full blur-[1px] opacity-[0.08] ${p.color}`}
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
            }}
            animate={{
              y: [0, -40, 20, -15, 0],
              x: [0, 25, -25, 12, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* 4. LUXURY GOLDEN SIDE BORDERS (Thin, low opacity) */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none z-10" />
      <div className="absolute right-4 md:right-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none z-10" />

      {/* 5. SOUND CONTROLLER (Premium mute button top right) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-12 z-40">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="interactive-cursor flex items-center justify-center p-2.5 rounded-full bg-white/50 backdrop-blur-md border border-[#D4AF37]/30 text-slate-800 hover:text-fuchsia-brand hover:border-[#D4AF37] shadow-sm transition-all duration-300"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex flex-col items-center justify-center z-20 px-6 text-center max-w-xl w-full h-full gap-8 xs:gap-10 lg:gap-12">
        
        {/* LOGO EMBLEM AREA WITH PARALLAX & WARM GLOW (Logo increased by 30%) */}
        <div className="relative flex items-center justify-center">
          
          {/* Warm background glow behind logo */}
          <div className="absolute w-[140%] h-[140%] rounded-full bg-gradient-to-tr from-[#D4AF37]/20 via-[#B76E79]/15 to-transparent blur-[50px] pointer-events-none" />

          <motion.div
            style={{
              x: mousePosition.x * 15,
              y: mousePosition.y * 15,
            }}
            animate={isEntering ? { scale: 3.8, rotate: 15, opacity: 0 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-64 h-64 xs:w-[280px] xs:h-[280px] md:w-[330px] md:h-[330px] lg:w-[350px] lg:h-[350px] flex items-center justify-center"
          >
            {/* A. CLOCKWISE CIRCLE 1 WITH GOLD DOT */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[86%] h-[86%] rounded-full border border-[#D4AF37]/25"
            >
              {/* Moving Gold dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]" />
            </motion.div>

            {/* B. COUNTER-CLOCKWISE CIRCLE 2 WITH ROSE GOLD DOT */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute w-[76%] h-[76%] rounded-full border border-fuchsia-brand/20"
            >
              {/* Moving Rose Gold dot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-brand/70 shadow-[0_0_10px_rgba(194,24,91,0.6)]" />
            </motion.div>

            {/* C. ROTATING CIRCULAR TEXT */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  {/* Clean path with R=90 */}
                  <path
                    id="welcomeEmblemPath"
                    d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
                    fill="none"
                  />
                </defs>
                <text
                  className="fill-fuchsia-brand/90 font-serif font-bold tracking-widest uppercase"
                  style={{
                    fontSize: "6.8px",
                    letterSpacing: "0.26em",
                  }}
                >
                  <textPath href="#welcomeEmblemPath" startOffset="0%" textLength="555" lengthAdjust="spacing">
                    ✦ ZEAS CREATIVE CORNER ✦ PREMIUM DIGITAL STUDIO ✦ LUXURY WEB DESIGN ✦ LANDING PAGE ✦ AI CREATIVE ✦ DIGITAL PRODUCTS ✦&nbsp;
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* D. CENTER "Z" LOGO (WITH GLASS REFLECTION & SOFT GLOW) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
              className="relative w-20 h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E6] shadow-[0_4px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_45px_rgba(194,24,91,0.35)] border border-[#D4AF37]/45 flex items-center justify-center z-10 backdrop-blur-md transition-all duration-500 hover:scale-105 overflow-hidden group"
            >
              {/* Premium Glass Reflection Shine sweep loop */}
              <motion.div
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                animate={{
                  left: ["-30%", "130%"]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut"
                }}
              />

              <span className="relative z-10 font-serif text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-black text-[#C2185B] tracking-wider pl-1 select-none drop-shadow-sm">
                Z
              </span>
            </motion.div>

          </motion.div>
        </div>

        {/* TYPOGRAPHY BLOCK WITH LUXURIOUS SCROLL SPACING */}
        <div className="flex flex-col items-center gap-3 xs:gap-4 lg:gap-5 max-w-md relative z-10">
          
          {/* WELCOME TO - COMFORTABLE TRACKING */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isEntering ? { opacity: 0, y: -15 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#C2185B] uppercase font-extrabold"
          >
            WELCOME TO
          </motion.p>

          {/* BRAND NAME - LUXURY PROPORTIONAL FONT SIZE */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={isEntering ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-widest text-[#C2185B] leading-tight select-all px-2 text-center"
          >
            ZEAS CREATIVE CORNER
          </motion.h1>

          {/* DYNAMIC SWAPPING TAGLINES */}
          <div className="h-8 md:h-10 flex items-center justify-center mt-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="font-serif italic text-xs xs:text-sm md:text-base text-slate-700 tracking-wide font-medium text-center"
              >
                "{taglines[taglineIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* INTERACTIVE ENTER BUTTON WITH SHIMMER SWEEP EVERY FEW SECONDS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isEntering ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-4 xs:mt-6 z-30"
        >
          <button
            onClick={handleEnterClick}
            className="group relative interactive-cursor overflow-hidden px-10 py-4 xs:px-12 xs:py-4.5 bg-[#C2185B] text-[#FFF8F2] font-sans text-[11px] xs:text-xs tracking-[0.3em] font-extrabold uppercase rounded-none border border-[#C2185B] hover:border-[#D4AF37] transition-all duration-500 shadow-[0_4px_20px_rgba(194,24,91,0.25)] flex items-center gap-3.5"
          >
            {/* HOVER GLOW & GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C2185B] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

            {/* Shimmer sweep animation loop every few seconds */}
            <motion.div
              className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 z-0"
              animate={{
                left: ["-15%", "115%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut"
              }}
            />

            {/* Ripple renders */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute bg-white/30 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 140,
                  height: 140,
                }}
                onAnimationEnd={() => removeRipple(ripple.id)}
              />
            ))}

            <span className="relative z-10 flex items-center gap-2">
              ENTER STUDIO
              <motion.span 
                className="inline-block transition-transform duration-300 group-hover:translate-x-2 relative top-[-0.5px]"
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>

      </div>

      {/* FOOTER / COPYRIGHT - DISCREET SIZE */}
      <motion.div 
        animate={isEntering ? { opacity: 0 } : { opacity: 1 }}
        className="absolute bottom-6 font-mono text-[8px] tracking-[0.25em] text-[#C8CCD4] uppercase z-20"
      >
        © 2026 ZEAS CREATIVE CORNER • ALL RIGHTS RESERVED
      </motion.div>
    </motion.div>
  );
}
