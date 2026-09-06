"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/data/content";

export default function WorksPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? PROJECTS[activeIdx] : null;

  return (
    <div className="w-full relative text-[var(--text-primary)]" style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div className="section-wrap left-bias relative z-10">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>WORKS</div>

        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-12">
            <h1 className="display-xl text-[var(--text-primary)]">
              Selected<br /><span style={{ color: "var(--accent)" }}>Works.</span>
            </h1>
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px" }}>
            A curated matrix of systems and platforms I've architected — spanning fintech, legal AI, IoT intelligence, and cloud-native backends. Click any project to read the full engineering breakdown.
          </p>
        </ScrollReveal>

        {/* Project List */}
        <div className="grid grid-cols-1 border-t border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.title} animation="fade-up" delay={i * 80} className="h-full">
              <div
                className="group relative flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden cursor-pointer"
                style={{ backdropFilter: "blur(12px)" }}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                {/* Left edge indicator */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ backgroundColor: p.accent || "var(--accent)" }}
                />
                {/* Top shimmer line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col">
                  {/* Number & Title row */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight max-w-[80%]">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 ml-2 flex-shrink-0">
                      <span className="font-mono text-sm tracking-widest opacity-50 font-bold" style={{ color: p.accent || "var(--accent)" }}>
                        {p.num}
                      </span>
                      {/* Expand toggle */}
                      <div
                        className="w-7 h-7 rounded-full border border-[var(--border-strong)] flex items-center justify-center transition-all duration-300"
                        style={{ color: p.accent || "var(--accent)", borderColor: activeIdx === i ? (p.accent || "var(--accent)") : undefined, background: activeIdx === i ? (p.accent || "var(--accent)") + "20" : "transparent" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d={activeIdx === i ? "M2 8L6 4L10 8" : "M2 4L6 8L10 4"} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Accent line */}
                  <div className="w-16 h-1 rounded-full mb-5 opacity-80" style={{ backgroundColor: p.accent || "var(--accent)" }} />

                  {/* Short description */}
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  {/* Tags + Links row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[var(--glass-border)] group-hover:border-[var(--accent-glow)] transition-colors duration-500">
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
                    <div className="flex items-center gap-3">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border transition-all duration-300 hover:brightness-125"
                          style={{ borderColor: p.accent || "var(--accent)", color: p.accent || "var(--accent)", background: (p.accent || "var(--accent)") + "15" }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          LIVE
                        </a>
                      )}
                      {(p as { apiUrl?: string }).apiUrl && (
                        <a
                          href={(p as { apiUrl?: string }).apiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border transition-all duration-300 hover:brightness-125"
                          style={{ borderColor: p.accent || "var(--accent)", color: p.accent || "var(--accent)", background: (p.accent || "var(--accent)") + "10" }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                          API
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all duration-300 bg-[var(--surface-2)] hover:bg-[var(--surface-3)]"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          CODE
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Long Description Panel */}
                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-8 pt-8 border-t"
                        style={{ borderColor: p.accent ? p.accent + "40" : "var(--border-strong)" }}
                      >
                        {/* Section header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: p.accent || "var(--accent)" }} />
                          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: p.accent || "var(--accent)" }}>
                            Engineering Breakdown
                          </span>
                        </div>
                        {/* Long description rendered with line breaks */}
                        <div className="font-mono text-[13px] leading-[1.9] text-[var(--text-secondary)] whitespace-pre-line">
                          {(p as { longDesc?: string }).longDesc}
                        </div>
                        {/* Bottom CTA row */}
                        <div className="flex items-center gap-4 mt-8">
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 text-white transition-all duration-300 hover:brightness-110"
                              style={{ background: p.accent || "var(--accent)" }}
                            >
                              VIEW LIVE PROJECT ↗
                            </a>
                          )}
                          {(p as { apiUrl?: string }).apiUrl && (
                            <a
                              href={(p as { apiUrl?: string }).apiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 hover:brightness-110"
                              style={{ borderColor: p.accent || "var(--accent)", color: p.accent || "var(--accent)", background: (p.accent || "var(--accent)") + "12" }}
                            >
                              VIEW API DOCS ↗
                            </a>
                          )}
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 hover:bg-[var(--surface-3)]"
                              style={{ borderColor: p.accent || "var(--accent)", color: p.accent || "var(--accent)" }}
                            >
                              VIEW SOURCE CODE ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
