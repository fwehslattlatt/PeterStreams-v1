import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Star, Calendar } from "lucide-react";
import { backdropUrl, posterUrl } from "@/lib/tmdb";

export default function HackerHero({ items, onPlay, onInfo }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!items?.length) return;
    const t = setInterval(() => setIdx(i => (i + 1) % Math.min(items.length, 5)), 8000);
    return () => clearInterval(t);
  }, [items]);

  if (!items?.length) return (
    <div className="w-full h-[60vh] bg-black border-b border-green-500/10 flex items-center justify-center">
      <span className="text-green-400/40 font-mono animate-pulse">LOADING FEED...</span>
    </div>
  );

  const item = items[idx];
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const rating = item.vote_average?.toFixed(1);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "75vh", minHeight: "450px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {item.backdrop_path ? (
            <img src={backdropUrl(item.backdrop_path)} className="w-full h-full object-cover opacity-30" alt="" />
          ) : (
            <div className="w-full h-full bg-green-950/10" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.02) 3px, rgba(0,255,65,0.02) 4px)" }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-12">
        <motion.div
          key={`content-${idx}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-500 font-mono text-xs animate-pulse">●</span>
            <span className="text-green-400/60 font-mono text-xs uppercase tracking-widest">Now Streaming</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-black text-green-300 mb-3 leading-tight" style={{ textShadow: "0 0 30px rgba(0,255,65,0.4)" }}>
            {title}
          </h1>
          <div className="flex items-center gap-3 mb-3 font-mono text-xs text-green-400/70">
            {year && <span className="flex items-center gap-1"><Calendar size={11} />{year}</span>}
            {rating && <span className="flex items-center gap-1 text-yellow-400"><Star size={11} fill="currentColor" />{rating}</span>}
            <span className="border border-green-500/40 px-2 py-0.5 uppercase">{item.media_type || "movie"}</span>
          </div>
          <p className="text-green-400/60 font-mono text-sm leading-relaxed mb-6 line-clamp-2">{item.overview}</p>
          <div className="flex gap-3">
            <button
              onClick={() => onPlay(item)}
              className="group relative flex items-center gap-2 px-5 py-2.5 border border-green-400 text-green-400 hover:text-black font-mono font-bold text-sm uppercase tracking-wider overflow-hidden transition-colors duration-300"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 bg-green-400" />
              <Play size={14} className="relative z-10" fill="currentColor" />
              <span className="relative z-10">PLAY</span>
            </button>
            <button
              onClick={() => onInfo(item)}
              className="flex items-center gap-2 px-5 py-2.5 border border-green-500/40 text-green-400/70 hover:text-green-400 hover:border-green-400/70 font-mono font-bold text-sm uppercase tracking-wider transition-all"
            >
              <Info size={14} />
              INFO
            </button>
          </div>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-6 flex gap-1.5">
        {Array.from({ length: Math.min(items.length, 5) }).map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-green-400 w-4" : "bg-green-400/30"}`} />
        ))}
      </div>
    </div>
  );
}