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
        {/* In light mode: keep the original dramatic low-poly render but clamp its brightness
            so it reads as a dark sculptural form against granite rather than a washed-out ghost.
            `brightness(0.72)` keeps the polygon shading rich and visible.
            `contrast(1.25)` sharpens the facet edges for that chiseled, architectural look.
            `saturate(0.6)` pulls back the original blue-tinted dark tones toward a neutral stone gray
            that harmonises with the warm granite canvas.
            `drop-shadow` adds sculptural depth rather than a flat silhouette.
            `normal` blend keeps original polygon colors intact — no color inversion. */}
        <img 
          src="/assets/images/david_right.png"
          alt="Low Poly David"
          className="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "center top",
            filter: isLight 
              ? "brightness(0.72) contrast(1.25) saturate(0.6) drop-shadow(0 20px 60px rgba(80,60,40,0.35))"
              : "brightness(1) contrast(1) saturate(1) drop-shadow(0 0 60px rgba(200,90,42,0.18))",
            mixBlendMode: "normal",
          }}
        />
      </motion.div>

      {/* --- Light mode: warm amber overlay to unify the statue with the granite canvas ---
          This tints the cold steel-grey of the statue very slightly amber/sepia,
          matching the warm undertone in #E6E6E4, so nothing looks digitally foreign. */}
      {isLight && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: "radial-gradient(ellipse 55% 70% at 62% 45%, rgba(200,150,90,0.10) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Vignettes — strong bottom bleed so the image never shows a hard edge on any device */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? `linear-gradient(to top,  rgba(230,230,228,1) 0%, rgba(230,230,228,0.95) 12%, rgba(230,230,228,0.5) 28%, transparent 50%, rgba(230,230,228,0.6) 100%),
               linear-gradient(to right, rgba(230,230,228,0.9) 0%, transparent 25%, rgba(230,230,228,0.9) 100%)`
            : `linear-gradient(to top,  rgba(8,6,4,1) 0%, rgba(8,6,4,0.95) 12%, rgba(8,6,4,0.5) 28%, transparent 50%, rgba(8,6,4,0.6) 100%),
               linear-gradient(to right, rgba(8,6,4,0.9) 0%, transparent 25%, rgba(8,6,4,0.9) 100%)`,
        }}
      />
      
      {/* Digital grain — higher in light mode for the rough granite feel */}
      <div 
        className={`absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-700 ${isLight ? 'opacity-[0.10]' : 'opacity-[0.03]'}`}
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />
    </div>
  );
}
