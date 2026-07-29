import React from "react";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

export default function HeroBanner({ featured, onPlay, onInfo }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "85vh", minHeight: "500px" }}>
      {/* Backdrop image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${featured.backdropUrl})` }}
      />

      {/* Gradients */}
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 pb-16 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg"
        >
          {featured.logoUrl ? (
            <img
              src={featured.logoUrl}
              alt={featured.title}
              className="max-w-[280px] md:max-w-[380px] mb-5 drop-shadow-2xl"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
          ) : null}
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-3 drop-shadow-2xl"
            style={{ display: featured.logoUrl ? "none" : "block" }}
          >
            {featured.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold text-green-400">{featured.match}% Match</span>
            <span className="text-sm text-white/60">{featured.year}</span>
            <span className="border border-white/30 text-white/70 text-xs px-1.5 py-0.5 rounded">HD</span>
            {featured.genres?.slice(0, 2).map(g => (
              <span key={g} className="text-white/50 text-xs">{g}</span>
            ))}
          </div>

          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-md line-clamp-3 drop-shadow">
            {featured.description}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onPlay(featured)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black text-sm md:text-base transition-all hover:scale-105 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "white" }}
            >
              <Play size={20} fill="black" />
              Play
            </button>
            <button
              onClick={() => onInfo && onInfo(featured)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm md:text-base bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <Info size={18} />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}