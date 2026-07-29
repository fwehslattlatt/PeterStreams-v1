import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HackerHero from "../components/HackerHero";
import HackerContentRow from "../components/HackerContentRow";
import MediaDetailModal from "../components/MediaDetailModal";
import { tmdb } from "@/lib/tmdb";

export default function MoviesPage() {
  const [heroItems, setHeroItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    tmdb.trending(1).then(d => setHeroItems((d.results || []).slice(0, 5).map(i => ({ ...i, media_type: "movie" }))));
  }, []);

  const handlePlay = (item) => setSelected({ ...item, media_type: "movie", _autoplay: true });
  const handleInfo = (item) => setSelected({ ...item, media_type: "movie" });

  return (
    <div className="min-h-screen bg-black">
      <HackerHero items={heroItems} onPlay={handlePlay} onInfo={handleInfo} />

      <div className="pb-12 -mt-2 relative z-10">
        <HackerContentRow title="Trending This Week" fetchFn={() => tmdb.trending(1)} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Popular Movies" fetchFn={() => tmdb.popularMovies(1)} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Top Rated" fetchFn={() => tmdb.topRatedMovies(1)} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Action & Adventure" fetchFn={() => tmdb.discoverMovies({ with_genres: "28" })} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Sci-Fi" fetchFn={() => tmdb.discoverMovies({ with_genres: "878" })} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Horror" fetchFn={() => tmdb.discoverMovies({ with_genres: "27" })} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Comedy" fetchFn={() => tmdb.discoverMovies({ with_genres: "35" })} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
        <HackerContentRow title="Drama" fetchFn={() => tmdb.discoverMovies({ with_genres: "18" })} onSelect={item => setSelected({ ...item, media_type: "movie" })} />
      </div>

      <AnimatePresence>
        {selected && <MediaDetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}