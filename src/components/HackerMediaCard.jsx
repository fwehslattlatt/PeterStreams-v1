import React, { useState } from "react";
import { Play, Star } from "lucide-react";
import { posterUrl } from "@/lib/tmdb";

export default function HackerMediaCard({ item, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const rating = item.vote_average?.toFixed(1);
  const poster = posterUrl(item.poster_path);

  return (
    <div
      onClick={() => onClick(item)}
      className="group relative cursor-pointer flex-shrink-0 w-32 md:w-40"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="relative overflow-hidden rounded border border-green-500/20 group-hover:border-green-400/70 transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]">
        {/* Poster */}
        <div className="aspect-[2/3] bg-green-950/30 relative">
          {poster ? (
            <img
              src={poster}
              alt={title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-green-400/30 font-mono text-xs text-center px-2">{title}</span>
            </div>
          )}
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.04) 3px, rgba(0,255,65,0.04) 4px)" }}
          />
          {/* Hover play */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-10 h-10 border border-green-400 flex items-center justify-center">
              <Play size={18} fill="#00ff41" className="text-green-400 ml-0.5" />
            </div>
          </div>
          {/* Rating badge */}
          {rating && (
            <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/80 border border-green-500/30 px-1 py-0.5 font-mono text-[10px] text-yellow-400">
              <Star size={8} fill="currentColor" />
              {rating}
            </div>
          )}
        </div>
      </div>
      <div className="mt-1.5 px-0.5">
        <p className="text-green-300/90 font-mono text-[11px] leading-tight truncate">{title}</p>
        {year && <p className="text-green-400/40 font-mono text-[10px]">{year}</p>}
      </div>
    </div>
  );
}