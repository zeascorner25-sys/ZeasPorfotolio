import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Globe, 
  Rocket, 
  Mail, 
  Video, 
  ShoppingBag, 
  Link as LinkIcon,
  CheckCircle2,
  PhoneCall,
  ShoppingCart
} from "lucide-react";
import { CATEGORIES_DATA, ShowcaseCategory, ProjectItem } from "../data/projects";

interface KaryaLayananProps {
  onSelectCategory: (categoryId: string) => void;
}

const CATEGORY_ICONS: Record<string, (cls: string) => React.ReactNode> = {
  website: (cls) => <Globe className={cls} />,
  "landing-page": (cls) => <Rocket className={cls} />,
  "undangan-website": (cls) => <Mail className={cls} />,
  "video-ai": (cls) => <Video className={cls} />,
  "produk-digital": (cls) => <ShoppingBag className={cls} />,
  "desain-link": (cls) => <LinkIcon className={cls} />
};

const CARD_STYLES: Record<string, {
  bgGradient: string;
  hoverBgGradient: string;
  glowColor: string;
}> = {
  website: {
    // Fuchsia -> Soft Pink
    bgGradient: "from-[#FFF0F6]/95 via-[#FFF5F8]/95 to-[#FFEDF5]/95",
    hoverBgGradient: "group-hover:from-[#FCE7F3] group-hover:via-[#FDF2F8] group-hover:to-[#FFF0F6]",
    glowColor: "rgba(219,39,119,0.18)"
  },
  "landing-page": {
    // Rose Pink -> Soft Pink
    bgGradient: "from-[#FFF1F2]/95 via-[#FFF8F9]/95 to-[#FFF0F5]/95",
    hoverBgGradient: "group-hover:from-[#FFE4E6] group-hover:via-[#FFF1F2] group-hover:to-[#FCE7F3]",
    glowColor: "rgba(244,114,182,0.18)"
  },
  "undangan-website": {
    // Fuchsia -> Rose Pink
    bgGradient: "from-[#FFF0F6]/95 via-[#FFF5F8]/95 to-[#FFF1F2]/95",
    hoverBgGradient: "group-hover:from-[#FCE7F3] group-hover:via-[#FFE4E6] group-hover:to-[#FECDD3]",
    glowColor: "rgba(225,29,72,0.18)"
  },
  "video-ai": {
    // Deep Fuchsia -> Pink
    bgGradient: "from-[#FCE7F3]/95 via-[#FDF2F8]/95 to-[#FFF5F7]/95",
    hoverBgGradient: "group-hover:from-[#FBCFE8] group-hover:via-[#FCE7F3] group-hover:to-[#FFE4E6]",
    glowColor: "rgba(219,39,119,0.22)"
  },
  "produk-digital": {
    // Pink -> Soft Pink
    bgGradient: "from-[#FFF0F5]/95 via-[#FFF8FA]/95 to-[#FDF2F8]/95",
    hoverBgGradient: "group-hover:from-[#FCE7F3] group-hover:via-[#FFF0F5] group-hover:to-[#FFF5F7]",
    glowColor: "rgba(236,72,153,0.18)"
  },
  "desain-link": {
    // Fuchsia -> Silver Pink
    bgGradient: "from-[#FFF0F6]/95 via-[#F8FAFC]/95 to-[#FFF0F5]/95",
    hoverBgGradient: "group-hover:from-[#FCE7F3] group-hover:via-[#F1F5F9] group-hover:to-[#FFF5F8]",
    glowColor: "rgba(100,116,139,0.15)"
  }
};

const CARDS_CONTENT: Record<string, {
  priceLabel: string;
  priceValue: string;
  projects: string[];
  included: string[];
  viewLabel: string;
  orderLabel: string;
  orderUrl: string;
  isCustomPricing?: boolean;
}> = {
  website: {
    priceLabel: "Harga Mulai Dari",
    priceValue: "Rp249.000",
    projects: ["D'Foria Kitchen", "Company Profile", "Website UMKM"],
    included: ["Responsive", "Mobile Friendly", "SEO Basic", "Revisi Minor"],
    viewLabel: "✨ Lihat Website",
    orderLabel: "✨ Pesan via WhatsApp",
    orderUrl: "https://wa.me/62881080091195"
  },
  "landing-page": {
    priceLabel: "Harga Mulai Dari",
    priceValue: "Rp149.000",
    projects: ["Zeas Landing Premium", "Landing Produk", "Landing Event"],
    included: ["Responsive", "CTA Optimized", "Revisi Minor"],
    viewLabel: "✨ Lihat Landing Page",
    orderLabel: "✨ Pesan via WhatsApp",
    orderUrl: "https://wa.me/62881080091195"
  },
  "undangan-website": {
    priceLabel: "Harga Mulai Dari",
    priceValue: "Rp99.000",
    projects: ["Wedding Invitation Premium"],
    included: ["Countdown", "Maps", "RSVP", "Musik"],
    viewLabel: "✨ Lihat Undangan",
    orderLabel: "✨ Pesan via WhatsApp",
    orderUrl: "https://wa.me/62881080091195"
  },
  "desain-link": {
    priceLabel: "Harga Mulai Dari",
    priceValue: "Rp99.000",
    projects: ["Lynk Premium"],
    included: ["Custom Design", "Mobile Friendly", "Premium Layout"],
    viewLabel: "✨ Lihat Desain",
    orderLabel: "✨ Pesan via WhatsApp",
    orderUrl: "https://wa.me/62881080091195"
  },
  "video-ai": {
    priceLabel: "Harga Paket",
    priceValue: "",
    projects: ["Video AI Zeas Creative Corner"],
    included: [], // handled specially
    viewLabel: "✨ Lihat Video",
    orderLabel: "✨ Pesan via WhatsApp",
    orderUrl: "https://wa.me/62881080091195",
    isCustomPricing: true
  },
  "produk-digital": {
    priceLabel: "Mulai Dari",
    priceValue: "Rp15.000",
    projects: ["Creative Canvas", "Creative Nest", "Creative Spark"],
    included: [], // not used
    viewLabel: "✨ Lihat Produk",
    orderLabel: "✨ Checkout Produk",
    orderUrl: "https://lynk.id/zeacorner"
  }
};

