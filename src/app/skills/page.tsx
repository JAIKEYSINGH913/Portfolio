"use client";

import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const SKILLS_TOP = [
  { n: "Java (J2EE)", e: "☕" },
  { n: "Spring Boot", e: "🍃" },
  { n: "Python", e: "🐍" },
  { n: "Flutter", e: "💙" },
  { n: "Kotlin", e: "📱" },
  { n: "SQL", e: "🗄️" },
  { n: "GraphRAG", e: "🕸️" },
  { n: "React.js", e: "⚛️" }
];

const SKILLS_BOT = [
  { n: "Neo4j", e: "🔵" },
  { n: "GCP", e: "☁️" },
  { n: "MongoDB", e: "🍃" },
  { n: "Microservices", e: "⚙️" },
  { n: "FastAPI", e: "⚡" },
  { n: "Dart", e: "🎯" },
  { n: "Firebase", e: "🔥" },
  { n: "System Design", e: "📐" }
];

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
      
      <div className="section-wrap left-bias mt-16 md:mt-24 relative">
        <div className="bg-label" style={{ top: -80, left: -40, opacity: 0.15, pointerEvents: "none" }}>SKILLS</div>
        
        <ScrollReveal animation="fade-up" className="relative z-10 mb-16">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Technical <span style={{ color: "var(--accent)" }}>Arsenal</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 border-t border-l border-[var(--border-strong)] w-full lg:w-[70vw] max-w-5xl bg-[var(--surface-translucent)]" style={{ backdropFilter: "blur(12px)" }}>
            {/* Matrix Cell 1 */}
            <div className="p-8 border-r border-b border-[var(--border-strong)] hover:bg-[var(--surface-3)] transition-colors duration-300 group cursor-default">
              <h2 className="font-mono text-xs tracking-widest text-[var(--text-secondary)] mb-4 group-hover:text-[var(--accent)] transition-colors">01 // ARCHITECTURE</h2>
              <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-3 uppercase tracking-wide">Intelligent Systems</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Specializing in distributed backend infrastructure, orchestrating high-throughput microservices engineered for zero-downtime and massive scale from the ground up.
              </p>
            </div>
            
            {/* Matrix Cell 2 */}
            <div className="p-8 border-r border-b border-[var(--border-strong)] hover:bg-[var(--surface-3)] transition-colors duration-300 group cursor-default">
              <h2 className="font-mono text-xs tracking-widest text-[var(--text-secondary)] mb-4 group-hover:text-[var(--accent)] transition-colors">02 // DATA PIPELINES</h2>
              <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-3 uppercase tracking-wide">Graph AI & RAG</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Pioneering hybrid Knowledge Graph topologies and advanced LLM integrations to eliminate hallucinations and achieve sub-50ms deterministic data retrieval.
              </p>
            </div>

            {/* Matrix Cell 3 */}
            <div className="p-8 border-r border-b border-[var(--border-strong)] hover:bg-[var(--surface-3)] transition-colors duration-300 group cursor-default">
              <h2 className="font-mono text-xs tracking-widest text-[var(--text-secondary)] mb-4 group-hover:text-[var(--accent)] transition-colors">03 // INFRASTRUCTURE</h2>
              <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-3 uppercase tracking-wide">Cloud-Native Scale</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Deep expertise in container orchestration, bare-metal server deployment, and designing highly resilient, autonomous CI/CD automation pipelines.
              </p>
            </div>

            {/* Matrix Cell 4 */}
            <div className="p-8 border-r border-b border-[var(--border-strong)] hover:bg-[var(--surface-3)] transition-colors duration-300 group cursor-default">
              <h2 className="font-mono text-xs tracking-widest text-[var(--text-secondary)] mb-4 group-hover:text-[var(--accent)] transition-colors">04 // EXECUTION</h2>
              <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-3 uppercase tracking-wide">Full-Stack Delivery</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Bridging rigorous backend engines with fluid, reactive cross-platform client interfaces utilizing modern component-driven paradigms.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Constrain the grid strictly to 70% width */}
        <div className="grid grid-cols-1 border-t border-l border-[var(--border-strong)] relative z-10 w-full lg:w-[70vw] max-w-5xl">
          {SKILL_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.num} animation="fade-up" delay={i * 100} className="h-full">
              <div 
                className="group relative h-full flex flex-col p-8 border-r border-b border-[var(--border-strong)] bg-[var(--surface-translucent)] transition-all duration-500 hover:bg-[var(--surface-3)]"
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
                      className="px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-[var(--border-strong)] text-[var(--text-primary)] bg-[var(--surface-2)] group-hover:border-[var(--accent-glow)] group-hover:bg-[var(--accent-light)] transition-colors duration-300"
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

      {/* Ticker Tape Fixed to Bottom */}
      <div className="fixed bottom-0 left-0 w-full ticker-wrap" style={{ padding: "1.5rem 0", borderTop: "1px solid var(--border-strong)", background: "var(--surface-translucent)", backdropFilter: "blur(12px)", zIndex: 40 }}>
        <div className="ticker-track ticker-left" style={{ marginBottom: 10 }}>
          {[...SKILLS_TOP, ...SKILLS_TOP, ...SKILLS_TOP].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
        <div className="ticker-track ticker-right">
          {[...SKILLS_BOT, ...SKILLS_BOT, ...SKILLS_BOT].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
      </div>
    </div>
  );
}
