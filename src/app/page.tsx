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
      <section id="about" className="relative z-10" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
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
      <footer className="relative z-10" style={{ background: "var(--canvas)", borderTop: "1px solid var(--glass-border)", padding: "2.5rem 0" }}>
        <div className="section-wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C85A2A", boxShadow: "0 0 8px rgba(200,90,42,0.6)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "#F5F2EE", letterSpacing: "-0.02em" }}>JAIKEY SINGH</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", marginTop: 2 }}>© 2026 ALL RIGHTS RESERVED.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
