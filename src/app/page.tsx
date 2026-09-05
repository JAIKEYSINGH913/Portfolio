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
      vx: (Math.random() - 0.5) * 0.15, vy: -0.08 - Math.random() * 0.25,
      r: Math.random() * 1.8 + 0.5, sw: Math.random() * Math.PI * 2,
    }));
    let raf: number, t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;
      pts.forEach(p => {
        p.x += p.vx + Math.sin(t + p.sw) * 0.25;
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
      <div className="absolute inset-x-0 bottom-0 h-48 z-[5]" style={{ background: "linear-gradient(to top, #080604, transparent)" }} />

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
        <div style={{ width: "clamp(120px, 40vw, 360px)", height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "1.5rem" }} />

        {/* Descriptor */}
        <p className="hero-desc mb-8" style={{ textAlign: "right" }}>
          I architect scalable, intelligent backend systems — Java microservices,
          GraphRAG AI pipelines, and cloud-native platforms that ship to production.
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
    <div className="w-full relative text-white" style={{ background: "#080604" }}>
      <CinematicBackground />
      <AmbientCanvas />

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "16rem" }}>
        <div className="section-wrap">
          {/* Stats row */}
          <ScrollReveal animation="fade-up">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", marginBottom: "6rem" }}>
              {[
                { num: "3×", label: "Faster API\nvia caching" },
                { num: "4+", label: "Production\nprojects shipped" },
                { num: "95%", label: "LLM hallucination\nreduction" },
              ].map(s => (
                <div key={s.num} className="stat-card" style={{ padding: "3rem 2rem", textAlign: "center", background: "rgba(15,13,11,0.8)", backdropFilter: "blur(12px)" }}>
                  <div className="stat-number">{s.num}</div>
                  <div className="stat-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <ScrollReveal animation="slide-right">
              <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>The Architecture</p>
              <h2 className="display-lg" style={{ marginBottom: "2rem" }}>
                Engineering for<br /><span style={{ color: "#C85A2A" }}>Scale & Impact.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                As a Software Engineer specializing in backend architecture, I don&apos;t just write code — I build robust, self-healing systems that scale under pressure.
              </p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Currently pursuing my B.Tech in CSE at NITRA Technical Campus, maintaining a 9.2 CGPA while shipping production-ready applications.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="slide-left" delay={150}>
              <blockquote style={{ borderLeft: "3px solid #C85A2A", paddingLeft: "2rem", margin: 0 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>
                  &ldquo;Code is the closest thing we have to a superpower.&rdquo;
                </p>
                <cite style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C85A2A", fontStyle: "normal" }}>— Jaikey Singh</cite>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10" style={{ background: "rgba(8,6,4,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem 0" }}>
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
