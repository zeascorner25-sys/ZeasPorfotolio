import React from "react";
import { motion } from "motion/react";
import { 
  Globe, 
  Rocket, 
  Mail, 
  Video, 
  ShoppingBag, 
  Link as LinkIcon,
  PhoneCall,
  ShoppingCart
} from "lucide-react";
import { CATEGORIES_DATA } from "../data/projects";

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

// Custom premium mapping for each category card to fit the requested layout
const CARDS_LAYOUT: Record<string, {
  tag: string;
  title: string;
  desc: string;
  price: string;
  projects: string[];
  included: string[];
  viewLabel: string;
  orderLabel: string;
  orderUrl: string;
}> = {
  website: {
    tag: "WEBSITE",
    title: "Website Premium Bisnis",
    desc: "Website premium berkelas dunia untuk menaikkan nilai tawar dan kredibilitas usaha Anda.",
    price: "Rp249.000",
    projects: ["D'Foria Kitchen", "Company Profile", "Website UMKM"],
    included: ["Responsive", "Mobile Friendly", "SEO Basic", "Revisi Minor"],
    viewLabel: "Lihat Demo",
    orderLabel: "Pesan WA",
    orderUrl: "https://wa.me/62881080091195"
  },
  "landing-page": {
    tag: "LANDING PAGE",
    title: "Landing Page Konversi",
    desc: "Satu halaman promosi dengan copywriting persuasif & CTA optimal maksimalkan penjualan.",
    price: "Rp149.000",
    projects: ["Zeas Landing Premium", "Landing Produk", "Landing Event"],
    included: ["Responsive", "CTA Optimized", "SEO Basic", "Revisi Minor"],
    viewLabel: "Lihat Demo",
    orderLabel: "Pesan WA",
    orderUrl: "https://wa.me/62881080091195"
  },
  "undangan-website": {
    tag: "UNDANGAN WEBSITE",
    title: "Undangan Digital Mewah",
    desc: "Undangan pernikahan digital interaktif dengan fitur lengkap, lagu latar, & kado digital.",
    price: "Rp99.000",
    projects: ["Wedding Invitation", "Birthday Invitation", "Digital Event"],
    included: ["Countdown & Maps", "RSVP Form", "Lagu Latar", "Kado Digital"],
    viewLabel: "Lihat Demo",
    orderLabel: "Pesan WA",
    orderUrl: "https://wa.me/62881080091195"
  },
  "desain-link": {
    tag: "DESAIN LINK BIO",
    title: "Bio Link Profesional",
    desc: "Satu tautan premium merangkum semua kontak, sosial media, & portofolio bisnis Anda.",
    price: "Rp99.000",
    projects: ["Premium Link Bio", "Business Link Page", "Personal Brand Link"],
    included: ["Custom Design", "Mobile Friendly", "Premium Layout", "Fast Load"],
    viewLabel: "Lihat Demo",
    orderLabel: "Pesan WA",
    orderUrl: "https://wa.me/62881080091195"
  },
  "video-ai": {
    tag: "VIDEO AI PROMOSI",
    title: "Video AI Presenter",
    desc: "Video animasi & presenter AI beresolusi tinggi untuk promosi media sosial memukau.",
    price: "Rp60.000",
    projects: ["Video AI Zeas", "AI Avatar Promo", "Motion Clip AI"],
    included: ["Suara AI Alami", "Scriptwriting AI", "Animasi Premium", "Resolusi HD"],
    viewLabel: "Lihat Demo",
    orderLabel: "Pesan WA",
    orderUrl: "https://wa.me/62881080091195"
  },
  "produk-digital": {
    tag: "PRODUK DIGITAL",
    title: "Template & Aset Kreatif",
    desc: "Kumpulan template Canva premium & aset desain siap pakai untuk kreator konten.",
    price: "Rp15.000",
    projects: ["Creative Canvas", "Creative Nest", "Creative Spark"],
    included: ["Template Edit", "Asset Premium", "Akses Selamanya", "Update Gratis"],
    viewLabel: "Lihat Demo",
    orderLabel: "Beli Produk",
    orderUrl: "https://lynk.id/zeacorner"
  }
};

