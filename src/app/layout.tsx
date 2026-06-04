import type { Metadata } from "next";
import { Oxanium, MuseoModerno } from "next/font/google";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const museoModerno = MuseoModerno({
  variable: "--font-museo-moderno",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jaikey Singh | Software Engineer | Full-Stack & Backend",
  description: "Portfolio of Jaikey Singh, a Software Engineer focusing on Full-Stack Development, Scalable Backend Architectures, and AI/ML Integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${museoModerno.variable} h-full bg-black text-white antialiased selection:bg-white selection:text-black`}
      suppressHydrationWarning
    >
      <body className="font-oxanium antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
