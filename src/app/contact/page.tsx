"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => { setIsSuccess(false); setFormData({ name: "", email: "", subject: "", message: "" }); }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full relative text-[var(--text-primary)]" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="section-wrap left-bias relative z-10">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>CONTACT</div>
        
        <ScrollReveal animation="fade-up" className="mb-16">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Initiate <span style={{ color: "var(--accent)" }}>Protocol</span>
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

        </div>
      </div>
    </div>
  );
}
