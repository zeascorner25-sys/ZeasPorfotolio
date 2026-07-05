import React, { useState, useEffect } from "react";

export default function TopInfoBar() {
  const [greetingWord, setGreetingWord] = useState("Pagi");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreetingWord("Pagi");
      else if (hour >= 12 && hour < 15) setGreetingWord("Siang");
      else if (hour >= 15 && hour < 18.5) setGreetingWord("Sore");
      else setGreetingWord("Malam");
    };
    updateGreeting();
    // Update every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const rawMessages = [
    `Selamat ${greetingWord}, semoga harimu penuh inspirasi.`,
    "Terima kasih telah mengunjungi Zeas Creative Corner.",
    "Website elegan dimulai dari desain yang berkelas.",
    "Mari wujudkan identitas digital yang premium.",
    "Setiap ide layak memiliki tampilan yang memukau."
  ];

  // Repeat the messages to make a seamless loop
  const marqueeItems = [...rawMessages, ...rawMessages, ...rawMessages];

  return (
    <div className="w-full h-[36px] bg-[#FFF8F2]/95 backdrop-blur-[12px] border-b border-silver-brand/25 flex items-center fixed top-0 left-0 z-[9999] shadow-[0_2px_12px_rgba(194,24,91,0.03)] overflow-hidden">
      <div className="w-full h-full flex items-center overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center py-1">
          {marqueeItems.map((message, idx) => (
            <div key={idx} className="flex items-center gap-2.5 mx-8 shrink-0">
              <span className="text-[#C2185B] text-xs font-semibold">✨</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-slate-600 font-medium tracking-wide">
                {message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
