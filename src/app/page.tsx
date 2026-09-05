"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import { ResumeViewer } from "@/components/ResumeViewer";
import { HexBrainCanvas, PaperHandLeft, PaperHandRight } from "@/components/HexBrain";
import { CinematicBackground } from "@/components/CinematicBackground";

const SKILLS_A = [
  { n: "Java", e: "☕" }, { n: "Spring Boot", e: "🍃" }, { n: "React", e: "⚛️" },
  { n: "Next.js", e: "▲" }, { n: "TypeScript", e: "💙" }, { n: "Node.js", e: "🟩" },
  { n: "Python", e: "🐍" }, { n: "GraphRAG", e: "🕸️" },
];
const SKILLS_B = [
  { n: "Neo4j", e: "🔵" }, { n: "GCP", e: "☁️" }, { n: "Docker", e: "🐳" },
  { n: "MongoDB", e: "🍃" }, { n: "PostgreSQL", e: "🐘" }, { n: "Kubernetes", e: "⚙️" },
  { n: "Django", e: "🎯" }, { n: "Flutter", e: "💙" },
];

const PROJECTS = [
  {
    title: "EcoThread Backend",
    desc: "Architected a scalable microservices backend in Java/Spring Boot for a sustainable fashion platform. Implemented JWT auth and PostgreSQL.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Docker", "JWT"],
    accent: "#6BA86F",
    num: "01",
  },
  {
    title: "GraphRAG Engine",
    desc: "AI knowledge retrieval system combining LLMs with Neo4j graph databases to eliminate hallucinations by 95%.",
    tags: ["Python", "Neo4j", "OpenAI", "FastAPI"],
    accent: "#6096BA",
    num: "02",
  },
  {
    title: "FinDash Realtime",
    desc: "A high-performance financial dashboard handling WebSockets for live market data visualization.",
    tags: ["React", "TypeScript", "Tailwind", "WebSockets"],
    accent: "#E5A93D",
    num: "03",
  },
  {
    title: "Cloud Infrastructure CI/CD",
    desc: "Automated deployment pipelines to GCP using GitHub Actions, Terraform, and Docker registries. Zero-downtime deploys.",
    tags: ["GCP", "Terraform", "GitHub Actions", "Docker"],
    accent: "#C85A2A",
    num: "04",
  },
];

const EXPERIENCE = [
  {
    role: "Backend Architecture Trainee",
    company: "Tech Mahindra",
    date: "Jun 2024 – Present",
    points: [
      "Designed and implemented RESTful microservices using Spring Boot and Java 17.",
      "Optimized database queries, reducing response times by 30%.",
      "Collaborated in an Agile team to deliver features in 2-week sprints.",
    ],
    accent: "#C85A2A",
  },
  {
    role: "Full Stack Developer Intern",
    company: "StartUp Inc.",
    date: "Jan 2024 – May 2024",
    points: [
      "Built a modern React frontend with Next.js and complex state management.",
      "Developed Python automation scripts for data processing pipelines.",
      "Set up CI/CD pipelines via GitHub Actions.",
    ],
    accent: "#6096BA",
  },
  {
    role: "B.Tech Computer Science",
    company: "NITRA Technical Campus",
    date: "2022 – 2026",
    points: [
      "Core coursework: DSA, OS, DBMS, Computer Networks.",
      "Vice President of the Coding Club — organized hackathons for 200+ students.",
      "Maintaining 9.2 CGPA across 5 semesters.",
    ],
    accent: "#6BA86F",
  },
];

const CERTS = [
  { name: "Big Data & Hadoop", url: "https://drive.google.com/file/d/1MdiT7AG94_l482c6DyL8qfBmxrH3n76I/preview", color: "#6096BA" },
  { name: "Android App Dev", url: "https://drive.google.com/file/d/1yJKvzYBPgMcD_yzs2uPGchgxFOme_Mea/preview", color: "#6BA86F" },
  { name: "Java Fundamentals", url: "https://drive.google.com/file/d/1phjadKG2GQzZ55n55yvBS7jQIWIFZHZO/preview", color: "#E5A93D" },
  { name: "Agile Development", url: "https://drive.google.com/file/d/1FQ9vPboe0u6QcQv6QX2cXEEhNDQ9V2cD/preview", color: "#C85A2A" },
  { name: "Gen AI Overview", url: "https://drive.google.com/file/d/1cY7SivizIIM_Lm15HlLXT4LAr9cRb_dW/preview", color: "#B460BA" },
];

