"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HexBrainCanvas, PaperHandLeft, PaperHandRight } from "@/components/HexBrain";
import { SKILLS_A, SKILLS_B } from "@/data/content";

function HexSkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="hex-skills-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HexBrainCanvas visible={visible} />
      <PaperHandLeft visible={visible} />
      <PaperHandRight visible={visible} />
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
        <ScrollReveal animation="fade-up">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C85A2A", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ width: 28, height: 1.5, background: "#C85A2A", display: "inline-block" }} />
            Neural Skill Map
            <span style={{ width: 28, height: 1.5, background: "#C85A2A", display: "inline-block" }} />
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "1.25rem" }}>
            Technology<br /><span style={{ color: "#C85A2A" }}>Arsenal.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Hover any hex node. Each cell is a battle-tested skill in the stack.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {[ { label: "Languages", val: "Java · Python · Dart · TS" }, { label: "Frameworks", val: "Spring · React · Flutter" }, { label: "Data", val: "Neo4j · Postgres · Mongo" }, { label: "Cloud", val: "GCP · Firebase · CI/CD" } ].map(c => (
              <div key={c.label} style={{ padding: "10px 18px", borderRadius: 50, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(8px)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C85A2A", marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>{c.val}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="w-full relative text-white" style={{ paddingTop: '8rem' }}>
      <div className="ticker-wrap" style={{ padding: "2rem 0", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", background: "rgba(8,6,4,0.6)", backdropFilter: "blur(8px)", position: "relative", zIndex: 10 }}>
        <div className="ticker-track ticker-left" style={{ marginBottom: 10 }}>
          {[...SKILLS_A, ...SKILLS_A, ...SKILLS_A].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
        <div className="ticker-track ticker-right">
          {[...SKILLS_B, ...SKILLS_B, ...SKILLS_B].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
      </div>
      <HexSkillsSection />
    </div>
  );
}
