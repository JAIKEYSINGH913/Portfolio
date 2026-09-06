"use client";

import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SKILLS_A, SKILLS_B } from "@/data/content";

const SKILL_CATEGORIES = [
  {
    title: "Core Programming & Databases",
    num: "01",
    skills: ["Java (J2EE)", "Python", "Kotlin", "Dart", "C", "SQL", "MongoDB", "Neo4j"],
    desc: "Proficient in developing high-performance applications using robust, strongly-typed languages. Experienced in designing optimized database schemas for relational (SQL) and NoSQL databases, alongside advanced graph architectures using Neo4j."
  },
  {
    title: "Frameworks & Platforms",
    num: "02",
    skills: ["Spring Boot", "JWT", "Flutter", "React.js", "GCP", "Firebase", "FastAPI"],
    desc: "Expert in engineering scalable microservices with Spring Boot and building cross-platform, responsive interfaces using Flutter and React. Leveraging Google Cloud Platform (GCP) and Firebase for real-time, cloud-native deployments."
  },
  {
    title: "Architecture & AI Integration",
    num: "03",
    skills: ["Microservices", "GraphRAG", "RESTful APIs", "System Design", "DSA"],
    desc: "Specializing in Distributed Systems and Cloud-Native Backend Architecture. Published researcher in GraphRAG technologies, pioneering hybrid Knowledge Graph pipelines that integrate LLMs to achieve deterministic, hallucination-free retrieval."
  },
  {
    title: "DevOps & Tooling",
    num: "04",
    skills: ["Git/GitHub", "Docker", "Postman", "CI/CD", "SDLC"],
    desc: "Automating software delivery through modern CI/CD pipelines and containerized environments. Adhering to rigorous Software Development Life Cycle (SDLC) best practices to ensure modularity, maintainability, and zero-downtime deployments."
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

      <div className="section-wrap mt-16 md:mt-24">
        <ScrollReveal animation="fade-up">
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Technical Arsenal</p>
          <h1 className="display-lg" style={{ marginBottom: "1.5rem", maxWidth: "800px" }}>
            Architecting <span style={{ color: "var(--accent)" }}>Intelligent Systems</span> from the ground up.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "4rem" }}>
            I specialize in full-stack engineering with a heavy focus on distributed backend systems, AI/ML pipelines, and cloud-native architecture. Here is a comprehensive breakdown of my technical capabilities.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.num} animation="fade-up" delay={i * 100}>
              <div 
                className="group relative h-full flex flex-col p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--surface-translucent)] transition-all duration-500 hover:border-[var(--accent)] hover:shadow-xl"
                style={{ backdropFilter: "blur(12px)" }}
              >
                {/* Number & Title */}
                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] leading-tight">
                    {cat.title}
                  </h3>
                  <span className="font-mono text-sm tracking-widest text-[var(--accent)] opacity-60 font-bold ml-4">
                    {cat.num}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 flex-grow">
                  {cat.desc}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t border-[var(--glass-border)] group-hover:border-[var(--accent-glow)] transition-colors duration-500">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-4 py-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase border border-[var(--glass-border)] text-[var(--text-primary)] bg-[var(--canvas)] group-hover:border-[var(--accent-glow)] transition-colors duration-300"
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
