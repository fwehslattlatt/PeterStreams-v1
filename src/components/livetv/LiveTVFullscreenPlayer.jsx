import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";

export default function LiveTVFullscreenPlayer({ channel, onClose }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, [channel?.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!channel) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-black flex flex-col"
    >
      {/* Video / iframe */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
            <Loader2 size={36} className="text-green-400 animate-spin" />
            <p className="text-green-400/60 font-mono text-sm">Loading {channel.name}...</p>
          </div>
        )}
        <iframe
          src={channel.playerUrl}
          title={channel.name}
          className="w-full h-full"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Non-intrusive exit button - top right corner */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 bg-black/70 hover:bg-red-500/30 border border-green-500/30 hover:border-red-400/60 text-green-400/60 hover:text-red-300 transition-all backdrop-blur-sm"
        title="Exit (Esc)"
      >
        <X size={16} />
      </button>

      {/* Channel label - top left, minimal */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-2.5 py-1.5 bg-black/70 backdrop-blur-sm border border-green-500/20 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-green-400/80 font-mono text-xs font-bold uppercase tracking-widest truncate max-w-[160px]">
          {channel.name}
        </span>
      </div>
    </motion.div>
  );
}