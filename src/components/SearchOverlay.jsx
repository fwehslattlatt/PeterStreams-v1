import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { ALL_CONTENT } from "@/data/flixzyContent";
import PlayerModal from "./PlayerModal";
// Player uses vidsrc.to embed URLs built inside PlayerModal

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return; }
    const lower = query.toLowerCase();
    const filtered = ALL_CONTENT.filter(item =>
      item.title.toLowerCase().includes(lower)
    ).slice(0, 20);
    setResults(filtered);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
    >
      <div className="max-w-3xl mx-auto px-6 pt-20">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-white/40" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
          />
          <button onClick={onClose} className="absolute right-4 text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
          >
            {results.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer group"
                onClick={() => { setSelectedItem(item); }}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-white/5">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/200x300/1a1a1a/666?text=No+Image"; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[10px] font-bold text-green-400">{item.match}% Match</span>
                      <span className="text-[10px] text-white/50 ml-1 border border-white/30 px-1 rounded">{item.type === 'movie' ? 'Movie' : 'TV'}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white text-xs mt-2 font-medium leading-tight line-clamp-2">{item.title}</p>
              </div>
            ))}
          </motion.div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="mt-16 text-center text-white/40">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg">No results for "{query}"</p>
          </div>
        )}

        {query.length < 2 && (
          <div className="mt-16 text-center text-white/30">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-light">Start typing to search</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <PlayerModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </motion.div>
  );
}