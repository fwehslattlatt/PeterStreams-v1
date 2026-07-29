const API_URL = "https://api.cdnlivetv.tv/api/v1/channels/?user=cdnlivetv&plan=free";

const BLOCKED_CHANNELS = [
  "BBC",
  "BBC America",
  "Astro Cricket",
  "Boston Red Soxs",
  "Boston Red Sox",
  "Chicago White Soxs",
  "Chicago White Sox",
  "ESPN + USA",
  "ESPN+ USA",
  "truTV",
  "TruTV",
  "UNIVERSAL KIDS",
  "Universal Kids",
];

let cache = null;

export async function fetchChannels() {
  if (cache && Date.now() - cache.ts < 120000) return cache.data;

  const resp = await fetch(API_URL);
  const data = await resp.json();
  if (!data.channels) throw new Error("Failed to load channels");

  const channels = data.channels
    .filter((c) => c.code === "us")
    .map((c, i) => ({
      id: `${c.name}-${c.code}-${i}`,
      name: c.name,
      code: c.code,
      playerUrl: c.url,
      image: c.image,
      status: c.status,
      viewers: c.viewers || 0,
    }))
    .filter((c) => c.status === "online")
    .filter((c) => c.name === "Space City Home Network")
    .sort((a, b) => a.name.localeCompare(b.name));

  cache = { ts: Date.now(), data: channels };
  return cache.data;
}