export default function KaryaLayanan({ onSelectCategory }: KaryaLayananProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
      {CATEGORIES_DATA.map((cat, idx) => {
        const style = CARD_STYLES[cat.id] || {
          bgGradient: "from-white/95 to-cream/95",
          hoverBgGradient: "group-hover:from-white group-hover:to-white",
          glowColor: "rgba(0,0,0,0.05)"
        };
        
        const content = CARDS_CONTENT[cat.id] || {
          priceLabel: "Harga Mulai Dari",
          priceValue: "Hubungi Kami",
          projects: cat.featuredProjects.map(p => p.title),
          included: [],
          viewLabel: "✨ Lihat Project",
          orderLabel: "✨ Pesan Sekarang",
          orderUrl: "https://wa.me/62881080091195"
        };
        
        const iconElement = CATEGORY_ICONS[cat.id] 
          ? CATEGORY_ICONS[cat.id]("w-5 h-5 text-fuchsia-brand group-hover:text-white transition-colors duration-300") 
          : <span className="group-hover:text-white transition-colors duration-300">{cat.icon}</span>;
        
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            className="group p-[1.5px] rounded-2xl luxury-gold-border relative overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer"
            style={{
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.01)"
            }}
            whileHover={{
              boxShadow: "0 25px 50px rgba(212, 175, 55, 0.15), 0 10px 30px rgba(194, 24, 91, 0.08)"
            }}
          >
            {/* Inner Card Container with glassmorphism bg gradient */}
            <div className={`w-full h-full bg-gradient-to-br ${style.bgGradient} ${style.hoverBgGradient} backdrop-blur-[12px] rounded-[15px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500`}>
              {/* Light highlighting on top-left corner */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-white/60 to-transparent rounded-tl-[15px] pointer-events-none z-10" />

              {/* Light sweep gleam effect */}
              <div className="light-sweep-effect" />

              {/* Elegant thin luxury frame corners in Gold */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none rounded-tl-sm z-20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none rounded-tr-sm z-20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none rounded-bl-sm z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none rounded-br-sm z-20" />

              <div className="relative z-10 flex-grow">
                {/* Header: Icon + Category Name */}
                <div className="flex items-center gap-3.5 mb-5">
                  {/* Icon in a Glassmorphism circle with thin Gold ring rotating on hover */}
                  <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-[#D4AF37]/45 flex items-center justify-center relative group-hover:bg-[#D4AF37]/10 transition-all duration-500 shadow-sm">
                    <div className="absolute inset-0 rounded-full border border-[#D4AF37]/50 group-hover:rotate-[5deg] transition-transform duration-500 pointer-events-none" />
                    <div className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {iconElement}
                    </div>
                  </div>
                  <span className="font-serif text-xs tracking-[0.25em] text-slate-500 uppercase font-bold group-hover:text-fuchsia-brand transition-colors duration-300">
                    {cat.title}
                  </span>
                </div>

                {/* Tagline / Subtitle */}
                <h4 className="font-serif text-lg font-bold text-slate-900 tracking-wide mb-3 leading-relaxed">
                  {cat.desc}
                </h4>

                {/* Divider */}
                <div className="w-12 h-[1px] bg-[#D4AF37]/40 my-4 group-hover:w-20 group-hover:bg-[#D4AF37]/70 transition-all duration-500" />

                {/* Project Unggulan Section */}
                <div className="mb-5">
                  <span className="font-sans text-[9px] tracking-[0.2em] font-bold text-slate-400 uppercase block mb-2.5">
                    PROJECT UNGGULAN
                  </span>
                  <ul className="space-y-2">
                    {content.projects.map((title, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/70 group-hover:scale-125 group-hover:bg-fuchsia-brand transition-all duration-300 shrink-0" />
                        <span className="font-sans text-xs md:text-sm text-slate-800 font-medium group-hover:text-slate-950 transition-colors duration-300">
                          {title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRICING DETAILS SECTION */}
                <div className="mt-5 pt-4 border-t border-silver-brand/15 bg-[#FFFDFB]/30 rounded-lg p-3.5 border border-[#D4AF37]/10 mb-6">
                  {content.isCustomPricing ? (
                    /* Video AI Special Grid Layout */
                    <div className="space-y-4">
                      <div>
                        <span className="font-sans text-[9px] tracking-[0.15em] font-bold text-slate-400 uppercase block mb-1.5">
                          PILIHAN PAKET VIDEO AI
                        </span>
                        <div className="grid grid-cols-1 gap-1.5 font-sans">
                          <div className="flex justify-between items-center bg-white/50 p-2 rounded border border-[#D4AF37]/5 text-xs">
                            <span className="font-semibold text-slate-800">Paket Reguler</span>
                            <span className="font-bold text-fuchsia-brand font-mono">Rp60.000 <span className="text-[10px] font-normal text-slate-500">/ 30s</span></span>
                          </div>
                          <div className="flex justify-between items-center bg-white/60 p-2 rounded border border-[#D4AF37]/10 text-xs">
                            <span className="font-semibold text-slate-800 flex items-center gap-1">Paket Prioritas <Sparkles className="w-3 h-3 text-[#D4AF37]" /></span>
                            <span className="font-bold text-fuchsia-brand font-mono">Rp100.000 <span className="text-[10px] font-normal text-slate-500">/ 30s</span></span>
                          </div>
                          <div className="flex justify-between items-center bg-white/50 p-2 rounded border border-[#D4AF37]/5 text-xs">
                            <span className="font-semibold text-slate-800">Paket Express</span>
                            <span className="font-bold text-fuchsia-brand font-mono">Rp150.000 <span className="text-[10px] font-normal text-slate-500">/ 30s</span></span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="font-sans text-[9px] tracking-[0.15em] font-bold text-slate-400 uppercase block mb-1.5">
                          OPSI DURASI & HARGA
                        </span>
                        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-sans">
                          <div className="bg-white/40 p-2 rounded border border-[#D4AF37]/5">
                            <div className="text-slate-500 font-medium">60 detik</div>
                            <div className="font-bold text-slate-900 font-mono mt-0.5">Rp120k</div>
                          </div>
                          <div className="bg-white/40 p-2 rounded border border-[#D4AF37]/5">
                            <div className="text-slate-500 font-medium">90 detik</div>
                            <div className="font-bold text-slate-900 font-mono mt-0.5">Rp180k</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded border border-[#D4AF37]/10">
                            <div className="text-slate-500 font-medium">120 detik</div>
                            <div className="font-bold text-slate-900 font-mono mt-0.5">Rp240k</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard pricing layout with included checklist */
                    <div className="space-y-3.5">
                      <div className="flex flex-col">
                        <span className="font-sans text-[9px] tracking-[0.15em] font-bold text-slate-400 uppercase">
                          {content.priceLabel}
                        </span>
                        <span className="font-serif text-2xl font-bold text-slate-900 font-mono tracking-tight mt-0.5">
                          {content.priceValue}
                        </span>
                      </div>

                      {content.included.length > 0 && (
                        <div>
                          <span className="font-sans text-[9px] tracking-[0.15em] font-bold text-slate-400 uppercase block mb-1.5">
                            YANG DIDAPAT (TERMASUK)
                          </span>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-700">
                            {content.included.map((inc, iIdx) => (
                              <div key={iIdx} className="flex items-center gap-1.5 text-xs">
                                <span className="text-[#D4AF37] font-semibold">✔</span>
                                <span className="font-sans font-medium text-slate-700">{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions Row: Dual Buttons */}
              <div className="mt-4 pt-5 border-t border-silver-brand/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
                
                {/* View / Explore Button */}
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className="interactive-cursor flex-1 py-3 px-4 bg-white border border-[#D4AF37]/30 text-[10px] font-sans font-bold tracking-widest text-slate-800 uppercase hover:bg-cream/40 shadow-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  {content.viewLabel}
                </button>

                {/* Primary WhatsApp / Checkout Button */}
                <a
                  href={content.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-cursor flex-1 py-3 px-4 bg-[#FFF8F2]/95 border border-[#D4AF37] text-[10px] font-sans font-bold tracking-widest text-fuchsia-brand uppercase hover:bg-white hover:text-fuchsia-hover hover:border-fuchsia-brand shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  {cat.id === "produk-digital" ? (
                    <ShoppingCart className="w-3.5 h-3.5" />
                  ) : (
                    <PhoneCall className="w-3.5 h-3.5 text-fuchsia-brand" />
                  )}
                  {content.orderLabel}
                </a>

              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

