import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tv } from "lucide-react";
import { getChannelLogo } from "@/data/channelLogos";

export default function ChannelCard({ channel, onClick }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getChannelLogo(channel.name) || channel.image;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(channel)}
      className="flex flex-col bg-black border border-green-500/20 hover:border-green-400/60 hover:bg-green-400/5 transition-all group overflow-hidden"
    >
      <div className="relative w-full aspect-video bg-gray-400 overflow-hidden flex items-center justify-center">
        {!imgError && logoUrl ? (
          <img
            src={logoUrl}
            alt={channel.name}
            className="w-full h-full object-contain transition-all p-3"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <Tv size={28} className="text-green-400/20" />
        )}
        {channel.status === "online" && (
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 bg-black/80 border border-red-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-mono text-[9px] font-bold uppercase tracking-widest">LIVE</span>
          </div>
        )}
      </div>
      <div className="px-2.5 py-2 text-left">
        <p className="text-green-400/80 group-hover:text-green-400 font-mono text-xs leading-tight line-clamp-2 transition-colors">
          {channel.name}
        </p>
      </div>
    </motion.button>
  );
}