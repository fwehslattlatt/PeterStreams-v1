import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Gamepad2, ExternalLink } from "lucide-react";
import { GAMES } from "@/data/games";

const COVER_BASE = "https://cdn.jsdelivr.net/gh/freebuisness/covers@main";

function GameCard({ game, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(game)}
      className="flex flex-col bg-black border border-green-500/20 hover:border-green-400/60 group transition-all overflow-hidden"
    >
      <div className="relative w-full aspect-[4/3] bg-green-950/20 overflow-hidden">
        {!imgError ? (
          <img
            src={`${COVER_BASE}/${game.id}.png`}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gamepad2 size={24} className="text-green-400/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-green-400/90 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </div>
      <div className="px-2 py-2">
        <p className="text-green-400/80 group-hover:text-green-400 font-mono text-xs text-left leading-tight transition-colors line-clamp-2">
          {game.name}
        </p>
      </div>
    </motion.button>
  );
}

function GameModal({ game, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const gameUrl = `https://gn-math.dev/${game.file}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-black border border-green-500/30 overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(0,255,65,0.12)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-500/20">
          <span className="text-green-400 font-mono text-sm font-bold uppercase tracking-widest truncate pr-4">{game.name}</span>
          <button onClick={onClose} className="text-green-400/40 hover:text-green-400 transition-colors flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Cover art */}
        <div className="relative aspect-video w-full bg-green-950/20 overflow-hidden">
          <img
            src={`${COVER_BASE}/${game.id}.png`}
            alt={game.name}
            className="w-full h-full object-cover opacity-50"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Play button */}
        <div className="flex flex-col items-center gap-3 px-6 py-6">
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full justify-center px-8 py-3 bg-green-400 text-black font-mono font-bold text-sm uppercase tracking-wider hover:bg-green-300 transition-colors"
          >
            <ExternalLink size={14} />
            Play Now
          </a>
          <p className="text-green-400/30 font-mono text-xs">Opens in a new tab</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [activeGame, setActiveGame] = useState(null);

  const filtered = GAMES.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-20 px-4 md:px-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-green-400 font-mono text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
            <Gamepad2 size={24} />
            Games
          </h1>
          <p className="text-green-400/40 font-mono text-xs mt-1">
            {filtered.length} games available
          </p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400/40" />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black border border-green-500/30 text-green-400 placeholder-green-400/30 font-mono text-sm pl-9 pr-4 py-2 outline-none focus:border-green-400/60 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filtered.map((game) => (
          <GameCard key={game.id} game={game} onClick={setActiveGame} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-green-400/30 font-mono text-center py-20">No games found for "{search}"</p>
      )}

      <AnimatePresence>
        {activeGame && (
          <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}