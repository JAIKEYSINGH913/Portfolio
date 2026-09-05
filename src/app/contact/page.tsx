"use client";

import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import { ResumeViewer } from "@/components/ResumeViewer";

export default function ContactPage() {
  return (
    <div className="w-full relative text-white" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <section id="contact" className="relative z-10">
        <div className="bg-label" style={{ top: -60, left: 0, opacity: 0.3 }}>CONTACT</div>
        <div className="section-wrap">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow" style={{ marginBottom: "1rem", textAlign: "center" }}>Let&apos;s Collaborate</p>
            <h2 className="display-lg" style={{ textAlign: "center", marginBottom: "5rem" }}>Let&apos;s build<br /><span style={{ color: "#C85A2A" }}>Something.</span></h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <ScrollReveal animation="slide-right">
              <ResumeViewer />
            </ScrollReveal>
            <ScrollReveal animation="slide-left" delay={120}>
              <div style={{ background: "rgba(15,13,11,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "2.5rem", backdropFilter: "blur(12px)" }}>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
