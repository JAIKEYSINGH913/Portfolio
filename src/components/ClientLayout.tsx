"use client";

import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { ViewportHeightHandler } from "@/components/ViewportHeightHandler";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ViewportHeightHandler />
      <Preloader />
      
      {/* Hanging Bulb fixed to the top right */}
      <div className="fixed top-24 right-8 md:right-16 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      <Navbar />
      <main className="w-full relative z-20">
        {children}
      </main>
    </ThemeProvider>
  );
}
