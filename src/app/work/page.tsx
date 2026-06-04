"use client";

import React, { useState } from "react";
import { SkillsPhysics } from "@/components/SkillsPhysics";

interface Job {
  role: string;
  company: string;
  type: string;
  period: string;
  bullets: string[];
  credentialUrl?: string;
}

interface Project {
  title: string;
  category: string;
  tech: string;
  bullets: string[];
  links: {
    label: string;
    url: string;
  }[];
}

interface Certification {
  name: string;
  issuer: string;
  credentialUrl?: string;
}

interface Achievement {
  title: string;
  description: string;
}

const JOBS: Job[] = [
  {
    role: "Software Engineering Intern",
    company: "Infosys Springboard",
    type: "Internship",
    period: "Dec 2025 - Mar 2026",
    bullets: [
      "Engineered scalable backend infrastructure utilizing Microservices Architecture and optimized Database Schema Design.",
      "Enhanced system throughput by implementing high-performance Data Structures and Algorithms (DSA) for complex data processing."
    ],
    credentialUrl: "https://drive.google.com/file/d/1j561kCeXKi3hNd-YUqMXDZOsVOkptvKM/view?usp=drive_link"
  },
  {
    role: "Java Backend Developer Intern",
    company: "The Skybrisk",
    type: "Internship",
    period: "Jun 2025 - Dec 2025",
    bullets: [
      "Developed and deployed production-grade RESTful APIs using Spring Boot, improving modularity and system maintainability.",
      "Optimized complex SQL queries and indexing strategies, reducing API response latency by 30%."
    ],
    credentialUrl: "https://drive.google.com/file/d/14zoyG8GlWFdu2301Nfka3QR5BQfRr_Rp/view?usp=drive_link"
  },
  {
    role: "AI Intern",
    company: "TechSaksham (Microsoft & SAP Collaboration)",
    type: "Internship",
    period: "Dec 2024 - Jan 2025",
    bullets: [
      "Designed end-to-end Machine Learning pipelines involving Exploratory Data Analysis (EDA) and advanced Feature Engineering."
    ],
    credentialUrl: "https://drive.google.com/file/d/1e25i6dokDDRNyr8isKt7xlmFeBXpAyLB/view?usp=drive_link"
  }
];

const PROJECTS: Project[] = [
  {
    title: "NyayMitra: A Proposed GraphRAG Architecture for IPC-BNS Transition",
    category: "Publication / Research",
    tech: "Neo4j, GraphRAG, Legal-BERT, Python",
    bullets: [
      "Presented at National Level Conference, HRIT University (April 2026).",
      "Developed a hybrid Knowledge Graph architecture using Neo4j and GraphRAG to solve statutory concept drift.",
      "Integrated Legal-BERT embeddings for semantic mapping, achieving efficient sub-50ms multi-hop retrieval latencies.",
      "Implemented a deterministic verification pipeline, resulting in a 100% hallucination mitigation rate.",
      "Formulated a PageRank-optimized ranking algorithm to computationally prioritize landmark judicial authority."
    ],
    links: [
      { label: "Live Application", url: "https://nyay-mitra-rho.vercel.app/" },
      { label: "Source Code", url: "https://github.com/JAIKEYSINGH913/Nyay-mitra" }
    ]
  },
  {
    title: "BudgetWise: AI-Driven Financial Ecosystem",
    category: "Full-Stack Development",
    tech: "Java, Spring Boot, JWT, PostgreSQL, Render",
    bullets: [
      "Built a full-stack financial engine with automated categorization logic and real-time analytical dashboards.",
      "Implemented secure JWT Authentication and encrypted communication layers for robust user session management."
    ],
    links: [
      { label: "Frontend App", url: "https://budgetwise-jaikeysingh913.me" },
      { label: "API Endpoint", url: "https://api.budgetwise-jaikeysingh913.me" },
      { label: "Source Code", url: "https://github.com/JAIKEYSINGH913/BudgetWise-AI-Driven-Expense-Tracker-and-Budget-Advisor" }
    ]
  },
  {
    title: "SoulSync: Scalable Multimedia Engine",
    category: "Mobile & AI Integration",
    tech: "Flutter, Dart, Firebase, Recommendation Algorithms",
    bullets: [
      "Engineered a high-performance mobile app using Flutter and NoSQL (Firebase) for real-time data persistence.",
      "Integrated an AI Recommendation Engine that increased User Retention and Engagement by 28%."
    ],
    links: [
      { label: "Source Code", url: "https://github.com/JAIKEYSINGH913/Multimedia_Player" }
    ]
  },
  {
    title: "SMS Spam Detection (NLP Pipeline)",
    category: "Natural Language Processing",
    tech: "Python, NLTK, Scikit-Learn, Machine Learning",
    bullets: [
      "Developed a Natural Language Processing (NLP) classifier using TF-IDF and Naive Bayes, achieving 95% Accuracy.",
      "Optimized model performance via tokenization, lemmatization, and hyperparameter tuning on high-dimensional text data."
    ],
    links: [
      { label: "Source Code", url: "https://github.com/JAIKEYSINGH913/SMS-Spam-Detection" }
    ]
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    name: "Big Data and Cloud Computing Fundamentals",
    issuer: "YBI Foundation",
    credentialUrl: "https://drive.google.com/file/d/1MdiT7AG94_l482c6DyL8qfBmxrH3n76I/view?usp=drive_link"
  },
  {
    name: "Professional Android & Kotlin Masterclass",
    issuer: "Udemy Developer Series",
    credentialUrl: "https://drive.google.com/file/d/1yJKvzYBPgMcD_yzs2uPGchgxFOme_Mea/view?usp=drive_link"
  },
  {
    name: "Java Foundation Specialization",
    issuer: "Infosys Springboard Certification",
    credentialUrl: "https://drive.google.com/file/d/1phjadKG2GQzZ55n55yvBS7jQIWIFZHZO/view?usp=drive_link"
  },
  {
    name: "Agile Software Development",
    issuer: "Infosys Springboard Professional Credential",
    credentialUrl: "https://drive.google.com/file/d/1FQ9vPboe0u6QcQv6QX2cXEEhNDQ9V2cD/view?usp=drive_link"
  },
  {
    name: "Generative AI & LLM Fundamentals",
    issuer: "Udacity Professional Series",
    credentialUrl: "https://drive.google.com/file/d/1cY7SivizIIM_Lm15HlLXT4LAr9cRb_dW/view?usp=drive_link"
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "President, CODSoc Society",
    description: "Elected leader of the campus technical society; mentored 200+ students in Competitive Programming."
  },
  {
    title: "Smart India Hackathon (SIH) Finalist",
    description: "National finalist in India's premier government hackathon for scalable tech innovation."
  },
  {
    title: "Google Cloud Arcade Champion",
    description: "Top-tier performer in Cloud Architecture and DevOps-focused technical challenges."
  },
  {
    title: "Reliance Foundation Scholar (2022)",
    description: "Prestigious national scholarship awarded for exceptional academic and leadership merit."
  }
];