export default function KaryaLayanan({ onSelectCategory }: KaryaLayananProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 items-stretch w-full max-w-7xl mx-auto px-1">
      {CATEGORIES_DATA.map((cat, idx) => {
        const layout = CARDS_LAYOUT[cat.id] || {
          tag: cat.title.toUpperCase(),
          title: cat.title + " Premium",
          desc: cat.desc,
          price: "Hubungi Kami",
          projects: ["Project 1", "Project 2", "Project 3"],
          included: ["Responsive", "Mobile Friendly", "SEO Basic", "Revisi Minor"],
          viewLabel: "Lihat Demo",
          orderLabel: "Pesan WA",
          orderUrl: "https://wa.me/62881080091195"
        };

        const iconElement = CATEGORY_ICONS[cat.id] 
          ? CATEGORY_ICONS[cat.id]("w-4 h-4 text-[#C2185B]") 
          : <span>{cat.icon}</span>;

        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
            className="group rounded-[22px] border border-[#D4AF37]/35 hover:border-[#C2185B] bg-gradient-to-br from-[#FFF5F7] via-[#FFF0F4] to-[#FCE7F3] p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-[0_8px_24px_rgba(194,24,91,0.03)] hover:shadow-[0_12px_30px_rgba(194,24,91,0.18)] hover:-translate-y-1 select-none max-h-[340px] h-full"
          >
            {/* Elegant luxury subtle golden border light sweeping */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Thin Luxury Corners on Hover */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#D4AF37]/40 group-hover:border-[#C2185B]/60 transition-all duration-300 pointer-events-none rounded-tl-sm z-20" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#D4AF37]/40 group-hover:border-[#C2185B]/60 transition-all duration-300 pointer-events-none rounded-tr-sm z-20" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#D4AF37]/40 group-hover:border-[#C2185B]/60 transition-all duration-300 pointer-events-none rounded-bl-sm z-20" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#D4AF37]/40 group-hover:border-[#C2185B]/60 transition-all duration-300 pointer-events-none rounded-br-sm z-20" />

            <div className="relative z-10 flex flex-col flex-grow">
              
              {/* 1. Header: Icon + Category Tag */}
              <div className="flex items-center gap-1.5 text-[9.5px] font-extrabold tracking-[0.18em] text-[#C2185B] uppercase mb-1 leading-none">
                <span className="shrink-0 p-1 bg-white/40 rounded-full border border-[#D4AF37]/20">
                  {iconElement}
                </span>
                <span>{layout.tag}</span>
              </div>

              {/* 2. Judul */}
              <h4 className="font-serif text-[15px] sm:text-[16px] font-extrabold text-slate-900 tracking-wide mb-1 leading-tight">
                {layout.title}
              </h4>

              {/* 3. Deskripsi singkat (di-clamp agar tepat 2 baris) */}
              <p className="font-sans text-[11px] text-slate-500 leading-[1.35] line-clamp-2 mb-2 pr-1 h-[30px] overflow-hidden">
                {layout.desc}
              </p>

              {/* Divider ━━━━━━━━━━━━━━ */}
              <div className="border-t border-[#D4AF37]/20 w-full mb-1.5 shrink-0" />

              {/* 4. Project Unggulan */}
              <div className="mb-1.5 flex flex-col shrink-0">
                <div className="text-[9.5px] font-bold text-[#C2185B]/90 tracking-wide flex items-center gap-1 leading-none mb-1">
                  <span>✨</span> Project Unggulan
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-slate-700 font-semibold leading-tight">
                  {layout.projects.map((proj, pIdx) => (
                    <span key={pIdx} className="whitespace-nowrap">
                      • {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider ━━━━━━━━━━━━━━ */}
              <div className="border-t border-[#D4AF37]/20 w-full mb-1.5 shrink-0" />

              {/* 5. Pricing & Checklist in 2 columns */}
              <div className="flex items-center justify-between gap-2.5 bg-white/45 backdrop-blur-sm rounded-[14px] p-2 border border-[#D4AF37]/15 mb-2 shrink-0">
                {/* Price Label */}
                <div className="flex flex-col shrink-0">
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">💰 Mulai</span>
                  <span className="font-mono text-[13px] sm:text-[14px] font-black text-[#C2185B] leading-none">
                    {layout.price}
                  </span>
                </div>

                {/* Micro vertical divider */}
                <div className="w-[1px] h-7 bg-slate-300/40 shrink-0" />

                {/* Checklist (2 Kolom) */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 flex-grow text-left">
                  {layout.included.slice(0, 4).map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-1 text-[9.5px] text-slate-700 font-bold whitespace-nowrap overflow-hidden text-ellipsis leading-none">
                      <span className="text-emerald-600 text-[10px] font-extrabold leading-none">✓</span>
                      <span className="truncate max-w-[70px] xs:max-w-[85px] leading-none">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Divider ━━━━━━━━━━━━━━ */}
            <div className="border-t border-[#D4AF37]/10 w-full mb-2 shrink-0" />

            {/* 6. Dual Buttons Bottom Row */}
            <div className="flex items-center gap-2 shrink-0">
              {/* View / Demo Button */}
              <button
                onClick={() => onSelectCategory(cat.id)}
                className="interactive-cursor flex-1 py-1.5 px-3 bg-white/80 hover:bg-[#C2185B] hover:text-white border border-[#D4AF37]/35 hover:border-[#C2185B] text-[10px] font-sans font-extrabold tracking-widest text-slate-700 uppercase shadow-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1 rounded-full text-ellipsis overflow-hidden whitespace-nowrap h-[28px]"
              >
                <span>{layout.viewLabel}</span>
              </button>

              {/* Message WhatsApp / Checkout Button */}
              <a
                href={layout.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-cursor flex-1 py-1.5 px-3 bg-[#C2185B] hover:bg-[#A01048] border border-[#C2185B] text-[10px] font-sans font-extrabold tracking-widest text-white uppercase shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1 rounded-full text-ellipsis overflow-hidden whitespace-nowrap h-[28px]"
              >
                {cat.id === "produk-digital" ? (
                  <ShoppingCart className="w-3 h-3 text-white shrink-0" />
                ) : (
                  <PhoneCall className="w-3 h-3 text-white shrink-0" />
                )}
                <span>{layout.orderLabel}</span>
              </a>
            </div>

          </motion.div>
        );
      })}
    </div>
  );
}
