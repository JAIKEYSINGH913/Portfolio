"use client";

import { useState, useEffect, useRef } from "react";

const WELCOME_TEXT = "JAIKEY SINGH";

const BAR_X_POSITIONS = [
  10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 153, 164, 175, 186,
  197, 208, 219,
];

// Opacity: starts at 0.88, peaks at 1.0 at center (index 10), symmetric
const BAR_OPACITIES = [
  0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94, 0.96, 0.97, 0.99, 1.0, 0.99,
  0.97, 0.96, 0.94, 0.93, 0.92, 0.91, 0.9, 0.89,
];

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    const letters = letterRefs.current;
    const totalLetters = WELCOME_TEXT.length;

    // Step 1: Fade in letters one-by-one after 300ms
    const fadeInTimeout = setTimeout(() => {
      letters.forEach((el, i) => {
        if (el) {
          setTimeout(() => {
            el.style.opacity = "1";
          }, i * 80);
        }
      });
    }, 300);

    // Step 2: After all letters visible + 800ms hold
    const allLettersTime = 300 + totalLetters * 80;
    const holdTime = allLettersTime + 800;

    // Step 3: Fade out SVG and letters
    const fadeOutTimeout = setTimeout(() => {
      setIsExiting(true);

      // Fade out SVG bars
      if (svgRef.current) {
        svgRef.current.style.transition = "opacity 400ms ease";
        svgRef.current.style.opacity = "0";
      }

      // Fade out letters
      letters.forEach((el) => {
        if (el) {
          el.style.transition = "opacity 400ms ease";
          el.style.opacity = "0";
        }
      });
    }, holdTime);

    // Step 4: Expand radial gradient after fade out
    const expandTimeout = setTimeout(() => {
      if (bgRef.current) {
        const duration = 600;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const size = eased * 150;

          if (bgRef.current) {
            bgRef.current.style.background = `radial-gradient(circle at center, transparent ${size}%, #FFF8F0 100%)`;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Step 5: Remove from DOM
            document.body.style.overflow = "";
            setIsVisible(false);
          }
        };

        requestAnimationFrame(animate);
      }
    }, holdTime + 400);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(expandTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Heartbeat keyframe styles */}
      <style jsx global>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(2.2);
          }
        }
      `}</style>

      {/* Background overlay with radial gradient */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-[9999]"
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, transparent 0%, #FFF8F0 0%)",
        }}
      />

      {/* SVG Audio Wave Heart */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
        <svg
          ref={svgRef}
          viewBox="0 0 240 100"
          className="w-60 h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {BAR_X_POSITIONS.map((x, i) => (
            <rect
              key={i}
              x={x}
              y={42}
              width={3}
              height={16}
              rx={1.5}
              fill="#D96B43"
              style={{
                opacity: BAR_OPACITIES[i],
                animation: `heartbeat 0.8s ease-in-out ${i * 0.04}s infinite`,
                transformOrigin: `${x + 1.5}px 50px`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Letter-by-letter text */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
        <p className="text-4xl md:text-5xl lg:text-6xl tracking-wider font-display font-bold text-[#2B2825]">
          {WELCOME_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="letter inline-block opacity-0"
              style={{
                transition: "opacity 300ms ease",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
