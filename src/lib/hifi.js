// Eclipse Music / BeatBoss Addon API client
// Primary: Qobuz+Tidal (FLAC quality)
// Fallback: All-in-One (multi-source)

const ADDONS = [
  "https://qobuz-tidal-eclipse.cyrusna29.workers.dev",
  "https://all-in-one.cyrusna29.workers.dev",
];

const cache = new Map();

async function addonGet(base, path, params = {}) {
  const url = new URL(base + path);
  Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function addonGetWithFallback(path, params = {}) {
  const key = path + JSON.stringify(params);
  if (cache.has(key)) return cache.get(key);

  let lastErr;
  for (const base of ADDONS) {
    try {
      const json = await addonGet(base, path, params);
      cache.set(key, json);
      return json;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export function formatDuration(secs) {
  if (!secs) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Search tracks
export async function searchTracks(query, limit = 25) {
  const data = await addonGetWithFallback("/search", { q: query, limit });
  return data?.tracks ?? [];
}

// Search albums
export async function searchAlbums(query, limit = 12) {
  const data = await addonGetWithFallback("/search", { q: query, limit });
  return data?.albums ?? [];
}

// Search artists
export async function searchArtists(query, limit = 8) {
  const data = await addonGetWithFallback("/search", { q: query, limit });
  return data?.artists ?? [];
}

export async function searchAll(query) {
  const data = await addonGetWithFallback("/search", { q: query, limit: 25 });
  return {
    tracks: data?.tracks ?? [],
    albums: data?.albums ?? [],
    artists: data?.artists ?? [],
  };
}

// Full album info with tracks
export async function getAlbum(albumId) {
  let lastErr;
  for (const base of ADDONS) {
    try {
      const data = await addonGet(base, `/album/${albumId}`);
      if (data && !data.error) return data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export async function getAlbumTracks(albumId) {
  const album = await getAlbum(albumId);
  return album?.tracks ?? [];
}

// Artist info
export async function getArtist(id) {
  let lastErr;
  for (const base of ADDONS) {
    try {
      const data = await addonGet(base, `/artist/${id}`);
      if (data && !data.error) return data;
    } catch (e) {
      lastErr = e;
    }
  }
  return null;
}

// Get stream URL for a track
// Returns: { url, format } or null if unavailable
export async function getTrackStream(id) {
  let lastErr;
  for (const base of ADDONS) {
    try {
      const data = await addonGet(base, `/stream/${id}`);
      if (data?.url) return { url: data.url, mimeType: data.format === "flac" ? "audio/flac" : "audio/mpeg" };
    } catch (e) {
      lastErr = e;
    }
  }
  return null;
}

// Normalize any raw track object to a consistent shape for the player
export function normalizeTrack(track) {
  if (!track) return null;
  return {
    id: track.id,
    title: track.title,
    duration: track.duration,
    artist: track.artist ?? "Unknown Artist",
    artists: track.artists ?? [{ name: track.artist ?? "Unknown Artist" }],
    album: track.album ?? "",
    albumId: track.albumId ?? track.album_id ?? null,
    cover: track.artworkURL ?? track.image ?? track.cover ?? null,
    trackNumber: track.trackNumber ?? null,
    explicit: track.explicit ?? false,
    audioQuality: track.audioQuality ?? track.format ?? null,
    // Inline stream URL if present (BeatBoss spec: streamURL skips /stream/:id call)
    streamURL: track.streamURL ?? null,
  };
}

// Stub — recommendations not supported by this API, return empty
export async function getRecommendations() {
  return [];
}

// Cover/artist image helpers — Qobuz serves full URLs directly
export function coverUrl(url) {
  return url ?? null;
}

export function artistImageUrl(url) {
  return url ?? null;
}

// Similarity — not supported, return empty
export async function getSimilarAlbums() {
  return [];
}

export async function getSimilarArtists() {
  return [];
}