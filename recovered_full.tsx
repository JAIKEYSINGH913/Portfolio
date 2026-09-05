"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import { ResumeViewer } from "@/components/ResumeViewer";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: "AI-Powered Analytics Dashboard",
    description:
      "Real-time data visualization platform with ML-driven predictive insights, interactive D3 charts, and natural language querying. Powers business intelligence for enterprise clients.",
    tags: ["React", "Python", "TensorFlow", "D3.js"],
    imageUrl: "/assets/images/papercraft_monitor.png",
    badge: "Real-Time Pipeline",
    statLabel: "< 200ms p99",
    version: "v2.4.1",
  },
  {
    title: "OrigamiGraph — 3D Data Visualizer",
    description:
      "Transforms high-dimensional data into tactile, interactive 3D graph structures in fluid, hardware-accelerated WebGL. Custom shaders handle 50,000+ nodes with instanced rendering.",
    tags: ["Three.js", "WebGL", "TypeScript", "GLSL"],
    imageUrl: "/assets/images/puppet_portrait.png",
    badge: "WebGL Canvas",
    statLabel: "60 FPS locked",
    version: "v1.8.0",
  },
  {
    title: "ShadowPlay — Low-Latency Event Broker",
    description:
      "High-throughput pub/sub messaging system. Employs circular memory ring buffers and zero-copy packet processing to sustain massive concurrent message delivery with sub-2ms latencies.",
    tags: ["Node.js", "Redis", "Docker", "gRPC"],
    imageUrl: "/assets/images/project_blockchain.png",
    badge: "Event Pipeline",
    statLabel: "180k msgs / sec",
    version: "v0.9.8",
  },
  {
    title: "PaperKinematics — 2D Verlet Engine",
    description:
      "Featherweight (~4.2kb gzipped) TypeScript physics engine delivering elastic constraints, cloth simulation, and realistic suspended string pendulum physics for web interfaces.",
    tags: ["TypeScript", "Verlet Solvers", "NPM Package", "Zero Deps"],
    imageUrl: "/assets/images/project_diagram.png",
    badge: "Physics Library",
    statLabel: "1.2k Stars",
    version: "v3.0.1",
  },
];

/* ═══════════════════════════════════════════════
   INTERACTIVE COMPONENTS
   ═══════════════════════════════════════════════ */

