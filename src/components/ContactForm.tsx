import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Mail, Instagram, Play, Link, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactForm() {
  // Simple Inline Form State
  const [inlineData, setInlineData] = useState({
    name: "",
    whatsapp: "",
    service: "Website",
    message: "",
  });

  // Modal Detailed Form State
  const [modalData, setModalData] = useState({
    name: "",
    business: "",
    service: "Website",
    contact: "",
    brief: "",
    timeline: "1-2 Minggu",
    budget: "Mulai Rp249k",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<{
    name: string;
    service: string;
    waUrl: string;
  } | null>(null);

  const [error, setError] = useState("");

  const servicesList = [
    "Website",
    "Landing Page",
    "Produk Digital",
    "Desain Link",
    "Undangan Website",
    "Video Promosi",
  ];

  const handleInlineChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInlineData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle compact form submission
  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineData.name || !inlineData.whatsapp) {
      setError("Mohon isi Nama dan Nomor WhatsApp Anda.");
      return;
    }

    const waNumber = "62881080091195";
    const msg = encodeURIComponent(
      `Halo Zeas Creative Corner,\n\nSaya tertarik berkonsultasi mengenai proyek digital.\n\n*Form Konsultasi Ringkas:*\n• Nama: ${inlineData.name}\n• WhatsApp: ${inlineData.whatsapp}\n• Layanan: ${inlineData.service}\n• Pesan: ${inlineData.message || "-"}\n\nMohon informasi konsultasi lebih lanjut. Terima kasih!`
    );
    const whatsappUrl = `https://wa.me/${waNumber}?text=${msg}`;

    setActiveSubmission({
      name: inlineData.name,
      service: inlineData.service,
      waUrl: whatsappUrl,
    });
    setSubmitted(true);
    setError("");
  };

  // Handle detailed modal form submission
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalData.name || !modalData.contact) {
      alert("Mohon lengkapi Nama Lengkap dan Kontak Anda.");
      return;
    }

    const waNumber = "62881080091195";
    const msg = encodeURIComponent(
      `Halo Zeas Creative Corner,\n\nSaya tertarik berkonsultasi mengenai proyek digital via *FORM LENGKAP*.\n\n*Detail Proyek Lengkap:*\n• Nama Lengkap: ${modalData.name}\n• Nama Bisnis: ${modalData.business || "-"}\n• Layanan: ${modalData.service}\n• Kontak WhatsApp/Email: ${modalData.contact}\n• Timeline Proyek: ${modalData.timeline}\n• Ekspektasi Budget: ${modalData.budget}\n• Brief Desain: ${modalData.brief || "-"}\n\nMohon feedback dari tim Zeas. Terima kasih!`
    );
    const whatsappUrl = `https://wa.me/${waNumber}?text=${msg}`;

    setActiveSubmission({
      name: modalData.name,
      service: modalData.service,
      waUrl: whatsappUrl,
    });
    setIsModalOpen(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setInlineData({
      name: "",
      whatsapp: "",
      service: "Website",
      message: "",
    });
    setModalData({
      name: "",
      business: "",
      service: "Website",
      contact: "",
      brief: "",
      timeline: "1-2 Minggu",
      budget: "Mulai Rp249k",
    });
    setSubmitted(false);
    setActiveSubmission(null);
    setError("");
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Column: Direct Luxury Channels */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#C2185B] uppercase font-bold block mb-1">
            STAY IN TOUCH
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-900 tracking-wide mb-2 leading-tight">
            Mulai Kolaborasi Anda
          </h3>
          <p className="font-sans text-[11.5px] text-slate-500 leading-relaxed">
            Hubungi kami melalui saluran resmi Zeas Creative Corner. Konsultasikan visi digital Anda dan mari kita wujudkan produk bernilai seni tinggi.
          </p>
        </div>

        {/* Contact list blocks - highly compact for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mt-1">
          {/* WhatsApp block */}
          <a
            href="https://wa.me/62881080091195?text=Halo%20Zeas%20Creative%20Corner%2C%20saya%20tertarik%20konsultasi%20desain."
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-3 bg-white border border-silver-brand/25 hover:border-[#C2185B]/50 transition-all duration-300 shadow-sm rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#C2185B] group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[7px] tracking-widest text-slate-400 uppercase block leading-none">FAST RESPONSE</span>
                <span className="font-sans text-[11px] font-bold text-slate-800 block">WhatsApp Business</span>
                <span className="font-sans text-[9.5px] text-slate-500 block leading-none mt-0.5">+62 881-0800-91195</span>
              </div>
            </div>
            <span className="text-[#C2185B] text-[9.5px] font-bold group-hover:translate-x-1 transition-transform">HUBUNGI →</span>
          </a>

          {/* Lynk.id block */}
          <a
            href="https://lynk.id/zeacorner"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-3 bg-white border border-silver-brand/25 hover:border-[#C2185B]/50 transition-all duration-300 shadow-sm rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-fuchsia-50 text-[#C2185B] flex items-center justify-center group-hover:bg-[#C2185B] group-hover:text-white transition-colors duration-300">
                <Link className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[7px] tracking-widest text-slate-400 uppercase block leading-none">BIO LINKS</span>
                <span className="font-sans text-[11px] font-bold text-slate-800 block">Lynk.id Showcase</span>
                <span className="font-sans text-[9.5px] text-slate-500 block leading-none mt-0.5">lynk.id/zeacorner</span>
              </div>
            </div>
            <span className="text-[#C2185B] text-[9.5px] font-bold group-hover:translate-x-1 transition-transform">KUNJUNGI →</span>
          </a>

          {/* Instagram block */}
          <a
            href="https://instagram.com/zeascreativecorner"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-cursor group flex items-center justify-between p-3 bg-white border border-silver-brand/25 hover:border-[#C2185B]/50 transition-all duration-300 shadow-sm rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-[#C2185B] group-hover:text-white transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[7px] tracking-widest text-slate-400 uppercase block leading-none">PORTFOLIO</span>
                <span className="font-sans text-[11px] font-bold text-slate-800 block">Instagram</span>
                <span className="font-sans text-[9.5px] text-slate-500 block leading-none mt-0.5">@zeascreativecorner</span>
              </div>
            </div>
            <span className="text-[#C2185B] text-[9.5px] font-bold group-hover:translate-x-1 transition-transform">IKUTI →</span>
          </a>
        </div>
      </div>

      {/* Right Column: Compact Form & Success views */}
      <div className="lg:col-span-7 bg-white border border-silver-brand/25 p-5 md:p-6 shadow-sm relative rounded-2xl">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="compact-form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleInlineSubmit}
              className="flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <h4 className="font-serif text-sm sm:text-base font-bold text-slate-800 tracking-wide">
                  Konsultasi Kilat
                </h4>
                {/* Trigger Button for Detail form modal */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="interactive-cursor text-[9.5px] font-sans font-extrabold tracking-wider text-[#C2185B] hover:text-[#A01048] flex items-center gap-1 uppercase"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Lihat Form Lengkap
                </button>
              </div>

              {/* Grid 2 Columns for Inputs to keep height under 70% mobile screen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nama */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                    Nama <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={inlineData.name}
                    onChange={handleInlineChange}
                    required
                    placeholder="Contoh: Anastasia"
                    className="interactive-cursor bg-cream/20 border border-silver-brand/25 px-3 py-2 font-sans text-[11.5px] text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl placeholder:text-slate-400"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                    WhatsApp <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={inlineData.whatsapp}
                    onChange={handleInlineChange}
                    required
                    placeholder="Contoh: 0812xxxxxxxx"
                    className="interactive-cursor bg-cream/20 border border-silver-brand/25 px-3 py-2 font-sans text-[11.5px] text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Layanan select */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                  Layanan yang Dibutuhkan
                </label>
                <select
                  name="service"
                  value={inlineData.service}
                  onChange={handleInlineChange}
                  className="interactive-cursor bg-cream/20 border border-silver-brand/25 px-3 py-2 font-sans text-[11.5px] text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl"
                >
                  {servicesList.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pesan (1-2 rows instead of a long area) */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                  Pesan / Keterangan Singkat
                </label>
                <textarea
                  name="message"
                  value={inlineData.message}
                  onChange={handleInlineChange}
                  rows={2}
                  placeholder="Kebutuhan bisnis Anda, preferensi warna, brief singkat..."
                  className="interactive-cursor bg-cream/20 border border-silver-brand/25 px-3 py-2 font-sans text-[11.5px] text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl placeholder:text-slate-400 resize-none leading-relaxed"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-3 py-2 rounded-xl text-[10.5px] font-medium border border-red-100">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="interactive-cursor w-full py-2.5 bg-[#C2185B] hover:bg-[#A01048] text-white font-sans text-[11px] tracking-widest font-extrabold uppercase transition-all duration-300 rounded-full shadow-sm flex items-center justify-center gap-2 mt-1"
              >
                KIRIM FORMULIR KILAT
                <Send className="w-3 h-3" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success-view-block"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h4 className="font-serif text-lg font-bold text-slate-900 tracking-wide mb-1">
                Formulir Tersimpan!
              </h4>
              <p className="font-sans text-[11px] text-slate-500 leading-relaxed max-w-sm mb-4">
                Terima kasih, rencana proyek Anda untuk <strong className="text-[#C2185B]">{activeSubmission?.service}</strong> sudah dicatat. Silakan teruskan ke WhatsApp untuk respon instan.
              </p>

              <div className="w-full flex flex-col gap-2">
                <a
                  href={activeSubmission?.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-cursor w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-[10.5px] tracking-wider font-extrabold uppercase transition-colors flex items-center justify-center gap-2 rounded-full"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  KIRIM KE WHATSAPP SEKARANG
                </a>

                <button
                  onClick={handleReset}
                  className="interactive-cursor w-full py-2 bg-transparent text-slate-500 border border-slate-200 hover:border-slate-800 hover:text-slate-800 font-sans text-[10px] tracking-wider font-bold uppercase transition-all rounded-full"
                >
                  KIRIM FORM LAIN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* COMPREHENSIVE DETAILED FORM POPUP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 overflow-y-auto py-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              className="bg-[#FFF8F2] border-2 border-[#D4AF37] p-5 rounded-[22px] shadow-[0_24px_64px_rgba(194,24,91,0.3)] max-w-lg w-full relative z-10 font-sans flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
                <div className="flex flex-col text-left">
                  <span className="font-serif text-[10px] tracking-[0.18em] font-extrabold text-[#C2185B] uppercase leading-none mb-1">
                    DETAIL FORMULIR
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-800 leading-none">
                    Rencana Kolaborasi Lengkap
                  </h4>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="interactive-cursor p-1 hover:bg-black/5 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form inside modal */}
              <form onSubmit={handleModalSubmit} className="space-y-3.5 text-left">
                {/* 1. Nama Lengkap */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                    Nama Lengkap <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={modalData.name}
                    onChange={handleModalChange}
                    required
                    placeholder="Contoh: Anastasia Kirana"
                    className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full"
                  />
                </div>

                {/* 2. Nama Bisnis / Brand */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                    Nama Bisnis / Brand (Opsional)
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={modalData.business}
                    onChange={handleModalChange}
                    placeholder="Contoh: Kirana Wedding Organizer"
                    className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full"
                  />
                </div>

                {/* Row Grid: Service & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Layanan */}
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                      Layanan
                    </label>
                    <select
                      name="service"
                      value={modalData.service}
                      onChange={handleModalChange}
                      className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full"
                    >
                      {servicesList.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Kontak */}
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                      WhatsApp / Email <span className="text-[#C2185B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={modalData.contact}
                      onChange={handleModalChange}
                      required
                      placeholder="Contoh: +62 812-xxxx-xxxx"
                      className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full"
                    />
                  </div>
                </div>

                {/* Row Grid: Timeline & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Timeline */}
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                      Timeline Proyek
                    </label>
                    <select
                      name="timeline"
                      value={modalData.timeline}
                      onChange={handleModalChange}
                      className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full"
                    >
                      <option value="1-2 Minggu">1-2 Minggu (Express)</option>
                      <option value="3-4 Minggu">3-4 Minggu (Regular)</option>
                      <option value="Lebih dari 1 Bulan">Lebih dari 1 Bulan</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                      Ekspektasi Budget
                    </label>
                    <select
                      name="budget"
                      value={modalData.budget}
                      onChange={handleModalChange}
                      className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full"
                    >
                      <option value="Mulai Rp249k">Mulai Rp249.000</option>
                      <option value="Rp500k - Rp1 Juta">Rp500.000 - Rp1.000.000</option>
                      <option value="Diatas Rp1 Juta">Diatas Rp1.000.000</option>
                    </select>
                  </div>
                </div>

                {/* Brief Desain */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[8.5px] tracking-wider text-slate-400 uppercase font-bold">
                    Brief Rencana Desain
                  </label>
                  <textarea
                    name="brief"
                    value={modalData.brief}
                    onChange={handleModalChange}
                    rows={3}
                    placeholder="Warna kesukaan, target audiens, website referensi, dll..."
                    className="bg-white border border-silver-brand/35 px-3 py-2 font-sans text-xs text-slate-800 focus:outline-none focus:border-[#C2185B] transition-colors rounded-xl w-full resize-none leading-relaxed"
                  />
                </div>

                {/* Action buttons inside modal */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="interactive-cursor flex-1 py-2.5 bg-transparent border border-slate-300 text-slate-600 hover:text-slate-800 font-sans text-[11px] font-bold tracking-widest uppercase rounded-full transition-all text-center"
                  >
                    KEMBALI
                  </button>
                  <button
                    type="submit"
                    className="interactive-cursor flex-1 py-2.5 bg-[#C2185B] hover:bg-[#A01048] text-white font-sans text-[11px] font-extrabold tracking-widest uppercase rounded-full transition-all shadow-md text-center"
                  >
                    KIRIM FORM LENGKAP
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
