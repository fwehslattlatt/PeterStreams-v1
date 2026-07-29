import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Play } from "lucide-react";
import { searchAll, normalizeTrack } from "@/lib/hifi";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { formatDuration } from "@/lib/hifi";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function MusicSearch({ onClose, onAlbumSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { playTrack, playAlbum, getAlbum } = useMusicPlayer();
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults(null); return; }
    setLoading(true);
    searchAll(debouncedQuery).then(r => {
      setResults(r);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [debouncedQuery]);

  const handleTrack = (track) => {
    playTrack(normalizeTrack(track));
    onClose();
  };

  const handleAlbum = (album) => {
    onAlbumSelect?.(album.id);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-sm flex flex-col"
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <Search size={20} className="text-white/40 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-white text-lg placeholder-white/20 outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors ml-2 text-sm">
          Cancel
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {!loading && results && (
          <div className="space-y-8 max-w-2xl mx-auto">
            {results.tracks.length > 0 && (
              <section>
                <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">Songs</h3>
                <div className="space-y-1">
                  {results.tracks.map(track => (
                    <button
                      key={track.id}
                      onClick={() => handleTrack(track)}
                      className="flex items-center gap-3 w-full text-left hover:bg-white/5 rounded-xl px-3 py-2.5 group transition-colors"
                    >
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-white/5 relative">
                        {(track.artworkURL ?? track.cover) && (
                          <img
                            src={track.artworkURL ?? track.cover}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                          <Play size={12} fill="white" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">{track.title}</p>
                        <p className="text-white/40 text-xs truncate">{typeof track.artist === "string" ? track.artist : (track.artist?.name ?? track.artists?.[0]?.name ?? "")}</p>
                      </div>
                      <span className="text-white/30 text-xs font-mono">{formatDuration(track.duration)}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {results.albums.length > 0 && (
              <section>
                <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">Albums</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {results.albums.map(album => (
                    <button
                      key={album.id}
                      onClick={() => handleAlbum(album)}
                      className="flex flex-col gap-2 text-left group"
                    >
                      <div className="aspect-square w-full rounded-xl overflow-hidden bg-white/5 relative">
                        {(album.artworkURL ?? album.cover) && (
                          <img
                            src={album.artworkURL ?? album.cover}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p className="text-white/70 text-xs font-medium truncate group-hover:text-white transition-colors">{album.title}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {results.artists.length > 0 && (
              <section>
                <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">Artists</h3>
                <div className="flex flex-wrap gap-3">
                  {results.artists.map(artist => (
                    <div key={artist.id} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-2.5">
                      {(artist.image ?? artist.picture) && (
                        <img
                          src={artist.image ?? artist.picture}
                          alt={artist.name}
                          className="w-9 h-9 rounded-full object-cover"
                          loading="lazy"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <span className="text-white/70 text-sm font-medium">{artist.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {results.tracks.length === 0 && results.albums.length === 0 && results.artists.length === 0 && (
              <p className="text-white/20 text-center py-16">No results for "{query}"</p>
            )}
          </div>
        )}

        {!loading && !results && !query && (
          <div className="text-center py-16">
            <p className="text-white/20 text-lg">Search for any song, artist, or album</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}