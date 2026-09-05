"use client";

import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { ViewportHeightHandler } from "@/components/ViewportHeightHandler";
import { ThemeProvider } from "next-themes";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ViewportHeightHandler />
      <Preloader />
      <Navbar />
      <main className="w-full relative z-20">
        {children}
      </main>
    </ThemeProvider>
  );
}
