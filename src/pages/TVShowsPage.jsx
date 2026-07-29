import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HackerHero from "../components/HackerHero";
import HackerContentRow from "../components/HackerContentRow";
import MediaDetailModal from "../components/MediaDetailModal";
import { tmdb } from "@/lib/tmdb";

export default function TVShowsPage() {
  const [heroItems, setHeroItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    tmdb.trendingTV(1).then(d => setHeroItems((d.results || []).slice(0, 5).map(i => ({ ...i, media_type: "tv" }))));
  }, []);

  const handlePlay = (item) => setSelected({ ...item, media_type: "tv", _autoplay: true });
  const handleInfo = (item) => setSelected({ ...item, media_type: "tv" });

  return (
    <div className="min-h-screen bg-black">
      <HackerHero items={heroItems} onPlay={handlePlay} onInfo={handleInfo} />

      <div className="pb-12 -mt-2 relative z-10">
        <HackerContentRow title="Trending TV This Week" fetchFn={() => tmdb.trendingTV(1)} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Popular Shows" fetchFn={() => tmdb.popularTV(1)} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Top Rated" fetchFn={() => tmdb.topRatedTV(1)} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Drama" fetchFn={() => tmdb.discoverTV({ with_genres: "18" })} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Sci-Fi & Fantasy" fetchFn={() => tmdb.discoverTV({ with_genres: "10765" })} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Action & Adventure" fetchFn={() => tmdb.discoverTV({ with_genres: "10759" })} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Comedy" fetchFn={() => tmdb.discoverTV({ with_genres: "35" })} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
        <HackerContentRow title="Animation" fetchFn={() => tmdb.discoverTV({ with_genres: "16" })} onSelect={item => setSelected({ ...item, media_type: "tv" })} />
      </div>

      <AnimatePresence>
        {selected && <MediaDetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}