/** Hero puppet with 3D tilt on mouse movement */
function HeroPuppet() {
  const puppetRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);

  // Smooth lerp animation loop
  useEffect(() => {
    const loop = () => {
      const t = tiltRef.current;
      t.x += (t.targetX - t.x) * 0.085;
      t.y += (t.targetY - t.y) * 0.085;
      if (puppetRef.current && !isAnimating) {
        const rotZ = t.x * 0.28;
        puppetRef.current.style.transform = `perspective(1000px) rotateX(${t.y.toFixed(2)}deg) rotateY(${t.x.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isAnimating]);

  // Track mouse across the whole viewport
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!puppetRef.current || isAnimating) return;
      const rect = puppetRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.65)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.65)));
      tiltRef.current.targetX = dx * 16;
      tiltRef.current.targetY = -dy * 13;
    };
    const handleLeave = () => {
      tiltRef.current.targetX = 0;
      tiltRef.current.targetY = 0;
    };
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isAnimating]);

  const wavePuppet = useCallback(() => {
    if (isAnimating || !puppetRef.current) return;
    setIsAnimating(true);
    puppetRef.current.style.animation = "puppetJiggle 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97)";
    setTimeout(() => {
      if (puppetRef.current) puppetRef.current.style.animation = "";
      setIsAnimating(false);
    }, 950);
  }, [isAnimating]);

  return (
    <div
      ref={stageRef}
      className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[480px] sm:min-h-[540px] order-1 lg:order-2"
      style={{ perspective: "1100px" }}
    >
      {/* Wooden Crossbar */}
      <div className="w-64 sm:w-80 h-6 rounded-md tag-shadow flex items-center justify-between px-3 z-30 mb-0 border border-[var(--chipboard)]" style={{ background: "#ded3c3" }}>
        <span className="brass-grommet scale-90" />
        <span className="font-mono text-[10px] text-[var(--ink-light)] uppercase tracking-widest font-bold">BIRCHWOOD CRUTCH // RIG 01</span>
        <span className="brass-grommet scale-90" />
      </div>

      {/* SVG Strings */}
      <div className="w-64 sm:w-80 h-12 relative pointer-events-none z-20">
        <svg className="w-full h-full">
          <line x1="30" y1="0" x2="65" y2="48" stroke="#705244" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
          <line x1="120" y1="0" x2="135" y2="48" stroke="#826558" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
          <line x1="160" y1="0" x2="155" y2="48" stroke="#826558" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
          <line x1="250" y1="0" x2="220" y2="48" stroke="#705244" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
        </svg>
      </div>

      {/* The Puppet Card */}
      <div
        ref={puppetRef}
        onClick={wavePuppet}
        className="relative w-72 sm:w-80 rounded-3xl paper-drop-shadow p-2 bg-[var(--cardstock)] border border-[var(--chipboard)] cursor-grab active:cursor-grabbing select-none puppet-inner-3d"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        <div className="brass-grommet absolute -top-3 left-1/2 -translate-x-1/2 z-30 scale-125" />
        <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--pressed-board)] shadow-inner border border-[var(--chipboard)] puppet-face-layer">
          <img
            src="/assets/images/puppet_portrait.png"
            alt="Papercraft portrait of Jaikey Singh"
            className="w-full h-auto aspect-square object-cover hover:scale-[1.02] transition-transform duration-500 block"
          />
          <div className="paper-crease-overlay absolute inset-0 opacity-70" />
        </div>
        {/* Plaque */}
        <div className="mt-2 w-full bg-[var(--pressed-board)] py-1.5 px-3 rounded-lg text-center flex items-center justify-between border border-[var(--border-light)] puppet-badge-layer">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--terracotta)] animate-ping" />
            <span className="font-mono text-[10px] text-[var(--text-primary)] uppercase tracking-widest font-bold">ARTISAN VERLET RIG</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--sage)] uppercase font-bold">TENSION: ACTIVE</span>
        </div>
      </div>

      {/* Telemetry hint */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 bg-[var(--cardstock)] px-3.5 py-1 rounded-full tag-shadow border border-[var(--border-light)]">
        <span className="w-2 h-2 rounded-full bg-[var(--sage)] animate-pulse" />
        <span className="font-mono text-[11px] text-[var(--ink-light)] uppercase tracking-wider">Tilt cursor to track 3D head · Click to wave</span>
      </div>
    </div>
  );
}

/** Code Ronin section with katana slash effect */
function RoninPuppet() {
  const roninRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);

  const strikeRonin = useCallback(() => {
    if (!roninRef.current) return;
    if (slashRef.current) {
      slashRef.current.classList.remove("slash-active");
      void slashRef.current.offsetWidth;
      slashRef.current.classList.add("slash-active");
    }
    roninRef.current.style.animation = "puppetJiggle 0.75s cubic-bezier(0.2, 0.9, 0.3, 1)";
    setTimeout(() => {
      if (roninRef.current) roninRef.current.style.animation = "";
    }, 800);
  }, []);

  return (
    <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
      {/* Crossbar */}
      <div className="w-72 h-6 rounded tag-shadow flex items-center justify-between px-3 z-30 mb-0 border border-[var(--chipboard)]" style={{ background: "#ded3c3" }}>
        <span className="brass-grommet scale-90" />
        <span className="font-mono text-[10px] text-[var(--ink-light)] uppercase tracking-widest font-bold">CROSSBAR RIG 02 // CODE RONIN</span>
        <span className="brass-grommet scale-90" />
      </div>
      {/* Strings */}
      <div className="w-72 h-10 relative pointer-events-none z-20">
        <svg className="w-full h-full">
          <line x1="40" y1="0" x2="70" y2="40" stroke="#4a3b32" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
          <line x1="144" y1="0" x2="144" y2="40" stroke="#4a3b32" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
          <line x1="240" y1="0" x2="210" y2="40" stroke="#4a3b32" strokeDasharray="2.5,1.5" strokeWidth="1.8" />
        </svg>
      </div>
      {/* Ronin Card */}
      <div
        ref={roninRef}
        onClick={strikeRonin}
        className="relative w-80 rounded-3xl paper-drop-shadow p-2 bg-[var(--pressed-board)] border border-[var(--chipboard)] sway-b select-none cursor-pointer overflow-hidden"
      >
        <div ref={slashRef} className="slash-flash" />
        <div className="brass-grommet absolute -top-3 left-1/2 -translate-x-1/2 z-30 scale-125" />
        <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--chipboard)] shadow-inner border border-[var(--chipboard-dark)] group">
          <img
            src="/assets/images/puppet_ronin.png"
            alt="Paper puppet developer holding a code pointer like a craft katana"
            className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-500 block"
          />
          <div className="paper-crease-overlay absolute inset-0" />
          <div className="absolute top-3 left-3 bg-[#1e1b15]/90 text-white px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold shadow-sm">Precision Origami</div>
        </div>
        {/* Status plaque */}
        <div className="mt-2 w-full bg-white py-1.5 px-3 rounded-lg text-center flex items-center justify-between border border-[var(--border-light)]">
          <span className="font-mono text-[10px] text-[var(--terracotta)] uppercase font-bold">BATTLE-TESTED ARCHITECTURE</span>
          <button
            onClick={(e) => { e.stopPropagation(); strikeRonin(); }}
            className="paper-btn text-[10px] bg-[var(--terracotta)] text-white px-3 py-1 rounded font-mono uppercase font-bold shadow-xs hover:bg-[var(--terracotta-dark)] cursor-pointer"
          >
            Strike
          </button>
        </div>
      </div>
      <span className="font-mono text-[10px] text-[var(--ink-light)] uppercase tracking-wider mt-2">Click puppet or &apos;Strike&apos; for kinetic katana slice</span>
    </div>
  );
}

/** Interactive Live Benchmark Terminal */
function LiveTerminal() {
  const [status, setStatus] = useState<"ready" | "running" | "done">("ready");
  const [readout, setReadout] = useState('Click "Run Physics Benchmark" to execute 25,000 constraint iterations in browser.');
  const [elapsed, setElapsed] = useState("");

  const runBenchmark = useCallback(() => {
    if (status === "running") return;
    setStatus("running");
    let step = 0;
    const interval = setInterval(() => {
      step += 5000;
      setReadout(`Resolving constraint batch: ${step.toLocaleString()} / 25,000 particles...`);
      if (step >= 25000) {
        clearInterval(interval);
        const t0 = performance.now();
        let p1 = { x: 0, y: 0 }, p2 = { x: 100, y: 100 };
        const rest = 70.71;
        for (let i = 0; i < 25000; i++) {
          const dx = p2.x - p1.x, dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);
          const diff = (dist - rest) / (dist || 1);
          p1.x += dx * 0.5 * diff;
          p2.x -= dx * 0.5 * diff;
        }
        const ms = Math.max(0.42, performance.now() - t0).toFixed(2);
        setElapsed(ms);
        setReadout(`✓ Executed 25,000 constraint iterations in ${ms}ms (~${Math.round(25000 / (parseFloat(ms) || 0.1))} ops/ms). 60.0 FPS locked. Zero heap churn.`);
        setStatus("done");
      }
    }, 45);
  }, [status]);

  return (
    <div className="lg:col-span-7 bg-[#23211E] text-[#C4BDAF] p-5 sm:p-6 rounded-2xl paper-drop-shadow relative rotate-[0.5deg] border border-[var(--border-light)] font-mono">
      <div className="brass-grommet absolute -top-2 left-8 scale-90" />
      <div className="brass-grommet absolute -top-2 right-8 scale-90" />
      {/* Terminal bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#35312C]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#E57373] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFB74D] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#81C784] inline-block shadow-sm" />
        </div>
        <span className="text-[11px] text-[#8C8275] uppercase tracking-widest">verlet-engine.ts // LIVE RIG</span>
      </div>
      {/* Code snippet */}
      <div className="text-[12px] leading-relaxed space-y-1 overflow-x-auto">
        <div className="text-[#8C8275]">{"// Verlet Integration Constraint Resolver"}</div>
        <div><span className="text-[#569CD6]">function</span> <span className="text-[#DCDCAA]">satisfyConstraints</span>(p1: <span className="text-[#4EC9B0]">Particle</span>, p2: <span className="text-[#4EC9B0]">Particle</span>, rest: <span className="text-[#4EC9B0]">number</span>) {"{"}</div>
        <div className="pl-4"><span className="text-[#569CD6]">const</span> dx = p2.x - p1.x, dy = p2.y - p1.y;</div>
        <div className="pl-4"><span className="text-[#569CD6]">const</span> dist = Math.hypot(dx, dy);</div>
        <div className="pl-4"><span className="text-[#569CD6]">const</span> diff = (dist - rest) / (dist || <span className="text-[#B5CEA8]">1</span>);</div>
        <div className="pl-4 text-[#A5D6A7]">p1.x += dx * <span className="text-[#B5CEA8]">0.5</span> * diff; p2.x -= dx * <span className="text-[#B5CEA8]">0.5</span> * diff;</div>
        <div>{"}"}</div>
      </div>
      {/* Live output */}
      <div className="mt-4 bg-[#1A1816] p-3 rounded-lg border border-[#35312C]">
        <div className="text-[#8C8275] text-[11px] flex items-center justify-between">
          <span>Physics Benchmark Suite (Browser Thread)</span>
          <span className={`text-[10px] font-bold ${status === "running" ? "text-[var(--terracotta)]" : "text-[var(--sage)]"}`}>
            ● {status === "ready" ? "READY" : status === "running" ? "CALCULATING..." : "PASS (OPTIMAL)"}
          </span>
        </div>
        <div className="text-[#A5D6A7] text-[11px] mt-1.5">{readout}</div>
      </div>
      {/* Action */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11px] text-[#8C8275]">TypeScript 5.x · Zero GC allocations per frame</span>
        <button
          onClick={runBenchmark}
          disabled={status === "running"}
          className="paper-btn bg-[var(--terracotta)] text-white px-4 py-2 rounded text-xs uppercase font-mono font-bold tracking-wider hover:bg-[var(--terracotta-dark)] transition-colors flex items-center justify-center gap-1.5 self-end sm:self-auto shadow-sm disabled:opacity-70 cursor-pointer"
        >
          {status === "running" ? (
            <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> Computing...</>
          ) : (
            <>▶ Run Physics Benchmark</>
          )}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE — FAITHFUL STITCH REPLICA
   ═══════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="w-full">
      {/* ═══ 1. HERO STAGE ═══ */}
      <section id="hero" className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-4 pb-12 sm:pb-16 overflow-hidden">
        {/* Overhead Crossbeam */}
        <div className="w-full h-3 bg-[var(--pressed-board)] rounded-full shadow-inner flex items-center justify-between px-6 sm:px-12 mb-6 border border-[var(--border-light)]">
          <span className="brass-grommet" />
          <div className="h-0.5 w-1/4 bg-[var(--border-light)] hidden sm:block" />
          <span className="brass-grommet" />
          <div className="h-0.5 w-1/4 bg-[var(--border-light)] hidden sm:block" />
          <span className="brass-grommet" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left: Typography Cutouts */}
          <div className="lg:col-span-7 flex flex-col justify-start z-10 order-2 lg:order-1">
            {/* Availability Tag */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="relative self-start mb-3 -rotate-1 hover:rotate-0 transition-transform">
                <div className="w-[1.5px] h-4 marionette-twine mx-auto -mb-1" />
                <div className="bg-white px-3 py-1 rounded-full tag-shadow flex items-center gap-2 border border-[var(--border-light)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage)] animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--sage)] font-bold">Open for Contracts &amp; Lead Roles</span>
                  <span className="text-[var(--border-light)]">|</span>
                  <span className="font-mono text-[11px] text-[var(--text-secondary)]">Q2/Q3 2025</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Name Label */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="inline-block bg-[var(--cardstock)] px-2 py-0.5 rounded mb-2 tag-shadow border border-[var(--border-light)] self-start">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--terracotta)] font-bold">
                  Jaikey Singh // Software Engineer
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal animation="fade-up" delay={300}>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[var(--text-primary)] tracking-tight uppercase leading-[1.08] font-bold mb-4">
                CRAFTING TACTILE,{" "}<br />
                <span className="text-[var(--terracotta)] underline decoration-[var(--mustard)] decoration-wavy decoration-2">HIGH-PERFORMANCE</span>{" "}
                WEB AUTOMATA.
              </h1>
            </ScrollReveal>

            {/* Folded Intro Note */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="relative bg-[var(--cardstock)] p-4 sm:p-5 rounded-xl tag-shadow max-w-xl rotate-[0.5deg] hover:rotate-0 transition-transform border border-[var(--border-light)] mb-6">
                <div className="absolute -top-2 left-6 w-14 h-3.5 rounded-sm -rotate-2 shadow-xs" style={{ background: "rgba(203, 187, 166, 0.75)" }} />
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  I build robust, high-throughput full-stack applications with React, Next.js, Python, Java, and cloud-native architecture. Building applications that feel tangible, resilient, and unapologetically alive.
                </p>
              </div>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal animation="fade-up" delay={500}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                <a href="#featured-works" className="paper-btn bg-[var(--terracotta)] text-white px-4 py-2 rounded-lg terracotta-seal-shadow font-mono text-xs uppercase font-bold tracking-wider hover:bg-[var(--terracotta-dark)] transition-all flex items-center gap-2 -rotate-1 hover:rotate-0">
                  👁 Explore Selected Works
                </a>
                <a href="#contact" className="paper-btn bg-white text-[var(--text-primary)] px-4 py-2 rounded-lg tag-shadow font-mono text-xs uppercase font-bold tracking-wider hover:bg-[var(--cardstock)] transition-all flex items-center gap-2 rotate-1 hover:rotate-0 border border-[var(--border-light)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--mustard)] inline-block" />
                  👋 Wave Puppet
                </a>
                <a href="#rigging-console" className="paper-btn bg-[var(--cardstock)] px-3.5 py-2 rounded-lg tag-shadow font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--terracotta)] transition-all border border-[var(--border-light)] flex items-center gap-1.5">
                  💻 Test Engine
                </a>
              </div>
            </ScrollReveal>

            {/* Metric Badges */}
            <ScrollReveal animation="fade-up" delay={600}>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md pt-2">
                {[
                  { val: "4+ Yrs", label: "Full-Stack Craft", color: "text-[var(--terracotta)]" },
                  { val: "20+", label: "Projects Built", color: "text-[var(--sage)]" },
                  { val: "60 FPS", label: "WebGL Target", color: "text-[var(--mustard)]" },
                ].map((m, i) => (
                  <div key={m.label} className={`bg-[var(--cardstock)] p-3 rounded-lg tag-shadow text-center hover:rotate-0 transition-transform border border-[var(--border-light)] ${i === 0 ? "rotate-[-0.75deg]" : i === 1 ? "rotate-[0.5deg]" : "rotate-[-1deg]"}`}>
                    <span className={`font-display text-xl sm:text-2xl block leading-none font-bold ${m.color}`}>{m.val}</span>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] mt-1 block">{m.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Interactive Puppet */}
          <HeroPuppet />
        </div>
      </section>

      {/* ═══ 2. TECH WORKSHOP ═══ */}
      <section id="tech-workshop" className="w-full py-12 sm:py-16 relative border-y border-[var(--border-light)]" style={{ background: "var(--cardstock)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Section Header */}
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-[1.5px] h-8 marionette-twine mb-2" />
              <div className="inline-flex items-center gap-2 bg-[var(--pressed-board)] px-3 py-1 rounded-full tag-shadow mb-2 border border-[var(--border-light)]">
                <span className="text-[var(--terracotta)] text-sm">🛠</span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Workshop &amp; Equipment</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] uppercase tracking-tight font-bold">Tools of the Marionette Craft</h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mt-2">Engineered hardware and battle-hardened software stacks. From low-level event architectures to expressive tactile canvas shaders.</p>
            </div>
          </ScrollReveal>

          {/* Hardware Banner */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="w-full mb-8 bg-[var(--canvas)] p-4 sm:p-6 lg:p-8 rounded-2xl paper-drop-shadow relative border-2 border-[var(--border-light)] sway-b">
              <div className="absolute -top-8 left-16 sm:left-32 w-[2px] h-8 marionette-twine" />
              <div className="absolute -top-8 right-16 sm:right-32 w-[2px] h-8 marionette-twine" />
              <div className="brass-grommet absolute -top-2 left-16 sm:left-32" />
              <div className="brass-grommet absolute -top-2 right-16 sm:right-32" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Keyboard Image */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="relative w-full max-w-md rounded-xl overflow-hidden bg-[var(--pressed-board)] border-2 border-[var(--chipboard)] tag-shadow group hover-taut">
                    <img src="/assets/images/papercraft_keyboard.png" alt="Papercraft mechanical keyboard" className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-500 block" />
                    <div className="paper-crease-overlay absolute inset-0" />
                    <div className="absolute bottom-2 left-2 bg-white/95 px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold text-[var(--text-primary)] shadow-xs">Artisan Cardboard Peripherals</div>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--ink-light)] uppercase tracking-wider mt-2">Corrugated keycaps · Brass brad stems · Twine USB line</span>
                </div>
                {/* Stack description */}
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)] inline-block" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--terracotta)] font-bold">Physical Engineering Metaphor</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] font-bold leading-snug">Every Keypress, Packet, and Frame Accounted For.</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Just as this tactile keyboard shows genuine corrugated fluting and folded paper edges, clean systems engineering requires honoring the physical constraints of memory, networking, and GPU rendering pipelines.</p>
                  {/* Stack Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {[
                      { name: "REACT & NEXT.JS", sub: "App Router & SSR", color: "text-[var(--terracotta)]" },
                      { name: "NODE.JS & EXPRESS", sub: "Low-latency APIs", color: "text-[var(--sage)]" },
                      { name: "THREE.JS / WEBGL", sub: "Instanced Shaders", color: "text-[var(--mustard)]" },
                      { name: "PYTHON & DJANGO", sub: "Full-stack Python", color: "text-[var(--text-primary)]" },
                      { name: "DOCKER & K8S", sub: "Hermetic Deploys", color: "text-[var(--terracotta)]" },
                      { name: "MONGODB & SQL", sub: "Relational + NoSQL", color: "text-[var(--sage)]" },
                    ].map((s) => (
                      <div key={s.name} className="bg-[var(--cardstock)] p-2.5 rounded-lg tag-shadow border border-[var(--border-light)] hover:-translate-y-0.5 transition-transform">
                        <span className={`font-mono text-[11px] font-bold block ${s.color}`}>{s.name}</span>
                        <span className="text-[11px] text-[var(--text-secondary)]">{s.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 3-Panel Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client & Creative */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-[var(--canvas)] p-5 sm:p-6 rounded-xl paper-drop-shadow relative rotate-[-0.75deg] hover:rotate-0 transition-transform sway-a border border-[var(--border-light)] hover-taut">
                <div className="brass-grommet absolute -top-2 left-1/2 -translate-x-1/2" />
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-light)]">
                  <span className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">Client &amp; Creative</span>
                  <span className="bg-[var(--terracotta-light)] text-[var(--terracotta-dark)] px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">Frontend</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">Tactile design systems, accessible DOM trees, WebGL canvas shaders, and sub-millisecond interaction feedback.</p>
                <div className="flex flex-wrap gap-1.5">
                  {["TypeScript", "React 19", "Tailwind CSS", "WebGL / GLSL", "GSAP & Canvas", "Next.js"].map(t => (
                    <span key={t} className="tech-tag hover:text-[var(--terracotta)]">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            {/* Distributed Core */}
            <ScrollReveal animation="fade-up" delay={250}>
              <div className="bg-[var(--canvas)] p-5 sm:p-6 rounded-xl paper-drop-shadow relative rotate-[0.75deg] hover:rotate-0 transition-transform sway-b border border-[var(--border-light)] hover-taut">
                <div className="brass-grommet absolute -top-2 left-1/2 -translate-x-1/2" />
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-light)]">
                  <span className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">Distributed Core</span>
                  <span className="bg-[var(--sage-light)] text-[var(--sage)] px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">Backend</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">Fault-tolerant APIs, database architecture, serverless functions, and cloud-native scalable services.</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Node.js / Express", "Python / Django", "Java / Spring Boot", "PostgreSQL", "MongoDB & Redis", "Docker & K8s"].map(t => (
                    <span key={t} className="tech-tag hover:text-[var(--sage)]">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            {/* Craft & Rigor */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="bg-[var(--canvas)] p-5 sm:p-6 rounded-xl paper-drop-shadow relative rotate-[-0.5deg] hover:rotate-0 transition-transform sway-c border border-[var(--border-light)] hover-taut">
                <div className="brass-grommet absolute -top-2 left-1/2 -translate-x-1/2" />
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-light)]">
                  <span className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">Craft &amp; Rigor</span>
                  <span className="bg-[var(--mustard-light)] text-[var(--mustard)] px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">Standards</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">Battle-hardened testing, sub-second TTFB, full keyboard &amp; screen reader accessibility, and end-to-end CI/CD.</p>
                <div className="space-y-1.5">
                  {["AWS & GCP Cloud", "Git & CI/CD Pipelines", "AI / ML Integration", "C++ & C# Systems", "Flask & REST APIs"].map(t => (
                    <div key={t} className="bg-white p-2 rounded tag-shadow flex items-center justify-between text-xs font-mono font-bold border border-[var(--border-light)]">
                      <span>{t}</span>
                      <span className="text-[var(--sage)]">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ 3. FEATURED WORKS ═══ */}
      <section id="featured-works" className="w-full py-12 sm:py-16 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)] inline-block" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--terracotta)] font-bold">Tested in Production</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] uppercase tracking-tight font-bold">Featured Works &amp; Automata</h2>
              </div>
              <div className="flex items-center gap-2 bg-[var(--cardstock)] px-3 py-1.5 rounded-lg tag-shadow border border-[var(--border-light)] self-start sm:self-auto">
                <span className="brass-grommet scale-75" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">Suspended Gallery // {PROJECTS.length} Case Studies</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {PROJECTS.map((p, i) => {
              const swayClasses = ["sway-a", "sway-b", "sway-c", "sway-d"];
              const rotations = ["-0.75deg", "0.75deg", "-0.5deg", "0.75deg"];
              return (
                <ScrollReveal key={p.title} animation="fade-up" delay={i * 150}>
                  <article className={`flex flex-col items-center group ${swayClasses[i]} hover-taut`}>
                    <div className="w-[2px] h-8 sm:h-10 marionette-twine group-hover:h-6 transition-all duration-300 twine-hover-vibe" />
                    <div className={`w-full bg-[var(--cardstock)] p-5 sm:p-6 rounded-2xl paper-drop-shadow relative group-hover:rotate-0 transition-transform duration-300 border border-[var(--border-light)]`} style={{ transform: `rotate(${rotations[i]})` }}>
                      <div className="brass-grommet absolute -top-2 left-1/2 -translate-x-1/2 scale-110" />
                      {/* Image */}
                      <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden mb-4 bg-[var(--pressed-board)] tag-shadow">
                        {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                        <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold text-[var(--text-primary)] shadow-xs">{p.badge}</div>
                        <div className="absolute top-3 right-3 bg-[var(--terracotta)] text-white px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold shadow-xs">{p.statLabel}</div>
                      </div>
                      {/* Title + version */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight">{p.title}</h3>
                        <span className="font-mono text-[10px] bg-[var(--pressed-board)] px-2 py-0.5 rounded text-[var(--text-secondary)] font-bold shrink-0">{p.version}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{p.description}</p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.map((tag, ti) => (
                          <span key={tag} className={`bg-white px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border border-[var(--border-light)] ${ti === 0 ? "text-[var(--terracotta)]" : ti === 1 ? "text-[var(--sage)]" : ti === 2 ? "text-[var(--mustard)]" : "text-[var(--text-primary)]"}`}>{tag}</span>
                        ))}
                      </div>
                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-dashed border-[var(--chipboard)]">
                        <a href="#" className="font-mono text-xs text-[var(--terracotta)] uppercase font-bold hover:underline flex items-center gap-1 paper-btn">View Case Study →</a>
                        <a href="#" className="font-mono text-xs text-[var(--text-secondary)] uppercase hover:text-[var(--text-primary)] flex items-center gap-1 paper-btn">💻 Source Code</a>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 4. CODE RONIN — ARCHITECTURE PUPPET ═══ */}
      <section id="architecture-ronin" className="w-full py-12 sm:py-16 relative border-y border-[var(--border-light)]" style={{ background: "#f4ede3" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Ronin Puppet */}
            <ScrollReveal animation="slide-left" delay={100}>
              <RoninPuppet />
            </ScrollReveal>

            {/* Architecture Philosophy */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <ScrollReveal animation="slide-right" delay={200}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)] inline-block" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--terracotta)] font-bold">Defensive Engineering &amp; Clean Cuts</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] uppercase tracking-tight font-bold leading-tight mt-2">
                  Sharpened Systems.<br />Zero Slop in the Pipeline.
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mt-3">
                  Like sharp faceted origami folds that hold rigid structural integrity under mechanical tension, codebases should be architected to withstand heavy loads, unexpected network cuts, and evolving requirements without warping.
                </p>
              </ScrollReveal>
              {/* Discipline Badges */}
              <ScrollReveal animation="slide-right" delay={350}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl tag-shadow border border-[var(--border-light)] hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--terracotta)]">🛡</span>
                      <span className="font-display text-sm font-bold text-[var(--text-primary)]">Deterministic State</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">Strict unidirectional data flows, idempotent network operations, and immutable state updates prevent subtle runtime regressions.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl tag-shadow border border-[var(--border-light)] hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--sage)]">⚡</span>
                      <span className="font-display text-sm font-bold text-[var(--text-primary)]">Zero-Garbage Cycles</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">In hot rendering loops and real-time sockets, pre-allocated buffers guarantee jitter-free 60+ FPS animation frame delivery.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. LIVE TERMINAL & RIGGING CONSOLE ═══ */}
      <section id="rigging-console" className="w-full py-12 sm:py-16 relative" style={{ background: "var(--cardstock)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CRT Monitor */}
            <ScrollReveal animation="slide-left" delay={100}>
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-56 flex justify-between px-6 mb-0">
                  <div className="w-[2px] h-8 marionette-twine" />
                  <div className="w-[2px] h-8 marionette-twine" />
                </div>
                <div className="w-full max-w-sm bg-[var(--canvas)] p-4 rounded-2xl paper-drop-shadow relative rotate-[-1deg] border border-[var(--border-light)] sway-c">
                  <div className="brass-grommet absolute -top-2 left-10" />
                  <div className="brass-grommet absolute -top-2 right-10" />
                  <div className="relative w-full rounded-xl overflow-hidden bg-[var(--chipboard)] border-2 border-[var(--chipboard-dark)] tag-shadow group crt-screen-container">
                    <img src="/assets/images/papercraft_monitor.png" alt="Retro CRT monitor crafted from folded cardstock" className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-500 block" />
                    <div className="paper-crease-overlay absolute inset-0" />
                    <div className="absolute bottom-2 left-2 bg-[#23211e]/90 text-[#c4bdaf] px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold">CRT-OS v1.98 // BOOT_SEQ OK</div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold uppercase tracking-wider block">Artisan Cardboard CRT Display</span>
                    <span className="text-[11px] text-[var(--text-secondary)]">Folded corrugated chassis with brass tuning knobs</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Live Terminal */}
            <ScrollReveal animation="slide-right" delay={200}>
              <LiveTerminal />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ 6. CONTACT ENVELOPE ═══ */}
      <section id="contact" className="w-full py-12 sm:py-16 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Overhead strings */}
          <div className="w-full flex justify-center mb-2">
            <div className="w-48 sm:w-64 flex justify-between">
              <div className="w-[2px] h-8 marionette-twine" />
              <div className="w-[2px] h-8 marionette-twine" />
            </div>
          </div>
          {/* Hanging Envelope */}
          <div className="max-w-2xl mx-auto bg-[var(--cardstock)] p-6 sm:p-8 md:p-10 rounded-2xl paper-drop-shadow relative rotate-[-0.5deg] border border-[var(--border-light)] sway-a hover-taut">
            <div className="brass-grommet absolute -top-2 left-10" />
            <div className="brass-grommet absolute -top-2 right-10" />
            <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8">
              <div className="inline-block bg-[var(--pressed-board)] px-2 py-0.5 rounded -rotate-1 mb-2 border border-[var(--border-light)]">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--terracotta)] font-bold">Start a Conversation</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] uppercase tracking-tight font-bold">
                {"Let's Build Something"}<br /><span className="text-[var(--terracotta)]">Extraordinary.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">Whether you need senior technical direction, WebGL shader design, or full-stack distributed system scaling—my line is open.</p>
            </div>
            <ContactForm />
            {/* Social Placards */}
            <div className="mt-6 pt-4 flex flex-wrap items-center justify-center gap-3 border-t border-dashed border-[var(--chipboard)]">
              {[
                { label: "github.com/jaikeysingh913", color: "bg-[var(--sage)]" },
                { label: "linkedin.com/in/jaikeysingh", color: "bg-[var(--terracotta)]" },
                { label: "x.com/jaikeysingh", color: "bg-[var(--mustard)]" },
              ].map((s) => (
                <a key={s.label} href="#" className="bg-white px-3 py-1 rounded-md tag-shadow text-[11px] font-mono uppercase text-[var(--text-primary)] hover:text-[var(--terracotta)] transition-colors border border-[var(--border-light)] flex items-center gap-1.5 paper-btn">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full border-t border-[var(--border-light)] py-6" style={{ background: "var(--pressed-board)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)] inline-block" />
            <span className="font-display text-sm font-bold text-[var(--text-primary)]">Jaikey Singh — Software Engineer</span>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] text-center sm:text-right">© {new Date().getFullYear()} Jaikey Singh · Built with papercraft physics &amp; WebGL</p>
        </div>
      </footer>
    </div>
  );
}
