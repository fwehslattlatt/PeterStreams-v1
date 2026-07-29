import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MediaCard from "./MediaCard";

export default function ContentRow({ title, items, onPlay }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <div className="mb-8 group/row">
      <h2 className="text-white font-bold text-lg md:text-xl mb-3 px-6 md:px-12">{title}</h2>
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <ChevronLeft size={18} className="text-white" />
          </div>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <ChevronRight size={18} className="text-white" />
          </div>
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item) => (
            <div key={item.id + item.title} style={{ scrollSnapAlign: "start" }}>
              <MediaCard item={item} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}