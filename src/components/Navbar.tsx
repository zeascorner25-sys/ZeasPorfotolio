import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  Briefcase, 
  User, 
  Star, 
  Tag, 
  Phone, 
  Menu, 
  X, 
  MessageSquare,
  Sparkles
} from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Realtime WIB Clock & Date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibDate = new Date(utcTime + (3600000 * 7));

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

  const navItems = [
    { id: "beranda", label: "Beranda", icon: <Home className="w-5 h-5 text-[#C2185B]" /> },
    { id: "karya-layanan", label: "Karya & Layanan", icon: <Briefcase className="w-5 h-5 text-[#C2185B]" /> },
    { id: "tentang", label: "Tentang", icon: <User className="w-5 h-5 text-[#C2185B]" /> },
    { id: "testimoni", label: "Testimoni", icon: <Star className="w-5 h-5 text-[#C2185B]" /> },
    { id: "harga", label: "Harga", icon: <Tag className="w-5 h-5 text-[#C2185B]" /> },
    { id: "kontak", label: "Kontak", icon: <Phone className="w-5 h-5 text-[#C2185B]" /> },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed top-[36px] inset-x-0 z-[9995] transition-all duration-300 ease-out h-[76px] flex items-center bg-[#FFF8F2]/90 backdrop-blur-[12px] border-b border-silver-brand/20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
          
          {/* Left Side: Logo & Real-time clock */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("beranda")}
              className="interactive-cursor flex items-center gap-3 text-left focus:outline-none"
            >
              {/* Spinning Emblem Mini Logo */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border border-[#C2185B]/20" />
                <div className="absolute inset-0 animate-slow-rotate border-t-2 border-[#C2185B] rounded-full" />
                <span className="font-serif text-lg font-bold text-[#C2185B]">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-widest text-[#C2185B] font-semibold block leading-none">
                  ZEAS
                </span>
                <span className="font-sans text-[8px] tracking-[0.2em] text-slate-500 uppercase block mt-1 leading-none">
                  CREATIVE CORNER
                </span>
                {/* Clock on MOBILE (placed exactly below ZEAS CREATIVE CORNER) */}
                <div className="flex lg:hidden flex-col text-[9.5px] text-[#C2185B]/80 font-mono tracking-tight mt-1 leading-none">
                  <div className="flex items-center gap-1 font-semibold">
                    <span>🕘</span>
                    <span>{timeStr || "00:00:00"} WIB</span>
                  </div>
                  <span className="text-[8px] text-slate-500/80 font-sans mt-0.5">• {dateStr}</span>
                </div>
              </div>
            </button>

            {/* Clock on DESKTOP (placed to the right of logo) */}
            <div className="hidden lg:flex items-center gap-2.5 pl-4 ml-4 border-l border-slate-300/40 text-left text-[12px] text-[#C2185B]/80 font-medium">
              <span className="text-sm shrink-0">🕘</span>
              <div className="flex flex-col leading-tight font-mono tracking-wide">
                <span className="font-bold text-[#C2185B]">{timeStr || "00:00:00"} WIB</span>
                <span className="text-[10px] text-slate-500 font-sans font-medium">• {dateStr}</span>
              </div>
            </div>
          </div>

          {/* Center: Navigation Links (DESKTOP ONLY) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`interactive-cursor px-3 py-1.5 font-sans text-xs tracking-wider uppercase transition-all duration-300 relative whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-[#C2185B] font-semibold"
                    : "text-slate-600 hover:text-[#C2185B]"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#C2185B]" />
                )}
              </button>
            ))}
          </div>

          {/* Right Side: CTA Button (DESKTOP ONLY) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick("kontak")}
              className="interactive-cursor px-5 py-2 bg-transparent text-[#C2185B] border border-[#C2185B]/40 hover:border-[#C2185B] hover:bg-[#C2185B] hover:text-[#FFF8F2] font-sans text-xs tracking-widest font-medium uppercase transition-all duration-300 rounded-none"
            >
              KONSULTASI
            </button>
          </div>

          {/* Hamburger Menu Trigger (MOBILE ONLY) */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="interactive-cursor p-2 -mr-2 text-slate-700 hover:text-[#C2185B] transition-colors focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-[9998] backdrop-blur-sm"
            />

            {/* Slide-out Menu Panel from Right */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[290px] max-w-full bg-[#FFF8F2]/95 backdrop-blur-md border-l border-slate-300/30 z-[9999] shadow-2xl flex flex-col p-6 font-sans justify-between overflow-y-auto"
            >
              {/* Header inside Panel */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C2185B] flex items-center justify-center text-[#FFF8F2] font-serif font-black text-sm shadow-inner">
                    Z
                  </div>
                  <span className="font-serif text-sm tracking-widest text-[#C2185B] font-bold">
                    ZEAS CORNER
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="interactive-cursor p-2 hover:bg-black/5 rounded-full transition-colors text-slate-500 hover:text-slate-800 focus:outline-none"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items (No Horizontal Scroll, beautifully accessible) */}
              <div className="flex-1 py-8 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`interactive-cursor w-full flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-[#C2185B]/10 text-[#C2185B] font-semibold"
                        : "text-slate-700 hover:bg-slate-100/50 hover:text-[#C2185B]"
                    }`}
                  >
                    <div className="p-1">
                      {item.icon}
                    </div>
                    <span className="text-[17px] tracking-wide font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Consultation via WhatsApp CTA Button */}
              <div className="pt-6 border-t border-slate-200/40 flex flex-col gap-3">
                <a
                  href="https://wa.me/62881080091195"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-cursor w-full bg-[#C2185B] hover:bg-[#A01048] text-[#FFF8F2] text-xs font-bold tracking-widest uppercase py-3.5 px-4 shadow-sm flex items-center justify-center gap-2 transition-all duration-300 border border-[#C2185B] rounded-none text-center"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  💬 Konsultasi via WhatsApp
                </a>
                
                {/* Micro branding footer */}
                <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono tracking-wider px-1">
                  <span>ZEAS CREATIVE CORNER</span>
                  <span>V1.0.0 (PWA)</span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
