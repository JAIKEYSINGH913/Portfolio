import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const BASE_URL = "https://jaikeysingh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Jaikey Singh — Software Engineer",
    template: "%s | Jaikey Singh",
  },
  description:
    "Jaikey Singh — B.Tech CSE Software Engineer specializing in React, Next.js, Java Spring Boot, Python, AI/ML, GraphRAG, and Cloud Architecture. Portfolio of projects, experience, and research.",
  keywords: [
    "Jaikey Singh",
    "Jaikey Singh portfolio",
    "Jaikey Singh software engineer",
    "Jaikey Singh developer",
    "JAIKEYSINGH913",
    "software engineer India",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "Java Spring Boot",
    "GraphRAG research",
    "AI ML engineer",
    "B.Tech CSE AKTU",
    "Infosys intern",
    "BudgetWise",
    "NyayMitra",
    "Cleev",
  ],
  authors: [{ name: "Jaikey Singh", url: BASE_URL }],
  creator: "Jaikey Singh",
  publisher: "Jaikey Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Jaikey Singh — Software Engineer",
    description:
      "Jaikey Singh — B.Tech CSE Software Engineer specializing in React, Next.js, Java, AI/ML, and Cloud Architecture.",
    url: BASE_URL,
    siteName: "Jaikey Singh Portfolio",
    images: [
      {
        url: `${BASE_URL}/assets/images/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "Jaikey Singh - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaikey Singh — Software Engineer",
    description:
      "Jaikey Singh — B.Tech CSE Software Engineer specializing in React, Next.js, Java, AI/ML, and Cloud Architecture.",
    images: [`${BASE_URL}/assets/images/og-preview.png`],
    creator: "@JAIKEYSINGH913",
    site: "@JAIKEYSINGH913",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaikey Singh",
  alternateName: "JAIKEYSINGH913",
  url: BASE_URL,
  image: `${BASE_URL}/assets/images/og-preview.png`,
  jobTitle: "Software Engineer",
  description:
    "B.Tech CSE Software Engineer specializing in React, Next.js, Java Spring Boot, Python, AI/ML, GraphRAG, and Cloud Architecture.",
  email: "jaikeysingh913@gmail.com",
  telephone: "+91-9540352249",
  sameAs: [
    "https://github.com/JAIKEYSINGH913",
    "https://www.linkedin.com/in/jaikey-singh-2885a7232",
    "https://x.com/JAIKEYSINGH913",
    "https://www.instagram.com/jaikey_singh913/",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dr. A. P. J. Abdul Kalam Technical University, Lucknow",
  },
  knowsAbout: [
    "React", "Next.js", "TypeScript", "Java", "Spring Boot",
    "Python", "GraphRAG", "AI/ML", "Cloud Architecture", "System Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${spaceMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="antialiased transition-colors duration-500 bg-[var(--canvas)] text-[var(--text-primary)]"
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
