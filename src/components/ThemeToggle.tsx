"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme === "light") {
      setTheme("dark");
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return <div className="w-9 h-11" />; // Placeholder size
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <motion.button
        onClick={() => {
          if (isDark) {
            setShowError(true);
          } else {
            setTheme("dark");
          }
        }}
        whileTap={{ y: 80 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative flex flex-col items-center bg-transparent border-0 p-0 m-0 rounded-none cursor-pointer overflow-visible group z-50"
        aria-label="Toggle Theme"
        title="Switch Theme"
      >
        {/* The hanging rope extending all the way up */}
        <div 
          className="absolute bottom-full w-[2px] h-[100vh] pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to top, #A65B32, #553311 20%, transparent)',
            boxShadow: '2px 0 4px rgba(0,0,0,0.5)',
            transform: 'translateX(2px)' // Center it on the bulb's base
          }} 
        />

        <div className="relative w-16 h-24 rotate-180 transform origin-center transition-transform hover:scale-105 duration-300">
          {/* Rays (visible only in light mode) */}
          <div 
            className={`absolute inset-0 -m-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'opacity-0 scale-50 rotate-[-30deg]' : 'opacity-100 scale-100 rotate-0'}`}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
              <polyline points="50,5 50,20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '3s' }} />
              <polyline points="50,80 50,95" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '3s' }} />
              <polyline points="18,18 28,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
              <polyline points="72,72 82,82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
              <polyline points="5,50 20,50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
              <polyline points="80,50 95,50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
              <polyline points="18,82 28,72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '2.8s' }} />
              <polyline points="72,28 82,18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="animate-pulse" style={{ animationDuration: '2.8s' }} />
            </svg>
          </div>

          {/* Papercraft 3D Folded Lightbulb */}
          <svg viewBox="0 0 100 140" className="w-full h-full relative z-10 drop-shadow-lg">
            
            {/* Glass Bulb Body - Background */}
            <g transform="translate(50, 50)" className="transition-all duration-500">
              <polygon 
                points="-25,-30 0,-45 25,-30 35,0 15,45 -15,45 -35,0"
                fill={isDark ? "rgba(40,40,40,0.4)" : "#FFEA75"} 
                stroke={isDark ? "var(--border-strong)" : "#E6B319"} 
                strokeWidth="2"
                className={`transition-all duration-500 ${isDark ? '' : 'drop-shadow-[0_0_20px_rgba(255,234,117,1)]'}`}
                style={{ strokeLinejoin: "round" }}
              />
            </g>

            {/* Filament (Inside the glass) */}
            <g transform="translate(50, 95)" className="transition-colors duration-500">
              <polyline points="-8,0 -12,-30" stroke={isDark ? "#555" : "#A65B32"} strokeWidth="1.5" fill="none" />
              <polyline points="8,0 12,-30" stroke={isDark ? "#555" : "#A65B32"} strokeWidth="1.5" fill="none" />
              <polyline 
                points="-12,-30 -6,-40 0,-30 6,-40 12,-30" 
                stroke={isDark ? "#555" : "#FF6B00"} 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinejoin="miter"
                className={`transition-all duration-500 ${isDark ? '' : 'drop-shadow-[0_0_6px_#FF6B00]'}`} 
              />
            </g>

            {/* Glass Bulb Body - Foreground Facets */}
            <g transform="translate(50, 50)" className="transition-all duration-500">
              <polyline points="-25,-30 0,0 25,-30" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)"} fill="none" strokeWidth="1.5" />
              <polyline points="-35,0 0,0 35,0" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)"} fill="none" strokeWidth="1.5" />
              <polyline points="-15,45 0,0 15,45" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)"} fill="none" strokeWidth="1.5" />
              <line x1="0" y1="-45" x2="0" y2="0" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)"} strokeWidth="1.5" />
              
              <polygon points="0,-45 25,-30 0,0" fill="rgba(0,0,0,0.05)" />
              <polygon points="25,-30 35,0 0,0" fill="rgba(0,0,0,0.1)" />
              <polygon points="35,0 15,45 0,0" fill="rgba(0,0,0,0.15)" />
              <polygon points="0,0 -15,45 -35,0" fill="var(--border-strong)" />
              <polygon points="0,0 -35,0 -25,-30" fill="rgba(255,255,255,0.2)" />
              <polygon points="0,0 -25,-30 0,-45" fill="rgba(255,255,255,0.3)" />
            </g>

            {/* Base Screw - Origami style */}
            <g transform="translate(50, 105)">
              <polygon points="-15,-10 15,-10 13,20 -13,20" fill={isDark ? "#2A2A2A" : "#8c8c8c"} stroke={isDark ? "#111" : "#555"} strokeWidth="2" strokeLinejoin="round" />
              <polyline points="-14,-2 14,0" stroke={isDark ? "#111" : "#555"} strokeWidth="1.5" />
              <polyline points="-14,6 14,8" stroke={isDark ? "#111" : "#555"} strokeWidth="1.5" />
              <polyline points="-13,14 13,16" stroke={isDark ? "#111" : "#555"} strokeWidth="1.5" />
              <polygon points="-5,20 5,20 0,28" fill={isDark ? "#111" : "#222"} stroke={isDark ? "#000" : "#222"} strokeWidth="2" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      </motion.button>

      {/* Light Mode Disabled Modal */}
      {showError && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowError(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative flex flex-col items-center justify-center max-w-md w-full bg-[var(--surface-1)] border border-[var(--border-strong)] p-10 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Large Cross */}
            <button 
              onClick={() => setShowError(false)}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="mb-6 text-[var(--accent)]">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            
            <h2 className="font-display text-2xl font-bold mb-4 text-[var(--text-primary)]">ACCESS DENIED</h2>
            <p className="font-mono text-sm leading-relaxed text-[var(--text-secondary)] tracking-widest uppercase">
              Sorry, Light Mode is disabled on this device.
            </p>
            
            <button 
              onClick={() => setShowError(false)}
              className="mt-8 px-8 py-3 bg-[var(--surface-2)] border border-[var(--border-strong)] font-mono text-xs font-bold tracking-widest uppercase text-[var(--text-primary)] hover:bg-[var(--accent-light)] hover:border-[var(--accent-glow)] transition-colors duration-300"
            >
              ACKNOWLEDGE
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
