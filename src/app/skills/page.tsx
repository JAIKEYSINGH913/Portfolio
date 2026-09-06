"use client";

import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SKILLS_A, SKILLS_B } from "@/data/content";

const SKILL_CATEGORIES = [
  {
    title: "Distributed Systems & Core",
    num: "01",
    skills: ["Java 17", "Spring Boot", "Microservices", "Python", "C", "System Design"],
    desc: "Architecting high-throughput, fault-tolerant backend services. Proficient in leveraging Java and Spring Boot to design decoupled microservices capable of sustaining massive concurrency and self-healing under load."
  },
  {
    title: "Data Engineering & Graph AI",
    num: "02",
    skills: ["Neo4j", "GraphRAG", "MongoDB", "SQL", "LLMs", "FastAPI"],
    desc: "Designing highly optimized storage layers and pioneering AI integrations. Specialized in Neo4j graph architectures and GraphRAG methodologies to eliminate LLM hallucinations and achieve sub-50ms deterministic retrieval latencies."
  },
  {
    title: "Cloud-Native & DevOps",
    num: "03",
    skills: ["GCP", "Docker", "CI/CD", "Git/GitHub", "Firebase", "SDLC"],
    desc: "Automating global deployments and maintaining zero-downtime environments. Deep expertise in the Google Cloud Platform (GCP) ecosystem, Docker containerization, and rigorous CI/CD pipeline orchestration."
  },
  {
    title: "Cross-Platform Interfaces",
    num: "04",
    skills: ["Flutter", "React.js", "Dart", "Kotlin", "TypeScript", "JWT"],
    desc: "Bridging the gap between powerful backends and seamless user experiences. Developing fluid, reactive, and secure cross-platform client applications adhering to modern state management and component-driven paradigms."
  }
];

export default function SkillsPage() {
  return (
    <div className="w-full relative text-[var(--text-primary)]" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      
      {/* Ticker Tape */}
      <div className="ticker-wrap" style={{ padding: "2rem 0", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", background: "var(--surface-translucent)", backdropFilter: "blur(8px)", position: "relative", zIndex: 10 }}>
        <div className="ticker-track ticker-left" style={{ marginBottom: 10 }}>
          {[...SKILLS_A, ...SKILLS_A, ...SKILLS_A].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
        <div className="ticker-track ticker-right">
          {[...SKILLS_B, ...SKILLS_B, ...SKILLS_B].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
      </div>

      <div className="section-wrap left-bias mt-16 md:mt-24 relative">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>SKILLS</div>
        
        <ScrollReveal animation="fade-up" className="relative z-10">
          <div style={{ maxWidth: "750px" }}>
            <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Technical Arsenal</p>
            <h1 className="display-lg" style={{ marginBottom: "1.5rem" }}>
              Architecting <span style={{ color: "var(--accent)" }}>Intelligent Systems</span> from the ground up.
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "4rem" }}>
              I specialize in full-stack engineering with a heavy focus on distributed backend systems, AI/ML data pipelines, and cloud-native architecture. Every tool in this stack is utilized with a deep understanding of its underlying trade-offs and performance implications.
            </p>
          </div>
        </ScrollReveal>

        {/* Constrain the grid strictly to the left side (max 850px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10" style={{ maxWidth: "850px" }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.num} animation="fade-up" delay={i * 100}>
              <div 
                className="group relative h-full flex flex-col p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-translucent)] transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[var(--shadow-accent)]"
                style={{ backdropFilter: "blur(12px)" }}
              >
                {/* Subtle top gradient line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number & Title */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] leading-tight max-w-[80%]">
                    {cat.title}
                  </h3>
                  <span className="font-mono text-xs tracking-widest text-[var(--accent)] opacity-50 font-bold ml-2">
                    {cat.num}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  {cat.desc}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--glass-border)] group-hover:border-[var(--accent-glow)] transition-colors duration-500">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-md font-mono text-[10px] font-bold tracking-widest uppercase border border-[var(--border-strong)] text-[var(--text-primary)] bg-[var(--surface-2)] group-hover:border-[var(--accent-glow)] group-hover:bg-[var(--accent-light)] transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
