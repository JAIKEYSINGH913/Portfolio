"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        alert("Transmission failed. Please check your network connection.");
      }
    } catch (error) {
      console.error(error);
      alert("Transmission failed due to a network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative text-[var(--text-primary)]" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="section-wrap left-bias relative z-10">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>CONTACT</div>
        
        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-12">
            <h1 className="display-xl text-[var(--text-primary)]">
              Let's<br /><span style={{ color: "var(--accent)" }}>Connect.</span>
            </h1>
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px" }}>
            Establish a direct connection. Whether for engineering collaborations, distributed system consultations, or full-scale architecture builds.
          </p>
        </ScrollReveal>

        {/* Contact Matrix Grid */}
        <div className="grid grid-cols-1 border-t border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          
          {/* Form Cell */}
          <ScrollReveal animation="fade-up" delay={0} className="h-full">
            <div 
              className="group relative h-full flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden"
              style={{ backdropFilter: "blur(12px)" }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight">Secure Transmission</h3>
                  <span className="font-mono text-sm tracking-widest text-[var(--accent)] opacity-80 font-bold ml-2">01</span>
                </div>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center p-12 border border-[var(--border-strong)] bg-[var(--surface-1)] h-full min-h-[300px]">
                    <span className="text-[var(--accent)] text-4xl mb-4">✓</span>
                    <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">Transmission Received</h3>
                    <p className="text-[var(--text-secondary)] text-sm font-mono tracking-widest">Awaiting processing...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] tracking-widest text-[var(--text-secondary)] font-bold uppercase">IDENTIFIER *</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full bg-[var(--surface-1)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] font-mono text-sm focus:border-[var(--accent)] focus:outline-none transition-colors" placeholder="Jaikey Singh" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] tracking-widest text-[var(--text-secondary)] font-bold uppercase">ROUTING VECTOR (EMAIL) *</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full bg-[var(--surface-1)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] font-mono text-sm focus:border-[var(--accent)] focus:outline-none transition-colors" placeholder="hello@network.com" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-[var(--text-secondary)] font-bold uppercase">PAYLOAD (MESSAGE) *</label>
                      <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows={4} className="w-full bg-[var(--surface-1)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] font-mono text-sm focus:border-[var(--accent)] focus:outline-none transition-colors resize-none" placeholder="Initiate handshake..." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="self-start px-8 py-3 bg-[var(--surface-2)] border border-[var(--border-strong)] font-mono text-xs font-bold tracking-widest uppercase text-[var(--text-primary)] hover:bg-[var(--accent-light)] hover:border-[var(--accent-glow)] transition-colors duration-300 disabled:opacity-50 cursor-pointer">
                      {isSubmitting ? "TRANSMITTING..." : "EXECUTE"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Resume Viewer Cell */}
          <ScrollReveal animation="fade-up" delay={100} className="h-full">
            <div 
              className="group relative h-full flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden"
              style={{ backdropFilter: "blur(12px)" }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              
              <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight mb-2">Curriculum Vitae</h3>
                    <a href="/cv.pdf" download className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer">
                      DOWNLOAD RAW PDF ↗
                    </a>
                  </div>
                  <span className="font-mono text-sm tracking-widest text-[var(--accent)] opacity-80 font-bold ml-2">02</span>
                </div>

                <div className="w-full h-[500px] border border-[var(--border-strong)] bg-black overflow-hidden relative">
                  {/* Desktop Iframe */}
                  <div className="hidden md:block w-full h-full relative">
                    <iframe src="/cv.pdf#toolbar=0" className="w-full h-full border-0 absolute inset-0" title="Resume PDF" />
                  </div>
                  {/* Mobile Fallback */}
                  <div className="md:hidden flex flex-col items-center justify-center p-8 text-center h-full bg-[var(--surface-1)]">
                    <svg className="w-12 h-12 text-[var(--accent)] opacity-40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-[var(--text-secondary)] mb-6 text-sm font-mono tracking-widest">FRAMEBUFFER_TOO_SMALL</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Connect Cell */}
          <ScrollReveal animation="fade-up" delay={200} className="h-full">
            <div
              className="group relative h-full flex flex-col p-8 md:p-10 border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)] overflow-hidden"
              style={{ backdropFilter: "blur(12px)" }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="transform transition-transform duration-500 group-hover:translate-x-3 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight mb-1">Connect Directly</h3>
                    <p className="font-mono text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">All channels open</p>
                  </div>
                  <span className="font-mono text-sm tracking-widest text-[var(--accent)] opacity-80 font-bold ml-2">03</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/JAIKEYSINGH913", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>, sub: "@JAIKEYSINGH913", external: true },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/jaikey-singh-2885a7232", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, sub: "Jaikey Singh", external: true },
                    { label: "X / Twitter", href: "https://x.com/JAIKEYSINGH913", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, sub: "@JAIKEYSINGH913", external: true },
                    { label: "Instagram", href: "https://www.instagram.com/jaikey_singh913/", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>, sub: "@jaikey_singh913", external: true },
                    { label: "Email", href: "mailto:jaikeysingh913@gmail.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>, sub: "jaikeysingh913@gmail.com", external: false },
                    { label: "Phone", href: "tel:+919540352249", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>, sub: "+91 9540352249", external: false },
                  ].map(({ label, href, icon, sub, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-3 p-4 border border-[var(--border-strong)] bg-[var(--surface-1)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all duration-300 group/link"
                    >
                      <span className="text-[var(--accent)] flex-shrink-0">{icon}</span>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-primary)] group-hover/link:text-[var(--accent)] transition-colors">{label}</div>
                        <div className="font-mono text-[9px] tracking-wide text-[var(--text-muted)] truncate mt-0.5">{sub}</div>
                      </div>
                      <svg className="ml-auto flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
