import React from "react";
import { Play, Heart } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { formatDuration } from "@/lib/hifi";

export default function TrackRow({ track, index, showCover = true }) {
  const { currentTrack, isPlaying, playTrack, dispatch, favorites } = useMusicPlayer();
  const isActive = currentTrack?.id === track.id;
  const isFav = favorites.some(t => t.id === track.id);

  return (
    <div
      className={`group flex items-center gap-3 px-3 py-2 border transition-colors cursor-pointer font-mono ${
        isActive
          ? "border-green-500/40 bg-green-400/5 text-green-400"
          : "border-transparent hover:border-green-500/20 hover:bg-green-400/5"
      }`}
      onClick={() => playTrack(track)}
    >
      {/* Index / play indicator */}
      <div className="w-6 flex-shrink-0 flex items-center justify-center">
        {isActive && isPlaying ? (
          <div className="flex gap-0.5 items-end h-4">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-0.5 bg-green-400 animate-pulse"
                style={{ height: `${50 + i * 20}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        ) : (
          <>
            <span className={`text-xs group-hover:hidden ${isActive ? "text-green-400" : "text-green-400/30"}`}>
              {index != null ? index + 1 : ""}
            </span>
            <Play size={11} fill="currentColor" className="text-green-400 hidden group-hover:block" />
          </>
        )}
      </div>

      {/* Cover */}
      {showCover && (
        <div className="w-9 h-9 flex-shrink-0 bg-green-950/30 border border-green-500/20 overflow-hidden">
          {track.cover ? (
            <img src={track.cover} alt="" className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-green-950/50" />
          )}
        </div>
      )}

      {/* Title + artist */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold truncate ${isActive ? "text-green-400" : "text-green-400/80 group-hover:text-green-400"} transition-colors`}>
          {track.title}
        </p>
        <p className="text-green-400/40 text-xs truncate">{track.artist}</p>
      </div>

      {/* Fav */}
      <button
        onClick={(e) => { e.stopPropagation(); dispatch({ type: "TOGGLE_FAVORITE", track }); }}
        className={`opacity-0 group-hover:opacity-100 transition-opacity ${isFav ? "!opacity-100 text-red-400" : "text-green-400/30 hover:text-green-400"}`}
      >
        <Heart size={12} fill={isFav ? "currentColor" : "none"} />
      </button>

      {/* Duration */}
      <span className="text-green-400/30 text-xs w-10 text-right flex-shrink-0">
        {formatDuration(track.duration)}
      </span>
    </div>
  );
}