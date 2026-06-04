"use client";

import { GlobalStateProvider } from "@/context/GlobalState";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

/* ─── Border Frame (amber/brown subtle border) ─── */
function BorderFrame() {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />
      {/* Left border */}
      <div className="absolute top-0 left-[20px] bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-900/30 to-transparent" />
      {/* Right border */}
      <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-900/30 to-transparent" />
      {/* Top-right corner accent */}
      <svg className="absolute top-0 right-0" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M0 0 L80 0 L80 80" stroke="rgba(120,80,30,0.25)" strokeWidth="1" fill="none" />
      </svg>
      {/* Bottom-left corner accent */}
      <svg className="absolute bottom-0 left-[20px]" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M0 0 L0 80 L80 80" stroke="rgba(120,80,30,0.25)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

/* ─── Page Transition (horizontal wave SVG) ─── */
function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(pathname);
  const id = pathname.replace(/\//g, "_") || "_root_";

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      setIsTransitioning(true);
      prevPathRef.current = pathname;
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-transparent"
      style={{
        transform: isTransitioning ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <svg className="w-full h-32" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`threadGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id={`glow-${id}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 0,50 Q 250,30 500,50 T 1000,50"
          stroke={`url(#threadGradient-${id})`}
          strokeWidth="3"
          fill="none"
          filter={`url(#glow-${id})`}
          className="animate-[wave_2s_ease-in-out_infinite]"
        />
        <path
          d="M 0,50 Q 250,70 500,50 T 1000,50"
          stroke={`url(#threadGradient-${id})`}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          filter={`url(#glow-${id})`}
          className="animate-[wave_2s_ease-in-out_infinite_reverse]"
        />
      </svg>
    </div>
  );
}

/* ─── Bottom-left atomic icon ─── */
function AtomIcon() {
  return (
    <div className="fixed bottom-3 left-3 z-30 pointer-events-none">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="13" stroke="white" strokeWidth="0.6" opacity="0.45" />
        <ellipse cx="15" cy="15" rx="13" ry="5" stroke="white" strokeWidth="0.6" opacity="0.45" />
        <ellipse cx="15" cy="15" rx="13" ry="5" stroke="white" strokeWidth="0.6" opacity="0.45" transform="rotate(60 15 15)" />
        <ellipse cx="15" cy="15" rx="13" ry="5" stroke="white" strokeWidth="0.6" opacity="0.45" transform="rotate(120 15 15)" />
        <circle cx="15" cy="15" r="2" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlobalStateProvider>
      <Preloader />
      <BackgroundCanvas />
      <Navbar />
      <PageTransition />
      <BorderFrame />
      <AtomIcon />
      <div className="relative flex-1 z-10">{children}</div>
    </GlobalStateProvider>
  );
}
