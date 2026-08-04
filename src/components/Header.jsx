import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Film, Tv, Radio } from "lucide-react";
import HackerSearchOverlay from "./HackerSearchOverlay";

export default function Header({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "movies", label: "Movies", icon: Film },
    { id: "tv", label: "TV Shows", icon: Tv },
    { id: "livetv", label: "Live TV", icon: Radio },
    // music removed
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 border-b border-green-500/20" : "bg-gradient-to-b from-black/90 to-transparent"
        }`}
        style={scrolled ? { boxShadow: "0 0 20px rgba(0,255,65,0.05)" } : {}}
      >
        <div className="flex items-center justify-between px-4 md:px-10 py-3">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <a href="#">
              <img
                src="https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/1998dff4f_peterstreamscom.png"
                alt="PeterStreams"
                className="h-12 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,255,65,0.3))" }}
              />
            </a>

            {/* Desktop tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 border ${
                      activeTab === tab.id
                        ? "border-green-400/60 text-green-400 bg-green-400/10"
                        : "border-transparent text-green-400/50 hover:text-green-400 hover:border-green-400/30"
                    }`}
                  >
                    <Icon size={13} />
                    {tab.label}
                    {activeTab === tab.id && <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 border border-green-500/30 text-green-400/60 hover:text-green-400 hover:border-green-400/60 transition-all font-mono text-xs uppercase"
            >
              <Search size={14} />
              <span className="hidden sm:block">Search</span>
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex border-t border-green-500/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id ? "text-green-400 border-b-2 border-green-400" : "text-green-400/40"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && <HackerSearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
