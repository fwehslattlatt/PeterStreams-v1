import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import MoviesPage from "./MoviesPage";
import TVShowsPage from "./TVShowsPage";
import LiveTVPage from "./LiveTVPage";
import LandingPage from "./LandingPage";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState("movies");

  const tabs = {
    movies: MoviesPage,
    tv: TVShowsPage,
    livetv: LiveTVPage,
    // music removed
  };

  const ActiveComponent = tabs[activeTab] || MoviesPage;

  if (!entered) {
    return <LandingPage onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
