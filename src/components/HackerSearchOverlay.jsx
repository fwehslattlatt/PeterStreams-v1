import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import HackerMediaCard from "./HackerMediaCard";
import { AnimatePresence } from "framer-motion";
import MediaDetailModal from "./MediaDetailModal";

export default function HackerSearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) { setResults([]); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await tmdb.search(query);
      setResults((data.results || []).filter(r => r.media_type !== "person" && r.poster_path));
      setLoading(false);
    }, 350);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/95 flex flex-col"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.02) 3px, rgba(0,255,65,0.02) 4px)" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Search bar */}
        <div className="flex items-center gap-4 px-4 md:px-10 py-5 border-b border-green-500/20">
          <span className="text-green-400 font-mono text-sm hidden sm:block">SEARCH://</span>
          <div className="flex-1 flex items-center gap-3 border border-green-500/30 px-4 py-2.5" style={{ boxShadow: "0 0 10px rgba(0,255,65,0.1)" }}>
            <Search size={16} className="text-green-400/60 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="search movies & tv shows..."
              className="flex-1 bg-transparent text-green-300 font-mono text-sm placeholder-green-400/30 focus:outline-none"
            />
            {loading && <span className="text-green-400/60 font-mono text-xs animate-pulse">SCANNING...</span>}
          </div>
          <button onClick={onClose} className="w-9 h-9 border border-green-500/30 flex items-center justify-center text-green-400/60 hover:text-green-400 hover:border-green-400/60 transition-all font-mono">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 py-6">
          {results.length > 0 ? (
            <>
              <p className="text-green-400/50 font-mono text-xs mb-4">{results.length} RESULTS FOR "{query.toUpperCase()}"</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {results.map(item => (
                  <HackerMediaCard key={item.id} item={item} onClick={setSelected} />
                ))}
              </div>
            </>
          ) : query && !loading ? (
            <div className="flex items-center justify-center h-40 text-green-400/30 font-mono text-sm">NO RESULTS FOUND</div>
          ) : !query ? (
            <div className="flex items-center justify-center h-40 text-green-400/20 font-mono text-xs">TYPE TO SEARCH...</div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {selected && <MediaDetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}