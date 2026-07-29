const BASE = "http://skybeyondplus.mine.nu:25461";
const USER = "Alberto123";
const PASS = "Alberto123";

export function getStreamUrl(streamId) {
  return `${BASE}/live/${USER}/${PASS}/${streamId}.m3u8`;
}

async function apiFetch(action, extra = "") {
  const url = `${BASE}/player_api.php?username=${USER}&password=${PASS}&action=${action}${extra}`;
  const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
  return res.json();
}

export function fetchCategories() {
  return apiFetch("get_live_categories");
}

export function fetchChannels(categoryId) {
  return apiFetch("get_live_streams", `&category_id=${categoryId}`);
}

export function fetchAllChannels() {
  return apiFetch("get_live_streams");
}