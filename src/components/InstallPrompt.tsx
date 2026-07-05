import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, Monitor, Smartphone, Sparkles, ExternalLink, HelpCircle, Check } from "lucide-react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const [activeTab, setActiveTab] = useState<"android" | "ios" | "desktop">("android");

  useEffect(() => {
    // 1. Detect if the app is currently rendered inside an iframe (like AI Studio preview)
    const insideIframe = window.self !== window.top;
    setIsIframe(insideIframe);

    // 2. Check if the application is already running in standalone (installed) mode
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 3. Listen for the 'beforeinstallprompt' event from supporting browsers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Automatically expand on supported platforms to catch user attention
      setIsExpanded(true);
    };

    // 4. Listen for the 'appinstalled' event
    const handleAppInstalled = () => {
      console.log("[PWA] Zeas Creative Corner installed successfully!");
      setDeferredPrompt(null);
      setIsExpanded(false);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Open the app in a new browser window/tab to bypass iframe sandboxing
  const handleOpenInNewTab = () => {
    window.open(window.location.href, "_blank");
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response to installation prompt: ${outcome}`);
    setDeferredPrompt(null);
    setIsExpanded(false);
  };

  // If the app is already running in native/installed mode, don't show the prompt
  if (isInstalled) return null;

  return (
    <div id="pwa-install-prompt" className="fixed bottom-6 left-6 z-40 select-none max-w-[350px] w-[calc(100vw-48px)] flex flex-col items-start font-sans">
      <AnimatePresence mode="wait">
        
        {/* A. COMPACT COLLAPSED BUTTON */}
        {!isExpanded ? (
          <motion.button
            key="collapsed-install-btn"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => setIsExpanded(true)}
            className="interactive-cursor flex items-center gap-2.5 px-5 py-3 bg-[#FFF8F2]/90 backdrop-blur-md border border-[#D4AF37]/35 hover:border-[#C2185B]/40 shadow-[0_6px_24px_rgba(194,24,91,0.12)] rounded-full text-slate-800 transition-colors duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#C2185B] flex items-center justify-center text-[#FFF8F2]">
              <Download className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-[10px] tracking-[0.1em] font-extrabold uppercase text-[#C2185B]">
                Instal Aplikasi
              </span>
              <span className="text-[9px] text-slate-500 font-semibold mt-0.5">
                Mendukung Android, iOS & PC
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded-install-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-[#FFF8F2]/95 backdrop-blur-lg border border-[#D4AF37]/35 shadow-[0_12px_40px_rgba(194,24,91,0.2)] p-4 rounded-2xl flex flex-col gap-3 w-full"
          >
            {/* Header section */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E6] border border-[#D4AF37]/35 flex items-center justify-center shadow-inner">
                  <span className="font-serif font-black text-[#C2185B] text-lg">Z</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-[10px] tracking-[0.15em] font-extrabold uppercase text-[#C2185B] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    INSTALLER UTILITY
                  </span>
                  <h4 className="font-serif text-xs font-bold text-slate-800 leading-tight">
                    Zeas Creative Corner PWA
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="interactive-cursor p-1.5 hover:bg-black/5 rounded-full transition-colors"
                title="Tutup"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {/* IFRAME WARNING (Sangat Krusial Untuk Keberhasilan AI Studio Preview!) */}
            {isIframe ? (
              <div className="bg-[#C2185B]/5 border border-[#C2185B]/20 p-2.5 rounded-xl flex flex-col gap-2">
                <p className="text-[10px] text-[#C2185B] text-left font-medium leading-relaxed">
                  ⚠️ <strong>Iframe Terdeteksi:</strong> Browser membatasi instalasi langsung di dalam jendela pratinjau ini. Klik tombol di bawah untuk membukanya di tab baru terlebih dahulu.
                </p>
                <button
                  onClick={handleOpenInNewTab}
                  className="interactive-cursor bg-[#C2185B] hover:bg-[#A01048] text-[#FFF8F2] text-[9.5px] font-bold tracking-widest uppercase py-2 px-3 rounded-none flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  BUKA DI TAB BARU
                </button>
              </div>
            ) : null}

            {/* ACTION DIRECT BUTTON (Jika Browser Mendukung Event secara Native) */}
            {deferredPrompt ? (
              <div className="flex flex-col gap-2">
                <p className="text-[10.5px] text-slate-500 text-left leading-relaxed">
                  Perangkat Anda siap mendukung instalasi instan. Klik tombol di bawah ini:
                </p>
                <button
                  onClick={handleInstallClick}
                  className="interactive-cursor bg-[#C2185B] text-[#FFF8F2] hover:bg-[#A01048] text-[10px] font-bold tracking-widest uppercase py-2.5 px-3 rounded-none shadow-sm flex items-center justify-center gap-2 transition-all duration-300 border border-[#C2185B]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Instal Zeas Creative Corner
                </button>
              </div>
            ) : (
              /* MANUAL STEP-BY-STEP GUIDES (Jika tidak terpicu otomatis seperti iOS Safari/Chrome non-Chromium) */
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-[10.5px] text-left">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Cara Instalasi Manual:</span>
                </div>

                {/* Platform Selection Tabs */}
                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveTab("android")}
                    className={`flex-1 text-[9.5px] font-bold py-1 px-1.5 rounded-md transition-all ${
                      activeTab === "android"
                        ? "bg-white text-[#C2185B] shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Android
                  </button>
                  <button
                    onClick={() => setActiveTab("ios")}
                    className={`flex-1 text-[9.5px] font-bold py-1 px-1.5 rounded-md transition-all ${
                      activeTab === "ios"
                        ? "bg-white text-[#C2185B] shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    iOS/iPhone
                  </button>
                  <button
                    onClick={() => setActiveTab("desktop")}
                    className={`flex-1 text-[9.5px] font-bold py-1 px-1.5 rounded-md transition-all ${
                      activeTab === "desktop"
                        ? "bg-white text-[#C2185B] shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Desktop/PC
                  </button>
                </div>

                {/* Step Guides Content */}
                <div className="bg-white/40 border border-slate-200/40 rounded-xl p-2.5 text-left text-[10px] text-slate-600 space-y-1.5 min-h-[72px]">
                  {activeTab === "android" && (
                    <>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">1.</span>
                        <span>Buka browser <strong>Chrome</strong> di HP Anda.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">2.</span>
                        <span>Ketuk ikon menu titik tiga <strong>(⋮)</strong> di kanan atas.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">3.</span>
                        <span>Pilih <strong>"Instal Aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</span>
                      </div>
                    </>
                  )}

                  {activeTab === "ios" && (
                    <>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">1.</span>
                        <span>Buka browser <strong>Safari</strong> di iPhone/iPad Anda.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">2.</span>
                        <span>Ketuk tombol <strong>Bagikan (Share)</strong> di bar bagian bawah.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">3.</span>
                        <span>Pilih menu <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.</span>
                      </div>
                    </>
                  )}

                  {activeTab === "desktop" && (
                    <>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">1.</span>
                        <span>Gunakan browser <strong>Chrome/Edge</strong> di laptop Anda.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">2.</span>
                        <span>Klik ikon instalasi <strong>⊕ (Install)</strong> di ujung kanan kolom alamat URL (address bar).</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#C2185B] font-bold">3.</span>
                        <span>Atau buka menu titik tiga <strong>(...)</strong> dan pilih <strong>"Simpan dan bagikan" → "Instal Aplikasi"</strong>.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Quality badge footer */}
            <div className="border-t border-slate-200/50 pt-2 flex items-center justify-between text-[8px] text-slate-400 font-mono tracking-wider">
              <span>DESIGNED BY ZEAS CORNER</span>
              <span className="flex items-center gap-1 text-emerald-600 font-sans font-bold">
                <Check className="w-2.5 h-2.5" /> ONLINE & OFFLINE READY
              </span>
            </div>

          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}
