import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ChevronDown } from "lucide-react";

export default function MediaCard({ item, onPlay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer"
      style={{ width: "160px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1, zIndex: hovered ? 20 : 1 }}
        transition={{ duration: 0.25 }}
        className="relative rounded-md overflow-hidden bg-white/5"
        style={{ aspectRatio: "2/3", position: "relative" }}
      >
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/200x300/1a1a1a/555?text=${encodeURIComponent(item.title)}`;
          }}
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 flex flex-col justify-end p-3"
            >
              <div className="flex gap-2 mb-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onPlay(item); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold transition-transform hover:scale-110"
                  style={{ backgroundColor: "white" }}
                >
                  <Play size={14} fill="black" />
                </button>
              </div>
              <p className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1">{item.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-green-400">{item.match}%</span>
                <span className="text-[10px] text-white/50">{item.year}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Match badge always visible at top */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/70 text-[9px] font-bold text-green-400 px-1.5 py-0.5 rounded">
            {item.match}%
          </span>
        </div>
      </motion.div>

      {!hovered && (
        <p className="text-white/70 text-xs mt-2 font-medium leading-tight line-clamp-2 px-0.5">
          {item.title}
        </p>
      )}
    </div>
  );
}