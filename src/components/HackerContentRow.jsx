import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import HackerMediaCard from "./HackerMediaCard";

export default function HackerContentRow({ title, fetchFn, onSelect }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchFn()
      .then(data => {
        setItems(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 600, behavior: "smooth" });

  return (
    <div className="mb-8 group/row">
      <div className="flex items-center gap-3 px-4 md:px-10 mb-3">
        <span className="text-green-500 font-mono text-xs">&gt;</span>
        <h2 className="text-green-400 font-mono font-bold text-sm md:text-base uppercase tracking-wider">{title}</h2>
        <div className="flex-1 h-px bg-green-500/20" />
      </div>

      <div className="relative">
        <button onClick={() => scroll(-1)} className="absolute left-0 top-0 bottom-4 z-10 w-10 bg-gradient-to-r from-black to-transparent flex items-center justify-start pl-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <ChevronLeft size={20} className="text-green-400" />
        </button>
        <button onClick={() => scroll(1)} className="absolute right-0 top-0 bottom-4 z-10 w-10 bg-gradient-to-l from-black to-transparent flex items-center justify-end pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <ChevronRight size={20} className="text-green-400" />
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-10 pb-2" style={{ scrollSnapType: "x mandatory" }}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-32 md:w-40">
                <div className="aspect-[2/3] bg-green-950/20 border border-green-500/10 rounded animate-pulse" />
              </div>
            ))
          ) : (
            items.map(item => (
              <HackerMediaCard key={item.id} item={item} onClick={onSelect} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}