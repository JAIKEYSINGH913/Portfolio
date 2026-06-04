"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const pillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
  ];

  // Find index of current path
  let activeIndex = navItems.findIndex((item) => {
    if (item.path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.path);
  });

  if (activeIndex === -1) activeIndex = 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate the sliding pill to the active link
  useEffect(() => {
    if (!mounted || !pillRef.current || !navRef.current) return;

    const links = navRef.current.querySelectorAll("a");
    if (links[activeIndex]) {
      const link = links[activeIndex] as HTMLElement;
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      pillRef.current.style.width = `${linkRect.width}px`;
      pillRef.current.style.left = `${linkRect.left - navRect.left}px`;
    }
  }, [activeIndex, mounted]);

  return (
    <nav className="fixed top-0 left-0 p-2 xl:p-0 xl:top-6 xl:left-auto xl:right-8 z-50">
      <div
        ref={navRef}
        className="relative flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 shadow-2xl"
      >
        {/* Sliding white pill background */}
        <div
          ref={pillRef}
          className="absolute bg-white rounded-full transition-all duration-300 ease-out"
          style={{
            height: "calc(100% - 16px)",
            top: "8px",
            zIndex: 0,
          }}
        />

        {/* Nav Links */}
        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-6 py-2 rounded-full font-oxanium text-sm font-medium transition-colors duration-300 z-10 ${
                isActive ? "text-black" : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
