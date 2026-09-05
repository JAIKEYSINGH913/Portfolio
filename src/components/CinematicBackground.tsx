"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export function CinematicBackground() {
  const { scrollYProgress } = useScroll();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [frame, setFrame] = useState("/assets/images/david_right.jpg");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => setMounted(true), []);

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  });

  // Frame order: Side → Front → Back → Flipped Side → Side
  useEffect(() => {
    return smoothProgress.onChange((v) => {
      if (v < 0.125) {
        setFrame("/assets/images/david_right.jpg"); // Hero: Side profile
        setIsFlipped(false);
      } else if (v < 0.375) {
        setFrame("/assets/images/david_statue.jpg"); // About: Front facing
        setIsFlipped(false);
      } else if (v < 0.625) {
        setFrame("/assets/images/david_back.jpg");   // Skills: Back
        setIsFlipped(false);
      } else if (v < 0.875) {
        setFrame("/assets/images/david_right.jpg");  // Works: Left profile (flipped)
        setIsFlipped(true);
      } else {
        setFrame("/assets/images/david_right.jpg");  // End: Side again
        setIsFlipped(false);
      }
    });
  }, [smoothProgress]);

  // Positions mapped to sections
  const x = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ["-25%", "25%", "0%", "-20%", "0%"]
  );
  
  const y = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ["0%", "5%", "15%", "-5%", "10%"]
  );
  
  const scale = useTransform(smoothProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [1.5, 1.6, 1.8, 1.5, 1.6, 1.4]
  );
  
  const rotateZ = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [-2, 3, 0, -2, 0]
  );

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
        style={{ x, y, scale, rotateZ }}
      >
        <img 
          src={frame}
          alt="Low Poly David Revolving"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            objectPosition: "center center",
            opacity: 0.7,
            // Flip the image if it's the left profile, and apply light mode inversion
            transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
            filter: isLight ? "invert(1) contrast(1.1) brightness(1.1)" : "none",
            transition: "filter 0.7s ease, opacity 0.7s ease, transform 0.1s linear" // fast transform so flip is instant
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
