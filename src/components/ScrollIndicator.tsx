import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function ScrollIndicator() {
  const handleScrollDown = () => {
    const el = document.getElementById("layanan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none z-20 mt-8 lg:mt-12">
      <button
        onClick={handleScrollDown}
        className="interactive-cursor flex flex-col items-center gap-2 group transition-all duration-300 hover:opacity-100 opacity-70"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] font-medium text-slate-500 uppercase group-hover:text-fuchsia-brand transition-colors">
          Scroll untuk Menjelajah
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut"
          }}
          className="w-8 h-8 rounded-full border border-silver-brand/30 bg-white shadow-sm flex items-center justify-center group-hover:border-fuchsia-brand group-hover:shadow-md transition-all duration-300"
        >
          <ArrowDown className="w-4 h-4 text-fuchsia-brand" />
        </motion.div>
      </button>
    </div>
  );
}
