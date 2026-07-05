import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, Sparkles, Check, Info } from "lucide-react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showUnsupportedModal, setShowUnsupportedModal] = useState(false);

  useEffect(() => {
    // Check if the prompt was already captured globally
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      console.log("[PWA] Retrieved globally captured deferredPrompt!");
    }

    // Listen to custom event in case it is set slightly after mount
    const handleGlobalPrompt = () => {
      if ((window as any).deferredPrompt) {
        setDeferredPrompt((window as any).deferredPrompt);
        console.log("[PWA] Set deferredPrompt from global custom event!");
      }
    };
    window.addEventListener("pwa-prompt-available", handleGlobalPrompt);

    // 1. Check if the application is already running in standalone (installed) mode
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Listen for the 'beforeinstallprompt' event from supporting browsers as backup
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPrompt = e;
      console.log("[PWA] Local beforeinstallprompt event captured!");
    };

    // 3. Listen for the 'appinstalled' event
    const handleAppInstalled = () => {
      console.log("[PWA] Zeas Creative Corner installed successfully!");
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("pwa-prompt-available", handleGlobalPrompt);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Browser supports PWA and prompt is ready
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`[PWA] User response to installation prompt: ${outcome}`);
        setDeferredPrompt(null);
        (window as any).deferredPrompt = null;
      } catch (err) {
        console.error("[PWA] Installation prompt failed or was dismissed:", err);
        setShowUnsupportedModal(true);
      }
    } else {
      // Browser does not support PWA or prompt is not ready (e.g., iOS Safari or non-Chromium, or inside iframe preview)
      setShowUnsupportedModal(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Floating Pill Button - Always elegant, minimal, and premium */}
      <div id="pwa-install-trigger" className="fixed bottom-6 left-6 z-[9990] select-none font-sans">
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05, translateY: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          onClick={handleInstallClick}
          className="interactive-cursor flex items-center gap-2.5 px-4.5 py-2.5 bg-[#FFF8F2]/95 backdrop-blur-md border border-[#D4AF37]/45 hover:border-[#C2185B] shadow-[0_6px_24px_rgba(194,24,91,0.12)] rounded-full text-slate-800 transition-colors duration-300 group"
        >
          <div className="w-5.5 h-5.5 rounded-full bg-[#C2185B] flex items-center justify-center text-white">
            <Download className="w-3 h-3 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-[10px] tracking-[0.12em] font-extrabold uppercase text-[#C2185B]">
              Instal Aplikasi
            </span>
            <span className="text-[8.5px] text-slate-500 font-bold mt-0.5 leading-none">
              PWA Instant Setup
            </span>
          </div>
        </motion.button>
      </div>

      {/* Unsupported Custom Premium Modal */}
      <AnimatePresence>
        {showUnsupportedModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUnsupportedModal(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="bg-[#FFF8F2] border-2 border-[#D4AF37] p-5 rounded-[22px] shadow-[0_16px_48px_rgba(194,24,91,0.25)] max-w-sm w-full relative z-10 font-sans flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C2185B]/10 border border-[#C2185B]/20 flex items-center justify-center text-[#C2185B]">
                    <Info className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-[11px] tracking-[0.15em] font-extrabold text-[#C2185B] uppercase">
                    PWA NOTIFIKASI
                  </span>
                </div>
                <button
                  onClick={() => setShowUnsupportedModal(false)}
                  className="interactive-cursor p-1 hover:bg-black/5 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Message block requested by user */}
              <div className="text-left space-y-2">
                <h4 className="font-serif text-[15px] font-bold text-slate-900 leading-snug">
                  PWA Belum Didukung Langsung
                </h4>
                <p className="text-[11.5px] text-slate-600 leading-relaxed font-medium">
                  Silakan gunakan <strong className="text-slate-800">Chrome Android</strong> lalu pilih <strong className="text-[#C2185B]">"Tambahkan ke Layar Utama"</strong>.
                </p>
                <div className="bg-[#FFF5F7] border border-[#C2185B]/10 p-2.5 rounded-xl text-[10px] text-slate-500 space-y-1 mt-1">
                  <span className="block font-bold text-[#C2185B] mb-0.5">💡 Tips Safari iOS:</span>
                  <span>Tekan tombol <strong>Bagikan (Share)</strong> lalu pilih <strong>"Tambahkan ke Layar Utama"</strong>.</span>
                </div>
              </div>

              <button
                onClick={() => setShowUnsupportedModal(false)}
                className="interactive-cursor w-full py-2 px-4 bg-[#C2185B] hover:bg-[#A01048] text-white font-sans text-xs tracking-widest font-extrabold uppercase transition-all duration-300 rounded-full text-center mt-1 border border-[#C2185B] shadow-md"
              >
                SAYA MENGERTI
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
