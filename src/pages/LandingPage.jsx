import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GIFS = [
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/042c98d6a_1629.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/c8dd7d6b7_ariana-grande-family-guy.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/deae26e34_he-said-it.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/c6c9677c1_nle-choppa.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/36b9b71f6_texans-houston-texans.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/18fc3bb57_stallipiano.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/b7cb534d7_pop-popteamepic.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/1e66772c3_lil-wayne.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/bf7cddd36_ken-carson-smile.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/f13ddaed3_juice-wrld-jarad-higgins.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/ef3cbbdcd_ishowspeed-funny.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/f84cdb0db_travis-scott-thatboiicheck.gif",
  "https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/935618898_yukari-yakumo-yukari.gif",
];

export default function LandingPage({ onEnter }) {
  const canvasRef = useRef(null);
  const [bgGif] = useState(() => GIFS[Math.floor(Math.random() * GIFS.length)]);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    const interval = setInterval(draw, 40);
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* GIF background */}
      <img
        src={bgGif}
        alt=""
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: "fill", opacity: 0.65 }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <img
            src="https://media.base44.com/images/public/6a0e628fba5c07c6a3ea4522/b32be1bdf_Untitled_presentation-2-removebg-preview.png"
            alt="PeterStreams"
            className="w-[28rem] md:w-[36rem] object-contain drop-shadow-[0_0_30px_rgba(0,255,65,0.4)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-green-400 font-mono text-sm tracking-widest uppercase opacity-70">
            &gt; stream anything. anytime. _
          </p>
          <button
            onClick={onEnter}
            className="relative group px-10 py-3 font-mono font-bold text-lg tracking-widest uppercase overflow-hidden border border-green-400 text-green-400 hover:text-black transition-colors du[...]"
            style={{ background: "transparent" }}
          >
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 bg-green-400"
            />
            <span className="relative z-10">[ ENTER ]</span>
          </button>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-green-400/30 font-mono text-xs">SYS://PETERSTREAMS_V2.0</div>
      <div className="absolute top-4 right-4 text-green-400/30 font-mono text-xs">STATUS: ONLINE</div>
      <div className="absolute bottom-4 left-4 text-green-400/30 font-mono text-xs">UPLINK: SECURE</div>
      <div className="absolute bottom-4 right-4 text-green-400/30 font-mono text-xs">ENCRYPTED</div>

      {/* Contact message */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-green-400/80 font-mono text-sm">
        <a href="mailto:peterstream@aol.com" className="underline">contact us at peterstream@aol.com</a>
      </div>
    </div>
  );
}
