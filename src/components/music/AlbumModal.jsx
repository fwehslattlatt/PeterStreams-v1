import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Play, Shuffle, Plus } from "lucide-react";
import { getAlbum, normalizeTrack } from "@/lib/hifi";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import TrackRow from "./TrackRow";

export default function AlbumModal({ albumId, onClose, onAlbumSelect }) {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playAlbum, dispatch } = useMusicPlayer();

  useEffect(() => {
    if (!albumId) return;
    setLoading(true);
    getAlbum(albumId).then((a) => {
      setAlbum(a);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [albumId]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Normalize tracks from various API shapes
  const rawTracks = album?.tracks ?? album?.items ?? album?.trackList ?? [];
  const tracks = rawTracks
    .map(t => normalizeTrack(t))
    .filter(Boolean)
    .filter(t => t.id && t.title);

  const cover = album?.artworkURL ?? album?.artwork ?? album?.cover ?? album?.image ?? null;
  const artistName = typeof album?.artist === "string"
    ? album.artist
    : (album?.artist?.name ?? album?.artistName ?? "");

  const handlePlay = (startIndex = 0) => {
    playAlbum(tracks, startIndex);
    onClose();
  };

  const handleShuffle = () => {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    playAlbum(shuffled, 0);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-black border border-green-500/30"
        style={{ boxShadow: "0 0 40px rgba(0,255,65,0.08)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-green-500/30 hover:border-green-400/60 text-green-400/50 hover:text-green-400 transition-all"
        >
          <X size={16} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-400 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-end gap-6 p-6 pb-4">
              {cover ? (
                <img src={cover} alt={album?.title} className="w-32 h-32 object-cover flex-shrink-0 border border-green-500/30" />
              ) : (
                <div className="w-32 h-32 bg-green-950/30 border border-green-500/20 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 pb-1">
                <p className="text-green-400/40 font-mono text-xs uppercase tracking-widest mb-1">Album</p>
                <h2 className="text-green-400 font-mono text-xl font-bold leading-tight">{album?.title}</h2>
                <p className="text-green-400/60 font-mono text-sm mt-1">{artistName}</p>
                <p className="text-green-400/30 font-mono text-xs mt-1">
                  {(album?.releaseDate ?? album?.year ?? "")?.toString().slice(0, 4)} · {tracks.length} tracks
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 px-6 pb-5">
              <button
                onClick={() => handlePlay(0)}
                className="flex items-center gap-2 px-5 py-2 border border-green-400/60 bg-green-400/10 text-green-400 font-mono text-xs font-bold uppercase tracking-wider hover:bg-green-400/20 transition-colors"
              >
                <Play size={12} fill="currentColor" />
                Play
              </button>
              <button
                onClick={handleShuffle}
                className="flex items-center gap-2 px-5 py-2 border border-green-500/30 text-green-400/60 hover:text-green-400 font-mono text-xs uppercase tracking-wider hover:border-green-400/50 transition-colors"
              >
                <Shuffle size={12} />
                Shuffle
              </button>
              <button
                onClick={() => dispatch({ type: "ADD_TO_QUEUE", tracks })}
                className="flex items-center gap-2 px-5 py-2 border border-green-500/30 text-green-400/60 hover:text-green-400 font-mono text-xs uppercase tracking-wider hover:border-green-400/50 transition-colors"
              >
                <Plus size={12} />
                Queue
              </button>
            </div>

            {/* Tracks */}
            <div className="px-3 pb-4">
              {tracks.map((track, i) => (
                <div key={track.id} onClick={() => handlePlay(i)}>
                  <TrackRow track={track} index={i} showCover={false} />
                </div>
              ))}
            </div>


          </>
        )}
      </motion.div>
    </motion.div>
  );
}