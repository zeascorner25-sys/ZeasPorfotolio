import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Sparkles } from "lucide-react";

const GREETINGS = {
  pagi: [
    "Selamat Pagi, Semoga harimu penuh inspirasi.",
    "Selamat Pagi, Mari bangun kehadiran digital impian Anda hari ini.",
    "Selamat Pagi, Selamat berkarya dan hadirkan keindahan digital premium."
  ],
  siang: [
    "Selamat Siang, Kreativitas tanpa batas menanti langkah Anda selanjutnya.",
    "Selamat Siang, Menghadirkan visual digital mewah berkelas dunia.",
    "Selamat Siang, Optimalkan potensi bisnis Anda dengan platform elegan."
  ],
  sore: [
    "Selamat Sore, Sempurnakan hari dengan sentuhan estetika berkelas.",
    "Selamat Sore, Setiap mahakarya digital dirancang dari dedikasi penuh.",
    "Selamat Sore, Menghubungkan ide hebat Anda dengan desain interaktif premium."
  ],
  malam: [
    "Selamat Malam, Merajut ide cemerlang menjadi mahakarya digital premium.",
    "Selamat Malam, Sentuhan magis nan anggun untuk identitas online Anda.",
    "Selamat Malam, Estetika malam berpadu kesempurnaan desain digital."
  ]
};

export default function TopInfoBar() {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [greeting, setGreeting] = useState("");
  const [greetingIndex, setGreetingIndex] = useState(0);

  // Time-of-day category hook
  const getGreetingCategory = (): "pagi" | "siang" | "sore" | "malam" => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "pagi";
    if (hour >= 12 && hour < 15) return "siang";
    if (hour >= 15 && hour < 18.5) return "sore";
    return "malam";
  };

  // Select a random greeting on mount & change it every 12-15 seconds smoothly
  useEffect(() => {
    const category = getGreetingCategory();
    const list = GREETINGS[category];
    const initialIndex = Math.floor(Math.random() * list.length);
    setGreeting(list[initialIndex]);
    setGreetingIndex(initialIndex);

    const interval = setInterval(() => {
      const currentCategory = getGreetingCategory();
      const currentList = GREETINGS[currentCategory];
      
      // Select next greeting index to avoid getting the exact same back-to-back if possible
      setGreetingIndex((prevIndex) => {
        let nextIndex = (prevIndex + 1) % currentList.length;
        setGreeting(currentList[nextIndex]);
        return nextIndex;
      });
    }, 13000); // 13 seconds change interval

    return () => clearInterval(interval);
  }, []);

  // Update WIB Clock realtime every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate UTC+7 (WIB) time offset
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibDate = new Date(utcTime + (3600000 * 7));

      // Indonesian Day & Month names
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      const dayName = days[wibDate.getDay()];
      const dateNum = String(wibDate.getDate()).padStart(2, "0");
      const monthName = months[wibDate.getMonth()];
      const yearNum = wibDate.getFullYear();

      const hours = String(wibDate.getHours()).padStart(2, "0");
      const minutes = String(wibDate.getMinutes()).padStart(2, "0");
      const seconds = String(wibDate.getSeconds()).padStart(2, "0");

      setDateStr(`${dayName}, ${dateNum} ${monthName} ${yearNum}`);
      setTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[36px] bg-[#FFF8F2]/92 backdrop-blur-[12px] border-b border-silver-brand/25 flex items-center justify-center fixed top-0 left-0 z-[9999] shadow-[0_2px_12px_rgba(194,24,91,0.03)] overflow-hidden">
      
      {/* Desktop View: Perfectly spaced, elegant row */}
      <div className="hidden lg:flex w-full max-w-7xl mx-auto px-8 items-center justify-between whitespace-nowrap">
        {/* Left Side: Greeting */}
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-brand/60 shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span
              key={greeting}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="font-serif italic text-xs text-slate-600/90 font-medium tracking-wide"
            >
              {greeting}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right Side: Realtime WIB Clock & Date */}
        <div className="flex items-center gap-3 shrink-0">
          <Clock className="w-3.5 h-3.5 text-fuchsia-brand/60" />
          <span className="font-sans text-xs text-slate-500 tracking-wider">
            {dateStr || "Sabtu, 04 Juli 2026"}
          </span>
          <span className="text-silver-brand/50 font-sans text-xs">•</span>
          <span className="font-mono text-xs font-semibold text-fuchsia-brand tracking-widest">
            {timeStr || "11:15:53"} WIB
          </span>
        </div>
      </div>

      {/* Mobile/Tablet View: Seamless Luxury Marquee */}
      <div className="lg:hidden w-full h-full flex items-center overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center py-1">
          {/* First loop instance */}
          <div className="flex items-center gap-6 px-4">
            <span className="flex items-center gap-2 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-brand/65 shrink-0 animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span 
                  key={greeting}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-serif italic text-[11px] text-slate-600 font-medium"
                >
                  {greeting}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-silver-brand/50 font-sans text-xs">•</span>
            <span className="flex items-center gap-1.5 shrink-0 font-sans text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-fuchsia-brand/60 shrink-0" />
              <span>{dateStr || "Sabtu, 04 Juli 2026"}</span>
            </span>
            <span className="text-silver-brand/50 font-sans text-xs">•</span>
            <span className="font-mono text-[11px] font-bold text-fuchsia-brand tracking-widest shrink-0">
              {timeStr || "11:15:53"} WIB
            </span>
            <span className="text-silver-brand/50 font-sans text-xs">•</span>
          </div>

          {/* Second loop instance for seamless transition */}
          <div className="flex items-center gap-6 px-4">
            <span className="flex items-center gap-2 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-brand/65 shrink-0 animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span 
                  key={greeting}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-serif italic text-[11px] text-slate-600 font-medium"
                >
                  {greeting}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-silver-brand/50 font-sans text-xs">•</span>
            <span className="flex items-center gap-1.5 shrink-0 font-sans text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-fuchsia-brand/60 shrink-0" />
              <span>{dateStr || "Sabtu, 04 Juli 2026"}</span>
            </span>
            <span className="text-silver-brand/50 font-sans text-xs">•</span>
            <span className="font-mono text-[11px] font-bold text-fuchsia-brand tracking-widest shrink-0">
              {timeStr || "11:15:53"} WIB
            </span>
            <span className="text-silver-brand/50 font-sans text-xs">•</span>
          </div>
        </div>
      </div>

    </div>
  );
}
