"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { FoldingGrid } from "@/components/FoldingGrid";

export function CinematicBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Fade out the statue image after the About section (around 35-45% scroll)
  const imageOpacity = useTransform(smoothProgress, [0, 0.35, 0.45], [0.9, 0.9, 0]);
  const imageScale = useTransform(smoothProgress, [0, 0.45], [1.5, 1.3]);
  const imageX = useTransform(smoothProgress, [0, 0.45], ["-25%", "-40%"]); // moves further left as it fades

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-700 bg-transparent"
    >

      <motion.div
        className="w-full h-full absolute inset-0 flex items-center justify-center"
        style={{ 
          opacity: imageOpacity,
          scale: imageScale,
          x: imageX,
          y: "0%",
          rotate: "-2deg",
          transformOrigin: "center center"
        }}
      >
        <img 
          src="/assets/images/david_right.png"
          alt="Low Poly David Revolving"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            objectPosition: "center center",
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
