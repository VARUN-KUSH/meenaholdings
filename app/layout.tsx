import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import Nav from "@/components/Nav";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: "italic" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "meenaholdings — Independent app studio", template: "%s — meenaholdings" },
  description:
    "meenaholdings is an independent app studio that designs, launches and scales mobile apps across health, finance, productivity, education and more.",
};

export const viewport: Viewport = { themeColor: "#0b0b0c" };

// Hide animated elements before first paint (skipped for reduced motion)
const boot = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-anim')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <noscript>
          <style>{`.preloader{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <PageTransition />
        <Cursor />
        <Nav />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
