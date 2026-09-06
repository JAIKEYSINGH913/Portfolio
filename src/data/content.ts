export const SKILLS_A = [
  { n: "Java (J2EE)", e: "☕" }, { n: "Spring Boot", e: "🍃" }, { n: "Python", e: "🐍" },
  { n: "Flutter", e: "💙" }, { n: "Kotlin", e: "📱" }, { n: "SQL", e: "🗄️" },
  { n: "GraphRAG", e: "🕸️" }, { n: "React.js", e: "⚛️" },
];
export const SKILLS_B = [
  { n: "Neo4j", e: "🔵" }, { n: "GCP", e: "☁️" }, { n: "MongoDB", e: "🍃" },
  { n: "Microservices", e: "⚙️" }, { n: "FastAPI", e: "⚡" }, { n: "Dart", e: "🎯" },
  { n: "Firebase", e: "🔥" }, { n: "System Design", e: "📐" },
];

export const PROJECTS = [
  {
    title: "Cleev — Smart Bill Splitting Platform",
    desc: "A fintech-grade bill splitting application engineered for speed and fairness. Cleev handles complex group expense scenarios with intelligent debt-simplification algorithms, reducing the total number of transactions required to settle a group. Built on a fully async TypeScript backend, it exposes a clean REST API consumed by a React-based frontend with live settlement ledgers.",
    longDesc: `Cleev solves the real-world pain point of group expense tracking — the awkward, error-prone process of splitting restaurant bills, trips, and shared subscriptions. The architecture centers around a graph-based debt simplification engine: instead of tracking n*(n-1) pairwise debts, it collapses all transactions down to the minimum required payments using a greedy creditor-debtor algorithm.

Key Engineering Decisions:
• TypeScript monorepo with strict null-checks and Zod validation on all API boundaries — zero runtime type errors in production.
• Prisma ORM over a PostgreSQL database for type-safe query generation and automated migration tracking.
• Optimistic UI updates on the React frontend so the interface feels instant — server reconciliation happens asynchronously.
• JWT-based stateless auth with httpOnly cookie strategy, preventing XSS token theft.
• Deployed on Vercel with edge-cached API routes for sub-100ms TTFB globally.`,
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "React", "Fintech"],
    accent: "#6BA86F",
    num: "01",
    github: "https://github.com/JAIKEYSINGH913/Cleev",
    live: "https://apicleev.vercel.app",
  },
  {
    title: "NyayMitra — GraphRAG Legal Intelligence",
    desc: "Published research at HRIT University. A Hybrid Knowledge Graph system using Neo4j and GraphRAG to solve statutory concept drift in legal AI. Integrates Legal-BERT embeddings for sub-50ms multi-hop retrieval and achieves 100% hallucination mitigation via graph-grounded context generation.",
    longDesc: `NyayMitra addresses one of the hardest problems in legal AI: hallucination — where LLMs confidently cite non-existent case law or misrepresent statutes. The solution is a GraphRAG (Graph-Retrieval Augmented Generation) architecture that grounds every LLM response in a verified, structured knowledge graph.

Architecture Deep-Dive:
• Neo4j Knowledge Graph: Indian statutes, case law, and legal concepts are modeled as interconnected nodes. Relationships encode "cites", "defines", "overrules", and "amends" edges — enabling multi-hop traversal queries like "find all sections amended by this act that have been cited in Supreme Court judgments after 2020."
• Legal-BERT Embeddings: Domain-adapted BERT model fine-tuned on Indian legal corpora. Produces dense vector embeddings stored in a hybrid vector + graph index.
• GraphRAG Pipeline: Query → Entity Extraction → Graph Traversal (Cypher) → Context Assembly → LLM Generation. The graph traversal acts as a factual guardrail — the LLM can only generate content about nodes and edges that actually exist in the graph.
• Result: Sub-50ms retrieval latency, 0% hallucination rate on a 500-query benchmark, and a 30% improvement in answer completeness over vanilla RAG.`,
    tags: ["GraphRAG", "Neo4j", "Python", "Legal-BERT", "AI/LLM", "Research"],
    accent: "#6096BA",
    num: "02",
    github: "https://github.com/JAIKEYSINGH913/Nyay-mitra",
    live: "https://nyay-mitra-rho.vercel.app",
  },
  {
    title: "AI Predictive Maintenance — IoT Anomaly Detection",
    desc: "A real-time industrial IoT system that continuously analyzes sensor streams (temperature, vibration, pressure, humidity, power) to detect machinery anomalies using ML. Predicts failure windows before they happen, enabling planned maintenance over costly unplanned downtime.",
    longDesc: `This system demonstrates the full ML-for-production lifecycle — from raw sensor ingestion to actionable maintenance alerts — applied to a critical industrial domain where downtime costs thousands of dollars per hour.

System Architecture:
• Data Ingestion: MQTT-based sensor data pipeline that streams readings from IoT edge devices at 100ms intervals. Data is timestamped, validated, and written to a time-series store.
• Feature Engineering: Rolling window statistics (mean, std, skewness, kurtosis) computed over configurable windows (5s, 30s, 5min) to capture both instantaneous spikes and gradual drift.
• Anomaly Detection Models: An ensemble of Isolation Forest (for point anomalies), LSTM Autoencoder (for temporal sequence anomalies), and a One-Class SVM (for multivariate boundary violations). Alerts fire when ≥2 models agree.
• Visualization Dashboard: Real-time HTML/JS dashboard plotting sensor timelines, anomaly scores, and a maintenance recommendation engine with urgency levels (MONITOR / WARNING / CRITICAL).
• Impact: The system can identify bearing degradation, thermal runaway onset, and pressure seal failures 15–45 minutes before they trigger physical failure.`,
    tags: ["Python", "MQTT", "LSTM", "Isolation Forest", "IoT", "ML", "Time-Series"],
    accent: "#C85A2A",
    num: "03",
    github: "https://github.com/JAIKEYSINGH913/AI-Powered-Predictive-Maintenance-System-using-IoT-Sensor-Data-and-Anomaly-Detection",
    live: null,
  },
  {
    title: "BudgetWise — AI-Driven Expense Intelligence",
    desc: "A full-stack financial management platform with automated transaction categorization powered by NLP, real-time analytical dashboards, and an AI budget advisor. Features encrypted JWT authentication, role-based access control, and a RESTful API layer.",
    longDesc: `BudgetWise goes beyond a simple expense tracker — it acts as a personal CFO that learns your spending patterns and surfaces actionable insights before you overspend.

Core Features & Engineering:
• NLP Categorization Engine: Transaction descriptions are passed through a fine-tuned text classifier that assigns categories (Food, Transport, Entertainment, Utilities, etc.) with 94% accuracy. No manual tagging required.
• AI Budget Advisor: Rule-based + ML hybrid that identifies spending velocity spikes, recurring subscriptions the user may have forgotten, and projects end-of-month balance based on historical patterns.
• Security Architecture: BCrypt password hashing, JWT access tokens (15min expiry) + refresh token rotation (7-day sliding window), CORS policy, and rate limiting on all auth endpoints.
• Dashboard: Chart.js-powered real-time graphs — monthly burn rate, category breakdown donut charts, and a "savings runway" metric showing how many months of current spending is covered by existing savings.
• Tech Stack: Node.js / Express REST API, MongoDB Atlas for document storage, React.js frontend, and Jest for API contract testing.`,
    tags: ["JavaScript", "Node.js", "MongoDB", "React.js", "JWT", "NLP", "Finance"],
    accent: "#E5A93D",
    num: "04",
    github: "https://github.com/JAIKEYSINGH913/BudgetWise-AI-Driven-Expense-Tracker-and-Budget-Advisor",
    live: "https://budgetwise-jaikeysingh913.me",
    apiUrl: "https://api.budgetwise-jaikeysingh913.me/",
  },
  {
    title: "Bookstore Management System — REST + JWT",
    desc: "A production-grade bookstore backend featuring a fully RESTful API with JWT authentication, role-based authorization (Admin / Customer), inventory management, order processing, and comprehensive API documentation.",
    longDesc: `This project demonstrates clean, enterprise-grade backend architecture patterns applied to an e-commerce domain — the same patterns used in production systems at scale.

API Design & Architecture:
• RESTful Resource Modeling: Books, Authors, Categories, Orders, and Users are modeled as clean REST resources with proper HTTP verb semantics (GET/POST/PUT/PATCH/DELETE) and hypermedia links.
• Authentication Flow: Registration → Email Verification → JWT Issue (Access: 1hr, Refresh: 30 days). Token blacklisting via Redis on logout prevents replay attacks.
• Role-Based Access Control: Admin endpoints (inventory CRUD, order management, analytics) are protected by middleware that validates JWT claims and role scope.
• Database Design: Normalized relational schema with foreign keys, cascading deletes, and indexed lookup fields. Efficient JOIN queries for order-with-items retrievals.
• API Documentation: Swagger/OpenAPI spec auto-generated from JSDoc annotations — interactive docs available at /api-docs for frontend integration.
• Testing: 85% test coverage using Mocha + Chai with mocked database layer for fast, deterministic unit tests.`,
    tags: ["Java", "Spring Boot", "REST API", "JWT", "MySQL", "Swagger"],
    accent: "#B460BA",
    num: "05",
    github: "https://github.com/JAIKEYSINGH913/Bookstore-Management-System",
    live: null,
  },
  {
    title: "Portfolio v2 — This Website",
    desc: "This very portfolio — a cinematic, production-grade Next.js 16 application featuring a 3D folding grid canvas, scroll-driven animations, glassmorphic UI, a papercraft lightbulb theme toggle, and full light/dark mode support with theme-adaptive CSS variables.",
    longDesc: `A showcase of advanced frontend engineering — every visual effect is built from first principles, not a UI library.

Engineering Highlights:
• 3D Folding Grid: A raw WebGL-like canvas animation written entirely in vanilla 2D Canvas API. Uses perspective projection math to simulate a right-wall terrain grid that "flies" forward in real time. The orange accent color remains constant across all themes.
• Framer Motion Choreography: Scroll-driven stat counter animations, parallax image scaling, and cinematic fade transitions all coordinated via MotionValues and useTransform chains — no GSAP, no ScrollTrigger.
• Papercraft Lightbulb Toggle: An SVG-based origami lightbulb with animated sun rays (light mode) and glowing filament (dark mode). Mounted on a rope that bounces via spring physics on click.
• Theme System: Centralized CSS custom property architecture. Every color, shadow, and surface value derives from a single token set that swaps atomically on theme change — zero flash, zero reflow.
• Performance: Static export via Next.js App Router. All routes prerendered at build time (SSG). Turbopack compilation for sub-200ms HMR during development.
• SSR/Hydration Safety: Strict mounted-state pattern on all theme-dependent client components to prevent the "attributes of server rendered HTML didn't match" hydration error.`,
    tags: ["Next.js 16", "TypeScript", "Framer Motion", "Canvas API", "Tailwind", "Vercel"],
    accent: "#C85A2A",
    num: "06",
    github: "https://github.com/JAIKEYSINGH913/Portfolio",
    live: "https://portfolio-swart-one-1kypem6wvq.vercel.app",
  },
];

