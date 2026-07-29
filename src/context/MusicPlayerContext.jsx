import React, { createContext, useContext, useReducer, useRef, useEffect, useCallback } from "react";
import { getTrackStream, getRecommendations, normalizeTrack } from "@/lib/hifi";

const MusicPlayerContext = createContext(null);

const initialState = {
  currentTrack: null,
  queue: [],
  history: [],
  isPlaying: false,
  isBuffering: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  shuffle: false,
  repeat: "none", // none | one | all
  showPlayer: false,
  showExpanded: false,
  showQueue: false,
  favorites: [],
  recentlyPlayed: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "PLAY_TRACK":
      return {
        ...state,
        currentTrack: action.track,
        isPlaying: true,
        isBuffering: true,
        showPlayer: true,
        currentTime: 0,
        history: state.currentTrack
          ? [state.currentTrack, ...state.history.slice(0, 49)]
          : state.history,
        recentlyPlayed: state.currentTrack
          ? [state.currentTrack, ...state.recentlyPlayed.filter(t => t.id !== state.currentTrack.id).slice(0, 19)]
          : state.recentlyPlayed,
      };
    case "SET_QUEUE":
      return { ...state, queue: action.queue };
    case "ADD_TO_QUEUE":
      return { ...state, queue: [...state.queue, ...action.tracks] };
    case "REMOVE_FROM_QUEUE":
      return { ...state, queue: state.queue.filter((_, i) => i !== action.index) };
    case "REORDER_QUEUE": {
      const q = [...state.queue];
      const [moved] = q.splice(action.from, 1);
      q.splice(action.to, 0, moved);
      return { ...state, queue: q };
    }
    case "SET_PLAYING":
      return { ...state, isPlaying: action.isPlaying };
    case "SET_BUFFERING":
      return { ...state, isBuffering: action.isBuffering };
    case "SET_TIME":
      return { ...state, currentTime: action.currentTime };
    case "SET_DURATION":
      return { ...state, duration: action.duration };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "TOGGLE_SHUFFLE":
      return { ...state, shuffle: !state.shuffle };
    case "TOGGLE_REPEAT":
      return {
        ...state,
        repeat: state.repeat === "none" ? "all" : state.repeat === "all" ? "one" : "none",
      };
    case "TOGGLE_EXPANDED":
      return { ...state, showExpanded: !state.showExpanded };
    case "SET_EXPANDED":
      return { ...state, showExpanded: action.value };
    case "TOGGLE_QUEUE":
      return { ...state, showQueue: !state.showQueue };
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.find(t => t.id === action.track.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(t => t.id !== action.track.id)
          : [action.track, ...state.favorites],
      };
    }
    default:
      return state;
  }
}

export function MusicPlayerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audioRef = useRef(new Audio());
  const stateRef = useRef(state);
  stateRef.current = state;

  // Sync volume
  useEffect(() => {
    audioRef.current.volume = state.volume;
  }, [state.volume]);

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => dispatch({ type: "SET_TIME", currentTime: audio.currentTime });
    const onDuration = () => dispatch({ type: "SET_DURATION", duration: audio.duration });
    const onPlaying = () => dispatch({ type: "SET_BUFFERING", isBuffering: false });
    const onWaiting = () => dispatch({ type: "SET_BUFFERING", isBuffering: true });
    const onEnded = () => handleTrackEnded();
    const onPause = () => dispatch({ type: "SET_PLAYING", isPlaying: false });
    const onPlay = () => dispatch({ type: "SET_PLAYING", isPlaying: true });

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDuration);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDuration);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  const loadAndPlay = useCallback(async (track) => {
    if (!track) return;
    dispatch({ type: "PLAY_TRACK", track });
    const audio = audioRef.current;
    audio.pause();
    audio.src = "";

    try {
      // BeatBoss spec: if track already has streamURL, skip /stream/:id call
      let streamUrl = track.streamURL ?? null;

      if (!streamUrl) {
        const streamData = await getTrackStream(track.id);
        streamUrl = streamData?.url ?? null;
      }

      if (streamUrl) {
        audio.src = streamUrl;
        audio.play().catch(() => {});
      } else {
        console.warn("No stream URL found for track", track.id);
        dispatch({ type: "SET_BUFFERING", isBuffering: false });
      }
    } catch (err) {
      console.error("Stream error:", err);
      dispatch({ type: "SET_BUFFERING", isBuffering: false });
    }
  }, []);

  const handleTrackEnded = useCallback(async () => {
    const s = stateRef.current;
    if (s.repeat === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    if (s.queue.length > 0) {
      const next = s.queue[0];
      dispatch({ type: "SET_QUEUE", queue: s.queue.slice(1) });
      loadAndPlay(next);
    } else if (s.repeat === "all" && s.history.length > 0) {
      loadAndPlay(s.history[s.history.length - 1]);
    } else if (s.currentTrack) {
      // Autoplay: search for similar songs by same artist
      try {
        const { searchTracks } = await import("@/lib/hifi");
        const artist = typeof s.currentTrack.artist === "string"
          ? s.currentTrack.artist
          : (s.currentTrack.artist?.name ?? "");
        const results = await searchTracks(artist, 20);
        const similar = results
          .map(normalizeTrack)
          .filter(Boolean)
          .filter(t => t.id !== s.currentTrack.id);
        if (similar.length > 0) {
          const next = similar[0];
          dispatch({ type: "ADD_TO_QUEUE", tracks: similar.slice(1, 6) });
          loadAndPlay(next);
        }
      } catch {}
    }
  }, [loadAndPlay]);

  const playTrack = useCallback((track) => {
    loadAndPlay(track);
  }, [loadAndPlay]);

  const playAlbum = useCallback((tracks, startIndex = 0) => {
    if (!tracks?.length) return;
    const norm = tracks.map(normalizeTrack).filter(Boolean);
    loadAndPlay(norm[startIndex]);
    dispatch({ type: "SET_QUEUE", queue: norm.slice(startIndex + 1) });
  }, [loadAndPlay]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (state.isPlaying) audio.pause();
    else audio.play().catch(() => {});
  }, [state.isPlaying]);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    dispatch({ type: "SET_TIME", currentTime: time });
  }, []);

  const skipNext = useCallback(() => {
    const s = stateRef.current;
    if (s.queue.length > 0) {
      const next = s.queue[0];
      dispatch({ type: "SET_QUEUE", queue: s.queue.slice(1) });
      loadAndPlay(next);
    }
  }, [loadAndPlay]);

  const skipPrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const s = stateRef.current;
    if (s.history.length > 0) {
      loadAndPlay(s.history[0]);
    }
  }, [loadAndPlay]);

  const value = {
    ...state,
    playTrack,
    playAlbum,
    togglePlay,
    seek,
    skipNext,
    skipPrev,
    dispatch,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return ctx;
}