import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HeroBadges() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const badges = [
    "Luxury Digital Studio",
    "Responsive Design",
    "Premium UI/UX",
    "Fast Response",
    "Modern Design"
  ];

  // Double the badges array to make infinite scrolling marquee seamless
  const marqueeBadges = [...badges, ...badges, ...badges];

  useEffect(() => {
    // Check if we are on mobile/tablet screens
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !isMobile) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let isInteracting = false;
    let interactionTimer: NodeJS.Timeout;

    const scrollSpeed = 35; // Pixels per second for ultra-smooth movement

    const update = (time: number) => {
      if (!isInteracting && slider) {
        const delta = (time - lastTime) / 1000;
        slider.scrollLeft += scrollSpeed * delta;

        // Reset scroll position seamlessly once we've scrolled past one full set of badges
        // To find the size of one full set of badges, we can use 1/3 of scrollWidth (since we have 3 sets)
        const threshold = slider.scrollWidth / 3;
        if (slider.scrollLeft >= threshold) {
          slider.scrollLeft = slider.scrollLeft - threshold;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(update);
    };

    const handleStartInteraction = () => {
      isInteracting = true;
      clearTimeout(interactionTimer);
    };

    const handleEndInteraction = () => {
      // Resume scrolling 1.5 seconds after user stops interacting
      clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => {
        isInteracting = false;
        lastTime = performance.now(); // reset time to prevent massive jump
      }, 1500);
    };

    slider.addEventListener("touchstart", handleStartInteraction, { passive: true });
    slider.addEventListener("touchend", handleEndInteraction, { passive: true });
    slider.addEventListener("mousedown", handleStartInteraction);
    slider.addEventListener("mouseup", handleEndInteraction);
    slider.addEventListener("mouseleave", handleEndInteraction);

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(interactionTimer);
      if (slider) {
        slider.removeEventListener("touchstart", handleStartInteraction);
        slider.removeEventListener("touchend", handleEndInteraction);
        slider.removeEventListener("mousedown", handleStartInteraction);
        slider.removeEventListener("mouseup", handleEndInteraction);
        slider.removeEventListener("mouseleave", handleEndInteraction);
      }
    };
  }, [isMobile]);

  const badgeBaseStyle = "interactive-cursor inline-flex items-center gap-2 h-[34px] px-[14px] bg-white border border-silver-brand/35 text-[12.5px] font-mono tracking-wide text-slate-700 font-bold uppercase transition-all duration-300 select-none whitespace-nowrap text-ellipsis hover:bg-[#C2185B] hover:text-white hover:border-[#D4AF37] hover:shadow-[0_4px_12px_rgba(194,24,91,0.15)] shrink-0";

  return (
    <div className="w-full relative z-20 mb-6 flex justify-center overflow-hidden">
      
      {/* A. DESKTOP LAYOUT (Full grid static list, no scrolling) */}
      <div className="hidden lg:flex flex-wrap gap-2.5 justify-center">
        {badges.map((badge, idx) => (
          <motion.span
            key={`desktop-badge-${idx}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={badgeBaseStyle}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2185B] group-hover:bg-white animate-pulse" />
            {badge}
          </motion.span>
        ))}
      </div>

      {/* B. MOBILE LAYOUT (Smooth Auto-Marquee Horizontal Carousel with Touch/Swipe) */}
      <div 
        ref={sliderRef}
        className="lg:hidden w-full overflow-x-auto scrollbar-none py-2 flex gap-2.5 px-4 select-none cursor-grab active:cursor-grabbing snap-none"
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none"
        }}
      >
        {marqueeBadges.map((badge, idx) => (
          <motion.span
            key={`mobile-badge-${idx}`}
            whileTap={{ scale: 0.97 }}
            className={badgeBaseStyle}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2185B] animate-pulse" />
            {badge}
          </motion.span>
        ))}
      </div>

    </div>
  );
}
