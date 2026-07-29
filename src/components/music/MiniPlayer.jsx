import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, List, ChevronUp, Volume2 } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { formatDuration } from "@/lib/hifi";

export default function MiniPlayer() {
  const {
    currentTrack, isPlaying, isBuffering, currentTime, duration, volume,
    togglePlay, seek, skipNext, skipPrev, dispatch,
  } = useMusicPlayer();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[400] bg-black/98 border-t border-green-500/30 backdrop-blur-xl"
        style={{ boxShadow: "0 -4px 20px rgba(0,255,65,0.06)" }}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/20 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            seek(pct * duration);
          }}
        >
          <div
            className="h-full bg-green-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          {/* Artwork + track info */}
          <button
            className="flex items-center gap-3 flex-1 min-w-0 text-left"
            onClick={() => dispatch({ type: "SET_EXPANDED", value: true })}
          >
            {currentTrack.cover ? (
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-11 h-11 object-cover flex-shrink-0 border border-green-500/30"
              />
            ) : (
              <div className="w-11 h-11 bg-green-950/30 border border-green-500/20 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-green-400 text-xs font-mono font-bold truncate">{currentTrack.title}</p>
              <p className="text-green-400/50 text-xs font-mono truncate">{currentTrack.artist}</p>
            </div>
            <ChevronUp size={16} className="text-green-400/40 flex-shrink-0" />
          </button>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={skipPrev}
              className="w-9 h-9 flex items-center justify-center text-green-400/50 hover:text-green-400 transition-colors"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 border border-green-400/60 bg-green-400/10 hover:bg-green-400/20 flex items-center justify-center text-green-400 hover:scale-105 active:scale-95 transition-all"
            >
              {isBuffering ? (
                <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
            </button>
            <button
              onClick={skipNext}
              className="w-9 h-9 flex items-center justify-center text-green-400/50 hover:text-green-400 transition-colors"
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* Queue + time — hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-green-400/40 text-xs font-mono">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </span>
            <div className="flex items-center gap-1.5">
              <Volume2 size={13} className="text-green-400/40" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => dispatch({ type: "SET_VOLUME", volume: parseFloat(e.target.value) })}
                className="w-20 accent-green-400"
              />
            </div>
            <button
              onClick={() => dispatch({ type: "TOGGLE_QUEUE" })}
              className="w-9 h-9 flex items-center justify-center text-green-400/40 hover:text-green-400 transition-colors"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}