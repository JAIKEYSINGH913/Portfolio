<div align="center">

# JAIKEY SINGH — Portfolio v2

**Software Engineer · Full-Stack Developer · Published Researcher**

[![Live Site](https://img.shields.io/badge/Live%20Site-jaikeysingh.vercel.app-C85A2A?style=for-the-badge&logo=vercel&logoColor=white)](https://jaikeysingh.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jaikey%20Singh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jaikey-singh-2885a7232)
[![GitHub](https://img.shields.io/badge/GitHub-JAIKEYSINGH913-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JAIKEYSINGH913)

</div>

---

## Overview

A high-performance, dark-mode portfolio engineered with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Built to reflect the same attention to detail, system design thinking, and engineering craft that goes into every project I ship.

> Design philosophy: Cinematic dark aesthetic with an orange accent system, glassmorphism surfaces, and a low-poly statue hero — all optimized for every screen size.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + CSS Custom Properties |
| **Animation** | Framer Motion |
| **Email API** | Nodemailer (Gmail App Password) |
| **Analytics** | Vercel Analytics |
| **Deployment** | Vercel (Edge Network) |
| **Fonts** | Space Grotesk · Plus Jakarta Sans · Space Mono |

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero · About · Stats · Featured Projects · Footer |
| `/works` | Full project showcase with expandable engineering detail drawers |
| `/journey` | Professional timeline · Academic foundations · Verified credentials |
| `/skills` | Animated infinite skill ticker + categorized skill matrix |
| `/contact` | Message form (real email delivery) · Resume viewer · Social links |

---

## Key Features

- **Real Email Delivery** — Contact form POSTs to `/api/contact`, processed server-side via Nodemailer and delivered directly to inbox
- **Cinematic Background** — Low-poly David statue with Framer Motion scroll-driven parallax fade and scale transforms
- **Scroll Progress Bar** — Thin accent-colored progress indicator on every page
- **Custom Preloader** — Full-screen branded loading sequence with `JAIKEY SINGH` name animation
- **Dark Mode Only** — Light mode permanently disabled; ThemeToggle shows "ACCESS DENIED" modal
- **Vercel Analytics** — Visitor counts, page views, and device data tracked via `@vercel/analytics`
- **Open Graph Image** — Custom homepage screenshot auto-served for LinkedIn / Twitter rich previews
- **Responsive** — Tested and tuned for mobile (320px) through ultrawide (2560px)

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/     # Nodemailer email API route
│   ├── contact/         # Contact page
│   ├── journey/         # Experience, Education, Certs
│   ├── skills/          # Skills showcase
│   ├── works/           # Projects showcase
│   ├── globals.css      # Design system (CSS vars, typography)
│   ├── icon.svg         # Custom favicon
│   └── layout.tsx       # Root layout + Open Graph metadata
├── components/
│   ├── CinematicBackground.tsx   # Parallax statue hero
│   ├── ClientLayout.tsx          # Client wrapper (Preloader, Navbar, etc.)
│   ├── FoldingGrid.tsx           # Animated grid overlay
│   ├── Navbar.tsx                # Glassmorphic navigation
│   ├── Preloader.tsx             # Full-screen loading sequence
│   ├── ScrollProgressBar.tsx     # Top progress indicator
│   ├── ScrollReveal.tsx          # IntersectionObserver reveal wrapper
│   ├── ScrollToTopOnLoad.tsx     # Scroll restoration on refresh
│   ├── ThemeToggle.tsx           # Dark-mode lock + ACCESS DENIED modal
│   └── ViewportHeightHandler.tsx # iOS safe-area height fix
└── data/
    └── content.ts       # All data: projects, experience, education, certs, skills
public/
├── cv.pdf               # Resume (replace this file to update CV)
└── assets/images/
    ├── david_right.png  # Hero statue image
    └── og-preview.png   # Social media Open Graph preview image
```

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/JAIKEYSINGH913/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add EMAIL_USER and EMAIL_APP_PASSWORD (see Email Setup below)

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Email Setup (Contact Form)

The contact form sends real emails via Gmail. To enable it:

1. Enable **2-Step Verification** on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate a new App Password (name it "Portfolio")
4. Add these to your `.env.local` (and Vercel Environment Variables):

```env
EMAIL_USER=jaikeysingh913@gmail.com
EMAIL_APP_PASSWORD=your_16_char_app_password
```

---

## Updating Content

| What | Where |
|---|---|
| **CV / Resume** | Replace `public/cv.pdf` with your new PDF |
| **Projects** | Edit `PROJECTS` array in `src/data/content.ts` |
| **Experience** | Edit `EXPERIENCE` array in `src/data/content.ts` |
| **Education** | Edit `EDUCATION` array in `src/data/content.ts` |
| **Certifications** | Edit `CERTS` array in `src/data/content.ts` |
| **Skills** | Edit `SKILLS_A` / `SKILLS_B` in `src/data/content.ts` |
| **Social links** | Update `src/components/Navbar.tsx` and `src/app/page.tsx` |
| **OG preview image** | Replace `public/assets/images/og-preview.png` |

---

## Deployment

Deployed automatically on **Vercel** via GitHub integration. Every push to `main` triggers a new production build.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JAIKEYSINGH913/Portfolio)

---

<div align="center">

**© 2026 Jaikey Singh · B.Tech CSE · Dr. A. P. J. Abdul Kalam Technical University, Lucknow**

</div>
