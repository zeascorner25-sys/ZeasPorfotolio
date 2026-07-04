import { useEffect, useState } from "react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "karya-layanan", label: "Karya & Layanan" },
    { id: "tentang", label: "Tentang Kami" },
    { id: "testimoni", label: "Testimoni" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <nav
      id="main-navbar"
      className="fixed top-[36px] inset-x-0 z-[9998] transition-all duration-300 ease-out h-[70px] flex items-center bg-[#FFF8F2]/90 backdrop-blur-[12px] border-b border-silver-brand/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between gap-4 md:gap-0">
        
        {/* Left Side: Live Clock & Mini Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate("beranda")}
            className="interactive-cursor flex items-center gap-3 text-left focus:outline-none"
          >
            {/* Spinning Emblem Mini Logo */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-fuchsia-brand/20" />
              {/* Spinning loop */}
              <div className="absolute inset-0 animate-slow-rotate border-t-2 border-fuchsia-brand rounded-full" />
              <span className="font-serif text-lg font-bold text-fuchsia-brand">Z</span>
            </div>
            <div>
              <span className="font-serif text-base tracking-widest text-fuchsia-brand font-semibold block">
                ZEAS
              </span>
              <span className="font-sans text-[8px] tracking-[0.2em] text-slate-500 uppercase block -mt-1">
                CREATIVE CORNER
              </span>
            </div>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto max-w-full no-scrollbar pb-1 md:pb-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`interactive-cursor px-3 py-1.5 font-sans text-xs tracking-wider uppercase transition-all duration-300 relative whitespace-nowrap ${
                activeSection === item.id
                  ? "text-fuchsia-brand font-semibold"
                  : "text-slate-600 hover:text-fuchsia-brand"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-fuchsia-brand" />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onNavigate("kontak")}
            className="interactive-cursor px-5 py-2 bg-transparent text-fuchsia-brand border border-fuchsia-brand/40 hover:border-fuchsia-brand hover:bg-fuchsia-brand hover:text-cream font-sans text-xs tracking-widest font-medium uppercase transition-all duration-300 rounded-none"
          >
            KONSULTASI
          </button>
        </div>

      </div>
    </nav>
  );
}
