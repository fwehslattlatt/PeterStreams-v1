import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
  Heart, Volume2, List, ChevronDown,
} from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { formatDuration, getRecommendations, normalizeTrack } from "@/lib/hifi";
import QueuePanel from "./QueuePanel";

export default function ExpandedPlayer() {
  const {
    currentTrack, isPlaying, isBuffering, currentTime, duration, volume,
    queue, shuffle, repeat, favorites,
    togglePlay, seek, skipNext, skipPrev, dispatch,
  } = useMusicPlayer();

  const [showQueue, setShowQueue] = useState(false);
  const [relatedTracks, setRelatedTracks] = useState([]);

  const isFav = favorites.some(t => t.id === currentTrack?.id);

  useEffect(() => {
    if (!currentTrack?.id) return;
    getRecommendations(currentTrack.id).then(recs => {
      setRelatedTracks(recs.slice(0, 8).map(r => normalizeTrack(r.item ?? r)).filter(Boolean));
    }).catch(() => {});
  }, [currentTrack?.id]);

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[500] bg-black overflow-y-auto"
    >
      {/* Blurred cover bg */}
      {currentTrack.cover && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentTrack.cover})`, filter: "blur(60px) saturate(200%)" }}
        />
      )}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <button
            onClick={() => dispatch({ type: "SET_EXPANDED", value: false })}
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ChevronDown size={24} />
          </button>
          <p className="text-white/60 text-xs uppercase tracking-widest">Now Playing</p>
          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`w-10 h-10 flex items-center justify-center transition-colors ${showQueue ? "text-white" : "text-white/40 hover:text-white"}`}
          >
            <List size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 px-6 pb-6 flex-1">
          {/* Left: Player */}
          <div className="flex-1 flex flex-col items-center gap-6 max-w-md mx-auto w-full lg:mx-0">
            {/* Cover */}
            <motion.div
              key={currentTrack.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-[320px] aspect-square"
            >
              {currentTrack.cover ? (
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-white/10" />
              )}
            </motion.div>

            {/* Title + fav */}
            <div className="w-full flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-white text-xl font-bold truncate">{currentTrack.title}</h2>
                <p className="text-white/50 text-sm truncate mt-0.5">{currentTrack.artist}</p>
                {currentTrack.album && (
                  <p className="text-white/30 text-xs truncate mt-0.5">{currentTrack.album}</p>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: "TOGGLE_FAVORITE", track: currentTrack })}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
              >
                <Heart
                  size={22}
                  className={isFav ? "text-red-500" : "text-white/40"}
                  fill={isFav ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Progress */}
            <div className="w-full space-y-1">
              <div
                className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  seek(pct * duration);
                }}
              >
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between text-white/40 text-xs font-mono">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            {/* Main controls */}
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => dispatch({ type: "TOGGLE_SHUFFLE" })}
                className={`w-10 h-10 flex items-center justify-center transition-colors ${shuffle ? "text-white" : "text-white/30"}`}
              >
                <Shuffle size={20} />
              </button>

              <button onClick={skipPrev} className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <SkipBack size={26} />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform shadow-2xl"
              >
                {isBuffering ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause size={24} fill="currentColor" />
                ) : (
                  <Play size={24} fill="currentColor" />
                )}
              </button>

              <button onClick={skipNext} className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <SkipForward size={26} />
              </button>

              <button
                onClick={() => dispatch({ type: "TOGGLE_REPEAT" })}
                className={`w-10 h-10 flex items-center justify-center transition-colors ${repeat !== "none" ? "text-white" : "text-white/30"}`}
              >
                {repeat === "one" ? <Repeat1 size={20} /> : <Repeat size={20} />}
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 w-full">
              <Volume2 size={16} className="text-white/30 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => dispatch({ type: "SET_VOLUME", volume: parseFloat(e.target.value) })}
                className="flex-1 accent-white"
              />
            </div>
          </div>

          {/* Right: Queue or Related */}
          <div className="flex-1 lg:max-w-xs">
            {showQueue ? (
              <QueuePanel />
            ) : (
              <div className="space-y-3">
                <h3 className="text-white/40 text-xs uppercase tracking-widest">Up Next</h3>
                {queue.slice(0, 5).map((t, i) => (
                  <RelatedRow key={i} track={t} />
                ))}
                {queue.length === 0 && relatedTracks.length > 0 && (
                  <>
                    <h3 className="text-white/40 text-xs uppercase tracking-widest mt-4">Related</h3>
                    {relatedTracks.map((t, i) => (
                      <RelatedRow key={i} track={t} />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RelatedRow({ track }) {
  const { playTrack } = useMusicPlayer();
  return (
    <button
      onClick={() => playTrack(track)}
      className="flex items-center gap-3 w-full text-left hover:bg-white/5 rounded-lg p-2 transition-colors group"
    >
      {track.cover ? (
        <img src={track.cover} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" loading="lazy" />
      ) : (
        <div className="w-10 h-10 rounded bg-white/10 flex-shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">{track.title}</p>
        <p className="text-white/40 text-xs truncate">{track.artist}</p>
      </div>
      <span className="text-white/30 text-xs font-mono">{formatDuration(track.duration)}</span>
    </button>
  );
}