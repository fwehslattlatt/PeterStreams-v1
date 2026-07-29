import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SectionRow({ title, children }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 md:px-10">
        <h2 className="text-green-400 font-mono font-bold text-sm uppercase tracking-widest">{title}</h2>
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            className="w-7 h-7 flex items-center justify-center border border-green-500/30 text-green-400/50 hover:text-green-400 hover:border-green-400/50 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-7 h-7 flex items-center justify-center border border-green-500/30 text-green-400/50 hover:text-green-400 hover:border-green-400/50 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-10 pb-2"
      >
        {children}
      </div>
    </section>
  );
}