export const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "Infosys Springboard India",
    date: "Dec 2025 – Mar 2026",
    points: [
      "Engineered scalable backend infrastructure utilizing Microservices Architecture and optimized Database Schema Design.",
      "Enhanced system throughput by implementing high-performance Data Structures and Algorithms (DSA) for complex data processing.",
    ],
    accent: "#C85A2A",
  },
  {
    role: "Java Backend Developer Intern",
    company: "The Skybrisk India",
    date: "Jun 2025 – Dec 2025",
    points: [
      "Developed and deployed production-grade RESTful APIs using Spring Boot, improving modularity and system maintainability.",
      "Optimized complex SQL queries and indexing strategies, reducing API response latency by 30%.",
    ],
    accent: "#6096BA",
  },
  {
    role: "AI Intern",
    company: "TechSaksham (Microsoft & SAP Collaboration)",
    date: "Dec 2024 – Jan 2025",
    points: [
      "Designed end-to-end Machine Learning pipelines involving Exploratory Data Analysis (EDA) and advanced Feature Engineering.",
    ],
    accent: "#6BA86F",
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech Computer Science and Engineering",
    institution: "NITRA Technical Campus",
    date: "Sep 2022 – June 2026",
    points: [
      "Key Coursework: Operating Systems, Database Management (DBMS), System Design, Computer Networks, OOP.",
      "Google Cloud Arcade Champion: Top-tier performer in Cloud Architecture and DevOps-focused technical challenges.",
      "Reliance Foundation Scholar (2022): Prestigious national scholarship awarded for exceptional academic and leadership merit.",
    ],
    accent: "#E5A93D",
  },
];

export const CERTS = [
  { name: "Big Data & Cloud Computing (YBI)", url: "https://drive.google.com/file/d/1MdiT7AG94_l482c6DyL8qfBmxrH3n76I/preview", color: "#6096BA" },
  { name: "Professional Android & Kotlin", url: "https://drive.google.com/file/d/1yJKvzYBPgMcD_yzs2uPGchgxFOme_Mea/preview", color: "#6BA86F" },
  { name: "Java Foundation (Infosys)", url: "https://drive.google.com/file/d/1phjadKG2GQzZ55n55yvBS7jQIWIFZHZO/preview", color: "#E5A93D" },
  { name: "Agile Software Development", url: "https://drive.google.com/file/d/1FQ9vPboe0u6QcQv6QX2cXEEhNDQ9V2cD/preview", color: "#C85A2A" },
  { name: "Gen AI & LLM Fundamentals", url: "https://drive.google.com/file/d/1cY7SivizIIM_Lm15HlLXT4LAr9cRb_dW/preview", color: "#B460BA" },
];
