"use client";

import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/data/content";

export default function WorksPage() {
  return (
    <div className="w-full relative text-white" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <section id="works" className="relative z-10" style={{ background: "var(--canvas)", backdropFilter: "blur(4px)", padding: '2rem' }}>
        <div className="bg-label" style={{ top: -20, right: -40 }}>WORKS</div>
        <div className="section-wrap left-bias">
          <ScrollReveal animation="fade-up">
            <div style={{ marginBottom: "4rem" }}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>Selected Works</p>
              <h2 className="display-lg">Things I&apos;ve<br /><span style={{ color: "#C85A2A" }}>Built.</span></h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={p.title} animation="fade-up" delay={i * 80}>
                <div className="project-card" style={{ minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem" }}>
                  {/* Top */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>{p.num}</span>
                    <span className="project-badge" style={{ background: p.accent }}>{p.title.split(" ")[0]}</span>
                  </div>
                  {/* Accent top bar */}
                  <div style={{ height: 2, background: p.accent, borderRadius: 2, margin: "1.5rem 0", width: "40%", opacity: 0.7 }} />
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{p.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>{p.desc}</p>
                  </div>
                  {/* Tags + Arrow */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tags.slice(0, 3).map(t => (
                        <span key={t} style={{ padding: "3px 10px", borderRadius: 50, fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.09)", color: "var(--text-muted)", background: "rgba(255,255,255,0.04)" }}>{t}</span>
                      ))}
                    </div>
                    <button className="project-arrow">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
