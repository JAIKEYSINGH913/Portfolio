"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    // Run once to initialize if already scrolled
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  // Positioned at the bottom instead of the top
  return (
    <div 
      className="fixed bottom-0 left-0 h-[3px] z-[200]" 
      style={{ 
        width: `${pct}%`, 
        background: "linear-gradient(90deg, #C85A2A, #E5A93D, #C85A2A)", 
        transition: "width 80ms linear",
        boxShadow: "0 -2px 10px rgba(200, 90, 42, 0.4)"
      }} 
    />
  );
}
