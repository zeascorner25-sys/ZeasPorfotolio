import { useState } from "react";

export default function RunningText() {
  const text = "ZEAS CREATIVE CORNER • WEBSITE • LANDING PAGE • VIDEO PROMOSI • PRODUK DIGITAL • DESAIN LINK • UNDANGAN WEBSITE •";
  
  // Repeat the text string multiple times to ensure continuous, seamless marquee
  const repeatedText = Array(10).fill(text);

  return (
    <div className="w-full bg-fuchsia-brand py-3 md:py-4 overflow-hidden border-y border-soft-pink/20 select-none cursor-pointer">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div
          className="flex gap-8 items-center px-4 animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] transition-all duration-300"
          style={{ animationDuration: "40s" }}
        >
          {repeatedText.map((chunk, index) => (
            <span 
              key={index} 
              className="font-serif text-xs md:text-sm tracking-[0.25em] text-cream font-medium"
            >
              {chunk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
