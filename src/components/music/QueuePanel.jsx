import React from "react";
import { Trash2, GripVertical } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { formatDuration } from "@/lib/hifi";

export default function QueuePanel() {
  const { queue, currentTrack, dispatch } = useMusicPlayer();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white/40 text-xs uppercase tracking-widest">Queue ({queue.length})</h3>
        {queue.length > 0 && (
          <button
            onClick={() => dispatch({ type: "SET_QUEUE", queue: [] })}
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {currentTrack && (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10">
          {currentTrack.cover && (
            <img src={currentTrack.cover} alt="" className="w-9 h-9 rounded object-cover flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-white/40 text-xs truncate">Now playing</p>
          </div>
        </div>
      )}

      {queue.length === 0 ? (
        <p className="text-white/20 text-sm text-center py-8">Queue is empty</p>
      ) : (
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {queue.map((track, i) => (
            <div
              key={`${track.id}-${i}`}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 group transition-colors"
            >
              <GripVertical size={14} className="text-white/20 flex-shrink-0" />
              {track.cover && (
                <img src={track.cover} alt="" className="w-9 h-9 rounded object-cover flex-shrink-0" loading="lazy" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-white/80 text-sm truncate">{track.title}</p>
                <p className="text-white/40 text-xs truncate">{track.artist}</p>
              </div>
              <span className="text-white/30 text-xs font-mono">{formatDuration(track.duration)}</span>
              <button
                onClick={() => dispatch({ type: "REMOVE_FROM_QUEUE", index: i })}
                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}