import React from "react";

export const SOURCES = [
  {
    id: "vidlink",
    name: "VidLink",
    movieUrl: (id) => `https://vidlink.pro/movie/${id}`,
    tvUrl: (id, s, e) => `https://vidlink.pro/tv/${id}/${s}/${e}`,
  },
];