export default function Work() {
  const [tab, setTab] = useState<"experience" | "projects" | "education">("experience");
  const [activeJobIdx, setActiveJobIdx] = useState(0);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  const handleNext = () => {
    if (tab === "experience") {
      setActiveJobIdx((prev) => (prev + 1) % JOBS.length);
    } else if (tab === "projects") {
      setActiveProjIdx((prev) => (prev + 1) % PROJECTS.length);
    }
  };

  const handlePrev = () => {
    if (tab === "experience") {
      setActiveJobIdx((prev) => (prev - 1 + JOBS.length) % JOBS.length);
    } else if (tab === "projects") {
      setActiveProjIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    }
  };

  const activeJob = JOBS[activeJobIdx];
  const activeProj = PROJECTS[activeProjIdx];

  return (
    <main className="h-screen overflow-hidden flex flex-col pt-[8vh]">
      <h1 className="sr-only">Work Experience, Projects, and Education of Jaikey Singh</h1>

      {/* Main interactive area */}
      <div className="flex-1 relative flex items-center justify-center px-4">
        {/* Left chevron button (hidden in education tab) */}
        {tab !== "education" && (
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 lg:left-8 z-10 w-12 h-12 rounded-full border-2 border-transparent items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            style={{
              borderRightColor: "rgba(255,255,255,0.4)",
              borderBottomColor: "rgba(255,255,255,0.4)",
            }}
            aria-label="Previous item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Right chevron button (hidden in education tab) */}
        {tab !== "education" && (
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-4 lg:right-8 z-10 w-12 h-12 rounded-full border-2 border-transparent items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            style={{
              borderLeftColor: "rgba(255,255,255,0.4)",
              borderTopColor: "rgba(255,255,255,0.4)",
            }}
            aria-label="Next item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        {/* Main Bento Frame */}
        <div className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[70vw]">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Left column - Workspace card */}
            <div className="w-full lg:w-[60%] bg-black/40 rounded-2xl border border-white/10 p-5 md:p-6 flex flex-col min-h-[480px] lg:min-h-[500px]">
              
              {/* Tab Selector */}
              <div className="grid grid-cols-3 gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-5">
                <button
                  onClick={() => setTab("experience")}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all duration-300 font-oxanium ${
                    tab === "experience" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => setTab("projects")}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all duration-300 font-oxanium ${
                    tab === "projects" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setTab("education")}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all duration-300 font-oxanium ${
                    tab === "education" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Education
                </button>
              </div>

              {/* Tab Content rendering */}
              <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1 max-h-[350px] lg:max-h-[380px] custom-scrollbar">
                
                {/* 1. EXPERIENCE TAB */}
                {tab === "experience" && activeJob && (
                  <div className="flex flex-col space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div>
                      <span className="text-xs tracking-widest text-white/40 uppercase font-oxanium">Professional Experience</span>
                      <h2 className="text-xl md:text-2xl font-bold text-white font-oxanium mt-1">{activeJob.role}</h2>
                      <h3 className="text-md md:text-lg text-white/80 font-medium">{activeJob.company}</h3>
                      <div className="flex items-center gap-2.5 mt-1.5 text-xs text-white/50 font-oxanium">
                        <span>{activeJob.type}</span>
                        <span>•</span>
                        <span>{activeJob.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm text-white/70 leading-relaxed font-oxanium">
                      {activeJob.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white/30 shrink-0 mt-0.5">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {activeJob.credentialUrl && (
                      <div className="pt-3">
                        <a
                          href={activeJob.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border bg-white text-black border-transparent hover:bg-white/90 transition-all duration-300"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          Verify Credential
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PROJECTS & PUBLICATIONS TAB */}
                {tab === "projects" && activeProj && (
                  <div className="flex flex-col space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div>
                      <span className="text-xs tracking-widest text-white/40 uppercase font-oxanium">{activeProj.category}</span>
                      <h2 className="text-lg md:text-xl font-bold text-white font-oxanium mt-1 leading-snug">{activeProj.title}</h2>
                      <div className="text-xs text-white/50 font-oxanium mt-1">
                        <span className="font-semibold text-white/70">Tech: </span>{activeProj.tech}
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm text-white/70 leading-relaxed font-oxanium">
                      {activeProj.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white/30 shrink-0 mt-0.5">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeProj.links.map((link, idx) => {
                        const isGitHub = link.label.toLowerCase().includes("source");
                        return (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                              isGitHub
                                ? "bg-white/5 text-white border-white/10 hover:bg-white/10"
                                : "bg-white text-black border-transparent hover:bg-white/90"
                            }`}
                          >
                            {!isGitHub ? (
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            )}
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. EDUCATION TAB */}
                {tab === "education" && (
                  <div className="flex flex-col space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    {/* Education */}
                    <div>
                      <span className="text-xs tracking-widest text-white/40 uppercase font-oxanium">Education</span>
                      <h2 className="text-lg md:text-xl font-bold text-white font-oxanium mt-1">NITRA Technical Campus (Affiliated with AKTU)</h2>
                      <p className="text-sm text-white/80">Bachelor of Technology (B.Tech) in Computer Science and Engineering</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
                        <span>Ghaziabad, India</span>
                        <span>•</span>
                        <span>Expected: 2026</span>
                      </div>
                      <p className="text-xs text-white/40 mt-1.5 font-oxanium">
                        <span className="font-semibold text-white/60">Key Coursework:</span> Operating Systems, DBMS, System Design, Computer Networks, OOP
                      </p>
                    </div>

                    {/* Certifications list */}
                    <div>
                      <span className="text-xs tracking-widest text-white/40 uppercase font-oxanium">Certifications</span>
                      <div className="mt-2 space-y-2">
                        {CERTIFICATIONS.map((cert, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/5 p-2.5 rounded-lg text-xs">
                            <div>
                              <p className="font-semibold text-white font-oxanium">{cert.name}</p>
                              <p className="text-white/50">{cert.issuer}</p>
                            </div>
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded bg-white text-black font-semibold hover:bg-white/80 transition-colors"
                              >
                                Verify
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <span className="text-xs tracking-widest text-white/40 uppercase font-oxanium">Achievements & Leadership</span>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {ACHIEVEMENTS.map((ach, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-lg text-xs">
                            <p className="font-bold text-white font-oxanium mb-0.5">{ach.title}</p>
                            <p className="text-white/60 leading-relaxed">{ach.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right column - Skills Physics */}
            <div className="w-full lg:w-[40%] bg-black/40 rounded-2xl border border-white/10 overflow-hidden min-h-[350px] lg:min-h-[500px] flex flex-col">
              <h3
                className="text-white font-semibold text-lg px-5 pt-4 pb-1"
                style={{ fontFamily: "var(--font-oxanium), sans-serif" }}
              >
                Technical Skills
              </h3>
              <p className="text-[10px] text-white/40 px-5 pb-3">Click and drag bubbles to interact with the environment</p>
              <div className="flex-1">
                <SkillsPhysics />
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Pagination indicators - Bottom (hidden for education) */}
      {tab !== "education" && (
        <div className="flex items-center justify-center gap-3 py-4 z-10">
          {(tab === "experience" ? JOBS : PROJECTS).map((_, idx) => {
            const isActive = tab === "experience" ? activeJobIdx === idx : activeProjIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => (tab === "experience" ? setActiveJobIdx(idx) : setActiveProjIdx(idx))}
                className={`rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                style={
                  isActive
                    ? {
                        width: "clamp(25px, 2.5vw, 35px)",
                        height: "clamp(8px, 0.7vw, 10px)",
                      }
                    : {
                        width: "clamp(8px, 0.7vw, 10px)",
                        height: "clamp(8px, 0.7vw, 10px)",
                      }
                }
                aria-label={`Go to item ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
