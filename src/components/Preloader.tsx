"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";
    
    // Hold the preloader for 2.8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[var(--canvas)] flex items-center justify-center overflow-hidden"
        >
          {/* Hyper-speed 3D Grid Space */}
          <div className="absolute inset-0 opacity-20 md:opacity-30 [perspective:800px]">
            {/* Floor Grid */}
            <div 
              className="absolute w-[200%] h-[150%] left-[-50%] bottom-[-20%] origin-bottom"
              style={{
                transform: "rotateX(75deg)",
                backgroundImage: "linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to bottom, var(--accent) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                animation: "grid-hyper 0.4s linear infinite",
                WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
              }}
            />
            {/* Ceiling Grid */}
            <div 
              className="absolute w-[200%] h-[150%] left-[-50%] top-[-20%] origin-top"
              style={{
                transform: "rotateX(-75deg)",
                backgroundImage: "linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to top, var(--accent) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                animation: "grid-hyper 0.4s linear infinite",
                WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
              }}
            />
          </div>

          <style>{`
            @keyframes grid-hyper {
              0% { background-position: 0 0; }
              100% { background-position: 0 80px; }
            }
          `}</style>

          {/* 3D Paper Fold Object */}
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32" style={{ perspective: "1000px" }}>
            <motion.div
              animate={{
                rotateX: [0, 180, 180, 0, 0],
                rotateY: [0, 0, 180, 180, 0],
              }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
                repeatDelay: 0.1
              }}
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face */}
              <div 
                className="absolute inset-0 bg-[var(--surface-1)] border-2 border-[var(--border-strong)] flex items-center justify-center shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="font-mono text-sm font-bold text-[var(--accent)] tracking-widest">
                  INIT
                </span>
              </div>
              {/* Back Face (Paper Folded Over) */}
              <div 
                className="absolute inset-0 bg-[var(--accent)] border-2 border-[var(--surface-1)] flex items-center justify-center shadow-accent"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="font-mono text-sm font-bold text-[#080604] tracking-widest">
                  LOAD
                </span>
              </div>
            </motion.div>
          </div>

          {/* Loading Text & Progress Line */}
          <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 flex flex-col items-end z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-none flex items-baseline gap-3 flex-wrap justify-end"
            >
              <span className="text-[var(--text-primary)]">JAIKEY</span>
              <motion.span
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  backgroundColor: "var(--accent)",
                  color: "#ffffff",
                  display: "inline-block",
                  padding: "0 14px 4px 14px",
                  transformOrigin: "left center",
                  lineHeight: 1.1,
                }}
              >
                SINGH
              </motion.span>
            </motion.div>
            
            <div className="w-full overflow-hidden mt-2">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ delay: 0.5, duration: 2.3, ease: "circOut" }}
                className="h-[2px] bg-[var(--accent)] w-full"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
              className="font-mono text-xs md:text-sm text-[var(--text-secondary)] mt-4 uppercase tracking-widest"
            >
              Building Space...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
