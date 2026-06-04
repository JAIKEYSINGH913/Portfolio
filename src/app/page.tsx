"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalState";

/* ─── Blockchain cubes SVG overlay (hero section 0) ─── */
function BlockchainCubes() {
  return (
    <div className="absolute md:top-1/2 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-50 md:scale-75 lg:scale-100">
      <div className="relative w-96 h-48 flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>
            <filter id="blockGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Chain lines between cubes */}
          <line x1="85" y1="100" x2="165" y2="100" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          <line x1="235" y1="100" x2="315" y2="100" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
          {/* Cube 1 */}
          <g transform="translate(50, 100)">
            <path d="M 0,-40 L 35,-20 L 0,0 L -35,-20 Z" stroke="#ffffff" fill="url(#blockGradient)" strokeWidth="1.5" />
            <path d="M -35,-20 L -35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" opacity="1" filter="url(#blockGlow)" />
            <path d="M 35,-20 L 35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" opacity="1" filter="url(#blockGlow)" />
          </g>
          {/* Cube 2 */}
          <g transform="translate(200, 100)">
            <path d="M 0,-40 L 35,-20 L 0,0 L -35,-20 Z" stroke="#ffffff" fill="url(#blockGradient)" strokeWidth="1.5" />
            <path d="M -35,-20 L -35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" opacity="1" filter="url(#blockGlow)" />
            <path d="M 35,-20 L 35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" opacity="1" filter="url(#blockGlow)" />
          </g>
          {/* Cube 3 */}
          <g transform="translate(350, 100)">
            <path d="M 0,-40 L 35,-20 L 0,0 L -35,-20 Z" stroke="#ffffff" fill="url(#blockGradient)" strokeWidth="1.5" />
            <path d="M -35,-20 L -35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" opacity="1" filter="url(#blockGlow)" />
            <path d="M 35,-20 L 35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" opacity="1" filter="url(#blockGlow)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ─── Speed Slider (hemisphere on left edge) ─── */
function SpeedSlider() {
  const { animationSpeed, setAnimationSpeed } = useGlobalState();
  const [isOpen, setIsOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const SLIDER_HEIGHT = 256;
  const MIN_SPEED = 1.0;
  const MAX_SPEED = 11.0;

  const getPercent = useCallback(() => {
    return ((animationSpeed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100;
  }, [animationSpeed]);

  const updateSpeed = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let y = clientY - rect.top;
    y = Math.max(0, Math.min(SLIDER_HEIGHT, y));
    const fraction = 1 - y / SLIDER_HEIGHT;
    const speed = MIN_SPEED + fraction * (MAX_SPEED - MIN_SPEED);
    setAnimationSpeed(Number(speed.toFixed(1)));
  }, [setAnimationSpeed]);

  return (
    <>
      {/* ".?.: " trigger on left edge — always visible as white half-circle */}
      <div className="fixed top-0 left-0 flex items-center justify-start w-screen h-screen pointer-events-none z-10 overflow-hidden">
        <svg
          className="h-full pointer-events-auto cursor-pointer"
          width="10%"
          viewBox="0 0 400 1000"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMid meet"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path
            d="M 0 0 L 0 1000 L 0 1000 A 400 500 0 0 0 0 0 Z"
            fill="rgba(255, 255, 255, 1)"
            style={{ transition: "fill 0.3s ease" }}
          />
          <text
            x="250"
            y="500"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="150"
            fontWeight="600"
            fill="rgba(0, 0, 0, 1)"
            fontFamily="inter,sans-serif"
            style={{ transition: "fill 0.3s ease" }}
          >
            .?.:
          </text>
        </svg>
      </div>

      {/* Full Slider Panel — slides in from the left */}
      <div
        className="fixed left-0 top-[20%] z-50 flex items-center pointer-events-auto transition-all duration-500 ease-out"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateX(0) scale(1)" : "translateX(-100%) scale(0.8)",
        }}
      >
        <div className="relative">
          {/* Hemisphere background SVG */}
          <svg width="100%" height="50vh" viewBox="0 0 120 400" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="hemisphereGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.85)" />
              </linearGradient>
            </defs>
            <path d="M 0 0 L 0 400 A 80 200 0 0 0 0 0 Z" fill="url(#hemisphereGradient)" opacity="0.95" />
            <path d="M 0 0 L 0 400 A 80 200 0 0 0 0 0 Z" fill="none" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="1" />
          </svg>

          {/* Slider controls positioned over the hemisphere */}
          <div className="absolute left-0 top-1/2 scale-75 -translate-y-1/2 flex flex-col items-center">
            {/* Faster label & speed value */}
            <div className="mb-4 text-center">
              <div className="text-black text-xs font-light opacity-60">Faster</div>
              <div className="text-black text-2xl font-semibold tracking-tight">{animationSpeed.toFixed(1)}</div>
            </div>

            {/* Slider track */}
            <div
              ref={trackRef}
              className="relative w-12 cursor-pointer select-none"
              style={{ height: SLIDER_HEIGHT }}
              onPointerDown={(e) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updateSpeed(e.clientY);
              }}
              onPointerMove={(e) => { if (isDragging) updateSpeed(e.clientY); }}
              onPointerUp={(e) => { setIsDragging(false); e.currentTarget.releasePointerCapture(e.pointerId); }}
            >
              {/* Track background */}
              <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-black/20 rounded-full" />
              {/* Active fill */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1 bg-black rounded-full"
                style={{ bottom: 0, height: `${getPercent()}%` }}
              />
              {/* Handle */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-black rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                style={{
                  bottom: `calc(${getPercent()}% - 16px)`,
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                }}
              />
              {/* Tick marks */}
              {[0, 25, 50, 75, 100].map((pos) => (
                <div
                  key={pos}
                  className="absolute left-1/2 translate-x-2 w-2 h-px bg-black/30"
                  style={{ bottom: `${pos}%` }}
                />
              ))}
            </div>

            {/* Steady label */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <div className="text-black text-xs font-light opacity-60">Steady</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Main Home Page Component ─── */
export default function Home() {
  const { activeSection, setActiveSection } = useGlobalState();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const height = window.innerHeight;
      const sectionIndex = Math.round(scrollTop / height);
      if (sectionIndex !== activeSection) setActiveSection(sectionIndex);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeSection, setActiveSection]);

  if (!mounted) return <div className="h-screen bg-black" />;

  return (
    <main className="overflow-hidden h-screen">
      {/* Speed Slider */}
      <SpeedSlider />

      {/* Scroll container */}
      <div ref={containerRef} className="h-full w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory custom-scrollbar">
        {/* ═══ SECTION 0: HERO ═══ */}
        <div className="scroll-section snap-start snap-always relative pt-[2%]">
          {/* Name — top-left positioned */}
          <div className="absolute p-4 font-museo-extralight top-[10%] md:top-[10vw] lg:top-[10%] left-0 text-[2rem] md:text-[3rem] lg:text-[5rem] leading-tight md:leading-10 max-w-[90%] md:max-w-none hyphens-none"
               style={{ fontFamily: "var(--font-display), sans-serif" }}>
            JAIKEY SINGH
            <br />
            <span className="font-thin font-oxanium text-[0.7rem] md:text-[1.25rem] lg:text-[1.5rem] whitespace-nowrap">
              Software Engineer | Full-Stack & Backend | AI/ML Integration
            </span>
          </div>

          {/* Blockchain cubes — center */}
          <BlockchainCubes />

          {/* Bottom-right text */}
          <div className="absolute md:bottom-[6%] bottom-[15%] right-4 md:right-8 items-end flex flex-col gap-4 md:gap-6 z-20 max-w-[95%] md:max-w-[95%] lg:max-w-[100%]">
            <div className="max-w-[60%] md:max-w-[55%] lg:max-w-[50%] self-end opacity-100">
              <div className="rounded-lg p-0 md:p-2 shadow-xl">
                <div className="font-thin text-right text-[3vw] md:text-[1.5vw] lg:text-[1.5vw] whitespace-pre-line break-words hyphens-none">
                  Building high-performance APIs, robust database architectures, and scalable AI solutions.
                </div>
              </div>
            </div>
            <div className="text-right font-medium text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight md:leading-tight break-words hyphens-none">
              Perceive. Design. Develop
            </div>
          </div>
        </div>

        {/* ═══ SECTION 1: PHILOSOPHY ═══ */}
        <div className="scroll-section snap-start snap-always relative pt-[2%]">
          {/* Top-left text */}
          <div className="absolute top-[10%] md:top-[10vw] lg:top-[10%] left-2 md:left-4 p-4 max-w-[90%] md:max-w-[40%] z-20">
            <div className="font-thin text-[0.9rem] md:text-[1.1rem] lg:text-[1.2rem] leading-relaxed whitespace-pre-line break-words hyphens-none">
              <b>Modularity & performance</b> are vital.
              <br />
              Designing microservices that are clean, database queries that are optimized, and backend structures built to scale.
            </div>
          </div>
          {/* Bottom-right large text */}
          <div className="absolute md:bottom-[6%] bottom-[15%] right-4 md:right-8 items-end flex flex-col gap-4 md:gap-6 z-20 max-w-[95%] md:max-w-[95%] lg:max-w-[100%]">
            <div className="text-right font-medium text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight md:leading-tight break-words hyphens-none">
              Modularity & maintainability by design
            </div>
          </div>
        </div>

        {/* ═══ SECTION 2: AI & KNOWLEDGE GRAPHS ═══ */}
        <div className="scroll-section snap-start snap-always relative pt-[2%]">
          {/* Top-right text */}
          <div className="absolute top-[10%] md:top-[10vw] lg:top-[10%] right-2 md:right-4 p-4 max-w-[90%] md:max-w-[40%] z-20">
            <div className="font-thin text-[0.9rem] md:text-[1.1rem] lg:text-[1.2rem] leading-relaxed whitespace-pre-line break-words hyphens-none">
              Connecting raw text and semantic graphs.
              <br />
              Published researcher on hybrid <b>GraphRAG</b> architectures using <b>Neo4j</b> to achieve hallucination-free legal mappings.
            </div>
          </div>
          {/* Bottom-left large text */}
          <div className="absolute md:bottom-[6%] bottom-[15%] left-4 md:left-8 items-start flex flex-col gap-4 md:gap-6 z-20 max-w-[95%] md:max-w-[95%] lg:max-w-[100%]">
            <div className="text-left font-medium text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight md:leading-tight break-words hyphens-none">
              NyayMitra: Proposed GraphRAG Architecture
            </div>
          </div>
        </div>

        {/* ═══ SECTION 3: BACKEND SCALABILITY ═══ */}
        <div className="scroll-section snap-start snap-always relative pt-[2%]">
          {/* Top-left text */}
          <div className="absolute top-[10%] md:top-[10vw] lg:top-[10%] left-2 md:left-4 p-4 max-w-[90%] md:max-w-[40%] z-20">
            <div className="font-thin text-[0.9rem] md:text-[1.1rem] lg:text-[1.2rem] leading-relaxed whitespace-pre-line break-words hyphens-none">
              Pipelining clean architectures.
              <br />
              Whether it&apos;s robust Java/Spring Boot microservices or highly async FastAPI backends, I write code that expects high throughput.
            </div>
          </div>
          {/* Bottom-right large text */}
          <div className="absolute md:bottom-[6%] bottom-[15%] right-4 md:right-8 items-end flex flex-col gap-4 md:gap-6 z-20 max-w-[95%] md:max-w-[95%] lg:max-w-[100%]">
            <div className="text-right font-medium text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight md:leading-tight break-words hyphens-none">
              Cause &amp; Effect
            </div>
          </div>
        </div>

        {/* ═══ SECTION 4: CONNECTION ═══ */}
        <div className="scroll-section snap-start snap-always relative pt-[2%]">
          {/* Top-right text */}
          <div className="absolute top-[10%] md:top-[10vw] lg:top-[10%] right-2 md:right-4 p-4 max-w-[90%] md:max-w-[40%] z-20">
            <div className="font-thin text-[0.9rem] md:text-[1.1rem] lg:text-[1.2rem] leading-relaxed whitespace-pre-line break-words hyphens-none">
              Interested in collaborating, hiring, or discussing backend architectures & AI?
              <br />
              Sounds interesting?{" "}
              <Link href="/about" className="font-bold hover:text-blue-200">
                Let&apos;s connect..
              </Link>
            </div>
          </div>
          {/* Bottom-left large text */}
          <div className="absolute md:bottom-[6%] bottom-[15%] left-4 md:left-8 items-start flex flex-col gap-4 md:gap-6 z-20 max-w-[95%] md:max-w-[95%] lg:max-w-[100%]">
            <div className="text-left font-medium text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight md:leading-tight break-words hyphens-none">
              Turn complex architectures into scalable realities
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
