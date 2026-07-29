import React from "react";

export default function MusicPage() {
  return (
    <div className="fixed inset-0 pt-[57px] bg-black" style={{ zIndex: 1 }}>
      <iframe
        src="https://monochrome.tf"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        title="Monochrome Music"
      />
    </div>
  );
}