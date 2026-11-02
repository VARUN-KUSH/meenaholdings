import type { Metadata } from "next";
import AppsGrid from "@/components/pages/AppsGrid";
import Cta from "@/components/home/Cta";
import { apps, niches } from "@/lib/data";

export const metadata: Metadata = { title: "Apps", description: "Explore the meenaholdings portfolio of mobile apps." };

export default function AppsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-bg" aria-hidden>
          <div className="blob blob-1" style={{ background: "#ff6a3d", opacity: 0.35 }} />
        </div>
        <div className="container">
          <span className="eyebrow" data-reveal="fade">Portfolio · {apps.length} featured apps · {niches.length} niches</span>
          <div className="page-hero-row">
            <h1 className="h-display" data-split="load">
              Apps for <span className="serif accent">every</span> part of life.
            </h1>
          </div>
          <p className="lead" data-reveal data-delay="0.3">
            Every app here started with a real problem and a small team determined to solve it beautifully. Filter by niche
            to find your next favourite.
          </p>
        </div>
      </section>
      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <AppsGrid />
        </div>
      </section>
      <Cta title={<>Have an app to <span className="serif accent">sell?</span></>} sub="Acquisitions & partnerships" />
    </>
  );
}
