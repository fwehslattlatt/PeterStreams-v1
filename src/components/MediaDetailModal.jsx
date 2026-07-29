import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Star, Calendar, ChevronDown } from "lucide-react";
import { tmdb, posterUrl, backdropUrl } from "@/lib/tmdb";

export default function MediaDetailModal({ item, onClose }) {
  const [details, setDetails] = useState(null);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [seasonData, setSeasonData] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [embedSrc, setEmbedSrc] = useState("");

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    if (!item) return;
    if (item.media_type === "movie") {
      tmdb.movieDetails(item.id).then(setDetails);
    } else {
      tmdb.tvDetails(item.id).then(setDetails);
    }
  }, [item]);

  useEffect(() => {
    if (item?.media_type === "tv" && details) {
      tmdb.tvSeason(item.id, season).then(setSeasonData);
    }
  }, [item, details, season]);

  const handlePlay = () => {
    const src = item?.media_type === "movie"
      ? `https://vsembed.su/embed/movie/${item.id}`
      : `https://vsembed.su/embed/tv/${item.id}/${season}/${episode}`;
    setEmbedSrc(src);
    setPlaying(true);
  };

  const title = item?.title || item?.name;
  const year = (item?.release_date || item?.first_air_date || "").slice(0, 4);
  const rating = item?.vote_average?.toFixed(1);
  const numSeasons = details?.number_of_seasons || 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded border border-green-500/30 bg-black"
        style={{ boxShadow: "0 0 40px rgba(0,255,65,0.15)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center border border-green-500/40 text-green-400 hover:bg-green-400/10 transition-colors font-mono"
        >
          <X size={16} />
        </button>

        {playing ? (
          /* Player view */
          <div className="flex flex-col h-[85vh]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-green-500/20 flex-shrink-0">
              <span className="text-green-400 font-mono text-sm font-bold">&gt; {title}</span>
              {item?.media_type === "tv" && (
                <span className="text-green-400/60 font-mono text-xs">S{season}:E{episode}</span>
              )}
              <button onClick={() => setPlaying(false)} className="ml-auto text-green-400/60 hover:text-green-400 font-mono text-xs">[ BACK ]</button>
            </div>
            <div className="flex-1 bg-black">
              <iframe src={embedSrc} className="w-full h-full border-0" allowFullScreen allow="autoplay; fullscreen" title={title} />
            </div>
          </div>
        ) : (
          /* Detail view */
          <div>
            {/* Backdrop */}
            <div className="relative h-52 md:h-72 overflow-hidden">
              {item?.backdrop_path ? (
                <img src={backdropUrl(item.backdrop_path)} className="w-full h-full object-cover opacity-40" alt="" />
              ) : (
                <div className="w-full h-full bg-green-950/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 right-12 flex gap-4">
                {item?.poster_path && (
                  <img src={posterUrl(item.poster_path, "w154")} className="w-16 md:w-24 rounded border border-green-500/30 flex-shrink-0 hidden sm:block" alt={title} />
                )}
                <div className="flex flex-col justify-end gap-1">
                  <h2 className="text-green-300 font-mono font-bold text-xl md:text-2xl" style={{ textShadow: "0 0 20px rgba(0,255,65,0.5)" }}>{title}</h2>
                  <div className="flex items-center gap-3 text-green-400/70 font-mono text-xs">
                    {year && <span className="flex items-center gap-1"><Calendar size={11} />{year}</span>}
                    {rating && <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400" />{rating}</span>}
                    <span className="border border-green-500/40 px-1.5 py-0.5 uppercase">{item?.media_type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4">
              {/* Overview */}
              {item?.overview && (
                <p className="text-green-400/70 font-mono text-sm leading-relaxed">{item.overview}</p>
              )}

              {/* TV: season/episode selector */}
              {item?.media_type === "tv" && (
                <div className="border border-green-500/20 rounded p-4 space-y-3 bg-green-950/10">
                  <p className="text-green-400 font-mono text-xs uppercase tracking-widest">&gt; Select Episode</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-green-400/60 font-mono text-xs">Season:</label>
                      <div className="relative">
                        <select
                          value={season}
                          onChange={(e) => { setSeason(Number(e.target.value)); setEpisode(1); }}
                          className="bg-black border border-green-500/40 text-green-400 font-mono text-sm px-3 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:border-green-400"
                        >
                          {Array.from({ length: numSeasons }, (_, i) => i + 1).map(s => (
                            <option key={s} value={s}>S{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400/60 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-green-400/60 font-mono text-xs">Episode:</label>
                      <div className="relative">
                        <select
                          value={episode}
                          onChange={(e) => setEpisode(Number(e.target.value))}
                          className="bg-black border border-green-500/40 text-green-400 font-mono text-sm px-3 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:border-green-400"
                        >
                          {(seasonData?.episodes || Array.from({ length: 20 }, (_, i) => ({ episode_number: i + 1, name: `Episode ${i + 1}` }))).map(ep => (
                            <option key={ep.episode_number} value={ep.episode_number}>
                              E{ep.episode_number}{ep.name && ep.name !== `Episode ${ep.episode_number}` ? ` - ${ep.name}` : ""}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400/60 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Play button */}
              <button
                onClick={handlePlay}
                className="group relative flex items-center gap-3 px-6 py-3 border border-green-400 text-green-400 hover:text-black font-mono font-bold uppercase tracking-widest overflow-hidden transition-colors duration-300 text-sm"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 bg-green-400" />
                <Play size={16} className="relative z-10" fill="currentColor" />
                <span className="relative z-10">[ PLAY NOW ]</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>

    </motion.div>
  );
}