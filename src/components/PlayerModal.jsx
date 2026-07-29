import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";

function getVidlinkUrl(item) {
  const mediaType = item?.media_type || item?.type;
  return mediaType === "movie"
    ? `https://vidlink.pro/movie/${item.id}`
    : `https://vidlink.pro/tv/${item.id}/1/1`;
}

export default function PlayerModal({ item, onClose, liveChannel }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const src = liveChannel ? liveChannel.famelackUrl : getVidlinkUrl(item);
  const title = liveChannel ? liveChannel.name : (item?.title || item?.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center gap-4 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
        <button onClick={onClose} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium hidden sm:block">Back</span>
        </button>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          {liveChannel && <p className="text-white/50 text-sm">Live • Ch {liveChannel.number}</p>}
          {item && <p className="text-white/50 text-sm capitalize">{item.type} • {item.year}</p>}
        </div>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
          <X size={18} />
        </button>
      </div>

      {/* Player */}
      <div className="flex-1 relative bg-black">
        <iframe
          src={src}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
        />
      </div>
    </motion.div>
  );
}