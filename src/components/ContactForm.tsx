"use client";

import React, { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => { setIsSuccess(false); setFormData({ name: "", email: "", subject: "", message: "" }); }, 5000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-[var(--cardstock)] border-2 border-[var(--border-light)] rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] paper-drop-shadow">
        <div className="w-16 h-16 rounded-full bg-[var(--sage-light)] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold text-[var(--ink-graphite)] mb-2">Message Sent!</h3>
        <p className="text-[var(--text-secondary)] text-center text-sm">Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-[var(--cardstock)] border-2 border-[var(--border-light)] rounded-xl p-6 sm:p-8 paper-drop-shadow">
      <div className="card-stitched absolute inset-0 pointer-events-none" style={{ background: 'transparent', border: 'none' }}>
        <div className="absolute inset-[6px] border border-dashed border-[var(--chipboard)] rounded-lg" />
      </div>
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-1.5 block">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Jaikey Singh" className="inked-input" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-1.5 block">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="hello@example.com" className="inked-input" />
          </div>
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-1.5 block">Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project inquiry, collaboration..." className="inked-input" />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-1.5 block">Message *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..." className="inked-input resize-none" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="paper-btn self-start bg-[var(--terracotta)] text-white px-6 py-2.5 rounded-lg terracotta-seal-shadow font-mono text-xs uppercase font-bold tracking-wider hover:bg-[var(--terracotta-dark)] transition-all disabled:opacity-70 flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          ) : "Send Message"}
        </button>
      </form>
    </div>
  );
}
