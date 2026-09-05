"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function CinematicBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: isLight ? "#F5F5F5" : "#080604" }}
    >
      <style>{`
        @keyframes grid-forward {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
      `}</style>

      {/* 3D Grid Floor */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[60vh] opacity-50"
        style={{
          perspective: "800px",
          maskImage: "linear-gradient(to top, black 10%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 100%)",
        }}
      >
        <div 
          className="absolute w-[200%] h-[150%] left-[-50%] bottom-0"
          style={{
            transformOrigin: "bottom center",
            transform: "rotateX(70deg)",
            backgroundImage: isLight
              ? "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(200,90,42,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,90,42,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "grid-forward 2s linear infinite"
          }}
        />
      </div>

      {/* 3D Grid Ceiling */}
      <div 
        className="absolute inset-x-0 top-0 h-[60vh] opacity-30"
        style={{
          perspective: "800px",
          maskImage: "linear-gradient(to bottom, black 10%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 100%)",
        }}
      >
        <div 
          className="absolute w-[200%] h-[150%] left-[-50%] top-0"
          style={{
            transformOrigin: "top center",
            transform: "rotateX(-70deg)",
            backgroundImage: isLight
              ? "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to top, rgba(0,0,0,0.1) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(200,90,42,0.15) 1px, transparent 1px), linear-gradient(to top, rgba(200,90,42,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "grid-forward 2s linear infinite"
          }}
        />
      </div>

      <motion.div
        className="w-full h-full absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateX(-25%) translateY(0%) scale(1.5) rotate(-2deg)" }}
      >
        <img 
          src="/assets/images/david_right.jpg"
          alt="Low Poly David Revolving"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            objectPosition: "center center",
            opacity: 0.7,
            filter: isLight ? "invert(1) contrast(1.1) brightness(1.1)" : "none",
            transition: "filter 0.7s ease"
          }}
        />
      </motion.div>
      
      {/* Vignettes for blending */}
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: isLight 
            ? "linear-gradient(to top, rgba(245,245,245,0.9), transparent, rgba(245,245,245,0.9))" 
            : "linear-gradient(to top, rgba(8,6,4,0.9), transparent, rgba(8,6,4,0.9))",
          opacity: 0.3
        }} 
      />
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: isLight 
            ? "linear-gradient(to right, rgba(245,245,245,0.8), transparent, rgba(245,245,245,0.8))" 
            : "linear-gradient(to right, rgba(8,6,4,0.8), transparent, rgba(8,6,4,0.8))",
          opacity: 0.3
        }} 
      />
      
      {/* Digital noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
    </div>
  );
}
