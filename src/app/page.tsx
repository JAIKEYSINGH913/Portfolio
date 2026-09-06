"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CinematicBackground } from "@/components/CinematicBackground";

/* ── AmbientCanvas: floating embers ── */
function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    const pts = Array.from({ length: 22 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.05, vy: -0.04 - Math.random() * 0.1,
      r: Math.random() * 1.8 + 0.5, sw: Math.random() * Math.PI * 2,
    }));
    let raf: number, t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.003;
      pts.forEach(p => {
        p.x += p.vx + Math.sin(t + p.sw) * 0.1;
        p.y += p.vy;
        if (p.y < -60) { p.y = h + 60; p.x = Math.random() * w; }
        const alpha = 0.15 + Math.sin(t * 2 + p.sw) * 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,90,42,${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(p.x + Math.sin(t + p.sw) * 15, p.y + 30, p.x, p.y + 60);
        ctx.strokeStyle = `rgba(200,90,42,${alpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[1] mix-blend-screen" />;
}

/* ── Hero Section ── */
function Hero() {
  return (
    <section
      className="hero-section"
      style={{ background: "transparent" }}
    >
      {/* Bottom fade to blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 z-[5]" style={{ background: "linear-gradient(to top, var(--canvas), transparent)" }} />

      <div className="hero-content relative z-10 flex flex-col items-end text-right">
        {/* Role eyebrow */}
        <p className="hero-role mb-6">
          B.Tech CSE &nbsp;·&nbsp; Graduating 2026 &nbsp;·&nbsp; Software Engineer
        </p>

        {/* Giant name */}
        <h1 className="hero-name mb-2">
          Jaikey<br />
          <span className="hero-name-accent">Singh.</span>
        </h1>

        {/* Thin divider */}
        <div style={{ width: "clamp(120px, 40vw, 360px)", height: 1, background: "var(--border-strong)", marginBottom: "1.5rem" }} />

        {/* Descriptor */}
        <p className="hero-desc mb-8 max-w-lg" style={{ textAlign: "right" }}>
          Highly analytical Full-Stack Developer & Software Engineering Intern.
          Specializing in Distributed Systems, Cloud-Native Backend Architecture, and AI/LLM Integration.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-cue">
        <svg width="24" height="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function Portfolio() {
  return (
    <div className="w-full relative text-[var(--text-primary)]" style={{ background: "transparent" }}>
      <CinematicBackground />
      <AmbientCanvas />

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative z-10" style={{ paddingTop: "14rem", paddingBottom: "6rem" }}>
        <div className="bg-label" style={{ top: -60, left: -40, opacity: 0.15, pointerEvents: "none" }}>ABOUT</div>
        <div className="section-wrap left-bias relative z-10">
          
          {/* Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <ScrollReveal animation="slide-right">
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>The Architecture</p>
              <h2 className="display-lg" style={{ marginBottom: "1.5rem" }}>
                Engineering for<br /><span style={{ color: "var(--accent)" }}>Scale & Impact.</span>
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                Expert in engineering scalable Java/Spring Boot Microservices and high-performance cross-platform applications. I don&apos;t just write code — I build robust, self-healing systems that scale under pressure.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Published researcher in GraphRAG technologies with deep expertise in System Design and end-to-end Product Development, currently pursuing my B.Tech in CSE at NITRA Technical Campus.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="slide-left" delay={150}>
              <blockquote style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "1.5rem", margin: 0 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  &ldquo;Code is the closest thing we have to a superpower.&rdquo;
                </p>
                <cite style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", fontStyle: "normal" }}>— Jaikey Singh</cite>
              </blockquote>
            </ScrollReveal>
          </div>

          {/* Stats row */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--border-strong)] border border-[var(--border-strong)]">
              {[
                { num: "100%", label: "Hallucination\nMitigation (GraphRAG)" },
                { num: "30%", label: "Reduced API\nLatency" },
                { num: "9.2", label: "CGPA at NITRA\nTechnical Campus" },
              ].map((s, i) => (
                <div key={s.num} className="stat-card group relative p-8 text-center bg-[var(--surface-translucent)] hover:bg-[var(--surface-3)] transition-colors duration-500 overflow-hidden" style={{ backdropFilter: "blur(12px)" }}>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="stat-number transition-transform duration-500 group-hover:-translate-y-1" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{s.num}</div>
                  <div className="stat-label transition-transform duration-500 group-hover:translate-y-1" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10" style={{ background: "var(--surface-translucent)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--border-strong)", padding: "2rem 0" }}>
        <div className="section-wrap">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" style={{ boxShadow: "0 0 8px var(--accent)" }} />
              <div>
                <div className="font-display font-bold text-base text-[var(--text-primary)] tracking-tight">JAIKEY SINGH</div>
                <div className="font-mono text-[9px] text-[var(--text-secondary)] tracking-widest mt-0.5 uppercase">© 2026 · Software Engineer</div>
              </div>
            </div>

            {/* Social icon links */}
            <div className="flex flex-wrap items-center gap-3">
              {/* GitHub */}
              <a href="https://github.com/JAIKEYSINGH913" target="_blank" rel="noopener noreferrer" title="GitHub"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-strong)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/jaikey-singh-2885a7232" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-strong)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>

              {/* X */}
              <a href="https://x.com/JAIKEYSINGH913" target="_blank" rel="noopener noreferrer" title="X / Twitter"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-strong)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/jaikey_singh913/" target="_blank" rel="noopener noreferrer" title="Instagram"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-strong)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                Instagram
              </a>

              {/* Gmail */}
              <a href="mailto:jaikeysingh913@gmail.com" title="Send Email"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-strong)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                Email
              </a>

              {/* Phone — label only, no raw number */}
              <a href="tel:+919540352249" title="Call +91 9540352249"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-strong)] font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Phone
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
