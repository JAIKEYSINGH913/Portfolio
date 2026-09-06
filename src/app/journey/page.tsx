"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EXPERIENCE, CERTS } from "@/data/content";

function CertModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 cert-modal-backdrop" onClick={onClose} />
      <div className="relative w-full max-w-4xl" style={{ height: "80vh" }}>
        <div className="cert-modal-card w-full h-full relative p-4 flex flex-col rounded-2xl border border-[var(--border-strong)]">
          <div className="flex justify-between items-center mb-4">
            <div style={{ display: "flex", gap: 8 }}>
              {["#E57373","#FFB74D","#81C784"].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />)}
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-strong)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>✕</button>
          </div>
          <div className="flex-1 w-full rounded-lg overflow-hidden" style={{ background: "#111" }}>
            <iframe src={url} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JourneyPage() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  return (
    <div className="w-full relative text-white" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="relative z-10" style={{ paddingBottom: "8rem" }}>
        <div className="bg-label" style={{ top: "20%", left: -40, opacity: 0.3 }}>EXP.</div>
        <div className="section-wrap">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow" style={{ marginBottom: "1rem", textAlign: "center" }}>The Journey</p>
            <h2 className="display-lg" style={{ textAlign: "center", marginBottom: "5rem" }}>Professional<br /><span style={{ color: "#C85A2A" }}>Timeline.</span></h2>
          </ScrollReveal>
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", paddingLeft: "2.5rem" }}>
            <div className="timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {EXPERIENCE.map((exp, i) => (
                <ScrollReveal key={i} animation="slide-right" delay={i * 120}>
                  <div className="exp-card">
                    <div className="timeline-node" style={{ background: exp.accent }} />
                    <div className="exp-card-accent-bar" style={{ background: exp.accent }} />
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: "1.25rem" }}>
                      <div>
                        <h3 className="display-sm" style={{ marginBottom: 4 }}>{exp.role}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{exp.company}</p>
                      </div>
                      <span style={{ padding: "5px 14px", borderRadius: 50, fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", color: "var(--text-muted)", flexShrink: 0 }}>{exp.date}</span>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: exp.accent, flexShrink: 0, marginTop: 8 }} />{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section id="certifications" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "8rem", background: "var(--surface-translucent)", backdropFilter: "blur(12px)" }}>
        <div className="bg-label" style={{ top: 0, right: -40, opacity: 0.1, color: "var(--text-primary)" }}>CERTS</div>
        <div className="section-wrap">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Verified Credentials</p>
            <h2 className="display-lg" style={{ marginBottom: "4rem" }}>Continuous<br /><span style={{ color: "#C88A2A" }}>Learning.</span></h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)", borderRadius: 24, overflow: "hidden", maxWidth: 700 }}>
              {/* Mac title bar */}
              <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: 8 }}>
                {["#E57373","#FFB74D","#81C784"].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 8, letterSpacing: "0.1em" }}>credentials.log</span>
              </div>
              {/* Cert list */}
              <div style={{ padding: "0.5rem" }}>
                {CERTS.map((cert, i) => (
                  <div key={cert.name} className="cert-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>0{i+1}</span>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: cert.color, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-primary)", fontWeight: 700 }}>{cert.name}</span>
                    </div>
                    <button className="cert-view-btn" onClick={() => setActiveCert(cert.url)}>View ↗</button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {activeCert && <CertModal url={activeCert} onClose={() => setActiveCert(null)} />}
    </div>
  );
}