/* ── AmbientCanvas: floating embers ── */
function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    const pts = Array.from({ length: 22 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15, vy: -0.08 - Math.random() * 0.25,
      r: Math.random() * 1.8 + 0.5, sw: Math.random() * Math.PI * 2,
    }));
    let raf: number, t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;
      pts.forEach(p => {
        p.x += p.vx + Math.sin(t + p.sw) * 0.25;
        p.y += p.vy;
        if (p.y < -60) { p.y = h + 60; p.x = Math.random() * w; }
        const alpha = 0.15 + Math.sin(t * 2 + p.sw) * 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,90,42,${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(p.x + Math.sin(t + p.sw) * 15, p.y + 30, p.x, p.y + 60);
        ctx.strokeStyle = `rgba(200,90,42,${alpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[1] mix-blend-screen" />;
}

/* ── Scroll Progress Bar ── */
function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="fixed top-0 left-0 h-[2px] z-[200]" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#C85A2A,#E5A93D,#C85A2A)", transition: "width 80ms linear" }} />;
}

/* ── Hero Section ── */
function Hero() {
  return (
    <section
      className="hero-section"
      style={{ background: "transparent" }}
    >
      {/* Bottom fade to blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 z-[5]" style={{ background: "linear-gradient(to top, #080604, transparent)" }} />

      <div className="hero-content relative z-10 flex flex-col items-end text-right">
        {/* Role eyebrow */}
        <p className="hero-role mb-6">
          B.Tech CSE &nbsp;·&nbsp; Graduating 2026 &nbsp;·&nbsp; Software Engineer
        </p>

        {/* Giant name */}
        <h1 className="hero-name mb-2">
          Jaikey<br />
          <span className="hero-name-accent">Singh.</span>
        </h1>

        {/* Thin divider */}
        <div style={{ width: "clamp(120px, 40vw, 360px)", height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "1.5rem" }} />

        {/* Descriptor */}
        <p className="hero-desc mb-8" style={{ textAlign: "right" }}>
          I architect scalable, intelligent backend systems — Java microservices,
          GraphRAG AI pipelines, and cloud-native platforms that ship to production.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-end mb-0">
          <a href="#works" className="hero-cta-primary">
            Selected Works
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#contact" className="hero-cta-secondary">Get In Touch</a>
          <a href="#certifications" className="hero-cta-secondary">📜 Credentials</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-cue">
        <svg width="24" height="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ── Hex Skills Section ── */
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
    <div ref={ref} className="hex-skills-section">
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
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#FAFAF7", marginBottom: "1.25rem" }}>
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

/* ── Cert Modal ── */
function CertModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 cert-modal-backdrop" onClick={onClose} />
      <div className="relative w-full max-w-4xl" style={{ height: "80vh" }}>
        <div className="cert-modal-card w-full h-full relative p-4 flex flex-col rounded-2xl border border-[rgba(255,255,255,0.12)]">
          <div className="flex justify-between items-center mb-4">
            <div style={{ display: "flex", gap: 8 }}>
              {["#E57373","#FFB74D","#81C784"].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />)}
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>✕</button>
          </div>
          <div className="flex-1 w-full rounded-lg overflow-hidden" style={{ background: "#111" }}>
            <iframe src={url} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function Portfolio() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  return (
    <div className="w-full relative text-white" style={{ background: "#080604" }}>
      <CinematicBackground />
      <AmbientCanvas />
      <ScrollProgressBar />

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
        <div className="section-wrap">
          {/* Stats row */}
          <ScrollReveal animation="fade-up">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", marginBottom: "6rem" }}>
              {[
                { num: "3×", label: "Faster API\nvia caching" },
                { num: "4+", label: "Production\nprojects shipped" },
                { num: "95%", label: "LLM hallucination\nreduction" },
              ].map(s => (
                <div key={s.num} className="stat-card" style={{ padding: "3rem 2rem", textAlign: "center", background: "rgba(15,13,11,0.8)", backdropFilter: "blur(12px)" }}>
                  <div className="stat-number">{s.num}</div>
                  <div className="stat-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <ScrollReveal animation="slide-right">
              <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>The Architecture</p>
              <h2 className="display-lg" style={{ marginBottom: "2rem" }}>
                Engineering for<br /><span style={{ color: "#C85A2A" }}>Scale & Impact.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                As a Software Engineer specializing in backend architecture, I don&apos;t just write code — I build robust, self-healing systems that scale under pressure.
              </p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Currently pursuing my B.Tech in CSE at NITRA Technical Campus, maintaining a 9.2 CGPA while shipping production-ready applications.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="slide-left" delay={150}>
              <blockquote style={{ borderLeft: "3px solid #C85A2A", paddingLeft: "2rem", margin: 0 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>
                  &ldquo;Code is the closest thing we have to a superpower.&rdquo;
                </p>
                <cite style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C85A2A", fontStyle: "normal" }}>— Jaikey Singh</cite>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── SKILLS TICKER ─── */}
      <div className="ticker-wrap" style={{ padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(8,6,4,0.6)", backdropFilter: "blur(8px)", position: "relative", zIndex: 10 }}>
        <div className="ticker-track ticker-left" style={{ marginBottom: 10 }}>
          {[...SKILLS_A, ...SKILLS_A, ...SKILLS_A].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
        <div className="ticker-track ticker-right">
          {[...SKILLS_B, ...SKILLS_B, ...SKILLS_B].map((s, i) => <span className="skill-chip" key={i}><span>{s.e}</span>{s.n}</span>)}
        </div>
      </div>

      {/* ─── HEX SKILLS ─── */}
      <HexSkillsSection />

      {/* ─── PROJECTS ─── */}
      <section id="works" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "8rem", background: "rgba(8,6,4,0.5)", backdropFilter: "blur(4px)" }}>
        <div className="bg-label" style={{ top: -20, right: -40, opacity: 0.4 }}>WORKS</div>
        <div className="section-wrap">
          <ScrollReveal animation="fade-up">
            <div style={{ marginBottom: "4rem" }}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>Selected Works</p>
              <h2 className="display-lg">Things I&apos;ve<br /><span style={{ color: "#C85A2A" }}>Built.</span></h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={p.title} animation="fade-up" delay={i * 80}>
                <div className="project-card" style={{ minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem" }}>
                  {/* Top */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>{p.num}</span>
                    <span className="project-badge" style={{ background: p.accent }}>{p.title.split(" ")[0]}</span>
                  </div>
                  {/* Accent top bar */}
                  <div style={{ height: 2, background: p.accent, borderRadius: 2, margin: "1.5rem 0", width: "40%", opacity: 0.7 }} />
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#FAFAF7", marginBottom: "0.75rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{p.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>{p.desc}</p>
                  </div>
                  {/* Tags + Arrow */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tags.slice(0, 3).map(t => (
                        <span key={t} style={{ padding: "3px 10px", borderRadius: 50, fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.09)", color: "var(--text-muted)", background: "rgba(255,255,255,0.04)" }}>{t}</span>
                      ))}
                    </div>
                    <button className="project-arrow">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
        <div className="bg-label" style={{ top: "20%", left: -40, opacity: 0.3 }}>EXP.</div>
        <div className="section-wrap">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow" style={{ marginBottom: "1rem", textAlign: "center" }}>The Journey</p>
            <h2 className="display-lg" style={{ textAlign: "center", marginBottom: "5rem" }}>Professional<br /><span style={{ color: "#C85A2A" }}>Timeline.</span></h2>
          </ScrollReveal>
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", paddingLeft: "2.5rem" }}>
            <div className="timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {EXPERIENCE.map((exp, i) => (
                <ScrollReveal key={i} animation="slide-right" delay={i * 120}>
                  <div className="exp-card">
                    <div className="timeline-node" style={{ background: exp.accent }} />
                    <div className="exp-card-accent-bar" style={{ background: exp.accent }} />
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: "1.25rem" }}>
                      <div>
                        <h3 className="display-sm" style={{ marginBottom: 4 }}>{exp.role}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{exp.company}</p>
                      </div>
                      <span style={{ padding: "5px 14px", borderRadius: 50, fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)", flexShrink: 0 }}>{exp.date}</span>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: exp.accent, flexShrink: 0, marginTop: 8 }} />{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section id="certifications" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "8rem", background: "rgba(10,8,6,0.85)", backdropFilter: "blur(12px)" }}>
        <div className="bg-label" style={{ top: 0, right: -40, opacity: 0.1, color: "#FAFAF7" }}>CERTS</div>
        <div className="section-wrap">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Verified Credentials</p>
            <h2 className="display-lg" style={{ marginBottom: "4rem" }}>Continuous<br /><span style={{ color: "#C88A2A" }}>Learning.</span></h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", maxWidth: 700 }}>
              {/* Mac title bar */}
              <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
                {["#E57373","#FFB74D","#81C784"].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 8, letterSpacing: "0.1em" }}>credentials.log</span>
              </div>
              {/* Cert list */}
              <div style={{ padding: "0.5rem" }}>
                {CERTS.map((cert, i) => (
                  <div key={cert.name} className="cert-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>0{i+1}</span>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: cert.color, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#FAFAF7", fontWeight: 700 }}>{cert.name}</span>
                    </div>
                    <button className="cert-view-btn" onClick={() => setActiveCert(cert.url)}>View ↗</button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative z-10" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
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

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10" style={{ background: "rgba(8,6,4,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem 0" }}>
        <div className="section-wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C85A2A", boxShadow: "0 0 8px rgba(200,90,42,0.6)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "#F5F2EE", letterSpacing: "-0.02em" }}>JAIKEY SINGH</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", marginTop: 2 }}>© 2026 ALL RIGHTS RESERVED.</div>
              </div>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C85A2A", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "gap 0.2s ease" }}
            >
              Back to Top
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
            </button>
          </div>
        </div>
      </footer>

      {activeCert && <CertModal url={activeCert} onClose={() => setActiveCert(null)} />}
    </div>
  );
}
