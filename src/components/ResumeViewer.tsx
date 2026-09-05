"use client";

import React from "react";

export function ResumeViewer() {
  return (
    <div className="relative h-full flex flex-col bg-[var(--cardstock)] border-2 border-[var(--border-light)] rounded-xl overflow-hidden paper-drop-shadow">
      {/* Brass grommets at top */}
      <div className="brass-grommet absolute -top-1.5 left-1/4" />
      <div className="brass-grommet absolute -top-1.5 right-1/4" />
      {/* Header bar */}
      <div className="bg-[var(--pressed-board)] border-b border-[var(--chipboard)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)]" />
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">Resume / CV</h2>
        </div>
        <a
          href="/cv.pdf"
          download
          className="paper-btn bg-[var(--terracotta)] text-white px-4 py-1.5 rounded font-mono text-[11px] uppercase font-bold tracking-wider hover:bg-[var(--terracotta-dark)] transition-colors flex items-center gap-1.5 terracotta-seal-shadow cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download PDF
        </a>
      </div>
      {/* Desktop Iframe */}
      <div className="hidden md:block w-full bg-white/50 relative flex-1 min-h-[400px]">
        <iframe src="/cv.pdf#toolbar=0" className="w-full h-full border-0" title="Resume PDF" />
      </div>
      {/* Mobile Fallback */}
      <div className="md:hidden flex flex-col items-center justify-center p-12 text-center bg-[var(--pressed-board)]/30 min-h-[250px]">
        <svg className="w-16 h-16 text-[var(--terracotta)] opacity-40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-[var(--text-secondary)] mb-6 text-sm">PDF viewer is optimized for larger screens.</p>
        <a href="/cv.pdf" download className="paper-btn bg-[var(--terracotta)] text-white px-6 py-3 rounded-lg font-mono text-xs uppercase font-bold tracking-wider hover:bg-[var(--terracotta-dark)] transition-colors flex items-center gap-2 terracotta-seal-shadow cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download Resume
        </a>
      </div>
    </div>
  );
}
