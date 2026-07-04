import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Play, Pause, ChevronUp, ChevronDown, Disc } from "lucide-react";

export default function SpotifyPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Spotify Playlist Embed URL derived from:
  // https://open.spotify.com/playlist/1ZQxZ7AEe9uf0sNOAGwwGs?si=xAFzFmevSN-yE0pQV1rdlg&pi=T3LDsjTkSU6f
  const playlistId = "1ZQxZ7AEe9uf0sNOAGwwGs";
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  // Pre-load/mount when the user first expands the player
  useEffect(() => {
    if (isExpanded) {
      setHasOpenedOnce(true);
    }
  }, [isExpanded]);

  // Custom wave bar animation properties
  const waveBars = [
    { delay: 0, duration: 0.8 },
    { delay: 0.15, duration: 0.9 },
    { delay: 0.3, duration: 0.7 },
    { delay: 0.1, duration: 1.0 },
    { delay: 0.2, duration: 0.8 },
  ];

  return (
    <div id="floating-spotify-player" className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end">
      <AnimatePresence mode="wait">
        {/* 1. COLLAPSED FLOATING TRIGGER BUTTON */}
        {!isExpanded && (
          <motion.button
            key="collapsed-pill"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => setIsExpanded(true)}
            className="interactive-cursor flex items-center gap-3.5 px-5 py-3 bg-[#FFF8F2]/90 backdrop-blur-md border border-[#D4AF37]/35 hover:border-[#C2185B]/40 shadow-[0_6px_24px_rgba(194,24,91,0.12)] rounded-full text-slate-800 transition-colors duration-300 group"
          >
            {/* Spinning Disc or Glowing Dot */}
            <div className="relative flex items-center justify-center">
              {isPlaying ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-7 h-7 rounded-full bg-[#C2185B] flex items-center justify-center text-[#FFF8F2] shadow-md"
                >
                  <Disc className="w-4 h-4" />
                </motion.div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#C2185B]">
                  <span className="text-sm">🎵</span>
                </div>
              )}
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#FFF8F2]" />
              )}
            </div>

            {/* Title & Status */}
            <div className="flex flex-col text-left pr-1">
              <span className="font-serif text-[11px] tracking-[0.1em] font-extrabold uppercase text-[#C2185B]">
                Relaxing Music
              </span>
              <span className="font-sans text-[9px] tracking-wide text-slate-500 font-semibold mt-0.5">
                {isPlaying ? "Playing • Click to Open" : "Idle • Click to Open"}
              </span>
            </div>

            {/* Expand Chevron */}
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-[#C2185B] transition-colors duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. EXPANDED PLAYER CARD (Always mounted in background once opened to keep music playing!) */}
      <div
        className={`transition-all duration-500 ease-out origin-bottom-right mt-2 ${
          isExpanded
            ? "scale-100 opacity-100 pointer-events-auto transform translate-y-0"
            : "scale-75 opacity-0 pointer-events-none absolute bottom-0 right-0 transform translate-y-4"
        }`}
      >
        <div className="w-[310px] sm:w-[350px] bg-[#FFF8F2]/95 backdrop-blur-lg border border-[#D4AF37]/35 shadow-[0_12px_40px_rgba(194,24,91,0.2)] rounded-2xl overflow-hidden">
          {/* Header / Title bar */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#FFF8F2] to-[#FAD7E8]/40 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎵</span>
              <span className="font-serif text-xs font-bold tracking-[0.1em] text-[#C2185B] uppercase">
                Relaxing Music
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="interactive-cursor p-1.5 hover:bg-black/5 rounded-full transition-colors"
              title="Collapse"
            >
              <ChevronDown className="w-4.5 h-4.5 text-slate-500" />
            </button>
          </div>

          {/* Custom Interactive Player Controller Panel */}
          <div className="px-4 py-3.5 bg-white/60 border-b border-fuchsia-brand/5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="font-serif italic text-[11px] text-slate-800 font-bold">
                  Spotify Premium Playlist
                </span>
                <p className="font-sans text-[9px] text-slate-400 tracking-wider mt-0.5">
                  Ambient background theme music
                </p>
              </div>

              {/* Simulated Custom Wave Animation */}
              <div className="h-6 flex items-end gap-1 px-1">
                {waveBars.map((bar, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] bg-[#C2185B] rounded-full"
                    animate={
                      isPlaying
                        ? { height: [3, 18, 5, 14, 3] }
                        : { height: 3 }
                    }
                    transition={{
                      duration: bar.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: bar.delay,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons: Play/Pause/Status */}
            <div className="flex items-center gap-3 mt-1.5">
              <button
                onClick={() => setIsPlaying(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[10px] font-sans font-extrabold tracking-widest uppercase rounded-none transition-all duration-300 border ${
                  isPlaying
                    ? "bg-[#C2185B] text-white border-[#C2185B] shadow-sm shadow-[#C2185B]/30"
                    : "bg-transparent text-[#C2185B] border-[#C2185B] hover:bg-[#C2185B]/5"
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                PLAY STATE
              </button>
              <button
                onClick={() => setIsPlaying(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[10px] font-sans font-extrabold tracking-widest uppercase rounded-none transition-all duration-300 border ${
                  !isPlaying
                    ? "bg-slate-700 text-white border-slate-700 shadow-sm shadow-slate-700/20"
                    : "bg-transparent text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
              >
                <Pause className="w-3 h-3" />
                PAUSE STATE
              </button>
            </div>

            {/* Status Hint */}
            <span className="font-sans text-[8.5px] text-center text-slate-500 italic">
              Note: Click play on the Spotify Widget below to start the audio
            </span>
          </div>

          {/* Embedded Spotify Iframe Player */}
          {hasOpenedOnce && (
            <div className="p-3 bg-white/40">
              <iframe
                src={embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl shadow-sm border border-slate-200/50"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
