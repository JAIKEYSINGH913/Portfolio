"use client";

import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { ViewportHeightHandler } from "@/components/ViewportHeightHandler";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FoldingGrid } from "@/components/FoldingGrid";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ViewportHeightHandler />
      <Preloader />
      <ScrollProgressBar />
      
      {/* Hanging Bulb fixed to the top right */}
      <div className="fixed top-32 right-4 md:right-8 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Global Background Grid */}
      <FoldingGrid />

      <Navbar />
      <main className="w-full relative z-20">
        {children}
      </main>
    </ThemeProvider>
  );
}
