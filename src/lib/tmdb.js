const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWMxMzVjMGQ3ZjAzODJjMzUyNmY3YzQ5MDUzNTI4ZiIsIm5iZiI6MTc3OTMyOTcyOS4xMjMwMDAxLCJzdWIiOiI2YTBlNmFjMTQxOTcxYzRiMWMzOGNlNmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JuXuxxLADOo-y6iltr-R45gyo_7Z2PuI1OSpUPZ302k";
export const API_KEY = BEARER_TOKEN;
const BASE = "https://api.themoviedb.org/3";
export const IMG = "https://image.tmdb.org/t/p";

const cache = new Map();

async function fetchTMDB(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const key = url.toString();
  if (cache.has(key)) return cache.get(key);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
  });
  if (!res.ok) {
    console.error(`TMDB error ${res.status} for ${path}`);
    return { results: [] };
  }
  const data = await res.json();
  if (data.results) cache.set(key, data);
  return data;
}

export const tmdb = {
  // Movies
  trending: (page = 1) => fetchTMDB("/trending/movie/week", { page }),
  popularMovies: (page = 1) => fetchTMDB("/movie/popular", { page }),
  topRatedMovies: (page = 1) => fetchTMDB("/movie/top_rated", { page }),
  discoverMovies: (params = {}) => fetchTMDB("/discover/movie", { sort_by: "popularity.desc", ...params }),
  movieDetails: (id) => fetchTMDB(`/movie/${id}`, { append_to_response: "credits" }),

  // TV
  trendingTV: (page = 1) => fetchTMDB("/trending/tv/week", { page }),
  popularTV: (page = 1) => fetchTMDB("/tv/popular", { page }),
  topRatedTV: (page = 1) => fetchTMDB("/tv/top_rated", { page }),
  discoverTV: (params = {}) => fetchTMDB("/discover/tv", { sort_by: "popularity.desc", ...params }),
  tvDetails: (id) => fetchTMDB(`/tv/${id}`),
  tvSeason: (id, season) => fetchTMDB(`/tv/${id}/season/${season}`),

  // Search
  search: (query, page = 1) => fetchTMDB("/search/multi", { query, page, include_adult: false }),

  // Genres
  movieGenres: () => fetchTMDB("/genre/movie/list"),
  tvGenres: () => fetchTMDB("/genre/tv/list"),
};

export function posterUrl(path, size = "w342") {
  if (!path) return null;
  return `${IMG}/${size}${path}`;
}

export function backdropUrl(path) {
  if (!path) return null;
  return `${IMG}/w1280${path}`;
}