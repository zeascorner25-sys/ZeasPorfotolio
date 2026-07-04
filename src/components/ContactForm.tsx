import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Mail, Instagram, Play, Link } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    service: "Website",
    contact: "",
    brief: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const servicesList = [
    "Website",
    "Landing Page",
    "Produk Digital",
    "Desain Link",
    "Undangan Website",
    "Video Promosi",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      setError("Mohon isi Nama Lengkap dan Kontak Anda.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      business: "",
      service: "Website",
      contact: "",
      brief: "",
    });
    setError("");
    setSubmitted(false);
  };

  // Pre-generate WhatsApp Link with beautiful pre-filled message
  const waNumber = "62881080091195";
  const waMessage = encodeURIComponent(
    `Halo Zeas Creative Corner,\n\nSaya tertarik untuk bekerja sama membuat produk digital.\n\n*Detail Permohonan:*\n• Nama: ${formData.name}\n• Bisnis: ${formData.business || "-"}\n• Layanan: ${formData.service}\n• Kontak: ${formData.contact}\n• Brief Singkat: ${formData.brief || "-"}\n\nMohon informasi konsultasi lebih lanjut. Terima kasih!`
  );
  const whatsappUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left Column: Direct Luxury Channels */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] text-fuchsia-brand uppercase font-semibold block mb-2">
            STAY IN TOUCH
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 tracking-wide mb-4">
            Mulai Kolaborasi Anda
          </h3>
          <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
            Hubungi kami melalui saluran resmi Zeas Creative Corner. Konsultasikan visi digital Anda dan mari kita wujudkan produk bernilai seni tinggi.
          </p>
        </div>

        {/* Contact list blocks */}
        <div className="flex flex-col gap-3.5 mt-2">
          
          {/* WhatsApp block */}
          <a
            href="https://wa.me/62881080091195?text=Halo%20Zeas%20Creative%20Corner%2C%20saya%20tertarik%20konsultasi%20desain."
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-4 bg-white border border-silver-brand/25 hover:border-fuchsia-brand/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-fuchsia-brand group-hover:text-cream transition-colors duration-300">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-widest text-slate-400 uppercase block">
                  FAST RESPONSE
                </span>
                <span className="font-sans text-xs font-semibold text-slate-800 tracking-wide block">
                  WhatsApp Business
                </span>
                <span className="font-sans text-[11px] text-slate-500 block">
                  +62 881-0800-91195
                </span>
              </div>
            </div>
            <span className="text-fuchsia-brand text-[11px] font-semibold tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              HUBUNGI →
            </span>
          </a>

          {/* Lynk.id block */}
          <a
            href="https://lynk.id/zeacorner"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-4 bg-white border border-silver-brand/25 hover:border-fuchsia-brand/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-fuchsia-50 text-fuchsia-brand flex items-center justify-center group-hover:bg-fuchsia-brand group-hover:text-cream transition-colors duration-300">
                <Link className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-widest text-slate-400 uppercase block">
                  BIO LINKS
                </span>
                <span className="font-sans text-xs font-semibold text-slate-800 tracking-wide block">
                  Lynk.id Showcase
                </span>
                <span className="font-sans text-[11px] text-slate-500 block">
                  lynk.id/zeacorner
                </span>
              </div>
            </div>
            <span className="text-fuchsia-brand text-[11px] font-semibold tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              KUNJUNGI →
            </span>
          </a>

          {/* Instagram block */}
          <a
            href="https://instagram.com/zeascreativecorner"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-4 bg-white border border-silver-brand/25 hover:border-fuchsia-brand/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-fuchsia-brand group-hover:text-cream transition-colors duration-300">
                <Instagram className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-widest text-slate-400 uppercase block">
                  PORTFOLIO SHOWCASE
                </span>
                <span className="font-sans text-xs font-semibold text-slate-800 tracking-wide block">
                  Instagram
                </span>
                <span className="font-sans text-[11px] text-slate-500 block">
                  @zeascreativecorner
                </span>
              </div>
            </div>
            <span className="text-fuchsia-brand text-[11px] font-semibold tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              IKUTI →
            </span>
          </a>

          {/* TikTok block */}
          <a
            href="https://tiktok.com/@zeascreativecorner"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-4 bg-white border border-silver-brand/25 hover:border-fuchsia-brand/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-slate-50 text-slate-800 flex items-center justify-center group-hover:bg-fuchsia-brand group-hover:text-cream transition-colors duration-300">
                <Play className="w-3.5 h-3.5 fill-slate-800 group-hover:fill-cream" />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-widest text-slate-400 uppercase block">
                  SHORT VIDEOS
                </span>
                <span className="font-sans text-xs font-semibold text-slate-800 tracking-wide block">
                  TikTok Channel
                </span>
                <span className="font-sans text-[11px] text-slate-500 block">
                  @zeascreativecorner
                </span>
              </div>
            </div>
            <span className="text-fuchsia-brand text-[11px] font-semibold tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              TONTON →
            </span>
          </a>

          {/* Threads block */}
          <a
            href="https://threads.net/@zeascreativecorner"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-4 bg-white border border-silver-brand/25 hover:border-fuchsia-brand/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-fuchsia-brand group-hover:text-cream transition-colors duration-300">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-widest text-slate-400 uppercase block">
                  THREADS SOCIAL
                </span>
                <span className="font-sans text-xs font-semibold text-slate-800 tracking-wide block">
                  Threads Channel
                </span>
                <span className="font-sans text-[11px] text-slate-500 block">
                  @zeascreativecorner
                </span>
              </div>
            </div>
            <span className="text-fuchsia-brand text-[11px] font-semibold tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              IKUTI →
            </span>
          </a>

        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7 bg-white border border-silver-brand/25 p-8 md:p-10 shadow-sm relative">
        {/* Silver thin corners accent */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-silver-brand/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-silver-brand/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-silver-brand/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-silver-brand/40" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <h4 className="font-serif text-xl font-medium text-slate-800 tracking-wide mb-2">
                Formulir Rencana Proyek
              </h4>

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[10px] tracking-wider text-slate-500 uppercase font-medium">
                  Nama Lengkap <span className="text-fuchsia-brand">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Anastasia Kirana"
                  className="interactive-cursor bg-cream/35 border border-silver-brand/25 px-4 py-3 font-sans text-xs tracking-wide text-slate-800 focus:outline-none focus:border-fuchsia-brand transition-colors rounded-none placeholder:text-slate-400"
                />
              </div>

              {/* Business Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[10px] tracking-wider text-slate-500 uppercase font-medium">
                  Nama Bisnis / Brand (Opsional)
                </label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  placeholder="Contoh: Kirana Wedding Organizer"
                  className="interactive-cursor bg-cream/35 border border-silver-brand/25 px-4 py-3 font-sans text-xs tracking-wide text-slate-800 focus:outline-none focus:border-fuchsia-brand transition-colors rounded-none placeholder:text-slate-400"
                />
              </div>

              {/* Two Column Row: Service & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Service Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-wider text-slate-500 uppercase font-medium">
                    Layanan yang Dibutuhkan
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="interactive-cursor bg-cream/35 border border-silver-brand/25 px-4 py-3 font-sans text-xs tracking-wide text-slate-800 focus:outline-none focus:border-fuchsia-brand transition-colors rounded-none"
                  >
                    {servicesList.map((service) => (
                      <option key={service} value={service} className="bg-cream">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact Phone / Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-wider text-slate-500 uppercase font-medium">
                    Nomor WhatsApp / Email <span className="text-fuchsia-brand">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: +62 812-xxxx-xxxx"
                    className="interactive-cursor bg-cream/35 border border-silver-brand/25 px-4 py-3 font-sans text-xs tracking-wide text-slate-800 focus:outline-none focus:border-fuchsia-brand transition-colors rounded-none placeholder:text-slate-400"
                  />
                </div>

              </div>

              {/* Brief Project Brief Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[10px] tracking-wider text-slate-500 uppercase font-medium">
                  Brief Rencana Desain (Opsional)
                </label>
                <textarea
                  name="brief"
                  value={formData.brief}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Deskripsikan secara singkat tujuan bisnis Anda, preferensi warna, dan tanggal peluncuran yang direncanakan..."
                  className="interactive-cursor bg-cream/35 border border-silver-brand/25 px-4 py-3 font-sans text-xs tracking-wide text-slate-800 focus:outline-none focus:border-fuchsia-brand transition-colors rounded-none placeholder:text-slate-400 resize-none leading-relaxed"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 text-xs font-sans tracking-wide border border-red-200">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="interactive-cursor w-full py-4 bg-fuchsia-brand text-cream font-sans text-xs tracking-[0.25em] font-medium uppercase hover:bg-fuchsia-hover transition-colors duration-300 rounded-none shadow-sm flex items-center justify-center gap-3 mt-2"
              >
                KIRIM FORMULIR
                <Send className="w-3.5 h-3.5" />
              </button>

            </motion.form>
          ) : (
            <motion.div
              key="success-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-8 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-serif text-2xl font-semibold text-slate-900 tracking-wide mb-2">
                Terima Kasih, {formData.name}!
              </h4>
              <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed max-w-md mb-8">
                Formulir rencana proyek Anda untuk <strong className="text-fuchsia-brand font-medium">{formData.service}</strong> telah tersimpan di sistem kami. 
              </p>

              {/* Direct Instant Actions */}
              <div className="w-full flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-cursor w-full py-3.5 bg-emerald-600 text-white font-sans text-xs tracking-widest font-medium uppercase hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  KIRIM SEKARANG KE WHATSAPP
                  <MessageSquare className="w-4 h-4" />
                </a>

                <button
                  onClick={handleReset}
                  className="interactive-cursor w-full py-3 bg-transparent text-slate-500 border border-silver-brand/35 hover:border-slate-800 hover:text-slate-800 font-sans text-xs tracking-widest font-medium uppercase transition-all duration-300"
                >
                  KIRIM FORM LAIN
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
