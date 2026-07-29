import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HackerHero from "../components/HackerHero";
import HackerContentRow from "../components/HackerContentRow";
import MediaDetailModal from "../components/MediaDetailModal";
import { tmdb } from "@/lib/tmdb";

// TMDB genre 16 = Animation, keyword 210024 = anime, origin_country JP
const animeTV = (params = {}) => tmdb.discoverTV({ with_genres: "16", with_keywords: "210024", sort_by: "popularity.desc", ...params });
const animeMovies = (params = {}) => tmdb.discoverMovies({ with_genres: "16", with_keywords: "210024", sort_by: "popularity.desc", ...params });

export default function AnimePage() {
  const [heroItems, setHeroItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([
      tmdb.tvDetails(75408), // Pop Team Epic
      animeTV(),
    ]).then(([popTeamEpic, trending]) => {
      const others = (trending.results || [])
        .filter(i => i.id !== 75408 && i.id !== 85733) // remove Pop Team Epic dupe & Overflow
        .slice(0, 4)
        .map(i => ({ ...i, media_type: "tv" }));
      setHeroItems([{ ...popTeamEpic, media_type: "tv" }, ...others]);
    });
  }, []);

  const handlePlay = (item) => setSelected({ ...item, _autoplay: true });
  const handleInfo = (item) => setSelected(item);

  return (
    <div className="min-h-screen bg-black">
      <HackerHero items={heroItems} onPlay={handlePlay} onInfo={handleInfo} />

      <div className="pb-12 -mt-2 relative z-10">
        <HackerContentRow
          title="Trending Anime Series"
          fetchFn={() => animeTV()}
          onSelect={item => setSelected({ ...item, media_type: "tv" })}
        />
        <HackerContentRow
          title="Top Rated Anime"
          fetchFn={() => animeTV({ sort_by: "vote_average.desc", vote_count_gte: 200 })}
          onSelect={item => setSelected({ ...item, media_type: "tv" })}
        />
        <HackerContentRow
          title="Anime Movies"
          fetchFn={() => animeMovies()}
          onSelect={item => setSelected({ ...item, media_type: "movie" })}
        />
        <HackerContentRow
          title="Currently Airing"
          fetchFn={() => animeTV({ with_status: "0" })}
          onSelect={item => setSelected({ ...item, media_type: "tv" })}
        />
        <HackerContentRow
          title="Action Anime"
          fetchFn={() => animeTV({ with_genres: "16,10759", with_keywords: "210024" })}
          onSelect={item => setSelected({ ...item, media_type: "tv" })}
        />
        <HackerContentRow
          title="Classic Anime Movies"
          fetchFn={() => animeMovies({ sort_by: "vote_average.desc", vote_count_gte: 500 })}
          onSelect={item => setSelected({ ...item, media_type: "movie" })}
        />
      </div>

      <AnimatePresence>
        {selected && <MediaDetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}