"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EXPERIENCE, CERTS, EDUCATION } from "@/data/content";

function CertModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={onClose} />
      <div className="relative w-full max-w-4xl" style={{ height: "80vh" }}>
        <div className="w-full h-full relative p-4 flex flex-col rounded-none border border-[var(--border-strong)] bg-[var(--surface-1)]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-xs tracking-widest text-[var(--accent)]">VERIFIED_CREDENTIAL.PDF</span>
            <button onClick={onClose} className="font-mono text-xs tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer border border-[var(--border-strong)] px-3 py-1">CLOSE ✕</button>
          </div>
          <div className="flex-1 w-full overflow-hidden border border-[var(--border-strong)] bg-black">
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
    <div className="w-full relative text-[var(--text-primary)]" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      
      {/* ─── EXPERIENCE ─── */}
      <div className="section-wrap left-bias relative z-10 mb-32">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>JOURNEY</div>
        
        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-12">
            <h1 className="display-xl text-[var(--text-primary)]">
              Professional<br /><span style={{ color: "var(--accent)" }}>Timeline.</span>
            </h1>
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px" }}>
            A sequential breakdown of my engineering roles, system architecture implementations, and professional growth in building resilient software.
          </p>
        </ScrollReveal>

        {/* Experience Matrix Grid */}
        <div className="grid grid-cols-1 border-t border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          {EXPERIENCE.map((exp, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="h-full">
              <div 
                className="group relative h-full flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ backgroundColor: exp.accent || "var(--accent)" }} />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col h-full">
                  <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                    <div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight">{exp.role}</h3>
                      <p className="text-[var(--text-secondary)] font-mono text-sm tracking-widest mt-2 uppercase">{exp.company}</p>
                    </div>
                    <span className="font-mono text-sm tracking-widest font-bold opacity-80" style={{ color: exp.accent || "var(--accent)" }}>{exp.date}</span>
                  </div>
                  
                  <div className="w-16 h-1 mb-8 opacity-80" style={{ backgroundColor: exp.accent || "var(--accent)" }} />
                  
                  <ul className="flex flex-col gap-4">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-none mt-2 flex-shrink-0" style={{ backgroundColor: exp.accent || "var(--accent)" }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ─── EDUCATION ─── */}
      <div className="section-wrap left-bias relative z-10 mb-32 pt-20">
        <div className="bg-label" style={{ top: 0, left: -40, opacity: 0.15, pointerEvents: "none" }}>ACADEMICS</div>
        
        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Academic <span style={{ color: "var(--accent)" }}>Foundations.</span>
            </h1>
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px" }}>
            The theoretical and academic grounding driving my engineering intuition, emphasizing systems design, computational logic, and cloud infrastructure.
          </p>
        </ScrollReveal>

        {/* Education Matrix Grid */}
        <div className="grid grid-cols-1 border-t border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          {EDUCATION.map((edu, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="h-full">
              <div 
                className="group relative h-full flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ backgroundColor: edu.accent || "var(--accent)" }} />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col h-full">
                  <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                    <div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight">{edu.degree}</h3>
                      <p className="text-[var(--text-secondary)] font-mono text-sm tracking-widest mt-2 uppercase">{edu.institution}</p>
                    </div>
                    <span className="font-mono text-sm tracking-widest font-bold opacity-80" style={{ color: edu.accent || "var(--accent)" }}>{edu.date}</span>
                  </div>
                  
                  <div className="w-16 h-1 mb-8 opacity-80" style={{ backgroundColor: edu.accent || "var(--accent)" }} />
                  
                  <ul className="flex flex-col gap-4">
                    {edu.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-none mt-2 flex-shrink-0" style={{ backgroundColor: edu.accent || "var(--accent)" }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ─── CERTIFICATIONS ─── */}
      <div className="section-wrap left-bias relative z-10 mb-32 pt-20">
        <div className="bg-label" style={{ top: 0, left: -40, opacity: 0.15, pointerEvents: "none" }}>CERTS</div>
        
        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Verified <span style={{ color: "var(--accent)" }}>Credentials</span>
            </h1>
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px" }}>
            A verified ledger of professional certifications and continued education, proving rigorous theoretical and applied knowledge.
          </p>
        </ScrollReveal>

        {/* Certifications Matrix Grid */}
        <div className="grid grid-cols-1 border-t border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          {CERTS.map((cert, i) => (
            <ScrollReveal key={cert.name} animation="fade-up" delay={i * 100} className="h-full">
              <div 
                className="group relative h-full flex flex-col p-6 md:p-8 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden cursor-pointer"
                style={{ backdropFilter: "blur(12px)" }}
                onClick={() => setActiveCert(cert.url)}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ backgroundColor: cert.color || "var(--accent)" }} />
                
                <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm tracking-widest font-bold opacity-80" style={{ color: cert.color || "var(--accent)" }}>0{i+1}</span>
                    <h3 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)] leading-tight">{cert.name}</h3>
                  </div>
                  <button className="flex items-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase mr-3 opacity-0 group-hover:opacity-100 transition-opacity">View Credential</span>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeCert && <CertModal url={activeCert} onClose={() => setActiveCert(null)} />}
    </div>
  );
}
