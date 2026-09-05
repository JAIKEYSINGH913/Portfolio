"use client";

import React, { useEffect, useState } from "react";


const NAV_ITEMS = [
  { label: "About",    href: "#about" },
  { label: "Works",    href: "#works" },
  { label: "Journey",  href: "#experience" },
  { label: "Certs",    href: "#certifications" },
  { label: "Contact",  href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 transition-transform duration-500 ${
        scrolled ? "translate-y-0" : "translate-y-2"
      }`}
    >
      <nav 
        className={`flex items-center gap-2 sm:gap-6 px-6 py-3 rounded-full border border-[var(--border-light)] transition-all duration-300 ${
          scrolled 
            ? "bg-[var(--surface-translucent)] shadow-lg backdrop-blur-xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-start bg-transparent border-none p-0 cursor-pointer group mr-4"
        >
          <span className="font-display font-bold text-sm tracking-widest text-[var(--text-primary)] group-hover:text-[var(--terracotta)] transition-colors">
            JAIKEY
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--terracotta)] hover:bg-[var(--surface-hover)] transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

      </nav>
    </header>
  );
};
