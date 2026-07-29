import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Loader2, AlertTriangle } from "lucide-react";
import { fetchChannels } from "@/lib/cdnLiveTvApi";
import { CUSTOM_CHANNELS } from "@/data/customChannels";
import ChannelCard from "@/components/livetv/ChannelCard";
import LiveTVFullscreenPlayer from "@/components/livetv/LiveTVFullscreenPlayer";

export default function LiveTVPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cdnChannels = await fetchChannels();
      const custom = CUSTOM_CHANNELS.map((c, i) => ({
        id: `custom-${i}`,
        name: c.name,
        playerUrl: c.embedUrl,
        status: "online",
      }));
      setChannels([...custom, ...cdnChannels]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const PRIORITY = [
    "NBC",
    "ABC",
    "CBS",
    "FOX",
    "Space City Home Network",
    "ESPN",
    "ESPN2",
    "ESPNU",
    "ESPNEWS",
    "TNT",
    "CNN HD",
    "TBS",
    "FX",
    "FXX",
    "FXM",
    "HBO",
    "Paramount + with Showtime",
  ];

  const sortByPriority = (list) => {
    const result = [];
    const remaining = [...list];
    for (const name of PRIORITY) {
      const idx = remaining.findIndex((c) => c.name === name);
      if (idx >= 0) {
        result.push(remaining.splice(idx, 1)[0]);
      }
    }
    return [...result, ...remaining];
  };

  const filtered = sortByPriority(
    search.trim()
      ? channels.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      : channels
  );

  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      {/* Header */}
      <div className="px-4 md:px-10 mb-6 relative">
        <h1 className="text-green-400 font-mono text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
          <Radio size={24} />
          Live TV
        </h1>

        {/* Decorative GIFs */}
        <div className="absolute top-0 right-4 md:right-10 flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/7cef72580_3dgifmaker40681.gif"
            alt=""
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <img
            src="https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/c96dbd289_3dgifmaker26930.gif"
            alt=""
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
        <p className="text-green-400/40 font-mono text-xs mt-1">
          {channels.length > 0
            ? `${channels.length} US channels available`
            : "Loading channels..."}
        </p>

        {/* Search */}
        <div className="mt-4 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search channels..."
            className="w-full px-4 py-2 bg-black border border-green-500/30 focus:border-green-400/60 text-green-400 placeholder-green-400/30 font-mono text-sm outline-none transition-colors"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 size={32} className="text-green-400 animate-spin" />
          <p className="text-green-400/40 font-mono text-sm">Fetching channels...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <AlertTriangle size={32} className="text-red-400" />
          <p className="text-red-400 font-mono text-sm">Failed to load channels</p>
          <button
            onClick={load}
            className="px-4 py-2 border border-green-500/30 text-green-400/60 hover:text-green-400 hover:border-green-400/60 font-mono text-xs uppercase tracking-wider transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Channel grid */}
      {!loading && !error && (
        <div className="px-4 md:px-10 animate-fade-in">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((channel, idx) => (
                <ChannelCard key={`${channel.id}-${idx}`} channel={channel} onClick={setActiveChannel} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-green-400/40 font-mono text-sm">No channels found for "{search}"</p>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen player */}
      <AnimatePresence>
        {activeChannel && (
          <LiveTVFullscreenPlayer
            channel={activeChannel}
            onClose={() => setActiveChannel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}