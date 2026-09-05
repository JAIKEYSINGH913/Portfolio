"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home",     href: "/" },
  { label: "Skills",   href: "/skills" },
  { label: "Works",    href: "/works" },
  { label: "Journey",  href: "/journey" },
  { label: "Contact",  href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const max = document.body.scrollHeight - window.innerHeight;
      // If page is too short to scroll, or we reached the bottom (99%+)
      if (max <= 50) {
        setAtBottom(true);
      } else {
        const pct = (window.scrollY / max) * 100;
        setAtBottom(pct >= 99);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // setTimeout ensures DOM is fully rendered so scrollHeight is accurate
    const t = setTimeout(handleScroll, 150);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, [pathname]);

  return (
    <header 
      className={`fixed top-4 right-4 md:right-8 z-50 flex justify-end transition-transform duration-500 ${
        scrolled ? "translate-y-0" : "translate-y-2"
      }`}
    >
      <nav 
        className={`flex items-center px-6 py-3 rounded-full border border-[var(--border-light)] transition-all duration-500 ${
          scrolled 
            ? "bg-[var(--surface-translucent)] shadow-lg backdrop-blur-xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <AnimatePresence>
          {atBottom && (
            <motion.div 
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: "auto", opacity: 1, marginRight: 24 }}
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-1 overflow-hidden"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all no-underline ${
                      isActive 
                        ? "text-[var(--terracotta)] bg-[var(--surface-hover)] font-bold" 
                        : "text-[var(--text-secondary)] hover:text-[var(--terracotta)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <Link
          href="/"
          className="flex flex-col items-start bg-transparent border-none p-0 cursor-pointer group no-underline relative z-10"
        >
          <span className="font-display font-bold text-sm tracking-widest text-[var(--text-primary)] group-hover:text-[var(--terracotta)] transition-colors">
            JAIKEY
          </span>
        </Link>
      </nav>
    </header>
  );
};
