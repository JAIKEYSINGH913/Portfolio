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
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-4 right-4 md:right-8 z-[100] flex justify-end">
        <nav className="flex items-center gap-6 px-6 py-3 rounded-full border border-[var(--border-light)] bg-[var(--surface-translucent)] shadow-lg backdrop-blur-xl">
          <Link href="/" className="no-underline relative z-10" onClick={(e) => { if (isOpen) { e.preventDefault(); setIsOpen(false); }}}>
            <span className="font-display font-bold text-sm tracking-widest text-[var(--text-primary)] hover:text-[var(--terracotta)] transition-colors">
              JAIKEY
            </span>
          </Link>
          
          <div className="w-[1px] h-4 bg-[var(--border-light)]"></div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--terracotta)] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-2"
          >
            {isOpen ? "CLOSE" : "MENU"}
            <div className="flex flex-col gap-[3px]">
              <span className={`block h-[2px] w-4 bg-current transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[5px]" : ""}`}></span>
              <span className={`block h-[2px] w-4 bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-[2px] w-4 bg-current transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}></span>
            </div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-center items-center"
            style={{ background: "rgba(8, 6, 4, 0.98)", backdropFilter: "blur(20px)" }}
          >
            {/* Decorative background grid for the menu */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 flex flex-col w-full max-w-6xl px-6 md:px-12 mt-16">
              {/* Top boundary line */}
              <div className="w-full h-[1px] bg-white/10"></div>

              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <React.Fragment key={item.label}>
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.6, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className={`group relative flex items-center justify-between py-6 md:py-8 lg:py-10 font-display font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter no-underline transition-colors duration-300 w-full ${
                          isActive 
                            ? "text-[var(--terracotta)]" 
                            : "text-[#FAFAF7] hover:text-[var(--gold-400)]"
                        }`}
                      >
                        <span className="relative z-10 flex items-start gap-4 md:gap-8">
                          {/* Row Number */}
                          <span className="font-mono text-xs md:text-sm tracking-widest text-white/30 mt-2 md:mt-4">
                            0{i + 1}
                          </span>
                          {/* Label */}
                          <span className="group-hover:translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            {item.label}
                          </span>
                        </span>
                        
                        {/* Arrow indicator on hover */}
                        <span className="opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-3xl md:text-5xl text-[var(--terracotta)]">
                          ↗
                        </span>
                      </Link>
                    </motion.div>
                    
                    {/* Visible row line separating items */}
                    <div className="w-full h-[1px] bg-white/10"></div>
                  </React.Fragment>
                );
              })}
            </div>
            
            {/* Social / Extra links at bottom of menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 font-mono text-xs tracking-widest text-white/50 uppercase"
            >
              <a href="#" className="hover:text-[var(--terracotta)] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[var(--terracotta)] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[var(--terracotta)] transition-colors">Twitter</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
