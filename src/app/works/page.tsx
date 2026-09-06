"use client";

import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/data/content";

export default function WorksPage() {
  return (
    <div className="w-full relative text-[var(--text-primary)]" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="section-wrap left-bias relative z-10">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>WORKS</div>
        
        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Selected <span style={{ color: "var(--accent)" }}>Works</span>
            </h1>
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px" }}>
            A curated matrix of systems and platforms I've architected, focusing on massive data handling, cloud-native deployments, and seamless cross-platform client delivery.
          </p>
        </ScrollReveal>

        {/* Constrain the grid strictly to 70% width, single column row-wise */}
        <div className="grid grid-cols-1 border-t border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.title} animation="fade-up" delay={i * 100} className="h-full">
              <div 
                className="group relative h-full flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden"
                style={{ backdropFilter: "blur(12px)" }}
              >
                {/* Left Edge Hover Indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ backgroundColor: p.accent || "var(--accent)" }} />
                
                {/* Top Subtle Gradient */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col h-full">
                  {/* Number & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight max-w-[80%]">
                      {p.title}
                    </h3>
                    <span className="font-mono text-sm tracking-widest opacity-50 font-bold ml-2" style={{ color: p.accent || "var(--accent)" }}>
                      {p.num}
                    </span>
                  </div>

                  {/* Accent Line */}
                  <div className="w-16 h-1 rounded-full mb-6 opacity-80" style={{ backgroundColor: p.accent || "var(--accent)" }} />

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-8 flex-grow">
                    {p.desc}
                  </p>

                  {/* Skill Tags & Arrow */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-[var(--glass-border)] group-hover:border-[var(--accent-glow)] transition-colors duration-500">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span 
                          key={t} 
                          className="px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-[var(--border-strong)] text-[var(--text-primary)] bg-[var(--surface-2)] group-hover:bg-[var(--accent-light)] transition-colors duration-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
