import { motion } from "motion/react";

interface OpeningScreenProps {
  key?: string;
  onEnter: () => void;
}

export default function OpeningScreen({ onEnter }: OpeningScreenProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream w-screen h-[100dvh] overflow-hidden marble-bg select-none"
    >
      {/* Delicate Satin Fabric Wave Backdrop (Top-Right Corner) */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 pointer-events-none opacity-90 z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="satinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#AD1457" />
              <stop offset="40%" stopColor="#C2185B" />
              <stop offset="70%" stopColor="#D81B60" />
              <stop offset="100%" stopColor="#FAD7E8" />
            </linearGradient>
            <linearGradient id="satinShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#880E4F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C2185B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 30,0 C 50,20 60,10 80,40 C 90,55 85,75 100,85 L 100,0 Z" fill="url(#satinGrad)" />
          <path d="M 45,0 C 60,15 70,5 85,35 C 92,48 90,65 100,72 L 100,0 Z" fill="url(#satinShadow)" opacity="0.4" />
          <path d="M 60,0 C 72,12 80,5 92,30 C 96,40 95,55 100,60 L 100,0 Z" fill="url(#satinGrad)" opacity="0.6" />
        </svg>
      </div>

      {/* Decorative Satin Fabric Wave Backdrop (Bottom-Left Corner) */}
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-90 z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M 0,70 C 20,50 10,60 40,80 C 55,90 75,85 85,100 L 0,100 Z" fill="url(#satinGrad)" />
          <path d="M 0,80 C 15,65 5,75 35,90 C 45,95 60,92 70,100 L 0,100 Z" fill="url(#satinShadow)" opacity="0.3" />
        </svg>
      </div>

      {/* Thin Premium Borders */}
      <div className="absolute inset-4 xs:inset-8 border border-silver-brand/25 pointer-events-none z-0" />
      <div className="absolute inset-6 xs:inset-10 border border-silver-brand/10 pointer-events-none z-0" />

      {/* Main Container - Centered Vertically and Horizontally */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center z-20 px-6 text-center max-w-xl w-full h-full gap-5 xs:gap-6 lg:gap-8"
      >
        {/* 1. Emblem Logo "Z" with Rotating Circular Text */}
        <motion.div
          variants={itemVariants}
          className="relative w-52 h-52 xs:w-64 xs:h-64 md:w-72 md:h-72 flex items-center justify-center"
        >
          {/* Thin silver outer details */}
          <div className="absolute inset-0 rounded-full border border-silver-brand/20" />
          <div className="absolute inset-3 rounded-full border border-silver-brand/5" />

          {/* 2. Rotating Text - 360 degrees slow rotation */}
          <div className="absolute inset-0 animate-slow-rotate flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <path
                  id="emblemPath"
                  d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                  fill="none"
                />
              </defs>
              <text 
                className="fill-fuchsia-brand/85 font-serif font-normal uppercase"
                style={{ 
                  fontSize: "14.5px", 
                  letterSpacing: "0.22em"
                }}
              >
                <textPath href="#emblemPath" startOffset="0%" textLength="502" lengthAdjust="spacing">
                  ✦ ZEAS CREATIVE CORNER ✦ PREMIUM DIGITAL STUDIO ✦ ZEAS CREATIVE CORNER ✦ PREMIUM DIGITAL STUDIO ✦&nbsp;
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center "Z" Logo */}
          <div className="w-20 h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 rounded-full bg-cream shadow-md border border-silver-brand/35 flex items-center justify-center z-10 backdrop-blur-sm bg-opacity-90">
            <span className="font-serif text-4xl xs:text-5xl md:text-6xl font-extrabold text-fuchsia-brand tracking-widest pl-2">
              Z
            </span>
          </div>
        </motion.div>

        {/* Text and Button stack */}
        <div className="flex flex-col items-center gap-2 xs:gap-3 lg:gap-4 max-w-md">
          {/* 3. WELCOME TO */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[10px] xs:text-xs md:text-sm tracking-[0.4em] text-fuchsia-brand uppercase font-semibold"
          >
            WELCOME TO
          </motion.p>

          {/* 4. ZEAS CREATIVE CORNER */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-2xl xs:text-3xl md:text-5xl font-bold tracking-wider text-fuchsia-brand leading-tight"
          >
            ZEAS CREATIVE CORNER
          </motion.h1>

          {/* 5. Tagline: "Crafting Elegant Digital Experiences" */}
          <motion.p
            variants={itemVariants}
            className="font-serif italic text-sm xs:text-base md:text-lg text-slate-700 tracking-wide font-light"
          >
            "Crafting Elegant Digital Experiences"
          </motion.p>
        </div>

        {/* 6. Button: ENTER STUDIO */}
        <motion.div variants={itemVariants} className="mt-2 xs:mt-4">
          <button
            onClick={onEnter}
            className="interactive-cursor px-8 py-3 xs:px-10 xs:py-4 bg-fuchsia-brand text-cream font-sans text-[10px] xs:text-xs tracking-[0.3em] font-semibold uppercase rounded-none border border-fuchsia-brand hover:bg-transparent hover:text-fuchsia-brand transition-all duration-500 shadow-md flex items-center gap-3 backdrop-blur-sm"
          >
            ENTER STUDIO
            <span className="text-sm xs:text-base">→</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Footer/Copyright */}
      <div className="absolute bottom-4 font-mono text-[8px] xs:text-[9px] tracking-[0.2em] text-silver-brand/80 uppercase z-20">
        © 2026 ZEAS CREATIVE CORNER • ALL RIGHTS RESERVED
      </div>
    </motion.div>
  );
}
