import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function AlbumCard({ album, onClick }) {
  const [imgError, setImgError] = useState(false);

  const cover = album?.artworkURL ?? album?.cover ?? album?.image?.["640x640"] ?? null;
  const title = album?.title ?? album?.name;
  const artist = typeof album?.artist === "string" ? album.artist : (album?.artist?.name ?? album?.artists?.[0]?.name ?? "");

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative flex flex-col gap-3 text-left w-full"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-green-950/20 border border-green-500/20 group-hover:border-green-400/50 transition-colors">
        {cover && !imgError ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-green-950/40 flex items-center justify-center">
            <span className="text-green-400/20 text-4xl font-mono">♪</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center">
          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
            <Play size={22} fill="currentColor" className="text-green-400 ml-0.5" />
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-green-400/90 text-xs font-mono font-bold truncate leading-snug">{title}</p>
        <p className="text-green-400/40 text-xs font-mono truncate mt-0.5">{artist}</p>
      </div>
    </motion.button>
  );
}